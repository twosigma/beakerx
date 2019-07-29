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
package com.twosigma.beakerx.kotlin.evaluator;

import com.twosigma.beakerx.jvm.classloader.BeakerXUrlClassLoader;
import com.twosigma.beakerx.kernel.ImportPath;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.kotlin.cli.common.repl.ReplClassLoader;
import org.jetbrains.kotlin.cli.jvm.repl.configuration.ConsoleReplConfiguration;
import org.jetbrains.kotlin.cli.jvm.repl.ReplInterpreter;
import org.jetbrains.kotlin.config.CommonConfigurationKeys;
import org.jetbrains.kotlin.config.CompilerConfiguration;
import org.jetbrains.kotlin.config.JVMConfigurationKeys;
import org.jetbrains.kotlin.utils.PathUtil;

import java.io.File;
import java.lang.reflect.Field;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

import static org.jetbrains.kotlin.cli.jvm.config.JvmContentRootsKt.addJvmClasspathRoot;
import static org.jetbrains.kotlin.cli.jvm.config.JvmContentRootsKt.addJvmClasspathRoots;
import static org.jetbrains.kotlin.com.intellij.openapi.util.Disposer.newDisposable;

public class ReplWithClassLoaderFactory {

  @NotNull
  public static ReplWithClassLoader createReplWithKotlinParentClassLoader(KotlinEvaluator kotlinEvaluator, BeakerXUrlClassLoader parent) {
    return createReplInterpreter(getClasspath(), parent, kotlinEvaluator);
  }

  public static ReplInterpreter createReplWithReplClassLoader(KotlinEvaluator kotlinEvaluator, ReplClassLoader classLoader) {
    CompilerConfiguration compilerConfiguration = getCompilerConfiguration(getClasspath(), kotlinEvaluator);
    ReplInterpreter replInterpreter = new ReplInterpreter(newDisposable(), compilerConfiguration, new ConsoleReplConfiguration());
    setupReplClassLoader(classLoader, replInterpreter);
    replInterpreter.eval(getImportString(kotlinEvaluator.getImports().getImportPaths()));
    return replInterpreter;
  }

  @NotNull
  private static ReplClassLoader setupReplClassLoader(ReplClassLoader classLoader, ReplInterpreter replInterpreter) {

    try {
      Field classLoaderField = replInterpreter.getClass().getDeclaredField("classLoader");
      classLoaderField.setAccessible(true);
      classLoaderField.set(replInterpreter, classLoader);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return classLoader;
  }

  @NotNull
  private static String[] getClasspath() {
    String classpath = System.getProperty("java.class.path");
    return classpath.split(File.pathSeparator);
  }

  @NotNull
  public static BeakerXUrlClassLoader createParentClassLoader(KotlinEvaluator kotlinEvaluator) {
    List<URL> urls = BeakerXUrlClassLoader.createUrls(kotlinEvaluator.getClasspath().getPaths());
    BeakerXUrlClassLoader parent = new BeakerXUrlClassLoader(urls.toArray(new URL[urls.size()]), ClassLoader.getSystemClassLoader());
    return parent;
  }

  private static ReplWithClassLoader createReplInterpreter(String[] classpathEntries, ClassLoader parent, KotlinEvaluator kotlinEvaluator) {
    CompilerConfiguration compilerConfiguration = getCompilerConfiguration(classpathEntries, kotlinEvaluator);
    ReplInterpreter replInterpreter = new ReplInterpreter(newDisposable(), compilerConfiguration, new ConsoleReplConfiguration());
    ReplClassLoader loader = getReplClassLoader(parent, replInterpreter);
    replInterpreter.eval(getImportString(kotlinEvaluator.getImports().getImportPaths()));
    return new ReplWithClassLoader(replInterpreter, loader);
  }

  @NotNull
  public static String getImportString(List<ImportPath> importPaths) {
    StringBuilder javaSourceCode = new StringBuilder();
    for (ImportPath i : importPaths) {
      javaSourceCode.append("import ");
      javaSourceCode.append(adjustImport(i));
      javaSourceCode.append("\n");
    }
    return javaSourceCode.toString();
  }

  @NotNull
  private static ReplClassLoader getReplClassLoader(ClassLoader parent, ReplInterpreter replInterpreter) {
    ReplClassLoader classLoader = null;
    try {
      Field classLoaderField = replInterpreter.getClass().getDeclaredField("classLoader");
      classLoaderField.setAccessible(true);
      classLoader = (ReplClassLoader) classLoaderField.get(replInterpreter);

      Field urlClassLoaderField = classLoader.getClass().getSuperclass().getDeclaredField("parent");
      urlClassLoaderField.setAccessible(true);
      Object urlClassLoader = urlClassLoaderField.get(classLoader);
      urlClassLoaderField.set(urlClassLoader, parent);

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return classLoader;
  }

  @NotNull
  private static CompilerConfiguration getCompilerConfiguration(String[] classpathEntries, KotlinEvaluator kotlinEvaluator) {
    CompilerConfiguration compilerConfiguration = new CompilerConfiguration();
    compilerConfiguration.put(CommonConfigurationKeys.MODULE_NAME, "kotlinModule" + System.currentTimeMillis());
    compilerConfiguration.put(JVMConfigurationKeys.RETAIN_OUTPUT_IN_MEMORY, true);
    addJvmClasspathRoots(compilerConfiguration, PathUtil.getJdkClassesRootsFromCurrentJre());
    Arrays.stream(classpathEntries).forEach(x -> addJvmClasspathRoot(compilerConfiguration, new File(x)));
    kotlinEvaluator.getClasspath().getPathsAsStrings().forEach(x -> addJvmClasspathRoot(compilerConfiguration, new File(x)));
    return compilerConfiguration;
  }

  private static String adjustImport(ImportPath importPath) {
    String currentImportPath = importPath.asString();
    if (currentImportPath.startsWith("import")) {
      currentImportPath = currentImportPath.substring(6).trim();
    }

    if (currentImportPath.startsWith("static")) {
      currentImportPath = currentImportPath.substring(6).trim();
    }

    if (currentImportPath.contains(".object.")) {
      currentImportPath = currentImportPath.replace(".object.", ".`object`.");
    }

    return currentImportPath;
  }

  public static class ReplWithClassLoader {
    private ReplClassLoader loader;
    private ReplInterpreter repl;

    public ReplWithClassLoader(ReplInterpreter repl, ReplClassLoader loader) {
      this.loader = loader;
      this.repl = repl;
    }

    public ReplClassLoader getLoader() {
      return loader;
    }

    public ReplInterpreter getRepl() {
      return repl;
    }
  }

}
