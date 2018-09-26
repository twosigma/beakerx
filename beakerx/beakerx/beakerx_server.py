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

import socket
import zmq
import threading


class BeakerxZMQServer:

    def __init__(self, beakerXQueue):
        self.queue = beakerXQueue
        self.url = "tcp://127.0.0.1:" + BeakerxZMQServer.get_free_tcp_port()
        thread = threading.Thread(target=self.threaded_function, daemon=True)
        thread.start()

    def threaded_function(self):
        context = zmq.Context()
        socket = context.socket(zmq.REP)
        socket.bind(self.url)
        while True:
            message = socket.recv()
            self.queue.put(message)
            socket.send_string("Ok")

    @staticmethod
    def get_free_tcp_port():
        tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        tcp.bind(('localhost', 0))
        addr, port = tcp.getsockname()
        tcp.close()
        return str(port)
