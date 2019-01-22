# Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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


import unittest

import pandas as pd

from ..chart import Plot
from ..plotitem import Area, Stems


class TestSupportDataFrameInPlot(unittest.TestCase):

    def test_data_frame_base_attribute_for_area(self):
        # given
        x = [1, 3, 5, 7, 10]
        y = [100, 120, 90, 100, 80]
        base = [50, 60, 45, 50, 40]
        plot_df = pd.DataFrame({'x': x, 'y': y, 'base': base})
        # when
        plot = Plot(title='Areas') \
            .add(Area(displayName="Area",
                      x=plot_df.x,
                      y=plot_df.y,
                      base=plot_df.base,
                      width=1))

        # then
        area = plot.model['graphics_list'][0]
        self.assertEqual(area['bases'], base)

    def test_data_frame_base_attribute_for_stems(self):
        # given
        x = [1, 3, 5, 7, 10]
        y = [100, 120, 90, 100, 80]
        base = [50, 60, 45, 50, 40]
        plot_df = pd.DataFrame({'x': x, 'y': y, 'base': base})
        # when
        plot = Plot(title='Areas') \
            .add(Stems(displayName="Area",
                      x=plot_df.x,
                      y=plot_df.y,
                      base=plot_df.base,
                      width=1))

        # then
        area = plot.model['graphics_list'][0]
        self.assertEqual(area['bases'], base)

