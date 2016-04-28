# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

from enum import Enum
from datetime import datetime
import math

from beaker_plot.utils import *


class ShapeType(Enum):
  SQUARE = 1
  CIRCLE = 2
  TRIANGLE = 3
  DIAMOND = 4
  DCROSS = 5
  DOWNTRIANGLE = 5
  CROSS = 6
  DEFAULT = 7
  LEVEL = 8
  VLEVEL = 9
  LINECROSS = 10


class StrokeType(Enum):
  NONE = 1
  SOLID = 2
  DASH = 3
  DOT = 4
  DASHDOT = 5
  LONGDASH = 5


class Graphics(BaseObject):
  def __init__(self, **kwargs):
    BaseObject.__init__(self)

    self.type = self.__class__.__name__
    self.visible = getValue(kwargs, 'visible', True)
    self.yAxis = getValue(kwargs, 'yAxis')


class ConstantLine(Graphics):
  def __init__(self, **kwargs):
    Graphics.__init__(self, **kwargs)
    self.x = getValue(kwargs, 'x')
    self.y = getValue(kwargs, 'y')
    self.color = getColor(getValue(kwargs, 'color'))
    self.width = getValue(kwargs, 'width', 1.5)
    self.style = getValue(kwargs, 'style')
    self.showLabel = getValue(kwargs, 'showLabel')


class ConstantBand(Graphics):
  def __init__(self, **kwargs):
    Graphics.__init__(self, **kwargs)
    self.x = getValue(kwargs, 'x')
    self.y = getValue(kwargs, 'y')
    self.color = getColor(getValue(kwargs, 'color', Color(0, 127, 255, 127)))


class XYGraphics(Graphics):
  def __init__(self, **kwargs):
    Graphics.__init__(self, **kwargs)
    defY = getValue(kwargs, 'y')
    if defY is not None:
      defX = list(range(0, len(defY)))
    else:
      defX = []

    self.x = getValue(kwargs, 'x', defX)
    if self.x is not None:
      for idx in range(len(self.x)):
        x = self.x[idx]
        if isinstance(x, datetime):
          self.x[idx] = int(x.strftime("%s")) * 1000

    self.y = defY
    self.display_name = getValue(kwargs, 'display_name')
    self.lodFilter = getValue(kwargs, 'lodFilter')
    self.lodFilter = getValue(kwargs, 'lodFilter')


class Line(XYGraphics):
  def __init__(self, **kwargs):
    XYGraphics.__init__(self, **kwargs)
    self.width = getValue(kwargs, 'width', 1.5)
    self.style = getValue(kwargs, 'style')
    self.interpolation = getValue(kwargs, 'interpolation')
    self.color = getColor(getValue(kwargs, 'color'))


class BasedXYGraphics(XYGraphics):
  def __init__(self, **kwargs):
    XYGraphics.__init__(self, **kwargs)
    base = getValue(kwargs, 'base')
    if isinstance(base, list):
      self.bases = base
    else:
      self.base = getValue(kwargs, 'base', 0)


class Bars(BasedXYGraphics):
  def __init__(self, **kwargs):
    BasedXYGraphics.__init__(self, **kwargs)

    width = getValue(kwargs, 'width')
    if isinstance(width, list):
      self.widths = width
    else:
      self.width = width

    color = getColor(getValue(kwargs, 'color'))
    if isinstance(color, list):
      self.colors = color
    else:
      self.color = color

    outlineColor = getColor(getValue(kwargs, 'outlineColor'))
    if isinstance(outlineColor, list):
      self.outline_colors = outlineColor
    else:
      self.outline_color = outlineColor


class Points(XYGraphics):
  def __init__(self, **kwargs):
    XYGraphics.__init__(self, **kwargs)

    shape = getColor(getValue(kwargs, 'shape'))
    if isinstance(shape, list):
      self.shapes = shape
    else:
      self.shape = getValue(kwargs, 'shape', ShapeType.DEFAULT)

    size = getColor(getValue(kwargs, 'size'))
    if isinstance(size, list):
      self.sizes = size
    else:
      self.size = getValue(kwargs, 'size', 0.6)

    fill = getColor(getValue(kwargs, 'fill'))
    if isinstance(fill, list):
      self.fills = fill
    else:
      self.fill = fill

    color = getColor(getValue(kwargs, 'color'))
    if isinstance(color, list):
      self.colors = color
    else:
      self.color = color

    outlineColor = getColor(getValue(kwargs, 'outlineColor'))
    if isinstance(outlineColor, list):
      self.outline_colors = outlineColor
    else:
      self.outline_color = outlineColor


class Stems(BasedXYGraphics):
  def __init__(self, **kwargs):
    BasedXYGraphics.__init__(self, **kwargs)
    self.width = getValue(kwargs, 'width', 1.5)
    color = getColor(getValue(kwargs, 'color'))
    if isinstance(color, list):
      self.colors = color
    else:
      self.color = color

    style = getValue(kwargs, 'style')
    if isinstance(style, list):
      self.styles = style
    else:
      self.style = getValue(kwargs, 'style', StrokeType.SOLID)


class Area(BasedXYGraphics):
  def __init__(self, **kwargs):
    BasedXYGraphics.__init__(self, **kwargs)
    self.color = getColor(getValue(kwargs, 'color'))
    self.interpolation = getValue(kwargs, 'interpolation')


class Text(BaseObject):
  def __init__(self, **kwargs):
    BaseObject.__init__(self)
    self.x = getValue(kwargs, 'x', 0)
    self.y = getValue(kwargs, 'y', 0)
    self.color = getColor(getValue(kwargs, 'color'))
    self.size = getValue(kwargs, 'size', 13)
    self.text = getValue(kwargs, 'text', '')
    self.show_pointer = getValue(kwargs, 'show_pointer', True)
    self.pointer_angle = getValue(kwargs, 'pointer_angle', (-0.25) * math.pi)


class YAxis(BaseObject):
  def __init__(self, **kwargs):
    BaseObject.__init__(self)
    self.label = getValue(kwargs, 'label', '')
    self.autoRange = getValue(kwargs, 'autoRange')
    self.color = getColor(getValue(kwargs, 'color'))
    self.size = getValue(kwargs, 'size', 13)
    self.text = getValue(kwargs, 'text', '')
    self.show_pointer = getValue(kwargs, 'show_pointer', True)
    self.pointer_angle = getValue(kwargs, 'pointer_angle', (-0.25) * math.pi)


class XYStacker(BaseObject):
  def __init__(self):
    BaseObject.__init__(self)

  def stack(self, graphicsList):
    if graphicsList is None or len(graphicsList) == 1:
      return graphicsList
    else:
      stackedList = []
      ysSize = len(graphicsList[0].y)
      for gIndex in range(1, len(graphicsList)):
        current = graphicsList[gIndex]
        previous = graphicsList[gIndex - 1]
        currentYs = current.y
        previousYs = previous.y

        if ysSize != len(currentYs):
          raise Exception('Plot items that are added to XYStack should have the same length coordinates')

        for yIndex in range(ysSize):
          currentYs[yIndex] = currentYs[yIndex] + previousYs[yIndex]

        current.bases = previousYs
        stackedList.append(current)

      return stackedList


class Crosshair(BasedXYGraphics):
  def __init__(self, **kwargs):
    BasedXYGraphics.__init__(self, **kwargs)
    self.width = getValue(kwargs, 'width')
    self.style = getValue(kwargs, 'style')
    self.color = getColor(getValue(kwargs, 'color'))
