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
package com.twosigma.beaker.widgets.floats;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Displays a float value within a textbox. For a textbox in which the value
 * must be within a specific range, use BoundedFloatText.
 * 
 *     Parameters
 *   ----------
 *   value : float
 *       value displayed
 *   description : str
 *       description displayed next to the text box
 *   color : str Unicode color code (eg. '#C13535')
 *       color of the value displayed
 * 
 * @author konst
 *
 */
public class FloatText extends FloatWidget<Double> {

  public static final String VIEW_NAME_VALUE = "FloatTextView";
  public static final String MODEL_NAME_VALUE = "FloatTextModel";

  public FloatText() {
    super();
    this.value = 0D;
    init();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MODEL_NAME, MODEL_NAME_VALUE);
    content.put(VIEW_NAME, VIEW_NAME_VALUE);
    return content;
  }

}