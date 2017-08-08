/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beakerx.groovy.autocomplete.GroovyClasspathScanner;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.PathToJar;

import java.io.File;

import static com.twosigma.beakerx.groovy.evaluator.EnvVariablesFilter.envVariablesFilter;


public class GroovyEvaluator extends BaseEvaluator {

  public static boolean LOCAL_DEV = false;

  private GroovyClasspathScanner cps;
  private GroovyAutocomplete gac;
  private GroovyWorkerThread worker = null;

  public GroovyEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("groovy"));
  }

  public GroovyEvaluator(String id, String sId, CellExecutor cellExecutor) {
    super(id, sId, cellExecutor);
    cps = new GroovyClasspathScanner();
    gac = createGroovyAutocomplete(cps);
    outDir = envVariablesFilter(outDir, System.getenv());
    worker = new GroovyWorkerThread(this);
    worker.start();
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    worker.add(new JobDescriptor(code, seo));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return gac.doAutocomplete(code, caretPosition, worker.groovyClassLoader);
  }

  @Override
  protected void doResetEnvironment() {
    String cpp = createClasspath(classPath);
    cps = new GroovyClasspathScanner(cpp);
    gac = createAutocomplete(cps, imports);
    worker.updateLoader();
    worker.halt();
  }

  @Override
  public void exit() {
    worker.doExit();
    cancelExecution();
    worker.halt();
  }

  @Override
  protected boolean addJar(PathToJar path) {
    return classPath.add(new PathToJar(envVariablesFilter(path.getPath(), System.getenv())));
  }

  private GroovyAutocomplete createGroovyAutocomplete(GroovyClasspathScanner c) {
    return new GroovyAutocomplete(c);
  }

  private GroovyAutocomplete createAutocomplete(GroovyClasspathScanner cps, Imports imports) {
    GroovyAutocomplete gac = createGroovyAutocomplete(cps);
    for (ImportPath st : imports.getImportPaths()) {
      gac.addImport(st.asString());
    }
    return gac;
  }

  private String createClasspath(Classpath classPath) {
    StringBuilder cppBuilder = new StringBuilder();
    for (String pt : classPath.getPathsAsStrings()) {
      cppBuilder.append(pt);
      cppBuilder.append(File.pathSeparator);
    }
    String cpp = cppBuilder.toString();
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    return cpp;
  }


}
