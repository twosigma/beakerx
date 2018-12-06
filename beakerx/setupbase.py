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

"""
This file originates from the 'jupyter-packaging' package, and
contains a set of useful utilities for installing node modules
within a Python package.
"""

import functools
import os
import pipes
import sys
from distutils import log
from setuptools import Command
from setuptools.command.bdist_egg import bdist_egg
from setuptools.command.develop import develop
from setuptools.command.sdist import sdist
from subprocess import check_call

try:
    from wheel.bdist_wheel import bdist_wheel
except ImportError:
    bdist_wheel = None

if sys.platform == 'win32':
    from subprocess import list2cmdline
else:
    def list2cmdline(cmd_list):
        return ' '.join(map(pipes.quote, cmd_list))

# ---------------------------------------------------------------------------
# Top Level Variables
# ---------------------------------------------------------------------------


here = os.path.abspath(os.path.dirname(sys.argv[0]))
root = os.path.abspath(os.path.join(here, os.pardir))
kernel_path = os.path.join(root, 'kernel')
kernel_source = os.path.join(kernel_path, 'base', 'src', 'main', 'java')
is_repo = os.path.exists(os.path.join(root, '.git'))
node_modules = os.path.join(here, 'js', 'node_modules')
node_modules_path = ':'.join([
    os.path.join(node_modules, '.bin'),
    os.environ.get('PATH', os.defpath),
])

if "--skip-yarn" in sys.argv:
    print("Skipping yarn install as requested.")
    skip_yarn = True
    sys.argv.remove("--skip-yarn")
else:
    skip_yarn = False


# ---------------------------------------------------------------------------
# Public Functions
# ---------------------------------------------------------------------------
def _classpath_for(kernel):
    return pkg_resources.resource_filename(
        'beakerx', os.path.join('kernel', kernel, 'lib', '*'))


def get_version(path):
    version = {}
    with open(os.path.join(here, path)) as f:
        exec (f.read(), {}, version)
    return version['__version__']


def get_data_files(top):
    """Get data files"""

    data_files = []
    ntrim = len(here + os.path.sep)

    for (d, _, filenames) in os.walk(top):
        data_files.append((
            d[ntrim:],
            [os.path.join(d, f) for f in filenames]
        ))
    return data_files


def find_packages(top):
    """
    Find all of the packages.
    """
    packages = []
    for d, dirs, _ in os.walk(top, followlinks=True):
        if os.path.exists(os.path.join(d, '__init__.py')):
            packages.append(os.path.relpath(d, top).replace(os.path.sep, '.'))
        elif d != top:
            # Do not look for packages in subfolders if current is not a package
            dirs[:] = []
    return packages


def update_package_data(distribution):
    """update build_py options to get package_data changes"""
    build_py = distribution.get_command_obj('build_py')
    build_py.finalize_options()


def create_cmdclass(develop_wrappers=None, distribute_wrappers=None, data_dirs=None):
    """Create a command class with the given optional wrappers.
    Parameters
    ----------
    develop_wrapper: list(str), optional
        The cmdclass names to run before running other commands
    distribute_wrappers: list(str), optional
        The cmdclass names to run before running other commands
    data_dirs: list(str), optional.
        The directories containing static data.
    """
    develop_wrappers = develop_wrappers or []
    distribute_wrappers = distribute_wrappers or []
    data_dirs = data_dirs or []
    develop_wrapper = functools.partial(wrap_command, develop_wrappers, data_dirs)
    distribute_wrapper = functools.partial(wrap_command, distribute_wrappers, data_dirs)
    cmdclass = dict(
        develop=develop_wrapper(develop, strict=True),
        sdist=distribute_wrapper(sdist, strict=True),
        bdist_egg=bdist_egg if 'bdist_egg' in sys.argv else bdist_egg_disabled
    )
    if bdist_wheel:
        cmdclass['bdist_wheel'] = bdist_wheel
    return cmdclass


