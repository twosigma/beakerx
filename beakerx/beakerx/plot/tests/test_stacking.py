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

from ..chart import Plot, Area
from ..plotitem import XYStacker


class TestStacking(unittest.TestCase):

    def test_plot(self):
        # given
        y1 = [1, 5, 3, 2, 3]
        y2 = [7, 2, 4, 1, 3]
        plot = Plot()
        a1 = Area(y=y1, displayName='y1')
        a2 = Area(y=y2, displayName='y2')
        stacker = XYStacker()
        # when
        plot.add(stacker.stack([a1, a2]))
        # then
        model = plot.model
        self.assertEqual(len(model['graphics_list']), 2)
