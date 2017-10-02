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
package com.twosigma.beakerx.widgets.floats;

import com.twosigma.beakerx.widgets.styles.SliderStyle;
import com.twosigma.beakerx.widgets.styles.Style;
import java.io.Serializable;
import java.util.HashMap;

/**
 * 
 * Slider/trackbar of floating values with the specified range.
 *   Parameters
 *   ----------
 *   value : float
 *       position of the slider
 *   min : float
 *       minimal position of the slider
 *   max : float
 *       maximal position of the slider
 *   step : float
 *       step of the trackbar
 *   description : str
 *       name of the slider
 *   orientation : {'horizontal', 'vertical'}
 *       default is 'horizontal', orientation of the slider
 *   readout : {True, False}
 *       default is True, display the current value of the slider next to it
 *   readout_format : str
 *       default is '.2f', specifier for the format function used to represent
 *       slider value for human consumption, modeled after Python 3's format
 *       specification mini-language (PEP 3101).
 *   slider_color : str Unicode color code (eg. '#C13535')
 *       color of the slider
 *   color : str Unicode color code (eg. '#C13535')
 *       color of the value displayed (if readout == True)
 *
 */
public class FloatSlider extends BoundedFloatWidget {

  public static final String VIEW_NAME_VALUE = "FloatSliderView";
  public static final String MODEL_NAME_VALUE = "FloatSliderModel";

  protected static final String ORIENTATION = "orientation";
  protected static final String SLIDER_COLOR = "slider_color";
  protected static final String READOUT = "readout";
  protected static final String CONTINUOUS_UPDATE = "continuous_update";

  private String orientation = "horizontal";
  private String slider_color;
  private Boolean readOut = true;
  private Boolean continuous_update = true;
  private SliderStyle style;


  public FloatSlider() {
    super();
    openComm();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(CONTINUOUS_UPDATE, this.continuous_update);
    content.put(ORIENTATION, orientation);
    content.put(READOUT, this.readOut);
    content.put(SLIDER_COLOR, this.slider_color);
    content.put("_range", false);
    content.put("readout_format", ".2f");
    return content;
  }

  public String getOrientation() {
    return orientation;
  }

  public void setOrientation(String orientation) {
    this.orientation = orientation;
    sendUpdate(ORIENTATION, orientation);
  }

  public String getSlider_color() {
    return slider_color;
  }

  public void setSlider_color(String slider_color) {
    this.slider_color = slider_color;
    sendUpdate(SLIDER_COLOR, slider_color);
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

  @Override
  public SliderStyle getStyle() {
    return style;
  }

  public void setStyle(SliderStyle style) {
    this.style = style;
  }
}