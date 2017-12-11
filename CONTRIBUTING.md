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

We welcome developers to extend and improve BeakerX in ways that can
benefit everyone. In order for us to accept your code or pull request,
we need for you to fill out and email back to us a scan of a signed copy of the
[Contributor License Agreement](http://beakernotebook.com/cla.zip).

BeakerX uses [Google Java
style](https://google.github.io/styleguide/javaguide.html), and all
Java code needs unit tests.  For JavaScript we use [Google JS
style](https://google.github.io/styleguide/jsguide.html) with
[require](http://requirejs.org/) instead of goog.  All files should
end with newline and have a copyright and license banner.

# Core Team Process

For those with write access to the github repository, please use the
following system for naming your branches and submitting your work.

* Make one PR for each issue.  Each PR should be a branch from master
  that can be merged independently of any other issue.
* Name your branch "YourName/IssueNumber", eg "spot/6483".
* Each commit should have the issue number in its message like "#6483"
  so that github links it.
* An admin will review, test, write feedback, and eventually merge the PR and close the issue.
* Do not rebase your PRs.
