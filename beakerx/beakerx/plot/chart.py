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


class Chart(BaseObject):
    def __init__(self, **kwargs):
        super(Chart, self).__init__(**kwargs)
        self.init_width = getValue(kwargs, 'initWidth', 640)
        self.init_height = getValue(kwargs, 'initHeight', 480)
        self.chart_title = getValue(kwargs, 'title')
        self.show_legend = getValue(kwargs, 'showLegend')
        self.use_tool_tip = getValue(kwargs, 'useToolTip', True)
        self.legend_position = getValue(kwargs, 'legendPosition',
                                        LegendPosition())
        self.legend_layout = getValue(kwargs, 'legendLayout',
                                      LegendLayout.VERTICAL)
        self.type = "Plot"


class AbstractChart(Chart):
    def __init__(self, **kwargs):
        super(AbstractChart, self).__init__(**kwargs)
        self.rangeAxes = getValue(kwargs, 'yAxes', [])
        if len(self.rangeAxes) == 0:
            self.rangeAxes.append(YAxis(**kwargs))
        self.domain_axis_label = getValue(kwargs, 'xLabel')
        self.y_label = getValue(kwargs, 'yLabel')
        self.x_lower_margin = getValue(kwargs, 'xLowerMargin', 0.05)
        self.x_upper_margin = getValue(kwargs, 'xUpperMargin', 0.05)
        self.y_auto_range = getValue(kwargs, 'yAutoRange')
        self.y_auto_range_includes_zero = getValue(kwargs,
                                                   'yAutoRangeIncludesZero')
        self.y_lower_margin = getValue(kwargs, 'yLowerMargin')
        self.y_upper_margin = getValue(kwargs, 'yUpperMargin')
        self.y_lower_bound = getValue(kwargs, 'yLowerBound')
        self.y_upper_bound = getValue(kwargs, 'yUpperBound')
        self.log_y = getValue(kwargs, 'logY', False)
        self.omit_checkboxes = getValue(kwargs, 'omitCheckboxes', False)
        self.crosshair = getValue(kwargs, 'crosshair')
        self.timezone = getValue(kwargs, 'timeZone')
        self.auto_zoom = getValue(kwargs, 'autoZoom')


class XYChart(AbstractChart):
    def __init__(self, **kwargs):
        super(XYChart, self).__init__(**kwargs)
        self.graphics_list = getValue(kwargs, 'graphics', [])
        self.constant_lines = getValue(kwargs, 'constantLines', [])
        self.constant_bands = getValue(kwargs, 'constantBands', [])
        self.texts = getValue(kwargs, 'texts', [])
        self.x_auto_range = getValue(kwargs, 'xAutoRange', True)
        self.x_lower_bound = getValue(kwargs, 'xLowerBound', 0)
        self.x_upper_bound = getValue(kwargs, 'xUpperBound', 0)
        self.log_x = getValue(kwargs, 'logX', False)
        self.x_log_base = getValue(kwargs, 'xLogBase', 10)
        self.lodThreshold = getValue(kwargs, 'lodThreshold')
    
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

    def setYBound(self, lower, upper):
        self.y_lower_bound = lower
        self.y_upper_bound = upper
        self.rangeAxes[0].setBound(lower, upper)
        return self

    def setXBound(self, lower, upper):
        self.x_auto_range = False
        self.x_lower_bound = lower
        self.x_upper_bound = upper
        return self


class HistogramChart(XYChart):
    def __init__(self, **kwargs):
        self.log = getValue(kwargs, 'log', False)
        if self.log:
            kwargs['logY'] = True
        
        super(HistogramChart, self).__init__(**kwargs)
        self.type = 'Histogram'
        self.bin_count = getValue(kwargs, 'binCount')
        self.cumulative = getValue(kwargs, 'cumulative', False)
        self.normed = getValue(kwargs, 'normed', False)
        
        self.range_min = getValue(kwargs, 'rangeMin')
        self.range_max = getValue(kwargs, 'rangeMax')
        self.names = getValue(kwargs, 'names')
        self.displayMode = getValue(kwargs, 'displayMode')
        
        color = getValue(kwargs, 'color')
        if color is not None:
            if isinstance(color, Color):
                self.colors = []
                self.colors.append(color)
            else:
                self.colors = color


