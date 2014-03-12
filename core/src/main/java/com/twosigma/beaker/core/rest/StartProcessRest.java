/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
import com.twosigma.beaker.core.module.config.BeakerConfig;
import com.twosigma.beaker.shared.cometd.OutputLogService;
import com.twosigma.beaker.shared.json.serializer.StringObject;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * The RESTful API for starting a process by running command
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("startProcess")
public class StartProcessRest {

  private final String installDir;
  private final String nginxDir;
  private final String nginxBinDir;
  private final String nginxServDir;
  private final String nginxExtraRules;
  private final String pluginDir;
  private final Integer portBase;
  private final Integer reservedPortCount;
  private final Map<String, List<String>> pluginArgs;
  private final Map<String, String[]> pluginEnvps;
  private final OutputLogService outputLogService;

  private final String nginxTemplate;
  private final Map<String, PluginConfig> plugins = new HashMap<>();
  private Process nginxProc;
  private int portSearchStart;

  @Inject
  private StartProcessRest(
      BeakerConfig bkConfig,
      OutputLogService outputLogService) throws IOException {
    this.installDir = bkConfig.getInstallDirectory();
    this.nginxDir = bkConfig.getNginxDirectory();
    this.nginxBinDir = bkConfig.getNginxBinDirectory();
    this.nginxServDir = bkConfig.getNginxServDirectory();
    this.nginxExtraRules = bkConfig.getNginxExtraRules();
    this.pluginDir = bkConfig.getPluginDirectory();
    this.portBase = bkConfig.getPortBase();
    this.reservedPortCount = bkConfig.getReservedPortCount();
    this.pluginEnvps = bkConfig.getPluginEnvps();
    this.pluginArgs = new HashMap<>();
    this.outputLogService = outputLogService;
    this.nginxTemplate = readFile(this.nginxDir + "/nginx.conf.template");

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

  public void start() throws InterruptedException, IOException {
    startReverseProxy();
  }

  private void startReverseProxy() throws InterruptedException, IOException {

    generateNginxConfig();

    String nginxCommand = this.nginxBinDir + "/nginx";
    nginxCommand += (" -p " + this.nginxServDir);
    nginxCommand += (" -c " + this.nginxServDir + "/conf/nginx.conf");
    Process proc = Runtime.getRuntime().exec(nginxCommand);
    StreamGobbler errorGobbler =
        new StreamGobbler(outputLogService, proc.getErrorStream(), "nginx",
        "stderr", false, null);
    errorGobbler.start();
    StreamGobbler stdoutGobbler =
        new StreamGobbler(outputLogService, proc.getInputStream(), "nginx",
        "stdout", false, null);
    stdoutGobbler.start();

    this.nginxProc = proc;
  }

  private void shutdown() {
    StreamGobbler.shuttingDown();
    this.nginxProc.destroy(); // send SIGTERM
    for (PluginConfig p : this.plugins.values()) {
      p.shutDown();
    }
  }


  @POST
  @Path("runCommand")
  public StringObject runCommand(
      @FormParam("command") String command,
      @FormParam("started") String started,
      @FormParam("stream") String stream,
      @FormParam("nginx") String nginxRules,
      @FormParam("waitfor") String waitfor,
      @FormParam("record") String recordString,
      @FormParam("flag") String pluginName)
      throws InterruptedException, IOException {

    PluginConfig pConfig = plugins.get(pluginName);
    if (pConfig == null) {
      pConfig = new PluginConfig(getNextAvailablePort(portSearchStart), nginxRules);
      portSearchStart = pConfig.port + 1;
      plugins.put(pluginName, pConfig);

      // restart nginx
      generateNginxConfig();
      Process restartproc = Runtime.getRuntime().exec(this.nginxDir + "/script/restart_nginx");
      StreamGobbler restartErrorGobbler =
          new StreamGobbler(outputLogService, restartproc.getErrorStream(), pluginName,
          "stderr", false, null);
      restartErrorGobbler.start();
      StreamGobbler restartStdoutGobbler =
          new StreamGobbler(outputLogService, restartproc.getInputStream(), pluginName,
          "stdout", false, null);
      restartStdoutGobbler.start();
      restartproc.waitFor();

    } else {
      if (pConfig.isStarted()) {
        System.out.println("process was already started, not starting another one: " + command);
        return new StringObject(("process was already started, not starting another one"));
      }
    }

    boolean record = recordString != null && recordString.equals("true");
    if (!new File(command).exists()) {
      command = this.pluginDir + "/" + command;
    }

    List<String> extraArgs = pluginArgs.get(pluginName);
    if (extraArgs != null) {
      for (String s : extraArgs) {
        command += " " + s;
      }
    }
    command += " " + Integer.toString(pConfig.port);

    System.out.println("starting process " + command);

    String[] env = pluginEnvps.get(pluginName);
    Process proc = Runtime.getRuntime().exec(command, env);

    InputStreamReader ir;
    if (null == stream) {
      stream = "stdout";
    }
    if (stream.equals("stderr")) {
      ir = new InputStreamReader(proc.getErrorStream());
    } else {
      ir = new InputStreamReader(proc.getInputStream());
    }

    BufferedReader br = new BufferedReader(ir);
    String line = "";
    while ((line = br.readLine()) != null) {
      System.out.println("looking on " + stream + " found:" + line);
      if (line.indexOf(started) >= 0) {
        System.out.println("Acknowledge " + pluginName + " plugin started");
        break;
      }
    }

    StreamGobbler errorGobbler =
        new StreamGobbler(outputLogService, proc.getErrorStream(), pluginName,
        "stderr", record, waitfor);
    errorGobbler.start();

    StreamGobbler outputGobbler =
        new StreamGobbler(outputLogService, proc.getInputStream(), pluginName,
        "stdout", record, null);
    outputGobbler.start();

    pConfig.setProcess(proc);
    System.out.println("Done starting " + pluginName);
    return new StringObject(("done"));
  }

  private void addPluginArgs(String plugin, String arg) {
    List<String> args = this.pluginArgs.get(plugin);
    if (args == null) {
      args = new ArrayList<>();
      this.pluginArgs.put(plugin, args);
    }
    args.add(arg);
  }

  private void generateNginxConfig() throws IOException, InterruptedException {

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

    java.nio.file.Path target = Paths.get(this.installDir + "/src/main/web/static");
    if (Files.exists(htmlDir, java.nio.file.LinkOption.NOFOLLOW_LINKS)) {// ||
        //(Files.isSymbolicLink(htmlDir) && !Files.readSymbolicLink(htmlDir).equals(target))) {
      Files.delete(htmlDir);
    }
    Files.createSymbolicLink(htmlDir, target);

    String ngixConfig = this.nginxTemplate;
    StringBuilder pluginSection = new StringBuilder();
    for (PluginConfig pConfig : plugins.values()) {
      String nginxRule = pConfig.getNginxRules()
          .replace("%(port)s", Integer.toString(pConfig.getPort()));
      pluginSection.append(nginxRule);
    }
    ngixConfig = ngixConfig.replace("%(plugin_section)s", pluginSection.toString());
    ngixConfig = ngixConfig.replace("%(extra_rules)s", this.nginxExtraRules);
    ngixConfig = ngixConfig.replace("%(host)s", InetAddress.getLocalHost().getHostName());
    ngixConfig = ngixConfig.replace("%(port_main)s", Integer.toString(this.portBase));
    ngixConfig = ngixConfig.replace("%(port_beaker)s", Integer.toString(this.portBase + 2));
    ngixConfig = ngixConfig.replace("%(port_clear)s", Integer.toString(this.portBase + 1));
    ngixConfig = ngixConfig.replace("%(client_temp_dir)s", nginxClientTempDir.toFile().getPath());

    // write template to file
    File targetFile = new File(this.nginxServDir, "conf/nginx.conf");
    if (targetFile.exists()) {
      Files.delete(targetFile.toPath());
    }
    try (PrintWriter out = new PrintWriter(targetFile)) {
      out.print(ngixConfig);
    }
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

  private static class PluginConfig {

    private final int port;
    private final String nginxRules;
    private Process proc;

    PluginConfig(int port, String nginxRules) {
      this.port = port;
      this.nginxRules = nginxRules;
    }

    int getPort() {
      return this.port;
    }

    String getNginxRules() {
      return this.nginxRules;
    }

    void setProcess(Process proc) {
      this.proc = proc;
    }

    boolean isStarted () {
      return this.proc != null;
    }

    void shutDown() {
      this.proc.destroy(); // send SIGTERM
    }

  }

  private static String readFile(String path) throws IOException {
    byte[] encoded = Files.readAllBytes(Paths.get(path));
    return Charset.defaultCharset().decode(ByteBuffer.wrap(encoded)).toString();
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
}
