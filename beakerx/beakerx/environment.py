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
    base_var_name = 'beakerx_java_arg'

    @staticmethod
    def read_beakerx_env_settings():
        base_var_name = EnvironmentSettings.base_var_name
        args = []

        var_name = base_var_name
        n = 1
        while True:
            if var_name in environ:
                args.append(environ[var_name])
            else:
                break

            var_name = base_var_name + str(n)
            n += 1
        return args

    @staticmethod
    def set_beakerx_env_settings(jvm_settings):
        EnvironmentSettings.clear_beakerx_env_setting()
        base_var_name = EnvironmentSettings.base_var_name

        n = 1
        var_name = base_var_name
        for x in jvm_settings:
            environ[var_name] = x
            var_name = base_var_name + str(n)
            n += 1

    @staticmethod
    def clear_beakerx_env_setting():
        for x in environ:
            if x.startswith(EnvironmentSettings.base_var_name):
                del environ[x]
