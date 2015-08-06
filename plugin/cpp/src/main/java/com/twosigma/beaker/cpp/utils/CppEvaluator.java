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
package com.twosigma.beaker.cpp.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.HashSet;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

import java.io.IOException;
import java.io.EOFException;
import java.io.PrintWriter;
import java.io.StringWriter;

import java.lang.reflect.*;
import java.nio.file.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.regex.*;
import java.io.File;

import java.lang.ProcessBuilder;
import java.lang.ProcessBuilder.Redirect;

import java.io.BufferedWriter;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.io.BufferedInputStream;
import java.io.ObjectInputStream;

import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTreeWalker;
import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.ParserRuleContext;
import com.twosigma.beaker.cpp.utils.Extractor;
import com.twosigma.beaker.cpp.autocomplete.CPP14Lexer;
import com.twosigma.beaker.cpp.autocomplete.CPP14Parser;
import com.twosigma.beaker.cpp.autocomplete.CPP14Listener;

import com.twosigma.beaker.cpp.utils.CellGobbler;

public class CppEvaluator {
  protected final String shellId;
  protected final String sessionId;
  protected final String packageId;
  protected List<String> classPath;
  protected List<String> imports;
  protected HashSet<String> loadedCells;
  protected String outDir;
  protected ArrayList<String> compileCommand;
  // protected JavaAutocomplete jac;
  protected boolean exit;
  protected workerThread myWorker;
  protected final BeakerCellExecutor executor;
  protected String currentClassPath;
  protected String currentImports;
  protected ArrayList<String> userFlags;
  protected Process cellProc;

  protected class jobDescriptor {
    SimpleEvaluationObject outputObject;
    String codeToBeExecuted;
    String cellId;
    
    jobDescriptor(SimpleEvaluationObject o, String c, String cid) {
      outputObject = o;
      codeToBeExecuted = c;
      cellId = cid;
    }
    
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public CppEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    packageId = "com.twosigma.beaker.cpp.bkr"+shellId.split("-")[0];
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    loadedCells = new HashSet<String>();
    compileCommand = new ArrayList<String>();
    compileCommand.add("clang++");
    compileCommand.add("-std=c++14");
    compileCommand.add("-shared");
    compileCommand.add("-undefined");
    compileCommand.add("dynamic_lookup");
    compileCommand.add("-fPIC");
    compileCommand.add("-m64");
    compileCommand.add("-Wno-return-type-c-linkage");
    compileCommand.add("-I");
    compileCommand.add("./include");
    compileCommand.add("-I");
    // Should add something appropriate for Linux
    compileCommand.add("/System/Library/Frameworks/JavaVM.framework/Headers");

    exit = false;
    currentClassPath = "";
    currentImports = "";
    outDir = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    executor = new BeakerCellExecutor("cpp");

    startWorker();
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  public String getShellId() { return shellId; }

  public void killAllThreads() {
    // executor.killAllThreads();
  }

  public void cancelExecution() {
    if (cellProc != null){
      cellProc.destroy();
    }
  }

  public void resetEnvironment() {
    loadedCells.clear();
    executor.killAllThreads();
    syncObject.release();
  }

  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  public void setShellOptions(String flagString) throws IOException {
    String[] flags = flagString.split("\\s+");
    userFlags = new ArrayList<String>(Arrays.asList(flags)); 

    resetEnvironment();
  }

