#!/bin/bash
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

set -ex
source activate beakerx
(cd beakerx; pip install -r requirements.txt --verbose)
beakerx install
beakerx_databrowser install
jupyter labextension install @jupyter-widgets/jupyterlab-manager
(cd js/lab; jupyter labextension install .)

rm -rf docker .DS_Store .git .gradle .idea jitpack.yml kernel RELEASE.md test .cache .yarn .local logs .ipynb_checkpoints
