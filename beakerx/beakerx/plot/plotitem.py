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
import math
import pandas as pd
from beakerx.utils import *

from dateutil.parser import parse
import numpy as np
import datetime as dt


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


class PlotOrientationType(Enum):
    VERTICAL = 1
    HORIZONTAL = 2


class LabelPositionType(Enum):
    VALUE_OUTSIDE = 1
    VALUE_INSIDE = 2
    CENTER = 3
    BASE_OUTSIDE = 4
    BASE_INSIDE = 5


class GradientColor:
    def __init__(self, *args):
        self.color = args[0]


GradientColor.BROWN_RED_YELLOW = GradientColor([Color(120, 0, 4),
                                                Color(241, 88, 6),
                                                Color(255, 206, 31)])
GradientColor.GREEN_YELLOW_WHITE = GradientColor([Color(0, 170, 0),
                                                  Color(102, 204, 0),
                                                  Color(238, 238, 0),
                                                  Color(238, 187, 68),
                                                  Color(238, 187, 153),
                                                  Color(255, 255, 255)])
GradientColor.WHITE_BLUE = GradientColor([Color(255, 255, 217),
                                          Color(237, 248, 177),
                                          Color(199, 233, 180),
                                          Color(127, 205, 187),
                                          Color(65, 182, 196),
                                          Color(29, 145, 192),
                                          Color(34, 94, 168),
                                          Color(37, 52, 148),
                                          Color(8, 29, 88)])


class Graphics(BaseObject):
    def __init__(self, **kwargs):
        super(Graphics, self).__init__(**kwargs)
        self.type = self.__class__.__name__
        self.visible = getValue(kwargs, 'visible', True)
        self.yAxis = getValue(kwargs, 'yAxis')
        self.hasClickAction = getValue(kwargs, 'hasClickAction', False)


class ConstantLine(Graphics):
    def __init__(self, **kwargs):
        super(ConstantLine, self).__init__(**kwargs)
        self.x = getValue(kwargs, 'x')
        self.y = getValue(kwargs, 'y')
        self.color = getColor(getValue(kwargs, 'color'))
        self.width = getValue(kwargs, 'width', 1.5)
        self.style = getValue(kwargs, 'style')
        self.showLabel = getValue(kwargs, 'showLabel')


class ConstantBand(Graphics):
    def __init__(self, **kwargs):
        super(ConstantBand, self).__init__(**kwargs)
        self.x = getValue(kwargs, 'x')
        self.y = getValue(kwargs, 'y')
        self.color = getColor(
            getValue(kwargs, 'color', Color(0, 127, 255, 127)))


def is_date(string):
    try:
        parse(string)
        return True
    except Exception:
        return False


class XYGraphics(Graphics):
    def __init__(self, *args, **kwargs):
        super(XYGraphics, self).__init__(**kwargs)
        if len(args) > 0 and isinstance(args[0], pd.Series):
            defX = args[0].index.tolist()
            defY = args[0].tolist()
        else:
            defY = getValue(kwargs, 'y')

            if defY is not None:
                if isinstance(defY, pd.Series):
                    defY = defY.tolist()
                defX = list(range(0, len(defY)))
            else:
                defX = []

        local_x = getValue(kwargs, 'x', defX)

        if local_x is not None:
            if isinstance(local_x, pd.Series):
                local_x = local_x.tolist()
            self.x = [None] * len(local_x)
            for idx in range(len(local_x)):
                x = local_x[idx]
                if isinstance(x, float) and math.isnan(x):
                    self.x[idx] = "NaN"
                elif isinstance(x, dt.date) or isinstance(x, dt.time):
                    self.x[idx] = date_time_2_millis(x.isoformat())
                elif is_date(x):
                    self.x[idx] = date_time_2_millis(x)
                elif isinstance(x, np.datetime64):
                    self.x[idx] = date_time_2_millis(x.__str__())
                else:
                    self.x[idx] = x

        self.y = defY
        if self.y is not None:
            for idx in range(len(self.y)):
                y = self.y[idx]
                if isinstance(y, float) and math.isnan(y):
                    self.y[idx] = "NaN"

        self.display_name = getValue(kwargs, 'displayName')
        self.lod_filter = getValue(kwargs, 'lodFilter')
        self.tooltips = getValue(kwargs, 'tooltips')


class Line(XYGraphics):
    def __init__(self, *args, **kwargs):
        super(Line, self).__init__(*args, **kwargs)
        self.width = getValue(kwargs, 'width', 1.5)
        self.style = getValue(kwargs, 'style')
        self.interpolation = getValue(kwargs, 'interpolation')
        self.color = getColor(getValue(kwargs, 'color'))


class BasedXYGraphics(XYGraphics):
    def __init__(self, *args, **kwargs):
        super(BasedXYGraphics, self).__init__(*args, **kwargs)
        base = getValue(kwargs, 'base')
        if isinstance(base, list):
            self.bases = base
        else:
            self.base = getValue(kwargs, 'base', 0)


class Bars(BasedXYGraphics):
    def __init__(self, *args, **kwargs):
        super(Bars, self).__init__(*args, **kwargs)

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
    def __init__(self, *args, **kwargs):
        super(Points, self).__init__(*args, **kwargs)

        shape = getColor(getValue(kwargs, 'shape'))
        if isinstance(shape, list):
            self.shapes = shape
        else:
            self.shape = getValue(kwargs, 'shape', ShapeType.DEFAULT)

        size = getColor(getValue(kwargs, 'size'))
        if isinstance(size, list):
            self.sizes = size
        else:
            self.size = getValue(kwargs, 'size', 6)

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
    def __init__(self, *args, **kwargs):
        super(Stems, self).__init__(*args, **kwargs)
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
    def __init__(self, *args, **kwargs):
        super(Area, self).__init__(*args, **kwargs)
        self.color = getColor(getValue(kwargs, 'color'))
        self.interpolation = getValue(kwargs, 'interpolation')


