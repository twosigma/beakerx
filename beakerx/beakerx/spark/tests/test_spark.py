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
from beakerx.spark.spark_engine import SparkEngine
from beakerx_magics import SingleSparkSession
from ipykernel.comm import Comm


class TestSparkUI(unittest.TestCase):

    def test_should_load_profile_on_widget_creation(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        # when
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, CommMock())
        # then
        self.assertTrue(sui.profiles == [
            {
                "name": "",
                "prop_1": "init_value_1"
            }
        ])
        self.assertTrue(sui.current_profile == "")

    def test_should_create_spark_conf_based_on_user_conf_when_widget_creation(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        # when
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, CommMock())
        # then
        self.assertTrue(sui.user_spark_conf == {
            "name": "",
            "prop_1": "user_value_1"
        })

    def test_should_save_profiles(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, CommMock())
        msg_save_profile = {
            "event": "save_profiles",
            "payload": [
                {
                    "spark.executor.memory": "8g",
                    "spark.master": "local[10]",
                    "name": "new_prof_1",
                    "spark.executor.cores": "10",
                    "properties": []
                }
            ]
        }
        # when
        sui.handle_msg(sui, msg_save_profile)
        # then
        result, err = profile.load_profiles()
        self.assertTrue(result["profiles"][0]["name"] == "new_prof_1")
        self.assertTrue(err is None)
        self.assertTrue(sui.comm.message["method"] == "update")
        event = sui.comm.message["event"]
        self.assertTrue(event["save_profiles"] == "done")

    def test_should_send_done_message_when_sc_stops(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, CommMock())
        msg_start = self.create_msg_start()
        sui.handle_msg(sui, msg_start)
        msg_stop = {
            'event': 'stop'
        }
        # when
        sui.handle_msg(sui, msg_stop)
        # then
        self.assertTrue(sui.comm.message["method"] == "update")
        event = sui.comm.message["event"]
        self.assertTrue(event["stop"] == "done")

    def test_should_send_done_message_when_sc_starts(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(engine, ipython_manager, spark_server_factory, profile, CommMock())
        msg_start = self.create_msg_start()
        # when
        sui.handle_msg(sui, msg_start)
        # then
        self.assertTrue(sui.comm.message["method"] == "update")
        event = sui.comm.message["event"]
        self.assertTrue(event["start"] == "done")
        self.assertTrue(event["sparkAppId"] == "appIdLocal1")
        self.assertTrue(event["sparkUiWebUrl"] == "SparkUiWebUrl1")

    def create_msg_start(self):
        return {
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

    def test_should_save_current_profile_when_sc_starts(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
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
                    'properties': []
                }
            }
        }
        # when
        sui.handle_msg(sui, msg_start)
        # then
        self.assertTrue(profile.spark_options["current_profile"] == "profile1")

    def test_should_not_create_sc_when_builder_is_None(self):
        # given
        engine = None
        spark_server_factory = SparkServerFactoryMock()
        ipython = IpythonManagerMock()
        profile = ProfileMock()
        # when
        try:
            SparkUI2(engine, ipython, spark_server_factory, profile)
            self.fail("builder is None")
        except Exception as err:
            self.assertTrue("value can not be None" in str(err), "Should not create SparkUI when builder is None")
        # then

    def test_should_not_create_sc_when_ipython_is_None(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        ipython = None
        # when
        try:
            SparkUI2(engine, ipython, spark_server_factory, profile)
            self.fail("ipython is None")
        except Exception as err:
            self.assertTrue("value can not be None" in str(err), "Should not create SparkUI when ipython is None")
        # then

    def test_should_not_create_sc_when_factory_is_None(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        ipython = IpythonManagerMock()
        profile = ProfileMock()
        spark_server_factory = None
        # when
        try:
            SparkUI2(engine, ipython, spark_server_factory, profile)
            self.fail("spark server factory is None")
        except Exception as err:
            self.assertTrue("value can not be None" in str(err), "Should not create SparkUI when factory is None")
        # then

    def test_should_create_sc(self):
        # given
        spark_server_factory = SparkServerFactoryMock()
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock, SparkSessionFactoryMock())
        ipython = IpythonManagerMock()
        profile = ProfileMock()
        # when
        spark_ui = SparkUI2(engine, ipython, spark_server_factory, profile, CommMock())
        # then
        self.assertTrue(spark_ui)


class SingleSparkSessionMock(SingleSparkSession):

    def __init__(self) -> None:
        super().__init__()


class CommMock(Comm):

    def __init__(self):
        self.message = None

    def send(self, *args, **kwargs):
        self.message = kwargs["data"]


class BuilderMock:

    def __init__(self):
        self._options = {}

    def getOrCreate(self):
        return SparkSessionMock()

    def config(self, key=None, value=None, conf=None):
        pass


class SparkEngineMock(SparkEngine):

    def __init__(self, builder, single_spark_session, spark_session_factory):
        super().__init__(builder, single_spark_session, spark_session_factory)
        self.sparkui = None

    def spark_app_id(self):
        return 'appIdLocal1'

    def configure_listeners(self, sparkui, server):
        self.sparkui = sparkui

    def get_user_spark_config(self):
        return {
            "prop_1": "user_value_1"
        }

    def getOrCreate(self):
        return {}

    def stop(self):
        self.sparkui.end_application()

    def get_ui_web_url(self):
        return 'SparkUiWebUrl1'


class SparkSessionMock:
    def __init__(self):
        pass

    @property
    def sparkContext(self):
        return SparkContextMock()


class SparkContextMock:
    def __init__(self):
        pass

    def stop(self):
        pass


class IpythonManagerMock:

    def __init__(self):
        pass

    def configure(self, spark):
        pass


class SparkServerFactoryMock:

    def __init__(self):
        pass

    def run_new_instance(self, spark_context):
        pass


class ProfileMock:
    err = None

    def __init__(self):
        self.spark_options = {
            "current_profile": "",
            "profiles": [
                {
                    "name": "",
                    "prop_1": "init_value_1"
                }
            ]
        }

    def save(self, content):
        self.spark_options["profiles"] = content
        return True, ProfileMock.err

    def load_profiles(self):
        return self.spark_options, ProfileMock.err

    def save_current_profile(self, current_profile):
        self.spark_options["current_profile"] = current_profile
        return True, ProfileMock.err


class SparkSessionFactoryMock:
    def builder(self):
        return BuilderMock()
