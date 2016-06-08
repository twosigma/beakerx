/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.chart.xychart.plotitem;

import org.apache.cxf.common.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class XYStacker {

  public static List<BasedXYGraphics> stack(List<BasedXYGraphics> graphicsList) {
    return transformGraphicsList(graphicsList);
  }

  private static List<BasedXYGraphics> transformGraphicsList(List<BasedXYGraphics> graphicsList) {
    if (CollectionUtils.isEmpty(graphicsList) || graphicsList.size() == 1){
      return graphicsList;
    } else {
      BasedXYGraphics graphicsWithMaxElements = Collections.max(graphicsList, new Comparator<BasedXYGraphics>() {
        @Override
        public int compare(BasedXYGraphics o1, BasedXYGraphics o2) {
          return o1.getY().size() - o2.getY().size();
        }
      });
      List<BasedXYGraphics> stackedList = new ArrayList<BasedXYGraphics>(graphicsList.size());
      padYs(graphicsList.get(0), graphicsWithMaxElements);
      stackedList.add(graphicsList.get(0));
      for (int gIndex = 1; gIndex < graphicsList.size(); gIndex++) {
        BasedXYGraphics current = graphicsList.get(gIndex);
        padYs(current, graphicsWithMaxElements);
        BasedXYGraphics previous = graphicsList.get(gIndex - 1);
        List<Number> currentYs = current.getY();
        List<Number> previousYs = previous.getY();

        for (int yIndex = 0; yIndex < currentYs.size(); yIndex++) {
          currentYs.set(yIndex, currentYs.get(yIndex).doubleValue() + previousYs.get(yIndex).doubleValue());
        }
        current.setBase(previousYs);
        stackedList.add(current);
      }
      return stackedList;
    }
  }

  private static void padYs(BasedXYGraphics graphics, BasedXYGraphics graphicsWithMaxElements) {
    int maxSize = graphicsWithMaxElements.getY().size();
    int currentSize = graphics.getY().size();
    int diff = maxSize - currentSize;
    if (diff > 0) {
      Number[] ys = new Number[diff];
      Arrays.fill(ys, graphics.getY().get(currentSize - 1));
      graphics.getY().addAll(Arrays.asList(ys));
      List<Number> xs = graphics.getX();
      if (xs != null && xs.size() != maxSize) {
        if (graphicsWithMaxElements.getX() != null) {
          xs.addAll(graphicsWithMaxElements.getX().subList(currentSize, maxSize));
        } else {
          Number lastX = xs.get(currentSize - 1);
          for (int i = 0; i < diff; ++i) {
            xs.add(lastX.doubleValue() + i);
          }
        }
      }
    }
  }

}
