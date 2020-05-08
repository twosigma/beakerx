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


class SparkWithoutUI:

    def __init__(self, engine, ipython_manager):
        self.ipython_manager = ipython_manager
        self.engine = engine

    def create_spark(self):
        self.engine.new_spark_builder()
        self.ipython_manager.configure(self.engine)
        return "SparkSession is available by 'spark'", None
