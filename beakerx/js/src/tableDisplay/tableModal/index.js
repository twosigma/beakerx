/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

var bkHelper = require('./../../shared/bkHelper');
var _ = require('underscore');
var $ = require('jquery');

module.exports = function(TableScope) {

  TableScope.prototype.initColumLimitModal = function() {
    var templateString = require('./columnLimitModal.html');
    var compiled = _.template(templateString)({
      scopeId: this.id,
      outputColumnLimit: this.outputColumnLimit,
      columnNames: this.columnNames
    });
    var $modal = $(compiled);
    var self = this;

    $modal
      .on('click', '.btn-primary', function(event) {
        self.showHeaderMenu();
      })
      .on('click', '.btn-secondary', function(event) {
        self.hideModal();
      });

    this.columnLimitModal = $modal;

    this.element.prepend($modal);

    if (this.columnNames.length > this.outputColumnLimit) {
      $modal.show();
    }
  };

  TableScope.prototype.showHeaderMenu = function() {
    var self = this;
    $('#' + self.id + '_modal_dialog').hide();
    bkHelper.timeout(function() {
      var $trigger = $('#' + self.id + '_dropdown_menu');
      var $notebookCell = self.element.closest('.cell');

      self.indexMenu.open($notebookCell, $trigger, 1);
    }, 0);
  };

  TableScope.prototype.hideModal = function(){
    var self = this;
    var id = self.id + '_modal_dialog';
    $('#'+id).hide()
  };
};
