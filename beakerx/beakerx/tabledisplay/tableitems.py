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

from enum import Enum
from dateutil.parser import parse


class TableDisplayAlignmentProvider(Enum):
    CENTER_ALIGNMENT = "C"
    LEFT_ALIGNMENT = "L"
    RIGHT_ALIGNMENT = "R"


class TimeUnit(Enum):
    NANOSECONDS = 1
    MICROSECONDS = 2
    MILLISECONDS = 3
    SECONDS = 4
    MINUTES = 5
    DAYS = 6
    HOURS = 7


def is_date(string):
    try:
        parse(string)
        return True
    except Exception:
        return False


class ColumnType(Enum):
    String = "string"
    Double = "double"
    Time = "time"
    Integer = "integer"
    Boolean = "boolean"


class DateType:
    type = "Date"
    
    def __init__(self, value):
        self.timestamp = parse(value).timestamp() * 1000


class DataBarsRenderer:
    type = "DataBars"
    includeText = True
    
    def __init__(self, x):
        self.includeText = x


class DecimalStringFormat:
    type = "decimal"
    minDecimals = 4
    maxDecimals = 4
    
    def __init__(self, min=4, max=4):
        self.minDecimals = min
        self.maxDecimals = max


class TableDisplayCellRenderer:
    @staticmethod
    def getDataBarsRenderer(include_text=True):
        return DataBarsRenderer(include_text)


class TableDisplayStringFormat:
    @staticmethod
    def getDecimalFormat(min, max):
        return DecimalStringFormat(min, max)
