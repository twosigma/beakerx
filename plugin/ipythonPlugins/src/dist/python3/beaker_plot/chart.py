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
    self.legend_position = getValue(kwargs, 'legendPosition', LegendPosition.Position.TOP_RIGHT)
    self.legend_layout = getValue(kwargs, 'legendLayout', LegendLayout.VERTICAL)


class AbstractChart(Chart):
  def __init__(self, **kwargs):
    Chart.__init__(self, **kwargs)

    self.rangeAxes = getValue(kwargs, 'yAxes', [])
    if len(self.rangeAxes) == 0:
      self.rangeAxes.append(YAxis(
        autoRange=getValue(kwargs, 'yAutoRange'),
        autoRangeIncludesZero=getValue(kwargs, 'yAutoRangeIncludesZero'),
        lowerMargin=getValue(kwargs, 'yLowerMargin'),
        upperMargin=getValue(kwargs, 'yUpperMargin'),
        lowerBound=getValue(kwargs, 'yLowerBound'),
        upperBound=getValue(kwargs, 'yUpperBound'),
        log=getValue(kwargs, 'yLog'),
        logBase=getValue(kwargs, 'yLogBase')
      ))
    self.domain_axis_label = getValue(kwargs, 'xLabel')
    self.y_label = getValue(kwargs, 'yLabel')
    self.x_lower_margin = getValue(kwargs, 'xLowerMargin', 0.05)
    self.x_uppe_margin = getValue(kwargs, 'xUpperMargin', 0.05)
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


class Plot(XYChart):
  def __init__(self, **kwargs):
    XYChart.__init__(self, **kwargs)

class TimePlot(XYChart):
  def __init__(self, **kwargs):
    XYChart.__init__(self, **kwargs)

class NanoPlot(TimePlot):
  def __init__(self, **kwargs):
    TimePlot.__init__(self, **kwargs)


def parseJSON(out):
  return json.loads(out, object_hook=transformBack)


def transformBack(obj):
  if 'type' in obj:
    res = eval(obj['type'])()
    res.transformBack(obj)
    return res
  return obj
