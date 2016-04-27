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

from beaker_plot.abstractChart import AbstractChart
from beaker_plot.utils import *
from beaker_plot.plotitem import *


class XYChart(AbstractChart):
  def __init__(self, data=None):
    if data is None:
      data = {}
    AbstractChart.__init__(self, data)

    self.graphics_list = getValue(data, 'graphics', [])
    self.constant_lines = getValue(data, 'constantLines', [])
    self.constant_bands = getValue(data, 'constantBands', [])
    self.texts = getValue(data, 'texts', [])
    self.x_auto_range = getValue(data, 'xAutoRange', True)
    self.x_lower_bound = getValue(data, 'xLowerBound', 0)
    self.x_upper_bound = getValue(data, 'xUpperBound', 0)
    self.log_x = getValue(data, 'logX', False)
    self.x_log_base = getValue(data, 'xLogBase', 10)
    self.lodThreshold = getValue(data, 'lodThreshold')


