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
package com.twosigma.beakerx.easyform.formitem.widgets;

import static com.twosigma.beakerx.widgets.Layout.PX;

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.widgets.strings.Textarea;

public class TextAreaWidget extends EasyFormComponent<Textarea> {

  public static final Integer AUTO_HEIGHT = -1;
  public static final Integer AUTO_WIDTH = -1;
  private Integer width;
  private Integer height;
  
  public TextAreaWidget() {
    super(new Textarea());
  }

  public Integer getWidth() {
    return width;
  }

  public Integer getHeight() {
    return height;
  }

  public void setWidth(Integer width) {
    this.width = width;
    widget.getLayout().setWidth(width + PX);
  }

  public void setHeight(Integer height) {
    this.height = height;
    widget.getLayout().setHeight(height + PX);
  }

}