from py4j.clientserver import ClientServer, JavaParameters, PythonParameters
from queue import Empty
from jupyter_client.manager import KernelManager
import json


class PythonMagic:

    def __init__(self):
        self.km = None
        self.kc = None
        self.comms = []

    def start(self):
        self.km = KernelManager()
        self.km.kernel_name = 'python3'
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


class PythonEntryPoint(object):

    def __init__(self):
        self.pm = PythonMagic()

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

    class Java:
        implements = ["com.twosigma.beakerx.kernel.PythonEntryPoint"]


pep = PythonEntryPoint()
gateway = ClientServer(
    java_parameters=JavaParameters(),
    python_parameters=PythonParameters(),
    python_server_entry_point=pep)
