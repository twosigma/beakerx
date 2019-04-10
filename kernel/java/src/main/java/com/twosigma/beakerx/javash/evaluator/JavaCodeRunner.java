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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;

class JavaCodeRunner implements Callable<TryResult> {

  private final SimpleEvaluationObject theOutput;
  private JobDescriptor j;
  private JavaEvaluator javaEvaluator;

  public JavaCodeRunner(JavaEvaluator javaEvaluator, SimpleEvaluationObject out, JobDescriptor j) {
    this.javaEvaluator = javaEvaluator;
    this.theOutput = checkNotNull(out);
    this.j = j;
  }

  @Override
  public TryResult call() throws Exception {
    TryResult either;
    try {
      theOutput.setOutputHandler();
      either = runCode(j);
    } catch (Throwable e) {
      if (e instanceof InvocationTargetException)
        e = ((InvocationTargetException) e).getTargetException();
      if ((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
        either = TryResult.createError(INTERUPTED_MSG);
      } else {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        either = TryResult.createError(sw.toString());
      }
    } finally {
      theOutput.clrOutputHandler();
    }
    return either;
  }


  private TryResult runCode(JobDescriptor j) {
    TryResult either;
    j.outputObject.started();
    String code = ParserUtil.normalizeCode(j.codeToBeExecuted).replaceAll("\r\n", "\n");
    Codev codev = new Codev(code, javaEvaluator);
    try {
      either = compileCode(j, codev);
    } catch (Exception e) {
      either = TryResult.createError(e.getMessage());
    }
    return either;
  }

  private TryResult compileCode(JobDescriptor j, Codev codev) throws InvocationTargetException, IllegalAccessException {
    if (codev.hasLineToProcess()) {
      Codev.CodeLine codeLine = codev.getNotBlankLine();
      Pattern p = Pattern.compile("(?:^|.*\\s+)(?:(?:class)|(?:interface))\\s+([a-zA-Z]\\w*).*");
      Matcher m = p.matcher(codeLine.getLine());
      if (m.matches()) {
        return compileNewDefinitionClass(j, m, codev);
      } else {
        return compileAndRunCode(j, codev);
      }
    } else {
      return compileAndRunCode(j, codev);
    }
  }

  private TryResult compileAndRunCode(JobDescriptor j, Codev codev) {
    TryResult either;
    String classId = generateClassId();
    String returnType = "Object";
    Codev copyCodev = new Codev(codev.getCode(), javaEvaluator);
    boolean compile = compile(codev, classId, returnType);
    if (!compile) {
      classId = generateClassId();
      returnType = "void";
      copyCodev = new Codev(codev.getCode(), javaEvaluator);
      compile(copyCodev, classId, returnType);
    }
    try {
      Class<?> fooClass = javaEvaluator.getJavaClassLoader().loadClass(copyCodev.getPname() + "." + JavaEvaluator.WRAPPER_CLASS_NAME + classId);
      Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);
      Object o = mth.invoke(null, (Object[]) null);
      if (returnType.equals("Object")) {
        either = TryResult.createResult(o);
      } else {
        either = TryResult.createResult(null);
      }
    } catch (CompilationException e) {
      either = TryResult.createError(buildErrorMessage(e, copyCodev.lineNumbersMapping));
    } catch (Exception e) {
      either = TryResult.createError("ERROR: " + e.getCause());
    }
    return either;
  }

  private boolean compile(Codev codev, String classId, String ret) {
    org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler javaSourceCompiler = new com.twosigma.beakerx.javash.evaluator.JavaSourceCompiler();
    JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(javaEvaluator.getOutDir()));
    buildClasspath(compilationUnit);

    codev.javaSourceCode.append("public class " + JavaEvaluator.WRAPPER_CLASS_NAME + classId + " {\n");
    codev.javaSourceCode.append("public static ");
    codev.javaSourceCode.append(ret);
    codev.javaSourceCode.append(" beakerRun() throws Exception {\n");
    addTheRestOfCode(codev);
    codev.javaSourceCode.append("}\n");
    codev.javaSourceCode.append("}\n");

    compilationUnit.addJavaSource(codev.getPname() + "." + JavaEvaluator.WRAPPER_CLASS_NAME + classId, codev.javaSourceCode.toString());
    boolean compile = javaSourceCompiler.compile(javaEvaluator.getClassLoader(), compilationUnit);
    if (compile) {
      javaSourceCompiler.persistCompiledClasses(compilationUnit);
      return true;
    }
    return false;
  }

  private TryResult compileNewDefinitionClass(JobDescriptor j, Matcher m, Codev codev) {
    TryResult either;
    String cname = m.group(1);
    addTheRestOfCode(codev);
    org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler javaSourceCompiler = new com.twosigma.beakerx.javash.evaluator.JavaSourceCompiler();
    JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(javaEvaluator.getOutDir()));
    buildClasspath(compilationUnit);

    compilationUnit.addJavaSource(codev.getPname() + "." + cname, codev.javaSourceCode.toString());
    try {
      javaSourceCompiler.compile(compilationUnit);
      javaSourceCompiler.persistCompiledClasses(compilationUnit);
      javaEvaluator.getJavaClassLoader().resetClassloader();
      either = TryResult.createResult(codev.getPname() + "." + cname);
    } catch (CompilationException e) {
      either = TryResult.createError(buildErrorMessage(e, codev.lineNumbersMapping));
    } catch (Exception e) {
      either = TryResult.createError("ERROR: " + e.toString());
    }
    return either;
  }

  private void buildClasspath(org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler.CompilationUnit compilationUnit) {
    String classpath = System.getProperty("java.class.path");
    String[] classpathEntries = classpath.split(File.pathSeparator);
    if (classpathEntries != null && classpathEntries.length > 0)
      compilationUnit.addClassPathEntries(Arrays.asList(classpathEntries));
    if (!javaEvaluator.getClasspath().isEmpty()) {
      compilationUnit.addClassPathEntries(javaEvaluator.getClasspath().getPathsAsStrings());
    }
  }

  private String generateClassId() {
    return "Id" + UUID.randomUUID().toString().replace("-", "");
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

  private void addTheRestOfCode(Codev codev) {
    while (codev.hasLineToProcess()) {
      codev.javaSourceCode.append(codev.getNotBlankLine().getLine());
      codev.javaSourceCode.append("\n");
      codev.lineNumbersMapping.put(codev.javaSourceCode.getLinesCount(), codev.getNotBlankLine().getIndex());
      codev.moveToNextLine();
    }

  }

}
