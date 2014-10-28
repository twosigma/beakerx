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

# Building sharing server project content

To build a new version of the sharing server:
1. build and test beaker
2. cd inside this directory
3. run ./build.sh
4. copy outdir/static/* into _path-to-beaker-sharing-server_/nbviewer/static/viewer/
5. copy outdir/template/* into _path-to-beaker-sharing-server_/nbviewer/template/
6. remove outdir
7. test and commit the new sharing server

