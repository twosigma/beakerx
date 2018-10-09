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
package com.twosigma.beakerx.groovy.kernel;

import com.twosigma.beakerx.BeakerXCommRepository;
import com.twosigma.beakerx.CommRepository;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.groovy.comm.GroovyCommOpenHandler;
import com.twosigma.beakerx.groovy.evaluator.GroovyEvaluator;
import com.twosigma.beakerx.groovy.handler.GroovyKernelInfoHandler;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.kernel.CacheFolderFactory;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.CustomMagicCommandsEmptyImpl;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelConfigurationFile;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.KernelSocketsFactoryImpl;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.restserver.impl.GetUrlArgHandler;
import com.twosigma.beakerx.message.Message;

import java.util.HashMap;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.kernel.Utils.uuid;

public class Groovy extends Kernel {

  private Groovy(final String id,
                 final Evaluator evaluator,
                 KernelSocketsFactory kernelSocketsFactory,
                 CommRepository commRepository,
                 BeakerXServer beakerXServer) {
    super(id, evaluator, kernelSocketsFactory, new CustomMagicCommandsEmptyImpl(), commRepository, beakerXServer);
  }

  public Groovy(final String id,
                final Evaluator evaluator,
                KernelSocketsFactory kernelSocketsFactory,
                CloseKernelAction closeKernelAction,
                CacheFolderFactory cacheFolderFactory,
                CommRepository commRepository,
                BeakerXServer beakerXServer) {
    super(id,
            evaluator,
            kernelSocketsFactory,
            closeKernelAction,
            cacheFolderFactory,
            new CustomMagicCommandsEmptyImpl(),
            commRepository,
            beakerXServer);
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new GroovyCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new GroovyKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) {
    KernelRunner.run(() -> {
      String id = uuid();
      KernelConfigurationFile configurationFile = new KernelConfigurationFile(args);
      KernelSocketsFactoryImpl kernelSocketsFactory = new KernelSocketsFactoryImpl(
              configurationFile);

      BeakerXCommRepository beakerXCommRepository = new BeakerXCommRepository();
      NamespaceClient namespaceClient = NamespaceClient.create(id, configurationFile, beakerXCommRepository);
      GroovyEvaluator evaluator = new GroovyEvaluator(id,
              id,
              getEvaluatorParameters(),
              namespaceClient);
      return new Groovy(id, evaluator, kernelSocketsFactory, beakerXCommRepository, new GroovyBeakerXServer(new GetUrlArgHandler(namespaceClient)));
    });
  }


  public static EvaluatorParameters getEvaluatorParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new GroovyDefaultVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }
}
