# Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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


import os
import unittest

import pandas as pd

from ..tabledisplay import TableDisplay
from ..tableitems import ColumnType, TableDisplayStringFormat, TimeUnit

STRING_FORMAT_FOR_TYPE = 'stringFormatForType'


class TestTableDisplayAPI_seStringFormatMethod(unittest.TestCase):

    def test_should_set_string_format_default_for_time(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        table = TableDisplay(df)
        # when
        table.setStringFormatForType(ColumnType.Time, TableDisplayStringFormat.getTimeFormat())
        # then
        time = table.model[STRING_FORMAT_FOR_TYPE]['time']
        self.assertEqual(time['type'], "time")
        self.assertEqual(time['unit'], TimeUnit.MILLISECONDS.name)
        self.assertEqual(time['humanFriendly'], False)

    def test_should_set_string_format_DAYS_for_time(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        table = TableDisplay(df)
        # when
        table.setStringFormatForType(ColumnType.Time, TableDisplayStringFormat.getTimeFormat(TimeUnit.DAYS))
        # then
        time = table.model[STRING_FORMAT_FOR_TYPE]['time']
        self.assertEqual(time['type'], "time")
        self.assertEqual(time['unit'], TimeUnit.DAYS.name)

    def test_should_set_string_format_humanFriendly_for_time(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        table = TableDisplay(df)
        # when
        table.setStringFormatForType(ColumnType.Time, TableDisplayStringFormat.getTimeFormat(TimeUnit.DAYS, True))
        # then
        time = table.model[STRING_FORMAT_FOR_TYPE]['time']
        self.assertEqual(time['humanFriendly'], True)

    def test_should_set_string_format_for_times(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        table = TableDisplay(df)
        # when
        table.setStringFormatForTimes(TimeUnit.DAYS)
        # then
        time = table.model[STRING_FORMAT_FOR_TYPE]['time']
        self.assertEqual(time['type'], "time")
        self.assertEqual(time['unit'], TimeUnit.DAYS.name)
