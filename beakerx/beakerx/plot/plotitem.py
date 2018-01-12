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


class Graphics(ChartBaseObject):
    def __init__(self, **kwargs):
        self.visible = True
        self.hasClickAction = False

        super(Graphics, self).__init__(**kwargs)
        self.type = self.__class__.__name__

    def setVisible(self, value):
        self.visible = value

    def setYAxis(self, value):
        self.yAxis = value

    def setHasClickAction(self, value):
        self.hasClickAction = value


class ConstantLine(Graphics):
    def __init__(self, **kwargs):
        self.width = 1.5
        super(ConstantLine, self).__init__(**kwargs)

    def setY(self, value):
        self.y = value

    def setX(self, value):
        self.x = value

    def setWidth(self, value):
        self.width = value

    def setStyle(self, value):
        self.style = value

    def setShowLabel(self, value):
        self.showLabel = value

    def setColor(self, value):
        self.color = getColor(value)


class ConstantBand(Graphics):
    def __init__(self, **kwargs):
        self.color = getColor(Color(0, 127, 255, 127))

        super(ConstantBand, self).__init__(**kwargs)

    def setY(self, value):
        self.y = value

    def setX(self, value):
        self.x = value

    def setColor(self, value):
        self.color = getColor(value)


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

    def setX(self, value):
        pass

    def setY(self, value):
        pass

    def setDisplayName(self, value):
        self.display_name = value

    def setLodFilter(self, value):
        self.lod_filter = value

    def setTooltipse(self, value):
        self.tooltips = value


class Line(XYGraphics):
    def __init__(self, *args, **kwargs):
        self.width = 1.5
        super(Line, self).__init__(*args, **kwargs)

    def setWidth(self, value):
        self.width = value

    def setStyle(self, value):
        self.style = value

    def setInterpolation(self, value):
        self.interpolation = value

    def setColor(self, value):
        self.color = getColor(value)


class BasedXYGraphics(XYGraphics):
    def __init__(self, *args, **kwargs):
        super(BasedXYGraphics, self).__init__(*args, **kwargs)

    def setBase(self, value):
        if isinstance(value, list):
            self.bases = value
        else:
            if value is not None:
                self.base = value
            else:
                self.base = 0


class Bars(BasedXYGraphics):
    def __init__(self, *args, **kwargs):
        super(Bars, self).__init__(*args, **kwargs)

    def setWidth(self, value):
        if isinstance(value, list):
            self.widths = value
        else:
            self.width = value

    def setColor(self, value):
        color = getColor(value)
        if isinstance(color, list):
            self.colors = color
        else:
            self.color = color

    def setOutlineColor(self, value):
        outlineColor = getColor(value)
        if isinstance(outlineColor, list):
            self.outline_colors = outlineColor
        else:
            self.outline_color = outlineColor


class Points(XYGraphics):
    def __init__(self, *args, **kwargs):
        super(Points, self).__init__(*args, **kwargs)

    def setSize(self, value):
        if isinstance(value, list):
            self.sizes = value
        else:
            if value is not None:
                self.size = value
            else:
                self.size = 6

    def setShape(self, value):
        if isinstance(value, list):
            self.shapes = value
        else:
            if value is not None:
                self.shape = value
            else:
                self.shape = ShapeType.DEFAULT

    def setFill(self, value):
        if isinstance(value, list):
            self.fills = value
        else:
            self.fill = value

    def setColor(self, value):
        color = getColor(value)
        if isinstance(color, list):
            self.colors = color
        else:
            self.color = color

    def setOutlineColor(self, value):
        outlineColor = getColor(value)
        if isinstance(outlineColor, list):
            self.outline_colors = outlineColor
        else:
            self.outline_color = outlineColor


class Stems(BasedXYGraphics):
    def __init__(self, *args, **kwargs):
        self.width = 1.5
        super(Stems, self).__init__(*args, **kwargs)

    def setWidth(self, value):
        self.width = value

    def setColor(self, value):
        color = getColor(value)
        if isinstance(color, list):
            self.colors = color
        else:
            self.color = color

    def setStyle(self, value):
        if isinstance(value, list):
            self.styles = value
        else:
            if value is not None:
                self.style = value
            else:
                self.style = StrokeType.SOLID


