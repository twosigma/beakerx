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

'''Installs BeakerX into a Jupyter and Python environment.'''

import argparse
import json
import os
import pkg_resources
import shutil
import subprocess
import sys
import pathlib
import tempfile

from string import Template
from jupyter_client.kernelspecapp import KernelSpecManager
from jupyter_core import paths
from traitlets.config.manager import BaseJSONConfigManager
from distutils import log

ipython_config_str="""\
from contextlib import suppress
with suppress(Exception): import beakerx_config
""".strip()

beakerx_config_str="""\
c = get_config()
c.InteractiveShellApp.extensions = [
'beakerx.autotranslation',
'beakerx_magics.kernel_magic',
'beakerx_magics.groovy_magic',
'beakerx_magics.clojure_magic',
'beakerx_magics.kotlin_magic',
'beakerx_magics.scala_magic',
'beakerx_magics.sql_magic',
'beakerx_magics.java_magic'
]
""".strip()

def _all_kernels():
    kernels = pkg_resources.resource_listdir(
        'beakerx', 'kernel')
    return [kernel for kernel in kernels if (kernel != 'base' and kernel !='sparkex')]


def _base_classpath_for(kernel):
    return pkg_resources.resource_filename(
        'beakerx', os.path.join('kernel', kernel))


def _classpath_for(kernel):
    return pkg_resources.resource_filename(
        'beakerx', os.path.join('kernel', kernel, 'lib', '*'))


def _uninstall_nbextension():
    subprocess.check_call(["jupyter", "nbextension", "disable", "beakerx", "--py", "--sys-prefix"])
    subprocess.check_call(["jupyter", "nbextension", "uninstall", "beakerx", "--py", "--sys-prefix"])
    subprocess.check_call(["jupyter", "serverextension", "disable", "beakerx", "--py", "--sys-prefix"])


def _install_nbextension():
    if sys.platform == 'win32':
        subprocess.check_call(["jupyter", "nbextension", "install", "beakerx", "--py", "--sys-prefix"])
    else:
        subprocess.check_call(["jupyter", "nbextension", "install", "beakerx", "--py", "--symlink", "--sys-prefix"])

    subprocess.check_call(["jupyter", "nbextension", "enable", "beakerx", "--py", "--sys-prefix"])

    subprocess.check_call(["jupyter", "serverextension", "enable", "beakerx", "--py", "--sys-prefix"])


def _install_labextensions(lab):
    if lab:
        subprocess.check_call(["jupyter", "labextension", "install", "@jupyter-widgets/jupyterlab-manager"])
        subprocess.check_call(["jupyter", "labextension", "install", "beakerx-jupyterlab"])


def _uninstall_labextensions(lab):
    if lab:
        subprocess.check_call(["jupyter", "labextension", "uninstall", "beakerx-jupyterlab"])
        subprocess.check_call(["jupyter", "labextension", "uninstall", "@jupyter-widgets/jupyterlab-manager"])


def _copy_tree(src, dst):
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


def _copy_icons():
    log.info("installing icons...")
    kernels = KernelSpecManager().find_kernel_specs()
    for kernel in _all_kernels():
        dst_base = kernels.get(kernel)
        src_base = _base_classpath_for(kernel)
        shutil.copyfile(os.path.join(src_base, 'logo-32x32.png'), os.path.join(dst_base, 'logo-32x32.png'))
        shutil.copyfile(os.path.join(src_base, 'logo-64x64.png'), os.path.join(dst_base, 'logo-64x64.png'))


def _install_css():
    log.info("installing custom CSS...")
    resource = os.path.join('static', 'custom')
    src_base = pkg_resources.resource_filename('beakerx', resource)
    dst_base = pkg_resources.resource_filename('notebook', resource)
    _copy_tree(os.path.join(src_base, 'fonts'), os.path.join(dst_base, 'fonts'))
    shutil.copyfile(os.path.join(src_base, 'custom.css'), os.path.join(dst_base, 'custom.css'))


def _install_kernels():
    base_classpath = _classpath_for('base')

    for kernel in _all_kernels():
        kernel_classpath = _classpath_for(kernel)
        classpath = json.dumps(os.pathsep.join([base_classpath, kernel_classpath]))
        template = pkg_resources.resource_string(
            'beakerx', os.path.join('kernel', kernel, 'kernel.json'))
        contents = Template(template.decode()).substitute(PATH=classpath)

        with tempfile.TemporaryDirectory() as tmpdir:
            kernel_dir = os.path.join(tmpdir, kernel)
            os.mkdir(kernel_dir)
            with open(os.path.join(kernel_dir, 'kernel.json'), 'w') as f:
                f.write(contents)
            install_cmd = [
                'jupyter', 'kernelspec', 'install',
                '--sys-prefix', '--replace',
                '--name', kernel, kernel_dir
            ]
            subprocess.check_call(install_cmd)


