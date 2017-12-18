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

from queue import Empty
from IPython import get_ipython
from IPython.core.magic import (Magics, magics_class, cell_magic)
from jupyter_client.manager import KernelManager


@magics_class
class GroovyMagics(Magics):
    _execution_count = 1

    def __init__(self, shell):
        super(GroovyMagics, self).__init__(shell)
        self.km = KernelManager()
        self.km.kernel_name = 'groovy'
        self.km.start_kernel()
        self.kc = self.km.client()
        self.kc.start_channels()
        try:
            self.kc.wait_for_ready()
            print("Groovy started successfully\n")
        except AttributeError:
            self._wait_for_ready_backport()

    def __del__(self):
        self.kc.stop_channels()
        self.km.shutdown_kernel(now=True)

    def run_cell(self, line, code):
        self.kc.execute(code, allow_stdin=True)
        reply = self.kc.get_shell_msg()

        while True:
            try:
                msg = self.kc.get_iopub_msg(timeout=1)
                if msg['msg_type'] == 'status':
                    if msg['content']['execution_state'] == 'idle':
                        break
            except Empty:
                print("empty ?!")
                raise
            self.shell.kernel.session.send(self.shell.kernel.iopub_socket, msg['msg_type'],
                                           msg['content'],
                                           metadata=msg['metadata'],
                                           parent=self.shell.kernel._parent_header,
                                           ident=msg.get('comm_id'),
                                           buffers=msg['buffers'],
                                           )

    @cell_magic
    def groovy(self, line, cell):
        return self.run_cell(line, cell)

def load_ipython_extension(ipython):
    ipython.register_magics(GroovyMagics)

if __name__ == '__main__':
    ip = get_ipython()
    ip.register_magics(GroovyMagics)
