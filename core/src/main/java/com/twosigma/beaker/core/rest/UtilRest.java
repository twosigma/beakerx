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

import com.google.inject.Singleton;
import com.twosigma.beaker.shared.Platform;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
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
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("util")
public class UtilRest {

  public UtilRest() {
  }

  @GET
  @Path("whoami")
  public String whoami(@Context HttpServletRequest request) {
    return "\"" + System.getProperty("user.name") + "\"";
  }

  @GET
  @Path("allStackTraces")
  public List<Map<String, Object>> getAllStackTraces() {
    List<Map<String, Object>> out = new ArrayList<Map<String, Object>>();
    Map<Thread, StackTraceElement[]> allStackTraces = Thread.getAllStackTraces();

    for (Thread t : allStackTraces.keySet()) {
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("thread", t);
      map.put("stackTraces", allStackTraces.get(t));
      out.add(map);
    }

    return out;
  }

  private String clean(String js) {
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

  private String readFile(File file) {
    try {
      FileInputStream fis = new FileInputStream(file);
      byte[] data = new byte[(int) file.length()];
      fis.read(data);
      fis.close();
      return new String(data, "UTF-8");
    } catch (FileNotFoundException e) {
      System.out.println("ERROR reading file" + file.getName() + ": " + e);
    } catch (IOException e) {
      System.out.println("ERROR reading file" + file.getName() + ": " + e);
    }
    return null;
  }
  private String _dotDir = null;

  public void setDotDir(String dirName) {
    _dotDir = dirName;
  }
  ;

    private String _defaultNotebook = null;

  public void setDefaultNotebook(String fileName) {
    _defaultNotebook = fileName;
  }

  ;

    @GET
  @Path("default")
  public String defaultNotebook() {
    String fileName;
    if (null == _defaultNotebook) {
      fileName = _dotDir + "/default.bkr";
    } else {
      fileName = _defaultNotebook;
    }
    String contents = readFile(new File(fileName));
    if (null == contents) {
      String installDir = Platform.getBeakerCoreDirectory();
      String defaultDefault = installDir + "/config/default.bkr";
      contents = readFile(new File(defaultDefault));
      if (null == contents) {
        System.out.println("Double bogey, delivering empty string to client.");
        contents = "";
      } else {
        try {
          PrintWriter out = new PrintWriter(fileName);
          out.print(contents);
          out.close();
        } catch (FileNotFoundException e) {
          System.out.println("ERROR writing default default, " + e);
        }
      }
    }
    return clean(contents);
  }

  public void resetConfig() {
    File configFile = new File(_dotDir, "beaker.conf.json");
    if (!configFile.exists()) {
      try {
        PrintWriter out = new PrintWriter(configFile);
        out.print(readFile(new File(Platform.getBeakerCoreDirectory(), "/config/beaker.conf.json")));
        out.close();
      } catch (FileNotFoundException e) {
        System.out.println("ERROR writing default default, " + e);
      }
    }
    try {
      JSONParser parser = new JSONParser();
      Object obj = parser.parse(readFile(configFile));

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
  private Boolean _isAllowAnonymousTracking = null;

  @POST
  @Path("setAllowAnonymousTracking")
  public void setAllowAnonymousTracking(
          @FormParam("allow") String allow) {

    if (allow == null) {
      _isAllowAnonymousTracking = null;
    } else if (allow.equals("true")) {
      _isAllowAnonymousTracking = Boolean.TRUE;
    } else if (allow.equals("false")) {
      _isAllowAnonymousTracking = Boolean.FALSE;
    } else {
      _isAllowAnonymousTracking = null;
    }

    File configFile = new File(_dotDir, "beaker.conf.json");
    try {
      ObjectMapper om = new ObjectMapper();
      TypeReference readType = new TypeReference<HashMap<String, Object>>() {
      };
      Map<String, Object> configs = om.readValue(configFile, readType);
      Boolean oldValue = (Boolean) configs.get("allow-anonymous-usage-tracking");
      // If value changed, write it to the file too
      if ((_isAllowAnonymousTracking == null && oldValue != null)
              || (_isAllowAnonymousTracking != null && !(_isAllowAnonymousTracking.equals(oldValue)))) {
        configs.put("allow-anonymous-usage-tracking", _isAllowAnonymousTracking);
        om.writerWithDefaultPrettyPrinter().writeValue(configFile, configs);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @GET
  @Path("isAllowAnonymousTracking")
  public Boolean isAllowAnonymousTracking() {
    return _isAllowAnonymousTracking;
  }

  /* Init Plugins */
  private List<String> _initPlugins = new ArrayList<String>();

  public void addInitPlugin(String p) {
    _initPlugins.add(p);
  }

  @GET
  @Path("initplugins")
  public List<String> initPlugins() {
    return _initPlugins;
  }

  /* bkApp Menu Plugins */
  private Set<String> _menuPlugins = new LinkedHashSet<String>();

  @POST
  @Path("addMenuPlugin")
  public void addMenuPlugin(
          @FormParam("url") String urlAsString) {
    _menuPlugins.add(urlAsString);
  }

  @GET
  @Path("menuplugins")
  public Set<String> menuPlugins() {
    return _menuPlugins;
  }

  /* bkControl Menu Plugins */
  private Set<String> _controlPanelMenuPlugins = new LinkedHashSet<String>();

  @POST
  @Path("addControlMenuPlugin")
  public void addControlPanelMenuPlugin(
          @FormParam("url") String urlAsString) {
    _controlPanelMenuPlugins.add(urlAsString);
  }

  @GET
  @Path("controlpanelmenuplugins")
  public Set<String> controlPanelMenuPlugins() {
    return _controlPanelMenuPlugins;
  }

  /* bkCell Menu Plugins */
  private List<String> _cellMenuPlugins = new ArrayList<String>();

  @POST
  @Path("addCellMenuPlugin")
  public void addCellMenuPlugin(String p) {
    _cellMenuPlugins.add(p);
  }

  @GET
  @Path("cellmenuplugins")
  public List<String> cellMenuPlugins() {
    return _cellMenuPlugins;
  }
}
