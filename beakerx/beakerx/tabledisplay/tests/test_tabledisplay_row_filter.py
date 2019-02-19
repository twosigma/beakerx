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

from ..tabledisplay import TableDisplay


class TestTableDisplayRowFilter(unittest.TestCase):

    def test_no_filtered_values_when_no_setRowFilter(self):
        # given
        mapListFilter = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        # when
        display = TableDisplay(mapListFilter)
        # then
        self.assertFalse('filteredValues' in display.model)

    def test_filtered_values(self):
        # given
        mapListFilter = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        display = TableDisplay(mapListFilter)

        def filter_row(row, model):
            return model[row][1] == 8

        # when
        display.setRowFilter(filter_row)
        # then
        self.assertEqual(display.model["filteredValues"], [[7, 8, 5]])
