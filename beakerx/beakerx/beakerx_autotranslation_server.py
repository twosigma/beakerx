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

import tornado.ioloop
import tornado.web
import logging
import os
import random
import string
import socket

import base64

beakerx = {}

logging.getLogger('tornado.access').disabled = True


def basic_auth(f):
    def auth(username, password):
        return username == "beakerx" and password == os.environ["BEAKERX_AUTOTRANSLATION_PASSWORD"]

    def _request_auth(handler):
        handler.set_status(401)
        return handler.finish()

    def wrap(*args):
        handler = args[0]
        try:
            auth_header = handler.request.headers.get('Authorization')
            if (auth_header is None) or (not auth_header.startswith('Basic ')):
                return _request_auth(handler)
            auth_decoded = base64.b64decode(auth_header[6:])
            username, password = auth_decoded.decode('UTF-8').split(':', 2)
            if auth(username, password):
                f(*args)
            else:
                _request_auth(handler)
        except:
            _request_auth(handler)

    return wrap


class MainSaveHandler(tornado.web.RequestHandler):

    @basic_auth
    def post(self):
        input_json = tornado.escape.json_decode(self.request.body)
        session_id = input_json["sessionId"]
        name = input_json["name"]
        json = input_json["json"]
        if session_id not in beakerx:
            beakerx[session_id] = {}

        beakerx[session_id][name] = json
        return self.finish("ok")


class MainGetHandler(tornado.web.RequestHandler):

    @basic_auth
    def get(self, session_id, name):
        if session_id in beakerx and name in beakerx[session_id]:
            return self.finish(beakerx[session_id][name])
        return self.finish("undefined")


def make_app():
    return tornado.web.Application([
        (r"/autotransltion/(.*)/(.*)", MainGetHandler),
        (r"/autotransltion/", MainSaveHandler),
    ])


def get_free_tcp_port():
    tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp.bind(('localhost', 0))
    addr, port = tcp.getsockname()
    tcp.close()
    return port


def random_string_generator(size=128):
    s = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in
                range(size))
    return s


def init_env():
    os.environ["BEAKERX_AUTOTRANSLATION_PASSWORD"] = random_string_generator()
    os.environ["BEAKERX_AUTOTRANSLATION_PORT"] = str(get_free_tcp_port())


def start_autotranslation_server():
    init_env()
    app = make_app()
    app.listen(os.environ["BEAKERX_AUTOTRANSLATION_PORT"])
