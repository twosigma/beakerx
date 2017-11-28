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
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.jvm.classloader.BeakerxUrlClassLoader;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
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
import scala.collection.JavaConversions;
import scala.collection.Seq;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;

import static java.util.Collections.singletonList;

public class ScalaEvaluator extends BaseEvaluator {

  private final static Logger logger = LoggerFactory.getLogger(ScalaEvaluator.class.getName());
  private BeakerxObjectFactory beakerxObjectFactory;
  private ScalaWorkerThread workerThread;
  private final Provider<BeakerObjectConverter> objectSerializerProvider;
  private static boolean autoTranslationSetup = false;
  private BeakerxUrlClassLoader classLoader;

  public ScalaEvaluator(String id, String sId, Provider<BeakerObjectConverter> osp, EvaluatorParameters evaluatorParameters) {
    this(id, sId, osp, new BeakerCellExecutor("scala"), new BeakerxObjectFactoryImpl(), new TempFolderFactoryImpl(), evaluatorParameters);
  }

  public ScalaEvaluator(String id, String sId, Provider<BeakerObjectConverter> osp, CellExecutor cellExecutor, BeakerxObjectFactory beakerxObjectFactory, TempFolderFactory tempFolderFactory, EvaluatorParameters evaluatorParameters) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters);
    objectSerializerProvider = osp;
    this.beakerxObjectFactory = beakerxObjectFactory;
    newEvaluator();
    workerThread = new ScalaWorkerThread(this);
    workerThread.start();
    try {
      newAutoCompleteEvaluator();
    } catch (MalformedURLException e) {
    }
  }

  @Override
  public ClassLoader getClassLoader() {
    return classLoader;
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    try {
      URL path = Paths.get(pathToJar.getPath()).toUri().toURL();
      classLoader.addJar(path);
      Seq<URL> urls = JavaConversions.asScalaBuffer(singletonList(path)).toSeq();
      logger.info("addJarToClassLoader ----> " + urls);
      shell.interpreter().addUrlsToClassPath(urls);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    addImportToShell(anImport);
  }

  @Override
  protected void doResetEnvironment() {
    clearShell();
    newEvaluator();
    try {
      newAutoCompleteEvaluator();
    } catch (MalformedURLException e) {
    }
    workerThread.halt();
  }

  @Override
  public void exit() {
    super.exit();
    workerThread.doExit();
    cancelExecution();
    workerThread.halt();
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    workerThread.add(new JobDescriptor(code, seo));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    if (acshell != null) {
      int lineStart = 0;
      String[] sv = code.substring(0, caretPosition).split("\n");
      for (int i = 0; i < sv.length - 1; i++) {
        acshell.evaluate2(sv[i]);
        caretPosition -= sv[i].length() + 1;
        lineStart += sv[i].length() + 1;
      }
      AutocompleteResult lineCompletion = acshell.autocomplete(sv[sv.length - 1], caretPosition);
      return new AutocompleteResult(lineCompletion.getMatches(), lineCompletion.getStartIndex() + lineStart);
    }
    return null;
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

  private ScalaEvaluatorGlue shell;
  private String loader_cp = "";
  private ScalaEvaluatorGlue acshell;
  private String acloader_cp = "";

  String adjustImport(String imp) {
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

  private ClassLoader newAutoCompleteClassLoader() throws MalformedURLException {
    logger.debug("creating new autocomplete loader");
    acloader_cp = "";
    for (int i = 0; i < classPath.size(); i++) {
      acloader_cp += classPath.get(i);
      acloader_cp += File.pathSeparatorChar;
    }
    acloader_cp += outDir;

    DynamicClassLoaderSimple cl = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    cl.addJars(classPath.getPathsAsStrings());
    cl.addDynamicDir(outDir);
    return cl;
  }

  private void newAutoCompleteEvaluator() throws MalformedURLException {
    logger.debug("creating new autocomplete evaluator");
    acshell = new ScalaEvaluatorGlue(newAutoCompleteClassLoader(),
            acloader_cp + File.pathSeparatorChar + System.getProperty("java.class.path"), outDir);

    if (!imports.isEmpty()) {
      for (int i = 0; i < imports.getImportPaths().size(); i++) {
        String imp = imports.getImportPaths().get(i).asString().trim();
        imp = adjustImport(imp);
        if (!imp.isEmpty()) {
          if (!acshell.addImport(imp))
            logger.warn("ERROR: cannot add import '{}'", imp);
        }
      }
    }

    // ensure object is created
    NamespaceClient.getBeaker(sessionId);

    String r = acshell.evaluate2(this.beakerxObjectFactory.create(this.sessionId));
    if (r != null && !r.isEmpty()) {
      logger.warn("ERROR creating beaker beaker: {}", r);
    }
  }

  void newEvaluator() {
    logger.debug("creating new evaluator");
    this.classLoader = newClassLoader();
    shell = new ScalaEvaluatorGlue(classLoader,
            loader_cp + File.pathSeparatorChar + System.getProperty("java.class.path"), getOutDir());

    if (!getImports().isEmpty()) {
      for (ImportPath importPath : getImports().getImportPaths()) {
        addImportToShell(importPath);
      }
    }

    logger.debug("creating beaker object");

    // ensure object is created
    NamespaceClient.getBeaker(getSessionId());

    String r = shell.evaluate2(this.beakerxObjectFactory.create(getSessionId()));
    if (r != null && !r.isEmpty()) {
      logger.warn("ERROR creating beaker object: {}", r);
    }
  }

  private void addImportToShell(ImportPath importPath) {
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
  private BeakerxUrlClassLoader newClassLoader() {
    logger.debug("creating new loader");

    loader_cp = "";
    for (int i = 0; i < getClasspath().size(); i++) {
      loader_cp += getClasspath().get(i);
      loader_cp += File.pathSeparatorChar;
    }
    loader_cp += getOutDir();
    BeakerxUrlClassLoader cl = new BeakerxUrlClassLoader(ClassLoader.getSystemClassLoader());
    cl.addJars(getClasspath().getPathsAsStrings());
    return cl;
  }


  public ScalaEvaluatorGlue getShell() {
    return shell;
  }

  public void clearShell() {
    this.shell = null;
  }
}