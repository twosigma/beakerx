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
package com.twosigma.beakerx.widget;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Displays a boolean `value` in the form of a green check (True / valid)
 * or a red cross (False / invalid).
 * Parameters
 * ----------
 * value: {True,False}
 * value of the Valid widget
 *
 * @author konst
 */
public class Valid extends BoolWidget {

  public static final String VIEW_NAME_VALUE = "ValidView";
  public static final String MODEL_NAME_VALUE = "ValidModel";

  protected static final String READOUT = "readout";
  public static final String INVALID = "Invalid";

  private String readOut = INVALID;

  public Valid() {
    super();
    openComm();
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(READOUT, this.readOut);
    return content;
  }

  public String getReadOut() {
    return readOut;
  }

  public void setReadOut(String readOut) {
    this.readOut = readOut;
    sendUpdate(READOUT, readOut);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

}