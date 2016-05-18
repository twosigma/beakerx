// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


var Jupyter = Jupyter || {};

var jprop = function (name, module_path) {
  Object.defineProperty(Jupyter, name, {
    get: function () {
      console.warn('accessing `' + name + '` is deprecated. Use `require("' + module_path + '")`');
      return require(module_path);
    },
    enumerable: true,
    configurable: false
  });
};

var jglobal = function (name, module_path) {
  Object.defineProperty(Jupyter, name, {
    get: function () {
      console.warn('accessing `' + name + '` is deprecated. Use `require("' + module_path + '").' + name + '`');
      return require(module_path)[name];
    },
    enumerable: true,
    configurable: false
  });
};

define('base/js/namespace', function () {
  "use strict";

  // expose modules

  jprop('utils', 'base/js/utils')

  //Jupyter.load_extensions = Jupyter.utils.load_extensions;
  //
  jprop('security', 'base/js/security');
  jprop('keyboard', 'base/js/keyboard');
  jprop('dialog', 'base/js/dialog');
  jprop('mathjaxutils', 'notebook/js/mathjaxutils');


  //// exposed constructors
  jglobal('CommManager', 'services/kernels/comm')
  jglobal('Comm', 'services/kernels/comm')

  jglobal('NotificationWidget', 'base/js/notificationwidget');
  jglobal('Kernel', 'services/kernels/kernel');
  jglobal('Session', 'services/sessions/session');
  jglobal('LoginWidget', 'auth/js/loginwidget');
  jglobal('Page', 'base/js/page');

  // notebook
  jglobal('TextCell', 'notebook/js/textcell');
  jglobal('OutputArea', 'notebook/js/outputarea');
  jglobal('KeyboardManager', 'notebook/js/keyboardmanager');
  jglobal('Completer', 'notebook/js/completer');
  jglobal('Notebook', 'notebook/js/notebook');
  jglobal('Tooltip', 'notebook/js/tooltip');
  jglobal('Toolbar', 'notebook/js/toolbar');
  jglobal('SaveWidget', 'notebook/js/savewidget');
  jglobal('Pager', 'notebook/js/pager');
  jglobal('QuickHelp', 'notebook/js/quickhelp');
  jglobal('MarkdownCell', 'notebook/js/textcell');
  jglobal('RawCell', 'notebook/js/textcell');
  jglobal('Cell', 'notebook/js/cell');
  jglobal('MainToolBar', 'notebook/js/maintoolbar');
  jglobal('NotebookNotificationArea', 'notebook/js/notificationarea');
  jglobal('NotebookTour', 'notebook/js/tour');
  jglobal('MenuBar', 'notebook/js/menubar');

  // tree
  jglobal('SessionList', 'tree/js/sessionlist');

  Jupyter.version = "4.2.0";
  Jupyter._target = '_blank';
  Jupyter.notebook = {
    keyboard_manager: {
      register_events: function () {
      },
      actions: {
        register: function () {
        }
      }
    },
    events: {
      on: function () { },
      off: function () { },
      trigger: function () { }
    },
    metadata: {},
    get_cells: function () {
      return [];
    },
    get_msg_cell: function (msg_id) {
      var cell = {
        cell_type: 'code',
        fake_beaker_cell: true,
        ipy_output: $('.ipy-output[data-msg-id=' + msg_id + '] .widget-subarea'),
        notebook: {
          events: {
            on: function () {
            }
          }
        }
      };
      var that = this;
      var selector = '.ipy-output[data-msg-id=' + msg_id + ']';
      cell.output_area_options = {
        selector: selector,
        prompt_area: false,
        events: that.events,
        keyboard_manager: that.keyboard_manager
      };
      cell.widgetarea = {
        display_widget_view: function (view_promise) {
          var that = this;
          var timeoutPromise = new Promise(function (resolve) {
            bkHelper.timeout(function () {
              if (cell) {
                requirejs(["notebook/js/outputarea"], function (outputarea) {
                  cell.output_area = new outputarea.OutputArea(cell.output_area_options);
                });
              }
              resolve($(selector));
            }, 250);
          });
          return timeoutPromise.then(function (widget_area) {
            that.widget_area = widget_area;
            return view_promise.then(function (view) {
              that.widget_area.show();
              that.widget_area.append(view.el);
              return view;
            });
          });
        }
      };
      return cell;
    },
    find_cell_index: function (cell) {
      return 0;
    }
  };
  Jupyter.notification_area = {
    new_notification_widget: function () {
    }
  };
  Jupyter.menubar = {
    actions: {
      register: function () {
      }
    }
  };
  window.Jupyter = Jupyter;
  return Jupyter;
});

// deprecated since 4.0, remove in 5+
var IPython = Jupyter;
