# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
from beakerx.plot.utils import BaseObject


class Table(BaseObject):
    def __init__(self, *args, **kwargs):
        self.columnNames = args[0].columns.tolist()
        self.values = []
        self.types = []
        for column in self.columnNames:
            self.types.append(args[0].dtypes[column].name)
        
        for tuple in args[0].iterrows():
            row = []
            for columnName in self.columnNames:
                row.append(tuple[1][columnName])
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
