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

import com.twosigma.beakerx.kernel.comm.Comm;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class Image extends ValueWidget<byte[]> {


  public static final String VIEW_NAME_VALUE = "ImageView";
  public static final String MODEL_NAME_VALUE = "ImageModel";
  public static final String FORMAT = "format";
  public static final String WIDTH = "width";
  public static final String HEIGHT = "height";

  private String format = "png";
  private String width = "";
  private String height = "";

  public Image() {
    super();
    openComm();
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(FORMAT, this.format);
    content.put(WIDTH, this.width);
    content.put(HEIGHT, this.height);
    return content;
  }

  @Override
  public void setValue(Object value) {
    this.value = getValueFromObject(value);
    ArrayList<List<String>> bufferPaths = new ArrayList<>();
    bufferPaths.add(Arrays.asList("value"));
    sendUpdate(new Comm.Buffer(Collections.singletonList(this.value), bufferPaths));
  }

  @Override
  public byte[] getValueFromObject(Object input) {
    return (byte[]) input;
  }

  public String getFormat() {
    return format;
  }

  public void setFormat(String format) {
    this.format = format;
    sendUpdate(FORMAT, this.format);
  }

  public String getWidth() {
    return width;
  }

  public void setWidth(String width) {
    this.width = width;
    sendUpdate(WIDTH, this.width);
  }

  public String getHeight() {
    return height;
  }

  public void setHeight(String height) {
    this.height = height;
    sendUpdate(HEIGHT, this.height);
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