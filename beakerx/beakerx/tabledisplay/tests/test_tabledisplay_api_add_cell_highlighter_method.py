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


import os
import unittest

import pandas as pd

from ..tabledisplay import TableDisplay
from ..tableitems import TableDisplayCellHighlighter, HighlightStyle, UniqueEntriesHighlighter, HeatmapHighlighter


class TestTableDisplayAPI_addCellHighlighter(unittest.TestCase):

    def test_should_add_unique_entries_highlighter(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        table = TableDisplay(df)
        # when
        table.addCellHighlighter(TableDisplayCellHighlighter.getUniqueEntriesHighlighter("m3"))
        # then
        cellHighlighters = table.model['cellHighlighters'][0]
        self.assertEqual(cellHighlighters["colName"], "m3")
        self.assertEqual(cellHighlighters["style"], HighlightStyle.FULL_ROW.value)
        self.assertEqual(cellHighlighters["type"], UniqueEntriesHighlighter.type)

    def test_should_add_heatmap_highlighter(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        table = TableDisplay(df)
        # when
        table.addCellHighlighter(TableDisplayCellHighlighter.getHeatmapHighlighter("m3"))
        # then
        cellHighlighters = table.model['cellHighlighters'][0]
        self.assertEqual(cellHighlighters["colName"], "m3")
        self.assertEqual(cellHighlighters["style"], HighlightStyle.FULL_ROW.value)
        self.assertEqual(cellHighlighters["type"], HeatmapHighlighter.type)
