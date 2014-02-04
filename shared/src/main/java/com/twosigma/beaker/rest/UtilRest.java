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

package com.twosigma.beaker.rest;

import com.google.inject.Singleton;
import com.twosigma.beaker.Platform;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
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

/**
 * RESTful API for general utilities
 * @author snguyen
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("util")
public class UtilRest
{
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
            if ((j = js.indexOf(tripleQuote, i + 1)) < 0)
                break;
            String pre = js.substring(0, i);
            String lines = js.substring(i + 3, j);
            String post = js.substring(j + 3);
            lines = lines.replaceAll("\n", "\\\\n");
            js = pre + "\"" + lines + "\"" + post;
        }
        return js;
    }

    private String readFile(String name) {
        File file = new File(name);
        try {
            FileInputStream fis = new FileInputStream(file);
            byte[] data = new byte[(int)file.length()];
            fis.read(data);
            fis.close();
            return new String(data, "UTF-8");
        } catch (FileNotFoundException e) {
            System.out.println("ERROR reading default notebook: " + e);
        } catch (IOException e) {
            System.out.println("ERROR reading default notebook: " + e);
        }
        return null;
    }

    private String _dotDir = null;
    public void setDotDir(String dirName) {
        _dotDir = dirName;
    };

    private String _defaultNotebook = null;
    public void setDefaultNotebook(String fileName) {
        _defaultNotebook = fileName;
    };

    @GET
    @Path("default")
    public String defaultNotebook() {
        String fileName;
        if (null == _defaultNotebook)
            fileName = _dotDir + "/default.bkr";
        else
            fileName = _defaultNotebook;
        String contents = readFile(fileName);
        if (null == contents) {
            String installDir = Platform.getBeakerCoreDirectory();
            String defaultDefault = installDir + "/config/default.bkr";
            contents = readFile(defaultDefault);
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

    private List<String> _initPlugins = new ArrayList<String>();
    public void addInitPlugin(String p) {
        _initPlugins.add(p);
    }
    @GET
    @Path("initplugins")
    public List<String> initPlugins() {
        return _initPlugins;
    }
    // return list of URLs of plugins (js) for the client to load on startup.

    private Set<String> _menuPlugins = new LinkedHashSet<String>();
    
    @POST
    @Path("addMenuPlugin")
    public void addMenuPlugin(
            @FormParam("url") String urlAsString) {
        _menuPlugins.add(urlAsString);
    }
    
    // return list of URLs of plugins (js) for the client to load on startup.
    @GET
    @Path("menuplugins")
    public Set<String> menuPlugins() {
        return _menuPlugins;
    }

    private Set<String> _controlPanelMenuPlugins = new LinkedHashSet<String>();
    @POST
    @Path("addControlMenuPlugin")
    public void addControlPanelMenuPlugin(
        @FormParam("url") String urlAsString) {
        _controlPanelMenuPlugins.add(urlAsString);
    }
    // return list of URLs of plugins (js) for the client to load on startup.
    @GET
    @Path("controlpanelmenuplugins")
    public Set<String> controlPanelMenuPlugins() {
        return _controlPanelMenuPlugins;
    }

    private List<String> _cellMenuPlugins = new ArrayList<String>();
    public void addCellMenuPlugin(String p) {
        _cellMenuPlugins.add(p);
    }
    // return list of URLs of plugins (js) for the client to load on startup.
    @GET
    @Path("cellmenuplugins")
    public List<String> cellMenuPlugins() {
        return _cellMenuPlugins;
    }
}
