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

from ipywidgets import DOMWidget, Box
from traitlets import Unicode, Dict
from beakerx.utils import *
from beakerx.tabledisplay.tableitems import *


class Table(BaseObject):
    def __init__(self, *args, **kwargs):
        self.columnNames = args[0].columns.tolist()
        self.values = []
        self.types = []
        for column in self.columnNames:
            self.types.append(self.convertType(args[0].dtypes[column].name,
                                               args[0][column][0]))
        
        for tuple in args[0].iterrows():
            row = []
            for columnName in self.columnNames:
                value = tuple[1][columnName]
                if isinstance(value, str) and is_date(value):
                    row.append(DateType(value))
                else:
                    row.append(value)
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
    
    def convertType(self, type, value):
        if type == "float64":
            return "double"
        if is_date(value):
            return "time"


class TableDisplay(DOMWidget):
    _view_name = Unicode('TableDisplayView').tag(sync=True)
    _model_name = Unicode('TableDisplayModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
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
        