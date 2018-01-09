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

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

define(function(require) {
  var _ = require('underscore');
  var $ = require('jquery');
  var Jupyter = require('base/js/namespace');
  var utils = require('base/js/utils');
  var urls = require('./urls');

  var $beakerxEl;
  var BeakerXTreeEvents = {
    INPUT_CHANGED: 'beakerx:tree:input_changed',
    SUBMIT_OPTIONS_START: 'beakerx:tree:submit_options_start',
    SUBMIT_OPTIONS_STOP: 'beakerx:tree:submit_options_stop',
  };

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
    return function(data, status, xhr) {
      if (data.error || data.message) {
        error_callback(xhr, status, data.error || data.message);
      } else {
        success_callback(data, status, xhr);
      }
    };
  }

  function MakeErrorCallback(title, msg) {
    return function(xhr, status, e) {
      console.warn(msg + ' ' + e);
    };
  }

  function InputChanged(e, triggerBeakerXEvent) {
    if (e && e.hasOwnProperty('key')) {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'Tab':
          return;
      }
    }
    if (false !== triggerBeakerXEvent) {
      $beakerxEl.trigger(BeakerXTreeEvents.INPUT_CHANGED, e);
    }
    var result = '';
    var errors = [];

    var val = $('#heap_GB').val().trim();
    try {
      if (val !== '') {
        var parsedVal = settings.normaliseHeapSize(val);
        result += '-Xmx' + parsedVal + ' ';
      }
    } catch (e) {
      errors.push(e.message);
    }

    $('#other_property').find('input').each(function() {
      var value = $(this).val().trim();
      result += value + ' ';
    });

    $('#properties_property').find('div').each(function() {
      var children = $($(this).children());
      var value = $(children.get(1)).val().trim();
      var name = $(children.get(0)).val().trim();

      var value_combined = '-D' + name + '=' + value;

      if (name.length > 0) {
        result += value_combined + ' ';
      }
    });

    $('#result').text(result);
    var errorsEl = $('#errors');
    errorsEl.empty();

    if (errors.length > 0) {
      errorsEl.append($('<span>').text(errors.join('\n')));
    }
  }

  var error_callback = MakeErrorCallback('Error', 'An error occurred while load Beakerx setings');
  var version = {
    versionBox: 'beakerx_info',
    load: function() {
      var that = this;

      function handle_response(data, status, xhr) {
        var version_element = $('#' + that.versionBox);

        var beakerx_logo_url = urls.base_url + 'nbextensions/beakerx/img/beakerx-logo-black-small.svg';
        var github_version_url = 'https://github.com/twosigma/beakerx/releases/tag/' + data.version;

        $(version_element)
          .empty()
          .append(
            $('<div>', {
              class: 'row',
            }).append(
              $('<a>', {
                class: 'beakerx_site_link',
                target: '_blank',
                href: 'http://BeakerX.com',
              }).append(
                $('<img>', {
                  src:  beakerx_logo_url,
                  title:  'BeakerX',
                  alt: 'BeakerX',
                })
              )
            ),

            $('<div>', {
              class: 'row',
              text: 'version '
            }).append(
              $('<a>', {
                target: '_blank',
                href: github_version_url,
                text: data.version
              })
            ),

            $('<div>', {
              class: 'row',
              text: 'from '
            }).append(
              $('<a>', {
                target: '_blank',
                href: 'http://opensource.twosigma.com/',
                text: 'Two Sigma Open Source',
              })
            )
          );
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
    randId: function() {
      return Math.random().toString(36).substr(2, 10);
    },
    appendField: function(opts) {
      var id = this.randId();
      var wrapper = $('<div>', {
        class: 'form-group form-inline bko-spacing',
        id: id
      });
      if (opts.add_label) {
        wrapper.append(this._createInput('name', opts.name));
      }
      wrapper
        .append(this._createInput('value', opts.value))
        .append(this._createRemoveButton(id));
      $(opts.parent).append(wrapper);
      InputChanged({}, false);
    },

    _createRemoveButton: function(id) {
      return $('<button>', {
        'type': 'button',
        'class': 'btn btn-default btn-sm',
        'data-original-title': 'remove row',
      }).append(
        $('<i>', {'class': 'fa fa-times'}
      )).click(function(event) {
        $('#' + id).remove();
        InputChanged();
      });
    },

    _createInput: function(placeholder, value) {
      return $('<input>', {
        class: 'form-control',
        id: this.randId(),
        placeholder: placeholder,
      }).val(value).keyup(InputChanged);
    },

    normaliseHeapSize: function(val) {
      if (val === '') {
        return '';
      }

      var parsedVal = parseFloat(val);

      if (isNaN(parsedVal) || !isFinite(val) || parsedVal <= 0) {
        throw new Error('Heap Size must be a positive decimal number.');
      }

      return (val % 1 === 0) ?
        parsedVal + 'g' :
        parseInt(parsedVal * 1024) + 'm';
    },

    load: function(payload) {
      if (payload === undefined) {
        payload = {
          properties: [],
          other: [],
        };
      }

      var that = this;

      function handle_response(response, status, xhr) {
        var data = response.beakerx.jvm_options;
        var other_fieldset = $('#other_property');
        var properties_fieldset = $('#properties_property');

        if (data.heap_GB !== payload.heap_GB) {
          $('#heap_GB').val(data.heap_GB);
        }

        for (var key in data.properties) {
          if (false === data.properties.hasOwnProperty(key)) {
            continue;
          }
          if (key === '-Xmx') {
            continue;
          }
          if (payload.properties.hasOwnProperty(key)) {
            continue;
          }
          that.appendField({
            name: data.properties[key].name,
            value: data.properties[key].value,
            parent: properties_fieldset,
            add_label: true
          });
        }

        for (var i = 0; i < data.other.length; i++) {
          if (-1 === payload.other.indexOf(data.other[i])) {
            that.appendField({
              value: data.other[i],
              parent: other_fieldset,
              add_label: false
            });
          }
        }

        InputChanged({}, false);
      }

      var settings = AjaxSettings({
        success: SuccessWrapper(handle_response, error_callback),
        error: error_callback
      });

      return utils.ajax(urls.api_url + 'settings', settings);
    },

    setVariables: function(data) {
      $beakerxEl.trigger(BeakerXTreeEvents.SUBMIT_OPTIONS_START);
      function handle_response(data, status, xhr) {
        $beakerxEl.trigger(BeakerXTreeEvents.SUBMIT_OPTIONS_STOP);
      }

      var settings = AjaxSettings({
        data: data || {},
        type: 'POST',
        success: SuccessWrapper(handle_response, error_callback),
        error: error_callback
      });

      return utils.ajax(urls.api_url + 'settings', settings);
    },

    createField: function(parent) {
      this.appendField({
        name: '',
        value: '',
        parent: parent,
        add_label: false
      });
    }
  };

  function load() {
    if (!Jupyter.notebook_list) {
      return;
    }
    utils.ajax(urls.static_url + 'settings_tab.html', {
      dataType: 'html',
      success: function(env_html, status, xhr) {
        _createBeakerxTab(env_html);
        $beakerxEl = $('#beakerx');
        _setupFormEvents();
        _setupContinuousSync();

        if (window.location.hash === '#beakerx') {
          $('#beakerx_tab').tab('show');
          version.load();
          settings.load();
        }
      }
    });
  }

  function _createBeakerxTab(tab_html) {
    $('.tab-content').append($(tab_html));
    $('#tabs').append(
      $('<li>').append(
        $('<a>', {
          id: 'beakerx_tab',
          href: '#beakerx',
          'data-toggle': 'tab',
          text: 'BeakerX'
        }).click(function(e) {
          if (window.location.hash === '#beakerx') {
            return;
          }

          window.history.pushState(null, null, '#beakerx');
          version.load();
          settings.load();
        })
      )
    );
  }
  function _setupFormEvents() {
    $('#add_property_jvm_sett').click(_onJvmPropertyAddClickedHandler);
    $('#add_option_jvm_sett').click(_onJvmOptionAddClickedHandler);
    $('#heap_GB').keyup(InputChanged);
  }
  function _setupContinuousSync() {
    $beakerxEl.on(BeakerXTreeEvents.INPUT_CHANGED, _.debounce(function(e) {
      _submitOptions();
    }, 1000));

    var $syncIndicator = $('#sync_indicator');
    $beakerxEl.on(BeakerXTreeEvents.SUBMIT_OPTIONS_START, function() {
      $syncIndicator.empty().append($('<i>', {
        class: 'saving fa fa-spinner'
      }));
    });
    $beakerxEl.on(BeakerXTreeEvents.SUBMIT_OPTIONS_STOP, function() {
      setTimeout(function() {
        $syncIndicator.empty().append($('<i>', {
          class: 'saved fa fa-check'
        }));
      }, 500);
    });
  }

  function _submitOptions() {
    var payload = {
      version: 2,
      jvm_options: {
        heap_GB: null,
        other: [],
        properties: [],
      },
    };
    var other_property = $('#other_property').find('input');

    other_property.each(function() {
      var value = $(this).val().trim();
      if (value.length > 0) {
        payload.jvm_options.other.push(value);
      }
    });

    var java_property = $('#properties_property').find('div');
    java_property.each(function() {
      var children = $($(this).children());
      var value = $(children.get(1)).val().trim();
      var name = $(children.get(0)).val().trim();

      if (name.length > 0) {
        payload.jvm_options.properties.push({
          'name': name,
          'value': value,
        });
      }

    });

    try {
      var val = $('#heap_GB').val().trim();
      settings.normaliseHeapSize(val);
      payload.jvm_options.heap_GB = parseFloat(val);

      settings.setVariables(JSON.stringify({
        'beakerx': payload
      }));
      settings.load(payload.jvm_options);
    } catch (e) {
    }

  }

  function _onJvmPropertyAddClickedHandler(event) {
    event.preventDefault();

    settings.appendField({
      name: '',
      value: '',
      parent: $('#properties_property'),
      add_label: true
    });
  }

  function _onJvmOptionAddClickedHandler(event) {
    event.preventDefault();
    settings.createField($('#other_property'));
  }

  return {
    load_ipython_extension: load
  };
});
