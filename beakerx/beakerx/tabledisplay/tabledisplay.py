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

import numpy as np
from beakerx.beakerx_widgets import *
from beakerx.tabledisplay.tableitems import *
from beakerx.utils import *
from ipykernel.comm import Comm
from pandas import DataFrame, RangeIndex, MultiIndex, DatetimeIndex
from traitlets import Unicode, Dict


class Table(BaseObject):
    NAT_VALUE = "NaT"

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
        self.filteredValues = None

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
                    column_type = self.convert_type(type(element[key]))
                    self.types.append(column_type)
                    types_map[key] = column_type
                elif types_map[key] != "string":
                    type_for_key = types_map[key]
                    column_type = self.convert_type(type(element[key]))
                    if type_for_key != column_type:
                        self.types[self.columnNames.index(key)] = "string"
                        types_map[key] = "string"
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

        column = None
        for column in self.columnNames:
            column_type = self.convert_type(args[0].dtypes[column].name)
            self.types.append(column_type)
            types_map[column] = column_type
        for index in range(len(args[0])):
            row = []
            for columnName in self.columnNames:
                value = args[0][columnName].get_values()[index]
                value_type = types_map.get(columnName)
                row.append(self.convert_value(value, value_type))
            if not isinstance(args[0].index, RangeIndex):
                index_type = self.convert_type(args[0].index.dtype)
                index_values = args[0].index.get_values()[index]
                tz = self.get_tz(args[0].index)
                row[:0] = [self.convert_value(index_values, index_type, tz)]
            self.values.append(row)

        if not isinstance(args[0].index, RangeIndex) and column is not None:
            self.hasIndex = "true"
            if isinstance(args[0].index, MultiIndex):
                columns = list(map(lambda x: self.convert_none_to_index_name(x), args[0].index.names))
                self.columnNames[:0] = [', '.join(columns)]
            else:
                self.columnNames[:0] = [args[0].index.name]
            self.types[:0] = [self.convert_type(args[0].index.dtype)]

    @staticmethod
    def get_tz(index):
        if not isinstance(index, DatetimeIndex):
            return None
        tz = index.tz
        if tz is None:
            return None
        return tz.zone

    @staticmethod
    def convert_none_to_index_name(x):
        if x is None:
            return "index"
        else:
            return x

    @staticmethod
    def convert_value(value, value_type, tz=None):
        if value_type == "time":
            if np.isnat(value):
                return str(Table.NAT_VALUE)
            return DateType(value, tz)
        else:
            return value

    @staticmethod
    def convert_type(object_type):
        type_name = str(object_type)
        if "float" in type_name:
            return "double"
        elif "int" in type_name:
            return "integer"
        elif "datetime" in type_name:
            return "time"
        elif "bool" in type_name:
            return "boolean"
        else:
            return "string"

    def setToolTip(self, configTooltip):
        for row_ind in range(0, len(self.values)):
            row = self.values[row_ind]
            rowToolTips = []
            for col_ind in range(0, len(row)):
                rowToolTips.append(configTooltip(row_ind, col_ind, self))
            self.tooltips.append(rowToolTips)

    def setDataFontSize(self, dataFontSize):
        self.dataFontSize = dataFontSize

    def setHeaderFontSize(self, headerFontSize):
        self.headerFontSize = headerFontSize

    def setFontColorProvider(self, colorProvider):
        for row_ind in range(0, len(self.values)):
            row = self.values[row_ind]
            row_font_colors = []
            for col_ind in range(0, len(row)):
                row_font_colors.append(colorProvider(row_ind, col_ind, self))
            self.fontColor.append(row_font_colors)

    def setHeadersVertical(self, headersVertical):
        self.headersVertical = headersVertical

    def setRowFilter(self, filter_row):
        self.filteredValues = []
        for row_ind in range(0, len(self.values)):
            if filter_row(row_ind, self.values):
                self.filteredValues.append(self.values[row_ind])


