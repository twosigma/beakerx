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


class TreeMapChartDefaultTest(unittest.TestCase):
    def test_type(self):
        object_under_test = TreeMapChart(**{})
        self.assertEqual(object_under_test.type, 'TreeMap')

    def test_default_title(self):
        object_under_test = TreeMapChart(**{})
        self.assertEqual(object_under_test.title, '')

    def test_default_showLegend(self):
        object_under_test = TreeMapChart(**{})
        self.assertEqual(object_under_test.show_legend, False)

    def test_default_colorProvider(self):
        object_under_test = TreeMapChart(**{})
        self.assertIsInstance(object_under_test.colorProvider, RandomColorProvider)

    def test_default_mode(self):
        object_under_test = TreeMapChart(**{})
        self.assertEqual(object_under_test.mode, "squarify")

    def test_default_valueAccessor(self):
        object_under_test = TreeMapChart(**{})
        self.assertEqual(object_under_test.valueAccessor, ValueAccessor.VALUE)


class TreeMapChartSetTest(unittest.TestCase):
    def test_set_title(self):
        object_under_test = TreeMapChart(**{'title': 'test'})
        self.assertEqual(object_under_test.title, 'test')

    def test_set_toolTipBuilder(self):
        object_under_test = TreeMapChart(**{'toolTipBuilder': 'test'})
        self.assertEqual(object_under_test.toolTipBuilder, 'test')

    def test_set_Ratio(self):
        object_under_test = TreeMapChart(**{'ratio': 0.2})
        self.assertEqual(object_under_test.ratio, 0.2)

    def test_set_mode(self):
        object_under_test = TreeMapChart(**{'mode': Mode.SLICE})
        self.assertEqual(object_under_test.mode, "slice")

    def test_set_root(self):
        root = TreeMapNode([{}])
        object_under_test = TreeMapChart(**{'root': root})
        self.assertEqual(object_under_test.graphics_list, root)

    def test_set_colorProvider(self):
        color_provider = RandomColorProvider(colours=[Color.WHITE])
        object_under_test = TreeMapChart(**{'colorProvider': color_provider})
        self.assertIsInstance(object_under_test.colorProvider, RandomColorProvider)
        self.assertEqual(object_under_test.colorProvider, color_provider)

    def test_set_valueAccessor(self):
        object_under_test = TreeMapChart(**{'valueAccessor': ValueAccessor.WEIGHT})
        self.assertEqual(object_under_test.valueAccessor, ValueAccessor.WEIGHT)

    def test_exception_set_unknown_property(self):
        self.assertRaises(SyntaxError, TreeMapChart, **{'unknown': 'something'})
