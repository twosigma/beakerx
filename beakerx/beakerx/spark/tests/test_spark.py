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
from ipykernel.comm import Comm


class TestSparkUI(unittest.TestCase):

    def test_should_load_profile_on_widget_creation(self):
        # given
        builder = BuilderMock()
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        # when
        sui = SparkUI2(builder, ipython_manager, spark_server_factory, profile, CommMock())
        # then
        self.assertTrue(sui.profiles == [])
        self.assertTrue(sui.current_profile == "")

    def test_should_save_profiles(self):
        # given
        builder = BuilderMock()
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(builder, ipython_manager, spark_server_factory, profile, CommMock())
        sui._on_start()
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
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(builder, ipython_manager, spark_server_factory, profile, CommMock())
        sui._on_start()
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
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(builder, ipython_manager, spark_server_factory, profile, CommMock())
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
        event = sui.comm.message["event"]
        self.assertTrue(event["start"] == "done")

    def test_should_save_current_profile_when_sc_starts(self):
        # given
        builder = BuilderMock()
        ipython_manager = IpythonManagerMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        sui = SparkUI2(builder, ipython_manager, spark_server_factory, profile, CommMock())
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
        builder = None
        spark_server_factory = SparkServerFactoryMock()
        ipython = IpythonManagerMock()
        profile = ProfileMock()
        # when
        try:
            SparkUI2(builder, ipython, spark_server_factory, profile)
            self.fail("builder is None")
        except Exception as err:
            self.assertTrue("value can not be None" in str(err), "Should not create SparkUI when builder is None")
        # then

    def test_should_not_create_sc_when_ipython_is_None(self):
        # given
        builder = BuilderMock()
        spark_server_factory = SparkServerFactoryMock()
        profile = ProfileMock()
        ipython = None
        # when
        try:
            SparkUI2(builder, ipython, spark_server_factory, profile)
            self.fail("ipython is None")
        except Exception as err:
            self.assertTrue("value can not be None" in str(err), "Should not create SparkUI when ipython is None")
        # then

    def test_should_not_create_sc_when_factory_is_None(self):
        # given
        builder = BuilderMock()
        ipython = IpythonManagerMock()
        profile = ProfileMock()
        spark_server_factory = None
        # when
        try:
            SparkUI2(builder, ipython, spark_server_factory, profile)
            self.fail("spark server factory is None")
        except Exception as err:
            self.assertTrue("value can not be None" in str(err), "Should not create SparkUI when factory is None")
        # then

    def test_should_create_sc(self):
        # given
        spark_server_factory = SparkServerFactoryMock()
        builder = BuilderMock()
        ipython = IpythonManagerMock()
        profile = ProfileMock()
        # when
        spark_ui = SparkUI2(builder, ipython, spark_server_factory, profile, CommMock())
        # then
        self.assertTrue(spark_ui)


class CommMock(Comm):

    def __init__(self):
        self.message = None

    def send(self, *args, **kwargs):
        self.message = kwargs["data"]


class BuilderMock:

    def __init__(self):
        pass

    def getOrCreate(self):
        return SparkSessionMock()

    def config(self, key=None, value=None, conf=None):
        pass


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

    def configure(self, spark, spark_server):
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
            "profiles": []
        }

    def save(self, content):
        self.spark_options["profiles"] = content
        return True, ProfileMock.err

    def load_profiles(self):
        return self.spark_options, ProfileMock.err

    def save_current_profile(self, current_profile):
        self.spark_options["current_profile"] = current_profile
        return True, ProfileMock.err
