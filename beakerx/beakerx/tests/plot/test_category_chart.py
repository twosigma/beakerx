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


class CategoryChartDefaultTest(unittest.TestCase):
    def test_type(self):
        object_under_test = CategoryChart(**{})
        self.assertEqual(object_under_test.type, 'CategoryPlot')

    def test_default_categoryNames(self):
        object_under_test = CategoryChart(**{})
        self.assertEqual(object_under_test.categoryNames, [])

    def test_default_categoryNamesLabelAngle(self):
        object_under_test = CategoryChart(**{})
        self.assertEqual(object_under_test.categoryNamesLabelAngle, 0.0)

    def test_default_orientation(self):
        object_under_test = CategoryChart(**{})
        self.assertEqual(object_under_test.orientation, PlotOrientationType.VERTICAL)

    def test_default_categoryMargin(self):
        object_under_test = CategoryChart(**{})
        self.assertEqual(object_under_test.category_margin, 0.2)


class CategoryChartSetTest(unittest.TestCase):
    def test_set_categoryNames(self):
        names = ['one', 'two']
        object_under_test = CategoryChart(**{'categoryNames': names})
        self.assertEqual(len(object_under_test.categoryNames), 2)
        self.assertEqual(object_under_test.categoryNames[0], 'one')
        self.assertEqual(object_under_test.categoryNames[1], 'two')

    def test_set_categoryNamesLabelAngle(self):
        object_under_test = CategoryChart(**{'categoryNamesLabelAngle': 0.5})
        self.assertEqual(object_under_test.categoryNamesLabelAngle, 0.5)

    def test_set_orientation(self):
        object_under_test = CategoryChart(**{'orientation': PlotOrientationType.HORIZONTAL})
        self.assertEqual(object_under_test.orientation, PlotOrientationType.HORIZONTAL)

    def test_set_categoryMargin(self):
        object_under_test = CategoryChart(**{'categoryMargin': 0.4})
        self.assertEqual(object_under_test.category_margin, 0.4)
