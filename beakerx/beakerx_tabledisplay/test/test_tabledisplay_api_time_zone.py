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

from beakerx.tabledisplay import TableDisplay


class TestTableDisplayAPI_time_zone(unittest.TestCase):

    def test_default_time_zone(self):
        # given
        mapList4 = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        # when
        tabledisplay = TableDisplay(mapList4)
        # then
        self.assertTrue("timeZone" not in tabledisplay.model)

    def test_should_set_time_zone(self):
        # given
        timezone = "TZ1"
        mapList4 = [
            {"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6},
            {"a": 7, "b": 8, "c": 5}
        ]
        tabledisplay = TableDisplay(mapList4)
        # when
        tabledisplay.setTimeZone(timezone)
        # then
        self.assertEqual(tabledisplay.model["timeZone"], timezone)
