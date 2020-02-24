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

from beakerx_base import BeakerxBox
from beakerx_magics.sparkex_widget import SparkStateProgressUiManager
from beakerx_magics.sparkex_widget.spark_listener import SparkListener
from beakerx_magics.sparkex_widget.spark_server import BeakerxSparkServer
from traitlets import Unicode, List


class SparkUI2(BeakerxBox):
    _view_name = Unicode('SparkUI2View').tag(sync=True)
    _model_name = Unicode('SparkUI2Model').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    profiles = List().tag(sync=True)
    current_profile_name = Unicode("").tag(sync=True)

    def __init__(self, builder, ipython_manager, spark_server_factory, profile, comm=None, **kwargs):
        self.builder = self.check_is_None(builder)
        self.ipython_manager = self.check_is_None(ipython_manager)
        self.spark_server_factory = self.check_is_None(spark_server_factory)
        self.profile = self.check_is_None(profile)
        self.on_msg(self.handle_msg)
        if comm is not None:
            self.comm = comm
        self.profiles, self.current_profile_name = self._get_init_profiles()
        super(SparkUI2, self).__init__(**kwargs)

    def handle_msg(self, _, content, buffers=None):
        if content['event'] == "start":
            self._handle_start(content)
        elif content['event'] == "stop":
            self._handle_stop(content)
        elif content['event'] == "save_profiles":
            self._handle_save_profile(content)

    def _handle_save_profile(self, content):
        payload = content["payload"]
        result, err = self.profile.save(payload)
        if result:
            msg = {
                'method': 'update',
                'event': {
                    "save_profiles": "done"
                }
            }
            self.comm.send(data=msg)

    def _handle_stop(self, content):
        self.sc.stop()
        msg = {
            'method': 'update',
            'event': {
                "stop": "done"
            }
        }
        self.comm.send(data=msg)

    def _handle_start(self, content):
        current_profile_name = content['payload']['current_profile_name']
        spark_options = content['payload']['spark_options']
        for key, value in spark_options.items():
            if key == "properties":
                for item in value:
                    self.builder.config(item.name, item.value)
            self.builder.config(key, value)
        self._on_start()
        self.profile.save_current_profile_name(current_profile_name)

    def _on_start(self):
        spark = self.builder.getOrCreate()
        self.sc = spark.sparkContext
        spark_server = self.spark_server_factory.run_new_instance(self.sc)
        self.ipython_manager.configure(spark, spark_server)
        msg = {
            'method': 'update',
            'event': {
                "start": "done"
            }
        }
        self.comm.send(data=msg)

    def check_is_None(self, value):
        if value is None:
            raise Exception('value can not be None')
        return value

    def _get_init_profiles(self):
        data, err = self.profile.load_profiles()
        if err is None:
            return data["profiles"], data["current_profile"]
        return {}, "", err


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


class BeakerxSparkServerFactory:

    def run_new_instance(self, spark_context):
        server = BeakerxSparkServer(spark_context)
        ServerRunner().run(server)
        return server


class IpythonManager:
    def __init__(self, ipython):
        self.ipython = ipython

    def configure(self, spark, spark_server):
        sc = spark.sparkContext
        sc._gateway.start_callback_server()
        sc._jsc.sc().addSparkListener(SparkListener(SparkStateProgressUiManager(sc, spark_server)))
        self.ipython.push({"spark": spark})
        self.ipython.push({"sc": sc})
        return sc
