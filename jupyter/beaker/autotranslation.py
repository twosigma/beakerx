#
# Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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
import json
import os

class NamespaceGetHandler(IPythonHandler):
    def post(self):
        print("namespace get handler")
        name = self.get_argument('name')
        session = self.get_argument('session')
        self.log.info("name=%s session=%s" % (name, session))
        self.finish("ok")

class NamespaceSetHandler(IPythonHandler):
    def post(self):
        print("namespace set handler")
        name = self.get_argument('name')
        session = self.get_argument('session')
        value = self.get_argument('value')
        self.log.info("name=%s session=%s value=%s" % (name, session, value))
        self.finish("ok")

def load_jupyter_server_extension(nb_server_app):
    """
    Called when the extension is loaded.

    Args:
        nb_server_app (NotebookWebApplication): handle to the Notebook webserver instance.
    """
    web_app = nb_server_app.web_app
    core_url = nb_server_app.display_url
    base_url = web_app.settings['base_url']
    nb_server_app.log.info("autotranslation extension started")
    nb_server_app.log.info(web_app)
    os.environ['beaker_core_url'] = core_url
    host_pattern = '.*$'
    get_pattern = url_path_join(base_url, '/namespace/get')
    set_pattern = url_path_join(base_url, '/namespace/set')
    web_app.add_handlers(host_pattern, [(get_pattern, NamespaceGetHandler)])
    web_app.add_handlers(host_pattern, [(set_pattern, NamespaceSetHandler)])
