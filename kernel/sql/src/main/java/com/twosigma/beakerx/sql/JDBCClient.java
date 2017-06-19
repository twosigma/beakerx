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

package com.twosigma.beakerx.sql;

import org.apache.commons.dbcp2.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Paths;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ServiceLoader;
import java.util.Set;

public class JDBCClient {

  private final static Logger logger = LoggerFactory.getLogger(JDBCClient.class.getName());

  private Map<String, BasicDataSource> dsMap = new HashMap<>();
  private Set<Driver> drivers = new HashSet<>();

  public JDBCClient() {
    loadDrivers(null);
  }

  public BasicDataSource getDataSource(String uri) throws DBConnectionException {
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
        //Logger.getLogger(JDBCClient.class.getName()).log(Level.SEVERE, null, e);
        throw new DBConnectionException(uri, e);
      }
    }
  }

  public void loadDrivers(List<String> pathList) {
    synchronized (this) {

      dsMap = new HashMap<>();
      drivers = new HashSet<>();

      Set<URL> urlSet = new HashSet<>();

      String dbDriverString = System.getenv("BEAKER_JDBC_DRIVER_LIST");
      if (dbDriverString != null && !dbDriverString.isEmpty()) {
        String[] dbDriverList = dbDriverString.split(File.pathSeparator);
        for (String s : dbDriverList) {
          try {
            urlSet.add(toURL(s));
          } catch (MalformedURLException e) {
            logger.error(e.getMessage());
          }
        }
      }

      if (pathList != null) {
        for (String path : pathList) {
          path = path.trim();
          if (path.startsWith("--") || path.startsWith("#")) {
            continue;
          }
          try {
            urlSet.add(toURL(path));
          } catch (MalformedURLException e) {
            logger.error(e.getMessage());
          }
        }
      }

      URLClassLoader loader = new URLClassLoader(urlSet.toArray(new URL[urlSet.size()]));

      ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class, loader);
      Iterator<Driver> driversIterator = loadedDrivers.iterator();
      try {
        while (driversIterator.hasNext()) {
          Driver d = driversIterator.next();
          drivers.add(d);
        }
      } catch (Throwable t) {
        logger.error(t.getMessage());
      }
    }
  }

  private URL toURL(String s) throws MalformedURLException {

    s = s.trim();
    URL url = null;
    if (!s.startsWith("jar:") && !s.startsWith("http:") && !s.startsWith("https:")) {
      try {
        url = Paths.get(s).toUri().toURL();
      } catch (Exception e) {
        logger.error(e.getMessage());
      }

    }
    if (url == null) {
      url = new URL(s);
    }

    return url;

  }
}
