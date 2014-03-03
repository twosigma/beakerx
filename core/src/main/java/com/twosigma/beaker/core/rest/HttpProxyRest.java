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
package com.twosigma.beaker.core.rest;

import com.google.inject.Singleton;
import com.twosigma.beaker.shared.json.serializer.StringObject;

import java.io.*;
import java.net.URL;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * RESTful API for http proxy
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("httpProxy")
public class HttpProxyRest {

  @GET
  @Path("load")
  public StringObject load(
          @QueryParam("url") String urlString) throws IOException {
    //urlString = "https://raw.github.com/ethanwhite/progbio/master/ipynbs/ipython-notebook.ipynb";
    URL url = new URL(urlString);
    BufferedReader in = new BufferedReader(
            new InputStreamReader(url.openStream()));

    StringBuilder fullText = new StringBuilder();
    String inputLine;
    while ((inputLine = in.readLine()) != null) {
      fullText.append(inputLine);
      fullText.append("\n");
    }
    in.close();
    return new StringObject(fullText.toString());
  }
}
