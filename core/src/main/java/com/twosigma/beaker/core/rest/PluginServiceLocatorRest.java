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
package com.twosigma.beaker.core.rest;

import com.google.gson.Gson;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.sun.jersey.api.Responses;
import com.twosigma.beaker.core.module.config.BeakerConfig;
import com.twosigma.beaker.shared.module.config.WebServerConfig;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpStatus;
import org.apache.http.client.fluent.Request;
import org.jvnet.winp.WinProcess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFilePermission;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;


/**
 * This is the service that locates a plugin service. And a service will be started if the target
 * service doesn't exist.
 */
@Path("plugin-services")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class PluginServiceLocatorRest {

  private static final Logger logger = LoggerFactory.getLogger(PluginServiceLocatorRest.class.getName());

  // these 3 times are in millis
  private static final int RESTART_ENSURE_RETRY_MAX_WAIT = 30*1000;
  private static final int RESTART_ENSURE_RETRY_INTERVAL = 10;
  private static final int RESTART_ENSURE_RETRY_MAX_INTERVAL = 2500;

  private static final String REST_RULES =
    "location ^~ %(base_url)s/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/;\n" +
    "  proxy_set_header Authorization \"Basic %(auth)s\";\n" +
    "  proxy_http_version 1.1;\n" +
    "  proxy_set_header Upgrade $http_upgrade;\n" +
    "  proxy_set_header Connection \"upgrade\";\n" +
    "}\n";

  private static final String IPYTHON_RULES_BASE =
    "  rewrite ^%(base_url)s/(.*)$ /$1 break;\n" +
    "  proxy_pass http://127.0.0.1:%(port)s;\n" +
    "  proxy_http_version 1.1;\n" +
    "  proxy_set_header Upgrade $http_upgrade;\n" +
    "  proxy_set_header Connection \"upgrade\";\n" +
    "  proxy_set_header Host 127.0.0.1:%(port)s;\n" +
    "  proxy_set_header Origin \"http://127.0.0.1:%(port)s\";\n" +
    "}\n" +
    "location %(base_url)s/login {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/login;\n" +
    "}\n";

  private static final String IPYTHON1_RULES =
    "location %(base_url)s/kernels/kill/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/kernels/;\n" +
    "}\n" +
    "location %(base_url)s/kernels/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/kernels;\n" +
    "}\n" +
    "location %(base_url)s/kernelspecs/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/kernelspecs;\n" +
    "}\n" +
    "location ~ %(base_url)s/kernels/[0-9a-f-]+/ {\n" +
    IPYTHON_RULES_BASE;

  private static final String IPYTHON2_RULES =
    "location %(base_url)s/api/kernels/kill/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/api/kernels/;\n" +
    "  proxy_set_header Origin \"http://127.0.0.1:%(port)s\";\n" +
    "}\n" +
    "location %(base_url)s/api/kernels/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/api/kernels;\n" +
    "  proxy_set_header Origin \"http://127.0.0.1:%(port)s\";\n" +
    "}\n" +
    "location %(base_url)s/api/kernelspecs/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/api/kernelspecs;\n" +
    "  proxy_set_header Origin \"http://127.0.0.1:%(port)s\";\n" +
    "}\n" +
    "location %(base_url)s/api/sessions/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/api/sessions;\n" +
    "  proxy_set_header Origin \"http://127.0.0.1:%(port)s\";\n" +
    "}\n" +
    "location ~ %(base_url)s/api/kernels/[0-9a-f-]+/ {\n" +
    IPYTHON_RULES_BASE;

  private static final String CATCH_OUTDATED_REQUESTS_RULE =
      "location ~ /%(urlhash)s[a-z0-9]+\\.\\d+/cometd/ {\n" +
      "  return 404;\n" +
      "}";

  private final String nginxDir;
  private final String nginxBinDir;
  private final String nginxStaticDir;
  private final String nginxServDir;
  private final String nginxExtraRules;
  private final String userFolder;
  private final Map<String, String> nginxPluginRules;
  private final String pluginDir;
  private final String [] nginxCommand;
  private final String [] nginxRestartCommand;
  private final Boolean showZombieLogging;
  private String[] nginxEnv = null;
  private final Boolean publicServer;
  private final Integer portBase;
  private final Integer servPort;
  private final Integer corePort;
  private final Integer restartPort;
  private final Integer reservedPortCount;
  private final String authCookie;
  private final Map<String, String> pluginLocations;
  private final Map<String, List<String>> pluginArgs;
  private final Map<String, String[]> pluginEnvps;
  private final OutputLogService outputLogService;
  private final Base64 encoder;
  private final String corePassword;
  private final String urlHash;

  private final String useHttpsCert;
  private final String useHttpsKey;
  private final Boolean requirePassword;
  private final String listenInterface;

  private final String nginxTemplate;
  private final String ipythonTemplate;
  private final Map<String, PluginConfig> plugins = new HashMap<>();
  private Process nginxProc;
  private BeakerPorts beakerPorts;
  private BeakerConfig config;
  private String authToken;

  private static String[] listToArray(List<String> lst) {
    return lst.toArray(new String[lst.size()]);
  }

  @Inject
  private PluginServiceLocatorRest(
      BeakerConfig bkConfig,
      WebServerConfig webServerConfig,
      OutputLogService outputLogService,
      GeneralUtils utils) throws IOException {
    this.nginxDir = bkConfig.getNginxDirectory();
    this.nginxBinDir = bkConfig.getNginxBinDirectory();
    this.nginxStaticDir = bkConfig.getNginxStaticDirectory();
    this.nginxServDir = bkConfig.getNginxServDirectory();
    this.nginxExtraRules = bkConfig.getNginxExtraRules();
    this.userFolder = bkConfig.getUserFolder();
    this.nginxPluginRules = bkConfig.getNginxPluginRules();
    this.pluginDir = bkConfig.getPluginDirectory();
    this.publicServer = bkConfig.getPublicServer();
    this.portBase = bkConfig.getPortBase();
    this.useHttpsCert = bkConfig.getUseHttpsCert();
    this.useHttpsKey = bkConfig.getUseHttpsKey();
    this.requirePassword = bkConfig.getRequirePassword();
    this.listenInterface = bkConfig.getListenInterface();
    this.servPort = this.portBase + 1;
    this.corePort = this.portBase + 2;
    this.restartPort = this.portBase + 3;
    this.reservedPortCount = bkConfig.getReservedPortCount();
    this.authCookie = bkConfig.getAuthCookie();
    this.pluginLocations = bkConfig.getPluginLocations();
    this.pluginEnvps = bkConfig.getPluginEnvps();
    this.urlHash = bkConfig.getHash();
    this.pluginArgs = new HashMap<>();
    this.outputLogService = outputLogService;
    this.encoder = new Base64();
    this.config = bkConfig;
    this.nginxTemplate = utils.readFile(this.nginxDir + "/nginx.conf.template");
    if (nginxTemplate == null) {
      throw new RuntimeException("Cannot get nginx template");
    }
    this.ipythonTemplate = ("c = get_config()\n" +
                            "c.NotebookApp.ip = u'127.0.0.1'\n" +
                            "c.NotebookApp.port = %(port)s\n" +
                            "c.NotebookApp.open_browser = False\n" +
                            "c.NotebookApp.password = u'%(hash)s'\n");
    this.nginxCommand = new String[7];

    this.nginxCommand[0] = this.nginxBinDir + (this.nginxBinDir.isEmpty() ? "nginx" : "/nginx");
    this.nginxCommand[1] = "-p";
    this.nginxCommand[2] = this.nginxServDir;
    this.nginxCommand[3] = "-c";
    this.nginxCommand[4] = this.nginxServDir + "/conf/nginx.conf";
    this.nginxCommand[5] = "-g";
    this.nginxCommand[6] = "error_log stderr;";

    this.nginxRestartCommand = new String [9];
    this.nginxRestartCommand[0] = this.nginxBinDir + (this.nginxBinDir.isEmpty() ? "nginx" : "/nginx");
    this.nginxRestartCommand[1] = "-p";
    this.nginxRestartCommand[2] = this.nginxServDir;
    this.nginxRestartCommand[3] = "-c";
    this.nginxRestartCommand[4] = this.nginxServDir + "/conf/nginx.conf";
    this.nginxRestartCommand[5] = "-g";
    this.nginxRestartCommand[6] = "error_log stderr;";
    this.nginxRestartCommand[7] = "-s";
    this.nginxRestartCommand[8] = "reload";

    this.corePassword = webServerConfig.getPassword();
    this.showZombieLogging = bkConfig.getShowZombieLogging();

    // record plugin options from cli and to pass through to individual plugins
    for (Map.Entry<String, List<String>> e: bkConfig.getPluginOptions().entrySet()) {
      for (String arg : e.getValue()) {
        addPluginArg(e.getKey(), arg);
      }
    }

    // Add shutdown hook
    Runtime.getRuntime().addShutdownHook(new Thread() {
      @Override
      public void run() {
        logger.info("shutting down beaker");
        shutdown();
        logger.info("done, exiting");
      }
    });

    this.beakerPorts= new BeakerPorts(this.portBase + this.reservedPortCount);

    // on MacOS add library search path
    if (macosx()) {
      List<String> envList = new ArrayList<>();
      for (Map.Entry<String, String> entry: System.getenv().entrySet()) {
        envList.add(entry.getKey() + "=" + entry.getValue());
      }
      envList.add("DYLD_LIBRARY_PATH=./nginx/bin");
      this.nginxEnv = new String[envList.size()];
      envList.toArray(this.nginxEnv);
    }
  }

  public void setAuthToken(String t) {
    this.authToken = t;
  }

  private List<String> pythonBaseCommand(String pluginId, String command) {
    // Should pass pluginArgs too XXX?
    List<String> result = new ArrayList<String>();
    String base = this.pluginLocations.containsKey(pluginId) ?
      this.pluginLocations.get(pluginId) : this.pluginDir;
    result.add(base + "/" + command);

    if (windows()) {
	String python = this.config.getInstallDirectory() + "\\python\\python";
	result.add(0, python);
    }
    return result;
  }

  private boolean macosx() {
    return System.getProperty("os.name").contains("Mac");
  }

  private boolean windows() {
    return System.getProperty("os.name").contains("Windows");
  }

  private static boolean windowsStatic() {
    return System.getProperty("os.name").contains("Windows");
  }

  public void start() throws InterruptedException, IOException, ExecutionException {
    startReverseProxy();
  }

  private void startReverseProxy() throws InterruptedException, IOException, ExecutionException {
    createPluginConfigs();
    generateNginxConfig();
    logger.info("starting nginx instance (" + this.nginxDir +")");
    Process proc = Runtime.getRuntime().exec(this.nginxCommand, this.nginxEnv);
    startGobblers(proc, "nginx", null, null);
    this.nginxProc = proc;
  }

  private void createPluginConfigs() throws IOException, InterruptedException, ExecutionException {
    String pluginsconfiguration = IOUtils.toString(getClass().getClassLoader().getResourceAsStream("pluginsconfiguration.config"));
    Gson gson = new Gson();
    PluginConfigDescriptions pluginConfigDescriptions = gson.fromJson(pluginsconfiguration, PluginConfigDescriptions.class);
    for (PluginConfigDescription pcd: pluginConfigDescriptions.getPlugins() ) {
      String nginxRules = pcd.getNginxRules();
      if (pcd.getNginxRules().startsWith("ipython")){
        nginxRules = (getIPythonVersion(pcd.getPluginId(), pcd.getCommand()).equals("1")) ? "ipython1" : "ipython2";
      }
      createPluginConfig(pcd.getPluginId(), pcd.getCommand(), nginxRules, beakerPorts.getNextAvailablePort());
    }
  }

  private void shutdown() {
    StreamGobbler.shuttingDown();
    if (windows()) {
      new WinProcess(this.nginxProc).killRecursively();
    } else {
      this.nginxProc.destroy(); // send SIGTERM
    }
    for (PluginConfig p : this.plugins.values()) {
      p.shutDown();
    }
  }

  private boolean internalEnvar(String var) {
    String [] vars = {"beaker_plugin_password",
                      "beaker_plugin_path",
                      "beaker_tmp_dir",
                      "beaker_core_password"};
    for (int i = 0; i < vars.length; i++)
      if (var.startsWith(vars[i] + "="))
        return true;
    return false;
  }

  private String[] buildEnv(String pluginId, String password) {
    String[] env = this.pluginEnvps.get(pluginId);
    List<String> envList = new ArrayList<>();
    for (Map.Entry<String, String> entry: System.getenv().entrySet()) {
      if (!internalEnvar(entry.getKey() + "="))
        envList.add(entry.getKey() + "=" + entry.getValue());
    }
    if (env != null) {
      for (int i = 0; i < env.length; i++) {
        if (!internalEnvar(env[i]))
          envList.add(env[i]);
      }
    }
    if (password != null) {
      envList.add("beaker_plugin_password=" + password);
    }
    envList.add("beaker_core_password=" + this.corePassword);
    envList.add("beaker_core_port=" + corePort);
    envList.add("beaker_tmp_dir=" + this.nginxServDir);
    envList.add("beaker_ipython_notebook_config=" + this.nginxServDir
        + "/profile_beaker_backend_" + pluginId + "/ipython_notebook_config.py");
    String plugPath = this.config.getPluginPath(pluginId);
    if (null != plugPath) {
      for (int i = 0; i < envList.size(); i++) {
        String path = "PATH=";
        if (envList.get(i).toUpperCase().startsWith(path)) {
          String pathSeparator = windows() ? ";" : ":";
          envList.set(i, path + plugPath + pathSeparator + envList.get(i).substring(path.length()));
        }
      }
    }
    for (Iterator<String> it = envList.iterator(); it.hasNext();) {
      //delete TERM variable for correct ipython hash reading on Mac OS
      String envVar = it.next();
      if (envVar.toUpperCase().startsWith("TERM=")) {
        it.remove();
      }
    }
    env = new String[envList.size()];
    envList.toArray(env);
    return env;
  }

  /**
   * locatePluginService
   * locate the service that matches the passed-in information about a service and return the
   * base URL the client can use to connect to the target plugin service. If such service
   * doesn't exist, this implementation will also start the service.
   *
   * @param pluginId
   * @param command name of the starting script
   * @param nginxRules rules to help setup nginx proxying
   * @param startedIndicator string indicating that the plugin has started
   * @param startedIndicatorStream stream to search for indicator, null defaults to stdout
   * @param recordOutput boolean, record out/err streams to output log service or not, null defaults
   * to false
   * @param waitfor if record output log service is used, string to wait for before logging starts
   * @return the base url of the service
   * @throws InterruptedException
   * @throws IOException
   */
  @GET
  @Path("/{plugin-id}")
  @Produces(MediaType.TEXT_PLAIN)
  public Response locatePluginService(
      @PathParam("plugin-id") String pluginId,
      @QueryParam("command") String command,
      @QueryParam("nginxRules") @DefaultValue("rest") String nginxRules,
      @QueryParam("startedIndicator") String startedIndicator,
      @QueryParam("startedIndicatorStream") @DefaultValue("stdout") String startedIndicatorStream,
      @QueryParam("recordOutput") @DefaultValue("false") boolean recordOutput,
      @QueryParam("waitfor") String waitfor)
    throws InterruptedException, IOException, ExecutionException {

    PluginConfig pConfig = this.plugins.get(pluginId);
    if (pConfig != null && pConfig.isStarted()) {
      logger.info("plugin service " + pluginId + " already started at" + pConfig.getBaseUrl());
      return buildResponse(pConfig.getBaseUrl(), false);
    }

    Process proc = null;
    String restartId = "";

    boolean isNginxRestarted;
    /*
     * Only one plugin can be started at a given time since we need to find a free port.
     * We serialize starting of plugins and we parallelize nginx configuration reload with the actual plugin
     * evaluator start.
     */
    synchronized (this) {
      isNginxRestarted = false;
      if (pConfig == null) {
        pConfig = createPluginConfig(pluginId, command, nginxRules, beakerPorts.getNextAvailablePort());
        // reload nginx config
        restartId = generateNginxConfig();
        isNginxRestarted = true;
        logger.warn("restarting nginx");
        Process restartproc = Runtime.getRuntime().exec(this.nginxRestartCommand, this.nginxEnv);
        startGobblers(restartproc, "restart-nginx-" + pluginId, null, null);
        restartproc.waitFor();
      }

      ArrayList<String> fullCommand =
        new ArrayList<String>(Arrays.asList(command.split("\\s+")));

      fullCommand.set(0, (this.pluginLocations.containsKey(pluginId) ?
                          this.pluginLocations.get(pluginId) : this.pluginDir)
                      + "/" + fullCommand.get(0));
      if (Files.notExists(Paths.get(fullCommand.get(0)))) {
        throw new PluginServiceNotFoundException("plugin service " + pluginId + " not found at "
                                                 + command);
      }

      List<String> extraArgs = this.pluginArgs.get(pluginId);
      if (extraArgs != null) {
        fullCommand.addAll(extraArgs);
      }

      fullCommand.add(Integer.toString(pConfig.port));

      String[] env = buildEnv(pluginId, pConfig.getPassword());

      if (windows()) {
        String python = this.config.getInstallDirectory() + "\\python\\python";
        fullCommand.add(0, python);
      }
      logger.info("Running");
      for (int i = 0; i < fullCommand.size(); i++) {
        logger.info(i + ": " + fullCommand.get(i));
      }
      proc = Runtime.getRuntime().exec(listToArray(fullCommand), env);
    }

    if (startedIndicator != null && !startedIndicator.isEmpty()) {
      InputStream is = startedIndicatorStream.equals("stderr") ?
        proc.getErrorStream() : proc.getInputStream();
      InputStreamReader ir = new InputStreamReader(is);
      BufferedReader br = new BufferedReader(ir);
      String line = "";
      while ((line = br.readLine()) != null) {
        logger.info("looking on " + startedIndicatorStream + " found:" + line);
        if (line.indexOf(startedIndicator) >= 0) {
          logger.info("Acknowledge " + pluginId + " plugin started due to "+startedIndicator);
          break;
        }
      }
      if (null == line) {
        throw new PluginServiceNotFoundException("plugin service: "
                                                 + pluginId + " failed to start");
      }
    }

    startGobblers(proc, pluginId, recordOutput ? this.outputLogService : null, waitfor);
    if (isNginxRestarted) {
      checkThatNginxDidActuallyRestart(pluginId, proc, restartId);
    }

    pConfig.setProcess(proc);
    logger.info("Done starting " + pluginId);

    return buildResponse(pConfig.getBaseUrl(), true);
  }

  private void checkThatNginxDidActuallyRestart(final String pluginId, final Process proc, final String restartId) {
    // check that nginx did actually restart
    String url = "http://127.0.0.1:" + this.restartPort + "/restart." + restartId + "/present.html";
    try {
      spinCheck(url);
    } catch (Throwable t) {
      logger.warn("time out plugin = {}", pluginId);
      this.plugins.remove(pluginId);
      if (windows()) {
        new WinProcess(proc).killRecursively();
      } else {
        proc.destroy(); // send SIGTERM
      }
      throw new NginxRestartFailedException("nginx restart failed.\n" + "url=" + url + "\n" + "message=" + t.getMessage());
    }
  }

  private PluginConfig createPluginConfig(final String pluginId, final String command, final String nginxRules, final int port) throws IOException, InterruptedException, ExecutionException {
    String password = RandomStringUtils.random(40, true, true);
    PluginConfig pConfig;// find a port to use for proxypass between nginx and the plugin
    final String baseUrl = generatePrefixedRandomString(pluginId, 12).replaceAll("[\\s]", "");
    pConfig = new PluginConfig(port, nginxRules, baseUrl, password);
    this.plugins.put(pluginId, pConfig);

    if (nginxRules.startsWith("ipython")) {
      generateIPythonConfig(pluginId, port, password, command);

      if (isIPython4OrNewer(getIPythonVersion(pluginId, command))) {
        new JupyterWidgetsExtensionProcessor(pluginId, this.pluginDir).copyJupyterExtensionIfExists();
      }
    }
    return pConfig;
  }

  @GET
  @Path("getAvailablePort")
  public int getAvailablePort() {
    int port;
    synchronized (this) {
      port = beakerPorts.getNextAvailablePort();
    }
    return port;
  }

  private static Response buildResponse(String baseUrl, boolean created) {
    return Response
        .status(created ? Response.Status.CREATED : Response.Status.OK)
        .entity(baseUrl)
        .location(URI.create(baseUrl))
        .build();
  }

  private static boolean spinCheck(String url)
      throws IOException, InterruptedException
  {

    int interval = RESTART_ENSURE_RETRY_INTERVAL;
    int totalTime = 0;

    while (totalTime < RESTART_ENSURE_RETRY_MAX_WAIT) {
      Request get = Request.Get(url);
      if (get.execute().returnResponse().getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
        return true;
      }
      Thread.sleep(interval);
      totalTime += interval;
      interval *= 1.5;
      if (interval > RESTART_ENSURE_RETRY_MAX_INTERVAL)
        interval = RESTART_ENSURE_RETRY_MAX_INTERVAL;
    }
    throw new RuntimeException("Spin check timed out: " + url);
  }

  private static class PluginServiceNotFoundException extends WebApplicationException {
    public PluginServiceNotFoundException(String message) {
      super(Response.status(Responses.NOT_FOUND)
          .entity(message).type("text/plain").build());
    }
  }

   private static class NginxRestartFailedException extends WebApplicationException {
    public NginxRestartFailedException(String message) {
      super(Response.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
          .entity(message).type("text/plain").build());
    }
  }

  private void addPluginArg(String plugin, String arg) {
    List<String> args = this.pluginArgs.get(plugin);
    if (args == null) {
      args = new ArrayList<>();
      this.pluginArgs.put(plugin, args);
    }
    args.add(arg);
  }

  private void writePrivateFile(java.nio.file.Path path, String contents)
      throws IOException, InterruptedException
  {
    if (windows()) {
      String p = path.toString();
      Thread.sleep(1000); // XXX unknown race condition
      try (PrintWriter out = new PrintWriter(p)) {
        out.print(contents);
      }
      return;
    }
    if (Files.exists(path)) {
      Files.delete(path);
    }
    try (PrintWriter out = new PrintWriter(path.toFile())) {
      out.print("");
    }
    Set<PosixFilePermission> perms = EnumSet.of(PosixFilePermission.OWNER_READ,
                                                PosixFilePermission.OWNER_WRITE);
    Files.setPosixFilePermissions(path, perms);
    // XXX why is this in a try block?
    try (PrintWriter out = new PrintWriter(path.toFile())) {
      out.print(contents);
    }
  }

  private String hashIPythonPassword(String password, String pluginId, String command)
    throws IOException {
    List<String> cmdBase = pythonBaseCommand(pluginId, command);
    cmdBase.add("--hash");
    cmdBase.add(password);

    Process proc = Runtime.getRuntime().exec(listToArray(cmdBase), buildEnv(pluginId, null));
    BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));
    new StreamGobbler(proc.getErrorStream(), "stderr", "ipython-hash", null, null).start();
    String hash = br.readLine();
    if (null == hash) {
      throw new RuntimeException("unable to get IPython hash");
    }
    return hash;
  }

  private void generateIPythonConfig(String pluginId, int port, String password, String command)
    throws IOException, InterruptedException, ExecutionException {
    // Can probably determine exactly what is needed and then just
    // make the files ourselves but this is a safe way to get started.
    List<String> cmd = pythonBaseCommand(pluginId, command);
    cmd.add("--profile");
    if(windows()){
      cmd.add("\\\"" + this.nginxServDir + "\\\"");
    }else{
      cmd.add(this.nginxServDir);
    }
    cmd.add(pluginId);
    Runtime.getRuntime().exec(listToArray(cmd), buildEnv(pluginId, null)).waitFor();
    String hash = hashIPythonPassword(password, pluginId, command);
    String config = this.ipythonTemplate;
    config = config.replace("%(port)s", Integer.toString(port));
    config = config.replace("%(hash)s", hash);
    java.nio.file.Path targetFile = Paths.get(this.nginxServDir + "/profile_beaker_backend_" + pluginId,
                                              "ipython_notebook_config.py");
    writePrivateFile(targetFile, config);
  }

  private String generateNginxConfig() throws IOException, InterruptedException {

    java.nio.file.Path confDir = Paths.get(this.nginxServDir, "conf");
    java.nio.file.Path logDir = Paths.get(this.nginxServDir, "logs");
    java.nio.file.Path nginxClientTempDir = Paths.get(this.nginxServDir, "client_temp");

    if (Files.notExists(confDir)) {
      confDir.toFile().mkdirs();
      Files.copy(Paths.get(this.nginxDir + "/mime.types"),
                 Paths.get(confDir.toString() + "/mime.types"));
    }
    if (Files.notExists(logDir)) {
      logDir.toFile().mkdirs();
    }
    if (Files.notExists(nginxClientTempDir)) {
      nginxClientTempDir.toFile().mkdirs();
    }

    String restartId = RandomStringUtils.random(12, false, true);
    String nginxConfig = this.nginxTemplate;
    StringBuilder pluginSection = new StringBuilder();
    for (PluginConfig pConfig : this.plugins.values()) {
      String auth = encoder.encodeBase64String(("beaker:" + pConfig.getPassword()).getBytes());
      String nginxRule = pConfig.getNginxRules();
      if (this.nginxPluginRules.containsKey(nginxRule)) {
        nginxRule = this.nginxPluginRules.get(nginxRule);
      } else {
        if (nginxRule.equals("rest"))
          nginxRule = REST_RULES;
        else if (nginxRule.equals("ipython1"))
          nginxRule = IPYTHON1_RULES;
        else if (nginxRule.equals("ipython2"))
          nginxRule = IPYTHON2_RULES;
        else {
          throw new RuntimeException("unrecognized nginx rule: " + nginxRule);
        }
      }
      nginxRule = nginxRule.replace("%(port)s", Integer.toString(pConfig.getPort()))
        .replace("%(auth)s", auth)
        .replace("%(base_url)s", (urlHash.isEmpty() ? "" : "/"+urlHash+"/" ) + pConfig.getBaseUrl());
      pluginSection.append(nginxRule + "\n\n");
    }
    String auth = encoder.encodeBase64String(("beaker:" + this.corePassword).getBytes());
    String listenSection;
    String authCookieRule;
    String startPage;
    String hostName = "none"; // XXX hack
    try {
      // XXX should allow name to be set by user in bkConfig
      hostName = InetAddress.getLocalHost().getHostName();
    } catch (UnknownHostException e) {
      logger.warn("warning: UnknownHostException from InetAddress.getLocalHost().getHostName(), ignored");
    }
    if (this.listenInterface != null && !this.listenInterface.equals("*")) {
      hostName = this.listenInterface;
    }

    if (this.publicServer) {
      if (this.listenInterface != null && !this.listenInterface.equals("*")) {
        listenSection = "listen " + this.listenInterface + ":"+ this.portBase + " ssl;\n";
      } else {
        listenSection = "listen " + this.portBase + " ssl;\n";
      }
      listenSection += "server_name " + hostName + ";\n";

      if (this.useHttpsCert==null || this.useHttpsKey==null) {
        listenSection += "ssl_certificate " + this.nginxServDir + "/ssl_cert.pem;\n";
        listenSection += "ssl_certificate_key " + this.nginxServDir + "/ssl_cert.pem;\n";
      } else {
        listenSection += "ssl_certificate " + this.useHttpsCert + ";\n";
        listenSection += "ssl_certificate_key " + this.useHttpsKey + ";\n";
      }
      authCookieRule = "if ($http_cookie !~ \"BeakerAuth=" + this.authCookie + "\") {return 403;}";
      startPage = "/login/login.html";
    } else {
      if (this.listenInterface != null) {
        if(this.listenInterface.equals("*")) {
          listenSection = "listen " + this.servPort + ";\n";
        } else {
          listenSection = "listen "+this.listenInterface+":" + this.servPort + ";\n";
        }
      } else {
        listenSection = "listen 127.0.0.1:" + this.servPort + ";\n";
      }
      if (this.requirePassword) {
        authCookieRule = "if ($http_cookie !~ \"BeakerAuth=" + this.authCookie + "\") {return 403;}";
        startPage = "/login/login.html";
      } else {
        authCookieRule = "";
        startPage = "/beaker/";
      }
    }
    nginxConfig = nginxConfig.replace("%(plugin_section)s", pluginSection.toString());
    nginxConfig = nginxConfig.replace("%(extra_rules)s", this.nginxExtraRules);
    nginxConfig = nginxConfig.replace("%(catch_outdated_requests_rule)s", this.showZombieLogging ? "" : this.CATCH_OUTDATED_REQUESTS_RULE);
    nginxConfig = nginxConfig.replace("%(user_folder)s", this.userFolder);
    nginxConfig = nginxConfig.replace("%(host)s", hostName);
    nginxConfig = nginxConfig.replace("%(port_main)s", Integer.toString(this.portBase));
    nginxConfig = nginxConfig.replace("%(port_beaker)s", Integer.toString(this.corePort));
    nginxConfig = nginxConfig.replace("%(port_clear)s", Integer.toString(this.servPort));
    nginxConfig = nginxConfig.replace("%(listen_on)s", this.publicServer ? "*" : "127.0.0.1");
    nginxConfig = nginxConfig.replace("%(listen_section)s", listenSection);
    nginxConfig = nginxConfig.replace("%(auth_cookie_rule)s", authCookieRule);
    nginxConfig = nginxConfig.replace("%(start_page)s", startPage);
    nginxConfig = nginxConfig.replace("%(port_restart)s", Integer.toString(this.restartPort));
    nginxConfig = nginxConfig.replace("%(auth)s", auth);
    nginxConfig = nginxConfig.replace("%(sessionauth)s", this.authToken);
    nginxConfig = nginxConfig.replace("%(restart_id)s", restartId);
    nginxConfig = nginxConfig.replace("%(urlhash)s", urlHash.isEmpty() ? "" : urlHash+"/");
    nginxConfig = nginxConfig.replace("%(static_dir)s", this.nginxStaticDir.replaceAll("\\\\", "/"));
    nginxConfig = nginxConfig.replace("%(nginx_dir)s", this.nginxServDir.replaceAll("\\\\", "/"));
    // Apparently on windows our jetty backends network stack can be
    // in a state where the spin/probe connection from the client gets
    // stuck and it does not fail until it times out.
    nginxConfig = nginxConfig.replace("%(proxy_connect_timeout)s", windows() ? "1" : "90");
    java.nio.file.Path targetFile = Paths.get(this.nginxServDir, "conf/nginx.conf");
    writePrivateFile(targetFile, nginxConfig);
    return restartId;
  }

  private static String generatePrefixedRandomString(String prefix, int randomPartLength) {
    // Use lower case due to nginx bug handling mixed case locations
    // (fixed in 1.5.6 but why depend on it).
    return prefix.toLowerCase() + "." + RandomStringUtils.random(randomPartLength, false, true);
  }

  @GET
  @Path("getIPythonVersion")
  @Produces(MediaType.TEXT_PLAIN)
  public String getIPythonVersion(@QueryParam("pluginId") String pluginId,
                                  @QueryParam("command") String command)
      throws IOException
  {
    Process proc;
    List<String> cmd = pythonBaseCommand(pluginId, command);
    cmd.add("--version");
    proc = Runtime.getRuntime().exec(listToArray(cmd), buildEnv(pluginId, null));
    BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));
    new StreamGobbler(proc.getErrorStream(), "stderr", "ipython-version", null, null).start();
    String line = br.readLine();
    return line;
  }

  @GET
  @Path("getIPythonPassword")
  @Produces(MediaType.TEXT_PLAIN)
  public String getIPythonPassword(@QueryParam("pluginId") String pluginId)
  {
    PluginConfig pConfig = this.plugins.get(pluginId);
    if (null == pConfig) {
      return "";
    }
    /* It's OK to return the password because the connection should be
       HTTPS and the request is authenticated so only our legit user
       should be on the other side. */
    return pConfig.password;
  }

  private static class PluginConfig {

    private final int port;
    private final String nginxRules;
    private Process proc;
    private final String baseUrl;
    private final String password;

    PluginConfig(int port, String nginxRules, String baseUrl, String password) {
      this.port = port;
      this.nginxRules = nginxRules;
      this.baseUrl = baseUrl;
      this.password = password;
    }

    int getPort() {
      return this.port;
    }

    String getBaseUrl() {
      return this.baseUrl;
    }

    String getNginxRules() {
      return this.nginxRules;
    }

    String getPassword() {
      return this.password;
    }

    void setProcess(Process proc) {
      this.proc = proc;
    }

    boolean isStarted () {
      return this.proc != null;
    }

    void shutDown() {
      if (this.isStarted()) {
        if (windowsStatic()) {
          new WinProcess(this.proc).killRecursively();
        } else {
          this.proc.destroy(); // send SIGTERM
        }
      }
    }

  }

  private static void startGobblers(
      Process proc,
      String name,
      OutputLogService outputLogService,
      String waitfor) {
    StreamGobbler errorGobbler =
        new StreamGobbler(proc.getErrorStream(), "stderr", name,
        outputLogService, waitfor);
    errorGobbler.start();

    StreamGobbler outputGobbler =
        new StreamGobbler(proc.getInputStream(), "stdout", name,
        outputLogService);
    outputGobbler.start();
  }

  private boolean isIPython4OrNewer(String iPythonVersion) {
    return iPythonVersion != null && (iPythonVersion.startsWith("4.") || iPythonVersion.startsWith("5."));
  }

  private class JupyterWidgetsExtensionProcessor {
    private String pluginId;
    private String pluginDir;

    JupyterWidgetsExtensionProcessor(String pluginId, String pluginDir) {
      this.pluginId = pluginId;
      this.pluginDir = pluginDir;
    }

    void copyJupyterExtensionIfExists() throws IOException, InterruptedException {
      boolean fileProcessed = copyExtensionFileFromPythonDist();

      if (!fileProcessed) {
        try {
          Files.copy(Paths.get(getDefaultExtensionPath()), Paths.get(getTargetExtensionPath()), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
          //e.printStackTrace();
        }
      }
    }

    private boolean copyExtensionFileFromPythonDist() {
      try {
        String plugPath = config.getPluginPath(pluginId);
        Process jupyterPathsProcess = Runtime.getRuntime().exec(new String[]{getJupyterCommand(plugPath), "--paths"}, buildEnv(pluginId, null));
        jupyterPathsProcess.waitFor();
        List<String> jupyterDataPaths = parseJupyterDataPaths(jupyterPathsProcess);
        for (String jupyterDataPath : jupyterDataPaths) {
          java.nio.file.Path jupyterExtensionJsPath = getJupyterExtensionPath(jupyterDataPath);
          if (jupyterExtensionJsPath != null) {
            copyExtension(jupyterExtensionJsPath);
            return true;
          }
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
      return false;
    }

    private String getJupyterCommand(String plugPath) {
      String command = "jupyter";
      if (!StringUtils.isBlank(plugPath)) {
        if (windows()) {
          plugPath += "/Scripts";
        }
        command = plugPath + '/' + command;
      }
      return command;
    }

    private java.nio.file.Path getJupyterExtensionPath(String jupyterDataPath) {
      java.nio.file.Path jupyterPath = Paths.get(jupyterDataPath);
      if (Files.exists(jupyterPath)) {
        java.nio.file.Path jupyterExtensionJsPath = jupyterPath.resolve("nbextensions/jupyter-js-widgets/extension.js");
        if (Files.exists(jupyterExtensionJsPath)) {
          return jupyterExtensionJsPath;
        }
      }
      return null;
    }

    private void copyExtension(java.nio.file.Path jupyterExtensionJsPath) throws IOException {
      try (
          final BufferedReader bufferedReader = new BufferedReader(new FileReader(jupyterExtensionJsPath.toFile()));
          BufferedWriter writer = new BufferedWriter(new FileWriter(getTargetExtensionPath()));
      ) {
        String line;
        for (int lineIndex = 0; (line = bufferedReader.readLine()) != null; lineIndex++) {
          writer.write(processLine(line, lineIndex));
          writer.newLine();
        }
      }
    }

    private String getTargetExtensionPath() {
      return getExtensionPath(false);
    }

    private String getDefaultExtensionPath() {
      return getExtensionPath(true);
    }

    private String getExtensionPath(boolean defaultFile) {
      String fileName = "extension.js";
      if (defaultFile) {
        fileName = "_" + fileName;
      }
      return this.pluginDir + "/ipythonPlugins/vendor/ipython4/" +
          fileName;
    }

    private String processLine(String line, int lineIndex) {
      if (lineIndex == 0 && line.startsWith("define(")) {
        line = line.replace("define(", "define('nbextensions/jupyter-js-widgets/extension', ");
      } else if (line.contains("this._init_menu();")) {
        line = "//" + line;
      } else if (line.contains("this.state_change = this.state_change.then(function() {")) {
        line = "            var elem = $(document.createElement(\"div\"));\n" +
               "            elem.addClass('ipy-output');\n" +
               "            elem.attr('data-msg-id', msg.parent_header.msg_id);\n" +
               "            var widget_area = $(document.createElement(\"div\"));\n" +
               "            widget_area.addClass('widget-area');\n" +
               "            var widget_subarea = $(document.createElement(\"div\"));\n" +
               "            widget_subarea.addClass('widget-subarea');\n" +
               "            widget_subarea.appendTo(widget_area);\n" +
               "            widget_area.appendTo(elem);\n" +
               "            var kernel = this.widget_manager.comm_manager.kernel;\n" +
               "            if (kernel) {\n" +
               "              //This cause fail on plot display\n" +
               "              //kernel.appendToWidgetOutput = true;\n" +
               "              var callbacks = kernel.get_callbacks_for_msg(msg.parent_header.msg_id);\n" +
               "              if (callbacks && callbacks.iopub) {\n" +
               "                msg.content.data['text/html'] = elem[0].outerHTML;\n" +
               "                callbacks.iopub.output(msg);\n" +
               "              }\n" +
               "            }\n" +
               "            " + line;
      }
      return line;
    }

    private List<String> parseJupyterDataPaths(Process jupyterPathsProcess) throws IOException {
      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(jupyterPathsProcess.getInputStream()));
      boolean data = false;
      String line;
      List<String> jupyterDataPaths = new ArrayList<>();
      while ((line = bufferedReader.readLine()) != null) {
        if (line.startsWith("data:")) {
          data = true;
        } else if (line.startsWith("runtime:")) {
          break;
        } else if (data) {
          jupyterDataPaths.add(line.trim());
        }
      }
      return jupyterDataPaths;
    }
  }

  private static class PluginConfigDescriptions {
    private List<PluginConfigDescription> plugins;
    public List<PluginConfigDescription> getPlugins() {
      return plugins;
    }
  }

  private static class PluginConfigDescription {
    private String pluginId;
    private String command;
    private String nginxRules;

    public String getPluginId() {
      return pluginId;
    }

    public String getCommand() {
      return command;
    }

    public String getNginxRules() {
      return nginxRules;
    }
  }
}
