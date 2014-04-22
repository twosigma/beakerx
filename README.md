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

This page is for developers.  If you want to use or learn more about Beaker, see the [home page](http://beakernotebook.com) or [download it](http://beakernotebook.com/download).

![screenshots](http://twosigma.github.io/beaker-notebook/images/bk1.png)

##Language support

We currently provide support for Python, R, Julia, Groovy, JavaScript, HTML, Markdown, Latex.

Beaker is built with a plugin-based architecture, so additional languages can easily by added by us or anybody else.

##Iterative exploration

The notebook format is based on blocks of code called cells. Cells can be added anywhere in the notebook and can be edited and run independently from each other. This makes an ideal environment for iterative exploration of data and coding ideas.

##Visualizations

Visualizations create with libraries like ggplot2 and matplotlib will appear directly in the notebook along with your code.

##Inline documentation

The inclusion of markup languages like HTML, Markdown, and Latex means that you can document your work right alongside your code.

##Organization

Beaker provides several features to help your organize your notebooks, for your own convenience or for sharing your work with colleagues.

These features include: collapsible nested sections with headers, lock notebook (hide all code and disable editing), toggle visibility of code and output on individual cells, initialization cells (run automatically on notebook load), and delete all output.

##Notebook viewer

We provide a notebook viewer that can render any notebook accessible from the web. We also provide a one-click action to save a copy of your notebook to a GitHub Gist and generate a notebook viewer link.

The viewer is, of course, open source. This means you can install a copy on your private cloud to view notebooks you don't want to share with the whole world

##Plugin-based architecture
Beaker was designed from the beginning with flexibility in mind. All of the core functionality including language evaluation, menu items, and output displays are built using plugins. This means that any language or feature you want to add to Beaker can work just as well as everything we've included by default.

Plugins are written in JavaScript and have the option to start a process on the back end server. For anything that uses only JavaScript, you can simply provide your users with the URL for the plugin, which they can load directly from the UI.

Plugin specifications:

[Evaluator plugins](https://github.com/twosigma/beaker-notebook/wiki/Eval-plugin-spec)

[Menu plugins](https://github.com/twosigma/beaker-notebook/wiki/Menu-plugin-spec)

[Output display plugins](https://github.com/twosigma/beaker-notebook/wiki/OutputDisplay-spec)

##Open source
Beaker's full source code and documentation is available under the Apache 2.0 license.

 
#Build and run instructions

Users should download beaker from [beakernotebook.com](http://beakernotebook.com)

Developers, see below for how to build from source.

[Ubuntu](https://github.com/twosigma/beaker-notebook/wiki/Ubuntu-build-and-run)

[Mac](https://github.com/twosigma/beaker-notebook/wiki/Mac-build-and-run)

[Windows](https://github.com/twosigma/beaker-notebook/wiki/Windows-build-and-run)
