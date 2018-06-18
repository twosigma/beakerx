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

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;
import org.apache.commons.codec.binary.Base64;

public class AutotranslationServiceImpl implements AutotranslationService {

  public static final String AUTHORIZATION = "Authorization";
  private final String contextAsString;
  private final AutotranslationContext context;

  public static AutotranslationService createAsSubkernel(String configuration) {
    return new AutotranslationServiceImpl(configuration);
  }

  public static AutotranslationService createAsMainKernel(String id) {
    Map<String, String> context = new HashMap<>();
    context.put("contextId", id);
    context.put("port", flaskServerPort());
    Gson gson = new Gson();
    String contextAsString = gson.toJson(context);
    return new AutotranslationServiceImpl(contextAsString);
  }

  private AutotranslationServiceImpl(String configuration) {
    Gson gson = new Gson();
    Map map = gson.fromJson(configuration, Map.class);
    String c = (String) map.get("contextId");
    String port = (String) map.get("port");
    AutotranslationContext context = new AutotranslationContext(c, port);
    this.context = context;
    this.contextAsString = configuration;
  }

  public String getContextAsString() {
    return contextAsString;
  }

  @Override
  public String update(String name, String json) {
    Form form = Form.form()
            .add("name", name)
            .add("json", json)
            .add("sessionId", this.context.getContextId());
    try {
      String reply = Request.Post("http://localhost:" + this.context.getPort() + "/autotransltion/")
              .addHeader(AUTHORIZATION, auth())
              .bodyForm(form.build())
              .execute().returnContent().asString();
      if (!reply.equals("ok")) {
        throw new RuntimeException(reply);
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return json;
  }

  private String auth() {
    String authString = getBasic_auth_username() + ":" + getBasic_auth_password();
    return "Basic " + Base64.encodeBase64String(authString.getBytes(StandardCharsets.UTF_8));
  }

  private static String getBasic_auth_username() {
    return System.getenv("BEAKERX_BASIC_AUTH_USERNAME");
  }

  private static String getBasic_auth_password() {
    return System.getenv("BEAKERX_BASIC_AUTH_PASSWORD");
  }

  private static String flaskServerPort() {
    return System.getenv("BEAKERX_FLASK_SERVER_PORT");
  }

  @Override
  public String get(String name) {
    String valueString = null;
    try {
      valueString = Request.Get("http://localhost:" + this.context.getPort() + "/autotransltion/" + this.context.getContextId() + "/" + name)
              .addHeader(AUTHORIZATION, auth())
              .execute()
              .returnContent()
              .asString();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return valueString;
  }

  @Override
  public String close() {
    return "ok";
  }

  private static class AutotranslationContext {
    private String contextId;
    private String port;

    AutotranslationContext(String contextId, String port) {
      this.contextId = contextId;
      this.port = port;
    }

    public String getContextId() {
      return contextId;
    }

    public String getPort() {
      return port;
    }
  }

}
