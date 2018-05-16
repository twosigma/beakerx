# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC  #
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

from py4j.clientserver import ClientServer, JavaParameters, PythonParameters
from queue import Empty
from jupyter_client.manager import KernelManager
from jupyter_client.kernelspec import NoSuchKernel
import json
import sys


class JVMKernelMagic:

    def __init__(self, kernel_name):
        self.km = None
        self.kc = None
        self.comms = []
        self.kernel_name = kernel_name
        self.start()

    def start(self):
        self.km = KernelManager()
        self.km.kernel_name = self.kernel_name
        self.km.start_kernel()
        self.kc = self.km.client()
        self.kc.start_channels()
        self.kc.wait_for_ready()

    def stop_kernel(self):
        self.kc.stop_channels()
        self.km.shutdown_kernel(now=True)

    def run_cell(self, code):
        if not self.km:
            self.start()
        self.kc.execute(code, allow_stdin=True)

    def get_shell_msg(self):
        return self.kc.get_shell_msg()

    def get_iopub_msg(self):
        try:
            msg = self.kc.get_iopub_msg(timeout=1)
            return msg
        except Empty:
            return None

    def pass_msg(self, msg_raw):
        msg_json = json.loads(msg_raw)
        content = msg_json['content']
        msg_type = msg_json['header']['msg_type']
        msg = self.kc.session.msg(msg_type, content)
        self.kc.shell_channel.send(msg)
        return None


class PythonEntryPoint(object):

    def __init__(self, kernel_name):
        self.pm = JVMKernelMagic(kernel_name)

    def evaluate(self, code):
        print('code for evaluate {}'.format(code))
        self.pm.run_cell(code)
        return None

    def getShellMsg(self):
        shellMsg = self.pm.get_shell_msg()
        return json.dumps(shellMsg, default=str)

    def getIopubMsg(self):
        iopubMsg = self.pm.get_iopub_msg()
        return json.dumps(iopubMsg, default=str)

    def shutdownKernel(self):
        self.pm.stop_kernel()
        return None

    def sendMessage(self, msg_raw):
        self.pm.pass_msg(msg_raw)
        return None

    class Java:
        implements = ["com.twosigma.beakerx.kernel.PythonEntryPoint"]


class Py4JServer:
    def __init__(self, port, pyport, kernel_name):
        try:
            pep = PythonEntryPoint(kernel_name)
        except NoSuchKernel:
            sys.exit(2)
        ClientServer(
            java_parameters=JavaParameters(port=int(port)),
            python_parameters=PythonParameters(port=int(pyport)),
            python_server_entry_point=pep)
        print('Py4j server is running')


if __name__ == '__main__':
    Py4JServer(sys.argv[1], sys.argv[2], sys.argv[3])
