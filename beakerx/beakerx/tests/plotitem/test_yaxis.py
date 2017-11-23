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


class YAxisDefaultTest(unittest.TestCase):
    def test_default_label(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.label, '')

    def test_default_autoRange(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.auto_range, True)

    def test_default_autoRangeIncludesZero(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.auto_range_includes_zero, False)

    def test_default_lowerMargin(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.lower_margin, 0.05)

    def test_default_upperMargin(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.upper_margin, 0.05)

    def test_default_lowerBound(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.lower_bound, 0)

    def test_default_upperBound(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.upper_bound, 0)

    def test_default_logY(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.use_log, False)

    def test_default_logBase(self):
        object_under_test = YAxis(**{})
        self.assertEqual(object_under_test.log_base, 10)


class YAxisSetTest(unittest.TestCase):
    def test_set_label(self):
        object_under_test = YAxis(**{'label': 'test'})
        self.assertEqual(object_under_test.label, 'test')

    def test_set_autoRange(self):
        object_under_test = YAxis(**{'autoRange': False})
        self.assertEqual(object_under_test.auto_range, False)

    def test_set_autoRangeIncludesZero(self):
        object_under_test = YAxis(**{'autoRangeIncludesZero': True})
        self.assertEqual(object_under_test.auto_range_includes_zero, True)

    def test_set_lowerMargin(self):
        object_under_test = YAxis(**{'lowerMargin': 0.10})
        self.assertEqual(object_under_test.lower_margin, 0.10)

    def test_set_upperMargin(self):
        object_under_test = YAxis(**{'upperMargin': 0.10})
        self.assertEqual(object_under_test.upper_margin, 0.10)

    def test_set_lowerBound(self):
        object_under_test = YAxis(**{'lowerBound': 0.10})
        self.assertEqual(object_under_test.lower_bound, 0.10)

    def test_set_upperBound(self):
        object_under_test = YAxis(**{'upperBound': 0.10})
        self.assertEqual(object_under_test.upper_bound, 0.10)

    def test_set_logY(self):
        object_under_test = YAxis(**{'logY': True})
        self.assertEqual(object_under_test.use_log, True)

    def test_set_logBase(self):
        object_under_test = YAxis(**{"logBase": 2})
        self.assertEqual(object_under_test.log_base, 2)

    def test_set_Bound(self):
        object_under_test = YAxis(**{})
        object_under_test.setBound(0.12, 0.13)
        self.assertEqual(object_under_test.lower_bound, 0.12)
        self.assertEqual(object_under_test.upper_bound, 0.13)
