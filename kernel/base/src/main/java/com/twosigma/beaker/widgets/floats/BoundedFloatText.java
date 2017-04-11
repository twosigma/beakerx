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
 *   Displays a float value within a textbox. Value must be within the range specified.
 *   For a textbox in which the value doesn't need to be within a specific range, use FloatText.
 *   Parameters
 *   ----------
 *   value : float
 *       value displayed
 *   min : float
 *       minimal value of the range of possible values displayed
 *   max : float
 *       maximal value of the range of possible values displayed
 *   description : str
 *       description displayed next to the textbox
 *   color : str Unicode color code (eg. '#C13535')
 *       color of the value displayed
 * 
 * @author konst
 */
public class BoundedFloatText extends BoundedFloatWidget {

  public static final String VIEW_NAME_VALUE = "FloatTextView";
  public static final String MODEL_NAME_VALUE = "FloatTextModel";

  public BoundedFloatText() {
    super();
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