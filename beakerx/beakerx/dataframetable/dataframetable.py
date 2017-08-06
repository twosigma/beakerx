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

import json

from beakerx.plot.utils import getValue
from ipykernel.comm import Comm
from ipywidgets import Box, DOMWidget, Text, Label, Textarea, Button, \
  SelectMultiple, Select, Dropdown, Checkbox, HBox, \
  VBox, RadioButtons, register
from traitlets import Unicode, Bool, Int, Dict, ObjectName, Unicode, default, \
  Any, Union, List

class DFTable(Box):
    _view_name = Unicode('TableDisplayView').tag(sync=True)
    _model_name = Unicode('TableDisplayModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    dfTableName = Unicode(default_value='Form default').tag(sync=True)
    test = ""
    HORIZONTAL = 1
    VERTICAL = 2

    def __init__(self, *args, **kwargs):
        super(DFTable, self).__init__(**kwargs)
        self.dtTableName = getValue(kwargs, 'title', "")
        if self.dfTableName == "" and len(args) > 0:
            self.dfTableName = args[0]