def run(cmd, *args, **kwargs):
    """Echo a command before running it.  Defaults to repo as cwd"""
    log.info('> ' + list2cmdline(cmd))
    kwargs.setdefault('cwd', here)
    kwargs.setdefault('shell', sys.platform == 'win32')
    if not isinstance(cmd, list):
        cmd = cmd.split()
    return check_call(cmd, *args, **kwargs)


def is_stale(target, source):
    """Test whether the target file/directory is stale based on the source
       file/directory.
    """
    if not os.path.exists(target):
        return True
    target_mtime = recursive_mtime(target) or 0
    return compare_recursive_mtime(source, cutoff=target_mtime)


class BaseCommand(Command):
    """Empty command because Command needs subclasses to override too much"""
    user_options = []

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def get_inputs(self):
        return []

    def get_outputs(self):
        return []


def combine_commands(*commands):
    """Return a Command that combines several commands."""

    class CombinedCommand(Command):

        def initialize_options(self):
            self.commands = []
            for C in commands:
                self.commands.append(C(self.distribution))
            for c in self.commands:
                c.initialize_options()

        def finalize_options(self):
            for c in self.commands:
                c.finalize_options()

        def run(self):
            for c in self.commands:
                c.run()

    return CombinedCommand


def compare_recursive_mtime(path, cutoff, newest=True):
    """Compare the newest/oldest mtime for all files in a directory.
    Cutoff should be another mtime to be compared against. If an mtime that is
    newer/older than the cutoff is found it will return True.
    E.g. if newest=True, and a file in path is newer than the cutoff, it will
    return True.
    """
    if os.path.isfile(path):
        mt = mtime(path)
        if newest:
            if mt > cutoff:
                return True
        elif mt < cutoff:
            return True
    for dirname, _, filenames in os.walk(path, topdown=False):
        for filename in filenames:
            mt = mtime(os.path.join(dirname, filename))
            if newest:  # Put outside of loop?
                if mt > cutoff:
                    return True
            elif mt < cutoff:
                return True
    return False


def recursive_mtime(path, newest=True):
    """Gets the newest/oldest mtime for all files in a directory."""
    if os.path.isfile(path):
        return mtime(path)
    current_extreme = None
    for dirname, _, filenames in os.walk(path, topdown=False):
        for filename in filenames:
            mt = mtime(os.path.join(dirname, filename))
            if newest:  # Put outside of loop?
                if mt >= (current_extreme or mt):
                    current_extreme = mt
            elif mt <= (current_extreme or mt):
                current_extreme = mt
    return current_extreme


def mtime(path):
    """shorthand for mtime"""
    return os.stat(path).st_mtime


def install_node_modules(path=None, build_dir=None, source_dir=None, build_cmd='build', force=False):
    """Return a Command for managing an node_modules installation.
    Note: The command is skipped if the `--skip-yarn` flag is used.
    
    Parameters
    ----------
    path: str, optional
        The base path of the node package.  Defaults to the repo root.
    build_dir: str, optional
        The target build directory.  If this and source_dir are given,
        the JavaScript will only be build if necessary.
    source_dir: str, optional
        The source code directory.
    build_cmd: str, optional
        The yarn command to build assets to the build_dir.
    """

    class Yarn(BaseCommand):
        description = 'install package.json dependencies using yarn'

        def run(self):
            if skip_yarn:
                log.info('Skipping yarn-installation')
                return
            node_package = path or here
            node_modules = os.path.join(node_package, 'node_modules')

            if not which("yarn"):
                log.error("`yarn` unavailable.  If you're running this command "
                          "using sudo, make sure `yarn` is availble to sudo")
                return
            if force or is_stale(node_modules, os.path.join(node_package, 'package.json')):
                log.info('Installing build dependencies with yarn.  This may '
                         'take a while...')
                run(['yarn', 'install'], cwd=node_package)
            if build_dir and source_dir and not force:
                should_build = is_stale(build_dir, source_dir)
            else:
                should_build = True
            if should_build:
                run(['yarn', 'run', build_cmd], cwd=node_package)

    return Yarn


