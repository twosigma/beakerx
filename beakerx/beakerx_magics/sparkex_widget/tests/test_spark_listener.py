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

from beakerx_magics import *
from beakerx_magics.sparkex_widget.spark_listener import SparkListener


class TestSparkListener(unittest.TestCase):

    def test_should_inactivate_single_spark_session_when_application_end(self):
        # given
        builder = BuilderMock()
        spark_session_mock = SingleSparkSessionMock()
        engine = SparkEngineMock(builder, spark_session_mock)
        engine.activate_spark_session()
        self.assertTrue(engine.is_active_spark_session())
        listener = SparkListener(SparkStateProgressUiManagerMock(engine))
        # when
        listener.onApplicationEnd(None)
        # then
        self.assertFalse(engine.is_active_spark_session())


class SparkStateProgressUiManagerMock:
    def __init__(self, engine):
        self.engine = engine


class SingleSparkSessionMock(SingleSparkSession):

    def __init__(self) -> None:
        super().__init__()


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


class SparkEngineMock(SparkEngine):

    def spark_app_id(self):
        return 'appIdLocal1'

    def configure_listeners(self, engine, server):
        pass

    def get_user_spark_config(self):
        return {
            "prop_1": "user_value_1"
        }

    def getOrCreate(self):
        return {}

    def stop(self):
        pass

    def get_ui_web_url(self):
        return 'SparkUiWebUrl1'
