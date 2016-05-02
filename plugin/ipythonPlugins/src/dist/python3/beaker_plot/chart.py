# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import json

from datetime import datetime

from beaker_plot.legend import *
from beaker_plot.utils import *
from beaker_plot.plotitem import *


class Chart(BaseObject):
  def __init__(self, **kwargs):
    BaseObject.__init__(self)
    self.init_width = getValue(kwargs, 'initWidth', 640)
    self.init_height = getValue(kwargs, 'initHeight', 480)
    self.chart_title = getValue(kwargs, 'title')
    self.show_legend = getValue(kwargs, 'showLegend')
    self.use_tool_tip = getValue(kwargs, 'useToolTip', True)
    self.legend_position = getValue(kwargs, 'legendPosition', LegendPosition())
    self.legend_layout = getValue(kwargs, 'legendLayout', LegendLayout.VERTICAL)


class AbstractChart(Chart):
  def __init__(self, **kwargs):
    Chart.__init__(self, **kwargs)

    self.rangeAxes = getValue(kwargs, 'yAxes', [])
    if len(self.rangeAxes) == 0:
      self.rangeAxes.append(YAxis(**kwargs))
    self.domain_axis_label = getValue(kwargs, 'xLabel')
    self.y_label = getValue(kwargs, 'yLabel')
    self.x_lower_margin = getValue(kwargs, 'xLowerMargin', 0.05)
    self.x_upper_margin = getValue(kwargs, 'xUpperMargin', 0.05)
    self.y_auto_range = getValue(kwargs, 'yAutoRange')
    self.y_auto_range_includes_zero = getValue(kwargs, 'yAutoRangeIncludesZero')
    self.y_lower_margin = getValue(kwargs, 'yLowerMargin')
    self.y_upper_margin = getValue(kwargs, 'yUpperMargin')
    self.y_lower_bound = getValue(kwargs, 'yLowerBound')
    self.y_upper_bound = getValue(kwargs, 'yUpperBound')
    self.log_y = getValue(kwargs, 'logY')
    self.omit_checkboxes = getValue(kwargs, 'omitCheckboxes', False)
    self.crosshair = getValue(kwargs, 'crosshair')
    self.timezone = getValue(kwargs, 'timeZone')


class XYChart(AbstractChart):
  def __init__(self, **kwargs):
    AbstractChart.__init__(self, **kwargs)
    self.graphics_list = getValue(kwargs, 'graphics', [])
    self.constant_lines = getValue(kwargs, 'constantLines', [])
    self.constant_bands = getValue(kwargs, 'constantBands', [])
    self.texts = getValue(kwargs, 'texts', [])
    self.x_auto_range = getValue(kwargs, 'xAutoRange', True)
    self.x_lower_bound = getValue(kwargs, 'xLowerBound', 0)
    self.x_upper_bound = getValue(kwargs, 'xUpperBound', 0)
    self.log_x = getValue(kwargs, 'logX', False)
    self.x_log_base = getValue(kwargs, 'xLogBase', 10)
    self.lodThreshold = getValue(kwargs, 'lodThreshold')

  def add(self, item):
    if isinstance(item, XYGraphics):
      self.graphics_list.append(item)
    elif isinstance(item, Text):
      self.texts.append(item)
    elif isinstance(item, ConstantLine):
      self.constant_lines.append(item)
    elif isinstance(item, ConstantBand):
      self.constant_bands.append(item)
    elif isinstance(item, list):
      for elem in item:
        self.add(elem)
    elif isinstance(item, YAxis):
      self.rangeAxes.append(item)
    return self;


class Plot(XYChart):
  def __init__(self, **kwargs):
    XYChart.__init__(self, **kwargs)


class TimePlot(XYChart):
  def __init__(self, **kwargs):
    XYChart.__init__(self, **kwargs)


class NanoPlot(TimePlot):
  def __init__(self, **kwargs):
    TimePlot.__init__(self, **kwargs)

  def transform(self):
    for graphics in self.graphics_list:
      graphics.x = [str(x) for x in graphics.x]
    result = super().transform()
    for graphics in self.graphics_list:
      graphics.x = [int(x) for x in graphics.x]
    return result


class CombinedPlot(BaseObject):
  def __init__(self, **kwargs):
    BaseObject.__init__(self)
    self.init_width = getValue(kwargs, 'initWidth', 640)
    self.init_height = getValue(kwargs, 'initHeight', 480)
    self.title = getValue(kwargs, 'title')
    self.x_label = getValue(kwargs, 'xLabel')
    self.plots = getValue(kwargs, 'plots', [])
    self.weights = getValue(kwargs, 'weights', [])
    self.version = 'groovy'

  def add(self, item, weight):
    if isinstance(item, XYChart):
      self.plots.append(item)
      self.weights.append(weight)
    elif isinstance(item, list):
      for elem in item:
        self.add(elem, 1)
    else:
      raise Exception('CombinedPlot takes XYChart or List of XYChart')

    return self


class SimpleTimePlot(TimePlot):
  def __init__(self, *args, **kwargs):
    TimePlot.__init__(self, **kwargs)

    self.type = 'TimePlot'
    self.use_tool_tip = True
    self.show_legend = True
    self.domain_axis_label = 'Time'

    displayNames = getValue(kwargs, 'displayNames')
    displayLines = getValue(kwargs, 'displayLines', True)
    displayPoints = getValue(kwargs, 'displayPoints', False)
    timeColumn = getValue(kwargs, 'timeColumn', 'time')
    colors = getValue(kwargs, 'colors')

    if len(args) > 0:
      tableData = args[0]
    else:
      tableData = []

    if len(args) == 2:
      columnNames = args[1]
    else:
      columnNames = []

    xs = []
    yss = []
    dataColumnsNames = []

    if tableData is not None and columnNames is not None:
      dataColumnsNames.extend(list(tableData[0].keys()))

      for row in tableData:
        x = row[timeColumn]
        if isinstance(x, datetime):
          x = date_time_2_millis(x)
        xs.append(x)

        for idx in range(len(columnNames)):
          column = columnNames[idx]
          if (idx >= len(yss)):
            yss.append([])

          yss[idx].append(row[column])

      colors = self.getChartColors(columnNames, colors)

      for i in range(len(yss)):
        ys = yss[i]
        if displayLines is True:
          line = Line(x=xs, y=ys)

          if displayNames is not None and i < len(displayNames):
            line.display_name = displayNames[i]
          else:
            line.display_name = columnNames[i]

          if i < len(colors):
            line.color = colors[i]

          self.add(line)

        if displayPoints is True:
          points = Points(x=xs, y=ys)

          if displayNames is not None and i < len(displayNames):
            points.display_name = displayNames[i]
          else:
            points.display_name = columnNames[i]

          if i < len(colors):
            points.color = colors[i]

          self.add(points)

  def getChartColors(self, columnNames, colors):

    chartColors = []
    if colors is not None:
      for i in range(len(columnNames)):
        if i < len(colors):
          chartColors.append(self.createChartColor(colors[i]))

    return chartColors

  def createChartColor(self, color):
    if isinstance(color, list):
      try:
        return Color(color[0], color[1], color[2])
      except  Exception:
        raise Exception("Color list too short")
    else:
      return color


def parseJSON(out):
  return json.loads(out, object_hook=transformBack)


def transformBack(obj):
  if 'type' in obj:
    res = eval(obj['type'])()
    res.transformBack(obj)
    return res
  return obj
