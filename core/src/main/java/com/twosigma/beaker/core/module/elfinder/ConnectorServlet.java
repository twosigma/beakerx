package com.twosigma.beaker.core.module.elfinder;

import cn.bluejoe.elfinder.controller.executor.CommandExecutorFactory;
import cn.bluejoe.elfinder.controller.executor.DefaultCommandExecutorFactory;
import cn.bluejoe.elfinder.controller.executors.MissingCommandExecutor;
import cn.bluejoe.elfinder.impl.DefaultFsService;
import cn.bluejoe.elfinder.impl.DefaultFsServiceConfig;
import cn.bluejoe.elfinder.impl.FsSecurityCheckForAll;
import cn.bluejoe.elfinder.impl.StaticFsServiceFactory;
import cn.bluejoe.elfinder.localfs.LocalFsVolume;
import com.google.inject.Singleton;

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
  ConnectorController _connectorController;

  /**
   * create a command executor factory
   *
   * @param config
   * @return
   */
  protected CommandExecutorFactory createCommandExecutorFactory(ServletConfig config) {
    DefaultCommandExecutorFactory defaultCommandExecutorFactory = new DefaultCommandExecutorFactory();
    defaultCommandExecutorFactory.setClassNamePattern("cn.bluejoe.elfinder.controller.executors.%sCommandExecutor");
    defaultCommandExecutorFactory.setFallbackCommand(new MissingCommandExecutor());
    return defaultCommandExecutorFactory;
  }

  /**
   * create a connector controller
   *
   * @param config
   * @return
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

    fsService.addVolume("A",
      createLocalFsVolume(System.getProperty("user.home"), new File(System.getProperty("user.home"))));
//    fsService.addVolume("B",
//      createLocalFsVolume("/", new File("/")));

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
   *
   * @param config
   * @return
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
    _connectorController.connector(req, resp);
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException {
    _connectorController.connector(req, resp);
  }

  @Override
  public void init(ServletConfig config) throws ServletException {
    _connectorController = createConnectorController(config);
  }
}
