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

from beakerx_base import BeakerxBox
from traitlets import Unicode

class SparkUI2(BeakerxBox):
    _view_name = Unicode('SparkUI2View').tag(sync=True)
    _model_name = Unicode('SparkUI2Model').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)

    def __init__(self, **kwargs):
        super(SparkUI2, self).__init__(**kwargs)
        self.on_msg(self.handle_msg)

    def handle_msg(self, _, content, buffers):
        print(content)