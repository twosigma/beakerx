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
package com.twosigma.beaker.javash.rest;

import com.google.inject.Singleton;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
//import groovy.lang.GroovyShell;
//import groovy.lang.Binding;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
//import org.codehaus.groovy.control.CompilerConfiguration;
//import org.codehaus.groovy.control.CompilationFailedException;
//import org.codehaus.groovy.control.customizers.ImportCustomizer;

@Path("javash")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class JavashShellRest {

  //private final Map<String, JavaShell> shells = new HashMap<>();
  private final Map<String, String> classPaths = new HashMap<>();
  private final Map<String, String> imports = new HashMap<>();

  public JavashShellRest() throws IOException {}

  @POST
  @Path("getShell")
  @Produces(MediaType.TEXT_PLAIN)
  public String getShell(@FormParam("shellId") String shellId) 
    throws InterruptedException, MalformedURLException
  {
    // if the shell doesnot already exist, create a new shell
    // if (shellId.isEmpty() || !this.shells.containsKey(shellId)) {
    //   shellId = UUID.randomUUID().toString();
    //   newEvaluator(shellId);
    //   return shellId;
    // }

    System.err.println("getShell "+shellId);
    
    return shellId;
  }

  @POST
  @Path("evaluate")
  public SimpleEvaluationObject evaluate(
      @FormParam("shellId") String shellId,
      @FormParam("code") String code) throws InterruptedException {

    SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
    obj.started();
    //GroovyShell shell = getEvaluator(shellId);
    // Object result;
    //try {
    //  result = shell.evaluate(code);
    // } catch (Exception e) {
    //  obj.error(e);
    //  return obj;
    // }
    //obj.finished(result);
    System.err.println("evaluate on "+shellId+" code: \""+code+"\"");
    obj.finished("done");
    return obj;
  }

  @POST
  @Path("autocomplete")
  public List<String> autocomplete(
      @FormParam("shellId") String shellId,
      @FormParam("code") String code,
      @FormParam("caretPosition") int caretPosition) throws InterruptedException {
   System.err.println("autocomplete on "+shellId+" pos: "+caretPosition+" code: \""+code+"\"");
    return null;
  }

  @POST
  @Path("exit")
  public void exit(@FormParam("shellId") String shellId) {
    System.err.println("exit on "+shellId);
  }

  @POST
  @Path("cancelExecution")
  public void cancelExecution(@FormParam("shellId") String shellId) {
    System.err.println("cancel on "+shellId);
  }

  @POST
  @Path("killAllThreads")
  public void killAllThreads(@FormParam("shellId") String shellId) {
    System.err.println("kill on "+shellId);
  }

  @POST
  @Path("resetEnvironment")
  public void resetEnvironment(@FormParam("shellId") String shellId) {
    System.err.println("reset on "+shellId);
  }

  @POST
  @Path("setShellOptions")
  public void setShellOptions(
      @FormParam("shellId") String shellId,
      @FormParam("classPath") String classPath,
      @FormParam("imports") String imports,
      @FormParam("outdir") String outDir)
    throws MalformedURLException
  {
    System.err.println("setotions on "+shellId);
    System.err.println("   classp "+classPath);
    System.err.println("   imports "+imports); 
    System.err.println("   outdir "+outDir); 
       
      this.classPaths.put(shellId, classPath);
      this.imports.put(shellId, imports);
      // XXX it would be better to just create the GroovyShell with
      // the desired options instead of creating and then changing
      // (which requires creating a new one).
      //newEvaluator(shellId);
  }

  private void newEvaluator(String id)
    throws MalformedURLException
  {
    // String classPath = this.classPaths.get(id);
    // String[] files = {};
    // URL[] urls = {};
    // if (null != classPath) {
    //   files = classPath.split("\n");
    //   int count = 0;
    //   // should trim too
    //   for (int i = 0; i < files.length; i++) {
    //     if (!files[i].isEmpty()) {
    //       count++;
    //     }
    //   }
    //   urls = new URL[count];
    //   for (int i = 0; i < files.length; i++) {
    //     if (!files[i].isEmpty()) {
    //       urls[i] = new URL("file://" + files[i]);
    //     }
    //   }
    // }
    // ImportCustomizer icz = new ImportCustomizer();
    // String importSetting = this.imports.get(id);
    // if (null != importSetting) {
    //   String[] imports = importSetting.split("\n");
    //   for (int i = 0; i < imports.length; i++) {
    //     if (!imports[i].isEmpty()) {
    //       // should trim too
    //       if (imports[i].endsWith(".*")) {
    //         icz.addStarImports(imports[i].substring(0, imports[i].length() - 2));
    //       } else {
    //         icz.addImports(imports[i]);
    //       }
    //     }
    //   }
    // }
    // CompilerConfiguration config = new CompilerConfiguration().addCompilationCustomizers(icz);
    // this.shells.put(id, new GroovyShell(new URLClassLoader(urls), new Binding(), config));
  }

  //  private GroovyShell getEvaluator(String shellId) {
  //  return this.shells.get(shellId);
  //}
}
