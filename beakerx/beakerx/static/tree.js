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
    var dialogs = require('./dialog');

    function AjaxSettings(settings) {
        settings.cache = false;
        settings.dataType = 'json';
        settings.processData = false;
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

    function InpuChanged(e) {
        var result = "";
        var other_property = $('#other_property input');
        other_property.each(function () {
            var value = $(this).val().trim();
            if (value.length > 0) {
                result += value + " "
            }
        });


        var $java_property = $('#java_property input');
        $java_property.each(function () {
            var value = $(this).val().trim();
            if (value.length > 0) {
                result += this.id + ":" + value + " "
            }
        });
        var $default_property = $('#default_options input');
        $default_property.each(function () {
            var value = $(this).val().trim();
            if (value.length > 0) {
                result += '-Xmx:' + value + 'g'
            }
        });

        $('#result').text(result)
    }

    var error_callback = MakeErrorCallback('Error', 'An error occurred while load Beakerx setings');
    var version = {
        versionBox: "beakerx_info",
        load: function () {
            var that = this;

            function handle_response(data, status, xhr) {
                var version_element = $('#' + that.versionBox);
                $(version_element).html("<a href=\"http://BeakerX.com\">BeakerX</a>" +
                    " from <a href=\"http://opensource.twosigma.com/\">\n" +
                    " Two Sigma Open Source\n </a>\n" +
                    " version " + data.version)
            }

            var settings = AjaxSettings({
                success: SuccessWrapper(handle_response, error_callback),
                error: error_callback
            });

            return utils.ajax(urls.api_url + 'version', settings);
        }
    };
    var settings = {
        formId: 'beakerx_jvm_settings_form',
        input_id: 0,

        appendField: function (opts) {
            var input = $('<input>');
            var wrapper = $('<div>');

            input.attr('name', opts.name);
            input.attr('id', opts.id);
            input.val(opts.value);
            input.keyup(InpuChanged);
            if (opts.add_label) {
                var label = $('<label>');
                label.text(opts.name);
                label.attr('for', opts.id);
                wrapper.append(label);
            }
            wrapper.append(input);
            $(opts.parent).append(wrapper);
            InpuChanged({});
        },

        load: function () {
            var that = this;

            function handle_response(data, status, xhr) {
                $('#java_property').empty();
                $('#other_property').empty();
                that.input_id = 0;

                var other_fieldset = $('#other_property');
                for (var i = 0; i < data.other.length; i++) {
                    that.input_id += 1;
                    var id = "beakerx_" + that.input_id + ": ";
                    var opts = {
                        id: id,
                        name: id,
                        value: data.other[i],
                        parent: other_fieldset,
                        add_label: false
                    };
                    that.appendField(opts);
                }
                var jvm_fieldset = $('#java_property');
                for (var key in data.jvm) {
                    if (key == "-Xmx")
                        continue
                    var opts = {
                        id: key,
                        name: key,
                        value: data.jvm[key],
                        parent: jvm_fieldset,
                        add_label: true
                    };
                    that.appendField(opts);
                }

                $('#-Xmx').val(data.jvm['-Xmx'])
                InpuChanged({});
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
        createField: function (parent) {
            var that = this;
            that.input_id += 1;
            var id = "beakerx_" + that.input_id + ": ";
            var opts = {
                id: id,
                name: "",
                value: "",
                parent: parent,
                add_label: false
            };
            that.appendField(opts);
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
                                .text('BeakerX')
                                .click(function (e) {
                                    window.history.pushState(null, null, '#beakerx');
                                    version.load();
                                    settings.load();

                                })
                        )
                );

                $("#jvm_settings_submit").click(function (event) {
                    event.preventDefault();

                    var val = $("#-Xmx").val();
                    if (val.length > 0 && !(/^\d+$/.test(val))) {
                        dialogs.show_Warning("'Heap Size' can contain only digits");
                        return
                    }
                    var other_property = $('#other_property input');
                    other_property.each(function () {
                        var value = $(this).val().trim();
                        if (val.length > 0 && !value.startsWith("-")) {
                            dialogs.show_Warning("All options should start with '-")
                            return
                        }
                    });
                    var payload = {};

                    var values = [];
                    other_property.each(function () {
                        var value = $(this).val().trim();
                        if (value.length > 0) {
                            values.push(value);
                        }
                    });
                    payload['other'] = values;
                    var java_values = {};
                    var $java_property = $('#java_property input');
                    $java_property.each(function () {
                        var value = $(this).val().trim();
                        if (value.length > 0) {
                            java_values[this.id] = value
                        }
                    });
                    var $default_property = $('#default_options input');
                    $default_property.each(function () {
                        var value = $(this).val().trim();
                        if (value.length > 0) {
                            java_values['-Xmx'] = value
                        }
                    });
                    payload['jvm'] = java_values;
                    settings.setVariables(JSON.stringify({'payload': payload}));
                    settings.load();
                });

                $("#add_property_jvm_sett").click(function (event) {
                    event.preventDefault();
                    var parent = $('#java_property');
                    dialogs.new_property_prompt(function (name, type) {
                        var opts = {
                            id: name,
                            name: name,
                            value: type,
                            parent: parent,
                            add_label: true
                        };
                        settings.appendField(opts);
                    });
                });

                $("#add_option_jvm_sett").click(function (event) {
                    event.preventDefault();
                    var fieldset = $('#other_property');
                    settings.createField(fieldset);
                });
                $('#-Xmx').keyup(InpuChanged);
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
