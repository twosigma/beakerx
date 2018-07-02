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
from ipykernel.zmqshell import ZMQInteractiveShell
import atexit
import base64
import json
import logging
import os

@magics_class
class KernelMagics(Magics):
    _execution_count = 1

    def stop_kernel(self):
        self.kc.stop_channels()
        self.km.shutdown_kernel(now=True)

    def __init__(self, shell):
        super(KernelMagics, self).__init__(shell)
        self.km = None
        self.kc = None
        self.comms = []

    def start(self, kernel_name):
        self.km = KernelManager()
        self.km.kernel_name = kernel_name
        self.km.start_kernel(extra_arguments=[self._context_base64()])
        atexit.register(self.stop_kernel)
        self.kc = self.km.client()
        self.kc.start_channels()
        try:
            self.kc.wait_for_ready()
            print("{} started successfully\n".format(kernel_name.capitalize()))
        except AttributeError:
            self._wait_for_ready_backport()

    def run_cell(self, line, code):
        if not self.km:
            self.start()
        self.kc.execute(code, allow_stdin=True)
        reply = self.kc.get_shell_msg()
        self._handle_iopub_messages()

    def _handle_iopub_messages(self):
        while True:
            try:
                msg = self.kc.get_iopub_msg(timeout=1)
            except Empty:
                break
            comm_id = msg['content'].get('comm_id')
            if comm_id and comm_id not in self.comms:
                self.comms.append(comm_id)
            self.shell.kernel.session.send(self.shell.kernel.iopub_socket, msg['msg_type'],
                                           msg['content'],
                                           metadata=msg['metadata'],
                                           parent=self.shell.kernel._parent_header,
                                           ident=msg.get('comm_id'),
                                           buffers=msg['buffers'],
                                           )

    def pass_message(self, msg_raw):
        comm_id = msg_raw['content'].get('comm_id')
        if comm_id in self.comms:
            content = msg_raw['content']
            msg = self.kc.session.msg(msg_raw['msg_type'], content)
            self.kc.shell_channel.send(msg)
            self._handle_iopub_messages()
        else:
            self.log.warn("No such comm: %s", comm_id)
            if self.log.isEnabledFor(logging.DEBUG):
                # don't create the list of keys if debug messages aren't enabled
                self.log.debug("Current comms: %s", list(self.comms.keys()))

    def _context_base64(self):
        context_json = json.dumps({
            'port': os.environ["BEAKERX_AUTOTRANSLATION_PORT"],
            'contextId': get_ipython().kernel.session.session,
        })
        return base64.b64encode(context_json.encode('utf-8')).decode()


def comm_msg(stream, ident, msg):
    content = msg['content']
    comm_id = content['comm_id']
    comm_manager = get_ipython().kernel.comm_manager
    comm = comm_manager.comms.get(comm_id)
    if comm is None:
        magic_registry = comm_manager.kernel.shell.magics_manager.registry
        for magic in magic_registry.values():
            if (hasattr(magic, 'pass_message') and comm_id in magic.comms):
                try:
                    magic.pass_message(msg)
                    return
                except Exception:
                    comm_manager.log.error('Exception in comm_msg for %s', comm_id, exc_info=True)
        comm_manager.log.warn("No such comm: %s", comm_id)
        if comm_manager.log.isEnabledFor(logging.DEBUG):
            comm_manager.log.debug("Current comms: %s", list(comm_manager.comms.keys()))
    else:
        try:
            comm.handle_msg(msg)
        except Exception:
            comm_manager.log.error('Exception in comm_msg for %s', comm_id, exc_info=True)


def load_ipython_extension(ipython):
    if isinstance(ipython, ZMQInteractiveShell):
        ipython.kernel.shell_handlers['comm_msg'] = comm_msg