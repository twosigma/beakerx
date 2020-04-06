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
from beakerx.spark.tests.test_spark import BuilderMock, SingleSparkSessionMock, SparkEngineMock, IpythonManagerMock, \
    SparkServerFactoryMock, ProfileMock, CommMock, SparkSessionFactoryMock


class TestSparkUI(unittest.TestCase):

    def test_should_send_single_spark_session_error_message_when_second_sc_starts(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        engine.activate_spark_session()
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, CommMock())
        msg_start = {
            'event': 'start',
            'payload': {
                "current_profile": "profile1",
                "spark_options": {
                    'spark.executor.memory': '8g',
                    'spark.master': 'local[10]',
                    'properties': [
                        {
                            "name": "wwww",
                            "value": "wwwww"
                        }
                    ]
                }
            }
        }
        # when
        sui.handle_msg(sui, msg_start)
        # then
        self.assertTrue(sui.comm.message["method"] == "update")
        error = sui.comm.message["error"]
        self.assertTrue(error["message"] == SparkUI2.ONE_SPARK_SESSION_MSG_ERROR)

    def test_should_send_single_spark_session_error_message_when_auto_connect_spark_try_start_second_spark(self):
        # given
        ipython_manager = IpythonManagerMock()
        builder = BuilderMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        comm_mock = CommMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        engine.activate_spark_session()
        engine.configure_auto_start()
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, comm_mock)
        # when
        sui.after_display()
        # then
        self.assertTrue(sui.comm.message["method"] == "update")
        error = sui.comm.message["error"]
        self.assertTrue(error["message"] == SparkUI2.ONE_SPARK_SESSION_MSG_ERROR)
