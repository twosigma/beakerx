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

import pandas as pd

from ..chart import CategoryBars, CategoryPlot


class TestSupportDataFrameInCategoryBars(unittest.TestCase):

    def test_data_frame_for_category_bars(self):
        # given
        a = [1, 2, 3]
        b = [4, 5, 6]
        cat_df = pd.DataFrame({'a': a, 'b': b})
        bars = CategoryBars(value=[cat_df['a'], cat_df['b']])
        plot = CategoryPlot()
        # when
        plot.add(bars)
        # then
        value = plot.model['graphics_list'][0]['value']
        self.assertEqual(value[0], [1, 2, 3])
        self.assertEqual(value[1], [4, 5, 6])
