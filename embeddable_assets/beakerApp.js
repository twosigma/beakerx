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
__p += '<bk-main-app class="bkr"></bk-main-app>';

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
                                             'bk.notebook'
                                             ]);

    module.directive('bkMainApp', function(
      $route,
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
        notebookUri: '@',
        sessionId: '@',
        notebookRequestType: '@',
        notebookFormat: '@',
        readOnly: '@'
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

        (function() {
         
         
         
          if ($scope.notebookUri) {
            return loadNotebook.openUri({
              uri: $scope.notebookUri,
              type: $scope.notebookRequestType,
              format: $scope.notebookFormat,
              readOnly: $scope.readOnly
            }, $scope.sessionId, true);
          } else if ($scope.sessionId) {
            return loadNotebook.fromSession($scope.sessionId);
          }

          var sessionId = $routeParams.sessionId;
          var sessionRouteResolve = $route.current.$$route.resolve;
          var newSession = $route.current.locals.isNewSession;

          if (newSession) {
            delete sessionRouteResolve.isNewSession;
            if (newSession === "new") {
              loadNotebook.defaultNotebook(sessionId);
            } else {
              loadNotebook.emptyNotebook(sessionId);
            }
          } else if ($route.current.locals.isImport) {
            delete sessionRouteResolve.isImport;
            loadNotebook.fromImport(sessionId);
          } else if ($route.current.locals.isOpen) {
            delete sessionRouteResolve.isOpen;
            delete sessionRouteResolve.target;
            var target = $route.current.locals.target;
            var retry = true;
            loadNotebook.openUri(target, sessionId, retry);
          } else {
            loadNotebook.fromSession(sessionId);
          }
        })();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImNvbnRyb2xwYW5lbC5qcyIsImNvbnRyb2xwYW5lbC1kaXJlY3RpdmUuanMiLCJjb250cm9scGFuZWxzZXNzaW9uaXRlbS1kaXJlY3RpdmUuanMiLCJjZWxsbWVudXBsdWdpbm1hbmFnZXIuanMiLCJjb3JlLmpzIiwiZGVidWcuanMiLCJldmFsdWF0ZXBsdWdpbm1hbmFnZXIuanMiLCJoZWxwZXIuanMiLCJtZW51cGx1Z2lubWFuYWdlci5qcyIsIm1haW5hcHAuanMiLCJldmFsdWF0ZWpvYm1hbmFnZXIuanMiLCJldmFsdWF0b3JtYW5hZ2VyLmpzIiwibm90ZWJvb2tjZWxsbW9kZWxtYW5hZ2VyLmpzIiwibm90ZWJvb2tuYW1lc3BhY2Vtb2RlbG1hbmFnZXIuanMiLCJzZXNzaW9ubWFuYWdlci5qcyIsIm5vdGVib29rLmpzIiwiY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbGlucHV0bWVudS1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dG1lbnUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd24tZWRpdGFibGUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd25jZWxsLWRpcmVjdGl2ZS5qcyIsIm5ld2NlbGxtZW51LWRpcmVjdGl2ZS5qcyIsIm5vdGVib29rLWRpcmVjdGl2ZS5qcyIsInNlY3Rpb25jZWxsLWRpcmVjdGl2ZS5qcyIsInRleHRjZWxsLWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXkuanMiLCJvdXRwdXRkaXNwbGF5LWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXlmYWN0b3J5LXNlcnZpY2UuanMiLCJvdXRwdXRkaXNwbGF5c2VydmljZW1hbmFnZXItc2VydmljZS5qcyIsInBsdWdpbm1hbmFnZXItZGlyZWN0aXZlLmpzIiwicGx1Z2lubWFuYWdlcmV2YWx1YXRvcnNldHRpbmdzLWRpcmVjdGl2ZS5qcyIsImNvZGVjZWxsb3B0aW9ucy1kaXJlY3RpdmUuanMiLCJjb21tb251dGlscy5qcyIsImNvbW1vbnVpLmpzIiwiYW5ndWxhcnV0aWxzLmpzIiwidHJlZXZpZXcuanMiLCJjb21ldGR1dGlscy5qcyIsIm5vdGVib29rdmVyc2lvbm1hbmFnZXIuanMiLCJvdXRwdXRsb2cuanMiLCJyZWNlbnRtZW51LmpzIiwic2Vzc2lvbi5qcyIsInNoYXJlLmpzIiwidHJhY2suanMiLCJ1dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMXVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2b0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMXRDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNybUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJlYWtlckFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImNvbnRyb2xwYW5lbC9jb250cm9scGFuZWxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxoZWFkZXIgY2xhc3M9XCJuYXZiYXItZml4ZWQtdG9wIGJrclwiPlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItaW52ZXJzZSBia3JcIj5cXG4gICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmQgYmtyXCIgaHJlZj1cIi9iZWFrZXIvIy9jb250cm9sXCIgbmctY2xpY2s9XCJnb3RvQ29udHJvbFBhbmVsKCRldmVudClcIiBlYXQtY2xpY2s9XCJcIj5cXG4gICAgICA8aW1nIHNyYz1cImFwcC9pbWFnZXMvYmVha2VyX2ljb25AMngucG5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICBCZWFrZXJcXG4gICAgPC9hPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0IGJrclwiPlxcbiAgICA8dWwgY2xhc3M9XCJuYXYgbmF2YmFyLW5hdiBia3JcIj5cXG4gICAgICA8bGkgY2xhc3M9XCJkcm9wZG93biBia3JcIiBuZy1yZXBlYXQ9XCJtIGluIGdldE1lbnVzKClcIj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgcm9sZT1cImJ1dHRvblwiIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIHt7bS5pZH19IGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj57e20ubmFtZX19PC9hPlxcbiAgICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cIm0uaXRlbXNcIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudT5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxwIG5nLWlmPVwiZGlzY29ubmVjdGVkXCIgY2xhc3M9XCJuYXZiYXItdGV4dCB0ZXh0LWRhbmdlciByaWdodCBia3JcIj5cXG4gICAgICAgIG9mZmxpbmVcXG4gICAgICA8L3A+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG48L2hlYWRlcj5cXG5cXG48ZGl2IGNsYXNzPVwiZGFzaGJvYXJkIGNvbnRhaW5lci1mbHVpZCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgYmtyXCI+XFxuXFxuICAgICAgPGgxIGNsYXNzPVwiYmtyXCI+QmVha2VyIDxzbWFsbCBjbGFzcz1cImJrclwiPlRoZSBkYXRhIHNjaWVudGlzdFxcJ3MgbGFib3JhdG9yeTwvc21hbGw+PC9oMT5cXG5cXG4gICAgICA8ZGl2IG5nLWlmPVwiaXNTZXNzaW9uc0xpc3RFbXB0eSgpXCIgY2xhc3M9XCJlbXB0eS1zZXNzaW9uLXByb21wdCBia3JcIj5cXG4gICAgICAgICAgPHAgY2xhc3M9XCJia3JcIj5DbGljayBiZWxvdyB0byBnZXQgc3RhcnRlZCBjb2RpbmcgaW4gUHl0aG9uLCBSLCBKYXZhU2NyaXB0LCBKdWxpYSwgU2NhbGEsIEphdmEsIEdyb292eSwgYW5kIFJ1YnkuIDxiciBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICAgIEJlZ2lubmVycyBzaG91bGQgY2hlY2sgb3V0IHRoZSA8c3Ryb25nIGNsYXNzPVwiYmtyXCI+SGVscCDihpIgVHV0b3JpYWw8L3N0cm9uZz4uPC9wPlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgbmctaGlkZT1cImlzU2Vzc2lvbnNMaXN0RW1wdHkoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8aDQgY2xhc3M9XCJvcGVuLW5vdGVib29rLWhlYWRsaW5lIGJrclwiPk9wZW4gTm90ZWJvb2tzPC9oND5cXG4gICAgICAgIDxiay1jb250cm9sLXBhbmVsLXNlc3Npb24taXRlbSBjbGFzcz1cIm9wZW4tbm90ZWJvb2tzIGJrclwiPjwvYmstY29udHJvbC1wYW5lbC1zZXNzaW9uLWl0ZW0+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBuZXctbm90ZWJvb2sgYmtyXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHRleHQtY2VudGVyIGJ0bi1ibG9jayBia3JcIiBuZy1jbGljaz1cIm5ld05vdGVib29rKClcIj5OZXcgRGVmYXVsdCBOb3RlYm9vazwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB0ZXh0LWNlbnRlciBidG4tYmxvY2sgbmV3LWVtcHR5LW5vdGVib29rIGJrclwiIG5nLWNsaWNrPVwibmV3RW1wdHlOb3RlYm9vaygpXCI+TmV3IEVtcHR5IE5vdGVib29rPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTYgYmtyXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmYXV4LWRyb3Atem9uZSBia3JcIj5cXG4gICAgICAgICAgICBPciBkcmFnIGEgLmJrciBmaWxlIGFueXdoZXJlIG9uIHRoaXMgcGFnZSB0byBpbXBvcnRcXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCIgbmctc2hvdz1cImlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9PSBudWxsXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNiB3ZWxsIGJrclwiPlxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YiBjbGFzcz1cImJrclwiPlRyYWNrIGFub255bW91cyB1c2FnZSBpbmZvPzwvYj5cXG4gICAgICA8L3A+XFxuXFxuICAgICAgPHAgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIFdlIHdvdWxkIGxpa2UgdG8gY29sbGVjdCBhbm9ueW1vdXMgdXNhZ2UgaW5mbyB0byBoZWxwIGltcHJvdmUgb3VyIHByb2R1Y3QuIFdlIG1heSBzaGFyZSB0aGlzIGluZm9ybWF0aW9uXFxuICAgICAgICB3aXRoIG90aGVyIHBhcnRpZXMsIGluY2x1ZGluZywgaW4gdGhlIHNwaXJpdCBvZiBvcGVuIHNvZnR3YXJlLCBieSBtYWtpbmcgaXQgcHVibGljbHkgYWNjZXNzaWJsZS48YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8L3A+XFxuXFxuICAgICAgPHAgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwOi8vYmVha2Vybm90ZWJvb2suY29tL3ByaXZhY3lcIiBjbGFzcz1cImJrclwiPlByaXZhY3kgcG9saWN5PC9hPiAtIDxhIGNsYXNzPVwiY3Vyc29yX2hhbmQgYmtyXCIgbmctY2xpY2s9XCJzaG93V2hhdFdlTG9nKClcIj5XaGF0IHdpbGwgd2UgbG9nPzwvYT5cXG4gICAgICA8L3A+XFxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBia3JcIj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCIgbmctY2xpY2s9XCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBmYWxzZVwiPk5vLCBkb25cXCd0IHRyYWNrPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1hY3RpdmUgYmtyXCIgbmctY2xpY2s9XCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSB0cnVlXCI+WWVzLCB0cmFjayBteSBpbmZvPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgPC9kaXY+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJjb250cm9scGFuZWwvdGFibGVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cIm5vdGVib29rLWRhc2hib2FyZC1saXN0IGJrclwiPlxcbiAgPGxpIGNsYXNzPVwic2Vzc2lvbiBjbGVhcmZpeCBia3JcIiBuZy1yZXBlYXQ9XCJzZXNzaW9uIGluIHNlc3Npb25zIHwgb3JkZXJCeTomcXVvdDtvcGVuZWREYXRlJnF1b3Q7OnRydWVcIj5cXG4gICAgPGRpdiBjbGFzcz1cInB1bGwtbGVmdCBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FwdGlvbiBia3JcIiBuZy1jbGljaz1cIm9wZW4oc2Vzc2lvbilcIj57e2dldENhcHRpb24oc2Vzc2lvbil9fTwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJsaWdodCBwYXRoIGJrclwiIG5nLWlmPVwiZ2V0RGVzY3JpcHRpb24oc2Vzc2lvbilcIj5cXG4gICAgICAgIHt7Z2V0RGVzY3JpcHRpb24oc2Vzc2lvbil9fVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtIHB1bGwtcmlnaHQgY2xvc2Utc2Vzc2lvbiBia3JcIiBuZy1jbGljaz1cImNsb3NlKHNlc3Npb24pXCI+Q2xvc2U8L2E+XFxuICAgIDxkaXYgY2xhc3M9XCJvcGVuLWRhdGUgbGlnaHQgcHVsbC1yaWdodCBia3JcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImJrclwiPk9wZW5lZCBvbjwvc3Bhbj5cXG4gICAgICB7e3Nlc3Npb24ub3BlbmVkRGF0ZSB8IGRhdGU6XFwnbWVkaXVtXFwnfX1cXG4gICAgPC9kaXY+XFxuICA8L2xpPlxcbjwvdWw+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJjb250cm9scGFuZWwvd2hhdF93ZV9sb2dcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDMgY2xhc3M9XCJia3JcIj5XaGF0IHdpbGwgd2UgbG9nPC9oMz5cXG48L2Rpdj5cXG5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBia3JcIj5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxiIGNsYXNzPVwiYmtyXCI+V2hhdCB3ZSBsb2c6PC9iPlxcbiAgPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5XZSB1c2UgR29vZ2xlIEFuYWx5dGljcyB0byBjb2xsZWN0IHVzYWdlIGluZm8uIEdvb2dsZSBBbmFseXRpY3MgY29sbGVjdHMgZGF0YSBzdWNoIGFzIGhvdyBsb25nIHlvdSBzcGVuZCBpbiBCZWFrZXIsIHdoYXQgYnJvd3NlciB5b3VcXCdyZSB1c2luZywgYW5kIHlvdXIgZ2VvZ3JhcGhpYyByZWdpb24uPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5JbiBhZGRpdGlvbiB0byB0aGUgc3RhbmRhcmQgR29vZ2xlIEFuYWx5dGljcyBjb2xsZWN0aW9uLCB3ZVxcJ3JlIGxvZ2dpbmcgaG93IG1hbnkgdGltZXMgeW91IHJ1biBjZWxscyBpbiBlYWNoIGxhbmd1YWdlIGFuZCB3aGF0IHR5cGVzIG9mIG5vdGVib29rcyB5b3Ugb3BlbiAobG9jYWwgLmJrciBmaWxlLCByZW1vdGUgLmlweW5iLCBldCBjZXRlcmEpLjwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxiIGNsYXNzPVwiYmtyXCI+V2hhdCB3ZSA8aSBjbGFzcz1cImJrclwiPmRvblxcJ3Q8L2k+IGxvZzo8L2I+XFxuICA8L3A+XFxuICA8cCBjbGFzcz1cImJrclwiPldlIHdpbGwgbmV2ZXIgbG9nIGFueSBvZiB0aGUgY29kZSB5b3UgcnVuIG9yIHRoZSBuYW1lcyBvZiB5b3VyIG5vdGVib29rcy48L3A+XFxuICA8cCBjbGFzcz1cImJrclwiPlBsZWFzZSBzZWUgb3VyIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwOi8vYmVha2Vybm90ZWJvb2suY29tL3ByaXZhY3lcIiBjbGFzcz1cImJrclwiPnByaXZhY3kgcG9saWN5PC9hPiBmb3IgbW9yZSBpbmZvcm1hdGlvbi48L3A+XFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBia3JcIj5cXG4gICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiIG5nLWNsaWNrPVwiY2xvc2UoKVwiPkdvdCBpdDwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiaGVscGVycy9wbHVnaW4tbG9hZC1lcnJvclwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBia3JcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPkxhbmd1YWdlIEVycm9yPC9oMT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBia3JcIj5cXG5cXG48cCBjbGFzcz1cImJrclwiPkZhaWxlZCB0byBzdGFydCAnICtcbigoX190ID0gKHBsdWdpbklkKSkgPT0gbnVsbCA/ICcnIDogX190KSArXG4nLjwvcD5cXG5cXG48cCBjbGFzcz1cImJrclwiPkRpZCB5b3UgaW5zdGFsbCBpdCBhY2NvcmRpbmcgdG8gdGhlIGluc3RydWN0aW9uc1xcbm9uIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwOi8vYmVha2Vybm90ZWJvb2suY29tL2dldHRpbmctc3RhcnRlZCMnICtcbigoX190ID0gKHBsdWdpbklkKSkgPT0gbnVsbCA/ICcnIDogX190KSArXG4nXCIgY2xhc3M9XCJia3JcIj5CZWFrZXJOb3RlYm9vay5jb208L2E+P1xcbjwvcD5cXG5cXG48cCBjbGFzcz1cImJrclwiPklmIHlvdSBhbHJlYWR5IGhhdmUgaXQsIHRoZW4gPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS90d29zaWdtYS9iZWFrZXItbm90ZWJvb2svd2lraS9MYW5ndWFnZS1QcmVmZXJlbmNlc1wiIGNsYXNzPVwiYmtyXCI+ZWRpdFxcbnlvdXIgcHJlZmVyZW5jZXMgZmlsZTwvYT4gdG8gaGVscCBCZWFrZXIgZmluZCBpdCBvbiB5b3VyIHN5c3RlbSwgYW5kXFxudGhlbiByZXN0YXJ0IEJlYWtlciBhbmQgdHJ5IGFnYWluLlxcbjwvcD5cXG5cXG48cCBjbGFzcz1cImJrclwiPkFueSBvdGhlciBsYW5ndWFnZXMgaW4geW91ciBub3RlYm9vayBzaG91bGQgc3RpbGwgd29yay48L3A+XFxuXFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBia3IgYmtyXCI+XFxuICA8YnV0dG9uIGNsYXNzPVwiYmVha2VyLWJ0biBhY3RpdmUgYmtyXCIgbmctY2xpY2s9XCIkY2xvc2UoKVwiPk9LPC9idXR0b24+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kcm9wZG93blwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRyb3Bkb3duTWVudVwiPlxcbiAgPGJrLWRyb3Bkb3duLW1lbnUtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIGdldE1lbnVJdGVtcygpIHwgZmlsdGVyOmlzSGlkZGVuIHwgb3JkZXJCeTpcXCdzb3J0b3JkZXJcXCdcIiBpdGVtPVwiaXRlbVwiIGNsYXNzPVwiYmtyXCI+PC9iay1kcm9wZG93bi1tZW51LWl0ZW0+XFxuPC91bD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL2Ryb3Bkb3duX2l0ZW1cIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxsaSBuZy1jbGFzcz1cImdldEl0ZW1DbGFzcyhpdGVtKVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YSBocmVmPVwiI1wiIHRhYmluZGV4PVwiLTFcIiBuZy1jbGljaz1cInJ1bkFjdGlvbihpdGVtKVwiIG5nLWNsYXNzPVwiZ2V0QUNsYXNzKGl0ZW0pXCIgaWQ9XCJ7e2l0ZW0uaWR9fVwiIHRpdGxlPVwie3tpdGVtLnRvb2x0aXB9fVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1vayBia3JcIiBuZy1zaG93PVwiaXNNZW51SXRlbUNoZWNrZWQoaXRlbSlcIj48L2k+XFxuICAgIHt7Z2V0TmFtZShpdGVtKX19XFxuICA8L2E+XFxuPC9saT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL2ZpbGVhY3Rpb25kaWFsb2dcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj57e2FjdGlvbk5hbWV9fTwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8cCBjbGFzcz1cImJrclwiPlBhdGg6IDxpbnB1dCBuYW1lPVwie3tpbnB1dElkfX1cIiBuZy1tb2RlbD1cInJlc3VsdFwiIGNsYXNzPVwiYmtyXCI+PC9wPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyXCI+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKHJlc3VsdClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBia3JcIj57e2FjdGlvbk5hbWV9fTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvb3Blbm5vdGVib29rXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiPlxcbiAgIDxoMSBjbGFzcz1cImJrclwiPnt7IGdldFN0cmF0ZWd5KCkudGl0bGUgfHwgXFwnT3BlblxcJ319PHNwYW4gbmctc2hvdz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5zaG93U3Bpbm5lclwiIGNsYXNzPVwiYmtyXCI+PGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoIGZhLXNwaW4gYmtyXCI+PC9pPjwvc3Bhbj48L2gxPlxcbiAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJzLWFuZC1zb3J0cyBia3JcIj5cXG4gICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia3JcIj5cXG4gICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4teHMgZHJvcGRvd24tdG9nZ2xlIGJrclwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgICAgICAgU29ydCBieToge3tnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuZ2V0UHJldHR5T3JkZXJCeSgpfX1cXG4gICAgICAgPC9idXR0b24+XFxuICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIj5cXG4gICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ3VyaVxcJywgcmV2ZXJzZTogZmFsc2UgfSlcIiBjbGFzcz1cImJrclwiPk5hbWU8L2E+PC9saT5cXG4gICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ21vZGlmaWVkXFwnLCByZXZlcnNlOiB0cnVlIH0pXCIgY2xhc3M9XCJia3JcIj5EYXRlIE1vZGlmaWVkPC9hPjwvbGk+XFxuICAgICAgIDwvdWw+XFxuICAgICA8L2Rpdj5cXG4gICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBia3JcIj5cXG4gICA8dHJlZS12aWV3IHJvb3R1cmk9XCIvXCIgZnM9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnNcIiBjbGFzcz1cImJrclwiPjwvdHJlZS12aWV3PlxcbiAgIDx0cmVlLXZpZXcgcm9vdHVyaT1cIicgK1xuX19lKCBob21lZGlyICkgK1xuJ1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrclwiPlxcbiAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxlZnQgYmtyXCI+RW50ZXIgYSBmaWxlIHBhdGggKGUuZy4gL1VzZXJzLy4uLikgb3IgVVJMIChlLmcuIGh0dHA6Ly8uLi4pOjwvZGl2PlxcbiAgIDxwIGNsYXNzPVwiYmtyXCI+PGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJrclwiIG5nLW1vZGVsPVwiZ2V0U3RyYXRlZ3koKS5pbnB1dFwiIG5nLWtleXByZXNzPVwiZ2V0U3RyYXRlZ3koKS5jbG9zZSgkZXZlbnQsIGNsb3NlKVwiIGZvY3VzLXN0YXJ0PVwiXCI+PC9wPlxcbiAgIDxzcGFuIHN0eWxlPVwiZmxvYXQ6bGVmdFwiIG5nLWlmPVwiZ2V0U3RyYXRlZ3koKS5leHQgPT09IHVuZGVmaW5lZFwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjp0b3BcIiBuZy1tb2RlbD1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5hcHBseUV4dEZpbHRlclwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICA8c3BhbiBuZy1jbGljaz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5hcHBseUV4dEZpbHRlciA9ICFnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXJcIiBjbGFzcz1cImJrclwiPnNob3cgJyArXG4oKF9fdCA9ICggZXh0ZW5zaW9uICkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJyBmaWxlcyBvbmx5PC9zcGFuPlxcbiAgIDwvc3Bhbj5cXG4gICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShnZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IG1vZGFsLXN1Ym1pdCBia3JcIj57eyBnZXRTdHJhdGVneSgpLmNsb3NlYnRuIHx8IFxcJ09wZW5cXCd9fTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvc2F2ZW5vdGVib29rXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiPlxcbiAgPGgxIGNsYXNzPVwiYmtyXCI+U2F2ZSA8c3BhbiBuZy1zaG93PVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNob3dTcGlubmVyXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGJrclwiPjwvaT48L3NwYW4+PC9oMT5cXG4gIDxkaXYgY2xhc3M9XCJmaWx0ZXJzLWFuZC1zb3J0cyBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGJrclwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxcbiAgICAgICAgU29ydCBieToge3tnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuZ2V0T3JkZXJCeSgpfX1cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCI+XFxuICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ3VyaVxcJywgcmV2ZXJzZTogZmFsc2UgfSlcIiBjbGFzcz1cImJrclwiPk5hbWU8L2E+PC9saT5cXG4gICAgICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBuZy1jbGljaz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5zZXRPcmRlckJ5KHsgb3JkZXJCeTogXFwnbW9kaWZpZWRcXCcsIHJldmVyc2U6IHRydWUgfSlcIiBjbGFzcz1cImJrclwiPkRhdGUgTW9kaWZpZWQ8L2E+PC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGZpeGVkIGJrclwiIHN0eWxlPVwicGFkZGluZy1ib3R0b206IDEwNnB4XCI+IFxcbiAgPHRyZWUtdmlldyByb290dXJpPVwiL1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG4gIDx0cmVlLXZpZXcgcm9vdHVyaT1cIicgK1xuX19lKCBob21lZGlyICkgK1xuJ1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG4gIDx0cmVlLXZpZXcgbmctaWY9XCJcXCcnICtcbl9fZSggaG9tZWRpciApICtcbidcXCcgIT0gXFwnJyArXG5fX2UoIHB3ZCApICtcbidcXCdcIiByb290dXJpPVwiJyArXG5fX2UoIHB3ZCApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICBcXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiAxMDZweFwiPiBcXG4gIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxpbnB1dCBpZD1cInNhdmVBc0ZpbGVJbnB1dFwiIGNsYXNzPVwibGVmdCBia3JcIiBuZy1tb2RlbD1cImdldFN0cmF0ZWd5KCkuaW5wdXRcIiBuZy1rZXlwcmVzcz1cImdldFN0cmF0ZWd5KCkuY2xvc2UoJGV2ZW50LCBjbG9zZSlcIiBmb2N1cy1zdGFydD1cIlwiPlxcbiAgICA8aSBjbGFzcz1cIm5ldy1mb2xkZXIgYmstaWNvbiBia3JcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIk1ha2UgbmV3IGRpcmVjdG9yeSAoe3tnZXRTdHJhdGVneSgpLmlucHV0fX0pXCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLm5ld0ZvbGRlcihnZXRTdHJhdGVneSgpLmlucHV0KVwiPjwvaT5cXG4gIDwvcD5cXG4gIDxzcGFuIHN0eWxlPVwiZmxvYXQ6bGVmdFwiIGNsYXNzPVwiYmtyXCI+e3tnZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpfX08L3NwYW4+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKGdldFN0cmF0ZWd5KCkuZ2V0UmVzdWx0KCkpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYmtyXCIgbmctZGlzYWJsZWQ9XCJnZXRTdHJhdGVneSgpLmdldFNhdmVCdG5EaXNhYmxlZCgpXCI+U2F2ZTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9kaWFsb2dzL2NvZGVjZWxsb3B0aW9uc1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBia3JcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPkNvZGUgQ2VsbCBPcHRpb25zPC9oMT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJmb3JtLWhvcml6b250YWwgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJrclwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XCJjZWxsLWlkXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsIGNvbC1zbS0yIGJrclwiPklkPC9sYWJlbD5cXG4gICAgICA8ZGl2IG5nLWNsYXNzPVwiaXNFcnJvcigpID8gXFwnY29sLXNtLTdcXCcgOiBcXCdjb2wtc20tMTBcXCdcIiBjbGFzcz1cImJrclwiPjxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImNlbGxOYW1lXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGJrclwiIG5nLWlmPVwiaXNFcnJvcigpXCI+PHNwYW4gY2xhc3M9XCJoZWxwLWlubGluZSBia3JcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnt7Z2V0TmFtZUVycm9yKCl9fTwvc3Bhbj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJrclwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XCJjZWxsLXRhZ3NcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWwgY29sLXNtLTIgYmtyXCI+VGFnczwvbGFiZWw+XFxuICAgICAgPGRpdiBuZy1jbGFzcz1cImlzRXJyb3IoKSA/IFxcJ2NvbC1zbS03XFwnIDogXFwnY29sLXNtLTEwXFwnXCIgY2xhc3M9XCJia3JcIj48aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJjZWxsVGFnc1wiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBia3JcIiBuZy1pZj1cImlzRXJyb3IoKVwiPjxzcGFuIGNsYXNzPVwiaGVscC1pbmxpbmUgYmtyXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj57e2dldFRhZ0Vycm9yKCl9fTwvc3Bhbj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJrclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwIGJrclwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94IGJrclwiPlxcbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmctbW9kZWw9XCJpbml0aWFsaXphdGlvbkNlbGxcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICAgIEluaXRpYWxpemF0aW9uIENlbGxcXG4gICAgICAgICAgPC9sYWJlbD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyXCI+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cInNhdmUoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJrclwiIG5nLWNsYXNzPVwic2F2ZURpc2FibGVkKCkgJmFtcDsmYW1wOyBcXCdkaXNhYmxlZFxcJ1wiPlNhdmU8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL2Rhc2hib2FyZC9hcHBcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxiay1jb250cm9sLXBhbmVsIGNsYXNzPVwiYmtyXCI+PC9iay1jb250cm9sLXBhbmVsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvbWFpbmFwcC9hcHBcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxiay1tYWluLWFwcCBjbGFzcz1cImJrclwiPjwvYmstbWFpbi1hcHA+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9tYWluYXBwL21haW5hcHBcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxoZWFkZXIgY2xhc3M9XCJuYXZiYXItZml4ZWQtdG9wIGJrclwiPlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItaW52ZXJzZSBia3JcIj5cXG4gICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmQgYmtyXCIgaHJlZj1cIi9iZWFrZXIvIy9jb250cm9sXCIgbmctY2xpY2s9XCJnb3RvQ29udHJvbFBhbmVsKCRldmVudClcIiBlYXQtY2xpY2s9XCJcIj5cXG4gICAgICA8aW1nIHNyYz1cImFwcC9pbWFnZXMvYmVha2VyX2ljb25AMngucG5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICBCZWFrZXJcXG4gICAgPC9hPlxcbiAgICA8cCBjbGFzcz1cIm5hdmJhci10ZXh0IGJrclwiPnt7ZmlsZW5hbWUoKX19PC9wPlxcbiAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10ZXh0IGJrclwiIG5nLWlmPVwibG9hZGluZyB8fCAhIWxvYWRpbmdtc2dcIj5cXG4gICAgICA8aSBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiB0ZXh0LXdoaXRlIGJrclwiPjwvaT5cXG4gICAgPC9zcGFuPlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLXRleHQgdGV4dC13aGl0ZSBsb2FkaW5nbXNnIGJrclwiIG5nLWlmPVwibG9hZGluZyB8fCAhIWxvYWRpbmdtc2dcIj5cXG4gICAgICB7e2xvYWRpbmdtc2d9fVxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBia3JcIj5cXG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgYmtyXCI+XFxuICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24gYmtyXCIgbmctcmVwZWF0PVwibSBpbiBnZXRNZW51cygpXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBia3JcIiBuZy1jbGFzcz1cIm0uY2xhc3NOYW1lc1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj57e20ubmFtZX19PC9hPlxcbiAgICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cIm0uaXRlbXNcIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgICA8cCBuZy1pZj1cImlzRWRpdGVkKClcIiBjbGFzcz1cIm5hdmJhci10ZXh0IHRleHQtc3VjY2VzcyBwdWxsLXJpZ2h0IGJrclwiPmVkaXRlZDwvcD5cXG4gICAgPHAgbmctaWY9XCJpc0Rpc2Nvbm5lY3RlZCgpXCIgY2xhc3M9XCJuYXZiYXItdGV4dCBwdWxsLXJpZ2h0IGJrclwiPlxcbiAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBjbGFzcz1cIm5hdmJhci1saW5rIHRleHQtZGFuZ2VyIGJrclwiIG5nLWNsaWNrPVwicHJvbXB0VG9TYXZlKClcIiBlYXQtY2xpY2s9XCJcIj57e2dldE9mZmluZU1lc3NhZ2UoKX19PC9hPlxcbiAgICA8L3A+XFxuICA8L2Rpdj5cXG48L2hlYWRlcj5cXG5cXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkIG5vdGVib29rLWNvbnRhaW5lciBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgYmtyXCI+XFxuICAgICAgPGJrLW5vdGVib29rIHNldC1iay1ub3RlYm9vaz1cInNldEJrTm90ZWJvb2soYmtOb3RlYm9vaylcIiBpcy1sb2FkaW5nPVwibG9hZGluZ1wiIGNsYXNzPVwiYmtyXCI+PC9iay1ub3RlYm9vaz5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIFxcbiAgPGRpdiBzdHlsZT1cImhlaWdodDogMzAwcHhcIiBjbGFzcz1cImJrclwiPjwvZGl2PlxcblxcbjwvZGl2PlxcblxcblxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cInNlY3Rpb24tY2VsbC5odG1sXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxiay1zZWN0aW9uLWNlbGw+PC9iay1zZWN0aW9uLWNlbGw+XFxuPC9zY3JpcHQ+XFxuPHNjcmlwdCB0eXBlPVwidGV4dC9uZy10ZW1wbGF0ZVwiIGlkPVwidGV4dC1jZWxsLmh0bWxcIiBjbGFzcz1cImJrclwiPlxcbiAgPGRpdiBjbGFzcz1cInRleHQtY2VsbFwiPlxcbiAgICA8YmstdGV4dC1jZWxsPjwvYmstdGV4dC1jZWxsPlxcbiAgPC9kaXY+XFxuPC9zY3JpcHQ+XFxuPHNjcmlwdCB0eXBlPVwidGV4dC9uZy10ZW1wbGF0ZVwiIGlkPVwibWFya2Rvd24tY2VsbC5odG1sXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxiay1tYXJrZG93bi1jZWxsPjwvYmstbWFya2Rvd24tY2VsbD5cXG48L3NjcmlwdD5cXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L25nLXRlbXBsYXRlXCIgaWQ9XCJjb2RlLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstY29kZS1jZWxsIGNlbGxtb2RlbD1cImNlbGxtb2RlbFwiIGNlbGxtZW51PVwiY2VsbHZpZXcubWVudVwiIGluZGV4PVwiJGluZGV4XCI+PC9iay1jb2RlLWNlbGw+XFxuPC9zY3JpcHQ+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvcGx1Z2lubWFuYWdlci9wbHVnaW5tYW5hZ2VyXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiA2OXB4XCI+XFxuICAgIDxoMSBjbGFzcz1cImJrclwiPkxhbmd1YWdlIE1hbmFnZXI8L2gxPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBtb2RhbC1sYXJnZSBwbHVnaW4tbWFuYWdlciBia3JcIiBzdHlsZT1cInBhZGRpbmctdG9wOiA2OXB4OyBwYWRkaW5nLWJvdHRvbTogNjhweFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwibGFuZ3VhZ2VzIGNsZWFyZml4IGJrclwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgbGFuZ3VhZ2UtaWNvbi1idXR0b24gYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKHBsdWdpbk5hbWUpXCIgbmctcmVwZWF0PVwiKHBsdWdpbk5hbWUsIHBsdWdpblN0YXR1cykgaW4gZXZhbFRhYk9wLmdldEV2YWx1YXRvclN0YXR1c2VzKClcIiBuZy1jbGFzcz1cInBsdWdpbk5hbWVcIj5cXG4gICAgICAgIDxzcGFuIG5nLWNsYXNzPVwiXFwncGx1Z2luLVxcJyArIHBsdWdpblN0YXR1c1wiIGNsYXNzPVwicGx1Z2luLXN0YXR1cyBia3JcIj7il488L3NwYW4+XFxuICAgICAgICA8YmstbGFuZ3VhZ2UtbG9nbyBiZy1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5iZ0NvbG9yfX1cIiBuYW1lPVwie3tnZXRFdmFsdWF0b3JEZXRhaWxzKHBsdWdpbk5hbWUpLnNob3J0TmFtZX19XCIgZmctY29sb3I9XCJ7e2dldEV2YWx1YXRvckRldGFpbHMocGx1Z2luTmFtZSkuZmdDb2xvcn19XCIgYm9yZGVyLWNvbG9yPVwie3tnZXRFdmFsdWF0b3JEZXRhaWxzKHBsdWdpbk5hbWUpLmJvcmRlckNvbG9yfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPC9iay1sYW5ndWFnZS1sb2dvPlxcblxcbiAgICAgICAge3twbHVnaW5OYW1lfX1cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiZXZhbFRhYk9wLnNob3dVUkwgPSAhZXZhbFRhYk9wLnNob3dVUkxcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5cXG4gICAgICAgIEZyb20gVVJMLi4uXFxuICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLXNob3c9XCJldmFsVGFiT3Auc2hvd1VSTFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAgYWRkZXZhbCBia3JcIj5cXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBiay1lbnRlcj1cImV2YWxUYWJPcC50b2dnbGVQbHVnaW4oKVwiIG5nLW1vZGVsPVwiZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybFwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC50b2dnbGVQbHVnaW4oKVwiPkFkZCBQbHVnaW4gZnJvbSBVUkw8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctc2hvdz1cImV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBlcnJvci10aXRsZSBib2R5LWJveCBia3JcIj5cXG4gICAgICAgIDxwIGNsYXNzPVwiYmtyXCI+QXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvYWQgdGhpcyBwbHVnaW4gZnJvbSBhbiBleHRlcm5hbCBVUkw/PC9wPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCByaWdodCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gZmFsc2U7IGV2YWxUYWJPcC5zaG93VVJMPWZhbHNlOyBldmFsVGFiT3AubmV3UGx1Z2luTmFtZU9yVXJsPSZxdW90OyZxdW90O1wiPkNhbmNlbDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCByaWdodCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gZmFsc2U7IGV2YWxUYWJPcC5mb3JjZUxvYWQgPSB0cnVlOyBldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIj5PSzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+PGJyIGNsYXNzPVwiYmtyXCI+PC9wPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBuZy1zaG93PVwiZXZhbFRhYk9wLnNob3dXYXJuaW5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBlcnJvci10aXRsZSBib2R5LWJveCBia3JcIj5cXG4gICAgICAgIDxwIGNsYXNzPVwiYmtyXCI+Q2Fubm90IHJlbW92ZSBwbHVnaW4gY3VycmVudGx5IHVzZWQgYnkgYSBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rLjxiciBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgRGVsZXRlIHRob3NlIGNlbGxzIGFuZCB0cnkgYWdhaW4uPC9wPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCByaWdodCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93V2FybmluZyA9IGZhbHNlXCI+T0s8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPjxiciBjbGFzcz1cImJrclwiPjwvcD5cXG4gICAgPC9kaXY+XFxuICAgIDx0YWJzZXQgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8dGFiIG5nLXJlcGVhdD1cIihldmFsdWF0b3JOYW1lLCBldmFsdWF0b3IpIGluIGV2YWxUYWJPcC5nZXRFdmFsdWF0b3JzV2l0aFNwZWMoKVwiIGhlYWRpbmc9XCJ7e2V2YWx1YXRvck5hbWV9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YmstcGx1Z2luLW1hbmFnZXItZXZhbHVhdG9yLXNldHRpbmdzIGNsYXNzPVwiYmtyXCI+PC9iay1wbHVnaW4tbWFuYWdlci1ldmFsdWF0b3Itc2V0dGluZ3M+XFxuICAgICAgPC90YWI+XFxuICAgIDwvdGFic2V0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiA2OHB4XCI+IFxcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGxhbmd1YWdlLW1hbmFnZXItY2xvc2UtYnV0dG9uIGJrclwiIG5nLWNsaWNrPVwiZG9DbG9zZSgpXCI+Q2xvc2U8L2J1dHRvbj5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlcl9ldmFsdWF0b3Jfc2V0dGluZ3NcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxkaXYgbmctcmVwZWF0PVwicHJvcGVydHkgaW4gcHJvcGVydGllc1wiIGNsYXNzPVwiZm9ybS1ncm91cCBsYW5ndWFnZS1vcHRpb24gcHJvcGVydHkgY2xlYXJmaXggYmtyXCI+XFxuICA8bGFiZWwgY2xhc3M9XCJia3JcIj57eyBwcm9wZXJ0eS5uYW1lIH19PC9sYWJlbD5cXG4gIDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImV2YWx1YXRvci5zZXR0aW5nc1twcm9wZXJ0eS5rZXldXCI+PC90ZXh0YXJlYT5cXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBzZXQgYmtyXCIgbmctY2xpY2s9XCJzZXQocHJvcGVydHkua2V5KVwiPlNldDwvYnV0dG9uPlxcbjwvZGl2PlxcbjxkaXYgbmctcmVwZWF0PVwiYWN0aW9uIGluIGFjdGlvbnNcIiBjbGFzcz1cImFjdGlvbiBsYW5ndWFnZS1vcHRpb24gY2xlYXJmaXggYmtyXCI+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiIG5nLWNsaWNrPVwiZXZhbHVhdG9yLnBlcmZvcm0oYWN0aW9uLmtleSlcIj57eyBhY3Rpb24ubmFtZSB9fTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctY2xhc3M9XCJpc0xvY2tlZCgpICZhbXA7JmFtcDsgXFwnbG9ja2VkXFwnXCIgY2xhc3M9XCJia2NlbGwge3tjZWxsbW9kZWwudHlwZX19IGJrclwiPlxcbiAgPGRpdiBuZy1pZj1cImNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gJmFtcDsmYW1wOyBjZWxsbW9kZWwudHlwZT09XFwnY29kZVxcJyAmYW1wOyZhbXA7ICFpc0xvY2tlZCgpXCIgY2xhc3M9XCJtaW5pLWNlbGwtc3RhdHMgYWR2YW5jZWQtaGlkZSBia3JcIj5cXG4gICAge3tjZWxsbW9kZWwuZXZhbHVhdG9yfX0gJm5ic3A7XFxuICAgICh7e2NlbGxtb2RlbC5saW5lQ291bnR9fSBsaW5lcylcXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cInRvZ2dsZS1tZW51IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gZHJvcGRvd24tcHJvbW90ZWQgYmtyXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNlbGwtbWVudS1pdGVtIGNlbGwtZHJvcGRvd24gZHJvcGRvd24tdG9nZ2xlIGJrclwiIHRpdGxlPVwiY2VsbCBtZW51XCI+PC9kaXY+XFxuICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cImNlbGx2aWV3Lm1lbnUuaXRlbXNcIiBzdWJtZW51LWNsYXNzZXM9XCJkcm9wLWxlZnRcIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBtb3ZlLWNlbGwtZG93biBia3JcIiBuZy1jbGljaz1cIm1vdmVDZWxsRG93bigpXCIgbmctY2xhc3M9XCJtb3ZlQ2VsbERvd25EaXNhYmxlZCgpICZhbXA7JmFtcDsgXFwnZGlzYWJsZWRcXCdcIiB0aXRsZT1cIm1vdmUgY2VsbCBkb3duXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBtb3ZlLWNlbGwtdXAgYmtyXCIgbmctY2xpY2s9XCJtb3ZlQ2VsbFVwKClcIiBuZy1jbGFzcz1cIm1vdmVDZWxsVXBEaXNhYmxlZCgpICZhbXA7JmFtcDsgXFwnZGlzYWJsZWRcXCdcIiB0aXRsZT1cIm1vdmUgY2VsbCB1cFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZGVsZXRlLWNlbGwgYmtyXCIgbmctY2xpY2s9XCJkZWxldGVDZWxsKClcIiB0aXRsZT1cImRlbGV0ZSBjZWxsXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBleHBhbmQtY29udHJhY3QgYmtyXCIgbmctaWY9XCJjZWxsbW9kZWwudHlwZT09XFwnY29kZVxcJ1wiIG5nLWNsaWNrPVwidG9nZ2xlQ2VsbElucHV0KClcIiBuZy1jbGFzcz1cImNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gJmFtcDsmYW1wOyBcXCdjb2xsYXBzZWRcXCdcIiB0aXRsZT1cImhpZGUvc2hvdyBjZWxsIGlucHV0XCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi1wcm9tb3RlZCBhZHZhbmNlZC1vbmx5IGJrclwiIG5nLWlmPVwiaXNDb2RlQ2VsbCgpXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cXG4gICAgICA8YmstY29kZS1jZWxsLWlucHV0LW1lbnUgY2xhc3M9XCJia3JcIj48L2JrLWNvZGUtY2VsbC1pbnB1dC1tZW51PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtbWVudS1pdGVtIGV2YWx1YXRlIGJrclwiIG5nLWNsaWNrPVwiZXZhbHVhdGUoJGV2ZW50KVwiIG5nLWlmPVwiaXNDb2RlQ2VsbCgpXCIgdGl0bGU9XCJydW4gY2VsbFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1zdGF0dXMtaXRlbSBsb2FkaW5nLXN0YXRlIGFkdmFuY2VkLWhpZGUgYmtyXCIgbmctaWY9XCJjZWxsbW9kZWwudHlwZT09XFwnY29kZVxcJyAmYW1wOyZhbXA7ICFjZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyXCI+SW5pdGlhbGl6aW5nIHt7Y2VsbG1vZGVsLmV2YWx1YXRvcn19XFxuICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctc3Bpbm5lciByb3RhdGluZyBia3JcIj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJpc0RlYnVnZ2luZygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgW0RlYnVnXTogY2VsbCBJZCA9IHt7Y2VsbG1vZGVsLmlkfX0sIHBhcmVudCA9IHt7Z2V0UGFyZW50SWQoKX19LCBsZXZlbCA9IHt7Y2VsbG1vZGVsLmxldmVsfX1cXG4gICAgPGEgbmctY2xpY2s9XCJ0b2dnbGVTaG93RGVidWdJbmZvKClcIiBuZy1oaWRlPVwiaXNTaG93RGVidWdJbmZvKClcIiBjbGFzcz1cImJrclwiPnNob3cgbW9yZTwvYT5cXG4gICAgPGEgbmctY2xpY2s9XCJ0b2dnbGVTaG93RGVidWdJbmZvKClcIiBuZy1zaG93PVwiaXNTaG93RGVidWdJbmZvKClcIiBjbGFzcz1cImJrclwiPnNob3cgbGVzczwvYT5cXG4gICAgPGRpdiBjb2xsYXBzZT1cIiFpc1Nob3dEZWJ1Z0luZm8oKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPHByZSBjbGFzcz1cImJrclwiPnt7Y2VsbG1vZGVsIHwganNvbn19PC9wcmU+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLWluY2x1ZGU9XCJnZXRUeXBlQ2VsbFVybCgpXCIgY2xhc3M9XCJia3JcIj48L2Rpdj5cXG4gIDxiay1uZXctY2VsbC1tZW51IGNvbmZpZz1cIm5ld0NlbGxNZW51Q29uZmlnXCIgbmctY2xhc3M9XCJpc0xhcmdlICZhbXA7JmFtcDsgXFwnbGFyZ2VcXCdcIiBpcy1sYXJnZT1cImlzTGFyZ2VcIiBuZy1pZj1cIm5ld0NlbGxNZW51Q29uZmlnLmlzU2hvdygpXCIgY2xhc3M9XCJia3JcIj48L2JrLW5ldy1jZWxsLW1lbnU+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxkaXYgY2xhc3M9XCJldmFsdWF0b3IgYmtyXCIgZXZhbHVhdG9yLXR5cGU9XCJ7eyBjZWxsbW9kZWwuZXZhbHVhdG9yIH19XCIgbmctY2xhc3M9XCJ7XFxuICBcXCdldmFsdWF0b3ItcmVhZHlcXCc6IGNlbGxtb2RlbC5ldmFsdWF0b3JSZWFkZXIsXFxuICBcXCdsb2NrZWRcXCc6IGlzTG9ja2VkKCksXFxuICBcXCdlbXB0eVxcJzogaXNFbXB0eSgpXFxuICB9XCI+XFxuICA8ZGl2IGNsYXNzPVwiYmtjZWxsIGNvZGUtY2VsbC1hcmVhIGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29kZS1jZWxsLWlucHV0IGJrclwiIG5nLWNsaWNrPVwiYmFja2dyb3VuZENsaWNrKCRldmVudClcIiBuZy1oaWRlPVwiaXNMb2NrZWQoKVwiIG5nLWNsYXNzPVwie1xcJ2lucHV0LWhpZGRlblxcJzogY2VsbG1vZGVsLmlucHV0LmhpZGRlbn1cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29kZS1jZWxsLWlucHV0LWNvbnRlbnQgYmtyXCI+XFxuICAgICAgICA8YmstY29kZS1jZWxsLWlucHV0LW1lbnUgY2xhc3M9XCJhZHZhbmNlZC1oaWRlIGJrclwiPjwvYmstY29kZS1jZWxsLWlucHV0LW1lbnU+XFxuICAgICAgICA8ZGl2IG5nLWNsaWNrPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiYmtjZWxsdGV4dGFyZWEgYmtyXCIgbmctbW9kZWw9XCJjZWxsbW9kZWwuaW5wdXQuYm9keVwiPjwvdGV4dGFyZWE+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZXZhbHVhdGUtc2NyaXB0IGFkdmFuY2VkLWhpZGUgYmtyXCIgbmctY2xpY2s9XCJldmFsdWF0ZSgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgICAgIHt7IGlzSm9iQ2FuY2VsbGFibGUoKSA/IFxcJ1N0b3BcXCcgOiBcXCdSdW5cXCcgfX1cXG4gICAgICAgIDwvYT5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctaWY9XCJoYXNPdXRwdXQoKVwiIGNsYXNzPVwiY29kZS1jZWxsLW91dHB1dCBia3JcIiBuZy1jbGFzcz1cIntcXG4gICAgICBcXCduby1vdXRwdXRcXCc6IGlzSGlkZGVuT3V0cHV0KCksXFxuICAgICAgXFwnaW5wdXQtaGlkZGVuXFwnOiBjZWxsbW9kZWwuaW5wdXQuaGlkZGVuLFxcbiAgICAgIFxcJ291dHB1dC1oaWRkZW5cXCc6IGNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuLFxcbiAgICAgIFxcJ2Vycm9yXFwnOiBpc0Vycm9yKClcXG4gICAgICB9XCI+XFxuICAgICAgPGg2IG5nLWlmPVwib3V0cHV0VGl0bGUoKVwiIGNsYXNzPVwiYmtyXCI+e3tvdXRwdXRUaXRsZSgpfX08L2g2PlxcbiAgICAgIDxiay1jb2RlLWNlbGwtb3V0cHV0IG1vZGVsPVwiY2VsbG1vZGVsLm91dHB1dFwiIGV2YWx1YXRvci1pZD1cInt7IGNlbGxtb2RlbC5ldmFsdWF0b3IgfX1cIiBjZWxsLWlkPVwie3sgY2VsbG1vZGVsLmlkIH19XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8L2JrLWNvZGUtY2VsbC1vdXRwdXQ+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxpbnB1dG1lbnVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJkcm9wZG93biBiay1jb2RlLWNlbGwtaW5wdXQgYmtyXCI+XFxuICA8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBjZWxsLWV2YWx1YXRvci1tZW51IGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cXG4gICAgPGJrLWxhbmd1YWdlLWxvZ28gbmFtZT1cInt7Z2V0RXZhbHVhdG9yKCkuc2hvcnROYW1lfX1cIiBiZy1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yKCkuYmdDb2xvcn19XCIgZmctY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmZnQ29sb3J9fVwiIGJvcmRlci1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yKCkuYm9yZGVyQ29sb3J9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIDwvYmstbGFuZ3VhZ2UtbG9nbz5cXG4gICAgPGIgY2xhc3M9XCJhZHZhbmNlZC1oaWRlIGJrclwiPnt7Y2VsbG1vZGVsLmV2YWx1YXRvcn19PC9iPlxcbiAgPC9hPlxcbiAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBpbnB1dGNlbGxtZW51IGJrclwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICAgIDxsaSBuZy1yZXBlYXQ9XCIoZXZhbHVhdG9yTmFtZSwgZXZhbHVhdG9yKSBpbiBnZXRFdmFsdWF0b3JzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwic2V0RXZhbHVhdG9yKGV2YWx1YXRvck5hbWUpXCIgY2xhc3M9XCJ7e2V2YWx1YXRvck5hbWV9fS1tZW51aXRlbSBia3JcIiBlYXQtY2xpY2s9XCJcIj5cXG4gICAgICAgIHt7ZXZhbHVhdG9yTmFtZX19XFxuICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrIGJrclwiIG5nLXNob3c9XCJnZXRTaG93RXZhbEljb24oZXZhbHVhdG9yTmFtZSlcIj48L2k+XFxuICAgICAgPC9hPlxcbiAgICA8L2xpPlxcbiAgPC91bD5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbG91dHB1dFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cInRvZ2dsZS1tZW51IGJrclwiPlxcbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXByb21vdGVkIGJrclwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBjZWxsLWRyb3Bkb3duIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgdGl0bGU9XCJjZWxsIG91dHB1dCBtZW51XCIgbmctc2hvdz1cImlzU2hvd01lbnUoKVwiPjwvZGl2PlxcbiAgICA8YmstY29kZS1jZWxsLW91dHB1dC1tZW51IG1vZGVsPVwib3V0cHV0Q2VsbE1lbnVNb2RlbFwiIGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtb3V0cHV0LW1lbnU+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBleHBhbmQtY29udHJhY3QgYmtyXCIgbmctY2xpY2s9XCJ0b2dnbGVFeHBhbnNpb24oKVwiIG5nLWNsYXNzPVwiIWlzRXhwYW5kZWQoKSAmYW1wOyZhbXA7IFxcJ2NvbGxhcHNlZFxcJ1wiIHRpdGxlPVwiaGlkZS9zaG93IGNlbGwgb3V0cHV0XCIgbmctc2hvdz1cImlzU2hvd01lbnUoKVwiPjwvZGl2PlxcbjwvZGl2Plxcbjxiay1vdXRwdXQtZGlzcGxheSBuZy1zaG93PVwiaXNTaG93T3V0cHV0KClcIiBtb2RlbD1cIm91dHB1dERpc3BsYXlNb2RlbFwiIHR5cGU9XCJ7eyBnZXRPdXRwdXREaXNwbGF5VHlwZSgpIH19XCIgY2xhc3M9XCJia3JcIj5cXG48L2JrLW91dHB1dC1kaXNwbGF5Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsb3V0cHV0bWVudVwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LWZvcm0gYmtyXCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj5cXG4gIDxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnUgZHJvcC1sZWZ0IGJrclwiPlxcbiAgICA8YSB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJia3JcIj5EaXNwbGF5cyAoe3ttb2RlbC5nZXRTZWxlY3RlZERpc3BsYXkoKX19KTwvYT5cXG4gICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIj5cXG4gICAgICA8bGkgbmctcmVwZWF0PVwiZCBpbiBtb2RlbC5nZXRBcHBsaWNhYmxlRGlzcGxheXMoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cIm1vZGVsLnNldFNlbGVjdGVkRGlzcGxheShkKVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1vayBia3JcIiBuZy1zaG93PVwiZCA9PT0gbW9kZWwuZ2V0U2VsZWN0ZWREaXNwbGF5KClcIj48L2k+e3sgZCB9fVxcbiAgICAgICAgPC9hPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2xpPlxcbiAgPGxpIG5nLXJlcGVhdD1cIml0ZW0gaW4gbW9kZWwuZ2V0QWRkaXRpb25hbE1lbnVJdGVtcygpXCIgY2xhc3M9XCJ7e2dldEl0ZW1DbGFzcyhpdGVtKX19IGJrclwiPlxcbiAgICA8YSB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJpdGVtLmFjdGlvbigpXCIgY2xhc3M9XCJia3JcIj57e2dldEl0ZW1OYW1lKGl0ZW0pfX08L2E+XFxuICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCI+XFxuICAgICAgPGxpIG5nLXJlcGVhdD1cInN1Yml0ZW0gaW4gZ2V0U3ViSXRlbXMoaXRlbSlcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGEgbmctY2xpY2s9XCJzdWJpdGVtLmFjdGlvbigpXCIgY2xhc3M9XCJ7e2dldFN1Ym1lbnVJdGVtQ2xhc3Moc3ViaXRlbSl9fSBia3JcIiB0aXRsZT1cInt7c3ViaXRlbS50b29sdGlwfX1cIj57e3N1Yml0ZW0ubmFtZX19PC9hPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2xpPlxcbjwvdWw+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbWFya2Rvd24tZWRpdGFibGVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctc2hvdz1cIm1vZGU9PVxcJ2VkaXRcXCdcIiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGNsYXNzPVwiY29kZW1pcnJvci13cmFwcGVyIGJrclwiPlxcbiAgPHRleHRhcmVhIGNsYXNzPVwiYmtyXCI+PC90ZXh0YXJlYT5cXG48L2Rpdj5cXG48ZGl2IG5nLWNsaWNrPVwiZWRpdCgkZXZlbnQpXCIgY2xhc3M9XCJtYXJrdXAgYmtyXCIgbmctc2hvdz1cIm1vZGU9PVxcJ3ByZXZpZXdcXCdcIj48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9tYXJrZG93bmNlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxiay1tYXJrZG93bi1lZGl0YWJsZSBjZWxsbW9kZWw9XCJjZWxsbW9kZWxcIiBjbGFzcz1cImJrclwiPjwvYmstbWFya2Rvd24tZWRpdGFibGU+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbmV3Y2VsbG1lbnVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgbmV3LWNlbGwgYmtyXCI+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwibmV3Q29kZUNlbGwoZGVmYXVsdEV2YWx1YXRvcigpKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGluc2VydC1jZWxsIGJrclwiIG5nLWNsYXNzPVwiIWlzTGFyZ2UgJmFtcDsmYW1wOyBcXCdidG4teHNcXCdcIj5cXG4gICAgPHNwYW4gbmctY2xhc3M9XCIhaXNMYXJnZSAmYW1wOyZhbXA7IFxcJ2FkdmFuY2VkLWhpZGVcXCdcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIEluc2VydCB7e2RlZmF1bHRFdmFsdWF0b3IoKX19IENlbGxcXG4gICAgPC9zcGFuPlxcbiAgICA8c3BhbiBuZy1pZj1cIiFpc0xhcmdlXCIgY2xhc3M9XCJwbHVzIGFkdmFuY2VkLW9ubHkgYmtyXCI+Kzwvc3Bhbj5cXG4gIDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBkcm9wZG93bi10b2dnbGUgYmtyXCIgbmctY2xhc3M9XCIhaXNMYXJnZSAmYW1wOyZhbXA7IFxcJ2J0bi14c1xcJ1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1zb3J0LWRvd24gYmtyXCI+PC9pPlxcbiAgPC9idXR0b24+XFxuICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCI+XFxuICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnUgYmtyXCI+XFxuICAgICAgPGEgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiYmtyXCI+Q29kZSBjZWxsPC9hPlxcbiAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCI+XFxuICAgICAgICA8bGkgbmctcmVwZWF0PVwiKGtleSwgdmFsdWUpIGluIGdldEV2YWx1YXRvcnMoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxhIG5nLWNsaWNrPVwibmV3Q29kZUNlbGwoa2V5KVwiIGNsYXNzPVwiYmtyXCI+e3trZXl9fTwvYT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgIDxhIG5nLWNsaWNrPVwic2hvd1BsdWdpbk1hbmFnZXIoKVwiIGNsYXNzPVwiYmtyXCI+T3RoZXIgbGFuZ3VhZ2VzLi4uPC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2xpPlxcbiAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51IGJrclwiPlxcbiAgICAgIDxhIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImJrclwiPlNlY3Rpb24gY2VsbDwvYT5cXG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiPlxcbiAgICAgICAgPGxpIG5nLXJlcGVhdD1cImxldmVsIGluIGdldExldmVscygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPGEgbmctY2xpY2s9XCJuZXdTZWN0aW9uQ2VsbChsZXZlbClcIiBjbGFzcz1cImJrclwiPkh7e2xldmVsfX08L2E+XFxuICAgICAgICA8L2xpPlxcbiAgICAgIDwvdWw+XFxuICAgIDwvbGk+XFxuICAgIDxsaSBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxhIHRhYmluZGV4PVwiLTFcIiBuZy1jbGljaz1cIm5ld01hcmtkb3duQ2VsbCgpXCIgY2xhc3M9XCJia3JcIj5NYXJrZG93biBjZWxsPC9hPlxcbiAgICA8L2xpPlxcbiAgPC91bD5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9ub3RlYm9va1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBuZy1jbGFzcz1cIntcXCdhZHZhbmNlZC1tb2RlXFwnOiBpc0FkdmFuY2VkTW9kZSgpLCBcXCdoaWVyYXJjaHktbW9kZVxcJzogaXNIaWVyYXJjaHlFbmFibGVkKCl9XCIgY2xhc3M9XCJia3JcIj5cXG4gIDxiay1uZXctY2VsbC1tZW51IG5nLXNob3c9XCIhaXNMb2NrZWQoKSAmYW1wOyZhbXA7ICFpc0xvYWRpbmdcIiBuZy1jbGFzcz1cImlzRW1wdHkoKSAmYW1wOyZhbXA7IFxcJ29ubHktY2hpbGQgbGFyZ2VcXCdcIiBpcy1sYXJnZT1cImlzRW1wdHkoKVwiIGNvbmZpZz1cIm5ld0NlbGxNZW51Q29uZmlnXCIgY2xhc3M9XCJia3JcIj48L2JrLW5ldy1jZWxsLW1lbnU+XFxuICA8ZGl2IGNsYXNzPVwiYmtjZWxsIGJrclwiPlxcbiAgICA8YmstY2VsbCBuZy1yZXBlYXQ9XCJjZWxsIGluIGdldENoaWxkcmVuKClcIiBjZWxsbW9kZWw9XCJjZWxsXCIgaW5kZXg9XCIkaW5kZXhcIiBjZWxsaWQ9XCJ7e2NlbGwuaWR9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIDwvYmstY2VsbD5cXG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGJrY2VsbG1lbnUgYmtyXCIgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5XCI+XFxuICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgYmtyXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPjwvYT5cXG4gICAgICA8YmstZHJvcGRvd24tbWVudSBtZW51LWl0ZW1zPVwibWVudUl0ZW1zXCIgc3VibWVudS1jbGFzc2VzPVwicHVsbC1sZWZ0XCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLXNob3c9XCJpc1Nob3dpbmdPdXRwdXQoKVwiIGNsYXNzPVwib3V0cHV0bG9nYm94IGJrclwiPjwvZGl2PlxcbiAgPGRpdiBuZy1zaG93PVwiaXNTaG93aW5nT3V0cHV0KClcIiBjbGFzcz1cIm91dHB1dGxvZ2NvbnRhaW5lciBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cIm91dHB1dGxvZ2hhbmRsZSBia3JcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyIGJrclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgYWx0LWNvbnRyb2xzIGJrclwiPlxcbiAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtIGJrclwiIG5nLWNsaWNrPVwiY2xlYXJPdXRwdXQoKVwiPkNsZWFyPC9hPlxcbiAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtIGhpZGUtb3V0cHV0IGJrclwiIG5nLWNsaWNrPVwiaGlkZU91dHB1dCgpXCI+SGlkZTwvYT5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIGJrclwiIGRhdGEtdG9nZ2xlPVwiYnV0dG9ucy1jaGVja2JveFwiPlxcbiAgICAgICAgPGEgY2xhc3M9XCJidG4gYmtyXCIgbmctY2xhc3M9XCJzaG93U3RkT3V0ID8gXFwnYnRuLXByaW1hcnlcXCcgOiBcXCdidG4tZGVmYXVsdFxcJ1wiIG5nLWNsaWNrPVwidG9nZ2xlU3RkT3V0KCRldmVudClcIj5zdGRvdXQ8L2E+XFxuICAgICAgICA8YSBjbGFzcz1cImJ0biBia3JcIiBuZy1jbGFzcz1cInNob3dTdGRFcnIgPyBcXCdidG4tcHJpbWFyeVxcJyA6IFxcJ2J0bi1kZWZhdWx0XFwnXCIgbmctY2xpY2s9XCJ0b2dnbGVTdGRFcnIoJGV2ZW50KVwiPnN0ZGVycjwvYT5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJvdXRwdXRsb2dvdXQgYmtyXCIgbmctc2hvdz1cInNob3dTdGRPdXRcIiBuZy1jbGFzcz1cIiFzaG93U3RkRXJyICZhbXA7JmFtcDsgXFwnc2luZ2xlXFwnXCI+XFxuICAgICAgPGxhYmVsIGNsYXNzPVwib3V0cHV0LWxhYmVsIGJrclwiPnN0ZG91dDo8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJvdXRwdXRsb2dib3ggb3V0cHV0bG9nc3Rkb3V0IGJrclwiPlxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XCJsaW5lIGluIG91dHB1dExvZyB0cmFjayBieSAkaW5kZXhcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8ZGl2IG5nLXNob3c9XCJsaW5lLnR5cGUgPT0gXFwndGV4dFxcJyB8fCBsaW5lLnR5cGUgPT0gXFwnc3Rkb3V0XFwnXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICA8cHJlIGNsYXNzPVwicHJlbG9nIGJrclwiPnt7bGluZS5saW5lfX08L3ByZT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJvdXRwdXRsb2dlcnIgYmtyXCIgbmctc2hvdz1cInNob3dTdGRFcnJcIiBuZy1jbGFzcz1cIiFzaG93U3RkT3V0ICZhbXA7JmFtcDsgXFwnc2luZ2xlXFwnXCI+XFxuICAgICAgPGxhYmVsIGNsYXNzPVwib3V0cHV0LWxhYmVsIGJrclwiPnN0ZGVycjo8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJvdXRwdXRsb2dib3ggYmtyXCI+XFxuICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cImxpbmUgaW4gb3V0cHV0TG9nIHRyYWNrIGJ5ICRpbmRleFwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxkaXYgbmctc2hvdz1cImxpbmUudHlwZSA9PSBcXCdzdGRlcnJcXCdcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICAgIDxwcmUgY2xhc3M9XCJwcmVsb2cgYmtyXCI+e3tsaW5lLmxpbmV9fTwvcHJlPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1pZj1cImlzRGVidWdnaW5nKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICA8YnV0dG9uIG5nLWNsaWNrPVwic2hvd0RlYnVnVHJlZSA9ICFzaG93RGVidWdUcmVlXCIgY2xhc3M9XCJia3JcIj5Ub2dnbGUgZGVidWcgVHJlZTwvYnV0dG9uPlxcbiAgICA8ZGl2IGNvbGxhcHNlPVwiIXNob3dEZWJ1Z1RyZWVcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxwcmUgY2xhc3M9XCJia3JcIj57e2dldE5vdGVib29rTW9kZWwoKSB8IGpzb259fTwvcHJlPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL291dHB1dC1wcm9ncmVzc1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBuZy1pZj1cImVsYXBzZWQgPiAyMDBcIiBjbGFzcz1cInJvdyBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tMiBia3JcIj5cXG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWNvZyBmYS1zcGluIGZhLWxnIGJrclwiPjwvaT5cXG4gICAgICA8c3BhbiBjbGFzcz1cImJrclwiPiAmbmJzcDsgRWxhcHNlZDoge3tnZXRFbGFwc2VkVGltZSgpfX0gJm5ic3A7IDwvc3Bhbj5cXG4gICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzLWNpcmNsZSBmYS1sZyB0ZXh0LWRhbmdlciBjdXJzb3JfaGFuZCBia3JcIiBuZy1jbGljaz1cImNhbmNlbCgpXCIgbmctaWY9XCJpc0NhbmNlbGxhYmxlKClcIiB0aXRsZT1cImNhbmNlbFwiPjwvaT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cImNvbC1zbS0yIGJrclwiIG5nLWlmPVwiaGFzUHJvZ3Jlc3NCYXIoKVwiPlxcblxcdCAgPGRpdiBjbGFzcz1cInByb2dyZXNzIGJrclwiPlxcblxcdFxcdCAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciBia3JcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwie3tnZXRQcm9ncmVzc0JhcigpfX1cIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIndpZHRoOiB7e2dldFByb2dyZXNzQmFyKCl9fSVcIj5cXG5cXHRcXHQgICAge3tnZXRQcm9ncmVzc0JhcigpfX0gJVxcblxcdFxcdCAgPC9kaXY+XFxuXFx0ICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1pZj1cImhhc01lc3NhZ2UoKVwiIGNsYXNzPVwiY29sLXNtLTggYmtyXCI+IHt7Z2V0TWVzc2FnZSgpfX08L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IG5nLWlmPVwiaGFzUGF5bG9hZCgpIHx8IGhhc091dHB1dERhdGEoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8aHIgY2xhc3M9XCJia3JcIj5cXG4gIDxiay1jb2RlLWNlbGwtb3V0cHV0IG1vZGVsPVwib3V0cHV0RGlzcGxheU1vZGVsXCIgY2xhc3M9XCJia3JcIj48L2JrLWNvZGUtY2VsbC1vdXRwdXQ+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svb3V0cHV0LXJlc3VsdHNcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBuZy1pZj1cImhhc091dHB1dERhdGEoKVwiIGNsYXNzPVwibGlzdC11bnN0eWxlZCBia3JcIj5cXG4gIDxsaSBuZy1yZXBlYXQ9XCJpIGluIG91dHB1dGRhdGFcIiBjbGFzcz1cImJrclwiPlxcbiAgICA8cHJlIG5nLWNsYXNzPVwiaS50eXBlID09PSAmcXVvdDtvdXQmcXVvdDsgPyAmcXVvdDt0ZXh0LWluZm8mcXVvdDsgOiAmcXVvdDt0ZXh0LXdhcm5pbmcmcXVvdDtcIiBjbGFzcz1cImJrclwiPnt7IGkudmFsdWUgfX08L3ByZT5cXG4gIDwvbGk+XFxuPC91bD5cXG48YmstY29kZS1jZWxsLW91dHB1dCBuZy1pZj1cImhhc1BheWxvYWQoKVwiIG1vZGVsPVwicGF5bG9hZFwiIGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtb3V0cHV0Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL3NlY3Rpb25jZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLWhpZGU9XCJjZWxsbW9kZWwuaGlkZVRpdGxlXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxzcGFuIGNsYXNzPVwiYmtzZWN0aW9udG9nZ2xlcGx1cyBzZWN0aW9uLXRvZ2dsZSBia3JcIiBuZy1jbGljaz1cInRvZ2dsZVNob3dDaGlsZHJlbigpXCIgbmctaGlkZT1cImlzU2hvd0NoaWxkcmVuKClcIj5cXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1wbHVzIGJrclwiPjwvaT5cXG4gIDwvc3Bhbj5cXG4gIDxzcGFuIGNsYXNzPVwiYmtzZWN0aW9udG9nZ2xlbWludXMgc2VjdGlvbi10b2dnbGUgYmtyXCIgbmctY2xpY2s9XCJ0b2dnbGVTaG93Q2hpbGRyZW4oKVwiIG5nLXNob3c9XCJpc1Nob3dDaGlsZHJlbigpXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtbWludXMgYmtyXCI+PC9pPlxcbiAgPC9zcGFuPlxcbiAgPHAgY2xhc3M9XCJkZXB0aC1pbmRpY2F0b3IgYmtyXCI+e3tnZXRGdWxsSW5kZXgoKX19PC9wPlxcbiAgPGJrLW1hcmtkb3duLWVkaXRhYmxlIGNsYXNzPVwic2VjdGlvbnt7Y2VsbG1vZGVsLmxldmVsfX0gYmstc2VjdGlvbi10aXRsZSBia3JcIiBjZWxsbW9kZWw9XCJjZWxsbW9kZWxcIj48L2JrLW1hcmtkb3duLWVkaXRhYmxlPlxcbjwvZGl2Plxcbjxiay1uZXctY2VsbC1tZW51IHNpemU9XCJ4c1wiIGNvbmZpZz1cIm5ld0NlbGxNZW51Q29uZmlnXCIgbmctaWY9XCJuZXdDZWxsTWVudUNvbmZpZy5pc1Nob3coKVwiIGNsYXNzPVwiYmtyXCI+PC9iay1uZXctY2VsbC1tZW51PlxcbjxkaXYgbmctc2hvdz1cImlzU2hvd0NoaWxkcmVuKClcIiBjbGFzcz1cInNlY3Rpb24tY2hpbGRyZW4gYmtyXCI+XFxuICA8YmstY2VsbCBuZy1yZXBlYXQ9XCJjZWxsIGluIGdldENoaWxkcmVuKClcIiBjZWxsbW9kZWw9XCJjZWxsXCIgaW5kZXg9XCIkaW5kZXhcIiBjZWxsaWQ9XCJ7e2NlbGwuaWR9fVwiIGNsYXNzPVwiYmtyXCI+PC9iay1jZWxsPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL3RleHRjZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwidGV4dGNlbGwtd3JhcHBlciBia3JcIiBuZy1jbGljaz1cImVkaXQoKVwiPlxcbiAgPGRpdiBjbGFzcz1cImVkaXRhYmxlLXRleHQgYmtyXCIgY29udGVudGVkaXRhYmxlPVwie3sgaXNFZGl0YWJsZSgpID8gdHJ1ZSA6IGZhbHNlIH19XCIgc3R5bGU9XCJtaW4taGVpZ2h0OiAxNHB4OyBtaW4td2lkdGg6IDE0cHhcIj48L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImJrby10YWJsZWRpc3BsYXkvb3V0cHV0LXRhYmxlLW9wdGlvbnNcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgZml4ZWQgYmtyXCIgc3R5bGU9XCJoZWlnaHQ6IDY5cHhcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPlRhYmxlIE9wdGlvbnM8L2gxPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGZpeGVkIG1vZGFsLWxhcmdlIGJrclwiIHN0eWxlPVwicGFkZGluZy10b3A6IDY5cHg7IHBhZGRpbmctYm90dG9tOiA2OHB4XCI+XFxuXFxuIDx0YWJzZXQgY2xhc3M9XCJia3JcIj5cXG5cXHQ8dGFiIGhlYWRpbmc9XCJUYWJsZSBGb3JtYXR0aW5nXCIgY2xhc3M9XCJia3JcIj5cXG5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcblxcdFxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTQgYmtyXCI+XFxuXFx0XFx0ICAgIFxcdFVzZSBwYWdpbmF0aW9uOlxcblxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTQgYmtyXCI+XFxuXFx0XFx0ICAgIFxcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1tb2RlbD1cInBhZ2luYXRpb24udXNlXCIgY2xhc3M9XCJia3JcIj5cXG5cXHRcXHQgICAgPC9kaXY+XFxuICAgIFxcdDwvZGl2PlxcblxcdFxcdDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNCBia3JcIj5cXG5cXHRcXHQgICAgXFx0TWF4IHJvd3MgdG8gZGlzcGxheTpcXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy00IGJrclwiPlxcblxcdFxcdCAgICBcXHQ8aW5wdXQgdHlwZT1cIm51bWJlclwiIG5nLW1vZGVsPVwicGFnaW5hdGlvbi5yb3dzVG9EaXNwbGF5XCIgbmctZGlzYWJsZWQ9XCJwYWdpbmF0aW9uLnVzZVwiIGNsYXNzPVwiYmtyXCI+XFxuXFx0XFx0ICAgIDwvZGl2PlxcbiAgICBcXHQ8L2Rpdj5cXG5cXHQ8L3RhYj5cXG5cXHQ8dGFiIGhlYWRpbmc9XCJDZWxsIEZvcm1hdHRpbmdcIiBjbGFzcz1cImJrclwiPlxcblxcdCAgPGRpdiBjbGFzcz1cInJvdyBia3JcIj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5Db2x1bW48L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5EaXNwbGF5IFR5cGU8L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5TaG93ICg8YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRpc3BsYXlBbGwoKVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+QWxsPC9hPik8L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5BbGlnbm1lbnQ8L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgIDwvZGl2PlxcblxcblxcdCAgPGRpdiBjbGFzcz1cInJvdyBia3JcIiBuZy1yZXBlYXQ9XCJtZW51aWR4IGluIGdldENlbGxJZHhcIj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIHt7IGdldENlbGxOYW1bbWVudWlkeF0gfX1cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJrclwiIG5nLW1vZGVsPVwiZ2V0Q2VsbERpc3BbbWVudWlkeF1cIiBuZy1vcHRpb25zPVwiaXRlbS50eXBlIGFzIGl0ZW0ubmFtZSBmb3IgaXRlbSBpbiBnZXRDZWxsRGlzcE9wdHNGKG1lbnVpZHgpXCI+PC9zZWxlY3Q+XFxuXFx0XFx0PC9kaXY+ICAgXFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmctbW9kZWw9XCJnZXRDZWxsU2hvW21lbnVpZHhdXCIgY2xhc3M9XCJia3JcIj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHRcXHRcXHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmctbW9kZWw9XCJnZXRDZWxsQWxpZ25bbWVudWlkeF1cIiB2YWx1ZT1cIkxcIiBjbGFzcz1cImJrclwiPiZuYnNwOzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1hbGlnbi1sZWZ0IGJrclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4mbmJzcDtcXG4gIFxcdFxcdFxcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuZy1tb2RlbD1cImdldENlbGxBbGlnblttZW51aWR4XVwiIHZhbHVlPVwiQ1wiIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWFsaWduLWNlbnRlciBia3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Jm5ic3A7XFxuXFx0XFx0XFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5nLW1vZGVsPVwiZ2V0Q2VsbEFsaWduW21lbnVpZHhdXCIgdmFsdWU9XCJSXCIgY2xhc3M9XCJia3JcIj4mbmJzcDs8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tYWxpZ24tcmlnaHQgYmtyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiZuYnNwO1xcblxcdCAgICA8L2Rpdj5cXG5cXHQgIDwvZGl2PlxcbiAgIDwvdGFiPlxcbiA8L3RhYnNldD5cXG5cXG5cXG5cXG48L2Rpdj5cXG5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrciBia3JcIiBzdHlsZT1cImhlaWdodDogNjhweFwiPiBcXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyIGJrclwiIG5nLWNsaWNrPVwiY2FuY2VsT3B0aW9uc0RpYWxvZygpXCI+Q2FuY2VsPC9idXR0b24+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IG1vZGFsLXN1Ym1pdCBia3IgYmtyXCIgbmctY2xpY2s9XCJjbG9zZU9wdGlvbnNEaWFsb2coKVwiPk9LPC9idXR0b24+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJia28tdGFibGVkaXNwbGF5L291dHB1dC10YWJsZVwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cImRyb3Bkb3duIGR0bWVudSBjbGVhcmZpeCBia3JcIiBzdHlsZT1cImZsb2F0OiBsZWZ0XCIgbmctaWY9XCJyZW5kZXJNZW51XCI+XFxuICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgZHRtZW51IGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBuZy1jbGljaz1cIm1lbnVUb2dnbGUoKVwiPlxcbiAgIEVkaXQgVGFibGUgXFxuICAgPC9hPlxcbiAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIiBzdWJtZW51LWNsYXNzZXM9XCJkcm9wLXJpZ2h0XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvUmVzZXRTb3J0KClcIiBpZD1cImR0LXJlc2V0LXNvcnRcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlJlc2V0IFNvcnQ8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPiZuYnNwOzwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvU2VsZWN0QWxsKClcIiBpZD1cImR0LXNlbGVjdC1hbGxcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlNlbGVjdCBBbGw8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9EZXNlbGVjdEFsbCgpXCIgaWQ9XCJkdC1kZXNlbGVjdC1hbGxcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPkRlc2VsZWN0IEFsbDwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb1JldmVyc2VTZWxlY3Rpb24oKVwiIGlkPVwiZHQtcmV2ZXJzZS1zZWxlY3Rpb25cIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlJldmVyc2UgU2VsZWN0aW9uPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj4mbmJzcDs8L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb0NvcHlUb0NsaXBib2FyZCgpXCIgaWQ9XCJ7e2lkfX1fZHRfY29weVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+Q29weSB0byBDbGlwYm9hcmQ8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9DU1ZFeHBvcnQoZmFsc2UpXCIgaWQ9XCJkdC1zYXZlLWFsbFwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+U2F2ZSBBbGwgYXMgQ1NWPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvQ1NWRXhwb3J0KHRydWUpXCIgaWQ9XCJkdC1zYXZlLXNlbGVjdGVkXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5TYXZlIFNlbGVjdGVkIGFzIENTVjwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwib3Blbk9wdGlvbnNEaWFsb2coKVwiIGlkPVwiZHQtb3B0aW9uc1wiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+T3B0aW9ucy4uLjwvYT48L2xpPlxcbiAgIDwvdWw+XFxuIDwvZGl2Plxcblxcbjx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjbGFzcz1cImRpc3BsYXkgYmtyXCIgYm9yZGVyPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAlXCIgaWQ9XCJ7e2lkfX1cIj48L3RhYmxlPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpOyIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBiay5Db250cm9sUGFuZWxcbiAqIC0gVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgJ2NvbnRyb2wgcGFuZWwnIHNlY3Rpb24gb2YgYmVha2VyXG4gKiAtIEluIHRoZSBjb250cm9sIHBhbmVsLCB1c2VycyBnZXQgYSBsaXN0IG9mIG9wZW5lZCBzZXNzaW9ucyBhbmQgaXMgYWJsZSB0b1xuICogKHJlKW9wZW4gb25lIGluIGJrQXBwLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb250cm9sUGFuZWwnLCBbXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsuY29yZScsXG4gICAgJ2JrLnNlc3Npb24nLFxuICAgICdiay5tZW51UGx1Z2luTWFuYWdlcicsXG4gICAgJ2JrLnJlY2VudE1lbnUnLFxuICAgICdiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXInXSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb250cm9sUGFuZWwnKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvbnRyb2xQYW5lbCcsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtDb3JlTWFuYWdlciwgYmtTZXNzaW9uLCBia01lbnVQbHVnaW5NYW5hZ2VyLCBia1RyYWNrKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wiY29udHJvbHBhbmVsL2NvbnRyb2xwYW5lbFwiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJCZWFrZXJcIjtcbiAgICAgICAgdmFyIF9pbXBsID0ge1xuICAgICAgICAgIG5hbWU6IFwiYmtDb250cm9sQXBwXCIsXG4gICAgICAgICAgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBia0NvcmVNYW5hZ2VyLnNldEJrQXBwSW1wbChfaW1wbCk7XG5cbiAgICAgICAgJHNjb3BlLmdvdG9Db250cm9sUGFuZWwgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChia1V0aWxzLmlzTWlkZGxlQ2xpY2soZXZlbnQpKSB7XG4gICAgICAgICAgICB3aW5kb3cub3BlbihcIi4vXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc2V0dXAgbWVudXNcbiAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5jbGVhcigpO1xuICAgICAgICBpZiAod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KCcuLi9iZWFrZXIvcmVzdC91dGlsL2dldENvbnRyb2xQYW5lbE1lbnVQbHVnaW5zJylcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWVudVVybHMpIHtcbiAgICAgICAgICAgICAgICBtZW51VXJscy5mb3JFYWNoKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5sb2FkTWVudVBsdWdpbih1cmwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWVudWVzID0gd2luZG93LmJlYWtlci5nZXRDb250cm9sTWVudUl0ZW1zKCk7XG4gICAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5hdHRhY2hNZW51cyhtZW51ZXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuZ2V0TWVudXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGFjdGlvbnMgZm9yIFVJXG4gICAgICAgICRzY29wZS5uZXdOb3RlYm9vayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIubmV3U2Vzc2lvbihmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5uZXdFbXB0eU5vdGVib29rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5uZXdTZXNzaW9uKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUub3BlblR1dG9yaWFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5vcGVuTm90ZWJvb2soXCJjb25maWcvdHV0b3JpYWwuYmtyXCIsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYXNrIGZvciB0cmFja2luZyBwZXJtaXNzaW9uXG4gICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKCh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpICYmIGJrVHJhY2suaXNOZWVkUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KFwiLi4vYmVha2VyL3Jlc3QvdXRpbC9pc0FsbG93QW5vbnltb3VzVHJhY2tpbmdcIikudGhlbihmdW5jdGlvbihhbGxvdykge1xuICAgICAgICAgICAgc3dpdGNoIChhbGxvdy5kYXRhKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJ0cnVlXCI6XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJmYWxzZVwiOlxuICAgICAgICAgICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaChcImlzQWxsb3dBbm9ueW1vdXNUcmFja2luZ1wiLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGFsbG93ID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYWxsb3cgPSBcInRydWVcIjtcbiAgICAgICAgICAgICAgICBia1RyYWNrLmVuYWJsZSgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGFsbG93ID0gXCJmYWxzZVwiO1xuICAgICAgICAgICAgICAgIGJrVHJhY2suZGlzYWJsZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJrVXRpbHMuaHR0cFBvc3QoXCIuLi9iZWFrZXIvcmVzdC91dGlsL3NldEFsbG93QW5vbnltb3VzVHJhY2tpbmdcIiwgeyBhbGxvdzogYWxsb3cgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnNob3dXaGF0V2VMb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93TW9kYWxEaWFsb2coXG4gICAgICAgICAgICBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgSlNUWydjb250cm9scGFuZWwvd2hhdF93ZV9sb2cnXSgpXG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuXHR2YXIga2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLnNoaWZ0S2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ3RybCArIFNoaWZ0ICsgblxuXHQgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3Tm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0pO1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH0gZWxzZSBpZiAoZS5jdHJsS2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ3RybCArIG5cblx0ICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld0VtcHR5Tm90ZWJvb2soKTtcbiAgICAgICAgICAgICB9KTtcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmIGUuc2hpZnRLZXkgJiYgKGUud2hpY2ggPT09IDc4KSkgeyAvLyBDbWQgKyBTaGlmdCArIG5cblx0ICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld05vdGVib29rKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ21kICsgblxuICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3RW1wdHlOb3RlYm9vaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHR9XG5cdGNvbnNvbGUubG9nKCdpbnN0YWxsaW5nIGtleWRvd25IYW5kbGVyJyk7XG5cdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG5cblx0dmFyIG9uRGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgJChkb2N1bWVudCkudW5iaW5kKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuXHR9XG5cdCRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBvbkRlc3Ryb3kpO1xuXG4gICAgICAgIC8vIHNlc3Npb25zIGxpc3QgVUlcbiAgICAgICAgJHNjb3BlLnNlc3Npb25zID0gbnVsbDtcbiAgICAgICAgLy8gZ2V0IGxpc3Qgb2Ygb3BlbmVkIHNlc3Npb25zXG4gICAgICAgICRzY29wZS5yZWxvYWRTZXNzaW9uc0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia1Nlc3Npb24uZ2V0U2Vzc2lvbnMoKS50aGVuKGZ1bmN0aW9uKHNlc3Npb25zKSB7XG4gICAgICAgICAgICAkc2NvcGUuc2Vzc2lvbnMgPSBfKHNlc3Npb25zKS5tYXAoZnVuY3Rpb24oc2Vzc2lvbiwgc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIHNlc3Npb24uaWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5yZWxvYWRTZXNzaW9uc0xpc3QoKTtcbiAgICAgICAgJHNjb3BlLmlzU2Vzc2lvbnNMaXN0RW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gXy5pc0VtcHR5KCRzY29wZS5zZXNzaW9ucyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrLkNvbnRyb2xQYW5lbFxuICogLSBUaGlzIGlzIHRoZSBtb2R1bGUgZm9yIHRoZSAnY29udHJvbCBwYW5lbCcgc2VjdGlvbiBvZiBiZWFrZXJcbiAqIC0gSW4gdGhlIGNvbnRyb2wgcGFuZWwsIHVzZXJzIGdldCBhIGxpc3Qgb2Ygb3BlbmVkIHNlc3Npb25zIGFuZCBpcyBhYmxlIHRvXG4gKiAocmUpb3BlbiBvbmUgaW4gYmtBcHAuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbnRyb2xQYW5lbCcpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29udHJvbFBhbmVsU2Vzc2lvbkl0ZW0nLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsIGJrU2Vzc2lvbiwgYmtDb3JlTWFuYWdlciwgYmtSZWNlbnRNZW51LCBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnY29udHJvbHBhbmVsL3RhYmxlJ10sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLm9wZW4gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5vcGVuU2Vzc2lvbihzZXNzaW9uLmlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgIHZhciBmb3JtYXQgPSBzZXNzaW9uLmZvcm1hdDtcbiAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9IGFuZ3VsYXIuZnJvbUpzb24oc2Vzc2lvbi5ub3RlYm9va01vZGVsSnNvbik7XG4gICAgICAgICAgdmFyIGVkaXRlZCA9IHNlc3Npb24uZWRpdGVkO1xuICAgICAgICAgIHZhciBjbG9zZVNlc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmNyZWF0ZUV2YWx1YXRvclRoZW5FeGl0KG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb24uY2xvc2Uoc2Vzc2lvbi5pZCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLnJlbG9hZFNlc3Npb25zTGlzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoIWVkaXRlZCkge1xuICAgICAgICAgICAgLy8gY2xvc2Ugc2Vzc2lvblxuICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGFzayBpZiB1c2VyIHdhbnQgdG8gc2F2ZSBmaXJzdFxuICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIkRvIHlvdSB3YW50IHRvIHNhdmUgW1wiICsgJHNjb3BlLmdldENhcHRpb24oc2Vzc2lvbikgKyBcIl0/XCIsXG4gICAgICAgICAgICAgICAgXCJDb25maXJtIGNsb3NlXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IC8vIHllc1xuICAgICAgICAgICAgICAgICAgLy8gc2F2ZSBzZXNzaW9uXG4gICAgICAgICAgICAgICAgICB2YXIgc2F2ZVNlc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGVib29rTW9kZWxBc1N0cmluZyA9IGJrVXRpbHMudG9QcmV0dHlKc29uKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShzZXNzaW9uLm5vdGVib29rVXJpKSAmJiAhc2Vzc2lvbi5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcihzZXNzaW9uLnVyaVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlU2F2ZXIuc2F2ZShzZXNzaW9uLm5vdGVib29rVXJpLCBub3RlYm9va01vZGVsQXNTdHJpbmcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXIoKS50aGVuKGZ1bmN0aW9uKHBhdGhJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhdGhJbmZvLnVyaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdXNlOiBcIlNhdmUgY2FuY2VsbGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIocGF0aEluZm8udXJpVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTYXZlci5zYXZlKHBhdGhJbmZvLnVyaSwgbm90ZWJvb2tNb2RlbEFzU3RyaW5nKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBia1JlY2VudE1lbnUucmVjb3JkUmVjZW50RG9jdW1lbnQoYW5ndWxhci50b0pzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiBwYXRoSW5mby51cmksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwYXRoSW5mby51cmlUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBfLmlzRW1wdHkoZm9ybWF0KSA/IFwiXCIgOiBmb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1c2U6IFwiZXJyb3Igc2F2aW5nIHRvIGZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHZhciBzYXZpbmdGYWlsZWRIYW5kbGVyID0gZnVuY3Rpb24oaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5jYXVzZSA9PT0gXCJTYXZlIGNhbmNlbGxlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHNhdmluZyBjYW5jZWxsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzFCdXR0b25Nb2RhbChpbmZvLmVycm9yLCBpbmZvLmNhdXNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHNhdmVTZXNzaW9uKCkudGhlbihjbG9zZVNlc3Npb24sIHNhdmluZ0ZhaWxlZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IC8vIG5vXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIHdpdGhvdXQgc2F2aW5nXCIpO1xuICAgICAgICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgLy8gY2FuY2VsXG4gICAgICAgICAgICAgICAgICAvLyBuby1vcFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJTYXZlXCIsXG4gICAgICAgICAgICAgICAgXCJEb24ndCBTYXZlXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRDYXB0aW9uID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgIHZhciB1cmwgPSBzZXNzaW9uLm5vdGVib29rVXJpO1xuICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJOZXcgTm90ZWJvb2tcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHVybFt1cmwubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5ub3RlYm9va1VyaTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyXG4gKiBia0NlbGxNZW51UGx1Z2luTWFuYWdlciBsb2FkIGFuZCBtYW5hZ2VzIGxvYWRlZCBjZWxsIG1lbnUgcGx1Z2lucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJywgW1xuICAgICdiay51dGlscycsXG4gICAgJ2JrLmhlbHBlcicgIC8vIFRoaXMgaXMgb25seSBmb3IgZW5zdXJpbmcgdGhhdCB3aW5kb3cuYmtIZWxwZXIgaXMgc2V0LCBkb24ndCB1c2UgYmtIZWxwZXIgZGlyZWN0bHlcbiAgXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdia0NlbGxNZW51UGx1Z2luTWFuYWdlcicsIGZ1bmN0aW9uKGJrVXRpbHMpIHtcbiAgICAvLyBsb2FkZWQgcGx1Z2luc1xuICAgIHZhciBfY2VsbE1lbnVQbHVnaW5zID0ge307XG5cbiAgICB2YXIgYWRkUGx1Z2luID0gZnVuY3Rpb24oY2VsbFR5cGUsIGl0ZW1HZXR0ZXIpIHtcbiAgICAgIGlmICghX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV0pIHtcbiAgICAgICAgX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIF9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdLnB1c2goaXRlbUdldHRlcik7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZm9yICh2YXIgbWVtYmVyIGluIF9jZWxsTWVudVBsdWdpbnMpIHtcbiAgICAgICAgICBkZWxldGUgX2NlbGxNZW51UGx1Z2luc1ttZW1iZXJdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoJy4uL2JlYWtlci9yZXN0L3V0aWwvZ2V0Q2VsbE1lbnVQbHVnaW5zJylcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWVudVVybHMpIHtcbiAgICAgICAgICAgICAgICBtZW51VXJscy5mb3JFYWNoKHNlbGYubG9hZFBsdWdpbik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtbCA9IHdpbmRvdy5iZWFrZXIuZ2V0Q2VsbE1lbnVMaXN0KCk7XG4gICAgICAgICAgaWYgKF8uaXNBcnJheShtbCkpIHtcbiAgICAgICAgICAgIHZhciBpOyAgICAgIFxuICAgICAgICAgICAgZm9yKGk9MDsgaTxtbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoXy5pc0FycmF5KG1sW2ldLmNlbGxUeXBlKSkge1xuICAgICAgICAgICAgICAgIF8obWxbaV0uY2VsbFR5cGUpLmVhY2goZnVuY3Rpb24oY1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgIGFkZFBsdWdpbihjVHlwZSwgbWxbaV0ucGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRQbHVnaW4obWxbaV0uY2VsbFR5cGUsIG1sW2ldLnBsdWdpbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZSh1cmwpLnRoZW4oZnVuY3Rpb24oZXgpIHtcbiAgICAgICAgICBpZiAoXy5pc0FycmF5KGV4LmNlbGxUeXBlKSkge1xuICAgICAgICAgICAgXyhleC5jZWxsVHlwZSkuZWFjaChmdW5jdGlvbihjVHlwZSkge1xuICAgICAgICAgICAgICBhZGRQbHVnaW4oY1R5cGUsIGV4LnBsdWdpbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkUGx1Z2luKGV4LmNlbGxUeXBlLCBleC5wbHVnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZXgucGx1Z2luO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRQbHVnaW46IGZ1bmN0aW9uKGNlbGxUeXBlKSB7XG4gICAgICAgIHJldHVybiBfY2VsbE1lbnVQbHVnaW5zW2NlbGxUeXBlXTtcbiAgICAgIH0sXG4gICAgICBnZXRNZW51SXRlbXM6IGZ1bmN0aW9uKGNlbGxUeXBlLCBzY29wZSkge1xuICAgICAgICB2YXIgbWVudUl0ZW1HZXR0ZXJzID0gX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV07XG4gICAgICAgIHZhciBuZXdJdGVtcyA9IFtdO1xuICAgICAgICBfKG1lbnVJdGVtR2V0dGVycykuZWFjaChmdW5jdGlvbihnZXR0ZXIpIHtcbiAgICAgICAgICB2YXIgaXRlbXMgPSBnZXR0ZXIoc2NvcGUpO1xuICAgICAgICAgIF8oaXRlbXMpLmVhY2goZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgIG5ld0l0ZW1zLnB1c2goaXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvcmVcbiAqIEhvbGRzIHRoZSBjb3JlIG9mIGJlYWtlciB1dGlsaXRpZXMuIEl0IHdyYXBzIG9mIGxvd2VyIGxldmVsIHV0aWxpdGllcyB0aGF0IGNvbWUgZnJvbSBvdGhlclxuICogbW9kdWxlcy5cbiAqIFRoZSB1c2VyIGZhY2luZyBkaXJlY3RpdmVzIGFsc28gdXNlIHRoZSBjb3JlIGFzIGEgY29tbXVuaWNhdGlvbi9leGNoYW5nZSBsYXllci5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29yZScsIFtcbiAgICAndWkuYm9vdHN0cmFwJyxcbiAgICAndWkua2V5cHJlc3MnLFxuICAgICdiay5jb21tb25VaScsXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsucmVjZW50TWVudScsXG4gICAgJ2JrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsXG4gICAgJ2JrLnRyZWVWaWV3J1xuICBdKTtcblxuICAvKipcbiAgICogYmtDb3JlTWFuYWdlclxuICAgKiAtIHRoaXMgYWN0cyBhcyB0aGUgZ2xvYmFsIHNwYWNlIGZvciBhbGwgdmlldyBtYW5hZ2VycyB0byB1c2UgaXQgYXMgdGhlIGNvbW11bmljYXRpb24gY2hhbm5lbFxuICAgKiAtIGJrVXRpbHMgc2hvdWxkIGJlIGNvbnNpZGVyICdwcml2YXRlJyB0byBiZWFrZXIsIGV4dGVybmFsIGNvZGUgc2hvdWxkIGRlcGVuZCBvbiBia0hlbHBlclxuICAgKiAgICAgaW5zdGVhZFxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrQ29yZU1hbmFnZXInLCBmdW5jdGlvbihcbiAgICAgICRtb2RhbCxcbiAgICAgICRyb290U2NvcGUsXG4gICAgICAkZG9jdW1lbnQsXG4gICAgICAkbG9jYXRpb24sXG4gICAgICAkc2Vzc2lvblN0b3JhZ2UsXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtSZWNlbnRNZW51LFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBtb2RhbERpYWxvZ09wKSB7XG5cbiAgICB2YXIgRmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3kgPSBmdW5jdGlvbiAoKXtcbiAgICAgIHZhciBuZXdTdHJhdGVneSA9IHRoaXM7XG4gICAgICBuZXdTdHJhdGVneS5pbnB1dCA9IFwiXCI7XG4gICAgICBuZXdTdHJhdGVneS5nZXRSZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ld1N0cmF0ZWd5LmlucHV0O1xuICAgICAgfTtcbiAgICAgIG5ld1N0cmF0ZWd5LmNsb3NlID0gZnVuY3Rpb24oZXYsIGNsb3NlRnVuYykge1xuICAgICAgICBpZiAoZXYud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgY2xvc2VGdW5jKHRoaXMuZ2V0UmVzdWx0KCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbmV3U3RyYXRlZ3kudHJlZVZpZXdmcyA9IHsgLy8gZmlsZSBzZXJ2aWNlXG4gICAgICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbihiYXNlUGF0aCwgb3BlbkZvbGRlcnMpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgcGF0aHMgPSBbYmFzZVBhdGhdO1xuXG4gICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IHRydWU7XG5cbiAgICAgICAgICBpZiAob3BlbkZvbGRlcnMpIHtcbiAgICAgICAgICAgIHZhciBwYXRocyA9IFtwYXRoc10uY29uY2F0KG9wZW5Gb2xkZXJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5odHRwUG9zdChcIi4uL2JlYWtlci9yZXN0L2ZpbGUtaW8vZ2V0RGVjb3JhdGVkQ2hpbGRyZW5cIiwge1xuICAgICAgICAgICAgb3BlbkZvbGRlcnM6IHBhdGhzLmpvaW4oJywnKVxuICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICAgIHNlbGYuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGxvYWRpbmcgY2hpbGRyZW5cIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbGxJbnB1dDogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgIG5ld1N0cmF0ZWd5LmlucHV0ID0gcGF0aDtcbiAgICAgICAgfSxcbiAgICAgICAgb3BlbjogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgIHRoaXMuZmlsbElucHV0KHBhdGgpO1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnbW9kYWwuc3VibWl0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldE9yZGVyQnk6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJCeSA9IG9wdGlvbnMub3JkZXJCeTtcbiAgICAgICAgICAkcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJSZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPcmRlckJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyQnkgfHwgJ3VyaSc7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yZGVyUmV2ZXJzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyUmV2ZXJzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJldHR5T3JkZXJCeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHByZXR0eU5hbWVzID0ge1xuICAgICAgICAgICAgdXJpOiAnTmFtZScsXG4gICAgICAgICAgICBtb2RpZmllZDogJ0RhdGUgTW9kaWZpZWQnXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHByZXR0eU5hbWVzWyRyb290U2NvcGUuZnNQcmVmcy5vcmRlckJ5IHx8ICd1cmknXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd1NwaW5uZXI6IGZhbHNlLFxuICAgICAgICBhcHBseUV4dEZpbHRlcjogdHJ1ZSxcbiAgICAgICAgZXh0RmlsdGVyOiBbJ2JrciddLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgdmFyIGZzID0gbmV3U3RyYXRlZ3kudHJlZVZpZXdmcztcbiAgICAgICAgICBpZiAoIWZzLmFwcGx5RXh0RmlsdGVyIHx8IF8uaXNFbXB0eShmcy5leHRGaWx0ZXIpIHx8IGNoaWxkLnR5cGUgPT09IFwiZGlyZWN0b3J5XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXyhmcy5leHRGaWx0ZXIpLmFueShmdW5jdGlvbihleHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF8uc3RyaW5nLmVuZHNXaXRoKGNoaWxkLnVyaSwgZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8gaW1wb3J0ZXJzIGFyZSByZXNwb25zaWJsZSBmb3IgaW1wb3J0aW5nIHZhcmlvdXMgZm9ybWF0cyBpbnRvIGJrclxuICAgIC8vIGltcG9ydGVyIGltcGwgbXVzdCBkZWZpbmUgYW4gJ2ltcG9ydCcgbWV0aG9kXG4gICAgdmFyIF9pbXBvcnRlcnMgPSB7fTtcbiAgICB2YXIgRk9STUFUX0JLUiA9IFwiYmtyXCI7XG4gICAgX2ltcG9ydGVyc1tGT1JNQVRfQktSXSA9IHtcbiAgICAgIGltcG9ydDogZnVuY3Rpb24obm90ZWJvb2tKc29uKSB7XG4gICAgICAgIHZhciBub3RlYm9va01vZGVsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia1V0aWxzLmZyb21QcmV0dHlKc29uKG5vdGVib29rSnNvbik7XG4gICAgICAgICAgLy8gVE9ETywgdG8gYmUgcmVtb3ZlZC4gQWRkcmVzc2luZyBsb2FkaW5nIGEgY29ycnVwdGVkIG5vdGVib29rLlxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG5vdGVib29rTW9kZWwpKSB7XG4gICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtVdGlscy5mcm9tUHJldHR5SnNvbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgIGJrVXRpbHMubG9nKFwiY29ycnVwdGVkLW5vdGVib29rXCIsIHsgbm90ZWJvb2tVcmk6IGVuaGFuY2VkTm90ZWJvb2tVcmkgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhpcyBpcyBub3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2sgSlNPTlwiKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKG5vdGVib29rSnNvbik7XG4gICAgICAgICAgdGhyb3cgXCJOb3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2tcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm90ZWJvb2tNb2RlbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIExPQ0FUSU9OX0ZJTEVTWVMgPSBcImZpbGVcIjtcbiAgICB2YXIgTE9DQVRJT05fSFRUUCA9IFwiaHR0cFwiO1xuICAgIHZhciBMT0NBVElPTl9BSkFYID0gXCJhamF4XCI7XG5cbiAgICAvLyBmaWxlTG9hZGVycyBhcmUgcmVzcG9uc2libGUgZm9yIGxvYWRpbmcgZmlsZXMgYW5kIG91dHB1dCB0aGUgZmlsZSBjb250ZW50IGFzIHN0cmluZ1xuICAgIC8vIGZpbGVMb2FkZXIgaW1wbCBtdXN0IGRlZmluZSBhbiAnbG9hZCcgbWV0aG9kIHdoaWNoIHJldHVybnMgYSB0aGVuLWFibGVcbiAgICB2YXIgX2ZpbGVMb2FkZXJzID0ge307XG4gICAgX2ZpbGVMb2FkZXJzW0xPQ0FUSU9OX0ZJTEVTWVNdID0ge1xuICAgICAgbG9hZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRGaWxlKHVyaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBfZmlsZUxvYWRlcnNbTE9DQVRJT05fSFRUUF0gPSB7XG4gICAgICBsb2FkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZEh0dHAodXJpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIF9maWxlTG9hZGVyc1tMT0NBVElPTl9BSkFYXSA9IHtcbiAgICAgIGxvYWQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkQWpheCh1cmkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBmaWxlU2F2ZXJzIGFyZSByZXNwb25zaWJsZSBmb3Igc2F2aW5nIHZhcmlvdXMgZm9ybWF0cyBpbnRvIGJrclxuICAgIC8vIGZpbGVMb2FkZXIgaW1wbCBtdXN0IGRlZmluZSBhbiAnbG9hZCcgbWV0aG9kIHdoaWNoIHJldHVybnMgYSB0aGVuLWFibGVcbiAgICB2YXIgX2ZpbGVTYXZlcnMgPSB7fTtcblxuICAgIF9maWxlU2F2ZXJzW0xPQ0FUSU9OX0ZJTEVTWVNdID0ge1xuICAgICAgc2F2ZTogZnVuY3Rpb24odXJpLCBjb250ZW50QXNTdHJpbmcsIG92ZXJ3cml0ZSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5zYXZlRmlsZSh1cmksIGNvbnRlbnRBc1N0cmluZywgb3ZlcndyaXRlKTtcbiAgICAgIH0sXG4gICAgICBzaG93RmlsZUNob29zZXI6IGZ1bmN0aW9uKGluaXRVcmkpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd0RlZmF1bHRTYXZpbmdGaWxlQ2hvb3Nlcihpbml0VXJpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX2ZpbGVTYXZlcnNbTE9DQVRJT05fQUpBWF0gPSB7XG4gICAgICBzYXZlOiBmdW5jdGlvbih1cmksIGNvbnRlbnRBc1N0cmluZykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5zYXZlQWpheCh1cmksIGNvbnRlbnRBc1N0cmluZyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBpbXBvcnRJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRpbnB1dCxcbiAgICAgICAgICBlbmRwb2ludCA9ICcuLi9iZWFrZXIvZmlsZXVwbG9hZCc7XG5cbiAgICAgIGlmICgoJGlucHV0ID0gJCgnaW5wdXQjaW1wb3J0LW5vdGVib29rJykpLmxlbmd0aCkgcmV0dXJuICRpbnB1dDtcblxuICAgICAgJGlucHV0ID0gJCgnPGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cImZpbGVcIiBpZD1cImltcG9ydC1ub3RlYm9va1wiICcgK1xuICAgICAgICAgICAgICAgICAnZGF0YS11cmw9XCInICsgZW5kcG9pbnQgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgICdzdHlsZT1cImRpc3BsYXk6IG5vbmVcIi8+JylcbiAgICAgICAgICAgICAgICAucHJlcGVuZFRvKCdib2R5Jyk7XG5cbiAgICAgICRpbnB1dC5maWxldXBsb2FkKHtcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZG9uZTogZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuaW1wb3J0Tm90ZWJvb2soZGF0YS5yZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICRpbnB1dDtcbiAgICB9O1xuXG4gICAgdmFyIGJrQ29yZU1hbmFnZXIgPSB7XG5cbiAgICAgIHNldE5vdGVib29rSW1wb3J0ZXI6IGZ1bmN0aW9uKGZvcm1hdCwgaW1wb3J0ZXIpIHtcbiAgICAgICAgX2ltcG9ydGVyc1tmb3JtYXRdID0gaW1wb3J0ZXI7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tJbXBvcnRlcjogZnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBfaW1wb3J0ZXJzW2Zvcm1hdF07XG4gICAgICB9LFxuICAgICAgc2V0RmlsZUxvYWRlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZUxvYWRlcikge1xuICAgICAgICBfZmlsZUxvYWRlcnNbdXJpVHlwZV0gPSBmaWxlTG9hZGVyO1xuICAgICAgfSxcbiAgICAgIGdldEZpbGVMb2FkZXI6IGZ1bmN0aW9uKHVyaVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9maWxlTG9hZGVyc1t1cmlUeXBlXTtcbiAgICAgIH0sXG4gICAgICBzZXRGaWxlU2F2ZXI6IGZ1bmN0aW9uKHVyaVR5cGUsIGZpbGVTYXZlcikge1xuICAgICAgICBfZmlsZVNhdmVyc1t1cmlUeXBlXSA9IGZpbGVTYXZlcjtcbiAgICAgIH0sXG4gICAgICBnZXRGaWxlU2F2ZXI6IGZ1bmN0aW9uKHVyaVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9maWxlU2F2ZXJzW3VyaVR5cGVdO1xuICAgICAgfSxcbiAgICAgIGd1ZXNzVXJpVHlwZTogZnVuY3Rpb24obm90ZWJvb2tVcmkpIHtcbiAgICAgICAgLy8gVE9ETywgbWFrZSBzbWFydGVyIGd1ZXNzXG4gICAgICAgIGlmICgvXmh0dHBzPzpcXC9cXC8vLmV4ZWMobm90ZWJvb2tVcmkpKSB7XG4gICAgICAgICAgcmV0dXJuIExPQ0FUSU9OX0hUVFA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL15hamF4Oi8uZXhlYyhub3RlYm9va1VyaSkpIHtcbiAgICAgICAgICByZXR1cm4gTE9DQVRJT05fQUpBWDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gTE9DQVRJT05fRklMRVNZUztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGd1ZXNzRm9ybWF0OiBmdW5jdGlvbihub3RlYm9va1VyaSkge1xuICAgICAgICAvLyBUT0RPLCBtYWtlIHNtYXJ0ZXIgZ3Vlc3NcbiAgICAgICAgcmV0dXJuIEZPUk1BVF9CS1I7XG4gICAgICB9LFxuXG4gICAgICBfYmVha2VyUm9vdE9wOiBudWxsLFxuICAgICAgaW5pdDogZnVuY3Rpb24oYmVha2VyUm9vdE9wKSB7XG4gICAgICAgIHRoaXMuX2JlYWtlclJvb3RPcCA9IGJlYWtlclJvb3RPcDtcbiAgICAgICAgYmtSZWNlbnRNZW51LmluaXQoe1xuICAgICAgICAgIG9wZW46IGJlYWtlclJvb3RPcC5vcGVuTm90ZWJvb2tcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ290b0NvbnRyb2xQYW5lbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWFrZXJSb290T3AuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgfSxcbiAgICAgIG5ld1Nlc3Npb246IGZ1bmN0aW9uKGVtcHR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWFrZXJSb290T3AubmV3U2Vzc2lvbihlbXB0eSk7XG4gICAgICB9LFxuICAgICAgb3BlblNlc3Npb246IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmVha2VyUm9vdE9wLm9wZW5TZXNzaW9uKHNlc3Npb25JZCk7XG4gICAgICB9LFxuICAgICAgb3Blbk5vdGVib29rOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCkge1xuICAgICAgICB0aGlzLl9iZWFrZXJSb290T3Aub3Blbk5vdGVib29rKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0KTtcbiAgICAgIH0sXG4gICAgICBhZGRJbXBvcnRJbnB1dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGltcG9ydElucHV0KCk7XG4gICAgICB9LFxuICAgICAgaW1wb3J0Tm90ZWJvb2tEaWFsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpbXBvcnRJbnB1dCgpLmNsaWNrKCk7XG4gICAgICB9LFxuICAgICAgaW1wb3J0Tm90ZWJvb2s6IGZ1bmN0aW9uKG5vdGVib29rKSB7XG4gICAgICAgICRzZXNzaW9uU3RvcmFnZS5pbXBvcnRlZE5vdGVib29rID0gbm90ZWJvb2s7XG5cbiAgICAgICAgcmV0dXJuICRyb290U2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL3Nlc3Npb24vaW1wb3J0XCIpLnNlYXJjaCh7fSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXI6IGZ1bmN0aW9uKGluaXRQYXRoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBia1V0aWxzLmFsbChbYmtVdGlscy5nZXRIb21lRGlyZWN0b3J5KCksIGJrVXRpbHMuZ2V0U3RhcnRVcERpcmVjdG9yeSgpXSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICAgIHZhciBob21lRGlyID0gdmFsdWVzWzBdO1xuICAgICAgICAgIHZhciBwd2QgPSB2YWx1ZXNbMV07XG4gICAgICAgICAgdmFyIGZpbGVDaG9vc2VyU3RyYXRlZ3kgPSBzZWxmLmdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS5pbnB1dCA9IGluaXRQYXRoO1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kuZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF8uaXNFbXB0eSh0aGlzLmlucHV0KSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmlucHV0O1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ34nKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGhvbWVEaXIgKyBcIi9cIlxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLnN0cmluZy5zdGFydHNXaXRoKHJlc3VsdCwgJ34vJykpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJ34nLCBob21lRGlyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIV8uc3RyaW5nLnN0YXJ0c1dpdGgocmVzdWx0LCAnLycpICYmICFyZXN1bHQubWF0Y2goL15cXHcrOlxcXFwvKSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBwd2QgKyBcIi9cIiArIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghXy5zdHJpbmcuZW5kc1dpdGgocmVzdWx0LCAnLmJrcicpXG4gICAgICAgICAgICAgICAgJiYgIV8uc3RyaW5nLmVuZHNXaXRoKHJlc3VsdCwgJy8nKSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBcIi5ia3JcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5Lm5ld0ZvbGRlciA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSB0cnVlO1xuICAgICAgICAgICAgYmtVdGlscy5odHRwUG9zdChcIi4uL2JlYWtlci9yZXN0L2ZpbGUtaW8vY3JlYXRlRGlyZWN0b3J5XCIsIHtwYXRoOiBwYXRofSlcbiAgICAgICAgICAgICAgICAuY29tcGxldGUoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kuZ2V0U2F2ZUJ0bkRpc2FibGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5pc0VtcHR5KHRoaXMuaW5wdXQpIHx8IF8uc3RyaW5nLmVuZHNXaXRoKHRoaXMuaW5wdXQsICcvJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5LnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXIgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgZmlsZUNob29zZXJUZW1wbGF0ZSA9IEpTVFsndGVtcGxhdGUvc2F2ZW5vdGVib29rJ10oe2hvbWVkaXI6IGhvbWVEaXIsIHB3ZDogcHdkIH0pO1xuICAgICAgICAgIHZhciBmaWxlQ2hvb3NlclJlc3VsdEhhbmRsZXIgPSBmdW5jdGlvbiAoY2hvc2VuRmlsZVBhdGgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xuICAgICAgICAgICAgICB1cmk6IGNob3NlbkZpbGVQYXRoLFxuICAgICAgICAgICAgICB1cmlUeXBlOiBMT0NBVElPTl9GSUxFU1lTXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgc2VsZi5zaG93TW9kYWxEaWFsb2coXG4gICAgICAgICAgICAgIGZpbGVDaG9vc2VyUmVzdWx0SGFuZGxlcixcbiAgICAgICAgICAgICAgZmlsZUNob29zZXJUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG5cbiAgICAgIGNvZGVNaXJyb3JPcHRpb25zOiBmdW5jdGlvbihzY29wZSwgbm90ZWJvb2tDZWxsT3ApIHtcbiAgICAgICAgdmFyIGdvVXBPck1vdmVGb2N1c1VwID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBpZiAoJCgnLkNvZGVNaXJyb3ItaGludCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vY29kZWNvbXBsZXRlIGlzIHVwLCBza2lwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjbS5nZXRDdXJzb3IoKS5saW5lID09PSAwKSB7XG4gICAgICAgICAgICBtb3ZlRm9jdXNVcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZChcImdvTGluZVVwXCIpO1xuICAgICAgICAgICAgdmFyIHRvcCA9IGNtLmN1cnNvckNvb3Jkcyh0cnVlLCd3aW5kb3cnKS50b3A7XG4gICAgICAgICAgICBpZiAoIHRvcCA8IDE1MClcbiAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIHRvcC0xNTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ29Eb3duT3JNb3ZlRm9jdXNEb3duID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBpZiAoJCgnLkNvZGVNaXJyb3ItaGludCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vY29kZWNvbXBsZXRlIGlzIHVwLCBza2lwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjbS5nZXRDdXJzb3IoKS5saW5lID09PSBjbS5kb2Muc2l6ZSAtIDEpIHtcbiAgICAgICAgICAgIG1vdmVGb2N1c0Rvd24oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJnb0xpbmVEb3duXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbW92ZUZvY3VzRG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIG1vdmUgZm9jdXMgdG8gbmV4dCBjb2RlIGNlbGxcbiAgICAgICAgICB2YXIgdGhpc0NlbGxJZCA9IHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICB2YXIgbmV4dENlbGwgPSBub3RlYm9va0NlbGxPcC5nZXROZXh0KHRoaXNDZWxsSWQpO1xuICAgICAgICAgIHdoaWxlIChuZXh0Q2VsbCkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmJrTm90ZWJvb2suZ2V0Rm9jdXNhYmxlKG5leHRDZWxsLmlkKSkge1xuICAgICAgICAgICAgICBzY29wZS5ia05vdGVib29rLmdldEZvY3VzYWJsZShuZXh0Q2VsbC5pZCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXh0Q2VsbCA9IG5vdGVib29rQ2VsbE9wLmdldE5leHQobmV4dENlbGwuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbW92ZUZvY3VzVXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBtb3ZlIGZvY3VzIHRvIHByZXYgY29kZSBjZWxsXG4gICAgICAgICAgdmFyIHRoaXNDZWxsSUQgPSBzY29wZS5jZWxsbW9kZWwuaWQ7XG4gICAgICAgICAgdmFyIHByZXZDZWxsID0gbm90ZWJvb2tDZWxsT3AuZ2V0UHJldih0aGlzQ2VsbElEKTtcbiAgICAgICAgICB3aGlsZSAocHJldkNlbGwpIHtcbiAgICAgICAgICAgIHZhciB0ID0gc2NvcGUuYmtOb3RlYm9vay5nZXRGb2N1c2FibGUocHJldkNlbGwuaWQpO1xuICAgICAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICAgICAgdC5mb2N1cygpO1xuICAgICAgICAgICAgICB2YXIgdG9wID0gdC5jbS5jdXJzb3JDb29yZHModHJ1ZSwnd2luZG93JykudG9wO1xuICAgICAgICAgICAgICBpZiAoIHRvcCA8IDE1MClcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgdG9wLTE1MCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcHJldkNlbGwgPSBub3RlYm9va0NlbGxPcC5nZXRQcmV2KHByZXZDZWxsLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGV2YWx1YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuZXZhbHVhdGUoKTtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXZhbHVhdGVBbmRHb0Rvd24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5ldmFsdWF0ZSgpO1xuICAgICAgICAgIG1vdmVGb2N1c0Rvd24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWF5YmVTaG93QXV0b0NvbXBsZXRlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBpZiAoc2NvcGUuYmtOb3RlYm9vay5nZXRDTUtleU1hcE1vZGUoKSA9PT0gXCJlbWFjc1wiKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICAgICAgY20uc2V0RXh0ZW5kaW5nKCFjbS5nZXRFeHRlbmRpbmcoKSk7XG4gICAgICAgICAgICBjbS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY20uc2V0RXh0ZW5kaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QXV0b0NvbXBsZXRlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHNob3dBdXRvQ29tcGxldGUgPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIHZhciBnZXRUb2tlbiA9IGZ1bmN0aW9uKGVkaXRvciwgY3VyKSB7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yLmdldFRva2VuQXQoY3VyKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBnZXRIaW50cyA9IGZ1bmN0aW9uKGVkaXRvciwgc2hvd0hpbnRDQiwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGN1ciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGdldFRva2VuKGVkaXRvciwgY3VyKTtcbiAgICAgICAgICAgIHZhciBjdXJzb3JQb3MgPSBlZGl0b3IuaW5kZXhGcm9tUG9zKGN1cik7XG4gICAgICAgICAgICAvLyBXZSBtaWdodCB3YW50IHRoaXMgZGVmaW5lZCBieSB0aGUgcGx1Z2luLlxuICAgICAgICAgICAgdmFyIG9uUmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdHMsIG1hdGNoZWRfdGV4dCwgZG90Rml4KSB7XG4gICAgICAgICAgICAgIHZhciBzdGFydCA9IHRva2VuLnN0YXJ0O1xuICAgICAgICAgICAgICB2YXIgZW5kID0gdG9rZW4uZW5kO1xuICAgICAgICAgICAgICBpZiAoZG90Rml4ICYmIHRva2VuLnN0cmluZyA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICBzdGFydCArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChtYXRjaGVkX3RleHQpIHtcbiAgICAgICAgICAgICAgICBzdGFydCArPSAoY3VyLmNoIC0gdG9rZW4uc3RhcnQgLSBtYXRjaGVkX3RleHQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBlbmQgPSBzdGFydCArIG1hdGNoZWRfdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2hvd0hpbnRDQih7XG4gICAgICAgICAgICAgICAgbGlzdDogXy51bmlxKHJlc3VsdHMpLFxuICAgICAgICAgICAgICAgIGZyb206IENvZGVNaXJyb3IuUG9zKGN1ci5saW5lLCBzdGFydCksXG4gICAgICAgICAgICAgICAgdG86IENvZGVNaXJyb3IuUG9zKGN1ci5saW5lLCBlbmQpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmF1dG9jb21wbGV0ZShjdXJzb3JQb3MsIG9uUmVzdWx0cyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChjbS5nZXRPcHRpb24oJ21vZGUnKSA9PT0gJ2h0bWxtaXhlZCcgfHwgY20uZ2V0T3B0aW9uKCdtb2RlJykgPT09ICdqYXZhc2NyaXB0Jykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2luZyBjb2RlIG1pcnJvclwiKTtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiYXV0b2NvbXBsZXRlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgIGNsb3NlT25VbmZvY3VzOiB0cnVlLFxuICAgICAgICAgICAgICBhbGlnbldpdGhXb3JkOiB0cnVlLFxuICAgICAgICAgICAgICBjb21wbGV0ZVNpbmdsZTogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2hvd0hpbnQoY20sIGdldEhpbnRzLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVDZWxsVXAgPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLm1vdmVVcChzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVDZWxsRG93biA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3AubW92ZURvd24oc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkZWxldGVDZWxsID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5kZWxldGUoc2NvcGUuY2VsbG1vZGVsLmlkLCB0cnVlKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdGFiID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgdmFyIGxlZnRMaW5lID0gY20uZ2V0UmFuZ2Uoe2xpbmU6IGN1cnNvci5saW5lLCBjaDogMH0sIGN1cnNvcik7XG4gICAgICAgICAgaWYgKGxlZnRMaW5lLm1hdGNoKC9eXFxzKiQvKSkge1xuICAgICAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJpbmRlbnRNb3JlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QXV0b0NvbXBsZXRlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmFja3NwYWNlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcihcImFuY2hvclwiKTtcbiAgICAgICAgICBpZiAoY3Vyc29yLmxpbmUgIT0gYW5jaG9yLmxpbmUgfHwgY3Vyc29yLmNoICE9IGFuY2hvci5jaCkge1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKFwiXCIsIGN1cnNvciwgYW5jaG9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGxlZnRMaW5lID0gY20uZ2V0UmFuZ2Uoe2xpbmU6IGN1cnNvci5saW5lLCBjaDogMH0sIGN1cnNvcik7XG4gICAgICAgICAgaWYgKGxlZnRMaW5lLm1hdGNoKC9eXFxzKyQvKSkge1xuICAgICAgICAgICAgY20uZGVsZXRlSCgtMSwgXCJjaGFyXCIpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGNtLmdldE9wdGlvbignaW5kZW50VW5pdCcpO1xuICAgICAgICAgICAgd2hpbGUgKChjbS5nZXRDdXJzb3IoKS5jaCAlIGluZGVudCkgIT0gMCkge1xuICAgICAgICAgICAgICBjbS5kZWxldGVIKC0xLCBcImNoYXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLmRlbGV0ZUgoLTEsIFwiY2hhclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxuICAgICAgICAgIG1hdGNoQnJhY2tldHM6IHRydWUsXG4gICAgICAgICAgZXh0cmFLZXlzOiB7XG4gICAgICAgICAgICBcIlVwXCIgOiBnb1VwT3JNb3ZlRm9jdXNVcCxcbiAgICAgICAgICAgIFwiRG93blwiIDogZ29Eb3duT3JNb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJDdHJsLVNcIjogXCJzYXZlXCIsXG4gICAgICAgICAgICBcIkNtZC1TXCI6IFwic2F2ZVwiLFxuICAgICAgICAgICAgXCJBbHQtRG93blwiOiBtb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJBbHQtSlwiOiBtb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJBbHQtVXBcIjogbW92ZUZvY3VzVXAsXG4gICAgICAgICAgICBcIkFsdC1LXCI6IG1vdmVGb2N1c1VwLFxuICAgICAgICAgICAgXCJDdHJsLUVudGVyXCI6IGV2YWx1YXRlLFxuICAgICAgICAgICAgXCJDbWQtRW50ZXJcIjogZXZhbHVhdGUsXG4gICAgICAgICAgICBcIlNoaWZ0LUVudGVyXCI6IGV2YWx1YXRlQW5kR29Eb3duLFxuICAgICAgICAgICAgXCJDdHJsLVNwYWNlXCI6IG1heWJlU2hvd0F1dG9Db21wbGV0ZSxcbiAgICAgICAgICAgIFwiQ21kLVNwYWNlXCI6IHNob3dBdXRvQ29tcGxldGUsXG4gICAgICAgICAgICBcIkN0cmwtQWx0LVVwXCI6IG1vdmVDZWxsVXAsXG4gICAgICAgICAgICBcIkNtZC1BbHQtVXBcIjogbW92ZUNlbGxVcCxcbiAgICAgICAgICAgIFwiQ3RybC1BbHQtRG93blwiOiBtb3ZlQ2VsbERvd24sXG4gICAgICAgICAgICBcIkNtZC1BbHQtRG93blwiOiBtb3ZlQ2VsbERvd24sXG4gICAgICAgICAgICBcIkN0cmwtQWx0LURcIjogZGVsZXRlQ2VsbCxcbiAgICAgICAgICAgIFwiQ21kLUFsdC1EXCI6IGRlbGV0ZUNlbGwsXG4gICAgICAgICAgICBcIlRhYlwiOiB0YWIsXG4gICAgICAgICAgICBcIkJhY2tzcGFjZVwiOiBiYWNrc3BhY2UsXG4gICAgICAgICAgICBcIkN0cmwtL1wiOiBcInRvZ2dsZUNvbW1lbnRcIixcbiAgICAgICAgICAgIFwiQ21kLS9cIjogXCJ0b2dnbGVDb21tZW50XCJcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBfYmtBcHBJbXBsOiBudWxsLFxuICAgICAgc2V0QmtBcHBJbXBsOiBmdW5jdGlvbihia0FwcE9wKSB7XG4gICAgICAgIHRoaXMuX2JrQXBwSW1wbCA9IGJrQXBwT3A7XG4gICAgICB9LFxuICAgICAgZ2V0QmtBcHA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmtBcHBJbXBsO1xuICAgICAgfSxcblxuICAgICAgZ2V0UmVjZW50TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrUmVjZW50TWVudS5nZXRNZW51SXRlbXMoKTtcbiAgICAgIH0sXG5cbiAgICAgIGdldE5vdGVib29rRWxlbWVudDogZnVuY3Rpb24oY3VycmVudFNjb3BlKSB7XG4gICAgICAgIC8vIFdhbGsgdXAgdGhlIHNjb3BlIHRyZWUgYW5kIGZpbmQgdGhlIG9uZSB0aGF0IGhhcyBhY2Nlc3MgdG8gdGhlXG4gICAgICAgIC8vIG5vdGVib29rIGVsZW1lbnQgKG5vdGVib29rIGRpcmVjdGl2ZSBzY29wZSwgc3BlY2lmaWNhbGx5KVxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChjdXJyZW50U2NvcGUuZ2V0Tm90ZWJvb2tFbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rRWxlbWVudChjdXJyZW50U2NvcGUuJHBhcmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRTY29wZS5nZXROb3RlYm9va0VsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rQ2VsbE1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXI7XG4gICAgICB9LFxuICAgICAgLy8gZ2VuZXJhbFxuICAgICAgc2hvd01vZGFsRGlhbG9nOiBmdW5jdGlvbihjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHdpbmRvd0NsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICAgICAgYmFja2Ryb3BDbGljazogdHJ1ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbW9kYWxEaWFsb2dDdHJsJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhdHRhY2hTdWJtaXRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRkb2N1bWVudC5vbigna2V5ZG93bi5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAkKCcubW9kYWwgLm1vZGFsLXN1Ym1pdCcpLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlbW92ZVN1Ym1pdExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGRvY3VtZW50Lm9mZigna2V5ZG93bi5tb2RhbCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFhYWCAtIHRlbXBsYXRlIGlzIHNvbWV0aW1lcyBhIHVybCBub3cuXG4gICAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKCdhcHAvdGVtcGxhdGUvJykgPT09IDApIHtcbiAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlVXJsID0gdGVtcGxhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kYWxEaWFsb2dPcC5zZXRTdHJhdGVneShzdHJhdGVneSk7XG4gICAgICAgIHZhciBkZCA9ICRtb2RhbC5vcGVuKG9wdGlvbnMpO1xuXG4gICAgICAgIGF0dGFjaFN1Ym1pdExpc3RlbmVyKCk7XG5cbiAgICAgICAgZGQucmVzdWx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmVtb3ZlU3VibWl0TGlzdGVuZXIoKTtcblxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlbW92ZVN1Ym1pdExpc3RlbmVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZDtcbiAgICAgIH0sXG4gICAgICBzaG93MEJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIpIHtcbiAgICAgICAgaWYgKCFtc2dIZWFkZXIpIHtcbiAgICAgICAgICBtc2dIZWFkZXIgPSBcIk9vcHMuLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9J21vZGFsLWhlYWRlcic+XCIgK1xuICAgICAgICAgICAgXCI8aDE+XCIgKyBtc2dIZWFkZXIgKyBcIjwvaDE+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J21vZGFsLWJvZHknPjxwPlwiICsgbXNnQm9keSArIFwiPC9wPjwvZGl2PlwiIDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKG51bGwsIHRlbXBsYXRlKTtcbiAgICAgIH0sXG4gICAgICBzaG93MUJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIsIGNhbGxiYWNrLCBidG5UZXh0LCBidG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiT29wcy4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIGJ0blRleHQgPSBidG5UZXh0ID8gYnRuVGV4dCA6IFwiQ2xvc2VcIjtcbiAgICAgICAgYnRuQ2xhc3MgPSBidG5DbGFzcyA/IF8uaXNBcnJheShidG5DbGFzcykgPyBidG5DbGFzcy5qb2luKCcgJykgOiBidG5DbGFzcyA6ICdidG4tcHJpbWFyeSc7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz0nbW9kYWwtaGVhZGVyJz5cIiArXG4gICAgICAgICAgICBcIjxoMT5cIiArIG1zZ0hlYWRlciArIFwiPC9oMT5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbW9kYWwtYm9keSc+PHA+XCIgKyBtc2dCb2R5ICsgXCI8L3A+PC9kaXY+XCIgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0nYnRuIFwiICsgYnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIk9LXFxcIiknPlwiICsgYnRuVGV4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKGNhbGxiYWNrLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgc2hvdzJCdXR0b25Nb2RhbDogZnVuY3Rpb24oXG4gICAgICAgICAgbXNnQm9keSxcbiAgICAgICAgICBtc2dIZWFkZXIsXG4gICAgICAgICAgb2tDQiwgY2FuY2VsQ0IsXG4gICAgICAgICAgb2tCdG5UeHQsIGNhbmNlbEJ0blR4dCxcbiAgICAgICAgICBva0J0bkNsYXNzLCBjYW5jZWxCdG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiUXVlc3Rpb24uLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgIG9rQ0IgPyBva0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgY2FuY2VsQ0IgPyBjYW5jZWxDQigpIDogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG9rQnRuVHh0ID0gb2tCdG5UeHQgPyBva0J0blR4dCA6IFwiT0tcIjtcbiAgICAgICAgY2FuY2VsQnRuVHh0ID0gY2FuY2VsQnRuVHh0ID8gY2FuY2VsQnRuVHh0IDogXCJDYW5jZWxcIjtcbiAgICAgICAgb2tCdG5DbGFzcyA9IG9rQnRuQ2xhc3MgPyBfLmlzQXJyYXkob2tCdG5DbGFzcykgPyBva0J0bkNsYXNzLmpvaW4oJyAnKSA6IG9rQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICBjYW5jZWxCdG5DbGFzcyA9IGNhbmNlbEJ0bkNsYXNzID8gXy5pc0FycmF5KGNhbmNlbEJ0bkNsYXNzKSA/IGNhbmNlbEJ0bkNsYXNzLmpvaW4oJyAnKSA6IGNhbmNlbEJ0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdZZXMgYnRuIFwiICsgb2tCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZShcXFwiT0tcXFwiKSc+XCIgKyBva0J0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdDYW5jZWwgYnRuIFwiICsgY2FuY2VsQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoKSc+XCIgKyBjYW5jZWxCdG5UeHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dNb2RhbERpYWxvZyhjbG9zZSwgdGVtcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIHNob3czQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKFxuICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlcixcbiAgICAgICAgICB5ZXNDQiwgbm9DQiwgY2FuY2VsQ0IsXG4gICAgICAgICAgeWVzQnRuVHh0LCBub0J0blR4dCwgY2FuY2VsQnRuVHh0LFxuICAgICAgICAgIHllc0J0bkNsYXNzLCBub0J0bkNsYXNzLCBjYW5jZWxCdG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiUXVlc3Rpb24uLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIlllc1wiKSB7XG4gICAgICAgICAgICB5ZXNDQiA/IHllc0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIk5vXCIpIHtcbiAgICAgICAgICAgIG5vQ0IgPyBub0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgY2FuY2VsQ0IgPyBjYW5jZWxDQigpIDogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHllc0J0blR4dCA9IHllc0J0blR4dCA/IHllc0J0blR4dCA6IFwiWWVzXCI7XG4gICAgICAgIG5vQnRuVHh0ID0gbm9CdG5UeHQgPyBub0J0blR4dCA6IFwiTm9cIjtcbiAgICAgICAgY2FuY2VsQnRuVHh0ID0gY2FuY2VsQnRuVHh0ID8gY2FuY2VsQnRuVHh0IDogXCJDYW5jZWxcIjtcbiAgICAgICAgeWVzQnRuQ2xhc3MgPSB5ZXNCdG5DbGFzcyA/IF8uaXNBcnJheSh5ZXNCdG5DbGFzcykgPyBva0J0bkNsYXNzLmpvaW4oJyAnKSA6IHllc0J0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgbm9CdG5DbGFzcyA9IG5vQnRuQ2xhc3MgPyBfLmlzQXJyYXkobm9CdG5DbGFzcykgPyBub0J0bkNsYXNzLmpvaW4oJyAnKSA6IG5vQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICBjYW5jZWxCdG5DbGFzcyA9IGNhbmNlbEJ0bkNsYXNzID8gXy5pc0FycmF5KGNhbmNlbEJ0bkNsYXNzKSA/IGNhbmNlbEJ0bkNsYXNzLmpvaW4oJyAnKSA6IGNhbmNlbEJ0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSd5ZXMgYnRuIFwiICsgeWVzQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIlllc1xcXCIpJz5cIiArIHllc0J0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdubyBidG4gXCIgKyBub0J0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKFxcXCJOb1xcXCIpJz5cIiArIG5vQnRuVHh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J2NhbmNlbCBidG4gXCIgKyBjYW5jZWxCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZSgpJz5cIiArIGNhbmNlbEJ0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKGNsb3NlLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICB9LFxuICAgICAgc2hvd0Z1bGxNb2RhbERpYWxvZzogZnVuY3Rpb24oY2FsbGJhY2ssIHRlbXBsYXRlLCBjb250cm9sbGVyLCBkc2NvcGUpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgd2luZG93Q2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICBiYWNrZHJvcENsaWNrOiB0cnVlLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsXG4gICAgICAgICAgcmVzb2x2ZTogeyBkc2NvcGU6IGZ1bmN0aW9uKCl7IHJldHVybiBkc2NvcGU7IH0gfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKCdodHRwOicpICE9PSAwKSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGQgPSAkbW9kYWwub3BlbihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGRkLnJlc3VsdC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNob3dMYW5ndWFnZU1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgY29udHJvbGxlcjogJ3BsdWdpbk1hbmFnZXJDdHJsJyxcbiAgICAgICAgICB0ZW1wbGF0ZTogSlNUWydtYWluYXBwL2NvbXBvbmVudHMvcGx1Z2lubWFuYWdlci9wbHVnaW5tYW5hZ2VyJ10oKVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkZCA9ICRtb2RhbC5vcGVuKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZGQucmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGJrQ29yZU1hbmFnZXI7XG4gIH0pO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdtb2RhbERpYWxvZ09wJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zdHJhdGVneSA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBzZXRTdHJhdGVneTogZnVuY3Rpb24oc3RyYXRlZ3kpIHtcbiAgICAgICAgX3N0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICB9LFxuICAgICAgZ2V0U3RyYXRlZ3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3N0cmF0ZWd5O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5jb250cm9sbGVyKCdtb2RhbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRtb2RhbEluc3RhbmNlLCBtb2RhbERpYWxvZ09wKSB7XG4gICAgJHNjb3BlLmdldFN0cmF0ZWd5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbW9kYWxEaWFsb2dPcC5nZXRTdHJhdGVneSgpO1xuICAgIH07XG4gICAgJHJvb3RTY29wZS4kb24oJ21vZGFsLnN1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLmNsb3NlKCRzY29wZS5nZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKTtcbiAgICB9KTtcbiAgICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKHJlc3VsdCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERpcmVjdGl2ZSB0byBzaG93IGEgbW9kYWwgZGlhbG9nIHRoYXQgZG9lcyBmaWxlbmFtZSBpbnB1dC5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2ZpbGVBY3Rpb25EaWFsb2cnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHsgYWN0aW9uTmFtZTogJ0AnLCBpbnB1dElkOiAnQCcsIGNsb3NlOiAnPScgfSxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ3RlbXBsYXRlL2ZpbGVhY3Rpb25kaWFsb2cnXSgpLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuZmluZCgnaW5wdXQnKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuZGVidWdcbiAqIFRoaXMgbW9kdWxlIGlzIGZvciBkZWJ1ZyBvbmx5IGFuZCBzaG91bGQgbmV2ZXIgYmUgdXNlZCBpbiBjb2RlXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJiay5kZWJ1Z1wiLCBbXG4gICAgXCJiay5hbmd1bGFyVXRpbHNcIixcbiAgICBcImJrLm1haW5BcHBcIixcbiAgICAnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICBcImJrLmNvcmVcIixcbiAgICAnYmsuc2Vzc2lvbk1hbmFnZXInLFxuICAgIFwiYmsub3V0cHV0TG9nXCIsXG4gICAgXCJiay5yZWNlbnRNZW51XCIsXG4gICAgXCJiay5zZXNzaW9uXCIsXG4gICAgXCJiay5zaGFyZVwiLFxuICAgIFwiYmsudHJhY2tcIixcbiAgICBcImJrLnV0aWxzXCIsXG4gICAgXCJiay5jb21ldGRVdGlsc1wiLFxuICAgIFwiYmsuY29tbW9uVXRpbHNcIixcbiAgICBcImJrLm1lbnVQbHVnaW5NYW5hZ2VyXCIsXG4gICAgXCJiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXJcIixcbiAgICBcImJrLmV2YWx1YXRvck1hbmFnZXJcIixcbiAgICBcImJrLmV2YWx1YXRlSm9iTWFuYWdlclwiLFxuICAgIFwiYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyXCJcbiAgXSk7XG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtEZWJ1Z1wiLCBmdW5jdGlvbihcbiAgICAgICRpbmplY3RvciwgYW5ndWxhclV0aWxzLCBia0V2YWx1YXRlSm9iTWFuYWdlciwgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLCBia091dHB1dExvZywgYmtSZWNlbnRNZW51LCBia1Nlc3Npb24sIGJrU2hhcmUsXG4gICAgICBia1RyYWNrLCBia1V0aWxzLCBjb21ldGRVdGlscywgY29tbW9uVXRpbHMsIGJrTWVudVBsdWdpbk1hbmFnZXIsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJGluamVjdG9yOiAkaW5qZWN0b3IsXG4gICAgICBhbmd1bGFyVXRpbHM6IGFuZ3VsYXJVdGlscyxcbiAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyOiBia0V2YWx1YXRlSm9iTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyOiBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXI6IGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyOiBia0NvcmVNYW5hZ2VyLFxuICAgICAgYmtPdXRwdXRMb2c6IGJrT3V0cHV0TG9nLFxuICAgICAgYmtSZWNlbnRNZW51OiBia1JlY2VudE1lbnUsXG4gICAgICBia1Nlc3Npb246IGJrU2Vzc2lvbixcbiAgICAgIGJrU2hhcmU6IGJrU2hhcmUsXG4gICAgICBia1RyYWNrOiBia1RyYWNrLFxuICAgICAgYmtVdGlsczogYmtVdGlscyxcbiAgICAgIGNvbWV0ZFV0aWxzOiBjb21ldGRVdGlscyxcbiAgICAgIGNvbW1vblV0aWxzOiBjb21tb25VdGlscyxcbiAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXI6IGJrTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcjogYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXI6IGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyOiBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcixcbiAgICAgIGRlYnVnVUk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBia0hlbHBlci5nZXRCa05vdGVib29rVmlld01vZGVsKCkudG9nZ2xlRGVidWdnaW5nKCk7XG4gICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyJywgWydiay51dGlscyddKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2JrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyJywgZnVuY3Rpb24oYmtVdGlscywgJG1vZGFsKSB7XG4gICAgdmFyIG5hbWVUb1VybE1hcCA9IHt9O1xuICAgIHZhciBuYW1lVG9WaXN1YWxQYXJhbXMgPSB7fTtcbiAgICB2YXIgcGx1Z2lucyA9IHt9O1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbnMgPSBbXTtcblxuICAgIHZhciBldmFsdWF0b3JMb2FkUXVldWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX3F1ZXVlID0gW107XG4gICAgICB2YXIgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuXG4gICAgICB2YXIgbG9hZEV2YWx1YXRvciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJMb2FkaW5nIHBsdWdpbiBcIitldi5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZShldi51cmwsIGV2Lm5hbWUpO1xuICAgICAgfTtcbiAgICAgIHZhciBkb05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9sb2FkSW5Qcm9ncmVzcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSBfcXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKF9sb2FkSW5Qcm9ncmVzcykge1xuICAgICAgICAgIGlmIChwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy5uYW1lXSB8fCBwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy51cmxdKSB7IC8vIHBsdWdpbiBjb2RlIGFscmVhZHkgbG9hZGVkXG4gICAgICAgICAgICBpZiAocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MubmFtZV0pIHtcbiAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzLnJlc29sdmUocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MubmFtZV0pXG4gICAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKGRvTmV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MucmVzb2x2ZShwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy51cmxdKVxuICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihkb05leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbG9hZEV2YWx1YXRvcihfbG9hZEluUHJvZ3Jlc3MpXG4gICAgICAgICAgLnRoZW4oX2xvYWRJblByb2dyZXNzLnJlc29sdmUsICBfbG9hZEluUHJvZ3Jlc3MucmVqZWN0KVxuICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJrSGVscGVyLmNsZWFyU3RhdHVzKFwiTG9hZGluZyBwbHVnaW4gXCIgKyBfbG9hZEluUHJvZ3Jlc3MubmFtZSlcbiAgICAgICAgICAgIF9sb2FkSW5Qcm9ncmVzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGRvTmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24oZXZsKSB7XG4gICAgICAgICAgX3F1ZXVlLnB1c2goZXZsKTtcbiAgICAgICAgICBia1V0aWxzLmZjYWxsKGRvTmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBnZXRLbm93bkV2YWx1YXRvclBsdWdpbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmFtZVRvVXJsTWFwO1xuICAgICAgfSxcbiAgICAgIGFkZE5hbWVUb1VybEVudHJ5OiBmdW5jdGlvbihuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgICBuYW1lVG9VcmxNYXBbbmFtZV0gPSB1cmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmFtZVRvVXJsTWFwW25hbWVdID0gdXJsLnVybDtcbiAgICAgICAgICBkZWxldGUgdXJsLnVybDtcbiAgICAgICAgICBuYW1lVG9WaXN1YWxQYXJhbXNbbmFtZV0gPSB1cmw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRWaXN1YWxQYXJhbXM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVUb1Zpc3VhbFBhcmFtc1tuYW1lXTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JGYWN0b3J5QW5kU2hlbGw6IGZ1bmN0aW9uKGV2YWx1YXRvclNldHRpbmdzKSB7XG4gICAgICAgIHZhciBuYW1lT3JVcmwgPSBldmFsdWF0b3JTZXR0aW5ncy5wbHVnaW47XG4gICAgICAgIGlmIChwbHVnaW5zW25hbWVPclVybF0pIHsgLy8gcGx1Z2luIGNvZGUgYWxyZWFkeSBsb2FkZWRcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgcGx1Z2luc1tuYW1lT3JVcmxdLmdldEV2YWx1YXRvckZhY3RvcnkoKS50aGVuKGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICAgICAgICAgIGlmIChmYWN0b3J5ICE9PSB1bmRlZmluZWQgJiYgZmFjdG9yeS5jcmVhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUoZXZhbHVhdG9yU2V0dGluZ3MpLnRoZW4oZnVuY3Rpb24oZXYpIHsgZGVmZXJyZWQucmVzb2x2ZShldik7IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwibm8gZmFjdG9yeSBmb3IgZXZhbHVhdG9yIHBsdWdpblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgdmFyIG5hbWUsIHVybDtcbiAgICAgICAgICBpZiAobmFtZVRvVXJsTWFwW25hbWVPclVybF0pIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lT3JVcmw7XG4gICAgICAgICAgICB1cmwgPSBuYW1lVG9VcmxNYXBbbmFtZU9yVXJsXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB1cmwgPSBuYW1lT3JVcmw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGxvYWRKb2IgPSB7XG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICByZXNvbHZlOiBmdW5jdGlvbihleCkge1xuICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KGV4Lm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICBwbHVnaW5zW2V4Lm5hbWVdID0gZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KG5hbWUpICYmIG5hbWUgIT09IGV4Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbnNbbmFtZV0gPSBleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4LmdldEV2YWx1YXRvckZhY3RvcnkoKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdG9yeSAhPT0gdW5kZWZpbmVkICYmIGZhY3RvcnkuY3JlYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUoZXZhbHVhdG9yU2V0dGluZ3MpLnRoZW4oZnVuY3Rpb24oZXYpIHsgZGVmZXJyZWQucmVzb2x2ZShldik7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICRtb2RhbC5vcGVuKHtiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogSlNUWydoZWxwZXJzL3BsdWdpbi1sb2FkLWVycm9yJ10oe3BsdWdpbklkOiBuYW1lfSl9KTtcbiAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJubyBmYWN0b3J5IGZvciBldmFsdWF0b3IgcGx1Z2luXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBuZXZlciBjYWxsZWQuICBJbnN0ZWFkIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBcInRoZW5cIiBjbGF1c2UgYWJvdmUgaXMgY2FsbGVkIGJ1dCBmYWN0b3J5IGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIHVuZGVmaW5lZC4gIFVua25vd24gd2h5IFhYWC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoZXgubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGx1Z2luc1tleC5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShuYW1lKSAmJiBuYW1lICE9PSBleC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBsdWdpbnNbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc0VtcHR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGxvYWQgcGx1Z2luOiBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGxvYWQgcGx1Z2luOiBcIiArIG5hbWUgKyBcIiBhdCBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZWplY3Q6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgY2FsbGVkIGlmIHRoZSBVUkwgaXMgYmFkIG9yIHRoZXJlIGlzIGEgc3ludGF4IGVycm9yIGluIHRoZSBKUy5cbiAgICAgICAgICAgICAgICBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzKFwiRmFpbGVkIHRvIGZpbmQgcGx1Z2luIFwiK25hbWUrXCI6IFwiK2Vycik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRW1wdHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImZhaWxlZCB0byBmaW5kIHBsdWdpbjogXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJmYWlsZWQgdG8gZmluZCBwbHVnaW46IFwiICsgbmFtZSArIFwiIGF0IFwiICsgdXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGV2YWx1YXRvckxvYWRRdWV1ZS5hZGQobG9hZEpvYik7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjcmVhdGVFdmFsdWF0b3JUaGVuRXhpdDogZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIHRoZVNoZWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFdmFsdWF0b3JGYWN0b3J5QW5kU2hlbGwoc2V0dGluZ3MpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgIGlmIChldmFsdWF0b3IuZXhpdCkge1xuICAgICAgICAgICAgZXZhbHVhdG9yLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF8ocGx1Z2lucykuZmlsdGVyKGZ1bmN0aW9uKGFTaGVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFTaGVsbCAhPT0gdGhlU2hlbGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmhlbHBlclxuICogVGhlIGJrSGVscGVyIHNob3VsZCBiZSBhIHN1YnNldCBvZiBia0NvcmUgdXRpbGl0aWVzIHRoYXQgYXJlIGV4cG9zZWQgZm9yXG4gKiB1c2FnZXMgZXh0ZXJuYWwgdG8gQmVha2VyLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5oZWxwZXInLCBbJ2JrLnV0aWxzJywgJ2JrLmNvcmUnLCAnYmsuc2hhcmUnLCAnYmsuZGVidWcnXSk7XG4gIC8qKlxuICAgKiBia0hlbHBlclxuICAgKiAtIHNob3VsZCBiZSB0aGUgb25seSB0aGluZyBwbHVnaW5zIGRlcGVuZCBvbiB0byBpbnRlcmFjdCB3aXRoIGdlbmVyYWwgYmVha2VyIHN0dWZmcyAob3RoZXIgdGhhblxuICAgKiBjb25mb3JtaW5nIHRvIHRoZSBBUEkgc3BlYylcbiAgICogLSBleGNlcHQgcGx1Z2lucywgbm90aGluZyBzaG91bGQgZGVwZW5kcyBvbiBia0hlbHBlclxuICAgKiAtIHdlJ3ZlIG1hZGUgdGhpcyBnbG9iYWwuIFdlIHNob3VsZCByZXZpc2l0IHRoaXMgZGVjaXNpb24gYW5kIGZpZ3VyZSBvdXQgdGhlIGJlc3Qgd2F5IHRvIGxvYWRcbiAgICogICBwbHVnaW5zIGR5bmFtaWNhbGx5XG4gICAqIC0gaXQgbW9zdGx5IHNob3VsZCBqdXN0IGJlIGEgc3Vic2V0IG9mIGJrVXRpbFxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrSGVscGVyJywgZnVuY3Rpb24oYmtVdGlscywgYmtDb3JlTWFuYWdlciwgYmtTaGFyZSwgYmtEZWJ1Zykge1xuICAgIHZhciBnZXRDdXJyZW50QXBwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpO1xuICAgIH07XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCkge1xuICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0QmtOb3RlYm9va1dpZGdldFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJrSGVscGVyID0ge1xuICAgICAgLy8gZW5hYmxlIGRlYnVnXG4gICAgICBkZWJ1ZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5ia0RlYnVnID0gYmtEZWJ1ZztcbiAgICAgIH0sXG5cbiAgICAgIC8vIGJlYWtlciAocm9vdClcbiAgICAgIGdvdG9Db250cm9sUGFuZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICB9LFxuICAgICAgb3Blbk5vdGVib29rOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5vcGVuTm90ZWJvb2sobm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpO1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vdGVib29rRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuaW1wb3J0Tm90ZWJvb2tEaWFsb2coKTtcbiAgICAgIH0sXG4gICAgICAvLyBFbXB0eSB0cnVlIG1lYW5zIHRydWx5IGVtcHR5IG5ldyBzZXNzaW9uLlxuICAgICAgLy8gb3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCBub3RlYm9vay5cbiAgICAgIG5ld1Nlc3Npb246IGZ1bmN0aW9uKGVtcHR5KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLm5ld1Nlc3Npb24oZW1wdHkpO1xuICAgICAgfSxcblxuICAgICAgLy8gY3VycmVudCBhcHBcbiAgICAgIGdldEN1cnJlbnRBcHBOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkoZ2V0Q3VycmVudEFwcCgpLm5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlVua25vd24gQXBwXCI7XG4gICAgICB9LFxuICAgICAgaGFzU2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRTZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZ2V0U2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRTZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldFNlc3Npb25JZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0U2Vzc2lvbklkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0Tm90ZWJvb2tNb2RlbCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0Tm90ZWJvb2tNb2RlbFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0QmVha2VyT2JqZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRCZWFrZXJPYmplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEJlYWtlck9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rRWxlbWVudDogZnVuY3Rpb24oY3VycmVudFNjb3BlKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rRWxlbWVudChjdXJyZW50U2NvcGUpO1xuICAgICAgfSxcbiAgICAgIGNvbGxhcHNlQWxsU2VjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmNvbGxhcHNlQWxsU2VjdGlvbnMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmNvbGxhcHNlQWxsU2VjdGlvbnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGNvbGxhcHNlQWxsU2VjdGlvbnNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbG9zZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5jbG9zZU5vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5jbG9zZU5vdGVib29rKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBjbG9zZU5vdGVib29rXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2F2ZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zYXZlTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9vaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2F2ZU5vdGVib29rXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2F2ZU5vdGVib29rQXM6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2F2ZU5vdGVib29rQXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9va0FzKG5vdGVib29rVXJpLCB1cmlUeXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNhdmVOb3RlYm9va0FzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzQ29kZUNlbGw6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5oYXNDb2RlQ2VsbCh0b0V2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZSkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGUodG9FdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGV2YWx1YXRlXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdGVSb290OiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZVJvb3QpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlUm9vdCh0b0V2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZXZhbHVhdGVSb290XCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdGVDb2RlOiBmdW5jdGlvbihldmFsdWF0b3IsIGNvZGUpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZUNvZGUpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlQ29kZShldmFsdWF0b3IsIGNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZXZhbHVhdGVDb2RlXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yTWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRFdmFsdWF0b3JNZW51SXRlbXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvck1lbnVJdGVtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0RXZhbHVhdG9yTWVudUl0ZW1zXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9nZ2xlTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnRvZ2dsZU5vdGVib29rTG9ja2VkKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS50b2dnbGVOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgdG9nZ2xlTm90ZWJvb2tMb2NrZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5pc05vdGVib29rTG9ja2VkKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBpc05vdGVib29rTG9ja2VkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2cpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNob3dBbm9ueW1vdXNUcmFja2luZ0RpYWxvZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvd1N0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zaG93U3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zaG93U3RhdHVzKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNob3dTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGVTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnVwZGF0ZVN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCB1cGRhdGVTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldFN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0U3RhdHVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbGVhclN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5jbGVhclN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuY2xlYXJTdGF0dXMobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgY2xlYXJTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaG93VHJhbnNpZW50U3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNob3dUcmFuc2llbnRTdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNob3dUcmFuc2llbnRTdGF0dXMobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2hvd1RyYW5zaWVudFN0YXR1c1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvcnMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEV2YWx1YXRvcnNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRDb2RlQ2VsbHM6IGZ1bmN0aW9uKGZpbHRlcikge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldENvZGVDZWxscykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0Q29kZUNlbGxzKGZpbHRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRDb2RlQ2VsbHNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRDb2RlQ2VsbEJvZHk6IGZ1bmN0aW9uKG5hbWUsIGNvZGUpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEJvZHkpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsQm9keShuYW1lLGNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2V0Q29kZUNlbGxCb2R5XCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0Q29kZUNlbGxFdmFsdWF0b3I6IGZ1bmN0aW9uKG5hbWUsIGV2YWx1YXRvcikge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsRXZhbHVhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEV2YWx1YXRvcihuYW1lLCBldmFsdWF0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2V0Q29kZUNlbGxFdmFsdWF0b3JcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRDb2RlQ2VsbFRhZ3M6IGZ1bmN0aW9uKG5hbWUsIHRhZ3MpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbFRhZ3MpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsVGFncyhuYW1lLCB0YWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNldENvZGVDZWxsVGFnc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIGJrLW5vdGVib29rXG4gICAgICBzaGFyZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suc2hhcmVBbmRPcGVuUHVibGlzaGVkKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxldGVBbGxPdXRwdXRDZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLmRlbGV0ZUFsbE91dHB1dENlbGxzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRCa05vdGVib29rVmlld01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suZ2V0Vmlld01vZGVsKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRJbnB1dENlbGxLZXlNYXBNb2RlOiBmdW5jdGlvbihrZXlNYXBNb2RlKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLnNldENNS2V5TWFwTW9kZShrZXlNYXBNb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldElucHV0Q2VsbEtleU1hcE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgaWYgKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gYmtOb3RlYm9vay5nZXRDTUtleU1hcE1vZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gbG93IGxldmVsIHV0aWxzIChia1V0aWxzKVxuICAgICAgcmVmcmVzaFJvb3RTY29wZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH0sXG4gICAgICBsb2FkSlM6IGZ1bmN0aW9uKHVybCwgc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkSlModXJsLCBzdWNjZXNzKTtcbiAgICAgIH0sXG4gICAgICBsb2FkQ1NTOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZENTUyh1cmwpO1xuICAgICAgfSxcbiAgICAgIGxvYWRMaXN0OiBmdW5jdGlvbih1cmwsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZExpc3QodXJsLCBzdWNjZXNzLCBmYWlsdXJlKTtcbiAgICAgIH0sXG4gICAgICBmaW5kVGFibGU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZmluZFRhYmxlKGVsZW0pO1xuICAgICAgfSxcbiAgICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5nZW5lcmF0ZUlkKGxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgc2VydmVyVXJsOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnNlcnZlclVybChwYXRoKTtcbiAgICAgIH0sXG4gICAgICBmaWxlVXJsOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmZpbGVVcmwocGF0aCk7XG4gICAgICB9LFxuICAgICAgaHR0cEdldDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBHZXQodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBodHRwUG9zdDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBQb3N0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgbmV3RGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgfSxcbiAgICAgIG5ld1Byb21pc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UodmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGFsbDogZnVuY3Rpb24ocHJvbWlzZXMpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuYWxsKHByb21pc2VzKTtcbiAgICAgIH0sXG4gICAgICBmY2FsbDogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5mY2FsbChmdW5jKTtcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBmdW5jdGlvbihmdW5jLCBtcykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy50aW1lb3V0KGZ1bmMsbXMpO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbFRpbWVvdXQ6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuY2FuY2VsVGltZW91dChwcm9taXNlKTtcbiAgICAgIH0sXG4gICAgICBnZXRIb21lRGlyZWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpO1xuICAgICAgfSxcbiAgICAgIHNhdmVGaWxlOiBmdW5jdGlvbihwYXRoLCBjb250ZW50QXNKc29uLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2F2ZUZpbGUocGF0aCwgY29udGVudEFzSnNvbiwgb3ZlcndyaXRlKTtcbiAgICAgIH0sXG4gICAgICBsb2FkRmlsZTogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkRmlsZShwYXRoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIHV0aWxzIChia0NvcmUpXG4gICAgICBzZXROb3RlYm9va0ltcG9ydGVyOiBmdW5jdGlvbihmb3JtYXQsIGltcG9ydGVyKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNldE5vdGVib29rSW1wb3J0ZXIoZm9ybWF0LCBpbXBvcnRlcik7XG4gICAgICB9LFxuICAgICAgc2V0RmlsZUxvYWRlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZUxvYWRlcikge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zZXRGaWxlTG9hZGVyKHVyaVR5cGUsIGZpbGVMb2FkZXIpO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVTYXZlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZVNhdmVyKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNldEZpbGVTYXZlcih1cmlUeXBlLCBmaWxlU2F2ZXIpO1xuICAgICAgfSxcbiAgICAgIHNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyKCk7XG4gICAgICB9LFxuICAgICAgZ2V0UmVjZW50TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0UmVjZW50TWVudUl0ZW1zKCk7XG4gICAgICB9LFxuICAgICAgc2hvd01vZGFsRGlhbG9nOiBmdW5jdGlvbihjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dNb2RhbERpYWxvZyhjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KS5yZXN1bHQ7XG4gICAgICB9LFxuICAgICAgc2hvdzFCdXR0b25Nb2RhbDogZnVuY3Rpb24obXNnQm9keSwgbXNnSGVhZGVyLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKG1zZ0JvZHksIG1zZ0hlYWRlciwgY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIHNob3cyQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKG1zZ0JvZHksIG1zZ0hlYWRlciwgb2tDQiwgY2FuY2VsQ0IsIG9rQnRuVHh0LCBjYW5jZWxCdG5UeHQpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgb2tDQiwgY2FuY2VsQ0IsIG9rQnRuVHh0LCBjYW5jZWxCdG5UeHQpO1xuICAgICAgfSxcbiAgICAgIHNob3czQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKFxuICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgeWVzQ0IsIG5vQ0IsIGNhbmNlbENCLCB5ZXNCdG5UeHQsIG5vQnRuVHh0LCBjYW5jZWxCdG5UeHQpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgeWVzQ0IsIG5vQ0IsIGNhbmNlbENCLCB5ZXNCdG5UeHQsIG5vQnRuVHh0LCBjYW5jZWxCdG5UeHQpO1xuICAgICAgfSxcbiAgICAgIGdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3koKTtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RGaWxlOiBmdW5jdGlvbihjYWxsYmFjaywgdGl0bGUsIGV4dGVuc2lvbiwgY2xvc2VidG4pIHtcbiAgICAgICAgICB2YXIgc3RyYXRlZ3kgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICAgICAgc3RyYXRlZ3kudHJlZVZpZXdmcy5leHRGaWx0ZXIgPSBbIGV4dGVuc2lvbiBdO1xuICAgICAgICAgIHN0cmF0ZWd5LmV4dCA9IGV4dGVuc2lvbjtcbiAgICAgICAgICBzdHJhdGVneS50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgIHN0cmF0ZWd5LmNsb3NlYnRuID0gY2xvc2VidG47XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpLnRoZW4oXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbihob21lRGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd01vZGFsRGlhbG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU1RbJ3RlbXBsYXRlL29wZW5ub3RlYm9vayddKHtob21lZGlyOiBob21lRGlyLCBleHRlbnNpb246IGV4dGVuc2lvbn0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ3kpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICAvLyBldmFsIHV0aWxzXG4gICAgICBsb2NhdGVQbHVnaW5TZXJ2aWNlOiBmdW5jdGlvbihpZCwgbG9jYXRvcikge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvcGx1Z2luLXNlcnZpY2VzL1wiICsgaWQpLCBsb2NhdG9yKTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JGYWN0b3J5OiBmdW5jdGlvbihzaGVsbENvbnN0cnVjdG9yUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gc2hlbGxDb25zdHJ1Y3RvclByb21pc2UudGhlbihmdW5jdGlvbihTaGVsbCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UobmV3IFNoZWxsKHNldHRpbmdzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2hvd0xhbmd1YWdlTWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dMYW5ndWFnZU1hbmFnZXIoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIG90aGVyIEpTIHV0aWxzXG4gICAgICB1cGRhdGVEb2N1bWVudE1vZGVsRnJvbURPTTogZnVuY3Rpb24oaWQpIHtcblx0ICBmdW5jdGlvbiBjb252ZXJ0Q2FudmFzVG9JbWFnZShlbGVtKSB7XG5cdCAgICAgIGlmIChlbGVtLm5vZGVOYW1lID09IFwiQ0FOVkFTXCIpIHtcblx0XHQgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdCAgaW1nLnNyYyA9IGVsZW0udG9EYXRhVVJMKCk7XG5cdFx0ICByZXR1cm4gaW1nO1xuXHQgICAgICB9XG5cdCAgICAgIHZhciBjaGlsZE5vZGVzID0gZWxlbS5jaGlsZE5vZGVzO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHQgIHZhciByZXN1bHQgPSBjb252ZXJ0Q2FudmFzVG9JbWFnZShjaGlsZE5vZGVzW2ldKTtcblx0XHQgIGlmIChyZXN1bHQgIT0gY2hpbGROb2Rlc1tpXSkge1xuXHRcdCAgICAgIGVsZW0ucmVwbGFjZUNoaWxkKHJlc3VsdCwgY2hpbGROb2Rlc1tpXSk7XG5cdFx0ICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIGVsZW07XG5cdCAgfVxuICAgICAgICAgIC8vIDEpIGZpbmQgdGhlIGNlbGwgdGhhdCBjb250YWlucyBlbGVtXG4gICAgICAgICAgdmFyIGVsZW0gPSAkKFwiI1wiICsgaWQpLmNsb3Nlc3QoXCJiay1jZWxsXCIpO1xuICAgICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjZWxsaWQgPSBlbGVtWzBdLmdldEF0dHJpYnV0ZShcImNlbGxpZFwiKTtcbiAgICAgICAgICBpZiAoY2VsbGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFuIEh0bWwgY2VsbCBjb250YWluaW5nIHRoZSBlbGVtZW50ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGJvZHkgPSBlbGVtLmZpbmQoIFwiYmstb3V0cHV0LWRpc3BsYXlbdHlwZT0nSHRtbCddIGRpdiBkaXZcIiApO1xuICAgICAgICAgIGlmIChib2R5ID09PSB1bmRlZmluZWQgfHwgYm9keVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXHQgIC8vIDIuNSkgc2VhcmNoIGZvciBhbnkgY2FudmFzIGVsZW1lbnRzIGluIGJvZHkgYW5kIHJlcGxhY2UgZWFjaCB3aXRoIGFuIGltYWdlLlxuXHQgIGJvZHkgPSBjb252ZXJ0Q2FudmFzVG9JbWFnZShib2R5WzBdKTtcblxuICAgICAgICAgIC8vIDIpIGNvbnZlcnQgdGhhdCBwYXJ0IG9mIHRoZSBET00gdG8gYSBzdHJpbmdcbiAgICAgICAgICB2YXIgbmV3T3V0cHV0ID0gYm9keS5pbm5lckhUTUw7XG5cbiAgICAgICAgICAvLyAzKSBzZXQgdGhlIHJlc3VsdC5vYmplY3QgdG8gdGhhdCBzdHJpbmcuXG4gICAgICAgICAgdmFyIGNlbGwgPSBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5nZXRDZWxsKGNlbGxpZCk7XG4gICAgICAgICAgaWYgKGNlbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogY2Fubm90IGZpbmQgYW4gSHRtbCBjZWxsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgJ1wiICsgaWQgKyBcIicuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZXMgPSBjZWxsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlcy5pbm5lcnR5cGUgPT09IFwiSHRtbFwiKSB7XG4gICAgICAgICAgICByZXMub2JqZWN0ID0gbmV3T3V0cHV0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gYmtTaGFyZVxuICAgICAgc2hhcmU6IGJrU2hhcmUsXG5cbiAgICAgIC8vIGxhbmd1YWdlIHBsdWdpbiB1dGlsaXRpZXNcblxuICAgICAgc2V0dXBQcm9ncmVzc091dHB1dDogZnVuY3Rpb24obW9kZWxPdXRwdXQpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzT2JqID0ge1xuICAgICAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgICAgICBpbm5lcnR5cGU6IFwiUHJvZ3Jlc3NcIixcbiAgICAgICAgICAgIG9iamVjdDoge1xuICAgICAgICAgICAgICBtZXNzYWdlOiBcInN1Ym1pdHRpbmcgLi4uXCIsXG4gICAgICAgICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIG91dHB1dGRhdGE6IFtdLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHByb2dyZXNzT2JqO1xuICAgICAgfSxcblxuICAgICAgc2V0dXBDYW5jZWxsaW5nT3V0cHV0OiBmdW5jdGlvbihtb2RlbE91dHB1dCkge1xuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0LnR5cGUgIT09IFwiQmVha2VyRGlzcGxheVwiIHx8IG1vZGVsT3V0cHV0LnJlc3VsdC5pbm5lcnR5cGUgIT09IFwiUHJvZ3Jlc3NcIilcbiAgICAgICAgICBzZXR1cFByb2dyZXNzT3V0cHV0KG1vZGVsT3V0cHV0KTtcbiAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gXCJjYW5jZWxsaW5nIC4uLlwiO1xuICAgICAgfSxcblxuICAgICAgcmVjZWl2ZUV2YWx1YXRpb25VcGRhdGU6IGZ1bmN0aW9uKG1vZGVsT3V0cHV0LCBldmFsdWF0aW9uLCBwbHVnaW5OYW1lLCBzaGVsbElkKSB7XG4gICAgICAgIHZhciBtYXhOdW1PZkxpbmVzID0gMjAwO1xuXG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQuc3RhdHVzID0gZXZhbHVhdGlvbi5zdGF0dXM7XG5cbiAgICAgICAgLy8gc2F2ZSBpbmZvcm1hdGlvbiB0byBoYW5kbGUgdXBkYXRhYmxlIHJlc3VsdHMgaW4gZGlzcGxheXNcbiAgICAgICAgbW9kZWxPdXRwdXQucGx1Z2luTmFtZSA9IHBsdWdpbk5hbWU7XG4gICAgICAgIG1vZGVsT3V0cHV0LnNoZWxsSWQgPSBzaGVsbElkO1xuXG4gICAgICAgIC8vIGFwcGVuZCB0ZXh0IG91dHB1dCAoaWYgYW55KVxuICAgICAgICBpZiAoZXZhbHVhdGlvbi5vdXRwdXRkYXRhICE9PSB1bmRlZmluZWQgJiYgZXZhbHVhdGlvbi5vdXRwdXRkYXRhLmxlbmd0aD4wKSB7XG4gICAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgICBmb3IgKGlkeD0wOyBpZHg8ZXZhbHVhdGlvbi5vdXRwdXRkYXRhLmxlbmd0aD4wOyBpZHgrKykge1xuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLnB1c2goZXZhbHVhdGlvbi5vdXRwdXRkYXRhW2lkeF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY250ID0gMDtcbiAgICAgICAgICBmb3IgKGlkeD0wOyBpZHg8bW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGNudCArPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbaWR4XS52YWx1ZS5zcGxpdCgvXFxuLykubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY250ID4gbWF4TnVtT2ZMaW5lcykge1xuICAgICAgICAgICAgY250IC09IG1heE51bU9mTGluZXM7XG4gICAgICAgICAgICB3aGlsZShjbnQgPiAwKSB7XG4gICAgICAgICAgICAgIHZhciBsID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhWzBdLnZhbHVlLnNwbGl0KC9cXG4vKS5sZW5ndGg7XG4gICAgICAgICAgICAgIGlmIChsPD1jbnQpIHtcbiAgICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEuc3BsaWNlKDAsMSk7XG4gICAgICAgICAgICAgICAgY250IC09IGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbMF0udmFsdWUuc3BsaXQoL1xcbi8pO1xuICAgICAgICAgICAgICAgIGEuc3BsaWNlKDAsY250KTtcbiAgICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbMF0udmFsdWUgPSBhLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgIGNudCA9IDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IHRoaXMgc2hvdWxkIG5vdCBoYXBwZW4gLSB5b3VyIHBsdWdpbiBqYXZhc2NyaXB0IGlzIGJyb2tlbiFcIik7XG4gICAgICAgICAgc2V0dXBQcm9ncmVzc091dHB1dChtb2RlbE91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3cgdXBkYXRlIHBheWxvYWQgKGlmIG5lZWRlZClcbiAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCA9IGV2YWx1YXRpb24ucGF5bG9hZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IHVuZGVmaW5lZCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnR5cGUgPT09IFwiUmVzdWx0c1wiKSB7XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQub3V0cHV0ZGF0YSA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmFsdWF0aW9uLnN0YXR1cyA9PT0gXCJGSU5JU0hFRFwiKSB7XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkICE9PSB1bmRlZmluZWQgJiYgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnR5cGUgPT09IFwiUmVzdWx0c1wiKVxuICAgICAgICAgICAgICBldmFsdWF0aW9uLnBheWxvYWQgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQucGF5bG9hZDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb2RlbE91dHB1dC5lbGFwc2VkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5zdGFydFRpbWU7XG5cbiAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc2luZ2xlIG91dHB1dCBkaXNwbGF5XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSBldmFsdWF0aW9uLnBheWxvYWQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdyYXBwZXIgZGlzcGxheSB3aXRoIHN0YW5kYXJkIG91dHB1dCBhbmQgZXJyb3JcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHsgdHlwZSA6IFwiUmVzdWx0c1wiLCBvdXRwdXRkYXRhIDogbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLCBwYXlsb2FkIDogZXZhbHVhdGlvbi5wYXlsb2FkIH07XG4gICAgICAgICAgICAvLyBidWlsZCBvdXRwdXQgY29udGFpbmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChldmFsdWF0aW9uLmpzb25yZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LmRhdGFyZXN1bHQgPSBldmFsdWF0aW9uLmpzb25yZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRVJST1JcIikge1xuICAgICAgICAgIGlmIChldmFsdWF0aW9uLnBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC50eXBlID09PSBcIlJlc3VsdHNcIilcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnBheWxvYWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGV2YWx1YXRpb24ucGF5bG9hZCA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmICQudHlwZShldmFsdWF0aW9uLnBheWxvYWQpPT0nc3RyaW5nJykge1xuICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gZXZhbHVhdGlvbi5wYXlsb2FkLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbW9kZWxPdXRwdXQuZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Quc3RhcnRUaW1lO1xuXG4gICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIHNpbmdsZSBvdXRwdXQgZGlzcGxheVxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0ID0ge1xuICAgICAgICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgICAgICAgaW5uZXJ0eXBlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgIG9iamVjdDogZXZhbHVhdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3cmFwcGVyIGRpc3BsYXkgd2l0aCBzdGFuZGFyZCBvdXRwdXQgYW5kIGVycm9yXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IHsgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsIGlubmVydHlwZTogXCJFcnJvclwiLCBvYmplY3Q6IGV2YWx1YXRpb24ucGF5bG9hZCB9IH07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIlJVTk5JTkdcIikge1xuICAgICAgICAgIGlmIChldmFsdWF0aW9uLm1lc3NhZ2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QubWVzc2FnZSAgICAgPSBcInJ1bm5pbmcuLi5cIjtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgICAgID0gZXZhbHVhdGlvbi5tZXNzYWdlO1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgICA9IGV2YWx1YXRpb24ucHJvZ3Jlc3NCYXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIkZJTklTSEVEXCIgfHwgZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRVJST1JcIik7XG4gICAgICB9LFxuICAgICAgZ2V0VXBkYXRlU2VydmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21ldGRVdGlsID0ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uczogeyB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24ocGx1Z2luTmFtZSwgc2VydmljZUJhc2UpIHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQgPSBuZXcgJC5Db21ldGQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC5pbml0KGJrVXRpbHMuc2VydmVyVXJsKHNlcnZpY2VCYXNlICsgXCIvY29tZXRkL1wiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5obGlzdGVuZXIgPSB0aGlzLmNvbWV0ZC5hZGRMaXN0ZW5lcignL21ldGEvaGFuZHNoYWtlJywgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5ia0RlYnVnKSBjb25zb2xlLmxvZyhwbHVnaW5OYW1lKycvbWV0YS9oYW5kc2hha2UnKTtcbiAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21ldGQuYmF0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGs7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChrIGluIE9iamVjdC5rZXlzKHRoaXMuc3Vic2NyaXB0aW9ucykpXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW2tdID0gdGhpcy5jb21ldGQucmVzdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW2tdKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQucmVtb3ZlTGlzdGVuZXIodGhpcy5obGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIHZhciBrO1xuICAgICAgICAgICAgICAgIGZvciAoayBpbiBPYmplY3Qua2V5cyh0aGlzLnN1YnNjcmlwdGlvbnMpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLnVuc3Vic2NyaWJlKHRoaXMuc3Vic2NyaXB0aW9uc1trXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmNvbWV0ZCA9IG51bGw7XG4gICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHsgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHVwZGF0ZV9pZCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgaWYgKCF1cGRhdGVfaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAod2luZG93LmJrRGVidWcpIGNvbnNvbGUubG9nKCdzdWJzY3JpYmUgdG8gJyt1cGRhdGVfaWQpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC51bnN1YnNjcmliZSh0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBjYiA9IGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldC5kYXRhKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgdmFyIHMgPSB0aGlzLmNvbWV0ZC5zdWJzY3JpYmUoJy9vYmplY3RfdXBkYXRlLycgKyB1cGRhdGVfaWQsIGNiKTtcbiAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gPSBzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbih1cGRhdGVfaWQpIHtcbiAgICAgICAgICAgICAgaWYgKCF1cGRhdGVfaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAod2luZG93LmJrRGVidWcpIGNvbnNvbGUubG9nKCd1bnN1YnNjcmliZSBmcm9tICcrdXBkYXRlX2lkKTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQudW5zdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzc3Vic2NyaWJlZDogZnVuY3Rpb24odXBkYXRlX2lkKSB7XG4gICAgICAgICAgICAgIGlmICghdXBkYXRlX2lkKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdICE9PSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGJrSGVscGVyO1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm1lbnVQbHVnaW5NYW5hZ2VyJywgWydiay51dGlscyddKTtcblxuICB2YXIgdXRpbHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIERFRkFVTFRfUFJJT1JJVFkgPSAwO1xuICAgIC8vIGFkZCBuZXdJdGVtIHRvIGl0ZW1zTGlzdCwgaWYgYW4gaXRlbSB3aXRoIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0cyBpbiBpdGVtc0xpc3QsXG4gICAgLy8gY29tcGFyZSBwcmlvcml0aWVzLCBpZiBuZXdJdGVtLnByaW9yaXR5ID4gZXhpc3RpbmdJdGVtLnByaW9yaXR5LCBuZXdJdGVtIHdpbGxcbiAgICAvLyByZXBsYWNlIHRoZSBleGlzdGluZ0l0ZW0gaW4gcGxhY2UuXG4gICAgdmFyIGFkZE1lbnVJdGVtID0gZnVuY3Rpb24oaXRlbXNMaXN0LCBuZXdJdGVtKSB7XG4gICAgICAvLyBjaGVjayBpZiBhbiBlbnRyeSB3aXRoIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0XG4gICAgICB2YXIgZXhpc3RpbmdJdGVtID0gXyhpdGVtc0xpc3QpLmZpbmQoZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IG5ld0l0ZW0ubmFtZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuICAgICAgICBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgPSBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgPyBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgOiBERUZBVUxUX1BSSU9SSVRZO1xuICAgICAgICBuZXdJdGVtLnByaW9yaXR5ID0gbmV3SXRlbS5wcmlvcml0eSA/IG5ld0l0ZW0ucHJpb3JpdHkgOiBERUZBVUxUX1BSSU9SSVRZO1xuICAgICAgICBpZiAobmV3SXRlbS5wcmlvcml0eSA+PSBleGlzdGluZ0l0ZW0ucHJpb3JpdHkpIHtcbiAgICAgICAgICAvLyByZXBsYWNlIGluIHBsYWNlXG4gICAgICAgICAgaXRlbXNMaXN0LnNwbGljZShpdGVtc0xpc3QuaW5kZXhPZihleGlzdGluZ0l0ZW0pLCAxLCBuZXdJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZ25vcmUgYW5kIHdhcm5cbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJpZ25vcmluZyBtZW51IGl0ZW0gXCIgKyBuZXdJdGVtLm5hbWUgKyBcImJlY2F1c2UgcHJpb3JpdHk9XCJcbiAgICAgICAgICAgICAgKyBuZXdJdGVtLnByaW9yaXR5ICsgXCJpcyBzbWFsbGVyIHRoYW4gZXhpc3RpbmcgKFwiICsgZXhpc3RpbmdJdGVtLnByaW9yaXR5ICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtc0xpc3QgPSBpdGVtc0xpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBhZGRNZW51SXRlbXM6IGZ1bmN0aW9uIChwYXJlbnRNZW51LCBpdGVtcykge1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW1zKSkge1xuICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBhZGRNZW51SXRlbShwYXJlbnRNZW51Lml0ZW1zLCBpdGVtKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrTWVudVBsdWdpbk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzKSB7XG5cbiAgICB2YXIgbWVudXMgPSB7fTtcbiAgICB2YXIgbG9hZGVkUGx1Z2lucyA9IFtdO1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMgPSBbXTtcbiAgICB2YXIgcGx1Z2luSW5kZXggPSAwO1xuXG4gICAgdmFyIGFkZFBsdWdpbiA9IGZ1bmN0aW9uKHBsdWdpbiwgcGx1Z2luSW5kZXgsIHNlY29uZGFyeUluZGV4KSB7XG4gICAgICBpZiAoIXBsdWdpbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJlbnRNZW51ID0gXy5maW5kKF8udmFsdWVzKG1lbnVzKSwgZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IHBsdWdpbi5wYXJlbnQ7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFwYXJlbnRNZW51KSB7XG4gICAgICAgIHBhcmVudE1lbnUgPSB7XG4gICAgICAgICAgbmFtZTogcGx1Z2luLnBhcmVudCxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgaW5kZXg6IHBsdWdpbkluZGV4LFxuICAgICAgICAgIHNlY29uZGFyeUluZGV4OiBzZWNvbmRhcnlJbmRleCxcbiAgICAgICAgICBzb3J0b3JkZXI6IHBsdWdpbi5zb3J0b3JkZXIsXG4gICAgICAgICAgY2xhc3NOYW1lczogcGx1Z2luLmlkXG4gICAgICAgIH07XG4gICAgICAgIG1lbnVzW3BsdWdpbkluZGV4ICsgJ18nICsgc2Vjb25kYXJ5SW5kZXggKyAnXycgKyBwYXJlbnRNZW51Lm5hbWVdID0gcGFyZW50TWVudTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwbHVnaW5JbmRleCA8IHBhcmVudE1lbnUuaW5kZXhcbiAgICAgICAgICAgIHx8IChwbHVnaW5JbmRleCA9PT0gcGFyZW50TWVudS5pbmRleCAmJiBzZWNvbmRhcnlJbmRleCA8IHBhcmVudE1lbnUuc2Vjb25kYXJ5SW5kZXgpKSB7XG4gICAgICAgICAgZGVsZXRlIG1lbnVzW3BhcmVudE1lbnUuaW5kZXggKyAnXycgKyBwYXJlbnRNZW51LnNlY29uZGFyeUluZGV4ICsgJ18nICsgcGFyZW50TWVudS5uYW1lXTtcbiAgICAgICAgICBtZW51c1twbHVnaW5JbmRleCArICdfJyArIHNlY29uZGFyeUluZGV4ICsgJ18nICsgcGFyZW50TWVudS5uYW1lXSA9IHBhcmVudE1lbnU7XG4gICAgICAgICAgcGFyZW50TWVudS5pbmRleCA9IHBsdWdpbkluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghcGx1Z2luLnN1Ym1lbnUpIHtcbiAgICAgICAgdXRpbHMuYWRkTWVudUl0ZW1zKHBhcmVudE1lbnUsIHBsdWdpbi5pdGVtcyk7XG4gICAgICAgIGlmICghIF8uaXNGdW5jdGlvbihwYXJlbnRNZW51Lml0ZW1zKSkge1xuICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICAgIGlmIChhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkICYmIGIuc29ydG9yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyPmIuc29ydG9yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzdWJNZW51ID0gXy5maW5kKHBhcmVudE1lbnUuaXRlbXMsIGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IHBsdWdpbi5zdWJtZW51O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFzdWJNZW51KSB7XG4gICAgICAgICAgc3ViTWVudSA9IHtcbiAgICAgICAgICAgIG5hbWU6IHBsdWdpbi5zdWJtZW51LFxuICAgICAgICAgICAgdHlwZTogXCJzdWJtZW51XCIsXG4gICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICBzb3J0b3JkZXI6IHBsdWdpbi5zdWJtZW51c29ydG9yZGVyXG4gICAgICAgICAgfTtcbiAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zLnB1c2goc3ViTWVudSk7XG4gICAgICAgICAgaWYgKCEgXy5pc0Z1bmN0aW9uKHBhcmVudE1lbnUuaXRlbXMpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgICAgIGlmIChhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkICYmIGIuc29ydG9yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXI+Yi5zb3J0b3JkZXI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ViTWVudS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIHN1Yk1lbnUudHlwZSA9IFwic3VibWVudVwiO1xuICAgICAgICAgIGlmICghc3ViTWVudS5pdGVtcykge1xuICAgICAgICAgICAgc3ViTWVudS5pdGVtcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1dGlscy5hZGRNZW51SXRlbXMoc3ViTWVudSwgcGx1Z2luLml0ZW1zKTtcbiAgICAgICAgaWYgKCEgXy5pc0Z1bmN0aW9uKHN1Yk1lbnUuaXRlbXMpKSB7XG4gICAgICAgICAgc3ViTWVudS5pdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgICAgaWYgKGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQgJiYgYi5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXI+Yi5zb3J0b3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0TG9hZE1lbnVQbHVnaW5Kb2IgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldFVybDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNDYW5jZWxsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjYW5jZWxsZWQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbG9hZFBsdWdpbiA9IGZ1bmN0aW9uKGpvYikge1xuICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZShqb2IuZ2V0VXJsKCkpLnRoZW4oZnVuY3Rpb24obWVudVBsdWdpbikge1xuICAgICAgICBpZiAoam9iLmlzQ2FuY2VsbGVkKCkpIHtcbiAgICAgICAgICB0aHJvdyBcImNhbmNlbGxlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZW51UGx1Z2luLmdldE1lbnVJdGVtcygpLnRoZW4oZnVuY3Rpb24obWVudUl0ZW1zKSB7XG4gICAgICAgICAgaWYgKGpvYi5pc0NhbmNlbGxlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBcImNhbmNlbGxlZFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWVudUl0ZW1zO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbG9hZE1lbnVQbHVnaW46IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgam9iID0gZ2V0TG9hZE1lbnVQbHVnaW5Kb2IodXJsKTtcbiAgICAgICAgdmFyIGluZGV4ID0gcGx1Z2luSW5kZXgrKztcbiAgICAgICAgbG9hZFBsdWdpbihqb2IpLnRoZW4oZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgICAgbG9hZGVkUGx1Z2lucy5wdXNoKHt1cmw6IGpvYi5nZXRVcmwoKX0pO1xuICAgICAgICAgIGlmIChfLmlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgICAgXyhwbHVnaW4pLmVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgICAgYWRkUGx1Z2luKGl0ZW0sIGluZGV4LCBpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRQbHVnaW4ocGx1Z2luLCBpbmRleCwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3Rpb24pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlamVjdGlvbik7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzLnNwbGljZShsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMuaW5kZXhPZihqb2IpLCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvYWRpbmdJblByb2dyZXNzUGx1Z2luSm9icy5wdXNoKGpvYik7XG4gICAgICB9LFxuICAgICAgYXR0YWNoTWVudXM6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICB2YXIgaW5kZXggPSBwbHVnaW5JbmRleCsrO1xuICAgICAgICBpZiAoXy5pc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgICBfKHBsdWdpbikuZWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgYWRkUGx1Z2luKGl0ZW0sIGluZGV4LCBpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRQbHVnaW4ocGx1Z2luLCBpbmRleCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRNZW51czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtZW51cztcbiAgICAgIH0sXG4gICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIG1lbnVzID0ge307XG4gICAgICAgIF8obG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzKS5lYWNoKGZ1bmN0aW9uKGpvYikge1xuICAgICAgICAgIGpvYi5jYW5jZWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsdWdpbkluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm1haW5BcHBcbiAqIFRoaXMgaXMgdGhlIG1haW4gbW9kdWxlIGZvciB0aGUgYmVha2VyIG5vdGVib29rIGFwcGxpY2F0aW9uLiBUaGUgbW9kdWxlIGhhcyBhIGRpcmVjdGl2ZSB0aGF0XG4gKiBob2xkcyB0aGUgbWVudSBiYXIgYXMgd2VsbCBhcyB0aGUgbm90ZWJvb2sgdmlldy5cbiAqIFRoZSBtb2R1bGUgYWxzbyBvd25zIHRoZSBjZW50cmFsaXplZCBjZWxsIGV2YWx1YXRpb24gbG9naWMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm1haW5BcHAnLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbmdSb3V0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsudXRpbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmNvbW1vblVpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5jb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5zZXNzaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5zZXNzaW9uTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubWVudVBsdWdpbk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmNlbGxNZW51UGx1Z2luTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubm90ZWJvb2tWZXJzaW9uTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuZXZhbHVhdG9yTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuZXZhbHVhdGVKb2JNYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5ub3RlYm9vaydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gIC8qKlxuICAgKiBia0FwcFxuICAgKiAtIFRoaXMgaXMgdGhlIGJlYWtlciBBcHBcbiAgICogLSBtZW51cyArIHBsdWdpbnMgKyBub3RlYm9vayhub3RlYm9vayBtb2RlbCArIGV2YWx1YXRvcilcbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTWFpbkFwcCcsIGZ1bmN0aW9uKFxuICAgICAgJHJvdXRlLFxuICAgICAgJHJvdXRlUGFyYW1zLFxuICAgICAgJHRpbWVvdXQsXG4gICAgICAkc2Vzc2lvblN0b3JhZ2UsXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia05vdGVib29rVmVyc2lvbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRlSm9iTWFuYWdlcixcbiAgICAgICRsb2NhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcInRlbXBsYXRlL21haW5hcHAvbWFpbmFwcFwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgbm90ZWJvb2tVcmk6ICdAJyxcbiAgICAgICAgc2Vzc2lvbklkOiAnQCcsXG4gICAgICAgIG5vdGVib29rUmVxdWVzdFR5cGU6ICdAJyxcbiAgICAgICAgbm90ZWJvb2tGb3JtYXQ6ICdAJyxcbiAgICAgICAgcmVhZE9ubHk6ICdAJ1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIHNob3dMb2FkaW5nU3RhdHVzTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgJHNjb3BlLmxvYWRpbmdtc2cgPSBtZXNzYWdlO1xuICAgICAgICAgIGlmIChub2RpZ2VzdCAhPT0gdHJ1ZSAmJiAhKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB1cGRhdGVMb2FkaW5nU3RhdHVzTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRMb2FkaW5nU3RhdHVzTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUubG9hZGluZ21zZztcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmxvYWRpbmdtc2cgPT09IG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gXCJcIjtcbiAgICAgICAgICAgIGlmIChub2RpZ2VzdCAhPT0gdHJ1ZSAmJiAhKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgJHNjb3BlLmxvYWRpbmdtc2cgPSBtZXNzYWdlO1xuICAgICAgICAgIGlmIChub2RpZ2VzdCAhPT0gdHJ1ZSAmJiAhKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoJHNjb3BlLmxvYWRpbmdtc2cgPT09IG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZ21zZyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGlnZXN0ICE9PSB0cnVlICYmICEoJHNjb3BlLiQkcGhhc2UgfHwgJHNjb3BlLiRyb290LiQkcGhhc2UpKVxuICAgICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgZXZhbHVhdG9yTWVudUl0ZW1zID0gW107XG5cbiAgICAgICAgdmFyIGFkZEV2YWx1YXRvciA9IGZ1bmN0aW9uKHNldHRpbmdzLCBhbHdheXNDcmVhdGVOZXdFdmFsdWF0b3IpIHtcbiAgICAgICAgICAvLyBzZXQgc2hlbGwgaWQgdG8gbnVsbCwgc28gaXQgd29uJ3QgdHJ5IHRvIGZpbmQgYW4gZXhpc3Rpbmcgc2hlbGwgd2l0aCB0aGUgaWRcbiAgICAgICAgICBpZiAoYWx3YXlzQ3JlYXRlTmV3RXZhbHVhdG9yKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5zaGVsbElEID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLm5ld0V2YWx1YXRvcihzZXR0aW5ncylcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KGV2YWx1YXRvci5zcGVjKSkge1xuICAgICAgICAgICAgICB2YXIgYWN0aW9uSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgXyhldmFsdWF0b3Iuc3BlYykuZWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IFwiYWN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbkl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lID8gdmFsdWUubmFtZSA6IHZhbHVlLmFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWx1YXRvci5wZXJmb3JtKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoYWN0aW9uSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGV2YWx1YXRvck1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IGV2YWx1YXRvci5wbHVnaW5OYW1lLCAvLyBUT0RPLCB0aGlzIHNob3VsZCBiZSBldmFsdWF0b3Iuc2V0dGluZ3MubmFtZVxuICAgICAgICAgICAgICAgICAgaXRlbXM6IGFjdGlvbkl0ZW1zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbG9hZE5vdGVib29rID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBhZGRTY3JvbGxpbmdIYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBUT0RPLCB0aGUgZm9sbG93aW5nIGlzIGEgaGFjayB0byBhZGRyZXNzIHRoZSBpc3N1ZSB0aGF0XG4gICAgICAgICAgICAvLyBzb21laG93IHRoZSBub3RlYm9vayBpcyBzY3JvbGxlZCB0byB0aGUgbWlkZGxlXG4gICAgICAgICAgICAvLyB0aGlzIGhhY2sgbGlzdGVucyB0byB0aGUgJ3Njcm9sbCcgZXZlbnQgYW5kIHNjcm9sbHMgaXQgdG8gdGhlIHRvcFxuICAgICAgICAgICAgLy8gQSBiZXR0ZXIgc29sdXRpb24gaXMgdG8gZG8gdGhpcyB3aGVuIEFuZ3VsYXIgc3RvcHMgZmlyaW5nIGFuZCBET00gdXBkYXRlcyBmaW5pc2guXG4gICAgICAgICAgICAvLyBBIGV2ZW4gZXZlbiBiZXR0ZXIgc29sdXRpb24gaXMgdGhlIHNlc3Npb24gYWN0dWFsbHkgcmVtZW1iZXJzIHdoZXJlIHRoZSBzY3JvbGxpbmcgd2FzXG4gICAgICAgICAgICAvLyBhbmQgc2Nyb2xsIHRvIHRoZXJlIGFuZCBpbiB0aGUgY2FzZSBvZiBzdGFydGluZyBhIG5ldyBzZXNzaW9uIChpLmUuIGxvYWRpbmcgYSBub3RlYm9vayBmcm9tIGZpbGUpXG4gICAgICAgICAgICAvLyBzY3JvbGwgdG8gdG9wLlxuICAgICAgICAgICAgLy8gQSBldmVuIGJldHRlciBzb2x1dGlvbiB3b3VsZCBiZSB0byBnZXQgcmlkIG9mIHRoZSB1bndhbnRlZCBzY3JvbGxpbmcgaW4gdGhlIGZpcnN0IHBsYWNlLlxuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24gPSBmdW5jdGlvbihcbiAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLFxuICAgICAgICAgICAgICBpc0V4aXN0aW5nU2Vzc2lvbikge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5vdGVib29rIGhhcyB0byBsb2FkIHBsdWdpbnMgZnJvbSBhbiBleHRlcm5hbCBzb3VyY2VcbiAgICAgICAgICAgIHZhciByID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChyLnRlc3Qobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldLnBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBwbHVnTGlzdCA9IFwiPHVsPlwiO1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIudGVzdChub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ucGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHBsdWdMaXN0ICs9IFwiPGxpPlwiK25vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5wbHVnaW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHBsdWdMaXN0ICs9IFwiPC91bD5cIjtcbiAgICAgICAgICAgICAgICAgIHByb21wdElmSW5zZWN1cmUocGx1Z0xpc3QpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgYWNjZXB0ZWQgcmlzay4uLiBkbyB0aGUgbG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLCBpc0V4aXN0aW5nU2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlciBkZW5pZWQgcmlzay4uLiBjbGVhciBwbHVnaW5zIHdpdGggZXh0ZXJuYWwgVVJMIGFuZCBkbyB0aGUgbG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICB2YXIgciA9IG5ldyBSZWdFeHAoJ14oPzpbYS16XSs6KT8vLycsICdpJyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHIudGVzdChub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbaV0ucGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldLnBsdWdpbj1cIlwiO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLCBpc0V4aXN0aW5nU2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG5vIHVuc2FmZSBvcGVyYXRpb24gZGV0ZWN0ZWQuLi4gZG8gdGhlIGxvYWRpbmdcbiAgICAgICAgICAgIF9sb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsIGlzRXhpc3RpbmdTZXNzaW9uKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBwcm9tcHRJZkluc2VjdXJlID0gZnVuY3Rpb24odXJsTGlzdCkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiVGhpcyBub3RlYm9vayBpcyBhc2tpbmcgdG8gbG9hZCB0aGUgZm9sbG93aW5nIHBsdWdpbnMgZnJvbSBleHRlcm5hbCBzZXJ2ZXJzOjxici8+XCIgKyB1cmxMaXN0K1xuICAgICAgICAgICAgICAgIFwiIDxici8+SG93IGRvIHlvdSB3YW50IHRvIGhhbmRsZSB0aGVzZSBleHRlcm5hbCBwbHVnaW5zP1wiLFxuICAgICAgICAgICAgICAgIFwiV2FybmluZzogZXh0ZXJuYWwgcGx1Z2lucyBkZXRlY3RlZFwiLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBcIkRpc2FibGVcIiwgXCJMb2FkXCIsIFwiXCIsIFwiYnRuLWRhbmdlclwiKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIF9sb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbiA9IGZ1bmN0aW9uKFxuICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgIGlzRXhpc3RpbmdTZXNzaW9uKSB7XG5cbiAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdHVzTWVzc2FnZShcIkxvYWRpbmcgbm90ZWJvb2tcIik7XG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIGFkZFNjcm9sbGluZ0hhY2soKTtcbiAgICAgICAgICAgIGlzRXhpc3RpbmdTZXNzaW9uID0gISFpc0V4aXN0aW5nU2Vzc2lvbjtcbiAgICAgICAgICAgIGV2YWx1YXRvck1lbnVJdGVtcy5zcGxpY2UoMCwgZXZhbHVhdG9yTWVudUl0ZW1zLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIEhBQ0sgdG8gZml4IG9sZGVyIHZlcnNpb24gb2YgZXZhbHVhdG9yIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsICYmIG5vdGVib29rTW9kZWwuY2VsbHMgJiYgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm90ZWJvb2tNb2RlbC5jZWxscy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGx1Z2luID0gbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJIdG1sXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgobmFtZSxcIkxhdGV4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IFwiTGF0ZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJKYXZhU2NyaXB0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IFwiSmF2YVNjcmlwdFwiO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgobmFtZSxcIkdyb292eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkdyb292eVwiO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihuYW1lID09PSBcIlB5dGhvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2spIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZhbHVhdG9yTmFtZSA9IG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBldmFsdWF0b3JQbHVnaW4gPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ucGx1Z2luO1xuICAgICAgICAgICAgICAgIGlmIChia1V0aWxzLmJlZ2luc1dpdGgoZXZhbHVhdG9yTmFtZSxcIkh0bWxcIikpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5uYW1lID0gXCJIdG1sXCI7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ucGx1Z2luID0gXCJIdG1sXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChldmFsdWF0b3JOYW1lLFwiTGF0ZXhcIikpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1trXS5uYW1lID0gXCJMYXRleFwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLnBsdWdpbiA9IFwiTGF0ZXhcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKGV2YWx1YXRvck5hbWUsXCJKYXZhU2NyaXB0XCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNba10ubmFtZSA9IFwiSmF2YVNjcmlwdFwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLnBsdWdpbiA9IFwiSmF2YVNjcmlwdFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgoZXZhbHVhdG9yTmFtZSxcIkdyb292eVwiKSkge1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLm5hbWUgPSBcIkdyb292eVwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLnBsdWdpbiA9IFwiR3Jvb3Z5XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGV2YWx1YXRvck5hbWU9PT0gXCJQeXRob25cIikge1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2tdLm5hbWUgPSBldmFsdWF0b3JQbHVnaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIQUNLIEVORFxuXG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCgpO1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5jbGVhcigpO1xuICAgICAgICAgICAgc2Vzc2lvbklkID0gYmtTZXNzaW9uTWFuYWdlci5zZXRTZXNzaW9uSWQoc2Vzc2lvbklkKTtcblxuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXR1cChcbiAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCxcbiAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCk7XG5cbiAgICAgICAgICAgIHZhciBtdXN0d2FpdDtcbiAgICAgICAgICAgIGlmICghaXNFeGlzdGluZ1Nlc3Npb24gJiYgYmtIZWxwZXIuaGFzQ29kZUNlbGwoXCJpbml0aWFsaXphdGlvblwiKSkge1xuICAgICAgICAgICAgICBtdXN0d2FpdCA9IGJrQ29yZU1hbmFnZXIuc2hvdzBCdXR0b25Nb2RhbChcIlRoaXMgbm90ZWJvb2sgaGFzIGluaXRpYWxpemF0aW9uIGNlbGxzLi4uIHdhaXRpbmcgZm9yIHRoZWlyIGNvbXBsZXRpb24uXCIsIFwiUGxlYXNlIFdhaXRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdXNlZCB0byBsb2FkIGV2YWx1YXRvcnMgYmVmb3JlIHJlbmRlcmluZyB0aGUgcGFnZVxuICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwgJiYgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzKSB7XG4gICAgICAgICAgICAgIHZhciBwcm9taXNlcyA9IF8obm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzKS5tYXAoZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkRXZhbHVhdG9yKGV2LCAhaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYmtVdGlscy5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0V4aXN0aW5nU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgYmtVdGlscy5sb2coXCJvcGVuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdXJpOiBub3RlYm9va1VyaSxcbiAgICAgICAgICAgICAgICAgICAgdXJpVHlwZTogdXJpVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgIG1heENlbGxMZXZlbDogXyhub3RlYm9va01vZGVsLmNlbGxzKS5tYXgoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjZWxsLmxldmVsO1xuICAgICAgICAgICAgICAgICAgICB9KS5sZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgY2VsbENvdW50OiBub3RlYm9va01vZGVsLmNlbGxzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIGJrSGVscGVyLmV2YWx1YXRlUm9vdChcImluaXRpYWxpemF0aW9uXCIpLnRoZW4oZnVuY3Rpb24gKCkgeyBpZihtdXN0d2FpdCAhPT0gdW5kZWZpbmVkKSBtdXN0d2FpdC5jbG9zZSgpOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZShcIkxvYWRpbmcgbm90ZWJvb2tcIik7XG4gICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc0V4aXN0aW5nU2Vzc2lvbikge1xuICAgICAgICAgICAgICBia1V0aWxzLmxvZyhcIm9wZW5cIiwge1xuICAgICAgICAgICAgICAgIHVyaTogbm90ZWJvb2tVcmksXG4gICAgICAgICAgICAgICAgdXJpVHlwZTogdXJpVHlwZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgICAgICAgICAgICBtYXhDZWxsTGV2ZWw6IF8obm90ZWJvb2tNb2RlbC5jZWxscykubWF4KGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjZWxsLmxldmVsO1xuICAgICAgICAgICAgICAgIH0pLmxldmVsLFxuICAgICAgICAgICAgICAgIGNlbGxDb3VudDogbm90ZWJvb2tNb2RlbC5jZWxscy5sZW5ndGhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJrSGVscGVyLmV2YWx1YXRlUm9vdChcImluaXRpYWxpemF0aW9uXCIpLnRoZW4oZnVuY3Rpb24gKCkgeyBpZihtdXN0d2FpdCAhPT0gdW5kZWZpbmVkKSBtdXN0d2FpdC5jbG9zZSgpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlKFwiTG9hZGluZyBub3RlYm9va1wiKTtcbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3BlblVyaTogZnVuY3Rpb24odGFyZ2V0LCBzZXNzaW9uSWQsIHJldHJ5LCByZXRyeUNvdW50TWF4KSB7XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0LnVyaSkge1xuICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzFCdXR0b25Nb2RhbChcIkZhaWxlZCB0byBvcGVuIG5vdGVib29rLCBub3RlYm9va1VyaSBpcyBlbXB0eVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJPcGVuaW5nIFVSSVwiKTtcbiAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnRNYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnRNYXggPSAxMDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCF0YXJnZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC50eXBlID0gYmtDb3JlTWFuYWdlci5ndWVzc1VyaVR5cGUodGFyZ2V0LnVyaSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFyZ2V0LnJlYWRPbmx5ID0gISF0YXJnZXQucmVhZE9ubHk7XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0LmZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5mb3JtYXQgPSBia0NvcmVNYW5hZ2VyLmd1ZXNzRm9ybWF0KHRhcmdldC51cmkpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGltcG9ydGVyID0gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0ltcG9ydGVyKHRhcmdldC5mb3JtYXQpO1xuICAgICAgICAgICAgICBpZiAoIWltcG9ydGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldHJ5KSB7XG4gICAgICAgICAgICAgICAgICAvLyByZXRyeSwgc29tZXRpbWVzIHRoZSBpbXBvcnRlciBjYW1lIGZyb20gYSBwbHVnaW4gdGhhdCBpcyBiZWluZyBsb2FkZWRcbiAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnRNYXggLT0gMTtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWROb3RlYm9vay5vcGVuVXJpKHRhcmdldCwgcmV0cnksIHJldHJ5Q291bnRNYXgpO1xuICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJPcGVuaW5nIFVSSVwiKTtcbiAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwoXCJGYWlsZWQgdG8gb3BlbiBcIiArIHRhcmdldC51cmkgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiIGJlY2F1c2UgZm9ybWF0IFwiICsgdGFyZ2V0LmZvcm1hdCArXG4gICAgICAgICAgICAgICAgICAgICAgXCIgd2FzIG5vdCByZWNvZ25pemVkLlwiLCBcIk9wZW4gRmFpbGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdvdG9Db250cm9sUGFuZWwoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZUxvYWRlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZUxvYWRlcih0YXJnZXQudHlwZSk7XG4gICAgICAgICAgICAgICAgZmlsZUxvYWRlci5sb2FkKHRhcmdldC51cmkpLnRoZW4oZnVuY3Rpb24oZmlsZUNvbnRlbnRBc1N0cmluZykge1xuICAgICAgICAgICAgICAgICAgdmFyIG5vdGVib29rTW9kZWwgPSBpbXBvcnRlci5pbXBvcnQoZmlsZUNvbnRlbnRBc1N0cmluZyk7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyLm9wZW4obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICAgICAgICBsb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQudXJpLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZWFkT25seSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwsIGZhbHNlLCBzZXNzaW9uSWQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzFCdXR0b25Nb2RhbChkYXRhLCBcIk9wZW4gRmFpbGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdvdG9Db250cm9sUGFuZWwoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZShcIk9wZW5pbmcgVVJJXCIpO1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyb21TZXNzaW9uOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgYmtTZXNzaW9uLmxvYWQoc2Vzc2lvbklkKS50aGVuKGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tVcmkgPSBzZXNzaW9uLm5vdGVib29rVXJpO1xuICAgICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gc2Vzc2lvbi51cmlUeXBlO1xuICAgICAgICAgICAgICAgIHZhciByZWFkT25seSA9IHNlc3Npb24ucmVhZE9ubHk7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IHNlc3Npb24uZm9ybWF0O1xuICAgICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gYW5ndWxhci5mcm9tSnNvbihzZXNzaW9uLm5vdGVib29rTW9kZWxKc29uKTtcbiAgICAgICAgICAgICAgICB2YXIgZWRpdGVkID0gc2Vzc2lvbi5lZGl0ZWQ7XG4gICAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyb21JbXBvcnQ6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICB2YXIgbm90ZWJvb2sgPSAkc2Vzc2lvblN0b3JhZ2UuaW1wb3J0ZWROb3RlYm9vaztcbiAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHVyaVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIGltcG9ydGVyID0gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0ltcG9ydGVyKCdia3InKTtcbiAgICAgICAgICAgICAgdmFyIG5vdGVib29rTW9kZWwgPSBpbXBvcnRlci5pbXBvcnQobm90ZWJvb2spO1xuICAgICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyLm9wZW4obm90ZWJvb2spO1xuICAgICAgICAgICAgICBsb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW1wdHlOb3RlYm9vazogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID1cbiAgICAgICAgICAgICAgICAne1wiYmVha2VyXCI6IFwiMlwiLCBcImV2YWx1YXRvcnNcIjogW3tcIm5hbWVcIjogXCJIdG1sXCIsIFwicGx1Z2luXCI6IFwiSHRtbFwifSwnICtcbiAgICAgICAgICAgICAgICAne1wibmFtZVwiOiBcIkxhdGV4XCIsIFwicGx1Z2luXCI6IFwiTGF0ZXhcIn0sJyArXG4gICAgICAgICAgICAgICAgJ3tcIm5hbWVcIjogXCJKYXZhU2NyaXB0XCIsIFwicGx1Z2luXCI6IFwiSmF2YVNjcmlwdFwifV0sIFwiY2VsbHNcIjogW119JztcbiAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHVyaVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gbnVsbDtcbiAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgICBsb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmYXVsdE5vdGVib29rOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgYmtVdGlscy5nZXREZWZhdWx0Tm90ZWJvb2soKS50aGVuKGZ1bmN0aW9uKG5vdGVib29rTW9kZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tVcmkgPSBudWxsO1xuICAgICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia05vdGVib29rVmVyc2lvbk1hbmFnZXIub3Blbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgICAgICBsb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihcbiAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGZhbHNlLCBzZXNzaW9uSWQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICB2YXIgYmtOb3RlYm9va1dpZGdldDtcbiAgICAgICAgJHNjb3BlLnNldEJrTm90ZWJvb2sgPSBmdW5jdGlvbihia05vdGVib29rKSB7XG4gICAgICAgICAgYmtOb3RlYm9va1dpZGdldCA9IGJrTm90ZWJvb2s7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIF9pbXBsID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHByb21wdFVyaUNob29zZXIgPSBmdW5jdGlvbih1cmlUeXBlLCBpbml0VXJpKSB7XG4gICAgICAgICAgICBpZiAoIXVyaVR5cGUpIHtcbiAgICAgICAgICAgICAgdXJpVHlwZSA9IFwiZmlsZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgdmFyIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKHVyaVR5cGUpO1xuICAgICAgICAgICAgaWYgKCFmaWxlU2F2ZXIgfHwgIWZpbGVTYXZlci5zaG93RmlsZUNob29zZXIpIHtcbiAgICAgICAgICAgICAgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIoXCJmaWxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZVNhdmVyLnNob3dGaWxlQ2hvb3Nlcihpbml0VXJpKS50aGVuKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICBpZiAoXy5pc0VtcHR5KHJldC51cmkpKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiY2FuY2VsbGVkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmV0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHByb21wdElmT3ZlcndyaXRlID0gZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cyQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgXCJGaWxlIFwiICsgdXJpICsgXCIgZXhpc3RzLiBPdmVyd3JpdGU/XCIsXG4gICAgICAgICAgICAgICAgXCJGaWxlIGV4aXN0c1wiLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBcIkNhbmNlbFwiLCBcIk92ZXJ3cml0ZVwiLCBcIlwiLCBcImJ0bi1kYW5nZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVBbHdheXNPdmVyd3JpdGUgPSBmdW5jdGlvbih1cmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcih1cmlUeXBlKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZHVtcERpc3BsYXlTdGF0dXMoKTtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2F2ZURhdGEoKS5ub3RlYm9va01vZGVsQXNTdHJpbmc7XG4gICAgICAgICAgICAgIHJldHVybiBmaWxlU2F2ZXIuc2F2ZSh1cmksIGNvbnRlbnQsIHRydWUpO30sIDEpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7dXJpOiB1cmksIHVyaVR5cGU6IHVyaVR5cGV9KTtcbiAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBfc2F2ZVByb21wdElmT3ZlcndyaXRlID0gZnVuY3Rpb24oZGVmZXJyZWQsIHVyaSwgdXJpVHlwZSkge1xuICAgICAgICAgICAgdmFyIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKHVyaVR5cGUpO1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBjb250ZW50ID0gYmtTZXNzaW9uTWFuYWdlci5nZXRTYXZlRGF0YSgpLm5vdGVib29rTW9kZWxBc1N0cmluZztcbiAgICAgICAgICAgICAgcmV0dXJuIGZpbGVTYXZlci5zYXZlKHVyaSwgY29udGVudCk7XG4gICAgICAgICAgICB9LCAxKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHt1cmk6IHVyaSwgdXJpVHlwZTogdXJpVHlwZX0pOyAvLyBmaWxlIHNhdmUgc3VjY2VlZFxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAgICAgICBpZiAocmVhc29uID09PSBcImV4aXN0c1wiKSB7XG4gICAgICAgICAgICAgICAgcHJvbXB0SWZPdmVyd3JpdGUodXJpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNhdmVBbHdheXNPdmVyd3JpdGUodXJpLCB1cmlUeXBlKS50aGVuKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJldCk7IC8vIGZpbGUgc2F2ZSBzdWNjZWVkXG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlYXNvbik7IC8vIGZpbGUgc2F2ZSBmYWlsZWRcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgX3NhdmVQcm9tcHRVcmlDaG9vc2VyKGRlZmVycmVkLCB1cmlUeXBlLCB1cmkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlYXNvbiA9PT0gXCJpc0RpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgICAgICB1cmkgKyBcIiBpcyBhIGRpcmVjdG9yeS4gUGxlYXNlIGNob29zZSBhIGRpZmZlcmVudCBsb2NhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNhdmUgRmFpbGVkXCIsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfc2F2ZVByb21wdFVyaUNob29zZXIoZGVmZXJyZWQsIHVyaVR5cGUsIHVyaSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pOyAvLyBmaWxlIHNhdmUgZmFpbGVkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIF9zYXZlUHJvbXB0VXJpQ2hvb3NlciA9IGZ1bmN0aW9uKGRlZmVycmVkLCB1cmlUeXBlLCBpbml0VXJpKSB7XG4gICAgICAgICAgICBwcm9tcHRVcmlDaG9vc2VyKHVyaVR5cGUsIGluaXRVcmkpLnRoZW4oZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICAgIF9zYXZlUHJvbXB0SWZPdmVyd3JpdGUoZGVmZXJyZWQsIHJldC51cmksIHJldC51cmlUeXBlKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJjYW5jZWxsZWRcIik7IC8vIGZpbGUgc2F2ZSBjYW5jZWxsZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZVByb21wdENob29zZVVyaSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgX3NhdmVQcm9tcHRVcmlDaG9vc2VyKGRlZmVycmVkKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZVByb21wdElmT3ZlcndyaXRlID0gZnVuY3Rpb24odXJpLCB1cmlUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBfc2F2ZVByb21wdElmT3ZlcndyaXRlKGRlZmVycmVkLCB1cmksIHVyaVR5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzYXZlU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdHVzTWVzc2FnZShcIlNhdmluZ1wiKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBzYXZlRG9uZSA9IGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKGZhbHNlKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIudXBkYXRlTm90ZWJvb2tVcmkocmV0LnVyaSwgcmV0LnVyaVR5cGUsIGZhbHNlLCBcImJrclwiKTtcbiAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKFwiU2F2ZWRcIik7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzYXZlRmFpbGVkID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgaWYgKG1zZyA9PT0gXCJjYW5jZWxsZWRcIikge1xuICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIkNhbmNlbGxlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzFCdXR0b25Nb2RhbChtc2csIFwiU2F2ZSBGYWlsZWRcIik7XG4gICAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKFwiU2F2ZSBGYWlsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBldmFsQ29kZUlkID0gMDtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBcImJrTm90ZWJvb2tBcHBcIixcbiAgICAgICAgICAgIGdldFNlc3Npb25JZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldFNlc3Npb25JZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldE5vdGVib29rTW9kZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRSYXdOb3RlYm9va01vZGVsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QmVha2VyT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0QmVha2VyT2JqZWN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd1N0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0dXNNZXNzYWdlKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGVTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB1cGRhdGVMb2FkaW5nU3RhdHVzTWVzc2FnZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBnZXRMb2FkaW5nU3RhdHVzTWVzc2FnZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyU3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICAgICBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZShtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2F2ZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2F2ZVN0YXJ0KCk7XG4gICAgICAgICAgICAgIHZhciB0aGVuYWJsZTtcbiAgICAgICAgICAgICAgaWYgKGJrU2Vzc2lvbk1hbmFnZXIuaXNTYXZhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgICAgICAgICAgdGhlbmFibGUgPSAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBzYXZlRGF0YSA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2F2ZURhdGEoKTtcbiAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcihzYXZlRGF0YS51cmlUeXBlKTtcbiAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gc2F2ZURhdGEubm90ZWJvb2tNb2RlbEFzU3RyaW5nO1xuICAgICAgICAgICAgICAgICAgZmlsZVNhdmVyLnNhdmUoc2F2ZURhdGEubm90ZWJvb2tVcmksIGNvbnRlbnQsIHRydWUpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe3VyaTogc2F2ZURhdGEubm90ZWJvb2tVcmksIHVyaVR5cGU6IHNhdmVEYXRhLnVyaVR5cGV9KTtcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhlbmFibGUgPSBzYXZlUHJvbXB0Q2hvb3NlVXJpKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRoZW5hYmxlLnRoZW4oc2F2ZURvbmUsIHNhdmVGYWlsZWQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNhdmVOb3RlYm9va0FzOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSkge1xuICAgICAgICAgICAgICBpZiAoXy5pc0VtcHR5KG5vdGVib29rVXJpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYW5ub3Qgc2F2ZSBub3RlYm9vaywgbm90ZWJvb2tVcmkgaXMgZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNhdmVTdGFydCgpO1xuICAgICAgICAgICAgICByZXR1cm4gc2F2ZVByb21wdElmT3ZlcndyaXRlKG5vdGVib29rVXJpLCB1cmlUeXBlKS50aGVuKHNhdmVEb25lLCBzYXZlRmFpbGVkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICBpZiAoYmtFdmFsdWF0ZUpvYk1hbmFnZXIuaXNBbnlJblByb2dyZXNzKCkgKSB7XG4gICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgICAgICBcIkFsbCBydW5uaW5nIGFuZCBwZW5kaW5nIGNlbGxzIHdpbGwgYmUgY2FuY2VsbGVkLlwiLFxuICAgICAgICAgICAgICAgICAgICBcIldhcm5pbmchXCIsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmNhbmNlbEFsbCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jbG9zZU5vdGVib29rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApOyB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgc2VsZi5fY2xvc2VOb3RlYm9vaygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9jbG9zZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICB2YXIgY2xvc2VTZXNzaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5jbG9zZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdvdG9Db250cm9sUGFuZWwoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgaWYgKGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va01vZGVsRWRpdGVkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rVGl0bGUgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rVGl0bGUoKTtcbiAgICAgICAgICAgICAgICBia0hlbHBlci5zaG93M0J1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgICAgICBcIkRvIHlvdSB3YW50IHRvIHNhdmUgXCIgKyBub3RlYm9va1RpdGxlICsgXCI/XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQ29uZmlybSBjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNhdmVOb3RlYm9vaygpLnRoZW4oY2xvc2VTZXNzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbG9zZSB3aXRob3V0IHNhdmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICBjbG9zZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCwgXCJTYXZlXCIsIFwiRG9uJ3Qgc2F2ZVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbGxhcHNlQWxsU2VjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBfLmVhY2godGhpcy5nZXROb3RlYm9va01vZGVsKCkuY2VsbHMsIGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC50eXBlID09IFwic2VjdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICBjZWxsLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNDb2RlQ2VsbDogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIC8vIHRvRXZhbCBjYW4gYmUgYSB0YWdOYW1lIChzdHJpbmcpLCBlaXRoZXIgXCJpbml0aWFsaXphdGlvblwiLCBuYW1lIG9mIGFuIGV2YWx1YXRvciBvciB1c2VyIGRlZmluZWQgdGFnXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbElEIChzdHJpbmcpXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbE1vZGVsXG4gICAgICAgICAgICAgIC8vIG9yIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b0V2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmhhc0NlbGwodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcih0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBzZWN0aW9uIGNlbGwgb3Igcm9vdCBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2VsbCwganVzdCBnZXQgdGhlIGNlbGwgbW9kZWwgZnJvbSBjZWxsSURcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSBcImluaXRpYWxpemF0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjZWxsT3AuaGFzVXNlclRhZyh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSB1c2VyIHRhZyBmb3IgYSBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoVXNlclRhZyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoRXZhbHVhdG9yKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IHVuZGVmaW5lZCB8fCAoXy5pc0FycmF5KHRvRXZhbCkgJiYgdG9FdmFsLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZhbHVhdGU6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICAvLyB0b0V2YWwgY2FuIGJlIGEgdGFnTmFtZSAoc3RyaW5nKSwgZWl0aGVyIFwiaW5pdGlhbGl6YXRpb25cIiwgbmFtZSBvZiBhbiBldmFsdWF0b3Igb3IgdXNlciBkZWZpbmVkIHRhZ1xuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxJRCAoc3RyaW5nKVxuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxNb2RlbFxuICAgICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9FdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5oYXNDZWxsKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldEFsbENvZGVDZWxscyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIGNlbGwsIGp1c3QgZ2V0IHRoZSBjZWxsIG1vZGVsIGZyb20gY2VsbElEXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIG5vdCBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBia1Nlc3Npb25NYW5hZ2VyLm5vdGVib29rTW9kZWxHZXRJbml0aWFsaXphdGlvbkNlbGxzKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgdXNlciB0YWcgZm9yIGEgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBpdCBpcyBhIGV2YWx1YXRvciBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aEV2YWx1YXRvcih0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSB1bmRlZmluZWQgfHwgKCFfLmlzQXJyYXkodG9FdmFsKSAmJiB0b0V2YWwubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFueXRoaW5nIHRvIGV2YWx1YXRlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNhbm5vdCBmaW5kIGFueXRoaW5nIHRvIGV2YWx1YXRlXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFfLmlzQXJyYXkodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlSm9iTWFuYWdlci5ldmFsdWF0ZSh0b0V2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlSm9iTWFuYWdlci5ldmFsdWF0ZUFsbCh0b0V2YWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZhbHVhdGVSb290OiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gdG9FdmFsIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsTW9kZWxcbiAgICAgICAgICAgICAgLy8gb3IgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvRXZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaGFzQ2VsbCh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHNlY3Rpb24gY2VsbCBvciByb290IGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRBbGxDb2RlQ2VsbHModG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbCh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBub3QgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IFwiaW5pdGlhbGl6YXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gYmtTZXNzaW9uTWFuYWdlci5ub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNlbGxPcC5oYXNVc2VyVGFnKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhVc2VyVGFnKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgaXQgaXMgYSBldmFsdWF0b3IgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc0FycmF5KHRvRXZhbCkgJiYgdG9FdmFsLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIkVSUk9SOiBjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGVSb290KHRvRXZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmV2YWx1YXRlUm9vdEFsbCh0b0V2YWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZhbHVhdGVDb2RlOiBmdW5jdGlvbihldmFsdWF0b3IsIGNvZGUpIHtcbiAgICAgICAgICAgICAgdmFyIG91dGNvbnRhaW5lciA9IHsgfTtcbiAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtIZWxwZXIubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgZXZhbENvZGVJZCsrO1xuICAgICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5ldmFsdWF0ZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFwib25UaGVGbHlDZWxsX1wiK2V2YWxDb2RlSWQsXG4gICAgICAgICAgICAgICAgZXZhbHVhdG9yOiBldmFsdWF0b3IsXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHsgYm9keTogY29kZSB9LFxuICAgICAgICAgICAgICAgIG91dHB1dDogb3V0Y29udGFpbmVyXG4gICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlc29sdmUob3V0Y29udGFpbmVyLnJlc3VsdCk7IH0sIGZ1bmN0aW9uKGVycikgeyBkZWZlcnJlZC5yZWplY3QoZXJyKTsgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZEV2YWx1YXRvcjogZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFkZEV2YWx1YXRvcihzZXR0aW5ncywgdHJ1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlRXZhbHVhdG9yOiBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLnJlbW92ZUV2YWx1YXRvcihwbHVnaW4pO1xuICAgICAgICAgICAgICBldmFsdWF0b3JNZW51SXRlbXMgPSBfLnJlamVjdChldmFsdWF0b3JNZW51SXRlbXMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lID09IHBsdWdpbjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0RXZhbHVhdG9yTWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRvck1lbnVJdGVtcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRCa05vdGVib29rV2lkZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2tXaWRnZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci50b2dnbGVOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBuYW1lcyBvZiBhbGwgZW5hYmxlZCBldmFsdWF0b3JzXG4gICAgICAgICAgICBnZXRFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGV2YWxzID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXZhbHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZhbHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgcmV0LnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXQgKGEgc3Vic2V0IG9mKSBjb2RlIGNlbGxzXG4gICAgICAgICAgICBnZXRDb2RlQ2VsbHM6IGZ1bmN0aW9uKGZpbHRlcikge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICAvLyBmaWx0ZXIgY2FuIGJlIGEgdGFnTmFtZSAoc3RyaW5nKSwgZWl0aGVyIFwiaW5pdGlhbGl6YXRpb25cIiwgbmFtZSBvZiBhbiBldmFsdWF0b3Igb3IgdXNlciBkZWZpbmVkIHRhZ1xuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxJRCAoc3RyaW5nKVxuICAgICAgICAgICAgICBpZiAoIWZpbHRlcikge1xuICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgY29kZSBjZWxsc1xuICAgICAgICAgICAgICAgIGZpbHRlciA9IGNlbGxPcC5nZXRBbGxDb2RlQ2VsbHMoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlsdGVyICE9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgZWxzZSBpZiAoY2VsbE9wLmhhc0NlbGwoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjZWxsSURcbiAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBzZWN0aW9uIGNlbGwgb3Igcm9vdCBjZWxsXG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNlbGxPcC5nZXRBbGxDb2RlQ2VsbHMoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIGNlbGwsIGp1c3QgZ2V0IHRoZSBjZWxsIG1vZGVsIGZyb20gY2VsbElEXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0Q2VsbChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBub3QgYSBjZWxsSURcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyID09PSBcImluaXRpYWxpemF0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYmtTZXNzaW9uTWFuYWdlci5ub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjZWxsT3AuaGFzVXNlclRhZyhmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgdXNlciB0YWcgZm9yIGEgY2VsbFxuICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoVXNlclRhZyhmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgaXQgaXMgYSBldmFsdWF0b3IgbmFtZSxcbiAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldENlbGxzV2l0aEV2YWx1YXRvcihmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgKCFfLmlzQXJyYXkoZmlsdGVyKSAmJiBmaWx0ZXIubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgICAgICAgaWYgKF8uaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDAgOyBpIDwgZmlsdGVyLmxlbmd0aCA7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgIHZhciBjZWxsID0gZmlsdGVyW2ldO1xuICAgICAgICAgICAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgICAgICAgICAgIG8uY2VsbElkID0gY2VsbC5pZDtcbiAgICAgICAgICAgICAgICAgIG8uZXZhbHVhdG9ySWQgPSBjZWxsLmV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgICAgIG8uY29kZSA9IGNlbGwuaW5wdXQuYm9keTtcbiAgICAgICAgICAgICAgICAgIG8udGFncyA9IGNlbGwudGFncztcbiAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmRhdGFyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGNlbGwuZGF0YXJlc3VsdDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbC5vdXRwdXQgIT09IHVuZGVmaW5lZCAmJiBjZWxsLm91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXQucmVzdWx0LnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLm91dHB1dC5yZXN1bHQudHlwZSA9PT0gJ0JlYWtlckRpc3BsYXknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGNlbGwub3V0cHV0LnJlc3VsdC5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0dHlwZSA9IGNlbGwub3V0cHV0LnJlc3VsdC50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gY2VsbC5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBvLnR5cGUgPSBcIkJlYWtlckNvZGVDZWxsXCI7XG4gICAgICAgICAgICAgICAgICByZXQucHVzaChvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHRtcENlbGwgPSB7fTtcbiAgICAgICAgICAgICAgICB0bXBDZWxsLmNlbGxJZCA9IGZpbHRlci5pZDtcbiAgICAgICAgICAgICAgICB0bXBDZWxsLmV2YWx1YXRvcklkID0gZmlsdGVyLmV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgICB0bXBDZWxsLmNvZGUgPSBmaWx0ZXIuaW5wdXQuYm9keTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmRhdGFyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgdG1wQ2VsbC5vdXRwdXQgPSBmaWx0ZXIuZGF0YXJlc3VsdDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5vdXRwdXQgIT09IHVuZGVmaW5lZCAmJiBmaWx0ZXIub3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm91dHB1dC5yZXN1bHQudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIub3V0cHV0LnJlc3VsdC50eXBlID09PSAnQmVha2VyRGlzcGxheScpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0bXBDZWxsLm91dHB1dCA9IGZpbHRlci5vdXRwdXQucmVzdWx0Lm9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB0bXBDZWxsLm91dHB1dHR5cGUgPSBmaWx0ZXIub3V0cHV0LnJlc3VsdC50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgIHRtcENlbGwub3V0cHV0ID0gZmlsdGVyLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcENlbGwub3V0cHV0ID0gZmlsdGVyLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRtcENlbGwudGFncyA9IGZpbHRlci50YWdzO1xuICAgICAgICAgICAgICAgIHRtcENlbGwudHlwZSA9IFwiQmVha2VyQ29kZUNlbGxcIjtcbiAgICAgICAgICAgICAgICByZXQucHVzaCh0bXBDZWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldCBhIGNvZGUgY2VsbCBib2R5XG4gICAgICAgICAgICBzZXRDb2RlQ2VsbEJvZHk6IGZ1bmN0aW9uKG5hbWUsIGNvZGUpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgaWYgKCFjZWxsT3AuaGFzQ2VsbChuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBpcyBub3QgY29kZSBjZWxsXCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsICA9IGNlbGxPcC5nZXRDZWxsKG5hbWUpO1xuICAgICAgICAgICAgICBpZiAoIGNlbGwuaW5wdXQgPT09IHVuZGVmaW5lZCB8fCBjZWxsLmlucHV0LmJvZHkgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBpcyBub3QgY29kZSBjZWxsXCI7XG4gICAgICAgICAgICAgIGNlbGwuaW5wdXQuYm9keSA9IGNvZGU7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldCBhIGNvZGUgY2VsbCBldmFsdWF0b3JcbiAgICAgICAgICAgIHNldENvZGVDZWxsRXZhbHVhdG9yOiBmdW5jdGlvbihuYW1lLCBldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgdmFyIGV2YWxzID0gdGhpcy5nZXRFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgICAgIGlmICggZXZhbHMuaW5kZXhPZihldmFsdWF0b3IpPT0tMSApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGV2YWx1YXRvciBcIitldmFsdWF0b3IrXCIgZG9lcyBub3QgZXhpc3RcIjtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgaWYgKCFjZWxsT3AuaGFzQ2VsbChuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBpcyBub3QgY29kZSBjZWxsXCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsICA9IGNlbGxPcC5nZXRDZWxsKG5hbWUpO1xuICAgICAgICAgICAgICBpZiAoIGNlbGwuaW5wdXQgPT09IHVuZGVmaW5lZCB8fCBjZWxsLmlucHV0LmJvZHkgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBpcyBub3QgY29kZSBjZWxsXCI7XG4gICAgICAgICAgICAgIGNlbGwuZXZhbHVhdG9yID0gZXZhbHVhdG9yO1xuICAgICAgICAgICAgICBjZWxsT3AucmVidWlsZE1hcHMoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0IGEgY29kZSBjZWxsIHRhZ3NcbiAgICAgICAgICAgIHNldENvZGVDZWxsVGFnczogZnVuY3Rpb24obmFtZSwgdGFncykge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICBpZiAoIWNlbGxPcC5oYXNDZWxsKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgZG9lcyBub3QgZXhpc3RcIjtcbiAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcihuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGlzIG5vdCBjb2RlIGNlbGxcIjtcbiAgICAgICAgICAgICAgdmFyIGNlbGwgID0gY2VsbE9wLmdldENlbGwobmFtZSk7XG4gICAgICAgICAgICAgIGNlbGwudGFncyA9IHRhZ3M7XG4gICAgICAgICAgICAgIGNlbGxPcC5yZWJ1aWxkTWFwcygpO1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuICAgICAgICBia0NvcmVNYW5hZ2VyLnNldEJrQXBwSW1wbChfaW1wbCk7XG5cbiAgICAgICAgdmFyIHNldERvY3VtZW50VGl0bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZWRpdGVkID0gJHNjb3BlLmlzRWRpdGVkKCksXG4gICAgICAgICAgICAgIGZpbGVuYW1lID0gJHNjb3BlLmZpbGVuYW1lKCksXG4gICAgICAgICAgICAgIHRpdGxlO1xuXG4gICAgICAgICAgdGl0bGUgPSBmaWxlbmFtZTtcbiAgICAgICAgICBpZiAoZWRpdGVkKSB0aXRsZSA9ICcqJyArIHRpdGxlO1xuXG4gICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFZGl0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTW9kZWxFZGl0ZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNFZGl0ZWQoKScsIGZ1bmN0aW9uKGVkaXRlZCwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAoZWRpdGVkID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgICAgICAgIHNldERvY3VtZW50VGl0bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2ZpbGVuYW1lKCknLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgPT09IG9sZFZhbCkgcmV0dXJuO1xuICAgICAgICAgIHNldERvY3VtZW50VGl0bGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGludGVydmFsSUQgPSBudWxsO1xuICAgICAgICB2YXIgc3RvcEF1dG9CYWNrdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoaW50ZXJ2YWxJRCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW50ZXJ2YWxJRCA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzdGFydEF1dG9CYWNrdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzdG9wQXV0b0JhY2t1cCgpO1xuICAgICAgICAgIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbChia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCwgNjAgKiAxMDAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldE1lbnVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGtleWRvd25IYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmIChlLndoaWNoID09PSA4MykpIHsgLy8gQ3RybCArIHNcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIF9pbXBsLnNhdmVOb3RlYm9vaygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmIChlLndoaWNoID09PSA4MykpIHsgLy8gQ21kICsgc1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgX2ltcGwuc2F2ZU5vdGVib29rKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5ub2RlTmFtZSAhPT0gXCJURVhUQVJFQVwiKSB7XG4gICAgICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUud2hpY2ggPT09IDkwKSB7IC8vIEN0cmwgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci51bmRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gOTApKSB7IC8vIENtZCArIHpcbiAgICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnVuZG8oKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jdHJsS2V5ICYmIGUud2hpY2ggPT09IDg5KSB7IC8vIEN0cmwgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5yZWRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gODkpKSB7IC8vIENtZCArIHpcbiAgICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnJlZG8oKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPRE8gaW1wbGVtZW50IGdsb2JhbCByZWRvXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuICAgICAgICB2YXIgb25EZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAoKTtcbiAgICAgICAgICBzdG9wQXV0b0JhY2t1cCgpO1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2V0QmtBcHBJbXBsKG51bGwpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLnVuYmluZCgna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcbiAgICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBudWxsO1xuICAgICAgICAgIGJrVXRpbHMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgb25EZXN0cm95KTtcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwKCk7XG4gICAgICAgICAgaWYgKGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va01vZGVsRWRpdGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdXIgbm90ZWJvb2sgaGFzIGJlZW4gZWRpdGVkIGJ1dCBub3Qgc2F2ZWQsIGlmIHlvdSBjbG9zZSB0aGUgcGFnZSB5b3VyIGNoYW5nZXMgbWF5IGJlIGxvc3RcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmlzQW55SW5Qcm9ncmVzcygpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJTb21lIGNlbGxzIGFyZSBzdGlsbCBydW5uaW5nLiBMZWF2aW5nIHRoZSBwYWdlIG5vdyB3aWxsIGNhdXNlIGNhbmNlbGxpbmcgYW5kIHJlc3VsdCBiZSBsb3N0XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uRGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cub251bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5jYW5jZWwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3RhcnRBdXRvQmFja3VwKCk7XG4gICAgICAgICRzY29wZS5nb3RvQ29udHJvbFBhbmVsID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoYmtVdGlscy5pc01pZGRsZUNsaWNrKGV2ZW50KSkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oXCIuL1wiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5maWxlbmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rVGl0bGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJG9uKFwiJGxvY2F0aW9uQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAoYmtFdmFsdWF0ZUpvYk1hbmFnZXIuaXNBbnlJblByb2dyZXNzKCkgJiYgbmV4dC5pbmRleE9mKFwiZm9yY2U9eWVzXCIpID09PSAtMSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIkFsbCBydW5uaW5nIGFuZCBwZW5kaW5nIGNlbGxzIHdpbGwgYmUgY2FuY2VsbGVkLlwiLFxuICAgICAgICAgICAgICAgIFwiV2FybmluZyFcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmNhbmNlbEFsbCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdXRlUGFyYW1zID0ge2ZvcmNlOiBcInllc1wifTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BsaXRzID0gZGVjb2RlVVJJQ29tcG9uZW50KG5leHQuc3BsaXQoXCIjXCIpWzFdKS5zcGxpdChcIj9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBzcGxpdHNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaCA9IHNwbGl0c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFycyA9IHNlYXJjaC5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFpciA9IHYuc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVQYXJhbXNbcGFpclswXV0gPSBwYWlyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKHBhdGgpLnNlYXJjaChyb3V0ZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5wcm9tcHRUb1NhdmUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHByb21wdGVkID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHByb21wdGVkKSB7IC8vIHByZXZlbnQgcHJvbXB0aW5nIG11bHRpcGxlIGF0IHRoZSBzYW1lIHRpbWVcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvbXB0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiQmVha2VyIHNlcnZlciBkaXNjb25uZWN0ZWQuIEZ1cnRoZXIgZWRpdHMgd2lsbCBub3QgYmUgc2F2ZWQuPGJyPlwiICtcbiAgICAgICAgICAgICAgICBcIlNhdmUgY3VycmVudCBub3RlYm9vayBhcyBhIGZpbGU/XCIsXG4gICAgICAgICAgICAgICAgXCJEaXNjb25uZWN0ZWRcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFwiU2F2ZVwiLCBzYXZlIHRoZSBub3RlYm9vayBhcyBhIGZpbGUgb24gdGhlIGNsaWVudCBzaWRlXG4gICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtVdGlscy5zYXZlQXNDbGllbnRGaWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5nZXRTYXZlRGF0YSgpLm5vdGVib29rTW9kZWxBc1N0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgXCJub3RlYm9vay5ia3JcIik7XG4gICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgLy8gXCJOb3Qgbm93XCIsIGhpamFjayBhbGwga2V5cHJlc3MgZXZlbnRzIHRvIHByb21wdCBhZ2FpblxuICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgJHNjb3BlLnByb21wdFRvU2F2ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIlNhdmVcIiwgXCJOb3Qgbm93XCIsIFwiYnRuLXByaW1hcnlcIiwgXCJcIlxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwcm9tcHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICB2YXIgY29ubmVjdGlvbk1hbmFnZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIFJFQ09OTkVDVF9USU1FT1VUID0gNTAwMDsgLy8gNSBzZWNvbmRzXG4gICAgICAgICAgdmFyIE9GRkxJTkVfTUVTU0FHRSA9IFwib2ZmbGluZVwiO1xuICAgICAgICAgIHZhciBDT05ORUNUSU5HX01FU1NBR0UgPSBcInJlY29ubmVjdGluZ1wiO1xuICAgICAgICAgIHZhciByZWNvbm5lY3RUaW1lb3V0O1xuICAgICAgICAgIHZhciBzdGF0dXNNZXNzYWdlID0gT0ZGTElORV9NRVNTQUdFO1xuICAgICAgICAgIHZhciBkaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3BXYWl0aW5nUmVjb25uZWN0KCk7XG4gICAgICAgICAgICBzdGF0dXNNZXNzYWdlID0gT0ZGTElORV9NRVNTQUdFO1xuICAgICAgICAgICAgYmtVdGlscy5kaXNjb25uZWN0KCk7IC8vIHByZXZlbnQgZnVydGhlciBhdHRlbXB0aW5nIHRvIHJlY29ubmVjdFxuICAgICAgICAgICAgJHNjb3BlLnByb21wdFRvU2F2ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIHdhaXRSZWNvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0YXR1c01lc3NhZ2UgPSBDT05ORUNUSU5HX01FU1NBR0U7XG5cbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIDUgc2Nlb25kcywgaWYgcmVjb25uZWN0IGRpZG4ndCBoYXBwZW4sIHByb21wdCB0byBzYXZlXG4gICAgICAgICAgICBpZiAoIXJlY29ubmVjdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgcmVjb25uZWN0VGltZW91dCA9ICR0aW1lb3V0KGluZGljYXRlUmVjb25uZWN0RmFpbGVkLCBSRUNPTk5FQ1RfVElNRU9VVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiB1c2VyIGF0dGVtcHRzIHRvIGludGVyYWN0IHdpdGhpbiA1IHNlY29uZCwgYWxzbyBwcm9tcHQgdG8gc2F2ZVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQsIHRydWUpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIHN0b3BXYWl0aW5nUmVjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVjb25uZWN0VGltZW91dCkge1xuICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwocmVjb25uZWN0VGltZW91dCk7XG4gICAgICAgICAgICAgIHJlY29ubmVjdFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBpbmRpY2F0ZVJlY29ubmVjdEZhaWxlZCwgdHJ1ZSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHdhaXRSZWNvbm5lY3QoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblJlY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5pc1Nlc3Npb25WYWxpZCgpLnRoZW4oZnVuY3Rpb24oaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICBzdG9wV2FpdGluZ1JlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnJlY29ubmVjdEV2YWx1YXRvcnMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFN0YXR1c01lc3NhZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gc3RhdHVzTWVzc2FnZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0Rpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkaXNjb25uZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICAkc2NvcGUuZ2V0T2ZmaW5lTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uTWFuYWdlci5nZXRTdGF0dXNNZXNzYWdlKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc0Rpc2Nvbm5lY3RlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uTWFuYWdlci5pc0Rpc2Nvbm5lY3RlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJrVXRpbHMuYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgaWYgKG1zZy5zdWNjZXNzZnVsID09PSAkc2NvcGUuaXNEaXNjb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdmFyIGRpc2Nvbm5lY3RlZCA9ICFtc2cuc3VjY2Vzc2Z1bDtcbiAgICAgICAgICAgIGlmIChkaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgY29ubmVjdGlvbk1hbmFnZXIub25EaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbm5lY3Rpb25NYW5hZ2VyLm9uUmVjb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNEaXNjb25uZWN0ZWQoKScsIGZ1bmN0aW9uKGRpc2Nvbm5lY3RlZCkge1xuICAgICAgICAgIGlmIChkaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHN0b3BBdXRvQmFja3VwKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0QXV0b0JhY2t1cCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0RG9jdW1lbnRUaXRsZSgpO1xuXG4gICAgICAgIC8vIGVuc3VyZSBhbiBleGlzdGluZyBzZXNzaW9uIGlzIGNsZWFyZWQgc28gdGhhdCB0aGUgZW1wdHkgbm90ZWJvb2sgbW9kZWxcbiAgICAgICAgLy8gbWFrZXMgdGhlIFVJIGlzIGJsYW5rIGltbWVkaWF0ZWx5IChpbnN0ZWFkIG9mIHNob3dpbmcgbGVmdG92ZXIgZnJvbSBhIHByZXZpb3VzIHNlc3Npb24pXG4gICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xlYXIoKTtcblxuICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoJy4uL2JlYWtlci9yZXN0L3V0aWwvZ2V0TWVudVBsdWdpbnMnKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1lbnVVcmxzKSB7XG4gICAgICAgICAgICBtZW51VXJscy5mb3JFYWNoKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmxvYWRNZW51UGx1Z2luKHVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWVudWVzID0gd2luZG93LmJlYWtlci5nZXRNZW51SXRlbXMoKTtcbiAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmF0dGFjaE1lbnVzKG1lbnVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIucmVzZXQoKTtcbiAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIucmVzZXQoKTtcblxuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gSWYgdGhlcmUncyBhIG5vdGVib29rLXVyaSBvciBzZXNzaW9uLWlkIHBhc3NlZCBpbnRvIHRoZSBzY29wZVxuICAgICAgICAgIC8vIChtb3N0bHkgZW1iZWRkZWQgYmVha2VyKSwgc2hvcnQgY2lyY3VpdCByZWFkaW5nIG9mIHRoZSByb3V0ZXNcbiAgICAgICAgICAvLyB0byBkZXRlcm1pbmUgdGhlIHRhcmdldC9zZXNzaW9uLlxuICAgICAgICAgIGlmICgkc2NvcGUubm90ZWJvb2tVcmkpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2FkTm90ZWJvb2sub3BlblVyaSh7XG4gICAgICAgICAgICAgIHVyaTogJHNjb3BlLm5vdGVib29rVXJpLFxuICAgICAgICAgICAgICB0eXBlOiAkc2NvcGUubm90ZWJvb2tSZXF1ZXN0VHlwZSxcbiAgICAgICAgICAgICAgZm9ybWF0OiAkc2NvcGUubm90ZWJvb2tGb3JtYXQsXG4gICAgICAgICAgICAgIHJlYWRPbmx5OiAkc2NvcGUucmVhZE9ubHlcbiAgICAgICAgICAgIH0sICRzY29wZS5zZXNzaW9uSWQsIHRydWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnNlc3Npb25JZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvYWROb3RlYm9vay5mcm9tU2Vzc2lvbigkc2NvcGUuc2Vzc2lvbklkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2Vzc2lvbklkID0gJHJvdXRlUGFyYW1zLnNlc3Npb25JZDtcbiAgICAgICAgICB2YXIgc2Vzc2lvblJvdXRlUmVzb2x2ZSA9ICRyb3V0ZS5jdXJyZW50LiQkcm91dGUucmVzb2x2ZTtcbiAgICAgICAgICB2YXIgbmV3U2Vzc2lvbiA9ICRyb3V0ZS5jdXJyZW50LmxvY2Fscy5pc05ld1Nlc3Npb247XG5cbiAgICAgICAgICBpZiAobmV3U2Vzc2lvbikge1xuICAgICAgICAgICAgZGVsZXRlIHNlc3Npb25Sb3V0ZVJlc29sdmUuaXNOZXdTZXNzaW9uO1xuICAgICAgICAgICAgaWYgKG5ld1Nlc3Npb24gPT09IFwibmV3XCIpIHtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rLmRlZmF1bHROb3RlYm9vayhzZXNzaW9uSWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rLmVtcHR5Tm90ZWJvb2soc2Vzc2lvbklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCRyb3V0ZS5jdXJyZW50LmxvY2Fscy5pc0ltcG9ydCkge1xuICAgICAgICAgICAgZGVsZXRlIHNlc3Npb25Sb3V0ZVJlc29sdmUuaXNJbXBvcnQ7XG4gICAgICAgICAgICBsb2FkTm90ZWJvb2suZnJvbUltcG9ydChzZXNzaW9uSWQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJHJvdXRlLmN1cnJlbnQubG9jYWxzLmlzT3Blbikge1xuICAgICAgICAgICAgZGVsZXRlIHNlc3Npb25Sb3V0ZVJlc29sdmUuaXNPcGVuO1xuICAgICAgICAgICAgZGVsZXRlIHNlc3Npb25Sb3V0ZVJlc29sdmUudGFyZ2V0O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRyb3V0ZS5jdXJyZW50LmxvY2Fscy50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgcmV0cnkgPSB0cnVlO1xuICAgICAgICAgICAgbG9hZE5vdGVib29rLm9wZW5VcmkodGFyZ2V0LCBzZXNzaW9uSWQsIHJldHJ5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hZE5vdGVib29rLmZyb21TZXNzaW9uKHNlc3Npb25JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ldmFsdWF0ZUpvYk1hbmFnZXInLCBbJ2JrLnV0aWxzJywgJ2JrLmV2YWx1YXRvck1hbmFnZXInXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdia0V2YWx1YXRlSm9iTWFuYWdlcicsIGZ1bmN0aW9uKGJrVXRpbHMsIGJrRXZhbHVhdG9yTWFuYWdlciwgJHRpbWVvdXQpIHtcblxuICAgIHZhciBvdXRwdXRNYXAgPSB7IH07XG5cbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgaW5uZXJ0eXBlOiBcIkVycm9yXCIsXG4gICAgICAgIG9iamVjdDogbXNnXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHRleHRNZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgaW5uZXJ0eXBlOiBcIlRleHRcIixcbiAgICAgICAgb2JqZWN0OiBtc2dcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgRVJST1JfTUVTU0FHRV9PTl9FQVJMSUVSX0ZBSUxVUkUgPVxuICAgICAgZXJyb3JNZXNzYWdlKFwiRXZhbHVhdGlvbiBjYW5jZWxsZWQgZHVlIHRvIGEgZmFpbHVyZSBvZiBhbiBlYXJsaWVyIGNlbGwgZXZhbHVhdGlvblwiKTtcbiAgICB2YXIgRVJST1JfTUVTU0FHRV9PTl9DQU5DRUwgPVxuICAgICAgZXJyb3JNZXNzYWdlKFwiLi4uIGNhbmNlbGxlZCFcIik7XG4gICAgdmFyIE1FU1NBR0VfUEVORElORyA9XG4gICAgICB0ZXh0TWVzc2FnZShcInBlbmRpbmdcIik7XG4gICAgdmFyIE1FU1NBR0VfV0FJVElOR19GT1JfRVZBTFVUT1JfSU5JVCA9XG4gICAgICB0ZXh0TWVzc2FnZShcIndhaXRpbmcgZm9yIGV2YWx1YXRvciBpbml0aWFsaXphdGlvbiAuLi5cIik7XG5cbiAgICB2YXIgam9iUXVldWUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBfcXVldWUgPSBbXTtcbiAgICAgIHZhciBfam9iSW5Qcm9ncmVzcyA9IFtdO1xuICAgICAgdmFyIHJ1bm5pbmcgPSB7fTtcblxuICAgICAgdmFyIGV2YWx1YXRlSm9iID0gZnVuY3Rpb24oam9iKSB7XG4gICAgICAgIGpvYi5ldmFsdWF0b3IgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0RXZhbHVhdG9yKGpvYi5ldmFsdWF0b3JJZCk7XG4gICAgICAgIGlmIChqb2IuZXZhbHVhdG9yKSB7XG4gICAgICAgICAgYmtVdGlscy5sb2coXCJldmFsdWF0ZVwiLCB7XG4gICAgICAgICAgICBwbHVnaW46IGpvYi5ldmFsdWF0b3IucGx1Z2luTmFtZSxcbiAgICAgICAgICAgIGxlbmd0aDogam9iLmNvZGUubGVuZ3RoIH0pO1xuICAgICAgICAgIHJldHVybiBqb2IuZXZhbHVhdG9yLmV2YWx1YXRlKGpvYi5jb2RlLCBqb2Iub3V0cHV0LCBvdXRwdXRNYXBbam9iLmNlbGxJZF0pO1xuICAgICAgICB9XG4gICAgICAgIGpvYi5vdXRwdXQucmVzdWx0ID0gTUVTU0FHRV9XQUlUSU5HX0ZPUl9FVkFMVVRPUl9JTklUO1xuICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLndhaXRFdmFsdWF0b3Ioam9iLmV2YWx1YXRvcklkKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICBqb2IuZXZhbHVhdG9yID0gZXY7XG4gICAgICAgICAgICBpZiAoZXYgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgcmV0dXJuIGpvYi5ldmFsdWF0b3IuZXZhbHVhdGUoam9iLmNvZGUsIGpvYi5vdXRwdXQsIG91dHB1dE1hcFtqb2IuY2VsbElkXSk7XG4gICAgICAgICAgICByZXR1cm4gXCJjYW5ub3QgZmluZCBldmFsdWF0b3IgZm9yIFwiK2pvYi5ldmFsdWF0b3JJZDtcbiAgICAgICAgICB9ICk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZG9OZXh0ID0gZnVuY3Rpb24oaW5uZXh0KSB7XG4gICAgICAgIHZhciBqb2I7XG5cbiAgICAgICAgaWYgKF9qb2JJblByb2dyZXNzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgLy8gc3RhcnQgYSBuZXcgcm9vdCBqb2JcbiAgICAgICAgICBqb2IgPSBfcXVldWUuc2hpZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSBoYXZlIHNvbWV0aGluZyBleGVjdXRpbmcuLi5cbiAgICAgICAgICB2YXIgbGFzdCA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0xXTtcbiAgICAgICAgICBpZiAobGFzdC5ydW5jaGlsZCAhPT0gdW5kZWZpbmVkICYmIGxhc3QucnVuY2hpbGQuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIGxhc3QucnVuY2hpbGQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsYXN0LmZpbmlzaGVkICYmIGxhc3QuY2FuY2VsX2RlZmVycmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQsIGlkeDtcbiAgICAgICAgICAgIC8vIHRoaXMgam9iIGhhcyBmaW5pc2hlZCBidXQgZHVlIHRvIGNhbmNlbGxhdGlvblxuICAgICAgICAgICAgaWYgKF9qb2JJblByb2dyZXNzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHBhcmVudCBqb2IgdG8gY2FuY2VsXG4gICAgICAgICAgICAgIHBhcmVudCA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0yXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHBhcmVudC5jYW5jZWxfZGVmZXJyZWQgPSBsYXN0LmNhbmNlbF9kZWZlcnJlZDtcbiAgICAgICAgICAgICAgaWYgKHBhcmVudC5ldmFsdWF0b3IgJiYgcGFyZW50LmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24pIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8cGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW5baWR4XS5vdXRwdXQucmVzdWx0PUVSUk9SX01FU1NBR0VfT05fQ0FOQ0VMO1xuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpZHhdLndoZW5kb25lLnJlamVjdCgnLi4uIGNhbmNlbGxlZCEnKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcnVubmluZ1twYXJlbnQuY2hpbGRyZW5baWR4XS5jZWxsSWRdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9yKGlkeCA9IDA7IGlkeDxfcXVldWUubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIF9xdWV1ZVtpZHhdLm91dHB1dC5yZXN1bHQ9RVJST1JfTUVTU0FHRV9PTl9DQU5DRUw7XG4gICAgICAgICAgICAgICAgX3F1ZXVlW2lkeF0ud2hlbmRvbmUucmVqZWN0KCcuLi4gY2FuY2VsbGVkIScpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW19xdWV1ZVtpZHhdLmNlbGxJZF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgX3F1ZXVlID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0LndoZW5kb25lLnJlamVjdCgnLi4uIGNhbmNlbGxlZCEnKTtcbiAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW2xhc3QuY2VsbElkXTtcbiAgICAgICAgICAgIF9qb2JJblByb2dyZXNzLnBvcCgpO1xuICAgICAgICAgICAgYmtIZWxwZXIuY2xlYXJTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgbGFzdC5ldmFsdWF0b3JJZCArIFwiIGNlbGwgXCIgKyBsYXN0LmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvd1N0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBwYXJlbnQuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgcGFyZW50LmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsYXN0LmNhbmNlbF9kZWZlcnJlZC5yZXNvbHZlKCdkb25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb05leHQodHJ1ZSk7XG4gICAgICAgICAgICBpZiAoaW5uZXh0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIGJrSGVscGVyLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChsYXN0LnJ1bmNoaWxkID09PSB1bmRlZmluZWQgJiYgbGFzdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBjYW4gc3RhcnQgYSBjaGlsZHJlblxuICAgICAgICAgICAgam9iID0gbGFzdC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGxhc3QuY2hpbGRyZW4uc2hpZnQoKTtcbiAgICAgICAgICAgIGxhc3QucnVuY2hpbGQgPSBqb2I7XG4gICAgICAgICAgfSBlbHNlIGlmIChsYXN0LmZpbmlzaGVkICYmIGxhc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGhhcyBmaW5pc2hlZFxuICAgICAgICAgICAgaWYgKGxhc3QuZXJyb3IpIHtcbiAgICAgICAgICAgICAgbGFzdC53aGVuZG9uZS5yZWplY3QobGFzdC5lcnJvcik7XG4gICAgICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHBhcmVudCBqb2IgdG8gY2FuY2VsXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0yXTtcblxuICAgICAgICAgICAgICAgIHZhciBpZHg7XG4gICAgICAgICAgICAgICAgZm9yKGlkeCA9IDA7IGlkeDxwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2lkeF0ub3V0cHV0LnJlc3VsdD1FUlJPUl9NRVNTQUdFX09OX0VBUkxJRVJfRkFJTFVSRTtcbiAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpZHhdLndoZW5kb25lLnJlamVjdChcIkV2YWx1YXRpb24gY2FuY2VsbGVkIGR1ZSB0byBhIGZhaWx1cmUgb2YgYW4gZWFybGllciBjZWxsIGV2YWx1YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgcnVubmluZ1twYXJlbnQuY2hpbGRyZW5baWR4XS5jZWxsSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaWR4O1xuICAgICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8X3F1ZXVlLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgIF9xdWV1ZVtpZHhdLm91dHB1dC5yZXN1bHQ9RVJST1JfTUVTU0FHRV9PTl9FQVJMSUVSX0ZBSUxVUkU7XG4gICAgICAgICAgICAgICAgICBfcXVldWVbaWR4XS53aGVuZG9uZS5yZWplY3QoXCJFdmFsdWF0aW9uIGNhbmNlbGxlZCBkdWUgdG8gYSBmYWlsdXJlIG9mIGFuIGVhcmxpZXIgY2VsbCBldmFsdWF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbX3F1ZXVlW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3F1ZXVlID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICBsYXN0LndoZW5kb25lLnJlc29sdmUobGFzdC5vdXRwdXQpO1xuICAgICAgICAgICAgYmtIZWxwZXIuY2xlYXJTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgbGFzdC5ldmFsdWF0b3JJZCArIFwiIGNlbGwgXCIgKyBsYXN0LmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICBkZWxldGUgcnVubmluZ1tsYXN0LmNlbGxJZF07XG4gICAgICAgICAgICBfam9iSW5Qcm9ncmVzcy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGpvYiA9IF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0xXTtcbiAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvd1N0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBqb2IuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgam9iLmNlbGxJZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb05leHQodHJ1ZSk7XG4gICAgICAgICAgICBpZiAoaW5uZXh0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIGJrSGVscGVyLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChqb2IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkgeyBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7IH0sIDApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9qb2JJblByb2dyZXNzLnB1c2goam9iKTtcbiAgICAgICAgYmtIZWxwZXIuc2hvd1N0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBqb2IuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgam9iLmNlbGxJZCwgdHJ1ZSk7XG5cbiAgICAgICAgZXZhbHVhdGVKb2Ioam9iKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgam9iLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICBqb2Iub3V0cHV0ID0gZGF0YTtcbiAgICAgICAgICBkb05leHQoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgam9iLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICBqb2IuZXJyb3IgPSBlcnI7XG4gICAgICAgICAgZG9OZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5uZXh0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgYmtIZWxwZXIudXBkYXRlU3RhdHVzKCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKGpvYikge1xuICAgICAgICAgIHJ1bm5pbmdbam9iLmNlbGxJZF0gPSB0cnVlO1xuICAgICAgICAgIF9xdWV1ZS5wdXNoKGpvYik7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbihqb2IsIGNoaWxkKSB7XG4gICAgICAgICAgcnVubmluZ1tjaGlsZC5jZWxsSWRdID0gdHJ1ZTtcbiAgICAgICAgICBqb2IuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEN1cnJlbnRKb2I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmV0dXJuIF9qb2JJblByb2dyZXNzW19qb2JJblByb2dyZXNzLmxlbmd0aC0xXTtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWxBbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBpZHg7XG4gICAgICAgICAgZm9yICggaWR4PTA7IGlkeDxfcXVldWUubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgX3F1ZXVlW2lkeF0ub3V0cHV0Lm91dHB1dC5yZXN1bHQgPSBFUlJPUl9NRVNTQUdFX09OX0NBTkNFTDtcbiAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW19xdWV1ZVtpZHhdLmNlbGxJZF07XG4gICAgICAgICAgfVxuICAgICAgICAgIF9xdWV1ZSA9IFtdO1xuICAgICAgICB9LFxuICAgICAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICByZXR1cm4gcnVubmluZ1tuXSA9PT0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtVdGlscy5mY2FsbChkb05leHQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gZXZhbHVhdGUgYSBjZWxsIChhcyBhIHN1YmNlbGwgb2YgY3VycmVudGx5IHJ1bm5pbmcgY2VsbClcbiAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbihjZWxsLCBub3RpY2spIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgaWYgKHBhcmVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHJldHVybiB0aGlzLmV2YWx1YXRlUm9vdChjZWxsKTtcblxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGlmIChqb2JRdWV1ZS5pc1J1bm5pbmcoY2VsbC5pZCkpIHtcbiAgICAgICAgICBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzKFwiRVJST1I6IHJlc3RhcnQgYmxvY2tlZCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICAvLyBwcmV2ZW50IHNlbGYgcmVzdGFydFxuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLm91dHB1dC5yZXN1bHQgPSBNRVNTQUdFX1BFTkRJTkc7XG4gICAgICAgIGlmICghY2VsbC5vdXRwdXQpIHtcbiAgICAgICAgICBjZWxsLm91dHB1dCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmFsSm9iID0ge1xuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIGNlbGxJZDogY2VsbC5pZCxcbiAgICAgICAgICBldmFsdWF0b3JJZDogY2VsbC5ldmFsdWF0b3IsXG4gICAgICAgICAgY29kZTogY2VsbC5pbnB1dC5ib2R5LFxuICAgICAgICAgIG91dHB1dDogY2VsbC5vdXRwdXQsXG4gICAgICAgICAgcmV0cnk6IDAsXG4gICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgIHJ1bmNoaWxkOiB1bmRlZmluZWQsXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgIHdoZW5kb25lIDogZGVmZXJyZWRcbiAgICAgICAgfTtcbiAgICAgICAgam9iUXVldWUuYWRkQ2hpbGRyZW4ocGFyZW50LGV2YWxKb2IpO1xuICAgICAgICBpZiAobm90aWNrID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICAvLyBldmFsdWF0ZSBhIGNlbGwgaW4gdG9wIGxldmVsIGNvbnRleHRcbiAgICAgIGV2YWx1YXRlUm9vdDogZnVuY3Rpb24oY2VsbCwgbm90aWNrKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgaWYgKGpvYlF1ZXVlLmlzUnVubmluZyhjZWxsLmlkKSkge1xuICAgICAgICAgIGJrSGVscGVyLnNob3dUcmFuc2llbnRTdGF0dXMoXCJFUlJPUjogcmVzdGFydCBibG9ja2VkIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVEFSVCBQUk9ISUJJVEVEIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIC8vIHByZXZlbnQgc2VsZiByZXN0YXJ0XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiUkVTVEFSVCBQUk9ISUJJVEVEIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGNlbGwub3V0cHV0LnJlc3VsdCA9IE1FU1NBR0VfUEVORElORztcbiAgICAgICAgaWYgKCFjZWxsLm91dHB1dCkge1xuICAgICAgICAgIGNlbGwub3V0cHV0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2YWxKb2IgPSB7XG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgY2VsbElkOiBjZWxsLmlkLFxuICAgICAgICAgIGV2YWx1YXRvcklkOiBjZWxsLmV2YWx1YXRvcixcbiAgICAgICAgICBjb2RlOiBjZWxsLmlucHV0LmJvZHksXG4gICAgICAgICAgb3V0cHV0OiBjZWxsLm91dHB1dCxcbiAgICAgICAgICByZXRyeTogMCxcbiAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgICAgcnVuY2hpbGQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgd2hlbmRvbmUgOiBkZWZlcnJlZFxuICAgICAgICB9O1xuICAgICAgICBqb2JRdWV1ZS5hZGQoZXZhbEpvYik7XG4gICAgICAgIGlmIChub3RpY2sgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBqb2JRdWV1ZS50aWNrKCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIC8vIGV2YWx1YXRlIGEgY2VsbCAoYXMgYSBzdWJjZWxsIG9mIGN1cnJlbnRseSBydW5uaW5nIGNlbGwpXG4gICAgICBldmFsdWF0ZUFsbDogZnVuY3Rpb24oY2VsbHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvbWlzZXMgPSBfKGNlbGxzKS5tYXAoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmV2YWx1YXRlKGNlbGwsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gYmtVdGlscy5hbGwocHJvbWlzZXMpO1xuICAgICAgfSxcbiAgICAgIC8vIGV2YWx1YXRlIGFsbCBjZWxscyBpbiB0b3AgbGV2ZWwgY29udGV4dFxuICAgICAgZXZhbHVhdGVSb290QWxsOiBmdW5jdGlvbihjZWxscywgcGFyZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHByb21pc2VzID0gXyhjZWxscykubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5ldmFsdWF0ZVJvb3QoY2VsbCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBqb2JRdWV1ZS50aWNrKCk7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmFsbChwcm9taXNlcyk7XG4gICAgICB9LFxuICAgICAgaXNDYW5jZWxsYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyZW50Sm9iID0gam9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgICByZXR1cm4gISEoY3VycmVudEpvYiAmJiBjdXJyZW50Sm9iLmV2YWx1YXRvciAmJiBjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24pO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyZW50Sm9iID0gam9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRKb2IgJiYgY3VycmVudEpvYi5ldmFsdWF0b3IpIHtcbiAgICAgICAgICBpZiAoY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50Sm9iLmNhbmNlbF9kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgICAgICAgICAgY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxBbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VycmVudEpvYiA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuXG4gICAgICAgIGpvYlF1ZXVlLmNhbmNlbEFsbCgpO1xuXG4gICAgICAgIGlmIChjdXJyZW50Sm9iICYmIGN1cnJlbnRKb2IuZXZhbHVhdG9yKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbikge1xuICAgICAgICAgICAgY3VycmVudEpvYi5jYW5jZWxfZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgICAgIGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgaXNBbnlJblByb2dyZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEham9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgfSxcbiAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxBbGwoKTtcbiAgICAgIH0sXG4gICAgICByZWdpc3Rlck91dHB1dENlbGw6IGZ1bmN0aW9uKGlkLCBvdXQpIHtcbiAgICAgICAgb3V0cHV0TWFwW2lkXSA9IG91dDtcbiAgICAgIH0sXG4gICAgICBkZVJlZ2lzdGVyT3V0cHV0Q2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgZGVsZXRlIG91dHB1dE1hcFtpZF07XG4gICAgICB9LFxuICAgICAgZ2V0T3V0cHV0Q2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dE1hcFtpZF07XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ldmFsdWF0b3JQbHVnaW5NYW5hZ2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmV2YWx1YXRvck1hbmFnZXInLCBbJ2JrLnV0aWxzJywgJ2JrLmV2YWx1YXRlUGx1Z2luTWFuYWdlciddKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnYmtFdmFsdWF0b3JNYW5hZ2VyJywgZnVuY3Rpb24gKGJrVXRpbHMsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyKSB7XG5cbiAgICB2YXIgZXZhbHVhdG9ycyA9IHt9O1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMgPSBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBldmFsdWF0b3JzID0ge307XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRXZhbHVhdG9yOiBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGV2YWx1YXRvcnMpIHtcbiAgICAgICAgICB2YXIgZSA9IGV2YWx1YXRvcnNba2V5XTtcbiAgICAgICAgICBpZiAoZS5wbHVnaW5OYW1lID09PSBwbHVnaW4pIHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oZS5leGl0KSkge1xuICAgICAgICAgICAgICBlLmV4aXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBldmFsdWF0b3JzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV3RXZhbHVhdG9yOiBmdW5jdGlvbihldmFsdWF0b3JTZXR0aW5ncykge1xuICAgICAgICBpZiAobG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLmluZGV4T2YoZXZhbHVhdG9yU2V0dGluZ3MpID09PSAtMSlcblx0ICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLnB1c2goZXZhbHVhdG9yU2V0dGluZ3MpO1xuXHQgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuXHQgICAgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuZ2V0RXZhbHVhdG9yRmFjdG9yeUFuZFNoZWxsKGV2YWx1YXRvclNldHRpbmdzKVxuXHQgICAgLnRoZW4oZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG5cdCAgICAgIGlmKGV2YWx1YXRvciA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiY2Fubm90IGNyZWF0ZSBldmFsdWF0b3IgZmFjdG9yeVwiKTtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKF8uaXNFbXB0eShldmFsdWF0b3JTZXR0aW5ncy5uYW1lKSkge1xuXHQgICAgICAgIGlmICghZXZhbHVhdG9yc1tldmFsdWF0b3IucGx1Z2luTmFtZV0pIHtcblx0ICAgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLm5hbWUgPSBldmFsdWF0b3IucGx1Z2luTmFtZTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3MubmFtZSA9IGV2YWx1YXRvci5wbHVnaW5OYW1lICsgXCJfXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cblx0ICAgICAgaWYgKCFldmFsdWF0b3JTZXR0aW5ncy52aWV3KSB7XG5cdCAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3MudmlldyA9IHt9O1xuXHQgICAgICB9XG5cdCAgICAgIGlmICghZXZhbHVhdG9yU2V0dGluZ3Mudmlldy5jbSkge1xuXHQgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLnZpZXcuY20gPSB7fTtcblx0ICAgICAgfVxuXHQgICAgICBldmFsdWF0b3JTZXR0aW5ncy52aWV3LmNtLm1vZGUgPSBldmFsdWF0b3IuY21Nb2RlO1xuXHQgICAgICBldmFsdWF0b3JzW2V2YWx1YXRvclNldHRpbmdzLm5hbWVdID0gZXZhbHVhdG9yO1xuXHQgICAgICBpZiAoIGV2YWx1YXRvclNldHRpbmdzLmRlZmVycmVkICE9PSB1bmRlZmluZWQgKSB7XG5cdCAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3MuZGVmZXJyZWQucmVzb2x2ZShldmFsdWF0b3IpO1xuXHQgICAgICAgIGRlbGV0ZSBldmFsdWF0b3JTZXR0aW5ncy5kZWZlcnJlZDtcblx0ICAgICAgfVxuXHQgICAgICBkZWZlcnJlZC5yZXNvbHZlKGV2YWx1YXRvcik7XG5cdCAgICB9KVxuXHQgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG5cdCAgICAgIHZhciBpbmRleCA9IGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5pbmRleE9mKGV2YWx1YXRvclNldHRpbmdzKTtcblx0ICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLnNwbGljZShpbmRleCwgMSk7XG5cdCAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yOiBmdW5jdGlvbihldmFsdWF0b3JJZCkge1xuICAgICAgICByZXR1cm4gZXZhbHVhdG9yc1tldmFsdWF0b3JJZF07XG4gICAgICB9LFxuICAgICAgd2FpdEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9ySWQpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBpZiAoZXZhbHVhdG9yc1tldmFsdWF0b3JJZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZXZhbHVhdG9yc1tldmFsdWF0b3JJZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLmxlbmd0aDsgaSArKyApIHtcbiAgICAgICAgICAgIGlmIChsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnNbaV0ubmFtZSA9PT0gZXZhbHVhdG9ySWQpIHtcbiAgICAgICAgICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzW2ldLmRlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaSA9PT0gbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG5cbiAgICAgIGdldFZpc3VhbFBhcmFtczogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAoZXZhbHVhdG9yc1tuYW1lXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5nZXRWaXN1YWxQYXJhbXMobmFtZSk7XG4gICAgICAgIHZhciB2ID0geyB9O1xuICAgICAgICB2YXIgZSA9IGV2YWx1YXRvcnNbbmFtZV07XG4gICAgICAgIHZhciBmID0gYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuZ2V0VmlzdWFsUGFyYW1zKG5hbWUpO1xuICAgICAgICBpZiAoZS5iZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5iZ0NvbG9yID0gZS5iZ0NvbG9yO1xuICAgICAgICBlbHNlIGlmIChmICE9PSB1bmRlZmluZWQgJiYgZi5iZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5iZ0NvbG9yID0gZi5iZ0NvbG9yO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdi5iZ0NvbG9yID0gXCJcIjtcblxuICAgICAgICBpZiAoZS5mZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5mZ0NvbG9yID0gZS5mZ0NvbG9yO1xuICAgICAgICBlbHNlIGlmIChmICE9PSB1bmRlZmluZWQgJiYgZi5mZ0NvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5mZ0NvbG9yID0gZi5mZ0NvbG9yO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdi5mZ0NvbG9yID0gXCJcIjtcblxuICAgICAgICBpZiAoZS5ib3JkZXJDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYm9yZGVyQ29sb3IgPSBlLmJvcmRlckNvbG9yO1xuICAgICAgICBlbHNlIGlmIChmICE9PSB1bmRlZmluZWQgJiYgZi5ib3JkZXJDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYm9yZGVyQ29sb3IgPSBmLmJvcmRlckNvbG9yO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdi5ib3JkZXJDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGUuc2hvcnROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5zaG9ydE5hbWUgPSBlLnNob3J0TmFtZTtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuc2hvcnROYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5zaG9ydE5hbWUgPSBmLnNob3J0TmFtZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuc2hvcnROYW1lID0gXCJcIjtcblxuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRvcnM7XG4gICAgICB9LFxuICAgICAgZ2V0TG9hZGluZ0V2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzO1xuICAgICAgfSxcbiAgICAgIHJlY29ubmVjdEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmVhY2goZXZhbHVhdG9ycywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICBpZiAoZXYgJiYgXy5pc0Z1bmN0aW9uKGV2LnJlY29ubmVjdCkpIHtcbiAgICAgICAgICAgIGV2LnJlY29ubmVjdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXhpdEFuZFJlbW92ZUFsbEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmVhY2goZXZhbHVhdG9ycywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICBpZiAoZXYgJiYgXy5pc0Z1bmN0aW9uKGV2LmV4aXQpKSB7XG4gICAgICAgICAgICBldi5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZXZhbHVhdG9ycyA9IHt9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlclxuICogTm90ZWJvb2sgQ2VsbCBNb2RlbCBkb2Vzbid0IG93biB0aGUgbm90ZWJvb2sgbW9kZWwuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsIFtdKTtcblxuICAvLyB1dGlsaXRpZXNcbiAgdmFyIGdlbmVyYXRlQ2VsbE1hcCA9IGZ1bmN0aW9uKGNlbGxzKSB7XG4gICAgdmFyIGRlY29yYXRlZENlbGxzID0ge1xuICAgICAgJ3Jvb3QnOiB7XG4gICAgICAgIGlkOiAncm9vdCcsXG4gICAgICAgIHJhdzogbnVsbCxcbiAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBhbGxEZXNjZW5kYW50czogW11cbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICghY2VsbHMgfHwgY2VsbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZGVjb3JhdGVkQ2VsbHM7XG4gICAgfVxuXG4gICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbihjZWxsLCBpbmRleCkge1xuICAgICAgZGVjb3JhdGVkQ2VsbHNbY2VsbC5pZF0gPSB7XG4gICAgICAgIGlkOiBjZWxsLmlkLFxuICAgICAgICByYXc6IGNlbGwsXG4gICAgICAgIHJhd0luZGV4OiBpbmRleCxcbiAgICAgICAgbGV2ZWw6IGNlbGwubGV2ZWwgPiAwID8gY2VsbC5sZXZlbCA6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIGFsbERlc2NlbmRhbnRzOiBbXVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHZhciBzdGFjayA9IFtkZWNvcmF0ZWRDZWxscy5yb290XTtcbiAgICBzdGFjay5wZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1t0aGlzLmxlbmd0aCAtIDFdO1xuICAgIH07XG4gICAgXyhkZWNvcmF0ZWRDZWxscykuZWFjaChmdW5jdGlvbihjZWxsKSB7XG4gICAgICBpZiAoY2VsbC5pZCA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChzdGFjay5wZWVrKCkubGV2ZWwgPj0gY2VsbC5sZXZlbCkge1xuICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgIH1cbiAgICAgIGRlY29yYXRlZENlbGxzW3N0YWNrLnBlZWsoKS5pZF0uY2hpbGRyZW4ucHVzaChjZWxsLmlkKTtcbiAgICAgIGRlY29yYXRlZENlbGxzW2NlbGwuaWRdLnBhcmVudCA9IHN0YWNrLnBlZWsoKS5pZDtcbiAgICAgIHN0YWNrLmZvckVhY2goZnVuY3Rpb24oYykge1xuICAgICAgICBkZWNvcmF0ZWRDZWxsc1tjLmlkXS5hbGxEZXNjZW5kYW50cy5wdXNoKGNlbGwuaWQpO1xuICAgICAgfSk7XG4gICAgICBzdGFjay5wdXNoKGNlbGwpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWNvcmF0ZWRDZWxscztcbiAgfTtcblxuICB2YXIgZ2VuZXJhdGVUYWdNYXAgPSBmdW5jdGlvbihjZWxsTWFwKSB7XG4gICAgLy8gaW5pdGlhbGl6YXRpb24gY2VsbHNcbiAgICB2YXIgaW5pdGlhbGl6YXRpb25DZWxscyA9IF8oY2VsbE1hcCkuY2hhaW4oKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yYXcgJiYgY2VsbC5yYXcuaW5pdGlhbGl6YXRpb247XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIGlmIChjZWxsLnJhdy50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXyhjZWxsLmFsbERlc2NlbmRhbnRzKS5jaGFpbigpXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihjaGlsZElkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbE1hcFtjaGlsZElkXTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGMucmF3LnR5cGUgPT09ICdjb2RlJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZsYXR0ZW4oKVxuICAgICAgICAudW5pcSgpXG4gICAgICAgIC5zb3J0QnkoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnJhd0luZGV4O1xuICAgICAgICB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yYXc7XG4gICAgICAgIH0pXG4gICAgICAgIC52YWx1ZSgpO1xuXG4gICAgLy8gZXZhbHVhdG9yc1xuICAgIHZhciBldmFsdWF0b3JNYXAgPSB7fTtcbiAgICBldmFsdWF0b3JNYXAuYWRkID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzW2tleV0pIHtcbiAgICAgICAgdGhpc1trZXldID0gW107XG4gICAgICB9XG4gICAgICB0aGlzW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgfTtcbiAgICBfKGNlbGxNYXApLmNoYWluKClcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucmF3ICYmIGNlbGwucmF3LnR5cGUgPT09ICdjb2RlJztcbiAgICAgICAgfSlcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oY29kZUNlbGwpIHtcbiAgICAgICAgICBldmFsdWF0b3JNYXAuYWRkKGNvZGVDZWxsLnJhdy5ldmFsdWF0b3IsIGNvZGVDZWxsLnJhdyk7XG4gICAgICAgIH0pO1xuXG4gICAgLy8gdXNlciB0YWdzXG4gICAgdmFyIHVzZXJUYWdzTWFwID0ge307XG4gICAgdXNlclRhZ3NNYXAuYWRkID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzW2tleV0pIHtcbiAgICAgICAgdGhpc1trZXldID0gW107XG4gICAgICB9XG4gICAgICB0aGlzW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgfTtcbiAgICBfKGNlbGxNYXApLmNoYWluKClcbiAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIHJldHVybiBjZWxsLnJhdyAmJiBjZWxsLnJhdy50eXBlID09PSAnY29kZScgJiYgY2VsbC5yYXcudGFncyAhPT0gdW5kZWZpbmVkICYmIGNlbGwucmF3LnRhZ3MgIT09ICcnO1xuICAgIH0pXG4gICAgLmVhY2goZnVuY3Rpb24oY29kZUNlbGwpIHtcbiAgICAgIHZhciByZSA9IC9cXHMrLztcbiAgICAgIHZhciB0YWdzID0gY29kZUNlbGwucmF3LnRhZ3Muc3BsaXQocmUpO1xuICAgICAgdmFyIGk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB1c2VyVGFnc01hcC5hZGQodGFnc1tpXSwgY29kZUNlbGwucmF3KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXphdGlvbjogaW5pdGlhbGl6YXRpb25DZWxscyxcbiAgICAgIGV2YWx1YXRvcjogZXZhbHVhdG9yTWFwLFxuICAgICAgdXNlcnRhZ3M6IHVzZXJUYWdzTWFwXG4gICAgfTtcbiAgfTtcblxuICB2YXIgcmVwbGFjZVdob2xlQXJyYXkgPSBmdW5jdGlvbihvbGRBcnJheSwgbmV3QXJyYXkpIHtcbiAgICB2YXIgYXJncyA9IF8uZmxhdHRlbihbMCwgb2xkQXJyYXkubGVuZ3RoLCBuZXdBcnJheV0pO1xuICAgIG9sZEFycmF5LnNwbGljZS5hcHBseShvbGRBcnJheSwgYXJncyk7XG4gIH07XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyJywgZnVuY3Rpb24oJHRpbWVvdXQsICRyb290U2NvcGUpIHtcbiAgICB2YXIgY2VsbHMgPSBbXTtcbiAgICB2YXIgY2VsbE1hcCA9IHt9O1xuICAgIHZhciB0YWdNYXAgPSB7fTtcbiAgICB2YXIgdW5kb0FjdGlvbiA9IHt9O1xuICAgIHZhciB1bmRvQWN0aW9uMiA9IHt9O1xuICAgIHZhciByZWRvQWN0aW9uID0ge307XG4gICAgdmFyIHJlZG9BY3Rpb24yID0ge307XG4gICAgdmFyIHJlY3JlYXRlQ2VsbE1hcCA9IGZ1bmN0aW9uKGRvTm90Q2xlYXJVbmRvQWN0aW9uKSB7XG4gICAgICBjZWxsTWFwID0gZ2VuZXJhdGVDZWxsTWFwKGNlbGxzKTtcbiAgICAgIHRhZ01hcCA9IGdlbmVyYXRlVGFnTWFwKGNlbGxNYXApO1xuICAgICAgaWYgKCFkb05vdENsZWFyVW5kb0FjdGlvbikge1xuICAgICAgICB1bmRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmVkb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmVkb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBPcHRpbWl6ZSB0aGlzIGZ1bmN0aW9uIHNvIGl0IGRvZXNuJ3QgZGVzdHJveSB0aGUgcGFnZSBzY3JvbGwgYW5kIHJlcXVpcmVcbiAgICAgIC8vIHRoaXMgaGFjayBiZWxvdy5cbiAgICAgIC8vXG4gICAgICAvLyBNb3N0IGxpa2VseSBiZWNhdXNlIG9mIHRoZSBuZXN0ZWQgbmF0dXJlIG9mIHRoZSBjZWxsIG1hcCBhbmQgdGhlIGNlbGxzIGluIHRoZVxuICAgICAgLy8gRE9NIHRoYXQgcmVmbGVjdCB0aGF0IGNlbGwgbWFwLCB3aGVuIG9uZSBjaGFuZ2VzIHNvbWV0aGluZyBhdCB0aGUgYmFzZSBvZiB0aGVcbiAgICAgIC8vIHRyZWUgKGxpa2UgYWRkaW5nIGEgbmV3IHNlY3Rpb24gY2VsbFxuICAgICAgLy8gW2h0dHBzOi8vZ2l0aHViLmNvbS90d29zaWdtYS9iZWFrZXItbm90ZWJvb2svaXNzdWVzLzY3Ml0pLCBpdCBub3Qgb25seSB0YWtlcyBhblxuICAgICAgLy8gZXRlcm5pdHksIGJ1dCByYW5kb21seSBzY3JvbGxzIHRvIH42NSUgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdodG1sLCBib2R5Jykuc2Nyb2xsVG9wKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2VsbE1hcFJlY3JlYXRlZCcpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIF9nZXRDZWxsTWFwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxNYXA7XG4gICAgICB9LFxuICAgICAgX2dldFRhZ01hcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0YWdNYXA7XG4gICAgICB9LFxuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKF9jZWxsc18pIHtcbiAgICAgICAgaWYgKF9jZWxsc18pIHtcbiAgICAgICAgICBjZWxscyA9IF9jZWxsc187XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGlwYm9hcmQgPSBudWxsO1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICAgIH0sXG4gICAgICBnZXRJbmRleDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxNYXBbaWRdID8gY2VsbE1hcFtpZF0ucmF3SW5kZXggOiAtMTtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsQXRJbmRleDogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxzW2luZGV4XTtcbiAgICAgIH0sXG4gICAgICBoYXNDZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gISFjZWxsTWFwW2lkXTtcbiAgICAgIH0sXG4gICAgICBfZ2V0RGVjb3JhdGVkQ2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2VsbChpZCkpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbE1hcFtpZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRDZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucmF3O1xuICAgICAgfSxcbiAgICAgIGdldENlbGxUeXBlOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKGlkKS50eXBlO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxMZXZlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoaWQpLmxldmVsO1xuICAgICAgfSxcbiAgICAgIGdldFBhcmVudDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucGFyZW50O1xuICAgICAgICBpZiAocGFyZW50SWQgPT09ICdyb290Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKHBhcmVudElkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGRJZCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmdldENlbGwoY2hpbGRJZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldEFsbERlc2NlbmRhbnRzOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5hbGxEZXNjZW5kYW50cy5tYXAoZnVuY3Rpb24oY2hpbGRJZCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmdldENlbGwoY2hpbGRJZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldEFsbENvZGVDZWxsczogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgIGlkID0gJ3Jvb3QnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsbERlc2NlbmRhbnRzKGlkKS5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnR5cGUgPT09ICdjb2RlJztcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgLy8gZmluZCB0aGUgZmlyc3QgY29kZSBjZWxsIHN0YXJ0aW5nIHdpdGggdGhlIHN0YXJ0Q2VsbCBhbmQgc2NhblxuICAgICAgLy8gdXNpbmcgdGhlIGRpcmVjdGlvbiwgaWYgdGhlIHN0YXJ0Q2VsbCBpcyBhIGNvZGUgY2VsbCwgaXQgd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgIGZpbmRDb2RlQ2VsbDogZnVuY3Rpb24oc3RhcnRDZWxsSWQsIGZvcndhcmQpIHtcbiAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoc3RhcnRDZWxsSWQpO1xuICAgICAgICB3aGlsZSAoY2VsbCkge1xuICAgICAgICAgIGlmIChjZWxsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNlbGwgPSBmb3J3YXJkID8gdGhpcy5nZXROZXh0KGNlbGwuaWQpIDogdGhpcy5nZXRQcmV2KGNlbGwuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24oaWQsIGNlbGwpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXgsIDAsIGNlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5jZWxsLmFkZGVkJywgY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGluc2VydEZpcnN0OiBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdChjZWxsKSkge1xuICAgICAgICAgIHRocm93ICd1bmFjY2VwdGFibGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgY2VsbHMuc3BsaWNlKDAsIDAsIGNlbGwpO1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRBZnRlcjogZnVuY3Rpb24oaWQsIGNlbGwpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KGNlbGwpKSB7XG4gICAgICAgICAgdGhyb3cgJ3VuYWNjZXB0YWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCArIDEsIDAsIGNlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5jZWxsLmFkZGVkJywgY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGluc2VydEF0OiBmdW5jdGlvbihpbmRleCwgY2VsbCwgZG9Ob3RDbGVhclVuZG9BY3Rpb24pIHtcbiAgICAgICAgaWYgKF8uaXNBcnJheShjZWxsKSkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoY2VsbHMsIFtpbmRleCwgMF0uY29uY2F0KGNlbGwpKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KGNlbGwpKSB7XG4gICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4LCAwLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndW5hY2NlcHRhYmxlJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoZG9Ob3RDbGVhclVuZG9BY3Rpb24pO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5jZWxsLmFkZGVkJywgY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGlzUG9zc2libGVUb01vdmVVcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNlbGwgaXNuJ3QgZmlyc3QgKG9yIG5vbmV4aXN0ZW50PylcbiAgICAgICAgcmV0dXJuIFstMSwgMF0uaW5kZXhPZih0aGlzLmdldEluZGV4KGlkKSkgPT09IC0xO1xuICAgICAgfSxcbiAgICAgIG1vdmVVcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoaWQpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXhdID0gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXggLSAxXSA9IGNlbGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgfSxcbiAgICAgIGlzUG9zc2libGVUb01vdmVEb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICAvLyBJZiB0aGUgY2VsbCBpc24ndCBsYXN0IChvciBub25leGlzdGVudD8pXG4gICAgICAgIHJldHVybiBbLTEsIChjZWxscy5sZW5ndGggLSAxKV0uaW5kZXhPZih0aGlzLmdldEluZGV4KGlkKSkgPT09IC0xO1xuICAgICAgfSxcbiAgICAgIG1vdmVEb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gY2VsbHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbChpZCk7XG4gICAgICAgICAgICBjZWxsc1tpbmRleF0gPSB0aGlzLmdldENlbGxBdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICAgICAgICBjZWxsc1tpbmRleCArIDFdID0gY2VsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICB9LFxuICAgICAgdW5kb2FibGVEZWxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRlbGV0ZVVuZG8gPSB7XG4gICAgICAgICAgICB0eXBlOiAnc2luZ2xlJyxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmdldEluZGV4KGlkKSxcbiAgICAgICAgICAgIGNlbGw6IHRoaXMuZ2V0Q2VsbChpZClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGUoaWQpO1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24oaWQsIHVuZG9hYmxlKSB7XG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgY2VsbCxcbiAgICAgICAgLy8gbm90ZSB0aGF0IGlmIHRoaXMgaXMgYSBzZWN0aW9uLCBpdHMgZGVzY2VuZGFudHMgYXJlIG5vdCBkZWxldGVkLlxuICAgICAgICAvLyB0byBkZWxldGUgYSBzZWNpdG9uIHdpdGggYWxsIGl0cyBkZXNjZW5kYW50cyB1c2UgZGVsZXRlU2VjdGlvbiBpbnN0ZWFkLlxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHZhciBkZWxldGVkID0gY2VsbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBpZiAodW5kb2FibGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHVuZG9BY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2VsZi5pbnNlcnRBdChpbmRleCwgZGVsZXRlZCwgdHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZWRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmVkb0FjdGlvbjIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsZXRlU2VjdGlvbjogZnVuY3Rpb24oaWQsIHVuZG9hYmxlKSB7XG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgc2VjdGlvbiBjZWxsIGFzIHdlbGwgYXMgYWxsIGl0cyBkZXNjZW5kYW50c1xuICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbChpZCk7XG4gICAgICAgIGlmICghY2VsbCkge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsLnR5cGUgIT09ICdzZWN0aW9uJykge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIGlzIG5vdCBhIHNlY3Rpb24gY2VsbCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIHZhciBkZXNjZW5kYW50cyA9IHRoaXMuZ2V0QWxsRGVzY2VuZGFudHMoaWQpO1xuICAgICAgICB2YXIgZGVsZXRlZCA9IGNlbGxzLnNwbGljZShpbmRleCwgZGVzY2VuZGFudHMubGVuZ3RoICsgMSk7XG4gICAgICAgIGlmICh1bmRvYWJsZSkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICB1bmRvQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmluc2VydEF0KGluZGV4LCBkZWxldGVkLCB0cnVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHVuZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVkb0FjdGlvbjIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCwgZGVzY2VuZGFudHMubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlbGV0ZWQ7XG4gICAgICB9LFxuICAgICAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh1bmRvQWN0aW9uKSB7XG4gICAgICAgICAgdW5kb0FjdGlvbi5hcHBseSgpO1xuICAgICAgICAgIHJlZG9BY3Rpb24gPSByZWRvQWN0aW9uMjtcbiAgICAgICAgICByZWRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZG9BY3Rpb247XG4gICAgICAgICAgdW5kb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gdW5kbycpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVkbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZWRvQWN0aW9uKSB7XG4gICAgICAgICAgcmVkb0FjdGlvbi5hcHBseSgpO1xuICAgICAgICAgIHJlZG9BY3Rpb24yID0gcmVkb0FjdGlvbjtcbiAgICAgICAgICB1bmRvQWN0aW9uID0gdW5kb0FjdGlvbjI7XG4gICAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVkb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gcmVkbycpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsZXRlQWxsT3V0cHV0Q2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY2VsbHMpIHtcbiAgICAgICAgICBfLmVhY2goY2VsbHMsIGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIGlmIChjZWxsLm91dHB1dCkge1xuICAgICAgICAgICAgICBjZWxsLm91dHB1dC5yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkdW1wRGlzcGxheVN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjZWxscykge1xuICAgICAgICAgIF8uZWFjaChjZWxscywgZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgaWYgKGNlbGwub3V0cHV0KSB7XG4gICAgICAgICAgICAgIGNlbGwub3V0cHV0LnN0YXRlID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaGlmdFNlZ21lbnQ6IGZ1bmN0aW9uKHNlZ0JlZ2luLCBzZWdMZW5ndGgsIG9mZnNldCkge1xuICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgZnVuY3Rpb24gc2hpZnRzIGEgY29udGludW91cyBzZXF1ZW5jZSBvZiBjZWxsc1xuICAgICAgICBpZiAoc2VnQmVnaW4gKyBvZmZzZXQgPCAwIHx8IHNlZ0JlZ2luICsgc2VnTGVuZ3RoIC0gMSArIG9mZnNldCA+PSBjZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyAnSWxsZWdhbCBzaGlmdGluZywgcmVzdWx0IHdvdWxkIGJlIG91dCBvZiBib3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNsaWNlMSA9IGNlbGxzLnNsaWNlKDAsIHNlZ0JlZ2luKTtcbiAgICAgICAgdmFyIHNsaWNlMiA9IGNlbGxzLnNsaWNlKHNlZ0JlZ2luLCBzZWdCZWdpbiArIHNlZ0xlbmd0aCk7XG4gICAgICAgIHZhciBzbGljZTMgPSBjZWxscy5zbGljZShzZWdCZWdpbiArIHNlZ0xlbmd0aCk7XG4gICAgICAgIHZhciB0b0JlTW92ZWQ7XG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgLy8gbW92aW5nIGZyb20gc2xpY2UgMyB0byBzbGljZSAxXG4gICAgICAgICAgdG9CZU1vdmVkID0gc2xpY2UzLnNwbGljZSgwLCBvZmZzZXQpO1xuICAgICAgICAgIHNsaWNlMSA9IHNsaWNlMS5jb25jYXQodG9CZU1vdmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtb3ZpbmcgZnJvbSBzbGljZSAxIHRvIHNsaWNlIDNcbiAgICAgICAgICB0b0JlTW92ZWQgPSBzbGljZTEuc3BsaWNlKHNsaWNlMS5sZW5ndGggKyBvZmZzZXQsIC1vZmZzZXQpO1xuICAgICAgICAgIHNsaWNlMyA9IHRvQmVNb3ZlZC5jb25jYXQoc2xpY2UzKTtcbiAgICAgICAgfVxuICAgICAgICByZXBsYWNlV2hvbGVBcnJheShjZWxscywgXy5mbGF0dGVuKFtzbGljZTEsIHNsaWNlMiwgc2xpY2UzXSkpO1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgIH0sXG4gICAgICBnZXRQcmV2U2libGluZzogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucGFyZW50O1xuICAgICAgICBpZiAoIXBhcmVudElkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpYmxpbmdJZHMgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKHBhcmVudElkKS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIG15SW5kZXhBbW9uZ1NpYmxpbmdzID0gc2libGluZ0lkcy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKG15SW5kZXhBbW9uZ1NpYmxpbmdzID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChzaWJsaW5nSWRzW215SW5kZXhBbW9uZ1NpYmxpbmdzIC0gMV0pO1xuICAgICAgfSxcbiAgICAgIGdldE5leHRTaWJsaW5nOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgcGFyZW50SWQgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5wYXJlbnQ7XG4gICAgICAgIGlmICghcGFyZW50SWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2libGluZ0lkcyA9IHRoaXMuX2dldERlY29yYXRlZENlbGwocGFyZW50SWQpLmNoaWxkcmVuO1xuICAgICAgICB2YXIgbXlJbmRleEFtb25nU2libGluZ3MgPSBzaWJsaW5nSWRzLmluZGV4T2YoaWQpO1xuICAgICAgICBpZiAobXlJbmRleEFtb25nU2libGluZ3MgPT09IHNpYmxpbmdJZHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoc2libGluZ0lkc1tteUluZGV4QW1vbmdTaWJsaW5ncyArIDFdKTtcbiAgICAgIH0sXG4gICAgICBpc1Bvc3NpYmxlVG9Nb3ZlU2VjdGlvblVwOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldFByZXZTaWJsaW5nKGlkKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlU2VjdGlvblVwOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuZ2V0U2VjdGlvbkxlbmd0aChpZCk7XG4gICAgICAgIHZhciBwcmV2U2liID0gdGhpcy5nZXRQcmV2U2libGluZyhpZCk7XG4gICAgICAgIGlmICghcHJldlNpYikge1xuICAgICAgICAgIHRocm93ICdDYW5ub3QgbW92ZSBzZWN0aW9uIHVwJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldlNpYklkID0gcHJldlNpYi5pZDtcbiAgICAgICAgdmFyIG9mZnNldCA9IC0xICogdGhpcy5nZXRTZWN0aW9uTGVuZ3RoKHByZXZTaWJJZCk7XG4gICAgICAgIHRoaXMuc2hpZnRTZWdtZW50KGluZGV4LCBsZW5ndGgsIG9mZnNldCk7XG4gICAgICB9LFxuICAgICAgaXNQb3NzaWJsZVRvTW92ZVNlY3Rpb25Eb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldE5leHRTaWJsaW5nKGlkKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlU2VjdGlvbkRvd246IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBuZXh0U2liID0gdGhpcy5nZXROZXh0U2libGluZyhpZCk7XG4gICAgICAgIGlmICghbmV4dFNpYikge1xuICAgICAgICAgIHRocm93ICdDYW5ub3QgbW92ZSBzZWN0aW9uIGRvd24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW92ZVNlY3Rpb25VcChuZXh0U2liLmlkKTtcbiAgICAgIH0sXG4gICAgICBnZXRTZWN0aW9uTGVuZ3RoOiBmdW5jdGlvbihpZCkge1xuICAgICAgICAvLyB0aGUgY2VsbCBpdHNlbGYgcGx1cyBhbGwgZGVzY2VuZGFudHNcbiAgICAgICAgcmV0dXJuIDEgKyB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5hbGxEZXNjZW5kYW50cy5sZW5ndGg7XG4gICAgICB9LFxuXG4gICAgICAvLyBUaGUgZm9sbG93aW5nIGhhcyBub3QgYmVlbiB1bml0IHRlc3RlZFxuICAgICAgZ2V0TmV4dDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gY2VsbHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGxBdEluZGV4KGluZGV4ICsgMSk7XG4gICAgICB9LFxuICAgICAgZ2V0UHJldjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGxBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICB9LFxuICAgICAgaXNDb250YWluZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBpZCA9PT0gJ3Jvb3QnIHx8ICEhdGhpcy5nZXRDZWxsKGlkKS5sZXZlbDtcbiAgICAgIH0sXG4gICAgICBpc0VtcHR5OiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuYWxsRGVzY2VuZGFudHMubGVuZ3RoID09PSAwO1xuICAgICAgfSxcbiAgICAgIGlzTGFzdDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKF8uaXNFbXB0eShjZWxscykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8ubGFzdChjZWxscykuaWQgPT09IGlkO1xuICAgICAgfSxcbiAgICAgIGFwcGVuZEFmdGVyOiBmdW5jdGlvbihpZCwgY2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc0NvbnRhaW5lcihpZCkgJiYgIXRoaXMuaXNFbXB0eShpZCkpIHtcbiAgICAgICAgICAvLyBhZGQgdG8gdGFpbFxuICAgICAgICAgIHZhciBkZXNjZW5kYW50cyA9IHRoaXMuZ2V0QWxsRGVzY2VuZGFudHMoaWQpO1xuICAgICAgICAgIHRoaXMuaW5zZXJ0QWZ0ZXIoZGVzY2VuZGFudHNbZGVzY2VuZGFudHMubGVuZ3RoIC0gMV0uaWQsIHRoaXMuY2xpcGJvYXJkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhcHBlbmQgYWZ0ZXJcbiAgICAgICAgICB0aGlzLmluc2VydEFmdGVyKGlkLCBjZWxsKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEluaXRpYWxpemF0aW9uQ2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwLmluaXRpYWxpemF0aW9uO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxzV2l0aEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgIHJldHVybiB0YWdNYXAuZXZhbHVhdG9yW2V2YWx1YXRvcl07XG4gICAgICB9LFxuICAgICAgaGFzVXNlclRhZzogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwLnVzZXJ0YWdzW3RdICE9PSB1bmRlZmluZWQ7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbHNXaXRoVXNlclRhZzogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwLnVzZXJ0YWdzW3RdO1xuICAgICAgfSxcbiAgICAgIGNsaXBib2FyZDogbnVsbCxcbiAgICAgIGN1dDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xpcGJvYXJkKSB7XG4gICAgICAgICAgdGhpcy5kZWxldGUodGhpcy5jbGlwYm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpcGJvYXJkID0gdGhpcy5nZXRDZWxsKGlkKTtcbiAgICAgICAgdGhpcy5kZWxldGUoaWQpO1xuICAgICAgfSxcbiAgICAgIHBhc3RlOiBmdW5jdGlvbihkZXN0aW5hdGlvbklkKSB7XG4gICAgICAgIGlmICh0aGlzLmNsaXBib2FyZCkge1xuICAgICAgICAgIHRoaXMuYXBwZW5kQWZ0ZXIoZGVzdGluYXRpb25JZCwgdGhpcy5jbGlwYm9hcmQpO1xuICAgICAgICAgIHRoaXMuY2xpcGJvYXJkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhblNldFVzZXJUYWdzOiBmdW5jdGlvbih0YWdzKSB7XG4gICAgICAgIHZhciByZSA9IC9cXHMrLztcbiAgICAgICAgaWYgKHRhZ3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciB0Z3MgPSB0YWdzLnNwbGl0KHJlKTtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2VsbE1hcFt0Z3NbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFUlJPUjogVGhlIG5hbWUgXCInICsgdGdzW2ldICsgJ1wiIGlzIGFscmVhZHkgdXNlZCBhcyBhIGNlbGwgbmFtZS4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LFxuICAgICAgY2FuUmVuYW1lQ2VsbDogZnVuY3Rpb24obmV3aWQpIHtcbiAgICAgICAgaWYgKGNlbGxNYXBbbmV3aWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gJ0VSUk9SOiBDZWxsIFwiJyArIG5ld2lkICsgJ1wiIGFscmVhZHkgZXhpc3RzLic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhZ01hcC51c2VydGFnc1tuZXdpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiAnRVJST1I6IFRoZSBuYW1lIFwiJyArIG5ld2lkICsgJ1wiIGlzIGFscmVhZHkgdXNlZCBhcyBhIHRhZy4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0sXG4gICAgICByZW5hbWVDZWxsOiBmdW5jdGlvbihvbGRpZCwgbmV3aWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuUmVuYW1lQ2VsbChuZXdpZCkgIT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZHggPSB0aGlzLmdldEluZGV4KG9sZGlkKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgY2VsbHNbaWR4XS5pZCA9IG5ld2lkO1xuICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVidWlsZE1hcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsubm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcImJrLm5vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyXCIsIFtdKTtcblxuICBtb2R1bGUuZmFjdG9yeShcImJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zdWJzY3JpcHRpb25zID0ge307XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKHNlc3Npb25JZCwgbm90ZWJvb2tNb2RlbCkge1xuICAgICAgICBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdID1cbiAgICAgICAgICAkLmNvbWV0ZC5zdWJzY3JpYmUoXCIvbmFtZXNwYWNlL1wiICsgc2Vzc2lvbklkLCBmdW5jdGlvbihyZXBseSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSByZXBseS5kYXRhLm5hbWU7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSByZXBseS5kYXRhLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHN5bmMgPSByZXBseS5kYXRhLnN5bmM7XG4gICAgICAgICAgICB2YXIgbmFtZXNwYWNlID0gbm90ZWJvb2tNb2RlbC5uYW1lc3BhY2U7XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBzeW5jKSB7XG4gICAgICAgICAgICAgIHZhciByZXBseTIgPSB7bmFtZTogbmFtZSwgZGVmaW5lZDogZmFsc2UsIHNlc3Npb246IHNlc3Npb25JZH07XG4gICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgIHZhciByZWFkVmFsdWUgPSBuYW1lc3BhY2VbbmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gcmVhZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSByZWFkVmFsdWU7XG4gICAgICAgICAgICAgICAgICByZXBseTIuZGVmaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9uYW1lc3BhY2UvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwubmFtZXNwYWNlID0ge307XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gbm90ZWJvb2tNb2RlbC5uYW1lc3BhY2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmFtZXNwYWNlW25hbWVdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzeW5jKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGx5MiA9IHtuYW1lOiBuYW1lLCBzZXNzaW9uOiBzZXNzaW9uSWR9O1xuICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9uYW1lc3BhY2UvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNsZWFyOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgaWYgKHNlc3Npb25JZCkge1xuICAgICAgICAgICQuY29tZXRkLnVuc3Vic2NyaWJlKF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF0pO1xuICAgICAgICAgIGRlbGV0ZSBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuc2Vzc2lvbk1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuc2Vzc2lvbk1hbmFnZXInLFtcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5zZXNzaW9uJyxcbiAgICAnYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyJyxcbiAgICAnYmsubm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXInLFxuICAgICdiay5yZWNlbnRNZW51JyxcbiAgICAnYmsuZXZhbHVhdG9yTWFuYWdlcidcbiAgXSk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrU2Vzc2lvbk1hbmFnZXInLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia1Nlc3Npb24sXG4gICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia1JlY2VudE1lbnUpIHtcblxuICAgIHZhciBJbWFnZUljb24gPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEudHlwZSAhPT0gXCJJbWFnZUljb25cIikge1xuICAgICAgICB0aGlzLmltYWdlRGF0YSA9IFtdO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbWFnZURhdGEgPSBkYXRhLmltYWdlRGF0YTtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBEYXRhRnJhbWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEudHlwZSAhPT0gXCJUYWJsZURpc3BsYXlcIiB8fCBkYXRhLnN1YnR5cGUgIT09IFwiVGFibGVEaXNwbGF5XCIpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5OYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLnR5cGVzID0gW107XG4gICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbk5hbWVzID0gZGF0YS5jb2x1bW5OYW1lcy5zbGljZSgwKTtcbiAgICAgICAgdGhpcy50eXBlcyA9IGRhdGEudHlwZXMuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgIGZvciAodmFyIGogaW4gZGF0YS52YWx1ZXMpIHtcbiAgICAgICAgICB2YXIgdmFscyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YS52YWx1ZXNbal0pIHtcbiAgICAgICAgICAgIHZhbHMucHVzaCggdHJhbnNmb3JtQmFjayhkYXRhLnZhbHVlc1tqXVtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKHZhbHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzID0gJyc7XG4gICAgICBzID0gJ0RhdGFGcmFtZTonK1xuICAgICAgICAnICBSb3dzOiAnK3RoaXMudmFsdWVzLmxlbmd0aCsnXFxuJyArXG4gICAgICAgICcgIERhdGEgY29sdW1ucyAodG90YWwgJyt0aGlzLmNvbHVtbk5hbWVzLmxlbmd0aCsnIGNvbHVtbnMpOlxcbic7XG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMuY29sdW1uTmFtZXMpIHtcbiAgICAgICAgcyA9IHMgKyAnICAgICcrdGhpcy5jb2x1bW5OYW1lc1tpXSsnICAgJyt0aGlzLnR5cGVzW2ldKydcXG4nO1xuICAgICAgfVxuICAgICAgO1xuICAgICAgcmV0dXJuIHM7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuY29sdW1ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sdW1uTmFtZXM7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuZHR5cGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50eXBlcztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5nZXRDb2x1bW4gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgaSA9IHRoaXMuY29sdW1uTmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIHZhciBvID0gW107XG4gICAgICBmb3IgKHZhciBqIGluIHRoaXMudmFsdWVzKSB7XG4gICAgICAgIG8ucHVzaCh0aGlzLnZhbHVlc1tqXVtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5nZXRSb3cgPSBmdW5jdGlvbihpKSB7XG4gICAgICBpZiAoaSA8IDAgfHwgaSA+IHRoaXMudmFsdWVzLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgbyA9IHt9O1xuICAgICAgZm9yICh2YXIgaiBpbiB0aGlzLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgIG9bdGhpcy5jb2x1bW5OYW1lc1tqXV0gPSB0aGlzLnZhbHVlc1tpXVtqXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5yZW1vdmVDb2x1bW4gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgaSA9IHRoaXMuY29sdW1uTmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKHZhciBqIGluIHRoaXMudmFsdWVzKSB7XG4gICAgICAgIHRoaXMudmFsdWVzW2pdLnNwbGljZShpLDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb2x1bW5OYW1lcy5zcGxpY2UoaSwxKTtcbiAgICAgIHRoaXMudHlwZXMuc3BsaWNlKGksMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5hZGRDb2x1bW4gPSBmdW5jdGlvbihuYW1lLCBkYXRhLCB0eXBlKSB7XG4gICAgICB2YXIgaSA9IHRoaXMuY29sdW1uTmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpID49IDAgfHwgZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgdGhpcy5jb2x1bW5OYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy50eXBlcy5wdXNoKCh0eXBlID09PSB1bmRlZmluZWQpID8gZ2V0RGF0YVR5cGUoZGF0YVswXSkgOiB0eXBlKTtcbiAgICAgIHZhciBtaW4gPSAoZGF0YS5sZW5ndGggPiB0aGlzLnZhbHVlcy5sZW5ndGgpID8gdGhpcy52YWx1ZXMubGVuZ3RoIDogZGF0YS5sZW5ndGg7XG4gICAgICB2YXIgajtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBtaW47IGorKykge1xuICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKGRhdGFbal0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA+IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoOyBqIDwgdGhpcy52YWx1ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKFtdKTtcbiAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29sdW1uTmFtZXMubGVuZ3RoIC0gMTsgaysrKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbHVlc1tqXS5wdXNoKGRhdGFbal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5hZGRSb3cgPSBmdW5jdGlvbihyb3cpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IodmFyIGMgaW4gdGhpcy5jb2x1bW5OYW1lcykge1xuICAgICAgICBpZiAocm93W3RoaXMuY29sdW1uTmFtZXNbY11dICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgci5wdXNoKHJvd1t0aGlzLmNvbHVtbk5hbWVzW2NdXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByLnB1c2gobnVsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlcy5wdXNoKHIpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc1ByaW1pdGl2ZVR5cGUodikge1xuICAgICAgaWYgKF8uaXNEYXRlKHYpIHx8IF8uaXNTdHJpbmcodikgfHwgXy5pc051bWJlcih2KSB8fCBfLmlzQm9vbGVhbih2KSB8fCBfLmlzTmFOKHYpIHx8IF8uaXNOdWxsKHYpIHx8IF8uaXNVbmRlZmluZWQodikpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhVHlwZSh2KSB7XG4gICAgICBpZiAoXy5pc0RhdGUodikpXG4gICAgICAgIHJldHVybiBcInRpbWVcIjtcbiAgICAgIGlmKF8uaXNOdW1iZXIodikpIC8vIGNhbiB3ZSBkbyBhIGJldHRlciBqb2IgaGVyZT9cbiAgICAgICAgcmV0dXJuIFwiZG91YmxlXCI7XG4gICAgICBpZihfLmlzQm9vbGVhbih2KSlcbiAgICAgICAgcmV0dXJuIFwiYm9vbGVhblwiO1xuICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzRGljdGlvbmFyeSh2KSB7XG4gICAgICBpZiAoIV8uaXNPYmplY3QodikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIGZvcih2YXIgaSBpbiB2KSB7XG4gICAgICAgIGlmICghaXNQcmltaXRpdmVUeXBlKHZbaV0pKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm0odiwgbm9yZWN1cnNlKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKHYpIHx8IF8uaXNVbmRlZmluZWQodikpXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBpZiAoXy5pc0RhdGUodikpIHtcbiAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICBvLnR5cGUgPSBcIkRhdGVcIjtcbiAgICAgICAgby50aW1lc3RhbXAgPSB2LnZhbHVlT2YoKTtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgIH1cblxuICAgICAgaWYgKGlzUHJpbWl0aXZlVHlwZSh2KSlcbiAgICAgICAgcmV0dXJuIHY7XG5cbiAgICAgIGlmICh2IGluc3RhbmNlb2YgSW1hZ2VJY29uICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJJbWFnZUljb25cIjtcbiAgICAgICAgby5pbWFnZURhdGEgPSB2LmltYWdlRGF0YTtcbiAgICAgICAgby53aWR0aCA9IHYud2lkdGg7XG4gICAgICAgIG8uaGVpZ2h0ID0gdi5oZWlnaHQ7XG4gICAgICAgIHJldHVybiBvXG4gICAgICB9XG5cbiAgICAgIGlmICh2IGluc3RhbmNlb2YgRGF0YUZyYW1lICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgby5zdWJ0eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgby52YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2LnZhbHVlcykge1xuICAgICAgICAgIHZhciByb3cgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBqIGluIHYudmFsdWVzW2ldKSB7XG4gICAgICAgICAgICByb3cucHVzaCh0cmFuc2Zvcm0odi52YWx1ZXNbaV1bal0sIHRydWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgby52YWx1ZXMucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIG8udHlwZXMgPSBfLmlzQXJyYXkodi50eXBlcykgPyB2LnR5cGVzLnNsaWNlKDApIDogdW5kZWZpbmVkO1xuICAgICAgICBvLmNvbHVtbk5hbWVzID0gXy5pc0FycmF5KHYuY29sdW1uTmFtZXMpID8gdi5jb2x1bW5OYW1lcy5zbGljZSgwKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgIH1cblxuICAgICAgaWYgKF8uaXNBcnJheSh2KSAmJiB2Lmxlbmd0aD4wKSB7XG4gICAgICAgIHZhciBkb2l0ID0gdHJ1ZTtcbiAgICAgICAgZm9yKHZhciByIGluIHYpIHtcbiAgICAgICAgICBpZiAoIV8uaXNBcnJheSh2W3JdKSkge1xuICAgICAgICAgICAgZG9pdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGMgaW4gKHZbcl0pKSB7XG4gICAgICAgICAgICBpZiAoIWlzUHJpbWl0aXZlVHlwZSh2W3JdW2NdKSkge1xuICAgICAgICAgICAgICBkb2l0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9pdCAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciBvID0ge31cbiAgICAgICAgICBvLnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICAgIG8udmFsdWVzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtIGluIHZbaV0pXG4gICAgICAgICAgICAgIHJvdy5wdXNoKHRyYW5zZm9ybSh2W2ldW2l0ZW1dLCB0cnVlKSk7XG4gICAgICAgICAgICBvLnZhbHVlcy5wdXNoKHJvdyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG8uc3VidHlwZSA9IFwiTWF0cml4XCI7XG4gICAgICAgICAgby5jb2x1bW5OYW1lcyA9IFtdO1xuICAgICAgICAgIG8udHlwZXMgPSBbXTtcbiAgICAgICAgICBmb3IodmFyIGkgaW4gdlswXSkge1xuICAgICAgICAgICAgby5jb2x1bW5OYW1lcy5wdXNoKCdjJytpKTtcbiAgICAgICAgICAgIG8udHlwZXMucHVzaChnZXREYXRhVHlwZSh2WzBdW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvaXQgPSB0cnVlO1xuICAgICAgICAgIGZvcih2YXIgciBpbiB2KSB7XG4gICAgICAgICAgICBpZiAoIWlzRGljdGlvbmFyeSh2W3JdKSkge1xuICAgICAgICAgICAgICBkb2l0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZG9pdCAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgICAgIG8udHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgICAgICBvLnN1YnR5cGUgPSBcIkxpc3RPZk1hcHNcIjtcbiAgICAgICAgICAgIG8uY29sdW1uTmFtZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdikge1xuICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIHZbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoby5jb2x1bW5OYW1lcy5pbmRleE9mKGopPDApXG4gICAgICAgICAgICAgICAgICBvLmNvbHVtbk5hbWVzLnB1c2goaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8udmFsdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICAgICAgdmFyIG8yID0gW107XG4gICAgICAgICAgICAgIGZvciAodmFyIGogaW4gby5jb2x1bW5OYW1lcykge1xuICAgICAgICAgICAgICAgIHZhciBuID0gby5jb2x1bW5OYW1lc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAodltpXVtuXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgbzIucHVzaCh0cmFuc2Zvcm0odltpXVtuXSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIG8yLnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgby52YWx1ZXMucHVzaChvMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnR5cGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqIGluIG8uY29sdW1uTmFtZXMpIHtcbiAgICAgICAgICAgICAgdmFyIG4gPSBvLmNvbHVtbk5hbWVzW2pdO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodltpXVtuXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBvLnR5cGVzLnB1c2goZ2V0RGF0YVR5cGUodltpXVtuXSkpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKF8uaXNBcnJheSh2KSkge1xuICAgICAgICB2YXIgbyA9IFtdO1xuICAgICAgICBmb3IodmFyIHAgaW4gdikge1xuICAgICAgICAgIG8ucHVzaCh0cmFuc2Zvcm0odltwXSwgdHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfVxuXG4gICAgICBpZiAoXy5pc09iamVjdCh2KSAmJiBpc0RpY3Rpb25hcnkodikgJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICBvLnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICBvLnZhbHVlcyA9IFtdO1xuICAgICAgICBvLnN1YnR5cGUgPSBcIkRpY3Rpb25hcnlcIjtcbiAgICAgICAgby5jb2x1bW5OYW1lcz0gWydLZXknLCdWYWx1ZSddO1xuICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICB2YXIgciA9IFtdO1xuICAgICAgICAgIHIucHVzaChpKTtcbiAgICAgICAgICByLnB1c2godHJhbnNmb3JtKHZbaV0sdHJ1ZSkpO1xuICAgICAgICAgIG8udmFsdWVzLnB1c2gocik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG87XG4gICAgICB9XG4gICAgICB2YXIgbyA9IHt9O1xuICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgb1twXSA9IHRyYW5zZm9ybSh2W3BdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1CYWNrKHYpIHtcbiAgICAgIGlmKHYgPT09IHVuZGVmaW5lZCB8fCAoIV8uaXNPYmplY3QodikgJiYgIV8uaXNBcnJheSh2KSkpXG4gICAgICAgIHJldHVybiB2O1xuXG4gICAgICBpZiAodi50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHYudHlwZSA9PT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IERhdGUodi50aW1lc3RhbXApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2LnR5cGUgPT09IFwiVGFibGVEaXNwbGF5XCIpIHtcbiAgICAgICAgICBpZiAodi5zdWJ0eXBlID09PSBcIkRpY3Rpb25hcnlcIikge1xuICAgICAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICAgICAgZm9yICh2YXIgciBpbiB2LnZhbHVlcykge1xuICAgICAgICAgICAgICBvW3YudmFsdWVzW3JdWzBdXSA9IHRyYW5zZm9ybUJhY2sodi52YWx1ZXNbcl1bMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2LnN1YnR5cGUgPT09IFwiTWF0cml4XCIpIHtcbiAgICAgICAgICAgIHZhciBvID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHYudmFsdWVzKSB7XG4gICAgICAgICAgICAgIG8ucHVzaCh2LnZhbHVlc1tpXS5zbGljZSgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHYuc3VidHlwZSA9PT0gXCJMaXN0T2ZNYXBzXCIpIHtcbiAgICAgICAgICAgIHZhciBvdXQyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciByIGluIHYudmFsdWVzKSB7XG4gICAgICAgICAgICAgIHZhciBvdXQzID0geyB9O1xuICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8di52YWx1ZXNbcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodi52YWx1ZXNbcl1baV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICBvdXQzWyB2LmNvbHVtbk5hbWVzW2ldIF0gPSB0cmFuc2Zvcm1CYWNrKHYudmFsdWVzW3JdW2ldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvdXQyLnB1c2gob3V0Myk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3V0MjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG91dCA9IG5ldyBEYXRhRnJhbWUodik7XG4gICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodi50eXBlID09PSBcIkltYWdlSWNvblwiKVxuICAgICAgICAgIHJldHVybiBuZXcgSW1hZ2VJY29uKHYpO1xuICAgICAgfVxuICAgICAgaWYgKCFfLmlzQXJyYXkodikpIHtcbiAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgICBvW3BdID0gdHJhbnNmb3JtQmFjayh2W3BdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICAgIH1cbiAgICAgIHZhciBvID0gW107XG4gICAgICBmb3IodmFyIHAgaW4gdikge1xuICAgICAgICBvLnB1c2godHJhbnNmb3JtQmFjayh2W3BdKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG5cbiAgICB2YXIgX25vdGVib29rVXJpID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIERFRkFVTFRfVkFMVUUgPSBudWxsO1xuICAgICAgdmFyIF92ID0gREVGQVVMVF9WQUxVRTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLnNldChERUZBVUxUX1ZBTFVFKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3Y7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgIF92ID0gdjtcbiAgICAgICAgICBpZiAoIV8uaXNFbXB0eShfdikpIHtcbiAgICAgICAgICAgIGJrUmVjZW50TWVudS5yZWNvcmRSZWNlbnREb2N1bWVudChnZW5lcmF0ZVJlY2VudERvY3VtZW50SXRlbSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHZhciBfdXJpVHlwZSA9IG51bGw7XG4gICAgdmFyIF9yZWFkT25seSA9IG51bGw7XG4gICAgdmFyIF9mb3JtYXQgPSBudWxsO1xuICAgIHZhciBfc2Vzc2lvbklkID0gbnVsbDtcbiAgICB2YXIgX2VkaXRlZCA9IGZhbHNlO1xuXG4gICAgdmFyIEJlYWtlck9iamVjdCA9IGZ1bmN0aW9uKG5ibW9kZWwpIHtcbiAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzID0geyB9O1xuICAgICAgdGhpcy5nZXRDYWNoZSA9IHsgfTtcbiAgICAgIHRoaXMuc2V0Q2FjaGUgPSB7IH07XG4gICAgICB0aGlzLmJlYWtlck9iaiA9IHsgfVxuICAgICAgdGhpcy5uYm1vZGVsID0gbmJtb2RlbDtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5zZXR1cEJlYWtlck9iamVjdCA9IGZ1bmN0aW9uKG1vZGVsT3V0cHV0KSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLmJlYWtlck9iai5zaG93UHJvZ3Jlc3NVcGRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzaG93UHJvZ3Jlc3NVcGRhdGUnLCB7IHZhbHVlOiBmdW5jdGlvbiAoYSxiLGMpIHtcbiAgICAgICAgICBpZiAoIGEgPT09IHVuZGVmaW5lZCB8fCBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGlmICggdHlwZW9mIGEgPT09ICdzdHJpbmcnIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gYTtcbiAgICAgICAgICBlbHNlIGlmICggdHlwZW9mIGEgPT09ICdudW1iZXInIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wcm9ncmVzc0JhciA9IGE7XG4gICAgICAgICAgZWxzZSBpZiAoIGEgIT09IG51bGwgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnBheWxvYWQgPSBhO1xuXG4gICAgICAgICAgaWYgKCB0eXBlb2YgYiA9PT0gJ3N0cmluZycgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgPSBiO1xuICAgICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgYiA9PT0gJ251bWJlcicgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnByb2dyZXNzQmFyID0gYjtcbiAgICAgICAgICBlbHNlIGlmICggYiAhPT0gbnVsbCApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucGF5bG9hZCA9IGI7XG5cbiAgICAgICAgICBpZiAoIHR5cGVvZiBjID09PSAnc3RyaW5nJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QubWVzc2FnZSA9IGM7XG4gICAgICAgICAgZWxzZSBpZiAoIHR5cGVvZiBjID09PSAnbnVtYmVyJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgPSBjO1xuICAgICAgICAgIGVsc2UgaWYgKCBjICE9PSBudWxsIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wYXlsb2FkID0gYztcbiAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzaG93U3RhdHVzJywgeyB2YWx1ZTogYmtIZWxwZXIuc2hvd1N0YXR1cywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnY2xlYXJTdGF0dXMnLCB7IHZhbHVlOiBia0hlbHBlci5jbGVhclN0YXR1cywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2hvd1RyYW5zaWVudFN0YXR1cycsIHsgdmFsdWU6IGJrSGVscGVyLnNob3dUcmFuc2llbnRTdGF0dXMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2dldEV2YWx1YXRvcnMnLCB7IHZhbHVlOiBia0hlbHBlci5nZXRFdmFsdWF0b3JzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdnZXRDb2RlQ2VsbHMnLCB7IHZhbHVlOiBia0hlbHBlci5nZXRDb2RlQ2VsbHMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3NldENvZGVDZWxsQm9keScsIHsgdmFsdWU6IGJrSGVscGVyLnNldENvZGVDZWxsQm9keSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2V0Q29kZUNlbGxFdmFsdWF0b3InLCB7IHZhbHVlOiBia0hlbHBlci5zZXRDb2RlQ2VsbEV2YWx1YXRvciwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2V0Q29kZUNlbGxUYWdzJywgeyB2YWx1ZTogYmtIZWxwZXIuc2V0Q29kZUNlbGxUYWdzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdldmFsdWF0ZScsIHsgdmFsdWU6IGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgIHZhciBkID0gYmtIZWxwZXIubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHNlbGYuYmVha2VyT2JqZWN0VG9Ob3RlYm9vaygpO1xuICAgICAgICAgICAgYmtIZWxwZXIuZXZhbHVhdGUoYSkudGhlbihmdW5jdGlvbiAocikgeyBzZWxmLm5vdGVib29rVG9CZWFrZXJPYmplY3QoKTsgZC5yZXNvbHZlKHRyYW5zZm9ybUJhY2socikpOyB9LCBmdW5jdGlvbiAocikgeyBzZWxmLm5vdGVib29rVG9CZWFrZXJPYmplY3QoKTsgZC5yZWplY3Qocik7IH0pO1xuICAgICAgICAgICAgcmV0dXJuIGQucHJvbWlzZTtcbiAgICAgICAgICB9LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdldmFsdWF0ZUNvZGUnLCB7IHZhbHVlOiBmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICB2YXIgZCA9IGJrSGVscGVyLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBzZWxmLmJlYWtlck9iamVjdFRvTm90ZWJvb2soKTtcbiAgICAgICAgICAgIGJrSGVscGVyLmV2YWx1YXRlQ29kZShhLGIpLnRoZW4oZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVzb2x2ZSh0cmFuc2Zvcm1CYWNrKHIpKTsgfSwgZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVqZWN0KHIpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBkLnByb21pc2U7XG4gICAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAncHJpbnQnLCB7dmFsdWU6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgYmtIZWxwZXIucmVjZWl2ZUV2YWx1YXRpb25VcGRhdGUoc2VsZi5fYmVha2VyX21vZGVsX291dHB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3V0cHV0ZGF0YTpbe3R5cGU6J291dCcsIHZhbHVlOiBpbnB1dCtcIlxcblwifV19LCBcIkphdmFTY3JpcHRcIik7XG4gICAgICAgICAgLy8gWFhYIHNob3VsZCBub3QgYmUgbmVlZGVkIGJ1dCB3aGVuIHByb2dyZXNzIG1ldGVyIGlzIHNob3duIGF0IHNhbWUgdGltZVxuICAgICAgICAgIC8vIGRpc3BsYXkgaXMgYnJva2VuIHdpdGhvdXQgdGhpcywgeW91IGdldCBcIk9VVFBVVFwiIGluc3RlYWQgb2YgYW55IGxpbmVzIG9mIHRleHQuXG4gICAgICAgICAgYmtIZWxwZXIucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdwcmludEVycm9yJywge3ZhbHVlOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICAgIGJrSGVscGVyLnJlY2VpdmVFdmFsdWF0aW9uVXBkYXRlKHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge291dHB1dGRhdGE6W3t0eXBlOidlcnInLCB2YWx1ZTogaW5wdXQrXCJcXG5cIn1dfSwgXCJKYXZhU2NyaXB0XCIpO1xuICAgICAgICAgIC8vIFhYWCBzaG91bGQgbm90IGJlIG5lZWRlZCBidXQgd2hlbiBwcm9ncmVzcyBtZXRlciBpcyBzaG93biBhdCBzYW1lIHRpbWVcbiAgICAgICAgICAvLyBkaXNwbGF5IGlzIGJyb2tlbiB3aXRob3V0IHRoaXMsIHlvdSBnZXQgXCJPVVRQVVRcIiBpbnN0ZWFkIG9mIGFueSBsaW5lcyBvZiB0ZXh0LlxuICAgICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnbG9hZEpTJywgeyB2YWx1ZTogYmtIZWxwZXIubG9hZEpTLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdsb2FkQ1NTJywgeyB2YWx1ZTogYmtIZWxwZXIubG9hZENTUywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnbG9hZExpc3QnLCB7IHZhbHVlOiBia0hlbHBlci5sb2FkTGlzdCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnaHR0cEdldCcsIHsgdmFsdWU6IGJrSGVscGVyLmh0dHBHZXQsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2h0dHBQb3N0JywgeyB2YWx1ZTogYmtIZWxwZXIuaHR0cFBvc3QsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ25ld0RlZmVycmVkJywgeyB2YWx1ZTogYmtIZWxwZXIubmV3RGVmZXJyZWQsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ25ld1Byb21pc2UnLCB7IHZhbHVlOiBia0hlbHBlci5uZXdQcm9taXNlLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdhbGwnLCB7IHZhbHVlOiBia0hlbHBlci5hbGwsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3RpbWVvdXQnLCB7IHZhbHVlOiBia0hlbHBlci50aW1lb3V0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdEYXRhRnJhbWUnLCB7IHZhbHVlOiBEYXRhRnJhbWUsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ0ltYWdlSWNvbicsIHsgdmFsdWU6IEltYWdlSWNvbiwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5wcmVkZWZpbmVkID0gT2JqZWN0LmtleXModGhpcy5iZWFrZXJPYmopO1xuICAgICAgfVxuICAgICAgdGhpcy5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQgPSBtb2RlbE91dHB1dC5yZXN1bHQ7IC8vIFhYWCBvYnZpYXRlZCBieSBuZXh0IGxpbmVcbiAgICAgIHRoaXMuX2JlYWtlcl9tb2RlbF9vdXRwdXQgPSBtb2RlbE91dHB1dDtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5jbGVhck91dHB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0ID0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLmJlYWtlckdldHRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGlmICh0aGlzLnNldENhY2hlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q2FjaGVbbmFtZV07XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXRDYWNoZVtuYW1lXSA9PT0gdW5kZWZpbmVkICYmIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5nZXRDYWNoZVtuYW1lXSA9IHRyYW5zZm9ybUJhY2sodGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtuYW1lXSk7XG4gICAgICAvLyB0aGlzIGlzIHJlcXVpcmVkIHRvIHN1cHBvcnQgc3Vib2JqZWN0IG1vZGlmaWNhdGlvblxuICAgICAgdGhpcy5zZXRDYWNoZVtuYW1lXSA9IHRoaXMuZ2V0Q2FjaGVbbmFtZV07XG4gICAgICByZXR1cm4gdGhpcy5nZXRDYWNoZVtuYW1lXTtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5iZWFrZXJTZXR0ZXIgPSBmdW5jdGlvbihuYW1lLCB2KSB7XG4gICAgICB0aGlzLnNldENhY2hlW25hbWVdID0gdjtcbiAgICAgIGlmICh0aGlzLmJlYWtlclNldHRlclRpbWVvdXQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYmtIZWxwZXIuY2FuY2VsVGltZW91dCh0aGlzLmJlYWtlclNldHRlclRpbWVvdXQpO1xuICAgICAgdmFyIG1ha2VUaW1lb3V0ID0gZnVuY3Rpb24oc2VsZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5iZWFrZXJTZXR0ZXJUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHNlbGYuYmVha2VyT2JqZWN0VG9Ob3RlYm9vaygpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHRoaXMuYmVha2VyU2V0dGVyVGltZW91dCA9IGJrSGVscGVyLnRpbWVvdXQobWFrZVRpbWVvdXQodGhpcyksNTAwKTtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5ub3RlYm9va1RvQmVha2VyT2JqZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjbGVhciBnZXRjYWNoZVxuICAgICAgdGhpcy5nZXRDYWNoZSA9IHsgfTtcblxuICAgICAgLy8gY2hlY2sgaWYgc29tZSBvdGhlciBsYW5ndWFnZSByZW1vdmVkIGEgYmluZGluZ1xuICAgICAgZm9yICh2YXIgcCBpbiB0aGlzLmtub3duQmVha2VyVmFycykge1xuICAgICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmtub3duQmVha2VyVmFyc1twXTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5iZWFrZXJPYmpbcF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuc2V0Q2FjaGVbcF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgc29tZSBvdGhlciBsYW5ndWFnZSBhZGRlZCBhIGJpbmRpbmdcbiAgICAgIGlmICh0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlKSB7XG4gICAgICAgICAgdmFyIHQgPSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgIGlmICh0aGlzLnByZWRlZmluZWQuaW5kZXhPZihwKT49MCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF07XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5iZWFrZXJPYmpbcF07XG4gICAgICAgICAgICB0aGlzLmtub3duQmVha2VyVmFyc1twXSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbWFrZUdldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2VsZi5iZWFrZXJHZXR0ZXIobmFtZSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYWtlU2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odikgeyBzZWxmLmJlYWtlclNldHRlcihuYW1lLHYpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosIHAsXG4gICAgICAgICAgICAgICAgeyB3cml0ZWFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBnZXQ6IG1ha2VHZXR0ZXIodGhpcywgcCksXG4gICAgICAgICAgICAgICAgICBzZXQ6IG1ha2VTZXR0ZXIodGhpcywgcCksXG4gICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuYmVha2VyT2JqZWN0VG9Ob3RlYm9vayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmJlYWtlck9iaik7XG4gICAgICB2YXIgc3R1ZmYgPSBPYmplY3Qua2V5cyh0aGlzLmtub3duQmVha2VyVmFycyk7XG4gICAgICB2YXIgZGlmZiA9ICQoa2V5cykubm90KHN0dWZmKS5nZXQoKTtcbiAgICAgIGRpZmYgPSAkKGRpZmYpLm5vdCh0aGlzLnByZWRlZmluZWQpLmdldCgpO1xuXG4gICAgICAvLyBjaGVjayBpZiBqYXZhc2NyaXB0IHJlbW92ZWQgYSBiaW5kaW5nXG4gICAgICBpZiAoIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlKSB7XG4gICAgICAgICAgaWYgKHRoaXMua25vd25CZWFrZXJWYXJzW3BdICE9PSB1bmRlZmluZWQgJiYga2V5cy5pbmRleE9mKHApIDwwKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtub3duQmVha2VyVmFyc1twXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgamF2YXNjcmlwdCBzZXQgYW55IE5FVyB2YXJpYWJsZVxuICAgICAgZm9yICh2YXIgaSBpbiBkaWZmKSB7XG4gICAgICAgIHZhciBwID0gZGlmZltpXTtcbiAgICAgICAgaWYgKHRoaXMua25vd25CZWFrZXJWYXJzW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSA9IHsgfTtcbiAgICAgICAgICB2YXIgdCA9IHRoaXMuYmVha2VyT2JqW3BdO1xuICAgICAgICAgIGlmICgodGhpcy5wcmVkZWZpbmVkLmluZGV4T2YocCk+PTAgfHwgXy5pc0Z1bmN0aW9uKHQpKSkge1xuICAgICAgICAgICAgLy8gd2UgZG8gTk9UIHB1dCBmdW5jdGlvbnMgaW4gdGhlIG5hbWVzcGFjZVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5rbm93bkJlYWtlclZhcnNbcF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FjaGVbcF0gPSB0O1xuICAgICAgICAgICAgdGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG1ha2VHZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHNlbGYuYmVha2VyR2V0dGVyKG5hbWUpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWFrZVNldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHsgc2VsZi5iZWFrZXJTZXR0ZXIobmFtZSx2KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCBwLFxuICAgICAgICAgICAgICAgIHsgd3JpdGVhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZ2V0OiBtYWtlR2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBzZXQ6IG1ha2VTZXR0ZXIodGhpcyxwKSxcbiAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgamF2YXNjcmlwdCBzZXQgYW55IG5ldyB2YXJpYWJsZVxuICAgICAgZm9yICh2YXIgcCBpbiB0aGlzLnNldENhY2hlKSB7XG4gICAgICAgIGlmICh0aGlzLm5ibW9kZWwubmFtZXNwYWNlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSA9IHsgfTtcbiAgICAgICAgaWYgKHRoaXMuaXNDaXJjdWxhck9iamVjdCh0aGlzLnNldENhY2hlW3BdKSlcbiAgICAgICAgICB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdID0gXCJFUlJPUjogY2lyY3VsYXIgb2JqZWN0cyBhcmUgbm90IHN1cHBvcnRlZFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXSA9IHRyYW5zZm9ybSh0aGlzLnNldENhY2hlW3BdKTtcbiAgICAgICAgaWYgKHRoaXMua25vd25CZWFrZXJWYXJzW3BdID09PSB1bmRlZmluZWQgJiYgdGhpcy5iZWFrZXJPYmpbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG1ha2VHZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHNlbGYuYmVha2VyR2V0dGVyKG5hbWUpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWFrZVNldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHsgc2VsZi5iZWFrZXJTZXR0ZXIobmFtZSx2KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCBwLFxuICAgICAgICAgICAgICAgIHsgd3JpdGVhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZ2V0OiBtYWtlR2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBzZXQ6IG1ha2VTZXR0ZXIodGhpcyxwKSxcbiAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gY2xlYXIgc2V0Y2FjaGUgYW5kIGdldGNhY2hlXG4gICAgICB0aGlzLnNldENhY2hlID0geyB9O1xuICAgICAgdGhpcy5nZXRDYWNoZSA9IHsgfTtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLmlzQ2lyY3VsYXJPYmplY3QgPSBmdW5jdGlvbihub2RlLCBwYXJlbnRzKSB7XG4gICAgICBwYXJlbnRzID0gcGFyZW50cyB8fCBbXTtcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZSAhPSBcIm9iamVjdFwiKXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhub2RlKSwgaSwgdmFsdWU7XG4gICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICBmb3IgKGkgPSBrZXlzLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcbiAgICAgICAgdmFsdWUgPSBub2RlW2tleXNbaV1dO1xuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICBpZiAocGFyZW50cy5pbmRleE9mKHZhbHVlKT49MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmlzQ2lyY3VsYXJPYmplY3QodmFsdWUsIHBhcmVudHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBhcmVudHMucG9wKG5vZGUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgICB2YXIgX2JvID0ge307XG5cbiAgICB2YXIgX25vdGVib29rTW9kZWwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX3YgPSB7fTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLnNldCh7fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF92O1xuICAgICAgICB9LFxuICAgICAgICBnZXRCZWFrZXJPYmplY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfYm87XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgIF92ID0gdjtcbiAgICAgICAgICAvLyB0aGlzIHJlbW92ZXMgbGVnYWN5IGRhdGEgcHJldmlvdXNseSBzYXZlZFxuICAgICAgICAgIGlmIChfdi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIF92Ll9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy9pZiAoX3YubmFtZXNwYWNlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgLy8gIF92Lm5hbWVzcGFjZSA9IHsgfTtcbiAgICAgICAgICBfYm8gPSBuZXcgQmVha2VyT2JqZWN0KF92KTtcbiAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnJlc2V0KFtdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIucmVzZXQoX3YuY2VsbHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF8uaXNFbXB0eShfdik7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIXRoaXMuaXNFbXB0eSgpICYmICEhX3YubG9ja2VkO1xuICAgICAgICB9LFxuICAgICAgICB0b0pzb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBhbmd1bGFyLnRvSnNvbihfdik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQ2xlYW5QcmV0dHlKc29uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvL3N0cmlwIG91dCB0aGUgc2hlbGwgSURzXG4gICAgICAgICAgdmFyIHNoZWxsSWRzID0gXyhfdi5ldmFsdWF0b3JzKS5tYXAoZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICB2YXIgc2hlbGxJZCA9IGV2YWx1YXRvci5zaGVsbElEO1xuICAgICAgICAgICAgZGVsZXRlIGV2YWx1YXRvci5zaGVsbElEO1xuICAgICAgICAgICAgcmV0dXJuIHNoZWxsSWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gZ2VuZXJhdGUgcHJldHR5IEpTT05cbiAgICAgICAgICB2YXIgcHJldHR5SnNvbiA9IGJrVXRpbHMudG9QcmV0dHlKc29uKF92KTtcbiAgICAgICAgICAvLyBwdXQgdGhlIHNoZWxsIElEcyBiYWNrXG4gICAgICAgICAgXyhfdi5ldmFsdWF0b3JzKS5lYWNoKGZ1bmN0aW9uKGV2YWx1YXRvciwgaW5kZXgpIHtcbiAgICAgICAgICAgIGV2YWx1YXRvci5zaGVsbElEID0gc2hlbGxJZHNbaW5kZXhdO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBwcmV0dHlKc29uO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICB2YXIgZ2VuZXJhdGVCYWNrdXBEYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBub3RlYm9va1VyaTogX25vdGVib29rVXJpLmdldCgpLFxuICAgICAgICB1cmlUeXBlOiBfdXJpVHlwZSxcbiAgICAgICAgcmVhZE9ubHk6IF9yZWFkT25seSxcbiAgICAgICAgZm9ybWF0OiBfZm9ybWF0LFxuICAgICAgICBub3RlYm9va01vZGVsSnNvbjogX25vdGVib29rTW9kZWwudG9Kc29uKCksXG4gICAgICAgIGVkaXRlZDogX2VkaXRlZFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBnZW5lcmF0ZVJlY2VudERvY3VtZW50SXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB1cmk6IF9ub3RlYm9va1VyaS5nZXQoKSxcbiAgICAgICAgdHlwZTogXy5pc0VtcHR5KF91cmlUeXBlKSA/IFwiXCIgOiBfdXJpVHlwZSxcbiAgICAgICAgcmVhZE9ubHk6ICEhX3JlYWRPbmx5ID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICBmb3JtYXQ6IF8uaXNFbXB0eShfZm9ybWF0KSA/IFwiXCIgOiBfZm9ybWF0XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFuZ3VsYXIudG9Kc29uKGRhdGEpO1xuICAgIH07XG5cbiAgICB2YXIgZ2VuZXJhdGVTYXZlRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJpVHlwZTogX3VyaVR5cGUsXG4gICAgICAgIG5vdGVib29rVXJpOiBfbm90ZWJvb2tVcmkuZ2V0KCksXG4gICAgICAgIG5vdGVib29rTW9kZWxBc1N0cmluZzogX25vdGVib29rTW9kZWwudG9DbGVhblByZXR0eUpzb24oKVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIF9zdWJzY3JpcHRpb25zID0ge307XG4gICAgdmFyIGNvbm5lY3Rjb250cm9sID0gZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdID1cbiAgICAgICAgICAkLmNvbWV0ZC5zdWJzY3JpYmUoXCIvbm90ZWJvb2tjdHJsL1wiICsgc2Vzc2lvbklkLCBmdW5jdGlvbihyZXEpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gXCJia0hlbHBlci5cIityZXEuZGF0YS5tZXRob2Q7XG4gICAgICAgICAgICAgIHZhciBudW1hcmdzID0gcmVxLmRhdGEubnVtYXJncztcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbnVtYXJnczsgaSsrICkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCggcmVxLmRhdGFbXCJhcmdcIitpXSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBwdWJsaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIHJlcGx5MiA9IHsgc2Vzc2lvbjogc2Vzc2lvbklkIH07XG4gICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZSA9IGV2YWwobmFtZSkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgIGlmKHR5cGVvZiByZXBseTIudmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHJlcGx5Mi52YWx1ZS5wcm9taXNlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcmVwbHkyLnZhbHVlLnByb21pc2UudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlID0gcmVwbHkyLnZhbHVlLnByb21pc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiByZXBseTIudmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgLy8gbXVzdCB3YWl0IGZvciByZXN1bHQgdG8gYmUgcmVhZHlcbiAgICAgICAgICAgICAgICAgIHB1Ymxpc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXBseTIudmFsdWU9cmVzO1xuICAgICAgICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2Uvbm90ZWJvb2tjdHJsL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkocmVwbHkyKSk7XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlPWVycjtcbiAgICAgICAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KHJlcGx5MikpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKHJlcGx5Mi52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgIGlmIChwdWJsaXNoKSB7XG4gICAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KHJlcGx5MikpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDQVRDSCBcIitlcnIpO1xuICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2Uvbm90ZWJvb2tjdHJsL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkoIHsgc2Vzc2lvbjogc2Vzc2lvbklkLCB2YWx1ZTogZmFsc2UgfSApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBkaXNjb25uZWN0Y29udHJvbCA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICBpZiAoc2Vzc2lvbklkKSB7XG4gICAgICAgICAgJC5jb21ldGQudW5zdWJzY3JpYmUoX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXSk7XG4gICAgICAgICAgZGVsZXRlIF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF07XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCkge1xuXG4gICAgICAgIC8vIGJhY2t1cCBleGlzdGluZyBzZXNzaW9uIGlmIGl0J3Mgbm90IGVtcHR5LlxuICAgICAgICBpZiAoX3Nlc3Npb25JZCAmJiAhX25vdGVib29rTW9kZWwuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgYmtTZXNzaW9uLmJhY2t1cChfc2Vzc2lvbklkLCBnZW5lcmF0ZUJhY2t1cERhdGEoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3Nlc3Npb25JZClcbiAgICAgICAgICBkaXNjb25uZWN0Y29udHJvbChfc2Vzc2lvbklkKTtcblxuICAgICAgICBia0V2YWx1YXRvck1hbmFnZXIucmVzZXQoKTtcblxuICAgICAgICAvLyBjaGVjayBpbnB1dHNcbiAgICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgICBzZXNzaW9uSWQgPSBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldFxuICAgICAgICBfdXJpVHlwZSA9IHVyaVR5cGU7XG4gICAgICAgIF9yZWFkT25seSA9IHJlYWRPbmx5O1xuICAgICAgICBfZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICBfbm90ZWJvb2tVcmkuc2V0KG5vdGVib29rVXJpKTtcbiAgICAgICAgX25vdGVib29rTW9kZWwuc2V0KG5vdGVib29rTW9kZWwpO1xuICAgICAgICBfZWRpdGVkID0gISFlZGl0ZWQ7XG4gICAgICAgIF9zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cbiAgICAgICAgYmtOb3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlci5pbml0KHNlc3Npb25JZCwgbm90ZWJvb2tNb2RlbCk7XG4gICAgICAgIGNvbm5lY3Rjb250cm9sKHNlc3Npb25JZCk7XG4gICAgICAgIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpO1xuICAgICAgfSxcbiAgICAgIHNldFNlc3Npb25JZDogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgICAgc2Vzc2lvbklkID0gYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICB9XG4gICAgICAgIF9zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgIHJldHVybiBfc2Vzc2lvbklkO1xuICAgICAgfSxcbiAgICAgIHNldHVwOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQpIHtcblxuICAgICAgICAvLyBjaGVjayBpbnB1dHNcbiAgICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgICBzZXNzaW9uSWQgPSBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldFxuICAgICAgICBfdXJpVHlwZSA9IHVyaVR5cGU7XG4gICAgICAgIF9yZWFkT25seSA9IHJlYWRPbmx5O1xuICAgICAgICBfZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICBfbm90ZWJvb2tVcmkuc2V0KG5vdGVib29rVXJpKTtcbiAgICAgICAgX25vdGVib29rTW9kZWwuc2V0KG5vdGVib29rTW9kZWwpO1xuICAgICAgICBfZWRpdGVkID0gISFlZGl0ZWQ7XG4gICAgICAgIF9zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cbiAgICAgICAgYmtOb3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlci5pbml0KHNlc3Npb25JZCwgbm90ZWJvb2tNb2RlbCk7XG4gICAgICAgIGNvbm5lY3Rjb250cm9sKHNlc3Npb25JZCk7XG4gICAgICAgIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpO1xuICAgICAgfSxcbiAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZGlzY29ubmVjdGNvbnRyb2woX3Nlc3Npb25JZCk7XG4gICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlci5yZXNldCgpO1xuICAgICAgICBia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyLmNsZWFyKF9zZXNzaW9uSWQpO1xuICAgICAgICBfbm90ZWJvb2tVcmkucmVzZXQoKTtcbiAgICAgICAgX3VyaVR5cGUgPSBudWxsO1xuICAgICAgICBfcmVhZE9ubHkgPSBudWxsO1xuICAgICAgICBfZm9ybWF0ID0gbnVsbDtcbiAgICAgICAgX25vdGVib29rTW9kZWwucmVzZXQoKTtcbiAgICAgICAgX3Nlc3Npb25JZCA9IG51bGw7XG4gICAgICAgIF9lZGl0ZWQgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLmV4aXRBbmRSZW1vdmVBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgc2VsZi5jbGVhcigpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoX3Nlc3Npb25JZCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb24uY2xvc2UoX3Nlc3Npb25JZCkudGhlbihjbG9zZSk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJhY2t1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfc2Vzc2lvbklkICYmICFfbm90ZWJvb2tNb2RlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uLmJhY2t1cChfc2Vzc2lvbklkLCBnZW5lcmF0ZUJhY2t1cERhdGEoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMubmV3UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlTm90ZWJvb2tVcmk6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0KSB7XG4gICAgICAgIC8vIHRvIGJlIHVzZWQgYnkgc2F2ZS1hc1xuICAgICAgICBfdXJpVHlwZSA9IHVyaVR5cGU7XG4gICAgICAgIF9yZWFkT25seSA9IHJlYWRPbmx5O1xuICAgICAgICBfZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICBfbm90ZWJvb2tVcmkuc2V0KG5vdGVib29rVXJpKTtcbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va1RpdGxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9ub3RlYm9va1VyaS5nZXQoKSkge1xuICAgICAgICAgIHJldHVybiBfbm90ZWJvb2tVcmkuZ2V0KCkucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIk5ldyBOb3RlYm9va1wiO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNTYXZhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va1VyaSAmJiAhX3JlYWRPbmx5O1xuICAgICAgfSxcbiAgICAgIC8qXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIHRyaWdnZXJzIGFsbCBkaXNwbGF5IGltcGxlbWVudGF0aW9ucyB0byBzYXZlIHRoZSBjdXJyZW50IG91dHB1dCBzdGF0dXMuXG4gICAgICAgKiBUaGlzIHNhdmUgaXMgYXN5bmNocm9ub3VzIGFuZCBoYXBwZW5zIGluIHRoZSBjdXJyZW50IGRpZ2VzdCBsb29wLlxuICAgICAgICogVXNlcnMgbXVzdCBzY2hlZHVsZSBhIHRpbWVvdXQgdG8gZXhlY3V0ZSBjb2RlIHRoYXQgcmVxdWlyZXMgdGhlIGR1bXBlZCBzdGF0ZS5cbiAgICAgICAqL1xuICAgICAgZHVtcERpc3BsYXlTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdldE5vdGVib29rQ2VsbE9wKCkuZHVtcERpc3BsYXlTdGF0dXMoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgZ2V0U2F2ZURhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVTYXZlRGF0YSgpO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rTW9kZWxBc1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tNb2RlbC50b0pzb24oKTtcbiAgICAgIH0sXG4gICAgICBnZXRSYXdOb3RlYm9va01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmdldCgpO1xuICAgICAgfSxcbiAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tNb2RlbC5nZXRCZWFrZXJPYmplY3QoKTtcbiAgICAgIH0sXG4gICAgICBnZXRTZXNzaW9uSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3Nlc3Npb25JZDtcbiAgICAgIH0sXG4gICAgICBpc1Nlc3Npb25WYWxpZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3Nlc3Npb25JZCkge1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UoXCJmYWxzZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uLmdldFNlc3Npb25zKCkudGhlbihmdW5jdGlvbihzZXNzaW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIF8oc2Vzc2lvbnMpLmNoYWluKCkua2V5cygpLmNvbnRhaW5zKF9zZXNzaW9uSWQpLnZhbHVlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBUT0RPLCBtb3ZlIHRoZSBmb2xsb3dpbmcgaW1wbCB0byBhIGRlZGljYXRlZCBub3RlYm9vayBtb2RlbCBtYW5hZ2VyXG4gICAgICAvLyBidXQgc3RpbGwgZXhwb3NlIGl0IGhlcmVcbiAgICAgIHNldE5vdGVib29rTW9kZWxFZGl0ZWQ6IGZ1bmN0aW9uKGVkaXRlZCkge1xuICAgICAgICBfZWRpdGVkID0gZWRpdGVkO1xuICAgICAgfSxcbiAgICAgIGlzTm90ZWJvb2tNb2RlbEVkaXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZWRpdGVkO1xuICAgICAgfSxcbiAgICAgIGlzTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwuaXNMb2NrZWQoKTtcbiAgICAgIH0sXG4gICAgICB0b2dnbGVOb3RlYm9va0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX25vdGVib29rTW9kZWwuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgaWYgKCFfbm90ZWJvb2tNb2RlbC5pc0xvY2tlZCgpKSB7XG4gICAgICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5sb2NrZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5sb2NrZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIF9lZGl0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdG9yVW51c2VkOiBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgdmFyIG4gPSBfLmZpbmQoX25vdGVib29rTW9kZWwuZ2V0KCkuY2VsbHMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMudHlwZSA9PSBcImNvZGVcIiAmJiBjLmV2YWx1YXRvciA9PSBwbHVnaW47XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gIW47XG4gICAgICB9LFxuICAgICAgYWRkRXZhbHVhdG9yOiBmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuZXZhbHVhdG9ycy5wdXNoKGV2YWx1YXRvcik7XG4gICAgICAgIF9lZGl0ZWQgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUV2YWx1YXRvcjogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IF9ub3RlYm9va01vZGVsLmdldCgpO1xuICAgICAgICBtb2RlbC5ldmFsdWF0b3JzID0gXy5yZWplY3QobW9kZWwuZXZhbHVhdG9ycywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHJldHVybiBlLnBsdWdpbiA9PSBwbHVnaW47XG4gICAgICAgIH0pO1xuICAgICAgICBfZWRpdGVkID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICByZWNvbm5lY3RFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5yZWNvbm5lY3RFdmFsdWF0b3JzKCk7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tDZWxsT3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXI7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tOZXdDZWxsRmFjdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmV3Q29kZUNlbGw6IGZ1bmN0aW9uKGV2YWx1YXRvciwgaWQpIHtcbiAgICAgICAgICAgIGlmICghZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgIGV2YWx1YXRvciA9IF9ub3RlYm9va01vZGVsLmdldCgpLmV2YWx1YXRvcnNbMF0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgaWQgPSBcImNvZGVcIiArIGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIFwiaWRcIjogaWQsXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImNvZGVcIixcbiAgICAgICAgICAgICAgXCJldmFsdWF0b3JcIjogZXZhbHVhdG9yLFxuICAgICAgICAgICAgICBcImlucHV0XCI6IHtcbiAgICAgICAgICAgICAgICBcImJvZHlcIjogXCJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIm91dHB1dFwiOiB7fVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5ld1NlY3Rpb25DZWxsOiBmdW5jdGlvbihsZXZlbCwgdGl0bGUsIGlkKSB7XG4gICAgICAgICAgICBpZiAoIWxldmVsICYmIGxldmVsICE9PSAwKSB7XG4gICAgICAgICAgICAgIGxldmVsID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZXZlbCA8PSAwKSB7XG4gICAgICAgICAgICAgIHRocm93IFwiY3JlYXRpbmcgc2VjdGlvbiBjZWxsIHdpdGggbGV2ZWwgXCIgKyBsZXZlbCArIFwiIGlzIG5vdCBhbGxvd2VkXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRpdGxlKSB7XG4gICAgICAgICAgICAgIHRpdGxlID0gXCJOZXcgU2VjdGlvbiBIXCIgKyBsZXZlbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICBpZCA9IFwic2VjdGlvblwiICsgYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgXCJpZFwiOiBpZCxcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VjdGlvblwiLFxuICAgICAgICAgICAgICBcInRpdGxlXCI6IHRpdGxlLFxuICAgICAgICAgICAgICBcImxldmVsXCI6IGxldmVsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbmV3TWFya2Rvd25DZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgdmFyIHRhaWwgPSBfbm90ZWJvb2tNb2RlbC5nZXQoKS5jZWxscy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICBpZCA9IFwibWFya2Rvd25cIiArIGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIFwiaWRcIjogaWQsXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcIm1hcmtkb3duXCIsXG4gICAgICAgICAgICAgIFwiYm9keVwiOiBcIlwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBpc1Jvb3RDZWxsSW5pdGlhbGl6YXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbDtcbiAgICAgIH0sXG4gICAgICBzZXRSb290Q2VsbEluaXRpYWxpemF0aW9uOiBmdW5jdGlvbihpbml0aWFsaXphdGlvbikge1xuICAgICAgICBpZiAoaW5pdGlhbGl6YXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5pbml0aWFsaXplQWxsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5pbml0aWFsaXplQWxsID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbm90ZWJvb2tNb2RlbEFkZEV2YWx1YXRvcjogZnVuY3Rpb24obmV3RXZhbHVhdG9yKSB7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLmdldCgpLmV2YWx1YXRvcnMucHVzaChuZXdFdmFsdWF0b3IpO1xuICAgICAgfSxcbiAgICAgIG5vdGVib29rTW9kZWxHZXRJbml0aWFsaXphdGlvbkNlbGxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9ub3RlYm9va01vZGVsLmdldCgpLmluaXRpYWxpemVBbGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXROb3RlYm9va0NlbGxPcCgpLmdldEFsbENvZGVDZWxscyhcInJvb3RcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5nZXRJbml0aWFsaXphdGlvbkNlbGxzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1bmRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIudW5kbygpO1xuICAgICAgfSxcbiAgICAgIHJlZG86IGZ1bmN0aW9uKCkge1xuICAgICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlci5yZWRvKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsubm90ZWJvb2tcbiAqIFRoaXMgaXMgdGhlICdub3RlYm9vayB2aWV3JyBwYXJ0IG9mIHtAbGluayBia0FwcH0uIFdoYXQgaXMgdGhlIHJvb3QgY2VsbCBob2xkaW5nIHRoZSBuZXN0ZWRcbiAqIHtAbGluayBia0NlbGx9cy5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycsIFtcbiAgICAnYmsuY29tbW9uVWknLFxuICAgICdiay51dGlscycsXG4gICAgJ2JrLm91dHB1dExvZycsXG4gICAgJ2JrLmNvcmUnLFxuICAgICdiay5zZXNzaW9uTWFuYWdlcicsXG4gICAgJ2JrLmV2YWx1YXRvck1hbmFnZXInLFxuICAgICdiay5jZWxsTWVudVBsdWdpbk1hbmFnZXInLFxuICAgICdiay5vdXRwdXREaXNwbGF5J1xuICBdKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrQ2VsbFxuICogLSB0aGUgY29udHJvbGxlciB0aGF0IHJlc3BvbnNpYmxlIGZvciBkaXJlY3RseSBjaGFuZ2luZyB0aGUgdmlld1xuICogLSB0aGUgY29udGFpbmVyIGZvciBzcGVjaWZpYyB0eXBlZCBjZWxsXG4gKiAtIHRoZSBkaXJlY3RpdmUgaXMgZGVzaWduZWQgdG8gYmUgY2FwYWJsZSBvZiB1c2VkIGluIGEgbmVzdGVkIHdheVxuICogLSBjb25jZXB0dWFsbHksIGEgY2VsbCBpcyAnY2VsbCBtb2RlbCcgKyAndmlldyBtb2RlbCcoYW4gZXhhbXBsZSBvZiB3aGF0IGdvZXMgaW4gdG8gdGhlIHZpZXdcbiAqIG1vZGVsIGlzIGNvZGUgY2VsbCBiZyBjb2xvcilcbiAqIC0gQSBia0NlbGwgaXMgZ2VuZXJpY2FsbHkgY29ycmVzcG9uZHMgdG8gYSBwb3J0aW9uIG9mIHRoZSBub3RlYm9vayBtb2RlbCAoY3VycmVudGx5LCBpdCBpc1xuICogYWx3YXlzIGEgYnJhbmNoIGluIHRoZSBoaWVyYXJjaHkpXG4gKiAtIFdoZW4gZXhwb3J0aW5nIChhLmsuYS4gc2hhcmluZyksIHdlIHdpbGwgbmVlZCBib3RoIHRoZSBjZWxsIG1vZGVsIGFuZCB0aGUgdmlldyBtb2RlbFxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDZWxsJywgZnVuY3Rpb24oYmtVdGlscywgYmtTZXNzaW9uTWFuYWdlciwgYmtDb3JlTWFuYWdlciwgYmtFdmFsdWF0b3JNYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWydtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY2VsbCddKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBjZWxsbW9kZWw6ICc9JyxcbiAgICAgICAgaW5kZXg6ICc9J1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3JSZWFkZXIgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZ2V0QmtCYXNlVmlld01vZGVsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCkuZ2V0Vmlld01vZGVsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBub3RlYm9va0NlbGxPcC5pc0xhc3QoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgJHNjb3BlLmlzTGFyZ2UgPSBuZXdWYWw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldyA9IHtcbiAgICAgICAgICBzaG93RGVidWdJbmZvOiBmYWxzZSxcbiAgICAgICAgICBtZW51OiB7XG4gICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICByZW5hbWVJdGVtOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgIF8uZmluZFdoZXJlKHRoaXMuaXRlbXMsXG4gICAgICAgICAgICAgICAge25hbWU6IG9wdHMubmFtZX1cbiAgICAgICAgICAgICAgKS5uYW1lID0gb3B0cy5uZXdOYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKG1lbnVJdGVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChtZW51SXRlbSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkSXRlbVRvSGVhZDogZnVuY3Rpb24obWVudUl0ZW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoMCwgMCwgbWVudUl0ZW0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUl0ZW06IGZ1bmN0aW9uKGl0ZW1OYW1lKSB7XG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZihfLmZpbmQodGhpcy5pdGVtcywgZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXQubmFtZSA9PT0gaXRlbU5hbWU7XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNMb2NrZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm5ld0NlbGxNZW51Q29uZmlnID0ge1xuICAgICAgICAgIGlzU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIWJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpICYmICFub3RlYm9va0NlbGxPcC5pc0NvbnRhaW5lcigkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGF0dGFjaENlbGw6IGZ1bmN0aW9uKG5ld0NlbGwpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmluc2VydEFmdGVyKCRzY29wZS5jZWxsbW9kZWwuaWQsIG5ld0NlbGwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldkNlbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRGdWxsSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuZ2V0TmVzdGVkTGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuJHBhcmVudC5nZXRGdWxsSW5kZXgoKSArICcuJyArICgkc2NvcGUuaW5kZXggKyAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmluZGV4ICsgJHNjb3BlLmdldE5lc3RlZExldmVsKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZVNob3dEZWJ1Z0luZm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUuY2VsbHZpZXcuc2hvd0RlYnVnSW5mbyA9ICEkc2NvcGUuY2VsbHZpZXcuc2hvd0RlYnVnSW5mbztcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzU2hvd0RlYnVnSW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbHZpZXcuc2hvd0RlYnVnSW5mbztcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzRGVidWdnaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJrQmFzZVZpZXdNb2RlbCgpLmlzRGVidWdnaW5nKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXROZXN0ZWRMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGJrQ2VsbCBpcyB1c2luZyBpc29sYXRlZCBzY29wZSwgJHNjb3BlIGlzIHRoZSBpc29sYXRlZCBzY29wZVxuICAgICAgICAgIC8vICRzY29wZS4kcGFyZW50IGlzIHRoZSBzY29wZSByZXN1bHRlZCBmcm9tIG5nLXJlcGVhdCAobmctcmVwZWF0IGNyZWF0ZXMgYSBwcm90b3R5cGFsXG4gICAgICAgICAgLy8gc2NvcGUgZm9yIGVhY2ggbmctcmVwZWF0ZWQgaXRlbSlcbiAgICAgICAgICAvLyAkU2NvcGUuJHBhcmVudC4kcGFyZW50IGlzIHRoZSBjb250YWluZXIgY2VsbCh3aGljaCBpbml0aWF0ZXMgbmctcmVwZWF0KSBzY29wZVxuICAgICAgICAgIHZhciBwYXJlbnQgPSAkc2NvcGUuJHBhcmVudC4kcGFyZW50O1xuICAgICAgICAgIHJldHVybiBwYXJlbnQuZ2V0TmVzdGVkTGV2ZWwgPyBwYXJlbnQuZ2V0TmVzdGVkTGV2ZWwoKSArIDEgOiAxO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0UGFyZW50SWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuJHBhcmVudC5jZWxsbW9kZWwgPyAkc2NvcGUuJHBhcmVudC4kcGFyZW50LmNlbGxtb2RlbC5pZCA6ICdyb290JztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlQ2VsbElucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuKSB7XG4gICAgICAgICAgICBkZWxldGUgJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmV2YWx1YXRlID0gZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCRldmVudCkge1xuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnN0YXRlID0ge307XG5cbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKClcbiAgICAgICAgICAgIC5ldmFsdWF0ZVJvb3QoJHNjb3BlLmNlbGxtb2RlbClcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZGVsZXRlQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmRlbGV0ZSgkc2NvcGUuY2VsbG1vZGVsLmlkLCB0cnVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRFdmFsdWF0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcigkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVNZXRob2QgPSAnbW92ZSc7XG4gICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLnR5cGUgPT0gJ3NlY3Rpb24nKSB7XG4gICAgICAgICAgbW92ZU1ldGhvZCA9ICdtb3ZlU2VjdGlvbic7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubW92ZUNlbGxVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wW21vdmVNZXRob2QgKyAnVXAnXSgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubW92ZUNlbGxEb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3BbbW92ZU1ldGhvZCArICdEb3duJ10oJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsVXBEaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhbm90ZWJvb2tDZWxsT3BbJ2lzUG9zc2libGVUbycgKyBfLnN0cmluZy5jYXBpdGFsaXplKG1vdmVNZXRob2QpICsgJ1VwJ10oJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsRG93bkRpc2FibGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICFub3RlYm9va0NlbGxPcFsnaXNQb3NzaWJsZVRvJyArIF8uc3RyaW5nLmNhcGl0YWxpemUobW92ZU1ldGhvZCkgKyAnRG93biddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdEZWxldGUgY2VsbCcsXG4gICAgICAgICAgYWN0aW9uOiAkc2NvcGUuZGVsZXRlQ2VsbFxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnTW92ZSB1cCcsXG4gICAgICAgICAgYWN0aW9uOiAkc2NvcGUubW92ZUNlbGxVcCxcbiAgICAgICAgICBkaXNhYmxlZDogJHNjb3BlLm1vdmVDZWxsVXBEaXNhYmxlZFxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnTW92ZSBkb3duJyxcbiAgICAgICAgICBhY3Rpb246ICRzY29wZS5tb3ZlQ2VsbERvd24sXG4gICAgICAgICAgZGlzYWJsZWQ6ICRzY29wZS5tb3ZlQ2VsbERvd25EaXNhYmxlZFxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnQ3V0JyxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AuY3V0KCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ1Bhc3RlIChhcHBlbmQgYWZ0ZXIpJyxcbiAgICAgICAgICBkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIW5vdGVib29rQ2VsbE9wLmNsaXBib2FyZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5wYXN0ZSgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5nZXRUeXBlQ2VsbFVybCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB0eXBlID0gJHNjb3BlLmNlbGxtb2RlbC50eXBlO1xuICAgICAgICAgIHJldHVybiB0eXBlICsgJy1jZWxsLmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0NvZGVDZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwudHlwZSA9PSAnY29kZSc7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb2RlQ2VsbCcsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICAkdGltZW91dCkge1xuXG4gICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICB9O1xuICAgIHZhciBDRUxMX1RZUEUgPSAnY29kZSc7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWydtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGwnXSgpLFxuICAgICAgc2NvcGU6IHtjZWxsbW9kZWw6ICc9JywgY2VsbG1lbnU6ICc9J30sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3ID0ge1xuICAgICAgICAgIGlucHV0TWVudTogW10sXG4gICAgICAgICAgZGlzcGxheXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTG9ja2VkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0VtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEoJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vanNjczpkaXNhYmxlXG4gICAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwgPT09IHVuZGVmaW5lZCB8fCAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dCA9PT0gdW5kZWZpbmVkIHx8ICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL2pzY3M6ZW5hYmxlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHR5cGUgPSAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQuaW5uZXJ0eXBlO1xuXG4gICAgICAgICAgaWYgKCF0eXBlICYmICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdC5wYXlsb2FkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHR5cGUgPSAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQucGF5bG9hZC5pbm5lcnR5cGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHR5cGUgPT0gJ0Vycm9yJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNTaG93SW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmlzTG9ja2VkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICAvLyBlbnN1cmUgY20gcmVmcmVzaGVzIHdoZW4gJ3VuaGlkZSdcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNTaG93SW5wdXQoKScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmICgkc2NvcGUuY20gJiYgbmV3VmFsdWUgPT09IHRydWUgJiYgbmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkc2NvcGUuY20ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuaXNIaWRkZW5PdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuc2VsZWN0ZWRUeXBlID09ICdIaWRkZW4nO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5oYXNPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmJhY2tncm91bmRDbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCEkc2NvcGUuaXNTaG93SW5wdXQoKSB8fCAkKGV2ZW50LnRvRWxlbWVudCkucGFyZW50cygpLmhhc0NsYXNzKCdjb2RlLWNlbGwtb3V0cHV0JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHRvcCA9ICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICB2YXIgb3V0cHV0RWxlbWVudCA9ICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpLmNoaWxkcmVuKCcuY29kZS1jZWxsLW91dHB1dDpmaXJzdCcpO1xuICAgICAgICAgIHZhciBib3R0b207XG4gICAgICAgICAgaWYgKG91dHB1dEVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYm90dG9tID0gb3V0cHV0RWxlbWVudC5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IHRvcCArICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpLmhlaWdodCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBFdmVuIGJldHRlciB3b3VsZCBiZSB0byBkZXRlY3QgbGVmdC9yaWdodCBhbmQgbW92ZSB0b1xuICAgICAgICAgIC8vIGJlZ2lubmluZyBvciBlbmQgb2YgbGluZSwgYnV0IHdlIGNhbiBsaXZlIHdpdGggdGhpcyBmb3Igbm93LlxuICAgICAgICAgIHZhciBjbSA9ICRzY29wZS5jbTtcbiAgICAgICAgICBpZiAoZXZlbnQucGFnZVkgPCAodG9wICsgYm90dG9tKSAvIDIpIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcigwLCAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmxpbmVDb3VudCgpIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbS5nZXRMaW5lKGNtLmxhc3RMaW5lKCkpLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd091dHB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHJlc3VsdCA9ICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5oaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICEocmVzdWx0ID09PSB1bmRlZmluZWQgfHwgcmVzdWx0ID09PSBudWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUub3V0cHV0VGl0bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzRXJyb3IoKSA/ICdFcnJvcicgOiBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5zdGF0ZSA9IHt9O1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5ldmFsdWF0ZVJvb3QoJHNjb3BlLmNlbGxtb2RlbCkuXG4gICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXZhbHVhdGlvbiBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBlZGl0ZWRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pZCcsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmV2YWx1YXRvcicsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uJywgZWRpdGVkTGlzdGVuZXIpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaW5wdXQuYm9keScsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQnLCBlZGl0ZWRMaXN0ZW5lcik7XG5cbiAgICAgICAgJHNjb3BlLmF1dG9jb21wbGV0ZSA9IGZ1bmN0aW9uKGNwb3MsIG9uUmVzdWx0cykge1xuICAgICAgICAgIHZhciBldmFsdWF0b3IgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0RXZhbHVhdG9yKCRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yKTtcbiAgICAgICAgICBpZiAoIWV2YWx1YXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXZhbHVhdG9yLmF1dG9jb21wbGV0ZSkge1xuICAgICAgICAgICAgZXZhbHVhdG9yLmF1dG9jb21wbGV0ZSgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmJvZHksIGNwb3MsIG9uUmVzdWx0cyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmFsdWF0b3IuYXV0b2NvbXBsZXRlMikge1xuICAgICAgICAgICAgLy8gdXNlZCBieSBKYXZhU2NyaXB0IGV2YWx1YXRvclxuICAgICAgICAgICAgZXZhbHVhdG9yLmF1dG9jb21wbGV0ZTIoJHNjb3BlLmNtLCBudWxsLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRFdmFsdWF0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcigkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcik7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS51cGRhdGVVSSA9IGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgIGlmICgkc2NvcGUuY20gJiYgZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAkc2NvcGUuY20uc2V0T3B0aW9uKCdtb2RlJywgZXZhbHVhdG9yLmNtTW9kZSk7XG4gICAgICAgICAgICBpZiAoZXZhbHVhdG9yLmluZGVudFNwYWNlcykge1xuICAgICAgICAgICAgICAkc2NvcGUuY20uc2V0T3B0aW9uKCdpbmRlbnRVbml0JywgZXZhbHVhdG9yLmluZGVudFNwYWNlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3JSZWFkZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRFdmFsdWF0b3IoKScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICRzY29wZS51cGRhdGVVSShuZXdWYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuYXBwZW5kQ29kZUNlbGwgPSBmdW5jdGlvbihldmFsdWF0b3JOYW1lKSB7XG4gICAgICAgICAgdmFyIHRoaXNDZWxsSWQgPSAkc2NvcGUuY2VsbG1vZGVsLmlkO1xuICAgICAgICAgIGlmICghZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgICAgLy8gaWYgbm8gZXZhbHVhdG9yIHNwZWNpZmllZCwgdXNlIHRoZSBjdXJyZW50IGV2YWx1YXRvclxuICAgICAgICAgICAgZXZhbHVhdG9yTmFtZSA9ICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tOZXdDZWxsRmFjdG9yeSgpLm5ld0NvZGVDZWxsKGV2YWx1YXRvck5hbWUpO1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmFwcGVuZEFmdGVyKHRoaXNDZWxsSWQsIG5ld0NlbGwpO1xuICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVNZW51UGx1Z2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihDRUxMX1RZUEUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hhcmVNZW51ID0ge1xuICAgICAgICAgIG5hbWU6ICdTaGFyZScsXG4gICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHNoYXJlTWVudSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2dldFNoYXJlTWVudVBsdWdpbigpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcmVNZW51Lml0ZW1zID0gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudUl0ZW1zKENFTExfVFlQRSwgJHNjb3BlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGxtZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdTaG93IGlucHV0IGNlbGwnLFxuICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gISRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbikge1xuICAgICAgICAgICAgICBkZWxldGUgJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmNlbGxtZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdTaG93IG91dHB1dCBjZWxsIChpZiBhdmFpbGFibGUpJyxcbiAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW47XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbikge1xuICAgICAgICAgICAgICBkZWxldGUgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnSW5pdGlhbGl6YXRpb24gQ2VsbCcsXG4gICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnT3B0aW9ucycsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvd0Z1bGxNb2RhbERpYWxvZyhmdW5jdGlvbiBjYihyKSB7IH0gLFxuICAgICAgICAgICAgICAgICdhcHAvbWFpbmFwcC9kaWFsb2dzL2NvZGVjZWxsb3B0aW9ucy5qc3QuaHRtbCcsICdDb2RlQ2VsbE9wdGlvbnNDb250cm9sbGVyJywgJHNjb3BlLmNlbGxtb2RlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBzY29wZS5zaG93RGVidWcgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBpc0Z1bGxTY3JlZW4oY20pIHtcbiAgICAgICAgICByZXR1cm4gL1xcYkNvZGVNaXJyb3ItZnVsbHNjcmVlblxcYi8udGVzdChjbS5nZXRXcmFwcGVyRWxlbWVudCgpLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3aW5IZWlnaHQoKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpLmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldEZ1bGxTY3JlZW4oY20sIGZ1bGwpIHtcbiAgICAgICAgICB2YXIgd3JhcCA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCk7XG4gICAgICAgICAgaWYgKGZ1bGwpIHtcbiAgICAgICAgICAgIHdyYXAuY2xhc3NOYW1lICs9ICcgQ29kZU1pcnJvci1mdWxsc2NyZWVuJztcbiAgICAgICAgICAgIHdyYXAuc3R5bGUuaGVpZ2h0ID0gd2luSGVpZ2h0KCkgKyAncHgnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdyYXAuY2xhc3NOYW1lID0gd3JhcC5jbGFzc05hbWUucmVwbGFjZSgnIENvZGVNaXJyb3ItZnVsbHNjcmVlbicsICcnKTtcbiAgICAgICAgICAgIHdyYXAuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgICAgY20ucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXNpemVIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHNob3dpbmcgPSBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0NvZGVNaXJyb3ItZnVsbHNjcmVlbicpWzBdO1xuICAgICAgICAgIGlmICghc2hvd2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93aW5nLkNvZGVNaXJyb3IuZ2V0V3JhcHBlckVsZW1lbnQoKS5zdHlsZS5oZWlnaHQgPSB3aW5IZWlnaHQoKSArICdweCc7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY20uZm9jdXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29kZU1pcnJvci5vbih3aW5kb3csICdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcblxuICAgICAgICB2YXIgY29kZU1pcnJvck9wdGlvbnMgPSBia0NvcmVNYW5hZ2VyLmNvZGVNaXJyb3JPcHRpb25zKHNjb3BlLCBub3RlYm9va0NlbGxPcCk7XG4gICAgICAgIF8uZXh0ZW5kKGNvZGVNaXJyb3JPcHRpb25zLmV4dHJhS2V5cywge1xuICAgICAgICAgICdFc2MnIDogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKCdzaW5nbGVTZWxlY3Rpb24nKTtcbiAgICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0gJiYgY20uc3RhdGUudmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGlzRnVsbFNjcmVlbihjbSkpIHtcbiAgICAgICAgICAgICAgICBzZXRGdWxsU2NyZWVuKGNtLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdBbHQtRjExJzogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIHNldEZ1bGxTY3JlZW4oY20sICFpc0Z1bGxTY3JlZW4oY20pKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DdHJsLUEnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUuYXBwZW5kQ29kZUNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DbWQtQSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzY29wZS5hcHBlbmRDb2RlQ2VsbCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1NoaWZ0LUN0cmwtRSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzY29wZS5wb3B1cE1lbnUoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLmlucHV0Y2VsbG1lbnUnKS5maW5kKCdsaScpLmZpbmQoJ2EnKVswXS5mb2N1cygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1NoaWZ0LUNtZC1FJzogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIHNjb3BlLnBvcHVwTWVudSgpO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcuaW5wdXRjZWxsbWVudScpLmZpbmQoJ2xpJykuZmluZCgnYScpWzBdLmZvY3VzKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQ3RybC1BbHQtSCc6IGZ1bmN0aW9uKGNtKSB7IC8vIGNlbGwgaGlkZVxuICAgICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdDbWQtQWx0LUgnOiBmdW5jdGlvbihjbSkgeyAvLyBjZWxsIGhpZGVcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBTY3JvbGxpbi50cmFjayhlbGVtZW50WzBdLCB7aGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY20gPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShlbGVtZW50LmZpbmQoJ3RleHRhcmVhJylbMF0sIGNvZGVNaXJyb3JPcHRpb25zKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rLnJlZ2lzdGVyQ00oc2NvcGUuY2VsbG1vZGVsLmlkLCBzY29wZS5jbSk7XG4gICAgICAgICAgc2NvcGUuY20ub24oJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgIHNjb3BlLnVwZGF0ZVVJKHNjb3BlLmdldEV2YWx1YXRvcigpKTtcbiAgICAgICAgICAvLyBTaW5jZSB0aGUgaW5zdGFudGlhdGlvbiBvZiBjb2RlbWlycm9yIGluc3RhbmNlcyBpcyBub3cgbGF6eSxcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHRyYWNrIGFuZCBoYW5kbGUgZm9jdXNpbmcgb24gYW4gYXN5bmMgY2VsbCBhZGRcbiAgICAgICAgICBpZiAoc2NvcGUuX3Nob3VsZEZvY3VzQ29kZU1pcnJvcikge1xuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLl9zaG91bGRGb2N1c0NvZGVNaXJyb3I7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuY20uZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19KTtcblxuICAgICAgICBzY29wZS5ia05vdGVib29rLnJlZ2lzdGVyRm9jdXNhYmxlKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUpO1xuXG4gICAgICAgIC8vIGNlbGxtb2RlbC5ib2R5IC0tPiBDb2RlTWlycm9yXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmlucHV0LmJvZHknLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChzY29wZS5jbSAmJiBuZXdWYWwgIT09IHNjb3BlLmNtLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgbmV3VmFsID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5jbS5zZXRWYWx1ZShuZXdWYWwpO1xuICAgICAgICAgICAgc2NvcGUuY20uY2xlYXJIaXN0b3J5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2VsbG1vZGVsLmJvZHkgPC0tIENvZGVNaXJyb3JcbiAgICAgICAgdmFyIGNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbihjbSwgZSkge1xuICAgICAgICAgIGlmIChzY29wZS5jZWxsbW9kZWwuaW5wdXQuYm9keSAhPT0gY20uZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmxpbmVDb3VudCA9IGNtLmxpbmVDb3VudCgpO1xuICAgICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmlucHV0LmJvZHkgPSBjbS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKCFia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpbnB1dE1lbnVEaXYgPSBlbGVtZW50LmZpbmQoJy5ia2NlbGwnKS5maXJzdCgpO1xuICAgICAgICBzY29wZS5wb3B1cE1lbnUgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHZhciBtZW51ID0gaW5wdXRNZW51RGl2LmZpbmQoJy5kcm9wZG93bicpLmZpcnN0KCk7XG4gICAgICAgICAgbWVudS5maW5kKCcuZHJvcGRvd24tdG9nZ2xlJykuZmlyc3QoKS5kcm9wZG93bigndG9nZ2xlJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5ia2NlbGwnKS5hZGRDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5ia2NlbGwnKS5yZW1vdmVDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ2lzSW5pdGlhbGl6YXRpb25DZWxsKCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykuYWRkQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5ia2NlbGwnKS5yZW1vdmVDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLmdldFNoYXJlRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBldmFsdWF0b3IgPSBfKGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpLmV2YWx1YXRvcnMpXG4gICAgICAgICAgICAgIC5maW5kKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3IubmFtZSA9PT0gc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgdmFyIGNlbGxzID0gW3Njb3BlLmNlbGxtb2RlbF07XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2VuZXJhdGVOb3RlYm9vayhbZXZhbHVhdG9yXSwgY2VsbHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLiRvbignYmVha2VyLmNlbGwuYWRkZWQnLCBmdW5jdGlvbihlLCBjZWxsbW9kZWwpIHtcbiAgICAgICAgICBpZiAoY2VsbG1vZGVsID09PSBzY29wZS5jZWxsbW9kZWwpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5jbSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuY20uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NvcGUuX3Nob3VsZEZvY3VzQ29kZU1pcnJvciA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kb24oJ2JlYWtlci5zZWN0aW9uLnRvZ2dsZWQnLCBmdW5jdGlvbihlLCBpc0NvbGxhcHNlZCkge1xuICAgICAgICAgIGlmICghaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzY29wZS5jbS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBTY3JvbGxpbi51bnRyYWNrKGVsZW1lbnRbMF0pO1xuICAgICAgICAgIENvZGVNaXJyb3Iub2ZmKHdpbmRvdywgJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICAgIENvZGVNaXJyb3Iub2ZmKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rLnVucmVnaXN0ZXJGb2N1c2FibGUoc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rLnVucmVnaXN0ZXJDTShzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIHNjb3BlLmJrTm90ZWJvb2sgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBob2xkcyB0aGUgbG9naWMgZm9yIGNvZGUgY2VsbCwgd2hpY2ggaXMgYSB0eXBlZCB7QGxpbmsgYmtDZWxsfS5cbiAqIFRoZSBjb2RlIGNlbGwgY29udGFpbnMgYW4gaW5wdXQgY2VsbCBhbiBvdXRwdXQgY2VsbCAoe0BsaW5rIGJrQ29kZUNlbGxPdXRwdXR9KSBhbmQgY2VsbCBtZW51cy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvZGVDZWxsSW5wdXRNZW51JywgZnVuY3Rpb24oYmtDb3JlTWFuYWdlcikge1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICB9IDtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbGlucHV0bWVudSddKCksXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmdldEl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkcm9wZG93bi1zdWJtZW51Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U3VibWVudUl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U2hvd0V2YWxJY29uID0gZnVuY3Rpb24oZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvciA9PT0gZXZhbHVhdG9yTmFtZTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnNldEV2YWx1YXRvciA9IGZ1bmN0aW9uKGV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICB2YXIgY2VsbElkID0gJHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvciA9IGV2YWx1YXRvck5hbWU7XG4gICAgICAgICAgZ2V0QmtOb3RlYm9va1dpZGdldCgpLmdldEZvY3VzYWJsZShjZWxsSWQpLmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBhYnN0cmFjdCBjb250YWluZXIgZm9yIHR5cGVzIG9mIG91dHB1dCBkaXNwbGF5cy4gV2hpbGUgd2UgcGxhbiB0byBtYWtlIHRoZSBvdXRwdXQgZGlzcGxheSBsb2FkaW5nXG4gKiBtZWNoYW5pc20gbW9yZSBwbHVnZ2FibGUsIHJpZ2h0IG5vdywgdGhpcyBtb2R1bGUgc2VydmVzIGFzIHRoZSByZWdpc3RyYXRpb24gb3V0cHV0IGRpc3BsYXkgdHlwZXMgYW5kIGhvbGRzIHRoZSBsb2dpY1xuICogZm9yIHN3aXRjaCBiZXR3ZWVuIGFwcGxpY2FibGUgb3V0cHV0IGRpc3BsYXkgdGhyb3VnaCBVSS5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvZGVDZWxsT3V0cHV0JywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLCBia091dHB1dERpc3BsYXlGYWN0b3J5LCBia0V2YWx1YXRvck1hbmFnZXIsIGJrRXZhbHVhdGVKb2JNYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxvdXRwdXRcIl0oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIG1vZGVsOiBcIj1cIixcbiAgICAgICAgZXZhbHVhdG9ySWQ6IFwiQFwiLFxuICAgICAgICBjZWxsSWQ6IFwiQFwiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBfc2hhcmVNZW51SXRlbXMgPSBbXTtcblxuICAgICAgICAkc2NvcGUuZ2V0T3V0cHV0UmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbC5yZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuc3Vic2NyaWJlZFRvKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWUgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXSkge1xuICAgICAgICAgICAgICB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXS51bnN1YnNjcmliZSgkc2NvcGUuc3Vic2NyaWJlZFRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5jZWxsSWQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmRlUmVnaXN0ZXJPdXRwdXRDZWxsKCRzY29wZS5jZWxsSWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmFwcGxpY2FibGVEaXNwbGF5cyA9IFtdO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRPdXRwdXRSZXN1bHQoKScsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuc3Vic2NyaWJlZFRvICYmICRzY29wZS5zdWJzY3JpYmVkVG8gIT09IHJlc3VsdC51cGRhdGVfaWQpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUubW9kZWwucGx1Z2luTmFtZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdLnVuc3Vic2NyaWJlKCRzY29wZS5zdWJzY3JpYmVkVG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLnN1YnNjcmliZWRUbyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghJHNjb3BlLnN1YnNjcmliZWRUbyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQudXBkYXRlX2lkKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWUgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXSkge1xuICAgICAgICAgICAgICB2YXIgb25VcGRhdGFibGVSZXN1bHRVcGRhdGUgPSBmdW5jdGlvbih1cGRhdGUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwucmVzdWx0ID0gdXBkYXRlO1xuICAgICAgICAgICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0uc3Vic2NyaWJlKHJlc3VsdC51cGRhdGVfaWQsIG9uVXBkYXRhYmxlUmVzdWx0VXBkYXRlKTtcbiAgICAgICAgICAgICAgJHNjb3BlLnN1YnNjcmliZWRUbyA9IHJlc3VsdC51cGRhdGVfaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdC50eXBlID09PSBcIlVwZGF0YWJsZUV2YWx1YXRpb25SZXN1bHRcIilcbiAgICAgICAgICAgICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXMgPSBia091dHB1dERpc3BsYXlGYWN0b3J5LmdldEFwcGxpY2FibGVEaXNwbGF5cyhyZXN1bHQucGF5bG9hZCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgJHNjb3BlLmFwcGxpY2FibGVEaXNwbGF5cyA9IGJrT3V0cHV0RGlzcGxheUZhY3RvcnkuZ2V0QXBwbGljYWJsZURpc3BsYXlzKHJlc3VsdCk7XG4gICAgICAgICAgJHNjb3BlLm1vZGVsLnNlbGVjdGVkVHlwZSA9ICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXNbMF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRvIGJlIHVzZWQgaW4gYmtPdXRwdXREaXNwbGF5XG4gICAgICAgICRzY29wZS5vdXRwdXREaXNwbGF5TW9kZWwgPSB7XG4gICAgICAgICAgZ2V0Q2VsbE1vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUuZ2V0T3V0cHV0UmVzdWx0KCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC50eXBlID09PSBcIkJlYWtlckRpc3BsYXlcIikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm9iamVjdDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICYmIHJlc3VsdC50eXBlID09PSBcIlVwZGF0YWJsZUV2YWx1YXRpb25SZXN1bHRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQucGF5bG9hZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXREdW1wU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRzY29wZS5tb2RlbC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXREdW1wU3RhdGU6IGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbC5zdGF0ZSA9IHM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNldFNoYXJlTWVudUl0ZW1zOiBmdW5jdGlvbihuZXdJdGVtcykge1xuICAgICAgICAgICAgX3NoYXJlTWVudUl0ZW1zID0gbmV3SXRlbXM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRDb21ldGRVdGlsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICRzY29wZS5nZXRFdmFsdWF0b3JJZCgpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgIHZhciBldmFsdWF0b3IgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0RXZhbHVhdG9yKGlkKTtcbiAgICAgICAgICAgICAgaWYgKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3IuY29tZXRkVXRpbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0RXZhbHVhdG9ySWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlkID0gJHNjb3BlO1xuICAgICAgICAgICAgd2hpbGUgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGlkLmV2YWx1YXRvcklkICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkLmV2YWx1YXRvcklkO1xuICAgICAgICAgICAgICBpZCA9IGlkLiRwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0T3V0cHV0RGlzcGxheVR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIHJldHVybiBcIlRleHRcIjtcbiAgICAgICAgICB2YXIgdHlwZSA9ICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGU7XG4gICAgICAgICAgLy8gaWYgQmVha2VyRGlzcGxheSBvciBVcGRhdGFibGVFdmFsdWF0aW9uUmVzdWx0LCB1c2UgdGhlIGlubmVyIHR5cGUgaW5zdGVhZFxuICAgICAgICAgIGlmICh0eXBlID09PSBcIkJlYWtlckRpc3BsYXlcIikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRzY29wZS5nZXRPdXRwdXRSZXN1bHQoKTtcbiAgICAgICAgICAgIHR5cGUgPSByZXN1bHQgPyByZXN1bHQuaW5uZXJ0eXBlIDogXCJIaWRkZW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdldEVsYXBzZWRUaW1lU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5tb2RlbC5lbGFwc2VkVGltZSB8fCAkc2NvcGUubW9kZWwuZWxhcHNlZFRpbWUgPT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbGFwc2VkVGltZSA9ICRzY29wZS5tb2RlbC5lbGFwc2VkVGltZTtcbiAgICAgICAgICAgIHJldHVybiBcIkVsYXBzZWQgdGltZTogXCIgKyBia1V0aWxzLmZvcm1hdFRpbWVTdHJpbmcoZWxhcHNlZFRpbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNTaG93T3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50ICE9PSB1bmRlZmluZWQgJiYgJHNjb3BlLiRwYXJlbnQuaXNTaG93T3V0cHV0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuaXNTaG93T3V0cHV0KCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd01lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiAkc2NvcGUuJHBhcmVudC5pc1Nob3dNZW51ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuaXNTaG93TWVudSgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVFeHBhbnNpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsICE9PSB1bmRlZmluZWQgJiYgJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdCgnZXhwYW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0V4cGFuZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmNlbGxtb2RlbCAhPT0gdW5kZWZpbmVkICYmICRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiAhJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW47XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdG8gYmUgdXNlZCBpbiBvdXRwdXQgY2VsbCBtZW51XG4gICAgICAgICRzY29wZS5vdXRwdXRDZWxsTWVudU1vZGVsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBfYWRkaXRpb25hbE1lbnVJdGVtcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJTaGFyZVwiLFxuICAgICAgICAgICAgICBpdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zaGFyZU1lbnVJdGVtcztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJUb2dnbGUgQ2VsbCBPdXRwdXRcIixcbiAgICAgICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNFeHBhbmRlZCgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS50b2dnbGVFeHBhbnNpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJEZWxldGVcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBnZXRFbGFwc2VkVGltZVN0cmluZyxcbiAgICAgICAgICAgICAgYWN0aW9uOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0QXBwbGljYWJsZURpc3BsYXlzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2VsZWN0ZWREaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2VsZWN0ZWREaXNwbGF5OiBmdW5jdGlvbihkaXNwbGF5KSB7XG4gICAgICAgICAgICAgICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGUgPSBkaXNwbGF5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFkZGl0aW9uYWxNZW51SXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gX2FkZGl0aW9uYWxNZW51SXRlbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5vdXRwdXRSZWZyZXNoZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICggJHNjb3BlLmNlbGxJZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5yZWdpc3Rlck91dHB1dENlbGwoJHNjb3BlLmNlbGxJZCwgJHNjb3BlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvZGVDZWxsT3V0cHV0TWVudScsIGZ1bmN0aW9uKGJrVXRpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxvdXRwdXRtZW51XCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBtb2RlbDogJz0nXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5nZXRJdGVtTmFtZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICB2YXIgc3ViSXRlbXMgPSAkc2NvcGUuZ2V0U3ViSXRlbXMoaXRlbSk7XG4gICAgICAgICAgICBpZiAoc3ViSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChcImRyb3Bkb3duLXN1Ym1lbnVcIik7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZHJvcC1sZWZ0XCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJkaXNwbGF5LW5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuZ2V0SXRlbU5hbWUoaXRlbSkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U3VibWVudUl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZGlzYWJsZWQtbGlua1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKFwiIFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFN1Ykl0ZW1zID0gZnVuY3Rpb24ocGFyZW50SXRlbSkge1xuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24ocGFyZW50SXRlbS5pdGVtcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRJdGVtLml0ZW1zKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwYXJlbnRJdGVtLml0ZW1zO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTUgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gT3ZlcnJpZGUgbWFya2Rvd24gbGluayByZW5kZXJlciB0byBhbHdheXMgaGF2ZSBgdGFyZ2V0PVwiX2JsYW5rXCJgXG4gIC8vIE1vc3RseSBmcm9tIFJlbmRlcmVyLnByb3RvdHlwZS5saW5rXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZC9ibG9iL21hc3Rlci9saWIvbWFya2VkLmpzI0w4NjItTDg4MVxuICB2YXIgYmtSZW5kZXJlciA9IG5ldyBtYXJrZWQuUmVuZGVyZXIoKTtcbiAgYmtSZW5kZXJlci5saW5rID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgICB2YXIgcHJvdDtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgICB0cnkge1xuICAgICAgICBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKVxuICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIC8vanNoaW50IGlnbm9yZTpzdGFydFxuICAgICAgaWYgKHByb3QuaW5kZXhPZignamF2YXNjcmlwdDonKSA9PT0gMCB8fCBwcm90LmluZGV4T2YoJ3Zic2NyaXB0OicpID09PSAwKSB7XG4gICAgICAgIC8vanNoaW50IGlnbm9yZTplbmRcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICAgIH1cbiAgICBvdXQgKz0gJyB0YXJnZXQ9XCJfYmxhbmtcIic7IC8vIDwgQURERUQgVEhJUyBMSU5FIE9OTFlcbiAgICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgYmtSZW5kZXJlci5wYXJhZ3JhcGggPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgLy8gQWxsb3cgdXNlcnMgdG8gd3JpdGUgXFwkIHRvIGVzY2FwZSAkXG4gICAgcmV0dXJuIG1hcmtlZC5SZW5kZXJlci5wcm90b3R5cGUucGFyYWdyYXBoLmNhbGwodGhpcywgdGV4dC5yZXBsYWNlKC9cXFxcXFwkL2csICckJykpO1xuICB9O1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtNYXJrZG93bkVkaXRhYmxlJywgWydia1Nlc3Npb25NYW5hZ2VyJywgJ2JrSGVscGVyJywgJ2JrQ29yZU1hbmFnZXInLCAnJHRpbWVvdXQnLCBmdW5jdGlvbihia1Nlc3Npb25NYW5hZ2VyLCBia0hlbHBlciwgYmtDb3JlTWFuYWdlciwgJHRpbWVvdXQpIHtcbiAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL21hcmtkb3duLWVkaXRhYmxlXCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBjZWxsbW9kZWw6ICc9J1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgY29udGVudEF0dHJpYnV0ZSA9IHNjb3BlLmNlbGxtb2RlbC50eXBlID09PSBcInNlY3Rpb25cIiA/ICd0aXRsZScgOiAnYm9keSc7XG5cbiAgICAgICAgdmFyIHByZXZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbWFya2Rvd25GcmFnbWVudCA9ICQoJzxkaXY+JyArIHNjb3BlLmNlbGxtb2RlbFtjb250ZW50QXR0cmlidXRlXSArICc8L2Rpdj4nKTtcbiAgICAgICAgICByZW5kZXJNYXRoSW5FbGVtZW50KG1hcmtkb3duRnJhZ21lbnRbMF0sIHtcbiAgICAgICAgICAgIGRlbGltaXRlcnM6IFtcbiAgICAgICAgICAgICAge2xlZnQ6IFwiJCRcIiwgcmlnaHQ6IFwiJCRcIiwgZGlzcGxheTogdHJ1ZX0sXG4gICAgICAgICAgICAgIHtsZWZ0OiBcIiRcIiwgcmlnaHQ6ICBcIiRcIiwgZGlzcGxheTogZmFsc2V9LFxuICAgICAgICAgICAgICB7bGVmdDogXCJcXFxcW1wiLCByaWdodDogXCJcXFxcXVwiLCBkaXNwbGF5OiB0cnVlfSxcbiAgICAgICAgICAgICAge2xlZnQ6IFwiXFxcXChcIiwgcmlnaHQ6IFwiXFxcXClcIiwgZGlzcGxheTogZmFsc2V9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudC5maW5kKCcubWFya3VwJykuaHRtbChtYXJrZWQobWFya2Rvd25GcmFnbWVudC5odG1sKCksIHtnZm06IHRydWUsIHJlbmRlcmVyOiBia1JlbmRlcmVyfSkpO1xuICAgICAgICAgIG1hcmtkb3duRnJhZ21lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgc2NvcGUubW9kZSA9ICdwcmV2aWV3JztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3luY0NvbnRlbnRBbmRQcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY2VsbG1vZGVsW2NvbnRlbnRBdHRyaWJ1dGVdID0gc2NvcGUuY20uZ2V0VmFsdWUoKTtcbiAgICAgICAgICBwcmV2aWV3KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmV2YWx1YXRlID0gc3luY0NvbnRlbnRBbmRQcmV2aWV3O1xuXG4gICAgICAgIHNjb3BlLmJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG5cbiAgICAgICAgc2NvcGUuZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5lZGl0KCk7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuZWRpdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKSB8fCB7fTtcbiAgICAgICAgICAvLyBJZiB0aGUgdXNlciBpcyBzZWxlY3Rpbmcgc29tZSB0ZXh0LCBkbyBub3QgZW50ZXIgdGhlIGVkaXQgbWFya2Rvd24gbW9kZVxuICAgICAgICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PSBcIlJhbmdlXCIgJiYgJC5jb250YWlucyhlbGVtZW50WzBdLCBzZWxlY3Rpb24uZm9jdXNOb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYmtIZWxwZXIuaXNOb3RlYm9va0xvY2tlZCgpKSByZXR1cm47XG4gICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIkFcIikgcmV0dXJuOyAvLyBEb24ndCBlZGl0IGlmIGNsaWNraW5nIGEgbGlua1xuXG4gICAgICAgICAgc2NvcGUubW9kZSA9ICdlZGl0JztcblxuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGNvbnRlbnQgb2YgbWFya3VwIHdoZW4gdG9nZ2xpbmcgdG8gZWRpdCBtb2RlIHRvIHByZXZlbnRcbiAgICAgICAgICAgIC8vIGZsYXNoIHdoZW4gdG9nZ2xpbmcgYmFjayB0byBwcmV2aWV3IG1vZGUuXG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5tYXJrdXAnKS5odG1sKCcnKTtcblxuICAgICAgICAgICAgdmFyIGNtID0gc2NvcGUuY207XG4gICAgICAgICAgICBjbS5zZXRWYWx1ZShzY29wZS5jZWxsbW9kZWxbY29udGVudEF0dHJpYnV0ZV0pO1xuICAgICAgICAgICAgY20uY2xlYXJIaXN0b3J5KCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICB2YXIgY2xpY2tMb2NhdGlvbjtcbiAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KTtcbiAgICAgICAgICAgICAgdmFyIHRvcCA9IHdyYXBwZXIub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICB2YXIgYm90dG9tID0gdG9wICsgd3JhcHBlci5vdXRlckhlaWdodCgpO1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5wYWdlWSA8ICh0b3AgKyBib3R0b20pIC8gMikge1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcigwLCAwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbS5zZXRDdXJzb3IoY20ubGluZUNvdW50KCkgLSAxLCBjbS5nZXRMaW5lKGNtLmxhc3RMaW5lKCkpLmxlbmd0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY29kZU1pcnJvck9wdGlvbnMgPSBfLmV4dGVuZChia0NvcmVNYW5hZ2VyLmNvZGVNaXJyb3JPcHRpb25zKHNjb3BlLCBub3RlYm9va0NlbGxPcCksIHtcbiAgICAgICAgICBsaW5lTnVtYmVyczogZmFsc2UsXG4gICAgICAgICAgbW9kZTogXCJtYXJrZG93blwiLFxuICAgICAgICAgIHNtYXJ0SW5kZW50OiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS5jbSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGVsZW1lbnQuZmluZChcInRleHRhcmVhXCIpWzBdLCBjb2RlTWlycm9yT3B0aW9ucyk7XG5cbiAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckZvY3VzYWJsZShzY29wZS5jZWxsbW9kZWwuaWQsIHNjb3BlKTtcbiAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckNNKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUuY20pO1xuXG4gICAgICAgIHNjb3BlLmNtLnNldFZhbHVlKHNjb3BlLmNlbGxtb2RlbFtjb250ZW50QXR0cmlidXRlXSk7XG4gICAgICAgIHByZXZpZXcoKTtcblxuICAgICAgICBzY29wZS5jbS5vbihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzeW5jQ29udGVudEFuZFByZXZpZXcoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCdiZWFrZXIuY2VsbC5hZGRlZCcsIGZ1bmN0aW9uKGUsIGNlbGxtb2RlbCkge1xuICAgICAgICAgIGlmIChjZWxsbW9kZWwgPT09IHNjb3BlLmNlbGxtb2RlbCkgc2NvcGUuZWRpdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5ib2R5JywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTWFya2Rvd25DZWxsJywgW1xuICAgICAgJ2JrU2Vzc2lvbk1hbmFnZXInLFxuICAgICAgJ2JrSGVscGVyJyxcbiAgICAgICdia0NvcmVNYW5hZ2VyJyxcbiAgICAgICckdGltZW91dCcsIGZ1bmN0aW9uKFxuICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgICBia0hlbHBlcixcbiAgICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgICAgJHRpbWVvdXQpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL21hcmtkb3duY2VsbCddKClcbiAgICAgICAgfTtcbiAgICAgIH1dKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtOZXdDZWxsTWVudScsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtTZXNzaW9uTWFuYWdlciwgYmtFdmFsdWF0b3JNYW5hZ2VyKSB7XG4gICAgdmFyIGNlbGxPcHMgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25ld2NlbGxtZW51XCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBjb25maWc6ICc9JyxcbiAgICAgICAgaXNMYXJnZTogJz0nLFxuICAgICAgICBwb3NpdGlvbjogJ0AnXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBuZXdDZWxsRmFjdG9yeSA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tOZXdDZWxsRmFjdG9yeSgpO1xuICAgICAgICB2YXIgcmVjZW50bHlBZGRlZExhbmd1YWdlO1xuXG4gICAgICAgICRzY29wZS5nZXRFdmFsdWF0b3JzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMSwgMiwgMywgNF07XG4gICAgICAgICRzY29wZS5nZXRMZXZlbHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gbGV2ZWxzO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5uZXdDb2RlQ2VsbCA9IGZ1bmN0aW9uKGV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IG5ld0NlbGxGYWN0b3J5Lm5ld0NvZGVDZWxsKGV2YWx1YXRvck5hbWUpO1xuICAgICAgICAgIGF0dGFjaENlbGwobmV3Q2VsbCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zaG93UGx1Z2luTWFuYWdlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrSGVscGVyLnNob3dMYW5ndWFnZU1hbmFnZXIoJHNjb3BlKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm5ld01hcmtkb3duQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBuZXdDZWxsID0gbmV3Q2VsbEZhY3RvcnkubmV3TWFya2Rvd25DZWxsKCk7XG4gICAgICAgICAgYXR0YWNoQ2VsbChuZXdDZWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubmV3U2VjdGlvbkNlbGwgPSBmdW5jdGlvbihsZXZlbCkge1xuICAgICAgICAgIHZhciBuZXdDZWxsID0gbmV3Q2VsbEZhY3RvcnkubmV3U2VjdGlvbkNlbGwobGV2ZWwpO1xuICAgICAgICAgIGF0dGFjaENlbGwobmV3Q2VsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlZmF1bHRFdmFsdWF0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBieSBkZWZhdWx0LCBpbnNlcnQgYSBjb2RlIGNlbGwgKGFuZCB1c2UgdGhlIGJlc3QgZXZhbHVhdG9yIHdpdGggYmVzdCBndWVzcylcbiAgICAgICAgICAvLyBJZiBhIHByZXYgY2VsbCBpcyBnaXZlbiwgZmlyc3Qgc2NhbiB0b3dhcmQgdG9wIG9mIHRoZSBub3RlYm9vaywgYW5kIHVzZSB0aGUgZXZhbHVhdG9yXG4gICAgICAgICAgLy8gb2YgdGhlIGZpcnN0IGNvZGUgY2VsbCBmb3VuZC4gSWYgbm90IGZvdW5kLCBzY2FuIHRvd2FyZCBib3R0b20sIGFuZCB1c2UgdGhlIGV2YWx1YXRvclxuICAgICAgICAgIC8vIG9mIHRoZSBmaXJzdCBjb2RlIGNlbGwgZm91bmQuXG4gICAgICAgICAgLy8gSWYgYSBwcmV2IGNlbGwgaXMgbm90IGdpdmVuLCB1c2UgdGhlIHZlcnkgbGFzdCBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rLlxuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGNvZGUgY2VsbCBpbiB0aGUgbm90ZWJvb2ssIHVzZSB0aGUgZmlyc3QgZXZhbHVhdG9yIGluIHRoZSBsaXN0XG4gICAgICAgICAgdmFyIHByZXZDZWxsID0gJHNjb3BlLmNvbmZpZyAmJiAkc2NvcGUuY29uZmlnLnByZXZDZWxsICYmICRzY29wZS5jb25maWcucHJldkNlbGwoKTtcbiAgICAgICAgICB2YXIgY29kZUNlbGwgPSByZWNlbnRseUFkZGVkTGFuZ3VhZ2VcbiAgICAgICAgICAgICAgfHwgKHByZXZDZWxsICYmIGNlbGxPcHMuZmluZENvZGVDZWxsKHByZXZDZWxsLmlkKSlcbiAgICAgICAgICAgICAgfHwgKHByZXZDZWxsICYmIGNlbGxPcHMuZmluZENvZGVDZWxsKHByZXZDZWxsLmlkLCB0cnVlKSlcbiAgICAgICAgICAgICAgfHwgZ2V0TGFzdENvZGVDZWxsKCk7XG4gICAgICAgICAgdmFyIGV2YWx1YXRvck5hbWUgPSBjb2RlQ2VsbCA/XG4gICAgICAgICAgICAgIGNvZGVDZWxsLmV2YWx1YXRvciA6IF8ua2V5cyhia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpKVswXTtcblxuICAgICAgICAgIHJldHVybiBldmFsdWF0b3JOYW1lO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaENlbGwoY2VsbCkge1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNvbmZpZyAmJiAkc2NvcGUuY29uZmlnLmF0dGFjaENlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY29uZmlnLmF0dGFjaENlbGwoY2VsbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlbGxPcHMuaW5zZXJ0Rmlyc3QoY2VsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBsYXN0IGNvZGUgY2VsbCBpbiB0aGUgbm90ZWJvb2tcbiAgICAgICAgdmFyIGdldExhc3RDb2RlQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLmxhc3QoY2VsbE9wcy5nZXRBbGxDb2RlQ2VsbHMoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbignbGFuZ3VhZ2VBZGRlZCcsIGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgcmVjZW50bHlBZGRlZExhbmd1YWdlID0gZGF0YTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLiRvbignY2VsbE1hcFJlY3JlYXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlY2VudGx5QWRkZWRMYW5ndWFnZSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia05vdGVib29rXG4gKiAtIHRoZSBjb250cm9sbGVyIHRoYXQgcmVzcG9uc2libGUgZm9yIGRpcmVjdGx5IGNoYW5naW5nIHRoZSB2aWV3XG4gKiAtIHJvb3QgY2VsbCArIGV2YWx1YXRvcnMgKyBvdGhlciBzdHVmZnMgc3BlY2lmaWMgdG8gb25lICh0aGUgbG9hZGVkKSBub3RlYm9va1xuICogLSByb290IGNlbGwgaXMganVzdCBhIHNwZWNpYWwgY2FzZSBvZiBhIHNlY3Rpb24gY2VsbFxuICogLSBUT0RPLCB3ZSBhcmUgbWl4aW5nIHRoZSBjb25jZXB0IG9mIGEgbm90ZWJvb2sgYW5kIGEgcm9vdCBzZWN0aW9uIGhlcmVcbiAqIHdlIHdhbnQgdG8gc2VwYXJhdGUgb3V0IHRoZSBsYXlvdXQgc3BlY2lmaWMgc3R1ZmZzKGlkZWEgb2YgYSBzZWN0aW9uKSBmcm9tIG90aGVyXG4gKiBzdHVmZnMgbGlrZSBldmFsdWF0b3IgcGFuZWxcbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia05vdGVib29rJywgZnVuY3Rpb24gKFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICBia091dHB1dExvZykge1xuICAgIHZhciBDRUxMX1RZUEUgPSBcIm5vdGVib29rXCI7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25vdGVib29rXCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBzZXRCa05vdGVib29rOiBcIiZcIixcbiAgICAgICAgaXNMb2FkaW5nOiBcIj1cIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICB2YXIgX2ltcGwgPSB7XG4gICAgICAgICAgX3ZpZXdNb2RlbDoge1xuICAgICAgICAgICAgX2RlYnVnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICBfc2hvd091dHB1dDogZmFsc2UsXG4gICAgICAgICAgICB0b2dnbGVTaG93T3V0cHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dPdXRwdXQgPSAhdGhpcy5fc2hvd091dHB1dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlT3V0cHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dPdXRwdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1Nob3dpbmdPdXRwdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dPdXRwdXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlQWR2YW5jZWRNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdGhpcy5fYWR2YW5jZWRNb2RlID0gIXRoaXMuX2FkdmFuY2VkTW9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FkdmFuY2VkTW9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAhISh0aGlzLl9hZHZhbmNlZE1vZGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSGllcmFyY2h5RW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAhISh0aGlzLl9oaWVyYXJjaHlFbmFibGVkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVIaWVyYXJjaHlFbmFibGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdGhpcy5faGllcmFyY2h5RW5hYmxlZCA9ICF0aGlzLl9oaWVyYXJjaHlFbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZURlYnVnZ2luZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGlzLl9kZWJ1Z2dpbmcgPSAhdGhpcy5fZGVidWdnaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRGVidWdnaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWJ1Z2dpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRWaWV3TW9kZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92aWV3TW9kZWw7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaGFyZUFuZE9wZW5QdWJsaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFRPRE8sIHRoaXMgaXMgYW4gdWdseSBoYWNrLiBOZWVkIHJlZmFjdG9yaW5nLlxuICAgICAgICAgICAgc2hhcmVNZW51Lml0ZW1zWzBdLmFjdGlvbigpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVsZXRlQWxsT3V0cHV0Q2VsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5kZWxldGVBbGxPdXRwdXRDZWxscygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX2ZvY3VzYWJsZXM6IHt9LCAvLyBtYXAgb2YgZm9jdXNhYmxlKGUuZy4gY29kZSBtaXJyb3IgaW5zdGFuY2VzKSB3aXRoIGNlbGwgaWQgYmVpbmcga2V5c1xuICAgICAgICAgIHJlZ2lzdGVyRm9jdXNhYmxlOiBmdW5jdGlvbiAoY2VsbElkLCBmb2N1c2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzYWJsZXNbY2VsbElkXSA9IGZvY3VzYWJsZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVucmVnaXN0ZXJGb2N1c2FibGU6IGZ1bmN0aW9uIChjZWxsSWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9mb2N1c2FibGVzW2NlbGxJZF07XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2FibGVzW2NlbGxJZF0gPSBudWxsO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Rm9jdXNhYmxlOiBmdW5jdGlvbiAoY2VsbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNhYmxlc1tjZWxsSWRdO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX2NvZGVNaXJyb3JzOiB7fSxcbiAgICAgICAgICByZWdpc3RlckNNOiBmdW5jdGlvbiAoY2VsbElkLCBjbSkge1xuICAgICAgICAgICAgdGhpcy5fY29kZU1pcnJvcnNbY2VsbElkXSA9IGNtO1xuICAgICAgICAgICAgY20uc2V0T3B0aW9uKFwia2V5TWFwXCIsIHRoaXMuX2NtS2V5TWFwTW9kZSk7XG4gICAgICAgICAgICBjbS5zZXRPcHRpb24oXCJ2aW1Nb2RlXCIsIHRoaXMuX2NtS2V5TWFwTW9kZSA9PSBcInZpbVwiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVucmVnaXN0ZXJDTTogZnVuY3Rpb24gKGNlbGxJZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NvZGVNaXJyb3JzW2NlbGxJZF07XG4gICAgICAgICAgICB0aGlzLl9jb2RlTWlycm9yc1tjZWxsSWRdID0gbnVsbDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9jbUtleU1hcE1vZGU6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgIHNldENNS2V5TWFwTW9kZTogZnVuY3Rpb24gKGtleU1hcE1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NtS2V5TWFwTW9kZSA9IGtleU1hcE1vZGU7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5fY29kZU1pcnJvcnMsIGZ1bmN0aW9uIChjbSkge1xuICAgICAgICAgICAgICBjbS5zZXRPcHRpb24oXCJrZXlNYXBcIiwga2V5TWFwTW9kZSk7XG4gICAgICAgICAgICAgIGNtLnNldE9wdGlvbihcInZpbU1vZGVcIiwga2V5TWFwTW9kZSA9PSBcInZpbVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Q01LZXlNYXBNb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY21LZXlNYXBNb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnNldEJrTm90ZWJvb2soe2JrTm90ZWJvb2s6IF9pbXBsfSk7XG5cbiAgICAgICAgJHNjb3BlLmdldEZ1bGxJbmRleCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCIxXCIgfVxuXG4gICAgICAgICRzY29wZS5pc0xvY2tlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzTG9ja2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaXNEZWJ1Z2dpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9pbXBsLl92aWV3TW9kZWwuaXNEZWJ1Z2dpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzU2hvd2luZ091dHB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc1Nob3dpbmdPdXRwdXQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2hvd0RlYnVnVHJlZSA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUuZ2V0Tm90ZWJvb2tNb2RlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRSYXdOb3RlYm9va01vZGVsKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jbGVhck91dHB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGF0eXBlOiBcImpzb25cIixcbiAgICAgICAgICAgIHVybDogYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9vdXRwdXRsb2cvY2xlYXJcIiksXG4gICAgICAgICAgICBkYXRhOiB7fX0pO1xuICAgICAgICAgICRzY29wZS5vdXRwdXRMb2cgPSBbXTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmhpZGVPdXRwdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX2ltcGwuX3ZpZXdNb2RlbC5oaWRlT3V0cHV0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzQWR2YW5jZWRNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzQWR2YW5jZWRNb2RlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzSGllcmFyY2h5RW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc0hpZXJhcmNoeUVuYWJsZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2hvd1N0ZE91dCA9IHRydWU7XG4gICAgICAgICRzY29wZS5zaG93U3RkRXJyID0gdHJ1ZTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlU3RkT3V0ID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICRzY29wZS5zaG93U3RkT3V0ID0gISRzY29wZS5zaG93U3RkT3V0O1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTdGRFcnIgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCRldmVudCkgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgJHNjb3BlLnNob3dTdGRFcnIgPSAhJHNjb3BlLnNob3dTdGRFcnI7XG4gICAgICAgIH07XG5cbiAgICAgICAgYmtPdXRwdXRMb2cuZ2V0TG9nKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAkc2NvcGUub3V0cHV0TG9nID0gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICBia091dHB1dExvZy5zdWJzY3JpYmUoZnVuY3Rpb24gKHJlcGx5KSB7XG4gICAgICAgICAgaWYgKCFfaW1wbC5fdmlld01vZGVsLmlzU2hvd2luZ091dHB1dCgpKSB7XG4gICAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLnRvZ2dsZVNob3dPdXRwdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNjb3BlLm91dHB1dExvZy5wdXNoKHJlcGx5LmRhdGEpO1xuICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAvLyBTY3JvbGwgdG8gYm90dG9tIHNvIHRoaXMgb3V0cHV0IGlzIHZpc2libGUuXG4gICAgICAgICAgJC5lYWNoKCQoJy5vdXRwdXRsb2dib3gnKSxcbiAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGksIHYpIHtcbiAgICAgICAgICAgICAgICAgICAkKHYpLnNjcm9sbFRvcCh2LnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG1hcmdpbiA9ICQoXCIub3V0cHV0bG9nc3Rkb3V0XCIpLnBvc2l0aW9uKCkudG9wO1xuICAgICAgICB2YXIgb3V0cHV0TG9nSGVpZ2h0ID0gMzAwO1xuICAgICAgICB2YXIgZHJhZ0hlaWdodDtcbiAgICAgICAgdmFyIGZpeE91dHB1dExvZ1Bvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQoXCIub3V0cHV0bG9nY29udGFpbmVyXCIpLmNzcyhcInRvcFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSBvdXRwdXRMb2dIZWlnaHQpO1xuICAgICAgICAgICQoXCIub3V0cHV0bG9nY29udGFpbmVyXCIpLmNzcyhcImhlaWdodFwiLCBvdXRwdXRMb2dIZWlnaHQpO1xuICAgICAgICAgICQoXCIub3V0cHV0bG9nYm94XCIpLmNzcyhcImhlaWdodFwiLCBvdXRwdXRMb2dIZWlnaHQgLSBtYXJnaW4gLSA1KTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzID0gW107XG4gICAgICAgICQod2luZG93KS5yZXNpemUoZml4T3V0cHV0TG9nUG9zaXRpb24pO1xuICAgICAgICAkc2NvcGUudW5yZWdpc3RlcnMucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHdpbmRvdykub2ZmKFwicmVzaXplXCIsIGZpeE91dHB1dExvZ1Bvc2l0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBkcmFnU3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRyYWdIZWlnaHQgPSBvdXRwdXRMb2dIZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvdXRwdXRsb2doYW5kbGUgPSAkKFwiLm91dHB1dGxvZ2hhbmRsZVwiKTtcbiAgICAgICAgb3V0cHV0bG9naGFuZGxlLmRyYWcoXCJzdGFydFwiLCBkcmFnU3RhcnRIYW5kbGVyKTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb3V0cHV0bG9naGFuZGxlLm9mZihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnRIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBkcmFnSGFuZGxlciA9IGZ1bmN0aW9uIChldiwgZGQpIHtcbiAgICAgICAgICBvdXRwdXRMb2dIZWlnaHQgPSBkcmFnSGVpZ2h0IC0gZGQuZGVsdGFZO1xuICAgICAgICAgIGlmIChvdXRwdXRMb2dIZWlnaHQgPCAyMCkge1xuICAgICAgICAgICAgb3V0cHV0TG9nSGVpZ2h0ID0gMjA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvdXRwdXRMb2dIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA4MCkge1xuICAgICAgICAgICAgb3V0cHV0TG9nSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gODA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpeE91dHB1dExvZ1Bvc2l0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgIG91dHB1dGxvZ2hhbmRsZS5kcmFnKGRyYWdIYW5kbGVyKTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb3V0cHV0bG9naGFuZGxlLm9mZihcImRyYWdcIiwgZHJhZ0hhbmRsZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyB0aGUgcm9vdFxuICAgICAgICAgIHJldHVybiBub3RlYm9va0NlbGxPcC5nZXRDaGlsZHJlbihcInJvb3RcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmdldENoaWxkcmVuKCkubGVuZ3RoID09IDA7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKENFTExfVFlQRSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRTaGFyZURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hhcmVNZW51ID0ge1xuICAgICAgICAgIG5hbWU6IFwiU2hhcmVcIixcbiAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldFNoYXJlTWVudVBsdWdpbigpXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNSb290Q2VsbEluaXRpYWxpemF0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5tZW51SXRlbXMgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJSdW4gYWxsXCIsXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmV2YWx1YXRlUm9vdChcInJvb3RcIikuXG4gICAgICAgICAgICAgICAgICBjYXRjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIkluaXRpYWxpemF0aW9uIENlbGxcIixcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Um9vdENlbGxJbml0aWFsaXphdGlvbighJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpO1xuICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2hhcmVNZW51XG4gICAgICAgIF07XG5cbiAgICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvdXRpbC9pc1VzZUFkdmFuY2VkTW9kZVwiKSkuc3VjY2VzcyhmdW5jdGlvbihpc0FkdmFuY2VkKSB7XG4gICAgICAgICAgaWYgKF9pbXBsLl92aWV3TW9kZWwuaXNBZHZhbmNlZE1vZGUoKSAhPSAoaXNBZHZhbmNlZCA9PT0gXCJ0cnVlXCIpKSB7XG4gICAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLnRvZ2dsZUFkdmFuY2VkTW9kZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGl2ID0gZWxlbWVudC5maW5kKFwiLmJrY2VsbFwiKS5maXJzdCgpO1xuICAgICAgICBkaXYuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy9jbGljayBpbiB0aGUgYm9yZGVyIG9yIHBhZGRpbmcgc2hvdWxkIHRyaWdnZXIgbWVudVxuICAgICAgICAgIGlmIChia1V0aWxzLmdldEV2ZW50T2Zmc2V0WChkaXYsIGV2ZW50KSA+PSBkaXYud2lkdGgoKSkge1xuICAgICAgICAgICAgdmFyIG1lbnUgPSBkaXYuZmluZCgnLmJrY2VsbG1lbnUnKS5sYXN0KCk7XG4gICAgICAgICAgICBtZW51LmNzcyhcInRvcFwiLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIG1lbnUuY3NzKFwibGVmdFwiLCBldmVudC5jbGllbnRYIC0gMTUwKTtcbiAgICAgICAgICAgIG1lbnUuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpLmZpcnN0KCkuZHJvcGRvd24oJ3RvZ2dsZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICBkaXYuYWRkQ2xhc3MoXCJpbml0Y2VsbFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXYucmVtb3ZlQ2xhc3MoXCJpbml0Y2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5nZXROb3RlYm9va0VsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc0luaXRpYWxpemF0aW9uQ2VsbCgpJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICBkaXYuYWRkQ2xhc3MoXCJpbml0Y2VsbFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpdi5yZW1vdmVDbGFzcyhcImluaXRjZWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLnNldEJrTm90ZWJvb2soe2JrTm90ZWJvb2s6IHVuZGVmaW5lZH0pO1xuICAgICAgICAgIGJrT3V0cHV0TG9nLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgXyhzY29wZS51bnJlZ2lzdGVycykuZWFjaChmdW5jdGlvbih1bnJlZ2lzdGVyKSB7XG4gICAgICAgICAgICB1bnJlZ2lzdGVyKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia1NlY3Rpb25DZWxsJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgICR0aW1lb3V0KSB7XG4gICAgdmFyIENFTExfVFlQRSA9IFwic2VjdGlvblwiO1xuICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svc2VjdGlvbmNlbGxcIl0oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQgPSAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCB8fCBmYWxzZTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlU2hvd0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQgPSAhJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQ7XG4gICAgICAgICAgJHNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5zZWN0aW9uLnRvZ2dsZWQnLCAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc1Nob3dDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQ7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBub3RlYm9va0NlbGxPcC5nZXRDaGlsZHJlbigkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnJlc2V0VGl0bGUgPSBmdW5jdGlvbihuZXdUaXRsZSkge1xuICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwudGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLnRpdGxlJywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24nLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgIT09IG9sZFZhbCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUucmVuYW1lSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJEZWxldGUgY2VsbFwiLFxuICAgICAgICAgIG5ld05hbWU6IFwiRGVsZXRlIGhlYWRpbmcgYW5kIGtlZXAgY29udGVudHNcIlxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtVG9IZWFkKHtcbiAgICAgICAgICBuYW1lOiBcIkRlbGV0ZSBzZWN0aW9uIGFuZCBhbGwgc3ViLXNlY3Rpb25zXCIsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmRlbGV0ZVNlY3Rpb24oJHNjb3BlLmNlbGxtb2RlbC5pZCwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJDaGFuZ2UgSGVhZGVyIExldmVsXCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJIMVwiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwubGV2ZWwgPSAxO1xuICAgICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiSDJcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmxldmVsID0gMjtcbiAgICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkgzXCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5sZXZlbCA9IDM7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJINFwiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwubGV2ZWwgPSA0O1xuICAgICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVEYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNlbGxzID0gWyRzY29wZS5jZWxsbW9kZWxdXG4gICAgICAgICAgICAgIC5jb25jYXQobm90ZWJvb2tDZWxsT3AuZ2V0QWxsRGVzY2VuZGFudHMoJHNjb3BlLmNlbGxtb2RlbC5pZCkpO1xuICAgICAgICAgIHZhciB1c2VkRXZhbHVhdG9yc05hbWVzID0gXyhjZWxscykuY2hhaW4oKVxuICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC50eXBlID09PSBcImNvZGVcIjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjZWxsLmV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnVuaXF1ZSgpLnZhbHVlKCk7XG4gICAgICAgICAgdmFyIGV2YWx1YXRvcnMgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKS5ldmFsdWF0b3JzXG4gICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmFueSh1c2VkRXZhbHVhdG9yc05hbWVzLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3IubmFtZSA9PT0gZXY7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLmdlbmVyYXRlTm90ZWJvb2soZXZhbHVhdG9ycywgY2VsbHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRTaGFyZU1lbnVQbHVnaW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKENFTExfVFlQRSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6IFwiUnVuIGFsbFwiLFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwuaWQpLlxuICAgICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNoYXJlTWVudSA9IHtcbiAgICAgICAgICBuYW1lOiBcIlNoYXJlXCIsXG4gICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oc2hhcmVNZW51KTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldFNoYXJlTWVudVBsdWdpbigpXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbjtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJJbml0aWFsaXphdGlvbiBDZWxsXCIsXG4gICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUubmV3Q2VsbE1lbnVDb25maWcgPSB7XG4gICAgICAgICAgaXNTaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gISRzY29wZS5jZWxsbW9kZWwuaGlkZVRpdGxlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYXR0YWNoQ2VsbDogZnVuY3Rpb24obmV3Q2VsbCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AuaW5zZXJ0QWZ0ZXIoJHNjb3BlLmNlbGxtb2RlbC5pZCwgbmV3Q2VsbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2Q2VsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtUZXh0Q2VsbCcsIGZ1bmN0aW9uKGJrU2Vzc2lvbk1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svdGV4dGNlbGxcIl0oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuaXNFZGl0YWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhYmtIZWxwZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdGV4dGJveCA9ICQoZWxlbWVudC5maW5kKFwiLmVkaXRhYmxlLXRleHRcIikuZmlyc3QoKSk7XG4gICAgICAgIGVsZW1lbnQuZmluZCgnLmVkaXRhYmxlLXRleHQnKS5odG1sKHNjb3BlLmNlbGxtb2RlbC5ib2R5KTtcbiAgICAgICAgdGV4dGJveC5iaW5kKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmJvZHkgPSB0ZXh0Ym94Lmh0bWwoKS50cmltKCk7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5lZGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGV4dGJveC5mb2N1cygpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5ib2R5JywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oJ2JlYWtlci5jZWxsLmFkZGVkJywgZnVuY3Rpb24oZSwgY2VsbG1vZGVsKSB7XG4gICAgICAgICAgaWYgKGNlbGxtb2RlbCA9PT0gc2NvcGUuY2VsbG1vZGVsKSBzY29wZS5lZGl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgY2VudHJhbCBjb250cm9sIG9mIGFsbCBvdXRwdXQgZGlzcGxheXMuIEl0IGZ1bGZpbGxzIGFjdHVhbCBhbmd1bGFyIGRpcmVjdGl2ZXNcbiAqIGxhemlseSB3aGVuIHVzZXIgbG9hZCBvdXRwdXQgZGlzcGxheSBwbHVnaW5zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dERpc3BsYXknLCBbJ2JrLnV0aWxzJywgICduZ0FuaW1hdGUnLCAnbmdUb3VjaCddKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dERpc3BsYXknKTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtPdXRwdXREaXNwbGF5JywgZnVuY3Rpb24oXG4gICAgICAkY29tcGlsZSwgYmtPdXRwdXREaXNwbGF5RmFjdG9yeSwgYmtVdGlscykge1xuICAgIHZhciBnZXRSZXN1bHRUeXBlID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5nZXRDZWxsTW9kZWwoKSkge1xuICAgICAgICBpZiAoXy5pc1N0cmluZyhtb2RlbC5nZXRDZWxsTW9kZWwoKSkpIHtcbiAgICAgICAgICByZXR1cm4gXCJTdHJpbmdcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbW9kZWwuZ2V0Q2VsbE1vZGVsKCkudHlwZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgIHRlbXBsYXRlOiBcIjxkaXY+T1VUUFVUPC9kaXY+XCIsXG4gICAgICBzY29wZToge1xuICAgICAgICB0eXBlOiBcIkBcIixcbiAgICAgICAgbW9kZWw6IFwiPVwiIC8vIGFzc3VtZSByZWYgdG8gbW9kZWwgZG9lc24ndCBjaGFuZ2UgYWZ0ZXIgZGlyZWN0aXZlIGlzIGNyZWF0ZWRcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGNoaWxkU2NvcGUgPSBudWxsO1xuICAgICAgICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICBpZiAoY2hpbGRTY29wZSkge1xuICAgICAgICAgICAgY2hpbGRTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZFNjb3BlID0gc2NvcGUuJG5ldygpO1xuICAgICAgICAgIGNoaWxkU2NvcGUubW9kZWwgPSBzY29wZS5tb2RlbDtcbiAgICAgICAgICB2YXIgcmVzdWx0VHlwZSA9IGdldFJlc3VsdFR5cGUoc2NvcGUubW9kZWwpO1xuICAgICAgICAgIGlmIChyZXN1bHRUeXBlKSB7XG4gICAgICAgICAgICBia1V0aWxzLmxvZyhcIm91dHB1dERpc3BsYXlcIiwge1xuICAgICAgICAgICAgICByZXN1bHRUeXBlOiByZXN1bHRUeXBlLFxuICAgICAgICAgICAgICBkaXNwbGF5VHlwZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkaXJlY3RpdmVOYW1lID0gYmtPdXRwdXREaXNwbGF5RmFjdG9yeS5nZXREaXJlY3RpdmVOYW1lKHR5cGUpO1xuICAgICAgICAgIGVsZW1lbnQuaHRtbChcIjxkaXYgXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgbW9kZWw9J21vZGVsJz48L2Rpdj5cIik7XG4gICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShjaGlsZFNjb3BlKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKFwidHlwZVwiLCBmdW5jdGlvbihuZXdUeXBlLCBvbGRUeXBlKSB7XG4gICAgICAgICAgcmVmcmVzaChuZXdUeXBlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiRvbihcIm91dHB1dERpc3BsYXlGYWN0b3J5VXBkYXRlZFwiLCBmdW5jdGlvbihldmVudCwgd2hhdCkge1xuICAgICAgICAgIGlmICh3aGF0ID09PSBcImFsbFwiIHx8IHdoYXQgPT09IHNjb3BlLnR5cGUpIHtcbiAgICAgICAgICAgIHJlZnJlc2goc2NvcGUudHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChjaGlsZFNjb3BlKSB7XG4gICAgICAgICAgICBjaGlsZFNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBjZW50cmFsIGNvbnRyb2wgb2YgYWxsIG91dHB1dCBkaXNwbGF5cy4gSXQgZnVsZmlsbHMgYWN0dWFsIGFuZ3VsYXIgZGlyZWN0aXZlc1xuICogbGF6aWx5IHdoZW4gdXNlciBsb2FkIG91dHB1dCBkaXNwbGF5IHBsdWdpbnMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBNQVhfQ0FQQUNJVFkgPSAxMDA7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5Jyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoXCJia091dHB1dERpc3BsYXlGYWN0b3J5XCIsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY2UpIHtcblxuICAgIHZhciBpbXBscyA9IHtcbiAgICAgICAgXCJUZXh0XCI6IHtcbiAgICAgICAgICB0ZW1wbGF0ZTogXCI8cHJlPnt7Z2V0VGV4dCgpfX08L3ByZT5cIixcbiAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBtb2RlbCA9ICRzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChtb2RlbCAmJiBtb2RlbC50ZXh0KSA/IG1vZGVsLnRleHQgOiBtb2RlbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIkRhdGVcIjoge1xuICAgICAgICAgIHRlbXBsYXRlOiBcIjxwcmU+e3tnZXREYXRlKCl9fTwvcHJlPlwiLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmdldERhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIG1vZGVsID0gJHNjb3BlLm1vZGVsLmdldENlbGxNb2RlbCgpO1xuICAgICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwudGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBtb21lbnQobW9kZWwudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbS5mb3JtYXQoXCJZWVlZTU1ERCBISDptbTpzcy5TU1MgWlpcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBcIldhcm5pbmdcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdvdXRsaW5lIHdhcm5pbmcnPjwvZGl2PiA8cHJlIGNsYXNzPSdvdXRfd2FybmluZyc+e3ttb2RlbC5nZXRDZWxsTW9kZWwoKS5tZXNzYWdlfX08L3ByZT5cIlxuICAgICAgfSxcbiAgICAgIFwiRXJyb3JcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogXCI8cHJlIGNsYXNzPSdvdXRfZXJyb3InPlwiICtcbiAgICAgICAgICAgIFwiPHNwYW4gbmctc2hvdz0nY2FuRXhwYW5kJyBjbGFzcz0ndG9nZ2xlLWVycm9yJyBuZy1jbGljaz0nZXhwYW5kZWQgPSAhZXhwYW5kZWQnPnt7ZXhwYW5kZWQgPyAnLScgOiAnKyd9fTwvc3Bhbj5cIiArXG4gICAgICAgICAgICBcIjxzcGFuIG5nLWJpbmQtaHRtbD0nc2hvcnRFcnJvcic+PC9zcGFuPjwvcHJlPlwiICtcbiAgICAgICAgICAgIFwiPHByZSBuZy1zaG93PSdleHBhbmRlZCc+PHNwYW4gbmctYmluZC1odG1sPSdsb25nRXJyb3InPjwvc3Bhbj5cIiArXG4gICAgICAgICAgICBcIjwvcHJlPlwiLFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgICAgJHNjb3BlLmV4cGFuZGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdtb2RlbC5nZXRDZWxsTW9kZWwoKScsIGZ1bmN0aW9uKGNlbGxNb2RlbCkge1xuICAgICAgICAgICAgdmFyIG91dHB1dHMgPSAkZWxlbWVudC5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICB2YXIgZXJyb3JzICA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQoY2VsbE1vZGVsKTtcblxuICAgICAgICAgICAgJHNjb3BlLnNob3J0RXJyb3IgICA9ICRzY2UudHJ1c3RBc0h0bWwoZXJyb3JzWzBdKTtcbiAgICAgICAgICAgICRzY29wZS5jYW5FeHBhbmQgICAgPSBlcnJvcnMubGVuZ3RoID4gMTtcbiAgICAgICAgICAgICRzY29wZS5sb25nRXJyb3IgICAgPSAkc2NlLnRydXN0QXNIdG1sKGVycm9ycy5zbGljZSgxKS5qb2luKFwiXFxuXCIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiSHRtbFwiOiB7XG4gICAgICAgIHRlbXBsYXRlOiBcIjxkaXY+PC9kaXY+XCIsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIpIHtcbiAgICAgICAgICAkc2NvcGUuZ2V0U2hhcmVNZW51UGx1Z2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKFwiYmtvLWh0bWxcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0U2hhcmVNZW51UGx1Z2luKClcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbmV3SXRlbXMgPSBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51SXRlbXMoXCJia28taHRtbFwiLCAkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnJlc2V0U2hhcmVNZW51SXRlbXMobmV3SXRlbXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgZGl2ID0gZWxlbWVudC5maW5kKFwiZGl2XCIpLmZpcnN0KCk7XG4gICAgICAgICAgdmFyIGNlbGxNb2RlbCA9IHNjb3BlLm1vZGVsLmdldENlbGxNb2RlbCgpO1xuICAgICAgICAgIGRpdi5odG1sKGNlbGxNb2RlbCk7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKCdtb2RlbC5nZXRDZWxsTW9kZWwoKScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICBkaXYuaHRtbChuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIk91dHB1dENvbnRhaW5lclwiOiB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGJrLWNvZGUtY2VsbC1vdXRwdXQgbmctcmVwZWF0PVwiaSBpbiBpdGVtc1wiIG1vZGVsPVwiaVwiID4nICtcbiAgICAgICAgICAgICc8LyBiay1jb2RlLWNlbGwtb3V0cHV0PicsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgbW9kZWw6IFwiPVwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICRzY29wZS5pdGVtcyA9IF8oJHNjb3BlLm1vZGVsLmdldENlbGxNb2RlbCgpLml0ZW1zKS5tYXAoZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHJlc3VsdDogaXRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHNjb3BlLmlzU2hvd01lbnUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciB0eXBlcyA9IFtcIlRleHRcIiwgXCJEYXRlXCIsIFwiQmVha2VyU3RhbmRhcmRPdXRwdXRcIiwgXCJCZWFrZXJTdGFuZGFyZEVycm9yXCIsIFwiV2FybmluZ1wiLCBcIkVycm9yXCIsIFwiSHRtbFwiLCBcIk91dHB1dENvbnRhaW5lclwiXTtcbiAgICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKHdoYXQsIHNjb3BlKSB7XG4gICAgICBpZiAoIXdoYXQpIHtcbiAgICAgICAgd2hhdCA9IFwiYWxsXCI7XG4gICAgICB9XG4gICAgICBpZiAoIXNjb3BlKSB7XG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgIH1cbiAgICAgIHNjb3BlLiRicm9hZGNhc3QoXCJia091dHB1dERpc3BsYXlGYWN0b3J5XCIsIHdoYXQpO1xuICAgICAgc2NvcGUuJCRwaGFzZSB8fCBzY29wZS4kYXBwbHkoKTtcbiAgICB9O1xuICAgIHZhciBzZXRJbXBsID0gZnVuY3Rpb24oaW5kZXgsIHR5cGUsIGltcGwpIHtcbiAgICAgIHR5cGVzW2luZGV4XSA9IHR5cGU7XG4gICAgICBpbXBsc1t0eXBlXSA9IGltcGw7XG4gICAgICByZWZyZXNoKHR5cGUpO1xuICAgIH07XG4gICAgdmFyIHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwID0ge1xuICAgICAgLy8gVGhlIGZpcnN0IGluIHRoZSBhcnJheSB3aWxsIGJlIHVzZWQgYXMgZGVmYXVsdFxuICAgICAgXCJ0ZXh0XCI6IFtcIlRleHRcIiwgXCJIdG1sXCIsIFwiTGF0ZXhcIl0sXG4gICAgICBcIkRhdGVcIjogW1wiRGF0ZVwiLCBcIlRleHRcIl0sXG4gICAgICBcIlRhYmxlRGlzcGxheVwiOiBbXCJUYWJsZVwiLCBcIlRleHRcIl0sXG4gICAgICBcImh0bWxcIjogW1wiSHRtbFwiXSxcbiAgICAgIFwiSW1hZ2VJY29uXCI6IFtcIkltYWdlXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiQmVha2VyRGlzcGxheVwiOiBbXCJCZWFrZXJEaXNwbGF5XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiUGxvdFwiOiBbXCJQbG90XCIsIFwiQ2hhcnRcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJUaW1lUGxvdFwiOiBbXCJQbG90XCIsIFwiQ2hhcnRcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJOYW5vUGxvdFwiOiBbXCJQbG90XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiQ29tYmluZWRQbG90XCI6IFtcIkNvbWJpbmVkUGxvdFwiLCBcIlRleHRcIl0sXG4gICAgICBcIkhpZGRlbk91dHB1dENlbGxcIjogW1wiSGlkZGVuXCJdLFxuICAgICAgXCJXYXJuaW5nXCI6IFtcIldhcm5pbmdcIl0sXG4gICAgICBcIkJlYWtlck91dHB1dENvbnRhaW5lckRpc3BsYXlcIjogW1wiT3V0cHV0Q29udGFpbmVyXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiT3V0cHV0Q29udGFpbmVyQ2VsbFwiOiBbXCJPdXRwdXRDb250YWluZXJcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJPdXRwdXRDb250YWluZXJcIjogW1wiT3V0cHV0Q29udGFpbmVyXCIsIFwiVGV4dFwiXVxuICAgIH07XG4gICAgdmFyIGZhY3RvcnkgPSB7XG4gICAgICBhZGQ6IGZ1bmN0aW9uKHR5cGUsIGltcGwpIHtcbiAgICAgICAgaWYgKHR5cGVzLmxlbmd0aCA+IE1BWF9DQVBBQ0lUWSkge1xuICAgICAgICAgIHRocm93IFwiQ2Fubm90IGFkZCBvdXRwdXQ6IFwiICsgdHlwZSArXG4gICAgICAgICAgICAgIFwiLCBtYXggb3V0cHV0IGRpc3BsYXkgY2FwYWNpdHkoXCIgKyBNQVhfQ0FQQUNJVFkgK1xuICAgICAgICAgICAgICBcIikgcmVhY2hlZFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCB0byB0aGUgZW5kXG4gICAgICAgIHNldEltcGwodHlwZXMubGVuZ3RoLCB0eXBlLCBpbXBsKTtcbiAgICAgIH0sXG4gICAgICBnZXQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZXNbaW5kZXhdO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJbXBsKHR5cGUpO1xuICAgICAgfSxcbiAgICAgIGdldEltcGw6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgJiYgaW1wbHNbdHlwZV0pIHtcbiAgICAgICAgICByZXR1cm4gaW1wbHNbdHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGltcGxzW1widGV4dFwiXTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldERpcmVjdGl2ZU5hbWU6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdHlwZXMuaW5kZXhPZih0eXBlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGluZGV4ID0gdHlwZXMuaW5kZXhPZihcIlRleHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiYmtvXCIgKyBpbmRleDtcbiAgICAgIH0sXG4gICAgICBhZGRPdXRwdXREaXNwbGF5VHlwZTogZnVuY3Rpb24odHlwZSwgZGlzcGxheXMsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXBbdHlwZV0pIHtcbiAgICAgICAgICByZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcFt0eXBlXSA9IGRpc3BsYXlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkocmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXBbdHlwZV0sIFtpbmRleCwgMF0uY29uY2F0KGRpc3BsYXlzKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRBcHBsaWNhYmxlRGlzcGxheXM6IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlzSlNPTiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgdmFyIHJldCA9IHRydWU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGlzSFRNTCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIC9ePFthLXpdW1xcc1xcU10qPi9pLnRlc3QodmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJIaWRkZW5cIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmVzdWx0LnR5cGUpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSBbXCJUZXh0XCIsIFwiSHRtbFwiLCBcIkxhdGV4XCJdO1xuICAgICAgICAgICAgaWYgKGlzSlNPTihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgIHJldC5wdXNoKFwiSnNvblwiLCBcIlZlZ2FcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNIVE1MKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgcmV0ID0gW1wiSHRtbFwiLCBcIlRleHRcIiwgXCJMYXRleFwiXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfLmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICAgICAgICBpZiAoXy5pc09iamVjdChyZXN1bHRbMF0pKSB7XG4gICAgICAgICAgICAgICAgcmV0LnB1c2goXCJUYWJsZVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwLmhhc093blByb3BlcnR5KHJlc3VsdC50eXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwW3Jlc3VsdC50eXBlXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtcIlRleHRcIl07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkoKVxuICAgIH07XG4gICAgYmVha2VyLm91dHB1dERpc3BsYXlGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICBmb3IgKHZhciBrZXkgaW4gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheUZhY3RvcnkpIHtcbiAgICAgIGJlYWtlci5vdXRwdXREaXNwbGF5RmFjdG9yeS5hZGQoa2V5LCBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5RmFjdG9yeVtrZXldKTtcbiAgICB9XG4gICAgYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheUZhY3RvcnkgPSBudWxsO1xuXG4gICAgZm9yICh2YXIga2V5IGluIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlUeXBlKSB7XG4gICAgICB2YXIgZGlzcGxheXMgPSBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5VHlwZVtrZXldO1xuICAgICAgZmFjdG9yeS5hZGRPdXRwdXREaXNwbGF5VHlwZShrZXksIGRpc3BsYXlzKTtcbiAgICB9XG4gICAgYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVR5cGUgPSBudWxsO1xuXG4gICAgcmV0dXJuIGZhY3Rvcnk7XG4gIH0pO1xuXG4gIF8oXy5yYW5nZShNQVhfQ0FQQUNJVFkpKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICBtb2R1bGUuZGlyZWN0aXZlKFwiYmtvXCIgKyBpLFxuICAgICAgICBmdW5jdGlvbihia091dHB1dERpc3BsYXlGYWN0b3J5LCBia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlciwgJGluamVjdG9yKSB7XG4gICAgICB2YXIgaW1wbCA9IGJrT3V0cHV0RGlzcGxheUZhY3RvcnkuZ2V0KGkpO1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihpbXBsKSkge1xuICAgICAgICByZXR1cm4gaW1wbChia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlciwgJGluamVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGltcGwpKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbXBsLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaXQgPSBpbXBsW2pdO1xuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoaXQpKSB7XG4gICAgICAgICAgICAgIGlmIChia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlci5oYXMoaXQpKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGJrT3V0cHV0RGlzcGxheVNlcnZpY2VNYW5hZ2VyLmdldChpdCkpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRpbmplY3Rvci5oYXMoaXQpKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKCRpbmplY3Rvci5nZXQoaXQpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcImJlYWtlciBjb3VsZCBub3QgZmluZCBwcm92aWRlciBmb3IgYmtvRmFjdG9yeSBcIiArIGl0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNGdW5jdGlvbihpdCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbXBsO1xuICAgICAgfVxuICAgIH0pO1xuICB9KVxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgdGhlIGNlbnRyYWwgY29udHJvbCBvZiBhbGwgb3V0cHV0IGRpc3BsYXlzLiBJdCBmdWxmaWxscyBhY3R1YWwgYW5ndWxhciBkaXJlY3RpdmVzXG4gKiBsYXppbHkgd2hlbiB1c2VyIGxvYWQgb3V0cHV0IGRpc3BsYXkgcGx1Z2lucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dERpc3BsYXknKTtcbiAgbW9kdWxlLmZhY3RvcnkoXCJia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlclwiLCBmdW5jdGlvbigkaW5qZWN0b3IpIHtcbiAgICB2YXIgc2VydmljZXMgPSB7fTtcbiAgICB2YXIgZmFjdG9yeSA9IHtcbiAgICAgIGdldFNlcnZpY2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xuICAgICAgfSxcbiAgICAgIGFkZFNlcnZpY2U6IGZ1bmN0aW9uKGtleSwgaW1wbCkge1xuICAgICAgICBpZiAodHlwZW9mIGltcGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHNlcnZpY2VzW2tleV0gPSBpbXBsKCRpbmplY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGltcGwpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltcGwubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBpdCA9IGltcGxbal07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIGlmIChzZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShpdCkpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goc2VydmljZXNbaXRdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgkaW5qZWN0b3IuaGFzKGl0KSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCgkaW5qZWN0b3IuZ2V0KGl0KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgc2VydmljZXNba2V5XSA9IGl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlcnZpY2VzW2tleV0gPSBpbXBsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgICB9LFxuICAgICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzW2tleV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5U2VydmljZSkge1xuICAgICAgdmFyIGltcGwgPSBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5U2VydmljZVtrZXldO1xuICAgICAgZmFjdG9yeS5hZGRTZXJ2aWNlKGtleSwgaW1wbCk7XG4gICAgfVxuICAgIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlTZXJ2aWNlID0gbnVsbDtcbiAgICBiZWFrZXIub3V0cHV0RGlzcGxheVNlcnZpY2UgPSBmYWN0b3J5O1xuICAgIHJldHVybiBmYWN0b3J5O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgZm9yIHRoZSBVSSB0aGF0IHNob3dzIHRoZSBsaXN0IG9mIGV2YWx1YXRvcnMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmdcbiAqIHNldHRpbmdzIHBhbmVsLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnKTtcblxuICBtb2R1bGUuY29udHJvbGxlcigncGx1Z2luTWFuYWdlckN0cmwnLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRtb2RhbEluc3RhbmNlJywgJ2JrQ29yZU1hbmFnZXInLCAnYmtTZXNzaW9uTWFuYWdlcicsICdia01lbnVQbHVnaW5NYW5hZ2VyJywgJ2JrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdia0V2YWx1YXRvck1hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRtb2RhbEluc3RhbmNlLCBia0NvcmVNYW5hZ2VyLGJrU2Vzc2lvbk1hbmFnZXIsIGJrTWVudVBsdWdpbk1hbmFnZXIsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuXG5cbiAgICAkc2NvcGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5zaG93VVJMID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLnNob3dXYXJuaW5nID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLnNob3dTZWN1cml0eVdhcm5pbmcgPSBmYWxzZTtcbiAgICAgICRzY29wZS5ldmFsVGFiT3AuZm9yY2VMb2FkID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybCA9IFwiXCI7XG4gICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZShcIm9rXCIpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yRGV0YWlscyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0VmlzdWFsUGFyYW1zKG5hbWUpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZXZhbFRhYk9wID0ge1xuICAgICAgbmV3UGx1Z2luTmFtZU9yVXJsOiBcIlwiLFxuICAgICAgc2hvd1VSTDogZmFsc2UsXG4gICAgICBzaG93V2FybmluZzogZmFsc2UsXG4gICAgICBzaG93U2VjdXJpdHlXYXJuaW5nOiBmYWxzZSxcbiAgICAgIGZvcmNlTG9hZDogZmFsc2UsXG4gICAgICBnZXRBbGxFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yc1dpdGhTcGVjOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjdGl2ZVBsdWdpbnMgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAodmFyIHAgaW4gYWN0aXZlUGx1Z2lucykge1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhhY3RpdmVQbHVnaW5zW3BdLnNwZWMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdFtwXSA9IGFjdGl2ZVBsdWdpbnNbcF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgZ2V0TG9hZGluZ0V2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldExvYWRpbmdFdmFsdWF0b3JzKCk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yU3RhdHVzZXM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGtub3duUGx1Z2lucyA9IGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmdldEtub3duRXZhbHVhdG9yUGx1Z2lucygpO1xuICAgICAgICB2YXIgYWN0aXZlUGx1Z2lucyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgIHZhciBsb2FkaW5nUGx1Z2lucyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRMb2FkaW5nRXZhbHVhdG9ycygpO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAodmFyIHAgaW4ga25vd25QbHVnaW5zKSB7XG4gICAgICAgICAgdmFyIHN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3RpdmVQbHVnaW5zW3BdKVxuICAgICAgICAgICAgc3RhdHVzID0gXCJhY3RpdmVcIjtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGwgaW4gbG9hZGluZ1BsdWdpbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGxvYWRpbmdQbHVnaW5zW2xdLnBsdWdpbiA9PSBwKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gXCJsb2FkaW5nXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RhdHVzKSB7XG4gICAgICAgICAgICAgIHN0YXR1cyA9IFwia25vd25cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0W3BdID0gc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgc2V0TmV3UGx1Z2luTmFtZU9yVXJsOiBmdW5jdGlvbihwbHVnaW5OYW1lT3JVcmwpIHtcbiAgICAgICAgdGhpcy5uZXdQbHVnaW5OYW1lT3JVcmwgPSBwbHVnaW5OYW1lT3JVcmw7XG4gICAgICB9LFxuICAgICAgdG9nZ2xlUGx1Z2luOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciBwbHVnaW4gPSBuYW1lIHx8IHRoaXMubmV3UGx1Z2luTmFtZU9yVXJsO1xuICAgICAgICB2YXIgZnJvbVVybCA9IG5hbWUgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHZhciBzdGF0dXMgPSB0aGlzLmdldEV2YWx1YXRvclN0YXR1c2VzKClbcGx1Z2luXTtcblxuICAgICAgICBpZiAoIWZyb21VcmwgJiYgIV8uY29udGFpbnMoWydhY3RpdmUnLCAna25vd24nXSwgc3RhdHVzKSkgcmV0dXJuO1xuICAgICAgICAvLyBmb3Igbm93LCBpZiB0aGUgcGx1Z2luIGlzbid0IGZyb20gYSBVUkwgb3IgYWN0aXZlIG9yIGtub3duXG4gICAgICAgIC8vIChuYW1lbHkgbG9hZGluZykgcmV0dXJuLlxuICAgICAgICAvLyBUT0RPOiBvdGhlciBzdGF0ZXMgd2Ugc2hvdWxkIHN1cHBvcnQ6IGZhaWxlZCBhbmQgZXhpdGluZy5cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYWN0aXZlJykge1xuICAgICAgICAgIC8vIHR1cm4gb2ZmIGV2YWx1YXRvciBpZiBvblxuICAgICAgICAgIGlmICghYmtTZXNzaW9uTWFuYWdlci5ldmFsdWF0b3JVbnVzZWQocGx1Z2luKSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsVGFiT3Auc2hvd1dhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIucmVtb3ZlRXZhbHVhdG9yKHBsdWdpbik7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLnJlbW92ZUV2YWx1YXRvcihwbHVnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG90aGVyd2lzZSwgdHVybiBvbiBldmFsdWF0b3JcbiAgICAgICAgICBpZiAoZnJvbVVybCkge1xuICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICAgICAgaWYgKHIudGVzdChwbHVnaW4pICYmICEkc2NvcGUuZXZhbFRhYk9wLmZvcmNlTG9hZCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmV2YWxUYWJPcC5mb3JjZUxvYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5ldmFsVGFiT3AubmV3UGx1Z2luTmFtZU9yVXJsID0gXCJcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV3RXZhbCA9IHsgbmFtZTogJycsIHBsdWdpbjogcGx1Z2luIH07XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5hZGRFdmFsdWF0b3IobmV3RXZhbCk7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmFkZEV2YWx1YXRvcihuZXdFdmFsKTtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2xhbmd1YWdlQWRkZWQnLCB7IGV2YWx1YXRvcjogcGx1Z2luIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5tZW51VGFiT3AgPSB7XG4gICAgICBuZXdNZW51UGx1Z2luVXJsOiBcIi4vcGx1Z2luL21lbnUvZGVidWcuanNcIixcbiAgICAgIGFkZE1lbnVQbHVnaW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5sb2FkTWVudVBsdWdpbih0aGlzLm5ld01lbnVQbHVnaW5VcmwpO1xuICAgICAgfSxcbiAgICAgIGdldE1lbnVQbHVnaW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBia01lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVQbHVnaW5zKCk7XG4gICAgICB9LFxuICAgICAgZ2V0TG9hZGluZ1BsdWdpbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtNZW51UGx1Z2luTWFuYWdlci5nZXRMb2FkaW5nUGx1Z2lucygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgfV0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgVUkgdGhhdCBzaG93cyB0aGUgbGlzdCBvZiBldmFsdWF0b3JzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiBzZXR0aW5ncyBwYW5lbC5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia1BsdWdpbk1hbmFnZXJFdmFsdWF0b3JTZXR0aW5ncycsIGZ1bmN0aW9uKFxuICAgICAgJGNvbXBpbGUsIGJrU2Vzc2lvbk1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvcGx1Z2lubWFuYWdlci9wbHVnaW5tYW5hZ2VyX2V2YWx1YXRvcl9zZXR0aW5nc1wiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5zZXQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAkc2NvcGUuZXZhbHVhdG9yLnBlcmZvcm0odmFsKTtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBzcGVjID0gXy5tYXAoc2NvcGUuZXZhbHVhdG9yLnNwZWMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICByZXR1cm4gXy5leHRlbmQoeyBuYW1lOiBrZXksIGtleToga2V5IH0sIHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUucHJvcGVydGllcyA9IF8uZmlsdGVyKHNwZWMsIGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICAgIHJldHVybiBvcHRpb24udHlwZSA9PT0gXCJzZXR0YWJsZVN0cmluZ1wiO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS5hY3Rpb25zID0gXy5maWx0ZXIoc3BlYywgZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi50eXBlID09PSBcImFjdGlvblwiO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogYmtDZWxsXG4gKiAtIHRoZSBjb250cm9sbGVyIHRoYXQgcmVzcG9uc2libGUgZm9yIGRpcmVjdGx5IGNoYW5naW5nIHRoZSB2aWV3XG4gKiAtIHRoZSBjb250YWluZXIgZm9yIHNwZWNpZmljIHR5cGVkIGNlbGxcbiAqIC0gdGhlIGRpcmVjdGl2ZSBpcyBkZXNpZ25lZCB0byBiZSBjYXBhYmxlIG9mIHVzZWQgaW4gYSBuZXN0ZWQgd2F5XG4gKiAtIGNvbmNlcHR1YWxseSwgYSBjZWxsIGlzICdjZWxsIG1vZGVsJyArICd2aWV3IG1vZGVsJyhhbiBleGFtcGxlIG9mIHdoYXQgZ29lcyBpbiB0byB0aGUgdmlld1xuICogbW9kZWwgaXMgY29kZSBjZWxsIGJnIGNvbG9yKVxuICogLSBBIGJrQ2VsbCBpcyBnZW5lcmljYWxseSBjb3JyZXNwb25kcyB0byBhIHBvcnRpb24gb2YgdGhlIG5vdGVib29rIG1vZGVsIChjdXJyZW50bHksIGl0IGlzXG4gKiBhbHdheXMgYSBicmFuY2ggaW4gdGhlIGhpZXJhcmNoeSlcbiAqIC0gV2hlbiBleHBvcnRpbmcgKGEuay5hLiBzaGFyaW5nKSwgd2Ugd2lsbCBuZWVkIGJvdGggdGhlIGNlbGwgbW9kZWwgYW5kIHRoZSB2aWV3IG1vZGVsXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29yZScpO1xuXG4gIG1vZHVsZS5jb250cm9sbGVyKCdDb2RlQ2VsbE9wdGlvbnNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAnZHNjb3BlJywgJ2JrQ29yZU1hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBkc2NvcGUsIGJrQ29yZU1hbmFnZXIpIHtcbiAgICAkc2NvcGUuZHNjb3BlID0gZHNjb3BlO1xuICAgICRzY29wZS5pbml0aWFsaXphdGlvbkNlbGwgPSBkc2NvcGUuaW5pdGlhbGl6YXRpb247XG4gICAgJHNjb3BlLmNlbGxOYW1lID0gZHNjb3BlLmlkO1xuICAgICRzY29wZS5jZWxsVGFncyA9IGRzY29wZS50YWdzO1xuICAgICRzY29wZS5pc0luaXRDZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXphdGlvbkNlbGw7XG4gICAgfTtcbiAgICAkc2NvcGUudG9nZ2xlSW5pdENlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6YXRpb25DZWxsID0gIXRoaXMuaW5pdGlhbGl6YXRpb25DZWxsO1xuICAgIH07XG4gICAgJHNjb3BlLnNhdmVEaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEoKCB0aGlzLmdldE5hbWVFcnJvcigpID09PSAnJyApICYmICggdGhpcy5nZXRUYWdFcnJvcigpID09PSAnJyApKTtcbiAgICB9O1xuICAgICRzY29wZS5pc0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gISEkc2NvcGUuZ2V0TmFtZUVycm9yKCkgfHwgISEkc2NvcGUuZ2V0VGFnRXJyb3IoKTtcbiAgICB9O1xuICAgICRzY29wZS5nZXROYW1lRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKHRoaXMuZHNjb3BlLmlkID09PSB0aGlzLmNlbGxOYW1lKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0NlbGxNYW5hZ2VyKCkuY2FuUmVuYW1lQ2VsbCh0aGlzLmNlbGxOYW1lKTtcbiAgICB9O1xuICAgICRzY29wZS5nZXRUYWdFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLmNhblNldFVzZXJUYWdzKHRoaXMuY2VsbFRhZ3MpO1xuICAgIH07XG4gICAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgnY2xvc2UnKTtcbiAgICB9O1xuICAgICRzY29wZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zYXZlRGlzYWJsZWQoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyIHJlYiA9IGZhbHNlO1xuICAgICAgdGhpcy5kc2NvcGUuaW5pdGlhbGl6YXRpb24gPSB0aGlzLmluaXRpYWxpemF0aW9uQ2VsbDtcbiAgICAgIGlmICh0aGlzLmRzY29wZS50YWdzICE9PSB0aGlzLmNlbGxUYWdzKSB7XG4gICAgICAgIHRoaXMuZHNjb3BlLnRhZ3MgPSB0aGlzLmNlbGxUYWdzO1xuICAgICAgICByZWIgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHNjb3BlLmlkICE9PSB0aGlzLmNlbGxOYW1lKVxuICAgICAgICBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5yZW5hbWVDZWxsKHRoaXMuZHNjb3BlLmlkLHRoaXMuY2VsbE5hbWUpO1xuICAgICAgZWxzZSBpZihyZWIpXG4gICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLnJlYnVpbGRNYXBzKClcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCdzYXZlJyk7XG4gICAgfTtcbn1dKTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvbW1vblV0aWxzXG4gKiAtIHRoaXMgc2hvdWxkIGJlIHRoZSBtb3N0IGdlbmVyYWwgdXRpbGl0aWVzLCB0aGUgdXRpbGl0aWVzIHRoYXQgY291bGQgaGF2ZSBiZWVuIGZvdW5kIGluIGFcbiAqIDNyZC1wYXJ0eSBsaWJyYXJ5XG4gKiBhbmQgd2UganVzdCBoYXBwZW4gdG8gd3JpdGUgb3VyIG93bi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29tbW9uVXRpbHMnLCBbXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdjb21tb25VdGlscycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xuICAgICAgICB2YXIgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG5cbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQobGVuZ3RoKSkge1xuICAgICAgICAgIGxlbmd0aCA9IDY7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgfSxcbiAgICAgIGxvYWRKUzogZnVuY3Rpb24odXJsLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIGUudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgICAgIC8vIEFkZCB0aGUgdGltZSB0byB0aGUgVVJMIHRvIGF2b2lkIGNhY2hpbmcuXG4gICAgICAgIHZhciBtaWxsaXMgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgZS5zcmMgPSB1cmwgKyBcIj9fPVwiICsgbWlsbGlzO1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIGUub25sb2FkID0gc3VjY2VzcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmFpbHVyZSkge1xuICAgICAgICAgIGUub25lcnJvciA9IGZhaWx1cmU7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlKTtcbiAgICAgIH0sXG4gICAgICBsb2FkQ1NTOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgICAgbGluay50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICAgICAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmVudE9mZnNldFg6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50KSB7IC8vIG9mZnNldFggaXMgbm90IGRlZmluZWQgaW4gZmlyZWZveFxuICAgICAgICB2YXIgeCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHgpICYmICFfLmlzVW5kZWZpbmVkKGVsZW0ub2Zmc2V0KSkge1xuICAgICAgICAgIHggPSBldmVudC5wYWdlWCAtIGVsZW0ub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geDtcbiAgICAgIH0sXG4gICAgICBsb2FkTGlzdDogZnVuY3Rpb24odXJscywgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICBpZiAodXJscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAoc3VjY2VzcylcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmwgPSB1cmxzLnNoaWZ0KCk7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9hZEpTKHVybCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbWUubG9hZExpc3QodXJscywgc3VjY2VzcywgZmFpbHVyZSk7XG4gICAgICAgIH0sIGZhaWx1cmUpO1xuICAgICAgfSxcbiAgICAgIGZpbmRUYWJsZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICBmdW5jdGlvbiBmaW5kQ29sdW1uTmFtZXMoZWxlbSkge1xuICAgICAgICAgIHZhciByb3cgPSBlbGVtLmNoaWxkcmVuWzBdO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJvdy5jaGlsZHJlbltpXS5pbm5lckhUTUwpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kRW50cmllcyhlbGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW0uY2hpbGRyZW5baV0uaW5uZXJIVE1MKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZFZhbHVlcyhlbGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZpbmRFbnRyaWVzKGVsZW0uY2hpbGRyZW5baV0pKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhZyA9IGVsZW0udGFnTmFtZTtcbiAgICAgICAgaWYgKHRhZyA9PT0gJ0RJVicpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzdWIgPSB0aGlzLmZpbmRUYWJsZShlbGVtLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIGlmIChzdWIpIHJldHVybiBzdWI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWcgPT09ICdUQUJMRScpIHtcbiAgICAgICAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUbyBwcmV2ZW50IGZyb20gbWFuZ2xpbmcgdXNlciBjcmVhdGVkIGh0bWwgdGFibGUsXG4gICAgICAgICAgLy8gb25seSB1c2UgdGFibGUgZGlzcGxheSBmb3IgZGF0YWZyYW1lIHRhYmxlcyAoQkVBS0VSLTQ1NilcbiAgICAgICAgICBpZiAoIV8uY29udGFpbnMoZWxlbS5jbGFzc0xpc3QsICdkYXRhZnJhbWUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyB0YWJsZSBjb250YWlucyBlbGVtZW50cyB3aXRoIGNvbHNwYW4gYW5kL29yIHJvd3NwYW5cbiAgICAgICAgICAvLyB0aGUgc2xvY2tncmlkIHRlbXBsYXRlIGRvZXMgbm90IHN1cHBvcnQgdGhlbSAgKEJFQUtFUi02OTQpXG4gICAgICAgICAgdmFyIGhlYWRlclJvd3MgPSAkKGVsZW0pLmZpbmQoJ3RoZWFkJykuZmluZCgndHInKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhlYWRlclJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaCA9IGhlYWRlclJvd3NbaV0uY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKHZhciBqPTA7IGo8Y2gubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNoW2pdLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpPjEgfHwgY2hbal0uZ2V0QXR0cmlidXRlKCdyb3dzcGFuJyk+MSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB2YWx1ZVJvd3MgPSAkKGVsZW0pLmZpbmQoJ3Rib2R5JykuZmluZCgndHInKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlUm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoID0gdmFsdWVSb3dzW2ldLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaj0wOyBqPGNoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmIChjaFtqXS5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKT4xIHx8IGNoW2pdLmdldEF0dHJpYnV0ZSgncm93c3BhbicpPjEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgYSB0YWJsZSB3aXRoIG11bHRpcGxlIHJvd3NcbiAgICAgICAgICAvLyBjdXJyZW50bHkgdGhlIHRhYmxlIGRpc3BsYXlzIGNhbid0IGhhbmRsZSBtdWx0aXBsZSByb3dzIG9mIGhlYWRlciAoQkVBS0VSLTQxNilcbiAgICAgICAgICAvLyBhZGRlZCBsb2dpYyB0byBjb2xsYXBzZSB0aGUgdHdvIGhlYWRlciByb3dzICAoQkVBS0VSLTY5NClcbiAgICAgICAgICB2YXIgY29scyA9IFtdO1xuICAgICAgICAgIGlmIChoZWFkZXJSb3dzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgLy9pZiB0aGVyZSBhcmUgdHdvIHJvd3MsIGFsbG93IHRhYmxlZGlzcGxheSBhcyBsb25nIGFzIG5vIGNvbHVtbiBoYXMgdmFsdWVzIGluIGJvdGggcm93c1xuICAgICAgICAgICAgLy90aGlzIGlzIGJlY2F1c2UgcGFuZGFzIHJlbmRlcnMgZGF0YWZyYW1lcyB3aXRoIHRoZSBpbmRleCBjb2wgaGVhZGVyIG9uIGEgc2Vjb25kIHJvd1xuICAgICAgICAgICAgdmFyIHJvdzAgPSBoZWFkZXJSb3dzLmVxKDApLmZpbmQoJ3RoJyk7XG4gICAgICAgICAgICB2YXIgcm93MSA9IGhlYWRlclJvd3MuZXEoMSkuZmluZCgndGgnKTtcblx0ICAgIHZhciBtaW4gPSByb3cwLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChtaW4+cm93MS5sZW5ndGgpIHtcblx0XHRtaW4gPSByb3cxLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWluOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIHIwID0gcm93MC5lcShpKTtcbiAgICAgICAgICAgICAgdmFyIHIxID0gcm93MS5lcShpKTtcblxuICAgICAgICAgICAgICAvL2lmIGFueSBjb2x1bW4gaGFzIGh0bWwgaW4gYm90aCByb3dzLCBkb24ndCB1c2UgdGFibGVkaXNwbGF5XG4gICAgICAgICAgICAgIGlmIChyMCAhPT0gdW5kZWZpbmVkICYmIHIxICE9IHVuZGVmaW5lZCAmJiByMC5odG1sKCkgJiYgcjEuaHRtbCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocjAgIT09IHVuZGVmaW5lZCAmJiByMC5odG1sKCkpIHtcblx0ICAgICAgICBjb2xzLnB1c2gocjAuaHRtbCgpKTtcblx0ICAgICAgfSBlbHNlIGlmIChyMSAhPT0gdW5kZWZpbmVkICYmIHIxLmh0bWwoKSkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaChyMS5odG1sKCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuXHRcdGNvbHMucHVzaChcIlwiKTtcblx0ICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGVhZGVyUm93cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvL2lmIHRoZXJlIGFyZSB0d28gb3IgbW9yZSBoZWFkZXIsIGZvcmdldCBhYm91dCBpdFxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHMgPSBmaW5kQ29sdW1uTmFtZXMoJChlbGVtKS5maW5kKCd0aGVhZCcpWzBdKTtcblx0ICB9XG5cbiAgICAgICAgICB2YXIgdmFscyA9IGZpbmRWYWx1ZXMoJChlbGVtKS5maW5kKCd0Ym9keScpWzBdKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJUYWJsZURpc3BsYXlcIixcbiAgICAgICAgICAgIHRhYmxlRGlzcGxheU1vZGVsOiB7XG4gICAgICAgICAgICAgIGNvbHVtbk5hbWVzOiBjb2xzLFxuICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2x1bW5OYW1lczogY29scyxcbiAgICAgICAgICAgIHZhbHVlczogdmFsc1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgZm9ybWF0VGltZVN0cmluZzogZnVuY3Rpb24obWlsbGlzKSB7XG4gICAgICAgIGlmIChtaWxsaXMgPCA2MCAqIDEwMDApIHtcbiAgICAgICAgICByZXR1cm4gKG1pbGxpcyAvIDEwMDApLnRvRml4ZWQoMSkgKyBcInNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKG1pbGxpcyk7XG4gICAgICAgICAgdmFyIGQgPSBNYXRoLmZsb29yKG1pbGxpcyAvICgyNCAqIDYwICogNjAgKiAxMDAwKSk7XG4gICAgICAgICAgdmFyIGggPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgICAgICAgdmFyIG0gPSBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICAgICAgICB2YXIgcyA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgIGlmIChkID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IChkICsgXCJkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAoaCArIFwiaFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG0gPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gKG0gKyBcIm1cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IChzICsgXCJzXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNNaWRkbGVDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LmJ1dHRvbiA9PT0gMSAvLyBtaWRkbGUgY2xpY2tcbiAgICAgICAgICAgIHx8IChldmVudC5idXR0b24gPT09IDAgLy8gbGVmdCBjbGlja1xuICAgICAgICAgICAgJiYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNYWNcIikgIT09IC0xID8gZXZlbnQubWV0YUtleSA6IGV2ZW50LmN0cmxLZXkpKTtcbiAgICAgIH0sXG4gICAgICBzYXZlQXNDbGllbnRGaWxlOiBmdW5jdGlvbiAoZGF0YSwgZmlsZW5hbWUpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignY29tbW9uVXRpbHMuc2F2ZUFzQ2xpZW50RmlsZTogTm8gZGF0YScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZmlsZW5hbWUpIHtcbiAgICAgICAgICBmaWxlbmFtZSA9ICdjb25zb2xlLmpzb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIHVuZGVmaW5lZCwgNClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogJ3RleHQvanNvbid9KSxcbiAgICAgICAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKSxcbiAgICAgICAgICAgIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICAgICAgICBhLmRvd25sb2FkID0gZmlsZW5hbWVcbiAgICAgICAgYS5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICAgICAgYS5kYXRhc2V0LmRvd25sb2FkdXJsID0gWyd0ZXh0L2pzb24nLCBhLmRvd25sb2FkLCBhLmhyZWZdLmpvaW4oJzonKVxuICAgICAgICBlLmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUsIGZhbHNlLCB3aW5kb3csIDAsIDAsIDAsIDAsIDAsXG4gICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbClcbiAgICAgICAgYS5kaXNwYXRjaEV2ZW50KGUpXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuY29tbW9uVWlcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBnZW5lcmFsIHN0b3JlIG9mIGxvdyBsZXZlbCBVSSBkaXJlY3RpdmVzLCB3aGljaCBzaG91bGQgYmUgc2VwYXJhdGVkIG91dCBvclxuICogcG90ZW50aWFsbHkgZm91bmQgZXF1aXZhbGVudCBpbiAzcmQgcGFydHkgbGlicmFyaWVzLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbW1vblVpJywgW10pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdvbkN0cmxFbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5iaW5kKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHsgLy8gY3RybCArIGVudGVyXG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoYXR0cnMub25DdHJsRW50ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2VhdENsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgZWxlbWVudC5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2ZvY3VzU3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIFEuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtjZWxsJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQycsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5tb3VzZW92ZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdjZWxsLWJyYWNrZXQtc2VsZWN0ZWQnKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnQubW91c2VvdXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdjZWxsLWJyYWNrZXQtc2VsZWN0ZWQnKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5maWx0ZXIoJ2lzSGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICByZXR1cm4gXyhpbnB1dCkuZmlsdGVyKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgIHJldHVybiAhaXQuaGlkZGVuO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2Ryb3Bkb3duUHJvbW90ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBJcyB5b3VyIGRyb3Bkb3duIGJlaW5nIGNvdmVyZWQgYnkgaXRzIGFuY2VzdG9ycyBzaWJsaW5ncz9cbiAgICAvLyBQcm9tb3RlIHRoYXQgc2hpeiwgYW5kIHByZXBlbmQgaXQgdG8gdGhlIG5vdGVib29rIHNvIGl0IGRvZXNuJ3RcbiAgICAvLyBldmVyIGdldCBidWxsaWVkIGFnYWluLlxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0MnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICQod2luZG93KS5vbignY2xpY2suJyArIHNjb3BlLiRpZCwgaGlkZURyb3Bkb3duKTtcblxuICAgICAgICB2YXIgZHJvcGRvd24gPSBlbGVtZW50LmZpbmQoJy5kcm9wZG93bi1tZW51JykuZmlyc3QoKTtcbiAgICAgICAgdmFyIHRvZ2dsZSA9IGVsZW1lbnQuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpLmZpcnN0KCk7XG5cbiAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCAnLmRyb3Bkb3duLXRvZ2dsZScsIHRvZ2dsZURyb3Bkb3duKTtcblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bigpIHtcbiAgICAgICAgICBpZiAoJChkcm9wZG93bikuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHJldHVybiBoaWRlRHJvcGRvd24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93RHJvcGRvd24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaG93RHJvcGRvd24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5vdGVib29rID0gYmtIZWxwZXIuZ2V0Tm90ZWJvb2tFbGVtZW50KHNjb3BlKTtcbiAgICAgICAgICAgIHZhciB0b2dnbGVQb3NpdGlvbiA9IHRvZ2dsZS5vZmZzZXQoKTtcbiAgICAgICAgICAgIHZhciBub3RlYm9va1Bvc2l0aW9uID0gbm90ZWJvb2sub2Zmc2V0KCk7XG5cbiAgICAgICAgICAgIGRyb3Bkb3duLnByZXBlbmRUbyhub3RlYm9vayk7XG5cbiAgICAgICAgICAgIGRyb3Bkb3duLnNob3coKS5jc3Moe1xuICAgICAgICAgICAgICB0b3A6IHRvZ2dsZVBvc2l0aW9uLnRvcCAtIG5vdGVib29rUG9zaXRpb24udG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgbGVmdDogdG9nZ2xlUG9zaXRpb24ubGVmdCAtIG5vdGVib29rUG9zaXRpb24ubGVmdCAtIGRyb3Bkb3duLm91dGVyV2lkdGgoKSArICdweCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBoaWRlRHJvcGRvd24oKSB7IGRyb3Bkb3duLmhpZGUoKTt9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQod2luZG93KS5vZmYoJy4nICsgc2NvcGUuJGlkKTtcbiAgICAgICAgICAvLyBTaW5jZSB0aGUgZHJvcGRvd24gaXMgZXh0ZXJuYWwgdG8gdGhlIGRpcmVjdGl2ZSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0byBjbGVhbiBpdCB1cCB3aGVuIHRoZSBkaXJlY3RpdmUgZ29lcyBhd2F5XG4gICAgICAgICAgZHJvcGRvd24ucmVtb3ZlKCk7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia0Ryb3Bkb3duTWVudScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsndGVtcGxhdGUvZHJvcGRvd24nXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgJ21lbnVJdGVtcyc6ICc9JyxcblxuICAgICAgICAvLyBDbGFzc2VzIHRvIGJlIGFkZGVkIHRvIGFueSBzdWJtZW51IGl0ZW0uIFVzZWQgZm9yIGFkZGluZ1xuICAgICAgICAvLyBwdWxsLWxlZnQgdG8gbWVudXMgdGhhdCBhcmUgb24gdGhlIGZhciByaWdodCAoZS5nLiBia2NlbGxtZW51KS5cbiAgICAgICAgc3VibWVudUNsYXNzZXM6ICdAJ1xuICAgICAgfSxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmdldE1lbnVJdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLnJlc3VsdCgkc2NvcGUsICdtZW51SXRlbXMnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtEcm9wZG93bk1lbnVJdGVtJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ3RlbXBsYXRlL2Ryb3Bkb3duX2l0ZW0nXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgJ2l0ZW0nOiAnPSdcbiAgICAgIH0sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBpc0l0ZW1EaXNhYmxlZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uZGlzYWJsZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5kaXNhYmxlZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbS5kaXNhYmxlZDtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0QUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXNJdGVtRGlzYWJsZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW1zICYmIGl0ZW0uaXRlbXMubGVuZ3RoIDw9IDEgJiYgaXRlbS5hdXRvUmVkdWNlKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Rpc2FibGVkLWxpbmsnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgaWYgKGlzSXRlbURpc2FibGVkKGl0ZW0uaXRlbXNbMF0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Rpc2FibGVkLWxpbmsnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQucHVzaChpdGVtLmlkKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0SXRlbUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZGl2aWRlcicpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXZpZGVyJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdzdWJtZW51JyB8fCBpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA8PSAxICYmIGl0ZW0uYXV0b1JlZHVjZSkge1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaCgnZHJvcGRvd24tc3VibWVudScpO1xuICAgICAgICAgICAgICAvLyBBZGQgYW55IGV4dHJhIHN1Ym1lbnUgY2xhc3Nlcy4gKGUuZy4gdG8gc3BlY2lmeSBpZiBpdCBzaG91bGQgYmUgbGVmdCBvciByaWdodCkuXG4gICAgICAgICAgICAgIGlmICgkc2NvcGUuc3VibWVudUNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2goXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWJtZW51Q2xhc3Nlcy5zcGxpdCgnICcpLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUucnVuQWN0aW9uID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1zICYmIGl0ZW0uaXRlbXMubGVuZ3RoID09PSAxICYmIGl0ZW0uYXV0b1JlZHVjZSkge1xuICAgICAgICAgICAgaXRlbS5pdGVtc1swXS5hY3Rpb24oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmFjdGlvbikpIHtcbiAgICAgICAgICAgICAgaXRlbS5hY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldE5hbWUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSAnJztcbiAgICAgICAgICBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiBpdGVtLmF1dG9SZWR1Y2UpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zWzBdLnJlZHVjZWROYW1lKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSBpdGVtLml0ZW1zWzBdLnJlZHVjZWROYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmFtZSA9IGl0ZW0uaXRlbXNbMF0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTWVudUl0ZW1DaGVja2VkID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmlzQ2hlY2tlZCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXNDaGVja2VkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pc0NoZWNrZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICBzY29wZS5nZXRTdWJJdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oc2NvcGUuaXRlbS5pdGVtcykpIHtcbiAgICAgICAgICAgIHJldHVybiBzY29wZS5pdGVtLml0ZW1zKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzY29wZS5pdGVtLml0ZW1zO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oJ2dldFN1Ykl0ZW1zKCknLCBmdW5jdGlvbihpdGVtcywgb2xkSXRlbXMpIHtcbiAgICAgICAgICBpZiAoIV8uaXNFbXB0eShpdGVtcykpIHtcbiAgICAgICAgICAgIC8vanNjczpkaXNhYmxlXG4gICAgICAgICAgICAkY29tcGlsZSgnPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cImdldFN1Ykl0ZW1zKClcIj48L2JrLWRyb3Bkb3duLW1lbnU+Jykoc2NvcGUsIGZ1bmN0aW9uKGNsb25lZCwgc2NvcGUpIHtcbiAgICAgICAgICAgIC8vanNjczplbmFibGVcbiAgICAgICAgICAgICAgZWxlbWVudC5maW5kKCd1bC5kcm9wZG93bi1tZW51JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrRW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICBlbGVtZW50LmJpbmQoJ2tleWRvd24ga2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMuYmtFbnRlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtMYW5ndWFnZUxvZ28nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiAnPHNwYW4gbmctc3R5bGU9XCJzdHlsZVwiPnt7bmFtZX19PC9zcGFuPicsXG4gICAgICBzY29wZToge1xuICAgICAgICBuYW1lOiAnQCcsXG4gICAgICAgIGJnQ29sb3I6ICdAJyxcbiAgICAgICAgZmdDb2xvcjogJ0AnLFxuICAgICAgICBib3JkZXJDb2xvcjogJ0AnXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLnN0eWxlID0ge1xuICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogc2NvcGUuYmdDb2xvcixcbiAgICAgICAgICAnY29sb3InOiBzY29wZS5mZ0NvbG9yXG4gICAgICAgIH07XG4gICAgICAgIHZhciB1cGRhdGVTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLnN0eWxlID0ge1xuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBzY29wZS5iZ0NvbG9yLFxuICAgICAgICAgICAgJ2NvbG9yJzogc2NvcGUuZmdDb2xvclxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHNjb3BlLmJvcmRlckNvbG9yKSB7XG4gICAgICAgICAgICBzY29wZS5zdHlsZVsnYm9yZGVyLXdpZHRoJ10gPSAnMXB4JztcbiAgICAgICAgICAgIHNjb3BlLnN0eWxlWydib3JkZXItY29sb3InXSA9IHNjb3BlLmJvcmRlckNvbG9yO1xuICAgICAgICAgICAgc2NvcGUuc3R5bGVbJ2JvcmRlci1zdHlsZSddID0gJ3NvbGlkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLnN0eWxlWydib3JkZXItd2lkdGgnXTtcbiAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5zdHlsZVsnYm9yZGVyLWNvbG9yJ107XG4gICAgICAgICAgICBkZWxldGUgc2NvcGUuc3R5bGVbJ2JvcmRlci1zdHlsZSddO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdiZ0NvbG9yJywgdXBkYXRlU3R5bGUpO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2ZnQ29sb3InLCB1cGRhdGVTdHlsZSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnYm9yZGVyQ29sb3InLCB1cGRhdGVTdHlsZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuYW5ndWxhclV0aWxzXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBBbmd1bGFySlMgc3BlY2lmaWMgdXRpbGl0aWVzIHRoYXQgYXJlIHNoYXJlZCBhY3Jvc3MgdGhlIHdob2xlIGFwcGxpY2F0aW9uLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5hbmd1bGFyVXRpbHMnLCBbXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdhbmd1bGFyVXRpbHMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRodHRwLCAkcSwgJHRpbWVvdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0TG9jYXRpb246IGZ1bmN0aW9uKG5ld0xvY2F0aW9uKSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKG5ld0xvY2F0aW9uKTtcbiAgICAgIH0sXG4gICAgICByZWZyZXNoUm9vdFNjb3BlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kJHBoYXNlIHx8ICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgdG9QcmV0dHlKc29uOiBmdW5jdGlvbihhbmd1bGFyQm91bmRKc09iaikge1xuICAgICAgICBpZihhbmd1bGFyQm91bmRKc09iai5jZWxscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgYW5ndWxhckJvdW5kSnNPYmouY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5ib2R5ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmJvZHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uYm9keSA9IGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmJvZHkuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQgIT09IHVuZGVmaW5lZCAmJiBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dC5ib2R5ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQuYm9keSA9IGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0LmJvZHkuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNsZWFudXAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgIGlmIChrZXkgPT09ICckJGhhc2hLZXknKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJldCA9IEpTT04uc3RyaW5naWZ5KGFuZ3VsYXJCb3VuZEpzT2JqLCBjbGVhbnVwLCA0KSArIFwiXFxuXCI7XG4gICAgICAgIHRoaXMucmVtb3ZlU3RyaW5nQXJyYXlzKGFuZ3VsYXJCb3VuZEpzT2JqKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG4gICAgICByZW1vdmVTdHJpbmdBcnJheXM6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBpZihvYmouY2VsbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaSA8IG9iai5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9iai5jZWxsc1tpXS5ib2R5ICE9PSB1bmRlZmluZWQgJiYgJC5pc0FycmF5KG9iai5jZWxsc1tpXS5ib2R5KSkge1xuICAgICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gJ1xcbic7XG4gICAgICAgICAgICAgIG9iai5jZWxsc1tpXS5ib2R5ID0gb2JqLmNlbGxzW2ldLmJvZHkuam9pbihbc2VwYXJhdG9yXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqLmNlbGxzW2ldLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgb2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgIT09IHVuZGVmaW5lZCAmJiAkLmlzQXJyYXkob2JqLmNlbGxzW2ldLmlucHV0LmJvZHkpKSB7XG4gICAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSAnXFxuJztcbiAgICAgICAgICAgICAgb2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgPSBvYmouY2VsbHNbaV0uaW5wdXQuYm9keS5qb2luKFtzZXBhcmF0b3JdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmcm9tUHJldHR5SnNvbjogZnVuY3Rpb24oanNvblN0cmluZykge1xuICAgICAgICAgIHZhciByZXQgPSBhbmd1bGFyLmZyb21Kc29uKGpzb25TdHJpbmcpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlU3RyaW5nQXJyYXlzKHJldCk7XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG4gICAgICBodHRwR2V0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHttZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsLCBwYXJhbXM6IGRhdGF9KTtcbiAgICAgIH0sXG4gICAgICBodHRwUG9zdDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICBkYXRhOiAkLnBhcmFtKGRhdGEpLFxuICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGh0dHBQdXRKc29uOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBuZXdEZWZlcnJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkcS5kZWZlcigpO1xuICAgICAgfSxcbiAgICAgIG5ld1Byb21pc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJHEuYWxsLmFwcGx5KCRxLCBhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICAgIGZjYWxsOiBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZnVuYygpKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHRpbWVvdXQ6IGZ1bmN0aW9uIChmdW5jLCBtcykge1xuICAgICAgICByZXR1cm4gJHRpbWVvdXQoZnVuYywgbXMpO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbFRpbWVvdXQ6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHByb21pc2UpO1xuICAgICAgfSxcbiAgICAgIGRlbGF5OiBmdW5jdGlvbihtcykge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIH0sIG1zKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIGlzIGEgcmV1c2FibGUgVUkgY29tcG9uZW50IGZvciB0cmVlIHZpZXdzLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHRyZWVWaWV3ID0gYW5ndWxhci5tb2R1bGUoJ2JrLnRyZWVWaWV3JywgWyduZ0FuaW1hdGUnXSk7XG5cbiAgdHJlZVZpZXcuZmFjdG9yeSgnZmlsZVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3Byb3ZpZGVyID0ge307XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldFByb3ZpZGVyOiBmdW5jdGlvbihwcm92aWRlcnMpIHtcbiAgICAgICAgX3Byb3ZpZGVyID0gcHJvdmlkZXJzO1xuICAgICAgfSxcbiAgICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbih1cmksIGNhbGxiYWNrKSB7XG4gICAgICAgIF9wcm92aWRlci5nZXRDaGlsZHJlbih1cmksIGNhbGxiYWNrKTtcbiAgICAgIH0sXG4gICAgICBmaWxsSW5wdXQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICBfcHJvdmlkZXIuZmlsbElucHV0KHVyaSk7XG4gICAgICB9LFxuICAgICAgb3BlbjogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIF9wcm92aWRlci5vcGVuKHVyaSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgdHJlZVZpZXcuZGlyZWN0aXZlKFwidHJlZVZpZXdcIiwgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUsICRyb290U2NvcGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBcIjx0cmVlLW5vZGUgZGF0YT0ncm9vdCcgZnM9J2ZzJyBkaXNwbGF5bmFtZT0ne3sgcm9vdHVyaSB9fSc+PC90cmVlLW5vZGU+XCIsXG4gICAgICBzY29wZToge3Jvb3R1cmk6IFwiQFwiLCBmczogXCI9XCJ9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIGlmICghJHRlbXBsYXRlQ2FjaGUuZ2V0KCd0cmVlTm9kZUNoaWxkcmVuLmh0bWwnKSkge1xuICAgICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgndHJlZU5vZGVDaGlsZHJlbi5odG1sJywgXCI8dHJlZS1ub2RlIGNsYXNzPSdiay10cmVldmlldycgbmctcmVwZWF0PSdkIGluIGRhdGEuY2hpbGRyZW4gfCBmaWxlRmlsdGVyOmZzLmZpbHRlciB8IG9yZGVyQnk6ZnMuZ2V0T3JkZXJCeSgpOmZzLmdldE9yZGVyUmV2ZXJzZSgpJyBkYXRhPSdkJyBmcz0nZnMnPjwvdHJlZS1ub2RlPlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghXy5zdHJpbmcuZW5kc1dpdGgoJHNjb3BlLnJvb3R1cmksICcvJykpIHtcbiAgICAgICAgICAkc2NvcGUucm9vdHVyaSA9ICRzY29wZS5yb290dXJpICsgJy8nO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzID0gJHJvb3RTY29wZS5mc1ByZWZzIHx8IHtcbiAgICAgICAgICBvcGVuRm9sZGVyczogW11cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUucm9vdCA9IHtcbiAgICAgICAgICB0eXBlOiBcImRpcmVjdG9yeVwiLFxuICAgICAgICAgIHVyaTogJHNjb3BlLnJvb3R1cmksXG4gICAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5jb250YWlucygkcm9vdFNjb3BlLmZzUHJlZnMub3BlbkZvbGRlcnMsICRzY29wZS5yb290dXJpKSkge1xuICAgICAgICAgICRzY29wZS5mcy5nZXRDaGlsZHJlbigkc2NvcGUucm9vdHVyaSwgJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLnJvb3QuY2hpbGRyZW4gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICB0cmVlVmlldy5maWx0ZXIoXCJmaWxlRmlsdGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihjaGlsZHJlbiwgZmlsdGVyKSB7XG4gICAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGZpbHRlcikgPyBfKGNoaWxkcmVuKS5maWx0ZXIoZmlsdGVyKSA6IGNoaWxkcmVuO1xuICAgIH07XG4gIH0pXG5cbiAgdHJlZVZpZXcuZGlyZWN0aXZlKFwidHJlZU5vZGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogXCI8c3BhbiBuZy1kYmxjbGljaz0nZGJsQ2xpY2soKScgbmctY2xpY2s9J2NsaWNrKCknPjxpIGNsYXNzPSd7eyBnZXRJY29uKCkgfX0nPjwvaT4gPHNwYW4+e3sgZ2V0RGlzcGxheU5hbWUoKSB9fTwvc3Bhbj48L3NwYW4+XCIgK1xuICAgICAgICAgIFwiPGRpdiBjbGFzcz0ncHVzaHJpZ2h0Jz5cIiArXG4gICAgICAgICAgXCI8ZGl2IG5nLWluY2x1ZGU9J1xcXCJ0cmVlTm9kZUNoaWxkcmVuLmh0bWxcXFwiJz48L2Rpdj5cIiArXG4gICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgIHNjb3BlOiB7ZGF0YTogXCI9XCIsIGZzOiBcIj1cIiwgZGlzcGxheW5hbWU6IFwiQFwifSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSkge1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gZnVuY3Rpb24oYykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBjLnR5cGUsXG4gICAgICAgICAgICB1cmk6IGMudXJpLFxuICAgICAgICAgICAgbW9kaWZpZWQ6IGMubW9kaWZpZWQsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogYy5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBfLm1hcChjLmNoaWxkcmVuLCB0cmFuc2Zvcm0pXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgICAgICAgIHZhciB1cmkgPSAkc2NvcGUuZGF0YS51cmk7XG4gICAgICAgICAgICBpZiAoIV8uc3RyaW5nLmVuZHNXaXRoKHVyaSwgJy8nKSkge1xuICAgICAgICAgICAgICB1cmkgPSB1cmkgKyAnLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuZnMuZmlsbElucHV0KHVyaSk7XG4gICAgICAgICAgICAvLyB0b2dnbGVcbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KCRzY29wZS5kYXRhLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5jaGlsZHJlbi5zcGxpY2UoMCwgJHNjb3BlLmRhdGEuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzID0gXy5yZWplY3QoJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzLCBmdW5jdGlvbihmb2xkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5zdHJpbmcuc3RhcnRzV2l0aChmb2xkZXIsIHVyaSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzLnB1c2godXJpKTtcbiAgICAgICAgICAgICAgJHNjb3BlLmZzLmdldENoaWxkcmVuKCRzY29wZS5kYXRhLnVyaSkuc3VjY2VzcyhmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gXy5zb3J0QnkoY2hpbGRyZW4sIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjLnR5cGUgPT09IFwiZGlyZWN0b3J5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiISEhISFcIiArIGMudXJpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYy51cmkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5jaGlsZHJlbiA9IF8ubWFwKGNoaWxkcmVuLCB0cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLmZzLmZpbGxJbnB1dCgkc2NvcGUuZGF0YS51cmkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmRibENsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnR5cGUgPT09ICdkaXJlY3RvcnknKSByZXR1cm47XG5cbiAgICAgICAgICAkc2NvcGUuZnMub3Blbigkc2NvcGUuZGF0YS51cmkpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0SWNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS50eXBlID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZvbGRlci1pY29uJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnR5cGUgPT09IFwiYXBwbGljYXRpb24vcHJzLnR3b3NpZ21hLmJlYWtlci5ub3RlYm9vaytqc29uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi1ib29rJztcbiAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5mcy5nZXRJY29uICYmICRzY29wZS5mcy5nZXRJY29uKCRzY29wZS5kYXRhLnR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmZzLmdldEljb24oJHNjb3BlLmRhdGEudHlwZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi10aCc7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXREaXNwbGF5TmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuZGlzcGxheW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZGlzcGxheW5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5kaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5kYXRhLmRpc3BsYXlOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbmFtZSA9ICRzY29wZS5kYXRhLnVyaTtcbiAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPiAwICYmIG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJy8nKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMCwgbmFtZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvbWV0ZFV0aWxzXG4gKiBUaGlzIG1vZHVsZSBvZmZlcnMgdGhlIGNvbWV0ZCBzZXJ2aWNlIHRoYXQgaXMgdXNlZCB0byByZWNlaXZlICdwdXNoZXMnIGZyb20gdGhlIHNlcnZlci5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29tZXRkVXRpbHMnLCBbXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdjb21ldGRVdGlscycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3N0YXR1c0xpc3RlbmVyO1xuICAgIHZhciBfb3V0cHV0TGlzdGVuZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXRpYWxpemVDb21ldGQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAkLmNvbWV0ZC5pbml0KHtcbiAgICAgICAgICB1cmw6IHVyaVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhZGRDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcjogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgICAgX3N0YXR1c0xpc3RlbmVyID0gJC5jb21ldGQuYWRkTGlzdGVuZXIoXCIvbWV0YS9jb25uZWN0XCIsIGNiKTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3N0YXR1c0xpc3RlbmVyKSB7XG4gICAgICAgICAgJC5jb21ldGQucmVtb3ZlTGlzdGVuZXIoX3N0YXR1c0xpc3RlbmVyKTtcbiAgICAgICAgICBfc3RhdHVzTGlzdGVuZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhZGRPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcjogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgX291dHB1dExpc3RlbmVyID0gJC5jb21ldGQuc3Vic2NyaWJlKFwiL291dHB1dGxvZ1wiLCBjYik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF9vdXRwdXRMaXN0ZW5lcikge1xuICAgICAgICAgICQuY29tZXRkLnJlbW92ZUxpc3RlbmVyKF9vdXRwdXRMaXN0ZW5lcik7XG4gICAgICAgICAgX291dHB1dExpc3RlbmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcigpO1xuICAgICAgICByZXR1cm4gJC5jb21ldGQuZGlzY29ubmVjdCgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rVmVyc2lvbk1hbmFnZXJcbiAqIE9mZmVycyB1dGlsaXRpZXMgdG8gY29udmVydCBiZWFrZXIgbm90ZWJvb2sgb2Ygb2xkIHZlcnNpb25zIHRvIHRoZSBsYXRlc3QgdmVyc2lvblxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9va1ZlcnNpb25NYW5hZ2VyJywgW10pO1xuXG4gIHZhciBia05iVjFDb252ZXJ0ZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgLy8gaW4gdjEsIGNlbGwgbGV2ZWwgYnkgZGVmaW5pdGlvbiBpcyB0aGUgY291bnQgb2Ygc3RlcHMgYXdheSBmcm9tIFwicm9vdFwiIGluIHRoZSB0cmVlXG4gICAgdmFyIGdldFNlY3Rpb25DZWxsTGV2ZWwgPSBmdW5jdGlvbihjZWxsLCB0YWdNYXApIHtcbiAgICAgIHZhciBnZXRQYXJlbnRJZCA9IGZ1bmN0aW9uKGNJZCkge1xuICAgICAgICB2YXIgcElkID0gbnVsbDtcbiAgICAgICAgXyh0YWdNYXApLmZpbmQoZnVuY3Rpb24odiwgaykge1xuICAgICAgICAgIGlmIChfKHYpLmNvbnRhaW5zKGNJZCkpIHtcbiAgICAgICAgICAgIHBJZCA9IGs7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcElkO1xuICAgICAgfTtcbiAgICAgIHZhciBsZXZlbCA9IDA7XG4gICAgICB2YXIgcGFyZW50SWQgPSBnZXRQYXJlbnRJZChjZWxsLmlkKTtcbiAgICAgIHdoaWxlIChwYXJlbnRJZCkge1xuICAgICAgICArK2xldmVsO1xuICAgICAgICBwYXJlbnRJZCA9IGdldFBhcmVudElkKHBhcmVudElkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZXZlbDtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0Q29kZUNlbGwgPSBmdW5jdGlvbihjZWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBcImlkXCI6IGNlbGwuaWQsXG4gICAgICAgIFwidHlwZVwiOiBcImNvZGVcIixcbiAgICAgICAgXCJldmFsdWF0b3JcIjogY2VsbC5ldmFsdWF0b3IsXG4gICAgICAgIFwiaW5wdXRcIjogY2VsbC5pbnB1dCxcbiAgICAgICAgXCJvdXRwdXRcIjogY2VsbC5vdXRwdXRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydFNlY3Rpb25DZWxsID0gZnVuY3Rpb24oY2VsbCwgdGFnTWFwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBcImlkXCI6IGNlbGwuaWQsXG4gICAgICAgIFwidHlwZVwiOiBcInNlY3Rpb25cIixcbiAgICAgICAgXCJsZXZlbFwiOiBnZXRTZWN0aW9uQ2VsbExldmVsKGNlbGwsIHRhZ01hcCksXG4gICAgICAgIFwidGl0bGVcIjogY2VsbC50aXRsZSxcbiAgICAgICAgXCJjb2xsYXBzZWRcIjogY2VsbC5jb2xsYXBzZWRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydFRleHRDZWxsID0gZnVuY3Rpb24oY2VsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJpZFwiOiBjZWxsLmlkLFxuICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgIFwiYm9keVwiOiBjZWxsLmJvZHlcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydE1hcmtkb3duQ2VsbCA9IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiaWRcIjogY2VsbC5pZCxcbiAgICAgICAgXCJ0eXBlXCI6IFwibWFya2Rvd25cIixcbiAgICAgICAgXCJib2R5XCI6IGNlbGwuYm9keSxcbiAgICAgICAgXCJtb2RlXCI6IGNlbGwubW9kZVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0Q2VsbCA9IGZ1bmN0aW9uKGNlbGwsIHRhZ01hcCwgdGFnTWFwMikge1xuICAgICAgdmFyIHJldENlbGw7XG4gICAgICBzd2l0Y2ggKGNlbGwuY2xhc3NbMF0pIHtcbiAgICAgICAgY2FzZSBcImNvZGVcIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydENvZGVDZWxsKGNlbGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2VjdGlvblwiOlxuICAgICAgICAgIHJldENlbGwgPSBjb252ZXJ0U2VjdGlvbkNlbGwoY2VsbCwgdGFnTWFwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydFRleHRDZWxsKGNlbGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWFya2Rvd25cIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydE1hcmtkb3duQ2VsbChjZWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0YWdNYXAyICYmIF8odGFnTWFwMi5pbml0aWFsaXphdGlvbikuY29udGFpbnMoY2VsbC5pZCkpIHtcbiAgICAgICAgcmV0Q2VsbC5pbml0aWFsaXphdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0Q2VsbDtcbiAgICB9O1xuICAgIHZhciBnZXRDZWxsSWRzID0gZnVuY3Rpb24oY2VsbHMsIHRhZ01hcCkge1xuICAgICAgdmFyIGNlbGxJZHMgPSBbXTtcbiAgICAgIHZhciBjSWQsIGNoaWxkcmVuO1xuICAgICAgdmFyIHN0YWNrID0gW1wicm9vdFwiXTtcbiAgICAgIHdoaWxlICghXy5pc0VtcHR5KHN0YWNrKSkge1xuICAgICAgICBjSWQgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgY2VsbElkcy5wdXNoKGNJZCk7XG4gICAgICAgIGlmICh0YWdNYXAuaGFzT3duUHJvcGVydHkoY0lkKSkge1xuICAgICAgICAgIGNoaWxkcmVuID0gXyh0YWdNYXBbY0lkXSkuY2xvbmUoKTtcbiAgICAgICAgICBpZiAoIV8oY2hpbGRyZW4pLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgc3RhY2sgPSBzdGFjay5jb25jYXQoY2hpbGRyZW4ucmV2ZXJzZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjZWxsSWRzO1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlQ2VsbE1hcCA9IGZ1bmN0aW9uKGNlbGxzKSB7XG4gICAgICB2YXIgY2VsbE1hcCA9IHt9O1xuICAgICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgIGNlbGxNYXBbY2VsbC5pZF0gPSBjZWxsO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY2VsbE1hcDtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0Q2VsbHMgPSBmdW5jdGlvbihjZWxscywgdGFnTWFwLCB0YWdNYXAyKSB7XG4gICAgICB2YXIgY2VsbElkcyA9IGdldENlbGxJZHMoY2VsbHMsIHRhZ01hcCk7XG4gICAgICB2YXIgY2VsbE1hcCA9IGdlbmVyYXRlQ2VsbE1hcChjZWxscyk7XG4gICAgICB2YXIgdjJDZWxscyA9IF8oY2VsbElkcykuY2hhaW4oKVxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZCAhPT0gXCJyb290XCI7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbE1hcFtpZF07XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiAhY2VsbC5oaWRlVGl0bGU7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0Q2VsbChjZWxsLCB0YWdNYXAsIHRhZ01hcDIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnZhbHVlKCk7XG4gICAgICByZXR1cm4gdjJDZWxscztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnZlcnQ6IGZ1bmN0aW9uKG5vdGVib29rVjEpIHtcbiAgICAgICAgdmFyIG5vdGVib29rVjIgPSB7XG4gICAgICAgICAgYmVha2VyOiBcIjJcIixcbiAgICAgICAgICBldmFsdWF0b3JzOiBub3RlYm9va1YxLmV2YWx1YXRvcnMsXG4gICAgICAgICAgY2VsbHM6IGNvbnZlcnRDZWxscyhub3RlYm9va1YxLmNlbGxzLCBub3RlYm9va1YxLnRhZ01hcCwgbm90ZWJvb2tWMS50YWdNYXAyKSxcbiAgICAgICAgICBsb2NrZWQ6IG5vdGVib29rVjEubG9ja2VkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub3RlYm9va1YyO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrTm90ZWJvb2tWZXJzaW9uTWFuYWdlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiBmdW5jdGlvbihub3RlYm9vaykge1xuICAgICAgICBpZiAoXy5pc0VtcHR5KG5vdGVib29rKSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImJlYWtlclwiOiBcIjJcIixcbiAgICAgICAgICAgIFwiZXZhbHVhdG9yc1wiOiBbXSxcbiAgICAgICAgICAgIFwiY2VsbHNcIjogW11cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIG5vdGVib29rIGlzIGEgc3RyaW5nLCBwYXJzZSBpdCB0byBqcyBvYmplY3RcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobm90ZWJvb2spKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vdGVib29rID0gYW5ndWxhci5mcm9tSnNvbihub3RlYm9vayk7XG4gICAgICAgICAgICAvLyBUT0RPLCB0byBiZSByZW1vdmVkLiBMb2FkIGEgY29ycnVwdGVkIG5vdGVib29rLlxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobm90ZWJvb2spKSB7XG4gICAgICAgICAgICAgIG5vdGVib29rID0gYW5ndWxhci5mcm9tSnNvbihub3RlYm9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGlzIGlzIG5vdCBhIHZhbGlkIEJlYWtlciBub3RlYm9vayBKU09OXCIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihub3RlYm9vayk7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJOb3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2tcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYmVha2VyIHZlcnNpb24gaXMgdW5kZWZpbmVkXG4gICAgICAgIC8vIHRyZWF0IGl0IGFzIGJlYWtlciBub3RlYm9vayB2MVxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChub3RlYm9vay5iZWFrZXIpKSB7XG4gICAgICAgICAgbm90ZWJvb2suYmVha2VyID0gXCIxXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9jaGVjayB2ZXJzaW9uIGFuZCBzZWUgaWYgbmVlZCBjb252ZXJzaW9uXG4gICAgICAgIGlmIChub3RlYm9vay5iZWFrZXIgPT09IFwiMVwiKSB7XG4gICAgICAgICAgbm90ZWJvb2sgPSBia05iVjFDb252ZXJ0ZXIuY29udmVydChub3RlYm9vayk7XG4gICAgICAgIH0gZWxzZSBpZiAobm90ZWJvb2suYmVha2VyID09PSBcIjJcIikge1xuICAgICAgICAgIC8vIGdvb2QsIFwiMlwiIGlzIHRoZSBjdXJyZW50IHZlcnNpb25cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBcIlVua25vd24gQmVha2VyIG5vdGVib29rIHZlcnNpb25cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3RlYm9vaztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5vdXRwdXRMb2dcbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIHNlcnZpY2Ugb2YgZ2V0IG91dHB1dCBsb2cgZnJvbSB0aGUgc2VydmVyLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXRMb2cnLCBbJ2JrLnV0aWxzJywgJ2JrLmNvbWV0ZFV0aWxzJ10pO1xuICBtb2R1bGUuZmFjdG9yeSgnYmtPdXRwdXRMb2cnLCBmdW5jdGlvbiAoYmtVdGlscywgY29tZXRkVXRpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0TG9nOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3Qvb3V0cHV0bG9nL2dldFwiKSwge30pXG4gICAgICAgICAgICAuc3VjY2VzcyhjYilcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbGVkIHRvIGdldCBvdXRwdXQgbG9nXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLmFkZE91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyKGNiKTtcbiAgICAgIH0sXG4gICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbWV0ZFV0aWxzLnJlbW92ZU91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiAgTW9kdWxlIGJrLnJlY2VudE1lbnVcbiAqICBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlIG9mIHJldHJpZXZpbmcgcmVjZW50IG1lbnUgaXRlbXMgYW5kIHVwZGF0aW5nIHRoZSByZWNlbnQgbWVudS5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsucmVjZW50TWVudScsIFsnYmsuYW5ndWxhclV0aWxzJ10pO1xuXG4gIG1vZHVsZS5wcm92aWRlcihcImJrUmVjZW50TWVudVwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3NlcnZlciA9IG51bGw7XG4gICAgdGhpcy5jb25maWdTZXJ2ZXIgPSBmdW5jdGlvbihzZXJ2ZXIpIHtcbiAgICAgIF9zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgfTtcbiAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbihhbmd1bGFyVXRpbHMpIHtcbiAgICAgIHZhciBvcEl0ZW1zID0ge1xuICAgICAgICBFTVBUWToge25hbWU6IFwiKEVtcHR5KVwiLCBkaXNhYmxlZDogdHJ1ZX0sXG4gICAgICAgIERJVklERVI6IHt0eXBlOiBcImRpdmlkZXJcIn0sXG4gICAgICAgIENMRUFSSU5HOiB7bmFtZTogXCIoQ2xlYXJpbmcuLi4pXCIsIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgICAgVVBEQVRJTkc6IHtuYW1lOiBcIihVcGRhdGluZy4uLilcIiwgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAgICBDTEVBUjoge25hbWU6IFwiQ2xlYXJcIiwgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhck1lbnUoKTtcbiAgICAgICAgfSB9LFxuICAgICAgICBSRUZSRVNIOiB7bmFtZTogXCJSZWZyZXNoXCIsIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVmcmVzaE1lbnUoKTtcbiAgICAgICAgfSB9XG4gICAgICB9O1xuICAgICAgdmFyIF9yZWNlbnRNZW51ID0gW29wSXRlbXMuRU1QVFldO1xuICAgICAgdmFyIHJlZnJlc2hNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3NlcnZlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfcmVjZW50TWVudS5zcGxpY2UoMCwgX3JlY2VudE1lbnUubGVuZ3RoLCBvcEl0ZW1zLlVQREFUSU5HKTtcbiAgICAgICAgX3NlcnZlci5nZXRJdGVtcyhmdW5jdGlvbihpdGVtcykge1xuICAgICAgICAgIHZhciBpLCBISVNUT1JZX0xFTkdUSCA9IDEwO1xuICAgICAgICAgIHZhciBnZXRTaG9ydE5hbWUgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsW3VybC5sZW5ndGggLSAxXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChfLmlzRW1wdHkoaXRlbXMpKSB7XG4gICAgICAgICAgICBfcmVjZW50TWVudS5zcGxpY2UoMCwgX3JlY2VudE1lbnUubGVuZ3RoLCBvcEl0ZW1zLkVNUFRZKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoICYmIGkgPCBISVNUT1JZX0xFTkdUSDsgKytpKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBhbmd1bGFyLmZyb21Kc29uKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgICAgICAgIF9yZWNlbnRNZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnZXRTaG9ydE5hbWUoaXRlbS51cmkpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIF9wYXRoT3BlbmVyLm9wZW4oaXRlbS51cmksIGl0ZW0udHlwZSwgaXRlbS5yZWFkT25seSwgaXRlbS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBpdGVtLnVyaVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGV4aXN0cyBvbmx5IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgX3JlY2VudE1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdldFNob3J0TmFtZShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfcGF0aE9wZW5lci5vcGVuKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBpdGVtXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGFuZ3VsYXJVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBjbGVhck1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCwgb3BJdGVtcy5DTEVBUklORyk7XG4gICAgICAgIF9zZXJ2ZXIuY2xlYXIocmVmcmVzaE1lbnUpO1xuICAgICAgfTtcblxuICAgICAgdmFyIF9wYXRoT3BlbmVyO1xuICAgICAgcmVmcmVzaE1lbnUoKTsgLy8gaW5pdGlhbGl6ZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24ocGF0aE9wZW5lcikge1xuICAgICAgICAgIF9wYXRoT3BlbmVyID0gcGF0aE9wZW5lcjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3JlY2VudE1lbnU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlY29yZFJlY2VudERvY3VtZW50OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKF9zZXJ2ZXIpIHtcbiAgICAgICAgICAgIF9zZXJ2ZXIuYWRkSXRlbShpdGVtLCByZWZyZXNoTWVudSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnNlc3Npb25cbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIHNlcnZpY2VzIG9mIGNvbW11bmljYXRpbmcgdG8gdGhlIHNlc3Npb24gYmFja3VwIGVuZCBwb2ludCB0byBsb2FkIGFuZFxuICogdXBsb2FkKGJhY2t1cCkgYSBzZXNzaW9uLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5zZXNzaW9uJywgWydiay51dGlscyddKTtcbiAgLyoqXG4gICAqIGJrU2Vzc2lvblxuICAgKiAtIHRhbGtzIHRvIGJlYWtlciBzZXJ2ZXIgKC9iZWFrZXIvcmVzdC9zZXNzaW9uKVxuICAgKiAtIGJrU2Vzc2lvbk1hbmFnZXIgc2hvdWxkIGRlcGVuZCBvbiBpdCB0byB1cGRhdGUvYmFja3VwIHRoZSBzZXNzaW9uIG1vZGVsXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnYmtTZXNzaW9uJywgZnVuY3Rpb24oYmtVdGlscykge1xuICAgIHZhciBiYWNrdXBTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbklkLCBzZXNzaW9uRGF0YSkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwUG9zdChia1V0aWxzLnNlcnZlclVybCgnYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvYmFja3VwLycgKyBzZXNzaW9uSWQpLCBzZXNzaW9uRGF0YSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gYmFja3VwIHNlc3Npb246ICcgKyBzZXNzaW9uSWQgKyAnLCAnICsgc3RhdHVzKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnRmFpbGVkIHRvIGJhY2t1cCBzZXNzaW9uOiAnICsgc2Vzc2lvbklkICsgJywgJyArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xuICAgIHZhciBnZXRTZXNzaW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9nZXRFeGlzdGluZ1Nlc3Npb25zJykpXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2Vzc2lvbnMpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc2Vzc2lvbnMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0ZhaWxlZCB0byBnZXQgZXhpc3Rpbmcgc2Vzc2lvbnMgJyArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xuICAgIHZhciBsb2FkU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9sb2FkJyksIHtzZXNzaW9uaWQ6IHNlc3Npb25JZH0pXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2Vzc2lvbiwgc3RhdHVzKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNlc3Npb24pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0ZhaWxlZCB0byBsb2FkIHNlc3Npb246ICcgKyBzZXNzaW9uSWQgKyAnLCAnICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgdmFyIGNsb3NlU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwUG9zdChia1V0aWxzLnNlcnZlclVybCgnYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvY2xvc2UnKSwge3Nlc3Npb25pZDogc2Vzc2lvbklkfSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc2Vzc2lvbklkKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdGYWlsZWQgdG8gY2xvc2Ugc2Vzc2lvbjogJyArIHNlc3Npb25JZCArICcsICcgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICB2YXIgcmVjb3JkTG9hZGVkUGx1Z2luID0gZnVuY3Rpb24ocGx1Z2luTmFtZSwgcGx1Z2luVXJsKSB7XG4gICAgICBia1V0aWxzLmh0dHBQb3N0KFxuICAgICAgICAgIGJrVXRpbHMuc2VydmVyVXJsKCdiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9hZGRQbHVnaW4nKSxcbiAgICAgICAgICB7cGx1Z2lubmFtZTogcGx1Z2luTmFtZSwgcGx1Z2ludXJsOiBwbHVnaW5Vcmx9KVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncmVjb3JkTG9hZGVkUGx1Z2luJyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBhZGQgcGx1Z2luLCAnICsgcGx1Z2luTmFtZSArICcsICcgKyBwbHVnaW5VcmwgKyAnLCAnICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRQbHVnaW5zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoJ2JlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2dldEV4aXN0aW5nUGx1Z2lucycpLCB7fSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihwbHVnaW5zKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHBsdWdpbnMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0ZhaWxlZCB0byBnZXQgZXhpc3RpbmcgcGx1Z2lucywgJyArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBnZXRTZXNzaW9uczogZ2V0U2Vzc2lvbnMsXG4gICAgICBsb2FkOiBsb2FkU2Vzc2lvbixcbiAgICAgIGJhY2t1cDogYmFja3VwU2Vzc2lvbixcbiAgICAgIGNsb3NlOiBjbG9zZVNlc3Npb24sXG4gICAgICByZWNvcmRMb2FkZWRQbHVnaW46IHJlY29yZExvYWRlZFBsdWdpbixcbiAgICAgIGdldFBsdWdpbnM6IGdldFBsdWdpbnNcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5zaGFyZVxuICogVGhpcyBtb2R1bGUgb3ducyB0aGUgYmtTaGFyZSBzZXJ2aWNlIHdoaWNoIGNvbW11bmljYXRlIHdpdGggdGhlIGJhY2tlbmQgdG8gY3JlYXRlIHNoYXJhYmxlXG4gKiBjb250ZW50IGFzIHdlbGwgYXMgdG8gcmV0dXJuIFVSTCBvZiB0aGUgc2hhcmQgY29udGVudC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuc2hhcmUnLCBbXSk7XG5cbiAgbW9kdWxlLnByb3ZpZGVyKFwiYmtTaGFyZVwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3NoYXJpbmdTZXJ2aWNlID0gbnVsbDtcbiAgICB0aGlzLmNvbmZpZyA9IGZ1bmN0aW9uKHNoYXJpbmdTZXJ2aWNlKSB7XG4gICAgICBfc2hhcmluZ1NlcnZpY2UgPSBzaGFyaW5nU2VydmljZTtcbiAgICB9O1xuICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFfc2hhcmluZ1NlcnZpY2UpIHtcbiAgICAgICAgdmFyIG5vT3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBkbyBub3RoaW5nIGZvciBub3dcbiAgICAgICAgICAvLyB3ZSBtaWdodCBjb25zaWRlciBsb2dnaW5nIGVycm9yIG9yIHdhcm5pbmc6XG4gICAgICAgICAgLy9jb25zb2xlLmVycm9yKFwibm8gc2hhcmluZyBzZXJ2aWNlIGF2YWlsYWJsZVwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwdWJsaXNoOiBub09wLFxuICAgICAgICAgIGdldFNoYXJhYmxlVXJsOiBub09wXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyB0aGUgcmVhc29uIG9mIHdyYXBwaW5nIHRoZSBzdHJhdGVneSBpbnN0ZWFkIG9mIGp1c3QgcmV0dXJuXG4gICAgICAvLyBpdCAoX3NoYXJpbmdTZXJ2aWNlKSBpcyB0byBtYWtlIHRoZSBBUEkgZXhwbGljaXQuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwdWJsaXNoOiBmdW5jdGlvbih1cmksIGNvbnRlbnQsIGNiKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5wdWJsaXNoKHVyaSwgY29udGVudCwgY2IpO1xuICAgICAgICB9LFxuICAgICAgICBnZW5lcmF0ZUV4Y2VsOiBmdW5jdGlvbihwYXRoLCB0YWJsZSwgY2IpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdlbmVyYXRlRXhjZWwocGF0aCwgdGFibGUsIGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2hhcmFibGVVcmw6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UuZ2V0U2hhcmFibGVVcmwodXJpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2hhcmFibGVVcmxfU2VjdGlvbkNlbGw6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UuZ2V0U2hhcmFibGVVcmxfU2VjdGlvbkNlbGwodXJpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2hhcmFibGVVcmxfQ29kZUNlbGw6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UuZ2V0U2hhcmFibGVVcmxfQ29kZUNlbGwodXJpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2hhcmFibGVVcmxfVGFibGU6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UuZ2V0U2hhcmFibGVVcmxfVGFibGUodXJpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2hhcmFibGVVcmxfTm90ZWJvb2s6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UuZ2V0U2hhcmFibGVVcmxfTm90ZWJvb2sodXJpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay50cmFja1xuICogVGhpcyBtb2R1bGUgb3ducyB0aGUgc2VydmljZSB0aGF0IGNhbiBiZSBjb25maWd1cmVkIHRvIDNyZCBwYXJ0eSBwcm92aWRlZCB1c2FnZSBtZXRyaWNcbiAqIGxvZ2dpbmcgc2VydmljZXMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnRyYWNrJywgW10pO1xuXG4gIG1vZHVsZS5wcm92aWRlcignYmtUcmFjaycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdHJhY2tpbmdTZXJ2aWNlID0gbnVsbDtcbiAgICB0aGlzLmNvbmZpZyA9IGZ1bmN0aW9uKHRyYWNraW5nU2VydmljZSkge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbih0cmFja2luZ1NlcnZpY2UpKSB7XG4gICAgICAgIF90cmFja2luZ1NlcnZpY2UgPSB0cmFja2luZ1NlcnZpY2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90cmFja2luZ1NlcnZpY2UgPSB0cmFja2luZ1NlcnZpY2U7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghX3RyYWNraW5nU2VydmljZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxvZzogZnVuY3Rpb24oZXZlbnQsIG9iaikge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNOZWVkUGVybWlzc2lvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbG9nOiBmdW5jdGlvbihldmVudCwgb2JqZWN0KSB7XG4gICAgICAgICAgX3RyYWNraW5nU2VydmljZS5sb2coZXZlbnQsIG9iamVjdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gc29tZSB0cmFja2luZyBzZXJ2aWNlIHdpbGwgbmVlZCB0byBiZSBlbmFibGVkIGJlZm9yZSBiZWluZyB1c2VkXG4gICAgICAgICAgaWYgKF90cmFja2luZ1NlcnZpY2UuZW5hYmxlICYmIF8uaXNGdW5jdGlvbihfdHJhY2tpbmdTZXJ2aWNlLmVuYWJsZSkpIHtcbiAgICAgICAgICAgIF90cmFja2luZ1NlcnZpY2UuZW5hYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBzb21lIHRyYWNraW5nIHNlcnZpY2Ugd2lsbCBuZWVkIHRvIGJlIGVuYWJsZWQgYmVmb3JlIGJlaW5nIHVzZWRcbiAgICAgICAgICBpZiAoX3RyYWNraW5nU2VydmljZS5kaXNhYmxlICYmIF8uaXNGdW5jdGlvbihfdHJhY2tpbmdTZXJ2aWNlLmRpc2FibGUpKSB7XG4gICAgICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlLmRpc2FibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzTmVlZFBlcm1pc3Npb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdHJhY2tpbmdTZXJ2aWNlLmlzTmVlZFBlcm1pc3Npb25cbiAgICAgICAgICAgICAgJiYgXy5pc0Z1bmN0aW9uKF90cmFja2luZ1NlcnZpY2UuaXNOZWVkUGVybWlzc2lvbilcbiAgICAgICAgICAgICAgJiYgX3RyYWNraW5nU2VydmljZS5pc05lZWRQZXJtaXNzaW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsudXRpbHNcbiAqIFRoaXMgbW9kdWxlIGNvbnRhaW5zIHRoZSBsb3cgbGV2ZWwgdXRpbGl0aWVzIHVzZWQgYnkgQmVha2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnV0aWxzJywgW1xuICAgICdiay5jb21tb25VdGlscycsXG4gICAgJ2JrLmFuZ3VsYXJVdGlscycsXG4gICAgJ2JrLmNvbWV0ZFV0aWxzJyxcbiAgICAnYmsudHJhY2snXG4gIF0pO1xuICAvKipcbiAgICogYmtVdGlsc1xuICAgKiAtIGhvbGRzIGdlbmVyYWwvbG93MGxldmVsIHV0aWxpdGllcyB0aGF0IGFyZSBiZWFrZXIgc3BlY2lmaWMgdGhhdCBoYXMgbm8gZWZmZWN0IHRvIERPTSBkaXJlY3RseVxuICAgKiAtIGl0IGFsc28gc2VydmVzIHRoZSBwdXJwb3NlIG9mIGhpZGluZyB1bmRlcm5lYXRoIHV0aWxzOiBjb21tb25VdGlscy9hbmd1bGFyVXRpbHMvLi4uXG4gICAqICAgIGZyb20gb3RoZXIgcGFydHMgb2YgYmVha2VyXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnYmtVdGlscycsIGZ1bmN0aW9uKGNvbW1vblV0aWxzLCBhbmd1bGFyVXRpbHMsIGJrVHJhY2ssIGNvbWV0ZFV0aWxzKSB7XG5cbiAgICBmdW5jdGlvbiBlbmRzV2l0aChzdHIsIHN1ZmZpeCkge1xuICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHNlcnZlclJvb3QgPSBlbmRzV2l0aChkb2N1bWVudC5iYXNlVVJJLCAnYmVha2VyLycpID8gZG9jdW1lbnQuYmFzZVVSSS5zdWJzdHJpbmcoMCxkb2N1bWVudC5iYXNlVVJJLmxlbmd0aC03KTogZG9jdW1lbnQuYmFzZVVSSTtcbiAgICBcbiAgICBmdW5jdGlvbiBzZXJ2ZXJVcmwocGF0aCkge1xuICAgICAgcmV0dXJuIHNlcnZlclJvb3QgKyBwYXRoO1xuICAgIH1cblxuICAgIHZhciBmaWxlUm9vdCA9IGRvY3VtZW50LmJhc2VVUkk7XG4gICAgXG4gICAgZnVuY3Rpb24gZmlsZVVybChwYXRoKSB7XG4gICAgICByZXR1cm4gZmlsZVJvb3QgKyBwYXRoO1xuICAgIH1cblxuICAgIC8vIGFqYXggbm90ZWJvb2sgbG9jYXRpb24gdHlwZXMgc2hvdWxkIGJlIG9mIHRoZSBmb3JtXG4gICAgLy8gYWpheDovbG9hZGluZy9wYXRoOi9zYXZpbmcvcGF0aFxuICAgIGZ1bmN0aW9uIHBhcnNlQWpheExvY2F0b3IobG9jYXRvcikge1xuICAgICAgdmFyIHBpZWNlcyA9IGxvY2F0b3Iuc3BsaXQoXCI6XCIpO1xuICAgICAgcmV0dXJuIHsgc291cmNlOiBwaWVjZXNbMV0sIGRlc3RpbmF0aW9uOiBwaWVjZXNbMl0gfVxuICAgIH1cblxuICAgIHZhciBia1V0aWxzID0ge1xuICAgICAgICBzZXJ2ZXJVcmw6IHNlcnZlclVybCxcbiAgICAgICAgZmlsZVVybDogZmlsZVVybCxcblxuICAgICAgLy8gd3JhcCB0cmFja2luZ1NlcnZpY2VcbiAgICAgIGxvZzogZnVuY3Rpb24oZXZlbnQsIG9iaikge1xuICAgICAgICBia1RyYWNrLmxvZyhldmVudCwgb2JqKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIHdyYXAgY29tbW9uVXRpbHNcbiAgICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuZ2VuZXJhdGVJZChsZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIGxvYWRKUzogZnVuY3Rpb24odXJsLCBzdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5sb2FkSlModXJsLCBzdWNjZXNzKTtcbiAgICAgIH0sXG4gICAgICBsb2FkQ1NTOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmxvYWRDU1ModXJsKTtcbiAgICAgIH0sXG4gICAgICBsb2FkTGlzdDogZnVuY3Rpb24odXJscywgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMubG9hZExpc3QodXJscywgc3VjY2VzcywgZmFpbHVyZSk7XG4gICAgICB9LFxuICAgICAgZm9ybWF0VGltZVN0cmluZzogZnVuY3Rpb24obWlsbGlzKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5mb3JtYXRUaW1lU3RyaW5nKG1pbGxpcyk7XG4gICAgICB9LFxuICAgICAgaXNNaWRkbGVDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmlzTWlkZGxlQ2xpY2soZXZlbnQpO1xuICAgICAgfSxcbiAgICAgIGdldEV2ZW50T2Zmc2V0WDogZnVuY3Rpb24oZWxlbSwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmdldEV2ZW50T2Zmc2V0WChlbGVtLCBldmVudCk7XG4gICAgICB9LFxuICAgICAgZmluZFRhYmxlOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5maW5kVGFibGUoZWxlbSk7XG4gICAgICB9LFxuICAgICAgc2F2ZUFzQ2xpZW50RmlsZTogZnVuY3Rpb24oZGF0YSwgZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLnNhdmVBc0NsaWVudEZpbGUoZGF0YSwgZmlsZW5hbWUpO1xuICAgICAgfSxcblxuICAgICAgLy8gd3JhcCBhbmd1bGFyVXRpbHNcbiAgICAgIHJlZnJlc2hSb290U2NvcGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBhbmd1bGFyVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgfSxcbiAgICAgIHRvUHJldHR5SnNvbjogZnVuY3Rpb24oanNPYmopIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy50b1ByZXR0eUpzb24oanNPYmopO1xuICAgICAgfSxcbiAgICAgIGZyb21QcmV0dHlKc29uOiBmdW5jdGlvbihqU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuZnJvbVByZXR0eUpzb24oalN0cmluZyk7XG4gICAgICB9LFxuICAgICAgaHR0cEdldDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuaHR0cEdldCh1cmwsIGRhdGEpO1xuICAgICAgfSxcbiAgICAgIGh0dHBQb3N0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5odHRwUG9zdCh1cmwsIGRhdGEpO1xuICAgICAgfSxcbiAgICAgIG5ld0RlZmVycmVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgfSxcbiAgICAgIG5ld1Byb21pc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMubmV3UHJvbWlzZSh2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5hbGwuYXBwbHkoYW5ndWxhclV0aWxzLCBhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICAgIGZjYWxsOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuZmNhbGwoZnVuYyk7XG4gICAgICB9LFxuICAgICAgZGVsYXk6IGZ1bmN0aW9uKG1zKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuZGVsYXkobXMpO1xuICAgICAgfSxcbiAgICAgIHRpbWVvdXQ6IGZ1bmN0aW9uKGZ1bmMsbXMpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy50aW1lb3V0KGZ1bmMsbXMpO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbFRpbWVvdXQ6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5jYW5jZWxUaW1lb3V0KHByb21pc2UpOyAgXG4gICAgICB9LFxuICAgICAgc2V0U2VydmVyUm9vdDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHNlcnZlclJvb3QgPSB1cmw7XG4gICAgICB9LFxuICAgICAgc2V0RmlsZVJvb3Q6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICBmaWxlUm9vdCA9IHVybDtcbiAgICAgIH0sXG5cbiAgICAgIC8vIGJlYWtlciBzZXJ2ZXIgaW52b2x2ZWQgdXRpbHNcbiAgICAgIGdldEhvbWVEaXJlY3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgdGhpcy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2ZpbGUtaW8vZ2V0SG9tZURpcmVjdG9yeVwiKSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2V0VmVyc2lvbkluZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgdGhpcy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L3V0aWwvZ2V0VmVyc2lvbkluZm9cIikpXG4gICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdldFN0YXJ0VXBEaXJlY3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgdGhpcy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2ZpbGUtaW8vZ2V0U3RhcnRVcERpcmVjdG9yeVwiKSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2V0RGVmYXVsdE5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L3V0aWwvZ2V0RGVmYXVsdE5vdGVib29rXCIpKS5cbiAgICAgICAgICAgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGFuZ3VsYXIuZnJvbUpzb24oZGF0YSkpO1xuICAgICAgICAgICAgfSkuXG4gICAgICAgICAgICBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlciwgY29uZmlnKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChkYXRhLCBzdGF0dXMsIGhlYWRlciwgY29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZW5lcmF0ZU5vdGVib29rOiBmdW5jdGlvbihldmFsdWF0b3JzLCBjZWxscykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGJlYWtlcjogXCIyXCIsXG4gICAgICAgICAgZXZhbHVhdG9yczogZXZhbHVhdG9ycyxcbiAgICAgICAgICBjZWxsczogY2VsbHNcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBsb2FkRmlsZTogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9sb2FkXCIpLCB7cGF0aDogcGF0aH0pXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgIGlmICghXy5pc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIC8vIGFuZ3VsYXIgJGh0dHAgYXV0by1kZXRlY3RzIEpTT04gcmVzcG9uc2UgYW5kIGRlc2VyaWFsaXplIGl0IHVzaW5nIGEgSlNPTiBwYXJzZXJcbiAgICAgICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRoaXMgYmVoYXZpb3IsIHRoaXMgaXMgYSBoYWNrIHRvIHJldmVyc2UgaXRcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoY29udGVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShjb250ZW50KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuXG4gICAgICBsb2FkSHR0cDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9odHRwLXByb3h5L2xvYWRcIiksIHt1cmw6IHVybH0pXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgIGlmICghXy5pc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIC8vIGFuZ3VsYXIgJGh0dHAgYXV0by1kZXRlY3RzIEpTT04gcmVzcG9uc2UgYW5kIGRlc2VyaWFsaXplIGl0IHVzaW5nIGEgSlNPTiBwYXJzZXJcbiAgICAgICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRoaXMgYmVoYXZpb3IsIHRoaXMgaXMgYSBoYWNrIHRvIHJldmVyc2UgaXRcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoY29udGVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShjb250ZW50KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgbG9hZEFqYXg6IGZ1bmN0aW9uKGFqYXhMb2NhdG9yKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cEdldChwYXJzZUFqYXhMb2NhdG9yKGFqYXhMb2NhdG9yKS5zb3VyY2UpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgIGlmICghXy5pc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIC8vIGFuZ3VsYXIgJGh0dHAgYXV0by1kZXRlY3RzIEpTT04gcmVzcG9uc2UgYW5kIGRlc2VyaWFsaXplIGl0IHVzaW5nIGEgSlNPTiBwYXJzZXJcbiAgICAgICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRoaXMgYmVoYXZpb3IsIHRoaXMgaXMgYSBoYWNrIHRvIHJldmVyc2UgaXRcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoY29udGVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShjb250ZW50KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgc2F2ZUZpbGU6IGZ1bmN0aW9uKHBhdGgsIGNvbnRlbnRBc0pzb24sIG92ZXJ3cml0ZSkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgIGFuZ3VsYXJVdGlscy5odHRwUG9zdChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL3NhdmVcIiksIHtwYXRoOiBwYXRoLCBjb250ZW50OiBjb250ZW50QXNKc29ufSlcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBQb3N0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2ZpbGUtaW8vc2F2ZUlmTm90RXhpc3RzXCIpLCB7cGF0aDogcGF0aCwgY29udGVudDogY29udGVudEFzSnNvbn0pXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlciwgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gNDA5KSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJleGlzdHNcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSBcImlzRGlyZWN0b3J5XCIpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChkYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGRhdGEsIHN0YXR1cywgaGVhZGVyLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBzYXZlQWpheDogZnVuY3Rpb24oYWpheExvY2F0b3IsIGNvbnRlbnRBc0pzb24pIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHBhcnNlQWpheExvY2F0b3IoYWpheExvY2F0b3IpLmRlc3RpbmF0aW9uO1xuICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cFB1dEpzb24oZGVzdGluYXRpb24sIHtkYXRhOiBjb250ZW50QXNKc29ufSlcbiAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBpbml0aWFsaXplQ29tZXRkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLmluaXRpYWxpemVDb21ldGQodXJpKTtcbiAgICAgIH0sXG4gICAgICBhZGRDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcjogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLmFkZENvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKGNiKTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5yZW1vdmVDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcigpO1xuICAgICAgfSxcbiAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMuZGlzY29ubmVjdCgpO1xuICAgICAgfSxcblxuICAgICAgYmVnaW5zV2l0aDogZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgICByZXR1cm4gKGhheXN0YWNrLnN1YnN0cigwLCBuZWVkbGUubGVuZ3RoKSA9PT0gbmVlZGxlKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIHdyYXBwZXIgYXJvdW5kIHJlcXVpcmVKU1xuICAgICAgbW9kdWxlTWFwOiB7fSxcbiAgICAgIGxvYWRNb2R1bGU6IGZ1bmN0aW9uKHVybCwgbmFtZSkge1xuICAgICAgICAvLyBuYW1lIGlzIG9wdGlvbmFsLCBpZiBwcm92aWRlZCwgaXQgY2FuIGJlIHVzZWQgdG8gcmV0cmlldmUgdGhlIGxvYWRlZCBtb2R1bGUgbGF0ZXIuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcodXJsKSkge1xuICAgICAgICAgIHZhciBkZWZlcnJlZCA9IHRoaXMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICB3aW5kb3cucmVxdWlyZShbdXJsXSwgZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgdGhhdC5tb2R1bGVNYXBbbmFtZV0gPSB1cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJldCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICBtZXNzYWdlOiBcIm1vZHVsZSBmYWlsZWQgdG8gbG9hZFwiLFxuICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IFwiaWxsZWdhbCBhcmdcIiArIHVybDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmU6IGZ1bmN0aW9uKG5hbWVPclVybCkge1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5tb2R1bGVNYXAuaGFzT3duUHJvcGVydHkobmFtZU9yVXJsKSA/IHRoaXMubW9kdWxlTWFwW25hbWVPclVybF0gOiBuYW1lT3JVcmw7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWlyZSh1cmwpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGJrVXRpbHM7XG4gIH0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==