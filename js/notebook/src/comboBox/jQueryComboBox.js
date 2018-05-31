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

define([
  'jquery',
  'jquery-ui/ui/widget',
  'jquery-ui/ui/widgets/tooltip'
], function($, jquiWidget, tooltip) {

  $( function() {
    $.widget('custom.combobox', {
      options: {
        change: null,
        disabled: false
      },

      _create: function () {
        this.editable = this.element.attr('easyform-editable') === 'true';
        this.wrapper = $('<span>')
          .addClass('easyform-combobox')
          .insertAfter(this.element);

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },

      _createAutocomplete: function () {
        var selected = this.element.children(':selected');
        var value = selected.val() ? selected.text() : '';

        this.input = $('<input>')
          .appendTo(this.wrapper)
          .val(value)
          .attr('title', '')
          .attr('size',this.element.attr('size'))
          .addClass('easyform-combobox-input ui-widget ui-widget-content ui-corner-left')
          .autocomplete({
            delay: 150,
            minLength: 0,
            source: $.proxy(this, '_source')
          })
          .tooltip({
            tooltipClass: 'ui-state-highlight'
          });

        if (!this.editable) {
          var input = this.input;
          var wasOpen = false;

          this.input
            .attr('readonly', 'true')
            .mousedown(function () {
              wasOpen = input.autocomplete('widget').is(':visible');
            })
            .click(function () {
              input.focus();
              if (wasOpen) {
                return;
              }
              input.autocomplete('search', '');
            });
        }

        if(this.options.disabled){
          this.input.attr('disabled', 'disabled');
        }

        this._on(this.input, {
          autocompleteselect: function (event, ui) {
            ui.item.option.selected = true;
            this._trigger('select', event, {
              item: ui.item.option
            });
            if ($.isFunction(this.options.change)) {
              this.options.change(ui.item.option.value);
            }
          },
          autocompletesearch: function () {
            if ($.isFunction(this.options.change) && this.editable) {
              this.options.change(this.input[0].value);
            }
          }
        });
      },

      _createShowAllButton: function () {
        var input = this.input;
        var wasOpen = false;

        //use jquery button fn instead of bootstrap
        //reverts to jquery button fn
        var self = this;
        var $showAllButton = $('<a>', {
          tabIndex: -1,
          title: 'Show All Items'
        })
          .appendTo(this.wrapper)
          .button({
            icons: {
              primary: 'ui-icon-triangle-1-s'
            },
            text: false
          })
          .removeClass('ui-corner-all')
          .addClass('easyform-combobox-toggle ui-corner-right')
          .mousedown(function () {
            if (!self.options.disabled) {
              wasOpen = input.autocomplete('widget').is(':visible');
            }
          })
          .click(function () {
            if (!self.options.disabled) {
              input.focus();

              if (wasOpen) {
                return;
              }

              input.autocomplete('search', '');
            }
          });

        $showAllButton.prop('disabled', self.options.disabled);
      },

      _source: function (request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i');

        response(this.element.children('option').map(function () {
          var text = $(this).text();

          if (this.value && ( !request.term || matcher.test(text) ))
            return {
              label: text,
              value: text,
              option: this
            };
        }));
      },

      _destroy: function () {
        this.wrapper.remove();
        this.element.show();
      }
    });
  });
});
