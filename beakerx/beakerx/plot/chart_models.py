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

import copy
from beakerx.plot.legend import LegendPosition, LegendLayout
from beakerx.plot.plotitem import *
from beakerx.plot.plotitem_treemap import *
from beakerx.utils import *
from .tree_map_reducer import TreeMapReducer


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

    TOO_MANY_ROWS = "tooManyRows"
    TOTAL_NUMBER_OF_POINTS = "totalNumberOfPoints"
    NUMBER_OF_POINTS_TO_DISPLAY = "numberOfPointsToDisplay"
    ROWS_LIMIT_ITEMS = "rowsLimitItems"

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


class HeatMapChart(XYChart):

    ROWS_LIMIT = 10000
    COLUMN_LIMIT = 100

    def __init__(self, rows_limit, column_limit, **kwargs):
        super(HeatMapChart, self).__init__(**kwargs)
        self.rows_limit = rows_limit
        self.column_limit = column_limit

    @staticmethod
    def total_points(listOfData):
        return sum(map(lambda x: len(x), listOfData))

    @staticmethod
    def find_step_for_column(row):
        step = 2
        while (int(len(row) / step)) > HeatMapChart.COLUMN_LIMIT:
            step += 1
        return step

    @staticmethod
    def limit_column_in_row(row):
        if len(row) > HeatMapChart.COLUMN_LIMIT:
            step = HeatMapChart.find_step_for_column(row)
            limited_row = list(map(lambda index: row[index],
                                   filter(lambda s: s % step == 0,
                                          [index for index in range(len(row))])))
            return limited_row
        else:
            return row

    @staticmethod
    def limit_elements_in_row(listOfData):
        return list(map(HeatMapChart.limit_column_in_row, listOfData))

    @staticmethod
    def limit_rows(listOfData):
        step = HeatMapChart.find_step_for_column(listOfData)
        limited_row = list(map(lambda index: listOfData[index],
                               filter(lambda s: s % step == 0,
                                      [index for index in range(len(listOfData))])))
        return limited_row

    @staticmethod
    def limit_Heatmap(listOfData):
        limited_elements_in_row = HeatMapChart.limit_elements_in_row(listOfData)
        total_points = HeatMapChart.total_points(limited_elements_in_row)
        too_many_rows = total_points > HeatMapChart.ROWS_LIMIT
        if too_many_rows:
            return HeatMapChart.limit_rows(limited_elements_in_row)
        return limited_elements_in_row

    def transform(self):
        self_copy = copy.copy(self)
        self_copy.totalNumberOfPoints = self.total_points(self_copy.graphics_list)
        self_copy.rowsLimitItems = self.rows_limit
        too_many_points = self_copy.totalNumberOfPoints > self.rows_limit

        if too_many_points:
            limited_heat_map_data = self.limit_Heatmap(self_copy.graphics_list)
            self_copy.graphics_list = limited_heat_map_data
            self_copy.numberOfPointsToDisplay = self.total_points(self_copy.graphics_list)

        self_copy.numberOfPointsToDisplay = self.total_points(self_copy.graphics_list)
        self_copy.tooManyRows = too_many_points
        return super(HeatMapChart, self_copy).transform()


class HistogramChart(XYChart):
    ROWS_LIMIT = 1000000
    ROWS_LIMIT_T0_INDEX = 10000

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

    @staticmethod
    def limit_points(x):
        if len(x) >= HistogramChart.ROWS_LIMIT:
            return x[0:HistogramChart.ROWS_LIMIT_T0_INDEX]
        return x

    @staticmethod
    def total_number(listOfData):
        return max(list(map(lambda x: len(x), listOfData)))

    def transform(self):
        self_copy = copy.copy(self)
        self_copy.totalNumberOfPoints = HistogramChart.total_number(self_copy.graphics_list)
        self_copy.tooManyRows = self_copy.totalNumberOfPoints >= HistogramChart.ROWS_LIMIT
        self_copy.rowsLimitItems = HistogramChart.ROWS_LIMIT
        self_copy.numberOfPointsToDisplay = str(HistogramChart.ROWS_LIMIT_T0_INDEX) + " items"
        self_copy.graphics_list = list(map(HistogramChart.limit_points, self_copy.graphics_list))
        return super(HistogramChart, self_copy).transform()


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
    ROWS_LIMIT = 1000

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
        tree_map = self
        tree_map.process(tree_map.graphics_list)
        count_nodes = tree_map.count_nodes(self.graphics_list, self.increase_by_one, 0)
        to_many_rows = count_nodes > TreeMapChart.ROWS_LIMIT
        if to_many_rows:
            tree_map = copy.copy(self)
            tree_map.totalNumberOfPoints = count_nodes
            tree_map.rowsLimitItems = TreeMapChart.ROWS_LIMIT
            tree_map.graphics_list = TreeMapReducer.limit_tree_map(TreeMapChart.ROWS_LIMIT, self.graphics_list)
            tree_map.numberOfPointsToDisplay = str(
                tree_map.count_nodes(tree_map.graphics_list, self.increase_by_one_when_leaf, 0)
            ) + " leaves"
        tree_map.tooManyRows = to_many_rows
        return super(TreeMapChart, tree_map).transform()

    def process(self, node):
        children = node.children

        if children is not None:
            for child in children:
                self.process(child)
        node.user_object["isLeaf"] = node.isLeaf()
        if node.isLeaf():
            node.color = self.colorProvider.getColor(node)
            toolTipBuilder = self.toolTipBuilder
            if toolTipBuilder is not None:
                node.tooltip = toolTipBuilder.getToolTip(node)

    @staticmethod
    def increase_by_one(node, count):
        return count + 1

    @staticmethod
    def increase_by_one_when_leaf(node, count):
        if node.user_object["isLeaf"]:
            count = count + 1
        return count

    def count_nodes(self, node, increase_fun, count):
        count = increase_fun(node, count)
        children = node.children
        if children is not None:
            for child in children:
                count = self.count_nodes(child, increase_fun, count)
        return count


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
