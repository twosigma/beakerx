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

from datetime import timezone
from enum import Enum

from dateutil.parser import parse


class TableDisplayAlignmentProvider(Enum):
    CENTER_ALIGNMENT = "C"
    LEFT_ALIGNMENT = "L"
    RIGHT_ALIGNMENT = "R"


class TimeUnit(Enum):
    NANOSECONDS = "NANOSECONDS"
    MICROSECONDS = "MICROSECONDS"
    MILLISECONDS = "MILLISECONDS"
    SECONDS = "SECONDS"
    MINUTES = "MINUTES"
    DAYS = "DAYS"
    HOURS = "HOURS"


class ColumnType(Enum):
    String = "string"
    Double = "double"
    Time = "time"
    Integer = "integer"
    Boolean = "boolean"


class DateType:
    type = "Date"

    def __init__(self, value, tz=None):
        self.timestamp = parse(str(value)).replace(tzinfo=timezone.utc).timestamp() * 1000
        self.tz = tz


class DataBarsRenderer:
    type = "DataBars"
    includeText = True

    def __init__(self, x):
        self.includeText = x


class DecimalStringFormat:
    type = "decimal"

    def __init__(self, min=4, max=4):
        self.minDecimals = min
        self.maxDecimals = max


class TimeStringFormat:
    type = "time"

    def __init__(self, unit, human_friendly=False):
        self.unit = unit
        self.humanFriendly = human_friendly


class ImageFormat:
    type = "image"

    def __init__(self, **kwargs):
        if 'width' in kwargs:
            self.width = kwargs.get('width')


class HTMLFormat:
    type = "html"

    def __init__(self, **kwargs):
        if 'width' in kwargs:
            self.width = kwargs.get('width')


class HighlightStyle(Enum):
    FULL_ROW = "FULL_ROW"
    SINGLE_COLUMN = "SINGLE_COLUMN"


class Highlighter:
    pass


class HeatmapHighlighter(Highlighter):
    type = "HeatmapHighlighter"

    def __init__(self, colName, style, minVal, maxVal, minColor, maxColor):
        self.colName = colName
        self.style = style.name
        self.minVal = minVal
        self.maxVal = maxVal
        self.minColor = minColor
        self.maxColor = maxColor


class UniqueEntriesHighlighter(Highlighter):
    type = "UniqueEntriesHighlighter"

    def __init__(self, colName, style=HighlightStyle.FULL_ROW):
        self.colName = colName
        self.style = style.value


class TableDisplayCellRenderer:
    @staticmethod
    def getDataBarsRenderer(include_text=True):
        return DataBarsRenderer(include_text)


class TableDisplayStringFormat:

    @staticmethod
    def getTimeFormat(unit=TimeUnit.MILLISECONDS, human_friendly=False):
        return TimeStringFormat(unit, human_friendly)

    @staticmethod
    def getDecimalFormat(min, max):
        return DecimalStringFormat(min, max)

    @staticmethod
    def getHTMLFormat(**kwargs):
        return HTMLFormat(**kwargs)

    @staticmethod
    def getImageFormat(**kwargs):
        return ImageFormat(**kwargs)


class TableDisplayCellHighlighter:
    FULL_ROW = HighlightStyle.FULL_ROW
    SINGLE_COLUMN = HighlightStyle.SINGLE_COLUMN
    defaultStyle = HighlightStyle.FULL_ROW

    @staticmethod
    def getHeatmapHighlighter(colName, style=defaultStyle, minVal=None, maxVal=None, minColor=None, maxColor=None):
        return HeatmapHighlighter(colName, style, minVal, maxVal, minColor, maxColor)

    @staticmethod
    def getUniqueEntriesHighlighter(colName, style=defaultStyle):
        return UniqueEntriesHighlighter(colName, style)
