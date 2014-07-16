/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

module.exports = function() {
  this.When(/^I close all the open notebooks$/, function() {
    return $.map(new this.Widgets.OpenNotebooks().items(), function(item) {
      return item.close();
    });
  });

  this.Then(/^I should see the following notebooks:$/, function(table) {
    return (new this.Widgets.OpenNotebooks().toHash())
    .should.eventually.eql(table.hashes())
  });
}
