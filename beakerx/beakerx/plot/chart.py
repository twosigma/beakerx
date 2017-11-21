# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

import json

from pandas import DataFrame
from beakerx.plot.legend import LegendPosition, LegendLayout
from beakerx.utils import *
from beakerx.plot.plotitem import *
from beakerx.plot.plotitem_treemap import *
from enum import Enum
from traitlets import Unicode, Dict
from beakerx.beakerx_widgets import BeakerxDOMWidget


class ChartDetails(BaseObject):
    def __init__(self, **kwargs):
        super(ChartDetails, self).__init__(**kwargs)
        self.type = "Plot"
        self.init_width = 640
        self.init_height = 480

        method_names = self.get_methods()

        for x in kwargs:
            key = x[:1].upper() + x[1:]
            if "set" + key in method_names:
                func = getattr(self, 'set' + key)
                func(getValue(kwargs, x))
            else:
                raise SyntaxError(x + ': property not found')

    def setInitWidth(self, value):
        self.init_width = value

    def setInitHeight(self, value):
        self.init_height = value


class Chart(ChartDetails):
    def __init__(self, **kwargs):
        self.chart_title = ''
        self.use_tool_tip = True
        self.legend_position = LegendPosition()
        self.legend_layout = LegendLayout.VERTICAL
        self.custom_styles = []
        self.element_styles = {}

        super(Chart, self).__init__(**kwargs)

    def setTitle(self, value):
        self.chart_title = value

    def setUseToolTip(self, value):
        self.use_tool_tip = value

    def setShowLegend(self, value):
        self.show_legend = value

    def setLegendPosition(self, value):
        self.legend_position = value

    def setLegendLayout(self, value):
        self.legend_layout = value


class AbstractChart(Chart):
    def __init__(self, **kwargs):
        self.x_lower_margin = 0.05
        self.x_upper_margin = 0.05
        self.log_y = False
        self.omit_checkboxes = False
        self.rangeAxes = [YAxis(**{})]
        self.y_auto_range_includes_zero = False
        super(AbstractChart, self).__init__(**kwargs)

    def setXLabel(self, value):
        self.domain_axis_label = value

    def setYLabel(self, value):
        self.y_label = value

    def setTimeZone(self, value):
        self.timezone = value

    def setXLowerMargin(self, value):
        self.x_lower_margin = value

    def setXUpperMargin(self, value):
        self.x_upper_margin = value

    def setYLowerMargin(self, value):
        self.y_lower_margin = value

    def setYUpperMargin(self, value):
        self.y_upper_margin = value

    def setYLowerBound(self, value):
        self.y_lower_bound = value

    def setYUpperBound(self, value):
        self.y_upper_bound = value

    def setCrosshair(self, value):
        self.crosshair = value

    def setLogY(self, value):
        self.log_y = value

    def setOmitCheckboxes(self, value):
        self.omit_checkboxes = value

    def setYAutoRange(self, value):
        self.y_auto_range = value

    def setYAutoRangeIncludesZero(self, value):
        self.y_auto_range_includes_zero = value

    def setYAxes(self, value):
        self.rangeAxes = value


class XYChart(AbstractChart):
    def __init__(self, **kwargs):
        self.graphics_list = []
        self.constant_lines = []
        self.constant_bands = []
        self.texts = []
        self.x_auto_range = True
        self.x_lower_bound = 0
        self.x_upper_bound = 0
        self.log_x = False
        self.x_log_base = 10

        super(XYChart, self).__init__(**kwargs)

    def setGraphics(self, value):
        self.graphics_list = value

    def setConstantLines(self, value):
        self.constant_lines = value

    def setConstantBands(self, value):
        self.constant_bands = value

    def setTexts(self, value):
        self.texts = value

    def setXAutoRange(self, value):
        self.x_auto_range = value

    def setXLowerBound(self, value):
        self.x_lower_bound = value

    def setXUpperBound(self, value):
        self.x_upper_bound = value

    def setLogX(self, value):
        self.log_x = value

    def setXLogBase(self, value):
        self.x_log_base = value

    def setLodThreshold(self, value):
        self.lodThreshold = value

    def add(self, item):
        if isinstance(item, YAxis):
            self.rangeAxes.append(item)
        elif isinstance(item, Text):
            self.texts.append(item)
        elif isinstance(item, ConstantLine):
            self.constant_lines.append(item)
        elif isinstance(item, ConstantBand):
            self.constant_bands.append(item)
        elif isinstance(item, Graphics):
            self.graphics_list.append(item)
        elif isinstance(item, list):
            for elem in item:
                self.add(elem)
        return self


