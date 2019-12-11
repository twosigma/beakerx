<!--
    Copyright 2017 TWO SIGMA OPEN SOURCE, LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
-->

Making a BeakerX release
===========================

This document guides a contributor through creating a release of BeakerX.

Install
-------

Review ``README.md`` and make sure that all dependencies are installed.


Create the release
------------------

Update the version in `beakerx/beakerx/_version.py` and
`js/notebook/package.json` and `js/lab/package.json`.  Commit
the change and push the git tag:

```bash
git commit -a -m 'version $version'
git push
git tag $version
git push origin $version
```

Make a source archive of the package:
```bash
git clean -xfd
cd beakerx
python setup.py sdist
```

Make a test installation with pip into a fresh environment, if it works then continue with:
```
pip install twine
twine upload dist/*
# get the sha256 hash for conda-forge install
shasum -a 256 dist/*.tar.gz
```

Publish on conda-forge
----------------------

Update the feedstock repo:

```
git clone https://github.com/twosigma/beakerx-feedstock.git
cd beakerx-feedstock
git remote add upstream https://github.com/conda-forge/beakerx-feedstock.git
git fetch upstream
git reset --hard upstream/master
git push origin master --force
```
- Update the `version` and `sha256` variable values in `recipe/meta.yaml`.
  Return  build number to 1.

Then test it locally:

```
# outside of beakerx conda environment
conda install conda-build
conda upgrade conda
conda upgrade conda-build
# inside of beakerx env and beakerx project root
conda build --python 3.5 PATH_TO_RECIPE
# conda-build will output something like `anaconda upload PATH_TO_beakerx-VERSION-py35HASH.tar.bz2`
conda install --use-local beakerx
```

- Then commit changes and submit a PR upstream to
  https://github.com/conda-forge/beakerx-feedstock for the new
  version.
- Have the CI configs [automatically
  rerendered](https://conda-forge.org/docs/webservice.html#conda-forge-admin-please-rerender).
- After CI passes, merge the PR.


Publish on npmjs
----------------

To update the embedded version of our widget library, and our Lab extension:
```
(cd js/beakerx_tabledisplay; npm publish)
(cd js/notebook; npm publish)
(cd js/lab; npm publish)
(cd js/lab-theme-dark; npm publish)
(cd js/lab-theme-light; npm publish)
```

Release to Docker Hub
---------------------

Make sure docker is configured to run with at least 4GB of RAM.

```
docker build -t beakerx -f docker/Dockerfile .
docker run -p 8888:8888 beakerx
```

Test it, then (substituting the version):

```
docker tag beakerx beakerx/beakerx:$version
docker push beakerx/beakerx:$version
```

Do the same without a version to set the release to "latest":

```
docker tag beakerx beakerx/beakerx
docker push beakerx/beakerx
```

Write Release Notes
------------------

Open the release on github at
https://github.com/twosigma/beakerx/releases/tag/$version

And write the release notes.

Update Jitpack
--------------

Go to https://jitpack.io/#twosigma/beakerx and click "Get it".

Update Binder Link
------------------

Wait for the conda packages to become available.  Then update the
version of the mybinder link in the README, and push to master.  If
the conda package isn't ready then mybinder will cache the old
version forever.

Update Web Site
---------------

In https://github.com/twosigma/beakerx-www, update the binder link in
_data/main_project.yaml and binder.html.
