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

from beakerx import *


class TestTableDisplayFontColor(unittest.TestCase):

    def test_font_color_provider_endless_mode(self):
        # given
        TableDisplay.loadingMode = "ENDLESS"
        td = self.table_dispaly()
        # when
        td.setFontColorProvider(self.color_provider_1)
        # then
        self.assertEqual(len(td.model.get('fontColor')), Table.PAGE_SIZE)

    def test_redefine_font_color_provider_endless_mode(self):
        # given
        TableDisplay.loadingMode = "ENDLESS"
        td = self.table_dispaly()
        td.setFontColorProvider(self.color_provider_1)
        # when
        td.setFontColorProvider(self.color_provider2)
        # then
        self.assertEqual(len(td.model.get('fontColor')), Table.PAGE_SIZE)

    def test_redefine_font_color_provider_all_mode(self):
        # given
        td = self.table_dispaly()
        TableDisplay.loadingMode = "ALL"
        td.setFontColorProvider(self.color_provider_1)
        # when
        td.setFontColorProvider(self.color_provider2)
        # then
        self.assertEqual(len(td.model.get('fontColor')), 10000)

    def color_provider_1(self, r1, column, td):
        r2 = td.values[r1]
        val = r2[column]
        if val % 2 is 0:
            return Color.GREEN
        return Color.BLACK

    def color_provider2(self, r1, column, td):
        r2 = td.values[r1]
        val = r2[column]
        if val % 3 is 0:
            return Color.GREEN
        return Color.BLACK

    def table_dispaly(self):
        rowList = []
        for row in range(10000):
            colMap = {}
            for col in range(2):
                index = col + 1
                key = "a" + str(index)
                colMap[key] = row * index
            rowList.append(colMap)
        td = TableDisplay(rowList)
        return td
