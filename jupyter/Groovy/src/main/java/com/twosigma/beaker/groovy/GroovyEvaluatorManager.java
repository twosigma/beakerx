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
package com.twosigma.beaker.groovy;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.groovy.control.CompilerConfiguration;
import org.codehaus.groovy.control.customizers.ImportCustomizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.jupyter.Compiler;

import groovy.lang.Binding;
import groovy.lang.ExpandoMetaClass;
import groovy.lang.GroovyClassLoader;
import groovy.lang.GroovyShell;
import groovy.lang.MetaClass;
import groovy.lang.Script;

public class GroovyEvaluatorManager implements Compiler{

  public static Logger logger = LoggerFactory.getLogger(GroovyEvaluatorManager.class);

  private static final String STATIC_WORD_WITH_SPACE = "static ";
  private static final String DOT_STAR_POSTFIX = ".*";
  private static final String BEAKER_VARIABLE = "beaker";

  protected static Pattern[] envVariablePatterns = { Pattern.compile("\\$\\{([a-z_][a-z0-9_]*)\\}", Pattern.CASE_INSENSITIVE), Pattern.compile("\\$([a-z_][a-z0-9_]*)", Pattern.CASE_INSENSITIVE) };

  protected List<String> importList = new ArrayList<>();
  protected List<String> classPathList = new ArrayList<>();
  protected GroovyClassLoader groovyClassLoader;
  protected Binding binding;
  protected GroovyShell compiler;

  // TODO use outDir
  public GroovyEvaluatorManager(String classPath, String imports, String outDir) {
    super();
    importList = convertImportsToList(imports);
    classPathList = convertClassPathToList(classPath);
    binding = new Binding();
    CompilerConfiguration config = new CompilerConfiguration().addCompilationCustomizers(getImportCustomizer(importList));
    config.setClasspath(getClassPathAsStringFromList(classPathList));
    groovyClassLoader = new GroovyClassLoader(newClassLoader(classPathList), config);
    compiler = new GroovyShell(groovyClassLoader, binding, config);
  }

  protected static ClassLoader newClassLoader(List<String> cpList) {
    DynamicClassLoaderSimple loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    loader.addJars(cpList);
    // loader.addDynamicDir(outDir);
    return loader;
  }
  
  protected static URLClassLoader newClassLoader_OLD(List<String> dirs) {
    List<URL> urlList = new ArrayList<>();
    for (String dir : dirs) {
      try {
        urlList.add(Paths.get(dir).toUri().toURL());
      } catch (MalformedURLException e) {
        logger.error(e.getMessage());
      }
    }
    return new URLClassLoader(urlList.toArray(new URL[urlList.size()]), null);
  }

  protected static List<String> convertImportsToList(String input) {
    List<String> ret = new ArrayList<>();
    if (input != null && !input.isEmpty()) {
      for (String line : input.split("\\n+")) {
        if (!line.trim().isEmpty()) {
          ret.add(line);
        }
      }
    }
    return ret;
  }

  protected static List<String> convertClassPathToList(String input) {
    List<String> ret = new ArrayList<String>();
    if (input != null && !input.isEmpty()) {
      for (String p : Arrays.asList(input.split("[\\s" + File.pathSeparatorChar + "]+"))) {
        ret.add(envVariablesFilter(p, System.getenv()));
      }
    }
    return ret;
  }

  protected static String getClassPathAsStringFromList(List<String> input) {
    String ret = "";
    for (String string : input) {
      ret += (string + File.pathSeparatorChar);
    }
    return ret;
  }

  protected static ImportCustomizer getImportCustomizer(List<String> input) {
    ImportCustomizer ret = new ImportCustomizer();
    if (!input.isEmpty()) {
      for (String importLine : input) {
        if (importLine.startsWith(STATIC_WORD_WITH_SPACE)) {

          String pureImport = importLine.replace(STATIC_WORD_WITH_SPACE, StringUtils.EMPTY).replace(DOT_STAR_POSTFIX, StringUtils.EMPTY);

          if (importLine.endsWith(DOT_STAR_POSTFIX)) {
            ret.addStaticStars(pureImport);
          } else {
            int index = pureImport.lastIndexOf('.');
            if (index == -1) {
              continue;
            }
            ret.addStaticImport(pureImport.substring(0, index), pureImport.substring(index + 1));
          }

        } else {

          if (importLine.endsWith(DOT_STAR_POSTFIX)) {
            ret.addStarImports(importLine.replace(DOT_STAR_POSTFIX, StringUtils.EMPTY));
          } else {
            ret.addImports(importLine);
          }
        }
      }
    }
    return ret;
  }

  static String envVariablesFilter(String p, Map<String, String> env) {
    if (p != null) {
      for (Pattern pattern : envVariablePatterns) {
        Matcher matcher = pattern.matcher(p);
        String r = "";
        int lastIndex = 0;
        while (matcher.find()) {
          String var = matcher.group(1);
          String substitute = env.get(var);
          if (substitute == null) {
            substitute = "";
          }
          r += p.substring(lastIndex, matcher.start());
          r += substitute;
          lastIndex = matcher.end();
        }
        r += p.substring(lastIndex, p.length());
        p = r;
      }
    }
    return p;
  }

  @Override
  public Object executeCode(String code) {
    Object ret = null;
    Thread.currentThread().setContextClassLoader(groovyClassLoader);
    logger.debug("Running: {}", code);
    Script script = compiler.parse(code);
    script.setMetaClass(getMetaClass(script.getClass()));
    logger.trace("code compiled");
    binding.setVariable(BEAKER_VARIABLE, new HashMap<String, Object>());// TODO load variables
    script.setBinding(binding);
    logger.trace("Run script");
    ret = script.run();
    logger.debug("Result is {}", ret);
    return ret;
  }

  protected MetaClass getMetaClass(Class aClass) {
    MetaClass mc = new ExpandoMetaClass(aClass, false);
    ((ExpandoMetaClass) mc).initialize();
    return mc;
  }

}