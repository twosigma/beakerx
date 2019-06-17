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
import pandas as pd
import unittest

from beakerx_tabledisplay import TableDisplay


class TestTableDisplayAPI_date_format(unittest.TestCase):

    def test_date_format(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        df['time'] = pd.to_datetime(df['time'], utc=True)
        # when
        table = TableDisplay(df)
        # then
        self.assertEqual(table.model['values'][0][7]['timestamp'], 633744000000.0)
