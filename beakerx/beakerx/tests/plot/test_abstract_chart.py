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


class AbstractDefaultTest(unittest.TestCase):
    def test_default_xLowerMargin(self):
        object_under_test = AbstractChart(**{})
        self.assertEqual(object_under_test.x_lower_margin, 0.05)

    def test_default_xUpperMargin(self):
        object_under_test = AbstractChart(**{})
        self.assertEqual(object_under_test.x_upper_margin, 0.05)

    def test_default_logY(self):
        object_under_test = AbstractChart(**{})
        self.assertEqual(object_under_test.log_y, False)

    def test_default_omitCheckboxes(self):
        object_under_test = AbstractChart(**{})
        self.assertEqual(object_under_test.omit_checkboxes, False)

    def test_default_yAxes(self):
        object_under_test = AbstractChart(**{})
        self.assertEqual(len(object_under_test.rangeAxes), 1)
        self.assertIsInstance(object_under_test.rangeAxes[0], YAxis)


class AbstractChartTest(unittest.TestCase):
    def test_set_xLabel(self):
        object_under_test = XYChart(**{'xLabel': 'test'})
        self.assertEqual(object_under_test.domain_axis_label, 'test')

    def test_set_timeZone(self):
        object_under_test = XYChart(**{'timeZone': 'utc'})
        self.assertEqual(object_under_test.timezone, 'utc')

    def test_set_crosshair(self):
        crosshair = Crosshair(**{'width': 2, 'style': '', 'color': 'red'})
        object_under_test = XYChart(**{'crosshair': crosshair})
        self.assertEqual(object_under_test.crosshair, crosshair)

    def test_set_yLabel(self):
        object_under_test = XYChart(**{'yLabel': 'test'})
        self.assertEqual(object_under_test.y_label, 'test')

    def test_set_yLowerMargin(self):
        object_under_test = AbstractChart(**{'yLowerMargin': 0.1})
        self.assertEqual(object_under_test.y_lower_margin, 0.1)

    def test_set_yUpperMargin(self):
        object_under_test = AbstractChart(**{'yUpperMargin': 0.2})
        self.assertEqual(object_under_test.y_upper_margin, 0.2)

    def test_set_yLowerBound(self):
        object_under_test = AbstractChart(**{'yLowerBound': 0.3})
        self.assertEqual(object_under_test.y_lower_bound, 0.3)

    def test_set_yUpperBound(self):
        object_under_test = AbstractChart(**{'yUpperBound': 0.4})
        self.assertEqual(object_under_test.y_upper_bound, 0.4)

    def test_set_xLowerMargin(self):
        object_under_test = AbstractChart(**{'xLowerMargin': 0.5})
        self.assertEqual(object_under_test.x_lower_margin, 0.5)

    def test_set_xUpperMargin(self):
        object_under_test = AbstractChart(**{'xUpperMargin': 0.6})
        self.assertEqual(object_under_test.x_upper_margin, 0.6)

    def test_set_logY(self):
        object_under_test = AbstractChart(**{'logY': True})
        self.assertEqual(object_under_test.log_y, True)

    def test_set_omitCheckboxes(self):
        object_under_test = AbstractChart(**{'omitCheckboxes': True})
        self.assertEqual(object_under_test.omit_checkboxes, True)

    def test_set_yAutoRange_True(self):
        object_under_test = AbstractChart(**{'yAutoRange': True})
        self.assertEqual(object_under_test.y_auto_range, True)

    def test_set_yAutoRange_False(self):
        object_under_test = AbstractChart(**{'yAutoRange': False})
        self.assertEqual(object_under_test.y_auto_range, False)

    def test_set_yAutoRangeIncludesZero_True(self):
        object_under_test = AbstractChart(**{'yAutoRangeIncludesZero': True})
        self.assertEqual(object_under_test.y_auto_range_includes_zero, True)

    def test_set_yAutoRangeIncludesZeroe_False(self):
        object_under_test = AbstractChart(**{'yAutoRangeIncludesZero': False})
        self.assertEqual(object_under_test.y_auto_range_includes_zero, False)

    def test_set_yAxes(self):
        y_axis = [YAxis(), YAxis()]
        object_under_test = AbstractChart(**{'yAxes': y_axis})
        self.assertEqual(len(object_under_test.rangeAxes), 2)
        self.assertEqual(object_under_test.rangeAxes[0], y_axis[0])
        self.assertEqual(object_under_test.rangeAxes[1], y_axis[1])
        self.assertIsInstance(object_under_test.rangeAxes[0], YAxis)
        self.assertIsInstance(object_under_test.rangeAxes[1], YAxis)

    def test_exception_set_unknown_property(self):
        self.assertRaises(SyntaxError, XYChart, **{'unknown': 'something'})
