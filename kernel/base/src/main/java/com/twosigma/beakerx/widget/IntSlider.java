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

import java.util.HashMap;

/**
 * Slider widget that represents an integer bounded from above and below.
 */
public class IntSlider extends BoundedIntWidget {

  public static final String VIEW_NAME_VALUE = "IntSliderView";
  public static final String MODEL_NAME_VALUE = "IntSliderModel";

  public static final String ORIENTATION = "orientation";
  public static final String READOUT = "readout";
  public static final String CONTINUOUS_UPDATE = "continuous_update";

  private String orientation = "horizontal";
  private Boolean readOut = true;
  private Boolean continuous_update = true;

  public IntSlider() {
    super();
    this.style = new SliderStyle();
    openComm();
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(CONTINUOUS_UPDATE, this.continuous_update);
    content.put(ORIENTATION, orientation);
    content.put(READOUT, this.readOut);
    content.put("_range", false);
    content.put("readout_format", "d");
    return content;
  }

  public String getOrientation() {
    return orientation;
  }

  public void setOrientation(String orientation) {
    this.orientation = orientation;
    sendUpdate(ORIENTATION, orientation);
  }

  public Boolean getReadOut() {
    return readOut;
  }

  public void setReadOut(Object readOut) {
    this.readOut = getBoolean(readOut);
    sendUpdate(READOUT, readOut);
  }

  public Boolean getContinuous_update() {
    return continuous_update;
  }

  public void setContinuous_update(Boolean continuous_update) {
    this.continuous_update = continuous_update;
    sendUpdate(CONTINUOUS_UPDATE, continuous_update);
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