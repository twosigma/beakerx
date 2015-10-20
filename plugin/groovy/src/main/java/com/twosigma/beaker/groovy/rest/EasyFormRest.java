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

package com.twosigma.beaker.groovy.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.easyform.EasyFormObjectManager;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("groovysh/easyform")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class EasyFormRest {

  private final EasyFormObjectManager _easyFormObjectManager;

  @Inject
  public EasyFormRest(EasyFormObjectManager easyFormObjectManager) {
    _easyFormObjectManager = easyFormObjectManager;
  }

  @GET
  @Path("get")
  public String get(@QueryParam("id") String id,
                    @QueryParam("key") String key)
      throws Exception {
    EasyForm easyForm = _easyFormObjectManager.getForm(id);
    if (easyForm == null) {
      return null;
    }
    return easyForm.get(key);
  }

  @POST
  @Path("set")
  public void set(@FormParam("id") String id,
                    @FormParam("key") String key,
                    @FormParam("value") String value)
      throws IOException, InterruptedException {
    EasyForm easyForm = _easyFormObjectManager.getForm(id);
    if (easyForm == null) {
      return;
    }
    easyForm.put(key, value);
  }

  @POST
  @Path("setReady/{id}")
  public void setReady(@PathParam("id") String id) throws IOException, InterruptedException {
    EasyForm easyForm = _easyFormObjectManager.getForm(id);
    if (easyForm == null) {
      return;
    }
    easyForm.setReady();
  }

}