def _uninstall_kernels():
    for kernel in _all_kernels():
        uninstall_cmd = [
            'jupyter', 'kernelspec', 'remove', kernel, '-y', '-f'
        ]
        try:
            subprocess.check_call(uninstall_cmd)
        except subprocess.CalledProcessError:
            pass #uninstal_cmd prints the appropriate message


def _install_magics():
    log.info("installing groovy magic for python...")
    dir_path = os.path.join(sys.prefix, 'etc', 'ipython')
    os.makedirs(dir_path, exist_ok=True)
    fn_i=os.path.join(dir_path, 'ipython_config.py')
    if os.path.isfile(fn_i):
        with open(fn_i) as f:
            content=f.read()
        evacuate_file(content, fn_i) #maintenance
    with open(fn_i, 'w+') as ipython_config:
        ipython_config.write(ipython_config_str)
    fn_b=os.path.join(dir_path, 'beakerx_config.py')
    with open(fn_b, 'w+') as beakerx_config:
        beakerx_config.write(beakerx_config_str)

def evacuate_file(config_str, fn):
    with open(fn) as f: content=f.read()
    content = correct_line_break(content).replace(config_str, "")
    with open(fn, 'w') as f: #write replaced
        f.write(content)
                             
def _uninstall_magics():
    log.info("uninstalling beakerx_magics for python...")
    dir_path = os.path.join(sys.prefix, 'etc', 'ipython')
    fn_i=os.path.join(dir_path, 'ipython_config.py')
    if not 'ipython_config.py' in os.listdir(dir_path):
        return #clean
    check_file_empty_and_remove(fn_i)
    evacuate_file(ipython_config_str, fn_i)
    check_file_empty_and_remove(fn_i) #final check if can be removed
    fn_b = os.path.join(dir_path, 'beakerx_config.py')
    evacuate_file(beakerx_config_str, fn_b)
    check_file_empty_and_remove(fn_b)

def check_file_empty_and_remove(fn):
    with open(fn) as f:
        content=f.read()
    if not content: #nothing here? remove!
        os.remove(fn)
    return content

def correct_line_break(c):
    r="c.InteractiveShellApp.extensions = [\n'beakerx.autotranslation',"
    return c.replace(r.replace("\n", ""), r)    
    
def _set_conf_privileges():
    config_path = os.path.join(paths.jupyter_config_dir(), 'beakerx.json')
    if pathlib.Path(config_path).exists():
        os.chmod(config_path, 0o600)


def _pretty(it):
    return json.dumps(it, indent=2)


def _install_kernelspec_manager(prefix, disable=False):
    CKSM = "beakerx.kernel_spec.BeakerXKernelSpec"
    KSMC = "kernel_spec_class"

    action_prefix = "Dis" if disable else "En"
    log.info("{}abling BeakerX server config...".format(action_prefix))
    path = os.path.join(prefix, "etc", "jupyter")
    if not os.path.exists(path):
        log.debug("Making directory {}...".format(path))
        os.makedirs(path)
    cm = BaseJSONConfigManager(config_dir=path)
    cfg = cm.get("jupyter_notebook_config")
    log.debug("Existing config in {}...\n{}".format(path, _pretty(cfg)))
    nb_app = cfg.setdefault("KernelSpecManager", {})
    if disable and nb_app.get(KSMC, None) == CKSM:
        nb_app.pop(KSMC)
    elif not disable:
        nb_app.update({KSMC: CKSM})

    log.debug("Writing config in {}...".format(path))
    cm.set("jupyter_notebook_config", cfg)
    cfg = cm.get("jupyter_notebook_config")

    log.debug("Verifying config in {}...\n{}".format(path, _pretty(cfg)))
    if disable:
        assert KSMC not in cfg["KernelSpecManager"]
    else:
        assert cfg["KernelSpecManager"][KSMC] == CKSM

    log.info("{}abled BeakerX server config".format(action_prefix))


def make_parser():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prefix",
                        help="location of the environment to install into",
                        default=sys.prefix)
    parser.add_argument("--disable",
                        help="Remove Beakerx extension",
                        action='store_true')
    return parser


def _disable_beakerx(args):
    _uninstall_nbextension()
    _uninstall_labextensions(args.lab)
    _uninstall_kernels()
    _install_kernelspec_manager(args.prefix, disable=True)
    _uninstall_magics()


def _install_beakerx(args):
    _install_nbextension()
    _install_labextensions(args.lab)
    _install_kernels()
    _install_css()
    _copy_icons()
    _install_kernelspec_manager(args.prefix)
    _install_magics()
    _set_conf_privileges()


def install(args):
    _install_beakerx(args)

def uninstall(args):
    _disable_beakerx(args)


if __name__ == "__main__":
    install()
