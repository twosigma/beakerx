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

import os

import beakerx
import tornado
import zmq
from notebook.base.handlers import APIHandler, IPythonHandler
from notebook.utils import url_path_join
from tornado import web, gen
from tornado.simple_httpclient import HTTPStreamClosedError

from .beakerx_autotranslation_server import start_autotranslation_server
from .environment import *


class BeakerxRestHandler(APIHandler):

    def data_received(self, chunk):
        pass

    @web.authenticated
    @gen.coroutine
    def post(self):

        data = tornado.escape.json_decode(self.request.body)
        content = json.dumps(data)
        params = json.loads(content)

        type = params.get('type')
        url = params['url']
        if type == "python":
            context = zmq.Context()
            socket = context.socket(zmq.REQ)
            socket.connect(url)
            socket.send_string(content)
            response = socket.recv()
            self.finish(response)
            socket.close()
            context.destroy()
        else:
            req = tornado.httpclient.HTTPRequest(
                url=url,
                method=self.request.method,
                body=self.request.body,
                headers=self.request.headers,
                follow_redirects=False,
                allow_nonstandard_methods=True
            )
            client = tornado.httpclient.AsyncHTTPClient()
            try:
                res = yield client.fetch(req)
                self.finish(res.body)
            except Exception as e:
                raise web.HTTPError(500, 'Internal server error:\n' + str(e))


class SparkMetricsExecutorsHandler(APIHandler):
    def data_received(self, chunk):
        pass

    @web.authenticated
    @gen.coroutine
    def get(self):

        app_id = self.get_argument('sparkAppId', None)
        ui_web_url = self.get_argument('sparkUiWebUrl', None)

        url = ui_web_url + "/api/v1/applications/" + app_id + "/allexecutors"
        req = tornado.httpclient.HTTPRequest(
            url=url,
            method=self.request.method,
            body=self.request.body,
            headers=self.request.headers,
            follow_redirects=False,
            allow_nonstandard_methods=True
        )

        client = tornado.httpclient.AsyncHTTPClient()
        try:
            res = yield client.fetch(req)
            self.finish(res.body)
        except ConnectionRefusedError as cre:
            pass  # spark was stopped
        except HTTPStreamClosedError as hsce:
            pass  # spark was stopped
        except Exception as ex:
            raise web.HTTPError(500, 'Internal server error:\n' + str(ex))


class SettingsHandler(APIHandler):
    def data_received(self, chunk):
        pass

    @staticmethod
    def _read_property():
        return EnvironmentSettings.read_setting_from_file()

    @web.authenticated
    def get(self):
        self.finish(SettingsHandler._read_property())

    @web.authenticated
    def post(self):
        data = tornado.escape.json_decode(self.request.body)

        EnvironmentSettings.save_setting_to_file(json.dumps(data))

        self.finish(json.dumps(SettingsHandler._read_property()))


class VersionHandler(APIHandler):
    def data_received(self, chunk):
        pass

    @web.authenticated
    def get(self):
        data = {'version': beakerx.__version__}
        self.finish(json.dumps(data))


class JavaDoc(web.StaticFileHandler, IPythonHandler):
    def initialize(self):
        beakerx_path = os.path.dirname(beakerx.__file__)
        web.StaticFileHandler.initialize(self, path=os.path.join(beakerx_path, 'javadoc'))

    @web.authenticated
    def get(self, path):
        self.set_header('Content-Type', 'text/html')
        return web.StaticFileHandler.get(self, path)


def load_jupyter_server_extension(nbapp):
    start_autotranslation_server()

    web_app = nbapp.web_app
    host_pattern = '.*$'
    settings_route_pattern = url_path_join(web_app.settings['base_url'], '/beakerx', '/settings')
    spark_metrics_executors_route_pattern = url_path_join(web_app.settings['base_url'], '/beakerx',
                                                          '/sparkmetrics/executors')
    version_route_pattern = url_path_join(web_app.settings['base_url'], '/beakerx', '/version')
    javadoc_route_pattern = url_path_join(web_app.settings['base_url'], '/static', '/javadoc/(.*)')
    javadoc_lab_route_pattern = url_path_join(web_app.settings['base_url'], '/javadoc/(.*)')
    beakerx__rest_route_pattern = url_path_join(web_app.settings['base_url'], '/beakerx', '/rest')

    web_app.add_handlers(host_pattern, [(settings_route_pattern, SettingsHandler)])
    web_app.add_handlers(host_pattern, [(spark_metrics_executors_route_pattern, SparkMetricsExecutorsHandler)])
    web_app.add_handlers(host_pattern, [(version_route_pattern, VersionHandler)])
    web_app.add_handlers(host_pattern, [(javadoc_route_pattern, JavaDoc)])
    web_app.add_handlers(host_pattern, [(javadoc_lab_route_pattern, JavaDoc)])
    web_app.add_handlers(host_pattern, [(beakerx__rest_route_pattern, BeakerxRestHandler)])
    nbapp.log.info("[beakerx] enabled")
