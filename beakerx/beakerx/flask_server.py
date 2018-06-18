from flask import Flask, render_template, request, url_for, jsonify
from flask_basicauth import BasicAuth
import os
import socket
import random
import string
import logging
import threading


log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


class BeakerXFlaskServer:

    def __init__(self, port, app):
        self.beakerx = {}
        self.port = port
        self.app = app

    def start_server(self):
        self.app.run(port=int(self.port))

    def close(self):
        # http://flask.pocoo.org/snippets/67/
        func = request.environ.get('werkzeug.server.shutdown')
        if func is not None:
            func()


def start_flask_server():
    init_env()
    app = Flask(__name__)
    basic_auth = BasicAuth(app)

    app.config['BASIC_AUTH_USERNAME'] = os.environ["BEAKERX_BASIC_AUTH_USERNAME"]
    app.config['BASIC_AUTH_PASSWORD'] = os.environ["BEAKERX_BASIC_AUTH_PASSWORD"]
    flask_server = BeakerXFlaskServer(os.environ["BEAKERX_FLASK_SERVER_PORT"], app)

    @app.route('/autotransltion/', methods=["POST"])
    @basic_auth.required
    def update():
        input_json = request.form
        sessionId = input_json["sessionId"]
        name = input_json["name"]
        json = input_json["json"]
        if sessionId not in flask_server.beakerx:
            flask_server.beakerx[sessionId] = {}

        flask_server.beakerx[sessionId][name] = json
        return "ok"

    @app.route('/autotransltion/<sessionId>/<name>', methods=["GET"])
    @basic_auth.required
    def get(sessionId, name):
        if sessionId in flask_server.beakerx and name in flask_server.beakerx[sessionId]:
            return flask_server.beakerx[sessionId][name]
        return "undefined"

    @app.route('/autotransltion/close', methods=["GET"])
    @basic_auth.required
    def close():
        flask_server.close()
        return "ok"

    t = threading.Thread(target=flask_server.start_server)
    t.daemon =True
    t.start()


def get_free_tcp_port():
    tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp.bind(('', 0))
    addr, port = tcp.getsockname()
    tcp.close()
    return port


def random_string_generator(size=64):
    s = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in
                range(size))
    return s


def init_env():
    # logging.error("load_jupyter_server_extension start1")
    # if os.environ.get('BEAKERX_BASIC_AUTH_PASSWORD') is not None:
    #     logging.error(os.environ["BEAKERX_BASIC_AUTH_PASSWORD"])
    # if os.environ.get('BEAKERX_FLASK_SERVER_PORT') is not None:
    #     logging.error(os.environ["BEAKERX_FLASK_SERVER_PORT"])
    # logging.error("load_jupyter_server_extension end1")

    os.environ["BEAKERX_BASIC_AUTH_USERNAME"] = "beakerx"
    os.environ["BEAKERX_BASIC_AUTH_PASSWORD"] = random_string_generator()
    os.environ["BEAKERX_FLASK_SERVER_PORT"] = str(get_free_tcp_port())

    # logging.error("load_jupyter_server_extension start2")
    # logging.error(os.environ["BEAKERX_BASIC_AUTH_PASSWORD"])
    # logging.error(os.environ["BEAKERX_FLASK_SERVER_PORT"])
    # logging.error("load_jupyter_server_extension end2")
