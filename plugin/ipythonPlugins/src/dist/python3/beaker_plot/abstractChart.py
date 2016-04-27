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

from beaker_plot.chart import Chart
from beaker_plot.plotitem import *
from beaker_plot.utils import *


class AbstractChart(Chart):
  def __init__(self, data=None):
    if data is None:
      data = {}
    Chart.__init__(self, data)

    self.yAxis = YAxis({
      "autoRange": getValue(data, 'yAutoRange'),
      "autoRangeIncludesZero": getValue(data, 'yAutoRangeIncludesZero'),
      "lowerMargin": getValue(data, 'yLowerMargin'),
      "upperMargin": getValue(data, 'yUpperMargin'),
      "lowerBound": getValue(data, 'yLowerBound'),
      "upperBound": getValue(data, 'yUpperBound'),
      "log": getValue(data, 'yLog'),
      "logBase": getValue(data, 'yLogBase')
    })
    self.rangeAxes = getValue(data, 'yAxes', self.yAxis),
    self.domain_axis_label= getValue(data, 'xLabel')
    self.y_label = getValue(data, 'yLabel')
    self.x_lower_margin = getValue(data, 'xLowerMargin', 0.05)
    self.x_uppe_margin = getValue(data, 'xUpperMargin', 0.05)
    self.y_auto_range = getValue(data, 'y_auto_range')
    self.y_auto_range_includes_zero = getValue(data, 'y_auto_range_includes_zero')
    self.y_lower_margin = getValue(data, 'y_lower_margin')
    self.y_upper_margin = getValue(data, 'y_upper_margin')
    self.y_lower_bound = getValue(data, 'y_lower_bound')
    self.y_upper_bound = getValue(data, 'y_upper_bound')
    self.log_y = getValue(data, 'log_y')
    self.omit_checkboxes = getValue(data, 'omitCheckboxes', False)

