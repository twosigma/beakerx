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
package com.twosigma.beakerx.clojure.kernel;

import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;
import static com.twosigma.beakerx.kernel.Utils.uuid;
import static java.util.Arrays.stream;

import clojure.lang.LazySeq;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.DisplayerDataMapper;
import com.twosigma.beakerx.clojure.evaluator.ClojureEvaluator;
import com.twosigma.beakerx.clojure.handlers.ClojureCommOpenHandler;
import com.twosigma.beakerx.clojure.handlers.ClojureKernelInfoHandler;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.kernel.CloseKernelAction;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelConfigurationFile;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.KernelRunner;
import com.twosigma.beakerx.kernel.KernelSocketsFactory;
import com.twosigma.beakerx.kernel.KernelSocketsFactoryImpl;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import jupyter.Displayer;
import jupyter.Displayers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Clojure extends Kernel {

  private Clojure(String sessionId, Evaluator evaluator, KernelSocketsFactory kernelSocketsFactory) {
    super(sessionId, evaluator, kernelSocketsFactory);
  }

  public Clojure(String sessionId, Evaluator evaluator, KernelSocketsFactory kernelSocketsFactory, CloseKernelAction closeKernelAction) {
    super(sessionId, evaluator, kernelSocketsFactory, closeKernelAction);
  }

  @Override
  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new ClojureCommOpenHandler(kernel);
  }

  @Override
  public KernelHandler<Message> getKernelInfoHandler(Kernel kernel) {
    return new ClojureKernelInfoHandler(kernel);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    KernelRunner.run(() -> {
      String id = uuid();
      KernelSocketsFactoryImpl kernelSocketsFactory = new KernelSocketsFactoryImpl(
              new KernelConfigurationFile(args));
      ClojureEvaluator evaluator = new ClojureEvaluator(id, id, getKernelParameters());
      return new Clojure(id, evaluator, kernelSocketsFactory);
    });
  }

  @Override
  protected void configureJvmRepr() {
    Displayers.register(LazySeq.class, new Displayer<LazySeq>() {
      @Override
      public Map<String, String> display(LazySeq value) {
        return new HashMap<String, String>() {{
          List<String> collect = stream(value.toArray()).map(Object::toString).collect(Collectors.toList());
          put(MIMEContainer.MIME.TEXT_PLAIN, new ArrayList<>(collect).toString());
        }};
      }
    });
    DisplayerDataMapper.register(converter);
  }

  private static ObjectMapper mapper = new ObjectMapper();

  private static DisplayerDataMapper.Converter converter = data -> {
    if (data instanceof Collection) {
      String json = mapper.writeValueAsString(data);
      return mapper.readValue(json, Object.class);
    }
    return data;
  };

  private static EvaluatorParameters getKernelParameters() {
    HashMap<String, Object> kernelParameters = new HashMap<>();
    kernelParameters.put(IMPORTS, new ClojureDefaultVariables().getImports());
    return new EvaluatorParameters(kernelParameters);
  }
}
