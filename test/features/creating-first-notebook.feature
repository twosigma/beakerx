#
# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

Feature: Creating the first notebook
As a researcher I should be prompted to create a notebook so that I can evalute code and try out beaker.

  Scenario: Creating the first notebook
    When I am viewing beaker
    Then I see the the user dashboard
    And I create a notebook
    Then I should see a new notebook