def run_gradle(path=kernel_path, cmd='build', skip_tests=False):
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

        def skip_test_option(self, skip):
            if skip:
                return '-Dskip.tests=True'
            else:
                return '-Dskip.tests=False'

        def run(self):
            run([('' if sys.platform == 'win32' else './') + 'gradlew', '--no-daemon', cmd,
                 self.skip_test_option(skip_tests)], cwd=path)

    return Gradle


def ensure_targets(targets):
    """Return a Command that checks that certain files exist.
    Raises a ValueError if any of the files are missing.
    Note: The check is skipped if the `--skip-yarn` flag is used.
    """

    class TargetsCheck(BaseCommand):
        def run(self):
            if skip_yarn:
                log.info('Skipping target checks')
                return
            missing = [t for t in targets if not os.path.exists(t)]
            if missing:
                raise ValueError(('missing files: %s' % missing))

    return TargetsCheck


# `shutils.which` function copied verbatim from the Python-3.3 source.
def which(cmd, mode=os.F_OK | os.X_OK, path=None):
    """Given a command, mode, and a PATH string, return the path which
    conforms to the given mode on the PATH, or None if there is no such
    file.
    `mode` defaults to os.F_OK | os.X_OK. `path` defaults to the result
    of os.environ.get("PATH"), or can be overridden with a custom search
    path.
    """

    # Check that a given file can be accessed with the correct mode.
    # Additionally check that `file` is not a directory, as on Windows
    # directories pass the os.access check.
    def _access_check(fn, mode):
        return (os.path.exists(fn) and os.access(fn, mode) and
                not os.path.isdir(fn))

    # Short circuit. If we're given a full path which matches the mode
    # and it exists, we're done here.
    if _access_check(cmd, mode):
        return cmd

    path = (path or os.environ.get("PATH", os.defpath)).split(os.pathsep)

    if sys.platform == "win32":
        # The current directory takes precedence on Windows.
        if os.curdir not in path:
            os.sys.path.insert(0, os.curdir)

        # PATHEXT is necessary to check on Windows.
        pathext = os.environ.get("PATHEXT", "").split(os.pathsep)
        # See if the given file matches any of the expected path extensions.
        # This will allow us to short circuit when given "python.exe".
        matches = [cmd for ext in pathext if cmd.lower().endswith(ext.lower())]
        # If it does match, only test that one, otherwise we have to try
        # others.
        files = [cmd] if matches else [cmd + ext.lower() for ext in pathext]
    else:
        # On other platforms you don't have things like PATHEXT to tell you
        # what file suffixes are executable, so just pass on cmd as-is.
        files = [cmd]

    seen = set()
    for dir in path:
        dir = os.path.normcase(dir)
        if dir not in seen:
            seen.add(dir)
            for thefile in files:
                name = os.path.join(dir, thefile)
                if _access_check(name, mode):
                    return name
    return None


# ---------------------------------------------------------------------------
# Private Functions
# ---------------------------------------------------------------------------


def wrap_command(cmds, data_dirs, cls, strict=True):
    """Wrap a setup command
    Parameters
    ----------
    cmds: list(str)
        The names of the other commands to run prior to the command.
    strict: boolean, optional
        Wether to raise errors when a pre-command fails.
    """

    class WrappedCommand(cls):

        def run(self):
            if not getattr(self, 'uninstall', None):
                try:
                    [self.run_command(cmd) for cmd in cmds]
                except Exception:
                    if strict:
                        raise
                    else:
                        pass

            result = cls.run(self)
            data_files = []
            for dname in data_dirs:
                data_files.extend(get_data_files(dname))
            # update data-files in case this created new files
            self.distribution.data_files = data_files
            # also update package data
            update_package_data(self.distribution)
            return result

    return WrappedCommand


class bdist_egg_disabled(bdist_egg):
    """Disabled version of bdist_egg
    Prevents setup.py install performing setuptools' default easy_install,
    which it should never ever do.
    """

    def run(self):
        sys.exit("Aborting implicit building of eggs. Use `pip install .` " +
                 " to install from source.")
