#!/usr/bin/env python
# coding: utf-8

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


import os
import sys


from setupbase_jp import (
    create_cmdclass, BaseCommand,
    combine_commands,
    install_npm,
    run,
    get_version,
    HERE,
)


root = os.path.abspath(os.path.join(HERE, os.pardir))
kernel_path = os.path.join(root, 'kernel')
node_modules = os.path.join(HERE, 'js', 'node_modules')
node_modules_path = ':'.join([
    os.path.join(node_modules, '.bin'),
    os.environ.get('PATH', os.defpath),
])  


def install_gradle(path=kernel_path, cmd='build'):
    """Return a Command for running gradle scripts.

    Parameters
    ----------
    path: str, optional
        The base path of the node package.  Defaults to the repo root.
    cmd: str, optional
        The command to run with gradlew.
    """

    class Gradle(BaseCommand):
        description = 'Run gradle script'

        def run(self):
            gw_path = os.path.join(path, 'gradlew')
            run([gw_path, '--no-daemon', cmd], cwd=path)

    return Gradle


def get_cmdclass():
    data_files_spec = [
        ('share/jupyter/nbextensions/beakerx', 'beakerx', '**')
    ]
    
    package_data_spec = {
        'beakerx': [
            'kernel/*/kernel.json',
        ]
    }
    
    cmdclass = create_cmdclass('beakerxdeps', data_files_spec=data_files_spec,
        package_data_spec=package_data_spec)

    cmd_js = install_npm(
        path='../js/notebook',
        build_dir=os.path.join(HERE, '../js/notebook', 'dist'),
        source_dir=os.path.join(HERE, '../js/notebook', 'src')
    )

    cmd_java = install_gradle(cmd='build')
    cmd_javadoc = install_gradle(cmd='base:javadoc')

    cmdclass['beakerxdeps'] = combine_commands(
        cmd_js, cmd_java, cmd_javadoc
    )

    return cmdclass

