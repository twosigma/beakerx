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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.widget.bool.Checkbox;
import com.twosigma.beakerx.widget.floats.FloatSlider;
import com.twosigma.beakerx.widget.integers.IntSlider;
import com.twosigma.beakerx.widget.selections.Dropdown;
import com.twosigma.beakerx.widget.strings.Text;

public class InteractiveBase {

  private static final Logger logger = LoggerFactory.getLogger(InteractiveBase.class);
  
  
  /**
   * Build a ValueWidget instance given an abbreviation or Widget.
   * Similar but not equivalent of {@code ipywidgets/widgets/interaction.py#widgets_from_abbreviations}
   * 
   * @param input
   * @return
   */
  protected static List<ValueWidget<?>> widgetsFromAbbreviations(Object ...input){
    List<ValueWidget<?>> ret = new ArrayList<>();
    for (Object param : input) {
      ValueWidget<?> widget = getWidgetFromAbbrev(param);
      if(widget == null){
        String text = "";
        if(input!= null && input[0] != null){
          text = input.getClass().getSimpleName();
        }else{
          text = "null";
        }
        throw new RuntimeException(text + " cannot be transformed to a widget");
      }else if(!(widget instanceof ValueWidget)){
        throw new RuntimeException(input.getClass().getSimpleName() + " is not a ValueWidget");
      }
      ret.add(widget);
    }
    logger.info("total " + ret.size() + " widgets was created");
    return ret;
  }
  
  /**
   * Build a ValueWidget instance given an abbreviation or Widget.
   * Similar but not equivalent of {@code ipywidgets/widgets/interaction.py#widget_from_abbrev}
   * 
   * @param input
   * @return
   */
  protected static ValueWidget<?> getWidgetFromAbbrev(Object ...input){
    ValueWidget<?> ret = null;
    if(input != null && input.length > 0){
      ret = widgetFromTuple(input);
      if(ret == null){
        ret = widgetFromSingleValue(input[0]);
      }
      if(ret == null){
        ret = widgetFromIterable(input[0]);
      }
    }
    return ret;
  }
  
  /**
   * Make widgets from a tuple abbreviation.
   * Equivalent of {@code ipywidgets/widgets/interaction.py#widget_from_tuple}
   * 
   * @param input
   * @return
   */
  protected static ValueWidget<?> widgetFromTuple(Object ...input){
    ValueWidget<?> ret = null;
    if(input != null && input.length > 0){
      boolean isFloat = isFloat(input[0]);
      boolean isInt = isInt(input[0]);
      if(input.length == 2){
        if(isFloat){
          Double[] minMaxValue = getDoubleArray(getMinMaxValue((Double)input[0], (Double)input[1], null));
          FloatSlider witget = new FloatSlider();
          witget.setMin(minMaxValue[0]);
          witget.setMax(minMaxValue[1]);
          witget.setValue(minMaxValue[2]);
          ret = witget;
        }else if(isInt){
          Integer[] minMaxValue = getIntArray(getMinMaxValue((Integer)input[0], (Integer)input[1], null));
          IntSlider witget = new IntSlider();
          witget.setMin(minMaxValue[0]);
          witget.setMax(minMaxValue[1]);
          witget.setValue(minMaxValue[2]);
          ret = witget;
        }
      }else if(input.length > 2){
        if(isFloat){
          Double step = (Double)input[2];
          if((Double)input[2] <= 0){
            throw new RuntimeException("step must be >= 0, not " +  step);
          }
          Double[] minMaxValue = getDoubleArray(getMinMaxValue((Double)input[0], (Double)input[1], null));
          FloatSlider witget = new FloatSlider();
          witget.setMin(minMaxValue[0]);
          witget.setMax(minMaxValue[1]);
          witget.setValue(minMaxValue[2]);
          witget.setStep(step);
          ret = witget;
        }else if(isInt){
          Integer step = (Integer)input[2];
          if((Integer)input[2] <= 0){
            throw new RuntimeException("step must be >= 0, not " +  step);
          }
          Integer[] minMaxValue = getIntArray(getMinMaxValue((Integer)input[0], (Integer)input[1], null));
          IntSlider witget = new IntSlider();
          witget.setMin(minMaxValue[0]);
          witget.setMax(minMaxValue[1]);
          witget.setValue(minMaxValue[2]);
          witget.setStep(step);
          ret = witget;
        }
      }
    }
    return ret;
  }
  
