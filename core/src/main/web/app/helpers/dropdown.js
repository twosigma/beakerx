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

  var toggle = '[data-toggle="dropdown"]';

  var getMenuToggle = function (el, prev) {
    var menu = el.closest('.dropdown');
    return menu[prev ? 'prev' : 'next']().find(toggle);
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
  };

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  var extensionMethods = {
    keydown: function (e) {
      if (!/(37|39|38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
      e.preventDefault();
      e.stopPropagation();
      var keyCode = e.keyCode;
      if (_.values(KEY_CODES).indexOf(keyCode) > -1) {
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
      } else {
        ///// copy from Bootstrap dropdown.js/////
        var $this = $(this);

        if ($this.is('.disabled, :disabled')) return

        var $parent  = getParent($this)
        var isActive = $parent.hasClass('open')

        if (!isActive && e.which != 27 || isActive && e.which == 27) {
          if (e.which == 27) $parent.find(toggle).trigger('focus')
          return $this.trigger('click')
        }

        ///// fix for navigation through items containing submenus /////
        var desc = ' li:not(.disabled):visible a:not(.disabled):visible';
        ///// fix for navigation through items containing submenus /////

        var $items = $parent.find('.dropdown-menu' + desc)

        if (!$items.length) return

        var index = $items.index(e.target)

        if (e.which == 38 && index > 0)                 index--         // up
        if (e.which == 40 && index < $items.length - 1) index++         // down
        if (!~index)                                    index = 0

        $items.eq(index).trigger('focus')
        ///// copy from Bootstrap dropdown.js /////
      }
    }
  };
  $.extend(true, $.fn.dropdown.Constructor.prototype, extensionMethods);

  $(document)
    .off('keydown.bs.dropdown.data-api', '.dropdown-menu')
    .off('keydown.bs.dropdown.data-api', toggle);
  $(document)
    .on('keydown.bs.dropdown.data-api', toggle, $.fn.dropdown.Constructor.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', $.fn.dropdown.Constructor.prototype.keydown)
    .on('mouseenter.bs.dropdown.data-api', '.dropdown-menu, .dropdown', clearMenus);
  
  //dropdown behaviour correction

  $(document)
  .on('mouseover', '.dropdown-menu', function() {
    $(this).css('display', 'block');
    if ($(this).closest('.dropdown').find(this).length>0){
      $(this).siblings('.dropdown-menu').css('display', 'block');
    }
  })
  .on('mouseover', '.dropdown-menu > li > a', function() {
    if ($(this).siblings('.dropdown-menu').size() == 0){
      var removeStyleFrom = $(this).parent().siblings().find('.dropdown-menu:visible');
      if (removeStyleFrom.length>0){
        bkHelper.timeout(function() {
          removeStyleFrom.removeAttr('style');
        }, 300);
      }
    } else if ($(this).siblings('.dropdown-menu').size() != 0){
      $(this).parent().siblings('.dropdown-submenu').find('.dropdown-menu').removeAttr('style');
      $(this).siblings('.dropdown-menu:has(*)').css('display', 'block');
    }
  })
  .on('click', 'html, .dropdown > a, button[data-toggle="dropdown"]', function(event) {
    var target = event && event.target,
      className = target.className && typeof target.className === 'string' ? target.className : '',
      isAllowed = className.indexOf('bko-column-header-menu') === -1;
    if(isAllowed){
      $('.dropdown-menu').removeAttr('style');
    }
  });

})(jQuery);