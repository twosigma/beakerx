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
 * Displays a progress bar.
 *   Parameters
 *   -----------
 *   value : float
 *       position within the range of the progress bar
 *   min : float
 *       minimal position of the slider
 *   max : float
 *       maximal position of the slider
 *   step : float
 *       step of the progress bar
 *   description : str
 *       name of the progress bar
 *   orientation : {'horizontal', 'vertical'}
 *       default is 'horizontal', orientation of the progress bar
 *   bar_style: {'success', 'info', 'warning', 'danger', ''}
 *       color of the progress bar, default is '' (blue)
 *       colors are: 'success'-green, 'info'-light blue, 'warning'-orange, 'danger'-red
 */
public class FloatProgress extends BoundedFloatWidget {

  public static final String VIEW_NAME_VALUE = "ProgressView";
  public static final String MODEL_NAME_VALUE = "FloatProgressModel";
  public static final String ORIENTATION = "orientation";
  public static final String BAR_STYLE = "bar_style";

  private String orientation = "horizontal";

  private FloatProgress.BarStyle barStyle = FloatProgress.BarStyle.EMPTY;


  public FloatProgress() {
    super();
    this.style = new ProgressStyle();
    openComm();
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(ORIENTATION, this.orientation);
    content.put("bar_style", "");
    return content;
  }

  public String getOrientation() {
    return this.orientation;
  }

  public void setOrientation(String orientation) {
    this.orientation = orientation;
    sendUpdate(ORIENTATION, orientation);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  public void setBarStyle(FloatProgress.BarStyle style) {
    this.barStyle = style;
    sendUpdate(BAR_STYLE, this.barStyle.getValue());
  }

  public enum BarStyle {
    SUCCESS("success"),
    INFO("info"),
    WARNING("warning"),
    DANGER("danger"),
    EMPTY("");

    private String value;

    BarStyle(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }
  }

}