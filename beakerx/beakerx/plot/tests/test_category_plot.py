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


import unittest

from ..chart import CategoryPlot
from ..plotitem import CategoryBars, LabelPositionType


class TestCategoryPlot(unittest.TestCase):

    def test_category_plot(self):
        # given
        # when
        cplot = CategoryPlot(title="Hello CategoryPlot!",
                             xLabel="Categories",
                             yLabel="Values")
        # then
        model = cplot.model
        self.assertEqual(model['chart_title'], "Hello CategoryPlot!")
        self.assertEqual(model['domain_axis_label'], "Categories")
        self.assertEqual(model['y_label'], "Values")
        self.assertEqual(len(model['rangeAxes']), 1)
        self.assertEqual(len(model['texts']), 0)
        self.assertEqual(len(model['constant_lines']), 0)
        self.assertEqual(len(model['constant_bands']), 0)
        self.assertEqual(len(model['graphics_list']), 0)

    def test_add_item_to_category_plot(self):
        # given
        cplot = CategoryPlot()
        # when
        cplot.add(CategoryBars(value=[[1, 2, 3], [1, 3, 5]]))
        # then
        model = cplot.model
        self.assertEqual(len(model['graphics_list']), 1)

    def test_label_position(self):
        # given
        cplot = CategoryPlot()
        # when
        cplot.add(CategoryBars(value=[[1, 2, 3], [1, 3, 5]], labelPosition=LabelPositionType.VALUE_INSIDE))
        # then
        item = cplot.model['graphics_list'][0]
        self.assertEqual(item['labelPosition'], "VALUE_INSIDE")
