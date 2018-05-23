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
from IPython.core.magic import (magics_class, cell_magic)
from .kernel_magic import KernelMagics
from ipykernel.zmqshell import ZMQInteractiveShell


@magics_class
class ClojureMagics(KernelMagics):

    def __init__(self, shell):
        super(ClojureMagics, self).__init__(shell)

    def start(self):
        super(ClojureMagics, self).start('clojure')

    @cell_magic
    def clojure(self, line, cell):
        return self.run_cell(line, cell)


def load_ipython_extension(ipython):
    if isinstance(ipython, ZMQInteractiveShell):
        ipython.register_magics(ClojureMagics)


if __name__ == '__main__':
    ip = get_ipython()
    ip.register_magics(ClojureMagics)
