Making a BeakerX release
===========================

This document guides a contributor through creating a release of BeakerX.

Install
-------

Review ``README.md`` and make sure that all dependencies are installed.


Create the release
------------------

Update the version in `beakerx/beakerx/_version.py` and
`beakerx/js/package.json` and `js/lab/package.json`.  Commit
the change and push the git tag.

```bash
git clean -xfd
cd beakerx
python setup.py sdist
python setup.py bdist_wheel --universal
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

- Make a branch or fork of https://github.com/twosigma/beakerx-feedstock.
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

- Then commit changes and submit a PR upstream to
  https://github.com/conda-forge/beakerx-feedstock for the new
  version.
- After CI passes, merge the PR.


Publish on npmjs
----------------

To update the embedded version of our widget library:

- Do a full build.
- Run `(cd js/notebook; npm publish)`
- Run `(cd js/lab; npm publish)`

Release to Docker Hub
---------------------

```
(cd kernel; gradle clean)
docker build -t beakerx-base -f docker/base/Dockerfile .
docker build -t beakerx -f docker/Dockerfile .
docker run -p 8888:8888 beakerx
```

Test it, then (substituting the version):

```
docker tag beakerx beakerx/beakerx:$version
docker push beakerx/beakerx:$version
```

Update Binder Link
------------------

Update the version of the mybinder link in the README, and push to master.
