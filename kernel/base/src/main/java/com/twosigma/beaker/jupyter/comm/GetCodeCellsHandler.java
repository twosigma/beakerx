/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.jupyter.comm;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beaker.BeakerCodeCell;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.SerializeToString;
import com.twosigma.beaker.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.List;


public class GetCodeCellsHandler extends BaseHandler<Object> {

  private static final String GET_CODE_CELLS = "code_cells";
  private ObjectMapper objectMapper;
  private BeakerObjectConverter objectSerializer;

  public GetCodeCellsHandler(KernelFunctionality kernel) {
    super(kernel);
    objectMapper = new ObjectMapper();
    objectSerializer = new BasicObjectSerializer();
  }

  @Override
  public void handle(Message message) {
    try{
      List<BeakerCodeCell> cells = getBeakerCodeCells(getValueFromData(message, getHandlerCommand()));
      NamespaceClient.getMessageQueue("CodeCells").put(cells);
    } catch (InterruptedException e){
      e.printStackTrace();
    }
  }

  private List<BeakerCodeCell> getBeakerCodeCells(Object value) {
    List<BeakerCodeCell> beakerCodeCellList = null;
    StringWriter sw = new StringWriter();
    JsonGenerator jgen = null;
    try {
      jgen = objectMapper.getFactory().createGenerator(sw);
      objectSerializer.writeObject(value, jgen, true);
      jgen.flush();
      sw.flush();
      beakerCodeCellList = Arrays.asList(objectMapper.readValue(sw.toString(), BeakerCodeCell[].class));
    } catch (IOException e) {
      e.printStackTrace();
    }

    return beakerCodeCellList;
  }

  @Override
  public String getHandlerCommand() {
    return GET_CODE_CELLS;
  }
}
