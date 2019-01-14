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


import math
import unittest

from ..chart import CombinedPlot, Plot, Line


class TestCombinedPlot(unittest.TestCase):

    def test_empty_category_plot(self):
        # given
        # when
        cplot = CombinedPlot(xLabel="Linear")
        # then
        model = cplot.model
        self.assertEqual(len(model['plots']), 0)

    def test_add_category_plot(self):
        # given
        points = 100
        logBase = 10
        expys = []
        xs = []
        for i in range(0, points):
            xs.append(i / 15.0)
            expys.append(math.exp(xs[i]))

        cplot = CombinedPlot(xLabel="Linear")
        logYPlot = Plot(title="Linear x, Log y", yLabel="Log", logY=True, yLogBase=logBase)
        logYPlot.add(Line(x=xs, y=expys, displayName="f(x) = exp(x)"))
        # when
        cplot.add(logYPlot, 4)
        # then
        model = cplot.model
        self.assertEqual(len(model['plots']), 1)
