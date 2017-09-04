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
from beakerx.utils import *


class LegendLayout(Enum):
    HORIZONTAL = 1
    VERTICAL = 2


class LegendPosition():
    def __init__(self, **kwargs):
        self.position = getValue(kwargs, 'position')
        self.x = getValue(kwargs, 'x')
        self.y = getValue(kwargs, 'y')
        
        if self.x is None and self.y is None and self.position is None:
            self.position = LegendPosition.Position.TOP_RIGHT
        elif self.position is not None:
            self.x = None
            self.y = None
    
    class Position(Enum):
        TOP = 1
        LEFT = 2
        BOTTOM = 3
        RIGHT = 4
        TOP_LEFT = 5
        TOP_RIGHT = 6
        BOTTOM_LEFT = 7
        BOTTOM_RIGHT = 8
