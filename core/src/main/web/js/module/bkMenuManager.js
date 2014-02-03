(function (angular) {
    'use strict';
    var module = angular.module('M_bkMenuManager', []);

    module.factory("menuUtils", function () {

        var DEFAULT_PRIORITY = 0;

        return {
            addItem: function (existingItems, newItem) {
                // check if an entry with same name already exist
                var existing = _(existingItems).find(function (it) {
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
            },
            removeItemAtIndex: function (existingItems, index) {
                return existingItems.splice(index, 1);
            },
            removeItem: function (existingItems, item) {
                var index = existingItems.indexOf(item);
                return this.removeItemAtIndex(index);
            },
            removeItemWithName: function (existingItems, itemName) {
                var item = _.find(existingItems, function (it) {
                    return it.name === itemName;
                });
                return this.removeItem(item);
            }
        };
    });

    module.factory("beakerMenu", function () {
        // menu items that shared across the apps (control panel, notebook app)
        var _menuItems = [];
        return {
            getMenuItems: function () {
                return _menuItems;
            }
        };
    });

    module.factory("bkControlMenu", function () {
        // menu items for control panel
        var _menuItems = [];
        return {
            getMenuItems: function () {
                return _menuItems;
            }
        };
    });

    module.factory("bkAppMenu", function () {
        // menu items for the notebook app
        var _menuItems = [];
        return {
            getMenuItems: function () {
                return _menuItems;
            }
        };
    });


})(angular);