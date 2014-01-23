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

/**
 * This is the point of contact for retrieving global settings in code.
 *
 * @author alee
 */
public class Global {
    private static Injector _injector;

    private Global() {

    }
    public static void setInjector(Injector ij) {
        _injector = ij;
    }
    public static Injector getInjector() {
        return _injector;
    }
    public static String getUser() {
        return System.getProperty("user.name");
    }
    public static String getBeakerCoreDirectory() {
        return System.getProperty("user.dir");
    }
    public static String getStaticDir() {
        return getBeakerCoreDirectory() + "/src/main/web";
    }
    public static String getConfigDir() {
        return getBeakerCoreDirectory() + "/config";
    }
    public static String getNginxPath() {
        return "";
    }
    public static boolean getDisablePluginsLaunching() {
        return !System.getProperty("twosigma.beaker.rest.startprocess.disablePluginLaunching", "false").equals("false");
    }
    public static int getBeakerPortBase() {
        return 8800;
    }
}
