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
/**
 * M_menuPlugin
 * This module loads/unloads menu plugins and maintains the lists. It also serves as the single
 * point of contact of all menu plugins.
 */
(function() {
  'use strict';
  var module = angular.module('M_menuPlugin', [
    'M_bkUtils',
    'M_bkHelper'
  ]);
  module.factory('menuPluginManager', function(
      $http, bkUtils, bkHelper // bkHelper is used by plugins via eval right now
      ) {
    var DEFAULT_PRIORITY = 0;
    var menus = {};
    var plugins = [];
    var _menuIndex = 0;

    var _addMenu = function(url) {
      var index = _menuIndex++;
      var pluginObj = _.find(plugins, function(it) {
        return it.url === url;
      });
      var addItem = function(existingItems, newItem) {
        // check if an entry with same name already exist
        var existing = _(existingItems).find(function(it) {
          return it.name === newItem.name;
        });

        if (existing) {
          existing.priority = existing.priority ? existing.priority : DEFAULT_PRIORITY;
          newItem.priority = newItem.priority ? newItem.priority : DEFAULT_PRIORITY;
          if (existing.priority <= newItem.priority) {
            // replace in place
            existingItems.splice(existingItems.indexOf(existing), 1, newItem)
          } else {
            // ignore and warn
            console.warn("ignoring menu item " + newItem.name + "because priority="
                + newItem.priority + "is smaller than existing (" + existing.priority + ")");
          }
        } else {
          existingItems = existingItems.push(newItem);
        }
      };
      var add = function(toBeAdded) {
        if (!toBeAdded) {
          return;
        }
        var parentMenu = _.find(_.values(menus), function(it) {
          return it.name === toBeAdded.parent;
        });
        if (!parentMenu) {
          parentMenu = {
            name: toBeAdded.parent,
            items: []
          };
          menus[index + parentMenu.name] = parentMenu;
          //console.log("addMenu onReady index", index, "parentMenu", parentMenu.name);
        }
        if (toBeAdded.submenu) {
          var subMenu = _.find(parentMenu.items, function(it) {
            return it.name === toBeAdded.submenu;
          });
          if (!subMenu) {
            subMenu = {
              name: toBeAdded.submenu,
              type: "submenu",
              items: []
            };
            parentMenu.items.push(subMenu);
          } else {
            subMenu.disabled = false;
            subMenu.type = "submenu";
            if (!subMenu.items) {
              subMenu.items = [];
            }
          }
          toBeAdded.items.forEach(function(item) {
            addItem(subMenu.items, item);
          });
        } else {
          toBeAdded.items.forEach(function(item) {
            addItem(parentMenu.items, item);
          });
        }
      };
      if (!pluginObj) {
        pluginObj = {
          url: url,
          status: "not ready",
          onReady: function(toAdd) {
            if (this.status === "cancelled") {
              return;
            }
            this.status = "ready";
            if (_.isArray(toAdd)) {
              _.each(toAdd, add);
            } else {
              add(toAdd);
            }
            this.displayMessage = this.url + "(" + this.status + ")";
            bkUtils.refreshRootScope();
          },
          displayMessage: "loading from " + url
        };
        plugins.push(pluginObj);
        $http({method: 'GET', url: url})
            .success(function(ret) {
              // XXX should use generalUtils.js/loadJS
              eval(ret);
            })
            .error(function() {
              console.log("error", arguments);
            });
      }
    };
    return {
      clear: function() {
        _menuIndex = 0;
        menus = {};
        _.each(plugins, function(it) {
          it.status = "cancelled";
        });
        plugins = [];
      },
      reset: function() {
        this.clear();
        var self = this;
        $.get('/beaker/rest/util/getMenuPlugins')
            .done(function(menus) {
              menus.forEach(function(menu) {
                _addMenu(menu);
              });
            });
      },
      addControlMenu: function(url) {
        _addMenu(url);
        bkHelper.httpPost('/beaker/rest/util/addControlMenuPlugin', {"url": url});
      },
      addMenu: function(url) {
        _addMenu(url);
        bkHelper.httpPost('/beaker/rest/util/addMenuPlugin', {"url": url});
      },
      removeMenu: function(name) {
        if (menus[name]) {
          delete menus[name];
        }
      },
      addItem: function(parent, item, submenu) {
        var parent = _.find(_.values(menus), function(it) {
          return it.name === parent;
        });
        if (parent) {
          parent.items.push({name: item, type: "submenu", items: submenu});
        } else {
          //console.log("error: could not find menu item " + parent);
        }
      },
      clearItem: function(pname) {
        var parent = _.find(_.values(menus), function(it) {
          return it.name === pname;
        });

        if (parent) {
          parent.items = [];
        } else {
          //console.log("error: could not find menu item " + parent);
        }
      },
      getMenus: function() {
        return menus;
      },
      getMenuPlugins: function() {
        return plugins;
      }
    };
  });
})();
