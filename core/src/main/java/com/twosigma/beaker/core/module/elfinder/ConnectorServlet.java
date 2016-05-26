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
package com.twosigma.beaker.core.module.elfinder;


import com.google.inject.Singleton;
import com.twosigma.beaker.core.module.elfinder.service.CommandFactory;
import com.twosigma.beaker.core.module.elfinder.impl.DefaultCommandFactory;
import com.twosigma.beaker.core.module.elfinder.impl.commands.MissingCommand;
import com.twosigma.beaker.core.module.elfinder.impl.DefaultFsService;
import com.twosigma.beaker.core.module.elfinder.impl.DefaultFsServiceConfig;
import com.twosigma.beaker.core.module.elfinder.impl.FsSecurityCheckForAll;
import com.twosigma.beaker.core.module.elfinder.impl.StaticFsServiceFactory;
import com.twosigma.beaker.core.module.elfinder.impl.localfs.LocalFsVolume;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

@Singleton
public class ConnectorServlet extends HttpServlet {
  //core member of this Servlet
  private ConnectorController connectorController;

  /**
   * create a command executor factory
   */
  protected CommandFactory createCommandExecutorFactory(ServletConfig config) {
    DefaultCommandFactory defaultCommandExecutorFactory = new DefaultCommandFactory();
    defaultCommandExecutorFactory.setClassNamePattern("com.twosigma.beaker.core.module.elfinder.impl.commands.%sCommand");
    defaultCommandExecutorFactory.setFallbackCommand(new MissingCommand());
    return defaultCommandExecutorFactory;
  }

  /**
   * create a connector controller
   */
  protected ConnectorController createConnectorController(ServletConfig config) {
    ConnectorController connectorController = new ConnectorController();

    connectorController.setCommandExecutorFactory(createCommandExecutorFactory(config));
    connectorController.setFsServiceFactory(createServiceFactory(config));

    return connectorController;
  }

  protected DefaultFsService createFsService() {
    DefaultFsService fsService = new DefaultFsService();
    fsService.setSecurityChecker(new FsSecurityCheckForAll());

    DefaultFsServiceConfig serviceConfig = new DefaultFsServiceConfig();
    serviceConfig.setTmbWidth(80);

    fsService.setServiceConfig(serviceConfig);
    String userHomeDir = System.getProperty("user.home");
    if (System.getProperty("os.name").toLowerCase().contains("win")) {
      fsService.addVolume("A",
                          createLocalFsVolume(userHomeDir,
                                              new File(userHomeDir)));

      File[] roots = File.listRoots();
      for(int i = 0; i < roots.length ; i++) {
        fsService.addVolume(roots[i].getPath(),
                            createLocalFsVolume(roots[i].getPath(),
                                                roots[i]));
      }
    } else {
      fsService.addVolume("A",
                          createLocalFsVolume("/", new File("/")));
      fsService.addVolume("B",
                          createLocalFsVolume(userHomeDir,
                                              new File(userHomeDir)));
    }


    return fsService;
  }

  private LocalFsVolume createLocalFsVolume(String name, File rootDir) {
    LocalFsVolume localFsVolume = new LocalFsVolume();
    localFsVolume.setName(name);
    localFsVolume.setRootDir(rootDir);
    return localFsVolume;
  }

  /**
   * create a service factory
   */
  protected StaticFsServiceFactory createServiceFactory(ServletConfig config) {
    StaticFsServiceFactory staticFsServiceFactory = new StaticFsServiceFactory();
    DefaultFsService fsService = createFsService();

    staticFsServiceFactory.setFsService(fsService);
    return staticFsServiceFactory;
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException {
    connectorController.connector(req, resp);
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException {
    connectorController.connector(req, resp);
  }

  @Override
  public void init(ServletConfig config) throws ServletException {
    connectorController = createConnectorController(config);
  }
}
