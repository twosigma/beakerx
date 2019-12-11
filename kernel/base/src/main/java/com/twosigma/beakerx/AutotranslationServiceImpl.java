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

import com.google.gson.Gson;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.util.Preconditions.checkNotNull;

public class AutotranslationServiceImpl implements AutotranslationService {

  public static final String AUTHORIZATION = "Authorization";
  public static final String LOCALHOST = "http://localhost:";
  public static final String AUTOTRANSLTION = "/autotransltion/";
  public static final String BEAKERX = "beakerx";
  private final String contextAsString;
  private final AutotranslationContext context;

  public static AutotranslationService createAsSubkernel(String configuration) {
    return new AutotranslationServiceImpl(configuration);
  }

  public static AutotranslationService createAsMainKernel(String id) {
    Map<String, String> context = new HashMap<>();
    context.put("contextId", id);
    context.put("port", autotranslationPort());
    Gson gson = new Gson();
    String contextAsString = gson.toJson(context);
    return new AutotranslationServiceImpl(contextAsString);
  }

  private AutotranslationServiceImpl(String configuration) {
    Gson gson = new Gson();
    Map map = gson.fromJson(configuration, Map.class);
    String c = (String) map.get("contextId");
    String port = (String) map.get("port");
    this.context = new AutotranslationContext(c, port);
    this.contextAsString = configuration;
  }

  public String getContextAsString() {
    return contextAsString;
  }

  @Override
  public String update(String name, String json) {
    checkNotNull(name, "'name' attribute can not be null.");
    checkNotNull(json, "'json' attribute can not be null.");
    try {
      String reply = Request.Post(LOCALHOST + this.context.getPort() + AUTOTRANSLTION)
              .addHeader(AUTHORIZATION, auth())
              .bodyString(createBody(name, json), ContentType.APPLICATION_JSON)
              .execute().returnContent().asString();
      if (!reply.equals("ok")) {
        throw new RuntimeException(reply);
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return json;
  }

  @Override
  public String get(String name) {
    String valueString = "";
    try {
      valueString = Request
              .Get(LOCALHOST + this.context.getPort() + AUTOTRANSLTION + this.context.getContextId() + "/" + name)
              .addHeader(AUTHORIZATION, auth())
              .execute()
              .returnContent()
              .asString();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return valueString;
  }

  private String createBody(String name, String json) {
    Map<String, String> context = new HashMap<>();
    context.put("name", name);
    context.put("json", json);
    context.put("sessionId", this.context.getContextId());
    Gson gson = new Gson();
    return gson.toJson(context);
  }

  private String auth() {
    String authString = getBasic_auth_username() + ":" + getBasic_auth_password();
    return "Basic " + Base64.encodeBase64String(authString.getBytes(StandardCharsets.UTF_8));
  }

  private static String getBasic_auth_username() {
    return BEAKERX;
  }

  private static String getBasic_auth_password() {
    return System.getenv("BEAKERX_AUTOTRANSLATION_PASSWORD");
  }

  private static String autotranslationPort() {
    return System.getenv("BEAKERX_AUTOTRANSLATION_PORT");
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
