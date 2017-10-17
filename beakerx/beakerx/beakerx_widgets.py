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

from ipywidgets import Box, DOMWidget, CoreWidget, Text, Label, Textarea, \
    Button, Widget, \
    SelectMultiple, Select, Dropdown, Checkbox, HBox, \
    VBox, RadioButtons, register, Layout, widget_serialization, HTML
from ipywidgets.widgets.trait_types import InstanceDict
from traitlets import Int, Unicode, Dict, Bool, Union, List
from IPython.display import display


class BeakerxLayout(Layout):
    _view_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    def __init__(self, **kwargs):
        super(BeakerxLayout, self).__init__(**kwargs)


class BeakerxWidget(Widget):
    def __init__(self, **kwargs):
        super(BeakerxWidget, self).__init__(**kwargs)


class BeakerxDOMWidget(DOMWidget):
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    def __init__(self, **kwargs):
        super(BeakerxDOMWidget, self).__init__(**kwargs)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)

    def _ipython_display_(self, **kwargs):
        data = {
            'application/vnd.jupyter.widget-view+json': {
                'version_major': 2,
                'version_minor': 0,
                'model_id': self._model_id
            }
        }
        display(data, raw=True)

        self._handle_displayed(**kwargs)


class BeakerxBox(Box):
    def __init__(self, **kwargs):
        super(BeakerxBox, self).__init__(**kwargs)

    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)

    def _ipython_display_(self, **kwargs):
        data = {
            'application/vnd.jupyter.widget-view+json': {
                'version_major': 2,
                'version_minor': 0,
                'model_id': self._model_id
            },
            'method': 'display_data'
        }
        display(data, raw=True)

        self._handle_displayed(**kwargs)


class BeakerxTextArea(Textarea):
    def __init__(self, **kwargs):
        super(BeakerxTextArea, self).__init__(**kwargs)

    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    cols = Int(default_value=-1).tag(sync=True)
    rows = Int(default_value=-1).tag(sync=True)
    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxText(Text):
    def __init__(self, **kwargs):
        super(BeakerxText, self).__init__(**kwargs)

    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    size = Int(default_value=-1).tag(sync=True)
    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxHTML(HTML):
    def __init__(self, *args, **kwargs):
        super(BeakerxHTML, self).__init__(**kwargs)
        if len(args) > 0:
            self.value = args[0]

    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxHTMLPre(HTML):
    def __init__(self, **kwargs):
        super(BeakerxHTMLPre, self).__init__(**kwargs)

    _view_name = Unicode('HTMLPreView').tag(sync=True)
    _model_name = Unicode('HTMLPreModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxButton(Button):
    def __init__(self, **kwargs):
        super(BeakerxButton, self).__init__(**kwargs)

    _view_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)
    align_self = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


    def actionPerformed(self, *args, **kwargs):
        pass


class BeakerxComboBox(Dropdown):
    def __init__(self, **kwargs):
        super(BeakerxComboBox, self).__init__(**kwargs)

    _view_name = Unicode('ComboBoxView').tag(sync=True)
    _model_name = Unicode('ComboBoxModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    editable = Bool(default_value=False).tag(sync=True)
    original_options = Union([List(), Dict()])

    def _handle_msg(self, msg):
        if 'value' in msg['content']['data']['state']:
            value = msg['content']['data']['state']['value']
            if msg['content']['data']['state']['value'] not in self.options:
                self.options = self.original_options[:]
                self.options += (msg['content']['data']['state']['value'],)
            self.value = value
        super(BeakerxComboBox, self)._handle_msg(msg)


class BeakerxCheckbox(Checkbox):
    def __init__(self, **kwargs):
        super(BeakerxCheckbox, self).__init__(**kwargs)

    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxCheckboxGroup():
    children = []
    value = property(lambda self: [item.description for item in self.children if item.value])

    def addChildren(self, children):
        self.children.append(children)

class BeakerxLabel(Label):
    def __init__(self, **kwargs):
        super(BeakerxLabel, self).__init__(**kwargs)

    _view_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxHBox(HBox):
    def __init__(self, children=None, **kwargs):
        super(BeakerxHBox, self).__init__(**kwargs)
        if children is not None:
            self.children += tuple(children)

    _view_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class BeakerxVBox(VBox):
    def __init__(self, **kwargs):
        super(BeakerxVBox, self).__init__(**kwargs)

    _view_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None


class CyclingDisplayBox(BeakerxBox):
    _view_name = Unicode('CyclingDisplayBoxView').tag(sync=True)
    _model_name = Unicode('CyclingDisplayBoxModel').tag(sync=True)
    period = Int(5000).tag(sync=True)

    def __init__(self, children):
        super(CyclingDisplayBox, self).__init__()
        self.children += tuple(children)

    def setPeriod(self, period):
        self.period = period


class GridView(BeakerxVBox):
    _view_name = Unicode('GridView').tag(sync=True)
    _model_name = Unicode('GridViewModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)

    def __init__(self, rows):
        super(GridView, self).__init__()
        self.children += tuple(rows)


class SelectionContainer(BeakerxBox):
    _titles = Dict().tag(sync=True)

    def __init__(self, childrens, labels):
        super(SelectionContainer, self).__init__()
        labels_dict = dict()
        for x in labels:
            labels_dict[len(labels_dict)] = x
        self._titles = labels_dict
        self.children += tuple(childrens)


class Tab(SelectionContainer):
    _view_name = Unicode('TabView').tag(sync=True)
    _model_name = Unicode('TabModel').tag(sync=True)

    def __init__(self, childrens, labels):
        super(Tab, self).__init__(childrens, labels)
