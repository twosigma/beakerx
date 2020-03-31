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
import argparse
import unittest

from beakerx.spark.tests.test_spark import ProfileMock, SparkServerFactoryMock
from beakerx_magics import SparkFactory
from beakerx_magics.tests.test_spark_auto_connect import display_func_mock


class TestSparkNoUI(unittest.TestCase):

    def test_empty_options(self):
        # given
        parser = argparse.ArgumentParser(description='spark options.')
        options = parser.parse_args()
        sut = SparkFactory(options,
                           SparkEngineMock(),
                           IpythonManagerMock(),
                           SparkServerFactoryMock(),
                           ProfileMock(),
                           display_func_mock)
        # when
        spark_message = sut.create_spark()
        # then
        self.assertEqual(spark_message, (None, None))

    def test_auto_connect_when_no_ui(self):
        # given
        parser = argparse.ArgumentParser(description='spark options')
        parser.add_argument('--noUI', '-nu', action='store_true', help='no UI')
        options = parser.parse_args()
        options.noUI = True
        ipython_manager_mock = IpythonManagerMock()
        sut = SparkFactory(options, SparkEngineMock(), ipython_manager_mock, SparkServerFactoryMock(), ProfileMock(),
                           display_func_mock)
        # when
        spark_message = sut.create_spark()
        # then
        self.assertTrue(ipython_manager_mock.configured)
        self.assertEqual(spark_message, ("SparkSession is available by 'spark'", None))


class SparkEngineMock:

    def __init__(self):
        self.auto_start = False

    def new_spark_builder(self):
        pass

    def getOrCreate(self):
        pass

    def spark_app_id(self):
        pass

    def ui_web_url(self):
        pass

    def stop(self):
        pass

    def is_auto_start(self):
        return self.auto_start

    def configure_auto_start(self):
        self.auto_start = True

    def get_additional_spark_options(self):
        return {}

    def get_user_spark_config(self):
        return {}


class IpythonManagerMock:

    def __init__(self):
        self.configured = False

    def configure(self, engine):
        self.configured = True
