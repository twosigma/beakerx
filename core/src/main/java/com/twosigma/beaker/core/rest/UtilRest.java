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
import java.nio.file.Files;

import static java.lang.String.format;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * RESTful API for general utilities
 */
@Path("util")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class UtilRest {

  private static final Logger logger = LoggerFactory.getLogger(UtilRest.class.getName());

  private final BeakerConfig bkConfig;
  private final GeneralUtils utils;

  @Inject
  public UtilRest(BeakerConfig bkConfig, GeneralUtils generalUtils) {
    this.bkConfig = bkConfig;
    this.utils = generalUtils;
    resetConfig();
  }

  // Clients can spin on this until the backend's REST endpoints are ready 
  @GET
  @Path("ready")
  @Produces(MediaType.TEXT_PLAIN)
  public String ready() 
  {
    return "ok";
  }

  @GET
  @Path("whoami")
  @Produces(MediaType.TEXT_PLAIN)
  public String whoami(@Context HttpServletRequest request) {
    return "\"" + System.getProperty("user.name") + "\"";
  }

  @GET
  @Path("version")
  @Produces(MediaType.TEXT_PLAIN)
  public String version(@Context HttpServletRequest request) {
    return format("%s, %s, %s, %s",
        bkConfig.getVersion(),
        bkConfig.getHash(),
        System.getProperty("os.name"),
        bkConfig.getBuildTime());
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
      logger.warn("Warning, default notebook is empty");
      return "";
    }

    return clean(content);
  }


  @GET
  @Path("exit")
  public void exit() throws InterruptedException {
    System.exit(0);
  }


  /**
   * This function returns a Boolean setting as string. If the setting is null in the preference,
   * it will use the setting in the config, otherwise, what is set in preference is used.
   * @param settingName
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
   * This function returns a setting as a string. If the setting is null in the preference,
   * it will use the setting in the config, otherwise, what is set in preference is used.
   * @param settingName
   * @param configs
   * @param prefs
   * @return
   */
  private static String mergeStringSetting(
      String settingName,
      JSONObject configs,
      JSONObject prefs) {
        String sc = (String) configs.get(settingName);
        String sp = (String) prefs.get(settingName);
        String s = (sp != null) ? sp : sc;
        return s;
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
      setPreference("allow-anonymous-usage-tracking", isAllowTracking);

      String isUseAdvancedMode = mergeBooleanSetting(
          "advanced-mode",
          configJsonObject,
          preferenceJsonObject);
      setPreference("advanced-mode", isUseAdvancedMode);

      String mergedEditMode = mergeStringSetting(
          "edit-mode",
          configJsonObject,
          preferenceJsonObject);
      setPreference("edit-mode", mergedEditMode);

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
  private Boolean isUseAdvancedMode = null;
  private String editMode = "default";
  private String theme = "default";

  @GET
  @Path("getPreference")
  @Produces(MediaType.TEXT_PLAIN)
  public Object getPreference(
    @QueryParam("preference") String preferenceName) {
    final String preferenceFileUrl = this.bkConfig.getPreferenceFileUrl();

    java.nio.file.Path preferenceFile = Paths.get(preferenceFileUrl);

    try {
      JSONParser parser = new JSONParser();
      JSONObject preferenceJsonObject =
          (JSONObject) parser.parse(this.utils.readFile(preferenceFile));
      // Need to check config if not in preferences?
      Object preference = preferenceJsonObject.get(preferenceName); // Get returns null if not found
      return preference == null ? null : preference.toString();

    } catch (ParseException e) {
      throw new RuntimeException("failed getting beaker configurations from config file", e);
    }
  }

  @POST
  @Path("setPreference")
  public synchronized void setPreference(
    @FormParam("preferencename") String preferenceName,
    @FormParam("preferencevalue") String preferenceValue) {

    if ((preferenceName == null) || (preferenceValue == null))
      return;

    Object newValue = null;
    // Validate boolean preferences
    String[] booleanPrefs = {"advanced-mode", "allow-anonymous-usage-tracking", "fs-reverse"};
    if (Arrays.asList(booleanPrefs).contains(preferenceName)){
      switch (preferenceValue){
        case "true":
          newValue = Boolean.TRUE;
          break;
        case "false":
          newValue = Boolean.FALSE;
          break;
        default:
          return;
      }
      if (preferenceName.equals("advanced-mode"))
        this.isUseAdvancedMode = (Boolean) newValue;
      else if (preferenceName == "allow")
        this.isAllowAnonymousTracking = (Boolean) newValue;
    }
    // Validate edit mode
    else if (preferenceName.equals("edit-mode")){
      String[] validModes = {"vim", "emacs", "default", "sublime"};
      if (Arrays.asList(validModes).contains(preferenceValue)){
        newValue = preferenceValue;
        this.editMode = preferenceValue;
      }
    }
    // Validate edit mode
    else if (preferenceName.equals("fs-order-by")){
      String[] validModes = {"uri", "modified"};
      if (Arrays.asList(validModes).contains(preferenceValue)){
        newValue = preferenceValue;
      }
    }
    // Validate theme
    else if (preferenceName.equals("theme")){
      String[] validModes = {"default",
                             "3024-day",
                             "3024-night",
                             "ambiance",
                             "ambiance-mobile",
                             "base16-dark",
                             "base16-light",
                             "blackboard",
                             "cobalt",
                             "colorforth",
                             "eclipse",
                             "elegant",
                             "erlang-dark",
                             "lesser-dark",
                             "liquibyte",
                             "mbo",
                             "mdn-like",
                             "midnight",
                             "monokai",
                             "neat",
                             "neo",
                             "night",
                             "paraiso-dark",
                             "paraiso-light",
                             "pastel-on-dark",
                             "rubyblue",
                             "solarized",
                             "the-matrix",
                             "tomorrow-night-bright",
                             "tomorrow-night-eighties",
                             "twilight",
                             "vibrant-ink",
                             "xq-dark",
                             "xq-light",
                             "zenburn"};
      if (Arrays.asList(validModes).contains(preferenceValue)){
        newValue = preferenceValue;
        this.theme = preferenceValue;
      }
    }

    final String preferenceFileUrl = this.bkConfig.getPreferenceFileUrl();

    // TODO, assume the url is a file path for now.
    // System.out.println(preferenceFileUrl + " url!!!!\n");
    // Use a temporary for atomic writing
    java.nio.file.Path preferenceFileTmp = Paths.get(preferenceFileUrl + ".tmp");
    java.nio.file.Path preferenceFile = Paths.get(preferenceFileUrl);
    try {
      ObjectMapper om = new ObjectMapper();
      TypeReference readType = new TypeReference<HashMap<String, Object>>() {
      };
      Map<String, Object> prefs = om.readValue(preferenceFile.toFile(), readType);

      Object oldValue = (Object) prefs.get(preferenceName);
      // If value changed, write it to the file too
      if (!Objects.equals(newValue, oldValue)) {
        Files.deleteIfExists(preferenceFileTmp);
        prefs.put(preferenceName, newValue);
        om.writerWithDefaultPrettyPrinter().writeValue(preferenceFileTmp.toFile(), prefs);
        // Move tmp to normal
        Files.move(preferenceFileTmp, preferenceFile, REPLACE_EXISTING);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

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
  
  @GET
  @Path("getMainPage")
  @Produces(MediaType.TEXT_HTML)
  public String getMainPage(@Context HttpServletRequest request) {
    String data = utils.readFile(bkConfig.getMainPageFileName());
    String s = System.getenv("BAMBOO_PATH");
    if (s != null) {
      if (s.startsWith("/"))
        s = s.substring(1);
      if (s.endsWith("/"))
        s = s.substring(0, s.length()-1);
      data = data.replace("URL-HASH-TO-REPLACE", s);
    } else {
      data = data.replace("URL-HASH-TO-REPLACE", bkConfig.getHash());
    }
    return data;
  }

  @GET
  @Path("getPluginPrefs")
  @Produces(MediaType.APPLICATION_JSON)
  public Object getPluginPrefs() {
    return bkConfig.getPluginPrefs();
  }

  @POST
  @Path("setPluginPrefs")
  public void setPluginPrefs(JSONObject pluginPrefs) {
    // Merge pluginPrefs into prefs, and save the file, like the above methods do.
    bkConfig.setPluginPrefs(pluginPrefs);
  }

}
