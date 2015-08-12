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
(function() {(window["JST"] = window["JST"] || {})["controlpanel/controlpanel"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<header ng-class="{\'electron-hide\': getElectronMode()}" class="navbar-fixed-top bkr">\n  <div class="navbar navbar-inverse bkr">\n    <a class="navbar-brand bkr" href="/beaker/#/control" ng-click="gotoControlPanel($event)" eat-click="">\n      <img src="app/images/beaker_icon@2x.png" class="bkr">\n    </a>\n    <a class="navbar-left bkr" href="/beaker/#/control" ng-click="gotoControlPanel($event)" eat-click="">\n      Beaker\n    </a>\n  </div>\n  <div class="navbar navbar-default bkr">\n    <ul class="nav navbar-nav bkr">\n      <li class="dropdown bkr" ng-repeat="m in getMenus()">\n        <a href="#" role="button" class="dropdown-toggle {{m.id}} bkr" data-toggle="dropdown">{{m.name}}</a>\n        <bk-dropdown-menu menu-items="m.items" class="bkr"></bk-dropdown-menu>\n      </li>\n      <p ng-if="disconnected" class="navbar-text text-danger right bkr">\n        offline\n      </p>\n    </ul>\n  </div>\n</header>\n\n<div ng-class="{\'electron-mode\': getElectronMode()}" class="dashboard container-fluid bkr">\n  <div class="row bkr">\n    <div class="col-md-12 bkr">\n\n      <h1 class="bkr">Beaker <small class="bkr">The data scientist\'s laboratory</small></h1>\n\n      <div ng-if="isSessionsListEmpty()" class="empty-session-prompt bkr">\n          <p class="bkr">Click below to get started coding in Python, R, JavaScript, Julia, Scala, Java, Groovy, and Ruby. <br class="bkr">\n            Beginners should check out the <strong class="bkr">Help → Tutorial</strong>.</p>\n      </div>\n\n      <div ng-hide="isSessionsListEmpty()" class="bkr">\n        <h4 class="open-notebook-headline bkr">Open Notebooks</h4>\n        <bk-control-panel-session-item class="open-notebooks bkr"></bk-control-panel-session-item>\n      </div>\n\n      <div class="row new-notebook bkr">\n        <div class="col-xs-3 bkr">\n          <a class="btn btn-default text-center btn-block bkr" ng-click="newNotebook()">New Default Notebook</a>\n        </div>\n        <div class="col-xs-3 bkr">\n          <a class="btn btn-default text-center btn-block new-empty-notebook bkr" ng-click="newEmptyNotebook()">New Empty Notebook</a>\n        </div>\n        <div class="col-xs-6 bkr">\n          <div class="faux-drop-zone bkr">\n            Or drag a .bkr file anywhere on this page to import\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n  <div class="row bkr" ng-show="isAllowAnonymousTracking == null">\n    <div class="col-md-6 well bkr">\n      <p class="bkr">\n        <b class="bkr">Track anonymous usage info?</b>\n      </p>\n\n      <p class="bkr">\n        We would like to collect anonymous usage info to help improve our product. We may share this information\n        with other parties, including, in the spirit of open software, by making it publicly accessible.<br class="bkr">\n      </p>\n\n      <p class="bkr">\n        <a target="_blank" href="http://beakernotebook.com/privacy" class="bkr">Privacy policy</a> - <a class="cursor_hand bkr" ng-click="showWhatWeLog()">What will we log?</a>\n      </p>\n      <div class="btn-group bkr">\n        <button class="btn btn-default bkr" ng-click="isAllowAnonymousTracking = false">No, don\'t track</button>\n        <button class="btn btn-active bkr" ng-click="isAllowAnonymousTracking = true">Yes, track my info</button>\n      </div>\n    </div>\n\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["controlpanel/table"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<ul class="notebook-dashboard-list bkr">\n  <li class="session clearfix bkr" ng-repeat="session in sessions | orderBy:&quot;openedDate&quot;:true">\n    <div class="pull-left bkr">\n      <div class="caption bkr" ng-click="open(session)">{{getCaption(session)}}</div>\n      <div class="light path bkr" ng-if="getDescription(session)">\n        {{getDescription(session)}}\n      </div>\n    </div>\n    <a class="btn btn-default btn-sm pull-right close-session bkr" ng-click="close(session)">Close</a>\n    <div class="open-date light pull-right bkr">\n      <span class="bkr">Opened on</span>\n      {{session.openedDate | date:\'medium\'}}\n    </div>\n  </li>\n</ul>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["controlpanel/what_we_log"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<div class="modal-header bkr">\n  <h3 class="bkr">What will we log</h3>\n</div>\n\n<div class="modal-body bkr">\n  <p class="bkr">\n    <b class="bkr">What we log:</b>\n  </p>\n  <p class="bkr">We use Google Analytics to collect usage info. Google Analytics collects data such as how long you spend in Beaker, what browser you\'re using, and your geographic region.</p>\n  <p class="bkr">In addition to the standard Google Analytics collection, we\'re logging how many times you run cells in each language and what types of notebooks you open (local .bkr file, remote .ipynb, et cetera).</p>\n  <p class="bkr">\n    <b class="bkr">What we <i class="bkr">don\'t</i> log:</b>\n  </p>\n  <p class="bkr">We will never log any of the code you run or the names of your notebooks.</p>\n  <p class="bkr">Please see our <a target="_blank" href="http://beakernotebook.com/privacy" class="bkr">privacy policy</a> for more information.</p>\n</div>\n\n<div class="modal-footer bkr">\n   <button class="btn btn-default bkr" ng-click="close()">Got it</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["helpers/plugin-load-error"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header bkr">\n  <h1 class="bkr">Language Error</h1>\n</div>\n<div class="modal-body bkr">\n\n<p class="bkr">Failed to start ' +
((__t = (pluginId)) == null ? '' : __t) +
'.</p>\n\n<p class="bkr">Did you install it according to the instructions\non <a target="_blank" href="http://beakernotebook.com/getting-started#' +
((__t = (pluginId)) == null ? '' : __t) +
'" class="bkr">BeakerNotebook.com</a>?\n</p>\n\n<p class="bkr">If you already have it, then <a target="_blank" href="https://github.com/twosigma/beaker-notebook/wiki/Language-Preferences" class="bkr">edit\nyour preferences file</a> to help Beaker find it on your system, and\nthen restart Beaker and try again.\n</p>\n\n<p class="bkr">Any other languages in your notebook should still work.</p>\n\n</div>\n\n<div class="modal-footer bkr bkr">\n  <button class="beaker-btn active bkr" ng-click="$close()">OK</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/dropdown"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<ul class="dropdown-menu bkr" role="menu" aria-labelledby="dropdownMenu">\n  <bk-dropdown-menu-item ng-repeat="item in getMenuItems() | filter:isHidden | orderBy:\'sortorder\'" item="item" class="bkr"></bk-dropdown-menu-item>\n</ul>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/dropdown_item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<li ng-class="getItemClass(item)" class="bkr">\n  <a href="#" tabindex="-1" ng-click="runAction(item)" ng-class="getAClass(item)" id="{{item.id}}" title="{{item.tooltip}}" eat-click="" class="bkr">\n    <i class="glyphicon glyphicon-ok bkr" ng-show="isMenuItemChecked(item)"></i>\n    {{getName(item)}}\n  </a>\n</li>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/fileactiondialog"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header bkr">\n  <h1 class="bkr">{{actionName}}</h1>\n</div>\n<div class="modal-body bkr">\n  <p class="bkr">Path: <input name="{{inputId}}" ng-model="result" class="bkr"></p>\n</div>\n<div class="modal-footer bkr">\n  <button ng-click="close()" class="btn bkr">Cancel</button>\n  <button ng-click="close(result)" class="btn btn-primary bkr">{{actionName}}</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/opennotebook"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header fixed bkr">\n   <h1 class="bkr">{{ getStrategy().title || \'Open\'}}<span ng-show="getStrategy().treeViewfs.showSpinner" class="bkr"><i class="fa fa-refresh fa-spin bkr"></i></span></h1>\n   <div class="filters-and-sorts bkr">\n     <div class="dropdown bkr">\n       <button class="btn btn-default btn-xs dropdown-toggle bkr" type="button" data-toggle="dropdown">\n         Sort by: {{getStrategy().treeViewfs.getPrettyOrderBy()}}\n       </button>\n       <ul class="dropdown-menu bkr" role="menu">\n         <li class="bkr"><a href="javascript:;" ng-click="getStrategy().treeViewfs.setOrderBy({ orderBy: \'uri\', reverse: false })" class="bkr">Name</a></li>\n         <li class="bkr"><a href="javascript:;" ng-click="getStrategy().treeViewfs.setOrderBy({ orderBy: \'modified\', reverse: true })" class="bkr">Date Modified</a></li>\n       </ul>\n     </div>\n   </div>\n</div>\n<div class="modal-body fixed bkr">\n   <tree-view rooturi="/" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n   <tree-view rooturi="' +
__e( homedir ) +
'" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n</div>\n<div class="modal-footer fixed bkr">\n   <div class="text-left bkr">Enter a file path (e.g. /Users/...) or URL (e.g. http://...):</div>\n   <p class="bkr"><input class="form-control bkr" ng-model="getStrategy().input" ng-keypress="getStrategy().close($event, close)" focus-start=""></p>\n   <span style="float:left" ng-if="getStrategy().ext === undefined" class="bkr">\n     <input type="checkbox" style="vertical-align:top" ng-model="getStrategy().treeViewfs.applyExtFilter" class="bkr">\n     <span ng-click="getStrategy().treeViewfs.applyExtFilter = !getStrategy().treeViewfs.applyExtFilter" class="bkr">show ' +
((__t = ( extension )) == null ? '' : __t) +
' files only</span>\n   </span>\n   <button ng-click="close()" class="btn btn-default bkr">Cancel</button>\n   <button ng-click="close(getStrategy().getResult())" class="btn btn-primary modal-submit bkr">{{ getStrategy().closebtn || \'Open\'}}</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/savenotebook"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header fixed bkr">\n  <h1 class="bkr">Save <span ng-show="getStrategy().treeViewfs.showSpinner" class="bkr">\n  <i class="fa fa-refresh fa-spin bkr"></i></span></h1>\n  <div class="filters-and-sorts bkr">\n    <div class="dropdown bkr">\n      <button class="btn btn-default btn-xs dropdown-toggle bkr" type="button" data-toggle="dropdown">\n        Sort by: {{getStrategy().treeViewfs.getOrderBy()}}\n      </button>\n      <ul class="dropdown-menu bkr" role="menu">\n        <li class="bkr"><a href="javascript:;" ng-click="getStrategy().treeViewfs.setOrderBy({ orderBy: \'uri\', reverse: false })" class="bkr">Name</a></li>\n        <li class="bkr"><a href="javascript:;" ng-click="getStrategy().treeViewfs.setOrderBy({ orderBy: \'modified\', reverse: true })" class="bkr">Date Modified</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n<div class="modal-body fixed bkr" style="padding-bottom: 106px"> \n  <tree-view rooturi="/" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n  <tree-view rooturi="' +
__e( homedir ) +
'" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n</div>\n<div class="modal-footer fixed bkr" style="height: 106px"> \n  <p class="bkr">\n    <input id="saveAsFileInput" class="left bkr" ng-model="getStrategy().input" ng-keyup="getStrategy().manualEntry()" ng-keypress="getStrategy().close($event, close)" focus-start="">\n    <i class="new-folder bk-icon bkr" data-toggle="tooltip" title="Make new directory ({{getStrategy().input}})" ng-click="getStrategy().newFolder(getStrategy().input)"></i>\n  </p>\n  <span style="float:left" class="bkr">{{getStrategy().getResult()}}</span>\n  <button ng-click="close()" class="btn btn-default bkr">Cancel</button>\n  <button ng-click="close(getStrategy().getResult())" class="btn btn-primary bkr" ng-disabled="getStrategy().getSaveBtnDisabled()">Save</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/dialogs/changeserver"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<title class="bkr">Change Beaker Server</title>\n<div class="bkr-dialog bkr" ng-controller="changeServer">\n  <form novalidate="" class="change-server-form bkr" ng-submit="change(address)">\n    <input class="server-input bkr" type="text" ng-model="address" placeholder="E.g. http://127.0.0.1:8801/">\n    <a class="btn btn-default text-center bkr server-dialog-button bkr" ng-click="change(address)">Change Beaker Server</a>\n    <a class="btn btn-default text-center bkr server-dialog-button bkr" ng-click="newBackend()">New Local Backend</a>\n  </form>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/dialogs/codecelloptions"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header bkr">\n  <h1 class="bkr">Code Cell Options</h1>\n</div>\n<div class="modal-body bkr">\n  <div class="form-horizontal bkr">\n    <div class="form-group bkr">\n      <label for="cell-id" class="control-label col-sm-2 bkr">Id</label>\n      <div ng-class="isError() ? \'col-sm-7\' : \'col-sm-10\'" class="bkr"><input class="form-control bkr" ng-model="cellName"></div>\n      <div class="col-sm-3 bkr" ng-if="isError()"><span class="help-inline bkr" style="color:red">{{getNameError()}}</span></div>\n    </div>\n    <div class="form-group bkr">\n      <label for="cell-tags" class="control-label col-sm-2 bkr">Tags</label>\n      <div ng-class="isError() ? \'col-sm-7\' : \'col-sm-10\'" class="bkr"><input class="form-control bkr" ng-model="cellTags"></div>\n      <div class="col-sm-3 bkr" ng-if="isError()"><span class="help-inline bkr" style="color:red">{{getTagError()}}</span></div>\n    </div>\n    <div class="form-group bkr">\n      <div class="col-sm-offset-2 col-sm-10 bkr">\n        <div class="checkbox bkr">\n          <label class="bkr">\n            <input type="checkbox" ng-model="initializationCell" class="bkr">\n            Initialization Cell\n          </label>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="modal-footer bkr">\n  <button ng-click="close()" class="btn btn-default bkr">Cancel</button>\n  <button ng-click="save()" class="btn btn-primary bkr" ng-class="saveDisabled() &amp;&amp; \'disabled\'">Save</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/dashboard/app"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<bk-control-panel class="bkr"></bk-control-panel>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/mainapp/app"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<bk-main-app session-id="{{sessionId}}" new-session="{{newSession}}" import="{{isImport}}" open="{{isOpen}}" notebook="notebook" class="bkr">\n</bk-main-app>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/mainapp/mainapp"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<header class="navbar-fixed-top bkr" ng-class="{\'electron-hide\': getElectronMode()}">\n  <div class="navbar navbar-inverse bkr">\n    <a class="navbar-brand bkr" href="/beaker/#/control" ng-click="gotoControlPanel($event)" eat-click="">\n      <img src="app/images/beaker_icon@2x.png" class="bkr">\n    </a>\n    <a class="navbar-left bkr" href="/beaker/#/control" ng-click="gotoControlPanel($event)" eat-click="">\n      Beaker\n    </a>\n    <p class="navbar-text bkr">{{pathname()}}</p>\n    <span class="navbar-text bkr" ng-if="loading || !!loadingmsg">\n      <i class="fa fa-refresh fa-spin text-white bkr"></i>\n    </span>\n    <div class="navbar-text text-white loadingmsg bkr" ng-if="loading || !!loadingmsg">\n      {{loadingmsg}}\n    </div>\n  </div>\n  <div class="navbar navbar-default bkr">\n    <ul class="nav navbar-nav bkr">\n      <li class="dropdown bkr" ng-repeat="m in getMenus()">\n        <a href="#" role="button" class="dropdown-toggle bkr" ng-class="m.classNames" data-toggle="dropdown">{{m.name}}</a>\n        <bk-dropdown-menu menu-items="m.items" class="bkr"></bk-dropdown-menu>\n      </li>\n    </ul>\n    <p ng-if="isEdited()" class="navbar-text text-success pull-right bkr">edited</p>\n    <p ng-if="isDisconnected()" class="navbar-text pull-right bkr">\n      <a href="javascript:;" class="navbar-link text-danger bkr" ng-click="promptToSave()" eat-click="">{{getOffineMessage()}}</a>\n    </p>\n  </div>\n</header>\n\n<div ng-class="{\'electron-mode\': getElectronMode()}" class="container-fluid notebook-container bkr">\n  <div class="row bkr">\n    <div class="col-md-12 bkr">\n      <bk-notebook set-bk-notebook="setBkNotebook(bkNotebook)" is-loading="loading" class="bkr"></bk-notebook>\n    </div>\n  </div>\n\n  \n  <div style="height: 300px" class="bkr"></div>\n\n</div>\n\n\n<script type="text/ng-template" id="section-cell.html" class="bkr">\n  <bk-section-cell></bk-section-cell>\n</script>\n<script type="text/ng-template" id="text-cell.html" class="bkr">\n  <div class="text-cell">\n    <bk-text-cell></bk-text-cell>\n  </div>\n</script>\n<script type="text/ng-template" id="markdown-cell.html" class="bkr">\n  <bk-markdown-cell></bk-markdown-cell>\n</script>\n<script type="text/ng-template" id="code-cell.html" class="bkr">\n  <bk-code-cell cellmodel="cellmodel" cellmenu="cellview.menu" index="$index"></bk-code-cell>\n</script>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/pluginmanager/pluginmanager"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="bkr">\n  <div class="modal-header fixed bkr" style="height: 69px">\n    <h1 class="bkr">Language Manager</h1>\n  </div>\n  <div class="modal-body fixed modal-large plugin-manager bkr" style="padding-top: 69px; padding-bottom: 68px">\n    <div class="languages clearfix bkr">\n      <button class="btn btn-default language-icon-button bkr" ng-click="evalTabOp.togglePlugin(pluginName)" ng-repeat="(pluginName, pluginStatus) in evalTabOp.getEvaluatorStatuses()" ng-class="pluginName">\n        <span ng-class="\'plugin-\' + pluginStatus" class="plugin-status bkr">●</span>\n        <bk-language-logo bg-color="{{getEvaluatorDetails(pluginName).bgColor}}" name="{{getEvaluatorDetails(pluginName).shortName}}" fg-color="{{getEvaluatorDetails(pluginName).fgColor}}" border-color="{{getEvaluatorDetails(pluginName).borderColor}}" class="bkr">\n        </bk-language-logo>\n\n        {{pluginName}}\n      </button>\n      <button ng-click="evalTabOp.showURL = !evalTabOp.showURL" class="btn btn-default bkr" ng-if="allowFromUrl()">\n        From URL...\n      </button>\n    </div>\n    <div ng-show="evalTabOp.showURL" class="input-group addeval bkr">\n      <input type="text" bk-enter="evalTabOp.togglePlugin()" ng-model="evalTabOp.newPluginNameOrUrl" class="bkr">\n      <button class="btn btn-default bkr" ng-click="evalTabOp.togglePlugin()">Add Plugin from URL</button>\n    </div>\n    <div ng-show="evalTabOp.showSecurityWarning" class="bkr">\n      <div class="modal-body error-title body-box bkr">\n        <p class="bkr">Are you sure you want to load this plugin from an external URL?</p>\n        <button class="btn btn-default right bkr" ng-click="evalTabOp.showSecurityWarning = false; evalTabOp.showURL=false; evalTabOp.newPluginNameOrUrl=&quot;&quot;">Cancel</button>\n        <button class="btn btn-default right bkr" ng-click="evalTabOp.showSecurityWarning = false; evalTabOp.forceLoad = true; evalTabOp.togglePlugin()">OK</button>\n      </div>\n      <p class="bkr"><br class="bkr"></p>\n    </div>\n    <div ng-show="evalTabOp.showWarning" class="bkr">\n      <div class="modal-body error-title body-box bkr">\n        <p class="bkr">Cannot remove plugin currently used by a code cell in the notebook.<br class="bkr">\n        Delete those cells and try again.</p>\n        <button class="btn btn-default right bkr" ng-click="evalTabOp.showWarning = false">OK</button>\n      </div>\n      <p class="bkr"><br class="bkr"></p>\n    </div>\n    <tabset class="bkr">\n      <tab ng-repeat="(evaluatorName, evaluator) in evalTabOp.getEvaluatorsWithSpec()" heading="{{evaluatorName}}" class="bkr">\n        <bk-plugin-manager-evaluator-settings class="bkr"></bk-plugin-manager-evaluator-settings>\n      </tab>\n    </tabset>\n  </div>\n  <div class="modal-footer fixed bkr" style="height: 68px"> \n    <button class="btn btn-primary language-manager-close-button bkr" ng-click="doClose()">Close</button>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/pluginmanager/pluginmanager_evaluator_settings"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<div ng-repeat="property in properties" class="form-group language-option property clearfix bkr">\n  <label class="bkr">{{ property.name }}</label>\n  <textarea class="form-control bkr" ng-model="evaluator.settings[property.key]"></textarea>\n  <button class="btn btn-default pull-right set bkr" ng-click="set(property.key)">Set</button>\n</div>\n<div ng-repeat="action in actions" class="action language-option clearfix bkr">\n  <button class="btn btn-default bkr" ng-click="evaluator.perform(action.key)">{{ action.name }}</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/cell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-class="isLocked() &amp;&amp; \'locked\'" class="bkcell {{cellmodel.type}} bkr">\n  <div ng-if="cellmodel.input.hidden &amp;&amp; cellmodel.type==\'code\' &amp;&amp; !isLocked()" class="mini-cell-stats advanced-hide bkr">\n    {{cellmodel.evaluator}} &nbsp;\n    ({{cellmodel.lineCount}} lines)\n  </div>\n  <div ng-if="isDebugging()" class="bkr">\n    [Debug]: cell Id = {{cellmodel.id}}, parent = {{getParentId()}}, level = {{cellmodel.level}}\n    <a ng-click="toggleShowDebugInfo()" ng-hide="isShowDebugInfo()" class="bkr">show more</a>\n    <a ng-click="toggleShowDebugInfo()" ng-show="isShowDebugInfo()" class="bkr">show less</a>\n    <div collapse="!isShowDebugInfo()" class="bkr">\n      <pre class="bkr">{{cellmodel | json}}</pre>\n    </div>\n  </div>\n  <div ng-include="getTypeCellUrl()" class="bkr"></div>\n  <div class="toggle-menu bkr">\n    <div class="dropdown dropdown-promoted bkr" data-toggle="dropdown" style="float: right">\n      <div class="cell-menu-item cell-dropdown dropdown-toggle bkr" title="cell menu"></div>\n      <bk-dropdown-menu menu-items="cellview.menu.items" submenu-classes="drop-left" class="bkr"></bk-dropdown-menu>\n    </div>\n    <div class="cell-menu-item move-cell-down bkr" ng-click="moveCellDown()" ng-class="moveCellDownDisabled() &amp;&amp; \'disabled\'" title="move cell down"></div>\n    <div class="cell-menu-item move-cell-up bkr" ng-click="moveCellUp()" ng-class="moveCellUpDisabled() &amp;&amp; \'disabled\'" title="move cell up"></div>\n    <div class="cell-menu-item delete-cell bkr" ng-click="deleteCell()" title="delete cell"></div>\n    <div class="cell-menu-item expand-contract bkr" ng-if="cellmodel.type==\'code\'" ng-click="toggleCellInput()" ng-class="cellmodel.input.hidden &amp;&amp; \'collapsed\'" title="hide/show cell input"></div>\n    <div class="dropdown dropdown-promoted advanced-only bkr" ng-if="isCodeCell()" style="float: right">\n      <div ng-if="!cellmodel.evaluatorReader" class="bkr">\n        <div class="loading-spinner rotating bkr bkr"></div>\n      </div>\n      <bk-code-cell-input-menu ng-if="cellmodel.evaluatorReader" class="bkr"></bk-code-cell-input-menu>\n    </div>\n    <div class="cell-menu-item evaluate bkr" ng-if="isMarkdownCell()" title="run cell"></div>\n    <div class="cell-menu-item evaluate bkr" ng-click="evaluate($event)" ng-if="isCodeCell()" title="run cell"></div>\n    <div class="cell-status-item loading-state advanced-hide bkr" ng-if="isCodeCell() &amp;&amp; !cellmodel.evaluatorReader">Initializing {{cellmodel.evaluator}}\n      <div class="loading-spinner rotating bkr"></div>\n    </div>\n  </div>\n  <bk-new-cell-menu config="newCellMenuConfig" ng-class="isLarge &amp;&amp; \'large\'" is-large="isLarge" ng-if="newCellMenuConfig.isShow()" class="bkr"></bk-new-cell-menu>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<div class="evaluator bkr" evaluator-type="{{ cellmodel.evaluator }}" ng-class="{\n  \'evaluator-ready\': cellmodel.evaluatorReader,\n  \'locked\': isLocked(),\n  \'empty\': isEmpty()\n  }">\n  <div class="bkcell code-cell-area bkr">\n    <div class="code-cell-input bkr" ng-click="backgroundClick($event)" ng-hide="isLocked()" ng-class="{\'input-hidden\': cellmodel.input.hidden}">\n      <div class="code-cell-input-content bkr">\n        <bk-code-cell-input-menu class="advanced-hide bkr"></bk-code-cell-input-menu>\n        <div ng-click="$event.stopPropagation()" class="bkr">\n          <div class="bkcelltextarea bkr">{{cellmodel.input.body}}</div>\n        </div>\n        <a href="#" class="btn btn-default evaluate-script advanced-hide bkr" ng-click="evaluate($event)" eat-click="">\n          {{ isJobCancellable() ? \'Stop\' : \'Run\' }}\n        </a>\n      </div>\n    </div>\n    <div ng-if="hasOutput()" class="code-cell-output bkr" ng-class="{\n      \'no-output\': isHiddenOutput(),\n      \'input-hidden\': cellmodel.input.hidden,\n      \'output-hidden\': cellmodel.output.hidden,\n      \'error\': isError()\n      }">\n      <h6 ng-if="outputTitle()" class="bkr">{{outputTitle()}}</h6>\n      <bk-code-cell-output model="cellmodel.output" evaluator-id="{{ cellmodel.evaluator }}" cell-id="{{ cellmodel.id }}" class="bkr">\n      </bk-code-cell-output>\n    </div>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecellinputmenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="dropdown bk-code-cell-input bkr">\n  <a class="dropdown-toggle cell-evaluator-menu bkr" data-toggle="dropdown">\n    <bk-language-logo name="{{getEvaluator().shortName}}" bg-color="{{getEvaluator().bgColor}}" fg-color="{{getEvaluator().fgColor}}" border-color="{{getEvaluator().borderColor}}" class="bkr">\n    </bk-language-logo>\n    <b class="advanced-hide bkr">{{cellmodel.evaluator}}</b>\n  </a>\n  <ul class="dropdown-menu inputcellmenu bkr" role="menu" aria-labelledby="dLabel">\n    <li ng-repeat="(evaluatorName, evaluator) in getEvaluators()" class="bkr">\n      <a tabindex="-1" href="#" ng-click="setEvaluator(evaluatorName)" class="{{evaluatorName}}-menuitem bkr" eat-click="">\n        {{evaluatorName}}\n        <i class="fa fa-check bkr" ng-show="getShowEvalIcon(evaluatorName)"></i>\n      </a>\n    </li>\n  </ul>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecelloutput"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="toggle-menu bkr">\n  <div class="dropdown dropdown-promoted bkr" style="float: right">\n    <div class="cell-menu-item cell-dropdown dropdown-toggle bkr" data-toggle="dropdown" title="cell output menu" ng-show="isShowMenu()"></div>\n    <bk-code-cell-output-menu model="outputCellMenuModel" class="bkr"></bk-code-cell-output-menu>\n  </div>\n  <div class="cell-menu-item expand-contract bkr" ng-click="toggleExpansion()" ng-class="!isExpanded() &amp;&amp; \'collapsed\'" title="hide/show cell output" ng-show="isShowMenu()"></div>\n</div>\n<bk-output-display ng-show="isShowOutput()" model="outputDisplayModel" type="{{ getOutputDisplayType() }}" class="bkr">\n</bk-output-display>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecelloutputmenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<ul class="dropdown-menu dropdown-menu-form bkr" role="menu" aria-labelledby="dLabel">\n  <li class="dropdown-submenu drop-left bkr">\n    <a tabindex="-1" class="bkr">Displays ({{model.getSelectedDisplay()}})</a>\n    <ul class="dropdown-menu bkr">\n      <li ng-repeat="d in model.getApplicableDisplays()" class="bkr">\n        <a tabindex="-1" href="#" ng-click="model.setSelectedDisplay(d)" eat-click="" class="bkr">\n          <i class="glyphicon glyphicon-ok bkr" ng-show="d === model.getSelectedDisplay()"></i>{{ d }}\n        </a>\n      </li>\n    </ul>\n  </li>\n  <li ng-repeat="item in model.getAdditionalMenuItems()" class="{{getItemClass(item)}} bkr">\n    <a tabindex="-1" ng-click="item.action()" class="bkr">{{getItemName(item)}}</a>\n    <ul class="dropdown-menu bkr">\n      <li ng-repeat="subitem in getSubItems(item)" class="bkr">\n        <a ng-click="subitem.action()" class="{{getSubmenuItemClass(subitem)}} bkr" title="{{subitem.tooltip}}">{{subitem.name}}</a>\n      </li>\n    </ul>\n  </li>\n</ul>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/markdown-editable"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-show="mode==\'edit\'" ng-click="$event.stopPropagation()" class="codemirror-wrapper bkr">\n  <textarea class="bkr"></textarea>\n</div>\n<div ng-click="edit($event)" class="markup bkr" ng-show="mode==\'preview\'"></div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/markdowncell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<bk-markdown-editable cellmodel="cellmodel" class="bkr"></bk-markdown-editable>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/newcellmenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="btn-group new-cell bkr" ng-mouseleave="hideOpenMenus()">\n  <button ng-click="newDefaultCodeCell()" class="btn btn-primary insert-cell bkr" ng-class="!isLarge &amp;&amp; \'btn-xs\'">\n    <span ng-class="!isLarge &amp;&amp; \'advanced-hide\'" class="bkr">\n      Insert {{defaultEvaluator()}} Cell\n    </span>\n    <span ng-if="!isLarge" class="plus advanced-only bkr">+<i class="fa fa-sort-down fa-hidden bkr"></i></span>\n  </button>\n  <button class="btn btn-primary dropdown-toggle bkr" ng-class="!isLarge &amp;&amp; \'btn-xs\'" data-toggle="dropdown" data-target=".code-dropdown">code <i class="fa fa-sort-down bkr"></i></button>\n  <ul class="dropdown-menu code-dropdown bkr" role="menu">\n    <li ng-repeat="(key, value) in getEvaluators()" class="bkr">\n      <a ng-click="newCodeCell(key)" class="bkr">{{key}}</a>\n    </li>\n    <li class="bkr">\n       <a ng-click="showPluginManager()" class="bkr">Other languages...</a>\n    </li>\n  </ul>\n  <ul class="dropdown-menu section-menu bkr" role="menu">\n    <li ng-repeat="level in getLevels()" class="bkr">\n      <a ng-click="newSectionCell(level)" class="bkr">Level {{level}}</a>\n    </li>\n  </ul>\n  <button class="btn btn-primary insert-text bkr" ng-class="!isLarge &amp;&amp; \'btn-xs\'" ng-click="newMarkdownCell()">text<i class="fa fa-sort-down fa-hidden bkr"></i></button>\n  <button class="btn btn-primary insert-text bkr" ng-class="!isLarge &amp;&amp; \'btn-xs\'" data-toggle="dropdown" data-target=".section-menu">section <i class="fa fa-sort-down bkr"></i></button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/notebook"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-class="{\'advanced-mode\': isAdvancedMode(), \'hierarchy-mode\': isHierarchyEnabled()}" class="bkr">\n  <bk-new-cell-menu ng-show="!isLocked() &amp;&amp; !isLoading" ng-class="isEmpty() &amp;&amp; \'only-child large\'" is-large="isEmpty()" config="newCellMenuConfig" class="bkr"></bk-new-cell-menu>\n  <div class="bkcell bkr">\n    <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell" index="$index" cellid="{{cell.id}}" class="bkr">\n    </bk-cell>\n    <div class="dropdown bkcellmenu bkr" style="position: fixed; z-index: 99">\n      <a class="dropdown-toggle bkr" data-toggle="dropdown"></a>\n      <bk-dropdown-menu menu-items="menuItems" submenu-classes="pull-left" class="bkr"></bk-dropdown-menu>\n    </div>\n  </div>\n  <div ng-show="isShowingOutput()" class="outputlogbox bkr"></div>\n  <div ng-show="isShowingOutput()" class="outputlogcontainer bkr">\n    <div class="outputloghandle bkr"></div>\n    <div class="btn-toolbar bkr">\n      <div class="btn-group alt-controls bkr">\n        <a class="btn btn-default btn-sm bkr" ng-click="clearOutput()">Clear</a>\n        <a class="btn btn-default btn-sm hide-output bkr" ng-click="hideOutput()">Hide</a>\n      </div>\n      <div class="btn-group bkr" data-toggle="buttons-checkbox">\n        <a class="btn bkr" ng-class="showStdOut ? \'btn-primary\' : \'btn-default\'" ng-click="toggleStdOut($event)">stdout</a>\n        <a class="btn bkr" ng-class="showStdErr ? \'btn-primary\' : \'btn-default\'" ng-click="toggleStdErr($event)">stderr</a>\n      </div>\n    </div>\n    <div class="outputlogout bkr" ng-show="showStdOut" ng-class="!showStdErr &amp;&amp; \'single\'">\n      <label class="output-label bkr">stdout:</label>\n      <div class="outputlogbox outputlogstdout bkr">\n        <div ng-repeat="line in outputLog track by $index" class="bkr">\n          <div ng-show="line.type == \'text\' || line.type == \'stdout\'" class="bkr">\n            <pre class="prelog bkr">{{line.line}}</pre>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="outputlogerr bkr" ng-show="showStdErr" ng-class="!showStdOut &amp;&amp; \'single\'">\n      <label class="output-label bkr">stderr:</label>\n      <div class="outputlogbox bkr">\n        <div ng-repeat="line in outputLog track by $index" class="bkr">\n          <div ng-show="line.type == \'stderr\'" class="bkr">\n            <pre class="prelog bkr">{{line.line}}</pre>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-if="isDebugging()" class="bkr">\n    <button ng-click="showDebugTree = !showDebugTree" class="bkr">Toggle debug Tree</button>\n    <div collapse="!showDebugTree" class="bkr">\n      <pre class="bkr">{{getNotebookModel() | json}}</pre>\n    </div>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/output-progress"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-if="elapsed > 200" class="bkr">\n  <div style="float: left" class="bkr">\n    <i class="fa fa-cog fa-spin fa-lg bkr"></i>\n    <span class="bkr"> &nbsp; Elapsed: {{getElapsedTime()}} &nbsp; </span>\n    <i class="fa fa-times-circle fa-lg text-danger cursor_hand bkr" ng-click="cancel()" ng-if="isCancellable()" title="cancel"></i>\n  </div>\n  <div class="progress bkr" style="width: 150px; float: left; margin-left: 30px" ng-if="hasProgressBar()">\n\t<div class="progress-bar bkr" role="progressbar" aria-valuenow="{{getProgressBar()}}" aria-valuemin="0" aria-valuemax="100" style="width: {{getProgressBar()}}%">\n\t    {{getProgressBar()}} %\n\t</div>\n  </div>\n  <div ng-if="hasMessage()" style="float: left; margin-left: 30px" class="bkr">{{getMessage()}}</div><br class="bkr">\n</div>\n<div ng-if="hasPayload() || hasOutputData()" class="bkr">\n  <hr class="bkr">\n  <bk-code-cell-output model="outputDisplayModel" class="bkr"></bk-code-cell-output>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/output-results"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<ul ng-if="hasOutputData()" class="list-unstyled bkr">\n  <li ng-repeat="i in outputdata" class="bkr">\n    <pre ng-class="i.type === &quot;out&quot; ? &quot;text-info&quot; : &quot;text-warning&quot;" class="bkr">{{ i.value }}</pre>\n  </li>\n</ul>\n<bk-code-cell-output ng-if="hasPayload()" model="payload" class="bkr"></bk-code-cell-output>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/sectioncell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-class="{branch: isBranch(), leaf: isLeaf()}" class="bkr">\n  <div ng-hide="cellmodel.hideTitle" class="bkr">\n    <div class="section-connector bkr" ng-hide="!isAntecedentSectionSiblingPrimogeniture()"></div>\n    <span class="bksectiontoggleplus section-toggle bkr" ng-click="toggleShowChildren()" ng-hide="isShowChildren()">\n      <i class="fa fa-plus bkr"></i>\n    </span>\n    <span class="bksectiontoggleminus section-toggle bkr" ng-click="toggleShowChildren()" ng-show="isShowChildren()">\n      <i class="fa fa-minus bkr"></i>\n    </span>\n    <p class="depth-indicator bkr">{{getFullIndex()}}</p>\n    <bk-markdown-editable class="section{{cellmodel.level}} bk-section-title bkr" cellmodel="cellmodel"></bk-markdown-editable>\n  </div>\n  <bk-new-cell-menu size="xs" config="newCellMenuConfig" ng-if="newCellMenuConfig.isShow()" class="bkr"></bk-new-cell-menu>\n  <div ng-show="isShowChildren()" class="section-children bkr">\n    <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell" index="$index" cellid="{{cell.id}}" class="bkr"></bk-cell>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/textcell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="textcell-wrapper bkr" ng-click="edit()">\n  <div class="editable-text bkr" contenteditable="{{ isEditable() ? true : false }}" style="min-height: 14px; min-width: 14px"></div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/publication/publish"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="bkr">\n  <div class="modal-header bkr">\n    <div class="sign-in bkr" ng-if="!isSignedIn()">\n      <h1 class="error bkr" ng-if="error">{{error}}</h1>\n      <h1 ng-if="!error" class="bkr">Sign in to Beaker Publications</h1>\n      <form ng-submit="signIn()" class="bkr">\n        <input ng-model="user.email" type="email" name="email" placeholder="Email" class="field bkr">\n        <input ng-model="user.password" type="password" required="" name="password" placeholder="Password" class="field bkr">\n        <input type="submit" value="Sign in" class="btn btn-primary bkr">\n      </form>\n      <div class="sign-up bkr">\n        No account?\n        <a target="_blank" href="https://pub.beakernotebook.com/#/sign_up" class="bkr">Create New Account</a>\n      </div>\n    </div>\n    <div class="publish bkr" ng-if="isSignedIn()">\n      <h1 class="bkr">{{title}}</h1>\n      <form ng-submit="publishAction()" class="bkr">\n        <label for="category" class="full bkr">Notebook name others will see when you publish:</label>\n        <input ng-model="model.name" required="" type="text" class="field bkr">\n        <label for="category" class="full bkr">Notebook description:</label>\n        <textarea ng-model="model.description" required="" rows="3" class="field bkr"></textarea>\n        <label for="category" class="full bkr">Category that describes your notebook:</label>\n        <select ng-model="model[\'category-id\']" required="" ng-options="category[\'public-id\'] as category.name for category in categories" name="category" ng-class="{error: error}" ng-change="refresh()" class="field bkr">\n          <option value="" class="bkr">Select a category</option>\n        </select>\n        <ul ng-if="published" class="publication-details bkr">\n          <li class="bkr">\n            <div class="time-label bkr">Published</div>\n            <div class="value publish-time bkr">{{model[\'created-at\'] | date:\'short\'}}</div>\n          </li>\n          <li class="bkr">\n            <div class="time-label bkr">Last updated</div>\n            <div class="value update-time bkr">{{model[\'updated-at\'] | date:\'short\'}}</div>\n          </li>\n        </ul>\n        <div class="actions bkr">\n          <div class="warning bkr" ng-if="edited">Warning, your notebook has unsaved changes.</div>\n          <input ng-if="!saving" type="submit" ng-value="saveButton" class="btn btn-primary bkr">\n          <input ng-if="!saving &amp;&amp; published" type="button" class="btn bkr" value="Delete" ng-click="delete()" formnovalidate="">\n          <input ng-if="!saving" type="button" class="btn bkr" value="Cancel" ng-click="close()" formnovalidate="">\n        </div>\n      </form>\n    </div>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["bko-tabledisplay/output-table-options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header fixed bkr" style="height: 69px">\n  <h1 class="bkr">Table Options</h1>\n</div>\n<div class="modal-body fixed modal-large bkr" style="padding-top: 69px; padding-bottom: 68px">\n\n <tabset class="bkr">\n\t<tab heading="Table Formatting" class="bkr">\n\n\t\t<div class="row bkr">\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \tUse pagination:\n\t\t\t</div>\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t<input type="checkbox" ng-model="pagination.use" class="bkr">\n\t\t    </div>\n    \t</div>\n\t\t<div class="row bkr">\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \tMax rows to display:\n\t\t\t</div>\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t<input type="number" ng-model="pagination.rowsToDisplay" ng-disabled="pagination.use" class="bkr">\n\t\t    </div>\n    \t</div>\n\t\t<div class="row bkr">\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t#Columns to fix left:\n\t\t\t</div>\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t<input type="number" ng-model="pagination.fixLeft" class="bkr">\n\t\t    </div>\n    \t</div>\n\t\t<div class="row bkr">\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t#Columns to fix right:\n\t\t\t</div>\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t<input type="number" ng-model="pagination.fixRight" class="bkr">\n\t\t    </div>\n    \t</div>\n\t</tab>\n\t<tab heading="Cell Formatting" class="bkr">\n\t  <div class="row bkr">\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Column</strong></h2>\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Display Type</strong></h2>\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Show (<a tabindex="-1" href="#" ng-click="displayAll()" eat-click="" class="bkr">All</a>)</strong></h2>\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Alignment</strong></h2>\n\t    </div>\n\t  </div>\n\n\t  <div class="row bkr" ng-repeat="menuidx in getCellIdx">\n\t    <div class="col-xs-3 bkr">\n\t      {{ getCellNam[menuidx] }}\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <select class="form-control bkr" ng-model="getCellDisp[menuidx]" ng-options="item.type as item.name for item in getCellDispOptsF(menuidx)"></select>\n\t\t</div>   \n\t    <div class="col-xs-3 bkr">\n\t      <input type="checkbox" ng-model="getCellSho[menuidx]" class="bkr">\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t\t\t<input type="radio" ng-model="getCellAlign[menuidx]" value="L" class="bkr">&nbsp;<span class="glyphicon glyphicon-align-left bkr" aria-hidden="true"></span>&nbsp;\n  \t\t\t<input type="radio" ng-model="getCellAlign[menuidx]" value="C" class="bkr">&nbsp;<span class="glyphicon glyphicon-align-center bkr" aria-hidden="true"></span>&nbsp;\n\t\t\t<input type="radio" ng-model="getCellAlign[menuidx]" value="R" class="bkr">&nbsp;<span class="glyphicon glyphicon-align-right bkr" aria-hidden="true"></span>&nbsp;\n\t    </div>\n\t  </div>\n   </tab>\n </tabset>\n\n\n\n</div>\n\n<div class="modal-footer fixed bkr bkr" style="height: 68px"> \n  <button class="btn btn-default bkr bkr" ng-click="cancelOptionsDialog()">Cancel</button>\n  <button class="btn btn-primary modal-submit bkr bkr" ng-click="closeOptionsDialog()">OK</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["bko-tabledisplay/output-table"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="dropdown dtmenu clearfix bkr" style="float: left; z-index: 10" ng-if="renderMenu">\n   <a class="dropdown-toggle bkr" data-toggle="dropdown" ng-click="menuToggle()">\n   <span class="bko-menu bkr" aria-hidden="true"></span>\n   </a>\n   <ul class="dropdown-menu bkr" role="menu" submenu-classes="drop-right" aria-labelledby="dLabel">\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doSelectAll()" id="dt-select-all" eat-click="" class="bkr">Select All</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doDeselectAll()" id="dt-deselect-all" eat-click="" class="bkr">Deselect All</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doReverseSelection()" id="dt-reverse-selection" eat-click="" class="bkr">Reverse Selection</a></li>\n     <li class="bkr">&nbsp;</li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doCopyToClipboard()" id="{{id}}_dt_copy" eat-click="" class="bkr">Copy to Clipboard</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doCSVExport(false)" id="dt-save-all" eat-click="" class="bkr">Save All as CSV</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doCSVExport(true)" id="dt-save-selected" eat-click="" class="bkr">Save Selected as CSV</a></li>\n     <li class="bkr">&nbsp;</li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="openOptionsDialog()" id="dt-options" eat-click="" class="bkr">Options...</a></li>\n   </ul>\n </div>\n\n<table cellpadding="0" class="display bkr" border="0" cellspacing="0" width="10%" id="{{id}}"></table>';

}
return __p
}})();
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
 * bk.ControlPanel
 * - This is the module for the 'control panel' section of beaker
 * - In the control panel, users get a list of opened sessions and is able to
 * (re)open one in bkApp.
 */
(function() {
  'use strict';
  var module = angular.module('bk.controlPanel', [
    'bk.utils',
    'bk.core',
    'bk.session',
    'bk.menuPluginManager',
    'bk.recentMenu',
    'bk.evaluatePluginManager',
    'bk.electron']);
})();

/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function() {
  'use strict';
  var module = angular.module('bk.controlPanel');

  module.directive('bkControlPanel', function(
        bkUtils, bkCoreManager, bkSession, bkMenuPluginManager, bkTrack, bkElectron, $location) {
    return {
      restrict: 'E',
      template: JST['controlpanel/controlpanel'](),
      controller: function($scope) {
        document.title = 'Beaker';
        var _impl = {
          name: 'bkControlApp',
          showAnonymousTrackingDialog: function() {
            $scope.$evalAsync(function() {
              $scope.isAllowAnonymousTracking = null;
            });
          }
        };

        bkCoreManager.setBkAppImpl(_impl);

        $scope.gotoControlPanel = function(event) {
          if (bkUtils.isMiddleClick(event)) {
            bkHelper.openWindow($location.absUrl() + '/beaker', 'control-panel');
          } else {
            location.reload();
          }
        };

        // setup menus
        bkMenuPluginManager.clear();
        if (window.beaker === undefined || window.beaker.isEmbedded === undefined) {
          bkUtils.httpGet('../beaker/rest/util/getControlPanelMenuPlugins')
            .success(function(menuUrls) {
              menuUrls.forEach(function(url) {
                bkMenuPluginManager.loadMenuPlugin(url);
              });
            });
        } else {
          var menues = window.beaker.getControlMenuItems();
          bkMenuPluginManager.attachMenus(menues);
        }

        $scope.getMenus = function() {
          return bkMenuPluginManager.getMenus();
        };

        if (bkUtils.isElectron){
          window.addEventListener('focus', function() {
            bkElectron.updateMenus(bkMenuPluginManager.getMenus());
          });
        }

        // actions for UI
        $scope.newNotebook = function() {
          bkCoreManager.newSession(false);
        };
        $scope.newEmptyNotebook = function() {
          bkCoreManager.newSession(true);
        };
        $scope.openTutorial = function() {
          bkCoreManager.openNotebook('config/tutorial.bkr', undefined, true);
        };

        $scope.getElectronMode = function() {
          return bkUtils.isElectron;
        }

        // ask for tracking permission
        $scope.isAllowAnonymousTracking = false;
        if ((window.beaker === undefined || window.beaker.isEmbedded === undefined) && bkTrack.isNeedPermission()) {
          bkUtils.httpGet('../beaker/rest/util/getPreference', {
            'preference': 'allow-anonymous-usage-tracking'
          }).then(function(allow) {
            switch (allow.data) {
              case 'true':
                $scope.isAllowAnonymousTracking = true;
                break;
              case 'false':
                $scope.isAllowAnonymousTracking = false;
                break;
              default:
                $scope.isAllowAnonymousTracking = null;
            }
          });
        } else {
          $scope.isAllowAnonymousTracking = true;
        }
        if (window.beaker === undefined || window.beaker.isEmbedded === undefined) {
          $scope.$watch('isAllowAnonymousTracking', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              var allow = null;
              if (newValue) {
                allow = 'true';
                bkTrack.enable();
              } else if (newValue === false) {
                allow = 'false';
                bkTrack.disable();
              }
              bkUtils.httpPost('../beaker/rest/util/setPreference', {
                preferencename: 'allow-anonymous-usage-tracking',
                preferencevalue: allow
              });
            }
          });
        }
        $scope.showWhatWeLog = function() {
          return bkCoreManager.showModalDialog(
              function() {},
              JST['controlpanel/what_we_log']()
              );
        };

        var keydownHandler = function(e) {
          if (e.ctrlKey && e.shiftKey && (e.which === 78)) { // Ctrl + Shift + n
            bkUtils.fcall(function() {
              $scope.newNotebook();
            });
            return false;
          } else if (e.ctrlKey && (e.which === 78)) { // Ctrl + n
            bkUtils.fcall(function() {
              $scope.newEmptyNotebook();
            });
            return false;
          } else if (e.metaKey && !e.ctrlKey && e.shiftKey && (e.which === 78)) { // Cmd + Shift + n
            bkUtils.fcall(function() {
              $scope.newNotebook();
            });
            return false;
          } else if (e.metaKey && !e.ctrlKey && (e.which === 78)) { // Cmd + n
            bkUtils.fcall(function() {
              $scope.newEmptyNotebook();
            });
            return false;
          } else if ((e.which === 123) && bkUtils.isElectron) { // F12
            if (bkUtils.isElectron) {
              bkElectron.toggleDevTools();
            }
          }
        }
        $(document).bind('keydown', keydownHandler);

        var onDestroy = function() {
          $(document).unbind('keydown', keydownHandler);
        }
        $scope.$on('$destroy', onDestroy);

        // sessions list UI
        $scope.sessions = null;
        // get list of opened sessions
        $scope.reloadSessionsList = function() {
          bkSession.getSessions().then(function(sessions) {
            $scope.sessions = _(sessions).map(function(session, sessionId) {
              session.id = sessionId;
              return session;
            });
          });
        };
        $scope.reloadSessionsList();

        // Listen to backend for changes to session list
        $.cometd.subscribe('/sessionChange', function(reply){
          $scope.reloadSessionsList();
        });

        $scope.isSessionsListEmpty = function() {
          return _.isEmpty($scope.sessions);
        };
      }
    };
  });

})();

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
 * bk.ControlPanel
 * - This is the module for the 'control panel' section of beaker
 * - In the control panel, users get a list of opened sessions and is able to
 * (re)open one in bkApp.
 */
(function() {
  'use strict';
  var module = angular.module('bk.controlPanel');

  module.directive('bkControlPanelSessionItem', function(
      bkUtils, bkSession, bkCoreManager, bkRecentMenu, bkEvaluatePluginManager) {

    function saveMostRecentNotebookContents(sessionId, pathInfo, format) {
      var deferred = bkUtils.newDeferred();

      $.cometd.subscribe('/latest-notebook-model', function(resp) {

        var fileSaver = bkCoreManager.getFileSaver(pathInfo.uriType);
        fileSaver.save(pathInfo.uri, resp.data.notebookJson)
        .then(function() {
          bkRecentMenu.recordRecentDocument(JSON.stringify({
            uri: pathInfo.uri,
            type: pathInfo.uriType,
            readOnly: false,
            format: _.isEmpty(format) ? '' : format
          }));
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

        $.cometd.unsubscribe('/latest-notebook-model');
      });

      $.cometd.publish('/request-latest-notebook-model', {sessionId: sessionId});

      return deferred.promise;
    }

    return {
      restrict: 'E',
      template: JST['controlpanel/table'],
      controller: function($scope) {
        $scope.open = function(session) {
          bkCoreManager.openSession(session.id);
        };
        $scope.close = function(session) {
          var format = session.format;
          var notebookModel = angular.fromJson(session.notebookModelJson);
          var closeSession = function() {
            if (notebookModel && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                // XXX Outdated notebook model is used, consider getting most recent version from backend
                bkEvaluatePluginManager.createEvaluatorThenExit(notebookModel.evaluators[i]);
              }
            }
            return bkSession.close(session.id).then(function() {
              $scope.reloadSessionsList();
            });

          };
          bkSession.getSessionEditedState(session.id)
          .then(function(response) {
            var edited = response.data.edited;
            if (!edited) {
              // close session
              closeSession();
            } else {
              // ask if user want to save first
              bkHelper.show3ButtonModal(
                  'Do you want to save [' + $scope.getCaption(session) + ']?',
                  'Confirm close',
                  function() { // yes
                    // save session
                    var saveSession = function() {
                      var notebookModelAsString = bkUtils.toPrettyJson(notebookModel);
                      if (!_.isEmpty(session.notebookUri) && !session.readOnly) {
                        var fileSaver = bkCoreManager.getFileSaver(session.uriType);
                        return fileSaver.save(session.notebookUri, notebookModelAsString, true);
                      }

                      return bkCoreManager.showDefaultSavingFileChooser()
                      .then(function(pathInfo) {
                        if (!pathInfo.uri) {
                          return bkUtils.newDeferred().reject({
                            cause: 'Save cancelled'
                          });
                        }

                        return saveMostRecentNotebookContents(session.id, pathInfo, format)
                        .catch(function(error) {
                          return bkUtils.newDeferred().reject({
                            cause: 'error saving to file',
                            error: error
                          });
                        });
                      });
                    };

                    var savingFailedHandler = function(info) {
                      if (info.cause === 'Save cancelled') {
                        console.log('File saving cancelled');
                      } else {
                        bkHelper.show1ButtonModal(info.error, info.cause);
                      }
                    };
                    saveSession().then(closeSession, savingFailedHandler);
                  },
                  function() { // no
                    closeSession();
                  },
                  function() { // cancel
                    // no-op
                  },
                  'Save',
                  'Don\'t Save'
              );
            }
          });
        };

        $scope.getCaption = function(session) {
          var url = session.notebookUri;
          if (!url) {
            return 'New Notebook';
          }
          if (url[url.length - 1] === '/') {
            url = url.substring(0, url.length - 1);
          }
          return url.replace(/^.*[\\\/]/, '');
        };
        $scope.getDescription = function(session) {
          return session.notebookUri;
        };
      }
    };
  });
})();

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
 * bkCellMenuPluginManager
 * bkCellMenuPluginManager load and manages loaded cell menu plugins.
 */
(function() {
  'use strict';
  var module = angular.module('bk.cellMenuPluginManager', [
    'bk.utils',
    'bk.helper'  // This is only for ensuring that window.bkHelper is set, don't use bkHelper directly
  ]);
  module.factory('bkCellMenuPluginManager', function(bkUtils) {
    // loaded plugins
    var _cellMenuPlugins = {};

    var addPlugin = function(cellType, itemGetter) {
      if (!_cellMenuPlugins[cellType]) {
        _cellMenuPlugins[cellType] = [];
      }
      _cellMenuPlugins[cellType].push(itemGetter);
    };

    return {
      reset: function() {
        var self = this;
        for (var member in _cellMenuPlugins) {
          delete _cellMenuPlugins[member];
        }
        if (window.beaker === undefined || window.beaker.isEmbedded === undefined) {
          bkUtils.httpGet('../beaker/rest/util/getCellMenuPlugins')
              .success(function(menuUrls) {
                menuUrls.forEach(self.loadPlugin);
              });
        } else {
          var ml = window.beaker.getCellMenuList();
          if (_.isArray(ml)) {
            var i;      
            for(i=0; i<ml.length; i++) {
              if (_.isArray(ml[i].cellType)) {
                _(ml[i].cellType).each(function(cType) {
                  addPlugin(cType, ml[i].plugin);
                });
              } else {
                addPlugin(ml[i].cellType, ml[i].plugin);
              }
            }
          }
        }
      },
      loadPlugin: function(url) {
        return bkUtils.loadModule(url).then(function(ex) {
          if (_.isArray(ex.cellType)) {
            _(ex.cellType).each(function(cType) {
              addPlugin(cType, ex.plugin);
            });
          } else {
            addPlugin(ex.cellType, ex.plugin);
          }
          return ex.plugin;
        });
      },
      getPlugin: function(cellType) {
        return _cellMenuPlugins[cellType];
      },
      getMenuItems: function(cellType, scope) {
        var menuItemGetters = _cellMenuPlugins[cellType];
        var newItems = [];
        _(menuItemGetters).each(function(getter) {
          var items = getter(scope);
          _(items).each(function(it) {
            newItems.push(it);
          });
        });
        return newItems;
      }
    };
  });
})();

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
 * Module bk.core
 * Holds the core of beaker utilities. It wraps of lower level utilities that come from other
 * modules.
 * The user facing directives also use the core as a communication/exchange layer.
 */
(function() {
  'use strict';
  var module = angular.module('bk.core', [
    'ui.bootstrap',
    'ui.keypress',
    'bk.commonUi',
    'bk.utils',
    'bk.recentMenu',
    'bk.notebookCellModelManager',
    'bk.treeView',
    'bk.electron'
  ]);

  /**
   * bkCoreManager
   * - this acts as the global space for all view managers to use it as the communication channel
   * - bkUtils should be consider 'private' to beaker, external code should depend on bkHelper
   *     instead
   */
  module.factory('bkCoreManager', function(
      $modal,
      $rootScope,
      $document,
      $location,
      $sessionStorage,
      $q,
      bkUtils,
      bkRecentMenu,
      bkNotebookCellModelManager,
      bkElectron,
      modalDialogOp) {

    function isFilePath(path) {
      return path.split('/').pop() !== '';
    }

    var FileSystemFileChooserStrategy = function (){
      var newStrategy = this;
      newStrategy.manualName = '';
      newStrategy.input = "";
      newStrategy.getResult = function() {
        return newStrategy.input;
      };
      newStrategy.close = function(ev, closeFunc) {
        if (ev.which === 13) {
          closeFunc(this.getResult());
        }
      };
      newStrategy.manualEntry = function() {
        newStrategy.manualName = this.input.split('/').pop();
      };
      newStrategy.treeViewfs = { // file service
        getChildren: function(basePath, openFolders) {
          var self = this;
          var paths = [basePath];

          this.showSpinner = true;

          if (openFolders) {
            paths = [paths].concat(openFolders);
          }

          return bkUtils.httpPost("../beaker/rest/file-io/getDecoratedChildren", {
            openFolders: paths.join(',')
          }).success(function (list) {
            self.showSpinner = false;
          }).error(function () {
            self.showSpinner = false;
            console.log("Error loading children");
          });
        },
        fillInput: function(path) {
          if (isFilePath(path)) {
            newStrategy.manualName = "";
          } else {
            path += newStrategy.manualName;
          }

          newStrategy.input = path;
        },
        open: function(path) {
          this.fillInput(path);
          $rootScope.$broadcast('modal.submit');
        },
        setOrderBy: function(options) {
          $rootScope.fsPrefs.orderBy = options.orderBy;
          $rootScope.fsPrefs.orderReverse = options.reverse;
        },
        getOrderBy: function() {
          return $rootScope.fsPrefs.orderBy || 'uri';
        },
        getOrderReverse: function() {
          return !!$rootScope.fsPrefs.orderReverse;
        },
        getPrettyOrderBy: function() {
          var prettyNames = {
            uri: 'Name',
            modified: 'Date Modified'
          };

          return prettyNames[$rootScope.fsPrefs.orderBy || 'uri'];
        },
        showSpinner: false,
        applyExtFilter: true,
        extFilter: ['bkr'],
        filter: function(child) {
          var fs = newStrategy.treeViewfs;
          if (!fs.applyExtFilter || _.isEmpty(fs.extFilter) || child.type === "directory") {
            return true;
          } else {
            return _(fs.extFilter).any(function(ext) {
              return _.string.endsWith(child.uri, ext);
            });
          }
        }
      };
    };

    // importers are responsible for importing various formats into bkr
    // importer impl must define an 'import' method
    var _importers = {};
    var FORMAT_BKR = "bkr";
    _importers[FORMAT_BKR] = {
      import: function(notebookJson) {
        var notebookModel;
        try {
          notebookModel = bkUtils.fromPrettyJson(notebookJson);
          // TODO, to be removed. Addressing loading a corrupted notebook.
          if (angular.isString(notebookModel)) {
            notebookModel = bkUtils.fromPrettyJson(notebookModel);
            bkUtils.log("corrupted-notebook", { notebookUri: enhancedNotebookUri });
          }
        } catch (e) {
          console.error(e);
          console.error("This is not a valid Beaker notebook JSON");
          console.error(notebookJson);
          throw "Not a valid Beaker notebook";
        }
        return notebookModel;
      }
    };

    var LOCATION_FILESYS = "file";
    var LOCATION_HTTP = "http";
    var LOCATION_AJAX = "ajax";

    // fileLoaders are responsible for loading files and output the file content as string
    // fileLoader impl must define an 'load' method which returns a then-able
    var _fileLoaders = {};
    _fileLoaders[LOCATION_FILESYS] = {
      load: function(uri) {
        return bkUtils.loadFile(uri);
      }
    };
    _fileLoaders[LOCATION_HTTP] = {
      load: function(uri) {
        return bkUtils.loadHttp(uri);
      }
    };
    _fileLoaders[LOCATION_AJAX] = {
      load: function(uri) {
        return bkUtils.loadAjax(uri);
      }
    };

    // fileSavers are responsible for saving various formats into bkr
    // fileLoader impl must define an 'load' method which returns a then-able
    var _fileSavers = {};

    _fileSavers[LOCATION_FILESYS] = {
      save: function(uri, contentAsString, overwrite) {
        return bkUtils.saveFile(uri, contentAsString, overwrite);
      },
      showFileChooser: function(initUri) {
        return bkCoreManager.showDefaultSavingFileChooser(initUri);
      }
    };

    _fileSavers[LOCATION_AJAX] = {
      save: function(uri, contentAsString) {
        return bkUtils.saveAjax(uri, contentAsString);
      }
    };

    var importInput = function() {
      var $input,
          endpoint = '../beaker/fileupload';

      if (($input = $('input#import-notebook')).length) return $input;

      $input = $('<input type="file" name="file" id="import-notebook" ' +
                 'data-url="' + endpoint + '" ' +
                 'style="display: none"/>')
                .prependTo('body');

      $input.fileupload({
        dataType: 'json',
        done: function(e, data) {
          bkCoreManager.importNotebook(data.result);
        }
      });

      return $input;
    };

    var codeMirrorExtension = undefined;

    var codeMirrorFileName = {
        type : 'string',
        hint: function(token) {
          var deferred = bkHelper.newDeferred();
          $.ajax({
            type: "GET",
            datatype: "json",
            url: "../beaker/rest/file-io/autocomplete",
            data: { path: token.string.substr(1)}
          }).done(function(x) {
            for (var i in x) {
              x[i] = token.string[0] + x[i];
            }
            deferred.resolve(x);
          }).error(function(x) {
            deferred.resolve([]);
          });
          return deferred.promise;
        }
    };

    var bkCoreManager = {

      setNotebookImporter: function(format, importer) {
        _importers[format] = importer;
      },
      getNotebookImporter: function(format) {
        return _importers[format];
      },
      setFileLoader: function(uriType, fileLoader) {
        _fileLoaders[uriType] = fileLoader;
      },
      getFileLoader: function(uriType) {
        return _fileLoaders[uriType];
      },
      setFileSaver: function(uriType, fileSaver) {
        _fileSavers[uriType] = fileSaver;
      },
      getFileSaver: function(uriType) {
        return _fileSavers[uriType];
      },
      guessUriType: function(notebookUri) {
        // TODO, make smarter guess
        if (/^https?:\/\//.exec(notebookUri)) {
          return LOCATION_HTTP;
        }
        else if (/^ajax:/.exec(notebookUri)) {
          return LOCATION_AJAX;
        }
        else {
          return LOCATION_FILESYS;
        }
      },
      guessFormat: function(notebookUri) {
        // TODO, make smarter guess
        return FORMAT_BKR;
      },

      _beakerRootOp: null,
      init: function(beakerRootOp) {
        this._beakerRootOp = beakerRootOp;
        bkRecentMenu.init({
          open: beakerRootOp.openNotebook
        });
      },
      gotoControlPanel: function() {
        return this._beakerRootOp.gotoControlPanel();
      },
      newSession: function(empty) {
        return this._beakerRootOp.newSession(empty);
      },
      openSession: function(sessionId) {
        return this._beakerRootOp.openSession(sessionId);
      },
      openNotebook: function(notebookUri, uriType, readOnly, format) {
        this._beakerRootOp.openNotebook(notebookUri, uriType, readOnly, format);
      },
      addImportInput: function() {
        importInput();
      },
      importNotebookDialog: function() {
        importInput().click();
      },
      importNotebook: function(notebook) {
        $sessionStorage.importedNotebook = notebook;

        return $rootScope.$apply(function() {
          $location.path("/session/import").search({});
        });
      },
      showDefaultSavingFileChooser: function(initPath) {
        var self = this;
        var deferred = bkUtils.newDeferred();
        bkUtils.all([bkUtils.getHomeDirectory(), bkUtils.getStartUpDirectory()])
            .then(function(values) {
          var homeDir = values[0];
          var fileChooserStrategy = self.getFileSystemFileChooserStrategy();
          fileChooserStrategy.input = initPath;
          fileChooserStrategy.getResult = function () {
            if (_.isEmpty(this.input)) {
              return "";
            }
            var result = this.input;
            if (result === '~') {
              result = homeDir + "/"
            } else if (_.string.startsWith(result, '~/')) {
              result = result.replace('~', homeDir);
            } else if (!_.string.startsWith(result, '/') && !result.match(/^\w+:\\/)) {
              result = homeDir + "/" + result;
            }
            if (!_.string.endsWith(result, '.bkr')
                && !_.string.endsWith(result, '/')) {
              result = result + ".bkr";
            }
            return result;
          };
          fileChooserStrategy.newFolder = function(path) {
            var self = this;
            this.showSpinner = true;
            bkUtils.httpPost("../beaker/rest/file-io/createDirectory", {path: path})
                .complete(function (list) {
                  self.showSpinner = false;
                });
          };
          fileChooserStrategy.getSaveBtnDisabled = function() {
            return _.isEmpty(this.input) || _.string.endsWith(this.input, '/');
          };
          fileChooserStrategy.treeViewfs.applyExtFilter = false;
          var fileChooserTemplate = JST['template/savenotebook']({homedir: homeDir });
          var fileChooserResultHandler = function (chosenFilePath) {
            deferred.resolve({
              uri: chosenFilePath,
              uriType: LOCATION_FILESYS
            });
          };

          self.showModalDialog(
              fileChooserResultHandler,
              fileChooserTemplate,
              fileChooserStrategy);
        });
        return deferred.promise;
      },

      codeMirrorOptions: function(scope, notebookCellOp) {
        var goUpOrMoveFocusUp = function(cm) {
          if ($('.CodeMirror-hint').length > 0) {
            //codecomplete is up, skip
            return;
          }
          if (cm.getCursor().line === 0) {
            moveFocusUp();
          } else {
            cm.execCommand("goLineUp");
            var top = cm.cursorCoords(true,'window').top;
            if ( top < 150)
              window.scrollBy(0, top-150);
          }
        };

        var goDownOrMoveFocusDown = function(cm) {
          if ($('.CodeMirror-hint').length > 0) {
            //codecomplete is up, skip
            return;
          }
          if (cm.getCursor().line === cm.doc.size - 1) {
            moveFocusDown();
          } else {
            cm.execCommand("goLineDown");
          }
        };

        var moveFocusDown = function() {
          // move focus to next code cell
          var thisCellId = scope.cellmodel.id;
          var nextCell = notebookCellOp.getNext(thisCellId);
          while (nextCell) {
            if (scope.bkNotebook.getFocusable(nextCell.id)) {
              scope.bkNotebook.getFocusable(nextCell.id).focus();
              break;
            } else {
              nextCell = notebookCellOp.getNext(nextCell.id);
            }
          }
        };

        var moveFocusUp = function() {
          // move focus to prev code cell
          var thisCellID = scope.cellmodel.id;
          var prevCell = notebookCellOp.getPrev(thisCellID);
          while (prevCell) {
            var t = scope.bkNotebook.getFocusable(prevCell.id);
            if (t) {
              t.focus();
              var top = t.cm.cursorCoords(true,'window').top;
              if ( top < 150)
                window.scrollBy(0, top-150);
              break;
            } else {
              prevCell = notebookCellOp.getPrev(prevCell.id);
            }
          }
        };

        var evaluate = function() {
          scope.evaluate();
          scope.$apply();
        };

        var evaluateAndGoDown = function() {
          scope.evaluate();
          moveFocusDown();
        };

        var maybeShowAutoComplete = function(cm) {
          if (scope.bkNotebook.getCMKeyMapMode() === "emacs") {
            cm.setCursor(cm.getCursor());
            cm.setExtending(!cm.getExtending());
            cm.on("change", function() {
              cm.setExtending(false);
            });
          } else {
            showAutoComplete(cm);
          }
        };

        var showAutoComplete = function(cm) {
          var getToken = function(editor, cur) {
            return editor.getTokenAt(cur);
          };
          var getHints = function(editor, showHintCB, options) {
            var cur = editor.getCursor();
            var token = getToken(editor, cur);
            var cursorPos = editor.indexFromPos(cur);

            var waitfor = [];
            for(var i in codeMirrorExtension.autocomplete) {
              var t = codeMirrorExtension.autocomplete[i];
              if (t.type === token.type || t.type === '*') {
                waitfor.push(t.hint(token));
              }
            }

            var onResults = function(results, matched_text, dotFix) {
              var start = token.start;
              var end = token.end;
              if (dotFix && token.string === ".") {
                start += 1;
              }
              if (matched_text) {
                start += (cur.ch - token.start - matched_text.length);
                end = start + matched_text.length;
              }
              if (waitfor.length > 0) {
                $q.all(waitfor).then(function (res) {
                  for (var i in res) {
                    results = results.concat(res[i]);
                  }
                  showHintCB({
                    list: _.uniq(results),
                    from: CodeMirror.Pos(cur.line, start),
                    to: CodeMirror.Pos(cur.line, end)
                  });
                }, function(err) {
                  showHintCB({
                    list: _.uniq(results),
                    from: CodeMirror.Pos(cur.line, start),
                    to: CodeMirror.Pos(cur.line, end)
                  });
                })
              } else {
                showHintCB({
                  list: _.uniq(results),
                  from: CodeMirror.Pos(cur.line, start),
                  to: CodeMirror.Pos(cur.line, end)
                });
              }
            };
            scope.autocomplete(cursorPos, onResults);
          };

          if (cm.getOption('mode') === 'htmlmixed' || cm.getOption('mode') === 'javascript') {
            cm.execCommand("autocomplete");
          } else {
            var options = {
              async: true,
              closeOnUnfocus: true,
              alignWithWord: true,
              completeSingle: true
            };
            CodeMirror.showHint(cm, getHints, options);
          }
        };

        var moveCellUp = function(cm) {
          notebookCellOp.moveUp(scope.cellmodel.id);
          bkUtils.refreshRootScope();
          cm.focus();
        };

        var moveCellDown = function(cm) {
          notebookCellOp.moveDown(scope.cellmodel.id);
          bkUtils.refreshRootScope();
          cm.focus();
        };

        var deleteCell = function(cm) {
          notebookCellOp.delete(scope.cellmodel.id, true);
          bkUtils.refreshRootScope();
        };

        var tab = function(cm) {
          var cursor = cm.getCursor();
          var lineLen = cm.getLine(cursor.line).length;
          var rightLine = cm.getRange(cursor, {line: cursor.line, ch: lineLen});
          var leftLine = cm.getRange({line: cursor.line, ch: 0}, cursor);
          if (leftLine.match(/^\s*$/)) {
            cm.execCommand("indentMore");
          } else {
            if (rightLine.match(/^\s*$/)) {
              showAutoComplete(cm);
            } else {
              cm.execCommand("indentMore");
            }
          }
        }

        var backspace = function(cm) {
          var cursor = cm.getCursor();
          var anchor = cm.getCursor("anchor");
          if (cursor.line != anchor.line || cursor.ch != anchor.ch) {
            cm.replaceRange("", cursor, anchor);
            return;
          }
          var leftLine = cm.getRange({line: cursor.line, ch: 0}, cursor);
          if (leftLine.match(/^\s+$/)) {
            cm.deleteH(-1, "char");
            var indent = cm.getOption('indentUnit');
            while ((cm.getCursor().ch % indent) != 0) {
              cm.deleteH(-1, "char");
            }
          } else {
            cm.deleteH(-1, "char");
          }
        }

        var keys = {
            "Up" : goUpOrMoveFocusUp,
            "Down" : goDownOrMoveFocusDown,
            "Ctrl-S": "save",
            "Cmd-S": "save",
            "Alt-Down": moveFocusDown,
            "Alt-J": moveFocusDown,
            "Alt-Up": moveFocusUp,
            "Alt-K": moveFocusUp,
            "Ctrl-Enter": evaluate,
            "Cmd-Enter": evaluate,
            "Shift-Enter": evaluateAndGoDown,
            "Ctrl-Space": maybeShowAutoComplete,
            "Cmd-Space": showAutoComplete,
            "Ctrl-Alt-Up": moveCellUp,
            "Cmd-Alt-Up": moveCellUp,
            "Ctrl-Alt-Down": moveCellDown,
            "Cmd-Alt-Down": moveCellDown,
            "Ctrl-Alt-D": deleteCell,
            "Cmd-Alt-D": deleteCell,
            "Tab": tab,
            "Backspace": backspace,
            "Ctrl-/": "toggleComment",
            "Cmd-/": "toggleComment"
          };


        if (typeof window.bkInit !== 'undefined') {
          codeMirrorExtension = window.bkInit.codeMirrorExtension;
        }

        if (typeof codeMirrorExtension === 'undefined') {
          codeMirrorExtension = { autocomplete : [ codeMirrorFileName ]};
        } else {
          codeMirrorExtension.autocomplete.push(codeMirrorFileName);
        }

        if (codeMirrorExtension.extraKeys !== undefined) {
          _.extend(keys, codeMirrorExtension.extraKeys);
        }

        return {
          lineNumbers: true,
          matchBrackets: true,
          extraKeys: keys
        };
      },

      _bkAppImpl: null,
      setBkAppImpl: function(bkAppOp) {
        this._bkAppImpl = bkAppOp;
      },
      getBkApp: function() {
        return this._bkAppImpl;
      },

      getRecentMenuItems: function() {
        return bkRecentMenu.getMenuItems();
      },

      getNotebookElement: function(currentScope) {
        // Walk up the scope tree and find the one that has access to the
        // notebook element (notebook directive scope, specifically)
        if (_.isUndefined(currentScope.getNotebookElement)) {
          return bkCoreManager.getNotebookElement(currentScope.$parent);
        } else {
          return currentScope.getNotebookElement();
        }
      },
      getNotebookCellManager: function() {
        return bkNotebookCellModelManager;
      },
      showModalDialog: function(callback, template, strategy, uriType, readOnly, format) {
        var options = {
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'modalDialogCtrl'
        };

        var attachSubmitListener = function() {
          $document.on('keydown.modal', function(e) {
            if (e.which === 13) {
              $('.modal .modal-submit').click();
            }
          });
        };

        var removeSubmitListener = function() {
          $document.off('keydown.modal');
        };

        // XXX - template is sometimes a url now.
        if (template.indexOf('app/template/') === 0) {
          options.templateUrl = template;
        } else {
          options.template = template;
        }

        modalDialogOp.setStrategy(strategy);
        var dd = $modal.open(options);

        attachSubmitListener();

        dd.result.then(function(result) {
          removeSubmitListener();

          if (callback) {
            callback(result, uriType, readOnly, format);
          }
        }).catch(function() {
          removeSubmitListener();
        });

        return dd;
      },
      show0ButtonModal: function(msgBody, msgHeader) {
        if (!msgHeader) {
          msgHeader = "Oops...";
        }
        var template = "<div class='modal-header'>" +
            "<h1>" + msgHeader + "</h1>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" ;
        return this.showModalDialog(null, template);
      },
      show1ButtonModal: function(msgBody, msgHeader, callback, btnText, btnClass) {
        if (!msgHeader) {
          msgHeader = "Oops...";
        }
        if (bkUtils.isElectron) {
          var options = {
            type: 'none',
            buttons: ['OK'],
            title: msgHeader,
            message: msgBody
          };
          return bkElectron.Dialog.showMessageBox(options, callback);
        } else {
          btnText = btnText ? btnText : "Close";
          btnClass = btnClass ? _.isArray(btnClass) ? btnClass.join(' ') : btnClass : 'btn-primary';
          var template = "<div class='modal-header'>" +
              "<h1>" + msgHeader + "</h1>" +
              "</div>" +
              "<div class='modal-body'><p>" + msgBody + "</p></div>" +
              '<div class="modal-footer">' +
              "   <button class='btn " + btnClass +"' ng-click='close(\"OK\")'>" + btnText + "</button>" +
              "</div>";
          return this.showModalDialog(callback, template);
        }
      },
      show2ButtonModal: function(
          msgBody,
          msgHeader,
          okCB, cancelCB,
          okBtnTxt, cancelBtnTxt,
          okBtnClass, cancelBtnClass) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var callback = function(result) {
          if (okCB && (result == 0)) {
            okCB();
          } else if (cancelCB){
            cancelCB();
          }
        };
        if (bkUtils.isElectron) {
          var options = {
            type: 'none',
            buttons: ['OK', 'Cancel'],
            title: msgHeader,
            message: msgBody
          };
          return bkElectron.Dialog.showMessageBox(options, callback);
        } else {
          okBtnTxt = okBtnTxt ? okBtnTxt : "OK";
          cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
          okBtnClass = okBtnClass ? _.isArray(okBtnClass) ? okBtnClass.join(' ') : okBtnClass : 'btn-default';
          cancelBtnClass = cancelBtnClass ? _.isArray(cancelBtnClass) ? cancelBtnClass.join(' ') : cancelBtnClass : 'btn-default';
          var template = "<div class='modal-header'>" +
              "<h1>" + msgHeader + "</h1>" +
              "</div>" +
              "<div class='modal-body'><p>" + msgBody + "</p></div>" +
              '<div class="modal-footer">' +
              "   <button class='Yes btn " + okBtnClass +"' ng-click='close(0)'>" + okBtnTxt + "</button>" +
              "   <button class='Cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
              "</div>";
          return this.showModalDialog(callback, template);
        }
      },
      show3ButtonModal: function(
          msgBody, msgHeader,
          yesCB, noCB, cancelCB,
          yesBtnTxt, noBtnTxt, cancelBtnTxt,
          yesBtnClass, noBtnClass, cancelBtnClass) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var callback = function(result) {
          if (yesCB && (result == 0)) {
            yesCB();
          } else if (noCB && (result == 1)) {
            noCB();
          } else if (cancelCB) {
            cancelCB();
          }
        };
        if (bkUtils.isElectron) {
          var options = {
            type: 'none',
            buttons: ['Yes', 'No', 'Cancel'],
            title: msgHeader,
            message: msgBody
          };
          return bkElectron.Dialog.showMessageBox(options, callback);
        } else {
          yesBtnTxt = yesBtnTxt ? yesBtnTxt : "Yes";
          noBtnTxt = noBtnTxt ? noBtnTxt : "No";
          cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
          yesBtnClass = yesBtnClass ? _.isArray(yesBtnClass) ? okBtnClass.join(' ') : yesBtnClass : 'btn-default';
          noBtnClass = noBtnClass ? _.isArray(noBtnClass) ? noBtnClass.join(' ') : noBtnClass : 'btn-default';
          cancelBtnClass = cancelBtnClass ? _.isArray(cancelBtnClass) ? cancelBtnClass.join(' ') : cancelBtnClass : 'btn-default';
          var template = "<div class='modal-header'>" +
              "<h1>" + msgHeader + "</h1>" +
              "</div>" +
              "<div class='modal-body'><p>" + msgBody + "</p></div>" +
              '<div class="modal-footer">' +
              "   <button class='yes btn " + yesBtnClass +"' ng-click='close(0)'>" + yesBtnTxt + "</button>" +
              "   <button class='no btn " + noBtnClass +"' ng-click='close(1)'>" + noBtnTxt + "</button>" +
              "   <button class='cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
              "</div>";
          return this.showModalDialog(callback, template);
        }
      },
      getFileSystemFileChooserStrategy: function() {
        return new FileSystemFileChooserStrategy();
      },
      showFullModalDialog: function(callback, template, controller, dscope) {
        var options = {
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: controller,
          resolve: { dscope: function(){ return dscope; } }
        };

        if (template.indexOf('http:') !== 0) {
          options.templateUrl = template;
        } else {
          options.template = template;
        }
        var dd = $modal.open(options);
        return dd.result.then(function(result) {
          if (callback) {
            callback(result);
          }
        });
      },
      showLanguageManager: function() {
        var options = {
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'pluginManagerCtrl',
          template: JST['mainapp/components/pluginmanager/pluginmanager']()
        };

        var dd = $modal.open(options);
        return dd.result;
      },
      showPublishForm: function() {
        var options = {
          windowClass: 'beaker-sandbox',
          backdropClass: 'beaker-sandbox',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          controller: 'publicationCtrl',
          template: JST['mainapp/components/publication/publish']()
        };

        var dd = $modal.open(options);
        return dd.result;
      }
    };
    return bkCoreManager;
  });

  module.factory('modalDialogOp', function() {
    var _strategy = {};
    return {
      setStrategy: function(strategy) {
        _strategy = strategy;
      },
      getStrategy: function() {
        return _strategy;
      }
    };
  });

  module.controller('modalDialogCtrl', function($scope, $rootScope, $modalInstance, modalDialogOp) {
    $scope.getStrategy = function() {
      return modalDialogOp.getStrategy();
    };
    $rootScope.$on('modal.submit', function() {
      $scope.close($scope.getStrategy().getResult());
    });
    $scope.close = function(result) {
      $modalInstance.close(result);
    };
  });

  /**
   * Directive to show a modal dialog that does filename input.
   */
  module.directive('fileActionDialog', function() {
    return {
      scope: { actionName: '@', inputId: '@', close: '=' },
      template: JST['template/fileactiondialog'](),
      link: function(scope, element, attrs) {
        element.find('input').focus();
      }
    };
  });
})();

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
 * Module bk.debug
 * This module is for debug only and should never be used in code
 */
(function() {
  'use strict';
  var module = angular.module("bk.debug", [
    "bk.angularUtils",
    "bk.mainApp",
    'bk.cellMenuPluginManager',
    "bk.core",
    'bk.sessionManager',
    "bk.outputLog",
    "bk.recentMenu",
    "bk.session",
    "bk.share",
    "bk.track",
    "bk.utils",
    "bk.cometdUtils",
    "bk.commonUtils",
    "bk.menuPluginManager",
    "bk.evaluatePluginManager",
    "bk.evaluatorManager",
    "bk.evaluateJobManager",
    "bk.notebookCellModelManager"
  ]);
  module.factory("bkDebug", function(
      $injector, angularUtils, bkEvaluateJobManager, bkCellMenuPluginManager, bkSessionManager,
      bkCoreManager, bkOutputLog, bkRecentMenu, bkSession, bkShare,
      bkTrack, bkUtils, cometdUtils, commonUtils, bkMenuPluginManager, bkEvaluatePluginManager,
      bkNotebookCellModelManager,
      bkEvaluatorManager) {
    return {
      $injector: $injector,
      angularUtils: angularUtils,
      bkEvaluateJobManager: bkEvaluateJobManager,
      bkCellMenuPluginManager: bkCellMenuPluginManager,
      bkSessionManager: bkSessionManager,
      bkCoreManager: bkCoreManager,
      bkOutputLog: bkOutputLog,
      bkRecentMenu: bkRecentMenu,
      bkSession: bkSession,
      bkShare: bkShare,
      bkTrack: bkTrack,
      bkUtils: bkUtils,
      cometdUtils: cometdUtils,
      commonUtils: commonUtils,
      bkMenuPluginManager: bkMenuPluginManager,
      bkEvaluatePluginManager: bkEvaluatePluginManager,
      bkEvaluatorManager: bkEvaluatorManager,
      bkNotebookCellModelManager: bkNotebookCellModelManager,
      debugUI: function() {
        bkHelper.getBkNotebookViewModel().toggleDebugging();
        bkHelper.refreshRootScope();
      }
    };
  });
})();

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
 * Module bk.evaluatePluginManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.evaluatePluginManager', ['bk.utils']);
  module.factory('bkEvaluatePluginManager', function(bkUtils, $modal) {
    var nameToUrlMap = {};
    var nameToVisualParams = {};
    var plugins = {};
    var loadingInProgressPlugins = [];

    var evaluatorLoadQueue = (function() {
      var _queue = [];
      var _loadInProgress = undefined;

      var loadEvaluator = function(ev) {
        bkHelper.showStatus("Starting language "+ev.name);
        return bkUtils.loadModule(ev.url, ev.name);
      };
      var doNext = function() {
        if (_loadInProgress) {
          return;
        }
        _loadInProgress = _queue.shift();
        if (_loadInProgress) {
          if (plugins[_loadInProgress.name] || plugins[_loadInProgress.url]) { // plugin code already loaded
            if (plugins[_loadInProgress.name]) {
              _loadInProgress.resolve(plugins[_loadInProgress.name])
              .finally(function () {
                _loadInProgress = undefined;
              })
              .then(doNext);
            } else {
              _loadInProgress.resolve(plugins[_loadInProgress.url])
              .finally(function () {
                _loadInProgress = undefined;
              })
              .then(doNext);
            }
            return;
          }
          return loadEvaluator(_loadInProgress)
          .then(_loadInProgress.resolve,  _loadInProgress.reject)
          .finally(function () {
            bkHelper.clearStatus("Starting language " + _loadInProgress.name)
            _loadInProgress = undefined;
          })
          .then(doNext);
        }
      };

      return {
        add: function(evl) {
          _queue.push(evl);
          bkUtils.fcall(doNext);
        }
      };
    })();

    return {
      getKnownEvaluatorPlugins: function() {
        return nameToUrlMap;
      },
      addNameToUrlEntry: function(name, url) {
        if ( typeof url === 'string' ) {
          nameToUrlMap[name] = url;
        } else {
          nameToUrlMap[name] = url.url;
          delete url.url;
          nameToVisualParams[name] = url;
        }
      },
      getVisualParams: function(name) {
        return nameToVisualParams[name];
      },
      getEvaluatorFactoryAndShell: function(evaluatorSettings) {
        var nameOrUrl = evaluatorSettings.plugin;
        if (plugins[nameOrUrl]) { // plugin code already loaded
          var deferred = bkUtils.newDeferred();
          plugins[nameOrUrl].getEvaluatorFactory().then(function(factory) {
            if (factory !== undefined && factory.create !== undefined) {
              return factory.create(evaluatorSettings).then(function(ev) { deferred.resolve(ev); });
            } else {
              deferred.reject("no factory for evaluator plugin");
            }
          }, function(err) {
            console.log(err);
            deferred.reject(err);
          });
          return deferred.promise;
        } else {
          var deferred = bkUtils.newDeferred();
          var name, url;
          if (nameToUrlMap[nameOrUrl]) {
            name = nameOrUrl;
            url = nameToUrlMap[nameOrUrl];
          } else {
            name = "";
            url = nameOrUrl;
          }

          var loadJob = {
              name: name,
              url: url,
              resolve: function(ex) {
                if (!_.isEmpty(ex.name)) {
                  plugins[ex.name] = ex;
                }
                if (!_.isEmpty(name) && name !== ex.name) {
                  plugins[name] = ex;
                }
                return ex.getEvaluatorFactory()
                  .then(function(factory) {
                    if (factory !== undefined && factory.create !== undefined) {
                      return factory.create(evaluatorSettings).then(function(ev) { deferred.resolve(ev); });
                    } else {
                      $modal.open({backdrop: true,
                        backdropClick: true,
                        windowClass: 'beaker-sandbox',
                        backdropClass: 'beaker-sandbox',
                        template: JST['helpers/plugin-load-error']({pluginId: name})});
                      deferred.reject("no factory for evaluator plugin");
                    }
                  }, function(err) {
                    // This function is never called.  Instead the
                    // "then" clause above is called but factory is
                    // undefined.  Unknown why XXX.
                    if (!_.isEmpty(ex.name)) {
                      delete plugins[ex.name];
                    }
                    if (!_.isEmpty(name) && name !== ex.name) {
                      delete plugins[name];
                    }
                    console.error(err);
                    if (_.isEmpty(name)) {
                      deferred.reject("failed to load plugin: " + url);
                    } else {
                      deferred.reject("failed to load plugin: " + name + " at " + url);
                    }
                  });
              },
              reject: function(err) {
                // This is called if the URL is bad or there is a syntax error in the JS.
                bkHelper.showTransientStatus("Failed to find plugin "+name+": "+err);
                console.error(err);
                if (_.isEmpty(name)) {
                  deferred.reject("failed to find plugin: " + url);
                } else {
                  deferred.reject("failed to find plugin: " + name + " at " + url);
                }
              }
          };
          evaluatorLoadQueue.add(loadJob);
          return deferred.promise;
        }
      },
      createEvaluatorThenExit: function(settings) {
        var theShell;
        return this.getEvaluatorFactoryAndShell(settings)
        .then(function(evaluator) {
          if (evaluator.exit) {
            evaluator.exit();
          }
        })
        .then(function() {
          _(plugins).filter(function(aShell) {
            return aShell !== theShell;
          });
        });
      }
    };
  });
})();

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
 * Module bk.helper
 * The bkHelper should be a subset of bkCore utilities that are exposed for
 * usages external to Beaker.
 */
(function() {
  'use strict';
  var module = angular.module('bk.helper', ['bk.utils', 'bk.core', 'bk.share', 'bk.debug', 'bk.electron']);
  /**
   * bkHelper
   * - should be the only thing plugins depend on to interact with general beaker stuffs (other than
   * conforming to the API spec)
   * - except plugins, nothing should depends on bkHelper
   * - we've made this global. We should revisit this decision and figure out the best way to load
   *   plugins dynamically
   * - it mostly should just be a subset of bkUtil
   */
  module.factory('bkHelper', function(bkUtils, bkCoreManager, bkShare, bkDebug, bkElectron) {
    var getCurrentApp = function() {
      return bkCoreManager.getBkApp();
    };
    var getBkNotebookWidget = function() {
      if (getCurrentApp().getBkNotebookWidget) {
        return getCurrentApp().getBkNotebookWidget();
      } else {
        console.error('Current app doesn\'t support getBkNotebookWidget');
      }
    };

    var bkHelper = {
      // enable debug
      debug: function() {
        window.bkDebug = bkDebug;
      },

      // beaker (root)
      gotoControlPanel: function() {
        return bkCoreManager.gotoControlPanel();
      },
      openNotebook: function(notebookUri, uriType, readOnly, format) {
        return bkCoreManager.openNotebook(notebookUri, uriType, readOnly, format);
      },
      importNotebookDialog: function() {
        return bkCoreManager.importNotebookDialog();
      },
      // Empty true means truly empty new session.
      // otherwise use the default notebook.
      newSession: function(empty) {
        return bkCoreManager.newSession(empty);
      },
      getBaseUrl: function() {
        return bkUtils.getBaseUrl();
      },
      // Open tab/window functions that handle the electron case
      openWindow: function(path, type) {
        if (bkUtils.isElectron) {
          if (path[0] == '/'){
            bkElectron.IPC.send('new-window', bkUtils.getBaseUrl() + path, type);
          } else {
            bkElectron.IPC.send('new-window', path, type);
          }
        } else {
          window.open(path);
        }
      },
      openStaticWindow: function(path) {
        if (bkHelper.isElectron) {
          var newWindow = new bkElectron.BrowserWindow({});
          newWindow.loadUrl(bkHelper.serverUrl('beaker/' + path));
        } else {
          window.open('./' + path);
        }
      },
      openBrowserWindow: function(path) {
        if (bkUtils.isElectron) {
          bkElectron.Shell.openExternal(path);
        } else {
          window.open(path);
        }
      },
      // Save file with electron or web dialog
      saveWithDialog: function(thenable) {
        if (bkUtils.isElectron) {
          var BrowserWindow = bkElectron.BrowserWindow;
          var Dialog = bkElectron.Dialog;
          var thisWindow = BrowserWindow.getFocusedWindow();
          var path = showElectronSaveDialog(thisWindow, options).then(function(path) {
            if (path === undefined) {
              saveFailed('cancelled');
              return;
            }
            bkUtils.httpPost('rest/file-io/setWorkingDirectory', {dir: path});
            var ret = {
              uri: path,
              uriType: 'file'
            };
            bkSessionManager.dumpDisplayStatus();
            var saveData = bkSessionManager.getSaveData();
            var fileSaver = bkCoreManager.getFileSaver(ret.uriType);
            var content = saveData.notebookModelAsString;
            fileSaver.save(ret.uri, content, true).then(function() {
              thenable.resolve(ret);
            }, thenable.reject);
          });
          return thenable.promise.then(saveDone, saveFailed);
        } else {
          thenable = savePromptChooseUri();
          return thenable.then(saveDone, saveFailed);
        }
      },
      showElectronSaveDialog: function() {
        var BrowserWindow = bkElectron.BrowserWindow;
        var Dialog = bkElectron.Dialog;
        return bkUtils.getWorkingDirectory().then(function(defaultPath) {
          var options = {
            title: 'Save Beaker Notebook',
            defaultPath: defaultPath,
            filters: [
              {name: 'Beaker Notebook Files', extensions: ['bkr']}
            ]
          };
          var path = Dialog.showSaveDialog(options);
          return path;
        });
      },
      // Open file with electron or web dialog
      openWithDialog: function(ext, uriType, readOnly, format) {
        if (bkUtils.isElectron) {
          var BrowserWindow = bkElectron.BrowserWindow;
          var Dialog = bkElectron.Dialog;
          return bkUtils.getWorkingDirectory().then(function(defaultPath) {
            var options = {
              title: 'Open Beaker Notebook',
              defaultPath: defaultPath,
              multiSelections: false,
              filters: [
                {name: 'Beaker Notebook Files', extensions: [ext]}
              ]
            };
            // Note that the open dialog return an array of paths (strings)
            var path = Dialog.showOpenDialog(options);
            if (path === undefined) {
              console.log('Open cancelled');
              return;
            } else {
              // For now, multiSelections are off, only get the first
              path = path[0];
            }
            bkUtils.httpPost('rest/file-io/setWorkingDirectory', {dir: path});
            // Format this accordingly!
            var routeParams = {
              uri: path
            }
            if (uriType) {
              routeParams.type = uriType;
            }
            if (readOnly) {
              routeParams.readOnly = true;
            }
            if (format) {
              routeParams.format = format;
            }
            bkHelper.openWindow(bkUtils.getBaseUrl() + '/open?' + jQuery.param(routeParams), 'notebook');
          });
        } else {
          var strategy = bkHelper.getFileSystemFileChooserStrategy();
          strategy.treeViewfs.extFilter = [ext];
          return bkUtils.getHomeDirectory().then(function(homeDir) {
            bkCoreManager.showModalDialog(
                bkHelper.openNotebook,
                JST['template/opennotebook']({homedir: homeDir, extension: '.' + ext}),
                strategy,
                uriType,
                readOnly,
                format
            );
          });
        }
      },
      Electron: bkElectron,
      // current app
      getCurrentAppName: function() {
        if (!_.isEmpty(getCurrentApp().name)) {
          return getCurrentApp().name;
        }
        return "Unknown App";
      },
      hasSessionId: function() {
        if (getCurrentApp().getSessionId) {
          return true;
        }
        return false;
      },
      getSessionId: function() {
        if (getCurrentApp().getSessionId) {
          return getCurrentApp().getSessionId();
        } else {
          console.error("Current app doesn't support getSessionId");
        }
      },
      getNotebookModel: function() {
        if (getCurrentApp().getNotebookModel) {
          return getCurrentApp().getNotebookModel();
        } else {
          console.error("Current app doesn't support getNotebookModel");
        }
      },
      getBeakerObject: function() {
        if (getCurrentApp().getBeakerObject) {
          return getCurrentApp().getBeakerObject();
        } else {
          console.error("Current app doesn't support getBeakerObject");
        }
      },
      getNotebookElement: function(currentScope) {
        return bkCoreManager.getNotebookElement(currentScope);
      },
      collapseAllSections: function() {
        if (getCurrentApp().collapseAllSections) {
          return getCurrentApp().collapseAllSections();
        } else {
          console.error("Current app doesn't support collapseAllSections");
        }
      },
      closeNotebook: function() {
        if (getCurrentApp().closeNotebook) {
          return getCurrentApp().closeNotebook();
        } else {
          console.error("Current app doesn't support closeNotebook");
        }
      },
      saveNotebook: function() {
        if (getCurrentApp().saveNotebook) {
          return getCurrentApp().saveNotebook();
        } else {
          console.error("Current app doesn't support saveNotebook");
        }
      },
      saveNotebookAs: function(notebookUri, uriType) {
        if (getCurrentApp().saveNotebookAs) {
          return getCurrentApp().saveNotebookAs(notebookUri, uriType);
        } else {
          console.error("Current app doesn't support saveNotebookAs");
        }
      },
      hasCodeCell: function(toEval) {
        if (getCurrentApp().evaluate) {
          return getCurrentApp().hasCodeCell(toEval);
        } else {
          return false;
        }
      },
      evaluate: function(toEval) {
        if (getCurrentApp().evaluate) {
          return getCurrentApp().evaluate(toEval);
        } else {
          console.error("Current app doesn't support evaluate");
        }
      },
      evaluateRoot: function(toEval) {
        if (getCurrentApp().evaluateRoot) {
          return getCurrentApp().evaluateRoot(toEval);
        } else {
          console.error("Current app doesn't support evaluateRoot");
        }
      },
      evaluateCode: function(evaluator, code) {
        if (getCurrentApp().evaluateCode) {
          return getCurrentApp().evaluateCode(evaluator, code);
        } else {
          console.error("Current app doesn't support evaluateCode");
        }
      },
      getEvaluatorMenuItems: function() {
        if (getCurrentApp().getEvaluatorMenuItems) {
          return getCurrentApp().getEvaluatorMenuItems();
        } else {
          console.error("Current app doesn't support getEvaluatorMenuItems");
        }
      },
      toggleNotebookLocked: function() {
        if (getCurrentApp().toggleNotebookLocked) {
          return getCurrentApp().toggleNotebookLocked();
        } else {
          console.error("Current app doesn't support toggleNotebookLocked");
        }
      },
      isNotebookLocked: function() {
        if (getCurrentApp().isNotebookLocked) {
          return getCurrentApp().isNotebookLocked();
        } else {
          console.error("Current app doesn't support isNotebookLocked");
        }
      },
      showAnonymousTrackingDialog: function() {
        if (getCurrentApp().showAnonymousTrackingDialog) {
          return getCurrentApp().showAnonymousTrackingDialog();
        } else {
          console.error("Current app doesn't support showAnonymousTrackingDialog");
        }
      },
      showStatus: function(message, nodigest) {
        if (getCurrentApp().showStatus) {
          return getCurrentApp().showStatus(message, nodigest);
        } else {
          console.error("Current app doesn't support showStatus");
        }
      },
      updateStatus: function() {
        if (getCurrentApp().updateStatus) {
          return getCurrentApp().updateStatus();
        } else {
          console.error("Current app doesn't support updateStatus");
        }
      },
      getStatus: function() {
        if (getCurrentApp().getStatus) {
          return getCurrentApp().getStatus();
        } else {
          console.error("Current app doesn't support getStatus");
        }
      },
      clearStatus: function(message, nodigest) {
        if (getCurrentApp().clearStatus) {
          return getCurrentApp().clearStatus(message, nodigest);
        } else {
          console.error("Current app doesn't support clearStatus");
        }
      },
      showTransientStatus: function(message, nodigest) {
        if (getCurrentApp().showTransientStatus) {
          return getCurrentApp().showTransientStatus(message, nodigest);
        } else {
          console.error("Current app doesn't support showTransientStatus");
        }
      },
      getEvaluators: function() {
        if (getCurrentApp().getEvaluators) {
          return getCurrentApp().getEvaluators();
        } else {
          console.error("Current app doesn't support getEvaluators");
        }
      },
      getCodeCells: function(filter) {
        if (getCurrentApp().getCodeCells) {
          return getCurrentApp().getCodeCells(filter);
        } else {
          console.error("Current app doesn't support getCodeCells");
        }
      },
      setCodeCellBody: function(name, code) {
        if (getCurrentApp().setCodeCellBody) {
          return getCurrentApp().setCodeCellBody(name,code);
        } else {
          console.error("Current app doesn't support setCodeCellBody");
        }
      },
      setCodeCellEvaluator: function(name, evaluator) {
        if (getCurrentApp().setCodeCellEvaluator) {
          return getCurrentApp().setCodeCellEvaluator(name, evaluator);
        } else {
          console.error("Current app doesn't support setCodeCellEvaluator");
        }
      },
      setCodeCellTags: function(name, tags) {
        if (getCurrentApp().setCodeCellTags) {
          return getCurrentApp().setCodeCellTags(name, tags);
        } else {
          console.error("Current app doesn't support setCodeCellTags");
        }
      },
      // bk-notebook
      shareNotebook: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.shareAndOpenPublished();
        }
      },
      deleteAllOutputCells: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.deleteAllOutputCells();
        }
      },
      getBkNotebookViewModel: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.getViewModel();
        }
      },
      setInputCellKeyMapMode: function(keyMapMode) {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.setCMKeyMapMode(keyMapMode);
        }
      },
      getInputCellKeyMapMode: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.getCMKeyMapMode();
        }
      },

      // low level utils (bkUtils)
      refreshRootScope: function() {
        return bkUtils.refreshRootScope();
      },
      loadJS: function(url, success) {
        return bkUtils.loadJS(url, success);
      },
      loadCSS: function(url) {
        return bkUtils.loadCSS(url);
      },
      loadList: function(url, success, failure) {
        return bkUtils.loadList(url, success, failure);
      },
      findTable: function(elem) {
        return bkUtils.findTable(elem);
      },
      generateId: function(length) {
        return bkUtils.generateId(length);
      },
      serverUrl: function(path) {
        return bkUtils.serverUrl(path);
      },
      fileUrl: function(path) {
        return bkUtils.fileUrl(path);
      },
      httpGet: function(url, data) {
        return bkUtils.httpGet(url, data);
      },
      httpPost: function(url, data) {
        return bkUtils.httpPost(url, data);
      },
      spinUntilReady: function(url) {
        return bkUtils.spinUntilReady(url);
      },
      newDeferred: function() {
        return bkUtils.newDeferred();
      },
      newPromise: function(value) {
        return bkUtils.newPromise(value);
      },
      all: function(promises) {
        return bkUtils.all(promises);
      },
      fcall: function(func) {
        return bkUtils.fcall(func);
      },
      timeout: function(func, ms) {
        return bkUtils.timeout(func,ms);
      },
      cancelTimeout: function(promise) {
        return bkUtils.cancelTimeout(promise);
      },
      getHomeDirectory: function() {
        return bkUtils.getHomeDirectory();
      },
      getWorkingDirectory: function() {
        return bkUtils.getWorkingDirectory();
      },
      saveFile: function(path, contentAsJson, overwrite) {
        return bkUtils.saveFile(path, contentAsJson, overwrite);
      },
      loadFile: function(path) {
        return bkUtils.loadFile(path);
      },

      // utils (bkCore)
      setNotebookImporter: function(format, importer) {
        return bkCoreManager.setNotebookImporter(format, importer);
      },
      setFileLoader: function(uriType, fileLoader) {
        return bkCoreManager.setFileLoader(uriType, fileLoader);
      },
      setFileSaver: function(uriType, fileSaver) {
        return bkCoreManager.setFileSaver(uriType, fileSaver);
      },
      showDefaultSavingFileChooser: function() {
        return bkCoreManager.showDefaultSavingFileChooser();
      },
      getRecentMenuItems: function() {
        return bkCoreManager.getRecentMenuItems();
      },
      showModalDialog: function(callback, template, strategy) {
        return bkCoreManager.showModalDialog(callback, template, strategy).result;
      },
      show1ButtonModal: function(msgBody, msgHeader, callback) {
        return bkCoreManager.show1ButtonModal(msgBody, msgHeader, callback);
      },
      show2ButtonModal: function(msgBody, msgHeader, okCB, cancelCB, okBtnTxt, cancelBtnTxt) {
        return bkCoreManager.show2ButtonModal(
            msgBody, msgHeader, okCB, cancelCB, okBtnTxt, cancelBtnTxt);
      },
      show3ButtonModal: function(
          msgBody, msgHeader, yesCB, noCB, cancelCB, yesBtnTxt, noBtnTxt, cancelBtnTxt) {
        return bkCoreManager.show3ButtonModal(
            msgBody, msgHeader, yesCB, noCB, cancelCB, yesBtnTxt, noBtnTxt, cancelBtnTxt);
      },
      getFileSystemFileChooserStrategy: function() {
        return bkCoreManager.getFileSystemFileChooserStrategy();
      },
      selectFile: function(callback, title, extension, closebtn) {
          var strategy = bkCoreManager.getFileSystemFileChooserStrategy();
          strategy.treeViewfs.extFilter = [ extension ];
          strategy.ext = extension;
          strategy.title = title;
          strategy.closebtn = closebtn;
          return bkUtils.getHomeDirectory().then(
                  function(homeDir) {
                      return bkCoreManager.showModalDialog(
                              callback,
                              JST['template/opennotebook']({homedir: homeDir, extension: extension}),
                              strategy);
                  });
      },

      // eval utils
      locatePluginService: function(id, locator) {
        return bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/plugin-services/" + id), locator);
      },
      getEvaluatorFactory: function(shellConstructorPromise) {
        return shellConstructorPromise.then(function(Shell) {
          return {
            create: function(settings) {
              return bkUtils.newPromise(new Shell(settings));
            }
          };
        });
      },
      showLanguageManager: function() {
        return bkCoreManager.showLanguageManager();
      },
      showPublishForm: function() {
        return bkCoreManager.showPublishForm();
      },
      // other JS utils
      updateDocumentModelFromDOM: function(id) {
        function convertCanvasToImage(elem) {
          if (elem.nodeName == 'CANVAS') {
            var img = document.createElement('img');
            img.src = elem.toDataURL();
            return img;
          }
          var childNodes = elem.childNodes;
          for (var i = 0; i < childNodes.length; i++) {
            var result = convertCanvasToImage(childNodes[i]);
            if (result != childNodes[i]) {
              elem.replaceChild(result, childNodes[i]);
            }
          }
          return elem;
        }
        // 1) find the cell that contains elem
        var elem = $("#" + id).closest("bk-cell");
        if (elem === undefined || elem[0] === undefined) {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          return;
        }
        var cellid = elem[0].getAttribute("cellid");
        if (cellid === undefined) {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          return;
        }
        var body = elem.find( "bk-output-display[type='Html'] div div" );
        if (body === undefined || body[0] === undefined) {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          return;
        }
        // 2.5) search for any canvas elements in body and replace each with an image.
        body = convertCanvasToImage(body[0]);

        // 2) convert that part of the DOM to a string
        var newOutput = body.innerHTML;

        // 3) set the result.object to that string.
        var cell = bkCoreManager.getNotebookCellManager().getCell(cellid);
        if (cell === undefined) {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          return;
        }

        var res = cell.output.result;
        if (res.innertype === "Html") {
          res.object = newOutput;
        } else {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
        }
      },

      // bkShare
      share: bkShare,

      // language plugin utilities

      setupProgressOutput: function(modelOutput) {
        var progressObj = {
            type: "BeakerDisplay",
            innertype: "Progress",
            object: {
              message: "submitting ...",
              startTime: new Date().getTime(),
              outputdata: [],
              payload: undefined
            }
          };
        modelOutput.result = progressObj;
      },

      setupCancellingOutput: function(modelOutput) {
        if (modelOutput.result.type !== "BeakerDisplay" || modelOutput.result.innertype !== "Progress")
          setupProgressOutput(modelOutput);
        modelOutput.result.object.message = "cancelling ...";
      },

      receiveEvaluationUpdate: function(modelOutput, evaluation, pluginName, shellId) {
        var maxNumOfLines = 200;

        if (modelOutput.result !== undefined)
          modelOutput.result.status = evaluation.status;

        // save information to handle updatable results in displays
        modelOutput.pluginName = pluginName;
        modelOutput.shellId = shellId;

        // append text output (if any)
        if (evaluation.outputdata !== undefined && evaluation.outputdata.length>0) {
          var idx;
          for (idx=0; idx<evaluation.outputdata.length>0; idx++) {
            modelOutput.result.object.outputdata.push(evaluation.outputdata[idx]);
          }
          var cnt = 0;
          for (idx=0; idx<modelOutput.result.object.outputdata.length; idx++) {
            cnt += modelOutput.result.object.outputdata[idx].value.split(/\n/).length;
          }
          if (cnt > maxNumOfLines) {
            cnt -= maxNumOfLines;
            while(cnt > 0) {
              var l = modelOutput.result.object.outputdata[0].value.split(/\n/).length;
              if (l<=cnt) {
                modelOutput.result.object.outputdata.splice(0,1);
                cnt -= l;
              } else {
                var a = modelOutput.result.object.outputdata[0].value.split(/\n/);
                a.splice(0,cnt);
                modelOutput.result.object.outputdata[0].value = a.join('\n');
                cnt = 0;
              }
            }
          }
        }

        if (modelOutput.result === undefined) {
          console.log("WARNING: this should not happen - your plugin javascript is broken!");
          setupProgressOutput(modelOutput);
        }

        // now update payload (if needed)
        if (evaluation.payload !== undefined && modelOutput.result !== undefined && modelOutput.result.object !== undefined) {
          modelOutput.result.object.payload = evaluation.payload;
        }

        if (modelOutput.result.object !== undefined) {
          if (modelOutput.result.object.payload === undefined) {
            if (modelOutput.result.object.outputdata.length > 0) {
              modelOutput.result.object.payload = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : undefined };
            }
          } else if (modelOutput.result.object.payload.type === "Results") {
            modelOutput.result.object.payload.outputdata = modelOutput.result.object.outputdata;
          } else if (modelOutput.result.object.outputdata.length > 0) {
            modelOutput.result.object.payload = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : modelOutput.result.object.payload };
          }
        }

        if (evaluation.status === "FINISHED") {
          if (evaluation.payload === undefined) {
            if (modelOutput.result.object.payload !== undefined && modelOutput.result.object.payload.type === "Results")
              evaluation.payload = modelOutput.result.object.payload.payload;
            else
              evaluation.payload = modelOutput.result.object.payload;
          }
          modelOutput.elapsedTime = new Date().getTime() - modelOutput.result.object.startTime;

          if (modelOutput.result.object.outputdata.length === 0) {
            // single output display
            modelOutput.result = evaluation.payload;
          } else {
            // wrapper display with standard output and error
            modelOutput.result = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : evaluation.payload };
            // build output container
          }
          if (evaluation.jsonres !== undefined)
            modelOutput.dataresult = evaluation.jsonres;
        } else if (evaluation.status === "ERROR") {
          if (evaluation.payload === undefined) {
            if (modelOutput.result.object.payload !== undefined && modelOutput.result.object.payload.type === "Results")
              evaluation.payload = modelOutput.result.object.payload.payload;
            else
              evaluation.payload = modelOutput.result.object.payload;
          }
          if (evaluation.payload !== undefined && $.type(evaluation.payload)=='string') {
            evaluation.payload = evaluation.payload.split('\n');
          }
          modelOutput.elapsedTime = new Date().getTime() - modelOutput.result.object.startTime;

          if (modelOutput.result.object.outputdata.length === 0) {
            // single output display
            modelOutput.result = {
              type: "BeakerDisplay",
              innertype: "Error",
              object: evaluation.payload
            };
          } else {
            // wrapper display with standard output and error
            modelOutput.result = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : { type: "BeakerDisplay", innertype: "Error", object: evaluation.payload } };
          }
        } else if (evaluation.status === "RUNNING") {
          if (evaluation.message === undefined)
            modelOutput.result.object.message     = "running...";
          else
            modelOutput.result.object.message     = evaluation.message;
          modelOutput.result.object.progressBar   = evaluation.progressBar;
        }

        return (evaluation.status === "FINISHED" || evaluation.status === "ERROR");
      },
      getUpdateService: function() {
        var cometdUtil = {
            initialized: false,
            subscriptions: { },
            init: function(pluginName, serviceBase) {
              if (!this.initialized) {
                this.cometd = new $.Cometd();
                this.cometd.init(bkUtils.serverUrl(serviceBase + "/cometd/"));
                this.hlistener = this.cometd.addListener('/meta/handshake', function(message) {
                  if (window.bkDebug) console.log(pluginName+'/meta/handshake');
                  if (message.successful) {
                    this.cometd.batch(function() {
                      var k;
                      for (k in Object.keys(this.subscriptions))
                      {
                        this.subscriptions[k] = this.cometd.resubscribe(this.subscriptions[k]);
                      }
                    });
                  }
                });
                this.initialized = true;
              }
            },
            destroy: function() {
              if (this.initialized) {
                this.cometd.removeListener(this.hlistener);
                var k;
                for (k in Object.keys(this.subscriptions))
                {
                  this.cometd.unsubscribe(this.subscriptions[k]);
                }
              }
              this.initialized = true;
              this.cometd = null;
              this.subscriptions = { };
            },
            subscribe: function(update_id, callback) {
              if (!update_id)
                return;
              if (window.bkDebug) console.log('subscribe to '+update_id);
              if (this.subscriptions[update_id]) {
                this.cometd.unsubscribe(this.subscriptions[update_id]);
                this.subscriptions[update_id] = null;
              }
              var cb = function(ret) {
                callback(ret.data);
              };
              var s = this.cometd.subscribe('/object_update/' + update_id, cb);
              this.subscriptions[update_id] = s;
            },
            unsubscribe: function(update_id) {
              if (!update_id)
                return;
              if (window.bkDebug) console.log('unsubscribe from '+update_id);
              if (this.subscriptions[update_id]) {
                this.cometd.unsubscribe(this.subscriptions[update_id]);
                this.subscriptions[update_id] = null;
              }
            },
            issubscribed: function(update_id) {
              if (!update_id)
                return false;
              return this.subscriptions[update_id] !== null;
            }
        };
        return cometdUtil;
      },
      isElectron: bkUtils.isElectron
    };

    return bkHelper;
  });
})();

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

(function() {
  'use strict';
  var module = angular.module('bk.menuPluginManager', ['bk.utils', 'bk.electron']);

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
        if (newItem.priority >= existingItem.priority) {
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

  module.factory('bkMenuPluginManager', function(bkUtils, bkElectron) {

    var menus = {};
    var loadedPlugins = [];
    var loadingInProgressPluginJobs = [];
    var pluginIndex = 0;
    var menuChanged = false;

    var addPlugin = function(plugin, pluginIndex, secondaryIndex) {
      if (!plugin) {
        return;
      }

      var parentMenu = _.find(_.values(menus), function(it) {
        return it.name === plugin.parent;
      });

      if (!parentMenu) {
        parentMenu = {
          name: plugin.parent,
          items: [],
          index: pluginIndex,
          secondaryIndex: secondaryIndex,
          sortorder: plugin.sortorder,
          classNames: plugin.id
        };
        menus[pluginIndex + '_' + secondaryIndex + '_' + parentMenu.name] = parentMenu;
        menuChanged = true;
      } else {
        if (pluginIndex < parentMenu.index
            || (pluginIndex === parentMenu.index && secondaryIndex < parentMenu.secondaryIndex)) {
          delete menus[parentMenu.index + '_' + parentMenu.secondaryIndex + '_' + parentMenu.name];
          menus[pluginIndex + '_' + secondaryIndex + '_' + parentMenu.name] = parentMenu;
          parentMenu.index = pluginIndex;
          menuChanged = true;
        }
      }

      if (!plugin.submenu) {
        utils.addMenuItems(parentMenu, plugin.items);
        if (! _.isFunction(parentMenu.items)) {
          parentMenu.items.sort(function(a,b) {
            if (a.sortorder !== undefined && b.sortorder !== undefined) {
              return a.sortorder>b.sortorder;
            }
            return a.sortorder !== undefined;
          });
        }
      } else {
        var subMenu = _.find(parentMenu.items, function(it) {
          return it.name === plugin.submenu;
        });
        if (!subMenu) {
          subMenu = {
            name: plugin.submenu,
            type: "submenu",
            items: [],
            sortorder: plugin.submenusortorder
          };
          parentMenu.items.push(subMenu);
          if (! _.isFunction(parentMenu.items)) {
            parentMenu.items.sort(function(a,b) {
              if (a.sortorder !== undefined && b.sortorder !== undefined) {
                return a.sortorder>b.sortorder;
              }
              return a.sortorder !== undefined;
            });
          }
        } else {
          subMenu.disabled = false;
          subMenu.type = "submenu";
          if (!subMenu.items) {
            subMenu.items = [];
          }
        }
        utils.addMenuItems(subMenu, plugin.items);
        if (! _.isFunction(subMenu.items)) {
          subMenu.items.sort(function(a,b) {
            if (a.sortorder !== undefined && b.sortorder !== undefined) {
              return a.sortorder>b.sortorder;
            }
            return a.sortorder !== undefined;
          });
        }
      }
      if (bkUtils.isElectron && menuChanged){
        bkElectron.updateMenus(menus);
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
      return bkUtils.loadModule(job.getUrl()).then(function(menuPlugin) {
        if (job.isCancelled()) {
          throw "cancelled";
        }
        return menuPlugin.getMenuItems().then(function(menuItems) {
          if (job.isCancelled()) {
            throw "cancelled";
          }
          return menuItems;
        });
      });
    };

    return {
      loadMenuPlugin: function(url) {
        var job = getLoadMenuPluginJob(url);
        var index = pluginIndex++;
        loadPlugin(job).then(function(plugin) {
          loadedPlugins.push({url: job.getUrl()});
          if (_.isArray(plugin)) {
            _(plugin).each(function (item, i) {
              addPlugin(item, index, i);
            });
          } else {
            addPlugin(plugin, index, 0);
          }
        }, function(rejection) {
          console.error(rejection);
        }).finally(function() {
          loadingInProgressPluginJobs.splice(loadingInProgressPluginJobs.indexOf(job), 1);
        });
        loadingInProgressPluginJobs.push(job);
      },
      attachMenus: function(plugin) {
        var index = pluginIndex++;
        if (_.isArray(plugin)) {
          _(plugin).each(function (item, i) {
            addPlugin(item, index, i);
          });
        } else {
          addPlugin(plugin, index, 0);
        }
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
      }
    };
  });

})();

/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
  var module = angular.module('bk.notebookRouter', ['ngRoute']);

  module.controller('notebookRouter', function($scope, $route, $routeParams) {
    var sessionRouteResolve = $route.current.$$route.resolve;

    $scope.sessionId = $routeParams.sessionId;
    $scope.newSession = $route.current.locals.isNewSession;
    $scope.isImport = $route.current.locals.isImport;
    $scope.isOpen = $route.current.locals.isOpen;
    $scope.notebook = $route.current.locals.target;

    delete sessionRouteResolve.isNewSession;
    delete sessionRouteResolve.isImport;
    delete sessionRouteResolve.isOpen;
    delete sessionRouteResolve.target;
  });
})();

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
 * Module bk.mainApp
 * This is the main module for the beaker notebook application. The module has a directive that
 * holds the menu bar as well as the notebook view.
 * The module also owns the centralized cell evaluation logic.
 */
(function() {
  'use strict';
  var module = angular.module('bk.mainApp', [
                                             'ngRoute',
                                             'bk.utils',
                                             'bk.commonUi',
                                             'bk.core',
                                             'bk.session',
                                             'bk.sessionManager',
                                             'bk.menuPluginManager',
                                             'bk.cellMenuPluginManager',
                                             'bk.notebookVersionManager',
                                             'bk.evaluatorManager',
                                             'bk.evaluateJobManager',
                                             'bk.notebookRouter',
                                             'bk.notebook',
                                             'bk.electron'
                                             ]);

  /**
   * bkApp
   * - This is the beaker App
   * - menus + plugins + notebook(notebook model + evaluator)
   */
  module.directive('bkMainApp', function(
      $timeout,
      $sessionStorage,
      bkUtils,
      bkCoreManager,
      bkSession,
      bkSessionManager,
      bkMenuPluginManager,
      bkCellMenuPluginManager,
      bkNotebookVersionManager,
      bkEvaluatorManager,
      bkEvaluateJobManager,
      bkElectron,
      $location) {

    return {
      restrict: 'E',
      template: JST["template/mainapp/mainapp"](),
      scope: {
        notebook: '=',
        sessionId: '@',
        newSession: '@',
        allowDocumentRenaming: '@',
        isImport: '@import',
        isOpen: '@open'
      },
      controller: function($scope, $timeout) {
        var showLoadingStatusMessage = function(message, nodigest) {
          if (bkHelper.isElectron) {
            bkElectron.setStatus(message);
          } else {
            $scope.loadingmsg = message;
            if (nodigest !== true && !($scope.$$phase || $scope.$root.$$phase))
              $scope.$digest();
          }
        };
        var updateLoadingStatusMessage = function() {
          if (bkHelper.isElectron) {
            return;
          }
          if (!($scope.$$phase || $scope.$root.$$phase))
            $scope.$digest();
        };
        var getLoadingStatusMessage = function() {
          if (bkHelper.isElectron) {
            return bkElectron.getStatus();
          }
          return $scope.loadingmsg;
        };
        var clrLoadingStatusMessage = function(message, nodigest) {
          if (bkHelper.isElectron) {
            if (bkElectron.getStatus() === message) {
              bkElectron.setStatus('');
            }
          } else {
            if ($scope.loadingmsg === message) {
              $scope.loadingmsg = "";
              if (nodigest !== true && !($scope.$$phase || $scope.$root.$$phase))
                $scope.$digest();
            }
          }
        };
        var showTransientStatusMessage = function(message, nodigest) {
          $scope.loadingmsg = message;
          if (nodigest !== true && !($scope.$$phase || $scope.$root.$$phase))
            $scope.$digest();
          if (message !== "") {
            $timeout(function() {
              if ($scope.loadingmsg === message) {
                $scope.loadingmsg = "";
                if (nodigest !== true && !($scope.$$phase || $scope.$root.$$phase))
                  $scope.$digest();
              }
            }, 500, 0, false);
          }
        };
        var evaluatorMenuItems = [];

        var addEvaluator = function(settings, alwaysCreateNewEvaluator) {
          // set shell id to null, so it won't try to find an existing shell with the id
          if (alwaysCreateNewEvaluator) {
            settings.shellID = null;
          }

          return bkEvaluatorManager.newEvaluator(settings)
          .then(function(evaluator) {
            if (!_.isEmpty(evaluator.spec)) {
              var actionItems = [];
              _(evaluator.spec).each(function(value, key) {
                if (value.type === "action") {
                  actionItems.push({
                    name: value.name ? value.name : value.action,
                        action: function() {
                          evaluator.perform(key);
                        }
                  });
                }
              });
              if (actionItems.length > 0) {
                evaluatorMenuItems.push({
                  name: evaluator.pluginName, // TODO, this should be evaluator.settings.name
                  items: actionItems
                });
              }
            }
          });
        };

        var loadNotebook = (function() {
          var loadNotebookModelAndResetSession = function(
              notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId,
              isExistingSession) {
            // check if the notebook has to load plugins from an external source
            var r = new RegExp('^(?:[a-z]+:)?//', 'i');
            if (notebookModel && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                if (r.test(notebookModel.evaluators[i].plugin)) {
                  var plugList = "<ul>";
                  for (var j = 0; j < notebookModel.evaluators.length; ++j) {
                    if (r.test(notebookModel.evaluators[j].plugin)) {
                      plugList += "<li>"+notebookModel.evaluators[j].plugin;
                    }
                  }
                  plugList += "</ul>";
                  promptIfInsecure(plugList).then(function() {
                    // user accepted risk... do the loading
                    _loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, isExistingSession);
                  }, function() {
                    // user denied risk... clear plugins with external URL and do the loading
                    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
                    for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                      if (r.test(notebookModel.evaluators[i].plugin)) {
                        notebookModel.evaluators[i].plugin="";
                      }
                    }
                    _loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, isExistingSession);
                  });
                  return;
                }
              }
            }
            // no unsafe operation detected... do the loading
            _loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, isExistingSession);
          };
          var promptIfInsecure = function(urlList) {
            var deferred = bkUtils.newDeferred();
            bkCoreManager.show2ButtonModal(
                "This notebook is asking to load the following plugins from external servers:<br/>" + urlList+
                " <br/>How do you want to handle these external plugins?",
                "Warning: external plugins detected",
                function() {
                  deferred.reject();
                },
                function() {
                  deferred.resolve();
                }, "Disable", "Load", "", "btn-danger");
            return deferred.promise;
          };
          var _loadNotebookModelAndResetSession = function(
              notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId,
              isExistingSession) {

            showLoadingStatusMessage("Loading notebook");
            $scope.loading = true;

            isExistingSession = !!isExistingSession;
            evaluatorMenuItems.splice(0, evaluatorMenuItems.length);

            // HACK to fix older version of evaluator configuration
            if (notebookModel && notebookModel.cells && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.cells.length; ++i) {
                if (notebookModel.cells[i].evaluator !== undefined) {
                  for (var j = 0; j < notebookModel.evaluators.length; ++j) {
                    var name = notebookModel.evaluators[j].name;
                    if (notebookModel.cells[i].evaluator === name) {
                      var plugin = notebookModel.evaluators[j].plugin;
                      if (bkUtils.beginsWith(name,"Html")) {
                        notebookModel.cells[i].evaluator = "Html";
                      } else if(bkUtils.beginsWith(name,"Latex")) {
                        notebookModel.cells[i].evaluator = "Latex";
                      } else if(bkUtils.beginsWith(name,"JavaScript")) {
                        notebookModel.cells[i].evaluator = "JavaScript";
                      } else if(bkUtils.beginsWith(name,"Groovy")) {
                        notebookModel.cells[i].evaluator = "Groovy";
                      } else if(name === "Python") {
                        notebookModel.cells[i].evaluator = plugin;
                      }
                      break;
                    }
                  }
                }
              }
              for (var k = 0; k < notebookModel.evaluators.length; ++k) {
                var evaluatorName = notebookModel.evaluators[k].name;
                var evaluatorPlugin = notebookModel.evaluators[k].plugin;
                if (bkUtils.beginsWith(evaluatorName,"Html")) {
                  notebookModel.evaluators[k].name = "Html";
                  notebookModel.evaluators[k].plugin = "Html";
                } else if(bkUtils.beginsWith(evaluatorName,"Latex")) {
                  notebookModel.evaluators[k].name = "Latex";
                  notebookModel.evaluators[k].plugin = "Latex";
                } else if(bkUtils.beginsWith(evaluatorName,"JavaScript")) {
                  notebookModel.evaluators[k].name = "JavaScript";
                  notebookModel.evaluators[k].plugin = "JavaScript";
                } else if(bkUtils.beginsWith(evaluatorName,"Groovy")) {
                  notebookModel.evaluators[k].name = "Groovy";
                  notebookModel.evaluators[k].plugin = "Groovy";
                } else if(evaluatorName=== "Python") {
                  notebookModel.evaluators[k].name = evaluatorPlugin;
                }
              }
            }
            // HACK END

            bkSessionManager.backup();
            bkSessionManager.clear();
            sessionId = bkSessionManager.setSessionId(sessionId);

            bkSessionManager.setup(
                notebookUri, uriType, readOnly, format,
                notebookModel, edited, sessionId);

            var mustwait;
            if (!isExistingSession && bkHelper.hasCodeCell("initialization")) {
              mustwait = bkCoreManager.show0ButtonModal("This notebook has initialization cells... waiting for their completion.", "Please Wait");
            }

            // this is used to load evaluators before rendering the page
            if (notebookModel && notebookModel.evaluators) {
              var promises = _(notebookModel.evaluators).map(function(ev) {
                return addEvaluator(ev, !isExistingSession);
              });
              bkUtils.all(promises).then(function() {
                if (!isExistingSession) {
                  bkUtils.log("open", {
                    uri: notebookUri,
                    uriType: uriType,
                    format: format,
                    maxCellLevel: _(notebookModel.cells).max(function(cell) {
                      return cell.level;
                    }).level,
                    cellCount: notebookModel.cells.length
                  });

                  bkHelper.evaluateRoot("initialization")
                    .then(function () {
                      if(mustwait !== undefined)
                        mustwait.close();
                      }, function () {
                        if(mustwait !== undefined)
                          mustwait.close();
                        bkCoreManager.show1ButtonModal("Notebook initialization failed","ERROR",null,"OK");
                      });
                }
              });
              clrLoadingStatusMessage("Loading notebook");
              $scope.loading = false;
              return;
            }

            if (!isExistingSession) {
              bkUtils.log("open", {
                uri: notebookUri,
                uriType: uriType,
                format: format,
                maxCellLevel: _(notebookModel.cells).max(function(cell) {
                  return cell.level;
                }).level,
                cellCount: notebookModel.cells.length
              });
              bkHelper.evaluateRoot("initialization").then(function () { if(mustwait !== undefined) mustwait.close(); });
            }
            clrLoadingStatusMessage("Loading notebook");
            $scope.loading = false;
          };
          return {
            openUri: function(target, sessionId, retry, retryCountMax) {
              if (!target.uri) {
                bkCoreManager.show1ButtonModal("Failed to open notebook, notebookUri is empty");
                return;
              }
              $scope.loading = true;
              showLoadingStatusMessage("Opening URI");
              if (retryCountMax === undefined) {
                retryCountMax = 100;
              }
              if (!target.type) {
                target.type = bkCoreManager.guessUriType(target.uri);
              }
              target.readOnly = !!target.readOnly;
              if (!target.format) {
                target.format = bkCoreManager.guessFormat(target.uri);
              }

              if (bkUtils.isElectron && (target.type == 'file')){
                bkElectron.app.addRecentDocument(target.uri);
              }

              var importer = bkCoreManager.getNotebookImporter(target.format);
              if (!importer) {
                if (retry) {
                  // retry, sometimes the importer came from a plugin that is being loaded
                  retryCountMax -= 1;
                  setTimeout(function() {
                    loadNotebook.openUri(target, retry, retryCountMax);
                  }, 100);
                } else {
                  clrLoadingStatusMessage("Opening URI");
                  $scope.loading = false;
                  bkCoreManager.show1ButtonModal("Failed to open " + target.uri +
                      " because format " + target.format +
                      " was not recognized.", "Open Failed", function() {
                    bkCoreManager.gotoControlPanel();
                  });
                }
              } else {
                var fileLoader = bkCoreManager.getFileLoader(target.type);
                fileLoader.load(target.uri).then(function(fileContentAsString) {
                  var notebookModel = importer.import(fileContentAsString);
                  notebookModel = bkNotebookVersionManager.open(notebookModel);
                  loadNotebookModelAndResetSession(
                      target.uri,
                      target.type,
                      target.readOnly,
                      target.format,
                      notebookModel, false, sessionId, false);
                }).catch(function(data, status, headers, config) {
                  bkHelper.show1ButtonModal(data, "Open Failed", function() {
                    bkCoreManager.gotoControlPanel();
                  });
                }).finally(function() {
                  clrLoadingStatusMessage("Opening URI");
                  $scope.loading = false;
                });
              }
            },
            fromSession: function(sessionId) {
              bkSession.load(sessionId).then(function(session) {
                var notebookUri = session.notebookUri;
                var uriType = session.uriType;
                var readOnly = session.readOnly;
                var format = session.format;
                var notebookModel = angular.fromJson(session.notebookModelJson);
                var edited = session.edited;
                loadNotebookModelAndResetSession(
                    notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, true);
              });
            },
            fromImport: function(sessionId) {
              var notebook = $sessionStorage.importedNotebook;
              var notebookUri = null;
              var uriType = null;
              var readOnly = true;
              var format = null;
              var importer = bkCoreManager.getNotebookImporter('bkr');
              var notebookModel = importer.import(notebook);
              notebookModel = bkNotebookVersionManager.open(notebook);
              loadNotebookModelAndResetSession(
                  notebookUri, uriType, readOnly, format, notebookModel, false, sessionId, false);
            },
            emptyNotebook: function(sessionId) {
              var notebookModel =
                '{"beaker": "2", "evaluators": [{"name": "Html", "plugin": "Html"},' +
                '{"name": "Latex", "plugin": "Latex"},' +
                '{"name": "JavaScript", "plugin": "JavaScript"}], "cells": []}';
              var notebookUri = null;
              var uriType = null;
              var readOnly = true;
              var format = null;
              notebookModel = bkNotebookVersionManager.open(notebookModel);
              loadNotebookModelAndResetSession(
                  notebookUri, uriType, readOnly, format, notebookModel, false, sessionId, false);
            },
            defaultNotebook: function(sessionId) {
              bkUtils.getDefaultNotebook().then(function(notebookModel) {
                var notebookUri = null;
                var uriType = null;
                var readOnly = true;
                var format = null;
                notebookModel = bkNotebookVersionManager.open(notebookModel);
                loadNotebookModelAndResetSession(
                    notebookUri, uriType, readOnly, format, notebookModel, false, sessionId, false);
              });
            }
          };
        })();

        var bkNotebookWidget;
        $scope.setBkNotebook = function(bkNotebook) {
          bkNotebookWidget = bkNotebook;
        };

        var _impl = (function() {

          var promptUriChooser = function(uriType, initUri) {
            if (!uriType) {
              uriType = "file";
            }
            var deferred = bkUtils.newDeferred();
            var fileSaver = bkCoreManager.getFileSaver(uriType);
            if (!fileSaver || !fileSaver.showFileChooser) {
              fileSaver = bkCoreManager.getFileSaver("file");
            }
            fileSaver.showFileChooser(initUri).then(function(ret) {
              if (_.isEmpty(ret.uri)) {
                deferred.reject("cancelled");
              } else {
                deferred.resolve(ret);
              }
            });
            return deferred.promise;
          };

          var promptIfOverwrite = function(uri) {
            var deferred = bkUtils.newDeferred();
            bkCoreManager.show2ButtonModal(
                "File " + uri + " exists. Overwrite?",
                "File exists",
                function() {
                  deferred.reject();
                },
                function() {
                  deferred.resolve();
                }, "Cancel", "Overwrite", "", "btn-danger");
            return deferred.promise;
          };

          var saveAlwaysOverwrite = function(uri, uriType) {
            var deferred = bkUtils.newDeferred();
            var fileSaver = bkCoreManager.getFileSaver(uriType);
            bkSessionManager.dumpDisplayStatus();
            $timeout(function() {
              var content = bkSessionManager.getSaveData().notebookModelAsString;
              return fileSaver.save(uri, content, true);}, 1).then(function() {
                deferred.resolve({uri: uri, uriType: uriType});
              }, function(reason) {
                deferred.reject(reason);
              });
            return deferred.promise;
          };

          var _savePromptIfOverwrite = function(deferred, uri, uriType) {
            var fileSaver = bkCoreManager.getFileSaver(uriType);
            bkSessionManager.dumpDisplayStatus();
            $timeout(function() {
              var content = bkSessionManager.getSaveData().notebookModelAsString;
              return fileSaver.save(uri, content);
            }, 1).then(function() {
              deferred.resolve({uri: uri, uriType: uriType}); // file save succeed
            }, function (reason) {
              if (reason === "exists") {
                promptIfOverwrite(uri).then(function () {
                  saveAlwaysOverwrite(uri, uriType).then(function(ret) {
                    deferred.resolve(ret); // file save succeed
                  }, function(reason) {
                    deferred.reject(reason); // file save failed
                  });
                }, function() {
                  _savePromptUriChooser(deferred, uriType, uri);
                });
              } else if (reason === "isDirectory") {
                bkCoreManager.show1ButtonModal(
                    uri + " is a directory. Please choose a different location",
                    "Save Failed",
                    function () {
                      _savePromptUriChooser(deferred, uriType, uri);
                    });
              } else {
                deferred.reject(reason); // file save failed
              }
            });
          };
          var _savePromptUriChooser = function(deferred, uriType, initUri) {
            promptUriChooser(uriType, initUri).then(function(ret) {
              _savePromptIfOverwrite(deferred, ret.uri, ret.uriType);
            }, function() {
              deferred.reject("cancelled"); // file save cancelled
            });
          };

          var savePromptChooseUri = function() {
            var deferred = bkUtils.newDeferred();
            _savePromptUriChooser(deferred);
            return deferred.promise;
          };

          var savePromptIfOverwrite = function(uri, uriType) {
            var deferred = bkUtils.newDeferred();
            _savePromptIfOverwrite(deferred, uri, uriType);
            return deferred.promise;
          };

          var saveStart = function() {
            showLoadingStatusMessage("Saving");
          };
          var updateSessionStore = function(uri, uriType) {
            return bkSession.getSessions().then(function(sessions){
              var sessionID = bkSessionManager.getSessionId();
              var currentSession = sessions[sessionID];
              currentSession.uriType = uriType;
              currentSession.notebookModelJson = JSON.stringify(bkHelper.getNotebookModel());
              currentSession.notebookUri = uri;
              return bkSession.backup(sessionID, currentSession);
            });
          };
          var saveDone = function(ret) {
            bkSessionManager.setNotebookModelEdited(false);
            bkSessionManager.updateNotebookUri(ret.uri, ret.uriType, false, "bkr");
            updateSessionStore(ret.uri, ret.uriType);
            showTransientStatusMessage("Saved");
          };

          var saveFailed = function (msg) {
            if (msg === "cancelled") {
              showTransientStatusMessage("Cancelled");
            } else {
              bkCoreManager.show1ButtonModal(msg, "Save Failed");
              showTransientStatusMessage("Save Failed");
            }
          };

          function _closeNotebook() {
            var closeSession = function() {
              bkSessionManager.close().then(function() {
                bkCoreManager.gotoControlPanel();
              });
            };
            if (bkSessionManager.isNotebookModelEdited() === false) {
              closeSession();
            } else {
              var notebookTitle = bkSessionManager.getNotebookTitle();
              bkHelper.show3ButtonModal(
                  "Do you want to save " + notebookTitle + "?",
                  "Confirm close",
                  function() {
                    _impl.saveNotebook().then(closeSession);
                  },
                  function() {
                    closeSession();
                  },
                  null, "Save", "Don't save"
              );
            }
          };

          function closeNotebook() {
            if (bkEvaluateJobManager.isAnyInProgress() ) {
              bkCoreManager.show2ButtonModal(
                  "All running and pending cells will be cancelled.",
                  "Warning!",
                  function() {
                    bkEvaluateJobManager.cancelAll().then(function() {
                      _impl._closeNotebook();
                    }
                  ); });
            } else
              _closeNotebook();
          };

          var evalCodeId = 0;

          if (bkUtils.isElectron) {
            bkElectron.IPC.removeAllListeners('close-window');
            bkElectron.IPC.on('close-window', closeNotebook);
          }

          return {
            name: "bkNotebookApp",
            getSessionId: function() {
              return bkSessionManager.getSessionId();
            },
            getNotebookModel: function() {
              return bkSessionManager.getRawNotebookModel();
            },
            getBeakerObject: function() {
              return bkSessionManager.getBeakerObject();
            },
            showStatus: function(message, nodigest) {
              showLoadingStatusMessage(message, nodigest);
            },
            updateStatus: function() {
              updateLoadingStatusMessage();
            },
            getStatus: function() {
              return getLoadingStatusMessage();
            },
            clearStatus: function(message, nodigest) {
              clrLoadingStatusMessage(message, nodigest);
            },
            showTransientStatus: function(message, nodigest) {
              showTransientStatusMessage(message, nodigest);
            },

            saveNotebook: function() {
              saveStart();
              var thenable;
              if (bkSessionManager.isSavable()) {
                bkSessionManager.dumpDisplayStatus();
                thenable = $timeout(function() {
                  var saveData = bkSessionManager.getSaveData();
                  var deferred = bkUtils.newDeferred();
                  var fileSaver = bkCoreManager.getFileSaver(saveData.uriType);
                  var content = saveData.notebookModelAsString;
                  fileSaver.save(saveData.notebookUri, content, true).then(function() {
                    deferred.resolve({uri: saveData.notebookUri, uriType: saveData.uriType});
                  }, function(reason) {
                    deferred.reject(reason);
                  });
                  return deferred.promise;
                }, 1);
              } else {
                if (bkUtils.isElectron){
                  var BrowserWindow = bkElectron.BrowserWindow;
                  var Dialog = bkElectron.Dialog;
                  var thisWindow = bkElectron.thisWindow;
                  var deferred = bkUtils.newDeferred();
                  bkUtils.getWorkingDirectory().then(function(defaultPath) {
                    var options = {
                      title: 'Save Beaker Notebook',
                      defaultPath: defaultPath,
                      filters: [
                        { name: 'Beaker Notebook Files', extensions: ['bkr'] }
                      ]
                    };
                    var path = Dialog.showSaveDialog(thisWindow, options);
                    if (path === undefined){
                      saveFailed('cancelled');
                      return;
                    }
                    bkUtils.httpPost('rest/file-io/setWorkingDirectory', { dir: path });
                    var ret = {
                      uri: path,
                      uriType: 'file'
                    };
                    bkSessionManager.dumpDisplayStatus();
                    var saveData = bkSessionManager.getSaveData();
                    var fileSaver = bkCoreManager.getFileSaver(ret.uriType);
                    var content = saveData.notebookModelAsString;
                    fileSaver.save(ret.uri, content, true).then(function() {
                      deferred.resolve(ret);
                    }, function(reason) {
                      deferred.reject(reason);
                    });
                  });
                  thenable = deferred.promise;
                } else {
                  thenable = savePromptChooseUri();
                }
              }
              return thenable.then(saveDone, saveFailed);
            },
            saveNotebookAs: function(notebookUri, uriType) {
              if (_.isEmpty(notebookUri)) {
                console.error("cannot save notebook, notebookUri is empty");
                return;
              }
              saveStart();
              return savePromptIfOverwrite(notebookUri, uriType).then(saveDone, saveFailed);
            },
            closeNotebook: closeNotebook,
            _closeNotebook: _closeNotebook,
            collapseAllSections: function() {
              _.each(this.getNotebookModel().cells, function(cell) {
                if (cell.type == "section") {
                  cell.collapsed = true;
                }
              });
            },
            hasCodeCell: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // toEval can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              // or a cellModel
              // or an array of cellModels
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                  // this is a cellID
                  if (cellOp.isContainer(toEval)) {
                    // this is a section cell or root cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                    // single cell, just get the cell model from cellID
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                  // not a cellID
                  if (toEval === "initialization") {
                    // in this case toEval is going to be an array of cellModels
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                    // this is a user tag for a cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                    // assume it is a evaluator name,
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithEvaluator(toEval);
                  }
                }
              }
              if (toEval === undefined || (_.isArray(toEval) && toEval.length === 0)) {
                return false;
              }
              return true;
            },
            evaluate: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // toEval can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              // or a cellModel
              // or an array of cellModels
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                  // this is a cellID
                  if (cellOp.isContainer(toEval)) {
                    // this is a section cell or root cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                    // single cell, just get the cell model from cellID
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                  // not a cellID
                  if (toEval === "initialization") {
                    // in this case toEval is going to be an array of cellModels
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                    // this is a user tag for a cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                    // assume it is a evaluator name,
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithEvaluator(toEval);
                  }
                }
              }
              if (toEval === undefined || (!_.isArray(toEval) && toEval.length === 0)) {
                showTransientStatusMessage("ERROR: cannot find anything to evaluate");
                return "cannot find anything to evaluate";
              }
              if (!_.isArray(toEval)) {
                return bkEvaluateJobManager.evaluate(toEval);
              } else {
                return bkEvaluateJobManager.evaluateAll(toEval);
              }
            },
            evaluateRoot: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // toEval can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              // or a cellModel
              // or an array of cellModels
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                  // this is a cellID
                  if (cellOp.isContainer(toEval)) {
                    // this is a section cell or root cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                    // single cell, just get the cell model from cellID
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                  // not a cellID
                  if (toEval === "initialization") {
                    // in this case toEval is going to be an array of cellModels
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                    // this is a user tag for a cell
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                    // assume it is a evaluator name,
                    // in this case toEval is going to be an array of cellModels
                    toEval = cellOp.getCellsWithEvaluator(toEval);
                  }
                }
              }
              if (toEval === undefined || (!_.isArray(toEval) && toEval.length === 0)) {
                showTransientStatusMessage("ERROR: cannot find anything to evaluate");
                return "cannot find anything to evaluate";
              }
              if (!_.isArray(toEval)) {
                return bkEvaluateJobManager.evaluateRoot(toEval);
              } else {
                return bkEvaluateJobManager.evaluateRootAll(toEval);
              }
            },
            evaluateCode: function(evaluator, code) {
              var outcontainer = { };
              var deferred = bkHelper.newDeferred();
              evalCodeId++;
              bkEvaluateJobManager.evaluate({
                id: "onTheFlyCell_"+evalCodeId,
                evaluator: evaluator,
                input: { body: code },
                output: outcontainer
              }).then(function() { deferred.resolve(outcontainer.result); }, function(err) { deferred.reject(err); });
              return deferred.promise;
            },
            addEvaluator: function(settings) {
              return addEvaluator(settings, true);
            },
            removeEvaluator: function(plugin) {
              bkEvaluatorManager.removeEvaluator(plugin);
              evaluatorMenuItems = _.reject(evaluatorMenuItems, function(item) {
                return item.name == plugin;
              });
            },
            getEvaluatorMenuItems: function() {
              return evaluatorMenuItems;
            },
            getBkNotebookWidget: function() {
              return bkNotebookWidget;
            },
            toggleNotebookLocked: function() {
              return bkSessionManager.toggleNotebookLocked();
            },
            isNotebookLocked: function() {
              return bkSessionManager.isNotebookLocked();
            },
            // return the names of all enabled evaluators
            getEvaluators: function() {
              var evals = bkEvaluatorManager.getAllEvaluators();
              var ret = [];
              for (var key in evals) {
                if (evals.hasOwnProperty(key)) {
                  ret.push(key);
                }
              }
              return ret;
            },
            // get (a subset of) code cells
            getCodeCells: function(filter) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              // filter can be a tagName (string), either "initialization", name of an evaluator or user defined tag
              // or a cellID (string)
              if (!filter) {
                // get all code cells
                filter = cellOp.getAllCodeCells();
              } else if (typeof filter !== "string")
                return [];
              else if (cellOp.hasCell(filter)) {
                // this is a cellID
                if (cellOp.isContainer(filter)) {
                  // this is a section cell or root cell
                  // in this case toEval is going to be an array of cellModels
                  filter = cellOp.getAllCodeCells(filter);
                } else {
                  // single cell, just get the cell model from cellID
                  filter = cellOp.getCell(filter);
                }
              } else {
                // not a cellID
                if (filter === "initialization") {
                  // in this case toEval is going to be an array of cellModels
                  filter = bkSessionManager.notebookModelGetInitializationCells();
                } else if(cellOp.hasUserTag(filter)) {
                  // this is a user tag for a cell
                  // in this case toEval is going to be an array of cellModels
                  filter = cellOp.getCellsWithUserTag(filter);
                } else {
                  // assume it is a evaluator name,
                  // in this case toEval is going to be an array of cellModels
                  filter = cellOp.getCellsWithEvaluator(filter);
                }
              }
              if (filter === undefined || (!_.isArray(filter) && filter.length === 0)) {
                return [];
              }
              var ret = [];

              if (_.isArray(filter)) {
                var i;
                for ( i = 0 ; i < filter.length ; i++ ) {
                  var cell = filter[i];
                  var o = {};
                  o.cellId = cell.id;
                  o.evaluatorId = cell.evaluator;
                  o.code = cell.input.body;
                  o.tags = cell.tags;
                  if (cell.dataresult !== undefined) {
                    o.output = cell.dataresult;
                  } else if (cell.output !== undefined && cell.output.result !== undefined) {
                    if (cell.output.result.type !== undefined) {
                      if (cell.output.result.type === 'BeakerDisplay') {
                        o.output = cell.output.result.object;
                      } else {
                        o.outputtype = cell.output.result.type;
                        o.output = cell.output.result;
                      }
                    } else {
                      o.output = cell.output.result;
                    }
                  }
                  o.type = "BeakerCodeCell";
                  ret.push(o);
                }
              } else {
                var tmpCell = {};
                tmpCell.cellId = filter.id;
                tmpCell.evaluatorId = filter.evaluator;
                tmpCell.code = filter.input.body;
                if (filter.dataresult !== undefined) {
                  tmpCell.output = filter.dataresult;
                } else if (filter.output !== undefined && filter.output.result !== undefined) {
                  if (filter.output.result.type !== undefined) {
                    if (filter.output.result.type === 'BeakerDisplay') {
                      tmpCell.output = filter.output.result.object;
                    } else {
                      tmpCell.outputtype = filter.output.result.type;
                      tmpCell.output = filter.output.result;
                    }
                  } else {
                    tmpCell.output = filter.output.result;
                  }
                }
                tmpCell.tags = filter.tags;
                tmpCell.type = "BeakerCodeCell";
                ret.push(tmpCell);
              }
              return ret;
            },
            // set a code cell body
            setCodeCellBody: function(name, code) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              if (!cellOp.hasCell(name))
                return "Error: cell "+name+" does not exist";
              if (cellOp.isContainer(name))
                return "Error: cell "+name+" is not code cell";
              var cell  = cellOp.getCell(name);
              if ( cell.input === undefined || cell.input.body === undefined )
                return "Error: cell "+name+" is not code cell";
              cell.input.body = code;
              return "";
            },
            // set a code cell evaluator
            setCodeCellEvaluator: function(name, evaluator) {
              var evals = this.getEvaluators();
              if ( evals.indexOf(evaluator)==-1 )
                return "Error: evaluator "+evaluator+" does not exist";
              var cellOp = bkSessionManager.getNotebookCellOp();
              if (!cellOp.hasCell(name))
                return "Error: cell "+name+" does not exist";
              if (cellOp.isContainer(name))
                return "Error: cell "+name+" is not code cell";
              var cell  = cellOp.getCell(name);
              if ( cell.input === undefined || cell.input.body === undefined )
                return "Error: cell "+name+" is not code cell";
              cell.evaluator = evaluator;
              cellOp.rebuildMaps();
              return "";
            },
            // set a code cell tags
            setCodeCellTags: function(name, tags) {
              var cellOp = bkSessionManager.getNotebookCellOp();
              if (!cellOp.hasCell(name))
                return "Error: cell "+name+" does not exist";
              if (cellOp.isContainer(name))
                return "Error: cell "+name+" is not code cell";
              var cell  = cellOp.getCell(name);
              cell.tags = tags;
              cellOp.rebuildMaps();
              return "";
            }
          };
        })();
        bkCoreManager.setBkAppImpl(_impl);

        var setDocumentTitle = function() {
          if ($scope.allowDocumentRenaming === 'false') { return; }

          var edited = $scope.isEdited(),
              filename = $scope.filename(),
              title;

          title = filename;
          if (edited) {
            title = '*' + title;
          }

          document.title = title;
          if (bkHelper.isElectron) {
            bkElectron.thisWindow.pageTitle = title;
          }
        };

        $scope.isEdited = function() {
          return bkSessionManager.isNotebookModelEdited();
        };
        $scope.$watch('isEdited()', function(edited, oldValue) {
          if (edited === oldValue) return;
          setDocumentTitle();
        });
        $scope.$watch('filename()', function(newVal, oldVal) {
          if (newVal === oldVal) return;
          setDocumentTitle();
        });

        var intervalID = null;
        var stopAutoBackup = function() {
          if (intervalID) {
            clearInterval(intervalID);
          }
          intervalID = null;
        };
        var startAutoBackup = function() {
          stopAutoBackup();
          intervalID = setInterval(bkSessionManager.backup, 60 * 1000);
        };
        $scope.getMenus = function() {
          return bkMenuPluginManager.getMenus();
        };
        if (bkUtils.isElectron) {
          window.addEventListener('focus', function() {
            bkElectron.updateMenus(bkMenuPluginManager.getMenus());
          });
        }
        var keydownHandler = function(e) {
          if (e.ctrlKey && !e.altKey && (e.which === 83)) { // Ctrl + s
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 83)) { // Cmd + s
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          } else if (e.target.nodeName !== "TEXTAREA") {
            if (e.ctrlKey && e.which === 90) { // Ctrl + z
              bkUtils.fcall(function() {
                bkSessionManager.undo();
              });
              return false;
            } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 90)) { // Cmd + z
              bkUtils.fcall(function() {
                bkSessionManager.undo();
              });
              return false;
            } else if (e.ctrlKey && e.which === 89) { // Ctrl + z
              bkUtils.fcall(function() {
                bkSessionManager.redo();
              });
              return false;
            } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 89)) { // Cmd + z
              bkUtils.fcall(function() {
                bkSessionManager.redo();
              });
              return false;
            // TODO implement global redo
            } else if (bkUtils.isElectron) {
              var ctrlXORCmd = (e.ctrlKey || e.metaKey) && !(e.ctrlKey && e.metaKey);
              if (e.which === 123) { // F12
                bkElectron.toggleDevTools();
              } else if (ctrlXORCmd && ((e.which === 187) || (e.which === 107))) { // Ctrl + '+'
                bkElectron.increaseZoom();
              } else if (ctrlXORCmd && ((e.which === 189) || (e.which === 109))) { // Ctrl + '-'
                bkElectron.decreaseZoom();
              } else if (ctrlXORCmd && ((e.which === 48) || (e.which === 13))) {
                bkElectron.resetZoom();
              }
              return false;
            }
          }
        };
        $(document).bind('keydown', keydownHandler);
        var onDestroy = function() {
          bkSessionManager.backup();
          stopAutoBackup();
          bkCoreManager.setBkAppImpl(null);
          $(document).unbind('keydown', keydownHandler);
          window.onbeforeunload = null;
          bkUtils.removeConnectedStatusListener();
        };

        $scope.$on("$destroy", onDestroy);
        window.onbeforeunload = function(e) {
          bkSessionManager.backup();
          if (bkSessionManager.isNotebookModelEdited()) {
            return "Your notebook has been edited but not saved, if you close the page your changes may be lost";
          }
          if (bkEvaluateJobManager.isAnyInProgress()) {
            return "Some cells are still running. Leaving the page now will cause cancelling and result be lost";
          }
          onDestroy();
        };
        window.onunload = function() {
          bkEvaluateJobManager.cancel();
        };
        startAutoBackup();
        $scope.gotoControlPanel = function(event) {
          if (bkUtils.isMiddleClick(event)) {
            window.open($location.absUrl() + '/beaker');
          } else {
            bkCoreManager.gotoControlPanel();
          }
        };

        $scope.getElectronMode = function() {
          return bkUtils.isElectron;
        }

        $scope.filename = function() {
          return bkSessionManager.getNotebookTitle();
        };

        $scope.pathname = function() {
          return bkSessionManager.getNotebookPath();
        };

        $scope.$on("$locationChangeStart", function(event, next, current) {
          if (bkEvaluateJobManager.isAnyInProgress() && next.indexOf("force=yes") === -1) {
            event.preventDefault();
            bkCoreManager.show2ButtonModal(
                "All running and pending cells will be cancelled.",
                "Warning!",
                function() {
                  bkEvaluateJobManager.cancelAll().then(function() {
                    bkSessionManager.backup().then(function() {
                      bkSessionManager.clear();
                      var routeParams = {force: "yes"};
                      var splits = decodeURIComponent(next.split("#")[1]).split("?");
                      var path = splits[0];
                      var search = splits[1];
                      if (search) {
                        var vars = search.split('&').forEach(function(v) {
                          var pair = v.split('=');
                          routeParams[pair[0]] = pair[1];
                        });
                      }
                      $location.path(path).search(routeParams);
                    });
                  });
                }
            );
          }
        });

        $scope.promptToSave = (function() {
          var prompted = false;
          return function() {
            if (prompted) { // prevent prompting multiple at the same time
              return;
            }
            prompted = true;
            bkCoreManager.show2ButtonModal(
                "Beaker server disconnected. Further edits will not be saved.<br>" +
                "Save current notebook as a file?",
                "Disconnected",
                function() {
                  // "Save", save the notebook as a file on the client side
                  bkSessionManager.dumpDisplayStatus();
                  $timeout(function() {
                    bkUtils.saveAsClientFile(
                        bkSessionManager.getSaveData().notebookModelAsString,
                    "notebook.bkr");
                  }, 1);
                },
                function() {
                  // "Not now", hijack all keypress events to prompt again
                  window.addEventListener('keypress', $scope.promptToSave, true);
                },
                "Save", "Not now", "btn-primary", ""
            ).then(function() {
              prompted = false;
            });
          };
        })();

        var connectionManager = (function() {
          var RECONNECT_TIMEOUT = 5000; // 5 seconds
          var OFFLINE_MESSAGE = "offline";
          var CONNECTING_MESSAGE = "reconnecting";
          var reconnectTimeout;
          var statusMessage = OFFLINE_MESSAGE;
          var disconnected = false;
          var indicateReconnectFailed = function() {
            stopWaitingReconnect();
            statusMessage = OFFLINE_MESSAGE;
            bkUtils.disconnect(); // prevent further attempting to reconnect
            $scope.promptToSave();
          };
          var waitReconnect = function() {
            statusMessage = CONNECTING_MESSAGE;

            // wait for 5 sceonds, if reconnect didn't happen, prompt to save
            if (!reconnectTimeout) {
              reconnectTimeout = $timeout(indicateReconnectFailed, RECONNECT_TIMEOUT);
            }
            // if user attempts to interact within 5 second, also prompt to save
            window.addEventListener('keypress', indicateReconnectFailed, true);
          };
          var stopWaitingReconnect = function() {
            if (reconnectTimeout) {
              $timeout.cancel(reconnectTimeout);
              reconnectTimeout = undefined;
            }
            window.removeEventListener('keypress', indicateReconnectFailed, true);
          };

          return {
            onDisconnected: function() {
              disconnected = true;
              waitReconnect();
            },
            onReconnected: function() {
              bkSessionManager.isSessionValid().then(function(isValid) {
                if (isValid) {
                  stopWaitingReconnect();
                  disconnected = false;
                  bkSessionManager.reconnectEvaluators();
                } else {
                  indicateReconnectFailed();
                }
              });
            },
            getStatusMessage: function() {
              return statusMessage;
            },
            isDisconnected: function() {
              return disconnected;
            }
          };
        })();

        $scope.getOffineMessage = function() {
          return connectionManager.getStatusMessage();
        };
        $scope.isDisconnected = function() {
          return connectionManager.isDisconnected();
        };

        bkUtils.addConnectedStatusListener(function(msg) {
          if (msg.successful === $scope.isDisconnected()) {
            var disconnected = !msg.successful;
            if (disconnected) {
              connectionManager.onDisconnected();
            } else {
              connectionManager.onReconnected();
            }
            $scope.$digest();
          }
        });
        $scope.$watch('isDisconnected()', function(disconnected) {
          if (disconnected) {
            stopAutoBackup();
          } else {
            startAutoBackup();
          }
        });

        setDocumentTitle();

        // ensure an existing session is cleared so that the empty notebook model
        // makes the UI is blank immediately (instead of showing leftover from a previous session)
        bkSessionManager.clear();

        bkMenuPluginManager.clear();
        if (window.beaker === undefined || window.beaker.isEmbedded === undefined) {
          bkUtils.httpGet('../beaker/rest/util/getMenuPlugins')
          .success(function(menuUrls) {
            menuUrls.forEach(function(url) {
              bkMenuPluginManager.loadMenuPlugin(url);
            });
          });
        } else {
          var menues = window.beaker.getMenuItems();
          bkMenuPluginManager.attachMenus(menues);
        }
        bkCellMenuPluginManager.reset();
        bkEvaluateJobManager.reset();

        if ($scope.newSession === "new") {
          loadNotebook.defaultNotebook($scope.sessionId);
        } else if ($scope.newSession === "empty") {
          loadNotebook.emptyNotebook($scope.sessionId);
        } else if ($scope.isImport === 'true') {
          loadNotebook.fromImport($scope.sessionId);
        } else if ($scope.isOpen === 'true') {
          loadNotebook.openUri($scope.notebook, $scope.sessionId, true);
        } else {
          loadNotebook.fromSession($scope.sessionId);
        }
      }
    };
  });
})();

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

(function() {
  'use strict';
  var module = angular.module('bk.evaluateJobManager', ['bk.utils', 'bk.evaluatorManager']);
  module.factory('bkEvaluateJobManager', function(bkUtils, bkEvaluatorManager, $timeout) {

    var outputMap = { };

    var errorMessage = function(msg) {
      return {
        type: "BeakerDisplay",
        innertype: "Error",
        object: msg
      };
    };
    var textMessage = function(msg) {
      return {
        type: "BeakerDisplay",
        innertype: "Text",
        object: msg
      };
    };
    var ERROR_MESSAGE_ON_EARLIER_FAILURE =
      errorMessage("Evaluation cancelled due to a failure of an earlier cell evaluation");
    var ERROR_MESSAGE_ON_CANCEL =
      errorMessage("... cancelled!");
    var MESSAGE_PENDING =
      textMessage("pending");
    var MESSAGE_WAITING_FOR_EVALUTOR_INIT =
      textMessage("waiting for evaluator initialization ...");

    var jobQueue = (function() {

      var _queue = [];
      var _jobInProgress = [];
      var running = {};

      var evaluateJob = function(job) {
        job.evaluator = bkEvaluatorManager.getEvaluator(job.evaluatorId);
        if (job.evaluator) {
          bkUtils.log("evaluate", {
            plugin: job.evaluator.pluginName,
            length: job.code.length });
          return job.evaluator.evaluate(job.code, job.output, outputMap[job.cellId], job.cellId);
        }
        job.output.result = MESSAGE_WAITING_FOR_EVALUTOR_INIT;
        return bkEvaluatorManager.waitEvaluator(job.evaluatorId)
          .then(function(ev) {
            job.evaluator = ev;
            if (ev !== undefined)
              return job.evaluator.evaluate(job.code, job.output, outputMap[job.cellId], job.cellId);
            return "cannot find evaluator for "+job.evaluatorId;
          } );
      };

      var doNext = function(innext) {
        var job;

        if (_jobInProgress.length == 0) {
          // start a new root job
          job = _queue.shift();
        } else {
          // we have something executing...
          var last = _jobInProgress[_jobInProgress.length-1];
          if (last.runchild !== undefined && last.runchild.finished) {
            last.runchild = undefined;
          }
          if (last.finished && last.cancel_deferred !== undefined) {
            var parent, idx;
            // this job has finished but due to cancellation
            if (_jobInProgress.length > 1) {
              // we have a parent job to cancel
              parent = _jobInProgress[_jobInProgress.length-2];
            }

            if (parent !== undefined) {
              parent.cancel_deferred = last.cancel_deferred;
              if (parent.evaluator && parent.evaluator.cancelExecution) {
                parent.evaluator.cancelExecution();
              }
              for(idx = 0; idx<parent.children.length; idx++) {
                parent.children[idx].output.result=ERROR_MESSAGE_ON_CANCEL;
                parent.children[idx].whendone.reject('... cancelled!');
                delete running[parent.children[idx].cellId];
              }
              parent.children = [];
            } else {
              for(idx = 0; idx<_queue.length; idx++) {
                _queue[idx].output.result=ERROR_MESSAGE_ON_CANCEL;
                _queue[idx].whendone.reject('... cancelled!');
                delete running[_queue[idx].cellId];
              }
              _queue = [];
            }
            last.whendone.reject('... cancelled!');
            delete running[last.cellId];
            _jobInProgress.pop();
            bkHelper.clearStatus("Evaluating " + last.evaluatorId + " cell " + last.cellId, true);
            if (parent !== undefined) {
              bkHelper.showStatus("Evaluating " + parent.evaluatorId + " cell " + parent.cellId, true);
            } else {
              last.cancel_deferred.resolve('done');
            }
            doNext(true);
            if (innext === undefined)
              bkHelper.updateStatus();
            return;
          }
          else if (last.runchild === undefined && last.children.length > 0) {
            // check if we can start a children
            job = last.children[0];
            last.children.shift();
            last.runchild = job;
          } else if (last.finished && last.children.length === 0) {
            // check if this has finished
            if (last.error) {
              last.whendone.reject(last.error);
              if (_jobInProgress.length > 1) {
                // we have a parent job to cancel
                var parent = _jobInProgress[_jobInProgress.length-2];

                var idx;
                for(idx = 0; idx<parent.children.length; idx++) {
                  parent.children[idx].output.result=ERROR_MESSAGE_ON_EARLIER_FAILURE;
                  parent.children[idx].whendone.reject("Evaluation cancelled due to a failure of an earlier cell evaluation");
                  delete running[parent.children[idx].cellId];
                }
                parent.children = [];
              } else {
                var idx;
                for(idx = 0; idx<_queue.length; idx++) {
                  _queue[idx].output.result=ERROR_MESSAGE_ON_EARLIER_FAILURE;
                  _queue[idx].whendone.reject("Evaluation cancelled due to a failure of an earlier cell evaluation");
                  delete running[_queue[idx].cellId];
                }
                _queue = [];
              }
            } else
              last.whendone.resolve(last.output);
            bkHelper.clearStatus("Evaluating " + last.evaluatorId + " cell " + last.cellId, true);
            delete running[last.cellId];
            _jobInProgress.pop();
            if (_jobInProgress.length > 0) {
              job = _jobInProgress[_jobInProgress.length-1];
              bkHelper.showStatus("Evaluating " + job.evaluatorId + " cell " + job.cellId, true);
            }
            doNext(true);
            if (innext === undefined)
              bkHelper.updateStatus();
            return;
          }
        }

        if (job === undefined) {
          $timeout(function() { bkHelper.refreshRootScope(); }, 0);
          return;
        }

        _jobInProgress.push(job);
        bkHelper.showStatus("Evaluating " + job.evaluatorId + " cell " + job.cellId, true);

        evaluateJob(job)
        .then(function(data) {
          job.finished = true;
          job.output = data;
          doNext();
        }, function(err) {
          job.finished = true;
          job.error = err;
          doNext();
        });
        if (innext === undefined)
          bkHelper.updateStatus();
      };

      return {
        add: function(job) {
          running[job.cellId] = true;
          _queue.push(job);
        },
        addChildren: function(job, child) {
          running[child.cellId] = true;
          job.children.push(child);
        },
        getCurrentJob: function() {
          if (_jobInProgress.length > 0)
            return _jobInProgress[_jobInProgress.length-1];
          return undefined;
        },
        cancelAll: function() {
          var idx;
          for ( idx=0; idx<_queue.length; idx++) {
            _queue[idx].output.output.result = ERROR_MESSAGE_ON_CANCEL;
            delete running[_queue[idx].cellId];
          }
          _queue = [];
        },
        isRunning: function(n) {
          return running[n] === true;
        },
        tick: function() {
          bkUtils.fcall(doNext);
        }
      };
    })();

    return {
      // evaluate a cell (as a subcell of currently running cell)
      evaluate: function(cell, notick) {
        var parent = jobQueue.getCurrentJob();
        if (parent === undefined)
          return this.evaluateRoot(cell);

        var deferred = bkUtils.newDeferred();
        if (jobQueue.isRunning(cell.id)) {
          bkHelper.showTransientStatus("ERROR: restart blocked for cell "+cell.id);
          console.log("RESTART PROHIBITED for cell "+cell.id);
          // prevent self restart
          deferred.reject("RESTART PROHIBITED for cell "+cell.id);
          return deferred.promise;
        }
        cell.output.result = MESSAGE_PENDING;
        if (!cell.output) {
          cell.output = {};
        }
        var evalJob = {
          parent: parent,
          cellId: cell.id,
          evaluatorId: cell.evaluator,
          code: cell.input.body,
          output: cell.output,
          retry: 0,
          finished: false,
          runchild: undefined,
          children: [],
          whendone : deferred
        };
        jobQueue.addChildren(parent,evalJob);
        if (notick === undefined)
          jobQueue.tick();
        return deferred.promise;
      },
      // evaluate a cell in top level context
      evaluateRoot: function(cell, notick) {
        var deferred = bkUtils.newDeferred();
        if (jobQueue.isRunning(cell.id)) {
          bkHelper.showTransientStatus("ERROR: restart blocked for cell "+cell.id);
          console.log("RESTART PROHIBITED for cell "+cell.id);
          // prevent self restart
          deferred.reject("RESTART PROHIBITED for cell "+cell.id);
          return deferred.promise;
        }
        cell.output.result = MESSAGE_PENDING;
        if (!cell.output) {
          cell.output = {};
        }
        var evalJob = {
          parent: parent,
          cellId: cell.id,
          evaluatorId: cell.evaluator,
          code: cell.input.body,
          output: cell.output,
          retry: 0,
          finished: false,
          runchild: undefined,
          children: [],
          whendone : deferred
        };
        jobQueue.add(evalJob);
        if (notick === undefined)
          jobQueue.tick();
        return deferred.promise;
      },
      // evaluate a cell (as a subcell of currently running cell)
      evaluateAll: function(cells) {
        var self = this;
        var promises = _(cells).map(function(cell) {
          return self.evaluate(cell, true);
        });
        jobQueue.tick();
        return bkUtils.all(promises);
      },
      // evaluate all cells in top level context
      evaluateRootAll: function(cells, parent) {
        var self = this;
        var promises = _(cells).map(function(cell) {
          return self.evaluateRoot(cell, true);
        });
        jobQueue.tick();
        return bkUtils.all(promises);
      },
      isCancellable: function() {
        var currentJob = jobQueue.getCurrentJob();
        return !!(currentJob && currentJob.evaluator && currentJob.evaluator.cancelExecution);
      },
      cancel: function() {
        var currentJob = jobQueue.getCurrentJob();
        var deferred = bkUtils.newDeferred();

        if (currentJob && currentJob.evaluator) {
          if (currentJob.evaluator.cancelExecution) {
            currentJob.cancel_deferred = deferred;
            currentJob.evaluator.cancelExecution();
            return deferred.promise;
          }
        }
        deferred.resolve();
        return deferred.promise;
      },
      cancelAll: function() {
        var currentJob = jobQueue.getCurrentJob();
        var deferred = bkUtils.newDeferred();

        jobQueue.cancelAll();

        if (currentJob && currentJob.evaluator) {
          if (currentJob.evaluator.cancelExecution) {
            currentJob.cancel_deferred = deferred;
            currentJob.evaluator.cancelExecution();
            return deferred.promise;
          }
        }
        deferred.resolve();
        return deferred.promise;
      },
      isAnyInProgress: function() {
        return !!jobQueue.getCurrentJob();
      },
      reset: function() {
        this.cancelAll();
      },
      registerOutputCell: function(id, out) {
        outputMap[id] = out;
      },
      deRegisterOutputCell: function(id) {
        delete outputMap[id];
      },
      getOutputCell: function(id) {
        return outputMap[id];
      },

    };
  });

})();

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
 * Module bk.evaluatorPluginManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.evaluatorManager', ['bk.utils', 'bk.evaluatePluginManager']);

  module.factory('bkEvaluatorManager', function (bkUtils, bkEvaluatePluginManager) {

    var evaluators = {};
    var loadingInProgressEvaluators = [];
    return {
      reset: function() {
        evaluators = {};
      },
      removeEvaluator: function(plugin) {
        for (var key in evaluators) {
          var e = evaluators[key];
          if (e.pluginName === plugin) {
            if (_.isFunction(e.exit)) {
              e.exit();
            }
            delete evaluators[key];
          }
        }
      },
      newEvaluator: function(evaluatorSettings) {
        if (loadingInProgressEvaluators.indexOf(evaluatorSettings) === -1)
	      loadingInProgressEvaluators.push(evaluatorSettings);
	    var deferred = bkUtils.newDeferred();
	    bkEvaluatePluginManager.getEvaluatorFactoryAndShell(evaluatorSettings)
	    .then(function(evaluator) {
	      if(evaluator === undefined) {
	        deferred.reject("cannot create evaluator factory");
	        return;
	      }
	      if (_.isEmpty(evaluatorSettings.name)) {
	        if (!evaluators[evaluator.pluginName]) {
	          evaluatorSettings.name = evaluator.pluginName;
	        } else {
	          evaluatorSettings.name = evaluator.pluginName + "_" + bkUtils.generateId(6);
	        }
	      }

	      if (!evaluatorSettings.view) {
	        evaluatorSettings.view = {};
	      }
	      if (!evaluatorSettings.view.cm) {
	        evaluatorSettings.view.cm = {};
	      }
	      evaluatorSettings.view.cm.mode = evaluator.cmMode;
	      evaluators[evaluatorSettings.name] = evaluator;
	      if ( evaluatorSettings.deferred !== undefined ) {
	        evaluatorSettings.deferred.resolve(evaluator);
	        delete evaluatorSettings.deferred;
	      }
	      deferred.resolve(evaluator);
	    })
	    .finally(function() {
	      var index = loadingInProgressEvaluators.indexOf(evaluatorSettings);
	      loadingInProgressEvaluators.splice(index, 1);
	    });
        return deferred.promise;
      },
      getEvaluator: function(evaluatorId) {
        return evaluators[evaluatorId];
      },
      waitEvaluator: function(evaluatorId) {
        var deferred = bkUtils.newDeferred();
        if (evaluators[evaluatorId] !== undefined) {
          deferred.resolve(evaluators[evaluatorId]);
        } else {
          var i;
          for ( i = 0; i < loadingInProgressEvaluators.length; i ++ ) {
            if (loadingInProgressEvaluators[i].name === evaluatorId) {
              loadingInProgressEvaluators[i].deferred = deferred;
              break;
            }
          }
          if (i === loadingInProgressEvaluators.length) {
            deferred.resolve(undefined);
          }
        }
        return deferred.promise;
      },

      getVisualParams: function(name) {
        if (evaluators[name] === undefined)
          return bkEvaluatePluginManager.getVisualParams(name);
        var v = { };
        var e = evaluators[name];
        var f = bkEvaluatePluginManager.getVisualParams(name);
        if (e.bgColor !== undefined)
          v.bgColor = e.bgColor;
        else if (f !== undefined && f.bgColor !== undefined)
          v.bgColor = f.bgColor;
        else
          v.bgColor = "";

        if (e.fgColor !== undefined)
          v.fgColor = e.fgColor;
        else if (f !== undefined && f.fgColor !== undefined)
          v.fgColor = f.fgColor;
        else
          v.fgColor = "";

        if (e.borderColor !== undefined)
          v.borderColor = e.borderColor;
        else if (f !== undefined && f.borderColor !== undefined)
          v.borderColor = f.borderColor;
        else
          v.borderColor = "";

        if (e.shortName !== undefined)
          v.shortName = e.shortName;
        else if (f !== undefined && f.shortName !== undefined)
          v.shortName = f.shortName;
        else
          v.shortName = "";

        return v;
      },
      getAllEvaluators: function() {
        return evaluators;
      },
      getLoadingEvaluators: function() {
        return loadingInProgressEvaluators;
      },
      reconnectEvaluators: function() {
        _.each(evaluators, function(ev) {
          if (ev && _.isFunction(ev.reconnect)) {
            ev.reconnect();
          }
        });
      },
      exitAndRemoveAllEvaluators: function() {
        _.each(evaluators, function(ev) {
          if (ev && _.isFunction(ev.exit)) {
            ev.exit();
          }
        });
        evaluators = {};
      }
    };
  });
})();

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
 * Module bk.notebookCellModelManager
 * Notebook Cell Model doesn't own the notebook model.
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebookCellModelManager', []);

  // utilities
  var generateCellMap = function(cells) {
    var decoratedCells = {
      'root': {
        id: 'root',
        raw: null,
        level: 0,
        parent: null,
        children: [],
        allDescendants: []
      }
    };
    if (!cells || cells.length === 0) {
      return decoratedCells;
    }

    cells.forEach(function(cell, index) {
      decoratedCells[cell.id] = {
        id: cell.id,
        raw: cell,
        rawIndex: index,
        level: cell.level > 0 ? cell.level : Number.POSITIVE_INFINITY,
        parent: null,
        children: [],
        allDescendants: []
      };
    });

    var stack = [decoratedCells.root];
    stack.peek = function() {
      return this[this.length - 1];
    };
    _(decoratedCells).each(function(cell) {
      if (cell.id === 'root') {
        return;
      }
      while (stack.peek().level >= cell.level) {
        stack.pop();
      }
      decoratedCells[stack.peek().id].children.push(cell.id);
      decoratedCells[cell.id].parent = stack.peek().id;
      stack.forEach(function(c) {
        decoratedCells[c.id].allDescendants.push(cell.id);
      });
      stack.push(cell);
    });
    return decoratedCells;
  };

  var generateTagMap = function(cellMap) {
    // initialization cells
    var initializationCells = _(cellMap).chain()
        .filter(function(cell) {
          return cell.raw && cell.raw.initialization;
        })
        .map(function(cell) {
          if (cell.raw.type === 'code') {
            return cell;
          } else {
            return _(cell.allDescendants).chain()
                .map(function(childId) {
                  return cellMap[childId];
                })
                .filter(function(c) {
                  return c.raw.type === 'code';
                })
                .value();
          }
        })
        .flatten()
        .uniq()
        .sortBy(function(cell) {
          return cell.rawIndex;
        })
        .map(function(cell) {
          return cell.raw;
        })
        .value();

    // evaluators
    var evaluatorMap = {};
    evaluatorMap.add = function(key, value) {
      if (!this[key]) {
        this[key] = [];
      }
      this[key].push(value);
    };
    _(cellMap).chain()
        .filter(function(cell) {
          return cell.raw && cell.raw.type === 'code';
        })
        .each(function(codeCell) {
          evaluatorMap.add(codeCell.raw.evaluator, codeCell.raw);
        });

    // user tags
    var userTagsMap = {};
    userTagsMap.add = function(key, value) {
      if (!this[key]) {
        this[key] = [];
      }
      this[key].push(value);
    };
    _(cellMap).chain()
    .filter(function(cell) {
      return cell.raw && cell.raw.type === 'code' && cell.raw.tags !== undefined && cell.raw.tags !== '';
    })
    .each(function(codeCell) {
      var re = /\s+/;
      var tags = codeCell.raw.tags.split(re);
      var i;
      for (i = 0; i < tags.length; i++) {
        userTagsMap.add(tags[i], codeCell.raw);
      }
    });

    return {
      initialization: initializationCells,
      evaluator: evaluatorMap,
      usertags: userTagsMap
    };
  };

  var replaceWholeArray = function(oldArray, newArray) {
    var args = _.flatten([0, oldArray.length, newArray]);
    oldArray.splice.apply(oldArray, args);
  };

  module.factory('bkNotebookCellModelManager', function($timeout, $rootScope) {
    var cells = [];
    var cellMap = {};
    var tagMap = {};
    var undoAction = {};
    var undoAction2 = {};
    var redoAction = {};
    var redoAction2 = {};
    var recreateCellMap = function(doNotClearUndoAction) {
      cellMap = generateCellMap(cells);
      tagMap = generateTagMap(cellMap);
      if (!doNotClearUndoAction) {
        undoAction = undefined;
        undoAction2 = undefined;
        redoAction = undefined;
        redoAction2 = undefined;
      }
      // TODO: Optimize this function so it doesn't destroy the page scroll and require
      // this hack below.
      //
      // Most likely because of the nested nature of the cell map and the cells in the
      // DOM that reflect that cell map, when one changes something at the base of the
      // tree (like adding a new section cell
      // [https://github.com/twosigma/beaker-notebook/issues/672]), it not only takes an
      // eternity, but randomly scrolls to ~65% of the document.
      var currentPosition = $(window).scrollTop();
      $timeout(function() {
        $('html, body').scrollTop(currentPosition);
      });
      $rootScope.$broadcast('cellMapRecreated');
    };
    return {
      _getCellMap: function() {
        return cellMap;
      },
      _getTagMap: function() {
        return tagMap;
      },
      reset: function(_cells_) {
        if (_cells_) {
          cells = _cells_;
        }
        this.clipboard = null;
        recreateCellMap();
      },
      getCells: function() {
        return cells;
      },
      getIndex: function(id) {
        return cellMap[id] ? cellMap[id].rawIndex : -1;
      },
      getCellAtIndex: function(index) {
        return cells[index];
      },
      hasCell: function(id) {
        return !!cellMap[id];
      },
      _getDecoratedCell: function(id) {
        if (this.hasCell(id)) {
          return cellMap[id];
        } else {
          throw 'target cell ' + id + ' was not found';
        }
      },
      getCell: function(id) {
        return this._getDecoratedCell(id).raw;
      },
      getCellType: function(id) {
        return this.getCell(id).type;
      },
      getCellLevel: function() {
        return this.getCell(id).level;
      },
      getParent: function(id) {
        var parentId = this._getDecoratedCell(id).parent;
        if (parentId === 'root') {
          return;
        } else {
          return this.getCell(parentId);
        }
      },
      getChildren: function(id) {
        var self = this;
        return this._getDecoratedCell(id).children.map(function(childId) {
          return self.getCell(childId);
        });
      },
      getAllDescendants: function(id) {
        var self = this;
        return this._getDecoratedCell(id).allDescendants.map(function(childId) {
          return self.getCell(childId);
        });
      },
      getAllCodeCells: function(id) {
        if (!id) {
          id = 'root';
        }
        return this.getAllDescendants(id).filter(function(cell) {
          return cell.type === 'code';
        });
      },
      // find the first code cell starting with the startCell and scan
      // using the direction, if the startCell is a code cell, it will be returned.
      findCodeCell: function(startCellId, forward) {
        var cell = this.getCell(startCellId);
        while (cell) {
          if (cell.type === 'code') {
            return cell;
          }
          cell = forward ? this.getNext(cell.id) : this.getPrev(cell.id);
        }
        return null;
      },
      insertBefore: function(id, cell) {
        var index = this.getIndex(id);
        if (index !== -1) {
          cells.splice(index, 0, cell);
        } else {
          throw 'target cell ' + id + ' was not found';
        }
        recreateCellMap();
        $timeout(function() {
          $rootScope.$broadcast('beaker.cell.added', cell);
        });
      },
      insertFirst: function(cell) {
        if (!_.isObject(cell)) {
          throw 'unacceptable';
        }

        cells.splice(0, 0, cell);
        recreateCellMap();
        $timeout(function() {
          $rootScope.$broadcast('beaker.cell.added', cell);
        });
      },
      insertAfter: function(id, cell) {
        if (!_.isObject(cell)) {
          throw 'unacceptable';
        }

        var index = this.getIndex(id);
        if (index !== -1) {
          cells.splice(index + 1, 0, cell);
        } else {
          throw 'target cell ' + id + ' was not found';
        }
        recreateCellMap();
        $timeout(function() {
          $rootScope.$broadcast('beaker.cell.added', cell);
        });
      },
      insertAt: function(index, cell, doNotClearUndoAction) {
        if (_.isArray(cell)) {
          Array.prototype.splice.apply(cells, [index, 0].concat(cell));
        } else if (_.isObject(cell)) {
          cells.splice(index, 0, cell);
        } else {
          throw 'unacceptable';
        }
        recreateCellMap(doNotClearUndoAction);
        $timeout(function() {
          $rootScope.$broadcast('beaker.cell.added', cell);
        });
      },
      isPossibleToMoveUp: function(id) {
        // If the cell isn't first (or nonexistent?)
        return [-1, 0].indexOf(this.getIndex(id)) === -1;
      },
      moveUp: function(id) {
        var index = this.getIndex(id);
        if (index !== -1) {
          if (index === 0) {
            return;
          } else {
            var cell = this.getCell(id);
            cells[index] = this.getCellAtIndex(index - 1);
            cells[index - 1] = cell;
          }
        } else {
          throw 'target cell ' + id + ' was not found';
        }
        recreateCellMap();
      },
      isPossibleToMoveDown: function(id) {
        // If the cell isn't last (or nonexistent?)
        return [-1, (cells.length - 1)].indexOf(this.getIndex(id)) === -1;
      },
      moveDown: function(id) {
        var index = this.getIndex(id);
        if (index !== -1) {
          if (index === cells.length - 1) {
            return;
          } else {
            var cell = this.getCell(id);
            cells[index] = this.getCellAtIndex(index + 1);
            cells[index + 1] = cell;
          }
        } else {
          throw 'target cell ' + id + ' was not found';
        }
        recreateCellMap();
      },
      undoableDelete: function() {
        this.deleteUndo = {
            type: 'single',
            index: this.getIndex(id),
            cell: this.getCell(id)
        };
        this.delete(id);
      },
      delete: function(id, undoable) {
        // delete the cell,
        // note that if this is a section, its descendants are not deleted.
        // to delete a seciton with all its descendants use deleteSection instead.
        var index = this.getIndex(id);
        if (index !== -1) {
          var deleted = cells.splice(index, 1);
          if (undoable) {
            var self = this;
            undoAction = function() {
              self.insertAt(index, deleted, true);
            };
            undoAction2 = undefined;
            redoAction = undefined;
            redoAction2 = function() {
              cells.splice(index, 1);
              recreateCellMap(true);
            };
            recreateCellMap(true);
          } else {
            recreateCellMap();
          }
        }
      },
      deleteSection: function(id, undoable) {
        // delete the section cell as well as all its descendants
        var cell = this.getCell(id);
        if (!cell) {
          throw 'target cell ' + id + ' was not found';
        }
        if (cell.type !== 'section') {
          throw 'target cell ' + id + ' is not a section cell';
        }
        var index = this.getIndex(id);
        var descendants = this.getAllDescendants(id);
        var deleted = cells.splice(index, descendants.length + 1);
        if (undoable) {
          var self = this;
          undoAction = function() {
            self.insertAt(index, deleted, true);
          };
          undoAction2 = undefined;
          redoAction = undefined;
          redoAction2 = function() {
            cells.splice(index, descendants.length + 1);
            recreateCellMap(true);
          };
          recreateCellMap(true);
        } else {
          recreateCellMap();
        }
        return deleted;
      },
      undo: function() {
        if (undoAction) {
          undoAction.apply();
          redoAction = redoAction2;
          redoAction2 = undefined;
          undoAction2 = undoAction;
          undoAction = undefined;
        } else {
          console.log('no undo');
        }
      },
      redo: function() {
        if (redoAction) {
          redoAction.apply();
          redoAction2 = redoAction;
          undoAction = undoAction2;
          undoAction2 = undefined;
          redoAction = undefined;
        } else {
          console.log('no redo');
        }
      },
      deleteAllOutputCells: function() {
        if (cells) {
          _.each(cells, function(cell) {
            if (cell.output) {
              cell.output.result = undefined;
            }
          });
        }
      },
      dumpDisplayStatus: function() {
        if (cells) {
          _.each(cells, function(cell) {
            if (cell.output) {
              cell.output.state = {};
            }
          });
        }
      },
      shiftSegment: function(segBegin, segLength, offset) {
        if (offset === 0) {
          return;
        }
        // this function shifts a continuous sequence of cells
        if (segBegin + offset < 0 || segBegin + segLength - 1 + offset >= cells.length) {
          throw 'Illegal shifting, result would be out of bound';
        }
        var slice1 = cells.slice(0, segBegin);
        var slice2 = cells.slice(segBegin, segBegin + segLength);
        var slice3 = cells.slice(segBegin + segLength);
        var toBeMoved;
        if (offset > 0) {
          // moving from slice 3 to slice 1
          toBeMoved = slice3.splice(0, offset);
          slice1 = slice1.concat(toBeMoved);
        } else {
          // moving from slice 1 to slice 3
          toBeMoved = slice1.splice(slice1.length + offset, -offset);
          slice3 = toBeMoved.concat(slice3);
        }
        replaceWholeArray(cells, _.flatten([slice1, slice2, slice3]));
        recreateCellMap();
      },
      getPrevSection: function(id) {
        var prev = this.getPrev(id);

        while (prev !== null && prev.type !== "section") {
          prev = this.getPrev(prev.id);
        }

        return prev;
      },
      getPrevSibling: function(id) {
        var parentId = this._getDecoratedCell(id).parent;
        if (!parentId) {
          return null;
        }
        var siblingIds = this._getDecoratedCell(parentId).children;
        var myIndexAmongSiblings = siblingIds.indexOf(id);
        if (myIndexAmongSiblings === 0) {
          return null;
        }
        return this.getCell(siblingIds[myIndexAmongSiblings - 1]);
      },
      getNextSibling: function(id) {
        var parentId = this._getDecoratedCell(id).parent;
        if (!parentId) {
          return null;
        }
        var siblingIds = this._getDecoratedCell(parentId).children;
        var myIndexAmongSiblings = siblingIds.indexOf(id);
        if (myIndexAmongSiblings === siblingIds.length - 1) {
          return null;
        }
        return this.getCell(siblingIds[myIndexAmongSiblings + 1]);
      },
      isPossibleToMoveSectionUp: function(id) {
        return !!this.getPrevSibling(id);
      },
      moveSectionUp: function(id) {
        var index = this.getIndex(id);
        var length = this.getSectionLength(id);
        var prevSib = this.getPrevSibling(id);
        if (!prevSib) {
          throw 'Cannot move section up';
        }
        var prevSibId = prevSib.id;
        var offset = -1 * this.getSectionLength(prevSibId);
        this.shiftSegment(index, length, offset);
      },
      isPossibleToMoveSectionDown: function(id) {
        return !!this.getNextSibling(id);
      },
      moveSectionDown: function(id) {
        var nextSib = this.getNextSibling(id);
        if (!nextSib) {
          throw 'Cannot move section down';
        }
        this.moveSectionUp(nextSib.id);
      },
      getSectionLength: function(id) {
        // the cell itself plus all descendants
        return 1 + this._getDecoratedCell(id).allDescendants.length;
      },

      // The following has not been unit tested
      getNext: function(id) {
        var index = this.getIndex(id);
        if (index === cells.length - 1) {
          return null;
        }
        return this.getCellAtIndex(index + 1);
      },
      getPrev: function(id) {
        var index = this.getIndex(id);
        if (index === 0) {
          return null;
        }
        return this.getCellAtIndex(index - 1);
      },
      isContainer: function(id) {
        return id === 'root' || !!this.getCell(id).level;
      },
      isEmpty: function(id) {
        return this._getDecoratedCell(id).allDescendants.length === 0;
      },
      isLast: function(id) {
        if (_.isEmpty(cells)) {
          return false;
        }
        return _.last(cells).id === id;
      },
      appendAfter: function(id, cell) {
        if (this.isContainer(id) && !this.isEmpty(id)) {
          // add to tail
          var descendants = this.getAllDescendants(id);
          this.insertAfter(descendants[descendants.length - 1].id, this.clipboard);
        } else {
          // append after
          this.insertAfter(id, cell);
        }
      },
      getInitializationCells: function() {
        return tagMap.initialization;
      },
      getCellsWithEvaluator: function(evaluator) {
        return tagMap.evaluator[evaluator];
      },
      hasUserTag: function(t) {
        return tagMap.usertags[t] !== undefined;
      },
      getCellsWithUserTag: function(t) {
        return tagMap.usertags[t];
      },
      clipboard: null,
      cut: function(id) {
        if (this.clipboard) {
          this.delete(this.clipboard);
        }
        this.clipboard = this.getCell(id);
        this.delete(id);
      },
      paste: function(destinationId) {
        if (this.clipboard) {
          this.appendAfter(destinationId, this.clipboard);
          this.clipboard = null;
        }
      },
      canSetUserTags: function(tags) {
        var re = /\s+/;
        if (tags !== undefined) {
          var tgs = tags.split(re);
          var i;
          for (i = 0; i < tgs.length; i++) {
            if (cellMap[tgs[i]] !== undefined) {
              return 'ERROR: The name "' + tgs[i] + '" is already used as a cell name.';
            }
          }
        }
        return '';
      },
      canRenameCell: function(newid) {
        if (cellMap[newid] !== undefined) {
          return 'ERROR: Cell "' + newid + '" already exists.';
        }
        if (tagMap.usertags[newid] !== undefined) {
          return 'ERROR: The name "' + newid + '" is already used as a tag.';
        }
        return '';
      },
      renameCell: function(oldid, newid) {
        if (this.canRenameCell(newid) !== '') {
          return;
        }
        var idx = this.getIndex(oldid);
        if (idx >= 0) {
          cells[idx].id = newid;
          recreateCellMap();
        }
      },
      rebuildMaps: function() {
        recreateCellMap(true);
      }
    };
  });
})();

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
 * Module bk.notebookNamespaceModelManager
 */
(function() {
  'use strict';
  var module = angular.module("bk.notebookNamespaceModelManager", []);

  module.factory("bkNotebookNamespaceModelManager", function() {
    var _subscriptions = {};
    return {
      init: function(sessionId, notebookModel, generateSaveData) {
        _subscriptions[sessionId] = $.cometd.subscribe("/namespace/" + sessionId, function(reply) {
            var name = reply.data.name;
            var value = reply.data.value;
            var sync = reply.data.sync;
            var namespace = notebookModel.namespace;
            if (undefined === sync) {
              var reply2 = {name: name, defined: false, session: sessionId};
              if (undefined !== namespace) {
                var readValue = namespace[name];
                if (undefined !== readValue) {
                  reply2.value = readValue;
                  reply2.defined = true;
                }
              }
              $.cometd.publish("/service/namespace/receive", JSON.stringify(reply2));
            } else {
              if (undefined === namespace) {
                notebookModel.namespace = {};
                namespace = notebookModel.namespace;
              }
              if (undefined === value) {
                delete namespace[name];
              } else {
                namespace[name] = value;
              }
              if (sync) {
                var reply2 = {name: name, session: sessionId};
                $.cometd.publish("/service/namespace/receive", JSON.stringify(reply2));
              }
            }
          });
      },
      clear: function(sessionId) {
        if (sessionId) {
          $.cometd.unsubscribe(_subscriptions[sessionId]);
          delete _subscriptions[sessionId];
        }
      }
    };
  });
})();

/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
 * Module bk.notebookNamespaceModelManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebookManager', []);

  module.factory('bkNotebookManager', function() {
    var registrations = [];

    return {
      init: function(notebookModel) {
        registrations.push(
          $.cometd.subscribe('/request-latest-notebook-model', function(resp) {
            if (resp.data.sessionId !== notebookModel.getSessionId()) { return; }

            $.cometd.publish('/latest-notebook-model', {
              notebookJson: notebookModel.getSaveData().notebookModelAsString
            });
          })
        );
      },
      reset: function() {
        _.each(registrations, function(v) {
          $.cometd.unsubscribe(v);
        });
      }
    };
  });
})();

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
 * Module bk.sessionManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.sessionManager',[
    'bk.utils',
    'bk.session',
    'bk.notebookManager',
    'bk.notebookCellModelManager',
    'bk.notebookNamespaceModelManager',
    'bk.recentMenu',
    'bk.evaluatorManager',
    'bk.electron'
  ]);

  module.factory('bkSessionManager', function(
      bkUtils,
      bkSession,
      bkNotebookManager,
      bkNotebookCellModelManager,
      bkNotebookNamespaceModelManager,
      bkEvaluatorManager,
      bkRecentMenu,
      bkElectron) {

    var ImageIcon = function(data) {
      if (data === undefined || data.type !== "ImageIcon") {
        this.imageData = [];
        this.width = 0;
        this.height = 0;
      } else {
        this.imageData = data.imageData;
        this.width = data.width;
        this.height = data.height;
      }
    };

    var DataFrame = function(data) {
      if (data === undefined || data.type !== "TableDisplay" || data.subtype !== "TableDisplay") {
        this.columnNames = [];
        this.types = [];
        this.values = [];
      } else {
        this.columnNames = data.columnNames.slice(0);
        this.types = data.types.slice(0);
        this.values = [];
        for (var j in data.values) {
          var vals = [];
          for (var i in data.values[j]) {
            vals.push( transformBack(data.values[j][i]));
          }
          this.values.push(vals);
        }
      }
    };

    DataFrame.prototype.toString = function() {
      var s = '';
      s = 'DataFrame:'+
        '  Rows: '+this.values.length+'\n' +
        '  Data columns (total '+this.columnNames.length+' columns):\n';
      for (var i in this.columnNames) {
        s = s + '    '+this.columnNames[i]+'   '+this.types[i]+'\n';
      }
      ;
      return s;
    };

    DataFrame.prototype.columns = function() {
      return this.columnNames;
    };

    DataFrame.prototype.dtypes = function() {
      return this.types;
    };

    DataFrame.prototype.getColumn = function(name) {
      var i = this.columnNames.indexOf(name);
      if (i < 0)
          return null;
      var o = [];
      for (var j in this.values) {
        o.push(this.values[j][i]);
      }
      return o;
    };

    DataFrame.prototype.getRow = function(i) {
      if (i < 0 || i > this.values.length)
        return null;
      var o = {};
      for (var j in this.columnNames) {
        o[this.columnNames[j]] = this.values[i][j];
      }
      return o;
    };

    DataFrame.prototype.length = function() {
      return this.values.length;
    };

    DataFrame.prototype.removeColumn = function(name) {
      var i = this.columnNames.indexOf(name);
      if (i < 0)
          return false;
      for (var j in this.values) {
        this.values[j].splice(i,1);
      }
      this.columnNames.splice(i,1);
      this.types.splice(i,1);
      return true;
    };

    DataFrame.prototype.addColumn = function(name, data, type) {
      var i = this.columnNames.indexOf(name);
      if (i >= 0 || data === undefined || data.length === 0)
          return false;

      this.columnNames.push(name);
      this.types.push((type === undefined) ? getDataType(data[0]) : type);
      var min = (data.length > this.values.length) ? this.values.length : data.length;
      var j;
      for (j = 0; j < min; j++) {
        this.values[j].push(data[j]);
      }
      if (this.values.length > data.length) {
        for (; j < this.values.length; j++) {
          this.values[j].push(null);
        }
      } else {
        for (; j < data.length; j++) {
          this.values.push([]);
          for (var k = 0; k < this.columnNames.length - 1; k++) {
            this.values[j].push(null);
          }
          this.values[j].push(data[j]);
        }
      }
      return true;
    };

    DataFrame.prototype.addRow = function(row) {
      var r = [];
      for(var c in this.columnNames) {
        if (row[this.columnNames[c]] !== undefined)
          r.push(row[this.columnNames[c]]);
        else
          r.push(null);
      }
      this.values.push(r);
    };

    function isPrimitiveType(v) {
      if (_.isDate(v) || _.isString(v) || _.isNumber(v) || _.isBoolean(v) || _.isNaN(v) || _.isNull(v) || _.isUndefined(v))
        return true;
      return false;
    };

    function getDataType(v) {
      if (_.isDate(v))
        return "time";
      if(_.isNumber(v)) // can we do a better job here?
        return "double";
      if(_.isBoolean(v))
        return "boolean";
      return "string";
    };

    function isDictionary(v) {
      if (!_.isObject(v))
        return false;
      for(var i in v) {
        if (!isPrimitiveType(v[i]))
          return false;
      }
      return true;
    };

    function transform(v, norecurse) {
      if (_.isFunction(v) || _.isUndefined(v))
        return null;

      if (_.isDate(v)) {
        var o = {}
        o.type = "Date";
        o.timestamp = v.valueOf();
        return o
      }

      if (isPrimitiveType(v))
        return v;

      if (v instanceof ImageIcon && norecurse === undefined) {
        var o = {}
        o.type = "ImageIcon";
        o.imageData = v.imageData;
        o.width = v.width;
        o.height = v.height;
        return o
      }

      if (v instanceof DataFrame && norecurse === undefined) {
        var o = {}
        o.type = "TableDisplay";
        o.subtype = "TableDisplay";
        o.values = [];
        for (var i in v.values) {
          var row = [];
          for (var j in v.values[i]) {
            row.push(transform(v.values[i][j], true));
          }
          o.values.push(row);
        }
        o.types = _.isArray(v.types) ? v.types.slice(0) : undefined;
        o.columnNames = _.isArray(v.columnNames) ? v.columnNames.slice(0) : undefined;
        return o
      }

      if (_.isArray(v) && v.length>0) {
        var doit = true;
        for(var r in v) {
          if (!_.isArray(v[r])) {
            doit = false;
            break;
          }
          for (var c in (v[r])) {
            if (!isPrimitiveType(v[r][c])) {
              doit = false;
              break;
            }
          }
        }
        if (doit && norecurse === undefined) {
          var o = {}
          o.type = "TableDisplay";
          o.values = [];
          for (var i in v) {
            var row = [];
            for (var item in v[i])
              row.push(transform(v[i][item], true));
            o.values.push(row);
          }
          o.subtype = "Matrix";
          o.columnNames = [];
          o.types = [];
          for(var i in v[0]) {
            o.columnNames.push('c'+i);
            o.types.push(getDataType(v[0][i]));
          }
          return o;
        } else {
          doit = true;
          for(var r in v) {
            if (!isDictionary(v[r])) {
              doit = false;
              break;
            }
          }
          if (doit && norecurse === undefined) {
            var o = {};
            o.type = "TableDisplay";
            o.subtype = "ListOfMaps";
            o.columnNames = [];
            for (var i in v) {
              for (var j in v[i]) {
                if (o.columnNames.indexOf(j)<0)
                  o.columnNames.push(j);
              }
            }
            o.values = [];
            for (var i in v) {
              var o2 = [];
              for (var j in o.columnNames) {
                var n = o.columnNames[j];
                if (v[i][n] !== undefined)
                  o2.push(transform(v[i][n], true));
                else
                  o2.push(null);
              }
              o.values.push(o2);
            }
            o.types = [];
            for (var j in o.columnNames) {
              var n = o.columnNames[j];
              for (var i in v) {
                if (v[i][n] !== undefined) {
                  o.types.push(getDataType(v[i][n]));
                  break;
                }
              }
            }
            return o;
          }
        }
      }

      if (_.isArray(v)) {
        var o = [];
        for(var p in v) {
          o.push(transform(v[p], true));
        }
        return o;
      }

      if (_.isObject(v) && isDictionary(v) && norecurse === undefined) {
        var o = {}
        o.type = "TableDisplay";
        o.values = [];
        o.subtype = "Dictionary";
        o.columnNames= ['Key','Value'];
        for (var i in v) {
          var r = [];
          r.push(i);
          r.push(transform(v[i],true));
          o.values.push(r);
        }
        return o;
      }
      var o = {};
      for(var p in v) {
        o[p] = transform(v[p], true);
      }
      return o;
    };

    function transformBack(v) {
      if(v === undefined || (!_.isObject(v) && !_.isArray(v)))
        return v;

      if (v.type !== undefined) {
        if (v.type === "Date") {
          return new Date(v.timestamp);
        }
        if (v.type === "TableDisplay") {
          if (v.subtype === "Dictionary") {
            var o = {}
            for (var r in v.values) {
              o[v.values[r][0]] = transformBack(v.values[r][1]);
            }
            return o;
          }
          if (v.subtype === "Matrix") {
            var o = [];
            for (var i in v.values) {
              o.push(v.values[i].slice(0));
            }
            return o;
          }
          if (v.subtype === "ListOfMaps") {
            var out2 = [];
            for (var r in v.values) {
              var out3 = { };
              for (var i=0; i<v.values[r].length; i++) {
                if (v.values[r][i] !== null)
                  out3[ v.columnNames[i] ] = transformBack(v.values[r][i]);
              }
              out2.push(out3);
            }
            return out2;
          }
          var out = new DataFrame(v);
          return out;
        }
        if (v.type === "ImageIcon")
          return new ImageIcon(v);
      }
      if (!_.isArray(v)) {
        var o = {};
        for(var p in v) {
          o[p] = transformBack(v[p]);
        }
        return o;
      }
      var o = [];
      for(var p in v) {
        o.push(transformBack(v[p]));
      }
      return o;
    };


    var _notebookUri = (function() {
      var DEFAULT_VALUE = null;
      var _v = DEFAULT_VALUE;
      return {
        reset: function() {
          this.set(DEFAULT_VALUE);
        },
        get: function() {
          return _v;
        },
        set: function(v) {
          _v = v;
          if (!_.isEmpty(_v)) {
            bkRecentMenu.recordRecentDocument(generateRecentDocumentItem());
          }
        }
      };
    })();

    var _uriType = null;
    var _readOnly = null;
    var _format = null;
    var _sessionId = null;
    var _edited = false;
    var _needsBackup = false;
    var _saveDir = bkUtils.getHomeDirectory();

    var BeakerObject = function(nbmodel) {
      this.knownBeakerVars = { };
      this.getCache = { };
      this.setCache = { };
      this.beakerObj = { }
      this.nbmodel = nbmodel;
    };

    BeakerObject.prototype.setupBeakerObject = function(modelOutput) {
      var self = this;

      if (this.beakerObj.showProgressUpdate === undefined) {
        Object.defineProperty(this.beakerObj, 'showProgressUpdate', { value: function (a,b,c) {
          if ( a === undefined || self._beaker_model_output_result === undefined ||
              self._beaker_model_output_result.object === undefined)
            return;
          if ( typeof a === 'string' )
            self._beaker_model_output_result.object.message = a;
          else if ( typeof a === 'number' )
            self._beaker_model_output_result.object.progressBar = a;
          else if ( a !== null )
            self._beaker_model_output_result.object.payload = a;

          if ( typeof b === 'string' )
            self._beaker_model_output_result.object.message = b;
          else if ( typeof b === 'number' )
            self._beaker_model_output_result.object.progressBar = b;
          else if ( b !== null )
            self._beaker_model_output_result.object.payload = b;

          if ( typeof c === 'string' )
            self._beaker_model_output_result.object.message = c;
          else if ( typeof c === 'number' )
            self._beaker_model_output_result.object.progressBar = c;
          else if ( c !== null )
            self._beaker_model_output_result.object.payload = c;
        }, writeable: false, enumerable: true });

        Object.defineProperty(this.beakerObj, 'showStatus', { value: bkHelper.showStatus, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'clearStatus', { value: bkHelper.clearStatus, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'showTransientStatus', { value: bkHelper.showTransientStatus, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'getEvaluators', { value: bkHelper.getEvaluators, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'getCodeCells', { value: bkHelper.getCodeCells, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'setCodeCellBody', { value: bkHelper.setCodeCellBody, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'setCodeCellEvaluator', { value: bkHelper.setCodeCellEvaluator, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'setCodeCellTags', { value: bkHelper.setCodeCellTags, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'evaluate', { value: function(a) {
            var d = bkHelper.newDeferred();
            self.beakerObjectToNotebook();
            bkHelper.evaluate(a).then(function (r) { self.notebookToBeakerObject(); d.resolve(transformBack(r)); }, function (r) { self.notebookToBeakerObject(); d.reject(r); });
            return d.promise;
          }, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'evaluateCode', { value: function(a,b) {
          var d = bkHelper.newDeferred();
            self.beakerObjectToNotebook();
            bkHelper.evaluateCode(a,b).then(function (r) { self.notebookToBeakerObject(); d.resolve(transformBack(r)); }, function (r) { self.notebookToBeakerObject(); d.reject(r); });
            return d.promise;
          }, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'print', {value: function(input) {
          bkHelper.receiveEvaluationUpdate(self._beaker_model_output,
                                           {outputdata:[{type:'out', value: input+"\n"}]}, "JavaScript");
          // XXX should not be needed but when progress meter is shown at same time
          // display is broken without this, you get "OUTPUT" instead of any lines of text.
          bkHelper.refreshRootScope();
        }, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'printError', {value: function(input) {
          bkHelper.receiveEvaluationUpdate(self._beaker_model_output,
                                           {outputdata:[{type:'err', value: input+"\n"}]}, "JavaScript");
          // XXX should not be needed but when progress meter is shown at same time
          // display is broken without this, you get "OUTPUT" instead of any lines of text.
          bkHelper.refreshRootScope();
        }, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'loadJS', { value: bkHelper.loadJS, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'loadCSS', { value: bkHelper.loadCSS, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'loadList', { value: bkHelper.loadList, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'httpGet', { value: bkHelper.httpGet, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'httpPost', { value: bkHelper.httpPost, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'newDeferred', { value: bkHelper.newDeferred, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'newPromise', { value: bkHelper.newPromise, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'all', { value: bkHelper.all, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'timeout', { value: bkHelper.timeout, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'DataFrame', { value: DataFrame, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'ImageIcon', { value: ImageIcon, writeable: false, enumerable: true });
        this.predefined = Object.keys(this.beakerObj);
      }
      this._beaker_model_output_result = modelOutput.result; // XXX obviated by next line
      this._beaker_model_output = modelOutput;
    };

    BeakerObject.prototype.clearOutput = function() {
      this._beaker_model_output_result.object = undefined;
    };

    BeakerObject.prototype.beakerGetter = function(name) {
      if (this.setCache[name] !== undefined) {
        return this.setCache[name];
      }
      if (this.getCache[name] === undefined && this.nbmodel.namespace !== undefined)
        this.getCache[name] = transformBack(this.nbmodel.namespace[name]);
      // this is required to support subobject modification
      this.setCache[name] = this.getCache[name];
      return this.getCache[name];
    };

    BeakerObject.prototype.beakerSetter = function(name, v) {
      this.setCache[name] = v;
      if (this.beakerSetterTimeout !== undefined)
        bkHelper.cancelTimeout(this.beakerSetterTimeout);
      var makeTimeout = function(self) {
        return function() {
          self.beakerSetterTimeout = undefined;
          self.beakerObjectToNotebook();
        };
      };
      this.beakerSetterTimeout = bkHelper.timeout(makeTimeout(this),500);
    };

    BeakerObject.prototype.notebookToBeakerObject = function() {
      // clear getcache
      this.getCache = { };

      // check if some other language removed a binding
      for (var p in this.knownBeakerVars) {
        if (this.nbmodel.namespace !== undefined && this.nbmodel.namespace[p] === undefined) {
          delete this.knownBeakerVars[p];
          delete this.beakerObj[p];
          delete this.setCache[p];
        }
      }

      // check if some other language added a binding
      if (this.nbmodel.namespace !== undefined) {
        for (var p in this.nbmodel.namespace) {
          var t = this.nbmodel.namespace[p];
          if (this.predefined.indexOf(p)>=0) {
            delete this.nbmodel.namespace[p];
          } else if (this.knownBeakerVars[p] === undefined) {
            delete this.beakerObj[p];
            this.knownBeakerVars[p] = true;
            var makeGetter = function(self, name) {
              return function() { return self.beakerGetter(name); }
            }
            var makeSetter = function(self, name) {
              return function(v) { self.beakerSetter(name,v); }
            }
            Object.defineProperty(this.beakerObj, p,
                { writeable: true,
                  get: makeGetter(this, p),
                  set: makeSetter(this, p),
                  enumerable: true,
                  configurable: true
                });
          }
        }
      }
    };

    BeakerObject.prototype.beakerObjectToNotebook = function() {
      var keys = Object.keys(this.beakerObj);
      var stuff = Object.keys(this.knownBeakerVars);
      var diff = $(keys).not(stuff).get();
      diff = $(diff).not(this.predefined).get();

      // check if javascript removed a binding
      if ( this.nbmodel.namespace !== undefined ) {
        for (var p in this.nbmodel.namespace) {
          if (this.knownBeakerVars[p] !== undefined && keys.indexOf(p) <0) {
            delete this.nbmodel.namespace[p];
            delete this.knownBeakerVars[p];
          }
        }
      }

      // check if javascript set any NEW variable
      for (var i in diff) {
        var p = diff[i];
        if (this.knownBeakerVars[p] === undefined) {
          if (this.nbmodel.namespace === undefined)
            this.nbmodel.namespace = { };
          var t = this.beakerObj[p];
          if ((this.predefined.indexOf(p)>=0 || _.isFunction(t))) {
            // we do NOT put functions in the namespace
            delete this.nbmodel.namespace[p];
            delete this.knownBeakerVars[p];
          } else {
            this.setCache[p] = t;
            this.knownBeakerVars[p] = true;
            var makeGetter = function(self, name) {
              return function() { return self.beakerGetter(name); }
            }
            var makeSetter = function(self, name) {
              return function(v) { self.beakerSetter(name,v); }
            }
            Object.defineProperty(this.beakerObj, p,
                { writeable: true,
                  get: makeGetter(this,p),
                  set: makeSetter(this,p),
                  enumerable: true,
                  configurable: true
                });
          }
        }
      }

      // check if javascript set any new variable
      for (var p in this.setCache) {
        if (this.nbmodel.namespace === undefined)
          this.nbmodel.namespace = { };
        if (this.isCircularObject(this.setCache[p]))
          this.nbmodel.namespace[p] = "ERROR: circular objects are not supported";
        else
          this.nbmodel.namespace[p] = transform(this.setCache[p]);
        if (this.knownBeakerVars[p] === undefined && this.beakerObj[p] === undefined) {
            this.knownBeakerVars[p] = true;
            var makeGetter = function(self, name) {
              return function() { return self.beakerGetter(name); }
            }
            var makeSetter = function(self, name) {
              return function(v) { self.beakerSetter(name,v); }
            }
            Object.defineProperty(this.beakerObj, p,
                { writeable: true,
                  get: makeGetter(this,p),
                  set: makeSetter(this,p),
                  enumerable: true,
                  configurable: true
                });
        }
      }
      // clear setcache and getcache
      this.setCache = { };
      this.getCache = { };
    };

    BeakerObject.prototype.transform = transform;

    BeakerObject.prototype.isCircularObject = function(node, parents) {
      parents = parents || [];
      if (!node || typeof node != "object"){
        return false;
      }
      parents.push(node);
      for (var key in node) {
        var value = node[key];
        if (value && typeof value == "object") {
          if (parents.indexOf(value)>=0) {
            return true;
          }
          if (this.isCircularObject(value, parents)) {
            return true;
          }
        }
      }
      parents.pop(node);
      return false;
  }

    var _bo = {};

    var _notebookModel = (function() {
      var _v = {};
      return {
        reset: function() {
          this.set({});
        },
        get: function() {
          return _v;
        },
        getBeakerObject: function() {
          return _bo;
        },
        set: function(v) {
          _v = v;
          // this removes legacy data previously saved
          if (_v._beaker_model_output_result !== undefined) {
            delete _v._beaker_model_output_result;
          }
          //if (_v.namespace === undefined)
          //  _v.namespace = { };
          _bo = new BeakerObject(_v);
          if (this.isEmpty()) {
            bkNotebookCellModelManager.reset([]);
          } else {
            bkNotebookCellModelManager.reset(_v.cells);
          }
        },
        isEmpty: function() {
          return _.isEmpty(_v);
        },
        isLocked: function() {
          return !this.isEmpty() && !!_v.locked;
        },
        toJson: function() {
          return angular.toJson(_v);
        },
        toCleanPrettyJson: function() {
          //strip out the shell IDs
          var shellIds = _(_v.evaluators).map(function(evaluator) {
            var shellId = evaluator.shellID;
            delete evaluator.shellID;
            return shellId;
          });
          // generate pretty JSON
          var prettyJson = bkUtils.toPrettyJson(_v);
          // put the shell IDs back
          _(_v.evaluators).each(function(evaluator, index) {
            evaluator.shellID = shellIds[index];
          });
          return prettyJson;
        }
      };
    })();

    var generateBackupData = function() {
      return {
        notebookUri: _notebookUri.get(),
        uriType: _uriType,
        readOnly: _readOnly,
        format: _format,
        notebookModelJson: _notebookModel.toJson(),
        edited: _edited
      };
    };
    var generateRecentDocumentItem = function () {
      var data = {
        uri: _notebookUri.get(),
        type: _.isEmpty(_uriType) ? "" : _uriType,
        readOnly: !!_readOnly ? true : false,
        format: _.isEmpty(_format) ? "" : _format
      };
      return angular.toJson(data);
    };

    var generateSaveData = function() {
      return {
        uriType: _uriType,
        notebookUri: _notebookUri.get(),
        notebookModelAsString: _notebookModel.toCleanPrettyJson()
      };
    };

    var _subscriptions = {};
    var connectcontrol = function(sessionId) {
      _subscriptions[sessionId] =
          $.cometd.subscribe("/notebookctrl/" + sessionId, function(req) {
            try {
              var name = "bkHelper."+req.data.method;
              var numargs = req.data.numargs;
              var args = [];
              var i;
              for ( i = 0; i < numargs; i++ ) {
                args.push( req.data["arg"+i] );
              }
              var publish = true;
              var reply2 = { session: sessionId };
              reply2.value = eval(name).apply(this, args);
              if(typeof reply2.value === 'object') {
                if(typeof reply2.value.promise === 'object' && typeof reply2.value.promise.then === 'function') {
                  reply2.value = reply2.value.promise;
                }
                if(typeof reply2.value.then === 'function') {
                  // must wait for result to be ready
                  publish = false;
                  reply2.value.then(function(res) {
                    reply2.value=res;
                    $.cometd.publish("/service/notebookctrl/receive", JSON.stringify(reply2));
                  }, function(err) {
                    reply2.value=err;
                    $.cometd.publish("/service/notebookctrl/receive", JSON.stringify(reply2));
                  });
                }
              }
              else if (reply2.value === undefined)
                reply2.value = true;
              if (publish) {
                $.cometd.publish("/service/notebookctrl/receive", JSON.stringify(reply2));
              }
            } catch (err) {
              console.log("CATCH "+err);
              $.cometd.publish("/service/notebookctrl/receive", JSON.stringify( { session: sessionId, value: false } ));
            }
          });
      };

      var disconnectcontrol = function(sessionId) {
        if (sessionId) {
          $.cometd.unsubscribe(_subscriptions[sessionId]);
          delete _subscriptions[sessionId];
        }
      };

    return {
      reset: function(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId) {

        // backup existing session if it's not empty.
        if (_sessionId && !_notebookModel.isEmpty()) {
          bkSession.backup(_sessionId, generateBackupData());
        }

        if (_sessionId)
          disconnectcontrol(_sessionId);
        bkNotebookManager.reset();
        bkEvaluatorManager.reset();

        // check inputs
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }

        // reset
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
        _notebookModel.set(notebookModel);
        this.setNotebookModelEdited(!!edited);
        _sessionId = sessionId;
        bkNotebookNamespaceModelManager.init(sessionId, notebookModel, generateSaveData);
        connectcontrol(sessionId);
        bkSession.backup(_sessionId, generateBackupData());
        bkNotebookManager.init(this);
      },
      setSessionId: function(sessionId) {
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }
        _sessionId = sessionId;
        return _sessionId;
      },
      setup: function(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId) {

        // check inputs
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }

        // tell main thread that session lives in this window
        if (bkUtils.isElectron) {
          bkElectron.IPC.send('window-session', {
            windowId: bkElectron.remote.getCurrentWindow().id,
            sessionId: sessionId
          });
        }

        // reset
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
        _notebookModel.set(notebookModel);
        _sessionId = sessionId;

        _needsBackup = _edited;
        bkNotebookNamespaceModelManager.init(sessionId, notebookModel);
        bkNotebookManager.init(this);
        connectcontrol(sessionId);
        bkSession.backup(_sessionId, generateBackupData());
      },
      clear: function() {
        disconnectcontrol(_sessionId);
        bkEvaluatorManager.reset();
        bkNotebookNamespaceModelManager.clear(_sessionId);
        bkNotebookManager.reset();
        _notebookUri.reset();
        _uriType = null;
        _readOnly = null;
        _format = null;
        _notebookModel.reset();
        _sessionId = null;
        _edited = false;
        _needsBackup = false;
      },
      close: function() {
        var self = this;
        var close = function() {
          bkEvaluatorManager.exitAndRemoveAllEvaluators();
          self.clear();
        };
        if (_sessionId) {
          return bkSession.close(_sessionId).then(close);
        } else{
          close();
          return bkUtils.newPromise();
        }
      },
      backup: function() {
        if (_sessionId && !_notebookModel.isEmpty() && _needsBackup) {
          _needsBackup = false;
          return bkSession.backup(_sessionId, generateBackupData())
          .catch(function(err) {
            _needsBackup = true;
            throw err;
          });
        } else {
          return bkUtils.newPromise();
        }
      },
      updateNotebookUri: function(notebookUri, uriType, readOnly, format) {
        // to be used by save-as
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
      },
      getNotebookPath: function() {
        if (_notebookUri.get()) {
          return _notebookUri.get();
        } else {
          return "New Notebook";
        }
      },
      getNotebookTitle: function() {
        if (_notebookUri.get()) {
          return _notebookUri.get().replace(/^.*[\\\/]/, '');
        } else {
          return "New Notebook";
        }
      },
      isSavable: function() {
        return _notebookUri && !_readOnly;
      },
      /*
       * This function triggers all display implementations to save the current output status.
       * This save is asynchronous and happens in the current digest loop.
       * Users must schedule a timeout to execute code that requires the dumped state.
       */
      dumpDisplayStatus: function() {
        this.getNotebookCellOp().dumpDisplayStatus();
        return true;
      },
      getSaveData: function() {
        return generateSaveData();
      },
      getNotebookModelAsString: function() {
        return _notebookModel.toJson();
      },
      getRawNotebookModel: function() {
        return _notebookModel.get();
      },
      getBeakerObject: function() {
        return _notebookModel.getBeakerObject();
      },
      getSessionId: function() {
        return _sessionId;
      },
      isSessionValid: function() {
        if (!_sessionId) {
          return bkUtils.newPromise("false");
        } else {
          return bkSession.getSessions().then(function(sessions) {
            return _(sessions).chain().keys().contains(_sessionId).value();
          });
        }
      },
      // TODO, move the following impl to a dedicated notebook model manager
      // but still expose it here
      setNotebookModelEdited: function(edited) {
        _needsBackup = edited;
        _edited = edited;
        bkUtils.httpPost(bkUtils.serverUrl('beaker/rest/session-backup/setEdited'), {
          sessionid: _sessionId,
          edited: edited
        });
      },
      isNotebookModelEdited: function() {
        return _edited;
      },
      isNotebookLocked: function() {
        return _notebookModel.isLocked();
      },
      toggleNotebookLocked: function() {
        if (!_notebookModel.isEmpty()) {
          if (!_notebookModel.isLocked()) {
            _notebookModel.get().locked = true;
          } else {
            _notebookModel.get().locked = undefined;
          }
          this.setNotebookModelEdited(true);
        }
      },
      evaluatorUnused: function(plugin) {
        var n = _.find(_notebookModel.get().cells, function (c) {
          return c.type == "code" && c.evaluator == plugin;
        });
        return !n;
      },
      addEvaluator: function(evaluator) {
        _notebookModel.get().evaluators.push(evaluator);
        this.setNotebookModelEdited(true);
      },
      removeEvaluator: function(plugin) {
        var model = _notebookModel.get();
        model.evaluators = _.reject(model.evaluators, function(e) {
          return e.plugin == plugin;
        });
        this.setNotebookModelEdited(true);
      },
      reconnectEvaluators: function() {
        return bkEvaluatorManager.reconnectEvaluators();
      },
      getNotebookCellOp: function() {
        return bkNotebookCellModelManager;
      },
      getNotebookNewCellFactory: function() {
        return {
          newCodeCell: function(evaluator, id) {
            if (!evaluator) {
              evaluator = _notebookModel.get().evaluators[0].name;
            }
            if (!id) {
              id = "code" + bkUtils.generateId(6);
            }
            return {
              "id": id,
              "type": "code",
              "evaluator": evaluator,
              "input": {
                "body": ""
              },
              "output": {}
            };
          },
          newSectionCell: function(level, title, id) {
            if (!level && level !== 0) {
              level = 1;
            }
            if (level <= 0) {
              throw "creating section cell with level " + level + " is not allowed";
            }
            if (!title) {
              title = "New Section H" + level;
            }

            if (!id) {
              id = "section" + bkUtils.generateId(6);
            }
            return {
              "id": id,
              "type": "section",
              "title": title,
              "level": level
            };
          },
          newMarkdownCell: function(id) {
            var tail = _notebookModel.get().cells.length - 1;
            if (!id) {
              id = "markdown" + bkUtils.generateId(6);
            }
            return {
              "id": id,
              "type": "markdown",
              "body": ""
            };
          }
        };
      },
      isRootCellInitialization: function() {
        return _notebookModel.get().initializeAll;
      },
      setRootCellInitialization: function(initialization) {
        if (initialization === true) {
          _notebookModel.get().initializeAll = true;
        } else {
          _notebookModel.get().initializeAll = undefined;
        }
      },
      notebookModelAddEvaluator: function(newEvaluator) {
        _notebookModel.get().evaluators.push(newEvaluator);
      },
      notebookModelGetInitializationCells: function() {
        if (_notebookModel.get().initializeAll) {
          return this.getNotebookCellOp().getAllCodeCells("root");
        } else {
          return this.getNotebookCellOp().getInitializationCells();
        }
      },
      undo: function() {
        bkNotebookCellModelManager.undo();
      },
      redo: function() {
        bkNotebookCellModelManager.redo();
      }
    };
  });
})();

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
 * Module bk.notebook
 * This is the 'notebook view' part of {@link bkApp}. What is the root cell holding the nested
 * {@link bkCell}s.
 */

(function() {
  'use strict';
  var module = angular.module('bk.notebook', [
    'bk.commonUi',
    'bk.utils',
    'bk.outputLog',
    'bk.core',
    'bk.sessionManager',
    'bk.evaluatorManager',
    'bk.cellMenuPluginManager',
    'bk.outputDisplay'
  ]);
})();

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
 * bkCell
 * - the controller that responsible for directly changing the view
 * - the container for specific typed cell
 * - the directive is designed to be capable of used in a nested way
 * - conceptually, a cell is 'cell model' + 'view model'(an example of what goes in to the view
 * model is code cell bg color)
 * - A bkCell is generically corresponds to a portion of the notebook model (currently, it is
 * always a branch in the hierarchy)
 * - When exporting (a.k.a. sharing), we will need both the cell model and the view model
 */

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkCell', function(bkUtils, bkSessionManager, bkCoreManager, bkEvaluatorManager) {
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/cell'](),
      scope: {
        cellmodel: '=',
        index: '='
      },
      controller: function($scope, $element) {
        $scope.cellmodel.evaluatorReader = false;

        var getBkBaseViewModel = function() {
          return bkCoreManager.getBkApp().getBkNotebookWidget().getViewModel();
        };
        var notebookCellOp = bkSessionManager.getNotebookCellOp();

        $scope.$watch(function() {
          return notebookCellOp.isLast($scope.cellmodel.id);
        }, function(newVal, oldVal) {
          $scope.isLarge = newVal;
        });

        $scope.cellview = {
          showDebugInfo: false,
          menu: {
            items: [],
            renameItem: function(opts) {
              _.findWhere(this.items,
                {name: opts.name}
              ).name = opts.newName;
            },
            addItem: function(menuItem) {
              this.items.push(menuItem);
            },
            addItemToHead: function(menuItem) {
              this.items.splice(0, 0, menuItem);
            },
            removeItem: function(itemName) {
              var index = this.items.indexOf(_.find(this.items, function(it) {
                return it.name === itemName;
              }));
              this.items.splice(index, 1);
            }
          }
        };

        $scope.isLocked = function() {
          return bkSessionManager.isNotebookLocked();
        };

        $scope.newCellMenuConfig = {
          isShow: function() {
            return !bkSessionManager.isNotebookLocked() && !notebookCellOp.isContainer($scope.cellmodel.id);
          },
          attachCell: function(newCell) {
            notebookCellOp.insertAfter($scope.cellmodel.id, newCell);
          },
          prevCell: function() {
            return $scope.cellmodel;
          }
        };

        $scope.getFullIndex = function() {
          if ($scope.$parent.getNestedLevel) {
            return $scope.$parent.getFullIndex() + '.' + ($scope.index + 1);
          }

          return $scope.index + $scope.getNestedLevel();
        };

        $scope.isRoot = function() {
          return $scope.$parent.getNestedLevel === undefined;
        };

        $scope.toggleShowDebugInfo = function() {
          $scope.cellview.showDebugInfo = !$scope.cellview.showDebugInfo;
        };
        $scope.isShowDebugInfo = function() {
          return $scope.cellview.showDebugInfo;
        };
        $scope.isDebugging = function() {
          return getBkBaseViewModel().isDebugging();
        };
        $scope.getNestedLevel = function() {
          // bkCell is using isolated scope, $scope is the isolated scope
          // $scope.$parent is the scope resulted from ng-repeat (ng-repeat creates a prototypal
          // scope for each ng-repeated item)
          // $Scope.$parent.$parent is the container cell(which initiates ng-repeat) scope
          var parent = $scope.$parent.$parent;
          return parent.getNestedLevel ? parent.getNestedLevel() + 1 : 1;
        };
        $scope.getParentId = function() {
          return $scope.$parent.$parent.cellmodel ? $scope.$parent.$parent.cellmodel.id : 'root';
        };

        $scope.toggleCellInput = function() {
          if ($scope.cellmodel.input.hidden) {
            delete $scope.cellmodel.input.hidden;
          } else {
            $scope.cellmodel.input.hidden = true;
          }
        };

        $scope.evaluate = function($event) {
          if ($event) {
            $event.stopPropagation();
          }

          $scope.cellmodel.output.state = {};

          bkCoreManager.getBkApp()
            .evaluateRoot($scope.cellmodel)
            .catch(function(data) {
              console.error(data);
            });
        };

        $scope.deleteCell = function() {
          notebookCellOp.delete($scope.cellmodel.id, true);
        };

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getAllEvaluators();
        };

        $scope.getEvaluator = function() {
          return bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
        };

        var moveMethod = 'move';
        if ($scope.cellmodel.type == 'section') {
          moveMethod = 'moveSection';
        }

        $scope.moveCellUp = function() {
          notebookCellOp[moveMethod + 'Up']($scope.cellmodel.id);
        };

        $scope.moveCellDown = function() {
          notebookCellOp[moveMethod + 'Down']($scope.cellmodel.id);
        };

        $scope.moveCellUpDisabled = function() {
          return !notebookCellOp['isPossibleTo' + _.string.capitalize(moveMethod) + 'Up']($scope.cellmodel.id);
        };

        $scope.moveCellDownDisabled = function() {
          return !notebookCellOp['isPossibleTo' + _.string.capitalize(moveMethod) + 'Down']($scope.cellmodel.id);
        };

        $scope.cellview.menu.addItem({
          name: 'Delete cell',
          action: $scope.deleteCell
        });

        $scope.cellview.menu.addItem({
          name: 'Move up',
          action: $scope.moveCellUp,
          disabled: $scope.moveCellUpDisabled
        });

        $scope.cellview.menu.addItem({
          name: 'Move down',
          action: $scope.moveCellDown,
          disabled: $scope.moveCellDownDisabled
        });

        $scope.cellview.menu.addItem({
          name: 'Cut',
          action: function() {
            notebookCellOp.cut($scope.cellmodel.id);
          }
        });

        $scope.cellview.menu.addItem({
          name: 'Paste (append after)',
          disabled: function() {
            return !notebookCellOp.clipboard;
          },
          action: function() {
            notebookCellOp.paste($scope.cellmodel.id);
          }
        });

        $scope.getTypeCellUrl = function() {
          var type = $scope.cellmodel.type;
          return type + '-cell.html';
        };

        $scope.isMarkdownCell = function() {
          return $scope.cellmodel.type === 'markdown';
        };

        $scope.isCodeCell = function() {
          return $scope.cellmodel.type == 'code';
        };
      }
    };
  });

})();

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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkCodeCell', function(
      bkUtils,
      bkEvaluatorManager,
      bkCellMenuPluginManager,
      bkSessionManager,
      bkCoreManager,
      $timeout) {

    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    var CELL_TYPE = 'code';
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/codecell'](),
      scope: {cellmodel: '=', cellmenu: '='},
      controller: function($scope) {
        $scope.cellview = {
          inputMenu: [],
          displays: []
        };

        $scope.isLocked = function() {
          return bkSessionManager.isNotebookLocked();
        };

        $scope.isEmpty = function() {
          return !($scope.cellmodel.output.result);
        };

        $scope.isError = function() {
          //jscs:disable
          if ($scope.cellmodel === undefined || $scope.cellmodel.output === undefined || $scope.cellmodel.output.result === undefined) {
            //jscs:enable
            return false;
          }

          var type = $scope.cellmodel.output.result.innertype;

          if (!type && $scope.cellmodel.output.result.payload !== undefined) {
            type = $scope.cellmodel.output.result.payload.innertype;
          }

          return type == 'Error';
        };

        $scope.isShowInput = function() {
          if ($scope.isLocked()) {
            return false;
          }
          if ($scope.cellmodel.input.hidden === true) {
            return false;
          }
          return true;
        };

        $scope.bkNotebook = getBkNotebookWidget();
        // ensure cm refreshes when 'unhide'
        $scope.$watch('isShowInput()', function(newValue, oldValue) {
          if ($scope.cm && newValue === true && newValue !== oldValue) {
            bkUtils.fcall(function() {
              $scope.cm.refresh();
            });
          }
        });

        $scope.isHiddenOutput = function() {
          return $scope.cellmodel.output.selectedType == 'Hidden';
        };

        $scope.hasOutput = function() {
          return $scope.cellmodel.output.result !== undefined;
        };

        $scope.backgroundClick = function(event) {
          if (!$scope.isShowInput() || $(event.toElement).parents().hasClass('code-cell-output')) {
            return;
          }
          var top = $(event.delegateTarget).offset().top;
          var outputElement = $(event.delegateTarget).children('.code-cell-output:first');
          var bottom;
          if (outputElement.length > 0) {
            bottom = outputElement.offset().top;
          } else {
            bottom = top + $(event.delegateTarget).height();
          }
          // Even better would be to detect left/right and move to
          // beginning or end of line, but we can live with this for now.
          var cm = $scope.cm;
          if (event.pageY < (top + bottom) / 2) {
            cm.setCursor(0, 0);
          } else {
            cm.setCursor(cm.lineCount() - 1,
                         cm.getLine(cm.lastLine()).length);
          }
          cm.focus();
        };

        $scope.isShowOutput = function() {
          if ($scope.cellmodel.output.hidden === true) {
            return false;
          }
          var result = $scope.cellmodel.output.result;
          if (result && result.hidden === true) {
            return false;
          }
          return !(result === undefined || result === null);
        };

        $scope.outputTitle = function() {
          return $scope.isError() ? 'Error' : null;
        };

        $scope.evaluate = function($event) {
          if ($event) {
            $event.stopPropagation();
          }

          $scope.cellmodel.output.state = {};
          bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel).
              catch(function(data) {
                console.log('Evaluation failed');
              });
        };
        var editedListener = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        };
        $scope.$watch('cellmodel.id', editedListener);
        $scope.$watch('cellmodel.evaluator', editedListener);
        $scope.$watch('cellmodel.initialization', editedListener);
        $scope.$watch('cellmodel.input.body', editedListener);
        $scope.$watch('cellmodel.output.result', editedListener);

        $scope.autocomplete = function(cpos, onResults) {
          var evaluator = bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
          if (!evaluator) {
            return;
          }
          if (evaluator.autocomplete) {
            evaluator.autocomplete($scope.cellmodel.input.body, cpos, onResults);
          } else if (evaluator.autocomplete2) {
            // used by JavaScript evaluator
            evaluator.autocomplete2($scope.cm, null, onResults);
          }
        };

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getAllEvaluators();
        };

        $scope.getEvaluator = function() {
          return bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
        };
        $scope.updateUI = function(evaluator) {
          $scope.cellmodel.evaluatorReader = Boolean(evaluator);
          if ($scope.cm && evaluator) {
            $scope.cm.setOption('mode', evaluator.cmMode);
            if (evaluator.indentSpaces) {
              $scope.cm.setOption('indentUnit', evaluator.indentSpaces);
            }
          }
        };
        $scope.$watch('getEvaluator()', function(newValue, oldValue) {
          $scope.updateUI(newValue);
        });
        $scope.appendCodeCell = function(evaluatorName) {
          var thisCellId = $scope.cellmodel.id;
          if (!evaluatorName) {
            // if no evaluator specified, use the current evaluator
            evaluatorName = $scope.cellmodel.evaluator;
          }
          var newCell = bkSessionManager.getNotebookNewCellFactory().newCodeCell(evaluatorName);
          notebookCellOp.appendAfter(thisCellId, newCell);
          bkUtils.refreshRootScope();
        };
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        var shareMenu = {
          name: 'Share',
          items: []
        };
        $scope.cellmenu.addItem(shareMenu);
        $scope.$watch('getShareMenuPlugin()', function() {
          shareMenu.items = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
        });

        $scope.cellmenu.addItem({
          name: 'Show input cell',
          isChecked: function() {
            return !$scope.cellmodel.input.hidden;
          },
          action: function() {
            if ($scope.cellmodel.input.hidden) {
              delete $scope.cellmodel.input.hidden;
            } else {
              $scope.cellmodel.input.hidden = true;
            }
          }
        });
        $scope.cellmenu.addItem({
          name: 'Show output cell (if available)',
          isChecked: function() {
            return !$scope.cellmodel.output.hidden;
          },
          action: function() {
            if ($scope.cellmodel.output.hidden) {
              delete $scope.cellmodel.output.hidden;
            } else {
              $scope.cellmodel.output.hidden = true;
            }
          }
        });

        $scope.isInitializationCell = function() {
          return $scope.cellmodel.initialization;
        };

        $scope.cellmenu.addItem({
          name: 'Initialization Cell',
          isChecked: function() {
            return $scope.isInitializationCell();
          },
          action: function() {
            if ($scope.isInitializationCell()) {
              $scope.cellmodel.initialization = undefined;
            } else {
              $scope.cellmodel.initialization = true;
            }
            notebookCellOp.reset();
          }
        });

        $scope.cellmenu.addItem({
          name: 'Options',
          action: function() {
            bkCoreManager.showFullModalDialog(function cb(r) { } ,
                'app/mainapp/dialogs/codecelloptions.jst.html', 'CodeCellOptionsController', $scope.cellmodel);
          }
        });

      },
      link: function(scope, element, attrs) {
        scope.showDebug = false;

        function isFullScreen(cm) {
          return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
        }

        function winHeight() {
          return window.innerHeight || (document.documentElement || document.body).clientHeight;
        }

        function setFullScreen(cm, full) {
          var wrap = cm.getWrapperElement();
          if (full) {
            wrap.className += ' CodeMirror-fullscreen';
            wrap.style.height = winHeight() + 'px';
            document.documentElement.style.overflow = 'hidden';
          } else {
            wrap.className = wrap.className.replace(' CodeMirror-fullscreen', '');
            wrap.style.height = '';
            document.documentElement.style.overflow = '';
          }
          cm.refresh();
        }
        var resizeHandler = function() {
          var showing = document.body.getElementsByClassName('CodeMirror-fullscreen')[0];
          if (!showing) {
            return;
          }
          showing.CodeMirror.getWrapperElement().style.height = winHeight() + 'px';
        };
        scope.focus = function() {
          scope.cm.focus();
        };
        CodeMirror.on(window, 'resize', resizeHandler);

        var codeMirrorOptions = bkCoreManager.codeMirrorOptions(scope, notebookCellOp);
        _.extend(codeMirrorOptions.extraKeys, {
          'Esc' : function(cm) {
            cm.execCommand('singleSelection');
            if (cm.state.vim && cm.state.vim.insertMode) {
              return;
            } else {
              if (isFullScreen(cm)) {
                setFullScreen(cm, false);
              }
            }
          },
          'Alt-F11': function(cm) {
            setFullScreen(cm, !isFullScreen(cm));
          },
          'Shift-Ctrl-A': function(cm) {
            scope.appendCodeCell();
          },
          'Shift-Cmd-A': function(cm) {
            scope.appendCodeCell();
          },
          'Shift-Ctrl-E': function(cm) {
            scope.popupMenu();
            element.find('.inputcellmenu').find('li').find('a')[0].focus();
          },
          'Shift-Cmd-E': function(cm) {
            scope.popupMenu();
            element.find('.inputcellmenu').find('li').find('a')[0].focus();
          },
          'Ctrl-Alt-H': function(cm) { // cell hide
            scope.cellmodel.input.hidden = true;
            bkUtils.refreshRootScope();
          },
          'Cmd-Alt-H': function(cm) { // cell hide
            scope.cellmodel.input.hidden = true;
            bkUtils.refreshRootScope();
          }
        });

        Scrollin.track(element[0], function() {
          if (scope.cm === undefined) {
            var template = '<textarea class="bkcelltextarea" ng-model="cellmodel.input.body">' + scope.cellmodel.input.body + '</textarea>';
            $(element.find('.bkcelltextarea')[0]).replaceWith($(template));

            scope.cm = CodeMirror.fromTextArea(element.find('textarea')[0], codeMirrorOptions);
            scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);
            scope.cm.on('change', changeHandler);
            scope.updateUI(scope.getEvaluator());
            // Since the instantiation of codemirror instances is now lazy,
            // we need to track and handle focusing on an async cell add
            if (scope._shouldFocusCodeMirror) {
              delete scope._shouldFocusCodeMirror;
              return scope.cm.focus();
            }
          }
        });

        scope.bkNotebook.registerFocusable(scope.cellmodel.id, scope);

        // cellmodel.body --> CodeMirror
        scope.$watch('cellmodel.input.body', function(newVal, oldVal) {
          if (scope.cm && newVal !== scope.cm.getValue()) {
            if (newVal === null) {
              newVal = '';
            }
            scope.cm.setValue(newVal);
            scope.cm.clearHistory();
          }
        });
        // cellmodel.body <-- CodeMirror
        var changeHandler = function(cm, e) {
          if (scope.cellmodel.input.body !== cm.getValue()) {
            scope.cellmodel.lineCount = cm.lineCount();
            scope.cellmodel.input.body = cm.getValue();
            if (!bkSessionManager.isNotebookModelEdited()) {
              bkSessionManager.setNotebookModelEdited(true);
              bkUtils.refreshRootScope();
            }
          }
        };

        var inputMenuDiv = element.find('.bkcell').first();
        scope.popupMenu = function(event) {
          var menu = inputMenuDiv.find('.dropdown').first();
          menu.find('.dropdown-toggle').first().dropdown('toggle');
        };

        if (scope.isInitializationCell()) {
          element.closest('.bkcell').addClass('initcell');
        } else {
          element.closest('.bkcell').removeClass('initcell');
        }
        scope.$watch('isInitializationCell()', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue) {
              element.closest('.bkcell').addClass('initcell');
            } else {
              element.closest('.bkcell').removeClass('initcell');
            }
          }
        });

        scope.getShareData = function() {
          var evaluator = _(bkSessionManager.getRawNotebookModel().evaluators)
              .find(function(evaluator) {
                return evaluator.name === scope.cellmodel.evaluator;
              });
          var cells = [scope.cellmodel];
          return bkUtils.generateNotebook([evaluator], cells);
        };

        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) {
            if (scope.cm) {
              return scope.cm.focus();
            }

            scope._shouldFocusCodeMirror = true;
          }
        });

        scope.$on('beaker.section.toggled', function(e, isCollapsed) {
          if (!isCollapsed) {
            $timeout(function() {
              if (scope.cm === undefined) {
                scope.cm = CodeMirror.fromTextArea(element.find('textarea')[0], codeMirrorOptions);
                scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);
                scope.cm.on('change', changeHandler);
                scope.updateUI(scope.getEvaluator());
              } else {
                scope.cm.refresh();
              }
            });
          }
        });

        scope.$on('$destroy', function() {
          Scrollin.untrack(element[0]);
          CodeMirror.off(window, 'resize', resizeHandler);
          CodeMirror.off('change', changeHandler);
          if (scope.cm) {
            scope.cm.off();
          }
          scope.bkNotebook.unregisterFocusable(scope.cellmodel.id);
          scope.bkNotebook.unregisterCM(scope.cellmodel.id);
          scope.bkNotebook = null;
        });
      }
    };
  });

})();

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
 * This module holds the logic for code cell, which is a typed {@link bkCell}.
 * The code cell contains an input cell an output cell ({@link bkCodeCellOutput}) and cell menus.
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkCodeCellInputMenu', function(bkCoreManager) {
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    } ;
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/codecellinputmenu'](),
      controller: function($scope) {
        $scope.getItemClass = function(item) {
          var result = [];
          if (item.items) {
            result.push('dropdown-submenu');
          }
          return result.join(' ');
        };
        $scope.getSubmenuItemClass = function(item) {
          var result = [];
          if (item.disabled) {
            result.push('disabled-link');
          }
          return result.join(' ');
        };
        $scope.getShowEvalIcon = function(evaluatorName) {
          return $scope.cellmodel.evaluator === evaluatorName;
        };
        $scope.setEvaluator = function(evaluatorName) {
          var cellId = $scope.cellmodel.id;
          $scope.cellmodel.evaluator = evaluatorName;
          getBkNotebookWidget().getFocusable(cellId).focus();
        };
      }
    };
  });
})();

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
 * This module is the abstract container for types of output displays. While we plan to make the output display loading
 * mechanism more pluggable, right now, this module serves as the registration output display types and holds the logic
 * for switch between applicable output display through UI.
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkCodeCellOutput', function(
      bkUtils, bkOutputDisplayFactory, bkEvaluatorManager, bkEvaluateJobManager) {
    return {
      restrict: "E",
      template: JST["mainapp/components/notebook/codecelloutput"](),
      scope: {
        model: "=",
        evaluatorId: "@",
        cellId: "@"
      },
      controller: function($scope) {
        var _shareMenuItems = [];

        $scope.getOutputResult = function() {
          return $scope.model.result;
        };
        $scope.$on('$destroy', function () {
          if ($scope.subscribedTo) {
            if ($scope.model.pluginName && window.languageUpdateService && window.languageUpdateService[$scope.model.pluginName]) {
              window.languageUpdateService[$scope.model.pluginName].unsubscribe($scope.subscribedTo);
            }
          }
          if ($scope.cellId !== undefined)
            bkEvaluateJobManager.deRegisterOutputCell($scope.cellId);
        });
        $scope.applicableDisplays = [];
        $scope.$watch('getOutputResult()', function(result) {
          if ($scope.subscribedTo && $scope.subscribedTo !== result.update_id) {
            if ($scope.model.pluginName && window.languageUpdateService && window.languageUpdateService[$scope.model.pluginName]) {
              window.languageUpdateService[$scope.model.pluginName].unsubscribe($scope.subscribedTo);
            }
            $scope.subscribedTo = null;
          }
          if (!$scope.subscribedTo && result !== undefined && result.update_id) {
            if ($scope.model.pluginName && window.languageUpdateService && window.languageUpdateService[$scope.model.pluginName]) {
              var onUpdatableResultUpdate = function(update) {
                $scope.model.result = update;
                bkHelper.refreshRootScope();
              };
              window.languageUpdateService[$scope.model.pluginName].subscribe(result.update_id, onUpdatableResultUpdate);
              $scope.subscribedTo = result.update_id;
            }
          }

          if (result !== undefined && result.type === "UpdatableEvaluationResult")
            $scope.applicableDisplays = bkOutputDisplayFactory.getApplicableDisplays(result.payload);
          else
            $scope.applicableDisplays = bkOutputDisplayFactory.getApplicableDisplays(result);
          $scope.model.selectedType = $scope.applicableDisplays[0];
        });

        // to be used in bkOutputDisplay
        $scope.outputDisplayModel = {
          getCellModel: function() {
            var result = $scope.getOutputResult();
            if (result && result.type === "BeakerDisplay") {
              return result.object;
            } else if (result && result.type === "UpdatableEvaluationResult") {
                return result.payload;
            } else {
              return result;
            }
          },
          isShowOutput: function() {
            return $scope.isShowOutput();
          },
          getDumpState: function() {
            var result = $scope.model.state;
            return result;
          },
          setDumpState: function(s) {
            $scope.model.state = s;
          },
          resetShareMenuItems: function(newItems) {
            _shareMenuItems = newItems;
          },
          getCometdUtil: function() {
            var id = $scope.getEvaluatorId();            
            if (id) {
              var evaluator = bkEvaluatorManager.getEvaluator(id);
              if (evaluator) {
                return evaluator.cometdUtil;
              }
            }
          },
          getEvaluatorId: function() {
            var id = $scope;
            while (id !== undefined) {
              if (id.evaluatorId !== undefined)
                return id.evaluatorId;
              id = id.$parent;
            }
            return undefined;
          }
        };

        $scope.getOutputDisplayType = function() {
          if ($scope.model === undefined)
              return "Text";
          var type = $scope.model.selectedType;
          // if BeakerDisplay or UpdatableEvaluationResult, use the inner type instead
          if (type === "BeakerDisplay") {
            var result = $scope.getOutputResult();
            type = result ? result.innertype : "Hidden";
          }
          return type;
        };

        var getElapsedTimeString = function() {
          if ($scope.model.elapsedTime || $scope.model.elapsedTime === 0) {
            var elapsedTime = $scope.model.elapsedTime;
            return "Elapsed time: " + bkUtils.formatTimeString(elapsedTime);
          }
          return "";
        };

        $scope.isShowOutput = function() {
          if ($scope.$parent !== undefined && $scope.$parent.isShowOutput !== undefined)
            return $scope.$parent.isShowOutput();
          return true;
        };

        $scope.isShowMenu = function() {
          if ($scope.$parent !== undefined && $scope.$parent.isShowMenu !== undefined)
            return $scope.$parent.isShowMenu();
          return true;
        };

        $scope.toggleExpansion = function() {
          if ($scope.$parent.cellmodel !== undefined && $scope.$parent.cellmodel.output !== undefined) {
            if ($scope.$parent.cellmodel.output.hidden) {
              delete $scope.$parent.cellmodel.output.hidden;
              $scope.$broadcast('expand');
            } else {
              $scope.$parent.cellmodel.output.hidden = true;
            }
          }
        };

        $scope.isExpanded = function() {
          if ($scope.$parent.cellmodel !== undefined && $scope.$parent.cellmodel.output !== undefined)
            return !$scope.$parent.cellmodel.output.hidden;
          return true;
        };

        // to be used in output cell menu
        $scope.outputCellMenuModel = (function() {
          var _additionalMenuItems = [
            {
              name: "Share",
              items: function() {
                return _shareMenuItems;
              }
            },
            {
              name: "Toggle Cell Output",
              isChecked: function() {
                $scope.isExpanded();
              },
              action: function() {
                $scope.toggleExpansion();
              }
            },
            {
              name: "Delete",
              action: function() {
                $scope.model.result = undefined;
              }
            },
            {
              name: getElapsedTimeString,
              action: null
            }
          ];
          return {
            getApplicableDisplays: function() {
              return $scope.applicableDisplays;
            },
            getSelectedDisplay: function() {
              return $scope.model.selectedType;
            },
            setSelectedDisplay: function(display) {
              $scope.model.selectedType = display;
            },
            getAdditionalMenuItems: function() {
              return _additionalMenuItems;
            }
          };
        })();
        
        $scope.outputRefreshed = function() {
          if (!($scope.$$phase || $scope.$root.$$phase))
            $scope.$digest();
        }
        if ( $scope.cellId !== undefined )
          bkEvaluateJobManager.registerOutputCell($scope.cellId, $scope);
      }
    };
  });

})();

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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkCodeCellOutputMenu', function(bkUtils) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/codecelloutputmenu"](),
      scope: {
        model: '='
      },
      controller: function($scope) {
        $scope.getItemName = function(item) {
          if (_.isFunction(item.name)) {
            return item.name();
          } else {
            return item.name;
          }
        };
        $scope.getItemClass = function(item) {
          var result = [];
          if (item.items) {
            var subItems = $scope.getSubItems(item);
            if (subItems.length > 0) {
              result.push("dropdown-submenu");
              result.push("drop-left");
            } else {
              result.push("display-none");
            }
          } else if ($scope.getItemName(item) === "") {
            result.push("display-none");
          }
          return result.join(" ");
        };
        $scope.getSubmenuItemClass = function(item) {
          var result = [];
          if (item.disabled) {
            result.push("disabled-link");
          }
          return result.join(" ");
        };
        $scope.getSubItems = function(parentItem) {
          if (_.isFunction(parentItem.items)) {
            return parentItem.items();
          }
          return parentItem.items;
        };
      }
    };
  });
})();

/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

  // Override markdown link renderer to always have `target="_blank"`
  // Mostly from Renderer.prototype.link
  // https://github.com/chjj/marked/blob/master/lib/marked.js#L862-L881
  var bkRenderer = new marked.Renderer();
  bkRenderer.link = function(href, title, text) {
    var prot;
    if (this.options.sanitize) {
      try {
        prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
      } catch (e) {
        return '';
      }
      //jshint ignore:start
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
        //jshint ignore:end
        return '';
      }
    };
    var out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ' target="_blank"'; // < ADDED THIS LINE ONLY
    out += '>' + text + '</a>';
    return out;
  }

  bkRenderer.paragraph = function(text) {
    // Allow users to write \$ to escape $
    return marked.Renderer.prototype.paragraph.call(this, text.replace(/\\\$/g, '$'));
  };

  var module = angular.module('bk.notebook');
  module.directive('bkMarkdownEditable', ['bkSessionManager', 'bkHelper', 'bkCoreManager', '$timeout', function(bkSessionManager, bkHelper, bkCoreManager, $timeout) {
    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/markdown-editable"](),
      scope: {
        cellmodel: '='
      },
      link: function(scope, element, attrs) {
        var contentAttribute = scope.cellmodel.type === "section" ? 'title' : 'body';

        var doktex = function(markdownFragment) {
          try {
            renderMathInElement(markdownFragment[0], {
              delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right:  "$", display: false},
                {left: "\\[", right: "\\]", display: true},
                {left: "\\(", right: "\\)", display: false}
              ]
            });
          } catch(err) {
            bkHelper.show1ButtonModal(err.message+'<br>See: <a target="_blank" href="http://khan.github.io/KaTeX/">KaTeX website</a> and its <a target="_blank" href="https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX">list of supported functions</a>.', "KaTex error");
          }
        }
        
        var preview = function() {
          var markdownFragment = $('<div>' + scope.cellmodel[contentAttribute] + '</div>');
          doktex(markdownFragment);
          element.find('.markup').html(marked(markdownFragment.html(), {gfm: true, renderer: bkRenderer}));
          markdownFragment.remove();
          scope.mode = 'preview';
        };

        var syncContentAndPreview = function() {
          scope.cellmodel[contentAttribute] = scope.cm.getValue();
          preview();
        };
        scope.evaluate = syncContentAndPreview;

        scope.bkNotebook = getBkNotebookWidget();

        scope.focus = function() {
          scope.edit();
          scope.$apply();
        };

        scope.edit = function(event) {
          var selection = window.getSelection() || {};
          // If the user is selecting some text, do not enter the edit markdown mode
          if (selection.type == "Range" && $.contains(element[0], selection.focusNode)) {
            return;
          }
          if (bkHelper.isNotebookLocked()) return;
          if (event && event.target.tagName === "A") return; // Don't edit if clicking a link

          scope.mode = 'edit';

          $timeout(function() {
            // remove content of markup when toggling to edit mode to prevent
            // flash when toggling back to preview mode.
            element.find('.markup').html('');

            var cm = scope.cm;
            cm.setValue(scope.cellmodel[contentAttribute]);
            cm.clearHistory();

            if (event) {
              var clickLocation;
              var wrapper = $(event.delegateTarget);
              var top = wrapper.offset().top;
              var bottom = top + wrapper.outerHeight();
              if (event !== undefined && event.pageY < (top + bottom) / 2) {
                cm.setCursor(0, 0);
              } else {
                cm.setCursor(cm.lineCount() - 1, cm.getLine(cm.lastLine()).length);
              }
            }

            cm.focus();
          });
        };

        var codeMirrorOptions = _.extend(bkCoreManager.codeMirrorOptions(scope, notebookCellOp), {
          lineNumbers: false,
          mode: "markdown",
          smartIndent: false
        });

        scope.cm = CodeMirror.fromTextArea(element.find("textarea")[0], codeMirrorOptions);

        scope.bkNotebook.registerFocusable(scope.cellmodel.id, scope);
        scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);

        scope.cm.setValue(scope.cellmodel[contentAttribute]);
        preview();

        scope.cm.on("blur", function(){
          scope.$apply(function() {
            syncContentAndPreview();
          });
        });

        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) scope.edit();
        });

        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });

        scope.$on('$destroy', function() {
          scope.bkNotebook.unregisterFocusable(scope.cellmodel.id, scope);
          scope.bkNotebook.unregisterCM(scope.cellmodel.id, scope.cm);
          scope.cm.off();
        });
      }
    };
  }]);
})();

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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');
  module.directive('bkMarkdownCell', [
      'bkSessionManager',
      'bkHelper',
      'bkCoreManager',
      '$timeout', function(
        bkSessionManager,
        bkHelper,
        bkCoreManager,
        $timeout) {

        return {
          restrict: 'E',
          template: JST['mainapp/components/notebook/markdowncell']()
        };
      }]);
})();

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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkNewCellMenu', function(
      bkUtils, bkSessionManager, bkEvaluatorManager) {
    var cellOps = bkSessionManager.getNotebookCellOp();
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/newcellmenu"](),
      scope: {
        config: '=',
        isLarge: '=',
        position: '@'
      },
      link: function($scope, element) {
        $scope.hideOpenMenus = function() {
          $(document).trigger('click.bs.dropdown.data-api');
        };
      },
      controller: function($scope) {
        var newCellFactory = bkSessionManager.getNotebookNewCellFactory();
        var recentlyAddedLanguage;

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getAllEvaluators();
        };
        var levels = [1, 2, 3, 4];
        $scope.getLevels = function() {
          return levels;
        };

        $scope.newCodeCell = function(evaluatorName) {
          var newCell = newCellFactory.newCodeCell(evaluatorName);
          attachCell(newCell);
        };
        $scope.newDefaultCodeCell = function() {
          $scope.newCodeCell($scope.defaultEvaluator());
        };
        $scope.showPluginManager = function() {
          bkHelper.showLanguageManager($scope);
        };
        $scope.newMarkdownCell = function() {
          var newCell = newCellFactory.newMarkdownCell();
          attachCell(newCell);
        };

        $scope.newSectionCell = function(level) {
          var newCell = newCellFactory.newSectionCell(level);
          attachCell(newCell);
        };

        $scope.defaultEvaluator = function() {
          // by default, insert a code cell (and use the best evaluator with best guess)
          // If a prev cell is given, first scan toward top of the notebook, and use the evaluator
          // of the first code cell found. If not found, scan toward bottom, and use the evaluator
          // of the first code cell found.
          // If a prev cell is not given, use the very last code cell in the notebook.
          // If there is no code cell in the notebook, use the first evaluator in the list
          var prevCell = $scope.config && $scope.config.prevCell && $scope.config.prevCell();
          var codeCell = recentlyAddedLanguage
              || (prevCell && cellOps.findCodeCell(prevCell.id))
              || (prevCell && cellOps.findCodeCell(prevCell.id, true))
              || getLastCodeCell();
          var evaluatorName = codeCell ?
              codeCell.evaluator : _.keys(bkEvaluatorManager.getAllEvaluators())[0];

          return evaluatorName;
        };

        function attachCell(cell) {
          bkSessionManager.setNotebookModelEdited(true);
          if ($scope.config && $scope.config.attachCell) {
            return $scope.config.attachCell(cell);
          } else {
            cellOps.insertFirst(cell);
          }
        }

        // get the last code cell in the notebook
        var getLastCodeCell = function() {
          return _.last(cellOps.getAllCodeCells());
        };

        $scope.$on('languageAdded', function(event, data) {
          recentlyAddedLanguage = data;
        });

        $scope.$on('cellMapRecreated', function() {
          recentlyAddedLanguage = null;
        });
      }
    };
  });

})();

/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * bkNotebook
 * - the controller that responsible for directly changing the view
 * - root cell + evaluators + other stuffs specific to one (the loaded) notebook
 * - root cell is just a special case of a section cell
 * - TODO, we are mixing the concept of a notebook and a root section here
 * we want to separate out the layout specific stuffs(idea of a section) from other
 * stuffs like evaluator panel
 */

(function () {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkNotebook', function (
      bkUtils,
      bkEvaluatorManager,
      bkCellMenuPluginManager,
      bkSessionManager,
      bkCoreManager,
      bkOutputLog) {
    var CELL_TYPE = 'notebook';
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/notebook'](),
      scope: {
        setBkNotebook: '&',
        isLoading: '='
      },
      controller: function ($scope) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var _impl = {
          _viewModel: {
            _debugging: false,
            _showOutput: false,
            _editMode: 'default',
            toggleShowOutput: function () {
              this._showOutput = !this._showOutput;
            },
            hideOutput: function () {
              this._showOutput = false;
            },
            isShowingOutput: function () {
              return this._showOutput;
            },
            isLocked: function() {
              return bkSessionManager.isNotebookLocked();
            },
            toggleAdvancedMode: function() {
              this._advancedMode = !this._advancedMode;
            },
            isAdvancedMode: function() {
              return !!(this._advancedMode);
            },
            getEditMode: function() {
              return this._editMode;
            },
            setEditMode: function(mode) {
              bkHelper.setInputCellKeyMapMode(mode);
              this._editMode = mode;
            },
            // Add edit mode
            isHierarchyEnabled: function() {
              return !!(this._hierarchyEnabled);
            },
            toggleHierarchyEnabled: function() {
              this._hierarchyEnabled = !this._hierarchyEnabled;
            },
            toggleDebugging: function () {
              this._debugging = !this._debugging;
            },
            isDebugging: function () {
              return this._debugging;
            },
            getLodThreshold: function () {
              return this._lodThreshold;
            },
            setLodThreshold: function (lodThreshold) {
               this._lodThreshold = lodThreshold;
            }
          },
          getViewModel: function () {
            return this._viewModel;
          },
          shareAndOpenPublished: function () {
            // TODO, this is an ugly hack. Need refactoring.
            shareMenu.items[0].action();
          },
          deleteAllOutputCells: function () {
            bkSessionManager.getNotebookCellOp().deleteAllOutputCells();
          },
          _focusables: {}, // map of focusable(e.g. code mirror instances) with cell id being keys
          registerFocusable: function (cellId, focusable) {
            this._focusables[cellId] = focusable;
          },
          unregisterFocusable: function (cellId) {
            delete this._focusables[cellId];
            this._focusables[cellId] = null;
          },
          getFocusable: function (cellId) {
            return this._focusables[cellId];
          },
          _codeMirrors: {},
          registerCM: function (cellId, cm) {
            this._codeMirrors[cellId] = cm;
            cm.setOption('keyMap', this._cmKeyMapMode);
            cm.setOption('vimMode', this._cmKeyMapMode == 'vim');
          },
          unregisterCM: function (cellId) {
            delete this._codeMirrors[cellId];
            this._codeMirrors[cellId] = null;
          },
          _cmKeyMapMode: 'default',
          setCMKeyMapMode: function (keyMapMode) {
            this._cmKeyMapMode = keyMapMode;
            _.each(this._codeMirrors, function (cm) {
              cm.setOption('keyMap', keyMapMode);
              cm.setOption('vimMode', keyMapMode == 'vim');
            });
          },
          getCMKeyMapMode: function () {
            return this._cmKeyMapMode;
          }
        };
        $scope.setBkNotebook({bkNotebook: _impl});

        $scope.getFullIndex = function() { return '1' }

        $scope.isLocked = function() {
          return _impl._viewModel.isLocked();
        }

        $scope.isDebugging = function () {
          return _impl._viewModel.isDebugging();
        };
        $scope.isShowingOutput = function () {
          return _impl._viewModel.isShowingOutput();
        };

        $scope.showDebugTree = false;
        $scope.getNotebookModel = function () {
          return bkSessionManager.getRawNotebookModel();
        };
        $scope.clearOutput = function () {
          $.ajax({
            type: 'GET',
            datatype: 'json',
            url: bkUtils.serverUrl('beaker/rest/outputlog/clear'),
            data: {}});
          $scope.outputLog = [];
        };
        $scope.hideOutput = function () {
          _impl._viewModel.hideOutput();
        };

        $scope.isAdvancedMode = function () {
          return _impl._viewModel.isAdvancedMode();
        };

        $scope.isHierarchyEnabled = function () {
          return _impl._viewModel.isHierarchyEnabled();
        };

        $scope.showStdOut = true;
        $scope.showStdErr = true;

        $scope.toggleStdOut = function ($event) {
          if ($event) $event.stopPropagation();

          $scope.showStdOut = !$scope.showStdOut;
        };

        $scope.toggleStdErr = function ($event) {
          if ($event) $event.stopPropagation();

          $scope.showStdErr = !$scope.showStdErr;
        };

        bkOutputLog.getLog(function (res) {
          $scope.outputLog = res;
        });

        bkOutputLog.subscribe(function (reply) {
          if (!_impl._viewModel.isShowingOutput()) {
            _impl._viewModel.toggleShowOutput();
          }
          $scope.outputLog.push(reply.data);
          $scope.$apply();
          // Scroll to bottom so this output is visible.
          $.each($('.outputlogbox'),
                 function (i, v) {
                   $(v).scrollTop(v.scrollHeight);
                 });
        });
        var margin = $('.outputlogstdout').position().top;
        var outputLogHeight = 300;
        var dragHeight;
        var fixOutputLogPosition = function () {
          $('.outputlogcontainer').css('top', window.innerHeight - outputLogHeight);
          $('.outputlogcontainer').css('height', outputLogHeight);
          $('.outputlogbox').css('height', outputLogHeight - margin - 5);
        };
        $scope.unregisters = [];
        $(window).resize(fixOutputLogPosition);
        $scope.unregisters.push(function() {
          $(window).off('resize', fixOutputLogPosition);
        });
        var dragStartHandler = function () {
          dragHeight = outputLogHeight;
        };
        var outputloghandle = $('.outputloghandle');
        outputloghandle.drag('start', dragStartHandler);
        $scope.unregisters.push(function() {
          outputloghandle.off('dragstart', dragStartHandler);
        });
        var dragHandler = function (ev, dd) {
          outputLogHeight = dragHeight - dd.deltaY;
          if (outputLogHeight < 20) {
            outputLogHeight = 20;
          }
          if (outputLogHeight > window.innerHeight - 80) {
            outputLogHeight = window.innerHeight - 80;
          }
          fixOutputLogPosition();
        };
        outputloghandle.drag(dragHandler);
        $scope.unregisters.push(function() {
          outputloghandle.off('drag', dragHandler);
        });

        $scope.getChildren = function () {
          // this is the root
          return notebookCellOp.getChildren('root');
        };

        $scope.isEmpty = function() {
          return $scope.getChildren().length == 0;
        };

        $scope.getShareMenuPlugin = function () {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.getShareData = function () {
          return bkSessionManager.getRawNotebookModel();
        };
        var shareMenu = {
          name: 'Share',
          items: []
        };
        $scope.$watch('getShareMenuPlugin()', function() {
          shareMenu.items = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
        });

        $scope.$watch(function() {
          return document.body.clientHeight;
        }, function(v, prev) {
          if (v !== prev) {
            $scope.$evalAsync(Scrollin.checkForVisibleElements);
          }
        });

        $scope.isInitializationCell = function () {
          return bkSessionManager.isRootCellInitialization();
        };
        $scope.menuItems = [
          {
            name: 'Run all',
            action: function () {
              bkCoreManager.getBkApp().evaluateRoot('root').
                  catch(function (data) {
                    console.error(data);
                  });
            }
          },
          {
            name: 'Initialization Cell',
            isChecked: function () {
              return $scope.isInitializationCell();
            },
            action: function () {
              bkSessionManager.setRootCellInitialization(!$scope.isInitializationCell());
              notebookCellOp.reset();
            }
          },
          shareMenu
        ];

        bkUtils.httpGet(bkUtils.serverUrl('beaker/rest/util/getPreference'), {
          preference: 'advanced-mode'
        }).success(function(isAdvanced) {
          if (_impl._viewModel.isAdvancedMode() != (isAdvanced === 'true')) {
            _impl._viewModel.toggleAdvancedMode();
          }
        });

        bkUtils.httpGet(bkUtils.serverUrl('beaker/rest/util/getPreference'), {
          preference: 'edit-mode'
        }).success(function(editMode) {
          if (editMode !== '')
            _impl._viewModel.setEditMode(editMode);
        });

        bkUtils.httpGet(bkUtils.serverUrl('beaker/rest/util/getPreference'), {
          preference: 'lod-threshold'
        }).success(function (lodThreshold) {
          _impl._viewModel.setLodThreshold(lodThreshold);
        });
      },
      link: function (scope, element, attrs) {
        var div = element.find('.bkcell').first();
        div.click(function (event) {
          //click in the border or padding should trigger menu
          if (bkUtils.getEventOffsetX(div, event) >= div.width()) {
            var menu = div.find('.bkcellmenu').last();
            menu.css('top', event.clientY);
            menu.css('left', event.clientX - 150);
            menu.find('.dropdown-toggle').first().dropdown('toggle');
            event.stopPropagation();
          }
        });
        if (scope.isInitializationCell()) {
          div.addClass('initcell');
        } else {
          div.removeClass('initcell');
        }
        scope.getNotebookElement = function() {
          return element;
        };
        scope.$watch('isInitializationCell()', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue) {
              div.addClass('initcell');
            } else {
              div.removeClass('initcell');
            }
          }
        });
        scope.$on('$destroy', function() {
          scope.setBkNotebook({bkNotebook: undefined});
          bkOutputLog.unsubscribe();
          _(scope.unregisters).each(function(unregister) {
            unregister();
          });
        });
      }
    };
  });
})();

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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkSectionCell', function(
        bkUtils,
        bkEvaluatorManager,
        bkSessionManager,
        bkCoreManager,
        bkCellMenuPluginManager,
        $timeout) {
    var CELL_TYPE = 'section';
    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/sectioncell'](),
      controller: function($scope) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();

        $scope.cellmodel.collapsed = $scope.cellmodel.collapsed || false;

        $scope.toggleShowChildren = function() {
          $scope.cellmodel.collapsed = !$scope.cellmodel.collapsed;
          $scope.$broadcast('beaker.section.toggled', $scope.cellmodel.collapsed);
        };

        $scope.isLeaf = function() {
          return notebookCellOp.getNextSibling($scope.cellmodel.id) === null;
        };

        $scope.isAntecedentSectionSiblingPrimogeniture = function() {
          var prev = notebookCellOp.getPrevSection($scope.cellmodel.id) || {level: $scope.cellmodel.level};

          return prev.level < $scope.cellmodel.level;
        };

        $scope.isBranch = function() {
          var hasSiblingSection = notebookCellOp.getNextSibling($scope.cellmodel.id) !== null;
          var hasChildSections = _.any(notebookCellOp.getAllDescendants($scope.cellmodel.id), function(child) {
            return child.type === 'section';
          })

          return hasSiblingSection || hasChildSections;
        };

        $scope.isShowChildren = function() {
          return !$scope.cellmodel.collapsed;
        };
        $scope.getChildren = function() {
          return notebookCellOp.getChildren($scope.cellmodel.id);
        };
        $scope.resetTitle = function(newTitle) {
          $scope.cellmodel.title = newTitle;
          bkUtils.refreshRootScope();
        };
        $scope.$watch('cellmodel.title', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });
        $scope.$watch('cellmodel.initialization', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });

        $scope.cellview.menu.renameItem({
          name: 'Delete cell',
          newName: 'Delete heading and keep contents'
        });

        $scope.cellview.menu.addItemToHead({
          name: 'Delete section and all sub-sections',
          action: function() {
            notebookCellOp.deleteSection($scope.cellmodel.id, true);
          }
        });
        $scope.cellview.menu.addItem({
          name: 'Change Header Level',
          items: [
          {
            name: 'H1',
            action: function() {
              $scope.cellmodel.level = 1;
              notebookCellOp.reset();
            }
          },
          {
            name: 'H2',
            action: function() {
              $scope.cellmodel.level = 2;
              notebookCellOp.reset();
            }
          },
          {
            name: 'H3',
            action: function() {
              $scope.cellmodel.level = 3;
              notebookCellOp.reset();
            }
          },
          {
            name: 'H4',
            action: function() {
              $scope.cellmodel.level = 4;
              notebookCellOp.reset();
            }
          }
          ]
        });
        $scope.getShareData = function() {
          var cells = [$scope.cellmodel]
          .concat(notebookCellOp.getAllDescendants($scope.cellmodel.id));
          var usedEvaluatorsNames = _(cells).chain()
            .filter(function(cell) {
              return cell.type === 'code';
            })
          .map(function(cell) {
            return cell.evaluator;
          })
          .unique().value();
          var evaluators = bkSessionManager.getRawNotebookModel().evaluators
            .filter(function(evaluator) {
              return _.any(usedEvaluatorsNames, function(ev) {
                return evaluator.name === ev;
              });
            });
          return bkUtils.generateNotebook(evaluators, cells);
        };

        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.cellview.menu.addItem({
          name: 'Run all',
          action: function() {
            bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel.id).
              catch(function(data) {
                console.error(data);
              });
          }
        });
        var shareMenu = {
          name: 'Share',
          items: []
        };
        $scope.cellview.menu.addItem(shareMenu);
        $scope.$watch('getShareMenuPlugin()', function() {
          shareMenu.items = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
        });
        $scope.isInitializationCell = function() {
          return $scope.cellmodel.initialization;
        };
        $scope.cellview.menu.addItem({
          name: 'Initialization Cell',
          isChecked: function() {
            return $scope.isInitializationCell();
          },
          action: function() {
            if ($scope.isInitializationCell()) {
              $scope.cellmodel.initialization = undefined;
            } else {
              $scope.cellmodel.initialization = true;
            }
            notebookCellOp.reset();
          }
        });
        $scope.newCellMenuConfig = {
          isShow: function() {
            if (bkSessionManager.isNotebookLocked()) {
              return false;
            }
            return !$scope.cellmodel.hideTitle;
          },
          attachCell: function(newCell) {
            notebookCellOp.insertAfter($scope.cellmodel.id, newCell);
          },
          prevCell: function() {
            return $scope.cellmodel;
          }
        };
      }
    };
  });

})();

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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkTextCell', function(bkSessionManager) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/textcell"](),
      controller: function($scope) {
        $scope.isEditable = function() {
          return !bkHelper.isNotebookLocked();
        };
      },
      link: function(scope, element, attrs) {
        var textbox = $(element.find(".editable-text").first());
        element.find('.editable-text').html(scope.cellmodel.body);
        textbox.bind('blur', function() {
          scope.cellmodel.body = textbox.html().trim();
          scope.$apply();
        });
        scope.edit = function() {
          textbox.focus();
        };
        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });
        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) scope.edit();
        });
      }
    };
  });

})();

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
 * This module is the central control of all output displays. It fulfills actual angular directives
 * lazily when user load output display plugins.
 */
(function() {
  "use strict";
  var module = angular.module('bk.outputDisplay', ['bk.utils',  'ngAnimate', 'ngTouch']);
})();

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
(function() {
  "use strict";
  var module = angular.module('bk.outputDisplay');
  module.directive('bkOutputDisplay', function(
      $compile, bkOutputDisplayFactory, bkUtils) {
    var getResultType = function(model) {
      if (model && model.getCellModel()) {
        if (_.isString(model.getCellModel())) {
          return "String";
        } else {
          return model.getCellModel().type;
        }
      }
    };
    return {
      restrict: "E",
      template: "<div>OUTPUT</div>",
      scope: {
        type: "@",
        model: "=" // assume ref to model doesn't change after directive is created
      },
      link: function(scope, element, attrs) {
        var childScope = null;
        var refresh = function(type) {
          if (childScope) {
            childScope.$destroy();
          }
          childScope = scope.$new();
          childScope.model = scope.model;
          var resultType = getResultType(scope.model);
          if (resultType) {
            bkUtils.log("outputDisplay", {
              resultType: resultType,
              displayType: type
            });
          }
          var directiveName = bkOutputDisplayFactory.getDirectiveName(type);
          element.html("<div " + directiveName + " model='model'></div>");
          $compile(element.contents())(childScope);
        };
        scope.$watch("type", function(newType, oldType) {
          refresh(newType);
        });
        scope.$on("outputDisplayFactoryUpdated", function(event, what) {
          if (what === "all" || what === scope.type) {
            refresh(scope.type);
          }
        });
        scope.$on("$destroy", function () {
          if (childScope) {
            childScope.$destroy();
          }
        });
      }
    };
  });
})();

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
 * This module is the central control of all output displays. It fulfills actual angular directives
 * lazily when user load output display plugins.
 */
(function() {
  "use strict";
  var MAX_CAPACITY = 100;

  var module = angular.module('bk.outputDisplay');

  module.factory("bkOutputDisplayFactory", function($rootScope, $sce) {

    var impls = {
        "Text": {
          template: "<pre>{{getText()}}</pre>",
          controller: function($scope) {
            $scope.getText = function() {
              var model = $scope.model.getCellModel();
              return (model && model.text) ? model.text : model;
            };
          }
        },
        "DateTime": {
          template: "<pre>{{getDateTime()}}</pre>",
          controller: function($scope) {
            $scope.getDateTime = function() {
              var model = $scope.model.getCellModel();
              if (model && model.timestamp) {
                var m = moment(model.timestamp);
                return m.format("YYYYMMDD HH:mm:ss.SSS ZZ");
              }
              return model;
            };
          }
        },
        "Date": {
          template: "<pre>{{getDate()}}</pre>",
          controller: function($scope) {
            $scope.getDate = function() {
              var model = $scope.model.getCellModel();
              if (model && model.timestamp) {
                var m = moment(model.timestamp);
                return m.format("YYYY-MM-DD");
              }
              return model;
            };
          }
        },
        "Time": {
          template: "<pre>{{getTime()}}</pre>",
          controller: function($scope) {
            $scope.getTime = function() {
              var model = $scope.model.getCellModel();
              if (model && model.timestamp) {
                var m = moment(model.timestamp);
                return m.format("HH:mm:ss.SSS ZZ");
              }
              return model;
            };
          }
        },
      "Warning": {
        template: "<div class='outline warning'></div> <pre class='out_warning'>{{model.getCellModel().message}}</pre>"
      },
      "Error": {
        template: "<pre class='out_error'>" +
            "<span ng-show='canExpand' class='toggle-error' ng-click='expanded = !expanded'>{{expanded ? '-' : '+'}}</span>" +
            "<span ng-bind-html='shortError'></span></pre>" +
            "<pre ng-show='expanded'><span ng-bind-html='longError'></span>" +
            "</pre>",
        controller: function($scope, $element) {
          $scope.expanded = false;

          $scope.$watch('model.getCellModel()', function(cellModel) {
            var outputs = $element.find('span');
            var errors  = Array.prototype.concat(cellModel);

            $scope.shortError   = $sce.trustAsHtml(errors[0]);
            $scope.canExpand    = errors.length > 1;
            $scope.longError    = $sce.trustAsHtml(errors.slice(1).join("\n"));
          });
        }
      },
      "Html": {
        template: "<div></div>",
        controller: function($scope, bkCellMenuPluginManager) {
          $scope.getShareMenuPlugin = function() {
            return bkCellMenuPluginManager.getPlugin("bko-html");
          };
          $scope.$watch("getShareMenuPlugin()", function() {
            var newItems = bkCellMenuPluginManager.getMenuItems("bko-html", $scope);
            $scope.model.resetShareMenuItems(newItems);
          });
        },
        link: function(scope, element, attrs) {
          var tagstofilter = ['applet', 'base', 'basefont', 'body', 'frame', 'frameset', 'head', 'html',
                              'isindex', 'link', 'meta', 'noframes', 'noscript', 'object', 'param'];

          scope.clean = function() {
            for (var t in tagstofilter) {
              var scripts = div[0].getElementsByTagName(tagstofilter[t]);
              var i = scripts.length;
              while (i--) {
                scripts[i].parentNode.removeChild(scripts[i]);
              }
            }
          }
        
          var div = element.find("div").first();
          var cellModel = scope.model.getCellModel();
          div.html(cellModel);
          scope.clean();
          scope.$watch('model.getCellModel()', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              div.html(newValue);
              scope.clean();
            }
          });
        }
      },
      "OutputContainer": {
        template: '<bk-code-cell-output ng-repeat="i in items" model="i" >' +
            '</ bk-code-cell-output>',
        scope: {
          model: "="
        },
        controller: function($scope) {
          $scope.isShowOutput = function() {
            return $scope.model.isShowOutput();
          };

          $scope.showoutput = $scope.model.isShowOutput();
          $scope.items = _($scope.model.getCellModel().items).map(function(it) {
            return {
              result: it,
              isShowOutput: function() {
                return $scope.showoutput;
              }
            };
          });
          $scope.isShowMenu = function() { return false; };
          $scope.$watch('isShowOutput()', function(oldval, newval) {
            $scope.showoutput = newval;
          });

        }
      }
    };

    var types = ["Text", "Date", "DateTime", "Time", "BeakerStandardOutput", "BeakerStandardError", "Warning", "Error", "Html", "OutputContainer"];
    var refresh = function(what, scope) {
      if (!what) {
        what = "all";
      }
      if (!scope) {
        scope = $rootScope;
      }
      scope.$broadcast("bkOutputDisplayFactory", what);
      scope.$$phase || scope.$apply();
    };
    var setImpl = function(index, type, impl) {
      types[index] = type;
      impls[type] = impl;
      refresh(type);
    };
    var resultType2DisplayTypesMap = {
      // The first in the array will be used as default
      "text": ["Text", "Html", "Latex"],
      "Date": ["DateTime", "Date", "Time", "Text"],
      "TableDisplay": ["Table", "Text"],
      "html": ["Html"],
      "ImageIcon": ["Image", "Text"],
      "BeakerDisplay": ["BeakerDisplay", "Text"],
      "Plot": ["Plot", "Chart", "Text"],
      "TimePlot": ["Plot", "Chart", "Text"],
      "EasyForm": ["EasyForm", "Text"],
      "NanoPlot": ["Plot", "Text"],
      "CombinedPlot": ["CombinedPlot", "Text"],
      "HiddenOutputCell": ["Hidden"],
      "Warning": ["Warning"],
      "BeakerOutputContainerDisplay": ["OutputContainer", "Text"],
      "OutputContainerCell": ["OutputContainer", "Text"],
      "OutputContainer": ["OutputContainer", "Text"]
    };
    var factory = {
      add: function(type, impl) {
        if (types.length > MAX_CAPACITY) {
          throw "Cannot add output: " + type +
              ", max output display capacity(" + MAX_CAPACITY +
              ") reached";
        }
        // add to the end
        setImpl(types.length, type, impl);
      },
      get: function(index) {
        var type = types[index];
        return this.getImpl(type);
      },
      getImpl: function(type) {
        if (type && impls[type]) {
          return impls[type];
        } else {
          return impls["text"];
        }
      },
      getDirectiveName: function(type) {
        var index = types.indexOf(type);
        if (index === -1) {
          index = types.indexOf("Text");
        }
        return "bko" + index;
      },
      addOutputDisplayType: function(type, displays, index) {
        if (index === undefined) {
          index = 0;
        }
        if (!resultType2DisplayTypesMap[type]) {
          resultType2DisplayTypesMap[type] = displays;
        } else {
          Array.prototype.splice.apply(resultType2DisplayTypesMap[type], [index, 0].concat(displays));
        }
      },
      getApplicableDisplays: (function() {
        var isJSON = function(value) {
          var ret = true;
          try {
            JSON.parse(value);
          } catch (err) {
            ret = false;
          }
          return ret;
        };

        var isHTML = function(value) {
          return /^<[a-z][\s\S]*>/i.test(value);
        };
        return function(result) {
          if (!result) {
            return ["Hidden"];
          }
          if (!result.type) {
            var ret = ["Text", "Html", "Latex"];
            if (isJSON(result)) {
              ret.push("Json", "Vega");
            }
            if (isHTML(result)) {
              ret = ["Html", "Text", "Latex"];
            }
            if (_.isArray(result)) {
              if (_.isObject(result[0])) {
                ret.push("Table");
              }
            }
            return ret;
          }
          if (resultType2DisplayTypesMap.hasOwnProperty(result.type)) {
            return resultType2DisplayTypesMap[result.type];
          } else {
            return ["Text"];
          }
        };
      })()
    };
    beaker.outputDisplayFactory = factory;
    for (var key in beaker.toBeAddedToOutputDisplayFactory) {
      beaker.outputDisplayFactory.add(key, beaker.toBeAddedToOutputDisplayFactory[key]);
    }
    beaker.toBeAddedToOutputDisplayFactory = null;

    for (var key in beaker.toBeAddedToOutputDisplayType) {
      var displays = beaker.toBeAddedToOutputDisplayType[key];
      factory.addOutputDisplayType(key, displays);
    }
    beaker.toBeAddedToOutputDisplayType = null;

    return factory;
  });

  _(_.range(MAX_CAPACITY)).each(function(i) {
    module.directive("bko" + i,
        function(bkOutputDisplayFactory, bkOutputDisplayServiceManager, $injector) {
      var impl = bkOutputDisplayFactory.get(i);
      if (_.isFunction(impl)) {
        return impl(bkOutputDisplayServiceManager, $injector);
      } else if (_.isArray(impl)) {
        var args = [];
          for (var j = 0; j < impl.length; ++j) {
            var it = impl[j];
            if (_.isString(it)) {
              if (bkOutputDisplayServiceManager.has(it)) {
                args.push(bkOutputDisplayServiceManager.get(it));
              } else if ($injector.has(it)) {
                args.push($injector.get(it));
              } else {
                throw "beaker could not find provider for bkoFactory " + it;
              }
            } else if (_.isFunction(it)) {
              return it.apply(this, args);
            }
          }
      } else {
        return impl;
      }
    });
  })
})();

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
 * This module is the central control of all output displays. It fulfills actual angular directives
 * lazily when user load output display plugins.
 */
(function() {
  "use strict";

  var module = angular.module('bk.outputDisplay');
  module.factory("bkOutputDisplayServiceManager", function($injector) {
    var services = {};
    var factory = {
      getServices: function() {
        return services;
      },
      addService: function(key, impl) {
        if (typeof impl === "function") {
          services[key] = impl($injector);
        } else if (Object.prototype.toString.call(impl) === '[object Array]') {
          var args = [];
          for (var j = 0; j < impl.length; ++j) {
            var it = impl[j];
            if (typeof it === "string") {
              if (services.hasOwnProperty(it)) {
                args.push(services[it]);
              } else if ($injector.has(it)) {
                args.push($injector.get(it));
              }
              continue;
            }
            if (typeof it === "function") {
              services[key] = it.apply(this, args);
              break;
            }
          }
          ;
        } else {
          services[key] = impl;
        }
      },
      has: function(key) {
        return services.hasOwnProperty(key);
      },
      get: function(key) {
        return services[key];
      }
    };

    for (var key in beaker.toBeAddedToOutputDisplayService) {
      var impl = beaker.toBeAddedToOutputDisplayService[key];
      factory.addService(key, impl);
    }
    beaker.toBeAddedToOutputDisplayService = null;
    beaker.outputDisplayService = factory;
    return factory;
  });

})();

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
 * This is the module for the UI that shows the list of evaluators and their corresponding
 * settings panel.
 */
(function() {
  'use strict';

  var module = angular.module('bk.core');

  module.controller('pluginManagerCtrl', ['$scope', '$rootScope', '$modalInstance', 'bkCoreManager', 'bkSessionManager', 'bkMenuPluginManager', 'bkEvaluatePluginManager',
                                          'bkEvaluatorManager', function($scope, $rootScope, $modalInstance, bkCoreManager,bkSessionManager, bkMenuPluginManager, bkEvaluatePluginManager,
                                              bkEvaluatorManager) {


    $scope.doClose = function() {
      $scope.evalTabOp.showURL = false;
      $scope.evalTabOp.showWarning = false;
      $scope.evalTabOp.showSecurityWarning = false;
      $scope.evalTabOp.forceLoad = false;
      $scope.evalTabOp.newPluginNameOrUrl = "";
      $modalInstance.close("ok");
    };

    $scope.getEvaluatorDetails = function(name) {
      return bkEvaluatorManager.getVisualParams(name);
    };

    $scope.allowFromUrl = function() {
      return (window.beaker === undefined || window.beaker.disablePluginLoadFromUrl === undefined || !window.beaker.disablePluginLoadFromUrl);
    }
    
    $scope.evalTabOp = {
      newPluginNameOrUrl: "",
      showURL: false,
      showWarning: false,
      showSecurityWarning: false,
      forceLoad: false,
      getAllEvaluators: function() {
        return bkEvaluatorManager.getAllEvaluators();
      },
      getEvaluatorsWithSpec: function() {
        var activePlugins = bkEvaluatorManager.getAllEvaluators();
        var result = {};
        for (var p in activePlugins) {
          if (Object.keys(activePlugins[p].spec).length > 0) {
            result[p] = activePlugins[p];
          }
        }
        return result;
      },
      getLoadingEvaluators: function() {
        return bkEvaluatorManager.getLoadingEvaluators();
      },
      getEvaluatorStatuses: function(name) {
        var knownPlugins = bkEvaluatePluginManager.getKnownEvaluatorPlugins();
        var activePlugins = bkEvaluatorManager.getAllEvaluators();
        var loadingPlugins = bkEvaluatorManager.getLoadingEvaluators();
        var result = {};
        for (var p in knownPlugins) {
          var status = false;
          if (activePlugins[p]) {
            status = "active";
          } else {
            for (var l in loadingPlugins) {
              if (loadingPlugins[l].plugin == p) {
                status = "loading";
                break;
              }
            }
            if (!status) {
              status = "known";
            }
          }
          result[p] = status;
        }
        return result;
      },
      setNewPluginNameOrUrl: function(pluginNameOrUrl) {
        this.newPluginNameOrUrl = pluginNameOrUrl;
      },
      togglePlugin: function(name) {
        var plugin = name || this.newPluginNameOrUrl;
        var fromUrl = name ? false : true;
        var status = this.getEvaluatorStatuses()[plugin];

        if (!fromUrl && !_.contains(['active', 'known'], status)) return;
        // for now, if the plugin isn't from a URL or active or known
        // (namely loading) return.
        // TODO: other states we should support: failed and exiting.

        if (status === 'active') {
          // turn off evaluator if on
          if (!bkSessionManager.evaluatorUnused(plugin)) {
            return $scope.evalTabOp.showWarning = true;
          }

          bkSessionManager.removeEvaluator(plugin);
          bkCoreManager.getBkApp().removeEvaluator(plugin);
        } else {
          // otherwise, turn on evaluator
          if (fromUrl) {
            var r = new RegExp('^(?:[a-z]+:)?//', 'i');
            if (r.test(plugin) && !$scope.evalTabOp.forceLoad) {
              return $scope.evalTabOp.showSecurityWarning = true;
            }

            $scope.evalTabOp.forceLoad = false;
            $scope.evalTabOp.newPluginNameOrUrl = "";
          }

          var newEval = { name: '', plugin: plugin };
          bkSessionManager.addEvaluator(newEval);
          bkCoreManager.getBkApp().addEvaluator(newEval);
          $rootScope.$broadcast('languageAdded', { evaluator: plugin });
        }
      }
    };

    $scope.menuTabOp = {
      newMenuPluginUrl: "./plugin/menu/debug.js",
      addMenuPlugin: function () {
        bkMenuPluginManager.loadMenuPlugin(this.newMenuPluginUrl);
      },
      getMenuPlugins: function () {
        return bkMenuPluginManager.getMenuPlugins();
      },
      getLoadingPlugins: function() {
        return bkMenuPluginManager.getLoadingPlugins();
      }
    };

  }]);
})();

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
 * This is the module for the UI that shows the list of evaluators and their corresponding
 * settings panel.
 */

(function() {
  'use strict';

  var module = angular.module('bk.core');

  module.directive('bkPluginManagerEvaluatorSettings', function(
      $compile, bkSessionManager) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/pluginmanager/pluginmanager_evaluator_settings"](),
      controller: function($scope) {
        $scope.set = function(val) {
          $scope.evaluator.perform(val);
          bkSessionManager.setNotebookModelEdited(true);
        };
      },
      link: function(scope, element, attrs) {
        var spec = _.map(scope.evaluator.spec, function(value, key) {
          return _.extend({ name: key, key: key }, value);
        });

        scope.properties = _.filter(spec, function(option) {
          return option.type === "settableString";
        });

        scope.actions = _.filter(spec, function(option) {
          return option.type === "action";
        });
      }
    };
  });

})();

/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

  var module = angular.module('bk.core');

  module.controller('publicationCtrl',
    ['$scope', 'bkUtils', 'bkPublicationApi', 'bkPublicationAuth', 'bkSessionManager', '$modalInstance',
    function($scope, bkUtils, bkPublicationApi, bkPublicationAuth, bkSessionManager, $modalInstance) {

      var notebook = bkSessionManager.getRawNotebookModel();

      $scope.user = {role: 'beaker'};
      $scope.model = {};

      $scope.signIn = function() {
        return bkPublicationAuth.signIn($scope.user)
        .then(function() {
          initPublication();
        })
        .catch(function(err) {
          $scope.error = 'Error: Invalid email or password';
        });
      };

      $scope.isSignedIn = function() {
        return bkPublicationAuth.isSignedIn();
      };

      function initPublication() {
        $scope.edited = bkSessionManager.isNotebookModelEdited();

        bkPublicationApi.getCategories()
        .then(function(resp) {
          $scope.categories = resp.data;
        });

        $scope.published = false;
        $scope.title = 'Publish Notebook';
        $scope.saveButton = 'Publish';

        if (wasPublished()) {
          bkPublicationApi.getPublication(notebook.metadata['publication-id'])
          .then(function(resp) {
            $scope.model = resp.data;
            $scope.model['category-id'] = resp.data.category['public-id'];
            $scope.published = true;
            $scope.title = 'Update Notebook';
            $scope.saveButton = 'Update';
          });
        }

        if (bkSessionManager.isNotebookModelEdited()) {
          $scope.saveButton = 'Save and ' + $scope.saveButton;
        }
      }

      function wasPublished() {
        return notebook.metadata && notebook.metadata['publication-id'];
      }

      function createPublication() {
        $scope.model.contents = bkSessionManager.getSaveData().notebookModelAsString;
        return bkPublicationApi.createPublication($scope.model)
        .then(function(resp) {
          // save publication id as notebook metadata
          bkSessionManager.getRawNotebookModel().metadata = {'publication-id': resp.data['public-id']};
          return bkHelper.saveNotebook();
        });
      }

      function updatePublication() {
        $scope.model.contents = bkSessionManager.getSaveData().notebookModelAsString;
        return bkPublicationApi.updatePublication(notebook.metadata['publication-id'], $scope.model);
      }

      $scope.publishAction = function() {
        $scope.saving = true;
        var action = $scope.published ? updatePublication : createPublication;
        return bkHelper.saveNotebook()
        .then(action)
        .then(function() {
          $scope.saving = false;
          $scope.close();
        });
      };

      $scope.delete = function() {
        $scope.saving = true;
        return bkPublicationApi.deletePublication(notebook.metadata['publication-id'])
        .then(function() {
          delete bkSessionManager.getRawNotebookModel().metadata['publication-id'];
          delete $scope.model;
          $scope.saving = false;
          $scope.close();
        });
      }

      if ($scope.isSignedIn()) {
        initPublication();
      }

      $scope.close = function() {
        $modalInstance.close('ok');
      };
  }]);
})();

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
 * bkCell
 * - the controller that responsible for directly changing the view
 * - the container for specific typed cell
 * - the directive is designed to be capable of used in a nested way
 * - conceptually, a cell is 'cell model' + 'view model'(an example of what goes in to the view
 * model is code cell bg color)
 * - A bkCell is generically corresponds to a portion of the notebook model (currently, it is
 * always a branch in the hierarchy)
 * - When exporting (a.k.a. sharing), we will need both the cell model and the view model
 */

(function() {
  'use strict';
  var module = angular.module('bk.core');

  module.controller('CodeCellOptionsController', ['$scope', '$modalInstance', 'dscope', 'bkCoreManager', function($scope, $modalInstance, dscope, bkCoreManager) {
    $scope.dscope = dscope;
    $scope.initializationCell = dscope.initialization;
    $scope.cellName = dscope.id;
    $scope.cellTags = dscope.tags;
    $scope.isInitCell = function() {
      return this.initializationCell;
    };
    $scope.toggleInitCell = function() {
      this.initializationCell = !this.initializationCell;
    };
    $scope.saveDisabled = function() {
      return !(( this.getNameError() === '' ) && ( this.getTagError() === '' ));
    };
    $scope.isError = function() {
      return !!$scope.getNameError() || !!$scope.getTagError();
    };
    $scope.getNameError = function() {
      if(this.dscope.id === this.cellName)
        return '';
      return bkCoreManager.getNotebookCellManager().canRenameCell(this.cellName);
    };
    $scope.getTagError = function() {
      return bkCoreManager.getNotebookCellManager().canSetUserTags(this.cellTags);
    };
    $scope.close = function() {
      $modalInstance.close('close');
    };
    $scope.save = function() {
      if (this.saveDisabled())
        return;
      var reb = false;
      this.dscope.initialization = this.initializationCell;
      if (this.dscope.tags !== this.cellTags) {
        this.dscope.tags = this.cellTags;
        reb = true;
      }
      if (this.dscope.id !== this.cellName)
        bkCoreManager.getNotebookCellManager().renameCell(this.dscope.id,this.cellName);
      else if(reb)
        bkCoreManager.getNotebookCellManager().rebuildMaps()
      $modalInstance.close('save');
    };
}]);

})();

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
 * Module bk.commonUtils
 * - this should be the most general utilities, the utilities that could have been found in a
 * 3rd-party library
 * and we just happen to write our own.
 */
(function() {
  'use strict';
  var module = angular.module('bk.commonUtils', []);
  module.factory('commonUtils', function() {
    return {
      generateId: function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        if (_.isUndefined(length)) {
          length = 6;
        }
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      },
      loadJS: function(url, success, failure) {
        var e = document.createElement('script');
        e.type = "text/javascript";
        // Add the time to the URL to avoid caching.
        var millis = new Date().getTime();
        e.src = url + "?_=" + millis;
        if (success) {
          e.onload = success;
        }
        if (failure) {
          e.onerror = failure;
        }
        document.head.appendChild(e);
      },
      loadCSS: function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
      },
      getEventOffsetX: function(elem, event) { // offsetX is not defined in firefox
        var x = event.offsetX;
        if (_.isUndefined(x) && !_.isUndefined(elem.offset)) {
          x = event.pageX - elem.offset().left;
        }
        return x;
      },
      loadList: function(urls, success, failure) {
        if (urls.length === 0) {
          if (success)
            return success();
          return;
        }
        var url = urls.shift();
        var me = this;
        this.loadJS(url, function() {
          me.loadList(urls, success, failure);
        }, failure);
      },
      findTable: function(elem) {
        function findColumnNames(elem) {
          var row = elem.children[0];
          var result = [];
          for (var i = 0; i < row.children.length; i++)
            result.push(row.children[i].innerHTML);
          return result;
        }

        function findEntries(elem) {
          var result = [];
          for (var i = 0; i < elem.children.length; i++)
            result.push(elem.children[i].innerHTML);
          return result;
        }

        function findValues(elem) {
          var result = [];
          for (var i = 0; i < elem.children.length; i++)
            result.push(findEntries(elem.children[i]));
          return result;
        }

        var tag = elem.tagName;
        if (tag === 'DIV') {
          for (var i = 0; i < elem.children.length; i++) {
            var sub = this.findTable(elem.children[i]);
            if (sub) return sub;
          }
          return null;
        }
        if (tag === 'TABLE') {
          if (elem.children.length < 2) {
            return null;
          }

          // To prevent from mangling user created html table,
          // only use table display for dataframe tables (BEAKER-456)
          if (!_.contains(elem.classList, 'dataframe')) {
            return null;
          }

          // check if this table contains elements with colspan and/or rowspan
          // the slockgrid template does not support them  (BEAKER-694)
          var headerRows = $(elem).find('thead').find('tr');
          for (var i = 0; i < headerRows.length; i++) {
            var ch = headerRows[i].children;
            for (var j=0; j<ch.length; j++) {
              if (ch[j].getAttribute('colspan')>1 || ch[j].getAttribute('rowspan')>1) {
                return null;
              }
            }
          }
          var valueRows = $(elem).find('tbody').find('tr');
          for (var i = 0; i < valueRows.length; i++) {
            var ch = valueRows[i].children;
            for (var j=0; j<ch.length; j++) {
              if (ch[j].getAttribute('colspan')>1 || ch[j].getAttribute('rowspan')>1) {
                return null;
              }
            }
          }

          // check if this is a table with multiple rows
          // currently the table displays can't handle multiple rows of header (BEAKER-416)
          // added logic to collapse the two header rows  (BEAKER-694)
          var cols = [];
          if (headerRows.length === 2) {
            //if there are two rows, allow tabledisplay as long as no column has values in both rows
            //this is because pandas renders dataframes with the index col header on a second row
            var row0 = headerRows.eq(0).find('th');
            var row1 = headerRows.eq(1).find('th');
	    var min = row0.length;
            if (min>row1.length) {
		min = row1.length;
            }
            for (var i = 0; i < min; i++) {
              var r0 = row0.eq(i);
              var r1 = row1.eq(i);

              //if any column has html in both rows, don't use tabledisplay
              if (r0 !== undefined && r1 != undefined && r0.html() && r1.html()) {
                return null;
              } else if (r0 !== undefined && r0.html()) {
	        cols.push(r0.html());
	      } else if (r1 !== undefined && r1.html()) {
                cols.push(r1.html());
              } else {
		cols.push("");
	      }
            }
          } else if (headerRows.length > 1) {
            //if there are two or more header, forget about it
            return null;
          } else {
            cols = findColumnNames($(elem).find('thead')[0]);
	  }

          var vals = findValues($(elem).find('tbody')[0]);
          return {
            type: "TableDisplay",
            tableDisplayModel: {
              columnNames: cols,
              values: vals
            },
            columnNames: cols,
            values: vals
          };
        }
        return null;
      },
      formatTimeString: function(millis) {
        if (millis < 60 * 1000) {
          return (millis / 1000).toFixed(1) + "s";
        } else {
          var date = new Date(millis);
          var d = Math.floor(millis / (24 * 60 * 60 * 1000));
          var h = date.getUTCHours();
          var m = date.getUTCMinutes();
          var s = date.getUTCSeconds();
          var result = "";
          if (d > 0) {
            result += (d + "d");
          }
          if (h > 0) {
            result += (h + "h");
          }
          if (m > 0) {
            result += (m + "m");
          }
          if (s > 0) {
            result += (s + "s");
          }
          return result;
        }
      },
      isMiddleClick: function(event) {
        return event.button === 1 // middle click
            || (event.button === 0 // left click
            && (navigator.appVersion.indexOf("Mac") !== -1 ? event.metaKey : event.ctrlKey));
      },
      saveAsClientFile: function (data, filename) {
        if (!data) {
          console.error('commonUtils.saveAsClientFile: No data');
          return;
        }

        if (!filename) {
          filename = 'console.json';
        }

        if (typeof data === "object") {
          data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0,
            false, false, false, false, 0, null)
        a.dispatchEvent(e)
      }
    };
  });
})();

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
 * Module bk.commonUi
 * This module is the general store of low level UI directives, which should be separated out or
 * potentially found equivalent in 3rd party libraries.
 */

(function() {
  'use strict';
  var module = angular.module('bk.commonUi', []);
  module.directive('onCtrlEnter', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('keyup', function(event) {
          if (event.ctrlKey && event.keyCode === 13) { // ctrl + enter
            scope.$apply(attrs.onCtrlEnter);
          }
        });
      }
    };
  });
  module.directive('eatClick', function() {
    return function(scope, element, attrs) {
      element.click(function(event) {
        event.preventDefault();
      });
    };
  });
  module.directive('focusStart', function() {
    return {
      link: function(scope, element, attrs) {
        Q.fcall(function() {
          element.focus();
        });
      }
    };
  });
  module.filter('isHidden', function() {
    return function(input) {
      return _(input).filter(function(it) {
        return !it.hidden;
      });
    };
  });
  module.directive('dropdownPromoted', function() {
    // Is your dropdown being covered by its ancestors siblings?
    // Promote that shiz, and prepend it to the notebook so it doesn't
    // ever get bullied again.
    return {
      restrict: 'C',
      link: function(scope, element, attrs) {
        $(window).on('click.' + scope.$id, hideDropdown);
        $(document).on('hide.bs.dropdown', hideDropdown);

        var dropdown = element.find('.dropdown-menu').first();
        var toggle = element.find('.dropdown-toggle').first();

        element.on('click', '.dropdown-toggle', toggleDropdown);

        function toggleDropdown() {
          if ($(dropdown).is(':visible')) {
            return hideDropdown();
          }

          showDropdown();
        }

        var showDropdown = function() {
          window.requestAnimationFrame(function() {
            var notebook = bkHelper.getNotebookElement(scope);
            var togglePosition = toggle.offset();
            var notebookPosition = notebook.offset();

            dropdown.prependTo(notebook);

            dropdown.show().css({
              top: togglePosition.top - notebookPosition.top + 'px',
              left: togglePosition.left - notebookPosition.left - dropdown.outerWidth() + 'px',
            });
          });
        };

        function hideDropdown() { dropdown.hide();}

        scope.$on('$destroy', function() {
          $(document).off('hide.bs.dropdown', hideDropdown);
          $(window).off('.' + scope.$id);
          // Since the dropdown is external to the directive we need
          // to make sure to clean it up when the directive goes away
          dropdown.remove();
          element.off('click');
        });
      }
    };
  });
  module.directive('bkDropdownMenu', function() {
    return {
      restrict: 'E',
      template: JST['template/dropdown'](),
      scope: {
        'menuItems': '=',

        // Classes to be added to any submenu item. Used for adding
        // pull-left to menus that are on the far right (e.g. bkcellmenu).
        submenuClasses: '@'
      },
      replace: true,
      controller: function($scope) {
        $scope.getMenuItems = function() {
          return _.result($scope, 'menuItems');
        };
      }
    };
  });
  module.directive('bkDropdownMenuItem', function($compile) {
    return {
      restrict: 'E',
      template: JST['template/dropdown_item'](),
      scope: {
        'item': '='
      },
      replace: true,
      controller: function($scope) {
        var isItemDisabled = function(item) {
          if (_.isFunction(item.disabled)) {
            return item.disabled();
          }
          return item.disabled;
        };

        $scope.getAClass = function(item) {
          var result = [];
          if (isItemDisabled(item)) {
            result.push('disabled-link');
          } else if (item.items && item.items.length <= 1 && item.autoReduce) {
            if (item.items.length === 0) {
              result.push('disabled-link');
            } else if (item.items.length === 1) {
              if (isItemDisabled(item.items[0])) {
                result.push('disabled-link');
              }
            }
          }
          result.push(item.id);
          return result.join(' ');
        };

        $scope.getItemClass = function(item) {
          var result = [];
          if (item.type === 'divider') {
            result.push('divider');
          } else if (item.type === 'submenu' || item.items) {
            if (item.items && item.items.length <= 1 && item.autoReduce) {

            } else {
              result.push('dropdown-submenu');
              // Add any extra submenu classes. (e.g. to specify if it should be left or right).
              if ($scope.submenuClasses) {
                _.each(
                    $scope.submenuClasses.split(' '),
                    function(elt) {
                      result.push(elt);
                    }
                );
              }
            }
          }
          return result.join(' ');
        };

        $scope.runAction = function(item) {
          if (item.items && item.items.length === 1 && item.autoReduce) {
            item.items[0].action();
          } else {
            if (_.isFunction(item.action)) {
              item.action();
            }
          }
        };

        $scope.getName = function(item) {
          var name = '';
          if (item.items && item.items.length === 1 && item.autoReduce) {
            if (item.items[0].reducedName) {
              name = item.items[0].reducedName;
            } else {
              name = item.items[0].name;
            }
          } else {
            name = item.name;
          }
          if (_.isFunction(name)) {
            name = name();
          }
          return name;
        };

        $scope.isMenuItemChecked = function(item) {
          if (item.isChecked) {
            if (_.isFunction(item.isChecked)) {
              return item.isChecked();
            } else {
              return item.isChecked;
            }
          }
          return false;
        };
      },
      link: function(scope, element) {
        scope.getSubItems = function() {
          if (_.isFunction(scope.item.items)) {
            return scope.item.items();
          }
          return scope.item.items;
        };

        scope.$watchCollection('getSubItems()', function(items, oldItems) {
          if (!_.isEmpty(items)) {
            //jscs:disable
            $compile('<bk-dropdown-menu menu-items="getSubItems()"></bk-dropdown-menu>')(scope, function(cloned, scope) {
            //jscs:enable
              element.find('ul.dropdown-menu').remove();
              element.append(cloned);
            });
          }
        });
      }
    };
  });

  module.directive('bkEnter', function() {
    return function(scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.bkEnter);
          });
          event.preventDefault();
        }
      });
    };
  });

  module.directive('bkLanguageLogo', function() {
    return {
      restrict: 'E',
      template: '<span ng-style="style">{{name}}</span>',
      scope: {
        name: '@',
        bgColor: '@',
        fgColor: '@',
        borderColor: '@'
      },
      link: function(scope, element, attrs) {
        scope.style = {
          'background-color': scope.bgColor,
          'color': scope.fgColor
        };
        var updateStyle = function() {
          scope.style = {
            'background-color': scope.bgColor,
            'color': scope.fgColor
          };
          if (scope.borderColor) {
            scope.style['border-width'] = '1px';
            scope.style['border-color'] = scope.borderColor;
            scope.style['border-style'] = 'solid';
          } else {
            delete scope.style['border-width'];
            delete scope.style['border-color'];
            delete scope.style['border-style'];
          }
        };
        scope.$watch('bgColor', updateStyle);
        scope.$watch('fgColor', updateStyle);
        scope.$watch('borderColor', updateStyle);
      }
    };
  });
})();

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
 * Module bk.angularUtils
 * This module provides AngularJS specific utilities that are shared across the whole application.
 */
(function() {
  'use strict';
  var module = angular.module('bk.angularUtils', []);
  module.factory('angularUtils', function($rootScope, $location, $http, $q, $timeout) {
    return {
      setLocation: function(newLocation) {
        $location.path(newLocation);
      },
      refreshRootScope: function() {
        $rootScope.$$phase || $rootScope.$apply();
      },
      toPrettyJson: function(angularBoundJsObj) {
        if(angularBoundJsObj.cells !== undefined) {
          for (var i=0; i < angularBoundJsObj.cells.length; i++) {
            if (angularBoundJsObj.cells[i].body !== undefined && typeof angularBoundJsObj.cells[i].body === "string") {
              angularBoundJsObj.cells[i].body = angularBoundJsObj.cells[i].body.split("\n");
            }
            if (angularBoundJsObj.cells[i].input !== undefined && angularBoundJsObj.cells[i].input.body !== undefined && typeof angularBoundJsObj.cells[i].input.body === "string") {
              angularBoundJsObj.cells[i].input.body = angularBoundJsObj.cells[i].input.body.split("\n");
            }
          }
        }
        function cleanup(key, value) {
          if (key === '$$hashKey') return undefined;
          return value;
        };
        var ret = JSON.stringify(angularBoundJsObj, cleanup, 4) + "\n";
        this.removeStringArrays(angularBoundJsObj);
        return ret;
      },
      removeStringArrays: function(obj) {
        if(obj.cells !== undefined) {
          for (var i=0; i < obj.cells.length; i++) {
            if (obj.cells[i].body !== undefined && $.isArray(obj.cells[i].body)) {
              var separator = '\n';
              obj.cells[i].body = obj.cells[i].body.join([separator]);
            }
            if (obj.cells[i].input !== undefined && obj.cells[i].input.body !== undefined && $.isArray(obj.cells[i].input.body)) {
              var separator = '\n';
              obj.cells[i].input.body = obj.cells[i].input.body.join([separator]);
            }
          }
        }
      },
      fromPrettyJson: function(jsonString) {
          var ret = angular.fromJson(jsonString);
          this.removeStringArrays(ret);
          return ret;
      },
      httpGet: function(url, data, headers) {
        return $http({method: "GET", url: url, params: data, headers: headers});
      },
      httpGetJson: function(url, data, headers) {
        return $http({
          method: "GET",
          url: url,
          params: data,
          withCredentials: true,
          headers: _.extend({'Content-Type': 'application/json'}, headers)
        });
      },
      httpDeleteJson: function(url, data, headers) {
        return $http({
          method: "DELETE",
          url: url,
          params: data,
          withCredentials: true,
          headers: _.extend({'Content-Type': 'application/json'}, headers)
        });
      },
      httpPost: function(url, data, headers) {
        return $http({
          method: "POST",
          url: url,
          data: $.param(data),
          headers: _.extend({'Content-Type': 'application/x-www-form-urlencoded'})
        });
      },
      httpPostJson: function(url, data, headers) {
        return $http({
          method: "POST",
          url: url,
          data: data,
          withCredentials: true,
          headers: _.extend({'Content-Type': 'application/json'}, headers)
        });
      },
      httpPutJson: function(url, data, headers) {
        return $http({
          method: "PUT",
          url: url,
          data: data,
          withCredentials: true,
          headers: _.extend({'Content-Type': 'application/json'}, headers)
        });
      },
      newDeferred: function() {
        return $q.defer();
      },
      newPromise: function(value) {
        return $q.when(value);
      },
      all: function() {
        return $q.all.apply($q, arguments);
      },
      fcall: function (func) {
        var deferred = $q.defer();
        $timeout(function () {
          try {
            deferred.resolve(func());
          } catch (err) {
            deferred.reject(err);
          }
        }, 0);
        return deferred.promise;
      },
      timeout: function (func, ms) {
        return $timeout(func, ms);
      },
      cancelTimeout: function(promise) {
        $timeout.cancel(promise);
      },
      delay: function(ms) {
        var deferred = $q.defer();
        $timeout(function() {
          deferred.resolve();
        }, ms);
        return deferred.promise;
      }
    };
  });
})();

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
 * This is a reusable UI component for tree views.
 */
(function() {
  'use strict';
  var treeView = angular.module('bk.treeView', ['ngAnimate']);

  treeView.factory('fileService', function() {
    var _provider = {};
    return {
      setProvider: function(providers) {
        _provider = providers;
      },
      getChildren: function(uri, callback) {
        _provider.getChildren(uri, callback);
      },
      fillInput: function(uri) {
        _provider.fillInput(uri);
      },
      open: function(uri) {
        _provider.open(uri);
      }
    };
  });

  treeView.directive('treeView', function($templateCache, $rootScope) {
    return {
      restrict: 'E',
      template: '<tree-node data="root" fs="fs" displayname="{{ rooturi }}"></tree-node>',
      scope: {rooturi: '@', fs: '='},
      controller: function($scope) {
        if (!$templateCache.get('treeNodeChildren.html')) {
          //jscs:disable
          $templateCache.put('treeNodeChildren.html', '<tree-node class="bk-treeview" ng-repeat="d in data.children | fileFilter:fs.filter | orderBy:fs.getOrderBy():fs.getOrderReverse()" data="d" fs="fs"></tree-node>');
          //jscs:enable
        }

        if (!_.string.endsWith($scope.rooturi, '/')) {
          $scope.rooturi = $scope.rooturi + '/';
        }

        $rootScope.fsPrefs = $rootScope.fsPrefs || {
          openFolders: []
        };

        $scope.root = {
          type: 'directory',
          uri: $scope.rooturi,
          children: []
        };

        if (_.contains($rootScope.fsPrefs.openFolders, $scope.rooturi)) {
          $scope.fs.getChildren($scope.rooturi, $rootScope.fsPrefs.openFolders).then(function(response) {
            $scope.$evalAsync(function() {
              $scope.root.children = response.data;
            });
          });
        }
      }
    };
  });

  treeView.filter('fileFilter', function() {
    return function(children, filter) {
      return _.isFunction(filter) ? _(children).filter(filter) : children;
    };
  });

  treeView.directive('treeNode', function() {
    return {
      restrict: 'E',
      //jscs:disable
      template: '<span ng-dblclick="dblClick()" ng-click="click()"><i class="{{ getIcon() }}"></i> <span>{{ getDisplayName() }}</span></span>' +
          '<div class="pushright">' +
          '<div ng-include="\'treeNodeChildren.html\'"></div>' +
          '</div>',
      //jscs:enable
      scope: {data: '=', fs: '=', displayname: '@'},
      controller: function($scope, $rootScope) {
        var transform = function(c) {
          return {
            type: c.type,
            uri: c.uri,
            modified: c.modified,
            displayName: c.displayName,
            children: _.map(c.children, transform)
          };
        };
        $scope.click = function() {
          if ($scope.data.type === 'directory') {
            var uri = $scope.data.uri;
            if (!_.string.endsWith(uri, '/')) {
              uri = uri + '/';
            }
            $scope.fs.fillInput(uri);
            // toggle
            if (!_.isEmpty($scope.data.children)) {
              $scope.data.children.splice(0, $scope.data.children.length);
              $rootScope.fsPrefs.openFolders = _.reject($rootScope.fsPrefs.openFolders, function(folder) {
                return _.string.startsWith(folder, uri);
              });
            } else {
              $rootScope.fsPrefs.openFolders.push(uri);
              $scope.fs.getChildren($scope.data.uri).success(function(children) {
                children = _.sortBy(children, function(c) {
                  if (c.type === 'directory') {
                    return '!!!!!' + c.uri.toLowerCase();
                  } else {
                    return c.uri.toLowerCase();
                  }
                });
                $scope.data.children = _.map(children, transform);
              });
            }
          } else {
            $scope.fs.fillInput($scope.data.uri);
          }
        };
        $scope.dblClick = function() {
          if ($scope.data.type === 'directory') {
            return;
          }

          $scope.fs.open($scope.data.uri);
        };
        $scope.getIcon = function() {
          if ($scope.data.type === 'directory') {
            return 'folder-icon';
          }
          if ($scope.data.type === 'application/prs.twosigma.beaker.notebook+json') {
            return 'glyphicon glyphicon-book';
          } else if ($scope.fs.getIcon && $scope.fs.getIcon($scope.data.type)) {
            return $scope.fs.getIcon($scope.data.type);
          } else {
            return 'glyphicon glyphicon-th';
          }
        };

        $scope.getDisplayName = function() {
          if ($scope.displayname) {
            return $scope.displayname;
          }
          if ($scope.data.displayName) {
            return $scope.data.displayName;
          }
          var name = $scope.data.uri;
          if (name.length > 0 && name[name.length - 1] === '/') {
            name = name.substring(0, name.length - 1);
          }
          return name.replace(/^.*[\\\/]/, '');
        };
      }
    };
  });
})();

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
 * Module bk.cometdUtils
 * This module offers the cometd service that is used to receive 'pushes' from the server.
 */
(function() {
  'use strict';
  var module = angular.module('bk.cometdUtils', []);
  module.factory('cometdUtils', function () {
    var _statusListener;
    var _outputListener;
    return {
      initializeCometd: function(uri) {
        $.cometd.init({
          url: uri
        });
      },
      addConnectedStatusListener: function (cb) {
        this.removeConnectedStatusListener();
        _statusListener = $.cometd.addListener("/meta/connect", cb);
      },
      removeConnectedStatusListener: function () {
        if (_statusListener) {
          $.cometd.removeListener(_statusListener);
          _statusListener = undefined;
        }
      },
      addOutputlogUpdateListener: function (cb) {
        this.removeOutputlogUpdateListener();
        _outputListener = $.cometd.subscribe("/outputlog", cb);
      },
      removeOutputlogUpdateListener: function () {
        if (_outputListener) {
          $.cometd.removeListener(_outputListener);
          _outputListener = undefined;
        }
      },
      disconnect: function() {
        this.removeConnectedStatusListener();
        this.removeOutputlogUpdateListener();
        return $.cometd.disconnect();
      }
    };
  });
})();

/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
 * Module bk.publication
 * Publication API wrapper
 */
(function() {
  'use strict';
  var module = angular.module('bk.publication', ['bk.utils']);

  module.factory('bkPublicationApi', function (bkUtils, $localStorage) {
    var baseUrl = 'https://pub.beakernotebook.com';

    function headers() {
      if ($localStorage.token) {
        return {'X-Authorization': 'Token ' + $localStorage.token};
      }
    }

    return {
      createSession: function(params) {
        return bkUtils.httpPostJson(baseUrl + '/user/v1/sessions', params)
      },
      getCurrentUser: function() {
        return bkUtils.httpGetJson(baseUrl + '/user/v1/current_user', {}, headers())
      },
      createPublication: function(params) {
        return bkUtils.httpPostJson(baseUrl + '/notebook/v1/publications', params, headers());
      },
      updatePublication: function(id, params) {
        return bkUtils.httpPutJson(baseUrl + '/notebook/v1/publications/' + id, params, headers());
      },
      getPublication: function(id) {
        return bkUtils.httpGetJson(baseUrl + '/notebook/v1/publications/' + id, {}, headers());
      },
      deletePublication: function(id) {
        return bkUtils.httpDeleteJson(baseUrl + '/notebook/v1/publications/' + id, {}, headers());
      },
      getCategories: function() {
        return bkUtils.httpGetJson(baseUrl + '/notebook/v1/categories', {}, headers());
      }
    };
  });

  module.factory('bkPublicationAuth', function (bkPublicationApi, $localStorage) {
    var currentUser;

    return {
      signIn: function(user) {
        var self = this;
        return bkPublicationApi.createSession(user)
        .then(function(response) {
          if (response.data && response.data.token) {
            $localStorage.token = response.data.token
          }
          return self.initSession();
        });
      },
      initSession: function() {
        return bkPublicationApi.getCurrentUser()
        .then(function(resp) {
          return currentUser = resp.data;
        });
      },
      isSignedIn: function() {
        return !!currentUser;
      }
    };
  });
})();

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
 * Module bk.notebookVersionManager
 * Offers utilities to convert beaker notebook of old versions to the latest version
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebookVersionManager', []);

  var bkNbV1Converter = (function() {
    // in v1, cell level by definition is the count of steps away from "root" in the tree
    var getSectionCellLevel = function(cell, tagMap) {
      var getParentId = function(cId) {
        var pId = null;
        _(tagMap).find(function(v, k) {
          if (_(v).contains(cId)) {
            pId = k;
            return true;
          }
        });
        return pId;
      };
      var level = 0;
      var parentId = getParentId(cell.id);
      while (parentId) {
        ++level;
        parentId = getParentId(parentId);
      }
      return level;
    };
    var convertCodeCell = function(cell) {
      return {
        "id": cell.id,
        "type": "code",
        "evaluator": cell.evaluator,
        "input": cell.input,
        "output": cell.output
      };
    };
    var convertSectionCell = function(cell, tagMap) {
      return {
        "id": cell.id,
        "type": "section",
        "level": getSectionCellLevel(cell, tagMap),
        "title": cell.title,
        "collapsed": cell.collapsed
      };
    };
    var convertTextCell = function(cell) {
      return {
        "id": cell.id,
        "type": "text",
        "body": cell.body
      };
    };
    var convertMarkdownCell = function(cell) {
      return {
        "id": cell.id,
        "type": "markdown",
        "body": cell.body,
        "mode": cell.mode
      };
    };
    var convertCell = function(cell, tagMap, tagMap2) {
      var retCell;
      switch (cell.class[0]) {
        case "code":
          retCell = convertCodeCell(cell);
          break;
        case "section":
          retCell = convertSectionCell(cell, tagMap);
          break;
        case "text":
          retCell = convertTextCell(cell);
          break;
        case "markdown":
          retCell = convertMarkdownCell(cell);
          break;
      }
      if (tagMap2 && _(tagMap2.initialization).contains(cell.id)) {
        retCell.initialization = true;
      }
      return retCell;
    };
    var getCellIds = function(cells, tagMap) {
      var cellIds = [];
      var cId, children;
      var stack = ["root"];
      while (!_.isEmpty(stack)) {
        cId = stack.pop();
        cellIds.push(cId);
        if (tagMap.hasOwnProperty(cId)) {
          children = _(tagMap[cId]).clone();
          if (!_(children).isEmpty()) {
            stack = stack.concat(children.reverse());
          }
        }
      }
      return cellIds;
    };
    var generateCellMap = function(cells) {
      var cellMap = {};
      cells.forEach(function(cell) {
        cellMap[cell.id] = cell;
      });
      return cellMap;
    };
    var convertCells = function(cells, tagMap, tagMap2) {
      var cellIds = getCellIds(cells, tagMap);
      var cellMap = generateCellMap(cells);
      var v2Cells = _(cellIds).chain()
          .filter(function(id) {
            return id !== "root";
          })
          .map(function(id) {
            return cellMap[id];
          })
          .filter(function(cell) {
            return !cell.hideTitle;
          })
          .map(function(cell) {
            return convertCell(cell, tagMap, tagMap2);
          })
          .value();
      return v2Cells;
    };

    return {
      convert: function(notebookV1) {
        var notebookV2 = {
          beaker: "2",
          evaluators: notebookV1.evaluators,
          cells: convertCells(notebookV1.cells, notebookV1.tagMap, notebookV1.tagMap2),
          locked: notebookV1.locked
        };
        return notebookV2;
      }
    };
  })();

  module.factory('bkNotebookVersionManager', function() {
    return {
      open: function(notebook) {
        if (_.isEmpty(notebook)) {
          return {
            "beaker": "2",
            "evaluators": [],
            "cells": []
          };
        }
        // if notebook is a string, parse it to js object
        if (angular.isString(notebook)) {
          try {
            notebook = angular.fromJson(notebook);
            // TODO, to be removed. Load a corrupted notebook.
            if (angular.isString(notebook)) {
              notebook = angular.fromJson(notebook);
            }
          } catch (e) {
            console.error(e);
            console.error("This is not a valid Beaker notebook JSON");
            console.error(notebook);
            window.alert("Not a valid Beaker notebook");
            return;
          }
        }

        // if beaker version is undefined
        // treat it as beaker notebook v1
        if (_.isUndefined(notebook.beaker)) {
          notebook.beaker = "1";
        }
        //check version and see if need conversion
        if (notebook.beaker === "1") {
          notebook = bkNbV1Converter.convert(notebook);
        } else if (notebook.beaker === "2") {
          // good, "2" is the current version
        } else {
          throw "Unknown Beaker notebook version";
        }

        return notebook;
      }
    };
  });
})();

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
 * Module bk.outputLog
 * This module owns the service of get output log from the server.
 */
(function() {
  'use strict';
  var module = angular.module('bk.outputLog', ['bk.utils', 'bk.cometdUtils']);
  module.factory('bkOutputLog', function (bkUtils, cometdUtils) {
    return {
      getLog: function (cb) {
        bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/outputlog/get"), {})
            .success(cb)
            .error(function () {
              console.log("failed to get output log");
            });
      },
      subscribe: function (cb) {
        return cometdUtils.addOutputlogUpdateListener(cb);
      },
      unsubscribe: function() {
        cometdUtils.removeOutputlogUpdateListener();
      }
    };
  });
})();

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
 *  Module bk.recentMenu
 *  This module owns the service of retrieving recent menu items and updating the recent menu.
 */
(function() {
  'use strict';
  var module = angular.module('bk.recentMenu', ['bk.angularUtils']);

  module.provider("bkRecentMenu", function() {
    var _server = null;
    this.configServer = function(server) {
      _server = server;
    };
    this.$get = function(angularUtils) {
      var opItems = {
        EMPTY: {name: "(Empty)", disabled: true},
        DIVIDER: {type: "divider"},
        CLEARING: {name: "(Clearing...)", disabled: true},
        UPDATING: {name: "(Updating...)", disabled: true},
        CLEAR: {name: "Clear", action: function() {
          clearMenu();
        } },
        REFRESH: {name: "Refresh", action: function() {
          refreshMenu();
        } }
      };
      var _recentMenu = [opItems.EMPTY];
      var refreshMenu = function() {
        if (!_server) {
          return;
        }
        _recentMenu.splice(0, _recentMenu.length, opItems.UPDATING);
        _server.getItems(function(items) {
          var i, HISTORY_LENGTH = 10;
          var getShortName = function(url) {
            if (url && url[url.length - 1] === "/") {
              url = url.substring(0, url.length - 1);
            }
            return url.replace(/^.*[\\\/]/, '');
          };
          if (_.isEmpty(items)) {
            _recentMenu.splice(0, _recentMenu.length, opItems.EMPTY);
          } else {
            _recentMenu.splice(0, _recentMenu.length);
            for (i = 0; i < items.length && i < HISTORY_LENGTH; ++i) {
              (function() {
                try {
                  var item = angular.fromJson(items[i]);
                  _recentMenu.push({
                    name: getShortName(item.uri),
                    action: function() {
                      _pathOpener.open(item.uri, item.type, item.readOnly, item.format);
                    },
                    tooltip: item.uri
                  });
                } catch(e) {
                  // this exists only for backward compatibility
                  var item = items[i];
                  _recentMenu.push({
                    name: getShortName(item),
                    action: function() {
                      _pathOpener.open(item);
                    },
                    tooltip: item
                  });
                }
              })();
            }
          }
          angularUtils.refreshRootScope();
        });
      };
      var clearMenu = function() {
        _recentMenu.splice(0, _recentMenu.length, opItems.CLEARING);
        _server.clear(refreshMenu);
      };

      var _pathOpener;
      refreshMenu(); // initialize
      return {
        init: function(pathOpener) {
          _pathOpener = pathOpener;
        },
        getMenuItems: function() {
          return _recentMenu;
        },
        recordRecentDocument: function(item) {
          if (_server) {
            _server.addItem(item, refreshMenu);
          }
        }
      };
    };
  });
})();

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
 * Module bk.session
 * This module owns the services of communicating to the session backup end point to load and
 * upload(backup) a session.
 */
(function() {
  'use strict';
  var module = angular.module('bk.session', ['bk.utils']);
  /**
   * bkSession
   * - talks to beaker server (/beaker/rest/session)
   * - bkSessionManager should depend on it to update/backup the session model
   */
  module.factory('bkSession', function(bkUtils) {
    var backupSession = function(sessionId, sessionData) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpPost(bkUtils.serverUrl('beaker/rest/session-backup/backup/' + sessionId), sessionData)
          .success(function(data) {
            deferred.resolve();
          })
          .error(function(data, status) {
            console.error('Failed to backup session: ' + sessionId + ', ' + status);
            deferred.reject('Failed to backup session: ' + sessionId + ', ' + status);
          });
      return deferred.promise;
    };
    var getSessions = function() {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl('beaker/rest/session-backup/getExistingSessions'))
          .success(function(sessions) {
            deferred.resolve(sessions);
          })
          .error(function(data, status, headers, config) {
            deferred.reject('Failed to get existing sessions ' + status);
          });
      return deferred.promise;
    };
    var getSessionEditedState = function(sessionId) {
      return bkUtils.httpGet(bkUtils.serverUrl('beaker/rest/session-backup/getEdited'), {sessionid: sessionId});
    };

    var loadSession = function(sessionId) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl('beaker/rest/session-backup/load'), {sessionid: sessionId})
          .success(function(session, status) {
            deferred.resolve(session);
          })
          .error(function(data, status, headers, config) {
            deferred.reject('Failed to load session: ' + sessionId + ', ' + status);
          });
      return deferred.promise;
    };
    var closeSession = function(sessionId) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpPost(bkUtils.serverUrl('beaker/rest/session-backup/close'), {sessionid: sessionId})
          .success(function(ret) {
            deferred.resolve(sessionId);
          })
          .error(function(data, status, headers, config) {
            deferred.reject('Failed to close session: ' + sessionId + ', ' + status);
          });
      return deferred.promise;
    };
    var recordLoadedPlugin = function(pluginName, pluginUrl) {
      bkUtils.httpPost(
          bkUtils.serverUrl('beaker/rest/session-backup/addPlugin'),
          {pluginname: pluginName, pluginurl: pluginUrl})
          .success(function(ret) {
            //console.log('recordLoadedPlugin');
          })
          .error(function(data, status, headers, config) {
            console.error('Failed to add plugin, ' + pluginName + ', ' + pluginUrl + ', ' + status);
          });
    };
    var getPlugins = function() {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl('beaker/rest/session-backup/getExistingPlugins'), {})
          .success(function(plugins) {
            deferred.resolve(plugins);
          })
          .error(function(data, status, headers, config) {
            deferred.reject('Failed to get existing plugins, ' + status);
          });
      return deferred.promise;
    };
    return {
      getSessions: getSessions,
      load: loadSession,
      getSessionEditedState: getSessionEditedState,
      backup: backupSession,
      close: closeSession,
      recordLoadedPlugin: recordLoadedPlugin,
      getPlugins: getPlugins
    };
  });
})();

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
 * Module bk.share
 * This module owns the bkShare service which communicate with the backend to create sharable
 * content as well as to return URL of the shard content.
 */
(function() {
  'use strict';
  var module = angular.module('bk.share', []);

  module.provider("bkShare", function() {
    var _sharingService = null;
    this.config = function(sharingService) {
      _sharingService = sharingService;
    };
    this.$get = function() {
      if (!_sharingService) {
        var noOp = function() {
          // do nothing for now
          // we might consider logging error or warning:
          //console.error("no sharing service available");
        };
        return {
          publish: noOp,
          getSharableUrl: noOp
        };
      }
      // the reason of wrapping the strategy instead of just return
      // it (_sharingService) is to make the API explicit.
      return {
        publish: function(uri, content, cb) {
          return _sharingService.publish(uri, content, cb);
        },
        generateExcel: function(path, table, cb) {
          return _sharingService.generateExcel(path, table, cb);
        },
        getSharableUrl: function(uri) {
          return _sharingService.getSharableUrl(uri);
        },
        getSharableUrl_SectionCell: function(uri) {
          return _sharingService.getSharableUrl_SectionCell(uri);
        },
        getSharableUrl_CodeCell: function(uri) {
          return _sharingService.getSharableUrl_CodeCell(uri);
        },
        getSharableUrl_Table: function(uri) {
          return _sharingService.getSharableUrl_Table(uri);
        },
        getSharableUrl_Notebook: function(uri) {
          return _sharingService.getSharableUrl_Notebook(uri);
        }
      };
    };
  });
})();

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
 * Module bk.track
 * This module owns the service that can be configured to 3rd party provided usage metric
 * logging services.
 */
(function() {
  'use strict';
  var module = angular.module('bk.track', []);

  module.provider('bkTrack', function() {
    var _trackingService = null;
    this.config = function(trackingService) {
      if (_.isFunction(trackingService)) {
        _trackingService = trackingService();
      } else {
        _trackingService = trackingService;
      }
    };
    this.$get = function() {
      if (!_trackingService) {
        return {
          log: function(event, obj) {
            // do nothing
          },
          isNeedPermission: function() {
            return false;
          }
        };
      }
      return {
        log: function(event, object) {
          _trackingService.log(event, object);
        },
        enable: function() {
          // some tracking service will need to be enabled before being used
          if (_trackingService.enable && _.isFunction(_trackingService.enable)) {
            _trackingService.enable();
          }
        },
        disable: function() {
          // some tracking service will need to be enabled before being used
          if (_trackingService.disable && _.isFunction(_trackingService.disable)) {
            _trackingService.disable();
          }
        },
        isNeedPermission: function() {
          return _trackingService.isNeedPermission
              && _.isFunction(_trackingService.isNeedPermission)
              && _trackingService.isNeedPermission();
        }
      };
    };
  });
})();

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
 * Module bk.utils
 * This module contains the low level utilities used by Beaker
 */
(function() {
  'use strict';
  var module = angular.module('bk.utils', [
    'bk.commonUtils',
    'bk.angularUtils',
    'bk.cometdUtils',
    'bk.track'
  ]);
  /**
   * bkUtils
   * - holds general/low0level utilities that are beaker specific that has no effect to DOM directly
   * - it also serves the purpose of hiding underneath utils: commonUtils/angularUtils/...
   *    from other parts of beaker
   */
  module.factory('bkUtils', function(commonUtils, angularUtils, bkTrack, cometdUtils, $localStorage) {

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
    var serverRoot = endsWith(document.baseURI, 'beaker/') ? document.baseURI.substring(0,document.baseURI.length-7): document.baseURI;

    var osName = "Unknown";
    if (navigator.appVersion.indexOf("Win") != -1) {
      osName="Windows";
    } else if (navigator.appVersion.indexOf("Mac") != -1) {
      osName="MacOS";
    } else if (navigator.appVersion.indexOf("Linux") != -1) {
      osName="Linux";
    }

    
    function serverUrl(path) {
      return serverRoot + path;
    }

    var fileRoot = document.baseURI;
    
    function fileUrl(path) {
      return fileRoot + path;
    }

    // ajax notebook location types should be of the form
    // ajax:/loading/path:/saving/path
    function parseAjaxLocator(locator) {
      var pieces = locator.split(":");
      return { source: pieces[1], destination: pieces[2] }
    }

    var bkUtils = {
        serverUrl: serverUrl,
        fileUrl: fileUrl,

      // wrap trackingService
      log: function(event, obj) {
        bkTrack.log(event, obj);
      },

      // wrap commonUtils
      generateId: function(length) {
        return commonUtils.generateId(length);
      },
      loadJS: function(url, success) {
        return commonUtils.loadJS(url, success);
      },
      loadCSS: function(url) {
        return commonUtils.loadCSS(url);
      },
      loadList: function(urls, success, failure) {
        return commonUtils.loadList(urls, success, failure);
      },
      formatTimeString: function(millis) {
        return commonUtils.formatTimeString(millis);
      },
      isMiddleClick: function(event) {
        return commonUtils.isMiddleClick(event);
      },
      getEventOffsetX: function(elem, event) {
        return commonUtils.getEventOffsetX(elem, event);
      },
      findTable: function(elem) {
        return commonUtils.findTable(elem);
      },
      saveAsClientFile: function(data, filename) {
        return commonUtils.saveAsClientFile(data, filename);
      },
      // Give the angular base URL
      // XXX This function is a HACK: '$location' should probably be used instead of
      // 'location', but '$location' seems to return the wrong path.
      getBaseUrl: function() {
        return location.protocol + '//' + location.host + location.pathname + '#';
      },
      removeSpecialChars: function(str) {
        return commonUtils.removeSpecialChars(str);
      },

      // wrap angularUtils
      refreshRootScope: function() {
        angularUtils.refreshRootScope();
      },
      toPrettyJson: function(jsObj) {
        return angularUtils.toPrettyJson(jsObj);
      },
      fromPrettyJson: function(jString) {
        return angularUtils.fromPrettyJson(jString);
      },
      httpGet: function(url, data, headers) {
        return angularUtils.httpGet(url, data, headers);
      },
      httpGetJson: function(url, data, headers) {
        return angularUtils.httpGetJson(url, data, headers);
      },
      httpDeleteJson: function(url, data, headers) {
        return angularUtils.httpDeleteJson(url, data, headers);
      },
      httpPost: function(url, data, headers) {
        return angularUtils.httpPost(url, data, headers);
      },
      httpPostJson: function(url, data,headers) {
        return angularUtils.httpPostJson(url, data, headers);
      },
      httpPutJson: function(url, data, headers) {
        return angularUtils.httpPutJson(url, data, headers);
      },
      spinUntilReady: function(url) {
        var deferred = angularUtils.newDeferred();
        var timeRemaining = 30 * 1000;
        var maxInterval = 1000;
        var interval = 10;
        console.log("note: probing until backend is ready, an error here is normal");
        function spin() {
          angularUtils.httpGet(url, {}).success(function (r) {
            deferred.resolve("ok");
          }).error(function (r) {
            if (timeRemaining <= 0) {
              deferred.reject("timeout");
            } else {
              interval *= 1.5;
              if (interval > maxInterval) {
                interval = maxInterval;
              }
              timeRemaining = timeRemaining - interval;
              angularUtils.timeout(spin, interval);
            }
          });
        }
        spin();
        return deferred.promise;
      },
      newDeferred: function() {
        return angularUtils.newDeferred();
      },
      newPromise: function(value) {
        return angularUtils.newPromise(value);
      },
      all: function() {
        return angularUtils.all.apply(angularUtils, arguments);
      },
      fcall: function(func) {
        return angularUtils.fcall(func);
      },
      delay: function(ms) {
        return angularUtils.delay(ms);
      },
      timeout: function(func,ms) {
        return angularUtils.timeout(func,ms);
      },
      cancelTimeout: function(promise) {
        return angularUtils.cancelTimeout(promise);  
      },
      setServerRoot: function(url) {
        serverRoot = url;
      },
      setFileRoot: function(url) {
        fileRoot = url;
      },

      // beaker server involved utils
      getHomeDirectory: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getHomeDirectory"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getWorkingDirectory: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getWorkingDirectory"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getVersionInfo: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/util/getVersionInfo"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getStartUpDirectory: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getStartUpDirectory"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getDefaultNotebook: function() {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(serverUrl("beaker/rest/util/getDefaultNotebook")).
            success(function(data) {
              deferred.resolve(angular.fromJson(data));
            }).
            error(function(data, status, header, config) {
              deferred.reject(data, status, header, config);
            });
        return deferred.promise;
      },
      generateNotebook: function(evaluators, cells) {
        return {
          beaker: "2",
          evaluators: evaluators,
          cells: cells
        };
      },
      loadFile: function(path) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(serverUrl("beaker/rest/file-io/load"), {path: path})
            .success(function(content) {
              if (!_.isString(content)) {
                // angular $http auto-detects JSON response and deserialize it using a JSON parser
                // we don't want this behavior, this is a hack to reverse it
                content = JSON.stringify(content);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },

      loadHttp: function(url) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(serverUrl("beaker/rest/http-proxy/load"), {url: url})
            .success(function(content) {
              if (!_.isString(content)) {
                // angular $http auto-detects JSON response and deserialize it using a JSON parser
                // we don't want this behavior, this is a hack to reverse it
                content = JSON.stringify(content);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },
      loadAjax: function(ajaxLocator) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(parseAjaxLocator(ajaxLocator).source, {}, {"X-Authorization": "Token " + $localStorage.token})
            .success(function(content) {
              if (!_.isString(content)) {
                // angular $http auto-detects JSON response and deserialize it using a JSON parser
                // we don't want this behavior, this is a hack to reverse it
                content = JSON.stringify(content);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },
      saveFile: function(path, contentAsJson, overwrite) {
        var deferred = angularUtils.newDeferred();
        if (overwrite) {
          angularUtils.httpPost(serverUrl("beaker/rest/file-io/save"), {path: path, content: contentAsJson})
              .success(deferred.resolve)
              .error(deferred.reject);
        } else {
          angularUtils.httpPost(serverUrl("beaker/rest/file-io/saveIfNotExists"), {path: path, content: contentAsJson})
              .success(deferred.resolve)
              .error(function(data, status, header, config) {
                if (status === 409) {
                  deferred.reject("exists");
                } else if (data === "isDirectory") {
                  deferred.reject(data);
                } else {
                  deferred.reject(data, status, header, config);
                }
              });
        }

        return deferred.promise;
      },
      saveAjax: function(ajaxLocator, contentAsJson) {
        var deferred = angularUtils.newDeferred();
        var destination = parseAjaxLocator(ajaxLocator).destination;
        angularUtils.httpPutJson(destination, {data: contentAsJson}, {"X-Authorization": "Token " + $localStorage.token})
          .success(deferred.resolve)
          .error(deferred.reject);
        return deferred.promise;
      },
      initializeCometd: function(uri) {
        return cometdUtils.initializeCometd(uri);
      },
      addConnectedStatusListener: function(cb) {
        return cometdUtils.addConnectedStatusListener(cb);
      },
      removeConnectedStatusListener: function() {
        return cometdUtils.removeConnectedStatusListener();
      },
      disconnect: function() {
        return cometdUtils.disconnect();
      },

      beginsWith: function(haystack, needle) {
        return (haystack.substr(0, needle.length) === needle);
      },

      // wrapper around requireJS
      moduleMap: {},
      loadModule: function(url, name) {
        // name is optional, if provided, it can be used to retrieve the loaded module later.
        var that = this;
        if (_.isString(url)) {
          var deferred = this.newDeferred();
          window.requirejs([url], function (ret) {
            if (!_.isEmpty(name)) {
              that.moduleMap[name] = url;
            }
            deferred.resolve(ret);
          }, function(err) {
            deferred.reject({
              message: "module failed to load",
              error: err
            });
          });

          return deferred.promise;
        } else {
          throw "illegal arg" + url;
        }
      },
      require: function(nameOrUrl) {
        var url = this.moduleMap.hasOwnProperty(nameOrUrl) ? this.moduleMap[nameOrUrl] : nameOrUrl;
        return window.require(url);
      },
      setEasyFormValue: function (name, value, session, onSuccess, onError) {
        var data = {
            session: session,
            name: name,
            value: value,
            publish: false
        };
        this.httpPost(
                this.serverUrl("beaker/rest/easyform/set"),
                data)
                .success(function(ret) {
                    if (onSuccess) {
                        onSuccess(ret);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.error("Failed to set easyform value. " + status);
                    if (onError) {
                        onError(data);
                    }
                });
    },
    getValidNgModelString: function(str) {
      if (str) {
        return str.replace(/[\s\d`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      }
    },
    // Electron: require('remote')
    isElectron: navigator.userAgent.indexOf('beaker-desktop') > -1,
    osName: osName
    };
    return bkUtils;
  });
})();

/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
 * Module bk.electron
 * This module contains all wrappers to Electron's API
 */
(function() {
  'use strict';
  var module = angular.module('bk.electron', [
    'bk.utils'
  ]);
  /**
   * bkElectron
   * - does all interaction with the Electron main thread, mostly through the 'remote' module
   */
  module.factory('bkElectron', function(bkUtils) {
    if (bkUtils.isElectron) {
      var remote = require('remote');
      var BrowserWindow = remote.require('browser-window');
      var Menu = remote.require('menu');
      var Dialog = remote.require('dialog');
      var Shell = remote.require('shell');
      var IPC = require('ipc');
      var WebFrame = require('web-frame');
      var thisWindow = remote.getCurrentWindow();
      var app = remote.require('app');
      var clipboard = remote.require('clipboard');

      var _status = '';

      var _ctrlKey = (bkUtils.osName == 'MacOS') ? 'Command' : 'Control';
      var _zoomFactor = 1.0;

      var _assignShortcut = function(name) {
        switch (name) {
          case 'Save':
            return _ctrlKey + '+S';
          case 'Open... (.bkr)':
            return _ctrlKey + '+O';
          case 'New Notebook':
            return _ctrlKey + '+N';
          case 'Tutorial':
            return _ctrlKey + '+H';
          default:
            return undefined;
        }
      };
      var _beakerMenu = {
        label: 'Beaker',
        submenu: [
          {
            label: 'Change server',
            click: function() {
              IPC.send('try-change-server');
            }
          },
          {
            label: 'Start new local backend',
            click: function() {
              IPC.send('new-backend');
            }
          },
          {
            label: 'Open in browser',
            click: function() {
              IPC.send('open-in-browser');
            }
          },
          {
            label: 'Quit',
            click: function() {
              IPC.send('quit');
            },
            accelerator: _ctrlKey + '+Q'
          }
        ]
      };
      var _editMenu = {
        label: 'Edit',
        submenu:[
          {label: 'Undo', accelerator: _ctrlKey + '+Z', selector: 'undo:'},
          {label: 'Redo', accelerator: _ctrlKey + '+Shift+Z', selector: 'redo:'},
          {type: 'separator'},
          {label: 'Cut', accelerator: _ctrlKey + '+X', selector: 'cut:'},
          {label: 'Copy', accelerator: _ctrlKey + '+C', selector: 'copy:'},
          {label: 'Paste', accelerator: _ctrlKey + '+V', selector: 'paste:'},
          {label: 'Select All', accelerator: _ctrlKey + '+A', selector: 'selectAll:'}
        ]
      };

      var _refreshWindowTitle = function() {
        if (_status !== '') {
          thisWindow.setTitle(thisWindow.pageTitle + ' - ' + _status);
        } else {
          thisWindow.setTitle(thisWindow.pageTitle);
        }
      }

      var bkElectron = {
        remote: remote,
        BrowserWindow: BrowserWindow,
        Menu: Menu,
        Dialog: Dialog,
        Shell: Shell,
        IPC: IPC,
        WebFrame: WebFrame,
        app: app,
        clipboard: clipboard,

        increaseZoom: function() {
          _zoomFactor += 0.1;
          WebFrame.setZoomFactor(_zoomFactor);
        },
        decreaseZoom: function() {
          if (_zoomFactor > 0.1) {
            _zoomFactor -= 0.1;
          }
          WebFrame.setZoomFactor(_zoomFactor);
        },
        resetZoom: function() {
          _zoomFactor = 1.0;
          WebFrame.setZoomFactor(_zoomFactor);
        },

        toggleDevTools: function() {
          BrowserWindow.getFocusedWindow().toggleDevTools();
        },

        thisWindow: thisWindow,

        updateMenus: function(menus) {
          var makeMenu = function(bkmenu) {
            var menu = [];
            for (var i = 0; i < bkmenu.length; i++) {
              var bkItem = bkmenu[i];
              var newItem = {
                label: bkItem.name
              }
              if (bkItem.action !== undefined) {
                newItem.click = bkItem.action.bind({});
              }
              if ((bkItem.isRadio !== true) && (bkItem.isChecked !== undefined)) {
                newItem.type = 'checkbox';
                newItem.checked = bkItem.isChecked();
              } else if (bkItem.isRadio === true) {
                newItem.type = 'radio';
                newItem.checked = bkItem.isChecked();
              }
              newItem.accelerator = _assignShortcut(bkItem.name);
              // Process submenu
              if (Array.isArray(bkItem.items)) {
                newItem.submenu = makeMenu(bkItem.items);
              }
              if (bkItem.index !== undefined) {
                menu[bkItem.index] = newItem;
              } else {
                menu.push(newItem);
              }
            }
            return menu;
          };

          var template = makeMenu(_.values(menus));
          template.splice(1, 0, _editMenu);
          template.splice(0, 0, _beakerMenu);
          var menu = Menu.buildFromTemplate(template);
          Menu.setApplicationMenu(menu);
        },

        setStatus: function(msg) {
          _status = msg;
          _refreshWindowTitle();
        },

        getStatus: function() {
          return _status;
        }
      };
      return bkElectron;
    } else {
      return {};
    }
  });
})();

//# sourceMappingURL=beakerApp.js.map