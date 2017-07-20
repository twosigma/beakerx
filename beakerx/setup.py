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
# from setuptools.command.build_py import build_py
from setuptools.command.develop import develop
from setuptools.command.sdist import sdist
from setuptools.command.bdist_egg import bdist_egg
from setupbase import (
    create_cmdclass,
    install_node_modules, 
    update_kernelspec_class,
    install_kernels,
    copy_files, 
    run_gradle, 
    get_version,
    get_data_files,
    here
)
import os
from os.path import join as pjoin


cmdclass = create_cmdclass([
    'js',
    'java',
    'kernels',
    'kernelspec_class',
    'custom_css'
])
cmdclass['js'] = install_node_modules(
    path='js', 
    build_dir=pjoin(here, 'js', 'dist'),
    source_dir=pjoin(here, 'js', 'src')
)
cmdclass['java'] = run_gradle(cmd='build')
cmdclass['kernels'] = install_kernels(pjoin(os.environ['CONDA_PREFIX'], 'lib', 'python3.5', 'site-packages', 'beakerx', 'static', 'kernel'))
cmdclass['kernelspec_class'] = update_kernelspec_class(prefix=os.environ['CONDA_PREFIX'])
cmdclass['custom_css'] = copy_files(
    src=pjoin(here,  'beakerx', 'static', 'custom'), 
    dest=pjoin(os.environ['CONDA_PREFIX'], 'lib', 'python3.5', 'site-packages', 'notebook', 'static', 'custom')
)

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
    data_files          = [(
        'share/jupyter/nbextensions/beakerx', 
        get_data_files(pjoin('beaker', 'static'))
    )],
    install_requires    = [
        'notebook >=4.3.1',
        'ipywidgets >=5.1.5, <=6.0.0'
    ],
    zip_safe            = False,
    include_package_data= True,
    packages            = find_packages(),
    cmdclass            = cmdclass
)

if __name__ == '__main__':
    setup(**setup_args)
