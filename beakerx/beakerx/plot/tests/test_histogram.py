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


import pandas as pd
import random
import unittest

from ..chart import Histogram, HistogramChart, XYChart


class TestHistogram(unittest.TestCase):

    def setUp(self):
        self.data1 = []
        self.data2 = []
        for x in range(1, 10000):
            self.data1.append(random.gauss(0, 1))
            self.data2.append(random.gauss(0, 1))

    def test_empty_data(self):
        # given
        data = []
        # when
        histogram = Histogram(data=data)
        # then
        model = histogram.model
        self.assertFalse(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 0)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], str(HistogramChart.ROWS_LIMIT_T0_INDEX) + " items")
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], HistogramChart.ROWS_LIMIT)

    def test_should_not_limit_data(self):
        # given
        data = []
        for x in range(1, 10000):
            data.append(random.gauss(0, 1))
        # when
        histogram = Histogram(data=data)
        # then
        model = histogram.model
        self.assertFalse(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 9999)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], str(10000) + " items")
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], HistogramChart.ROWS_LIMIT)

    def test_should_limit_data(self):
        # given
        data = []
        for x in range(1, 1000002):
            data.append(random.gauss(0, 1))
        # when
        histogram = Histogram(data=data)
        # then
        model = histogram.model
        self.assertTrue(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 1000001)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], str(10000) + " items")
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], HistogramChart.ROWS_LIMIT)

    def test_support_data_frame(self):
        # given
        df = pd.DataFrame({'data1': self.data1, 'data2': self.data2})
        # when
        histogram = Histogram(data=df['data1'])
        # then
        self.assertEqual(len(histogram.model['graphics_list'][0]), 9999)

    def test_legend_default_position(self):
        # given
        # when
        histogram = Histogram(data=[self.data1, self.data2])
        # then
        self.assertEqual(histogram.model['legend_position']['position'], "TOP_RIGHT")