  /**
   * Make widgets from single values, which can be used as parameter defaults.
   * Equivalent of {@code ipywidgets/widgets/interaction.py#widget_from_tuple}
   * 
   * @param o
   * @return
   */
  protected static ValueWidget<?> widgetFromSingleValue(Object o){
    ValueWidget<?> ret = null;
    if (o instanceof String){
      Text witget = new Text();
      witget.setValue((String)o);
      ret = witget;
    }else if (o instanceof Boolean){
      Checkbox witget = new Checkbox();
      witget.setValue((Boolean)o);
      ret = witget;
    }else if (isInt(o)){
      Integer value = (Integer)o;
      Integer[] result = getIntArray(getMinMaxValue(null, null, value));
      IntSlider witget = new IntSlider();
      witget.setMin(result[0]);
      witget.setMax(result[1]);
      witget.setValue(value);
      ret = witget;
    }else if (isFloat(o)){
      Double value = (Double)o;
      Double[] result = getDoubleArray(getMinMaxValue(null, null, value));
      FloatSlider witget = new FloatSlider();
      witget.setMin(result[0]);
      witget.setMax(result[1]);
      witget.setValue(value);
      ret = witget;
    }
    return ret;
  }
  
  /**
   * Make widgets from an iterable. This should not be done for a string or tuple.
   * Equivalent of {@code ipywidgets/widgets/interaction.py#widget_from_iterable}
   * 
   * @param o
   * @return
   */
  protected static Dropdown widgetFromIterable(Object o){
    Dropdown ret = null;
    if (o instanceof Collection<?>){
      Collection<Object> value = (Collection<Object>)o;
      ret = new Dropdown();
      ret.setOptions(value);
    }else if (o instanceof Object[]){
      Object[] value = (Object[])o;
      ret = new Dropdown();
      ret.setOptions(value);
    }else if (o instanceof Map<?,?>){
      Map<Object,Object> value = (Map<Object,Object>)o;
      ret = new Dropdown();
      ret.setOptions(value.values());
    }else{
      List<Object> value = new ArrayList<>(1);
      value.add(o);
      ret = new Dropdown();
      ret.setOptions(value);
    }
    return ret;
  }
  
  
  /**
   * Return min, max, value given input values with possible None.
   * Equivalent of {@code ipywidgets/widgets/interaction.py#get_min_max_value}
   * 
   * @param min
   * @param max
   * @param value
   * @return array: min max value
   */
  protected static Number[] getMinMaxValue(Number min, Number max, Number value){
    Number[] ret = new Number[3];
    if(value == null){
      if( min == null || max == null){
        throw new RuntimeException("unable to infer range, value from: (" + min + ", " + max + ", " + value + ")");
      }
      if(isAllInt(min,max)){
        int diff = (int)max - (int)min;
        ret[2] = (Integer) (int)min + (diff / 2);
      }else{
        double diff = (double)max - (double)min;
        ret[2] = (Double) (double)min + (diff / 2);
      }
      ret[0] = min;
      ret[1] = max;

    }else{
      Number[] vrange  = new Number[2];
      double dValue = (value instanceof Integer) ? ((Integer) value).doubleValue() : (double) value;
      boolean isInt = isAllInt(min, max, value);
      // This gives (0, 1) of the correct type
      if(dValue == 0){
        if(isInt){
          vrange[0] = (int)dValue;
          vrange[1] = (int)dValue + 1;
        }else{
          vrange[0] = dValue;
          vrange[1] = dValue +1;
        }
      }else if(dValue > 0){
        if(isInt){
          vrange[0] = (int)dValue*-1;
          vrange[1] = (int)dValue*3;
        }else{
          vrange[0] = dValue*-1;
          vrange[1] = dValue*3;
        }
      }else {
        if(isInt){
          vrange[0] = (int)(dValue*3);
          vrange[1] = (int)(dValue*-1);
        }else{
          vrange[0] = dValue*3;
          vrange[1] = dValue*-1;
        }
      }

      if(min == null){
        ret[0] = vrange[0];
      }
      if(max == null){
        ret[1] = vrange[1];
      }
      ret[2] = value;
    }
    return ret;
  }
  
  /**
   * No equivalent in python. Help method.
   * 
   * @param input
   * @return
   */
  protected static Integer[] getIntArray(Number[] input){
    return Arrays.copyOf(input, input.length, Integer[].class);
  }
  
  /**
   * No equivalent in python. Help method.
   * 
   * @param input
   * @return
   */
  protected static Double[] getDoubleArray(Number[] input){
    return Arrays.copyOf(input, input.length, Double[].class);
  }
  
  /**
   * No equivalent in python. Help method.
   * 
   * @param o
   * @return
   */
  protected static boolean isAllInt(Number ... o){
    boolean ret = true;
    for (Number number : o) {
      if(number != null){
        ret = isInt(number);
        if(!ret){
          break;
        }
      }
    }
    return ret;
  }
  
  /**
   * No equivalent in python. Help method.
   * 
   * @param o
   * @return {@code (o instanceof Integer || o instanceof Short || o instanceof Byte)}
   */
  protected static boolean isInt(Object o){
    return (o instanceof Integer || o instanceof Short || o instanceof Byte);
  }
  
  /**
   * No equivalent in python. Help method.
   * 
   * @param o
   * @return {@code (o instanceof Double || o instanceof Float)}
   */
  protected static boolean isFloat(Object o){
    return (o instanceof Double || o instanceof Float);
  }
  
}