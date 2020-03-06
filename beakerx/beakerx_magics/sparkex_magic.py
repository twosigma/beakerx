# Copyright 2019 TWO SIGMA OPEN SOURCE, LLC  #
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

import ipywidgets as widgets
from IPython import get_ipython
from IPython.core.magic import (Magics, magics_class, cell_magic)
from beakerx.spark import (SparkUI2, IpythonManager, BeakerxSparkServerFactory)
from beakerx.spark.profile import Profile
from beakerx.spark.spark_engine import SparkEngine
from pyspark.sql import SparkSession


@magics_class
class SparkexMagics(Magics):

    @cell_magic
    def spark(self, line, cell):
        ipython = get_ipython()
        result = self.runCellCode(cell, ipython)
        builder = result.result
        engine = SparkEngine(builder)
        spark_widget = SparkUI2(engine,
                                IpythonManager(ipython),
                                BeakerxSparkServerFactory(),
                                Profile())
        return spark_widget

    def runCellCode(self, cell, ipython):

        out = widgets.Output(layout={'border': '1px solid black'})
        with out:
            result = ipython.run_cell(cell)
        if isinstance(result.result, SparkSession.Builder):
            pass
        else:
            raise TypeError("Spark magic command must return SparkSession.Builder object")
        return result


def load_ipython_extension(ipython):
    ipython.register_magics(SparkexMagics)
