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
package com.twosigma.beakerx.chart.serializer;


import com.twosigma.beakerx.chart.AbstractChart;
import com.fasterxml.jackson.core.JsonGenerator;

import java.io.IOException;

public abstract class AbstractChartSerializer<T extends AbstractChart> extends ChartSerializer<T> {


  public static final String DOMAIN_AXIS_LABEL = "domain_axis_label";
  public static final String Y_LABEL = "y_label";
  public static final String RANGE_AXES = "rangeAxes";
  public static final String OMIT_CHECKBOXES = "omit_checkboxes";
  public static final String Y_AUTO_RANGE_INCLUDES_ZERO = "y_auto_range_includes_zero";
  public static final String Y_LOWER_BOUND = "y_lower_bound";
  public static final String Y_UPPER_BOUND = "y_upper_bound";
  public static final String X_LOWER_MARGIN = "x_lower_margin";
  public static final String X_UPPER_MARGIN = "x_upper_margin";
  public static final String Y_AUTO_RANGE = "y_auto_range";
  public static final String Y_LOWER_MARGIN = "y_lower_margin";
  public static final String Y_UPPER_MARGIN = "y_upper_margin";
  public static final String CROSSHAIR = "crosshair";
  public static final String TIMEZONE = "timezone";
  public static final String LOG_Y = "log_y";

  protected void serialize(T chart, JsonGenerator jgen) throws IOException {

    super.serialize(chart, jgen);

    jgen.writeObjectField(DOMAIN_AXIS_LABEL, chart.getXLabel());
    jgen.writeObjectField(Y_LABEL, chart.getYLabel());
    jgen.writeObjectField(RANGE_AXES, chart.getYAxes());
    jgen.writeObjectField(X_LOWER_MARGIN, chart.getXLowerMargin());
    jgen.writeObjectField(X_UPPER_MARGIN, chart.getXUpperMargin());
    jgen.writeObjectField(Y_AUTO_RANGE, chart.getYAutoRange());
    jgen.writeObjectField(Y_AUTO_RANGE_INCLUDES_ZERO, chart.getYAutoRangeIncludesZero());
    jgen.writeObjectField(Y_LOWER_MARGIN, chart.getYLowerMargin());
    jgen.writeObjectField(Y_UPPER_MARGIN, chart.getYUpperMargin());
    jgen.writeObjectField(Y_LOWER_BOUND, chart.getYLowerBound());
    jgen.writeObjectField(Y_UPPER_BOUND, chart.getYUpperBound());
    jgen.writeObjectField(LOG_Y, chart.getLogY());
    jgen.writeObjectField(TIMEZONE, chart.getTimeZone());
    jgen.writeObjectField(CROSSHAIR, chart.getCrosshair());
    jgen.writeObjectField(OMIT_CHECKBOXES, chart.getOmitCheckboxes());
  }
}
