# Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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

import json
import os
from pathlib import Path


class BeakerxJson:

    @staticmethod
    def _getPathToBeakerxJson():
        if "JUPYTER_CONFIG_DIR" in os.environ:
            path_to_beakerx_json = os.environ['JUPYTER_CONFIG_DIR']
        else:
            path_to_beakerx_json = str(Path.home()) + os.path.sep + ".jupyter"
        return path_to_beakerx_json + os.path.sep + "beakerx.json"


class Profile:
    ERR = None

    def __init__(self, path_to_beakerx_json=BeakerxJson._getPathToBeakerxJson()):
        self.path_to_beakerx_json = path_to_beakerx_json

    def save(self, profile_to_save):
        result, err = self.load_beakerx_json()
        result["beakerx"]["spark_options"]["profiles"] = profile_to_save
        with open(self.path_to_beakerx_json, 'w') as outfile:
            self._dump(outfile, result)
        return True, Profile.ERR

    def load_beakerx_json(self):
        with open(self.path_to_beakerx_json) as json_file:
            data = json.load(json_file)
        return data, Profile.ERR

    def load_profiles(self):
        with open(self.path_to_beakerx_json) as json_file:
            data = json.load(json_file)
        return data["beakerx"]["spark_options"], Profile.ERR

    def save_current_profile(self, current_profile):
        result, err = self.load_beakerx_json()
        result["beakerx"]["spark_options"]["current_profile"] = current_profile
        with open(self.path_to_beakerx_json, 'w') as outfile:
            self._dump(outfile, result)
        return True, Profile.ERR

    def _dump(self, outfile, result):
        json.dump(result, outfile, indent=2, sort_keys=True)
