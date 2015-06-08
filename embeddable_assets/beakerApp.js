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
__p += '\n<header class="navbar-fixed-top bkr">\n  <div class="navbar navbar-inverse bkr">\n    <a class="navbar-brand bkr" href="/beaker/#/control" ng-click="gotoControlPanel($event)" eat-click="">\n      <img src="app/images/beaker_icon@2x.png" class="bkr">\n      Beaker\n    </a>\n  </div>\n  <div class="navbar navbar-default bkr">\n    <ul class="nav navbar-nav bkr">\n      <li class="dropdown bkr" ng-repeat="m in getMenus()">\n        <a href="#" role="button" class="dropdown-toggle {{m.id}} bkr" data-toggle="dropdown">{{m.name}}</a>\n        <bk-dropdown-menu menu-items="m.items" class="bkr"></bk-dropdown-menu>\n      </li>\n      <p ng-if="disconnected" class="navbar-text text-danger right bkr">\n        offline\n      </p>\n    </ul>\n  </div>\n</header>\n\n<div class="dashboard container-fluid bkr">\n  <div class="row bkr">\n    <div class="col-md-12 bkr">\n\n      <h1 class="bkr">Beaker <small class="bkr">The data scientist\'s laboratory</small></h1>\n\n      <div ng-if="isSessionsListEmpty()" class="empty-session-prompt bkr">\n          <p class="bkr">Click below to get started coding in Python, R, JavaScript, Julia, Scala, Java, Groovy, and Ruby. <br class="bkr">\n            Beginners should check out the <strong class="bkr">Help → Tutorial</strong>.</p>\n      </div>\n\n      <div ng-hide="isSessionsListEmpty()" class="bkr">\n        <h4 class="open-notebook-headline bkr">Open Notebooks</h4>\n        <bk-control-panel-session-item class="open-notebooks bkr"></bk-control-panel-session-item>\n      </div>\n\n      <div class="row new-notebook bkr">\n        <div class="col-xs-3 bkr">\n          <a class="btn btn-default text-center btn-block bkr" ng-click="newNotebook()">New Default Notebook</a>\n        </div>\n        <div class="col-xs-3 bkr">\n          <a class="btn btn-default text-center btn-block new-empty-notebook bkr" ng-click="newEmptyNotebook()">New Empty Notebook</a>\n        </div>\n        <div class="col-xs-6 bkr">\n          <div class="faux-drop-zone bkr">\n            Or drag a .bkr file anywhere on this page to import\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n  <div class="row bkr" ng-show="isAllowAnonymousTracking == null">\n    <div class="col-md-6 well bkr">\n      <p class="bkr">\n        <b class="bkr">Track anonymous usage info?</b>\n      </p>\n\n      <p class="bkr">\n        We would like to collect anonymous usage info to help improve our product. We may share this information\n        with other parties, including, in the spirit of open software, by making it publicly accessible.<br class="bkr">\n      </p>\n\n      <p class="bkr">\n        <a target="_blank" href="http://beakernotebook.com/privacy" class="bkr">Privacy policy</a> - <a class="cursor_hand bkr" ng-click="showWhatWeLog()">What will we log?</a>\n      </p>\n      <div class="btn-group bkr">\n        <button class="btn btn-default bkr" ng-click="isAllowAnonymousTracking = false">No, don\'t track</button>\n        <button class="btn btn-active bkr" ng-click="isAllowAnonymousTracking = true">Yes, track my info</button>\n      </div>\n    </div>\n\n  </div>\n</div>';

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
'" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n  <tree-view ng-if="\'' +
__e( homedir ) +
'\' != \'' +
__e( pwd ) +
'\'" rooturi="' +
__e( pwd ) +
'" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n  \n</div>\n<div class="modal-footer fixed bkr" style="height: 106px"> \n  <p class="bkr">\n    <input id="saveAsFileInput" class="left bkr" ng-model="getStrategy().input" ng-keypress="getStrategy().close($event, close)" focus-start="">\n    <i class="new-folder bk-icon bkr" data-toggle="tooltip" title="Make new directory ({{getStrategy().input}})" ng-click="getStrategy().newFolder(getStrategy().input)"></i>\n  </p>\n  <span style="float:left" class="bkr">{{getStrategy().getResult()}}</span>\n  <button ng-click="close()" class="btn btn-default bkr">Cancel</button>\n  <button ng-click="close(getStrategy().getResult())" class="btn btn-primary bkr" ng-disabled="getStrategy().getSaveBtnDisabled()">Save</button>\n</div>';

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
__p += '\n<header class="navbar-fixed-top bkr">\n  <div class="navbar navbar-inverse bkr">\n    <a class="navbar-brand bkr" href="/beaker/#/control" ng-click="gotoControlPanel($event)" eat-click="">\n      <img src="app/images/beaker_icon@2x.png" class="bkr">\n      Beaker\n    </a>\n    <p class="navbar-text bkr">{{filename()}}</p>\n    <span class="navbar-text bkr" ng-if="loading || !!loadingmsg">\n      <i class="fa fa-refresh fa-spin text-white bkr"></i>\n    </span>\n    <div class="navbar-text text-white loadingmsg bkr" ng-if="loading || !!loadingmsg">\n      {{loadingmsg}}\n    </div>\n  </div>\n  <div class="navbar navbar-default bkr">\n    <ul class="nav navbar-nav bkr">\n      <li class="dropdown bkr" ng-repeat="m in getMenus()">\n        <a href="#" role="button" class="dropdown-toggle bkr" ng-class="m.classNames" data-toggle="dropdown">{{m.name}}</a>\n        <bk-dropdown-menu menu-items="m.items" class="bkr"></bk-dropdown-menu>\n      </li>\n    </ul>\n    <p ng-if="isEdited()" class="navbar-text text-success pull-right bkr">edited</p>\n    <p ng-if="isDisconnected()" class="navbar-text pull-right bkr">\n      <a href="javascript:;" class="navbar-link text-danger bkr" ng-click="promptToSave()" eat-click="">{{getOffineMessage()}}</a>\n    </p>\n  </div>\n</header>\n\n<div class="container-fluid notebook-container bkr">\n  <div class="row bkr">\n    <div class="col-md-12 bkr">\n      <bk-notebook set-bk-notebook="setBkNotebook(bkNotebook)" is-loading="loading" class="bkr"></bk-notebook>\n    </div>\n  </div>\n\n  \n  <div style="height: 300px" class="bkr"></div>\n\n</div>\n\n\n<script type="text/ng-template" id="section-cell.html" class="bkr">\n  <bk-section-cell></bk-section-cell>\n</script>\n<script type="text/ng-template" id="text-cell.html" class="bkr">\n  <div class="text-cell">\n    <bk-text-cell></bk-text-cell>\n  </div>\n</script>\n<script type="text/ng-template" id="markdown-cell.html" class="bkr">\n  <bk-markdown-cell></bk-markdown-cell>\n</script>\n<script type="text/ng-template" id="code-cell.html" class="bkr">\n  <bk-code-cell cellmodel="cellmodel" cellmenu="cellview.menu" index="$index"></bk-code-cell>\n</script>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/pluginmanager/pluginmanager"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="bkr">\n  <div class="modal-header fixed bkr" style="height: 69px">\n    <h1 class="bkr">Language Manager</h1>\n  </div>\n  <div class="modal-body fixed modal-large plugin-manager bkr" style="padding-top: 69px; padding-bottom: 68px">\n    <div class="languages clearfix bkr">\n      <button class="btn btn-default language-icon-button bkr" ng-click="evalTabOp.togglePlugin(pluginName)" ng-repeat="(pluginName, pluginStatus) in evalTabOp.getEvaluatorStatuses()" ng-class="pluginName">\n        <span ng-class="\'plugin-\' + pluginStatus" class="plugin-status bkr">●</span>\n        <bk-language-logo bg-color="{{getEvaluatorDetails(pluginName).bgColor}}" name="{{getEvaluatorDetails(pluginName).shortName}}" fg-color="{{getEvaluatorDetails(pluginName).fgColor}}" border-color="{{getEvaluatorDetails(pluginName).borderColor}}" class="bkr">\n        </bk-language-logo>\n\n        {{pluginName}}\n      </button>\n      <button ng-click="evalTabOp.showURL = !evalTabOp.showURL" class="btn btn-default bkr">\n        From URL...\n      </button>\n    </div>\n    <div ng-show="evalTabOp.showURL" class="input-group addeval bkr">\n      <input type="text" bk-enter="evalTabOp.togglePlugin()" ng-model="evalTabOp.newPluginNameOrUrl" class="bkr">\n      <button class="btn btn-default bkr" ng-click="evalTabOp.togglePlugin()">Add Plugin from URL</button>\n    </div>\n    <div ng-show="evalTabOp.showSecurityWarning" class="bkr">\n      <div class="modal-body error-title body-box bkr">\n        <p class="bkr">Are you sure you want to load this plugin from an external URL?</p>\n        <button class="btn btn-default right bkr" ng-click="evalTabOp.showSecurityWarning = false; evalTabOp.showURL=false; evalTabOp.newPluginNameOrUrl=&quot;&quot;">Cancel</button>\n        <button class="btn btn-default right bkr" ng-click="evalTabOp.showSecurityWarning = false; evalTabOp.forceLoad = true; evalTabOp.togglePlugin()">OK</button>\n      </div>\n      <p class="bkr"><br class="bkr"></p>\n    </div>\n    <div ng-show="evalTabOp.showWarning" class="bkr">\n      <div class="modal-body error-title body-box bkr">\n        <p class="bkr">Cannot remove plugin currently used by a code cell in the notebook.<br class="bkr">\n        Delete those cells and try again.</p>\n        <button class="btn btn-default right bkr" ng-click="evalTabOp.showWarning = false">OK</button>\n      </div>\n      <p class="bkr"><br class="bkr"></p>\n    </div>\n    <tabset class="bkr">\n      <tab ng-repeat="(evaluatorName, evaluator) in evalTabOp.getEvaluatorsWithSpec()" heading="{{evaluatorName}}" class="bkr">\n        <bk-plugin-manager-evaluator-settings class="bkr"></bk-plugin-manager-evaluator-settings>\n      </tab>\n    </tabset>\n  </div>\n  <div class="modal-footer fixed bkr" style="height: 68px"> \n    <button class="btn btn-primary language-manager-close-button bkr" ng-click="doClose()">Close</button>\n  </div>\n</div>';

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
__p += '\n<div ng-class="isLocked() &amp;&amp; \'locked\'" class="bkcell {{cellmodel.type}} bkr">\n  <div ng-if="cellmodel.input.hidden &amp;&amp; cellmodel.type==\'code\' &amp;&amp; !isLocked()" class="mini-cell-stats advanced-hide bkr">\n    {{cellmodel.evaluator}} &nbsp;\n    ({{cellmodel.lineCount}} lines)\n  </div>\n  <div class="toggle-menu bkr">\n    <div class="dropdown dropdown-promoted bkr" data-toggle="dropdown" style="float: right">\n      <div class="cell-menu-item cell-dropdown dropdown-toggle bkr" title="cell menu"></div>\n      <bk-dropdown-menu menu-items="cellview.menu.items" submenu-classes="drop-left" class="bkr"></bk-dropdown-menu>\n    </div>\n    <div class="cell-menu-item move-cell-down bkr" ng-click="moveCellDown()" ng-class="moveCellDownDisabled() &amp;&amp; \'disabled\'" title="move cell down"></div>\n    <div class="cell-menu-item move-cell-up bkr" ng-click="moveCellUp()" ng-class="moveCellUpDisabled() &amp;&amp; \'disabled\'" title="move cell up"></div>\n    <div class="cell-menu-item delete-cell bkr" ng-click="deleteCell()" title="delete cell"></div>\n    <div class="cell-menu-item expand-contract bkr" ng-if="cellmodel.type==\'code\'" ng-click="toggleCellInput()" ng-class="cellmodel.input.hidden &amp;&amp; \'collapsed\'" title="hide/show cell input"></div>\n    <div class="dropdown dropdown-promoted advanced-only bkr" ng-if="isCodeCell()" style="float: right">\n      <bk-code-cell-input-menu class="bkr"></bk-code-cell-input-menu>\n    </div>\n    <div class="cell-menu-item evaluate bkr" ng-click="evaluate($event)" ng-if="isCodeCell()" title="run cell"></div>\n    <div class="cell-status-item loading-state advanced-hide bkr" ng-if="cellmodel.type==\'code\' &amp;&amp; !cellmodel.evaluatorReader">Initializing {{cellmodel.evaluator}}\n      <div class="loading-spinner rotating bkr"></div>\n    </div>\n  </div>\n  <div ng-if="isDebugging()" class="bkr">\n    [Debug]: cell Id = {{cellmodel.id}}, parent = {{getParentId()}}, level = {{cellmodel.level}}\n    <a ng-click="toggleShowDebugInfo()" ng-hide="isShowDebugInfo()" class="bkr">show more</a>\n    <a ng-click="toggleShowDebugInfo()" ng-show="isShowDebugInfo()" class="bkr">show less</a>\n    <div collapse="!isShowDebugInfo()" class="bkr">\n      <pre class="bkr">{{cellmodel | json}}</pre>\n    </div>\n  </div>\n  <div ng-include="getTypeCellUrl()" class="bkr"></div>\n  <bk-new-cell-menu config="newCellMenuConfig" ng-class="isLarge &amp;&amp; \'large\'" is-large="isLarge" ng-if="newCellMenuConfig.isShow()" class="bkr"></bk-new-cell-menu>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<div class="evaluator bkr" evaluator-type="{{ cellmodel.evaluator }}" ng-class="{\n  \'evaluator-ready\': cellmodel.evaluatorReader,\n  \'locked\': isLocked(),\n  \'empty\': isEmpty()\n  }">\n  <div class="bkcell code-cell-area bkr">\n    <div class="code-cell-input bkr" ng-click="backgroundClick($event)" ng-hide="isLocked()" ng-class="{\'input-hidden\': cellmodel.input.hidden}">\n      <div class="code-cell-input-content bkr">\n        <bk-code-cell-input-menu class="advanced-hide bkr"></bk-code-cell-input-menu>\n        <div ng-click="$event.stopPropagation()" class="bkr">\n          <textarea class="bkcelltextarea bkr" ng-model="cellmodel.input.body"></textarea>\n        </div>\n        <a href="#" class="btn btn-default evaluate-script advanced-hide bkr" ng-click="evaluate($event)" eat-click="">\n          {{ isJobCancellable() ? \'Stop\' : \'Run\' }}\n        </a>\n      </div>\n    </div>\n    <div ng-if="hasOutput()" class="code-cell-output bkr" ng-class="{\n      \'no-output\': isHiddenOutput(),\n      \'input-hidden\': cellmodel.input.hidden,\n      \'output-hidden\': cellmodel.output.hidden,\n      \'error\': isError()\n      }">\n      <h6 ng-if="outputTitle()" class="bkr">{{outputTitle()}}</h6>\n      <bk-code-cell-output model="cellmodel.output" evaluator-id="{{ cellmodel.evaluator }}" cell-id="{{ cellmodel.id }}" class="bkr">\n      </bk-code-cell-output>\n    </div>\n  </div>\n</div>';

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
__p += '\n<div class="btn-group new-cell bkr">\n  <button ng-click="newCodeCell(defaultEvaluator())" class="btn btn-primary insert-cell bkr" ng-class="!isLarge &amp;&amp; \'btn-xs\'">\n    <span ng-class="!isLarge &amp;&amp; \'advanced-hide\'" class="bkr">\n      Insert {{defaultEvaluator()}} Cell\n    </span>\n    <span ng-if="!isLarge" class="plus advanced-only bkr">+</span>\n  </button>\n  <button class="btn btn-primary dropdown-toggle bkr" ng-class="!isLarge &amp;&amp; \'btn-xs\'" data-toggle="dropdown">\n    <i class="fa fa-sort-down bkr"></i>\n  </button>\n  <ul class="dropdown-menu bkr" role="menu">\n    <li class="dropdown-submenu bkr">\n      <a tabindex="-1" class="bkr">Code cell</a>\n      <ul class="dropdown-menu bkr">\n        <li ng-repeat="(key, value) in getEvaluators()" class="bkr">\n          <a ng-click="newCodeCell(key)" class="bkr">{{key}}</a>\n        </li>\n        <li class="bkr">\n           <a ng-click="showPluginManager()" class="bkr">Other languages...</a>\n        </li>\n      </ul>\n    </li>\n    <li class="dropdown-submenu bkr">\n      <a tabindex="-1" class="bkr">Section cell</a>\n      <ul class="dropdown-menu bkr">\n        <li ng-repeat="level in getLevels()" class="bkr">\n          <a ng-click="newSectionCell(level)" class="bkr">H{{level}}</a>\n        </li>\n      </ul>\n    </li>\n    <li class="bkr">\n      <a tabindex="-1" ng-click="newMarkdownCell()" class="bkr">Markdown cell</a>\n    </li>\n  </ul>\n</div>';

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
__p += '\n<div ng-if="elapsed > 200" class="row bkr">\n  <div class="col-sm-2 bkr">\n      <i class="fa fa-cog fa-spin fa-lg bkr"></i>\n      <span class="bkr"> &nbsp; Elapsed: {{getElapsedTime()}} &nbsp; </span>\n      <i class="fa fa-times-circle fa-lg text-danger cursor_hand bkr" ng-click="cancel()" ng-if="isCancellable()" title="cancel"></i>\n  </div>\n  <div class="col-sm-2 bkr" ng-if="hasProgressBar()">\n\t  <div class="progress bkr">\n\t\t  <div class="progress-bar bkr" role="progressbar" aria-valuenow="{{getProgressBar()}}" aria-valuemin="0" aria-valuemax="100" style="width: {{getProgressBar()}}%">\n\t\t    {{getProgressBar()}} %\n\t\t  </div>\n\t  </div>\n  </div>\n  <div ng-if="hasMessage()" class="col-sm-8 bkr"> {{getMessage()}}</div>\n</div>\n<div ng-if="hasPayload() || hasOutputData()" class="bkr">\n  <hr class="bkr">\n  <bk-code-cell-output model="outputDisplayModel" class="bkr"></bk-code-cell-output>\n</div>';

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
__p += '\n<div ng-hide="cellmodel.hideTitle" class="bkr">\n  <span class="bksectiontoggleplus section-toggle bkr" ng-click="toggleShowChildren()" ng-hide="isShowChildren()">\n    <i class="fa fa-plus bkr"></i>\n  </span>\n  <span class="bksectiontoggleminus section-toggle bkr" ng-click="toggleShowChildren()" ng-show="isShowChildren()">\n    <i class="fa fa-minus bkr"></i>\n  </span>\n  <p class="depth-indicator bkr">{{getFullIndex()}}</p>\n  <bk-markdown-editable class="section{{cellmodel.level}} bk-section-title bkr" cellmodel="cellmodel"></bk-markdown-editable>\n</div>\n<bk-new-cell-menu size="xs" config="newCellMenuConfig" ng-if="newCellMenuConfig.isShow()" class="bkr"></bk-new-cell-menu>\n<div ng-show="isShowChildren()" class="section-children bkr">\n  <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell" index="$index" cellid="{{cell.id}}" class="bkr"></bk-cell>\n</div>';

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
(function() {(window["JST"] = window["JST"] || {})["bko-tabledisplay/output-table-options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header fixed bkr" style="height: 69px">\n  <h1 class="bkr">Table Options</h1>\n</div>\n<div class="modal-body fixed modal-large bkr" style="padding-top: 69px; padding-bottom: 68px">\n\n <tabset class="bkr">\n\t<tab heading="Table Formatting" class="bkr">\n\n\t\t<div class="row bkr">\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \tUse pagination:\n\t\t\t</div>\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t<input type="checkbox" ng-model="pagination.use" class="bkr">\n\t\t    </div>\n    \t</div>\n\t\t<div class="row bkr">\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \tMax rows to display:\n\t\t\t</div>\n\t\t    <div class="col-xs-4 bkr">\n\t\t    \t<input type="number" ng-model="pagination.rowsToDisplay" ng-disabled="pagination.use" class="bkr">\n\t\t    </div>\n    \t</div>\n\t</tab>\n\t<tab heading="Cell Formatting" class="bkr">\n\t  <div class="row bkr">\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Column</strong></h2>\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Display Type</strong></h2>\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Show (<a tabindex="-1" href="#" ng-click="displayAll()" eat-click="" class="bkr">All</a>)</strong></h2>\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <h2 class="bkr"><strong class="bkr">Alignment</strong></h2>\n\t    </div>\n\t  </div>\n\n\t  <div class="row bkr" ng-repeat="menuidx in getCellIdx">\n\t    <div class="col-xs-3 bkr">\n\t      {{ getCellNam[menuidx] }}\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t      <select class="form-control bkr" ng-model="getCellDisp[menuidx]" ng-options="item.type as item.name for item in getCellDispOptsF(menuidx)"></select>\n\t\t</div>   \n\t    <div class="col-xs-3 bkr">\n\t      <input type="checkbox" ng-model="getCellSho[menuidx]" class="bkr">\n\t    </div>\n\t    <div class="col-xs-3 bkr">\n\t\t\t<input type="radio" ng-model="getCellAlign[menuidx]" value="L" class="bkr">&nbsp;<span class="glyphicon glyphicon-align-left bkr" aria-hidden="true"></span>&nbsp;\n  \t\t\t<input type="radio" ng-model="getCellAlign[menuidx]" value="C" class="bkr">&nbsp;<span class="glyphicon glyphicon-align-center bkr" aria-hidden="true"></span>&nbsp;\n\t\t\t<input type="radio" ng-model="getCellAlign[menuidx]" value="R" class="bkr">&nbsp;<span class="glyphicon glyphicon-align-right bkr" aria-hidden="true"></span>&nbsp;\n\t    </div>\n\t  </div>\n   </tab>\n </tabset>\n\n\n\n</div>\n\n<div class="modal-footer fixed bkr bkr" style="height: 68px"> \n  <button class="btn btn-default bkr bkr" ng-click="cancelOptionsDialog()">Cancel</button>\n  <button class="btn btn-primary modal-submit bkr bkr" ng-click="closeOptionsDialog()">OK</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["bko-tabledisplay/output-table"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="dropdown dtmenu clearfix bkr" style="float: left" ng-if="renderMenu">\n   <a class="dropdown-toggle dtmenu bkr" data-toggle="dropdown" ng-click="menuToggle()">\n   Edit Table \n   </a>\n   <ul class="dropdown-menu bkr" role="menu" submenu-classes="drop-right" aria-labelledby="dLabel">\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doResetSort()" id="dt-reset-sort" eat-click="" class="bkr">Reset Sort</a></li>\n     <li class="bkr">&nbsp;</li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doSelectAll()" id="dt-select-all" eat-click="" class="bkr">Select All</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doDeselectAll()" id="dt-deselect-all" eat-click="" class="bkr">Deselect All</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doReverseSelection()" id="dt-reverse-selection" eat-click="" class="bkr">Reverse Selection</a></li>\n     <li class="bkr">&nbsp;</li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doCopyToClipboard()" id="{{id}}_dt_copy" eat-click="" class="bkr">Copy to Clipboard</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doCSVExport(false)" id="dt-save-all" eat-click="" class="bkr">Save All as CSV</a></li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="doCSVExport(true)" id="dt-save-selected" eat-click="" class="bkr">Save Selected as CSV</a></li>\n     <li class="bkr">&nbsp;</li>\n     <li class="bkr"><a tabindex="-1" href="#" ng-click="openOptionsDialog()" id="dt-options" eat-click="" class="bkr">Options...</a></li>\n   </ul>\n </div>\n\n<table cellpadding="0" class="display bkr" border="0" cellspacing="0" width="10%" id="{{id}}"></table>';

}
return __p
}})();
(function() {
  'use strict';
  var module = angular.module('bk.controlPanel', [
    'bk.utils',
    'bk.core',
    'bk.session',
    'bk.menuPluginManager',
    'bk.recentMenu',
    'bk.evaluatePluginManager']);
})();

(function() {
  'use strict';
  var module = angular.module('bk.controlPanel');

  module.directive('bkControlPanel', function(
      bkUtils, bkCoreManager, bkSession, bkMenuPluginManager, bkTrack, $location) {
    return {
      restrict: 'E',
      template: JST['controlpanel/controlpanel'](),
      controller: function($scope) {
        document.title = 'Beaker';
        var _impl = {
          name: 'bkControlApp',
          showAnonymousTrackingDialog: function() {
            $scope.isAllowAnonymousTracking = null;
          }
        };

        bkCoreManager.setBkAppImpl(_impl);

        $scope.gotoControlPanel = function(event) {
          if (bkUtils.isMiddleClick(event)) {
            window.open($location.absUrl() + '/beaker');
          } else {
            location.reload();
          }
        };

       
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

       
        $scope.newNotebook = function() {
          bkCoreManager.newSession(false);
        };
        $scope.newEmptyNotebook = function() {
          bkCoreManager.newSession(true);
        };
        $scope.openTutorial = function() {
          bkCoreManager.openNotebook('config/tutorial.bkr', undefined, true);
        };

       
        $scope.isAllowAnonymousTracking = false;
        if ((window.beaker === undefined || window.beaker.isEmbedded === undefined) && bkTrack.isNeedPermission()) {
          bkUtils.httpGet('../beaker/rest/util/getPreference',{
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
          if (e.ctrlKey && e.shiftKey && (e.which === 78)) {
	    bkUtils.fcall(function() {
                   $scope.newNotebook();
            });
	    return false;
	  } else if (e.ctrlKey && (e.which === 78)) {
	    bkUtils.fcall(function() {
                   $scope.newEmptyNotebook();
             });
	    return false;
	  } else if (e.metaKey && !e.ctrlKey && e.shiftKey && (e.which === 78)) {
	    bkUtils.fcall(function() {
                   $scope.newNotebook();
            });
            return false;
	  } else if (e.metaKey && !e.ctrlKey && (e.which === 78)) {
            bkUtils.fcall(function() {
                   $scope.newEmptyNotebook();
            });
            return false;
	  }
	}
	console.log('installing keydownHandler');
	$(document).bind('keydown', keydownHandler);

	var onDestroy = function() {
	    $(document).unbind('keydown', keydownHandler);
	}
	$scope.$on('$destroy', onDestroy);

       
        $scope.sessions = null;
       
        $scope.reloadSessionsList = function() {
          bkSession.getSessions().then(function(sessions) {
            $scope.sessions = _(sessions).map(function(session, sessionId) {
              session.id = sessionId;
              return session;
            });
          });
        };
        $scope.reloadSessionsList();
        $scope.isSessionsListEmpty = function() {
          return _.isEmpty($scope.sessions);
        };
      }
    };
  });

})();

(function() {
  'use strict';
  var module = angular.module('bk.controlPanel');

  module.directive('bkControlPanelSessionItem', function(
      bkUtils, bkSession, bkCoreManager, bkRecentMenu, bkEvaluatePluginManager) {
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
          var edited = session.edited;
          var closeSession = function() {
            if (notebookModel && notebookModel.evaluators) {
              for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                bkEvaluatePluginManager.createEvaluatorThenExit(notebookModel.evaluators[i]);
              }
            }
            return bkSession.close(session.id).then(function() {
              $scope.reloadSessionsList();
            });
          };
          if (!edited) {
           
            closeSession();
          } else {
           
            bkHelper.show3ButtonModal(
                "Do you want to save [" + $scope.getCaption(session) + "]?",
                "Confirm close",
                function() {
                 
                  var saveSession = function() {
                    var notebookModelAsString = bkUtils.toPrettyJson(notebookModel);
                    if (!_.isEmpty(session.notebookUri) && !session.readOnly) {
                      var fileSaver = bkCoreManager.getFileSaver(session.uriType);
                      return fileSaver.save(session.notebookUri, notebookModelAsString, true);
                    } else {
                      var deferred = bkUtils.newDeferred();
                      bkCoreManager.showDefaultSavingFileChooser().then(function(pathInfo) {
                        if (!pathInfo.uri) {
                          deferred.reject({
                            cause: "Save cancelled"
                          });
                        } else {
                          var fileSaver = bkCoreManager.getFileSaver(pathInfo.uriType);
                          fileSaver.save(pathInfo.uri, notebookModelAsString).then(function () {
                            bkRecentMenu.recordRecentDocument(angular.toJson({
                              uri: pathInfo.uri,
                              type: pathInfo.uriType,
                              readOnly: false,
                              format: _.isEmpty(format) ? "" : format
                            }));
                            deferred.resolve();
                          }, function (error) {
                            deferred.reject({
                              cause: "error saving to file",
                              error: error
                            });
                          });
                        }
                      });
                      return deferred.promise;
                    }
                  };
                  var savingFailedHandler = function(info) {
                    if (info.cause === "Save cancelled") {
                      console.log("File saving cancelled");
                    } else {
                      bkHelper.show1ButtonModal(info.error, info.cause);
                    }
                  };
                  saveSession().then(closeSession, savingFailedHandler);
                },
                function() {
                  console.log("close without saving");
                  closeSession();
                },
                function() {
                 
                },
                "Save",
                "Don't Save"
            );
          }
        };

        $scope.getCaption = function(session) {
          var url = session.notebookUri;
          if (!url) {
            return "New Notebook";
          }
          if (url[url.length - 1] === "/") {
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

(function() {
  'use strict';
  var module = angular.module('bk.cellMenuPluginManager', [
    'bk.utils',
    'bk.helper' 
  ]);
  module.factory('bkCellMenuPluginManager', function(bkUtils) {
   
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

(function() {
  'use strict';
  var module = angular.module('bk.core', [
    'ui.bootstrap',
    'ui.keypress',
    'bk.commonUi',
    'bk.utils',
    'bk.recentMenu',
    'bk.notebookCellModelManager',
    'bk.treeView'
  ]);

    module.factory('bkCoreManager', function(
      $modal,
      $rootScope,
      $document,
      $location,
      $sessionStorage,
      bkUtils,
      bkRecentMenu,
      bkNotebookCellModelManager,
      modalDialogOp) {

    var FileSystemFileChooserStrategy = function (){
      var newStrategy = this;
      newStrategy.input = "";
      newStrategy.getResult = function() {
        return newStrategy.input;
      };
      newStrategy.close = function(ev, closeFunc) {
        if (ev.which === 13) {
          closeFunc(this.getResult());
        }
      };
      newStrategy.treeViewfs = {
        getChildren: function(basePath, openFolders) {
          var self = this
              paths = [basePath];

          this.showSpinner = true;

          if (openFolders) {
            var paths = [paths].concat(openFolders);
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
          }

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

   
   
    var _importers = {};
    var FORMAT_BKR = "bkr";
    _importers[FORMAT_BKR] = {
      import: function(notebookJson) {
        var notebookModel;
        try {
          notebookModel = bkUtils.fromPrettyJson(notebookJson);
         
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
          var pwd = values[1];
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
              result = pwd + "/" + result;
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
          var fileChooserTemplate = JST['template/savenotebook']({homedir: homeDir, pwd: pwd });
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
           
            return;
          }
          if (cm.getCursor().line === cm.doc.size - 1) {
            moveFocusDown();
          } else {
            cm.execCommand("goLineDown");
          }
        };

        var moveFocusDown = function() {
         
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
              showHintCB({
                list: _.uniq(results),
                from: CodeMirror.Pos(cur.line, start),
                to: CodeMirror.Pos(cur.line, end)
              });
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
          var leftLine = cm.getRange({line: cursor.line, ch: 0}, cursor);
          if (leftLine.match(/^\s*$/)) {
            cm.execCommand("indentMore");
          } else {
            showAutoComplete(cm);
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

        return {
          lineNumbers: true,
          matchBrackets: true,
          extraKeys: {
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
          }
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
       
       
        if (_.isUndefined(currentScope.getNotebookElement)) {
          return bkCoreManager.getNotebookElement(currentScope.$parent);
        } else {
          return currentScope.getNotebookElement();
        }
      },
      getNotebookCellManager: function() {
        return bkNotebookCellModelManager;
      },
     
      showModalDialog: function(callback, template, strategy) {
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
            callback(result);
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
        var close = function(result) {
          if (result === "OK") {
            okCB ? okCB() : null;
          } else {
            cancelCB ? cancelCB() : null;
          }
        };
        okBtnTxt = okBtnTxt ? okBtnTxt : "OK";
        cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
        okBtnClass = okBtnClass ? _.isArray(okBtnClass) ? okBtnClass.join(' ') : okBtnClass : 'btn-default';
        cancelBtnClass = cancelBtnClass ? _.isArray(cancelBtnClass) ? cancelBtnClass.join(' ') : cancelBtnClass : 'btn-default';
        var template = "<div class='modal-header'>" +
            "<h1>" + msgHeader + "</h1>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" +
            '<div class="modal-footer">' +
            "   <button class='Yes btn " + okBtnClass +"' ng-click='close(\"OK\")'>" + okBtnTxt + "</button>" +
            "   <button class='Cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
            "</div>";
        return this.showModalDialog(close, template);
      },
      show3ButtonModal: function(
          msgBody, msgHeader,
          yesCB, noCB, cancelCB,
          yesBtnTxt, noBtnTxt, cancelBtnTxt,
          yesBtnClass, noBtnClass, cancelBtnClass) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var close = function(result) {
          if (result === "Yes") {
            yesCB ? yesCB() : null;
          } else if (result === "No") {
            noCB ? noCB() : null;
          } else {
            cancelCB ? cancelCB() : null;
          }
        };
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
            "   <button class='yes btn " + yesBtnClass +"' ng-click='close(\"Yes\")'>" + yesBtnTxt + "</button>" +
            "   <button class='no btn " + noBtnClass +"' ng-click='close(\"No\")'>" + noBtnTxt + "</button>" +
            "   <button class='cancel btn " + cancelBtnClass +"' ng-click='close()'>" + cancelBtnTxt + "</button>" +
            "</div>";
        return this.showModalDialog(close, template);
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
        bkHelper.showStatus("Loading plugin "+ev.name);
        return bkUtils.loadModule(ev.url, ev.name);
      };
      var doNext = function() {
        if (_loadInProgress) {
          return;
        }
        _loadInProgress = _queue.shift();
        if (_loadInProgress) {
          if (plugins[_loadInProgress.name] || plugins[_loadInProgress.url]) {
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
            bkHelper.clearStatus("Loading plugin " + _loadInProgress.name)
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
        if (plugins[nameOrUrl]) {
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

(function() {
  'use strict';
  var module = angular.module('bk.helper', ['bk.utils', 'bk.core', 'bk.share', 'bk.debug']);
    module.factory('bkHelper', function(bkUtils, bkCoreManager, bkShare, bkDebug) {
    var getCurrentApp = function() {
      return bkCoreManager.getBkApp();
    };
    var getBkNotebookWidget = function() {
      if (getCurrentApp().getBkNotebookWidget) {
        return getCurrentApp().getBkNotebookWidget();
      } else {
        console.error("Current app doesn't support getBkNotebookWidget");
      }
    };

    var bkHelper = {
     
      debug: function() {
        window.bkDebug = bkDebug;
      },

     
      gotoControlPanel: function() {
        return bkCoreManager.gotoControlPanel();
      },
      openNotebook: function(notebookUri, uriType, readOnly, format) {
        return bkCoreManager.openNotebook(notebookUri, uriType, readOnly, format);
      },
      importNotebookDialog: function() {
        return bkCoreManager.importNotebookDialog();
      },
     
     
      newSession: function(empty) {
        return bkCoreManager.newSession(empty);
      },

     
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
      saveFile: function(path, contentAsJson, overwrite) {
        return bkUtils.saveFile(path, contentAsJson, overwrite);
      },
      loadFile: function(path) {
        return bkUtils.loadFile(path);
      },

     
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

     
      updateDocumentModelFromDOM: function(id) {
	  function convertCanvasToImage(elem) {
	      if (elem.nodeName == "CANVAS") {
		  var img = document.createElement("img");
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
	 
	  body = convertCanvasToImage(body[0]);

         
          var newOutput = body.innerHTML;

         
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

     
      share: bkShare,

     

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

       
        modelOutput.pluginName = pluginName;
        modelOutput.shellId = shellId;

       
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
           
            modelOutput.result = evaluation.payload;
          } else {
           
            modelOutput.result = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : evaluation.payload };
           
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
           
            modelOutput.result = {
              type: "BeakerDisplay",
              innertype: "Error",
              object: evaluation.payload
            };
          } else {
           
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
      }
    };

    return bkHelper;
  });
})();

(function() {
  'use strict';
  var module = angular.module('bk.menuPluginManager', ['bk.utils']);

  var utils = (function() {
    var DEFAULT_PRIORITY = 0;
   
   
   
    var addMenuItem = function(itemsList, newItem) {
     
      var existingItem = _(itemsList).find(function(it) {
        return it.name === newItem.name;
      });
      if (existingItem) {
        existingItem.priority = existingItem.priority ? existingItem.priority : DEFAULT_PRIORITY;
        newItem.priority = newItem.priority ? newItem.priority : DEFAULT_PRIORITY;
        if (newItem.priority >= existingItem.priority) {
         
          itemsList.splice(itemsList.indexOf(existingItem), 1, newItem);
        } else {
         
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
      } else {
        if (pluginIndex < parentMenu.index
            || (pluginIndex === parentMenu.index && secondaryIndex < parentMenu.secondaryIndex)) {
          delete menus[parentMenu.index + '_' + parentMenu.secondaryIndex + '_' + parentMenu.name];
          menus[pluginIndex + '_' + secondaryIndex + '_' + parentMenu.name] = parentMenu;
          parentMenu.index = pluginIndex;
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
                                             'bk.notebook'
                                             ]);

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
          $scope.loadingmsg = message;
          if (nodigest !== true && !($scope.$$phase || $scope.$root.$$phase))
            $scope.$digest();
        };
        var updateLoadingStatusMessage = function() {
          if (!($scope.$$phase || $scope.$root.$$phase))
            $scope.$digest();
        };
        var getLoadingStatusMessage = function() {
          return $scope.loadingmsg;
        };
        var clrLoadingStatusMessage = function(message, nodigest) {
          if ($scope.loadingmsg === message) {
            $scope.loadingmsg = "";
            if (nodigest !== true && !($scope.$$phase || $scope.$root.$$phase))
              $scope.$digest();
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
                  name: evaluator.pluginName,
                  items: actionItems
                });
              }
            }
          });
        };

        var loadNotebook = (function() {
          var addScrollingHack = function() {
           
           
           
           
           
           
           
           
            var listener = function(ev) {
              window.scrollTo(0, 0);
              window.removeEventListener('scroll', listener, false);
            };

            $timeout(function() {
              window.scrollTo(0, 0);
              window.addEventListener('scroll', listener, false);
            });
          };
          var loadNotebookModelAndResetSession = function(
              notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId,
              isExistingSession) {
           
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
                   
                    _loadNotebookModelAndResetSession(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId, isExistingSession);
                  }, function() {
                   
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

            addScrollingHack();
            isExistingSession = !!isExistingSession;
            evaluatorMenuItems.splice(0, evaluatorMenuItems.length);

           
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

                  bkHelper.evaluateRoot("initialization").then(function () { if(mustwait !== undefined) mustwait.close(); });
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

              var importer = bkCoreManager.getNotebookImporter(target.format);
              if (!importer) {
                if (retry) {
                 
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
              deferred.resolve({uri: uri, uriType: uriType});
            }, function (reason) {
              if (reason === "exists") {
                promptIfOverwrite(uri).then(function () {
                  saveAlwaysOverwrite(uri, uriType).then(function(ret) {
                    deferred.resolve(ret);
                  }, function(reason) {
                    deferred.reject(reason);
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
                deferred.reject(reason);
              }
            });
          };
          var _savePromptUriChooser = function(deferred, uriType, initUri) {
            promptUriChooser(uriType, initUri).then(function(ret) {
              _savePromptIfOverwrite(deferred, ret.uri, ret.uriType);
            }, function() {
              deferred.reject("cancelled");
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
          var saveDone = function(ret) {
            bkSessionManager.setNotebookModelEdited(false);
            bkSessionManager.updateNotebookUri(ret.uri, ret.uriType, false, "bkr");
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

          var evalCodeId = 0;

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
                thenable = savePromptChooseUri();
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
            closeNotebook: function() {
              var self = this;
              if (bkEvaluateJobManager.isAnyInProgress() ) {
                bkCoreManager.show2ButtonModal(
                    "All running and pending cells will be cancelled.",
                    "Warning!",
                    function() {
                      bkEvaluateJobManager.cancelAll().then(function() {
                        self._closeNotebook();
                      }
                    ); });
              } else
                self._closeNotebook();
            },
            _closeNotebook: function() {
              var self = this;
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
                      self.saveNotebook().then(closeSession);
                    },
                    function() {
                      console.log("close without saving");
                      closeSession();
                    },
                    null, "Save", "Don't save"
                );
              }
            },
            collapseAllSections: function() {
              _.each(this.getNotebookModel().cells, function(cell) {
                if (cell.type == "section") {
                  cell.collapsed = true;
                }
              });
            },
            hasCodeCell: function(toEval) {
              var cellOp = bkSessionManager.getNotebookCellOp();
             
             
             
             
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                 
                  if (cellOp.isContainer(toEval)) {
                   
                   
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                   
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                 
                  if (toEval === "initialization") {
                   
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                   
                   
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                   
                   
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
             
             
             
             
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                 
                  if (cellOp.isContainer(toEval)) {
                   
                   
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                   
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                 
                  if (toEval === "initialization") {
                   
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                   
                   
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                   
                   
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
             
             
             
             
              if (typeof toEval === "string") {
                if (cellOp.hasCell(toEval)) {
                 
                  if (cellOp.isContainer(toEval)) {
                   
                   
                    toEval = cellOp.getAllCodeCells(toEval);
                  } else {
                   
                    toEval = cellOp.getCell(toEval);
                  }
                } else {
                 
                  if (toEval === "initialization") {
                   
                    toEval = bkSessionManager.notebookModelGetInitializationCells();
                  } else if(cellOp.hasUserTag(toEval)) {
                   
                   
                    toEval = cellOp.getCellsWithUserTag(toEval);
                  } else {
                   
                   
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
           
            getCodeCells: function(filter) {
              var cellOp = bkSessionManager.getNotebookCellOp();
             
             
              if (!filter) {
               
                filter = cellOp.getAllCodeCells();
              } else if (typeof filter !== "string")
                return [];
              else if (cellOp.hasCell(filter)) {
               
                if (cellOp.isContainer(filter)) {
                 
                 
                  filter = cellOp.getAllCodeCells(filter);
                } else {
                 
                  filter = cellOp.getCell(filter);
                }
              } else {
               
                if (filter === "initialization") {
                 
                  filter = bkSessionManager.notebookModelGetInitializationCells();
                } else if(cellOp.hasUserTag(filter)) {
                 
                 
                  filter = cellOp.getCellsWithUserTag(filter);
                } else {
                 
                 
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
          if (edited) title = '*' + title;

          document.title = title;
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
        var keydownHandler = function(e) {
          if (e.ctrlKey && !e.altKey && (e.which === 83)) {
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 83)) {
            e.preventDefault();
            _impl.saveNotebook();
            return false;
          } else if (e.target.nodeName !== "TEXTAREA") {
            if (e.ctrlKey && e.which === 90) {
              bkUtils.fcall(function() {
                bkSessionManager.undo();
              });
              return false;
            } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 90)) {
              bkUtils.fcall(function() {
                bkSessionManager.undo();
              });
              return false;
            } else if (e.ctrlKey && e.which === 89) {
              bkUtils.fcall(function() {
                bkSessionManager.redo();
              });
              return false;
            } else if (e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 89)) {
              bkUtils.fcall(function() {
                bkSessionManager.redo();
              });
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

        $scope.filename = function() {
          return bkSessionManager.getNotebookTitle();
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
            if (prompted) {
              return;
            }
            prompted = true;
            bkCoreManager.show2ButtonModal(
                "Beaker server disconnected. Further edits will not be saved.<br>" +
                "Save current notebook as a file?",
                "Disconnected",
                function() {
                 
                  bkSessionManager.dumpDisplayStatus();
                  $timeout(function() {
                    bkUtils.saveAsClientFile(
                        bkSessionManager.getSaveData().notebookModelAsString,
                    "notebook.bkr");
                  }, 1);
                },
                function() {
                 
                  window.addEventListener('keypress', $scope.promptToSave, true);
                },
                "Save", "Not now", "btn-primary", ""
            ).then(function() {
              prompted = false;
            });
          };
        })();

        var connectionManager = (function() {
          var RECONNECT_TIMEOUT = 5000;
          var OFFLINE_MESSAGE = "offline";
          var CONNECTING_MESSAGE = "reconnecting";
          var reconnectTimeout;
          var statusMessage = OFFLINE_MESSAGE;
          var disconnected = false;
          var indicateReconnectFailed = function() {
            stopWaitingReconnect();
            statusMessage = OFFLINE_MESSAGE;
            bkUtils.disconnect();
            $scope.promptToSave();
          };
          var waitReconnect = function() {
            statusMessage = CONNECTING_MESSAGE;

           
            if (!reconnectTimeout) {
              reconnectTimeout = $timeout(indicateReconnectFailed, RECONNECT_TIMEOUT);
            }
           
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
          return job.evaluator.evaluate(job.code, job.output, outputMap[job.cellId]);
        }
        job.output.result = MESSAGE_WAITING_FOR_EVALUTOR_INIT;
        return bkEvaluatorManager.waitEvaluator(job.evaluatorId)
          .then(function(ev) {
            job.evaluator = ev;
            if (ev !== undefined)
              return job.evaluator.evaluate(job.code, job.output, outputMap[job.cellId]);
            return "cannot find evaluator for "+job.evaluatorId;
          } );
      };

      var doNext = function(innext) {
        var job;

        if (_jobInProgress.length == 0) {
         
          job = _queue.shift();
        } else {
         
          var last = _jobInProgress[_jobInProgress.length-1];
          if (last.runchild !== undefined && last.runchild.finished) {
            last.runchild = undefined;
          }
          if (last.finished && last.cancel_deferred !== undefined) {
            var parent, idx;
           
            if (_jobInProgress.length > 1) {
             
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
           
            job = last.children[0];
            last.children.shift();
            last.runchild = job;
          } else if (last.finished && last.children.length === 0) {
           
            if (last.error) {
              last.whendone.reject(last.error);
              if (_jobInProgress.length > 1) {
               
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
     
      evaluate: function(cell, notick) {
        var parent = jobQueue.getCurrentJob();
        if (parent === undefined)
          return this.evaluateRoot(cell);

        var deferred = bkUtils.newDeferred();
        if (jobQueue.isRunning(cell.id)) {
          bkHelper.showTransientStatus("ERROR: restart blocked for cell "+cell.id);
          console.log("RESTART PROHIBITED for cell "+cell.id);
         
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
     
      evaluateRoot: function(cell, notick) {
        var deferred = bkUtils.newDeferred();
        if (jobQueue.isRunning(cell.id)) {
          bkHelper.showTransientStatus("ERROR: restart blocked for cell "+cell.id);
          console.log("RESTART PROHIBITED for cell "+cell.id);
         
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
     
      evaluateAll: function(cells) {
        var self = this;
        var promises = _(cells).map(function(cell) {
          return self.evaluate(cell, true);
        });
        jobQueue.tick();
        return bkUtils.all(promises);
      },
     
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

(function() {
  'use strict';
  var module = angular.module('bk.notebookCellModelManager', []);

 
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
       
        if (segBegin + offset < 0 || segBegin + segLength - 1 + offset >= cells.length) {
          throw 'Illegal shifting, result would be out of bound';
        }
        var slice1 = cells.slice(0, segBegin);
        var slice2 = cells.slice(segBegin, segBegin + segLength);
        var slice3 = cells.slice(segBegin + segLength);
        var toBeMoved;
        if (offset > 0) {
         
          toBeMoved = slice3.splice(0, offset);
          slice1 = slice1.concat(toBeMoved);
        } else {
         
          toBeMoved = slice1.splice(slice1.length + offset, -offset);
          slice3 = toBeMoved.concat(slice3);
        }
        replaceWholeArray(cells, _.flatten([slice1, slice2, slice3]));
        recreateCellMap();
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
       
        return 1 + this._getDecoratedCell(id).allDescendants.length;
      },

     
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
         
          var descendants = this.getAllDescendants(id);
          this.insertAfter(descendants[descendants.length - 1].id, this.clipboard);
        } else {
         
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

(function() {
  'use strict';
  var module = angular.module("bk.notebookNamespaceModelManager", []);

  module.factory("bkNotebookNamespaceModelManager", function() {
    var _subscriptions = {};
    return {
      init: function(sessionId, notebookModel) {
        _subscriptions[sessionId] =
          $.cometd.subscribe("/namespace/" + sessionId, function(reply) {
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

(function() {
  'use strict';
  var module = angular.module('bk.sessionManager',[
    'bk.utils',
    'bk.session',
    'bk.notebookCellModelManager',
    'bk.notebookNamespaceModelManager',
    'bk.recentMenu',
    'bk.evaluatorManager'
  ]);

  module.factory('bkSessionManager', function(
      bkUtils,
      bkSession,
      bkNotebookCellModelManager,
      bkNotebookNamespaceModelManager,
      bkEvaluatorManager,
      bkRecentMenu) {

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
      if(_.isNumber(v))
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
         
         
          bkHelper.refreshRootScope();
        }, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'printError', {value: function(input) {
          bkHelper.receiveEvaluationUpdate(self._beaker_model_output,
                                           {outputdata:[{type:'err', value: input+"\n"}]}, "JavaScript");
         
         
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
      this._beaker_model_output_result = modelOutput.result;
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
     
      this.getCache = { };

     
      for (var p in this.knownBeakerVars) {
        if (this.nbmodel.namespace !== undefined && this.nbmodel.namespace[p] === undefined) {
          delete this.knownBeakerVars[p];
          delete this.beakerObj[p];
          delete this.setCache[p];
        }
      }

     
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

     
      if ( this.nbmodel.namespace !== undefined ) {
        for (var p in this.nbmodel.namespace) {
          if (this.knownBeakerVars[p] !== undefined && keys.indexOf(p) <0) {
            delete this.nbmodel.namespace[p];
            delete this.knownBeakerVars[p];
          }
        }
      }

     
      for (var i in diff) {
        var p = diff[i];
        if (this.knownBeakerVars[p] === undefined) {
          if (this.nbmodel.namespace === undefined)
            this.nbmodel.namespace = { };
          var t = this.beakerObj[p];
          if ((this.predefined.indexOf(p)>=0 || _.isFunction(t))) {
           
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
         
          if (_v._beaker_model_output_result !== undefined) {
            delete _v._beaker_model_output_result;
          }
         
         
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
         
          var shellIds = _(_v.evaluators).map(function(evaluator) {
            var shellId = evaluator.shellID;
            delete evaluator.shellID;
            return shellId;
          });
         
          var prettyJson = bkUtils.toPrettyJson(_v);
         
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

       
        if (_sessionId && !_notebookModel.isEmpty()) {
          bkSession.backup(_sessionId, generateBackupData());
        }

        if (_sessionId)
          disconnectcontrol(_sessionId);

        bkEvaluatorManager.reset();

       
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }

       
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
        _notebookModel.set(notebookModel);
        this.setNotebookModelEdited(!!edited);
        _sessionId = sessionId;

        bkNotebookNamespaceModelManager.init(sessionId, notebookModel);
        connectcontrol(sessionId);
        bkSession.backup(_sessionId, generateBackupData());
      },
      setSessionId: function(sessionId) {
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }
        _sessionId = sessionId;
        return _sessionId;
      },
      setup: function(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId) {

       
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }

       
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
        _notebookModel.set(notebookModel);
        _sessionId = sessionId;

        this.setNotebookModelEdited(_edited);
        bkNotebookNamespaceModelManager.init(sessionId, notebookModel);
        connectcontrol(sessionId);
        bkSession.backup(_sessionId, generateBackupData());
      },
      clear: function() {
        disconnectcontrol(_sessionId);
        bkEvaluatorManager.reset();
        bkNotebookNamespaceModelManager.clear(_sessionId);
        _notebookUri.reset();
        _uriType = null;
        _readOnly = null;
        _format = null;
        _notebookModel.reset();
        _sessionId = null;
        this.setNotebookModelEdited(false);
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
       
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
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
     
     
      setNotebookModelEdited: function(edited) {
        _needsBackup = edited;
        _edited = edited;
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

        $scope.isCodeCell = function() {
          return $scope.cellmodel.type == 'code';
        };
      }
    };
  });

})();

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
         
          if ($scope.cellmodel === undefined || $scope.cellmodel.output === undefined || $scope.cellmodel.output.result === undefined) {
           
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
          if ($scope.cm && evaluator) {
            $scope.cm.setOption('mode', evaluator.cmMode);
            if (evaluator.indentSpaces) {
              $scope.cm.setOption('indentUnit', evaluator.indentSpaces);
            }
            $timeout(function() {
              $scope.cellmodel.evaluatorReader = true;
            });
          }
        };
        $scope.$watch('getEvaluator()', function(newValue, oldValue) {
          $scope.updateUI(newValue);
        });
        $scope.appendCodeCell = function(evaluatorName) {
          var thisCellId = $scope.cellmodel.id;
          if (!evaluatorName) {
           
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
          'Ctrl-Alt-H': function(cm) {
            scope.cellmodel.input.hidden = true;
            bkUtils.refreshRootScope();
          },
          'Cmd-Alt-H': function(cm) {
            scope.cellmodel.input.hidden = true;
            bkUtils.refreshRootScope();
          }
        });

        Scrollin.track(element[0], {handler: function() {
          scope.cm = CodeMirror.fromTextArea(element.find('textarea')[0], codeMirrorOptions);
          scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);
          scope.cm.on('change', changeHandler);
          scope.updateUI(scope.getEvaluator());
         
         
          if (scope._shouldFocusCodeMirror) {
            delete scope._shouldFocusCodeMirror;
            return scope.cm.focus();
          }
        }});

        scope.bkNotebook.registerFocusable(scope.cellmodel.id, scope);

       
        scope.$watch('cellmodel.input.body', function(newVal, oldVal) {
          if (scope.cm && newVal !== scope.cm.getValue()) {
            if (newVal === null) {
              newVal = '';
            }
            scope.cm.setValue(newVal);
            scope.cm.clearHistory();
          }
        });
       
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
              scope.cm.refresh();
            });
          }
        });

        scope.$on('$destroy', function() {
          Scrollin.untrack(element[0]);
          CodeMirror.off(window, 'resize', resizeHandler);
          CodeMirror.off('change', changeHandler);
          scope.cm && scope.cm.off();
          scope.bkNotebook.unregisterFocusable(scope.cellmodel.id);
          scope.bkNotebook.unregisterCM(scope.cellmodel.id);
          scope.bkNotebook = null;
        });
      }
    };
  });

})();

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

(function() {
  'use strict';

 
 
 
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
     
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
       
        return '';
      }
    };
    var out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ' target="_blank"';
    out += '>' + text + '</a>';
    return out;
  }

  bkRenderer.paragraph = function(text) {
   
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

        var preview = function() {
          var markdownFragment = $('<div>' + scope.cellmodel[contentAttribute] + '</div>');
          renderMathInElement(markdownFragment[0], {
            delimiters: [
              {left: "$$", right: "$$", display: true},
              {left: "$", right:  "$", display: false},
              {left: "\\[", right: "\\]", display: true},
              {left: "\\(", right: "\\)", display: false}
            ]
          });
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
         
          if (selection.type == "Range" && $.contains(element[0], selection.focusNode)) {
            return;
          }
          if (bkHelper.isNotebookLocked()) return;
          if (event && event.target.tagName === "A") return;

          scope.mode = 'edit';

          $timeout(function() {
           
           
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
            }
          },
          getViewModel: function () {
            return this._viewModel;
          },
          shareAndOpenPublished: function () {
           
            shareMenu.items[0].action();
          },
          deleteAllOutputCells: function () {
            bkSessionManager.getNotebookCellOp().deleteAllOutputCells();
          },
          _focusables: {},
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
          _impl._viewModel.setEditMode(editMode);
        });
      },
      link: function (scope, element, attrs) {
        var div = element.find('.bkcell').first();
        div.click(function (event) {
         
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
    var CELL_TYPE = "section";
    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/sectioncell"](),
      controller: function($scope) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();

        $scope.cellmodel.collapsed = $scope.cellmodel.collapsed || false;

        $scope.toggleShowChildren = function() {
          $scope.cellmodel.collapsed = !$scope.cellmodel.collapsed;
          $scope.$broadcast('beaker.section.toggled', $scope.cellmodel.collapsed);
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
          name: "Delete cell",
          newName: "Delete heading and keep contents"
        });

        $scope.cellview.menu.addItemToHead({
          name: "Delete section and all sub-sections",
          action: function() {
            notebookCellOp.deleteSection($scope.cellmodel.id, true);
          }
        });
        $scope.cellview.menu.addItem({
          name: "Change Header Level",
          items: [
            {
              name: "H1",
              action: function() {
                $scope.cellmodel.level = 1;
                notebookCellOp.reset();
              }
            },
            {
              name: "H2",
              action: function() {
                $scope.cellmodel.level = 2;
                notebookCellOp.reset();
              }
            },
            {
              name: "H3",
              action: function() {
                $scope.cellmodel.level = 3;
                notebookCellOp.reset();
              }
            },
            {
              name: "H4",
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
                return cell.type === "code";
              })
              .map(function (cell) {
                return cell.evaluator;
              })
              .unique().value();
          var evaluators = bkSessionManager.getRawNotebookModel().evaluators
              .filter(function (evaluator) {
                return _.any(usedEvaluatorsNames, function (ev) {
                  return evaluator.name === ev;
                });
              });
          return bkUtils.generateNotebook(evaluators, cells);
        };

        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.cellview.menu.addItem({
          name: "Run all",
          action: function() {
            bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel.id).
                catch(function(data) {
                  console.error(data);
                });
          }
        });
        var shareMenu = {
          name: "Share",
          items: []
        };
        $scope.cellview.menu.addItem(shareMenu);
        $scope.$watch("getShareMenuPlugin()", function() {
          shareMenu.items = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
        });
        $scope.isInitializationCell = function() {
          return $scope.cellmodel.initialization;
        };
        $scope.cellview.menu.addItem({
          name: "Initialization Cell",
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

(function() {
  "use strict";
  var module = angular.module('bk.outputDisplay', ['bk.utils',  'ngAnimate', 'ngTouch']);
})();

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
        model: "="
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
        "Date": {
          template: "<pre>{{getDate()}}</pre>",
          controller: function($scope) {
            $scope.getDate = function() {
              var model = $scope.model.getCellModel();
              if (model && model.timestamp) {
                var m = moment(model.timestamp);
                return m.format("YYYYMMDD HH:mm:ss.SSS ZZ");
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
          var div = element.find("div").first();
          var cellModel = scope.model.getCellModel();
          div.html(cellModel);
          scope.$watch('model.getCellModel()', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              div.html(newValue);
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
          $scope.items = _($scope.model.getCellModel().items).map(function(it) {
            return {
              result: it
            };
          });
          $scope.isShowMenu = function() { return false; };
        }
      }
    };

    var types = ["Text", "Date", "BeakerStandardOutput", "BeakerStandardError", "Warning", "Error", "Html", "OutputContainer"];
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
     
      "text": ["Text", "Html", "Latex"],
      "Date": ["Date", "Text"],
      "TableDisplay": ["Table", "Text"],
      "html": ["Html"],
      "ImageIcon": ["Image", "Text"],
      "BeakerDisplay": ["BeakerDisplay", "Text"],
      "Plot": ["Plot", "Chart", "Text"],
      "TimePlot": ["Plot", "Chart", "Text"],
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
          if (activePlugins[p])
            status = "active";
          else {
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
       
       
       

        if (status === 'active') {
         
          if (!bkSessionManager.evaluatorUnused(plugin)) {
            return $scope.evalTabOp.showWarning = true;
          }

          bkSessionManager.removeEvaluator(plugin);
          bkCoreManager.getBkApp().removeEvaluator(plugin);
        } else {
         
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
      getEventOffsetX: function(elem, event) {
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

         
         
          if (!_.contains(elem.classList, 'dataframe')) {
            return null;
          }

         
         
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

         
         
         
          var cols = [];
          if (headerRows.length === 2) {
           
           
            var row0 = headerRows.eq(0).find('th');
            var row1 = headerRows.eq(1).find('th');
	    var min = row0.length;
            if (min>row1.length) {
		min = row1.length;
            }
            for (var i = 0; i < min; i++) {
              var r0 = row0.eq(i);
              var r1 = row1.eq(i);

             
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
        return event.button === 1
            || (event.button === 0
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

(function() {
  'use strict';
  var module = angular.module('bk.commonUi', []);
  module.directive('onCtrlEnter', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('keyup', function(event) {
          if (event.ctrlKey && event.keyCode === 13) {
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
  module.directive('bkcell', function() {
    return {
      restrict: 'C',
      link: function(scope, element, attrs) {
        element.mouseover(function(event) {
          element.addClass('cell-bracket-selected');
          event.stopPropagation();
        });
        element.mouseout(function(event) {
          element.removeClass('cell-bracket-selected');
          event.stopPropagation();
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
   
   
   
    return {
      restrict: 'C',
      link: function(scope, element, attrs) {
        $(window).on('click.' + scope.$id, hideDropdown);

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
          $(window).off('.' + scope.$id);
         
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
           
            $compile('<bk-dropdown-menu menu-items="getSubItems()"></bk-dropdown-menu>')(scope, function(cloned, scope) {
           
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
      httpGet: function(url, data) {
        return $http({method: "GET", url: url, params: data});
      },
      httpPost: function(url, data) {
        return $http({
          method: "POST",
          url: url,
          data: $.param(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
      },
      httpPutJson: function(url, data) {
        return $http({
          method: "PUT",
          url: url,
          data: data
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

  treeView.directive("treeView", function($templateCache, $rootScope) {
    return {
      restrict: 'E',
      template: "<tree-node data='root' fs='fs' displayname='{{ rooturi }}'></tree-node>",
      scope: {rooturi: "@", fs: "="},
      controller: function($scope) {
        if (!$templateCache.get('treeNodeChildren.html')) {
          $templateCache.put('treeNodeChildren.html', "<tree-node class='bk-treeview' ng-repeat='d in data.children | fileFilter:fs.filter | orderBy:fs.getOrderBy():fs.getOrderReverse()' data='d' fs='fs'></tree-node>");
        }

        if (!_.string.endsWith($scope.rooturi, '/')) {
          $scope.rooturi = $scope.rooturi + '/';
        }

        $rootScope.fsPrefs = $rootScope.fsPrefs || {
          openFolders: []
        };

        $scope.root = {
          type: "directory",
          uri: $scope.rooturi,
          children: []
        }

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

  treeView.filter("fileFilter", function() {
    return function(children, filter) {
      return _.isFunction(filter) ? _(children).filter(filter) : children;
    };
  })

  treeView.directive("treeNode", function() {
    return {
      restrict: 'E',
      template: "<span ng-dblclick='dblClick()' ng-click='click()'><i class='{{ getIcon() }}'></i> <span>{{ getDisplayName() }}</span></span>" +
          "<div class='pushright'>" +
          "<div ng-include='\"treeNodeChildren.html\"'></div>" +
          "</div>",
      scope: {data: "=", fs: "=", displayname: "@"},
      controller: function($scope, $rootScope) {
        var transform = function(c) {
          return {
            type: c.type,
            uri: c.uri,
            modified: c.modified,
            displayName: c.displayName,
            children: _.map(c.children, transform)
          }
        };
        $scope.click = function() {
          if ($scope.data.type === 'directory') {
            var uri = $scope.data.uri;
            if (!_.string.endsWith(uri, '/')) {
              uri = uri + '/';
            }
            $scope.fs.fillInput(uri);
           
            if (!_.isEmpty($scope.data.children)) {
              $scope.data.children.splice(0, $scope.data.children.length);
              $rootScope.fsPrefs.openFolders = _.reject($rootScope.fsPrefs.openFolders, function(folder) {
                return _.string.startsWith(folder, uri);
              });
            } else {
              $rootScope.fsPrefs.openFolders.push(uri);
              $scope.fs.getChildren($scope.data.uri).success(function(children) {
                children = _.sortBy(children, function(c) {
                  if (c.type === "directory") {
                    return "!!!!!" + c.uri.toLowerCase();
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
          if ($scope.data.type === 'directory') return;

          $scope.fs.open($scope.data.uri);
        };
        $scope.getIcon = function() {
          if ($scope.data.type === "directory") {
            return 'folder-icon';
          }
          if ($scope.data.type === "application/prs.twosigma.beaker.notebook+json") {
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

(function() {
  'use strict';
  var module = angular.module('bk.notebookVersionManager', []);

  var bkNbV1Converter = (function() {
   
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
       
        if (angular.isString(notebook)) {
          try {
            notebook = angular.fromJson(notebook);
           
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

       
       
        if (_.isUndefined(notebook.beaker)) {
          notebook.beaker = "1";
        }
       
        if (notebook.beaker === "1") {
          notebook = bkNbV1Converter.convert(notebook);
        } else if (notebook.beaker === "2") {
         
        } else {
          throw "Unknown Beaker notebook version";
        }

        return notebook;
      }
    };
  });
})();

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
      refreshMenu();
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

(function() {
  'use strict';
  var module = angular.module('bk.session', ['bk.utils']);
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
      backup: backupSession,
      close: closeSession,
      recordLoadedPlugin: recordLoadedPlugin,
      getPlugins: getPlugins
    };
  });
})();

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
         
         
         
        };
        return {
          publish: noOp,
          getSharableUrl: noOp
        };
      }
     
     
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
         
          if (_trackingService.enable && _.isFunction(_trackingService.enable)) {
            _trackingService.enable();
          }
        },
        disable: function() {
         
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

(function() {
  'use strict';
  var module = angular.module('bk.utils', [
    'bk.commonUtils',
    'bk.angularUtils',
    'bk.cometdUtils',
    'bk.track'
  ]);
    module.factory('bkUtils', function(commonUtils, angularUtils, bkTrack, cometdUtils) {

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
    var serverRoot = endsWith(document.baseURI, 'beaker/') ? document.baseURI.substring(0,document.baseURI.length-7): document.baseURI;
    
    function serverUrl(path) {
      return serverRoot + path;
    }

    var fileRoot = document.baseURI;
    
    function fileUrl(path) {
      return fileRoot + path;
    }

   
   
    function parseAjaxLocator(locator) {
      var pieces = locator.split(":");
      return { source: pieces[1], destination: pieces[2] }
    }

    var bkUtils = {
        serverUrl: serverUrl,
        fileUrl: fileUrl,

     
      log: function(event, obj) {
        bkTrack.log(event, obj);
      },

     
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

     
      refreshRootScope: function() {
        angularUtils.refreshRootScope();
      },
      toPrettyJson: function(jsObj) {
        return angularUtils.toPrettyJson(jsObj);
      },
      fromPrettyJson: function(jString) {
        return angularUtils.fromPrettyJson(jString);
      },
      httpGet: function(url, data) {
        return angularUtils.httpGet(url, data);
      },
      httpPost: function(url, data) {
        return angularUtils.httpPost(url, data);
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

     
      getHomeDirectory: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getHomeDirectory"))
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
               
               
                content = JSON.stringify(content);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },
      loadAjax: function(ajaxLocator) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(parseAjaxLocator(ajaxLocator).source)
            .success(function(content) {
              if (!_.isString(content)) {
               
               
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
        angularUtils.httpPutJson(destination, {data: contentAsJson})
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

     
      moduleMap: {},
      loadModule: function(url, name) {
       
        var that = this;
        if (_.isString(url)) {
          var deferred = this.newDeferred();
          window.require([url], function (ret) {
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
      }
    };
    return bkUtils;
  });
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImNvbnRyb2xwYW5lbC5qcyIsImNvbnRyb2xwYW5lbC1kaXJlY3RpdmUuanMiLCJjb250cm9scGFuZWxzZXNzaW9uaXRlbS1kaXJlY3RpdmUuanMiLCJjZWxsbWVudXBsdWdpbm1hbmFnZXIuanMiLCJjb3JlLmpzIiwiZGVidWcuanMiLCJldmFsdWF0ZXBsdWdpbm1hbmFnZXIuanMiLCJoZWxwZXIuanMiLCJtZW51cGx1Z2lubWFuYWdlci5qcyIsIm5vdGVib29rLXJvdXRlci5qcyIsIm1haW5hcHAuanMiLCJldmFsdWF0ZWpvYm1hbmFnZXIuanMiLCJldmFsdWF0b3JtYW5hZ2VyLmpzIiwibm90ZWJvb2tjZWxsbW9kZWxtYW5hZ2VyLmpzIiwibm90ZWJvb2tuYW1lc3BhY2Vtb2RlbG1hbmFnZXIuanMiLCJzZXNzaW9ubWFuYWdlci5qcyIsIm5vdGVib29rLmpzIiwiY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbGlucHV0bWVudS1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dG1lbnUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd24tZWRpdGFibGUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd25jZWxsLWRpcmVjdGl2ZS5qcyIsIm5ld2NlbGxtZW51LWRpcmVjdGl2ZS5qcyIsIm5vdGVib29rLWRpcmVjdGl2ZS5qcyIsInNlY3Rpb25jZWxsLWRpcmVjdGl2ZS5qcyIsInRleHRjZWxsLWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXkuanMiLCJvdXRwdXRkaXNwbGF5LWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXlmYWN0b3J5LXNlcnZpY2UuanMiLCJvdXRwdXRkaXNwbGF5c2VydmljZW1hbmFnZXItc2VydmljZS5qcyIsInBsdWdpbm1hbmFnZXItZGlyZWN0aXZlLmpzIiwicGx1Z2lubWFuYWdlcmV2YWx1YXRvcnNldHRpbmdzLWRpcmVjdGl2ZS5qcyIsImNvZGVjZWxsb3B0aW9ucy1kaXJlY3RpdmUuanMiLCJjb21tb251dGlscy5qcyIsImNvbW1vbnVpLmpzIiwiYW5ndWxhcnV0aWxzLmpzIiwidHJlZXZpZXcuanMiLCJjb21ldGR1dGlscy5qcyIsIm5vdGVib29rdmVyc2lvbm1hbmFnZXIuanMiLCJvdXRwdXRsb2cuanMiLCJyZWNlbnRtZW51LmpzIiwic2Vzc2lvbi5qcyIsInNoYXJlLmpzIiwidHJhY2suanMiLCJ1dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9yQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcm1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuaUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDemFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJiZWFrZXJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJjb250cm9scGFuZWwvY29udHJvbHBhbmVsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48aGVhZGVyIGNsYXNzPVwibmF2YmFyLWZpeGVkLXRvcCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWludmVyc2UgYmtyXCI+XFxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kIGJrclwiIGhyZWY9XCIvYmVha2VyLyMvY29udHJvbFwiIG5nLWNsaWNrPVwiZ290b0NvbnRyb2xQYW5lbCgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgPGltZyBzcmM9XCJhcHAvaW1hZ2VzL2JlYWtlcl9pY29uQDJ4LnBuZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgQmVha2VyXFxuICAgIDwvYT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBia3JcIj5cXG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgYmtyXCI+XFxuICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24gYmtyXCIgbmctcmVwZWF0PVwibSBpbiBnZXRNZW51cygpXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSB7e20uaWR9fSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+e3ttLm5hbWV9fTwvYT5cXG4gICAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJtLml0ZW1zXCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgICAgPC9saT5cXG4gICAgICA8cCBuZy1pZj1cImRpc2Nvbm5lY3RlZFwiIGNsYXNzPVwibmF2YmFyLXRleHQgdGV4dC1kYW5nZXIgcmlnaHQgYmtyXCI+XFxuICAgICAgICBvZmZsaW5lXFxuICAgICAgPC9wPlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XFxuPC9oZWFkZXI+XFxuXFxuPGRpdiBjbGFzcz1cImRhc2hib2FyZCBjb250YWluZXItZmx1aWQgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGJrclwiPlxcblxcbiAgICAgIDxoMSBjbGFzcz1cImJrclwiPkJlYWtlciA8c21hbGwgY2xhc3M9XCJia3JcIj5UaGUgZGF0YSBzY2llbnRpc3RcXCdzIGxhYm9yYXRvcnk8L3NtYWxsPjwvaDE+XFxuXFxuICAgICAgPGRpdiBuZy1pZj1cImlzU2Vzc2lvbnNMaXN0RW1wdHkoKVwiIGNsYXNzPVwiZW1wdHktc2Vzc2lvbi1wcm9tcHQgYmtyXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVwiYmtyXCI+Q2xpY2sgYmVsb3cgdG8gZ2V0IHN0YXJ0ZWQgY29kaW5nIGluIFB5dGhvbiwgUiwgSmF2YVNjcmlwdCwgSnVsaWEsIFNjYWxhLCBKYXZhLCBHcm9vdnksIGFuZCBSdWJ5LiA8YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICBCZWdpbm5lcnMgc2hvdWxkIGNoZWNrIG91dCB0aGUgPHN0cm9uZyBjbGFzcz1cImJrclwiPkhlbHAg4oaSIFR1dG9yaWFsPC9zdHJvbmc+LjwvcD5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IG5nLWhpZGU9XCJpc1Nlc3Npb25zTGlzdEVtcHR5KClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVwib3Blbi1ub3RlYm9vay1oZWFkbGluZSBia3JcIj5PcGVuIE5vdGVib29rczwvaDQ+XFxuICAgICAgICA8YmstY29udHJvbC1wYW5lbC1zZXNzaW9uLWl0ZW0gY2xhc3M9XCJvcGVuLW5vdGVib29rcyBia3JcIj48L2JrLWNvbnRyb2wtcGFuZWwtc2Vzc2lvbi1pdGVtPlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbmV3LW5vdGVib29rIGJrclwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB0ZXh0LWNlbnRlciBidG4tYmxvY2sgYmtyXCIgbmctY2xpY2s9XCJuZXdOb3RlYm9vaygpXCI+TmV3IERlZmF1bHQgTm90ZWJvb2s8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgdGV4dC1jZW50ZXIgYnRuLWJsb2NrIG5ldy1lbXB0eS1ub3RlYm9vayBia3JcIiBuZy1jbGljaz1cIm5ld0VtcHR5Tm90ZWJvb2soKVwiPk5ldyBFbXB0eSBOb3RlYm9vazwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy02IGJrclwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmF1eC1kcm9wLXpvbmUgYmtyXCI+XFxuICAgICAgICAgICAgT3IgZHJhZyBhIC5ia3IgZmlsZSBhbnl3aGVyZSBvbiB0aGlzIHBhZ2UgdG8gaW1wb3J0XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiIG5nLXNob3c9XCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPT0gbnVsbFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgd2VsbCBia3JcIj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGIgY2xhc3M9XCJia3JcIj5UcmFjayBhbm9ueW1vdXMgdXNhZ2UgaW5mbz88L2I+XFxuICAgICAgPC9wPlxcblxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICBXZSB3b3VsZCBsaWtlIHRvIGNvbGxlY3QgYW5vbnltb3VzIHVzYWdlIGluZm8gdG8gaGVscCBpbXByb3ZlIG91ciBwcm9kdWN0LiBXZSBtYXkgc2hhcmUgdGhpcyBpbmZvcm1hdGlvblxcbiAgICAgICAgd2l0aCBvdGhlciBwYXJ0aWVzLCBpbmNsdWRpbmcsIGluIHRoZSBzcGlyaXQgb2Ygb3BlbiBzb2Z0d2FyZSwgYnkgbWFraW5nIGl0IHB1YmxpY2x5IGFjY2Vzc2libGUuPGJyIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPC9wPlxcblxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9wcml2YWN5XCIgY2xhc3M9XCJia3JcIj5Qcml2YWN5IHBvbGljeTwvYT4gLSA8YSBjbGFzcz1cImN1cnNvcl9oYW5kIGJrclwiIG5nLWNsaWNrPVwic2hvd1doYXRXZUxvZygpXCI+V2hhdCB3aWxsIHdlIGxvZz88L2E+XFxuICAgICAgPC9wPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgYmtyXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiIG5nLWNsaWNrPVwiaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gZmFsc2VcIj5ObywgZG9uXFwndCB0cmFjazwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tYWN0aXZlIGJrclwiIG5nLWNsaWNrPVwiaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gdHJ1ZVwiPlllcywgdHJhY2sgbXkgaW5mbzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiY29udHJvbHBhbmVsL3RhYmxlXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48dWwgY2xhc3M9XCJub3RlYm9vay1kYXNoYm9hcmQtbGlzdCBia3JcIj5cXG4gIDxsaSBjbGFzcz1cInNlc3Npb24gY2xlYXJmaXggYmtyXCIgbmctcmVwZWF0PVwic2Vzc2lvbiBpbiBzZXNzaW9ucyB8IG9yZGVyQnk6JnF1b3Q7b3BlbmVkRGF0ZSZxdW90Ozp0cnVlXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnQgYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNhcHRpb24gYmtyXCIgbmctY2xpY2s9XCJvcGVuKHNlc3Npb24pXCI+e3tnZXRDYXB0aW9uKHNlc3Npb24pfX08L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwibGlnaHQgcGF0aCBia3JcIiBuZy1pZj1cImdldERlc2NyaXB0aW9uKHNlc3Npb24pXCI+XFxuICAgICAgICB7e2dldERlc2NyaXB0aW9uKHNlc3Npb24pfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBwdWxsLXJpZ2h0IGNsb3NlLXNlc3Npb24gYmtyXCIgbmctY2xpY2s9XCJjbG9zZShzZXNzaW9uKVwiPkNsb3NlPC9hPlxcbiAgICA8ZGl2IGNsYXNzPVwib3Blbi1kYXRlIGxpZ2h0IHB1bGwtcmlnaHQgYmtyXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJia3JcIj5PcGVuZWQgb248L3NwYW4+XFxuICAgICAge3tzZXNzaW9uLm9wZW5lZERhdGUgfCBkYXRlOlxcJ21lZGl1bVxcJ319XFxuICAgIDwvZGl2PlxcbiAgPC9saT5cXG48L3VsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiY29udHJvbHBhbmVsL3doYXRfd2VfbG9nXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJrclwiPlxcbiAgPGgzIGNsYXNzPVwiYmtyXCI+V2hhdCB3aWxsIHdlIGxvZzwvaDM+XFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8YiBjbGFzcz1cImJrclwiPldoYXQgd2UgbG9nOjwvYj5cXG4gIDwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+V2UgdXNlIEdvb2dsZSBBbmFseXRpY3MgdG8gY29sbGVjdCB1c2FnZSBpbmZvLiBHb29nbGUgQW5hbHl0aWNzIGNvbGxlY3RzIGRhdGEgc3VjaCBhcyBob3cgbG9uZyB5b3Ugc3BlbmQgaW4gQmVha2VyLCB3aGF0IGJyb3dzZXIgeW91XFwncmUgdXNpbmcsIGFuZCB5b3VyIGdlb2dyYXBoaWMgcmVnaW9uLjwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+SW4gYWRkaXRpb24gdG8gdGhlIHN0YW5kYXJkIEdvb2dsZSBBbmFseXRpY3MgY29sbGVjdGlvbiwgd2VcXCdyZSBsb2dnaW5nIGhvdyBtYW55IHRpbWVzIHlvdSBydW4gY2VsbHMgaW4gZWFjaCBsYW5ndWFnZSBhbmQgd2hhdCB0eXBlcyBvZiBub3RlYm9va3MgeW91IG9wZW4gKGxvY2FsIC5ia3IgZmlsZSwgcmVtb3RlIC5pcHluYiwgZXQgY2V0ZXJhKS48L3A+XFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8YiBjbGFzcz1cImJrclwiPldoYXQgd2UgPGkgY2xhc3M9XCJia3JcIj5kb25cXCd0PC9pPiBsb2c6PC9iPlxcbiAgPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5XZSB3aWxsIG5ldmVyIGxvZyBhbnkgb2YgdGhlIGNvZGUgeW91IHJ1biBvciB0aGUgbmFtZXMgb2YgeW91ciBub3RlYm9va3MuPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5QbGVhc2Ugc2VlIG91ciA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9wcml2YWN5XCIgY2xhc3M9XCJia3JcIj5wcml2YWN5IHBvbGljeTwvYT4gZm9yIG1vcmUgaW5mb3JtYXRpb24uPC9wPlxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyXCI+XFxuICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImNsb3NlKClcIj5Hb3QgaXQ8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImhlbHBlcnMvcGx1Z2luLWxvYWQtZXJyb3JcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5MYW5ndWFnZSBFcnJvcjwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5GYWlsZWQgdG8gc3RhcnQgJyArXG4oKF9fdCA9IChwbHVnaW5JZCkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJy48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5EaWQgeW91IGluc3RhbGwgaXQgYWNjb3JkaW5nIHRvIHRoZSBpbnN0cnVjdGlvbnNcXG5vbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9nZXR0aW5nLXN0YXJ0ZWQjJyArXG4oKF9fdCA9IChwbHVnaW5JZCkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJ1wiIGNsYXNzPVwiYmtyXCI+QmVha2VyTm90ZWJvb2suY29tPC9hPj9cXG48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5JZiB5b3UgYWxyZWFkeSBoYXZlIGl0LCB0aGVuIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdHdvc2lnbWEvYmVha2VyLW5vdGVib29rL3dpa2kvTGFuZ3VhZ2UtUHJlZmVyZW5jZXNcIiBjbGFzcz1cImJrclwiPmVkaXRcXG55b3VyIHByZWZlcmVuY2VzIGZpbGU8L2E+IHRvIGhlbHAgQmVha2VyIGZpbmQgaXQgb24geW91ciBzeXN0ZW0sIGFuZFxcbnRoZW4gcmVzdGFydCBCZWFrZXIgYW5kIHRyeSBhZ2Fpbi5cXG48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5Bbnkgb3RoZXIgbGFuZ3VhZ2VzIGluIHlvdXIgbm90ZWJvb2sgc2hvdWxkIHN0aWxsIHdvcmsuPC9wPlxcblxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyIGJrclwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJlYWtlci1idG4gYWN0aXZlIGJrclwiIG5nLWNsaWNrPVwiJGNsb3NlKClcIj5PSzwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvZHJvcGRvd25cIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVcIj5cXG4gIDxiay1kcm9wZG93bi1tZW51LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiBnZXRNZW51SXRlbXMoKSB8IGZpbHRlcjppc0hpZGRlbiB8IG9yZGVyQnk6XFwnc29ydG9yZGVyXFwnXCIgaXRlbT1cIml0ZW1cIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudS1pdGVtPlxcbjwvdWw+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kcm9wZG93bl9pdGVtXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48bGkgbmctY2xhc3M9XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIiBjbGFzcz1cImJrclwiPlxcbiAgPGEgaHJlZj1cIiNcIiB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJydW5BY3Rpb24oaXRlbSlcIiBuZy1jbGFzcz1cImdldEFDbGFzcyhpdGVtKVwiIGlkPVwie3tpdGVtLmlkfX1cIiB0aXRsZT1cInt7aXRlbS50b29sdGlwfX1cIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlxcbiAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2sgYmtyXCIgbmctc2hvdz1cImlzTWVudUl0ZW1DaGVja2VkKGl0ZW0pXCI+PC9pPlxcbiAgICB7e2dldE5hbWUoaXRlbSl9fVxcbiAgPC9hPlxcbjwvbGk+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9maWxlYWN0aW9uZGlhbG9nXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJrclwiPlxcbiAgPGgxIGNsYXNzPVwiYmtyXCI+e3thY3Rpb25OYW1lfX08L2gxPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGJrclwiPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5QYXRoOiA8aW5wdXQgbmFtZT1cInt7aW5wdXRJZH19XCIgbmctbW9kZWw9XCJyZXN1bHRcIiBjbGFzcz1cImJrclwiPjwvcD5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShyZXN1bHQpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYmtyXCI+e3thY3Rpb25OYW1lfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL29wZW5ub3RlYm9va1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIj5cXG4gICA8aDEgY2xhc3M9XCJia3JcIj57eyBnZXRTdHJhdGVneSgpLnRpdGxlIHx8IFxcJ09wZW5cXCd9fTxzcGFuIG5nLXNob3c9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2hvd1NwaW5uZXJcIiBjbGFzcz1cImJrclwiPjxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGJrclwiPjwvaT48L3NwYW4+PC9oMT5cXG4gICA8ZGl2IGNsYXNzPVwiZmlsdGVycy1hbmQtc29ydHMgYmtyXCI+XFxuICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gYmtyXCI+XFxuICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxcbiAgICAgICAgIFNvcnQgYnk6IHt7Z2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmdldFByZXR0eU9yZGVyQnkoKX19XFxuICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCI+XFxuICAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCd1cmlcXCcsIHJldmVyc2U6IGZhbHNlIH0pXCIgY2xhc3M9XCJia3JcIj5OYW1lPC9hPjwvbGk+XFxuICAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCdtb2RpZmllZFxcJywgcmV2ZXJzZTogdHJ1ZSB9KVwiIGNsYXNzPVwiYmtyXCI+RGF0ZSBNb2RpZmllZDwvYT48L2xpPlxcbiAgICAgICA8L3VsPlxcbiAgICAgPC9kaXY+XFxuICAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZml4ZWQgYmtyXCI+XFxuICAgPHRyZWUtdmlldyByb290dXJpPVwiL1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG4gICA8dHJlZS12aWV3IHJvb3R1cmk9XCInICtcbl9fZSggaG9tZWRpciApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIj5cXG4gICA8ZGl2IGNsYXNzPVwidGV4dC1sZWZ0IGJrclwiPkVudGVyIGEgZmlsZSBwYXRoIChlLmcuIC9Vc2Vycy8uLi4pIG9yIFVSTCAoZS5nLiBodHRwOi8vLi4uKTo8L2Rpdj5cXG4gICA8cCBjbGFzcz1cImJrclwiPjxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImdldFN0cmF0ZWd5KCkuaW5wdXRcIiBuZy1rZXlwcmVzcz1cImdldFN0cmF0ZWd5KCkuY2xvc2UoJGV2ZW50LCBjbG9zZSlcIiBmb2N1cy1zdGFydD1cIlwiPjwvcD5cXG4gICA8c3BhbiBzdHlsZT1cImZsb2F0OmxlZnRcIiBuZy1pZj1cImdldFN0cmF0ZWd5KCkuZXh0ID09PSB1bmRlZmluZWRcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPVwidmVydGljYWwtYWxpZ246dG9wXCIgbmctbW9kZWw9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXJcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgPHNwYW4gbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXIgPSAhZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmFwcGx5RXh0RmlsdGVyXCIgY2xhc3M9XCJia3JcIj5zaG93ICcgK1xuKChfX3QgPSAoIGV4dGVuc2lvbiApKSA9PSBudWxsID8gJycgOiBfX3QpICtcbicgZmlsZXMgb25seTwvc3Bhbj5cXG4gICA8L3NwYW4+XFxuICAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoZ2V0U3RyYXRlZ3koKS5nZXRSZXN1bHQoKSlcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBtb2RhbC1zdWJtaXQgYmtyXCI+e3sgZ2V0U3RyYXRlZ3koKS5jbG9zZWJ0biB8fCBcXCdPcGVuXFwnfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL3NhdmVub3RlYm9va1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPlNhdmUgPHNwYW4gbmctc2hvdz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5zaG93U3Bpbm5lclwiIGNsYXNzPVwiYmtyXCI+XFxuICA8aSBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBia3JcIj48L2k+PC9zcGFuPjwvaDE+XFxuICA8ZGl2IGNsYXNzPVwiZmlsdGVycy1hbmQtc29ydHMgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia3JcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBkcm9wZG93bi10b2dnbGUgYmtyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cXG4gICAgICAgIFNvcnQgYnk6IHt7Z2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmdldE9yZGVyQnkoKX19XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiPlxcbiAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCd1cmlcXCcsIHJldmVyc2U6IGZhbHNlIH0pXCIgY2xhc3M9XCJia3JcIj5OYW1lPC9hPjwvbGk+XFxuICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ21vZGlmaWVkXFwnLCByZXZlcnNlOiB0cnVlIH0pXCIgY2xhc3M9XCJia3JcIj5EYXRlIE1vZGlmaWVkPC9hPjwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBia3JcIiBzdHlsZT1cInBhZGRpbmctYm90dG9tOiAxMDZweFwiPiBcXG4gIDx0cmVlLXZpZXcgcm9vdHVyaT1cIi9cIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICA8dHJlZS12aWV3IHJvb3R1cmk9XCInICtcbl9fZSggaG9tZWRpciApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICA8dHJlZS12aWV3IG5nLWlmPVwiXFwnJyArXG5fX2UoIGhvbWVkaXIgKSArXG4nXFwnICE9IFxcJycgK1xuX19lKCBwd2QgKSArXG4nXFwnXCIgcm9vdHVyaT1cIicgK1xuX19lKCBwd2QgKSArXG4nXCIgZnM9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnNcIiBjbGFzcz1cImJrclwiPjwvdHJlZS12aWV3PlxcbiAgXFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogMTA2cHhcIj4gXFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8aW5wdXQgaWQ9XCJzYXZlQXNGaWxlSW5wdXRcIiBjbGFzcz1cImxlZnQgYmtyXCIgbmctbW9kZWw9XCJnZXRTdHJhdGVneSgpLmlucHV0XCIgbmcta2V5cHJlc3M9XCJnZXRTdHJhdGVneSgpLmNsb3NlKCRldmVudCwgY2xvc2UpXCIgZm9jdXMtc3RhcnQ9XCJcIj5cXG4gICAgPGkgY2xhc3M9XCJuZXctZm9sZGVyIGJrLWljb24gYmtyXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJNYWtlIG5ldyBkaXJlY3RvcnkgKHt7Z2V0U3RyYXRlZ3koKS5pbnB1dH19KVwiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS5uZXdGb2xkZXIoZ2V0U3RyYXRlZ3koKS5pbnB1dClcIj48L2k+XFxuICA8L3A+XFxuICA8c3BhbiBzdHlsZT1cImZsb2F0OmxlZnRcIiBjbGFzcz1cImJrclwiPnt7Z2V0U3RyYXRlZ3koKS5nZXRSZXN1bHQoKX19PC9zcGFuPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShnZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJrclwiIG5nLWRpc2FibGVkPVwiZ2V0U3RyYXRlZ3koKS5nZXRTYXZlQnRuRGlzYWJsZWQoKVwiPlNhdmU8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvZGlhbG9ncy9jb2RlY2VsbG9wdGlvbnNcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5Db2RlIENlbGwgT3B0aW9uczwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ob3Jpem9udGFsIGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwiY2VsbC1pZFwiIGNsYXNzPVwiY29udHJvbC1sYWJlbCBjb2wtc20tMiBia3JcIj5JZDwvbGFiZWw+XFxuICAgICAgPGRpdiBuZy1jbGFzcz1cImlzRXJyb3IoKSA/IFxcJ2NvbC1zbS03XFwnIDogXFwnY29sLXNtLTEwXFwnXCIgY2xhc3M9XCJia3JcIj48aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJjZWxsTmFtZVwiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBia3JcIiBuZy1pZj1cImlzRXJyb3IoKVwiPjxzcGFuIGNsYXNzPVwiaGVscC1pbmxpbmUgYmtyXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj57e2dldE5hbWVFcnJvcigpfX08L3NwYW4+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwiY2VsbC10YWdzXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsIGNvbC1zbS0yIGJrclwiPlRhZ3M8L2xhYmVsPlxcbiAgICAgIDxkaXYgbmctY2xhc3M9XCJpc0Vycm9yKCkgPyBcXCdjb2wtc20tN1xcJyA6IFxcJ2NvbC1zbS0xMFxcJ1wiIGNsYXNzPVwiYmtyXCI+PGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJrclwiIG5nLW1vZGVsPVwiY2VsbFRhZ3NcIj48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgYmtyXCIgbmctaWY9XCJpc0Vycm9yKClcIj48c3BhbiBjbGFzcz1cImhlbHAtaW5saW5lIGJrclwiIHN0eWxlPVwiY29sb3I6cmVkXCI+e3tnZXRUYWdFcnJvcigpfX08L3NwYW4+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLW9mZnNldC0yIGNvbC1zbS0xMCBia3JcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGVja2JveCBia3JcIj5cXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwiaW5pdGlhbGl6YXRpb25DZWxsXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICBJbml0aWFsaXphdGlvbiBDZWxsXFxuICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJzYXZlKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBia3JcIiBuZy1jbGFzcz1cInNhdmVEaXNhYmxlZCgpICZhbXA7JmFtcDsgXFwnZGlzYWJsZWRcXCdcIj5TYXZlPC9idXR0b24+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kYXNoYm9hcmQvYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICc8YmstY29udHJvbC1wYW5lbCBjbGFzcz1cImJrclwiPjwvYmstY29udHJvbC1wYW5lbD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL21haW5hcHAvYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICc8YmstbWFpbi1hcHAgc2Vzc2lvbi1pZD1cInt7c2Vzc2lvbklkfX1cIiBuZXctc2Vzc2lvbj1cInt7bmV3U2Vzc2lvbn19XCIgaW1wb3J0PVwie3tpc0ltcG9ydH19XCIgb3Blbj1cInt7aXNPcGVufX1cIiBub3RlYm9vaz1cIm5vdGVib29rXCIgY2xhc3M9XCJia3JcIj5cXG48L2JrLW1haW4tYXBwPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvbWFpbmFwcC9tYWluYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48aGVhZGVyIGNsYXNzPVwibmF2YmFyLWZpeGVkLXRvcCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWludmVyc2UgYmtyXCI+XFxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kIGJrclwiIGhyZWY9XCIvYmVha2VyLyMvY29udHJvbFwiIG5nLWNsaWNrPVwiZ290b0NvbnRyb2xQYW5lbCgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgPGltZyBzcmM9XCJhcHAvaW1hZ2VzL2JlYWtlcl9pY29uQDJ4LnBuZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgQmVha2VyXFxuICAgIDwvYT5cXG4gICAgPHAgY2xhc3M9XCJuYXZiYXItdGV4dCBia3JcIj57e2ZpbGVuYW1lKCl9fTwvcD5cXG4gICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdGV4dCBia3JcIiBuZy1pZj1cImxvYWRpbmcgfHwgISFsb2FkaW5nbXNnXCI+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoIGZhLXNwaW4gdGV4dC13aGl0ZSBia3JcIj48L2k+XFxuICAgIDwvc3Bhbj5cXG4gICAgPGRpdiBjbGFzcz1cIm5hdmJhci10ZXh0IHRleHQtd2hpdGUgbG9hZGluZ21zZyBia3JcIiBuZy1pZj1cImxvYWRpbmcgfHwgISFsb2FkaW5nbXNnXCI+XFxuICAgICAge3tsb2FkaW5nbXNnfX1cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgYmtyXCI+XFxuICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2IGJrclwiPlxcbiAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duIGJrclwiIG5nLXJlcGVhdD1cIm0gaW4gZ2V0TWVudXMoKVwiPlxcbiAgICAgICAgPGEgaHJlZj1cIiNcIiByb2xlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgYmtyXCIgbmctY2xhc3M9XCJtLmNsYXNzTmFtZXNcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+e3ttLm5hbWV9fTwvYT5cXG4gICAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJtLml0ZW1zXCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgICAgPC9saT5cXG4gICAgPC91bD5cXG4gICAgPHAgbmctaWY9XCJpc0VkaXRlZCgpXCIgY2xhc3M9XCJuYXZiYXItdGV4dCB0ZXh0LXN1Y2Nlc3MgcHVsbC1yaWdodCBia3JcIj5lZGl0ZWQ8L3A+XFxuICAgIDxwIG5nLWlmPVwiaXNEaXNjb25uZWN0ZWQoKVwiIGNsYXNzPVwibmF2YmFyLXRleHQgcHVsbC1yaWdodCBia3JcIj5cXG4gICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgY2xhc3M9XCJuYXZiYXItbGluayB0ZXh0LWRhbmdlciBia3JcIiBuZy1jbGljaz1cInByb21wdFRvU2F2ZSgpXCIgZWF0LWNsaWNrPVwiXCI+e3tnZXRPZmZpbmVNZXNzYWdlKCl9fTwvYT5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuPC9oZWFkZXI+XFxuXFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZCBub3RlYm9vay1jb250YWluZXIgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGJrclwiPlxcbiAgICAgIDxiay1ub3RlYm9vayBzZXQtYmstbm90ZWJvb2s9XCJzZXRCa05vdGVib29rKGJrTm90ZWJvb2spXCIgaXMtbG9hZGluZz1cImxvYWRpbmdcIiBjbGFzcz1cImJrclwiPjwvYmstbm90ZWJvb2s+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICBcXG4gIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDMwMHB4XCIgY2xhc3M9XCJia3JcIj48L2Rpdj5cXG5cXG48L2Rpdj5cXG5cXG5cXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L25nLXRlbXBsYXRlXCIgaWQ9XCJzZWN0aW9uLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8Ymstc2VjdGlvbi1jZWxsPjwvYmstc2VjdGlvbi1jZWxsPlxcbjwvc2NyaXB0PlxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cInRleHQtY2VsbC5odG1sXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbGxcIj5cXG4gICAgPGJrLXRleHQtY2VsbD48L2JrLXRleHQtY2VsbD5cXG4gIDwvZGl2Plxcbjwvc2NyaXB0PlxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cIm1hcmtkb3duLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstbWFya2Rvd24tY2VsbD48L2JrLW1hcmtkb3duLWNlbGw+XFxuPC9zY3JpcHQ+XFxuPHNjcmlwdCB0eXBlPVwidGV4dC9uZy10ZW1wbGF0ZVwiIGlkPVwiY29kZS1jZWxsLmh0bWxcIiBjbGFzcz1cImJrclwiPlxcbiAgPGJrLWNvZGUtY2VsbCBjZWxsbW9kZWw9XCJjZWxsbW9kZWxcIiBjZWxsbWVudT1cImNlbGx2aWV3Lm1lbnVcIiBpbmRleD1cIiRpbmRleFwiPjwvYmstY29kZS1jZWxsPlxcbjwvc2NyaXB0Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlclwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cImJrclwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogNjlweFwiPlxcbiAgICA8aDEgY2xhc3M9XCJia3JcIj5MYW5ndWFnZSBNYW5hZ2VyPC9oMT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZml4ZWQgbW9kYWwtbGFyZ2UgcGx1Z2luLW1hbmFnZXIgYmtyXCIgc3R5bGU9XCJwYWRkaW5nLXRvcDogNjlweDsgcGFkZGluZy1ib3R0b206IDY4cHhcIj5cXG4gICAgPGRpdiBjbGFzcz1cImxhbmd1YWdlcyBjbGVhcmZpeCBia3JcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGxhbmd1YWdlLWljb24tYnV0dG9uIGJrclwiIG5nLWNsaWNrPVwiZXZhbFRhYk9wLnRvZ2dsZVBsdWdpbihwbHVnaW5OYW1lKVwiIG5nLXJlcGVhdD1cIihwbHVnaW5OYW1lLCBwbHVnaW5TdGF0dXMpIGluIGV2YWxUYWJPcC5nZXRFdmFsdWF0b3JTdGF0dXNlcygpXCIgbmctY2xhc3M9XCJwbHVnaW5OYW1lXCI+XFxuICAgICAgICA8c3BhbiBuZy1jbGFzcz1cIlxcJ3BsdWdpbi1cXCcgKyBwbHVnaW5TdGF0dXNcIiBjbGFzcz1cInBsdWdpbi1zdGF0dXMgYmtyXCI+4pePPC9zcGFuPlxcbiAgICAgICAgPGJrLWxhbmd1YWdlLWxvZ28gYmctY29sb3I9XCJ7e2dldEV2YWx1YXRvckRldGFpbHMocGx1Z2luTmFtZSkuYmdDb2xvcn19XCIgbmFtZT1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5zaG9ydE5hbWV9fVwiIGZnLWNvbG9yPVwie3tnZXRFdmFsdWF0b3JEZXRhaWxzKHBsdWdpbk5hbWUpLmZnQ29sb3J9fVwiIGJvcmRlci1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5ib3JkZXJDb2xvcn19XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDwvYmstbGFuZ3VhZ2UtbG9nbz5cXG5cXG4gICAgICAgIHt7cGx1Z2luTmFtZX19XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93VVJMID0gIWV2YWxUYWJPcC5zaG93VVJMXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCI+XFxuICAgICAgICBGcm9tIFVSTC4uLlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBuZy1zaG93PVwiZXZhbFRhYk9wLnNob3dVUkxcIiBjbGFzcz1cImlucHV0LWdyb3VwIGFkZGV2YWwgYmtyXCI+XFxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgYmstZW50ZXI9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIiBuZy1tb2RlbD1cImV2YWxUYWJPcC5uZXdQbHVnaW5OYW1lT3JVcmxcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIj5BZGQgUGx1Z2luIGZyb20gVVJMPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLXNob3c9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZXJyb3ItdGl0bGUgYm9keS1ib3ggYmtyXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImJrclwiPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2FkIHRoaXMgcGx1Z2luIGZyb20gYW4gZXh0ZXJuYWwgVVJMPzwvcD5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IGZhbHNlOyBldmFsVGFiT3Auc2hvd1VSTD1mYWxzZTsgZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybD0mcXVvdDsmcXVvdDtcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IGZhbHNlOyBldmFsVGFiT3AuZm9yY2VMb2FkID0gdHJ1ZTsgZXZhbFRhYk9wLnRvZ2dsZVBsdWdpbigpXCI+T0s8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPjxiciBjbGFzcz1cImJrclwiPjwvcD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctc2hvdz1cImV2YWxUYWJPcC5zaG93V2FybmluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZXJyb3ItdGl0bGUgYm9keS1ib3ggYmtyXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImJrclwiPkNhbm5vdCByZW1vdmUgcGx1Z2luIGN1cnJlbnRseSB1c2VkIGJ5IGEgY29kZSBjZWxsIGluIHRoZSBub3RlYm9vay48YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIERlbGV0ZSB0aG9zZSBjZWxscyBhbmQgdHJ5IGFnYWluLjwvcD5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1dhcm5pbmcgPSBmYWxzZVwiPk9LPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPHAgY2xhc3M9XCJia3JcIj48YnIgY2xhc3M9XCJia3JcIj48L3A+XFxuICAgIDwvZGl2PlxcbiAgICA8dGFic2V0IGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPHRhYiBuZy1yZXBlYXQ9XCIoZXZhbHVhdG9yTmFtZSwgZXZhbHVhdG9yKSBpbiBldmFsVGFiT3AuZ2V0RXZhbHVhdG9yc1dpdGhTcGVjKClcIiBoZWFkaW5nPVwie3tldmFsdWF0b3JOYW1lfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGJrLXBsdWdpbi1tYW5hZ2VyLWV2YWx1YXRvci1zZXR0aW5ncyBjbGFzcz1cImJrclwiPjwvYmstcGx1Z2luLW1hbmFnZXItZXZhbHVhdG9yLXNldHRpbmdzPlxcbiAgICAgIDwvdGFiPlxcbiAgICA8L3RhYnNldD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogNjhweFwiPiBcXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBsYW5ndWFnZS1tYW5hZ2VyLWNsb3NlLWJ1dHRvbiBia3JcIiBuZy1jbGljaz1cImRvQ2xvc2UoKVwiPkNsb3NlPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9wbHVnaW5tYW5hZ2VyL3BsdWdpbm1hbmFnZXJfZXZhbHVhdG9yX3NldHRpbmdzXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IG5nLXJlcGVhdD1cInByb3BlcnR5IGluIHByb3BlcnRpZXNcIiBjbGFzcz1cImZvcm0tZ3JvdXAgbGFuZ3VhZ2Utb3B0aW9uIHByb3BlcnR5IGNsZWFyZml4IGJrclwiPlxcbiAgPGxhYmVsIGNsYXNzPVwiYmtyXCI+e3sgcHJvcGVydHkubmFtZSB9fTwvbGFiZWw+XFxuICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJldmFsdWF0b3Iuc2V0dGluZ3NbcHJvcGVydHkua2V5XVwiPjwvdGV4dGFyZWE+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2V0IGJrclwiIG5nLWNsaWNrPVwic2V0KHByb3BlcnR5LmtleSlcIj5TZXQ8L2J1dHRvbj5cXG48L2Rpdj5cXG48ZGl2IG5nLXJlcGVhdD1cImFjdGlvbiBpbiBhY3Rpb25zXCIgY2xhc3M9XCJhY3Rpb24gbGFuZ3VhZ2Utb3B0aW9uIGNsZWFyZml4IGJrclwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImV2YWx1YXRvci5wZXJmb3JtKGFjdGlvbi5rZXkpXCI+e3sgYWN0aW9uLm5hbWUgfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLWNsYXNzPVwiaXNMb2NrZWQoKSAmYW1wOyZhbXA7IFxcJ2xvY2tlZFxcJ1wiIGNsYXNzPVwiYmtjZWxsIHt7Y2VsbG1vZGVsLnR5cGV9fSBia3JcIj5cXG4gIDxkaXYgbmctaWY9XCJjZWxsbW9kZWwuaW5wdXQuaGlkZGVuICZhbXA7JmFtcDsgY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCcgJmFtcDsmYW1wOyAhaXNMb2NrZWQoKVwiIGNsYXNzPVwibWluaS1jZWxsLXN0YXRzIGFkdmFuY2VkLWhpZGUgYmtyXCI+XFxuICAgIHt7Y2VsbG1vZGVsLmV2YWx1YXRvcn19ICZuYnNwO1xcbiAgICAoe3tjZWxsbW9kZWwubGluZUNvdW50fX0gbGluZXMpXFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ0b2dnbGUtbWVudSBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXByb21vdGVkIGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBjZWxsLWRyb3Bkb3duIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0aXRsZT1cImNlbGwgbWVudVwiPjwvZGl2PlxcbiAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJjZWxsdmlldy5tZW51Lml0ZW1zXCIgc3VibWVudS1jbGFzc2VzPVwiZHJvcC1sZWZ0XCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gbW92ZS1jZWxsLWRvd24gYmtyXCIgbmctY2xpY2s9XCJtb3ZlQ2VsbERvd24oKVwiIG5nLWNsYXNzPVwibW92ZUNlbGxEb3duRGlzYWJsZWQoKSAmYW1wOyZhbXA7IFxcJ2Rpc2FibGVkXFwnXCIgdGl0bGU9XCJtb3ZlIGNlbGwgZG93blwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gbW92ZS1jZWxsLXVwIGJrclwiIG5nLWNsaWNrPVwibW92ZUNlbGxVcCgpXCIgbmctY2xhc3M9XCJtb3ZlQ2VsbFVwRGlzYWJsZWQoKSAmYW1wOyZhbXA7IFxcJ2Rpc2FibGVkXFwnXCIgdGl0bGU9XCJtb3ZlIGNlbGwgdXBcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtbWVudS1pdGVtIGRlbGV0ZS1jZWxsIGJrclwiIG5nLWNsaWNrPVwiZGVsZXRlQ2VsbCgpXCIgdGl0bGU9XCJkZWxldGUgY2VsbFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZXhwYW5kLWNvbnRyYWN0IGJrclwiIG5nLWlmPVwiY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCdcIiBuZy1jbGljaz1cInRvZ2dsZUNlbGxJbnB1dCgpXCIgbmctY2xhc3M9XCJjZWxsbW9kZWwuaW5wdXQuaGlkZGVuICZhbXA7JmFtcDsgXFwnY29sbGFwc2VkXFwnXCIgdGl0bGU9XCJoaWRlL3Nob3cgY2VsbCBpbnB1dFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gZHJvcGRvd24tcHJvbW90ZWQgYWR2YW5jZWQtb25seSBia3JcIiBuZy1pZj1cImlzQ29kZUNlbGwoKVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XFxuICAgICAgPGJrLWNvZGUtY2VsbC1pbnB1dC1tZW51IGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtaW5wdXQtbWVudT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBldmFsdWF0ZSBia3JcIiBuZy1jbGljaz1cImV2YWx1YXRlKCRldmVudClcIiBuZy1pZj1cImlzQ29kZUNlbGwoKVwiIHRpdGxlPVwicnVuIGNlbGxcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtc3RhdHVzLWl0ZW0gbG9hZGluZy1zdGF0ZSBhZHZhbmNlZC1oaWRlIGJrclwiIG5nLWlmPVwiY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCcgJmFtcDsmYW1wOyAhY2VsbG1vZGVsLmV2YWx1YXRvclJlYWRlclwiPkluaXRpYWxpemluZyB7e2NlbGxtb2RlbC5ldmFsdWF0b3J9fVxcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXIgcm90YXRpbmcgYmtyXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLWlmPVwiaXNEZWJ1Z2dpbmcoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIFtEZWJ1Z106IGNlbGwgSWQgPSB7e2NlbGxtb2RlbC5pZH19LCBwYXJlbnQgPSB7e2dldFBhcmVudElkKCl9fSwgbGV2ZWwgPSB7e2NlbGxtb2RlbC5sZXZlbH19XFxuICAgIDxhIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0RlYnVnSW5mbygpXCIgbmctaGlkZT1cImlzU2hvd0RlYnVnSW5mbygpXCIgY2xhc3M9XCJia3JcIj5zaG93IG1vcmU8L2E+XFxuICAgIDxhIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0RlYnVnSW5mbygpXCIgbmctc2hvdz1cImlzU2hvd0RlYnVnSW5mbygpXCIgY2xhc3M9XCJia3JcIj5zaG93IGxlc3M8L2E+XFxuICAgIDxkaXYgY29sbGFwc2U9XCIhaXNTaG93RGVidWdJbmZvKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxwcmUgY2xhc3M9XCJia3JcIj57e2NlbGxtb2RlbCB8IGpzb259fTwvcHJlPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1pbmNsdWRlPVwiZ2V0VHlwZUNlbGxVcmwoKVwiIGNsYXNzPVwiYmtyXCI+PC9kaXY+XFxuICA8YmstbmV3LWNlbGwtbWVudSBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIG5nLWNsYXNzPVwiaXNMYXJnZSAmYW1wOyZhbXA7IFxcJ2xhcmdlXFwnXCIgaXMtbGFyZ2U9XCJpc0xhcmdlXCIgbmctaWY9XCJuZXdDZWxsTWVudUNvbmZpZy5pc1Nob3coKVwiIGNsYXNzPVwiYmtyXCI+PC9iay1uZXctY2VsbC1tZW51PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IGNsYXNzPVwiZXZhbHVhdG9yIGJrclwiIGV2YWx1YXRvci10eXBlPVwie3sgY2VsbG1vZGVsLmV2YWx1YXRvciB9fVwiIG5nLWNsYXNzPVwie1xcbiAgXFwnZXZhbHVhdG9yLXJlYWR5XFwnOiBjZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyLFxcbiAgXFwnbG9ja2VkXFwnOiBpc0xvY2tlZCgpLFxcbiAgXFwnZW1wdHlcXCc6IGlzRW1wdHkoKVxcbiAgfVwiPlxcbiAgPGRpdiBjbGFzcz1cImJrY2VsbCBjb2RlLWNlbGwtYXJlYSBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImNvZGUtY2VsbC1pbnB1dCBia3JcIiBuZy1jbGljaz1cImJhY2tncm91bmRDbGljaygkZXZlbnQpXCIgbmctaGlkZT1cImlzTG9ja2VkKClcIiBuZy1jbGFzcz1cIntcXCdpbnB1dC1oaWRkZW5cXCc6IGNlbGxtb2RlbC5pbnB1dC5oaWRkZW59XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvZGUtY2VsbC1pbnB1dC1jb250ZW50IGJrclwiPlxcbiAgICAgICAgPGJrLWNvZGUtY2VsbC1pbnB1dC1tZW51IGNsYXNzPVwiYWR2YW5jZWQtaGlkZSBia3JcIj48L2JrLWNvZGUtY2VsbC1pbnB1dC1tZW51PlxcbiAgICAgICAgPGRpdiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImJrY2VsbHRleHRhcmVhIGJrclwiIG5nLW1vZGVsPVwiY2VsbG1vZGVsLmlucHV0LmJvZHlcIj48L3RleHRhcmVhPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGV2YWx1YXRlLXNjcmlwdCBhZHZhbmNlZC1oaWRlIGJrclwiIG5nLWNsaWNrPVwiZXZhbHVhdGUoJGV2ZW50KVwiIGVhdC1jbGljaz1cIlwiPlxcbiAgICAgICAgICB7eyBpc0pvYkNhbmNlbGxhYmxlKCkgPyBcXCdTdG9wXFwnIDogXFwnUnVuXFwnIH19XFxuICAgICAgICA8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLWlmPVwiaGFzT3V0cHV0KClcIiBjbGFzcz1cImNvZGUtY2VsbC1vdXRwdXQgYmtyXCIgbmctY2xhc3M9XCJ7XFxuICAgICAgXFwnbm8tb3V0cHV0XFwnOiBpc0hpZGRlbk91dHB1dCgpLFxcbiAgICAgIFxcJ2lucHV0LWhpZGRlblxcJzogY2VsbG1vZGVsLmlucHV0LmhpZGRlbixcXG4gICAgICBcXCdvdXRwdXQtaGlkZGVuXFwnOiBjZWxsbW9kZWwub3V0cHV0LmhpZGRlbixcXG4gICAgICBcXCdlcnJvclxcJzogaXNFcnJvcigpXFxuICAgICAgfVwiPlxcbiAgICAgIDxoNiBuZy1pZj1cIm91dHB1dFRpdGxlKClcIiBjbGFzcz1cImJrclwiPnt7b3V0cHV0VGl0bGUoKX19PC9oNj5cXG4gICAgICA8YmstY29kZS1jZWxsLW91dHB1dCBtb2RlbD1cImNlbGxtb2RlbC5vdXRwdXRcIiBldmFsdWF0b3ItaWQ9XCJ7eyBjZWxsbW9kZWwuZXZhbHVhdG9yIH19XCIgY2VsbC1pZD1cInt7IGNlbGxtb2RlbC5pZCB9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPC9iay1jb2RlLWNlbGwtb3V0cHV0PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsaW5wdXRtZW51XCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiZHJvcGRvd24gYmstY29kZS1jZWxsLWlucHV0IGJrclwiPlxcbiAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgY2VsbC1ldmFsdWF0b3ItbWVudSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgIDxiay1sYW5ndWFnZS1sb2dvIG5hbWU9XCJ7e2dldEV2YWx1YXRvcigpLnNob3J0TmFtZX19XCIgYmctY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmJnQ29sb3J9fVwiIGZnLWNvbG9yPVwie3tnZXRFdmFsdWF0b3IoKS5mZ0NvbG9yfX1cIiBib3JkZXItY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmJvcmRlckNvbG9yfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICA8L2JrLWxhbmd1YWdlLWxvZ28+XFxuICAgIDxiIGNsYXNzPVwiYWR2YW5jZWQtaGlkZSBia3JcIj57e2NlbGxtb2RlbC5ldmFsdWF0b3J9fTwvYj5cXG4gIDwvYT5cXG4gIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgaW5wdXRjZWxsbWVudSBia3JcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICA8bGkgbmctcmVwZWF0PVwiKGV2YWx1YXRvck5hbWUsIGV2YWx1YXRvcikgaW4gZ2V0RXZhbHVhdG9ycygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cInNldEV2YWx1YXRvcihldmFsdWF0b3JOYW1lKVwiIGNsYXNzPVwie3tldmFsdWF0b3JOYW1lfX0tbWVudWl0ZW0gYmtyXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgICB7e2V2YWx1YXRvck5hbWV9fVxcbiAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjayBia3JcIiBuZy1zaG93PVwiZ2V0U2hvd0V2YWxJY29uKGV2YWx1YXRvck5hbWUpXCI+PC9pPlxcbiAgICAgIDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxvdXRwdXRcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJ0b2dnbGUtbWVudSBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi1wcm9tb3RlZCBia3JcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gY2VsbC1kcm9wZG93biBkcm9wZG93bi10b2dnbGUgYmtyXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIHRpdGxlPVwiY2VsbCBvdXRwdXQgbWVudVwiIG5nLXNob3c9XCJpc1Nob3dNZW51KClcIj48L2Rpdj5cXG4gICAgPGJrLWNvZGUtY2VsbC1vdXRwdXQtbWVudSBtb2RlbD1cIm91dHB1dENlbGxNZW51TW9kZWxcIiBjbGFzcz1cImJrclwiPjwvYmstY29kZS1jZWxsLW91dHB1dC1tZW51PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZXhwYW5kLWNvbnRyYWN0IGJrclwiIG5nLWNsaWNrPVwidG9nZ2xlRXhwYW5zaW9uKClcIiBuZy1jbGFzcz1cIiFpc0V4cGFuZGVkKCkgJmFtcDsmYW1wOyBcXCdjb2xsYXBzZWRcXCdcIiB0aXRsZT1cImhpZGUvc2hvdyBjZWxsIG91dHB1dFwiIG5nLXNob3c9XCJpc1Nob3dNZW51KClcIj48L2Rpdj5cXG48L2Rpdj5cXG48Ymstb3V0cHV0LWRpc3BsYXkgbmctc2hvdz1cImlzU2hvd091dHB1dCgpXCIgbW9kZWw9XCJvdXRwdXREaXNwbGF5TW9kZWxcIiB0eXBlPVwie3sgZ2V0T3V0cHV0RGlzcGxheVR5cGUoKSB9fVwiIGNsYXNzPVwiYmtyXCI+XFxuPC9iay1vdXRwdXQtZGlzcGxheT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbG91dHB1dG1lbnVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1mb3JtIGJrclwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICA8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51IGRyb3AtbGVmdCBia3JcIj5cXG4gICAgPGEgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiYmtyXCI+RGlzcGxheXMgKHt7bW9kZWwuZ2V0U2VsZWN0ZWREaXNwbGF5KCl9fSk8L2E+XFxuICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCI+XFxuICAgICAgPGxpIG5nLXJlcGVhdD1cImQgaW4gbW9kZWwuZ2V0QXBwbGljYWJsZURpc3BsYXlzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJtb2RlbC5zZXRTZWxlY3RlZERpc3BsYXkoZClcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2sgYmtyXCIgbmctc2hvdz1cImQgPT09IG1vZGVsLmdldFNlbGVjdGVkRGlzcGxheSgpXCI+PC9pPnt7IGQgfX1cXG4gICAgICAgIDwvYT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9saT5cXG4gIDxsaSBuZy1yZXBlYXQ9XCJpdGVtIGluIG1vZGVsLmdldEFkZGl0aW9uYWxNZW51SXRlbXMoKVwiIGNsYXNzPVwie3tnZXRJdGVtQ2xhc3MoaXRlbSl9fSBia3JcIj5cXG4gICAgPGEgdGFiaW5kZXg9XCItMVwiIG5nLWNsaWNrPVwiaXRlbS5hY3Rpb24oKVwiIGNsYXNzPVwiYmtyXCI+e3tnZXRJdGVtTmFtZShpdGVtKX19PC9hPlxcbiAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiPlxcbiAgICAgIDxsaSBuZy1yZXBlYXQ9XCJzdWJpdGVtIGluIGdldFN1Ykl0ZW1zKGl0ZW0pXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDxhIG5nLWNsaWNrPVwic3ViaXRlbS5hY3Rpb24oKVwiIGNsYXNzPVwie3tnZXRTdWJtZW51SXRlbUNsYXNzKHN1Yml0ZW0pfX0gYmtyXCIgdGl0bGU9XCJ7e3N1Yml0ZW0udG9vbHRpcH19XCI+e3tzdWJpdGVtLm5hbWV9fTwvYT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9saT5cXG48L3VsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL21hcmtkb3duLWVkaXRhYmxlXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLXNob3c9XCJtb2RlPT1cXCdlZGl0XFwnXCIgbmctY2xpY2s9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBjbGFzcz1cImNvZGVtaXJyb3Itd3JhcHBlciBia3JcIj5cXG4gIDx0ZXh0YXJlYSBjbGFzcz1cImJrclwiPjwvdGV4dGFyZWE+XFxuPC9kaXY+XFxuPGRpdiBuZy1jbGljaz1cImVkaXQoJGV2ZW50KVwiIGNsYXNzPVwibWFya3VwIGJrclwiIG5nLXNob3c9XCJtb2RlPT1cXCdwcmV2aWV3XFwnXCI+PC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbWFya2Rvd25jZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48YmstbWFya2Rvd24tZWRpdGFibGUgY2VsbG1vZGVsPVwiY2VsbG1vZGVsXCIgY2xhc3M9XCJia3JcIj48L2JrLW1hcmtkb3duLWVkaXRhYmxlPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25ld2NlbGxtZW51XCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG5ldy1jZWxsIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cIm5ld0NvZGVDZWxsKGRlZmF1bHRFdmFsdWF0b3IoKSlcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBpbnNlcnQtY2VsbCBia3JcIiBuZy1jbGFzcz1cIiFpc0xhcmdlICZhbXA7JmFtcDsgXFwnYnRuLXhzXFwnXCI+XFxuICAgIDxzcGFuIG5nLWNsYXNzPVwiIWlzTGFyZ2UgJmFtcDsmYW1wOyBcXCdhZHZhbmNlZC1oaWRlXFwnXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICBJbnNlcnQge3tkZWZhdWx0RXZhbHVhdG9yKCl9fSBDZWxsXFxuICAgIDwvc3Bhbj5cXG4gICAgPHNwYW4gbmctaWY9XCIhaXNMYXJnZVwiIGNsYXNzPVwicGx1cyBhZHZhbmNlZC1vbmx5IGJrclwiPis8L3NwYW4+XFxuICA8L2J1dHRvbj5cXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgZHJvcGRvd24tdG9nZ2xlIGJrclwiIG5nLWNsYXNzPVwiIWlzTGFyZ2UgJmFtcDsmYW1wOyBcXCdidG4teHNcXCdcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtc29ydC1kb3duIGJrclwiPjwvaT5cXG4gIDwvYnV0dG9uPlxcbiAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiPlxcbiAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51IGJrclwiPlxcbiAgICAgIDxhIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImJrclwiPkNvZGUgY2VsbDwvYT5cXG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiPlxcbiAgICAgICAgPGxpIG5nLXJlcGVhdD1cIihrZXksIHZhbHVlKSBpbiBnZXRFdmFsdWF0b3JzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8YSBuZy1jbGljaz1cIm5ld0NvZGVDZWxsKGtleSlcIiBjbGFzcz1cImJrclwiPnt7a2V5fX08L2E+XFxuICAgICAgICA8L2xpPlxcbiAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICA8YSBuZy1jbGljaz1cInNob3dQbHVnaW5NYW5hZ2VyKClcIiBjbGFzcz1cImJrclwiPk90aGVyIGxhbmd1YWdlcy4uLjwvYT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9saT5cXG4gICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudSBia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJia3JcIj5TZWN0aW9uIGNlbGw8L2E+XFxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIj5cXG4gICAgICAgIDxsaSBuZy1yZXBlYXQ9XCJsZXZlbCBpbiBnZXRMZXZlbHMoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxhIG5nLWNsaWNrPVwibmV3U2VjdGlvbkNlbGwobGV2ZWwpXCIgY2xhc3M9XCJia3JcIj5Ie3tsZXZlbH19PC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2xpPlxcbiAgICA8bGkgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJuZXdNYXJrZG93bkNlbGwoKVwiIGNsYXNzPVwiYmtyXCI+TWFya2Rvd24gY2VsbDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbm90ZWJvb2tcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctY2xhc3M9XCJ7XFwnYWR2YW5jZWQtbW9kZVxcJzogaXNBZHZhbmNlZE1vZGUoKSwgXFwnaGllcmFyY2h5LW1vZGVcXCc6IGlzSGllcmFyY2h5RW5hYmxlZCgpfVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstbmV3LWNlbGwtbWVudSBuZy1zaG93PVwiIWlzTG9ja2VkKCkgJmFtcDsmYW1wOyAhaXNMb2FkaW5nXCIgbmctY2xhc3M9XCJpc0VtcHR5KCkgJmFtcDsmYW1wOyBcXCdvbmx5LWNoaWxkIGxhcmdlXFwnXCIgaXMtbGFyZ2U9XCJpc0VtcHR5KClcIiBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIGNsYXNzPVwiYmtyXCI+PC9iay1uZXctY2VsbC1tZW51PlxcbiAgPGRpdiBjbGFzcz1cImJrY2VsbCBia3JcIj5cXG4gICAgPGJrLWNlbGwgbmctcmVwZWF0PVwiY2VsbCBpbiBnZXRDaGlsZHJlbigpXCIgY2VsbG1vZGVsPVwiY2VsbFwiIGluZGV4PVwiJGluZGV4XCIgY2VsbGlkPVwie3tjZWxsLmlkfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICA8L2JrLWNlbGw+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia2NlbGxtZW51IGJrclwiIHN0eWxlPVwicG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OVwiPlxcbiAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj48L2E+XFxuICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cIm1lbnVJdGVtc1wiIHN1Ym1lbnUtY2xhc3Nlcz1cInB1bGwtbGVmdFwiIGNsYXNzPVwiYmtyXCI+PC9iay1kcm9wZG93bi1tZW51PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1zaG93PVwiaXNTaG93aW5nT3V0cHV0KClcIiBjbGFzcz1cIm91dHB1dGxvZ2JveCBia3JcIj48L2Rpdj5cXG4gIDxkaXYgbmctc2hvdz1cImlzU2hvd2luZ091dHB1dCgpXCIgY2xhc3M9XCJvdXRwdXRsb2djb250YWluZXIgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJvdXRwdXRsb2doYW5kbGUgYmtyXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJidG4tdG9vbGJhciBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIGFsdC1jb250cm9scyBia3JcIj5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBia3JcIiBuZy1jbGljaz1cImNsZWFyT3V0cHV0KClcIj5DbGVhcjwvYT5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBoaWRlLW91dHB1dCBia3JcIiBuZy1jbGljaz1cImhpZGVPdXRwdXQoKVwiPkhpZGU8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBia3JcIiBkYXRhLXRvZ2dsZT1cImJ1dHRvbnMtY2hlY2tib3hcIj5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJrclwiIG5nLWNsYXNzPVwic2hvd1N0ZE91dCA/IFxcJ2J0bi1wcmltYXJ5XFwnIDogXFwnYnRuLWRlZmF1bHRcXCdcIiBuZy1jbGljaz1cInRvZ2dsZVN0ZE91dCgkZXZlbnQpXCI+c3Rkb3V0PC9hPlxcbiAgICAgICAgPGEgY2xhc3M9XCJidG4gYmtyXCIgbmctY2xhc3M9XCJzaG93U3RkRXJyID8gXFwnYnRuLXByaW1hcnlcXCcgOiBcXCdidG4tZGVmYXVsdFxcJ1wiIG5nLWNsaWNrPVwidG9nZ2xlU3RkRXJyKCRldmVudClcIj5zdGRlcnI8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nb3V0IGJrclwiIG5nLXNob3c9XCJzaG93U3RkT3V0XCIgbmctY2xhc3M9XCIhc2hvd1N0ZEVyciAmYW1wOyZhbXA7IFxcJ3NpbmdsZVxcJ1wiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cIm91dHB1dC1sYWJlbCBia3JcIj5zdGRvdXQ6PC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nYm94IG91dHB1dGxvZ3N0ZG91dCBia3JcIj5cXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVwibGluZSBpbiBvdXRwdXRMb2cgdHJhY2sgYnkgJGluZGV4XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPGRpdiBuZy1zaG93PVwibGluZS50eXBlID09IFxcJ3RleHRcXCcgfHwgbGluZS50eXBlID09IFxcJ3N0ZG91dFxcJ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICAgPHByZSBjbGFzcz1cInByZWxvZyBia3JcIj57e2xpbmUubGluZX19PC9wcmU+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nZXJyIGJrclwiIG5nLXNob3c9XCJzaG93U3RkRXJyXCIgbmctY2xhc3M9XCIhc2hvd1N0ZE91dCAmYW1wOyZhbXA7IFxcJ3NpbmdsZVxcJ1wiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cIm91dHB1dC1sYWJlbCBia3JcIj5zdGRlcnI6PC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nYm94IGJrclwiPlxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XCJsaW5lIGluIG91dHB1dExvZyB0cmFjayBieSAkaW5kZXhcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8ZGl2IG5nLXNob3c9XCJsaW5lLnR5cGUgPT0gXFwnc3RkZXJyXFwnXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICA8cHJlIGNsYXNzPVwicHJlbG9nIGJrclwiPnt7bGluZS5saW5lfX08L3ByZT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJpc0RlYnVnZ2luZygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgPGJ1dHRvbiBuZy1jbGljaz1cInNob3dEZWJ1Z1RyZWUgPSAhc2hvd0RlYnVnVHJlZVwiIGNsYXNzPVwiYmtyXCI+VG9nZ2xlIGRlYnVnIFRyZWU8L2J1dHRvbj5cXG4gICAgPGRpdiBjb2xsYXBzZT1cIiFzaG93RGVidWdUcmVlXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8cHJlIGNsYXNzPVwiYmtyXCI+e3tnZXROb3RlYm9va01vZGVsKCkgfCBqc29ufX08L3ByZT5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9vdXRwdXQtcHJvZ3Jlc3NcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctaWY9XCJlbGFwc2VkID4gMjAwXCIgY2xhc3M9XCJyb3cgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTIgYmtyXCI+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jb2cgZmEtc3BpbiBmYS1sZyBia3JcIj48L2k+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJia3JcIj4gJm5ic3A7IEVsYXBzZWQ6IHt7Z2V0RWxhcHNlZFRpbWUoKX19ICZuYnNwOyA8L3NwYW4+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lcy1jaXJjbGUgZmEtbGcgdGV4dC1kYW5nZXIgY3Vyc29yX2hhbmQgYmtyXCIgbmctY2xpY2s9XCJjYW5jZWwoKVwiIG5nLWlmPVwiaXNDYW5jZWxsYWJsZSgpXCIgdGl0bGU9XCJjYW5jZWxcIj48L2k+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tMiBia3JcIiBuZy1pZj1cImhhc1Byb2dyZXNzQmFyKClcIj5cXG5cXHQgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBia3JcIj5cXG5cXHRcXHQgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgYmtyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cInt7Z2V0UHJvZ3Jlc3NCYXIoKX19XCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDoge3tnZXRQcm9ncmVzc0JhcigpfX0lXCI+XFxuXFx0XFx0ICAgIHt7Z2V0UHJvZ3Jlc3NCYXIoKX19ICVcXG5cXHRcXHQgIDwvZGl2PlxcblxcdCAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJoYXNNZXNzYWdlKClcIiBjbGFzcz1cImNvbC1zbS04IGJrclwiPiB7e2dldE1lc3NhZ2UoKX19PC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBuZy1pZj1cImhhc1BheWxvYWQoKSB8fCBoYXNPdXRwdXREYXRhKClcIiBjbGFzcz1cImJrclwiPlxcbiAgPGhyIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstY29kZS1jZWxsLW91dHB1dCBtb2RlbD1cIm91dHB1dERpc3BsYXlNb2RlbFwiIGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtb3V0cHV0PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL291dHB1dC1yZXN1bHRzXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48dWwgbmctaWY9XCJoYXNPdXRwdXREYXRhKClcIiBjbGFzcz1cImxpc3QtdW5zdHlsZWQgYmtyXCI+XFxuICA8bGkgbmctcmVwZWF0PVwiaSBpbiBvdXRwdXRkYXRhXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgPHByZSBuZy1jbGFzcz1cImkudHlwZSA9PT0gJnF1b3Q7b3V0JnF1b3Q7ID8gJnF1b3Q7dGV4dC1pbmZvJnF1b3Q7IDogJnF1b3Q7dGV4dC13YXJuaW5nJnF1b3Q7XCIgY2xhc3M9XCJia3JcIj57eyBpLnZhbHVlIH19PC9wcmU+XFxuICA8L2xpPlxcbjwvdWw+XFxuPGJrLWNvZGUtY2VsbC1vdXRwdXQgbmctaWY9XCJoYXNQYXlsb2FkKClcIiBtb2RlbD1cInBheWxvYWRcIiBjbGFzcz1cImJrclwiPjwvYmstY29kZS1jZWxsLW91dHB1dD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9zZWN0aW9uY2VsbFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBuZy1oaWRlPVwiY2VsbG1vZGVsLmhpZGVUaXRsZVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8c3BhbiBjbGFzcz1cImJrc2VjdGlvbnRvZ2dsZXBsdXMgc2VjdGlvbi10b2dnbGUgYmtyXCIgbmctY2xpY2s9XCJ0b2dnbGVTaG93Q2hpbGRyZW4oKVwiIG5nLWhpZGU9XCJpc1Nob3dDaGlsZHJlbigpXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtcGx1cyBia3JcIj48L2k+XFxuICA8L3NwYW4+XFxuICA8c3BhbiBjbGFzcz1cImJrc2VjdGlvbnRvZ2dsZW1pbnVzIHNlY3Rpb24tdG9nZ2xlIGJrclwiIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0NoaWxkcmVuKClcIiBuZy1zaG93PVwiaXNTaG93Q2hpbGRyZW4oKVwiPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLW1pbnVzIGJrclwiPjwvaT5cXG4gIDwvc3Bhbj5cXG4gIDxwIGNsYXNzPVwiZGVwdGgtaW5kaWNhdG9yIGJrclwiPnt7Z2V0RnVsbEluZGV4KCl9fTwvcD5cXG4gIDxiay1tYXJrZG93bi1lZGl0YWJsZSBjbGFzcz1cInNlY3Rpb257e2NlbGxtb2RlbC5sZXZlbH19IGJrLXNlY3Rpb24tdGl0bGUgYmtyXCIgY2VsbG1vZGVsPVwiY2VsbG1vZGVsXCI+PC9iay1tYXJrZG93bi1lZGl0YWJsZT5cXG48L2Rpdj5cXG48YmstbmV3LWNlbGwtbWVudSBzaXplPVwieHNcIiBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIG5nLWlmPVwibmV3Q2VsbE1lbnVDb25maWcuaXNTaG93KClcIiBjbGFzcz1cImJrclwiPjwvYmstbmV3LWNlbGwtbWVudT5cXG48ZGl2IG5nLXNob3c9XCJpc1Nob3dDaGlsZHJlbigpXCIgY2xhc3M9XCJzZWN0aW9uLWNoaWxkcmVuIGJrclwiPlxcbiAgPGJrLWNlbGwgbmctcmVwZWF0PVwiY2VsbCBpbiBnZXRDaGlsZHJlbigpXCIgY2VsbG1vZGVsPVwiY2VsbFwiIGluZGV4PVwiJGluZGV4XCIgY2VsbGlkPVwie3tjZWxsLmlkfX1cIiBjbGFzcz1cImJrclwiPjwvYmstY2VsbD5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay90ZXh0Y2VsbFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cInRleHRjZWxsLXdyYXBwZXIgYmtyXCIgbmctY2xpY2s9XCJlZGl0KClcIj5cXG4gIDxkaXYgY2xhc3M9XCJlZGl0YWJsZS10ZXh0IGJrclwiIGNvbnRlbnRlZGl0YWJsZT1cInt7IGlzRWRpdGFibGUoKSA/IHRydWUgOiBmYWxzZSB9fVwiIHN0eWxlPVwibWluLWhlaWdodDogMTRweDsgbWluLXdpZHRoOiAxNHB4XCI+PC9kaXY+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJia28tdGFibGVkaXNwbGF5L291dHB1dC10YWJsZS1vcHRpb25zXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiA2OXB4XCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5UYWJsZSBPcHRpb25zPC9oMT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBtb2RhbC1sYXJnZSBia3JcIiBzdHlsZT1cInBhZGRpbmctdG9wOiA2OXB4OyBwYWRkaW5nLWJvdHRvbTogNjhweFwiPlxcblxcbiA8dGFic2V0IGNsYXNzPVwiYmtyXCI+XFxuXFx0PHRhYiBoZWFkaW5nPVwiVGFibGUgRm9ybWF0dGluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuXFxuXFx0XFx0PGRpdiBjbGFzcz1cInJvdyBia3JcIj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy00IGJrclwiPlxcblxcdFxcdCAgICBcXHRVc2UgcGFnaW5hdGlvbjpcXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy00IGJrclwiPlxcblxcdFxcdCAgICBcXHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmctbW9kZWw9XCJwYWdpbmF0aW9uLnVzZVwiIGNsYXNzPVwiYmtyXCI+XFxuXFx0XFx0ICAgIDwvZGl2PlxcbiAgICBcXHQ8L2Rpdj5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcblxcdFxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTQgYmtyXCI+XFxuXFx0XFx0ICAgIFxcdE1heCByb3dzIHRvIGRpc3BsYXk6XFxuXFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNCBia3JcIj5cXG5cXHRcXHQgICAgXFx0PGlucHV0IHR5cGU9XCJudW1iZXJcIiBuZy1tb2RlbD1cInBhZ2luYXRpb24ucm93c1RvRGlzcGxheVwiIG5nLWRpc2FibGVkPVwicGFnaW5hdGlvbi51c2VcIiBjbGFzcz1cImJrclwiPlxcblxcdFxcdCAgICA8L2Rpdj5cXG4gICAgXFx0PC9kaXY+XFxuXFx0PC90YWI+XFxuXFx0PHRhYiBoZWFkaW5nPVwiQ2VsbCBGb3JtYXR0aW5nXCIgY2xhc3M9XCJia3JcIj5cXG5cXHQgIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+Q29sdW1uPC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+RGlzcGxheSBUeXBlPC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+U2hvdyAoPGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkaXNwbGF5QWxsKClcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPkFsbDwvYT4pPC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+QWxpZ25tZW50PC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICA8L2Rpdj5cXG5cXG5cXHQgIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCIgbmctcmVwZWF0PVwibWVudWlkeCBpbiBnZXRDZWxsSWR4XCI+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICB7eyBnZXRDZWxsTmFtW21lbnVpZHhdIH19XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImdldENlbGxEaXNwW21lbnVpZHhdXCIgbmctb3B0aW9ucz1cIml0ZW0udHlwZSBhcyBpdGVtLm5hbWUgZm9yIGl0ZW0gaW4gZ2V0Q2VsbERpc3BPcHRzRihtZW51aWR4KVwiPjwvc2VsZWN0PlxcblxcdFxcdDwvZGl2PiAgIFxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwiZ2V0Q2VsbFNob1ttZW51aWR4XVwiIGNsYXNzPVwiYmtyXCI+XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0XFx0XFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5nLW1vZGVsPVwiZ2V0Q2VsbEFsaWduW21lbnVpZHhdXCIgdmFsdWU9XCJMXCIgY2xhc3M9XCJia3JcIj4mbmJzcDs8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tYWxpZ24tbGVmdCBia3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Jm5ic3A7XFxuICBcXHRcXHRcXHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmctbW9kZWw9XCJnZXRDZWxsQWxpZ25bbWVudWlkeF1cIiB2YWx1ZT1cIkNcIiBjbGFzcz1cImJrclwiPiZuYnNwOzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1hbGlnbi1jZW50ZXIgYmtyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiZuYnNwO1xcblxcdFxcdFxcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuZy1tb2RlbD1cImdldENlbGxBbGlnblttZW51aWR4XVwiIHZhbHVlPVwiUlwiIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWFsaWduLXJpZ2h0IGJrclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4mbmJzcDtcXG5cXHQgICAgPC9kaXY+XFxuXFx0ICA8L2Rpdj5cXG4gICA8L3RhYj5cXG4gPC90YWJzZXQ+XFxuXFxuXFxuXFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3IgYmtyXCIgc3R5bGU9XCJoZWlnaHQ6IDY4cHhcIj4gXFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrciBia3JcIiBuZy1jbGljaz1cImNhbmNlbE9wdGlvbnNEaWFsb2coKVwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBtb2RhbC1zdWJtaXQgYmtyIGJrclwiIG5nLWNsaWNrPVwiY2xvc2VPcHRpb25zRGlhbG9nKClcIj5PSzwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiYmtvLXRhYmxlZGlzcGxheS9vdXRwdXQtdGFibGVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJkcm9wZG93biBkdG1lbnUgY2xlYXJmaXggYmtyXCIgc3R5bGU9XCJmbG9hdDogbGVmdFwiIG5nLWlmPVwicmVuZGVyTWVudVwiPlxcbiAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGR0bWVudSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgbmctY2xpY2s9XCJtZW51VG9nZ2xlKClcIj5cXG4gICBFZGl0IFRhYmxlIFxcbiAgIDwvYT5cXG4gICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCIgc3VibWVudS1jbGFzc2VzPVwiZHJvcC1yaWdodFwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb1Jlc2V0U29ydCgpXCIgaWQ9XCJkdC1yZXNldC1zb3J0XCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5SZXNldCBTb3J0PC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj4mbmJzcDs8L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb1NlbGVjdEFsbCgpXCIgaWQ9XCJkdC1zZWxlY3QtYWxsXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5TZWxlY3QgQWxsPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvRGVzZWxlY3RBbGwoKVwiIGlkPVwiZHQtZGVzZWxlY3QtYWxsXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5EZXNlbGVjdCBBbGw8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9SZXZlcnNlU2VsZWN0aW9uKClcIiBpZD1cImR0LXJldmVyc2Utc2VsZWN0aW9uXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5SZXZlcnNlIFNlbGVjdGlvbjwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9Db3B5VG9DbGlwYm9hcmQoKVwiIGlkPVwie3tpZH19X2R0X2NvcHlcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPkNvcHkgdG8gQ2xpcGJvYXJkPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvQ1NWRXhwb3J0KGZhbHNlKVwiIGlkPVwiZHQtc2F2ZS1hbGxcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlNhdmUgQWxsIGFzIENTVjwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb0NTVkV4cG9ydCh0cnVlKVwiIGlkPVwiZHQtc2F2ZS1zZWxlY3RlZFwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+U2F2ZSBTZWxlY3RlZCBhcyBDU1Y8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPiZuYnNwOzwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cIm9wZW5PcHRpb25zRGlhbG9nKClcIiBpZD1cImR0LW9wdGlvbnNcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPk9wdGlvbnMuLi48L2E+PC9saT5cXG4gICA8L3VsPlxcbiA8L2Rpdj5cXG5cXG48dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2xhc3M9XCJkaXNwbGF5IGJrclwiIGJvcmRlcj1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwJVwiIGlkPVwie3tpZH19XCI+PC90YWJsZT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTsiLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogYmsuQ29udHJvbFBhbmVsXG4gKiAtIFRoaXMgaXMgdGhlIG1vZHVsZSBmb3IgdGhlICdjb250cm9sIHBhbmVsJyBzZWN0aW9uIG9mIGJlYWtlclxuICogLSBJbiB0aGUgY29udHJvbCBwYW5lbCwgdXNlcnMgZ2V0IGEgbGlzdCBvZiBvcGVuZWQgc2Vzc2lvbnMgYW5kIGlzIGFibGUgdG9cbiAqIChyZSlvcGVuIG9uZSBpbiBia0FwcC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29udHJvbFBhbmVsJywgW1xuICAgICdiay51dGlscycsXG4gICAgJ2JrLmNvcmUnLFxuICAgICdiay5zZXNzaW9uJyxcbiAgICAnYmsubWVudVBsdWdpbk1hbmFnZXInLFxuICAgICdiay5yZWNlbnRNZW51JyxcbiAgICAnYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyJ10pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICdMaWNlbnNlJyk7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiAnQVMgSVMnIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb250cm9sUGFuZWwnKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvbnRyb2xQYW5lbCcsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtDb3JlTWFuYWdlciwgYmtTZXNzaW9uLCBia01lbnVQbHVnaW5NYW5hZ2VyLCBia1RyYWNrLCAkbG9jYXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ2NvbnRyb2xwYW5lbC9jb250cm9scGFuZWwnXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ0JlYWtlcic7XG4gICAgICAgIHZhciBfaW1wbCA9IHtcbiAgICAgICAgICBuYW1lOiAnYmtDb250cm9sQXBwJyxcbiAgICAgICAgICBzaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGJrQ29yZU1hbmFnZXIuc2V0QmtBcHBJbXBsKF9pbXBsKTtcblxuICAgICAgICAkc2NvcGUuZ290b0NvbnRyb2xQYW5lbCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGJrVXRpbHMuaXNNaWRkbGVDbGljayhldmVudCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKCRsb2NhdGlvbi5hYnNVcmwoKSArICcvYmVha2VyJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBzZXR1cCBtZW51c1xuICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoJy4uL2JlYWtlci9yZXN0L3V0aWwvZ2V0Q29udHJvbFBhbmVsTWVudVBsdWdpbnMnKVxuICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtZW51VXJscykge1xuICAgICAgICAgICAgICAgIG1lbnVVcmxzLmZvckVhY2goZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmxvYWRNZW51UGx1Z2luKHVybCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51ZXMgPSB3aW5kb3cuYmVha2VyLmdldENvbnRyb2xNZW51SXRlbXMoKTtcbiAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmF0dGFjaE1lbnVzKG1lbnVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICRzY29wZS5nZXRNZW51cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia01lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYWN0aW9ucyBmb3IgVUlcbiAgICAgICAgJHNjb3BlLm5ld05vdGVib29rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5uZXdTZXNzaW9uKGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm5ld0VtcHR5Tm90ZWJvb2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLm5ld1Nlc3Npb24odHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5vcGVuVHV0b3JpYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLm9wZW5Ob3RlYm9vaygnY29uZmlnL3R1dG9yaWFsLmJrcicsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYXNrIGZvciB0cmFja2luZyBwZXJtaXNzaW9uXG4gICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKCh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpICYmIGJrVHJhY2suaXNOZWVkUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KCcuLi9iZWFrZXIvcmVzdC91dGlsL2dldFByZWZlcmVuY2UnLHtcbiAgICAgICAgICAgICdwcmVmZXJlbmNlJzogJ2FsbG93LWFub255bW91cy11c2FnZS10cmFja2luZydcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGFsbG93KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFsbG93LmRhdGEpIHtcbiAgICAgICAgICAgICAgY2FzZSAndHJ1ZSc6XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5iZWFrZXIgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuYmVha2VyLmlzRW1iZWRkZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2lzQWxsb3dBbm9ueW1vdXNUcmFja2luZycsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgYWxsb3cgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhbGxvdyA9ICd0cnVlJztcbiAgICAgICAgICAgICAgICBia1RyYWNrLmVuYWJsZSgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGFsbG93ID0gJ2ZhbHNlJztcbiAgICAgICAgICAgICAgICBia1RyYWNrLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBia1V0aWxzLmh0dHBQb3N0KCcuLi9iZWFrZXIvcmVzdC91dGlsL3NldFByZWZlcmVuY2UnLCB7XG4gICAgICAgICAgICAgICAgcHJlZmVyZW5jZW5hbWU6ICdhbGxvdy1hbm9ueW1vdXMtdXNhZ2UtdHJhY2tpbmcnLFxuICAgICAgICAgICAgICAgIHByZWZlcmVuY2V2YWx1ZTogYWxsb3dcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnNob3dXaGF0V2VMb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93TW9kYWxEaWFsb2coXG4gICAgICAgICAgICBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgSlNUWydjb250cm9scGFuZWwvd2hhdF93ZV9sb2cnXSgpXG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuXHR2YXIga2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLnNoaWZ0S2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ3RybCArIFNoaWZ0ICsgblxuXHQgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3Tm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0pO1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH0gZWxzZSBpZiAoZS5jdHJsS2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ3RybCArIG5cblx0ICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld0VtcHR5Tm90ZWJvb2soKTtcbiAgICAgICAgICAgICB9KTtcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmIGUuc2hpZnRLZXkgJiYgKGUud2hpY2ggPT09IDc4KSkgeyAvLyBDbWQgKyBTaGlmdCArIG5cblx0ICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld05vdGVib29rKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ21kICsgblxuICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3RW1wdHlOb3RlYm9vaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHR9XG5cdGNvbnNvbGUubG9nKCdpbnN0YWxsaW5nIGtleWRvd25IYW5kbGVyJyk7XG5cdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG5cblx0dmFyIG9uRGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgJChkb2N1bWVudCkudW5iaW5kKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuXHR9XG5cdCRzY29wZS4kb24oJyRkZXN0cm95Jywgb25EZXN0cm95KTtcblxuICAgICAgICAvLyBzZXNzaW9ucyBsaXN0IFVJXG4gICAgICAgICRzY29wZS5zZXNzaW9ucyA9IG51bGw7XG4gICAgICAgIC8vIGdldCBsaXN0IG9mIG9wZW5lZCBzZXNzaW9uc1xuICAgICAgICAkc2NvcGUucmVsb2FkU2Vzc2lvbnNMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtTZXNzaW9uLmdldFNlc3Npb25zKCkudGhlbihmdW5jdGlvbihzZXNzaW9ucykge1xuICAgICAgICAgICAgJHNjb3BlLnNlc3Npb25zID0gXyhzZXNzaW9ucykubWFwKGZ1bmN0aW9uKHNlc3Npb24sIHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICBzZXNzaW9uLmlkID0gc2Vzc2lvbklkO1xuICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUucmVsb2FkU2Vzc2lvbnNMaXN0KCk7XG4gICAgICAgICRzY29wZS5pc1Nlc3Npb25zTGlzdEVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF8uaXNFbXB0eSgkc2NvcGUuc2Vzc2lvbnMpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBiay5Db250cm9sUGFuZWxcbiAqIC0gVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgJ2NvbnRyb2wgcGFuZWwnIHNlY3Rpb24gb2YgYmVha2VyXG4gKiAtIEluIHRoZSBjb250cm9sIHBhbmVsLCB1c2VycyBnZXQgYSBsaXN0IG9mIG9wZW5lZCBzZXNzaW9ucyBhbmQgaXMgYWJsZSB0b1xuICogKHJlKW9wZW4gb25lIGluIGJrQXBwLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb250cm9sUGFuZWwnKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvbnRyb2xQYW5lbFNlc3Npb25JdGVtJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLCBia1Nlc3Npb24sIGJrQ29yZU1hbmFnZXIsIGJrUmVjZW50TWVudSwgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ2NvbnRyb2xwYW5lbC90YWJsZSddLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIub3BlblNlc3Npb24oc2Vzc2lvbi5pZCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICB2YXIgZm9ybWF0ID0gc2Vzc2lvbi5mb3JtYXQ7XG4gICAgICAgICAgdmFyIG5vdGVib29rTW9kZWwgPSBhbmd1bGFyLmZyb21Kc29uKHNlc3Npb24ubm90ZWJvb2tNb2RlbEpzb24pO1xuICAgICAgICAgIHZhciBlZGl0ZWQgPSBzZXNzaW9uLmVkaXRlZDtcbiAgICAgICAgICB2YXIgY2xvc2VTZXNzaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5jcmVhdGVFdmFsdWF0b3JUaGVuRXhpdChub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbaV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uLmNsb3NlKHNlc3Npb24uaWQpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRzY29wZS5yZWxvYWRTZXNzaW9uc0xpc3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKCFlZGl0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNsb3NlIHNlc3Npb25cbiAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBhc2sgaWYgdXNlciB3YW50IHRvIHNhdmUgZmlyc3RcbiAgICAgICAgICAgIGJrSGVscGVyLnNob3czQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgXCJEbyB5b3Ugd2FudCB0byBzYXZlIFtcIiArICRzY29wZS5nZXRDYXB0aW9uKHNlc3Npb24pICsgXCJdP1wiLFxuICAgICAgICAgICAgICAgIFwiQ29uZmlybSBjbG9zZVwiLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyAvLyB5ZXNcbiAgICAgICAgICAgICAgICAgIC8vIHNhdmUgc2Vzc2lvblxuICAgICAgICAgICAgICAgICAgdmFyIHNhdmVTZXNzaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsQXNTdHJpbmcgPSBia1V0aWxzLnRvUHJldHR5SnNvbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoc2Vzc2lvbi5ub3RlYm9va1VyaSkgJiYgIXNlc3Npb24ucmVhZE9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIoc2Vzc2lvbi51cmlUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZVNhdmVyLnNhdmUoc2Vzc2lvbi5ub3RlYm9va1VyaSwgbm90ZWJvb2tNb2RlbEFzU3RyaW5nLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyKCkudGhlbihmdW5jdGlvbihwYXRoSW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXRoSW5mby51cmkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVzZTogXCJTYXZlIGNhbmNlbGxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKHBhdGhJbmZvLnVyaVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2F2ZXIuc2F2ZShwYXRoSW5mby51cmksIG5vdGVib29rTW9kZWxBc1N0cmluZykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmtSZWNlbnRNZW51LnJlY29yZFJlY2VudERvY3VtZW50KGFuZ3VsYXIudG9Kc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogcGF0aEluZm8udXJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcGF0aEluZm8udXJpVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXy5pc0VtcHR5KGZvcm1hdCkgPyBcIlwiIDogZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdXNlOiBcImVycm9yIHNhdmluZyB0byBmaWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB2YXIgc2F2aW5nRmFpbGVkSGFuZGxlciA9IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uY2F1c2UgPT09IFwiU2F2ZSBjYW5jZWxsZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBzYXZpbmcgY2FuY2VsbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGJrSGVscGVyLnNob3cxQnV0dG9uTW9kYWwoaW5mby5lcnJvciwgaW5mby5jYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBzYXZlU2Vzc2lvbigpLnRoZW4oY2xvc2VTZXNzaW9uLCBzYXZpbmdGYWlsZWRIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyAvLyBub1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbG9zZSB3aXRob3V0IHNhdmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgICAgICAgLy8gbm8tb3BcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiU2F2ZVwiLFxuICAgICAgICAgICAgICAgIFwiRG9uJ3QgU2F2ZVwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0Q2FwdGlvbiA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICB2YXIgdXJsID0gc2Vzc2lvbi5ub3RlYm9va1VyaTtcbiAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiTmV3IE5vdGVib29rXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh1cmxbdXJsLmxlbmd0aCAtIDFdID09PSBcIi9cIikge1xuICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1cmwucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHNlc3Npb24ubm90ZWJvb2tVcmk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia0NlbGxNZW51UGx1Z2luTWFuYWdlclxuICogYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIgbG9hZCBhbmQgbWFuYWdlcyBsb2FkZWQgY2VsbCBtZW51IHBsdWdpbnMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNlbGxNZW51UGx1Z2luTWFuYWdlcicsIFtcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5oZWxwZXInICAvLyBUaGlzIGlzIG9ubHkgZm9yIGVuc3VyaW5nIHRoYXQgd2luZG93LmJrSGVscGVyIGlzIHNldCwgZG9uJ3QgdXNlIGJrSGVscGVyIGRpcmVjdGx5XG4gIF0pO1xuICBtb2R1bGUuZmFjdG9yeSgnYmtDZWxsTWVudVBsdWdpbk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzKSB7XG4gICAgLy8gbG9hZGVkIHBsdWdpbnNcbiAgICB2YXIgX2NlbGxNZW51UGx1Z2lucyA9IHt9O1xuXG4gICAgdmFyIGFkZFBsdWdpbiA9IGZ1bmN0aW9uKGNlbGxUeXBlLCBpdGVtR2V0dGVyKSB7XG4gICAgICBpZiAoIV9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdKSB7XG4gICAgICAgIF9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdID0gW107XG4gICAgICB9XG4gICAgICBfY2VsbE1lbnVQbHVnaW5zW2NlbGxUeXBlXS5wdXNoKGl0ZW1HZXR0ZXIpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZvciAodmFyIG1lbWJlciBpbiBfY2VsbE1lbnVQbHVnaW5zKSB7XG4gICAgICAgICAgZGVsZXRlIF9jZWxsTWVudVBsdWdpbnNbbWVtYmVyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KCcuLi9iZWFrZXIvcmVzdC91dGlsL2dldENlbGxNZW51UGx1Z2lucycpXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1lbnVVcmxzKSB7XG4gICAgICAgICAgICAgICAgbWVudVVybHMuZm9yRWFjaChzZWxmLmxvYWRQbHVnaW4pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWwgPSB3aW5kb3cuYmVha2VyLmdldENlbGxNZW51TGlzdCgpO1xuICAgICAgICAgIGlmIChfLmlzQXJyYXkobWwpKSB7XG4gICAgICAgICAgICB2YXIgaTsgICAgICBcbiAgICAgICAgICAgIGZvcihpPTA7IGk8bWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheShtbFtpXS5jZWxsVHlwZSkpIHtcbiAgICAgICAgICAgICAgICBfKG1sW2ldLmNlbGxUeXBlKS5lYWNoKGZ1bmN0aW9uKGNUeXBlKSB7XG4gICAgICAgICAgICAgICAgICBhZGRQbHVnaW4oY1R5cGUsIG1sW2ldLnBsdWdpbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkUGx1Z2luKG1sW2ldLmNlbGxUeXBlLCBtbFtpXS5wbHVnaW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbG9hZFBsdWdpbjogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRNb2R1bGUodXJsKS50aGVuKGZ1bmN0aW9uKGV4KSB7XG4gICAgICAgICAgaWYgKF8uaXNBcnJheShleC5jZWxsVHlwZSkpIHtcbiAgICAgICAgICAgIF8oZXguY2VsbFR5cGUpLmVhY2goZnVuY3Rpb24oY1R5cGUpIHtcbiAgICAgICAgICAgICAgYWRkUGx1Z2luKGNUeXBlLCBleC5wbHVnaW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZFBsdWdpbihleC5jZWxsVHlwZSwgZXgucGx1Z2luKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGV4LnBsdWdpbjtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0UGx1Z2luOiBmdW5jdGlvbihjZWxsVHlwZSkge1xuICAgICAgICByZXR1cm4gX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV07XG4gICAgICB9LFxuICAgICAgZ2V0TWVudUl0ZW1zOiBmdW5jdGlvbihjZWxsVHlwZSwgc2NvcGUpIHtcbiAgICAgICAgdmFyIG1lbnVJdGVtR2V0dGVycyA9IF9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdO1xuICAgICAgICB2YXIgbmV3SXRlbXMgPSBbXTtcbiAgICAgICAgXyhtZW51SXRlbUdldHRlcnMpLmVhY2goZnVuY3Rpb24oZ2V0dGVyKSB7XG4gICAgICAgICAgdmFyIGl0ZW1zID0gZ2V0dGVyKHNjb3BlKTtcbiAgICAgICAgICBfKGl0ZW1zKS5lYWNoKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICBuZXdJdGVtcy5wdXNoKGl0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXdJdGVtcztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5jb3JlXG4gKiBIb2xkcyB0aGUgY29yZSBvZiBiZWFrZXIgdXRpbGl0aWVzLiBJdCB3cmFwcyBvZiBsb3dlciBsZXZlbCB1dGlsaXRpZXMgdGhhdCBjb21lIGZyb20gb3RoZXJcbiAqIG1vZHVsZXMuXG4gKiBUaGUgdXNlciBmYWNpbmcgZGlyZWN0aXZlcyBhbHNvIHVzZSB0aGUgY29yZSBhcyBhIGNvbW11bmljYXRpb24vZXhjaGFuZ2UgbGF5ZXIuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnLCBbXG4gICAgJ3VpLmJvb3RzdHJhcCcsXG4gICAgJ3VpLmtleXByZXNzJyxcbiAgICAnYmsuY29tbW9uVWknLFxuICAgICdiay51dGlscycsXG4gICAgJ2JrLnJlY2VudE1lbnUnLFxuICAgICdiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXInLFxuICAgICdiay50cmVlVmlldydcbiAgXSk7XG5cbiAgLyoqXG4gICAqIGJrQ29yZU1hbmFnZXJcbiAgICogLSB0aGlzIGFjdHMgYXMgdGhlIGdsb2JhbCBzcGFjZSBmb3IgYWxsIHZpZXcgbWFuYWdlcnMgdG8gdXNlIGl0IGFzIHRoZSBjb21tdW5pY2F0aW9uIGNoYW5uZWxcbiAgICogLSBia1V0aWxzIHNob3VsZCBiZSBjb25zaWRlciAncHJpdmF0ZScgdG8gYmVha2VyLCBleHRlcm5hbCBjb2RlIHNob3VsZCBkZXBlbmQgb24gYmtIZWxwZXJcbiAgICogICAgIGluc3RlYWRcbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCdia0NvcmVNYW5hZ2VyJywgZnVuY3Rpb24oXG4gICAgICAkbW9kYWwsXG4gICAgICAkcm9vdFNjb3BlLFxuICAgICAgJGRvY3VtZW50LFxuICAgICAgJGxvY2F0aW9uLFxuICAgICAgJHNlc3Npb25TdG9yYWdlLFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrUmVjZW50TWVudSxcbiAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLFxuICAgICAgbW9kYWxEaWFsb2dPcCkge1xuXG4gICAgdmFyIEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5ID0gZnVuY3Rpb24gKCl7XG4gICAgICB2YXIgbmV3U3RyYXRlZ3kgPSB0aGlzO1xuICAgICAgbmV3U3RyYXRlZ3kuaW5wdXQgPSBcIlwiO1xuICAgICAgbmV3U3RyYXRlZ3kuZ2V0UmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXdTdHJhdGVneS5pbnB1dDtcbiAgICAgIH07XG4gICAgICBuZXdTdHJhdGVneS5jbG9zZSA9IGZ1bmN0aW9uKGV2LCBjbG9zZUZ1bmMpIHtcbiAgICAgICAgaWYgKGV2LndoaWNoID09PSAxMykge1xuICAgICAgICAgIGNsb3NlRnVuYyh0aGlzLmdldFJlc3VsdCgpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG5ld1N0cmF0ZWd5LnRyZWVWaWV3ZnMgPSB7IC8vIGZpbGUgc2VydmljZVxuICAgICAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24oYmFzZVBhdGgsIG9wZW5Gb2xkZXJzKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgIHBhdGhzID0gW2Jhc2VQYXRoXTtcblxuICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKG9wZW5Gb2xkZXJzKSB7XG4gICAgICAgICAgICB2YXIgcGF0aHMgPSBbcGF0aHNdLmNvbmNhdChvcGVuRm9sZGVycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuaHR0cFBvc3QoXCIuLi9iZWFrZXIvcmVzdC9maWxlLWlvL2dldERlY29yYXRlZENoaWxkcmVuXCIsIHtcbiAgICAgICAgICAgIG9wZW5Gb2xkZXJzOiBwYXRocy5qb2luKCcsJylcbiAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICBzZWxmLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2FkaW5nIGNoaWxkcmVuXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmaWxsSW5wdXQ6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICBuZXdTdHJhdGVneS5pbnB1dCA9IHBhdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICB0aGlzLmZpbGxJbnB1dChwYXRoKTtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ21vZGFsLnN1Ym1pdCcpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRPcmRlckJ5OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyQnkgPSBvcHRpb25zLm9yZGVyQnk7XG4gICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyUmV2ZXJzZSA9IG9wdGlvbnMucmV2ZXJzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JkZXJCeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRyb290U2NvcGUuZnNQcmVmcy5vcmRlckJ5IHx8ICd1cmknO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPcmRlclJldmVyc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISRyb290U2NvcGUuZnNQcmVmcy5vcmRlclJldmVyc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFByZXR0eU9yZGVyQnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcmV0dHlOYW1lcyA9IHtcbiAgICAgICAgICAgIHVyaTogJ05hbWUnLFxuICAgICAgICAgICAgbW9kaWZpZWQ6ICdEYXRlIE1vZGlmaWVkJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwcmV0dHlOYW1lc1skcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJCeSB8fCAndXJpJ107XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dTcGlubmVyOiBmYWxzZSxcbiAgICAgICAgYXBwbHlFeHRGaWx0ZXI6IHRydWUsXG4gICAgICAgIGV4dEZpbHRlcjogWydia3InXSxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIHZhciBmcyA9IG5ld1N0cmF0ZWd5LnRyZWVWaWV3ZnM7XG4gICAgICAgICAgaWYgKCFmcy5hcHBseUV4dEZpbHRlciB8fCBfLmlzRW1wdHkoZnMuZXh0RmlsdGVyKSB8fCBjaGlsZC50eXBlID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF8oZnMuZXh0RmlsdGVyKS5hbnkoZnVuY3Rpb24oZXh0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfLnN0cmluZy5lbmRzV2l0aChjaGlsZC51cmksIGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIGltcG9ydGVycyBhcmUgcmVzcG9uc2libGUgZm9yIGltcG9ydGluZyB2YXJpb3VzIGZvcm1hdHMgaW50byBia3JcbiAgICAvLyBpbXBvcnRlciBpbXBsIG11c3QgZGVmaW5lIGFuICdpbXBvcnQnIG1ldGhvZFxuICAgIHZhciBfaW1wb3J0ZXJzID0ge307XG4gICAgdmFyIEZPUk1BVF9CS1IgPSBcImJrclwiO1xuICAgIF9pbXBvcnRlcnNbRk9STUFUX0JLUl0gPSB7XG4gICAgICBpbXBvcnQ6IGZ1bmN0aW9uKG5vdGVib29rSnNvbikge1xuICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtVdGlscy5mcm9tUHJldHR5SnNvbihub3RlYm9va0pzb24pO1xuICAgICAgICAgIC8vIFRPRE8sIHRvIGJlIHJlbW92ZWQuIEFkZHJlc3NpbmcgbG9hZGluZyBhIGNvcnJ1cHRlZCBub3RlYm9vay5cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhub3RlYm9va01vZGVsKSkge1xuICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrVXRpbHMuZnJvbVByZXR0eUpzb24obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICBia1V0aWxzLmxvZyhcImNvcnJ1cHRlZC1ub3RlYm9va1wiLCB7IG5vdGVib29rVXJpOiBlbmhhbmNlZE5vdGVib29rVXJpIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoaXMgaXMgbm90IGEgdmFsaWQgQmVha2VyIG5vdGVib29rIEpTT05cIik7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihub3RlYm9va0pzb24pO1xuICAgICAgICAgIHRocm93IFwiTm90IGEgdmFsaWQgQmVha2VyIG5vdGVib29rXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vdGVib29rTW9kZWw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBMT0NBVElPTl9GSUxFU1lTID0gXCJmaWxlXCI7XG4gICAgdmFyIExPQ0FUSU9OX0hUVFAgPSBcImh0dHBcIjtcbiAgICB2YXIgTE9DQVRJT05fQUpBWCA9IFwiYWpheFwiO1xuXG4gICAgLy8gZmlsZUxvYWRlcnMgYXJlIHJlc3BvbnNpYmxlIGZvciBsb2FkaW5nIGZpbGVzIGFuZCBvdXRwdXQgdGhlIGZpbGUgY29udGVudCBhcyBzdHJpbmdcbiAgICAvLyBmaWxlTG9hZGVyIGltcGwgbXVzdCBkZWZpbmUgYW4gJ2xvYWQnIG1ldGhvZCB3aGljaCByZXR1cm5zIGEgdGhlbi1hYmxlXG4gICAgdmFyIF9maWxlTG9hZGVycyA9IHt9O1xuICAgIF9maWxlTG9hZGVyc1tMT0NBVElPTl9GSUxFU1lTXSA9IHtcbiAgICAgIGxvYWQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkRmlsZSh1cmkpO1xuICAgICAgfVxuICAgIH07XG4gICAgX2ZpbGVMb2FkZXJzW0xPQ0FUSU9OX0hUVFBdID0ge1xuICAgICAgbG9hZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRIdHRwKHVyaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBfZmlsZUxvYWRlcnNbTE9DQVRJT05fQUpBWF0gPSB7XG4gICAgICBsb2FkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZEFqYXgodXJpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZmlsZVNhdmVycyBhcmUgcmVzcG9uc2libGUgZm9yIHNhdmluZyB2YXJpb3VzIGZvcm1hdHMgaW50byBia3JcbiAgICAvLyBmaWxlTG9hZGVyIGltcGwgbXVzdCBkZWZpbmUgYW4gJ2xvYWQnIG1ldGhvZCB3aGljaCByZXR1cm5zIGEgdGhlbi1hYmxlXG4gICAgdmFyIF9maWxlU2F2ZXJzID0ge307XG5cbiAgICBfZmlsZVNhdmVyc1tMT0NBVElPTl9GSUxFU1lTXSA9IHtcbiAgICAgIHNhdmU6IGZ1bmN0aW9uKHVyaSwgY29udGVudEFzU3RyaW5nLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2F2ZUZpbGUodXJpLCBjb250ZW50QXNTdHJpbmcsIG92ZXJ3cml0ZSk7XG4gICAgICB9LFxuICAgICAgc2hvd0ZpbGVDaG9vc2VyOiBmdW5jdGlvbihpbml0VXJpKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXIoaW5pdFVyaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9maWxlU2F2ZXJzW0xPQ0FUSU9OX0FKQVhdID0ge1xuICAgICAgc2F2ZTogZnVuY3Rpb24odXJpLCBjb250ZW50QXNTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2F2ZUFqYXgodXJpLCBjb250ZW50QXNTdHJpbmcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgaW1wb3J0SW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkaW5wdXQsXG4gICAgICAgICAgZW5kcG9pbnQgPSAnLi4vYmVha2VyL2ZpbGV1cGxvYWQnO1xuXG4gICAgICBpZiAoKCRpbnB1dCA9ICQoJ2lucHV0I2ltcG9ydC1ub3RlYm9vaycpKS5sZW5ndGgpIHJldHVybiAkaW5wdXQ7XG5cbiAgICAgICRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwiZmlsZVwiIG5hbWU9XCJmaWxlXCIgaWQ9XCJpbXBvcnQtbm90ZWJvb2tcIiAnICtcbiAgICAgICAgICAgICAgICAgJ2RhdGEtdXJsPVwiJyArIGVuZHBvaW50ICsgJ1wiICcgK1xuICAgICAgICAgICAgICAgICAnc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpXG4gICAgICAgICAgICAgICAgLnByZXBlbmRUbygnYm9keScpO1xuXG4gICAgICAkaW5wdXQuZmlsZXVwbG9hZCh7XG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRvbmU6IGZ1bmN0aW9uKGUsIGRhdGEpIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmltcG9ydE5vdGVib29rKGRhdGEucmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAkaW5wdXQ7XG4gICAgfTtcblxuICAgIHZhciBia0NvcmVNYW5hZ2VyID0ge1xuXG4gICAgICBzZXROb3RlYm9va0ltcG9ydGVyOiBmdW5jdGlvbihmb3JtYXQsIGltcG9ydGVyKSB7XG4gICAgICAgIF9pbXBvcnRlcnNbZm9ybWF0XSA9IGltcG9ydGVyO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rSW1wb3J0ZXI6IGZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gX2ltcG9ydGVyc1tmb3JtYXRdO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVMb2FkZXI6IGZ1bmN0aW9uKHVyaVR5cGUsIGZpbGVMb2FkZXIpIHtcbiAgICAgICAgX2ZpbGVMb2FkZXJzW3VyaVR5cGVdID0gZmlsZUxvYWRlcjtcbiAgICAgIH0sXG4gICAgICBnZXRGaWxlTG9hZGVyOiBmdW5jdGlvbih1cmlUeXBlKSB7XG4gICAgICAgIHJldHVybiBfZmlsZUxvYWRlcnNbdXJpVHlwZV07XG4gICAgICB9LFxuICAgICAgc2V0RmlsZVNhdmVyOiBmdW5jdGlvbih1cmlUeXBlLCBmaWxlU2F2ZXIpIHtcbiAgICAgICAgX2ZpbGVTYXZlcnNbdXJpVHlwZV0gPSBmaWxlU2F2ZXI7XG4gICAgICB9LFxuICAgICAgZ2V0RmlsZVNhdmVyOiBmdW5jdGlvbih1cmlUeXBlKSB7XG4gICAgICAgIHJldHVybiBfZmlsZVNhdmVyc1t1cmlUeXBlXTtcbiAgICAgIH0sXG4gICAgICBndWVzc1VyaVR5cGU6IGZ1bmN0aW9uKG5vdGVib29rVXJpKSB7XG4gICAgICAgIC8vIFRPRE8sIG1ha2Ugc21hcnRlciBndWVzc1xuICAgICAgICBpZiAoL15odHRwcz86XFwvXFwvLy5leGVjKG5vdGVib29rVXJpKSkge1xuICAgICAgICAgIHJldHVybiBMT0NBVElPTl9IVFRQO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKC9eYWpheDovLmV4ZWMobm90ZWJvb2tVcmkpKSB7XG4gICAgICAgICAgcmV0dXJuIExPQ0FUSU9OX0FKQVg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIExPQ0FUSU9OX0ZJTEVTWVM7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBndWVzc0Zvcm1hdDogZnVuY3Rpb24obm90ZWJvb2tVcmkpIHtcbiAgICAgICAgLy8gVE9ETywgbWFrZSBzbWFydGVyIGd1ZXNzXG4gICAgICAgIHJldHVybiBGT1JNQVRfQktSO1xuICAgICAgfSxcblxuICAgICAgX2JlYWtlclJvb3RPcDogbnVsbCxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKGJlYWtlclJvb3RPcCkge1xuICAgICAgICB0aGlzLl9iZWFrZXJSb290T3AgPSBiZWFrZXJSb290T3A7XG4gICAgICAgIGJrUmVjZW50TWVudS5pbml0KHtcbiAgICAgICAgICBvcGVuOiBiZWFrZXJSb290T3Aub3Blbk5vdGVib29rXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdvdG9Db250cm9sUGFuZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmVha2VyUm9vdE9wLmdvdG9Db250cm9sUGFuZWwoKTtcbiAgICAgIH0sXG4gICAgICBuZXdTZXNzaW9uOiBmdW5jdGlvbihlbXB0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmVha2VyUm9vdE9wLm5ld1Nlc3Npb24oZW1wdHkpO1xuICAgICAgfSxcbiAgICAgIG9wZW5TZXNzaW9uOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JlYWtlclJvb3RPcC5vcGVuU2Vzc2lvbihzZXNzaW9uSWQpO1xuICAgICAgfSxcbiAgICAgIG9wZW5Ob3RlYm9vazogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpIHtcbiAgICAgICAgdGhpcy5fYmVha2VyUm9vdE9wLm9wZW5Ob3RlYm9vayhub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCk7XG4gICAgICB9LFxuICAgICAgYWRkSW1wb3J0SW5wdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpbXBvcnRJbnB1dCgpO1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vdGVib29rRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaW1wb3J0SW5wdXQoKS5jbGljaygpO1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vdGVib29rOiBmdW5jdGlvbihub3RlYm9vaykge1xuICAgICAgICAkc2Vzc2lvblN0b3JhZ2UuaW1wb3J0ZWROb3RlYm9vayA9IG5vdGVib29rO1xuXG4gICAgICAgIHJldHVybiAkcm9vdFNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9zZXNzaW9uL2ltcG9ydFwiKS5zZWFyY2goe30pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyOiBmdW5jdGlvbihpbml0UGF0aCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYmtVdGlscy5hbGwoW2JrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpLCBia1V0aWxzLmdldFN0YXJ0VXBEaXJlY3RvcnkoKV0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgICAgICB2YXIgaG9tZURpciA9IHZhbHVlc1swXTtcbiAgICAgICAgICB2YXIgcHdkID0gdmFsdWVzWzFdO1xuICAgICAgICAgIHZhciBmaWxlQ2hvb3NlclN0cmF0ZWd5ID0gc2VsZi5nZXRGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneSgpO1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kuaW5wdXQgPSBpbml0UGF0aDtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5LmdldFJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfLmlzRW1wdHkodGhpcy5pbnB1dCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbnB1dDtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09ICd+Jykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBob21lRGlyICsgXCIvXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5zdHJpbmcuc3RhcnRzV2l0aChyZXN1bHQsICd+LycpKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCd+JywgaG9tZURpcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFfLnN0cmluZy5zdGFydHNXaXRoKHJlc3VsdCwgJy8nKSAmJiAhcmVzdWx0Lm1hdGNoKC9eXFx3KzpcXFxcLykpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gcHdkICsgXCIvXCIgKyByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uc3RyaW5nLmVuZHNXaXRoKHJlc3VsdCwgJy5ia3InKVxuICAgICAgICAgICAgICAgICYmICFfLnN0cmluZy5lbmRzV2l0aChyZXN1bHQsICcvJykpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgXCIuYmtyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS5uZXdGb2xkZXIgPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNob3dTcGlubmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJrVXRpbHMuaHR0cFBvc3QoXCIuLi9iZWFrZXIvcmVzdC9maWxlLWlvL2NyZWF0ZURpcmVjdG9yeVwiLCB7cGF0aDogcGF0aH0pXG4gICAgICAgICAgICAgICAgLmNvbXBsZXRlKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5LmdldFNhdmVCdG5EaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIF8uaXNFbXB0eSh0aGlzLmlucHV0KSB8fCBfLnN0cmluZy5lbmRzV2l0aCh0aGlzLmlucHV0LCAnLycpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS50cmVlVmlld2ZzLmFwcGx5RXh0RmlsdGVyID0gZmFsc2U7XG4gICAgICAgICAgdmFyIGZpbGVDaG9vc2VyVGVtcGxhdGUgPSBKU1RbJ3RlbXBsYXRlL3NhdmVub3RlYm9vayddKHtob21lZGlyOiBob21lRGlyLCBwd2Q6IHB3ZCB9KTtcbiAgICAgICAgICB2YXIgZmlsZUNob29zZXJSZXN1bHRIYW5kbGVyID0gZnVuY3Rpb24gKGNob3NlbkZpbGVQYXRoKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgdXJpOiBjaG9zZW5GaWxlUGF0aCxcbiAgICAgICAgICAgICAgdXJpVHlwZTogTE9DQVRJT05fRklMRVNZU1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHNlbGYuc2hvd01vZGFsRGlhbG9nKFxuICAgICAgICAgICAgICBmaWxlQ2hvb3NlclJlc3VsdEhhbmRsZXIsXG4gICAgICAgICAgICAgIGZpbGVDaG9vc2VyVGVtcGxhdGUsXG4gICAgICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuXG4gICAgICBjb2RlTWlycm9yT3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIG5vdGVib29rQ2VsbE9wKSB7XG4gICAgICAgIHZhciBnb1VwT3JNb3ZlRm9jdXNVcCA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgaWYgKCQoJy5Db2RlTWlycm9yLWhpbnQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvL2NvZGVjb21wbGV0ZSBpcyB1cCwgc2tpcFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY20uZ2V0Q3Vyc29yKCkubGluZSA9PT0gMCkge1xuICAgICAgICAgICAgbW92ZUZvY3VzVXAoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJnb0xpbmVVcFwiKTtcbiAgICAgICAgICAgIHZhciB0b3AgPSBjbS5jdXJzb3JDb29yZHModHJ1ZSwnd2luZG93JykudG9wO1xuICAgICAgICAgICAgaWYgKCB0b3AgPCAxNTApXG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCB0b3AtMTUwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdvRG93bk9yTW92ZUZvY3VzRG93biA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgaWYgKCQoJy5Db2RlTWlycm9yLWhpbnQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvL2NvZGVjb21wbGV0ZSBpcyB1cCwgc2tpcFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY20uZ2V0Q3Vyc29yKCkubGluZSA9PT0gY20uZG9jLnNpemUgLSAxKSB7XG4gICAgICAgICAgICBtb3ZlRm9jdXNEb3duKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiZ29MaW5lRG93blwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVGb2N1c0Rvd24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBtb3ZlIGZvY3VzIHRvIG5leHQgY29kZSBjZWxsXG4gICAgICAgICAgdmFyIHRoaXNDZWxsSWQgPSBzY29wZS5jZWxsbW9kZWwuaWQ7XG4gICAgICAgICAgdmFyIG5leHRDZWxsID0gbm90ZWJvb2tDZWxsT3AuZ2V0TmV4dCh0aGlzQ2VsbElkKTtcbiAgICAgICAgICB3aGlsZSAobmV4dENlbGwpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5ia05vdGVib29rLmdldEZvY3VzYWJsZShuZXh0Q2VsbC5pZCkpIHtcbiAgICAgICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5nZXRGb2N1c2FibGUobmV4dENlbGwuaWQpLmZvY3VzKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV4dENlbGwgPSBub3RlYm9va0NlbGxPcC5nZXROZXh0KG5leHRDZWxsLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVGb2N1c1VwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gbW92ZSBmb2N1cyB0byBwcmV2IGNvZGUgY2VsbFxuICAgICAgICAgIHZhciB0aGlzQ2VsbElEID0gc2NvcGUuY2VsbG1vZGVsLmlkO1xuICAgICAgICAgIHZhciBwcmV2Q2VsbCA9IG5vdGVib29rQ2VsbE9wLmdldFByZXYodGhpc0NlbGxJRCk7XG4gICAgICAgICAgd2hpbGUgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHNjb3BlLmJrTm90ZWJvb2suZ2V0Rm9jdXNhYmxlKHByZXZDZWxsLmlkKTtcbiAgICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICAgIHQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgdmFyIHRvcCA9IHQuY20uY3Vyc29yQ29vcmRzKHRydWUsJ3dpbmRvdycpLnRvcDtcbiAgICAgICAgICAgICAgaWYgKCB0b3AgPCAxNTApXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIHRvcC0xNTApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHByZXZDZWxsID0gbm90ZWJvb2tDZWxsT3AuZ2V0UHJldihwcmV2Q2VsbC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBldmFsdWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmV2YWx1YXRlKCk7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGV2YWx1YXRlQW5kR29Eb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuZXZhbHVhdGUoKTtcbiAgICAgICAgICBtb3ZlRm9jdXNEb3duKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1heWJlU2hvd0F1dG9Db21wbGV0ZSA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLmJrTm90ZWJvb2suZ2V0Q01LZXlNYXBNb2RlKCkgPT09IFwiZW1hY3NcIikge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgICAgIGNtLnNldEV4dGVuZGluZyghY20uZ2V0RXh0ZW5kaW5nKCkpO1xuICAgICAgICAgICAgY20ub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNtLnNldEV4dGVuZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd0F1dG9Db21wbGV0ZShjbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzaG93QXV0b0NvbXBsZXRlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgZ2V0VG9rZW4gPSBmdW5jdGlvbihlZGl0b3IsIGN1cikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvci5nZXRUb2tlbkF0KGN1cik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgZ2V0SGludHMgPSBmdW5jdGlvbihlZGl0b3IsIHNob3dIaW50Q0IsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBjdXIgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBnZXRUb2tlbihlZGl0b3IsIGN1cik7XG4gICAgICAgICAgICB2YXIgY3Vyc29yUG9zID0gZWRpdG9yLmluZGV4RnJvbVBvcyhjdXIpO1xuICAgICAgICAgICAgLy8gV2UgbWlnaHQgd2FudCB0aGlzIGRlZmluZWQgYnkgdGhlIHBsdWdpbi5cbiAgICAgICAgICAgIHZhciBvblJlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHRzLCBtYXRjaGVkX3RleHQsIGRvdEZpeCkge1xuICAgICAgICAgICAgICB2YXIgc3RhcnQgPSB0b2tlbi5zdGFydDtcbiAgICAgICAgICAgICAgdmFyIGVuZCA9IHRva2VuLmVuZDtcbiAgICAgICAgICAgICAgaWYgKGRvdEZpeCAmJiB0b2tlbi5zdHJpbmcgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobWF0Y2hlZF90ZXh0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgKz0gKGN1ci5jaCAtIHRva2VuLnN0YXJ0IC0gbWF0Y2hlZF90ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBtYXRjaGVkX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNob3dIaW50Q0Ioe1xuICAgICAgICAgICAgICAgIGxpc3Q6IF8udW5pcShyZXN1bHRzKSxcbiAgICAgICAgICAgICAgICBmcm9tOiBDb2RlTWlycm9yLlBvcyhjdXIubGluZSwgc3RhcnQpLFxuICAgICAgICAgICAgICAgIHRvOiBDb2RlTWlycm9yLlBvcyhjdXIubGluZSwgZW5kKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5hdXRvY29tcGxldGUoY3Vyc29yUG9zLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoY20uZ2V0T3B0aW9uKCdtb2RlJykgPT09ICdodG1sbWl4ZWQnIHx8IGNtLmdldE9wdGlvbignbW9kZScpID09PSAnamF2YXNjcmlwdCcpIHtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiYXV0b2NvbXBsZXRlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgIGNsb3NlT25VbmZvY3VzOiB0cnVlLFxuICAgICAgICAgICAgICBhbGlnbldpdGhXb3JkOiB0cnVlLFxuICAgICAgICAgICAgICBjb21wbGV0ZVNpbmdsZTogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2hvd0hpbnQoY20sIGdldEhpbnRzLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVDZWxsVXAgPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLm1vdmVVcChzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVDZWxsRG93biA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3AubW92ZURvd24oc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkZWxldGVDZWxsID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5kZWxldGUoc2NvcGUuY2VsbG1vZGVsLmlkLCB0cnVlKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdGFiID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgdmFyIGxlZnRMaW5lID0gY20uZ2V0UmFuZ2Uoe2xpbmU6IGN1cnNvci5saW5lLCBjaDogMH0sIGN1cnNvcik7XG4gICAgICAgICAgaWYgKGxlZnRMaW5lLm1hdGNoKC9eXFxzKiQvKSkge1xuICAgICAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJpbmRlbnRNb3JlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QXV0b0NvbXBsZXRlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmFja3NwYWNlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcihcImFuY2hvclwiKTtcbiAgICAgICAgICBpZiAoY3Vyc29yLmxpbmUgIT0gYW5jaG9yLmxpbmUgfHwgY3Vyc29yLmNoICE9IGFuY2hvci5jaCkge1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKFwiXCIsIGN1cnNvciwgYW5jaG9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGxlZnRMaW5lID0gY20uZ2V0UmFuZ2Uoe2xpbmU6IGN1cnNvci5saW5lLCBjaDogMH0sIGN1cnNvcik7XG4gICAgICAgICAgaWYgKGxlZnRMaW5lLm1hdGNoKC9eXFxzKyQvKSkge1xuICAgICAgICAgICAgY20uZGVsZXRlSCgtMSwgXCJjaGFyXCIpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGNtLmdldE9wdGlvbignaW5kZW50VW5pdCcpO1xuICAgICAgICAgICAgd2hpbGUgKChjbS5nZXRDdXJzb3IoKS5jaCAlIGluZGVudCkgIT0gMCkge1xuICAgICAgICAgICAgICBjbS5kZWxldGVIKC0xLCBcImNoYXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLmRlbGV0ZUgoLTEsIFwiY2hhclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxuICAgICAgICAgIG1hdGNoQnJhY2tldHM6IHRydWUsXG4gICAgICAgICAgZXh0cmFLZXlzOiB7XG4gICAgICAgICAgICBcIlVwXCIgOiBnb1VwT3JNb3ZlRm9jdXNVcCxcbiAgICAgICAgICAgIFwiRG93blwiIDogZ29Eb3duT3JNb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJDdHJsLVNcIjogXCJzYXZlXCIsXG4gICAgICAgICAgICBcIkNtZC1TXCI6IFwic2F2ZVwiLFxuICAgICAgICAgICAgXCJBbHQtRG93blwiOiBtb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJBbHQtSlwiOiBtb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJBbHQtVXBcIjogbW92ZUZvY3VzVXAsXG4gICAgICAgICAgICBcIkFsdC1LXCI6IG1vdmVGb2N1c1VwLFxuICAgICAgICAgICAgXCJDdHJsLUVudGVyXCI6IGV2YWx1YXRlLFxuICAgICAgICAgICAgXCJDbWQtRW50ZXJcIjogZXZhbHVhdGUsXG4gICAgICAgICAgICBcIlNoaWZ0LUVudGVyXCI6IGV2YWx1YXRlQW5kR29Eb3duLFxuICAgICAgICAgICAgXCJDdHJsLVNwYWNlXCI6IG1heWJlU2hvd0F1dG9Db21wbGV0ZSxcbiAgICAgICAgICAgIFwiQ21kLVNwYWNlXCI6IHNob3dBdXRvQ29tcGxldGUsXG4gICAgICAgICAgICBcIkN0cmwtQWx0LVVwXCI6IG1vdmVDZWxsVXAsXG4gICAgICAgICAgICBcIkNtZC1BbHQtVXBcIjogbW92ZUNlbGxVcCxcbiAgICAgICAgICAgIFwiQ3RybC1BbHQtRG93blwiOiBtb3ZlQ2VsbERvd24sXG4gICAgICAgICAgICBcIkNtZC1BbHQtRG93blwiOiBtb3ZlQ2VsbERvd24sXG4gICAgICAgICAgICBcIkN0cmwtQWx0LURcIjogZGVsZXRlQ2VsbCxcbiAgICAgICAgICAgIFwiQ21kLUFsdC1EXCI6IGRlbGV0ZUNlbGwsXG4gICAgICAgICAgICBcIlRhYlwiOiB0YWIsXG4gICAgICAgICAgICBcIkJhY2tzcGFjZVwiOiBiYWNrc3BhY2UsXG4gICAgICAgICAgICBcIkN0cmwtL1wiOiBcInRvZ2dsZUNvbW1lbnRcIixcbiAgICAgICAgICAgIFwiQ21kLS9cIjogXCJ0b2dnbGVDb21tZW50XCJcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBfYmtBcHBJbXBsOiBudWxsLFxuICAgICAgc2V0QmtBcHBJbXBsOiBmdW5jdGlvbihia0FwcE9wKSB7XG4gICAgICAgIHRoaXMuX2JrQXBwSW1wbCA9IGJrQXBwT3A7XG4gICAgICB9LFxuICAgICAgZ2V0QmtBcHA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmtBcHBJbXBsO1xuICAgICAgfSxcblxuICAgICAgZ2V0UmVjZW50TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrUmVjZW50TWVudS5nZXRNZW51SXRlbXMoKTtcbiAgICAgIH0sXG5cbiAgICAgIGdldE5vdGVib29rRWxlbWVudDogZnVuY3Rpb24oY3VycmVudFNjb3BlKSB7XG4gICAgICAgIC8vIFdhbGsgdXAgdGhlIHNjb3BlIHRyZWUgYW5kIGZpbmQgdGhlIG9uZSB0aGF0IGhhcyBhY2Nlc3MgdG8gdGhlXG4gICAgICAgIC8vIG5vdGVib29rIGVsZW1lbnQgKG5vdGVib29rIGRpcmVjdGl2ZSBzY29wZSwgc3BlY2lmaWNhbGx5KVxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChjdXJyZW50U2NvcGUuZ2V0Tm90ZWJvb2tFbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rRWxlbWVudChjdXJyZW50U2NvcGUuJHBhcmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRTY29wZS5nZXROb3RlYm9va0VsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rQ2VsbE1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXI7XG4gICAgICB9LFxuICAgICAgLy8gZ2VuZXJhbFxuICAgICAgc2hvd01vZGFsRGlhbG9nOiBmdW5jdGlvbihjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHdpbmRvd0NsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICAgICAgYmFja2Ryb3BDbGljazogdHJ1ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbW9kYWxEaWFsb2dDdHJsJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhdHRhY2hTdWJtaXRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRkb2N1bWVudC5vbigna2V5ZG93bi5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAkKCcubW9kYWwgLm1vZGFsLXN1Ym1pdCcpLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlbW92ZVN1Ym1pdExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGRvY3VtZW50Lm9mZigna2V5ZG93bi5tb2RhbCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFhYWCAtIHRlbXBsYXRlIGlzIHNvbWV0aW1lcyBhIHVybCBub3cuXG4gICAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKCdhcHAvdGVtcGxhdGUvJykgPT09IDApIHtcbiAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlVXJsID0gdGVtcGxhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kYWxEaWFsb2dPcC5zZXRTdHJhdGVneShzdHJhdGVneSk7XG4gICAgICAgIHZhciBkZCA9ICRtb2RhbC5vcGVuKG9wdGlvbnMpO1xuXG4gICAgICAgIGF0dGFjaFN1Ym1pdExpc3RlbmVyKCk7XG5cbiAgICAgICAgZGQucmVzdWx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmVtb3ZlU3VibWl0TGlzdGVuZXIoKTtcblxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlbW92ZVN1Ym1pdExpc3RlbmVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZDtcbiAgICAgIH0sXG4gICAgICBzaG93MEJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIpIHtcbiAgICAgICAgaWYgKCFtc2dIZWFkZXIpIHtcbiAgICAgICAgICBtc2dIZWFkZXIgPSBcIk9vcHMuLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9J21vZGFsLWhlYWRlcic+XCIgK1xuICAgICAgICAgICAgXCI8aDE+XCIgKyBtc2dIZWFkZXIgKyBcIjwvaDE+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J21vZGFsLWJvZHknPjxwPlwiICsgbXNnQm9keSArIFwiPC9wPjwvZGl2PlwiIDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKG51bGwsIHRlbXBsYXRlKTtcbiAgICAgIH0sXG4gICAgICBzaG93MUJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIsIGNhbGxiYWNrLCBidG5UZXh0LCBidG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiT29wcy4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIGJ0blRleHQgPSBidG5UZXh0ID8gYnRuVGV4dCA6IFwiQ2xvc2VcIjtcbiAgICAgICAgYnRuQ2xhc3MgPSBidG5DbGFzcyA/IF8uaXNBcnJheShidG5DbGFzcykgPyBidG5DbGFzcy5qb2luKCcgJykgOiBidG5DbGFzcyA6ICdidG4tcHJpbWFyeSc7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz0nbW9kYWwtaGVhZGVyJz5cIiArXG4gICAgICAgICAgICBcIjxoMT5cIiArIG1zZ0hlYWRlciArIFwiPC9oMT5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbW9kYWwtYm9keSc+PHA+XCIgKyBtc2dCb2R5ICsgXCI8L3A+PC9kaXY+XCIgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0nYnRuIFwiICsgYnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIk9LXFxcIiknPlwiICsgYnRuVGV4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKGNhbGxiYWNrLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgc2hvdzJCdXR0b25Nb2RhbDogZnVuY3Rpb24oXG4gICAgICAgICAgbXNnQm9keSxcbiAgICAgICAgICBtc2dIZWFkZXIsXG4gICAgICAgICAgb2tDQiwgY2FuY2VsQ0IsXG4gICAgICAgICAgb2tCdG5UeHQsIGNhbmNlbEJ0blR4dCxcbiAgICAgICAgICBva0J0bkNsYXNzLCBjYW5jZWxCdG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiUXVlc3Rpb24uLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgIG9rQ0IgPyBva0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgY2FuY2VsQ0IgPyBjYW5jZWxDQigpIDogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG9rQnRuVHh0ID0gb2tCdG5UeHQgPyBva0J0blR4dCA6IFwiT0tcIjtcbiAgICAgICAgY2FuY2VsQnRuVHh0ID0gY2FuY2VsQnRuVHh0ID8gY2FuY2VsQnRuVHh0IDogXCJDYW5jZWxcIjtcbiAgICAgICAgb2tCdG5DbGFzcyA9IG9rQnRuQ2xhc3MgPyBfLmlzQXJyYXkob2tCdG5DbGFzcykgPyBva0J0bkNsYXNzLmpvaW4oJyAnKSA6IG9rQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICBjYW5jZWxCdG5DbGFzcyA9IGNhbmNlbEJ0bkNsYXNzID8gXy5pc0FycmF5KGNhbmNlbEJ0bkNsYXNzKSA/IGNhbmNlbEJ0bkNsYXNzLmpvaW4oJyAnKSA6IGNhbmNlbEJ0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdZZXMgYnRuIFwiICsgb2tCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZShcXFwiT0tcXFwiKSc+XCIgKyBva0J0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdDYW5jZWwgYnRuIFwiICsgY2FuY2VsQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoKSc+XCIgKyBjYW5jZWxCdG5UeHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dNb2RhbERpYWxvZyhjbG9zZSwgdGVtcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIHNob3czQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKFxuICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlcixcbiAgICAgICAgICB5ZXNDQiwgbm9DQiwgY2FuY2VsQ0IsXG4gICAgICAgICAgeWVzQnRuVHh0LCBub0J0blR4dCwgY2FuY2VsQnRuVHh0LFxuICAgICAgICAgIHllc0J0bkNsYXNzLCBub0J0bkNsYXNzLCBjYW5jZWxCdG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiUXVlc3Rpb24uLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIlllc1wiKSB7XG4gICAgICAgICAgICB5ZXNDQiA/IHllc0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIk5vXCIpIHtcbiAgICAgICAgICAgIG5vQ0IgPyBub0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgY2FuY2VsQ0IgPyBjYW5jZWxDQigpIDogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHllc0J0blR4dCA9IHllc0J0blR4dCA/IHllc0J0blR4dCA6IFwiWWVzXCI7XG4gICAgICAgIG5vQnRuVHh0ID0gbm9CdG5UeHQgPyBub0J0blR4dCA6IFwiTm9cIjtcbiAgICAgICAgY2FuY2VsQnRuVHh0ID0gY2FuY2VsQnRuVHh0ID8gY2FuY2VsQnRuVHh0IDogXCJDYW5jZWxcIjtcbiAgICAgICAgeWVzQnRuQ2xhc3MgPSB5ZXNCdG5DbGFzcyA/IF8uaXNBcnJheSh5ZXNCdG5DbGFzcykgPyBva0J0bkNsYXNzLmpvaW4oJyAnKSA6IHllc0J0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgbm9CdG5DbGFzcyA9IG5vQnRuQ2xhc3MgPyBfLmlzQXJyYXkobm9CdG5DbGFzcykgPyBub0J0bkNsYXNzLmpvaW4oJyAnKSA6IG5vQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICBjYW5jZWxCdG5DbGFzcyA9IGNhbmNlbEJ0bkNsYXNzID8gXy5pc0FycmF5KGNhbmNlbEJ0bkNsYXNzKSA/IGNhbmNlbEJ0bkNsYXNzLmpvaW4oJyAnKSA6IGNhbmNlbEJ0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSd5ZXMgYnRuIFwiICsgeWVzQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIlllc1xcXCIpJz5cIiArIHllc0J0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdubyBidG4gXCIgKyBub0J0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKFxcXCJOb1xcXCIpJz5cIiArIG5vQnRuVHh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J2NhbmNlbCBidG4gXCIgKyBjYW5jZWxCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZSgpJz5cIiArIGNhbmNlbEJ0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKGNsb3NlLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICB9LFxuICAgICAgc2hvd0Z1bGxNb2RhbERpYWxvZzogZnVuY3Rpb24oY2FsbGJhY2ssIHRlbXBsYXRlLCBjb250cm9sbGVyLCBkc2NvcGUpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgd2luZG93Q2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICBiYWNrZHJvcENsaWNrOiB0cnVlLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsXG4gICAgICAgICAgcmVzb2x2ZTogeyBkc2NvcGU6IGZ1bmN0aW9uKCl7IHJldHVybiBkc2NvcGU7IH0gfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKCdodHRwOicpICE9PSAwKSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGQgPSAkbW9kYWwub3BlbihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGRkLnJlc3VsdC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNob3dMYW5ndWFnZU1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgY29udHJvbGxlcjogJ3BsdWdpbk1hbmFnZXJDdHJsJyxcbiAgICAgICAgICB0ZW1wbGF0ZTogSlNUWydtYWluYXBwL2NvbXBvbmVudHMvcGx1Z2lubWFuYWdlci9wbHVnaW5tYW5hZ2VyJ10oKVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkZCA9ICRtb2RhbC5vcGVuKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZGQucmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGJrQ29yZU1hbmFnZXI7XG4gIH0pO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdtb2RhbERpYWxvZ09wJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zdHJhdGVneSA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBzZXRTdHJhdGVneTogZnVuY3Rpb24oc3RyYXRlZ3kpIHtcbiAgICAgICAgX3N0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICB9LFxuICAgICAgZ2V0U3RyYXRlZ3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3N0cmF0ZWd5O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5jb250cm9sbGVyKCdtb2RhbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRtb2RhbEluc3RhbmNlLCBtb2RhbERpYWxvZ09wKSB7XG4gICAgJHNjb3BlLmdldFN0cmF0ZWd5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbW9kYWxEaWFsb2dPcC5nZXRTdHJhdGVneSgpO1xuICAgIH07XG4gICAgJHJvb3RTY29wZS4kb24oJ21vZGFsLnN1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLmNsb3NlKCRzY29wZS5nZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKTtcbiAgICB9KTtcbiAgICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKHJlc3VsdCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERpcmVjdGl2ZSB0byBzaG93IGEgbW9kYWwgZGlhbG9nIHRoYXQgZG9lcyBmaWxlbmFtZSBpbnB1dC5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2ZpbGVBY3Rpb25EaWFsb2cnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHsgYWN0aW9uTmFtZTogJ0AnLCBpbnB1dElkOiAnQCcsIGNsb3NlOiAnPScgfSxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ3RlbXBsYXRlL2ZpbGVhY3Rpb25kaWFsb2cnXSgpLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuZmluZCgnaW5wdXQnKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuZGVidWdcbiAqIFRoaXMgbW9kdWxlIGlzIGZvciBkZWJ1ZyBvbmx5IGFuZCBzaG91bGQgbmV2ZXIgYmUgdXNlZCBpbiBjb2RlXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJiay5kZWJ1Z1wiLCBbXG4gICAgXCJiay5hbmd1bGFyVXRpbHNcIixcbiAgICBcImJrLm1haW5BcHBcIixcbiAgICAnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICBcImJrLmNvcmVcIixcbiAgICAnYmsuc2Vzc2lvbk1hbmFnZXInLFxuICAgIFwiYmsub3V0cHV0TG9nXCIsXG4gICAgXCJiay5yZWNlbnRNZW51XCIsXG4gICAgXCJiay5zZXNzaW9uXCIsXG4gICAgXCJiay5zaGFyZVwiLFxuICAgIFwiYmsudHJhY2tcIixcbiAgICBcImJrLnV0aWxzXCIsXG4gICAgXCJiay5jb21ldGRVdGlsc1wiLFxuICAgIFwiYmsuY29tbW9uVXRpbHNcIixcbiAgICBcImJrLm1lbnVQbHVnaW5NYW5hZ2VyXCIsXG4gICAgXCJiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXJcIixcbiAgICBcImJrLmV2YWx1YXRvck1hbmFnZXJcIixcbiAgICBcImJrLmV2YWx1YXRlSm9iTWFuYWdlclwiLFxuICAgIFwiYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyXCJcbiAgXSk7XG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtEZWJ1Z1wiLCBmdW5jdGlvbihcbiAgICAgICRpbmplY3RvciwgYW5ndWxhclV0aWxzLCBia0V2YWx1YXRlSm9iTWFuYWdlciwgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLCBia091dHB1dExvZywgYmtSZWNlbnRNZW51LCBia1Nlc3Npb24sIGJrU2hhcmUsXG4gICAgICBia1RyYWNrLCBia1V0aWxzLCBjb21ldGRVdGlscywgY29tbW9uVXRpbHMsIGJrTWVudVBsdWdpbk1hbmFnZXIsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJGluamVjdG9yOiAkaW5qZWN0b3IsXG4gICAgICBhbmd1bGFyVXRpbHM6IGFuZ3VsYXJVdGlscyxcbiAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyOiBia0V2YWx1YXRlSm9iTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyOiBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXI6IGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyOiBia0NvcmVNYW5hZ2VyLFxuICAgICAgYmtPdXRwdXRMb2c6IGJrT3V0cHV0TG9nLFxuICAgICAgYmtSZWNlbnRNZW51OiBia1JlY2VudE1lbnUsXG4gICAgICBia1Nlc3Npb246IGJrU2Vzc2lvbixcbiAgICAgIGJrU2hhcmU6IGJrU2hhcmUsXG4gICAgICBia1RyYWNrOiBia1RyYWNrLFxuICAgICAgYmtVdGlsczogYmtVdGlscyxcbiAgICAgIGNvbWV0ZFV0aWxzOiBjb21ldGRVdGlscyxcbiAgICAgIGNvbW1vblV0aWxzOiBjb21tb25VdGlscyxcbiAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXI6IGJrTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcjogYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXI6IGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyOiBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcixcbiAgICAgIGRlYnVnVUk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBia0hlbHBlci5nZXRCa05vdGVib29rVmlld01vZGVsKCkudG9nZ2xlRGVidWdnaW5nKCk7XG4gICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyJywgWydiay51dGlscyddKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2JrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyJywgZnVuY3Rpb24oYmtVdGlscywgJG1vZGFsKSB7XG4gICAgdmFyIG5hbWVUb1VybE1hcCA9IHt9O1xuICAgIHZhciBuYW1lVG9WaXN1YWxQYXJhbXMgPSB7fTtcbiAgICB2YXIgcGx1Z2lucyA9IHt9O1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbnMgPSBbXTtcblxuICAgIHZhciBldmFsdWF0b3JMb2FkUXVldWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX3F1ZXVlID0gW107XG4gICAgICB2YXIgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuXG4gICAgICB2YXIgbG9hZEV2YWx1YXRvciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJMb2FkaW5nIHBsdWdpbiBcIitldi5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZShldi51cmwsIGV2Lm5hbWUpO1xuICAgICAgfTtcbiAgICAgIHZhciBkb05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9sb2FkSW5Qcm9ncmVzcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSBfcXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKF9sb2FkSW5Qcm9ncmVzcykge1xuICAgICAgICAgIGlmIChwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy5uYW1lXSB8fCBwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy51cmxdKSB7IC8vIHBsdWdpbiBjb2RlIGFscmVhZHkgbG9hZGVkXG4gICAgICAgICAgICBpZiAocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MubmFtZV0pIHtcbiAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzLnJlc29sdmUocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MubmFtZV0pXG4gICAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKGRvTmV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MucmVzb2x2ZShwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy51cmxdKVxuICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihkb05leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbG9hZEV2YWx1YXRvcihfbG9hZEluUHJvZ3Jlc3MpXG4gICAgICAgICAgLnRoZW4oX2xvYWRJblByb2dyZXNzLnJlc29sdmUsICBfbG9hZEluUHJvZ3Jlc3MucmVqZWN0KVxuICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJrSGVscGVyLmNsZWFyU3RhdHVzKFwiTG9hZGluZyBwbHVnaW4gXCIgKyBfbG9hZEluUHJvZ3Jlc3MubmFtZSlcbiAgICAgICAgICAgIF9sb2FkSW5Qcm9ncmVzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGRvTmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24oZXZsKSB7XG4gICAgICAgICAgX3F1ZXVlLnB1c2goZXZsKTtcbiAgICAgICAgICBia1V0aWxzLmZjYWxsKGRvTmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBnZXRLbm93bkV2YWx1YXRvclBsdWdpbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmFtZVRvVXJsTWFwO1xuICAgICAgfSxcbiAgICAgIGFkZE5hbWVUb1VybEVudHJ5OiBmdW5jdGlvbihuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgICBuYW1lVG9VcmxNYXBbbmFtZV0gPSB1cmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmFtZVRvVXJsTWFwW25hbWVdID0gdXJsLnVybDtcbiAgICAgICAgICBkZWxldGUgdXJsLnVybDtcbiAgICAgICAgICBuYW1lVG9WaXN1YWxQYXJhbXNbbmFtZV0gPSB1cmw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRWaXN1YWxQYXJhbXM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVUb1Zpc3VhbFBhcmFtc1tuYW1lXTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JGYWN0b3J5QW5kU2hlbGw6IGZ1bmN0aW9uKGV2YWx1YXRvclNldHRpbmdzKSB7XG4gICAgICAgIHZhciBuYW1lT3JVcmwgPSBldmFsdWF0b3JTZXR0aW5ncy5wbHVnaW47XG4gICAgICAgIGlmIChwbHVnaW5zW25hbWVPclVybF0pIHsgLy8gcGx1Z2luIGNvZGUgYWxyZWFkeSBsb2FkZWRcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgcGx1Z2luc1tuYW1lT3JVcmxdLmdldEV2YWx1YXRvckZhY3RvcnkoKS50aGVuKGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICAgICAgICAgIGlmIChmYWN0b3J5ICE9PSB1bmRlZmluZWQgJiYgZmFjdG9yeS5jcmVhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUoZXZhbHVhdG9yU2V0dGluZ3MpLnRoZW4oZnVuY3Rpb24oZXYpIHsgZGVmZXJyZWQucmVzb2x2ZShldik7IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwibm8gZmFjdG9yeSBmb3IgZXZhbHVhdG9yIHBsdWdpblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgdmFyIG5hbWUsIHVybDtcbiAgICAgICAgICBpZiAobmFtZVRvVXJsTWFwW25hbWVPclVybF0pIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lT3JVcmw7XG4gICAgICAgICAgICB1cmwgPSBuYW1lVG9VcmxNYXBbbmFtZU9yVXJsXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB1cmwgPSBuYW1lT3JVcmw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGxvYWRKb2IgPSB7XG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICByZXNvbHZlOiBmdW5jdGlvbihleCkge1xuICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KGV4Lm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICBwbHVnaW5zW2V4Lm5hbWVdID0gZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KG5hbWUpICYmIG5hbWUgIT09IGV4Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbnNbbmFtZV0gPSBleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4LmdldEV2YWx1YXRvckZhY3RvcnkoKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdG9yeSAhPT0gdW5kZWZpbmVkICYmIGZhY3RvcnkuY3JlYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUoZXZhbHVhdG9yU2V0dGluZ3MpLnRoZW4oZnVuY3Rpb24oZXYpIHsgZGVmZXJyZWQucmVzb2x2ZShldik7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICRtb2RhbC5vcGVuKHtiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogSlNUWydoZWxwZXJzL3BsdWdpbi1sb2FkLWVycm9yJ10oe3BsdWdpbklkOiBuYW1lfSl9KTtcbiAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJubyBmYWN0b3J5IGZvciBldmFsdWF0b3IgcGx1Z2luXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBuZXZlciBjYWxsZWQuICBJbnN0ZWFkIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBcInRoZW5cIiBjbGF1c2UgYWJvdmUgaXMgY2FsbGVkIGJ1dCBmYWN0b3J5IGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIHVuZGVmaW5lZC4gIFVua25vd24gd2h5IFhYWC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoZXgubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGx1Z2luc1tleC5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShuYW1lKSAmJiBuYW1lICE9PSBleC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBsdWdpbnNbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc0VtcHR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGxvYWQgcGx1Z2luOiBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGxvYWQgcGx1Z2luOiBcIiArIG5hbWUgKyBcIiBhdCBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZWplY3Q6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgY2FsbGVkIGlmIHRoZSBVUkwgaXMgYmFkIG9yIHRoZXJlIGlzIGEgc3ludGF4IGVycm9yIGluIHRoZSBKUy5cbiAgICAgICAgICAgICAgICBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzKFwiRmFpbGVkIHRvIGZpbmQgcGx1Z2luIFwiK25hbWUrXCI6IFwiK2Vycik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRW1wdHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImZhaWxlZCB0byBmaW5kIHBsdWdpbjogXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJmYWlsZWQgdG8gZmluZCBwbHVnaW46IFwiICsgbmFtZSArIFwiIGF0IFwiICsgdXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGV2YWx1YXRvckxvYWRRdWV1ZS5hZGQobG9hZEpvYik7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjcmVhdGVFdmFsdWF0b3JUaGVuRXhpdDogZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIHRoZVNoZWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFdmFsdWF0b3JGYWN0b3J5QW5kU2hlbGwoc2V0dGluZ3MpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgIGlmIChldmFsdWF0b3IuZXhpdCkge1xuICAgICAgICAgICAgZXZhbHVhdG9yLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF8ocGx1Z2lucykuZmlsdGVyKGZ1bmN0aW9uKGFTaGVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFTaGVsbCAhPT0gdGhlU2hlbGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmhlbHBlclxuICogVGhlIGJrSGVscGVyIHNob3VsZCBiZSBhIHN1YnNldCBvZiBia0NvcmUgdXRpbGl0aWVzIHRoYXQgYXJlIGV4cG9zZWQgZm9yXG4gKiB1c2FnZXMgZXh0ZXJuYWwgdG8gQmVha2VyLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5oZWxwZXInLCBbJ2JrLnV0aWxzJywgJ2JrLmNvcmUnLCAnYmsuc2hhcmUnLCAnYmsuZGVidWcnXSk7XG4gIC8qKlxuICAgKiBia0hlbHBlclxuICAgKiAtIHNob3VsZCBiZSB0aGUgb25seSB0aGluZyBwbHVnaW5zIGRlcGVuZCBvbiB0byBpbnRlcmFjdCB3aXRoIGdlbmVyYWwgYmVha2VyIHN0dWZmcyAob3RoZXIgdGhhblxuICAgKiBjb25mb3JtaW5nIHRvIHRoZSBBUEkgc3BlYylcbiAgICogLSBleGNlcHQgcGx1Z2lucywgbm90aGluZyBzaG91bGQgZGVwZW5kcyBvbiBia0hlbHBlclxuICAgKiAtIHdlJ3ZlIG1hZGUgdGhpcyBnbG9iYWwuIFdlIHNob3VsZCByZXZpc2l0IHRoaXMgZGVjaXNpb24gYW5kIGZpZ3VyZSBvdXQgdGhlIGJlc3Qgd2F5IHRvIGxvYWRcbiAgICogICBwbHVnaW5zIGR5bmFtaWNhbGx5XG4gICAqIC0gaXQgbW9zdGx5IHNob3VsZCBqdXN0IGJlIGEgc3Vic2V0IG9mIGJrVXRpbFxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrSGVscGVyJywgZnVuY3Rpb24oYmtVdGlscywgYmtDb3JlTWFuYWdlciwgYmtTaGFyZSwgYmtEZWJ1Zykge1xuICAgIHZhciBnZXRDdXJyZW50QXBwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpO1xuICAgIH07XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCkge1xuICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0QmtOb3RlYm9va1dpZGdldFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJrSGVscGVyID0ge1xuICAgICAgLy8gZW5hYmxlIGRlYnVnXG4gICAgICBkZWJ1ZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5ia0RlYnVnID0gYmtEZWJ1ZztcbiAgICAgIH0sXG5cbiAgICAgIC8vIGJlYWtlciAocm9vdClcbiAgICAgIGdvdG9Db250cm9sUGFuZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICB9LFxuICAgICAgb3Blbk5vdGVib29rOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5vcGVuTm90ZWJvb2sobm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpO1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vdGVib29rRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuaW1wb3J0Tm90ZWJvb2tEaWFsb2coKTtcbiAgICAgIH0sXG4gICAgICAvLyBFbXB0eSB0cnVlIG1lYW5zIHRydWx5IGVtcHR5IG5ldyBzZXNzaW9uLlxuICAgICAgLy8gb3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCBub3RlYm9vay5cbiAgICAgIG5ld1Nlc3Npb246IGZ1bmN0aW9uKGVtcHR5KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLm5ld1Nlc3Npb24oZW1wdHkpO1xuICAgICAgfSxcblxuICAgICAgLy8gY3VycmVudCBhcHBcbiAgICAgIGdldEN1cnJlbnRBcHBOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkoZ2V0Q3VycmVudEFwcCgpLm5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlVua25vd24gQXBwXCI7XG4gICAgICB9LFxuICAgICAgaGFzU2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRTZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZ2V0U2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRTZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldFNlc3Npb25JZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0U2Vzc2lvbklkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0Tm90ZWJvb2tNb2RlbCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0Tm90ZWJvb2tNb2RlbFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0QmVha2VyT2JqZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRCZWFrZXJPYmplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEJlYWtlck9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rRWxlbWVudDogZnVuY3Rpb24oY3VycmVudFNjb3BlKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rRWxlbWVudChjdXJyZW50U2NvcGUpO1xuICAgICAgfSxcbiAgICAgIGNvbGxhcHNlQWxsU2VjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmNvbGxhcHNlQWxsU2VjdGlvbnMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmNvbGxhcHNlQWxsU2VjdGlvbnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGNvbGxhcHNlQWxsU2VjdGlvbnNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbG9zZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5jbG9zZU5vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5jbG9zZU5vdGVib29rKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBjbG9zZU5vdGVib29rXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2F2ZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zYXZlTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9vaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2F2ZU5vdGVib29rXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2F2ZU5vdGVib29rQXM6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2F2ZU5vdGVib29rQXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9va0FzKG5vdGVib29rVXJpLCB1cmlUeXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNhdmVOb3RlYm9va0FzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzQ29kZUNlbGw6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5oYXNDb2RlQ2VsbCh0b0V2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZSkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGUodG9FdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGV2YWx1YXRlXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdGVSb290OiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZVJvb3QpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlUm9vdCh0b0V2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZXZhbHVhdGVSb290XCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdGVDb2RlOiBmdW5jdGlvbihldmFsdWF0b3IsIGNvZGUpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZUNvZGUpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlQ29kZShldmFsdWF0b3IsIGNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZXZhbHVhdGVDb2RlXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yTWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRFdmFsdWF0b3JNZW51SXRlbXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvck1lbnVJdGVtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0RXZhbHVhdG9yTWVudUl0ZW1zXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9nZ2xlTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnRvZ2dsZU5vdGVib29rTG9ja2VkKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS50b2dnbGVOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgdG9nZ2xlTm90ZWJvb2tMb2NrZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5pc05vdGVib29rTG9ja2VkKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBpc05vdGVib29rTG9ja2VkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2cpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNob3dBbm9ueW1vdXNUcmFja2luZ0RpYWxvZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvd1N0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zaG93U3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zaG93U3RhdHVzKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNob3dTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGVTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnVwZGF0ZVN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCB1cGRhdGVTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldFN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0U3RhdHVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbGVhclN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5jbGVhclN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuY2xlYXJTdGF0dXMobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgY2xlYXJTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaG93VHJhbnNpZW50U3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNob3dUcmFuc2llbnRTdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNob3dUcmFuc2llbnRTdGF0dXMobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2hvd1RyYW5zaWVudFN0YXR1c1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvcnMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEV2YWx1YXRvcnNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRDb2RlQ2VsbHM6IGZ1bmN0aW9uKGZpbHRlcikge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldENvZGVDZWxscykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0Q29kZUNlbGxzKGZpbHRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRDb2RlQ2VsbHNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRDb2RlQ2VsbEJvZHk6IGZ1bmN0aW9uKG5hbWUsIGNvZGUpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEJvZHkpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsQm9keShuYW1lLGNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2V0Q29kZUNlbGxCb2R5XCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0Q29kZUNlbGxFdmFsdWF0b3I6IGZ1bmN0aW9uKG5hbWUsIGV2YWx1YXRvcikge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsRXZhbHVhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEV2YWx1YXRvcihuYW1lLCBldmFsdWF0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2V0Q29kZUNlbGxFdmFsdWF0b3JcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRDb2RlQ2VsbFRhZ3M6IGZ1bmN0aW9uKG5hbWUsIHRhZ3MpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbFRhZ3MpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsVGFncyhuYW1lLCB0YWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNldENvZGVDZWxsVGFnc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIGJrLW5vdGVib29rXG4gICAgICBzaGFyZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suc2hhcmVBbmRPcGVuUHVibGlzaGVkKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxldGVBbGxPdXRwdXRDZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLmRlbGV0ZUFsbE91dHB1dENlbGxzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRCa05vdGVib29rVmlld01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suZ2V0Vmlld01vZGVsKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRJbnB1dENlbGxLZXlNYXBNb2RlOiBmdW5jdGlvbihrZXlNYXBNb2RlKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLnNldENNS2V5TWFwTW9kZShrZXlNYXBNb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldElucHV0Q2VsbEtleU1hcE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgaWYgKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gYmtOb3RlYm9vay5nZXRDTUtleU1hcE1vZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gbG93IGxldmVsIHV0aWxzIChia1V0aWxzKVxuICAgICAgcmVmcmVzaFJvb3RTY29wZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH0sXG4gICAgICBsb2FkSlM6IGZ1bmN0aW9uKHVybCwgc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkSlModXJsLCBzdWNjZXNzKTtcbiAgICAgIH0sXG4gICAgICBsb2FkQ1NTOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZENTUyh1cmwpO1xuICAgICAgfSxcbiAgICAgIGxvYWRMaXN0OiBmdW5jdGlvbih1cmwsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZExpc3QodXJsLCBzdWNjZXNzLCBmYWlsdXJlKTtcbiAgICAgIH0sXG4gICAgICBmaW5kVGFibGU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZmluZFRhYmxlKGVsZW0pO1xuICAgICAgfSxcbiAgICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5nZW5lcmF0ZUlkKGxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgc2VydmVyVXJsOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnNlcnZlclVybChwYXRoKTtcbiAgICAgIH0sXG4gICAgICBmaWxlVXJsOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmZpbGVVcmwocGF0aCk7XG4gICAgICB9LFxuICAgICAgaHR0cEdldDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBHZXQodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBodHRwUG9zdDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBQb3N0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgbmV3RGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgfSxcbiAgICAgIG5ld1Byb21pc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UodmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGFsbDogZnVuY3Rpb24ocHJvbWlzZXMpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuYWxsKHByb21pc2VzKTtcbiAgICAgIH0sXG4gICAgICBmY2FsbDogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5mY2FsbChmdW5jKTtcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBmdW5jdGlvbihmdW5jLCBtcykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy50aW1lb3V0KGZ1bmMsbXMpO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbFRpbWVvdXQ6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuY2FuY2VsVGltZW91dChwcm9taXNlKTtcbiAgICAgIH0sXG4gICAgICBnZXRIb21lRGlyZWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpO1xuICAgICAgfSxcbiAgICAgIHNhdmVGaWxlOiBmdW5jdGlvbihwYXRoLCBjb250ZW50QXNKc29uLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2F2ZUZpbGUocGF0aCwgY29udGVudEFzSnNvbiwgb3ZlcndyaXRlKTtcbiAgICAgIH0sXG4gICAgICBsb2FkRmlsZTogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkRmlsZShwYXRoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIHV0aWxzIChia0NvcmUpXG4gICAgICBzZXROb3RlYm9va0ltcG9ydGVyOiBmdW5jdGlvbihmb3JtYXQsIGltcG9ydGVyKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNldE5vdGVib29rSW1wb3J0ZXIoZm9ybWF0LCBpbXBvcnRlcik7XG4gICAgICB9LFxuICAgICAgc2V0RmlsZUxvYWRlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZUxvYWRlcikge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zZXRGaWxlTG9hZGVyKHVyaVR5cGUsIGZpbGVMb2FkZXIpO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVTYXZlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZVNhdmVyKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNldEZpbGVTYXZlcih1cmlUeXBlLCBmaWxlU2F2ZXIpO1xuICAgICAgfSxcbiAgICAgIHNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyKCk7XG4gICAgICB9LFxuICAgICAgZ2V0UmVjZW50TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0UmVjZW50TWVudUl0ZW1zKCk7XG4gICAgICB9LFxuICAgICAgc2hvd01vZGFsRGlhbG9nOiBmdW5jdGlvbihjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dNb2RhbERpYWxvZyhjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KS5yZXN1bHQ7XG4gICAgICB9LFxuICAgICAgc2hvdzFCdXR0b25Nb2RhbDogZnVuY3Rpb24obXNnQm9keSwgbXNnSGVhZGVyLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKG1zZ0JvZHksIG1zZ0hlYWRlciwgY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIHNob3cyQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKG1zZ0JvZHksIG1zZ0hlYWRlciwgb2tDQiwgY2FuY2VsQ0IsIG9rQnRuVHh0LCBjYW5jZWxCdG5UeHQpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgb2tDQiwgY2FuY2VsQ0IsIG9rQnRuVHh0LCBjYW5jZWxCdG5UeHQpO1xuICAgICAgfSxcbiAgICAgIHNob3czQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKFxuICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgeWVzQ0IsIG5vQ0IsIGNhbmNlbENCLCB5ZXNCdG5UeHQsIG5vQnRuVHh0LCBjYW5jZWxCdG5UeHQpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgeWVzQ0IsIG5vQ0IsIGNhbmNlbENCLCB5ZXNCdG5UeHQsIG5vQnRuVHh0LCBjYW5jZWxCdG5UeHQpO1xuICAgICAgfSxcbiAgICAgIGdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3koKTtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RGaWxlOiBmdW5jdGlvbihjYWxsYmFjaywgdGl0bGUsIGV4dGVuc2lvbiwgY2xvc2VidG4pIHtcbiAgICAgICAgICB2YXIgc3RyYXRlZ3kgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICAgICAgc3RyYXRlZ3kudHJlZVZpZXdmcy5leHRGaWx0ZXIgPSBbIGV4dGVuc2lvbiBdO1xuICAgICAgICAgIHN0cmF0ZWd5LmV4dCA9IGV4dGVuc2lvbjtcbiAgICAgICAgICBzdHJhdGVneS50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgIHN0cmF0ZWd5LmNsb3NlYnRuID0gY2xvc2VidG47XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpLnRoZW4oXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbihob21lRGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd01vZGFsRGlhbG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU1RbJ3RlbXBsYXRlL29wZW5ub3RlYm9vayddKHtob21lZGlyOiBob21lRGlyLCBleHRlbnNpb246IGV4dGVuc2lvbn0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ3kpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICAvLyBldmFsIHV0aWxzXG4gICAgICBsb2NhdGVQbHVnaW5TZXJ2aWNlOiBmdW5jdGlvbihpZCwgbG9jYXRvcikge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvcGx1Z2luLXNlcnZpY2VzL1wiICsgaWQpLCBsb2NhdG9yKTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JGYWN0b3J5OiBmdW5jdGlvbihzaGVsbENvbnN0cnVjdG9yUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gc2hlbGxDb25zdHJ1Y3RvclByb21pc2UudGhlbihmdW5jdGlvbihTaGVsbCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UobmV3IFNoZWxsKHNldHRpbmdzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2hvd0xhbmd1YWdlTWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dMYW5ndWFnZU1hbmFnZXIoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIG90aGVyIEpTIHV0aWxzXG4gICAgICB1cGRhdGVEb2N1bWVudE1vZGVsRnJvbURPTTogZnVuY3Rpb24oaWQpIHtcblx0ICBmdW5jdGlvbiBjb252ZXJ0Q2FudmFzVG9JbWFnZShlbGVtKSB7XG5cdCAgICAgIGlmIChlbGVtLm5vZGVOYW1lID09IFwiQ0FOVkFTXCIpIHtcblx0XHQgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdCAgaW1nLnNyYyA9IGVsZW0udG9EYXRhVVJMKCk7XG5cdFx0ICByZXR1cm4gaW1nO1xuXHQgICAgICB9XG5cdCAgICAgIHZhciBjaGlsZE5vZGVzID0gZWxlbS5jaGlsZE5vZGVzO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHQgIHZhciByZXN1bHQgPSBjb252ZXJ0Q2FudmFzVG9JbWFnZShjaGlsZE5vZGVzW2ldKTtcblx0XHQgIGlmIChyZXN1bHQgIT0gY2hpbGROb2Rlc1tpXSkge1xuXHRcdCAgICAgIGVsZW0ucmVwbGFjZUNoaWxkKHJlc3VsdCwgY2hpbGROb2Rlc1tpXSk7XG5cdFx0ICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIGVsZW07XG5cdCAgfVxuICAgICAgICAgIC8vIDEpIGZpbmQgdGhlIGNlbGwgdGhhdCBjb250YWlucyBlbGVtXG4gICAgICAgICAgdmFyIGVsZW0gPSAkKFwiI1wiICsgaWQpLmNsb3Nlc3QoXCJiay1jZWxsXCIpO1xuICAgICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjZWxsaWQgPSBlbGVtWzBdLmdldEF0dHJpYnV0ZShcImNlbGxpZFwiKTtcbiAgICAgICAgICBpZiAoY2VsbGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFuIEh0bWwgY2VsbCBjb250YWluaW5nIHRoZSBlbGVtZW50ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGJvZHkgPSBlbGVtLmZpbmQoIFwiYmstb3V0cHV0LWRpc3BsYXlbdHlwZT0nSHRtbCddIGRpdiBkaXZcIiApO1xuICAgICAgICAgIGlmIChib2R5ID09PSB1bmRlZmluZWQgfHwgYm9keVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXHQgIC8vIDIuNSkgc2VhcmNoIGZvciBhbnkgY2FudmFzIGVsZW1lbnRzIGluIGJvZHkgYW5kIHJlcGxhY2UgZWFjaCB3aXRoIGFuIGltYWdlLlxuXHQgIGJvZHkgPSBjb252ZXJ0Q2FudmFzVG9JbWFnZShib2R5WzBdKTtcblxuICAgICAgICAgIC8vIDIpIGNvbnZlcnQgdGhhdCBwYXJ0IG9mIHRoZSBET00gdG8gYSBzdHJpbmdcbiAgICAgICAgICB2YXIgbmV3T3V0cHV0ID0gYm9keS5pbm5lckhUTUw7XG5cbiAgICAgICAgICAvLyAzKSBzZXQgdGhlIHJlc3VsdC5vYmplY3QgdG8gdGhhdCBzdHJpbmcuXG4gICAgICAgICAgdmFyIGNlbGwgPSBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5nZXRDZWxsKGNlbGxpZCk7XG4gICAgICAgICAgaWYgKGNlbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogY2Fubm90IGZpbmQgYW4gSHRtbCBjZWxsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgJ1wiICsgaWQgKyBcIicuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZXMgPSBjZWxsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlcy5pbm5lcnR5cGUgPT09IFwiSHRtbFwiKSB7XG4gICAgICAgICAgICByZXMub2JqZWN0ID0gbmV3T3V0cHV0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gYmtTaGFyZVxuICAgICAgc2hhcmU6IGJrU2hhcmUsXG5cbiAgICAgIC8vIGxhbmd1YWdlIHBsdWdpbiB1dGlsaXRpZXNcblxuICAgICAgc2V0dXBQcm9ncmVzc091dHB1dDogZnVuY3Rpb24obW9kZWxPdXRwdXQpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzT2JqID0ge1xuICAgICAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgICAgICBpbm5lcnR5cGU6IFwiUHJvZ3Jlc3NcIixcbiAgICAgICAgICAgIG9iamVjdDoge1xuICAgICAgICAgICAgICBtZXNzYWdlOiBcInN1Ym1pdHRpbmcgLi4uXCIsXG4gICAgICAgICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIG91dHB1dGRhdGE6IFtdLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHByb2dyZXNzT2JqO1xuICAgICAgfSxcblxuICAgICAgc2V0dXBDYW5jZWxsaW5nT3V0cHV0OiBmdW5jdGlvbihtb2RlbE91dHB1dCkge1xuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0LnR5cGUgIT09IFwiQmVha2VyRGlzcGxheVwiIHx8IG1vZGVsT3V0cHV0LnJlc3VsdC5pbm5lcnR5cGUgIT09IFwiUHJvZ3Jlc3NcIilcbiAgICAgICAgICBzZXR1cFByb2dyZXNzT3V0cHV0KG1vZGVsT3V0cHV0KTtcbiAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gXCJjYW5jZWxsaW5nIC4uLlwiO1xuICAgICAgfSxcblxuICAgICAgcmVjZWl2ZUV2YWx1YXRpb25VcGRhdGU6IGZ1bmN0aW9uKG1vZGVsT3V0cHV0LCBldmFsdWF0aW9uLCBwbHVnaW5OYW1lLCBzaGVsbElkKSB7XG4gICAgICAgIHZhciBtYXhOdW1PZkxpbmVzID0gMjAwO1xuXG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQuc3RhdHVzID0gZXZhbHVhdGlvbi5zdGF0dXM7XG5cbiAgICAgICAgLy8gc2F2ZSBpbmZvcm1hdGlvbiB0byBoYW5kbGUgdXBkYXRhYmxlIHJlc3VsdHMgaW4gZGlzcGxheXNcbiAgICAgICAgbW9kZWxPdXRwdXQucGx1Z2luTmFtZSA9IHBsdWdpbk5hbWU7XG4gICAgICAgIG1vZGVsT3V0cHV0LnNoZWxsSWQgPSBzaGVsbElkO1xuXG4gICAgICAgIC8vIGFwcGVuZCB0ZXh0IG91dHB1dCAoaWYgYW55KVxuICAgICAgICBpZiAoZXZhbHVhdGlvbi5vdXRwdXRkYXRhICE9PSB1bmRlZmluZWQgJiYgZXZhbHVhdGlvbi5vdXRwdXRkYXRhLmxlbmd0aD4wKSB7XG4gICAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgICBmb3IgKGlkeD0wOyBpZHg8ZXZhbHVhdGlvbi5vdXRwdXRkYXRhLmxlbmd0aD4wOyBpZHgrKykge1xuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLnB1c2goZXZhbHVhdGlvbi5vdXRwdXRkYXRhW2lkeF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY250ID0gMDtcbiAgICAgICAgICBmb3IgKGlkeD0wOyBpZHg8bW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGNudCArPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbaWR4XS52YWx1ZS5zcGxpdCgvXFxuLykubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY250ID4gbWF4TnVtT2ZMaW5lcykge1xuICAgICAgICAgICAgY250IC09IG1heE51bU9mTGluZXM7XG4gICAgICAgICAgICB3aGlsZShjbnQgPiAwKSB7XG4gICAgICAgICAgICAgIHZhciBsID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhWzBdLnZhbHVlLnNwbGl0KC9cXG4vKS5sZW5ndGg7XG4gICAgICAgICAgICAgIGlmIChsPD1jbnQpIHtcbiAgICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEuc3BsaWNlKDAsMSk7XG4gICAgICAgICAgICAgICAgY250IC09IGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbMF0udmFsdWUuc3BsaXQoL1xcbi8pO1xuICAgICAgICAgICAgICAgIGEuc3BsaWNlKDAsY250KTtcbiAgICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbMF0udmFsdWUgPSBhLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgIGNudCA9IDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IHRoaXMgc2hvdWxkIG5vdCBoYXBwZW4gLSB5b3VyIHBsdWdpbiBqYXZhc2NyaXB0IGlzIGJyb2tlbiFcIik7XG4gICAgICAgICAgc2V0dXBQcm9ncmVzc091dHB1dChtb2RlbE91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3cgdXBkYXRlIHBheWxvYWQgKGlmIG5lZWRlZClcbiAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCA9IGV2YWx1YXRpb24ucGF5bG9hZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IHVuZGVmaW5lZCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnR5cGUgPT09IFwiUmVzdWx0c1wiKSB7XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQub3V0cHV0ZGF0YSA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmFsdWF0aW9uLnN0YXR1cyA9PT0gXCJGSU5JU0hFRFwiKSB7XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkICE9PSB1bmRlZmluZWQgJiYgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnR5cGUgPT09IFwiUmVzdWx0c1wiKVxuICAgICAgICAgICAgICBldmFsdWF0aW9uLnBheWxvYWQgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQucGF5bG9hZDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb2RlbE91dHB1dC5lbGFwc2VkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5zdGFydFRpbWU7XG5cbiAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc2luZ2xlIG91dHB1dCBkaXNwbGF5XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSBldmFsdWF0aW9uLnBheWxvYWQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdyYXBwZXIgZGlzcGxheSB3aXRoIHN0YW5kYXJkIG91dHB1dCBhbmQgZXJyb3JcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHsgdHlwZSA6IFwiUmVzdWx0c1wiLCBvdXRwdXRkYXRhIDogbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLCBwYXlsb2FkIDogZXZhbHVhdGlvbi5wYXlsb2FkIH07XG4gICAgICAgICAgICAvLyBidWlsZCBvdXRwdXQgY29udGFpbmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChldmFsdWF0aW9uLmpzb25yZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LmRhdGFyZXN1bHQgPSBldmFsdWF0aW9uLmpzb25yZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRVJST1JcIikge1xuICAgICAgICAgIGlmIChldmFsdWF0aW9uLnBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC50eXBlID09PSBcIlJlc3VsdHNcIilcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnBheWxvYWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGV2YWx1YXRpb24ucGF5bG9hZCA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmICQudHlwZShldmFsdWF0aW9uLnBheWxvYWQpPT0nc3RyaW5nJykge1xuICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gZXZhbHVhdGlvbi5wYXlsb2FkLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbW9kZWxPdXRwdXQuZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Quc3RhcnRUaW1lO1xuXG4gICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIHNpbmdsZSBvdXRwdXQgZGlzcGxheVxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0ID0ge1xuICAgICAgICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgICAgICAgaW5uZXJ0eXBlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgIG9iamVjdDogZXZhbHVhdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3cmFwcGVyIGRpc3BsYXkgd2l0aCBzdGFuZGFyZCBvdXRwdXQgYW5kIGVycm9yXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IHsgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsIGlubmVydHlwZTogXCJFcnJvclwiLCBvYmplY3Q6IGV2YWx1YXRpb24ucGF5bG9hZCB9IH07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIlJVTk5JTkdcIikge1xuICAgICAgICAgIGlmIChldmFsdWF0aW9uLm1lc3NhZ2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QubWVzc2FnZSAgICAgPSBcInJ1bm5pbmcuLi5cIjtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgICAgID0gZXZhbHVhdGlvbi5tZXNzYWdlO1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgICA9IGV2YWx1YXRpb24ucHJvZ3Jlc3NCYXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIkZJTklTSEVEXCIgfHwgZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRVJST1JcIik7XG4gICAgICB9LFxuICAgICAgZ2V0VXBkYXRlU2VydmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21ldGRVdGlsID0ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uczogeyB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24ocGx1Z2luTmFtZSwgc2VydmljZUJhc2UpIHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQgPSBuZXcgJC5Db21ldGQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC5pbml0KGJrVXRpbHMuc2VydmVyVXJsKHNlcnZpY2VCYXNlICsgXCIvY29tZXRkL1wiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5obGlzdGVuZXIgPSB0aGlzLmNvbWV0ZC5hZGRMaXN0ZW5lcignL21ldGEvaGFuZHNoYWtlJywgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5ia0RlYnVnKSBjb25zb2xlLmxvZyhwbHVnaW5OYW1lKycvbWV0YS9oYW5kc2hha2UnKTtcbiAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21ldGQuYmF0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGs7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChrIGluIE9iamVjdC5rZXlzKHRoaXMuc3Vic2NyaXB0aW9ucykpXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW2tdID0gdGhpcy5jb21ldGQucmVzdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW2tdKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQucmVtb3ZlTGlzdGVuZXIodGhpcy5obGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIHZhciBrO1xuICAgICAgICAgICAgICAgIGZvciAoayBpbiBPYmplY3Qua2V5cyh0aGlzLnN1YnNjcmlwdGlvbnMpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLnVuc3Vic2NyaWJlKHRoaXMuc3Vic2NyaXB0aW9uc1trXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmNvbWV0ZCA9IG51bGw7XG4gICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHsgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHVwZGF0ZV9pZCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgaWYgKCF1cGRhdGVfaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAod2luZG93LmJrRGVidWcpIGNvbnNvbGUubG9nKCdzdWJzY3JpYmUgdG8gJyt1cGRhdGVfaWQpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC51bnN1YnNjcmliZSh0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBjYiA9IGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldC5kYXRhKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgdmFyIHMgPSB0aGlzLmNvbWV0ZC5zdWJzY3JpYmUoJy9vYmplY3RfdXBkYXRlLycgKyB1cGRhdGVfaWQsIGNiKTtcbiAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gPSBzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbih1cGRhdGVfaWQpIHtcbiAgICAgICAgICAgICAgaWYgKCF1cGRhdGVfaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAod2luZG93LmJrRGVidWcpIGNvbnNvbGUubG9nKCd1bnN1YnNjcmliZSBmcm9tICcrdXBkYXRlX2lkKTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQudW5zdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzc3Vic2NyaWJlZDogZnVuY3Rpb24odXBkYXRlX2lkKSB7XG4gICAgICAgICAgICAgIGlmICghdXBkYXRlX2lkKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdICE9PSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGJrSGVscGVyO1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm1lbnVQbHVnaW5NYW5hZ2VyJywgWydiay51dGlscyddKTtcblxuICB2YXIgdXRpbHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIERFRkFVTFRfUFJJT1JJVFkgPSAwO1xuICAgIC8vIGFkZCBuZXdJdGVtIHRvIGl0ZW1zTGlzdCwgaWYgYW4gaXRlbSB3aXRoIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0cyBpbiBpdGVtc0xpc3QsXG4gICAgLy8gY29tcGFyZSBwcmlvcml0aWVzLCBpZiBuZXdJdGVtLnByaW9yaXR5ID4gZXhpc3RpbmdJdGVtLnByaW9yaXR5LCBuZXdJdGVtIHdpbGxcbiAgICAvLyByZXBsYWNlIHRoZSBleGlzdGluZ0l0ZW0gaW4gcGxhY2UuXG4gICAgdmFyIGFkZE1lbnVJdGVtID0gZnVuY3Rpb24oaXRlbXNMaXN0LCBuZXdJdGVtKSB7XG4gICAgICAvLyBjaGVjayBpZiBhbiBlbnRyeSB3aXRoIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0XG4gICAgICB2YXIgZXhpc3RpbmdJdGVtID0gXyhpdGVtc0xpc3QpLmZpbmQoZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IG5ld0l0ZW0ubmFtZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuICAgICAgICBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgPSBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgPyBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgOiBERUZBVUxUX1BSSU9SSVRZO1xuICAgICAgICBuZXdJdGVtLnByaW9yaXR5ID0gbmV3SXRlbS5wcmlvcml0eSA/IG5ld0l0ZW0ucHJpb3JpdHkgOiBERUZBVUxUX1BSSU9SSVRZO1xuICAgICAgICBpZiAobmV3SXRlbS5wcmlvcml0eSA+PSBleGlzdGluZ0l0ZW0ucHJpb3JpdHkpIHtcbiAgICAgICAgICAvLyByZXBsYWNlIGluIHBsYWNlXG4gICAgICAgICAgaXRlbXNMaXN0LnNwbGljZShpdGVtc0xpc3QuaW5kZXhPZihleGlzdGluZ0l0ZW0pLCAxLCBuZXdJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZ25vcmUgYW5kIHdhcm5cbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJpZ25vcmluZyBtZW51IGl0ZW0gXCIgKyBuZXdJdGVtLm5hbWUgKyBcImJlY2F1c2UgcHJpb3JpdHk9XCJcbiAgICAgICAgICAgICAgKyBuZXdJdGVtLnByaW9yaXR5ICsgXCJpcyBzbWFsbGVyIHRoYW4gZXhpc3RpbmcgKFwiICsgZXhpc3RpbmdJdGVtLnByaW9yaXR5ICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtc0xpc3QgPSBpdGVtc0xpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBhZGRNZW51SXRlbXM6IGZ1bmN0aW9uIChwYXJlbnRNZW51LCBpdGVtcykge1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW1zKSkge1xuICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBhZGRNZW51SXRlbShwYXJlbnRNZW51Lml0ZW1zLCBpdGVtKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrTWVudVBsdWdpbk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzKSB7XG5cbiAgICB2YXIgbWVudXMgPSB7fTtcbiAgICB2YXIgbG9hZGVkUGx1Z2lucyA9IFtdO1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMgPSBbXTtcbiAgICB2YXIgcGx1Z2luSW5kZXggPSAwO1xuXG4gICAgdmFyIGFkZFBsdWdpbiA9IGZ1bmN0aW9uKHBsdWdpbiwgcGx1Z2luSW5kZXgsIHNlY29uZGFyeUluZGV4KSB7XG4gICAgICBpZiAoIXBsdWdpbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJlbnRNZW51ID0gXy5maW5kKF8udmFsdWVzKG1lbnVzKSwgZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IHBsdWdpbi5wYXJlbnQ7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFwYXJlbnRNZW51KSB7XG4gICAgICAgIHBhcmVudE1lbnUgPSB7XG4gICAgICAgICAgbmFtZTogcGx1Z2luLnBhcmVudCxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgaW5kZXg6IHBsdWdpbkluZGV4LFxuICAgICAgICAgIHNlY29uZGFyeUluZGV4OiBzZWNvbmRhcnlJbmRleCxcbiAgICAgICAgICBzb3J0b3JkZXI6IHBsdWdpbi5zb3J0b3JkZXIsXG4gICAgICAgICAgY2xhc3NOYW1lczogcGx1Z2luLmlkXG4gICAgICAgIH07XG4gICAgICAgIG1lbnVzW3BsdWdpbkluZGV4ICsgJ18nICsgc2Vjb25kYXJ5SW5kZXggKyAnXycgKyBwYXJlbnRNZW51Lm5hbWVdID0gcGFyZW50TWVudTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwbHVnaW5JbmRleCA8IHBhcmVudE1lbnUuaW5kZXhcbiAgICAgICAgICAgIHx8IChwbHVnaW5JbmRleCA9PT0gcGFyZW50TWVudS5pbmRleCAmJiBzZWNvbmRhcnlJbmRleCA8IHBhcmVudE1lbnUuc2Vjb25kYXJ5SW5kZXgpKSB7XG4gICAgICAgICAgZGVsZXRlIG1lbnVzW3BhcmVudE1lbnUuaW5kZXggKyAnXycgKyBwYXJlbnRNZW51LnNlY29uZGFyeUluZGV4ICsgJ18nICsgcGFyZW50TWVudS5uYW1lXTtcbiAgICAgICAgICBtZW51c1twbHVnaW5JbmRleCArICdfJyArIHNlY29uZGFyeUluZGV4ICsgJ18nICsgcGFyZW50TWVudS5uYW1lXSA9IHBhcmVudE1lbnU7XG4gICAgICAgICAgcGFyZW50TWVudS5pbmRleCA9IHBsdWdpbkluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghcGx1Z2luLnN1Ym1lbnUpIHtcbiAgICAgICAgdXRpbHMuYWRkTWVudUl0ZW1zKHBhcmVudE1lbnUsIHBsdWdpbi5pdGVtcyk7XG4gICAgICAgIGlmICghIF8uaXNGdW5jdGlvbihwYXJlbnRNZW51Lml0ZW1zKSkge1xuICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICAgIGlmIChhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkICYmIGIuc29ydG9yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyPmIuc29ydG9yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzdWJNZW51ID0gXy5maW5kKHBhcmVudE1lbnUuaXRlbXMsIGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IHBsdWdpbi5zdWJtZW51O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFzdWJNZW51KSB7XG4gICAgICAgICAgc3ViTWVudSA9IHtcbiAgICAgICAgICAgIG5hbWU6IHBsdWdpbi5zdWJtZW51LFxuICAgICAgICAgICAgdHlwZTogXCJzdWJtZW51XCIsXG4gICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICBzb3J0b3JkZXI6IHBsdWdpbi5zdWJtZW51c29ydG9yZGVyXG4gICAgICAgICAgfTtcbiAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zLnB1c2goc3ViTWVudSk7XG4gICAgICAgICAgaWYgKCEgXy5pc0Z1bmN0aW9uKHBhcmVudE1lbnUuaXRlbXMpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgICAgIGlmIChhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkICYmIGIuc29ydG9yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXI+Yi5zb3J0b3JkZXI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ViTWVudS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIHN1Yk1lbnUudHlwZSA9IFwic3VibWVudVwiO1xuICAgICAgICAgIGlmICghc3ViTWVudS5pdGVtcykge1xuICAgICAgICAgICAgc3ViTWVudS5pdGVtcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1dGlscy5hZGRNZW51SXRlbXMoc3ViTWVudSwgcGx1Z2luLml0ZW1zKTtcbiAgICAgICAgaWYgKCEgXy5pc0Z1bmN0aW9uKHN1Yk1lbnUuaXRlbXMpKSB7XG4gICAgICAgICAgc3ViTWVudS5pdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgICAgaWYgKGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQgJiYgYi5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXI+Yi5zb3J0b3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0TG9hZE1lbnVQbHVnaW5Kb2IgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldFVybDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNDYW5jZWxsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjYW5jZWxsZWQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbG9hZFBsdWdpbiA9IGZ1bmN0aW9uKGpvYikge1xuICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZShqb2IuZ2V0VXJsKCkpLnRoZW4oZnVuY3Rpb24obWVudVBsdWdpbikge1xuICAgICAgICBpZiAoam9iLmlzQ2FuY2VsbGVkKCkpIHtcbiAgICAgICAgICB0aHJvdyBcImNhbmNlbGxlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZW51UGx1Z2luLmdldE1lbnVJdGVtcygpLnRoZW4oZnVuY3Rpb24obWVudUl0ZW1zKSB7XG4gICAgICAgICAgaWYgKGpvYi5pc0NhbmNlbGxlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBcImNhbmNlbGxlZFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWVudUl0ZW1zO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbG9hZE1lbnVQbHVnaW46IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgam9iID0gZ2V0TG9hZE1lbnVQbHVnaW5Kb2IodXJsKTtcbiAgICAgICAgdmFyIGluZGV4ID0gcGx1Z2luSW5kZXgrKztcbiAgICAgICAgbG9hZFBsdWdpbihqb2IpLnRoZW4oZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgICAgbG9hZGVkUGx1Z2lucy5wdXNoKHt1cmw6IGpvYi5nZXRVcmwoKX0pO1xuICAgICAgICAgIGlmIChfLmlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgICAgXyhwbHVnaW4pLmVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgICAgYWRkUGx1Z2luKGl0ZW0sIGluZGV4LCBpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRQbHVnaW4ocGx1Z2luLCBpbmRleCwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3Rpb24pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlamVjdGlvbik7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzLnNwbGljZShsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMuaW5kZXhPZihqb2IpLCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvYWRpbmdJblByb2dyZXNzUGx1Z2luSm9icy5wdXNoKGpvYik7XG4gICAgICB9LFxuICAgICAgYXR0YWNoTWVudXM6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICB2YXIgaW5kZXggPSBwbHVnaW5JbmRleCsrO1xuICAgICAgICBpZiAoXy5pc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgICBfKHBsdWdpbikuZWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgYWRkUGx1Z2luKGl0ZW0sIGluZGV4LCBpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRQbHVnaW4ocGx1Z2luLCBpbmRleCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRNZW51czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtZW51cztcbiAgICAgIH0sXG4gICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIG1lbnVzID0ge307XG4gICAgICAgIF8obG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzKS5lYWNoKGZ1bmN0aW9uKGpvYikge1xuICAgICAgICAgIGpvYi5jYW5jZWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsdWdpbkluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTUgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2tSb3V0ZXInLCBbJ25nUm91dGUnXSk7XG5cbiAgbW9kdWxlLmNvbnRyb2xsZXIoJ25vdGVib29rUm91dGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGUsICRyb3V0ZVBhcmFtcykge1xuICAgIHZhciBzZXNzaW9uUm91dGVSZXNvbHZlID0gJHJvdXRlLmN1cnJlbnQuJCRyb3V0ZS5yZXNvbHZlO1xuXG4gICAgJHNjb3BlLnNlc3Npb25JZCA9ICRyb3V0ZVBhcmFtcy5zZXNzaW9uSWQ7XG4gICAgJHNjb3BlLm5ld1Nlc3Npb24gPSAkcm91dGUuY3VycmVudC5sb2NhbHMuaXNOZXdTZXNzaW9uO1xuICAgICRzY29wZS5pc0ltcG9ydCA9ICRyb3V0ZS5jdXJyZW50LmxvY2Fscy5pc0ltcG9ydDtcbiAgICAkc2NvcGUuaXNPcGVuID0gJHJvdXRlLmN1cnJlbnQubG9jYWxzLmlzT3BlbjtcbiAgICAkc2NvcGUubm90ZWJvb2sgPSAkcm91dGUuY3VycmVudC5sb2NhbHMudGFyZ2V0O1xuXG4gICAgZGVsZXRlIHNlc3Npb25Sb3V0ZVJlc29sdmUuaXNOZXdTZXNzaW9uO1xuICAgIGRlbGV0ZSBzZXNzaW9uUm91dGVSZXNvbHZlLmlzSW1wb3J0O1xuICAgIGRlbGV0ZSBzZXNzaW9uUm91dGVSZXNvbHZlLmlzT3BlbjtcbiAgICBkZWxldGUgc2Vzc2lvblJvdXRlUmVzb2x2ZS50YXJnZXQ7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm1haW5BcHBcbiAqIFRoaXMgaXMgdGhlIG1haW4gbW9kdWxlIGZvciB0aGUgYmVha2VyIG5vdGVib29rIGFwcGxpY2F0aW9uLiBUaGUgbW9kdWxlIGhhcyBhIGRpcmVjdGl2ZSB0aGF0XG4gKiBob2xkcyB0aGUgbWVudSBiYXIgYXMgd2VsbCBhcyB0aGUgbm90ZWJvb2sgdmlldy5cbiAqIFRoZSBtb2R1bGUgYWxzbyBvd25zIHRoZSBjZW50cmFsaXplZCBjZWxsIGV2YWx1YXRpb24gbG9naWMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm1haW5BcHAnLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbmdSb3V0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsudXRpbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmNvbW1vblVpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5jb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5zZXNzaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5zZXNzaW9uTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubWVudVBsdWdpbk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmNlbGxNZW51UGx1Z2luTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubm90ZWJvb2tWZXJzaW9uTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuZXZhbHVhdG9yTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuZXZhbHVhdGVKb2JNYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5ub3RlYm9va1JvdXRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubm90ZWJvb2snXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcblxuICAvKipcbiAgICogYmtBcHBcbiAgICogLSBUaGlzIGlzIHRoZSBiZWFrZXIgQXBwXG4gICAqIC0gbWVudXMgKyBwbHVnaW5zICsgbm90ZWJvb2sobm90ZWJvb2sgbW9kZWwgKyBldmFsdWF0b3IpXG4gICAqL1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia01haW5BcHAnLCBmdW5jdGlvbihcbiAgICAgICR0aW1lb3V0LFxuICAgICAgJHNlc3Npb25TdG9yYWdlLFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICBia1Nlc3Npb24sXG4gICAgICBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgYmtNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIsXG4gICAgICAkbG9jYXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJ0ZW1wbGF0ZS9tYWluYXBwL21haW5hcHBcIl0oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIG5vdGVib29rOiAnPScsXG4gICAgICAgIHNlc3Npb25JZDogJ0AnLFxuICAgICAgICBuZXdTZXNzaW9uOiAnQCcsXG4gICAgICAgIGFsbG93RG9jdW1lbnRSZW5hbWluZzogJ0AnLFxuICAgICAgICBpc0ltcG9ydDogJ0BpbXBvcnQnLFxuICAgICAgICBpc09wZW46ICdAb3BlbidcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gbWVzc2FnZTtcbiAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdXBkYXRlTG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0TG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmxvYWRpbmdtc2c7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5sb2FkaW5nbXNnID09PSBtZXNzYWdlKSB7XG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZ21zZyA9IFwiXCI7XG4gICAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gbWVzc2FnZTtcbiAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgIGlmIChtZXNzYWdlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCRzY29wZS5sb2FkaW5nbXNnID09PSBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmdtc2cgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChub2RpZ2VzdCAhPT0gdHJ1ZSAmJiAhKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCwgMCwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGV2YWx1YXRvck1lbnVJdGVtcyA9IFtdO1xuXG4gICAgICAgIHZhciBhZGRFdmFsdWF0b3IgPSBmdW5jdGlvbihzZXR0aW5ncywgYWx3YXlzQ3JlYXRlTmV3RXZhbHVhdG9yKSB7XG4gICAgICAgICAgLy8gc2V0IHNoZWxsIGlkIHRvIG51bGwsIHNvIGl0IHdvbid0IHRyeSB0byBmaW5kIGFuIGV4aXN0aW5nIHNoZWxsIHdpdGggdGhlIGlkXG4gICAgICAgICAgaWYgKGFsd2F5c0NyZWF0ZU5ld0V2YWx1YXRvcikge1xuICAgICAgICAgICAgc2V0dGluZ3Muc2hlbGxJRCA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5uZXdFdmFsdWF0b3Ioc2V0dGluZ3MpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShldmFsdWF0b3Iuc3BlYykpIHtcbiAgICAgICAgICAgICAgdmFyIGFjdGlvbkl0ZW1zID0gW107XG4gICAgICAgICAgICAgIF8oZXZhbHVhdG9yLnNwZWMpLmVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlID09PSBcImFjdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25JdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdmFsdWUubmFtZSA/IHZhbHVlLm5hbWUgOiB2YWx1ZS5hY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsdWF0b3IucGVyZm9ybShrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGFjdGlvbkl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBldmFsdWF0b3JNZW51SXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBldmFsdWF0b3IucGx1Z2luTmFtZSwgLy8gVE9ETywgdGhpcyBzaG91bGQgYmUgZXZhbHVhdG9yLnNldHRpbmdzLm5hbWVcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBhY3Rpb25JdGVtc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGxvYWROb3RlYm9vayA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYWRkU2Nyb2xsaW5nSGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVE9ETywgdGhlIGZvbGxvd2luZyBpcyBhIGhhY2sgdG8gYWRkcmVzcyB0aGUgaXNzdWUgdGhhdFxuICAgICAgICAgICAgLy8gc29tZWhvdyB0aGUgbm90ZWJvb2sgaXMgc2Nyb2xsZWQgdG8gdGhlIG1pZGRsZVxuICAgICAgICAgICAgLy8gdGhpcyBoYWNrIGxpc3RlbnMgdG8gdGhlICdzY3JvbGwnIGV2ZW50IGFuZCBzY3JvbGxzIGl0IHRvIHRoZSB0b3BcbiAgICAgICAgICAgIC8vIEEgYmV0dGVyIHNvbHV0aW9uIGlzIHRvIGRvIHRoaXMgd2hlbiBBbmd1bGFyIHN0b3BzIGZpcmluZyBhbmQgRE9NIHVwZGF0ZXMgZmluaXNoLlxuICAgICAgICAgICAgLy8gQSBldmVuIGV2ZW4gYmV0dGVyIHNvbHV0aW9uIGlzIHRoZSBzZXNzaW9uIGFjdHVhbGx5IHJlbWVtYmVycyB3aGVyZSB0aGUgc2Nyb2xsaW5nIHdhc1xuICAgICAgICAgICAgLy8gYW5kIHNjcm9sbCB0byB0aGVyZSBhbmQgaW4gdGhlIGNhc2Ugb2Ygc3RhcnRpbmcgYSBuZXcgc2Vzc2lvbiAoaS5lLiBsb2FkaW5nIGEgbm90ZWJvb2sgZnJvbSBmaWxlKVxuICAgICAgICAgICAgLy8gc2Nyb2xsIHRvIHRvcC5cbiAgICAgICAgICAgIC8vIEEgZXZlbiBiZXR0ZXIgc29sdXRpb24gd291bGQgYmUgdG8gZ2V0IHJpZCBvZiB0aGUgdW53YW50ZWQgc2Nyb2xsaW5nIGluIHRoZSBmaXJzdCBwbGFjZS5cbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uID0gZnVuY3Rpb24oXG4gICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCxcbiAgICAgICAgICAgICAgaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBub3RlYm9vayBoYXMgdG8gbG9hZCBwbHVnaW5zIGZyb20gYW4gZXh0ZXJuYWwgc291cmNlXG4gICAgICAgICAgICB2YXIgciA9IG5ldyBSZWdFeHAoJ14oPzpbYS16XSs6KT8vLycsICdpJyk7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoci50ZXN0KG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcGx1Z0xpc3QgPSBcIjx1bD5cIjtcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLnRlc3Qobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICBwbHVnTGlzdCArPSBcIjxsaT5cIitub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ucGx1Z2luO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBwbHVnTGlzdCArPSBcIjwvdWw+XCI7XG4gICAgICAgICAgICAgICAgICBwcm9tcHRJZkluc2VjdXJlKHBsdWdMaXN0KS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyIGFjY2VwdGVkIHJpc2suLi4gZG8gdGhlIGxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgZGVuaWVkIHJpc2suLi4gY2xlYXIgcGx1Z2lucyB3aXRoIGV4dGVybmFsIFVSTCBhbmQgZG8gdGhlIGxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyLnRlc3Qobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldLnBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW49XCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBubyB1bnNhZmUgb3BlcmF0aW9uIGRldGVjdGVkLi4uIGRvIHRoZSBsb2FkaW5nXG4gICAgICAgICAgICBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLCBpc0V4aXN0aW5nU2Vzc2lvbik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgcHJvbXB0SWZJbnNlY3VyZSA9IGZ1bmN0aW9uKHVybExpc3QpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIlRoaXMgbm90ZWJvb2sgaXMgYXNraW5nIHRvIGxvYWQgdGhlIGZvbGxvd2luZyBwbHVnaW5zIGZyb20gZXh0ZXJuYWwgc2VydmVyczo8YnIvPlwiICsgdXJsTGlzdCtcbiAgICAgICAgICAgICAgICBcIiA8YnIvPkhvdyBkbyB5b3Ugd2FudCB0byBoYW5kbGUgdGhlc2UgZXh0ZXJuYWwgcGx1Z2lucz9cIixcbiAgICAgICAgICAgICAgICBcIldhcm5pbmc6IGV4dGVybmFsIHBsdWdpbnMgZGV0ZWN0ZWRcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgXCJEaXNhYmxlXCIsIFwiTG9hZFwiLCBcIlwiLCBcImJ0bi1kYW5nZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24gPSBmdW5jdGlvbihcbiAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLFxuICAgICAgICAgICAgICBpc0V4aXN0aW5nU2Vzc2lvbikge1xuXG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJMb2FkaW5nIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBhZGRTY3JvbGxpbmdIYWNrKCk7XG4gICAgICAgICAgICBpc0V4aXN0aW5nU2Vzc2lvbiA9ICEhaXNFeGlzdGluZ1Nlc3Npb247XG4gICAgICAgICAgICBldmFsdWF0b3JNZW51SXRlbXMuc3BsaWNlKDAsIGV2YWx1YXRvck1lbnVJdGVtcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBIQUNLIHRvIGZpeCBvbGRlciB2ZXJzaW9uIG9mIGV2YWx1YXRvciBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmNlbGxzICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuY2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwuY2VsbHNbaV0uZXZhbHVhdG9yID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5wbHVnaW47XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiSHRtbFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkh0bWxcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJMYXRleFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkxhdGV4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiSmF2YVNjcmlwdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJHcm9vdnlcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuY2VsbHNbaV0uZXZhbHVhdG9yID0gXCJHcm9vdnlcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobmFtZSA9PT0gXCJQeXRob25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBwbHVnaW47XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2YWx1YXRvck5hbWUgPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgZXZhbHVhdG9yUGx1Z2luID0gbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLnBsdWdpbjtcbiAgICAgICAgICAgICAgICBpZiAoYmtVdGlscy5iZWdpbnNXaXRoKGV2YWx1YXRvck5hbWUsXCJIdG1sXCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ubmFtZSA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLnBsdWdpbiA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgoZXZhbHVhdG9yTmFtZSxcIkxhdGV4XCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ubmFtZSA9IFwiTGF0ZXhcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5wbHVnaW4gPSBcIkxhdGV4XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChldmFsdWF0b3JOYW1lLFwiSmF2YVNjcmlwdFwiKSkge1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLm5hbWUgPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5wbHVnaW4gPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKGV2YWx1YXRvck5hbWUsXCJHcm9vdnlcIikpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5uYW1lID0gXCJHcm9vdnlcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5wbHVnaW4gPSBcIkdyb292eVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihldmFsdWF0b3JOYW1lPT09IFwiUHl0aG9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5uYW1lID0gZXZhbHVhdG9yUGx1Z2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSEFDSyBFTkRcblxuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAoKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHNlc3Npb25JZCA9IGJrU2Vzc2lvbk1hbmFnZXIuc2V0U2Vzc2lvbklkKHNlc3Npb25JZCk7XG5cbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0dXAoXG4gICAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsXG4gICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQpO1xuXG4gICAgICAgICAgICB2YXIgbXVzdHdhaXQ7XG4gICAgICAgICAgICBpZiAoIWlzRXhpc3RpbmdTZXNzaW9uICYmIGJrSGVscGVyLmhhc0NvZGVDZWxsKFwiaW5pdGlhbGl6YXRpb25cIikpIHtcbiAgICAgICAgICAgICAgbXVzdHdhaXQgPSBia0NvcmVNYW5hZ2VyLnNob3cwQnV0dG9uTW9kYWwoXCJUaGlzIG5vdGVib29rIGhhcyBpbml0aWFsaXphdGlvbiBjZWxscy4uLiB3YWl0aW5nIGZvciB0aGVpciBjb21wbGV0aW9uLlwiLCBcIlBsZWFzZSBXYWl0XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHVzZWQgdG8gbG9hZCBldmFsdWF0b3JzIGJlZm9yZSByZW5kZXJpbmcgdGhlIHBhZ2VcbiAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZXMgPSBfKG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykubWFwKGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZEV2YWx1YXRvcihldiwgIWlzRXhpc3RpbmdTZXNzaW9uKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJrVXRpbHMuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgIGJrVXRpbHMubG9nKFwib3BlblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHVyaTogbm90ZWJvb2tVcmksXG4gICAgICAgICAgICAgICAgICAgIHVyaVR5cGU6IHVyaVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICBtYXhDZWxsTGV2ZWw6IF8obm90ZWJvb2tNb2RlbC5jZWxscykubWF4KGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC5sZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgfSkubGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb3VudDogbm90ZWJvb2tNb2RlbC5jZWxscy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZVJvb3QoXCJpbml0aWFsaXphdGlvblwiKS50aGVuKGZ1bmN0aW9uICgpIHsgaWYobXVzdHdhaXQgIT09IHVuZGVmaW5lZCkgbXVzdHdhaXQuY2xvc2UoKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJMb2FkaW5nIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgYmtVdGlscy5sb2coXCJvcGVuXCIsIHtcbiAgICAgICAgICAgICAgICB1cmk6IG5vdGVib29rVXJpLFxuICAgICAgICAgICAgICAgIHVyaVR5cGU6IHVyaVR5cGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgICAgICAgICAgbWF4Q2VsbExldmVsOiBfKG5vdGVib29rTW9kZWwuY2VsbHMpLm1heChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC5sZXZlbDtcbiAgICAgICAgICAgICAgICB9KS5sZXZlbCxcbiAgICAgICAgICAgICAgICBjZWxsQ291bnQ6IG5vdGVib29rTW9kZWwuY2VsbHMubGVuZ3RoXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZVJvb3QoXCJpbml0aWFsaXphdGlvblwiKS50aGVuKGZ1bmN0aW9uICgpIHsgaWYobXVzdHdhaXQgIT09IHVuZGVmaW5lZCkgbXVzdHdhaXQuY2xvc2UoKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZShcIkxvYWRpbmcgbm90ZWJvb2tcIik7XG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wZW5Vcmk6IGZ1bmN0aW9uKHRhcmdldCwgc2Vzc2lvbklkLCByZXRyeSwgcmV0cnlDb3VudE1heCkge1xuICAgICAgICAgICAgICBpZiAoIXRhcmdldC51cmkpIHtcbiAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwoXCJGYWlsZWQgdG8gb3BlbiBub3RlYm9vaywgbm90ZWJvb2tVcmkgaXMgZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0dXNNZXNzYWdlKFwiT3BlbmluZyBVUklcIik7XG4gICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50TWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50TWF4ID0gMTAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSA9IGJrQ29yZU1hbmFnZXIuZ3Vlc3NVcmlUeXBlKHRhcmdldC51cmkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhcmdldC5yZWFkT25seSA9ICEhdGFyZ2V0LnJlYWRPbmx5O1xuICAgICAgICAgICAgICBpZiAoIXRhcmdldC5mb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZm9ybWF0ID0gYmtDb3JlTWFuYWdlci5ndWVzc0Zvcm1hdCh0YXJnZXQudXJpKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBpbXBvcnRlciA9IGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tJbXBvcnRlcih0YXJnZXQuZm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKCFpbXBvcnRlcikge1xuICAgICAgICAgICAgICAgIGlmIChyZXRyeSkge1xuICAgICAgICAgICAgICAgICAgLy8gcmV0cnksIHNvbWV0aW1lcyB0aGUgaW1wb3J0ZXIgY2FtZSBmcm9tIGEgcGx1Z2luIHRoYXQgaXMgYmVpbmcgbG9hZGVkXG4gICAgICAgICAgICAgICAgICByZXRyeUNvdW50TWF4IC09IDE7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsb2FkTm90ZWJvb2sub3BlblVyaSh0YXJnZXQsIHJldHJ5LCByZXRyeUNvdW50TWF4KTtcbiAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlKFwiT3BlbmluZyBVUklcIik7XG4gICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKFwiRmFpbGVkIHRvIG9wZW4gXCIgKyB0YXJnZXQudXJpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIiBiZWNhdXNlIGZvcm1hdCBcIiArIHRhcmdldC5mb3JtYXQgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiIHdhcyBub3QgcmVjb2duaXplZC5cIiwgXCJPcGVuIEZhaWxlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVMb2FkZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVMb2FkZXIodGFyZ2V0LnR5cGUpO1xuICAgICAgICAgICAgICAgIGZpbGVMb2FkZXIubG9hZCh0YXJnZXQudXJpKS50aGVuKGZ1bmN0aW9uKGZpbGVDb250ZW50QXNTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gaW1wb3J0ZXIuaW1wb3J0KGZpbGVDb250ZW50QXNTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnVyaSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgIGJrSGVscGVyLnNob3cxQnV0dG9uTW9kYWwoZGF0YSwgXCJPcGVuIEZhaWxlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJPcGVuaW5nIFVSSVwiKTtcbiAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tU2Vzc2lvbjogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbi5sb2FkKHNlc3Npb25JZCkudGhlbihmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gc2Vzc2lvbi5ub3RlYm9va1VyaTtcbiAgICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IHNlc3Npb24udXJpVHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSBzZXNzaW9uLnJlYWRPbmx5O1xuICAgICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBzZXNzaW9uLmZvcm1hdDtcbiAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9IGFuZ3VsYXIuZnJvbUpzb24oc2Vzc2lvbi5ub3RlYm9va01vZGVsSnNvbik7XG4gICAgICAgICAgICAgICAgdmFyIGVkaXRlZCA9IHNlc3Npb24uZWRpdGVkO1xuICAgICAgICAgICAgICAgIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsIHRydWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tSW1wb3J0OiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgdmFyIG5vdGVib29rID0gJHNlc3Npb25TdG9yYWdlLmltcG9ydGVkTm90ZWJvb2s7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciBpbXBvcnRlciA9IGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tJbXBvcnRlcignYmtyJyk7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gaW1wb3J0ZXIuaW1wb3J0KG5vdGVib29rKTtcbiAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rKTtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtcHR5Tm90ZWJvb2s6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9XG4gICAgICAgICAgICAgICAgJ3tcImJlYWtlclwiOiBcIjJcIiwgXCJldmFsdWF0b3JzXCI6IFt7XCJuYW1lXCI6IFwiSHRtbFwiLCBcInBsdWdpblwiOiBcIkh0bWxcIn0sJyArXG4gICAgICAgICAgICAgICAgJ3tcIm5hbWVcIjogXCJMYXRleFwiLCBcInBsdWdpblwiOiBcIkxhdGV4XCJ9LCcgK1xuICAgICAgICAgICAgICAgICd7XCJuYW1lXCI6IFwiSmF2YVNjcmlwdFwiLCBcInBsdWdpblwiOiBcIkphdmFTY3JpcHRcIn1dLCBcImNlbGxzXCI6IFtdfSc7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia05vdGVib29rVmVyc2lvbk1hbmFnZXIub3Blbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHROb3RlYm9vazogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIGJrVXRpbHMuZ2V0RGVmYXVsdE5vdGVib29rKCkudGhlbihmdW5jdGlvbihub3RlYm9va01vZGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyLm9wZW4obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgdmFyIGJrTm90ZWJvb2tXaWRnZXQ7XG4gICAgICAgICRzY29wZS5zZXRCa05vdGVib29rID0gZnVuY3Rpb24oYmtOb3RlYm9vaykge1xuICAgICAgICAgIGJrTm90ZWJvb2tXaWRnZXQgPSBia05vdGVib29rO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBfaW1wbCA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciBwcm9tcHRVcmlDaG9vc2VyID0gZnVuY3Rpb24odXJpVHlwZSwgaW5pdFVyaSkge1xuICAgICAgICAgICAgaWYgKCF1cmlUeXBlKSB7XG4gICAgICAgICAgICAgIHVyaVR5cGUgPSBcImZpbGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcih1cmlUeXBlKTtcbiAgICAgICAgICAgIGlmICghZmlsZVNhdmVyIHx8ICFmaWxlU2F2ZXIuc2hvd0ZpbGVDaG9vc2VyKSB7XG4gICAgICAgICAgICAgIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKFwiZmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbGVTYXZlci5zaG93RmlsZUNob29zZXIoaW5pdFVyaSkudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShyZXQudXJpKSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImNhbmNlbGxlZFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBwcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiRmlsZSBcIiArIHVyaSArIFwiIGV4aXN0cy4gT3ZlcndyaXRlP1wiLFxuICAgICAgICAgICAgICAgIFwiRmlsZSBleGlzdHNcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgXCJDYW5jZWxcIiwgXCJPdmVyd3JpdGVcIiwgXCJcIiwgXCJidG4tZGFuZ2VyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzYXZlQWx3YXlzT3ZlcndyaXRlID0gZnVuY3Rpb24odXJpLCB1cmlUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIodXJpVHlwZSk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCkubm90ZWJvb2tNb2RlbEFzU3RyaW5nO1xuICAgICAgICAgICAgICByZXR1cm4gZmlsZVNhdmVyLnNhdmUodXJpLCBjb250ZW50LCB0cnVlKTt9LCAxKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe3VyaTogdXJpLCB1cmlUeXBlOiB1cmlUeXBlfSk7XG4gICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgX3NhdmVQcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKGRlZmVycmVkLCB1cmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcih1cmlUeXBlKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZHVtcERpc3BsYXlTdGF0dXMoKTtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2F2ZURhdGEoKS5ub3RlYm9va01vZGVsQXNTdHJpbmc7XG4gICAgICAgICAgICAgIHJldHVybiBmaWxlU2F2ZXIuc2F2ZSh1cmksIGNvbnRlbnQpO1xuICAgICAgICAgICAgfSwgMSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7dXJpOiB1cmksIHVyaVR5cGU6IHVyaVR5cGV9KTsgLy8gZmlsZSBzYXZlIHN1Y2NlZWRcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJleGlzdHNcIikge1xuICAgICAgICAgICAgICAgIHByb21wdElmT3ZlcndyaXRlKHVyaSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzYXZlQWx3YXlzT3ZlcndyaXRlKHVyaSwgdXJpVHlwZSkudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXQpOyAvLyBmaWxlIHNhdmUgc3VjY2VlZFxuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pOyAvLyBmaWxlIHNhdmUgZmFpbGVkXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIF9zYXZlUHJvbXB0VXJpQ2hvb3NlcihkZWZlcnJlZCwgdXJpVHlwZSwgdXJpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZWFzb24gPT09IFwiaXNEaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzFCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgdXJpICsgXCIgaXMgYSBkaXJlY3RvcnkuIFBsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgbG9jYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJTYXZlIEZhaWxlZFwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3NhdmVQcm9tcHRVcmlDaG9vc2VyKGRlZmVycmVkLCB1cmlUeXBlLCB1cmkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVhc29uKTsgLy8gZmlsZSBzYXZlIGZhaWxlZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBfc2F2ZVByb21wdFVyaUNob29zZXIgPSBmdW5jdGlvbihkZWZlcnJlZCwgdXJpVHlwZSwgaW5pdFVyaSkge1xuICAgICAgICAgICAgcHJvbXB0VXJpQ2hvb3Nlcih1cmlUeXBlLCBpbml0VXJpKS50aGVuKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICBfc2F2ZVByb21wdElmT3ZlcndyaXRlKGRlZmVycmVkLCByZXQudXJpLCByZXQudXJpVHlwZSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiY2FuY2VsbGVkXCIpOyAvLyBmaWxlIHNhdmUgY2FuY2VsbGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVQcm9tcHRDaG9vc2VVcmkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIF9zYXZlUHJvbXB0VXJpQ2hvb3NlcihkZWZlcnJlZCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVQcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKHVyaSwgdXJpVHlwZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgX3NhdmVQcm9tcHRJZk92ZXJ3cml0ZShkZWZlcnJlZCwgdXJpLCB1cmlUeXBlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZVN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJTYXZpbmdcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgc2F2ZURvbmUgPSBmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZChmYWxzZSk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnVwZGF0ZU5vdGVib29rVXJpKHJldC51cmksIHJldC51cmlUeXBlLCBmYWxzZSwgXCJia3JcIik7XG4gICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIlNhdmVkXCIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZUZhaWxlZCA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGlmIChtc2cgPT09IFwiY2FuY2VsbGVkXCIpIHtcbiAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJDYW5jZWxsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwobXNnLCBcIlNhdmUgRmFpbGVkXCIpO1xuICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIlNhdmUgRmFpbGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZXZhbENvZGVJZCA9IDA7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogXCJia05vdGVib29rQXBwXCIsXG4gICAgICAgICAgICBnZXRTZXNzaW9uSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRTZXNzaW9uSWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXROb3RlYm9va01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldEJlYWtlck9iamVjdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdHVzTWVzc2FnZShtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdXBkYXRlTG9hZGluZ1N0YXR1c01lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZ2V0TG9hZGluZ1N0YXR1c01lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNhdmVOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNhdmVTdGFydCgpO1xuICAgICAgICAgICAgICB2YXIgdGhlbmFibGU7XG4gICAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzU2F2YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICAgICAgICAgIHRoZW5hYmxlID0gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgc2F2ZURhdGEgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIoc2F2ZURhdGEudXJpVHlwZSk7XG4gICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IHNhdmVEYXRhLm5vdGVib29rTW9kZWxBc1N0cmluZztcbiAgICAgICAgICAgICAgICAgIGZpbGVTYXZlci5zYXZlKHNhdmVEYXRhLm5vdGVib29rVXJpLCBjb250ZW50LCB0cnVlKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHt1cmk6IHNhdmVEYXRhLm5vdGVib29rVXJpLCB1cmlUeXBlOiBzYXZlRGF0YS51cmlUeXBlfSk7XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoZW5hYmxlID0gc2F2ZVByb21wdENob29zZVVyaSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0aGVuYWJsZS50aGVuKHNhdmVEb25lLCBzYXZlRmFpbGVkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYXZlTm90ZWJvb2tBczogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShub3RlYm9va1VyaSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2Fubm90IHNhdmUgbm90ZWJvb2ssIG5vdGVib29rVXJpIGlzIGVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlU3RhcnQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNhdmVQcm9tcHRJZk92ZXJ3cml0ZShub3RlYm9va1VyaSwgdXJpVHlwZSkudGhlbihzYXZlRG9uZSwgc2F2ZUZhaWxlZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2VOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgaWYgKGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmlzQW55SW5Qcm9ncmVzcygpICkge1xuICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgXCJBbGwgcnVubmluZyBhbmQgcGVuZGluZyBjZWxscyB3aWxsIGJlIGNhbmNlbGxlZC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJXYXJuaW5nIVwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5jYW5jZWxBbGwoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2xvc2VOb3RlYm9vaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTsgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHNlbGYuX2Nsb3NlTm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfY2xvc2VOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgdmFyIGNsb3NlU2Vzc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xvc2UoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBub3RlYm9va1RpdGxlID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va1RpdGxlKCk7XG4gICAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgXCJEbyB5b3Ugd2FudCB0byBzYXZlIFwiICsgbm90ZWJvb2tUaXRsZSArIFwiP1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbmZpcm0gY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5zYXZlTm90ZWJvb2soKS50aGVuKGNsb3NlU2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2Ugd2l0aG91dCBzYXZpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG51bGwsIFwiU2F2ZVwiLCBcIkRvbid0IHNhdmVcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xsYXBzZUFsbFNlY3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZ2V0Tm90ZWJvb2tNb2RlbCgpLmNlbGxzLCBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwudHlwZSA9PSBcInNlY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgY2VsbC5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzQ29kZUNlbGw6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICAvLyB0b0V2YWwgY2FuIGJlIGEgdGFnTmFtZSAoc3RyaW5nKSwgZWl0aGVyIFwiaW5pdGlhbGl6YXRpb25cIiwgbmFtZSBvZiBhbiBldmFsdWF0b3Igb3IgdXNlciBkZWZpbmVkIHRhZ1xuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxJRCAoc3RyaW5nKVxuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxNb2RlbFxuICAgICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9FdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5oYXNDZWxsKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldEFsbENvZGVDZWxscyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIGNlbGwsIGp1c3QgZ2V0IHRoZSBjZWxsIG1vZGVsIGZyb20gY2VsbElEXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIG5vdCBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBia1Nlc3Npb25NYW5hZ2VyLm5vdGVib29rTW9kZWxHZXRJbml0aWFsaXphdGlvbkNlbGxzKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgdXNlciB0YWcgZm9yIGEgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBpdCBpcyBhIGV2YWx1YXRvciBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aEV2YWx1YXRvcih0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSB1bmRlZmluZWQgfHwgKF8uaXNBcnJheSh0b0V2YWwpICYmIHRvRXZhbC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gdG9FdmFsIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsTW9kZWxcbiAgICAgICAgICAgICAgLy8gb3IgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvRXZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaGFzQ2VsbCh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHNlY3Rpb24gY2VsbCBvciByb290IGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRBbGxDb2RlQ2VsbHModG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbCh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBub3QgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IFwiaW5pdGlhbGl6YXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gYmtTZXNzaW9uTWFuYWdlci5ub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNlbGxPcC5oYXNVc2VyVGFnKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhVc2VyVGFnKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgaXQgaXMgYSBldmFsdWF0b3IgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc0FycmF5KHRvRXZhbCkgJiYgdG9FdmFsLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIkVSUk9SOiBjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGUodG9FdmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGVBbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlUm9vdDogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIC8vIHRvRXZhbCBjYW4gYmUgYSB0YWdOYW1lIChzdHJpbmcpLCBlaXRoZXIgXCJpbml0aWFsaXphdGlvblwiLCBuYW1lIG9mIGFuIGV2YWx1YXRvciBvciB1c2VyIGRlZmluZWQgdGFnXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbElEIChzdHJpbmcpXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbE1vZGVsXG4gICAgICAgICAgICAgIC8vIG9yIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b0V2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmhhc0NlbGwodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcih0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBzZWN0aW9uIGNlbGwgb3Igcm9vdCBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2VsbCwganVzdCBnZXQgdGhlIGNlbGwgbW9kZWwgZnJvbSBjZWxsSURcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSBcImluaXRpYWxpemF0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjZWxsT3AuaGFzVXNlclRhZyh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSB1c2VyIHRhZyBmb3IgYSBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoVXNlclRhZyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoRXZhbHVhdG9yKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IHVuZGVmaW5lZCB8fCAoIV8uaXNBcnJheSh0b0V2YWwpICYmIHRvRXZhbC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJFUlJPUjogY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIV8uaXNBcnJheSh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmV2YWx1YXRlUm9vdCh0b0V2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlSm9iTWFuYWdlci5ldmFsdWF0ZVJvb3RBbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlQ29kZTogZnVuY3Rpb24oZXZhbHVhdG9yLCBjb2RlKSB7XG4gICAgICAgICAgICAgIHZhciBvdXRjb250YWluZXIgPSB7IH07XG4gICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrSGVscGVyLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgIGV2YWxDb2RlSWQrKztcbiAgICAgICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGUoe1xuICAgICAgICAgICAgICAgIGlkOiBcIm9uVGhlRmx5Q2VsbF9cIitldmFsQ29kZUlkLFxuICAgICAgICAgICAgICAgIGV2YWx1YXRvcjogZXZhbHVhdG9yLFxuICAgICAgICAgICAgICAgIGlucHV0OiB7IGJvZHk6IGNvZGUgfSxcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IG91dGNvbnRhaW5lclxuICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5yZXNvbHZlKG91dGNvbnRhaW5lci5yZXN1bHQpOyB9LCBmdW5jdGlvbihlcnIpIHsgZGVmZXJyZWQucmVqZWN0KGVycik7IH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhZGRFdmFsdWF0b3Ioc2V0dGluZ3MsIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUV2YWx1YXRvcjogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlci5yZW1vdmVFdmFsdWF0b3IocGx1Z2luKTtcbiAgICAgICAgICAgICAgZXZhbHVhdG9yTWVudUl0ZW1zID0gXy5yZWplY3QoZXZhbHVhdG9yTWVudUl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PSBwbHVnaW47XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEV2YWx1YXRvck1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3JNZW51SXRlbXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QmtOb3RlYm9va1dpZGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia05vdGVib29rV2lkZ2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZU5vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIudG9nZ2xlTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgbmFtZXMgb2YgYWxsIGVuYWJsZWQgZXZhbHVhdG9yc1xuICAgICAgICAgICAgZ2V0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBldmFscyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGV2YWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2YWxzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0IChhIHN1YnNldCBvZikgY29kZSBjZWxsc1xuICAgICAgICAgICAgZ2V0Q29kZUNlbGxzOiBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gZmlsdGVyIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGNvZGUgY2VsbHNcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGNlbGxPcC5oYXNDZWxsKGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcihmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldENlbGwoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc0FycmF5KGZpbHRlcikgJiYgZmlsdGVyLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwIDsgaSA8IGZpbHRlci5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IGZpbHRlcltpXTtcbiAgICAgICAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICAgICAgICBvLmNlbGxJZCA9IGNlbGwuaWQ7XG4gICAgICAgICAgICAgICAgICBvLmV2YWx1YXRvcklkID0gY2VsbC5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgICAgICBvLmNvZGUgPSBjZWxsLmlucHV0LmJvZHk7XG4gICAgICAgICAgICAgICAgICBvLnRhZ3MgPSBjZWxsLnRhZ3M7XG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbC5kYXRhcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLmRhdGFyZXN1bHQ7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwub3V0cHV0ICE9PSB1bmRlZmluZWQgJiYgY2VsbC5vdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwub3V0cHV0LnJlc3VsdC50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXQucmVzdWx0LnR5cGUgPT09ICdCZWFrZXJEaXNwbGF5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLm91dHB1dC5yZXN1bHQub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dHR5cGUgPSBjZWxsLm91dHB1dC5yZXN1bHQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gY2VsbC5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGNlbGwub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgby50eXBlID0gXCJCZWFrZXJDb2RlQ2VsbFwiO1xuICAgICAgICAgICAgICAgICAgcmV0LnB1c2gobyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0bXBDZWxsID0ge307XG4gICAgICAgICAgICAgICAgdG1wQ2VsbC5jZWxsSWQgPSBmaWx0ZXIuaWQ7XG4gICAgICAgICAgICAgICAgdG1wQ2VsbC5ldmFsdWF0b3JJZCA9IGZpbHRlci5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgICAgdG1wQ2VsbC5jb2RlID0gZmlsdGVyLmlucHV0LmJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5kYXRhcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRtcENlbGwub3V0cHV0ID0gZmlsdGVyLmRhdGFyZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3V0cHV0ICE9PSB1bmRlZmluZWQgJiYgZmlsdGVyLm91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5vdXRwdXQucmVzdWx0LnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm91dHB1dC5yZXN1bHQudHlwZSA9PT0gJ0JlYWtlckRpc3BsYXknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdG1wQ2VsbC5vdXRwdXQgPSBmaWx0ZXIub3V0cHV0LnJlc3VsdC5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdG1wQ2VsbC5vdXRwdXR0eXBlID0gZmlsdGVyLm91dHB1dC5yZXN1bHQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICB0bXBDZWxsLm91dHB1dCA9IGZpbHRlci5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBDZWxsLm91dHB1dCA9IGZpbHRlci5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0bXBDZWxsLnRhZ3MgPSBmaWx0ZXIudGFncztcbiAgICAgICAgICAgICAgICB0bXBDZWxsLnR5cGUgPSBcIkJlYWtlckNvZGVDZWxsXCI7XG4gICAgICAgICAgICAgICAgcmV0LnB1c2godG1wQ2VsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXQgYSBjb2RlIGNlbGwgYm9keVxuICAgICAgICAgICAgc2V0Q29kZUNlbGxCb2R5OiBmdW5jdGlvbihuYW1lLCBjb2RlKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIGlmICghY2VsbE9wLmhhc0NlbGwobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbCAgPSBjZWxsT3AuZ2V0Q2VsbChuYW1lKTtcbiAgICAgICAgICAgICAgaWYgKCBjZWxsLmlucHV0ID09PSB1bmRlZmluZWQgfHwgY2VsbC5pbnB1dC5ib2R5ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICBjZWxsLmlucHV0LmJvZHkgPSBjb2RlO1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXQgYSBjb2RlIGNlbGwgZXZhbHVhdG9yXG4gICAgICAgICAgICBzZXRDb2RlQ2VsbEV2YWx1YXRvcjogZnVuY3Rpb24obmFtZSwgZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgIHZhciBldmFscyA9IHRoaXMuZ2V0RXZhbHVhdG9ycygpO1xuICAgICAgICAgICAgICBpZiAoIGV2YWxzLmluZGV4T2YoZXZhbHVhdG9yKT09LTEgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBldmFsdWF0b3IgXCIrZXZhbHVhdG9yK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIGlmICghY2VsbE9wLmhhc0NlbGwobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbCAgPSBjZWxsT3AuZ2V0Q2VsbChuYW1lKTtcbiAgICAgICAgICAgICAgaWYgKCBjZWxsLmlucHV0ID09PSB1bmRlZmluZWQgfHwgY2VsbC5pbnB1dC5ib2R5ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICBjZWxsLmV2YWx1YXRvciA9IGV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgY2VsbE9wLnJlYnVpbGRNYXBzKCk7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldCBhIGNvZGUgY2VsbCB0YWdzXG4gICAgICAgICAgICBzZXRDb2RlQ2VsbFRhZ3M6IGZ1bmN0aW9uKG5hbWUsIHRhZ3MpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgaWYgKCFjZWxsT3AuaGFzQ2VsbChuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBpcyBub3QgY29kZSBjZWxsXCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsICA9IGNlbGxPcC5nZXRDZWxsKG5hbWUpO1xuICAgICAgICAgICAgICBjZWxsLnRhZ3MgPSB0YWdzO1xuICAgICAgICAgICAgICBjZWxsT3AucmVidWlsZE1hcHMoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgYmtDb3JlTWFuYWdlci5zZXRCa0FwcEltcGwoX2ltcGwpO1xuXG4gICAgICAgIHZhciBzZXREb2N1bWVudFRpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5hbGxvd0RvY3VtZW50UmVuYW1pbmcgPT09ICdmYWxzZScpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICB2YXIgZWRpdGVkID0gJHNjb3BlLmlzRWRpdGVkKCksXG4gICAgICAgICAgICAgIGZpbGVuYW1lID0gJHNjb3BlLmZpbGVuYW1lKCksXG4gICAgICAgICAgICAgIHRpdGxlO1xuXG4gICAgICAgICAgdGl0bGUgPSBmaWxlbmFtZTtcbiAgICAgICAgICBpZiAoZWRpdGVkKSB0aXRsZSA9ICcqJyArIHRpdGxlO1xuXG4gICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFZGl0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTW9kZWxFZGl0ZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNFZGl0ZWQoKScsIGZ1bmN0aW9uKGVkaXRlZCwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAoZWRpdGVkID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgICAgICAgIHNldERvY3VtZW50VGl0bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2ZpbGVuYW1lKCknLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgPT09IG9sZFZhbCkgcmV0dXJuO1xuICAgICAgICAgIHNldERvY3VtZW50VGl0bGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGludGVydmFsSUQgPSBudWxsO1xuICAgICAgICB2YXIgc3RvcEF1dG9CYWNrdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoaW50ZXJ2YWxJRCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW50ZXJ2YWxJRCA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzdGFydEF1dG9CYWNrdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzdG9wQXV0b0JhY2t1cCgpO1xuICAgICAgICAgIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbChia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCwgNjAgKiAxMDAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldE1lbnVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGtleWRvd25IYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmIChlLndoaWNoID09PSA4MykpIHsgLy8gQ3RybCArIHNcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIF9pbXBsLnNhdmVOb3RlYm9vaygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmIChlLndoaWNoID09PSA4MykpIHsgLy8gQ21kICsgc1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgX2ltcGwuc2F2ZU5vdGVib29rKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5ub2RlTmFtZSAhPT0gXCJURVhUQVJFQVwiKSB7XG4gICAgICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUud2hpY2ggPT09IDkwKSB7IC8vIEN0cmwgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci51bmRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gOTApKSB7IC8vIENtZCArIHpcbiAgICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnVuZG8oKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jdHJsS2V5ICYmIGUud2hpY2ggPT09IDg5KSB7IC8vIEN0cmwgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5yZWRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gODkpKSB7IC8vIENtZCArIHpcbiAgICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnJlZG8oKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPRE8gaW1wbGVtZW50IGdsb2JhbCByZWRvXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuICAgICAgICB2YXIgb25EZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAoKTtcbiAgICAgICAgICBzdG9wQXV0b0JhY2t1cCgpO1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2V0QmtBcHBJbXBsKG51bGwpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLnVuYmluZCgna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcbiAgICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBudWxsO1xuICAgICAgICAgIGJrVXRpbHMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgb25EZXN0cm95KTtcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwKCk7XG4gICAgICAgICAgaWYgKGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va01vZGVsRWRpdGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdXIgbm90ZWJvb2sgaGFzIGJlZW4gZWRpdGVkIGJ1dCBub3Qgc2F2ZWQsIGlmIHlvdSBjbG9zZSB0aGUgcGFnZSB5b3VyIGNoYW5nZXMgbWF5IGJlIGxvc3RcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmlzQW55SW5Qcm9ncmVzcygpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJTb21lIGNlbGxzIGFyZSBzdGlsbCBydW5uaW5nLiBMZWF2aW5nIHRoZSBwYWdlIG5vdyB3aWxsIGNhdXNlIGNhbmNlbGxpbmcgYW5kIHJlc3VsdCBiZSBsb3N0XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uRGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cub251bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5jYW5jZWwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3RhcnRBdXRvQmFja3VwKCk7XG4gICAgICAgICRzY29wZS5nb3RvQ29udHJvbFBhbmVsID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoYmtVdGlscy5pc01pZGRsZUNsaWNrKGV2ZW50KSkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oJGxvY2F0aW9uLmFic1VybCgpICsgJy9iZWFrZXInKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5maWxlbmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rVGl0bGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJG9uKFwiJGxvY2F0aW9uQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoYmtFdmFsdWF0ZUpvYk1hbmFnZXIuaXNBbnlJblByb2dyZXNzKCkgJiYgbmV4dC5pbmRleE9mKFwiZm9yY2U9eWVzXCIpID09PSAtMSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIkFsbCBydW5uaW5nIGFuZCBwZW5kaW5nIGNlbGxzIHdpbGwgYmUgY2FuY2VsbGVkLlwiLFxuICAgICAgICAgICAgICAgIFwiV2FybmluZyFcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmNhbmNlbEFsbCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdXRlUGFyYW1zID0ge2ZvcmNlOiBcInllc1wifTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BsaXRzID0gZGVjb2RlVVJJQ29tcG9uZW50KG5leHQuc3BsaXQoXCIjXCIpWzFdKS5zcGxpdChcIj9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBzcGxpdHNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaCA9IHNwbGl0c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFycyA9IHNlYXJjaC5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFpciA9IHYuc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVQYXJhbXNbcGFpclswXV0gPSBwYWlyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKHBhdGgpLnNlYXJjaChyb3V0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5wcm9tcHRUb1NhdmUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHByb21wdGVkID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHByb21wdGVkKSB7IC8vIHByZXZlbnQgcHJvbXB0aW5nIG11bHRpcGxlIGF0IHRoZSBzYW1lIHRpbWVcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvbXB0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiQmVha2VyIHNlcnZlciBkaXNjb25uZWN0ZWQuIEZ1cnRoZXIgZWRpdHMgd2lsbCBub3QgYmUgc2F2ZWQuPGJyPlwiICtcbiAgICAgICAgICAgICAgICBcIlNhdmUgY3VycmVudCBub3RlYm9vayBhcyBhIGZpbGU/XCIsXG4gICAgICAgICAgICAgICAgXCJEaXNjb25uZWN0ZWRcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFwiU2F2ZVwiLCBzYXZlIHRoZSBub3RlYm9vayBhcyBhIGZpbGUgb24gdGhlIGNsaWVudCBzaWRlXG4gICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtVdGlscy5zYXZlQXNDbGllbnRGaWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5nZXRTYXZlRGF0YSgpLm5vdGVib29rTW9kZWxBc1N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgXCJub3RlYm9vay5ia3JcIik7XG4gICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgLy8gXCJOb3Qgbm93XCIsIGhpamFjayBhbGwga2V5cHJlc3MgZXZlbnRzIHRvIHByb21wdCBhZ2FpblxuICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgJHNjb3BlLnByb21wdFRvU2F2ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIlNhdmVcIiwgXCJOb3Qgbm93XCIsIFwiYnRuLXByaW1hcnlcIiwgXCJcIlxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwcm9tcHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICB2YXIgY29ubmVjdGlvbk1hbmFnZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIFJFQ09OTkVDVF9USU1FT1VUID0gNTAwMDsgLy8gNSBzZWNvbmRzXG4gICAgICAgICAgdmFyIE9GRkxJTkVfTUVTU0FHRSA9IFwib2ZmbGluZVwiO1xuICAgICAgICAgIHZhciBDT05ORUNUSU5HX01FU1NBR0UgPSBcInJlY29ubmVjdGluZ1wiO1xuICAgICAgICAgIHZhciByZWNvbm5lY3RUaW1lb3V0O1xuICAgICAgICAgIHZhciBzdGF0dXNNZXNzYWdlID0gT0ZGTElORV9NRVNTQUdFO1xuICAgICAgICAgIHZhciBkaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3BXYWl0aW5nUmVjb25uZWN0KCk7XG4gICAgICAgICAgICBzdGF0dXNNZXNzYWdlID0gT0ZGTElORV9NRVNTQUdFO1xuICAgICAgICAgICAgYmtVdGlscy5kaXNjb25uZWN0KCk7IC8vIHByZXZlbnQgZnVydGhlciBhdHRlbXB0aW5nIHRvIHJlY29ubmVjdFxuICAgICAgICAgICAgJHNjb3BlLnByb21wdFRvU2F2ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIHdhaXRSZWNvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0YXR1c01lc3NhZ2UgPSBDT05ORUNUSU5HX01FU1NBR0U7XG5cbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIDUgc2Nlb25kcywgaWYgcmVjb25uZWN0IGRpZG4ndCBoYXBwZW4sIHByb21wdCB0byBzYXZlXG4gICAgICAgICAgICBpZiAoIXJlY29ubmVjdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgcmVjb25uZWN0VGltZW91dCA9ICR0aW1lb3V0KGluZGljYXRlUmVjb25uZWN0RmFpbGVkLCBSRUNPTk5FQ1RfVElNRU9VVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiB1c2VyIGF0dGVtcHRzIHRvIGludGVyYWN0IHdpdGhpbiA1IHNlY29uZCwgYWxzbyBwcm9tcHQgdG8gc2F2ZVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQsIHRydWUpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIHN0b3BXYWl0aW5nUmVjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVjb25uZWN0VGltZW91dCkge1xuICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwocmVjb25uZWN0VGltZW91dCk7XG4gICAgICAgICAgICAgIHJlY29ubmVjdFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBpbmRpY2F0ZVJlY29ubmVjdEZhaWxlZCwgdHJ1ZSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHdhaXRSZWNvbm5lY3QoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblJlY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5pc1Nlc3Npb25WYWxpZCgpLnRoZW4oZnVuY3Rpb24oaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICBzdG9wV2FpdGluZ1JlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnJlY29ubmVjdEV2YWx1YXRvcnMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFN0YXR1c01lc3NhZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gc3RhdHVzTWVzc2FnZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0Rpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkaXNjb25uZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICAkc2NvcGUuZ2V0T2ZmaW5lTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uTWFuYWdlci5nZXRTdGF0dXNNZXNzYWdlKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc0Rpc2Nvbm5lY3RlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uTWFuYWdlci5pc0Rpc2Nvbm5lY3RlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJrVXRpbHMuYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgaWYgKG1zZy5zdWNjZXNzZnVsID09PSAkc2NvcGUuaXNEaXNjb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdmFyIGRpc2Nvbm5lY3RlZCA9ICFtc2cuc3VjY2Vzc2Z1bDtcbiAgICAgICAgICAgIGlmIChkaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgY29ubmVjdGlvbk1hbmFnZXIub25EaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbm5lY3Rpb25NYW5hZ2VyLm9uUmVjb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNEaXNjb25uZWN0ZWQoKScsIGZ1bmN0aW9uKGRpc2Nvbm5lY3RlZCkge1xuICAgICAgICAgIGlmIChkaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHN0b3BBdXRvQmFja3VwKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0QXV0b0JhY2t1cCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0RG9jdW1lbnRUaXRsZSgpO1xuXG4gICAgICAgIC8vIGVuc3VyZSBhbiBleGlzdGluZyBzZXNzaW9uIGlzIGNsZWFyZWQgc28gdGhhdCB0aGUgZW1wdHkgbm90ZWJvb2sgbW9kZWxcbiAgICAgICAgLy8gbWFrZXMgdGhlIFVJIGlzIGJsYW5rIGltbWVkaWF0ZWx5IChpbnN0ZWFkIG9mIHNob3dpbmcgbGVmdG92ZXIgZnJvbSBhIHByZXZpb3VzIHNlc3Npb24pXG4gICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xlYXIoKTtcblxuICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoJy4uL2JlYWtlci9yZXN0L3V0aWwvZ2V0TWVudVBsdWdpbnMnKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1lbnVVcmxzKSB7XG4gICAgICAgICAgICBtZW51VXJscy5mb3JFYWNoKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmxvYWRNZW51UGx1Z2luKHVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWVudWVzID0gd2luZG93LmJlYWtlci5nZXRNZW51SXRlbXMoKTtcbiAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmF0dGFjaE1lbnVzKG1lbnVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIucmVzZXQoKTtcbiAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIucmVzZXQoKTtcblxuICAgICAgICBpZiAoJHNjb3BlLm5ld1Nlc3Npb24gPT09IFwibmV3XCIpIHtcbiAgICAgICAgICBsb2FkTm90ZWJvb2suZGVmYXVsdE5vdGVib29rKCRzY29wZS5zZXNzaW9uSWQpO1xuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5uZXdTZXNzaW9uID09PSBcImVtcHR5XCIpIHtcbiAgICAgICAgICBsb2FkTm90ZWJvb2suZW1wdHlOb3RlYm9vaygkc2NvcGUuc2Vzc2lvbklkKTtcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuaXNJbXBvcnQgPT09ICd0cnVlJykge1xuICAgICAgICAgIGxvYWROb3RlYm9vay5mcm9tSW1wb3J0KCRzY29wZS5zZXNzaW9uSWQpO1xuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5pc09wZW4gPT09ICd0cnVlJykge1xuICAgICAgICAgIGxvYWROb3RlYm9vay5vcGVuVXJpKCRzY29wZS5ub3RlYm9vaywgJHNjb3BlLnNlc3Npb25JZCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9hZE5vdGVib29rLmZyb21TZXNzaW9uKCRzY29wZS5zZXNzaW9uSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ldmFsdWF0ZUpvYk1hbmFnZXInLCBbJ2JrLnV0aWxzJywgJ2JrLmV2YWx1YXRvck1hbmFnZXInXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdia0V2YWx1YXRlSm9iTWFuYWdlcicsIGZ1bmN0aW9uKGJrVXRpbHMsIGJrRXZhbHVhdG9yTWFuYWdlciwgJHRpbWVvdXQpIHtcblxuICAgIHZhciBvdXRwdXRNYXAgPSB7IH07XG5cbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgaW5uZXJ0eXBlOiBcIkVycm9yXCIsXG4gICAgICAgIG9iamVjdDogbXNnXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHRleHRNZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgaW5uZXJ0eXBlOiBcIlRleHRcIixcbiAgICAgICAgb2JqZWN0OiBtc2dcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgRVJST1JfTUVTU0FHRV9PTl9FQVJMSUVSX0ZBSUxVUkUgPVxuICAgICAgZXJyb3JNZXNzYWdlKFwiRXZhbHVhdGlvbiBjYW5jZWxsZWQgZHVlIHRvIGEgZmFpbHVyZSBvZiBhbiBlYXJsaWVyIGNlbGwgZXZhbHVhdGlvblwiKTtcbiAgICB2YXIgRVJST1JfTUVTU0FHRV9PTl9DQU5DRUwgPVxuICAgICAgZXJyb3JNZXNzYWdlKFwiLi4uIGNhbmNlbGxlZCFcIik7XG4gICAgdmFyIE1FU1NBR0VfUEVORElORyA9XG4gICAgICB0ZXh0TWVzc2FnZShcInBlbmRpbmdcIik7XG4gICAgdmFyIE1FU1NBR0VfV0FJVElOR19GT1JfRVZBTFVUT1JfSU5JVCA9XG4gICAgICB0ZXh0TWVzc2FnZShcIndhaXRpbmcgZm9yIGV2YWx1YXRvciBpbml0aWFsaXphdGlvbiAuLi5cIik7XG5cbiAgICB2YXIgam9iUXVldWUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBfcXVldWUgPSBbXTtcbiAgICAgIHZhciBfam9iSW5Qcm9ncmVzcyA9IFtdO1xuICAgICAgdmFyIHJ1bm5pbmcgPSB7fTtcblxuICAgICAgdmFyIGV2YWx1YXRlSm9iID0gZnVuY3Rpb24oam9iKSB7XG4gICAgICAgIGpvYi5ldmFsdWF0b3IgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0RXZhbHVhdG9yKGpvYi5ldmFsdWF0b3JJZCk7XG4gICAgICAgIGlmIChqb2IuZXZhbHVhdG9yKSB7XG4gICAgICAgICAgYmtVdGlscy5sb2coXCJldmFsdWF0ZVwiLCB7XG4gICAgICAgICAgICBwbHVnaW46IGpvYi5ldmFsdWF0b3IucGx1Z2luTmFtZSxcbiAgICAgICAgICAgIGxlbmd0aDogam9iLmNvZGUubGVuZ3RoIH0pO1xuICAgICAgICAgIHJldHVybiBqb2IuZXZhbHVhdG9yLmV2YWx1YXRlKGpvYi5jb2RlLCBqb2Iub3V0cHV0LCBvdXRwdXRNYXBbam9iLmNlbGxJZF0pO1xuICAgICAgICB9XG4gICAgICAgIGpvYi5vdXRwdXQucmVzdWx0ID0gTUVTU0FHRV9XQUlUSU5HX0ZPUl9FVkFMVVRPUl9JTklUO1xuICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLndhaXRFdmFsdWF0b3Ioam9iLmV2YWx1YXRvcklkKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICBqb2IuZXZhbHVhdG9yID0gZXY7XG4gICAgICAgICAgICBpZiAoZXYgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgcmV0dXJuIGpvYi5ldmFsdWF0b3IuZXZhbHVhdGUoam9iLmNvZGUsIGpvYi5vdXRwdXQsIG91dHB1dE1hcFtqb2IuY2VsbElkXSk7XG4gICAgICAgICAgICByZXR1cm4gXCJjYW5ub3QgZmluZCBldmFsdWF0b3IgZm9yIFwiK2pvYi5ldmFsdWF0b3JJZDtcbiAgICAgICAgICB9ICk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZG9OZXh0ID0gZnVuY3Rpb24oaW5uZXh0KSB7XG4gICAgICAgIHZhciBqb2I7XG5cbiAgICAgICAgaWYgKF9qb2JJblByb2dyZXNzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgLy8gc3RhcnQgYSBuZXcgcm9vdCBqb2JcbiAgICAgICAgICBqb2IgPSBfcXVldWUuc2hpZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIHNvbWV0aGluZyBleGVjdXRpbmcuLi5cbiAgICAgICAgICB2YXIgbGFzdCA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0xXTtcbiAgICAgICAgICBpZiAobGFzdC5ydW5jaGlsZCAhPT0gdW5kZWZpbmVkICYmIGxhc3QucnVuY2hpbGQuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIGxhc3QucnVuY2hpbGQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsYXN0LmZpbmlzaGVkICYmIGxhc3QuY2FuY2VsX2RlZmVycmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQsIGlkeDtcbiAgICAgICAgICAgIC8vIHRoaXMgam9iIGhhcyBmaW5pc2hlZCBidXQgZHVlIHRvIGNhbmNlbGxhdGlvblxuICAgICAgICAgICAgaWYgKF9qb2JJblByb2dyZXNzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHBhcmVudCBqb2IgdG8gY2FuY2VsXG4gICAgICAgICAgICAgIHBhcmVudCA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0yXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHBhcmVudC5jYW5jZWxfZGVmZXJyZWQgPSBsYXN0LmNhbmNlbF9kZWZlcnJlZDtcbiAgICAgICAgICAgICAgaWYgKHBhcmVudC5ldmFsdWF0b3IgJiYgcGFyZW50LmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24pIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8cGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW5baWR4XS5vdXRwdXQucmVzdWx0PUVSUk9SX01FU1NBR0VfT05fQ0FOQ0VMO1xuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpZHhdLndoZW5kb25lLnJlamVjdCgnLi4uIGNhbmNlbGxlZCEnKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcnVubmluZ1twYXJlbnQuY2hpbGRyZW5baWR4XS5jZWxsSWRdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9yKGlkeCA9IDA7IGlkeDxfcXVldWUubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIF9xdWV1ZVtpZHhdLm91dHB1dC5yZXN1bHQ9RVJST1JfTUVTU0FHRV9PTl9DQU5DRUw7XG4gICAgICAgICAgICAgICAgX3F1ZXVlW2lkeF0ud2hlbmRvbmUucmVqZWN0KCcuLi4gY2FuY2VsbGVkIScpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW19xdWV1ZVtpZHhdLmNlbGxJZF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgX3F1ZXVlID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0LndoZW5kb25lLnJlamVjdCgnLi4uIGNhbmNlbGxlZCEnKTtcbiAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW2xhc3QuY2VsbElkXTtcbiAgICAgICAgICAgIF9qb2JJblByb2dyZXNzLnBvcCgpO1xuICAgICAgICAgICAgYmtIZWxwZXIuY2xlYXJTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgbGFzdC5ldmFsdWF0b3JJZCArIFwiIGNlbGwgXCIgKyBsYXN0LmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvd1N0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBwYXJlbnQuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgcGFyZW50LmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsYXN0LmNhbmNlbF9kZWZlcnJlZC5yZXNvbHZlKCdkb25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb05leHQodHJ1ZSk7XG4gICAgICAgICAgICBpZiAoaW5uZXh0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIGJrSGVscGVyLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChsYXN0LnJ1bmNoaWxkID09PSB1bmRlZmluZWQgJiYgbGFzdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBjYW4gc3RhcnQgYSBjaGlsZHJlblxuICAgICAgICAgICAgam9iID0gbGFzdC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGxhc3QuY2hpbGRyZW4uc2hpZnQoKTtcbiAgICAgICAgICAgIGxhc3QucnVuY2hpbGQgPSBqb2I7XG4gICAgICAgICAgfSBlbHNlIGlmIChsYXN0LmZpbmlzaGVkICYmIGxhc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGhhcyBmaW5pc2hlZFxuICAgICAgICAgICAgaWYgKGxhc3QuZXJyb3IpIHtcbiAgICAgICAgICAgICAgbGFzdC53aGVuZG9uZS5yZWplY3QobGFzdC5lcnJvcik7XG4gICAgICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHBhcmVudCBqb2IgdG8gY2FuY2VsXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0yXTtcblxuICAgICAgICAgICAgICAgIHZhciBpZHg7XG4gICAgICAgICAgICAgICAgZm9yKGlkeCA9IDA7IGlkeDxwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2lkeF0ub3V0cHV0LnJlc3VsdD1FUlJPUl9NRVNTQUdFX09OX0VBUkxJRVJfRkFJTFVSRTtcbiAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpZHhdLndoZW5kb25lLnJlamVjdChcIkV2YWx1YXRpb24gY2FuY2VsbGVkIGR1ZSB0byBhIGZhaWx1cmUgb2YgYW4gZWFybGllciBjZWxsIGV2YWx1YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgcnVubmluZ1twYXJlbnQuY2hpbGRyZW5baWR4XS5jZWxsSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaWR4O1xuICAgICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8X3F1ZXVlLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgIF9xdWV1ZVtpZHhdLm91dHB1dC5yZXN1bHQ9RVJST1JfTUVTU0FHRV9PTl9FQVJMSUVSX0ZBSUxVUkU7XG4gICAgICAgICAgICAgICAgICBfcXVldWVbaWR4XS53aGVuZG9uZS5yZWplY3QoXCJFdmFsdWF0aW9uIGNhbmNlbGxlZCBkdWUgdG8gYSBmYWlsdXJlIG9mIGFuIGVhcmxpZXIgY2VsbCBldmFsdWF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbX3F1ZXVlW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3F1ZXVlID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICBsYXN0LndoZW5kb25lLnJlc29sdmUobGFzdC5vdXRwdXQpO1xuICAgICAgICAgICAgYmtIZWxwZXIuY2xlYXJTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgbGFzdC5ldmFsdWF0b3JJZCArIFwiIGNlbGwgXCIgKyBsYXN0LmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICBkZWxldGUgcnVubmluZ1tsYXN0LmNlbGxJZF07XG4gICAgICAgICAgICBfam9iSW5Qcm9ncmVzcy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGpvYiA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0xXTtcbiAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvd1N0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBqb2IuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgam9iLmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb05leHQodHJ1ZSk7XG4gICAgICAgICAgICBpZiAoaW5uZXh0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIGJrSGVscGVyLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChqb2IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkgeyBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7IH0sIDApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9qb2JJblByb2dyZXNzLnB1c2goam9iKTtcbiAgICAgICAgYmtIZWxwZXIuc2hvd1N0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBqb2IuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgam9iLmNlbGxJZCwgdHJ1ZSk7XG5cbiAgICAgICAgZXZhbHVhdGVKb2Ioam9iKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgam9iLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICBqb2Iub3V0cHV0ID0gZGF0YTtcbiAgICAgICAgICBkb05leHQoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgam9iLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICBqb2IuZXJyb3IgPSBlcnI7XG4gICAgICAgICAgZG9OZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5uZXh0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgYmtIZWxwZXIudXBkYXRlU3RhdHVzKCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKGpvYikge1xuICAgICAgICAgIHJ1bm5pbmdbam9iLmNlbGxJZF0gPSB0cnVlO1xuICAgICAgICAgIF9xdWV1ZS5wdXNoKGpvYik7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbihqb2IsIGNoaWxkKSB7XG4gICAgICAgICAgcnVubmluZ1tjaGlsZC5jZWxsSWRdID0gdHJ1ZTtcbiAgICAgICAgICBqb2IuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEN1cnJlbnRKb2I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmV0dXJuIF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0xXTtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWxBbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBpZHg7XG4gICAgICAgICAgZm9yICggaWR4PTA7IGlkeDxfcXVldWUubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgX3F1ZXVlW2lkeF0ub3V0cHV0Lm91dHB1dC5yZXN1bHQgPSBFUlJPUl9NRVNTQUdFX09OX0NBTkNFTDtcbiAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW19xdWV1ZVtpZHhdLmNlbGxJZF07XG4gICAgICAgICAgfVxuICAgICAgICAgIF9xdWV1ZSA9IFtdO1xuICAgICAgICB9LFxuICAgICAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICByZXR1cm4gcnVubmluZ1tuXSA9PT0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtVdGlscy5mY2FsbChkb05leHQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gZXZhbHVhdGUgYSBjZWxsIChhcyBhIHN1YmNlbGwgb2YgY3VycmVudGx5IHJ1bm5pbmcgY2VsbClcbiAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbihjZWxsLCBub3RpY2spIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgaWYgKHBhcmVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHJldHVybiB0aGlzLmV2YWx1YXRlUm9vdChjZWxsKTtcblxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGlmIChqb2JRdWV1ZS5pc1J1bm5pbmcoY2VsbC5pZCkpIHtcbiAgICAgICAgICBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzKFwiRVJST1I6IHJlc3RhcnQgYmxvY2tlZCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICAvLyBwcmV2ZW50IHNlbGYgcmVzdGFydFxuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLm91dHB1dC5yZXN1bHQgPSBNRVNTQUdFX1BFTkRJTkc7XG4gICAgICAgIGlmICghY2VsbC5vdXRwdXQpIHtcbiAgICAgICAgICBjZWxsLm91dHB1dCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmFsSm9iID0ge1xuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIGNlbGxJZDogY2VsbC5pZCxcbiAgICAgICAgICBldmFsdWF0b3JJZDogY2VsbC5ldmFsdWF0b3IsXG4gICAgICAgICAgY29kZTogY2VsbC5pbnB1dC5ib2R5LFxuICAgICAgICAgIG91dHB1dDogY2VsbC5vdXRwdXQsXG4gICAgICAgICAgcmV0cnk6IDAsXG4gICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgIHJ1bmNoaWxkOiB1bmRlZmluZWQsXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgIHdoZW5kb25lIDogZGVmZXJyZWRcbiAgICAgICAgfTtcbiAgICAgICAgam9iUXVldWUuYWRkQ2hpbGRyZW4ocGFyZW50LGV2YWxKb2IpO1xuICAgICAgICBpZiAobm90aWNrID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICAvLyBldmFsdWF0ZSBhIGNlbGwgaW4gdG9wIGxldmVsIGNvbnRleHRcbiAgICAgIGV2YWx1YXRlUm9vdDogZnVuY3Rpb24oY2VsbCwgbm90aWNrKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgaWYgKGpvYlF1ZXVlLmlzUnVubmluZyhjZWxsLmlkKSkge1xuICAgICAgICAgIGJrSGVscGVyLnNob3dUcmFuc2llbnRTdGF0dXMoXCJFUlJPUjogcmVzdGFydCBibG9ja2VkIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVEFSVCBQUk9ISUJJVEVEIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIC8vIHByZXZlbnQgc2VsZiByZXN0YXJ0XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiUkVTVEFSVCBQUk9ISUJJVEVEIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGNlbGwub3V0cHV0LnJlc3VsdCA9IE1FU1NBR0VfUEVORElORztcbiAgICAgICAgaWYgKCFjZWxsLm91dHB1dCkge1xuICAgICAgICAgIGNlbGwub3V0cHV0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2YWxKb2IgPSB7XG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgY2VsbElkOiBjZWxsLmlkLFxuICAgICAgICAgIGV2YWx1YXRvcklkOiBjZWxsLmV2YWx1YXRvcixcbiAgICAgICAgICBjb2RlOiBjZWxsLmlucHV0LmJvZHksXG4gICAgICAgICAgb3V0cHV0OiBjZWxsLm91dHB1dCxcbiAgICAgICAgICByZXRyeTogMCxcbiAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgICAgcnVuY2hpbGQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgd2hlbmRvbmUgOiBkZWZlcnJlZFxuICAgICAgICB9O1xuICAgICAgICBqb2JRdWV1ZS5hZGQoZXZhbEpvYik7XG4gICAgICAgIGlmIChub3RpY2sgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBqb2JRdWV1ZS50aWNrKCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIC8vIGV2YWx1YXRlIGEgY2VsbCAoYXMgYSBzdWJjZWxsIG9mIGN1cnJlbnRseSBydW5uaW5nIGNlbGwpXG4gICAgICBldmFsdWF0ZUFsbDogZnVuY3Rpb24oY2VsbHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvbWlzZXMgPSBfKGNlbGxzKS5tYXAoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmV2YWx1YXRlKGNlbGwsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gYmtVdGlscy5hbGwocHJvbWlzZXMpO1xuICAgICAgfSxcbiAgICAgIC8vIGV2YWx1YXRlIGFsbCBjZWxscyBpbiB0b3AgbGV2ZWwgY29udGV4dFxuICAgICAgZXZhbHVhdGVSb290QWxsOiBmdW5jdGlvbihjZWxscywgcGFyZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHByb21pc2VzID0gXyhjZWxscykubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5ldmFsdWF0ZVJvb3QoY2VsbCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBqb2JRdWV1ZS50aWNrKCk7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmFsbChwcm9taXNlcyk7XG4gICAgICB9LFxuICAgICAgaXNDYW5jZWxsYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyZW50Sm9iID0gam9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgICByZXR1cm4gISEoY3VycmVudEpvYiAmJiBjdXJyZW50Sm9iLmV2YWx1YXRvciAmJiBjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24pO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyZW50Sm9iID0gam9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRKb2IgJiYgY3VycmVudEpvYi5ldmFsdWF0b3IpIHtcbiAgICAgICAgICBpZiAoY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50Sm9iLmNhbmNlbF9kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgICAgICAgICAgY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxBbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VycmVudEpvYiA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuXG4gICAgICAgIGpvYlF1ZXVlLmNhbmNlbEFsbCgpO1xuXG4gICAgICAgIGlmIChjdXJyZW50Sm9iICYmIGN1cnJlbnRKb2IuZXZhbHVhdG9yKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbikge1xuICAgICAgICAgICAgY3VycmVudEpvYi5jYW5jZWxfZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgICAgIGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgaXNBbnlJblByb2dyZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEham9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgfSxcbiAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxBbGwoKTtcbiAgICAgIH0sXG4gICAgICByZWdpc3Rlck91dHB1dENlbGw6IGZ1bmN0aW9uKGlkLCBvdXQpIHtcbiAgICAgICAgb3V0cHV0TWFwW2lkXSA9IG91dDtcbiAgICAgIH0sXG4gICAgICBkZVJlZ2lzdGVyT3V0cHV0Q2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgZGVsZXRlIG91dHB1dE1hcFtpZF07XG4gICAgICB9LFxuICAgICAgZ2V0T3V0cHV0Q2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dE1hcFtpZF07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ldmFsdWF0b3JQbHVnaW5NYW5hZ2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmV2YWx1YXRvck1hbmFnZXInLCBbJ2JrLnV0aWxzJywgJ2JrLmV2YWx1YXRlUGx1Z2luTWFuYWdlciddKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnYmtFdmFsdWF0b3JNYW5hZ2VyJywgZnVuY3Rpb24gKGJrVXRpbHMsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyKSB7XG5cbiAgICB2YXIgZXZhbHVhdG9ycyA9IHt9O1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMgPSBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBldmFsdWF0b3JzID0ge307XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRXZhbHVhdG9yOiBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGV2YWx1YXRvcnMpIHtcbiAgICAgICAgICB2YXIgZSA9IGV2YWx1YXRvcnNba2V5XTtcbiAgICAgICAgICBpZiAoZS5wbHVnaW5OYW1lID09PSBwbHVnaW4pIHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oZS5leGl0KSkge1xuICAgICAgICAgICAgICBlLmV4aXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBldmFsdWF0b3JzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV3RXZhbHVhdG9yOiBmdW5jdGlvbihldmFsdWF0b3JTZXR0aW5ncykge1xuICAgICAgICBpZiAobG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLmluZGV4T2YoZXZhbHVhdG9yU2V0dGluZ3MpID09PSAtMSlcblx0ICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLnB1c2goZXZhbHVhdG9yU2V0dGluZ3MpO1xuXHQgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuXHQgICAgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuZ2V0RXZhbHVhdG9yRmFjdG9yeUFuZFNoZWxsKGV2YWx1YXRvclNldHRpbmdzKVxuXHQgICAgLnRoZW4oZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG5cdCAgICAgIGlmKGV2YWx1YXRvciA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiY2Fubm90IGNyZWF0ZSBldmFsdWF0b3IgZmFjdG9yeVwiKTtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKF8uaXNFbXB0eShldmFsdWF0b3JTZXR0aW5ncy5uYW1lKSkge1xuXHQgICAgICAgIGlmICghZXZhbHVhdG9yc1tldmFsdWF0b3IucGx1Z2luTmFtZV0pIHtcblx0ICAgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLm5hbWUgPSBldmFsdWF0b3IucGx1Z2luTmFtZTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3MubmFtZSA9IGV2YWx1YXRvci5wbHVnaW5OYW1lICsgXCJfXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cblx0ICAgICAgaWYgKCFldmFsdWF0b3JTZXR0aW5ncy52aWV3KSB7XG5cdCAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3MudmlldyA9IHt9O1xuXHQgICAgICB9XG5cdCAgICAgIGlmICghZXZhbHVhdG9yU2V0dGluZ3Mudmlldy5jbSkge1xuXHQgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLnZpZXcuY20gPSB7fTtcblx0ICAgICAgfVxuXHQgICAgICBldmFsdWF0b3JTZXR0aW5ncy52aWV3LmNtLm1vZGUgPSBldmFsdWF0b3IuY21Nb2RlO1xuXHQgICAgICBldmFsdWF0b3JzW2V2YWx1YXRvclNldHRpbmdzLm5hbWVdID0gZXZhbHVhdG9yO1xuXHQgICAgICBpZiAoIGV2YWx1YXRvclNldHRpbmdzLmRlZmVycmVkICE9PSB1bmRlZmluZWQgKSB7XG5cdCAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3MuZGVmZXJyZWQucmVzb2x2ZShldmFsdWF0b3IpO1xuXHQgICAgICAgIGRlbGV0ZSBldmFsdWF0b3JTZXR0aW5ncy5kZWZlcnJlZDtcblx0ICAgICAgfVxuXHQgICAgICBkZWZlcnJlZC5yZXNvbHZlKGV2YWx1YXRvcik7XG5cdCAgICB9KVxuXHQgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG5cdCAgICAgIHZhciBpbmRleCA9IGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5pbmRleE9mKGV2YWx1YXRvclNldHRpbmdzKTtcblx0ICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLnNwbGljZShpbmRleCwgMSk7XG5cdCAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yOiBmdW5jdGlvbihldmFsdWF0b3JJZCkge1xuICAgICAgICByZXR1cm4gZXZhbHVhdG9yc1tldmFsdWF0b3JJZF07XG4gICAgICB9LFxuICAgICAgd2FpdEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9ySWQpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBpZiAoZXZhbHVhdG9yc1tldmFsdWF0b3JJZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZXZhbHVhdG9yc1tldmFsdWF0b3JJZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLmxlbmd0aDsgaSArKyApIHtcbiAgICAgICAgICAgIGlmIChsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnNbaV0ubmFtZSA9PT0gZXZhbHVhdG9ySWQpIHtcbiAgICAgICAgICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzW2ldLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaSA9PT0gbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG5cbiAgICAgIGdldFZpc3VhbFBhcmFtczogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAoZXZhbHVhdG9yc1tuYW1lXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5nZXRWaXN1YWxQYXJhbXMobmFtZSk7XG4gICAgICAgIHZhciB2ID0geyB9O1xuICAgICAgICB2YXIgZSA9IGV2YWx1YXRvcnNbbmFtZV07XG4gICAgICAgIHZhciBmID0gYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuZ2V0VmlzdWFsUGFyYW1zKG5hbWUpO1xuICAgICAgICBpZiAoZS5iZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5iZ0NvbG9yID0gZS5iZ0NvbG9yO1xuICAgICAgICBlbHNlIGlmIChmICE9PSB1bmRlZmluZWQgJiYgZi5iZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5iZ0NvbG9yID0gZi5iZ0NvbG9yO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdi5iZ0NvbG9yID0gXCJcIjtcblxuICAgICAgICBpZiAoZS5mZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5mZ0NvbG9yID0gZS5mZ0NvbG9yO1xuICAgICAgICBlbHNlIGlmIChmICE9PSB1bmRlZmluZWQgJiYgZi5mZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5mZ0NvbG9yID0gZi5mZ0NvbG9yO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdi5mZ0NvbG9yID0gXCJcIjtcblxuICAgICAgICBpZiAoZS5ib3JkZXJDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYm9yZGVyQ29sb3IgPSBlLmJvcmRlckNvbG9yO1xuICAgICAgICBlbHNlIGlmIChmICE9PSB1bmRlZmluZWQgJiYgZi5ib3JkZXJDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYm9yZGVyQ29sb3IgPSBmLmJvcmRlckNvbG9yO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdi5ib3JkZXJDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGUuc2hvcnROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5zaG9ydE5hbWUgPSBlLnNob3J0TmFtZTtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuc2hvcnROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5zaG9ydE5hbWUgPSBmLnNob3J0TmFtZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuc2hvcnROYW1lID0gXCJcIjtcblxuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRvcnM7XG4gICAgICB9LFxuICAgICAgZ2V0TG9hZGluZ0V2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzO1xuICAgICAgfSxcbiAgICAgIHJlY29ubmVjdEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmVhY2goZXZhbHVhdG9ycywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICBpZiAoZXYgJiYgXy5pc0Z1bmN0aW9uKGV2LnJlY29ubmVjdCkpIHtcbiAgICAgICAgICAgIGV2LnJlY29ubmVjdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXhpdEFuZFJlbW92ZUFsbEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmVhY2goZXZhbHVhdG9ycywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICBpZiAoZXYgJiYgXy5pc0Z1bmN0aW9uKGV2LmV4aXQpKSB7XG4gICAgICAgICAgICBldi5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZXZhbHVhdG9ycyA9IHt9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlclxuICogTm90ZWJvb2sgQ2VsbCBNb2RlbCBkb2Vzbid0IG93biB0aGUgbm90ZWJvb2sgbW9kZWwuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsIFtdKTtcblxuICAvLyB1dGlsaXRpZXNcbiAgdmFyIGdlbmVyYXRlQ2VsbE1hcCA9IGZ1bmN0aW9uKGNlbGxzKSB7XG4gICAgdmFyIGRlY29yYXRlZENlbGxzID0ge1xuICAgICAgJ3Jvb3QnOiB7XG4gICAgICAgIGlkOiAncm9vdCcsXG4gICAgICAgIHJhdzogbnVsbCxcbiAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBhbGxEZXNjZW5kYW50czogW11cbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICghY2VsbHMgfHwgY2VsbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZGVjb3JhdGVkQ2VsbHM7XG4gICAgfVxuXG4gICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbihjZWxsLCBpbmRleCkge1xuICAgICAgZGVjb3JhdGVkQ2VsbHNbY2VsbC5pZF0gPSB7XG4gICAgICAgIGlkOiBjZWxsLmlkLFxuICAgICAgICByYXc6IGNlbGwsXG4gICAgICAgIHJhd0luZGV4OiBpbmRleCxcbiAgICAgICAgbGV2ZWw6IGNlbGwubGV2ZWwgPiAwID8gY2VsbC5sZXZlbCA6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIGFsbERlc2NlbmRhbnRzOiBbXVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHZhciBzdGFjayA9IFtkZWNvcmF0ZWRDZWxscy5yb290XTtcbiAgICBzdGFjay5wZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1t0aGlzLmxlbmd0aCAtIDFdO1xuICAgIH07XG4gICAgXyhkZWNvcmF0ZWRDZWxscykuZWFjaChmdW5jdGlvbihjZWxsKSB7XG4gICAgICBpZiAoY2VsbC5pZCA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChzdGFjay5wZWVrKCkubGV2ZWwgPj0gY2VsbC5sZXZlbCkge1xuICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgIH1cbiAgICAgIGRlY29yYXRlZENlbGxzW3N0YWNrLnBlZWsoKS5pZF0uY2hpbGRyZW4ucHVzaChjZWxsLmlkKTtcbiAgICAgIGRlY29yYXRlZENlbGxzW2NlbGwuaWRdLnBhcmVudCA9IHN0YWNrLnBlZWsoKS5pZDtcbiAgICAgIHN0YWNrLmZvckVhY2goZnVuY3Rpb24oYykge1xuICAgICAgICBkZWNvcmF0ZWRDZWxsc1tjLmlkXS5hbGxEZXNjZW5kYW50cy5wdXNoKGNlbGwuaWQpO1xuICAgICAgfSk7XG4gICAgICBzdGFjay5wdXNoKGNlbGwpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWNvcmF0ZWRDZWxscztcbiAgfTtcblxuICB2YXIgZ2VuZXJhdGVUYWdNYXAgPSBmdW5jdGlvbihjZWxsTWFwKSB7XG4gICAgLy8gaW5pdGlhbGl6YXRpb24gY2VsbHNcbiAgICB2YXIgaW5pdGlhbGl6YXRpb25DZWxscyA9IF8oY2VsbE1hcCkuY2hhaW4oKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yYXcgJiYgY2VsbC5yYXcuaW5pdGlhbGl6YXRpb247XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIGlmIChjZWxsLnJhdy50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXyhjZWxsLmFsbERlc2NlbmRhbnRzKS5jaGFpbigpXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihjaGlsZElkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbE1hcFtjaGlsZElkXTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGMucmF3LnR5cGUgPT09ICdjb2RlJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZsYXR0ZW4oKVxuICAgICAgICAudW5pcSgpXG4gICAgICAgIC5zb3J0QnkoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnJhd0luZGV4O1xuICAgICAgICB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yYXc7XG4gICAgICAgIH0pXG4gICAgICAgIC52YWx1ZSgpO1xuXG4gICAgLy8gZXZhbHVhdG9yc1xuICAgIHZhciBldmFsdWF0b3JNYXAgPSB7fTtcbiAgICBldmFsdWF0b3JNYXAuYWRkID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzW2tleV0pIHtcbiAgICAgICAgdGhpc1trZXldID0gW107XG4gICAgICB9XG4gICAgICB0aGlzW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgfTtcbiAgICBfKGNlbGxNYXApLmNoYWluKClcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucmF3ICYmIGNlbGwucmF3LnR5cGUgPT09ICdjb2RlJztcbiAgICAgICAgfSlcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oY29kZUNlbGwpIHtcbiAgICAgICAgICBldmFsdWF0b3JNYXAuYWRkKGNvZGVDZWxsLnJhdy5ldmFsdWF0b3IsIGNvZGVDZWxsLnJhdyk7XG4gICAgICAgIH0pO1xuXG4gICAgLy8gdXNlciB0YWdzXG4gICAgdmFyIHVzZXJUYWdzTWFwID0ge307XG4gICAgdXNlclRhZ3NNYXAuYWRkID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzW2tleV0pIHtcbiAgICAgICAgdGhpc1trZXldID0gW107XG4gICAgICB9XG4gICAgICB0aGlzW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgfTtcbiAgICBfKGNlbGxNYXApLmNoYWluKClcbiAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIHJldHVybiBjZWxsLnJhdyAmJiBjZWxsLnJhdy50eXBlID09PSAnY29kZScgJiYgY2VsbC5yYXcudGFncyAhPT0gdW5kZWZpbmVkICYmIGNlbGwucmF3LnRhZ3MgIT09ICcnO1xuICAgIH0pXG4gICAgLmVhY2goZnVuY3Rpb24oY29kZUNlbGwpIHtcbiAgICAgIHZhciByZSA9IC9cXHMrLztcbiAgICAgIHZhciB0YWdzID0gY29kZUNlbGwucmF3LnRhZ3Muc3BsaXQocmUpO1xuICAgICAgdmFyIGk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB1c2VyVGFnc01hcC5hZGQodGFnc1tpXSwgY29kZUNlbGwucmF3KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXphdGlvbjogaW5pdGlhbGl6YXRpb25DZWxscyxcbiAgICAgIGV2YWx1YXRvcjogZXZhbHVhdG9yTWFwLFxuICAgICAgdXNlcnRhZ3M6IHVzZXJUYWdzTWFwXG4gICAgfTtcbiAgfTtcblxuICB2YXIgcmVwbGFjZVdob2xlQXJyYXkgPSBmdW5jdGlvbihvbGRBcnJheSwgbmV3QXJyYXkpIHtcbiAgICB2YXIgYXJncyA9IF8uZmxhdHRlbihbMCwgb2xkQXJyYXkubGVuZ3RoLCBuZXdBcnJheV0pO1xuICAgIG9sZEFycmF5LnNwbGljZS5hcHBseShvbGRBcnJheSwgYXJncyk7XG4gIH07XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyJywgZnVuY3Rpb24oJHRpbWVvdXQsICRyb290U2NvcGUpIHtcbiAgICB2YXIgY2VsbHMgPSBbXTtcbiAgICB2YXIgY2VsbE1hcCA9IHt9O1xuICAgIHZhciB0YWdNYXAgPSB7fTtcbiAgICB2YXIgdW5kb0FjdGlvbiA9IHt9O1xuICAgIHZhciB1bmRvQWN0aW9uMiA9IHt9O1xuICAgIHZhciByZWRvQWN0aW9uID0ge307XG4gICAgdmFyIHJlZG9BY3Rpb24yID0ge307XG4gICAgdmFyIHJlY3JlYXRlQ2VsbE1hcCA9IGZ1bmN0aW9uKGRvTm90Q2xlYXJVbmRvQWN0aW9uKSB7XG4gICAgICBjZWxsTWFwID0gZ2VuZXJhdGVDZWxsTWFwKGNlbGxzKTtcbiAgICAgIHRhZ01hcCA9IGdlbmVyYXRlVGFnTWFwKGNlbGxNYXApO1xuICAgICAgaWYgKCFkb05vdENsZWFyVW5kb0FjdGlvbikge1xuICAgICAgICB1bmRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmVkb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmVkb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBPcHRpbWl6ZSB0aGlzIGZ1bmN0aW9uIHNvIGl0IGRvZXNuJ3QgZGVzdHJveSB0aGUgcGFnZSBzY3JvbGwgYW5kIHJlcXVpcmVcbiAgICAgIC8vIHRoaXMgaGFjayBiZWxvdy5cbiAgICAgIC8vXG4gICAgICAvLyBNb3N0IGxpa2VseSBiZWNhdXNlIG9mIHRoZSBuZXN0ZWQgbmF0dXJlIG9mIHRoZSBjZWxsIG1hcCBhbmQgdGhlIGNlbGxzIGluIHRoZVxuICAgICAgLy8gRE9NIHRoYXQgcmVmbGVjdCB0aGF0IGNlbGwgbWFwLCB3aGVuIG9uZSBjaGFuZ2VzIHNvbWV0aGluZyBhdCB0aGUgYmFzZSBvZiB0aGVcbiAgICAgIC8vIHRyZWUgKGxpa2UgYWRkaW5nIGEgbmV3IHNlY3Rpb24gY2VsbFxuICAgICAgLy8gW2h0dHBzOi8vZ2l0aHViLmNvbS90d29zaWdtYS9iZWFrZXItbm90ZWJvb2svaXNzdWVzLzY3Ml0pLCBpdCBub3Qgb25seSB0YWtlcyBhblxuICAgICAgLy8gZXRlcm5pdHksIGJ1dCByYW5kb21seSBzY3JvbGxzIHRvIH42NSUgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdodG1sLCBib2R5Jykuc2Nyb2xsVG9wKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2VsbE1hcFJlY3JlYXRlZCcpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIF9nZXRDZWxsTWFwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxNYXA7XG4gICAgICB9LFxuICAgICAgX2dldFRhZ01hcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0YWdNYXA7XG4gICAgICB9LFxuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKF9jZWxsc18pIHtcbiAgICAgICAgaWYgKF9jZWxsc18pIHtcbiAgICAgICAgICBjZWxscyA9IF9jZWxsc187XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGlwYm9hcmQgPSBudWxsO1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICAgIH0sXG4gICAgICBnZXRJbmRleDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxNYXBbaWRdID8gY2VsbE1hcFtpZF0ucmF3SW5kZXggOiAtMTtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsQXRJbmRleDogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxzW2luZGV4XTtcbiAgICAgIH0sXG4gICAgICBoYXNDZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gISFjZWxsTWFwW2lkXTtcbiAgICAgIH0sXG4gICAgICBfZ2V0RGVjb3JhdGVkQ2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2VsbChpZCkpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbE1hcFtpZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRDZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucmF3O1xuICAgICAgfSxcbiAgICAgIGdldENlbGxUeXBlOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKGlkKS50eXBlO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxMZXZlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoaWQpLmxldmVsO1xuICAgICAgfSxcbiAgICAgIGdldFBhcmVudDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucGFyZW50O1xuICAgICAgICBpZiAocGFyZW50SWQgPT09ICdyb290Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKHBhcmVudElkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGRJZCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmdldENlbGwoY2hpbGRJZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldEFsbERlc2NlbmRhbnRzOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5hbGxEZXNjZW5kYW50cy5tYXAoZnVuY3Rpb24oY2hpbGRJZCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmdldENlbGwoY2hpbGRJZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldEFsbENvZGVDZWxsczogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgIGlkID0gJ3Jvb3QnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsbERlc2NlbmRhbnRzKGlkKS5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnR5cGUgPT09ICdjb2RlJztcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgLy8gZmluZCB0aGUgZmlyc3QgY29kZSBjZWxsIHN0YXJ0aW5nIHdpdGggdGhlIHN0YXJ0Q2VsbCBhbmQgc2NhblxuICAgICAgLy8gdXNpbmcgdGhlIGRpcmVjdGlvbiwgaWYgdGhlIHN0YXJ0Q2VsbCBpcyBhIGNvZGUgY2VsbCwgaXQgd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgIGZpbmRDb2RlQ2VsbDogZnVuY3Rpb24oc3RhcnRDZWxsSWQsIGZvcndhcmQpIHtcbiAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoc3RhcnRDZWxsSWQpO1xuICAgICAgICB3aGlsZSAoY2VsbCkge1xuICAgICAgICAgIGlmIChjZWxsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNlbGwgPSBmb3J3YXJkID8gdGhpcy5nZXROZXh0KGNlbGwuaWQpIDogdGhpcy5nZXRQcmV2KGNlbGwuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24oaWQsIGNlbGwpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXgsIDAsIGNlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5jZWxsLmFkZGVkJywgY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGluc2VydEZpcnN0OiBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdChjZWxsKSkge1xuICAgICAgICAgIHRocm93ICd1bmFjY2VwdGFibGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgY2VsbHMuc3BsaWNlKDAsIDAsIGNlbGwpO1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRBZnRlcjogZnVuY3Rpb24oaWQsIGNlbGwpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KGNlbGwpKSB7XG4gICAgICAgICAgdGhyb3cgJ3VuYWNjZXB0YWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCArIDEsIDAsIGNlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5jZWxsLmFkZGVkJywgY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGluc2VydEF0OiBmdW5jdGlvbihpbmRleCwgY2VsbCwgZG9Ob3RDbGVhclVuZG9BY3Rpb24pIHtcbiAgICAgICAgaWYgKF8uaXNBcnJheShjZWxsKSkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoY2VsbHMsIFtpbmRleCwgMF0uY29uY2F0KGNlbGwpKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KGNlbGwpKSB7XG4gICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4LCAwLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndW5hY2NlcHRhYmxlJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoZG9Ob3RDbGVhclVuZG9BY3Rpb24pO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5jZWxsLmFkZGVkJywgY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGlzUG9zc2libGVUb01vdmVVcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNlbGwgaXNuJ3QgZmlyc3QgKG9yIG5vbmV4aXN0ZW50PylcbiAgICAgICAgcmV0dXJuIFstMSwgMF0uaW5kZXhPZih0aGlzLmdldEluZGV4KGlkKSkgPT09IC0xO1xuICAgICAgfSxcbiAgICAgIG1vdmVVcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoaWQpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXhdID0gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXggLSAxXSA9IGNlbGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgfSxcbiAgICAgIGlzUG9zc2libGVUb01vdmVEb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICAvLyBJZiB0aGUgY2VsbCBpc24ndCBsYXN0IChvciBub25leGlzdGVudD8pXG4gICAgICAgIHJldHVybiBbLTEsIChjZWxscy5sZW5ndGggLSAxKV0uaW5kZXhPZih0aGlzLmdldEluZGV4KGlkKSkgPT09IC0xO1xuICAgICAgfSxcbiAgICAgIG1vdmVEb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gY2VsbHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbChpZCk7XG4gICAgICAgICAgICBjZWxsc1tpbmRleF0gPSB0aGlzLmdldENlbGxBdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICAgICAgICBjZWxsc1tpbmRleCArIDFdID0gY2VsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICB9LFxuICAgICAgdW5kb2FibGVEZWxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRlbGV0ZVVuZG8gPSB7XG4gICAgICAgICAgICB0eXBlOiAnc2luZ2xlJyxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmdldEluZGV4KGlkKSxcbiAgICAgICAgICAgIGNlbGw6IHRoaXMuZ2V0Q2VsbChpZClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGUoaWQpO1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24oaWQsIHVuZG9hYmxlKSB7XG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgY2VsbCxcbiAgICAgICAgLy8gbm90ZSB0aGF0IGlmIHRoaXMgaXMgYSBzZWN0aW9uLCBpdHMgZGVzY2VuZGFudHMgYXJlIG5vdCBkZWxldGVkLlxuICAgICAgICAvLyB0byBkZWxldGUgYSBzZWNpdG9uIHdpdGggYWxsIGl0cyBkZXNjZW5kYW50cyB1c2UgZGVsZXRlU2VjdGlvbiBpbnN0ZWFkLlxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHZhciBkZWxldGVkID0gY2VsbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBpZiAodW5kb2FibGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHVuZG9BY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2VsZi5pbnNlcnRBdChpbmRleCwgZGVsZXRlZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZWRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmVkb0FjdGlvbjIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsZXRlU2VjdGlvbjogZnVuY3Rpb24oaWQsIHVuZG9hYmxlKSB7XG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgc2VjdGlvbiBjZWxsIGFzIHdlbGwgYXMgYWxsIGl0cyBkZXNjZW5kYW50c1xuICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbChpZCk7XG4gICAgICAgIGlmICghY2VsbCkge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsLnR5cGUgIT09ICdzZWN0aW9uJykge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIGlzIG5vdCBhIHNlY3Rpb24gY2VsbCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIHZhciBkZXNjZW5kYW50cyA9IHRoaXMuZ2V0QWxsRGVzY2VuZGFudHMoaWQpO1xuICAgICAgICB2YXIgZGVsZXRlZCA9IGNlbGxzLnNwbGljZShpbmRleCwgZGVzY2VuZGFudHMubGVuZ3RoICsgMSk7XG4gICAgICAgIGlmICh1bmRvYWJsZSkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICB1bmRvQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmluc2VydEF0KGluZGV4LCBkZWxldGVkLCB0cnVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHVuZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVkb0FjdGlvbjIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCwgZGVzY2VuZGFudHMubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlbGV0ZWQ7XG4gICAgICB9LFxuICAgICAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh1bmRvQWN0aW9uKSB7XG4gICAgICAgICAgdW5kb0FjdGlvbi5hcHBseSgpO1xuICAgICAgICAgIHJlZG9BY3Rpb24gPSByZWRvQWN0aW9uMjtcbiAgICAgICAgICByZWRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZG9BY3Rpb247XG4gICAgICAgICAgdW5kb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gdW5kbycpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVkbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZWRvQWN0aW9uKSB7XG4gICAgICAgICAgcmVkb0FjdGlvbi5hcHBseSgpO1xuICAgICAgICAgIHJlZG9BY3Rpb24yID0gcmVkb0FjdGlvbjtcbiAgICAgICAgICB1bmRvQWN0aW9uID0gdW5kb0FjdGlvbjI7XG4gICAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVkb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gcmVkbycpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsZXRlQWxsT3V0cHV0Q2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY2VsbHMpIHtcbiAgICAgICAgICBfLmVhY2goY2VsbHMsIGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIGlmIChjZWxsLm91dHB1dCkge1xuICAgICAgICAgICAgICBjZWxsLm91dHB1dC5yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkdW1wRGlzcGxheVN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjZWxscykge1xuICAgICAgICAgIF8uZWFjaChjZWxscywgZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgaWYgKGNlbGwub3V0cHV0KSB7XG4gICAgICAgICAgICAgIGNlbGwub3V0cHV0LnN0YXRlID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaGlmdFNlZ21lbnQ6IGZ1bmN0aW9uKHNlZ0JlZ2luLCBzZWdMZW5ndGgsIG9mZnNldCkge1xuICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgZnVuY3Rpb24gc2hpZnRzIGEgY29udGludW91cyBzZXF1ZW5jZSBvZiBjZWxsc1xuICAgICAgICBpZiAoc2VnQmVnaW4gKyBvZmZzZXQgPCAwIHx8IHNlZ0JlZ2luICsgc2VnTGVuZ3RoIC0gMSArIG9mZnNldCA+PSBjZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyAnSWxsZWdhbCBzaGlmdGluZywgcmVzdWx0IHdvdWxkIGJlIG91dCBvZiBib3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNsaWNlMSA9IGNlbGxzLnNsaWNlKDAsIHNlZ0JlZ2luKTtcbiAgICAgICAgdmFyIHNsaWNlMiA9IGNlbGxzLnNsaWNlKHNlZ0JlZ2luLCBzZWdCZWdpbiArIHNlZ0xlbmd0aCk7XG4gICAgICAgIHZhciBzbGljZTMgPSBjZWxscy5zbGljZShzZWdCZWdpbiArIHNlZ0xlbmd0aCk7XG4gICAgICAgIHZhciB0b0JlTW92ZWQ7XG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgLy8gbW92aW5nIGZyb20gc2xpY2UgMyB0byBzbGljZSAxXG4gICAgICAgICAgdG9CZU1vdmVkID0gc2xpY2UzLnNwbGljZSgwLCBvZmZzZXQpO1xuICAgICAgICAgIHNsaWNlMSA9IHNsaWNlMS5jb25jYXQodG9CZU1vdmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtb3ZpbmcgZnJvbSBzbGljZSAxIHRvIHNsaWNlIDNcbiAgICAgICAgICB0b0JlTW92ZWQgPSBzbGljZTEuc3BsaWNlKHNsaWNlMS5sZW5ndGggKyBvZmZzZXQsIC1vZmZzZXQpO1xuICAgICAgICAgIHNsaWNlMyA9IHRvQmVNb3ZlZC5jb25jYXQoc2xpY2UzKTtcbiAgICAgICAgfVxuICAgICAgICByZXBsYWNlV2hvbGVBcnJheShjZWxscywgXy5mbGF0dGVuKFtzbGljZTEsIHNsaWNlMiwgc2xpY2UzXSkpO1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgIH0sXG4gICAgICBnZXRQcmV2U2libGluZzogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucGFyZW50O1xuICAgICAgICBpZiAoIXBhcmVudElkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpYmxpbmdJZHMgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKHBhcmVudElkKS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIG15SW5kZXhBbW9uZ1NpYmxpbmdzID0gc2libGluZ0lkcy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKG15SW5kZXhBbW9uZ1NpYmxpbmdzID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChzaWJsaW5nSWRzW215SW5kZXhBbW9uZ1NpYmxpbmdzIC0gMV0pO1xuICAgICAgfSxcbiAgICAgIGdldE5leHRTaWJsaW5nOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgcGFyZW50SWQgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5wYXJlbnQ7XG4gICAgICAgIGlmICghcGFyZW50SWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2libGluZ0lkcyA9IHRoaXMuX2dldERlY29yYXRlZENlbGwocGFyZW50SWQpLmNoaWxkcmVuO1xuICAgICAgICB2YXIgbXlJbmRleEFtb25nU2libGluZ3MgPSBzaWJsaW5nSWRzLmluZGV4T2YoaWQpO1xuICAgICAgICBpZiAobXlJbmRleEFtb25nU2libGluZ3MgPT09IHNpYmxpbmdJZHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoc2libGluZ0lkc1tteUluZGV4QW1vbmdTaWJsaW5ncyArIDFdKTtcbiAgICAgIH0sXG4gICAgICBpc1Bvc3NpYmxlVG9Nb3ZlU2VjdGlvblVwOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldFByZXZTaWJsaW5nKGlkKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlU2VjdGlvblVwOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuZ2V0U2VjdGlvbkxlbmd0aChpZCk7XG4gICAgICAgIHZhciBwcmV2U2liID0gdGhpcy5nZXRQcmV2U2libGluZyhpZCk7XG4gICAgICAgIGlmICghcHJldlNpYikge1xuICAgICAgICAgIHRocm93ICdDYW5ub3QgbW92ZSBzZWN0aW9uIHVwJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldlNpYklkID0gcHJldlNpYi5pZDtcbiAgICAgICAgdmFyIG9mZnNldCA9IC0xICogdGhpcy5nZXRTZWN0aW9uTGVuZ3RoKHByZXZTaWJJZCk7XG4gICAgICAgIHRoaXMuc2hpZnRTZWdtZW50KGluZGV4LCBsZW5ndGgsIG9mZnNldCk7XG4gICAgICB9LFxuICAgICAgaXNQb3NzaWJsZVRvTW92ZVNlY3Rpb25Eb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldE5leHRTaWJsaW5nKGlkKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlU2VjdGlvbkRvd246IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBuZXh0U2liID0gdGhpcy5nZXROZXh0U2libGluZyhpZCk7XG4gICAgICAgIGlmICghbmV4dFNpYikge1xuICAgICAgICAgIHRocm93ICdDYW5ub3QgbW92ZSBzZWN0aW9uIGRvd24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW92ZVNlY3Rpb25VcChuZXh0U2liLmlkKTtcbiAgICAgIH0sXG4gICAgICBnZXRTZWN0aW9uTGVuZ3RoOiBmdW5jdGlvbihpZCkge1xuICAgICAgICAvLyB0aGUgY2VsbCBpdHNlbGYgcGx1cyBhbGwgZGVzY2VuZGFudHNcbiAgICAgICAgcmV0dXJuIDEgKyB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5hbGxEZXNjZW5kYW50cy5sZW5ndGg7XG4gICAgICB9LFxuXG4gICAgICAvLyBUaGUgZm9sbG93aW5nIGhhcyBub3QgYmVlbiB1bml0IHRlc3RlZFxuICAgICAgZ2V0TmV4dDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gY2VsbHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGxBdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICB9LFxuICAgICAgZ2V0UHJldjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGxBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICB9LFxuICAgICAgaXNDb250YWluZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBpZCA9PT0gJ3Jvb3QnIHx8ICEhdGhpcy5nZXRDZWxsKGlkKS5sZXZlbDtcbiAgICAgIH0sXG4gICAgICBpc0VtcHR5OiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuYWxsRGVzY2VuZGFudHMubGVuZ3RoID09PSAwO1xuICAgICAgfSxcbiAgICAgIGlzTGFzdDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKF8uaXNFbXB0eShjZWxscykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8ubGFzdChjZWxscykuaWQgPT09IGlkO1xuICAgICAgfSxcbiAgICAgIGFwcGVuZEFmdGVyOiBmdW5jdGlvbihpZCwgY2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc0NvbnRhaW5lcihpZCkgJiYgIXRoaXMuaXNFbXB0eShpZCkpIHtcbiAgICAgICAgICAvLyBhZGQgdG8gdGFpbFxuICAgICAgICAgIHZhciBkZXNjZW5kYW50cyA9IHRoaXMuZ2V0QWxsRGVzY2VuZGFudHMoaWQpO1xuICAgICAgICAgIHRoaXMuaW5zZXJ0QWZ0ZXIoZGVzY2VuZGFudHNbZGVzY2VuZGFudHMubGVuZ3RoIC0gMV0uaWQsIHRoaXMuY2xpcGJvYXJkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhcHBlbmQgYWZ0ZXJcbiAgICAgICAgICB0aGlzLmluc2VydEFmdGVyKGlkLCBjZWxsKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEluaXRpYWxpemF0aW9uQ2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwLmluaXRpYWxpemF0aW9uO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxzV2l0aEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgIHJldHVybiB0YWdNYXAuZXZhbHVhdG9yW2V2YWx1YXRvcl07XG4gICAgICB9LFxuICAgICAgaGFzVXNlclRhZzogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwLnVzZXJ0YWdzW3RdICE9PSB1bmRlZmluZWQ7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbHNXaXRoVXNlclRhZzogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwLnVzZXJ0YWdzW3RdO1xuICAgICAgfSxcbiAgICAgIGNsaXBib2FyZDogbnVsbCxcbiAgICAgIGN1dDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xpcGJvYXJkKSB7XG4gICAgICAgICAgdGhpcy5kZWxldGUodGhpcy5jbGlwYm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpcGJvYXJkID0gdGhpcy5nZXRDZWxsKGlkKTtcbiAgICAgICAgdGhpcy5kZWxldGUoaWQpO1xuICAgICAgfSxcbiAgICAgIHBhc3RlOiBmdW5jdGlvbihkZXN0aW5hdGlvbklkKSB7XG4gICAgICAgIGlmICh0aGlzLmNsaXBib2FyZCkge1xuICAgICAgICAgIHRoaXMuYXBwZW5kQWZ0ZXIoZGVzdGluYXRpb25JZCwgdGhpcy5jbGlwYm9hcmQpO1xuICAgICAgICAgIHRoaXMuY2xpcGJvYXJkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhblNldFVzZXJUYWdzOiBmdW5jdGlvbih0YWdzKSB7XG4gICAgICAgIHZhciByZSA9IC9cXHMrLztcbiAgICAgICAgaWYgKHRhZ3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciB0Z3MgPSB0YWdzLnNwbGl0KHJlKTtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2VsbE1hcFt0Z3NbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFUlJPUjogVGhlIG5hbWUgXCInICsgdGdzW2ldICsgJ1wiIGlzIGFscmVhZHkgdXNlZCBhcyBhIGNlbGwgbmFtZS4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LFxuICAgICAgY2FuUmVuYW1lQ2VsbDogZnVuY3Rpb24obmV3aWQpIHtcbiAgICAgICAgaWYgKGNlbGxNYXBbbmV3aWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gJ0VSUk9SOiBDZWxsIFwiJyArIG5ld2lkICsgJ1wiIGFscmVhZHkgZXhpc3RzLic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhZ01hcC51c2VydGFnc1tuZXdpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiAnRVJST1I6IFRoZSBuYW1lIFwiJyArIG5ld2lkICsgJ1wiIGlzIGFscmVhZHkgdXNlZCBhcyBhIHRhZy4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0sXG4gICAgICByZW5hbWVDZWxsOiBmdW5jdGlvbihvbGRpZCwgbmV3aWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuUmVuYW1lQ2VsbChuZXdpZCkgIT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZHggPSB0aGlzLmdldEluZGV4KG9sZGlkKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgY2VsbHNbaWR4XS5pZCA9IG5ld2lkO1xuICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVidWlsZE1hcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsubm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcImJrLm5vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyXCIsIFtdKTtcblxuICBtb2R1bGUuZmFjdG9yeShcImJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zdWJzY3JpcHRpb25zID0ge307XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNlc3Npb25JZCwgbm90ZWJvb2tNb2RlbCkge1xuICAgICAgICBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdID1cbiAgICAgICAgICAkLmNvbWV0ZC5zdWJzY3JpYmUoXCIvbmFtZXNwYWNlL1wiICsgc2Vzc2lvbklkLCBmdW5jdGlvbihyZXBseSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSByZXBseS5kYXRhLm5hbWU7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSByZXBseS5kYXRhLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHN5bmMgPSByZXBseS5kYXRhLnN5bmM7XG4gICAgICAgICAgICB2YXIgbmFtZXNwYWNlID0gbm90ZWJvb2tNb2RlbC5uYW1lc3BhY2U7XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBzeW5jKSB7XG4gICAgICAgICAgICAgIHZhciByZXBseTIgPSB7bmFtZTogbmFtZSwgZGVmaW5lZDogZmFsc2UsIHNlc3Npb246IHNlc3Npb25JZH07XG4gICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgIHZhciByZWFkVmFsdWUgPSBuYW1lc3BhY2VbbmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gcmVhZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSByZWFkVmFsdWU7XG4gICAgICAgICAgICAgICAgICByZXBseTIuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9uYW1lc3BhY2UvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwubmFtZXNwYWNlID0ge307XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gbm90ZWJvb2tNb2RlbC5uYW1lc3BhY2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmFtZXNwYWNlW25hbWVdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzeW5jKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGx5MiA9IHtuYW1lOiBuYW1lLCBzZXNzaW9uOiBzZXNzaW9uSWR9O1xuICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9uYW1lc3BhY2UvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNsZWFyOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgaWYgKHNlc3Npb25JZCkge1xuICAgICAgICAgICQuY29tZXRkLnVuc3Vic2NyaWJlKF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF0pO1xuICAgICAgICAgIGRlbGV0ZSBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuc2Vzc2lvbk1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuc2Vzc2lvbk1hbmFnZXInLFtcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5zZXNzaW9uJyxcbiAgICAnYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyJyxcbiAgICAnYmsubm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXInLFxuICAgICdiay5yZWNlbnRNZW51JyxcbiAgICAnYmsuZXZhbHVhdG9yTWFuYWdlcidcbiAgXSk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrU2Vzc2lvbk1hbmFnZXInLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia1Nlc3Npb24sXG4gICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia1JlY2VudE1lbnUpIHtcblxuICAgIHZhciBJbWFnZUljb24gPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEudHlwZSAhPT0gXCJJbWFnZUljb25cIikge1xuICAgICAgICB0aGlzLmltYWdlRGF0YSA9IFtdO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbWFnZURhdGEgPSBkYXRhLmltYWdlRGF0YTtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBEYXRhRnJhbWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEudHlwZSAhPT0gXCJUYWJsZURpc3BsYXlcIiB8fCBkYXRhLnN1YnR5cGUgIT09IFwiVGFibGVEaXNwbGF5XCIpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5OYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLnR5cGVzID0gW107XG4gICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbk5hbWVzID0gZGF0YS5jb2x1bW5OYW1lcy5zbGljZSgwKTtcbiAgICAgICAgdGhpcy50eXBlcyA9IGRhdGEudHlwZXMuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgIGZvciAodmFyIGogaW4gZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICB2YXIgdmFscyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YS52YWx1ZXNbal0pIHtcbiAgICAgICAgICAgIHZhbHMucHVzaCggdHJhbnNmb3JtQmFjayhkYXRhLnZhbHVlc1tqXVtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKHZhbHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzID0gJyc7XG4gICAgICBzID0gJ0RhdGFGcmFtZTonK1xuICAgICAgICAnICBSb3dzOiAnK3RoaXMudmFsdWVzLmxlbmd0aCsnXFxuJyArXG4gICAgICAgICcgIERhdGEgY29sdW1ucyAodG90YWwgJyt0aGlzLmNvbHVtbk5hbWVzLmxlbmd0aCsnIGNvbHVtbnMpOlxcbic7XG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMuY29sdW1uTmFtZXMpIHtcbiAgICAgICAgcyA9IHMgKyAnICAgICcrdGhpcy5jb2x1bW5OYW1lc1tpXSsnICAgJyt0aGlzLnR5cGVzW2ldKydcXG4nO1xuICAgICAgfVxuICAgICAgO1xuICAgICAgcmV0dXJuIHM7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuY29sdW1ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sdW1uTmFtZXM7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuZHR5cGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50eXBlcztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5nZXRDb2x1bW4gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgaSA9IHRoaXMuY29sdW1uTmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIHZhciBvID0gW107XG4gICAgICBmb3IgKHZhciBqIGluIHRoaXMudmFsdWVzKSB7XG4gICAgICAgIG8ucHVzaCh0aGlzLnZhbHVlc1tqXVtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5nZXRSb3cgPSBmdW5jdGlvbihpKSB7XG4gICAgICBpZiAoaSA8IDAgfHwgaSA+IHRoaXMudmFsdWVzLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgbyA9IHt9O1xuICAgICAgZm9yICh2YXIgaiBpbiB0aGlzLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgIG9bdGhpcy5jb2x1bW5OYW1lc1tqXV0gPSB0aGlzLnZhbHVlc1tpXVtqXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5yZW1vdmVDb2x1bW4gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgaSA9IHRoaXMuY29sdW1uTmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKHZhciBqIGluIHRoaXMudmFsdWVzKSB7XG4gICAgICAgIHRoaXMudmFsdWVzW2pdLnNwbGljZShpLDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb2x1bW5OYW1lcy5zcGxpY2UoaSwxKTtcbiAgICAgIHRoaXMudHlwZXMuc3BsaWNlKGksMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5hZGRDb2x1bW4gPSBmdW5jdGlvbihuYW1lLCBkYXRhLCB0eXBlKSB7XG4gICAgICB2YXIgaSA9IHRoaXMuY29sdW1uTmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpID49IDAgfHwgZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgdGhpcy5jb2x1bW5OYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy50eXBlcy5wdXNoKCh0eXBlID09PSB1bmRlZmluZWQpID8gZ2V0RGF0YVR5cGUoZGF0YVswXSkgOiB0eXBlKTtcbiAgICAgIHZhciBtaW4gPSAoZGF0YS5sZW5ndGggPiB0aGlzLnZhbHVlcy5sZW5ndGgpID8gdGhpcy52YWx1ZXMubGVuZ3RoIDogZGF0YS5sZW5ndGg7XG4gICAgICB2YXIgajtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBtaW47IGorKykge1xuICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKGRhdGFbal0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA+IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoOyBqIDwgdGhpcy52YWx1ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKFtdKTtcbiAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29sdW1uTmFtZXMubGVuZ3RoIC0gMTsgaysrKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKGRhdGFbal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5hZGRSb3cgPSBmdW5jdGlvbihyb3cpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IodmFyIGMgaW4gdGhpcy5jb2x1bW5OYW1lcykge1xuICAgICAgICBpZiAocm93W3RoaXMuY29sdW1uTmFtZXNbY11dICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgci5wdXNoKHJvd1t0aGlzLmNvbHVtbk5hbWVzW2NdXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByLnB1c2gobnVsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlcy5wdXNoKHIpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZVR5cGUodikge1xuICAgICAgaWYgKF8uaXNEYXRlKHYpIHx8IF8uaXNTdHJpbmcodikgfHwgXy5pc051bWJlcih2KSB8fCBfLmlzQm9vbGVhbih2KSB8fCBfLmlzTmFOKHYpIHx8IF8uaXNOdWxsKHYpIHx8IF8uaXNVbmRlZmluZWQodikpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhVHlwZSh2KSB7XG4gICAgICBpZiAoXy5pc0RhdGUodikpXG4gICAgICAgIHJldHVybiBcInRpbWVcIjtcbiAgICAgIGlmKF8uaXNOdW1iZXIodikpIC8vIGNhbiB3ZSBkbyBhIGJldHRlciBqb2IgaGVyZT9cbiAgICAgICAgcmV0dXJuIFwiZG91YmxlXCI7XG4gICAgICBpZihfLmlzQm9vbGVhbih2KSlcbiAgICAgICAgcmV0dXJuIFwiYm9vbGVhblwiO1xuICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzRGljdGlvbmFyeSh2KSB7XG4gICAgICBpZiAoIV8uaXNPYmplY3QodikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIGZvcih2YXIgaSBpbiB2KSB7XG4gICAgICAgIGlmICghaXNQcmltaXRpdmVUeXBlKHZbaV0pKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm0odiwgbm9yZWN1cnNlKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKHYpIHx8IF8uaXNVbmRlZmluZWQodikpXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBpZiAoXy5pc0RhdGUodikpIHtcbiAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICBvLnR5cGUgPSBcIkRhdGVcIjtcbiAgICAgICAgby50aW1lc3RhbXAgPSB2LnZhbHVlT2YoKTtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgIH1cblxuICAgICAgaWYgKGlzUHJpbWl0aXZlVHlwZSh2KSlcbiAgICAgICAgcmV0dXJuIHY7XG5cbiAgICAgIGlmICh2IGluc3RhbmNlb2YgSW1hZ2VJY29uICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJJbWFnZUljb25cIjtcbiAgICAgICAgby5pbWFnZURhdGEgPSB2LmltYWdlRGF0YTtcbiAgICAgICAgby53aWR0aCA9IHYud2lkdGg7XG4gICAgICAgIG8uaGVpZ2h0ID0gdi5oZWlnaHQ7XG4gICAgICAgIHJldHVybiBvXG4gICAgICB9XG5cbiAgICAgIGlmICh2IGluc3RhbmNlb2YgRGF0YUZyYW1lICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgby5zdWJ0eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgby52YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2LnZhbHVlcykge1xuICAgICAgICAgIHZhciByb3cgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBqIGluIHYudmFsdWVzW2ldKSB7XG4gICAgICAgICAgICByb3cucHVzaCh0cmFuc2Zvcm0odi52YWx1ZXNbaV1bal0sIHRydWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgby52YWx1ZXMucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIG8udHlwZXMgPSBfLmlzQXJyYXkodi50eXBlcykgPyB2LnR5cGVzLnNsaWNlKDApIDogdW5kZWZpbmVkO1xuICAgICAgICBvLmNvbHVtbk5hbWVzID0gXy5pc0FycmF5KHYuY29sdW1uTmFtZXMpID8gdi5jb2x1bW5OYW1lcy5zbGljZSgwKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgIH1cblxuICAgICAgaWYgKF8uaXNBcnJheSh2KSAmJiB2Lmxlbmd0aD4wKSB7XG4gICAgICAgIHZhciBkb2l0ID0gdHJ1ZTtcbiAgICAgICAgZm9yKHZhciByIGluIHYpIHtcbiAgICAgICAgICBpZiAoIV8uaXNBcnJheSh2W3JdKSkge1xuICAgICAgICAgICAgZG9pdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGMgaW4gKHZbcl0pKSB7XG4gICAgICAgICAgICBpZiAoIWlzUHJpbWl0aXZlVHlwZSh2W3JdW2NdKSkge1xuICAgICAgICAgICAgICBkb2l0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9pdCAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciBvID0ge31cbiAgICAgICAgICBvLnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICAgIG8udmFsdWVzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtIGluIHZbaV0pXG4gICAgICAgICAgICAgIHJvdy5wdXNoKHRyYW5zZm9ybSh2W2ldW2l0ZW1dLCB0cnVlKSk7XG4gICAgICAgICAgICBvLnZhbHVlcy5wdXNoKHJvdyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG8uc3VidHlwZSA9IFwiTWF0cml4XCI7XG4gICAgICAgICAgby5jb2x1bW5OYW1lcyA9IFtdO1xuICAgICAgICAgIG8udHlwZXMgPSBbXTtcbiAgICAgICAgICBmb3IodmFyIGkgaW4gdlswXSkge1xuICAgICAgICAgICAgby5jb2x1bW5OYW1lcy5wdXNoKCdjJytpKTtcbiAgICAgICAgICAgIG8udHlwZXMucHVzaChnZXREYXRhVHlwZSh2WzBdW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvaXQgPSB0cnVlO1xuICAgICAgICAgIGZvcih2YXIgciBpbiB2KSB7XG4gICAgICAgICAgICBpZiAoIWlzRGljdGlvbmFyeSh2W3JdKSkge1xuICAgICAgICAgICAgICBkb2l0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZG9pdCAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgICAgIG8udHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgICAgICBvLnN1YnR5cGUgPSBcIkxpc3RPZk1hcHNcIjtcbiAgICAgICAgICAgIG8uY29sdW1uTmFtZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdikge1xuICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIHZbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoby5jb2x1bW5OYW1lcy5pbmRleE9mKGopPDApXG4gICAgICAgICAgICAgICAgICBvLmNvbHVtbk5hbWVzLnB1c2goaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8udmFsdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICAgICAgdmFyIG8yID0gW107XG4gICAgICAgICAgICAgIGZvciAodmFyIGogaW4gby5jb2x1bW5OYW1lcykge1xuICAgICAgICAgICAgICAgIHZhciBuID0gby5jb2x1bW5OYW1lc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAodltpXVtuXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgbzIucHVzaCh0cmFuc2Zvcm0odltpXVtuXSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIG8yLnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgby52YWx1ZXMucHVzaChvMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnR5cGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqIGluIG8uY29sdW1uTmFtZXMpIHtcbiAgICAgICAgICAgICAgdmFyIG4gPSBvLmNvbHVtbk5hbWVzW2pdO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodltpXVtuXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBvLnR5cGVzLnB1c2goZ2V0RGF0YVR5cGUodltpXVtuXSkpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKF8uaXNBcnJheSh2KSkge1xuICAgICAgICB2YXIgbyA9IFtdO1xuICAgICAgICBmb3IodmFyIHAgaW4gdikge1xuICAgICAgICAgIG8ucHVzaCh0cmFuc2Zvcm0odltwXSwgdHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfVxuXG4gICAgICBpZiAoXy5pc09iamVjdCh2KSAmJiBpc0RpY3Rpb25hcnkodikgJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICBvLnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICBvLnZhbHVlcyA9IFtdO1xuICAgICAgICBvLnN1YnR5cGUgPSBcIkRpY3Rpb25hcnlcIjtcbiAgICAgICAgby5jb2x1bW5OYW1lcz0gWydLZXknLCdWYWx1ZSddO1xuICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICB2YXIgciA9IFtdO1xuICAgICAgICAgIHIucHVzaChpKTtcbiAgICAgICAgICByLnB1c2godHJhbnNmb3JtKHZbaV0sdHJ1ZSkpO1xuICAgICAgICAgIG8udmFsdWVzLnB1c2gocik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG87XG4gICAgICB9XG4gICAgICB2YXIgbyA9IHt9O1xuICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgb1twXSA9IHRyYW5zZm9ybSh2W3BdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1CYWNrKHYpIHtcbiAgICAgIGlmKHYgPT09IHVuZGVmaW5lZCB8fCAoIV8uaXNPYmplY3QodikgJiYgIV8uaXNBcnJheSh2KSkpXG4gICAgICAgIHJldHVybiB2O1xuXG4gICAgICBpZiAodi50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHYudHlwZSA9PT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IERhdGUodi50aW1lc3RhbXApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2LnR5cGUgPT09IFwiVGFibGVEaXNwbGF5XCIpIHtcbiAgICAgICAgICBpZiAodi5zdWJ0eXBlID09PSBcIkRpY3Rpb25hcnlcIikge1xuICAgICAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICAgICAgZm9yICh2YXIgciBpbiB2LnZhbHVlcykge1xuICAgICAgICAgICAgICBvW3YudmFsdWVzW3JdWzBdXSA9IHRyYW5zZm9ybUJhY2sodi52YWx1ZXNbcl1bMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2LnN1YnR5cGUgPT09IFwiTWF0cml4XCIpIHtcbiAgICAgICAgICAgIHZhciBvID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHYudmFsdWVzKSB7XG4gICAgICAgICAgICAgIG8ucHVzaCh2LnZhbHVlc1tpXS5zbGljZSgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHYuc3VidHlwZSA9PT0gXCJMaXN0T2ZNYXBzXCIpIHtcbiAgICAgICAgICAgIHZhciBvdXQyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciByIGluIHYudmFsdWVzKSB7XG4gICAgICAgICAgICAgIHZhciBvdXQzID0geyB9O1xuICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8di52YWx1ZXNbcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodi52YWx1ZXNbcl1baV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICBvdXQzWyB2LmNvbHVtbk5hbWVzW2ldIF0gPSB0cmFuc2Zvcm1CYWNrKHYudmFsdWVzW3JdW2ldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvdXQyLnB1c2gob3V0Myk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3V0MjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG91dCA9IG5ldyBEYXRhRnJhbWUodik7XG4gICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodi50eXBlID09PSBcIkltYWdlSWNvblwiKVxuICAgICAgICAgIHJldHVybiBuZXcgSW1hZ2VJY29uKHYpO1xuICAgICAgfVxuICAgICAgaWYgKCFfLmlzQXJyYXkodikpIHtcbiAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgICBvW3BdID0gdHJhbnNmb3JtQmFjayh2W3BdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICAgIH1cbiAgICAgIHZhciBvID0gW107XG4gICAgICBmb3IodmFyIHAgaW4gdikge1xuICAgICAgICBvLnB1c2godHJhbnNmb3JtQmFjayh2W3BdKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG5cbiAgICB2YXIgX25vdGVib29rVXJpID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIERFRkFVTFRfVkFMVUUgPSBudWxsO1xuICAgICAgdmFyIF92ID0gREVGQVVMVF9WQUxVRTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLnNldChERUZBVUxUX1ZBTFVFKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3Y7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgIF92ID0gdjtcbiAgICAgICAgICBpZiAoIV8uaXNFbXB0eShfdikpIHtcbiAgICAgICAgICAgIGJrUmVjZW50TWVudS5yZWNvcmRSZWNlbnREb2N1bWVudChnZW5lcmF0ZVJlY2VudERvY3VtZW50SXRlbSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHZhciBfdXJpVHlwZSA9IG51bGw7XG4gICAgdmFyIF9yZWFkT25seSA9IG51bGw7XG4gICAgdmFyIF9mb3JtYXQgPSBudWxsO1xuICAgIHZhciBfc2Vzc2lvbklkID0gbnVsbDtcbiAgICB2YXIgX2VkaXRlZCA9IGZhbHNlO1xuICAgIHZhciBfbmVlZHNCYWNrdXAgPSBmYWxzZTtcblxuICAgIHZhciBCZWFrZXJPYmplY3QgPSBmdW5jdGlvbihuYm1vZGVsKSB7XG4gICAgICB0aGlzLmtub3duQmVha2VyVmFycyA9IHsgfTtcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG4gICAgICB0aGlzLnNldENhY2hlID0geyB9O1xuICAgICAgdGhpcy5iZWFrZXJPYmogPSB7IH1cbiAgICAgIHRoaXMubmJtb2RlbCA9IG5ibW9kZWw7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuc2V0dXBCZWFrZXJPYmplY3QgPSBmdW5jdGlvbihtb2RlbE91dHB1dCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5iZWFrZXJPYmouc2hvd1Byb2dyZXNzVXBkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2hvd1Byb2dyZXNzVXBkYXRlJywgeyB2YWx1ZTogZnVuY3Rpb24gKGEsYixjKSB7XG4gICAgICAgICAgaWYgKCBhID09PSB1bmRlZmluZWQgfHwgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBpZiAoIHR5cGVvZiBhID09PSAnc3RyaW5nJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QubWVzc2FnZSA9IGE7XG4gICAgICAgICAgZWxzZSBpZiAoIHR5cGVvZiBhID09PSAnbnVtYmVyJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgPSBhO1xuICAgICAgICAgIGVsc2UgaWYgKCBhICE9PSBudWxsIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wYXlsb2FkID0gYTtcblxuICAgICAgICAgIGlmICggdHlwZW9mIGIgPT09ICdzdHJpbmcnIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gYjtcbiAgICAgICAgICBlbHNlIGlmICggdHlwZW9mIGIgPT09ICdudW1iZXInIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wcm9ncmVzc0JhciA9IGI7XG4gICAgICAgICAgZWxzZSBpZiAoIGIgIT09IG51bGwgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnBheWxvYWQgPSBiO1xuXG4gICAgICAgICAgaWYgKCB0eXBlb2YgYyA9PT0gJ3N0cmluZycgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgPSBjO1xuICAgICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgYyA9PT0gJ251bWJlcicgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnByb2dyZXNzQmFyID0gYztcbiAgICAgICAgICBlbHNlIGlmICggYyAhPT0gbnVsbCApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucGF5bG9hZCA9IGM7XG4gICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2hvd1N0YXR1cycsIHsgdmFsdWU6IGJrSGVscGVyLnNob3dTdGF0dXMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2NsZWFyU3RhdHVzJywgeyB2YWx1ZTogYmtIZWxwZXIuY2xlYXJTdGF0dXMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3Nob3dUcmFuc2llbnRTdGF0dXMnLCB7IHZhbHVlOiBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdnZXRFdmFsdWF0b3JzJywgeyB2YWx1ZTogYmtIZWxwZXIuZ2V0RXZhbHVhdG9ycywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZ2V0Q29kZUNlbGxzJywgeyB2YWx1ZTogYmtIZWxwZXIuZ2V0Q29kZUNlbGxzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzZXRDb2RlQ2VsbEJvZHknLCB7IHZhbHVlOiBia0hlbHBlci5zZXRDb2RlQ2VsbEJvZHksIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3NldENvZGVDZWxsRXZhbHVhdG9yJywgeyB2YWx1ZTogYmtIZWxwZXIuc2V0Q29kZUNlbGxFdmFsdWF0b3IsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3NldENvZGVDZWxsVGFncycsIHsgdmFsdWU6IGJrSGVscGVyLnNldENvZGVDZWxsVGFncywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZXZhbHVhdGUnLCB7IHZhbHVlOiBmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGJrSGVscGVyLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBzZWxmLmJlYWtlck9iamVjdFRvTm90ZWJvb2soKTtcbiAgICAgICAgICAgIGJrSGVscGVyLmV2YWx1YXRlKGEpLnRoZW4oZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVzb2x2ZSh0cmFuc2Zvcm1CYWNrKHIpKTsgfSwgZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVqZWN0KHIpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBkLnByb21pc2U7XG4gICAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZXZhbHVhdGVDb2RlJywgeyB2YWx1ZTogZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgdmFyIGQgPSBia0hlbHBlci5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgc2VsZi5iZWFrZXJPYmplY3RUb05vdGVib29rKCk7XG4gICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZUNvZGUoYSxiKS50aGVuKGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlc29sdmUodHJhbnNmb3JtQmFjayhyKSk7IH0sIGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlamVjdChyKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gZC5wcm9taXNlO1xuICAgICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3ByaW50Jywge3ZhbHVlOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICAgIGJrSGVscGVyLnJlY2VpdmVFdmFsdWF0aW9uVXBkYXRlKHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge291dHB1dGRhdGE6W3t0eXBlOidvdXQnLCB2YWx1ZTogaW5wdXQrXCJcXG5cIn1dfSwgXCJKYXZhU2NyaXB0XCIpO1xuICAgICAgICAgIC8vIFhYWCBzaG91bGQgbm90IGJlIG5lZWRlZCBidXQgd2hlbiBwcm9ncmVzcyBtZXRlciBpcyBzaG93biBhdCBzYW1lIHRpbWVcbiAgICAgICAgICAvLyBkaXNwbGF5IGlzIGJyb2tlbiB3aXRob3V0IHRoaXMsIHlvdSBnZXQgXCJPVVRQVVRcIiBpbnN0ZWFkIG9mIGFueSBsaW5lcyBvZiB0ZXh0LlxuICAgICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAncHJpbnRFcnJvcicsIHt2YWx1ZTogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICBia0hlbHBlci5yZWNlaXZlRXZhbHVhdGlvblVwZGF0ZShzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvdXRwdXRkYXRhOlt7dHlwZTonZXJyJywgdmFsdWU6IGlucHV0K1wiXFxuXCJ9XX0sIFwiSmF2YVNjcmlwdFwiKTtcbiAgICAgICAgICAvLyBYWFggc2hvdWxkIG5vdCBiZSBuZWVkZWQgYnV0IHdoZW4gcHJvZ3Jlc3MgbWV0ZXIgaXMgc2hvd24gYXQgc2FtZSB0aW1lXG4gICAgICAgICAgLy8gZGlzcGxheSBpcyBicm9rZW4gd2l0aG91dCB0aGlzLCB5b3UgZ2V0IFwiT1VUUFVUXCIgaW5zdGVhZCBvZiBhbnkgbGluZXMgb2YgdGV4dC5cbiAgICAgICAgICBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2xvYWRKUycsIHsgdmFsdWU6IGJrSGVscGVyLmxvYWRKUywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnbG9hZENTUycsIHsgdmFsdWU6IGJrSGVscGVyLmxvYWRDU1MsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2xvYWRMaXN0JywgeyB2YWx1ZTogYmtIZWxwZXIubG9hZExpc3QsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2h0dHBHZXQnLCB7IHZhbHVlOiBia0hlbHBlci5odHRwR2V0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdodHRwUG9zdCcsIHsgdmFsdWU6IGJrSGVscGVyLmh0dHBQb3N0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICduZXdEZWZlcnJlZCcsIHsgdmFsdWU6IGJrSGVscGVyLm5ld0RlZmVycmVkLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICduZXdQcm9taXNlJywgeyB2YWx1ZTogYmtIZWxwZXIubmV3UHJvbWlzZSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnYWxsJywgeyB2YWx1ZTogYmtIZWxwZXIuYWxsLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICd0aW1lb3V0JywgeyB2YWx1ZTogYmtIZWxwZXIudGltZW91dCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnRGF0YUZyYW1lJywgeyB2YWx1ZTogRGF0YUZyYW1lLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdJbWFnZUljb24nLCB7IHZhbHVlOiBJbWFnZUljb24sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIHRoaXMucHJlZGVmaW5lZCA9IE9iamVjdC5rZXlzKHRoaXMuYmVha2VyT2JqKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0ID0gbW9kZWxPdXRwdXQucmVzdWx0OyAvLyBYWFggb2J2aWF0ZWQgYnkgbmV4dCBsaW5lXG4gICAgICB0aGlzLl9iZWFrZXJfbW9kZWxfb3V0cHV0ID0gbW9kZWxPdXRwdXQ7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuY2xlYXJPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdCA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5iZWFrZXJHZXR0ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAodGhpcy5zZXRDYWNoZVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldENhY2hlW25hbWVdO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0Q2FjaGVbbmFtZV0gPT09IHVuZGVmaW5lZCAmJiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZ2V0Q2FjaGVbbmFtZV0gPSB0cmFuc2Zvcm1CYWNrKHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbbmFtZV0pO1xuICAgICAgLy8gdGhpcyBpcyByZXF1aXJlZCB0byBzdXBwb3J0IHN1Ym9iamVjdCBtb2RpZmljYXRpb25cbiAgICAgIHRoaXMuc2V0Q2FjaGVbbmFtZV0gPSB0aGlzLmdldENhY2hlW25hbWVdO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVbbmFtZV07XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuYmVha2VyU2V0dGVyID0gZnVuY3Rpb24obmFtZSwgdikge1xuICAgICAgdGhpcy5zZXRDYWNoZVtuYW1lXSA9IHY7XG4gICAgICBpZiAodGhpcy5iZWFrZXJTZXR0ZXJUaW1lb3V0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJrSGVscGVyLmNhbmNlbFRpbWVvdXQodGhpcy5iZWFrZXJTZXR0ZXJUaW1lb3V0KTtcbiAgICAgIHZhciBtYWtlVGltZW91dCA9IGZ1bmN0aW9uKHNlbGYpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuYmVha2VyU2V0dGVyVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBzZWxmLmJlYWtlck9iamVjdFRvTm90ZWJvb2soKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB0aGlzLmJlYWtlclNldHRlclRpbWVvdXQgPSBia0hlbHBlci50aW1lb3V0KG1ha2VUaW1lb3V0KHRoaXMpLDUwMCk7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUubm90ZWJvb2tUb0JlYWtlck9iamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2xlYXIgZ2V0Y2FjaGVcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG5cbiAgICAgIC8vIGNoZWNrIGlmIHNvbWUgb3RoZXIgbGFuZ3VhZ2UgcmVtb3ZlZCBhIGJpbmRpbmdcbiAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5rbm93bkJlYWtlclZhcnMpIHtcbiAgICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5rbm93bkJlYWtlclZhcnNbcF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuYmVha2VyT2JqW3BdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLnNldENhY2hlW3BdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHNvbWUgb3RoZXIgbGFuZ3VhZ2UgYWRkZWQgYSBiaW5kaW5nXG4gICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSkge1xuICAgICAgICAgIHZhciB0ID0gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXTtcbiAgICAgICAgICBpZiAodGhpcy5wcmVkZWZpbmVkLmluZGV4T2YocCk+PTApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYmVha2VyT2JqW3BdO1xuICAgICAgICAgICAgdGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG1ha2VHZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHNlbGYuYmVha2VyR2V0dGVyKG5hbWUpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWFrZVNldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHsgc2VsZi5iZWFrZXJTZXR0ZXIobmFtZSx2KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCBwLFxuICAgICAgICAgICAgICAgIHsgd3JpdGVhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZ2V0OiBtYWtlR2V0dGVyKHRoaXMsIHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMsIHApLFxuICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLmJlYWtlck9iamVjdFRvTm90ZWJvb2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5iZWFrZXJPYmopO1xuICAgICAgdmFyIHN0dWZmID0gT2JqZWN0LmtleXModGhpcy5rbm93bkJlYWtlclZhcnMpO1xuICAgICAgdmFyIGRpZmYgPSAkKGtleXMpLm5vdChzdHVmZikuZ2V0KCk7XG4gICAgICBkaWZmID0gJChkaWZmKS5ub3QodGhpcy5wcmVkZWZpbmVkKS5nZXQoKTtcblxuICAgICAgLy8gY2hlY2sgaWYgamF2YXNjcmlwdCByZW1vdmVkIGEgYmluZGluZ1xuICAgICAgaWYgKCB0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSkge1xuICAgICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSAhPT0gdW5kZWZpbmVkICYmIGtleXMuaW5kZXhPZihwKSA8MCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5rbm93bkJlYWtlclZhcnNbcF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGphdmFzY3JpcHQgc2V0IGFueSBORVcgdmFyaWFibGVcbiAgICAgIGZvciAodmFyIGkgaW4gZGlmZikge1xuICAgICAgICB2YXIgcCA9IGRpZmZbaV07XG4gICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgICAgdmFyIHQgPSB0aGlzLmJlYWtlck9ialtwXTtcbiAgICAgICAgICBpZiAoKHRoaXMucHJlZGVmaW5lZC5pbmRleE9mKHApPj0wIHx8IF8uaXNGdW5jdGlvbih0KSkpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIE5PVCBwdXQgZnVuY3Rpb25zIGluIHRoZSBuYW1lc3BhY2VcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMua25vd25CZWFrZXJWYXJzW3BdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldENhY2hlW3BdID0gdDtcbiAgICAgICAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzW3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBzZWxmLmJlYWtlckdldHRlcihuYW1lKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ha2VTZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHNlbGYuYmVha2VyU2V0dGVyKG5hbWUsdik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgcCxcbiAgICAgICAgICAgICAgICB7IHdyaXRlYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGdldDogbWFrZUdldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGphdmFzY3JpcHQgc2V0IGFueSBuZXcgdmFyaWFibGVcbiAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5zZXRDYWNoZSkge1xuICAgICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgIGlmICh0aGlzLmlzQ2lyY3VsYXJPYmplY3QodGhpcy5zZXRDYWNoZVtwXSkpXG4gICAgICAgICAgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXSA9IFwiRVJST1I6IGNpcmN1bGFyIG9iamVjdHMgYXJlIG5vdCBzdXBwb3J0ZWRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF0gPSB0cmFuc2Zvcm0odGhpcy5zZXRDYWNoZVtwXSk7XG4gICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuYmVha2VyT2JqW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzW3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBzZWxmLmJlYWtlckdldHRlcihuYW1lKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ha2VTZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHNlbGYuYmVha2VyU2V0dGVyKG5hbWUsdik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgcCxcbiAgICAgICAgICAgICAgICB7IHdyaXRlYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGdldDogbWFrZUdldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNsZWFyIHNldGNhY2hlIGFuZCBnZXRjYWNoZVxuICAgICAgdGhpcy5zZXRDYWNoZSA9IHsgfTtcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5pc0NpcmN1bGFyT2JqZWN0ID0gZnVuY3Rpb24obm9kZSwgcGFyZW50cykge1xuICAgICAgcGFyZW50cyA9IHBhcmVudHMgfHwgW107XG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUgIT0gXCJvYmplY3RcIil7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBub2RlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG5vZGVba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgaWYgKHBhcmVudHMuaW5kZXhPZih2YWx1ZSk+PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5pc0NpcmN1bGFyT2JqZWN0KHZhbHVlLCBwYXJlbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwYXJlbnRzLnBvcChub2RlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gICAgdmFyIF9ibyA9IHt9O1xuXG4gICAgdmFyIF9ub3RlYm9va01vZGVsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF92ID0ge307XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5zZXQoe30pO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0QmVha2VyT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX2JvO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBfdiA9IHY7XG4gICAgICAgICAgLy8gdGhpcyByZW1vdmVzIGxlZ2FjeSBkYXRhIHByZXZpb3VzbHkgc2F2ZWRcbiAgICAgICAgICBpZiAoX3YuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfdi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaWYgKF92Lm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIC8vICBfdi5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgICAgX2JvID0gbmV3IEJlYWtlck9iamVjdChfdik7XG4gICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlci5yZXNldChbXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnJlc2V0KF92LmNlbGxzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLmlzRW1wdHkoX3YpO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICF0aGlzLmlzRW1wdHkoKSAmJiAhIV92LmxvY2tlZDtcbiAgICAgICAgfSxcbiAgICAgICAgdG9Kc29uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYW5ndWxhci50b0pzb24oX3YpO1xuICAgICAgICB9LFxuICAgICAgICB0b0NsZWFuUHJldHR5SnNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy9zdHJpcCBvdXQgdGhlIHNoZWxsIElEc1xuICAgICAgICAgIHZhciBzaGVsbElkcyA9IF8oX3YuZXZhbHVhdG9ycykubWFwKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgdmFyIHNoZWxsSWQgPSBldmFsdWF0b3Iuc2hlbGxJRDtcbiAgICAgICAgICAgIGRlbGV0ZSBldmFsdWF0b3Iuc2hlbGxJRDtcbiAgICAgICAgICAgIHJldHVybiBzaGVsbElkO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGdlbmVyYXRlIHByZXR0eSBKU09OXG4gICAgICAgICAgdmFyIHByZXR0eUpzb24gPSBia1V0aWxzLnRvUHJldHR5SnNvbihfdik7XG4gICAgICAgICAgLy8gcHV0IHRoZSBzaGVsbCBJRHMgYmFja1xuICAgICAgICAgIF8oX3YuZXZhbHVhdG9ycykuZWFjaChmdW5jdGlvbihldmFsdWF0b3IsIGluZGV4KSB7XG4gICAgICAgICAgICBldmFsdWF0b3Iuc2hlbGxJRCA9IHNoZWxsSWRzW2luZGV4XTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gcHJldHR5SnNvbjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgdmFyIGdlbmVyYXRlQmFja3VwRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm90ZWJvb2tVcmk6IF9ub3RlYm9va1VyaS5nZXQoKSxcbiAgICAgICAgdXJpVHlwZTogX3VyaVR5cGUsXG4gICAgICAgIHJlYWRPbmx5OiBfcmVhZE9ubHksXG4gICAgICAgIGZvcm1hdDogX2Zvcm1hdCxcbiAgICAgICAgbm90ZWJvb2tNb2RlbEpzb246IF9ub3RlYm9va01vZGVsLnRvSnNvbigpLFxuICAgICAgICBlZGl0ZWQ6IF9lZGl0ZWRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVSZWNlbnREb2N1bWVudEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdXJpOiBfbm90ZWJvb2tVcmkuZ2V0KCksXG4gICAgICAgIHR5cGU6IF8uaXNFbXB0eShfdXJpVHlwZSkgPyBcIlwiIDogX3VyaVR5cGUsXG4gICAgICAgIHJlYWRPbmx5OiAhIV9yZWFkT25seSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgZm9ybWF0OiBfLmlzRW1wdHkoX2Zvcm1hdCkgPyBcIlwiIDogX2Zvcm1hdFxuICAgICAgfTtcbiAgICAgIHJldHVybiBhbmd1bGFyLnRvSnNvbihkYXRhKTtcbiAgICB9O1xuXG4gICAgdmFyIGdlbmVyYXRlU2F2ZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVyaVR5cGU6IF91cmlUeXBlLFxuICAgICAgICBub3RlYm9va1VyaTogX25vdGVib29rVXJpLmdldCgpLFxuICAgICAgICBub3RlYm9va01vZGVsQXNTdHJpbmc6IF9ub3RlYm9va01vZGVsLnRvQ2xlYW5QcmV0dHlKc29uKClcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBfc3Vic2NyaXB0aW9ucyA9IHt9O1xuICAgIHZhciBjb25uZWN0Y29udHJvbCA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXSA9XG4gICAgICAgICAgJC5jb21ldGQuc3Vic2NyaWJlKFwiL25vdGVib29rY3RybC9cIiArIHNlc3Npb25JZCwgZnVuY3Rpb24ocmVxKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwiYmtIZWxwZXIuXCIrcmVxLmRhdGEubWV0aG9kO1xuICAgICAgICAgICAgICB2YXIgbnVtYXJncyA9IHJlcS5kYXRhLm51bWFyZ3M7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IG51bWFyZ3M7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goIHJlcS5kYXRhW1wiYXJnXCIraV0gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgcHVibGlzaCA9IHRydWU7XG4gICAgICAgICAgICAgIHZhciByZXBseTIgPSB7IHNlc3Npb246IHNlc3Npb25JZCB9O1xuICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSBldmFsKG5hbWUpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICBpZih0eXBlb2YgcmVwbHkyLnZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiByZXBseTIudmFsdWUucHJvbWlzZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHJlcGx5Mi52YWx1ZS5wcm9taXNlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZSA9IHJlcGx5Mi52YWx1ZS5wcm9taXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcmVwbHkyLnZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIC8vIG11c3Qgd2FpdCBmb3IgcmVzdWx0IHRvIGJlIHJlYWR5XG4gICAgICAgICAgICAgICAgICBwdWJsaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICByZXBseTIudmFsdWUudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlPXJlcztcbiAgICAgICAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KHJlcGx5MikpO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZT1lcnI7XG4gICAgICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChyZXBseTIudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAocHVibGlzaCkge1xuICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0FUQ0ggXCIrZXJyKTtcbiAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KCB7IHNlc3Npb246IHNlc3Npb25JZCwgdmFsdWU6IGZhbHNlIH0gKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZGlzY29ubmVjdGNvbnRyb2wgPSBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgaWYgKHNlc3Npb25JZCkge1xuICAgICAgICAgICQuY29tZXRkLnVuc3Vic2NyaWJlKF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF0pO1xuICAgICAgICAgIGRlbGV0ZSBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc2V0OiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQpIHtcblxuICAgICAgICAvLyBiYWNrdXAgZXhpc3Rpbmcgc2Vzc2lvbiBpZiBpdCdzIG5vdCBlbXB0eS5cbiAgICAgICAgaWYgKF9zZXNzaW9uSWQgJiYgIV9ub3RlYm9va01vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICAgIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9zZXNzaW9uSWQpXG4gICAgICAgICAgZGlzY29ubmVjdGNvbnRyb2woX3Nlc3Npb25JZCk7XG5cbiAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLnJlc2V0KCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgICAgc2Vzc2lvbklkID0gYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgX3VyaVR5cGUgPSB1cmlUeXBlO1xuICAgICAgICBfcmVhZE9ubHkgPSByZWFkT25seTtcbiAgICAgICAgX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgX25vdGVib29rVXJpLnNldChub3RlYm9va1VyaSk7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLnNldChub3RlYm9va01vZGVsKTtcbiAgICAgICAgdGhpcy5zZXROb3RlYm9va01vZGVsRWRpdGVkKCEhZWRpdGVkKTtcbiAgICAgICAgX3Nlc3Npb25JZCA9IHNlc3Npb25JZDtcblxuICAgICAgICBia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyLmluaXQoc2Vzc2lvbklkLCBub3RlYm9va01vZGVsKTtcbiAgICAgICAgY29ubmVjdGNvbnRyb2woc2Vzc2lvbklkKTtcbiAgICAgICAgYmtTZXNzaW9uLmJhY2t1cChfc2Vzc2lvbklkLCBnZW5lcmF0ZUJhY2t1cERhdGEoKSk7XG4gICAgICB9LFxuICAgICAgc2V0U2Vzc2lvbklkOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgICBzZXNzaW9uSWQgPSBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgIH1cbiAgICAgICAgX3Nlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICAgICAgcmV0dXJuIF9zZXNzaW9uSWQ7XG4gICAgICB9LFxuICAgICAgc2V0dXA6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCkge1xuXG4gICAgICAgIC8vIGNoZWNrIGlucHV0c1xuICAgICAgICBpZiAoIXNlc3Npb25JZCkge1xuICAgICAgICAgIHNlc3Npb25JZCA9IGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIF91cmlUeXBlID0gdXJpVHlwZTtcbiAgICAgICAgX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgICAgIF9mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIF9ub3RlYm9va1VyaS5zZXQobm90ZWJvb2tVcmkpO1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5zZXQobm90ZWJvb2tNb2RlbCk7XG4gICAgICAgIF9zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cbiAgICAgICAgdGhpcy5zZXROb3RlYm9va01vZGVsRWRpdGVkKF9lZGl0ZWQpO1xuICAgICAgICBia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyLmluaXQoc2Vzc2lvbklkLCBub3RlYm9va01vZGVsKTtcbiAgICAgICAgY29ubmVjdGNvbnRyb2woc2Vzc2lvbklkKTtcbiAgICAgICAgYmtTZXNzaW9uLmJhY2t1cChfc2Vzc2lvbklkLCBnZW5lcmF0ZUJhY2t1cERhdGEoKSk7XG4gICAgICB9LFxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBkaXNjb25uZWN0Y29udHJvbChfc2Vzc2lvbklkKTtcbiAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLnJlc2V0KCk7XG4gICAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIuY2xlYXIoX3Nlc3Npb25JZCk7XG4gICAgICAgIF9ub3RlYm9va1VyaS5yZXNldCgpO1xuICAgICAgICBfdXJpVHlwZSA9IG51bGw7XG4gICAgICAgIF9yZWFkT25seSA9IG51bGw7XG4gICAgICAgIF9mb3JtYXQgPSBudWxsO1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5yZXNldCgpO1xuICAgICAgICBfc2Vzc2lvbklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXROb3RlYm9va01vZGVsRWRpdGVkKGZhbHNlKTtcbiAgICAgIH0sXG4gICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLmV4aXRBbmRSZW1vdmVBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgc2VsZi5jbGVhcigpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoX3Nlc3Npb25JZCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb24uY2xvc2UoX3Nlc3Npb25JZCkudGhlbihjbG9zZSk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJhY2t1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfc2Vzc2lvbklkICYmICFfbm90ZWJvb2tNb2RlbC5pc0VtcHR5KCkgJiYgX25lZWRzQmFja3VwKSB7XG4gICAgICAgICAgX25lZWRzQmFja3VwID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpXG4gICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgX25lZWRzQmFja3VwID0gdHJ1ZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGVOb3RlYm9va1VyaTogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpIHtcbiAgICAgICAgLy8gdG8gYmUgdXNlZCBieSBzYXZlLWFzXG4gICAgICAgIF91cmlUeXBlID0gdXJpVHlwZTtcbiAgICAgICAgX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgICAgIF9mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIF9ub3RlYm9va1VyaS5zZXQobm90ZWJvb2tVcmkpO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rVGl0bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX25vdGVib29rVXJpLmdldCgpKSB7XG4gICAgICAgICAgcmV0dXJuIF9ub3RlYm9va1VyaS5nZXQoKS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFwiTmV3IE5vdGVib29rXCI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc1NhdmFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rVXJpICYmICFfcmVhZE9ubHk7XG4gICAgICB9LFxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gdHJpZ2dlcnMgYWxsIGRpc3BsYXkgaW1wbGVtZW50YXRpb25zIHRvIHNhdmUgdGhlIGN1cnJlbnQgb3V0cHV0IHN0YXR1cy5cbiAgICAgICAqIFRoaXMgc2F2ZSBpcyBhc3luY2hyb25vdXMgYW5kIGhhcHBlbnMgaW4gdGhlIGN1cnJlbnQgZGlnZXN0IGxvb3AuXG4gICAgICAgKiBVc2VycyBtdXN0IHNjaGVkdWxlIGEgdGltZW91dCB0byBleGVjdXRlIGNvZGUgdGhhdCByZXF1aXJlcyB0aGUgZHVtcGVkIHN0YXRlLlxuICAgICAgICovXG4gICAgICBkdW1wRGlzcGxheVN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBnZXRTYXZlRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZVNhdmVEYXRhKCk7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tNb2RlbEFzU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLnRvSnNvbigpO1xuICAgICAgfSxcbiAgICAgIGdldFJhd05vdGVib29rTW9kZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwuZ2V0KCk7XG4gICAgICB9LFxuICAgICAgZ2V0QmVha2VyT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmdldEJlYWtlck9iamVjdCgpO1xuICAgICAgfSxcbiAgICAgIGdldFNlc3Npb25JZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfc2Vzc2lvbklkO1xuICAgICAgfSxcbiAgICAgIGlzU2Vzc2lvblZhbGlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfc2Vzc2lvbklkKSB7XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMubmV3UHJvbWlzZShcImZhbHNlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb24uZ2V0U2Vzc2lvbnMoKS50aGVuKGZ1bmN0aW9uKHNlc3Npb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gXyhzZXNzaW9ucykuY2hhaW4oKS5rZXlzKCkuY29udGFpbnMoX3Nlc3Npb25JZCkudmFsdWUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIFRPRE8sIG1vdmUgdGhlIGZvbGxvd2luZyBpbXBsIHRvIGEgZGVkaWNhdGVkIG5vdGVib29rIG1vZGVsIG1hbmFnZXJcbiAgICAgIC8vIGJ1dCBzdGlsbCBleHBvc2UgaXQgaGVyZVxuICAgICAgc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZDogZnVuY3Rpb24oZWRpdGVkKSB7XG4gICAgICAgIF9uZWVkc0JhY2t1cCA9IGVkaXRlZDtcbiAgICAgICAgX2VkaXRlZCA9IGVkaXRlZDtcbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTW9kZWxFZGl0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2VkaXRlZDtcbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmlzTG9ja2VkKCk7XG4gICAgICB9LFxuICAgICAgdG9nZ2xlTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV9ub3RlYm9va01vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICAgIGlmICghX25vdGVib29rTW9kZWwuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkubG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkubG9ja2VkID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmFsdWF0b3JVbnVzZWQ6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICB2YXIgbiA9IF8uZmluZChfbm90ZWJvb2tNb2RlbC5nZXQoKS5jZWxscywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYy50eXBlID09IFwiY29kZVwiICYmIGMuZXZhbHVhdG9yID09IHBsdWdpbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAhbjtcbiAgICAgIH0sXG4gICAgICBhZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzLnB1c2goZXZhbHVhdG9yKTtcbiAgICAgICAgdGhpcy5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUV2YWx1YXRvcjogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IF9ub3RlYm9va01vZGVsLmdldCgpO1xuICAgICAgICBtb2RlbC5ldmFsdWF0b3JzID0gXy5yZWplY3QobW9kZWwuZXZhbHVhdG9ycywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHJldHVybiBlLnBsdWdpbiA9PSBwbHVnaW47XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICB9LFxuICAgICAgcmVjb25uZWN0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIucmVjb25uZWN0RXZhbHVhdG9ycygpO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rQ2VsbE9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rTmV3Q2VsbEZhY3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5ld0NvZGVDZWxsOiBmdW5jdGlvbihldmFsdWF0b3IsIGlkKSB7XG4gICAgICAgICAgICBpZiAoIWV2YWx1YXRvcikge1xuICAgICAgICAgICAgICBldmFsdWF0b3IgPSBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzWzBdLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgIGlkID0gXCJjb2RlXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBcImlkXCI6IGlkLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJjb2RlXCIsXG4gICAgICAgICAgICAgIFwiZXZhbHVhdG9yXCI6IGV2YWx1YXRvcixcbiAgICAgICAgICAgICAgXCJpbnB1dFwiOiB7XG4gICAgICAgICAgICAgICAgXCJib2R5XCI6IFwiXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJvdXRwdXRcIjoge31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXdTZWN0aW9uQ2VsbDogZnVuY3Rpb24obGV2ZWwsIHRpdGxlLCBpZCkge1xuICAgICAgICAgICAgaWYgKCFsZXZlbCAmJiBsZXZlbCAhPT0gMCkge1xuICAgICAgICAgICAgICBsZXZlbCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGV2ZWwgPD0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBcImNyZWF0aW5nIHNlY3Rpb24gY2VsbCB3aXRoIGxldmVsIFwiICsgbGV2ZWwgKyBcIiBpcyBub3QgYWxsb3dlZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICAgICAgICB0aXRsZSA9IFwiTmV3IFNlY3Rpb24gSFwiICsgbGV2ZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgaWQgPSBcInNlY3Rpb25cIiArIGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIFwiaWRcIjogaWQsXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlY3Rpb25cIixcbiAgICAgICAgICAgICAgXCJ0aXRsZVwiOiB0aXRsZSxcbiAgICAgICAgICAgICAgXCJsZXZlbFwiOiBsZXZlbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5ld01hcmtkb3duQ2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHZhciB0YWlsID0gX25vdGVib29rTW9kZWwuZ2V0KCkuY2VsbHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgaWQgPSBcIm1hcmtkb3duXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBcImlkXCI6IGlkLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJtYXJrZG93blwiLFxuICAgICAgICAgICAgICBcImJvZHlcIjogXCJcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaXNSb290Q2VsbEluaXRpYWxpemF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmdldCgpLmluaXRpYWxpemVBbGw7XG4gICAgICB9LFxuICAgICAgc2V0Um9vdENlbGxJbml0aWFsaXphdGlvbjogZnVuY3Rpb24oaW5pdGlhbGl6YXRpb24pIHtcbiAgICAgICAgaWYgKGluaXRpYWxpemF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vdGVib29rTW9kZWxBZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKG5ld0V2YWx1YXRvcikge1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzLnB1c2gobmV3RXZhbHVhdG9yKTtcbiAgICAgIH0sXG4gICAgICBub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfbm90ZWJvb2tNb2RlbC5nZXQoKS5pbml0aWFsaXplQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5nZXRBbGxDb2RlQ2VsbHMoXCJyb290XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldE5vdGVib29rQ2VsbE9wKCkuZ2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnVuZG8oKTtcbiAgICAgIH0sXG4gICAgICByZWRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIucmVkbygpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rXG4gKiBUaGlzIGlzIHRoZSAnbm90ZWJvb2sgdmlldycgcGFydCBvZiB7QGxpbmsgYmtBcHB9LiBXaGF0IGlzIHRoZSByb290IGNlbGwgaG9sZGluZyB0aGUgbmVzdGVkXG4gKiB7QGxpbmsgYmtDZWxsfXMuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snLCBbXG4gICAgJ2JrLmNvbW1vblVpJyxcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5vdXRwdXRMb2cnLFxuICAgICdiay5jb3JlJyxcbiAgICAnYmsuc2Vzc2lvbk1hbmFnZXInLFxuICAgICdiay5ldmFsdWF0b3JNYW5hZ2VyJyxcbiAgICAnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICAnYmsub3V0cHV0RGlzcGxheSdcbiAgXSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia0NlbGxcbiAqIC0gdGhlIGNvbnRyb2xsZXIgdGhhdCByZXNwb25zaWJsZSBmb3IgZGlyZWN0bHkgY2hhbmdpbmcgdGhlIHZpZXdcbiAqIC0gdGhlIGNvbnRhaW5lciBmb3Igc3BlY2lmaWMgdHlwZWQgY2VsbFxuICogLSB0aGUgZGlyZWN0aXZlIGlzIGRlc2lnbmVkIHRvIGJlIGNhcGFibGUgb2YgdXNlZCBpbiBhIG5lc3RlZCB3YXlcbiAqIC0gY29uY2VwdHVhbGx5LCBhIGNlbGwgaXMgJ2NlbGwgbW9kZWwnICsgJ3ZpZXcgbW9kZWwnKGFuIGV4YW1wbGUgb2Ygd2hhdCBnb2VzIGluIHRvIHRoZSB2aWV3XG4gKiBtb2RlbCBpcyBjb2RlIGNlbGwgYmcgY29sb3IpXG4gKiAtIEEgYmtDZWxsIGlzIGdlbmVyaWNhbGx5IGNvcnJlc3BvbmRzIHRvIGEgcG9ydGlvbiBvZiB0aGUgbm90ZWJvb2sgbW9kZWwgKGN1cnJlbnRseSwgaXQgaXNcbiAqIGFsd2F5cyBhIGJyYW5jaCBpbiB0aGUgaGllcmFyY2h5KVxuICogLSBXaGVuIGV4cG9ydGluZyAoYS5rLmEuIHNoYXJpbmcpLCB3ZSB3aWxsIG5lZWQgYm90aCB0aGUgY2VsbCBtb2RlbCBhbmQgdGhlIHZpZXcgbW9kZWxcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ2VsbCcsIGZ1bmN0aW9uKGJrVXRpbHMsIGJrU2Vzc2lvbk1hbmFnZXIsIGJrQ29yZU1hbmFnZXIsIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NlbGwnXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY2VsbG1vZGVsOiAnPScsXG4gICAgICAgIGluZGV4OiAnPSdcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGdldEJrQmFzZVZpZXdNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpLmdldFZpZXdNb2RlbCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gbm90ZWJvb2tDZWxsT3AuaXNMYXN0KCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9LCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICRzY29wZS5pc0xhcmdlID0gbmV3VmFsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcgPSB7XG4gICAgICAgICAgc2hvd0RlYnVnSW5mbzogZmFsc2UsXG4gICAgICAgICAgbWVudToge1xuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgcmVuYW1lSXRlbTogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICBfLmZpbmRXaGVyZSh0aGlzLml0ZW1zLFxuICAgICAgICAgICAgICAgIHtuYW1lOiBvcHRzLm5hbWV9XG4gICAgICAgICAgICAgICkubmFtZSA9IG9wdHMubmV3TmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRJdGVtOiBmdW5jdGlvbihtZW51SXRlbSkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobWVudUl0ZW0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0hlYWQ6IGZ1bmN0aW9uKG1lbnVJdGVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKDAsIDAsIG1lbnVJdGVtKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtOiBmdW5jdGlvbihpdGVtTmFtZSkge1xuICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoXy5maW5kKHRoaXMuaXRlbXMsIGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IGl0ZW1OYW1lO1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTG9ja2VkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5uZXdDZWxsTWVudUNvbmZpZyA9IHtcbiAgICAgICAgICBpc1Nob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICFia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKSAmJiAhbm90ZWJvb2tDZWxsT3AuaXNDb250YWluZXIoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRhY2hDZWxsOiBmdW5jdGlvbihuZXdDZWxsKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5pbnNlcnRBZnRlcigkc2NvcGUuY2VsbG1vZGVsLmlkLCBuZXdDZWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZDZWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmdldE5lc3RlZExldmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuZ2V0RnVsbEluZGV4KCkgKyAnLicgKyAoJHNjb3BlLmluZGV4ICsgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICRzY29wZS5pbmRleCArICRzY29wZS5nZXROZXN0ZWRMZXZlbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTaG93RGVidWdJbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm8gPSAhJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm87XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc1Nob3dEZWJ1Z0luZm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm87XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc0RlYnVnZ2luZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBnZXRCa0Jhc2VWaWV3TW9kZWwoKS5pc0RlYnVnZ2luZygpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0TmVzdGVkTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBia0NlbGwgaXMgdXNpbmcgaXNvbGF0ZWQgc2NvcGUsICRzY29wZSBpcyB0aGUgaXNvbGF0ZWQgc2NvcGVcbiAgICAgICAgICAvLyAkc2NvcGUuJHBhcmVudCBpcyB0aGUgc2NvcGUgcmVzdWx0ZWQgZnJvbSBuZy1yZXBlYXQgKG5nLXJlcGVhdCBjcmVhdGVzIGEgcHJvdG90eXBhbFxuICAgICAgICAgIC8vIHNjb3BlIGZvciBlYWNoIG5nLXJlcGVhdGVkIGl0ZW0pXG4gICAgICAgICAgLy8gJFNjb3BlLiRwYXJlbnQuJHBhcmVudCBpcyB0aGUgY29udGFpbmVyIGNlbGwod2hpY2ggaW5pdGlhdGVzIG5nLXJlcGVhdCkgc2NvcGVcbiAgICAgICAgICB2YXIgcGFyZW50ID0gJHNjb3BlLiRwYXJlbnQuJHBhcmVudDtcbiAgICAgICAgICByZXR1cm4gcGFyZW50LmdldE5lc3RlZExldmVsID8gcGFyZW50LmdldE5lc3RlZExldmVsKCkgKyAxIDogMTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFBhcmVudElkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LiRwYXJlbnQuY2VsbG1vZGVsID8gJHNjb3BlLiRwYXJlbnQuJHBhcmVudC5jZWxsbW9kZWwuaWQgOiAncm9vdCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZUNlbGxJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbikge1xuICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5zdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpXG4gICAgICAgICAgICAuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwpXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlbGV0ZUNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5kZWxldGUoJHNjb3BlLmNlbGxtb2RlbC5pZCwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3IoJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlTWV0aG9kID0gJ21vdmUnO1xuICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC50eXBlID09ICdzZWN0aW9uJykge1xuICAgICAgICAgIG1vdmVNZXRob2QgPSAnbW92ZVNlY3Rpb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsVXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcFttb3ZlTWV0aG9kICsgJ1VwJ10oJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsRG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wW21vdmVNZXRob2QgKyAnRG93biddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbFVwRGlzYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIW5vdGVib29rQ2VsbE9wWydpc1Bvc3NpYmxlVG8nICsgXy5zdHJpbmcuY2FwaXRhbGl6ZShtb3ZlTWV0aG9kKSArICdVcCddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbERvd25EaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhbm90ZWJvb2tDZWxsT3BbJ2lzUG9zc2libGVUbycgKyBfLnN0cmluZy5jYXBpdGFsaXplKG1vdmVNZXRob2QpICsgJ0Rvd24nXSgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnRGVsZXRlIGNlbGwnLFxuICAgICAgICAgIGFjdGlvbjogJHNjb3BlLmRlbGV0ZUNlbGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ01vdmUgdXAnLFxuICAgICAgICAgIGFjdGlvbjogJHNjb3BlLm1vdmVDZWxsVXAsXG4gICAgICAgICAgZGlzYWJsZWQ6ICRzY29wZS5tb3ZlQ2VsbFVwRGlzYWJsZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ01vdmUgZG93bicsXG4gICAgICAgICAgYWN0aW9uOiAkc2NvcGUubW92ZUNlbGxEb3duLFxuICAgICAgICAgIGRpc2FibGVkOiAkc2NvcGUubW92ZUNlbGxEb3duRGlzYWJsZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ0N1dCcsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmN1dCgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdQYXN0ZSAoYXBwZW5kIGFmdGVyKScsXG4gICAgICAgICAgZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICFub3RlYm9va0NlbGxPcC5jbGlwYm9hcmQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucGFzdGUoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0VHlwZUNlbGxVcmwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdHlwZSA9ICRzY29wZS5jZWxsbW9kZWwudHlwZTtcbiAgICAgICAgICByZXR1cm4gdHlwZSArICctY2VsbC5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNDb2RlQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLnR5cGUgPT0gJ2NvZGUnO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29kZUNlbGwnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgJHRpbWVvdXQpIHtcblxuICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfTtcbiAgICB2YXIgQ0VMTF9UWVBFID0gJ2NvZGUnO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsJ10oKSxcbiAgICAgIHNjb3BlOiB7Y2VsbG1vZGVsOiAnPScsIGNlbGxtZW51OiAnPSd9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5jZWxsdmlldyA9IHtcbiAgICAgICAgICBpbnB1dE1lbnU6IFtdLFxuICAgICAgICAgIGRpc3BsYXlzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0xvY2tlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhKCRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvL2pzY3M6ZGlzYWJsZVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsID09PSB1bmRlZmluZWQgfHwgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQgPT09IHVuZGVmaW5lZCB8fCAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9qc2NzOmVuYWJsZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB0eXBlID0gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0LmlubmVydHlwZTtcblxuICAgICAgICAgIGlmICghdHlwZSAmJiAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQucGF5bG9hZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0eXBlID0gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0LnBheWxvYWQuaW5uZXJ0eXBlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0eXBlID09ICdFcnJvcic7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd0lucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5pc0xvY2tlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgLy8gZW5zdXJlIGNtIHJlZnJlc2hlcyB3aGVuICd1bmhpZGUnXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzU2hvd0lucHV0KCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNtICYmIG5ld1ZhbHVlID09PSB0cnVlICYmIG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNtLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmlzSGlkZGVuT3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnNlbGVjdGVkVHlwZSA9PSAnSGlkZGVuJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaGFzT3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5iYWNrZ3JvdW5kQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLmlzU2hvd0lucHV0KCkgfHwgJChldmVudC50b0VsZW1lbnQpLnBhcmVudHMoKS5oYXNDbGFzcygnY29kZS1jZWxsLW91dHB1dCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB0b3AgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgdmFyIG91dHB1dEVsZW1lbnQgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5jaGlsZHJlbignLmNvZGUtY2VsbC1vdXRwdXQ6Zmlyc3QnKTtcbiAgICAgICAgICB2YXIgYm90dG9tO1xuICAgICAgICAgIGlmIChvdXRwdXRFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IG91dHB1dEVsZW1lbnQub2Zmc2V0KCkudG9wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib3R0b20gPSB0b3AgKyAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5oZWlnaHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRXZlbiBiZXR0ZXIgd291bGQgYmUgdG8gZGV0ZWN0IGxlZnQvcmlnaHQgYW5kIG1vdmUgdG9cbiAgICAgICAgICAvLyBiZWdpbm5pbmcgb3IgZW5kIG9mIGxpbmUsIGJ1dCB3ZSBjYW4gbGl2ZSB3aXRoIHRoaXMgZm9yIG5vdy5cbiAgICAgICAgICB2YXIgY20gPSAkc2NvcGUuY207XG4gICAgICAgICAgaWYgKGV2ZW50LnBhZ2VZIDwgKHRvcCArIGJvdHRvbSkgLyAyKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoMCwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihjbS5saW5lQ291bnQoKSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgY20uZ2V0TGluZShjbS5sYXN0TGluZSgpKS5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc1Nob3dPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAhKHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IHJlc3VsdCA9PT0gbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm91dHB1dFRpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5pc0Vycm9yKCkgPyAnRXJyb3InIDogbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZXZhbHVhdGUgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBpZiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuc3RhdGUgPSB7fTtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwpLlxuICAgICAgICAgICAgICBjYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2YWx1YXRpb24gZmFpbGVkJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZWRpdGVkTGlzdGVuZXIgPSBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaWQnLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5ldmFsdWF0b3InLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pbml0aWFsaXphdGlvbicsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmlucHV0LmJvZHknLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5vdXRwdXQucmVzdWx0JywgZWRpdGVkTGlzdGVuZXIpO1xuXG4gICAgICAgICRzY29wZS5hdXRvY29tcGxldGUgPSBmdW5jdGlvbihjcG9zLCBvblJlc3VsdHMpIHtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9yID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcigkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcik7XG4gICAgICAgICAgaWYgKCFldmFsdWF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV2YWx1YXRvci5hdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIGV2YWx1YXRvci5hdXRvY29tcGxldGUoJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5ib2R5LCBjcG9zLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdG9yLmF1dG9jb21wbGV0ZTIpIHtcbiAgICAgICAgICAgIC8vIHVzZWQgYnkgSmF2YVNjcmlwdCBldmFsdWF0b3JcbiAgICAgICAgICAgIGV2YWx1YXRvci5hdXRvY29tcGxldGUyKCRzY29wZS5jbSwgbnVsbCwgb25SZXN1bHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3IoJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUudXBkYXRlVUkgPSBmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNtICYmIGV2YWx1YXRvcikge1xuICAgICAgICAgICAgJHNjb3BlLmNtLnNldE9wdGlvbignbW9kZScsIGV2YWx1YXRvci5jbU1vZGUpO1xuICAgICAgICAgICAgaWYgKGV2YWx1YXRvci5pbmRlbnRTcGFjZXMpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNtLnNldE9wdGlvbignaW5kZW50VW5pdCcsIGV2YWx1YXRvci5pbmRlbnRTcGFjZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZ2V0RXZhbHVhdG9yKCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAkc2NvcGUudXBkYXRlVUkobmV3VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmFwcGVuZENvZGVDZWxsID0gZnVuY3Rpb24oZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgIHZhciB0aGlzQ2VsbElkID0gJHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICBpZiAoIWV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIGV2YWx1YXRvciBzcGVjaWZpZWQsIHVzZSB0aGUgY3VycmVudCBldmFsdWF0b3JcbiAgICAgICAgICAgIGV2YWx1YXRvck5hbWUgPSAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5ld0NlbGwgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rTmV3Q2VsbEZhY3RvcnkoKS5uZXdDb2RlQ2VsbChldmFsdWF0b3JOYW1lKTtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5hcHBlbmRBZnRlcih0aGlzQ2VsbElkLCBuZXdDZWxsKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oQ0VMTF9UWVBFKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNoYXJlTWVudSA9IHtcbiAgICAgICAgICBuYW1lOiAnU2hhcmUnLFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbShzaGFyZU1lbnUpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRTaGFyZU1lbnVQbHVnaW4oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnU2hvdyBpbnB1dCBjZWxsJyxcbiAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnU2hvdyBvdXRwdXQgY2VsbCAoaWYgYXZhaWxhYmxlKScsXG4gICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbjtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ0luaXRpYWxpemF0aW9uIENlbGwnLFxuICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ09wdGlvbnMnLFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3dGdWxsTW9kYWxEaWFsb2coZnVuY3Rpb24gY2IocikgeyB9ICxcbiAgICAgICAgICAgICAgICAnYXBwL21haW5hcHAvZGlhbG9ncy9jb2RlY2VsbG9wdGlvbnMuanN0Lmh0bWwnLCAnQ29kZUNlbGxPcHRpb25zQ29udHJvbGxlcicsICRzY29wZS5jZWxsbW9kZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuc2hvd0RlYnVnID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gaXNGdWxsU2NyZWVuKGNtKSB7XG4gICAgICAgICAgcmV0dXJuIC9cXGJDb2RlTWlycm9yLWZ1bGxzY3JlZW5cXGIvLnRlc3QoY20uZ2V0V3JhcHBlckVsZW1lbnQoKS5jbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2luSGVpZ2h0KCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRGdWxsU2NyZWVuKGNtLCBmdWxsKSB7XG4gICAgICAgICAgdmFyIHdyYXAgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuICAgICAgICAgIGlmIChmdWxsKSB7XG4gICAgICAgICAgICB3cmFwLmNsYXNzTmFtZSArPSAnIENvZGVNaXJyb3ItZnVsbHNjcmVlbic7XG4gICAgICAgICAgICB3cmFwLnN0eWxlLmhlaWdodCA9IHdpbkhlaWdodCgpICsgJ3B4JztcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3cmFwLmNsYXNzTmFtZSA9IHdyYXAuY2xhc3NOYW1lLnJlcGxhY2UoJyBDb2RlTWlycm9yLWZ1bGxzY3JlZW4nLCAnJyk7XG4gICAgICAgICAgICB3cmFwLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzaG93aW5nID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdDb2RlTWlycm9yLWZ1bGxzY3JlZW4nKVswXTtcbiAgICAgICAgICBpZiAoIXNob3dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hvd2luZy5Db2RlTWlycm9yLmdldFdyYXBwZXJFbGVtZW50KCkuc3R5bGUuaGVpZ2h0ID0gd2luSGVpZ2h0KCkgKyAncHgnO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgICAgIENvZGVNaXJyb3Iub24od2luZG93LCAncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG5cbiAgICAgICAgdmFyIGNvZGVNaXJyb3JPcHRpb25zID0gYmtDb3JlTWFuYWdlci5jb2RlTWlycm9yT3B0aW9ucyhzY29wZSwgbm90ZWJvb2tDZWxsT3ApO1xuICAgICAgICBfLmV4dGVuZChjb2RlTWlycm9yT3B0aW9ucy5leHRyYUtleXMsIHtcbiAgICAgICAgICAnRXNjJyA6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZCgnc2luZ2xlU2VsZWN0aW9uJyk7XG4gICAgICAgICAgICBpZiAoY20uc3RhdGUudmltICYmIGNtLnN0YXRlLnZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChpc0Z1bGxTY3JlZW4oY20pKSB7XG4gICAgICAgICAgICAgICAgc2V0RnVsbFNjcmVlbihjbSwgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQWx0LUYxMSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzZXRGdWxsU2NyZWVuKGNtLCAhaXNGdWxsU2NyZWVuKGNtKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnU2hpZnQtQ3RybC1BJzogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIHNjb3BlLmFwcGVuZENvZGVDZWxsKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnU2hpZnQtQ21kLUEnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUuYXBwZW5kQ29kZUNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DdHJsLUUnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUucG9wdXBNZW51KCk7XG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5pbnB1dGNlbGxtZW51JykuZmluZCgnbGknKS5maW5kKCdhJylbMF0uZm9jdXMoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DbWQtRSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzY29wZS5wb3B1cE1lbnUoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLmlucHV0Y2VsbG1lbnUnKS5maW5kKCdsaScpLmZpbmQoJ2EnKVswXS5mb2N1cygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ0N0cmwtQWx0LUgnOiBmdW5jdGlvbihjbSkgeyAvLyBjZWxsIGhpZGVcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQ21kLUFsdC1IJzogZnVuY3Rpb24oY20pIHsgLy8gY2VsbCBoaWRlXG4gICAgICAgICAgICBzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgU2Nyb2xsaW4udHJhY2soZWxlbWVudFswXSwge2hhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNtID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZWxlbWVudC5maW5kKCd0ZXh0YXJlYScpWzBdLCBjb2RlTWlycm9yT3B0aW9ucyk7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckNNKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUuY20pO1xuICAgICAgICAgIHNjb3BlLmNtLm9uKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICBzY29wZS51cGRhdGVVSShzY29wZS5nZXRFdmFsdWF0b3IoKSk7XG4gICAgICAgICAgLy8gU2luY2UgdGhlIGluc3RhbnRpYXRpb24gb2YgY29kZW1pcnJvciBpbnN0YW5jZXMgaXMgbm93IGxhenksXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byB0cmFjayBhbmQgaGFuZGxlIGZvY3VzaW5nIG9uIGFuIGFzeW5jIGNlbGwgYWRkXG4gICAgICAgICAgaWYgKHNjb3BlLl9zaG91bGRGb2N1c0NvZGVNaXJyb3IpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5fc2hvdWxkRm9jdXNDb2RlTWlycm9yO1xuICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9fSk7XG5cbiAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckZvY3VzYWJsZShzY29wZS5jZWxsbW9kZWwuaWQsIHNjb3BlKTtcblxuICAgICAgICAvLyBjZWxsbW9kZWwuYm9keSAtLT4gQ29kZU1pcnJvclxuICAgICAgICBzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pbnB1dC5ib2R5JywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuY20gJiYgbmV3VmFsICE9PSBzY29wZS5jbS5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIG5ld1ZhbCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuY20uc2V0VmFsdWUobmV3VmFsKTtcbiAgICAgICAgICAgIHNjb3BlLmNtLmNsZWFySGlzdG9yeSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGNlbGxtb2RlbC5ib2R5IDwtLSBDb2RlTWlycm9yXG4gICAgICAgIHZhciBjaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oY20sIGUpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuY2VsbG1vZGVsLmlucHV0LmJvZHkgIT09IGNtLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5saW5lQ291bnQgPSBjbS5saW5lQ291bnQoKTtcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5ib2R5ID0gY20uZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICghYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTW9kZWxFZGl0ZWQoKSkge1xuICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaW5wdXRNZW51RGl2ID0gZWxlbWVudC5maW5kKCcuYmtjZWxsJykuZmlyc3QoKTtcbiAgICAgICAgc2NvcGUucG9wdXBNZW51ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB2YXIgbWVudSA9IGlucHV0TWVudURpdi5maW5kKCcuZHJvcGRvd24nKS5maXJzdCgpO1xuICAgICAgICAgIG1lbnUuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpLmZpcnN0KCkuZHJvcGRvd24oJ3RvZ2dsZScpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKSB7XG4gICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykuYWRkQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykucmVtb3ZlQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc0luaXRpYWxpemF0aW9uQ2VsbCgpJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmJrY2VsbCcpLmFkZENsYXNzKCdpbml0Y2VsbCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykucmVtb3ZlQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS5nZXRTaGFyZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9yID0gXyhia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKS5ldmFsdWF0b3JzKVxuICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yLm5hbWUgPT09IHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBjZWxscyA9IFtzY29wZS5jZWxsbW9kZWxdO1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLmdlbmVyYXRlTm90ZWJvb2soW2V2YWx1YXRvcl0sIGNlbGxzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS4kb24oJ2JlYWtlci5jZWxsLmFkZGVkJywgZnVuY3Rpb24oZSwgY2VsbG1vZGVsKSB7XG4gICAgICAgICAgaWYgKGNlbGxtb2RlbCA9PT0gc2NvcGUuY2VsbG1vZGVsKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuY20pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLl9zaG91bGRGb2N1c0NvZGVNaXJyb3IgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCdiZWFrZXIuc2VjdGlvbi50b2dnbGVkJywgZnVuY3Rpb24oZSwgaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICBpZiAoIWlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2NvcGUuY20ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgU2Nyb2xsaW4udW50cmFjayhlbGVtZW50WzBdKTtcbiAgICAgICAgICBDb2RlTWlycm9yLm9mZih3aW5kb3csICdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcbiAgICAgICAgICBDb2RlTWlycm9yLm9mZignY2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgc2NvcGUuY20gJiYgc2NvcGUuY20ub2ZmKCk7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay51bnJlZ2lzdGVyRm9jdXNhYmxlKHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay51bnJlZ2lzdGVyQ00oc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogVGhpcyBtb2R1bGUgaG9sZHMgdGhlIGxvZ2ljIGZvciBjb2RlIGNlbGwsIHdoaWNoIGlzIGEgdHlwZWQge0BsaW5rIGJrQ2VsbH0uXG4gKiBUaGUgY29kZSBjZWxsIGNvbnRhaW5zIGFuIGlucHV0IGNlbGwgYW4gb3V0cHV0IGNlbGwgKHtAbGluayBia0NvZGVDZWxsT3V0cHV0fSkgYW5kIGNlbGwgbWVudXMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb2RlQ2VsbElucHV0TWVudScsIGZ1bmN0aW9uKGJrQ29yZU1hbmFnZXIpIHtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfSA7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWydtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxpbnB1dG1lbnUnXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5nZXRJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZHJvcGRvd24tc3VibWVudScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFN1Ym1lbnVJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZGlzYWJsZWQtbGluaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFNob3dFdmFsSWNvbiA9IGZ1bmN0aW9uKGV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IgPT09IGV2YWx1YXRvck5hbWU7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zZXRFdmFsdWF0b3IgPSBmdW5jdGlvbihldmFsdWF0b3JOYW1lKSB7XG4gICAgICAgICAgdmFyIGNlbGxJZCA9ICRzY29wZS5jZWxsbW9kZWwuaWQ7XG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IgPSBldmFsdWF0b3JOYW1lO1xuICAgICAgICAgIGdldEJrTm90ZWJvb2tXaWRnZXQoKS5nZXRGb2N1c2FibGUoY2VsbElkKS5mb2N1cygpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgYWJzdHJhY3QgY29udGFpbmVyIGZvciB0eXBlcyBvZiBvdXRwdXQgZGlzcGxheXMuIFdoaWxlIHdlIHBsYW4gdG8gbWFrZSB0aGUgb3V0cHV0IGRpc3BsYXkgbG9hZGluZ1xuICogbWVjaGFuaXNtIG1vcmUgcGx1Z2dhYmxlLCByaWdodCBub3csIHRoaXMgbW9kdWxlIHNlcnZlcyBhcyB0aGUgcmVnaXN0cmF0aW9uIG91dHB1dCBkaXNwbGF5IHR5cGVzIGFuZCBob2xkcyB0aGUgbG9naWNcbiAqIGZvciBzd2l0Y2ggYmV0d2VlbiBhcHBsaWNhYmxlIG91dHB1dCBkaXNwbGF5IHRocm91Z2ggVUkuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb2RlQ2VsbE91dHB1dCcsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtPdXRwdXREaXNwbGF5RmFjdG9yeSwgYmtFdmFsdWF0b3JNYW5hZ2VyLCBia0V2YWx1YXRlSm9iTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsb3V0cHV0XCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBtb2RlbDogXCI9XCIsXG4gICAgICAgIGV2YWx1YXRvcklkOiBcIkBcIixcbiAgICAgICAgY2VsbElkOiBcIkBcIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgX3NoYXJlTWVudUl0ZW1zID0gW107XG5cbiAgICAgICAgJHNjb3BlLmdldE91dHB1dFJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWwucmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLnN1YnNjcmliZWRUbykge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5tb2RlbC5wbHVnaW5OYW1lICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2UgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0pIHtcbiAgICAgICAgICAgICAgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0udW5zdWJzY3JpYmUoJHNjb3BlLnN1YnNjcmliZWRUbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbElkICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5kZVJlZ2lzdGVyT3V0cHV0Q2VsbCgkc2NvcGUuY2VsbElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXMgPSBbXTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZ2V0T3V0cHV0UmVzdWx0KCknLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLnN1YnNjcmliZWRUbyAmJiAkc2NvcGUuc3Vic2NyaWJlZFRvICE9PSByZXN1bHQudXBkYXRlX2lkKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWUgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXSkge1xuICAgICAgICAgICAgICB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXS51bnN1YnNjcmliZSgkc2NvcGUuc3Vic2NyaWJlZFRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5zdWJzY3JpYmVkVG8gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoISRzY29wZS5zdWJzY3JpYmVkVG8gJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0LnVwZGF0ZV9pZCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5tb2RlbC5wbHVnaW5OYW1lICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2UgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0pIHtcbiAgICAgICAgICAgICAgdmFyIG9uVXBkYXRhYmxlUmVzdWx0VXBkYXRlID0gZnVuY3Rpb24odXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnJlc3VsdCA9IHVwZGF0ZTtcbiAgICAgICAgICAgICAgICBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdLnN1YnNjcmliZShyZXN1bHQudXBkYXRlX2lkLCBvblVwZGF0YWJsZVJlc3VsdFVwZGF0ZSk7XG4gICAgICAgICAgICAgICRzY29wZS5zdWJzY3JpYmVkVG8gPSByZXN1bHQudXBkYXRlX2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQudHlwZSA9PT0gXCJVcGRhdGFibGVFdmFsdWF0aW9uUmVzdWx0XCIpXG4gICAgICAgICAgICAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzID0gYmtPdXRwdXREaXNwbGF5RmFjdG9yeS5nZXRBcHBsaWNhYmxlRGlzcGxheXMocmVzdWx0LnBheWxvYWQpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXMgPSBia091dHB1dERpc3BsYXlGYWN0b3J5LmdldEFwcGxpY2FibGVEaXNwbGF5cyhyZXN1bHQpO1xuICAgICAgICAgICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGUgPSAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzWzBdO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0byBiZSB1c2VkIGluIGJrT3V0cHV0RGlzcGxheVxuICAgICAgICAkc2NvcGUub3V0cHV0RGlzcGxheU1vZGVsID0ge1xuICAgICAgICAgIGdldENlbGxNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJHNjb3BlLmdldE91dHB1dFJlc3VsdCgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudHlwZSA9PT0gXCJCZWFrZXJEaXNwbGF5XCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5vYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCAmJiByZXN1bHQudHlwZSA9PT0gXCJVcGRhdGFibGVFdmFsdWF0aW9uUmVzdWx0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnBheWxvYWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0RHVtcFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUubW9kZWwuc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0RHVtcFN0YXRlOiBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICAkc2NvcGUubW9kZWwuc3RhdGUgPSBzO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzZXRTaGFyZU1lbnVJdGVtczogZnVuY3Rpb24obmV3SXRlbXMpIHtcbiAgICAgICAgICAgIF9zaGFyZU1lbnVJdGVtcyA9IG5ld0l0ZW1zO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Q29tZXRkVXRpbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAkc2NvcGUuZ2V0RXZhbHVhdG9ySWQoKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICB2YXIgZXZhbHVhdG9yID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcihpZCk7XG4gICAgICAgICAgICAgIGlmIChldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yLmNvbWV0ZFV0aWw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEV2YWx1YXRvcklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICRzY29wZTtcbiAgICAgICAgICAgIHdoaWxlIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChpZC5ldmFsdWF0b3JJZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBpZC5ldmFsdWF0b3JJZDtcbiAgICAgICAgICAgICAgaWQgPSBpZC4kcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldE91dHB1dERpc3BsYXlUeXBlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5tb2RlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICByZXR1cm4gXCJUZXh0XCI7XG4gICAgICAgICAgdmFyIHR5cGUgPSAkc2NvcGUubW9kZWwuc2VsZWN0ZWRUeXBlO1xuICAgICAgICAgIC8vIGlmIEJlYWtlckRpc3BsYXkgb3IgVXBkYXRhYmxlRXZhbHVhdGlvblJlc3VsdCwgdXNlIHRoZSBpbm5lciB0eXBlIGluc3RlYWRcbiAgICAgICAgICBpZiAodHlwZSA9PT0gXCJCZWFrZXJEaXNwbGF5XCIpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUuZ2V0T3V0cHV0UmVzdWx0KCk7XG4gICAgICAgICAgICB0eXBlID0gcmVzdWx0ID8gcmVzdWx0LmlubmVydHlwZSA6IFwiSGlkZGVuXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBnZXRFbGFwc2VkVGltZVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUubW9kZWwuZWxhcHNlZFRpbWUgfHwgJHNjb3BlLm1vZGVsLmVsYXBzZWRUaW1lID09PSAwKSB7XG4gICAgICAgICAgICB2YXIgZWxhcHNlZFRpbWUgPSAkc2NvcGUubW9kZWwuZWxhcHNlZFRpbWU7XG4gICAgICAgICAgICByZXR1cm4gXCJFbGFwc2VkIHRpbWU6IFwiICsgYmtVdGlscy5mb3JtYXRUaW1lU3RyaW5nKGVsYXBzZWRUaW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd091dHB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudCAhPT0gdW5kZWZpbmVkICYmICRzY29wZS4kcGFyZW50LmlzU2hvd091dHB1dCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LmlzU2hvd091dHB1dCgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc1Nob3dNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50ICE9PSB1bmRlZmluZWQgJiYgJHNjb3BlLiRwYXJlbnQuaXNTaG93TWVudSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LmlzU2hvd01lbnUoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlRXhwYW5zaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmNlbGxtb2RlbCAhPT0gdW5kZWZpbmVkICYmICRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSAkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbjtcbiAgICAgICAgICAgICAgJHNjb3BlLiRicm9hZGNhc3QoJ2V4cGFuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFeHBhbmRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwgIT09IHVuZGVmaW5lZCAmJiAkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gISRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRvIGJlIHVzZWQgaW4gb3V0cHV0IGNlbGwgbWVudVxuICAgICAgICAkc2NvcGUub3V0cHV0Q2VsbE1lbnVNb2RlbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgX2FkZGl0aW9uYWxNZW51SXRlbXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiU2hhcmVcIixcbiAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc2hhcmVNZW51SXRlbXM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiVG9nZ2xlIENlbGwgT3V0cHV0XCIsXG4gICAgICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudG9nZ2xlRXhwYW5zaW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogZ2V0RWxhcHNlZFRpbWVTdHJpbmcsXG4gICAgICAgICAgICAgIGFjdGlvbjogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldEFwcGxpY2FibGVEaXNwbGF5czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNlbGVjdGVkRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWwuc2VsZWN0ZWRUeXBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNlbGVjdGVkRGlzcGxheTogZnVuY3Rpb24oZGlzcGxheSkge1xuICAgICAgICAgICAgICAkc2NvcGUubW9kZWwuc2VsZWN0ZWRUeXBlID0gZGlzcGxheTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBZGRpdGlvbmFsTWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9hZGRpdGlvbmFsTWVudUl0ZW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUub3V0cHV0UmVmcmVzaGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCEoJHNjb3BlLiQkcGhhc2UgfHwgJHNjb3BlLiRyb290LiQkcGhhc2UpKVxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoICRzY29wZS5jZWxsSWQgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIucmVnaXN0ZXJPdXRwdXRDZWxsKCRzY29wZS5jZWxsSWQsICRzY29wZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb2RlQ2VsbE91dHB1dE1lbnUnLCBmdW5jdGlvbihia1V0aWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsb3V0cHV0bWVudVwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgbW9kZWw6ICc9J1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZ2V0SXRlbU5hbWUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0SXRlbUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgdmFyIHN1Ykl0ZW1zID0gJHNjb3BlLmdldFN1Ykl0ZW1zKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKHN1Ykl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJkcm9wZG93bi1zdWJtZW51XCIpO1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChcImRyb3AtbGVmdFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmdldEl0ZW1OYW1lKGl0ZW0pID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcImRpc3BsYXktbm9uZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKFwiIFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFN1Ym1lbnVJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcImRpc2FibGVkLWxpbmtcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbihcIiBcIik7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRTdWJJdGVtcyA9IGZ1bmN0aW9uKHBhcmVudEl0ZW0pIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHBhcmVudEl0ZW0uaXRlbXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50SXRlbS5pdGVtcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFyZW50SXRlbS5pdGVtcztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE1IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE92ZXJyaWRlIG1hcmtkb3duIGxpbmsgcmVuZGVyZXIgdG8gYWx3YXlzIGhhdmUgYHRhcmdldD1cIl9ibGFua1wiYFxuICAvLyBNb3N0bHkgZnJvbSBSZW5kZXJlci5wcm90b3R5cGUubGlua1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWQvYmxvYi9tYXN0ZXIvbGliL21hcmtlZC5qcyNMODYyLUw4ODFcbiAgdmFyIGJrUmVuZGVyZXIgPSBuZXcgbWFya2VkLlJlbmRlcmVyKCk7XG4gIGJrUmVuZGVyZXIubGluayA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgdmFyIHByb3Q7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvdCA9IGRlY29kZVVSSUNvbXBvbmVudCh1bmVzY2FwZShocmVmKSlcbiAgICAgICAgLnJlcGxhY2UoL1teXFx3Ol0vZywgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICAvL2pzaGludCBpZ25vcmU6c3RhcnRcbiAgICAgIGlmIChwcm90LmluZGV4T2YoJ2phdmFzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCd2YnNjcmlwdDonKSA9PT0gMCkge1xuICAgICAgICAvL2pzaGludCBpZ25vcmU6ZW5kXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvdXQgPSAnPGEgaHJlZj1cIicgKyBocmVmICsgJ1wiJztcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgICB9XG4gICAgb3V0ICs9ICcgdGFyZ2V0PVwiX2JsYW5rXCInOyAvLyA8IEFEREVEIFRISVMgTElORSBPTkxZXG4gICAgb3V0ICs9ICc+JyArIHRleHQgKyAnPC9hPic7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGJrUmVuZGVyZXIucGFyYWdyYXBoID0gZnVuY3Rpb24odGV4dCkge1xuICAgIC8vIEFsbG93IHVzZXJzIHRvIHdyaXRlIFxcJCB0byBlc2NhcGUgJFxuICAgIHJldHVybiBtYXJrZWQuUmVuZGVyZXIucHJvdG90eXBlLnBhcmFncmFwaC5jYWxsKHRoaXMsIHRleHQucmVwbGFjZSgvXFxcXFxcJC9nLCAnJCcpKTtcbiAgfTtcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTWFya2Rvd25FZGl0YWJsZScsIFsnYmtTZXNzaW9uTWFuYWdlcicsICdia0hlbHBlcicsICdia0NvcmVNYW5hZ2VyJywgJyR0aW1lb3V0JywgZnVuY3Rpb24oYmtTZXNzaW9uTWFuYWdlciwgYmtIZWxwZXIsIGJrQ29yZU1hbmFnZXIsICR0aW1lb3V0KSB7XG4gICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9tYXJrZG93bi1lZGl0YWJsZVwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY2VsbG1vZGVsOiAnPSdcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGNvbnRlbnRBdHRyaWJ1dGUgPSBzY29wZS5jZWxsbW9kZWwudHlwZSA9PT0gXCJzZWN0aW9uXCIgPyAndGl0bGUnIDogJ2JvZHknO1xuXG4gICAgICAgIHZhciBwcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG1hcmtkb3duRnJhZ21lbnQgPSAkKCc8ZGl2PicgKyBzY29wZS5jZWxsbW9kZWxbY29udGVudEF0dHJpYnV0ZV0gKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgcmVuZGVyTWF0aEluRWxlbWVudChtYXJrZG93bkZyYWdtZW50WzBdLCB7XG4gICAgICAgICAgICBkZWxpbWl0ZXJzOiBbXG4gICAgICAgICAgICAgIHtsZWZ0OiBcIiQkXCIsIHJpZ2h0OiBcIiQkXCIsIGRpc3BsYXk6IHRydWV9LFxuICAgICAgICAgICAgICB7bGVmdDogXCIkXCIsIHJpZ2h0OiAgXCIkXCIsIGRpc3BsYXk6IGZhbHNlfSxcbiAgICAgICAgICAgICAge2xlZnQ6IFwiXFxcXFtcIiwgcmlnaHQ6IFwiXFxcXF1cIiwgZGlzcGxheTogdHJ1ZX0sXG4gICAgICAgICAgICAgIHtsZWZ0OiBcIlxcXFwoXCIsIHJpZ2h0OiBcIlxcXFwpXCIsIGRpc3BsYXk6IGZhbHNlfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQuZmluZCgnLm1hcmt1cCcpLmh0bWwobWFya2VkKG1hcmtkb3duRnJhZ21lbnQuaHRtbCgpLCB7Z2ZtOiB0cnVlLCByZW5kZXJlcjogYmtSZW5kZXJlcn0pKTtcbiAgICAgICAgICBtYXJrZG93bkZyYWdtZW50LnJlbW92ZSgpO1xuICAgICAgICAgIHNjb3BlLm1vZGUgPSAncHJldmlldyc7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN5bmNDb250ZW50QW5kUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbFtjb250ZW50QXR0cmlidXRlXSA9IHNjb3BlLmNtLmdldFZhbHVlKCk7XG4gICAgICAgICAgcHJldmlldygpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5ldmFsdWF0ZSA9IHN5bmNDb250ZW50QW5kUHJldmlldztcblxuICAgICAgICBzY29wZS5ia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuXG4gICAgICAgIHNjb3BlLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuZWRpdCgpO1xuICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLmVkaXQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkgfHwge307XG4gICAgICAgICAgLy8gSWYgdGhlIHVzZXIgaXMgc2VsZWN0aW5nIHNvbWUgdGV4dCwgZG8gbm90IGVudGVyIHRoZSBlZGl0IG1hcmtkb3duIG1vZGVcbiAgICAgICAgICBpZiAoc2VsZWN0aW9uLnR5cGUgPT0gXCJSYW5nZVwiICYmICQuY29udGFpbnMoZWxlbWVudFswXSwgc2VsZWN0aW9uLmZvY3VzTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJrSGVscGVyLmlzTm90ZWJvb2tMb2NrZWQoKSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJBXCIpIHJldHVybjsgLy8gRG9uJ3QgZWRpdCBpZiBjbGlja2luZyBhIGxpbmtcblxuICAgICAgICAgIHNjb3BlLm1vZGUgPSAnZWRpdCc7XG5cbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBjb250ZW50IG9mIG1hcmt1cCB3aGVuIHRvZ2dsaW5nIHRvIGVkaXQgbW9kZSB0byBwcmV2ZW50XG4gICAgICAgICAgICAvLyBmbGFzaCB3aGVuIHRvZ2dsaW5nIGJhY2sgdG8gcHJldmlldyBtb2RlLlxuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcubWFya3VwJykuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIHZhciBjbSA9IHNjb3BlLmNtO1xuICAgICAgICAgICAgY20uc2V0VmFsdWUoc2NvcGUuY2VsbG1vZGVsW2NvbnRlbnRBdHRyaWJ1dGVdKTtcbiAgICAgICAgICAgIGNtLmNsZWFySGlzdG9yeSgpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgdmFyIGNsaWNrTG9jYXRpb247XG4gICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gJChldmVudC5kZWxlZ2F0ZVRhcmdldCk7XG4gICAgICAgICAgICAgIHZhciB0b3AgPSB3cmFwcGVyLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHRvcCArIHdyYXBwZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQucGFnZVkgPCAodG9wICsgYm90dG9tKSAvIDIpIHtcbiAgICAgICAgICAgICAgICBjbS5zZXRDdXJzb3IoMCwgMCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmxpbmVDb3VudCgpIC0gMSwgY20uZ2V0TGluZShjbS5sYXN0TGluZSgpKS5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNvZGVNaXJyb3JPcHRpb25zID0gXy5leHRlbmQoYmtDb3JlTWFuYWdlci5jb2RlTWlycm9yT3B0aW9ucyhzY29wZSwgbm90ZWJvb2tDZWxsT3ApLCB7XG4gICAgICAgICAgbGluZU51bWJlcnM6IGZhbHNlLFxuICAgICAgICAgIG1vZGU6IFwibWFya2Rvd25cIixcbiAgICAgICAgICBzbWFydEluZGVudDogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuY20gPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShlbGVtZW50LmZpbmQoXCJ0ZXh0YXJlYVwiKVswXSwgY29kZU1pcnJvck9wdGlvbnMpO1xuXG4gICAgICAgIHNjb3BlLmJrTm90ZWJvb2sucmVnaXN0ZXJGb2N1c2FibGUoc2NvcGUuY2VsbG1vZGVsLmlkLCBzY29wZSk7XG4gICAgICAgIHNjb3BlLmJrTm90ZWJvb2sucmVnaXN0ZXJDTShzY29wZS5jZWxsbW9kZWwuaWQsIHNjb3BlLmNtKTtcblxuICAgICAgICBzY29wZS5jbS5zZXRWYWx1ZShzY29wZS5jZWxsbW9kZWxbY29udGVudEF0dHJpYnV0ZV0pO1xuICAgICAgICBwcmV2aWV3KCk7XG5cbiAgICAgICAgc2NvcGUuY20ub24oXCJibHVyXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3luY0NvbnRlbnRBbmRQcmV2aWV3KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLiRvbignYmVha2VyLmNlbGwuYWRkZWQnLCBmdW5jdGlvbihlLCBjZWxsbW9kZWwpIHtcbiAgICAgICAgICBpZiAoY2VsbG1vZGVsID09PSBzY29wZS5jZWxsbW9kZWwpIHNjb3BlLmVkaXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuYm9keScsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay51bnJlZ2lzdGVyRm9jdXNhYmxlKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUpO1xuICAgICAgICAgIHNjb3BlLmJrTm90ZWJvb2sudW5yZWdpc3RlckNNKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUuY20pO1xuICAgICAgICAgIHNjb3BlLmNtLm9mZigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia01hcmtkb3duQ2VsbCcsIFtcbiAgICAgICdia1Nlc3Npb25NYW5hZ2VyJyxcbiAgICAgICdia0hlbHBlcicsXG4gICAgICAnYmtDb3JlTWFuYWdlcicsXG4gICAgICAnJHRpbWVvdXQnLCBmdW5jdGlvbihcbiAgICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgICAgYmtIZWxwZXIsXG4gICAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICAgICR0aW1lb3V0KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9tYXJrZG93bmNlbGwnXSgpXG4gICAgICAgIH07XG4gICAgICB9XSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTmV3Q2VsbE1lbnUnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsIGJrU2Vzc2lvbk1hbmFnZXIsIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuICAgIHZhciBjZWxsT3BzID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9uZXdjZWxsbWVudVwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29uZmlnOiAnPScsXG4gICAgICAgIGlzTGFyZ2U6ICc9JyxcbiAgICAgICAgcG9zaXRpb246ICdAJ1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgbmV3Q2VsbEZhY3RvcnkgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rTmV3Q2VsbEZhY3RvcnkoKTtcbiAgICAgICAgdmFyIHJlY2VudGx5QWRkZWRMYW5ndWFnZTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbGV2ZWxzID0gWzEsIDIsIDMsIDRdO1xuICAgICAgICAkc2NvcGUuZ2V0TGV2ZWxzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGxldmVscztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubmV3Q29kZUNlbGwgPSBmdW5jdGlvbihldmFsdWF0b3JOYW1lKSB7XG4gICAgICAgICAgdmFyIG5ld0NlbGwgPSBuZXdDZWxsRmFjdG9yeS5uZXdDb2RlQ2VsbChldmFsdWF0b3JOYW1lKTtcbiAgICAgICAgICBhdHRhY2hDZWxsKG5ld0NlbGwpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc2hvd1BsdWdpbk1hbmFnZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0hlbHBlci5zaG93TGFuZ3VhZ2VNYW5hZ2VyKCRzY29wZSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5uZXdNYXJrZG93bkNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IG5ld0NlbGxGYWN0b3J5Lm5ld01hcmtkb3duQ2VsbCgpO1xuICAgICAgICAgIGF0dGFjaENlbGwobmV3Q2VsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm5ld1NlY3Rpb25DZWxsID0gZnVuY3Rpb24obGV2ZWwpIHtcbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IG5ld0NlbGxGYWN0b3J5Lm5ld1NlY3Rpb25DZWxsKGxldmVsKTtcbiAgICAgICAgICBhdHRhY2hDZWxsKG5ld0NlbGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kZWZhdWx0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gYnkgZGVmYXVsdCwgaW5zZXJ0IGEgY29kZSBjZWxsIChhbmQgdXNlIHRoZSBiZXN0IGV2YWx1YXRvciB3aXRoIGJlc3QgZ3Vlc3MpXG4gICAgICAgICAgLy8gSWYgYSBwcmV2IGNlbGwgaXMgZ2l2ZW4sIGZpcnN0IHNjYW4gdG93YXJkIHRvcCBvZiB0aGUgbm90ZWJvb2ssIGFuZCB1c2UgdGhlIGV2YWx1YXRvclxuICAgICAgICAgIC8vIG9mIHRoZSBmaXJzdCBjb2RlIGNlbGwgZm91bmQuIElmIG5vdCBmb3VuZCwgc2NhbiB0b3dhcmQgYm90dG9tLCBhbmQgdXNlIHRoZSBldmFsdWF0b3JcbiAgICAgICAgICAvLyBvZiB0aGUgZmlyc3QgY29kZSBjZWxsIGZvdW5kLlxuICAgICAgICAgIC8vIElmIGEgcHJldiBjZWxsIGlzIG5vdCBnaXZlbiwgdXNlIHRoZSB2ZXJ5IGxhc3QgY29kZSBjZWxsIGluIHRoZSBub3RlYm9vay5cbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rLCB1c2UgdGhlIGZpcnN0IGV2YWx1YXRvciBpbiB0aGUgbGlzdFxuICAgICAgICAgIHZhciBwcmV2Q2VsbCA9ICRzY29wZS5jb25maWcgJiYgJHNjb3BlLmNvbmZpZy5wcmV2Q2VsbCAmJiAkc2NvcGUuY29uZmlnLnByZXZDZWxsKCk7XG4gICAgICAgICAgdmFyIGNvZGVDZWxsID0gcmVjZW50bHlBZGRlZExhbmd1YWdlXG4gICAgICAgICAgICAgIHx8IChwcmV2Q2VsbCAmJiBjZWxsT3BzLmZpbmRDb2RlQ2VsbChwcmV2Q2VsbC5pZCkpXG4gICAgICAgICAgICAgIHx8IChwcmV2Q2VsbCAmJiBjZWxsT3BzLmZpbmRDb2RlQ2VsbChwcmV2Q2VsbC5pZCwgdHJ1ZSkpXG4gICAgICAgICAgICAgIHx8IGdldExhc3RDb2RlQ2VsbCgpO1xuICAgICAgICAgIHZhciBldmFsdWF0b3JOYW1lID0gY29kZUNlbGwgP1xuICAgICAgICAgICAgICBjb2RlQ2VsbC5ldmFsdWF0b3IgOiBfLmtleXMoYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKSlbMF07XG5cbiAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yTmFtZTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBhdHRhY2hDZWxsKGNlbGwpIHtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgaWYgKCRzY29wZS5jb25maWcgJiYgJHNjb3BlLmNvbmZpZy5hdHRhY2hDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNvbmZpZy5hdHRhY2hDZWxsKGNlbGwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjZWxsT3BzLmluc2VydEZpcnN0KGNlbGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgbGFzdCBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rXG4gICAgICAgIHZhciBnZXRMYXN0Q29kZUNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gXy5sYXN0KGNlbGxPcHMuZ2V0QWxsQ29kZUNlbGxzKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kb24oJ2xhbmd1YWdlQWRkZWQnLCBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICAgIHJlY2VudGx5QWRkZWRMYW5ndWFnZSA9IGRhdGE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS4kb24oJ2NlbGxNYXBSZWNyZWF0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWNlbnRseUFkZGVkTGFuZ3VhZ2UgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICdMaWNlbnNlJyk7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiAnQVMgSVMnIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia05vdGVib29rXG4gKiAtIHRoZSBjb250cm9sbGVyIHRoYXQgcmVzcG9uc2libGUgZm9yIGRpcmVjdGx5IGNoYW5naW5nIHRoZSB2aWV3XG4gKiAtIHJvb3QgY2VsbCArIGV2YWx1YXRvcnMgKyBvdGhlciBzdHVmZnMgc3BlY2lmaWMgdG8gb25lICh0aGUgbG9hZGVkKSBub3RlYm9va1xuICogLSByb290IGNlbGwgaXMganVzdCBhIHNwZWNpYWwgY2FzZSBvZiBhIHNlY3Rpb24gY2VsbFxuICogLSBUT0RPLCB3ZSBhcmUgbWl4aW5nIHRoZSBjb25jZXB0IG9mIGEgbm90ZWJvb2sgYW5kIGEgcm9vdCBzZWN0aW9uIGhlcmVcbiAqIHdlIHdhbnQgdG8gc2VwYXJhdGUgb3V0IHRoZSBsYXlvdXQgc3BlY2lmaWMgc3R1ZmZzKGlkZWEgb2YgYSBzZWN0aW9uKSBmcm9tIG90aGVyXG4gKiBzdHVmZnMgbGlrZSBldmFsdWF0b3IgcGFuZWxcbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia05vdGVib29rJywgZnVuY3Rpb24gKFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICBia091dHB1dExvZykge1xuICAgIHZhciBDRUxMX1RZUEUgPSAnbm90ZWJvb2snO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25vdGVib29rJ10oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHNldEJrTm90ZWJvb2s6ICcmJyxcbiAgICAgICAgaXNMb2FkaW5nOiAnPSdcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgdmFyIF9pbXBsID0ge1xuICAgICAgICAgIF92aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIF9kZWJ1Z2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgX3Nob3dPdXRwdXQ6IGZhbHNlLFxuICAgICAgICAgICAgX2VkaXRNb2RlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICB0b2dnbGVTaG93T3V0cHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dPdXRwdXQgPSAhdGhpcy5fc2hvd091dHB1dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlT3V0cHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dPdXRwdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1Nob3dpbmdPdXRwdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dPdXRwdXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlQWR2YW5jZWRNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdGhpcy5fYWR2YW5jZWRNb2RlID0gIXRoaXMuX2FkdmFuY2VkTW9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FkdmFuY2VkTW9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAhISh0aGlzLl9hZHZhbmNlZE1vZGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEVkaXRNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRNb2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEVkaXRNb2RlOiBmdW5jdGlvbihtb2RlKSB7XG4gICAgICAgICAgICAgIGJrSGVscGVyLnNldElucHV0Q2VsbEtleU1hcE1vZGUobW9kZSk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRNb2RlID0gbW9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBBZGQgZWRpdCBtb2RlXG4gICAgICAgICAgICBpc0hpZXJhcmNoeUVuYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gISEodGhpcy5faGllcmFyY2h5RW5hYmxlZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlSGllcmFyY2h5RW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2hpZXJhcmNoeUVuYWJsZWQgPSAhdGhpcy5faGllcmFyY2h5RW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVEZWJ1Z2dpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVidWdnaW5nID0gIXRoaXMuX2RlYnVnZ2luZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0RlYnVnZ2luZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVidWdnaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Vmlld01vZGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlld01vZGVsO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2hhcmVBbmRPcGVuUHVibGlzaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBUT0RPLCB0aGlzIGlzIGFuIHVnbHkgaGFjay4gTmVlZCByZWZhY3RvcmluZy5cbiAgICAgICAgICAgIHNoYXJlTWVudS5pdGVtc1swXS5hY3Rpb24oKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlbGV0ZUFsbE91dHB1dENlbGxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCkuZGVsZXRlQWxsT3V0cHV0Q2VsbHMoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9mb2N1c2FibGVzOiB7fSwgLy8gbWFwIG9mIGZvY3VzYWJsZShlLmcuIGNvZGUgbWlycm9yIGluc3RhbmNlcykgd2l0aCBjZWxsIGlkIGJlaW5nIGtleXNcbiAgICAgICAgICByZWdpc3RlckZvY3VzYWJsZTogZnVuY3Rpb24gKGNlbGxJZCwgZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2FibGVzW2NlbGxJZF0gPSBmb2N1c2FibGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1bnJlZ2lzdGVyRm9jdXNhYmxlOiBmdW5jdGlvbiAoY2VsbElkKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZm9jdXNhYmxlc1tjZWxsSWRdO1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNhYmxlc1tjZWxsSWRdID0gbnVsbDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEZvY3VzYWJsZTogZnVuY3Rpb24gKGNlbGxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzYWJsZXNbY2VsbElkXTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9jb2RlTWlycm9yczoge30sXG4gICAgICAgICAgcmVnaXN0ZXJDTTogZnVuY3Rpb24gKGNlbGxJZCwgY20pIHtcbiAgICAgICAgICAgIHRoaXMuX2NvZGVNaXJyb3JzW2NlbGxJZF0gPSBjbTtcbiAgICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgdGhpcy5fY21LZXlNYXBNb2RlKTtcbiAgICAgICAgICAgIGNtLnNldE9wdGlvbigndmltTW9kZScsIHRoaXMuX2NtS2V5TWFwTW9kZSA9PSAndmltJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1bnJlZ2lzdGVyQ006IGZ1bmN0aW9uIChjZWxsSWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jb2RlTWlycm9yc1tjZWxsSWRdO1xuICAgICAgICAgICAgdGhpcy5fY29kZU1pcnJvcnNbY2VsbElkXSA9IG51bGw7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfY21LZXlNYXBNb2RlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgc2V0Q01LZXlNYXBNb2RlOiBmdW5jdGlvbiAoa2V5TWFwTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5fY21LZXlNYXBNb2RlID0ga2V5TWFwTW9kZTtcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLl9jb2RlTWlycm9ycywgZnVuY3Rpb24gKGNtKSB7XG4gICAgICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywga2V5TWFwTW9kZSk7XG4gICAgICAgICAgICAgIGNtLnNldE9wdGlvbigndmltTW9kZScsIGtleU1hcE1vZGUgPT0gJ3ZpbScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRDTUtleU1hcE1vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbUtleU1hcE1vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc2V0QmtOb3RlYm9vayh7YmtOb3RlYm9vazogX2ltcGx9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7IHJldHVybiAnMScgfVxuXG4gICAgICAgICRzY29wZS5pc0xvY2tlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzTG9ja2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaXNEZWJ1Z2dpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9pbXBsLl92aWV3TW9kZWwuaXNEZWJ1Z2dpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzU2hvd2luZ091dHB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc1Nob3dpbmdPdXRwdXQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2hvd0RlYnVnVHJlZSA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUuZ2V0Tm90ZWJvb2tNb2RlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRSYXdOb3RlYm9va01vZGVsKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jbGVhck91dHB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICBkYXRhdHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgdXJsOiBia1V0aWxzLnNlcnZlclVybCgnYmVha2VyL3Jlc3Qvb3V0cHV0bG9nL2NsZWFyJyksXG4gICAgICAgICAgICBkYXRhOiB7fX0pO1xuICAgICAgICAgICRzY29wZS5vdXRwdXRMb2cgPSBbXTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmhpZGVPdXRwdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX2ltcGwuX3ZpZXdNb2RlbC5oaWRlT3V0cHV0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzQWR2YW5jZWRNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzQWR2YW5jZWRNb2RlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzSGllcmFyY2h5RW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc0hpZXJhcmNoeUVuYWJsZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2hvd1N0ZE91dCA9IHRydWU7XG4gICAgICAgICRzY29wZS5zaG93U3RkRXJyID0gdHJ1ZTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlU3RkT3V0ID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICRzY29wZS5zaG93U3RkT3V0ID0gISRzY29wZS5zaG93U3RkT3V0O1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTdGRFcnIgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCRldmVudCkgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgJHNjb3BlLnNob3dTdGRFcnIgPSAhJHNjb3BlLnNob3dTdGRFcnI7XG4gICAgICAgIH07XG5cbiAgICAgICAgYmtPdXRwdXRMb2cuZ2V0TG9nKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAkc2NvcGUub3V0cHV0TG9nID0gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICBia091dHB1dExvZy5zdWJzY3JpYmUoZnVuY3Rpb24gKHJlcGx5KSB7XG4gICAgICAgICAgaWYgKCFfaW1wbC5fdmlld01vZGVsLmlzU2hvd2luZ091dHB1dCgpKSB7XG4gICAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLnRvZ2dsZVNob3dPdXRwdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNjb3BlLm91dHB1dExvZy5wdXNoKHJlcGx5LmRhdGEpO1xuICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAvLyBTY3JvbGwgdG8gYm90dG9tIHNvIHRoaXMgb3V0cHV0IGlzIHZpc2libGUuXG4gICAgICAgICAgJC5lYWNoKCQoJy5vdXRwdXRsb2dib3gnKSxcbiAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGksIHYpIHtcbiAgICAgICAgICAgICAgICAgICAkKHYpLnNjcm9sbFRvcCh2LnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG1hcmdpbiA9ICQoJy5vdXRwdXRsb2dzdGRvdXQnKS5wb3NpdGlvbigpLnRvcDtcbiAgICAgICAgdmFyIG91dHB1dExvZ0hlaWdodCA9IDMwMDtcbiAgICAgICAgdmFyIGRyYWdIZWlnaHQ7XG4gICAgICAgIHZhciBmaXhPdXRwdXRMb2dQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKCcub3V0cHV0bG9nY29udGFpbmVyJykuY3NzKCd0b3AnLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSBvdXRwdXRMb2dIZWlnaHQpO1xuICAgICAgICAgICQoJy5vdXRwdXRsb2djb250YWluZXInKS5jc3MoJ2hlaWdodCcsIG91dHB1dExvZ0hlaWdodCk7XG4gICAgICAgICAgJCgnLm91dHB1dGxvZ2JveCcpLmNzcygnaGVpZ2h0Jywgb3V0cHV0TG9nSGVpZ2h0IC0gbWFyZ2luIC0gNSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS51bnJlZ2lzdGVycyA9IFtdO1xuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZpeE91dHB1dExvZ1Bvc2l0aW9uKTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplJywgZml4T3V0cHV0TG9nUG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRyYWdTdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZHJhZ0hlaWdodCA9IG91dHB1dExvZ0hlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG91dHB1dGxvZ2hhbmRsZSA9ICQoJy5vdXRwdXRsb2doYW5kbGUnKTtcbiAgICAgICAgb3V0cHV0bG9naGFuZGxlLmRyYWcoJ3N0YXJ0JywgZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgICAgICRzY29wZS51bnJlZ2lzdGVycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG91dHB1dGxvZ2hhbmRsZS5vZmYoJ2RyYWdzdGFydCcsIGRyYWdTdGFydEhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRyYWdIYW5kbGVyID0gZnVuY3Rpb24gKGV2LCBkZCkge1xuICAgICAgICAgIG91dHB1dExvZ0hlaWdodCA9IGRyYWdIZWlnaHQgLSBkZC5kZWx0YVk7XG4gICAgICAgICAgaWYgKG91dHB1dExvZ0hlaWdodCA8IDIwKSB7XG4gICAgICAgICAgICBvdXRwdXRMb2dIZWlnaHQgPSAyMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG91dHB1dExvZ0hlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCAtIDgwKSB7XG4gICAgICAgICAgICBvdXRwdXRMb2dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA4MDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZml4T3V0cHV0TG9nUG9zaXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgb3V0cHV0bG9naGFuZGxlLmRyYWcoZHJhZ0hhbmRsZXIpO1xuICAgICAgICAkc2NvcGUudW5yZWdpc3RlcnMucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBvdXRwdXRsb2doYW5kbGUub2ZmKCdkcmFnJywgZHJhZ0hhbmRsZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyB0aGUgcm9vdFxuICAgICAgICAgIHJldHVybiBub3RlYm9va0NlbGxPcC5nZXRDaGlsZHJlbigncm9vdCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0VtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5nZXRDaGlsZHJlbigpLmxlbmd0aCA9PSAwO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRTaGFyZU1lbnVQbHVnaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihDRUxMX1RZUEUpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNoYXJlTWVudSA9IHtcbiAgICAgICAgICBuYW1lOiAnU2hhcmUnLFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRTaGFyZU1lbnVQbHVnaW4oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNSb290Q2VsbEluaXRpYWxpemF0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5tZW51SXRlbXMgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1J1biBhbGwnLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5ldmFsdWF0ZVJvb3QoJ3Jvb3QnKS5cbiAgICAgICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdJbml0aWFsaXphdGlvbiBDZWxsJyxcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Um9vdENlbGxJbml0aWFsaXphdGlvbighJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpO1xuICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2hhcmVNZW51XG4gICAgICAgIF07XG5cbiAgICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC91dGlsL2dldFByZWZlcmVuY2UnKSwge1xuICAgICAgICAgIHByZWZlcmVuY2U6ICdhZHZhbmNlZC1tb2RlJ1xuICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKGlzQWR2YW5jZWQpIHtcbiAgICAgICAgICBpZiAoX2ltcGwuX3ZpZXdNb2RlbC5pc0FkdmFuY2VkTW9kZSgpICE9IChpc0FkdmFuY2VkID09PSAndHJ1ZScpKSB7XG4gICAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLnRvZ2dsZUFkdmFuY2VkTW9kZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC91dGlsL2dldFByZWZlcmVuY2UnKSwge1xuICAgICAgICAgIHByZWZlcmVuY2U6ICdlZGl0LW1vZGUnXG4gICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZWRpdE1vZGUpIHtcbiAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLnNldEVkaXRNb2RlKGVkaXRNb2RlKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGl2ID0gZWxlbWVudC5maW5kKCcuYmtjZWxsJykuZmlyc3QoKTtcbiAgICAgICAgZGl2LmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vY2xpY2sgaW4gdGhlIGJvcmRlciBvciBwYWRkaW5nIHNob3VsZCB0cmlnZ2VyIG1lbnVcbiAgICAgICAgICBpZiAoYmtVdGlscy5nZXRFdmVudE9mZnNldFgoZGl2LCBldmVudCkgPj0gZGl2LndpZHRoKCkpIHtcbiAgICAgICAgICAgIHZhciBtZW51ID0gZGl2LmZpbmQoJy5ia2NlbGxtZW51JykubGFzdCgpO1xuICAgICAgICAgICAgbWVudS5jc3MoJ3RvcCcsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgbWVudS5jc3MoJ2xlZnQnLCBldmVudC5jbGllbnRYIC0gMTUwKTtcbiAgICAgICAgICAgIG1lbnUuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpLmZpcnN0KCkuZHJvcGRvd24oJ3RvZ2dsZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICBkaXYuYWRkQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGl2LnJlbW92ZUNsYXNzKCdpbml0Y2VsbCcpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLmdldE5vdGVib29rRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2lzSW5pdGlhbGl6YXRpb25DZWxsKCknLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIGRpdi5hZGRDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpdi5yZW1vdmVDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuc2V0QmtOb3RlYm9vayh7YmtOb3RlYm9vazogdW5kZWZpbmVkfSk7XG4gICAgICAgICAgYmtPdXRwdXRMb2cudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBfKHNjb3BlLnVucmVnaXN0ZXJzKS5lYWNoKGZ1bmN0aW9uKHVucmVnaXN0ZXIpIHtcbiAgICAgICAgICAgIHVucmVnaXN0ZXIoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrU2VjdGlvbkNlbGwnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgJHRpbWVvdXQpIHtcbiAgICB2YXIgQ0VMTF9UWVBFID0gXCJzZWN0aW9uXCI7XG4gICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9zZWN0aW9uY2VsbFwiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCA9ICRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkIHx8IGZhbHNlO1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTaG93Q2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCA9ICEkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZDtcbiAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdCgnYmVha2VyLnNlY3Rpb24udG9nZ2xlZCcsICRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzU2hvd0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZDtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldENoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIG5vdGVib29rQ2VsbE9wLmdldENoaWxkcmVuKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUucmVzZXRUaXRsZSA9IGZ1bmN0aW9uKG5ld1RpdGxlKSB7XG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC50aXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwudGl0bGUnLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgIT09IG9sZFZhbCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pbml0aWFsaXphdGlvbicsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5yZW5hbWVJdGVtKHtcbiAgICAgICAgICBuYW1lOiBcIkRlbGV0ZSBjZWxsXCIsXG4gICAgICAgICAgbmV3TmFtZTogXCJEZWxldGUgaGVhZGluZyBhbmQga2VlcCBjb250ZW50c1wiXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW1Ub0hlYWQoe1xuICAgICAgICAgIG5hbWU6IFwiRGVsZXRlIHNlY3Rpb24gYW5kIGFsbCBzdWItc2VjdGlvbnNcIixcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AuZGVsZXRlU2VjdGlvbigkc2NvcGUuY2VsbG1vZGVsLmlkLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiBcIkNoYW5nZSBIZWFkZXIgTGV2ZWxcIixcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkgxXCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5sZXZlbCA9IDE7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJIMlwiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwubGV2ZWwgPSAyO1xuICAgICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiSDNcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmxldmVsID0gMztcbiAgICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkg0XCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5sZXZlbCA9IDQ7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5nZXRTaGFyZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2VsbHMgPSBbJHNjb3BlLmNlbGxtb2RlbF1cbiAgICAgICAgICAgICAgLmNvbmNhdChub3RlYm9va0NlbGxPcC5nZXRBbGxEZXNjZW5kYW50cygkc2NvcGUuY2VsbG1vZGVsLmlkKSk7XG4gICAgICAgICAgdmFyIHVzZWRFdmFsdWF0b3JzTmFtZXMgPSBfKGNlbGxzKS5jaGFpbigpXG4gICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjZWxsLnR5cGUgPT09IFwiY29kZVwiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbGwuZXZhbHVhdG9yO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudW5pcXVlKCkudmFsdWUoKTtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9ycyA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpLmV2YWx1YXRvcnNcbiAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uYW55KHVzZWRFdmFsdWF0b3JzTmFtZXMsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRvci5uYW1lID09PSBldjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2VuZXJhdGVOb3RlYm9vayhldmFsdWF0b3JzLCBjZWxscyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oQ0VMTF9UWVBFKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJSdW4gYWxsXCIsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5ldmFsdWF0ZVJvb3QoJHNjb3BlLmNlbGxtb2RlbC5pZCkuXG4gICAgICAgICAgICAgICAgY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2hhcmVNZW51ID0ge1xuICAgICAgICAgIG5hbWU6IFwiU2hhcmVcIixcbiAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbShzaGFyZU1lbnUpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0U2hhcmVNZW51UGx1Z2luKClcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcmVNZW51Lml0ZW1zID0gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudUl0ZW1zKENFTExfVFlQRSwgJHNjb3BlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiBcIkluaXRpYWxpemF0aW9uIENlbGxcIixcbiAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKSkge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5uZXdDZWxsTWVudUNvbmZpZyA9IHtcbiAgICAgICAgICBpc1Nob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhJHNjb3BlLmNlbGxtb2RlbC5oaWRlVGl0bGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRhY2hDZWxsOiBmdW5jdGlvbihuZXdDZWxsKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5pbnNlcnRBZnRlcigkc2NvcGUuY2VsbG1vZGVsLmlkLCBuZXdDZWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZDZWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia1RleHRDZWxsJywgZnVuY3Rpb24oYmtTZXNzaW9uTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay90ZXh0Y2VsbFwiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5pc0VkaXRhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICFia0hlbHBlci5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciB0ZXh0Ym94ID0gJChlbGVtZW50LmZpbmQoXCIuZWRpdGFibGUtdGV4dFwiKS5maXJzdCgpKTtcbiAgICAgICAgZWxlbWVudC5maW5kKCcuZWRpdGFibGUtdGV4dCcpLmh0bWwoc2NvcGUuY2VsbG1vZGVsLmJvZHkpO1xuICAgICAgICB0ZXh0Ym94LmJpbmQoJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5jZWxsbW9kZWwuYm9keSA9IHRleHRib3guaHRtbCgpLnRyaW0oKTtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLmVkaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0ZXh0Ym94LmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmJvZHknLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgIT09IG9sZFZhbCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiRvbignYmVha2VyLmNlbGwuYWRkZWQnLCBmdW5jdGlvbihlLCBjZWxsbW9kZWwpIHtcbiAgICAgICAgICBpZiAoY2VsbG1vZGVsID09PSBzY29wZS5jZWxsbW9kZWwpIHNjb3BlLmVkaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBjZW50cmFsIGNvbnRyb2wgb2YgYWxsIG91dHB1dCBkaXNwbGF5cy4gSXQgZnVsZmlsbHMgYWN0dWFsIGFuZ3VsYXIgZGlyZWN0aXZlc1xuICogbGF6aWx5IHdoZW4gdXNlciBsb2FkIG91dHB1dCBkaXNwbGF5IHBsdWdpbnMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsub3V0cHV0RGlzcGxheScsIFsnYmsudXRpbHMnLCAgJ25nQW5pbWF0ZScsICduZ1RvdWNoJ10pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsub3V0cHV0RGlzcGxheScpO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia091dHB1dERpc3BsYXknLCBmdW5jdGlvbihcbiAgICAgICRjb21waWxlLCBia091dHB1dERpc3BsYXlGYWN0b3J5LCBia1V0aWxzKSB7XG4gICAgdmFyIGdldFJlc3VsdFR5cGUgPSBmdW5jdGlvbihtb2RlbCkge1xuICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmdldENlbGxNb2RlbCgpKSB7XG4gICAgICAgIGlmIChfLmlzU3RyaW5nKG1vZGVsLmdldENlbGxNb2RlbCgpKSkge1xuICAgICAgICAgIHJldHVybiBcIlN0cmluZ1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBtb2RlbC5nZXRDZWxsTW9kZWwoKS50eXBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgdGVtcGxhdGU6IFwiPGRpdj5PVVRQVVQ8L2Rpdj5cIixcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHR5cGU6IFwiQFwiLFxuICAgICAgICBtb2RlbDogXCI9XCIgLy8gYXNzdW1lIHJlZiB0byBtb2RlbCBkb2Vzbid0IGNoYW5nZSBhZnRlciBkaXJlY3RpdmUgaXMgY3JlYXRlZFxuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgY2hpbGRTY29wZSA9IG51bGw7XG4gICAgICAgIHZhciByZWZyZXNoID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgIGlmIChjaGlsZFNjb3BlKSB7XG4gICAgICAgICAgICBjaGlsZFNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkU2NvcGUgPSBzY29wZS4kbmV3KCk7XG4gICAgICAgICAgY2hpbGRTY29wZS5tb2RlbCA9IHNjb3BlLm1vZGVsO1xuICAgICAgICAgIHZhciByZXN1bHRUeXBlID0gZ2V0UmVzdWx0VHlwZShzY29wZS5tb2RlbCk7XG4gICAgICAgICAgaWYgKHJlc3VsdFR5cGUpIHtcbiAgICAgICAgICAgIGJrVXRpbHMubG9nKFwib3V0cHV0RGlzcGxheVwiLCB7XG4gICAgICAgICAgICAgIHJlc3VsdFR5cGU6IHJlc3VsdFR5cGUsXG4gICAgICAgICAgICAgIGRpc3BsYXlUeXBlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBia091dHB1dERpc3BsYXlGYWN0b3J5LmdldERpcmVjdGl2ZU5hbWUodHlwZSk7XG4gICAgICAgICAgZWxlbWVudC5odG1sKFwiPGRpdiBcIiArIGRpcmVjdGl2ZU5hbWUgKyBcIiBtb2RlbD0nbW9kZWwnPjwvZGl2PlwiKTtcbiAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKGNoaWxkU2NvcGUpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goXCJ0eXBlXCIsIGZ1bmN0aW9uKG5ld1R5cGUsIG9sZFR5cGUpIHtcbiAgICAgICAgICByZWZyZXNoKG5ld1R5cGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJG9uKFwib3V0cHV0RGlzcGxheUZhY3RvcnlVcGRhdGVkXCIsIGZ1bmN0aW9uKGV2ZW50LCB3aGF0KSB7XG4gICAgICAgICAgaWYgKHdoYXQgPT09IFwiYWxsXCIgfHwgd2hhdCA9PT0gc2NvcGUudHlwZSkge1xuICAgICAgICAgICAgcmVmcmVzaChzY29wZS50eXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGNoaWxkU2NvcGUpIHtcbiAgICAgICAgICAgIGNoaWxkU2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgdGhlIGNlbnRyYWwgY29udHJvbCBvZiBhbGwgb3V0cHV0IGRpc3BsYXlzLiBJdCBmdWxmaWxscyBhY3R1YWwgYW5ndWxhciBkaXJlY3RpdmVzXG4gKiBsYXppbHkgd2hlbiB1c2VyIGxvYWQgb3V0cHV0IGRpc3BsYXkgcGx1Z2lucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIE1BWF9DQVBBQ0lUWSA9IDEwMDtcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dERpc3BsYXknKTtcblxuICBtb2R1bGUuZmFjdG9yeShcImJrT3V0cHV0RGlzcGxheUZhY3RvcnlcIiwgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjZSkge1xuXG4gICAgdmFyIGltcGxzID0ge1xuICAgICAgICBcIlRleHRcIjoge1xuICAgICAgICAgIHRlbXBsYXRlOiBcIjxwcmU+e3tnZXRUZXh0KCl9fTwvcHJlPlwiLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmdldFRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIG1vZGVsID0gJHNjb3BlLm1vZGVsLmdldENlbGxNb2RlbCgpO1xuICAgICAgICAgICAgICByZXR1cm4gKG1vZGVsICYmIG1vZGVsLnRleHQpID8gbW9kZWwudGV4dCA6IG1vZGVsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiRGF0ZVwiOiB7XG4gICAgICAgICAgdGVtcGxhdGU6IFwiPHByZT57e2dldERhdGUoKX19PC9wcmU+XCIsXG4gICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgbW9kZWwgPSAkc2NvcGUubW9kZWwuZ2V0Q2VsbE1vZGVsKCk7XG4gICAgICAgICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC50aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IG1vbWVudChtb2RlbC50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIHJldHVybiBtLmZvcm1hdChcIllZWVlNTUREIEhIOm1tOnNzLlNTUyBaWlwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIFwiV2FybmluZ1wiOiB7XG4gICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J291dGxpbmUgd2FybmluZyc+PC9kaXY+IDxwcmUgY2xhc3M9J291dF93YXJuaW5nJz57e21vZGVsLmdldENlbGxNb2RlbCgpLm1lc3NhZ2V9fTwvcHJlPlwiXG4gICAgICB9LFxuICAgICAgXCJFcnJvclwiOiB7XG4gICAgICAgIHRlbXBsYXRlOiBcIjxwcmUgY2xhc3M9J291dF9lcnJvcic+XCIgK1xuICAgICAgICAgICAgXCI8c3BhbiBuZy1zaG93PSdjYW5FeHBhbmQnIGNsYXNzPSd0b2dnbGUtZXJyb3InIG5nLWNsaWNrPSdleHBhbmRlZCA9ICFleHBhbmRlZCc+e3tleHBhbmRlZCA/ICctJyA6ICcrJ319PC9zcGFuPlwiICtcbiAgICAgICAgICAgIFwiPHNwYW4gbmctYmluZC1odG1sPSdzaG9ydEVycm9yJz48L3NwYW4+PC9wcmU+XCIgK1xuICAgICAgICAgICAgXCI8cHJlIG5nLXNob3c9J2V4cGFuZGVkJz48c3BhbiBuZy1iaW5kLWh0bWw9J2xvbmdFcnJvcic+PC9zcGFuPlwiICtcbiAgICAgICAgICAgIFwiPC9wcmU+XCIsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgICAkc2NvcGUuZXhwYW5kZWQgPSBmYWxzZTtcblxuICAgICAgICAgICRzY29wZS4kd2F0Y2goJ21vZGVsLmdldENlbGxNb2RlbCgpJywgZnVuY3Rpb24oY2VsbE1vZGVsKSB7XG4gICAgICAgICAgICB2YXIgb3V0cHV0cyA9ICRlbGVtZW50LmZpbmQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdChjZWxsTW9kZWwpO1xuXG4gICAgICAgICAgICAkc2NvcGUuc2hvcnRFcnJvciAgID0gJHNjZS50cnVzdEFzSHRtbChlcnJvcnNbMF0pO1xuICAgICAgICAgICAgJHNjb3BlLmNhbkV4cGFuZCAgICA9IGVycm9ycy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgJHNjb3BlLmxvbmdFcnJvciAgICA9ICRzY2UudHJ1c3RBc0h0bWwoZXJyb3JzLnNsaWNlKDEpLmpvaW4oXCJcXG5cIikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJIdG1sXCI6IHtcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdj48L2Rpdj5cIixcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCBia0NlbGxNZW51UGx1Z2luTWFuYWdlcikge1xuICAgICAgICAgICRzY29wZS5nZXRTaGFyZU1lbnVQbHVnaW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oXCJia28taHRtbFwiKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgICRzY29wZS4kd2F0Y2goXCJnZXRTaGFyZU1lbnVQbHVnaW4oKVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBuZXdJdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhcImJrby1odG1sXCIsICRzY29wZSk7XG4gICAgICAgICAgICAkc2NvcGUubW9kZWwucmVzZXRTaGFyZU1lbnVJdGVtcyhuZXdJdGVtcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgIHZhciBkaXYgPSBlbGVtZW50LmZpbmQoXCJkaXZcIikuZmlyc3QoKTtcbiAgICAgICAgICB2YXIgY2VsbE1vZGVsID0gc2NvcGUubW9kZWwuZ2V0Q2VsbE1vZGVsKCk7XG4gICAgICAgICAgZGl2Lmh0bWwoY2VsbE1vZGVsKTtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goJ21vZGVsLmdldENlbGxNb2RlbCgpJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgIGRpdi5odG1sKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiT3V0cHV0Q29udGFpbmVyXCI6IHtcbiAgICAgICAgdGVtcGxhdGU6ICc8YmstY29kZS1jZWxsLW91dHB1dCBuZy1yZXBlYXQ9XCJpIGluIGl0ZW1zXCIgbW9kZWw9XCJpXCIgPicgK1xuICAgICAgICAgICAgJzwvIGJrLWNvZGUtY2VsbC1vdXRwdXQ+JyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICBtb2RlbDogXCI9XCJcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgJHNjb3BlLml0ZW1zID0gXygkc2NvcGUubW9kZWwuZ2V0Q2VsbE1vZGVsKCkuaXRlbXMpLm1hcChmdW5jdGlvbihpdCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcmVzdWx0OiBpdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkc2NvcGUuaXNTaG93TWVudSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHR5cGVzID0gW1wiVGV4dFwiLCBcIkRhdGVcIiwgXCJCZWFrZXJTdGFuZGFyZE91dHB1dFwiLCBcIkJlYWtlclN0YW5kYXJkRXJyb3JcIiwgXCJXYXJuaW5nXCIsIFwiRXJyb3JcIiwgXCJIdG1sXCIsIFwiT3V0cHV0Q29udGFpbmVyXCJdO1xuICAgIHZhciByZWZyZXNoID0gZnVuY3Rpb24od2hhdCwgc2NvcGUpIHtcbiAgICAgIGlmICghd2hhdCkge1xuICAgICAgICB3aGF0ID0gXCJhbGxcIjtcbiAgICAgIH1cbiAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgfVxuICAgICAgc2NvcGUuJGJyb2FkY2FzdChcImJrT3V0cHV0RGlzcGxheUZhY3RvcnlcIiwgd2hhdCk7XG4gICAgICBzY29wZS4kJHBoYXNlIHx8IHNjb3BlLiRhcHBseSgpO1xuICAgIH07XG4gICAgdmFyIHNldEltcGwgPSBmdW5jdGlvbihpbmRleCwgdHlwZSwgaW1wbCkge1xuICAgICAgdHlwZXNbaW5kZXhdID0gdHlwZTtcbiAgICAgIGltcGxzW3R5cGVdID0gaW1wbDtcbiAgICAgIHJlZnJlc2godHlwZSk7XG4gICAgfTtcbiAgICB2YXIgcmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXAgPSB7XG4gICAgICAvLyBUaGUgZmlyc3QgaW4gdGhlIGFycmF5IHdpbGwgYmUgdXNlZCBhcyBkZWZhdWx0XG4gICAgICBcInRleHRcIjogW1wiVGV4dFwiLCBcIkh0bWxcIiwgXCJMYXRleFwiXSxcbiAgICAgIFwiRGF0ZVwiOiBbXCJEYXRlXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiVGFibGVEaXNwbGF5XCI6IFtcIlRhYmxlXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiaHRtbFwiOiBbXCJIdG1sXCJdLFxuICAgICAgXCJJbWFnZUljb25cIjogW1wiSW1hZ2VcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJCZWFrZXJEaXNwbGF5XCI6IFtcIkJlYWtlckRpc3BsYXlcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJQbG90XCI6IFtcIlBsb3RcIiwgXCJDaGFydFwiLCBcIlRleHRcIl0sXG4gICAgICBcIlRpbWVQbG90XCI6IFtcIlBsb3RcIiwgXCJDaGFydFwiLCBcIlRleHRcIl0sXG4gICAgICBcIk5hbm9QbG90XCI6IFtcIlBsb3RcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJDb21iaW5lZFBsb3RcIjogW1wiQ29tYmluZWRQbG90XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiSGlkZGVuT3V0cHV0Q2VsbFwiOiBbXCJIaWRkZW5cIl0sXG4gICAgICBcIldhcm5pbmdcIjogW1wiV2FybmluZ1wiXSxcbiAgICAgIFwiQmVha2VyT3V0cHV0Q29udGFpbmVyRGlzcGxheVwiOiBbXCJPdXRwdXRDb250YWluZXJcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJPdXRwdXRDb250YWluZXJDZWxsXCI6IFtcIk91dHB1dENvbnRhaW5lclwiLCBcIlRleHRcIl0sXG4gICAgICBcIk91dHB1dENvbnRhaW5lclwiOiBbXCJPdXRwdXRDb250YWluZXJcIiwgXCJUZXh0XCJdXG4gICAgfTtcbiAgICB2YXIgZmFjdG9yeSA9IHtcbiAgICAgIGFkZDogZnVuY3Rpb24odHlwZSwgaW1wbCkge1xuICAgICAgICBpZiAodHlwZXMubGVuZ3RoID4gTUFYX0NBUEFDSVRZKSB7XG4gICAgICAgICAgdGhyb3cgXCJDYW5ub3QgYWRkIG91dHB1dDogXCIgKyB0eXBlICtcbiAgICAgICAgICAgICAgXCIsIG1heCBvdXRwdXQgZGlzcGxheSBjYXBhY2l0eShcIiArIE1BWF9DQVBBQ0lUWSArXG4gICAgICAgICAgICAgIFwiKSByZWFjaGVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIHRvIHRoZSBlbmRcbiAgICAgICAgc2V0SW1wbCh0eXBlcy5sZW5ndGgsIHR5cGUsIGltcGwpO1xuICAgICAgfSxcbiAgICAgIGdldDogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlc1tpbmRleF07XG4gICAgICAgIHJldHVybiB0aGlzLmdldEltcGwodHlwZSk7XG4gICAgICB9LFxuICAgICAgZ2V0SW1wbDogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICBpZiAodHlwZSAmJiBpbXBsc1t0eXBlXSkge1xuICAgICAgICAgIHJldHVybiBpbXBsc1t0eXBlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaW1wbHNbXCJ0ZXh0XCJdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RGlyZWN0aXZlTmFtZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0eXBlcy5pbmRleE9mKHR5cGUpO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgaW5kZXggPSB0eXBlcy5pbmRleE9mKFwiVGV4dFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJia29cIiArIGluZGV4O1xuICAgICAgfSxcbiAgICAgIGFkZE91dHB1dERpc3BsYXlUeXBlOiBmdW5jdGlvbih0eXBlLCBkaXNwbGF5cywgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcFt0eXBlXSkge1xuICAgICAgICAgIHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwW3R5cGVdID0gZGlzcGxheXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShyZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcFt0eXBlXSwgW2luZGV4LCAwXS5jb25jYXQoZGlzcGxheXMpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEFwcGxpY2FibGVEaXNwbGF5czogKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaXNKU09OID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gdHJ1ZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaXNIVE1MID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gL148W2Etel1bXFxzXFxTXSo+L2kudGVzdCh2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcIkhpZGRlblwiXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXN1bHQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHJldCA9IFtcIlRleHRcIiwgXCJIdG1sXCIsIFwiTGF0ZXhcIl07XG4gICAgICAgICAgICBpZiAoaXNKU09OKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgcmV0LnB1c2goXCJKc29uXCIsIFwiVmVnYVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0hUTUwocmVzdWx0KSkge1xuICAgICAgICAgICAgICByZXQgPSBbXCJIdG1sXCIsIFwiVGV4dFwiLCBcIkxhdGV4XCJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdFswXSkpIHtcbiAgICAgICAgICAgICAgICByZXQucHVzaChcIlRhYmxlXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXAuaGFzT3duUHJvcGVydHkocmVzdWx0LnR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXBbcmVzdWx0LnR5cGVdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiVGV4dFwiXTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSgpXG4gICAgfTtcbiAgICBiZWFrZXIub3V0cHV0RGlzcGxheUZhY3RvcnkgPSBmYWN0b3J5O1xuICAgIGZvciAodmFyIGtleSBpbiBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5RmFjdG9yeSkge1xuICAgICAgYmVha2VyLm91dHB1dERpc3BsYXlGYWN0b3J5LmFkZChrZXksIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlGYWN0b3J5W2tleV0pO1xuICAgIH1cbiAgICBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5RmFjdG9yeSA9IG51bGw7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVR5cGUpIHtcbiAgICAgIHZhciBkaXNwbGF5cyA9IGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlUeXBlW2tleV07XG4gICAgICBmYWN0b3J5LmFkZE91dHB1dERpc3BsYXlUeXBlKGtleSwgZGlzcGxheXMpO1xuICAgIH1cbiAgICBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5VHlwZSA9IG51bGw7XG5cbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfSk7XG5cbiAgXyhfLnJhbmdlKE1BWF9DQVBBQ0lUWSkpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgIG1vZHVsZS5kaXJlY3RpdmUoXCJia29cIiArIGksXG4gICAgICAgIGZ1bmN0aW9uKGJrT3V0cHV0RGlzcGxheUZhY3RvcnksIGJrT3V0cHV0RGlzcGxheVNlcnZpY2VNYW5hZ2VyLCAkaW5qZWN0b3IpIHtcbiAgICAgIHZhciBpbXBsID0gYmtPdXRwdXREaXNwbGF5RmFjdG9yeS5nZXQoaSk7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKGltcGwpKSB7XG4gICAgICAgIHJldHVybiBpbXBsKGJrT3V0cHV0RGlzcGxheVNlcnZpY2VNYW5hZ2VyLCAkaW5qZWN0b3IpO1xuICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoaW1wbCkpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltcGwubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBpdCA9IGltcGxbal07XG4gICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhpdCkpIHtcbiAgICAgICAgICAgICAgaWYgKGJrT3V0cHV0RGlzcGxheVNlcnZpY2VNYW5hZ2VyLmhhcyhpdCkpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXIuZ2V0KGl0KSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoJGluamVjdG9yLmhhcyhpdCkpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goJGluamVjdG9yLmdldChpdCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiYmVha2VyIGNvdWxkIG5vdCBmaW5kIHByb3ZpZGVyIGZvciBia29GYWN0b3J5IFwiICsgaXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0Z1bmN0aW9uKGl0KSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGltcGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgY2VudHJhbCBjb250cm9sIG9mIGFsbCBvdXRwdXQgZGlzcGxheXMuIEl0IGZ1bGZpbGxzIGFjdHVhbCBhbmd1bGFyIGRpcmVjdGl2ZXNcbiAqIGxhemlseSB3aGVuIHVzZXIgbG9hZCBvdXRwdXQgZGlzcGxheSBwbHVnaW5zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsub3V0cHV0RGlzcGxheScpO1xuICBtb2R1bGUuZmFjdG9yeShcImJrT3V0cHV0RGlzcGxheVNlcnZpY2VNYW5hZ2VyXCIsIGZ1bmN0aW9uKCRpbmplY3Rvcikge1xuICAgIHZhciBzZXJ2aWNlcyA9IHt9O1xuICAgIHZhciBmYWN0b3J5ID0ge1xuICAgICAgZ2V0U2VydmljZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2VydmljZXM7XG4gICAgICB9LFxuICAgICAgYWRkU2VydmljZTogZnVuY3Rpb24oa2V5LCBpbXBsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW1wbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgc2VydmljZXNba2V5XSA9IGltcGwoJGluamVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW1wbCkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW1wbC5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGl0ID0gaW1wbFtqXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHNlcnZpY2VzLmhhc093blByb3BlcnR5KGl0KSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzZXJ2aWNlc1tpdF0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRpbmplY3Rvci5oYXMoaXQpKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKCRpbmplY3Rvci5nZXQoaXQpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICBzZXJ2aWNlc1trZXldID0gaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VydmljZXNba2V5XSA9IGltcGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gc2VydmljZXMuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICAgIH0sXG4gICAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gc2VydmljZXNba2V5XTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlTZXJ2aWNlKSB7XG4gICAgICB2YXIgaW1wbCA9IGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlTZXJ2aWNlW2tleV07XG4gICAgICBmYWN0b3J5LmFkZFNlcnZpY2Uoa2V5LCBpbXBsKTtcbiAgICB9XG4gICAgYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVNlcnZpY2UgPSBudWxsO1xuICAgIGJlYWtlci5vdXRwdXREaXNwbGF5U2VydmljZSA9IGZhY3Rvcnk7XG4gICAgcmV0dXJuIGZhY3Rvcnk7XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSBmb3IgdGhlIFVJIHRoYXQgc2hvd3MgdGhlIGxpc3Qgb2YgZXZhbHVhdG9ycyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZ1xuICogc2V0dGluZ3MgcGFuZWwuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29yZScpO1xuXG4gIG1vZHVsZS5jb250cm9sbGVyKCdwbHVnaW5NYW5hZ2VyQ3RybCcsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAnYmtDb3JlTWFuYWdlcicsICdia1Nlc3Npb25NYW5hZ2VyJywgJ2JrTWVudVBsdWdpbk1hbmFnZXInLCAnYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrRXZhbHVhdG9yTWFuYWdlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJG1vZGFsSW5zdGFuY2UsIGJrQ29yZU1hbmFnZXIsYmtTZXNzaW9uTWFuYWdlciwgYmtNZW51UGx1Z2luTWFuYWdlciwgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyKSB7XG5cblxuICAgICRzY29wZS5kb0Nsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLnNob3dVUkwgPSBmYWxzZTtcbiAgICAgICRzY29wZS5ldmFsVGFiT3Auc2hvd1dhcm5pbmcgPSBmYWxzZTtcbiAgICAgICRzY29wZS5ldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5mb3JjZUxvYWQgPSBmYWxzZTtcbiAgICAgICRzY29wZS5ldmFsVGFiT3AubmV3UGx1Z2luTmFtZU9yVXJsID0gXCJcIjtcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKFwib2tcIik7XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRFdmFsdWF0b3JEZXRhaWxzID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRWaXN1YWxQYXJhbXMobmFtZSk7XG4gICAgfTtcblxuICAgICRzY29wZS5ldmFsVGFiT3AgPSB7XG4gICAgICBuZXdQbHVnaW5OYW1lT3JVcmw6IFwiXCIsXG4gICAgICBzaG93VVJMOiBmYWxzZSxcbiAgICAgIHNob3dXYXJuaW5nOiBmYWxzZSxcbiAgICAgIHNob3dTZWN1cml0eVdhcm5pbmc6IGZhbHNlLFxuICAgICAgZm9yY2VMb2FkOiBmYWxzZSxcbiAgICAgIGdldEFsbEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JzV2l0aFNwZWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWN0aXZlUGx1Z2lucyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBhY3RpdmVQbHVnaW5zKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGFjdGl2ZVBsdWdpbnNbcF0uc3BlYykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0W3BdID0gYWN0aXZlUGx1Z2luc1twXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBnZXRMb2FkaW5nRXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0TG9hZGluZ0V2YWx1YXRvcnMoKTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JTdGF0dXNlczogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIga25vd25QbHVnaW5zID0gYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuZ2V0S25vd25FdmFsdWF0b3JQbHVnaW5zKCk7XG4gICAgICAgIHZhciBhY3RpdmVQbHVnaW5zID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgdmFyIGxvYWRpbmdQbHVnaW5zID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldExvYWRpbmdFdmFsdWF0b3JzKCk7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBrbm93blBsdWdpbnMpIHtcbiAgICAgICAgICB2YXIgc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGFjdGl2ZVBsdWdpbnNbcF0pXG4gICAgICAgICAgICBzdGF0dXMgPSBcImFjdGl2ZVwiO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgbCBpbiBsb2FkaW5nUGx1Z2lucykge1xuICAgICAgICAgICAgICBpZiAobG9hZGluZ1BsdWdpbnNbbF0ucGx1Z2luID09IHApIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBcImxvYWRpbmdcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgICAgICAgc3RhdHVzID0gXCJrbm93blwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHRbcF0gPSBzdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBzZXROZXdQbHVnaW5OYW1lT3JVcmw6IGZ1bmN0aW9uKHBsdWdpbk5hbWVPclVybCkge1xuICAgICAgICB0aGlzLm5ld1BsdWdpbk5hbWVPclVybCA9IHBsdWdpbk5hbWVPclVybDtcbiAgICAgIH0sXG4gICAgICB0b2dnbGVQbHVnaW46IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIHBsdWdpbiA9IG5hbWUgfHwgdGhpcy5uZXdQbHVnaW5OYW1lT3JVcmw7XG4gICAgICAgIHZhciBmcm9tVXJsID0gbmFtZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgdmFyIHN0YXR1cyA9IHRoaXMuZ2V0RXZhbHVhdG9yU3RhdHVzZXMoKVtwbHVnaW5dO1xuXG4gICAgICAgIGlmICghZnJvbVVybCAmJiAhXy5jb250YWlucyhbJ2FjdGl2ZScsICdrbm93biddLCBzdGF0dXMpKSByZXR1cm47XG4gICAgICAgIC8vIGZvciBub3csIGlmIHRoZSBwbHVnaW4gaXNuJ3QgZnJvbSBhIFVSTCBvciBhY3RpdmUgb3Iga25vd25cbiAgICAgICAgLy8gKG5hbWVseSBsb2FkaW5nKSByZXR1cm4uXG4gICAgICAgIC8vIFRPRE86IG90aGVyIHN0YXRlcyB3ZSBzaG91bGQgc3VwcG9ydDogZmFpbGVkIGFuZCBleGl0aW5nLlxuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgLy8gdHVybiBvZmYgZXZhbHVhdG9yIGlmIG9uXG4gICAgICAgICAgaWYgKCFia1Nlc3Npb25NYW5hZ2VyLmV2YWx1YXRvclVudXNlZChwbHVnaW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWxUYWJPcC5zaG93V2FybmluZyA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5yZW1vdmVFdmFsdWF0b3IocGx1Z2luKTtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkucmVtb3ZlRXZhbHVhdG9yKHBsdWdpbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb3RoZXJ3aXNlLCB0dXJuIG9uIGV2YWx1YXRvclxuICAgICAgICAgIGlmIChmcm9tVXJsKSB7XG4gICAgICAgICAgICB2YXIgciA9IG5ldyBSZWdFeHAoJ14oPzpbYS16XSs6KT8vLycsICdpJyk7XG4gICAgICAgICAgICBpZiAoci50ZXN0KHBsdWdpbikgJiYgISRzY29wZS5ldmFsVGFiT3AuZm9yY2VMb2FkKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbFRhYk9wLnNob3dTZWN1cml0eVdhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkc2NvcGUuZXZhbFRhYk9wLmZvcmNlTG9hZCA9IGZhbHNlO1xuICAgICAgICAgICAgJHNjb3BlLmV2YWxUYWJPcC5uZXdQbHVnaW5OYW1lT3JVcmwgPSBcIlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBuZXdFdmFsID0geyBuYW1lOiAnJywgcGx1Z2luOiBwbHVnaW4gfTtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmFkZEV2YWx1YXRvcihuZXdFdmFsKTtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuYWRkRXZhbHVhdG9yKG5ld0V2YWwpO1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnbGFuZ3VhZ2VBZGRlZCcsIHsgZXZhbHVhdG9yOiBwbHVnaW4gfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLm1lbnVUYWJPcCA9IHtcbiAgICAgIG5ld01lbnVQbHVnaW5Vcmw6IFwiLi9wbHVnaW4vbWVudS9kZWJ1Zy5qc1wiLFxuICAgICAgYWRkTWVudVBsdWdpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmxvYWRNZW51UGx1Z2luKHRoaXMubmV3TWVudVBsdWdpblVybCk7XG4gICAgICB9LFxuICAgICAgZ2V0TWVudVBsdWdpbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGJrTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudVBsdWdpbnMoKTtcbiAgICAgIH0sXG4gICAgICBnZXRMb2FkaW5nUGx1Z2luczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia01lbnVQbHVnaW5NYW5hZ2VyLmdldExvYWRpbmdQbHVnaW5zKCk7XG4gICAgICB9XG4gICAgfTtcblxuICB9XSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgZm9yIHRoZSBVSSB0aGF0IHNob3dzIHRoZSBsaXN0IG9mIGV2YWx1YXRvcnMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmdcbiAqIHNldHRpbmdzIHBhbmVsLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29yZScpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrUGx1Z2luTWFuYWdlckV2YWx1YXRvclNldHRpbmdzJywgZnVuY3Rpb24oXG4gICAgICAkY29tcGlsZSwgYmtTZXNzaW9uTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9wbHVnaW5tYW5hZ2VyL3BsdWdpbm1hbmFnZXJfZXZhbHVhdG9yX3NldHRpbmdzXCJdKCksXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLnNldCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICRzY29wZS5ldmFsdWF0b3IucGVyZm9ybSh2YWwpO1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHNwZWMgPSBfLm1hcChzY29wZS5ldmFsdWF0b3Iuc3BlYywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgIHJldHVybiBfLmV4dGVuZCh7IG5hbWU6IGtleSwga2V5OiBrZXkgfSwgdmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS5wcm9wZXJ0aWVzID0gXy5maWx0ZXIoc3BlYywgZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi50eXBlID09PSBcInNldHRhYmxlU3RyaW5nXCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLmFjdGlvbnMgPSBfLmZpbHRlcihzcGVjLCBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uLnR5cGUgPT09IFwiYWN0aW9uXCI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia0NlbGxcbiAqIC0gdGhlIGNvbnRyb2xsZXIgdGhhdCByZXNwb25zaWJsZSBmb3IgZGlyZWN0bHkgY2hhbmdpbmcgdGhlIHZpZXdcbiAqIC0gdGhlIGNvbnRhaW5lciBmb3Igc3BlY2lmaWMgdHlwZWQgY2VsbFxuICogLSB0aGUgZGlyZWN0aXZlIGlzIGRlc2lnbmVkIHRvIGJlIGNhcGFibGUgb2YgdXNlZCBpbiBhIG5lc3RlZCB3YXlcbiAqIC0gY29uY2VwdHVhbGx5LCBhIGNlbGwgaXMgJ2NlbGwgbW9kZWwnICsgJ3ZpZXcgbW9kZWwnKGFuIGV4YW1wbGUgb2Ygd2hhdCBnb2VzIGluIHRvIHRoZSB2aWV3XG4gKiBtb2RlbCBpcyBjb2RlIGNlbGwgYmcgY29sb3IpXG4gKiAtIEEgYmtDZWxsIGlzIGdlbmVyaWNhbGx5IGNvcnJlc3BvbmRzIHRvIGEgcG9ydGlvbiBvZiB0aGUgbm90ZWJvb2sgbW9kZWwgKGN1cnJlbnRseSwgaXQgaXNcbiAqIGFsd2F5cyBhIGJyYW5jaCBpbiB0aGUgaGllcmFyY2h5KVxuICogLSBXaGVuIGV4cG9ydGluZyAoYS5rLmEuIHNoYXJpbmcpLCB3ZSB3aWxsIG5lZWQgYm90aCB0aGUgY2VsbCBtb2RlbCBhbmQgdGhlIHZpZXcgbW9kZWxcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb3JlJyk7XG5cbiAgbW9kdWxlLmNvbnRyb2xsZXIoJ0NvZGVDZWxsT3B0aW9uc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckbW9kYWxJbnN0YW5jZScsICdkc2NvcGUnLCAnYmtDb3JlTWFuYWdlcicsIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsSW5zdGFuY2UsIGRzY29wZSwgYmtDb3JlTWFuYWdlcikge1xuICAgICRzY29wZS5kc2NvcGUgPSBkc2NvcGU7XG4gICAgJHNjb3BlLmluaXRpYWxpemF0aW9uQ2VsbCA9IGRzY29wZS5pbml0aWFsaXphdGlvbjtcbiAgICAkc2NvcGUuY2VsbE5hbWUgPSBkc2NvcGUuaWQ7XG4gICAgJHNjb3BlLmNlbGxUYWdzID0gZHNjb3BlLnRhZ3M7XG4gICAgJHNjb3BlLmlzSW5pdENlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRpYWxpemF0aW9uQ2VsbDtcbiAgICB9O1xuICAgICRzY29wZS50b2dnbGVJbml0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbml0aWFsaXphdGlvbkNlbGwgPSAhdGhpcy5pbml0aWFsaXphdGlvbkNlbGw7XG4gICAgfTtcbiAgICAkc2NvcGUuc2F2ZURpc2FibGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gISgoIHRoaXMuZ2V0TmFtZUVycm9yKCkgPT09ICcnICkgJiYgKCB0aGlzLmdldFRhZ0Vycm9yKCkgPT09ICcnICkpO1xuICAgIH07XG4gICAgJHNjb3BlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhISRzY29wZS5nZXROYW1lRXJyb3IoKSB8fCAhISRzY29wZS5nZXRUYWdFcnJvcigpO1xuICAgIH07XG4gICAgJHNjb3BlLmdldE5hbWVFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYodGhpcy5kc2NvcGUuaWQgPT09IHRoaXMuY2VsbE5hbWUpXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5jYW5SZW5hbWVDZWxsKHRoaXMuY2VsbE5hbWUpO1xuICAgIH07XG4gICAgJHNjb3BlLmdldFRhZ0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0NlbGxNYW5hZ2VyKCkuY2FuU2V0VXNlclRhZ3ModGhpcy5jZWxsVGFncyk7XG4gICAgfTtcbiAgICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCdjbG9zZScpO1xuICAgIH07XG4gICAgJHNjb3BlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnNhdmVEaXNhYmxlZCgpKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXIgcmViID0gZmFsc2U7XG4gICAgICB0aGlzLmRzY29wZS5pbml0aWFsaXphdGlvbiA9IHRoaXMuaW5pdGlhbGl6YXRpb25DZWxsO1xuICAgICAgaWYgKHRoaXMuZHNjb3BlLnRhZ3MgIT09IHRoaXMuY2VsbFRhZ3MpIHtcbiAgICAgICAgdGhpcy5kc2NvcGUudGFncyA9IHRoaXMuY2VsbFRhZ3M7XG4gICAgICAgIHJlYiA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kc2NvcGUuaWQgIT09IHRoaXMuY2VsbE5hbWUpXG4gICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLnJlbmFtZUNlbGwodGhpcy5kc2NvcGUuaWQsdGhpcy5jZWxsTmFtZSk7XG4gICAgICBlbHNlIGlmKHJlYilcbiAgICAgICAgYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0NlbGxNYW5hZ2VyKCkucmVidWlsZE1hcHMoKVxuICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoJ3NhdmUnKTtcbiAgICB9O1xufV0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuY29tbW9uVXRpbHNcbiAqIC0gdGhpcyBzaG91bGQgYmUgdGhlIG1vc3QgZ2VuZXJhbCB1dGlsaXRpZXMsIHRoZSB1dGlsaXRpZXMgdGhhdCBjb3VsZCBoYXZlIGJlZW4gZm91bmQgaW4gYVxuICogM3JkLXBhcnR5IGxpYnJhcnlcbiAqIGFuZCB3ZSBqdXN0IGhhcHBlbiB0byB3cml0ZSBvdXIgb3duLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb21tb25VdGlscycsIFtdKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2NvbW1vblV0aWxzJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgICAgIHZhciBwb3NzaWJsZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcblxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChsZW5ndGgpKSB7XG4gICAgICAgICAgbGVuZ3RoID0gNjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICB9LFxuICAgICAgbG9hZEpTOiBmdW5jdGlvbih1cmwsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgZS50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgLy8gQWRkIHRoZSB0aW1lIHRvIHRoZSBVUkwgdG8gYXZvaWQgY2FjaGluZy5cbiAgICAgICAgdmFyIG1pbGxpcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBlLnNyYyA9IHVybCArIFwiP189XCIgKyBtaWxsaXM7XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgZS5vbmxvYWQgPSBzdWNjZXNzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmYWlsdXJlKSB7XG4gICAgICAgICAgZS5vbmVycm9yID0gZmFpbHVyZTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGUpO1xuICAgICAgfSxcbiAgICAgIGxvYWRDU1M6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgICAgICBsaW5rLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gICAgICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgfSxcbiAgICAgIGdldEV2ZW50T2Zmc2V0WDogZnVuY3Rpb24oZWxlbSwgZXZlbnQpIHsgLy8gb2Zmc2V0WCBpcyBub3QgZGVmaW5lZCBpbiBmaXJlZm94XG4gICAgICAgIHZhciB4ID0gZXZlbnQub2Zmc2V0WDtcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoeCkgJiYgIV8uaXNVbmRlZmluZWQoZWxlbS5vZmZzZXQpKSB7XG4gICAgICAgICAgeCA9IGV2ZW50LnBhZ2VYIC0gZWxlbS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4O1xuICAgICAgfSxcbiAgICAgIGxvYWRMaXN0OiBmdW5jdGlvbih1cmxzLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgICAgIGlmICh1cmxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGlmIChzdWNjZXNzKVxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3MoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybCA9IHVybHMuc2hpZnQoKTtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkSlModXJsLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBtZS5sb2FkTGlzdCh1cmxzLCBzdWNjZXNzLCBmYWlsdXJlKTtcbiAgICAgICAgfSwgZmFpbHVyZSk7XG4gICAgICB9LFxuICAgICAgZmluZFRhYmxlOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIGZ1bmN0aW9uIGZpbmRDb2x1bW5OYW1lcyhlbGVtKSB7XG4gICAgICAgICAgdmFyIHJvdyA9IGVsZW0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93LmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2gocm93LmNoaWxkcmVuW2ldLmlubmVySFRNTCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRFbnRyaWVzKGVsZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlbS5jaGlsZHJlbltpXS5pbm5lckhUTUwpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kVmFsdWVzKGVsZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goZmluZEVudHJpZXMoZWxlbS5jaGlsZHJlbltpXSkpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGFnID0gZWxlbS50YWdOYW1lO1xuICAgICAgICBpZiAodGFnID09PSAnRElWJykge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHN1YiA9IHRoaXMuZmluZFRhYmxlKGVsZW0uY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgaWYgKHN1YikgcmV0dXJuIHN1YjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhZyA9PT0gJ1RBQkxFJykge1xuICAgICAgICAgIGlmIChlbGVtLmNoaWxkcmVuLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFRvIHByZXZlbnQgZnJvbSBtYW5nbGluZyB1c2VyIGNyZWF0ZWQgaHRtbCB0YWJsZSxcbiAgICAgICAgICAvLyBvbmx5IHVzZSB0YWJsZSBkaXNwbGF5IGZvciBkYXRhZnJhbWUgdGFibGVzIChCRUFLRVItNDU2KVxuICAgICAgICAgIGlmICghXy5jb250YWlucyhlbGVtLmNsYXNzTGlzdCwgJ2RhdGFmcmFtZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIHRhYmxlIGNvbnRhaW5zIGVsZW1lbnRzIHdpdGggY29sc3BhbiBhbmQvb3Igcm93c3BhblxuICAgICAgICAgIC8vIHRoZSBzbG9ja2dyaWQgdGVtcGxhdGUgZG9lcyBub3Qgc3VwcG9ydCB0aGVtICAoQkVBS0VSLTY5NClcbiAgICAgICAgICB2YXIgaGVhZGVyUm93cyA9ICQoZWxlbSkuZmluZCgndGhlYWQnKS5maW5kKCd0cicpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVhZGVyUm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoID0gaGVhZGVyUm93c1tpXS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAodmFyIGo9MDsgajxjaC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICBpZiAoY2hbal0uZ2V0QXR0cmlidXRlKCdjb2xzcGFuJyk+MSB8fCBjaFtqXS5nZXRBdHRyaWJ1dGUoJ3Jvd3NwYW4nKT4xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHZhbHVlUm93cyA9ICQoZWxlbSkuZmluZCgndGJvZHknKS5maW5kKCd0cicpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVSb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB2YWx1ZVJvd3NbaV0uY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKHZhciBqPTA7IGo8Y2gubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNoW2pdLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpPjEgfHwgY2hbal0uZ2V0QXR0cmlidXRlKCdyb3dzcGFuJyk+MSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyBhIHRhYmxlIHdpdGggbXVsdGlwbGUgcm93c1xuICAgICAgICAgIC8vIGN1cnJlbnRseSB0aGUgdGFibGUgZGlzcGxheXMgY2FuJ3QgaGFuZGxlIG11bHRpcGxlIHJvd3Mgb2YgaGVhZGVyIChCRUFLRVItNDE2KVxuICAgICAgICAgIC8vIGFkZGVkIGxvZ2ljIHRvIGNvbGxhcHNlIHRoZSB0d28gaGVhZGVyIHJvd3MgIChCRUFLRVItNjk0KVxuICAgICAgICAgIHZhciBjb2xzID0gW107XG4gICAgICAgICAgaWYgKGhlYWRlclJvd3MubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAvL2lmIHRoZXJlIGFyZSB0d28gcm93cywgYWxsb3cgdGFibGVkaXNwbGF5IGFzIGxvbmcgYXMgbm8gY29sdW1uIGhhcyB2YWx1ZXMgaW4gYm90aCByb3dzXG4gICAgICAgICAgICAvL3RoaXMgaXMgYmVjYXVzZSBwYW5kYXMgcmVuZGVycyBkYXRhZnJhbWVzIHdpdGggdGhlIGluZGV4IGNvbCBoZWFkZXIgb24gYSBzZWNvbmQgcm93XG4gICAgICAgICAgICB2YXIgcm93MCA9IGhlYWRlclJvd3MuZXEoMCkuZmluZCgndGgnKTtcbiAgICAgICAgICAgIHZhciByb3cxID0gaGVhZGVyUm93cy5lcSgxKS5maW5kKCd0aCcpO1xuXHQgICAgdmFyIG1pbiA9IHJvdzAubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG1pbj5yb3cxLmxlbmd0aCkge1xuXHRcdG1pbiA9IHJvdzEubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaW47IGkrKykge1xuICAgICAgICAgICAgICB2YXIgcjAgPSByb3cwLmVxKGkpO1xuICAgICAgICAgICAgICB2YXIgcjEgPSByb3cxLmVxKGkpO1xuXG4gICAgICAgICAgICAgIC8vaWYgYW55IGNvbHVtbiBoYXMgaHRtbCBpbiBib3RoIHJvd3MsIGRvbid0IHVzZSB0YWJsZWRpc3BsYXlcbiAgICAgICAgICAgICAgaWYgKHIwICE9PSB1bmRlZmluZWQgJiYgcjEgIT0gdW5kZWZpbmVkICYmIHIwLmh0bWwoKSAmJiByMS5odG1sKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyMCAhPT0gdW5kZWZpbmVkICYmIHIwLmh0bWwoKSkge1xuXHQgICAgICAgIGNvbHMucHVzaChyMC5odG1sKCkpO1xuXHQgICAgICB9IGVsc2UgaWYgKHIxICE9PSB1bmRlZmluZWQgJiYgcjEuaHRtbCgpKSB7XG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHIxLmh0bWwoKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG5cdFx0Y29scy5wdXNoKFwiXCIpO1xuXHQgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoZWFkZXJSb3dzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vaWYgdGhlcmUgYXJlIHR3byBvciBtb3JlIGhlYWRlciwgZm9yZ2V0IGFib3V0IGl0XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29scyA9IGZpbmRDb2x1bW5OYW1lcygkKGVsZW0pLmZpbmQoJ3RoZWFkJylbMF0pO1xuXHQgIH1cblxuICAgICAgICAgIHZhciB2YWxzID0gZmluZFZhbHVlcygkKGVsZW0pLmZpbmQoJ3Rib2R5JylbMF0pO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIlRhYmxlRGlzcGxheVwiLFxuICAgICAgICAgICAgdGFibGVEaXNwbGF5TW9kZWw6IHtcbiAgICAgICAgICAgICAgY29sdW1uTmFtZXM6IGNvbHMsXG4gICAgICAgICAgICAgIHZhbHVlczogdmFsc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbHVtbk5hbWVzOiBjb2xzLFxuICAgICAgICAgICAgdmFsdWVzOiB2YWxzXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBmb3JtYXRUaW1lU3RyaW5nOiBmdW5jdGlvbihtaWxsaXMpIHtcbiAgICAgICAgaWYgKG1pbGxpcyA8IDYwICogMTAwMCkge1xuICAgICAgICAgIHJldHVybiAobWlsbGlzIC8gMTAwMCkudG9GaXhlZCgxKSArIFwic1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUobWlsbGlzKTtcbiAgICAgICAgICB2YXIgZCA9IE1hdGguZmxvb3IobWlsbGlzIC8gKDI0ICogNjAgKiA2MCAqIDEwMDApKTtcbiAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0VVRDTWludXRlcygpO1xuICAgICAgICAgIHZhciBzID0gZGF0ZS5nZXRVVENTZWNvbmRzKCk7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgaWYgKGQgPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gKGQgKyBcImRcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IChoICsgXCJoXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobSA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAobSArIFwibVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHMgPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gKHMgKyBcInNcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc01pZGRsZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQuYnV0dG9uID09PSAxIC8vIG1pZGRsZSBjbGlja1xuICAgICAgICAgICAgfHwgKGV2ZW50LmJ1dHRvbiA9PT0gMCAvLyBsZWZ0IGNsaWNrXG4gICAgICAgICAgICAmJiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1hY1wiKSAhPT0gLTEgPyBldmVudC5tZXRhS2V5IDogZXZlbnQuY3RybEtleSkpO1xuICAgICAgfSxcbiAgICAgIHNhdmVBc0NsaWVudEZpbGU6IGZ1bmN0aW9uIChkYXRhLCBmaWxlbmFtZSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdjb21tb25VdGlscy5zYXZlQXNDbGllbnRGaWxlOiBObyBkYXRhJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgICAgIGZpbGVuYW1lID0gJ2NvbnNvbGUuanNvbic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgdW5kZWZpbmVkLCA0KVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiAndGV4dC9qc29uJ30pLFxuICAgICAgICAgICAgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpLFxuICAgICAgICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXG4gICAgICAgIGEuZG93bmxvYWQgPSBmaWxlbmFtZVxuICAgICAgICBhLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgICAgICBhLmRhdGFzZXQuZG93bmxvYWR1cmwgPSBbJ3RleHQvanNvbicsIGEuZG93bmxvYWQsIGEuaHJlZl0uam9pbignOicpXG4gICAgICAgIGUuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSwgZmFsc2UsIHdpbmRvdywgMCwgMCwgMCwgMCwgMCxcbiAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKVxuICAgICAgICBhLmRpc3BhdGNoRXZlbnQoZSlcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5jb21tb25VaVxuICogVGhpcyBtb2R1bGUgaXMgdGhlIGdlbmVyYWwgc3RvcmUgb2YgbG93IGxldmVsIFVJIGRpcmVjdGl2ZXMsIHdoaWNoIHNob3VsZCBiZSBzZXBhcmF0ZWQgb3V0IG9yXG4gKiBwb3RlbnRpYWxseSBmb3VuZCBlcXVpdmFsZW50IGluIDNyZCBwYXJ0eSBsaWJyYXJpZXMuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29tbW9uVWknLCBbXSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ29uQ3RybEVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBlbGVtZW50LmJpbmQoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5rZXlDb2RlID09PSAxMykgeyAvLyBjdHJsICsgZW50ZXJcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseShhdHRycy5vbkN0cmxFbnRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnZWF0Q2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICBlbGVtZW50LmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnZm9jdXNTdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgUS5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia2NlbGwnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdDJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBlbGVtZW50Lm1vdXNlb3ZlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2NlbGwtYnJhY2tldC1zZWxlY3RlZCcpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudC5tb3VzZW91dChmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2NlbGwtYnJhY2tldC1zZWxlY3RlZCcpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmZpbHRlcignaXNIaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHJldHVybiBfKGlucHV0KS5maWx0ZXIoZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgcmV0dXJuICFpdC5oaWRkZW47XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnZHJvcGRvd25Qcm9tb3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIElzIHlvdXIgZHJvcGRvd24gYmVpbmcgY292ZXJlZCBieSBpdHMgYW5jZXN0b3JzIHNpYmxpbmdzP1xuICAgIC8vIFByb21vdGUgdGhhdCBzaGl6LCBhbmQgcHJlcGVuZCBpdCB0byB0aGUgbm90ZWJvb2sgc28gaXQgZG9lc24ndFxuICAgIC8vIGV2ZXIgZ2V0IGJ1bGxpZWQgYWdhaW4uXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQycsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdjbGljay4nICsgc2NvcGUuJGlkLCBoaWRlRHJvcGRvd24pO1xuXG4gICAgICAgIHZhciBkcm9wZG93biA9IGVsZW1lbnQuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5maXJzdCgpO1xuICAgICAgICB2YXIgdG9nZ2xlID0gZWxlbWVudC5maW5kKCcuZHJvcGRvd24tdG9nZ2xlJykuZmlyc3QoKTtcblxuICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsICcuZHJvcGRvd24tdG9nZ2xlJywgdG9nZ2xlRHJvcGRvd24pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZURyb3Bkb3duKCkge1xuICAgICAgICAgIGlmICgkKGRyb3Bkb3duKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGhpZGVEcm9wZG93bigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNob3dEcm9wZG93bigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3dEcm9wZG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbm90ZWJvb2sgPSBia0hlbHBlci5nZXROb3RlYm9va0VsZW1lbnQoc2NvcGUpO1xuICAgICAgICAgICAgdmFyIHRvZ2dsZVBvc2l0aW9uID0gdG9nZ2xlLm9mZnNldCgpO1xuICAgICAgICAgICAgdmFyIG5vdGVib29rUG9zaXRpb24gPSBub3RlYm9vay5vZmZzZXQoKTtcblxuICAgICAgICAgICAgZHJvcGRvd24ucHJlcGVuZFRvKG5vdGVib29rKTtcblxuICAgICAgICAgICAgZHJvcGRvd24uc2hvdygpLmNzcyh7XG4gICAgICAgICAgICAgIHRvcDogdG9nZ2xlUG9zaXRpb24udG9wIC0gbm90ZWJvb2tQb3NpdGlvbi50b3AgKyAncHgnLFxuICAgICAgICAgICAgICBsZWZ0OiB0b2dnbGVQb3NpdGlvbi5sZWZ0IC0gbm90ZWJvb2tQb3NpdGlvbi5sZWZ0IC0gZHJvcGRvd24ub3V0ZXJXaWR0aCgpICsgJ3B4JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGhpZGVEcm9wZG93bigpIHsgZHJvcGRvd24uaGlkZSgpO31cblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh3aW5kb3cpLm9mZignLicgKyBzY29wZS4kaWQpO1xuICAgICAgICAgIC8vIFNpbmNlIHRoZSBkcm9wZG93biBpcyBleHRlcm5hbCB0byB0aGUgZGlyZWN0aXZlIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRvIGNsZWFuIGl0IHVwIHdoZW4gdGhlIGRpcmVjdGl2ZSBnb2VzIGF3YXlcbiAgICAgICAgICBkcm9wZG93bi5yZW1vdmUoKTtcbiAgICAgICAgICBlbGVtZW50Lm9mZignY2xpY2snKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrRHJvcGRvd25NZW51JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWyd0ZW1wbGF0ZS9kcm9wZG93biddKCksXG4gICAgICBzY29wZToge1xuICAgICAgICAnbWVudUl0ZW1zJzogJz0nLFxuXG4gICAgICAgIC8vIENsYXNzZXMgdG8gYmUgYWRkZWQgdG8gYW55IHN1Ym1lbnUgaXRlbS4gVXNlZCBmb3IgYWRkaW5nXG4gICAgICAgIC8vIHB1bGwtbGVmdCB0byBtZW51cyB0aGF0IGFyZSBvbiB0aGUgZmFyIHJpZ2h0IChlLmcuIGJrY2VsbG1lbnUpLlxuICAgICAgICBzdWJtZW51Q2xhc3NlczogJ0AnXG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZ2V0TWVudUl0ZW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF8ucmVzdWx0KCRzY29wZSwgJ21lbnVJdGVtcycpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia0Ryb3Bkb3duTWVudUl0ZW0nLCBmdW5jdGlvbigkY29tcGlsZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsndGVtcGxhdGUvZHJvcGRvd25faXRlbSddKCksXG4gICAgICBzY29wZToge1xuICAgICAgICAnaXRlbSc6ICc9J1xuICAgICAgfSxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgdmFyIGlzSXRlbURpc2FibGVkID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRpc2FibGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpdGVtLmRpc2FibGVkO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRBQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpc0l0ZW1EaXNhYmxlZChpdGVtKSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Rpc2FibGVkLWxpbmsnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbXMgJiYgaXRlbS5pdGVtcy5sZW5ndGggPD0gMSAmJiBpdGVtLmF1dG9SZWR1Y2UpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaCgnZGlzYWJsZWQtbGluaycpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICBpZiAoaXNJdGVtRGlzYWJsZWQoaXRlbS5pdGVtc1swXSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnZGlzYWJsZWQtbGluaycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdkaXZpZGVyJykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2RpdmlkZXInKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3N1Ym1lbnUnIHx8IGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zICYmIGl0ZW0uaXRlbXMubGVuZ3RoIDw9IDEgJiYgaXRlbS5hdXRvUmVkdWNlKSB7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkcm9wZG93bi1zdWJtZW51Jyk7XG4gICAgICAgICAgICAgIC8vIEFkZCBhbnkgZXh0cmEgc3VibWVudSBjbGFzc2VzLiAoZS5nLiB0byBzcGVjaWZ5IGlmIGl0IHNob3VsZCBiZSBsZWZ0IG9yIHJpZ2h0KS5cbiAgICAgICAgICAgICAgaWYgKCRzY29wZS5zdWJtZW51Q2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIF8uZWFjaChcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN1Ym1lbnVDbGFzc2VzLnNwbGl0KCcgJyksXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ydW5BY3Rpb24gPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKGl0ZW0uaXRlbXMgJiYgaXRlbS5pdGVtcy5sZW5ndGggPT09IDEgJiYgaXRlbS5hdXRvUmVkdWNlKSB7XG4gICAgICAgICAgICBpdGVtLml0ZW1zWzBdLmFjdGlvbigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uYWN0aW9uKSkge1xuICAgICAgICAgICAgICBpdGVtLmFjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0TmFtZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgbmFtZSA9ICcnO1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1zICYmIGl0ZW0uaXRlbXMubGVuZ3RoID09PSAxICYmIGl0ZW0uYXV0b1JlZHVjZSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaXRlbXNbMF0ucmVkdWNlZE5hbWUpIHtcbiAgICAgICAgICAgICAgbmFtZSA9IGl0ZW0uaXRlbXNbMF0ucmVkdWNlZE5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuYW1lID0gaXRlbS5pdGVtc1swXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lID0gaXRlbS5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKG5hbWUpKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNNZW51SXRlbUNoZWNrZWQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKGl0ZW0uaXNDaGVja2VkKSB7XG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uaXNDaGVja2VkKSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pc0NoZWNrZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmlzQ2hlY2tlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgIHNjb3BlLmdldFN1Ykl0ZW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihzY29wZS5pdGVtLml0ZW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjb3BlLml0ZW0uaXRlbXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNjb3BlLml0ZW0uaXRlbXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoQ29sbGVjdGlvbignZ2V0U3ViSXRlbXMoKScsIGZ1bmN0aW9uKGl0ZW1zLCBvbGRJdGVtcykge1xuICAgICAgICAgIGlmICghXy5pc0VtcHR5KGl0ZW1zKSkge1xuICAgICAgICAgICAgLy9qc2NzOmRpc2FibGVcbiAgICAgICAgICAgICRjb21waWxlKCc8YmstZHJvcGRvd24tbWVudSBtZW51LWl0ZW1zPVwiZ2V0U3ViSXRlbXMoKVwiPjwvYmstZHJvcGRvd24tbWVudT4nKShzY29wZSwgZnVuY3Rpb24oY2xvbmVkLCBzY29wZSkge1xuICAgICAgICAgICAgLy9qc2NzOmVuYWJsZVxuICAgICAgICAgICAgICBlbGVtZW50LmZpbmQoJ3VsLmRyb3Bkb3duLW1lbnUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtFbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIGVsZW1lbnQuYmluZCgna2V5ZG93biBrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5ia0VudGVyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0xhbmd1YWdlTG9nbycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6ICc8c3BhbiBuZy1zdHlsZT1cInN0eWxlXCI+e3tuYW1lfX08L3NwYW4+JyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIG5hbWU6ICdAJyxcbiAgICAgICAgYmdDb2xvcjogJ0AnLFxuICAgICAgICBmZ0NvbG9yOiAnQCcsXG4gICAgICAgIGJvcmRlckNvbG9yOiAnQCdcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuc3R5bGUgPSB7XG4gICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBzY29wZS5iZ0NvbG9yLFxuICAgICAgICAgICdjb2xvcic6IHNjb3BlLmZnQ29sb3JcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHVwZGF0ZVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuc3R5bGUgPSB7XG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHNjb3BlLmJnQ29sb3IsXG4gICAgICAgICAgICAnY29sb3InOiBzY29wZS5mZ0NvbG9yXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoc2NvcGUuYm9yZGVyQ29sb3IpIHtcbiAgICAgICAgICAgIHNjb3BlLnN0eWxlWydib3JkZXItd2lkdGgnXSA9ICcxcHgnO1xuICAgICAgICAgICAgc2NvcGUuc3R5bGVbJ2JvcmRlci1jb2xvciddID0gc2NvcGUuYm9yZGVyQ29sb3I7XG4gICAgICAgICAgICBzY29wZS5zdHlsZVsnYm9yZGVyLXN0eWxlJ10gPSAnc29saWQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgc2NvcGUuc3R5bGVbJ2JvcmRlci13aWR0aCddO1xuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLnN0eWxlWydib3JkZXItY29sb3InXTtcbiAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5zdHlsZVsnYm9yZGVyLXN0eWxlJ107XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2JnQ29sb3InLCB1cGRhdGVTdHlsZSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnZmdDb2xvcicsIHVwZGF0ZVN0eWxlKTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdib3JkZXJDb2xvcicsIHVwZGF0ZVN0eWxlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5hbmd1bGFyVXRpbHNcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIEFuZ3VsYXJKUyBzcGVjaWZpYyB1dGlsaXRpZXMgdGhhdCBhcmUgc2hhcmVkIGFjcm9zcyB0aGUgd2hvbGUgYXBwbGljYXRpb24uXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmFuZ3VsYXJVdGlscycsIFtdKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2FuZ3VsYXJVdGlscycsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2NhdGlvbiwgJGh0dHAsICRxLCAkdGltZW91dCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXRMb2NhdGlvbjogZnVuY3Rpb24obmV3TG9jYXRpb24pIHtcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgobmV3TG9jYXRpb24pO1xuICAgICAgfSxcbiAgICAgIHJlZnJlc2hSb290U2NvcGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcm9vdFNjb3BlLiQkcGhhc2UgfHwgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICB0b1ByZXR0eUpzb246IGZ1bmN0aW9uKGFuZ3VsYXJCb3VuZEpzT2JqKSB7XG4gICAgICAgIGlmKGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBhbmd1bGFyQm91bmRKc09iai5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmJvZHkgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5ib2R5ID0gYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uYm9keS5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQuYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dC5ib2R5ID0gYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQuYm9keS5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2xlYW51cChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gJyQkaGFzaEtleScpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcmV0ID0gSlNPTi5zdHJpbmdpZnkoYW5ndWxhckJvdW5kSnNPYmosIGNsZWFudXAsIDQpICsgXCJcXG5cIjtcbiAgICAgICAgdGhpcy5yZW1vdmVTdHJpbmdBcnJheXMoYW5ndWxhckJvdW5kSnNPYmopO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSxcbiAgICAgIHJlbW92ZVN0cmluZ0FycmF5czogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIGlmKG9iai5jZWxscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgb2JqLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob2JqLmNlbGxzW2ldLmJvZHkgIT09IHVuZGVmaW5lZCAmJiAkLmlzQXJyYXkob2JqLmNlbGxzW2ldLmJvZHkpKSB7XG4gICAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSAnXFxuJztcbiAgICAgICAgICAgICAgb2JqLmNlbGxzW2ldLmJvZHkgPSBvYmouY2VsbHNbaV0uYm9keS5qb2luKFtzZXBhcmF0b3JdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmouY2VsbHNbaV0uaW5wdXQgIT09IHVuZGVmaW5lZCAmJiBvYmouY2VsbHNbaV0uaW5wdXQuYm9keSAhPT0gdW5kZWZpbmVkICYmICQuaXNBcnJheShvYmouY2VsbHNbaV0uaW5wdXQuYm9keSkpIHtcbiAgICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9ICdcXG4nO1xuICAgICAgICAgICAgICBvYmouY2VsbHNbaV0uaW5wdXQuYm9keSA9IG9iai5jZWxsc1tpXS5pbnB1dC5ib2R5LmpvaW4oW3NlcGFyYXRvcl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZyb21QcmV0dHlKc29uOiBmdW5jdGlvbihqc29uU3RyaW5nKSB7XG4gICAgICAgICAgdmFyIHJldCA9IGFuZ3VsYXIuZnJvbUpzb24oanNvblN0cmluZyk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVTdHJpbmdBcnJheXMocmV0KTtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSxcbiAgICAgIGh0dHBHZXQ6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe21ldGhvZDogXCJHRVRcIiwgdXJsOiB1cmwsIHBhcmFtczogZGF0YX0pO1xuICAgICAgfSxcbiAgICAgIGh0dHBQb3N0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgIGRhdGE6ICQucGFyYW0oZGF0YSksXG4gICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ31cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaHR0cFB1dEpzb246IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG5ld0RlZmVycmVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRxLmRlZmVyKCk7XG4gICAgICB9LFxuICAgICAgbmV3UHJvbWlzZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICRxLndoZW4odmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkcS5hbGwuYXBwbHkoJHEsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgICAgZmNhbGw6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmdW5jKCkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgdGltZW91dDogZnVuY3Rpb24gKGZ1bmMsIG1zKSB7XG4gICAgICAgIHJldHVybiAkdGltZW91dChmdW5jLCBtcyk7XG4gICAgICB9LFxuICAgICAgY2FuY2VsVGltZW91dDogZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICAkdGltZW91dC5jYW5jZWwocHJvbWlzZSk7XG4gICAgICB9LFxuICAgICAgZGVsYXk6IGZ1bmN0aW9uKG1zKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgfSwgbXMpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgaXMgYSByZXVzYWJsZSBVSSBjb21wb25lbnQgZm9yIHRyZWUgdmlld3MuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgdHJlZVZpZXcgPSBhbmd1bGFyLm1vZHVsZSgnYmsudHJlZVZpZXcnLCBbJ25nQW5pbWF0ZSddKTtcblxuICB0cmVlVmlldy5mYWN0b3J5KCdmaWxlU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfcHJvdmlkZXIgPSB7fTtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0UHJvdmlkZXI6IGZ1bmN0aW9uKHByb3ZpZGVycykge1xuICAgICAgICBfcHJvdmlkZXIgPSBwcm92aWRlcnM7XG4gICAgICB9LFxuICAgICAgZ2V0Q2hpbGRyZW46IGZ1bmN0aW9uKHVyaSwgY2FsbGJhY2spIHtcbiAgICAgICAgX3Byb3ZpZGVyLmdldENoaWxkcmVuKHVyaSwgY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIGZpbGxJbnB1dDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIF9wcm92aWRlci5maWxsSW5wdXQodXJpKTtcbiAgICAgIH0sXG4gICAgICBvcGVuOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgX3Byb3ZpZGVyLm9wZW4odXJpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICB0cmVlVmlldy5kaXJlY3RpdmUoXCJ0cmVlVmlld1wiLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSwgJHJvb3RTY29wZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IFwiPHRyZWUtbm9kZSBkYXRhPSdyb290JyBmcz0nZnMnIGRpc3BsYXluYW1lPSd7eyByb290dXJpIH19Jz48L3RyZWUtbm9kZT5cIixcbiAgICAgIHNjb3BlOiB7cm9vdHVyaTogXCJAXCIsIGZzOiBcIj1cIn0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgaWYgKCEkdGVtcGxhdGVDYWNoZS5nZXQoJ3RyZWVOb2RlQ2hpbGRyZW4uaHRtbCcpKSB7XG4gICAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0cmVlTm9kZUNoaWxkcmVuLmh0bWwnLCBcIjx0cmVlLW5vZGUgY2xhc3M9J2JrLXRyZWV2aWV3JyBuZy1yZXBlYXQ9J2QgaW4gZGF0YS5jaGlsZHJlbiB8IGZpbGVGaWx0ZXI6ZnMuZmlsdGVyIHwgb3JkZXJCeTpmcy5nZXRPcmRlckJ5KCk6ZnMuZ2V0T3JkZXJSZXZlcnNlKCknIGRhdGE9J2QnIGZzPSdmcyc+PC90cmVlLW5vZGU+XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfLnN0cmluZy5lbmRzV2l0aCgkc2NvcGUucm9vdHVyaSwgJy8nKSkge1xuICAgICAgICAgICRzY29wZS5yb290dXJpID0gJHNjb3BlLnJvb3R1cmkgKyAnLyc7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLmZzUHJlZnMgPSAkcm9vdFNjb3BlLmZzUHJlZnMgfHwge1xuICAgICAgICAgIG9wZW5Gb2xkZXJzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5yb290ID0ge1xuICAgICAgICAgIHR5cGU6IFwiZGlyZWN0b3J5XCIsXG4gICAgICAgICAgdXJpOiAkc2NvcGUucm9vdHVyaSxcbiAgICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLmNvbnRhaW5zKCRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycywgJHNjb3BlLnJvb3R1cmkpKSB7XG4gICAgICAgICAgJHNjb3BlLmZzLmdldENoaWxkcmVuKCRzY29wZS5yb290dXJpLCAkcm9vdFNjb3BlLmZzUHJlZnMub3BlbkZvbGRlcnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkc2NvcGUucm9vdC5jaGlsZHJlbiA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIHRyZWVWaWV3LmZpbHRlcihcImZpbGVGaWx0ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNoaWxkcmVuLCBmaWx0ZXIpIHtcbiAgICAgIHJldHVybiBfLmlzRnVuY3Rpb24oZmlsdGVyKSA/IF8oY2hpbGRyZW4pLmZpbHRlcihmaWx0ZXIpIDogY2hpbGRyZW47XG4gICAgfTtcbiAgfSlcblxuICB0cmVlVmlldy5kaXJlY3RpdmUoXCJ0cmVlTm9kZVwiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBcIjxzcGFuIG5nLWRibGNsaWNrPSdkYmxDbGljaygpJyBuZy1jbGljaz0nY2xpY2soKSc+PGkgY2xhc3M9J3t7IGdldEljb24oKSB9fSc+PC9pPiA8c3Bhbj57eyBnZXREaXNwbGF5TmFtZSgpIH19PC9zcGFuPjwvc3Bhbj5cIiArXG4gICAgICAgICAgXCI8ZGl2IGNsYXNzPSdwdXNocmlnaHQnPlwiICtcbiAgICAgICAgICBcIjxkaXYgbmctaW5jbHVkZT0nXFxcInRyZWVOb2RlQ2hpbGRyZW4uaHRtbFxcXCInPjwvZGl2PlwiICtcbiAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgc2NvcGU6IHtkYXRhOiBcIj1cIiwgZnM6IFwiPVwiLCBkaXNwbGF5bmFtZTogXCJAXCJ9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlKSB7XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IGMudHlwZSxcbiAgICAgICAgICAgIHVyaTogYy51cmksXG4gICAgICAgICAgICBtb2RpZmllZDogYy5tb2RpZmllZCxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBjLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgY2hpbGRyZW46IF8ubWFwKGMuY2hpbGRyZW4sIHRyYW5zZm9ybSlcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS50eXBlID09PSAnZGlyZWN0b3J5Jykge1xuICAgICAgICAgICAgdmFyIHVyaSA9ICRzY29wZS5kYXRhLnVyaTtcbiAgICAgICAgICAgIGlmICghXy5zdHJpbmcuZW5kc1dpdGgodXJpLCAnLycpKSB7XG4gICAgICAgICAgICAgIHVyaSA9IHVyaSArICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5mcy5maWxsSW5wdXQodXJpKTtcbiAgICAgICAgICAgIC8vIHRvZ2dsZVxuICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoJHNjb3BlLmRhdGEuY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICRzY29wZS5kYXRhLmNoaWxkcmVuLnNwbGljZSgwLCAkc2NvcGUuZGF0YS5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZzUHJlZnMub3BlbkZvbGRlcnMgPSBfLnJlamVjdCgkcm9vdFNjb3BlLmZzUHJlZnMub3BlbkZvbGRlcnMsIGZ1bmN0aW9uKGZvbGRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLnN0cmluZy5zdGFydHNXaXRoKGZvbGRlciwgdXJpKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZzUHJlZnMub3BlbkZvbGRlcnMucHVzaCh1cmkpO1xuICAgICAgICAgICAgICAkc2NvcGUuZnMuZ2V0Q2hpbGRyZW4oJHNjb3BlLmRhdGEudXJpKS5zdWNjZXNzKGZ1bmN0aW9uKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBfLnNvcnRCeShjaGlsZHJlbiwgZnVuY3Rpb24oYykge1xuICAgICAgICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gXCJkaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIhISEhIVwiICsgYy51cmkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjLnVyaS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmNoaWxkcmVuID0gXy5tYXAoY2hpbGRyZW4sIHRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuZnMuZmlsbElucHV0KCRzY29wZS5kYXRhLnVyaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZGJsQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHJldHVybjtcblxuICAgICAgICAgICRzY29wZS5mcy5vcGVuKCRzY29wZS5kYXRhLnVyaSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRJY29uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnR5cGUgPT09IFwiZGlyZWN0b3J5XCIpIHtcbiAgICAgICAgICAgIHJldHVybiAnZm9sZGVyLWljb24nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEudHlwZSA9PT0gXCJhcHBsaWNhdGlvbi9wcnMudHdvc2lnbWEuYmVha2VyLm5vdGVib29rK2pzb25cIikge1xuICAgICAgICAgICAgcmV0dXJuICdnbHlwaGljb24gZ2x5cGhpY29uLWJvb2snO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmZzLmdldEljb24gJiYgJHNjb3BlLmZzLmdldEljb24oJHNjb3BlLmRhdGEudHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZnMuZ2V0SWNvbigkc2NvcGUuZGF0YS50eXBlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdnbHlwaGljb24gZ2x5cGhpY29uLXRoJztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5kaXNwbGF5bmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5kaXNwbGF5bmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmRhdGEuZGlzcGxheU5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBuYW1lID0gJHNjb3BlLmRhdGEudXJpO1xuICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA+IDAgJiYgbmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnLycpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygwLCBuYW1lLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuY29tZXRkVXRpbHNcbiAqIFRoaXMgbW9kdWxlIG9mZmVycyB0aGUgY29tZXRkIHNlcnZpY2UgdGhhdCBpcyB1c2VkIHRvIHJlY2VpdmUgJ3B1c2hlcycgZnJvbSB0aGUgc2VydmVyLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb21ldGRVdGlscycsIFtdKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2NvbWV0ZFV0aWxzJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBfc3RhdHVzTGlzdGVuZXI7XG4gICAgdmFyIF9vdXRwdXRMaXN0ZW5lcjtcbiAgICByZXR1cm4ge1xuICAgICAgaW5pdGlhbGl6ZUNvbWV0ZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICQuY29tZXRkLmluaXQoe1xuICAgICAgICAgIHVybDogdXJpXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGFkZENvbm5lY3RlZFN0YXR1c0xpc3RlbmVyOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcigpO1xuICAgICAgICBfc3RhdHVzTGlzdGVuZXIgPSAkLmNvbWV0ZC5hZGRMaXN0ZW5lcihcIi9tZXRhL2Nvbm5lY3RcIiwgY2IpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfc3RhdHVzTGlzdGVuZXIpIHtcbiAgICAgICAgICAkLmNvbWV0ZC5yZW1vdmVMaXN0ZW5lcihfc3RhdHVzTGlzdGVuZXIpO1xuICAgICAgICAgIF9zdGF0dXNMaXN0ZW5lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkZE91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcigpO1xuICAgICAgICBfb3V0cHV0TGlzdGVuZXIgPSAkLmNvbWV0ZC5zdWJzY3JpYmUoXCIvb3V0cHV0bG9nXCIsIGNiKTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX291dHB1dExpc3RlbmVyKSB7XG4gICAgICAgICAgJC5jb21ldGQucmVtb3ZlTGlzdGVuZXIoX291dHB1dExpc3RlbmVyKTtcbiAgICAgICAgICBfb3V0cHV0TGlzdGVuZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnJlbW92ZU91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyKCk7XG4gICAgICAgIHJldHVybiAkLmNvbWV0ZC5kaXNjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsubm90ZWJvb2tWZXJzaW9uTWFuYWdlclxuICogT2ZmZXJzIHV0aWxpdGllcyB0byBjb252ZXJ0IGJlYWtlciBub3RlYm9vayBvZiBvbGQgdmVyc2lvbnMgdG8gdGhlIGxhdGVzdCB2ZXJzaW9uXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rVmVyc2lvbk1hbmFnZXInLCBbXSk7XG5cbiAgdmFyIGJrTmJWMUNvbnZlcnRlciA9IChmdW5jdGlvbigpIHtcbiAgICAvLyBpbiB2MSwgY2VsbCBsZXZlbCBieSBkZWZpbml0aW9uIGlzIHRoZSBjb3VudCBvZiBzdGVwcyBhd2F5IGZyb20gXCJyb290XCIgaW4gdGhlIHRyZWVcbiAgICB2YXIgZ2V0U2VjdGlvbkNlbGxMZXZlbCA9IGZ1bmN0aW9uKGNlbGwsIHRhZ01hcCkge1xuICAgICAgdmFyIGdldFBhcmVudElkID0gZnVuY3Rpb24oY0lkKSB7XG4gICAgICAgIHZhciBwSWQgPSBudWxsO1xuICAgICAgICBfKHRhZ01hcCkuZmluZChmdW5jdGlvbih2LCBrKSB7XG4gICAgICAgICAgaWYgKF8odikuY29udGFpbnMoY0lkKSkge1xuICAgICAgICAgICAgcElkID0gaztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwSWQ7XG4gICAgICB9O1xuICAgICAgdmFyIGxldmVsID0gMDtcbiAgICAgIHZhciBwYXJlbnRJZCA9IGdldFBhcmVudElkKGNlbGwuaWQpO1xuICAgICAgd2hpbGUgKHBhcmVudElkKSB7XG4gICAgICAgICsrbGV2ZWw7XG4gICAgICAgIHBhcmVudElkID0gZ2V0UGFyZW50SWQocGFyZW50SWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxldmVsO1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRDb2RlQ2VsbCA9IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiaWRcIjogY2VsbC5pZCxcbiAgICAgICAgXCJ0eXBlXCI6IFwiY29kZVwiLFxuICAgICAgICBcImV2YWx1YXRvclwiOiBjZWxsLmV2YWx1YXRvcixcbiAgICAgICAgXCJpbnB1dFwiOiBjZWxsLmlucHV0LFxuICAgICAgICBcIm91dHB1dFwiOiBjZWxsLm91dHB1dFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0U2VjdGlvbkNlbGwgPSBmdW5jdGlvbihjZWxsLCB0YWdNYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiaWRcIjogY2VsbC5pZCxcbiAgICAgICAgXCJ0eXBlXCI6IFwic2VjdGlvblwiLFxuICAgICAgICBcImxldmVsXCI6IGdldFNlY3Rpb25DZWxsTGV2ZWwoY2VsbCwgdGFnTWFwKSxcbiAgICAgICAgXCJ0aXRsZVwiOiBjZWxsLnRpdGxlLFxuICAgICAgICBcImNvbGxhcHNlZFwiOiBjZWxsLmNvbGxhcHNlZFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0VGV4dENlbGwgPSBmdW5jdGlvbihjZWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBcImlkXCI6IGNlbGwuaWQsXG4gICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgXCJib2R5XCI6IGNlbGwuYm9keVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0TWFya2Rvd25DZWxsID0gZnVuY3Rpb24oY2VsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJpZFwiOiBjZWxsLmlkLFxuICAgICAgICBcInR5cGVcIjogXCJtYXJrZG93blwiLFxuICAgICAgICBcImJvZHlcIjogY2VsbC5ib2R5LFxuICAgICAgICBcIm1vZGVcIjogY2VsbC5tb2RlXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRDZWxsID0gZnVuY3Rpb24oY2VsbCwgdGFnTWFwLCB0YWdNYXAyKSB7XG4gICAgICB2YXIgcmV0Q2VsbDtcbiAgICAgIHN3aXRjaCAoY2VsbC5jbGFzc1swXSkge1xuICAgICAgICBjYXNlIFwiY29kZVwiOlxuICAgICAgICAgIHJldENlbGwgPSBjb252ZXJ0Q29kZUNlbGwoY2VsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzZWN0aW9uXCI6XG4gICAgICAgICAgcmV0Q2VsbCA9IGNvbnZlcnRTZWN0aW9uQ2VsbChjZWxsLCB0YWdNYXApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgIHJldENlbGwgPSBjb252ZXJ0VGV4dENlbGwoY2VsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtYXJrZG93blwiOlxuICAgICAgICAgIHJldENlbGwgPSBjb252ZXJ0TWFya2Rvd25DZWxsKGNlbGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHRhZ01hcDIgJiYgXyh0YWdNYXAyLmluaXRpYWxpemF0aW9uKS5jb250YWlucyhjZWxsLmlkKSkge1xuICAgICAgICByZXRDZWxsLmluaXRpYWxpemF0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXRDZWxsO1xuICAgIH07XG4gICAgdmFyIGdldENlbGxJZHMgPSBmdW5jdGlvbihjZWxscywgdGFnTWFwKSB7XG4gICAgICB2YXIgY2VsbElkcyA9IFtdO1xuICAgICAgdmFyIGNJZCwgY2hpbGRyZW47XG4gICAgICB2YXIgc3RhY2sgPSBbXCJyb290XCJdO1xuICAgICAgd2hpbGUgKCFfLmlzRW1wdHkoc3RhY2spKSB7XG4gICAgICAgIGNJZCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICBjZWxsSWRzLnB1c2goY0lkKTtcbiAgICAgICAgaWYgKHRhZ01hcC5oYXNPd25Qcm9wZXJ0eShjSWQpKSB7XG4gICAgICAgICAgY2hpbGRyZW4gPSBfKHRhZ01hcFtjSWRdKS5jbG9uZSgpO1xuICAgICAgICAgIGlmICghXyhjaGlsZHJlbikuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICBzdGFjayA9IHN0YWNrLmNvbmNhdChjaGlsZHJlbi5yZXZlcnNlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNlbGxJZHM7XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVDZWxsTWFwID0gZnVuY3Rpb24oY2VsbHMpIHtcbiAgICAgIHZhciBjZWxsTWFwID0ge307XG4gICAgICBjZWxscy5mb3JFYWNoKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgY2VsbE1hcFtjZWxsLmlkXSA9IGNlbGw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjZWxsTWFwO1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRDZWxscyA9IGZ1bmN0aW9uKGNlbGxzLCB0YWdNYXAsIHRhZ01hcDIpIHtcbiAgICAgIHZhciBjZWxsSWRzID0gZ2V0Q2VsbElkcyhjZWxscywgdGFnTWFwKTtcbiAgICAgIHZhciBjZWxsTWFwID0gZ2VuZXJhdGVDZWxsTWFwKGNlbGxzKTtcbiAgICAgIHZhciB2MkNlbGxzID0gXyhjZWxsSWRzKS5jaGFpbigpXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkICE9PSBcInJvb3RcIjtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsTWFwW2lkXTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuICFjZWxsLmhpZGVUaXRsZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRDZWxsKGNlbGwsIHRhZ01hcCwgdGFnTWFwMik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudmFsdWUoKTtcbiAgICAgIHJldHVybiB2MkNlbGxzO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udmVydDogZnVuY3Rpb24obm90ZWJvb2tWMSkge1xuICAgICAgICB2YXIgbm90ZWJvb2tWMiA9IHtcbiAgICAgICAgICBiZWFrZXI6IFwiMlwiLFxuICAgICAgICAgIGV2YWx1YXRvcnM6IG5vdGVib29rVjEuZXZhbHVhdG9ycyxcbiAgICAgICAgICBjZWxsczogY29udmVydENlbGxzKG5vdGVib29rVjEuY2VsbHMsIG5vdGVib29rVjEudGFnTWFwLCBub3RlYm9va1YxLnRhZ01hcDIpLFxuICAgICAgICAgIGxvY2tlZDogbm90ZWJvb2tWMS5sb2NrZWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vdGVib29rVjI7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IGZ1bmN0aW9uKG5vdGVib29rKSB7XG4gICAgICAgIGlmIChfLmlzRW1wdHkobm90ZWJvb2spKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwiYmVha2VyXCI6IFwiMlwiLFxuICAgICAgICAgICAgXCJldmFsdWF0b3JzXCI6IFtdLFxuICAgICAgICAgICAgXCJjZWxsc1wiOiBbXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgbm90ZWJvb2sgaXMgYSBzdHJpbmcsIHBhcnNlIGl0IHRvIGpzIG9iamVjdFxuICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhub3RlYm9vaykpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm90ZWJvb2sgPSBhbmd1bGFyLmZyb21Kc29uKG5vdGVib29rKTtcbiAgICAgICAgICAgIC8vIFRPRE8sIHRvIGJlIHJlbW92ZWQuIExvYWQgYSBjb3JydXB0ZWQgbm90ZWJvb2suXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhub3RlYm9vaykpIHtcbiAgICAgICAgICAgICAgbm90ZWJvb2sgPSBhbmd1bGFyLmZyb21Kc29uKG5vdGVib29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoaXMgaXMgbm90IGEgdmFsaWQgQmVha2VyIG5vdGVib29rIEpTT05cIik7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG5vdGVib29rKTtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIk5vdCBhIHZhbGlkIEJlYWtlciBub3RlYm9va1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBiZWFrZXIgdmVyc2lvbiBpcyB1bmRlZmluZWRcbiAgICAgICAgLy8gdHJlYXQgaXQgYXMgYmVha2VyIG5vdGVib29rIHYxXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKG5vdGVib29rLmJlYWtlcikpIHtcbiAgICAgICAgICBub3RlYm9vay5iZWFrZXIgPSBcIjFcIjtcbiAgICAgICAgfVxuICAgICAgICAvL2NoZWNrIHZlcnNpb24gYW5kIHNlZSBpZiBuZWVkIGNvbnZlcnNpb25cbiAgICAgICAgaWYgKG5vdGVib29rLmJlYWtlciA9PT0gXCIxXCIpIHtcbiAgICAgICAgICBub3RlYm9vayA9IGJrTmJWMUNvbnZlcnRlci5jb252ZXJ0KG5vdGVib29rKTtcbiAgICAgICAgfSBlbHNlIGlmIChub3RlYm9vay5iZWFrZXIgPT09IFwiMlwiKSB7XG4gICAgICAgICAgLy8gZ29vZCwgXCIyXCIgaXMgdGhlIGN1cnJlbnQgdmVyc2lvblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IFwiVW5rbm93biBCZWFrZXIgbm90ZWJvb2sgdmVyc2lvblwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vdGVib29rO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm91dHB1dExvZ1xuICogVGhpcyBtb2R1bGUgb3ducyB0aGUgc2VydmljZSBvZiBnZXQgb3V0cHV0IGxvZyBmcm9tIHRoZSBzZXJ2ZXIuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dExvZycsIFsnYmsudXRpbHMnLCAnYmsuY29tZXRkVXRpbHMnXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdia091dHB1dExvZycsIGZ1bmN0aW9uIChia1V0aWxzLCBjb21ldGRVdGlscykge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRMb2c6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9vdXRwdXRsb2cvZ2V0XCIpLCB7fSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGNiKVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYWlsZWQgdG8gZ2V0IG91dHB1dCBsb2dcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMuYWRkT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXIoY2IpO1xuICAgICAgfSxcbiAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29tZXRkVXRpbHMucmVtb3ZlT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqICBNb2R1bGUgYmsucmVjZW50TWVudVxuICogIFRoaXMgbW9kdWxlIG93bnMgdGhlIHNlcnZpY2Ugb2YgcmV0cmlldmluZyByZWNlbnQgbWVudSBpdGVtcyBhbmQgdXBkYXRpbmcgdGhlIHJlY2VudCBtZW51LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5yZWNlbnRNZW51JywgWydiay5hbmd1bGFyVXRpbHMnXSk7XG5cbiAgbW9kdWxlLnByb3ZpZGVyKFwiYmtSZWNlbnRNZW51XCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfc2VydmVyID0gbnVsbDtcbiAgICB0aGlzLmNvbmZpZ1NlcnZlciA9IGZ1bmN0aW9uKHNlcnZlcikge1xuICAgICAgX3NlcnZlciA9IHNlcnZlcjtcbiAgICB9O1xuICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKGFuZ3VsYXJVdGlscykge1xuICAgICAgdmFyIG9wSXRlbXMgPSB7XG4gICAgICAgIEVNUFRZOiB7bmFtZTogXCIoRW1wdHkpXCIsIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgICAgRElWSURFUjoge3R5cGU6IFwiZGl2aWRlclwifSxcbiAgICAgICAgQ0xFQVJJTkc6IHtuYW1lOiBcIihDbGVhcmluZy4uLilcIiwgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAgICBVUERBVElORzoge25hbWU6IFwiKFVwZGF0aW5nLi4uKVwiLCBkaXNhYmxlZDogdHJ1ZX0sXG4gICAgICAgIENMRUFSOiB7bmFtZTogXCJDbGVhclwiLCBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsZWFyTWVudSgpO1xuICAgICAgICB9IH0sXG4gICAgICAgIFJFRlJFU0g6IHtuYW1lOiBcIlJlZnJlc2hcIiwgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWZyZXNoTWVudSgpO1xuICAgICAgICB9IH1cbiAgICAgIH07XG4gICAgICB2YXIgX3JlY2VudE1lbnUgPSBbb3BJdGVtcy5FTVBUWV07XG4gICAgICB2YXIgcmVmcmVzaE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfc2VydmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIF9yZWNlbnRNZW51LnNwbGljZSgwLCBfcmVjZW50TWVudS5sZW5ndGgsIG9wSXRlbXMuVVBEQVRJTkcpO1xuICAgICAgICBfc2VydmVyLmdldEl0ZW1zKGZ1bmN0aW9uKGl0ZW1zKSB7XG4gICAgICAgICAgdmFyIGksIEhJU1RPUllfTEVOR1RIID0gMTA7XG4gICAgICAgICAgdmFyIGdldFNob3J0TmFtZSA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgaWYgKHVybCAmJiB1cmxbdXJsLmxlbmd0aCAtIDFdID09PSBcIi9cIikge1xuICAgICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmwucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKF8uaXNFbXB0eShpdGVtcykpIHtcbiAgICAgICAgICAgIF9yZWNlbnRNZW51LnNwbGljZSgwLCBfcmVjZW50TWVudS5sZW5ndGgsIG9wSXRlbXMuRU1QVFkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVjZW50TWVudS5zcGxpY2UoMCwgX3JlY2VudE1lbnUubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGggJiYgaSA8IEhJU1RPUllfTEVOR1RIOyArK2kpIHtcbiAgICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGFuZ3VsYXIuZnJvbUpzb24oaXRlbXNbaV0pO1xuICAgICAgICAgICAgICAgICAgX3JlY2VudE1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdldFNob3J0TmFtZShpdGVtLnVyaSksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3BhdGhPcGVuZXIub3BlbihpdGVtLnVyaSwgaXRlbS50eXBlLCBpdGVtLnJlYWRPbmx5LCBpdGVtLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IGl0ZW0udXJpXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgZXhpc3RzIG9ubHkgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgICBfcmVjZW50TWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2V0U2hvcnROYW1lKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIF9wYXRoT3BlbmVyLm9wZW4oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IGl0ZW1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYW5ndWxhclV0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIGNsZWFyTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBfcmVjZW50TWVudS5zcGxpY2UoMCwgX3JlY2VudE1lbnUubGVuZ3RoLCBvcEl0ZW1zLkNMRUFSSU5HKTtcbiAgICAgICAgX3NlcnZlci5jbGVhcihyZWZyZXNoTWVudSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgX3BhdGhPcGVuZXI7XG4gICAgICByZWZyZXNoTWVudSgpOyAvLyBpbml0aWFsaXplXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbihwYXRoT3BlbmVyKSB7XG4gICAgICAgICAgX3BhdGhPcGVuZXIgPSBwYXRoT3BlbmVyO1xuICAgICAgICB9LFxuICAgICAgICBnZXRNZW51SXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfcmVjZW50TWVudTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVjb3JkUmVjZW50RG9jdW1lbnQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoX3NlcnZlcikge1xuICAgICAgICAgICAgX3NlcnZlci5hZGRJdGVtKGl0ZW0sIHJlZnJlc2hNZW51KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuc2Vzc2lvblxuICogVGhpcyBtb2R1bGUgb3ducyB0aGUgc2VydmljZXMgb2YgY29tbXVuaWNhdGluZyB0byB0aGUgc2Vzc2lvbiBiYWNrdXAgZW5kIHBvaW50IHRvIGxvYWQgYW5kXG4gKiB1cGxvYWQoYmFja3VwKSBhIHNlc3Npb24uXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnNlc3Npb24nLCBbJ2JrLnV0aWxzJ10pO1xuICAvKipcbiAgICogYmtTZXNzaW9uXG4gICAqIC0gdGFsa3MgdG8gYmVha2VyIHNlcnZlciAoL2JlYWtlci9yZXN0L3Nlc3Npb24pXG4gICAqIC0gYmtTZXNzaW9uTWFuYWdlciBzaG91bGQgZGVwZW5kIG9uIGl0IHRvIHVwZGF0ZS9iYWNrdXAgdGhlIHNlc3Npb24gbW9kZWxcbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCdia1Nlc3Npb24nLCBmdW5jdGlvbihia1V0aWxzKSB7XG4gICAgdmFyIGJhY2t1cFNlc3Npb24gPSBmdW5jdGlvbihzZXNzaW9uSWQsIHNlc3Npb25EYXRhKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBQb3N0KGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9iYWNrdXAvJyArIHNlc3Npb25JZCksIHNlc3Npb25EYXRhKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBiYWNrdXAgc2Vzc2lvbjogJyArIHNlc3Npb25JZCArICcsICcgKyBzdGF0dXMpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdGYWlsZWQgdG8gYmFja3VwIHNlc3Npb246ICcgKyBzZXNzaW9uSWQgKyAnLCAnICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgdmFyIGdldFNlc3Npb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoJ2JlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2dldEV4aXN0aW5nU2Vzc2lvbnMnKSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihzZXNzaW9ucykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzZXNzaW9ucyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnRmFpbGVkIHRvIGdldCBleGlzdGluZyBzZXNzaW9ucyAnICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgdmFyIGxvYWRTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoJ2JlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2xvYWQnKSwge3Nlc3Npb25pZDogc2Vzc2lvbklkfSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihzZXNzaW9uLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc2Vzc2lvbik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnRmFpbGVkIHRvIGxvYWQgc2Vzc2lvbjogJyArIHNlc3Npb25JZCArICcsICcgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICB2YXIgY2xvc2VTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBQb3N0KGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9jbG9zZScpLCB7c2Vzc2lvbmlkOiBzZXNzaW9uSWR9KVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzZXNzaW9uSWQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0ZhaWxlZCB0byBjbG9zZSBzZXNzaW9uOiAnICsgc2Vzc2lvbklkICsgJywgJyArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xuICAgIHZhciByZWNvcmRMb2FkZWRQbHVnaW4gPSBmdW5jdGlvbihwbHVnaW5OYW1lLCBwbHVnaW5VcmwpIHtcbiAgICAgIGJrVXRpbHMuaHR0cFBvc3QoXG4gICAgICAgICAgYmtVdGlscy5zZXJ2ZXJVcmwoJ2JlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2FkZFBsdWdpbicpLFxuICAgICAgICAgIHtwbHVnaW5uYW1lOiBwbHVnaW5OYW1lLCBwbHVnaW51cmw6IHBsdWdpblVybH0pXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdyZWNvcmRMb2FkZWRQbHVnaW4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGFkZCBwbHVnaW4sICcgKyBwbHVnaW5OYW1lICsgJywgJyArIHBsdWdpblVybCArICcsICcgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldFBsdWdpbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybCgnYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvZ2V0RXhpc3RpbmdQbHVnaW5zJyksIHt9KVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHBsdWdpbnMpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocGx1Z2lucyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnRmFpbGVkIHRvIGdldCBleGlzdGluZyBwbHVnaW5zLCAnICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldFNlc3Npb25zOiBnZXRTZXNzaW9ucyxcbiAgICAgIGxvYWQ6IGxvYWRTZXNzaW9uLFxuICAgICAgYmFja3VwOiBiYWNrdXBTZXNzaW9uLFxuICAgICAgY2xvc2U6IGNsb3NlU2Vzc2lvbixcbiAgICAgIHJlY29yZExvYWRlZFBsdWdpbjogcmVjb3JkTG9hZGVkUGx1Z2luLFxuICAgICAgZ2V0UGx1Z2luczogZ2V0UGx1Z2luc1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnNoYXJlXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBia1NoYXJlIHNlcnZpY2Ugd2hpY2ggY29tbXVuaWNhdGUgd2l0aCB0aGUgYmFja2VuZCB0byBjcmVhdGUgc2hhcmFibGVcbiAqIGNvbnRlbnQgYXMgd2VsbCBhcyB0byByZXR1cm4gVVJMIG9mIHRoZSBzaGFyZCBjb250ZW50LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5zaGFyZScsIFtdKTtcblxuICBtb2R1bGUucHJvdmlkZXIoXCJia1NoYXJlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfc2hhcmluZ1NlcnZpY2UgPSBudWxsO1xuICAgIHRoaXMuY29uZmlnID0gZnVuY3Rpb24oc2hhcmluZ1NlcnZpY2UpIHtcbiAgICAgIF9zaGFyaW5nU2VydmljZSA9IHNoYXJpbmdTZXJ2aWNlO1xuICAgIH07XG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIV9zaGFyaW5nU2VydmljZSkge1xuICAgICAgICB2YXIgbm9PcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmcgZm9yIG5vd1xuICAgICAgICAgIC8vIHdlIG1pZ2h0IGNvbnNpZGVyIGxvZ2dpbmcgZXJyb3Igb3Igd2FybmluZzpcbiAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJubyBzaGFyaW5nIHNlcnZpY2UgYXZhaWxhYmxlXCIpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHB1Ymxpc2g6IG5vT3AsXG4gICAgICAgICAgZ2V0U2hhcmFibGVVcmw6IG5vT3BcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSByZWFzb24gb2Ygd3JhcHBpbmcgdGhlIHN0cmF0ZWd5IGluc3RlYWQgb2YganVzdCByZXR1cm5cbiAgICAgIC8vIGl0IChfc2hhcmluZ1NlcnZpY2UpIGlzIHRvIG1ha2UgdGhlIEFQSSBleHBsaWNpdC5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHVyaSwgY29udGVudCwgY2IpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLnB1Ymxpc2godXJpLCBjb250ZW50LCBjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGdlbmVyYXRlRXhjZWw6IGZ1bmN0aW9uKHBhdGgsIHRhYmxlLCBjYikge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UuZ2VuZXJhdGVFeGNlbChwYXRoLCB0YWJsZSwgY2IpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybCh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9TZWN0aW9uQ2VsbDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9TZWN0aW9uQ2VsbCh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9Db2RlQ2VsbDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9Db2RlQ2VsbCh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9UYWJsZTogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9UYWJsZSh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9Ob3RlYm9vazogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9Ob3RlYm9vayh1cmkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnRyYWNrXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgdG8gM3JkIHBhcnR5IHByb3ZpZGVkIHVzYWdlIG1ldHJpY1xuICogbG9nZ2luZyBzZXJ2aWNlcy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsudHJhY2snLCBbXSk7XG5cbiAgbW9kdWxlLnByb3ZpZGVyKCdia1RyYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90cmFja2luZ1NlcnZpY2UgPSBudWxsO1xuICAgIHRoaXMuY29uZmlnID0gZnVuY3Rpb24odHJhY2tpbmdTZXJ2aWNlKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRyYWNraW5nU2VydmljZSkpIHtcbiAgICAgICAgX3RyYWNraW5nU2VydmljZSA9IHRyYWNraW5nU2VydmljZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RyYWNraW5nU2VydmljZSA9IHRyYWNraW5nU2VydmljZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFfdHJhY2tpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbG9nOiBmdW5jdGlvbihldmVudCwgb2JqKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc05lZWRQZXJtaXNzaW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2c6IGZ1bmN0aW9uKGV2ZW50LCBvYmplY3QpIHtcbiAgICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlLmxvZyhldmVudCwgb2JqZWN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBzb21lIHRyYWNraW5nIHNlcnZpY2Ugd2lsbCBuZWVkIHRvIGJlIGVuYWJsZWQgYmVmb3JlIGJlaW5nIHVzZWRcbiAgICAgICAgICBpZiAoX3RyYWNraW5nU2VydmljZS5lbmFibGUgJiYgXy5pc0Z1bmN0aW9uKF90cmFja2luZ1NlcnZpY2UuZW5hYmxlKSkge1xuICAgICAgICAgICAgX3RyYWNraW5nU2VydmljZS5lbmFibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHNvbWUgdHJhY2tpbmcgc2VydmljZSB3aWxsIG5lZWQgdG8gYmUgZW5hYmxlZCBiZWZvcmUgYmVpbmcgdXNlZFxuICAgICAgICAgIGlmIChfdHJhY2tpbmdTZXJ2aWNlLmRpc2FibGUgJiYgXy5pc0Z1bmN0aW9uKF90cmFja2luZ1NlcnZpY2UuZGlzYWJsZSkpIHtcbiAgICAgICAgICAgIF90cmFja2luZ1NlcnZpY2UuZGlzYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNOZWVkUGVybWlzc2lvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90cmFja2luZ1NlcnZpY2UuaXNOZWVkUGVybWlzc2lvblxuICAgICAgICAgICAgICAmJiBfLmlzRnVuY3Rpb24oX3RyYWNraW5nU2VydmljZS5pc05lZWRQZXJtaXNzaW9uKVxuICAgICAgICAgICAgICAmJiBfdHJhY2tpbmdTZXJ2aWNlLmlzTmVlZFBlcm1pc3Npb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay51dGlsc1xuICogVGhpcyBtb2R1bGUgY29udGFpbnMgdGhlIGxvdyBsZXZlbCB1dGlsaXRpZXMgdXNlZCBieSBCZWFrZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsudXRpbHMnLCBbXG4gICAgJ2JrLmNvbW1vblV0aWxzJyxcbiAgICAnYmsuYW5ndWxhclV0aWxzJyxcbiAgICAnYmsuY29tZXRkVXRpbHMnLFxuICAgICdiay50cmFjaydcbiAgXSk7XG4gIC8qKlxuICAgKiBia1V0aWxzXG4gICAqIC0gaG9sZHMgZ2VuZXJhbC9sb3cwbGV2ZWwgdXRpbGl0aWVzIHRoYXQgYXJlIGJlYWtlciBzcGVjaWZpYyB0aGF0IGhhcyBubyBlZmZlY3QgdG8gRE9NIGRpcmVjdGx5XG4gICAqIC0gaXQgYWxzbyBzZXJ2ZXMgdGhlIHB1cnBvc2Ugb2YgaGlkaW5nIHVuZGVybmVhdGggdXRpbHM6IGNvbW1vblV0aWxzL2FuZ3VsYXJVdGlscy8uLi5cbiAgICogICAgZnJvbSBvdGhlciBwYXJ0cyBvZiBiZWFrZXJcbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCdia1V0aWxzJywgZnVuY3Rpb24oY29tbW9uVXRpbHMsIGFuZ3VsYXJVdGlscywgYmtUcmFjaywgY29tZXRkVXRpbHMpIHtcblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc3VmZml4KSB7XG4gICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3VmZml4LCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xO1xuICAgIH1cbiAgICBcbiAgICB2YXIgc2VydmVyUm9vdCA9IGVuZHNXaXRoKGRvY3VtZW50LmJhc2VVUkksICdiZWFrZXIvJykgPyBkb2N1bWVudC5iYXNlVVJJLnN1YnN0cmluZygwLGRvY3VtZW50LmJhc2VVUkkubGVuZ3RoLTcpOiBkb2N1bWVudC5iYXNlVVJJO1xuICAgIFxuICAgIGZ1bmN0aW9uIHNlcnZlclVybChwYXRoKSB7XG4gICAgICByZXR1cm4gc2VydmVyUm9vdCArIHBhdGg7XG4gICAgfVxuXG4gICAgdmFyIGZpbGVSb290ID0gZG9jdW1lbnQuYmFzZVVSSTtcbiAgICBcbiAgICBmdW5jdGlvbiBmaWxlVXJsKHBhdGgpIHtcbiAgICAgIHJldHVybiBmaWxlUm9vdCArIHBhdGg7XG4gICAgfVxuXG4gICAgLy8gYWpheCBub3RlYm9vayBsb2NhdGlvbiB0eXBlcyBzaG91bGQgYmUgb2YgdGhlIGZvcm1cbiAgICAvLyBhamF4Oi9sb2FkaW5nL3BhdGg6L3NhdmluZy9wYXRoXG4gICAgZnVuY3Rpb24gcGFyc2VBamF4TG9jYXRvcihsb2NhdG9yKSB7XG4gICAgICB2YXIgcGllY2VzID0gbG9jYXRvci5zcGxpdChcIjpcIik7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IHBpZWNlc1sxXSwgZGVzdGluYXRpb246IHBpZWNlc1syXSB9XG4gICAgfVxuXG4gICAgdmFyIGJrVXRpbHMgPSB7XG4gICAgICAgIHNlcnZlclVybDogc2VydmVyVXJsLFxuICAgICAgICBmaWxlVXJsOiBmaWxlVXJsLFxuXG4gICAgICAvLyB3cmFwIHRyYWNraW5nU2VydmljZVxuICAgICAgbG9nOiBmdW5jdGlvbihldmVudCwgb2JqKSB7XG4gICAgICAgIGJrVHJhY2subG9nKGV2ZW50LCBvYmopO1xuICAgICAgfSxcblxuICAgICAgLy8gd3JhcCBjb21tb25VdGlsc1xuICAgICAgZ2VuZXJhdGVJZDogZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5nZW5lcmF0ZUlkKGxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgbG9hZEpTOiBmdW5jdGlvbih1cmwsIHN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmxvYWRKUyh1cmwsIHN1Y2Nlc3MpO1xuICAgICAgfSxcbiAgICAgIGxvYWRDU1M6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMubG9hZENTUyh1cmwpO1xuICAgICAgfSxcbiAgICAgIGxvYWRMaXN0OiBmdW5jdGlvbih1cmxzLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5sb2FkTGlzdCh1cmxzLCBzdWNjZXNzLCBmYWlsdXJlKTtcbiAgICAgIH0sXG4gICAgICBmb3JtYXRUaW1lU3RyaW5nOiBmdW5jdGlvbihtaWxsaXMpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmZvcm1hdFRpbWVTdHJpbmcobWlsbGlzKTtcbiAgICAgIH0sXG4gICAgICBpc01pZGRsZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuaXNNaWRkbGVDbGljayhldmVudCk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZlbnRPZmZzZXRYOiBmdW5jdGlvbihlbGVtLCBldmVudCkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuZ2V0RXZlbnRPZmZzZXRYKGVsZW0sIGV2ZW50KTtcbiAgICAgIH0sXG4gICAgICBmaW5kVGFibGU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmZpbmRUYWJsZShlbGVtKTtcbiAgICAgIH0sXG4gICAgICBzYXZlQXNDbGllbnRGaWxlOiBmdW5jdGlvbihkYXRhLCBmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuc2F2ZUFzQ2xpZW50RmlsZShkYXRhLCBmaWxlbmFtZSk7XG4gICAgICB9LFxuXG4gICAgICAvLyB3cmFwIGFuZ3VsYXJVdGlsc1xuICAgICAgcmVmcmVzaFJvb3RTY29wZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICB9LFxuICAgICAgdG9QcmV0dHlKc29uOiBmdW5jdGlvbihqc09iaikge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLnRvUHJldHR5SnNvbihqc09iaik7XG4gICAgICB9LFxuICAgICAgZnJvbVByZXR0eUpzb246IGZ1bmN0aW9uKGpTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5mcm9tUHJldHR5SnNvbihqU3RyaW5nKTtcbiAgICAgIH0sXG4gICAgICBodHRwR2V0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5odHRwR2V0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgaHR0cFBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmh0dHBQb3N0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgbmV3RGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICB9LFxuICAgICAgbmV3UHJvbWlzZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5uZXdQcm9taXNlKHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmFsbC5hcHBseShhbmd1bGFyVXRpbHMsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgICAgZmNhbGw6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5mY2FsbChmdW5jKTtcbiAgICAgIH0sXG4gICAgICBkZWxheTogZnVuY3Rpb24obXMpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5kZWxheShtcyk7XG4gICAgICB9LFxuICAgICAgdGltZW91dDogZnVuY3Rpb24oZnVuYyxtcykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLnRpbWVvdXQoZnVuYyxtcyk7XG4gICAgICB9LFxuICAgICAgY2FuY2VsVGltZW91dDogZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmNhbmNlbFRpbWVvdXQocHJvbWlzZSk7ICBcbiAgICAgIH0sXG4gICAgICBzZXRTZXJ2ZXJSb290OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgc2VydmVyUm9vdCA9IHVybDtcbiAgICAgIH0sXG4gICAgICBzZXRGaWxlUm9vdDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIGZpbGVSb290ID0gdXJsO1xuICAgICAgfSxcblxuICAgICAgLy8gYmVha2VyIHNlcnZlciBpbnZvbHZlZCB1dGlsc1xuICAgICAgZ2V0SG9tZURpcmVjdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9nZXRIb21lRGlyZWN0b3J5XCIpKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZXRWZXJzaW9uSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvdXRpbC9nZXRWZXJzaW9uSW5mb1wiKSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2V0U3RhcnRVcERpcmVjdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9nZXRTdGFydFVwRGlyZWN0b3J5XCIpKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZXREZWZhdWx0Tm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvdXRpbC9nZXREZWZhdWx0Tm90ZWJvb2tcIikpLlxuICAgICAgICAgICAgc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoYW5ndWxhci5mcm9tSnNvbihkYXRhKSk7XG4gICAgICAgICAgICB9KS5cbiAgICAgICAgICAgIGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVyLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGRhdGEsIHN0YXR1cywgaGVhZGVyLCBjb25maWcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdlbmVyYXRlTm90ZWJvb2s6IGZ1bmN0aW9uKGV2YWx1YXRvcnMsIGNlbGxzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYmVha2VyOiBcIjJcIixcbiAgICAgICAgICBldmFsdWF0b3JzOiBldmFsdWF0b3JzLFxuICAgICAgICAgIGNlbGxzOiBjZWxsc1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGxvYWRGaWxlOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL2xvYWRcIiksIHtwYXRoOiBwYXRofSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFfLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5ndWxhciAkaHR0cCBhdXRvLWRldGVjdHMgSlNPTiByZXNwb25zZSBhbmQgZGVzZXJpYWxpemUgaXQgdXNpbmcgYSBKU09OIHBhcnNlclxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhpcyBiZWhhdmlvciwgdGhpcyBpcyBhIGhhY2sgdG8gcmV2ZXJzZSBpdFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG5cbiAgICAgIGxvYWRIdHRwOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2h0dHAtcHJveHkvbG9hZFwiKSwge3VybDogdXJsfSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFfLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5ndWxhciAkaHR0cCBhdXRvLWRldGVjdHMgSlNPTiByZXNwb25zZSBhbmQgZGVzZXJpYWxpemUgaXQgdXNpbmcgYSBKU09OIHBhcnNlclxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhpcyBiZWhhdmlvciwgdGhpcyBpcyBhIGhhY2sgdG8gcmV2ZXJzZSBpdFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBsb2FkQWpheDogZnVuY3Rpb24oYWpheExvY2F0b3IpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwR2V0KHBhcnNlQWpheExvY2F0b3IoYWpheExvY2F0b3IpLnNvdXJjZSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFfLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5ndWxhciAkaHR0cCBhdXRvLWRldGVjdHMgSlNPTiByZXNwb25zZSBhbmQgZGVzZXJpYWxpemUgaXQgdXNpbmcgYSBKU09OIHBhcnNlclxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhpcyBiZWhhdmlvciwgdGhpcyBpcyBhIGhhY2sgdG8gcmV2ZXJzZSBpdFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBzYXZlRmlsZTogZnVuY3Rpb24ocGF0aCwgY29udGVudEFzSnNvbiwgb3ZlcndyaXRlKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBQb3N0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2ZpbGUtaW8vc2F2ZVwiKSwge3BhdGg6IHBhdGgsIGNvbnRlbnQ6IGNvbnRlbnRBc0pzb259KVxuICAgICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cFBvc3Qoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9zYXZlSWZOb3RFeGlzdHNcIiksIHtwYXRoOiBwYXRoLCBjb250ZW50OiBjb250ZW50QXNKc29ufSlcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVyLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSA0MDkpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImV4aXN0c1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IFwiaXNEaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHNhdmVBamF4OiBmdW5jdGlvbihhamF4TG9jYXRvciwgY29udGVudEFzSnNvbikge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gcGFyc2VBamF4TG9jYXRvcihhamF4TG9jYXRvcikuZGVzdGluYXRpb247XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwUHV0SnNvbihkZXN0aW5hdGlvbiwge2RhdGE6IGNvbnRlbnRBc0pzb259KVxuICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGluaXRpYWxpemVDb21ldGQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMuaW5pdGlhbGl6ZUNvbWV0ZCh1cmkpO1xuICAgICAgfSxcbiAgICAgIGFkZENvbm5lY3RlZFN0YXR1c0xpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMuYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoY2IpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICB9LFxuICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5kaXNjb25uZWN0KCk7XG4gICAgICB9LFxuXG4gICAgICBiZWdpbnNXaXRoOiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiAoaGF5c3RhY2suc3Vic3RyKDAsIG5lZWRsZS5sZW5ndGgpID09PSBuZWVkbGUpO1xuICAgICAgfSxcblxuICAgICAgLy8gd3JhcHBlciBhcm91bmQgcmVxdWlyZUpTXG4gICAgICBtb2R1bGVNYXA6IHt9LFxuICAgICAgbG9hZE1vZHVsZTogZnVuY3Rpb24odXJsLCBuYW1lKSB7XG4gICAgICAgIC8vIG5hbWUgaXMgb3B0aW9uYWwsIGlmIHByb3ZpZGVkLCBpdCBjYW4gYmUgdXNlZCB0byByZXRyaWV2ZSB0aGUgbG9hZGVkIG1vZHVsZSBsYXRlci5cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICBpZiAoXy5pc1N0cmluZyh1cmwpKSB7XG4gICAgICAgICAgdmFyIGRlZmVycmVkID0gdGhpcy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgIHdpbmRvdy5yZXF1aXJlKFt1cmxdLCBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShuYW1lKSkge1xuICAgICAgICAgICAgICB0aGF0Lm1vZHVsZU1hcFtuYW1lXSA9IHVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmV0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwibW9kdWxlIGZhaWxlZCB0byBsb2FkXCIsXG4gICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgXCJpbGxlZ2FsIGFyZ1wiICsgdXJsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZTogZnVuY3Rpb24obmFtZU9yVXJsKSB7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLm1vZHVsZU1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lT3JVcmwpID8gdGhpcy5tb2R1bGVNYXBbbmFtZU9yVXJsXSA6IG5hbWVPclVybDtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1aXJlKHVybCk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYmtVdGlscztcbiAgfSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9