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
package com.twosigma.beakerx;

import com.twosigma.beakerx.mimetype.MIMEContainer;
import jupyter.Displayer;
import jupyter.Displayers;

import java.util.HashMap;
import java.util.Map;

public class BeakerxDefaultDisplayers {


  public static void registerDefaults() {
    registerCodeCellDisplayer();
  }

  private static void registerCodeCellDisplayer() {
    Displayers.register(CodeCell.class, new Displayer<CodeCell>() {
      @Override
      public Map<String, String> display(CodeCell value) {
        return new HashMap<String, String>() {{
          StringBuilder sb = new StringBuilder("Cell Type:" + (value).getCellType()).append(System.getProperty("line.separator"));
          sb.append("Execution Count:").append((value).getExecutionCount()).append(System.getProperty("line.separator"));
          sb.append("Metadata:").append((value).getMetadata()).append(System.getProperty("line.separator"));
          sb.append("Source:").append((value).getSource());
          put(MIMEContainer.MIME.TEXT_PLAIN, sb.toString());
        }};
      }
    });
  }
}
