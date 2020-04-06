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
import unittest

from beakerx import SparkUI2
from beakerx.spark.tests.test_spark import BuilderMock, SparkEngineMock, IpythonManagerMock, SparkServerFactoryMock, \
    ProfileMock, CommMock, SingleSparkSessionMock, SparkSessionFactoryMock


class TestSparkAutoConnect(unittest.TestCase):

    def test_auto_connect_spark(self):
        # given
        ipython_manager = IpythonManagerMock()
        builder = BuilderMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        comm_mock = CommMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        engine.configure_auto_start()
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, comm_mock)
        # when
        sui.after_display()
        # then
        self.assertTrue(sui.is_auto_start)
        self.assertTrue(sui.comm.message["method"] == "update")
        event = sui.comm.message["event"]
        self.assertTrue(event["auto_start"] == "done")
        self.assertTrue(event["sparkAppId"] == "appIdLocal1")
        self.assertTrue(event["sparkUiWebUrl"] == "SparkUiWebUrl1")
