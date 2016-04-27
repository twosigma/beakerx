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

import json

from beaker_plot.xyChart import XYChart
from beaker_plot.utils import *
from beaker_plot.plotitem import *

class Plot(XYChart):
  def __init__(self, **kwargs):
    XYChart.__init__(self, **kwargs)


def parseJSON(out):
  return json.loads(out, object_hook=transformBack)

def transformBack(obj):
  if 'type' in obj:
    res = eval(obj['type'])()
    res.transformBack(obj)
    return res
  return obj