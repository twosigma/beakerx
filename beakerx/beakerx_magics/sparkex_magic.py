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
from IPython.core import magic_arguments
from IPython.core.display import display
from IPython.core.magic import (Magics, magics_class, cell_magic)
from beakerx.spark import (IpythonManager, BeakerxSparkServerFactory)
from beakerx.spark.profile import Profile
from beakerx.spark.spark_engine import SparkEngine
from beakerx_magics.sparkex_widget.spark_factory import SparkFactory
from pyspark.sql import SparkSession


@magics_class
class SparkexMagics(Magics):

    @cell_magic
    @magic_arguments.magic_arguments()
    @magic_arguments.argument('--start', '-s', action='store_true', help='auto start')
    def spark(self, line, cell):
        ipython = get_ipython()
        result = self._runCellCode(cell, ipython)
        builder = result.result
        options = magic_arguments.parse_argstring(self.spark, line)
        factory = self._create_spark_factory(
            builder,
            IpythonManager(ipython),
            BeakerxSparkServerFactory(),
            Profile(),
            options,
            self._display_ui)
        factory.create_spark()

    def _create_spark_factory(self, builder, ipython_manager, server_factory, profile, options, display_func):
        factory = SparkFactory(options, SparkEngine(builder), ipython_manager, server_factory, profile, display_func)
        return factory

    def _display_ui(self, spark_ui):
        return display(spark_ui)

    def _runCellCode(self, cell, ipython):

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
