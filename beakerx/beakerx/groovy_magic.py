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
from nbformat import NotebookNode


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
        status = reply['content']['status']

        outs = list()
        while True:
            try:
                msg = self.kc.get_iopub_msg(timeout=1)
                if msg['msg_type'] == 'status':
                    if msg['content']['execution_state'] == 'idle':
                        break
            except Empty:
                print("empty ?!")
                raise

            content = msg['content']
            msg_type = msg['msg_type']

            notebook3_format_conversions = {
                'error': 'pyerr',
                'execute_result': 'pyout'
            }
            msg_type = notebook3_format_conversions.get(msg_type, msg_type)

            out = NotebookNode(output_type=msg_type)

            if msg_type == 'pyout':
                print(content['data']['text/plain'])
                continue
            if msg_type in ('status', 'pyin', 'execute_input'):
                continue
            elif msg_type in ('comm_open', 'comm_msg', 'comm_close'):
                # TODO handle this msg ?!?!?!
                continue
            elif msg_type == 'stream':
                out.stream = content['name']
                if 'text' in content:
                    out.text = content['text']
                else:
                    out.text = content['data']
            elif msg_type in ('display_data', 'pyout'):
                for mime, data in content['data'].items():
                    try:
                        attr = self.MIME_MAP[mime]
                    except KeyError:
                        print("unhandled mime")
                        raise NotImplementedError('unhandled mime type: %s' %
                                                  mime)

                    setattr(out, attr, data)
            elif msg_type == 'pyerr':
                out.ename = content['ename']
                out.evalue = content['evalue']
                out.traceback = content['traceback']
            elif msg_type == 'clear_output':
                outs = list()
                continue
            else:
                print("unhandled " + msg_type)
                raise NotImplementedError('unhandled iopub message: %s' %
                                          msg_type)
            outs.append(out)
            # NOTE: Ver 4 format still have 'pyout', Why?
            # upgrade_outputs(outs)

            print(str(outs))
            print("status: {}".format(status))

    @cell_magic
    def groovy(self, line, cell):
        return self.run_cell(line, cell)


if __name__ == '__main__':
    ip = get_ipython()
    ip.register_magics(GroovyMagics)
