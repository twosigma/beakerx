#!/bin/bash

cd /home/beakerx/beakerx

conda create -y -n beakerx python=3.5 jupyter pandas
source activate beakerx
./gradlew build
./gradlew kernelInstall
./gradlew :beakerx:install
(cd beakerx; pip install -e .)
python -m beakerx.install --enable --prefix="${CONDA_PREFIX}"
