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

package com.twosigma.beaker.chart.categoryplot;

import com.twosigma.beaker.chart.AbstractChart;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryGraphics;
import com.twosigma.beaker.chart.xychart.plotitem.PlotOrientationType;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.widgets.chart.InternalPlot;
import com.twosigma.beaker.widgets.internal.InternalWidget;
import com.twosigma.beaker.widgets.internal.InternalWidgetContent;
import com.twosigma.beaker.widgets.internal.InternalWidgetUtils;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CategoryPlot extends AbstractChart implements InternalWidget, InternalPlot {
  private final List<CategoryGraphics> categoryGraphics        = new ArrayList<>();
  private       List<String>           categoryNames           = new ArrayList<>();
  private       PlotOrientationType    orientation             = PlotOrientationType.VERTICAL;
  private       double                 categoryMargin          = 0.2;
  private       double                 categoryNamesLabelAngle = 0;


  private Comm comm;

  public CategoryPlot() {
    this.comm = InternalWidgetUtils.createComm(this, new InternalWidgetContent() {
      @Override
      public void addContent(HashMap<String, Serializable> content) {
        content.put(InternalWidgetUtils.MODEL_NAME, getModelNameValue());
        content.put(InternalWidgetUtils.VIEW_NAME, getViewNameValue());
      }
    });
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  @Override
  public Comm getComm() {
    return this.comm;
  }

  public CategoryPlot leftShift(CategoryGraphics graphics) {
    return add(graphics);
  }

  public List<CategoryGraphics> getGraphics() {
    return this.categoryGraphics;
  }

  public CategoryPlot add(CategoryGraphics graphics) {
    this.categoryGraphics.add(graphics);
    return this;
  }

  public CategoryPlot add(List items) {
    for (Object o : items) {
      if (o instanceof CategoryGraphics) {
        add((CategoryGraphics) o);
      } else {
        super.add(items);
      }
    }
    return this;
  }

  public List<String> getCategoryNames() {
    return categoryNames;
  }

  public CategoryPlot setCategoryNames(List<String> categoryNames) {
    this.categoryNames = categoryNames;
    return this;
  }

  public List<CategoryGraphics> getCategoryGraphics() {
    return categoryGraphics;
  }

  public PlotOrientationType getOrientation() {
    return orientation;
  }

  public void setOrientation(PlotOrientationType orientation) {
    this.orientation = orientation;
  }

  public double getCategoryMargin() {
    return categoryMargin;
  }

  public void setCategoryMargin(double categoryMargin) {
    this.categoryMargin = categoryMargin;
  }

  public double getCategoryNamesLabelAngle() {
    return categoryNamesLabelAngle;
  }

  public void setCategoryNamesLabelAngle(double categoryNamesLabelAngle) {
    this.categoryNamesLabelAngle = categoryNamesLabelAngle;
  }
}