class Text(BaseObject):
    def __init__(self, **kwargs):
        super(Text, self).__init__(**kwargs)
        self.x = getValue(kwargs, 'x', 0)
        self.y = getValue(kwargs, 'y', 0)
        self.color = getColor(getValue(kwargs, 'color'))
        self.size = getValue(kwargs, 'size', 13)
        self.text = getValue(kwargs, 'text', '')
        self.show_pointer = getValue(kwargs, 'show_pointer', True)
        self.pointer_angle = getValue(kwargs, 'pointerAngle',
                                      (-0.25) * math.pi)


class YAxis(BaseObject):
    def __init__(self, **kwargs):
        super(YAxis, self).__init__(**kwargs)
        self.label = getValue(kwargs, 'label', '')
        self.auto_range = getValue(kwargs, 'autoRange', True)
        self.auto_range_includes_zero = getValue(kwargs,
                                                 'autoRangeIncludesZero', False)
        self.lower_margin = getValue(kwargs, 'lowerMargin', 0.05)
        self.upper_margin = getValue(kwargs, 'upperMargin', 0.05)
        self.lower_bound = getValue(kwargs, 'lowerBound', 0.0)
        self.upper_bound = getValue(kwargs, 'upperBound', 0.0)
        self.use_log = getValue(kwargs, 'logY', False)
        self.log_base = getValue(kwargs, 'logBase', 10.0)
        self.type = 'YAxis'

    def setBound(self, min, max):
        self.lower_bound = min
        self.upper_bound = max
        return self.transform()


class XYStacker(BaseObject):
    def __init__(self, **kwargs):
        super(XYStacker, self).__init__(**kwargs)

    def stack(self, graphicsList):
        if graphicsList is None or len(graphicsList) == 1:
            return graphicsList
        else:
            maxel = graphicsList[0]
            for i in range(1, len(graphicsList)):
                if len(graphicsList[i].y) > len(maxel.y):
                    maxel = graphicsList[i]
            padYs(graphicsList[0], maxel)
            stackedList = [graphicsList[0]]
            for gIndex in range(1, len(graphicsList)):
                current = graphicsList[gIndex]
                padYs(current, maxel)
                previous = graphicsList[gIndex - 1]
                currentYs = current.y
                previousYs = previous.y

                for yIndex in range(len(currentYs)):
                    currentYs[yIndex] = currentYs[yIndex] + previousYs[yIndex]

                current.bases = previousYs
                stackedList.append(current)

            return stackedList


class Crosshair(BasedXYGraphics):
    def __init__(self, *args, **kwargs):
        super(Crosshair, self).__init__(*args, **kwargs)
        self.width = getValue(kwargs, 'width')
        self.style = getValue(kwargs, 'style')
        self.color = getColor(getValue(kwargs, 'color'))


class CategoryGraphics(Graphics):
    def __init__(self, **kwargs):
        super(CategoryGraphics, self).__init__(**kwargs)
        self.center_series = getValue(kwargs, 'centerSeries', False)
        self.use_tool_tip = getValue(kwargs, 'useToolTip', True)
        self.showItemLabel = getValue(kwargs, 'showItemLabel', False)
        self.outline = getValue(kwargs, 'outline', False)
        self.labelPosition = getValue(kwargs, 'labelPosition', "CENTER")
        self.fills = getValue(kwargs, 'fill')
        self.itemLabels = getValue(kwargs, 'itemLabel')
        self.seriesNames = getValue(kwargs, 'seriesNames')
        self.style = getValue(kwargs, 'style')
        self.size = getValue(kwargs, 'size')

        outline = getValue(kwargs, 'outlineColor')
        if isinstance(outline, list):
            self.outline_colors = outline
        else:
            self.outline_color = outline

        drawOutline = getValue(kwargs, 'drawOutline')
        if isinstance(drawOutline, list):
            self.outlines = drawOutline
        else:
            self.outline = drawOutline

        base = getValue(kwargs, 'base', 0.0)
        if isinstance(base, list):
            self.bases = base
        else:
            self.base = base

        width = getValue(kwargs, 'width')
        if isinstance(width, list):
            self.widths = width
        else:
            self.width = width

        style = getValue(kwargs, 'style')
        if isinstance(style, list):
            self.styles = style
        else:
            self.style = style

        self.value = getValue(kwargs, 'value', [])

        color = getColor(getValue(kwargs, 'color'))
        if isinstance(color, list):
            self.colors = color
        else:
            self.color = color


class CategoryBars(CategoryGraphics):
    def __init__(self, **kwargs):
        super(CategoryBars, self).__init__(**kwargs)


class CategoryStems(CategoryGraphics):
    def __init__(self, **kwargs):
        super(CategoryStems, self).__init__(**kwargs)


class CategoryPoints(CategoryGraphics):
    def __init__(self, **kwargs):
        super(CategoryPoints, self).__init__(**kwargs)


class CategoryLines(CategoryGraphics):
    def __init__(self, **kwargs):
        super(CategoryLines, self).__init__(**kwargs)


class CategoryArea(CategoryGraphics):
    def __init__(self, **kwargs):
        super(CategoryArea, self).__init__(**kwargs)
