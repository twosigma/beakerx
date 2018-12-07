# Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
from notebook.base.handlers import APIHandler, IPythonHandler

import json
from tornado import web
import beakerx_databrowser
import tornado
from os import listdir
from os.path import isfile, join

class VersionHandler(APIHandler):
    def data_received(self, chunk):
        pass

    @web.authenticated
    def get(self):
        data = {'version': beakerx_databrowser.__version__}
        self.finish(json.dumps(data))

class ListFolderHandler(APIHandler):
    def get(self):
        path = self.get_argument('path')
        flist = listdir(path)
        folders = [f for f in flist if not isfile(join(path, f))]
        files = []
        for f in flist:
            if isfile(join(path, f)) and f.endswith('.json'):
                files.append(json.loads(open(join(path, f), 'r').read()))
        self.finish({'childProductNames': files, 
                     'childFolderNames': folders})

class GetFileHandler(APIHandler):
    def get(self):
        path = self.get_argument('path')
        self.finish({'content':json.loads(open(path + '.json', 'r').read())})



def load_jupyter_server_extension(nbapp):
    web_app = nbapp.web_app
    host_pattern = '.*$'
    version_route_pattern = url_path_join(web_app.settings['base_url'], '/version')
    listfolder_route_pattern = url_path_join(web_app.settings['base_url'], '/listfolder')
    getfile_route_pattern = url_path_join(web_app.settings['base_url'], '/getfile')

    web_app.add_handlers(host_pattern, [(version_route_pattern, VersionHandler)])
    web_app.add_handlers(host_pattern, [(listfolder_route_pattern, ListFolderHandler)])
    web_app.add_handlers(host_pattern, [(getfile_route_pattern, GetFileHandler)])
    
    nbapp.log.info("[beakerx_databrowser] enabled")
