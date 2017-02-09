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
package com.twosigma.beaker.widgets;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

public class Image extends DOMWidget {


  public static final String VIEW_NAME_VALUE = "ImageView";
  public static final String MODEL_NAME_VALUE = "ImageModel";
  public static final String FORMAT = "format";
  public static final String WIDTH = "width";
  public static final String HEIGHT = "height";

  private String format = "png";
  private String width = "";
  private String height = "";
  private byte[] value;

  public Image() throws NoSuchAlgorithmException {
    super();
    init();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MODEL_NAME, MODEL_NAME_VALUE);
    content.put(VIEW_NAME, VIEW_NAME_VALUE);
    content.put(VALUE, this.value);
    content.put(FORMAT, this.format);
    content.put(WIDTH, this.width);
    content.put(HEIGHT, this.height);
    return content;
  }

  public byte[] getValue() {
    return value;
  }

  public void setValue(byte[] value) {
    this.value = value;
    sendUpdate("_b64value", value);
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
}
