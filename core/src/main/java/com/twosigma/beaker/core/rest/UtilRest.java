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
import java.util.HashSet;
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
  @Path("getVersionInfo")
  @Produces(MediaType.APPLICATION_JSON)
  public String getVersionInfo(@Context HttpServletRequest request) {
    return "{\"buildTime\": \"" + this.bkConfig.getBuildTime() + "\","
        + " \"version\":\"" + this.bkConfig.getVersion() + "\"}";
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

  /**
   * This function returns a Boolean setting as string. If the setting is null in the preference,
   * it will use the setting in the config, otherwise, what is set in preference is used.
   * @param settingsListName
   * @param configs
   * @param prefs
   * @return
   */
  private static String mergeBooleanSetting(
      String settingName,
      JSONObject configs,
      JSONObject prefs) {
      Boolean sc = (Boolean) configs.get(settingName);
      Boolean sp = (Boolean) prefs.get(settingName);
      Boolean s = (sp != null) ? sp : sc;
      String setting = null;
      if (s != null) {
        if (s.equals(Boolean.TRUE)) {
          setting = "true";
        } else if (s.equals(Boolean.FALSE)) {
          setting = "false";
        }
      }
      return setting;
  }

  /**
   * This function returns a list of settings from the result of merging setting gotten from
   * both the config and preference files and having to-remove items specified in the preference
   * file removed
   * @param settingsListName
   * @param configs
   * @param prefs
   * @return
   */
  private static final String TO_REMOVE_PREFIX = "remove--";
  private static Set<String> mergeListSetting(
      String settingsListName,
      JSONObject configs,
      JSONObject prefs) {
    Set<String> settings = new LinkedHashSet<>();
    Set<String> settingsToRemove = new HashSet<>();
    { // settings from config
      JSONArray s = (JSONArray) configs.get(settingsListName);
      if (s != null) {
        @SuppressWarnings("unchecked")
        Iterator<String> iterator = s.iterator();
        while (iterator.hasNext()) {
          settings.add(iterator.next());
        }
      }
    }
    { // settings from preference
      JSONArray s = (JSONArray) prefs.get(settingsListName);
      if (s != null) {
        @SuppressWarnings("unchecked")
        Iterator<String> iterator = s.iterator();
        while (iterator.hasNext()) {
          settings.add(iterator.next());
        }
      }
    }
    { // to-remove settings from preference
      JSONArray s = (JSONArray) prefs.get(TO_REMOVE_PREFIX + settingsListName);
      if (s != null) {
        @SuppressWarnings("unchecked")
        Iterator<String> iterator = s.iterator();
        while (iterator.hasNext()) {
          settingsToRemove.add(iterator.next());
        }
      }
    }
    settings.removeAll(settingsToRemove);
    return settings;
  }

  private void resetConfig() {
    final String configFileUrl = this.bkConfig.getConfigFileUrl();
    final String preferenceFileUrl = this.bkConfig.getPreferenceFileUrl();

    // TODO, assume the url is a file path for now.
    java.nio.file.Path configFile = Paths.get(configFileUrl);
    java.nio.file.Path preferenceFile = Paths.get(preferenceFileUrl);
    try {
      JSONParser parser = new JSONParser();
      JSONObject configJsonObject =
          (JSONObject) parser.parse(this.utils.readFile(configFile));
      JSONObject preferenceJsonObject =
          (JSONObject) parser.parse(this.utils.readFile(preferenceFile));

      String isAllowTracking = mergeBooleanSetting(
          "allow-anonymous-usage-tracking",
          configJsonObject,
          preferenceJsonObject);
      setAllowAnonymousTracking(isAllowTracking);

      String isUseAdvancedMode = mergeBooleanSetting(
          "advanced-mode",
          configJsonObject,
          preferenceJsonObject);
      setUseAdvancedMode(isUseAdvancedMode);

      this.initPlugins.addAll(
          mergeListSetting("init", configJsonObject, preferenceJsonObject));
      this.controlPanelMenuPlugins.addAll(
          mergeListSetting("control-panel-menu-plugins", configJsonObject, preferenceJsonObject));
      this.menuPlugins.addAll(
          mergeListSetting("notebook-app-menu-plugins", configJsonObject, preferenceJsonObject));
      this.cellMenuPlugins.addAll(
          mergeListSetting("notebook-cell-menu-plugins", configJsonObject, preferenceJsonObject));

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
    final String preferenceFileUrl = this.bkConfig.getPreferenceFileUrl();

    // TODO, assume the url is a file path for now.
    java.nio.file.Path preferenceFile = Paths.get(preferenceFileUrl);
    try {
      ObjectMapper om = new ObjectMapper();
      TypeReference readType = new TypeReference<HashMap<String, Object>>() {
      };
      Map<String, Object> prefs = om.readValue(preferenceFile.toFile(), readType);
      Boolean oldValue = (Boolean) prefs.get("allow-anonymous-usage-tracking");
      // If value changed, write it to the file too
      if ((this.isAllowAnonymousTracking == null && oldValue != null)
              || (this.isAllowAnonymousTracking != null && !(this.isAllowAnonymousTracking.equals(oldValue)))) {
        prefs.put("allow-anonymous-usage-tracking", this.isAllowAnonymousTracking);
        om.writerWithDefaultPrettyPrinter().writeValue(preferenceFile.toFile(), prefs);
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


  private Boolean isUseAdvancedMode = null;

  @POST
  @Path("setUseAdvancedMode")
  public void setUseAdvancedMode(
      @FormParam("advancedmode") String advancedMode) {

    if (advancedMode == null) {
      this.isUseAdvancedMode = null;
    } else if (advancedMode.equals("true")) {
      this.isUseAdvancedMode = Boolean.TRUE;
    } else if (advancedMode.equals("false")) {
      this.isUseAdvancedMode = Boolean.FALSE;
    } else {
      this.isUseAdvancedMode = null;
    }
    final String preferenceFileUrl = this.bkConfig.getPreferenceFileUrl();

    // TODO, assume the url is a file path for now.
    java.nio.file.Path preferenceFile = Paths.get(preferenceFileUrl);
    try {
      ObjectMapper om = new ObjectMapper();
      TypeReference readType = new TypeReference<HashMap<String, Object>>() {
      };
      Map<String, Object> prefs = om.readValue(preferenceFile.toFile(), readType);
      Boolean oldValue = (Boolean) prefs.get("advanced-mode");
      // If value changed, write it to the file too
      if ((this.isUseAdvancedMode == null && oldValue != null)
              || (this.isUseAdvancedMode != null && !(this.isUseAdvancedMode.equals(oldValue)))) {
        prefs.put("advanced-mode", this.isUseAdvancedMode);
        om.writerWithDefaultPrettyPrinter().writeValue(preferenceFile.toFile(), prefs);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @GET
  @Path("isUseAdvancedMode")
  public Boolean isUseAdvancedMode() {
    return this.isUseAdvancedMode;
  }

  /* Init Plugins */
  private final Set<String> initPlugins = new LinkedHashSet<>();

  @GET
  @Path("getInitPlugins")
  public Set<String> getInitPlugins() {
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
  private final Set<String> cellMenuPlugins = new LinkedHashSet<>();

  @POST
  @Path("addCellMenuPlugin")
  public void addCellMenuPlugin(String p) {
    this.cellMenuPlugins.add(p);
  }

  @GET
  @Path("getCellMenuPlugins")
  public Set<String> getCellMenuPlugins() {
    return this.cellMenuPlugins;
  }
}
