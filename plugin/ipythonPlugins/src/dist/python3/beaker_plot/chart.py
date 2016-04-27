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

from beaker_plot.legend import *
from beaker_plot.utils import *

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

