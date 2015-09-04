<!--
    Copyright 2014 TWO SIGMA OPEN SOURCE, LLC

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

#Beaker Development - build system


The build system is designed to produce a stripped down 'run' build or a 'debug' build where individual files are loaded by the browser to facilitate debugging.

To run beaker you can execute:

gradle run

To run beaker in 'debugging mode' you can execute:

gradle debug

To run the automatic test suite you can execute:

gradle check


# HOWTO add 3rd party libraries

3rd libraries should be gathered either by bower or manually downloaded.

To add a bower-based distribution you can edit the bower.json file then execute 'gradle updatePackages', this will download a (new) version and create the dependencies zip file.

To add a distribution manually you should first build the product ('gradle build'), then download the new library files and put it inside the core/src/vendor directory and execute 'gradle updatePackages'.

In both cases you should tell the product to load the library at startup.
* If the new 3rd party code is required in the 'general' code you should edit the file 'core/src/main/web/app/template/index_template.html' and add js files to the proper (vendor) section of the file, while css should be included in 'core/src/main/web/app/vendor.scss'.
* If the new 3rd party code is used in a (new) output display you should edit the files 'core/src/main/web/plugin/template/addoutputdisplays_vendorcss.list' and/or 'core/src/main/web/plugin/template/addoutputdisplays_vendorjs.list'

NOTE: 3rd party libraries (also called vendor) are always cohalescence in a single JavaScript and a single CSS file to enhance loading performance.

# new beaker files

New Beaker templates are automatically compiled, includig templates placed in 'core/src/main/web/outputdisplay' directory tree.

New Beaker JavaScript files should be added to the 'core/src/main/web/app/template/index_template.html' inside the proper section.

New Beaker CSS should be added using the 'core/src/main/web/app/app.scss'

New files related to Beaker outputdisplay should be added to 'core/src/main/web/plugin/template/addoutputdisplays_css.list' and 'core/src/main/web/plugin/template/addoutputdisplays_javascript.list'

