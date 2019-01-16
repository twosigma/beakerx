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

from beakerx.tabledisplay import TableDisplay


class TestTableDisplayAPI_row_filter(unittest.TestCase):

    def test_should_filter_all_rows(self):
        # given
        mapList4 = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        tabledisplay = TableDisplay(mapList4)

        def filter_row(row, model):
            return True

        # when
        tabledisplay.setRowFilter(filter_row)
        # then
        self.assertEqual(tabledisplay.model["filteredValues"][0], [1, 2, 3])
        self.assertEqual(tabledisplay.model["filteredValues"][1], [4, 5, 6])
        self.assertEqual(tabledisplay.model["filteredValues"][2], [7, 8, 5])

    def test_should_filter_last_row(self):
        # given
        mapList4 = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        tabledisplay = TableDisplay(mapList4)

        def filter_row(row, model):
            return model[row][1] == 8

        # when
        tabledisplay.setRowFilter(filter_row)
        # then
        self.assertEqual(tabledisplay.model["filteredValues"], [[7, 8, 5]])
