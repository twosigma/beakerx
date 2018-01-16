# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

from beakerx.beakerx_widgets import *
from beakerx.tabledisplay import *
from beakerx.plot.chart import *
from ipywidgets import Widget
from abc import *
from pandas import *


class OutputContainerLayoutManager:
    borderDisplayed = True

    def __init__(self):
        pass

    def setBorderDisplayed(self, borderDisplayed):
        self.borderDisplayed = borderDisplayed

    @abstractmethod
    def display(self, output_container):
        return NotImplemented

    def getWidgets(self, container):
        collection = []
        for item in container.items:
            collection.append(self.toWidget(item))
        return collection

    def toWidget(self, item):
        if item is None:
            return self.createHTMLPre("None")

        if isinstance(item, DataFrame):
            return TableDisplay(item)

        if isinstance(item, Widget):
            return item

        return self.createHTMLPre(item.__str__())

    def createHTML(self, value):
        label = BeakerxHTML()
        label.value = value
        return label

    def createHTMLPre(self, value):
        pre = BeakerxHTMLPre()
        pre.value = value
        return pre


class SimpleLayoutManager(OutputContainerLayoutManager):
    def __init__(self):
        super(SimpleLayoutManager, self).__init__()

    def display(self, output_container):
        for widget in self.getWidgets(output_container):
            widget._ipython_display_()


class TabbedOutputContainerLayoutManager(OutputContainerLayoutManager):
    def __init__(self):
        super(TabbedOutputContainerLayoutManager, self).__init__()

    def display(self, output_container):
        widgets = self.getWidgets(output_container)
        tab = Tab(widgets, output_container.labels)
        tab._ipython_display_()


class CyclingOutputContainerLayoutManager(OutputContainerLayoutManager):
    period = 5000

    def __init__(self):
        super(CyclingOutputContainerLayoutManager, self).__init__()

    def setPeriod(self, miliseconds):
        self.period = miliseconds

    def display(self, output_container):
        c = CyclingDisplayBox(self.getWidgets(output_container))
        c.setPeriod(self.period)
        c._ipython_display_()


class AbstractGridLayoutManager(OutputContainerLayoutManager):
    columns = 0

    def __init__(self, columns):
        super(AbstractGridLayoutManager, self).__init__()
        self.columns = columns


class GridOutputContainerLayoutManager(AbstractGridLayoutManager):
    def __init__(self, columns=2):
        super(GridOutputContainerLayoutManager, self).__init__(columns)

    def display(self, output_container):
        layout = output_container.layoutManager
        columns = layout.columns

        items = self.getWidgets(output_container)
        rows = []
        for itemIndex in range(0, len(items), columns):
            rows.append(BeakerxHBox(self.createRow(columns, items, itemIndex)))

        grid_view = GridView(rows)
        grid_view._ipython_display_()

    def createRow(self, columns, items, itemIndex):
        row_items = []
        for c in range(itemIndex, itemIndex + columns):
            if c < len(items):
                row_items.append(items[c])
            else:
                row_items.append(self.emptyItem())
        return row_items

    def emptyItem(self):
        return BeakerxHBox()


class OutputContainer:
    layoutManager = SimpleLayoutManager()
    items = []
    labels = []

    def __init__(self, **kwargs):
        super(OutputContainer, self).__init__(**kwargs)
        self.items = []
        self.labels = []

    def addItem(self, item, label=None):
        self.items.append(item)
        self.labels.append(label)

    def setLayoutManager(self, layoutManager):
        if layoutManager is not None:
            self.layoutManager = layoutManager

    def _ipython_display_(self):
        self.layoutManager.display(self)