  public void evaluate(SimpleEvaluationObject seo, String code, String cellId) {
    // send job to thread
    jobQueue.add(new jobDescriptor(seo, code, cellId));
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

      
      while(!exit) {
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

          Pattern p;
          Matcher m;
          String pname = packageId;
          
          // normalize and analyze code
          String code = normalizeCode(j.codeToBeExecuted);

          if(!executor.executeTask(new MyRunnable(j.outputObject, code, j.cellId, true))) {
            j.outputObject.error("... cancelled!");
          }
          if(nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
          j = null;
        } catch(Throwable e) {
          e.printStackTrace();
        } finally {
          if (nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
        }
      }
      NamespaceClient.delBeaker(sessionId);
    }
    
    protected class MyRunnable implements Runnable {

      protected final SimpleEvaluationObject theOutput;
      protected final String theCode;
      protected final String theCellId;
      protected final boolean retObject;

      public MyRunnable(SimpleEvaluationObject out, String code, String cid, boolean ro) {
        theOutput = out;
        theCode = code;
        theCellId = cid;
        retObject = ro;
      }

      private String createMainCaller(String type){
        StringBuilder builder = new StringBuilder();
        if (type != "void") {
          builder.append("\nextern \"C\" jobject call_beaker_main() {\n");
          builder.append("\t" + type + " ret;\n");
          builder.append("\t" + "beaker_main(ret);\n");
          builder.append("\t" + "return Beaker::convert(ret);\n");
        } else {
          builder.append("\nextern \"C\" void call_beaker_main() {\n");
          builder.append("beaker_main();\n");
          builder.append("return;\n");
        }
        builder.append("}\n");
        return builder.toString();
      }
      
      @Override
      public void run() {
        theOutput.setOutputHandler();
        try {          
          // Parse code to find beaker_main and type
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

          String processedCode = theCode;
          // If beaker_main was found
          if (!cellType.equals("none")){
            int beakerMainEnd = tokens.get(beakerMainLastToken).getStopIndex();
            StringBuilder builder = new StringBuilder(theCode);
            builder.insert(beakerMainEnd + 1, createMainCaller(cellType));
            // builder.insert(0, "extern Beaker beaker;\n");
            builder.insert(0, "#include <beaker.hpp>\n");
            processedCode = builder.toString();
          }

          // System.out.println("Processed code is:\n" + processedCode);

          // Create .cpp file
          String tmpDir = System.getenv("beaker_tmp_dir");
          java.nio.file.Path filePath = java.nio.file.Paths.get(tmpDir + "/" + theCellId + ".cpp");
          Files.write(filePath, processedCode.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
          // Prepare to compile
          String inputFile = tmpDir + "/" + theCellId + ".cpp";
          String outputFile = tmpDir + "/lib" + theCellId + ".so";
          ArrayList<String> clangCommand = new ArrayList<String>(compileCommand);
          clangCommand.add("-o");
          clangCommand.add(outputFile);
          clangCommand.add(inputFile);
          clangCommand.addAll(userFlags);

          ProcessBuilder pb;

          // Compile
          pb = new ProcessBuilder(clangCommand);
          pb.directory(new File(System.getProperty("user.dir")));
          pb.redirectInput(Redirect.PIPE);
          pb.redirectOutput(Redirect.PIPE);
          pb.redirectError(Redirect.PIPE);
          Process p = pb.start();
          CellGobbler clangOut = new CellGobbler(p.getInputStream(), "stderr", theOutput);
          CellGobbler clangErr = new CellGobbler(p.getErrorStream(), "stderr", theOutput);
          clangOut.start();
          clangErr.start();
          if((p.waitFor()) == 0) {
            loadedCells.add(theCellId);
          } else {
            theOutput.error("Compilation failed");
            theOutput.finished(null);
          }

          Object ret = null;

          // Execute if type is recognized
          if (!cellType.equals("none")){
            ArrayList<String> runCommand = new ArrayList<String>();
            runCommand.add("./bin/cpp");
            runCommand.add("execute");
            runCommand.add(sessionId);
            runCommand.add(theCellId);
            runCommand.add(cellType);
            for (String cell : loadedCells) {
              if (!cell.equals(theCellId)){
                runCommand.add(cell);
              }
            }

            pb = new ProcessBuilder(runCommand);
            pb.directory(new File(System.getProperty("user.dir")));
            pb.redirectInput(Redirect.PIPE);
            pb.redirectOutput(Redirect.PIPE);
            pb.redirectError(Redirect.PIPE);
            cellProc = pb.start();
            CellGobbler cellOut = new CellGobbler(cellProc.getInputStream(), "stdout", theOutput);
            CellGobbler cellErr = new CellGobbler(cellProc.getErrorStream(), "stderr", theOutput);
            cellOut.start();
            cellErr.start();
            if((cellProc.waitFor()) == 0) {
              try {
                InputStream file = new FileInputStream(tmpDir + "/" + theCellId + ".result");
                InputStream buffer = new BufferedInputStream(file);
                ObjectInputStream input = new ObjectInputStream(buffer);
                ret = input.readObject();
              } catch (EOFException ex){
                System.out.println("EOFException!");
              } catch(IOException ex){
                System.out.println("IOException!");
                theOutput.error("Failed to read serialized cell output");
              }
            } else {
              theOutput.error("Execution failed");
              theOutput.finished(null);
            }
          }
          theOutput.finished(ret);

        } catch(Throwable e) {
          if(e instanceof InvocationTargetException)
            e = ((InvocationTargetException)e).getTargetException();
          if((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
            theOutput.error("... cancelled!");
          } else {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            theOutput.error(sw.toString());
          }
        }
        theOutput.clrOutputHandler();
      }
    };
    
    /*
     * This function does:
     * 1) remove comments
     * 2) ensure we have a cr after each ';' (if not inside double quotes or single quotes)
     * 3) remove empty lines
     */
  
    protected String normalizeCode(String code)
    {
      String c1 = code.replaceAll("\r\n","\n").replaceAll("(?:/\\*(?:[^*]|(?:\\*+[^*/]))*\\*+/)|(?://.*)","");
      StringBuilder c2 = new StringBuilder();
      boolean indq = false;
      boolean insq = false;
      for(int i=0; i<c1.length(); i++)
      {
        char c = c1.charAt(i);
        switch(c) {
          case '"':
            if (!insq && i>0 && c1.charAt(i-1)!='\\')
              indq = !indq;
            break;
          case '\'':
            if (!indq && i>0 && c1.charAt(i-1)!='\\')
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
}
