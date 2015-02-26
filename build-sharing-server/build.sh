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
VENDIR=$EXTDIR/core/src/main/web/vendor
WEBDIR=$EXTDIR/core/src/main/web/

rm -rf outdir
mkdir -p outdir
mkdir -p outdir/template
mkdir -p outdir/static
mkdir -p outdir/static/app
mkdir -p outdir/static/vendor
mkdir -p outdir/static/static/
mkdir -p outdir/static/vendor/TableTools-2.2.3/swf/
mkdir -p outdir/static/vendor/epiceditor/themes/base/
mkdir -p outdir/static/vendor/bower_components/font-awesome/fonts/
mkdir -p outdir/static/vendor/TableTools-2.2.3/images/
mkdir -p outdir/static/vendor/bower_components/datatables/media/images/
mkdir -p outdir/static/vendor/bower_components/font-awesome/fonts/

# copy all required media

cp -r $EXTDIR/core/src/main/web/app/images                outdir/static/
cp -r $EXTDIR/core/src/main/web/app/fonts                 outdir/static/app/
cp $EXTDIR/core/src/main/web/static/*                     outdir/static/static/
cp $VENDIR/bower_components/font-awesome/fonts/*          outdir/static/vendor/bower_components/font-awesome/fonts/
cp $VENDIR/bower_components/datatables/media/images/*.png outdir/static/vendor/bower_components/datatables/media/images/
cp $VENDIR/TableTools-2.2.3/images/*.png                  outdir/static/vendor/TableTools-2.2.3/images/
cp -r $VENDIR/mathjax                                     outdir/static/vendor/
cp $VENDIR/TableTools-2.2.3/swf/*                         outdir/static/vendor/TableTools-2.2.3/swf/
cp $VENDIR/epiceditor/themes/base/epiceditor.css          outdir/static/vendor/epiceditor/themes/base/
touch outdir/static/app/main.js
cp src/app/beaker_notebook.html outdir/template/

# copy css file for notebook sharing

NOTEBOOKCSS=(
    "bower_components/font-awesome/css/font-awesome.css"
    "bower_components/bootstrap/docs/assets/css/bootstrap.css"
    "bower_components/angular-datatables/dist/datatables.bootstrap.css"
    "bower_components/datatables/media/css/jquery.dataTables.css"
    "ColVis-1.1.1/css/dataTables.colVis.min.css"
    "ColReorder-1.1.2/css/dataTables.colReorder.min.css"
    "Responsive-1.0.1/css/dataTables.responsive.css"
    "TableTools-2.2.3/css/dataTables.tableTools.min.css")

BEAKERCSS=(
    "app/dist/app.css"
    "outputdisplay/bko-plot/bko-plot.css"
    "app/dist/vendor.css"
    "outputdisplay/bko-plot/bko-combinedplot.css" )

for i in ${NOTEBOOKCSS[@]}; do
    mkdir -p outdir/static/vendor/$(dirname $i)
    cp $VENDIR/$i outdir/static/vendor/$(dirname $i)
done

for i in ${BEAKERCSS[@]}; do
    mkdir -p outdir/static/$(dirname $i)
    cp $WEBDIR/$i outdir/static/$(dirname $i)
done

# copy vendor javascript for notebook sharing

VENDORNOTEBOOKJS=(
    "flotr2/flotr2.js"
    "bower_components/big.js/big.min.js"
    "bower_components/jquery/jquery.min.js"
    "bower_components/datatables/media/js/jquery.dataTables.js"
    "ColVis-1.1.1/js/dataTables.colVis.min.js"
    "ColReorder-1.1.2/js/dataTables.colReorder.min.js"
    "Responsive-1.0.1/js/dataTables.responsive.min.js"
    "TableTools-2.2.3/js/dataTables.tableTools.min.js"
    "bower_components/angular/angular.js"
    "bower_components/angular-datatables/dist/angular-datatables.js"
    "bower_components/angular-route/angular-route.js"
    "bower_components/angular-animate/angular-animate.js"
    "bower_components/d3/d3.js"
    "bower_components/codemirror/lib/codemirror.js"
    "bower_components/codemirror/addon/hint/show-hint.js"
    "bower_components/codemirror/addon/hint/javascript-hint.js"
    "bower_components/codemirror/addon/edit/matchbrackets.js"
    "bower_components/codemirror/addon/dialog/dialog.js"
    "bower_components/codemirror/addon/search/searchcursor.js"
    "bower_components/codemirror/mode/r/r.js"
    "bower_components/codemirror/mode/ruby/ruby.js"
    "bower_components/codemirror/mode/javascript/javascript.js"
    "bower_components/codemirror/mode/python/python.js"
    "bower_components/codemirror/mode/julia/julia.js"
    "bower_components/codemirror/mode/groovy/groovy.js"
    "bower_components/codemirror/mode/htmlmixed/htmlmixed.js"
    "bower_components/codemirror/mode/stex/stex.js"
    "bower_components/codemirror/mode/xml/xml.js"
    "bower_components/codemirror/mode/css/css.js"
    "bower_components/codemirror/mode/clike/clike.js"
    "bower_components/codemirror/keymap/vim.js"
    "bower_components/codemirror/keymap/emacs.js"
    "bower_components/q/q.js"
    "epiceditor/js/epiceditor.js"
    "bower_components/underscore/underscore-min.js"
    "bower_components/underscore.string/dist/underscore.string.min.js"
    "angular-ui/ui-utils.min.js"
    "cometd/cometd.js"
    "cometd/jquery/jquery.cometd.js"
    "jquery.event.drag/jquery.event.drag.js"
    "jquery-ui/js/jquery-ui.custom.min.js"
    "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"
    "bower_components/bootstrap/docs/assets/js/bootstrap.min.js"
    "vega/vega.js"
    "vega/d3.geo.projection.min.js"
    "vega/d3.layout.cloud.js"
    "moment/moment.min.js"
    "moment/moment-timezone.js"
    "moment/moment-timezone-data.js"
    "bower_components/requirejs/require.js"
    "bower_components/underscore/underscore-min.map")

for i in ${VENDORNOTEBOOKJS[@]}; do
    mkdir -p outdir/static/vendor/$(dirname $i)
    cp $VENDIR/$i outdir/static/vendor/$(dirname $i)
done

BEAKERNOTEBOOKJS=(
    "app/utils/basic/commonutils.js"
    "app/utils/basic/angularutils.js"
    "app/utils/utils.js"
    "app/helpers/datatables.js"
    "app/mainapp/services/notebookcellmodelmanager.js"
    "outputdisplay/bko-plot/plotutils.js"
    "outputdisplay/bko-plot/plotsampler.js"
    "outputdisplay/bko-plot/plotitems/auxes/plotauxbox.js"
    "outputdisplay/bko-plot/plotitems/auxes/plotauxriver.js"
    "outputdisplay/bko-plot/plotitems/auxes/plotauxstem.js"
    "outputdisplay/bko-plot/plotitems/std/plotline.js"
    "outputdisplay/bko-plot/plotitems/std/plotbar.js"
    "outputdisplay/bko-plot/plotitems/std/plotstem.js"
    "outputdisplay/bko-plot/plotitems/std/plotarea.js"
    "outputdisplay/bko-plot/plotitems/std/plotpoint.js"
    "outputdisplay/bko-plot/plotitems/std/plotconstline.js"
    "outputdisplay/bko-plot/plotitems/std/plotconstband.js"
    "outputdisplay/bko-plot/plotitems/std/plottext.js"
    "outputdisplay/bko-plot/plotitems/lod/plotlodline.js"
    "outputdisplay/bko-plot/plotitems/lod/plotlodriver.js"
    "outputdisplay/bko-plot/plotitems/lod/plotlodbox.js"
    "outputdisplay/bko-plot/plotitems/lod/plotlodpoint.js"
    "outputdisplay/bko-plot/plotitems/lod/plotlodstem.js"
    "outputdisplay/bko-plot/plotitems/lodloader/plotlinelodloader.js"
    "outputdisplay/bko-plot/plotitems/lodloader/plotarealodloader.js"
    "outputdisplay/bko-plot/plotitems/lodloader/plotbarlodloader.js"
    "outputdisplay/bko-plot/plotitems/lodloader/plotstemlodloader.js"
    "outputdisplay/bko-plot/plotitems/lodloader/plotpointlodloader.js"
    "outputdisplay/bko-plot/plotaxis.js"
    "outputdisplay/bko-plot/plotfactory.js"
    "outputdisplay/bko-plot/plotconverter.js"
    "outputdisplay/bko-plot/plotformatter.js"
    "outputdisplay/bko-plot/combinedplotformatter.js"
    "outputdisplay/bko-plot/bko-plot.js"
    "outputdisplay/bko-plot/bko-combinedplot.js"
 )

for i in ${BEAKERNOTEBOOKJS[@]}; do
    mkdir -p outdir/static/$(dirname $i)
    cp $WEBDIR/$i outdir/static/$(dirname $i)
done


cp src/src/app.js outdir/static/app
cp src/src/outputDisplay/bkChart_static.js outdir/static/app
cp src/src/outputDisplay/bkImage_static.js outdir/static/app
cp src/src/outputDisplay/bkTable_static.js outdir/static/app
cp src/src/outputDisplay/latexView_static.js outdir/static/app


exit 20


# build combined js file for plot sharing

VENDORPLOTJS=(
    "$VENDIR/flotr2/flotr2.js"
    "$VENDIR/bower_components/big.js/big.js"
    "$VENDIR/bower_components/jquery/jquery.js"
    "$VENDIR/bower_components/angular/angular.js"
    "$VENDIR/bower_components/angular-route/angular-route.js"
    "$VENDIR/bower_components/angular-animate/angular-animate.js"
    "$VENDIR/bower_components/codemirror/lib/codemirror.js"
    "$VENDIR/bower_components/codemirror/addon/hint/show-hint.js"
    "$VENDIR/bower_components/codemirror/addon/hint/javascript-hint.js"
    "$VENDIR/bower_components/codemirror/addon/edit/matchbrackets.js"
    "$VENDIR/bower_components/codemirror/addon/dialog/dialog.js"
    "$VENDIR/bower_components/codemirror/addon/search/searchcursor.js"
    "$VENDIR/bower_components/codemirror/mode/r/r.js"
    "$VENDIR/bower_components/codemirror/mode/ruby/ruby.js"
    "$VENDIR/bower_components/codemirror/mode/javascript/javascript.js"
    "$VENDIR/bower_components/codemirror/mode/python/python.js"
    "$VENDIR/bower_components/codemirror/mode/julia/julia.js"
    "$VENDIR/bower_components/codemirror/mode/groovy/groovy.js"
    "$VENDIR/bower_components/codemirror/mode/htmlmixed/htmlmixed.js"
    "$VENDIR/bower_components/codemirror/mode/stex/stex.js"
    "$VENDIR/bower_components/codemirror/mode/xml/xml.js"
    "$VENDIR/bower_components/codemirror/mode/css/css.js"
    "$VENDIR/bower_components/codemirror/mode/clike/clike.js"
    "$VENDIR/bower_components/codemirror/keymap/vim.js"
    "$VENDIR/bower_components/codemirror/keymap/emacs.js"
    "$VENDIR/bower_components/q/q.js"
    "$VENDIR/bower_components/d3/d3.js"
    "$VENDIR/epiceditor/js/epiceditor.js"
    "$VENDIR/bower_components/underscore/underscore-min.js"
    "$VENDIR/bower_components/underscore.string/dist/underscore.string.min.js"
    "$VENDIR/angular-ui/ui-utils.min.js"
    "$VENDIR/cometd/cometd.js"
    "$VENDIR/cometd/jquery/jquery.cometd.js"
    "$VENDIR/jquery.event.drag/jquery.event.drag.js"
    "$VENDIR/jquery-ui/js/jquery-ui.custom.min.js"
    "$VENDIR/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"
    "$VENDIR/bower_components/bootstrap/docs/assets/js/bootstrap.min.js"
    "$VENDIR/moment/moment.min.js"
    "$VENDIR/moment/moment-timezone.js"
    "$VENDIR/moment/moment-timezone-data.js"
    "$VENDIR/bower_components/requirejs/require.js")

# build beaker combined js file for notebook sharing


for i in ${BEAKERNOTEBOOKJS[@]}; do
    cp $i outdir/js/
done

# build combined js file for beaker lot sharing

BEAKERPLOTJS=(
    "$EXTDIR/core/src/main/web/app/utils/basic/commonutils.js"
    "$EXTDIR/core/src/main/web/app/utils/basic/angularutils.js"
    "$EXTDIR/core/src/main/web/app/utils/utils.js"
    "src/src/plotviewerapp.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotutils.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotsampler.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxbox.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxriver.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxstem.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotline.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotbar.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotstem.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotarea.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotpoint.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotconstline.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotconstband.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plottext.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodline.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodriver.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodbox.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodpoint.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodstem.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotlinelodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotarealodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotbarlodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotstemlodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotpointlodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotaxis.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotfactory.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotconverter.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotformatter.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/combinedplotformatter.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/bko-plot.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/bko-combinedplot.js"
 )


# build combined js file for beaker combined plot sharing

BEAKERCPLOTJS=(
    "$EXTDIR/core/src/main/web/app/utils/basic/commonutils.js"
    "$EXTDIR/core/src/main/web/app/utils/basic/angularutils.js"
    "$EXTDIR/core/src/main/web/app/utils/utils.js"
    "src/src/combinedplotviewerapp.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotutils.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotsampler.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxbox.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxriver.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxstem.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotline.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotbar.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotstem.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotarea.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotpoint.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotconstline.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plotconstband.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/std/plottext.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodline.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodriver.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodbox.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodpoint.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodstem.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotlinelodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotarealodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotbarlodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotstemlodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotpointlodloader.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotaxis.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotfactory.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotconverter.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/plotformatter.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/combinedplotformatter.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/bko-plot.js"
    "$EXTDIR/core/src/main/web/outputdisplay/bko-plot/bko-combinedplot.js"
 )


TABLEJS=(
    "$VENDIR/bower_components/jquery/jquery.js"
    "$VENDIR/bower_components/datatables/media/js/jquery.dataTables.js"
    "$VENDIR/ColVis-1.1.1/js/dataTables.colVis.min.js"
    "$VENDIR/ColReorder-1.1.2/js/dataTables.colReorder.min.js"
    "$VENDIR/Responsive-1.0.1/js/dataTables.responsive.min.js"
    "$VENDIR/TableTools-2.2.3/js/dataTables.tableTools.min.js"
)

