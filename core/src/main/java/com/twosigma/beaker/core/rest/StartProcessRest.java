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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

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
  private String _extraRules = "";
  private String[] _env = null;
  private Map<String, PluginConfig> _plugins;
  private List<String> flags = new ArrayList<>();
  private ObjectMapper _mapper = new ObjectMapper();

  private final String installDir;
  private final String nginxDir;
  private final String staticDir;
  private final String configDir;
  private final String dotDir;
  private final String pluginDir;
  private final Integer portBase;
  private final Boolean useKerberos;

  @Inject
  private StartProcessRest(
      BeakerConfig bkConfig,
      BeakerCoreConfig bkcConfig) {
    this.installDir = bkConfig.getInstallDirectory();
    this.nginxDir = bkcConfig.getNginxPath();
    this.staticDir = bkConfig.getStaticDirectory();
    this.configDir = bkcConfig.getConfigDirectory();
    this.dotDir = bkConfig.getDotDirectory();
    this.pluginDir = bkcConfig.getPluginDirectory();
    this.portBase = bkcConfig.getPortBase();
    this.useKerberos = bkcConfig.getUseKerberos();
  }

  public void readPluginConfig() throws IOException, FileNotFoundException {

    File file = new File(this.dotDir + "/plugins");
    TypeReference readType = new TypeReference<HashMap<String, PluginConfig>>() {};
    try {
      _plugins = _mapper.readValue(file, readType);
    } catch (FileNotFoundException e) {
      String defaultFile = this.installDir + "/plugins";
      file = new File(defaultFile);
      _plugins = _mapper.readValue(file, readType);
      writePluginConfig();
    }
  }

  private void writePluginConfig() throws IOException, FileNotFoundException {
    File file = new File(this.dotDir + "/plugins");
    _mapper.writerWithDefaultPrettyPrinter().writeValue(file, _plugins);
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
    writePluginConfig();
  }

  public void setEnv(String[] env) {
    _env = env;
  }

  public void setExtraRules(String rules) {
    _extraRules = rules;
  }

  public void addArg(String plugin, String arg) {
    List<String> old = _args.get(plugin);
    if (old == null) {
      old = new ArrayList<>();
      _args.put(plugin, old);
    }
    old.add(arg);
  }

  public void shutdownPlugins() {
    StreamGobbler.shuttingDown();
    for (Process p : plugins) {
      p.destroy(); // send SIGTERM
    }
  }

  public void startReverseProxy()
          throws InterruptedException, IOException {
    String dir = this.dotDir;
    String[] preCommand = {this.configDir + "/nginx.conf.template", dir,
      Integer.toString(this.portBase), this.installDir, Boolean.toString(this.useKerberos),
      this.nginxDir, this.staticDir + "/static", _extraRules};
    Process preproc = Runtime.getRuntime().exec(preCommand);
    StreamGobbler preErrorGobbler = new StreamGobbler(_OutputLogService, preproc.getErrorStream(), "pre", "stderr", false, null);
    preErrorGobbler.start();
    StreamGobbler preStdoutGobbler = new StreamGobbler(_OutputLogService, preproc.getInputStream(), "pre", "stdout", false, null);
    preStdoutGobbler.start();
    preproc.waitFor();

    String nginxCommand = !this.nginxDir.isEmpty() ? (this.nginxDir + "/sbin/nginx -p " + dir)
            : ("nginx/nginx -p " + dir + " -c " + dir + "/conf/nginx.conf");
    Process proc = Runtime.getRuntime().exec(nginxCommand);
    StreamGobbler errorGobbler = new StreamGobbler(_OutputLogService, proc.getErrorStream(), "nginx", "stderr", false, null);
    errorGobbler.start();
    StreamGobbler stdoutGobbler = new StreamGobbler(_OutputLogService, proc.getInputStream(), "nginx", "stdout", false, null);
    stdoutGobbler.start();
    plugins.add(proc);
  }

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
      return new StringObject(("restart"));
    }

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
    Process proc = Runtime.getRuntime().exec(command, _env);

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
