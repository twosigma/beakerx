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
import time

from ..chart import NanoPlot, Points


class TestNanoPlot(unittest.TestCase):

    def test_plot(self):
        # given
        # when
        plot = NanoPlot()

        # then
        model = plot.model
        self.assertEqual(len(model['rangeAxes']), 1)
        self.assertEqual(len(model['texts']), 0)
        self.assertEqual(len(model['constant_lines']), 0)
        self.assertEqual(len(model['constant_bands']), 0)
        self.assertEqual(len(model['graphics_list']), 0)

    def test_add_Line_to_plot(self):
        # given
        millis = int(round(time.time() * 1000))
        nanos  = millis * 1000 * 1000
        xs = []
        ys = []
        for i in range(11):
            xs.append(nanos + 7 * i)
            ys.append(i)
        plot = NanoPlot()
        # when
        plot.add(Points(x=xs, y=ys))
        # then
        model = plot.model
        self.assertEqual(len(model['graphics_list']), 1)
