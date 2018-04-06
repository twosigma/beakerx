/*
 *  Copyright 2014-2016 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.scala.evaluator;

import com.google.inject.Provider;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.jvm.classloader.BeakerUrlClassLoader;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.scala.serializers.ScalaCollectionDeserializer;
import com.twosigma.beakerx.scala.serializers.ScalaCollectionSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaListOfPrimitiveTypeMapsSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaMapDeserializer;
import com.twosigma.beakerx.scala.serializers.ScalaMapSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaPrimitiveTypeListOfListSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaPrimitiveTypeMapSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaTableDeSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.List;
import java.util.concurrent.Executors;

public class ScalaEvaluator extends BaseEvaluator {

  private final static Logger logger = LoggerFactory.getLogger(ScalaEvaluator.class.getName());
  private BeakerxObjectFactory beakerxObjectFactory;
  private final Provider<BeakerObjectConverter> objectSerializerProvider;
  private static boolean autoTranslationSetup = false;
  private BeakerUrlClassLoader classLoader;
  private ScalaEvaluatorGlue shell;

  public ScalaEvaluator(String id, String sId, Provider<BeakerObjectConverter> osp, EvaluatorParameters evaluatorParameters) {
    this(id, sId, osp, new BeakerCellExecutor("scala"), new BeakerxObjectFactoryImpl(), new TempFolderFactoryImpl(), evaluatorParameters);
  }

  public ScalaEvaluator(String id, String sId, Provider<BeakerObjectConverter> osp, CellExecutor cellExecutor, BeakerxObjectFactory beakerxObjectFactory, TempFolderFactory tempFolderFactory, EvaluatorParameters evaluatorParameters) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters);
    this.objectSerializerProvider = osp;
    this.beakerxObjectFactory = beakerxObjectFactory;
    this.classLoader = newClassLoader();
    this.shell = createNewEvaluator();
  }

  @Override
  public TryResult evaluate(SimpleEvaluationObject seo, String code) {
    return evaluate(seo, new ScalaWorkerThread(this, new JobDescriptor(code, seo)));
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    classLoader.addJar(pathToJar);
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    addImportToShell(this.shell, anImport);
  }

  @Override
  protected void doReloadEvaluator() {
    this.classLoader = newClassLoader();
    this.shell = createNewEvaluator();
  }

  @Override
  protected void doResetEnvironment() {
    this.classLoader = newClassLoader();
    this.shell = createNewEvaluator();
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  public void exit() {
    super.exit();
    cancelExecution();
    executorService.shutdown();
  }

  @Override
  public ClassLoader getClassLoader() {
    return this.classLoader;
  }

  ScalaEvaluatorGlue getShell() {
    return shell;
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    AutocompleteResult lineCompletion = shell.autocomplete(code, caretPosition);
    return new AutocompleteResult(lineCompletion.getMatches(), lineCompletion.getStartIndex());
  }

  private String adjustImport(String imp) {
    if (imp.startsWith("import"))
      imp = imp.substring(6).trim();
    // Scala doesn't need "static"
    if (imp.startsWith("static"))
      imp = imp.substring(6).trim();
    // May need more of these, but all Scala keywords that aren't Java keywords is probably overkill
    if (imp.contains(".object.")) {
      imp = imp.replace(".object.", ".`object`.");
    }
    if (imp.endsWith(".*"))
      imp = imp.substring(0, imp.length() - 1) + "_";
    return imp;
  }

  private ScalaEvaluatorGlue createNewEvaluator() {
    logger.debug("creating new evaluator");
    String loader_cp = createLoaderCp();
    ScalaEvaluatorGlue shell = new ScalaEvaluatorGlue(this.classLoader, loader_cp, getOutDir());
    if (!getImports().isEmpty()) {
      addImportsToShell(shell, getImports().getImportPaths());
    }
    logger.debug("creating beaker object");
    // ensure object is created
    NamespaceClient.getBeaker(getSessionId());
    String r = shell.evaluate2(this.beakerxObjectFactory.create(getSessionId()));
    if (r != null && !r.isEmpty()) {
      logger.warn("ERROR creating beaker object: {}", r);
    }
    return shell;
  }

  private void addImportsToShell(ScalaEvaluatorGlue shell, List<ImportPath> importsPaths) {
    if (!importsPaths.isEmpty()) {
      String[] imp = importsPaths.stream().map(importPath -> adjustImport(importPath.asString())).toArray(String[]::new);
      logger.debug("importing : {}", importsPaths);
      if (!shell.addImports(imp)) {
        logger.warn("ERROR: cannot add import '{}'", (Object[]) imp);
      }
    }
  }

  private void addImportToShell(ScalaEvaluatorGlue shell, ImportPath importPath) {
    String imp = importPath.asString().trim();
    imp = adjustImport(imp);
    if (!imp.isEmpty()) {
      logger.debug("importing : {}", imp);
      if (!shell.addImport(imp))
        logger.warn("ERROR: cannot add import '{}'", imp);
    }
  }

  /*
   * Scala uses multiple classloaders and (unfortunately) cannot fallback to the java one while compiling scala code so we
   * have to build our DynamicClassLoader and also build a proper classpath for the compiler classloader.
   */
  private BeakerUrlClassLoader newClassLoader() {
    logger.debug("creating new loader");
    BeakerUrlClassLoader cl = new BeakerUrlClassLoader(ClassLoader.getSystemClassLoader());
    cl.addPathToJars(getClasspath().getPaths());
    return cl;
  }

  private String createLoaderCp() {
    String loader_cp = "";
    for (int i = 0; i < getClasspath().size(); i++) {
      loader_cp += getClasspath().get(i);
      loader_cp += File.pathSeparatorChar;
    }
    return loader_cp + File.pathSeparatorChar + System.getProperty("java.class.path");
  }

  public void setupAutoTranslation() {
    if (autoTranslationSetup)
      return;

    objectSerializerProvider.get().addfTypeSerializer(new ScalaCollectionSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaMapSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaPrimitiveTypeListOfListSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaListOfPrimitiveTypeMapsSerializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeSerializer(new ScalaPrimitiveTypeMapSerializer(objectSerializerProvider.get()));

    objectSerializerProvider.get().addfTypeDeserializer(new ScalaCollectionDeserializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeDeserializer(new ScalaMapDeserializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeDeserializer(new ScalaTableDeSerializer(objectSerializerProvider.get()));

    autoTranslationSetup = true;
  }

}