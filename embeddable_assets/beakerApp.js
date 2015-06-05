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
      bkUtils, bkCoreManager, bkSession, bkMenuPluginManager, bkTrack) {
    return {
      restrict: 'E',
      template: JST["controlpanel/controlpanel"](),
      controller: function($scope) {
        document.title = "Beaker";
        var _impl = {
          name: "bkControlApp",
          showAnonymousTrackingDialog: function() {
            $scope.isAllowAnonymousTracking = null;
          }
        };

        bkCoreManager.setBkAppImpl(_impl);

        $scope.gotoControlPanel = function(event) {
          if (bkUtils.isMiddleClick(event)) {
            window.open("./");
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
          bkCoreManager.openNotebook("config/tutorial.bkr", undefined, true);
        };

       
        $scope.isAllowAnonymousTracking = false;
        if ((window.beaker === undefined || window.beaker.isEmbedded === undefined) && bkTrack.isNeedPermission()) {
          bkUtils.httpGet("../beaker/rest/util/isAllowAnonymousTracking").then(function(allow) {
            switch (allow.data) {
              case "true":
                $scope.isAllowAnonymousTracking = true;
                break;
              case "false":
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
          $scope.$watch("isAllowAnonymousTracking", function(newValue, oldValue) {
            if (newValue !== oldValue) {
              var allow = null;
              if (newValue) {
                allow = "true";
                bkTrack.enable();
              } else if (newValue === false) {
                allow = "false";
                bkTrack.disable();
              }
              bkUtils.httpPost("../beaker/rest/util/setAllowAnonymousTracking", { allow: allow });
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
	$scope.$on("$destroy", onDestroy);

       
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
            console.log("using code mirror");
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
      $routeParams,
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
            window.open("./");
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
      var keys = Object.keys(node), i, value;
      parents.push(node);
      for (i = keys.length-1; i>=0; i--) {
        value = node[keys[i]];
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
        _edited = !!edited;
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
        _edited = !!edited;
        _sessionId = sessionId;

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
        _edited = false;
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
        if (_sessionId && !_notebookModel.isEmpty()) {
          return bkSession.backup(_sessionId, generateBackupData());
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
          _edited = true;
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
        _edited = true;
      },
      removeEvaluator: function(plugin) {
        var model = _notebookModel.get();
        model.evaluators = _.reject(model.evaluators, function(e) {
          return e.plugin == plugin;
        });
        _edited = true;
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
    var CELL_TYPE = "notebook";
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/notebook"](),
      scope: {
        setBkNotebook: "&",
        isLoading: "="
      },
      controller: function ($scope) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var _impl = {
          _viewModel: {
            _debugging: false,
            _showOutput: false,
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
            cm.setOption("keyMap", this._cmKeyMapMode);
            cm.setOption("vimMode", this._cmKeyMapMode == "vim");
          },
          unregisterCM: function (cellId) {
            delete this._codeMirrors[cellId];
            this._codeMirrors[cellId] = null;
          },
          _cmKeyMapMode: "default",
          setCMKeyMapMode: function (keyMapMode) {
            this._cmKeyMapMode = keyMapMode;
            _.each(this._codeMirrors, function (cm) {
              cm.setOption("keyMap", keyMapMode);
              cm.setOption("vimMode", keyMapMode == "vim");
            });
          },
          getCMKeyMapMode: function () {
            return this._cmKeyMapMode;
          }
        };
        $scope.setBkNotebook({bkNotebook: _impl});

        $scope.getFullIndex = function() { return "1" }

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
            type: "GET",
            datatype: "json",
            url: bkUtils.serverUrl("beaker/rest/outputlog/clear"),
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
        var margin = $(".outputlogstdout").position().top;
        var outputLogHeight = 300;
        var dragHeight;
        var fixOutputLogPosition = function () {
          $(".outputlogcontainer").css("top", window.innerHeight - outputLogHeight);
          $(".outputlogcontainer").css("height", outputLogHeight);
          $(".outputlogbox").css("height", outputLogHeight - margin - 5);
        };
        $scope.unregisters = [];
        $(window).resize(fixOutputLogPosition);
        $scope.unregisters.push(function() {
          $(window).off("resize", fixOutputLogPosition);
        });
        var dragStartHandler = function () {
          dragHeight = outputLogHeight;
        };
        var outputloghandle = $(".outputloghandle");
        outputloghandle.drag("start", dragStartHandler);
        $scope.unregisters.push(function() {
          outputloghandle.off("dragstart", dragStartHandler);
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
          outputloghandle.off("drag", dragHandler);
        });

        $scope.getChildren = function () {
         
          return notebookCellOp.getChildren("root");
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
          name: "Share",
          items: []
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          shareMenu.items = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
        });
        $scope.isInitializationCell = function () {
          return bkSessionManager.isRootCellInitialization();
        };
        $scope.menuItems = [
          {
            name: "Run all",
            action: function () {
              bkCoreManager.getBkApp().evaluateRoot("root").
                  catch(function (data) {
                    console.error(data);
                  });
            }
          },
          {
            name: "Initialization Cell",
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

        bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/util/isUseAdvancedMode")).success(function(isAdvanced) {
          if (_impl._viewModel.isAdvancedMode() != (isAdvanced === "true")) {
            _impl._viewModel.toggleAdvancedMode();
          }
        });
      },
      link: function (scope, element, attrs) {
        var div = element.find(".bkcell").first();
        div.click(function (event) {
         
          if (bkUtils.getEventOffsetX(div, event) >= div.width()) {
            var menu = div.find('.bkcellmenu').last();
            menu.css("top", event.clientY);
            menu.css("left", event.clientX - 150);
            menu.find('.dropdown-toggle').first().dropdown('toggle');
            event.stopPropagation();
          }
        });
        if (scope.isInitializationCell()) {
          div.addClass("initcell");
        } else {
          div.removeClass("initcell");
        }
        scope.getNotebookElement = function() {
          return element;
        };
        scope.$watch('isInitializationCell()', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue) {
              div.addClass("initcell");
            } else {
              div.removeClass("initcell");
            }
          }
        });
        scope.$on("$destroy", function() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImNvbnRyb2xwYW5lbC5qcyIsImNvbnRyb2xwYW5lbC1kaXJlY3RpdmUuanMiLCJjb250cm9scGFuZWxzZXNzaW9uaXRlbS1kaXJlY3RpdmUuanMiLCJjZWxsbWVudXBsdWdpbm1hbmFnZXIuanMiLCJjb3JlLmpzIiwiZGVidWcuanMiLCJldmFsdWF0ZXBsdWdpbm1hbmFnZXIuanMiLCJoZWxwZXIuanMiLCJtZW51cGx1Z2lubWFuYWdlci5qcyIsIm5vdGVib29rLXJvdXRlci5qcyIsIm1haW5hcHAuanMiLCJldmFsdWF0ZWpvYm1hbmFnZXIuanMiLCJldmFsdWF0b3JtYW5hZ2VyLmpzIiwibm90ZWJvb2tjZWxsbW9kZWxtYW5hZ2VyLmpzIiwibm90ZWJvb2tuYW1lc3BhY2Vtb2RlbG1hbmFnZXIuanMiLCJzZXNzaW9ubWFuYWdlci5qcyIsIm5vdGVib29rLmpzIiwiY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbGlucHV0bWVudS1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dG1lbnUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd24tZWRpdGFibGUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd25jZWxsLWRpcmVjdGl2ZS5qcyIsIm5ld2NlbGxtZW51LWRpcmVjdGl2ZS5qcyIsIm5vdGVib29rLWRpcmVjdGl2ZS5qcyIsInNlY3Rpb25jZWxsLWRpcmVjdGl2ZS5qcyIsInRleHRjZWxsLWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXkuanMiLCJvdXRwdXRkaXNwbGF5LWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXlmYWN0b3J5LXNlcnZpY2UuanMiLCJvdXRwdXRkaXNwbGF5c2VydmljZW1hbmFnZXItc2VydmljZS5qcyIsInBsdWdpbm1hbmFnZXItZGlyZWN0aXZlLmpzIiwicGx1Z2lubWFuYWdlcmV2YWx1YXRvcnNldHRpbmdzLWRpcmVjdGl2ZS5qcyIsImNvZGVjZWxsb3B0aW9ucy1kaXJlY3RpdmUuanMiLCJjb21tb251dGlscy5qcyIsImNvbW1vbnVpLmpzIiwiYW5ndWxhcnV0aWxzLmpzIiwidHJlZXZpZXcuanMiLCJjb21ldGR1dGlscy5qcyIsIm5vdGVib29rdmVyc2lvbm1hbmFnZXIuanMiLCJvdXRwdXRsb2cuanMiLCJyZWNlbnRtZW51LmpzIiwic2Vzc2lvbi5qcyIsInNoYXJlLmpzIiwidHJhY2suanMiLCJ1dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMXVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2b0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcm1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3aENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJiZWFrZXJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJjb250cm9scGFuZWwvY29udHJvbHBhbmVsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48aGVhZGVyIGNsYXNzPVwibmF2YmFyLWZpeGVkLXRvcCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWludmVyc2UgYmtyXCI+XFxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kIGJrclwiIGhyZWY9XCIvYmVha2VyLyMvY29udHJvbFwiIG5nLWNsaWNrPVwiZ290b0NvbnRyb2xQYW5lbCgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgPGltZyBzcmM9XCJhcHAvaW1hZ2VzL2JlYWtlcl9pY29uQDJ4LnBuZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgQmVha2VyXFxuICAgIDwvYT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBia3JcIj5cXG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgYmtyXCI+XFxuICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24gYmtyXCIgbmctcmVwZWF0PVwibSBpbiBnZXRNZW51cygpXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSB7e20uaWR9fSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+e3ttLm5hbWV9fTwvYT5cXG4gICAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJtLml0ZW1zXCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgICAgPC9saT5cXG4gICAgICA8cCBuZy1pZj1cImRpc2Nvbm5lY3RlZFwiIGNsYXNzPVwibmF2YmFyLXRleHQgdGV4dC1kYW5nZXIgcmlnaHQgYmtyXCI+XFxuICAgICAgICBvZmZsaW5lXFxuICAgICAgPC9wPlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XFxuPC9oZWFkZXI+XFxuXFxuPGRpdiBjbGFzcz1cImRhc2hib2FyZCBjb250YWluZXItZmx1aWQgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGJrclwiPlxcblxcbiAgICAgIDxoMSBjbGFzcz1cImJrclwiPkJlYWtlciA8c21hbGwgY2xhc3M9XCJia3JcIj5UaGUgZGF0YSBzY2llbnRpc3RcXCdzIGxhYm9yYXRvcnk8L3NtYWxsPjwvaDE+XFxuXFxuICAgICAgPGRpdiBuZy1pZj1cImlzU2Vzc2lvbnNMaXN0RW1wdHkoKVwiIGNsYXNzPVwiZW1wdHktc2Vzc2lvbi1wcm9tcHQgYmtyXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVwiYmtyXCI+Q2xpY2sgYmVsb3cgdG8gZ2V0IHN0YXJ0ZWQgY29kaW5nIGluIFB5dGhvbiwgUiwgSmF2YVNjcmlwdCwgSnVsaWEsIFNjYWxhLCBKYXZhLCBHcm9vdnksIGFuZCBSdWJ5LiA8YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICBCZWdpbm5lcnMgc2hvdWxkIGNoZWNrIG91dCB0aGUgPHN0cm9uZyBjbGFzcz1cImJrclwiPkhlbHAg4oaSIFR1dG9yaWFsPC9zdHJvbmc+LjwvcD5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IG5nLWhpZGU9XCJpc1Nlc3Npb25zTGlzdEVtcHR5KClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVwib3Blbi1ub3RlYm9vay1oZWFkbGluZSBia3JcIj5PcGVuIE5vdGVib29rczwvaDQ+XFxuICAgICAgICA8YmstY29udHJvbC1wYW5lbC1zZXNzaW9uLWl0ZW0gY2xhc3M9XCJvcGVuLW5vdGVib29rcyBia3JcIj48L2JrLWNvbnRyb2wtcGFuZWwtc2Vzc2lvbi1pdGVtPlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbmV3LW5vdGVib29rIGJrclwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB0ZXh0LWNlbnRlciBidG4tYmxvY2sgYmtyXCIgbmctY2xpY2s9XCJuZXdOb3RlYm9vaygpXCI+TmV3IERlZmF1bHQgTm90ZWJvb2s8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgdGV4dC1jZW50ZXIgYnRuLWJsb2NrIG5ldy1lbXB0eS1ub3RlYm9vayBia3JcIiBuZy1jbGljaz1cIm5ld0VtcHR5Tm90ZWJvb2soKVwiPk5ldyBFbXB0eSBOb3RlYm9vazwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy02IGJrclwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmF1eC1kcm9wLXpvbmUgYmtyXCI+XFxuICAgICAgICAgICAgT3IgZHJhZyBhIC5ia3IgZmlsZSBhbnl3aGVyZSBvbiB0aGlzIHBhZ2UgdG8gaW1wb3J0XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiIG5nLXNob3c9XCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPT0gbnVsbFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgd2VsbCBia3JcIj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGIgY2xhc3M9XCJia3JcIj5UcmFjayBhbm9ueW1vdXMgdXNhZ2UgaW5mbz88L2I+XFxuICAgICAgPC9wPlxcblxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICBXZSB3b3VsZCBsaWtlIHRvIGNvbGxlY3QgYW5vbnltb3VzIHVzYWdlIGluZm8gdG8gaGVscCBpbXByb3ZlIG91ciBwcm9kdWN0LiBXZSBtYXkgc2hhcmUgdGhpcyBpbmZvcm1hdGlvblxcbiAgICAgICAgd2l0aCBvdGhlciBwYXJ0aWVzLCBpbmNsdWRpbmcsIGluIHRoZSBzcGlyaXQgb2Ygb3BlbiBzb2Z0d2FyZSwgYnkgbWFraW5nIGl0IHB1YmxpY2x5IGFjY2Vzc2libGUuPGJyIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPC9wPlxcblxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9wcml2YWN5XCIgY2xhc3M9XCJia3JcIj5Qcml2YWN5IHBvbGljeTwvYT4gLSA8YSBjbGFzcz1cImN1cnNvcl9oYW5kIGJrclwiIG5nLWNsaWNrPVwic2hvd1doYXRXZUxvZygpXCI+V2hhdCB3aWxsIHdlIGxvZz88L2E+XFxuICAgICAgPC9wPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgYmtyXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiIG5nLWNsaWNrPVwiaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gZmFsc2VcIj5ObywgZG9uXFwndCB0cmFjazwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tYWN0aXZlIGJrclwiIG5nLWNsaWNrPVwiaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gdHJ1ZVwiPlllcywgdHJhY2sgbXkgaW5mbzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiY29udHJvbHBhbmVsL3RhYmxlXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48dWwgY2xhc3M9XCJub3RlYm9vay1kYXNoYm9hcmQtbGlzdCBia3JcIj5cXG4gIDxsaSBjbGFzcz1cInNlc3Npb24gY2xlYXJmaXggYmtyXCIgbmctcmVwZWF0PVwic2Vzc2lvbiBpbiBzZXNzaW9ucyB8IG9yZGVyQnk6JnF1b3Q7b3BlbmVkRGF0ZSZxdW90Ozp0cnVlXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnQgYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNhcHRpb24gYmtyXCIgbmctY2xpY2s9XCJvcGVuKHNlc3Npb24pXCI+e3tnZXRDYXB0aW9uKHNlc3Npb24pfX08L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwibGlnaHQgcGF0aCBia3JcIiBuZy1pZj1cImdldERlc2NyaXB0aW9uKHNlc3Npb24pXCI+XFxuICAgICAgICB7e2dldERlc2NyaXB0aW9uKHNlc3Npb24pfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBwdWxsLXJpZ2h0IGNsb3NlLXNlc3Npb24gYmtyXCIgbmctY2xpY2s9XCJjbG9zZShzZXNzaW9uKVwiPkNsb3NlPC9hPlxcbiAgICA8ZGl2IGNsYXNzPVwib3Blbi1kYXRlIGxpZ2h0IHB1bGwtcmlnaHQgYmtyXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJia3JcIj5PcGVuZWQgb248L3NwYW4+XFxuICAgICAge3tzZXNzaW9uLm9wZW5lZERhdGUgfCBkYXRlOlxcJ21lZGl1bVxcJ319XFxuICAgIDwvZGl2PlxcbiAgPC9saT5cXG48L3VsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiY29udHJvbHBhbmVsL3doYXRfd2VfbG9nXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJrclwiPlxcbiAgPGgzIGNsYXNzPVwiYmtyXCI+V2hhdCB3aWxsIHdlIGxvZzwvaDM+XFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8YiBjbGFzcz1cImJrclwiPldoYXQgd2UgbG9nOjwvYj5cXG4gIDwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+V2UgdXNlIEdvb2dsZSBBbmFseXRpY3MgdG8gY29sbGVjdCB1c2FnZSBpbmZvLiBHb29nbGUgQW5hbHl0aWNzIGNvbGxlY3RzIGRhdGEgc3VjaCBhcyBob3cgbG9uZyB5b3Ugc3BlbmQgaW4gQmVha2VyLCB3aGF0IGJyb3dzZXIgeW91XFwncmUgdXNpbmcsIGFuZCB5b3VyIGdlb2dyYXBoaWMgcmVnaW9uLjwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+SW4gYWRkaXRpb24gdG8gdGhlIHN0YW5kYXJkIEdvb2dsZSBBbmFseXRpY3MgY29sbGVjdGlvbiwgd2VcXCdyZSBsb2dnaW5nIGhvdyBtYW55IHRpbWVzIHlvdSBydW4gY2VsbHMgaW4gZWFjaCBsYW5ndWFnZSBhbmQgd2hhdCB0eXBlcyBvZiBub3RlYm9va3MgeW91IG9wZW4gKGxvY2FsIC5ia3IgZmlsZSwgcmVtb3RlIC5pcHluYiwgZXQgY2V0ZXJhKS48L3A+XFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8YiBjbGFzcz1cImJrclwiPldoYXQgd2UgPGkgY2xhc3M9XCJia3JcIj5kb25cXCd0PC9pPiBsb2c6PC9iPlxcbiAgPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5XZSB3aWxsIG5ldmVyIGxvZyBhbnkgb2YgdGhlIGNvZGUgeW91IHJ1biBvciB0aGUgbmFtZXMgb2YgeW91ciBub3RlYm9va3MuPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5QbGVhc2Ugc2VlIG91ciA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9wcml2YWN5XCIgY2xhc3M9XCJia3JcIj5wcml2YWN5IHBvbGljeTwvYT4gZm9yIG1vcmUgaW5mb3JtYXRpb24uPC9wPlxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyXCI+XFxuICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImNsb3NlKClcIj5Hb3QgaXQ8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImhlbHBlcnMvcGx1Z2luLWxvYWQtZXJyb3JcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5MYW5ndWFnZSBFcnJvcjwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5GYWlsZWQgdG8gc3RhcnQgJyArXG4oKF9fdCA9IChwbHVnaW5JZCkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJy48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5EaWQgeW91IGluc3RhbGwgaXQgYWNjb3JkaW5nIHRvIHRoZSBpbnN0cnVjdGlvbnNcXG5vbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9nZXR0aW5nLXN0YXJ0ZWQjJyArXG4oKF9fdCA9IChwbHVnaW5JZCkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJ1wiIGNsYXNzPVwiYmtyXCI+QmVha2VyTm90ZWJvb2suY29tPC9hPj9cXG48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5JZiB5b3UgYWxyZWFkeSBoYXZlIGl0LCB0aGVuIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdHdvc2lnbWEvYmVha2VyLW5vdGVib29rL3dpa2kvTGFuZ3VhZ2UtUHJlZmVyZW5jZXNcIiBjbGFzcz1cImJrclwiPmVkaXRcXG55b3VyIHByZWZlcmVuY2VzIGZpbGU8L2E+IHRvIGhlbHAgQmVha2VyIGZpbmQgaXQgb24geW91ciBzeXN0ZW0sIGFuZFxcbnRoZW4gcmVzdGFydCBCZWFrZXIgYW5kIHRyeSBhZ2Fpbi5cXG48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5Bbnkgb3RoZXIgbGFuZ3VhZ2VzIGluIHlvdXIgbm90ZWJvb2sgc2hvdWxkIHN0aWxsIHdvcmsuPC9wPlxcblxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyIGJrclwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJlYWtlci1idG4gYWN0aXZlIGJrclwiIG5nLWNsaWNrPVwiJGNsb3NlKClcIj5PSzwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvZHJvcGRvd25cIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVcIj5cXG4gIDxiay1kcm9wZG93bi1tZW51LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiBnZXRNZW51SXRlbXMoKSB8IGZpbHRlcjppc0hpZGRlbiB8IG9yZGVyQnk6XFwnc29ydG9yZGVyXFwnXCIgaXRlbT1cIml0ZW1cIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudS1pdGVtPlxcbjwvdWw+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kcm9wZG93bl9pdGVtXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48bGkgbmctY2xhc3M9XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIiBjbGFzcz1cImJrclwiPlxcbiAgPGEgaHJlZj1cIiNcIiB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJydW5BY3Rpb24oaXRlbSlcIiBuZy1jbGFzcz1cImdldEFDbGFzcyhpdGVtKVwiIGlkPVwie3tpdGVtLmlkfX1cIiB0aXRsZT1cInt7aXRlbS50b29sdGlwfX1cIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlxcbiAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2sgYmtyXCIgbmctc2hvdz1cImlzTWVudUl0ZW1DaGVja2VkKGl0ZW0pXCI+PC9pPlxcbiAgICB7e2dldE5hbWUoaXRlbSl9fVxcbiAgPC9hPlxcbjwvbGk+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9maWxlYWN0aW9uZGlhbG9nXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJrclwiPlxcbiAgPGgxIGNsYXNzPVwiYmtyXCI+e3thY3Rpb25OYW1lfX08L2gxPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGJrclwiPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5QYXRoOiA8aW5wdXQgbmFtZT1cInt7aW5wdXRJZH19XCIgbmctbW9kZWw9XCJyZXN1bHRcIiBjbGFzcz1cImJrclwiPjwvcD5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShyZXN1bHQpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYmtyXCI+e3thY3Rpb25OYW1lfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL29wZW5ub3RlYm9va1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIj5cXG4gICA8aDEgY2xhc3M9XCJia3JcIj57eyBnZXRTdHJhdGVneSgpLnRpdGxlIHx8IFxcJ09wZW5cXCd9fTxzcGFuIG5nLXNob3c9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2hvd1NwaW5uZXJcIiBjbGFzcz1cImJrclwiPjxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGJrclwiPjwvaT48L3NwYW4+PC9oMT5cXG4gICA8ZGl2IGNsYXNzPVwiZmlsdGVycy1hbmQtc29ydHMgYmtyXCI+XFxuICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gYmtyXCI+XFxuICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxcbiAgICAgICAgIFNvcnQgYnk6IHt7Z2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmdldFByZXR0eU9yZGVyQnkoKX19XFxuICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCI+XFxuICAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCd1cmlcXCcsIHJldmVyc2U6IGZhbHNlIH0pXCIgY2xhc3M9XCJia3JcIj5OYW1lPC9hPjwvbGk+XFxuICAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCdtb2RpZmllZFxcJywgcmV2ZXJzZTogdHJ1ZSB9KVwiIGNsYXNzPVwiYmtyXCI+RGF0ZSBNb2RpZmllZDwvYT48L2xpPlxcbiAgICAgICA8L3VsPlxcbiAgICAgPC9kaXY+XFxuICAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZml4ZWQgYmtyXCI+XFxuICAgPHRyZWUtdmlldyByb290dXJpPVwiL1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG4gICA8dHJlZS12aWV3IHJvb3R1cmk9XCInICtcbl9fZSggaG9tZWRpciApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIj5cXG4gICA8ZGl2IGNsYXNzPVwidGV4dC1sZWZ0IGJrclwiPkVudGVyIGEgZmlsZSBwYXRoIChlLmcuIC9Vc2Vycy8uLi4pIG9yIFVSTCAoZS5nLiBodHRwOi8vLi4uKTo8L2Rpdj5cXG4gICA8cCBjbGFzcz1cImJrclwiPjxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImdldFN0cmF0ZWd5KCkuaW5wdXRcIiBuZy1rZXlwcmVzcz1cImdldFN0cmF0ZWd5KCkuY2xvc2UoJGV2ZW50LCBjbG9zZSlcIiBmb2N1cy1zdGFydD1cIlwiPjwvcD5cXG4gICA8c3BhbiBzdHlsZT1cImZsb2F0OmxlZnRcIiBuZy1pZj1cImdldFN0cmF0ZWd5KCkuZXh0ID09PSB1bmRlZmluZWRcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPVwidmVydGljYWwtYWxpZ246dG9wXCIgbmctbW9kZWw9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXJcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgPHNwYW4gbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXIgPSAhZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmFwcGx5RXh0RmlsdGVyXCIgY2xhc3M9XCJia3JcIj5zaG93ICcgK1xuKChfX3QgPSAoIGV4dGVuc2lvbiApKSA9PSBudWxsID8gJycgOiBfX3QpICtcbicgZmlsZXMgb25seTwvc3Bhbj5cXG4gICA8L3NwYW4+XFxuICAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoZ2V0U3RyYXRlZ3koKS5nZXRSZXN1bHQoKSlcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBtb2RhbC1zdWJtaXQgYmtyXCI+e3sgZ2V0U3RyYXRlZ3koKS5jbG9zZWJ0biB8fCBcXCdPcGVuXFwnfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL3NhdmVub3RlYm9va1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPlNhdmUgPHNwYW4gbmctc2hvdz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5zaG93U3Bpbm5lclwiIGNsYXNzPVwiYmtyXCI+XFxuICA8aSBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBia3JcIj48L2k+PC9zcGFuPjwvaDE+XFxuICA8ZGl2IGNsYXNzPVwiZmlsdGVycy1hbmQtc29ydHMgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia3JcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBkcm9wZG93bi10b2dnbGUgYmtyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cXG4gICAgICAgIFNvcnQgYnk6IHt7Z2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmdldE9yZGVyQnkoKX19XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiPlxcbiAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCd1cmlcXCcsIHJldmVyc2U6IGZhbHNlIH0pXCIgY2xhc3M9XCJia3JcIj5OYW1lPC9hPjwvbGk+XFxuICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ21vZGlmaWVkXFwnLCByZXZlcnNlOiB0cnVlIH0pXCIgY2xhc3M9XCJia3JcIj5EYXRlIE1vZGlmaWVkPC9hPjwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBia3JcIiBzdHlsZT1cInBhZGRpbmctYm90dG9tOiAxMDZweFwiPiBcXG4gIDx0cmVlLXZpZXcgcm9vdHVyaT1cIi9cIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICA8dHJlZS12aWV3IHJvb3R1cmk9XCInICtcbl9fZSggaG9tZWRpciApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICA8dHJlZS12aWV3IG5nLWlmPVwiXFwnJyArXG5fX2UoIGhvbWVkaXIgKSArXG4nXFwnICE9IFxcJycgK1xuX19lKCBwd2QgKSArXG4nXFwnXCIgcm9vdHVyaT1cIicgK1xuX19lKCBwd2QgKSArXG4nXCIgZnM9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnNcIiBjbGFzcz1cImJrclwiPjwvdHJlZS12aWV3PlxcbiAgXFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogMTA2cHhcIj4gXFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8aW5wdXQgaWQ9XCJzYXZlQXNGaWxlSW5wdXRcIiBjbGFzcz1cImxlZnQgYmtyXCIgbmctbW9kZWw9XCJnZXRTdHJhdGVneSgpLmlucHV0XCIgbmcta2V5cHJlc3M9XCJnZXRTdHJhdGVneSgpLmNsb3NlKCRldmVudCwgY2xvc2UpXCIgZm9jdXMtc3RhcnQ9XCJcIj5cXG4gICAgPGkgY2xhc3M9XCJuZXctZm9sZGVyIGJrLWljb24gYmtyXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJNYWtlIG5ldyBkaXJlY3RvcnkgKHt7Z2V0U3RyYXRlZ3koKS5pbnB1dH19KVwiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS5uZXdGb2xkZXIoZ2V0U3RyYXRlZ3koKS5pbnB1dClcIj48L2k+XFxuICA8L3A+XFxuICA8c3BhbiBzdHlsZT1cImZsb2F0OmxlZnRcIiBjbGFzcz1cImJrclwiPnt7Z2V0U3RyYXRlZ3koKS5nZXRSZXN1bHQoKX19PC9zcGFuPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShnZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJrclwiIG5nLWRpc2FibGVkPVwiZ2V0U3RyYXRlZ3koKS5nZXRTYXZlQnRuRGlzYWJsZWQoKVwiPlNhdmU8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvZGlhbG9ncy9jb2RlY2VsbG9wdGlvbnNcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5Db2RlIENlbGwgT3B0aW9uczwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ob3Jpem9udGFsIGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwiY2VsbC1pZFwiIGNsYXNzPVwiY29udHJvbC1sYWJlbCBjb2wtc20tMiBia3JcIj5JZDwvbGFiZWw+XFxuICAgICAgPGRpdiBuZy1jbGFzcz1cImlzRXJyb3IoKSA/IFxcJ2NvbC1zbS03XFwnIDogXFwnY29sLXNtLTEwXFwnXCIgY2xhc3M9XCJia3JcIj48aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJjZWxsTmFtZVwiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBia3JcIiBuZy1pZj1cImlzRXJyb3IoKVwiPjxzcGFuIGNsYXNzPVwiaGVscC1pbmxpbmUgYmtyXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj57e2dldE5hbWVFcnJvcigpfX08L3NwYW4+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwiY2VsbC10YWdzXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsIGNvbC1zbS0yIGJrclwiPlRhZ3M8L2xhYmVsPlxcbiAgICAgIDxkaXYgbmctY2xhc3M9XCJpc0Vycm9yKCkgPyBcXCdjb2wtc20tN1xcJyA6IFxcJ2NvbC1zbS0xMFxcJ1wiIGNsYXNzPVwiYmtyXCI+PGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJrclwiIG5nLW1vZGVsPVwiY2VsbFRhZ3NcIj48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgYmtyXCIgbmctaWY9XCJpc0Vycm9yKClcIj48c3BhbiBjbGFzcz1cImhlbHAtaW5saW5lIGJrclwiIHN0eWxlPVwiY29sb3I6cmVkXCI+e3tnZXRUYWdFcnJvcigpfX08L3NwYW4+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLW9mZnNldC0yIGNvbC1zbS0xMCBia3JcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGVja2JveCBia3JcIj5cXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwiaW5pdGlhbGl6YXRpb25DZWxsXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICBJbml0aWFsaXphdGlvbiBDZWxsXFxuICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJzYXZlKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBia3JcIiBuZy1jbGFzcz1cInNhdmVEaXNhYmxlZCgpICZhbXA7JmFtcDsgXFwnZGlzYWJsZWRcXCdcIj5TYXZlPC9idXR0b24+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kYXNoYm9hcmQvYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICc8YmstY29udHJvbC1wYW5lbCBjbGFzcz1cImJrclwiPjwvYmstY29udHJvbC1wYW5lbD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL21haW5hcHAvYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICc8YmstbWFpbi1hcHAgc2Vzc2lvbi1pZD1cInt7c2Vzc2lvbklkfX1cIiBuZXctc2Vzc2lvbj1cInt7bmV3U2Vzc2lvbn19XCIgaW1wb3J0PVwie3tpc0ltcG9ydH19XCIgb3Blbj1cInt7aXNPcGVufX1cIiBub3RlYm9vaz1cIm5vdGVib29rXCIgY2xhc3M9XCJia3JcIj5cXG48L2JrLW1haW4tYXBwPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvbWFpbmFwcC9tYWluYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48aGVhZGVyIGNsYXNzPVwibmF2YmFyLWZpeGVkLXRvcCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWludmVyc2UgYmtyXCI+XFxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kIGJrclwiIGhyZWY9XCIvYmVha2VyLyMvY29udHJvbFwiIG5nLWNsaWNrPVwiZ290b0NvbnRyb2xQYW5lbCgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgPGltZyBzcmM9XCJhcHAvaW1hZ2VzL2JlYWtlcl9pY29uQDJ4LnBuZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgQmVha2VyXFxuICAgIDwvYT5cXG4gICAgPHAgY2xhc3M9XCJuYXZiYXItdGV4dCBia3JcIj57e2ZpbGVuYW1lKCl9fTwvcD5cXG4gICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdGV4dCBia3JcIiBuZy1pZj1cImxvYWRpbmcgfHwgISFsb2FkaW5nbXNnXCI+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoIGZhLXNwaW4gdGV4dC13aGl0ZSBia3JcIj48L2k+XFxuICAgIDwvc3Bhbj5cXG4gICAgPGRpdiBjbGFzcz1cIm5hdmJhci10ZXh0IHRleHQtd2hpdGUgbG9hZGluZ21zZyBia3JcIiBuZy1pZj1cImxvYWRpbmcgfHwgISFsb2FkaW5nbXNnXCI+XFxuICAgICAge3tsb2FkaW5nbXNnfX1cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgYmtyXCI+XFxuICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2IGJrclwiPlxcbiAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duIGJrclwiIG5nLXJlcGVhdD1cIm0gaW4gZ2V0TWVudXMoKVwiPlxcbiAgICAgICAgPGEgaHJlZj1cIiNcIiByb2xlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgYmtyXCIgbmctY2xhc3M9XCJtLmNsYXNzTmFtZXNcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+e3ttLm5hbWV9fTwvYT5cXG4gICAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJtLml0ZW1zXCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgICAgPC9saT5cXG4gICAgPC91bD5cXG4gICAgPHAgbmctaWY9XCJpc0VkaXRlZCgpXCIgY2xhc3M9XCJuYXZiYXItdGV4dCB0ZXh0LXN1Y2Nlc3MgcHVsbC1yaWdodCBia3JcIj5lZGl0ZWQ8L3A+XFxuICAgIDxwIG5nLWlmPVwiaXNEaXNjb25uZWN0ZWQoKVwiIGNsYXNzPVwibmF2YmFyLXRleHQgcHVsbC1yaWdodCBia3JcIj5cXG4gICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgY2xhc3M9XCJuYXZiYXItbGluayB0ZXh0LWRhbmdlciBia3JcIiBuZy1jbGljaz1cInByb21wdFRvU2F2ZSgpXCIgZWF0LWNsaWNrPVwiXCI+e3tnZXRPZmZpbmVNZXNzYWdlKCl9fTwvYT5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuPC9oZWFkZXI+XFxuXFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZCBub3RlYm9vay1jb250YWluZXIgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGJrclwiPlxcbiAgICAgIDxiay1ub3RlYm9vayBzZXQtYmstbm90ZWJvb2s9XCJzZXRCa05vdGVib29rKGJrTm90ZWJvb2spXCIgaXMtbG9hZGluZz1cImxvYWRpbmdcIiBjbGFzcz1cImJrclwiPjwvYmstbm90ZWJvb2s+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICBcXG4gIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDMwMHB4XCIgY2xhc3M9XCJia3JcIj48L2Rpdj5cXG5cXG48L2Rpdj5cXG5cXG5cXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L25nLXRlbXBsYXRlXCIgaWQ9XCJzZWN0aW9uLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8Ymstc2VjdGlvbi1jZWxsPjwvYmstc2VjdGlvbi1jZWxsPlxcbjwvc2NyaXB0PlxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cInRleHQtY2VsbC5odG1sXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbGxcIj5cXG4gICAgPGJrLXRleHQtY2VsbD48L2JrLXRleHQtY2VsbD5cXG4gIDwvZGl2Plxcbjwvc2NyaXB0PlxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cIm1hcmtkb3duLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstbWFya2Rvd24tY2VsbD48L2JrLW1hcmtkb3duLWNlbGw+XFxuPC9zY3JpcHQ+XFxuPHNjcmlwdCB0eXBlPVwidGV4dC9uZy10ZW1wbGF0ZVwiIGlkPVwiY29kZS1jZWxsLmh0bWxcIiBjbGFzcz1cImJrclwiPlxcbiAgPGJrLWNvZGUtY2VsbCBjZWxsbW9kZWw9XCJjZWxsbW9kZWxcIiBjZWxsbWVudT1cImNlbGx2aWV3Lm1lbnVcIiBpbmRleD1cIiRpbmRleFwiPjwvYmstY29kZS1jZWxsPlxcbjwvc2NyaXB0Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlclwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cImJrclwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogNjlweFwiPlxcbiAgICA8aDEgY2xhc3M9XCJia3JcIj5MYW5ndWFnZSBNYW5hZ2VyPC9oMT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZml4ZWQgbW9kYWwtbGFyZ2UgcGx1Z2luLW1hbmFnZXIgYmtyXCIgc3R5bGU9XCJwYWRkaW5nLXRvcDogNjlweDsgcGFkZGluZy1ib3R0b206IDY4cHhcIj5cXG4gICAgPGRpdiBjbGFzcz1cImxhbmd1YWdlcyBjbGVhcmZpeCBia3JcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGxhbmd1YWdlLWljb24tYnV0dG9uIGJrclwiIG5nLWNsaWNrPVwiZXZhbFRhYk9wLnRvZ2dsZVBsdWdpbihwbHVnaW5OYW1lKVwiIG5nLXJlcGVhdD1cIihwbHVnaW5OYW1lLCBwbHVnaW5TdGF0dXMpIGluIGV2YWxUYWJPcC5nZXRFdmFsdWF0b3JTdGF0dXNlcygpXCIgbmctY2xhc3M9XCJwbHVnaW5OYW1lXCI+XFxuICAgICAgICA8c3BhbiBuZy1jbGFzcz1cIlxcJ3BsdWdpbi1cXCcgKyBwbHVnaW5TdGF0dXNcIiBjbGFzcz1cInBsdWdpbi1zdGF0dXMgYmtyXCI+4pePPC9zcGFuPlxcbiAgICAgICAgPGJrLWxhbmd1YWdlLWxvZ28gYmctY29sb3I9XCJ7e2dldEV2YWx1YXRvckRldGFpbHMocGx1Z2luTmFtZSkuYmdDb2xvcn19XCIgbmFtZT1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5zaG9ydE5hbWV9fVwiIGZnLWNvbG9yPVwie3tnZXRFdmFsdWF0b3JEZXRhaWxzKHBsdWdpbk5hbWUpLmZnQ29sb3J9fVwiIGJvcmRlci1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5ib3JkZXJDb2xvcn19XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDwvYmstbGFuZ3VhZ2UtbG9nbz5cXG5cXG4gICAgICAgIHt7cGx1Z2luTmFtZX19XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93VVJMID0gIWV2YWxUYWJPcC5zaG93VVJMXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCI+XFxuICAgICAgICBGcm9tIFVSTC4uLlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBuZy1zaG93PVwiZXZhbFRhYk9wLnNob3dVUkxcIiBjbGFzcz1cImlucHV0LWdyb3VwIGFkZGV2YWwgYmtyXCI+XFxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgYmstZW50ZXI9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIiBuZy1tb2RlbD1cImV2YWxUYWJPcC5uZXdQbHVnaW5OYW1lT3JVcmxcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIj5BZGQgUGx1Z2luIGZyb20gVVJMPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLXNob3c9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZXJyb3ItdGl0bGUgYm9keS1ib3ggYmtyXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImJrclwiPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2FkIHRoaXMgcGx1Z2luIGZyb20gYW4gZXh0ZXJuYWwgVVJMPzwvcD5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IGZhbHNlOyBldmFsVGFiT3Auc2hvd1VSTD1mYWxzZTsgZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybD0mcXVvdDsmcXVvdDtcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IGZhbHNlOyBldmFsVGFiT3AuZm9yY2VMb2FkID0gdHJ1ZTsgZXZhbFRhYk9wLnRvZ2dsZVBsdWdpbigpXCI+T0s8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPjxiciBjbGFzcz1cImJrclwiPjwvcD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctc2hvdz1cImV2YWxUYWJPcC5zaG93V2FybmluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZXJyb3ItdGl0bGUgYm9keS1ib3ggYmtyXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImJrclwiPkNhbm5vdCByZW1vdmUgcGx1Z2luIGN1cnJlbnRseSB1c2VkIGJ5IGEgY29kZSBjZWxsIGluIHRoZSBub3RlYm9vay48YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIERlbGV0ZSB0aG9zZSBjZWxscyBhbmQgdHJ5IGFnYWluLjwvcD5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1dhcm5pbmcgPSBmYWxzZVwiPk9LPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPHAgY2xhc3M9XCJia3JcIj48YnIgY2xhc3M9XCJia3JcIj48L3A+XFxuICAgIDwvZGl2PlxcbiAgICA8dGFic2V0IGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPHRhYiBuZy1yZXBlYXQ9XCIoZXZhbHVhdG9yTmFtZSwgZXZhbHVhdG9yKSBpbiBldmFsVGFiT3AuZ2V0RXZhbHVhdG9yc1dpdGhTcGVjKClcIiBoZWFkaW5nPVwie3tldmFsdWF0b3JOYW1lfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGJrLXBsdWdpbi1tYW5hZ2VyLWV2YWx1YXRvci1zZXR0aW5ncyBjbGFzcz1cImJrclwiPjwvYmstcGx1Z2luLW1hbmFnZXItZXZhbHVhdG9yLXNldHRpbmdzPlxcbiAgICAgIDwvdGFiPlxcbiAgICA8L3RhYnNldD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogNjhweFwiPiBcXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBsYW5ndWFnZS1tYW5hZ2VyLWNsb3NlLWJ1dHRvbiBia3JcIiBuZy1jbGljaz1cImRvQ2xvc2UoKVwiPkNsb3NlPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9wbHVnaW5tYW5hZ2VyL3BsdWdpbm1hbmFnZXJfZXZhbHVhdG9yX3NldHRpbmdzXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IG5nLXJlcGVhdD1cInByb3BlcnR5IGluIHByb3BlcnRpZXNcIiBjbGFzcz1cImZvcm0tZ3JvdXAgbGFuZ3VhZ2Utb3B0aW9uIHByb3BlcnR5IGNsZWFyZml4IGJrclwiPlxcbiAgPGxhYmVsIGNsYXNzPVwiYmtyXCI+e3sgcHJvcGVydHkubmFtZSB9fTwvbGFiZWw+XFxuICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJldmFsdWF0b3Iuc2V0dGluZ3NbcHJvcGVydHkua2V5XVwiPjwvdGV4dGFyZWE+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2V0IGJrclwiIG5nLWNsaWNrPVwic2V0KHByb3BlcnR5LmtleSlcIj5TZXQ8L2J1dHRvbj5cXG48L2Rpdj5cXG48ZGl2IG5nLXJlcGVhdD1cImFjdGlvbiBpbiBhY3Rpb25zXCIgY2xhc3M9XCJhY3Rpb24gbGFuZ3VhZ2Utb3B0aW9uIGNsZWFyZml4IGJrclwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImV2YWx1YXRvci5wZXJmb3JtKGFjdGlvbi5rZXkpXCI+e3sgYWN0aW9uLm5hbWUgfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLWNsYXNzPVwiaXNMb2NrZWQoKSAmYW1wOyZhbXA7IFxcJ2xvY2tlZFxcJ1wiIGNsYXNzPVwiYmtjZWxsIHt7Y2VsbG1vZGVsLnR5cGV9fSBia3JcIj5cXG4gIDxkaXYgbmctaWY9XCJjZWxsbW9kZWwuaW5wdXQuaGlkZGVuICZhbXA7JmFtcDsgY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCcgJmFtcDsmYW1wOyAhaXNMb2NrZWQoKVwiIGNsYXNzPVwibWluaS1jZWxsLXN0YXRzIGFkdmFuY2VkLWhpZGUgYmtyXCI+XFxuICAgIHt7Y2VsbG1vZGVsLmV2YWx1YXRvcn19ICZuYnNwO1xcbiAgICAoe3tjZWxsbW9kZWwubGluZUNvdW50fX0gbGluZXMpXFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ0b2dnbGUtbWVudSBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXByb21vdGVkIGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBjZWxsLWRyb3Bkb3duIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0aXRsZT1cImNlbGwgbWVudVwiPjwvZGl2PlxcbiAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJjZWxsdmlldy5tZW51Lml0ZW1zXCIgc3VibWVudS1jbGFzc2VzPVwiZHJvcC1sZWZ0XCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gbW92ZS1jZWxsLWRvd24gYmtyXCIgbmctY2xpY2s9XCJtb3ZlQ2VsbERvd24oKVwiIG5nLWNsYXNzPVwibW92ZUNlbGxEb3duRGlzYWJsZWQoKSAmYW1wOyZhbXA7IFxcJ2Rpc2FibGVkXFwnXCIgdGl0bGU9XCJtb3ZlIGNlbGwgZG93blwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gbW92ZS1jZWxsLXVwIGJrclwiIG5nLWNsaWNrPVwibW92ZUNlbGxVcCgpXCIgbmctY2xhc3M9XCJtb3ZlQ2VsbFVwRGlzYWJsZWQoKSAmYW1wOyZhbXA7IFxcJ2Rpc2FibGVkXFwnXCIgdGl0bGU9XCJtb3ZlIGNlbGwgdXBcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtbWVudS1pdGVtIGRlbGV0ZS1jZWxsIGJrclwiIG5nLWNsaWNrPVwiZGVsZXRlQ2VsbCgpXCIgdGl0bGU9XCJkZWxldGUgY2VsbFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZXhwYW5kLWNvbnRyYWN0IGJrclwiIG5nLWlmPVwiY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCdcIiBuZy1jbGljaz1cInRvZ2dsZUNlbGxJbnB1dCgpXCIgbmctY2xhc3M9XCJjZWxsbW9kZWwuaW5wdXQuaGlkZGVuICZhbXA7JmFtcDsgXFwnY29sbGFwc2VkXFwnXCIgdGl0bGU9XCJoaWRlL3Nob3cgY2VsbCBpbnB1dFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gZHJvcGRvd24tcHJvbW90ZWQgYWR2YW5jZWQtb25seSBia3JcIiBuZy1pZj1cImlzQ29kZUNlbGwoKVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XFxuICAgICAgPGJrLWNvZGUtY2VsbC1pbnB1dC1tZW51IGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtaW5wdXQtbWVudT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBldmFsdWF0ZSBia3JcIiBuZy1jbGljaz1cImV2YWx1YXRlKCRldmVudClcIiBuZy1pZj1cImlzQ29kZUNlbGwoKVwiIHRpdGxlPVwicnVuIGNlbGxcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtc3RhdHVzLWl0ZW0gbG9hZGluZy1zdGF0ZSBhZHZhbmNlZC1oaWRlIGJrclwiIG5nLWlmPVwiY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCcgJmFtcDsmYW1wOyAhY2VsbG1vZGVsLmV2YWx1YXRvclJlYWRlclwiPkluaXRpYWxpemluZyB7e2NlbGxtb2RlbC5ldmFsdWF0b3J9fVxcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXIgcm90YXRpbmcgYmtyXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLWlmPVwiaXNEZWJ1Z2dpbmcoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIFtEZWJ1Z106IGNlbGwgSWQgPSB7e2NlbGxtb2RlbC5pZH19LCBwYXJlbnQgPSB7e2dldFBhcmVudElkKCl9fSwgbGV2ZWwgPSB7e2NlbGxtb2RlbC5sZXZlbH19XFxuICAgIDxhIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0RlYnVnSW5mbygpXCIgbmctaGlkZT1cImlzU2hvd0RlYnVnSW5mbygpXCIgY2xhc3M9XCJia3JcIj5zaG93IG1vcmU8L2E+XFxuICAgIDxhIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0RlYnVnSW5mbygpXCIgbmctc2hvdz1cImlzU2hvd0RlYnVnSW5mbygpXCIgY2xhc3M9XCJia3JcIj5zaG93IGxlc3M8L2E+XFxuICAgIDxkaXYgY29sbGFwc2U9XCIhaXNTaG93RGVidWdJbmZvKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxwcmUgY2xhc3M9XCJia3JcIj57e2NlbGxtb2RlbCB8IGpzb259fTwvcHJlPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1pbmNsdWRlPVwiZ2V0VHlwZUNlbGxVcmwoKVwiIGNsYXNzPVwiYmtyXCI+PC9kaXY+XFxuICA8YmstbmV3LWNlbGwtbWVudSBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIG5nLWNsYXNzPVwiaXNMYXJnZSAmYW1wOyZhbXA7IFxcJ2xhcmdlXFwnXCIgaXMtbGFyZ2U9XCJpc0xhcmdlXCIgbmctaWY9XCJuZXdDZWxsTWVudUNvbmZpZy5pc1Nob3coKVwiIGNsYXNzPVwiYmtyXCI+PC9iay1uZXctY2VsbC1tZW51PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IGNsYXNzPVwiZXZhbHVhdG9yIGJrclwiIGV2YWx1YXRvci10eXBlPVwie3sgY2VsbG1vZGVsLmV2YWx1YXRvciB9fVwiIG5nLWNsYXNzPVwie1xcbiAgXFwnZXZhbHVhdG9yLXJlYWR5XFwnOiBjZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyLFxcbiAgXFwnbG9ja2VkXFwnOiBpc0xvY2tlZCgpLFxcbiAgXFwnZW1wdHlcXCc6IGlzRW1wdHkoKVxcbiAgfVwiPlxcbiAgPGRpdiBjbGFzcz1cImJrY2VsbCBjb2RlLWNlbGwtYXJlYSBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImNvZGUtY2VsbC1pbnB1dCBia3JcIiBuZy1jbGljaz1cImJhY2tncm91bmRDbGljaygkZXZlbnQpXCIgbmctaGlkZT1cImlzTG9ja2VkKClcIiBuZy1jbGFzcz1cIntcXCdpbnB1dC1oaWRkZW5cXCc6IGNlbGxtb2RlbC5pbnB1dC5oaWRkZW59XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvZGUtY2VsbC1pbnB1dC1jb250ZW50IGJrclwiPlxcbiAgICAgICAgPGJrLWNvZGUtY2VsbC1pbnB1dC1tZW51IGNsYXNzPVwiYWR2YW5jZWQtaGlkZSBia3JcIj48L2JrLWNvZGUtY2VsbC1pbnB1dC1tZW51PlxcbiAgICAgICAgPGRpdiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImJrY2VsbHRleHRhcmVhIGJrclwiIG5nLW1vZGVsPVwiY2VsbG1vZGVsLmlucHV0LmJvZHlcIj48L3RleHRhcmVhPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGV2YWx1YXRlLXNjcmlwdCBhZHZhbmNlZC1oaWRlIGJrclwiIG5nLWNsaWNrPVwiZXZhbHVhdGUoJGV2ZW50KVwiIGVhdC1jbGljaz1cIlwiPlxcbiAgICAgICAgICB7eyBpc0pvYkNhbmNlbGxhYmxlKCkgPyBcXCdTdG9wXFwnIDogXFwnUnVuXFwnIH19XFxuICAgICAgICA8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLWlmPVwiaGFzT3V0cHV0KClcIiBjbGFzcz1cImNvZGUtY2VsbC1vdXRwdXQgYmtyXCIgbmctY2xhc3M9XCJ7XFxuICAgICAgXFwnbm8tb3V0cHV0XFwnOiBpc0hpZGRlbk91dHB1dCgpLFxcbiAgICAgIFxcJ2lucHV0LWhpZGRlblxcJzogY2VsbG1vZGVsLmlucHV0LmhpZGRlbixcXG4gICAgICBcXCdvdXRwdXQtaGlkZGVuXFwnOiBjZWxsbW9kZWwub3V0cHV0LmhpZGRlbixcXG4gICAgICBcXCdlcnJvclxcJzogaXNFcnJvcigpXFxuICAgICAgfVwiPlxcbiAgICAgIDxoNiBuZy1pZj1cIm91dHB1dFRpdGxlKClcIiBjbGFzcz1cImJrclwiPnt7b3V0cHV0VGl0bGUoKX19PC9oNj5cXG4gICAgICA8YmstY29kZS1jZWxsLW91dHB1dCBtb2RlbD1cImNlbGxtb2RlbC5vdXRwdXRcIiBldmFsdWF0b3ItaWQ9XCJ7eyBjZWxsbW9kZWwuZXZhbHVhdG9yIH19XCIgY2VsbC1pZD1cInt7IGNlbGxtb2RlbC5pZCB9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPC9iay1jb2RlLWNlbGwtb3V0cHV0PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsaW5wdXRtZW51XCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiZHJvcGRvd24gYmstY29kZS1jZWxsLWlucHV0IGJrclwiPlxcbiAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgY2VsbC1ldmFsdWF0b3ItbWVudSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgIDxiay1sYW5ndWFnZS1sb2dvIG5hbWU9XCJ7e2dldEV2YWx1YXRvcigpLnNob3J0TmFtZX19XCIgYmctY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmJnQ29sb3J9fVwiIGZnLWNvbG9yPVwie3tnZXRFdmFsdWF0b3IoKS5mZ0NvbG9yfX1cIiBib3JkZXItY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmJvcmRlckNvbG9yfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICA8L2JrLWxhbmd1YWdlLWxvZ28+XFxuICAgIDxiIGNsYXNzPVwiYWR2YW5jZWQtaGlkZSBia3JcIj57e2NlbGxtb2RlbC5ldmFsdWF0b3J9fTwvYj5cXG4gIDwvYT5cXG4gIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgaW5wdXRjZWxsbWVudSBia3JcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICA8bGkgbmctcmVwZWF0PVwiKGV2YWx1YXRvck5hbWUsIGV2YWx1YXRvcikgaW4gZ2V0RXZhbHVhdG9ycygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cInNldEV2YWx1YXRvcihldmFsdWF0b3JOYW1lKVwiIGNsYXNzPVwie3tldmFsdWF0b3JOYW1lfX0tbWVudWl0ZW0gYmtyXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgICB7e2V2YWx1YXRvck5hbWV9fVxcbiAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjayBia3JcIiBuZy1zaG93PVwiZ2V0U2hvd0V2YWxJY29uKGV2YWx1YXRvck5hbWUpXCI+PC9pPlxcbiAgICAgIDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxvdXRwdXRcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJ0b2dnbGUtbWVudSBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi1wcm9tb3RlZCBia3JcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gY2VsbC1kcm9wZG93biBkcm9wZG93bi10b2dnbGUgYmtyXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIHRpdGxlPVwiY2VsbCBvdXRwdXQgbWVudVwiIG5nLXNob3c9XCJpc1Nob3dNZW51KClcIj48L2Rpdj5cXG4gICAgPGJrLWNvZGUtY2VsbC1vdXRwdXQtbWVudSBtb2RlbD1cIm91dHB1dENlbGxNZW51TW9kZWxcIiBjbGFzcz1cImJrclwiPjwvYmstY29kZS1jZWxsLW91dHB1dC1tZW51PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZXhwYW5kLWNvbnRyYWN0IGJrclwiIG5nLWNsaWNrPVwidG9nZ2xlRXhwYW5zaW9uKClcIiBuZy1jbGFzcz1cIiFpc0V4cGFuZGVkKCkgJmFtcDsmYW1wOyBcXCdjb2xsYXBzZWRcXCdcIiB0aXRsZT1cImhpZGUvc2hvdyBjZWxsIG91dHB1dFwiIG5nLXNob3c9XCJpc1Nob3dNZW51KClcIj48L2Rpdj5cXG48L2Rpdj5cXG48Ymstb3V0cHV0LWRpc3BsYXkgbmctc2hvdz1cImlzU2hvd091dHB1dCgpXCIgbW9kZWw9XCJvdXRwdXREaXNwbGF5TW9kZWxcIiB0eXBlPVwie3sgZ2V0T3V0cHV0RGlzcGxheVR5cGUoKSB9fVwiIGNsYXNzPVwiYmtyXCI+XFxuPC9iay1vdXRwdXQtZGlzcGxheT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbG91dHB1dG1lbnVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1mb3JtIGJrclwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICA8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51IGRyb3AtbGVmdCBia3JcIj5cXG4gICAgPGEgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiYmtyXCI+RGlzcGxheXMgKHt7bW9kZWwuZ2V0U2VsZWN0ZWREaXNwbGF5KCl9fSk8L2E+XFxuICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCI+XFxuICAgICAgPGxpIG5nLXJlcGVhdD1cImQgaW4gbW9kZWwuZ2V0QXBwbGljYWJsZURpc3BsYXlzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJtb2RlbC5zZXRTZWxlY3RlZERpc3BsYXkoZClcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2sgYmtyXCIgbmctc2hvdz1cImQgPT09IG1vZGVsLmdldFNlbGVjdGVkRGlzcGxheSgpXCI+PC9pPnt7IGQgfX1cXG4gICAgICAgIDwvYT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9saT5cXG4gIDxsaSBuZy1yZXBlYXQ9XCJpdGVtIGluIG1vZGVsLmdldEFkZGl0aW9uYWxNZW51SXRlbXMoKVwiIGNsYXNzPVwie3tnZXRJdGVtQ2xhc3MoaXRlbSl9fSBia3JcIj5cXG4gICAgPGEgdGFiaW5kZXg9XCItMVwiIG5nLWNsaWNrPVwiaXRlbS5hY3Rpb24oKVwiIGNsYXNzPVwiYmtyXCI+e3tnZXRJdGVtTmFtZShpdGVtKX19PC9hPlxcbiAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiPlxcbiAgICAgIDxsaSBuZy1yZXBlYXQ9XCJzdWJpdGVtIGluIGdldFN1Ykl0ZW1zKGl0ZW0pXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDxhIG5nLWNsaWNrPVwic3ViaXRlbS5hY3Rpb24oKVwiIGNsYXNzPVwie3tnZXRTdWJtZW51SXRlbUNsYXNzKHN1Yml0ZW0pfX0gYmtyXCIgdGl0bGU9XCJ7e3N1Yml0ZW0udG9vbHRpcH19XCI+e3tzdWJpdGVtLm5hbWV9fTwvYT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9saT5cXG48L3VsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL21hcmtkb3duLWVkaXRhYmxlXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLXNob3c9XCJtb2RlPT1cXCdlZGl0XFwnXCIgbmctY2xpY2s9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBjbGFzcz1cImNvZGVtaXJyb3Itd3JhcHBlciBia3JcIj5cXG4gIDx0ZXh0YXJlYSBjbGFzcz1cImJrclwiPjwvdGV4dGFyZWE+XFxuPC9kaXY+XFxuPGRpdiBuZy1jbGljaz1cImVkaXQoJGV2ZW50KVwiIGNsYXNzPVwibWFya3VwIGJrclwiIG5nLXNob3c9XCJtb2RlPT1cXCdwcmV2aWV3XFwnXCI+PC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbWFya2Rvd25jZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48YmstbWFya2Rvd24tZWRpdGFibGUgY2VsbG1vZGVsPVwiY2VsbG1vZGVsXCIgY2xhc3M9XCJia3JcIj48L2JrLW1hcmtkb3duLWVkaXRhYmxlPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25ld2NlbGxtZW51XCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG5ldy1jZWxsIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cIm5ld0NvZGVDZWxsKGRlZmF1bHRFdmFsdWF0b3IoKSlcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBpbnNlcnQtY2VsbCBia3JcIiBuZy1jbGFzcz1cIiFpc0xhcmdlICZhbXA7JmFtcDsgXFwnYnRuLXhzXFwnXCI+XFxuICAgIDxzcGFuIG5nLWNsYXNzPVwiIWlzTGFyZ2UgJmFtcDsmYW1wOyBcXCdhZHZhbmNlZC1oaWRlXFwnXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICBJbnNlcnQge3tkZWZhdWx0RXZhbHVhdG9yKCl9fSBDZWxsXFxuICAgIDwvc3Bhbj5cXG4gICAgPHNwYW4gbmctaWY9XCIhaXNMYXJnZVwiIGNsYXNzPVwicGx1cyBhZHZhbmNlZC1vbmx5IGJrclwiPis8L3NwYW4+XFxuICA8L2J1dHRvbj5cXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgZHJvcGRvd24tdG9nZ2xlIGJrclwiIG5nLWNsYXNzPVwiIWlzTGFyZ2UgJmFtcDsmYW1wOyBcXCdidG4teHNcXCdcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtc29ydC1kb3duIGJrclwiPjwvaT5cXG4gIDwvYnV0dG9uPlxcbiAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiPlxcbiAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51IGJrclwiPlxcbiAgICAgIDxhIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImJrclwiPkNvZGUgY2VsbDwvYT5cXG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiPlxcbiAgICAgICAgPGxpIG5nLXJlcGVhdD1cIihrZXksIHZhbHVlKSBpbiBnZXRFdmFsdWF0b3JzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8YSBuZy1jbGljaz1cIm5ld0NvZGVDZWxsKGtleSlcIiBjbGFzcz1cImJrclwiPnt7a2V5fX08L2E+XFxuICAgICAgICA8L2xpPlxcbiAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICA8YSBuZy1jbGljaz1cInNob3dQbHVnaW5NYW5hZ2VyKClcIiBjbGFzcz1cImJrclwiPk90aGVyIGxhbmd1YWdlcy4uLjwvYT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9saT5cXG4gICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudSBia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJia3JcIj5TZWN0aW9uIGNlbGw8L2E+XFxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIj5cXG4gICAgICAgIDxsaSBuZy1yZXBlYXQ9XCJsZXZlbCBpbiBnZXRMZXZlbHMoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxhIG5nLWNsaWNrPVwibmV3U2VjdGlvbkNlbGwobGV2ZWwpXCIgY2xhc3M9XCJia3JcIj5Ie3tsZXZlbH19PC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2xpPlxcbiAgICA8bGkgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJuZXdNYXJrZG93bkNlbGwoKVwiIGNsYXNzPVwiYmtyXCI+TWFya2Rvd24gY2VsbDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbm90ZWJvb2tcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctY2xhc3M9XCJ7XFwnYWR2YW5jZWQtbW9kZVxcJzogaXNBZHZhbmNlZE1vZGUoKSwgXFwnaGllcmFyY2h5LW1vZGVcXCc6IGlzSGllcmFyY2h5RW5hYmxlZCgpfVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstbmV3LWNlbGwtbWVudSBuZy1zaG93PVwiIWlzTG9ja2VkKCkgJmFtcDsmYW1wOyAhaXNMb2FkaW5nXCIgbmctY2xhc3M9XCJpc0VtcHR5KCkgJmFtcDsmYW1wOyBcXCdvbmx5LWNoaWxkIGxhcmdlXFwnXCIgaXMtbGFyZ2U9XCJpc0VtcHR5KClcIiBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIGNsYXNzPVwiYmtyXCI+PC9iay1uZXctY2VsbC1tZW51PlxcbiAgPGRpdiBjbGFzcz1cImJrY2VsbCBia3JcIj5cXG4gICAgPGJrLWNlbGwgbmctcmVwZWF0PVwiY2VsbCBpbiBnZXRDaGlsZHJlbigpXCIgY2VsbG1vZGVsPVwiY2VsbFwiIGluZGV4PVwiJGluZGV4XCIgY2VsbGlkPVwie3tjZWxsLmlkfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICA8L2JrLWNlbGw+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia2NlbGxtZW51IGJrclwiIHN0eWxlPVwicG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OVwiPlxcbiAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj48L2E+XFxuICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cIm1lbnVJdGVtc1wiIHN1Ym1lbnUtY2xhc3Nlcz1cInB1bGwtbGVmdFwiIGNsYXNzPVwiYmtyXCI+PC9iay1kcm9wZG93bi1tZW51PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1zaG93PVwiaXNTaG93aW5nT3V0cHV0KClcIiBjbGFzcz1cIm91dHB1dGxvZ2JveCBia3JcIj48L2Rpdj5cXG4gIDxkaXYgbmctc2hvdz1cImlzU2hvd2luZ091dHB1dCgpXCIgY2xhc3M9XCJvdXRwdXRsb2djb250YWluZXIgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJvdXRwdXRsb2doYW5kbGUgYmtyXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJidG4tdG9vbGJhciBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIGFsdC1jb250cm9scyBia3JcIj5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBia3JcIiBuZy1jbGljaz1cImNsZWFyT3V0cHV0KClcIj5DbGVhcjwvYT5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBoaWRlLW91dHB1dCBia3JcIiBuZy1jbGljaz1cImhpZGVPdXRwdXQoKVwiPkhpZGU8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBia3JcIiBkYXRhLXRvZ2dsZT1cImJ1dHRvbnMtY2hlY2tib3hcIj5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJrclwiIG5nLWNsYXNzPVwic2hvd1N0ZE91dCA/IFxcJ2J0bi1wcmltYXJ5XFwnIDogXFwnYnRuLWRlZmF1bHRcXCdcIiBuZy1jbGljaz1cInRvZ2dsZVN0ZE91dCgkZXZlbnQpXCI+c3Rkb3V0PC9hPlxcbiAgICAgICAgPGEgY2xhc3M9XCJidG4gYmtyXCIgbmctY2xhc3M9XCJzaG93U3RkRXJyID8gXFwnYnRuLXByaW1hcnlcXCcgOiBcXCdidG4tZGVmYXVsdFxcJ1wiIG5nLWNsaWNrPVwidG9nZ2xlU3RkRXJyKCRldmVudClcIj5zdGRlcnI8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nb3V0IGJrclwiIG5nLXNob3c9XCJzaG93U3RkT3V0XCIgbmctY2xhc3M9XCIhc2hvd1N0ZEVyciAmYW1wOyZhbXA7IFxcJ3NpbmdsZVxcJ1wiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cIm91dHB1dC1sYWJlbCBia3JcIj5zdGRvdXQ6PC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nYm94IG91dHB1dGxvZ3N0ZG91dCBia3JcIj5cXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVwibGluZSBpbiBvdXRwdXRMb2cgdHJhY2sgYnkgJGluZGV4XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPGRpdiBuZy1zaG93PVwibGluZS50eXBlID09IFxcJ3RleHRcXCcgfHwgbGluZS50eXBlID09IFxcJ3N0ZG91dFxcJ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICAgPHByZSBjbGFzcz1cInByZWxvZyBia3JcIj57e2xpbmUubGluZX19PC9wcmU+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nZXJyIGJrclwiIG5nLXNob3c9XCJzaG93U3RkRXJyXCIgbmctY2xhc3M9XCIhc2hvd1N0ZE91dCAmYW1wOyZhbXA7IFxcJ3NpbmdsZVxcJ1wiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cIm91dHB1dC1sYWJlbCBia3JcIj5zdGRlcnI6PC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nYm94IGJrclwiPlxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XCJsaW5lIGluIG91dHB1dExvZyB0cmFjayBieSAkaW5kZXhcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8ZGl2IG5nLXNob3c9XCJsaW5lLnR5cGUgPT0gXFwnc3RkZXJyXFwnXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICA8cHJlIGNsYXNzPVwicHJlbG9nIGJrclwiPnt7bGluZS5saW5lfX08L3ByZT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJpc0RlYnVnZ2luZygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgPGJ1dHRvbiBuZy1jbGljaz1cInNob3dEZWJ1Z1RyZWUgPSAhc2hvd0RlYnVnVHJlZVwiIGNsYXNzPVwiYmtyXCI+VG9nZ2xlIGRlYnVnIFRyZWU8L2J1dHRvbj5cXG4gICAgPGRpdiBjb2xsYXBzZT1cIiFzaG93RGVidWdUcmVlXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8cHJlIGNsYXNzPVwiYmtyXCI+e3tnZXROb3RlYm9va01vZGVsKCkgfCBqc29ufX08L3ByZT5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9vdXRwdXQtcHJvZ3Jlc3NcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctaWY9XCJlbGFwc2VkID4gMjAwXCIgY2xhc3M9XCJyb3cgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTIgYmtyXCI+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jb2cgZmEtc3BpbiBmYS1sZyBia3JcIj48L2k+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJia3JcIj4gJm5ic3A7IEVsYXBzZWQ6IHt7Z2V0RWxhcHNlZFRpbWUoKX19ICZuYnNwOyA8L3NwYW4+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lcy1jaXJjbGUgZmEtbGcgdGV4dC1kYW5nZXIgY3Vyc29yX2hhbmQgYmtyXCIgbmctY2xpY2s9XCJjYW5jZWwoKVwiIG5nLWlmPVwiaXNDYW5jZWxsYWJsZSgpXCIgdGl0bGU9XCJjYW5jZWxcIj48L2k+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tMiBia3JcIiBuZy1pZj1cImhhc1Byb2dyZXNzQmFyKClcIj5cXG5cXHQgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBia3JcIj5cXG5cXHRcXHQgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgYmtyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cInt7Z2V0UHJvZ3Jlc3NCYXIoKX19XCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDoge3tnZXRQcm9ncmVzc0JhcigpfX0lXCI+XFxuXFx0XFx0ICAgIHt7Z2V0UHJvZ3Jlc3NCYXIoKX19ICVcXG5cXHRcXHQgIDwvZGl2PlxcblxcdCAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJoYXNNZXNzYWdlKClcIiBjbGFzcz1cImNvbC1zbS04IGJrclwiPiB7e2dldE1lc3NhZ2UoKX19PC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBuZy1pZj1cImhhc1BheWxvYWQoKSB8fCBoYXNPdXRwdXREYXRhKClcIiBjbGFzcz1cImJrclwiPlxcbiAgPGhyIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstY29kZS1jZWxsLW91dHB1dCBtb2RlbD1cIm91dHB1dERpc3BsYXlNb2RlbFwiIGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtb3V0cHV0PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL291dHB1dC1yZXN1bHRzXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48dWwgbmctaWY9XCJoYXNPdXRwdXREYXRhKClcIiBjbGFzcz1cImxpc3QtdW5zdHlsZWQgYmtyXCI+XFxuICA8bGkgbmctcmVwZWF0PVwiaSBpbiBvdXRwdXRkYXRhXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgPHByZSBuZy1jbGFzcz1cImkudHlwZSA9PT0gJnF1b3Q7b3V0JnF1b3Q7ID8gJnF1b3Q7dGV4dC1pbmZvJnF1b3Q7IDogJnF1b3Q7dGV4dC13YXJuaW5nJnF1b3Q7XCIgY2xhc3M9XCJia3JcIj57eyBpLnZhbHVlIH19PC9wcmU+XFxuICA8L2xpPlxcbjwvdWw+XFxuPGJrLWNvZGUtY2VsbC1vdXRwdXQgbmctaWY9XCJoYXNQYXlsb2FkKClcIiBtb2RlbD1cInBheWxvYWRcIiBjbGFzcz1cImJrclwiPjwvYmstY29kZS1jZWxsLW91dHB1dD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9zZWN0aW9uY2VsbFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBuZy1oaWRlPVwiY2VsbG1vZGVsLmhpZGVUaXRsZVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8c3BhbiBjbGFzcz1cImJrc2VjdGlvbnRvZ2dsZXBsdXMgc2VjdGlvbi10b2dnbGUgYmtyXCIgbmctY2xpY2s9XCJ0b2dnbGVTaG93Q2hpbGRyZW4oKVwiIG5nLWhpZGU9XCJpc1Nob3dDaGlsZHJlbigpXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtcGx1cyBia3JcIj48L2k+XFxuICA8L3NwYW4+XFxuICA8c3BhbiBjbGFzcz1cImJrc2VjdGlvbnRvZ2dsZW1pbnVzIHNlY3Rpb24tdG9nZ2xlIGJrclwiIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0NoaWxkcmVuKClcIiBuZy1zaG93PVwiaXNTaG93Q2hpbGRyZW4oKVwiPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLW1pbnVzIGJrclwiPjwvaT5cXG4gIDwvc3Bhbj5cXG4gIDxwIGNsYXNzPVwiZGVwdGgtaW5kaWNhdG9yIGJrclwiPnt7Z2V0RnVsbEluZGV4KCl9fTwvcD5cXG4gIDxiay1tYXJrZG93bi1lZGl0YWJsZSBjbGFzcz1cInNlY3Rpb257e2NlbGxtb2RlbC5sZXZlbH19IGJrLXNlY3Rpb24tdGl0bGUgYmtyXCIgY2VsbG1vZGVsPVwiY2VsbG1vZGVsXCI+PC9iay1tYXJrZG93bi1lZGl0YWJsZT5cXG48L2Rpdj5cXG48YmstbmV3LWNlbGwtbWVudSBzaXplPVwieHNcIiBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIG5nLWlmPVwibmV3Q2VsbE1lbnVDb25maWcuaXNTaG93KClcIiBjbGFzcz1cImJrclwiPjwvYmstbmV3LWNlbGwtbWVudT5cXG48ZGl2IG5nLXNob3c9XCJpc1Nob3dDaGlsZHJlbigpXCIgY2xhc3M9XCJzZWN0aW9uLWNoaWxkcmVuIGJrclwiPlxcbiAgPGJrLWNlbGwgbmctcmVwZWF0PVwiY2VsbCBpbiBnZXRDaGlsZHJlbigpXCIgY2VsbG1vZGVsPVwiY2VsbFwiIGluZGV4PVwiJGluZGV4XCIgY2VsbGlkPVwie3tjZWxsLmlkfX1cIiBjbGFzcz1cImJrclwiPjwvYmstY2VsbD5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay90ZXh0Y2VsbFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cInRleHRjZWxsLXdyYXBwZXIgYmtyXCIgbmctY2xpY2s9XCJlZGl0KClcIj5cXG4gIDxkaXYgY2xhc3M9XCJlZGl0YWJsZS10ZXh0IGJrclwiIGNvbnRlbnRlZGl0YWJsZT1cInt7IGlzRWRpdGFibGUoKSA/IHRydWUgOiBmYWxzZSB9fVwiIHN0eWxlPVwibWluLWhlaWdodDogMTRweDsgbWluLXdpZHRoOiAxNHB4XCI+PC9kaXY+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJia28tdGFibGVkaXNwbGF5L291dHB1dC10YWJsZS1vcHRpb25zXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiA2OXB4XCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5UYWJsZSBPcHRpb25zPC9oMT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBtb2RhbC1sYXJnZSBia3JcIiBzdHlsZT1cInBhZGRpbmctdG9wOiA2OXB4OyBwYWRkaW5nLWJvdHRvbTogNjhweFwiPlxcblxcbiA8dGFic2V0IGNsYXNzPVwiYmtyXCI+XFxuXFx0PHRhYiBoZWFkaW5nPVwiVGFibGUgRm9ybWF0dGluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuXFxuXFx0XFx0PGRpdiBjbGFzcz1cInJvdyBia3JcIj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy00IGJrclwiPlxcblxcdFxcdCAgICBcXHRVc2UgcGFnaW5hdGlvbjpcXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy00IGJrclwiPlxcblxcdFxcdCAgICBcXHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmctbW9kZWw9XCJwYWdpbmF0aW9uLnVzZVwiIGNsYXNzPVwiYmtyXCI+XFxuXFx0XFx0ICAgIDwvZGl2PlxcbiAgICBcXHQ8L2Rpdj5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcblxcdFxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTQgYmtyXCI+XFxuXFx0XFx0ICAgIFxcdE1heCByb3dzIHRvIGRpc3BsYXk6XFxuXFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNCBia3JcIj5cXG5cXHRcXHQgICAgXFx0PGlucHV0IHR5cGU9XCJudW1iZXJcIiBuZy1tb2RlbD1cInBhZ2luYXRpb24ucm93c1RvRGlzcGxheVwiIG5nLWRpc2FibGVkPVwicGFnaW5hdGlvbi51c2VcIiBjbGFzcz1cImJrclwiPlxcblxcdFxcdCAgICA8L2Rpdj5cXG4gICAgXFx0PC9kaXY+XFxuXFx0PC90YWI+XFxuXFx0PHRhYiBoZWFkaW5nPVwiQ2VsbCBGb3JtYXR0aW5nXCIgY2xhc3M9XCJia3JcIj5cXG5cXHQgIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+Q29sdW1uPC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+RGlzcGxheSBUeXBlPC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+U2hvdyAoPGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkaXNwbGF5QWxsKClcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPkFsbDwvYT4pPC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aDIgY2xhc3M9XCJia3JcIj48c3Ryb25nIGNsYXNzPVwiYmtyXCI+QWxpZ25tZW50PC9zdHJvbmc+PC9oMj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICA8L2Rpdj5cXG5cXG5cXHQgIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCIgbmctcmVwZWF0PVwibWVudWlkeCBpbiBnZXRDZWxsSWR4XCI+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICB7eyBnZXRDZWxsTmFtW21lbnVpZHhdIH19XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImdldENlbGxEaXNwW21lbnVpZHhdXCIgbmctb3B0aW9ucz1cIml0ZW0udHlwZSBhcyBpdGVtLm5hbWUgZm9yIGl0ZW0gaW4gZ2V0Q2VsbERpc3BPcHRzRihtZW51aWR4KVwiPjwvc2VsZWN0PlxcblxcdFxcdDwvZGl2PiAgIFxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwiZ2V0Q2VsbFNob1ttZW51aWR4XVwiIGNsYXNzPVwiYmtyXCI+XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0XFx0XFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5nLW1vZGVsPVwiZ2V0Q2VsbEFsaWduW21lbnVpZHhdXCIgdmFsdWU9XCJMXCIgY2xhc3M9XCJia3JcIj4mbmJzcDs8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tYWxpZ24tbGVmdCBia3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Jm5ic3A7XFxuICBcXHRcXHRcXHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmctbW9kZWw9XCJnZXRDZWxsQWxpZ25bbWVudWlkeF1cIiB2YWx1ZT1cIkNcIiBjbGFzcz1cImJrclwiPiZuYnNwOzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1hbGlnbi1jZW50ZXIgYmtyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiZuYnNwO1xcblxcdFxcdFxcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuZy1tb2RlbD1cImdldENlbGxBbGlnblttZW51aWR4XVwiIHZhbHVlPVwiUlwiIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWFsaWduLXJpZ2h0IGJrclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4mbmJzcDtcXG5cXHQgICAgPC9kaXY+XFxuXFx0ICA8L2Rpdj5cXG4gICA8L3RhYj5cXG4gPC90YWJzZXQ+XFxuXFxuXFxuXFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3IgYmtyXCIgc3R5bGU9XCJoZWlnaHQ6IDY4cHhcIj4gXFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrciBia3JcIiBuZy1jbGljaz1cImNhbmNlbE9wdGlvbnNEaWFsb2coKVwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBtb2RhbC1zdWJtaXQgYmtyIGJrclwiIG5nLWNsaWNrPVwiY2xvc2VPcHRpb25zRGlhbG9nKClcIj5PSzwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiYmtvLXRhYmxlZGlzcGxheS9vdXRwdXQtdGFibGVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJkcm9wZG93biBkdG1lbnUgY2xlYXJmaXggYmtyXCIgc3R5bGU9XCJmbG9hdDogbGVmdFwiIG5nLWlmPVwicmVuZGVyTWVudVwiPlxcbiAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGR0bWVudSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgbmctY2xpY2s9XCJtZW51VG9nZ2xlKClcIj5cXG4gICBFZGl0IFRhYmxlIFxcbiAgIDwvYT5cXG4gICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCIgc3VibWVudS1jbGFzc2VzPVwiZHJvcC1yaWdodFwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb1Jlc2V0U29ydCgpXCIgaWQ9XCJkdC1yZXNldC1zb3J0XCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5SZXNldCBTb3J0PC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj4mbmJzcDs8L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb1NlbGVjdEFsbCgpXCIgaWQ9XCJkdC1zZWxlY3QtYWxsXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5TZWxlY3QgQWxsPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvRGVzZWxlY3RBbGwoKVwiIGlkPVwiZHQtZGVzZWxlY3QtYWxsXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5EZXNlbGVjdCBBbGw8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9SZXZlcnNlU2VsZWN0aW9uKClcIiBpZD1cImR0LXJldmVyc2Utc2VsZWN0aW9uXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5SZXZlcnNlIFNlbGVjdGlvbjwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9Db3B5VG9DbGlwYm9hcmQoKVwiIGlkPVwie3tpZH19X2R0X2NvcHlcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPkNvcHkgdG8gQ2xpcGJvYXJkPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvQ1NWRXhwb3J0KGZhbHNlKVwiIGlkPVwiZHQtc2F2ZS1hbGxcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlNhdmUgQWxsIGFzIENTVjwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb0NTVkV4cG9ydCh0cnVlKVwiIGlkPVwiZHQtc2F2ZS1zZWxlY3RlZFwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+U2F2ZSBTZWxlY3RlZCBhcyBDU1Y8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPiZuYnNwOzwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cIm9wZW5PcHRpb25zRGlhbG9nKClcIiBpZD1cImR0LW9wdGlvbnNcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPk9wdGlvbnMuLi48L2E+PC9saT5cXG4gICA8L3VsPlxcbiA8L2Rpdj5cXG5cXG48dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2xhc3M9XCJkaXNwbGF5IGJrclwiIGJvcmRlcj1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiB3aWR0aD1cIjEwJVwiIGlkPVwie3tpZH19XCI+PC90YWJsZT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTsiLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogYmsuQ29udHJvbFBhbmVsXG4gKiAtIFRoaXMgaXMgdGhlIG1vZHVsZSBmb3IgdGhlICdjb250cm9sIHBhbmVsJyBzZWN0aW9uIG9mIGJlYWtlclxuICogLSBJbiB0aGUgY29udHJvbCBwYW5lbCwgdXNlcnMgZ2V0IGEgbGlzdCBvZiBvcGVuZWQgc2Vzc2lvbnMgYW5kIGlzIGFibGUgdG9cbiAqIChyZSlvcGVuIG9uZSBpbiBia0FwcC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29udHJvbFBhbmVsJywgW1xuICAgICdiay51dGlscycsXG4gICAgJ2JrLmNvcmUnLFxuICAgICdiay5zZXNzaW9uJyxcbiAgICAnYmsubWVudVBsdWdpbk1hbmFnZXInLFxuICAgICdiay5yZWNlbnRNZW51JyxcbiAgICAnYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyJ10pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29udHJvbFBhbmVsJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb250cm9sUGFuZWwnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsIGJrQ29yZU1hbmFnZXIsIGJrU2Vzc2lvbiwgYmtNZW51UGx1Z2luTWFuYWdlciwgYmtUcmFjaykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcImNvbnRyb2xwYW5lbC9jb250cm9scGFuZWxcIl0oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiQmVha2VyXCI7XG4gICAgICAgIHZhciBfaW1wbCA9IHtcbiAgICAgICAgICBuYW1lOiBcImJrQ29udHJvbEFwcFwiLFxuICAgICAgICAgIHNob3dBbm9ueW1vdXNUcmFja2luZ0RpYWxvZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYmtDb3JlTWFuYWdlci5zZXRCa0FwcEltcGwoX2ltcGwpO1xuXG4gICAgICAgICRzY29wZS5nb3RvQ29udHJvbFBhbmVsID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoYmtVdGlscy5pc01pZGRsZUNsaWNrKGV2ZW50KSkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oXCIuL1wiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHNldHVwIG1lbnVzXG4gICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgaWYgKHdpbmRvdy5iZWFrZXIgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuYmVha2VyLmlzRW1iZWRkZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJrVXRpbHMuaHR0cEdldCgnLi4vYmVha2VyL3Jlc3QvdXRpbC9nZXRDb250cm9sUGFuZWxNZW51UGx1Z2lucycpXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1lbnVVcmxzKSB7XG4gICAgICAgICAgICAgICAgbWVudVVybHMuZm9yRWFjaChmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIubG9hZE1lbnVQbHVnaW4odXJsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG1lbnVlcyA9IHdpbmRvdy5iZWFrZXIuZ2V0Q29udHJvbE1lbnVJdGVtcygpO1xuICAgICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIuYXR0YWNoTWVudXMobWVudWVzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJHNjb3BlLmdldE1lbnVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudXMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBhY3Rpb25zIGZvciBVSVxuICAgICAgICAkc2NvcGUubmV3Tm90ZWJvb2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLm5ld1Nlc3Npb24oZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUubmV3RW1wdHlOb3RlYm9vayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIubmV3U2Vzc2lvbih0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm9wZW5UdXRvcmlhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIub3Blbk5vdGVib29rKFwiY29uZmlnL3R1dG9yaWFsLmJrclwiLCB1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGFzayBmb3IgdHJhY2tpbmcgcGVybWlzc2lvblxuICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gZmFsc2U7XG4gICAgICAgIGlmICgod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSAmJiBia1RyYWNrLmlzTmVlZFBlcm1pc3Npb24oKSkge1xuICAgICAgICAgIGJrVXRpbHMuaHR0cEdldChcIi4uL2JlYWtlci9yZXN0L3V0aWwvaXNBbGxvd0Fub255bW91c1RyYWNraW5nXCIpLnRoZW4oZnVuY3Rpb24oYWxsb3cpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoYWxsb3cuZGF0YSkge1xuICAgICAgICAgICAgICBjYXNlIFwidHJ1ZVwiOlxuICAgICAgICAgICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiZmFsc2VcIjpcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5iZWFrZXIgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuYmVha2VyLmlzRW1iZWRkZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICRzY29wZS4kd2F0Y2goXCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmdcIiwgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBhbGxvdyA9IG51bGw7XG4gICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGFsbG93ID0gXCJ0cnVlXCI7XG4gICAgICAgICAgICAgICAgYmtUcmFjay5lbmFibGUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhbGxvdyA9IFwiZmFsc2VcIjtcbiAgICAgICAgICAgICAgICBia1RyYWNrLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBia1V0aWxzLmh0dHBQb3N0KFwiLi4vYmVha2VyL3Jlc3QvdXRpbC9zZXRBbGxvd0Fub255bW91c1RyYWNraW5nXCIsIHsgYWxsb3c6IGFsbG93IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5zaG93V2hhdFdlTG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd01vZGFsRGlhbG9nKFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgICAgIEpTVFsnY29udHJvbHBhbmVsL3doYXRfd2VfbG9nJ10oKVxuICAgICAgICAgICk7XG4gICAgICAgIH07XG5cblx0dmFyIGtleWRvd25IYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS5zaGlmdEtleSAmJiAoZS53aGljaCA9PT0gNzgpKSB7IC8vIEN0cmwgKyBTaGlmdCArIG5cblx0ICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld05vdGVib29rKCk7XG4gICAgICAgICAgICB9KTtcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2UgaWYgKGUuY3RybEtleSAmJiAoZS53aGljaCA9PT0gNzgpKSB7IC8vIEN0cmwgKyBuXG5cdCAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdFbXB0eU5vdGVib29rKCk7XG4gICAgICAgICAgICAgfSk7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfSBlbHNlIGlmIChlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiBlLnNoaWZ0S2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ21kICsgU2hpZnQgKyBuXG5cdCAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdOb3RlYm9vaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgfSBlbHNlIGlmIChlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAoZS53aGljaCA9PT0gNzgpKSB7IC8vIENtZCArIG5cbiAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld0VtcHR5Tm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH1cblx0fVxuXHRjb25zb2xlLmxvZygnaW5zdGFsbGluZyBrZXlkb3duSGFuZGxlcicpO1xuXHQkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuXG5cdHZhciBvbkRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblx0ICAgICQoZG9jdW1lbnQpLnVuYmluZCgna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcblx0fVxuXHQkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgb25EZXN0cm95KTtcblxuICAgICAgICAvLyBzZXNzaW9ucyBsaXN0IFVJXG4gICAgICAgICRzY29wZS5zZXNzaW9ucyA9IG51bGw7XG4gICAgICAgIC8vIGdldCBsaXN0IG9mIG9wZW5lZCBzZXNzaW9uc1xuICAgICAgICAkc2NvcGUucmVsb2FkU2Vzc2lvbnNMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtTZXNzaW9uLmdldFNlc3Npb25zKCkudGhlbihmdW5jdGlvbihzZXNzaW9ucykge1xuICAgICAgICAgICAgJHNjb3BlLnNlc3Npb25zID0gXyhzZXNzaW9ucykubWFwKGZ1bmN0aW9uKHNlc3Npb24sIHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICBzZXNzaW9uLmlkID0gc2Vzc2lvbklkO1xuICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUucmVsb2FkU2Vzc2lvbnNMaXN0KCk7XG4gICAgICAgICRzY29wZS5pc1Nlc3Npb25zTGlzdEVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF8uaXNFbXB0eSgkc2NvcGUuc2Vzc2lvbnMpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBiay5Db250cm9sUGFuZWxcbiAqIC0gVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgJ2NvbnRyb2wgcGFuZWwnIHNlY3Rpb24gb2YgYmVha2VyXG4gKiAtIEluIHRoZSBjb250cm9sIHBhbmVsLCB1c2VycyBnZXQgYSBsaXN0IG9mIG9wZW5lZCBzZXNzaW9ucyBhbmQgaXMgYWJsZSB0b1xuICogKHJlKW9wZW4gb25lIGluIGJrQXBwLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb250cm9sUGFuZWwnKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvbnRyb2xQYW5lbFNlc3Npb25JdGVtJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLCBia1Nlc3Npb24sIGJrQ29yZU1hbmFnZXIsIGJrUmVjZW50TWVudSwgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ2NvbnRyb2xwYW5lbC90YWJsZSddLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIub3BlblNlc3Npb24oc2Vzc2lvbi5pZCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICB2YXIgZm9ybWF0ID0gc2Vzc2lvbi5mb3JtYXQ7XG4gICAgICAgICAgdmFyIG5vdGVib29rTW9kZWwgPSBhbmd1bGFyLmZyb21Kc29uKHNlc3Npb24ubm90ZWJvb2tNb2RlbEpzb24pO1xuICAgICAgICAgIHZhciBlZGl0ZWQgPSBzZXNzaW9uLmVkaXRlZDtcbiAgICAgICAgICB2YXIgY2xvc2VTZXNzaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5jcmVhdGVFdmFsdWF0b3JUaGVuRXhpdChub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbaV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uLmNsb3NlKHNlc3Npb24uaWQpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRzY29wZS5yZWxvYWRTZXNzaW9uc0xpc3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKCFlZGl0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNsb3NlIHNlc3Npb25cbiAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBhc2sgaWYgdXNlciB3YW50IHRvIHNhdmUgZmlyc3RcbiAgICAgICAgICAgIGJrSGVscGVyLnNob3czQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgXCJEbyB5b3Ugd2FudCB0byBzYXZlIFtcIiArICRzY29wZS5nZXRDYXB0aW9uKHNlc3Npb24pICsgXCJdP1wiLFxuICAgICAgICAgICAgICAgIFwiQ29uZmlybSBjbG9zZVwiLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyAvLyB5ZXNcbiAgICAgICAgICAgICAgICAgIC8vIHNhdmUgc2Vzc2lvblxuICAgICAgICAgICAgICAgICAgdmFyIHNhdmVTZXNzaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsQXNTdHJpbmcgPSBia1V0aWxzLnRvUHJldHR5SnNvbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoc2Vzc2lvbi5ub3RlYm9va1VyaSkgJiYgIXNlc3Npb24ucmVhZE9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIoc2Vzc2lvbi51cmlUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZVNhdmVyLnNhdmUoc2Vzc2lvbi5ub3RlYm9va1VyaSwgbm90ZWJvb2tNb2RlbEFzU3RyaW5nLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyKCkudGhlbihmdW5jdGlvbihwYXRoSW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXRoSW5mby51cmkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVzZTogXCJTYXZlIGNhbmNlbGxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKHBhdGhJbmZvLnVyaVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2F2ZXIuc2F2ZShwYXRoSW5mby51cmksIG5vdGVib29rTW9kZWxBc1N0cmluZykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmtSZWNlbnRNZW51LnJlY29yZFJlY2VudERvY3VtZW50KGFuZ3VsYXIudG9Kc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogcGF0aEluZm8udXJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcGF0aEluZm8udXJpVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXy5pc0VtcHR5KGZvcm1hdCkgPyBcIlwiIDogZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdXNlOiBcImVycm9yIHNhdmluZyB0byBmaWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB2YXIgc2F2aW5nRmFpbGVkSGFuZGxlciA9IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uY2F1c2UgPT09IFwiU2F2ZSBjYW5jZWxsZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBzYXZpbmcgY2FuY2VsbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGJrSGVscGVyLnNob3cxQnV0dG9uTW9kYWwoaW5mby5lcnJvciwgaW5mby5jYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBzYXZlU2Vzc2lvbigpLnRoZW4oY2xvc2VTZXNzaW9uLCBzYXZpbmdGYWlsZWRIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyAvLyBub1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbG9zZSB3aXRob3V0IHNhdmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgICAgICAgLy8gbm8tb3BcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiU2F2ZVwiLFxuICAgICAgICAgICAgICAgIFwiRG9uJ3QgU2F2ZVwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0Q2FwdGlvbiA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICB2YXIgdXJsID0gc2Vzc2lvbi5ub3RlYm9va1VyaTtcbiAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiTmV3IE5vdGVib29rXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh1cmxbdXJsLmxlbmd0aCAtIDFdID09PSBcIi9cIikge1xuICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1cmwucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHNlc3Npb24ubm90ZWJvb2tVcmk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia0NlbGxNZW51UGx1Z2luTWFuYWdlclxuICogYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIgbG9hZCBhbmQgbWFuYWdlcyBsb2FkZWQgY2VsbCBtZW51IHBsdWdpbnMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNlbGxNZW51UGx1Z2luTWFuYWdlcicsIFtcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5oZWxwZXInICAvLyBUaGlzIGlzIG9ubHkgZm9yIGVuc3VyaW5nIHRoYXQgd2luZG93LmJrSGVscGVyIGlzIHNldCwgZG9uJ3QgdXNlIGJrSGVscGVyIGRpcmVjdGx5XG4gIF0pO1xuICBtb2R1bGUuZmFjdG9yeSgnYmtDZWxsTWVudVBsdWdpbk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzKSB7XG4gICAgLy8gbG9hZGVkIHBsdWdpbnNcbiAgICB2YXIgX2NlbGxNZW51UGx1Z2lucyA9IHt9O1xuXG4gICAgdmFyIGFkZFBsdWdpbiA9IGZ1bmN0aW9uKGNlbGxUeXBlLCBpdGVtR2V0dGVyKSB7XG4gICAgICBpZiAoIV9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdKSB7XG4gICAgICAgIF9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdID0gW107XG4gICAgICB9XG4gICAgICBfY2VsbE1lbnVQbHVnaW5zW2NlbGxUeXBlXS5wdXNoKGl0ZW1HZXR0ZXIpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZvciAodmFyIG1lbWJlciBpbiBfY2VsbE1lbnVQbHVnaW5zKSB7XG4gICAgICAgICAgZGVsZXRlIF9jZWxsTWVudVBsdWdpbnNbbWVtYmVyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KCcuLi9iZWFrZXIvcmVzdC91dGlsL2dldENlbGxNZW51UGx1Z2lucycpXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1lbnVVcmxzKSB7XG4gICAgICAgICAgICAgICAgbWVudVVybHMuZm9yRWFjaChzZWxmLmxvYWRQbHVnaW4pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWwgPSB3aW5kb3cuYmVha2VyLmdldENlbGxNZW51TGlzdCgpO1xuICAgICAgICAgIGlmIChfLmlzQXJyYXkobWwpKSB7XG4gICAgICAgICAgICB2YXIgaTsgICAgICBcbiAgICAgICAgICAgIGZvcihpPTA7IGk8bWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheShtbFtpXS5jZWxsVHlwZSkpIHtcbiAgICAgICAgICAgICAgICBfKG1sW2ldLmNlbGxUeXBlKS5lYWNoKGZ1bmN0aW9uKGNUeXBlKSB7XG4gICAgICAgICAgICAgICAgICBhZGRQbHVnaW4oY1R5cGUsIG1sW2ldLnBsdWdpbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkUGx1Z2luKG1sW2ldLmNlbGxUeXBlLCBtbFtpXS5wbHVnaW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbG9hZFBsdWdpbjogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRNb2R1bGUodXJsKS50aGVuKGZ1bmN0aW9uKGV4KSB7XG4gICAgICAgICAgaWYgKF8uaXNBcnJheShleC5jZWxsVHlwZSkpIHtcbiAgICAgICAgICAgIF8oZXguY2VsbFR5cGUpLmVhY2goZnVuY3Rpb24oY1R5cGUpIHtcbiAgICAgICAgICAgICAgYWRkUGx1Z2luKGNUeXBlLCBleC5wbHVnaW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZFBsdWdpbihleC5jZWxsVHlwZSwgZXgucGx1Z2luKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGV4LnBsdWdpbjtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0UGx1Z2luOiBmdW5jdGlvbihjZWxsVHlwZSkge1xuICAgICAgICByZXR1cm4gX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV07XG4gICAgICB9LFxuICAgICAgZ2V0TWVudUl0ZW1zOiBmdW5jdGlvbihjZWxsVHlwZSwgc2NvcGUpIHtcbiAgICAgICAgdmFyIG1lbnVJdGVtR2V0dGVycyA9IF9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdO1xuICAgICAgICB2YXIgbmV3SXRlbXMgPSBbXTtcbiAgICAgICAgXyhtZW51SXRlbUdldHRlcnMpLmVhY2goZnVuY3Rpb24oZ2V0dGVyKSB7XG4gICAgICAgICAgdmFyIGl0ZW1zID0gZ2V0dGVyKHNjb3BlKTtcbiAgICAgICAgICBfKGl0ZW1zKS5lYWNoKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICBuZXdJdGVtcy5wdXNoKGl0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXdJdGVtcztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5jb3JlXG4gKiBIb2xkcyB0aGUgY29yZSBvZiBiZWFrZXIgdXRpbGl0aWVzLiBJdCB3cmFwcyBvZiBsb3dlciBsZXZlbCB1dGlsaXRpZXMgdGhhdCBjb21lIGZyb20gb3RoZXJcbiAqIG1vZHVsZXMuXG4gKiBUaGUgdXNlciBmYWNpbmcgZGlyZWN0aXZlcyBhbHNvIHVzZSB0aGUgY29yZSBhcyBhIGNvbW11bmljYXRpb24vZXhjaGFuZ2UgbGF5ZXIuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnLCBbXG4gICAgJ3VpLmJvb3RzdHJhcCcsXG4gICAgJ3VpLmtleXByZXNzJyxcbiAgICAnYmsuY29tbW9uVWknLFxuICAgICdiay51dGlscycsXG4gICAgJ2JrLnJlY2VudE1lbnUnLFxuICAgICdiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXInLFxuICAgICdiay50cmVlVmlldydcbiAgXSk7XG5cbiAgLyoqXG4gICAqIGJrQ29yZU1hbmFnZXJcbiAgICogLSB0aGlzIGFjdHMgYXMgdGhlIGdsb2JhbCBzcGFjZSBmb3IgYWxsIHZpZXcgbWFuYWdlcnMgdG8gdXNlIGl0IGFzIHRoZSBjb21tdW5pY2F0aW9uIGNoYW5uZWxcbiAgICogLSBia1V0aWxzIHNob3VsZCBiZSBjb25zaWRlciAncHJpdmF0ZScgdG8gYmVha2VyLCBleHRlcm5hbCBjb2RlIHNob3VsZCBkZXBlbmQgb24gYmtIZWxwZXJcbiAgICogICAgIGluc3RlYWRcbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCdia0NvcmVNYW5hZ2VyJywgZnVuY3Rpb24oXG4gICAgICAkbW9kYWwsXG4gICAgICAkcm9vdFNjb3BlLFxuICAgICAgJGRvY3VtZW50LFxuICAgICAgJGxvY2F0aW9uLFxuICAgICAgJHNlc3Npb25TdG9yYWdlLFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrUmVjZW50TWVudSxcbiAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLFxuICAgICAgbW9kYWxEaWFsb2dPcCkge1xuXG4gICAgdmFyIEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5ID0gZnVuY3Rpb24gKCl7XG4gICAgICB2YXIgbmV3U3RyYXRlZ3kgPSB0aGlzO1xuICAgICAgbmV3U3RyYXRlZ3kuaW5wdXQgPSBcIlwiO1xuICAgICAgbmV3U3RyYXRlZ3kuZ2V0UmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXdTdHJhdGVneS5pbnB1dDtcbiAgICAgIH07XG4gICAgICBuZXdTdHJhdGVneS5jbG9zZSA9IGZ1bmN0aW9uKGV2LCBjbG9zZUZ1bmMpIHtcbiAgICAgICAgaWYgKGV2LndoaWNoID09PSAxMykge1xuICAgICAgICAgIGNsb3NlRnVuYyh0aGlzLmdldFJlc3VsdCgpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG5ld1N0cmF0ZWd5LnRyZWVWaWV3ZnMgPSB7IC8vIGZpbGUgc2VydmljZVxuICAgICAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24oYmFzZVBhdGgsIG9wZW5Gb2xkZXJzKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgIHBhdGhzID0gW2Jhc2VQYXRoXTtcblxuICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKG9wZW5Gb2xkZXJzKSB7XG4gICAgICAgICAgICB2YXIgcGF0aHMgPSBbcGF0aHNdLmNvbmNhdChvcGVuRm9sZGVycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuaHR0cFBvc3QoXCIuLi9iZWFrZXIvcmVzdC9maWxlLWlvL2dldERlY29yYXRlZENoaWxkcmVuXCIsIHtcbiAgICAgICAgICAgIG9wZW5Gb2xkZXJzOiBwYXRocy5qb2luKCcsJylcbiAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICBzZWxmLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2FkaW5nIGNoaWxkcmVuXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmaWxsSW5wdXQ6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICBuZXdTdHJhdGVneS5pbnB1dCA9IHBhdGg7XG4gICAgICAgIH0sXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICB0aGlzLmZpbGxJbnB1dChwYXRoKTtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ21vZGFsLnN1Ym1pdCcpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRPcmRlckJ5OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyQnkgPSBvcHRpb25zLm9yZGVyQnk7XG4gICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyUmV2ZXJzZSA9IG9wdGlvbnMucmV2ZXJzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JkZXJCeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRyb290U2NvcGUuZnNQcmVmcy5vcmRlckJ5IHx8ICd1cmknO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPcmRlclJldmVyc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhISRyb290U2NvcGUuZnNQcmVmcy5vcmRlclJldmVyc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFByZXR0eU9yZGVyQnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcmV0dHlOYW1lcyA9IHtcbiAgICAgICAgICAgIHVyaTogJ05hbWUnLFxuICAgICAgICAgICAgbW9kaWZpZWQ6ICdEYXRlIE1vZGlmaWVkJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwcmV0dHlOYW1lc1skcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJCeSB8fCAndXJpJ107XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dTcGlubmVyOiBmYWxzZSxcbiAgICAgICAgYXBwbHlFeHRGaWx0ZXI6IHRydWUsXG4gICAgICAgIGV4dEZpbHRlcjogWydia3InXSxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIHZhciBmcyA9IG5ld1N0cmF0ZWd5LnRyZWVWaWV3ZnM7XG4gICAgICAgICAgaWYgKCFmcy5hcHBseUV4dEZpbHRlciB8fCBfLmlzRW1wdHkoZnMuZXh0RmlsdGVyKSB8fCBjaGlsZC50eXBlID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF8oZnMuZXh0RmlsdGVyKS5hbnkoZnVuY3Rpb24oZXh0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfLnN0cmluZy5lbmRzV2l0aChjaGlsZC51cmksIGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIGltcG9ydGVycyBhcmUgcmVzcG9uc2libGUgZm9yIGltcG9ydGluZyB2YXJpb3VzIGZvcm1hdHMgaW50byBia3JcbiAgICAvLyBpbXBvcnRlciBpbXBsIG11c3QgZGVmaW5lIGFuICdpbXBvcnQnIG1ldGhvZFxuICAgIHZhciBfaW1wb3J0ZXJzID0ge307XG4gICAgdmFyIEZPUk1BVF9CS1IgPSBcImJrclwiO1xuICAgIF9pbXBvcnRlcnNbRk9STUFUX0JLUl0gPSB7XG4gICAgICBpbXBvcnQ6IGZ1bmN0aW9uKG5vdGVib29rSnNvbikge1xuICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtVdGlscy5mcm9tUHJldHR5SnNvbihub3RlYm9va0pzb24pO1xuICAgICAgICAgIC8vIFRPRE8sIHRvIGJlIHJlbW92ZWQuIEFkZHJlc3NpbmcgbG9hZGluZyBhIGNvcnJ1cHRlZCBub3RlYm9vay5cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhub3RlYm9va01vZGVsKSkge1xuICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrVXRpbHMuZnJvbVByZXR0eUpzb24obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICBia1V0aWxzLmxvZyhcImNvcnJ1cHRlZC1ub3RlYm9va1wiLCB7IG5vdGVib29rVXJpOiBlbmhhbmNlZE5vdGVib29rVXJpIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoaXMgaXMgbm90IGEgdmFsaWQgQmVha2VyIG5vdGVib29rIEpTT05cIik7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihub3RlYm9va0pzb24pO1xuICAgICAgICAgIHRocm93IFwiTm90IGEgdmFsaWQgQmVha2VyIG5vdGVib29rXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vdGVib29rTW9kZWw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBMT0NBVElPTl9GSUxFU1lTID0gXCJmaWxlXCI7XG4gICAgdmFyIExPQ0FUSU9OX0hUVFAgPSBcImh0dHBcIjtcbiAgICB2YXIgTE9DQVRJT05fQUpBWCA9IFwiYWpheFwiO1xuXG4gICAgLy8gZmlsZUxvYWRlcnMgYXJlIHJlc3BvbnNpYmxlIGZvciBsb2FkaW5nIGZpbGVzIGFuZCBvdXRwdXQgdGhlIGZpbGUgY29udGVudCBhcyBzdHJpbmdcbiAgICAvLyBmaWxlTG9hZGVyIGltcGwgbXVzdCBkZWZpbmUgYW4gJ2xvYWQnIG1ldGhvZCB3aGljaCByZXR1cm5zIGEgdGhlbi1hYmxlXG4gICAgdmFyIF9maWxlTG9hZGVycyA9IHt9O1xuICAgIF9maWxlTG9hZGVyc1tMT0NBVElPTl9GSUxFU1lTXSA9IHtcbiAgICAgIGxvYWQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkRmlsZSh1cmkpO1xuICAgICAgfVxuICAgIH07XG4gICAgX2ZpbGVMb2FkZXJzW0xPQ0FUSU9OX0hUVFBdID0ge1xuICAgICAgbG9hZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRIdHRwKHVyaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBfZmlsZUxvYWRlcnNbTE9DQVRJT05fQUpBWF0gPSB7XG4gICAgICBsb2FkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZEFqYXgodXJpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZmlsZVNhdmVycyBhcmUgcmVzcG9uc2libGUgZm9yIHNhdmluZyB2YXJpb3VzIGZvcm1hdHMgaW50byBia3JcbiAgICAvLyBmaWxlTG9hZGVyIGltcGwgbXVzdCBkZWZpbmUgYW4gJ2xvYWQnIG1ldGhvZCB3aGljaCByZXR1cm5zIGEgdGhlbi1hYmxlXG4gICAgdmFyIF9maWxlU2F2ZXJzID0ge307XG5cbiAgICBfZmlsZVNhdmVyc1tMT0NBVElPTl9GSUxFU1lTXSA9IHtcbiAgICAgIHNhdmU6IGZ1bmN0aW9uKHVyaSwgY29udGVudEFzU3RyaW5nLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2F2ZUZpbGUodXJpLCBjb250ZW50QXNTdHJpbmcsIG92ZXJ3cml0ZSk7XG4gICAgICB9LFxuICAgICAgc2hvd0ZpbGVDaG9vc2VyOiBmdW5jdGlvbihpbml0VXJpKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXIoaW5pdFVyaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9maWxlU2F2ZXJzW0xPQ0FUSU9OX0FKQVhdID0ge1xuICAgICAgc2F2ZTogZnVuY3Rpb24odXJpLCBjb250ZW50QXNTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2F2ZUFqYXgodXJpLCBjb250ZW50QXNTdHJpbmcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgaW1wb3J0SW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkaW5wdXQsXG4gICAgICAgICAgZW5kcG9pbnQgPSAnLi4vYmVha2VyL2ZpbGV1cGxvYWQnO1xuXG4gICAgICBpZiAoKCRpbnB1dCA9ICQoJ2lucHV0I2ltcG9ydC1ub3RlYm9vaycpKS5sZW5ndGgpIHJldHVybiAkaW5wdXQ7XG5cbiAgICAgICRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwiZmlsZVwiIG5hbWU9XCJmaWxlXCIgaWQ9XCJpbXBvcnQtbm90ZWJvb2tcIiAnICtcbiAgICAgICAgICAgICAgICAgJ2RhdGEtdXJsPVwiJyArIGVuZHBvaW50ICsgJ1wiICcgK1xuICAgICAgICAgICAgICAgICAnc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPicpXG4gICAgICAgICAgICAgICAgLnByZXBlbmRUbygnYm9keScpO1xuXG4gICAgICAkaW5wdXQuZmlsZXVwbG9hZCh7XG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRvbmU6IGZ1bmN0aW9uKGUsIGRhdGEpIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmltcG9ydE5vdGVib29rKGRhdGEucmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAkaW5wdXQ7XG4gICAgfTtcblxuICAgIHZhciBia0NvcmVNYW5hZ2VyID0ge1xuXG4gICAgICBzZXROb3RlYm9va0ltcG9ydGVyOiBmdW5jdGlvbihmb3JtYXQsIGltcG9ydGVyKSB7XG4gICAgICAgIF9pbXBvcnRlcnNbZm9ybWF0XSA9IGltcG9ydGVyO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rSW1wb3J0ZXI6IGZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gX2ltcG9ydGVyc1tmb3JtYXRdO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVMb2FkZXI6IGZ1bmN0aW9uKHVyaVR5cGUsIGZpbGVMb2FkZXIpIHtcbiAgICAgICAgX2ZpbGVMb2FkZXJzW3VyaVR5cGVdID0gZmlsZUxvYWRlcjtcbiAgICAgIH0sXG4gICAgICBnZXRGaWxlTG9hZGVyOiBmdW5jdGlvbih1cmlUeXBlKSB7XG4gICAgICAgIHJldHVybiBfZmlsZUxvYWRlcnNbdXJpVHlwZV07XG4gICAgICB9LFxuICAgICAgc2V0RmlsZVNhdmVyOiBmdW5jdGlvbih1cmlUeXBlLCBmaWxlU2F2ZXIpIHtcbiAgICAgICAgX2ZpbGVTYXZlcnNbdXJpVHlwZV0gPSBmaWxlU2F2ZXI7XG4gICAgICB9LFxuICAgICAgZ2V0RmlsZVNhdmVyOiBmdW5jdGlvbih1cmlUeXBlKSB7XG4gICAgICAgIHJldHVybiBfZmlsZVNhdmVyc1t1cmlUeXBlXTtcbiAgICAgIH0sXG4gICAgICBndWVzc1VyaVR5cGU6IGZ1bmN0aW9uKG5vdGVib29rVXJpKSB7XG4gICAgICAgIC8vIFRPRE8sIG1ha2Ugc21hcnRlciBndWVzc1xuICAgICAgICBpZiAoL15odHRwcz86XFwvXFwvLy5leGVjKG5vdGVib29rVXJpKSkge1xuICAgICAgICAgIHJldHVybiBMT0NBVElPTl9IVFRQO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKC9eYWpheDovLmV4ZWMobm90ZWJvb2tVcmkpKSB7XG4gICAgICAgICAgcmV0dXJuIExPQ0FUSU9OX0FKQVg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIExPQ0FUSU9OX0ZJTEVTWVM7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBndWVzc0Zvcm1hdDogZnVuY3Rpb24obm90ZWJvb2tVcmkpIHtcbiAgICAgICAgLy8gVE9ETywgbWFrZSBzbWFydGVyIGd1ZXNzXG4gICAgICAgIHJldHVybiBGT1JNQVRfQktSO1xuICAgICAgfSxcblxuICAgICAgX2JlYWtlclJvb3RPcDogbnVsbCxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKGJlYWtlclJvb3RPcCkge1xuICAgICAgICB0aGlzLl9iZWFrZXJSb290T3AgPSBiZWFrZXJSb290T3A7XG4gICAgICAgIGJrUmVjZW50TWVudS5pbml0KHtcbiAgICAgICAgICBvcGVuOiBiZWFrZXJSb290T3Aub3Blbk5vdGVib29rXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdvdG9Db250cm9sUGFuZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmVha2VyUm9vdE9wLmdvdG9Db250cm9sUGFuZWwoKTtcbiAgICAgIH0sXG4gICAgICBuZXdTZXNzaW9uOiBmdW5jdGlvbihlbXB0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmVha2VyUm9vdE9wLm5ld1Nlc3Npb24oZW1wdHkpO1xuICAgICAgfSxcbiAgICAgIG9wZW5TZXNzaW9uOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JlYWtlclJvb3RPcC5vcGVuU2Vzc2lvbihzZXNzaW9uSWQpO1xuICAgICAgfSxcbiAgICAgIG9wZW5Ob3RlYm9vazogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpIHtcbiAgICAgICAgdGhpcy5fYmVha2VyUm9vdE9wLm9wZW5Ob3RlYm9vayhub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCk7XG4gICAgICB9LFxuICAgICAgYWRkSW1wb3J0SW5wdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpbXBvcnRJbnB1dCgpO1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vdGVib29rRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaW1wb3J0SW5wdXQoKS5jbGljaygpO1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vdGVib29rOiBmdW5jdGlvbihub3RlYm9vaykge1xuICAgICAgICAkc2Vzc2lvblN0b3JhZ2UuaW1wb3J0ZWROb3RlYm9vayA9IG5vdGVib29rO1xuXG4gICAgICAgIHJldHVybiAkcm9vdFNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9zZXNzaW9uL2ltcG9ydFwiKS5zZWFyY2goe30pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyOiBmdW5jdGlvbihpbml0UGF0aCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYmtVdGlscy5hbGwoW2JrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpLCBia1V0aWxzLmdldFN0YXJ0VXBEaXJlY3RvcnkoKV0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgICAgICB2YXIgaG9tZURpciA9IHZhbHVlc1swXTtcbiAgICAgICAgICB2YXIgcHdkID0gdmFsdWVzWzFdO1xuICAgICAgICAgIHZhciBmaWxlQ2hvb3NlclN0cmF0ZWd5ID0gc2VsZi5nZXRGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneSgpO1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kuaW5wdXQgPSBpbml0UGF0aDtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5LmdldFJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfLmlzRW1wdHkodGhpcy5pbnB1dCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbnB1dDtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09ICd+Jykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBob21lRGlyICsgXCIvXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5zdHJpbmcuc3RhcnRzV2l0aChyZXN1bHQsICd+LycpKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCd+JywgaG9tZURpcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFfLnN0cmluZy5zdGFydHNXaXRoKHJlc3VsdCwgJy8nKSAmJiAhcmVzdWx0Lm1hdGNoKC9eXFx3KzpcXFxcLykpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gcHdkICsgXCIvXCIgKyByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uc3RyaW5nLmVuZHNXaXRoKHJlc3VsdCwgJy5ia3InKVxuICAgICAgICAgICAgICAgICYmICFfLnN0cmluZy5lbmRzV2l0aChyZXN1bHQsICcvJykpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgXCIuYmtyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS5uZXdGb2xkZXIgPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNob3dTcGlubmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJrVXRpbHMuaHR0cFBvc3QoXCIuLi9iZWFrZXIvcmVzdC9maWxlLWlvL2NyZWF0ZURpcmVjdG9yeVwiLCB7cGF0aDogcGF0aH0pXG4gICAgICAgICAgICAgICAgLmNvbXBsZXRlKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5LmdldFNhdmVCdG5EaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIF8uaXNFbXB0eSh0aGlzLmlucHV0KSB8fCBfLnN0cmluZy5lbmRzV2l0aCh0aGlzLmlucHV0LCAnLycpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS50cmVlVmlld2ZzLmFwcGx5RXh0RmlsdGVyID0gZmFsc2U7XG4gICAgICAgICAgdmFyIGZpbGVDaG9vc2VyVGVtcGxhdGUgPSBKU1RbJ3RlbXBsYXRlL3NhdmVub3RlYm9vayddKHtob21lZGlyOiBob21lRGlyLCBwd2Q6IHB3ZCB9KTtcbiAgICAgICAgICB2YXIgZmlsZUNob29zZXJSZXN1bHRIYW5kbGVyID0gZnVuY3Rpb24gKGNob3NlbkZpbGVQYXRoKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgdXJpOiBjaG9zZW5GaWxlUGF0aCxcbiAgICAgICAgICAgICAgdXJpVHlwZTogTE9DQVRJT05fRklMRVNZU1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHNlbGYuc2hvd01vZGFsRGlhbG9nKFxuICAgICAgICAgICAgICBmaWxlQ2hvb3NlclJlc3VsdEhhbmRsZXIsXG4gICAgICAgICAgICAgIGZpbGVDaG9vc2VyVGVtcGxhdGUsXG4gICAgICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuXG4gICAgICBjb2RlTWlycm9yT3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIG5vdGVib29rQ2VsbE9wKSB7XG4gICAgICAgIHZhciBnb1VwT3JNb3ZlRm9jdXNVcCA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgaWYgKCQoJy5Db2RlTWlycm9yLWhpbnQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvL2NvZGVjb21wbGV0ZSBpcyB1cCwgc2tpcFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY20uZ2V0Q3Vyc29yKCkubGluZSA9PT0gMCkge1xuICAgICAgICAgICAgbW92ZUZvY3VzVXAoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJnb0xpbmVVcFwiKTtcbiAgICAgICAgICAgIHZhciB0b3AgPSBjbS5jdXJzb3JDb29yZHModHJ1ZSwnd2luZG93JykudG9wO1xuICAgICAgICAgICAgaWYgKCB0b3AgPCAxNTApXG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCB0b3AtMTUwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdvRG93bk9yTW92ZUZvY3VzRG93biA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgaWYgKCQoJy5Db2RlTWlycm9yLWhpbnQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvL2NvZGVjb21wbGV0ZSBpcyB1cCwgc2tpcFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY20uZ2V0Q3Vyc29yKCkubGluZSA9PT0gY20uZG9jLnNpemUgLSAxKSB7XG4gICAgICAgICAgICBtb3ZlRm9jdXNEb3duKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiZ29MaW5lRG93blwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVGb2N1c0Rvd24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBtb3ZlIGZvY3VzIHRvIG5leHQgY29kZSBjZWxsXG4gICAgICAgICAgdmFyIHRoaXNDZWxsSWQgPSBzY29wZS5jZWxsbW9kZWwuaWQ7XG4gICAgICAgICAgdmFyIG5leHRDZWxsID0gbm90ZWJvb2tDZWxsT3AuZ2V0TmV4dCh0aGlzQ2VsbElkKTtcbiAgICAgICAgICB3aGlsZSAobmV4dENlbGwpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5ia05vdGVib29rLmdldEZvY3VzYWJsZShuZXh0Q2VsbC5pZCkpIHtcbiAgICAgICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5nZXRGb2N1c2FibGUobmV4dENlbGwuaWQpLmZvY3VzKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV4dENlbGwgPSBub3RlYm9va0NlbGxPcC5nZXROZXh0KG5leHRDZWxsLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVGb2N1c1VwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gbW92ZSBmb2N1cyB0byBwcmV2IGNvZGUgY2VsbFxuICAgICAgICAgIHZhciB0aGlzQ2VsbElEID0gc2NvcGUuY2VsbG1vZGVsLmlkO1xuICAgICAgICAgIHZhciBwcmV2Q2VsbCA9IG5vdGVib29rQ2VsbE9wLmdldFByZXYodGhpc0NlbGxJRCk7XG4gICAgICAgICAgd2hpbGUgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHNjb3BlLmJrTm90ZWJvb2suZ2V0Rm9jdXNhYmxlKHByZXZDZWxsLmlkKTtcbiAgICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICAgIHQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgdmFyIHRvcCA9IHQuY20uY3Vyc29yQ29vcmRzKHRydWUsJ3dpbmRvdycpLnRvcDtcbiAgICAgICAgICAgICAgaWYgKCB0b3AgPCAxNTApXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIHRvcC0xNTApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHByZXZDZWxsID0gbm90ZWJvb2tDZWxsT3AuZ2V0UHJldihwcmV2Q2VsbC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBldmFsdWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmV2YWx1YXRlKCk7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGV2YWx1YXRlQW5kR29Eb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuZXZhbHVhdGUoKTtcbiAgICAgICAgICBtb3ZlRm9jdXNEb3duKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1heWJlU2hvd0F1dG9Db21wbGV0ZSA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLmJrTm90ZWJvb2suZ2V0Q01LZXlNYXBNb2RlKCkgPT09IFwiZW1hY3NcIikge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgICAgIGNtLnNldEV4dGVuZGluZyghY20uZ2V0RXh0ZW5kaW5nKCkpO1xuICAgICAgICAgICAgY20ub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNtLnNldEV4dGVuZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd0F1dG9Db21wbGV0ZShjbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzaG93QXV0b0NvbXBsZXRlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgZ2V0VG9rZW4gPSBmdW5jdGlvbihlZGl0b3IsIGN1cikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvci5nZXRUb2tlbkF0KGN1cik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgZ2V0SGludHMgPSBmdW5jdGlvbihlZGl0b3IsIHNob3dIaW50Q0IsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBjdXIgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBnZXRUb2tlbihlZGl0b3IsIGN1cik7XG4gICAgICAgICAgICB2YXIgY3Vyc29yUG9zID0gZWRpdG9yLmluZGV4RnJvbVBvcyhjdXIpO1xuICAgICAgICAgICAgLy8gV2UgbWlnaHQgd2FudCB0aGlzIGRlZmluZWQgYnkgdGhlIHBsdWdpbi5cbiAgICAgICAgICAgIHZhciBvblJlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHRzLCBtYXRjaGVkX3RleHQsIGRvdEZpeCkge1xuICAgICAgICAgICAgICB2YXIgc3RhcnQgPSB0b2tlbi5zdGFydDtcbiAgICAgICAgICAgICAgdmFyIGVuZCA9IHRva2VuLmVuZDtcbiAgICAgICAgICAgICAgaWYgKGRvdEZpeCAmJiB0b2tlbi5zdHJpbmcgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobWF0Y2hlZF90ZXh0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgKz0gKGN1ci5jaCAtIHRva2VuLnN0YXJ0IC0gbWF0Y2hlZF90ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBtYXRjaGVkX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNob3dIaW50Q0Ioe1xuICAgICAgICAgICAgICAgIGxpc3Q6IF8udW5pcShyZXN1bHRzKSxcbiAgICAgICAgICAgICAgICBmcm9tOiBDb2RlTWlycm9yLlBvcyhjdXIubGluZSwgc3RhcnQpLFxuICAgICAgICAgICAgICAgIHRvOiBDb2RlTWlycm9yLlBvcyhjdXIubGluZSwgZW5kKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5hdXRvY29tcGxldGUoY3Vyc29yUG9zLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoY20uZ2V0T3B0aW9uKCdtb2RlJykgPT09ICdodG1sbWl4ZWQnIHx8IGNtLmdldE9wdGlvbignbW9kZScpID09PSAnamF2YXNjcmlwdCcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNpbmcgY29kZSBtaXJyb3JcIik7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZChcImF1dG9jb21wbGV0ZVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICBjbG9zZU9uVW5mb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgYWxpZ25XaXRoV29yZDogdHJ1ZSxcbiAgICAgICAgICAgICAgY29tcGxldGVTaW5nbGU6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBDb2RlTWlycm9yLnNob3dIaW50KGNtLCBnZXRIaW50cywgb3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlQ2VsbFVwID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5tb3ZlVXAoc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlQ2VsbERvd24gPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLm1vdmVEb3duKHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZGVsZXRlQ2VsbCA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3AuZGVsZXRlKHNjb3BlLmNlbGxtb2RlbC5pZCwgdHJ1ZSk7XG4gICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRhYiA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgIHZhciBsZWZ0TGluZSA9IGNtLmdldFJhbmdlKHtsaW5lOiBjdXJzb3IubGluZSwgY2g6IDB9LCBjdXJzb3IpO1xuICAgICAgICAgIGlmIChsZWZ0TGluZS5tYXRjaCgvXlxccyokLykpIHtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiaW5kZW50TW9yZVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd0F1dG9Db21wbGV0ZShjbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJhY2tzcGFjZSA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgIHZhciBhbmNob3IgPSBjbS5nZXRDdXJzb3IoXCJhbmNob3JcIik7XG4gICAgICAgICAgaWYgKGN1cnNvci5saW5lICE9IGFuY2hvci5saW5lIHx8IGN1cnNvci5jaCAhPSBhbmNob3IuY2gpIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShcIlwiLCBjdXJzb3IsIGFuY2hvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBsZWZ0TGluZSA9IGNtLmdldFJhbmdlKHtsaW5lOiBjdXJzb3IubGluZSwgY2g6IDB9LCBjdXJzb3IpO1xuICAgICAgICAgIGlmIChsZWZ0TGluZS5tYXRjaCgvXlxccyskLykpIHtcbiAgICAgICAgICAgIGNtLmRlbGV0ZUgoLTEsIFwiY2hhclwiKTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBjbS5nZXRPcHRpb24oJ2luZGVudFVuaXQnKTtcbiAgICAgICAgICAgIHdoaWxlICgoY20uZ2V0Q3Vyc29yKCkuY2ggJSBpbmRlbnQpICE9IDApIHtcbiAgICAgICAgICAgICAgY20uZGVsZXRlSCgtMSwgXCJjaGFyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5kZWxldGVIKC0xLCBcImNoYXJcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsaW5lTnVtYmVyczogdHJ1ZSxcbiAgICAgICAgICBtYXRjaEJyYWNrZXRzOiB0cnVlLFxuICAgICAgICAgIGV4dHJhS2V5czoge1xuICAgICAgICAgICAgXCJVcFwiIDogZ29VcE9yTW92ZUZvY3VzVXAsXG4gICAgICAgICAgICBcIkRvd25cIiA6IGdvRG93bk9yTW92ZUZvY3VzRG93bixcbiAgICAgICAgICAgIFwiQ3RybC1TXCI6IFwic2F2ZVwiLFxuICAgICAgICAgICAgXCJDbWQtU1wiOiBcInNhdmVcIixcbiAgICAgICAgICAgIFwiQWx0LURvd25cIjogbW92ZUZvY3VzRG93bixcbiAgICAgICAgICAgIFwiQWx0LUpcIjogbW92ZUZvY3VzRG93bixcbiAgICAgICAgICAgIFwiQWx0LVVwXCI6IG1vdmVGb2N1c1VwLFxuICAgICAgICAgICAgXCJBbHQtS1wiOiBtb3ZlRm9jdXNVcCxcbiAgICAgICAgICAgIFwiQ3RybC1FbnRlclwiOiBldmFsdWF0ZSxcbiAgICAgICAgICAgIFwiQ21kLUVudGVyXCI6IGV2YWx1YXRlLFxuICAgICAgICAgICAgXCJTaGlmdC1FbnRlclwiOiBldmFsdWF0ZUFuZEdvRG93bixcbiAgICAgICAgICAgIFwiQ3RybC1TcGFjZVwiOiBtYXliZVNob3dBdXRvQ29tcGxldGUsXG4gICAgICAgICAgICBcIkNtZC1TcGFjZVwiOiBzaG93QXV0b0NvbXBsZXRlLFxuICAgICAgICAgICAgXCJDdHJsLUFsdC1VcFwiOiBtb3ZlQ2VsbFVwLFxuICAgICAgICAgICAgXCJDbWQtQWx0LVVwXCI6IG1vdmVDZWxsVXAsXG4gICAgICAgICAgICBcIkN0cmwtQWx0LURvd25cIjogbW92ZUNlbGxEb3duLFxuICAgICAgICAgICAgXCJDbWQtQWx0LURvd25cIjogbW92ZUNlbGxEb3duLFxuICAgICAgICAgICAgXCJDdHJsLUFsdC1EXCI6IGRlbGV0ZUNlbGwsXG4gICAgICAgICAgICBcIkNtZC1BbHQtRFwiOiBkZWxldGVDZWxsLFxuICAgICAgICAgICAgXCJUYWJcIjogdGFiLFxuICAgICAgICAgICAgXCJCYWNrc3BhY2VcIjogYmFja3NwYWNlLFxuICAgICAgICAgICAgXCJDdHJsLS9cIjogXCJ0b2dnbGVDb21tZW50XCIsXG4gICAgICAgICAgICBcIkNtZC0vXCI6IFwidG9nZ2xlQ29tbWVudFwiXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgX2JrQXBwSW1wbDogbnVsbCxcbiAgICAgIHNldEJrQXBwSW1wbDogZnVuY3Rpb24oYmtBcHBPcCkge1xuICAgICAgICB0aGlzLl9ia0FwcEltcGwgPSBia0FwcE9wO1xuICAgICAgfSxcbiAgICAgIGdldEJrQXBwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JrQXBwSW1wbDtcbiAgICAgIH0sXG5cbiAgICAgIGdldFJlY2VudE1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia1JlY2VudE1lbnUuZ2V0TWVudUl0ZW1zKCk7XG4gICAgICB9LFxuXG4gICAgICBnZXROb3RlYm9va0VsZW1lbnQ6IGZ1bmN0aW9uKGN1cnJlbnRTY29wZSkge1xuICAgICAgICAvLyBXYWxrIHVwIHRoZSBzY29wZSB0cmVlIGFuZCBmaW5kIHRoZSBvbmUgdGhhdCBoYXMgYWNjZXNzIHRvIHRoZVxuICAgICAgICAvLyBub3RlYm9vayBlbGVtZW50IChub3RlYm9vayBkaXJlY3RpdmUgc2NvcGUsIHNwZWNpZmljYWxseSlcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoY3VycmVudFNjb3BlLmdldE5vdGVib29rRWxlbWVudCkpIHtcbiAgICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0VsZW1lbnQoY3VycmVudFNjb3BlLiRwYXJlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50U2NvcGUuZ2V0Tm90ZWJvb2tFbGVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va0NlbGxNYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyO1xuICAgICAgfSxcbiAgICAgIC8vIGdlbmVyYWxcbiAgICAgIHNob3dNb2RhbERpYWxvZzogZnVuY3Rpb24oY2FsbGJhY2ssIHRlbXBsYXRlLCBzdHJhdGVneSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgY29udHJvbGxlcjogJ21vZGFsRGlhbG9nQ3RybCdcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYXR0YWNoU3VibWl0TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkZG9jdW1lbnQub24oJ2tleWRvd24ubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgJCgnLm1vZGFsIC5tb2RhbC1zdWJtaXQnKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciByZW1vdmVTdWJtaXRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRkb2N1bWVudC5vZmYoJ2tleWRvd24ubW9kYWwnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBYWFggLSB0ZW1wbGF0ZSBpcyBzb21ldGltZXMgYSB1cmwgbm93LlxuICAgICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZignYXBwL3RlbXBsYXRlLycpID09PSAwKSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vZGFsRGlhbG9nT3Auc2V0U3RyYXRlZ3koc3RyYXRlZ3kpO1xuICAgICAgICB2YXIgZGQgPSAkbW9kYWwub3BlbihvcHRpb25zKTtcblxuICAgICAgICBhdHRhY2hTdWJtaXRMaXN0ZW5lcigpO1xuXG4gICAgICAgIGRkLnJlc3VsdC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJlbW92ZVN1Ym1pdExpc3RlbmVyKCk7XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZW1vdmVTdWJtaXRMaXN0ZW5lcigpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGQ7XG4gICAgICB9LFxuICAgICAgc2hvdzBCdXR0b25Nb2RhbDogZnVuY3Rpb24obXNnQm9keSwgbXNnSGVhZGVyKSB7XG4gICAgICAgIGlmICghbXNnSGVhZGVyKSB7XG4gICAgICAgICAgbXNnSGVhZGVyID0gXCJPb3BzLi4uXCI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiA7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dNb2RhbERpYWxvZyhudWxsLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgc2hvdzFCdXR0b25Nb2RhbDogZnVuY3Rpb24obXNnQm9keSwgbXNnSGVhZGVyLCBjYWxsYmFjaywgYnRuVGV4dCwgYnRuQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFtc2dIZWFkZXIpIHtcbiAgICAgICAgICBtc2dIZWFkZXIgPSBcIk9vcHMuLi5cIjtcbiAgICAgICAgfVxuICAgICAgICBidG5UZXh0ID0gYnRuVGV4dCA/IGJ0blRleHQgOiBcIkNsb3NlXCI7XG4gICAgICAgIGJ0bkNsYXNzID0gYnRuQ2xhc3MgPyBfLmlzQXJyYXkoYnRuQ2xhc3MpID8gYnRuQ2xhc3Muam9pbignICcpIDogYnRuQ2xhc3MgOiAnYnRuLXByaW1hcnknO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9J21vZGFsLWhlYWRlcic+XCIgK1xuICAgICAgICAgICAgXCI8aDE+XCIgKyBtc2dIZWFkZXIgKyBcIjwvaDE+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J21vZGFsLWJvZHknPjxwPlwiICsgbXNnQm9keSArIFwiPC9wPjwvZGl2PlwiICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JyArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J2J0biBcIiArIGJ0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKFxcXCJPS1xcXCIpJz5cIiArIGJ0blRleHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dNb2RhbERpYWxvZyhjYWxsYmFjaywgdGVtcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIHNob3cyQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKFxuICAgICAgICAgIG1zZ0JvZHksXG4gICAgICAgICAgbXNnSGVhZGVyLFxuICAgICAgICAgIG9rQ0IsIGNhbmNlbENCLFxuICAgICAgICAgIG9rQnRuVHh0LCBjYW5jZWxCdG5UeHQsXG4gICAgICAgICAgb2tCdG5DbGFzcywgY2FuY2VsQnRuQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFtc2dIZWFkZXIpIHtcbiAgICAgICAgICBtc2dIZWFkZXIgPSBcIlF1ZXN0aW9uLi4uXCI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsb3NlID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICBva0NCID8gb2tDQigpIDogbnVsbDtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBjYW5jZWxcbiAgICAgICAgICAgIGNhbmNlbENCID8gY2FuY2VsQ0IoKSA6IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBva0J0blR4dCA9IG9rQnRuVHh0ID8gb2tCdG5UeHQgOiBcIk9LXCI7XG4gICAgICAgIGNhbmNlbEJ0blR4dCA9IGNhbmNlbEJ0blR4dCA/IGNhbmNlbEJ0blR4dCA6IFwiQ2FuY2VsXCI7XG4gICAgICAgIG9rQnRuQ2xhc3MgPSBva0J0bkNsYXNzID8gXy5pc0FycmF5KG9rQnRuQ2xhc3MpID8gb2tCdG5DbGFzcy5qb2luKCcgJykgOiBva0J0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgY2FuY2VsQnRuQ2xhc3MgPSBjYW5jZWxCdG5DbGFzcyA/IF8uaXNBcnJheShjYW5jZWxCdG5DbGFzcykgPyBjYW5jZWxCdG5DbGFzcy5qb2luKCcgJykgOiBjYW5jZWxCdG5DbGFzcyA6ICdidG4tZGVmYXVsdCc7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz0nbW9kYWwtaGVhZGVyJz5cIiArXG4gICAgICAgICAgICBcIjxoMT5cIiArIG1zZ0hlYWRlciArIFwiPC9oMT5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbW9kYWwtYm9keSc+PHA+XCIgKyBtc2dCb2R5ICsgXCI8L3A+PC9kaXY+XCIgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0nWWVzIGJ0biBcIiArIG9rQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIk9LXFxcIiknPlwiICsgb2tCdG5UeHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0nQ2FuY2VsIGJ0biBcIiArIGNhbmNlbEJ0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKCknPlwiICsgY2FuY2VsQnRuVHh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiO1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93TW9kYWxEaWFsb2coY2xvc2UsIHRlbXBsYXRlKTtcbiAgICAgIH0sXG4gICAgICBzaG93M0J1dHRvbk1vZGFsOiBmdW5jdGlvbihcbiAgICAgICAgICBtc2dCb2R5LCBtc2dIZWFkZXIsXG4gICAgICAgICAgeWVzQ0IsIG5vQ0IsIGNhbmNlbENCLFxuICAgICAgICAgIHllc0J0blR4dCwgbm9CdG5UeHQsIGNhbmNlbEJ0blR4dCxcbiAgICAgICAgICB5ZXNCdG5DbGFzcywgbm9CdG5DbGFzcywgY2FuY2VsQnRuQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFtc2dIZWFkZXIpIHtcbiAgICAgICAgICBtc2dIZWFkZXIgPSBcIlF1ZXN0aW9uLi4uXCI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsb3NlID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZZXNcIikge1xuICAgICAgICAgICAgeWVzQ0IgPyB5ZXNDQigpIDogbnVsbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJOb1wiKSB7XG4gICAgICAgICAgICBub0NCID8gbm9DQigpIDogbnVsbDtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBjYW5jZWxcbiAgICAgICAgICAgIGNhbmNlbENCID8gY2FuY2VsQ0IoKSA6IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB5ZXNCdG5UeHQgPSB5ZXNCdG5UeHQgPyB5ZXNCdG5UeHQgOiBcIlllc1wiO1xuICAgICAgICBub0J0blR4dCA9IG5vQnRuVHh0ID8gbm9CdG5UeHQgOiBcIk5vXCI7XG4gICAgICAgIGNhbmNlbEJ0blR4dCA9IGNhbmNlbEJ0blR4dCA/IGNhbmNlbEJ0blR4dCA6IFwiQ2FuY2VsXCI7XG4gICAgICAgIHllc0J0bkNsYXNzID0geWVzQnRuQ2xhc3MgPyBfLmlzQXJyYXkoeWVzQnRuQ2xhc3MpID8gb2tCdG5DbGFzcy5qb2luKCcgJykgOiB5ZXNCdG5DbGFzcyA6ICdidG4tZGVmYXVsdCc7XG4gICAgICAgIG5vQnRuQ2xhc3MgPSBub0J0bkNsYXNzID8gXy5pc0FycmF5KG5vQnRuQ2xhc3MpID8gbm9CdG5DbGFzcy5qb2luKCcgJykgOiBub0J0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgY2FuY2VsQnRuQ2xhc3MgPSBjYW5jZWxCdG5DbGFzcyA/IF8uaXNBcnJheShjYW5jZWxCdG5DbGFzcykgPyBjYW5jZWxCdG5DbGFzcy5qb2luKCcgJykgOiBjYW5jZWxCdG5DbGFzcyA6ICdidG4tZGVmYXVsdCc7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz0nbW9kYWwtaGVhZGVyJz5cIiArXG4gICAgICAgICAgICBcIjxoMT5cIiArIG1zZ0hlYWRlciArIFwiPC9oMT5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbW9kYWwtYm9keSc+PHA+XCIgKyBtc2dCb2R5ICsgXCI8L3A+PC9kaXY+XCIgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0neWVzIGJ0biBcIiArIHllc0J0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKFxcXCJZZXNcXFwiKSc+XCIgKyB5ZXNCdG5UeHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0nbm8gYnRuIFwiICsgbm9CdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZShcXFwiTm9cXFwiKSc+XCIgKyBub0J0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdjYW5jZWwgYnRuIFwiICsgY2FuY2VsQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoKSc+XCIgKyBjYW5jZWxCdG5UeHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dNb2RhbERpYWxvZyhjbG9zZSwgdGVtcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIGdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneSgpO1xuICAgICAgfSxcbiAgICAgIHNob3dGdWxsTW9kYWxEaWFsb2c6IGZ1bmN0aW9uKGNhbGxiYWNrLCB0ZW1wbGF0ZSwgY29udHJvbGxlciwgZHNjb3BlKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHdpbmRvd0NsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICAgICAgYmFja2Ryb3BDbGljazogdHJ1ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyLFxuICAgICAgICAgIHJlc29sdmU6IHsgZHNjb3BlOiBmdW5jdGlvbigpeyByZXR1cm4gZHNjb3BlOyB9IH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZignaHR0cDonKSAhPT0gMCkge1xuICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRkID0gJG1vZGFsLm9wZW4ob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBkZC5yZXN1bHQudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzaG93TGFuZ3VhZ2VNYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgd2luZG93Q2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICBiYWNrZHJvcENsaWNrOiB0cnVlLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdwbHVnaW5NYW5hZ2VyQ3RybCcsXG4gICAgICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlciddKClcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZGQgPSAkbW9kYWwub3BlbihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGRkLnJlc3VsdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBia0NvcmVNYW5hZ2VyO1xuICB9KTtcblxuICBtb2R1bGUuZmFjdG9yeSgnbW9kYWxEaWFsb2dPcCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfc3RyYXRlZ3kgPSB7fTtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0U3RyYXRlZ3k6IGZ1bmN0aW9uKHN0cmF0ZWd5KSB7XG4gICAgICAgIF9zdHJhdGVneSA9IHN0cmF0ZWd5O1xuICAgICAgfSxcbiAgICAgIGdldFN0cmF0ZWd5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9zdHJhdGVneTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICBtb2R1bGUuY29udHJvbGxlcignbW9kYWxEaWFsb2dDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgbW9kYWxEaWFsb2dPcCkge1xuICAgICRzY29wZS5nZXRTdHJhdGVneSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1vZGFsRGlhbG9nT3AuZ2V0U3RyYXRlZ3koKTtcbiAgICB9O1xuICAgICRyb290U2NvcGUuJG9uKCdtb2RhbC5zdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5jbG9zZSgkc2NvcGUuZ2V0U3RyYXRlZ3koKS5nZXRSZXN1bHQoKSk7XG4gICAgfSk7XG4gICAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZShyZXN1bHQpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBEaXJlY3RpdmUgdG8gc2hvdyBhIG1vZGFsIGRpYWxvZyB0aGF0IGRvZXMgZmlsZW5hbWUgaW5wdXQuXG4gICAqL1xuICBtb2R1bGUuZGlyZWN0aXZlKCdmaWxlQWN0aW9uRGlhbG9nJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjb3BlOiB7IGFjdGlvbk5hbWU6ICdAJywgaW5wdXRJZDogJ0AnLCBjbG9zZTogJz0nIH0sXG4gICAgICB0ZW1wbGF0ZTogSlNUWyd0ZW1wbGF0ZS9maWxlYWN0aW9uZGlhbG9nJ10oKSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBlbGVtZW50LmZpbmQoJ2lucHV0JykuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmRlYnVnXG4gKiBUaGlzIG1vZHVsZSBpcyBmb3IgZGVidWcgb25seSBhbmQgc2hvdWxkIG5ldmVyIGJlIHVzZWQgaW4gY29kZVxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiYmsuZGVidWdcIiwgW1xuICAgIFwiYmsuYW5ndWxhclV0aWxzXCIsXG4gICAgXCJiay5tYWluQXBwXCIsXG4gICAgJ2JrLmNlbGxNZW51UGx1Z2luTWFuYWdlcicsXG4gICAgXCJiay5jb3JlXCIsXG4gICAgJ2JrLnNlc3Npb25NYW5hZ2VyJyxcbiAgICBcImJrLm91dHB1dExvZ1wiLFxuICAgIFwiYmsucmVjZW50TWVudVwiLFxuICAgIFwiYmsuc2Vzc2lvblwiLFxuICAgIFwiYmsuc2hhcmVcIixcbiAgICBcImJrLnRyYWNrXCIsXG4gICAgXCJiay51dGlsc1wiLFxuICAgIFwiYmsuY29tZXRkVXRpbHNcIixcbiAgICBcImJrLmNvbW1vblV0aWxzXCIsXG4gICAgXCJiay5tZW51UGx1Z2luTWFuYWdlclwiLFxuICAgIFwiYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyXCIsXG4gICAgXCJiay5ldmFsdWF0b3JNYW5hZ2VyXCIsXG4gICAgXCJiay5ldmFsdWF0ZUpvYk1hbmFnZXJcIixcbiAgICBcImJrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlclwiXG4gIF0pO1xuICBtb2R1bGUuZmFjdG9yeShcImJrRGVidWdcIiwgZnVuY3Rpb24oXG4gICAgICAkaW5qZWN0b3IsIGFuZ3VsYXJVdGlscywgYmtFdmFsdWF0ZUpvYk1hbmFnZXIsIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLCBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgYmtDb3JlTWFuYWdlciwgYmtPdXRwdXRMb2csIGJrUmVjZW50TWVudSwgYmtTZXNzaW9uLCBia1NoYXJlLFxuICAgICAgYmtUcmFjaywgYmtVdGlscywgY29tZXRkVXRpbHMsIGNvbW1vblV0aWxzLCBia01lbnVQbHVnaW5NYW5hZ2VyLCBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICRpbmplY3RvcjogJGluamVjdG9yLFxuICAgICAgYW5ndWxhclV0aWxzOiBhbmd1bGFyVXRpbHMsXG4gICAgICBia0V2YWx1YXRlSm9iTWFuYWdlcjogYmtFdmFsdWF0ZUpvYk1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcjogYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia1Nlc3Npb25NYW5hZ2VyOiBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgYmtDb3JlTWFuYWdlcjogYmtDb3JlTWFuYWdlcixcbiAgICAgIGJrT3V0cHV0TG9nOiBia091dHB1dExvZyxcbiAgICAgIGJrUmVjZW50TWVudTogYmtSZWNlbnRNZW51LFxuICAgICAgYmtTZXNzaW9uOiBia1Nlc3Npb24sXG4gICAgICBia1NoYXJlOiBia1NoYXJlLFxuICAgICAgYmtUcmFjazogYmtUcmFjayxcbiAgICAgIGJrVXRpbHM6IGJrVXRpbHMsXG4gICAgICBjb21ldGRVdGlsczogY29tZXRkVXRpbHMsXG4gICAgICBjb21tb25VdGlsczogY29tbW9uVXRpbHMsXG4gICAgICBia01lbnVQbHVnaW5NYW5hZ2VyOiBia01lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXI6IGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyOiBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcjogYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBkZWJ1Z1VJOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYmtIZWxwZXIuZ2V0QmtOb3RlYm9va1ZpZXdNb2RlbCgpLnRvZ2dsZURlYnVnZ2luZygpO1xuICAgICAgICBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmV2YWx1YXRlUGx1Z2luTWFuYWdlcicsIFsnYmsudXRpbHMnXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdia0V2YWx1YXRlUGx1Z2luTWFuYWdlcicsIGZ1bmN0aW9uKGJrVXRpbHMsICRtb2RhbCkge1xuICAgIHZhciBuYW1lVG9VcmxNYXAgPSB7fTtcbiAgICB2YXIgbmFtZVRvVmlzdWFsUGFyYW1zID0ge307XG4gICAgdmFyIHBsdWdpbnMgPSB7fTtcbiAgICB2YXIgbG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5zID0gW107XG5cbiAgICB2YXIgZXZhbHVhdG9yTG9hZFF1ZXVlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9xdWV1ZSA9IFtdO1xuICAgICAgdmFyIF9sb2FkSW5Qcm9ncmVzcyA9IHVuZGVmaW5lZDtcblxuICAgICAgdmFyIGxvYWRFdmFsdWF0b3IgPSBmdW5jdGlvbihldikge1xuICAgICAgICBia0hlbHBlci5zaG93U3RhdHVzKFwiTG9hZGluZyBwbHVnaW4gXCIrZXYubmFtZSk7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRNb2R1bGUoZXYudXJsLCBldi5uYW1lKTtcbiAgICAgIH07XG4gICAgICB2YXIgZG9OZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfbG9hZEluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX2xvYWRJblByb2dyZXNzID0gX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGlmIChfbG9hZEluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBpZiAocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MubmFtZV0gfHwgcGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MudXJsXSkgeyAvLyBwbHVnaW4gY29kZSBhbHJlYWR5IGxvYWRlZFxuICAgICAgICAgICAgaWYgKHBsdWdpbnNbX2xvYWRJblByb2dyZXNzLm5hbWVdKSB7XG4gICAgICAgICAgICAgIF9sb2FkSW5Qcm9ncmVzcy5yZXNvbHZlKHBsdWdpbnNbX2xvYWRJblByb2dyZXNzLm5hbWVdKVxuICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihkb05leHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzLnJlc29sdmUocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MudXJsXSlcbiAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9sb2FkSW5Qcm9ncmVzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnRoZW4oZG9OZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGxvYWRFdmFsdWF0b3IoX2xvYWRJblByb2dyZXNzKVxuICAgICAgICAgIC50aGVuKF9sb2FkSW5Qcm9ncmVzcy5yZXNvbHZlLCAgX2xvYWRJblByb2dyZXNzLnJlamVjdClcbiAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBia0hlbHBlci5jbGVhclN0YXR1cyhcIkxvYWRpbmcgcGx1Z2luIFwiICsgX2xvYWRJblByb2dyZXNzLm5hbWUpXG4gICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihkb05leHQpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKGV2bCkge1xuICAgICAgICAgIF9xdWV1ZS5wdXNoKGV2bCk7XG4gICAgICAgICAgYmtVdGlscy5mY2FsbChkb05leHQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0S25vd25FdmFsdWF0b3JQbHVnaW5zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVUb1VybE1hcDtcbiAgICAgIH0sXG4gICAgICBhZGROYW1lVG9VcmxFbnRyeTogZnVuY3Rpb24obmFtZSwgdXJsKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHVybCA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgICAgbmFtZVRvVXJsTWFwW25hbWVdID0gdXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5hbWVUb1VybE1hcFtuYW1lXSA9IHVybC51cmw7XG4gICAgICAgICAgZGVsZXRlIHVybC51cmw7XG4gICAgICAgICAgbmFtZVRvVmlzdWFsUGFyYW1zW25hbWVdID0gdXJsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0VmlzdWFsUGFyYW1zOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHJldHVybiBuYW1lVG9WaXN1YWxQYXJhbXNbbmFtZV07XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yRmFjdG9yeUFuZFNoZWxsOiBmdW5jdGlvbihldmFsdWF0b3JTZXR0aW5ncykge1xuICAgICAgICB2YXIgbmFtZU9yVXJsID0gZXZhbHVhdG9yU2V0dGluZ3MucGx1Z2luO1xuICAgICAgICBpZiAocGx1Z2luc1tuYW1lT3JVcmxdKSB7IC8vIHBsdWdpbiBjb2RlIGFscmVhZHkgbG9hZGVkXG4gICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgIHBsdWdpbnNbbmFtZU9yVXJsXS5nZXRFdmFsdWF0b3JGYWN0b3J5KCkudGhlbihmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgICAgICAgICBpZiAoZmFjdG9yeSAhPT0gdW5kZWZpbmVkICYmIGZhY3RvcnkuY3JlYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkuY3JlYXRlKGV2YWx1YXRvclNldHRpbmdzKS50aGVuKGZ1bmN0aW9uKGV2KSB7IGRlZmVycmVkLnJlc29sdmUoZXYpOyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIm5vIGZhY3RvcnkgZm9yIGV2YWx1YXRvciBwbHVnaW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgIHZhciBuYW1lLCB1cmw7XG4gICAgICAgICAgaWYgKG5hbWVUb1VybE1hcFtuYW1lT3JVcmxdKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZU9yVXJsO1xuICAgICAgICAgICAgdXJsID0gbmFtZVRvVXJsTWFwW25hbWVPclVybF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgdXJsID0gbmFtZU9yVXJsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBsb2FkSm9iID0ge1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcmVzb2x2ZTogZnVuY3Rpb24oZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShleC5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgcGx1Z2luc1tleC5uYW1lXSA9IGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShuYW1lKSAmJiBuYW1lICE9PSBleC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICBwbHVnaW5zW25hbWVdID0gZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBleC5nZXRFdmFsdWF0b3JGYWN0b3J5KClcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhY3RvcnkgIT09IHVuZGVmaW5lZCAmJiBmYWN0b3J5LmNyZWF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkuY3JlYXRlKGV2YWx1YXRvclNldHRpbmdzKS50aGVuKGZ1bmN0aW9uKGV2KSB7IGRlZmVycmVkLnJlc29sdmUoZXYpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3Blbih7YmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcENsaWNrOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Q2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IEpTVFsnaGVscGVycy9wbHVnaW4tbG9hZC1lcnJvciddKHtwbHVnaW5JZDogbmFtZX0pfSk7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwibm8gZmFjdG9yeSBmb3IgZXZhbHVhdG9yIHBsdWdpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgbmV2ZXIgY2FsbGVkLiAgSW5zdGVhZCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gXCJ0aGVuXCIgY2xhdXNlIGFib3ZlIGlzIGNhbGxlZCBidXQgZmFjdG9yeSBpc1xuICAgICAgICAgICAgICAgICAgICAvLyB1bmRlZmluZWQuICBVbmtub3duIHdoeSBYWFguXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KGV4Lm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBsdWdpbnNbZXgubmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkobmFtZSkgJiYgbmFtZSAhPT0gZXgubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwbHVnaW5zW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImZhaWxlZCB0byBsb2FkIHBsdWdpbjogXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImZhaWxlZCB0byBsb2FkIHBsdWdpbjogXCIgKyBuYW1lICsgXCIgYXQgXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcmVqZWN0OiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGNhbGxlZCBpZiB0aGUgVVJMIGlzIGJhZCBvciB0aGVyZSBpcyBhIHN5bnRheCBlcnJvciBpbiB0aGUgSlMuXG4gICAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvd1RyYW5zaWVudFN0YXR1cyhcIkZhaWxlZCB0byBmaW5kIHBsdWdpbiBcIituYW1lK1wiOiBcIitlcnIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0VtcHR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJmYWlsZWQgdG8gZmluZCBwbHVnaW46IFwiICsgdXJsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGZpbmQgcGx1Z2luOiBcIiArIG5hbWUgKyBcIiBhdCBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBldmFsdWF0b3JMb2FkUXVldWUuYWRkKGxvYWRKb2IpO1xuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY3JlYXRlRXZhbHVhdG9yVGhlbkV4aXQ6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAgIHZhciB0aGVTaGVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXZhbHVhdG9yRmFjdG9yeUFuZFNoZWxsKHNldHRpbmdzKVxuICAgICAgICAudGhlbihmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICBpZiAoZXZhbHVhdG9yLmV4aXQpIHtcbiAgICAgICAgICAgIGV2YWx1YXRvci5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBfKHBsdWdpbnMpLmZpbHRlcihmdW5jdGlvbihhU2hlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBhU2hlbGwgIT09IHRoZVNoZWxsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5oZWxwZXJcbiAqIFRoZSBia0hlbHBlciBzaG91bGQgYmUgYSBzdWJzZXQgb2YgYmtDb3JlIHV0aWxpdGllcyB0aGF0IGFyZSBleHBvc2VkIGZvclxuICogdXNhZ2VzIGV4dGVybmFsIHRvIEJlYWtlci5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuaGVscGVyJywgWydiay51dGlscycsICdiay5jb3JlJywgJ2JrLnNoYXJlJywgJ2JrLmRlYnVnJ10pO1xuICAvKipcbiAgICogYmtIZWxwZXJcbiAgICogLSBzaG91bGQgYmUgdGhlIG9ubHkgdGhpbmcgcGx1Z2lucyBkZXBlbmQgb24gdG8gaW50ZXJhY3Qgd2l0aCBnZW5lcmFsIGJlYWtlciBzdHVmZnMgKG90aGVyIHRoYW5cbiAgICogY29uZm9ybWluZyB0byB0aGUgQVBJIHNwZWMpXG4gICAqIC0gZXhjZXB0IHBsdWdpbnMsIG5vdGhpbmcgc2hvdWxkIGRlcGVuZHMgb24gYmtIZWxwZXJcbiAgICogLSB3ZSd2ZSBtYWRlIHRoaXMgZ2xvYmFsLiBXZSBzaG91bGQgcmV2aXNpdCB0aGlzIGRlY2lzaW9uIGFuZCBmaWd1cmUgb3V0IHRoZSBiZXN0IHdheSB0byBsb2FkXG4gICAqICAgcGx1Z2lucyBkeW5hbWljYWxseVxuICAgKiAtIGl0IG1vc3RseSBzaG91bGQganVzdCBiZSBhIHN1YnNldCBvZiBia1V0aWxcbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCdia0hlbHBlcicsIGZ1bmN0aW9uKGJrVXRpbHMsIGJrQ29yZU1hbmFnZXIsIGJrU2hhcmUsIGJrRGVidWcpIHtcbiAgICB2YXIgZ2V0Q3VycmVudEFwcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKTtcbiAgICB9O1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQpIHtcbiAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEJrTm90ZWJvb2tXaWRnZXRcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBia0hlbHBlciA9IHtcbiAgICAgIC8vIGVuYWJsZSBkZWJ1Z1xuICAgICAgZGVidWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuYmtEZWJ1ZyA9IGJrRGVidWc7XG4gICAgICB9LFxuXG4gICAgICAvLyBiZWFrZXIgKHJvb3QpXG4gICAgICBnb3RvQ29udHJvbFBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgfSxcbiAgICAgIG9wZW5Ob3RlYm9vazogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIub3Blbk5vdGVib29rKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0KTtcbiAgICAgIH0sXG4gICAgICBpbXBvcnROb3RlYm9va0RpYWxvZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmltcG9ydE5vdGVib29rRGlhbG9nKCk7XG4gICAgICB9LFxuICAgICAgLy8gRW1wdHkgdHJ1ZSBtZWFucyB0cnVseSBlbXB0eSBuZXcgc2Vzc2lvbi5cbiAgICAgIC8vIG90aGVyd2lzZSB1c2UgdGhlIGRlZmF1bHQgbm90ZWJvb2suXG4gICAgICBuZXdTZXNzaW9uOiBmdW5jdGlvbihlbXB0eSkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5uZXdTZXNzaW9uKGVtcHR5KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIGN1cnJlbnQgYXBwXG4gICAgICBnZXRDdXJyZW50QXBwTmFtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KGdldEN1cnJlbnRBcHAoKS5uYW1lKSkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJVbmtub3duIEFwcFwiO1xuICAgICAgfSxcbiAgICAgIGhhc1Nlc3Npb25JZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0U2Vzc2lvbklkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGdldFNlc3Npb25JZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0U2Vzc2lvbklkKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRTZXNzaW9uSWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldFNlc3Npb25JZFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rTW9kZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldE5vdGVib29rTW9kZWwpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldE5vdGVib29rTW9kZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldE5vdGVib29rTW9kZWxcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRCZWFrZXJPYmplY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldEJlYWtlck9iamVjdCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0QmVha2VyT2JqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRCZWFrZXJPYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va0VsZW1lbnQ6IGZ1bmN0aW9uKGN1cnJlbnRTY29wZSkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0VsZW1lbnQoY3VycmVudFNjb3BlKTtcbiAgICAgIH0sXG4gICAgICBjb2xsYXBzZUFsbFNlY3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5jb2xsYXBzZUFsbFNlY3Rpb25zKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5jb2xsYXBzZUFsbFNlY3Rpb25zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBjb2xsYXBzZUFsbFNlY3Rpb25zXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xvc2VOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuY2xvc2VOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuY2xvc2VOb3RlYm9vaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgY2xvc2VOb3RlYm9va1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNhdmVOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2F2ZU5vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zYXZlTm90ZWJvb2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNhdmVOb3RlYm9va1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNhdmVOb3RlYm9va0FzOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9va0FzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zYXZlTm90ZWJvb2tBcyhub3RlYm9va1VyaSwgdXJpVHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzYXZlTm90ZWJvb2tBc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc0NvZGVDZWxsOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZSkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuaGFzQ29kZUNlbGwodG9FdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmFsdWF0ZTogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGUpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlKHRvRXZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBldmFsdWF0ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWx1YXRlUm9vdDogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGVSb290KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZVJvb3QodG9FdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGV2YWx1YXRlUm9vdFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWx1YXRlQ29kZTogZnVuY3Rpb24oZXZhbHVhdG9yLCBjb2RlKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGVDb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZUNvZGUoZXZhbHVhdG9yLCBjb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGV2YWx1YXRlQ29kZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvck1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0RXZhbHVhdG9yTWVudUl0ZW1zKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRFdmFsdWF0b3JNZW51SXRlbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEV2YWx1YXRvck1lbnVJdGVtc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZU5vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS50b2dnbGVOb3RlYm9va0xvY2tlZCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkudG9nZ2xlTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHRvZ2dsZU5vdGVib29rTG9ja2VkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNOb3RlYm9va0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuaXNOb3RlYm9va0xvY2tlZCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgaXNOb3RlYm9va0xvY2tlZFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNob3dBbm9ueW1vdXNUcmFja2luZ0RpYWxvZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNob3dBbm9ueW1vdXNUcmFja2luZ0RpYWxvZ1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNob3dTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2hvd1N0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2hvd1N0YXR1cyhtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzaG93U3RhdHVzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS51cGRhdGVTdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgdXBkYXRlU3RhdHVzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0U3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRTdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldFN0YXR1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0U3RhdHVzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xlYXJTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuY2xlYXJTdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmNsZWFyU3RhdHVzKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGNsZWFyU3RhdHVzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvd1RyYW5zaWVudFN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zaG93VHJhbnNpZW50U3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zaG93VHJhbnNpZW50U3RhdHVzKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNob3dUcmFuc2llbnRTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRFdmFsdWF0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRFdmFsdWF0b3JzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRFdmFsdWF0b3JzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Q29kZUNlbGxzOiBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRDb2RlQ2VsbHMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldENvZGVDZWxscyhmaWx0ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0Q29kZUNlbGxzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0Q29kZUNlbGxCb2R5OiBmdW5jdGlvbihuYW1lLCBjb2RlKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2V0Q29kZUNlbGxCb2R5KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEJvZHkobmFtZSxjb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNldENvZGVDZWxsQm9keVwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldENvZGVDZWxsRXZhbHVhdG9yOiBmdW5jdGlvbihuYW1lLCBldmFsdWF0b3IpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEV2YWx1YXRvcikge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2V0Q29kZUNlbGxFdmFsdWF0b3IobmFtZSwgZXZhbHVhdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNldENvZGVDZWxsRXZhbHVhdG9yXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0Q29kZUNlbGxUYWdzOiBmdW5jdGlvbihuYW1lLCB0YWdzKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2V0Q29kZUNlbGxUYWdzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbFRhZ3MobmFtZSwgdGFncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzZXRDb2RlQ2VsbFRhZ3NcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBiay1ub3RlYm9va1xuICAgICAgc2hhcmVOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLnNoYXJlQW5kT3BlblB1Ymxpc2hlZCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsZXRlQWxsT3V0cHV0Q2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgaWYgKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gYmtOb3RlYm9vay5kZWxldGVBbGxPdXRwdXRDZWxscygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0QmtOb3RlYm9va1ZpZXdNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLmdldFZpZXdNb2RlbCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0SW5wdXRDZWxsS2V5TWFwTW9kZTogZnVuY3Rpb24oa2V5TWFwTW9kZSkge1xuICAgICAgICB2YXIgYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgaWYgKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gYmtOb3RlYm9vay5zZXRDTUtleU1hcE1vZGUoa2V5TWFwTW9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRJbnB1dENlbGxLZXlNYXBNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suZ2V0Q01LZXlNYXBNb2RlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIGxvdyBsZXZlbCB1dGlscyAoYmtVdGlscylcbiAgICAgIHJlZnJlc2hSb290U2NvcGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICB9LFxuICAgICAgbG9hZEpTOiBmdW5jdGlvbih1cmwsIHN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZEpTKHVybCwgc3VjY2Vzcyk7XG4gICAgICB9LFxuICAgICAgbG9hZENTUzogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRDU1ModXJsKTtcbiAgICAgIH0sXG4gICAgICBsb2FkTGlzdDogZnVuY3Rpb24odXJsLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRMaXN0KHVybCwgc3VjY2VzcywgZmFpbHVyZSk7XG4gICAgICB9LFxuICAgICAgZmluZFRhYmxlOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmZpbmRUYWJsZShlbGVtKTtcbiAgICAgIH0sXG4gICAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2VuZXJhdGVJZChsZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIHNlcnZlclVybDogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5zZXJ2ZXJVcmwocGF0aCk7XG4gICAgICB9LFxuICAgICAgZmlsZVVybDogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5maWxlVXJsKHBhdGgpO1xuICAgICAgfSxcbiAgICAgIGh0dHBHZXQ6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5odHRwR2V0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgaHR0cFBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5odHRwUG9zdCh1cmwsIGRhdGEpO1xuICAgICAgfSxcbiAgICAgIG5ld0RlZmVycmVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIH0sXG4gICAgICBuZXdQcm9taXNlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBhbGw6IGZ1bmN0aW9uKHByb21pc2VzKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmFsbChwcm9taXNlcyk7XG4gICAgICB9LFxuICAgICAgZmNhbGw6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZmNhbGwoZnVuYyk7XG4gICAgICB9LFxuICAgICAgdGltZW91dDogZnVuY3Rpb24oZnVuYywgbXMpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMudGltZW91dChmdW5jLG1zKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxUaW1lb3V0OiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmNhbmNlbFRpbWVvdXQocHJvbWlzZSk7XG4gICAgICB9LFxuICAgICAgZ2V0SG9tZURpcmVjdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmdldEhvbWVEaXJlY3RvcnkoKTtcbiAgICAgIH0sXG4gICAgICBzYXZlRmlsZTogZnVuY3Rpb24ocGF0aCwgY29udGVudEFzSnNvbiwgb3ZlcndyaXRlKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnNhdmVGaWxlKHBhdGgsIGNvbnRlbnRBc0pzb24sIG92ZXJ3cml0ZSk7XG4gICAgICB9LFxuICAgICAgbG9hZEZpbGU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZEZpbGUocGF0aCk7XG4gICAgICB9LFxuXG4gICAgICAvLyB1dGlscyAoYmtDb3JlKVxuICAgICAgc2V0Tm90ZWJvb2tJbXBvcnRlcjogZnVuY3Rpb24oZm9ybWF0LCBpbXBvcnRlcikge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zZXROb3RlYm9va0ltcG9ydGVyKGZvcm1hdCwgaW1wb3J0ZXIpO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVMb2FkZXI6IGZ1bmN0aW9uKHVyaVR5cGUsIGZpbGVMb2FkZXIpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2V0RmlsZUxvYWRlcih1cmlUeXBlLCBmaWxlTG9hZGVyKTtcbiAgICAgIH0sXG4gICAgICBzZXRGaWxlU2F2ZXI6IGZ1bmN0aW9uKHVyaVR5cGUsIGZpbGVTYXZlcikge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zZXRGaWxlU2F2ZXIodXJpVHlwZSwgZmlsZVNhdmVyKTtcbiAgICAgIH0sXG4gICAgICBzaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd0RlZmF1bHRTYXZpbmdGaWxlQ2hvb3NlcigpO1xuICAgICAgfSxcbiAgICAgIGdldFJlY2VudE1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldFJlY2VudE1lbnVJdGVtcygpO1xuICAgICAgfSxcbiAgICAgIHNob3dNb2RhbERpYWxvZzogZnVuY3Rpb24oY2FsbGJhY2ssIHRlbXBsYXRlLCBzdHJhdGVneSkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93TW9kYWxEaWFsb2coY2FsbGJhY2ssIHRlbXBsYXRlLCBzdHJhdGVneSkucmVzdWx0O1xuICAgICAgfSxcbiAgICAgIHNob3cxQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKG1zZ0JvZHksIG1zZ0hlYWRlciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvdzFCdXR0b25Nb2RhbChtc2dCb2R5LCBtc2dIZWFkZXIsIGNhbGxiYWNrKTtcbiAgICAgIH0sXG4gICAgICBzaG93MkJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIsIG9rQ0IsIGNhbmNlbENCLCBva0J0blR4dCwgY2FuY2VsQnRuVHh0KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3cyQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICBtc2dCb2R5LCBtc2dIZWFkZXIsIG9rQ0IsIGNhbmNlbENCLCBva0J0blR4dCwgY2FuY2VsQnRuVHh0KTtcbiAgICAgIH0sXG4gICAgICBzaG93M0J1dHRvbk1vZGFsOiBmdW5jdGlvbihcbiAgICAgICAgICBtc2dCb2R5LCBtc2dIZWFkZXIsIHllc0NCLCBub0NCLCBjYW5jZWxDQiwgeWVzQnRuVHh0LCBub0J0blR4dCwgY2FuY2VsQnRuVHh0KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3czQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICBtc2dCb2R5LCBtc2dIZWFkZXIsIHllc0NCLCBub0NCLCBjYW5jZWxDQiwgeWVzQnRuVHh0LCBub0J0blR4dCwgY2FuY2VsQnRuVHh0KTtcbiAgICAgIH0sXG4gICAgICBnZXRGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICB9LFxuICAgICAgc2VsZWN0RmlsZTogZnVuY3Rpb24oY2FsbGJhY2ssIHRpdGxlLCBleHRlbnNpb24sIGNsb3NlYnRuKSB7XG4gICAgICAgICAgdmFyIHN0cmF0ZWd5ID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneSgpO1xuICAgICAgICAgIHN0cmF0ZWd5LnRyZWVWaWV3ZnMuZXh0RmlsdGVyID0gWyBleHRlbnNpb24gXTtcbiAgICAgICAgICBzdHJhdGVneS5leHQgPSBleHRlbnNpb247XG4gICAgICAgICAgc3RyYXRlZ3kudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgICBzdHJhdGVneS5jbG9zZWJ0biA9IGNsb3NlYnRuO1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLmdldEhvbWVEaXJlY3RvcnkoKS50aGVuKFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oaG9tZURpcikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dNb2RhbERpYWxvZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNUWyd0ZW1wbGF0ZS9vcGVubm90ZWJvb2snXSh7aG9tZWRpcjogaG9tZURpciwgZXh0ZW5zaW9uOiBleHRlbnNpb259KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmF0ZWd5KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgLy8gZXZhbCB1dGlsc1xuICAgICAgbG9jYXRlUGx1Z2luU2VydmljZTogZnVuY3Rpb24oaWQsIGxvY2F0b3IpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L3BsdWdpbi1zZXJ2aWNlcy9cIiArIGlkKSwgbG9jYXRvcik7XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yRmFjdG9yeTogZnVuY3Rpb24oc2hlbGxDb25zdHJ1Y3RvclByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHNoZWxsQ29uc3RydWN0b3JQcm9taXNlLnRoZW4oZnVuY3Rpb24oU2hlbGwpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihzZXR0aW5ncykge1xuICAgICAgICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKG5ldyBTaGVsbChzZXR0aW5ncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNob3dMYW5ndWFnZU1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93TGFuZ3VhZ2VNYW5hZ2VyKCk7XG4gICAgICB9LFxuXG4gICAgICAvLyBvdGhlciBKUyB1dGlsc1xuICAgICAgdXBkYXRlRG9jdW1lbnRNb2RlbEZyb21ET006IGZ1bmN0aW9uKGlkKSB7XG5cdCAgZnVuY3Rpb24gY29udmVydENhbnZhc1RvSW1hZ2UoZWxlbSkge1xuXHQgICAgICBpZiAoZWxlbS5ub2RlTmFtZSA9PSBcIkNBTlZBU1wiKSB7XG5cdFx0ICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHQgIGltZy5zcmMgPSBlbGVtLnRvRGF0YVVSTCgpO1xuXHRcdCAgcmV0dXJuIGltZztcblx0ICAgICAgfVxuXHQgICAgICB2YXIgY2hpbGROb2RlcyA9IGVsZW0uY2hpbGROb2Rlcztcblx0ICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ICB2YXIgcmVzdWx0ID0gY29udmVydENhbnZhc1RvSW1hZ2UoY2hpbGROb2Rlc1tpXSk7XG5cdFx0ICBpZiAocmVzdWx0ICE9IGNoaWxkTm9kZXNbaV0pIHtcblx0XHQgICAgICBlbGVtLnJlcGxhY2VDaGlsZChyZXN1bHQsIGNoaWxkTm9kZXNbaV0pO1xuXHRcdCAgfVxuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBlbGVtO1xuXHQgIH1cbiAgICAgICAgICAvLyAxKSBmaW5kIHRoZSBjZWxsIHRoYXQgY29udGFpbnMgZWxlbVxuICAgICAgICAgIHZhciBlbGVtID0gJChcIiNcIiArIGlkKS5jbG9zZXN0KFwiYmstY2VsbFwiKTtcbiAgICAgICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkIHx8IGVsZW1bMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogY2Fubm90IGZpbmQgYW4gSHRtbCBjZWxsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgJ1wiICsgaWQgKyBcIicuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2VsbGlkID0gZWxlbVswXS5nZXRBdHRyaWJ1dGUoXCJjZWxsaWRcIik7XG4gICAgICAgICAgaWYgKGNlbGxpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBib2R5ID0gZWxlbS5maW5kKCBcImJrLW91dHB1dC1kaXNwbGF5W3R5cGU9J0h0bWwnXSBkaXYgZGl2XCIgKTtcbiAgICAgICAgICBpZiAoYm9keSA9PT0gdW5kZWZpbmVkIHx8IGJvZHlbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogY2Fubm90IGZpbmQgYW4gSHRtbCBjZWxsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgJ1wiICsgaWQgKyBcIicuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblx0ICAvLyAyLjUpIHNlYXJjaCBmb3IgYW55IGNhbnZhcyBlbGVtZW50cyBpbiBib2R5IGFuZCByZXBsYWNlIGVhY2ggd2l0aCBhbiBpbWFnZS5cblx0ICBib2R5ID0gY29udmVydENhbnZhc1RvSW1hZ2UoYm9keVswXSk7XG5cbiAgICAgICAgICAvLyAyKSBjb252ZXJ0IHRoYXQgcGFydCBvZiB0aGUgRE9NIHRvIGEgc3RyaW5nXG4gICAgICAgICAgdmFyIG5ld091dHB1dCA9IGJvZHkuaW5uZXJIVE1MO1xuXG4gICAgICAgICAgLy8gMykgc2V0IHRoZSByZXN1bHQub2JqZWN0IHRvIHRoYXQgc3RyaW5nLlxuICAgICAgICAgIHZhciBjZWxsID0gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0NlbGxNYW5hZ2VyKCkuZ2V0Q2VsbChjZWxsaWQpO1xuICAgICAgICAgIGlmIChjZWxsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFuIEh0bWwgY2VsbCBjb250YWluaW5nIHRoZSBlbGVtZW50ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVzID0gY2VsbC5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgIGlmIChyZXMuaW5uZXJ0eXBlID09PSBcIkh0bWxcIikge1xuICAgICAgICAgICAgcmVzLm9iamVjdCA9IG5ld091dHB1dDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogY2Fubm90IGZpbmQgYW4gSHRtbCBjZWxsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgJ1wiICsgaWQgKyBcIicuXCIpO1xuICAgICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIGJrU2hhcmVcbiAgICAgIHNoYXJlOiBia1NoYXJlLFxuXG4gICAgICAvLyBsYW5ndWFnZSBwbHVnaW4gdXRpbGl0aWVzXG5cbiAgICAgIHNldHVwUHJvZ3Jlc3NPdXRwdXQ6IGZ1bmN0aW9uKG1vZGVsT3V0cHV0KSB7XG4gICAgICAgIHZhciBwcm9ncmVzc09iaiA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwiQmVha2VyRGlzcGxheVwiLFxuICAgICAgICAgICAgaW5uZXJ0eXBlOiBcIlByb2dyZXNzXCIsXG4gICAgICAgICAgICBvYmplY3Q6IHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJzdWJtaXR0aW5nIC4uLlwiLFxuICAgICAgICAgICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICBvdXRwdXRkYXRhOiBbXSxcbiAgICAgICAgICAgICAgcGF5bG9hZDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSBwcm9ncmVzc09iajtcbiAgICAgIH0sXG5cbiAgICAgIHNldHVwQ2FuY2VsbGluZ091dHB1dDogZnVuY3Rpb24obW9kZWxPdXRwdXQpIHtcbiAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC50eXBlICE9PSBcIkJlYWtlckRpc3BsYXlcIiB8fCBtb2RlbE91dHB1dC5yZXN1bHQuaW5uZXJ0eXBlICE9PSBcIlByb2dyZXNzXCIpXG4gICAgICAgICAgc2V0dXBQcm9ncmVzc091dHB1dChtb2RlbE91dHB1dCk7XG4gICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QubWVzc2FnZSA9IFwiY2FuY2VsbGluZyAuLi5cIjtcbiAgICAgIH0sXG5cbiAgICAgIHJlY2VpdmVFdmFsdWF0aW9uVXBkYXRlOiBmdW5jdGlvbihtb2RlbE91dHB1dCwgZXZhbHVhdGlvbiwgcGx1Z2luTmFtZSwgc2hlbGxJZCkge1xuICAgICAgICB2YXIgbWF4TnVtT2ZMaW5lcyA9IDIwMDtcblxuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0LnN0YXR1cyA9IGV2YWx1YXRpb24uc3RhdHVzO1xuXG4gICAgICAgIC8vIHNhdmUgaW5mb3JtYXRpb24gdG8gaGFuZGxlIHVwZGF0YWJsZSByZXN1bHRzIGluIGRpc3BsYXlzXG4gICAgICAgIG1vZGVsT3V0cHV0LnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lO1xuICAgICAgICBtb2RlbE91dHB1dC5zaGVsbElkID0gc2hlbGxJZDtcblxuICAgICAgICAvLyBhcHBlbmQgdGV4dCBvdXRwdXQgKGlmIGFueSlcbiAgICAgICAgaWYgKGV2YWx1YXRpb24ub3V0cHV0ZGF0YSAhPT0gdW5kZWZpbmVkICYmIGV2YWx1YXRpb24ub3V0cHV0ZGF0YS5sZW5ndGg+MCkge1xuICAgICAgICAgIHZhciBpZHg7XG4gICAgICAgICAgZm9yIChpZHg9MDsgaWR4PGV2YWx1YXRpb24ub3V0cHV0ZGF0YS5sZW5ndGg+MDsgaWR4KyspIHtcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5wdXNoKGV2YWx1YXRpb24ub3V0cHV0ZGF0YVtpZHhdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGNudCA9IDA7XG4gICAgICAgICAgZm9yIChpZHg9MDsgaWR4PG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBjbnQgKz0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhW2lkeF0udmFsdWUuc3BsaXQoL1xcbi8pLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNudCA+IG1heE51bU9mTGluZXMpIHtcbiAgICAgICAgICAgIGNudCAtPSBtYXhOdW1PZkxpbmVzO1xuICAgICAgICAgICAgd2hpbGUoY250ID4gMCkge1xuICAgICAgICAgICAgICB2YXIgbCA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YVswXS52YWx1ZS5zcGxpdCgvXFxuLykubGVuZ3RoO1xuICAgICAgICAgICAgICBpZiAobDw9Y250KSB7XG4gICAgICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLnNwbGljZSgwLDEpO1xuICAgICAgICAgICAgICAgIGNudCAtPSBsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhWzBdLnZhbHVlLnNwbGl0KC9cXG4vKTtcbiAgICAgICAgICAgICAgICBhLnNwbGljZSgwLGNudCk7XG4gICAgICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhWzBdLnZhbHVlID0gYS5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgICAgICBjbnQgPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOSU5HOiB0aGlzIHNob3VsZCBub3QgaGFwcGVuIC0geW91ciBwbHVnaW4gamF2YXNjcmlwdCBpcyBicm9rZW4hXCIpO1xuICAgICAgICAgIHNldHVwUHJvZ3Jlc3NPdXRwdXQobW9kZWxPdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHVwZGF0ZSBwYXlsb2FkIChpZiBuZWVkZWQpXG4gICAgICAgIGlmIChldmFsdWF0aW9uLnBheWxvYWQgIT09IHVuZGVmaW5lZCAmJiBtb2RlbE91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPSBldmFsdWF0aW9uLnBheWxvYWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkID0geyB0eXBlIDogXCJSZXN1bHRzXCIsIG91dHB1dGRhdGEgOiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEsIHBheWxvYWQgOiB1bmRlZmluZWQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC50eXBlID09PSBcIlJlc3VsdHNcIikge1xuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLm91dHB1dGRhdGEgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGE7XG4gICAgICAgICAgfSBlbHNlIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkID0geyB0eXBlIDogXCJSZXN1bHRzXCIsIG91dHB1dGRhdGEgOiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEsIHBheWxvYWQgOiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRklOSVNIRURcIikge1xuICAgICAgICAgIGlmIChldmFsdWF0aW9uLnBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC50eXBlID09PSBcIlJlc3VsdHNcIilcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnBheWxvYWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGV2YWx1YXRpb24ucGF5bG9hZCA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbW9kZWxPdXRwdXQuZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Quc3RhcnRUaW1lO1xuXG4gICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIHNpbmdsZSBvdXRwdXQgZGlzcGxheVxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0ID0gZXZhbHVhdGlvbi5wYXlsb2FkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3cmFwcGVyIGRpc3BsYXkgd2l0aCBzdGFuZGFyZCBvdXRwdXQgYW5kIGVycm9yXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IGV2YWx1YXRpb24ucGF5bG9hZCB9O1xuICAgICAgICAgICAgLy8gYnVpbGQgb3V0cHV0IGNvbnRhaW5lclxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXZhbHVhdGlvbi5qc29ucmVzICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5kYXRhcmVzdWx0ID0gZXZhbHVhdGlvbi5qc29ucmVzO1xuICAgICAgICB9IGVsc2UgaWYgKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIkVSUk9SXCIpIHtcbiAgICAgICAgICBpZiAoZXZhbHVhdGlvbi5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgIT09IHVuZGVmaW5lZCAmJiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQudHlwZSA9PT0gXCJSZXN1bHRzXCIpXG4gICAgICAgICAgICAgIGV2YWx1YXRpb24ucGF5bG9hZCA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC5wYXlsb2FkO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBldmFsdWF0aW9uLnBheWxvYWQgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChldmFsdWF0aW9uLnBheWxvYWQgIT09IHVuZGVmaW5lZCAmJiAkLnR5cGUoZXZhbHVhdGlvbi5wYXlsb2FkKT09J3N0cmluZycpIHtcbiAgICAgICAgICAgIGV2YWx1YXRpb24ucGF5bG9hZCA9IGV2YWx1YXRpb24ucGF5bG9hZC5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vZGVsT3V0cHV0LmVsYXBzZWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnN0YXJ0VGltZTtcblxuICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBzaW5nbGUgb3V0cHV0IGRpc3BsYXlcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgICAgICAgIGlubmVydHlwZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICBvYmplY3Q6IGV2YWx1YXRpb24ucGF5bG9hZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd3JhcHBlciBkaXNwbGF5IHdpdGggc3RhbmRhcmQgb3V0cHV0IGFuZCBlcnJvclxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0ID0geyB0eXBlIDogXCJSZXN1bHRzXCIsIG91dHB1dGRhdGEgOiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEsIHBheWxvYWQgOiB7IHR5cGU6IFwiQmVha2VyRGlzcGxheVwiLCBpbm5lcnR5cGU6IFwiRXJyb3JcIiwgb2JqZWN0OiBldmFsdWF0aW9uLnBheWxvYWQgfSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmFsdWF0aW9uLnN0YXR1cyA9PT0gXCJSVU5OSU5HXCIpIHtcbiAgICAgICAgICBpZiAoZXZhbHVhdGlvbi5tZXNzYWdlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgICAgID0gXCJydW5uaW5nLi4uXCI7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5tZXNzYWdlICAgICA9IGV2YWx1YXRpb24ubWVzc2FnZTtcbiAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnByb2dyZXNzQmFyICAgPSBldmFsdWF0aW9uLnByb2dyZXNzQmFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChldmFsdWF0aW9uLnN0YXR1cyA9PT0gXCJGSU5JU0hFRFwiIHx8IGV2YWx1YXRpb24uc3RhdHVzID09PSBcIkVSUk9SXCIpO1xuICAgICAgfSxcbiAgICAgIGdldFVwZGF0ZVNlcnZpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29tZXRkVXRpbCA9IHtcbiAgICAgICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnM6IHsgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKHBsdWdpbk5hbWUsIHNlcnZpY2VCYXNlKSB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkID0gbmV3ICQuQ29tZXRkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQuaW5pdChia1V0aWxzLnNlcnZlclVybChzZXJ2aWNlQmFzZSArIFwiL2NvbWV0ZC9cIikpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGxpc3RlbmVyID0gdGhpcy5jb21ldGQuYWRkTGlzdGVuZXIoJy9tZXRhL2hhbmRzaGFrZScsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYmtEZWJ1ZykgY29uc29sZS5sb2cocGx1Z2luTmFtZSsnL21ldGEvaGFuZHNoYWtlJyk7XG4gICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5zdWNjZXNzZnVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLmJhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBrO1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAoayBpbiBPYmplY3Qua2V5cyh0aGlzLnN1YnNjcmlwdGlvbnMpKVxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1trXSA9IHRoaXMuY29tZXRkLnJlc3Vic2NyaWJlKHRoaXMuc3Vic2NyaXB0aW9uc1trXSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLnJlbW92ZUxpc3RlbmVyKHRoaXMuaGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB2YXIgaztcbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4gT2JqZWN0LmtleXModGhpcy5zdWJzY3JpcHRpb25zKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC51bnN1YnNjcmliZSh0aGlzLnN1YnNjcmlwdGlvbnNba10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5jb21ldGQgPSBudWxsO1xuICAgICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSB7IH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbih1cGRhdGVfaWQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIGlmICghdXBkYXRlX2lkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5ia0RlYnVnKSBjb25zb2xlLmxvZygnc3Vic2NyaWJlIHRvICcrdXBkYXRlX2lkKTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQudW5zdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgY2IgPSBmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXQuZGF0YSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHZhciBzID0gdGhpcy5jb21ldGQuc3Vic2NyaWJlKCcvb2JqZWN0X3VwZGF0ZS8nICsgdXBkYXRlX2lkLCBjYik7XG4gICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdID0gcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24odXBkYXRlX2lkKSB7XG4gICAgICAgICAgICAgIGlmICghdXBkYXRlX2lkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5ia0RlYnVnKSBjb25zb2xlLmxvZygndW5zdWJzY3JpYmUgZnJvbSAnK3VwZGF0ZV9pZCk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLnVuc3Vic2NyaWJlKHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc3N1YnNjcmliZWQ6IGZ1bmN0aW9uKHVwZGF0ZV9pZCkge1xuICAgICAgICAgICAgICBpZiAoIXVwZGF0ZV9pZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSAhPT0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBia0hlbHBlcjtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5tZW51UGx1Z2luTWFuYWdlcicsIFsnYmsudXRpbHMnXSk7XG5cbiAgdmFyIHV0aWxzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBERUZBVUxUX1BSSU9SSVRZID0gMDtcbiAgICAvLyBhZGQgbmV3SXRlbSB0byBpdGVtc0xpc3QsIGlmIGFuIGl0ZW0gd2l0aCBzYW1lIG5hbWUgYWxyZWFkeSBleGlzdHMgaW4gaXRlbXNMaXN0LFxuICAgIC8vIGNvbXBhcmUgcHJpb3JpdGllcywgaWYgbmV3SXRlbS5wcmlvcml0eSA+IGV4aXN0aW5nSXRlbS5wcmlvcml0eSwgbmV3SXRlbSB3aWxsXG4gICAgLy8gcmVwbGFjZSB0aGUgZXhpc3RpbmdJdGVtIGluIHBsYWNlLlxuICAgIHZhciBhZGRNZW51SXRlbSA9IGZ1bmN0aW9uKGl0ZW1zTGlzdCwgbmV3SXRlbSkge1xuICAgICAgLy8gY2hlY2sgaWYgYW4gZW50cnkgd2l0aCBzYW1lIG5hbWUgYWxyZWFkeSBleGlzdFxuICAgICAgdmFyIGV4aXN0aW5nSXRlbSA9IF8oaXRlbXNMaXN0KS5maW5kKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgIHJldHVybiBpdC5uYW1lID09PSBuZXdJdGVtLm5hbWU7XG4gICAgICB9KTtcbiAgICAgIGlmIChleGlzdGluZ0l0ZW0pIHtcbiAgICAgICAgZXhpc3RpbmdJdGVtLnByaW9yaXR5ID0gZXhpc3RpbmdJdGVtLnByaW9yaXR5ID8gZXhpc3RpbmdJdGVtLnByaW9yaXR5IDogREVGQVVMVF9QUklPUklUWTtcbiAgICAgICAgbmV3SXRlbS5wcmlvcml0eSA9IG5ld0l0ZW0ucHJpb3JpdHkgPyBuZXdJdGVtLnByaW9yaXR5IDogREVGQVVMVF9QUklPUklUWTtcbiAgICAgICAgaWYgKG5ld0l0ZW0ucHJpb3JpdHkgPj0gZXhpc3RpbmdJdGVtLnByaW9yaXR5KSB7XG4gICAgICAgICAgLy8gcmVwbGFjZSBpbiBwbGFjZVxuICAgICAgICAgIGl0ZW1zTGlzdC5zcGxpY2UoaXRlbXNMaXN0LmluZGV4T2YoZXhpc3RpbmdJdGVtKSwgMSwgbmV3SXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWdub3JlIGFuZCB3YXJuXG4gICAgICAgICAgY29uc29sZS53YXJuKFwiaWdub3JpbmcgbWVudSBpdGVtIFwiICsgbmV3SXRlbS5uYW1lICsgXCJiZWNhdXNlIHByaW9yaXR5PVwiXG4gICAgICAgICAgICAgICsgbmV3SXRlbS5wcmlvcml0eSArIFwiaXMgc21hbGxlciB0aGFuIGV4aXN0aW5nIChcIiArIGV4aXN0aW5nSXRlbS5wcmlvcml0eSArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbXNMaXN0ID0gaXRlbXNMaXN0LnB1c2gobmV3SXRlbSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkTWVudUl0ZW1zOiBmdW5jdGlvbiAocGFyZW50TWVudSwgaXRlbXMpIHtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtcykpIHtcbiAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zID0gaXRlbXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgYWRkTWVudUl0ZW0ocGFyZW50TWVudS5pdGVtcywgaXRlbSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia01lbnVQbHVnaW5NYW5hZ2VyJywgZnVuY3Rpb24oYmtVdGlscykge1xuXG4gICAgdmFyIG1lbnVzID0ge307XG4gICAgdmFyIGxvYWRlZFBsdWdpbnMgPSBbXTtcbiAgICB2YXIgbG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzID0gW107XG4gICAgdmFyIHBsdWdpbkluZGV4ID0gMDtcblxuICAgIHZhciBhZGRQbHVnaW4gPSBmdW5jdGlvbihwbHVnaW4sIHBsdWdpbkluZGV4LCBzZWNvbmRhcnlJbmRleCkge1xuICAgICAgaWYgKCFwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGFyZW50TWVudSA9IF8uZmluZChfLnZhbHVlcyhtZW51cyksIGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgIHJldHVybiBpdC5uYW1lID09PSBwbHVnaW4ucGFyZW50O1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghcGFyZW50TWVudSkge1xuICAgICAgICBwYXJlbnRNZW51ID0ge1xuICAgICAgICAgIG5hbWU6IHBsdWdpbi5wYXJlbnQsXG4gICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgIGluZGV4OiBwbHVnaW5JbmRleCxcbiAgICAgICAgICBzZWNvbmRhcnlJbmRleDogc2Vjb25kYXJ5SW5kZXgsXG4gICAgICAgICAgc29ydG9yZGVyOiBwbHVnaW4uc29ydG9yZGVyLFxuICAgICAgICAgIGNsYXNzTmFtZXM6IHBsdWdpbi5pZFxuICAgICAgICB9O1xuICAgICAgICBtZW51c1twbHVnaW5JbmRleCArICdfJyArIHNlY29uZGFyeUluZGV4ICsgJ18nICsgcGFyZW50TWVudS5uYW1lXSA9IHBhcmVudE1lbnU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocGx1Z2luSW5kZXggPCBwYXJlbnRNZW51LmluZGV4XG4gICAgICAgICAgICB8fCAocGx1Z2luSW5kZXggPT09IHBhcmVudE1lbnUuaW5kZXggJiYgc2Vjb25kYXJ5SW5kZXggPCBwYXJlbnRNZW51LnNlY29uZGFyeUluZGV4KSkge1xuICAgICAgICAgIGRlbGV0ZSBtZW51c1twYXJlbnRNZW51LmluZGV4ICsgJ18nICsgcGFyZW50TWVudS5zZWNvbmRhcnlJbmRleCArICdfJyArIHBhcmVudE1lbnUubmFtZV07XG4gICAgICAgICAgbWVudXNbcGx1Z2luSW5kZXggKyAnXycgKyBzZWNvbmRhcnlJbmRleCArICdfJyArIHBhcmVudE1lbnUubmFtZV0gPSBwYXJlbnRNZW51O1xuICAgICAgICAgIHBhcmVudE1lbnUuaW5kZXggPSBwbHVnaW5JbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXBsdWdpbi5zdWJtZW51KSB7XG4gICAgICAgIHV0aWxzLmFkZE1lbnVJdGVtcyhwYXJlbnRNZW51LCBwbHVnaW4uaXRlbXMpO1xuICAgICAgICBpZiAoISBfLmlzRnVuY3Rpb24ocGFyZW50TWVudS5pdGVtcykpIHtcbiAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgICBpZiAoYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCAmJiBiLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhLnNvcnRvcmRlcj5iLnNvcnRvcmRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc3ViTWVudSA9IF8uZmluZChwYXJlbnRNZW51Lml0ZW1zLCBmdW5jdGlvbihpdCkge1xuICAgICAgICAgIHJldHVybiBpdC5uYW1lID09PSBwbHVnaW4uc3VibWVudTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc3ViTWVudSkge1xuICAgICAgICAgIHN1Yk1lbnUgPSB7XG4gICAgICAgICAgICBuYW1lOiBwbHVnaW4uc3VibWVudSxcbiAgICAgICAgICAgIHR5cGU6IFwic3VibWVudVwiLFxuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgc29ydG9yZGVyOiBwbHVnaW4uc3VibWVudXNvcnRvcmRlclxuICAgICAgICAgIH07XG4gICAgICAgICAgcGFyZW50TWVudS5pdGVtcy5wdXNoKHN1Yk1lbnUpO1xuICAgICAgICAgIGlmICghIF8uaXNGdW5jdGlvbihwYXJlbnRNZW51Lml0ZW1zKSkge1xuICAgICAgICAgICAgcGFyZW50TWVudS5pdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgICAgICBpZiAoYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCAmJiBiLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyPmIuc29ydG9yZGVyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1Yk1lbnUuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICBzdWJNZW51LnR5cGUgPSBcInN1Ym1lbnVcIjtcbiAgICAgICAgICBpZiAoIXN1Yk1lbnUuaXRlbXMpIHtcbiAgICAgICAgICAgIHN1Yk1lbnUuaXRlbXMgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXRpbHMuYWRkTWVudUl0ZW1zKHN1Yk1lbnUsIHBsdWdpbi5pdGVtcyk7XG4gICAgICAgIGlmICghIF8uaXNGdW5jdGlvbihzdWJNZW51Lml0ZW1zKSkge1xuICAgICAgICAgIHN1Yk1lbnUuaXRlbXMuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICAgIGlmIChhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkICYmIGIuc29ydG9yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyPmIuc29ydG9yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGdldExvYWRNZW51UGx1Z2luSm9iID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICB2YXIgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXRVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ2FuY2VsbGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY2FuY2VsbGVkO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGxvYWRQbHVnaW4gPSBmdW5jdGlvbihqb2IpIHtcbiAgICAgIHJldHVybiBia1V0aWxzLmxvYWRNb2R1bGUoam9iLmdldFVybCgpKS50aGVuKGZ1bmN0aW9uKG1lbnVQbHVnaW4pIHtcbiAgICAgICAgaWYgKGpvYi5pc0NhbmNlbGxlZCgpKSB7XG4gICAgICAgICAgdGhyb3cgXCJjYW5jZWxsZWRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVudVBsdWdpbi5nZXRNZW51SXRlbXMoKS50aGVuKGZ1bmN0aW9uKG1lbnVJdGVtcykge1xuICAgICAgICAgIGlmIChqb2IuaXNDYW5jZWxsZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgXCJjYW5jZWxsZWRcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1lbnVJdGVtcztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxvYWRNZW51UGx1Z2luOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGpvYiA9IGdldExvYWRNZW51UGx1Z2luSm9iKHVybCk7XG4gICAgICAgIHZhciBpbmRleCA9IHBsdWdpbkluZGV4Kys7XG4gICAgICAgIGxvYWRQbHVnaW4oam9iKS50aGVuKGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICAgIGxvYWRlZFBsdWdpbnMucHVzaCh7dXJsOiBqb2IuZ2V0VXJsKCl9KTtcbiAgICAgICAgICBpZiAoXy5pc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgICAgIF8ocGx1Z2luKS5lYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICAgIGFkZFBsdWdpbihpdGVtLCBpbmRleCwgaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkUGx1Z2luKHBsdWdpbiwgaW5kZXgsIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24ocmVqZWN0aW9uKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihyZWplY3Rpb24pO1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxvYWRpbmdJblByb2dyZXNzUGx1Z2luSm9icy5zcGxpY2UobG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzLmluZGV4T2Yoam9iKSwgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMucHVzaChqb2IpO1xuICAgICAgfSxcbiAgICAgIGF0dGFjaE1lbnVzOiBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gcGx1Z2luSW5kZXgrKztcbiAgICAgICAgaWYgKF8uaXNBcnJheShwbHVnaW4pKSB7XG4gICAgICAgICAgXyhwbHVnaW4pLmVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGFkZFBsdWdpbihpdGVtLCBpbmRleCwgaSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkUGx1Z2luKHBsdWdpbiwgaW5kZXgsIDApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0TWVudXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbWVudXM7XG4gICAgICB9LFxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBtZW51cyA9IHt9O1xuICAgICAgICBfKGxvYWRpbmdJblByb2dyZXNzUGx1Z2luSm9icykuZWFjaChmdW5jdGlvbihqb2IpIHtcbiAgICAgICAgICBqb2IuY2FuY2VsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwbHVnaW5JbmRleCA9IDA7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE1IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rUm91dGVyJywgWyduZ1JvdXRlJ10pO1xuXG4gIG1vZHVsZS5jb250cm9sbGVyKCdub3RlYm9va1JvdXRlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlLCAkcm91dGVQYXJhbXMpIHtcbiAgICB2YXIgc2Vzc2lvblJvdXRlUmVzb2x2ZSA9ICRyb3V0ZS5jdXJyZW50LiQkcm91dGUucmVzb2x2ZTtcblxuICAgICRzY29wZS5zZXNzaW9uSWQgPSAkcm91dGVQYXJhbXMuc2Vzc2lvbklkO1xuICAgICRzY29wZS5uZXdTZXNzaW9uID0gJHJvdXRlLmN1cnJlbnQubG9jYWxzLmlzTmV3U2Vzc2lvbjtcbiAgICAkc2NvcGUuaXNJbXBvcnQgPSAkcm91dGUuY3VycmVudC5sb2NhbHMuaXNJbXBvcnQ7XG4gICAgJHNjb3BlLmlzT3BlbiA9ICRyb3V0ZS5jdXJyZW50LmxvY2Fscy5pc09wZW47XG4gICAgJHNjb3BlLm5vdGVib29rID0gJHJvdXRlLmN1cnJlbnQubG9jYWxzLnRhcmdldDtcblxuICAgIGRlbGV0ZSBzZXNzaW9uUm91dGVSZXNvbHZlLmlzTmV3U2Vzc2lvbjtcbiAgICBkZWxldGUgc2Vzc2lvblJvdXRlUmVzb2x2ZS5pc0ltcG9ydDtcbiAgICBkZWxldGUgc2Vzc2lvblJvdXRlUmVzb2x2ZS5pc09wZW47XG4gICAgZGVsZXRlIHNlc3Npb25Sb3V0ZVJlc29sdmUudGFyZ2V0O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5tYWluQXBwXG4gKiBUaGlzIGlzIHRoZSBtYWluIG1vZHVsZSBmb3IgdGhlIGJlYWtlciBub3RlYm9vayBhcHBsaWNhdGlvbi4gVGhlIG1vZHVsZSBoYXMgYSBkaXJlY3RpdmUgdGhhdFxuICogaG9sZHMgdGhlIG1lbnUgYmFyIGFzIHdlbGwgYXMgdGhlIG5vdGVib29rIHZpZXcuXG4gKiBUaGUgbW9kdWxlIGFsc28gb3ducyB0aGUgY2VudHJhbGl6ZWQgY2VsbCBldmFsdWF0aW9uIGxvZ2ljLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5tYWluQXBwJywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25nUm91dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLnV0aWxzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5jb21tb25VaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuY29yZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuc2Vzc2lvbk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLm1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5jZWxsTWVudVBsdWdpbk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLm5vdGVib29rVmVyc2lvbk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmV2YWx1YXRvck1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmV2YWx1YXRlSm9iTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubm90ZWJvb2tSb3V0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLm5vdGVib29rJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG5cbiAgLyoqXG4gICAqIGJrQXBwXG4gICAqIC0gVGhpcyBpcyB0aGUgYmVha2VyIEFwcFxuICAgKiAtIG1lbnVzICsgcGx1Z2lucyArIG5vdGVib29rKG5vdGVib29rIG1vZGVsICsgZXZhbHVhdG9yKVxuICAgKi9cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtNYWluQXBwJywgZnVuY3Rpb24oXG4gICAgICAkcm91dGVQYXJhbXMsXG4gICAgICAkdGltZW91dCxcbiAgICAgICRzZXNzaW9uU3RvcmFnZSxcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLFxuICAgICAgJGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1widGVtcGxhdGUvbWFpbmFwcC9tYWluYXBwXCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBub3RlYm9vazogJz0nLFxuICAgICAgICBzZXNzaW9uSWQ6ICdAJyxcbiAgICAgICAgbmV3U2Vzc2lvbjogJ0AnLFxuICAgICAgICBpc0ltcG9ydDogJ0BpbXBvcnQnLFxuICAgICAgICBpc09wZW46ICdAb3BlbidcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gbWVzc2FnZTtcbiAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdXBkYXRlTG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0TG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmxvYWRpbmdtc2c7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5sb2FkaW5nbXNnID09PSBtZXNzYWdlKSB7XG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZ21zZyA9IFwiXCI7XG4gICAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gbWVzc2FnZTtcbiAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgIGlmIChtZXNzYWdlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCRzY29wZS5sb2FkaW5nbXNnID09PSBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmdtc2cgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChub2RpZ2VzdCAhPT0gdHJ1ZSAmJiAhKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCwgMCwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGV2YWx1YXRvck1lbnVJdGVtcyA9IFtdO1xuXG4gICAgICAgIHZhciBhZGRFdmFsdWF0b3IgPSBmdW5jdGlvbihzZXR0aW5ncywgYWx3YXlzQ3JlYXRlTmV3RXZhbHVhdG9yKSB7XG4gICAgICAgICAgLy8gc2V0IHNoZWxsIGlkIHRvIG51bGwsIHNvIGl0IHdvbid0IHRyeSB0byBmaW5kIGFuIGV4aXN0aW5nIHNoZWxsIHdpdGggdGhlIGlkXG4gICAgICAgICAgaWYgKGFsd2F5c0NyZWF0ZU5ld0V2YWx1YXRvcikge1xuICAgICAgICAgICAgc2V0dGluZ3Muc2hlbGxJRCA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5uZXdFdmFsdWF0b3Ioc2V0dGluZ3MpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShldmFsdWF0b3Iuc3BlYykpIHtcbiAgICAgICAgICAgICAgdmFyIGFjdGlvbkl0ZW1zID0gW107XG4gICAgICAgICAgICAgIF8oZXZhbHVhdG9yLnNwZWMpLmVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlID09PSBcImFjdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25JdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdmFsdWUubmFtZSA/IHZhbHVlLm5hbWUgOiB2YWx1ZS5hY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsdWF0b3IucGVyZm9ybShrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGFjdGlvbkl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBldmFsdWF0b3JNZW51SXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBldmFsdWF0b3IucGx1Z2luTmFtZSwgLy8gVE9ETywgdGhpcyBzaG91bGQgYmUgZXZhbHVhdG9yLnNldHRpbmdzLm5hbWVcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBhY3Rpb25JdGVtc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGxvYWROb3RlYm9vayA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYWRkU2Nyb2xsaW5nSGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVE9ETywgdGhlIGZvbGxvd2luZyBpcyBhIGhhY2sgdG8gYWRkcmVzcyB0aGUgaXNzdWUgdGhhdFxuICAgICAgICAgICAgLy8gc29tZWhvdyB0aGUgbm90ZWJvb2sgaXMgc2Nyb2xsZWQgdG8gdGhlIG1pZGRsZVxuICAgICAgICAgICAgLy8gdGhpcyBoYWNrIGxpc3RlbnMgdG8gdGhlICdzY3JvbGwnIGV2ZW50IGFuZCBzY3JvbGxzIGl0IHRvIHRoZSB0b3BcbiAgICAgICAgICAgIC8vIEEgYmV0dGVyIHNvbHV0aW9uIGlzIHRvIGRvIHRoaXMgd2hlbiBBbmd1bGFyIHN0b3BzIGZpcmluZyBhbmQgRE9NIHVwZGF0ZXMgZmluaXNoLlxuICAgICAgICAgICAgLy8gQSBldmVuIGV2ZW4gYmV0dGVyIHNvbHV0aW9uIGlzIHRoZSBzZXNzaW9uIGFjdHVhbGx5IHJlbWVtYmVycyB3aGVyZSB0aGUgc2Nyb2xsaW5nIHdhc1xuICAgICAgICAgICAgLy8gYW5kIHNjcm9sbCB0byB0aGVyZSBhbmQgaW4gdGhlIGNhc2Ugb2Ygc3RhcnRpbmcgYSBuZXcgc2Vzc2lvbiAoaS5lLiBsb2FkaW5nIGEgbm90ZWJvb2sgZnJvbSBmaWxlKVxuICAgICAgICAgICAgLy8gc2Nyb2xsIHRvIHRvcC5cbiAgICAgICAgICAgIC8vIEEgZXZlbiBiZXR0ZXIgc29sdXRpb24gd291bGQgYmUgdG8gZ2V0IHJpZCBvZiB0aGUgdW53YW50ZWQgc2Nyb2xsaW5nIGluIHRoZSBmaXJzdCBwbGFjZS5cbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uID0gZnVuY3Rpb24oXG4gICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCxcbiAgICAgICAgICAgICAgaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBub3RlYm9vayBoYXMgdG8gbG9hZCBwbHVnaW5zIGZyb20gYW4gZXh0ZXJuYWwgc291cmNlXG4gICAgICAgICAgICB2YXIgciA9IG5ldyBSZWdFeHAoJ14oPzpbYS16XSs6KT8vLycsICdpJyk7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoci50ZXN0KG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcGx1Z0xpc3QgPSBcIjx1bD5cIjtcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLnRlc3Qobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICBwbHVnTGlzdCArPSBcIjxsaT5cIitub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ucGx1Z2luO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBwbHVnTGlzdCArPSBcIjwvdWw+XCI7XG4gICAgICAgICAgICAgICAgICBwcm9tcHRJZkluc2VjdXJlKHBsdWdMaXN0KS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyIGFjY2VwdGVkIHJpc2suLi4gZG8gdGhlIGxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgZGVuaWVkIHJpc2suLi4gY2xlYXIgcGx1Z2lucyB3aXRoIGV4dGVybmFsIFVSTCBhbmQgZG8gdGhlIGxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyLnRlc3Qobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldLnBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW49XCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBubyB1bnNhZmUgb3BlcmF0aW9uIGRldGVjdGVkLi4uIGRvIHRoZSBsb2FkaW5nXG4gICAgICAgICAgICBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLCBpc0V4aXN0aW5nU2Vzc2lvbik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgcHJvbXB0SWZJbnNlY3VyZSA9IGZ1bmN0aW9uKHVybExpc3QpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIlRoaXMgbm90ZWJvb2sgaXMgYXNraW5nIHRvIGxvYWQgdGhlIGZvbGxvd2luZyBwbHVnaW5zIGZyb20gZXh0ZXJuYWwgc2VydmVyczo8YnIvPlwiICsgdXJsTGlzdCtcbiAgICAgICAgICAgICAgICBcIiA8YnIvPkhvdyBkbyB5b3Ugd2FudCB0byBoYW5kbGUgdGhlc2UgZXh0ZXJuYWwgcGx1Z2lucz9cIixcbiAgICAgICAgICAgICAgICBcIldhcm5pbmc6IGV4dGVybmFsIHBsdWdpbnMgZGV0ZWN0ZWRcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgXCJEaXNhYmxlXCIsIFwiTG9hZFwiLCBcIlwiLCBcImJ0bi1kYW5nZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24gPSBmdW5jdGlvbihcbiAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLFxuICAgICAgICAgICAgICBpc0V4aXN0aW5nU2Vzc2lvbikge1xuXG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJMb2FkaW5nIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBhZGRTY3JvbGxpbmdIYWNrKCk7XG4gICAgICAgICAgICBpc0V4aXN0aW5nU2Vzc2lvbiA9ICEhaXNFeGlzdGluZ1Nlc3Npb247XG4gICAgICAgICAgICBldmFsdWF0b3JNZW51SXRlbXMuc3BsaWNlKDAsIGV2YWx1YXRvck1lbnVJdGVtcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBIQUNLIHRvIGZpeCBvbGRlciB2ZXJzaW9uIG9mIGV2YWx1YXRvciBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmNlbGxzICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuY2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwuY2VsbHNbaV0uZXZhbHVhdG9yID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5wbHVnaW47XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiSHRtbFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkh0bWxcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJMYXRleFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkxhdGV4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiSmF2YVNjcmlwdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJHcm9vdnlcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuY2VsbHNbaV0uZXZhbHVhdG9yID0gXCJHcm9vdnlcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobmFtZSA9PT0gXCJQeXRob25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBwbHVnaW47XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2YWx1YXRvck5hbWUgPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgZXZhbHVhdG9yUGx1Z2luID0gbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLnBsdWdpbjtcbiAgICAgICAgICAgICAgICBpZiAoYmtVdGlscy5iZWdpbnNXaXRoKGV2YWx1YXRvck5hbWUsXCJIdG1sXCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ubmFtZSA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLnBsdWdpbiA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgoZXZhbHVhdG9yTmFtZSxcIkxhdGV4XCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ubmFtZSA9IFwiTGF0ZXhcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5wbHVnaW4gPSBcIkxhdGV4XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChldmFsdWF0b3JOYW1lLFwiSmF2YVNjcmlwdFwiKSkge1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLm5hbWUgPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5wbHVnaW4gPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKGV2YWx1YXRvck5hbWUsXCJHcm9vdnlcIikpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5uYW1lID0gXCJHcm9vdnlcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5wbHVnaW4gPSBcIkdyb292eVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihldmFsdWF0b3JOYW1lPT09IFwiUHl0aG9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5uYW1lID0gZXZhbHVhdG9yUGx1Z2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSEFDSyBFTkRcblxuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAoKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHNlc3Npb25JZCA9IGJrU2Vzc2lvbk1hbmFnZXIuc2V0U2Vzc2lvbklkKHNlc3Npb25JZCk7XG5cbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0dXAoXG4gICAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsXG4gICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQpO1xuXG4gICAgICAgICAgICB2YXIgbXVzdHdhaXQ7XG4gICAgICAgICAgICBpZiAoIWlzRXhpc3RpbmdTZXNzaW9uICYmIGJrSGVscGVyLmhhc0NvZGVDZWxsKFwiaW5pdGlhbGl6YXRpb25cIikpIHtcbiAgICAgICAgICAgICAgbXVzdHdhaXQgPSBia0NvcmVNYW5hZ2VyLnNob3cwQnV0dG9uTW9kYWwoXCJUaGlzIG5vdGVib29rIGhhcyBpbml0aWFsaXphdGlvbiBjZWxscy4uLiB3YWl0aW5nIGZvciB0aGVpciBjb21wbGV0aW9uLlwiLCBcIlBsZWFzZSBXYWl0XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHVzZWQgdG8gbG9hZCBldmFsdWF0b3JzIGJlZm9yZSByZW5kZXJpbmcgdGhlIHBhZ2VcbiAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZXMgPSBfKG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykubWFwKGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZEV2YWx1YXRvcihldiwgIWlzRXhpc3RpbmdTZXNzaW9uKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJrVXRpbHMuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgIGJrVXRpbHMubG9nKFwib3BlblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHVyaTogbm90ZWJvb2tVcmksXG4gICAgICAgICAgICAgICAgICAgIHVyaVR5cGU6IHVyaVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICBtYXhDZWxsTGV2ZWw6IF8obm90ZWJvb2tNb2RlbC5jZWxscykubWF4KGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC5sZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgfSkubGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb3VudDogbm90ZWJvb2tNb2RlbC5jZWxscy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZVJvb3QoXCJpbml0aWFsaXphdGlvblwiKS50aGVuKGZ1bmN0aW9uICgpIHsgaWYobXVzdHdhaXQgIT09IHVuZGVmaW5lZCkgbXVzdHdhaXQuY2xvc2UoKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJMb2FkaW5nIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgYmtVdGlscy5sb2coXCJvcGVuXCIsIHtcbiAgICAgICAgICAgICAgICB1cmk6IG5vdGVib29rVXJpLFxuICAgICAgICAgICAgICAgIHVyaVR5cGU6IHVyaVR5cGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgICAgICAgICAgbWF4Q2VsbExldmVsOiBfKG5vdGVib29rTW9kZWwuY2VsbHMpLm1heChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC5sZXZlbDtcbiAgICAgICAgICAgICAgICB9KS5sZXZlbCxcbiAgICAgICAgICAgICAgICBjZWxsQ291bnQ6IG5vdGVib29rTW9kZWwuY2VsbHMubGVuZ3RoXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZVJvb3QoXCJpbml0aWFsaXphdGlvblwiKS50aGVuKGZ1bmN0aW9uICgpIHsgaWYobXVzdHdhaXQgIT09IHVuZGVmaW5lZCkgbXVzdHdhaXQuY2xvc2UoKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZShcIkxvYWRpbmcgbm90ZWJvb2tcIik7XG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wZW5Vcmk6IGZ1bmN0aW9uKHRhcmdldCwgc2Vzc2lvbklkLCByZXRyeSwgcmV0cnlDb3VudE1heCkge1xuICAgICAgICAgICAgICBpZiAoIXRhcmdldC51cmkpIHtcbiAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwoXCJGYWlsZWQgdG8gb3BlbiBub3RlYm9vaywgbm90ZWJvb2tVcmkgaXMgZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0dXNNZXNzYWdlKFwiT3BlbmluZyBVUklcIik7XG4gICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50TWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50TWF4ID0gMTAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSA9IGJrQ29yZU1hbmFnZXIuZ3Vlc3NVcmlUeXBlKHRhcmdldC51cmkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhcmdldC5yZWFkT25seSA9ICEhdGFyZ2V0LnJlYWRPbmx5O1xuICAgICAgICAgICAgICBpZiAoIXRhcmdldC5mb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZm9ybWF0ID0gYmtDb3JlTWFuYWdlci5ndWVzc0Zvcm1hdCh0YXJnZXQudXJpKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBpbXBvcnRlciA9IGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tJbXBvcnRlcih0YXJnZXQuZm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKCFpbXBvcnRlcikge1xuICAgICAgICAgICAgICAgIGlmIChyZXRyeSkge1xuICAgICAgICAgICAgICAgICAgLy8gcmV0cnksIHNvbWV0aW1lcyB0aGUgaW1wb3J0ZXIgY2FtZSBmcm9tIGEgcGx1Z2luIHRoYXQgaXMgYmVpbmcgbG9hZGVkXG4gICAgICAgICAgICAgICAgICByZXRyeUNvdW50TWF4IC09IDE7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsb2FkTm90ZWJvb2sub3BlblVyaSh0YXJnZXQsIHJldHJ5LCByZXRyeUNvdW50TWF4KTtcbiAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlKFwiT3BlbmluZyBVUklcIik7XG4gICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKFwiRmFpbGVkIHRvIG9wZW4gXCIgKyB0YXJnZXQudXJpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIiBiZWNhdXNlIGZvcm1hdCBcIiArIHRhcmdldC5mb3JtYXQgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiIHdhcyBub3QgcmVjb2duaXplZC5cIiwgXCJPcGVuIEZhaWxlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVMb2FkZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVMb2FkZXIodGFyZ2V0LnR5cGUpO1xuICAgICAgICAgICAgICAgIGZpbGVMb2FkZXIubG9hZCh0YXJnZXQudXJpKS50aGVuKGZ1bmN0aW9uKGZpbGVDb250ZW50QXNTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gaW1wb3J0ZXIuaW1wb3J0KGZpbGVDb250ZW50QXNTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnVyaSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgIGJrSGVscGVyLnNob3cxQnV0dG9uTW9kYWwoZGF0YSwgXCJPcGVuIEZhaWxlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJPcGVuaW5nIFVSSVwiKTtcbiAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tU2Vzc2lvbjogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbi5sb2FkKHNlc3Npb25JZCkudGhlbihmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gc2Vzc2lvbi5ub3RlYm9va1VyaTtcbiAgICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IHNlc3Npb24udXJpVHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSBzZXNzaW9uLnJlYWRPbmx5O1xuICAgICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBzZXNzaW9uLmZvcm1hdDtcbiAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9IGFuZ3VsYXIuZnJvbUpzb24oc2Vzc2lvbi5ub3RlYm9va01vZGVsSnNvbik7XG4gICAgICAgICAgICAgICAgdmFyIGVkaXRlZCA9IHNlc3Npb24uZWRpdGVkO1xuICAgICAgICAgICAgICAgIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsIHRydWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tSW1wb3J0OiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgdmFyIG5vdGVib29rID0gJHNlc3Npb25TdG9yYWdlLmltcG9ydGVkTm90ZWJvb2s7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciBpbXBvcnRlciA9IGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tJbXBvcnRlcignYmtyJyk7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gaW1wb3J0ZXIuaW1wb3J0KG5vdGVib29rKTtcbiAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rKTtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtcHR5Tm90ZWJvb2s6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9XG4gICAgICAgICAgICAgICAgJ3tcImJlYWtlclwiOiBcIjJcIiwgXCJldmFsdWF0b3JzXCI6IFt7XCJuYW1lXCI6IFwiSHRtbFwiLCBcInBsdWdpblwiOiBcIkh0bWxcIn0sJyArXG4gICAgICAgICAgICAgICAgJ3tcIm5hbWVcIjogXCJMYXRleFwiLCBcInBsdWdpblwiOiBcIkxhdGV4XCJ9LCcgK1xuICAgICAgICAgICAgICAgICd7XCJuYW1lXCI6IFwiSmF2YVNjcmlwdFwiLCBcInBsdWdpblwiOiBcIkphdmFTY3JpcHRcIn1dLCBcImNlbGxzXCI6IFtdfSc7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia05vdGVib29rVmVyc2lvbk1hbmFnZXIub3Blbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHROb3RlYm9vazogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIGJrVXRpbHMuZ2V0RGVmYXVsdE5vdGVib29rKCkudGhlbihmdW5jdGlvbihub3RlYm9va01vZGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyLm9wZW4obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgdmFyIGJrTm90ZWJvb2tXaWRnZXQ7XG4gICAgICAgICRzY29wZS5zZXRCa05vdGVib29rID0gZnVuY3Rpb24oYmtOb3RlYm9vaykge1xuICAgICAgICAgIGJrTm90ZWJvb2tXaWRnZXQgPSBia05vdGVib29rO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBfaW1wbCA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciBwcm9tcHRVcmlDaG9vc2VyID0gZnVuY3Rpb24odXJpVHlwZSwgaW5pdFVyaSkge1xuICAgICAgICAgICAgaWYgKCF1cmlUeXBlKSB7XG4gICAgICAgICAgICAgIHVyaVR5cGUgPSBcImZpbGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcih1cmlUeXBlKTtcbiAgICAgICAgICAgIGlmICghZmlsZVNhdmVyIHx8ICFmaWxlU2F2ZXIuc2hvd0ZpbGVDaG9vc2VyKSB7XG4gICAgICAgICAgICAgIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKFwiZmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbGVTYXZlci5zaG93RmlsZUNob29zZXIoaW5pdFVyaSkudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShyZXQudXJpKSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImNhbmNlbGxlZFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBwcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiRmlsZSBcIiArIHVyaSArIFwiIGV4aXN0cy4gT3ZlcndyaXRlP1wiLFxuICAgICAgICAgICAgICAgIFwiRmlsZSBleGlzdHNcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgXCJDYW5jZWxcIiwgXCJPdmVyd3JpdGVcIiwgXCJcIiwgXCJidG4tZGFuZ2VyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzYXZlQWx3YXlzT3ZlcndyaXRlID0gZnVuY3Rpb24odXJpLCB1cmlUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIodXJpVHlwZSk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCkubm90ZWJvb2tNb2RlbEFzU3RyaW5nO1xuICAgICAgICAgICAgICByZXR1cm4gZmlsZVNhdmVyLnNhdmUodXJpLCBjb250ZW50LCB0cnVlKTt9LCAxKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe3VyaTogdXJpLCB1cmlUeXBlOiB1cmlUeXBlfSk7XG4gICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgX3NhdmVQcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKGRlZmVycmVkLCB1cmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcih1cmlUeXBlKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZHVtcERpc3BsYXlTdGF0dXMoKTtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2F2ZURhdGEoKS5ub3RlYm9va01vZGVsQXNTdHJpbmc7XG4gICAgICAgICAgICAgIHJldHVybiBmaWxlU2F2ZXIuc2F2ZSh1cmksIGNvbnRlbnQpO1xuICAgICAgICAgICAgfSwgMSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7dXJpOiB1cmksIHVyaVR5cGU6IHVyaVR5cGV9KTsgLy8gZmlsZSBzYXZlIHN1Y2NlZWRcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJleGlzdHNcIikge1xuICAgICAgICAgICAgICAgIHByb21wdElmT3ZlcndyaXRlKHVyaSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzYXZlQWx3YXlzT3ZlcndyaXRlKHVyaSwgdXJpVHlwZSkudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXQpOyAvLyBmaWxlIHNhdmUgc3VjY2VlZFxuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pOyAvLyBmaWxlIHNhdmUgZmFpbGVkXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIF9zYXZlUHJvbXB0VXJpQ2hvb3NlcihkZWZlcnJlZCwgdXJpVHlwZSwgdXJpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZWFzb24gPT09IFwiaXNEaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzFCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgdXJpICsgXCIgaXMgYSBkaXJlY3RvcnkuIFBsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgbG9jYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJTYXZlIEZhaWxlZFwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3NhdmVQcm9tcHRVcmlDaG9vc2VyKGRlZmVycmVkLCB1cmlUeXBlLCB1cmkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVhc29uKTsgLy8gZmlsZSBzYXZlIGZhaWxlZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBfc2F2ZVByb21wdFVyaUNob29zZXIgPSBmdW5jdGlvbihkZWZlcnJlZCwgdXJpVHlwZSwgaW5pdFVyaSkge1xuICAgICAgICAgICAgcHJvbXB0VXJpQ2hvb3Nlcih1cmlUeXBlLCBpbml0VXJpKS50aGVuKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICBfc2F2ZVByb21wdElmT3ZlcndyaXRlKGRlZmVycmVkLCByZXQudXJpLCByZXQudXJpVHlwZSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiY2FuY2VsbGVkXCIpOyAvLyBmaWxlIHNhdmUgY2FuY2VsbGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVQcm9tcHRDaG9vc2VVcmkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIF9zYXZlUHJvbXB0VXJpQ2hvb3NlcihkZWZlcnJlZCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVQcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKHVyaSwgdXJpVHlwZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgX3NhdmVQcm9tcHRJZk92ZXJ3cml0ZShkZWZlcnJlZCwgdXJpLCB1cmlUeXBlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZVN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJTYXZpbmdcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgc2F2ZURvbmUgPSBmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZChmYWxzZSk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnVwZGF0ZU5vdGVib29rVXJpKHJldC51cmksIHJldC51cmlUeXBlLCBmYWxzZSwgXCJia3JcIik7XG4gICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIlNhdmVkXCIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZUZhaWxlZCA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGlmIChtc2cgPT09IFwiY2FuY2VsbGVkXCIpIHtcbiAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJDYW5jZWxsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwobXNnLCBcIlNhdmUgRmFpbGVkXCIpO1xuICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIlNhdmUgRmFpbGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZXZhbENvZGVJZCA9IDA7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogXCJia05vdGVib29rQXBwXCIsXG4gICAgICAgICAgICBnZXRTZXNzaW9uSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRTZXNzaW9uSWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXROb3RlYm9va01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldEJlYWtlck9iamVjdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdHVzTWVzc2FnZShtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdXBkYXRlTG9hZGluZ1N0YXR1c01lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZ2V0TG9hZGluZ1N0YXR1c01lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNhdmVOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNhdmVTdGFydCgpO1xuICAgICAgICAgICAgICB2YXIgdGhlbmFibGU7XG4gICAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzU2F2YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICAgICAgICAgIHRoZW5hYmxlID0gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgc2F2ZURhdGEgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIoc2F2ZURhdGEudXJpVHlwZSk7XG4gICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IHNhdmVEYXRhLm5vdGVib29rTW9kZWxBc1N0cmluZztcbiAgICAgICAgICAgICAgICAgIGZpbGVTYXZlci5zYXZlKHNhdmVEYXRhLm5vdGVib29rVXJpLCBjb250ZW50LCB0cnVlKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHt1cmk6IHNhdmVEYXRhLm5vdGVib29rVXJpLCB1cmlUeXBlOiBzYXZlRGF0YS51cmlUeXBlfSk7XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoZW5hYmxlID0gc2F2ZVByb21wdENob29zZVVyaSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0aGVuYWJsZS50aGVuKHNhdmVEb25lLCBzYXZlRmFpbGVkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYXZlTm90ZWJvb2tBczogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShub3RlYm9va1VyaSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2Fubm90IHNhdmUgbm90ZWJvb2ssIG5vdGVib29rVXJpIGlzIGVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlU3RhcnQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNhdmVQcm9tcHRJZk92ZXJ3cml0ZShub3RlYm9va1VyaSwgdXJpVHlwZSkudGhlbihzYXZlRG9uZSwgc2F2ZUZhaWxlZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2VOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgaWYgKGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmlzQW55SW5Qcm9ncmVzcygpICkge1xuICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgXCJBbGwgcnVubmluZyBhbmQgcGVuZGluZyBjZWxscyB3aWxsIGJlIGNhbmNlbGxlZC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJXYXJuaW5nIVwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5jYW5jZWxBbGwoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2xvc2VOb3RlYm9vaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTsgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHNlbGYuX2Nsb3NlTm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfY2xvc2VOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgdmFyIGNsb3NlU2Vzc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xvc2UoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBub3RlYm9va1RpdGxlID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va1RpdGxlKCk7XG4gICAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgXCJEbyB5b3Ugd2FudCB0byBzYXZlIFwiICsgbm90ZWJvb2tUaXRsZSArIFwiP1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbmZpcm0gY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5zYXZlTm90ZWJvb2soKS50aGVuKGNsb3NlU2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2Ugd2l0aG91dCBzYXZpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG51bGwsIFwiU2F2ZVwiLCBcIkRvbid0IHNhdmVcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xsYXBzZUFsbFNlY3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZ2V0Tm90ZWJvb2tNb2RlbCgpLmNlbGxzLCBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwudHlwZSA9PSBcInNlY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgY2VsbC5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzQ29kZUNlbGw6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICAvLyB0b0V2YWwgY2FuIGJlIGEgdGFnTmFtZSAoc3RyaW5nKSwgZWl0aGVyIFwiaW5pdGlhbGl6YXRpb25cIiwgbmFtZSBvZiBhbiBldmFsdWF0b3Igb3IgdXNlciBkZWZpbmVkIHRhZ1xuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxJRCAoc3RyaW5nKVxuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxNb2RlbFxuICAgICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9FdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5oYXNDZWxsKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldEFsbENvZGVDZWxscyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIGNlbGwsIGp1c3QgZ2V0IHRoZSBjZWxsIG1vZGVsIGZyb20gY2VsbElEXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIG5vdCBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBia1Nlc3Npb25NYW5hZ2VyLm5vdGVib29rTW9kZWxHZXRJbml0aWFsaXphdGlvbkNlbGxzKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgdXNlciB0YWcgZm9yIGEgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBpdCBpcyBhIGV2YWx1YXRvciBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aEV2YWx1YXRvcih0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSB1bmRlZmluZWQgfHwgKF8uaXNBcnJheSh0b0V2YWwpICYmIHRvRXZhbC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gdG9FdmFsIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsTW9kZWxcbiAgICAgICAgICAgICAgLy8gb3IgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvRXZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaGFzQ2VsbCh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHNlY3Rpb24gY2VsbCBvciByb290IGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRBbGxDb2RlQ2VsbHModG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbCh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBub3QgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IFwiaW5pdGlhbGl6YXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gYmtTZXNzaW9uTWFuYWdlci5ub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNlbGxPcC5oYXNVc2VyVGFnKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhVc2VyVGFnKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgaXQgaXMgYSBldmFsdWF0b3IgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc0FycmF5KHRvRXZhbCkgJiYgdG9FdmFsLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIkVSUk9SOiBjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGUodG9FdmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGVBbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlUm9vdDogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIC8vIHRvRXZhbCBjYW4gYmUgYSB0YWdOYW1lIChzdHJpbmcpLCBlaXRoZXIgXCJpbml0aWFsaXphdGlvblwiLCBuYW1lIG9mIGFuIGV2YWx1YXRvciBvciB1c2VyIGRlZmluZWQgdGFnXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbElEIChzdHJpbmcpXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbE1vZGVsXG4gICAgICAgICAgICAgIC8vIG9yIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b0V2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmhhc0NlbGwodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcih0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBzZWN0aW9uIGNlbGwgb3Igcm9vdCBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2VsbCwganVzdCBnZXQgdGhlIGNlbGwgbW9kZWwgZnJvbSBjZWxsSURcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSBcImluaXRpYWxpemF0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjZWxsT3AuaGFzVXNlclRhZyh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSB1c2VyIHRhZyBmb3IgYSBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoVXNlclRhZyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoRXZhbHVhdG9yKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IHVuZGVmaW5lZCB8fCAoIV8uaXNBcnJheSh0b0V2YWwpICYmIHRvRXZhbC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJFUlJPUjogY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIV8uaXNBcnJheSh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmV2YWx1YXRlUm9vdCh0b0V2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlSm9iTWFuYWdlci5ldmFsdWF0ZVJvb3RBbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlQ29kZTogZnVuY3Rpb24oZXZhbHVhdG9yLCBjb2RlKSB7XG4gICAgICAgICAgICAgIHZhciBvdXRjb250YWluZXIgPSB7IH07XG4gICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrSGVscGVyLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgIGV2YWxDb2RlSWQrKztcbiAgICAgICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGUoe1xuICAgICAgICAgICAgICAgIGlkOiBcIm9uVGhlRmx5Q2VsbF9cIitldmFsQ29kZUlkLFxuICAgICAgICAgICAgICAgIGV2YWx1YXRvcjogZXZhbHVhdG9yLFxuICAgICAgICAgICAgICAgIGlucHV0OiB7IGJvZHk6IGNvZGUgfSxcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IG91dGNvbnRhaW5lclxuICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5yZXNvbHZlKG91dGNvbnRhaW5lci5yZXN1bHQpOyB9LCBmdW5jdGlvbihlcnIpIHsgZGVmZXJyZWQucmVqZWN0KGVycik7IH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhZGRFdmFsdWF0b3Ioc2V0dGluZ3MsIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUV2YWx1YXRvcjogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlci5yZW1vdmVFdmFsdWF0b3IocGx1Z2luKTtcbiAgICAgICAgICAgICAgZXZhbHVhdG9yTWVudUl0ZW1zID0gXy5yZWplY3QoZXZhbHVhdG9yTWVudUl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PSBwbHVnaW47XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEV2YWx1YXRvck1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3JNZW51SXRlbXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QmtOb3RlYm9va1dpZGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia05vdGVib29rV2lkZ2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZU5vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIudG9nZ2xlTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgbmFtZXMgb2YgYWxsIGVuYWJsZWQgZXZhbHVhdG9yc1xuICAgICAgICAgICAgZ2V0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBldmFscyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGV2YWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2YWxzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0IChhIHN1YnNldCBvZikgY29kZSBjZWxsc1xuICAgICAgICAgICAgZ2V0Q29kZUNlbGxzOiBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gZmlsdGVyIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGNvZGUgY2VsbHNcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGNlbGxPcC5oYXNDZWxsKGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcihmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldENlbGwoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc0FycmF5KGZpbHRlcikgJiYgZmlsdGVyLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwIDsgaSA8IGZpbHRlci5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IGZpbHRlcltpXTtcbiAgICAgICAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICAgICAgICBvLmNlbGxJZCA9IGNlbGwuaWQ7XG4gICAgICAgICAgICAgICAgICBvLmV2YWx1YXRvcklkID0gY2VsbC5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgICAgICBvLmNvZGUgPSBjZWxsLmlucHV0LmJvZHk7XG4gICAgICAgICAgICAgICAgICBvLnRhZ3MgPSBjZWxsLnRhZ3M7XG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbC5kYXRhcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLmRhdGFyZXN1bHQ7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwub3V0cHV0ICE9PSB1bmRlZmluZWQgJiYgY2VsbC5vdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwub3V0cHV0LnJlc3VsdC50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXQucmVzdWx0LnR5cGUgPT09ICdCZWFrZXJEaXNwbGF5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLm91dHB1dC5yZXN1bHQub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dHR5cGUgPSBjZWxsLm91dHB1dC5yZXN1bHQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gY2VsbC5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGNlbGwub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgby50eXBlID0gXCJCZWFrZXJDb2RlQ2VsbFwiO1xuICAgICAgICAgICAgICAgICAgcmV0LnB1c2gobyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0bXBDZWxsID0ge307XG4gICAgICAgICAgICAgICAgdG1wQ2VsbC5jZWxsSWQgPSBmaWx0ZXIuaWQ7XG4gICAgICAgICAgICAgICAgdG1wQ2VsbC5ldmFsdWF0b3JJZCA9IGZpbHRlci5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgICAgdG1wQ2VsbC5jb2RlID0gZmlsdGVyLmlucHV0LmJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5kYXRhcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRtcENlbGwub3V0cHV0ID0gZmlsdGVyLmRhdGFyZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3V0cHV0ICE9PSB1bmRlZmluZWQgJiYgZmlsdGVyLm91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5vdXRwdXQucmVzdWx0LnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm91dHB1dC5yZXN1bHQudHlwZSA9PT0gJ0JlYWtlckRpc3BsYXknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdG1wQ2VsbC5vdXRwdXQgPSBmaWx0ZXIub3V0cHV0LnJlc3VsdC5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdG1wQ2VsbC5vdXRwdXR0eXBlID0gZmlsdGVyLm91dHB1dC5yZXN1bHQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICB0bXBDZWxsLm91dHB1dCA9IGZpbHRlci5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBDZWxsLm91dHB1dCA9IGZpbHRlci5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0bXBDZWxsLnRhZ3MgPSBmaWx0ZXIudGFncztcbiAgICAgICAgICAgICAgICB0bXBDZWxsLnR5cGUgPSBcIkJlYWtlckNvZGVDZWxsXCI7XG4gICAgICAgICAgICAgICAgcmV0LnB1c2godG1wQ2VsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXQgYSBjb2RlIGNlbGwgYm9keVxuICAgICAgICAgICAgc2V0Q29kZUNlbGxCb2R5OiBmdW5jdGlvbihuYW1lLCBjb2RlKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIGlmICghY2VsbE9wLmhhc0NlbGwobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbCAgPSBjZWxsT3AuZ2V0Q2VsbChuYW1lKTtcbiAgICAgICAgICAgICAgaWYgKCBjZWxsLmlucHV0ID09PSB1bmRlZmluZWQgfHwgY2VsbC5pbnB1dC5ib2R5ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICBjZWxsLmlucHV0LmJvZHkgPSBjb2RlO1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXQgYSBjb2RlIGNlbGwgZXZhbHVhdG9yXG4gICAgICAgICAgICBzZXRDb2RlQ2VsbEV2YWx1YXRvcjogZnVuY3Rpb24obmFtZSwgZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgIHZhciBldmFscyA9IHRoaXMuZ2V0RXZhbHVhdG9ycygpO1xuICAgICAgICAgICAgICBpZiAoIGV2YWxzLmluZGV4T2YoZXZhbHVhdG9yKT09LTEgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBldmFsdWF0b3IgXCIrZXZhbHVhdG9yK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIGlmICghY2VsbE9wLmhhc0NlbGwobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbCAgPSBjZWxsT3AuZ2V0Q2VsbChuYW1lKTtcbiAgICAgICAgICAgICAgaWYgKCBjZWxsLmlucHV0ID09PSB1bmRlZmluZWQgfHwgY2VsbC5pbnB1dC5ib2R5ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICBjZWxsLmV2YWx1YXRvciA9IGV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgY2VsbE9wLnJlYnVpbGRNYXBzKCk7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldCBhIGNvZGUgY2VsbCB0YWdzXG4gICAgICAgICAgICBzZXRDb2RlQ2VsbFRhZ3M6IGZ1bmN0aW9uKG5hbWUsIHRhZ3MpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgaWYgKCFjZWxsT3AuaGFzQ2VsbChuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBpcyBub3QgY29kZSBjZWxsXCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsICA9IGNlbGxPcC5nZXRDZWxsKG5hbWUpO1xuICAgICAgICAgICAgICBjZWxsLnRhZ3MgPSB0YWdzO1xuICAgICAgICAgICAgICBjZWxsT3AucmVidWlsZE1hcHMoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgYmtDb3JlTWFuYWdlci5zZXRCa0FwcEltcGwoX2ltcGwpO1xuXG4gICAgICAgIHZhciBzZXREb2N1bWVudFRpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGVkaXRlZCA9ICRzY29wZS5pc0VkaXRlZCgpLFxuICAgICAgICAgICAgICBmaWxlbmFtZSA9ICRzY29wZS5maWxlbmFtZSgpLFxuICAgICAgICAgICAgICB0aXRsZTtcblxuICAgICAgICAgIHRpdGxlID0gZmlsZW5hbWU7XG4gICAgICAgICAgaWYgKGVkaXRlZCkgdGl0bGUgPSAnKicgKyB0aXRsZTtcblxuICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRWRpdGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va01vZGVsRWRpdGVkKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzRWRpdGVkKCknLCBmdW5jdGlvbihlZGl0ZWQsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKGVkaXRlZCA9PT0gb2xkVmFsdWUpIHJldHVybjtcbiAgICAgICAgICBzZXREb2N1bWVudFRpdGxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdmaWxlbmFtZSgpJywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsID09PSBvbGRWYWwpIHJldHVybjtcbiAgICAgICAgICBzZXREb2N1bWVudFRpdGxlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBpbnRlcnZhbElEID0gbnVsbDtcbiAgICAgICAgdmFyIHN0b3BBdXRvQmFja3VwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKGludGVydmFsSUQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGludGVydmFsSUQgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc3RhcnRBdXRvQmFja3VwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RvcEF1dG9CYWNrdXAoKTtcbiAgICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAsIDYwICogMTAwMCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRNZW51cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia01lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVzKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBrZXlkb3duSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gODMpKSB7IC8vIEN0cmwgKyBzXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBfaW1wbC5zYXZlTm90ZWJvb2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gODMpKSB7IC8vIENtZCArIHNcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIF9pbXBsLnNhdmVOb3RlYm9vaygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQubm9kZU5hbWUgIT09IFwiVEVYVEFSRUFcIikge1xuICAgICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLndoaWNoID09PSA5MCkgeyAvLyBDdHJsICsgelxuICAgICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIudW5kbygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgKGUud2hpY2ggPT09IDkwKSkgeyAvLyBDbWQgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci51bmRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY3RybEtleSAmJiBlLndoaWNoID09PSA4OSkgeyAvLyBDdHJsICsgelxuICAgICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIucmVkbygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgKGUud2hpY2ggPT09IDg5KSkgeyAvLyBDbWQgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5yZWRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUT0RPIGltcGxlbWVudCBnbG9iYWwgcmVkb1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJChkb2N1bWVudCkuYmluZCgna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcbiAgICAgICAgdmFyIG9uRGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwKCk7XG4gICAgICAgICAgc3RvcEF1dG9CYWNrdXAoKTtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNldEJrQXBwSW1wbChudWxsKTtcbiAgICAgICAgICAkKGRvY3VtZW50KS51bmJpbmQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG4gICAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gbnVsbDtcbiAgICAgICAgICBia1V0aWxzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIG9uRGVzdHJveSk7XG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCgpO1xuICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIG5vdGVib29rIGhhcyBiZWVuIGVkaXRlZCBidXQgbm90IHNhdmVkLCBpZiB5b3UgY2xvc2UgdGhlIHBhZ2UgeW91ciBjaGFuZ2VzIG1heSBiZSBsb3N0XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChia0V2YWx1YXRlSm9iTWFuYWdlci5pc0FueUluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiU29tZSBjZWxscyBhcmUgc3RpbGwgcnVubmluZy4gTGVhdmluZyB0aGUgcGFnZSBub3cgd2lsbCBjYXVzZSBjYW5jZWxsaW5nIGFuZCByZXN1bHQgYmUgbG9zdFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkRlc3Ryb3koKTtcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93Lm9udW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuY2FuY2VsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHN0YXJ0QXV0b0JhY2t1cCgpO1xuICAgICAgICAkc2NvcGUuZ290b0NvbnRyb2xQYW5lbCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGJrVXRpbHMuaXNNaWRkbGVDbGljayhldmVudCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFwiLi9cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZmlsZW5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va1RpdGxlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbihcIiRsb2NhdGlvbkNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmlzQW55SW5Qcm9ncmVzcygpICYmIG5leHQuaW5kZXhPZihcImZvcmNlPXllc1wiKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cyQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgXCJBbGwgcnVubmluZyBhbmQgcGVuZGluZyBjZWxscyB3aWxsIGJlIGNhbmNlbGxlZC5cIixcbiAgICAgICAgICAgICAgICBcIldhcm5pbmchXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5jYW5jZWxBbGwoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciByb3V0ZVBhcmFtcyA9IHtmb3JjZTogXCJ5ZXNcIn07XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHNwbGl0cyA9IGRlY29kZVVSSUNvbXBvbmVudChuZXh0LnNwbGl0KFwiI1wiKVsxXSkuc3BsaXQoXCI/XCIpO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gc3BsaXRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2ggPSBzcGxpdHNbMV07XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhcnMgPSBzZWFyY2guc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhaXIgPSB2LnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlUGFyYW1zW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChwYXRoKS5zZWFyY2gocm91dGVQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUucHJvbXB0VG9TYXZlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcm9tcHRlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChwcm9tcHRlZCkgeyAvLyBwcmV2ZW50IHByb21wdGluZyBtdWx0aXBsZSBhdCB0aGUgc2FtZSB0aW1lXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb21wdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIkJlYWtlciBzZXJ2ZXIgZGlzY29ubmVjdGVkLiBGdXJ0aGVyIGVkaXRzIHdpbGwgbm90IGJlIHNhdmVkLjxicj5cIiArXG4gICAgICAgICAgICAgICAgXCJTYXZlIGN1cnJlbnQgbm90ZWJvb2sgYXMgYSBmaWxlP1wiLFxuICAgICAgICAgICAgICAgIFwiRGlzY29ubmVjdGVkXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAvLyBcIlNhdmVcIiwgc2F2ZSB0aGUgbm90ZWJvb2sgYXMgYSBmaWxlIG9uIHRoZSBjbGllbnQgc2lkZVxuICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGJrVXRpbHMuc2F2ZUFzQ2xpZW50RmlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2F2ZURhdGEoKS5ub3RlYm9va01vZGVsQXNTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIFwibm90ZWJvb2suYmtyXCIpO1xuICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFwiTm90IG5vd1wiLCBoaWphY2sgYWxsIGtleXByZXNzIGV2ZW50cyB0byBwcm9tcHQgYWdhaW5cbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsICRzY29wZS5wcm9tcHRUb1NhdmUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJTYXZlXCIsIFwiTm90IG5vd1wiLCBcImJ0bi1wcmltYXJ5XCIsIFwiXCJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHJvbXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3Rpb25NYW5hZ2VyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBSRUNPTk5FQ1RfVElNRU9VVCA9IDUwMDA7IC8vIDUgc2Vjb25kc1xuICAgICAgICAgIHZhciBPRkZMSU5FX01FU1NBR0UgPSBcIm9mZmxpbmVcIjtcbiAgICAgICAgICB2YXIgQ09OTkVDVElOR19NRVNTQUdFID0gXCJyZWNvbm5lY3RpbmdcIjtcbiAgICAgICAgICB2YXIgcmVjb25uZWN0VGltZW91dDtcbiAgICAgICAgICB2YXIgc3RhdHVzTWVzc2FnZSA9IE9GRkxJTkVfTUVTU0FHRTtcbiAgICAgICAgICB2YXIgZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgdmFyIGluZGljYXRlUmVjb25uZWN0RmFpbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9wV2FpdGluZ1JlY29ubmVjdCgpO1xuICAgICAgICAgICAgc3RhdHVzTWVzc2FnZSA9IE9GRkxJTkVfTUVTU0FHRTtcbiAgICAgICAgICAgIGJrVXRpbHMuZGlzY29ubmVjdCgpOyAvLyBwcmV2ZW50IGZ1cnRoZXIgYXR0ZW1wdGluZyB0byByZWNvbm5lY3RcbiAgICAgICAgICAgICRzY29wZS5wcm9tcHRUb1NhdmUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciB3YWl0UmVjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdGF0dXNNZXNzYWdlID0gQ09OTkVDVElOR19NRVNTQUdFO1xuXG4gICAgICAgICAgICAvLyB3YWl0IGZvciA1IHNjZW9uZHMsIGlmIHJlY29ubmVjdCBkaWRuJ3QgaGFwcGVuLCBwcm9tcHQgdG8gc2F2ZVxuICAgICAgICAgICAgaWYgKCFyZWNvbm5lY3RUaW1lb3V0KSB7XG4gICAgICAgICAgICAgIHJlY29ubmVjdFRpbWVvdXQgPSAkdGltZW91dChpbmRpY2F0ZVJlY29ubmVjdEZhaWxlZCwgUkVDT05ORUNUX1RJTUVPVVQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgdXNlciBhdHRlbXB0cyB0byBpbnRlcmFjdCB3aXRoaW4gNSBzZWNvbmQsIGFsc28gcHJvbXB0IHRvIHNhdmVcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGluZGljYXRlUmVjb25uZWN0RmFpbGVkLCB0cnVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBzdG9wV2FpdGluZ1JlY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHJlY29ubmVjdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHJlY29ubmVjdFRpbWVvdXQpO1xuICAgICAgICAgICAgICByZWNvbm5lY3RUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQsIHRydWUpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBkaXNjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB3YWl0UmVjb25uZWN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25SZWNvbm5lY3RlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuaXNTZXNzaW9uVmFsaWQoKS50aGVuKGZ1bmN0aW9uKGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgc3RvcFdhaXRpbmdSZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgIGRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5yZWNvbm5lY3RFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGluZGljYXRlUmVjb25uZWN0RmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTdGF0dXNNZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1c01lc3NhZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNEaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZGlzY29ubmVjdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgJHNjb3BlLmdldE9mZmluZU1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbk1hbmFnZXIuZ2V0U3RhdHVzTWVzc2FnZSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaXNEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbk1hbmFnZXIuaXNEaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBia1V0aWxzLmFkZENvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgIGlmIChtc2cuc3VjY2Vzc2Z1bCA9PT0gJHNjb3BlLmlzRGlzY29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIHZhciBkaXNjb25uZWN0ZWQgPSAhbXNnLnN1Y2Nlc3NmdWw7XG4gICAgICAgICAgICBpZiAoZGlzY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgIGNvbm5lY3Rpb25NYW5hZ2VyLm9uRGlzY29ubmVjdGVkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25uZWN0aW9uTWFuYWdlci5vblJlY29ubmVjdGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzRGlzY29ubmVjdGVkKCknLCBmdW5jdGlvbihkaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICBpZiAoZGlzY29ubmVjdGVkKSB7XG4gICAgICAgICAgICBzdG9wQXV0b0JhY2t1cCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydEF1dG9CYWNrdXAoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldERvY3VtZW50VGl0bGUoKTtcblxuICAgICAgICAvLyBlbnN1cmUgYW4gZXhpc3Rpbmcgc2Vzc2lvbiBpcyBjbGVhcmVkIHNvIHRoYXQgdGhlIGVtcHR5IG5vdGVib29rIG1vZGVsXG4gICAgICAgIC8vIG1ha2VzIHRoZSBVSSBpcyBibGFuayBpbW1lZGlhdGVseSAoaW5zdGVhZCBvZiBzaG93aW5nIGxlZnRvdmVyIGZyb20gYSBwcmV2aW91cyBzZXNzaW9uKVxuICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmNsZWFyKCk7XG5cbiAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5jbGVhcigpO1xuICAgICAgICBpZiAod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KCcuLi9iZWFrZXIvcmVzdC91dGlsL2dldE1lbnVQbHVnaW5zJylcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtZW51VXJscykge1xuICAgICAgICAgICAgbWVudVVybHMuZm9yRWFjaChmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5sb2FkTWVudVBsdWdpbih1cmwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG1lbnVlcyA9IHdpbmRvdy5iZWFrZXIuZ2V0TWVudUl0ZW1zKCk7XG4gICAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5hdHRhY2hNZW51cyhtZW51ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLnJlc2V0KCk7XG4gICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLnJlc2V0KCk7XG5cbiAgICAgICAgaWYgKCRzY29wZS5uZXdTZXNzaW9uID09PSBcIm5ld1wiKSB7XG4gICAgICAgICAgbG9hZE5vdGVib29rLmRlZmF1bHROb3RlYm9vaygkc2NvcGUuc2Vzc2lvbklkKTtcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUubmV3U2Vzc2lvbiA9PT0gXCJlbXB0eVwiKSB7XG4gICAgICAgICAgbG9hZE5vdGVib29rLmVtcHR5Tm90ZWJvb2soJHNjb3BlLnNlc3Npb25JZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmlzSW1wb3J0ID09PSAndHJ1ZScpIHtcbiAgICAgICAgICBsb2FkTm90ZWJvb2suZnJvbUltcG9ydCgkc2NvcGUuc2Vzc2lvbklkKTtcbiAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuaXNPcGVuID09PSAndHJ1ZScpIHtcbiAgICAgICAgICBsb2FkTm90ZWJvb2sub3BlblVyaSgkc2NvcGUubm90ZWJvb2ssICRzY29wZS5zZXNzaW9uSWQsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvYWROb3RlYm9vay5mcm9tU2Vzc2lvbigkc2NvcGUuc2Vzc2lvbklkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuZXZhbHVhdGVKb2JNYW5hZ2VyJywgWydiay51dGlscycsICdiay5ldmFsdWF0b3JNYW5hZ2VyJ10pO1xuICBtb2R1bGUuZmFjdG9yeSgnYmtFdmFsdWF0ZUpvYk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzLCBia0V2YWx1YXRvck1hbmFnZXIsICR0aW1lb3V0KSB7XG5cbiAgICB2YXIgb3V0cHV0TWFwID0geyB9O1xuXG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uKG1zZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgIGlubmVydHlwZTogXCJFcnJvclwiLFxuICAgICAgICBvYmplY3Q6IG1zZ1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciB0ZXh0TWVzc2FnZSA9IGZ1bmN0aW9uKG1zZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgIGlubmVydHlwZTogXCJUZXh0XCIsXG4gICAgICAgIG9iamVjdDogbXNnXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIEVSUk9SX01FU1NBR0VfT05fRUFSTElFUl9GQUlMVVJFID1cbiAgICAgIGVycm9yTWVzc2FnZShcIkV2YWx1YXRpb24gY2FuY2VsbGVkIGR1ZSB0byBhIGZhaWx1cmUgb2YgYW4gZWFybGllciBjZWxsIGV2YWx1YXRpb25cIik7XG4gICAgdmFyIEVSUk9SX01FU1NBR0VfT05fQ0FOQ0VMID1cbiAgICAgIGVycm9yTWVzc2FnZShcIi4uLiBjYW5jZWxsZWQhXCIpO1xuICAgIHZhciBNRVNTQUdFX1BFTkRJTkcgPVxuICAgICAgdGV4dE1lc3NhZ2UoXCJwZW5kaW5nXCIpO1xuICAgIHZhciBNRVNTQUdFX1dBSVRJTkdfRk9SX0VWQUxVVE9SX0lOSVQgPVxuICAgICAgdGV4dE1lc3NhZ2UoXCJ3YWl0aW5nIGZvciBldmFsdWF0b3IgaW5pdGlhbGl6YXRpb24gLi4uXCIpO1xuXG4gICAgdmFyIGpvYlF1ZXVlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgX3F1ZXVlID0gW107XG4gICAgICB2YXIgX2pvYkluUHJvZ3Jlc3MgPSBbXTtcbiAgICAgIHZhciBydW5uaW5nID0ge307XG5cbiAgICAgIHZhciBldmFsdWF0ZUpvYiA9IGZ1bmN0aW9uKGpvYikge1xuICAgICAgICBqb2IuZXZhbHVhdG9yID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcihqb2IuZXZhbHVhdG9ySWQpO1xuICAgICAgICBpZiAoam9iLmV2YWx1YXRvcikge1xuICAgICAgICAgIGJrVXRpbHMubG9nKFwiZXZhbHVhdGVcIiwge1xuICAgICAgICAgICAgcGx1Z2luOiBqb2IuZXZhbHVhdG9yLnBsdWdpbk5hbWUsXG4gICAgICAgICAgICBsZW5ndGg6IGpvYi5jb2RlLmxlbmd0aCB9KTtcbiAgICAgICAgICByZXR1cm4gam9iLmV2YWx1YXRvci5ldmFsdWF0ZShqb2IuY29kZSwgam9iLm91dHB1dCwgb3V0cHV0TWFwW2pvYi5jZWxsSWRdKTtcbiAgICAgICAgfVxuICAgICAgICBqb2Iub3V0cHV0LnJlc3VsdCA9IE1FU1NBR0VfV0FJVElOR19GT1JfRVZBTFVUT1JfSU5JVDtcbiAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci53YWl0RXZhbHVhdG9yKGpvYi5ldmFsdWF0b3JJZClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihldikge1xuICAgICAgICAgICAgam9iLmV2YWx1YXRvciA9IGV2O1xuICAgICAgICAgICAgaWYgKGV2ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIHJldHVybiBqb2IuZXZhbHVhdG9yLmV2YWx1YXRlKGpvYi5jb2RlLCBqb2Iub3V0cHV0LCBvdXRwdXRNYXBbam9iLmNlbGxJZF0pO1xuICAgICAgICAgICAgcmV0dXJuIFwiY2Fubm90IGZpbmQgZXZhbHVhdG9yIGZvciBcIitqb2IuZXZhbHVhdG9ySWQ7XG4gICAgICAgICAgfSApO1xuICAgICAgfTtcblxuICAgICAgdmFyIGRvTmV4dCA9IGZ1bmN0aW9uKGlubmV4dCkge1xuICAgICAgICB2YXIgam9iO1xuXG4gICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIC8vIHN0YXJ0IGEgbmV3IHJvb3Qgam9iXG4gICAgICAgICAgam9iID0gX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBzb21ldGhpbmcgZXhlY3V0aW5nLi4uXG4gICAgICAgICAgdmFyIGxhc3QgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMV07XG4gICAgICAgICAgaWYgKGxhc3QucnVuY2hpbGQgIT09IHVuZGVmaW5lZCAmJiBsYXN0LnJ1bmNoaWxkLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICBsYXN0LnJ1bmNoaWxkID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobGFzdC5maW5pc2hlZCAmJiBsYXN0LmNhbmNlbF9kZWZlcnJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50LCBpZHg7XG4gICAgICAgICAgICAvLyB0aGlzIGpvYiBoYXMgZmluaXNoZWQgYnV0IGR1ZSB0byBjYW5jZWxsYXRpb25cbiAgICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBwYXJlbnQgam9iIHRvIGNhbmNlbFxuICAgICAgICAgICAgICBwYXJlbnQgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBwYXJlbnQuY2FuY2VsX2RlZmVycmVkID0gbGFzdC5jYW5jZWxfZGVmZXJyZWQ7XG4gICAgICAgICAgICAgIGlmIChwYXJlbnQuZXZhbHVhdG9yICYmIHBhcmVudC5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IoaWR4ID0gMDsgaWR4PHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2lkeF0ub3V0cHV0LnJlc3VsdD1FUlJPUl9NRVNTQUdFX09OX0NBTkNFTDtcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW5baWR4XS53aGVuZG9uZS5yZWplY3QoJy4uLiBjYW5jZWxsZWQhJyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbcGFyZW50LmNoaWxkcmVuW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8X3F1ZXVlLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICBfcXVldWVbaWR4XS5vdXRwdXQucmVzdWx0PUVSUk9SX01FU1NBR0VfT05fQ0FOQ0VMO1xuICAgICAgICAgICAgICAgIF9xdWV1ZVtpZHhdLndoZW5kb25lLnJlamVjdCgnLi4uIGNhbmNlbGxlZCEnKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcnVubmluZ1tfcXVldWVbaWR4XS5jZWxsSWRdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF9xdWV1ZSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdC53aGVuZG9uZS5yZWplY3QoJy4uLiBjYW5jZWxsZWQhJyk7XG4gICAgICAgICAgICBkZWxldGUgcnVubmluZ1tsYXN0LmNlbGxJZF07XG4gICAgICAgICAgICBfam9iSW5Qcm9ncmVzcy5wb3AoKTtcbiAgICAgICAgICAgIGJrSGVscGVyLmNsZWFyU3RhdHVzKFwiRXZhbHVhdGluZyBcIiArIGxhc3QuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgbGFzdC5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgcGFyZW50LmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIHBhcmVudC5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGFzdC5jYW5jZWxfZGVmZXJyZWQucmVzb2x2ZSgnZG9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9OZXh0KHRydWUpO1xuICAgICAgICAgICAgaWYgKGlubmV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICBia0hlbHBlci51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAobGFzdC5ydW5jaGlsZCA9PT0gdW5kZWZpbmVkICYmIGxhc3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgY2FuIHN0YXJ0IGEgY2hpbGRyZW5cbiAgICAgICAgICAgIGpvYiA9IGxhc3QuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBsYXN0LmNoaWxkcmVuLnNoaWZ0KCk7XG4gICAgICAgICAgICBsYXN0LnJ1bmNoaWxkID0gam9iO1xuICAgICAgICAgIH0gZWxzZSBpZiAobGFzdC5maW5pc2hlZCAmJiBsYXN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBoYXMgZmluaXNoZWRcbiAgICAgICAgICAgIGlmIChsYXN0LmVycm9yKSB7XG4gICAgICAgICAgICAgIGxhc3Qud2hlbmRvbmUucmVqZWN0KGxhc3QuZXJyb3IpO1xuICAgICAgICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBwYXJlbnQgam9iIHRvIGNhbmNlbFxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMl07XG5cbiAgICAgICAgICAgICAgICB2YXIgaWR4O1xuICAgICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8cGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpZHhdLm91dHB1dC5yZXN1bHQ9RVJST1JfTUVTU0FHRV9PTl9FQVJMSUVSX0ZBSUxVUkU7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW5baWR4XS53aGVuZG9uZS5yZWplY3QoXCJFdmFsdWF0aW9uIGNhbmNlbGxlZCBkdWUgdG8gYSBmYWlsdXJlIG9mIGFuIGVhcmxpZXIgY2VsbCBldmFsdWF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbcGFyZW50LmNoaWxkcmVuW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgICAgICAgICBmb3IoaWR4ID0gMDsgaWR4PF9xdWV1ZS5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICBfcXVldWVbaWR4XS5vdXRwdXQucmVzdWx0PUVSUk9SX01FU1NBR0VfT05fRUFSTElFUl9GQUlMVVJFO1xuICAgICAgICAgICAgICAgICAgX3F1ZXVlW2lkeF0ud2hlbmRvbmUucmVqZWN0KFwiRXZhbHVhdGlvbiBjYW5jZWxsZWQgZHVlIHRvIGEgZmFpbHVyZSBvZiBhbiBlYXJsaWVyIGNlbGwgZXZhbHVhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW19xdWV1ZVtpZHhdLmNlbGxJZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9xdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgbGFzdC53aGVuZG9uZS5yZXNvbHZlKGxhc3Qub3V0cHV0KTtcbiAgICAgICAgICAgIGJrSGVscGVyLmNsZWFyU3RhdHVzKFwiRXZhbHVhdGluZyBcIiArIGxhc3QuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgbGFzdC5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbbGFzdC5jZWxsSWRdO1xuICAgICAgICAgICAgX2pvYkluUHJvZ3Jlc3MucG9wKCk7XG4gICAgICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBqb2IgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMV07XG4gICAgICAgICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgam9iLmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIGpvYi5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9OZXh0KHRydWUpO1xuICAgICAgICAgICAgaWYgKGlubmV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICBia0hlbHBlci51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoam9iID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgYmtIZWxwZXIucmVmcmVzaFJvb3RTY29wZSgpOyB9LCAwKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfam9iSW5Qcm9ncmVzcy5wdXNoKGpvYik7XG4gICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgam9iLmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIGpvYi5jZWxsSWQsIHRydWUpO1xuXG4gICAgICAgIGV2YWx1YXRlSm9iKGpvYilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGpvYi5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgam9iLm91dHB1dCA9IGRhdGE7XG4gICAgICAgICAgZG9OZXh0KCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGpvYi5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgam9iLmVycm9yID0gZXJyO1xuICAgICAgICAgIGRvTmV4dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlubmV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJrSGVscGVyLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkOiBmdW5jdGlvbihqb2IpIHtcbiAgICAgICAgICBydW5uaW5nW2pvYi5jZWxsSWRdID0gdHJ1ZTtcbiAgICAgICAgICBfcXVldWUucHVzaChqb2IpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRDaGlsZHJlbjogZnVuY3Rpb24oam9iLCBjaGlsZCkge1xuICAgICAgICAgIHJ1bm5pbmdbY2hpbGQuY2VsbElkXSA9IHRydWU7XG4gICAgICAgICAgam9iLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDdXJyZW50Sm9iOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJldHVybiBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMV07XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsQWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgaWR4O1xuICAgICAgICAgIGZvciAoIGlkeD0wOyBpZHg8X3F1ZXVlLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIF9xdWV1ZVtpZHhdLm91dHB1dC5vdXRwdXQucmVzdWx0ID0gRVJST1JfTUVTU0FHRV9PTl9DQU5DRUw7XG4gICAgICAgICAgICBkZWxldGUgcnVubmluZ1tfcXVldWVbaWR4XS5jZWxsSWRdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfcXVldWUgPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNSdW5uaW5nOiBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgcmV0dXJuIHJ1bm5pbmdbbl0gPT09IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHRpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZG9OZXh0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGV2YWx1YXRlIGEgY2VsbCAoYXMgYSBzdWJjZWxsIG9mIGN1cnJlbnRseSBydW5uaW5nIGNlbGwpXG4gICAgICBldmFsdWF0ZTogZnVuY3Rpb24oY2VsbCwgbm90aWNrKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBqb2JRdWV1ZS5nZXRDdXJyZW50Sm9iKCk7XG4gICAgICAgIGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZVJvb3QoY2VsbCk7XG5cbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBpZiAoam9iUXVldWUuaXNSdW5uaW5nKGNlbGwuaWQpKSB7XG4gICAgICAgICAgYmtIZWxwZXIuc2hvd1RyYW5zaWVudFN0YXR1cyhcIkVSUk9SOiByZXN0YXJ0IGJsb2NrZWQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSRVNUQVJUIFBST0hJQklURUQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgLy8gcHJldmVudCBzZWxmIHJlc3RhcnRcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJSRVNUQVJUIFBST0hJQklURUQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbC5vdXRwdXQucmVzdWx0ID0gTUVTU0FHRV9QRU5ESU5HO1xuICAgICAgICBpZiAoIWNlbGwub3V0cHV0KSB7XG4gICAgICAgICAgY2VsbC5vdXRwdXQgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZhbEpvYiA9IHtcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBjZWxsSWQ6IGNlbGwuaWQsXG4gICAgICAgICAgZXZhbHVhdG9ySWQ6IGNlbGwuZXZhbHVhdG9yLFxuICAgICAgICAgIGNvZGU6IGNlbGwuaW5wdXQuYm9keSxcbiAgICAgICAgICBvdXRwdXQ6IGNlbGwub3V0cHV0LFxuICAgICAgICAgIHJldHJ5OiAwLFxuICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICBydW5jaGlsZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICB3aGVuZG9uZSA6IGRlZmVycmVkXG4gICAgICAgIH07XG4gICAgICAgIGpvYlF1ZXVlLmFkZENoaWxkcmVuKHBhcmVudCxldmFsSm9iKTtcbiAgICAgICAgaWYgKG5vdGljayA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGpvYlF1ZXVlLnRpY2soKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgLy8gZXZhbHVhdGUgYSBjZWxsIGluIHRvcCBsZXZlbCBjb250ZXh0XG4gICAgICBldmFsdWF0ZVJvb3Q6IGZ1bmN0aW9uKGNlbGwsIG5vdGljaykge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGlmIChqb2JRdWV1ZS5pc1J1bm5pbmcoY2VsbC5pZCkpIHtcbiAgICAgICAgICBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzKFwiRVJST1I6IHJlc3RhcnQgYmxvY2tlZCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICAvLyBwcmV2ZW50IHNlbGYgcmVzdGFydFxuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLm91dHB1dC5yZXN1bHQgPSBNRVNTQUdFX1BFTkRJTkc7XG4gICAgICAgIGlmICghY2VsbC5vdXRwdXQpIHtcbiAgICAgICAgICBjZWxsLm91dHB1dCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmFsSm9iID0ge1xuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIGNlbGxJZDogY2VsbC5pZCxcbiAgICAgICAgICBldmFsdWF0b3JJZDogY2VsbC5ldmFsdWF0b3IsXG4gICAgICAgICAgY29kZTogY2VsbC5pbnB1dC5ib2R5LFxuICAgICAgICAgIG91dHB1dDogY2VsbC5vdXRwdXQsXG4gICAgICAgICAgcmV0cnk6IDAsXG4gICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgIHJ1bmNoaWxkOiB1bmRlZmluZWQsXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgIHdoZW5kb25lIDogZGVmZXJyZWRcbiAgICAgICAgfTtcbiAgICAgICAgam9iUXVldWUuYWRkKGV2YWxKb2IpO1xuICAgICAgICBpZiAobm90aWNrID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICAvLyBldmFsdWF0ZSBhIGNlbGwgKGFzIGEgc3ViY2VsbCBvZiBjdXJyZW50bHkgcnVubmluZyBjZWxsKVxuICAgICAgZXZhbHVhdGVBbGw6IGZ1bmN0aW9uKGNlbGxzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHByb21pc2VzID0gXyhjZWxscykubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5ldmFsdWF0ZShjZWxsLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpvYlF1ZXVlLnRpY2soKTtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuYWxsKHByb21pc2VzKTtcbiAgICAgIH0sXG4gICAgICAvLyBldmFsdWF0ZSBhbGwgY2VsbHMgaW4gdG9wIGxldmVsIGNvbnRleHRcbiAgICAgIGV2YWx1YXRlUm9vdEFsbDogZnVuY3Rpb24oY2VsbHMsIHBhcmVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBwcm9taXNlcyA9IF8oY2VsbHMpLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuZXZhbHVhdGVSb290KGNlbGwsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gYmtVdGlscy5hbGwocHJvbWlzZXMpO1xuICAgICAgfSxcbiAgICAgIGlzQ2FuY2VsbGFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VycmVudEpvYiA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgcmV0dXJuICEhKGN1cnJlbnRKb2IgJiYgY3VycmVudEpvYi5ldmFsdWF0b3IgJiYgY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VycmVudEpvYiA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuXG4gICAgICAgIGlmIChjdXJyZW50Sm9iICYmIGN1cnJlbnRKb2IuZXZhbHVhdG9yKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbikge1xuICAgICAgICAgICAgY3VycmVudEpvYi5jYW5jZWxfZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgICAgIGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgY2FuY2VsQWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRKb2IgPSBqb2JRdWV1ZS5nZXRDdXJyZW50Sm9iKCk7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcblxuICAgICAgICBqb2JRdWV1ZS5jYW5jZWxBbGwoKTtcblxuICAgICAgICBpZiAoY3VycmVudEpvYiAmJiBjdXJyZW50Sm9iLmV2YWx1YXRvcikge1xuICAgICAgICAgIGlmIChjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRKb2IuY2FuY2VsX2RlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgICAgICBjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGlzQW55SW5Qcm9ncmVzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIWpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgIH0sXG4gICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsQWxsKCk7XG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJPdXRwdXRDZWxsOiBmdW5jdGlvbihpZCwgb3V0KSB7XG4gICAgICAgIG91dHB1dE1hcFtpZF0gPSBvdXQ7XG4gICAgICB9LFxuICAgICAgZGVSZWdpc3Rlck91dHB1dENlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGRlbGV0ZSBvdXRwdXRNYXBbaWRdO1xuICAgICAgfSxcbiAgICAgIGdldE91dHB1dENlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRNYXBbaWRdO1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuZXZhbHVhdG9yUGx1Z2luTWFuYWdlclxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ldmFsdWF0b3JNYW5hZ2VyJywgWydiay51dGlscycsICdiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXInXSk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrRXZhbHVhdG9yTWFuYWdlcicsIGZ1bmN0aW9uIChia1V0aWxzLCBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcikge1xuXG4gICAgdmFyIGV2YWx1YXRvcnMgPSB7fTtcbiAgICB2YXIgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzID0gW107XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZXZhbHVhdG9ycyA9IHt9O1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUV2YWx1YXRvcjogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBldmFsdWF0b3JzKSB7XG4gICAgICAgICAgdmFyIGUgPSBldmFsdWF0b3JzW2tleV07XG4gICAgICAgICAgaWYgKGUucGx1Z2luTmFtZSA9PT0gcGx1Z2luKSB7XG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGUuZXhpdCkpIHtcbiAgICAgICAgICAgICAgZS5leGl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgZXZhbHVhdG9yc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5ld0V2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9yU2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5pbmRleE9mKGV2YWx1YXRvclNldHRpbmdzKSA9PT0gLTEpXG5cdCAgICAgIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5wdXNoKGV2YWx1YXRvclNldHRpbmdzKTtcblx0ICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcblx0ICAgIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmdldEV2YWx1YXRvckZhY3RvcnlBbmRTaGVsbChldmFsdWF0b3JTZXR0aW5ncylcblx0ICAgIC50aGVuKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuXHQgICAgICBpZihldmFsdWF0b3IgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIGRlZmVycmVkLnJlamVjdChcImNhbm5vdCBjcmVhdGUgZXZhbHVhdG9yIGZhY3RvcnlcIik7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgICB9XG5cdCAgICAgIGlmIChfLmlzRW1wdHkoZXZhbHVhdG9yU2V0dGluZ3MubmFtZSkpIHtcblx0ICAgICAgICBpZiAoIWV2YWx1YXRvcnNbZXZhbHVhdG9yLnBsdWdpbk5hbWVdKSB7XG5cdCAgICAgICAgICBldmFsdWF0b3JTZXR0aW5ncy5uYW1lID0gZXZhbHVhdG9yLnBsdWdpbk5hbWU7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLm5hbWUgPSBldmFsdWF0b3IucGx1Z2luTmFtZSArIFwiX1wiICsgYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXG5cdCAgICAgIGlmICghZXZhbHVhdG9yU2V0dGluZ3Mudmlldykge1xuXHQgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLnZpZXcgPSB7fTtcblx0ICAgICAgfVxuXHQgICAgICBpZiAoIWV2YWx1YXRvclNldHRpbmdzLnZpZXcuY20pIHtcblx0ICAgICAgICBldmFsdWF0b3JTZXR0aW5ncy52aWV3LmNtID0ge307XG5cdCAgICAgIH1cblx0ICAgICAgZXZhbHVhdG9yU2V0dGluZ3Mudmlldy5jbS5tb2RlID0gZXZhbHVhdG9yLmNtTW9kZTtcblx0ICAgICAgZXZhbHVhdG9yc1tldmFsdWF0b3JTZXR0aW5ncy5uYW1lXSA9IGV2YWx1YXRvcjtcblx0ICAgICAgaWYgKCBldmFsdWF0b3JTZXR0aW5ncy5kZWZlcnJlZCAhPT0gdW5kZWZpbmVkICkge1xuXHQgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLmRlZmVycmVkLnJlc29sdmUoZXZhbHVhdG9yKTtcblx0ICAgICAgICBkZWxldGUgZXZhbHVhdG9yU2V0dGluZ3MuZGVmZXJyZWQ7XG5cdCAgICAgIH1cblx0ICAgICAgZGVmZXJyZWQucmVzb2x2ZShldmFsdWF0b3IpO1xuXHQgICAgfSlcblx0ICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuXHQgICAgICB2YXIgaW5kZXggPSBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMuaW5kZXhPZihldmFsdWF0b3JTZXR0aW5ncyk7XG5cdCAgICAgIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuXHQgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9ySWQpIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRvcnNbZXZhbHVhdG9ySWRdO1xuICAgICAgfSxcbiAgICAgIHdhaXRFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvcklkKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgaWYgKGV2YWx1YXRvcnNbZXZhbHVhdG9ySWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGV2YWx1YXRvcnNbZXZhbHVhdG9ySWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5sZW5ndGg7IGkgKysgKSB7XG4gICAgICAgICAgICBpZiAobG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzW2ldLm5hbWUgPT09IGV2YWx1YXRvcklkKSB7XG4gICAgICAgICAgICAgIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9yc1tpXS5kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuXG4gICAgICBnZXRWaXN1YWxQYXJhbXM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKGV2YWx1YXRvcnNbbmFtZV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuZ2V0VmlzdWFsUGFyYW1zKG5hbWUpO1xuICAgICAgICB2YXIgdiA9IHsgfTtcbiAgICAgICAgdmFyIGUgPSBldmFsdWF0b3JzW25hbWVdO1xuICAgICAgICB2YXIgZiA9IGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmdldFZpc3VhbFBhcmFtcyhuYW1lKTtcbiAgICAgICAgaWYgKGUuYmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYmdDb2xvciA9IGUuYmdDb2xvcjtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuYmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYmdDb2xvciA9IGYuYmdDb2xvcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuYmdDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGUuZmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuZmdDb2xvciA9IGUuZmdDb2xvcjtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuZmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuZmdDb2xvciA9IGYuZmdDb2xvcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuZmdDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGUuYm9yZGVyQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmJvcmRlckNvbG9yID0gZS5ib3JkZXJDb2xvcjtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuYm9yZGVyQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmJvcmRlckNvbG9yID0gZi5ib3JkZXJDb2xvcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuYm9yZGVyQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgIGlmIChlLnNob3J0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuc2hvcnROYW1lID0gZS5zaG9ydE5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGYgIT09IHVuZGVmaW5lZCAmJiBmLnNob3J0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuc2hvcnROYW1lID0gZi5zaG9ydE5hbWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB2LnNob3J0TmFtZSA9IFwiXCI7XG5cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9LFxuICAgICAgZ2V0QWxsRXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBldmFsdWF0b3JzO1xuICAgICAgfSxcbiAgICAgIGdldExvYWRpbmdFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycztcbiAgICAgIH0sXG4gICAgICByZWNvbm5lY3RFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5lYWNoKGV2YWx1YXRvcnMsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgaWYgKGV2ICYmIF8uaXNGdW5jdGlvbihldi5yZWNvbm5lY3QpKSB7XG4gICAgICAgICAgICBldi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGV4aXRBbmRSZW1vdmVBbGxFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5lYWNoKGV2YWx1YXRvcnMsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgaWYgKGV2ICYmIF8uaXNGdW5jdGlvbihldi5leGl0KSkge1xuICAgICAgICAgICAgZXYuZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGV2YWx1YXRvcnMgPSB7fTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXJcbiAqIE5vdGVib29rIENlbGwgTW9kZWwgZG9lc24ndCBvd24gdGhlIG5vdGVib29rIG1vZGVsLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXInLCBbXSk7XG5cbiAgLy8gdXRpbGl0aWVzXG4gIHZhciBnZW5lcmF0ZUNlbGxNYXAgPSBmdW5jdGlvbihjZWxscykge1xuICAgIHZhciBkZWNvcmF0ZWRDZWxscyA9IHtcbiAgICAgICdyb290Jzoge1xuICAgICAgICBpZDogJ3Jvb3QnLFxuICAgICAgICByYXc6IG51bGwsXG4gICAgICAgIGxldmVsOiAwLFxuICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgYWxsRGVzY2VuZGFudHM6IFtdXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWNlbGxzIHx8IGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGRlY29yYXRlZENlbGxzO1xuICAgIH1cblxuICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oY2VsbCwgaW5kZXgpIHtcbiAgICAgIGRlY29yYXRlZENlbGxzW2NlbGwuaWRdID0ge1xuICAgICAgICBpZDogY2VsbC5pZCxcbiAgICAgICAgcmF3OiBjZWxsLFxuICAgICAgICByYXdJbmRleDogaW5kZXgsXG4gICAgICAgIGxldmVsOiBjZWxsLmxldmVsID4gMCA/IGNlbGwubGV2ZWwgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBhbGxEZXNjZW5kYW50czogW11cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB2YXIgc3RhY2sgPSBbZGVjb3JhdGVkQ2VsbHMucm9vdF07XG4gICAgc3RhY2sucGVlayA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGggLSAxXTtcbiAgICB9O1xuICAgIF8oZGVjb3JhdGVkQ2VsbHMpLmVhY2goZnVuY3Rpb24oY2VsbCkge1xuICAgICAgaWYgKGNlbGwuaWQgPT09ICdyb290Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB3aGlsZSAoc3RhY2sucGVlaygpLmxldmVsID49IGNlbGwubGV2ZWwpIHtcbiAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICB9XG4gICAgICBkZWNvcmF0ZWRDZWxsc1tzdGFjay5wZWVrKCkuaWRdLmNoaWxkcmVuLnB1c2goY2VsbC5pZCk7XG4gICAgICBkZWNvcmF0ZWRDZWxsc1tjZWxsLmlkXS5wYXJlbnQgPSBzdGFjay5wZWVrKCkuaWQ7XG4gICAgICBzdGFjay5mb3JFYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgZGVjb3JhdGVkQ2VsbHNbYy5pZF0uYWxsRGVzY2VuZGFudHMucHVzaChjZWxsLmlkKTtcbiAgICAgIH0pO1xuICAgICAgc3RhY2sucHVzaChjZWxsKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVjb3JhdGVkQ2VsbHM7XG4gIH07XG5cbiAgdmFyIGdlbmVyYXRlVGFnTWFwID0gZnVuY3Rpb24oY2VsbE1hcCkge1xuICAgIC8vIGluaXRpYWxpemF0aW9uIGNlbGxzXG4gICAgdmFyIGluaXRpYWxpemF0aW9uQ2VsbHMgPSBfKGNlbGxNYXApLmNoYWluKClcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucmF3ICYmIGNlbGwucmF3LmluaXRpYWxpemF0aW9uO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICBpZiAoY2VsbC5yYXcudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF8oY2VsbC5hbGxEZXNjZW5kYW50cykuY2hhaW4oKVxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2hpbGRJZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNlbGxNYXBbY2hpbGRJZF07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjLnJhdy50eXBlID09PSAnY29kZSc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudmFsdWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5mbGF0dGVuKClcbiAgICAgICAgLnVuaXEoKVxuICAgICAgICAuc29ydEJ5KGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yYXdJbmRleDtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucmF3O1xuICAgICAgICB9KVxuICAgICAgICAudmFsdWUoKTtcblxuICAgIC8vIGV2YWx1YXRvcnNcbiAgICB2YXIgZXZhbHVhdG9yTWFwID0ge307XG4gICAgZXZhbHVhdG9yTWFwLmFkZCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICghdGhpc1trZXldKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpc1trZXldLnB1c2godmFsdWUpO1xuICAgIH07XG4gICAgXyhjZWxsTWFwKS5jaGFpbigpXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnJhdyAmJiBjZWxsLnJhdy50eXBlID09PSAnY29kZSc7XG4gICAgICAgIH0pXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGNvZGVDZWxsKSB7XG4gICAgICAgICAgZXZhbHVhdG9yTWFwLmFkZChjb2RlQ2VsbC5yYXcuZXZhbHVhdG9yLCBjb2RlQ2VsbC5yYXcpO1xuICAgICAgICB9KTtcblxuICAgIC8vIHVzZXIgdGFnc1xuICAgIHZhciB1c2VyVGFnc01hcCA9IHt9O1xuICAgIHVzZXJUYWdzTWFwLmFkZCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICghdGhpc1trZXldKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpc1trZXldLnB1c2godmFsdWUpO1xuICAgIH07XG4gICAgXyhjZWxsTWFwKS5jaGFpbigpXG4gICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICByZXR1cm4gY2VsbC5yYXcgJiYgY2VsbC5yYXcudHlwZSA9PT0gJ2NvZGUnICYmIGNlbGwucmF3LnRhZ3MgIT09IHVuZGVmaW5lZCAmJiBjZWxsLnJhdy50YWdzICE9PSAnJztcbiAgICB9KVxuICAgIC5lYWNoKGZ1bmN0aW9uKGNvZGVDZWxsKSB7XG4gICAgICB2YXIgcmUgPSAvXFxzKy87XG4gICAgICB2YXIgdGFncyA9IGNvZGVDZWxsLnJhdy50YWdzLnNwbGl0KHJlKTtcbiAgICAgIHZhciBpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdXNlclRhZ3NNYXAuYWRkKHRhZ3NbaV0sIGNvZGVDZWxsLnJhdyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdGlhbGl6YXRpb246IGluaXRpYWxpemF0aW9uQ2VsbHMsXG4gICAgICBldmFsdWF0b3I6IGV2YWx1YXRvck1hcCxcbiAgICAgIHVzZXJ0YWdzOiB1c2VyVGFnc01hcFxuICAgIH07XG4gIH07XG5cbiAgdmFyIHJlcGxhY2VXaG9sZUFycmF5ID0gZnVuY3Rpb24ob2xkQXJyYXksIG5ld0FycmF5KSB7XG4gICAgdmFyIGFyZ3MgPSBfLmZsYXR0ZW4oWzAsIG9sZEFycmF5Lmxlbmd0aCwgbmV3QXJyYXldKTtcbiAgICBvbGRBcnJheS5zcGxpY2UuYXBwbHkob2xkQXJyYXksIGFyZ3MpO1xuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsIGZ1bmN0aW9uKCR0aW1lb3V0LCAkcm9vdFNjb3BlKSB7XG4gICAgdmFyIGNlbGxzID0gW107XG4gICAgdmFyIGNlbGxNYXAgPSB7fTtcbiAgICB2YXIgdGFnTWFwID0ge307XG4gICAgdmFyIHVuZG9BY3Rpb24gPSB7fTtcbiAgICB2YXIgdW5kb0FjdGlvbjIgPSB7fTtcbiAgICB2YXIgcmVkb0FjdGlvbiA9IHt9O1xuICAgIHZhciByZWRvQWN0aW9uMiA9IHt9O1xuICAgIHZhciByZWNyZWF0ZUNlbGxNYXAgPSBmdW5jdGlvbihkb05vdENsZWFyVW5kb0FjdGlvbikge1xuICAgICAgY2VsbE1hcCA9IGdlbmVyYXRlQ2VsbE1hcChjZWxscyk7XG4gICAgICB0YWdNYXAgPSBnZW5lcmF0ZVRhZ01hcChjZWxsTWFwKTtcbiAgICAgIGlmICghZG9Ob3RDbGVhclVuZG9BY3Rpb24pIHtcbiAgICAgICAgdW5kb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJlZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJlZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogT3B0aW1pemUgdGhpcyBmdW5jdGlvbiBzbyBpdCBkb2Vzbid0IGRlc3Ryb3kgdGhlIHBhZ2Ugc2Nyb2xsIGFuZCByZXF1aXJlXG4gICAgICAvLyB0aGlzIGhhY2sgYmVsb3cuXG4gICAgICAvL1xuICAgICAgLy8gTW9zdCBsaWtlbHkgYmVjYXVzZSBvZiB0aGUgbmVzdGVkIG5hdHVyZSBvZiB0aGUgY2VsbCBtYXAgYW5kIHRoZSBjZWxscyBpbiB0aGVcbiAgICAgIC8vIERPTSB0aGF0IHJlZmxlY3QgdGhhdCBjZWxsIG1hcCwgd2hlbiBvbmUgY2hhbmdlcyBzb21ldGhpbmcgYXQgdGhlIGJhc2Ugb2YgdGhlXG4gICAgICAvLyB0cmVlIChsaWtlIGFkZGluZyBhIG5ldyBzZWN0aW9uIGNlbGxcbiAgICAgIC8vIFtodHRwczovL2dpdGh1Yi5jb20vdHdvc2lnbWEvYmVha2VyLW5vdGVib29rL2lzc3Vlcy82NzJdKSwgaXQgbm90IG9ubHkgdGFrZXMgYW5cbiAgICAgIC8vIGV0ZXJuaXR5LCBidXQgcmFuZG9tbHkgc2Nyb2xscyB0byB+NjUlIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnNjcm9sbFRvcChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgfSk7XG4gICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NlbGxNYXBSZWNyZWF0ZWQnKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBfZ2V0Q2VsbE1hcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjZWxsTWFwO1xuICAgICAgfSxcbiAgICAgIF9nZXRUYWdNYXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwO1xuICAgICAgfSxcbiAgICAgIHJlc2V0OiBmdW5jdGlvbihfY2VsbHNfKSB7XG4gICAgICAgIGlmIChfY2VsbHNfKSB7XG4gICAgICAgICAgY2VsbHMgPSBfY2VsbHNfO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpcGJvYXJkID0gbnVsbDtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgICB9LFxuICAgICAgZ2V0SW5kZXg6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBjZWxsTWFwW2lkXSA/IGNlbGxNYXBbaWRdLnJhd0luZGV4IDogLTE7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbEF0SW5kZXg6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBjZWxsc1tpbmRleF07XG4gICAgICB9LFxuICAgICAgaGFzQ2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICEhY2VsbE1hcFtpZF07XG4gICAgICB9LFxuICAgICAgX2dldERlY29yYXRlZENlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0NlbGwoaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGxNYXBbaWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLnJhdztcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsVHlwZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChpZCkudHlwZTtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsTGV2ZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKGlkKS5sZXZlbDtcbiAgICAgIH0sXG4gICAgICBnZXRQYXJlbnQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBwYXJlbnRJZCA9IHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLnBhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudElkID09PSAncm9vdCcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChwYXJlbnRJZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNoaWxkSWQpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5nZXRDZWxsKGNoaWxkSWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxEZXNjZW5kYW50czogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuYWxsRGVzY2VuZGFudHMubWFwKGZ1bmN0aW9uKGNoaWxkSWQpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5nZXRDZWxsKGNoaWxkSWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxDb2RlQ2VsbHM6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICBpZCA9ICdyb290JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxEZXNjZW5kYW50cyhpZCkuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC50eXBlID09PSAnY29kZSc7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGNvZGUgY2VsbCBzdGFydGluZyB3aXRoIHRoZSBzdGFydENlbGwgYW5kIHNjYW5cbiAgICAgIC8vIHVzaW5nIHRoZSBkaXJlY3Rpb24sIGlmIHRoZSBzdGFydENlbGwgaXMgYSBjb2RlIGNlbGwsIGl0IHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgICBmaW5kQ29kZUNlbGw6IGZ1bmN0aW9uKHN0YXJ0Q2VsbElkLCBmb3J3YXJkKSB7XG4gICAgICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKHN0YXJ0Q2VsbElkKTtcbiAgICAgICAgd2hpbGUgKGNlbGwpIHtcbiAgICAgICAgICBpZiAoY2VsbC50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjZWxsID0gZm9yd2FyZCA/IHRoaXMuZ2V0TmV4dChjZWxsLmlkKSA6IHRoaXMuZ2V0UHJldihjZWxsLmlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uKGlkLCBjZWxsKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4LCAwLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRGaXJzdDogZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QoY2VsbCkpIHtcbiAgICAgICAgICB0aHJvdyAndW5hY2NlcHRhYmxlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNlbGxzLnNwbGljZSgwLCAwLCBjZWxsKTtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYmVha2VyLmNlbGwuYWRkZWQnLCBjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uKGlkLCBjZWxsKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdChjZWxsKSkge1xuICAgICAgICAgIHRocm93ICd1bmFjY2VwdGFibGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXggKyAxLCAwLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRBdDogZnVuY3Rpb24oaW5kZXgsIGNlbGwsIGRvTm90Q2xlYXJVbmRvQWN0aW9uKSB7XG4gICAgICAgIGlmIChfLmlzQXJyYXkoY2VsbCkpIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KGNlbGxzLCBbaW5kZXgsIDBdLmNvbmNhdChjZWxsKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdChjZWxsKSkge1xuICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCwgMCwgY2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3VuYWNjZXB0YWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKGRvTm90Q2xlYXJVbmRvQWN0aW9uKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpc1Bvc3NpYmxlVG9Nb3ZlVXA6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIC8vIElmIHRoZSBjZWxsIGlzbid0IGZpcnN0IChvciBub25leGlzdGVudD8pXG4gICAgICAgIHJldHVybiBbLTEsIDBdLmluZGV4T2YodGhpcy5nZXRJbmRleChpZCkpID09PSAtMTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVXA6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKGlkKTtcbiAgICAgICAgICAgIGNlbGxzW2luZGV4XSA9IHRoaXMuZ2V0Q2VsbEF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGNlbGxzW2luZGV4IC0gMV0gPSBjZWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgIH0sXG4gICAgICBpc1Bvc3NpYmxlVG9Nb3ZlRG93bjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNlbGwgaXNuJ3QgbGFzdCAob3Igbm9uZXhpc3RlbnQ/KVxuICAgICAgICByZXR1cm4gWy0xLCAoY2VsbHMubGVuZ3RoIC0gMSldLmluZGV4T2YodGhpcy5nZXRJbmRleChpZCkpID09PSAtMTtcbiAgICAgIH0sXG4gICAgICBtb3ZlRG93bjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IGNlbGxzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoaWQpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXhdID0gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCArIDEpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXggKyAxXSA9IGNlbGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgfSxcbiAgICAgIHVuZG9hYmxlRGVsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kZWxldGVVbmRvID0ge1xuICAgICAgICAgICAgdHlwZTogJ3NpbmdsZScsXG4gICAgICAgICAgICBpbmRleDogdGhpcy5nZXRJbmRleChpZCksXG4gICAgICAgICAgICBjZWxsOiB0aGlzLmdldENlbGwoaWQpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlKGlkKTtcbiAgICAgIH0sXG4gICAgICBkZWxldGU6IGZ1bmN0aW9uKGlkLCB1bmRvYWJsZSkge1xuICAgICAgICAvLyBkZWxldGUgdGhlIGNlbGwsXG4gICAgICAgIC8vIG5vdGUgdGhhdCBpZiB0aGlzIGlzIGEgc2VjdGlvbiwgaXRzIGRlc2NlbmRhbnRzIGFyZSBub3QgZGVsZXRlZC5cbiAgICAgICAgLy8gdG8gZGVsZXRlIGEgc2VjaXRvbiB3aXRoIGFsbCBpdHMgZGVzY2VuZGFudHMgdXNlIGRlbGV0ZVNlY3Rpb24gaW5zdGVhZC5cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB2YXIgZGVsZXRlZCA9IGNlbGxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgaWYgKHVuZG9hYmxlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB1bmRvQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNlbGYuaW5zZXJ0QXQoaW5kZXgsIGRlbGV0ZWQsIHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHVuZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmVkb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJlZG9BY3Rpb24yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCh0cnVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVNlY3Rpb246IGZ1bmN0aW9uKGlkLCB1bmRvYWJsZSkge1xuICAgICAgICAvLyBkZWxldGUgdGhlIHNlY3Rpb24gY2VsbCBhcyB3ZWxsIGFzIGFsbCBpdHMgZGVzY2VuZGFudHNcbiAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoaWQpO1xuICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2VsbC50eXBlICE9PSAnc2VjdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyBpcyBub3QgYSBzZWN0aW9uIGNlbGwnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICB2YXIgZGVzY2VuZGFudHMgPSB0aGlzLmdldEFsbERlc2NlbmRhbnRzKGlkKTtcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBjZWxscy5zcGxpY2UoaW5kZXgsIGRlc2NlbmRhbnRzLmxlbmd0aCArIDEpO1xuICAgICAgICBpZiAodW5kb2FibGUpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgdW5kb0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5pbnNlcnRBdChpbmRleCwgZGVsZXRlZCwgdHJ1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZWRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlZG9BY3Rpb24yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXgsIGRlc2NlbmRhbnRzLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWxldGVkO1xuICAgICAgfSxcbiAgICAgIHVuZG86IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodW5kb0FjdGlvbikge1xuICAgICAgICAgIHVuZG9BY3Rpb24uYXBwbHkoKTtcbiAgICAgICAgICByZWRvQWN0aW9uID0gcmVkb0FjdGlvbjI7XG4gICAgICAgICAgcmVkb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRvQWN0aW9uO1xuICAgICAgICAgIHVuZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIHVuZG8nKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlZG86IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVkb0FjdGlvbikge1xuICAgICAgICAgIHJlZG9BY3Rpb24uYXBwbHkoKTtcbiAgICAgICAgICByZWRvQWN0aW9uMiA9IHJlZG9BY3Rpb247XG4gICAgICAgICAgdW5kb0FjdGlvbiA9IHVuZG9BY3Rpb24yO1xuICAgICAgICAgIHVuZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIHJlZG8nKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUFsbE91dHB1dENlbGxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgXy5lYWNoKGNlbGxzLCBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXQpIHtcbiAgICAgICAgICAgICAgY2VsbC5vdXRwdXQucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZHVtcERpc3BsYXlTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY2VsbHMpIHtcbiAgICAgICAgICBfLmVhY2goY2VsbHMsIGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIGlmIChjZWxsLm91dHB1dCkge1xuICAgICAgICAgICAgICBjZWxsLm91dHB1dC5zdGF0ZSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hpZnRTZWdtZW50OiBmdW5jdGlvbihzZWdCZWdpbiwgc2VnTGVuZ3RoLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIHNoaWZ0cyBhIGNvbnRpbnVvdXMgc2VxdWVuY2Ugb2YgY2VsbHNcbiAgICAgICAgaWYgKHNlZ0JlZ2luICsgb2Zmc2V0IDwgMCB8fCBzZWdCZWdpbiArIHNlZ0xlbmd0aCAtIDEgKyBvZmZzZXQgPj0gY2VsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgJ0lsbGVnYWwgc2hpZnRpbmcsIHJlc3VsdCB3b3VsZCBiZSBvdXQgb2YgYm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzbGljZTEgPSBjZWxscy5zbGljZSgwLCBzZWdCZWdpbik7XG4gICAgICAgIHZhciBzbGljZTIgPSBjZWxscy5zbGljZShzZWdCZWdpbiwgc2VnQmVnaW4gKyBzZWdMZW5ndGgpO1xuICAgICAgICB2YXIgc2xpY2UzID0gY2VsbHMuc2xpY2Uoc2VnQmVnaW4gKyBzZWdMZW5ndGgpO1xuICAgICAgICB2YXIgdG9CZU1vdmVkO1xuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgIC8vIG1vdmluZyBmcm9tIHNsaWNlIDMgdG8gc2xpY2UgMVxuICAgICAgICAgIHRvQmVNb3ZlZCA9IHNsaWNlMy5zcGxpY2UoMCwgb2Zmc2V0KTtcbiAgICAgICAgICBzbGljZTEgPSBzbGljZTEuY29uY2F0KHRvQmVNb3ZlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW92aW5nIGZyb20gc2xpY2UgMSB0byBzbGljZSAzXG4gICAgICAgICAgdG9CZU1vdmVkID0gc2xpY2UxLnNwbGljZShzbGljZTEubGVuZ3RoICsgb2Zmc2V0LCAtb2Zmc2V0KTtcbiAgICAgICAgICBzbGljZTMgPSB0b0JlTW92ZWQuY29uY2F0KHNsaWNlMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVwbGFjZVdob2xlQXJyYXkoY2VsbHMsIF8uZmxhdHRlbihbc2xpY2UxLCBzbGljZTIsIHNsaWNlM10pKTtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICB9LFxuICAgICAgZ2V0UHJldlNpYmxpbmc6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBwYXJlbnRJZCA9IHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLnBhcmVudDtcbiAgICAgICAgaWYgKCFwYXJlbnRJZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaWJsaW5nSWRzID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChwYXJlbnRJZCkuY2hpbGRyZW47XG4gICAgICAgIHZhciBteUluZGV4QW1vbmdTaWJsaW5ncyA9IHNpYmxpbmdJZHMuaW5kZXhPZihpZCk7XG4gICAgICAgIGlmIChteUluZGV4QW1vbmdTaWJsaW5ncyA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoc2libGluZ0lkc1tteUluZGV4QW1vbmdTaWJsaW5ncyAtIDFdKTtcbiAgICAgIH0sXG4gICAgICBnZXROZXh0U2libGluZzogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucGFyZW50O1xuICAgICAgICBpZiAoIXBhcmVudElkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpYmxpbmdJZHMgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKHBhcmVudElkKS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIG15SW5kZXhBbW9uZ1NpYmxpbmdzID0gc2libGluZ0lkcy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKG15SW5kZXhBbW9uZ1NpYmxpbmdzID09PSBzaWJsaW5nSWRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKHNpYmxpbmdJZHNbbXlJbmRleEFtb25nU2libGluZ3MgKyAxXSk7XG4gICAgICB9LFxuICAgICAgaXNQb3NzaWJsZVRvTW92ZVNlY3Rpb25VcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5nZXRQcmV2U2libGluZyhpZCk7XG4gICAgICB9LFxuICAgICAgbW92ZVNlY3Rpb25VcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmdldFNlY3Rpb25MZW5ndGgoaWQpO1xuICAgICAgICB2YXIgcHJldlNpYiA9IHRoaXMuZ2V0UHJldlNpYmxpbmcoaWQpO1xuICAgICAgICBpZiAoIXByZXZTaWIpIHtcbiAgICAgICAgICB0aHJvdyAnQ2Fubm90IG1vdmUgc2VjdGlvbiB1cCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZTaWJJZCA9IHByZXZTaWIuaWQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSAtMSAqIHRoaXMuZ2V0U2VjdGlvbkxlbmd0aChwcmV2U2liSWQpO1xuICAgICAgICB0aGlzLnNoaWZ0U2VnbWVudChpbmRleCwgbGVuZ3RoLCBvZmZzZXQpO1xuICAgICAgfSxcbiAgICAgIGlzUG9zc2libGVUb01vdmVTZWN0aW9uRG93bjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5nZXROZXh0U2libGluZyhpZCk7XG4gICAgICB9LFxuICAgICAgbW92ZVNlY3Rpb25Eb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgbmV4dFNpYiA9IHRoaXMuZ2V0TmV4dFNpYmxpbmcoaWQpO1xuICAgICAgICBpZiAoIW5leHRTaWIpIHtcbiAgICAgICAgICB0aHJvdyAnQ2Fubm90IG1vdmUgc2VjdGlvbiBkb3duJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdmVTZWN0aW9uVXAobmV4dFNpYi5pZCk7XG4gICAgICB9LFxuICAgICAgZ2V0U2VjdGlvbkxlbmd0aDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgLy8gdGhlIGNlbGwgaXRzZWxmIHBsdXMgYWxsIGRlc2NlbmRhbnRzXG4gICAgICAgIHJldHVybiAxICsgdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuYWxsRGVzY2VuZGFudHMubGVuZ3RoO1xuICAgICAgfSxcblxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBoYXMgbm90IGJlZW4gdW5pdCB0ZXN0ZWRcbiAgICAgIGdldE5leHQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggPT09IGNlbGxzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCArIDEpO1xuICAgICAgfSxcbiAgICAgIGdldFByZXY6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgfSxcbiAgICAgIGlzQ29udGFpbmVyOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gaWQgPT09ICdyb290JyB8fCAhIXRoaXMuZ2V0Q2VsbChpZCkubGV2ZWw7XG4gICAgICB9LFxuICAgICAgaXNFbXB0eTogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLmFsbERlc2NlbmRhbnRzLmxlbmd0aCA9PT0gMDtcbiAgICAgIH0sXG4gICAgICBpc0xhc3Q6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmIChfLmlzRW1wdHkoY2VsbHMpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLmxhc3QoY2VsbHMpLmlkID09PSBpZDtcbiAgICAgIH0sXG4gICAgICBhcHBlbmRBZnRlcjogZnVuY3Rpb24oaWQsIGNlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDb250YWluZXIoaWQpICYmICF0aGlzLmlzRW1wdHkoaWQpKSB7XG4gICAgICAgICAgLy8gYWRkIHRvIHRhaWxcbiAgICAgICAgICB2YXIgZGVzY2VuZGFudHMgPSB0aGlzLmdldEFsbERlc2NlbmRhbnRzKGlkKTtcbiAgICAgICAgICB0aGlzLmluc2VydEFmdGVyKGRlc2NlbmRhbnRzW2Rlc2NlbmRhbnRzLmxlbmd0aCAtIDFdLmlkLCB0aGlzLmNsaXBib2FyZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYXBwZW5kIGFmdGVyXG4gICAgICAgICAgdGhpcy5pbnNlcnRBZnRlcihpZCwgY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRJbml0aWFsaXphdGlvbkNlbGxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcC5pbml0aWFsaXphdGlvbjtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsc1dpdGhFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICByZXR1cm4gdGFnTWFwLmV2YWx1YXRvcltldmFsdWF0b3JdO1xuICAgICAgfSxcbiAgICAgIGhhc1VzZXJUYWc6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcC51c2VydGFnc1t0XSAhPT0gdW5kZWZpbmVkO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxzV2l0aFVzZXJUYWc6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcC51c2VydGFnc1t0XTtcbiAgICAgIH0sXG4gICAgICBjbGlwYm9hcmQ6IG51bGwsXG4gICAgICBjdXQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmNsaXBib2FyZCkge1xuICAgICAgICAgIHRoaXMuZGVsZXRlKHRoaXMuY2xpcGJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaXBib2FyZCA9IHRoaXMuZ2V0Q2VsbChpZCk7XG4gICAgICAgIHRoaXMuZGVsZXRlKGlkKTtcbiAgICAgIH0sXG4gICAgICBwYXN0ZTogZnVuY3Rpb24oZGVzdGluYXRpb25JZCkge1xuICAgICAgICBpZiAodGhpcy5jbGlwYm9hcmQpIHtcbiAgICAgICAgICB0aGlzLmFwcGVuZEFmdGVyKGRlc3RpbmF0aW9uSWQsIHRoaXMuY2xpcGJvYXJkKTtcbiAgICAgICAgICB0aGlzLmNsaXBib2FyZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYW5TZXRVc2VyVGFnczogZnVuY3Rpb24odGFncykge1xuICAgICAgICB2YXIgcmUgPSAvXFxzKy87XG4gICAgICAgIGlmICh0YWdzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgdGdzID0gdGFncy5zcGxpdChyZSk7XG4gICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNlbGxNYXBbdGdzW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRVJST1I6IFRoZSBuYW1lIFwiJyArIHRnc1tpXSArICdcIiBpcyBhbHJlYWR5IHVzZWQgYXMgYSBjZWxsIG5hbWUuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSxcbiAgICAgIGNhblJlbmFtZUNlbGw6IGZ1bmN0aW9uKG5ld2lkKSB7XG4gICAgICAgIGlmIChjZWxsTWFwW25ld2lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuICdFUlJPUjogQ2VsbCBcIicgKyBuZXdpZCArICdcIiBhbHJlYWR5IGV4aXN0cy4nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWdNYXAudXNlcnRhZ3NbbmV3aWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gJ0VSUk9SOiBUaGUgbmFtZSBcIicgKyBuZXdpZCArICdcIiBpcyBhbHJlYWR5IHVzZWQgYXMgYSB0YWcuJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LFxuICAgICAgcmVuYW1lQ2VsbDogZnVuY3Rpb24ob2xkaWQsIG5ld2lkKSB7XG4gICAgICAgIGlmICh0aGlzLmNhblJlbmFtZUNlbGwobmV3aWQpICE9PSAnJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWR4ID0gdGhpcy5nZXRJbmRleChvbGRpZCk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgIGNlbGxzW2lkeF0uaWQgPSBuZXdpZDtcbiAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlYnVpbGRNYXBzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJiay5ub3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlclwiLCBbXSk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoXCJia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfc3Vic2NyaXB0aW9ucyA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBmdW5jdGlvbihzZXNzaW9uSWQsIG5vdGVib29rTW9kZWwpIHtcbiAgICAgICAgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXSA9XG4gICAgICAgICAgJC5jb21ldGQuc3Vic2NyaWJlKFwiL25hbWVzcGFjZS9cIiArIHNlc3Npb25JZCwgZnVuY3Rpb24ocmVwbHkpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gcmVwbHkuZGF0YS5uYW1lO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcmVwbHkuZGF0YS52YWx1ZTtcbiAgICAgICAgICAgIHZhciBzeW5jID0gcmVwbHkuZGF0YS5zeW5jO1xuICAgICAgICAgICAgdmFyIG5hbWVzcGFjZSA9IG5vdGVib29rTW9kZWwubmFtZXNwYWNlO1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gc3luYykge1xuICAgICAgICAgICAgICB2YXIgcmVwbHkyID0ge25hbWU6IG5hbWUsIGRlZmluZWQ6IGZhbHNlLCBzZXNzaW9uOiBzZXNzaW9uSWR9O1xuICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZFZhbHVlID0gbmFtZXNwYWNlW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IHJlYWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlID0gcmVhZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgcmVwbHkyLmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2UvbmFtZXNwYWNlL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkocmVwbHkyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLm5hbWVzcGFjZSA9IHt9O1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IG5vdGVib29rTW9kZWwubmFtZXNwYWNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5hbWVzcGFjZVtuYW1lXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoc3luYykge1xuICAgICAgICAgICAgICAgIHZhciByZXBseTIgPSB7bmFtZTogbmFtZSwgc2Vzc2lvbjogc2Vzc2lvbklkfTtcbiAgICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2UvbmFtZXNwYWNlL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkocmVwbHkyKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBjbGVhcjogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgIGlmIChzZXNzaW9uSWQpIHtcbiAgICAgICAgICAkLmNvbWV0ZC51bnN1YnNjcmliZShfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdKTtcbiAgICAgICAgICBkZWxldGUgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnNlc3Npb25NYW5hZ2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnNlc3Npb25NYW5hZ2VyJyxbXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsuc2Vzc2lvbicsXG4gICAgJ2JrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsXG4gICAgJ2JrLm5vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyJyxcbiAgICAnYmsucmVjZW50TWVudScsXG4gICAgJ2JrLmV2YWx1YXRvck1hbmFnZXInXG4gIF0pO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia1Nlc3Npb25NYW5hZ2VyJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtTZXNzaW9uLFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtSZWNlbnRNZW51KSB7XG5cbiAgICB2YXIgSW1hZ2VJY29uID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLnR5cGUgIT09IFwiSW1hZ2VJY29uXCIpIHtcbiAgICAgICAgdGhpcy5pbWFnZURhdGEgPSBbXTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhID0gZGF0YS5pbWFnZURhdGE7XG4gICAgICAgIHRoaXMud2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgRGF0YUZyYW1lID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLnR5cGUgIT09IFwiVGFibGVEaXNwbGF5XCIgfHwgZGF0YS5zdWJ0eXBlICE9PSBcIlRhYmxlRGlzcGxheVwiKSB7XG4gICAgICAgIHRoaXMuY29sdW1uTmFtZXMgPSBbXTtcbiAgICAgICAgdGhpcy50eXBlcyA9IFtdO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW5OYW1lcyA9IGRhdGEuY29sdW1uTmFtZXMuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMudHlwZXMgPSBkYXRhLnR5cGVzLnNsaWNlKDApO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqIGluIGRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgdmFyIHZhbHMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEudmFsdWVzW2pdKSB7XG4gICAgICAgICAgICB2YWxzLnB1c2goIHRyYW5zZm9ybUJhY2soZGF0YS52YWx1ZXNbal1baV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWx1ZXMucHVzaCh2YWxzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcyA9ICcnO1xuICAgICAgcyA9ICdEYXRhRnJhbWU6JytcbiAgICAgICAgJyAgUm93czogJyt0aGlzLnZhbHVlcy5sZW5ndGgrJ1xcbicgK1xuICAgICAgICAnICBEYXRhIGNvbHVtbnMgKHRvdGFsICcrdGhpcy5jb2x1bW5OYW1lcy5sZW5ndGgrJyBjb2x1bW5zKTpcXG4nO1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgIHMgPSBzICsgJyAgICAnK3RoaXMuY29sdW1uTmFtZXNbaV0rJyAgICcrdGhpcy50eXBlc1tpXSsnXFxuJztcbiAgICAgIH1cbiAgICAgIDtcbiAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmNvbHVtbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtbk5hbWVzO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmR0eXBlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudHlwZXM7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuZ2V0Q29sdW1uID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGkgPSB0aGlzLmNvbHVtbk5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSA8IDApXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgbyA9IFtdO1xuICAgICAgZm9yICh2YXIgaiBpbiB0aGlzLnZhbHVlcykge1xuICAgICAgICBvLnB1c2godGhpcy52YWx1ZXNbal1baV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuZ2V0Um93ID0gZnVuY3Rpb24oaSkge1xuICAgICAgaWYgKGkgPCAwIHx8IGkgPiB0aGlzLnZhbHVlcy5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgdmFyIG8gPSB7fTtcbiAgICAgIGZvciAodmFyIGogaW4gdGhpcy5jb2x1bW5OYW1lcykge1xuICAgICAgICBvW3RoaXMuY29sdW1uTmFtZXNbal1dID0gdGhpcy52YWx1ZXNbaV1bal07XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5sZW5ndGg7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUucmVtb3ZlQ29sdW1uID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGkgPSB0aGlzLmNvbHVtbk5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSA8IDApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yICh2YXIgaiBpbiB0aGlzLnZhbHVlcykge1xuICAgICAgICB0aGlzLnZhbHVlc1tqXS5zcGxpY2UoaSwxKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29sdW1uTmFtZXMuc3BsaWNlKGksMSk7XG4gICAgICB0aGlzLnR5cGVzLnNwbGljZShpLDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuYWRkQ29sdW1uID0gZnVuY3Rpb24obmFtZSwgZGF0YSwgdHlwZSkge1xuICAgICAgdmFyIGkgPSB0aGlzLmNvbHVtbk5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSA+PSAwIHx8IGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHRoaXMuY29sdW1uTmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMudHlwZXMucHVzaCgodHlwZSA9PT0gdW5kZWZpbmVkKSA/IGdldERhdGFUeXBlKGRhdGFbMF0pIDogdHlwZSk7XG4gICAgICB2YXIgbWluID0gKGRhdGEubGVuZ3RoID4gdGhpcy52YWx1ZXMubGVuZ3RoKSA/IHRoaXMudmFsdWVzLmxlbmd0aCA6IGRhdGEubGVuZ3RoO1xuICAgICAgdmFyIGo7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbWluOyBqKyspIHtcbiAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChkYXRhW2pdKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPiBkYXRhLmxlbmd0aCkge1xuICAgICAgICBmb3IgKDsgaiA8IHRoaXMudmFsdWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZXMucHVzaChbXSk7XG4gICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbHVtbk5hbWVzLmxlbmd0aCAtIDE7IGsrKykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChkYXRhW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuYWRkUm93ID0gZnVuY3Rpb24ocm93KSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yKHZhciBjIGluIHRoaXMuY29sdW1uTmFtZXMpIHtcbiAgICAgICAgaWYgKHJvd1t0aGlzLmNvbHVtbk5hbWVzW2NdXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHIucHVzaChyb3dbdGhpcy5jb2x1bW5OYW1lc1tjXV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgci5wdXNoKG51bGwpO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZXMucHVzaChyKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNQcmltaXRpdmVUeXBlKHYpIHtcbiAgICAgIGlmIChfLmlzRGF0ZSh2KSB8fCBfLmlzU3RyaW5nKHYpIHx8IF8uaXNOdW1iZXIodikgfHwgXy5pc0Jvb2xlYW4odikgfHwgXy5pc05hTih2KSB8fCBfLmlzTnVsbCh2KSB8fCBfLmlzVW5kZWZpbmVkKHYpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YVR5cGUodikge1xuICAgICAgaWYgKF8uaXNEYXRlKHYpKVxuICAgICAgICByZXR1cm4gXCJ0aW1lXCI7XG4gICAgICBpZihfLmlzTnVtYmVyKHYpKSAvLyBjYW4gd2UgZG8gYSBiZXR0ZXIgam9iIGhlcmU/XG4gICAgICAgIHJldHVybiBcImRvdWJsZVwiO1xuICAgICAgaWYoXy5pc0Jvb2xlYW4odikpXG4gICAgICAgIHJldHVybiBcImJvb2xlYW5cIjtcbiAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc0RpY3Rpb25hcnkodikge1xuICAgICAgaWYgKCFfLmlzT2JqZWN0KHYpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IodmFyIGkgaW4gdikge1xuICAgICAgICBpZiAoIWlzUHJpbWl0aXZlVHlwZSh2W2ldKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtKHYsIG5vcmVjdXJzZSkge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbih2KSB8fCBfLmlzVW5kZWZpbmVkKHYpKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYgKF8uaXNEYXRlKHYpKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJEYXRlXCI7XG4gICAgICAgIG8udGltZXN0YW1wID0gdi52YWx1ZU9mKCk7XG4gICAgICAgIHJldHVybiBvXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1ByaW1pdGl2ZVR5cGUodikpXG4gICAgICAgIHJldHVybiB2O1xuXG4gICAgICBpZiAodiBpbnN0YW5jZW9mIEltYWdlSWNvbiAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgIG8udHlwZSA9IFwiSW1hZ2VJY29uXCI7XG4gICAgICAgIG8uaW1hZ2VEYXRhID0gdi5pbWFnZURhdGE7XG4gICAgICAgIG8ud2lkdGggPSB2LndpZHRoO1xuICAgICAgICBvLmhlaWdodCA9IHYuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gb1xuICAgICAgfVxuXG4gICAgICBpZiAodiBpbnN0YW5jZW9mIERhdGFGcmFtZSAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgIG8udHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgIG8uc3VidHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgIG8udmFsdWVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgaW4gdi52YWx1ZXMpIHtcbiAgICAgICAgICB2YXIgcm93ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaiBpbiB2LnZhbHVlc1tpXSkge1xuICAgICAgICAgICAgcm93LnB1c2godHJhbnNmb3JtKHYudmFsdWVzW2ldW2pdLCB0cnVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG8udmFsdWVzLnB1c2gocm93KTtcbiAgICAgICAgfVxuICAgICAgICBvLnR5cGVzID0gXy5pc0FycmF5KHYudHlwZXMpID8gdi50eXBlcy5zbGljZSgwKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgby5jb2x1bW5OYW1lcyA9IF8uaXNBcnJheSh2LmNvbHVtbk5hbWVzKSA/IHYuY29sdW1uTmFtZXMuc2xpY2UoMCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBvXG4gICAgICB9XG5cbiAgICAgIGlmIChfLmlzQXJyYXkodikgJiYgdi5sZW5ndGg+MCkge1xuICAgICAgICB2YXIgZG9pdCA9IHRydWU7XG4gICAgICAgIGZvcih2YXIgciBpbiB2KSB7XG4gICAgICAgICAgaWYgKCFfLmlzQXJyYXkodltyXSkpIHtcbiAgICAgICAgICAgIGRvaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciBjIGluICh2W3JdKSkge1xuICAgICAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZVR5cGUodltyXVtjXSkpIHtcbiAgICAgICAgICAgICAgZG9pdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvaXQgJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgICAgby50eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgICBvLnZhbHVlcyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gdikge1xuICAgICAgICAgICAgdmFyIHJvdyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiB2W2ldKVxuICAgICAgICAgICAgICByb3cucHVzaCh0cmFuc2Zvcm0odltpXVtpdGVtXSwgdHJ1ZSkpO1xuICAgICAgICAgICAgby52YWx1ZXMucHVzaChyb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvLnN1YnR5cGUgPSBcIk1hdHJpeFwiO1xuICAgICAgICAgIG8uY29sdW1uTmFtZXMgPSBbXTtcbiAgICAgICAgICBvLnR5cGVzID0gW107XG4gICAgICAgICAgZm9yKHZhciBpIGluIHZbMF0pIHtcbiAgICAgICAgICAgIG8uY29sdW1uTmFtZXMucHVzaCgnYycraSk7XG4gICAgICAgICAgICBvLnR5cGVzLnB1c2goZ2V0RGF0YVR5cGUodlswXVtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2l0ID0gdHJ1ZTtcbiAgICAgICAgICBmb3IodmFyIHIgaW4gdikge1xuICAgICAgICAgICAgaWYgKCFpc0RpY3Rpb25hcnkodltyXSkpIHtcbiAgICAgICAgICAgICAgZG9pdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRvaXQgJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICBvLnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICAgICAgby5zdWJ0eXBlID0gXCJMaXN0T2ZNYXBzXCI7XG4gICAgICAgICAgICBvLmNvbHVtbk5hbWVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiB2W2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKG8uY29sdW1uTmFtZXMuaW5kZXhPZihqKTwwKVxuICAgICAgICAgICAgICAgICAgby5jb2x1bW5OYW1lcy5wdXNoKGopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgICAgIHZhciBvMiA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIG8uY29sdW1uTmFtZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IG8uY29sdW1uTmFtZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKHZbaV1bbl0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgIG8yLnB1c2godHJhbnNmb3JtKHZbaV1bbl0sIHRydWUpKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICBvMi5wdXNoKG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG8udmFsdWVzLnB1c2gobzIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgby50eXBlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBvLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgICAgICAgIHZhciBuID0gby5jb2x1bW5OYW1lc1tqXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZbaV1bbl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgby50eXBlcy5wdXNoKGdldERhdGFUeXBlKHZbaV1bbl0pKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChfLmlzQXJyYXkodikpIHtcbiAgICAgICAgdmFyIG8gPSBbXTtcbiAgICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgICBvLnB1c2godHJhbnNmb3JtKHZbcF0sIHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICAgIH1cblxuICAgICAgaWYgKF8uaXNPYmplY3QodikgJiYgaXNEaWN0aW9uYXJ5KHYpICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgby52YWx1ZXMgPSBbXTtcbiAgICAgICAgby5zdWJ0eXBlID0gXCJEaWN0aW9uYXJ5XCI7XG4gICAgICAgIG8uY29sdW1uTmFtZXM9IFsnS2V5JywnVmFsdWUnXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgdmFyIHIgPSBbXTtcbiAgICAgICAgICByLnB1c2goaSk7XG4gICAgICAgICAgci5wdXNoKHRyYW5zZm9ybSh2W2ldLHRydWUpKTtcbiAgICAgICAgICBvLnZhbHVlcy5wdXNoKHIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfVxuICAgICAgdmFyIG8gPSB7fTtcbiAgICAgIGZvcih2YXIgcCBpbiB2KSB7XG4gICAgICAgIG9bcF0gPSB0cmFuc2Zvcm0odltwXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtQmFjayh2KSB7XG4gICAgICBpZih2ID09PSB1bmRlZmluZWQgfHwgKCFfLmlzT2JqZWN0KHYpICYmICFfLmlzQXJyYXkodikpKVxuICAgICAgICByZXR1cm4gdjtcblxuICAgICAgaWYgKHYudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh2LnR5cGUgPT09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHYudGltZXN0YW1wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodi50eXBlID09PSBcIlRhYmxlRGlzcGxheVwiKSB7XG4gICAgICAgICAgaWYgKHYuc3VidHlwZSA9PT0gXCJEaWN0aW9uYXJ5XCIpIHtcbiAgICAgICAgICAgIHZhciBvID0ge31cbiAgICAgICAgICAgIGZvciAodmFyIHIgaW4gdi52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgb1t2LnZhbHVlc1tyXVswXV0gPSB0cmFuc2Zvcm1CYWNrKHYudmFsdWVzW3JdWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodi5zdWJ0eXBlID09PSBcIk1hdHJpeFwiKSB7XG4gICAgICAgICAgICB2YXIgbyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2LnZhbHVlcykge1xuICAgICAgICAgICAgICBvLnB1c2godi52YWx1ZXNbaV0uc2xpY2UoMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2LnN1YnR5cGUgPT09IFwiTGlzdE9mTWFwc1wiKSB7XG4gICAgICAgICAgICB2YXIgb3V0MiA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgciBpbiB2LnZhbHVlcykge1xuICAgICAgICAgICAgICB2YXIgb3V0MyA9IHsgfTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHYudmFsdWVzW3JdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHYudmFsdWVzW3JdW2ldICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgb3V0M1sgdi5jb2x1bW5OYW1lc1tpXSBdID0gdHJhbnNmb3JtQmFjayh2LnZhbHVlc1tyXVtpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb3V0Mi5wdXNoKG91dDMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dDI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBvdXQgPSBuZXcgRGF0YUZyYW1lKHYpO1xuICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHYudHlwZSA9PT0gXCJJbWFnZUljb25cIilcbiAgICAgICAgICByZXR1cm4gbmV3IEltYWdlSWNvbih2KTtcbiAgICAgIH1cbiAgICAgIGlmICghXy5pc0FycmF5KHYpKSB7XG4gICAgICAgIHZhciBvID0ge307XG4gICAgICAgIGZvcih2YXIgcCBpbiB2KSB7XG4gICAgICAgICAgb1twXSA9IHRyYW5zZm9ybUJhY2sodltwXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG87XG4gICAgICB9XG4gICAgICB2YXIgbyA9IFtdO1xuICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgby5wdXNoKHRyYW5zZm9ybUJhY2sodltwXSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuXG4gICAgdmFyIF9ub3RlYm9va1VyaSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBERUZBVUxUX1ZBTFVFID0gbnVsbDtcbiAgICAgIHZhciBfdiA9IERFRkFVTFRfVkFMVUU7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5zZXQoREVGQVVMVF9WQUxVRSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF92O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBfdiA9IHY7XG4gICAgICAgICAgaWYgKCFfLmlzRW1wdHkoX3YpKSB7XG4gICAgICAgICAgICBia1JlY2VudE1lbnUucmVjb3JkUmVjZW50RG9jdW1lbnQoZ2VuZXJhdGVSZWNlbnREb2N1bWVudEl0ZW0oKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICB2YXIgX3VyaVR5cGUgPSBudWxsO1xuICAgIHZhciBfcmVhZE9ubHkgPSBudWxsO1xuICAgIHZhciBfZm9ybWF0ID0gbnVsbDtcbiAgICB2YXIgX3Nlc3Npb25JZCA9IG51bGw7XG4gICAgdmFyIF9lZGl0ZWQgPSBmYWxzZTtcblxuICAgIHZhciBCZWFrZXJPYmplY3QgPSBmdW5jdGlvbihuYm1vZGVsKSB7XG4gICAgICB0aGlzLmtub3duQmVha2VyVmFycyA9IHsgfTtcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG4gICAgICB0aGlzLnNldENhY2hlID0geyB9O1xuICAgICAgdGhpcy5iZWFrZXJPYmogPSB7IH1cbiAgICAgIHRoaXMubmJtb2RlbCA9IG5ibW9kZWw7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuc2V0dXBCZWFrZXJPYmplY3QgPSBmdW5jdGlvbihtb2RlbE91dHB1dCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5iZWFrZXJPYmouc2hvd1Byb2dyZXNzVXBkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2hvd1Byb2dyZXNzVXBkYXRlJywgeyB2YWx1ZTogZnVuY3Rpb24gKGEsYixjKSB7XG4gICAgICAgICAgaWYgKCBhID09PSB1bmRlZmluZWQgfHwgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBpZiAoIHR5cGVvZiBhID09PSAnc3RyaW5nJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QubWVzc2FnZSA9IGE7XG4gICAgICAgICAgZWxzZSBpZiAoIHR5cGVvZiBhID09PSAnbnVtYmVyJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgPSBhO1xuICAgICAgICAgIGVsc2UgaWYgKCBhICE9PSBudWxsIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wYXlsb2FkID0gYTtcblxuICAgICAgICAgIGlmICggdHlwZW9mIGIgPT09ICdzdHJpbmcnIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gYjtcbiAgICAgICAgICBlbHNlIGlmICggdHlwZW9mIGIgPT09ICdudW1iZXInIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wcm9ncmVzc0JhciA9IGI7XG4gICAgICAgICAgZWxzZSBpZiAoIGIgIT09IG51bGwgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnBheWxvYWQgPSBiO1xuXG4gICAgICAgICAgaWYgKCB0eXBlb2YgYyA9PT0gJ3N0cmluZycgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgPSBjO1xuICAgICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgYyA9PT0gJ251bWJlcicgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnByb2dyZXNzQmFyID0gYztcbiAgICAgICAgICBlbHNlIGlmICggYyAhPT0gbnVsbCApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucGF5bG9hZCA9IGM7XG4gICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2hvd1N0YXR1cycsIHsgdmFsdWU6IGJrSGVscGVyLnNob3dTdGF0dXMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2NsZWFyU3RhdHVzJywgeyB2YWx1ZTogYmtIZWxwZXIuY2xlYXJTdGF0dXMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3Nob3dUcmFuc2llbnRTdGF0dXMnLCB7IHZhbHVlOiBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdnZXRFdmFsdWF0b3JzJywgeyB2YWx1ZTogYmtIZWxwZXIuZ2V0RXZhbHVhdG9ycywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZ2V0Q29kZUNlbGxzJywgeyB2YWx1ZTogYmtIZWxwZXIuZ2V0Q29kZUNlbGxzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzZXRDb2RlQ2VsbEJvZHknLCB7IHZhbHVlOiBia0hlbHBlci5zZXRDb2RlQ2VsbEJvZHksIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3NldENvZGVDZWxsRXZhbHVhdG9yJywgeyB2YWx1ZTogYmtIZWxwZXIuc2V0Q29kZUNlbGxFdmFsdWF0b3IsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3NldENvZGVDZWxsVGFncycsIHsgdmFsdWU6IGJrSGVscGVyLnNldENvZGVDZWxsVGFncywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZXZhbHVhdGUnLCB7IHZhbHVlOiBmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGJrSGVscGVyLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBzZWxmLmJlYWtlck9iamVjdFRvTm90ZWJvb2soKTtcbiAgICAgICAgICAgIGJrSGVscGVyLmV2YWx1YXRlKGEpLnRoZW4oZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVzb2x2ZSh0cmFuc2Zvcm1CYWNrKHIpKTsgfSwgZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVqZWN0KHIpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBkLnByb21pc2U7XG4gICAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZXZhbHVhdGVDb2RlJywgeyB2YWx1ZTogZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgdmFyIGQgPSBia0hlbHBlci5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgc2VsZi5iZWFrZXJPYmplY3RUb05vdGVib29rKCk7XG4gICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZUNvZGUoYSxiKS50aGVuKGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlc29sdmUodHJhbnNmb3JtQmFjayhyKSk7IH0sIGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlamVjdChyKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gZC5wcm9taXNlO1xuICAgICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3ByaW50Jywge3ZhbHVlOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICAgIGJrSGVscGVyLnJlY2VpdmVFdmFsdWF0aW9uVXBkYXRlKHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge291dHB1dGRhdGE6W3t0eXBlOidvdXQnLCB2YWx1ZTogaW5wdXQrXCJcXG5cIn1dfSwgXCJKYXZhU2NyaXB0XCIpO1xuICAgICAgICAgIC8vIFhYWCBzaG91bGQgbm90IGJlIG5lZWRlZCBidXQgd2hlbiBwcm9ncmVzcyBtZXRlciBpcyBzaG93biBhdCBzYW1lIHRpbWVcbiAgICAgICAgICAvLyBkaXNwbGF5IGlzIGJyb2tlbiB3aXRob3V0IHRoaXMsIHlvdSBnZXQgXCJPVVRQVVRcIiBpbnN0ZWFkIG9mIGFueSBsaW5lcyBvZiB0ZXh0LlxuICAgICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAncHJpbnRFcnJvcicsIHt2YWx1ZTogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICBia0hlbHBlci5yZWNlaXZlRXZhbHVhdGlvblVwZGF0ZShzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvdXRwdXRkYXRhOlt7dHlwZTonZXJyJywgdmFsdWU6IGlucHV0K1wiXFxuXCJ9XX0sIFwiSmF2YVNjcmlwdFwiKTtcbiAgICAgICAgICAvLyBYWFggc2hvdWxkIG5vdCBiZSBuZWVkZWQgYnV0IHdoZW4gcHJvZ3Jlc3MgbWV0ZXIgaXMgc2hvd24gYXQgc2FtZSB0aW1lXG4gICAgICAgICAgLy8gZGlzcGxheSBpcyBicm9rZW4gd2l0aG91dCB0aGlzLCB5b3UgZ2V0IFwiT1VUUFVUXCIgaW5zdGVhZCBvZiBhbnkgbGluZXMgb2YgdGV4dC5cbiAgICAgICAgICBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2xvYWRKUycsIHsgdmFsdWU6IGJrSGVscGVyLmxvYWRKUywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnbG9hZENTUycsIHsgdmFsdWU6IGJrSGVscGVyLmxvYWRDU1MsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2xvYWRMaXN0JywgeyB2YWx1ZTogYmtIZWxwZXIubG9hZExpc3QsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2h0dHBHZXQnLCB7IHZhbHVlOiBia0hlbHBlci5odHRwR2V0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdodHRwUG9zdCcsIHsgdmFsdWU6IGJrSGVscGVyLmh0dHBQb3N0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICduZXdEZWZlcnJlZCcsIHsgdmFsdWU6IGJrSGVscGVyLm5ld0RlZmVycmVkLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICduZXdQcm9taXNlJywgeyB2YWx1ZTogYmtIZWxwZXIubmV3UHJvbWlzZSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnYWxsJywgeyB2YWx1ZTogYmtIZWxwZXIuYWxsLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICd0aW1lb3V0JywgeyB2YWx1ZTogYmtIZWxwZXIudGltZW91dCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnRGF0YUZyYW1lJywgeyB2YWx1ZTogRGF0YUZyYW1lLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdJbWFnZUljb24nLCB7IHZhbHVlOiBJbWFnZUljb24sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIHRoaXMucHJlZGVmaW5lZCA9IE9iamVjdC5rZXlzKHRoaXMuYmVha2VyT2JqKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0ID0gbW9kZWxPdXRwdXQucmVzdWx0OyAvLyBYWFggb2J2aWF0ZWQgYnkgbmV4dCBsaW5lXG4gICAgICB0aGlzLl9iZWFrZXJfbW9kZWxfb3V0cHV0ID0gbW9kZWxPdXRwdXQ7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuY2xlYXJPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdCA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5iZWFrZXJHZXR0ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAodGhpcy5zZXRDYWNoZVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldENhY2hlW25hbWVdO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0Q2FjaGVbbmFtZV0gPT09IHVuZGVmaW5lZCAmJiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZ2V0Q2FjaGVbbmFtZV0gPSB0cmFuc2Zvcm1CYWNrKHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbbmFtZV0pO1xuICAgICAgLy8gdGhpcyBpcyByZXF1aXJlZCB0byBzdXBwb3J0IHN1Ym9iamVjdCBtb2RpZmljYXRpb25cbiAgICAgIHRoaXMuc2V0Q2FjaGVbbmFtZV0gPSB0aGlzLmdldENhY2hlW25hbWVdO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVbbmFtZV07XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuYmVha2VyU2V0dGVyID0gZnVuY3Rpb24obmFtZSwgdikge1xuICAgICAgdGhpcy5zZXRDYWNoZVtuYW1lXSA9IHY7XG4gICAgICBpZiAodGhpcy5iZWFrZXJTZXR0ZXJUaW1lb3V0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJrSGVscGVyLmNhbmNlbFRpbWVvdXQodGhpcy5iZWFrZXJTZXR0ZXJUaW1lb3V0KTtcbiAgICAgIHZhciBtYWtlVGltZW91dCA9IGZ1bmN0aW9uKHNlbGYpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuYmVha2VyU2V0dGVyVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBzZWxmLmJlYWtlck9iamVjdFRvTm90ZWJvb2soKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB0aGlzLmJlYWtlclNldHRlclRpbWVvdXQgPSBia0hlbHBlci50aW1lb3V0KG1ha2VUaW1lb3V0KHRoaXMpLDUwMCk7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUubm90ZWJvb2tUb0JlYWtlck9iamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2xlYXIgZ2V0Y2FjaGVcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG5cbiAgICAgIC8vIGNoZWNrIGlmIHNvbWUgb3RoZXIgbGFuZ3VhZ2UgcmVtb3ZlZCBhIGJpbmRpbmdcbiAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5rbm93bkJlYWtlclZhcnMpIHtcbiAgICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5rbm93bkJlYWtlclZhcnNbcF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuYmVha2VyT2JqW3BdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLnNldENhY2hlW3BdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHNvbWUgb3RoZXIgbGFuZ3VhZ2UgYWRkZWQgYSBiaW5kaW5nXG4gICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSkge1xuICAgICAgICAgIHZhciB0ID0gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXTtcbiAgICAgICAgICBpZiAodGhpcy5wcmVkZWZpbmVkLmluZGV4T2YocCk+PTApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYmVha2VyT2JqW3BdO1xuICAgICAgICAgICAgdGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG1ha2VHZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHNlbGYuYmVha2VyR2V0dGVyKG5hbWUpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWFrZVNldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHsgc2VsZi5iZWFrZXJTZXR0ZXIobmFtZSx2KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCBwLFxuICAgICAgICAgICAgICAgIHsgd3JpdGVhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZ2V0OiBtYWtlR2V0dGVyKHRoaXMsIHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMsIHApLFxuICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLmJlYWtlck9iamVjdFRvTm90ZWJvb2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5iZWFrZXJPYmopO1xuICAgICAgdmFyIHN0dWZmID0gT2JqZWN0LmtleXModGhpcy5rbm93bkJlYWtlclZhcnMpO1xuICAgICAgdmFyIGRpZmYgPSAkKGtleXMpLm5vdChzdHVmZikuZ2V0KCk7XG4gICAgICBkaWZmID0gJChkaWZmKS5ub3QodGhpcy5wcmVkZWZpbmVkKS5nZXQoKTtcblxuICAgICAgLy8gY2hlY2sgaWYgamF2YXNjcmlwdCByZW1vdmVkIGEgYmluZGluZ1xuICAgICAgaWYgKCB0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSkge1xuICAgICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSAhPT0gdW5kZWZpbmVkICYmIGtleXMuaW5kZXhPZihwKSA8MCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5rbm93bkJlYWtlclZhcnNbcF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGphdmFzY3JpcHQgc2V0IGFueSBORVcgdmFyaWFibGVcbiAgICAgIGZvciAodmFyIGkgaW4gZGlmZikge1xuICAgICAgICB2YXIgcCA9IGRpZmZbaV07XG4gICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgICAgdmFyIHQgPSB0aGlzLmJlYWtlck9ialtwXTtcbiAgICAgICAgICBpZiAoKHRoaXMucHJlZGVmaW5lZC5pbmRleE9mKHApPj0wIHx8IF8uaXNGdW5jdGlvbih0KSkpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIE5PVCBwdXQgZnVuY3Rpb25zIGluIHRoZSBuYW1lc3BhY2VcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMua25vd25CZWFrZXJWYXJzW3BdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldENhY2hlW3BdID0gdDtcbiAgICAgICAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzW3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBzZWxmLmJlYWtlckdldHRlcihuYW1lKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ha2VTZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHNlbGYuYmVha2VyU2V0dGVyKG5hbWUsdik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgcCxcbiAgICAgICAgICAgICAgICB7IHdyaXRlYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGdldDogbWFrZUdldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGphdmFzY3JpcHQgc2V0IGFueSBuZXcgdmFyaWFibGVcbiAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5zZXRDYWNoZSkge1xuICAgICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgIGlmICh0aGlzLmlzQ2lyY3VsYXJPYmplY3QodGhpcy5zZXRDYWNoZVtwXSkpXG4gICAgICAgICAgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXSA9IFwiRVJST1I6IGNpcmN1bGFyIG9iamVjdHMgYXJlIG5vdCBzdXBwb3J0ZWRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF0gPSB0cmFuc2Zvcm0odGhpcy5zZXRDYWNoZVtwXSk7XG4gICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuYmVha2VyT2JqW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzW3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBzZWxmLmJlYWtlckdldHRlcihuYW1lKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ha2VTZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHNlbGYuYmVha2VyU2V0dGVyKG5hbWUsdik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgcCxcbiAgICAgICAgICAgICAgICB7IHdyaXRlYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGdldDogbWFrZUdldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNsZWFyIHNldGNhY2hlIGFuZCBnZXRjYWNoZVxuICAgICAgdGhpcy5zZXRDYWNoZSA9IHsgfTtcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5pc0NpcmN1bGFyT2JqZWN0ID0gZnVuY3Rpb24obm9kZSwgcGFyZW50cykge1xuICAgICAgcGFyZW50cyA9IHBhcmVudHMgfHwgW107XG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUgIT0gXCJvYmplY3RcIil7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMobm9kZSksIGksIHZhbHVlO1xuICAgICAgcGFyZW50cy5wdXNoKG5vZGUpO1xuICAgICAgZm9yIChpID0ga2V5cy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgIHZhbHVlID0gbm9kZVtrZXlzW2ldXTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgaWYgKHBhcmVudHMuaW5kZXhPZih2YWx1ZSk+PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5pc0NpcmN1bGFyT2JqZWN0KHZhbHVlLCBwYXJlbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwYXJlbnRzLnBvcChub2RlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gICAgdmFyIF9ibyA9IHt9O1xuXG4gICAgdmFyIF9ub3RlYm9va01vZGVsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF92ID0ge307XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5zZXQoe30pO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0QmVha2VyT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX2JvO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBfdiA9IHY7XG4gICAgICAgICAgLy8gdGhpcyByZW1vdmVzIGxlZ2FjeSBkYXRhIHByZXZpb3VzbHkgc2F2ZWRcbiAgICAgICAgICBpZiAoX3YuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfdi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaWYgKF92Lm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIC8vICBfdi5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgICAgX2JvID0gbmV3IEJlYWtlck9iamVjdChfdik7XG4gICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlci5yZXNldChbXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnJlc2V0KF92LmNlbGxzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLmlzRW1wdHkoX3YpO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICF0aGlzLmlzRW1wdHkoKSAmJiAhIV92LmxvY2tlZDtcbiAgICAgICAgfSxcbiAgICAgICAgdG9Kc29uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYW5ndWxhci50b0pzb24oX3YpO1xuICAgICAgICB9LFxuICAgICAgICB0b0NsZWFuUHJldHR5SnNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy9zdHJpcCBvdXQgdGhlIHNoZWxsIElEc1xuICAgICAgICAgIHZhciBzaGVsbElkcyA9IF8oX3YuZXZhbHVhdG9ycykubWFwKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgdmFyIHNoZWxsSWQgPSBldmFsdWF0b3Iuc2hlbGxJRDtcbiAgICAgICAgICAgIGRlbGV0ZSBldmFsdWF0b3Iuc2hlbGxJRDtcbiAgICAgICAgICAgIHJldHVybiBzaGVsbElkO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGdlbmVyYXRlIHByZXR0eSBKU09OXG4gICAgICAgICAgdmFyIHByZXR0eUpzb24gPSBia1V0aWxzLnRvUHJldHR5SnNvbihfdik7XG4gICAgICAgICAgLy8gcHV0IHRoZSBzaGVsbCBJRHMgYmFja1xuICAgICAgICAgIF8oX3YuZXZhbHVhdG9ycykuZWFjaChmdW5jdGlvbihldmFsdWF0b3IsIGluZGV4KSB7XG4gICAgICAgICAgICBldmFsdWF0b3Iuc2hlbGxJRCA9IHNoZWxsSWRzW2luZGV4XTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gcHJldHR5SnNvbjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgdmFyIGdlbmVyYXRlQmFja3VwRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm90ZWJvb2tVcmk6IF9ub3RlYm9va1VyaS5nZXQoKSxcbiAgICAgICAgdXJpVHlwZTogX3VyaVR5cGUsXG4gICAgICAgIHJlYWRPbmx5OiBfcmVhZE9ubHksXG4gICAgICAgIGZvcm1hdDogX2Zvcm1hdCxcbiAgICAgICAgbm90ZWJvb2tNb2RlbEpzb246IF9ub3RlYm9va01vZGVsLnRvSnNvbigpLFxuICAgICAgICBlZGl0ZWQ6IF9lZGl0ZWRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVSZWNlbnREb2N1bWVudEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdXJpOiBfbm90ZWJvb2tVcmkuZ2V0KCksXG4gICAgICAgIHR5cGU6IF8uaXNFbXB0eShfdXJpVHlwZSkgPyBcIlwiIDogX3VyaVR5cGUsXG4gICAgICAgIHJlYWRPbmx5OiAhIV9yZWFkT25seSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgZm9ybWF0OiBfLmlzRW1wdHkoX2Zvcm1hdCkgPyBcIlwiIDogX2Zvcm1hdFxuICAgICAgfTtcbiAgICAgIHJldHVybiBhbmd1bGFyLnRvSnNvbihkYXRhKTtcbiAgICB9O1xuXG4gICAgdmFyIGdlbmVyYXRlU2F2ZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVyaVR5cGU6IF91cmlUeXBlLFxuICAgICAgICBub3RlYm9va1VyaTogX25vdGVib29rVXJpLmdldCgpLFxuICAgICAgICBub3RlYm9va01vZGVsQXNTdHJpbmc6IF9ub3RlYm9va01vZGVsLnRvQ2xlYW5QcmV0dHlKc29uKClcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBfc3Vic2NyaXB0aW9ucyA9IHt9O1xuICAgIHZhciBjb25uZWN0Y29udHJvbCA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXSA9XG4gICAgICAgICAgJC5jb21ldGQuc3Vic2NyaWJlKFwiL25vdGVib29rY3RybC9cIiArIHNlc3Npb25JZCwgZnVuY3Rpb24ocmVxKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwiYmtIZWxwZXIuXCIrcmVxLmRhdGEubWV0aG9kO1xuICAgICAgICAgICAgICB2YXIgbnVtYXJncyA9IHJlcS5kYXRhLm51bWFyZ3M7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IG51bWFyZ3M7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goIHJlcS5kYXRhW1wiYXJnXCIraV0gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgcHVibGlzaCA9IHRydWU7XG4gICAgICAgICAgICAgIHZhciByZXBseTIgPSB7IHNlc3Npb246IHNlc3Npb25JZCB9O1xuICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSBldmFsKG5hbWUpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICBpZih0eXBlb2YgcmVwbHkyLnZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiByZXBseTIudmFsdWUucHJvbWlzZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHJlcGx5Mi52YWx1ZS5wcm9taXNlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZSA9IHJlcGx5Mi52YWx1ZS5wcm9taXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcmVwbHkyLnZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIC8vIG11c3Qgd2FpdCBmb3IgcmVzdWx0IHRvIGJlIHJlYWR5XG4gICAgICAgICAgICAgICAgICBwdWJsaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICByZXBseTIudmFsdWUudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlPXJlcztcbiAgICAgICAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KHJlcGx5MikpO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZT1lcnI7XG4gICAgICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChyZXBseTIudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAocHVibGlzaCkge1xuICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0FUQ0ggXCIrZXJyKTtcbiAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KCB7IHNlc3Npb246IHNlc3Npb25JZCwgdmFsdWU6IGZhbHNlIH0gKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZGlzY29ubmVjdGNvbnRyb2wgPSBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgaWYgKHNlc3Npb25JZCkge1xuICAgICAgICAgICQuY29tZXRkLnVuc3Vic2NyaWJlKF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF0pO1xuICAgICAgICAgIGRlbGV0ZSBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc2V0OiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQpIHtcblxuICAgICAgICAvLyBiYWNrdXAgZXhpc3Rpbmcgc2Vzc2lvbiBpZiBpdCdzIG5vdCBlbXB0eS5cbiAgICAgICAgaWYgKF9zZXNzaW9uSWQgJiYgIV9ub3RlYm9va01vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICAgIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9zZXNzaW9uSWQpXG4gICAgICAgICAgZGlzY29ubmVjdGNvbnRyb2woX3Nlc3Npb25JZCk7XG5cbiAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLnJlc2V0KCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgICAgc2Vzc2lvbklkID0gYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgX3VyaVR5cGUgPSB1cmlUeXBlO1xuICAgICAgICBfcmVhZE9ubHkgPSByZWFkT25seTtcbiAgICAgICAgX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgX25vdGVib29rVXJpLnNldChub3RlYm9va1VyaSk7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLnNldChub3RlYm9va01vZGVsKTtcbiAgICAgICAgX2VkaXRlZCA9ICEhZWRpdGVkO1xuICAgICAgICBfc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuXG4gICAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIuaW5pdChzZXNzaW9uSWQsIG5vdGVib29rTW9kZWwpO1xuICAgICAgICBjb25uZWN0Y29udHJvbChzZXNzaW9uSWQpO1xuICAgICAgICBia1Nlc3Npb24uYmFja3VwKF9zZXNzaW9uSWQsIGdlbmVyYXRlQmFja3VwRGF0YSgpKTtcbiAgICAgIH0sXG4gICAgICBzZXRTZXNzaW9uSWQ6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICBpZiAoIXNlc3Npb25JZCkge1xuICAgICAgICAgIHNlc3Npb25JZCA9IGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgfVxuICAgICAgICBfc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgICAgICByZXR1cm4gX3Nlc3Npb25JZDtcbiAgICAgIH0sXG4gICAgICBzZXR1cDogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgICAgc2Vzc2lvbklkID0gYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgX3VyaVR5cGUgPSB1cmlUeXBlO1xuICAgICAgICBfcmVhZE9ubHkgPSByZWFkT25seTtcbiAgICAgICAgX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgX25vdGVib29rVXJpLnNldChub3RlYm9va1VyaSk7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLnNldChub3RlYm9va01vZGVsKTtcbiAgICAgICAgX2VkaXRlZCA9ICEhZWRpdGVkO1xuICAgICAgICBfc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuXG4gICAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIuaW5pdChzZXNzaW9uSWQsIG5vdGVib29rTW9kZWwpO1xuICAgICAgICBjb25uZWN0Y29udHJvbChzZXNzaW9uSWQpO1xuICAgICAgICBia1Nlc3Npb24uYmFja3VwKF9zZXNzaW9uSWQsIGdlbmVyYXRlQmFja3VwRGF0YSgpKTtcbiAgICAgIH0sXG4gICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGRpc2Nvbm5lY3Rjb250cm9sKF9zZXNzaW9uSWQpO1xuICAgICAgICBia0V2YWx1YXRvck1hbmFnZXIucmVzZXQoKTtcbiAgICAgICAgYmtOb3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlci5jbGVhcihfc2Vzc2lvbklkKTtcbiAgICAgICAgX25vdGVib29rVXJpLnJlc2V0KCk7XG4gICAgICAgIF91cmlUeXBlID0gbnVsbDtcbiAgICAgICAgX3JlYWRPbmx5ID0gbnVsbDtcbiAgICAgICAgX2Zvcm1hdCA9IG51bGw7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLnJlc2V0KCk7XG4gICAgICAgIF9zZXNzaW9uSWQgPSBudWxsO1xuICAgICAgICBfZWRpdGVkID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlci5leGl0QW5kUmVtb3ZlQWxsRXZhbHVhdG9ycygpO1xuICAgICAgICAgIHNlbGYuY2xlYXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKF9zZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uLmNsb3NlKF9zZXNzaW9uSWQpLnRoZW4oY2xvc2UpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBiYWNrdXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX3Nlc3Npb25JZCAmJiAhX25vdGVib29rTW9kZWwuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZU5vdGVib29rVXJpOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCkge1xuICAgICAgICAvLyB0byBiZSB1c2VkIGJ5IHNhdmUtYXNcbiAgICAgICAgX3VyaVR5cGUgPSB1cmlUeXBlO1xuICAgICAgICBfcmVhZE9ubHkgPSByZWFkT25seTtcbiAgICAgICAgX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgX25vdGVib29rVXJpLnNldChub3RlYm9va1VyaSk7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tUaXRsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfbm90ZWJvb2tVcmkuZ2V0KCkpIHtcbiAgICAgICAgICByZXR1cm4gX25vdGVib29rVXJpLmdldCgpLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCJOZXcgTm90ZWJvb2tcIjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzU2F2YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tVcmkgJiYgIV9yZWFkT25seTtcbiAgICAgIH0sXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiB0cmlnZ2VycyBhbGwgZGlzcGxheSBpbXBsZW1lbnRhdGlvbnMgdG8gc2F2ZSB0aGUgY3VycmVudCBvdXRwdXQgc3RhdHVzLlxuICAgICAgICogVGhpcyBzYXZlIGlzIGFzeW5jaHJvbm91cyBhbmQgaGFwcGVucyBpbiB0aGUgY3VycmVudCBkaWdlc3QgbG9vcC5cbiAgICAgICAqIFVzZXJzIG11c3Qgc2NoZWR1bGUgYSB0aW1lb3V0IHRvIGV4ZWN1dGUgY29kZSB0aGF0IHJlcXVpcmVzIHRoZSBkdW1wZWQgc3RhdGUuXG4gICAgICAgKi9cbiAgICAgIGR1bXBEaXNwbGF5U3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nZXROb3RlYm9va0NlbGxPcCgpLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIGdldFNhdmVEYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlU2F2ZURhdGEoKTtcbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va01vZGVsQXNTdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwudG9Kc29uKCk7XG4gICAgICB9LFxuICAgICAgZ2V0UmF3Tm90ZWJvb2tNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tNb2RlbC5nZXQoKTtcbiAgICAgIH0sXG4gICAgICBnZXRCZWFrZXJPYmplY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwuZ2V0QmVha2VyT2JqZWN0KCk7XG4gICAgICB9LFxuICAgICAgZ2V0U2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9zZXNzaW9uSWQ7XG4gICAgICB9LFxuICAgICAgaXNTZXNzaW9uVmFsaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV9zZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKFwiZmFsc2VcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbi5nZXRTZXNzaW9ucygpLnRoZW4oZnVuY3Rpb24oc2Vzc2lvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBfKHNlc3Npb25zKS5jaGFpbigpLmtleXMoKS5jb250YWlucyhfc2Vzc2lvbklkKS52YWx1ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gVE9ETywgbW92ZSB0aGUgZm9sbG93aW5nIGltcGwgdG8gYSBkZWRpY2F0ZWQgbm90ZWJvb2sgbW9kZWwgbWFuYWdlclxuICAgICAgLy8gYnV0IHN0aWxsIGV4cG9zZSBpdCBoZXJlXG4gICAgICBzZXROb3RlYm9va01vZGVsRWRpdGVkOiBmdW5jdGlvbihlZGl0ZWQpIHtcbiAgICAgICAgX2VkaXRlZCA9IGVkaXRlZDtcbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTW9kZWxFZGl0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2VkaXRlZDtcbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmlzTG9ja2VkKCk7XG4gICAgICB9LFxuICAgICAgdG9nZ2xlTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV9ub3RlYm9va01vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICAgIGlmICghX25vdGVib29rTW9kZWwuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkubG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkubG9ja2VkID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfZWRpdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWx1YXRvclVudXNlZDogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIHZhciBuID0gXy5maW5kKF9ub3RlYm9va01vZGVsLmdldCgpLmNlbGxzLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjLnR5cGUgPT0gXCJjb2RlXCIgJiYgYy5ldmFsdWF0b3IgPT0gcGx1Z2luO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICFuO1xuICAgICAgfSxcbiAgICAgIGFkZEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLmdldCgpLmV2YWx1YXRvcnMucHVzaChldmFsdWF0b3IpO1xuICAgICAgICBfZWRpdGVkID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVFdmFsdWF0b3I6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICB2YXIgbW9kZWwgPSBfbm90ZWJvb2tNb2RlbC5nZXQoKTtcbiAgICAgICAgbW9kZWwuZXZhbHVhdG9ycyA9IF8ucmVqZWN0KG1vZGVsLmV2YWx1YXRvcnMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gZS5wbHVnaW4gPT0gcGx1Z2luO1xuICAgICAgICB9KTtcbiAgICAgICAgX2VkaXRlZCA9IHRydWU7XG4gICAgICB9LFxuICAgICAgcmVjb25uZWN0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIucmVjb25uZWN0RXZhbHVhdG9ycygpO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rQ2VsbE9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rTmV3Q2VsbEZhY3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5ld0NvZGVDZWxsOiBmdW5jdGlvbihldmFsdWF0b3IsIGlkKSB7XG4gICAgICAgICAgICBpZiAoIWV2YWx1YXRvcikge1xuICAgICAgICAgICAgICBldmFsdWF0b3IgPSBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzWzBdLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgIGlkID0gXCJjb2RlXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBcImlkXCI6IGlkLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJjb2RlXCIsXG4gICAgICAgICAgICAgIFwiZXZhbHVhdG9yXCI6IGV2YWx1YXRvcixcbiAgICAgICAgICAgICAgXCJpbnB1dFwiOiB7XG4gICAgICAgICAgICAgICAgXCJib2R5XCI6IFwiXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJvdXRwdXRcIjoge31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXdTZWN0aW9uQ2VsbDogZnVuY3Rpb24obGV2ZWwsIHRpdGxlLCBpZCkge1xuICAgICAgICAgICAgaWYgKCFsZXZlbCAmJiBsZXZlbCAhPT0gMCkge1xuICAgICAgICAgICAgICBsZXZlbCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGV2ZWwgPD0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBcImNyZWF0aW5nIHNlY3Rpb24gY2VsbCB3aXRoIGxldmVsIFwiICsgbGV2ZWwgKyBcIiBpcyBub3QgYWxsb3dlZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICAgICAgICB0aXRsZSA9IFwiTmV3IFNlY3Rpb24gSFwiICsgbGV2ZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgaWQgPSBcInNlY3Rpb25cIiArIGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIFwiaWRcIjogaWQsXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlY3Rpb25cIixcbiAgICAgICAgICAgICAgXCJ0aXRsZVwiOiB0aXRsZSxcbiAgICAgICAgICAgICAgXCJsZXZlbFwiOiBsZXZlbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5ld01hcmtkb3duQ2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHZhciB0YWlsID0gX25vdGVib29rTW9kZWwuZ2V0KCkuY2VsbHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgaWQgPSBcIm1hcmtkb3duXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBcImlkXCI6IGlkLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJtYXJrZG93blwiLFxuICAgICAgICAgICAgICBcImJvZHlcIjogXCJcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaXNSb290Q2VsbEluaXRpYWxpemF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmdldCgpLmluaXRpYWxpemVBbGw7XG4gICAgICB9LFxuICAgICAgc2V0Um9vdENlbGxJbml0aWFsaXphdGlvbjogZnVuY3Rpb24oaW5pdGlhbGl6YXRpb24pIHtcbiAgICAgICAgaWYgKGluaXRpYWxpemF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vdGVib29rTW9kZWxBZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKG5ld0V2YWx1YXRvcikge1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzLnB1c2gobmV3RXZhbHVhdG9yKTtcbiAgICAgIH0sXG4gICAgICBub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfbm90ZWJvb2tNb2RlbC5nZXQoKS5pbml0aWFsaXplQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5nZXRBbGxDb2RlQ2VsbHMoXCJyb290XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldE5vdGVib29rQ2VsbE9wKCkuZ2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnVuZG8oKTtcbiAgICAgIH0sXG4gICAgICByZWRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIucmVkbygpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rXG4gKiBUaGlzIGlzIHRoZSAnbm90ZWJvb2sgdmlldycgcGFydCBvZiB7QGxpbmsgYmtBcHB9LiBXaGF0IGlzIHRoZSByb290IGNlbGwgaG9sZGluZyB0aGUgbmVzdGVkXG4gKiB7QGxpbmsgYmtDZWxsfXMuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snLCBbXG4gICAgJ2JrLmNvbW1vblVpJyxcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5vdXRwdXRMb2cnLFxuICAgICdiay5jb3JlJyxcbiAgICAnYmsuc2Vzc2lvbk1hbmFnZXInLFxuICAgICdiay5ldmFsdWF0b3JNYW5hZ2VyJyxcbiAgICAnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICAnYmsub3V0cHV0RGlzcGxheSdcbiAgXSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia0NlbGxcbiAqIC0gdGhlIGNvbnRyb2xsZXIgdGhhdCByZXNwb25zaWJsZSBmb3IgZGlyZWN0bHkgY2hhbmdpbmcgdGhlIHZpZXdcbiAqIC0gdGhlIGNvbnRhaW5lciBmb3Igc3BlY2lmaWMgdHlwZWQgY2VsbFxuICogLSB0aGUgZGlyZWN0aXZlIGlzIGRlc2lnbmVkIHRvIGJlIGNhcGFibGUgb2YgdXNlZCBpbiBhIG5lc3RlZCB3YXlcbiAqIC0gY29uY2VwdHVhbGx5LCBhIGNlbGwgaXMgJ2NlbGwgbW9kZWwnICsgJ3ZpZXcgbW9kZWwnKGFuIGV4YW1wbGUgb2Ygd2hhdCBnb2VzIGluIHRvIHRoZSB2aWV3XG4gKiBtb2RlbCBpcyBjb2RlIGNlbGwgYmcgY29sb3IpXG4gKiAtIEEgYmtDZWxsIGlzIGdlbmVyaWNhbGx5IGNvcnJlc3BvbmRzIHRvIGEgcG9ydGlvbiBvZiB0aGUgbm90ZWJvb2sgbW9kZWwgKGN1cnJlbnRseSwgaXQgaXNcbiAqIGFsd2F5cyBhIGJyYW5jaCBpbiB0aGUgaGllcmFyY2h5KVxuICogLSBXaGVuIGV4cG9ydGluZyAoYS5rLmEuIHNoYXJpbmcpLCB3ZSB3aWxsIG5lZWQgYm90aCB0aGUgY2VsbCBtb2RlbCBhbmQgdGhlIHZpZXcgbW9kZWxcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ2VsbCcsIGZ1bmN0aW9uKGJrVXRpbHMsIGJrU2Vzc2lvbk1hbmFnZXIsIGJrQ29yZU1hbmFnZXIsIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NlbGwnXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY2VsbG1vZGVsOiAnPScsXG4gICAgICAgIGluZGV4OiAnPSdcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGdldEJrQmFzZVZpZXdNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpLmdldFZpZXdNb2RlbCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gbm90ZWJvb2tDZWxsT3AuaXNMYXN0KCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9LCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICRzY29wZS5pc0xhcmdlID0gbmV3VmFsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcgPSB7XG4gICAgICAgICAgc2hvd0RlYnVnSW5mbzogZmFsc2UsXG4gICAgICAgICAgbWVudToge1xuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgcmVuYW1lSXRlbTogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICBfLmZpbmRXaGVyZSh0aGlzLml0ZW1zLFxuICAgICAgICAgICAgICAgIHtuYW1lOiBvcHRzLm5hbWV9XG4gICAgICAgICAgICAgICkubmFtZSA9IG9wdHMubmV3TmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRJdGVtOiBmdW5jdGlvbihtZW51SXRlbSkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobWVudUl0ZW0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0hlYWQ6IGZ1bmN0aW9uKG1lbnVJdGVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKDAsIDAsIG1lbnVJdGVtKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtOiBmdW5jdGlvbihpdGVtTmFtZSkge1xuICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoXy5maW5kKHRoaXMuaXRlbXMsIGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IGl0ZW1OYW1lO1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTG9ja2VkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5uZXdDZWxsTWVudUNvbmZpZyA9IHtcbiAgICAgICAgICBpc1Nob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICFia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKSAmJiAhbm90ZWJvb2tDZWxsT3AuaXNDb250YWluZXIoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRhY2hDZWxsOiBmdW5jdGlvbihuZXdDZWxsKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5pbnNlcnRBZnRlcigkc2NvcGUuY2VsbG1vZGVsLmlkLCBuZXdDZWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZDZWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmdldE5lc3RlZExldmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuZ2V0RnVsbEluZGV4KCkgKyAnLicgKyAoJHNjb3BlLmluZGV4ICsgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICRzY29wZS5pbmRleCArICRzY29wZS5nZXROZXN0ZWRMZXZlbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTaG93RGVidWdJbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm8gPSAhJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm87XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc1Nob3dEZWJ1Z0luZm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm87XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc0RlYnVnZ2luZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBnZXRCa0Jhc2VWaWV3TW9kZWwoKS5pc0RlYnVnZ2luZygpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0TmVzdGVkTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBia0NlbGwgaXMgdXNpbmcgaXNvbGF0ZWQgc2NvcGUsICRzY29wZSBpcyB0aGUgaXNvbGF0ZWQgc2NvcGVcbiAgICAgICAgICAvLyAkc2NvcGUuJHBhcmVudCBpcyB0aGUgc2NvcGUgcmVzdWx0ZWQgZnJvbSBuZy1yZXBlYXQgKG5nLXJlcGVhdCBjcmVhdGVzIGEgcHJvdG90eXBhbFxuICAgICAgICAgIC8vIHNjb3BlIGZvciBlYWNoIG5nLXJlcGVhdGVkIGl0ZW0pXG4gICAgICAgICAgLy8gJFNjb3BlLiRwYXJlbnQuJHBhcmVudCBpcyB0aGUgY29udGFpbmVyIGNlbGwod2hpY2ggaW5pdGlhdGVzIG5nLXJlcGVhdCkgc2NvcGVcbiAgICAgICAgICB2YXIgcGFyZW50ID0gJHNjb3BlLiRwYXJlbnQuJHBhcmVudDtcbiAgICAgICAgICByZXR1cm4gcGFyZW50LmdldE5lc3RlZExldmVsID8gcGFyZW50LmdldE5lc3RlZExldmVsKCkgKyAxIDogMTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFBhcmVudElkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LiRwYXJlbnQuY2VsbG1vZGVsID8gJHNjb3BlLiRwYXJlbnQuJHBhcmVudC5jZWxsbW9kZWwuaWQgOiAncm9vdCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZUNlbGxJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbikge1xuICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5zdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpXG4gICAgICAgICAgICAuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwpXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlbGV0ZUNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5kZWxldGUoJHNjb3BlLmNlbGxtb2RlbC5pZCwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3IoJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlTWV0aG9kID0gJ21vdmUnO1xuICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC50eXBlID09ICdzZWN0aW9uJykge1xuICAgICAgICAgIG1vdmVNZXRob2QgPSAnbW92ZVNlY3Rpb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsVXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcFttb3ZlTWV0aG9kICsgJ1VwJ10oJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsRG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wW21vdmVNZXRob2QgKyAnRG93biddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbFVwRGlzYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIW5vdGVib29rQ2VsbE9wWydpc1Bvc3NpYmxlVG8nICsgXy5zdHJpbmcuY2FwaXRhbGl6ZShtb3ZlTWV0aG9kKSArICdVcCddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbERvd25EaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhbm90ZWJvb2tDZWxsT3BbJ2lzUG9zc2libGVUbycgKyBfLnN0cmluZy5jYXBpdGFsaXplKG1vdmVNZXRob2QpICsgJ0Rvd24nXSgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnRGVsZXRlIGNlbGwnLFxuICAgICAgICAgIGFjdGlvbjogJHNjb3BlLmRlbGV0ZUNlbGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ01vdmUgdXAnLFxuICAgICAgICAgIGFjdGlvbjogJHNjb3BlLm1vdmVDZWxsVXAsXG4gICAgICAgICAgZGlzYWJsZWQ6ICRzY29wZS5tb3ZlQ2VsbFVwRGlzYWJsZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ01vdmUgZG93bicsXG4gICAgICAgICAgYWN0aW9uOiAkc2NvcGUubW92ZUNlbGxEb3duLFxuICAgICAgICAgIGRpc2FibGVkOiAkc2NvcGUubW92ZUNlbGxEb3duRGlzYWJsZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ0N1dCcsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmN1dCgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdQYXN0ZSAoYXBwZW5kIGFmdGVyKScsXG4gICAgICAgICAgZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICFub3RlYm9va0NlbGxPcC5jbGlwYm9hcmQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucGFzdGUoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0VHlwZUNlbGxVcmwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdHlwZSA9ICRzY29wZS5jZWxsbW9kZWwudHlwZTtcbiAgICAgICAgICByZXR1cm4gdHlwZSArICctY2VsbC5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNDb2RlQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLnR5cGUgPT0gJ2NvZGUnO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29kZUNlbGwnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgJHRpbWVvdXQpIHtcblxuICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfTtcbiAgICB2YXIgQ0VMTF9UWVBFID0gJ2NvZGUnO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsJ10oKSxcbiAgICAgIHNjb3BlOiB7Y2VsbG1vZGVsOiAnPScsIGNlbGxtZW51OiAnPSd9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5jZWxsdmlldyA9IHtcbiAgICAgICAgICBpbnB1dE1lbnU6IFtdLFxuICAgICAgICAgIGRpc3BsYXlzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0xvY2tlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhKCRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvL2pzY3M6ZGlzYWJsZVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsID09PSB1bmRlZmluZWQgfHwgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQgPT09IHVuZGVmaW5lZCB8fCAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9qc2NzOmVuYWJsZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB0eXBlID0gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0LmlubmVydHlwZTtcblxuICAgICAgICAgIGlmICghdHlwZSAmJiAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQucGF5bG9hZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0eXBlID0gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0LnBheWxvYWQuaW5uZXJ0eXBlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0eXBlID09ICdFcnJvcic7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd0lucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5pc0xvY2tlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgLy8gZW5zdXJlIGNtIHJlZnJlc2hlcyB3aGVuICd1bmhpZGUnXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzU2hvd0lucHV0KCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNtICYmIG5ld1ZhbHVlID09PSB0cnVlICYmIG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNtLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmlzSGlkZGVuT3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnNlbGVjdGVkVHlwZSA9PSAnSGlkZGVuJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaGFzT3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5iYWNrZ3JvdW5kQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLmlzU2hvd0lucHV0KCkgfHwgJChldmVudC50b0VsZW1lbnQpLnBhcmVudHMoKS5oYXNDbGFzcygnY29kZS1jZWxsLW91dHB1dCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB0b3AgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgdmFyIG91dHB1dEVsZW1lbnQgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5jaGlsZHJlbignLmNvZGUtY2VsbC1vdXRwdXQ6Zmlyc3QnKTtcbiAgICAgICAgICB2YXIgYm90dG9tO1xuICAgICAgICAgIGlmIChvdXRwdXRFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IG91dHB1dEVsZW1lbnQub2Zmc2V0KCkudG9wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib3R0b20gPSB0b3AgKyAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5oZWlnaHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRXZlbiBiZXR0ZXIgd291bGQgYmUgdG8gZGV0ZWN0IGxlZnQvcmlnaHQgYW5kIG1vdmUgdG9cbiAgICAgICAgICAvLyBiZWdpbm5pbmcgb3IgZW5kIG9mIGxpbmUsIGJ1dCB3ZSBjYW4gbGl2ZSB3aXRoIHRoaXMgZm9yIG5vdy5cbiAgICAgICAgICB2YXIgY20gPSAkc2NvcGUuY207XG4gICAgICAgICAgaWYgKGV2ZW50LnBhZ2VZIDwgKHRvcCArIGJvdHRvbSkgLyAyKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoMCwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihjbS5saW5lQ291bnQoKSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgY20uZ2V0TGluZShjbS5sYXN0TGluZSgpKS5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc1Nob3dPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAhKHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IHJlc3VsdCA9PT0gbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm91dHB1dFRpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5pc0Vycm9yKCkgPyAnRXJyb3InIDogbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZXZhbHVhdGUgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBpZiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuc3RhdGUgPSB7fTtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwpLlxuICAgICAgICAgICAgICBjYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2YWx1YXRpb24gZmFpbGVkJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZWRpdGVkTGlzdGVuZXIgPSBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaWQnLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5ldmFsdWF0b3InLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pbml0aWFsaXphdGlvbicsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmlucHV0LmJvZHknLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5vdXRwdXQucmVzdWx0JywgZWRpdGVkTGlzdGVuZXIpO1xuXG4gICAgICAgICRzY29wZS5hdXRvY29tcGxldGUgPSBmdW5jdGlvbihjcG9zLCBvblJlc3VsdHMpIHtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9yID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcigkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcik7XG4gICAgICAgICAgaWYgKCFldmFsdWF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV2YWx1YXRvci5hdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIGV2YWx1YXRvci5hdXRvY29tcGxldGUoJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5ib2R5LCBjcG9zLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdG9yLmF1dG9jb21wbGV0ZTIpIHtcbiAgICAgICAgICAgIC8vIHVzZWQgYnkgSmF2YVNjcmlwdCBldmFsdWF0b3JcbiAgICAgICAgICAgIGV2YWx1YXRvci5hdXRvY29tcGxldGUyKCRzY29wZS5jbSwgbnVsbCwgb25SZXN1bHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3IoJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUudXBkYXRlVUkgPSBmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNtICYmIGV2YWx1YXRvcikge1xuICAgICAgICAgICAgJHNjb3BlLmNtLnNldE9wdGlvbignbW9kZScsIGV2YWx1YXRvci5jbU1vZGUpO1xuICAgICAgICAgICAgaWYgKGV2YWx1YXRvci5pbmRlbnRTcGFjZXMpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNtLnNldE9wdGlvbignaW5kZW50VW5pdCcsIGV2YWx1YXRvci5pbmRlbnRTcGFjZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZ2V0RXZhbHVhdG9yKCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAkc2NvcGUudXBkYXRlVUkobmV3VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmFwcGVuZENvZGVDZWxsID0gZnVuY3Rpb24oZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgIHZhciB0aGlzQ2VsbElkID0gJHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICBpZiAoIWV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIGV2YWx1YXRvciBzcGVjaWZpZWQsIHVzZSB0aGUgY3VycmVudCBldmFsdWF0b3JcbiAgICAgICAgICAgIGV2YWx1YXRvck5hbWUgPSAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5ld0NlbGwgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rTmV3Q2VsbEZhY3RvcnkoKS5uZXdDb2RlQ2VsbChldmFsdWF0b3JOYW1lKTtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5hcHBlbmRBZnRlcih0aGlzQ2VsbElkLCBuZXdDZWxsKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oQ0VMTF9UWVBFKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNoYXJlTWVudSA9IHtcbiAgICAgICAgICBuYW1lOiAnU2hhcmUnLFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbShzaGFyZU1lbnUpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRTaGFyZU1lbnVQbHVnaW4oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnU2hvdyBpbnB1dCBjZWxsJyxcbiAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnU2hvdyBvdXRwdXQgY2VsbCAoaWYgYXZhaWxhYmxlKScsXG4gICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbjtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ0luaXRpYWxpemF0aW9uIENlbGwnLFxuICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ09wdGlvbnMnLFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3dGdWxsTW9kYWxEaWFsb2coZnVuY3Rpb24gY2IocikgeyB9ICxcbiAgICAgICAgICAgICAgICAnYXBwL21haW5hcHAvZGlhbG9ncy9jb2RlY2VsbG9wdGlvbnMuanN0Lmh0bWwnLCAnQ29kZUNlbGxPcHRpb25zQ29udHJvbGxlcicsICRzY29wZS5jZWxsbW9kZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuc2hvd0RlYnVnID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gaXNGdWxsU2NyZWVuKGNtKSB7XG4gICAgICAgICAgcmV0dXJuIC9cXGJDb2RlTWlycm9yLWZ1bGxzY3JlZW5cXGIvLnRlc3QoY20uZ2V0V3JhcHBlckVsZW1lbnQoKS5jbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2luSGVpZ2h0KCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRGdWxsU2NyZWVuKGNtLCBmdWxsKSB7XG4gICAgICAgICAgdmFyIHdyYXAgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuICAgICAgICAgIGlmIChmdWxsKSB7XG4gICAgICAgICAgICB3cmFwLmNsYXNzTmFtZSArPSAnIENvZGVNaXJyb3ItZnVsbHNjcmVlbic7XG4gICAgICAgICAgICB3cmFwLnN0eWxlLmhlaWdodCA9IHdpbkhlaWdodCgpICsgJ3B4JztcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3cmFwLmNsYXNzTmFtZSA9IHdyYXAuY2xhc3NOYW1lLnJlcGxhY2UoJyBDb2RlTWlycm9yLWZ1bGxzY3JlZW4nLCAnJyk7XG4gICAgICAgICAgICB3cmFwLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzaG93aW5nID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdDb2RlTWlycm9yLWZ1bGxzY3JlZW4nKVswXTtcbiAgICAgICAgICBpZiAoIXNob3dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hvd2luZy5Db2RlTWlycm9yLmdldFdyYXBwZXJFbGVtZW50KCkuc3R5bGUuaGVpZ2h0ID0gd2luSGVpZ2h0KCkgKyAncHgnO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgICAgIENvZGVNaXJyb3Iub24od2luZG93LCAncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG5cbiAgICAgICAgdmFyIGNvZGVNaXJyb3JPcHRpb25zID0gYmtDb3JlTWFuYWdlci5jb2RlTWlycm9yT3B0aW9ucyhzY29wZSwgbm90ZWJvb2tDZWxsT3ApO1xuICAgICAgICBfLmV4dGVuZChjb2RlTWlycm9yT3B0aW9ucy5leHRyYUtleXMsIHtcbiAgICAgICAgICAnRXNjJyA6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZCgnc2luZ2xlU2VsZWN0aW9uJyk7XG4gICAgICAgICAgICBpZiAoY20uc3RhdGUudmltICYmIGNtLnN0YXRlLnZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChpc0Z1bGxTY3JlZW4oY20pKSB7XG4gICAgICAgICAgICAgICAgc2V0RnVsbFNjcmVlbihjbSwgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQWx0LUYxMSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzZXRGdWxsU2NyZWVuKGNtLCAhaXNGdWxsU2NyZWVuKGNtKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnU2hpZnQtQ3RybC1BJzogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIHNjb3BlLmFwcGVuZENvZGVDZWxsKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnU2hpZnQtQ21kLUEnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUuYXBwZW5kQ29kZUNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DdHJsLUUnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUucG9wdXBNZW51KCk7XG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5pbnB1dGNlbGxtZW51JykuZmluZCgnbGknKS5maW5kKCdhJylbMF0uZm9jdXMoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DbWQtRSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzY29wZS5wb3B1cE1lbnUoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLmlucHV0Y2VsbG1lbnUnKS5maW5kKCdsaScpLmZpbmQoJ2EnKVswXS5mb2N1cygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ0N0cmwtQWx0LUgnOiBmdW5jdGlvbihjbSkgeyAvLyBjZWxsIGhpZGVcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQ21kLUFsdC1IJzogZnVuY3Rpb24oY20pIHsgLy8gY2VsbCBoaWRlXG4gICAgICAgICAgICBzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgU2Nyb2xsaW4udHJhY2soZWxlbWVudFswXSwge2hhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNtID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZWxlbWVudC5maW5kKCd0ZXh0YXJlYScpWzBdLCBjb2RlTWlycm9yT3B0aW9ucyk7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckNNKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUuY20pO1xuICAgICAgICAgIHNjb3BlLmNtLm9uKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICBzY29wZS51cGRhdGVVSShzY29wZS5nZXRFdmFsdWF0b3IoKSk7XG4gICAgICAgICAgLy8gU2luY2UgdGhlIGluc3RhbnRpYXRpb24gb2YgY29kZW1pcnJvciBpbnN0YW5jZXMgaXMgbm93IGxhenksXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byB0cmFjayBhbmQgaGFuZGxlIGZvY3VzaW5nIG9uIGFuIGFzeW5jIGNlbGwgYWRkXG4gICAgICAgICAgaWYgKHNjb3BlLl9zaG91bGRGb2N1c0NvZGVNaXJyb3IpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5fc2hvdWxkRm9jdXNDb2RlTWlycm9yO1xuICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9fSk7XG5cbiAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckZvY3VzYWJsZShzY29wZS5jZWxsbW9kZWwuaWQsIHNjb3BlKTtcblxuICAgICAgICAvLyBjZWxsbW9kZWwuYm9keSAtLT4gQ29kZU1pcnJvclxuICAgICAgICBzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pbnB1dC5ib2R5JywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuY20gJiYgbmV3VmFsICE9PSBzY29wZS5jbS5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIG5ld1ZhbCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2NvcGUuY20uc2V0VmFsdWUobmV3VmFsKTtcbiAgICAgICAgICAgIHNjb3BlLmNtLmNsZWFySGlzdG9yeSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGNlbGxtb2RlbC5ib2R5IDwtLSBDb2RlTWlycm9yXG4gICAgICAgIHZhciBjaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oY20sIGUpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuY2VsbG1vZGVsLmlucHV0LmJvZHkgIT09IGNtLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5saW5lQ291bnQgPSBjbS5saW5lQ291bnQoKTtcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5ib2R5ID0gY20uZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICghYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTW9kZWxFZGl0ZWQoKSkge1xuICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaW5wdXRNZW51RGl2ID0gZWxlbWVudC5maW5kKCcuYmtjZWxsJykuZmlyc3QoKTtcbiAgICAgICAgc2NvcGUucG9wdXBNZW51ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB2YXIgbWVudSA9IGlucHV0TWVudURpdi5maW5kKCcuZHJvcGRvd24nKS5maXJzdCgpO1xuICAgICAgICAgIG1lbnUuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpLmZpcnN0KCkuZHJvcGRvd24oJ3RvZ2dsZScpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKSB7XG4gICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykuYWRkQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykucmVtb3ZlQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc0luaXRpYWxpemF0aW9uQ2VsbCgpJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmJrY2VsbCcpLmFkZENsYXNzKCdpbml0Y2VsbCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykucmVtb3ZlQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS5nZXRTaGFyZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9yID0gXyhia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKS5ldmFsdWF0b3JzKVxuICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yLm5hbWUgPT09IHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBjZWxscyA9IFtzY29wZS5jZWxsbW9kZWxdO1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLmdlbmVyYXRlTm90ZWJvb2soW2V2YWx1YXRvcl0sIGNlbGxzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS4kb24oJ2JlYWtlci5jZWxsLmFkZGVkJywgZnVuY3Rpb24oZSwgY2VsbG1vZGVsKSB7XG4gICAgICAgICAgaWYgKGNlbGxtb2RlbCA9PT0gc2NvcGUuY2VsbG1vZGVsKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuY20pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLl9zaG91bGRGb2N1c0NvZGVNaXJyb3IgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCdiZWFrZXIuc2VjdGlvbi50b2dnbGVkJywgZnVuY3Rpb24oZSwgaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICBpZiAoIWlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2NvcGUuY20ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgU2Nyb2xsaW4udW50cmFjayhlbGVtZW50WzBdKTtcbiAgICAgICAgICBDb2RlTWlycm9yLm9mZih3aW5kb3csICdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcbiAgICAgICAgICBDb2RlTWlycm9yLm9mZignY2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay51bnJlZ2lzdGVyRm9jdXNhYmxlKHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay51bnJlZ2lzdGVyQ00oc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogVGhpcyBtb2R1bGUgaG9sZHMgdGhlIGxvZ2ljIGZvciBjb2RlIGNlbGwsIHdoaWNoIGlzIGEgdHlwZWQge0BsaW5rIGJrQ2VsbH0uXG4gKiBUaGUgY29kZSBjZWxsIGNvbnRhaW5zIGFuIGlucHV0IGNlbGwgYW4gb3V0cHV0IGNlbGwgKHtAbGluayBia0NvZGVDZWxsT3V0cHV0fSkgYW5kIGNlbGwgbWVudXMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb2RlQ2VsbElucHV0TWVudScsIGZ1bmN0aW9uKGJrQ29yZU1hbmFnZXIpIHtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfSA7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWydtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxpbnB1dG1lbnUnXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5nZXRJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZHJvcGRvd24tc3VibWVudScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFN1Ym1lbnVJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZGlzYWJsZWQtbGluaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFNob3dFdmFsSWNvbiA9IGZ1bmN0aW9uKGV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IgPT09IGV2YWx1YXRvck5hbWU7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zZXRFdmFsdWF0b3IgPSBmdW5jdGlvbihldmFsdWF0b3JOYW1lKSB7XG4gICAgICAgICAgdmFyIGNlbGxJZCA9ICRzY29wZS5jZWxsbW9kZWwuaWQ7XG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IgPSBldmFsdWF0b3JOYW1lO1xuICAgICAgICAgIGdldEJrTm90ZWJvb2tXaWRnZXQoKS5nZXRGb2N1c2FibGUoY2VsbElkKS5mb2N1cygpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgYWJzdHJhY3QgY29udGFpbmVyIGZvciB0eXBlcyBvZiBvdXRwdXQgZGlzcGxheXMuIFdoaWxlIHdlIHBsYW4gdG8gbWFrZSB0aGUgb3V0cHV0IGRpc3BsYXkgbG9hZGluZ1xuICogbWVjaGFuaXNtIG1vcmUgcGx1Z2dhYmxlLCByaWdodCBub3csIHRoaXMgbW9kdWxlIHNlcnZlcyBhcyB0aGUgcmVnaXN0cmF0aW9uIG91dHB1dCBkaXNwbGF5IHR5cGVzIGFuZCBob2xkcyB0aGUgbG9naWNcbiAqIGZvciBzd2l0Y2ggYmV0d2VlbiBhcHBsaWNhYmxlIG91dHB1dCBkaXNwbGF5IHRocm91Z2ggVUkuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb2RlQ2VsbE91dHB1dCcsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtPdXRwdXREaXNwbGF5RmFjdG9yeSwgYmtFdmFsdWF0b3JNYW5hZ2VyLCBia0V2YWx1YXRlSm9iTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsb3V0cHV0XCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBtb2RlbDogXCI9XCIsXG4gICAgICAgIGV2YWx1YXRvcklkOiBcIkBcIixcbiAgICAgICAgY2VsbElkOiBcIkBcIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgX3NoYXJlTWVudUl0ZW1zID0gW107XG5cbiAgICAgICAgJHNjb3BlLmdldE91dHB1dFJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWwucmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLnN1YnNjcmliZWRUbykge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5tb2RlbC5wbHVnaW5OYW1lICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2UgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0pIHtcbiAgICAgICAgICAgICAgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0udW5zdWJzY3JpYmUoJHNjb3BlLnN1YnNjcmliZWRUbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbElkICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5kZVJlZ2lzdGVyT3V0cHV0Q2VsbCgkc2NvcGUuY2VsbElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXMgPSBbXTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZ2V0T3V0cHV0UmVzdWx0KCknLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLnN1YnNjcmliZWRUbyAmJiAkc2NvcGUuc3Vic2NyaWJlZFRvICE9PSByZXN1bHQudXBkYXRlX2lkKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWUgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXSkge1xuICAgICAgICAgICAgICB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXS51bnN1YnNjcmliZSgkc2NvcGUuc3Vic2NyaWJlZFRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5zdWJzY3JpYmVkVG8gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoISRzY29wZS5zdWJzY3JpYmVkVG8gJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0LnVwZGF0ZV9pZCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5tb2RlbC5wbHVnaW5OYW1lICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2UgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0pIHtcbiAgICAgICAgICAgICAgdmFyIG9uVXBkYXRhYmxlUmVzdWx0VXBkYXRlID0gZnVuY3Rpb24odXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnJlc3VsdCA9IHVwZGF0ZTtcbiAgICAgICAgICAgICAgICBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdLnN1YnNjcmliZShyZXN1bHQudXBkYXRlX2lkLCBvblVwZGF0YWJsZVJlc3VsdFVwZGF0ZSk7XG4gICAgICAgICAgICAgICRzY29wZS5zdWJzY3JpYmVkVG8gPSByZXN1bHQudXBkYXRlX2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQudHlwZSA9PT0gXCJVcGRhdGFibGVFdmFsdWF0aW9uUmVzdWx0XCIpXG4gICAgICAgICAgICAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzID0gYmtPdXRwdXREaXNwbGF5RmFjdG9yeS5nZXRBcHBsaWNhYmxlRGlzcGxheXMocmVzdWx0LnBheWxvYWQpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXMgPSBia091dHB1dERpc3BsYXlGYWN0b3J5LmdldEFwcGxpY2FibGVEaXNwbGF5cyhyZXN1bHQpO1xuICAgICAgICAgICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGUgPSAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzWzBdO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0byBiZSB1c2VkIGluIGJrT3V0cHV0RGlzcGxheVxuICAgICAgICAkc2NvcGUub3V0cHV0RGlzcGxheU1vZGVsID0ge1xuICAgICAgICAgIGdldENlbGxNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJHNjb3BlLmdldE91dHB1dFJlc3VsdCgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudHlwZSA9PT0gXCJCZWFrZXJEaXNwbGF5XCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5vYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCAmJiByZXN1bHQudHlwZSA9PT0gXCJVcGRhdGFibGVFdmFsdWF0aW9uUmVzdWx0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnBheWxvYWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0RHVtcFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUubW9kZWwuc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0RHVtcFN0YXRlOiBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICAkc2NvcGUubW9kZWwuc3RhdGUgPSBzO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzZXRTaGFyZU1lbnVJdGVtczogZnVuY3Rpb24obmV3SXRlbXMpIHtcbiAgICAgICAgICAgIF9zaGFyZU1lbnVJdGVtcyA9IG5ld0l0ZW1zO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Q29tZXRkVXRpbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAkc2NvcGUuZ2V0RXZhbHVhdG9ySWQoKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICB2YXIgZXZhbHVhdG9yID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcihpZCk7XG4gICAgICAgICAgICAgIGlmIChldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yLmNvbWV0ZFV0aWw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEV2YWx1YXRvcklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICRzY29wZTtcbiAgICAgICAgICAgIHdoaWxlIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChpZC5ldmFsdWF0b3JJZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBpZC5ldmFsdWF0b3JJZDtcbiAgICAgICAgICAgICAgaWQgPSBpZC4kcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldE91dHB1dERpc3BsYXlUeXBlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5tb2RlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICByZXR1cm4gXCJUZXh0XCI7XG4gICAgICAgICAgdmFyIHR5cGUgPSAkc2NvcGUubW9kZWwuc2VsZWN0ZWRUeXBlO1xuICAgICAgICAgIC8vIGlmIEJlYWtlckRpc3BsYXkgb3IgVXBkYXRhYmxlRXZhbHVhdGlvblJlc3VsdCwgdXNlIHRoZSBpbm5lciB0eXBlIGluc3RlYWRcbiAgICAgICAgICBpZiAodHlwZSA9PT0gXCJCZWFrZXJEaXNwbGF5XCIpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUuZ2V0T3V0cHV0UmVzdWx0KCk7XG4gICAgICAgICAgICB0eXBlID0gcmVzdWx0ID8gcmVzdWx0LmlubmVydHlwZSA6IFwiSGlkZGVuXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBnZXRFbGFwc2VkVGltZVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUubW9kZWwuZWxhcHNlZFRpbWUgfHwgJHNjb3BlLm1vZGVsLmVsYXBzZWRUaW1lID09PSAwKSB7XG4gICAgICAgICAgICB2YXIgZWxhcHNlZFRpbWUgPSAkc2NvcGUubW9kZWwuZWxhcHNlZFRpbWU7XG4gICAgICAgICAgICByZXR1cm4gXCJFbGFwc2VkIHRpbWU6IFwiICsgYmtVdGlscy5mb3JtYXRUaW1lU3RyaW5nKGVsYXBzZWRUaW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd091dHB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudCAhPT0gdW5kZWZpbmVkICYmICRzY29wZS4kcGFyZW50LmlzU2hvd091dHB1dCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LmlzU2hvd091dHB1dCgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc1Nob3dNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50ICE9PSB1bmRlZmluZWQgJiYgJHNjb3BlLiRwYXJlbnQuaXNTaG93TWVudSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LmlzU2hvd01lbnUoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlRXhwYW5zaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmNlbGxtb2RlbCAhPT0gdW5kZWZpbmVkICYmICRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSAkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbjtcbiAgICAgICAgICAgICAgJHNjb3BlLiRicm9hZGNhc3QoJ2V4cGFuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFeHBhbmRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwgIT09IHVuZGVmaW5lZCAmJiAkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gISRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRvIGJlIHVzZWQgaW4gb3V0cHV0IGNlbGwgbWVudVxuICAgICAgICAkc2NvcGUub3V0cHV0Q2VsbE1lbnVNb2RlbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgX2FkZGl0aW9uYWxNZW51SXRlbXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiU2hhcmVcIixcbiAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc2hhcmVNZW51SXRlbXM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiVG9nZ2xlIENlbGwgT3V0cHV0XCIsXG4gICAgICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudG9nZ2xlRXhwYW5zaW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogZ2V0RWxhcHNlZFRpbWVTdHJpbmcsXG4gICAgICAgICAgICAgIGFjdGlvbjogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldEFwcGxpY2FibGVEaXNwbGF5czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNlbGVjdGVkRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWwuc2VsZWN0ZWRUeXBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNlbGVjdGVkRGlzcGxheTogZnVuY3Rpb24oZGlzcGxheSkge1xuICAgICAgICAgICAgICAkc2NvcGUubW9kZWwuc2VsZWN0ZWRUeXBlID0gZGlzcGxheTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBZGRpdGlvbmFsTWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9hZGRpdGlvbmFsTWVudUl0ZW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUub3V0cHV0UmVmcmVzaGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCEoJHNjb3BlLiQkcGhhc2UgfHwgJHNjb3BlLiRyb290LiQkcGhhc2UpKVxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoICRzY29wZS5jZWxsSWQgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIucmVnaXN0ZXJPdXRwdXRDZWxsKCRzY29wZS5jZWxsSWQsICRzY29wZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb2RlQ2VsbE91dHB1dE1lbnUnLCBmdW5jdGlvbihia1V0aWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsb3V0cHV0bWVudVwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgbW9kZWw6ICc9J1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZ2V0SXRlbU5hbWUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0SXRlbUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgdmFyIHN1Ykl0ZW1zID0gJHNjb3BlLmdldFN1Ykl0ZW1zKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKHN1Ykl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJkcm9wZG93bi1zdWJtZW51XCIpO1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChcImRyb3AtbGVmdFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLmdldEl0ZW1OYW1lKGl0ZW0pID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcImRpc3BsYXktbm9uZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKFwiIFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFN1Ym1lbnVJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcImRpc2FibGVkLWxpbmtcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbihcIiBcIik7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRTdWJJdGVtcyA9IGZ1bmN0aW9uKHBhcmVudEl0ZW0pIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHBhcmVudEl0ZW0uaXRlbXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50SXRlbS5pdGVtcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFyZW50SXRlbS5pdGVtcztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE1IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE92ZXJyaWRlIG1hcmtkb3duIGxpbmsgcmVuZGVyZXIgdG8gYWx3YXlzIGhhdmUgYHRhcmdldD1cIl9ibGFua1wiYFxuICAvLyBNb3N0bHkgZnJvbSBSZW5kZXJlci5wcm90b3R5cGUubGlua1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWQvYmxvYi9tYXN0ZXIvbGliL21hcmtlZC5qcyNMODYyLUw4ODFcbiAgdmFyIGJrUmVuZGVyZXIgPSBuZXcgbWFya2VkLlJlbmRlcmVyKCk7XG4gIGJrUmVuZGVyZXIubGluayA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgdmFyIHByb3Q7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvdCA9IGRlY29kZVVSSUNvbXBvbmVudCh1bmVzY2FwZShocmVmKSlcbiAgICAgICAgLnJlcGxhY2UoL1teXFx3Ol0vZywgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICAvL2pzaGludCBpZ25vcmU6c3RhcnRcbiAgICAgIGlmIChwcm90LmluZGV4T2YoJ2phdmFzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCd2YnNjcmlwdDonKSA9PT0gMCkge1xuICAgICAgICAvL2pzaGludCBpZ25vcmU6ZW5kXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvdXQgPSAnPGEgaHJlZj1cIicgKyBocmVmICsgJ1wiJztcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgICB9XG4gICAgb3V0ICs9ICcgdGFyZ2V0PVwiX2JsYW5rXCInOyAvLyA8IEFEREVEIFRISVMgTElORSBPTkxZXG4gICAgb3V0ICs9ICc+JyArIHRleHQgKyAnPC9hPic7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGJrUmVuZGVyZXIucGFyYWdyYXBoID0gZnVuY3Rpb24odGV4dCkge1xuICAgIC8vIEFsbG93IHVzZXJzIHRvIHdyaXRlIFxcJCB0byBlc2NhcGUgJFxuICAgIHJldHVybiBtYXJrZWQuUmVuZGVyZXIucHJvdG90eXBlLnBhcmFncmFwaC5jYWxsKHRoaXMsIHRleHQucmVwbGFjZSgvXFxcXFxcJC9nLCAnJCcpKTtcbiAgfTtcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTWFya2Rvd25FZGl0YWJsZScsIFsnYmtTZXNzaW9uTWFuYWdlcicsICdia0hlbHBlcicsICdia0NvcmVNYW5hZ2VyJywgJyR0aW1lb3V0JywgZnVuY3Rpb24oYmtTZXNzaW9uTWFuYWdlciwgYmtIZWxwZXIsIGJrQ29yZU1hbmFnZXIsICR0aW1lb3V0KSB7XG4gICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9tYXJrZG93bi1lZGl0YWJsZVwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY2VsbG1vZGVsOiAnPSdcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGNvbnRlbnRBdHRyaWJ1dGUgPSBzY29wZS5jZWxsbW9kZWwudHlwZSA9PT0gXCJzZWN0aW9uXCIgPyAndGl0bGUnIDogJ2JvZHknO1xuXG4gICAgICAgIHZhciBwcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG1hcmtkb3duRnJhZ21lbnQgPSAkKCc8ZGl2PicgKyBzY29wZS5jZWxsbW9kZWxbY29udGVudEF0dHJpYnV0ZV0gKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgcmVuZGVyTWF0aEluRWxlbWVudChtYXJrZG93bkZyYWdtZW50WzBdLCB7XG4gICAgICAgICAgICBkZWxpbWl0ZXJzOiBbXG4gICAgICAgICAgICAgIHtsZWZ0OiBcIiQkXCIsIHJpZ2h0OiBcIiQkXCIsIGRpc3BsYXk6IHRydWV9LFxuICAgICAgICAgICAgICB7bGVmdDogXCIkXCIsIHJpZ2h0OiAgXCIkXCIsIGRpc3BsYXk6IGZhbHNlfSxcbiAgICAgICAgICAgICAge2xlZnQ6IFwiXFxcXFtcIiwgcmlnaHQ6IFwiXFxcXF1cIiwgZGlzcGxheTogdHJ1ZX0sXG4gICAgICAgICAgICAgIHtsZWZ0OiBcIlxcXFwoXCIsIHJpZ2h0OiBcIlxcXFwpXCIsIGRpc3BsYXk6IGZhbHNlfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVsZW1lbnQuZmluZCgnLm1hcmt1cCcpLmh0bWwobWFya2VkKG1hcmtkb3duRnJhZ21lbnQuaHRtbCgpLCB7Z2ZtOiB0cnVlLCByZW5kZXJlcjogYmtSZW5kZXJlcn0pKTtcbiAgICAgICAgICBtYXJrZG93bkZyYWdtZW50LnJlbW92ZSgpO1xuICAgICAgICAgIHNjb3BlLm1vZGUgPSAncHJldmlldyc7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN5bmNDb250ZW50QW5kUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbFtjb250ZW50QXR0cmlidXRlXSA9IHNjb3BlLmNtLmdldFZhbHVlKCk7XG4gICAgICAgICAgcHJldmlldygpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5ldmFsdWF0ZSA9IHN5bmNDb250ZW50QW5kUHJldmlldztcblxuICAgICAgICBzY29wZS5ia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuXG4gICAgICAgIHNjb3BlLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuZWRpdCgpO1xuICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLmVkaXQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkgfHwge307XG4gICAgICAgICAgLy8gSWYgdGhlIHVzZXIgaXMgc2VsZWN0aW5nIHNvbWUgdGV4dCwgZG8gbm90IGVudGVyIHRoZSBlZGl0IG1hcmtkb3duIG1vZGVcbiAgICAgICAgICBpZiAoc2VsZWN0aW9uLnR5cGUgPT0gXCJSYW5nZVwiICYmICQuY29udGFpbnMoZWxlbWVudFswXSwgc2VsZWN0aW9uLmZvY3VzTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJrSGVscGVyLmlzTm90ZWJvb2tMb2NrZWQoKSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJBXCIpIHJldHVybjsgLy8gRG9uJ3QgZWRpdCBpZiBjbGlja2luZyBhIGxpbmtcblxuICAgICAgICAgIHNjb3BlLm1vZGUgPSAnZWRpdCc7XG5cbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBjb250ZW50IG9mIG1hcmt1cCB3aGVuIHRvZ2dsaW5nIHRvIGVkaXQgbW9kZSB0byBwcmV2ZW50XG4gICAgICAgICAgICAvLyBmbGFzaCB3aGVuIHRvZ2dsaW5nIGJhY2sgdG8gcHJldmlldyBtb2RlLlxuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcubWFya3VwJykuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIHZhciBjbSA9IHNjb3BlLmNtO1xuICAgICAgICAgICAgY20uc2V0VmFsdWUoc2NvcGUuY2VsbG1vZGVsW2NvbnRlbnRBdHRyaWJ1dGVdKTtcbiAgICAgICAgICAgIGNtLmNsZWFySGlzdG9yeSgpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgdmFyIGNsaWNrTG9jYXRpb247XG4gICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gJChldmVudC5kZWxlZ2F0ZVRhcmdldCk7XG4gICAgICAgICAgICAgIHZhciB0b3AgPSB3cmFwcGVyLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHRvcCArIHdyYXBwZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQucGFnZVkgPCAodG9wICsgYm90dG9tKSAvIDIpIHtcbiAgICAgICAgICAgICAgICBjbS5zZXRDdXJzb3IoMCwgMCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmxpbmVDb3VudCgpIC0gMSwgY20uZ2V0TGluZShjbS5sYXN0TGluZSgpKS5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNvZGVNaXJyb3JPcHRpb25zID0gXy5leHRlbmQoYmtDb3JlTWFuYWdlci5jb2RlTWlycm9yT3B0aW9ucyhzY29wZSwgbm90ZWJvb2tDZWxsT3ApLCB7XG4gICAgICAgICAgbGluZU51bWJlcnM6IGZhbHNlLFxuICAgICAgICAgIG1vZGU6IFwibWFya2Rvd25cIixcbiAgICAgICAgICBzbWFydEluZGVudDogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuY20gPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShlbGVtZW50LmZpbmQoXCJ0ZXh0YXJlYVwiKVswXSwgY29kZU1pcnJvck9wdGlvbnMpO1xuXG4gICAgICAgIHNjb3BlLmJrTm90ZWJvb2sucmVnaXN0ZXJGb2N1c2FibGUoc2NvcGUuY2VsbG1vZGVsLmlkLCBzY29wZSk7XG4gICAgICAgIHNjb3BlLmJrTm90ZWJvb2sucmVnaXN0ZXJDTShzY29wZS5jZWxsbW9kZWwuaWQsIHNjb3BlLmNtKTtcblxuICAgICAgICBzY29wZS5jbS5zZXRWYWx1ZShzY29wZS5jZWxsbW9kZWxbY29udGVudEF0dHJpYnV0ZV0pO1xuICAgICAgICBwcmV2aWV3KCk7XG5cbiAgICAgICAgc2NvcGUuY20ub24oXCJibHVyXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3luY0NvbnRlbnRBbmRQcmV2aWV3KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLiRvbignYmVha2VyLmNlbGwuYWRkZWQnLCBmdW5jdGlvbihlLCBjZWxsbW9kZWwpIHtcbiAgICAgICAgICBpZiAoY2VsbG1vZGVsID09PSBzY29wZS5jZWxsbW9kZWwpIHNjb3BlLmVkaXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuYm9keScsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia01hcmtkb3duQ2VsbCcsIFtcbiAgICAgICdia1Nlc3Npb25NYW5hZ2VyJyxcbiAgICAgICdia0hlbHBlcicsXG4gICAgICAnYmtDb3JlTWFuYWdlcicsXG4gICAgICAnJHRpbWVvdXQnLCBmdW5jdGlvbihcbiAgICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgICAgYmtIZWxwZXIsXG4gICAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICAgICR0aW1lb3V0KSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9tYXJrZG93bmNlbGwnXSgpXG4gICAgICAgIH07XG4gICAgICB9XSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTmV3Q2VsbE1lbnUnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsIGJrU2Vzc2lvbk1hbmFnZXIsIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuICAgIHZhciBjZWxsT3BzID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9uZXdjZWxsbWVudVwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29uZmlnOiAnPScsXG4gICAgICAgIGlzTGFyZ2U6ICc9JyxcbiAgICAgICAgcG9zaXRpb246ICdAJ1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgbmV3Q2VsbEZhY3RvcnkgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rTmV3Q2VsbEZhY3RvcnkoKTtcbiAgICAgICAgdmFyIHJlY2VudGx5QWRkZWRMYW5ndWFnZTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbGV2ZWxzID0gWzEsIDIsIDMsIDRdO1xuICAgICAgICAkc2NvcGUuZ2V0TGV2ZWxzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGxldmVscztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubmV3Q29kZUNlbGwgPSBmdW5jdGlvbihldmFsdWF0b3JOYW1lKSB7XG4gICAgICAgICAgdmFyIG5ld0NlbGwgPSBuZXdDZWxsRmFjdG9yeS5uZXdDb2RlQ2VsbChldmFsdWF0b3JOYW1lKTtcbiAgICAgICAgICBhdHRhY2hDZWxsKG5ld0NlbGwpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc2hvd1BsdWdpbk1hbmFnZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0hlbHBlci5zaG93TGFuZ3VhZ2VNYW5hZ2VyKCRzY29wZSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5uZXdNYXJrZG93bkNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IG5ld0NlbGxGYWN0b3J5Lm5ld01hcmtkb3duQ2VsbCgpO1xuICAgICAgICAgIGF0dGFjaENlbGwobmV3Q2VsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm5ld1NlY3Rpb25DZWxsID0gZnVuY3Rpb24obGV2ZWwpIHtcbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IG5ld0NlbGxGYWN0b3J5Lm5ld1NlY3Rpb25DZWxsKGxldmVsKTtcbiAgICAgICAgICBhdHRhY2hDZWxsKG5ld0NlbGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kZWZhdWx0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gYnkgZGVmYXVsdCwgaW5zZXJ0IGEgY29kZSBjZWxsIChhbmQgdXNlIHRoZSBiZXN0IGV2YWx1YXRvciB3aXRoIGJlc3QgZ3Vlc3MpXG4gICAgICAgICAgLy8gSWYgYSBwcmV2IGNlbGwgaXMgZ2l2ZW4sIGZpcnN0IHNjYW4gdG93YXJkIHRvcCBvZiB0aGUgbm90ZWJvb2ssIGFuZCB1c2UgdGhlIGV2YWx1YXRvclxuICAgICAgICAgIC8vIG9mIHRoZSBmaXJzdCBjb2RlIGNlbGwgZm91bmQuIElmIG5vdCBmb3VuZCwgc2NhbiB0b3dhcmQgYm90dG9tLCBhbmQgdXNlIHRoZSBldmFsdWF0b3JcbiAgICAgICAgICAvLyBvZiB0aGUgZmlyc3QgY29kZSBjZWxsIGZvdW5kLlxuICAgICAgICAgIC8vIElmIGEgcHJldiBjZWxsIGlzIG5vdCBnaXZlbiwgdXNlIHRoZSB2ZXJ5IGxhc3QgY29kZSBjZWxsIGluIHRoZSBub3RlYm9vay5cbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rLCB1c2UgdGhlIGZpcnN0IGV2YWx1YXRvciBpbiB0aGUgbGlzdFxuICAgICAgICAgIHZhciBwcmV2Q2VsbCA9ICRzY29wZS5jb25maWcgJiYgJHNjb3BlLmNvbmZpZy5wcmV2Q2VsbCAmJiAkc2NvcGUuY29uZmlnLnByZXZDZWxsKCk7XG4gICAgICAgICAgdmFyIGNvZGVDZWxsID0gcmVjZW50bHlBZGRlZExhbmd1YWdlXG4gICAgICAgICAgICAgIHx8IChwcmV2Q2VsbCAmJiBjZWxsT3BzLmZpbmRDb2RlQ2VsbChwcmV2Q2VsbC5pZCkpXG4gICAgICAgICAgICAgIHx8IChwcmV2Q2VsbCAmJiBjZWxsT3BzLmZpbmRDb2RlQ2VsbChwcmV2Q2VsbC5pZCwgdHJ1ZSkpXG4gICAgICAgICAgICAgIHx8IGdldExhc3RDb2RlQ2VsbCgpO1xuICAgICAgICAgIHZhciBldmFsdWF0b3JOYW1lID0gY29kZUNlbGwgP1xuICAgICAgICAgICAgICBjb2RlQ2VsbC5ldmFsdWF0b3IgOiBfLmtleXMoYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKSlbMF07XG5cbiAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yTmFtZTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBhdHRhY2hDZWxsKGNlbGwpIHtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgaWYgKCRzY29wZS5jb25maWcgJiYgJHNjb3BlLmNvbmZpZy5hdHRhY2hDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNvbmZpZy5hdHRhY2hDZWxsKGNlbGwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjZWxsT3BzLmluc2VydEZpcnN0KGNlbGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgbGFzdCBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rXG4gICAgICAgIHZhciBnZXRMYXN0Q29kZUNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gXy5sYXN0KGNlbGxPcHMuZ2V0QWxsQ29kZUNlbGxzKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kb24oJ2xhbmd1YWdlQWRkZWQnLCBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICAgIHJlY2VudGx5QWRkZWRMYW5ndWFnZSA9IGRhdGE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS4kb24oJ2NlbGxNYXBSZWNyZWF0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWNlbnRseUFkZGVkTGFuZ3VhZ2UgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogYmtOb3RlYm9va1xuICogLSB0aGUgY29udHJvbGxlciB0aGF0IHJlc3BvbnNpYmxlIGZvciBkaXJlY3RseSBjaGFuZ2luZyB0aGUgdmlld1xuICogLSByb290IGNlbGwgKyBldmFsdWF0b3JzICsgb3RoZXIgc3R1ZmZzIHNwZWNpZmljIHRvIG9uZSAodGhlIGxvYWRlZCkgbm90ZWJvb2tcbiAqIC0gcm9vdCBjZWxsIGlzIGp1c3QgYSBzcGVjaWFsIGNhc2Ugb2YgYSBzZWN0aW9uIGNlbGxcbiAqIC0gVE9ETywgd2UgYXJlIG1peGluZyB0aGUgY29uY2VwdCBvZiBhIG5vdGVib29rIGFuZCBhIHJvb3Qgc2VjdGlvbiBoZXJlXG4gKiB3ZSB3YW50IHRvIHNlcGFyYXRlIG91dCB0aGUgbGF5b3V0IHNwZWNpZmljIHN0dWZmcyhpZGVhIG9mIGEgc2VjdGlvbikgZnJvbSBvdGhlclxuICogc3R1ZmZzIGxpa2UgZXZhbHVhdG9yIHBhbmVsXG4gKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtOb3RlYm9vaycsIGZ1bmN0aW9uIChcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgYmtPdXRwdXRMb2cpIHtcbiAgICB2YXIgQ0VMTF9UWVBFID0gXCJub3RlYm9va1wiO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9ub3RlYm9va1wiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgc2V0QmtOb3RlYm9vazogXCImXCIsXG4gICAgICAgIGlzTG9hZGluZzogXCI9XCJcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgdmFyIF9pbXBsID0ge1xuICAgICAgICAgIF92aWV3TW9kZWw6IHtcbiAgICAgICAgICAgIF9kZWJ1Z2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgX3Nob3dPdXRwdXQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9nZ2xlU2hvd091dHB1dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGlzLl9zaG93T3V0cHV0ID0gIXRoaXMuX3Nob3dPdXRwdXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGlkZU91dHB1dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGlzLl9zaG93T3V0cHV0ID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTaG93aW5nT3V0cHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaG93T3V0cHV0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZUFkdmFuY2VkTW9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2FkdmFuY2VkTW9kZSA9ICF0aGlzLl9hZHZhbmNlZE1vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBZHZhbmNlZE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gISEodGhpcy5fYWR2YW5jZWRNb2RlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0hpZXJhcmNoeUVuYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gISEodGhpcy5faGllcmFyY2h5RW5hYmxlZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlSGllcmFyY2h5RW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2hpZXJhcmNoeUVuYWJsZWQgPSAhdGhpcy5faGllcmFyY2h5RW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVEZWJ1Z2dpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVidWdnaW5nID0gIXRoaXMuX2RlYnVnZ2luZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0RlYnVnZ2luZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVidWdnaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Vmlld01vZGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlld01vZGVsO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2hhcmVBbmRPcGVuUHVibGlzaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBUT0RPLCB0aGlzIGlzIGFuIHVnbHkgaGFjay4gTmVlZCByZWZhY3RvcmluZy5cbiAgICAgICAgICAgIHNoYXJlTWVudS5pdGVtc1swXS5hY3Rpb24oKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlbGV0ZUFsbE91dHB1dENlbGxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCkuZGVsZXRlQWxsT3V0cHV0Q2VsbHMoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9mb2N1c2FibGVzOiB7fSwgLy8gbWFwIG9mIGZvY3VzYWJsZShlLmcuIGNvZGUgbWlycm9yIGluc3RhbmNlcykgd2l0aCBjZWxsIGlkIGJlaW5nIGtleXNcbiAgICAgICAgICByZWdpc3RlckZvY3VzYWJsZTogZnVuY3Rpb24gKGNlbGxJZCwgZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2FibGVzW2NlbGxJZF0gPSBmb2N1c2FibGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1bnJlZ2lzdGVyRm9jdXNhYmxlOiBmdW5jdGlvbiAoY2VsbElkKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZm9jdXNhYmxlc1tjZWxsSWRdO1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNhYmxlc1tjZWxsSWRdID0gbnVsbDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEZvY3VzYWJsZTogZnVuY3Rpb24gKGNlbGxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzYWJsZXNbY2VsbElkXTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9jb2RlTWlycm9yczoge30sXG4gICAgICAgICAgcmVnaXN0ZXJDTTogZnVuY3Rpb24gKGNlbGxJZCwgY20pIHtcbiAgICAgICAgICAgIHRoaXMuX2NvZGVNaXJyb3JzW2NlbGxJZF0gPSBjbTtcbiAgICAgICAgICAgIGNtLnNldE9wdGlvbihcImtleU1hcFwiLCB0aGlzLl9jbUtleU1hcE1vZGUpO1xuICAgICAgICAgICAgY20uc2V0T3B0aW9uKFwidmltTW9kZVwiLCB0aGlzLl9jbUtleU1hcE1vZGUgPT0gXCJ2aW1cIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1bnJlZ2lzdGVyQ006IGZ1bmN0aW9uIChjZWxsSWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jb2RlTWlycm9yc1tjZWxsSWRdO1xuICAgICAgICAgICAgdGhpcy5fY29kZU1pcnJvcnNbY2VsbElkXSA9IG51bGw7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfY21LZXlNYXBNb2RlOiBcImRlZmF1bHRcIixcbiAgICAgICAgICBzZXRDTUtleU1hcE1vZGU6IGZ1bmN0aW9uIChrZXlNYXBNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9jbUtleU1hcE1vZGUgPSBrZXlNYXBNb2RlO1xuICAgICAgICAgICAgXy5lYWNoKHRoaXMuX2NvZGVNaXJyb3JzLCBmdW5jdGlvbiAoY20pIHtcbiAgICAgICAgICAgICAgY20uc2V0T3B0aW9uKFwia2V5TWFwXCIsIGtleU1hcE1vZGUpO1xuICAgICAgICAgICAgICBjbS5zZXRPcHRpb24oXCJ2aW1Nb2RlXCIsIGtleU1hcE1vZGUgPT0gXCJ2aW1cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldENNS2V5TWFwTW9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NtS2V5TWFwTW9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zZXRCa05vdGVib29rKHtia05vdGVib29rOiBfaW1wbH0pO1xuXG4gICAgICAgICRzY29wZS5nZXRGdWxsSW5kZXggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiMVwiIH1cblxuICAgICAgICAkc2NvcGUuaXNMb2NrZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc0xvY2tlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmlzRGVidWdnaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzRGVidWdnaW5nKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc1Nob3dpbmdPdXRwdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9pbXBsLl92aWV3TW9kZWwuaXNTaG93aW5nT3V0cHV0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNob3dEZWJ1Z1RyZWUgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLmdldE5vdGVib29rTW9kZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2xlYXJPdXRwdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhdHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICB1cmw6IGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3Qvb3V0cHV0bG9nL2NsZWFyXCIpLFxuICAgICAgICAgICAgZGF0YToge319KTtcbiAgICAgICAgICAkc2NvcGUub3V0cHV0TG9nID0gW107XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5oaWRlT3V0cHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF9pbXBsLl92aWV3TW9kZWwuaGlkZU91dHB1dCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0FkdmFuY2VkTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc0FkdmFuY2VkTW9kZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0hpZXJhcmNoeUVuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9pbXBsLl92aWV3TW9kZWwuaXNIaWVyYXJjaHlFbmFibGVkKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnNob3dTdGRPdXQgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuc2hvd1N0ZEVyciA9IHRydWU7XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZVN0ZE91dCA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICBpZiAoJGV2ZW50KSAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAkc2NvcGUuc2hvd1N0ZE91dCA9ICEkc2NvcGUuc2hvd1N0ZE91dDtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlU3RkRXJyID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICRzY29wZS5zaG93U3RkRXJyID0gISRzY29wZS5zaG93U3RkRXJyO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJrT3V0cHV0TG9nLmdldExvZyhmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgJHNjb3BlLm91dHB1dExvZyA9IHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmtPdXRwdXRMb2cuc3Vic2NyaWJlKGZ1bmN0aW9uIChyZXBseSkge1xuICAgICAgICAgIGlmICghX2ltcGwuX3ZpZXdNb2RlbC5pc1Nob3dpbmdPdXRwdXQoKSkge1xuICAgICAgICAgICAgX2ltcGwuX3ZpZXdNb2RlbC50b2dnbGVTaG93T3V0cHV0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRzY29wZS5vdXRwdXRMb2cucHVzaChyZXBseS5kYXRhKTtcbiAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgLy8gU2Nyb2xsIHRvIGJvdHRvbSBzbyB0aGlzIG91dHB1dCBpcyB2aXNpYmxlLlxuICAgICAgICAgICQuZWFjaCgkKCcub3V0cHV0bG9nYm94JyksXG4gICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChpLCB2KSB7XG4gICAgICAgICAgICAgICAgICAgJCh2KS5zY3JvbGxUb3Aodi5zY3JvbGxIZWlnaHQpO1xuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBtYXJnaW4gPSAkKFwiLm91dHB1dGxvZ3N0ZG91dFwiKS5wb3NpdGlvbigpLnRvcDtcbiAgICAgICAgdmFyIG91dHB1dExvZ0hlaWdodCA9IDMwMDtcbiAgICAgICAgdmFyIGRyYWdIZWlnaHQ7XG4gICAgICAgIHZhciBmaXhPdXRwdXRMb2dQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKFwiLm91dHB1dGxvZ2NvbnRhaW5lclwiKS5jc3MoXCJ0b3BcIiwgd2luZG93LmlubmVySGVpZ2h0IC0gb3V0cHV0TG9nSGVpZ2h0KTtcbiAgICAgICAgICAkKFwiLm91dHB1dGxvZ2NvbnRhaW5lclwiKS5jc3MoXCJoZWlnaHRcIiwgb3V0cHV0TG9nSGVpZ2h0KTtcbiAgICAgICAgICAkKFwiLm91dHB1dGxvZ2JveFwiKS5jc3MoXCJoZWlnaHRcIiwgb3V0cHV0TG9nSGVpZ2h0IC0gbWFyZ2luIC0gNSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS51bnJlZ2lzdGVycyA9IFtdO1xuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZpeE91dHB1dExvZ1Bvc2l0aW9uKTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh3aW5kb3cpLm9mZihcInJlc2l6ZVwiLCBmaXhPdXRwdXRMb2dQb3NpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZHJhZ1N0YXJ0SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkcmFnSGVpZ2h0ID0gb3V0cHV0TG9nSGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3V0cHV0bG9naGFuZGxlID0gJChcIi5vdXRwdXRsb2doYW5kbGVcIik7XG4gICAgICAgIG91dHB1dGxvZ2hhbmRsZS5kcmFnKFwic3RhcnRcIiwgZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgICAgICRzY29wZS51bnJlZ2lzdGVycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG91dHB1dGxvZ2hhbmRsZS5vZmYoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZHJhZ0hhbmRsZXIgPSBmdW5jdGlvbiAoZXYsIGRkKSB7XG4gICAgICAgICAgb3V0cHV0TG9nSGVpZ2h0ID0gZHJhZ0hlaWdodCAtIGRkLmRlbHRhWTtcbiAgICAgICAgICBpZiAob3V0cHV0TG9nSGVpZ2h0IDwgMjApIHtcbiAgICAgICAgICAgIG91dHB1dExvZ0hlaWdodCA9IDIwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3V0cHV0TG9nSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0IC0gODApIHtcbiAgICAgICAgICAgIG91dHB1dExvZ0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDgwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaXhPdXRwdXRMb2dQb3NpdGlvbigpO1xuICAgICAgICB9O1xuICAgICAgICBvdXRwdXRsb2doYW5kbGUuZHJhZyhkcmFnSGFuZGxlcik7XG4gICAgICAgICRzY29wZS51bnJlZ2lzdGVycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG91dHB1dGxvZ2hhbmRsZS5vZmYoXCJkcmFnXCIsIGRyYWdIYW5kbGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHJvb3RcbiAgICAgICAgICByZXR1cm4gbm90ZWJvb2tDZWxsT3AuZ2V0Q2hpbGRyZW4oXCJyb290XCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0VtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5nZXRDaGlsZHJlbigpLmxlbmd0aCA9PSAwO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRTaGFyZU1lbnVQbHVnaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihDRUxMX1RZUEUpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNoYXJlTWVudSA9IHtcbiAgICAgICAgICBuYW1lOiBcIlNoYXJlXCIsXG4gICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kd2F0Y2goXCJnZXRTaGFyZU1lbnVQbHVnaW4oKVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFyZU1lbnUuaXRlbXMgPSBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51SXRlbXMoQ0VMTF9UWVBFLCAkc2NvcGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzUm9vdENlbGxJbml0aWFsaXphdGlvbigpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUubWVudUl0ZW1zID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiUnVuIGFsbFwiLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5ldmFsdWF0ZVJvb3QoXCJyb290XCIpLlxuICAgICAgICAgICAgICAgICAgY2F0Y2goZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihkYXRhKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJJbml0aWFsaXphdGlvbiBDZWxsXCIsXG4gICAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldFJvb3RDZWxsSW5pdGlhbGl6YXRpb24oISRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKTtcbiAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHNoYXJlTWVudVxuICAgICAgICBdO1xuXG4gICAgICAgIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L3V0aWwvaXNVc2VBZHZhbmNlZE1vZGVcIikpLnN1Y2Nlc3MoZnVuY3Rpb24oaXNBZHZhbmNlZCkge1xuICAgICAgICAgIGlmIChfaW1wbC5fdmlld01vZGVsLmlzQWR2YW5jZWRNb2RlKCkgIT0gKGlzQWR2YW5jZWQgPT09IFwidHJ1ZVwiKSkge1xuICAgICAgICAgICAgX2ltcGwuX3ZpZXdNb2RlbC50b2dnbGVBZHZhbmNlZE1vZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGRpdiA9IGVsZW1lbnQuZmluZChcIi5ia2NlbGxcIikuZmlyc3QoKTtcbiAgICAgICAgZGl2LmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIC8vY2xpY2sgaW4gdGhlIGJvcmRlciBvciBwYWRkaW5nIHNob3VsZCB0cmlnZ2VyIG1lbnVcbiAgICAgICAgICBpZiAoYmtVdGlscy5nZXRFdmVudE9mZnNldFgoZGl2LCBldmVudCkgPj0gZGl2LndpZHRoKCkpIHtcbiAgICAgICAgICAgIHZhciBtZW51ID0gZGl2LmZpbmQoJy5ia2NlbGxtZW51JykubGFzdCgpO1xuICAgICAgICAgICAgbWVudS5jc3MoXCJ0b3BcIiwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICBtZW51LmNzcyhcImxlZnRcIiwgZXZlbnQuY2xpZW50WCAtIDE1MCk7XG4gICAgICAgICAgICBtZW51LmZpbmQoJy5kcm9wZG93bi10b2dnbGUnKS5maXJzdCgpLmRyb3Bkb3duKCd0b2dnbGUnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKSB7XG4gICAgICAgICAgZGl2LmFkZENsYXNzKFwiaW5pdGNlbGxcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGl2LnJlbW92ZUNsYXNzKFwiaW5pdGNlbGxcIik7XG4gICAgICAgIH1cbiAgICAgICAgc2NvcGUuZ2V0Tm90ZWJvb2tFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnaXNJbml0aWFsaXphdGlvbkNlbGwoKScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgZGl2LmFkZENsYXNzKFwiaW5pdGNlbGxcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkaXYucmVtb3ZlQ2xhc3MoXCJpbml0Y2VsbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5zZXRCa05vdGVib29rKHtia05vdGVib29rOiB1bmRlZmluZWR9KTtcbiAgICAgICAgICBia091dHB1dExvZy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIF8oc2NvcGUudW5yZWdpc3RlcnMpLmVhY2goZnVuY3Rpb24odW5yZWdpc3Rlcikge1xuICAgICAgICAgICAgdW5yZWdpc3RlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtTZWN0aW9uQ2VsbCcsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICAkdGltZW91dCkge1xuICAgIHZhciBDRUxMX1RZUEUgPSBcInNlY3Rpb25cIjtcbiAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL3NlY3Rpb25jZWxsXCJdKCksXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuXG4gICAgICAgICRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkID0gJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQgfHwgZmFsc2U7XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZVNob3dDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkID0gISRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkO1xuICAgICAgICAgICRzY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuc2VjdGlvbi50b2dnbGVkJywgJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaXNTaG93Q2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gbm90ZWJvb2tDZWxsT3AuZ2V0Q2hpbGRyZW4oJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5yZXNldFRpdGxlID0gZnVuY3Rpb24obmV3VGl0bGUpIHtcbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC50aXRsZScsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uJywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LnJlbmFtZUl0ZW0oe1xuICAgICAgICAgIG5hbWU6IFwiRGVsZXRlIGNlbGxcIixcbiAgICAgICAgICBuZXdOYW1lOiBcIkRlbGV0ZSBoZWFkaW5nIGFuZCBrZWVwIGNvbnRlbnRzXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbVRvSGVhZCh7XG4gICAgICAgICAgbmFtZTogXCJEZWxldGUgc2VjdGlvbiBhbmQgYWxsIHN1Yi1zZWN0aW9uc1wiLFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5kZWxldGVTZWN0aW9uKCRzY29wZS5jZWxsbW9kZWwuaWQsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6IFwiQ2hhbmdlIEhlYWRlciBMZXZlbFwiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiSDFcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmxldmVsID0gMTtcbiAgICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkgyXCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5sZXZlbCA9IDI7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJIM1wiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwubGV2ZWwgPSAzO1xuICAgICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiSDRcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmxldmVsID0gNDtcbiAgICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmdldFNoYXJlRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBjZWxscyA9IFskc2NvcGUuY2VsbG1vZGVsXVxuICAgICAgICAgICAgICAuY29uY2F0KG5vdGVib29rQ2VsbE9wLmdldEFsbERlc2NlbmRhbnRzKCRzY29wZS5jZWxsbW9kZWwuaWQpKTtcbiAgICAgICAgICB2YXIgdXNlZEV2YWx1YXRvcnNOYW1lcyA9IF8oY2VsbHMpLmNoYWluKClcbiAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbGwudHlwZSA9PT0gXCJjb2RlXCI7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC51bmlxdWUoKS52YWx1ZSgpO1xuICAgICAgICAgIHZhciBldmFsdWF0b3JzID0gYmtTZXNzaW9uTWFuYWdlci5nZXRSYXdOb3RlYm9va01vZGVsKCkuZXZhbHVhdG9yc1xuICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5hbnkodXNlZEV2YWx1YXRvcnNOYW1lcywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yLm5hbWUgPT09IGV2O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5nZW5lcmF0ZU5vdGVib29rKGV2YWx1YXRvcnMsIGNlbGxzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVNZW51UGx1Z2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihDRUxMX1RZUEUpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiBcIlJ1biBhbGxcIixcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmV2YWx1YXRlUm9vdCgkc2NvcGUuY2VsbG1vZGVsLmlkKS5cbiAgICAgICAgICAgICAgICBjYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzaGFyZU1lbnUgPSB7XG4gICAgICAgICAgbmFtZTogXCJTaGFyZVwiLFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHNoYXJlTWVudSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goXCJnZXRTaGFyZU1lbnVQbHVnaW4oKVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFyZU1lbnUuaXRlbXMgPSBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51SXRlbXMoQ0VMTF9UWVBFLCAkc2NvcGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb247XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6IFwiSW5pdGlhbGl6YXRpb24gQ2VsbFwiLFxuICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLm5ld0NlbGxNZW51Q29uZmlnID0ge1xuICAgICAgICAgIGlzU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTG9ja2VkKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLmhpZGVUaXRsZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGF0dGFjaENlbGw6IGZ1bmN0aW9uKG5ld0NlbGwpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmluc2VydEFmdGVyKCRzY29wZS5jZWxsbW9kZWwuaWQsIG5ld0NlbGwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldkNlbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrVGV4dENlbGwnLCBmdW5jdGlvbihia1Nlc3Npb25NYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL3RleHRjZWxsXCJdKCksXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmlzRWRpdGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIWJrSGVscGVyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHRleHRib3ggPSAkKGVsZW1lbnQuZmluZChcIi5lZGl0YWJsZS10ZXh0XCIpLmZpcnN0KCkpO1xuICAgICAgICBlbGVtZW50LmZpbmQoJy5lZGl0YWJsZS10ZXh0JykuaHRtbChzY29wZS5jZWxsbW9kZWwuYm9keSk7XG4gICAgICAgIHRleHRib3guYmluZCgnYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5ib2R5ID0gdGV4dGJveC5odG1sKCkudHJpbSgpO1xuICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuZWRpdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRleHRib3guZm9jdXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuYm9keScsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJG9uKCdiZWFrZXIuY2VsbC5hZGRlZCcsIGZ1bmN0aW9uKGUsIGNlbGxtb2RlbCkge1xuICAgICAgICAgIGlmIChjZWxsbW9kZWwgPT09IHNjb3BlLmNlbGxtb2RlbCkgc2NvcGUuZWRpdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgdGhlIGNlbnRyYWwgY29udHJvbCBvZiBhbGwgb3V0cHV0IGRpc3BsYXlzLiBJdCBmdWxmaWxscyBhY3R1YWwgYW5ndWxhciBkaXJlY3RpdmVzXG4gKiBsYXppbHkgd2hlbiB1c2VyIGxvYWQgb3V0cHV0IGRpc3BsYXkgcGx1Z2lucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5JywgWydiay51dGlscycsICAnbmdBbmltYXRlJywgJ25nVG91Y2gnXSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5Jyk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrT3V0cHV0RGlzcGxheScsIGZ1bmN0aW9uKFxuICAgICAgJGNvbXBpbGUsIGJrT3V0cHV0RGlzcGxheUZhY3RvcnksIGJrVXRpbHMpIHtcbiAgICB2YXIgZ2V0UmVzdWx0VHlwZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZ2V0Q2VsbE1vZGVsKCkpIHtcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcobW9kZWwuZ2V0Q2VsbE1vZGVsKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIFwiU3RyaW5nXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1vZGVsLmdldENlbGxNb2RlbCgpLnR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogXCI8ZGl2Pk9VVFBVVDwvZGl2PlwiLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgdHlwZTogXCJAXCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIiAvLyBhc3N1bWUgcmVmIHRvIG1vZGVsIGRvZXNuJ3QgY2hhbmdlIGFmdGVyIGRpcmVjdGl2ZSBpcyBjcmVhdGVkXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBjaGlsZFNjb3BlID0gbnVsbDtcbiAgICAgICAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgaWYgKGNoaWxkU2NvcGUpIHtcbiAgICAgICAgICAgIGNoaWxkU2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hpbGRTY29wZSA9IHNjb3BlLiRuZXcoKTtcbiAgICAgICAgICBjaGlsZFNjb3BlLm1vZGVsID0gc2NvcGUubW9kZWw7XG4gICAgICAgICAgdmFyIHJlc3VsdFR5cGUgPSBnZXRSZXN1bHRUeXBlKHNjb3BlLm1vZGVsKTtcbiAgICAgICAgICBpZiAocmVzdWx0VHlwZSkge1xuICAgICAgICAgICAgYmtVdGlscy5sb2coXCJvdXRwdXREaXNwbGF5XCIsIHtcbiAgICAgICAgICAgICAgcmVzdWx0VHlwZTogcmVzdWx0VHlwZSxcbiAgICAgICAgICAgICAgZGlzcGxheVR5cGU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZGlyZWN0aXZlTmFtZSA9IGJrT3V0cHV0RGlzcGxheUZhY3RvcnkuZ2V0RGlyZWN0aXZlTmFtZSh0eXBlKTtcbiAgICAgICAgICBlbGVtZW50Lmh0bWwoXCI8ZGl2IFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIG1vZGVsPSdtb2RlbCc+PC9kaXY+XCIpO1xuICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoY2hpbGRTY29wZSk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaChcInR5cGVcIiwgZnVuY3Rpb24obmV3VHlwZSwgb2xkVHlwZSkge1xuICAgICAgICAgIHJlZnJlc2gobmV3VHlwZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oXCJvdXRwdXREaXNwbGF5RmFjdG9yeVVwZGF0ZWRcIiwgZnVuY3Rpb24oZXZlbnQsIHdoYXQpIHtcbiAgICAgICAgICBpZiAod2hhdCA9PT0gXCJhbGxcIiB8fCB3aGF0ID09PSBzY29wZS50eXBlKSB7XG4gICAgICAgICAgICByZWZyZXNoKHNjb3BlLnR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoY2hpbGRTY29wZSkge1xuICAgICAgICAgICAgY2hpbGRTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgY2VudHJhbCBjb250cm9sIG9mIGFsbCBvdXRwdXQgZGlzcGxheXMuIEl0IGZ1bGZpbGxzIGFjdHVhbCBhbmd1bGFyIGRpcmVjdGl2ZXNcbiAqIGxhemlseSB3aGVuIHVzZXIgbG9hZCBvdXRwdXQgZGlzcGxheSBwbHVnaW5zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgTUFYX0NBUEFDSVRZID0gMTAwO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsub3V0cHV0RGlzcGxheScpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtPdXRwdXREaXNwbGF5RmFjdG9yeVwiLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NlKSB7XG5cbiAgICB2YXIgaW1wbHMgPSB7XG4gICAgICAgIFwiVGV4dFwiOiB7XG4gICAgICAgICAgdGVtcGxhdGU6IFwiPHByZT57e2dldFRleHQoKX19PC9wcmU+XCIsXG4gICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgbW9kZWwgPSAkc2NvcGUubW9kZWwuZ2V0Q2VsbE1vZGVsKCk7XG4gICAgICAgICAgICAgIHJldHVybiAobW9kZWwgJiYgbW9kZWwudGV4dCkgPyBtb2RlbC50ZXh0IDogbW9kZWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJEYXRlXCI6IHtcbiAgICAgICAgICB0ZW1wbGF0ZTogXCI8cHJlPnt7Z2V0RGF0ZSgpfX08L3ByZT5cIixcbiAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZS5nZXREYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBtb2RlbCA9ICRzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKTtcbiAgICAgICAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLnRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIHZhciBtID0gbW9tZW50KG1vZGVsLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG0uZm9ybWF0KFwiWVlZWU1NREQgSEg6bW06c3MuU1NTIFpaXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBtb2RlbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgXCJXYXJuaW5nXCI6IHtcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nb3V0bGluZSB3YXJuaW5nJz48L2Rpdj4gPHByZSBjbGFzcz0nb3V0X3dhcm5pbmcnPnt7bW9kZWwuZ2V0Q2VsbE1vZGVsKCkubWVzc2FnZX19PC9wcmU+XCJcbiAgICAgIH0sXG4gICAgICBcIkVycm9yXCI6IHtcbiAgICAgICAgdGVtcGxhdGU6IFwiPHByZSBjbGFzcz0nb3V0X2Vycm9yJz5cIiArXG4gICAgICAgICAgICBcIjxzcGFuIG5nLXNob3c9J2NhbkV4cGFuZCcgY2xhc3M9J3RvZ2dsZS1lcnJvcicgbmctY2xpY2s9J2V4cGFuZGVkID0gIWV4cGFuZGVkJz57e2V4cGFuZGVkID8gJy0nIDogJysnfX08L3NwYW4+XCIgK1xuICAgICAgICAgICAgXCI8c3BhbiBuZy1iaW5kLWh0bWw9J3Nob3J0RXJyb3InPjwvc3Bhbj48L3ByZT5cIiArXG4gICAgICAgICAgICBcIjxwcmUgbmctc2hvdz0nZXhwYW5kZWQnPjxzcGFuIG5nLWJpbmQtaHRtbD0nbG9uZ0Vycm9yJz48L3NwYW4+XCIgK1xuICAgICAgICAgICAgXCI8L3ByZT5cIixcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICAgICRzY29wZS5leHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgJHNjb3BlLiR3YXRjaCgnbW9kZWwuZ2V0Q2VsbE1vZGVsKCknLCBmdW5jdGlvbihjZWxsTW9kZWwpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXRzID0gJGVsZW1lbnQuZmluZCgnc3BhbicpO1xuICAgICAgICAgICAgdmFyIGVycm9ycyAgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0KGNlbGxNb2RlbCk7XG5cbiAgICAgICAgICAgICRzY29wZS5zaG9ydEVycm9yICAgPSAkc2NlLnRydXN0QXNIdG1sKGVycm9yc1swXSk7XG4gICAgICAgICAgICAkc2NvcGUuY2FuRXhwYW5kICAgID0gZXJyb3JzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICAkc2NvcGUubG9uZ0Vycm9yICAgID0gJHNjZS50cnVzdEFzSHRtbChlcnJvcnMuc2xpY2UoMSkuam9pbihcIlxcblwiKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIkh0bWxcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2PjwvZGl2PlwiLFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyKSB7XG4gICAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihcImJrby1odG1sXCIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldFNoYXJlTWVudVBsdWdpbigpXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5ld0l0ZW1zID0gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudUl0ZW1zKFwiYmtvLWh0bWxcIiwgJHNjb3BlKTtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbC5yZXNldFNoYXJlTWVudUl0ZW1zKG5ld0l0ZW1zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGRpdiA9IGVsZW1lbnQuZmluZChcImRpdlwiKS5maXJzdCgpO1xuICAgICAgICAgIHZhciBjZWxsTW9kZWwgPSBzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKTtcbiAgICAgICAgICBkaXYuaHRtbChjZWxsTW9kZWwpO1xuICAgICAgICAgIHNjb3BlLiR3YXRjaCgnbW9kZWwuZ2V0Q2VsbE1vZGVsKCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgZGl2Lmh0bWwobmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJPdXRwdXRDb250YWluZXJcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogJzxiay1jb2RlLWNlbGwtb3V0cHV0IG5nLXJlcGVhdD1cImkgaW4gaXRlbXNcIiBtb2RlbD1cImlcIiA+JyArXG4gICAgICAgICAgICAnPC8gYmstY29kZS1jZWxsLW91dHB1dD4nLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgIG1vZGVsOiBcIj1cIlxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAkc2NvcGUuaXRlbXMgPSBfKCRzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKS5pdGVtcykubWFwKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByZXN1bHQ6IGl0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICRzY29wZS5pc1Nob3dNZW51ID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgdHlwZXMgPSBbXCJUZXh0XCIsIFwiRGF0ZVwiLCBcIkJlYWtlclN0YW5kYXJkT3V0cHV0XCIsIFwiQmVha2VyU3RhbmRhcmRFcnJvclwiLCBcIldhcm5pbmdcIiwgXCJFcnJvclwiLCBcIkh0bWxcIiwgXCJPdXRwdXRDb250YWluZXJcIl07XG4gICAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbih3aGF0LCBzY29wZSkge1xuICAgICAgaWYgKCF3aGF0KSB7XG4gICAgICAgIHdoYXQgPSBcImFsbFwiO1xuICAgICAgfVxuICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICBzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICB9XG4gICAgICBzY29wZS4kYnJvYWRjYXN0KFwiYmtPdXRwdXREaXNwbGF5RmFjdG9yeVwiLCB3aGF0KTtcbiAgICAgIHNjb3BlLiQkcGhhc2UgfHwgc2NvcGUuJGFwcGx5KCk7XG4gICAgfTtcbiAgICB2YXIgc2V0SW1wbCA9IGZ1bmN0aW9uKGluZGV4LCB0eXBlLCBpbXBsKSB7XG4gICAgICB0eXBlc1tpbmRleF0gPSB0eXBlO1xuICAgICAgaW1wbHNbdHlwZV0gPSBpbXBsO1xuICAgICAgcmVmcmVzaCh0eXBlKTtcbiAgICB9O1xuICAgIHZhciByZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcCA9IHtcbiAgICAgIC8vIFRoZSBmaXJzdCBpbiB0aGUgYXJyYXkgd2lsbCBiZSB1c2VkIGFzIGRlZmF1bHRcbiAgICAgIFwidGV4dFwiOiBbXCJUZXh0XCIsIFwiSHRtbFwiLCBcIkxhdGV4XCJdLFxuICAgICAgXCJEYXRlXCI6IFtcIkRhdGVcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJUYWJsZURpc3BsYXlcIjogW1wiVGFibGVcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJodG1sXCI6IFtcIkh0bWxcIl0sXG4gICAgICBcIkltYWdlSWNvblwiOiBbXCJJbWFnZVwiLCBcIlRleHRcIl0sXG4gICAgICBcIkJlYWtlckRpc3BsYXlcIjogW1wiQmVha2VyRGlzcGxheVwiLCBcIlRleHRcIl0sXG4gICAgICBcIlBsb3RcIjogW1wiUGxvdFwiLCBcIkNoYXJ0XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiVGltZVBsb3RcIjogW1wiUGxvdFwiLCBcIkNoYXJ0XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiTmFub1Bsb3RcIjogW1wiUGxvdFwiLCBcIlRleHRcIl0sXG4gICAgICBcIkNvbWJpbmVkUGxvdFwiOiBbXCJDb21iaW5lZFBsb3RcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJIaWRkZW5PdXRwdXRDZWxsXCI6IFtcIkhpZGRlblwiXSxcbiAgICAgIFwiV2FybmluZ1wiOiBbXCJXYXJuaW5nXCJdLFxuICAgICAgXCJCZWFrZXJPdXRwdXRDb250YWluZXJEaXNwbGF5XCI6IFtcIk91dHB1dENvbnRhaW5lclwiLCBcIlRleHRcIl0sXG4gICAgICBcIk91dHB1dENvbnRhaW5lckNlbGxcIjogW1wiT3V0cHV0Q29udGFpbmVyXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiT3V0cHV0Q29udGFpbmVyXCI6IFtcIk91dHB1dENvbnRhaW5lclwiLCBcIlRleHRcIl1cbiAgICB9O1xuICAgIHZhciBmYWN0b3J5ID0ge1xuICAgICAgYWRkOiBmdW5jdGlvbih0eXBlLCBpbXBsKSB7XG4gICAgICAgIGlmICh0eXBlcy5sZW5ndGggPiBNQVhfQ0FQQUNJVFkpIHtcbiAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBhZGQgb3V0cHV0OiBcIiArIHR5cGUgK1xuICAgICAgICAgICAgICBcIiwgbWF4IG91dHB1dCBkaXNwbGF5IGNhcGFjaXR5KFwiICsgTUFYX0NBUEFDSVRZICtcbiAgICAgICAgICAgICAgXCIpIHJlYWNoZWRcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGQgdG8gdGhlIGVuZFxuICAgICAgICBzZXRJbXBsKHR5cGVzLmxlbmd0aCwgdHlwZSwgaW1wbCk7XG4gICAgICB9LFxuICAgICAgZ2V0OiBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVzW2luZGV4XTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW1wbCh0eXBlKTtcbiAgICAgIH0sXG4gICAgICBnZXRJbXBsOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlICYmIGltcGxzW3R5cGVdKSB7XG4gICAgICAgICAgcmV0dXJuIGltcGxzW3R5cGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpbXBsc1tcInRleHRcIl07XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXREaXJlY3RpdmVOYW1lOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHR5cGVzLmluZGV4T2YodHlwZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBpbmRleCA9IHR5cGVzLmluZGV4T2YoXCJUZXh0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcImJrb1wiICsgaW5kZXg7XG4gICAgICB9LFxuICAgICAgYWRkT3V0cHV0RGlzcGxheVR5cGU6IGZ1bmN0aW9uKHR5cGUsIGRpc3BsYXlzLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwW3R5cGVdKSB7XG4gICAgICAgICAgcmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXBbdHlwZV0gPSBkaXNwbGF5cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwW3R5cGVdLCBbaW5kZXgsIDBdLmNvbmNhdChkaXNwbGF5cykpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0QXBwbGljYWJsZURpc3BsYXlzOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpc0pTT04gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHZhciByZXQgPSB0cnVlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpc0hUTUwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiAvXjxbYS16XVtcXHNcXFNdKj4vaS50ZXN0KHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiSGlkZGVuXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJlc3VsdC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gW1wiVGV4dFwiLCBcIkh0bWxcIiwgXCJMYXRleFwiXTtcbiAgICAgICAgICAgIGlmIChpc0pTT04ocmVzdWx0KSkge1xuICAgICAgICAgICAgICByZXQucHVzaChcIkpzb25cIiwgXCJWZWdhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzSFRNTChyZXN1bHQpKSB7XG4gICAgICAgICAgICAgIHJldCA9IFtcIkh0bWxcIiwgXCJUZXh0XCIsIFwiTGF0ZXhcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXy5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNPYmplY3QocmVzdWx0WzBdKSkge1xuICAgICAgICAgICAgICAgIHJldC5wdXNoKFwiVGFibGVcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcC5oYXNPd25Qcm9wZXJ0eShyZXN1bHQudHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcFtyZXN1bHQudHlwZV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJUZXh0XCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKClcbiAgICB9O1xuICAgIGJlYWtlci5vdXRwdXREaXNwbGF5RmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgZm9yICh2YXIga2V5IGluIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlGYWN0b3J5KSB7XG4gICAgICBiZWFrZXIub3V0cHV0RGlzcGxheUZhY3RvcnkuYWRkKGtleSwgYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheUZhY3Rvcnlba2V5XSk7XG4gICAgfVxuICAgIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlGYWN0b3J5ID0gbnVsbDtcblxuICAgIGZvciAodmFyIGtleSBpbiBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5VHlwZSkge1xuICAgICAgdmFyIGRpc3BsYXlzID0gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVR5cGVba2V5XTtcbiAgICAgIGZhY3RvcnkuYWRkT3V0cHV0RGlzcGxheVR5cGUoa2V5LCBkaXNwbGF5cyk7XG4gICAgfVxuICAgIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlUeXBlID0gbnVsbDtcblxuICAgIHJldHVybiBmYWN0b3J5O1xuICB9KTtcblxuICBfKF8ucmFuZ2UoTUFYX0NBUEFDSVRZKSkuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgbW9kdWxlLmRpcmVjdGl2ZShcImJrb1wiICsgaSxcbiAgICAgICAgZnVuY3Rpb24oYmtPdXRwdXREaXNwbGF5RmFjdG9yeSwgYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXIsICRpbmplY3Rvcikge1xuICAgICAgdmFyIGltcGwgPSBia091dHB1dERpc3BsYXlGYWN0b3J5LmdldChpKTtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW1wbCkpIHtcbiAgICAgICAgcmV0dXJuIGltcGwoYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXIsICRpbmplY3Rvcik7XG4gICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShpbXBsKSkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW1wbC5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGl0ID0gaW1wbFtqXTtcbiAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGl0KSkge1xuICAgICAgICAgICAgICBpZiAoYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXIuaGFzKGl0KSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlci5nZXQoaXQpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgkaW5qZWN0b3IuaGFzKGl0KSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCgkaW5qZWN0b3IuZ2V0KGl0KSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJiZWFrZXIgY291bGQgbm90IGZpbmQgcHJvdmlkZXIgZm9yIGJrb0ZhY3RvcnkgXCIgKyBpdDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24oaXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW1wbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBjZW50cmFsIGNvbnRyb2wgb2YgYWxsIG91dHB1dCBkaXNwbGF5cy4gSXQgZnVsZmlsbHMgYWN0dWFsIGFuZ3VsYXIgZGlyZWN0aXZlc1xuICogbGF6aWx5IHdoZW4gdXNlciBsb2FkIG91dHB1dCBkaXNwbGF5IHBsdWdpbnMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5Jyk7XG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXJcIiwgZnVuY3Rpb24oJGluamVjdG9yKSB7XG4gICAgdmFyIHNlcnZpY2VzID0ge307XG4gICAgdmFyIGZhY3RvcnkgPSB7XG4gICAgICBnZXRTZXJ2aWNlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcbiAgICAgIH0sXG4gICAgICBhZGRTZXJ2aWNlOiBmdW5jdGlvbihrZXksIGltcGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbXBsID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBzZXJ2aWNlc1trZXldID0gaW1wbCgkaW5qZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbXBsKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbXBsLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaXQgPSBpbXBsW2pdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICBpZiAoc2VydmljZXMuaGFzT3duUHJvcGVydHkoaXQpKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKHNlcnZpY2VzW2l0XSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoJGluamVjdG9yLmhhcyhpdCkpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goJGluamVjdG9yLmdldChpdCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIHNlcnZpY2VzW2tleV0gPSBpdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXJ2aWNlc1trZXldID0gaW1wbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgICAgfSxcbiAgICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlc1trZXldO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVNlcnZpY2UpIHtcbiAgICAgIHZhciBpbXBsID0gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVNlcnZpY2Vba2V5XTtcbiAgICAgIGZhY3RvcnkuYWRkU2VydmljZShrZXksIGltcGwpO1xuICAgIH1cbiAgICBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5U2VydmljZSA9IG51bGw7XG4gICAgYmVha2VyLm91dHB1dERpc3BsYXlTZXJ2aWNlID0gZmFjdG9yeTtcbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgVUkgdGhhdCBzaG93cyB0aGUgbGlzdCBvZiBldmFsdWF0b3JzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiBzZXR0aW5ncyBwYW5lbC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb3JlJyk7XG5cbiAgbW9kdWxlLmNvbnRyb2xsZXIoJ3BsdWdpbk1hbmFnZXJDdHJsJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckbW9kYWxJbnN0YW5jZScsICdia0NvcmVNYW5hZ2VyJywgJ2JrU2Vzc2lvbk1hbmFnZXInLCAnYmtNZW51UGx1Z2luTWFuYWdlcicsICdia0V2YWx1YXRlUGx1Z2luTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmtFdmFsdWF0b3JNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgYmtDb3JlTWFuYWdlcixia1Nlc3Npb25NYW5hZ2VyLCBia01lbnVQbHVnaW5NYW5hZ2VyLCBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBia0V2YWx1YXRvck1hbmFnZXIpIHtcblxuXG4gICAgJHNjb3BlLmRvQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5ldmFsVGFiT3Auc2hvd1VSTCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5zaG93V2FybmluZyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLmZvcmNlTG9hZCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5uZXdQbHVnaW5OYW1lT3JVcmwgPSBcIlwiO1xuICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoXCJva1wiKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldEV2YWx1YXRvckRldGFpbHMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldFZpc3VhbFBhcmFtcyhuYW1lKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmV2YWxUYWJPcCA9IHtcbiAgICAgIG5ld1BsdWdpbk5hbWVPclVybDogXCJcIixcbiAgICAgIHNob3dVUkw6IGZhbHNlLFxuICAgICAgc2hvd1dhcm5pbmc6IGZhbHNlLFxuICAgICAgc2hvd1NlY3VyaXR5V2FybmluZzogZmFsc2UsXG4gICAgICBmb3JjZUxvYWQ6IGZhbHNlLFxuICAgICAgZ2V0QWxsRXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvcnNXaXRoU3BlYzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3RpdmVQbHVnaW5zID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBwIGluIGFjdGl2ZVBsdWdpbnMpIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoYWN0aXZlUGx1Z2luc1twXS5zcGVjKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHRbcF0gPSBhY3RpdmVQbHVnaW5zW3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSxcbiAgICAgIGdldExvYWRpbmdFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRMb2FkaW5nRXZhbHVhdG9ycygpO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvclN0YXR1c2VzOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciBrbm93blBsdWdpbnMgPSBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5nZXRLbm93bkV2YWx1YXRvclBsdWdpbnMoKTtcbiAgICAgICAgdmFyIGFjdGl2ZVBsdWdpbnMgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB2YXIgbG9hZGluZ1BsdWdpbnMgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0TG9hZGluZ0V2YWx1YXRvcnMoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBwIGluIGtub3duUGx1Z2lucykge1xuICAgICAgICAgIHZhciBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoYWN0aXZlUGx1Z2luc1twXSlcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiYWN0aXZlXCI7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsIGluIGxvYWRpbmdQbHVnaW5zKSB7XG4gICAgICAgICAgICAgIGlmIChsb2FkaW5nUGx1Z2luc1tsXS5wbHVnaW4gPT0gcCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9IFwibG9hZGluZ1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0YXR1cykge1xuICAgICAgICAgICAgICBzdGF0dXMgPSBcImtub3duXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdFtwXSA9IHN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSxcbiAgICAgIHNldE5ld1BsdWdpbk5hbWVPclVybDogZnVuY3Rpb24ocGx1Z2luTmFtZU9yVXJsKSB7XG4gICAgICAgIHRoaXMubmV3UGx1Z2luTmFtZU9yVXJsID0gcGx1Z2luTmFtZU9yVXJsO1xuICAgICAgfSxcbiAgICAgIHRvZ2dsZVBsdWdpbjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIgcGx1Z2luID0gbmFtZSB8fCB0aGlzLm5ld1BsdWdpbk5hbWVPclVybDtcbiAgICAgICAgdmFyIGZyb21VcmwgPSBuYW1lID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5nZXRFdmFsdWF0b3JTdGF0dXNlcygpW3BsdWdpbl07XG5cbiAgICAgICAgaWYgKCFmcm9tVXJsICYmICFfLmNvbnRhaW5zKFsnYWN0aXZlJywgJ2tub3duJ10sIHN0YXR1cykpIHJldHVybjtcbiAgICAgICAgLy8gZm9yIG5vdywgaWYgdGhlIHBsdWdpbiBpc24ndCBmcm9tIGEgVVJMIG9yIGFjdGl2ZSBvciBrbm93blxuICAgICAgICAvLyAobmFtZWx5IGxvYWRpbmcpIHJldHVybi5cbiAgICAgICAgLy8gVE9ETzogb3RoZXIgc3RhdGVzIHdlIHNob3VsZCBzdXBwb3J0OiBmYWlsZWQgYW5kIGV4aXRpbmcuXG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAvLyB0dXJuIG9mZiBldmFsdWF0b3IgaWYgb25cbiAgICAgICAgICBpZiAoIWJrU2Vzc2lvbk1hbmFnZXIuZXZhbHVhdG9yVW51c2VkKHBsdWdpbikpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbFRhYk9wLnNob3dXYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnJlbW92ZUV2YWx1YXRvcihwbHVnaW4pO1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5yZW1vdmVFdmFsdWF0b3IocGx1Z2luKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvdGhlcndpc2UsIHR1cm4gb24gZXZhbHVhdG9yXG4gICAgICAgICAgaWYgKGZyb21VcmwpIHtcbiAgICAgICAgICAgIHZhciByID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgICAgIGlmIChyLnRlc3QocGx1Z2luKSAmJiAhJHNjb3BlLmV2YWxUYWJPcC5mb3JjZUxvYWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5ldmFsVGFiT3AuZm9yY2VMb2FkID0gZmFsc2U7XG4gICAgICAgICAgICAkc2NvcGUuZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybCA9IFwiXCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5ld0V2YWwgPSB7IG5hbWU6ICcnLCBwbHVnaW46IHBsdWdpbiB9O1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYWRkRXZhbHVhdG9yKG5ld0V2YWwpO1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5hZGRFdmFsdWF0b3IobmV3RXZhbCk7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdsYW5ndWFnZUFkZGVkJywgeyBldmFsdWF0b3I6IHBsdWdpbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUubWVudVRhYk9wID0ge1xuICAgICAgbmV3TWVudVBsdWdpblVybDogXCIuL3BsdWdpbi9tZW51L2RlYnVnLmpzXCIsXG4gICAgICBhZGRNZW51UGx1Z2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIubG9hZE1lbnVQbHVnaW4odGhpcy5uZXdNZW51UGx1Z2luVXJsKTtcbiAgICAgIH0sXG4gICAgICBnZXRNZW51UGx1Z2luczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYmtNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51UGx1Z2lucygpO1xuICAgICAgfSxcbiAgICAgIGdldExvYWRpbmdQbHVnaW5zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrTWVudVBsdWdpbk1hbmFnZXIuZ2V0TG9hZGluZ1BsdWdpbnMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSBmb3IgdGhlIFVJIHRoYXQgc2hvd3MgdGhlIGxpc3Qgb2YgZXZhbHVhdG9ycyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZ1xuICogc2V0dGluZ3MgcGFuZWwuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb3JlJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtQbHVnaW5NYW5hZ2VyRXZhbHVhdG9yU2V0dGluZ3MnLCBmdW5jdGlvbihcbiAgICAgICRjb21waWxlLCBia1Nlc3Npb25NYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlcl9ldmFsdWF0b3Jfc2V0dGluZ3NcIl0oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuc2V0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgJHNjb3BlLmV2YWx1YXRvci5wZXJmb3JtKHZhbCk7XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgc3BlYyA9IF8ubWFwKHNjb3BlLmV2YWx1YXRvci5zcGVjLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKHsgbmFtZToga2V5LCBrZXk6IGtleSB9LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLnByb3BlcnRpZXMgPSBfLmZpbHRlcihzcGVjLCBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uLnR5cGUgPT09IFwic2V0dGFibGVTdHJpbmdcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuYWN0aW9ucyA9IF8uZmlsdGVyKHNwZWMsIGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICAgIHJldHVybiBvcHRpb24udHlwZSA9PT0gXCJhY3Rpb25cIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrQ2VsbFxuICogLSB0aGUgY29udHJvbGxlciB0aGF0IHJlc3BvbnNpYmxlIGZvciBkaXJlY3RseSBjaGFuZ2luZyB0aGUgdmlld1xuICogLSB0aGUgY29udGFpbmVyIGZvciBzcGVjaWZpYyB0eXBlZCBjZWxsXG4gKiAtIHRoZSBkaXJlY3RpdmUgaXMgZGVzaWduZWQgdG8gYmUgY2FwYWJsZSBvZiB1c2VkIGluIGEgbmVzdGVkIHdheVxuICogLSBjb25jZXB0dWFsbHksIGEgY2VsbCBpcyAnY2VsbCBtb2RlbCcgKyAndmlldyBtb2RlbCcoYW4gZXhhbXBsZSBvZiB3aGF0IGdvZXMgaW4gdG8gdGhlIHZpZXdcbiAqIG1vZGVsIGlzIGNvZGUgY2VsbCBiZyBjb2xvcilcbiAqIC0gQSBia0NlbGwgaXMgZ2VuZXJpY2FsbHkgY29ycmVzcG9uZHMgdG8gYSBwb3J0aW9uIG9mIHRoZSBub3RlYm9vayBtb2RlbCAoY3VycmVudGx5LCBpdCBpc1xuICogYWx3YXlzIGEgYnJhbmNoIGluIHRoZSBoaWVyYXJjaHkpXG4gKiAtIFdoZW4gZXhwb3J0aW5nIChhLmsuYS4gc2hhcmluZyksIHdlIHdpbGwgbmVlZCBib3RoIHRoZSBjZWxsIG1vZGVsIGFuZCB0aGUgdmlldyBtb2RlbFxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnKTtcblxuICBtb2R1bGUuY29udHJvbGxlcignQ29kZUNlbGxPcHRpb25zQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRtb2RhbEluc3RhbmNlJywgJ2RzY29wZScsICdia0NvcmVNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgZHNjb3BlLCBia0NvcmVNYW5hZ2VyKSB7XG4gICAgJHNjb3BlLmRzY29wZSA9IGRzY29wZTtcbiAgICAkc2NvcGUuaW5pdGlhbGl6YXRpb25DZWxsID0gZHNjb3BlLmluaXRpYWxpemF0aW9uO1xuICAgICRzY29wZS5jZWxsTmFtZSA9IGRzY29wZS5pZDtcbiAgICAkc2NvcGUuY2VsbFRhZ3MgPSBkc2NvcGUudGFncztcbiAgICAkc2NvcGUuaXNJbml0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6YXRpb25DZWxsO1xuICAgIH07XG4gICAgJHNjb3BlLnRvZ2dsZUluaXRDZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemF0aW9uQ2VsbCA9ICF0aGlzLmluaXRpYWxpemF0aW9uQ2VsbDtcbiAgICB9O1xuICAgICRzY29wZS5zYXZlRGlzYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhKCggdGhpcy5nZXROYW1lRXJyb3IoKSA9PT0gJycgKSAmJiAoIHRoaXMuZ2V0VGFnRXJyb3IoKSA9PT0gJycgKSk7XG4gICAgfTtcbiAgICAkc2NvcGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEhJHNjb3BlLmdldE5hbWVFcnJvcigpIHx8ICEhJHNjb3BlLmdldFRhZ0Vycm9yKCk7XG4gICAgfTtcbiAgICAkc2NvcGUuZ2V0TmFtZUVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZih0aGlzLmRzY29wZS5pZCA9PT0gdGhpcy5jZWxsTmFtZSlcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLmNhblJlbmFtZUNlbGwodGhpcy5jZWxsTmFtZSk7XG4gICAgfTtcbiAgICAkc2NvcGUuZ2V0VGFnRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5jYW5TZXRVc2VyVGFncyh0aGlzLmNlbGxUYWdzKTtcbiAgICB9O1xuICAgICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoJ2Nsb3NlJyk7XG4gICAgfTtcbiAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc2F2ZURpc2FibGVkKCkpXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhciByZWIgPSBmYWxzZTtcbiAgICAgIHRoaXMuZHNjb3BlLmluaXRpYWxpemF0aW9uID0gdGhpcy5pbml0aWFsaXphdGlvbkNlbGw7XG4gICAgICBpZiAodGhpcy5kc2NvcGUudGFncyAhPT0gdGhpcy5jZWxsVGFncykge1xuICAgICAgICB0aGlzLmRzY29wZS50YWdzID0gdGhpcy5jZWxsVGFncztcbiAgICAgICAgcmViID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRzY29wZS5pZCAhPT0gdGhpcy5jZWxsTmFtZSlcbiAgICAgICAgYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0NlbGxNYW5hZ2VyKCkucmVuYW1lQ2VsbCh0aGlzLmRzY29wZS5pZCx0aGlzLmNlbGxOYW1lKTtcbiAgICAgIGVsc2UgaWYocmViKVxuICAgICAgICBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5yZWJ1aWxkTWFwcygpXG4gICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgnc2F2ZScpO1xuICAgIH07XG59XSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5jb21tb25VdGlsc1xuICogLSB0aGlzIHNob3VsZCBiZSB0aGUgbW9zdCBnZW5lcmFsIHV0aWxpdGllcywgdGhlIHV0aWxpdGllcyB0aGF0IGNvdWxkIGhhdmUgYmVlbiBmb3VuZCBpbiBhXG4gKiAzcmQtcGFydHkgbGlicmFyeVxuICogYW5kIHdlIGp1c3QgaGFwcGVuIHRvIHdyaXRlIG91ciBvd24uXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbW1vblV0aWxzJywgW10pO1xuICBtb2R1bGUuZmFjdG9yeSgnY29tbW9uVXRpbHMnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2VuZXJhdGVJZDogZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gXCJcIjtcbiAgICAgICAgdmFyIHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKGxlbmd0aCkpIHtcbiAgICAgICAgICBsZW5ndGggPSA2O1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH0sXG4gICAgICBsb2FkSlM6IGZ1bmN0aW9uKHVybCwgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBlLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgICAvLyBBZGQgdGhlIHRpbWUgdG8gdGhlIFVSTCB0byBhdm9pZCBjYWNoaW5nLlxuICAgICAgICB2YXIgbWlsbGlzID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGUuc3JjID0gdXJsICsgXCI/Xz1cIiArIG1pbGxpcztcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBlLm9ubG9hZCA9IHN1Y2Nlc3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZhaWx1cmUpIHtcbiAgICAgICAgICBlLm9uZXJyb3IgPSBmYWlsdXJlO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZSk7XG4gICAgICB9LFxuICAgICAgbG9hZENTUzogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICAgIGxpbmsudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgICAgICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZlbnRPZmZzZXRYOiBmdW5jdGlvbihlbGVtLCBldmVudCkgeyAvLyBvZmZzZXRYIGlzIG5vdCBkZWZpbmVkIGluIGZpcmVmb3hcbiAgICAgICAgdmFyIHggPSBldmVudC5vZmZzZXRYO1xuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZCh4KSAmJiAhXy5pc1VuZGVmaW5lZChlbGVtLm9mZnNldCkpIHtcbiAgICAgICAgICB4ID0gZXZlbnQucGFnZVggLSBlbGVtLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9LFxuICAgICAgbG9hZExpc3Q6IGZ1bmN0aW9uKHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgaWYgKHVybHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsID0gdXJscy5zaGlmdCgpO1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvYWRKUyh1cmwsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG1lLmxvYWRMaXN0KHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpO1xuICAgICAgICB9LCBmYWlsdXJlKTtcbiAgICAgIH0sXG4gICAgICBmaW5kVGFibGU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgZnVuY3Rpb24gZmluZENvbHVtbk5hbWVzKGVsZW0pIHtcbiAgICAgICAgICB2YXIgcm93ID0gZWxlbS5jaGlsZHJlblswXTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3cuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChyb3cuY2hpbGRyZW5baV0uaW5uZXJIVE1MKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZEVudHJpZXMoZWxlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChlbGVtLmNoaWxkcmVuW2ldLmlubmVySFRNTCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRWYWx1ZXMoZWxlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChmaW5kRW50cmllcyhlbGVtLmNoaWxkcmVuW2ldKSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YWcgPSBlbGVtLnRhZ05hbWU7XG4gICAgICAgIGlmICh0YWcgPT09ICdESVYnKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gdGhpcy5maW5kVGFibGUoZWxlbS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICBpZiAoc3ViKSByZXR1cm4gc3ViO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFnID09PSAnVEFCTEUnKSB7XG4gICAgICAgICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVG8gcHJldmVudCBmcm9tIG1hbmdsaW5nIHVzZXIgY3JlYXRlZCBodG1sIHRhYmxlLFxuICAgICAgICAgIC8vIG9ubHkgdXNlIHRhYmxlIGRpc3BsYXkgZm9yIGRhdGFmcmFtZSB0YWJsZXMgKEJFQUtFUi00NTYpXG4gICAgICAgICAgaWYgKCFfLmNvbnRhaW5zKGVsZW0uY2xhc3NMaXN0LCAnZGF0YWZyYW1lJykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgdGFibGUgY29udGFpbnMgZWxlbWVudHMgd2l0aCBjb2xzcGFuIGFuZC9vciByb3dzcGFuXG4gICAgICAgICAgLy8gdGhlIHNsb2NrZ3JpZCB0ZW1wbGF0ZSBkb2VzIG5vdCBzdXBwb3J0IHRoZW0gIChCRUFLRVItNjk0KVxuICAgICAgICAgIHZhciBoZWFkZXJSb3dzID0gJChlbGVtKS5maW5kKCd0aGVhZCcpLmZpbmQoJ3RyJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWFkZXJSb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2ggPSBoZWFkZXJSb3dzW2ldLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaj0wOyBqPGNoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmIChjaFtqXS5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKT4xIHx8IGNoW2pdLmdldEF0dHJpYnV0ZSgncm93c3BhbicpPjEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdmFsdWVSb3dzID0gJChlbGVtKS5maW5kKCd0Ym9keScpLmZpbmQoJ3RyJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZVJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZhbHVlUm93c1tpXS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAodmFyIGo9MDsgajxjaC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICBpZiAoY2hbal0uZ2V0QXR0cmlidXRlKCdjb2xzcGFuJyk+MSB8fCBjaFtqXS5nZXRBdHRyaWJ1dGUoJ3Jvd3NwYW4nKT4xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIGEgdGFibGUgd2l0aCBtdWx0aXBsZSByb3dzXG4gICAgICAgICAgLy8gY3VycmVudGx5IHRoZSB0YWJsZSBkaXNwbGF5cyBjYW4ndCBoYW5kbGUgbXVsdGlwbGUgcm93cyBvZiBoZWFkZXIgKEJFQUtFUi00MTYpXG4gICAgICAgICAgLy8gYWRkZWQgbG9naWMgdG8gY29sbGFwc2UgdGhlIHR3byBoZWFkZXIgcm93cyAgKEJFQUtFUi02OTQpXG4gICAgICAgICAgdmFyIGNvbHMgPSBbXTtcbiAgICAgICAgICBpZiAoaGVhZGVyUm93cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vaWYgdGhlcmUgYXJlIHR3byByb3dzLCBhbGxvdyB0YWJsZWRpc3BsYXkgYXMgbG9uZyBhcyBubyBjb2x1bW4gaGFzIHZhbHVlcyBpbiBib3RoIHJvd3NcbiAgICAgICAgICAgIC8vdGhpcyBpcyBiZWNhdXNlIHBhbmRhcyByZW5kZXJzIGRhdGFmcmFtZXMgd2l0aCB0aGUgaW5kZXggY29sIGhlYWRlciBvbiBhIHNlY29uZCByb3dcbiAgICAgICAgICAgIHZhciByb3cwID0gaGVhZGVyUm93cy5lcSgwKS5maW5kKCd0aCcpO1xuICAgICAgICAgICAgdmFyIHJvdzEgPSBoZWFkZXJSb3dzLmVxKDEpLmZpbmQoJ3RoJyk7XG5cdCAgICB2YXIgbWluID0gcm93MC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobWluPnJvdzEubGVuZ3RoKSB7XG5cdFx0bWluID0gcm93MS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1pbjsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciByMCA9IHJvdzAuZXEoaSk7XG4gICAgICAgICAgICAgIHZhciByMSA9IHJvdzEuZXEoaSk7XG5cbiAgICAgICAgICAgICAgLy9pZiBhbnkgY29sdW1uIGhhcyBodG1sIGluIGJvdGggcm93cywgZG9uJ3QgdXNlIHRhYmxlZGlzcGxheVxuICAgICAgICAgICAgICBpZiAocjAgIT09IHVuZGVmaW5lZCAmJiByMSAhPSB1bmRlZmluZWQgJiYgcjAuaHRtbCgpICYmIHIxLmh0bWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIwICE9PSB1bmRlZmluZWQgJiYgcjAuaHRtbCgpKSB7XG5cdCAgICAgICAgY29scy5wdXNoKHIwLmh0bWwoKSk7XG5cdCAgICAgIH0gZWxzZSBpZiAocjEgIT09IHVuZGVmaW5lZCAmJiByMS5odG1sKCkpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2gocjEuaHRtbCgpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcblx0XHRjb2xzLnB1c2goXCJcIik7XG5cdCAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhlYWRlclJvd3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy9pZiB0aGVyZSBhcmUgdHdvIG9yIG1vcmUgaGVhZGVyLCBmb3JnZXQgYWJvdXQgaXRcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xzID0gZmluZENvbHVtbk5hbWVzKCQoZWxlbSkuZmluZCgndGhlYWQnKVswXSk7XG5cdCAgfVxuXG4gICAgICAgICAgdmFyIHZhbHMgPSBmaW5kVmFsdWVzKCQoZWxlbSkuZmluZCgndGJvZHknKVswXSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiVGFibGVEaXNwbGF5XCIsXG4gICAgICAgICAgICB0YWJsZURpc3BsYXlNb2RlbDoge1xuICAgICAgICAgICAgICBjb2x1bW5OYW1lczogY29scyxcbiAgICAgICAgICAgICAgdmFsdWVzOiB2YWxzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sdW1uTmFtZXM6IGNvbHMsXG4gICAgICAgICAgICB2YWx1ZXM6IHZhbHNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGZvcm1hdFRpbWVTdHJpbmc6IGZ1bmN0aW9uKG1pbGxpcykge1xuICAgICAgICBpZiAobWlsbGlzIDwgNjAgKiAxMDAwKSB7XG4gICAgICAgICAgcmV0dXJuIChtaWxsaXMgLyAxMDAwKS50b0ZpeGVkKDEpICsgXCJzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShtaWxsaXMpO1xuICAgICAgICAgIHZhciBkID0gTWF0aC5mbG9vcihtaWxsaXMgLyAoMjQgKiA2MCAqIDYwICogMTAwMCkpO1xuICAgICAgICAgIHZhciBoID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgICAgICAgdmFyIHMgPSBkYXRlLmdldFVUQ1NlY29uZHMoKTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICBpZiAoZCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAoZCArIFwiZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gKGggKyBcImhcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IChtICsgXCJtXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocyA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAocyArIFwic1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTWlkZGxlQ2xpY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5idXR0b24gPT09IDEgLy8gbWlkZGxlIGNsaWNrXG4gICAgICAgICAgICB8fCAoZXZlbnQuYnV0dG9uID09PSAwIC8vIGxlZnQgY2xpY2tcbiAgICAgICAgICAgICYmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTWFjXCIpICE9PSAtMSA/IGV2ZW50Lm1ldGFLZXkgOiBldmVudC5jdHJsS2V5KSk7XG4gICAgICB9LFxuICAgICAgc2F2ZUFzQ2xpZW50RmlsZTogZnVuY3Rpb24gKGRhdGEsIGZpbGVuYW1lKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbW1vblV0aWxzLnNhdmVBc0NsaWVudEZpbGU6IE5vIGRhdGEnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICAgICAgZmlsZW5hbWUgPSAnY29uc29sZS5qc29uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhLCB1bmRlZmluZWQsIDQpXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwge3R5cGU6ICd0ZXh0L2pzb24nfSksXG4gICAgICAgICAgICBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyksXG4gICAgICAgICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cbiAgICAgICAgYS5kb3dubG9hZCA9IGZpbGVuYW1lXG4gICAgICAgIGEuaHJlZiA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgICAgIGEuZGF0YXNldC5kb3dubG9hZHVybCA9IFsndGV4dC9qc29uJywgYS5kb3dubG9hZCwgYS5ocmVmXS5qb2luKCc6JylcbiAgICAgICAgZS5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlLCBmYWxzZSwgd2luZG93LCAwLCAwLCAwLCAwLCAwLFxuICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpXG4gICAgICAgIGEuZGlzcGF0Y2hFdmVudChlKVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvbW1vblVpXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgZ2VuZXJhbCBzdG9yZSBvZiBsb3cgbGV2ZWwgVUkgZGlyZWN0aXZlcywgd2hpY2ggc2hvdWxkIGJlIHNlcGFyYXRlZCBvdXQgb3JcbiAqIHBvdGVudGlhbGx5IGZvdW5kIGVxdWl2YWxlbnQgaW4gM3JkIHBhcnR5IGxpYnJhcmllcy5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb21tb25VaScsIFtdKTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25DdHJsRW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuYmluZCgna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7IC8vIGN0cmwgKyBlbnRlclxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGF0dHJzLm9uQ3RybEVudGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdlYXRDbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIGVsZW1lbnQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdmb2N1c1N0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBRLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrY2VsbCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0MnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQubW91c2VvdmVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnY2VsbC1icmFja2V0LXNlbGVjdGVkJyk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50Lm1vdXNlb3V0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnY2VsbC1icmFja2V0LXNlbGVjdGVkJyk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZmlsdGVyKCdpc0hpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgcmV0dXJuIF8oaW5wdXQpLmZpbHRlcihmdW5jdGlvbihpdCkge1xuICAgICAgICByZXR1cm4gIWl0LmhpZGRlbjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdkcm9wZG93blByb21vdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gSXMgeW91ciBkcm9wZG93biBiZWluZyBjb3ZlcmVkIGJ5IGl0cyBhbmNlc3RvcnMgc2libGluZ3M/XG4gICAgLy8gUHJvbW90ZSB0aGF0IHNoaXosIGFuZCBwcmVwZW5kIGl0IHRvIHRoZSBub3RlYm9vayBzbyBpdCBkb2Vzbid0XG4gICAgLy8gZXZlciBnZXQgYnVsbGllZCBhZ2Fpbi5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdDJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAkKHdpbmRvdykub24oJ2NsaWNrLicgKyBzY29wZS4kaWQsIGhpZGVEcm9wZG93bik7XG5cbiAgICAgICAgdmFyIGRyb3Bkb3duID0gZWxlbWVudC5maW5kKCcuZHJvcGRvd24tbWVudScpLmZpcnN0KCk7XG4gICAgICAgIHZhciB0b2dnbGUgPSBlbGVtZW50LmZpbmQoJy5kcm9wZG93bi10b2dnbGUnKS5maXJzdCgpO1xuXG4gICAgICAgIGVsZW1lbnQub24oJ2NsaWNrJywgJy5kcm9wZG93bi10b2dnbGUnLCB0b2dnbGVEcm9wZG93bik7XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgICAgICAgaWYgKCQoZHJvcGRvd24pLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gaGlkZURyb3Bkb3duKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2hvd0Ryb3Bkb3duKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2hvd0Ryb3Bkb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBub3RlYm9vayA9IGJrSGVscGVyLmdldE5vdGVib29rRWxlbWVudChzY29wZSk7XG4gICAgICAgICAgICB2YXIgdG9nZ2xlUG9zaXRpb24gPSB0b2dnbGUub2Zmc2V0KCk7XG4gICAgICAgICAgICB2YXIgbm90ZWJvb2tQb3NpdGlvbiA9IG5vdGVib29rLm9mZnNldCgpO1xuXG4gICAgICAgICAgICBkcm9wZG93bi5wcmVwZW5kVG8obm90ZWJvb2spO1xuXG4gICAgICAgICAgICBkcm9wZG93bi5zaG93KCkuY3NzKHtcbiAgICAgICAgICAgICAgdG9wOiB0b2dnbGVQb3NpdGlvbi50b3AgLSBub3RlYm9va1Bvc2l0aW9uLnRvcCArICdweCcsXG4gICAgICAgICAgICAgIGxlZnQ6IHRvZ2dsZVBvc2l0aW9uLmxlZnQgLSBub3RlYm9va1Bvc2l0aW9uLmxlZnQgLSBkcm9wZG93bi5vdXRlcldpZHRoKCkgKyAncHgnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gaGlkZURyb3Bkb3duKCkgeyBkcm9wZG93bi5oaWRlKCk7fVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHdpbmRvdykub2ZmKCcuJyArIHNjb3BlLiRpZCk7XG4gICAgICAgICAgLy8gU2luY2UgdGhlIGRyb3Bkb3duIGlzIGV4dGVybmFsIHRvIHRoZSBkaXJlY3RpdmUgd2UgbmVlZCB0byBtYWtlIHN1cmUgdG8gY2xlYW4gaXQgdXAgd2hlbiB0aGUgZGlyZWN0aXZlIGdvZXMgYXdheVxuICAgICAgICAgIGRyb3Bkb3duLnJlbW92ZSgpO1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdjbGljaycpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtEcm9wZG93bk1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ3RlbXBsYXRlL2Ryb3Bkb3duJ10oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgICdtZW51SXRlbXMnOiAnPScsXG5cbiAgICAgICAgLy8gQ2xhc3NlcyB0byBiZSBhZGRlZCB0byBhbnkgc3VibWVudSBpdGVtLiBVc2VkIGZvciBhZGRpbmdcbiAgICAgICAgLy8gcHVsbC1sZWZ0IHRvIG1lbnVzIHRoYXQgYXJlIG9uIHRoZSBmYXIgcmlnaHQgKGUuZy4gYmtjZWxsbWVudSkuXG4gICAgICAgIHN1Ym1lbnVDbGFzc2VzOiAnQCdcbiAgICAgIH0sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5nZXRNZW51SXRlbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gXy5yZXN1bHQoJHNjb3BlLCAnbWVudUl0ZW1zJyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrRHJvcGRvd25NZW51SXRlbScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWyd0ZW1wbGF0ZS9kcm9wZG93bl9pdGVtJ10oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgICdpdGVtJzogJz0nXG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgaXNJdGVtRGlzYWJsZWQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGlzYWJsZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZW0uZGlzYWJsZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEFDbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGlzSXRlbURpc2FibGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZGlzYWJsZWQtbGluaycpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA8PSAxICYmIGl0ZW0uYXV0b1JlZHVjZSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgIGlmIChpc0l0ZW1EaXNhYmxlZChpdGVtLml0ZW1zWzBdKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2RpdmlkZXInKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZGl2aWRlcicpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnc3VibWVudScgfHwgaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaXRlbXMgJiYgaXRlbS5pdGVtcy5sZW5ndGggPD0gMSAmJiBpdGVtLmF1dG9SZWR1Y2UpIHtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Ryb3Bkb3duLXN1Ym1lbnUnKTtcbiAgICAgICAgICAgICAgLy8gQWRkIGFueSBleHRyYSBzdWJtZW51IGNsYXNzZXMuIChlLmcuIHRvIHNwZWNpZnkgaWYgaXQgc2hvdWxkIGJlIGxlZnQgb3IgcmlnaHQpLlxuICAgICAgICAgICAgICBpZiAoJHNjb3BlLnN1Ym1lbnVDbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VibWVudUNsYXNzZXMuc3BsaXQoJyAnKSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnJ1bkFjdGlvbiA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiBpdGVtLmF1dG9SZWR1Y2UpIHtcbiAgICAgICAgICAgIGl0ZW0uaXRlbXNbMF0uYWN0aW9uKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5hY3Rpb24pKSB7XG4gICAgICAgICAgICAgIGl0ZW0uYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXROYW1lID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciBuYW1lID0gJyc7XG4gICAgICAgICAgaWYgKGl0ZW0uaXRlbXMgJiYgaXRlbS5pdGVtcy5sZW5ndGggPT09IDEgJiYgaXRlbS5hdXRvUmVkdWNlKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pdGVtc1swXS5yZWR1Y2VkTmFtZSkge1xuICAgICAgICAgICAgICBuYW1lID0gaXRlbS5pdGVtc1swXS5yZWR1Y2VkTmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5hbWUgPSBpdGVtLml0ZW1zWzBdLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWUgPSBpdGVtLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24obmFtZSkpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc01lbnVJdGVtQ2hlY2tlZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS5pc0NoZWNrZWQpIHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5pc0NoZWNrZWQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmlzQ2hlY2tlZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXNDaGVja2VkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgc2NvcGUuZ2V0U3ViSXRlbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHNjb3BlLml0ZW0uaXRlbXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuaXRlbS5pdGVtcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc2NvcGUuaXRlbS5pdGVtcztcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKCdnZXRTdWJJdGVtcygpJywgZnVuY3Rpb24oaXRlbXMsIG9sZEl0ZW1zKSB7XG4gICAgICAgICAgaWYgKCFfLmlzRW1wdHkoaXRlbXMpKSB7XG4gICAgICAgICAgICAvL2pzY3M6ZGlzYWJsZVxuICAgICAgICAgICAgJGNvbXBpbGUoJzxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJnZXRTdWJJdGVtcygpXCI+PC9iay1kcm9wZG93bi1tZW51PicpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWQsIHNjb3BlKSB7XG4gICAgICAgICAgICAvL2pzY3M6ZW5hYmxlXG4gICAgICAgICAgICAgIGVsZW1lbnQuZmluZCgndWwuZHJvcGRvd24tbWVudScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0VudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgZWxlbWVudC5iaW5kKCdrZXlkb3duIGtleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLmJrRW50ZXIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTGFuZ3VhZ2VMb2dvJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogJzxzcGFuIG5nLXN0eWxlPVwic3R5bGVcIj57e25hbWV9fTwvc3Bhbj4nLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgbmFtZTogJ0AnLFxuICAgICAgICBiZ0NvbG9yOiAnQCcsXG4gICAgICAgIGZnQ29sb3I6ICdAJyxcbiAgICAgICAgYm9yZGVyQ29sb3I6ICdAJ1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBzY29wZS5zdHlsZSA9IHtcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHNjb3BlLmJnQ29sb3IsXG4gICAgICAgICAgJ2NvbG9yJzogc2NvcGUuZmdDb2xvclxuICAgICAgICB9O1xuICAgICAgICB2YXIgdXBkYXRlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5zdHlsZSA9IHtcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogc2NvcGUuYmdDb2xvcixcbiAgICAgICAgICAgICdjb2xvcic6IHNjb3BlLmZnQ29sb3JcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChzY29wZS5ib3JkZXJDb2xvcikge1xuICAgICAgICAgICAgc2NvcGUuc3R5bGVbJ2JvcmRlci13aWR0aCddID0gJzFweCc7XG4gICAgICAgICAgICBzY29wZS5zdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSBzY29wZS5ib3JkZXJDb2xvcjtcbiAgICAgICAgICAgIHNjb3BlLnN0eWxlWydib3JkZXItc3R5bGUnXSA9ICdzb2xpZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5zdHlsZVsnYm9yZGVyLXdpZHRoJ107XG4gICAgICAgICAgICBkZWxldGUgc2NvcGUuc3R5bGVbJ2JvcmRlci1jb2xvciddO1xuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLnN0eWxlWydib3JkZXItc3R5bGUnXTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnYmdDb2xvcicsIHVwZGF0ZVN0eWxlKTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdmZ0NvbG9yJywgdXBkYXRlU3R5bGUpO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2JvcmRlckNvbG9yJywgdXBkYXRlU3R5bGUpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmFuZ3VsYXJVdGlsc1xuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgQW5ndWxhckpTIHNwZWNpZmljIHV0aWxpdGllcyB0aGF0IGFyZSBzaGFyZWQgYWNyb3NzIHRoZSB3aG9sZSBhcHBsaWNhdGlvbi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuYW5ndWxhclV0aWxzJywgW10pO1xuICBtb2R1bGUuZmFjdG9yeSgnYW5ndWxhclV0aWxzJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkaHR0cCwgJHEsICR0aW1lb3V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldExvY2F0aW9uOiBmdW5jdGlvbihuZXdMb2NhdGlvbikge1xuICAgICAgICAkbG9jYXRpb24ucGF0aChuZXdMb2NhdGlvbik7XG4gICAgICB9LFxuICAgICAgcmVmcmVzaFJvb3RTY29wZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICRyb290U2NvcGUuJCRwaGFzZSB8fCAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIHRvUHJldHR5SnNvbjogZnVuY3Rpb24oYW5ndWxhckJvdW5kSnNPYmopIHtcbiAgICAgICAgaWYoYW5ndWxhckJvdW5kSnNPYmouY2VsbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaSA8IGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uYm9keSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5ib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmJvZHkgPSBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5ib2R5LnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQuYm9keSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dC5ib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgPSBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dC5ib2R5LnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSAnJCRoYXNoS2V5JykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXQgPSBKU09OLnN0cmluZ2lmeShhbmd1bGFyQm91bmRKc09iaiwgY2xlYW51cCwgNCkgKyBcIlxcblwiO1xuICAgICAgICB0aGlzLnJlbW92ZVN0cmluZ0FycmF5cyhhbmd1bGFyQm91bmRKc09iaik7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlU3RyaW5nQXJyYXlzOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgaWYob2JqLmNlbGxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBvYmouY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChvYmouY2VsbHNbaV0uYm9keSAhPT0gdW5kZWZpbmVkICYmICQuaXNBcnJheShvYmouY2VsbHNbaV0uYm9keSkpIHtcbiAgICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9ICdcXG4nO1xuICAgICAgICAgICAgICBvYmouY2VsbHNbaV0uYm9keSA9IG9iai5jZWxsc1tpXS5ib2R5LmpvaW4oW3NlcGFyYXRvcl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iai5jZWxsc1tpXS5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIG9iai5jZWxsc1tpXS5pbnB1dC5ib2R5ICE9PSB1bmRlZmluZWQgJiYgJC5pc0FycmF5KG9iai5jZWxsc1tpXS5pbnB1dC5ib2R5KSkge1xuICAgICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gJ1xcbic7XG4gICAgICAgICAgICAgIG9iai5jZWxsc1tpXS5pbnB1dC5ib2R5ID0gb2JqLmNlbGxzW2ldLmlucHV0LmJvZHkuam9pbihbc2VwYXJhdG9yXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZnJvbVByZXR0eUpzb246IGZ1bmN0aW9uKGpzb25TdHJpbmcpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gYW5ndWxhci5mcm9tSnNvbihqc29uU3RyaW5nKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZVN0cmluZ0FycmF5cyhyZXQpO1xuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuICAgICAgaHR0cEdldDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IHVybCwgcGFyYW1zOiBkYXRhfSk7XG4gICAgICB9LFxuICAgICAgaHR0cFBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgZGF0YTogJC5wYXJhbShkYXRhKSxcbiAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBodHRwUHV0SnNvbjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbmV3RGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJHEuZGVmZXIoKTtcbiAgICAgIH0sXG4gICAgICBuZXdQcm9taXNlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRxLmFsbC5hcHBseSgkcSwgYXJndW1lbnRzKTtcbiAgICAgIH0sXG4gICAgICBmY2FsbDogZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZ1bmMoKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBmdW5jdGlvbiAoZnVuYywgbXMpIHtcbiAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZ1bmMsIG1zKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxUaW1lb3V0OiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgICR0aW1lb3V0LmNhbmNlbChwcm9taXNlKTtcbiAgICAgIH0sXG4gICAgICBkZWxheTogZnVuY3Rpb24obXMpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICB9LCBtcyk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBpcyBhIHJldXNhYmxlIFVJIGNvbXBvbmVudCBmb3IgdHJlZSB2aWV3cy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciB0cmVlVmlldyA9IGFuZ3VsYXIubW9kdWxlKCdiay50cmVlVmlldycsIFsnbmdBbmltYXRlJ10pO1xuXG4gIHRyZWVWaWV3LmZhY3RvcnkoJ2ZpbGVTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9wcm92aWRlciA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBzZXRQcm92aWRlcjogZnVuY3Rpb24ocHJvdmlkZXJzKSB7XG4gICAgICAgIF9wcm92aWRlciA9IHByb3ZpZGVycztcbiAgICAgIH0sXG4gICAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24odXJpLCBjYWxsYmFjaykge1xuICAgICAgICBfcHJvdmlkZXIuZ2V0Q2hpbGRyZW4odXJpLCBjYWxsYmFjayk7XG4gICAgICB9LFxuICAgICAgZmlsbElucHV0OiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgX3Byb3ZpZGVyLmZpbGxJbnB1dCh1cmkpO1xuICAgICAgfSxcbiAgICAgIG9wZW46IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICBfcHJvdmlkZXIub3Blbih1cmkpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIHRyZWVWaWV3LmRpcmVjdGl2ZShcInRyZWVWaWV3XCIsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlLCAkcm9vdFNjb3BlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogXCI8dHJlZS1ub2RlIGRhdGE9J3Jvb3QnIGZzPSdmcycgZGlzcGxheW5hbWU9J3t7IHJvb3R1cmkgfX0nPjwvdHJlZS1ub2RlPlwiLFxuICAgICAgc2NvcGU6IHtyb290dXJpOiBcIkBcIiwgZnM6IFwiPVwifSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICBpZiAoISR0ZW1wbGF0ZUNhY2hlLmdldCgndHJlZU5vZGVDaGlsZHJlbi5odG1sJykpIHtcbiAgICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RyZWVOb2RlQ2hpbGRyZW4uaHRtbCcsIFwiPHRyZWUtbm9kZSBjbGFzcz0nYmstdHJlZXZpZXcnIG5nLXJlcGVhdD0nZCBpbiBkYXRhLmNoaWxkcmVuIHwgZmlsZUZpbHRlcjpmcy5maWx0ZXIgfCBvcmRlckJ5OmZzLmdldE9yZGVyQnkoKTpmcy5nZXRPcmRlclJldmVyc2UoKScgZGF0YT0nZCcgZnM9J2ZzJz48L3RyZWUtbm9kZT5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV8uc3RyaW5nLmVuZHNXaXRoKCRzY29wZS5yb290dXJpLCAnLycpKSB7XG4gICAgICAgICAgJHNjb3BlLnJvb3R1cmkgPSAkc2NvcGUucm9vdHVyaSArICcvJztcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuZnNQcmVmcyA9ICRyb290U2NvcGUuZnNQcmVmcyB8fCB7XG4gICAgICAgICAgb3BlbkZvbGRlcnM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnJvb3QgPSB7XG4gICAgICAgICAgdHlwZTogXCJkaXJlY3RvcnlcIixcbiAgICAgICAgICB1cmk6ICRzY29wZS5yb290dXJpLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uY29udGFpbnMoJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzLCAkc2NvcGUucm9vdHVyaSkpIHtcbiAgICAgICAgICAkc2NvcGUuZnMuZ2V0Q2hpbGRyZW4oJHNjb3BlLnJvb3R1cmksICRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRzY29wZS5yb290LmNoaWxkcmVuID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgdHJlZVZpZXcuZmlsdGVyKFwiZmlsZUZpbHRlclwiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY2hpbGRyZW4sIGZpbHRlcikge1xuICAgICAgcmV0dXJuIF8uaXNGdW5jdGlvbihmaWx0ZXIpID8gXyhjaGlsZHJlbikuZmlsdGVyKGZpbHRlcikgOiBjaGlsZHJlbjtcbiAgICB9O1xuICB9KVxuXG4gIHRyZWVWaWV3LmRpcmVjdGl2ZShcInRyZWVOb2RlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IFwiPHNwYW4gbmctZGJsY2xpY2s9J2RibENsaWNrKCknIG5nLWNsaWNrPSdjbGljaygpJz48aSBjbGFzcz0ne3sgZ2V0SWNvbigpIH19Jz48L2k+IDxzcGFuPnt7IGdldERpc3BsYXlOYW1lKCkgfX08L3NwYW4+PC9zcGFuPlwiICtcbiAgICAgICAgICBcIjxkaXYgY2xhc3M9J3B1c2hyaWdodCc+XCIgK1xuICAgICAgICAgIFwiPGRpdiBuZy1pbmNsdWRlPSdcXFwidHJlZU5vZGVDaGlsZHJlbi5odG1sXFxcIic+PC9kaXY+XCIgK1xuICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICBzY29wZToge2RhdGE6IFwiPVwiLCBmczogXCI9XCIsIGRpc3BsYXluYW1lOiBcIkBcIn0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUpIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogYy50eXBlLFxuICAgICAgICAgICAgdXJpOiBjLnVyaSxcbiAgICAgICAgICAgIG1vZGlmaWVkOiBjLm1vZGlmaWVkLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IGMuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICBjaGlsZHJlbjogXy5tYXAoYy5jaGlsZHJlbiwgdHJhbnNmb3JtKVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICB2YXIgdXJpID0gJHNjb3BlLmRhdGEudXJpO1xuICAgICAgICAgICAgaWYgKCFfLnN0cmluZy5lbmRzV2l0aCh1cmksICcvJykpIHtcbiAgICAgICAgICAgICAgdXJpID0gdXJpICsgJy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmZzLmZpbGxJbnB1dCh1cmkpO1xuICAgICAgICAgICAgLy8gdG9nZ2xlXG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eSgkc2NvcGUuZGF0YS5jaGlsZHJlbikpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuY2hpbGRyZW4uc3BsaWNlKDAsICRzY29wZS5kYXRhLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycyA9IF8ucmVqZWN0KCRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycywgZnVuY3Rpb24oZm9sZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uc3RyaW5nLnN0YXJ0c1dpdGgoZm9sZGVyLCB1cmkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycy5wdXNoKHVyaSk7XG4gICAgICAgICAgICAgICRzY29wZS5mcy5nZXRDaGlsZHJlbigkc2NvcGUuZGF0YS51cmkpLnN1Y2Nlc3MoZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IF8uc29ydEJ5KGNoaWxkcmVuLCBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoYy50eXBlID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiEhISEhXCIgKyBjLnVyaS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGMudXJpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuY2hpbGRyZW4gPSBfLm1hcChjaGlsZHJlbiwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5mcy5maWxsSW5wdXQoJHNjb3BlLmRhdGEudXJpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5kYmxDbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS50eXBlID09PSAnZGlyZWN0b3J5JykgcmV0dXJuO1xuXG4gICAgICAgICAgJHNjb3BlLmZzLm9wZW4oJHNjb3BlLmRhdGEudXJpKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldEljb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEudHlwZSA9PT0gXCJkaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgcmV0dXJuICdmb2xkZXItaWNvbic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS50eXBlID09PSBcImFwcGxpY2F0aW9uL3Bycy50d29zaWdtYS5iZWFrZXIubm90ZWJvb2sranNvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2dseXBoaWNvbiBnbHlwaGljb24tYm9vayc7XG4gICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuZnMuZ2V0SWNvbiAmJiAkc2NvcGUuZnMuZ2V0SWNvbigkc2NvcGUuZGF0YS50eXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5mcy5nZXRJY29uKCRzY29wZS5kYXRhLnR5cGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2dseXBoaWNvbiBnbHlwaGljb24tdGgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RGlzcGxheU5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmRpc3BsYXluYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmRpc3BsYXluYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZGF0YS5kaXNwbGF5TmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5hbWUgPSAkc2NvcGUuZGF0YS51cmk7XG4gICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4gMCAmJiBuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcvJykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIG5hbWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5jb21ldGRVdGlsc1xuICogVGhpcyBtb2R1bGUgb2ZmZXJzIHRoZSBjb21ldGQgc2VydmljZSB0aGF0IGlzIHVzZWQgdG8gcmVjZWl2ZSAncHVzaGVzJyBmcm9tIHRoZSBzZXJ2ZXIuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbWV0ZFV0aWxzJywgW10pO1xuICBtb2R1bGUuZmFjdG9yeSgnY29tZXRkVXRpbHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9zdGF0dXNMaXN0ZW5lcjtcbiAgICB2YXIgX291dHB1dExpc3RlbmVyO1xuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXplQ29tZXRkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgJC5jb21ldGQuaW5pdCh7XG4gICAgICAgICAgdXJsOiB1cmlcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICAgIF9zdGF0dXNMaXN0ZW5lciA9ICQuY29tZXRkLmFkZExpc3RlbmVyKFwiL21ldGEvY29ubmVjdFwiLCBjYik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF9zdGF0dXNMaXN0ZW5lcikge1xuICAgICAgICAgICQuY29tZXRkLnJlbW92ZUxpc3RlbmVyKF9zdGF0dXNMaXN0ZW5lcik7XG4gICAgICAgICAgX3N0YXR1c0xpc3RlbmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXI6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICB0aGlzLnJlbW92ZU91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyKCk7XG4gICAgICAgIF9vdXRwdXRMaXN0ZW5lciA9ICQuY29tZXRkLnN1YnNjcmliZShcIi9vdXRwdXRsb2dcIiwgY2IpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZU91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfb3V0cHV0TGlzdGVuZXIpIHtcbiAgICAgICAgICAkLmNvbWV0ZC5yZW1vdmVMaXN0ZW5lcihfb3V0cHV0TGlzdGVuZXIpO1xuICAgICAgICAgIF9vdXRwdXRMaXN0ZW5lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgcmV0dXJuICQuY29tZXRkLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ub3RlYm9va1ZlcnNpb25NYW5hZ2VyXG4gKiBPZmZlcnMgdXRpbGl0aWVzIHRvIGNvbnZlcnQgYmVha2VyIG5vdGVib29rIG9mIG9sZCB2ZXJzaW9ucyB0byB0aGUgbGF0ZXN0IHZlcnNpb25cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2tWZXJzaW9uTWFuYWdlcicsIFtdKTtcblxuICB2YXIgYmtOYlYxQ29udmVydGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIC8vIGluIHYxLCBjZWxsIGxldmVsIGJ5IGRlZmluaXRpb24gaXMgdGhlIGNvdW50IG9mIHN0ZXBzIGF3YXkgZnJvbSBcInJvb3RcIiBpbiB0aGUgdHJlZVxuICAgIHZhciBnZXRTZWN0aW9uQ2VsbExldmVsID0gZnVuY3Rpb24oY2VsbCwgdGFnTWFwKSB7XG4gICAgICB2YXIgZ2V0UGFyZW50SWQgPSBmdW5jdGlvbihjSWQpIHtcbiAgICAgICAgdmFyIHBJZCA9IG51bGw7XG4gICAgICAgIF8odGFnTWFwKS5maW5kKGZ1bmN0aW9uKHYsIGspIHtcbiAgICAgICAgICBpZiAoXyh2KS5jb250YWlucyhjSWQpKSB7XG4gICAgICAgICAgICBwSWQgPSBrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBJZDtcbiAgICAgIH07XG4gICAgICB2YXIgbGV2ZWwgPSAwO1xuICAgICAgdmFyIHBhcmVudElkID0gZ2V0UGFyZW50SWQoY2VsbC5pZCk7XG4gICAgICB3aGlsZSAocGFyZW50SWQpIHtcbiAgICAgICAgKytsZXZlbDtcbiAgICAgICAgcGFyZW50SWQgPSBnZXRQYXJlbnRJZChwYXJlbnRJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGV2ZWw7XG4gICAgfTtcbiAgICB2YXIgY29udmVydENvZGVDZWxsID0gZnVuY3Rpb24oY2VsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJpZFwiOiBjZWxsLmlkLFxuICAgICAgICBcInR5cGVcIjogXCJjb2RlXCIsXG4gICAgICAgIFwiZXZhbHVhdG9yXCI6IGNlbGwuZXZhbHVhdG9yLFxuICAgICAgICBcImlucHV0XCI6IGNlbGwuaW5wdXQsXG4gICAgICAgIFwib3V0cHV0XCI6IGNlbGwub3V0cHV0XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRTZWN0aW9uQ2VsbCA9IGZ1bmN0aW9uKGNlbGwsIHRhZ01hcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJpZFwiOiBjZWxsLmlkLFxuICAgICAgICBcInR5cGVcIjogXCJzZWN0aW9uXCIsXG4gICAgICAgIFwibGV2ZWxcIjogZ2V0U2VjdGlvbkNlbGxMZXZlbChjZWxsLCB0YWdNYXApLFxuICAgICAgICBcInRpdGxlXCI6IGNlbGwudGl0bGUsXG4gICAgICAgIFwiY29sbGFwc2VkXCI6IGNlbGwuY29sbGFwc2VkXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRUZXh0Q2VsbCA9IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiaWRcIjogY2VsbC5pZCxcbiAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICBcImJvZHlcIjogY2VsbC5ib2R5XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRNYXJrZG93bkNlbGwgPSBmdW5jdGlvbihjZWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBcImlkXCI6IGNlbGwuaWQsXG4gICAgICAgIFwidHlwZVwiOiBcIm1hcmtkb3duXCIsXG4gICAgICAgIFwiYm9keVwiOiBjZWxsLmJvZHksXG4gICAgICAgIFwibW9kZVwiOiBjZWxsLm1vZGVcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydENlbGwgPSBmdW5jdGlvbihjZWxsLCB0YWdNYXAsIHRhZ01hcDIpIHtcbiAgICAgIHZhciByZXRDZWxsO1xuICAgICAgc3dpdGNoIChjZWxsLmNsYXNzWzBdKSB7XG4gICAgICAgIGNhc2UgXCJjb2RlXCI6XG4gICAgICAgICAgcmV0Q2VsbCA9IGNvbnZlcnRDb2RlQ2VsbChjZWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlY3Rpb25cIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydFNlY3Rpb25DZWxsKGNlbGwsIHRhZ01hcCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgcmV0Q2VsbCA9IGNvbnZlcnRUZXh0Q2VsbChjZWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1hcmtkb3duXCI6XG4gICAgICAgICAgcmV0Q2VsbCA9IGNvbnZlcnRNYXJrZG93bkNlbGwoY2VsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodGFnTWFwMiAmJiBfKHRhZ01hcDIuaW5pdGlhbGl6YXRpb24pLmNvbnRhaW5zKGNlbGwuaWQpKSB7XG4gICAgICAgIHJldENlbGwuaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldENlbGw7XG4gICAgfTtcbiAgICB2YXIgZ2V0Q2VsbElkcyA9IGZ1bmN0aW9uKGNlbGxzLCB0YWdNYXApIHtcbiAgICAgIHZhciBjZWxsSWRzID0gW107XG4gICAgICB2YXIgY0lkLCBjaGlsZHJlbjtcbiAgICAgIHZhciBzdGFjayA9IFtcInJvb3RcIl07XG4gICAgICB3aGlsZSAoIV8uaXNFbXB0eShzdGFjaykpIHtcbiAgICAgICAgY0lkID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGNlbGxJZHMucHVzaChjSWQpO1xuICAgICAgICBpZiAodGFnTWFwLmhhc093blByb3BlcnR5KGNJZCkpIHtcbiAgICAgICAgICBjaGlsZHJlbiA9IF8odGFnTWFwW2NJZF0pLmNsb25lKCk7XG4gICAgICAgICAgaWYgKCFfKGNoaWxkcmVuKS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHN0YWNrID0gc3RhY2suY29uY2F0KGNoaWxkcmVuLnJldmVyc2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2VsbElkcztcbiAgICB9O1xuICAgIHZhciBnZW5lcmF0ZUNlbGxNYXAgPSBmdW5jdGlvbihjZWxscykge1xuICAgICAgdmFyIGNlbGxNYXAgPSB7fTtcbiAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICBjZWxsTWFwW2NlbGwuaWRdID0gY2VsbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNlbGxNYXA7XG4gICAgfTtcbiAgICB2YXIgY29udmVydENlbGxzID0gZnVuY3Rpb24oY2VsbHMsIHRhZ01hcCwgdGFnTWFwMikge1xuICAgICAgdmFyIGNlbGxJZHMgPSBnZXRDZWxsSWRzKGNlbGxzLCB0YWdNYXApO1xuICAgICAgdmFyIGNlbGxNYXAgPSBnZW5lcmF0ZUNlbGxNYXAoY2VsbHMpO1xuICAgICAgdmFyIHYyQ2VsbHMgPSBfKGNlbGxJZHMpLmNoYWluKClcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQgIT09IFwicm9vdFwiO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGxNYXBbaWRdO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gIWNlbGwuaGlkZVRpdGxlO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udmVydENlbGwoY2VsbCwgdGFnTWFwLCB0YWdNYXAyKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC52YWx1ZSgpO1xuICAgICAgcmV0dXJuIHYyQ2VsbHM7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb252ZXJ0OiBmdW5jdGlvbihub3RlYm9va1YxKSB7XG4gICAgICAgIHZhciBub3RlYm9va1YyID0ge1xuICAgICAgICAgIGJlYWtlcjogXCIyXCIsXG4gICAgICAgICAgZXZhbHVhdG9yczogbm90ZWJvb2tWMS5ldmFsdWF0b3JzLFxuICAgICAgICAgIGNlbGxzOiBjb252ZXJ0Q2VsbHMobm90ZWJvb2tWMS5jZWxscywgbm90ZWJvb2tWMS50YWdNYXAsIG5vdGVib29rVjEudGFnTWFwMiksXG4gICAgICAgICAgbG9ja2VkOiBub3RlYm9va1YxLmxvY2tlZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm90ZWJvb2tWMjtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia05vdGVib29rVmVyc2lvbk1hbmFnZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3BlbjogZnVuY3Rpb24obm90ZWJvb2spIHtcbiAgICAgICAgaWYgKF8uaXNFbXB0eShub3RlYm9vaykpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJiZWFrZXJcIjogXCIyXCIsXG4gICAgICAgICAgICBcImV2YWx1YXRvcnNcIjogW10sXG4gICAgICAgICAgICBcImNlbGxzXCI6IFtdXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBub3RlYm9vayBpcyBhIHN0cmluZywgcGFyc2UgaXQgdG8ganMgb2JqZWN0XG4gICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG5vdGVib29rKSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub3RlYm9vayA9IGFuZ3VsYXIuZnJvbUpzb24obm90ZWJvb2spO1xuICAgICAgICAgICAgLy8gVE9ETywgdG8gYmUgcmVtb3ZlZC4gTG9hZCBhIGNvcnJ1cHRlZCBub3RlYm9vay5cbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG5vdGVib29rKSkge1xuICAgICAgICAgICAgICBub3RlYm9vayA9IGFuZ3VsYXIuZnJvbUpzb24obm90ZWJvb2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhpcyBpcyBub3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2sgSlNPTlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Iobm90ZWJvb2spO1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiTm90IGEgdmFsaWQgQmVha2VyIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGJlYWtlciB2ZXJzaW9uIGlzIHVuZGVmaW5lZFxuICAgICAgICAvLyB0cmVhdCBpdCBhcyBiZWFrZXIgbm90ZWJvb2sgdjFcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQobm90ZWJvb2suYmVha2VyKSkge1xuICAgICAgICAgIG5vdGVib29rLmJlYWtlciA9IFwiMVwiO1xuICAgICAgICB9XG4gICAgICAgIC8vY2hlY2sgdmVyc2lvbiBhbmQgc2VlIGlmIG5lZWQgY29udmVyc2lvblxuICAgICAgICBpZiAobm90ZWJvb2suYmVha2VyID09PSBcIjFcIikge1xuICAgICAgICAgIG5vdGVib29rID0gYmtOYlYxQ29udmVydGVyLmNvbnZlcnQobm90ZWJvb2spO1xuICAgICAgICB9IGVsc2UgaWYgKG5vdGVib29rLmJlYWtlciA9PT0gXCIyXCIpIHtcbiAgICAgICAgICAvLyBnb29kLCBcIjJcIiBpcyB0aGUgY3VycmVudCB2ZXJzaW9uXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgXCJVbmtub3duIEJlYWtlciBub3RlYm9vayB2ZXJzaW9uXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm90ZWJvb2s7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsub3V0cHV0TG9nXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlIG9mIGdldCBvdXRwdXQgbG9nIGZyb20gdGhlIHNlcnZlci5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsub3V0cHV0TG9nJywgWydiay51dGlscycsICdiay5jb21ldGRVdGlscyddKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2JrT3V0cHV0TG9nJywgZnVuY3Rpb24gKGJrVXRpbHMsIGNvbWV0ZFV0aWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldExvZzogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L291dHB1dGxvZy9nZXRcIiksIHt9KVxuICAgICAgICAgICAgLnN1Y2Nlc3MoY2IpXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBnZXQgb3V0cHV0IGxvZ1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5hZGRPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcihjYik7XG4gICAgICB9LFxuICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21ldGRVdGlscy5yZW1vdmVPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcigpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogIE1vZHVsZSBiay5yZWNlbnRNZW51XG4gKiAgVGhpcyBtb2R1bGUgb3ducyB0aGUgc2VydmljZSBvZiByZXRyaWV2aW5nIHJlY2VudCBtZW51IGl0ZW1zIGFuZCB1cGRhdGluZyB0aGUgcmVjZW50IG1lbnUuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnJlY2VudE1lbnUnLCBbJ2JrLmFuZ3VsYXJVdGlscyddKTtcblxuICBtb2R1bGUucHJvdmlkZXIoXCJia1JlY2VudE1lbnVcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zZXJ2ZXIgPSBudWxsO1xuICAgIHRoaXMuY29uZmlnU2VydmVyID0gZnVuY3Rpb24oc2VydmVyKSB7XG4gICAgICBfc2VydmVyID0gc2VydmVyO1xuICAgIH07XG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oYW5ndWxhclV0aWxzKSB7XG4gICAgICB2YXIgb3BJdGVtcyA9IHtcbiAgICAgICAgRU1QVFk6IHtuYW1lOiBcIihFbXB0eSlcIiwgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAgICBESVZJREVSOiB7dHlwZTogXCJkaXZpZGVyXCJ9LFxuICAgICAgICBDTEVBUklORzoge25hbWU6IFwiKENsZWFyaW5nLi4uKVwiLCBkaXNhYmxlZDogdHJ1ZX0sXG4gICAgICAgIFVQREFUSU5HOiB7bmFtZTogXCIoVXBkYXRpbmcuLi4pXCIsIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgICAgQ0xFQVI6IHtuYW1lOiBcIkNsZWFyXCIsIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJNZW51KCk7XG4gICAgICAgIH0gfSxcbiAgICAgICAgUkVGUkVTSDoge25hbWU6IFwiUmVmcmVzaFwiLCBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlZnJlc2hNZW51KCk7XG4gICAgICAgIH0gfVxuICAgICAgfTtcbiAgICAgIHZhciBfcmVjZW50TWVudSA9IFtvcEl0ZW1zLkVNUFRZXTtcbiAgICAgIHZhciByZWZyZXNoTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV9zZXJ2ZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCwgb3BJdGVtcy5VUERBVElORyk7XG4gICAgICAgIF9zZXJ2ZXIuZ2V0SXRlbXMoZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICB2YXIgaSwgSElTVE9SWV9MRU5HVEggPSAxMDtcbiAgICAgICAgICB2YXIgZ2V0U2hvcnROYW1lID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgICBpZiAodXJsICYmIHVybFt1cmwubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoXy5pc0VtcHR5KGl0ZW1zKSkge1xuICAgICAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCwgb3BJdGVtcy5FTVBUWSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZWNlbnRNZW51LnNwbGljZSgwLCBfcmVjZW50TWVudS5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aCAmJiBpIDwgSElTVE9SWV9MRU5HVEg7ICsraSkge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gYW5ndWxhci5mcm9tSnNvbihpdGVtc1tpXSk7XG4gICAgICAgICAgICAgICAgICBfcmVjZW50TWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2V0U2hvcnROYW1lKGl0ZW0udXJpKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfcGF0aE9wZW5lci5vcGVuKGl0ZW0udXJpLCBpdGVtLnR5cGUsIGl0ZW0ucmVhZE9ubHksIGl0ZW0uZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogaXRlbS51cmlcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBleGlzdHMgb25seSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgIF9yZWNlbnRNZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnZXRTaG9ydE5hbWUoaXRlbSksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3BhdGhPcGVuZXIub3BlbihpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogaXRlbVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgY2xlYXJNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIF9yZWNlbnRNZW51LnNwbGljZSgwLCBfcmVjZW50TWVudS5sZW5ndGgsIG9wSXRlbXMuQ0xFQVJJTkcpO1xuICAgICAgICBfc2VydmVyLmNsZWFyKHJlZnJlc2hNZW51KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBfcGF0aE9wZW5lcjtcbiAgICAgIHJlZnJlc2hNZW51KCk7IC8vIGluaXRpYWxpemVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHBhdGhPcGVuZXIpIHtcbiAgICAgICAgICBfcGF0aE9wZW5lciA9IHBhdGhPcGVuZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWNlbnRNZW51O1xuICAgICAgICB9LFxuICAgICAgICByZWNvcmRSZWNlbnREb2N1bWVudDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChfc2VydmVyKSB7XG4gICAgICAgICAgICBfc2VydmVyLmFkZEl0ZW0oaXRlbSwgcmVmcmVzaE1lbnUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5zZXNzaW9uXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlcyBvZiBjb21tdW5pY2F0aW5nIHRvIHRoZSBzZXNzaW9uIGJhY2t1cCBlbmQgcG9pbnQgdG8gbG9hZCBhbmRcbiAqIHVwbG9hZChiYWNrdXApIGEgc2Vzc2lvbi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuc2Vzc2lvbicsIFsnYmsudXRpbHMnXSk7XG4gIC8qKlxuICAgKiBia1Nlc3Npb25cbiAgICogLSB0YWxrcyB0byBiZWFrZXIgc2VydmVyICgvYmVha2VyL3Jlc3Qvc2Vzc2lvbilcbiAgICogLSBia1Nlc3Npb25NYW5hZ2VyIHNob3VsZCBkZXBlbmQgb24gaXQgdG8gdXBkYXRlL2JhY2t1cCB0aGUgc2Vzc2lvbiBtb2RlbFxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrU2Vzc2lvbicsIGZ1bmN0aW9uKGJrVXRpbHMpIHtcbiAgICB2YXIgYmFja3VwU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb25JZCwgc2Vzc2lvbkRhdGEpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIGJrVXRpbHMuaHR0cFBvc3QoYmtVdGlscy5zZXJ2ZXJVcmwoJ2JlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2JhY2t1cC8nICsgc2Vzc2lvbklkKSwgc2Vzc2lvbkRhdGEpXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGJhY2t1cCBzZXNzaW9uOiAnICsgc2Vzc2lvbklkICsgJywgJyArIHN0YXR1cyk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0ZhaWxlZCB0byBiYWNrdXAgc2Vzc2lvbjogJyArIHNlc3Npb25JZCArICcsICcgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2Vzc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybCgnYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvZ2V0RXhpc3RpbmdTZXNzaW9ucycpKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNlc3Npb25zKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNlc3Npb25zKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdGYWlsZWQgdG8gZ2V0IGV4aXN0aW5nIHNlc3Npb25zICcgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICB2YXIgbG9hZFNlc3Npb24gPSBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybCgnYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvbG9hZCcpLCB7c2Vzc2lvbmlkOiBzZXNzaW9uSWR9KVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNlc3Npb24sIHN0YXR1cykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzZXNzaW9uKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdGYWlsZWQgdG8gbG9hZCBzZXNzaW9uOiAnICsgc2Vzc2lvbklkICsgJywgJyArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xuICAgIHZhciBjbG9zZVNlc3Npb24gPSBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIGJrVXRpbHMuaHR0cFBvc3QoYmtVdGlscy5zZXJ2ZXJVcmwoJ2JlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2Nsb3NlJyksIHtzZXNzaW9uaWQ6IHNlc3Npb25JZH0pXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNlc3Npb25JZCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnRmFpbGVkIHRvIGNsb3NlIHNlc3Npb246ICcgKyBzZXNzaW9uSWQgKyAnLCAnICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgdmFyIHJlY29yZExvYWRlZFBsdWdpbiA9IGZ1bmN0aW9uKHBsdWdpbk5hbWUsIHBsdWdpblVybCkge1xuICAgICAgYmtVdGlscy5odHRwUG9zdChcbiAgICAgICAgICBia1V0aWxzLnNlcnZlclVybCgnYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvYWRkUGx1Z2luJyksXG4gICAgICAgICAge3BsdWdpbm5hbWU6IHBsdWdpbk5hbWUsIHBsdWdpbnVybDogcGx1Z2luVXJsfSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3JlY29yZExvYWRlZFBsdWdpbicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gYWRkIHBsdWdpbiwgJyArIHBsdWdpbk5hbWUgKyAnLCAnICsgcGx1Z2luVXJsICsgJywgJyArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UGx1Z2lucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9nZXRFeGlzdGluZ1BsdWdpbnMnKSwge30pXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocGx1Z2lucykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwbHVnaW5zKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdGYWlsZWQgdG8gZ2V0IGV4aXN0aW5nIHBsdWdpbnMsICcgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0U2Vzc2lvbnM6IGdldFNlc3Npb25zLFxuICAgICAgbG9hZDogbG9hZFNlc3Npb24sXG4gICAgICBiYWNrdXA6IGJhY2t1cFNlc3Npb24sXG4gICAgICBjbG9zZTogY2xvc2VTZXNzaW9uLFxuICAgICAgcmVjb3JkTG9hZGVkUGx1Z2luOiByZWNvcmRMb2FkZWRQbHVnaW4sXG4gICAgICBnZXRQbHVnaW5zOiBnZXRQbHVnaW5zXG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuc2hhcmVcbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIGJrU2hhcmUgc2VydmljZSB3aGljaCBjb21tdW5pY2F0ZSB3aXRoIHRoZSBiYWNrZW5kIHRvIGNyZWF0ZSBzaGFyYWJsZVxuICogY29udGVudCBhcyB3ZWxsIGFzIHRvIHJldHVybiBVUkwgb2YgdGhlIHNoYXJkIGNvbnRlbnQuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnNoYXJlJywgW10pO1xuXG4gIG1vZHVsZS5wcm92aWRlcihcImJrU2hhcmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zaGFyaW5nU2VydmljZSA9IG51bGw7XG4gICAgdGhpcy5jb25maWcgPSBmdW5jdGlvbihzaGFyaW5nU2VydmljZSkge1xuICAgICAgX3NoYXJpbmdTZXJ2aWNlID0gc2hhcmluZ1NlcnZpY2U7XG4gICAgfTtcbiAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghX3NoYXJpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHZhciBub09wID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gZG8gbm90aGluZyBmb3Igbm93XG4gICAgICAgICAgLy8gd2UgbWlnaHQgY29uc2lkZXIgbG9nZ2luZyBlcnJvciBvciB3YXJuaW5nOlxuICAgICAgICAgIC8vY29uc29sZS5lcnJvcihcIm5vIHNoYXJpbmcgc2VydmljZSBhdmFpbGFibGVcIik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHVibGlzaDogbm9PcCxcbiAgICAgICAgICBnZXRTaGFyYWJsZVVybDogbm9PcFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gdGhlIHJlYXNvbiBvZiB3cmFwcGluZyB0aGUgc3RyYXRlZ3kgaW5zdGVhZCBvZiBqdXN0IHJldHVyblxuICAgICAgLy8gaXQgKF9zaGFyaW5nU2VydmljZSkgaXMgdG8gbWFrZSB0aGUgQVBJIGV4cGxpY2l0LlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHVibGlzaDogZnVuY3Rpb24odXJpLCBjb250ZW50LCBjYikge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UucHVibGlzaCh1cmksIGNvbnRlbnQsIGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2VuZXJhdGVFeGNlbDogZnVuY3Rpb24ocGF0aCwgdGFibGUsIGNiKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZW5lcmF0ZUV4Y2VsKHBhdGgsIHRhYmxlLCBjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX1NlY3Rpb25DZWxsOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX1NlY3Rpb25DZWxsKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX0NvZGVDZWxsOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX0NvZGVDZWxsKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX1RhYmxlOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX1RhYmxlKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX05vdGVib29rOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX05vdGVib29rKHVyaSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsudHJhY2tcbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIHNlcnZpY2UgdGhhdCBjYW4gYmUgY29uZmlndXJlZCB0byAzcmQgcGFydHkgcHJvdmlkZWQgdXNhZ2UgbWV0cmljXG4gKiBsb2dnaW5nIHNlcnZpY2VzLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay50cmFjaycsIFtdKTtcblxuICBtb2R1bGUucHJvdmlkZXIoJ2JrVHJhY2snLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RyYWNraW5nU2VydmljZSA9IG51bGw7XG4gICAgdGhpcy5jb25maWcgPSBmdW5jdGlvbih0cmFja2luZ1NlcnZpY2UpIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24odHJhY2tpbmdTZXJ2aWNlKSkge1xuICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlID0gdHJhY2tpbmdTZXJ2aWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlID0gdHJhY2tpbmdTZXJ2aWNlO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIV90cmFja2luZ1NlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsb2c6IGZ1bmN0aW9uKGV2ZW50LCBvYmopIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzTmVlZFBlcm1pc3Npb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxvZzogZnVuY3Rpb24oZXZlbnQsIG9iamVjdCkge1xuICAgICAgICAgIF90cmFja2luZ1NlcnZpY2UubG9nKGV2ZW50LCBvYmplY3QpO1xuICAgICAgICB9LFxuICAgICAgICBlbmFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHNvbWUgdHJhY2tpbmcgc2VydmljZSB3aWxsIG5lZWQgdG8gYmUgZW5hYmxlZCBiZWZvcmUgYmVpbmcgdXNlZFxuICAgICAgICAgIGlmIChfdHJhY2tpbmdTZXJ2aWNlLmVuYWJsZSAmJiBfLmlzRnVuY3Rpb24oX3RyYWNraW5nU2VydmljZS5lbmFibGUpKSB7XG4gICAgICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlLmVuYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gc29tZSB0cmFja2luZyBzZXJ2aWNlIHdpbGwgbmVlZCB0byBiZSBlbmFibGVkIGJlZm9yZSBiZWluZyB1c2VkXG4gICAgICAgICAgaWYgKF90cmFja2luZ1NlcnZpY2UuZGlzYWJsZSAmJiBfLmlzRnVuY3Rpb24oX3RyYWNraW5nU2VydmljZS5kaXNhYmxlKSkge1xuICAgICAgICAgICAgX3RyYWNraW5nU2VydmljZS5kaXNhYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc05lZWRQZXJtaXNzaW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RyYWNraW5nU2VydmljZS5pc05lZWRQZXJtaXNzaW9uXG4gICAgICAgICAgICAgICYmIF8uaXNGdW5jdGlvbihfdHJhY2tpbmdTZXJ2aWNlLmlzTmVlZFBlcm1pc3Npb24pXG4gICAgICAgICAgICAgICYmIF90cmFja2luZ1NlcnZpY2UuaXNOZWVkUGVybWlzc2lvbigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnV0aWxzXG4gKiBUaGlzIG1vZHVsZSBjb250YWlucyB0aGUgbG93IGxldmVsIHV0aWxpdGllcyB1c2VkIGJ5IEJlYWtlclxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay51dGlscycsIFtcbiAgICAnYmsuY29tbW9uVXRpbHMnLFxuICAgICdiay5hbmd1bGFyVXRpbHMnLFxuICAgICdiay5jb21ldGRVdGlscycsXG4gICAgJ2JrLnRyYWNrJ1xuICBdKTtcbiAgLyoqXG4gICAqIGJrVXRpbHNcbiAgICogLSBob2xkcyBnZW5lcmFsL2xvdzBsZXZlbCB1dGlsaXRpZXMgdGhhdCBhcmUgYmVha2VyIHNwZWNpZmljIHRoYXQgaGFzIG5vIGVmZmVjdCB0byBET00gZGlyZWN0bHlcbiAgICogLSBpdCBhbHNvIHNlcnZlcyB0aGUgcHVycG9zZSBvZiBoaWRpbmcgdW5kZXJuZWF0aCB1dGlsczogY29tbW9uVXRpbHMvYW5ndWxhclV0aWxzLy4uLlxuICAgKiAgICBmcm9tIG90aGVyIHBhcnRzIG9mIGJlYWtlclxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrVXRpbHMnLCBmdW5jdGlvbihjb21tb25VdGlscywgYW5ndWxhclV0aWxzLCBia1RyYWNrLCBjb21ldGRVdGlscykge1xuXG4gICAgZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWZmaXgpIHtcbiAgICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWZmaXgsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTE7XG4gICAgfVxuICAgIFxuICAgIHZhciBzZXJ2ZXJSb290ID0gZW5kc1dpdGgoZG9jdW1lbnQuYmFzZVVSSSwgJ2JlYWtlci8nKSA/IGRvY3VtZW50LmJhc2VVUkkuc3Vic3RyaW5nKDAsZG9jdW1lbnQuYmFzZVVSSS5sZW5ndGgtNyk6IGRvY3VtZW50LmJhc2VVUkk7XG4gICAgXG4gICAgZnVuY3Rpb24gc2VydmVyVXJsKHBhdGgpIHtcbiAgICAgIHJldHVybiBzZXJ2ZXJSb290ICsgcGF0aDtcbiAgICB9XG5cbiAgICB2YXIgZmlsZVJvb3QgPSBkb2N1bWVudC5iYXNlVVJJO1xuICAgIFxuICAgIGZ1bmN0aW9uIGZpbGVVcmwocGF0aCkge1xuICAgICAgcmV0dXJuIGZpbGVSb290ICsgcGF0aDtcbiAgICB9XG5cbiAgICAvLyBhamF4IG5vdGVib29rIGxvY2F0aW9uIHR5cGVzIHNob3VsZCBiZSBvZiB0aGUgZm9ybVxuICAgIC8vIGFqYXg6L2xvYWRpbmcvcGF0aDovc2F2aW5nL3BhdGhcbiAgICBmdW5jdGlvbiBwYXJzZUFqYXhMb2NhdG9yKGxvY2F0b3IpIHtcbiAgICAgIHZhciBwaWVjZXMgPSBsb2NhdG9yLnNwbGl0KFwiOlwiKTtcbiAgICAgIHJldHVybiB7IHNvdXJjZTogcGllY2VzWzFdLCBkZXN0aW5hdGlvbjogcGllY2VzWzJdIH1cbiAgICB9XG5cbiAgICB2YXIgYmtVdGlscyA9IHtcbiAgICAgICAgc2VydmVyVXJsOiBzZXJ2ZXJVcmwsXG4gICAgICAgIGZpbGVVcmw6IGZpbGVVcmwsXG5cbiAgICAgIC8vIHdyYXAgdHJhY2tpbmdTZXJ2aWNlXG4gICAgICBsb2c6IGZ1bmN0aW9uKGV2ZW50LCBvYmopIHtcbiAgICAgICAgYmtUcmFjay5sb2coZXZlbnQsIG9iaik7XG4gICAgICB9LFxuXG4gICAgICAvLyB3cmFwIGNvbW1vblV0aWxzXG4gICAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmdlbmVyYXRlSWQobGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICBsb2FkSlM6IGZ1bmN0aW9uKHVybCwgc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMubG9hZEpTKHVybCwgc3VjY2Vzcyk7XG4gICAgICB9LFxuICAgICAgbG9hZENTUzogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5sb2FkQ1NTKHVybCk7XG4gICAgICB9LFxuICAgICAgbG9hZExpc3Q6IGZ1bmN0aW9uKHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmxvYWRMaXN0KHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpO1xuICAgICAgfSxcbiAgICAgIGZvcm1hdFRpbWVTdHJpbmc6IGZ1bmN0aW9uKG1pbGxpcykge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuZm9ybWF0VGltZVN0cmluZyhtaWxsaXMpO1xuICAgICAgfSxcbiAgICAgIGlzTWlkZGxlQ2xpY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5pc01pZGRsZUNsaWNrKGV2ZW50KTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmVudE9mZnNldFg6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5nZXRFdmVudE9mZnNldFgoZWxlbSwgZXZlbnQpO1xuICAgICAgfSxcbiAgICAgIGZpbmRUYWJsZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuZmluZFRhYmxlKGVsZW0pO1xuICAgICAgfSxcbiAgICAgIHNhdmVBc0NsaWVudEZpbGU6IGZ1bmN0aW9uKGRhdGEsIGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5zYXZlQXNDbGllbnRGaWxlKGRhdGEsIGZpbGVuYW1lKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIHdyYXAgYW5ndWxhclV0aWxzXG4gICAgICByZWZyZXNoUm9vdFNjb3BlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYW5ndWxhclV0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH0sXG4gICAgICB0b1ByZXR0eUpzb246IGZ1bmN0aW9uKGpzT2JqKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMudG9QcmV0dHlKc29uKGpzT2JqKTtcbiAgICAgIH0sXG4gICAgICBmcm9tUHJldHR5SnNvbjogZnVuY3Rpb24oalN0cmluZykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmZyb21QcmV0dHlKc29uKGpTdHJpbmcpO1xuICAgICAgfSxcbiAgICAgIGh0dHBHZXQ6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmh0dHBHZXQodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBodHRwUG9zdDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuaHR0cFBvc3QodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBuZXdEZWZlcnJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIH0sXG4gICAgICBuZXdQcm9taXNlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLm5ld1Byb21pc2UodmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuYWxsLmFwcGx5KGFuZ3VsYXJVdGlscywgYXJndW1lbnRzKTtcbiAgICAgIH0sXG4gICAgICBmY2FsbDogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmZjYWxsKGZ1bmMpO1xuICAgICAgfSxcbiAgICAgIGRlbGF5OiBmdW5jdGlvbihtcykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmRlbGF5KG1zKTtcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBmdW5jdGlvbihmdW5jLG1zKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMudGltZW91dChmdW5jLG1zKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxUaW1lb3V0OiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuY2FuY2VsVGltZW91dChwcm9taXNlKTsgIFxuICAgICAgfSxcbiAgICAgIHNldFNlcnZlclJvb3Q6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICBzZXJ2ZXJSb290ID0gdXJsO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVSb290OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgZmlsZVJvb3QgPSB1cmw7XG4gICAgICB9LFxuXG4gICAgICAvLyBiZWFrZXIgc2VydmVyIGludm9sdmVkIHV0aWxzXG4gICAgICBnZXRIb21lRGlyZWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIHRoaXMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL2dldEhvbWVEaXJlY3RvcnlcIikpXG4gICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdldFZlcnNpb25JbmZvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIHRoaXMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC91dGlsL2dldFZlcnNpb25JbmZvXCIpKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZXRTdGFydFVwRGlyZWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIHRoaXMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL2dldFN0YXJ0VXBEaXJlY3RvcnlcIikpXG4gICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdldERlZmF1bHROb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC91dGlsL2dldERlZmF1bHROb3RlYm9va1wiKSkuXG4gICAgICAgICAgICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShhbmd1bGFyLmZyb21Kc29uKGRhdGEpKTtcbiAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZykge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2VuZXJhdGVOb3RlYm9vazogZnVuY3Rpb24oZXZhbHVhdG9ycywgY2VsbHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBiZWFrZXI6IFwiMlwiLFxuICAgICAgICAgIGV2YWx1YXRvcnM6IGV2YWx1YXRvcnMsXG4gICAgICAgICAgY2VsbHM6IGNlbGxzXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgbG9hZEZpbGU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2ZpbGUtaW8vbG9hZFwiKSwge3BhdGg6IHBhdGh9KVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICBpZiAoIV8uaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmd1bGFyICRodHRwIGF1dG8tZGV0ZWN0cyBKU09OIHJlc3BvbnNlIGFuZCBkZXNlcmlhbGl6ZSBpdCB1c2luZyBhIEpTT04gcGFyc2VyXG4gICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGlzIGJlaGF2aW9yLCB0aGlzIGlzIGEgaGFjayB0byByZXZlcnNlIGl0XG4gICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29udGVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcblxuICAgICAgbG9hZEh0dHA6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvaHR0cC1wcm94eS9sb2FkXCIpLCB7dXJsOiB1cmx9KVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICBpZiAoIV8uaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmd1bGFyICRodHRwIGF1dG8tZGV0ZWN0cyBKU09OIHJlc3BvbnNlIGFuZCBkZXNlcmlhbGl6ZSBpdCB1c2luZyBhIEpTT04gcGFyc2VyXG4gICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGlzIGJlaGF2aW9yLCB0aGlzIGlzIGEgaGFjayB0byByZXZlcnNlIGl0XG4gICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29udGVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGxvYWRBamF4OiBmdW5jdGlvbihhamF4TG9jYXRvcikge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBHZXQocGFyc2VBamF4TG9jYXRvcihhamF4TG9jYXRvcikuc291cmNlKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICBpZiAoIV8uaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmd1bGFyICRodHRwIGF1dG8tZGV0ZWN0cyBKU09OIHJlc3BvbnNlIGFuZCBkZXNlcmlhbGl6ZSBpdCB1c2luZyBhIEpTT04gcGFyc2VyXG4gICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGlzIGJlaGF2aW9yLCB0aGlzIGlzIGEgaGFjayB0byByZXZlcnNlIGl0XG4gICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29udGVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHNhdmVGaWxlOiBmdW5jdGlvbihwYXRoLCBjb250ZW50QXNKc29uLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cFBvc3Qoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9zYXZlXCIpLCB7cGF0aDogcGF0aCwgY29udGVudDogY29udGVudEFzSnNvbn0pXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuZ3VsYXJVdGlscy5odHRwUG9zdChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL3NhdmVJZk5vdEV4aXN0c1wiKSwge3BhdGg6IHBhdGgsIGNvbnRlbnQ6IGNvbnRlbnRBc0pzb259KVxuICAgICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDQwOSkge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZXhpc3RzXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gXCJpc0RpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChkYXRhLCBzdGF0dXMsIGhlYWRlciwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgc2F2ZUFqYXg6IGZ1bmN0aW9uKGFqYXhMb2NhdG9yLCBjb250ZW50QXNKc29uKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBwYXJzZUFqYXhMb2NhdG9yKGFqYXhMb2NhdG9yKS5kZXN0aW5hdGlvbjtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBQdXRKc29uKGRlc3RpbmF0aW9uLCB7ZGF0YTogY29udGVudEFzSnNvbn0pXG4gICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgaW5pdGlhbGl6ZUNvbWV0ZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5pbml0aWFsaXplQ29tZXRkKHVyaSk7XG4gICAgICB9LFxuICAgICAgYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5hZGRDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcihjYik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgIH0sXG4gICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0sXG5cbiAgICAgIGJlZ2luc1dpdGg6IGZ1bmN0aW9uKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgICAgICAgcmV0dXJuIChoYXlzdGFjay5zdWJzdHIoMCwgbmVlZGxlLmxlbmd0aCkgPT09IG5lZWRsZSk7XG4gICAgICB9LFxuXG4gICAgICAvLyB3cmFwcGVyIGFyb3VuZCByZXF1aXJlSlNcbiAgICAgIG1vZHVsZU1hcDoge30sXG4gICAgICBsb2FkTW9kdWxlOiBmdW5jdGlvbih1cmwsIG5hbWUpIHtcbiAgICAgICAgLy8gbmFtZSBpcyBvcHRpb25hbCwgaWYgcHJvdmlkZWQsIGl0IGNhbiBiZSB1c2VkIHRvIHJldHJpZXZlIHRoZSBsb2FkZWQgbW9kdWxlIGxhdGVyLlxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmIChfLmlzU3RyaW5nKHVybCkpIHtcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgd2luZG93LnJlcXVpcmUoW3VybF0sIGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgIHRoYXQubW9kdWxlTWFwW25hbWVdID0gdXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXQpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJtb2R1bGUgZmFpbGVkIHRvIGxvYWRcIixcbiAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBcImlsbGVnYWwgYXJnXCIgKyB1cmw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlOiBmdW5jdGlvbihuYW1lT3JVcmwpIHtcbiAgICAgICAgdmFyIHVybCA9IHRoaXMubW9kdWxlTWFwLmhhc093blByb3BlcnR5KG5hbWVPclVybCkgPyB0aGlzLm1vZHVsZU1hcFtuYW1lT3JVcmxdIDogbmFtZU9yVXJsO1xuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVpcmUodXJsKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBia1V0aWxzO1xuICB9KTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=