class CategoryChart(XYChart):
    def __init__(self, **kwargs):
        super(CategoryChart, self).__init__(**kwargs)
        self.type = 'CategoryPlot'
        self.categoryNamesLabelAngle = getValue(kwargs,
                                                'categoryNamesLabelAngle', 0.0)
        self.categoryNames = getValue(kwargs, 'categoryNames', [])
        self.y_upper_margin = getValue(kwargs, 'upperMargin', 0.0)
        self.y_lower_bound = getValue(kwargs, 'lowerMargin', 0.0)
        self.x_upper_margin = getValue(kwargs, 'upperMargin', 0.05)
        self.x_lower_margin = getValue(kwargs, 'lowerMargin', 0.05)
        self.category_margin = getValue(kwargs, 'categoryMargin', 0.2)
        self.y_auto_range_includes_zero = getValue(kwargs,
                                                   'y_auto_range_includes_zero',
                                                   False)
        self.y_auto_range = getValue(kwargs, 'y_auto_range', True)
        self.orientation = getValue(kwargs, 'orientation')


class TreeMapChart(XYChart):
    def __init__(self, **kwargs):
        super(TreeMapChart, self).__init__(**kwargs)
        self.type = 'TreeMap'
        self.showLegend = getValue(kwargs, 'showLegend', True)
        self.title = getValue(kwargs, 'title', "")
        self.colorProvider = getValue(kwargs, 'colorProvider',
                                      RandomColorProvider())
        self.toolTipBuilder = getValue(kwargs, 'toolTipBuilder')
        self.mode = getValue(kwargs, 'mode', Mode.SQUARIFY).value
        self.ratio = getValue(kwargs, 'ratio')
        self.valueAccessor = getValue(kwargs, 'valueAccessor',
                                      ValueAccessor.VALUE)
        self.custom_styles = []
        self.element_styles = {}
        self.graphics_list = getValue(kwargs, 'root')
    
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


class CombinedChart(BaseObject):
    def __init__(self, **kwargs):
        super(CombinedChart, self).__init__(**kwargs)
        self.init_width = getValue(kwargs, 'initWidth', 640)
        self.init_height = getValue(kwargs, 'initHeight', 480)
        self.title = getValue(kwargs, 'title')
        self.x_label = getValue(kwargs, 'xLabel', 'Linear')
        self.plots = getValue(kwargs, 'plots', [])
        self.weights = getValue(kwargs, 'weights', [])
        self.auto_zoom = getValue(kwargs, 'autoZoom')
        self.version = 'groovy'
        self.type = 'CombinedPlot'
        self.y_tickLabels_visible = True
        self.x_tickLabels_visible = True
        self.plot_type = 'Plot'


class Plot(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
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

    def setXBound(self, *args):
        if len(args) == 1 and isinstance(args[0], list):
            arg_list = args[0]
            if len(arg_list) == 2:
                self.chart.setXBound(arg_list[0], arg_list[1])
            else:
                raise ValueError('to set the x bound, the list needs to be of size=2.')
        else:
            self.chart.setXBound(args[0], args[1])
        self.model = self.chart.transform()
        return self

    def setYBound(self, *args):
        if len(args) == 1 and isinstance(args[0], list):
            arg_list = args[0]
            if len(arg_list) == 2:
                self.chart.setYBound(arg_list[0], arg_list[1])
            else:
                raise ValueError('to set the y bound, the list needs to be of size=2.')
        else:
            self.chart.setYBound(args[0], args[1])
        self.model = self.chart.transform()
        return self

    def _ipython_display_(self, **kwargs):
        self.model = self.chart.transform()
        super(Plot, self)._ipython_display_(**kwargs)


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

    def _ipython_display_(self, **kwargs):
        self.model = self.chart.transform()
        super(CategoryPlot, self)._ipython_display_(**kwargs)

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
