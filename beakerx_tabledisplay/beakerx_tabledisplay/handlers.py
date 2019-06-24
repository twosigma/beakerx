# Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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
import beakerx_tabledisplay
from notebook.utils import url_path_join
from notebook.base.handlers import APIHandler

import json
from tornado import web

class VersionHandler(APIHandler):
    def data_received(self, chunk):
        pass

    @web.authenticated
    def get(self):
        data = {'version': beakerx_tabledisplay.__version__}
        self.finish(json.dumps(data))


def load_jupyter_server_extension(nbapp):
    web_app = nbapp.web_app
    host_pattern = '.*$'
    version_route_pattern = url_path_join(web_app.settings['base_url'], '/version')
    web_app.add_handlers(host_pattern, [(version_route_pattern, VersionHandler)])
    nbapp.log.info("[beakerx_tabledisplay] enabled")
