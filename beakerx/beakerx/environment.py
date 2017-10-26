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

from os import environ, putenv, getenv


class EnvironmentSettings:
    suffix_other = '_other_'
    suffix_java = '_java_'
    _base_var_name = 'beakerx_java_arg'
    other_var_name = _base_var_name + suffix_other
    java_var_name = _base_var_name + suffix_java

    @staticmethod
    def read_beakerx_env_map_settings(suffix=""):
        args = {}

        for x in environ:
            if x.startswith(EnvironmentSettings._base_var_name + suffix):
                args[x] = environ[x]

        return args

    @staticmethod
    def read_beakerx_env_settings(suffix=""):
        args = []

        for x in environ:
            if x.startswith(EnvironmentSettings._base_var_name + suffix):
                args.append(environ[x])

        return args

    @staticmethod
    def set_beakerx_env_settings(jvm_settings):
        EnvironmentSettings.clear_beakerx_env_setting()
        other_var_name = EnvironmentSettings.other_var_name

        n = 1
        var_name = other_var_name
        for x in jvm_settings['other']:
            environ[var_name] = x
            var_name = other_var_name + str(n)
            n += 1

        for x in jvm_settings['jvm']:
            var_name = EnvironmentSettings.java_var_name + str(x)
            value = x + jvm_settings['jvm'][x]
            if x == "-Xmx":
                value += "g"
            environ[var_name] = value

    @staticmethod
    def clear_beakerx_env_setting():
        for x in environ:
            if x.startswith(EnvironmentSettings._base_var_name):
                del environ[x]
