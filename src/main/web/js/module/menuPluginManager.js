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
/**
 * M_menuPlugin
 * This module loads/unloads menu plugins and maintains the lists. It also serves as the single point of contact
 * of all menu plugins.
 */
(function () {
    'use strict';
    angular.module('M_menuPlugin', [
            'M_bkCore',
            'M_bkHelper'
        ])
        .factory('menuPluginManager', function (
            $http,
            bkUtils,
            bkHelper // bkHelper is used by plugins via eval right now
            )
        {
            var nameToUrl = {
                "Evaluators": "./plugin/menu/evaluators.js",
                "File": "./plugin/menu/file.js",
                "File_FileSys": "./plugin/menu/file_filesys.js",
                "Notebook": "./plugin/menu/notebook.js",
                "Debug": "./plugin/menu/debug.js",
                "Help": "./plugin/menu/help.js"
            };
            var menus = {};
            var plugins = [];
            var _menuIndex = 0;
            return {
                clear: function () {
                    _menuIndex = 0;
                    menus = {};
                    _.each(plugins, function (it) {
                        it.status = "cancelled";
                    });
                    plugins = [];
                },
                reset: function () {
                    this.clear();
                    this.addMenu("File");
                    this.addMenu("Notebook");
                    this.addMenu("File_FileSys");
                    this.addMenu("Evaluators");
                    this.addMenu("Help");

                    var self = this;
                    $.get('/beaker/rest/util/menuplugins')
                        .done(function (menus) {
                            menus.forEach(function (menu) {
                                self.addMenu(menu);
                            });
                        });
                },
                addMenu: function (nameOrUrl) {
                    var index = _menuIndex++;
                    //console.log("addMenu index", index, "nameOrUrl", nameOrUrl);
                    var url = nameToUrl[nameOrUrl] ? nameToUrl[nameOrUrl] : nameOrUrl;
                    var pluginObj = _.find(plugins, function (it) {
                        return it.url === url;
                    });
                    var add = function (toBeAdded) {
                        if (toBeAdded) {
                            var parentMenu = _.find(_.values(menus), function (it) {
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
                                var subMenu = _.find(parentMenu.items, function (it) {
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
                                subMenu.items = subMenu.items.concat(toBeAdded.items);
                            } else {
                                parentMenu.items = parentMenu.items.concat(toBeAdded.items);
                            }
                        }
                    };
                    if (!pluginObj) {
                        pluginObj = {
                            url: url,
                            status: "not ready",
                            onReady: function (toAdd) {
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
                            .success(function (ret) {
                                // XXX should use generalUtils.js/loadJS
                                eval(ret);
                            })
                            .error(function () {
                                console.log("error", arguments);
                            });
                    }
                },
                removeMenu: function (name) {
                    if (menus[name]) {
                        delete menus[name];
                    }
                },
                addItem: function (parent, item, submenu) {
                    var parent = _.find(_.values(menus), function (it) {
                        return it.name === parent;
                    });
                    if (parent) {
                        parent.items.push({name: item, type: "submenu", items: submenu});
                    } else
                        console.log("error: could not find menu item " + parent);
                },
                clearItem: function (parent) {
                    var parent = _.find(_.values(menus), function (it) {
                        return it.name === parent;
                    });
                    if (parent) {
                        parent.items = [];
                    } else {
                        console.log("error: could not find menu item " + parent);
                    }
                },
                getMenus: function () {
                    return menus;
                },
                getMenuPlugins: function () {
                    return plugins;
                }
            };
        });
})();
