# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

from beakerx_base import BeakerxBox
from beakerx_magics.sparkex_widget import SparkStateProgressUiManager
from beakerx_magics.sparkex_widget.spark_listener import SparkListener
from beakerx_magics.sparkex_widget.spark_server import BeakerxSparkServer
from traitlets import Unicode


class SparkUI2(BeakerxBox):
    _view_name = Unicode('SparkUI2View').tag(sync=True)
    _model_name = Unicode('SparkUI2Model').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)

    def __init__(self, builder, ipython, **kwargs):
        super(SparkUI2, self).__init__(**kwargs)
        self.builder = builder
        self.sc = None
        self.ipython = ipython
        self.on_msg(self.handle_msg)
        self.on_start()

    def handle_msg(self, _, content, buffers):
        if content['event'] == "start":
            self.handle_start(content)
        elif content['event'] == "stop":
            self.handle_stop(content)

    def handle_stop(self, content):
        self.sc.stop()

    def handle_start(self, content):
        payload = content['payload']
        for key, value in payload.items():
            if key == "properties":
                for item in value:
                    self.builder.config(item.name, item.value)
            self.builder.config(key, value)
        self.on_start()

    def on_start(self):
        spark = self.builder.getOrCreate()
        self.sc = spark.sparkContext
        spark_server = BeakerxSparkServer(self.sc)
        ServerRunner().run(spark_server)
        self.spark_job(self.ipython, spark, spark_server)
        msg = {
            'method': 'update',
            'event': {
                "start": "completed"
            }
        }
        self.comm.send(data=msg)

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
