#!/usr/bin/env python
# coding: utf-8

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

import os
from setuptools import setup, find_packages

from setupbase import (
    get_version
)

setup_args = dict(
    name='beakerx_all',
    description='BeakerX: Beaker Extensions for Jupyter Notebook',
    long_description='BeakerX: Beaker Extensions for Jupyter Notebook',
    version=get_version(os.path.join('beakerx_all', '_version.py')),
    author='Two Sigma Open Source, LLC',
    author_email='beakerx-feedback@twosigma.com',
    url='http://beakerx.com',
    keywords=[
        'ipython',
        'jupyter',
        'widgets',
        'java',
        'clojure',
        'groovy',
        'scala',
        'kotlin',
        'sql',
    ],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Framework :: IPython',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Topic :: Multimedia :: Graphics',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    install_requires=[
        'beakerx_base>=2.0.1',
        'beakerx_kernel_groovy>=2.0.0',
        'beakerx_kernel_java>=2.0.0',
        'beakerx_kernel_scala>=2.0.0',
        'beakerx_kernel_sql>=2.0.0',
        'beakerx_kernel_clojure>=2.0.0',
        'beakerx_kernel_kotlin>=2.0.0',
        'beakerx_kernel_autotranslation>=2.0.0',
        'beakerx_tabledisplay>=2.0.1',
        'beakerx_widgets>=2.0.1',
    ],
    python_requires='>=3',
    zip_safe=False,
    include_package_data=True,
    packages=find_packages()
)

if __name__ == '__main__':
    setup(**setup_args)
