<!--
    Copyright 2014 TWO SIGMA INVESTMENTS, LLC

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
 
#Notices

* As long as this repo is 'private', do not share code or builds with anybody outside of Two Sigma
* Two Sigma employees must complete the appropriate authorization forms in Bonita before contributing to any open source project, including Beaker

#Beaker notebook
##Overview

Beaker is a polyglot code notebook that allows data scientists to analyze data and document their process using multiple programming languages. Users can seamlessly switch between their favorite languages and tools within a single document. Current language support includes Python, Groovy, R, Scala, Matlab, HTML, Markdown, and Latex. Results can be rendered as interactive visualizations that can easily be shared with colleagues or the public.

##Polyglot literate programming

Imagine a classic lab notebook. The flexibility it provides is endless. You can write words, do math, draw sketches, paint pictures, tape in photographs, or anything else you can imagine. What's more, you can mix these different media however you want. A single page can have English, German, calculus, chemistry, and a picture of your cat.
Beaker provides the same flexibility with code. You can switch seamlessly between many different markup and programming languages within a single document. We've built in support for many languages, and if you want something we haven't gotten to yet, you can add it yourself by writing a plugin.

##Sharing your progress

Returning to our paper-based notebook, when you have something to share with your colleagues, there are many options: take the notebook to their desks, mail them a carbon copy of relevant pages, or hang pages on a bulletin board.
Beaker gives you all this flexibility and more. You can take a snapshot of your work at any time and easily share it with the world. Whether you want to share a block of code, a chart, one section of a notebook, or a whole document, you're one click away from publishing a snapshot that anybody can view in a browser, even if they don't use Beaker themselves.

##Publication and reproducible science

Here is where Beaker blows past what's possible on paper. Traditionally, there are many steps between exploratory work and publication. Notes will be spread across many pages or even different notebooks, data might be somewhere completely different, and drafts of figures could be on whiteboards or napkins. Eventually all of this work is summarized into a document with only text and figures. The reviewers and readers never get to see the full process or data.
Beaker changes all of that. With its polyglot nature, hierarchical section format, and ability to show or hide any cells you want, you can record your full process in a single document. Once you're done with exploration, start a new section with facts and figures. When you're ready to publish, you can collapse the data and details, expand your writeup, and send off the document. The viewers can choose how deeply to examine your work. A casual reader may just look at the writeup, but anybody who's interested can dig into your process and code with the ability to completely reproduce your work.

##Open Source Software

Beaker was built as an internal Two Sigma project but is now being released to the public under the Apache 2.0 license. Is currently available to contributors via a private GitHub repo and will be made public in the near future.
 
#Running Beaker

We've only tried running Beaker on Mac OS X. We'll be working on support for Linux soon.

##Install dependencies

###XCode

    https://itunes.apple.com/us/app/xcode/id497799835

###[Homebrew](http://brew.sh/)

    ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
    
###Gradle, NPM, and Nginx

    brew install gradle npm nginx
    
##Clone this repo

    git clone https://github.com/twosigma/beaker-notebook.git
    
##Build and run Beaker

    cd beaker-notebook
    cd plugin/r
    gradle installApp
    cd ../../core
    gradle run
    
##Connect your browser

You will see a message like this:

    Connect to http://mbpjchendy.local:8801/beaker/
    
Open that URL in any modern web browser (we primarily use Chrome, but also testing Firefox and Safari).  You can also just use http://localhost:8801/beaker.

##Plugin Languages

Beaker can run a variety of backend languages that must be installed independently.  

###Python
Our Python plugin uses the [IPython](http://ipython.org/ipython-doc/stable/install/install.html) kernel and notebook server. The easiest way to install this is using [Anaconda](https://store.continuum.io/cshop/anaconda/). The default install should give you everything you need.

###Julia
Download [Julia](http://julialang.org/downloads/) and then in a Julia REPL saying

    Pkg.add("IJulia").

### R
Install [R](http://cran.r-project.org/bin/macosx/) and [XQuartz](http://xquartz.macosforge.org/landing/) then run R and say:

    install.packages('Rserve',,'http://www.rforge.net/')
