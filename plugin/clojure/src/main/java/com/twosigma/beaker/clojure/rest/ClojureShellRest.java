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
package com.twosigma.beaker.clojure.rest;

import com.google.inject.Singleton;
import com.google.inject.Inject;
import com.google.inject.Provider;

import com.twosigma.beaker.clojure.util.ClojureCollectionDeserializer;
import com.twosigma.beaker.clojure.util.ClojureMapDeserializer;
import com.twosigma.beaker.clojure.util.ClojureTableDeserializer;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.clojure.util.ClojureEvaluator;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("clojuresh")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class ClojureShellRest {

  private final Map<String, ClojureEvaluator> shells = new HashMap<>();

  @Inject
  public ClojureShellRest(Provider<BeakerObjectConverter> objectSerializerProvider) {
    objectSerializerProvider.get().addfTypeDeserializer(new ClojureCollectionDeserializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeDeserializer(new ClojureMapDeserializer(objectSerializerProvider.get()));
    objectSerializerProvider.get().addfTypeDeserializer(new ClojureTableDeserializer(objectSerializerProvider.get()));
  }

  @GET
  @Path("ready")
  @Produces(MediaType.TEXT_PLAIN)
  public String ready() {
    return "ok";
  }

  @POST
  @Path("getShell")
  @Produces(MediaType.TEXT_PLAIN)
  public String getShell(@FormParam("shellId") String shellId,
                         @FormParam("sessionId") String sessionId)
      throws InterruptedException, MalformedURLException {
    // if the shell does not already exist, create a new shell
    if (shellId.isEmpty() || !this.shells.containsKey(shellId)) {
      shellId = UUID.randomUUID().toString();
      ClojureEvaluator js = new ClojureEvaluator(shellId, sessionId);
      this.shells.put(shellId, js);
      return shellId;
    }
    return shellId;
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(@FormParam("shellId") String shellId,
                                         @FormParam("code") String code) throws InterruptedException {
    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    if (!this.shells.containsKey(shellId)) {
      obj.error("Cannot find shell");
      return obj;
    }
    try {
      this.shells.get(shellId).evaluate(obj, code);
    } catch (Exception e) {
      obj.error(e.toString());
      return obj;
    }
    return obj;
  }

  @POST
  @Path("exit")
  public void exit(@FormParam("shellId") String shellId) {
    if (!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).exit();
    this.shells.remove(shellId);
  }

  @POST
  @Path("cancelExecution")
  public void cancelExecution(@FormParam("shellId") String shellId) {
    if (!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).cancelExecution();
  }

  @POST
  @Path("killAllThreads")
  public void killAllThreads(@FormParam("shellId") String shellId) {
    if (!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).killAllThreads();
  }

  @POST
  @Path("resetEnvironment")
  public void resetEnvironment(@FormParam("shellId") String shellId) {
    if (!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).resetEnvironment();
  }

  @POST
  @Path("setShellOptions")
  public void setShellOptions(
      @FormParam("shellId") String shellId,
      @FormParam("classPath") String classPath,
      @FormParam("imports") String imports,
      @FormParam("outdir") String outDir,
      @FormParam("requirements") String requirements)
      throws MalformedURLException, IOException
  {
    if(!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).setShellOptions(classPath, imports, outDir, requirements);
  }

  @POST
  @Path("autocomplete")
  public List<String> autocomplete(
      @FormParam("shellId") String shellId,
      @FormParam("code") String code,
      @FormParam("caretPosition") int caretPosition) throws InterruptedException {
    if(!this.shells.containsKey(shellId)) {
      return null;
    }
    return this.shells.get(shellId).autocomplete(code, caretPosition);
  }
}
