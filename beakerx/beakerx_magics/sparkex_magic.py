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

from IPython import get_ipython
from IPython.core.magic import (Magics, magics_class, cell_magic)
from beakerx_magics.sparkex_widget import  SparkStateProgressUiManager
from beakerx_magics.sparkex_widget.spark_listener import SparkListener
from beakerx_magics.sparkex_widget.spark_server import BeakerxSparkServer
from pyspark.sql import SparkSession


@magics_class
class SparkexMagics(Magics):

    @cell_magic
    def spark(self, line, cell):
        ipython = get_ipython()
        result = self.runCellCode(cell, ipython)
        builder = result.result
        spark = builder.getOrCreate()
        sc = spark.sparkContext
        spark_server = BeakerxSparkServer(sc)
        ServerRunner().run(spark_server)
        self.spark_job(ipython, spark, spark_server)

        return "SparkSession is available by 'spark'"

    def runCellCode(self, cell, ipython):
        import ipywidgets as widgets
        out = widgets.Output(layout={'border': '1px solid black'})
        with out:
            result = ipython.run_cell(cell)
        if isinstance(result.result, SparkSession.Builder):
            pass
        else:
            raise TypeError("Spark magic command must return SparkSession.Builder object")
        return result

    def spark_job(self, ipython, spark, spark_server):
        sc = spark.sparkContext
        sc._gateway.start_callback_server()
        sc._jsc.sc().addSparkListener(SparkListener(SparkStateProgressUiManager(sc, spark_server)))
        ipython.push({"spark": spark})
        ipython.push({"sc": sc})
        return sc


class SparkJobRunner:
    def _task(self, spark_job, ipython, builder, spark_server):
        spark_job(ipython, builder, spark_server)

    def run(self, spark_job, ipython, builder, spark_server):
        self._task(spark_job, ipython, builder, spark_server)


class ServerRunner:

    def _start_server(self, server):
        server.run()

    def run(self, server):
        from threading import Thread
        t = Thread(target=self._start_server, args=(server,))
        t.daemon = True
        t.start()


def load_ipython_extension(ipython):
    ipython.register_magics(SparkexMagics)
