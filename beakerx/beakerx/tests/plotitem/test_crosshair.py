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


class CrosshairSetTest(unittest.TestCase):
    def test_set_width(self):
        object_under_test = Crosshair(**{'width': 10})
        self.assertEqual(object_under_test.width, 10)

    def test_set_style(self):
        object_under_test = Crosshair(**{'style': ""})
        self.assertEqual(object_under_test.style, "")

    def test_set_color(self):
        object_under_test = Crosshair(**{'color': Color.WHITE})
        self.assertEqual(object_under_test.color, '#ffffffff')
