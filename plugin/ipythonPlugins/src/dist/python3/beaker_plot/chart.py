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

from .legend import *
from .utils import *

class Chart:
  def __init__(self, data=None):
    if data is None:
      data = {}

    self.init_width = getValue(data, 'initWidth', 640)
    self.init_height = getValue(data, 'initHeight', 480)
    self.chart_title = getValue(data, 'title')
    self.show_legend = getValue(data, 'showLegend')
    self.use_tool_tip = getValue(data, 'useToolTip', True)
    self.legend_position = getValue(data, 'legendPosition', LegendPosition.Position.TOP_RIGHT)
    self.legend_layout = getValue(data, 'legendLayout', LegendLayout.VERTICAL)


  def _transform(self, out):
    out['init_width'] = self.init_width
    out['init_height'] = self.init_height
    out['chart_title'] = self.chart_title
    out['show_legend'] = self.show_legend
    out['use_tool_tip'] = self.use_tool_tip
    out['legend_position'] = self.legend_position.transform()
    out['legend_layout'] = self.legend_layout.name
