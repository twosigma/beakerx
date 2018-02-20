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

public abstract class FloatRangeWidget extends FloatWidget<Double[]> {

  protected FloatRangeWidget() {
    super();
    value = new Double[2];
    value[0] = 0D;
    value[1] = 1D;
  }

  public Double getLower() {
    Double ret = null;
    if (value != null && value.length > 1) {
      ret = value[0];
    }
    return ret;
  }

  public void setLower(Double input) {
    if (value != null && value.length > 1) {
      value[0] = input;
    }
  }

  public Double getUpper() {
    Double ret = null;
    if (value != null && value.length > 1) {
      ret = value[1];
    }
    return ret;
  }

  public void setUpper(Double input) {
    if (value != null && value.length > 1) {
      value[1] = input;
    }
  }

  @Override
  public Double[] getValueFromObject(Object input) {
    return getArrayOfDouble(input, getLower(), getUpper());
  }

}