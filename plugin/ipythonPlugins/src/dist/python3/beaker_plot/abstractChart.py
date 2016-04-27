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
  def __init__(self, **kwargs):
    Chart.__init__(self, **kwargs)

    self.yAxis = YAxis(
      autoRange=getValue(kwargs, 'yAutoRange'),
      autoRangeIncludesZero=getValue(kwargs, 'yAutoRangeIncludesZero'),
      lowerMargin=getValue(kwargs, 'yLowerMargin'),
      upperMargin=getValue(kwargs, 'yUpperMargin'),
      lowerBound=getValue(kwargs, 'yLowerBound'),
      upperBound=getValue(kwargs, 'yUpperBound'),
      log=getValue(kwargs, 'yLog'),
      logBase=getValue(kwargs, 'yLogBase')
    )
    self.rangeAxes = getValue(kwargs, 'yAxes', self.yAxis),
    self.domain_axis_label= getValue(kwargs, 'xLabel')
    self.y_label = getValue(kwargs, 'yLabel')
    self.x_lower_margin = getValue(kwargs, 'xLowerMargin', 0.05)
    self.x_uppe_margin = getValue(kwargs, 'xUpperMargin', 0.05)
    self.y_auto_range = getValue(kwargs, 'y_auto_range')
    self.y_auto_range_includes_zero = getValue(kwargs, 'y_auto_range_includes_zero')
    self.y_lower_margin = getValue(kwargs, 'y_lower_margin')
    self.y_upper_margin = getValue(kwargs, 'y_upper_margin')
    self.y_lower_bound = getValue(kwargs, 'y_lower_bound')
    self.y_upper_bound = getValue(kwargs, 'y_upper_bound')
    self.log_y = getValue(kwargs, 'log_y')
    self.omit_checkboxes = getValue(kwargs, 'omitCheckboxes', False)

