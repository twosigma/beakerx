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

from ..chart import TreeMap, XYChart
from ..plotitem_treemap import TreeMapNode, DefaultValue, ValueAccessor


class TestTreeMap(unittest.TestCase):

    def test_should_not_limit_data(self):
        # given
        menu_node = self.create_tree_map(100)

        # when
        widget = TreeMap(root=menu_node)
        # then
        model = widget.model
        self.assertFalse(model[XYChart.TOO_MANY_ROWS])

    def test_should_limit_data(self):
        # given
        menu_node = self.create_tree_map(500)

        # when
        widget = TreeMap(root=menu_node)
        # then
        model = widget.model
        self.assertTrue(model[XYChart.TOO_MANY_ROWS])
        self.assertEqual(model[XYChart.TOTAL_NUMBER_OF_POINTS], 1498)
        self.assertEqual(model[XYChart.NUMBER_OF_POINTS_TO_DISPLAY], str(998) + " leaves")
        self.assertEqual(model[XYChart.ROWS_LIMIT_ITEMS], 1000)

    def test_should_set_value_accessor(self):
        # given
        menu_node = self.create_tree_map(100)
        # when
        widget = TreeMap(root=menu_node,
                         valueAccessor=ValueAccessor.WEIGHT)
        # then
        model = widget.model
        self.assertFalse(model[XYChart.TOO_MANY_ROWS])

    @staticmethod
    def create_tree_map(number_of_nodes):
        menu_node = TreeMapNode("0")
        for i in range(1, number_of_nodes):
            nodeX = TreeMapNode("X" + str(i))
            nodeX.add(TreeMapNode("a" + str(i), i, DefaultValue(i)))
            nodeX.add(TreeMapNode("b" + str(i), i, DefaultValue(i)))
            menu_node.add(nodeX)
        return menu_node
