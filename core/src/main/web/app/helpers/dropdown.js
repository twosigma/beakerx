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

// extension for Bootstrap dropdown.js
// navigation using left and right arrows
(function ($) {

  var KEY_CODES = {
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39
  };

  var getMenuToggle = function (el, prev) {
    var menu = el.closest('.dropdown');
    return menu[prev ? 'prev' : 'next']().find('[data-toggle="dropdown"]');
  };

  var getNextMenuToggle = function (el) {
    return getMenuToggle(el, false);
  };

  var getPrevMenuToggle = function (el) {
    return getMenuToggle(el, true);
  };

  var isSubmenu = function (el) {
    var parent = el.parents('ul');
    return parent.hasClass('dropdown-menu') && parent.parent().hasClass('dropdown-submenu');
  };

  var isSubmenuToggle = function (el) {
    return el.parent().hasClass('dropdown-submenu');
  };

  var openSubmenu = function (el) {
    var submenu = el.parent();
    submenu.addClass('hover');
    submenu.addClass('open');
    submenu.find('.dropdown-menu > li:first > a').trigger('focus');
  };

  var closeSubmenu = function (submenu) {
    submenu.removeClass('open');
    submenu.removeClass('hover');
  };

  var clearMenus = function () {
    closeSubmenu($('.dropdown-submenu'));
    $('.dropdown-menu a').blur();
  };

  var extensionMethods = {
    keydown: function (e) {
      var keyCode = e.keyCode;
      if (_.values(KEY_CODES).indexOf(keyCode) > -1) {
        e.preventDefault();
        e.stopPropagation();
        var jqEl = $(e.target);
        switch (event.keyCode) {
          case KEY_CODES.ARROW_LEFT:
            if (isSubmenu(jqEl)) {
              var submenu = jqEl.parents('.dropdown-submenu');
              closeSubmenu(submenu);
              submenu.find('a:first').trigger('focus');
            } else {
              getPrevMenuToggle(jqEl).trigger('click');
              clearMenus();
            }
            break;
          case KEY_CODES.ARROW_RIGHT:
            if(isSubmenuToggle(jqEl)){
              openSubmenu(jqEl);
            } else {
              getNextMenuToggle(jqEl).trigger('click');
            }
            break;
        }
      }
      return parentKeydown.apply(this, [e]);
    }
  };
  var parentKeydown = $.fn.dropdown.Constructor.prototype.keydown;
  $.extend(true, $.fn.dropdown.Constructor.prototype, extensionMethods);

  $(document)
    .off('keydown.bs.dropdown.data-api', '.dropdown-menu')
    .off('keydown.bs.dropdown.data-api', '[data-toggle="dropdown"]');
  $(document)
    .on('keydown.bs.dropdown.data-api', '[data-toggle="dropdown"]', $.fn.dropdown.Constructor.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', $.fn.dropdown.Constructor.prototype.keydown)
    .on('mouseenter.bs.dropdown.data-api', '.dropdown-menu, .dropdown', clearMenus);

})(jQuery);