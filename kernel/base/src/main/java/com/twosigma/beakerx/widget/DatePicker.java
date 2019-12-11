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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

public class DatePicker extends ValueWidget<Date> {
  public static final String VIEW_NAME_VALUE = "DatePickerView";
  public static final String MODEL_NAME_VALUE = "DatePickerModel";
  public static final String SHOW_TIME = "showTime";
  public static final String YYYY_MM_DD = "yyyyMMdd";
  public static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat(YYYY_MM_DD);

  private Boolean showTime;

  public DatePicker() {
    super();
    this.value = null;
    openComm();
  }

  @Override
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  @Override
  public void updateValue(Object value) {
    this.value = getValueFromObject(value);
  }

  @Override
  public Date getValueFromObject(Object input) {
    try {
      return SIMPLE_DATE_FORMAT.parse((String) input);
    } catch (ParseException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String printValue() {
    if (this.value == null) {
      return null;
    }
    return SIMPLE_DATE_FORMAT.format(this.value);
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(VALUE, this.value);
    return content;
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  public void setShowTime(final Boolean showTime) {
    this.showTime = showTime;
    sendUpdate(SHOW_TIME, showTime);
  }

  public Boolean getShowTime() {
    return showTime;
  }

}