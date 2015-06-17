/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("easyform")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class EasyFormRest {

  private static final String LEGAL_NAME_PATTERN = "[a-zA-Z_][a-zA-Z0-9_]*";

  @Inject
  private EasyFormService easyformService;

  @GET
  @Path("get")
  public Object get(@QueryParam("session") String session,
                    @QueryParam("name") String name)
      throws Exception {
    return this.easyformService.get(session, name);
  }

  @POST
  @Path("set")
  public String set(@FormParam("session") String session,
                    @FormParam("name") String name,
                    @FormParam("value") String value,
                    @FormParam("publish") Boolean publish)
      throws IOException, InterruptedException {
    if (!name.matches(LEGAL_NAME_PATTERN)) {
      return ("name is illegal for notebook namespace: \'" + name + "\'");
    }
    this.easyformService.set(session, name, value, publish);
    return "ok";
  }

  @POST
  @Path("setEnabled")
  public String setEnabled(@FormParam("session") String session,
                           @FormParam("label") String label,
                           @FormParam("enabled") Boolean enabled)
      throws IOException, InterruptedException {
    this.easyformService.setEnabled(session, label, enabled);
    return "ok";
  }
}
