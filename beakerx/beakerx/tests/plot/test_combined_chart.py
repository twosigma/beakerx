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


class CombinedChartDefaultTest(unittest.TestCase):
    def test_type(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.type, 'CombinedPlot')

    def test_version(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.version, 'groovy')

    def test_plot_type(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.plot_type, 'Plot')

    def test_default_xTickLabelsVisible(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.x_tickLabels_visible, True)

    def test_default_yTickLabelsVisible(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.y_tickLabels_visible, True)

    def test_default_plots(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.plots, [])

    def test_default_weights(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.weights, [])

    def test_set_xLabel(self):
        object_under_test = CombinedChart(**{})
        self.assertEqual(object_under_test.x_label, 'Linear')


class CombinedChartSetTest(unittest.TestCase):
    def test_exception_set_unknown_property(self):
        self.assertRaises(SyntaxError, CombinedChart, **{'unknown': 'something'})

    def test_set_title(self):
        object_under_test = CombinedChart(**{'title': 'test'})
        self.assertEqual(object_under_test.title, 'test')

    def test_set_yTickLabelsVisible(self):
        object_under_test = CombinedChart(**{'yTickLabelsVisible': False})
        self.assertEqual(object_under_test.y_tickLabels_visible, False)

    def test_set_xTickLabelsVisible(self):
        object_under_test = CombinedChart(**{'xTickLabelsVisible': False})
        self.assertEqual(object_under_test.x_tickLabels_visible, False)

    def test_set_plots(self):
        plots = [Plot()]
        object_under_test = CombinedChart(**{'plots': plots})
        self.assertEqual(object_under_test.plots, plots)
        self.assertEqual(len(object_under_test.plots), 1)

    def test_set_weights(self):
        object_under_test = CombinedChart(**{'weights': [1, 2, 3]})
        self.assertEqual(len(object_under_test.weights), 3)
        self.assertEqual(object_under_test.weights[0], 1)
        self.assertEqual(object_under_test.weights[1], 2)
        self.assertEqual(object_under_test.weights[2], 3)

    def test_set_xLabel(self):
        object_under_test = CombinedChart(**{'xLabel': 'Label'})
        self.assertEqual(object_under_test.x_label, 'Label')
