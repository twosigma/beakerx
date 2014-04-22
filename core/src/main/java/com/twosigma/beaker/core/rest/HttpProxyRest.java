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
package com.twosigma.beaker.core.rest;

import com.google.inject.Singleton;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.net.URL;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * RESTful API for http proxy
 */

@Path("http-proxy")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class HttpProxyRest {

  @GET
  @Path("load")
  @Produces(MediaType.TEXT_PLAIN)
  public String load(@QueryParam("url") String urlString) throws IOException {
    //urlString = "https://raw.github.com/ethanwhite/progbio/master/ipynbs/ipython-notebook.ipynb";
    URL url = new URL(urlString);
    StringBuilder fullText;
    try (BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()))) {
      fullText = new StringBuilder();
      String inputLine;
      while ((inputLine = in.readLine()) != null) {
        fullText.append(inputLine);
        fullText.append("\n");
      }
    }
    return fullText.toString();
  }
}
