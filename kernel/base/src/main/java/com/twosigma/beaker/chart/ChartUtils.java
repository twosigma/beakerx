/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
package com.twosigma.beaker.chart;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class ChartUtils {

  public static List<Object> convertColors(List colors, String errorMsg) {
    List<Object> clist = new ArrayList<>(colors.size());
    for(Object c : colors){
      if (c instanceof Color) {
        clist.add(c);
      } else if (c instanceof java.awt.Color) {
        clist.add(new Color((java.awt.Color) c));
      } else if (c instanceof List) {
        clist.add(convertColors((List)c, errorMsg));
      } else {
        throw new IllegalArgumentException(errorMsg);
      }
    }
    return clist;
  }

}
