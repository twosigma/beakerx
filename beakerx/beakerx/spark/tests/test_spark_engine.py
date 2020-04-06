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

from beakerx.spark.spark_engine import SparkEngine
from beakerx.spark.tests.test_spark import SingleSparkSessionMock, SparkSessionMock


class TestSparkEngine(unittest.TestCase):

    def test_should_reset_spark_stop_context(self):
        # given
        builder = BuilderMock()
        single_spark_session = SingleSparkSessionMock
        sut = SparkEngine(builder, single_spark_session, SparkSessionFactoryMock())
        # when
        sut.new_spark_builder()
        # then
        self.assertTrue(sut.stop_context == SparkEngine.STOP)

    def test_should_set_spark_stop_context_to_from_ui_when_stop(self):
        # given
        builder = BuilderMock()
        single_spark_session = SingleSparkSessionMock
        sut = SparkEngine(builder, single_spark_session, SparkSessionFactoryMock())
        sut.new_spark_builder()
        # when
        sut.stop()
        # then
        self.assertTrue(sut.stop_context == SparkEngine.STOP_FROM_UI)


class BuilderMock:
    def __init__(self) -> None:
        super().__init__()

    def getOrCreate(self):
        return SparkSessionMock()


class SparkSessionFactoryMock:
    def builder(self):
        return BuilderMock()
