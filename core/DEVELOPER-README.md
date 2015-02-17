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

#Beaker Development - where to add stuff

This document details where things should be added to become part of beaker build.

# Vendor libraries

Vendor libraries should be gathered either by bower or manually downloaded.

To add a bower library you can edit the bower.json file then execute 'gradle updatePackages', this will download a (new) version and create the dependencies zip file.

To add a library manually you should first build the product ('gradle build'), then download the new library and put it inside the vendor directory and execute 'gradle updatePackages'.

In both cases you should edit 'gulpfile.js' and add the relevant CSS files to the csslist array and the JavaScript files to the csslist array.

# new beaker files

New Beaker templates are automatically compiled.

New beaker JavaScript files should be added to the 'bkjslist' array inside 'gulpfile.js'.


