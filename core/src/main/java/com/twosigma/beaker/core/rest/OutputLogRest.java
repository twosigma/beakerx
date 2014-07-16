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
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * RESTful API for output log service (stdout and stderr from evaluator)
 */
@Path("outputlog")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class OutputLogRest {

  @Inject
  private OutputLogService outputLogService;

  @GET
  @Path("get")
  public List<OutputLogService.OutputLine> get(@QueryParam("linecount") String lineCount) {
    // lineCount ignored XXX
    return this.outputLogService.getLog();
  }

  @GET
  @Path("clear")
  @Produces(MediaType.TEXT_PLAIN)
  public String clear() {
    this.outputLogService.clear();
    return "\"ok\"";
  }
}
