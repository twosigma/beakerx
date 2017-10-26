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


define(['base/js/dialog', 'base/js/keyboard'], function (dialog, keyboard) {
    function new_property_prompt(callback) {
        var input_name = $('<input id="property_name" name="name"/>');
        var input_value = $('<input id="property_value" name="value"/>');

        var form_body = $('<div/>').append(
            $('<form class="new_prop_form"/>').append(
                $('<fieldset/>')
                    .append($('<label for="property_name">Name:</label>'))
                    .append(input_name)
                    .append($('<label for="property_value">Value:</label>'))
                    .append(input_value)
            )
        );

        var buttons = {
            Cancel: {},
            Create: {
                class: 'btn-danger btn-primary',
                click: function () {
                    var name = $('#property_name').val().trim();
                    if (!name.startsWith('-')) {
                        name = '-' + name;
                    }
                    callback(name, $('#property_value').val().trim());
                }
            }
        };

        var d = dialog;

        var dialog_options = {
            title: 'New Java Property',
            body: form_body,
            buttons: buttons,
            open: function () {
                input_value.keydown(function (event) {
                    if (event.which === keyboard.keycodes.enter) {
                        d.find('.btn-primary').first().click();
                        return false;
                    }
                });
                input_name.focus();
            }
        };

        d.modal(dialog_options);
    }

    function show_Warning(msg) {
        var buttons = {
            OK: {}
        };

        var dialog_options = {
            title: 'Warning',
            body: msg,
            buttons: buttons
        };

        dialog.modal(dialog_options);
    }

    return {
        "new_property_prompt": new_property_prompt,
        "show_Warning": show_Warning
    };
});
