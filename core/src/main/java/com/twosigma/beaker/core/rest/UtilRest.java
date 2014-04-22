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
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * RESTful API for general utilities
 */
@Path("util")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class UtilRest {

  private final BeakerConfig bkConfig;
  private final GeneralUtils utils;

  @Inject
  public UtilRest(BeakerConfig bkConfig, GeneralUtils generalUtils) {
    this.bkConfig = bkConfig;
    this.utils = generalUtils;
    resetConfig();
  }

  @GET
  @Path("whoami")
  @Produces(MediaType.TEXT_PLAIN)
  public String whoami(@Context HttpServletRequest request) {
    return "\"" + System.getProperty("user.name") + "\"";
  }

  @GET
  @Path("allStackTraces")
  public List<Map<String, Object>> getAllStackTraces() {
    List<Map<String, Object>> out = new ArrayList<>();
    Map<Thread, StackTraceElement[]> allStackTraces = Thread.getAllStackTraces();

    for (Thread t : allStackTraces.keySet()) {
      Map<String, Object> map = new HashMap<>();
      map.put("thread", t);
      map.put("stackTraces", allStackTraces.get(t));
      out.add(map);
    }

    return out;
  }

  private static String clean(String js) {
    // Remove slash-star comments. This regexp is not correct
    // since it removes comments that are in a string
    // constant. Should really parse. This is why we don't remove
    // double-slash comments, because they are likely to appear
    // (think http://). XXX
    js = js.replaceAll("/\\*([^*]|[\\r\\n]|(\\*+([^*/]|[\\r\\n])))*\\*+/", "");
    int i, j;
    String tripleQuote = "\"\"\"";
    while ((i = js.indexOf(tripleQuote)) > 0) {
      if ((j = js.indexOf(tripleQuote, i + 1)) < 0) {
        break;
      }
      String pre = js.substring(0, i);
      String lines = js.substring(i + 3, j);
      String post = js.substring(j + 3);
      lines = lines.replaceAll("\n", "\\\\n");
      js = pre + "\"" + lines + "\"" + post;
    }
    return js;
  }

  @GET
  @Path("getDefaultNotebook")
  @Produces(MediaType.TEXT_PLAIN)
  public String getDefaultNotebook() {
    final String defaultNotebookUrl = this.bkConfig.getDefaultNotebookUrl();

    // TODO, assume the url is a file path for now.
    java.nio.file.Path defaultNotebookFile = Paths.get(defaultNotebookUrl);
    String content = this.utils.readFile(defaultNotebookFile);
    if (content == null) {
      System.out.println("Warning, default notebook is empty");
      return "";
    }

    return clean(content);
  }

  private void resetConfig() {
    final String configFileUrl = this.bkConfig.getConfigFileUrl();

    // TODO, assume the url is a file path for now.
    java.nio.file.Path configFile = Paths.get(configFileUrl);
    try {
      JSONParser parser = new JSONParser();
      Object obj = parser.parse(this.utils.readFile(configFile));

      JSONObject jsonObject = (JSONObject) obj;
      {
        Boolean allowTracking = (Boolean) jsonObject.get("allow-anonymous-usage-tracking");
        if (allowTracking == null) {
          setAllowAnonymousTracking(null);
        } else if (allowTracking.equals(Boolean.TRUE)) {
          setAllowAnonymousTracking("true");
        } else if (allowTracking.equals(Boolean.FALSE)) {
          setAllowAnonymousTracking("false");
        } else {
          setAllowAnonymousTracking(null);
        }
      }
      {
        JSONArray menus = (JSONArray) jsonObject.get("init");
        @SuppressWarnings("unchecked")
        Iterator<String> iterator = menus.iterator();
        while (iterator.hasNext()) {
          addInitPlugin(iterator.next());
        }
      }
      {
        JSONArray menus = (JSONArray) jsonObject.get("control-panel-menu-plugins");
        @SuppressWarnings("unchecked")
        Iterator<String> iterator = menus.iterator();
        while (iterator.hasNext()) {
          addControlPanelMenuPlugin(iterator.next());
        }
      }
      {
        JSONArray menus = (JSONArray) jsonObject.get("notebook-app-menu-plugins");
        @SuppressWarnings("unchecked")
        Iterator<String> iterator = menus.iterator();
        while (iterator.hasNext()) {
          addMenuPlugin(iterator.next());
        }
      }
      {
        JSONArray menus = (JSONArray) jsonObject.get("notebook-cell-menu-plugins");
        @SuppressWarnings("unchecked")
        Iterator<String> iterator = menus.iterator();
        while (iterator.hasNext()) {
          addCellMenuPlugin(iterator.next());
        }
      }
    } catch (ParseException e) {
      throw new RuntimeException("failed getting beaker configurations from config file", e);
    }
  }

  private Boolean isAllowAnonymousTracking = null;

  @POST
  @Path("setAllowAnonymousTracking")
  public void setAllowAnonymousTracking(
      @FormParam("allow") String allow) {

    if (allow == null) {
      this.isAllowAnonymousTracking = null;
    } else if (allow.equals("true")) {
      this.isAllowAnonymousTracking = Boolean.TRUE;
    } else if (allow.equals("false")) {
      this.isAllowAnonymousTracking = Boolean.FALSE;
    } else {
      this.isAllowAnonymousTracking = null;
    }
    final String configFileUrl = this.bkConfig.getConfigFileUrl();

    // TODO, assume the url is a file path for now.
    java.nio.file.Path configFile = Paths.get(configFileUrl);
    try {
      ObjectMapper om = new ObjectMapper();
      TypeReference readType = new TypeReference<HashMap<String, Object>>() {
      };
      Map<String, Object> configs = om.readValue(configFile.toFile(), readType);
      Boolean oldValue = (Boolean) configs.get("allow-anonymous-usage-tracking");
      // If value changed, write it to the file too
      if ((this.isAllowAnonymousTracking == null && oldValue != null)
              || (this.isAllowAnonymousTracking != null && !(this.isAllowAnonymousTracking.equals(oldValue)))) {
        configs.put("allow-anonymous-usage-tracking", this.isAllowAnonymousTracking);
        om.writerWithDefaultPrettyPrinter().writeValue(configFile.toFile(), configs);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @GET
  @Path("isAllowAnonymousTracking")
  public Boolean isAllowAnonymousTracking() {
    return this.isAllowAnonymousTracking;
  }

  /* Init Plugins */
  private final List<String> initPlugins = new ArrayList<>();

  public void addInitPlugin(String p) {
    this.initPlugins.add(p);
  }

  @GET
  @Path("getInitPlugins")
  public List<String> getInitPlugins() {
    return this.initPlugins;
  }

  /* bkApp Menu Plugins */
  private final Set<String> menuPlugins = new LinkedHashSet<>();

  @POST
  @Path("addMenuPlugin")
  public void addMenuPlugin(
          @FormParam("url") String urlAsString) {
    this.menuPlugins.add(urlAsString);
  }

  @GET
  @Path("getMenuPlugins")
  public Set<String> getMenuPlugins() {
    return this.menuPlugins;
  }

  /* bkControl Menu Plugins */
  private final Set<String> controlPanelMenuPlugins = new LinkedHashSet<>();

  @POST
  @Path("addControlMenuPlugin")
  public void addControlPanelMenuPlugin(
          @FormParam("url") String urlAsString) {
    this.controlPanelMenuPlugins.add(urlAsString);
  }

  @GET
  @Path("getControlPanelMenuPlugins")
  public Set<String> getControlPanelMenuPlugins() {
    return this.controlPanelMenuPlugins;
  }

  /* bkCell Menu Plugins */
  private final List<String> cellMenuPlugins = new ArrayList<>();

  @POST
  @Path("addCellMenuPlugin")
  public void addCellMenuPlugin(String p) {
    this.cellMenuPlugins.add(p);
  }

  @GET
  @Path("getCellMenuPlugins")
  public List<String> getCellMenuPlugins() {
    return this.cellMenuPlugins;
  }
}
