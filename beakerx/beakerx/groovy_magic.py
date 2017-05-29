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

from IPython.core.magic import (Magics, magics_class,cell_magic)
from jupyter_client import manager
from ipykernel.kernelbase import Kernel
from IPython import get_ipython

@magics_class
class GroovyMagics(Magics,Kernel):
    _execution_count = 1

    def run_cell(self, code):

        if not self.KernelManager.is_alive():
            Kernel.send_response(Kernel.iopub_socket, 'stream',
                                 {'name': 'stdout', 'text': 'Restarting kernel "{}"\n'.format(self.KernelManager)})
            self.KernelManager.restart_kernel(now=False)
            self.KernelClient = self.KernelManager.client()
        while self.KernelClient.shell_channel.msg_ready():
            self.KernelClient.shell_channel.get_msg()
        self.KernelClient.execute(code, silent=False)


        _execution_state = "busy"
        while _execution_state != 'idle':
            while self.KernelClient.iopub_channel.msg_ready():
                sub_msg = self.KernelClient.iopub_channel.get_msg()
                msg_type = sub_msg['header']['msg_type']
                if msg_type == 'status':
                    _execution_state = sub_msg["content"]["execution_state"]
                else:
                    if msg_type in ('execute_result'):
                        self.output_bytes = sub_msg['content']['data']['text/plain']

        return self.output_bytes

    @cell_magic
    def groovy(self, line, cell):
        self.KernelManager, self.KernelClient = manager.start_new_kernel(startup_timeout=60, kernel_name='groovy')
        return self.run_cell(cell)


if __name__ == '__main__':
    ip = get_ipython()
    ip.register_magics(GroovyMagics)
