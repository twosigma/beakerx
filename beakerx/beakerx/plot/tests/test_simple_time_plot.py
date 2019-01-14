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

from ..chart import SimpleTimePlot
from ...utils import Color


class TestPlot(unittest.TestCase):

    def test_plot(self):
        # given
        tableRows = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        # when
        plot = SimpleTimePlot(tableRows,
                              ["y1", "y10"],
                              timeColumn="time",
                              yLabel="Price",
                              displayNames=["1 Year", "10 Year"],
                              colors=[[216, 154, 54], Color.lightGray])
        # then
        model = plot.model
        self.assertEqual(len(model['rangeAxes']), 1)
        self.assertEqual(len(model['texts']), 0)
        self.assertEqual(len(model['constant_lines']), 0)
        self.assertEqual(len(model['constant_bands']), 0)
        self.assertEqual(len(model['graphics_list']), 2)

    def test_displayLines(self):
        # given
        tableRows = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        # when
        plot = SimpleTimePlot(tableRows,
                              ["y1", "y10"],
                              timeColumn="time",
                              yLabel="Price",
                              displayNames=["1 Year", "10 Year"],
                              colors=[[216, 154, 54], Color.lightGray],
                              displayLines=True,
                              displayPoints=False)
        # then
        model = plot.model
        self.assertEqual(len(model['graphics_list']), 2)
        self.assertEqual(model['graphics_list'][0]['type'], "Line")

    def test_displayPoints(self):
        # given
        tableRows = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        # when
        plot = SimpleTimePlot(tableRows,
                              ["y1", "y10"],
                              timeColumn="time",
                              yLabel="Price",
                              displayNames=["1 Year", "10 Year"],
                              colors=[[216, 154, 54], Color.lightGray],
                              displayLines=False,
                              displayPoints=True)
        # then
        model = plot.model
        self.assertEqual(len(model['graphics_list']), 2)
        self.assertEqual(model['graphics_list'][0]['type'], "Points")
