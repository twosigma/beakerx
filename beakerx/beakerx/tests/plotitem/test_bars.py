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


class BarsSetTest(unittest.TestCase):
    def test_set_width(self):
        object_under_test = Bars(**{'width': 5})
        self.assertIsNotNone(object_under_test.width)

    def test_set_width_array(self):
        object_under_test = Bars(**{'width': [5, 3]})
        self.assertIsNotNone(object_under_test.widths)

    def test_set_color(self):
        object_under_test = Bars(**{'color': Color.GRAY})
        self.assertIsNotNone(object_under_test.color)

    def test_set_color_array(self):
        object_under_test = Bars(**{'color': [Color.WHITE, Color.BLACK]})
        self.assertIsNotNone(object_under_test.colors)

    def test_set_outlineColor(self):
        object_under_test = Bars(**{'outlineColor': Color.GRAY})
        self.assertIsNotNone(object_under_test.outline_color)

    def test_set_outlineColor_array(self):
        object_under_test = Bars(**{'outlineColor': [Color.WHITE, Color.BLACK]})
        self.assertIsNotNone(object_under_test.outline_colors)
