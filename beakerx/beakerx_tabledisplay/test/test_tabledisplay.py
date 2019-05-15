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

from ..tabledisplay import TableDisplay, Table
import numpy as np
import pandas as pd


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
