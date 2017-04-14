from setuptools import setup

setup_args = dict(
    name                    = 'beaker',
    description             = 'BeakerX runtime for Python',
    long_description        = 'BeakerX runtime for Python',
    version                 = '0.1.0',
    author                  = 'Two Sigma Open Source, LLC',
    author_email            = 'beaker-feedback@twosigma.com',
    url                     = 'http://beakernotebook.com',
    license                 = 'BSD',
    platforms               = "Linux, Mac OS X, Windows",
    keywords                = ['ipython', 'jupyter', 'extension', 'widgets', 'beaker'],
    include_package_data    = True,
    packages                = ['beaker'],
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
