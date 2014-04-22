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

import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.IOException;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.entity.ContentType;
import org.apache.http.HttpVersion;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

/**
 * RESTful API for publishing to the web.
 */
@Path("publish")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class PublishRest {

  @Inject
  public PublishRest() {
  }

  @POST
  @Path("github")
  @Produces(MediaType.APPLICATION_JSON)
  public String notebook(@FormParam("json") String json, @FormParam("type") String type)
    throws IOException, ClientProtocolException
  {
    String files = "{\"Beaker Share\":{\"content\":\"" + JSONObject.escape(json) + "\"}}";
    String body = "{\"description\":\"Beaker Share\",\"public\":true,\"files\":" + files + "}\n";
    String response = Request.Post("https://api.github.com/gists")
      .useExpectContinue()
      .version(HttpVersion.HTTP_1_1)
      .bodyString(body, ContentType.DEFAULT_TEXT)
      .execute().returnContent().asString();
    JSONObject parsed = (JSONObject) JSONValue.parse(response);
    String githubUrl = (String) parsed.get("html_url");
    int slash = githubUrl.lastIndexOf("/");
    if (slash < 0) {
      System.err.println("no slash found in github url: " + githubUrl);
      return githubUrl;
    }
    return "http://sharing.beakernotebook.com/gist/anonymous" + githubUrl.substring(slash);
  }
}
