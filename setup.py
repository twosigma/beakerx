# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

from setuptools import setup

setup_args = dict(
    name                    = 'beaker',
    description             = 'BeakerX runtime for Python',
    long_description        = 'BeakerX runtime for Python',
    version                 = '0.1.0',
    author                  = 'Two Sigma Open Source, LLC',
    author_email            = 'beaker-feedback@twosigma.com',
    url                     = 'http://beakernotebook.com',
    license                 = 'apache2',
    platforms               = "Linux, Mac OS X, Windows",
    keywords                = ['ipython', 'jupyter', 'extension', 'widgets', 'beaker'],
    include_package_data    = True,
    packages                = ['beaker', 'beaker.plot'],
    classifiers             = [
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
    install_requires        = [
        'notebook>=4.3.0',
        'ipython>=1.0.0'
    ]
)

if __name__ == '__main__':
    setup(**setup_args)
