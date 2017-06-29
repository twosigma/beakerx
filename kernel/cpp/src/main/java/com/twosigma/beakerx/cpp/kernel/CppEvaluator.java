/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.cpp.kernel;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.cpp.autocomplete.CPP14Lexer;
import com.twosigma.beakerx.cpp.autocomplete.CPP14Parser;
import com.twosigma.beakerx.cpp.utils.CellGobblerManager;
import com.twosigma.beakerx.cpp.utils.TempCppFiles;
import com.twosigma.beakerx.cpp.utils.CLangCommand;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;
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
import java.lang.ProcessBuilder.Redirect;
import java.lang.reflect.InvocationTargetException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;

import static com.twosigma.beakerx.kernel.Utils.uuid;

public class CppEvaluator extends BaseEvaluator {

  private static final Logger logger = LoggerFactory.getLogger(CppEvaluator.class.getName());

  public static final String EXECUTE = "execute";

  private final String shellId;
  private final String sessionId;
  private List<String> compileCommand;
  private boolean exit;
  private workerThread myWorker;
  private final CellExecutor executor;
  private List<String> userFlags = new ArrayList<>();
  private Process cellProc;
  private TempCppFiles tempCppFiles;
  private final Semaphore syncObject = new Semaphore(0, true);
  private final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  private HashSet<String> loadedCells;
  private Classpath classpath = new Classpath();
  private Imports imports = new Imports();

  public CppEvaluator(String id, String sId, CellExecutor cellExecutor) {
    shellId = id;
    sessionId = sId;
    tempCppFiles = new TempCppFiles(id);
    compileCommand = CLangCommand.compileCommand(tempCppFiles);
    exit = false;
    executor = cellExecutor;
    loadedCells = new HashSet<>();
    startWorker();
  }

  public CppEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("cpp"));
  }

  private void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return null;
  }

  public void killAllThreads() {
    // executor.killAllThreads();
  }

  public void cancelExecution() {
    if (cellProc != null) {
      cellProc.destroy();
    }
  }

  public void resetEnvironment() {
    loadedCells.clear();
    executor.killAllThreads();
    syncObject.release();
  }

  public void exit() {
    tempCppFiles.close();
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  @Override
  public void initKernel(KernelParameters kernelParameters) {

  }

  @Override
  public void setShellOptions(KernelParameters kernelParameters) throws IOException {
    Optional<String> flagStringOptional = kernelParameters.getParam("flagString", String.class);
    if (flagStringOptional.isPresent()) {
      String[] flags = flagStringOptional.get().split("\\s+");
      userFlags = new ArrayList<>(Arrays.asList(flags));
      resetEnvironment();
    }
  }

  @Override
  protected boolean addJar(PathToJar path) {
    return false;
  }

  @Override
  protected boolean addImportPath(ImportPath anImport) {
    return imports.add(anImport);
  }

  @Override
  protected boolean removeImportPath(ImportPath anImport) {
    return imports.remove(anImport);
  }

  @Override
  public Classpath getClasspath() {
    return this.classpath;
  }

  @Override
  public Imports getImports() {
    return this.imports;
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(seo, code, uuid()));
    syncObject.release();
  }

  protected class workerThread extends Thread {

    public workerThread() {
      super("cpp worker");
    }
    /*
     * This thread performs all the evaluation
     */

    public void run() {
      jobDescriptor j = null;
      NamespaceClient nc = null;


      while (!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // get next job descriptor
          j = jobQueue.poll();
          if (j == null)
            continue;

          j.outputObject.started();

          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);

          // normalize and analyze code
          String code = normalizeCode(j.codeToBeExecuted);

          if (!executor.executeTask(new MyRunnable(j.outputObject, code, j.cellId))) {
            j.outputObject.error("... cancelled!");
          }
          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }
          j = null;
        } catch (Throwable e) {
          e.printStackTrace();
        } finally {
          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }
        }
      }
      NamespaceClient.delBeaker(sessionId);
    }

    protected class MyRunnable implements Runnable {

      private final SimpleEvaluationObject theOutput;
      private final String theCode;
      private final String theCellId;

      private MyRunnable(SimpleEvaluationObject out, String code, String theCellId) {
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
          String tmpDir = tempCppFiles.getPath();
          Path filePath = Paths.get(tmpDir + "/" + theCellId + ".cpp");
          Files.write(filePath, processedCode.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
          // Prepare to compile
          String inputFile = tmpDir + "/" + theCellId + ".cpp";
          String outputFile = tmpDir + "/lib" + theCellId + ".so";
          ArrayList<String> clangCommand = new ArrayList<>(compileCommand);
          clangCommand.add("-o");
          clangCommand.add(outputFile);
          clangCommand.add(inputFile);
          clangCommand.addAll(userFlags);

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
          pb.redirectInput(Redirect.PIPE);
          pb.redirectOutput(Redirect.PIPE);
          pb.redirectError(Redirect.PIPE);
          Process p = pb.start();
          CellGobblerManager.getInstance().startCellGobbler(p.getInputStream(), "stderr", theOutput);
          CellGobblerManager.getInstance().startCellGobbler(p.getErrorStream(), "stderr", theOutput);
          if ((p.waitFor()) == 0) {
            loadedCells.add(theCellId);
          } else {
            theOutput.error("Compilation failed");
            theOutput.finished(null);
          }

          Object ret;

          // Execute if type is recognized
          if (!cellType.equals("none")) {
            List<String> runCommand = new ArrayList<>();
            runCommand.add(tempCppFiles.getPath() + "/cpp");
            runCommand.add(EXECUTE);
            runCommand.add(sessionId);
            runCommand.add(theCellId);
            runCommand.add(cellType);
            runCommand.add(tempCppFiles.getPath());

            for (String cell : loadedCells) {
              if (!cell.equals(theCellId)) {
                runCommand.add(cell);
              }
            }

            pb = new ProcessBuilder(runCommand);
            pb.directory(new File(System.getProperty("user.dir")));
            pb.redirectInput(Redirect.PIPE);
            pb.redirectOutput(Redirect.PIPE);
            pb.redirectError(Redirect.PIPE);
            cellProc = pb.start();
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
            theOutput.error("... cancelled!");
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
    }

    /*
     * This function does:
     * 1) remove comments
     * 2) ensure we have a cr after each ';' (if not inside double quotes or single quotes)
     * 3) remove empty lines
     */

    protected String normalizeCode(String code) {
      String c1 = code.replaceAll("\r\n", "\n").replaceAll("(?:/\\*(?:[^*]|(?:\\*+[^*/]))*\\*+/)|(?://.*)", "");
      StringBuilder c2 = new StringBuilder();
      boolean indq = false;
      boolean insq = false;
      for (int i = 0; i < c1.length(); i++) {
        char c = c1.charAt(i);
        switch (c) {
          case '"':
            if (!insq && i > 0 && c1.charAt(i - 1) != '\\')
              indq = !indq;
            break;
          case '\'':
            if (!indq && i > 0 && c1.charAt(i - 1) != '\\')
              insq = !insq;
            break;
          case ';':
            if (!indq && !insq) {
              c2.append(c);
              c = '\n';
            }
            break;
        }
        c2.append(c);
      }
      return c2.toString().replaceAll("\n\n+", "\n").trim();
    }
  }

  protected class jobDescriptor {
    private SimpleEvaluationObject outputObject;
    private String codeToBeExecuted;
    private String cellId;

    jobDescriptor(SimpleEvaluationObject o, String c, String cid) {
      outputObject = o;
      codeToBeExecuted = c;
      cellId = cid;
    }
  }
}
