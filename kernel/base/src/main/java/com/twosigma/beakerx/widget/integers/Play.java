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
package com.twosigma.beakerx.widget.integers;

import java.io.Serializable;
import java.util.HashMap;

/**
 * 
 * @author konst
 *
 */
public class Play extends BoundedIntWidget{

  public static final String VIEW_NAME_VALUE = "PlayView";
  public static final String MODEL_NAME_VALUE = "PlayModel";
  
  protected static final String _PLAYING = "_playing";
  protected static final String INTERVAL = "interval";
  
  private Integer interval;
  
  public Play() {
    super();
    this.interval = 100;
    openComm();
  }
  
  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(_PLAYING, false);
    return content;
  }
  
  public Integer getOrientation() {
    return interval;
  }

  public void setOrientation(Integer interval) {
    this.interval = interval;
    sendUpdate(INTERVAL, interval);
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