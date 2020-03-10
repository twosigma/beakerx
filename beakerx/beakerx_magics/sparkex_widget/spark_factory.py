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

from beakerx.spark import SparkUI2


class SparkFactory:

    def __init__(self, options, spark_engine, ipython_manager, server_factory, profile, display_func):
        self.display_func = display_func
        self.options = options
        self.profile = profile
        self.server_factory = server_factory
        self.ipythonManager = ipython_manager
        self.engine = spark_engine

    def create_spark(self):
        self.engine = self._parse_spark_options(self.engine, self.options)
        spark_widget = self._create_spark_ui()
        self.display_func(spark_widget)
        spark_widget.after_display()
        return spark_widget

    def _create_spark_ui(self):
        spark_widget = SparkUI2(self.engine,
                                self.ipythonManager,
                                self.server_factory,
                                self.profile)
        return spark_widget

    def _parse_spark_options(self, engine, args):
        if args.start:
            engine.configure_auto_start()
        return engine
