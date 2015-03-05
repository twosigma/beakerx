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
package com.twosigma.beaker.r.rest;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.twosigma.beaker.jvm.object.BasicObjectSerializer;
import com.twosigma.beaker.jvm.object.BeakerObjectConverter;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.r.utils.RServerEvaluator;

/**
 * Glue between the REST calls from the R plugin to the Rserve module that manages the R process.
 */
@Path("rsh")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class RShellRest {

  private int corePort = -1;
  private final Map<String, RServerEvaluator> shells = new HashMap<>();
  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  private final static Logger logger = Logger.getLogger(RShellRest.class.getName());
      
  @Inject
  public RShellRest(Provider<BeakerObjectConverter> osp) {
    logger.fine("created");
    objectSerializerProvider = osp;
    objectSerializerProvider.get().addTypeConversion("org.rosuda.REngine.REXPFactor", BasicObjectSerializer.TYPE_SELECT);
    objectSerializerProvider.get().addTypeConversion("org.rosuda.REngine.REXPInteger", BasicObjectSerializer.TYPE_INTEGER);
    objectSerializerProvider.get().addTypeConversion("org.rosuda.REngine.REXPDouble", BasicObjectSerializer.TYPE_DOUBLE);
    objectSerializerProvider.get().addTypeConversion("org.rosuda.REngine.REXPLogical", BasicObjectSerializer.TYPE_BOOLEAN);
    objectSerializerProvider.get().addTypeConversion("org.rosuda.REngine.REXPString", BasicObjectSerializer.TYPE_STRING);
  }

  // set the port used for communication with the Core server
  public void setCorePort(int c) throws IOException
  {
    logger.fine("core port = "+c);
    corePort = c;
  }

  @POST
  @Path("getShell")
  @Produces(MediaType.TEXT_PLAIN)
  public String getShell(@FormParam("shellid") String shellId,
      @FormParam("sessionId") String sessionId) 
          throws InterruptedException, MalformedURLException
  {
    logger.fine("shellid="+shellId+" sessionId="+sessionId);

    // if the shell does not already exist, create a new shell
    if (shellId.isEmpty() || !this.shells.containsKey(shellId)) {
      shellId = UUID.randomUUID().toString();
      RServerEvaluator js = new RServerEvaluator(shellId, sessionId, corePort, objectSerializerProvider.get());
      this.shells.put(shellId, js);
      return shellId;
    }
    return shellId;
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(@FormParam("shellID") String shellId,
      @FormParam("code") String code) throws InterruptedException {
    logger.fine("shellID="+shellId+" code='"+code+"'");
    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    if(!this.shells.containsKey(shellId)) {
      logger.severe("cannot find shell... this should never happen");
      obj.error("Cannot find shell");
      return obj;
    }
    try {
      this.shells.get(shellId).evaluate(obj, code);
    } catch (Exception e) {
      logger.log(Level.SEVERE, "evaluate throw an exception ... this should never happen", e);
      obj.error(e.toString());
      return obj;
    }
    return obj;
  }

  @POST
  @Path("autocomplete")
  public List<String> autocomplete(
      @FormParam("shellID") String shellId,
      @FormParam("code") String code,
      @FormParam("caretPosition") int caretPosition) throws InterruptedException {
    logger.fine("shellID="+shellId+" code='"+code+"' pos="+caretPosition);

    if(!this.shells.containsKey(shellId)) {
      logger.severe("cannot find shell... this should never happen");
      return null;
    }
    return this.shells.get(shellId).autocomplete(code, caretPosition);
  }

  @POST
  @Path("exit")
  public void exit(@FormParam("shellID") String shellId) {
    logger.fine("shellID="+shellId);
    if(!this.shells.containsKey(shellId)) {
      logger.severe("cannot find shell... this should never happen");
      return;
    }
    this.shells.get(shellId).exit();
    this.shells.remove(shellId);
  }

  @POST
  @Path("interrupt")
  public void interrupt(@FormParam("shellID") String shellId) {
    logger.fine("shellID="+shellId);
    if(!this.shells.containsKey(shellId)) {
      logger.severe("cannot find shell... this should never happen");
      return;
    }
    this.shells.get(shellId).cancelExecution();
  }

}
