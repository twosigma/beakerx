package com.twosigma.beaker.widgets.floats;

import java.util.Collection;

public abstract class FloatRangeWidget extends FloatWidget<Double[]>{

  protected FloatRangeWidget() {
    super();
    value = new Double[2];
    value[0] = 0D;
    value[1] = 1D;
  }
  
  public Double getLower(){
    Double ret = null;
    if(value != null && value.length > 1){
      ret = value[0];
    }
    return ret;
  }

  public void setLower(Double input){
    if(value != null && value.length > 1){
      value[0] = input;
    }
  }
  
  public Double getUpper(){
    Double ret = null;
    if(value != null && value.length > 1){
      ret = value[1];
    }
    return ret;
  }

  public void setUpper(Double input){
    if(value != null && value.length > 1){
      value[1] = input;
    }
  }
  
 
  @Override
  public Double[] getValueFromObject(Object input){
    return getArrayOfDouble(input, getLower(), getUpper());
  }
  
}