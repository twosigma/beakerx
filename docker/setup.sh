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

conda create -y -n beakerx python=3.5 jupyter pandas
source activate beakerx
gradle --no-daemon clean
gradle --no-daemon build
gradle --no-daemon kernelInstall

rm -r /home/beakerx/beakerx/js/node_modules
rm -r /home/beakerx/beakerx/js/dist

gradle --no-daemon :beakerx:install -x test
(cd /home/beakerx/beakerx; pip install -e .)
python -m beakerx.install --enable --prefix="${CONDA_PREFIX}"
