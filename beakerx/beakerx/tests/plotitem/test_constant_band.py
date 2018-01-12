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


class ConstantBandDefaultTest(unittest.TestCase):
    def test_default_color(self):
        object_under_test = ConstantBand(**{})
        self.assertEqual(object_under_test.color, "#7f007fff")


class ConstantBandSetTest(unittest.TestCase):
    def test_set_color(self):
        object_under_test = ConstantBand(**{'color': Color.WHITE})
        self.assertEqual(object_under_test.color, '#ffffffff')

    def test_set_X(self):
        x = [1, 2, 3]
        object_under_test = ConstantBand(**{'x': x})
        self.assertEqual(len(object_under_test.x), 3)
        self.assertIsInstance(object_under_test.x, list)

    def test_set_Y(self):
        y = [1, 2, 3]
        object_under_test = ConstantBand(**{'y': y})
        self.assertEqual(len(object_under_test.y), 3)
        self.assertIsInstance(object_under_test.y, list)
