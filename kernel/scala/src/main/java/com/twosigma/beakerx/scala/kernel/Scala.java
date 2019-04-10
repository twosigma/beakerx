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
package com.twosigma.beakerx.scala.kernel;

import com.twosigma.beakerx.BeakerXCommRepository;
import com.twosigma.beakerx.CommRepository;
import com.twosigma.beakerx.DisplayerDataMapper;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.ClasspathScannerImpl;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.kernel.BeakerXJsonConfig;
import com.twosigma.beakerx.kernel.Configuration;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelConfigurationFile;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactoryImpl;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandConfiguration;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandConfigurationImpl;
import com.twosigma.beakerx.kernel.restserver.impl.GetUrlArgHandler;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.comm.ScalaCommOpenHandler;
import com.twosigma.beakerx.scala.evaluator.BeakerxObjectFactoryImpl;
import com.twosigma.beakerx.scala.evaluator.ScalaEvaluator;
import com.twosigma.beakerx.scala.handler.ScalaKernelInfoHandler;
import com.twosigma.beakerx.scala.magic.command.CustomMagicCommandsImpl;
import scala.collection.JavaConverters;
import scala.collection.Seq;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.kernel.Utils.uuid;

public class Scala extends Kernel {

  public Scala(final String sessionId, final Evaluator evaluator, Configuration configuration) {
    super(sessionId, evaluator, configuration);
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new ScalaCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new ScalaKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) {
    KernelRunner.run(() -> {
      String id = uuid();
      CommRepository commRepository = new BeakerXCommRepository();
      KernelConfigurationFile configurationFile = new KernelConfigurationFile(args);
      KernelSocketsFactoryImpl kernelSocketsFactory = new KernelSocketsFactoryImpl(configurationFile);
      NamespaceClient namespaceClient = NamespaceClient.create(id, configurationFile, new ScalaBeakerXJsonSerializer(), commRepository);
      MagicCommandConfiguration magicConfiguration = new MagicCommandConfigurationImpl();
      ScalaEvaluator se = new ScalaEvaluator(
              id,
              id,
              new BeakerCellExecutor("scala"),
              new BeakerxObjectFactoryImpl(),
              new TempFolderFactoryImpl(),
              getKernelParameters(),
              namespaceClient,
              magicConfiguration.patterns(),
              new ClasspathScannerImpl());
      return new Scala(id,
              se,
              new Configuration(
                      kernelSocketsFactory,
                      new CustomMagicCommandsImpl(),
                      commRepository,
                      new ScalaBeakerXServer(new GetUrlArgHandler(namespaceClient)),
                      magicConfiguration,
                      new BeakerXJsonConfig()));
    });
  }

  private static DisplayerDataMapper.Converter converter = Scala::asJava;

  private static Object asJava(Object scalaObject) {
    if (scalaObject instanceof scala.collection.Seq) {
      List objects = new ArrayList(Arrays.asList(
              JavaConverters.asJavaCollectionConverter((Seq<?>) scalaObject).asJavaCollection()));

      return objects.stream().map(Scala::asJava).collect(Collectors.toList());
    } else if (scalaObject instanceof scala.collection.immutable.Map) {
      @SuppressWarnings("unchecked")
      scala.collection.immutable.Map<Object, Object> map = (scala.collection.immutable.Map<Object, Object>) scalaObject;
      Map<Object, Object> objects = new HashMap<>(JavaConverters.mapAsJavaMapConverter(map).asJava());

      return objects.entrySet().stream()
              .collect(Collectors.toMap(incomingMap -> asJava(incomingMap.getKey()), incomingMap -> asJava(incomingMap.getValue())));
    }

    return scalaObject;
  }

  private static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new ScalaDefaultVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }

  @Override
  protected void configureJvmRepr() {
    DisplayerDataMapper.register(converter);
  }

}
