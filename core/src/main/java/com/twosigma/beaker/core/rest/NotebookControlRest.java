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
import com.twosigma.beaker.shared.json.serializer.StringObject;

import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * RESTful API for namespace service (in the notebook model).
 */
@Path("notebookctrl")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class NotebookControlRest {

  @Inject
  private NotebookControlService notebookCtrlService;

  @POST
  @Path("evaluate")
  public Object evaluate(
      @FormParam("session") String session,
      @FormParam("filter") String filter)
    throws IOException, InterruptedException
  {
    return notebookCtrlService.evaluate(session, filter);
  }

  @POST
  @Path("evaluateCode")
  public Object evaluateCode(
      @FormParam("session") String session, 
      @FormParam("evaluator") String evaluator,
      @FormParam("code") String code)
    throws IOException, InterruptedException
  {
    return notebookCtrlService.evaluateCode(session, evaluator,code);
  }
  
  @POST
  @Path("showStatus")
  public Object showStatus(
      @FormParam("session") String session, 
      @FormParam("msg") String msg)
    throws IOException, InterruptedException
  {
    return notebookCtrlService.showStatus(session, msg);
  }

  @POST
  @Path("clrStatus")
  public Object clrStatus(
      @FormParam("session") String session, 
      @FormParam("msg") String msg)
    throws IOException, InterruptedException
  {
    return notebookCtrlService.clrStatus(session, msg);
  }

  @POST
  @Path("showTransientStatus")
  public Object showTransientStatus(
      @FormParam("session") String session, 
      @FormParam("msg") String msg)
    throws IOException, InterruptedException
  {
    return notebookCtrlService.showTransientStatus(session, msg);
  }

  @GET
  @Path("getEvaluators")
  public Object getEvaluators(@QueryParam("session") String session)
    throws IOException, InterruptedException
  {
    return notebookCtrlService.getEvaluators(session);
  }

  @GET
  @Path("getCodeCells")
  public Object getCodeCells(
      @QueryParam("session") String session, 
      @QueryParam("filter") String filter)
    throws IOException, InterruptedException
  {
    return notebookCtrlService.getCodeCells(session, filter);
  }
  
  @POST
  @Path("setCodeCellBody")
  public StringObject setCodeCellBody(
      @FormParam("session") String session, 
      @FormParam("name") String name,
      @FormParam("body") String body)
    throws IOException, InterruptedException
  {
    return new StringObject(notebookCtrlService.setCodeCellBody(session, name,body).toString());
  }

  @POST
  @Path("setCodeCellEvaluator")
  public StringObject setCodeCellEvaluator(
      @FormParam("session") String session, 
      @FormParam("name") String name,
      @FormParam("evaluator") String evaluator)
    throws IOException, InterruptedException
  {
    return new StringObject(notebookCtrlService.setCodeCellEvaluator(session, name,evaluator).toString());
  }

  @POST
  @Path("setCodeCellTags")
  public StringObject setCodeCellTags(
      @FormParam("session") String session, 
      @FormParam("name") String name,
      @FormParam("tags") String tags)
    throws IOException, InterruptedException
  {
    return new StringObject(notebookCtrlService.setCodeCellTags(session, name,tags).toString());
  }

}
