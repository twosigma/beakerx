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
from traitlets import Unicode

class BeakerXKernelSpec(KernelSpec):
    extra_arg = Unicode("", config=True, help="add this param to jvm kernels")
    def __init__(self, **kw):
        super(BeakerXKernelSpec, self).__init__(**kw)
        print("XXX hacking kernel spec, extra_arg=" + self.extra_arg)
        if self.argv[0] == 'java' and len(self.extra_arg) > 0:
            self.argv[1:1] = [self.extra_arg]
            print(self.to_dict())
