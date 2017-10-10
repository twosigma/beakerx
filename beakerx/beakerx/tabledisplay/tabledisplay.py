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
class Table(BaseObject):
    def __init__(self, *args, **kwargs):
        self.columnNames = args[0].columns.tolist()
        self.values = []
        self.types = []
        types_map = dict()
        for column in self.columnNames:
            column_type = self.convertType(args[0].dtypes[column].name,
                             args[0][column][0])
            self.types.append(column_type)
            types_map[column] = column_type

        for ix in range(len(args[0])):
            row = []
            for columnName in self.columnNames:
                value = args[0][columnName][ix]
                value_type = types_map.get(columnName)
               
                if value_type == "time":
                    row.append(DateType(value))
                elif value_type == "double":
                    row.append(value.astype('str'))
                elif value_type == "integer":
                    row.append(value.item())
                elif value_type == "int64":
                    row.append(value.astype('str'))
                elif value_type == "string":
                    if isinstance(value, float):
                        if math.isnan(value):
                            row.append("")
                        else:
                            row.append(str(value))
                    else:
                        row.append(str(value))
                        
                else:
                    row.append(str(value))
            self.values.append(row)
        
        self.headersVertical = False
        self.hasIndex = None
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
    
    def convertType(self, object_type, value):
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
        if isinstance(value, str):
            return "string"
        if is_date(value):
            return "time"

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
        