class HistogramChart(XYChart):
    def __init__(self, **kwargs):
        self.log = False
        self.cumulative = False
        self.normed = False

        super(HistogramChart, self).__init__(**kwargs)

        self.type = 'Histogram'

    def setLog(self, value):
        self.log = value
        if self.log:
            self.setLogY(True)

    def setBinCount(self, value):
        self.bin_count = value

    def setCumulative(self, value):
        self.cumulative = value

    def setNormed(self, value):
        self.normed = value

    def setRangeMin(self, value):
        self.range_min = value

    def setRangeMax(self, value):
        self.range_max = value

    def setNames(self, value):
        self.names = value

    def setDisplayMode(self, value):
        self.displayMode = value

    def setColor(self, value):
        if value is not None:
            if isinstance(value, Color):
                self.colors = []
                self.colors.append(value)
            else:
                self.colors = value


class CategoryChart(XYChart):
    def __init__(self, **kwargs):
        self.categoryNamesLabelAngle = 0.0
        self.categoryNames = []
        self.orientation = PlotOrientationType.VERTICAL
        self.category_margin = 0.2

        super(CategoryChart, self).__init__(**kwargs)

        self.type = 'CategoryPlot'

    def setCategoryNamesLabelAngle(self, value):
        self.categoryNamesLabelAngle = value

    def setCategoryNames(self, value):
        self.categoryNames = value

    def setOrientation(self, value):
        self.orientation = value

    def setCategoryMargin(self, value):
        self.category_margin = value


class TreeMapChart(XYChart):
    def __init__(self, **kwargs):
        self.title = ''
        self.colorProvider = RandomColorProvider()
        self.mode = Mode.SQUARIFY.value

        super(TreeMapChart, self).__init__(**kwargs)

        self.type = 'TreeMap'
        self.setShowLegend(False)

        self.valueAccessor = getValue(kwargs, 'valueAccessor',
                                      ValueAccessor.VALUE)

        self.graphics_list = getValue(kwargs, 'root')

    def setRoot(self, value):
        self.graphics_list = value

    def setToolTipBuilder(self, value):
        self.toolTipBuilder = value

    def setRatio(self, value):
        self.ratio = value

    def setMode(self, value):
        self.mode = value.value

    def setTitle(self, value):
        self.title = value

    def setColorProvider(self, value):
        self.colorProvider = value

    def setValueAccessor(self, value):
        self.valueAccessor = value

    def transform(self):
        self.process(self.graphics_list)
        return super(TreeMapChart, self).transform()

    def process(self, node):
        children = node.children

        if children is not None:
            for child in children:
                self.process(child)

        if node.isLeaf():
            node.color = self.colorProvider.getColor(node)
            toolTipBuilder = self.toolTipBuilder
            if toolTipBuilder is not None:
                node.tooltip = toolTipBuilder.getToolTip(node)


class CombinedChart(ChartDetails):
    def __init__(self, **kwargs):
        self.y_tickLabels_visible = True
        self.x_tickLabels_visible = True
        self.plots = []
        self.weights = []
        self.x_label = 'Linear'

        super(CombinedChart, self).__init__(**kwargs)

        self.version = 'groovy'
        self.type = 'CombinedPlot'
        self.plot_type = 'Plot'

    def setTitle(self, value):
        self.title = value

    def setPlots(self, value):
        self.plots = value

    def setWeights(self, value):
        self.weights = value

    def setXLabel(self, value):
        self.x_label = value

    def setXTickLabelsVisible(self, value):
        self.x_tickLabels_visible = value

    def setYTickLabelsVisible(self, value):
        self.y_tickLabels_visible = value


