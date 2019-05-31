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

from beakerx_tabledisplay import TableDisplay, ColumnType, TableDisplayAlignmentProvider


class TestTableDisplayAPI_setAlignmentProviderForType(unittest.TestCase):

    def test_should_set_alignment_provider_for_type(self):
        # given
        df = pd.read_csv(os.path.dirname(__file__) + "/resources/" + 'interest-rates.csv')
        table = TableDisplay(df)
        # when
        table.setAlignmentProviderForType(ColumnType.Double, TableDisplayAlignmentProvider.RIGHT_ALIGNMENT)
        table.setAlignmentProviderForType(ColumnType.Integer, TableDisplayAlignmentProvider.LEFT_ALIGNMENT)
        table.setAlignmentProviderForType(ColumnType.Boolean, TableDisplayAlignmentProvider.CENTER_ALIGNMENT)
        # then
        alignment = table.model['alignmentForType']
        self.assertEqual(alignment['double'], "R")
        self.assertEqual(alignment['integer'], "L")
        self.assertEqual(alignment['boolean'], "C")
