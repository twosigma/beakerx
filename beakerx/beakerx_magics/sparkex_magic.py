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

import sys

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


class SingleSparkSession:

    def __init__(self) -> None:
        self.active = False

    def is_active(self):
        return self.active

    def activate(self):
        self.active = True

    def inactivate(self):
        self.active = False


class SparkSessionFactory:
    def builder(self):
        return SparkSession.builder


@magics_class
class SparkexMagics(Magics):
    SINGLE_SPARK_SESSION = SingleSparkSession()

    @cell_magic
    @magic_arguments.magic_arguments()
    @magic_arguments.argument('--start', '-s', action='store_true', help='auto start')
    @magic_arguments.argument('--noUI', '-nu', action='store_true', help='no UI')
    @magic_arguments.argument('--yarn', '-yr', action='store_true', help='yarn')
    def spark(self, line, cell):
        self.clear_spark_session()
        ipython = get_ipython()
        result, err = self._runCellCode(cell, ipython)
        if err is not None:
            print(err, file=sys.stderr)
            return
        builder = result.result
        options = magic_arguments.parse_argstring(self.spark, line)
        factory = self._create_spark_factory(
            builder,
            IpythonManager(ipython),
            BeakerxSparkServerFactory(),
            Profile(),
            options,
            self._display_ui,
            SparkexMagics.SINGLE_SPARK_SESSION)
        err = factory.create_spark()
        if err is not None:
            print(err, file=sys.stderr)
            return

    def clear_spark_session(self):
        SparkSession.builder._options = {}

    def _create_spark_factory(self,
                              builder,
                              ipython_manager,
                              server_factory,
                              profile,
                              options,
                              display_func,
                              single_spark_session):
        factory = SparkFactory(options,
                               SparkEngine(builder, single_spark_session, SparkSessionFactory()),
                               ipython_manager,
                               server_factory,
                               profile,
                               display_func)
        return factory

    def _display_ui(self, spark_ui):
        return display(spark_ui)

    def _runCellCode(self, cell, ipython):
        out = widgets.Output(layout={'border': '1px solid black'})
        with out:
            result = ipython.run_cell(cell)
        if isinstance(result.result, SparkSession.Builder):
            return result, None
        else:
            if result.error_in_exec is not None:
                return None, result.error_in_exec
            else:
                return None, "Spark magic command must return SparkSession.Builder object"


def load_ipython_extension(ipython):
    ipython.register_magics(SparkexMagics)