class Plot(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(Plot, self).__init__(**kwargs)
        self.chart = XYChart(**kwargs)
        self.model = self.chart.transform()

    def add(self, item):
        self.chart.add(item)
        self.model = self.chart.transform()
        return self

    def getYAxes(self):
        return self.chart.rangeAxes

    def setShowLegend(self, show):
        self.chart.show_legend = show
        self.model = self.chart.transform()
        return self


class CategoryPlot(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(CategoryPlot, self).__init__(**kwargs)
        self.chart = CategoryChart(**kwargs)
        self.model = self.chart.transform()

    def add(self, item):
        self.chart.add(item)
        self.model = self.chart.transform()
        return self


class HeatMap(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(HeatMap, self).__init__(**kwargs)
        if 'data' in kwargs:
            kwargs['graphics'] = kwargs['data']
        if not 'xLowerMargin' in kwargs:
            kwargs['xLowerMargin'] = 0.0
        if not 'yLowerMargin' in kwargs:
            kwargs['yLowerMargin'] = 0.0
        if not 'yUpperMargin' in kwargs:
            kwargs['yUpperMargin'] = 0.0
        if not 'xUpperMargin' in kwargs:
            kwargs['xUpperMargin'] = 0.0
        if not 'legendLayout' in kwargs:
            kwargs['legendLayout'] = LegendLayout.HORIZONTAL
        if not 'legendPosition' in kwargs:
            kwargs['legendPosition'] = LegendPosition(
                position=LegendPosition.Position.BOTTOM_RIGHT)
        self.chart = XYChart(**kwargs)
        color = getValue(kwargs, 'color',
                         ["#FF780004", "#FFF15806", "#FFFFCE1F"])

        if isinstance(color, GradientColor):
            self.chart.color = color.color
        else:
            self.chart.color = color

        self.chart.type = 'HeatMap'

        self.model = self.chart.transform()


class Histogram(BeakerxDOMWidget):
    class DisplayMode(Enum):
        OVERLAP = 1
        STACK = 2
        SIDE_BY_SIDE = 3

    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(Histogram, self).__init__()
        self.chart = HistogramChart(**kwargs)
        data = getValue(kwargs, 'data', [])
        if len(data) > 1 and isinstance(data[0], list):
            for x in data:
                self.chart.graphics_list.append(x)
        else:
            self.chart.graphics_list.append(data)
        self.model = self.chart.transform()


class TreeMap(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(TreeMap, self).__init__()
        self.chart = TreeMapChart(**kwargs)
        self.model = self.chart.transform()

    def setColorProvider(self, provider):
        self.chart.colorProvider = provider
        self.model = self.chart.transform()


class TimePlot(Plot):
    def __init__(self, **kwargs):
        super(TimePlot, self).__init__(**kwargs)
        self.chart.type = 'TimePlot'

    def getChartColors(self, columnNames, colors):
        chartColors = []
        if colors is not None:
            for i in range(len(columnNames)):
                if i < len(colors):
                    chartColors.append(self.createChartColor(colors[i]))
        return chartColors

    def createChartColor(self, color):
        if isinstance(color, list):
            try:
                return Color(color[0], color[1], color[2])
            except  Exception:
                raise Exception("Color list too short")
        else:
            return color


class NanoPlot(TimePlot):
    def __init__(self, **kwargs):
        super(NanoPlot, self).__init__(**kwargs)
        self.chart.type = 'NanoPlot'

    def add(self, item):
        super(NanoPlot, self).add(item)
        converted = []
        for l in self.chart.graphics_list:
            for x in l.x:
                converted.append(str(x))
            l.x = converted
        self.model = self.chart.transform()
        return self


class SimpleTimePlot(TimePlot):
    def __init__(self, *args, **kwargs):
        super(SimpleTimePlot, self).__init__(**kwargs)
        self.chart.type = 'TimePlot'
        self.use_tool_tip = True
        self.show_legend = True
        time_column_default = 'time'
        displayNames = getValue(kwargs, 'displayNames')
        displayLines = getValue(kwargs, 'displayLines', True)
        displayPoints = getValue(kwargs, 'displayPoints', False)
        colors = getValue(kwargs, 'colors')

        if len(args) > 0:
            tableData = args[0]
        else:
            tableData = []

        if len(args) == 2:
            columnNames = args[1]
        else:
            columnNames = []

        xs = []
        yss = []
        dataColumnsNames = []
        parse_x = True

        if isinstance(tableData, DataFrame):
            if tableData.index.name is not None:
                time_column_default = tableData.index.name
            if not isinstance(tableData.index, pd.RangeIndex):
                parse_x = False
                xs = tableData.index.get_values()
            tableData = tableData.to_dict(orient='rows')

        timeColumn = getValue(kwargs, 'timeColumn', time_column_default)
        self.chart.domain_axis_label = getValue(kwargs, 'xLabel', timeColumn)
        if tableData is not None and columnNames is not None:
            dataColumnsNames.extend(list(tableData[0]))

            for row in tableData:
                if parse_x:
                    x = row[timeColumn]
                    x = date_time_2_millis(x)
                    xs.append(x)

                for idx in range(len(columnNames)):
                    column = columnNames[idx]
                    if (idx >= len(yss)):
                        yss.append([])

                    yss[idx].append(row[column])

            colors = self.getChartColors(columnNames, colors)

            for i in range(len(yss)):
                ys = yss[i]
                if displayLines is True:
                    line = Line(x=xs, y=ys)

                    if displayNames is not None and i < len(displayNames):
                        line.display_name = displayNames[i]
                    else:
                        line.display_name = columnNames[i]

                    if i < len(colors):
                        line.color = colors[i]

                    self.add(line)

                if displayPoints is True:
                    points = Points(x=xs, y=ys)

                    if displayNames is not None and i < len(displayNames):
                        points.display_name = displayNames[i]
                    else:
                        points.display_name = columnNames[i]

                    if i < len(colors):
                        points.color = colors[i]

                    self.add(points)


class CombinedPlot(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(CombinedPlot, self).__init__(**kwargs)
        self.chart = CombinedChart(**kwargs)
        self.model = self.chart.transform()

    def add(self, item, weight):
        if isinstance(item.chart, XYChart):
            self.chart.plots.append(item.chart)
            self.chart.weights.append(weight)
        elif isinstance(item, list):
            for elem in item:
                self.chart.add(elem.chart, 1)
        else:
            raise Exception('CombinedPlot takes XYChart or List of XYChart')

        self.model = self.chart.transform()
        return self


def parseJSON(out):
    return json.loads(out, object_hook=transformBack)


def transformBack(obj):
    if 'type' in obj:
        res = eval(obj['type'])()
        res.transformBack(obj)
        return res
    return obj
