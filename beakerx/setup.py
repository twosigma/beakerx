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

from setuptools import setup, find_packages
from setupbase import create_cmdclass, install_node_modules, install_nb_conda_kernels, run_gradle, get_version
import os
from os.path import join as pjoin


cmdclass = create_cmdclass([
    'js',
    'nb_conda_kernels',
    'java',
    'kernels',
])
cmdclass['js'] = install_node_modules(
    path=pjoin('js'), 
    build_dir=pjoin('js', 'dist'),
    source_dir=pjoin('js', 'src')
)
cmdclass['nb_conda_kernels'] = install_nb_conda_kernels(enable=True, prefix=os.environ['CONDA_PREFIX'])
cmdclass['java'] = run_gradle(cmd='build')
cmdclass['kernels'] = run_gradle(cmd='kernelInstall')

setup_args = dict(
    name                = 'beakerx',
    description         = 'BeakerX: Beaker Extensions for Jupyter Notebook',
    long_description    = 'BeakerX: Beaker Extensions for Jupyter Notebook',
    version             = get_version(pjoin('beakerx', '_version.py')),
    author              = 'Two Sigma Open Source, LLC',
    author_email        = 'beaker-feedback@twosigma.com',
    url                 = 'http://beakernotebook.com',
    keywords            = [
        'ipython',
        'jupyter',
        'widgets',
    ],
    classifiers         = [
        'Development Status :: 4 - Beta',
        'Framework :: IPython',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Topic :: Multimedia :: Graphics',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
    include_package_data= True,
    packages            = find_packages(),
    data_files          = [
        ('share/jupyter/nbextensions/beakerx', [
            'beakerx/static/extension.js',
            'beakerx/static/index.js',
            'beakerx/static/index.js.map',
        ]),
    ],
    install_requires    = [
        'ipywidgets >=5.1.5, <=6.0.0'
    ],
    zip_safe            = False,
    cmdclass            = cmdclass,
)

if __name__ == '__main__':
    setup(**setup_args)
