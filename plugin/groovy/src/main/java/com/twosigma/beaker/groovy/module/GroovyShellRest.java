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
package com.twosigma.beaker.groovy.module;

import com.google.inject.Singleton;
import com.twosigma.beaker.shared.json.serializer.StringObject;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import groovy.lang.GroovyShell;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.ws.rs.FormParam;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("groovysh")
public class GroovyShellRest {

  private final Map<String, GroovyShell> _shells = new HashMap<String, GroovyShell>();

  public GroovyShellRest() throws IOException {
    newEvaluator("default");
  }

  @POST
  @Path("getShell")
  public StringObject getShell(
          @FormParam("shellid") String shellID) throws InterruptedException {
    if (!shellID.isEmpty() && _shells.containsKey(shellID)) {
      // System.out.println("found shell " + shellID + " on server.");
      return new StringObject(shellID);
    } else {
      return newShell();
    }
  }

  @POST
  @Path("newShell")
  public StringObject newShell() throws InterruptedException {
    String shellID = UUID.randomUUID().toString();
    //System.out.println("Creating a new shell: " + shellID);
    newEvaluator(shellID);
    return new StringObject(shellID);
  }

  @POST
  @Path("newShell2")
  public StringObject newShell2() throws InterruptedException {
    String shellID = UUID.randomUUID().toString();
    //System.out.println("Creating a new shell: " + shellID);
    newEvaluator(shellID);
    return new StringObject(shellID);
  }

  @POST
  @Path("newShell3")
  public Response newShell3() throws InterruptedException, UnknownHostException {
    String shellID = UUID.randomUUID().toString();
    //System.out.println("Creating a new shell (POST): " + shellID);
    newEvaluator(shellID);
    //return new StringObject(shellID);
    Response res = Response
            .status(Response.Status.OK)
            .header("Access-Control-Allow-Origin", "http://" + InetAddress.getLocalHost().getHostName() + ":1088")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
            .header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            .header("Access-Control-Expose-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            //		.header("Access-Control-Max-Age", "1728000")
            .header("Access-Control-Allow-Credentials", "true")
            .entity(new StringObject(shellID))
            .build();
    return res;
  }

  @OPTIONS
  @Path("newShell3")
  public Response newShell3OP() throws InterruptedException, UnknownHostException {
    String shellID = UUID.randomUUID().toString();
    //System.out.println("Creating a new shell (OPTIONS): " + shellID);
    newEvaluator(shellID);
    //return new StringObject(shellID);
    Response res = Response
            .status(Response.Status.OK)
            .header("Access-Control-Allow-Origin", "http://" + InetAddress.getLocalHost().getHostName() + ":1088")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
            .header("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            .header("Access-Control-Expose-Headers", "Authorization, X-Requested-With, Content-Type, Origin, Accept")
            //		.header("Access-Control-Max-Age", "1728000")
            .header("Access-Control-Allow-Credentials", "true")
            .build();
    return res;
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(
          @FormParam("shellID") String shellID,
          @FormParam("code") String code) throws InterruptedException {
    // System.out.println("evaluating, shellID = " + shellID + ", code = " + code);
    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    GroovyShell shell = getEvaluator(shellID);
    Object result;
    try {
      result = shell.evaluate(code);
    } catch (Exception e) {
      obj.error(e);
      return obj;
    }
    obj.finished(result);
    return obj;
  }

  @POST
  @Path("autocomplete")
  public List<String> autocomplete(
          @FormParam("shellID") String shellID,
          @FormParam("code") String code,
          @FormParam("caretPosition") int caretPosition) throws InterruptedException {
    //System.out.println("autocompleting, shellID = " + shellID + ", code = " + code + ", caretPos = " + caretPosition);


    return null;
  }

  @POST
  @Path("exit")
  public void exit(
          @FormParam("shellID") String shellID) {
  }

  @POST
  @Path("cancelExecution")
  public void cancelExecution(@FormParam("shellID") String shellID) {
  }

  @POST
  @Path("killAllThreads")
  public void killAllThreads(@FormParam("shellID") String shellID) {
  }

  @POST
  @Path("resetEnvironment")
  public void resetEnvironment(@FormParam("shellID") String shellID) {
  }

  @POST
  @Path("setClassPath")
  public void setClassPath(
          @FormParam("shellID") String shellID,
          @FormParam("classPath") String classPath) {
  }

  @POST
  @Path("setImports")
  public void setImports(
          @FormParam("shellID") String shellID,
          @FormParam("imports") String classPathes) {
  }

  private void newEvaluator(String id) {
    _shells.put(id, new GroovyShell());
  }

  private GroovyShell getEvaluator(String shellID) {
    if (shellID == null || shellID.isEmpty()) {
      shellID = "default";
    }
    return _shells.get(shellID);
  }
}
