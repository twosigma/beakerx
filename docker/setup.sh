#!/bin/bash

cd /beakerx

conda create -y -n beakerx python=3.5 jupyter pandas
source activate beakerx
../gradlew --no-daemon build
../gradlew --no-daemon kernelInstall
../gradlew --no-daemon :beakerx:install
(cd beakerx; pip install -e .)
python -m beakerx.install --enable --prefix="${CONDA_PREFIX}"
