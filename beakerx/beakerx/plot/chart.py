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

from beakerx.plot.legend import LegendPosition, LegendLayout
from beakerx.plot.utils import BaseObject, getValue
from beakerx.plot.plotitem import *

from IPython.display import display
from ipywidgets import DOMWidget, register
from traitlets import Unicode, Dict


class Chart(BaseObject):
  def __init__(self, **kwargs):
    super(Chart, self).__init__(**kwargs)
    self.init_width = getValue(kwargs, 'initWidth', 640)
    self.init_height = getValue(kwargs, 'initHeight', 480)
    self.chart_title = getValue(kwargs, 'title')
    self.show_legend = getValue(kwargs, 'showLegend')
    self.use_tool_tip = getValue(kwargs, 'useToolTip', True)
    self.legend_position = getValue(kwargs, 'legendPosition', LegendPosition())
    self.legend_layout = getValue(kwargs, 'legendLayout', LegendLayout.VERTICAL)


class AbstractChart(Chart):
  def __init__(self, **kwargs):
    super(AbstractChart, self).__init__(**kwargs)
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
    self.log_y = getValue(kwargs, 'logY', False)
    self.omit_checkboxes = getValue(kwargs, 'omitCheckboxes', False)
    self.crosshair = getValue(kwargs, 'crosshair')
    self.timezone = getValue(kwargs, 'timeZone')


class XYChart(AbstractChart):
  def __init__(self, **kwargs):
    super(XYChart, self).__init__(**kwargs)
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
    if isinstance(item, YAxis):
      self.rangeAxes.append(item)
    elif isinstance(item, XYGraphics):
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
    return self

class CombinedChart(BaseObject):
  def __init__(self, **kwargs):
    super(CombinedChart, self).__init__(**kwargs)
    self.init_width = getValue(kwargs, 'initWidth', 640)
    self.init_height = getValue(kwargs, 'initHeight', 480)
    self.title = getValue(kwargs, 'title')
    self.x_label = getValue(kwargs, 'xLabel', 'Linear')
    self.plots = getValue(kwargs, 'plots', [])
    self.weights = getValue(kwargs, 'weights', [])
    self.version = 'groovy'
    self.type= 'CombinedPlot'
    self.y_tickLabels_visible = True
    self.x_tickLabels_visible = True
    self.plot_type = 'Plot'

class Plot(DOMWidget):
  _view_name = Unicode('PlotView').tag(sync=True)
  _model_name = Unicode('PlotModel').tag(sync=True)
  _view_module = Unicode('beakerx').tag(sync=True)
  _model_module = Unicode('beakerx').tag(sync=True)
  model = Dict().tag(sync=True)

  def __init__(self, **kwargs):
    super(Plot, self).__init__(**kwargs)
    self.chart = XYChart(**kwargs)
    self.model = self.chart.transform()

  def add(self, item):
    self.chart.add(item)
    self.model = self.chart.transform()
    return self

  def getYAxes(self):
    return self.chart.rangeAxes

class TimePlot(Plot):
  def __init__(self, **kwargs):
    super(TimePlot, self).__init__(**kwargs)
    self.chart.type = 'TimePlot'

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

class NanoPlot(TimePlot):
  def __init__(self, **kwargs):
    super(NanoPlot, self).__init__(**kwargs)
    self.chart.type = 'NanoPlot'

  def add(self, item):
    super(NanoPlot, self).add(item)
    converted = []
    for l in self.chart.graphics_list:
      for x in l.x:
        converted.append(str(x))
      l.x = converted
    self.model = self.chart.transform()
    return self


class SimpleTimePlot(TimePlot):
  def __init__(self, *args, **kwargs):
    super(SimpleTimePlot, self).__init__(**kwargs)
    self.chart.type = 'TimePlot'
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
      dataColumnsNames.extend(list(tableData[0]))

      for row in tableData:
        x = row[timeColumn]
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

class CombinedPlot(DOMWidget):
  _view_name = Unicode('PlotView').tag(sync=True)
  _model_name = Unicode('PlotModel').tag(sync=True)
  _view_module = Unicode('beakerx').tag(sync=True)
  _model_module = Unicode('beakerx').tag(sync=True)
  model = Dict().tag(sync=True)

  def __init__(self, **kwargs):
    super(CombinedPlot, self).__init__(**kwargs)
    self.chart = CombinedChart(**kwargs)
    self.model = self.chart.transform()

  def add(self, item, weight):
    if isinstance(item.chart, XYChart):
      self.chart.plots.append(item.chart)
      self.chart.weights.append(weight)
    elif isinstance(item, list):
      for elem in item:
        self.chart.add(elem.chart, 1)
    else:
      raise Exception('CombinedPlot takes XYChart or List of XYChart')

    self.model = self.chart.transform()
    return self

def parseJSON(out):
  return json.loads(out, object_hook=transformBack)

def transformBack(obj):
  if 'type' in obj:
    res = eval(obj['type'])()
    res.transformBack(obj)
    return res
  return obj
