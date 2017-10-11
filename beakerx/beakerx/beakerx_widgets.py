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
    Button, \
    SelectMultiple, Select, Dropdown, Checkbox, HBox, \
    VBox, RadioButtons, register, Layout, widget_serialization
from ipywidgets.widgets.trait_types import InstanceDict
from traitlets import Int, Unicode
from IPython.display import display


class BeakerxLayout(Layout):
    _view_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module = Unicode('jupyter-js-widgets').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)
    
    def __init__(self, **kwargs):
        super(BeakerxLayout, self).__init__(**kwargs)


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


class BeakerxCheckbox(Checkbox):
    def __init__(self, **kwargs):
        super(BeakerxCheckbox, self).__init__(**kwargs)
        
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)
    
    layout = InstanceDict(BeakerxLayout).tag(sync=True, **widget_serialization)
    style = None

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
    def __init__(self, **kwargs):
        super(BeakerxHBox, self).__init__(**kwargs)
    
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