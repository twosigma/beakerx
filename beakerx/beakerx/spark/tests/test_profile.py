# Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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
import pathlib
import unittest
from shutil import copyfile

from beakerx.spark.profile import Profile


class TestSparkUIProfile(unittest.TestCase):
    MOCK_TEST_JSON = str(pathlib.Path(__file__).parent.absolute()) + os.path.sep + "resources" + os.path.sep + "beakerxMock2.json"
    MOCK_JSON = str(pathlib.Path(__file__).parent.absolute()) + os.path.sep + "resources" + os.path.sep + "beakerxMock.json"

    def test_should_load_profiles(self):
        # given
        sut = Profile(path_to_beakerx_json=TestSparkUIProfile.MOCK_JSON)
        # when
        result, err = sut.load_profiles()
        # then
        self.assertTrue(err is None)
        self.assertTrue("profiles" in result)

    def test_should_save_profile(self):
        # given
        copyfile(TestSparkUIProfile.MOCK_JSON, TestSparkUIProfile.MOCK_TEST_JSON)
        sut = Profile(path_to_beakerx_json=TestSparkUIProfile.MOCK_TEST_JSON)
        profile_to_save = [
            {
                'name': 'pf_new1',
                'spark.executor.memory': '8g',
                'spark.master': 'local[10]',
                'spark.executor.cores': '10',
                'properties': []
            },
            {
                'name': 'pf_new2',
                'spark.executor.memory': '8g',
                'spark.master': 'local[10]',
                'spark.executor.cores': '10',
                'properties': [{
                    "name": "prop1",
                    "value": "value1"
                }]
            }
        ]
        # when
        result, err = sut.save(profile_to_save)
        # then
        self.assertTrue(err is None)
        self.assertTrue(result)
        result, err = sut.load_profiles()
        profiles = result["profiles"]
        self.assertTrue("pf_new" in profiles[0]["name"])
        os.remove(TestSparkUIProfile.MOCK_TEST_JSON)

    def test_should_save_current_profile(self):
        # given
        copyfile(TestSparkUIProfile.MOCK_JSON, TestSparkUIProfile.MOCK_TEST_JSON)
        sut = Profile(path_to_beakerx_json=TestSparkUIProfile.MOCK_TEST_JSON)
        # when
        result, err = sut.save_current_profile("new_profile_name1")
        # then
        self.assertTrue(err is None)
        self.assertTrue(result)
        result, err = sut.load_profiles()
        current_profile = result["current_profile"]
        self.assertTrue(current_profile == "new_profile_name1")
        os.remove(TestSparkUIProfile.MOCK_TEST_JSON)
