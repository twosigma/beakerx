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

from ipykernel.zmqshell import ZMQInteractiveShell
from beakerx.runtime import autotranslation_update

def on_open_comm_msg(comm, msg):
    comm.on_msg(on_msg_handler)

def on_msg_handler(msg):
    content = msg['content']['data']
    val = content['value']
    var = content['name']
    autotranslation_update(var, val)

def load_ipython_extension(ipython):
    if isinstance(ipython, ZMQInteractiveShell):
        ipython.kernel.comm_manager.register_target('beakerx.autotranslation', on_open_comm_msg)
