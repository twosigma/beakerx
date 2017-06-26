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

from beakerx.plot.utils import BaseObject, getValue
from ipywidgets import DOMWidget, register
from traitlets import Unicode, Int, Dict, default

class EasyForm(BaseObject):
    def __init__(self, **kwargs):
        BaseObject.__init__(self)
        self.caption = getValue(kwargs, 'title', "test")
        print ('kwargs')
        print (kwargs)

    def addTextField(self, title, value):
        print ('title')
        print (title)

@register('beakerx.EasyForm')
class EasyFormView(DOMWidget):
    def __init__(self, **kwargs):
        super(EasyFormView, self).__init__()
        self.form = EasyForm(**kwargs)
        self.model = self.form.transform()
        self.caption = 'title'

    def addTextField(self, title, value):
        print ('title')
        print (title)

    _view_name = Unicode('EasyFormView').tag(sync=True)
    _model_name = Unicode('EasyFormModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _view_module_version = Unicode('^0.0.1').tag(sync=True)
    _model_module_version = Unicode('^0.0.1').tag(sync=True)
    model = Unicode().tag(sync=True)

def parseJSON(out):
    print ("out")
    print (out)
    return json.loads(out, object_hook=transformBack)


def transformBack(obj):
    if 'type' in obj:
        res = eval(obj['type'])()
        res.transformBack(obj)
        return res
    return obj
