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
import com.twosigma.beaker.core.module.config.BeakerCoreConfig;
import com.twosigma.beaker.shared.cometd.OutputLogService;
import com.twosigma.beaker.shared.json.serializer.StringObject;
import com.twosigma.beaker.shared.module.config.BeakerConfig;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.nio.file.Files;
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

  @Inject
  private OutputLogService _OutputLogService;
  private List<Process> plugins = new ArrayList<>();
  private Map<String, List<String>> _args = new HashMap<>();
  private Map<String, PluginConfig> _plugins = new HashMap<>();
  private List<String> flags = new ArrayList<>();

  private final String installDir;
  private final String nginxDir;
  private final String nginxExtraRules;
  private final String staticDir;
  private final String dotDir;
  private final String pluginDir;
  private final Integer portBase;
  private final Map<String, String[]> envps;

  @Inject
  private StartProcessRest(
      BeakerConfig bkConfig,
      BeakerCoreConfig bkcConfig) throws IOException {
    this.installDir = bkConfig.getInstallDirectory();
    this.nginxDir = bkcConfig.getNginxPath();
    this.nginxExtraRules = bkcConfig.getNginxExtraRules();
    this.staticDir = bkConfig.getStaticDirectory();
    this.dotDir = bkConfig.getDotDirectory();
    this.pluginDir = bkcConfig.getPluginDirectory();
    this.portBase = bkcConfig.getPortBase();
    this.envps = bkcConfig.getPluginEnvps();

    // Add shutdown hook
    Runtime.getRuntime().addShutdownHook(new Thread() {
      @Override
      public void run() {
        System.out.println("\nshutting down beaker");
        shutdownPlugins();
        System.out.println("done, exiting");
      }
    });

    // record plugin options from cli and to pass through to individual plugins
    for (Map.Entry<String, String> e: bkcConfig.getPluginOptions().entrySet()) {
      addArg(e.getKey(), e.getValue());
    }

  }

  private Boolean portOffsetFree(int portOffset) {
    for (String plugin : _plugins.keySet()) {
      PluginConfig p = _plugins.get(plugin);
      if (p.portOffset == portOffset) {
        return false;
      }
    }
    return true;
  }

  private void newPlugin(String command, String nginx)
          throws IOException, FileNotFoundException {
    PluginConfig pConfig = _plugins.get(command);
    if (null != pConfig) {
      pConfig.nginx = nginx;
    } else {
      int reserved_ports = 3;
      int limit = _plugins.size() + reserved_ports + 1;
      int i;
      for (i = reserved_ports; i < limit; i++) {
        if (portOffsetFree(i)) {
          break;
        }
      }
      if (i == limit) {
        System.err.println("out of ports error");
      }
      _plugins.put(command, new PluginConfig(i, nginx));
    }

  }

  private void addArg(String plugin, String arg) {
    List<String> old = _args.get(plugin);
    if (old == null) {
      old = new ArrayList<>();
      _args.put(plugin, old);
    }
    old.add(arg);
  }

  private void shutdownPlugins() {
    StreamGobbler.shuttingDown();
    for (Process p : plugins) {
      p.destroy(); // send SIGTERM
    }
  }

  public void start() throws InterruptedException, IOException {
    startReverseProxy();
  }

  private void startReverseProxy() throws InterruptedException, IOException {
    String dir = this.dotDir;
    generateNginxConfig();

    String nginxCommand = !this.nginxDir.isEmpty() ? (this.nginxDir + "/sbin/nginx -p " + dir)
            : ("nginx/nginx -p " + dir + " -c " + dir + "/conf/nginx.conf");
    Process proc = Runtime.getRuntime().exec(nginxCommand);
    StreamGobbler errorGobbler = new StreamGobbler(_OutputLogService, proc.getErrorStream(), "nginx", "stderr", false, null);
    errorGobbler.start();
    StreamGobbler stdoutGobbler = new StreamGobbler(_OutputLogService, proc.getInputStream(), "nginx", "stdout", false, null);
    stdoutGobbler.start();
    plugins.add(proc);
  }

  private void generateNginxConfig() throws IOException, InterruptedException {

    File confDir = new File(this.dotDir, "conf");
    File logDir = new File(this.dotDir, "logs");
    File nginxClientTempDir = new File(this.dotDir, "nginx_client_temp");
    File htmlDir = new File(this.dotDir, "html");

    if (!confDir.exists()) {
      confDir.mkdirs();
    }
    if (!logDir.exists()) {
      logDir.mkdirs();
    }
    if (!nginxClientTempDir.exists()) {
      nginxClientTempDir.mkdirs();
    }
    if (htmlDir.exists()) {
      Files.delete(htmlDir.toPath());
    }
    Files.createSymbolicLink(
        htmlDir.toPath(),
        new File(this.staticDir + "/static").toPath());

    String ngixConfig = NGINX_TEMPLATE;
    StringBuilder pluginSection = new StringBuilder();
    for (Map.Entry<String, PluginConfig> e : _plugins.entrySet()) {
      Integer portOffset = e.getValue().getPortOffset();
      String nginxRule = e.getValue().getNginx().replace("%(port)s", Integer.toString(this.portBase + portOffset));
      pluginSection.append(nginxRule);
    }
    ngixConfig = ngixConfig.replace("%(plugin_section)s", pluginSection.toString());
    ngixConfig = ngixConfig.replace("%(extra_rules)s", this.nginxExtraRules);
    ngixConfig = ngixConfig.replace("%(host)s", InetAddress.getLocalHost().getHostName());
    ngixConfig = ngixConfig.replace("%(install_dir)s", this.installDir);
    ngixConfig = ngixConfig.replace("%(dest_dir)s", this.dotDir);
    ngixConfig = ngixConfig.replace("%(port_main)s", Integer.toString(this.portBase));
    ngixConfig = ngixConfig.replace("%(port_beaker)s", Integer.toString(this.portBase + 2));
    ngixConfig = ngixConfig.replace("%(port_clear)s", Integer.toString(this.portBase + 1));
    ngixConfig = ngixConfig.replace("%(client_temp_dir)s", this.dotDir + "/nginx_client_temp");

    // write template to file
    System.out.println("Regenerate conf/nginx.conf");
    File targetFile = new File(this.dotDir, "conf/nginx.conf");
    if (targetFile.exists()) {
      Files.delete(targetFile.toPath());
    }
    PrintWriter out = new PrintWriter(targetFile);
    out.print(ngixConfig);
    out.close();
  }

  // TODO, load the template from a file
  private static final String NGINX_TEMPLATE =
