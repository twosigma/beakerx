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


class HistogramChartDefaultTest(unittest.TestCase):
    def test_type(self):
        object_under_test = HistogramChart(**{})
        self.assertEqual(object_under_test.type, 'Histogram')

    def test_default_log(self):
        object_under_test = HistogramChart(**{})
        self.assertEqual(object_under_test.log, False)
        self.assertEqual(object_under_test.log_y, False)

    def test_default_cumulative(self):
        object_under_test = HistogramChart(**{})
        self.assertEqual(object_under_test.cumulative, False)

    def test_default_normed(self):
        object_under_test = HistogramChart(**{})
        self.assertEqual(object_under_test.normed, False)


class HistogramChartSetTest(unittest.TestCase):
    def test_set_log(self):
        object_under_test = HistogramChart(**{'log': True})
        self.assertEqual(object_under_test.log, True)
        self.assertEqual(object_under_test.log_y, True)

    def test_set_binCount(self):
        object_under_test = HistogramChart(**{'binCount': 10})
        self.assertEqual(object_under_test.bin_count, 10)

    def test_set_cumulative(self):
        object_under_test = HistogramChart(**{'cumulative': True})
        self.assertEqual(object_under_test.cumulative, True)

    def test_set_normed(self):
        object_under_test = HistogramChart(**{'normed': True})
        self.assertEqual(object_under_test.normed, True)

    def test_set_rangeMin(self):
        object_under_test = HistogramChart(**{'rangeMin': 2})
        self.assertEqual(object_under_test.range_min, 2)

    def test_set_rangeMax(self):
        object_under_test = HistogramChart(**{'rangeMax': 5})
        self.assertEqual(object_under_test.range_max, 5)

    def test_set_names(self):
        names = ['one', 'two']
        object_under_test = HistogramChart(**{'names': names})
        self.assertEqual(len(object_under_test.names), 2)
        self.assertEqual(object_under_test.names[0], 'one')
        self.assertEqual(object_under_test.names[1], 'two')

    def test_set_displayMode(self):
        object_under_test = HistogramChart(**{'displayMode': Histogram.DisplayMode.OVERLAP})
        self.assertEqual(object_under_test.displayMode, Histogram.DisplayMode.OVERLAP)

    def test_set_color(self):
        object_under_test = HistogramChart(**{'color': Color.GRAY})
        self.assertEqual(len(object_under_test.colors), 1)
        self.assertEqual(object_under_test.colors[0].R, 128)
        self.assertEqual(object_under_test.colors[0].G, 128)
        self.assertEqual(object_under_test.colors[0].B, 128)
