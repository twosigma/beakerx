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

from os import environ, path, fdopen, makedirs, O_RDWR, O_CREAT, O_TRUNC, open as osopen
from jupyter_core import paths
import json
import pathlib

default_config = """
{
    "beakerx": {
        "version": 2,
        "jvm_options": {
            "heap_GB": null,
            "other": [],
            "properties": {}
        },
        "ui_options": {
            "auto_close": true,
            "improve_fonts": true,
            "wide_cells": true,
            "show_publication": true,
            "auto_save": true,
            "use_data_grid": true,
            "show_catalog": false
        },
        "spark_options":{}
    }
}
"""


class EnvironmentSettings:
    def __init__(self):
        pass

    config_path = path.join(paths.jupyter_config_dir(), 'beakerx.json')

    @staticmethod
    def save_setting_to_file(content):
        makedirs(paths.jupyter_config_dir(), exist_ok=True)
        with fdopen(osopen(EnvironmentSettings.config_path, O_RDWR | O_CREAT, 0o600), 'w+') as file:
            file_content = file.read()
            new_settings = json.loads(content)
            if file_content:
                saved_settings = json.loads(file_content)
                file.seek(0)
                file.truncate()
                for setting_name in new_settings['beakerx']:
                    saved_settings['beakerx'][setting_name] = new_settings['beakerx'][setting_name]
            else:
                saved_settings = new_settings
            file.write(json.dumps(saved_settings, indent=4, sort_keys=True))

    @staticmethod
    def read_setting_from_file():
        try:
            file = open(EnvironmentSettings.config_path, 'r')
            content = file.read()
            beakerx_settings = json.loads(content)
            if beakerx_settings['beakerx'].get('version') is None:
                content = EnvironmentSettings._convert_to_version_2(beakerx_settings)
        except IOError:
            content = default_config
            EnvironmentSettings.save_setting_to_file(default_config)
        except ValueError as ex:
            print ('Error while parsing beakerx.json: ', ex)
            content = default_config
        else:
            file.close()

        return content

    @staticmethod
    def _convert_to_version_2(beakerx_settings):
        settings = beakerx_settings['beakerx']['jvm_options']
        new_prop = []
        for x in settings['properties']:
            prop = {
                'name': x,
                'value': settings['properties'][x]
            }
            new_prop.append(prop)
        settings['properties'] = new_prop
        if settings.get('heap_GB'):
            settings['heap_GB'] = float(settings['heap_GB'])
        content = json.dumps(beakerx_settings)
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
                name = x.get('name')
                value = x.get('value')
                value = '-D' + name + '=' + value
                args.append(value)

            if 'heap_GB' in jvm_settings and jvm_settings['heap_GB']:
                val = float(jvm_settings['heap_GB'])
                if val.is_integer():
                    value = '-Xmx' + str(int(val)) + 'g'
                else:
                    value = '-Xmx' + str(int(val * 1024)) + 'm'
                args.append(value)

        return args
