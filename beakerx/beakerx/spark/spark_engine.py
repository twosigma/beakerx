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
# See the License for the specific language governing permissions and
# See the License for the specific language governing permissions and
# limitations under the License.
from beakerx.commons import check_is_None
from beakerx_magics.sparkex_widget import SparkStateProgressUiManager
from beakerx_magics.sparkex_widget.spark_listener import SparkListener


class SparkEngine:

    def __init__(self, builder):
        self.builder = check_is_None(builder)
        self.auto_start = False

    def config(self, name, value):
        self.builder.config(name, value)

    def getOrCreate(self):
        return self.builder.getOrCreate()

    def spark_app_id(self):
        return self.getOrCreate().sparkContext._jsc.sc().applicationId()

    def ui_web_url(self):
        return self.getOrCreate().sparkContext.uiWebUrl

    def stop(self):
        self.getOrCreate().sparkContext.stop()

    def is_auto_start(self):
        return self.auto_start

    def configure_auto_start(self):
        self.auto_start = True

    def configure_listeners(self, engine, server):
        spark_session = engine.getOrCreate()
        spark_context = spark_session.sparkContext
        spark_context._gateway.start_callback_server()
        spark_context._jsc.sc().addSparkListener(SparkListener(SparkStateProgressUiManager(spark_context, server)))
