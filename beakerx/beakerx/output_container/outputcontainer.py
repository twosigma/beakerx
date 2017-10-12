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

from beakerx.beakerx_widgets import BeakerxDOMWidget, BeakerxBox
from traitlets import Int, Long, Unicode, Bool, Dict


class OutputContainer(BeakerxDOMWidget):
    model = Dict().tag(sync=True)

    def __init__(self):
        super(OutputContainer, self).__init__()

    def addItem(self, *args):
        pass

    def setLayoutManager(self, layoutManager):
        pass


class OutputContainerLayoutManager(BeakerxBox):
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)
    borderDisplayed = Bool(False).tag(sync=True)

    def __init__(self):
        pass

    def setBorderDisplayed(self, borderDisplayed):
        pass


class TabbedOutputContainerLayoutManager(OutputContainerLayoutManager):
    def __init__(self):
        super(TabbedOutputContainerLayoutManager, self).__init__()


class CyclingOutputContainerLayoutManager(OutputContainerLayoutManager):
    _view_name = Unicode('CyclingDisplayBoxView').tag(sync=True)
    _model_name = Unicode('CyclingDisplayBoxModel').tag(sync=True)
    period = 5000

    def __init__(self):
        super(CyclingOutputContainerLayoutManager, self).__init__()

    def setPeriod(self, miliseconds):
        self.period = miliseconds


class AbstractGridLayoutManager(OutputContainerLayoutManager):
    columns = 0

    def __init__(self, columns):
        super(AbstractGridLayoutManager, self).__init__()
        print ("col: ", columns)
        self.columns = columns


class GridOutputContainerLayoutManager(AbstractGridLayoutManager):
    def __init__(self, columns):
        super(GridOutputContainerLayoutManager, self).__init__(columns)
