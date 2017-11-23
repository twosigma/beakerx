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


class GraphicsDefaultTest(unittest.TestCase):
    def test_default_visible(self):
        object_under_test = Graphics(**{})
        self.assertEqual(object_under_test.visible, True)

    def test_default_hasClickAction(self):
        object_under_test = Graphics(**{})
        self.assertEqual(object_under_test.hasClickAction, False)


class GraphicsSetTest(unittest.TestCase):
    def test_set_visible(self):
        object_under_test = Graphics(**{'visible': False})
        self.assertEqual(object_under_test.visible, False)

    def test_set_hasClickAction(self):
        object_under_test = Graphics(**{'hasClickAction': True})
        self.assertEqual(object_under_test.hasClickAction, True)

    def test_set_yAxis(self):
        yAxes = [YAxis(), YAxis()]
        object_under_test = Graphics(**{'yAxis': yAxes})
        self.assertIsInstance(object_under_test.yAxis, list)
        self.assertEqual(len(object_under_test.yAxis), 2)
