/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;

import java.nio.charset.StandardCharsets;
import java.sql.Driver;
import java.sql.DriverPropertyInfo;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionStringHolder {

  public static final String USER_CONNECTION_KEY = "user";
  public static final String PASSWORD_CONNECTION_KEY = "password";
  public static final String KEY_FOR_DISPLAY_INPUT_DIALOG = "<prompt>";
  public static final char EQUAL_SIGN = '=';
  
  public static final char [] SEPARATORS = new char[]{'?', '&', ';' , '/' , '\\'};

  private JDBCClient jdbcClient;
  private String connectionString;
  private String user;
  private String password;
  private boolean showDialog;

  public ConnectionStringHolder(String connectionString, JDBCClient jdbcClient) {
    this.jdbcClient = jdbcClient;
    setConnectionString(connectionString);
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public boolean isShowDialog() {
    return showDialog;
  }

  public void setShowDialog(boolean showDialog) {
    this.showDialog = showDialog;
  }

  public String getConnectionString() {
    return connectionString;
  }
  
  public String getActualConnectionString() {
    return removeParameter(connectionString, USER_CONNECTION_KEY, PASSWORD_CONNECTION_KEY);
  }

  public void setConnectionString(String connectionString) {
    
    this.connectionString = connectionString;
    
    if(connectionString != null && !connectionString.isEmpty()){
      
      BasicDataSource ds = null;
      String user = null;
      try {
        ds = jdbcClient.getDataSource(connectionString);
      } catch (SQLException e) {}

      if(ds!= null){
        user = getProperty(USER_CONNECTION_KEY, connectionString, ds.getDriver());
      }
      if(user == null){
        user = getProperty(USER_CONNECTION_KEY, connectionString);
      }
       
      if (user != null) {
        if (KEY_FOR_DISPLAY_INPUT_DIALOG.equals(user)) {
          showDialog = true;
        } else {
          this.user = user;
        }

        String password = getProperty(PASSWORD_CONNECTION_KEY, connectionString);
        if (password != null) {
          if (KEY_FOR_DISPLAY_INPUT_DIALOG.equals(password)) {
            showDialog = true;
          } else {
            this.password = password;
          }
        } else {
          showDialog = true;
        }
      }
      
    }
  }

  protected static String getProperty(String property, String connectionString, Driver dbDriver){
    String ret = null;
    if(property != null && !property.isEmpty() && dbDriver != null && connectionString != null && !connectionString.isEmpty()){
      try {
        for (DriverPropertyInfo dpi : dbDriver.getPropertyInfo(connectionString, new Properties())) {
          if(property.equalsIgnoreCase(dpi.name.trim())){
            ret = dpi.value;
            break;
          }
        }
      } catch (SQLException e) {}
    }
    return ret;
  }
  
  /**
   * MSSQL driver do not return password, so we need to parse it manually
   * @param property
   * @param connectionString
   * @return
   */
  protected static String getProperty(String property, String connectionString) {
    String ret = null;
    if (property != null && !property.isEmpty() && connectionString != null && !connectionString.isEmpty()) {
      for (NameValuePair param : URLEncodedUtils.parse(connectionString, StandardCharsets.UTF_8, SEPARATORS)) {
        if(property.equals(param.getName())){
          ret = param.getValue();
          break;
        }
      }
    }
    return ret;
  }
  
  protected static String removeParameter(String connectionString, String ... parameters) {
    String ret = connectionString;
    for (String parameter : parameters) {
      int index = ret.indexOf(parameter + EQUAL_SIGN);
      if(index > -1){
        int parameterEnd = ret.length();
        for (char c : SEPARATORS) {
          int temp = ret.indexOf(c, index);
          if(temp > -1){
            parameterEnd = Math.min(temp, parameterEnd);
          }
        }
        String toRet = ret.substring(0, index);
        toRet += ret.substring(parameterEnd, ret.length());
        ret = toRet;
      }
    }
    return ret;
  }
  
}