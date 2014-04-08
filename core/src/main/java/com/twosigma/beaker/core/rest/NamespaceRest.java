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
package com.twosigma.beaker.core.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * RESTful API for namespace service (in the notebook model).  This is
 * broken because it does not specify the notebook.
 *
 * works like this:
 * curl http://127.0.0.1:8802/rest/namespace/get?name=x
 * curl -d 'name=x&value=99' http://127.0.0.1:8802/rest/namespace/set
 */
@Path("namespace")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class NamespaceRest {

  @Inject
  private NamespaceService namespaceService;

  @GET
  @Path("get")
  public Object get(@QueryParam("name") String name) 
    throws InterruptedException 
  {
    return this.namespaceService.get(name);
  }

  @POST
  @Path("set")
  public void set(@FormParam("name") String name, @FormParam("value") String value) {
    // check name is well formed XXX
    this.namespaceService.set(name, value);
  }
}
