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
import com.twosigma.beaker.shared.servlet.BeakerProxyServlet;
import com.twosigma.beaker.shared.servlet.rules.PluginProxyRule;
import com.twosigma.beaker.shared.servlet.rules.util.Replacement;
import org.apache.commons.lang3.RandomStringUtils;
import org.json.simple.JSONObject;
import org.jvnet.winp.WinProcess;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.util.*;
import java.util.concurrent.ExecutionException;

import static java.util.Collections.singletonList;


/**
 * This is the service that locates a plugin service. And a service will be started if the target
 * service doesn't exist.
 */
@Path("plugin-services")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class PluginServiceLocatorRest {
  private final String currentServDir;
  private final String pluginDir;
  private final Integer corePort;
  private final Map<String, String> pluginLocations;
  private final Map<String, List<String>> pluginArgs;
  private final Map<String, String[]> pluginEnvps;
  private final OutputLogService outputLogService;
  private final String corePassword;

  private final String ipythonTemplate;
  private final Map<String, PluginConfig> plugins = new HashMap<>();
  private int portSearchStart;
  private BeakerConfig config;

  private static String[] listToArray(List<String> lst) {
    return lst.toArray(new String[lst.size()]);
  }

  @Inject
  private PluginServiceLocatorRest(
      BeakerConfig bkConfig,
      WebServerConfig webServerConfig,
      OutputLogService outputLogService) throws IOException {
    this.currentServDir = bkConfig.getCurrentServDirectory();
    this.pluginDir = bkConfig.getPluginDirectory();
    Integer portBase = bkConfig.getPortBase();
    this.corePort = portBase + 2;
    Integer reservedPortCount = bkConfig.getReservedPortCount();
    this.pluginLocations = bkConfig.getPluginLocations();
    this.pluginEnvps = bkConfig.getPluginEnvps();
    this.pluginArgs = new HashMap<>();
    this.outputLogService = outputLogService;
    this.config = bkConfig;
    this.ipythonTemplate = ("c = get_config()\n" +
                            "c.NotebookApp.ip = u'127.0.0.1'\n" +
                            "c.NotebookApp.port = %(port)s\n" +
                            "c.NotebookApp.open_browser = False\n" +
                            "c.NotebookApp.password = u'%(hash)s'\n");

    this.corePassword = webServerConfig.getPassword();

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
        System.out.println("\nshutting down beaker");
        shutdown();
        System.out.println("done, exiting");
      }
    });

    portSearchStart = portBase + reservedPortCount;
  }

  private List<String> pythonBaseCommand(String pluginId, String command) {
    // Should pass pluginArgs too XXX?
    List<String> result = new ArrayList<>();
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

  private void shutdown() {
    StreamGobbler.shuttingDown();
    for (PluginConfig p : this.plugins.values()) {
      p.shutDown();
    }
  }

  private boolean internalEnvar(String var) {
    String [] vars = {"beaker_plugin_password",
                      "beaker_plugin_path",
                      "beaker_tmp_dir",
                      "beaker_core_password"};
    for (String var1 : vars)
      if (var.startsWith(var1 + "="))
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
      for (String anEnv : env) {
        if (!internalEnvar(anEnv))
          envList.add(anEnv);
      }
    }
    if (password != null) {
      envList.add("beaker_plugin_password=" + password);
    }
    envList.add("beaker_core_password=" + this.corePassword);
    envList.add("beaker_core_port=" + corePort);
    envList.add("beaker_tmp_dir=" + this.currentServDir);
    envList.add("beaker_ipython_notebook_config=" + this.currentServDir
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
   * @param proxyRules rules to help setup proxying
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
  @Produces(MediaType.APPLICATION_JSON)
  public Response locatePluginService(
      @PathParam("plugin-id") String pluginId,
      @QueryParam("command") String command,
      @QueryParam("proxyRules") @DefaultValue("rest") String proxyRules,
      @QueryParam("startedIndicator") String startedIndicator,
      @QueryParam("startedIndicatorStream") @DefaultValue("stdout") String startedIndicatorStream,
      @QueryParam("recordOutput") @DefaultValue("false") boolean recordOutput,
      @QueryParam("waitfor") String waitfor)
    throws InterruptedException, IOException, ExecutionException {
      
    PluginConfig pConfig = this.plugins.get(pluginId);
    if (pConfig != null && pConfig.isStarted()) {
      System.out.println("plugin service " + pluginId +
          " already started at" + pConfig.getBaseUrl());
      return buildResponse(pConfig.getBaseUrl(), String.valueOf(pConfig.getPort()), false);
    }

    String password = RandomStringUtils.random(40, true, true);
    Process proc;

    /*
     * Only one plugin can be started at a given time since we need to find a free port.
     */
    synchronized (this) {
      // find a port to use for proxypass between proxy and the plugin
      final int port = getNextAvailablePort(this.portSearchStart);
      final String baseUrl = generatePrefixedRandomString(pluginId, 12).replaceAll("[\\s]", "");
      pConfig = new PluginConfig(port, baseUrl, password);
      this.portSearchStart = pConfig.port + 1;
      this.plugins.put(pluginId, pConfig);

      if (proxyRules.startsWith("ipython")) {
        generateIPythonConfig(pluginId, port, password, command);
      }

      BeakerProxyServlet.addPlugin(pluginId, port, password, baseUrl, getPluginSpecificRules(proxyRules));

      ArrayList<String> fullCommand = new ArrayList<>(Arrays.asList(command.split("\\s+")));
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

      String[] env = buildEnv(pluginId, password);

      if (windows()) {
	      String python = this.config.getInstallDirectory() + "\\python\\python";
        fullCommand.add(0, python);
      }
      System.out.println("Running");
      for (int i = 0; i < fullCommand.size(); i++) {
        System.out.println(i + ": " + fullCommand.get(i));
      }
      proc = Runtime.getRuntime().exec(listToArray(fullCommand), env);
    }
    
    if (startedIndicator != null && !startedIndicator.isEmpty()) {
      InputStream is = startedIndicatorStream.equals("stderr") ?
        proc.getErrorStream() : proc.getInputStream();
      InputStreamReader ir = new InputStreamReader(is);
      BufferedReader br = new BufferedReader(ir);
      String line;
      while ((line = br.readLine()) != null) {
        System.out.println("looking on " + startedIndicatorStream + " found:" + line);
        if (line.contains(startedIndicator)) {
          System.out.println("Acknowledge " + pluginId + " plugin started due to "+startedIndicator);
          break;
        }
      }
      if (null == line) {
        throw new PluginServiceNotFoundException("plugin service: "
                                                 + pluginId + " failed to start");
      }
    }

    startGobblers(proc, pluginId, recordOutput ? this.outputLogService : null, waitfor);

    pConfig.setProcess(proc);
    System.out.println("Done starting " + pluginId);

    return buildResponse(pConfig.getBaseUrl(), String.valueOf(pConfig.getPort()), true);
  }

  private ArrayList<PluginProxyRule> getPluginSpecificRules(String pluginRulesString) {
    final ArrayList<PluginProxyRule> proxyRules = new ArrayList<>();
    if (pluginRulesString.startsWith("ipython")) {
      proxyRules.add(new PluginProxyRule(Arrays.asList(
          "(.*)\\/api\\/((sessions)|(kernels\\/kill)|(kernels/[0-9a-f-]+/interrupt)|(kernelspecs))\\/",
          "(.*)/api/kernels/[0-9a-f-]+/((interrupt)|(restart))"
      ),
          new Replacement("(.+)\\/sessions\\/$", "$1/sessions", true),
          new Replacement("(.+)/api/kernels/kill/$", "$1/api/kernels/", true)
      ) {
        @Override
        public void setHeaders(org.eclipse.jetty.client.api.Request proxyRequest, HttpServletRequest clientRequest) {
          rewriteHeader(proxyRequest, "Origin", "http://127.0.0.1:" + getPluginConfig().getPort());
        }
      });
      proxyRules.add(new PluginProxyRule(singletonList("(.*)/api/kernels/[0-9a-f-]+/.*"),    // websockets rule
          new Replacement("\\/(kernels\\/[0-9a-f-]+\\/(.*))", "/$1", true),
          new Replacement(":\\d{4}/", ":%(port)s/", true)
      ));
    }
    return proxyRules;
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

  private static Response buildResponse(String baseUrl, String port, boolean created) {
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("baseUrl", baseUrl);
    jsonObject.put("port", port);
    return Response
        .status(created ? Response.Status.CREATED : Response.Status.OK)
        .entity(jsonObject.toJSONString())
        .location(URI.create(baseUrl))
        .build();
  }

  private static class PluginServiceNotFoundException extends WebApplicationException {
    PluginServiceNotFoundException(String message) {
      super(Response.status(Responses.NOT_FOUND)
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
      cmd.add("\\\"" + this.currentServDir + "\\\"");
    }else{
      cmd.add(this.currentServDir);
    }
    cmd.add(pluginId);
    Runtime.getRuntime().exec(listToArray(cmd), buildEnv(pluginId, null)).waitFor();
    String hash = hashIPythonPassword(password, pluginId, command);
    String config = this.ipythonTemplate;
    config = config.replace("%(port)s", Integer.toString(port));
    config = config.replace("%(hash)s", hash);
    java.nio.file.Path targetFile = Paths.get(this.currentServDir + "/profile_beaker_backend_" + pluginId,
                                              "ipython_notebook_config.py");
    writePrivateFile(targetFile, config);
  }

  private int getNextAvailablePort(int start) {
    final int SEARCH_LIMIT = 100;
    for (int p = start; p < start + SEARCH_LIMIT; ++p) {
      if (isPortAvailable(p)) {
        return p;
      }
    }

    throw new RuntimeException("out of ports error");
  }

  private static boolean isPortAvailable(int port) {
    ServerSocket ss = null;
    try {
      InetAddress address = InetAddress.getByName("127.0.0.1");
      ss = new ServerSocket(port, 1, address);
      ss.setReuseAddress(true);
      return true;
    } catch (IOException ignore) {
    } finally {
      if (ss != null) {
        try {
          ss.close();
        } catch (IOException ignore) {
        }
      }
    }
    return false;
  }

  private static String generatePrefixedRandomString(String prefix, int randomPartLength) {
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
    return br.readLine();
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
    private Process proc;
    private final String baseUrl;
    private final String password;

    PluginConfig(int port, String baseUrl, String password) {
      this.port = port;
      this.baseUrl = baseUrl;
      this.password = password;
    }

    int getPort() {
      return this.port;
    }

    String getBaseUrl() {
      return this.baseUrl;
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
}
