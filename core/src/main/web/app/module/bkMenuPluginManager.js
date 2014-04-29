/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

(function() {
  'use strict';
  var module = angular.module('M_bkMenuPluginManager', [
    'M_bkUtils'
  ]);

  var utils = (function() {
    var DEFAULT_PRIORITY = 0;
    // add newItem to itemsList, if an item with same name already exists in itemsList,
    // compare priorities, if newItem.priority > existingItem.priority, newItem will
    // replace the existingItem in place.
    var addMenuItem = function(itemsList, newItem) {
      // check if an entry with same name already exist
      var existingItem = _(itemsList).find(function(it) {
        return it.name === newItem.name;
      });
      if (existingItem) {
        existingItem.priority = existingItem.priority ? existingItem.priority : DEFAULT_PRIORITY;
        newItem.priority = newItem.priority ? newItem.priority : DEFAULT_PRIORITY;
        if (existingItem.priority <= newItem.priority) {
          // replace in place
          itemsList.splice(itemsList.indexOf(existingItem), 1, newItem);
        } else {
          // ignore and warn
          console.warn("ignoring menu item " + newItem.name + "because priority="
              + newItem.priority + "is smaller than existing (" + existingItem.priority + ")");
        }
      } else {
        itemsList = itemsList.push(newItem);
      }
    };
    return {
      addMenuItems: function (parentMenu, items) {
        if (_.isFunction(items)) {
          parentMenu.items = items;
        } else {
          items.forEach(function (item) {
            addMenuItem(parentMenu.items, item);
          });
        }
      }
    };
  })();

  module.factory('bkMenuPluginManager', function(bkUtils) {

    var menus = {};
    var loadedPlugins = [];
    var loadingInProgressPluginJobs = [];
    var pluginIndex = 0;

    var addPlugin = function(plugin, pluginIndex) {
      if (!plugin) {
        return;
      }

      var parentMenu = _.find(_.values(menus), function(it) {
        return it.name === plugin.parent;
      });

      if (!parentMenu) {
        parentMenu = {
          name: plugin.parent,
          items: []
        };
        menus[pluginIndex + parentMenu.name] = parentMenu;
      }

      if (!plugin.submenu) {
        utils.addMenuItems(parentMenu, plugin.items);
      } else {
        var subMenu = _.find(parentMenu.items, function(it) {
          return it.name === plugin.submenu;
        });
        if (!subMenu) {
          subMenu = {
            name: plugin.submenu,
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
        utils.addMenuItems(subMenu, plugin.items);
      }
    };

    var getLoadMenuPluginJob = function(url) {
      var cancelled = false;
      return {
        getUrl: function() {
          return url;
        },
        cancel: function () {
          cancelled = true;
        },
        isCancelled: function() {
          return cancelled;
        }
      };
    };
    var loadPlugin = function(job) {
      var deferred = bkUtils.newDeferred();
      bkUtils.loadModule(job.getUrl()).then(function(menuPlugin) {
        if (job.isCancelled()) {
          deferred.reject("cancelled");
          return;
        }
        menuPlugin.getMenuItems().then(function(menuItems) {
          if (job.isCancelled()) {
            deferred.reject("cancelled");
            return;
          }
          deferred.resolve(menuItems);
        });
      });
      return deferred.promise;
    };

    return {
      loadMenuPlugin: function(url) {
        var job = getLoadMenuPluginJob(url);
        var index = pluginIndex++;
        loadPlugin(job).then(function(plugin) {
          loadedPlugins.push({url: job.getUrl()});
          if (_.isArray(plugin)) {
            _(plugin).each(function (item, i) {
              addPlugin(item, index.toString() + i);
            });
          } else {
            addPlugin(plugin, index);
          }
        }, function(rejection) {
          console.error(rejection);
        }).finally(function() {
          loadingInProgressPluginJobs.splice(loadingInProgressPluginJobs.indexOf(job), 1);
        });
        loadingInProgressPluginJobs.push(job);
      },
      getMenus: function() {
        return menus;
      },
      clear: function() {
        menus = {};
        _(loadingInProgressPluginJobs).each(function(job) {
          job.cancel();
        });
        pluginIndex = 0;
      },
      getMenuPlugins: function() {
        return loadedPlugins;
      },
      getLoadingPlugins: function() {
        return loadingInProgressPluginJobs;
      }
    };
  });

})();