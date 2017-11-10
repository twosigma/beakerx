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
    var enable_button = true;

    var val = $("#heap_GB").val().trim();

    if (val.length > 0) {
      if (!isNaN(val)) {
        if (val % 1 === 0) {
          result += '-Xmx' + val + 'g '
        } else {
          result += '-Xmx' + parseInt(val * 1024) + 'm '
        }
      }
    }


    var other_property = $('#other_property input');
    other_property.each(function () {
      var value = $(this).val().trim();
      result += value + " ";

      if (value.length < 1) {
        enable_button = false
      }
    });

    var java_property = $('#properties_property div');

    java_property.each(function () {
      var children = $($(this).children());
      var value = $(children.get(1)).val().trim();
      var name = $(children.get(0)).val().trim();

      var value_combined = '-D' + name + '=' + value;

      if (name.length > 0) {
        result += value_combined + " ";
      }

      if (value_combined.length < 1) {
        enable_button = false
      }
    });

    $('#result').text(result);
    $('#errors').empty();

    if (val.length > 0 && isNaN(val)) {
      $('#errors').append($('<span>').text("Heap Size must be a decimal number."));
      enable_button = false;
    }

    if (enable_button) {
      $('#jvm_settings_submit').removeAttr('disabled');
    } else {
      $('#jvm_settings_submit').prop('disabled', true);
    }
  }

  var error_callback = MakeErrorCallback('Error', 'An error occurred while load Beakerx setings');
  var version = {
    versionBox: "beakerx_info",
    load: function () {
      var that = this;

      function handle_response(data, status, xhr) {
        var version_element = $('#' + that.versionBox);
        $(version_element).html("<a target=\"_blank\" href=\"http://BeakerX.com\">BeakerX</a>" +
          " from <a target=\"_blank\" href=\"http://opensource.twosigma.com/\">\n" +
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
    randId: function () {
      return Math.random().toString(36).substr(2, 10);
    },
    appendField: function (opts) {
      var id = this.randId();
      var input = $('<input>', {class: 'form-control'});
      var wrapper = $('<div>', {class: 'form-group form-inline bko-spacing'});
      wrapper.attr('id', id);
      var remove_button = $('<button>');
      remove_button.attr('type', 'button');
      remove_button.attr('class', 'btn btn-default btn-sm');
      remove_button.attr('data-original-title', 'remove row');
      remove_button.append($('<i>').attr('class', 'fa fa-times'));
      remove_button.click(function (event) {
        $('#' + id).remove();
        InpuChanged();
      });

      input.attr('id', this.randId());
      input.val(opts.value);
      input.attr('placeholder', 'value');
      input.keyup(InpuChanged);
      if (opts.add_label) {
        var label = $('<input>', {class: 'form-control'});
        label.val(opts.name);
        label.attr('id', this.randId());
        label.attr('placeholder', 'name');
        label.keyup(InpuChanged);
        wrapper.append(label);
      }
      wrapper.append(input);
      wrapper.append(remove_button);
      $(opts.parent).append(wrapper);
      InpuChanged({});
    },

    load: function () {
      var that = this;

      function handle_response(response, status, xhr) {
        var data = response.beakerx.jvm_options;
        $('#other_property').empty();
        $('#properties_property').empty();

        var other_fieldset = $('#other_property');
        for (var i = 0; i < data.other.length; i++) {
          var opts = {
            value: data.other[i],
            parent: other_fieldset,
            add_label: false
          };
          that.appendField(opts);
        }
        var properties_fieldset = $('#properties_property');
        for (var key in data.properties) {
          if (key == "-Xmx")
            continue;
          var opts = {
            name: key,
            value: data.properties[key],
            parent: properties_fieldset,
            add_label: true
          };
          that.appendField(opts);
        }

        $('#heap_GB').val(data['heap_GB']);
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
      var opts = {
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

          var payload = {};
          payload['jvm_options'] = {};
          var values = [];
          var other_property = $('#other_property input');
          other_property.each(function () {
            var value = $(this).val().trim();
            if (value.length > 0) {
              values.push(value);
            }
          });
          payload['jvm_options']['other'] = values;
          var java_values = {};
          var java_property = $('#properties_property div');
          java_property.each(function () {
            var children = $($(this).children());
            var value = $(children.get(1)).val().trim();
            var name = $(children.get(0)).val().trim();

            if (name.length > 0) {
              java_values[name] = value
            }

          });
          var default_property = $('#default_options input');
          default_property.each(function () {
            var value = $(this).val().trim();
            if (value.length > 0) {
              payload['jvm_options']['heap_GB'] = value
            }
          });
          payload['jvm_options']['properties'] = java_values;
          settings.setVariables(JSON.stringify({'beakerx': payload}));
          settings.load();
        });

        $("#add_property_jvm_sett").click(function (event) {
          event.preventDefault();
          var parent = $('#properties_property');

          var opts = {
            name: "",
            value: "",
            parent: parent,
            add_label: true
          };

          settings.appendField(opts);
        });

        $("#add_option_jvm_sett").click(function (event) {
          event.preventDefault();
          var fieldset = $('#other_property');
          settings.createField(fieldset);
        });
        $('#heap_GB').keyup(InpuChanged);
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
