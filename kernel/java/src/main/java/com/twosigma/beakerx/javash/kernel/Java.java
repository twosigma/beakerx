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
package com.twosigma.beakerx.javash.kernel;

import com.twosigma.beakerx.BeakerXCommRepository;
import com.twosigma.beakerx.CommRepository;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.javash.comm.JavaCommOpenHandler;
import com.twosigma.beakerx.javash.evaluator.JavaEvaluator;
import com.twosigma.beakerx.javash.handler.JavaKernelInfoHandler;
import com.twosigma.beakerx.kernel.*;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.restserver.impl.GetUrlArgHandler;
import com.twosigma.beakerx.message.Message;

import java.util.HashMap;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.kernel.Utils.uuid;


public class Java extends Kernel {

  private Java(final String id,
               final Evaluator evaluator,
               KernelSocketsFactory kernelSocketsFactory,
               CommRepository commRepository,
               BeakerXServer beakerXServer) {
    super(id, evaluator, kernelSocketsFactory, new CustomMagicCommandsEmptyImpl(), commRepository, beakerXServer);
  }

  public Java(final String id,
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
    return new JavaCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new JavaKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) {
    KernelRunner.run(() -> {
      String id = uuid();
      CommRepository commRepository = new BeakerXCommRepository();
      KernelConfigurationFile configurationFile = new KernelConfigurationFile(args);
      KernelSocketsFactoryImpl kernelSocketsFactory = new KernelSocketsFactoryImpl(
              configurationFile);
      NamespaceClient beakerxClient = NamespaceClient.create(id, configurationFile, commRepository);
      JavaEvaluator e = new JavaEvaluator(id,
              id,
              getKernelParameters(),
              beakerxClient);
      return new Java(id, e, kernelSocketsFactory, commRepository, new JavaBeakerXServer(new GetUrlArgHandler(beakerxClient)));
    });
  }

  public static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new JavaDefaultVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }
}
