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

# import plotapi.legend.legendPosition as legendPosition, plotapi.legend.legendLayout as legendLayout

from .legend import legendLayout, legendPosition

class Chart:
    def __init__(self):
        self.initWidth = 640
        self.initHeight = 480
        self.title = ""
        self.showLegend = True
        self.useToolTip = True
        self.legendPosition = legendPosition.LegendPosition()
        self.legendLayout = legendLayout.LegendLayout.VERTICAL

    def _transform (self, out):
        out['init_width'] = self.initWidth
        out['init_height'] = self.initHeight
        out['chart_title'] = self.title
        out['show_legend'] = self.showLegend
        out['use_tool_tip'] = self.useToolTip

