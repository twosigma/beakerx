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

import com.twosigma.beaker.core.module.config.BeakerConfig;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.IOException;
import javax.ws.rs.FormParam;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.http.HttpStatus;
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

  private final String gistUrl;
  private final String sharingUrl;
  
  @Inject
  public PublishRest(BeakerConfig bkConfig) {
    this.gistUrl = bkConfig.getGistServerUrl();
    this.sharingUrl = bkConfig.getSharingServerUrl();
  }

  @POST
  @Path("github")
  @Produces(MediaType.APPLICATION_JSON)
  public String notebook(@FormParam("json") String json, @FormParam("type") String type)
    throws IOException, ClientProtocolException
  {
    String files = "{\"Beaker Share\":{\"content\":\"" + JSONObject.escape(json) + "\"}}";
    String body = "{\"description\":\"Beaker Share\",\"public\":true,\"files\":" + files + "}\n";
    String response = null;
    try {
      response = Request.Post(this.gistUrl)
      .useExpectContinue()
      .version(HttpVersion.HTTP_1_1)
      .bodyString(body, ContentType.APPLICATION_JSON)
      .execute().returnContent().asString();
    } catch (Throwable t) {
      throw new GistPublishException(ExceptionUtils.getStackTrace(t));
    }
    JSONObject parsed = (JSONObject) JSONValue.parse(response);
    String githubUrl = (String) parsed.get("html_url");
    int slash = githubUrl.lastIndexOf("/");
    if (slash < 0) {
      System.err.println("no slash found in github url: " + githubUrl);
      return githubUrl;
    }
    return this.sharingUrl + githubUrl.substring(slash);
  }

  private static class GistPublishException extends WebApplicationException {
    public GistPublishException(String stackTrace) {
      super(Response.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
          .entity("<h1>Gist publish failed</h1><pre>" + stackTrace + "</pre>")
          .type("text/plain")
          .build());
    }
  }
}
