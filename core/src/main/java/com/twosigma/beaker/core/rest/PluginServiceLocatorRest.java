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

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.sun.jersey.api.Responses;
import com.twosigma.beaker.core.module.config.BeakerConfig;
import com.twosigma.beaker.shared.module.config.WebServerConfig;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpStatus;
import org.apache.http.client.fluent.Request;
import org.jvnet.winp.WinProcess;


/**
 * This is the service that locates a plugin service. And a service will be started if the target
 * service doesn't exist. See {@link locatePluginService} for details
 */
@Path("plugin-services")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class PluginServiceLocatorRest {
  // these 3 times are in millis
  private static final int RESTART_ENSURE_RETRY_MAX_WAIT = 30*1000;
  private static final int RESTART_ENSURE_RETRY_INTERVAL = 10;
  private static final int RESTART_ENSURE_RETRY_MAX_INTERVAL = 2500;

  private static final String REST_RULES =
    "location %(base_url)s/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/;\n" +
    "  proxy_set_header Authorization \"Basic %(auth)s\";\n" +
    "}\n";
  private static final String IPYTHON_RULES_BASE =
    "  rewrite ^%(base_url)s/(.*)$ /$1 break;\n" +
    "  proxy_pass http://127.0.0.1:%(port)s;\n" +
    "  proxy_http_version 1.1;\n" +
    "  proxy_set_header Upgrade $http_upgrade;\n" +
    "  proxy_set_header Connection \"upgrade\";\n" +
    "  proxy_set_header Host 127.0.0.1:%(port)s;\n" +
    "  proxy_set_header Origin \"$scheme://127.0.0.1:%(port)s\";\n" +
    "}\n" +
    "location %(base_url)s/login {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/login;\n" +
    "}\n";
  private static final String IPYTHON1_RULES =
    "location %(base_url)s/kernels/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/kernels;\n" +
    "}\n" +
    "location ~ %(base_url)s/kernels/[0-9a-f-]+/ {\n" +
    IPYTHON_RULES_BASE;
  private static final String IPYTHON2_RULES = 
    "location %(base_url)s/api/kernels/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/api/kernels;\n" +
    "}\n" +
    "location %(base_url)s/api/sessions/ {\n" +
    "  proxy_pass http://127.0.0.1:%(port)s/api/sessions;\n" +
    "}\n" +
    "location ~ %(base_url)s/api/kernels/[0-9a-f-]+/ {\n" +
    IPYTHON_RULES_BASE;

  private final String nginxDir;
  private final String nginxBinDir;
  private final String nginxStaticDir;
  private final String nginxServDir;
  private final String nginxExtraRules;
  private final Map<String, String> nginxPluginRules;
  private final String pluginDir;
  private final String nginxCommand;
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

  private final String nginxTemplate;
  private final String ipythonTemplate;
  private final Map<String, PluginConfig> plugins = new HashMap<>();
  private Process nginxProc;
  private int portSearchStart;

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
    this.nginxPluginRules = bkConfig.getNginxPluginRules();
    this.pluginDir = bkConfig.getPluginDirectory();
    this.publicServer = bkConfig.getPublicServer();
    this.portBase = bkConfig.getPortBase();
    this.servPort = this.portBase + 1;
    this.corePort = this.portBase + 2;
    this.restartPort = this.portBase + 3;
    this.reservedPortCount = bkConfig.getReservedPortCount();
    this.authCookie = bkConfig.getAuthCookie();
    this.pluginLocations = bkConfig.getPluginLocations();
    this.pluginEnvps = bkConfig.getPluginEnvps();
    this.pluginArgs = new HashMap<>();
    this.outputLogService = outputLogService;
    this.encoder = new Base64();
    this.nginxTemplate = utils.readFile(this.nginxDir + "/nginx.conf.template");
    if (nginxTemplate == null) {
      throw new RuntimeException("Cannot get nginx template");
    }
    this.ipythonTemplate = ("c = get_config()\n" +
                            "c.NotebookApp.ip = u'127.0.0.1'\n" +
                            "c.NotebookApp.port = %(port)s\n" +
                            "c.NotebookApp.open_browser = False\n" +
                            "c.NotebookApp.password = u'%(hash)s'\n");
    String cmd = this.nginxBinDir + (this.nginxBinDir.isEmpty() ? "nginx" : "/nginx");
    if (windows()) {
      cmd += (" -p \"" + this.nginxServDir + "\"");
      cmd += (" -c \"" + this.nginxServDir + "/conf/nginx.conf\"");
    } else {
      cmd += (" -p " + this.nginxServDir);
      cmd += (" -c " + this.nginxServDir + "/conf/nginx.conf");
    }
    this.nginxCommand = cmd;
    this.corePassword = webServerConfig.getPassword();

    // record plugin options from cli and to pass through to individual plugins
    for (Map.Entry<String, String> e: bkConfig.getPluginOptions().entrySet()) {
      addPluginArgs(e.getKey(), e.getValue());
    }

    // Add shutdown hook
    Runtime.getRuntime().addShutdownHook(new Thread() {
      @Override
      public void run() {
        System.out.println("\nshutting down beaker");
        shutdown();
        System.out.println("done, exiting");
      }
    });

    portSearchStart = this.portBase + this.reservedPortCount;
  }

  private boolean windows() {
    return System.getProperty("os.name").contains("Windows");
  }

  private static boolean windowsStatic() {
    return System.getProperty("os.name").contains("Windows");
  }

  public void start() throws InterruptedException, IOException {
    startReverseProxy();
  }

  private void startReverseProxy() throws InterruptedException, IOException {
    generateNginxConfig();
    System.out.println("running nginx: " + this.nginxCommand);
    Process proc = Runtime.getRuntime().exec(this.nginxCommand);
    startGobblers(proc, "nginx", null, null);
    this.nginxProc = proc;
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
                      "beaker_tmp_dir",
                      "beaker_core_password"};
    for (int i = 0; i < vars.length; i++)
      if (var.startsWith(vars[0] + "="))
        return true;
    return false;
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
      throws InterruptedException, IOException {

    PluginConfig pConfig = this.plugins.get(pluginId);
    if (pConfig != null && pConfig.isStarted()) {
      System.out.println("plugin service " + pluginId +
          " already started at" + pConfig.getBaseUrl());
      return buildResponse(pConfig.getBaseUrl(), false);
    }

    String password = RandomStringUtils.random(40, true, true);
    synchronized (this) {
      final int port = getNextAvailablePort(this.portSearchStart);
      final String baseUrl = "/" + generatePrefixedRandomString(pluginId, 12).replaceAll("[\\s]", "");
      pConfig = new PluginConfig(port, nginxRules, baseUrl, password);
      this.portSearchStart = pConfig.port + 1;
      this.plugins.put(pluginId, pConfig);

      if (nginxRules.startsWith("ipython")) {
        generateIPythonConfig(port, password);
      }

      // restart nginx to reload new config
      String restartId = generateNginxConfig();
      String restartPath = "\"" + this.nginxServDir + "/restart_nginx\"";
      String restartCommand = this.nginxCommand + " -s reload";
      Process restartproc = Runtime.getRuntime().exec(restartCommand);
      startGobblers(restartproc, "restart-nginx-" + pluginId, null, null);
      restartproc.waitFor();

      // spin until restart is done
      String url = "http://127.0.0.1:" + this.restartPort
          + "/restart." + restartId + "/present.html";
      try {
        spinCheck(url);
        if (windows()) Thread.sleep(1000); // XXX unknown race condition
      } catch (Throwable t) {
        System.err.println("Nginx restart time out plugin =" + pluginId);
        throw new NginxRestartFailedException("nginx restart failed.\n"
            + "url=" + url + "\n"
            + "message=" + t.getMessage());
      }
    }

    String fullCommand = command;
    String baseCommand;
    String args;
    int space = command.indexOf(' ');
    if (space > 0) {
      baseCommand = command.substring(0, space);
      args = command.substring(space); // include space
    } else {
      baseCommand = command;
      args = " ";
    }
    if (Files.notExists(Paths.get(baseCommand))) {
      if (this.pluginLocations.containsKey(pluginId)) {
        fullCommand = this.pluginLocations.get(pluginId) + "/" + baseCommand;
      }
      if (Files.notExists(Paths.get(fullCommand))) {
        fullCommand = this.pluginDir + "/" + baseCommand;
        if (Files.notExists(Paths.get(fullCommand))) {
          throw new PluginServiceNotFoundException(
              "plugin service: " + pluginId + " not found"
              + " and fail to start it with: " + command);
        }
      }
    }

    if (windows()) {
      fullCommand = "\"" + fullCommand + "\"";
    } else {
      fullCommand += args; // XXX should be in windows too?
    }

    List<String> extraArgs = this.pluginArgs.get(pluginId);
    if (extraArgs != null) {
      fullCommand += " " + StringUtils.join(extraArgs, " ");
    }
    fullCommand += " " + Integer.toString(pConfig.port);
    fullCommand += " " + Integer.toString(corePort);

    String[] env = this.pluginEnvps.get(pluginId);
    List<String> envList = new ArrayList<>();
    if (env != null) {
      for (int i = 0; i < env.length; i++) {
        if (!internalEnvar(env[i]))
          envList.add(env[i]);
      }
    } else {
      for (Map.Entry<String, String> entry: System.getenv().entrySet()) {
        if (!internalEnvar(entry.getKey() + "="))
          envList.add(entry.getKey() + "=" + entry.getValue());
      }
    }
    envList.add("beaker_plugin_password=" + password);
    envList.add("beaker_core_password=" + this.corePassword);
    envList.add("beaker_tmp_dir=" + this.nginxServDir);
    env = new String[envList.size()];
    envList.toArray(env);

    if (windows()) {
      fullCommand = "python " + fullCommand;
    }
    System.out.println("Running: " + fullCommand);
    Process proc = Runtime.getRuntime().exec(fullCommand, env);

    if (startedIndicator != null && !startedIndicator.isEmpty()) {
      InputStream is = startedIndicatorStream.equals("stderr") ?
          proc.getErrorStream() : proc.getInputStream();
      InputStreamReader ir = new InputStreamReader(is);
      BufferedReader br = new BufferedReader(ir);
      String line = "";
      while ((line = br.readLine()) != null) {
        System.out.println("looking on " + startedIndicatorStream + " found:" + line);
        if (line.indexOf(startedIndicator) >= 0) {
          System.out.println("Acknowledge " + pluginId + " plugin started");
          break;
        }
      }
    }
    startGobblers(proc, pluginId, recordOutput ? this.outputLogService : null, waitfor);

    pConfig.setProcess(proc);
    System.out.println("Done starting " + pluginId);
    return buildResponse(pConfig.getBaseUrl(), true);
  }

  @GET
  @Path("getAvailablePort")
  public int getAvailablePort() {
    int port;
    synchronized (this) {
      port = getNextAvailablePort(this.portSearchStart++);
    }
    return port;
  }

  private static Response buildResponse(String baseUrl, boolean created) {
    baseUrl = ".." + baseUrl;
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
      if (Request.Get(url)
          .execute()
          .returnResponse()
          .getStatusLine()
          .getStatusCode() == HttpStatus.SC_OK) {
        return true;
      }
      Thread.sleep(interval);
      totalTime += interval;
      interval *= 1.5;
      if (interval > RESTART_ENSURE_RETRY_MAX_INTERVAL)
        interval = RESTART_ENSURE_RETRY_MAX_INTERVAL;
    }
    throw new RuntimeException("Spin check timed out");
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

  private void addPluginArgs(String plugin, String arg) {
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

  private String hashIPythonPassword(String cmdBase, String password)
    throws IOException
  {
    Process proc = Runtime.getRuntime().exec(cmdBase + " --hash");
    BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(proc.getOutputStream()));
    bw.write("from IPython.lib import passwd\n");
    // I have confirmed that this does not go into ipython history by experiment
    // but it would be nice if there were a way to make this explicit. XXX
    bw.write("print(passwd('" + password + "'))\n");
    bw.close();
    String hash = br.readLine();
    return hash;
  }

  private void generateIPythonConfig(int port, String password)
    throws IOException, InterruptedException
  {
    // Can probably determine exactly what is needed and then just
    // make the files ourselves but this is a safe way to get started.
    // Should pass pluginArgs too XXX.
    String cmdBase = (this.pluginLocations.containsKey("IPython") ?
                      this.pluginLocations.get("IPython") : (this.pluginDir + "/ipythonPlugins/ipython"))
      + "/ipythonPlugin";
    if (windows()) {
      cmdBase = "python " + cmdBase;
    }
    String cmd = cmdBase + " --profile " + this.nginxServDir;
    Runtime.getRuntime().exec(cmd).waitFor();
    String hash = hashIPythonPassword(cmdBase, password);
    String config = this.ipythonTemplate;
    config = config.replace("%(port)s", Integer.toString(port));
    config = config.replace("%(hash)s", hash);
    java.nio.file.Path targetFile = Paths.get(this.nginxServDir + "/profile_beaker_backend",
                                              "ipython_notebook_config.py");
    writePrivateFile(targetFile, config);
  }

  private String generateNginxConfig() throws IOException, InterruptedException {

    java.nio.file.Path confDir = Paths.get(this.nginxServDir, "conf");
    java.nio.file.Path logDir = Paths.get(this.nginxServDir, "logs");
    java.nio.file.Path nginxClientTempDir = Paths.get(this.nginxServDir, "client_temp");
    java.nio.file.Path htmlDir = Paths.get(this.nginxServDir, "html");

    if (Files.notExists(confDir)) {
      confDir.toFile().mkdirs();
    }
    if (Files.notExists(logDir)) {
      logDir.toFile().mkdirs();
    }
    if (Files.notExists(nginxClientTempDir)) {
      nginxClientTempDir.toFile().mkdirs();
    }

    if (Files.notExists(htmlDir)) {
      Files.createDirectory(htmlDir);
      Files.copy(Paths.get(this.nginxStaticDir + "/50x.html"),
                 Paths.get(htmlDir.toString() + "/50x.html"));
      Files.copy(Paths.get(this.nginxStaticDir + "/login.html"),
                 Paths.get(htmlDir.toString() + "/login.html"));
      Files.copy(Paths.get(this.nginxStaticDir + "/present.html"),
                 Paths.get(htmlDir.toString() + "/present.html"));
      //Files.copy(Paths.get(this.nginxStaticDir + "/favicon.ico"),
      //           Paths.get(htmlDir.toString() + "/favicon.ico"));
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
        .replace("%(base_url)s", pConfig.getBaseUrl());
      pluginSection.append(nginxRule + "\n\n");
    }
    String auth = encoder.encodeBase64String(("beaker:" + this.corePassword).getBytes());
    String listenSection;
    String authCookieRule;
    String startPage;
    if (this.publicServer) {
      listenSection = "listen " + this.portBase + " ssl;\n";
      // XXX should allow name to be set by user in bkConfig
      listenSection += "server_name " + InetAddress.getLocalHost().getHostName() + ";\n";
      listenSection += "ssl_certificate " + this.nginxServDir + "/ssl_cert.pem;\n";
      listenSection += "ssl_certificate_key " + this.nginxServDir + "/ssl_cert.pem;\n";
      authCookieRule = "if ($http_cookie !~ \"BeakerAuth=" + this.authCookie + "\") {return 403;}";
      startPage = "login/login.html";
    } else {
      listenSection = "listen 127.0.0.1:" + this.servPort + ";\n";
      authCookieRule = "";
      startPage = "beaker/";
    }
    nginxConfig = nginxConfig.replace("%(plugin_section)s", pluginSection.toString());
    nginxConfig = nginxConfig.replace("%(extra_rules)s", this.nginxExtraRules);
    nginxConfig = nginxConfig.replace("%(host)s", InetAddress.getLocalHost().getHostName());
    nginxConfig = nginxConfig.replace("%(port_main)s", Integer.toString(this.portBase));
    nginxConfig = nginxConfig.replace("%(port_beaker)s", Integer.toString(this.corePort));
    nginxConfig = nginxConfig.replace("%(port_clear)s", Integer.toString(this.servPort));
    nginxConfig = nginxConfig.replace("%(listen_on)s", this.publicServer ? "*" : "127.0.0.1");
    nginxConfig = nginxConfig.replace("%(listen_section)s", listenSection);
    nginxConfig = nginxConfig.replace("%(auth_cookie_rule)s", authCookieRule);
    nginxConfig = nginxConfig.replace("%(start_page)s", startPage);
    nginxConfig = nginxConfig.replace("%(port_restart)s", Integer.toString(this.restartPort));
    nginxConfig = nginxConfig.replace("%(auth)s", auth);
    nginxConfig = nginxConfig.replace("%(restart_id)s", restartId);
    java.nio.file.Path targetFile = Paths.get(this.nginxServDir, "conf/nginx.conf");
    writePrivateFile(targetFile, nginxConfig);
    return restartId;
  }

  private static int getNextAvailablePort(int start) {
    final int SEARCH_LIMIT = 100;
    for (int p = start; p < start + SEARCH_LIMIT; ++p) {
      if (isPortAvailable(p)) {
        return p;
      }
    }

    throw new RuntimeException("out of ports error");
  }

  private static String generatePrefixedRandomString(String prefix, int randomPartLength) {
    // Use lower case due to nginx bug handling mixed case locations
    // (fixed in 1.5.6 but why depend on it).
    return prefix.toLowerCase() + "." + RandomStringUtils.random(randomPartLength, false, true);
  }

  @GET
  @Path("getIPythonVersion")
  @Produces(MediaType.APPLICATION_JSON)
  public String getIPythonVersion()
      throws IOException
  {
    Process proc;
    if (windows()) {
      // XXX use ipythonPlugin --version, like generateIPythonConfig does
      String cmd = "python " + "\"" + this.pluginDir + "/ipythonPlugins/ipython/ipythonVersion\"";
      proc = Runtime.getRuntime().exec(cmd);
    } else {
      proc = Runtime.getRuntime().exec("ipython --version");
    }
    BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));
    String line = br.readLine();
    return line;
  }

  @GET
  @Path("getIPythonPassword")
  @Produces(MediaType.APPLICATION_JSON)
  public String getIPythonPassword(@QueryParam("pluginId") String pluginId)
  {
    PluginConfig pConfig = this.plugins.get(pluginId);
    if (null == pConfig) {
      return "";
    }
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

  private static boolean isPortAvailable(int port) {

    ServerSocket ss = null;
    DatagramSocket ds = null;
    try {
      ss = new ServerSocket(port);
      ss.setReuseAddress(true);
      ds = new DatagramSocket(port);
      ds.setReuseAddress(true);
      return true;
    } catch (IOException e) {
    } finally {
      if (ds != null) {
        ds.close();
      }
      if (ss != null) {
        try {
          ss.close();
        } catch (IOException e) {
          /* should not be thrown */
        }
      }
    }
    return false;
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
}
