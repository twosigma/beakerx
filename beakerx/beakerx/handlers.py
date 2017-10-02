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

from notebook.utils import url_path_join
from notebook.base.handlers import IPythonHandler
from os import environ, putenv, getenv

import json
from tornado import web
import tornado
from notebook.base.handlers import json_errors

class SettingsHandler(IPythonHandler):
    data={}
    @json_errors
    def get(self):
        args = ""
        if 'beakerx_java_arg' in environ:
            args = environ['beakerx_java_arg']
        self.finish(json.dumps(args))
    
   # @web.authenticated
    @json_errors
    def post(self):
        self.set_status(200)
        data = tornado.escape.json_decode(self.request.body)
        self.finish(json.dumps("done put: ", data))

    @json_errors
    def put(self):
        self.set_status(200)
        data = tornado.escape.json_decode(self.request.body)
        environ['beakerx_java_arg'] = '-Xmx2g'
#        putenv('beakerx_java_arg', '-Xmx2g')
        self.finish(json.dumps(environ['beakerx_java_arg']))
        

def load_jupyter_server_extension(nbapp):
    """Load the nbserver extension"""
    web_app = nbapp.web_app

    host_pattern = '.*$'
    route_pattern = url_path_join(web_app.settings['base_url'], '/beakerx','/settings')
    web_app.add_handlers(host_pattern, [(route_pattern, SettingsHandler)])
    #TODO WYWALIĆ
    web_app.settings['xsrf_cookies'] = False
    nbapp.log.info("[beakerx] enabled")