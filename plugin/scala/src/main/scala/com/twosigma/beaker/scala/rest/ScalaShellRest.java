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
package com.twosigma.beaker.scala.rest;

import com.google.inject.Inject;
import com.google.inject.Injector;
import com.google.inject.Singleton;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.SparkProgressService;
import com.twosigma.beaker.scala.util.BeakerScalaEvaluator;
import com.twosigma.beaker.scala.util.ScalaEvaluator;
import com.twosigma.beaker.scala.utils.BeakerSparkConfiguration;
import com.twosigma.beaker.scala.utils.BeakerSparkContextManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

import org.codehaus.jackson.map.ObjectMapper;

@Path("scalash")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class ScalaShellRest {
  @Inject private Injector injector;

  private final Map<String, ScalaEvaluator> shells = new HashMap<>();
  private final static Logger logger = LoggerFactory.getLogger(ScalaShellRest.class.getName());
      
  public ScalaShellRest() throws IOException {

  }

  @POST
  @Path("configuration")
  @Produces(MediaType.TEXT_PLAIN)
  public String getConfiguration(
          @FormParam("shellId") String shellId)
          throws InterruptedException {

    if(!BeakerSparkContextManager.isRunning())
      return "offline";

    // make sure contexts are available in current shell
    BeakerSparkConfiguration configuration = BeakerSparkContextManager.getConfiguration();
    evaluate(
            shellId,
            String.format("import com.twosigma.beaker.scala.utils.BeakerSparkContextManager\n" +
                            "var %s = BeakerSparkContextManager.getSparkContext\n" +
                            "var %s = BeakerSparkContextManager.getSqlContext\n",
                    configuration.getSparkContextAlias(),
                    configuration.getSqlContextAlias()
            )
    );

    return configuration.toString();
  }

  @POST
  @Path("startSparkContext")
  @Produces(MediaType.TEXT_PLAIN)
  public String startSparkContext(
          @FormParam("shellId") String shellId,
          @FormParam("configuration") String configuration)
          throws InterruptedException {

    if(!BeakerSparkContextManager.isRunning()) {
      BeakerSparkContextManager.configure(BeakerSparkConfiguration.fromJSON(configuration));
      SparkProgressService progressService = injector.getInstance(SparkProgressService.class);
      progressService.clear();
      BeakerSparkContextManager.start(progressService);
      if(!BeakerSparkContextManager.isRunning()) {
        return BeakerSparkContextManager.getError();
      }
    }

    BeakerSparkConfiguration config = BeakerSparkContextManager.getConfiguration();
    evaluate(
            shellId,
            String.format("import com.twosigma.beaker.scala.utils.BeakerSparkContextManager\n" +
                            "var %s = BeakerSparkContextManager.getSparkContext\n" +
                            "var %s = BeakerSparkContextManager.getSqlContext\n",
                    config.getSparkContextAlias(),
                    config.getSqlContextAlias()
            )
    );

    return config.toString();
  }

  @POST
  @Path("stopSparkContext")
  @Produces(MediaType.TEXT_PLAIN)
  public String stopSparkContext(@FormParam("shellId") String shellId) {
    if(BeakerSparkContextManager.isRunning()) {
      BeakerSparkContextManager.stop();
      resetEnvironment(shellId);
    }
    return "ok";
  }

  @GET
  @Path("sparkExecutorIds")
  @Produces(MediaType.TEXT_PLAIN)
  public String sparkExecutorIds() throws IOException {
    if(!BeakerSparkContextManager.isRunning())
      return "[]";
    ObjectMapper mapper = new ObjectMapper();
    return mapper.writeValueAsString(BeakerSparkContextManager.getCookJobIds());
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
  public String getShell(@FormParam("shellId") String shellId, @FormParam("sessionId") String sessionId) throws InterruptedException, MalformedURLException
  {
    logger.debug("shellId="+shellId);
    // if the shell does not already exist, create a new shell
    if (shellId.isEmpty() || !this.shells.containsKey(shellId)) {
      logger.trace(" creating new shell");
      shellId = UUID.randomUUID().toString();
      ScalaEvaluator js = injector.getInstance(ScalaEvaluator.class);
      js.initialize(shellId,sessionId);
      js.setupAutoTranslation();
      initBeakerScalaEvaluator(shellId, sessionId);
      this.shells.put(shellId, js);
      return shellId;
    }
    return shellId;
  }

  protected void initBeakerScalaEvaluator(final String shellId, final String sessionId) {
    BeakerScalaEvaluator beakerScalaEvaluator = injector.getInstance(BeakerScalaEvaluator.class);
    beakerScalaEvaluator.initialize(shellId, sessionId);
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(@FormParam("shellId") String shellId, @FormParam("code") String code) throws InterruptedException {
    logger.debug("shellId="+shellId+" code="+code.replaceAll("\n", " \\n "));
    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    if(!this.shells.containsKey(shellId)) {      
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
  @Path("autocomplete")
  public List<String> autocomplete(
      @FormParam("shellId") String shellId,
      @FormParam("code") String code,
      @FormParam("caretPosition") int caretPosition) throws InterruptedException {
    logger.debug("shellId="+shellId+" pos="+caretPosition+" code="+code.replaceAll("\n", " \\n "));
    if(!this.shells.containsKey(shellId)) {
      return null;
    }
    return this.shells.get(shellId).autocomplete(code, caretPosition);
  }

  @POST
  @Path("exit")
  public void exit(@FormParam("shellId") String shellId) {
    logger.debug("shellId="+shellId);
    if(!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).exit();
    this.shells.remove(shellId);
  }

  @POST
  @Path("cancelExecution")
  public void cancelExecution(@FormParam("shellId") String shellId) {
    logger.debug("shellId="+shellId);
    if(!this.shells.containsKey(shellId)) {
      return;
    }
    if(BeakerSparkContextManager.isRunning()) {
       BeakerSparkContextManager.cancelAllJobs();
    }
    this.shells.get(shellId).cancelExecution();
  }

  @POST
  @Path("killAllThreads")
  public void killAllThreads(@FormParam("shellId") String shellId) {
    logger.debug("shellId="+shellId);
    if(!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).killAllThreads();
  }

  @POST
  @Path("resetEnvironment")
  public void resetEnvironment(@FormParam("shellId") String shellId) {
    logger.debug("shellId="+shellId);
    if(!this.shells.containsKey(shellId)) {
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
      @FormParam("outdir") String outDir)
          throws IOException
  {
    logger.debug("shellId="+shellId+" classPath: "+classPath.replaceAll("\n", " \\n ")+" imports: "+imports
      .replaceAll("\n", " \\n ")+" outDir: "+outDir);
    if(!this.shells.containsKey(shellId)) {
      return;
    }
    this.shells.get(shellId).setShellOptions(classPath, imports, outDir);
  }

}
