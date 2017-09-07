/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.cpp.evaluator;

import com.twosigma.beakerx.cpp.autocomplete.CPP14Lexer;
import com.twosigma.beakerx.cpp.autocomplete.CPP14Parser;
import com.twosigma.beakerx.cpp.kernel.Extractor;
import com.twosigma.beakerx.cpp.utils.CellGobblerManager;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.ParserRuleContext;
import org.antlr.v4.runtime.tree.ParseTreeWalker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

class CppCodeRunner implements Runnable {

  private static final Logger logger = LoggerFactory.getLogger(CppCodeRunner.class.getName());

  private CppEvaluator cppEvaluator;
  private final SimpleEvaluationObject theOutput;
  private final String theCode;
  private final String theCellId;
  private Process cellProc;

  CppCodeRunner(CppEvaluator cppEvaluator, SimpleEvaluationObject out, String code, String theCellId) {
    this.cppEvaluator = cppEvaluator;
    this.theOutput = out;
    this.theCode = code;
    this.theCellId = theCellId;
  }

  private String createMainCaller(String type) {
    StringBuilder builder = new StringBuilder();
    if (type != "void") {
      builder.append("JNIEnv *globEnv;\n");
      builder.append("jobject globObj;\n");
      builder.append("\nextern \"C\" jobject call_beakerx_main(JNIEnv *e,jobject o) {\n");
      builder.append("\t" + "globEnv=e;\n");
      builder.append("\t" + "globObj=o;\n");
      builder.append("\t" + type + " ret;\n");
      builder.append("\t" + "beakerx_main(ret);\n");
      builder.append("\t" + "return Beakerx::convert(ret);\n");
    } else {
      builder.append("JNIEnv *globEnv;\n");
      builder.append("jobject globObj;\n");
      builder.append("\nextern \"C\" void call_beakerx_main(JNIEnv *e,jobject o) {\n");
      builder.append("\t" + "globEnv=e;\n");
      builder.append("\t" + "globObj=o;\n");
      builder.append("beakerx_main();\n");
      builder.append("return;\n");
    }
    builder.append("}\n");
    return builder.toString();
  }

  @Override
  public void run() {
    theOutput.setOutputHandler();
    InternalVariable.setValue(theOutput);

    try {
      // Parse code to find beakerx_main and type
      CPP14Lexer lexer = new CPP14Lexer(new ANTLRInputStream(theCode));
      // Get a list of matched tokens
      CommonTokenStream tokens = new CommonTokenStream(lexer);
      // Pass the tokens to the parser
      CPP14Parser parser = new CPP14Parser(tokens);
      // Parse code
      ParserRuleContext t = parser.translationunit();
      ParseTreeWalker walker = new ParseTreeWalker();
      Extractor extractor = new Extractor();
      walker.walk(extractor, t);
      String cellType = extractor.returnType;
      int beakerMainLastToken = extractor.beakerMainLastToken;

      cellType = cellType.replaceAll(">>", "> >");

      String processedCode = theCode;
      // If beakerx_main was found
      if (!cellType.equals("none")) {
        int beakerMainEnd = tokens.get(beakerMainLastToken).getStopIndex();
        StringBuilder builder = new StringBuilder(theCode);
        builder.insert(beakerMainEnd + 1, createMainCaller(cellType));
        // builder.insert(0, "extern Beakerx beakerx;\n");
        builder.insert(0, "#include <beakerx.hpp>\n");
        processedCode = builder.toString();
      }

      // Create .cpp file
      String tmpDir = cppEvaluator.getTempCppFiles().getPath();
      Path filePath = Paths.get(tmpDir + "/" + theCellId + ".cpp");
      Files.write(filePath, processedCode.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
      // Prepare to compile
      String inputFile = tmpDir + "/" + theCellId + ".cpp";
      String outputFile = tmpDir + "/lib" + theCellId + ".so";
      ArrayList<String> clangCommand = new ArrayList<>(cppEvaluator.getCompileCommand());
      clangCommand.add("-o");
      clangCommand.add(outputFile);
      clangCommand.add(inputFile);
      clangCommand.addAll(cppEvaluator.getUserFlags());

      ProcessBuilder pb;

      if (System.getenv("BEAKER_CPP_DEBUG") != null) {
        logger.info("Compiling with:");
        StringBuilder builder = new StringBuilder();
        for (String s : clangCommand) {
          builder.append(s + " ");
        }
        logger.info(builder.toString());
      }

      // Compile
      pb = new ProcessBuilder(clangCommand);
      pb.directory(new File(System.getProperty("user.dir")));
      pb.redirectInput(ProcessBuilder.Redirect.PIPE);
      pb.redirectOutput(ProcessBuilder.Redirect.PIPE);
      pb.redirectError(ProcessBuilder.Redirect.PIPE);
      Process p = pb.start();
      CellGobblerManager.getInstance().startCellGobbler(p.getInputStream(), "stderr", theOutput);
      CellGobblerManager.getInstance().startCellGobbler(p.getErrorStream(), "stderr", theOutput);
      if ((p.waitFor()) == 0) {
        cppEvaluator.getLoadedCells().add(theCellId);
      } else {
        theOutput.error("Compilation failed");
        theOutput.finished(null);
      }

      Object ret;

      // Execute if type is recognized
      if (!cellType.equals("none")) {
        List<String> runCommand = new ArrayList<>();
        runCommand.add(cppEvaluator.getTempCppFiles().getPath() + "/cpp");
        runCommand.add(CppEvaluator.EXECUTE);
        runCommand.add(cppEvaluator.getSessionId());
        runCommand.add(theCellId);
        runCommand.add(cellType);
        runCommand.add(cppEvaluator.getTempCppFiles().getPath());

        for (String cell : cppEvaluator.getLoadedCells()) {
          if (!cell.equals(theCellId)) {
            runCommand.add(cell);
          }
        }

        pb = new ProcessBuilder(runCommand);
        pb.directory(new File(System.getProperty("user.dir")));
        pb.redirectInput(ProcessBuilder.Redirect.PIPE);
        pb.redirectOutput(ProcessBuilder.Redirect.PIPE);
        pb.redirectError(ProcessBuilder.Redirect.PIPE);
        this.cellProc = pb.start();
        CellGobblerManager.getInstance().startCellGobbler(cellProc.getInputStream(), "stdout", theOutput);
        CellGobblerManager.getInstance().startCellGobbler(cellProc.getErrorStream(), "stderr", theOutput);
        if ((cellProc.waitFor()) == 0) {
          try {
            InputStream file = new FileInputStream(tmpDir + "/" + theCellId + ".result");
            InputStream buffer = new BufferedInputStream(file);
            ObjectInputStream input = new ObjectInputStream(buffer);
            ret = input.readObject();
            theOutput.finished(ret);
          } catch (EOFException ex) {
            logger.info("EOFException!");
            theOutput.error("Failed to read serialized cell output");
          } catch (IOException ex) {
            logger.info("IOException!");
            theOutput.error("Failed to read serialized cell output");
          }
        } else {
          theOutput.error("Execution failed");
        }
      } else
        theOutput.finished(null);

    } catch (Throwable e) {
      if (e instanceof InvocationTargetException)
        e = ((InvocationTargetException) e).getTargetException();
      if ((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
        theOutput.error(INTERUPTED_MSG);
      } else {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        theOutput.error(sw.toString());
      }
    } finally {
      if (theOutput != null) {
        theOutput.executeCodeCallback();
      }
    }
    theOutput.clrOutputHandler();
  }

  public void cancelExecution() {
    if (cellProc != null) {
      cellProc.destroy();
    }
  }
}
