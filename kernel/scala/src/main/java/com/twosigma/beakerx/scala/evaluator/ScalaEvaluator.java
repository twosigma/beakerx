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
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.KernelParameters;
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
import java.io.IOException;
import java.net.MalformedURLException;

public class ScalaEvaluator extends BaseEvaluator {

  private final static Logger logger = LoggerFactory.getLogger(ScalaEvaluator.class.getName());

  protected boolean exit;
  protected boolean updateLoader;
  private BeakerxObjectFactory beakerxObjectFactory;
  protected ScalaWorkerThread workerThread;
  protected String currentClassPath;
  protected String currentImports;
  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  public ScalaEvaluator(String id, String sId, Provider<BeakerObjectConverter> osp) {
    this(id, sId, osp, new BeakerCellExecutor("scala"), new BeakerxObjectFactoryImpl());
  }

  public ScalaEvaluator(String id, String sId, Provider<BeakerObjectConverter> osp, CellExecutor cellExecutor, BeakerxObjectFactory beakerxObjectFactory) {
    super(id, sId, cellExecutor);
    objectSerializerProvider = osp;
    this.beakerxObjectFactory = beakerxObjectFactory;
    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    workerThread = new ScalaWorkerThread(this, this.beakerxObjectFactory);
    workerThread.start();
    try {
      newAutoCompleteEvaluator();
    } catch (MalformedURLException e) {
    }
  }

  private static boolean autoTranslationSetup = false;

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

  @Override
  protected void doResetEnvironment() {
    updateLoader = true;
    try {
      newAutoCompleteEvaluator();
    } catch (MalformedURLException e) {
    }
  }

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

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new JobDescriptor(code, seo));
    syncObject.release();
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

  protected ScalaEvaluatorGlue shell;
  protected String loader_cp = "";
  protected ScalaEvaluatorGlue acshell;
  protected String acloader_cp = "";

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


  protected ClassLoader newAutoCompleteClassLoader() throws MalformedURLException {
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

  protected void newAutoCompleteEvaluator() throws MalformedURLException {
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

  public boolean executeTask(ScalaCodeRunner scalaCodeRunner) {
    return executor.executeTask(scalaCodeRunner);
  }

}