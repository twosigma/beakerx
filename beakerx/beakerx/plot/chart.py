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

from beakerx.beakerx_widgets import BeakerxDOMWidget
from ipykernel.comm import Comm
from pandas import DataFrame
from traitlets import Unicode, Dict
from beakerx.plot.chart_models import *


class Plot(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(Plot, self).__init__()
        self.chart = XYChart(**kwargs)
        self.model = self.chart.transform()
        self.on_msg(self._handle_msg)
        self.details = GraphicsActionObject(None, {})

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

    def _handle_msg(self, msg):
        params = msg['content']['data']['content']
        graphics_object = None
        for item in self.chart.graphics_list:
            if item.uid == params['itemId']:
                graphics_object = item
        self.details = GraphicsActionObject(graphics_object, params['params'])
        if params['event'] == 'onclick':
            self._on_click_action(msg)
        elif params['event'] == 'onkey':
            self._on_key_action(msg)
        elif params['event'] == 'actiondetails':
            self._on_action_details(msg)

    def _on_click_action(self, msg):
        params = msg['content']['data']['content']
        for item in self.chart.graphics_list:
            if item.uid == params['itemId']:
                item.fireClick(self.details)
                self.model = self.chart.transform()

    def _on_key_action(self, msg):
        params = msg['content']['data']['content']
        for item in self.chart.graphics_list:
            if item.uid == params['itemId']:
                item.fireKey(self.details, params['params']['key'])
                self.model = self.chart.transform()

    def _on_action_details(self, msg):
        params = msg['content']['data']['content']
        graphics_object = None
        for item in self.chart.graphics_list:
            if item.uid == params['itemId']:
                graphics_object = item
        action_type = params['params']['actionType']
        if action_type == 'onclick' or action_type == 'onkey':
            self.details = GraphicsActionObject(graphics_object, params['params'])
            arguments = dict(target_name='beakerx.tag.run')
            comm = Comm(**arguments)
            msg = {'runByTag': params['params']['tag']}
            state = {'state': msg}
            comm.send(data=state, buffers=[])


class GraphicsActionObject:
    def __init__(self, graphics_object, params):
        self.graphics = graphics_object
        self.key = params.get('key')
        self.tag = params.get('tag')
        self.index = params.get('index')
        self.actionType = params.get('actionType')


class CategoryPlot(BeakerxDOMWidget):
    _view_name = Unicode('PlotView').tag(sync=True)
    _model_name = Unicode('PlotModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        super(CategoryPlot, self).__init__()
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

    def __init__(self, rows_limit=10000, column_limit=100, **kwargs):
        super(HeatMap, self).__init__()
        if 'data' in kwargs:
            data_from_kwargs = kwargs['data']
            if isinstance(data_from_kwargs, DataFrame):
                kwargs['graphics'] = data_from_kwargs.values.tolist()
            else:
                kwargs['graphics'] = data_from_kwargs
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
        self.rows_limit = rows_limit
        self.column_limit = column_limit
        self.chart = HeatMapChart(self.rows_limit, self.column_limit, **kwargs)
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
        for l in self.chart.graphics_list:
            convertedx = []
            convertedy = []
            for x in l.x:
                convertedx.append(str(x))
            l.x = convertedx
            for y in l.y:
                convertedy.append(str(y))
            l.y = convertedy
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
        super(CombinedPlot, self).__init__()
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
