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
import com.twosigma.beaker.core.module.config.BeakerConfig;
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * The service that backs up session to file that offers a RESTful API
 */
@Path("session-backup")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class SessionBackupRest {

  private final File backupDirectory;
  private final GeneralUtils utils;

  @Inject
  public SessionBackupRest(BeakerConfig bkConfig, GeneralUtils utils) {
    this.backupDirectory = new File(bkConfig.getSessionBackupsDirectory());
    this.utils = utils;
  }

  public static class Session {

    String notebookurl;
    String caption;
    String content;
    long openDate;  // millis
    boolean edited;

    private Session(String url, String contentAsString, String cap, long date, boolean ed) {
      notebookurl = url;
      content = contentAsString;
      caption = cap;
      openDate = date;
      edited = ed;
    }
  }

  public static class Plugin {

    String pluginName;
    String pluginUrl;

    private Plugin(String name, String url) {
      pluginName = name;
      pluginUrl = url;
    }
  }
  private final Map<String, Session> sessions = new HashMap<>();
  private final List<Plugin> plugins = new ArrayList<>();

  @POST
  @Path("backup")
  public void backup(
      @FormParam("sessionid") String sessionID,
      @FormParam("notebookurl") String notebookUrl,
      @FormParam("content") String contentAsString,
      @FormParam("caption") String caption,
      @FormParam("edited") boolean edited) {
    Session previous = this.sessions.get(sessionID);
    long date;
    if (previous != null) {
      date = previous.openDate;
    } else {
      date = System.currentTimeMillis();
    }
    this.sessions.put(sessionID, new Session(notebookUrl, contentAsString, caption, date, edited));
    try {
      recordToFile(sessionID, notebookUrl, contentAsString);
    } catch (IOException | InterruptedException ex) {
      Logger.getLogger(SessionBackupRest.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  private void recordToFile(String sessionID, String notebookUrl, String contentAsString)
          throws IOException, InterruptedException {
    if (notebookUrl == null) {
      notebookUrl = "NewNotebook";
    }
    final String fileName = sessionID + "_" + URLEncoder.encode(notebookUrl, "ISO-8859-1") + ".bkr.backup";
    final File file = new File(this.backupDirectory, fileName);
    this.utils.saveFile(file, contentAsString);
    file.setReadable(false, false);
    file.setWritable(false, false);
    file.setReadable(true, true);
    file.setWritable(true, true);
  }

  @GET
  @Path("load")
  public Session load(
          @QueryParam("sessionid") String sessionID) {
    return this.sessions.get(sessionID);
  }

  @POST
  @Path("close")
  public void close(
          @FormParam("sessionid") String sessionID) {
    this.sessions.remove(sessionID);
  }

  @GET
  @Path("getExistingSessions")
  public Map<String, Session> getExistingSessions() {
    return this.sessions;
  }

  public static class SessionSerializer
          extends JsonSerializer<Session> {

    @Override
    public void serialize(Session t, JsonGenerator jgen, SerializerProvider sp)
        throws IOException, JsonProcessingException {
      jgen.writeStartObject();
      jgen.writeObjectField("notebookurl", t.notebookurl);
      jgen.writeObjectField("caption", t.caption);
      jgen.writeObjectField("openDate", t.openDate);
      jgen.writeObjectField("content", t.content);
      jgen.writeObjectField("edited", t.edited);
      jgen.writeEndObject();
    }
  }

  @POST
  @Path("addPlugin")
  public void addPlugin(
      @FormParam("pluginname") String pluginName,
      @FormParam("pluginurl") String pluginUrl) {
    // can NPE if arguments are null XXX
    boolean existsAlready = false;
    for (int i = 0; i < this.plugins.size(); ++i) {
      Plugin p = this.plugins.get(i);
      if (p.pluginUrl.equals(pluginUrl)) {
        p.pluginName = pluginName;
        existsAlready = true;
        break;
      }
    }
    if (!existsAlready) {
      this.plugins.add(new Plugin(pluginName, pluginUrl));
    }
  }

  @GET
  @Path("getExistingPlugins")
  public List<Plugin> getAllPlugins() {
    return this.plugins;
  }

  public static class ExistingPlugins {

    final private List<Plugin> plugins;

    public ExistingPlugins(List<Plugin> plugins) {
      this.plugins = plugins;
    }

    public List<Plugin> getPlugins() {
      return this.plugins;
    }
  }

  public static class PluginSerializer extends JsonSerializer<Plugin> {

    @Override
    public void serialize(Plugin t, JsonGenerator jgen, SerializerProvider sp)
        throws IOException, JsonProcessingException {
      jgen.writeStartObject();
      jgen.writeObjectField("name", t.pluginName);
      jgen.writeObjectField("url", t.pluginUrl);
      jgen.writeEndObject();
    }
  }
}
