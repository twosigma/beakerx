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

from ..chart import Plot, YAxis, Text, ConstantLine, ConstantBand
from ..plotitem import StrokeType, Color, Crosshair, Points, ShapeType


class TestPlot(unittest.TestCase):

    def test_plot(self):
        # given
        # when
        plot = Plot(title="Title",
                    xLabel="Horizontal",
                    yLabel="Vertical",
                    initWidth=500,
                    initHeight=200)

        # then
        model = plot.model
        self.assertEqual(model['chart_title'], "Title")
        self.assertEqual(model['domain_axis_label'], "Horizontal")
        self.assertEqual(model['y_label'], "Vertical")

        self.assertEqual(len(model['rangeAxes']), 1)
        self.assertEqual(len(model['texts']), 0)
        self.assertEqual(len(model['constant_lines']), 0)
        self.assertEqual(len(model['constant_bands']), 0)
        self.assertEqual(len(model['graphics_list']), 0)
        self.assertFalse('crosshair' in plot.model)

    def test_add_YAxis_to_plot(self):
        # given
        plot = Plot()
        # when
        plot.add(YAxis(label="Right yAxis"))
        # then
        self.assertEqual(len(plot.model['rangeAxes']), 2)

    def test_add_Text_to_plot(self):
        # given
        plot = Plot()
        # when
        plot.add(Text(text="Hello"))
        # then
        self.assertEqual(len(plot.model['texts']), 1)

    def test_add_ConstantLine_to_plot(self):
        # given
        plot = Plot()
        # when
        plot.add(ConstantLine(x=0.65))
        # then
        self.assertEqual(len(plot.model['constant_lines']), 1)

    def test_add_ConstantBand_to_plot(self):
        # given
        plot = Plot()
        # when
        plot.add(ConstantBand(x=[1, 2]))
        # then
        self.assertEqual(len(plot.model['constant_bands']), 1)

    def test_add_list_of_ConstantBand_to_plot(self):
        # given
        plot = Plot()
        list_of_constant_bands = [ConstantBand(x=[1, 2]), ConstantBand(x=[3, 4])]
        # when
        plot.add(list_of_constant_bands)
        # then
        self.assertEqual(len(plot.model['constant_bands']), len(list_of_constant_bands))

    def test_should_setXBound(self):
        # given
        plot = Plot()
        # when
        plot.setXBound([-2, 10])
        # then
        self.assertEqual(plot.model['x_lower_bound'], -2)
        self.assertEqual(plot.model['x_upper_bound'], 10)

    def test_should_setYBound(self):
        # given
        plot = Plot()
        # when
        plot.setYBound([2, 6])
        # then
        self.assertEqual(plot.model['y_lower_bound'], 2)
        self.assertEqual(plot.model['y_upper_bound'], 6)

    def test_should_rise_ValueError_when_setXBound(self):
        # given
        plot = Plot()
        # when
        try:
            plot.setXBound([-2, 10, 11])
        except ValueError as ex:
            # then
            self.assertEqual(ex.args[0], "to set the x bound, the list needs to be of size=2.")

    def test_should_rise_ValueError_when_setYBound(self):
        # given
        plot = Plot()
        # when
        try:
            plot.setYBound([-2, 10, 11])
        except ValueError as ex:
            # then
            self.assertEqual(ex.args[0], "to set the y bound, the list needs to be of size=2.")

    def test_should_setShowLegend(self):
        # given
        plot = Plot()
        # when
        plot.setShowLegend(True)
        # then
        self.assertEqual(plot.model['show_legend'], True)

    def test_should_set_crosshair(self):
        # given
        ch = Crosshair(color=Color.black, width=2)
        # when
        plot = Plot(crosshair=ch)
        # then
        self.assertTrue('crosshair' in plot.model)

    def test_should_set_stroke_type(self):
        # given
        ch = Crosshair(color=Color.black, width=2, style=StrokeType.DOT)
        # when
        plot = Plot(crosshair=ch)
        # then
        self.assertEqual(plot.model['crosshair']['style'], 'DOT')

    def test_set_shape_type(self):
        # given
        plot = Plot()
        # when
        plot.add(Points(y=[1, 3, 6, 3, 1],
                        x=[1, 2, 3, 4, 5],
                        size=10,
                        shape=ShapeType.DIAMOND))
        # then
        item = plot.model['graphics_list'][0]
        self.assertEqual(item['shape'], "DIAMOND")
