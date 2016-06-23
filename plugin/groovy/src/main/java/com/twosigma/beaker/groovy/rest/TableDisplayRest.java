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

import com.google.inject.Singleton;
import com.twosigma.beaker.table.ObservableTableDisplay;
import com.twosigma.beaker.table.action.TableActionDetails;
import com.twosigma.beaker.table.action.TableDisplayObjectManager;
import org.apache.cxf.common.util.CollectionUtils;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.List;

@Path("groovysh/tabledisplay")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Singleton
public class TableDisplayRest {

  @Inject
  private TableDisplayObjectManager tableDisplayObjectManager;

  @POST
  @Path("actiondetails/{tableId}")
  public void setActionDetails(@PathParam("tableId") String tableId,
                               TableActionDetails details) throws IOException, InterruptedException {
    ObservableTableDisplay tableDisplay = tableDisplayObjectManager.getTableDisplay(tableId);
    if (tableDisplay != null) {
      tableDisplay.setDetails(details);
    }
  }

  @POST
  @Path("ondoubleclick/{tableId}")
  public void onClick(@PathParam("tableId") String tableId,
                      List<Object> params) throws IOException, InterruptedException {
    ObservableTableDisplay tableDisplay = tableDisplayObjectManager.getTableDisplay(tableId);
    if (tableDisplay != null) {
      tableDisplay.fireDoubleClick(params);
      tableDisplay.setChanged();
      tableDisplay.notifyObservers();
    }
  }

  @POST
  @Path("oncontextmenu/{tableId}")
  public void onContextMenu(@PathParam("tableId") String tableId,
                            List<Object> params) throws IOException, InterruptedException {
    ObservableTableDisplay tableDisplay = tableDisplayObjectManager.getTableDisplay(tableId);
    if (tableDisplay != null && !CollectionUtils.isEmpty(params)) {
      String name = (String) params.remove(0);
      tableDisplay.fireContextMenuClick(name, params);
      tableDisplay.setChanged();
      tableDisplay.notifyObservers();
    }
  }

}
