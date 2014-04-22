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

package com.twosigma.beaker.core.module;

import org.eclipse.jetty.servlet.DefaultServlet;

/**
 * StaticResourceServlet
 *
 */
public class StaticResourceServlet extends DefaultServlet {
  private final String resourceBase;

  StaticResourceServlet(String resourceBase) {
    this.resourceBase = resourceBase;
  }

  @Override
  public String getInitParameter(String name) {
    String val = null;
    if ("resourceBase".equals(name)) {
      val = this.resourceBase;
    } else if ("pathInfoOnly".equals(name)) {
      val = "true";
    } else if ("dirAllowed".equals(name)) {
      val = "false";
    } else {
      val = super.getInitParameter(name);
    }
    return val;
  }

}