class TableDisplay(BeakerxDOMWidget):
    _view_name = Unicode('TableDisplayView').tag(sync=True)
    _model_name = Unicode('TableDisplayModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    model = Dict().tag(sync=True)
    contextMenuListeners = dict()

    def __init__(self, *args, **kwargs):
        super(TableDisplay, self).__init__(**kwargs)
        self.chart = Table(*args, **kwargs)
        self.model = self.chart.transform()
        self.on_msg(self.handle_msg)
        self.details = None

    def setAlignmentProviderForType(self, type, alignmentProvider):
        if isinstance(type, ColumnType):
            self.chart.alignmentForType[type.value] = alignmentProvider
            self.model = self.chart.transform()
        return self

    def setAlignmentProviderForColumn(self, column_name, display_alignment):
        if isinstance(display_alignment, TableDisplayAlignmentProvider):
            self.chart.alignmentForColumn[column_name] = display_alignment.value
        self.model = self.chart.transform()
        return self

    def setStringFormatForTimes(self, time_unit):
        self.setStringFormatForType(ColumnType.Time, TableDisplayStringFormat.getTimeFormat(time_unit))
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
        if isinstance(highlighter, Highlighter):
            self.chart.cellHighlighters.append(highlighter)
            self.model = self.chart.transform()
        return self

    def setDoubleClickAction(self, listener):
        if listener is not None:
            if isinstance(listener, str):
                self.doubleClickListener = None
                self.chart.doubleClickTag = listener
            elif isinstance(listener, types.FunctionType):
                self.doubleClickListener = listener
                self.chart.doubleClickTag = None
                self.chart.hasDoubleClickAction = True

            self.model = self.chart.transform()

    def setTimeZone(self, timezone):
        self.chart.timeZone = timezone
        self.model = self.chart.transform()
        return self

    def addContextMenuItem(self, name, func):
        self.contextMenuListeners[name] = func
        self.chart.contextMenuItems.append(name)
        self.model = self.chart.transform()

    def doubleClickListener(self, row, column, tabledisplay):
        pass

    def handle_msg(self, tabledisplay, params, list):
        self.details = TableActionDetails(params)
        if params['event'] == 'DOUBLE_CLICK':
            self.doubleClickListener(params['row'], params['column'], tabledisplay)
            self.model = self.chart.transform()
        if params['event'] == 'CONTEXT_MENU_CLICK':
            func = self.contextMenuListeners.get(params['itemKey'])
            if func is not None:
                if isinstance(func, str):
                    self._run_by_tag(func)
                else:
                    func(params['row'], params['column'], tabledisplay)
                    self.model = self.chart.transform()
        if params['event'] == 'actiondetails':
            if params['params']['actionType'] == 'DOUBLE_CLICK':
                self._run_by_tag(self.chart.doubleClickTag)

    def _run_by_tag(self, tag):
        arguments = dict(target_name='beakerx.tag.run')
        comm = Comm(**arguments)
        msg = {'runByTag': tag}
        state = {'state': msg}
        comm.send(data=state, buffers=[])

    def updateCell(self, row, columnName, value):
        row = self.chart.values[row]
        col_index = self.chart.columnNames.index(columnName)
        row[col_index] = value

    def sendModel(self):
        self.model = self.chart.transform()

    @property
    def values(self):
        return self.chart.values

    def setToolTip(self, configTooltip):
        self.chart.setToolTip(configTooltip)
        self.model = self.chart.transform()

    def setDataFontSize(self, dataFontSize):
        self.chart.setDataFontSize(dataFontSize)
        self.model = self.chart.transform()

    def setHeaderFontSize(self, headerFontSize):
        self.chart.setHeaderFontSize(headerFontSize)
        self.model = self.chart.transform()

    def setFontColorProvider(self, colorProvider):
        self.chart.setFontColorProvider(colorProvider)
        self.model = self.chart.transform()

    def setHeadersVertical(self, headersVertical):
        self.chart.setHeadersVertical(headersVertical)
        self.model = self.chart.transform()

    def setRowFilter(self, filter_row):
        self.chart.setRowFilter(filter_row)
        self.model = self.chart.transform()


class TableActionDetails:
    def __init__(self, params):
        if 'params' in params:
            self.row = params['params'].get('row')
            self.col = params['params'].get('col')
            self.contextMenuItem = params['params'].get('contextMenuItem')
            self.actionType = params['params'].get('actionType')
            self.tag = params['params'].get('tag')
        else:
            self.row = params.get('row')
            self.col = params.get('column')
            self.actionType = params.get('event')
            self.contextMenuItem = params.get('itemKey')
            self.tag = params.get('tag')

    def __str__(self):
        return '{} {} {} {}'.format(self.actionType, self.row, self.col, self.tag)
