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

from beakerx.spark import SparkUI2
from beakerx.spark.spark_wihtout_ui import SparkWithoutUI


class SparkFactory:

    def __init__(self, options, spark_engine, ipython_manager, server_factory, profile, display_func):
        self.options = options
        self.spark_engine = spark_engine
        self.display_func = display_func
        self.profile = profile
        self.server_factory = server_factory
        self.ipythonManager = ipython_manager

    def create_spark(self):
        err = self._execute_options(self.spark_engine, self.options)
        if err is not None:
            return None, err
        if self._is_no_ui(self.options):
            return self._create_spark_without_ui()
        else:
            spark_widget = self._create_spark_ui()
            self.display_func(spark_widget)
            spark_widget.after_display()
            return None, None

    def _create_spark_without_ui(self):
        swui = SparkWithoutUI(self.spark_engine, self.ipythonManager)
        return swui.create_spark()

    def _create_spark_ui(self):
        spark_widget = SparkUI2(self.spark_engine,
                                self.ipythonManager,
                                self.server_factory,
                                self.profile)
        return spark_widget

    def _execute_options(self, engine, options):
        if "start" in options and options.start:
            engine.configure_auto_start()
            return None
        if "yarn" in options and options.yarn:
            if "HADOOP_CONF_DIR" not in os.environ:
                return """'HADOOP_CONF_DIR' is not set,\nplease use os.environ['HADOOP_CONF_DIR'] = PATH_TO_HADOOP_CONF_DIR"""
            self.spark_engine.add_additional_spark_options({
                "spark.executor.cores": "4",
                "spark.executor.memory": "1g",
                "spark.master": "yarn"
            })
            return None

    def _is_no_ui(self, options):
        return "noUI" in options and options.noUI
