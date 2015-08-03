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

import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTreeWalker;
import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.ParserRuleContext;
import com.twosigma.beaker.cpp.utils.Extractor;
import com.twosigma.beaker.cpp.autocomplete.CPP14Lexer;
import com.twosigma.beaker.cpp.autocomplete.CPP14Parser;
import com.twosigma.beaker.cpp.autocomplete.CPP14Listener;

public class CppEvaluator {
  protected final String shellId;
  protected final String sessionId;
  protected final String packageId;
  protected List<String> classPath;
  protected List<String> imports;
  protected HashSet<String> loadedCells;
  protected String outDir;
  // protected ClasspathScanner cps;
  // protected JavaAutocomplete jac;
  protected boolean exit;
  // protected boolean updateLoader;
  protected workerThread myWorker;
  protected final BeakerCellExecutor executor;
  protected String currentClassPath;
  protected String currentImports;

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

  public native Object cLoadAndRun(String fileName, String type);

  static {
    System.load(System.getProperty("user.dir") + "/lib/libCRun.jnilib");
    // System.loadLibrary("clingInterp");
  }

  public CppEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    packageId = "com.twosigma.beaker.cpp.bkr"+shellId.split("-")[0];
    // cps = new ClasspathScanner();
    // jac = createJavaAutocomplete(cps);
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    loadedCells = new HashSet<String>();
    exit = false;
    // updateLoader = false;
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

  // protected JavaAutocomplete createJavaAutocomplete(ClasspathScanner c)
  // {
  //   return new JavaAutocomplete(c);
  // }

  public String getShellId() { return shellId; }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();
   
    // String cpp = "";
    // for(String pt : classPath) {
    //   cpp += pt;
    //   cpp += File.pathSeparator;
    // }
    // cpp += File.pathSeparator;
    // cpp += System.getProperty("java.class.path");
    // cps = new ClasspathScanner(cpp);
    // jac = createJavaAutocomplete(cps);
    
    // for(String st : imports)
    //   jac.addImport(st);
    
    // signal thread to create loader
    // updateLoader = true;
    syncObject.release();
  }
    
  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  public void setShellOptions(String cp, String in, String od) throws IOException {
    if (od==null || od.isEmpty()) {
      od = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    } else {
      od = od.replace("$BEAKERDIR",System.getenv("beaker_tmp_dir"));
    }
    
    // check if we are not changing anything
    if (currentClassPath.equals(cp) && currentImports.equals(in) && outDir.equals(od))
      return;

    currentClassPath = cp;
    currentImports = in;
    outDir = od;

    if (cp.isEmpty())
      classPath = new ArrayList<String>();
    else
      classPath = Arrays.asList(cp.split("[\\s"+File.pathSeparatorChar+"]+"));
    if (in.isEmpty())
      imports = new ArrayList<String>();
    else
      imports = Arrays.asList(in.split("\\s+"));

    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }

    resetEnvironment();
  }

  public void evaluate(SimpleEvaluationObject seo, String code, String cellId) {
    // send job to thread
    jobQueue.add(new jobDescriptor(seo, code, cellId));
    syncObject.release();
  }

  // public List<String> autocomplete(String code, int caretPosition) {
  //   List<String> ret = jac.doAutocomplete(code, caretPosition);
    
  //   if (!ret.isEmpty())
  //     return ret;
    
  //   // this is a code sniplet... 
  //   String [] codev = code.split("\n");
  //   int insert = 0;
  //   while(insert < codev.length) {
  //     if (!codev[insert].contains("package") && !codev[insert].contains("import") && !codev[insert].trim().isEmpty())
  //       break;
  //     insert++;
  //   }
     
  //   final String CODE_TO_INSERT = "public class Foo { public static void beakerRun() { \n";
      
  //   StringBuilder sb = new StringBuilder();
  //   for ( int i=0; i<insert; i++) {
  //     sb.append(codev[i]);
  //     sb.append('\n');
  //   }
      
  //   if (caretPosition>=sb.length()) {
  //     caretPosition += CODE_TO_INSERT.length();
  //   }
  //   sb.append(CODE_TO_INSERT);
  //   for ( int i=insert; i<codev.length; i++) {
  //     sb.append(codev[i]);
  //     sb.append('\n');
  //   }
  
  //   return jac.doAutocomplete(sb.toString(), caretPosition);    
  // }

  protected class workerThread extends Thread {
  
    public workerThread() {
      super("cpp worker");
    }
    
    /*
     * This thread performs all the evaluation
     */
    
    public void run() {
      // DynamicClassLoader loader = null;;
      jobDescriptor j = null;
      // JavaSourceCompiler javaSourceCompiler;
  
      // javaSourceCompiler = new JavaSourceCompilerImpl();

      NamespaceClient nc =null;
      
      while(!exit) {
        try {
          // wait for work
          syncObject.acquire();
          
          // check if we must create or update class loader
          // if (loader == null || updateLoader) {
          //   loader = new DynamicClassLoader(outDir);
          //   for(String pt : classPath) {
          //     loader.add(pt);
          //   }
          // }
          
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
          
          // JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(outDir));
        
          // normalize and analyze code
          String code = normalizeCode(j.codeToBeExecuted);

          if(!executor.executeTask(new MyRunnable(j.outputObject, code, j.cellId, true))) {
            j.outputObject.error("... cancelled!");
          }
          if(nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
          //   } catch(Exception e) { j.outputObject.error("ERROR: "+e.toString()); }    
          // }
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
          int beakerMainStart = extractor.beakerMainStart;

          String processedCode = theCode;
          // If beaker_main was found
          if (!cellType.equals("none")){
            int beakerMainPos = tokens.get(beakerMainStart).getStartIndex();
            StringBuilder builder = new StringBuilder(theCode);
            builder.insert(beakerMainPos, " extern \"C\" ");
            processedCode = builder.toString();
          }

          // Create .cpp file
          String tmpDir = System.getenv("beaker_tmp_dir");
          java.nio.file.Path filePath = java.nio.file.Paths.get(tmpDir + "/" + theCellId + ".cpp");
          Files.write(filePath, processedCode.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
          // Prepare to compile
          String inputFile = tmpDir + "/" + theCellId + ".cpp";
          String outputFile = tmpDir + "/lib" + theCellId + ".so";
          ArrayList<String> command = new ArrayList<String>();
          command.add("clang++");
          command.add("-shared");
          command.add("-undefined");
          command.add("dynamic_lookup");
          command.add("-fPIC");
          command.add("-m64");
          command.add("-Wno-return-type-c-linkage");
          command.add("-o");
          command.add(outputFile);
          command.add(inputFile);

          // Compile
          ProcessBuilder pb = new ProcessBuilder(command);
          pb.redirectOutput(Redirect.INHERIT);
          pb.redirectError(Redirect.INHERIT);
          Process p = pb.start();
          int exitCode = p.waitFor();
          if (exitCode == 0){
            loadedCells.add(theCellId);
          }

          // Load and run
          Object ret = cLoadAndRun(outputFile, cellType);
          if(retObject) {
            theOutput.finished(ret);
          } else {
            theOutput.finished(null);
          }          
          return;
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
        // theOutput.clrOutputHandler();
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
