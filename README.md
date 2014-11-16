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

#Beaker - the data scientist's laboratory

Beaker is a code notebook that allows you to analyze, visualize, and document data using multiple programming languages. Beaker's plugin-based polyglot architecture enables you to seamlessly switch between languages in your documents and add support for your favorite languages that we've missed.

This page is for developers.  If you want to use or learn more about Beaker, see the [home page](http://beakernotebook.com).

#Screenshots

![screenshots](http://twosigma.github.io/beaker-notebook/images/bk6.png)

#Build, test, and run instructions

[![Build Status](https://travis-ci.org/twosigma/beaker-notebook.svg?branch=master)](https://travis-ci.org/twosigma/beaker-notebook)

Developers, see the page for your platform for how to build from source: [Ubuntu](https://github.com/twosigma/beaker-notebook/wiki/Ubuntu-build-and-run), [Mac](https://github.com/twosigma/beaker-notebook/wiki/Mac-build-and-run), [Windows](https://github.com/twosigma/beaker-notebook/wiki/Windows-build-and-run)

Run `cd test; ./runner` to run the end-to-end tests.

##Language support

We currently provide support for Python, R, Julia, Groovy, Ruby, JavaScript, HTML, Markdown, and LaTeX.

Beaker supports *autotranslation* of variables between languages.  For example, you can read and process some data in Python,
model it with R, and then turn that into an interactive visualization with Javascript.

##Architecture

Beaker's architecture and the organization of the source is code is covered in the [Architecture wiki](https://github.com/twosigma/beaker-notebook/wiki/Architecture).

Beaker was designed from the beginning with flexibility in mind. All of the core functionality including language evaluation, menu items, and output displays are built using plugins. This means that any language or feature you want to add to Beaker can work just as well as everything we've included by default.

Plugins are written in JavaScript and have the option to start a process on the back end server. For anything that uses only JavaScript, you can simply provide your users with the URL for the plugin, which they can load directly from the UI.

Plugin specifications: [Evaluator plugins](https://github.com/twosigma/beaker-notebook/wiki/Eval-plugin-spec), [Menu plugins](https://github.com/twosigma/beaker-notebook/wiki/Menu-plugin-spec), [Output display plugins](https://github.com/twosigma/beaker-notebook/wiki/OutputDisplay-spec)

##Open source
Beaker's full source code and documentation is available under the Apache 2.0 license.  Beaker's sharing feature uses a server with its own [repository](https://github.com/twosigma/beaker-sharing-server).

