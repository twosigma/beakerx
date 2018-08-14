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
package com.twosigma.beakerx.kernel.comm;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.BeakerXClientManager;
import com.twosigma.beakerx.CodeCell;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class GetCodeCellsHandler {

  public final static GetCodeCellsHandler INSTANCE = new GetCodeCellsHandler();

  private ObjectMapper objectMapper;

  private GetCodeCellsHandler() {
    objectMapper = new ObjectMapper();
  }

  public void handle(String data) {
    try {
      List<CodeCell> cells = getBeakerCodeCells(data);
      BeakerXClientManager.get().getMessageQueue("CodeCells").put(cells);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  private List<CodeCell> getBeakerCodeCells(String json) {
    try {
      CodeCellWithBody codeCellWithBody = objectMapper.readValue(json, CodeCellWithBody.class);
      return Arrays.asList(codeCellWithBody.code_cells);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public static class CodeCellWithBody {
    public CodeCell[] code_cells;
    public String url;

    public CodeCellWithBody() {
    }
  }

}
