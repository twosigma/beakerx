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

from IPython import get_ipython
import logging

def comm_msg(stream, ident, msg):
    content = msg['content']
    comm_id = content['comm_id']
    comm_manager = get_ipython().kernel.comm_manager
    comm = comm_manager.comms.get('comm_id')
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
    ipython.kernel.shell_handlers['comm_msg'] = comm_msg
