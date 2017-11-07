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

from os import environ, path
from jupyter_core import paths
import json

default_config = """
{
    "beakerx": {
        "jvm_options": {
            "heap_GB": "",
            "other": [],
            "properties": {}
        }
    }
}
"""


class EnvironmentSettings:
    def __init__(self):
        pass

    config_path = path.join(paths.jupyter_config_dir(), 'beakerx.json')

    @staticmethod
    def save_setting_to_file(content):
        file = open(EnvironmentSettings.config_path, 'w+')
        file.write(json.dumps(json.loads(content), indent=4, sort_keys=True))
        file.close()

    @staticmethod
    def read_setting_from_file():
        try:
            file = open(EnvironmentSettings.config_path, 'r')
            content = file.read()
        except IOError:
            content = default_config
            EnvironmentSettings.save_setting_to_file(default_config)
        else:
            file.close()

        return content

    @staticmethod
    def read_beakerx_env_settings():
        args = []

        settings = json.loads(EnvironmentSettings.read_setting_from_file())
        beakerx_settings = settings['beakerx']
        if 'jvm_options' in beakerx_settings:
            jvm_settings = beakerx_settings['jvm_options']
            for x in jvm_settings['other']:
                args.append(x)

            for x in jvm_settings['properties']:
                value = '-D' + x + '=' + jvm_settings['properties'][x]
                args.append(value)

            if 'heap_GB' in jvm_settings and jvm_settings['heap_GB']:
                val = float(jvm_settings['heap_GB'])
                if val.is_integer():
                    value = '-Xmx' + jvm_settings['heap_GB'] + 'g'
                else:
                    value = '-Xmx' + str(int(val * 1024)) + 'm'
                args.append(value)

        return args
