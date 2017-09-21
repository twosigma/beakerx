# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

from .runtime import BeakerX
from .plot import *
from .easyform import *
from .tabledisplay import *
from ._version import version_info, __version__
import pandas
from IPython.display import display_html

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'beakerx',
        'require': 'beakerx/extension'
    }]


class TableDisplayWrapper(object):
    def __get__(self, model_instance, model_class):
        def f():
            display_html(TableDisplay(model_instance))
        return f

def pandas_display_default():
    pandas.DataFrame._ipython_display_ = None

def pandas_display_table():
    pandas.DataFrame._ipython_display_ = TableDisplayWrapper()

#Display pandas default as TableDisplay Widget
pandas_display_table()