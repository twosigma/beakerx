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


class ChartDefaultTest(unittest.TestCase):
    def test_type(self):
        object_under_test = Chart(**{})
        self.assertEqual(object_under_test.type, 'Plot')

    def test_default_title(self):
        object_under_test = Chart(**{})
        self.assertEqual(object_under_test.chart_title, '')

    def test_default_initWidth(self):
        object_under_test = Chart(**{})
        self.assertEqual(object_under_test.init_width, 640)

    def test_default_initHeight(self):
        object_under_test = Chart(**{})
        self.assertEqual(object_under_test.init_height, 480)

    def test_default_useToolTip(self):
        object_under_test = Chart(**{})
        self.assertEqual(object_under_test.use_tool_tip, True)

    def test_default_legendPosition(self):
        object_under_test = Chart(**{})
        self.assertEqual(object_under_test.legend_position.position, LegendPosition.Position.TOP_RIGHT)

    def test_default_legendLayout(self):
        object_under_test = Chart(**{})
        self.assertEqual(object_under_test.legend_layout, LegendLayout.VERTICAL)


class ChartSetTest(unittest.TestCase):
    def test_set_title(self):
        object_under_test = Chart(**{'title': 'test'})
        self.assertEqual(object_under_test.chart_title, 'test')

    def test_set_initWidth(self):
        object_under_test = Chart(**{'initWidth': 300})
        self.assertEqual(object_under_test.init_width, 300)

    def test_set_initHeight(self):
        object_under_test = Chart(**{'initHeight': 300})
        self.assertEqual(object_under_test.init_height, 300)

    def test_set_useToolTip(self):
        object_under_test = Chart(**{'useToolTip': False})
        self.assertEqual(object_under_test.use_tool_tip, False)

    def test_set_showLegend(self):
        object_under_test = Chart(**{'showLegend': True})
        self.assertEqual(object_under_test.show_legend, True)

    def test_default_legendPosition(self):
        legend_position = LegendPosition(position=LegendPosition.Position.BOTTOM)
        object_under_test = Chart(**{'legendPosition': legend_position})
        self.assertEqual(object_under_test.legend_position.position, LegendPosition.Position.BOTTOM)

    def test_default_legendLayout(self):
        object_under_test = Chart(**{'legendLayout': LegendLayout.HORIZONTAL})
        self.assertEqual(object_under_test.legend_layout, LegendLayout.HORIZONTAL)

    def test_exception_set_unknown_property(self):
        self.assertRaises(SyntaxError, XYChart, **{'unknown': 'something'})
