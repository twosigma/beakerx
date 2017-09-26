Making a BeakerX release
===========================

This document guides a contributor through creating a release of BeakerX.

Install
-------

Review ``README.md`` and make sure that all dependencies are installed.

Clean the repository
--------------------

You can remove all non-tracked files with:

```bash
git clean -xfdi
```

This will ask you for confirmation before removing all untracked files. Make
sure the ``dist/`` folder is clean and avoid stale build from
previous attempts.

Create the release
------------------

We publish a Python source package and a Python universal binary wheel. We also publish a conda package on conda-forge (see below).
See the Python docs on [package uploading](https://packaging.python.org/guides/tool-recommendations/)
for twine setup instructions and for why twine is the recommended method.

Update the version in `beakerx/beakerx/_version.py` and commit the change and push the git tag.

```bash
cd beakerx
rm -rf dist
python setup.py sdist
python setup.py bdist_wheel --universal
twine upload dist/*
# get the sha256 hash for conda-forge install
shasum -a 256 dist/*.tar.gz
```

Make a test installation with pip.

Publish on conda-forge
----------------------

```

Then update the feedstock repo:

- Make a branch or fork of https://github.com/conda-forge/beakerx-feedstock.
- Update the `version` and `sha256` variable values in `recipe/meta.yaml`.
  Return  build number to 0.

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

- Then commit changes and submit a PR for the new version.
- After CI passes, merge the PR.


Publish on npmjs
----------------

To update the embedded version of our widget library:

- Increase the version in beakerx/js/package.json
- Do a full build.
- Run `npm publish`

Release to Docker Hub
---------------------

```
(cd kernel; gradle clean)
docker build -t beakerx-base -f docker/base/Dockerfile .
docker build -t beakerx -f docker/Dockerfile .
docker run -p 8888:8888 beakerx
```

Test it, then

```
docker push beakerx/beakerx
```

Update description/version on [Docker
Hub](https://hub.docker.com/r/beakerx/beakerx/)
