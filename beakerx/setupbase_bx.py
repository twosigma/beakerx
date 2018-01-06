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
    install_node_modules,
    run,
    get_version,
    get_data_files,
    here,
    kernel_path
)


def run_gradle(path=kernel_path, cmd='build'):
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
            run([('' if sys.platform == 'win32' else './') + 'gradlew', '--no-daemon', cmd], cwd=path)

    return Gradle


def get_cmdclass():
    cmdclass = create_cmdclass(develop_wrappers=[
        'js',
        'java',
        'javadoc',
    ], distribute_wrappers=[
        'js',
        'java',
        'javadoc',
    ])

    cmdclass['js'] = install_node_modules(
        path='../js/notebook',
        build_dir=os.path.join(here, '../js/notebook', 'dist'),
        source_dir=os.path.join(here, '../js/notebook', 'src')
    )
    cmdclass['java'] = run_gradle(cmd='build')
    cmdclass['javadoc'] = run_gradle(cmd='base:javadoc')

    return cmdclass

