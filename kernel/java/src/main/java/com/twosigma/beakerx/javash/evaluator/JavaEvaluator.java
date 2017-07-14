/*
 *  Copyright 2014-2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.javash.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClasspathScanner;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.javash.autocomplete.JavaAutocomplete;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.twosigma.beakerx.DefaultJVMVariables.CLASSPATH;
import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;

public class JavaEvaluator extends BaseEvaluator {
  private static final String WRAPPER_CLASS_NAME = "BeakerWrapperClass1261714175";
  protected final String shellId;
  protected final String sessionId;
  protected final String packageId;
  protected Classpath classPath;
  protected Imports imports;
  protected String outDir;
  protected ClasspathScanner cps;
  protected JavaAutocomplete jac;
  protected boolean exit;
  protected boolean updateLoader;
  protected workerThread myWorker;
  protected final CellExecutor executor;

  protected class jobDescriptor {
    String codeToBeExecuted;
    SimpleEvaluationObject outputObject;

    jobDescriptor(String c, SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public JavaEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("javash"));
  }

  public JavaEvaluator(String id, String sId, CellExecutor cellExecutor) {
    shellId = id;
    sessionId = sId;
    packageId = "com.twosigma.beaker.javash.bkr" + shellId.split("-")[0];
    cps = new ClasspathScanner();
    jac = createJavaAutocomplete(cps);
    classPath = new Classpath();
    imports = new Imports();
    exit = false;
    updateLoader = true;
    outDir = Evaluator.createJupyterTempFolder().toString();
    executor = cellExecutor;
    startWorker();
  }

  private void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  protected JavaAutocomplete createJavaAutocomplete(ClasspathScanner c) {
    return new JavaAutocomplete(c);
  }

  public String getShellId() {
    return shellId;
  }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();

    String cpp = "";
    for (String pt : classPath.getPathsAsStrings()) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += outDir;
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");

    cps = new ClasspathScanner(cpp);
    jac = createJavaAutocomplete(cps);

    for (ImportPath st : imports.getImportPaths())
      jac.addImport(st.asString());

    // signal thread to create loader
    updateLoader = true;
    syncObject.release();
  }

  @Override
  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }


  @Override
  public void initKernel(KernelParameters kernelParameters) {
    configure(kernelParameters);
  }


  @Override
  public void setShellOptions(final KernelParameters kernelParameters) throws IOException {
    configure(kernelParameters);
    resetEnvironment();
  }

  private void configure(KernelParameters kernelParameters) {
    Map<String, Object> params = kernelParameters.getParams();
    Collection<String> listOfClassPath = (Collection<String>) params.get(CLASSPATH);
    Collection<String> listOfImports = (Collection<String>) params.get(IMPORTS);

    Map<String, String> env = System.getenv();

    if (listOfClassPath == null || listOfClassPath.isEmpty()) {
      classPath = new Classpath();
    } else {
      for (String line : listOfClassPath) {
        if (!line.trim().isEmpty()) {
          addJar(new PathToJar(line));
        }
      }
    }

    if (listOfImports == null || listOfImports.isEmpty()) {
      imports = new Imports();
    } else {
      for (String line : listOfImports) {
        if (!line.trim().isEmpty()) {
          imports.add(new ImportPath(line));
        }
      }
    }
  }

  @Override
  public Classpath getClasspath() {
    return this.classPath;
  }

  @Override
  public Imports getImports() {
    return this.imports;
  }

  @Override
  protected boolean addJar(PathToJar path) {
    return classPath.add(path);
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
  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code, seo));
    syncObject.release();
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    List<String> ret = jac.doAutocomplete(code, caretPosition);

    if (!ret.isEmpty())
      return new AutocompleteResult(ret, caretPosition);

    // this is a code sniplet... 
    String[] codev = code.split("\n");
    int insert = 0;
    while (insert < codev.length) {
      if (!codev[insert].contains("package") && !codev[insert].contains("import") && !codev[insert].trim().isEmpty())
        break;
      insert++;
    }

    final String CODE_TO_INSERT = "public class " + WRAPPER_CLASS_NAME + " { public static void beakerRun() { \n";

    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < insert; i++) {
      sb.append(codev[i]);
      sb.append('\n');
    }

    if (caretPosition >= sb.length()) {
      caretPosition += CODE_TO_INSERT.length();
    }
    sb.append(CODE_TO_INSERT);
    for (int i = insert; i < codev.length; i++) {
      sb.append(codev[i]);
      sb.append('\n');
    }

    return new AutocompleteResult(jac.doAutocomplete(sb.toString(), caretPosition), caretPosition);
  }

  protected class workerThread extends Thread {

    public workerThread() {
      super("javash worker");
    }
    
    /*
     * This thread performs all the evaluation
     */

    public void run() {
      DynamicClassLoaderSimple loader = null;
      jobDescriptor j = null;
      org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler javaSourceCompiler;

      javaSourceCompiler = new JavaSourceCompiler();
      NamespaceClient nc = null;

      while (!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // check if we must create or update class loader
          if (loader == null || updateLoader) {
            loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
            loader.addJars(classPath.getPathsAsStrings());
            loader.addDynamicDir(outDir);
          }

          // get next job descriptor
          j = jobQueue.poll();
          if (j == null)
            continue;

          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);

          j.outputObject.started();

          Pattern p;
          Matcher m;
          String pname = packageId;

          org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(outDir));

          // build the compiler class path
          String classpath = System.getProperty("java.class.path");
          String[] classpathEntries = classpath.split(File.pathSeparator);
          if (classpathEntries != null && classpathEntries.length > 0)
            compilationUnit.addClassPathEntries(Arrays.asList(classpathEntries));
          if (!classPath.isEmpty())
            compilationUnit.addClassPathEntries(classPath.getPathsAsStrings());
          compilationUnit.addClassPathEntry(outDir);

          // normalize and analyze code
          String code = ParserUtil.normalizeCode(j.codeToBeExecuted);

          String[] codev = code.split("\n");
          int ci = 0;

          ci = skipBlankLines(codev, ci);

          Map<Integer, Integer> lineNumbersMapping = new HashMap<>();
          LineBrakingStringBuilderWrapper javaSourceCode = new LineBrakingStringBuilderWrapper();
          p = Pattern.compile("\\s*package\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*);.*");
          m = p.matcher(codev[ci]);

          if (m.matches()) {
            pname = m.group(1);
            lineNumbersMapping.put(1, ci);
            ci = skipBlankLines(codev, ci + 1);
          }
          javaSourceCode.append("package ");
          javaSourceCode.append(pname);
          javaSourceCode.append(";\n");

          for (ImportPath i : imports.getImportPaths()) {
            javaSourceCode.append("import ");
            javaSourceCode.append(i.asString());
            javaSourceCode.append(";\n");
          }

          p = Pattern.compile("\\s*import(\\s+static)?\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*(?:\\.\\*)?);.*");
          m = p.matcher(codev[ci]);
          while (m.matches()) {
            String impstr = m.group(2);
            String staticModifier = m.group(1);
            javaSourceCode.append("import ");
            if (staticModifier != null) {
              javaSourceCode.append("static ");
            }
            javaSourceCode.append(impstr);
            javaSourceCode.append(";\n");
            lineNumbersMapping.put(javaSourceCode.getLinesCount(), ci);

            ci = skipBlankLines(codev, ci + 1);
            m = p.matcher(codev[ci]);
          }

          p = Pattern.compile("(?:^|.*\\s+)(?:(?:class)|(?:interface))\\s+([a-zA-Z]\\w*).*");
          m = p.matcher(codev[ci]);
          if (m.matches()) {
            // this is a class definition

            String cname = m.group(1);

            addTheRestOfCode(codev, ci, javaSourceCode, lineNumbersMapping);

            compilationUnit.addJavaSource(pname + "." + cname, javaSourceCode.toString());
            try {
              javaSourceCompiler.compile(compilationUnit);
              javaSourceCompiler.persistCompiledClasses(compilationUnit);
              j.outputObject.finished(pname + "." + cname);
            } catch (CompilationException e) {
              j.outputObject.error(buildErrorMessage(e, lineNumbersMapping));
            } catch (Exception e) {
              j.outputObject.error("ERROR: " + e.toString());
            } finally {
              if (j.outputObject != null) {
                j.outputObject.executeCodeCallback();
              }
            }
          } else {
            String ret = "void";
            if (codev[codev.length - 1].matches("(^|.*\\s+)return\\s+.*"))
              ret = "Object";
            // this is an expression evaluation
            javaSourceCode.append("public class " + WRAPPER_CLASS_NAME + " {\n");
            javaSourceCode.append("public static ");
            javaSourceCode.append(ret);
            javaSourceCode.append(" beakerRun() throws Exception {\n");
            addTheRestOfCode(codev, ci, javaSourceCode, lineNumbersMapping);
            javaSourceCode.append("}\n");
            javaSourceCode.append("}\n");

            compilationUnit.addJavaSource(pname + "." + WRAPPER_CLASS_NAME, javaSourceCode.toString());

            try {
              javaSourceCompiler.compile(compilationUnit);

              javaSourceCompiler.persistCompiledClasses(compilationUnit);
              Class<?> fooClass = loader.loadClass(pname + "." + WRAPPER_CLASS_NAME);
              Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);

              if (!executor.executeTask(new MyRunnable(mth, j.outputObject, ret.equals("Object"), loader))) {
                j.outputObject.error("... cancelled!");
              }
              if (nc != null) {
                nc.setOutputObj(null);
                nc = null;
              }
            } catch (CompilationException e) {
              j.outputObject.error(buildErrorMessage(e, lineNumbersMapping));
            } catch (Exception e) {
              j.outputObject.error("ERROR: " + e.toString());
            } finally {
              if (j.outputObject != null) {
                j.outputObject.executeCodeCallback();
              }
            }
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

    private int skipBlankLines(String[] lines, int ci) {
      while (ci < lines.length - 1 && StringUtils.isBlank(lines[ci])) {
        ci++;
      }
      return ci;
    }

    private String buildErrorMessage(CompilationException exception, Map<Integer, Integer> lineNumbersMapping) {
      final StringBuilder stringBuilder = new StringBuilder();
      stringBuilder.append("ERROR: ").append(exception.getMessage()).append('\n');
      for (CompilationException.CompilationError compilationError : exception.getCompilationErrors()) {
        stringBuilder
                .append("error at line ")
                .append(mapLineNumber(lineNumbersMapping, compilationError.getLineNumber())).append(": ")
                .append(prepareForFrontend(compilationError.getErrorMessage())).append('\n')
                .append(compilationError.getCode());
      }
      return stringBuilder.toString();
    }

    private String prepareForFrontend(String errorMessage) {
      return errorMessage.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    }

    private Integer mapLineNumber(Map<Integer, Integer> lineNumbersMapping, int ourNumber) {
      final Integer usersNumber = lineNumbersMapping.get(ourNumber);
      return usersNumber == null ? ourNumber : usersNumber + 1;
    }

    private void addTheRestOfCode(String[] codev, int ci, LineBrakingStringBuilderWrapper javaSourceCode, Map<Integer, Integer> lineNumbersMapping) {
      for (; ci < codev.length; ci++) {
        javaSourceCode.append(codev[ci]);
        javaSourceCode.append("\n");
        lineNumbersMapping.put(javaSourceCode.getLinesCount(), ci);
      }
    }

    protected class MyRunnable implements Runnable {

      protected final SimpleEvaluationObject theOutput;
      protected final Method theMth;
      protected final boolean retObject;
      protected final ClassLoader loader;

      public MyRunnable(Method mth, SimpleEvaluationObject out, boolean ro, ClassLoader ld) {
        theMth = mth;
        theOutput = out;
        retObject = ro;
        loader = ld;
      }

      @Override
      public void run() {
        ClassLoader oldld = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(loader);
        theOutput.setOutputHandler();
        InternalVariable.setValue(theOutput);
        try {
          InternalVariable.setValue(theOutput);
          Object o = theMth.invoke(null, (Object[]) null);
          if (retObject) {
            theOutput.finished(o);
          } else {
            theOutput.finished(null);
          }
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
        Thread.currentThread().setContextClassLoader(oldld);
      }

    }

    ;
  }

  private static class LineBrakingStringBuilderWrapper {
    private static final String LINE_BREAK = "\n";
    private StringBuilder delegate;
    private int linesCount;

    public LineBrakingStringBuilderWrapper() {
      this.delegate = new StringBuilder();
      this.linesCount = 0;
    }

    public void append(String string) {
      this.delegate.append(string);
      this.linesCount += StringUtils.countMatches(string, LINE_BREAK);
    }

    public int getLinesCount() {
      return linesCount;
    }

    @Override
    public String toString() {
      return delegate.toString();
    }
  }
}
