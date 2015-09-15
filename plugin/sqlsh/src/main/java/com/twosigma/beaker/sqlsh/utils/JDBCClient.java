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

package com.twosigma.beaker.sqlsh.utils;

import javax.sql.DataSource;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.dbcp2.BasicDataSource;

public class JDBCClient {

    private  Map<String, BasicDataSource> dsMap = new HashMap<>();
    private  List<Driver> drivers = new ArrayList<>();

    public DataSource getDataSource(String uri) throws DBConnectionException {
        synchronized (this) {
            try {

                BasicDataSource ds = dsMap.get(uri);
                if (ds == null) {
                    Driver driver = null;
                    for (Driver test : drivers) {
                        if (test.acceptsURL(uri)) {
                            driver = test;
                            break;
                        }
                    }
                    if (driver == null) {
                        DriverManager.getDriver(uri);
                    }
                    ds = new BasicDataSource();
                    ds.setDriver(driver);
                    ds.setUrl(uri);
                    dsMap.put(uri, ds);
                }
                return ds;

            } catch (SQLException e) {
                Logger.getLogger(JDBCClient.class.getName()).log(Level.SEVERE, null, e);
                throw new DBConnectionException(uri, e);
            }
        }
    }

    public void loadDrivers(List<String> pathList) {
        synchronized (this) {
            if (pathList == null) return;
            dsMap = new HashMap<>();
            drivers = new ArrayList<>();

            List<URL> urlList = new ArrayList<>();
            for (String url : pathList) {
                url = url.trim();
                if(url.startsWith("--") || url.startsWith("#")) {
                    continue;
                }
                try {
                    if(!url.startsWith("jar:")) {
                        urlList.add(Paths.get(url).toUri().toURL());
                    } else {
                        urlList.add(new URL(url));
                    }
                } catch (MalformedURLException e) {
                    Logger.getLogger(JDBCClient.class.getName()).log(Level.SEVERE, null, e);
                }
            }

            URLClassLoader loader = new URLClassLoader(urlList.toArray(new URL[urlList.size()]));

            ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class, loader);
            Iterator<Driver> driversIterator = loadedDrivers.iterator();
            try {
                while (driversIterator.hasNext()) {
                    Driver d = driversIterator.next();
                    drivers.add(d);
                }
            } catch (Throwable t) {
                Logger.getLogger(JDBCClient.class.getName()).log(Level.SEVERE, null, t);
            }
        }
    }
}
