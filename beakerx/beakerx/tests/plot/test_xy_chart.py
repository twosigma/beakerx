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


class XYChartDefaultTest(unittest.TestCase):
    def test_type(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.type, 'Plot')

    def test_default_graphics(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.graphics_list, [])

    def test_default_constantBands(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.constant_bands, [])

    def test_default_constantLines(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.constant_lines, [])

    def test_default_texts(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.texts, [])

    def test_default_xAutoRange(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.x_auto_range, True)

    def test_default_xLowerBound(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.x_lower_bound, 0)

    def test_default_xUpperBound(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.x_upper_bound, 0)

    def test_default_logX(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.log_x, False)

    def test_default_xLogBase(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.x_log_base, 10)


class XYChartSetTest(unittest.TestCase):
    def test_type(self):
        object_under_test = XYChart(**{})
        self.assertEqual(object_under_test.type, 'Plot')

    def test_set_graphics(self):
        graphics = [Line()]
        object_under_test = XYChart(**{'graphics': graphics})
        self.assertEqual(object_under_test.graphics_list, graphics)

    def test_set_constantBands(self):
        bands = [ConstantBand()]
        object_under_test = XYChart(**{'constantBands': bands})
        self.assertEqual(object_under_test.constant_bands, bands)

    def test_set_constantLines(self):
        lines = [ConstantLine()]
        object_under_test = XYChart(**{'constantLines': lines})
        self.assertEqual(object_under_test.constant_lines, lines)

    def test_set_texts(self):
        object_under_test = XYChart(**{'texts': ['zero', 'one']})
        self.assertEqual(len(object_under_test.texts), 2)
        self.assertEqual(object_under_test.texts[0], 'zero')
        self.assertEqual(object_under_test.texts[1], 'one')

    def test_set_xAutoRange(self):
        object_under_test = XYChart(**{'xAutoRange': False})
        self.assertEqual(object_under_test.x_auto_range, False)

    def test_set_xLowerBound(self):
        object_under_test = XYChart(**{'xLowerBound': 1})
        self.assertEqual(object_under_test.x_lower_bound, 1)

    def test_set_xUpperBound(self):
        object_under_test = XYChart(**{'xUpperBound': 1})
        self.assertEqual(object_under_test.x_upper_bound, 1)

    def test_set_logX(self):
        object_under_test = XYChart(**{'logX': True})
        self.assertEqual(object_under_test.log_x, True)

    def test_set_xLogBase(self):
        object_under_test = XYChart(**{'xLogBase': 2})
        self.assertEqual(object_under_test.x_log_base, 2)

    def test_set_lodThreshold(self):
        object_under_test = XYChart(**{'lodThreshold': 5})
        self.assertEqual(object_under_test.lodThreshold, 5)
