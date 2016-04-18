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

from .chart import Chart

class AbstractChart(Chart):
    def __init__(self):
        super().__init__()
        self.xLowerMargin = 0.05
        self.xUpperMargin = 0.05
        self.xLabel = ""
        self.omitCheckboxes = False

    def _transform (self, out):
        super()._transform(out)
        out['x_lower_margin'] = self.xLowerMargin
        out['x_upper_margin'] = self.xUpperMargin
        # out['xLabel'] = self.xLabel
        out['omit_checkboxes'] = self.omitCheckboxes

