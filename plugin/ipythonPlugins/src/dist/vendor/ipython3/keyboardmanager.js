// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 *
 *
 * @module keyboardmanager
 * @namespace keyboardmanager
 * @class KeyboardManager
 */

define('ipython3_keyboardmanager', [
    'ipython3_namespace',
    'ipython3_utils',
    'ipython3_keyboard'
], function(IPython, utils, keyboard) {
    "use strict";
    
    // Main keyboard manager for the notebook
    var keycodes = keyboard.keycodes;

    var KeyboardManager = function (options) {
        /**
         * A class to deal with keyboard event and shortcut
         *
         * @class KeyboardManager
         * @constructor
         * @param options {dict} Dictionary of keyword arguments :
         *    @param options.events {$(Events)} instance 
         *    @param options.pager: {Pager}  pager instance
         */
        this.mode = 'command';
        this.enabled = true;
        this.pager = options.pager;
        this.quick_help = undefined;
        this.notebook = undefined;
        this.last_mode = undefined;
        this.bind_events();
        this.env = {pager:this.pager};
        this.actions = options.actions;
        Object.seal(this);
    };

    KeyboardManager.prototype.bind_events = function () {
        var that = this;
        $(document).keydown(function (event) {
            if(event._ipkmIgnore===true||(event.originalEvent||{})._ipkmIgnore===true){
                return false;
            }
            return that.handle_keydown(event);
        });
    };

    KeyboardManager.prototype.set_notebook = function (notebook) {
        this.notebook = notebook;
        this.actions.extend_env({notebook:notebook});
    };
    
    KeyboardManager.prototype.set_quickhelp = function (notebook) {
        this.actions.extend_env({quick_help:notebook});
    };


    KeyboardManager.prototype.handle_keydown = function (event) {
        /**
         *  returning false from this will stop event propagation
         **/

        if (event.which === keycodes.esc) {
            // Intercept escape at highest level to avoid closing
            // websocket connection with firefox
            event.preventDefault();
        }
        
        if (!this.enabled) {
            if (event.which === keycodes.esc) {
                this.notebook.command_mode();
                return false;
            }
            return true;
        }

        return true;
    };

    KeyboardManager.prototype.edit_mode = function () {
        this.last_mode = this.mode;
        this.mode = 'edit';
    };

    KeyboardManager.prototype.command_mode = function () {
        this.last_mode = this.mode;
        this.mode = 'command';
    };

    KeyboardManager.prototype.enable = function () {
        this.enabled = true;
    };

    KeyboardManager.prototype.disable = function () {
        this.enabled = false;
    };

    KeyboardManager.prototype.register_events = function (e) {
        var that = this;
        var handle_focus = function () {
            that.disable();
        };
        var handle_blur = function () {
            that.enable();
        };
        e.on('focusin', handle_focus);
        e.on('focusout', handle_blur);
        // TODO: Very strange. The focusout event does not seem fire for the 
        // bootstrap textboxes on FF25&26...  This works around that by 
        // registering focus and blur events recursively on all inputs within
        // registered element.
        e.find('input').blur(handle_blur);
        e.on('DOMNodeInserted', function (event) {
            var target = $(event.target);
            if (target.is('input')) {
                target.blur(handle_blur);
            } else {
                target.find('input').blur(handle_blur);    
            }
          });
        // There are times (raw_input) where we remove the element from the DOM before
        // focusout is called. In this case we bind to the remove event of jQueryUI,
        // which gets triggered upon removal, iff it is focused at the time.
        // is_focused must be used to check for the case where an element within
        // the element being removed is focused.
        e.on('remove', function () {
            if (utils.is_focused(e[0])) {
                that.enable();
            }
        });
    };


    // For backwards compatibility.
    IPython.KeyboardManager = KeyboardManager;

    return {'KeyboardManager': KeyboardManager};
});
