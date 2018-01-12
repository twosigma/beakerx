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


class TextDefaultTest(unittest.TestCase):
    def test_default_x(self):
        object_under_test = Text(**{})
        self.assertEqual(object_under_test.x, 0)

    def test_default_y(self):
        object_under_test = Text(**{})
        self.assertEqual(object_under_test.y, 0)

    def test_default_size(self):
        object_under_test = Text(**{})
        self.assertEqual(object_under_test.size, 13)

    def test_default_text(self):
        object_under_test = Text(**{})
        self.assertEqual(object_under_test.text, '')

    def test_default_show_pointer(self):
        object_under_test = Text(**{})
        self.assertEqual(object_under_test.show_pointer, True)

    def test_default_pointerAngle(self):
        object_under_test = Text(**{})
        self.assertEqual(object_under_test.pointer_angle, -0.7853981633974483)


class TextSetTest(unittest.TestCase):
    def test_set_x(self):
        object_under_test = Text(**{'x': 20})
        self.assertEqual(object_under_test.x, 20)

    def test_set_y(self):
        object_under_test = Text(**{'y': 30})
        self.assertEqual(object_under_test.y, 30)

    def test_set_size(self):
        object_under_test = Text(**{'size': 25})
        self.assertEqual(object_under_test.size, 25)

    def test_set_text(self):
        object_under_test = Text(**{'text': 'test'})
        self.assertEqual(object_under_test.text, 'test')

    def test_set_show_pointer(self):
        object_under_test = Text(**{'show_pointer': False})
        self.assertEqual(object_under_test.show_pointer, False)

    def test_set_pointerAngle(self):
        object_under_test = Text(**{'pointerAngle': -0.40})
        self.assertEqual(object_under_test.pointer_angle, -0.40)

    def test_set_color(self):
        object_under_test = Line(**{'color': Color.WHITE})
        self.assertEqual(object_under_test.color, '#ffffffff')