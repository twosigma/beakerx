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
package com.twosigma.beakerx.groovy.evaluator;

import com.google.common.base.Joiner;
import com.twosigma.beakerx.jvm.classloader.BeakerxUrlClassLoader;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import groovy.lang.GroovyClassLoader;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.groovy.control.CompilerConfiguration;
import org.codehaus.groovy.control.customizers.ImportCustomizer;

import java.io.File;

public class GroovyClassLoaderFactory {

  public static String GROOVY_JAR_PATH = "GROOVY_JAR_PATH";
  private static final String STATIC_WORD_WITH_SPACE = "static ";
  private static final String DOT_STAR_POSTFIX = ".*";

  public static GroovyClassLoader newEvaluator(Imports imports, Classpath classpath, String outDir, ImportCustomizer icz,ClassLoader parent) {

    try {
      Class.forName("org.codehaus.groovy.control.customizers.ImportCustomizer");
    } catch (ClassNotFoundException e1) {
      String gjp = System.getenv(GROOVY_JAR_PATH);
      String errorMsg = null;
      if (gjp != null && !gjp.isEmpty()) {
        errorMsg = "Groovy libary not found, GROOVY_JAR_PATH = " + gjp;
      } else {
        errorMsg = "Default groovy libary not found. No GROOVY_JAR_PATH variable set.";
      }
      throw new GroovyNotFoundException(errorMsg);
    }

    icz = addImportsCustomizer(icz, imports);
    CompilerConfiguration config = new CompilerConfiguration().addCompilationCustomizers(icz);
    String acloader_cp = Joiner.on(File.pathSeparatorChar).join(classpath.getPathsAsStrings());
    config.setClasspath(acloader_cp);
    return new GroovyClassLoader(parent, config);
  }

  private static ImportCustomizer addImportsCustomizer(ImportCustomizer icz, Imports imports) {

    if (!imports.isEmpty()) {
      for (ImportPath importLine : imports.getImportPaths()) {
        addImportPathToImportCustomizer(icz, importLine);
      }
    }
    return icz;
  }

  public static void addImportPathToImportCustomizer(ImportCustomizer icz, ImportPath importLine) {
    if (importLine.asString().startsWith(STATIC_WORD_WITH_SPACE)) {

      String pureImport = importLine.asString()
              .replace(STATIC_WORD_WITH_SPACE, StringUtils.EMPTY)
              .replace(DOT_STAR_POSTFIX, StringUtils.EMPTY);

      if (importLine.asString().endsWith(DOT_STAR_POSTFIX)) {
        icz.addStaticStars(pureImport);
      } else {
        int index = pureImport.lastIndexOf('.');
        if (index == -1) {
          return;
        }
        icz.addStaticImport(pureImport.substring(0, index), pureImport.substring(index + 1));
      }

    } else {

      if (importLine.asString().endsWith(DOT_STAR_POSTFIX)) {
        icz.addStarImports(importLine.asString().replace(DOT_STAR_POSTFIX, StringUtils.EMPTY));
      } else {
        icz.addImports(importLine.asString());
      }

    }
  }

  public static BeakerxUrlClassLoader newParentClassLoader(Classpath classpath) {
    BeakerxUrlClassLoader loader = new BeakerxUrlClassLoader(ClassLoader.getSystemClassLoader());
    loader.addPathToJars(classpath.getPaths());
    return loader;
  }

}
