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

/**
 * @author konst
 */
public abstract class IntRangeWidget extends IntWidget<Integer[]>{

  protected IntRangeWidget() {
    super();
    value = new Integer[2];
    value[0] = 0;
    value[1] = 1;
  }
  
  public Integer getLower(){
    Integer ret = null;
    if(value != null && value.length > 1){
      ret = value[0];
    }
    return ret;
  }

  public void setLower(Integer input){
    if(value != null && value.length > 1){
      value[0] = input;
    }
  }
  
  public Integer getUpper(){
    Integer ret = null;
    if(value != null && value.length > 1){
      ret = value[1];
    }
    return ret;
  }

  public void setUpper(Integer input){
    if(value != null && value.length > 1){
      value[1] = input;
    }
  }
  
  @Override
  public Integer[] getValueFromObject(Object input){
    return getArrayOfInteger(input, getLower(), getUpper());
  }
  
}