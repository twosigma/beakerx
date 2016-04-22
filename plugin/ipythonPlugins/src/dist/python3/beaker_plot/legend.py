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

from enum import Enum

class LegendLayout(Enum):
  HORIZONTAL = 1
  VERTICAL = 2

class LegendPosition:
  class Position(Enum):
    TOP = 1
    LEFT = 2
    BOTTOM = 3
    RIGHT = 4
    TOP_LEFT = 5
    TOP_RIGHT = 6
    BOTTOM_LEFT = 7
    BOTTOM_RIGHT = 8

  def __init__(self, obj=None):
    if obj is not None:
      if type(obj) == list:
        if len(obj) > 0:
          self.x = obj[0]
          self.y = 0
        if len(obj) > 1:
          self.y = obj[1]
      elif isinstance(obj, LegendPosition.Position):
        self.position = obj
        self.x = 0
        self.y = 0
      return

    self.position = LegendPosition.Position.TOP_RIGHT
    self.x = 0
    self.y = 0

  def transform(self):
    out = {}
    out['type'] = "LegendPosition"
    out['x'] = self.x
    out['y'] = self.y

    if self.position is not None:
      out['position'] = self.position.name

    return out
