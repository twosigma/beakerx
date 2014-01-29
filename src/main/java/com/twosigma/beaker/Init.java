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
package com.twosigma.beaker;

import com.google.inject.Injector;
import com.twosigma.beaker.rest.StartProcessRest;
import com.twosigma.beaker.rest.UtilRest;
import java.awt.Desktop;
import java.io.IOException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.ServerSocket;
import java.util.Iterator;
import org.apache.commons.io.FileUtils;
import org.eclipse.jetty.server.Server;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


/**
 * The actual implementation of initialization operations to be performed in the main function
 */
public class Init {

    static Injector injector;
    static int portBase;
    static String portBaseString;

    private static boolean portAvailable(int port) {

        ServerSocket ss = null;
        try {
            ss = new ServerSocket(port);
            ss.setReuseAddress(true);
            return true;
        } catch (IOException e) {
        } finally {
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

    private static boolean portRangeAvailable(int port, int width) {
        for (int p = port; p < port + width; p++) {
            if (!portAvailable(p)) {
                return false;
            }
        }
        return true;
    }

    static int findPortBase() {
        int width = 10; // currently we use 6
        int tries = 0;
        int base = Platform.getBeakerPortBase();
        while (!portRangeAvailable(base, width)) {
            System.out.println("Port range " + base + "-" + (base + width - 1) + " taken, searching...");
            base += width * (int) (1 + Math.random() * 100);
            if (tries++ > 10) {
                System.err.println("can't find open port.");
                System.exit(1);
            }
        }
        return base;
    }

    static void init() {

        // Hack to prevent jersey from trying to contact the prod US
        // jms server. This is set in ts/messagingjms properties.
        // See BEAKER-402.
        System.clearProperty("java.naming.provider.url");

        portBaseString = Integer.toString(portBase);

        Platform.setInjector(injector);

        final StartProcessRest processStarter = injector.getInstance(StartProcessRest.class);
        final UtilRest utilRest = injector.getInstance(UtilRest.class);
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                System.out.println("\nshutting down beaker");
                processStarter.shutdownPlugins();
                System.out.println("done, exiting");
            }
        });
        String dotDir = System.getProperty("user.home") + "/.beaker";

        File dotFile = new File(dotDir);
        if (!dotFile.exists()) {
            if (!dotFile.mkdir()) {
                System.out.println("failed to create " + dotDir);
            }
        }
        processStarter.setDotDir(dotDir);
        utilRest.setDotDir(dotDir);

        try{
            JSONParser parser = new JSONParser();
            File menuConfigFile = new File("./config/menu.json");
            Object obj = parser.parse(new FileReader(menuConfigFile));
            JSONObject jsonObject =  (JSONObject) obj;
            {
                JSONArray menus = (JSONArray) jsonObject.get("bkApp");
                @SuppressWarnings("unchecked")
                Iterator<String> iterator = menus.iterator();
                while (iterator.hasNext()) {
                    utilRest.addMenuPlugin(iterator.next());
                }
            }
            {
                JSONArray menus = (JSONArray) jsonObject.get("bkControl");
                @SuppressWarnings("unchecked")
                Iterator<String> iterator = menus.iterator();
                while (iterator.hasNext()) {
                    utilRest.addControlPanelMenuPlugin(iterator.next());
                }
            }

        } catch (FileNotFoundException e) {
            throw new RuntimeException("failed getting menu plugins from config file", e);
        } catch (IOException e) {
            throw new RuntimeException("failed getting menu plugins from config file", e);
        } catch (ParseException e) {
            throw new RuntimeException("failed getting menu plugins from config file", e);
        }
    }

    static void run(String[] args) throws
            InterruptedException,
            Exception
    {

        final StartProcessRest processStarter = injector.getInstance(StartProcessRest.class);
        final UtilRest utilRest = injector.getInstance(UtilRest.class);

        Boolean useKerberos = Platform.getKerberosDefault();
        Boolean useHttps = false;
        Boolean openBrowser=true;
        // XXX use some library for parsing args.
        for (int i = 0; i < args.length; i++) {
            if (args[i].equals("--disable-kerberos")) {
                useKerberos = false;
            } else if (args[i].equals("--default-notebook")) {
                if (i < (args.length - 1)) {
                    utilRest.setDefaultNotebook(args[i + 1]);
                    i++;
                } else {
                    System.err.println("missing argument to --default-notebook, ignoring it");
                }
            } else if (args[i].equals("--plugin-option")) {
                if (i < (args.length - 1)) {
                    String param = args[i + 1];
                    int x = param.indexOf(':');
                    if (x < 0) {
                        continue;
                    }
                    processStarter.addArg(param.substring(0, x),
                            param.substring(x + 1, param.length()));
                    i++;
                } else {
                    System.err.println("missing argument to --plugin-option, ignoring it");
                }
            } else if (args[i].equals("--do-not-open-browser")) {
                openBrowser=false;
            } else {
                System.err.println("ignoring unrecognized command line option: " + args[i]);
            }
        }

        processStarter.startReverseProxy(portBase, useKerberos);

        Server server = injector.getInstance(Server.class);
        server.start();

        String localhostname = java.net.InetAddress.getLocalHost().getHostName();
        // right now kerberos or https can be used but not both.
        System.out.println("");
        String url;
        if (useHttps) {
            url = "https://" + localhostname + ":" + portBaseString + "/beaker/";
        } else {
            url = "http://" + (useKerberos ? (System.getProperty("user.name") + ".") : "")
                    + localhostname + ":" + (portBase + 1) + "/beaker/";
        }
        System.out.println("Connect to " + url);
        System.out.println("");
        if (openBrowser) {
            Desktop.getDesktop().browse(java.net.URI.create(url));
        }
    }
}