class Area(BasedXYGraphics):
    def __init__(self, *args, **kwargs):
        super(Area, self).__init__(*args, **kwargs)

    def setInterpolation(self, value):
        self.interpolation = value

    def setColor(self, value):
        self.color = getColor(value)


class Text(ChartBaseObject):
    def __init__(self, **kwargs):
        self.x = 0
        self.y = 0
        self.size = 13
        self.text = ''
        self.show_pointer = True
        self.pointer_angle = (-0.25) * math.pi

        super(Text, self).__init__(**kwargs)

    def setY(self, value):
        self.y = value

    def setX(self, value):
        self.x = value

    def setText(self, value):
        self.text = value

    def setPointerAngle(self, value):
        self.pointer_angle = value

    def setShow_pointer(self, value):
        self.show_pointer = value

    def setSize(self, value):
        self.size = value

    def setColor(self, value):
        self.color = getColor(value)


class YAxis(ChartBaseObject):
    def __init__(self, **kwargs):
        self.label = ''
        self.auto_range = True
        self.auto_range_includes_zero = False
        self.lower_margin = 0.05
        self.upper_margin = 0.05
        self.lower_bound = 0.0
        self.upper_bound = 0.0
        self.use_log = False
        self.log_base = 10.0

        super(YAxis, self).__init__(**kwargs)
        self.type = 'YAxis'

    def setLabel(self, value):
        self.label = value

    def setAutoRange(self, value):
        self.auto_range = value

    def setAutoRangeIncludesZero(self, value):
        self.auto_range_includes_zero = value

    def setLowerMargin(self, value):
        self.lower_margin = value

    def setUpperMargin(self, value):
        self.upper_margin = value

    def setLowerBound(self, value):
        self.lower_bound = value

    def setUpperBound(self, value):
        self.upper_bound = value

    def setLogY(self, value):
        self.use_log = value

    def setLogBase(self, value):
        self.log_base = value

    def setBound(self, min, max):
        self.auto_range = False
        self.lower_bound = min
        self.upper_bound = max
        return self.transform()


class XYStacker(ChartBaseObject):
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

    def setWidth(self, value):
        self.width = value

    def setStyle(self, value):
        self.style = value

    def setColor(self, value):
        self.color = getColor(value)


class CategoryGraphics(Graphics):
    def __init__(self, **kwargs):
        self.value = []
        self.center_series = False
        self.use_tool_tip = True
        self.showItemLabel = False
        self.outline = False
        self.labelPosition = "CENTER"

        super(CategoryGraphics, self).__init__(**kwargs)

        base = getValue(kwargs, 'base')
        if base is None:
            self.base = 0.0

    def setLabelPosition(self, value):
        self.labelPosition = value

    def setOutline(self, value):
        self.outline = value

    def setShowItemLabel(self, value):
        self.showItemLabel = value

    def setCenterSeries(self, value):
        self.center_series = value

    def setUseToolTip(self, value):
        self.use_tool_tip = value

    def setFill(self, value):
        self.fills = value

    def setItemLabel(self, value):
        self.itemLabels = value

    def setSeriesNames(self, value):
        self.seriesNames = value

    def setStyle(self, value):
        self.style = value

    def setSize(self, value):
        self.size = value

    def setOutlineColor(self, value):
        if isinstance(value, list):
            self.outline_colors = value
        else:
            self.outline_color = value

    def setDrawOutline(self, value):
        if isinstance(value, list):
            self.outlines = value
        else:
            self.outline = value

    def setValue(self, value):
        self.value = value

    def setBase(self, value):
        if isinstance(value, list):
            self.bases = value
        else:
            self.base = value

    def setWidth(self, value):
        if isinstance(value, list):
            self.widths = value
        else:
            self.width = value

    def setStyle(self, value):
        if isinstance(value, list):
            self.styles = value
        else:
            self.style = value

    def setColor(self, value):
        color = getColor(value)
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
