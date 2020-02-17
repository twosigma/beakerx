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

import unittest

import numpy as np
import pandas as pd
from beakerx_tabledisplay import TableDisplay, Table


class TestTableDisplay(unittest.TestCase):

    def test_NaT_support(self):
        # given
        df = pd.DataFrame(np.random.randn(5, 3), index=['a', 'c', 'e', 'f', 'h'], columns=['one', 'two', 'three'])
        df['timestamp'] = pd.Timestamp('20120101')
        df.loc[['a', 'c', 'h'], ['one', 'timestamp']] = np.nan
        # when
        display = TableDisplay(df)
        # then
        self.assertTrue(display.values[0][4] == Table.NAT_VALUE)

    def test_support_discovering_types(self):
        # given
        colNames = ["xxx column", "integer column", "double column", "number column"]
        row1 = [6.1, 6, 0.5, 6]
        row2 = [3.1, 3, 2.0, 3]
        row3 = [2.2, 2, 3.0, 2]
        row4 = [0.1, 0, 6.0, 0]
        # when
        table = TableDisplay(pd.DataFrame([row1, row2, row3, row4], columns=colNames), colNames)
        # then
        self.assertTrue(table.model["types"][0] == "double")
        self.assertTrue(table.model["types"][1] == "integer")
        self.assertTrue(table.model["types"][2] == "double")
        self.assertTrue(table.model["types"][3] == "integer")

    def test_support_setting_types(self):
        # given
        colNames = ["xxx column", "integer column", "double column", "number column"]
        row1 = [6, 6, 0.5, 6]
        row2 = [3, 3, 2.0, 3]
        row3 = [2, 2, 3.0, 2]
        row4 = [0, 0, 6.0, 0]
        # when
        table = TableDisplay(pd.DataFrame([row1, row2, row3, row4], columns=colNames), colNames,
                             ['xxx type', 'integer', 'double', 'number'])
        # then
        self.assertTrue(table.model["types"][0] == "xxx type")
        self.assertTrue(table.model["types"][1] == "integer")
        self.assertTrue(table.model["types"][2] == "double")
        self.assertTrue(table.model["types"][3] == "number")

    def test_should_raise_exception_when_columns_not_equal_types(self):
        # given
        colNames = ["column1", "column2", "column3"]
        row1 = [1, 2, 3]
        row2 = [4, 5, 6]
        # when
        try:
            TableDisplay(pd.DataFrame([row1, row2]), colNames, ['integer', 'integer'])
            raise Exception("Test should not pass")
        except Exception as e:
            # then
            self.assertTrue('The length of types should be same as number of columns.' in e.args)


    def test_should_create_table_display_when_columns_equal_types(self):
        # given
        colNames = ["column1", "column2", "column3"]
        row1 = [1, 2, 3]
        row2 = [4, 5, 6]
        # when
        try:
            TableDisplay(pd.DataFrame([row1, row2]), colNames, ['integer', 'integer'])
            raise Exception("Test should not pass")
        except Exception as e:
            # then
            self.assertTrue('The length of types should be same as number of columns.' in e.args)
