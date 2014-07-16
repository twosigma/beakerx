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
package com.twosigma.beaker.groovy.rest;

import com.google.inject.Singleton;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import groovy.lang.GroovyShell;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.groovy.control.CompilationFailedException;

@Path("groovysh")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class GroovyShellRest {

  private final Map<String, GroovyShell> shells = new HashMap<>();

  public GroovyShellRest() throws IOException {}

  @POST
  @Path("getShell")
  @Produces(MediaType.TEXT_PLAIN)
  public String getShell(
          @FormParam("shellId") String shellId) throws InterruptedException {
    // if the shell doesnot already exist, create a new shell
    if (shellId.isEmpty() || !this.shells.containsKey(shellId)) {
      shellId = UUID.randomUUID().toString();
      newEvaluator(shellId);
      return shellId;
    }
    return shellId;
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(
      @FormParam("shellId") String shellId,
      @FormParam("code") String code) throws InterruptedException {

    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    GroovyShell shell = getEvaluator(shellId);
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
      @FormParam("shellId") String shellId,
      @FormParam("code") String code,
      @FormParam("caretPosition") int caretPosition) throws InterruptedException {
    return null;
  }

  @POST
  @Path("exit")
  public void exit(@FormParam("shellId") String shellId) {
  }

  @POST
  @Path("cancelExecution")
  public void cancelExecution(@FormParam("shellId") String shellId) {
  }

  @POST
  @Path("killAllThreads")
  public void killAllThreads(@FormParam("shellId") String shellId) {
  }

  @POST
  @Path("resetEnvironment")
  public void resetEnvironment(@FormParam("shellId") String shellId) {
  }

  @POST
  @Path("setClassPath")
  public void setClassPath(
      @FormParam("shellId") String shellId,
      @FormParam("classPath") String classPath) {
  }

  @POST
  @Path("setImports")
  public void setImports(
      @FormParam("shellId") String shellId,
      @FormParam("imports") String classPathes) {
  }

  private void newEvaluator(String id) {
    this.shells.put(id, new GroovyShell());
  }

  private GroovyShell getEvaluator(String shellId) {
    return this.shells.get(shellId);
  }
}
