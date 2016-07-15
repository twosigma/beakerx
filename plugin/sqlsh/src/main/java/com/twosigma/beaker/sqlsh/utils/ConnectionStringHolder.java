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

package com.twosigma.beaker.sqlsh.utils;

import java.nio.charset.StandardCharsets;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;

public class ConnectionStringHolder {

  public static final String USER_CONNECTION_KEY = "user";
  public static final String PASSWORD_CONNECTION_KEY = "password";
  public static final String KEY_FOR_DISPLAY_INPUT_DIALOG = "<prompt>";
  public static final char EQUAL_SIGN = '=';
  public static final char QUESTION_SIGN = '?';
  public static final char AND_SIGN = '&';

  private String connectionString;
  private String user;
  private String password;
  private boolean showDialog;

  public ConnectionStringHolder(String connectionString) {
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

  public void setConnectionString(String connectionString) {
    int beginIndex = connectionString.indexOf(QUESTION_SIGN);
    if (beginIndex > -1) {
      this.connectionString = connectionString.substring(0, beginIndex);
    } else {
      this.connectionString = connectionString;
    }

    String user = getProperty(USER_CONNECTION_KEY, connectionString);
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
  
  protected static String getProperty(String property, String connectionString) {
    String ret = null;
    if (property != null && !property.isEmpty() && connectionString != null && !connectionString.isEmpty()) {
      for (NameValuePair param : URLEncodedUtils.parse(connectionString, StandardCharsets.UTF_8, QUESTION_SIGN, AND_SIGN)) {
        if(property.equals(param.getName())){
          ret = param.getValue();
          break;
        }
      }
    }
    return ret;
  }

  protected String getConnectionStringWithUserPassword() {
    String ret = connectionString;
    boolean firstOption = true;
    if (this.user != null && !this.user.isEmpty()) {
      ret += firstOption ? QUESTION_SIGN : AND_SIGN;
      firstOption = false;
      ret += USER_CONNECTION_KEY + EQUAL_SIGN + this.user;
    }
    if (this.password != null && !this.password.isEmpty()) {
      ret += firstOption ? QUESTION_SIGN : AND_SIGN;
      firstOption = false;
      ret += PASSWORD_CONNECTION_KEY + EQUAL_SIGN + this.password;
    }
    return ret;
  }

}