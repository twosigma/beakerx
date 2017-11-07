# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License")
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

from beakerx.beakerx_widgets import *
from traitlets import Unicode, Dict
from beakerx.utils import *
from beakerx.tabledisplay.tableitems import *
import math
import numpy
from pandas import DataFrame, RangeIndex, MultiIndex


class Table(BaseObject):
    def __init__(self, *args, **kwargs):

        self.values = []
        self.types = []
        types_map = dict()
        self.columnNames = []
        self.hasIndex = None
        if isinstance(args[0], DataFrame):
            self.convert_from_pandas(args, types_map)
        elif isinstance(args[0], dict):
            self.convert_from_dict(args)
        elif isinstance(args[0], list):
            self.convert_from_list(args, types_map)

        self.headersVertical = False
        self.headerFontSize = None
        self.contextMenuItems = []
        self.alignmentForType = {}
        self.tooManyRows = False
        self.stringFormatForColumn = {}
        self.subtype = "ListOfMaps"
        self.stringFormatForType = {}
        self.fontColor = []
        self.contextMenuTags = {}
        self.cellHighlighters = []
        self.stringFormatForTimes = None
        self.type = "TableDisplay"
        self.timeZone = None
        self.tooltips = []
        self.columnsFrozen = {}
        self.rendererForType = {}
        self.doubleClickTag = None
        self.alignmentForColumn = {}
        self.columnOrder = []
        self.rendererForColumn = {}
        self.dataFontSize = None
        self.columnsFrozenRight = {}
        self.columnsVisible = {}
        self.hasDoubleClickAction = False

    def convert_from_dict(self, args):
        self.columnNames.append("Key")
        self.columnNames.append("Value")
        for key in args[0].keys():
            row = [key, args[0].get(key, "")]
            self.values.append(row)

    def convert_from_list(self, args, types_map):
        for element in args[0]:
            for key in element.keys():
                if key not in self.columnNames:
                    self.columnNames.append(key)
                    column_type = self.convert_type(type(element[key]), element[key])
                    self.types.append(column_type)
                    types_map[key] = column_type

        for element in args[0]:
            row = []
            for columnName in self.columnNames:
                value = element.get(columnName, "")
                value_type = types_map.get(columnName)

                row.append(self.convert_value(value, value_type))
            self.values.append(row)

    def convert_from_pandas(self, args, types_map):
        self.columnNames = args[0].columns.tolist()
        if args[0].index.name is not None and args[0].index.name in self.columnNames:
            self.columnNames.remove(args[0].index.name)

        for column in self.columnNames:
            column_type = self.convert_type(args[0].dtypes[column].name,
                                            args[0][column].get_values()[0])
            self.types.append(column_type)
            types_map[column] = column_type
        for index in range(len(args[0])):
            row = []
            for columnName in self.columnNames:
                value = args[0][columnName].get_values()[index]
                value_type = types_map.get(columnName)

                row.append(self.convert_value(value, value_type))
            if not isinstance(args[0].index, RangeIndex):
                row[:0] = [self.convert_value(args[0].index.get_values()[index], type(args[0].index.get_values()[index]))]
            self.values.append(row)

        if not isinstance(args[0].index, RangeIndex):
            self.hasIndex = "true"
            if isinstance(args[0].index, MultiIndex):
                self.columnNames[:0] = [', '.join(args[0].index.names)]
            else:
                self.columnNames[:0] = [args[0].index.name]
            self.types[:0] = [self.convert_type("", args[0][column].get_values()[0])]

    @staticmethod
    def convert_value(value, value_type):
        if value_type == "time":
            converted_value = DateType(value)
        elif value_type == "double":
            converted_value = value.astype('str')
        elif value_type == "integer":
            converted_value = value.item()
        elif value_type == "int64":
            converted_value = value.astype('str')
        elif value_type == "string":
            if isinstance(value, float):
                if math.isnan(value):
                    converted_value = ""
                else:
                    converted_value = str(value)
            else:
                converted_value = str(value)

        else:
            converted_value = str(value)
        return converted_value

    @staticmethod
    def convert_type(object_type, value):
        if value == "":
            return "string"
        if isinstance(value, float):
            if math.isnan(value):
                return "string"
        if object_type == "float64":
            return "double"
        if object_type == "int64":
            if value > numpy.iinfo(numpy.int32).max or value < numpy.iinfo(numpy.int32).min:
                return "int64"
            else:
                return "integer"
        if object_type == "uint64":
            return "int64"
        if is_date(value):
            return "time"
        if isinstance(value, str):
            return "string"
        return "string"


class TableDisplay(BeakerxDOMWidget):
    _view_name = Unicode('TableDisplayView').tag(sync=True)
    _model_name = Unicode('TableDisplayModel').tag(sync=True)
    model = Dict().tag(sync=True)

    def __init__(self, *args, **kwargs):
        super(TableDisplay, self).__init__(**kwargs)
        self.chart = Table(*args, **kwargs)
        self.model = self.chart.transform()

    def setAlignmentProviderForColumn(self, column_name, display_alignment):
        if isinstance(display_alignment, TableDisplayAlignmentProvider):
            self.chart.alignmentForColumn[column_name] = display_alignment.value
        self.model = self.chart.transform()
        return self

    def setStringFormatForTimes(self, time_unit):
        self.chart.stringFormatForTimes = time_unit.name
        self.model = self.chart.transform()
        return self

    def setStringFormatForType(self, type, formater):
        if isinstance(type, ColumnType):
            self.chart.stringFormatForType[type.value] = formater
            self.model = self.chart.transform()
            return self

    def setStringFormatForColumn(self, column, formater):
        self.chart.stringFormatForColumn[column] = formater
        self.model = self.chart.transform()
        return self

    def setRendererForColumn(self, column, renderer):
        self.chart.rendererForColumn[column] = renderer
        self.model = self.chart.transform()
        return self

    def setRendererForType(self, type, renderer):
        if isinstance(type, ColumnType):
            self.chart.rendererForType[type.value] = renderer
            self.model = self.chart.transform()
        return self

    def setColumnFrozen(self, column, visible):
        self.chart.columnsFrozen[column] = visible
        self.model = self.chart.transform()
        return self

    def setColumnFrozenRight(self, column, visible):
        self.chart.columnsFrozenRight[column] = visible
        self.model = self.chart.transform()
        return self

    def setColumnVisible(self, column, visible):
        self.chart.columnsVisible[column] = visible
        self.model = self.chart.transform()
        return self

    def setColumnOrder(self, order):
        self.chart.columnOrder = order
        self.model = self.chart.transform()
        return self

    def removeAllCellHighlighters(self):
        self.chart.cellHighlighters = []
        self.model = self.chart.transform()
        return self

    def addCellHighlighter(self, highlighter):
        if isinstance(highlighter, HeatmapHighlighter):
            self.chart.cellHighlighters.append(highlighter)
            self.model = self.chart.transform()
        return self
