/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.kernel.restserver.impl;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.MagicKernelManager;
import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.restserver.RESTAction;
import io.javalin.Handler;
import io.javalin.Javalin;
import org.jetbrains.annotations.NotNull;

import static com.twosigma.beakerx.BeakerXClient.CODE_CELL_PATH;
import static com.twosigma.beakerx.kernel.comm.GetCodeCellsHandler.INSTANCE;

public abstract class BeakerXServerJavalin implements BeakerXServer {

  private Javalin app = null;
  private Integer freePort;

  @Override
  public synchronized BeakerXServer get(KernelFunctionality kernel) {
    if (app == null) {
      app = createServer(kernel);
    }
    return this;
  }

  private Javalin createServer(KernelFunctionality kernel) {
    this.freePort = MagicKernelManager.findFreePort();
    Javalin server = Javalin.start(freePort);
    doCreateMapping(server, kernel);
    return server;
  }

  @Override
  public String getURL() {
    return String.format("http://localhost:%s/", freePort);
  }

  private void doCreateMapping(Javalin server, KernelFunctionality kernel) {
    mappingsForAllKernels(server, kernel);
    createMapping(server, kernel);
  }

  private void mappingsForAllKernels(Javalin server, KernelFunctionality kernel) {
    server.post(CODE_CELL_PATH, ctx -> {
      String body = ctx.body();
      INSTANCE.handle(body);
    });
  }

  public abstract void createMapping(Javalin app, KernelFunctionality kernel);

  @Override
  public void addPostMapping(String path, RESTAction restAction) {
    app.post(path, handleBackground(restAction));
  }

  @NotNull
  private Handler handleBackground(RESTAction restAction) {
    return ctx -> {
      restAction.run(new ContextJavalin(ctx));
      ctx.result("ok");
    };
  }
}
