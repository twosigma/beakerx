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
from random import randint

import pandas as pd

from ..chart import HeatMap, XYChart
from ..legend import LegendPosition


class TestHeatMap(unittest.TestCase):

    def test_empty_data(self):
        # given
        # when
        widget = HeatMap(data=[])
        # then
        model = widget.model
        self.assertFalse(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 0)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], 0)
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], widget.rows_limit)

    def test_xLowerMargin(self):
        # given
        # when
        widget = HeatMap(data=[], xLowerMargin=1.0)
        # then
        model = widget.model
        self.assertEqual(model["x_lower_margin"], 1.0)

    def test_yLowerMargin(self):
        # given
        # when
        widget = HeatMap(data=[], yLowerMargin=2.0)
        # then
        model = widget.model
        self.assertEqual(model["y_lower_margin"], 2.0)

    def test_yUpperMargin(self):
        # given
        # when
        widget = HeatMap(data=[], yUpperMargin=3.0)
        # then
        model = widget.model
        self.assertEqual(model["y_upper_margin"], 3.0)

    def test_should_not_limit_data(self):
        # given
        maxdepth = 10
        data = [[randint(1, 100) for x in range(maxdepth)] for y in range(maxdepth)]
        # when
        widget = HeatMap(data=data)
        # then
        model = widget.model
        self.assertFalse(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 100)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], 100)
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], widget.rows_limit)

    def test_should_limit_data(self):
        # given
        maxdepth = 1001
        data = [[randint(1, 100) for x in range(maxdepth)] for y in range(maxdepth)]
        # when
        widget = HeatMap(100, 10, data=data)
        # then
        model = widget.model
        self.assertTrue(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 1002001)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], 10201)
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], 100)

    def test_support_data_frame_series(self):
        # given
        maxdepth = 1001
        data = [[randint(1, 100) for x in range(maxdepth)] for y in range(maxdepth)]
        heat_map_df = pd.DataFrame({'data': data})
        # when
        widget = HeatMap(100, 10, data=heat_map_df['data'])
        # then
        self.assertEqual(len(widget.model['graphics_list'][0]), 101)
        model = widget.model
        self.assertTrue(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 1002001)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], 10201)
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], 100)

    def test_support_data_frame(self):
        # given
        maxdepth = 1001
        data = [[randint(1, 100) for x in range(maxdepth)] for y in range(maxdepth)]
        heat_map_df = pd.DataFrame(data)
        # when
        widget = HeatMap(100, 10, data=heat_map_df)
        # then
        model = widget.model
        self.assertTrue(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 1002001)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], 10201)
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], 100)

    def test_legend_default_position(self):
        # given
        # when
        widget = HeatMap(data=[], legendPosition=LegendPosition.TOP)
        # then
        model = widget.model
        self.assertEqual(model['legend_position']['position'], "TOP")
        self.assertEqual(model['legend_position']['type'], "LegendPosition")

    def test_legend_default_layout(self):
        # given
        # when
        widget = HeatMap(data=[])
        # then
        model = widget.model
        self.assertEqual(model['legend_layout'], "HORIZONTAL")
