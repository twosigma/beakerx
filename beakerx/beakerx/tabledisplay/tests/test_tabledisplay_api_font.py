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
from beakerx.utils import *


class TestTableDisplayAPI_font(unittest.TestCase):

    def test_should_set_data_font_size(self):
        # given
        mapList4 = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        tabledisplay = TableDisplay(mapList4)
        # when
        tabledisplay.setDataFontSize(25)
        # then
        self.assertEqual(tabledisplay.model["dataFontSize"], 25)

    def test_should_set_header_font_size(self):
        # given
        mapList4 = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        tabledisplay = TableDisplay(mapList4)
        # when
        tabledisplay.setHeaderFontSize(33)
        # then
        self.assertEqual(tabledisplay.model["headerFontSize"], 33)

    def test_should_set_font_color_provider(self):
        # given
        mapList4 = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        tabledisplay = TableDisplay(mapList4)

        colors = [
            [Color.LIGHT_GRAY, Color.GRAY, Color.RED],
            [Color.DARK_GREEN, Color.ORANGE, Color.RED],
            [Color.MAGENTA, Color.BLUE, Color.BLACK]
        ]

        def colorProvider(row, column, table):
            return colors[row][column]

        # when
        tabledisplay.setFontColorProvider(colorProvider)
        # then
        self.assertEqual(tabledisplay.model["fontColor"][0][0], Color.LIGHT_GRAY.hex())
