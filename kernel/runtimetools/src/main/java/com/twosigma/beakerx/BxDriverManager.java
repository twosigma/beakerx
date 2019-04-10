/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class BxDriverManager {

  public static Connection getConnection(String url) throws SQLException {
    return DriverManager.getConnection(url);
  }

  public static Connection getConnection(String url, String user, String password) throws SQLException {
    return DriverManager.getConnection(url, user, password);
  }

  public static Connection getConnection(String url, java.util.Properties info) throws SQLException {
    return DriverManager.getConnection(url, info);
  }

  public static Driver getDriver(String url) throws SQLException {
    return DriverManager.getDriver(url);
  }

  public static java.util.Enumeration<Driver> getDrivers() {
    return DriverManager.getDrivers();
  }

  public static synchronized void registerDriver(java.sql.Driver driver) throws SQLException {
    DriverManager.registerDriver(driver);
  }

  public static synchronized void deregisterDriver(Driver driver) throws SQLException {
    DriverManager.deregisterDriver(driver);
  }

}
