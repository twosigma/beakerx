# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
from beakerx.plot import *


class HeatChartDefaultTest(unittest.TestCase):
    def test_default_xLowerMargin(self):
        object_under_test = HeatChart(**{})
        self.assertEqual(object_under_test.x_lower_margin, 0.0)

    def test_default_xUpperMargin(self):
        object_under_test = HeatChart(**{})
        self.assertEqual(object_under_test.x_upper_margin, 0.0)

    def test_default_yLowerMargin(self):
        object_under_test = HeatChart(**{})
        self.assertEqual(object_under_test.x_lower_margin, 0.0)

    def test_default_yUpperMargin(self):
        object_under_test = HeatChart(**{})
        self.assertEqual(object_under_test.x_upper_margin, 0.0)

    def test_default_legendPosition(self):
        object_under_test = HeatChart(**{})
        self.assertEqual(object_under_test.legend_position.position, LegendPosition.Position.BOTTOM_RIGHT)

    def test_default_legendLayout(self):
        object_under_test = HeatChart(**{})
        self.assertEqual(object_under_test.legend_layout, LegendLayout.HORIZONTAL)

    def test_default_color(self):
        object_under_test = HeatChart(**{})
        self.assertIsInstance(object_under_test.color, list)
        self.assertEqual(len(object_under_test.color), 3)


class HeatChartSetTest(unittest.TestCase):
    def test_set_legendPosition(self):
        legend_position = LegendPosition(position=LegendPosition.Position.BOTTOM)
        object_under_test = HeatChart(**{'legendPosition': legend_position})
        self.assertEqual(object_under_test.legend_position.position, LegendPosition.Position.BOTTOM_RIGHT)

    def test_set_legendLayout(self):
        object_under_test = HeatChart(**{'legendLayout': LegendLayout.HORIZONTAL})
        self.assertEqual(object_under_test.legend_layout, LegendLayout.HORIZONTAL)