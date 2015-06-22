#!/bin/bash
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

EXTDIR=../
WEBDIR=$EXTDIR/core/src/main/web/

rm -rf outdir
mkdir -p outdir
mkdir -p outdir/template
mkdir -p outdir/static
mkdir -p outdir/static/app
mkdir -p outdir/static/vendor
mkdir -p outdir/static/fonts
mkdir -p outdir/static/images

# copy sharing server files
cp src/app/beaker_notebook.html outdir/template/
cp src/src/* outdir/static/app/


# copy all required beaker files

cp -r $WEBDIR/app/images/*                    outdir/static/images/
cp -r $WEBDIR/app/fonts/*                     outdir/static/fonts/
cp $WEBDIR/app/dist/beakerApp.css                 outdir/static/app/
cp $WEBDIR/app/dist/beakerOutputDisplay.css       outdir/static/app/
cp $WEBDIR/app/dist/beakerOutputDisplay.js        outdir/static/app/
cp $WEBDIR/app/dist/beakerOutputDisplayVendor.js  outdir/static/app/
cp $WEBDIR/app/dist/beakerVendor.js               outdir/static/app/
cp $WEBDIR/app/temp/templates.js                  outdir/static/app/

cp -r $WEBDIR/app/vendor/katex-build                         outdir/static/vendor/
cp -r $WEBDIR/app/vendor/requirejs                           outdir/static/vendor/
cp $WEBDIR/app/mainapp/components/notebook/outputdisplay/*   outdir/static/app/
cp $WEBDIR/app/mainapp/services/notebookcellmodelmanager.js  outdir/static/app/
cp $WEBDIR/app/utils/utils.js                 outdir/static/app/
cp $WEBDIR/app/utils/basic/angularutils.js    outdir/static/app/
cp $WEBDIR/app/utils/basic/commonutils.js     outdir/static/app/

