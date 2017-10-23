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

define(function (require) {
    var $ = require('jquery');
    var Jupyter = require('base/js/namespace');
    var utils = require('base/js/utils');
    var urls = require('./urls');

    function AjaxSettings(settings) {
        settings.cache = false;
        settings.dataType = 'json';

        if (!settings.type) {
            settings.type = 'GET';
        }
        return settings;
    }

    function SuccessWrapper(success_callback, error_callback) {
        return function (data, status, xhr) {
            if (data.error || data.message) {
                error_callback(xhr, status, data.error || data.message);
            }
            else {
                success_callback(data, status, xhr);
            }
        }
    }

    function MakeErrorCallback(title, msg) {
        return function (xhr, status, e) {
            console.warn(msg + ' ' + e);
        }
    }

    var error_callback = MakeErrorCallback('Error', 'An error occurred while load Beakerx setings');

    var settings = {
        formId: 'beakerx_jvm_settings_form',
        input_id: 0,

        appendField: function (id, name, value, parentNode) {
            var input = document.createElement('input');
            var label = document.createElement('label');
            var wrapper = document.createElement('div');

            input.setAttribute('name', id);
            input.setAttribute('id', id);
            input.setAttribute('pattern', "^\-X.*");
            input.setAttribute('title', "Should be valid -X Command-line Options");
            input.value = value;

            label.innerText = name;
            label.setAttribute('for', id);
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            parentNode.appendChild(wrapper);
        },

        load: function () {
            var that = this;

            function handle_response(data, status, xhr) {
                var $inputs = $('#' + that.formId + ' input');
                $inputs.each(function () {
                    val = $(this);
                    $("label").attr("for", val.id).remove();
                    val.remove()
                });
                that.input_id = 0;

                var fieldset = document.querySelector('#' + that.formId + ' fieldset');
                for (var i = 0; i < data.jvm.length; i++) {
                    that.input_id += 1;
                    var id = "beakerx_" + that.input_id + ": ";
                    that.appendField(id, id, data.jvm[i], fieldset);
                }
            }

            var settings = AjaxSettings({
                success: SuccessWrapper(handle_response, error_callback),
                error: error_callback
            });

            return utils.ajax(urls.api_url + 'settings', settings);
        },

        setVariables: function (data) {
            function handle_response(data, status, xhr) {

            }

            var settings = AjaxSettings({
                data: data || {},
                type: 'POST',
                success: SuccessWrapper(handle_response, error_callback),
                error: error_callback
            });

            return utils.ajax(urls.api_url + 'settings', settings);
        },
        createField: function () {
            var that = this;
            var fieldset = document.querySelector('#' + that.formId + ' fieldset');
            that.input_id += 1;
            var id = "beakerx_" + that.input_id + ": ";
            that.appendField(id, id, "", fieldset);
        }
    };

    function load() {
        if (!Jupyter.notebook_list)
            return;
        utils.ajax(urls.static_url + 'settings_tab.html', {
            dataType: 'html',
            success: function (env_html, status, xhr) {
                $(".tab-content").append($(env_html));
                $("#tabs").append(
                    $('<li>')
                        .append(
                            $('<a>')
                                .attr('id', 'beakerx_tab')
                                .attr('href', '#beakerx')
                                .attr('data-toggle', 'tab')
                                .text('Beakerx Sett.')
                                .click(function (e) {
                                    window.history.pushState(null, null, '#beakerx');
                                    settings.load();
                                })
                        )
                );

                document.getElementById("jvm_settings_submit").addEventListener("click", function (event) {
                    event.preventDefault();
                    var $inputs = $('#' + settings.formId + ' input');
                    var values = [];
                    $inputs.each(function () {
                        var value = $(this).val().trim();
                        if (value.length > 0) {
                            values.push(value);
                        }
                    });
                    settings.setVariables({"jvm": values});
                    settings.load();
                });
                document.getElementById("new_jvm_sett").addEventListener("click", function (event) {
                    event.preventDefault();
                    settings.createField();
                });

                $(".tab-content").submit();

                if (window.location.hash === '#beakerx') {
                    $('#beakerx_tab').click();
                }
            }
        });
    }

    return {
        load_ipython_extension: load
    };
});