"worker_processes  1;\n" +
"daemon off;\n" +
"\n" +
"#debug level logging is quite voluminous\n" +
"#error_log  stderr  debug;\n" +
"error_log  stderr  error;\n" +
"\n" +
"pid nginx.pid;\n" +
"\n" +
"events {\n" +
"    worker_connections  1024;\n" +
"}\n" +
"\n" +
"http {\n" +
"    default_type  application/octet-stream;\n" +
"    types_hash_max_size 2048;\n" +
"\n" +
"\n" +
"#    turn this on for debugging\n" +
"#    access_log access.log;\n" +
"    access_log off;\n" +
"\n" +
"    sendfile        on;\n" +
"\n" +
"    # i tried setting to 0 and removing the keepalive timer from the ipython client.\n" +
"    # but it did not fix the problem.\n" +
"    #keepalive_timeout  0;\n" +
"    keepalive_timeout  1000;\n" +
"    proxy_read_timeout 1000000;\n" +
"\n" +
"    server {\n" +
"\n" +
"# Exactly one of the two following sections should be active.\n" +
"\n" +
"# https\n" +
"#        listen       %(port_main)s ssl;\n" +
"#        server_name  localhost;\n" +
"#        ssl_certificate %(host)s.cer;\n" +
"#        ssl_certificate_key %(host)s.key;\n" +
"         client_max_body_size 100M;\n" +
"         client_body_temp_path %(client_temp_dir)s;\n" +
"         proxy_temp_path %(client_temp_dir)s;\n" +
"         fastcgi_temp_path %(client_temp_dir)s;\n" +
"         uwsgi_temp_path %(client_temp_dir)s;\n" +
"         scgi_temp_path %(client_temp_dir)s;\n" +
"\n" +
"\n" +
"# kerberos\n" +
"        listen       %(port_clear)s;\n" +
"\n" +
"        # redirect server error pages to the static page /50x.html\n" +
"        #\n" +
"        # html directory is missing now XXX\n" +
"        # this is also a problem for favicon XXX\n" +
"        error_page   500 502 503 504  /50x.html;\n" +
"        location = /50x.html {\n" +
"            root   html;\n" +
"        }\n" +
"\n" +
"    location /beaker/ {\n" +
"        proxy_pass http://127.0.0.1:%(port_beaker)s/;\n" +
"        }\n" +
"        %(plugin_section)s\n" +
"        %(extra_rules)s\n" +
"    }\n" +
"}\n";

  @POST
  @Path("runCommand")
  public StringObject runCommand(
      @FormParam("command") String command,
      @FormParam("started") String started,
      @FormParam("stream") String stream,
      @FormParam("nginx") String nginx,
      @FormParam("waitfor") String waitfor,
      @FormParam("record") String recordString,
      @FormParam("flag") String flag)
      throws InterruptedException, IOException {

    String name = flag;
    PluginConfig pConfig = _plugins.get(name);
    if (null == pConfig || !nginx.equals(pConfig.nginx)) {
      newPlugin(name, nginx);
      pConfig = _plugins.get(name);

      generateNginxConfig();

      Process restartproc = Runtime.getRuntime().exec(this.installDir + "/restart_nginx");
      StreamGobbler restartErrorGobbler = new StreamGobbler(_OutputLogService, restartproc.getErrorStream(), "pre3", "stderr", false, null);
      restartErrorGobbler.start();
      StreamGobbler restartStdoutGobbler = new StreamGobbler(_OutputLogService, restartproc.getInputStream(), "pre3", "stdout", false, null);
      restartStdoutGobbler.start();
      restartproc.waitFor();
    } else {

      boolean alreadyRan = false;
      for (String s : flags) {
        if (s.equals(flag)) {
          alreadyRan = true;
          break;
        }
      }
      if (alreadyRan) {
        System.out.println("process was already started, not starting another one: " + command);
        return new StringObject(("process was already started, not starting another one"));
      }
    }

    int port;
    boolean record = recordString != null && recordString.equals("true");
    String pluginName;
    port = this.portBase + pConfig.portOffset;
    pluginName = name;
    command = this.pluginDir + "/" + command;

    List<String> extraArgs = _args.get(pluginName);
    if (extraArgs != null) {
      for (String s : extraArgs) {
        command += " " + s;
      }
    }
    command += " " + Integer.toString(port);

    System.out.println("starting process " + command);

    String[] env = envps.get(pluginName);
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

    StreamGobbler errorGobbler = new StreamGobbler(_OutputLogService, proc.getErrorStream(), pluginName, "stderr", record, waitfor);
    errorGobbler.start();

    StreamGobbler outputGobbler = new StreamGobbler(_OutputLogService, proc.getInputStream(), pluginName, "stdout", record, null);
    outputGobbler.start();

    flags.add(flag);
    plugins.add(proc);
    System.out.println("Done starting " + pluginName);
    return new StringObject(("done"));
  }

  static class PluginConfig {

    public int portOffset;
    public String nginx;

    public PluginConfig(int p, String n) {
      portOffset = p;
      nginx = n;
    }
    // for jackson json serialization

    public int getPortOffset() {
      return portOffset;
    }

    public String getNginx() {
      return nginx;
    }

    public void setPortOffset(int p) {
      portOffset = p;
    }

    public void setNginx(String n) {
      nginx = n;
    }

    public PluginConfig() {
    }
  }
}
