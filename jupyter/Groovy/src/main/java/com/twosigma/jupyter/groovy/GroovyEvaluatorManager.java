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
package com.twosigma.jupyter.groovy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.groovy.control.CompilerConfiguration;
import org.codehaus.groovy.control.customizers.ImportCustomizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import groovy.lang.Binding;
import groovy.lang.ExpandoMetaClass;
import groovy.lang.GroovyClassLoader;
import groovy.lang.GroovyShell;
import groovy.lang.MetaClass;
import groovy.lang.Script;

public class GroovyEvaluatorManager {
  
  private static final String STATIC_WORD_WITH_SPACE = "static ";
  private static final String DOT_STAR_POSTFIX = ".*";
  private static final String BEAKER_VARIABLE = "beaker";
  
  public static Logger logger = LoggerFactory.getLogger(GroovyEvaluatorManager.class);

  protected List<String> importList = new ArrayList<>();
  protected GroovyClassLoader groovyClassLoader;
  protected Binding binding;
  protected GroovyShell compiler;
 
  
  //TODO use all variables
  public GroovyEvaluatorManager(String classPath, String imports, String outDir){
    super();
    importList = setImportsToList(imports);
    binding = new Binding();
    CompilerConfiguration config = new CompilerConfiguration().addCompilationCustomizers(getImportCustomizer(importList));
    groovyClassLoader = new GroovyClassLoader(newClassLoader(), config);
    compiler = new GroovyShell(this.getClass().getClassLoader(), binding, config);
  }
  
  protected ClassLoader newClassLoader() {
    return ClassLoader.getSystemClassLoader(); //TODO use com.twosigma.beaker.jvm.classloader.DynamicClassLoaderSimple
  }
  
  protected static List<String> setImportsToList(String input){
    List<String> importList = new ArrayList<>();
    if(input != null && !input.isEmpty()){
      for (String line : input.split("\\n+")) {
        if (!line.trim().isEmpty()) {
          importList.add(line);
        }
      }
    }
    return importList;
  }
  
  protected static ImportCustomizer getImportCustomizer(List<String> input){
    ImportCustomizer ret = new ImportCustomizer();
    if (!input.isEmpty()) {
      for (String importLine : input) {
        if (importLine.startsWith(STATIC_WORD_WITH_SPACE)) {

          String pureImport = importLine.replace(STATIC_WORD_WITH_SPACE, StringUtils.EMPTY) .replace(DOT_STAR_POSTFIX, StringUtils.EMPTY);

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

  //TODO remove if not needed
  @Deprecated
  public Object executeCode_OLD(String code) throws InstantiationException, IllegalAccessException {
    Object ret = null;
    logger.debug("Running: {}", code);
    Class<?> parsedClass = groovyClassLoader.parseClass(code);
    Script script = (Script) parsedClass.newInstance();
    logger.trace("code compiled");
    binding.setVariable(BEAKER_VARIABLE, new HashMap<String, Object>());// TODO load variables
    script.setBinding(binding);
    logger.trace("Run script");
    ret = script.run();
    logger.debug("Result is {}", ret);
    return ret;
  }
  
  
  public Object executeCode(String code) {
    Object ret = null;
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