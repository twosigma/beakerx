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

from jupyter_client.kernelspec import KernelSpec
from os import environ

class BeakerXKernelSpec(KernelSpec):
    def __init__(self, **kw):
        super(BeakerXKernelSpec, self).__init__(**kw)
        clean_name = self.display_name.lower().replace(' ', '')
        base_var_name = 'beakerx_' + clean_name + '_java_arg'
        if base_var_name in environ:
            args = [environ[base_var_name]]
            n = 2
            while True:
                var_name = base_var_name + str(n)
                if var_name in environ:
                    args.append(environ[var_name])
                else:
                    break
                n += 1
            self.argv[1:1] = args
