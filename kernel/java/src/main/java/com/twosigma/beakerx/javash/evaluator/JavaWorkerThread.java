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
package com.twosigma.beakerx.javash.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.WorkerThread;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.kernel.ImportPath;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;

class JavaWorkerThread extends WorkerThread {

  private JavaEvaluator javaEvaluator;
  private boolean exit;
  private boolean updateLoader;

  public JavaWorkerThread(JavaEvaluator javaEvaluator) {
    super("javash worker");
    this.javaEvaluator = javaEvaluator;
    exit = false;
    updateLoader = true;
  }

  /*
   * This thread performs all the evaluation
   */

  public void run() {
    DynamicClassLoaderSimple loader = null;
    JobDescriptor j = null;
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
          loader.addJars(javaEvaluator.getClasspath().getPathsAsStrings());
          loader.addDynamicDir(javaEvaluator.getOutDir());
        }

        // get next job descriptor
        j = jobQueue.poll();
        if (j == null)
          continue;

        nc = NamespaceClient.getBeaker(javaEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);

        j.outputObject.started();

        Pattern p;
        Matcher m;
        String pname = javaEvaluator.getPackageId();

        org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(javaEvaluator.getOutDir()));

        // build the compiler class path
        String classpath = System.getProperty("java.class.path");
        String[] classpathEntries = classpath.split(File.pathSeparator);
        if (classpathEntries != null && classpathEntries.length > 0)
          compilationUnit.addClassPathEntries(Arrays.asList(classpathEntries));
        if (!javaEvaluator.getClasspath().isEmpty())
          compilationUnit.addClassPathEntries(javaEvaluator.getClasspath().getPathsAsStrings());
        compilationUnit.addClassPathEntry(javaEvaluator.getOutDir());

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

        for (ImportPath i : javaEvaluator.getImports().getImportPaths()) {
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
          javaSourceCode.append("public class " + JavaEvaluator.WRAPPER_CLASS_NAME + " {\n");
          javaSourceCode.append("public static ");
          javaSourceCode.append(ret);
          javaSourceCode.append(" beakerRun() throws Exception {\n");
          addTheRestOfCode(codev, ci, javaSourceCode, lineNumbersMapping);
          javaSourceCode.append("}\n");
          javaSourceCode.append("}\n");

          compilationUnit.addJavaSource(pname + "." + JavaEvaluator.WRAPPER_CLASS_NAME, javaSourceCode.toString());

          try {
            javaSourceCompiler.compile(compilationUnit);

            javaSourceCompiler.persistCompiledClasses(compilationUnit);
            Class<?> fooClass = loader.loadClass(pname + "." + JavaEvaluator.WRAPPER_CLASS_NAME);
            Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);

            if (!javaEvaluator.executeTask(new JavaCodeRunner(mth, j.outputObject, ret.equals("Object"), loader))) {
              j.outputObject.error(INTERUPTED_MSG);
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
    NamespaceClient.delBeaker(javaEvaluator.getSessionId());
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

  public void updateLoader() {
    this.updateLoader = true;
  }

  public void doExit() {
    this.exit = true;
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
