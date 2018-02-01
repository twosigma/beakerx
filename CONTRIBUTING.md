<!--
    Copyright 2017 TWO SIGMA OPEN SOURCE, LLC

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

# Contributing

We welcome users and developers to help us extend and improve BeakerX
for the benefit of all.  The two main ways of doing that are by filing
issues and submitting pull requests.

## Issues

First search and see if an appropriate issue already exists.  You can
add your comments or reaction there.

If you are reporting a bug:

* Make sure you have the latest released version of BeakerX.

* Include precise instructions for reproducing the problem.  Linking
  to a published notebook is often a good way.

## Pull Requests

In order for us to accept your code or pull request, we need for you
to fill out and email `beaker-cla@twosigma.com` a scan of a signed
copy of the [Contributor License
Agreement](http://beakernotebook.com/cla.zip).

BeakerX uses [Google Java
style](https://google.github.io/styleguide/javaguide.html), and all
Java code needs unit tests.  For JavaScript we use [Google JS
style](https://google.github.io/styleguide/jsguide.html) with
[require](http://requirejs.org/) instead of goog.  All files should
end with newline and have a copyright and license banner.

## Core Team Process

For those with write access to the github repository, please use the
following system for naming your branches and submitting your work.

* Make one PR for each issue.  Each PR should be a branch from master
  that can be merged independently of any other issue.
* Name your branch "YourName/IssueNumber", eg "spot/6483".
* Each commit should have the issue number in its message like "#6483"
  so that github links it.
* An admin will review, test, write feedback, and eventually merge the PR and close the issue.
* Do not rebase your PRs.
