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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.LocalSession;
import org.cometd.bayeux.server.ServerChannel;

/**
 * The service that backs up session to file that offers a RESTful API
 */
@Path("session-backup")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class SessionBackupRest {

  private final File backupDirectory;
  private final GeneralUtils utils;
  private BayeuxServer bayeux;
  private LocalSession localSession;

  @Inject
  public SessionBackupRest(BeakerConfig bkConfig, GeneralUtils utils, BayeuxServer bayeuxServer) {
    this.backupDirectory = new File(bkConfig.getSessionBackupsDirectory());
    this.utils = utils;
    this.bayeux = bayeuxServer;
    this.localSession = bayeuxServer.newLocalSession(getClass().getCanonicalName());
    this.localSession.handshake();
  }

  public static class Session {
    String notebookUri;
    String uriType;
    boolean readOnly;
    String format;
    String notebookModelJson;
    long openedDate;  // millis
    boolean edited;

    private Session(
        String notebookUri,
        String uriType,
        boolean readOnly,
        String format,
        String notebookModelJson,
        boolean edited,
        long openedDate) {
      this.notebookUri = notebookUri;
      this.uriType = uriType;
      this.readOnly = readOnly;
      this.format = format;
      this.notebookModelJson = notebookModelJson;
      this.edited = edited;
      this.openedDate = openedDate;
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
  @Path("backup/{session-id}")
  public void backup(
      @PathParam("session-id") String sessionId,
      @FormParam("notebookUri") String notebookUri,
      @FormParam("uriType") String uriType,
      @FormParam("readOnly") boolean readOnly,
      @FormParam("format") String format,
      @FormParam("notebookModelJson") String notebookModelJson,
      @FormParam("edited") boolean edited) {
    Session previous = this.sessions.get(sessionId);
    long date;
    if (previous != null) {
      date = previous.openedDate;
    } else {
      date = System.currentTimeMillis();
    }
    this.sessions.put(sessionId, new Session(
        notebookUri, uriType, readOnly, format, notebookModelJson, edited, date));

    // Notify client of changes in session
    ServerChannel sessionChangeChannel;
    if ((bayeux != null) && ((sessionChangeChannel = bayeux.getChannel("/sessionChange")) != null)) {
      Map<String, Object> data = new HashMap<String, Object>();
      sessionChangeChannel.publish(this.localSession, data, null);
    }

    try {
      recordToFile(sessionId, notebookUri, notebookModelJson);
    } catch (IOException | InterruptedException ex) {
      Logger.getLogger(SessionBackupRest.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  private void recordToFile(String sessionID, String notebookUri, String contentAsString)
      throws IOException, InterruptedException {
    if (notebookUri == null) {
      notebookUri = "NewNotebook";
    }
    final String fileName = sessionID + "_" + URLEncoder.encode(notebookUri, "ISO-8859-1") + ".bkr.backup";
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

    // Notify client of changes in session
    ServerChannel sessionChangeChannel;
    if ((bayeux != null) && ((sessionChangeChannel = bayeux.getChannel("/sessionChange")) != null)) {
      Map<String, Object> data = new HashMap<String, Object>();
      sessionChangeChannel.publish(this.localSession, data, null);
    }
  }

  @GET
  @Path("getExistingSessions")
  public Map<String, Session> getExistingSessions() {
    return this.sessions;
  }

  public static class SessionSerializer
          extends JsonSerializer<Session> {

    @Override
    public void serialize(Session session, JsonGenerator jgen, SerializerProvider sp)
        throws IOException, JsonProcessingException {
      jgen.writeStartObject();
      jgen.writeObjectField("notebookUri", session.notebookUri);
      jgen.writeObjectField("uriType", session.uriType);
      jgen.writeObjectField("readOnly", session.readOnly);
      jgen.writeObjectField("format", session.format);
      jgen.writeObjectField("notebookModelJson", session.notebookModelJson);
      jgen.writeObjectField("openedDate", session.openedDate);
      jgen.writeObjectField("edited", session.edited);
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
