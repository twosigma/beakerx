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
__p += '\n<ul class="dropdown-menu bkr" role="menu" aria-labelledby="dropdownMenu">\n  <bk-dropdown-menu-item ng-repeat="item in getMenuItems() | isHidden" item="item" class="bkr"></bk-dropdown-menu-item>\n</ul>';

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
__p += '\n\n<div class="evaluator bkr" evaluator-type="{{ cellmodel.evaluator }}" ng-class="{\n  \'evaluator-ready\': cellmodel.evaluatorReader,\n  \'locked\': isLocked(),\n  \'empty\': isEmpty()\n  }">\n\n  <p class="depth-indicator bkr">{{getFullIndex()}}</p>\n  <div class="bkcell code-cell-area bkr">\n    <div class="code-cell-input bkr" ng-click="backgroundClick($event)" ng-hide="isLocked()" ng-class="{\'input-hidden\': cellmodel.input.hidden}">\n      <div class="code-cell-input-content bkr">\n        <bk-code-cell-input-menu class="advanced-hide bkr"></bk-code-cell-input-menu>\n        <div ng-click="$event.stopPropagation()" class="bkr">\n          <textarea class="bkcelltextarea bkr" ng-model="cellmodel.input.body"></textarea>\n        </div>\n        <a href="#" class="btn btn-default evaluate-script advanced-hide bkr" ng-click="evaluate($event)" eat-click="">\n          {{ isJobCancellable() ? \'Stop\' : \'Run\' }}\n        </a>\n      </div>\n    </div>\n    <div ng-if="hasOutput()" class="code-cell-output bkr" ng-class="{\n      \'no-output\': isHiddenOutput(),\n      \'input-hidden\': cellmodel.input.hidden,\n      \'output-hidden\': cellmodel.output.hidden,\n      \'error\': isError()\n      }">\n      <h6 ng-if="outputTitle()" class="bkr">{{outputTitle()}}</h6>\n      <bk-code-cell-output model="cellmodel.output" evaluator-id="{{ cellmodel.evaluator }}" cell-id="{{ cellmodel.id }}" class="bkr">\n      </bk-code-cell-output>\n    </div>\n  </div>\n</div>';

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
__p += '\n\n<p class="depth-indicator bkr">{{getFullIndex()}}</p>\n<bk-markdown-editable cellmodel="cellmodel" class="bkr"></bk-markdown-editable>';

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
__p += '\n\n<p class="depth-indicator bkr">{{getFullIndex()}}</p>\n<div class="textcell-wrapper bkr" ng-click="edit()">\n  <div class="editable-text bkr" contenteditable="{{ isEditable() ? true : false }}" style="min-height: 14px; min-width: 14px"></div>\n</div>';

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
        else if (/^ajax:\/\//.exec(notebookUri)) {
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
          electricChars: false,
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
      scope: {},
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
                  for (var i = 0; i < notebookModel.evaluators.length; ++i) {
                    if (r.test(notebookModel.evaluators[i].plugin)) {
                      plugList += "<li>"+notebookModel.evaluators[i].plugin;
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
                if (notebookModel.cells[i].evaluator != undefined) {
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
              for (var j = 0; j < notebookModel.evaluators.length; ++j) {
                var name = notebookModel.evaluators[j].name;
                var plugin = notebookModel.evaluators[j].plugin;
                if (bkUtils.beginsWith(name,"Html")) {
                  notebookModel.evaluators[j].name = "Html";
                  notebookModel.evaluators[j].plugin = "Html";
                } else if(bkUtils.beginsWith(name,"Latex")) {
                  notebookModel.evaluators[j].name = "Latex";
                  notebookModel.evaluators[j].plugin = "Latex";
                } else if(bkUtils.beginsWith(name,"JavaScript")) {
                  notebookModel.evaluators[j].name = "JavaScript";
                  notebookModel.evaluators[j].plugin = "JavaScript";
                } else if(bkUtils.beginsWith(name,"Groovy")) {
                  notebookModel.evaluators[j].name = "Groovy";
                  notebookModel.evaluators[j].plugin = "Groovy";
                } else if(name === "Python") {
                  notebookModel.evaluators[j].name = plugin;
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
                  bkCoreManager.show1ButtonModal("Failed to open " + target.uri
                      + " because format " + target.format
                      + " was not recognized.", "Open Failed", function() {
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
                var o = {};
                o.cellId = filter.id;
                o.evaluatorId = filter.evaluator;
                o.code = filter.input.body;
                if (filter.dataresult !== undefined) {
                  o.output = filter.dataresult;
                } else if (filter.output !== undefined && filter.output.result !== undefined) {
                  if (filter.output.result.type !== undefined) {
                    if (filter.output.result.type === 'BeakerDisplay') {
                      o.output = filter.output.result.object;
                    } else {
                      o.outputtype = filter.output.result.type;
                      o.output = filter.output.result;
                    }
                  } else {
                    o.output = filter.output.result;
                  }
                }
                o.tags = filter.tags;
                o.type = "BeakerCodeCell";
                ret.push(o);
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

        var documentTitleBase = document.title ? document.title + ' - ' : '';
        var beakerDocumentTitle = '';

        var setDocumentTitle = function() {
          var edited = $scope.isEdited();
          var filename = $scope.filename();

          beakerDocumentTitle = filename;
          if (edited) beakerDocumentTitle = '*' + beakerDocumentTitle;

          document.title = documentTitleBase + beakerDocumentTitle;
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
          var reconnectTimeout = undefined;
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
          if (msg.successful !== !$scope.isDisconnected()) {
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

        $scope.getFullIndex = function() {
          return $scope.$parent.$parent.$parent.getFullIndex() + '.' + ($scope.$parent.index + 1);
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
            scope.cm && scope.cm.focus();
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

        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var getBkNotebookWidget = function() {
          return bkCoreManager.getBkApp().getBkNotebookWidget();
        };

        return {
          restrict: 'E',
          template: JST['mainapp/components/notebook/markdowncell'](),
          controller: function($scope) {
            $scope.getFullIndex = function() {
              return $scope.$parent.$parent.$parent.getFullIndex() + '.' + ($scope.$parent.index + 1);
            };
          }
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
        $scope.getFullIndex = function() {
          return $scope.$parent.$parent.$parent.getFullIndex() + "." + ($scope.$parent.index + 1);
        };

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
      bkUtils.httpPost(bkUtils.serverUrl("beaker/rest/session-backup/backup/" + sessionId), sessionData)
          .success(function(data) {
            deferred.resolve();
          })
          .error(function(data, status) {
            console.error("Failed to backup session: " + sessionId + ", " + status);
            deferred.reject("Failed to backup session: " + sessionId + ", " + status);
          });
      return deferred.promise;
    };
    var getSessions = function() {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/session-backup/getExistingSessions"))
          .success(function(sessions) {
            deferred.resolve(sessions);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to get existing sessions " + status);
          });
      return deferred.promise;
    };
    var loadSession = function(sessionId) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/session-backup/load"), {sessionid: sessionId})
          .success(function(session, status) {
            deferred.resolve(session);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to load session: " + sessionId + ", " + status);
          });
      return deferred.promise;
    };
    var closeSession = function(sessionId) {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpPost(bkUtils.serverUrl("beaker/rest/session-backup/close"), {sessionid: sessionId})
          .success(function(ret) {
            deferred.resolve(sessionId);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to close session: " + sessionId + ", " + status);
          });
      return deferred.promise;
    };
    var recordLoadedPlugin = function(pluginName, pluginUrl) {
      bkUtils.httpPost(
          bkUtils.serverUrl("beaker/rest/session-backup/addPlugin"),
          {pluginname: pluginName, pluginurl: pluginUrl})
          .success(function(ret) {
           
          })
          .error(function(data, status, headers, config) {
            console.error("Failed to add plugin, " + pluginName + ", " + pluginUrl + ", " + status);
          });
    };
    var getPlugins = function() {
      var deferred = bkUtils.newDeferred();
      bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/session-backup/getExistingPlugins"), {})
          .success(function(plugins) {
            deferred.resolve(plugins);
          })
          .error(function(data, status, headers, config) {
            deferred.reject("Failed to get existing plugins, " + status);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImNvbnRyb2xwYW5lbC5qcyIsImNvbnRyb2xwYW5lbC1kaXJlY3RpdmUuanMiLCJjb250cm9scGFuZWxzZXNzaW9uaXRlbS1kaXJlY3RpdmUuanMiLCJjZWxsbWVudXBsdWdpbm1hbmFnZXIuanMiLCJjb3JlLmpzIiwiZGVidWcuanMiLCJldmFsdWF0ZXBsdWdpbm1hbmFnZXIuanMiLCJoZWxwZXIuanMiLCJtZW51cGx1Z2lubWFuYWdlci5qcyIsIm1haW5hcHAuanMiLCJldmFsdWF0ZWpvYm1hbmFnZXIuanMiLCJldmFsdWF0b3JtYW5hZ2VyLmpzIiwibm90ZWJvb2tjZWxsbW9kZWxtYW5hZ2VyLmpzIiwibm90ZWJvb2tuYW1lc3BhY2Vtb2RlbG1hbmFnZXIuanMiLCJzZXNzaW9ubWFuYWdlci5qcyIsIm5vdGVib29rLmpzIiwiY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbGlucHV0bWVudS1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dG1lbnUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd24tZWRpdGFibGUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd25jZWxsLWRpcmVjdGl2ZS5qcyIsIm5ld2NlbGxtZW51LWRpcmVjdGl2ZS5qcyIsIm5vdGVib29rLWRpcmVjdGl2ZS5qcyIsInNlY3Rpb25jZWxsLWRpcmVjdGl2ZS5qcyIsInRleHRjZWxsLWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXkuanMiLCJvdXRwdXRkaXNwbGF5LWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXlmYWN0b3J5LXNlcnZpY2UuanMiLCJvdXRwdXRkaXNwbGF5c2VydmljZW1hbmFnZXItc2VydmljZS5qcyIsInBsdWdpbm1hbmFnZXItZGlyZWN0aXZlLmpzIiwicGx1Z2lubWFuYWdlcmV2YWx1YXRvcnNldHRpbmdzLWRpcmVjdGl2ZS5qcyIsImNvZGVjZWxsb3B0aW9ucy1kaXJlY3RpdmUuanMiLCJjb21tb251dGlscy5qcyIsImNvbW1vbnVpLmpzIiwiYW5ndWxhcnV0aWxzLmpzIiwidHJlZXZpZXcuanMiLCJjb21ldGR1dGlscy5qcyIsIm5vdGVib29rdmVyc2lvbm1hbmFnZXIuanMiLCJvdXRwdXRsb2cuanMiLCJyZWNlbnRtZW51LmpzIiwic2Vzc2lvbi5qcyIsInNoYXJlLmpzIiwidHJhY2suanMiLCJ1dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdnNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNybUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJiZWFrZXJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJjb250cm9scGFuZWwvY29udHJvbHBhbmVsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48aGVhZGVyIGNsYXNzPVwibmF2YmFyLWZpeGVkLXRvcCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWludmVyc2UgYmtyXCI+XFxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kIGJrclwiIGhyZWY9XCIvYmVha2VyLyMvY29udHJvbFwiIG5nLWNsaWNrPVwiZ290b0NvbnRyb2xQYW5lbCgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgPGltZyBzcmM9XCJhcHAvaW1hZ2VzL2JlYWtlcl9pY29uQDJ4LnBuZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgQmVha2VyXFxuICAgIDwvYT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBia3JcIj5cXG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgYmtyXCI+XFxuICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24gYmtyXCIgbmctcmVwZWF0PVwibSBpbiBnZXRNZW51cygpXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSB7e20uaWR9fSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+e3ttLm5hbWV9fTwvYT5cXG4gICAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJtLml0ZW1zXCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgICAgPC9saT5cXG4gICAgICA8cCBuZy1pZj1cImRpc2Nvbm5lY3RlZFwiIGNsYXNzPVwibmF2YmFyLXRleHQgdGV4dC1kYW5nZXIgcmlnaHQgYmtyXCI+XFxuICAgICAgICBvZmZsaW5lXFxuICAgICAgPC9wPlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XFxuPC9oZWFkZXI+XFxuXFxuPGRpdiBjbGFzcz1cImRhc2hib2FyZCBjb250YWluZXItZmx1aWQgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGJrclwiPlxcblxcbiAgICAgIDxoMSBjbGFzcz1cImJrclwiPkJlYWtlciA8c21hbGwgY2xhc3M9XCJia3JcIj5UaGUgZGF0YSBzY2llbnRpc3RcXCdzIGxhYm9yYXRvcnk8L3NtYWxsPjwvaDE+XFxuXFxuICAgICAgPGRpdiBuZy1pZj1cImlzU2Vzc2lvbnNMaXN0RW1wdHkoKVwiIGNsYXNzPVwiZW1wdHktc2Vzc2lvbi1wcm9tcHQgYmtyXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVwiYmtyXCI+Q2xpY2sgYmVsb3cgdG8gZ2V0IHN0YXJ0ZWQgY29kaW5nIGluIFB5dGhvbiwgUiwgSmF2YVNjcmlwdCwgSnVsaWEsIFNjYWxhLCBKYXZhLCBHcm9vdnksIGFuZCBSdWJ5LiA8YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICBCZWdpbm5lcnMgc2hvdWxkIGNoZWNrIG91dCB0aGUgPHN0cm9uZyBjbGFzcz1cImJrclwiPkhlbHAg4oaSIFR1dG9yaWFsPC9zdHJvbmc+LjwvcD5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IG5nLWhpZGU9XCJpc1Nlc3Npb25zTGlzdEVtcHR5KClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGg0IGNsYXNzPVwib3Blbi1ub3RlYm9vay1oZWFkbGluZSBia3JcIj5PcGVuIE5vdGVib29rczwvaDQ+XFxuICAgICAgICA8YmstY29udHJvbC1wYW5lbC1zZXNzaW9uLWl0ZW0gY2xhc3M9XCJvcGVuLW5vdGVib29rcyBia3JcIj48L2JrLWNvbnRyb2wtcGFuZWwtc2Vzc2lvbi1pdGVtPlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbmV3LW5vdGVib29rIGJrclwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB0ZXh0LWNlbnRlciBidG4tYmxvY2sgYmtyXCIgbmctY2xpY2s9XCJuZXdOb3RlYm9vaygpXCI+TmV3IERlZmF1bHQgTm90ZWJvb2s8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgdGV4dC1jZW50ZXIgYnRuLWJsb2NrIG5ldy1lbXB0eS1ub3RlYm9vayBia3JcIiBuZy1jbGljaz1cIm5ld0VtcHR5Tm90ZWJvb2soKVwiPk5ldyBFbXB0eSBOb3RlYm9vazwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy02IGJrclwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmF1eC1kcm9wLXpvbmUgYmtyXCI+XFxuICAgICAgICAgICAgT3IgZHJhZyBhIC5ia3IgZmlsZSBhbnl3aGVyZSBvbiB0aGlzIHBhZ2UgdG8gaW1wb3J0XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiIG5nLXNob3c9XCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPT0gbnVsbFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgd2VsbCBia3JcIj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGIgY2xhc3M9XCJia3JcIj5UcmFjayBhbm9ueW1vdXMgdXNhZ2UgaW5mbz88L2I+XFxuICAgICAgPC9wPlxcblxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICBXZSB3b3VsZCBsaWtlIHRvIGNvbGxlY3QgYW5vbnltb3VzIHVzYWdlIGluZm8gdG8gaGVscCBpbXByb3ZlIG91ciBwcm9kdWN0LiBXZSBtYXkgc2hhcmUgdGhpcyBpbmZvcm1hdGlvblxcbiAgICAgICAgd2l0aCBvdGhlciBwYXJ0aWVzLCBpbmNsdWRpbmcsIGluIHRoZSBzcGlyaXQgb2Ygb3BlbiBzb2Z0d2FyZSwgYnkgbWFraW5nIGl0IHB1YmxpY2x5IGFjY2Vzc2libGUuPGJyIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPC9wPlxcblxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9wcml2YWN5XCIgY2xhc3M9XCJia3JcIj5Qcml2YWN5IHBvbGljeTwvYT4gLSA8YSBjbGFzcz1cImN1cnNvcl9oYW5kIGJrclwiIG5nLWNsaWNrPVwic2hvd1doYXRXZUxvZygpXCI+V2hhdCB3aWxsIHdlIGxvZz88L2E+XFxuICAgICAgPC9wPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgYmtyXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiIG5nLWNsaWNrPVwiaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gZmFsc2VcIj5ObywgZG9uXFwndCB0cmFjazwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tYWN0aXZlIGJrclwiIG5nLWNsaWNrPVwiaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gdHJ1ZVwiPlllcywgdHJhY2sgbXkgaW5mbzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiY29udHJvbHBhbmVsL3RhYmxlXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48dWwgY2xhc3M9XCJub3RlYm9vay1kYXNoYm9hcmQtbGlzdCBia3JcIj5cXG4gIDxsaSBjbGFzcz1cInNlc3Npb24gY2xlYXJmaXggYmtyXCIgbmctcmVwZWF0PVwic2Vzc2lvbiBpbiBzZXNzaW9ucyB8IG9yZGVyQnk6JnF1b3Q7b3BlbmVkRGF0ZSZxdW90Ozp0cnVlXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnQgYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNhcHRpb24gYmtyXCIgbmctY2xpY2s9XCJvcGVuKHNlc3Npb24pXCI+e3tnZXRDYXB0aW9uKHNlc3Npb24pfX08L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwibGlnaHQgcGF0aCBia3JcIiBuZy1pZj1cImdldERlc2NyaXB0aW9uKHNlc3Npb24pXCI+XFxuICAgICAgICB7e2dldERlc2NyaXB0aW9uKHNlc3Npb24pfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBwdWxsLXJpZ2h0IGNsb3NlLXNlc3Npb24gYmtyXCIgbmctY2xpY2s9XCJjbG9zZShzZXNzaW9uKVwiPkNsb3NlPC9hPlxcbiAgICA8ZGl2IGNsYXNzPVwib3Blbi1kYXRlIGxpZ2h0IHB1bGwtcmlnaHQgYmtyXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJia3JcIj5PcGVuZWQgb248L3NwYW4+XFxuICAgICAge3tzZXNzaW9uLm9wZW5lZERhdGUgfCBkYXRlOlxcJ21lZGl1bVxcJ319XFxuICAgIDwvZGl2PlxcbiAgPC9saT5cXG48L3VsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiY29udHJvbHBhbmVsL3doYXRfd2VfbG9nXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJrclwiPlxcbiAgPGgzIGNsYXNzPVwiYmtyXCI+V2hhdCB3aWxsIHdlIGxvZzwvaDM+XFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8YiBjbGFzcz1cImJrclwiPldoYXQgd2UgbG9nOjwvYj5cXG4gIDwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+V2UgdXNlIEdvb2dsZSBBbmFseXRpY3MgdG8gY29sbGVjdCB1c2FnZSBpbmZvLiBHb29nbGUgQW5hbHl0aWNzIGNvbGxlY3RzIGRhdGEgc3VjaCBhcyBob3cgbG9uZyB5b3Ugc3BlbmQgaW4gQmVha2VyLCB3aGF0IGJyb3dzZXIgeW91XFwncmUgdXNpbmcsIGFuZCB5b3VyIGdlb2dyYXBoaWMgcmVnaW9uLjwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+SW4gYWRkaXRpb24gdG8gdGhlIHN0YW5kYXJkIEdvb2dsZSBBbmFseXRpY3MgY29sbGVjdGlvbiwgd2VcXCdyZSBsb2dnaW5nIGhvdyBtYW55IHRpbWVzIHlvdSBydW4gY2VsbHMgaW4gZWFjaCBsYW5ndWFnZSBhbmQgd2hhdCB0eXBlcyBvZiBub3RlYm9va3MgeW91IG9wZW4gKGxvY2FsIC5ia3IgZmlsZSwgcmVtb3RlIC5pcHluYiwgZXQgY2V0ZXJhKS48L3A+XFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8YiBjbGFzcz1cImJrclwiPldoYXQgd2UgPGkgY2xhc3M9XCJia3JcIj5kb25cXCd0PC9pPiBsb2c6PC9iPlxcbiAgPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5XZSB3aWxsIG5ldmVyIGxvZyBhbnkgb2YgdGhlIGNvZGUgeW91IHJ1biBvciB0aGUgbmFtZXMgb2YgeW91ciBub3RlYm9va3MuPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5QbGVhc2Ugc2VlIG91ciA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9wcml2YWN5XCIgY2xhc3M9XCJia3JcIj5wcml2YWN5IHBvbGljeTwvYT4gZm9yIG1vcmUgaW5mb3JtYXRpb24uPC9wPlxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyXCI+XFxuICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImNsb3NlKClcIj5Hb3QgaXQ8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImhlbHBlcnMvcGx1Z2luLWxvYWQtZXJyb3JcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5MYW5ndWFnZSBFcnJvcjwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5GYWlsZWQgdG8gc3RhcnQgJyArXG4oKF9fdCA9IChwbHVnaW5JZCkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJy48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5EaWQgeW91IGluc3RhbGwgaXQgYWNjb3JkaW5nIHRvIHRoZSBpbnN0cnVjdGlvbnNcXG5vbiA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL2JlYWtlcm5vdGVib29rLmNvbS9nZXR0aW5nLXN0YXJ0ZWQjJyArXG4oKF9fdCA9IChwbHVnaW5JZCkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJ1wiIGNsYXNzPVwiYmtyXCI+QmVha2VyTm90ZWJvb2suY29tPC9hPj9cXG48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5JZiB5b3UgYWxyZWFkeSBoYXZlIGl0LCB0aGVuIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdHdvc2lnbWEvYmVha2VyLW5vdGVib29rL3dpa2kvTGFuZ3VhZ2UtUHJlZmVyZW5jZXNcIiBjbGFzcz1cImJrclwiPmVkaXRcXG55b3VyIHByZWZlcmVuY2VzIGZpbGU8L2E+IHRvIGhlbHAgQmVha2VyIGZpbmQgaXQgb24geW91ciBzeXN0ZW0sIGFuZFxcbnRoZW4gcmVzdGFydCBCZWFrZXIgYW5kIHRyeSBhZ2Fpbi5cXG48L3A+XFxuXFxuPHAgY2xhc3M9XCJia3JcIj5Bbnkgb3RoZXIgbGFuZ3VhZ2VzIGluIHlvdXIgbm90ZWJvb2sgc2hvdWxkIHN0aWxsIHdvcmsuPC9wPlxcblxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyIGJrclwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJlYWtlci1idG4gYWN0aXZlIGJrclwiIG5nLWNsaWNrPVwiJGNsb3NlKClcIj5PSzwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvZHJvcGRvd25cIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVcIj5cXG4gIDxiay1kcm9wZG93bi1tZW51LWl0ZW0gbmctcmVwZWF0PVwiaXRlbSBpbiBnZXRNZW51SXRlbXMoKSB8IGlzSGlkZGVuXCIgaXRlbT1cIml0ZW1cIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudS1pdGVtPlxcbjwvdWw+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kcm9wZG93bl9pdGVtXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48bGkgbmctY2xhc3M9XCJnZXRJdGVtQ2xhc3MoaXRlbSlcIiBjbGFzcz1cImJrclwiPlxcbiAgPGEgaHJlZj1cIiNcIiB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJydW5BY3Rpb24oaXRlbSlcIiBuZy1jbGFzcz1cImdldEFDbGFzcyhpdGVtKVwiIGlkPVwie3tpdGVtLmlkfX1cIiB0aXRsZT1cInt7aXRlbS50b29sdGlwfX1cIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlxcbiAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2sgYmtyXCIgbmctc2hvdz1cImlzTWVudUl0ZW1DaGVja2VkKGl0ZW0pXCI+PC9pPlxcbiAgICB7e2dldE5hbWUoaXRlbSl9fVxcbiAgPC9hPlxcbjwvbGk+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9maWxlYWN0aW9uZGlhbG9nXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJrclwiPlxcbiAgPGgxIGNsYXNzPVwiYmtyXCI+e3thY3Rpb25OYW1lfX08L2gxPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGJrclwiPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5QYXRoOiA8aW5wdXQgbmFtZT1cInt7aW5wdXRJZH19XCIgbmctbW9kZWw9XCJyZXN1bHRcIiBjbGFzcz1cImJrclwiPjwvcD5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShyZXN1bHQpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYmtyXCI+e3thY3Rpb25OYW1lfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL29wZW5ub3RlYm9va1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIj5cXG4gICA8aDEgY2xhc3M9XCJia3JcIj57eyBnZXRTdHJhdGVneSgpLnRpdGxlIHx8IFxcJ09wZW5cXCd9fTxzcGFuIG5nLXNob3c9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2hvd1NwaW5uZXJcIiBjbGFzcz1cImJrclwiPjxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGJrclwiPjwvaT48L3NwYW4+PC9oMT5cXG4gICA8ZGl2IGNsYXNzPVwiZmlsdGVycy1hbmQtc29ydHMgYmtyXCI+XFxuICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gYmtyXCI+XFxuICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxcbiAgICAgICAgIFNvcnQgYnk6IHt7Z2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmdldFByZXR0eU9yZGVyQnkoKX19XFxuICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCI+XFxuICAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCd1cmlcXCcsIHJldmVyc2U6IGZhbHNlIH0pXCIgY2xhc3M9XCJia3JcIj5OYW1lPC9hPjwvbGk+XFxuICAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCdtb2RpZmllZFxcJywgcmV2ZXJzZTogdHJ1ZSB9KVwiIGNsYXNzPVwiYmtyXCI+RGF0ZSBNb2RpZmllZDwvYT48L2xpPlxcbiAgICAgICA8L3VsPlxcbiAgICAgPC9kaXY+XFxuICAgPC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZml4ZWQgYmtyXCI+XFxuICAgPHRyZWUtdmlldyByb290dXJpPVwiL1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG4gICA8dHJlZS12aWV3IHJvb3R1cmk9XCInICtcbl9fZSggaG9tZWRpciApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIj5cXG4gICA8ZGl2IGNsYXNzPVwidGV4dC1sZWZ0IGJrclwiPkVudGVyIGEgZmlsZSBwYXRoIChlLmcuIC9Vc2Vycy8uLi4pIG9yIFVSTCAoZS5nLiBodHRwOi8vLi4uKTo8L2Rpdj5cXG4gICA8cCBjbGFzcz1cImJrclwiPjxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImdldFN0cmF0ZWd5KCkuaW5wdXRcIiBuZy1rZXlwcmVzcz1cImdldFN0cmF0ZWd5KCkuY2xvc2UoJGV2ZW50LCBjbG9zZSlcIiBmb2N1cy1zdGFydD1cIlwiPjwvcD5cXG4gICA8c3BhbiBzdHlsZT1cImZsb2F0OmxlZnRcIiBuZy1pZj1cImdldFN0cmF0ZWd5KCkuZXh0ID09PSB1bmRlZmluZWRcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPVwidmVydGljYWwtYWxpZ246dG9wXCIgbmctbW9kZWw9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXJcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgPHNwYW4gbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXIgPSAhZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmFwcGx5RXh0RmlsdGVyXCIgY2xhc3M9XCJia3JcIj5zaG93ICcgK1xuKChfX3QgPSAoIGV4dGVuc2lvbiApKSA9PSBudWxsID8gJycgOiBfX3QpICtcbicgZmlsZXMgb25seTwvc3Bhbj5cXG4gICA8L3NwYW4+XFxuICAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoZ2V0U3RyYXRlZ3koKS5nZXRSZXN1bHQoKSlcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBtb2RhbC1zdWJtaXQgYmtyXCI+e3sgZ2V0U3RyYXRlZ3koKS5jbG9zZWJ0biB8fCBcXCdPcGVuXFwnfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL3NhdmVub3RlYm9va1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPlNhdmUgPHNwYW4gbmctc2hvdz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5zaG93U3Bpbm5lclwiIGNsYXNzPVwiYmtyXCI+XFxuICA8aSBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBia3JcIj48L2k+PC9zcGFuPjwvaDE+XFxuICA8ZGl2IGNsYXNzPVwiZmlsdGVycy1hbmQtc29ydHMgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia3JcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBkcm9wZG93bi10b2dnbGUgYmtyXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cXG4gICAgICAgIFNvcnQgYnk6IHt7Z2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLmdldE9yZGVyQnkoKX19XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiPlxcbiAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNldE9yZGVyQnkoeyBvcmRlckJ5OiBcXCd1cmlcXCcsIHJldmVyc2U6IGZhbHNlIH0pXCIgY2xhc3M9XCJia3JcIj5OYW1lPC9hPjwvbGk+XFxuICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ21vZGlmaWVkXFwnLCByZXZlcnNlOiB0cnVlIH0pXCIgY2xhc3M9XCJia3JcIj5EYXRlIE1vZGlmaWVkPC9hPjwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBia3JcIiBzdHlsZT1cInBhZGRpbmctYm90dG9tOiAxMDZweFwiPiBcXG4gIDx0cmVlLXZpZXcgcm9vdHVyaT1cIi9cIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICA8dHJlZS12aWV3IHJvb3R1cmk9XCInICtcbl9fZSggaG9tZWRpciApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICA8dHJlZS12aWV3IG5nLWlmPVwiXFwnJyArXG5fX2UoIGhvbWVkaXIgKSArXG4nXFwnICE9IFxcJycgK1xuX19lKCBwd2QgKSArXG4nXFwnXCIgcm9vdHVyaT1cIicgK1xuX19lKCBwd2QgKSArXG4nXCIgZnM9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnNcIiBjbGFzcz1cImJrclwiPjwvdHJlZS12aWV3PlxcbiAgXFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogMTA2cHhcIj4gXFxuICA8cCBjbGFzcz1cImJrclwiPlxcbiAgICA8aW5wdXQgaWQ9XCJzYXZlQXNGaWxlSW5wdXRcIiBjbGFzcz1cImxlZnQgYmtyXCIgbmctbW9kZWw9XCJnZXRTdHJhdGVneSgpLmlucHV0XCIgbmcta2V5cHJlc3M9XCJnZXRTdHJhdGVneSgpLmNsb3NlKCRldmVudCwgY2xvc2UpXCIgZm9jdXMtc3RhcnQ9XCJcIj5cXG4gICAgPGkgY2xhc3M9XCJuZXctZm9sZGVyIGJrLWljb24gYmtyXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJNYWtlIG5ldyBkaXJlY3RvcnkgKHt7Z2V0U3RyYXRlZ3koKS5pbnB1dH19KVwiIG5nLWNsaWNrPVwiZ2V0U3RyYXRlZ3koKS5uZXdGb2xkZXIoZ2V0U3RyYXRlZ3koKS5pbnB1dClcIj48L2k+XFxuICA8L3A+XFxuICA8c3BhbiBzdHlsZT1cImZsb2F0OmxlZnRcIiBjbGFzcz1cImJrclwiPnt7Z2V0U3RyYXRlZ3koKS5nZXRSZXN1bHQoKX19PC9zcGFuPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShnZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJrclwiIG5nLWRpc2FibGVkPVwiZ2V0U3RyYXRlZ3koKS5nZXRTYXZlQnRuRGlzYWJsZWQoKVwiPlNhdmU8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvZGlhbG9ncy9jb2RlY2VsbG9wdGlvbnNcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj5Db2RlIENlbGwgT3B0aW9uczwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ob3Jpem9udGFsIGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwiY2VsbC1pZFwiIGNsYXNzPVwiY29udHJvbC1sYWJlbCBjb2wtc20tMiBia3JcIj5JZDwvbGFiZWw+XFxuICAgICAgPGRpdiBuZy1jbGFzcz1cImlzRXJyb3IoKSA/IFxcJ2NvbC1zbS03XFwnIDogXFwnY29sLXNtLTEwXFwnXCIgY2xhc3M9XCJia3JcIj48aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJjZWxsTmFtZVwiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBia3JcIiBuZy1pZj1cImlzRXJyb3IoKVwiPjxzcGFuIGNsYXNzPVwiaGVscC1pbmxpbmUgYmtyXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj57e2dldE5hbWVFcnJvcigpfX08L3NwYW4+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8bGFiZWwgZm9yPVwiY2VsbC10YWdzXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsIGNvbC1zbS0yIGJrclwiPlRhZ3M8L2xhYmVsPlxcbiAgICAgIDxkaXYgbmctY2xhc3M9XCJpc0Vycm9yKCkgPyBcXCdjb2wtc20tN1xcJyA6IFxcJ2NvbC1zbS0xMFxcJ1wiIGNsYXNzPVwiYmtyXCI+PGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJrclwiIG5nLW1vZGVsPVwiY2VsbFRhZ3NcIj48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgYmtyXCIgbmctaWY9XCJpc0Vycm9yKClcIj48c3BhbiBjbGFzcz1cImhlbHAtaW5saW5lIGJrclwiIHN0eWxlPVwiY29sb3I6cmVkXCI+e3tnZXRUYWdFcnJvcigpfX08L3NwYW4+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLW9mZnNldC0yIGNvbC1zbS0xMCBia3JcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGVja2JveCBia3JcIj5cXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwiaW5pdGlhbGl6YXRpb25DZWxsXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICBJbml0aWFsaXphdGlvbiBDZWxsXFxuICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJzYXZlKClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBia3JcIiBuZy1jbGFzcz1cInNhdmVEaXNhYmxlZCgpICZhbXA7JmFtcDsgXFwnZGlzYWJsZWRcXCdcIj5TYXZlPC9idXR0b24+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kYXNoYm9hcmQvYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICc8YmstY29udHJvbC1wYW5lbCBjbGFzcz1cImJrclwiPjwvYmstY29udHJvbC1wYW5lbD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL21haW5hcHAvYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICc8YmstbWFpbi1hcHAgY2xhc3M9XCJia3JcIj48L2JrLW1haW4tYXBwPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvbWFpbmFwcC9tYWluYXBwXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48aGVhZGVyIGNsYXNzPVwibmF2YmFyLWZpeGVkLXRvcCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWludmVyc2UgYmtyXCI+XFxuICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kIGJrclwiIGhyZWY9XCIvYmVha2VyLyMvY29udHJvbFwiIG5nLWNsaWNrPVwiZ290b0NvbnRyb2xQYW5lbCgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgPGltZyBzcmM9XCJhcHAvaW1hZ2VzL2JlYWtlcl9pY29uQDJ4LnBuZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgQmVha2VyXFxuICAgIDwvYT5cXG4gICAgPHAgY2xhc3M9XCJuYXZiYXItdGV4dCBia3JcIj57e2ZpbGVuYW1lKCl9fTwvcD5cXG4gICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdGV4dCBia3JcIiBuZy1pZj1cImxvYWRpbmcgfHwgISFsb2FkaW5nbXNnXCI+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoIGZhLXNwaW4gdGV4dC13aGl0ZSBia3JcIj48L2k+XFxuICAgIDwvc3Bhbj5cXG4gICAgPGRpdiBjbGFzcz1cIm5hdmJhci10ZXh0IHRleHQtd2hpdGUgbG9hZGluZ21zZyBia3JcIiBuZy1pZj1cImxvYWRpbmcgfHwgISFsb2FkaW5nbXNnXCI+XFxuICAgICAge3tsb2FkaW5nbXNnfX1cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgYmtyXCI+XFxuICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2IGJrclwiPlxcbiAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duIGJrclwiIG5nLXJlcGVhdD1cIm0gaW4gZ2V0TWVudXMoKVwiPlxcbiAgICAgICAgPGEgaHJlZj1cIiNcIiByb2xlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgYmtyXCIgbmctY2xhc3M9XCJtLmNsYXNzTmFtZXNcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+e3ttLm5hbWV9fTwvYT5cXG4gICAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJtLml0ZW1zXCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgICAgPC9saT5cXG4gICAgPC91bD5cXG4gICAgPHAgbmctaWY9XCJpc0VkaXRlZCgpXCIgY2xhc3M9XCJuYXZiYXItdGV4dCB0ZXh0LXN1Y2Nlc3MgcHVsbC1yaWdodCBia3JcIj5lZGl0ZWQ8L3A+XFxuICAgIDxwIG5nLWlmPVwiaXNEaXNjb25uZWN0ZWQoKVwiIGNsYXNzPVwibmF2YmFyLXRleHQgcHVsbC1yaWdodCBia3JcIj5cXG4gICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgY2xhc3M9XCJuYXZiYXItbGluayB0ZXh0LWRhbmdlciBia3JcIiBuZy1jbGljaz1cInByb21wdFRvU2F2ZSgpXCIgZWF0LWNsaWNrPVwiXCI+e3tnZXRPZmZpbmVNZXNzYWdlKCl9fTwvYT5cXG4gICAgPC9wPlxcbiAgPC9kaXY+XFxuPC9oZWFkZXI+XFxuXFxuPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZCBub3RlYm9vay1jb250YWluZXIgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGJrclwiPlxcbiAgICAgIDxiay1ub3RlYm9vayBzZXQtYmstbm90ZWJvb2s9XCJzZXRCa05vdGVib29rKGJrTm90ZWJvb2spXCIgaXMtbG9hZGluZz1cImxvYWRpbmdcIiBjbGFzcz1cImJrclwiPjwvYmstbm90ZWJvb2s+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICBcXG4gIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDMwMHB4XCIgY2xhc3M9XCJia3JcIj48L2Rpdj5cXG5cXG48L2Rpdj5cXG5cXG5cXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L25nLXRlbXBsYXRlXCIgaWQ9XCJzZWN0aW9uLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8Ymstc2VjdGlvbi1jZWxsPjwvYmstc2VjdGlvbi1jZWxsPlxcbjwvc2NyaXB0PlxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cInRleHQtY2VsbC5odG1sXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbGxcIj5cXG4gICAgPGJrLXRleHQtY2VsbD48L2JrLXRleHQtY2VsbD5cXG4gIDwvZGl2Plxcbjwvc2NyaXB0PlxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cIm1hcmtkb3duLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstbWFya2Rvd24tY2VsbD48L2JrLW1hcmtkb3duLWNlbGw+XFxuPC9zY3JpcHQ+XFxuPHNjcmlwdCB0eXBlPVwidGV4dC9uZy10ZW1wbGF0ZVwiIGlkPVwiY29kZS1jZWxsLmh0bWxcIiBjbGFzcz1cImJrclwiPlxcbiAgPGJrLWNvZGUtY2VsbCBjZWxsbW9kZWw9XCJjZWxsbW9kZWxcIiBjZWxsbWVudT1cImNlbGx2aWV3Lm1lbnVcIiBpbmRleD1cIiRpbmRleFwiPjwvYmstY29kZS1jZWxsPlxcbjwvc2NyaXB0Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlclwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cImJrclwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogNjlweFwiPlxcbiAgICA8aDEgY2xhc3M9XCJia3JcIj5MYW5ndWFnZSBNYW5hZ2VyPC9oMT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZml4ZWQgbW9kYWwtbGFyZ2UgcGx1Z2luLW1hbmFnZXIgYmtyXCIgc3R5bGU9XCJwYWRkaW5nLXRvcDogNjlweDsgcGFkZGluZy1ib3R0b206IDY4cHhcIj5cXG4gICAgPGRpdiBjbGFzcz1cImxhbmd1YWdlcyBjbGVhcmZpeCBia3JcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGxhbmd1YWdlLWljb24tYnV0dG9uIGJrclwiIG5nLWNsaWNrPVwiZXZhbFRhYk9wLnRvZ2dsZVBsdWdpbihwbHVnaW5OYW1lKVwiIG5nLXJlcGVhdD1cIihwbHVnaW5OYW1lLCBwbHVnaW5TdGF0dXMpIGluIGV2YWxUYWJPcC5nZXRFdmFsdWF0b3JTdGF0dXNlcygpXCIgbmctY2xhc3M9XCJwbHVnaW5OYW1lXCI+XFxuICAgICAgICA8c3BhbiBuZy1jbGFzcz1cIlxcJ3BsdWdpbi1cXCcgKyBwbHVnaW5TdGF0dXNcIiBjbGFzcz1cInBsdWdpbi1zdGF0dXMgYmtyXCI+4pePPC9zcGFuPlxcbiAgICAgICAgPGJrLWxhbmd1YWdlLWxvZ28gYmctY29sb3I9XCJ7e2dldEV2YWx1YXRvckRldGFpbHMocGx1Z2luTmFtZSkuYmdDb2xvcn19XCIgbmFtZT1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5zaG9ydE5hbWV9fVwiIGZnLWNvbG9yPVwie3tnZXRFdmFsdWF0b3JEZXRhaWxzKHBsdWdpbk5hbWUpLmZnQ29sb3J9fVwiIGJvcmRlci1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5ib3JkZXJDb2xvcn19XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDwvYmstbGFuZ3VhZ2UtbG9nbz5cXG5cXG4gICAgICAgIHt7cGx1Z2luTmFtZX19XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93VVJMID0gIWV2YWxUYWJPcC5zaG93VVJMXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCI+XFxuICAgICAgICBGcm9tIFVSTC4uLlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBuZy1zaG93PVwiZXZhbFRhYk9wLnNob3dVUkxcIiBjbGFzcz1cImlucHV0LWdyb3VwIGFkZGV2YWwgYmtyXCI+XFxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgYmstZW50ZXI9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIiBuZy1tb2RlbD1cImV2YWxUYWJPcC5uZXdQbHVnaW5OYW1lT3JVcmxcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIj5BZGQgUGx1Z2luIGZyb20gVVJMPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLXNob3c9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZXJyb3ItdGl0bGUgYm9keS1ib3ggYmtyXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImJrclwiPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2FkIHRoaXMgcGx1Z2luIGZyb20gYW4gZXh0ZXJuYWwgVVJMPzwvcD5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IGZhbHNlOyBldmFsVGFiT3Auc2hvd1VSTD1mYWxzZTsgZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybD0mcXVvdDsmcXVvdDtcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IGZhbHNlOyBldmFsVGFiT3AuZm9yY2VMb2FkID0gdHJ1ZTsgZXZhbFRhYk9wLnRvZ2dsZVBsdWdpbigpXCI+T0s8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPjxiciBjbGFzcz1cImJrclwiPjwvcD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctc2hvdz1cImV2YWxUYWJPcC5zaG93V2FybmluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZXJyb3ItdGl0bGUgYm9keS1ib3ggYmtyXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImJrclwiPkNhbm5vdCByZW1vdmUgcGx1Z2luIGN1cnJlbnRseSB1c2VkIGJ5IGEgY29kZSBjZWxsIGluIHRoZSBub3RlYm9vay48YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIERlbGV0ZSB0aG9zZSBjZWxscyBhbmQgdHJ5IGFnYWluLjwvcD5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcmlnaHQgYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3Auc2hvd1dhcm5pbmcgPSBmYWxzZVwiPk9LPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPHAgY2xhc3M9XCJia3JcIj48YnIgY2xhc3M9XCJia3JcIj48L3A+XFxuICAgIDwvZGl2PlxcbiAgICA8dGFic2V0IGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPHRhYiBuZy1yZXBlYXQ9XCIoZXZhbHVhdG9yTmFtZSwgZXZhbHVhdG9yKSBpbiBldmFsVGFiT3AuZ2V0RXZhbHVhdG9yc1dpdGhTcGVjKClcIiBoZWFkaW5nPVwie3tldmFsdWF0b3JOYW1lfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGJrLXBsdWdpbi1tYW5hZ2VyLWV2YWx1YXRvci1zZXR0aW5ncyBjbGFzcz1cImJrclwiPjwvYmstcGx1Z2luLW1hbmFnZXItZXZhbHVhdG9yLXNldHRpbmdzPlxcbiAgICAgIDwvdGFiPlxcbiAgICA8L3RhYnNldD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogNjhweFwiPiBcXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBsYW5ndWFnZS1tYW5hZ2VyLWNsb3NlLWJ1dHRvbiBia3JcIiBuZy1jbGljaz1cImRvQ2xvc2UoKVwiPkNsb3NlPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9wbHVnaW5tYW5hZ2VyL3BsdWdpbm1hbmFnZXJfZXZhbHVhdG9yX3NldHRpbmdzXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IG5nLXJlcGVhdD1cInByb3BlcnR5IGluIHByb3BlcnRpZXNcIiBjbGFzcz1cImZvcm0tZ3JvdXAgbGFuZ3VhZ2Utb3B0aW9uIHByb3BlcnR5IGNsZWFyZml4IGJrclwiPlxcbiAgPGxhYmVsIGNsYXNzPVwiYmtyXCI+e3sgcHJvcGVydHkubmFtZSB9fTwvbGFiZWw+XFxuICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJldmFsdWF0b3Iuc2V0dGluZ3NbcHJvcGVydHkua2V5XVwiPjwvdGV4dGFyZWE+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2V0IGJrclwiIG5nLWNsaWNrPVwic2V0KHByb3BlcnR5LmtleSlcIj5TZXQ8L2J1dHRvbj5cXG48L2Rpdj5cXG48ZGl2IG5nLXJlcGVhdD1cImFjdGlvbiBpbiBhY3Rpb25zXCIgY2xhc3M9XCJhY3Rpb24gbGFuZ3VhZ2Utb3B0aW9uIGNsZWFyZml4IGJrclwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImV2YWx1YXRvci5wZXJmb3JtKGFjdGlvbi5rZXkpXCI+e3sgYWN0aW9uLm5hbWUgfX08L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLWNsYXNzPVwiaXNMb2NrZWQoKSAmYW1wOyZhbXA7IFxcJ2xvY2tlZFxcJ1wiIGNsYXNzPVwiYmtjZWxsIHt7Y2VsbG1vZGVsLnR5cGV9fSBia3JcIj5cXG4gIDxkaXYgbmctaWY9XCJjZWxsbW9kZWwuaW5wdXQuaGlkZGVuICZhbXA7JmFtcDsgY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCcgJmFtcDsmYW1wOyAhaXNMb2NrZWQoKVwiIGNsYXNzPVwibWluaS1jZWxsLXN0YXRzIGFkdmFuY2VkLWhpZGUgYmtyXCI+XFxuICAgIHt7Y2VsbG1vZGVsLmV2YWx1YXRvcn19ICZuYnNwO1xcbiAgICAoe3tjZWxsbW9kZWwubGluZUNvdW50fX0gbGluZXMpXFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJ0b2dnbGUtbWVudSBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXByb21vdGVkIGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBjZWxsLWRyb3Bkb3duIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0aXRsZT1cImNlbGwgbWVudVwiPjwvZGl2PlxcbiAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJjZWxsdmlldy5tZW51Lml0ZW1zXCIgc3VibWVudS1jbGFzc2VzPVwiZHJvcC1sZWZ0XCIgY2xhc3M9XCJia3JcIj48L2JrLWRyb3Bkb3duLW1lbnU+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gbW92ZS1jZWxsLWRvd24gYmtyXCIgbmctY2xpY2s9XCJtb3ZlQ2VsbERvd24oKVwiIG5nLWNsYXNzPVwibW92ZUNlbGxEb3duRGlzYWJsZWQoKSAmYW1wOyZhbXA7IFxcJ2Rpc2FibGVkXFwnXCIgdGl0bGU9XCJtb3ZlIGNlbGwgZG93blwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gbW92ZS1jZWxsLXVwIGJrclwiIG5nLWNsaWNrPVwibW92ZUNlbGxVcCgpXCIgbmctY2xhc3M9XCJtb3ZlQ2VsbFVwRGlzYWJsZWQoKSAmYW1wOyZhbXA7IFxcJ2Rpc2FibGVkXFwnXCIgdGl0bGU9XCJtb3ZlIGNlbGwgdXBcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtbWVudS1pdGVtIGRlbGV0ZS1jZWxsIGJrclwiIG5nLWNsaWNrPVwiZGVsZXRlQ2VsbCgpXCIgdGl0bGU9XCJkZWxldGUgY2VsbFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZXhwYW5kLWNvbnRyYWN0IGJrclwiIG5nLWlmPVwiY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCdcIiBuZy1jbGljaz1cInRvZ2dsZUNlbGxJbnB1dCgpXCIgbmctY2xhc3M9XCJjZWxsbW9kZWwuaW5wdXQuaGlkZGVuICZhbXA7JmFtcDsgXFwnY29sbGFwc2VkXFwnXCIgdGl0bGU9XCJoaWRlL3Nob3cgY2VsbCBpbnB1dFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gZHJvcGRvd24tcHJvbW90ZWQgYWR2YW5jZWQtb25seSBia3JcIiBuZy1pZj1cImlzQ29kZUNlbGwoKVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XFxuICAgICAgPGJrLWNvZGUtY2VsbC1pbnB1dC1tZW51IGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtaW5wdXQtbWVudT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBldmFsdWF0ZSBia3JcIiBuZy1jbGljaz1cImV2YWx1YXRlKCRldmVudClcIiBuZy1pZj1cImlzQ29kZUNlbGwoKVwiIHRpdGxlPVwicnVuIGNlbGxcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtc3RhdHVzLWl0ZW0gbG9hZGluZy1zdGF0ZSBhZHZhbmNlZC1oaWRlIGJrclwiIG5nLWlmPVwiY2VsbG1vZGVsLnR5cGU9PVxcJ2NvZGVcXCcgJmFtcDsmYW1wOyAhY2VsbG1vZGVsLmV2YWx1YXRvclJlYWRlclwiPkluaXRpYWxpemluZyB7e2NlbGxtb2RlbC5ldmFsdWF0b3J9fVxcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXIgcm90YXRpbmcgYmtyXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLWlmPVwiaXNEZWJ1Z2dpbmcoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIFtEZWJ1Z106IGNlbGwgSWQgPSB7e2NlbGxtb2RlbC5pZH19LCBwYXJlbnQgPSB7e2dldFBhcmVudElkKCl9fSwgbGV2ZWwgPSB7e2NlbGxtb2RlbC5sZXZlbH19XFxuICAgIDxhIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0RlYnVnSW5mbygpXCIgbmctaGlkZT1cImlzU2hvd0RlYnVnSW5mbygpXCIgY2xhc3M9XCJia3JcIj5zaG93IG1vcmU8L2E+XFxuICAgIDxhIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0RlYnVnSW5mbygpXCIgbmctc2hvdz1cImlzU2hvd0RlYnVnSW5mbygpXCIgY2xhc3M9XCJia3JcIj5zaG93IGxlc3M8L2E+XFxuICAgIDxkaXYgY29sbGFwc2U9XCIhaXNTaG93RGVidWdJbmZvKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxwcmUgY2xhc3M9XCJia3JcIj57e2NlbGxtb2RlbCB8IGpzb259fTwvcHJlPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1pbmNsdWRlPVwiZ2V0VHlwZUNlbGxVcmwoKVwiIGNsYXNzPVwiYmtyXCI+PC9kaXY+XFxuICA8YmstbmV3LWNlbGwtbWVudSBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIG5nLWNsYXNzPVwiaXNMYXJnZSAmYW1wOyZhbXA7IFxcJ2xhcmdlXFwnXCIgaXMtbGFyZ2U9XCJpc0xhcmdlXCIgbmctaWY9XCJuZXdDZWxsTWVudUNvbmZpZy5pc1Nob3coKVwiIGNsYXNzPVwiYmtyXCI+PC9iay1uZXctY2VsbC1tZW51PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48ZGl2IGNsYXNzPVwiZXZhbHVhdG9yIGJrclwiIGV2YWx1YXRvci10eXBlPVwie3sgY2VsbG1vZGVsLmV2YWx1YXRvciB9fVwiIG5nLWNsYXNzPVwie1xcbiAgXFwnZXZhbHVhdG9yLXJlYWR5XFwnOiBjZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyLFxcbiAgXFwnbG9ja2VkXFwnOiBpc0xvY2tlZCgpLFxcbiAgXFwnZW1wdHlcXCc6IGlzRW1wdHkoKVxcbiAgfVwiPlxcblxcbiAgPHAgY2xhc3M9XCJkZXB0aC1pbmRpY2F0b3IgYmtyXCI+e3tnZXRGdWxsSW5kZXgoKX19PC9wPlxcbiAgPGRpdiBjbGFzcz1cImJrY2VsbCBjb2RlLWNlbGwtYXJlYSBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImNvZGUtY2VsbC1pbnB1dCBia3JcIiBuZy1jbGljaz1cImJhY2tncm91bmRDbGljaygkZXZlbnQpXCIgbmctaGlkZT1cImlzTG9ja2VkKClcIiBuZy1jbGFzcz1cIntcXCdpbnB1dC1oaWRkZW5cXCc6IGNlbGxtb2RlbC5pbnB1dC5oaWRkZW59XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvZGUtY2VsbC1pbnB1dC1jb250ZW50IGJrclwiPlxcbiAgICAgICAgPGJrLWNvZGUtY2VsbC1pbnB1dC1tZW51IGNsYXNzPVwiYWR2YW5jZWQtaGlkZSBia3JcIj48L2JrLWNvZGUtY2VsbC1pbnB1dC1tZW51PlxcbiAgICAgICAgPGRpdiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImJrY2VsbHRleHRhcmVhIGJrclwiIG5nLW1vZGVsPVwiY2VsbG1vZGVsLmlucHV0LmJvZHlcIj48L3RleHRhcmVhPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGV2YWx1YXRlLXNjcmlwdCBhZHZhbmNlZC1oaWRlIGJrclwiIG5nLWNsaWNrPVwiZXZhbHVhdGUoJGV2ZW50KVwiIGVhdC1jbGljaz1cIlwiPlxcbiAgICAgICAgICB7eyBpc0pvYkNhbmNlbGxhYmxlKCkgPyBcXCdTdG9wXFwnIDogXFwnUnVuXFwnIH19XFxuICAgICAgICA8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLWlmPVwiaGFzT3V0cHV0KClcIiBjbGFzcz1cImNvZGUtY2VsbC1vdXRwdXQgYmtyXCIgbmctY2xhc3M9XCJ7XFxuICAgICAgXFwnbm8tb3V0cHV0XFwnOiBpc0hpZGRlbk91dHB1dCgpLFxcbiAgICAgIFxcJ2lucHV0LWhpZGRlblxcJzogY2VsbG1vZGVsLmlucHV0LmhpZGRlbixcXG4gICAgICBcXCdvdXRwdXQtaGlkZGVuXFwnOiBjZWxsbW9kZWwub3V0cHV0LmhpZGRlbixcXG4gICAgICBcXCdlcnJvclxcJzogaXNFcnJvcigpXFxuICAgICAgfVwiPlxcbiAgICAgIDxoNiBuZy1pZj1cIm91dHB1dFRpdGxlKClcIiBjbGFzcz1cImJrclwiPnt7b3V0cHV0VGl0bGUoKX19PC9oNj5cXG4gICAgICA8YmstY29kZS1jZWxsLW91dHB1dCBtb2RlbD1cImNlbGxtb2RlbC5vdXRwdXRcIiBldmFsdWF0b3ItaWQ9XCJ7eyBjZWxsbW9kZWwuZXZhbHVhdG9yIH19XCIgY2VsbC1pZD1cInt7IGNlbGxtb2RlbC5pZCB9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPC9iay1jb2RlLWNlbGwtb3V0cHV0PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsaW5wdXRtZW51XCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiZHJvcGRvd24gYmstY29kZS1jZWxsLWlucHV0IGJrclwiPlxcbiAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgY2VsbC1ldmFsdWF0b3ItbWVudSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgIDxiay1sYW5ndWFnZS1sb2dvIG5hbWU9XCJ7e2dldEV2YWx1YXRvcigpLnNob3J0TmFtZX19XCIgYmctY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmJnQ29sb3J9fVwiIGZnLWNvbG9yPVwie3tnZXRFdmFsdWF0b3IoKS5mZ0NvbG9yfX1cIiBib3JkZXItY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmJvcmRlckNvbG9yfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICA8L2JrLWxhbmd1YWdlLWxvZ28+XFxuICAgIDxiIGNsYXNzPVwiYWR2YW5jZWQtaGlkZSBia3JcIj57e2NlbGxtb2RlbC5ldmFsdWF0b3J9fTwvYj5cXG4gIDwvYT5cXG4gIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgaW5wdXRjZWxsbWVudSBia3JcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICA8bGkgbmctcmVwZWF0PVwiKGV2YWx1YXRvck5hbWUsIGV2YWx1YXRvcikgaW4gZ2V0RXZhbHVhdG9ycygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cInNldEV2YWx1YXRvcihldmFsdWF0b3JOYW1lKVwiIGNsYXNzPVwie3tldmFsdWF0b3JOYW1lfX0tbWVudWl0ZW0gYmtyXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgICB7e2V2YWx1YXRvck5hbWV9fVxcbiAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjayBia3JcIiBuZy1zaG93PVwiZ2V0U2hvd0V2YWxJY29uKGV2YWx1YXRvck5hbWUpXCI+PC9pPlxcbiAgICAgIDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxvdXRwdXRcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJ0b2dnbGUtbWVudSBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi1wcm9tb3RlZCBia3JcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gY2VsbC1kcm9wZG93biBkcm9wZG93bi10b2dnbGUgYmtyXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIHRpdGxlPVwiY2VsbCBvdXRwdXQgbWVudVwiIG5nLXNob3c9XCJpc1Nob3dNZW51KClcIj48L2Rpdj5cXG4gICAgPGJrLWNvZGUtY2VsbC1vdXRwdXQtbWVudSBtb2RlbD1cIm91dHB1dENlbGxNZW51TW9kZWxcIiBjbGFzcz1cImJrclwiPjwvYmstY29kZS1jZWxsLW91dHB1dC1tZW51PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZXhwYW5kLWNvbnRyYWN0IGJrclwiIG5nLWNsaWNrPVwidG9nZ2xlRXhwYW5zaW9uKClcIiBuZy1jbGFzcz1cIiFpc0V4cGFuZGVkKCkgJmFtcDsmYW1wOyBcXCdjb2xsYXBzZWRcXCdcIiB0aXRsZT1cImhpZGUvc2hvdyBjZWxsIG91dHB1dFwiIG5nLXNob3c9XCJpc1Nob3dNZW51KClcIj48L2Rpdj5cXG48L2Rpdj5cXG48Ymstb3V0cHV0LWRpc3BsYXkgbmctc2hvdz1cImlzU2hvd091dHB1dCgpXCIgbW9kZWw9XCJvdXRwdXREaXNwbGF5TW9kZWxcIiB0eXBlPVwie3sgZ2V0T3V0cHV0RGlzcGxheVR5cGUoKSB9fVwiIGNsYXNzPVwiYmtyXCI+XFxuPC9iay1vdXRwdXQtZGlzcGxheT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbG91dHB1dG1lbnVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1mb3JtIGJrclwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICA8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51IGRyb3AtbGVmdCBia3JcIj5cXG4gICAgPGEgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiYmtyXCI+RGlzcGxheXMgKHt7bW9kZWwuZ2V0U2VsZWN0ZWREaXNwbGF5KCl9fSk8L2E+XFxuICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCI+XFxuICAgICAgPGxpIG5nLXJlcGVhdD1cImQgaW4gbW9kZWwuZ2V0QXBwbGljYWJsZURpc3BsYXlzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJtb2RlbC5zZXRTZWxlY3RlZERpc3BsYXkoZClcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tb2sgYmtyXCIgbmctc2hvdz1cImQgPT09IG1vZGVsLmdldFNlbGVjdGVkRGlzcGxheSgpXCI+PC9pPnt7IGQgfX1cXG4gICAgICAgIDwvYT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9saT5cXG4gIDxsaSBuZy1yZXBlYXQ9XCJpdGVtIGluIG1vZGVsLmdldEFkZGl0aW9uYWxNZW51SXRlbXMoKVwiIGNsYXNzPVwie3tnZXRJdGVtQ2xhc3MoaXRlbSl9fSBia3JcIj5cXG4gICAgPGEgdGFiaW5kZXg9XCItMVwiIG5nLWNsaWNrPVwiaXRlbS5hY3Rpb24oKVwiIGNsYXNzPVwiYmtyXCI+e3tnZXRJdGVtTmFtZShpdGVtKX19PC9hPlxcbiAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiPlxcbiAgICAgIDxsaSBuZy1yZXBlYXQ9XCJzdWJpdGVtIGluIGdldFN1Ykl0ZW1zKGl0ZW0pXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDxhIG5nLWNsaWNrPVwic3ViaXRlbS5hY3Rpb24oKVwiIGNsYXNzPVwie3tnZXRTdWJtZW51SXRlbUNsYXNzKHN1Yml0ZW0pfX0gYmtyXCIgdGl0bGU9XCJ7e3N1Yml0ZW0udG9vbHRpcH19XCI+e3tzdWJpdGVtLm5hbWV9fTwvYT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9saT5cXG48L3VsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL21hcmtkb3duLWVkaXRhYmxlXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLXNob3c9XCJtb2RlPT1cXCdlZGl0XFwnXCIgbmctY2xpY2s9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBjbGFzcz1cImNvZGVtaXJyb3Itd3JhcHBlciBia3JcIj5cXG4gIDx0ZXh0YXJlYSBjbGFzcz1cImJrclwiPjwvdGV4dGFyZWE+XFxuPC9kaXY+XFxuPGRpdiBuZy1jbGljaz1cImVkaXQoJGV2ZW50KVwiIGNsYXNzPVwibWFya3VwIGJrclwiIG5nLXNob3c9XCJtb2RlPT1cXCdwcmV2aWV3XFwnXCI+PC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbWFya2Rvd25jZWxsXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG5cXG48cCBjbGFzcz1cImRlcHRoLWluZGljYXRvciBia3JcIj57e2dldEZ1bGxJbmRleCgpfX08L3A+XFxuPGJrLW1hcmtkb3duLWVkaXRhYmxlIGNlbGxtb2RlbD1cImNlbGxtb2RlbFwiIGNsYXNzPVwiYmtyXCI+PC9iay1tYXJrZG93bi1lZGl0YWJsZT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9uZXdjZWxsbWVudVwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBuZXctY2VsbCBia3JcIj5cXG4gIDxidXR0b24gbmctY2xpY2s9XCJuZXdDb2RlQ2VsbChkZWZhdWx0RXZhbHVhdG9yKCkpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgaW5zZXJ0LWNlbGwgYmtyXCIgbmctY2xhc3M9XCIhaXNMYXJnZSAmYW1wOyZhbXA7IFxcJ2J0bi14c1xcJ1wiPlxcbiAgICA8c3BhbiBuZy1jbGFzcz1cIiFpc0xhcmdlICZhbXA7JmFtcDsgXFwnYWR2YW5jZWQtaGlkZVxcJ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgSW5zZXJ0IHt7ZGVmYXVsdEV2YWx1YXRvcigpfX0gQ2VsbFxcbiAgICA8L3NwYW4+XFxuICAgIDxzcGFuIG5nLWlmPVwiIWlzTGFyZ2VcIiBjbGFzcz1cInBsdXMgYWR2YW5jZWQtb25seSBia3JcIj4rPC9zcGFuPlxcbiAgPC9idXR0b24+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZSBia3JcIiBuZy1jbGFzcz1cIiFpc0xhcmdlICZhbXA7JmFtcDsgXFwnYnRuLXhzXFwnXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLXNvcnQtZG93biBia3JcIj48L2k+XFxuICA8L2J1dHRvbj5cXG4gIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIj5cXG4gICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudSBia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJia3JcIj5Db2RlIGNlbGw8L2E+XFxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIj5cXG4gICAgICAgIDxsaSBuZy1yZXBlYXQ9XCIoa2V5LCB2YWx1ZSkgaW4gZ2V0RXZhbHVhdG9ycygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPGEgbmctY2xpY2s9XCJuZXdDb2RlQ2VsbChrZXkpXCIgY2xhc3M9XCJia3JcIj57e2tleX19PC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgICAgIDxsaSBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICAgPGEgbmctY2xpY2s9XCJzaG93UGx1Z2luTWFuYWdlcigpXCIgY2xhc3M9XCJia3JcIj5PdGhlciBsYW5ndWFnZXMuLi48L2E+XFxuICAgICAgICA8L2xpPlxcbiAgICAgIDwvdWw+XFxuICAgIDwvbGk+XFxuICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnUgYmtyXCI+XFxuICAgICAgPGEgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiYmtyXCI+U2VjdGlvbiBjZWxsPC9hPlxcbiAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCI+XFxuICAgICAgICA8bGkgbmctcmVwZWF0PVwibGV2ZWwgaW4gZ2V0TGV2ZWxzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8YSBuZy1jbGljaz1cIm5ld1NlY3Rpb25DZWxsKGxldmVsKVwiIGNsYXNzPVwiYmtyXCI+SHt7bGV2ZWx9fTwvYT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9saT5cXG4gICAgPGxpIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGEgdGFiaW5kZXg9XCItMVwiIG5nLWNsaWNrPVwibmV3TWFya2Rvd25DZWxsKClcIiBjbGFzcz1cImJrclwiPk1hcmtkb3duIGNlbGw8L2E+XFxuICAgIDwvbGk+XFxuICA8L3VsPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25vdGVib29rXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLWNsYXNzPVwie1xcJ2FkdmFuY2VkLW1vZGVcXCc6IGlzQWR2YW5jZWRNb2RlKCksIFxcJ2hpZXJhcmNoeS1tb2RlXFwnOiBpc0hpZXJhcmNoeUVuYWJsZWQoKX1cIiBjbGFzcz1cImJrclwiPlxcbiAgPGJrLW5ldy1jZWxsLW1lbnUgbmctc2hvdz1cIiFpc0xvY2tlZCgpICZhbXA7JmFtcDsgIWlzTG9hZGluZ1wiIG5nLWNsYXNzPVwiaXNFbXB0eSgpICZhbXA7JmFtcDsgXFwnb25seS1jaGlsZCBsYXJnZVxcJ1wiIGlzLWxhcmdlPVwiaXNFbXB0eSgpXCIgY29uZmlnPVwibmV3Q2VsbE1lbnVDb25maWdcIiBjbGFzcz1cImJrclwiPjwvYmstbmV3LWNlbGwtbWVudT5cXG4gIDxkaXYgY2xhc3M9XCJia2NlbGwgYmtyXCI+XFxuICAgIDxiay1jZWxsIG5nLXJlcGVhdD1cImNlbGwgaW4gZ2V0Q2hpbGRyZW4oKVwiIGNlbGxtb2RlbD1cImNlbGxcIiBpbmRleD1cIiRpbmRleFwiIGNlbGxpZD1cInt7Y2VsbC5pZH19XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgPC9iay1jZWxsPlxcbiAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gYmtjZWxsbWVudSBia3JcIiBzdHlsZT1cInBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogOTlcIj5cXG4gICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+PC9hPlxcbiAgICAgIDxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJtZW51SXRlbXNcIiBzdWJtZW51LWNsYXNzZXM9XCJwdWxsLWxlZnRcIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudT5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctc2hvdz1cImlzU2hvd2luZ091dHB1dCgpXCIgY2xhc3M9XCJvdXRwdXRsb2dib3ggYmtyXCI+PC9kaXY+XFxuICA8ZGl2IG5nLXNob3c9XCJpc1Nob3dpbmdPdXRwdXQoKVwiIGNsYXNzPVwib3V0cHV0bG9nY29udGFpbmVyIGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9naGFuZGxlIGJrclwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiYnRuLXRvb2xiYXIgYmtyXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBhbHQtY29udHJvbHMgYmtyXCI+XFxuICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tc20gYmtyXCIgbmctY2xpY2s9XCJjbGVhck91dHB1dCgpXCI+Q2xlYXI8L2E+XFxuICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tc20gaGlkZS1vdXRwdXQgYmtyXCIgbmctY2xpY2s9XCJoaWRlT3V0cHV0KClcIj5IaWRlPC9hPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgYmtyXCIgZGF0YS10b2dnbGU9XCJidXR0b25zLWNoZWNrYm94XCI+XFxuICAgICAgICA8YSBjbGFzcz1cImJ0biBia3JcIiBuZy1jbGFzcz1cInNob3dTdGRPdXQgPyBcXCdidG4tcHJpbWFyeVxcJyA6IFxcJ2J0bi1kZWZhdWx0XFwnXCIgbmctY2xpY2s9XCJ0b2dnbGVTdGRPdXQoJGV2ZW50KVwiPnN0ZG91dDwvYT5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJrclwiIG5nLWNsYXNzPVwic2hvd1N0ZEVyciA/IFxcJ2J0bi1wcmltYXJ5XFwnIDogXFwnYnRuLWRlZmF1bHRcXCdcIiBuZy1jbGljaz1cInRvZ2dsZVN0ZEVycigkZXZlbnQpXCI+c3RkZXJyPC9hPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cIm91dHB1dGxvZ291dCBia3JcIiBuZy1zaG93PVwic2hvd1N0ZE91dFwiIG5nLWNsYXNzPVwiIXNob3dTdGRFcnIgJmFtcDsmYW1wOyBcXCdzaW5nbGVcXCdcIj5cXG4gICAgICA8bGFiZWwgY2xhc3M9XCJvdXRwdXQtbGFiZWwgYmtyXCI+c3Rkb3V0OjwvbGFiZWw+XFxuICAgICAgPGRpdiBjbGFzcz1cIm91dHB1dGxvZ2JveCBvdXRwdXRsb2dzdGRvdXQgYmtyXCI+XFxuICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cImxpbmUgaW4gb3V0cHV0TG9nIHRyYWNrIGJ5ICRpbmRleFwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxkaXYgbmctc2hvdz1cImxpbmUudHlwZSA9PSBcXCd0ZXh0XFwnIHx8IGxpbmUudHlwZSA9PSBcXCdzdGRvdXRcXCdcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICAgIDxwcmUgY2xhc3M9XCJwcmVsb2cgYmtyXCI+e3tsaW5lLmxpbmV9fTwvcHJlPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cIm91dHB1dGxvZ2VyciBia3JcIiBuZy1zaG93PVwic2hvd1N0ZEVyclwiIG5nLWNsYXNzPVwiIXNob3dTdGRPdXQgJmFtcDsmYW1wOyBcXCdzaW5nbGVcXCdcIj5cXG4gICAgICA8bGFiZWwgY2xhc3M9XCJvdXRwdXQtbGFiZWwgYmtyXCI+c3RkZXJyOjwvbGFiZWw+XFxuICAgICAgPGRpdiBjbGFzcz1cIm91dHB1dGxvZ2JveCBia3JcIj5cXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVwibGluZSBpbiBvdXRwdXRMb2cgdHJhY2sgYnkgJGluZGV4XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPGRpdiBuZy1zaG93PVwibGluZS50eXBlID09IFxcJ3N0ZGVyclxcJ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICAgPHByZSBjbGFzcz1cInByZWxvZyBia3JcIj57e2xpbmUubGluZX19PC9wcmU+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLWlmPVwiaXNEZWJ1Z2dpbmcoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxidXR0b24gbmctY2xpY2s9XCJzaG93RGVidWdUcmVlID0gIXNob3dEZWJ1Z1RyZWVcIiBjbGFzcz1cImJrclwiPlRvZ2dsZSBkZWJ1ZyBUcmVlPC9idXR0b24+XFxuICAgIDxkaXYgY29sbGFwc2U9XCIhc2hvd0RlYnVnVHJlZVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPHByZSBjbGFzcz1cImJrclwiPnt7Z2V0Tm90ZWJvb2tNb2RlbCgpIHwganNvbn19PC9wcmU+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svb3V0cHV0LXByb2dyZXNzXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IG5nLWlmPVwiZWxhcHNlZCA+IDIwMFwiIGNsYXNzPVwicm93IGJrclwiPlxcbiAgPGRpdiBjbGFzcz1cImNvbC1zbS0yIGJrclwiPlxcbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY29nIGZhLXNwaW4gZmEtbGcgYmtyXCI+PC9pPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiYmtyXCI+ICZuYnNwOyBFbGFwc2VkOiB7e2dldEVsYXBzZWRUaW1lKCl9fSAmbmJzcDsgPC9zcGFuPlxcbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXMtY2lyY2xlIGZhLWxnIHRleHQtZGFuZ2VyIGN1cnNvcl9oYW5kIGJrclwiIG5nLWNsaWNrPVwiY2FuY2VsKClcIiBuZy1pZj1cImlzQ2FuY2VsbGFibGUoKVwiIHRpdGxlPVwiY2FuY2VsXCI+PC9pPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTIgYmtyXCIgbmctaWY9XCJoYXNQcm9ncmVzc0JhcigpXCI+XFxuXFx0ICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgYmtyXCI+XFxuXFx0XFx0ICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyIGJrclwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVub3c9XCJ7e2dldFByb2dyZXNzQmFyKCl9fVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiIHN0eWxlPVwid2lkdGg6IHt7Z2V0UHJvZ3Jlc3NCYXIoKX19JVwiPlxcblxcdFxcdCAgICB7e2dldFByb2dyZXNzQmFyKCl9fSAlXFxuXFx0XFx0ICA8L2Rpdj5cXG5cXHQgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLWlmPVwiaGFzTWVzc2FnZSgpXCIgY2xhc3M9XCJjb2wtc20tOCBia3JcIj4ge3tnZXRNZXNzYWdlKCl9fTwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgbmctaWY9XCJoYXNQYXlsb2FkKCkgfHwgaGFzT3V0cHV0RGF0YSgpXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxociBjbGFzcz1cImJrclwiPlxcbiAgPGJrLWNvZGUtY2VsbC1vdXRwdXQgbW9kZWw9XCJvdXRwdXREaXNwbGF5TW9kZWxcIiBjbGFzcz1cImJrclwiPjwvYmstY29kZS1jZWxsLW91dHB1dD5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9vdXRwdXQtcmVzdWx0c1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPHVsIG5nLWlmPVwiaGFzT3V0cHV0RGF0YSgpXCIgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIGJrclwiPlxcbiAgPGxpIG5nLXJlcGVhdD1cImkgaW4gb3V0cHV0ZGF0YVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxwcmUgbmctY2xhc3M9XCJpLnR5cGUgPT09ICZxdW90O291dCZxdW90OyA/ICZxdW90O3RleHQtaW5mbyZxdW90OyA6ICZxdW90O3RleHQtd2FybmluZyZxdW90O1wiIGNsYXNzPVwiYmtyXCI+e3sgaS52YWx1ZSB9fTwvcHJlPlxcbiAgPC9saT5cXG48L3VsPlxcbjxiay1jb2RlLWNlbGwtb3V0cHV0IG5nLWlmPVwiaGFzUGF5bG9hZCgpXCIgbW9kZWw9XCJwYXlsb2FkXCIgY2xhc3M9XCJia3JcIj48L2JrLWNvZGUtY2VsbC1vdXRwdXQ+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svc2VjdGlvbmNlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctaGlkZT1cImNlbGxtb2RlbC5oaWRlVGl0bGVcIiBjbGFzcz1cImJrclwiPlxcbiAgPHNwYW4gY2xhc3M9XCJia3NlY3Rpb250b2dnbGVwbHVzIHNlY3Rpb24tdG9nZ2xlIGJrclwiIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0NoaWxkcmVuKClcIiBuZy1oaWRlPVwiaXNTaG93Q2hpbGRyZW4oKVwiPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLXBsdXMgYmtyXCI+PC9pPlxcbiAgPC9zcGFuPlxcbiAgPHNwYW4gY2xhc3M9XCJia3NlY3Rpb250b2dnbGVtaW51cyBzZWN0aW9uLXRvZ2dsZSBia3JcIiBuZy1jbGljaz1cInRvZ2dsZVNob3dDaGlsZHJlbigpXCIgbmctc2hvdz1cImlzU2hvd0NoaWxkcmVuKClcIj5cXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1taW51cyBia3JcIj48L2k+XFxuICA8L3NwYW4+XFxuICA8cCBjbGFzcz1cImRlcHRoLWluZGljYXRvciBia3JcIj57e2dldEZ1bGxJbmRleCgpfX08L3A+XFxuICA8YmstbWFya2Rvd24tZWRpdGFibGUgY2xhc3M9XCJzZWN0aW9ue3tjZWxsbW9kZWwubGV2ZWx9fSBiay1zZWN0aW9uLXRpdGxlIGJrclwiIGNlbGxtb2RlbD1cImNlbGxtb2RlbFwiPjwvYmstbWFya2Rvd24tZWRpdGFibGU+XFxuPC9kaXY+XFxuPGJrLW5ldy1jZWxsLW1lbnUgc2l6ZT1cInhzXCIgY29uZmlnPVwibmV3Q2VsbE1lbnVDb25maWdcIiBuZy1pZj1cIm5ld0NlbGxNZW51Q29uZmlnLmlzU2hvdygpXCIgY2xhc3M9XCJia3JcIj48L2JrLW5ldy1jZWxsLW1lbnU+XFxuPGRpdiBuZy1zaG93PVwiaXNTaG93Q2hpbGRyZW4oKVwiIGNsYXNzPVwic2VjdGlvbi1jaGlsZHJlbiBia3JcIj5cXG4gIDxiay1jZWxsIG5nLXJlcGVhdD1cImNlbGwgaW4gZ2V0Q2hpbGRyZW4oKVwiIGNlbGxtb2RlbD1cImNlbGxcIiBpbmRleD1cIiRpbmRleFwiIGNlbGxpZD1cInt7Y2VsbC5pZH19XCIgY2xhc3M9XCJia3JcIj48L2JrLWNlbGw+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svdGV4dGNlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxwIGNsYXNzPVwiZGVwdGgtaW5kaWNhdG9yIGJrclwiPnt7Z2V0RnVsbEluZGV4KCl9fTwvcD5cXG48ZGl2IGNsYXNzPVwidGV4dGNlbGwtd3JhcHBlciBia3JcIiBuZy1jbGljaz1cImVkaXQoKVwiPlxcbiAgPGRpdiBjbGFzcz1cImVkaXRhYmxlLXRleHQgYmtyXCIgY29udGVudGVkaXRhYmxlPVwie3sgaXNFZGl0YWJsZSgpID8gdHJ1ZSA6IGZhbHNlIH19XCIgc3R5bGU9XCJtaW4taGVpZ2h0OiAxNHB4OyBtaW4td2lkdGg6IDE0cHhcIj48L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImJrby10YWJsZWRpc3BsYXkvb3V0cHV0LXRhYmxlLW9wdGlvbnNcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgZml4ZWQgYmtyXCIgc3R5bGU9XCJoZWlnaHQ6IDY5cHhcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPlRhYmxlIE9wdGlvbnM8L2gxPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGZpeGVkIG1vZGFsLWxhcmdlIGJrclwiIHN0eWxlPVwicGFkZGluZy10b3A6IDY5cHg7IHBhZGRpbmctYm90dG9tOiA2OHB4XCI+XFxuXFxuIDx0YWJzZXQgY2xhc3M9XCJia3JcIj5cXG5cXHQ8dGFiIGhlYWRpbmc9XCJUYWJsZSBGb3JtYXR0aW5nXCIgY2xhc3M9XCJia3JcIj5cXG5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcblxcdFxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTQgYmtyXCI+XFxuXFx0XFx0ICAgIFxcdFVzZSBwYWdpbmF0aW9uOlxcblxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTQgYmtyXCI+XFxuXFx0XFx0ICAgIFxcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1tb2RlbD1cInBhZ2luYXRpb24udXNlXCIgY2xhc3M9XCJia3JcIj5cXG5cXHRcXHQgICAgPC9kaXY+XFxuICAgIFxcdDwvZGl2PlxcblxcdFxcdDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNCBia3JcIj5cXG5cXHRcXHQgICAgXFx0TWF4IHJvd3MgdG8gZGlzcGxheTpcXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy00IGJrclwiPlxcblxcdFxcdCAgICBcXHQ8aW5wdXQgdHlwZT1cIm51bWJlclwiIG5nLW1vZGVsPVwicGFnaW5hdGlvbi5yb3dzVG9EaXNwbGF5XCIgbmctZGlzYWJsZWQ9XCJwYWdpbmF0aW9uLnVzZVwiIGNsYXNzPVwiYmtyXCI+XFxuXFx0XFx0ICAgIDwvZGl2PlxcbiAgICBcXHQ8L2Rpdj5cXG5cXHQ8L3RhYj5cXG5cXHQ8dGFiIGhlYWRpbmc9XCJDZWxsIEZvcm1hdHRpbmdcIiBjbGFzcz1cImJrclwiPlxcblxcdCAgPGRpdiBjbGFzcz1cInJvdyBia3JcIj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5Db2x1bW48L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5EaXNwbGF5IFR5cGU8L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5TaG93ICg8YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRpc3BsYXlBbGwoKVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+QWxsPC9hPik8L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxoMiBjbGFzcz1cImJrclwiPjxzdHJvbmcgY2xhc3M9XCJia3JcIj5BbGlnbm1lbnQ8L3N0cm9uZz48L2gyPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgIDwvZGl2PlxcblxcblxcdCAgPGRpdiBjbGFzcz1cInJvdyBia3JcIiBuZy1yZXBlYXQ9XCJtZW51aWR4IGluIGdldENlbGxJZHhcIj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIHt7IGdldENlbGxOYW1bbWVudWlkeF0gfX1cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJrclwiIG5nLW1vZGVsPVwiZ2V0Q2VsbERpc3BbbWVudWlkeF1cIiBuZy1vcHRpb25zPVwiaXRlbS50eXBlIGFzIGl0ZW0ubmFtZSBmb3IgaXRlbSBpbiBnZXRDZWxsRGlzcE9wdHNGKG1lbnVpZHgpXCI+PC9zZWxlY3Q+XFxuXFx0XFx0PC9kaXY+ICAgXFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHQgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmctbW9kZWw9XCJnZXRDZWxsU2hvW21lbnVpZHhdXCIgY2xhc3M9XCJia3JcIj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBia3JcIj5cXG5cXHRcXHRcXHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmctbW9kZWw9XCJnZXRDZWxsQWxpZ25bbWVudWlkeF1cIiB2YWx1ZT1cIkxcIiBjbGFzcz1cImJrclwiPiZuYnNwOzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1hbGlnbi1sZWZ0IGJrclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4mbmJzcDtcXG4gIFxcdFxcdFxcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuZy1tb2RlbD1cImdldENlbGxBbGlnblttZW51aWR4XVwiIHZhbHVlPVwiQ1wiIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWFsaWduLWNlbnRlciBia3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Jm5ic3A7XFxuXFx0XFx0XFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5nLW1vZGVsPVwiZ2V0Q2VsbEFsaWduW21lbnVpZHhdXCIgdmFsdWU9XCJSXCIgY2xhc3M9XCJia3JcIj4mbmJzcDs8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tYWxpZ24tcmlnaHQgYmtyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiZuYnNwO1xcblxcdCAgICA8L2Rpdj5cXG5cXHQgIDwvZGl2PlxcbiAgIDwvdGFiPlxcbiA8L3RhYnNldD5cXG5cXG5cXG5cXG48L2Rpdj5cXG5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrciBia3JcIiBzdHlsZT1cImhlaWdodDogNjhweFwiPiBcXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyIGJrclwiIG5nLWNsaWNrPVwiY2FuY2VsT3B0aW9uc0RpYWxvZygpXCI+Q2FuY2VsPC9idXR0b24+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IG1vZGFsLXN1Ym1pdCBia3IgYmtyXCIgbmctY2xpY2s9XCJjbG9zZU9wdGlvbnNEaWFsb2coKVwiPk9LPC9idXR0b24+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJia28tdGFibGVkaXNwbGF5L291dHB1dC10YWJsZVwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cImRyb3Bkb3duIGR0bWVudSBjbGVhcmZpeCBia3JcIiBzdHlsZT1cImZsb2F0OiBsZWZ0XCIgbmctaWY9XCJyZW5kZXJNZW51XCI+XFxuICAgPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGUgZHRtZW51IGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBuZy1jbGljaz1cIm1lbnVUb2dnbGUoKVwiPlxcbiAgIEVkaXQgVGFibGUgXFxuICAgPC9hPlxcbiAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIiBzdWJtZW51LWNsYXNzZXM9XCJkcm9wLXJpZ2h0XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvUmVzZXRTb3J0KClcIiBpZD1cImR0LXJlc2V0LXNvcnRcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlJlc2V0IFNvcnQ8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPiZuYnNwOzwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvU2VsZWN0QWxsKClcIiBpZD1cImR0LXNlbGVjdC1hbGxcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlNlbGVjdCBBbGw8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9EZXNlbGVjdEFsbCgpXCIgaWQ9XCJkdC1kZXNlbGVjdC1hbGxcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPkRlc2VsZWN0IEFsbDwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb1JldmVyc2VTZWxlY3Rpb24oKVwiIGlkPVwiZHQtcmV2ZXJzZS1zZWxlY3Rpb25cIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlJldmVyc2UgU2VsZWN0aW9uPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj4mbmJzcDs8L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb0NvcHlUb0NsaXBib2FyZCgpXCIgaWQ9XCJ7e2lkfX1fZHRfY29weVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+Q29weSB0byBDbGlwYm9hcmQ8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9DU1ZFeHBvcnQoZmFsc2UpXCIgaWQ9XCJkdC1zYXZlLWFsbFwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+U2F2ZSBBbGwgYXMgQ1NWPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvQ1NWRXhwb3J0KHRydWUpXCIgaWQ9XCJkdC1zYXZlLXNlbGVjdGVkXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5TYXZlIFNlbGVjdGVkIGFzIENTVjwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwib3Blbk9wdGlvbnNEaWFsb2coKVwiIGlkPVwiZHQtb3B0aW9uc1wiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+T3B0aW9ucy4uLjwvYT48L2xpPlxcbiAgIDwvdWw+XFxuIDwvZGl2Plxcblxcbjx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjbGFzcz1cImRpc3BsYXkgYmtyXCIgYm9yZGVyPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHdpZHRoPVwiMTAlXCIgaWQ9XCJ7e2lkfX1cIj48L3RhYmxlPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpOyIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBiay5Db250cm9sUGFuZWxcbiAqIC0gVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgJ2NvbnRyb2wgcGFuZWwnIHNlY3Rpb24gb2YgYmVha2VyXG4gKiAtIEluIHRoZSBjb250cm9sIHBhbmVsLCB1c2VycyBnZXQgYSBsaXN0IG9mIG9wZW5lZCBzZXNzaW9ucyBhbmQgaXMgYWJsZSB0b1xuICogKHJlKW9wZW4gb25lIGluIGJrQXBwLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb250cm9sUGFuZWwnLCBbXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsuY29yZScsXG4gICAgJ2JrLnNlc3Npb24nLFxuICAgICdiay5tZW51UGx1Z2luTWFuYWdlcicsXG4gICAgJ2JrLnJlY2VudE1lbnUnLFxuICAgICdiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXInXSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb250cm9sUGFuZWwnKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvbnRyb2xQYW5lbCcsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtDb3JlTWFuYWdlciwgYmtTZXNzaW9uLCBia01lbnVQbHVnaW5NYW5hZ2VyLCBia1RyYWNrKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wiY29udHJvbHBhbmVsL2NvbnRyb2xwYW5lbFwiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJCZWFrZXJcIjtcbiAgICAgICAgdmFyIF9pbXBsID0ge1xuICAgICAgICAgIG5hbWU6IFwiYmtDb250cm9sQXBwXCIsXG4gICAgICAgICAgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBia0NvcmVNYW5hZ2VyLnNldEJrQXBwSW1wbChfaW1wbCk7XG5cbiAgICAgICAgJHNjb3BlLmdvdG9Db250cm9sUGFuZWwgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChia1V0aWxzLmlzTWlkZGxlQ2xpY2soZXZlbnQpKSB7XG4gICAgICAgICAgICB3aW5kb3cub3BlbihcIi4vXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc2V0dXAgbWVudXNcbiAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5jbGVhcigpO1xuICAgICAgICBpZiAod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KCcuLi9iZWFrZXIvcmVzdC91dGlsL2dldENvbnRyb2xQYW5lbE1lbnVQbHVnaW5zJylcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWVudVVybHMpIHtcbiAgICAgICAgICAgICAgICBtZW51VXJscy5mb3JFYWNoKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5sb2FkTWVudVBsdWdpbih1cmwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWVudWVzID0gd2luZG93LmJlYWtlci5nZXRDb250cm9sTWVudUl0ZW1zKCk7XG4gICAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5hdHRhY2hNZW51cyhtZW51ZXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuZ2V0TWVudXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGFjdGlvbnMgZm9yIFVJXG4gICAgICAgICRzY29wZS5uZXdOb3RlYm9vayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIubmV3U2Vzc2lvbihmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5uZXdFbXB0eU5vdGVib29rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5uZXdTZXNzaW9uKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUub3BlblR1dG9yaWFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5vcGVuTm90ZWJvb2soXCJjb25maWcvdHV0b3JpYWwuYmtyXCIsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYXNrIGZvciB0cmFja2luZyBwZXJtaXNzaW9uXG4gICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKCh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpICYmIGJrVHJhY2suaXNOZWVkUGVybWlzc2lvbigpKSB7XG4gICAgICAgICAgYmtVdGlscy5odHRwR2V0KFwiLi4vYmVha2VyL3Jlc3QvdXRpbC9pc0FsbG93QW5vbnltb3VzVHJhY2tpbmdcIikudGhlbihmdW5jdGlvbihhbGxvdykge1xuICAgICAgICAgICAgc3dpdGNoIChhbGxvdy5kYXRhKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJ0cnVlXCI6XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJmYWxzZVwiOlxuICAgICAgICAgICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LmJlYWtlciA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5iZWFrZXIuaXNFbWJlZGRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaChcImlzQWxsb3dBbm9ueW1vdXNUcmFja2luZ1wiLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGFsbG93ID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYWxsb3cgPSBcInRydWVcIjtcbiAgICAgICAgICAgICAgICBia1RyYWNrLmVuYWJsZSgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGFsbG93ID0gXCJmYWxzZVwiO1xuICAgICAgICAgICAgICAgIGJrVHJhY2suZGlzYWJsZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJrVXRpbHMuaHR0cFBvc3QoXCIuLi9iZWFrZXIvcmVzdC91dGlsL3NldEFsbG93QW5vbnltb3VzVHJhY2tpbmdcIiwgeyBhbGxvdzogYWxsb3cgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnNob3dXaGF0V2VMb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93TW9kYWxEaWFsb2coXG4gICAgICAgICAgICBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgSlNUWydjb250cm9scGFuZWwvd2hhdF93ZV9sb2cnXSgpXG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuXHR2YXIga2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLnNoaWZ0S2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ3RybCArIFNoaWZ0ICsgblxuXHQgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3Tm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0pO1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH0gZWxzZSBpZiAoZS5jdHJsS2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ3RybCArIG5cblx0ICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld0VtcHR5Tm90ZWJvb2soKTtcbiAgICAgICAgICAgICB9KTtcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmIGUuc2hpZnRLZXkgJiYgKGUud2hpY2ggPT09IDc4KSkgeyAvLyBDbWQgKyBTaGlmdCArIG5cblx0ICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld05vdGVib29rKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmIChlLndoaWNoID09PSA3OCkpIHsgLy8gQ21kICsgblxuICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3RW1wdHlOb3RlYm9vaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHR9XG5cdGNvbnNvbGUubG9nKCdpbnN0YWxsaW5nIGtleWRvd25IYW5kbGVyJyk7XG5cdCQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG5cblx0dmFyIG9uRGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgJChkb2N1bWVudCkudW5iaW5kKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuXHR9XG5cdCRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBvbkRlc3Ryb3kpO1xuXG4gICAgICAgIC8vIHNlc3Npb25zIGxpc3QgVUlcbiAgICAgICAgJHNjb3BlLnNlc3Npb25zID0gbnVsbDtcbiAgICAgICAgLy8gZ2V0IGxpc3Qgb2Ygb3BlbmVkIHNlc3Npb25zXG4gICAgICAgICRzY29wZS5yZWxvYWRTZXNzaW9uc0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia1Nlc3Npb24uZ2V0U2Vzc2lvbnMoKS50aGVuKGZ1bmN0aW9uKHNlc3Npb25zKSB7XG4gICAgICAgICAgICAkc2NvcGUuc2Vzc2lvbnMgPSBfKHNlc3Npb25zKS5tYXAoZnVuY3Rpb24oc2Vzc2lvbiwgc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIHNlc3Npb24uaWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5yZWxvYWRTZXNzaW9uc0xpc3QoKTtcbiAgICAgICAgJHNjb3BlLmlzU2Vzc2lvbnNMaXN0RW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gXy5pc0VtcHR5KCRzY29wZS5zZXNzaW9ucyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrLkNvbnRyb2xQYW5lbFxuICogLSBUaGlzIGlzIHRoZSBtb2R1bGUgZm9yIHRoZSAnY29udHJvbCBwYW5lbCcgc2VjdGlvbiBvZiBiZWFrZXJcbiAqIC0gSW4gdGhlIGNvbnRyb2wgcGFuZWwsIHVzZXJzIGdldCBhIGxpc3Qgb2Ygb3BlbmVkIHNlc3Npb25zIGFuZCBpcyBhYmxlIHRvXG4gKiAocmUpb3BlbiBvbmUgaW4gYmtBcHAuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbnRyb2xQYW5lbCcpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29udHJvbFBhbmVsU2Vzc2lvbkl0ZW0nLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsIGJrU2Vzc2lvbiwgYmtDb3JlTWFuYWdlciwgYmtSZWNlbnRNZW51LCBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnY29udHJvbHBhbmVsL3RhYmxlJ10sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLm9wZW4gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5vcGVuU2Vzc2lvbihzZXNzaW9uLmlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgIHZhciBmb3JtYXQgPSBzZXNzaW9uLmZvcm1hdDtcbiAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9IGFuZ3VsYXIuZnJvbUpzb24oc2Vzc2lvbi5ub3RlYm9va01vZGVsSnNvbik7XG4gICAgICAgICAgdmFyIGVkaXRlZCA9IHNlc3Npb24uZWRpdGVkO1xuICAgICAgICAgIHZhciBjbG9zZVNlc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmNyZWF0ZUV2YWx1YXRvclRoZW5FeGl0KG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb24uY2xvc2Uoc2Vzc2lvbi5pZCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLnJlbG9hZFNlc3Npb25zTGlzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoIWVkaXRlZCkge1xuICAgICAgICAgICAgLy8gY2xvc2Ugc2Vzc2lvblxuICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGFzayBpZiB1c2VyIHdhbnQgdG8gc2F2ZSBmaXJzdFxuICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIkRvIHlvdSB3YW50IHRvIHNhdmUgW1wiICsgJHNjb3BlLmdldENhcHRpb24oc2Vzc2lvbikgKyBcIl0/XCIsXG4gICAgICAgICAgICAgICAgXCJDb25maXJtIGNsb3NlXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IC8vIHllc1xuICAgICAgICAgICAgICAgICAgLy8gc2F2ZSBzZXNzaW9uXG4gICAgICAgICAgICAgICAgICB2YXIgc2F2ZVNlc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGVib29rTW9kZWxBc1N0cmluZyA9IGJrVXRpbHMudG9QcmV0dHlKc29uKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShzZXNzaW9uLm5vdGVib29rVXJpKSAmJiAhc2Vzc2lvbi5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcihzZXNzaW9uLnVyaVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlU2F2ZXIuc2F2ZShzZXNzaW9uLm5vdGVib29rVXJpLCBub3RlYm9va01vZGVsQXNTdHJpbmcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXIoKS50aGVuKGZ1bmN0aW9uKHBhdGhJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhdGhJbmZvLnVyaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdXNlOiBcIlNhdmUgY2FuY2VsbGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIocGF0aEluZm8udXJpVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTYXZlci5zYXZlKHBhdGhJbmZvLnVyaSwgbm90ZWJvb2tNb2RlbEFzU3RyaW5nKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBia1JlY2VudE1lbnUucmVjb3JkUmVjZW50RG9jdW1lbnQoYW5ndWxhci50b0pzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiBwYXRoSW5mby51cmksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwYXRoSW5mby51cmlUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBfLmlzRW1wdHkoZm9ybWF0KSA/IFwiXCIgOiBmb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1c2U6IFwiZXJyb3Igc2F2aW5nIHRvIGZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHZhciBzYXZpbmdGYWlsZWRIYW5kbGVyID0gZnVuY3Rpb24oaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5jYXVzZSA9PT0gXCJTYXZlIGNhbmNlbGxlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHNhdmluZyBjYW5jZWxsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzFCdXR0b25Nb2RhbChpbmZvLmVycm9yLCBpbmZvLmNhdXNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHNhdmVTZXNzaW9uKCkudGhlbihjbG9zZVNlc3Npb24sIHNhdmluZ0ZhaWxlZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IC8vIG5vXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIHdpdGhvdXQgc2F2aW5nXCIpO1xuICAgICAgICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgLy8gY2FuY2VsXG4gICAgICAgICAgICAgICAgICAvLyBuby1vcFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJTYXZlXCIsXG4gICAgICAgICAgICAgICAgXCJEb24ndCBTYXZlXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRDYXB0aW9uID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgIHZhciB1cmwgPSBzZXNzaW9uLm5vdGVib29rVXJpO1xuICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJOZXcgTm90ZWJvb2tcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHVybFt1cmwubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5ub3RlYm9va1VyaTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyXG4gKiBia0NlbGxNZW51UGx1Z2luTWFuYWdlciBsb2FkIGFuZCBtYW5hZ2VzIGxvYWRlZCBjZWxsIG1lbnUgcGx1Z2lucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJywgW1xuICAgICdiay51dGlscycsXG4gICAgJ2JrLmhlbHBlcicgIC8vIFRoaXMgaXMgb25seSBmb3IgZW5zdXJpbmcgdGhhdCB3aW5kb3cuYmtIZWxwZXIgaXMgc2V0LCBkb24ndCB1c2UgYmtIZWxwZXIgZGlyZWN0bHlcbiAgXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdia0NlbGxNZW51UGx1Z2luTWFuYWdlcicsIGZ1bmN0aW9uKGJrVXRpbHMpIHtcbiAgICAvLyBsb2FkZWQgcGx1Z2luc1xuICAgIHZhciBfY2VsbE1lbnVQbHVnaW5zID0ge307XG5cbiAgICB2YXIgYWRkUGx1Z2luID0gZnVuY3Rpb24oY2VsbFR5cGUsIGl0ZW1HZXR0ZXIpIHtcbiAgICAgIGlmICghX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV0pIHtcbiAgICAgICAgX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIF9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdLnB1c2goaXRlbUdldHRlcik7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZm9yICh2YXIgbWVtYmVyIGluIF9jZWxsTWVudVBsdWdpbnMpIHtcbiAgICAgICAgICBkZWxldGUgX2NlbGxNZW51UGx1Z2luc1ttZW1iZXJdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoJy4uL2JlYWtlci9yZXN0L3V0aWwvZ2V0Q2VsbE1lbnVQbHVnaW5zJylcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWVudVVybHMpIHtcbiAgICAgICAgICAgICAgICBtZW51VXJscy5mb3JFYWNoKHNlbGYubG9hZFBsdWdpbik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtbCA9IHdpbmRvdy5iZWFrZXIuZ2V0Q2VsbE1lbnVMaXN0KCk7XG4gICAgICAgICAgaWYgKF8uaXNBcnJheShtbCkpIHtcbiAgICAgICAgICAgIHZhciBpOyAgICAgIFxuICAgICAgICAgICAgZm9yKGk9MDsgaTxtbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoXy5pc0FycmF5KG1sW2ldLmNlbGxUeXBlKSkge1xuICAgICAgICAgICAgICAgIF8obWxbaV0uY2VsbFR5cGUpLmVhY2goZnVuY3Rpb24oY1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgIGFkZFBsdWdpbihjVHlwZSwgbWxbaV0ucGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRQbHVnaW4obWxbaV0uY2VsbFR5cGUsIG1sW2ldLnBsdWdpbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZSh1cmwpLnRoZW4oZnVuY3Rpb24oZXgpIHtcbiAgICAgICAgICBpZiAoXy5pc0FycmF5KGV4LmNlbGxUeXBlKSkge1xuICAgICAgICAgICAgXyhleC5jZWxsVHlwZSkuZWFjaChmdW5jdGlvbihjVHlwZSkge1xuICAgICAgICAgICAgICBhZGRQbHVnaW4oY1R5cGUsIGV4LnBsdWdpbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkUGx1Z2luKGV4LmNlbGxUeXBlLCBleC5wbHVnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZXgucGx1Z2luO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRQbHVnaW46IGZ1bmN0aW9uKGNlbGxUeXBlKSB7XG4gICAgICAgIHJldHVybiBfY2VsbE1lbnVQbHVnaW5zW2NlbGxUeXBlXTtcbiAgICAgIH0sXG4gICAgICBnZXRNZW51SXRlbXM6IGZ1bmN0aW9uKGNlbGxUeXBlLCBzY29wZSkge1xuICAgICAgICB2YXIgbWVudUl0ZW1HZXR0ZXJzID0gX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV07XG4gICAgICAgIHZhciBuZXdJdGVtcyA9IFtdO1xuICAgICAgICBfKG1lbnVJdGVtR2V0dGVycykuZWFjaChmdW5jdGlvbihnZXR0ZXIpIHtcbiAgICAgICAgICB2YXIgaXRlbXMgPSBnZXR0ZXIoc2NvcGUpO1xuICAgICAgICAgIF8oaXRlbXMpLmVhY2goZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgIG5ld0l0ZW1zLnB1c2goaXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvcmVcbiAqIEhvbGRzIHRoZSBjb3JlIG9mIGJlYWtlciB1dGlsaXRpZXMuIEl0IHdyYXBzIG9mIGxvd2VyIGxldmVsIHV0aWxpdGllcyB0aGF0IGNvbWUgZnJvbSBvdGhlclxuICogbW9kdWxlcy5cbiAqIFRoZSB1c2VyIGZhY2luZyBkaXJlY3RpdmVzIGFsc28gdXNlIHRoZSBjb3JlIGFzIGEgY29tbXVuaWNhdGlvbi9leGNoYW5nZSBsYXllci5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29yZScsIFtcbiAgICAndWkuYm9vdHN0cmFwJyxcbiAgICAndWkua2V5cHJlc3MnLFxuICAgICdiay5jb21tb25VaScsXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsucmVjZW50TWVudScsXG4gICAgJ2JrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsXG4gICAgJ2JrLnRyZWVWaWV3J1xuICBdKTtcblxuICAvKipcbiAgICogYmtDb3JlTWFuYWdlclxuICAgKiAtIHRoaXMgYWN0cyBhcyB0aGUgZ2xvYmFsIHNwYWNlIGZvciBhbGwgdmlldyBtYW5hZ2VycyB0byB1c2UgaXQgYXMgdGhlIGNvbW11bmljYXRpb24gY2hhbm5lbFxuICAgKiAtIGJrVXRpbHMgc2hvdWxkIGJlIGNvbnNpZGVyICdwcml2YXRlJyB0byBiZWFrZXIsIGV4dGVybmFsIGNvZGUgc2hvdWxkIGRlcGVuZCBvbiBia0hlbHBlclxuICAgKiAgICAgaW5zdGVhZFxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrQ29yZU1hbmFnZXInLCBmdW5jdGlvbihcbiAgICAgICRtb2RhbCxcbiAgICAgICRyb290U2NvcGUsXG4gICAgICAkZG9jdW1lbnQsXG4gICAgICAkbG9jYXRpb24sXG4gICAgICAkc2Vzc2lvblN0b3JhZ2UsXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtSZWNlbnRNZW51LFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBtb2RhbERpYWxvZ09wKSB7XG5cbiAgICB2YXIgRmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3kgPSBmdW5jdGlvbiAoKXtcbiAgICAgIHZhciBuZXdTdHJhdGVneSA9IHRoaXM7XG4gICAgICBuZXdTdHJhdGVneS5pbnB1dCA9IFwiXCI7XG4gICAgICBuZXdTdHJhdGVneS5nZXRSZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ld1N0cmF0ZWd5LmlucHV0O1xuICAgICAgfTtcbiAgICAgIG5ld1N0cmF0ZWd5LmNsb3NlID0gZnVuY3Rpb24oZXYsIGNsb3NlRnVuYykge1xuICAgICAgICBpZiAoZXYud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgY2xvc2VGdW5jKHRoaXMuZ2V0UmVzdWx0KCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbmV3U3RyYXRlZ3kudHJlZVZpZXdmcyA9IHsgLy8gZmlsZSBzZXJ2aWNlXG4gICAgICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbihiYXNlUGF0aCwgb3BlbkZvbGRlcnMpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgcGF0aHMgPSBbYmFzZVBhdGhdO1xuXG4gICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IHRydWU7XG5cbiAgICAgICAgICBpZiAob3BlbkZvbGRlcnMpIHtcbiAgICAgICAgICAgIHZhciBwYXRocyA9IFtwYXRoc10uY29uY2F0KG9wZW5Gb2xkZXJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5odHRwUG9zdChcIi4uL2JlYWtlci9yZXN0L2ZpbGUtaW8vZ2V0RGVjb3JhdGVkQ2hpbGRyZW5cIiwge1xuICAgICAgICAgICAgb3BlbkZvbGRlcnM6IHBhdGhzLmpvaW4oJywnKVxuICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICAgIHNlbGYuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGxvYWRpbmcgY2hpbGRyZW5cIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbGxJbnB1dDogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgIG5ld1N0cmF0ZWd5LmlucHV0ID0gcGF0aDtcbiAgICAgICAgfSxcbiAgICAgICAgb3BlbjogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgIHRoaXMuZmlsbElucHV0KHBhdGgpO1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnbW9kYWwuc3VibWl0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldE9yZGVyQnk6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJCeSA9IG9wdGlvbnMub3JkZXJCeTtcbiAgICAgICAgICAkcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJSZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPcmRlckJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyQnkgfHwgJ3VyaSc7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yZGVyUmV2ZXJzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEhJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyUmV2ZXJzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJldHR5T3JkZXJCeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHByZXR0eU5hbWVzID0ge1xuICAgICAgICAgICAgdXJpOiAnTmFtZScsXG4gICAgICAgICAgICBtb2RpZmllZDogJ0RhdGUgTW9kaWZpZWQnXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHByZXR0eU5hbWVzWyRyb290U2NvcGUuZnNQcmVmcy5vcmRlckJ5IHx8ICd1cmknXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd1NwaW5uZXI6IGZhbHNlLFxuICAgICAgICBhcHBseUV4dEZpbHRlcjogdHJ1ZSxcbiAgICAgICAgZXh0RmlsdGVyOiBbJ2JrciddLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgdmFyIGZzID0gbmV3U3RyYXRlZ3kudHJlZVZpZXdmcztcbiAgICAgICAgICBpZiAoIWZzLmFwcGx5RXh0RmlsdGVyIHx8IF8uaXNFbXB0eShmcy5leHRGaWx0ZXIpIHx8IGNoaWxkLnR5cGUgPT09IFwiZGlyZWN0b3J5XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXyhmcy5leHRGaWx0ZXIpLmFueShmdW5jdGlvbihleHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF8uc3RyaW5nLmVuZHNXaXRoKGNoaWxkLnVyaSwgZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8gaW1wb3J0ZXJzIGFyZSByZXNwb25zaWJsZSBmb3IgaW1wb3J0aW5nIHZhcmlvdXMgZm9ybWF0cyBpbnRvIGJrclxuICAgIC8vIGltcG9ydGVyIGltcGwgbXVzdCBkZWZpbmUgYW4gJ2ltcG9ydCcgbWV0aG9kXG4gICAgdmFyIF9pbXBvcnRlcnMgPSB7fTtcbiAgICB2YXIgRk9STUFUX0JLUiA9IFwiYmtyXCI7XG4gICAgX2ltcG9ydGVyc1tGT1JNQVRfQktSXSA9IHtcbiAgICAgIGltcG9ydDogZnVuY3Rpb24obm90ZWJvb2tKc29uKSB7XG4gICAgICAgIHZhciBub3RlYm9va01vZGVsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia1V0aWxzLmZyb21QcmV0dHlKc29uKG5vdGVib29rSnNvbik7XG4gICAgICAgICAgLy8gVE9ETywgdG8gYmUgcmVtb3ZlZC4gQWRkcmVzc2luZyBsb2FkaW5nIGEgY29ycnVwdGVkIG5vdGVib29rLlxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG5vdGVib29rTW9kZWwpKSB7XG4gICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtVdGlscy5mcm9tUHJldHR5SnNvbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgIGJrVXRpbHMubG9nKFwiY29ycnVwdGVkLW5vdGVib29rXCIsIHsgbm90ZWJvb2tVcmk6IGVuaGFuY2VkTm90ZWJvb2tVcmkgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhpcyBpcyBub3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2sgSlNPTlwiKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKG5vdGVib29rSnNvbik7XG4gICAgICAgICAgdGhyb3cgXCJOb3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2tcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm90ZWJvb2tNb2RlbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIExPQ0FUSU9OX0ZJTEVTWVMgPSBcImZpbGVcIjtcbiAgICB2YXIgTE9DQVRJT05fSFRUUCA9IFwiaHR0cFwiO1xuICAgIHZhciBMT0NBVElPTl9BSkFYID0gXCJhamF4XCI7XG5cbiAgICAvLyBmaWxlTG9hZGVycyBhcmUgcmVzcG9uc2libGUgZm9yIGxvYWRpbmcgZmlsZXMgYW5kIG91dHB1dCB0aGUgZmlsZSBjb250ZW50IGFzIHN0cmluZ1xuICAgIC8vIGZpbGVMb2FkZXIgaW1wbCBtdXN0IGRlZmluZSBhbiAnbG9hZCcgbWV0aG9kIHdoaWNoIHJldHVybnMgYSB0aGVuLWFibGVcbiAgICB2YXIgX2ZpbGVMb2FkZXJzID0ge307XG4gICAgX2ZpbGVMb2FkZXJzW0xPQ0FUSU9OX0ZJTEVTWVNdID0ge1xuICAgICAgbG9hZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRGaWxlKHVyaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBfZmlsZUxvYWRlcnNbTE9DQVRJT05fSFRUUF0gPSB7XG4gICAgICBsb2FkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZEh0dHAodXJpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIF9maWxlTG9hZGVyc1tMT0NBVElPTl9BSkFYXSA9IHtcbiAgICAgIGxvYWQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkQWpheCh1cmkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBmaWxlU2F2ZXJzIGFyZSByZXNwb25zaWJsZSBmb3Igc2F2aW5nIHZhcmlvdXMgZm9ybWF0cyBpbnRvIGJrclxuICAgIC8vIGZpbGVMb2FkZXIgaW1wbCBtdXN0IGRlZmluZSBhbiAnbG9hZCcgbWV0aG9kIHdoaWNoIHJldHVybnMgYSB0aGVuLWFibGVcbiAgICB2YXIgX2ZpbGVTYXZlcnMgPSB7fTtcblxuICAgIF9maWxlU2F2ZXJzW0xPQ0FUSU9OX0ZJTEVTWVNdID0ge1xuICAgICAgc2F2ZTogZnVuY3Rpb24odXJpLCBjb250ZW50QXNTdHJpbmcsIG92ZXJ3cml0ZSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5zYXZlRmlsZSh1cmksIGNvbnRlbnRBc1N0cmluZywgb3ZlcndyaXRlKTtcbiAgICAgIH0sXG4gICAgICBzaG93RmlsZUNob29zZXI6IGZ1bmN0aW9uKGluaXRVcmkpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd0RlZmF1bHRTYXZpbmdGaWxlQ2hvb3Nlcihpbml0VXJpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX2ZpbGVTYXZlcnNbTE9DQVRJT05fQUpBWF0gPSB7XG4gICAgICBzYXZlOiBmdW5jdGlvbih1cmksIGNvbnRlbnRBc1N0cmluZykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5zYXZlQWpheCh1cmksIGNvbnRlbnRBc1N0cmluZyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBpbXBvcnRJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRpbnB1dCxcbiAgICAgICAgICBlbmRwb2ludCA9ICcuLi9iZWFrZXIvZmlsZXVwbG9hZCc7XG5cbiAgICAgIGlmICgoJGlucHV0ID0gJCgnaW5wdXQjaW1wb3J0LW5vdGVib29rJykpLmxlbmd0aCkgcmV0dXJuICRpbnB1dDtcblxuICAgICAgJGlucHV0ID0gJCgnPGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cImZpbGVcIiBpZD1cImltcG9ydC1ub3RlYm9va1wiICcgK1xuICAgICAgICAgICAgICAgICAnZGF0YS11cmw9XCInICsgZW5kcG9pbnQgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgICdzdHlsZT1cImRpc3BsYXk6IG5vbmVcIi8+JylcbiAgICAgICAgICAgICAgICAucHJlcGVuZFRvKCdib2R5Jyk7XG5cbiAgICAgICRpbnB1dC5maWxldXBsb2FkKHtcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZG9uZTogZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuaW1wb3J0Tm90ZWJvb2soZGF0YS5yZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICRpbnB1dDtcbiAgICB9O1xuXG4gICAgdmFyIGJrQ29yZU1hbmFnZXIgPSB7XG5cbiAgICAgIHNldE5vdGVib29rSW1wb3J0ZXI6IGZ1bmN0aW9uKGZvcm1hdCwgaW1wb3J0ZXIpIHtcbiAgICAgICAgX2ltcG9ydGVyc1tmb3JtYXRdID0gaW1wb3J0ZXI7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tJbXBvcnRlcjogZnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBfaW1wb3J0ZXJzW2Zvcm1hdF07XG4gICAgICB9LFxuICAgICAgc2V0RmlsZUxvYWRlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZUxvYWRlcikge1xuICAgICAgICBfZmlsZUxvYWRlcnNbdXJpVHlwZV0gPSBmaWxlTG9hZGVyO1xuICAgICAgfSxcbiAgICAgIGdldEZpbGVMb2FkZXI6IGZ1bmN0aW9uKHVyaVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9maWxlTG9hZGVyc1t1cmlUeXBlXTtcbiAgICAgIH0sXG4gICAgICBzZXRGaWxlU2F2ZXI6IGZ1bmN0aW9uKHVyaVR5cGUsIGZpbGVTYXZlcikge1xuICAgICAgICBfZmlsZVNhdmVyc1t1cmlUeXBlXSA9IGZpbGVTYXZlcjtcbiAgICAgIH0sXG4gICAgICBnZXRGaWxlU2F2ZXI6IGZ1bmN0aW9uKHVyaVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9maWxlU2F2ZXJzW3VyaVR5cGVdO1xuICAgICAgfSxcbiAgICAgIGd1ZXNzVXJpVHlwZTogZnVuY3Rpb24obm90ZWJvb2tVcmkpIHtcbiAgICAgICAgLy8gVE9ETywgbWFrZSBzbWFydGVyIGd1ZXNzXG4gICAgICAgIGlmICgvXmh0dHBzPzpcXC9cXC8vLmV4ZWMobm90ZWJvb2tVcmkpKSB7XG4gICAgICAgICAgcmV0dXJuIExPQ0FUSU9OX0hUVFA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL15hamF4OlxcL1xcLy8uZXhlYyhub3RlYm9va1VyaSkpIHtcbiAgICAgICAgICByZXR1cm4gTE9DQVRJT05fQUpBWDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gTE9DQVRJT05fRklMRVNZUztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGd1ZXNzRm9ybWF0OiBmdW5jdGlvbihub3RlYm9va1VyaSkge1xuICAgICAgICAvLyBUT0RPLCBtYWtlIHNtYXJ0ZXIgZ3Vlc3NcbiAgICAgICAgcmV0dXJuIEZPUk1BVF9CS1I7XG4gICAgICB9LFxuXG4gICAgICBfYmVha2VyUm9vdE9wOiBudWxsLFxuICAgICAgaW5pdDogZnVuY3Rpb24oYmVha2VyUm9vdE9wKSB7XG4gICAgICAgIHRoaXMuX2JlYWtlclJvb3RPcCA9IGJlYWtlclJvb3RPcDtcbiAgICAgICAgYmtSZWNlbnRNZW51LmluaXQoe1xuICAgICAgICAgIG9wZW46IGJlYWtlclJvb3RPcC5vcGVuTm90ZWJvb2tcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ290b0NvbnRyb2xQYW5lbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWFrZXJSb290T3AuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgfSxcbiAgICAgIG5ld1Nlc3Npb246IGZ1bmN0aW9uKGVtcHR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWFrZXJSb290T3AubmV3U2Vzc2lvbihlbXB0eSk7XG4gICAgICB9LFxuICAgICAgb3BlblNlc3Npb246IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmVha2VyUm9vdE9wLm9wZW5TZXNzaW9uKHNlc3Npb25JZCk7XG4gICAgICB9LFxuICAgICAgb3Blbk5vdGVib29rOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCkge1xuICAgICAgICB0aGlzLl9iZWFrZXJSb290T3Aub3Blbk5vdGVib29rKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0KTtcbiAgICAgIH0sXG4gICAgICBhZGRJbXBvcnRJbnB1dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGltcG9ydElucHV0KCk7XG4gICAgICB9LFxuICAgICAgaW1wb3J0Tm90ZWJvb2tEaWFsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpbXBvcnRJbnB1dCgpLmNsaWNrKCk7XG4gICAgICB9LFxuICAgICAgaW1wb3J0Tm90ZWJvb2s6IGZ1bmN0aW9uKG5vdGVib29rKSB7XG4gICAgICAgICRzZXNzaW9uU3RvcmFnZS5pbXBvcnRlZE5vdGVib29rID0gbm90ZWJvb2s7XG5cbiAgICAgICAgcmV0dXJuICRyb290U2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL3Nlc3Npb24vaW1wb3J0XCIpLnNlYXJjaCh7fSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXI6IGZ1bmN0aW9uKGluaXRQYXRoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBia1V0aWxzLmFsbChbYmtVdGlscy5nZXRIb21lRGlyZWN0b3J5KCksIGJrVXRpbHMuZ2V0U3RhcnRVcERpcmVjdG9yeSgpXSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICAgIHZhciBob21lRGlyID0gdmFsdWVzWzBdO1xuICAgICAgICAgIHZhciBwd2QgPSB2YWx1ZXNbMV07XG4gICAgICAgICAgdmFyIGZpbGVDaG9vc2VyU3RyYXRlZ3kgPSBzZWxmLmdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS5pbnB1dCA9IGluaXRQYXRoO1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kuZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF8uaXNFbXB0eSh0aGlzLmlucHV0KSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmlucHV0O1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ34nKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGhvbWVEaXIgKyBcIi9cIlxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLnN0cmluZy5zdGFydHNXaXRoKHJlc3VsdCwgJ34vJykpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJ34nLCBob21lRGlyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIV8uc3RyaW5nLnN0YXJ0c1dpdGgocmVzdWx0LCAnLycpICYmICFyZXN1bHQubWF0Y2goL15cXHcrOlxcXFwvKSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBwd2QgKyBcIi9cIiArIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghXy5zdHJpbmcuZW5kc1dpdGgocmVzdWx0LCAnLmJrcicpXG4gICAgICAgICAgICAgICAgJiYgIV8uc3RyaW5nLmVuZHNXaXRoKHJlc3VsdCwgJy8nKSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBcIi5ia3JcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5Lm5ld0ZvbGRlciA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSB0cnVlO1xuICAgICAgICAgICAgYmtVdGlscy5odHRwUG9zdChcIi4uL2JlYWtlci9yZXN0L2ZpbGUtaW8vY3JlYXRlRGlyZWN0b3J5XCIsIHtwYXRoOiBwYXRofSlcbiAgICAgICAgICAgICAgICAuY29tcGxldGUoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kuZ2V0U2F2ZUJ0bkRpc2FibGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5pc0VtcHR5KHRoaXMuaW5wdXQpIHx8IF8uc3RyaW5nLmVuZHNXaXRoKHRoaXMuaW5wdXQsICcvJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5LnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXIgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgZmlsZUNob29zZXJUZW1wbGF0ZSA9IEpTVFsndGVtcGxhdGUvc2F2ZW5vdGVib29rJ10oe2hvbWVkaXI6IGhvbWVEaXIsIHB3ZDogcHdkIH0pO1xuICAgICAgICAgIHZhciBmaWxlQ2hvb3NlclJlc3VsdEhhbmRsZXIgPSBmdW5jdGlvbiAoY2hvc2VuRmlsZVBhdGgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xuICAgICAgICAgICAgICB1cmk6IGNob3NlbkZpbGVQYXRoLFxuICAgICAgICAgICAgICB1cmlUeXBlOiBMT0NBVElPTl9GSUxFU1lTXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgc2VsZi5zaG93TW9kYWxEaWFsb2coXG4gICAgICAgICAgICAgIGZpbGVDaG9vc2VyUmVzdWx0SGFuZGxlcixcbiAgICAgICAgICAgICAgZmlsZUNob29zZXJUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG5cbiAgICAgIGNvZGVNaXJyb3JPcHRpb25zOiBmdW5jdGlvbihzY29wZSwgbm90ZWJvb2tDZWxsT3ApIHtcbiAgICAgICAgdmFyIGdvVXBPck1vdmVGb2N1c1VwID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBpZiAoJCgnLkNvZGVNaXJyb3ItaGludCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vY29kZWNvbXBsZXRlIGlzIHVwLCBza2lwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjbS5nZXRDdXJzb3IoKS5saW5lID09PSAwKSB7XG4gICAgICAgICAgICBtb3ZlRm9jdXNVcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZChcImdvTGluZVVwXCIpO1xuICAgICAgICAgICAgdmFyIHRvcCA9IGNtLmN1cnNvckNvb3Jkcyh0cnVlLCd3aW5kb3cnKS50b3A7XG4gICAgICAgICAgICBpZiAoIHRvcCA8IDE1MClcbiAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIHRvcC0xNTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ29Eb3duT3JNb3ZlRm9jdXNEb3duID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBpZiAoJCgnLkNvZGVNaXJyb3ItaGludCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vY29kZWNvbXBsZXRlIGlzIHVwLCBza2lwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjbS5nZXRDdXJzb3IoKS5saW5lID09PSBjbS5kb2Muc2l6ZSAtIDEpIHtcbiAgICAgICAgICAgIG1vdmVGb2N1c0Rvd24oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJnb0xpbmVEb3duXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbW92ZUZvY3VzRG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIG1vdmUgZm9jdXMgdG8gbmV4dCBjb2RlIGNlbGxcbiAgICAgICAgICB2YXIgdGhpc0NlbGxJZCA9IHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICB2YXIgbmV4dENlbGwgPSBub3RlYm9va0NlbGxPcC5nZXROZXh0KHRoaXNDZWxsSWQpO1xuICAgICAgICAgIHdoaWxlIChuZXh0Q2VsbCkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmJrTm90ZWJvb2suZ2V0Rm9jdXNhYmxlKG5leHRDZWxsLmlkKSkge1xuICAgICAgICAgICAgICBzY29wZS5ia05vdGVib29rLmdldEZvY3VzYWJsZShuZXh0Q2VsbC5pZCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXh0Q2VsbCA9IG5vdGVib29rQ2VsbE9wLmdldE5leHQobmV4dENlbGwuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbW92ZUZvY3VzVXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBtb3ZlIGZvY3VzIHRvIHByZXYgY29kZSBjZWxsXG4gICAgICAgICAgdmFyIHRoaXNDZWxsSUQgPSBzY29wZS5jZWxsbW9kZWwuaWQ7XG4gICAgICAgICAgdmFyIHByZXZDZWxsID0gbm90ZWJvb2tDZWxsT3AuZ2V0UHJldih0aGlzQ2VsbElEKTtcbiAgICAgICAgICB3aGlsZSAocHJldkNlbGwpIHtcbiAgICAgICAgICAgIHZhciB0ID0gc2NvcGUuYmtOb3RlYm9vay5nZXRGb2N1c2FibGUocHJldkNlbGwuaWQpO1xuICAgICAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICAgICAgdC5mb2N1cygpO1xuICAgICAgICAgICAgICB2YXIgdG9wID0gdC5jbS5jdXJzb3JDb29yZHModHJ1ZSwnd2luZG93JykudG9wO1xuICAgICAgICAgICAgICBpZiAoIHRvcCA8IDE1MClcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgdG9wLTE1MCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcHJldkNlbGwgPSBub3RlYm9va0NlbGxPcC5nZXRQcmV2KHByZXZDZWxsLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGV2YWx1YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuZXZhbHVhdGUoKTtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXZhbHVhdGVBbmRHb0Rvd24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5ldmFsdWF0ZSgpO1xuICAgICAgICAgIG1vdmVGb2N1c0Rvd24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWF5YmVTaG93QXV0b0NvbXBsZXRlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBpZiAoc2NvcGUuYmtOb3RlYm9vay5nZXRDTUtleU1hcE1vZGUoKSA9PT0gXCJlbWFjc1wiKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICAgICAgY20uc2V0RXh0ZW5kaW5nKCFjbS5nZXRFeHRlbmRpbmcoKSk7XG4gICAgICAgICAgICBjbS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY20uc2V0RXh0ZW5kaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QXV0b0NvbXBsZXRlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHNob3dBdXRvQ29tcGxldGUgPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIHZhciBnZXRUb2tlbiA9IGZ1bmN0aW9uKGVkaXRvciwgY3VyKSB7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yLmdldFRva2VuQXQoY3VyKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBnZXRIaW50cyA9IGZ1bmN0aW9uKGVkaXRvciwgc2hvd0hpbnRDQiwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGN1ciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGdldFRva2VuKGVkaXRvciwgY3VyKTtcbiAgICAgICAgICAgIHZhciBjdXJzb3JQb3MgPSBlZGl0b3IuaW5kZXhGcm9tUG9zKGN1cik7XG4gICAgICAgICAgICAvLyBXZSBtaWdodCB3YW50IHRoaXMgZGVmaW5lZCBieSB0aGUgcGx1Z2luLlxuICAgICAgICAgICAgdmFyIG9uUmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdHMsIG1hdGNoZWRfdGV4dCwgZG90Rml4KSB7XG4gICAgICAgICAgICAgIHZhciBzdGFydCA9IHRva2VuLnN0YXJ0O1xuICAgICAgICAgICAgICB2YXIgZW5kID0gdG9rZW4uZW5kO1xuICAgICAgICAgICAgICBpZiAoZG90Rml4ICYmIHRva2VuLnN0cmluZyA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICBzdGFydCArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChtYXRjaGVkX3RleHQpIHtcbiAgICAgICAgICAgICAgICBzdGFydCArPSAoY3VyLmNoIC0gdG9rZW4uc3RhcnQgLSBtYXRjaGVkX3RleHQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBlbmQgPSBzdGFydCArIG1hdGNoZWRfdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2hvd0hpbnRDQih7XG4gICAgICAgICAgICAgICAgbGlzdDogXy51bmlxKHJlc3VsdHMpLFxuICAgICAgICAgICAgICAgIGZyb206IENvZGVNaXJyb3IuUG9zKGN1ci5saW5lLCBzdGFydCksXG4gICAgICAgICAgICAgICAgdG86IENvZGVNaXJyb3IuUG9zKGN1ci5saW5lLCBlbmQpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLmF1dG9jb21wbGV0ZShjdXJzb3JQb3MsIG9uUmVzdWx0cyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChjbS5nZXRPcHRpb24oJ21vZGUnKSA9PT0gJ2h0bWxtaXhlZCcgfHwgY20uZ2V0T3B0aW9uKCdtb2RlJykgPT09ICdqYXZhc2NyaXB0Jykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2luZyBjb2RlIG1pcnJvclwiKTtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiYXV0b2NvbXBsZXRlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgIGNsb3NlT25VbmZvY3VzOiB0cnVlLFxuICAgICAgICAgICAgICBhbGlnbldpdGhXb3JkOiB0cnVlLFxuICAgICAgICAgICAgICBjb21wbGV0ZVNpbmdsZTogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2hvd0hpbnQoY20sIGdldEhpbnRzLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVDZWxsVXAgPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLm1vdmVVcChzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdmVDZWxsRG93biA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3AubW92ZURvd24oc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkZWxldGVDZWxsID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5kZWxldGUoc2NvcGUuY2VsbG1vZGVsLmlkLCB0cnVlKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdGFiID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgdmFyIGxlZnRMaW5lID0gY20uZ2V0UmFuZ2Uoe2xpbmU6IGN1cnNvci5saW5lLCBjaDogMH0sIGN1cnNvcik7XG4gICAgICAgICAgaWYgKGxlZnRMaW5lLm1hdGNoKC9eXFxzKiQvKSkge1xuICAgICAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJpbmRlbnRNb3JlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QXV0b0NvbXBsZXRlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmFja3NwYWNlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcihcImFuY2hvclwiKTtcbiAgICAgICAgICBpZiAoY3Vyc29yLmxpbmUgIT0gYW5jaG9yLmxpbmUgfHwgY3Vyc29yLmNoICE9IGFuY2hvci5jaCkge1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKFwiXCIsIGN1cnNvciwgYW5jaG9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGxlZnRMaW5lID0gY20uZ2V0UmFuZ2Uoe2xpbmU6IGN1cnNvci5saW5lLCBjaDogMH0sIGN1cnNvcik7XG4gICAgICAgICAgaWYgKGxlZnRMaW5lLm1hdGNoKC9eXFxzKyQvKSkge1xuICAgICAgICAgICAgY20uZGVsZXRlSCgtMSwgXCJjaGFyXCIpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGNtLmdldE9wdGlvbignaW5kZW50VW5pdCcpO1xuICAgICAgICAgICAgd2hpbGUgKChjbS5nZXRDdXJzb3IoKS5jaCAlIGluZGVudCkgIT0gMCkge1xuICAgICAgICAgICAgICBjbS5kZWxldGVIKC0xLCBcImNoYXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLmRlbGV0ZUgoLTEsIFwiY2hhclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxuICAgICAgICAgIG1hdGNoQnJhY2tldHM6IHRydWUsXG4gICAgICAgICAgZWxlY3RyaWNDaGFyczogZmFsc2UsXG4gICAgICAgICAgZXh0cmFLZXlzOiB7XG4gICAgICAgICAgICBcIlVwXCIgOiBnb1VwT3JNb3ZlRm9jdXNVcCxcbiAgICAgICAgICAgIFwiRG93blwiIDogZ29Eb3duT3JNb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJDdHJsLVNcIjogXCJzYXZlXCIsXG4gICAgICAgICAgICBcIkNtZC1TXCI6IFwic2F2ZVwiLFxuICAgICAgICAgICAgXCJBbHQtRG93blwiOiBtb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJBbHQtSlwiOiBtb3ZlRm9jdXNEb3duLFxuICAgICAgICAgICAgXCJBbHQtVXBcIjogbW92ZUZvY3VzVXAsXG4gICAgICAgICAgICBcIkFsdC1LXCI6IG1vdmVGb2N1c1VwLFxuICAgICAgICAgICAgXCJDdHJsLUVudGVyXCI6IGV2YWx1YXRlLFxuICAgICAgICAgICAgXCJDbWQtRW50ZXJcIjogZXZhbHVhdGUsXG4gICAgICAgICAgICBcIlNoaWZ0LUVudGVyXCI6IGV2YWx1YXRlQW5kR29Eb3duLFxuICAgICAgICAgICAgXCJDdHJsLVNwYWNlXCI6IG1heWJlU2hvd0F1dG9Db21wbGV0ZSxcbiAgICAgICAgICAgIFwiQ21kLVNwYWNlXCI6IHNob3dBdXRvQ29tcGxldGUsXG4gICAgICAgICAgICBcIkN0cmwtQWx0LVVwXCI6IG1vdmVDZWxsVXAsXG4gICAgICAgICAgICBcIkNtZC1BbHQtVXBcIjogbW92ZUNlbGxVcCxcbiAgICAgICAgICAgIFwiQ3RybC1BbHQtRG93blwiOiBtb3ZlQ2VsbERvd24sXG4gICAgICAgICAgICBcIkNtZC1BbHQtRG93blwiOiBtb3ZlQ2VsbERvd24sXG4gICAgICAgICAgICBcIkN0cmwtQWx0LURcIjogZGVsZXRlQ2VsbCxcbiAgICAgICAgICAgIFwiQ21kLUFsdC1EXCI6IGRlbGV0ZUNlbGwsXG4gICAgICAgICAgICBcIlRhYlwiOiB0YWIsXG4gICAgICAgICAgICBcIkJhY2tzcGFjZVwiOiBiYWNrc3BhY2UsXG4gICAgICAgICAgICBcIkN0cmwtL1wiOiBcInRvZ2dsZUNvbW1lbnRcIixcbiAgICAgICAgICAgIFwiQ21kLS9cIjogXCJ0b2dnbGVDb21tZW50XCJcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBfYmtBcHBJbXBsOiBudWxsLFxuICAgICAgc2V0QmtBcHBJbXBsOiBmdW5jdGlvbihia0FwcE9wKSB7XG4gICAgICAgIHRoaXMuX2JrQXBwSW1wbCA9IGJrQXBwT3A7XG4gICAgICB9LFxuICAgICAgZ2V0QmtBcHA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmtBcHBJbXBsO1xuICAgICAgfSxcblxuICAgICAgZ2V0UmVjZW50TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrUmVjZW50TWVudS5nZXRNZW51SXRlbXMoKTtcbiAgICAgIH0sXG5cbiAgICAgIGdldE5vdGVib29rRWxlbWVudDogZnVuY3Rpb24oY3VycmVudFNjb3BlKSB7XG4gICAgICAgIC8vIFdhbGsgdXAgdGhlIHNjb3BlIHRyZWUgYW5kIGZpbmQgdGhlIG9uZSB0aGF0IGhhcyBhY2Nlc3MgdG8gdGhlXG4gICAgICAgIC8vIG5vdGVib29rIGVsZW1lbnQgKG5vdGVib29rIGRpcmVjdGl2ZSBzY29wZSwgc3BlY2lmaWNhbGx5KVxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChjdXJyZW50U2NvcGUuZ2V0Tm90ZWJvb2tFbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rRWxlbWVudChjdXJyZW50U2NvcGUuJHBhcmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRTY29wZS5nZXROb3RlYm9va0VsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rQ2VsbE1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXI7XG4gICAgICB9LFxuICAgICAgLy8gZ2VuZXJhbFxuICAgICAgc2hvd01vZGFsRGlhbG9nOiBmdW5jdGlvbihjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHdpbmRvd0NsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICAgICAgYmFja2Ryb3BDbGljazogdHJ1ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnbW9kYWxEaWFsb2dDdHJsJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhdHRhY2hTdWJtaXRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRkb2N1bWVudC5vbigna2V5ZG93bi5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAkKCcubW9kYWwgLm1vZGFsLXN1Ym1pdCcpLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlbW92ZVN1Ym1pdExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGRvY3VtZW50Lm9mZigna2V5ZG93bi5tb2RhbCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFhYWCAtIHRlbXBsYXRlIGlzIHNvbWV0aW1lcyBhIHVybCBub3cuXG4gICAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKCdhcHAvdGVtcGxhdGUvJykgPT09IDApIHtcbiAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlVXJsID0gdGVtcGxhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kYWxEaWFsb2dPcC5zZXRTdHJhdGVneShzdHJhdGVneSk7XG4gICAgICAgIHZhciBkZCA9ICRtb2RhbC5vcGVuKG9wdGlvbnMpO1xuXG4gICAgICAgIGF0dGFjaFN1Ym1pdExpc3RlbmVyKCk7XG5cbiAgICAgICAgZGQucmVzdWx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmVtb3ZlU3VibWl0TGlzdGVuZXIoKTtcblxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlbW92ZVN1Ym1pdExpc3RlbmVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZDtcbiAgICAgIH0sXG4gICAgICBzaG93MEJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIpIHtcbiAgICAgICAgaWYgKCFtc2dIZWFkZXIpIHtcbiAgICAgICAgICBtc2dIZWFkZXIgPSBcIk9vcHMuLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9J21vZGFsLWhlYWRlcic+XCIgK1xuICAgICAgICAgICAgXCI8aDE+XCIgKyBtc2dIZWFkZXIgKyBcIjwvaDE+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J21vZGFsLWJvZHknPjxwPlwiICsgbXNnQm9keSArIFwiPC9wPjwvZGl2PlwiIDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKG51bGwsIHRlbXBsYXRlKTtcbiAgICAgIH0sXG4gICAgICBzaG93MUJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIsIGNhbGxiYWNrLCBidG5UZXh0LCBidG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiT29wcy4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIGJ0blRleHQgPSBidG5UZXh0ID8gYnRuVGV4dCA6IFwiQ2xvc2VcIjtcbiAgICAgICAgYnRuQ2xhc3MgPSBidG5DbGFzcyA/IF8uaXNBcnJheShidG5DbGFzcykgPyBidG5DbGFzcy5qb2luKCcgJykgOiBidG5DbGFzcyA6ICdidG4tcHJpbWFyeSc7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz0nbW9kYWwtaGVhZGVyJz5cIiArXG4gICAgICAgICAgICBcIjxoMT5cIiArIG1zZ0hlYWRlciArIFwiPC9oMT5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbW9kYWwtYm9keSc+PHA+XCIgKyBtc2dCb2R5ICsgXCI8L3A+PC9kaXY+XCIgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0nYnRuIFwiICsgYnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIk9LXFxcIiknPlwiICsgYnRuVGV4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKGNhbGxiYWNrLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgc2hvdzJCdXR0b25Nb2RhbDogZnVuY3Rpb24oXG4gICAgICAgICAgbXNnQm9keSxcbiAgICAgICAgICBtc2dIZWFkZXIsXG4gICAgICAgICAgb2tDQiwgY2FuY2VsQ0IsXG4gICAgICAgICAgb2tCdG5UeHQsIGNhbmNlbEJ0blR4dCxcbiAgICAgICAgICBva0J0bkNsYXNzLCBjYW5jZWxCdG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiUXVlc3Rpb24uLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgIG9rQ0IgPyBva0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgY2FuY2VsQ0IgPyBjYW5jZWxDQigpIDogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG9rQnRuVHh0ID0gb2tCdG5UeHQgPyBva0J0blR4dCA6IFwiT0tcIjtcbiAgICAgICAgY2FuY2VsQnRuVHh0ID0gY2FuY2VsQnRuVHh0ID8gY2FuY2VsQnRuVHh0IDogXCJDYW5jZWxcIjtcbiAgICAgICAgb2tCdG5DbGFzcyA9IG9rQnRuQ2xhc3MgPyBfLmlzQXJyYXkob2tCdG5DbGFzcykgPyBva0J0bkNsYXNzLmpvaW4oJyAnKSA6IG9rQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICBjYW5jZWxCdG5DbGFzcyA9IGNhbmNlbEJ0bkNsYXNzID8gXy5pc0FycmF5KGNhbmNlbEJ0bkNsYXNzKSA/IGNhbmNlbEJ0bkNsYXNzLmpvaW4oJyAnKSA6IGNhbmNlbEJ0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdZZXMgYnRuIFwiICsgb2tCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZShcXFwiT0tcXFwiKSc+XCIgKyBva0J0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdDYW5jZWwgYnRuIFwiICsgY2FuY2VsQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoKSc+XCIgKyBjYW5jZWxCdG5UeHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCI7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dNb2RhbERpYWxvZyhjbG9zZSwgdGVtcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIHNob3czQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKFxuICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlcixcbiAgICAgICAgICB5ZXNDQiwgbm9DQiwgY2FuY2VsQ0IsXG4gICAgICAgICAgeWVzQnRuVHh0LCBub0J0blR4dCwgY2FuY2VsQnRuVHh0LFxuICAgICAgICAgIHllc0J0bkNsYXNzLCBub0J0bkNsYXNzLCBjYW5jZWxCdG5DbGFzcykge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiUXVlc3Rpb24uLi5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIlllc1wiKSB7XG4gICAgICAgICAgICB5ZXNDQiA/IHllc0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIk5vXCIpIHtcbiAgICAgICAgICAgIG5vQ0IgPyBub0NCKCkgOiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGNhbmNlbFxuICAgICAgICAgICAgY2FuY2VsQ0IgPyBjYW5jZWxDQigpIDogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHllc0J0blR4dCA9IHllc0J0blR4dCA/IHllc0J0blR4dCA6IFwiWWVzXCI7XG4gICAgICAgIG5vQnRuVHh0ID0gbm9CdG5UeHQgPyBub0J0blR4dCA6IFwiTm9cIjtcbiAgICAgICAgY2FuY2VsQnRuVHh0ID0gY2FuY2VsQnRuVHh0ID8gY2FuY2VsQnRuVHh0IDogXCJDYW5jZWxcIjtcbiAgICAgICAgeWVzQnRuQ2xhc3MgPSB5ZXNCdG5DbGFzcyA/IF8uaXNBcnJheSh5ZXNCdG5DbGFzcykgPyBva0J0bkNsYXNzLmpvaW4oJyAnKSA6IHllc0J0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgbm9CdG5DbGFzcyA9IG5vQnRuQ2xhc3MgPyBfLmlzQXJyYXkobm9CdG5DbGFzcykgPyBub0J0bkNsYXNzLmpvaW4oJyAnKSA6IG5vQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICBjYW5jZWxCdG5DbGFzcyA9IGNhbmNlbEJ0bkNsYXNzID8gXy5pc0FycmF5KGNhbmNlbEJ0bkNsYXNzKSA/IGNhbmNlbEJ0bkNsYXNzLmpvaW4oJyAnKSA6IGNhbmNlbEJ0bkNsYXNzIDogJ2J0bi1kZWZhdWx0JztcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSd5ZXMgYnRuIFwiICsgeWVzQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIlllc1xcXCIpJz5cIiArIHllc0J0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdubyBidG4gXCIgKyBub0J0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKFxcXCJOb1xcXCIpJz5cIiArIG5vQnRuVHh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J2NhbmNlbCBidG4gXCIgKyBjYW5jZWxCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZSgpJz5cIiArIGNhbmNlbEJ0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKGNsb3NlLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICB9LFxuICAgICAgc2hvd0Z1bGxNb2RhbERpYWxvZzogZnVuY3Rpb24oY2FsbGJhY2ssIHRlbXBsYXRlLCBjb250cm9sbGVyLCBkc2NvcGUpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgd2luZG93Q2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICBiYWNrZHJvcENsaWNrOiB0cnVlLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsXG4gICAgICAgICAgcmVzb2x2ZTogeyBkc2NvcGU6IGZ1bmN0aW9uKCl7IHJldHVybiBkc2NvcGU7IH0gfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKCdodHRwOicpICE9PSAwKSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGQgPSAkbW9kYWwub3BlbihvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGRkLnJlc3VsdC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNob3dMYW5ndWFnZU1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgY29udHJvbGxlcjogJ3BsdWdpbk1hbmFnZXJDdHJsJyxcbiAgICAgICAgICB0ZW1wbGF0ZTogSlNUWydtYWluYXBwL2NvbXBvbmVudHMvcGx1Z2lubWFuYWdlci9wbHVnaW5tYW5hZ2VyJ10oKVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkZCA9ICRtb2RhbC5vcGVuKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZGQucmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGJrQ29yZU1hbmFnZXI7XG4gIH0pO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdtb2RhbERpYWxvZ09wJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zdHJhdGVneSA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBzZXRTdHJhdGVneTogZnVuY3Rpb24oc3RyYXRlZ3kpIHtcbiAgICAgICAgX3N0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICB9LFxuICAgICAgZ2V0U3RyYXRlZ3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3N0cmF0ZWd5O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5jb250cm9sbGVyKCdtb2RhbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRtb2RhbEluc3RhbmNlLCBtb2RhbERpYWxvZ09wKSB7XG4gICAgJHNjb3BlLmdldFN0cmF0ZWd5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbW9kYWxEaWFsb2dPcC5nZXRTdHJhdGVneSgpO1xuICAgIH07XG4gICAgJHJvb3RTY29wZS4kb24oJ21vZGFsLnN1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLmNsb3NlKCRzY29wZS5nZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKTtcbiAgICB9KTtcbiAgICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKHJlc3VsdCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERpcmVjdGl2ZSB0byBzaG93IGEgbW9kYWwgZGlhbG9nIHRoYXQgZG9lcyBmaWxlbmFtZSBpbnB1dC5cbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2ZpbGVBY3Rpb25EaWFsb2cnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHsgYWN0aW9uTmFtZTogJ0AnLCBpbnB1dElkOiAnQCcsIGNsb3NlOiAnPScgfSxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ3RlbXBsYXRlL2ZpbGVhY3Rpb25kaWFsb2cnXSgpLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuZmluZCgnaW5wdXQnKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuZGVidWdcbiAqIFRoaXMgbW9kdWxlIGlzIGZvciBkZWJ1ZyBvbmx5IGFuZCBzaG91bGQgbmV2ZXIgYmUgdXNlZCBpbiBjb2RlXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJiay5kZWJ1Z1wiLCBbXG4gICAgXCJiay5hbmd1bGFyVXRpbHNcIixcbiAgICBcImJrLm1haW5BcHBcIixcbiAgICAnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICBcImJrLmNvcmVcIixcbiAgICAnYmsuc2Vzc2lvbk1hbmFnZXInLFxuICAgIFwiYmsub3V0cHV0TG9nXCIsXG4gICAgXCJiay5yZWNlbnRNZW51XCIsXG4gICAgXCJiay5zZXNzaW9uXCIsXG4gICAgXCJiay5zaGFyZVwiLFxuICAgIFwiYmsudHJhY2tcIixcbiAgICBcImJrLnV0aWxzXCIsXG4gICAgXCJiay5jb21ldGRVdGlsc1wiLFxuICAgIFwiYmsuY29tbW9uVXRpbHNcIixcbiAgICBcImJrLm1lbnVQbHVnaW5NYW5hZ2VyXCIsXG4gICAgXCJiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXJcIixcbiAgICBcImJrLmV2YWx1YXRvck1hbmFnZXJcIixcbiAgICBcImJrLmV2YWx1YXRlSm9iTWFuYWdlclwiLFxuICAgIFwiYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyXCJcbiAgXSk7XG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtEZWJ1Z1wiLCBmdW5jdGlvbihcbiAgICAgICRpbmplY3RvciwgYW5ndWxhclV0aWxzLCBia0V2YWx1YXRlSm9iTWFuYWdlciwgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLCBia091dHB1dExvZywgYmtSZWNlbnRNZW51LCBia1Nlc3Npb24sIGJrU2hhcmUsXG4gICAgICBia1RyYWNrLCBia1V0aWxzLCBjb21ldGRVdGlscywgY29tbW9uVXRpbHMsIGJrTWVudVBsdWdpbk1hbmFnZXIsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJGluamVjdG9yOiAkaW5qZWN0b3IsXG4gICAgICBhbmd1bGFyVXRpbHM6IGFuZ3VsYXJVdGlscyxcbiAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyOiBia0V2YWx1YXRlSm9iTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyOiBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXI6IGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyOiBia0NvcmVNYW5hZ2VyLFxuICAgICAgYmtPdXRwdXRMb2c6IGJrT3V0cHV0TG9nLFxuICAgICAgYmtSZWNlbnRNZW51OiBia1JlY2VudE1lbnUsXG4gICAgICBia1Nlc3Npb246IGJrU2Vzc2lvbixcbiAgICAgIGJrU2hhcmU6IGJrU2hhcmUsXG4gICAgICBia1RyYWNrOiBia1RyYWNrLFxuICAgICAgYmtVdGlsczogYmtVdGlscyxcbiAgICAgIGNvbWV0ZFV0aWxzOiBjb21ldGRVdGlscyxcbiAgICAgIGNvbW1vblV0aWxzOiBjb21tb25VdGlscyxcbiAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXI6IGJrTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcjogYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXI6IGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyOiBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcixcbiAgICAgIGRlYnVnVUk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBia0hlbHBlci5nZXRCa05vdGVib29rVmlld01vZGVsKCkudG9nZ2xlRGVidWdnaW5nKCk7XG4gICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyJywgWydiay51dGlscyddKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2JrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyJywgZnVuY3Rpb24oYmtVdGlscywgJG1vZGFsKSB7XG4gICAgdmFyIG5hbWVUb1VybE1hcCA9IHt9O1xuICAgIHZhciBuYW1lVG9WaXN1YWxQYXJhbXMgPSB7fTtcbiAgICB2YXIgcGx1Z2lucyA9IHt9O1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbnMgPSBbXTtcblxuICAgIHZhciBldmFsdWF0b3JMb2FkUXVldWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX3F1ZXVlID0gW107XG4gICAgICB2YXIgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuXG4gICAgICB2YXIgbG9hZEV2YWx1YXRvciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJMb2FkaW5nIHBsdWdpbiBcIitldi5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZShldi51cmwsIGV2Lm5hbWUpO1xuICAgICAgfTtcbiAgICAgIHZhciBkb05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9sb2FkSW5Qcm9ncmVzcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSBfcXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKF9sb2FkSW5Qcm9ncmVzcykge1xuICAgICAgICAgIGlmIChwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy5uYW1lXSB8fCBwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy51cmxdKSB7IC8vIHBsdWdpbiBjb2RlIGFscmVhZHkgbG9hZGVkXG4gICAgICAgICAgICBpZiAocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MubmFtZV0pIHtcbiAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzLnJlc29sdmUocGx1Z2luc1tfbG9hZEluUHJvZ3Jlc3MubmFtZV0pXG4gICAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKGRvTmV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MucmVzb2x2ZShwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy51cmxdKVxuICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihkb05leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbG9hZEV2YWx1YXRvcihfbG9hZEluUHJvZ3Jlc3MpXG4gICAgICAgICAgLnRoZW4oX2xvYWRJblByb2dyZXNzLnJlc29sdmUsICBfbG9hZEluUHJvZ3Jlc3MucmVqZWN0KVxuICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJrSGVscGVyLmNsZWFyU3RhdHVzKFwiTG9hZGluZyBwbHVnaW4gXCIgKyBfbG9hZEluUHJvZ3Jlc3MubmFtZSlcbiAgICAgICAgICAgIF9sb2FkSW5Qcm9ncmVzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGRvTmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24oZXZsKSB7XG4gICAgICAgICAgX3F1ZXVlLnB1c2goZXZsKTtcbiAgICAgICAgICBia1V0aWxzLmZjYWxsKGRvTmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBnZXRLbm93bkV2YWx1YXRvclBsdWdpbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmFtZVRvVXJsTWFwO1xuICAgICAgfSxcbiAgICAgIGFkZE5hbWVUb1VybEVudHJ5OiBmdW5jdGlvbihuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgICBuYW1lVG9VcmxNYXBbbmFtZV0gPSB1cmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmFtZVRvVXJsTWFwW25hbWVdID0gdXJsLnVybDtcbiAgICAgICAgICBkZWxldGUgdXJsLnVybDtcbiAgICAgICAgICBuYW1lVG9WaXN1YWxQYXJhbXNbbmFtZV0gPSB1cmw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRWaXN1YWxQYXJhbXM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVUb1Zpc3VhbFBhcmFtc1tuYW1lXTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JGYWN0b3J5QW5kU2hlbGw6IGZ1bmN0aW9uKGV2YWx1YXRvclNldHRpbmdzKSB7XG4gICAgICAgIHZhciBuYW1lT3JVcmwgPSBldmFsdWF0b3JTZXR0aW5ncy5wbHVnaW47XG4gICAgICAgIGlmIChwbHVnaW5zW25hbWVPclVybF0pIHsgLy8gcGx1Z2luIGNvZGUgYWxyZWFkeSBsb2FkZWRcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgcGx1Z2luc1tuYW1lT3JVcmxdLmdldEV2YWx1YXRvckZhY3RvcnkoKS50aGVuKGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICAgICAgICAgIGlmIChmYWN0b3J5ICE9PSB1bmRlZmluZWQgJiYgZmFjdG9yeS5jcmVhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUoZXZhbHVhdG9yU2V0dGluZ3MpLnRoZW4oZnVuY3Rpb24oZXYpIHsgZGVmZXJyZWQucmVzb2x2ZShldik7IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwibm8gZmFjdG9yeSBmb3IgZXZhbHVhdG9yIHBsdWdpblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgdmFyIG5hbWUsIHVybDtcbiAgICAgICAgICBpZiAobmFtZVRvVXJsTWFwW25hbWVPclVybF0pIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lT3JVcmw7XG4gICAgICAgICAgICB1cmwgPSBuYW1lVG9VcmxNYXBbbmFtZU9yVXJsXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB1cmwgPSBuYW1lT3JVcmw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGxvYWRKb2IgPSB7XG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICByZXNvbHZlOiBmdW5jdGlvbihleCkge1xuICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KGV4Lm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICBwbHVnaW5zW2V4Lm5hbWVdID0gZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KG5hbWUpICYmIG5hbWUgIT09IGV4Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbnNbbmFtZV0gPSBleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4LmdldEV2YWx1YXRvckZhY3RvcnkoKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdG9yeSAhPT0gdW5kZWZpbmVkICYmIGZhY3RvcnkuY3JlYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGUoZXZhbHVhdG9yU2V0dGluZ3MpLnRoZW4oZnVuY3Rpb24oZXYpIHsgZGVmZXJyZWQucmVzb2x2ZShldik7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICRtb2RhbC5vcGVuKHtiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogSlNUWydoZWxwZXJzL3BsdWdpbi1sb2FkLWVycm9yJ10oe3BsdWdpbklkOiBuYW1lfSl9KTtcbiAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJubyBmYWN0b3J5IGZvciBldmFsdWF0b3IgcGx1Z2luXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBuZXZlciBjYWxsZWQuICBJbnN0ZWFkIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBcInRoZW5cIiBjbGF1c2UgYWJvdmUgaXMgY2FsbGVkIGJ1dCBmYWN0b3J5IGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIHVuZGVmaW5lZC4gIFVua25vd24gd2h5IFhYWC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoZXgubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGx1Z2luc1tleC5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShuYW1lKSAmJiBuYW1lICE9PSBleC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBsdWdpbnNbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc0VtcHR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGxvYWQgcGx1Z2luOiBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGxvYWQgcGx1Z2luOiBcIiArIG5hbWUgKyBcIiBhdCBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZWplY3Q6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgY2FsbGVkIGlmIHRoZSBVUkwgaXMgYmFkIG9yIHRoZXJlIGlzIGEgc3ludGF4IGVycm9yIGluIHRoZSBKUy5cbiAgICAgICAgICAgICAgICBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzKFwiRmFpbGVkIHRvIGZpbmQgcGx1Z2luIFwiK25hbWUrXCI6IFwiK2Vycik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRW1wdHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImZhaWxlZCB0byBmaW5kIHBsdWdpbjogXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJmYWlsZWQgdG8gZmluZCBwbHVnaW46IFwiICsgbmFtZSArIFwiIGF0IFwiICsgdXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGV2YWx1YXRvckxvYWRRdWV1ZS5hZGQobG9hZEpvYik7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjcmVhdGVFdmFsdWF0b3JUaGVuRXhpdDogZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIHRoZVNoZWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFdmFsdWF0b3JGYWN0b3J5QW5kU2hlbGwoc2V0dGluZ3MpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgIGlmIChldmFsdWF0b3IuZXhpdCkge1xuICAgICAgICAgICAgZXZhbHVhdG9yLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF8ocGx1Z2lucykuZmlsdGVyKGZ1bmN0aW9uKGFTaGVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFTaGVsbCAhPT0gdGhlU2hlbGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmhlbHBlclxuICogVGhlIGJrSGVscGVyIHNob3VsZCBiZSBhIHN1YnNldCBvZiBia0NvcmUgdXRpbGl0aWVzIHRoYXQgYXJlIGV4cG9zZWQgZm9yXG4gKiB1c2FnZXMgZXh0ZXJuYWwgdG8gQmVha2VyLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5oZWxwZXInLCBbJ2JrLnV0aWxzJywgJ2JrLmNvcmUnLCAnYmsuc2hhcmUnLCAnYmsuZGVidWcnXSk7XG4gIC8qKlxuICAgKiBia0hlbHBlclxuICAgKiAtIHNob3VsZCBiZSB0aGUgb25seSB0aGluZyBwbHVnaW5zIGRlcGVuZCBvbiB0byBpbnRlcmFjdCB3aXRoIGdlbmVyYWwgYmVha2VyIHN0dWZmcyAob3RoZXIgdGhhblxuICAgKiBjb25mb3JtaW5nIHRvIHRoZSBBUEkgc3BlYylcbiAgICogLSBleGNlcHQgcGx1Z2lucywgbm90aGluZyBzaG91bGQgZGVwZW5kcyBvbiBia0hlbHBlclxuICAgKiAtIHdlJ3ZlIG1hZGUgdGhpcyBnbG9iYWwuIFdlIHNob3VsZCByZXZpc2l0IHRoaXMgZGVjaXNpb24gYW5kIGZpZ3VyZSBvdXQgdGhlIGJlc3Qgd2F5IHRvIGxvYWRcbiAgICogICBwbHVnaW5zIGR5bmFtaWNhbGx5XG4gICAqIC0gaXQgbW9zdGx5IHNob3VsZCBqdXN0IGJlIGEgc3Vic2V0IG9mIGJrVXRpbFxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrSGVscGVyJywgZnVuY3Rpb24oYmtVdGlscywgYmtDb3JlTWFuYWdlciwgYmtTaGFyZSwgYmtEZWJ1Zykge1xuICAgIHZhciBnZXRDdXJyZW50QXBwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpO1xuICAgIH07XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCkge1xuICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0QmtOb3RlYm9va1dpZGdldFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJrSGVscGVyID0ge1xuICAgICAgLy8gZW5hYmxlIGRlYnVnXG4gICAgICBkZWJ1ZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5ia0RlYnVnID0gYmtEZWJ1ZztcbiAgICAgIH0sXG5cbiAgICAgIC8vIGJlYWtlciAocm9vdClcbiAgICAgIGdvdG9Db250cm9sUGFuZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICB9LFxuICAgICAgb3Blbk5vdGVib29rOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5vcGVuTm90ZWJvb2sobm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpO1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vdGVib29rRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuaW1wb3J0Tm90ZWJvb2tEaWFsb2coKTtcbiAgICAgIH0sXG4gICAgICAvLyBFbXB0eSB0cnVlIG1lYW5zIHRydWx5IGVtcHR5IG5ldyBzZXNzaW9uLlxuICAgICAgLy8gb3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCBub3RlYm9vay5cbiAgICAgIG5ld1Nlc3Npb246IGZ1bmN0aW9uKGVtcHR5KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLm5ld1Nlc3Npb24oZW1wdHkpO1xuICAgICAgfSxcblxuICAgICAgLy8gY3VycmVudCBhcHBcbiAgICAgIGdldEN1cnJlbnRBcHBOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkoZ2V0Q3VycmVudEFwcCgpLm5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlVua25vd24gQXBwXCI7XG4gICAgICB9LFxuICAgICAgaGFzU2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRTZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZ2V0U2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRTZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldFNlc3Npb25JZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0U2Vzc2lvbklkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0Tm90ZWJvb2tNb2RlbCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0Tm90ZWJvb2tNb2RlbFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0QmVha2VyT2JqZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRCZWFrZXJPYmplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEJlYWtlck9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rRWxlbWVudDogZnVuY3Rpb24oY3VycmVudFNjb3BlKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rRWxlbWVudChjdXJyZW50U2NvcGUpO1xuICAgICAgfSxcbiAgICAgIGNvbGxhcHNlQWxsU2VjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmNvbGxhcHNlQWxsU2VjdGlvbnMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmNvbGxhcHNlQWxsU2VjdGlvbnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGNvbGxhcHNlQWxsU2VjdGlvbnNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbG9zZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5jbG9zZU5vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5jbG9zZU5vdGVib29rKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBjbG9zZU5vdGVib29rXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2F2ZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zYXZlTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9vaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2F2ZU5vdGVib29rXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2F2ZU5vdGVib29rQXM6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2F2ZU5vdGVib29rQXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9va0FzKG5vdGVib29rVXJpLCB1cmlUeXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNhdmVOb3RlYm9va0FzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzQ29kZUNlbGw6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5oYXNDb2RlQ2VsbCh0b0V2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZSkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGUodG9FdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGV2YWx1YXRlXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdGVSb290OiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZVJvb3QpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlUm9vdCh0b0V2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZXZhbHVhdGVSb290XCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdGVDb2RlOiBmdW5jdGlvbihldmFsdWF0b3IsIGNvZGUpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZUNvZGUpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlQ29kZShldmFsdWF0b3IsIGNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZXZhbHVhdGVDb2RlXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yTWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRFdmFsdWF0b3JNZW51SXRlbXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvck1lbnVJdGVtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0RXZhbHVhdG9yTWVudUl0ZW1zXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9nZ2xlTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnRvZ2dsZU5vdGVib29rTG9ja2VkKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS50b2dnbGVOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgdG9nZ2xlTm90ZWJvb2tMb2NrZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5pc05vdGVib29rTG9ja2VkKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBpc05vdGVib29rTG9ja2VkXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2cpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNob3dBbm9ueW1vdXNUcmFja2luZ0RpYWxvZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvd1N0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zaG93U3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zaG93U3RhdHVzKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNob3dTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGVTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnVwZGF0ZVN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCB1cGRhdGVTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldFN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0U3RhdHVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbGVhclN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5jbGVhclN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuY2xlYXJTdGF0dXMobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgY2xlYXJTdGF0dXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaG93VHJhbnNpZW50U3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNob3dUcmFuc2llbnRTdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNob3dUcmFuc2llbnRTdGF0dXMobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2hvd1RyYW5zaWVudFN0YXR1c1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvcnMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldEV2YWx1YXRvcnNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRDb2RlQ2VsbHM6IGZ1bmN0aW9uKGZpbHRlcikge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldENvZGVDZWxscykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0Q29kZUNlbGxzKGZpbHRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRDb2RlQ2VsbHNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRDb2RlQ2VsbEJvZHk6IGZ1bmN0aW9uKG5hbWUsIGNvZGUpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEJvZHkpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsQm9keShuYW1lLGNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2V0Q29kZUNlbGxCb2R5XCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0Q29kZUNlbGxFdmFsdWF0b3I6IGZ1bmN0aW9uKG5hbWUsIGV2YWx1YXRvcikge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsRXZhbHVhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbEV2YWx1YXRvcihuYW1lLCBldmFsdWF0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2V0Q29kZUNlbGxFdmFsdWF0b3JcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRDb2RlQ2VsbFRhZ3M6IGZ1bmN0aW9uKG5hbWUsIHRhZ3MpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zZXRDb2RlQ2VsbFRhZ3MpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsVGFncyhuYW1lLCB0YWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHNldENvZGVDZWxsVGFnc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIGJrLW5vdGVib29rXG4gICAgICBzaGFyZU5vdGVib29rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suc2hhcmVBbmRPcGVuUHVibGlzaGVkKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxldGVBbGxPdXRwdXRDZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLmRlbGV0ZUFsbE91dHB1dENlbGxzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRCa05vdGVib29rVmlld01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suZ2V0Vmlld01vZGVsKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRJbnB1dENlbGxLZXlNYXBNb2RlOiBmdW5jdGlvbihrZXlNYXBNb2RlKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLnNldENNS2V5TWFwTW9kZShrZXlNYXBNb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldElucHV0Q2VsbEtleU1hcE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgaWYgKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gYmtOb3RlYm9vay5nZXRDTUtleU1hcE1vZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gbG93IGxldmVsIHV0aWxzIChia1V0aWxzKVxuICAgICAgcmVmcmVzaFJvb3RTY29wZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH0sXG4gICAgICBsb2FkSlM6IGZ1bmN0aW9uKHVybCwgc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkSlModXJsLCBzdWNjZXNzKTtcbiAgICAgIH0sXG4gICAgICBsb2FkQ1NTOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZENTUyh1cmwpO1xuICAgICAgfSxcbiAgICAgIGxvYWRMaXN0OiBmdW5jdGlvbih1cmwsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZExpc3QodXJsLCBzdWNjZXNzLCBmYWlsdXJlKTtcbiAgICAgIH0sXG4gICAgICBmaW5kVGFibGU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZmluZFRhYmxlKGVsZW0pO1xuICAgICAgfSxcbiAgICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5nZW5lcmF0ZUlkKGxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgc2VydmVyVXJsOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnNlcnZlclVybChwYXRoKTtcbiAgICAgIH0sXG4gICAgICBmaWxlVXJsOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmZpbGVVcmwocGF0aCk7XG4gICAgICB9LFxuICAgICAgaHR0cEdldDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBHZXQodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBodHRwUG9zdDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBQb3N0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgbmV3RGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgfSxcbiAgICAgIG5ld1Byb21pc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UodmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGFsbDogZnVuY3Rpb24ocHJvbWlzZXMpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuYWxsKHByb21pc2VzKTtcbiAgICAgIH0sXG4gICAgICBmY2FsbDogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5mY2FsbChmdW5jKTtcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBmdW5jdGlvbihmdW5jLCBtcykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy50aW1lb3V0KGZ1bmMsbXMpO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbFRpbWVvdXQ6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuY2FuY2VsVGltZW91dChwcm9taXNlKTtcbiAgICAgIH0sXG4gICAgICBnZXRIb21lRGlyZWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpO1xuICAgICAgfSxcbiAgICAgIHNhdmVGaWxlOiBmdW5jdGlvbihwYXRoLCBjb250ZW50QXNKc29uLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2F2ZUZpbGUocGF0aCwgY29udGVudEFzSnNvbiwgb3ZlcndyaXRlKTtcbiAgICAgIH0sXG4gICAgICBsb2FkRmlsZTogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkRmlsZShwYXRoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIHV0aWxzIChia0NvcmUpXG4gICAgICBzZXROb3RlYm9va0ltcG9ydGVyOiBmdW5jdGlvbihmb3JtYXQsIGltcG9ydGVyKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNldE5vdGVib29rSW1wb3J0ZXIoZm9ybWF0LCBpbXBvcnRlcik7XG4gICAgICB9LFxuICAgICAgc2V0RmlsZUxvYWRlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZUxvYWRlcikge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zZXRGaWxlTG9hZGVyKHVyaVR5cGUsIGZpbGVMb2FkZXIpO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVTYXZlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZVNhdmVyKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNldEZpbGVTYXZlcih1cmlUeXBlLCBmaWxlU2F2ZXIpO1xuICAgICAgfSxcbiAgICAgIHNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyKCk7XG4gICAgICB9LFxuICAgICAgZ2V0UmVjZW50TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0UmVjZW50TWVudUl0ZW1zKCk7XG4gICAgICB9LFxuICAgICAgc2hvd01vZGFsRGlhbG9nOiBmdW5jdGlvbihjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dNb2RhbERpYWxvZyhjYWxsYmFjaywgdGVtcGxhdGUsIHN0cmF0ZWd5KS5yZXN1bHQ7XG4gICAgICB9LFxuICAgICAgc2hvdzFCdXR0b25Nb2RhbDogZnVuY3Rpb24obXNnQm9keSwgbXNnSGVhZGVyLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKG1zZ0JvZHksIG1zZ0hlYWRlciwgY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIHNob3cyQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKG1zZ0JvZHksIG1zZ0hlYWRlciwgb2tDQiwgY2FuY2VsQ0IsIG9rQnRuVHh0LCBjYW5jZWxCdG5UeHQpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgb2tDQiwgY2FuY2VsQ0IsIG9rQnRuVHh0LCBjYW5jZWxCdG5UeHQpO1xuICAgICAgfSxcbiAgICAgIHNob3czQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKFxuICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgeWVzQ0IsIG5vQ0IsIGNhbmNlbENCLCB5ZXNCdG5UeHQsIG5vQnRuVHh0LCBjYW5jZWxCdG5UeHQpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgIG1zZ0JvZHksIG1zZ0hlYWRlciwgeWVzQ0IsIG5vQ0IsIGNhbmNlbENCLCB5ZXNCdG5UeHQsIG5vQnRuVHh0LCBjYW5jZWxCdG5UeHQpO1xuICAgICAgfSxcbiAgICAgIGdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3koKTtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RGaWxlOiBmdW5jdGlvbihjYWxsYmFjaywgdGl0bGUsIGV4dGVuc2lvbiwgY2xvc2VidG4pIHtcbiAgICAgICAgICB2YXIgc3RyYXRlZ3kgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTeXN0ZW1GaWxlQ2hvb3NlclN0cmF0ZWd5KCk7XG4gICAgICAgICAgc3RyYXRlZ3kudHJlZVZpZXdmcy5leHRGaWx0ZXIgPSBbIGV4dGVuc2lvbiBdO1xuICAgICAgICAgIHN0cmF0ZWd5LmV4dCA9IGV4dGVuc2lvbjtcbiAgICAgICAgICBzdHJhdGVneS50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgIHN0cmF0ZWd5LmNsb3NlYnRuID0gY2xvc2VidG47XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2V0SG9tZURpcmVjdG9yeSgpLnRoZW4oXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbihob21lRGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd01vZGFsRGlhbG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU1RbJ3RlbXBsYXRlL29wZW5ub3RlYm9vayddKHtob21lZGlyOiBob21lRGlyLCBleHRlbnNpb246IGV4dGVuc2lvbn0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ3kpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICAvLyBldmFsIHV0aWxzXG4gICAgICBsb2NhdGVQbHVnaW5TZXJ2aWNlOiBmdW5jdGlvbihpZCwgbG9jYXRvcikge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvcGx1Z2luLXNlcnZpY2VzL1wiICsgaWQpLCBsb2NhdG9yKTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JGYWN0b3J5OiBmdW5jdGlvbihzaGVsbENvbnN0cnVjdG9yUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gc2hlbGxDb25zdHJ1Y3RvclByb21pc2UudGhlbihmdW5jdGlvbihTaGVsbCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UobmV3IFNoZWxsKHNldHRpbmdzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2hvd0xhbmd1YWdlTWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dMYW5ndWFnZU1hbmFnZXIoKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIG90aGVyIEpTIHV0aWxzXG4gICAgICB1cGRhdGVEb2N1bWVudE1vZGVsRnJvbURPTTogZnVuY3Rpb24oaWQpIHtcblx0ICBmdW5jdGlvbiBjb252ZXJ0Q2FudmFzVG9JbWFnZShlbGVtKSB7XG5cdCAgICAgIGlmIChlbGVtLm5vZGVOYW1lID09IFwiQ0FOVkFTXCIpIHtcblx0XHQgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdCAgaW1nLnNyYyA9IGVsZW0udG9EYXRhVVJMKCk7XG5cdFx0ICByZXR1cm4gaW1nO1xuXHQgICAgICB9XG5cdCAgICAgIHZhciBjaGlsZE5vZGVzID0gZWxlbS5jaGlsZE5vZGVzO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHQgIHZhciByZXN1bHQgPSBjb252ZXJ0Q2FudmFzVG9JbWFnZShjaGlsZE5vZGVzW2ldKTtcblx0XHQgIGlmIChyZXN1bHQgIT0gY2hpbGROb2Rlc1tpXSkge1xuXHRcdCAgICAgIGVsZW0ucmVwbGFjZUNoaWxkKHJlc3VsdCwgY2hpbGROb2Rlc1tpXSk7XG5cdFx0ICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIGVsZW07XG5cdCAgfVxuICAgICAgICAgIC8vIDEpIGZpbmQgdGhlIGNlbGwgdGhhdCBjb250YWlucyBlbGVtXG4gICAgICAgICAgdmFyIGVsZW0gPSAkKFwiI1wiICsgaWQpLmNsb3Nlc3QoXCJiay1jZWxsXCIpO1xuICAgICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjZWxsaWQgPSBlbGVtWzBdLmdldEF0dHJpYnV0ZShcImNlbGxpZFwiKTtcbiAgICAgICAgICBpZiAoY2VsbGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFuIEh0bWwgY2VsbCBjb250YWluaW5nIHRoZSBlbGVtZW50ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGJvZHkgPSBlbGVtLmZpbmQoIFwiYmstb3V0cHV0LWRpc3BsYXlbdHlwZT0nSHRtbCddIGRpdiBkaXZcIiApO1xuICAgICAgICAgIGlmIChib2R5ID09PSB1bmRlZmluZWQgfHwgYm9keVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXHQgIC8vIDIuNSkgc2VhcmNoIGZvciBhbnkgY2FudmFzIGVsZW1lbnRzIGluIGJvZHkgYW5kIHJlcGxhY2UgZWFjaCB3aXRoIGFuIGltYWdlLlxuXHQgIGJvZHkgPSBjb252ZXJ0Q2FudmFzVG9JbWFnZShib2R5WzBdKTtcblxuICAgICAgICAgIC8vIDIpIGNvbnZlcnQgdGhhdCBwYXJ0IG9mIHRoZSBET00gdG8gYSBzdHJpbmdcbiAgICAgICAgICB2YXIgbmV3T3V0cHV0ID0gYm9keS5pbm5lckhUTUw7XG5cbiAgICAgICAgICAvLyAzKSBzZXQgdGhlIHJlc3VsdC5vYmplY3QgdG8gdGhhdCBzdHJpbmcuXG4gICAgICAgICAgdmFyIGNlbGwgPSBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5nZXRDZWxsKGNlbGxpZCk7XG4gICAgICAgICAgaWYgKGNlbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogY2Fubm90IGZpbmQgYW4gSHRtbCBjZWxsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgJ1wiICsgaWQgKyBcIicuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZXMgPSBjZWxsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlcy5pbm5lcnR5cGUgPT09IFwiSHRtbFwiKSB7XG4gICAgICAgICAgICByZXMub2JqZWN0ID0gbmV3T3V0cHV0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gYmtTaGFyZVxuICAgICAgc2hhcmU6IGJrU2hhcmUsXG5cbiAgICAgIC8vIGxhbmd1YWdlIHBsdWdpbiB1dGlsaXRpZXNcblxuICAgICAgc2V0dXBQcm9ncmVzc091dHB1dDogZnVuY3Rpb24obW9kZWxPdXRwdXQpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzT2JqID0ge1xuICAgICAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgICAgICBpbm5lcnR5cGU6IFwiUHJvZ3Jlc3NcIixcbiAgICAgICAgICAgIG9iamVjdDoge1xuICAgICAgICAgICAgICBtZXNzYWdlOiBcInN1Ym1pdHRpbmcgLi4uXCIsXG4gICAgICAgICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgIG91dHB1dGRhdGE6IFtdLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHByb2dyZXNzT2JqO1xuICAgICAgfSxcblxuICAgICAgc2V0dXBDYW5jZWxsaW5nT3V0cHV0OiBmdW5jdGlvbihtb2RlbE91dHB1dCkge1xuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0LnR5cGUgIT09IFwiQmVha2VyRGlzcGxheVwiIHx8IG1vZGVsT3V0cHV0LnJlc3VsdC5pbm5lcnR5cGUgIT09IFwiUHJvZ3Jlc3NcIilcbiAgICAgICAgICBzZXR1cFByb2dyZXNzT3V0cHV0KG1vZGVsT3V0cHV0KTtcbiAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gXCJjYW5jZWxsaW5nIC4uLlwiO1xuICAgICAgfSxcblxuICAgICAgcmVjZWl2ZUV2YWx1YXRpb25VcGRhdGU6IGZ1bmN0aW9uKG1vZGVsT3V0cHV0LCBldmFsdWF0aW9uLCBwbHVnaW5OYW1lLCBzaGVsbElkKSB7XG4gICAgICAgIHZhciBtYXhOdW1PZkxpbmVzID0gMjAwO1xuXG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQuc3RhdHVzID0gZXZhbHVhdGlvbi5zdGF0dXM7XG5cbiAgICAgICAgLy8gc2F2ZSBpbmZvcm1hdGlvbiB0byBoYW5kbGUgdXBkYXRhYmxlIHJlc3VsdHMgaW4gZGlzcGxheXNcbiAgICAgICAgbW9kZWxPdXRwdXQucGx1Z2luTmFtZSA9IHBsdWdpbk5hbWU7XG4gICAgICAgIG1vZGVsT3V0cHV0LnNoZWxsSWQgPSBzaGVsbElkO1xuXG4gICAgICAgIC8vIGFwcGVuZCB0ZXh0IG91dHB1dCAoaWYgYW55KVxuICAgICAgICBpZiAoZXZhbHVhdGlvbi5vdXRwdXRkYXRhICE9PSB1bmRlZmluZWQgJiYgZXZhbHVhdGlvbi5vdXRwdXRkYXRhLmxlbmd0aD4wKSB7XG4gICAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgICBmb3IgKGlkeD0wOyBpZHg8ZXZhbHVhdGlvbi5vdXRwdXRkYXRhLmxlbmd0aD4wOyBpZHgrKykge1xuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLnB1c2goZXZhbHVhdGlvbi5vdXRwdXRkYXRhW2lkeF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY250ID0gMDtcbiAgICAgICAgICBmb3IgKGlkeD0wOyBpZHg8bW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGNudCArPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbaWR4XS52YWx1ZS5zcGxpdCgvXFxuLykubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY250ID4gbWF4TnVtT2ZMaW5lcykge1xuICAgICAgICAgICAgY250IC09IG1heE51bU9mTGluZXM7XG4gICAgICAgICAgICB3aGlsZShjbnQgPiAwKSB7XG4gICAgICAgICAgICAgIHZhciBsID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhWzBdLnZhbHVlLnNwbGl0KC9cXG4vKS5sZW5ndGg7XG4gICAgICAgICAgICAgIGlmIChsPD1jbnQpIHtcbiAgICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEuc3BsaWNlKDAsMSk7XG4gICAgICAgICAgICAgICAgY250IC09IGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbMF0udmFsdWUuc3BsaXQoL1xcbi8pO1xuICAgICAgICAgICAgICAgIGEuc3BsaWNlKDAsY250KTtcbiAgICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbMF0udmFsdWUgPSBhLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgIGNudCA9IDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IHRoaXMgc2hvdWxkIG5vdCBoYXBwZW4gLSB5b3VyIHBsdWdpbiBqYXZhc2NyaXB0IGlzIGJyb2tlbiFcIik7XG4gICAgICAgICAgc2V0dXBQcm9ncmVzc091dHB1dChtb2RlbE91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3cgdXBkYXRlIHBheWxvYWQgKGlmIG5lZWRlZClcbiAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCA9IGV2YWx1YXRpb24ucGF5bG9hZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IHVuZGVmaW5lZCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnR5cGUgPT09IFwiUmVzdWx0c1wiKSB7XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQub3V0cHV0ZGF0YSA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmFsdWF0aW9uLnN0YXR1cyA9PT0gXCJGSU5JU0hFRFwiKSB7XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkICE9PSB1bmRlZmluZWQgJiYgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnR5cGUgPT09IFwiUmVzdWx0c1wiKVxuICAgICAgICAgICAgICBldmFsdWF0aW9uLnBheWxvYWQgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQucGF5bG9hZDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb2RlbE91dHB1dC5lbGFwc2VkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5zdGFydFRpbWU7XG5cbiAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc2luZ2xlIG91dHB1dCBkaXNwbGF5XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSBldmFsdWF0aW9uLnBheWxvYWQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdyYXBwZXIgZGlzcGxheSB3aXRoIHN0YW5kYXJkIG91dHB1dCBhbmQgZXJyb3JcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHsgdHlwZSA6IFwiUmVzdWx0c1wiLCBvdXRwdXRkYXRhIDogbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLCBwYXlsb2FkIDogZXZhbHVhdGlvbi5wYXlsb2FkIH07XG4gICAgICAgICAgICAvLyBidWlsZCBvdXRwdXQgY29udGFpbmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChldmFsdWF0aW9uLmpzb25yZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LmRhdGFyZXN1bHQgPSBldmFsdWF0aW9uLmpzb25yZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRVJST1JcIikge1xuICAgICAgICAgIGlmIChldmFsdWF0aW9uLnBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC50eXBlID09PSBcIlJlc3VsdHNcIilcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnBheWxvYWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGV2YWx1YXRpb24ucGF5bG9hZCA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCAhPT0gdW5kZWZpbmVkICYmICQudHlwZShldmFsdWF0aW9uLnBheWxvYWQpPT0nc3RyaW5nJykge1xuICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gZXZhbHVhdGlvbi5wYXlsb2FkLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbW9kZWxPdXRwdXQuZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Quc3RhcnRUaW1lO1xuXG4gICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIHNpbmdsZSBvdXRwdXQgZGlzcGxheVxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0ID0ge1xuICAgICAgICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgICAgICAgaW5uZXJ0eXBlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgIG9iamVjdDogZXZhbHVhdGlvbi5wYXlsb2FkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3cmFwcGVyIGRpc3BsYXkgd2l0aCBzdGFuZGFyZCBvdXRwdXQgYW5kIGVycm9yXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSB7IHR5cGUgOiBcIlJlc3VsdHNcIiwgb3V0cHV0ZGF0YSA6IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YSwgcGF5bG9hZCA6IHsgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsIGlubmVydHlwZTogXCJFcnJvclwiLCBvYmplY3Q6IGV2YWx1YXRpb24ucGF5bG9hZCB9IH07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIlJVTk5JTkdcIikge1xuICAgICAgICAgIGlmIChldmFsdWF0aW9uLm1lc3NhZ2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QubWVzc2FnZSAgICAgPSBcInJ1bm5pbmcuLi5cIjtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgICAgID0gZXZhbHVhdGlvbi5tZXNzYWdlO1xuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgICA9IGV2YWx1YXRpb24ucHJvZ3Jlc3NCYXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIkZJTklTSEVEXCIgfHwgZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRVJST1JcIik7XG4gICAgICB9LFxuICAgICAgZ2V0VXBkYXRlU2VydmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21ldGRVdGlsID0ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uczogeyB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24ocGx1Z2luTmFtZSwgc2VydmljZUJhc2UpIHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQgPSBuZXcgJC5Db21ldGQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC5pbml0KGJrVXRpbHMuc2VydmVyVXJsKHNlcnZpY2VCYXNlICsgXCIvY29tZXRkL1wiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5obGlzdGVuZXIgPSB0aGlzLmNvbWV0ZC5hZGRMaXN0ZW5lcignL21ldGEvaGFuZHNoYWtlJywgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5ia0RlYnVnKSBjb25zb2xlLmxvZyhwbHVnaW5OYW1lKycvbWV0YS9oYW5kc2hha2UnKTtcbiAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21ldGQuYmF0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGs7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChrIGluIE9iamVjdC5rZXlzKHRoaXMuc3Vic2NyaXB0aW9ucykpXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW2tdID0gdGhpcy5jb21ldGQucmVzdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW2tdKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQucmVtb3ZlTGlzdGVuZXIodGhpcy5obGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIHZhciBrO1xuICAgICAgICAgICAgICAgIGZvciAoayBpbiBPYmplY3Qua2V5cyh0aGlzLnN1YnNjcmlwdGlvbnMpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLnVuc3Vic2NyaWJlKHRoaXMuc3Vic2NyaXB0aW9uc1trXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmNvbWV0ZCA9IG51bGw7XG4gICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHsgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHVwZGF0ZV9pZCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgaWYgKCF1cGRhdGVfaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAod2luZG93LmJrRGVidWcpIGNvbnNvbGUubG9nKCdzdWJzY3JpYmUgdG8gJyt1cGRhdGVfaWQpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC51bnN1YnNjcmliZSh0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBjYiA9IGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldC5kYXRhKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgdmFyIHMgPSB0aGlzLmNvbWV0ZC5zdWJzY3JpYmUoJy9vYmplY3RfdXBkYXRlLycgKyB1cGRhdGVfaWQsIGNiKTtcbiAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gPSBzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbih1cGRhdGVfaWQpIHtcbiAgICAgICAgICAgICAgaWYgKCF1cGRhdGVfaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICBpZiAod2luZG93LmJrRGVidWcpIGNvbnNvbGUubG9nKCd1bnN1YnNjcmliZSBmcm9tICcrdXBkYXRlX2lkKTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ldGQudW5zdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzc3Vic2NyaWJlZDogZnVuY3Rpb24odXBkYXRlX2lkKSB7XG4gICAgICAgICAgICAgIGlmICghdXBkYXRlX2lkKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdICE9PSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGJrSGVscGVyO1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm1lbnVQbHVnaW5NYW5hZ2VyJywgWydiay51dGlscyddKTtcblxuICB2YXIgdXRpbHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIERFRkFVTFRfUFJJT1JJVFkgPSAwO1xuICAgIC8vIGFkZCBuZXdJdGVtIHRvIGl0ZW1zTGlzdCwgaWYgYW4gaXRlbSB3aXRoIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0cyBpbiBpdGVtc0xpc3QsXG4gICAgLy8gY29tcGFyZSBwcmlvcml0aWVzLCBpZiBuZXdJdGVtLnByaW9yaXR5ID4gZXhpc3RpbmdJdGVtLnByaW9yaXR5LCBuZXdJdGVtIHdpbGxcbiAgICAvLyByZXBsYWNlIHRoZSBleGlzdGluZ0l0ZW0gaW4gcGxhY2UuXG4gICAgdmFyIGFkZE1lbnVJdGVtID0gZnVuY3Rpb24oaXRlbXNMaXN0LCBuZXdJdGVtKSB7XG4gICAgICAvLyBjaGVjayBpZiBhbiBlbnRyeSB3aXRoIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0XG4gICAgICB2YXIgZXhpc3RpbmdJdGVtID0gXyhpdGVtc0xpc3QpLmZpbmQoZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IG5ld0l0ZW0ubmFtZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuICAgICAgICBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgPSBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgPyBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgOiBERUZBVUxUX1BSSU9SSVRZO1xuICAgICAgICBuZXdJdGVtLnByaW9yaXR5ID0gbmV3SXRlbS5wcmlvcml0eSA/IG5ld0l0ZW0ucHJpb3JpdHkgOiBERUZBVUxUX1BSSU9SSVRZO1xuICAgICAgICBpZiAobmV3SXRlbS5wcmlvcml0eSA+PSBleGlzdGluZ0l0ZW0ucHJpb3JpdHkpIHtcbiAgICAgICAgICAvLyByZXBsYWNlIGluIHBsYWNlXG4gICAgICAgICAgaXRlbXNMaXN0LnNwbGljZShpdGVtc0xpc3QuaW5kZXhPZihleGlzdGluZ0l0ZW0pLCAxLCBuZXdJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZ25vcmUgYW5kIHdhcm5cbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJpZ25vcmluZyBtZW51IGl0ZW0gXCIgKyBuZXdJdGVtLm5hbWUgKyBcImJlY2F1c2UgcHJpb3JpdHk9XCJcbiAgICAgICAgICAgICAgKyBuZXdJdGVtLnByaW9yaXR5ICsgXCJpcyBzbWFsbGVyIHRoYW4gZXhpc3RpbmcgKFwiICsgZXhpc3RpbmdJdGVtLnByaW9yaXR5ICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtc0xpc3QgPSBpdGVtc0xpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBhZGRNZW51SXRlbXM6IGZ1bmN0aW9uIChwYXJlbnRNZW51LCBpdGVtcykge1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW1zKSkge1xuICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBhZGRNZW51SXRlbShwYXJlbnRNZW51Lml0ZW1zLCBpdGVtKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrTWVudVBsdWdpbk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzKSB7XG5cbiAgICB2YXIgbWVudXMgPSB7fTtcbiAgICB2YXIgbG9hZGVkUGx1Z2lucyA9IFtdO1xuICAgIHZhciBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMgPSBbXTtcbiAgICB2YXIgcGx1Z2luSW5kZXggPSAwO1xuXG4gICAgdmFyIGFkZFBsdWdpbiA9IGZ1bmN0aW9uKHBsdWdpbiwgcGx1Z2luSW5kZXgsIHNlY29uZGFyeUluZGV4KSB7XG4gICAgICBpZiAoIXBsdWdpbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJlbnRNZW51ID0gXy5maW5kKF8udmFsdWVzKG1lbnVzKSwgZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IHBsdWdpbi5wYXJlbnQ7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFwYXJlbnRNZW51KSB7XG4gICAgICAgIHBhcmVudE1lbnUgPSB7XG4gICAgICAgICAgbmFtZTogcGx1Z2luLnBhcmVudCxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgaW5kZXg6IHBsdWdpbkluZGV4LFxuICAgICAgICAgIHNlY29uZGFyeUluZGV4OiBzZWNvbmRhcnlJbmRleCxcbiAgICAgICAgICBzb3J0b3JkZXI6IHBsdWdpbi5zb3J0b3JkZXIsXG4gICAgICAgICAgY2xhc3NOYW1lczogcGx1Z2luLmlkXG4gICAgICAgIH07XG4gICAgICAgIG1lbnVzW3BsdWdpbkluZGV4ICsgJ18nICsgc2Vjb25kYXJ5SW5kZXggKyAnXycgKyBwYXJlbnRNZW51Lm5hbWVdID0gcGFyZW50TWVudTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwbHVnaW5JbmRleCA8IHBhcmVudE1lbnUuaW5kZXhcbiAgICAgICAgICAgIHx8IChwbHVnaW5JbmRleCA9PT0gcGFyZW50TWVudS5pbmRleCAmJiBzZWNvbmRhcnlJbmRleCA8IHBhcmVudE1lbnUuc2Vjb25kYXJ5SW5kZXgpKSB7XG4gICAgICAgICAgZGVsZXRlIG1lbnVzW3BhcmVudE1lbnUuaW5kZXggKyAnXycgKyBwYXJlbnRNZW51LnNlY29uZGFyeUluZGV4ICsgJ18nICsgcGFyZW50TWVudS5uYW1lXTtcbiAgICAgICAgICBtZW51c1twbHVnaW5JbmRleCArICdfJyArIHNlY29uZGFyeUluZGV4ICsgJ18nICsgcGFyZW50TWVudS5uYW1lXSA9IHBhcmVudE1lbnU7XG4gICAgICAgICAgcGFyZW50TWVudS5pbmRleCA9IHBsdWdpbkluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghcGx1Z2luLnN1Ym1lbnUpIHtcbiAgICAgICAgdXRpbHMuYWRkTWVudUl0ZW1zKHBhcmVudE1lbnUsIHBsdWdpbi5pdGVtcyk7XG4gICAgICAgIGlmICghIF8uaXNGdW5jdGlvbihwYXJlbnRNZW51Lml0ZW1zKSkge1xuICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICAgIGlmIChhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkICYmIGIuc29ydG9yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyPmIuc29ydG9yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzdWJNZW51ID0gXy5maW5kKHBhcmVudE1lbnUuaXRlbXMsIGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IHBsdWdpbi5zdWJtZW51O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFzdWJNZW51KSB7XG4gICAgICAgICAgc3ViTWVudSA9IHtcbiAgICAgICAgICAgIG5hbWU6IHBsdWdpbi5zdWJtZW51LFxuICAgICAgICAgICAgdHlwZTogXCJzdWJtZW51XCIsXG4gICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICBzb3J0b3JkZXI6IHBsdWdpbi5zdWJtZW51c29ydG9yZGVyXG4gICAgICAgICAgfTtcbiAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zLnB1c2goc3ViTWVudSk7XG4gICAgICAgICAgaWYgKCEgXy5pc0Z1bmN0aW9uKHBhcmVudE1lbnUuaXRlbXMpKSB7XG4gICAgICAgICAgICBwYXJlbnRNZW51Lml0ZW1zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgICAgIGlmIChhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkICYmIGIuc29ydG9yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXI+Yi5zb3J0b3JkZXI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ViTWVudS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIHN1Yk1lbnUudHlwZSA9IFwic3VibWVudVwiO1xuICAgICAgICAgIGlmICghc3ViTWVudS5pdGVtcykge1xuICAgICAgICAgICAgc3ViTWVudS5pdGVtcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1dGlscy5hZGRNZW51SXRlbXMoc3ViTWVudSwgcGx1Z2luLml0ZW1zKTtcbiAgICAgICAgaWYgKCEgXy5pc0Z1bmN0aW9uKHN1Yk1lbnUuaXRlbXMpKSB7XG4gICAgICAgICAgc3ViTWVudS5pdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgICAgaWYgKGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQgJiYgYi5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXI+Yi5zb3J0b3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0TG9hZE1lbnVQbHVnaW5Kb2IgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldFVybDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNDYW5jZWxsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjYW5jZWxsZWQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbG9hZFBsdWdpbiA9IGZ1bmN0aW9uKGpvYikge1xuICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZE1vZHVsZShqb2IuZ2V0VXJsKCkpLnRoZW4oZnVuY3Rpb24obWVudVBsdWdpbikge1xuICAgICAgICBpZiAoam9iLmlzQ2FuY2VsbGVkKCkpIHtcbiAgICAgICAgICB0aHJvdyBcImNhbmNlbGxlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZW51UGx1Z2luLmdldE1lbnVJdGVtcygpLnRoZW4oZnVuY3Rpb24obWVudUl0ZW1zKSB7XG4gICAgICAgICAgaWYgKGpvYi5pc0NhbmNlbGxlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBcImNhbmNlbGxlZFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWVudUl0ZW1zO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbG9hZE1lbnVQbHVnaW46IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgam9iID0gZ2V0TG9hZE1lbnVQbHVnaW5Kb2IodXJsKTtcbiAgICAgICAgdmFyIGluZGV4ID0gcGx1Z2luSW5kZXgrKztcbiAgICAgICAgbG9hZFBsdWdpbihqb2IpLnRoZW4oZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgICAgbG9hZGVkUGx1Z2lucy5wdXNoKHt1cmw6IGpvYi5nZXRVcmwoKX0pO1xuICAgICAgICAgIGlmIChfLmlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgICAgXyhwbHVnaW4pLmVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgICAgYWRkUGx1Z2luKGl0ZW0sIGluZGV4LCBpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRQbHVnaW4ocGx1Z2luLCBpbmRleCwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3Rpb24pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlamVjdGlvbik7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzLnNwbGljZShsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMuaW5kZXhPZihqb2IpLCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvYWRpbmdJblByb2dyZXNzUGx1Z2luSm9icy5wdXNoKGpvYik7XG4gICAgICB9LFxuICAgICAgYXR0YWNoTWVudXM6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICB2YXIgaW5kZXggPSBwbHVnaW5JbmRleCsrO1xuICAgICAgICBpZiAoXy5pc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgICBfKHBsdWdpbikuZWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgYWRkUGx1Z2luKGl0ZW0sIGluZGV4LCBpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRQbHVnaW4ocGx1Z2luLCBpbmRleCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRNZW51czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtZW51cztcbiAgICAgIH0sXG4gICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIG1lbnVzID0ge307XG4gICAgICAgIF8obG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzKS5lYWNoKGZ1bmN0aW9uKGpvYikge1xuICAgICAgICAgIGpvYi5jYW5jZWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsdWdpbkluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm1haW5BcHBcbiAqIFRoaXMgaXMgdGhlIG1haW4gbW9kdWxlIGZvciB0aGUgYmVha2VyIG5vdGVib29rIGFwcGxpY2F0aW9uLiBUaGUgbW9kdWxlIGhhcyBhIGRpcmVjdGl2ZSB0aGF0XG4gKiBob2xkcyB0aGUgbWVudSBiYXIgYXMgd2VsbCBhcyB0aGUgbm90ZWJvb2sgdmlldy5cbiAqIFRoZSBtb2R1bGUgYWxzbyBvd25zIHRoZSBjZW50cmFsaXplZCBjZWxsIGV2YWx1YXRpb24gbG9naWMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm1haW5BcHAnLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbmdSb3V0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsudXRpbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmNvbW1vblVpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5jb3JlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5zZXNzaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5zZXNzaW9uTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubWVudVBsdWdpbk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmNlbGxNZW51UGx1Z2luTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsubm90ZWJvb2tWZXJzaW9uTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuZXZhbHVhdG9yTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuZXZhbHVhdGVKb2JNYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5ub3RlYm9vaydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuXG4gIC8qKlxuICAgKiBia0FwcFxuICAgKiAtIFRoaXMgaXMgdGhlIGJlYWtlciBBcHBcbiAgICogLSBtZW51cyArIHBsdWdpbnMgKyBub3RlYm9vayhub3RlYm9vayBtb2RlbCArIGV2YWx1YXRvcilcbiAgICovXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTWFpbkFwcCcsIGZ1bmN0aW9uKFxuICAgICAgJHJvdXRlLFxuICAgICAgJHJvdXRlUGFyYW1zLFxuICAgICAgJHRpbWVvdXQsXG4gICAgICAkc2Vzc2lvblN0b3JhZ2UsXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia05vdGVib29rVmVyc2lvbk1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia0V2YWx1YXRlSm9iTWFuYWdlcixcbiAgICAgICRsb2NhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcInRlbXBsYXRlL21haW5hcHAvbWFpbmFwcFwiXSgpLFxuICAgICAgc2NvcGU6IHt9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCkge1xuICAgICAgICB2YXIgc2hvd0xvYWRpbmdTdGF0dXNNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICAkc2NvcGUubG9hZGluZ21zZyA9IG1lc3NhZ2U7XG4gICAgICAgICAgaWYgKG5vZGlnZXN0ICE9PSB0cnVlICYmICEoJHNjb3BlLiQkcGhhc2UgfHwgJHNjb3BlLiRyb290LiQkcGhhc2UpKVxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHVwZGF0ZUxvYWRpbmdTdGF0dXNNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCEoJHNjb3BlLiQkcGhhc2UgfHwgJHNjb3BlLiRyb290LiQkcGhhc2UpKVxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldExvYWRpbmdTdGF0dXNNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5sb2FkaW5nbXNnO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgIGlmICgkc2NvcGUubG9hZGluZ21zZyA9PT0gbWVzc2FnZSkge1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmdtc2cgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKG5vZGlnZXN0ICE9PSB0cnVlICYmICEoJHNjb3BlLiQkcGhhc2UgfHwgJHNjb3BlLiRyb290LiQkcGhhc2UpKVxuICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICAkc2NvcGUubG9hZGluZ21zZyA9IG1lc3NhZ2U7XG4gICAgICAgICAgaWYgKG5vZGlnZXN0ICE9PSB0cnVlICYmICEoJHNjb3BlLiQkcGhhc2UgfHwgJHNjb3BlLiRyb290LiQkcGhhc2UpKVxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICBpZiAobWVzc2FnZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgkc2NvcGUubG9hZGluZ21zZyA9PT0gbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDAsIDAsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBldmFsdWF0b3JNZW51SXRlbXMgPSBbXTtcblxuICAgICAgICB2YXIgYWRkRXZhbHVhdG9yID0gZnVuY3Rpb24oc2V0dGluZ3MsIGFsd2F5c0NyZWF0ZU5ld0V2YWx1YXRvcikge1xuICAgICAgICAgIC8vIHNldCBzaGVsbCBpZCB0byBudWxsLCBzbyBpdCB3b24ndCB0cnkgdG8gZmluZCBhbiBleGlzdGluZyBzaGVsbCB3aXRoIHRoZSBpZFxuICAgICAgICAgIGlmIChhbHdheXNDcmVhdGVOZXdFdmFsdWF0b3IpIHtcbiAgICAgICAgICAgIHNldHRpbmdzLnNoZWxsSUQgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIubmV3RXZhbHVhdG9yKHNldHRpbmdzKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoZXZhbHVhdG9yLnNwZWMpKSB7XG4gICAgICAgICAgICAgIHZhciBhY3Rpb25JdGVtcyA9IFtdO1xuICAgICAgICAgICAgICBfKGV2YWx1YXRvci5zcGVjKS5lYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZSA9PT0gXCJhY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgYWN0aW9uSXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWUgPyB2YWx1ZS5uYW1lIDogdmFsdWUuYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbHVhdG9yLnBlcmZvcm0oa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChhY3Rpb25JdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZXZhbHVhdG9yTWVudUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgbmFtZTogZXZhbHVhdG9yLnBsdWdpbk5hbWUsIC8vIFRPRE8sIHRoaXMgc2hvdWxkIGJlIGV2YWx1YXRvci5zZXR0aW5ncy5uYW1lXG4gICAgICAgICAgICAgICAgICBpdGVtczogYWN0aW9uSXRlbXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBsb2FkTm90ZWJvb2sgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGFkZFNjcm9sbGluZ0hhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFRPRE8sIHRoZSBmb2xsb3dpbmcgaXMgYSBoYWNrIHRvIGFkZHJlc3MgdGhlIGlzc3VlIHRoYXRcbiAgICAgICAgICAgIC8vIHNvbWVob3cgdGhlIG5vdGVib29rIGlzIHNjcm9sbGVkIHRvIHRoZSBtaWRkbGVcbiAgICAgICAgICAgIC8vIHRoaXMgaGFjayBsaXN0ZW5zIHRvIHRoZSAnc2Nyb2xsJyBldmVudCBhbmQgc2Nyb2xscyBpdCB0byB0aGUgdG9wXG4gICAgICAgICAgICAvLyBBIGJldHRlciBzb2x1dGlvbiBpcyB0byBkbyB0aGlzIHdoZW4gQW5ndWxhciBzdG9wcyBmaXJpbmcgYW5kIERPTSB1cGRhdGVzIGZpbmlzaC5cbiAgICAgICAgICAgIC8vIEEgZXZlbiBldmVuIGJldHRlciBzb2x1dGlvbiBpcyB0aGUgc2Vzc2lvbiBhY3R1YWxseSByZW1lbWJlcnMgd2hlcmUgdGhlIHNjcm9sbGluZyB3YXNcbiAgICAgICAgICAgIC8vIGFuZCBzY3JvbGwgdG8gdGhlcmUgYW5kIGluIHRoZSBjYXNlIG9mIHN0YXJ0aW5nIGEgbmV3IHNlc3Npb24gKGkuZS4gbG9hZGluZyBhIG5vdGVib29rIGZyb20gZmlsZSlcbiAgICAgICAgICAgIC8vIHNjcm9sbCB0byB0b3AuXG4gICAgICAgICAgICAvLyBBIGV2ZW4gYmV0dGVyIHNvbHV0aW9uIHdvdWxkIGJlIHRvIGdldCByaWQgb2YgdGhlIHVud2FudGVkIHNjcm9sbGluZyBpbiB0aGUgZmlyc3QgcGxhY2UuXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldikge1xuICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBsb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbiA9IGZ1bmN0aW9uKFxuICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsXG4gICAgICAgICAgICAgIGlzRXhpc3RpbmdTZXNzaW9uKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbm90ZWJvb2sgaGFzIHRvIGxvYWQgcGx1Z2lucyBmcm9tIGFuIGV4dGVybmFsIHNvdXJjZVxuICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwgJiYgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHIudGVzdChub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbaV0ucGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHBsdWdMaXN0ID0gXCI8dWw+XCI7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoci50ZXN0KG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGx1Z0xpc3QgKz0gXCI8bGk+XCIrbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldLnBsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcGx1Z0xpc3QgKz0gXCI8L3VsPlwiO1xuICAgICAgICAgICAgICAgICAgcHJvbXB0SWZJbnNlY3VyZShwbHVnTGlzdCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlciBhY2NlcHRlZCByaXNrLi4uIGRvIHRoZSBsb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsIGlzRXhpc3RpbmdTZXNzaW9uKTtcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyIGRlbmllZCByaXNrLi4uIGNsZWFyIHBsdWdpbnMgd2l0aCBleHRlcm5hbCBVUkwgYW5kIGRvIHRoZSBsb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgIHZhciByID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoci50ZXN0KG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbaV0ucGx1Z2luPVwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsIGlzRXhpc3RpbmdTZXNzaW9uKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbm8gdW5zYWZlIG9wZXJhdGlvbiBkZXRlY3RlZC4uLiBkbyB0aGUgbG9hZGluZ1xuICAgICAgICAgICAgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIHByb21wdElmSW5zZWN1cmUgPSBmdW5jdGlvbih1cmxMaXN0KSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cyQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgXCJUaGlzIG5vdGVib29rIGlzIGFza2luZyB0byBsb2FkIHRoZSBmb2xsb3dpbmcgcGx1Z2lucyBmcm9tIGV4dGVybmFsIHNlcnZlcnM6PGJyLz5cIiArIHVybExpc3QrXG4gICAgICAgICAgICAgICAgXCIgPGJyLz5Ib3cgZG8geW91IHdhbnQgdG8gaGFuZGxlIHRoZXNlIGV4dGVybmFsIHBsdWdpbnM/XCIsXG4gICAgICAgICAgICAgICAgXCJXYXJuaW5nOiBleHRlcm5hbCBwbHVnaW5zIGRldGVjdGVkXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIFwiRGlzYWJsZVwiLCBcIkxvYWRcIiwgXCJcIiwgXCJidG4tZGFuZ2VyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uID0gZnVuY3Rpb24oXG4gICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCxcbiAgICAgICAgICAgICAgaXNFeGlzdGluZ1Nlc3Npb24pIHtcblxuICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0dXNNZXNzYWdlKFwiTG9hZGluZyBub3RlYm9va1wiKTtcbiAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgYWRkU2Nyb2xsaW5nSGFjaygpO1xuICAgICAgICAgICAgaXNFeGlzdGluZ1Nlc3Npb24gPSAhIWlzRXhpc3RpbmdTZXNzaW9uO1xuICAgICAgICAgICAgZXZhbHVhdG9yTWVudUl0ZW1zLnNwbGljZSgwLCBldmFsdWF0b3JNZW51SXRlbXMubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gSEFDSyB0byBmaXggb2xkZXIgdmVyc2lvbiBvZiBldmFsdWF0b3IgY29uZmlndXJhdGlvblxuICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwgJiYgbm90ZWJvb2tNb2RlbC5jZWxscyAmJiBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RlYm9va01vZGVsLmNlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwuY2VsbHNbaV0uZXZhbHVhdG9yICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwuY2VsbHNbaV0uZXZhbHVhdG9yID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5wbHVnaW47XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiSHRtbFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkh0bWxcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJMYXRleFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkxhdGV4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiSmF2YVNjcmlwdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJHcm9vdnlcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuY2VsbHNbaV0uZXZhbHVhdG9yID0gXCJHcm9vdnlcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobmFtZSA9PT0gXCJQeXRob25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBwbHVnaW47XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgcGx1Z2luID0gbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbjtcbiAgICAgICAgICAgICAgICBpZiAoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJIdG1sXCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZSA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbiA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgobmFtZSxcIkxhdGV4XCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZSA9IFwiTGF0ZXhcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5wbHVnaW4gPSBcIkxhdGV4XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiSmF2YVNjcmlwdFwiKSkge1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLm5hbWUgPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5wbHVnaW4gPSBcIkphdmFTY3JpcHRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJHcm9vdnlcIikpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5uYW1lID0gXCJHcm9vdnlcIjtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5wbHVnaW4gPSBcIkdyb292eVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihuYW1lID09PSBcIlB5dGhvblwiKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZSA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhBQ0sgRU5EXG5cbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwKCk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgICAgICBzZXNzaW9uSWQgPSBia1Nlc3Npb25NYW5hZ2VyLnNldFNlc3Npb25JZChzZXNzaW9uSWQpO1xuXG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldHVwKFxuICAgICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LFxuICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkKTtcblxuICAgICAgICAgICAgdmFyIG11c3R3YWl0O1xuICAgICAgICAgICAgaWYgKCFpc0V4aXN0aW5nU2Vzc2lvbiAmJiBia0hlbHBlci5oYXNDb2RlQ2VsbChcImluaXRpYWxpemF0aW9uXCIpKSB7XG4gICAgICAgICAgICAgIG11c3R3YWl0ID0gYmtDb3JlTWFuYWdlci5zaG93MEJ1dHRvbk1vZGFsKFwiVGhpcyBub3RlYm9vayBoYXMgaW5pdGlhbGl6YXRpb24gY2VsbHMuLi4gd2FpdGluZyBmb3IgdGhlaXIgY29tcGxldGlvbi5cIiwgXCJQbGVhc2UgV2FpdFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdGhpcyBpcyB1c2VkIHRvIGxvYWQgZXZhbHVhdG9ycyBiZWZvcmUgcmVuZGVyaW5nIHRoZSBwYWdlXG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpIHtcbiAgICAgICAgICAgICAgdmFyIHByb21pc2VzID0gXyhub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpLm1hcChmdW5jdGlvbihldikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhZGRFdmFsdWF0b3IoZXYsICFpc0V4aXN0aW5nU2Vzc2lvbik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBia1V0aWxzLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRXhpc3RpbmdTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICBia1V0aWxzLmxvZyhcIm9wZW5cIiwge1xuICAgICAgICAgICAgICAgICAgICB1cmk6IG5vdGVib29rVXJpLFxuICAgICAgICAgICAgICAgICAgICB1cmlUeXBlOiB1cmlUeXBlLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgbWF4Q2VsbExldmVsOiBfKG5vdGVib29rTW9kZWwuY2VsbHMpLm1heChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNlbGwubGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIH0pLmxldmVsLFxuICAgICAgICAgICAgICAgICAgICBjZWxsQ291bnQ6IG5vdGVib29rTW9kZWwuY2VsbHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgYmtIZWxwZXIuZXZhbHVhdGVSb290KFwiaW5pdGlhbGl6YXRpb25cIikudGhlbihmdW5jdGlvbiAoKSB7IGlmKG11c3R3YWl0ICE9PSB1bmRlZmluZWQpIG11c3R3YWl0LmNsb3NlKCk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlKFwiTG9hZGluZyBub3RlYm9va1wiKTtcbiAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzRXhpc3RpbmdTZXNzaW9uKSB7XG4gICAgICAgICAgICAgIGJrVXRpbHMubG9nKFwib3BlblwiLCB7XG4gICAgICAgICAgICAgICAgdXJpOiBub3RlYm9va1VyaSxcbiAgICAgICAgICAgICAgICB1cmlUeXBlOiB1cmlUeXBlLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICAgICAgICAgIG1heENlbGxMZXZlbDogXyhub3RlYm9va01vZGVsLmNlbGxzKS5tYXgoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNlbGwubGV2ZWw7XG4gICAgICAgICAgICAgICAgfSkubGV2ZWwsXG4gICAgICAgICAgICAgICAgY2VsbENvdW50OiBub3RlYm9va01vZGVsLmNlbGxzLmxlbmd0aFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYmtIZWxwZXIuZXZhbHVhdGVSb290KFwiaW5pdGlhbGl6YXRpb25cIikudGhlbihmdW5jdGlvbiAoKSB7IGlmKG11c3R3YWl0ICE9PSB1bmRlZmluZWQpIG11c3R3YWl0LmNsb3NlKCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJMb2FkaW5nIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcGVuVXJpOiBmdW5jdGlvbih0YXJnZXQsIHNlc3Npb25JZCwgcmV0cnksIHJldHJ5Q291bnRNYXgpIHtcbiAgICAgICAgICAgICAgaWYgKCF0YXJnZXQudXJpKSB7XG4gICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKFwiRmFpbGVkIHRvIG9wZW4gbm90ZWJvb2ssIG5vdGVib29rVXJpIGlzIGVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdHVzTWVzc2FnZShcIk9wZW5pbmcgVVJJXCIpO1xuICAgICAgICAgICAgICBpZiAocmV0cnlDb3VudE1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudE1heCA9IDEwMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIXRhcmdldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGUgPSBia0NvcmVNYW5hZ2VyLmd1ZXNzVXJpVHlwZSh0YXJnZXQudXJpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0YXJnZXQucmVhZE9ubHkgPSAhIXRhcmdldC5yZWFkT25seTtcbiAgICAgICAgICAgICAgaWYgKCF0YXJnZXQuZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZvcm1hdCA9IGJrQ29yZU1hbmFnZXIuZ3Vlc3NGb3JtYXQodGFyZ2V0LnVyaSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgaW1wb3J0ZXIgPSBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rSW1wb3J0ZXIodGFyZ2V0LmZvcm1hdCk7XG4gICAgICAgICAgICAgIGlmICghaW1wb3J0ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAocmV0cnkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHJldHJ5LCBzb21ldGltZXMgdGhlIGltcG9ydGVyIGNhbWUgZnJvbSBhIHBsdWdpbiB0aGF0IGlzIGJlaW5nIGxvYWRlZFxuICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudE1heCAtPSAxO1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZE5vdGVib29rLm9wZW5VcmkodGFyZ2V0LCByZXRyeSwgcmV0cnlDb3VudE1heCk7XG4gICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZShcIk9wZW5pbmcgVVJJXCIpO1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzFCdXR0b25Nb2RhbChcIkZhaWxlZCB0byBvcGVuIFwiICsgdGFyZ2V0LnVyaVxuICAgICAgICAgICAgICAgICAgICAgICsgXCIgYmVjYXVzZSBmb3JtYXQgXCIgKyB0YXJnZXQuZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgKyBcIiB3YXMgbm90IHJlY29nbml6ZWQuXCIsIFwiT3BlbiBGYWlsZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmaWxlTG9hZGVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlTG9hZGVyKHRhcmdldC50eXBlKTtcbiAgICAgICAgICAgICAgICBmaWxlTG9hZGVyLmxvYWQodGFyZ2V0LnVyaSkudGhlbihmdW5jdGlvbihmaWxlQ29udGVudEFzU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9IGltcG9ydGVyLmltcG9ydChmaWxlQ29udGVudEFzU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia05vdGVib29rVmVyc2lvbk1hbmFnZXIub3Blbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgICAgICAgIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC51cmksXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnJlYWRPbmx5LFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5mb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICBia0hlbHBlci5zaG93MUJ1dHRvbk1vZGFsKGRhdGEsIFwiT3BlbiBGYWlsZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlKFwiT3BlbmluZyBVUklcIik7XG4gICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbVNlc3Npb246IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICBia1Nlc3Npb24ubG9hZChzZXNzaW9uSWQpLnRoZW4oZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IHNlc3Npb24ubm90ZWJvb2tVcmk7XG4gICAgICAgICAgICAgICAgdmFyIHVyaVR5cGUgPSBzZXNzaW9uLnVyaVR5cGU7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gc2Vzc2lvbi5yZWFkT25seTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gc2Vzc2lvbi5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rTW9kZWwgPSBhbmd1bGFyLmZyb21Kc29uKHNlc3Npb24ubm90ZWJvb2tNb2RlbEpzb24pO1xuICAgICAgICAgICAgICAgIHZhciBlZGl0ZWQgPSBzZXNzaW9uLmVkaXRlZDtcbiAgICAgICAgICAgICAgICBsb2FkTm90ZWJvb2tNb2RlbEFuZFJlc2V0U2Vzc2lvbihcbiAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbUltcG9ydDogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9vayA9ICRzZXNzaW9uU3RvcmFnZS5pbXBvcnRlZE5vdGVib29rO1xuICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tVcmkgPSBudWxsO1xuICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciByZWFkT25seSA9IHRydWU7XG4gICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBudWxsO1xuICAgICAgICAgICAgICB2YXIgaW1wb3J0ZXIgPSBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rSW1wb3J0ZXIoJ2JrcicpO1xuICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9IGltcG9ydGVyLmltcG9ydChub3RlYm9vayk7XG4gICAgICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia05vdGVib29rVmVyc2lvbk1hbmFnZXIub3Blbihub3RlYm9vayk7XG4gICAgICAgICAgICAgIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGZhbHNlLCBzZXNzaW9uSWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbXB0eU5vdGVib29rOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgdmFyIG5vdGVib29rTW9kZWwgPVxuICAgICAgICAgICAgICAgICd7XCJiZWFrZXJcIjogXCIyXCIsIFwiZXZhbHVhdG9yc1wiOiBbe1wibmFtZVwiOiBcIkh0bWxcIiwgXCJwbHVnaW5cIjogXCJIdG1sXCJ9LCcgK1xuICAgICAgICAgICAgICAgICd7XCJuYW1lXCI6IFwiTGF0ZXhcIiwgXCJwbHVnaW5cIjogXCJMYXRleFwifSwnICtcbiAgICAgICAgICAgICAgICAne1wibmFtZVwiOiBcIkphdmFTY3JpcHRcIiwgXCJwbHVnaW5cIjogXCJKYXZhU2NyaXB0XCJ9XSwgXCJjZWxsc1wiOiBbXX0nO1xuICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tVcmkgPSBudWxsO1xuICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciByZWFkT25seSA9IHRydWU7XG4gICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBudWxsO1xuICAgICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyLm9wZW4obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICAgIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGZhbHNlLCBzZXNzaW9uSWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZhdWx0Tm90ZWJvb2s6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICBia1V0aWxzLmdldERlZmF1bHROb3RlYm9vaygpLnRoZW4oZnVuY3Rpb24obm90ZWJvb2tNb2RlbCkge1xuICAgICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHVyaVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHZhciByZWFkT25seSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgICAgIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHZhciBia05vdGVib29rV2lkZ2V0O1xuICAgICAgICAkc2NvcGUuc2V0QmtOb3RlYm9vayA9IGZ1bmN0aW9uKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICBia05vdGVib29rV2lkZ2V0ID0gYmtOb3RlYm9vaztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgX2ltcGwgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgcHJvbXB0VXJpQ2hvb3NlciA9IGZ1bmN0aW9uKHVyaVR5cGUsIGluaXRVcmkpIHtcbiAgICAgICAgICAgIGlmICghdXJpVHlwZSkge1xuICAgICAgICAgICAgICB1cmlUeXBlID0gXCJmaWxlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIodXJpVHlwZSk7XG4gICAgICAgICAgICBpZiAoIWZpbGVTYXZlciB8fCAhZmlsZVNhdmVyLnNob3dGaWxlQ2hvb3Nlcikge1xuICAgICAgICAgICAgICBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcihcImZpbGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWxlU2F2ZXIuc2hvd0ZpbGVDaG9vc2VyKGluaXRVcmkpLnRoZW4oZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICAgIGlmIChfLmlzRW1wdHkocmV0LnVyaSkpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJjYW5jZWxsZWRcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgcHJvbXB0SWZPdmVyd3JpdGUgPSBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIkZpbGUgXCIgKyB1cmkgKyBcIiBleGlzdHMuIE92ZXJ3cml0ZT9cIixcbiAgICAgICAgICAgICAgICBcIkZpbGUgZXhpc3RzXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIFwiQ2FuY2VsXCIsIFwiT3ZlcndyaXRlXCIsIFwiXCIsIFwiYnRuLWRhbmdlclwiKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZUFsd2F5c092ZXJ3cml0ZSA9IGZ1bmN0aW9uKHVyaSwgdXJpVHlwZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgdmFyIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKHVyaVR5cGUpO1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBjb250ZW50ID0gYmtTZXNzaW9uTWFuYWdlci5nZXRTYXZlRGF0YSgpLm5vdGVib29rTW9kZWxBc1N0cmluZztcbiAgICAgICAgICAgICAgcmV0dXJuIGZpbGVTYXZlci5zYXZlKHVyaSwgY29udGVudCwgdHJ1ZSk7fSwgMSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHt1cmk6IHVyaSwgdXJpVHlwZTogdXJpVHlwZX0pO1xuICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIF9zYXZlUHJvbXB0SWZPdmVyd3JpdGUgPSBmdW5jdGlvbihkZWZlcnJlZCwgdXJpLCB1cmlUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIodXJpVHlwZSk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCkubm90ZWJvb2tNb2RlbEFzU3RyaW5nO1xuICAgICAgICAgICAgICByZXR1cm4gZmlsZVNhdmVyLnNhdmUodXJpLCBjb250ZW50KTtcbiAgICAgICAgICAgIH0sIDEpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe3VyaTogdXJpLCB1cmlUeXBlOiB1cmlUeXBlfSk7IC8vIGZpbGUgc2F2ZSBzdWNjZWVkXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgICAgIGlmIChyZWFzb24gPT09IFwiZXhpc3RzXCIpIHtcbiAgICAgICAgICAgICAgICBwcm9tcHRJZk92ZXJ3cml0ZSh1cmkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgc2F2ZUFsd2F5c092ZXJ3cml0ZSh1cmksIHVyaVR5cGUpLnRoZW4oZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmV0KTsgLy8gZmlsZSBzYXZlIHN1Y2NlZWRcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVhc29uKTsgLy8gZmlsZSBzYXZlIGZhaWxlZFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBfc2F2ZVByb21wdFVyaUNob29zZXIoZGVmZXJyZWQsIHVyaVR5cGUsIHVyaSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVhc29uID09PSBcImlzRGlyZWN0b3J5XCIpIHtcbiAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgICAgIHVyaSArIFwiIGlzIGEgZGlyZWN0b3J5LiBQbGVhc2UgY2hvb3NlIGEgZGlmZmVyZW50IGxvY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU2F2ZSBGYWlsZWRcIixcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIF9zYXZlUHJvbXB0VXJpQ2hvb3NlcihkZWZlcnJlZCwgdXJpVHlwZSwgdXJpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlYXNvbik7IC8vIGZpbGUgc2F2ZSBmYWlsZWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgX3NhdmVQcm9tcHRVcmlDaG9vc2VyID0gZnVuY3Rpb24oZGVmZXJyZWQsIHVyaVR5cGUsIGluaXRVcmkpIHtcbiAgICAgICAgICAgIHByb21wdFVyaUNob29zZXIodXJpVHlwZSwgaW5pdFVyaSkudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgX3NhdmVQcm9tcHRJZk92ZXJ3cml0ZShkZWZlcnJlZCwgcmV0LnVyaSwgcmV0LnVyaVR5cGUpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImNhbmNlbGxlZFwiKTsgLy8gZmlsZSBzYXZlIGNhbmNlbGxlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzYXZlUHJvbXB0Q2hvb3NlVXJpID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBfc2F2ZVByb21wdFVyaUNob29zZXIoZGVmZXJyZWQpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzYXZlUHJvbXB0SWZPdmVyd3JpdGUgPSBmdW5jdGlvbih1cmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIF9zYXZlUHJvbXB0SWZPdmVyd3JpdGUoZGVmZXJyZWQsIHVyaSwgdXJpVHlwZSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVTdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0dXNNZXNzYWdlKFwiU2F2aW5nXCIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIHNhdmVEb25lID0gZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci51cGRhdGVOb3RlYm9va1VyaShyZXQudXJpLCByZXQudXJpVHlwZSwgZmFsc2UsIFwiYmtyXCIpO1xuICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJTYXZlZFwiKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVGYWlsZWQgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICBpZiAobXNnID09PSBcImNhbmNlbGxlZFwiKSB7XG4gICAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKFwiQ2FuY2VsbGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKG1zZywgXCJTYXZlIEZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJTYXZlIEZhaWxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGV2YWxDb2RlSWQgPSAwO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IFwiYmtOb3RlYm9va0FwcFwiLFxuICAgICAgICAgICAgZ2V0U2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2Vzc2lvbklkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Tm90ZWJvb2tNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRCZWFrZXJPYmplY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRCZWFrZXJPYmplY3QoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93U3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZVN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZUxvYWRpbmdTdGF0dXNNZXNzYWdlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGdldExvYWRpbmdTdGF0dXNNZXNzYWdlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgICAgIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzYXZlTm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzYXZlU3RhcnQoKTtcbiAgICAgICAgICAgICAgdmFyIHRoZW5hYmxlO1xuICAgICAgICAgICAgICBpZiAoYmtTZXNzaW9uTWFuYWdlci5pc1NhdmFibGUoKSkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZHVtcERpc3BsYXlTdGF0dXMoKTtcbiAgICAgICAgICAgICAgICB0aGVuYWJsZSA9ICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIHNhdmVEYXRhID0gYmtTZXNzaW9uTWFuYWdlci5nZXRTYXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgICAgdmFyIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKHNhdmVEYXRhLnVyaVR5cGUpO1xuICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBzYXZlRGF0YS5ub3RlYm9va01vZGVsQXNTdHJpbmc7XG4gICAgICAgICAgICAgICAgICBmaWxlU2F2ZXIuc2F2ZShzYXZlRGF0YS5ub3RlYm9va1VyaSwgY29udGVudCwgdHJ1ZSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7dXJpOiBzYXZlRGF0YS5ub3RlYm9va1VyaSwgdXJpVHlwZTogc2F2ZURhdGEudXJpVHlwZX0pO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGVuYWJsZSA9IHNhdmVQcm9tcHRDaG9vc2VVcmkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGhlbmFibGUudGhlbihzYXZlRG9uZSwgc2F2ZUZhaWxlZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2F2ZU5vdGVib29rQXM6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlKSB7XG4gICAgICAgICAgICAgIGlmIChfLmlzRW1wdHkobm90ZWJvb2tVcmkpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNhbm5vdCBzYXZlIG5vdGVib29rLCBub3RlYm9va1VyaSBpcyBlbXB0eVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2F2ZVN0YXJ0KCk7XG4gICAgICAgICAgICAgIHJldHVybiBzYXZlUHJvbXB0SWZPdmVyd3JpdGUobm90ZWJvb2tVcmksIHVyaVR5cGUpLnRoZW4oc2F2ZURvbmUsIHNhdmVGYWlsZWQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlTm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgIGlmIChia0V2YWx1YXRlSm9iTWFuYWdlci5pc0FueUluUHJvZ3Jlc3MoKSApIHtcbiAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cyQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgICAgIFwiQWxsIHJ1bm5pbmcgYW5kIHBlbmRpbmcgY2VsbHMgd2lsbCBiZSBjYW5jZWxsZWQuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiV2FybmluZyFcIixcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuY2FuY2VsQWxsKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2Nsb3NlTm90ZWJvb2soKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7IH0pO1xuICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICBzZWxmLl9jbG9zZU5vdGVib29rKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Nsb3NlTm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgIHZhciBjbG9zZVNlc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmNsb3NlKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpZiAoYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTW9kZWxFZGl0ZWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tUaXRsZSA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tUaXRsZSgpO1xuICAgICAgICAgICAgICAgIGJrSGVscGVyLnNob3czQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgICAgIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBcIiArIG5vdGVib29rVGl0bGUgKyBcIj9cIixcbiAgICAgICAgICAgICAgICAgICAgXCJDb25maXJtIGNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2F2ZU5vdGVib29rKCkudGhlbihjbG9zZVNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIHdpdGhvdXQgc2F2aW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBudWxsLCBcIlNhdmVcIiwgXCJEb24ndCBzYXZlXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sbGFwc2VBbGxTZWN0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmdldE5vdGVib29rTW9kZWwoKS5jZWxscywgZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsLnR5cGUgPT0gXCJzZWN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIGNlbGwuY29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0NvZGVDZWxsOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gdG9FdmFsIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsTW9kZWxcbiAgICAgICAgICAgICAgLy8gb3IgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvRXZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaGFzQ2VsbCh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHNlY3Rpb24gY2VsbCBvciByb290IGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRBbGxDb2RlQ2VsbHModG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbCh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBub3QgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IFwiaW5pdGlhbGl6YXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gYmtTZXNzaW9uTWFuYWdlci5ub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNlbGxPcC5oYXNVc2VyVGFnKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhVc2VyVGFnKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgaXQgaXMgYSBldmFsdWF0b3IgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gdW5kZWZpbmVkIHx8IChfLmlzQXJyYXkodG9FdmFsKSAmJiB0b0V2YWwubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmFsdWF0ZTogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIC8vIHRvRXZhbCBjYW4gYmUgYSB0YWdOYW1lIChzdHJpbmcpLCBlaXRoZXIgXCJpbml0aWFsaXphdGlvblwiLCBuYW1lIG9mIGFuIGV2YWx1YXRvciBvciB1c2VyIGRlZmluZWQgdGFnXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbElEIChzdHJpbmcpXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbE1vZGVsXG4gICAgICAgICAgICAgIC8vIG9yIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b0V2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmhhc0NlbGwodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcih0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBzZWN0aW9uIGNlbGwgb3Igcm9vdCBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2VsbCwganVzdCBnZXQgdGhlIGNlbGwgbW9kZWwgZnJvbSBjZWxsSURcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSBcImluaXRpYWxpemF0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjZWxsT3AuaGFzVXNlclRhZyh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSB1c2VyIHRhZyBmb3IgYSBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoVXNlclRhZyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoRXZhbHVhdG9yKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IHVuZGVmaW5lZCB8fCAoIV8uaXNBcnJheSh0b0V2YWwpICYmIHRvRXZhbC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJFUlJPUjogY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIV8uaXNBcnJheSh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmV2YWx1YXRlKHRvRXZhbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmV2YWx1YXRlQWxsKHRvRXZhbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmFsdWF0ZVJvb3Q6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICAvLyB0b0V2YWwgY2FuIGJlIGEgdGFnTmFtZSAoc3RyaW5nKSwgZWl0aGVyIFwiaW5pdGlhbGl6YXRpb25cIiwgbmFtZSBvZiBhbiBldmFsdWF0b3Igb3IgdXNlciBkZWZpbmVkIHRhZ1xuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxJRCAoc3RyaW5nKVxuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxNb2RlbFxuICAgICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9FdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5oYXNDZWxsKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldEFsbENvZGVDZWxscyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIGNlbGwsIGp1c3QgZ2V0IHRoZSBjZWxsIG1vZGVsIGZyb20gY2VsbElEXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIG5vdCBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBia1Nlc3Npb25NYW5hZ2VyLm5vdGVib29rTW9kZWxHZXRJbml0aWFsaXphdGlvbkNlbGxzKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgdXNlciB0YWcgZm9yIGEgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBpdCBpcyBhIGV2YWx1YXRvciBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aEV2YWx1YXRvcih0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSB1bmRlZmluZWQgfHwgKCFfLmlzQXJyYXkodG9FdmFsKSAmJiB0b0V2YWwubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFueXRoaW5nIHRvIGV2YWx1YXRlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNhbm5vdCBmaW5kIGFueXRoaW5nIHRvIGV2YWx1YXRlXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFfLmlzQXJyYXkodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlSm9iTWFuYWdlci5ldmFsdWF0ZVJvb3QodG9FdmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGVSb290QWxsKHRvRXZhbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmFsdWF0ZUNvZGU6IGZ1bmN0aW9uKGV2YWx1YXRvciwgY29kZSkge1xuICAgICAgICAgICAgICB2YXIgb3V0Y29udGFpbmVyID0geyB9O1xuICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia0hlbHBlci5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgICBldmFsQ29kZUlkKys7XG4gICAgICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmV2YWx1YXRlKHtcbiAgICAgICAgICAgICAgICBpZDogXCJvblRoZUZseUNlbGxfXCIrZXZhbENvZGVJZCxcbiAgICAgICAgICAgICAgICBldmFsdWF0b3I6IGV2YWx1YXRvcixcbiAgICAgICAgICAgICAgICBpbnB1dDogeyBib2R5OiBjb2RlIH0sXG4gICAgICAgICAgICAgICAgb3V0cHV0OiBvdXRjb250YWluZXJcbiAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpIHsgZGVmZXJyZWQucmVzb2x2ZShvdXRjb250YWluZXIucmVzdWx0KTsgfSwgZnVuY3Rpb24oZXJyKSB7IGRlZmVycmVkLnJlamVjdChlcnIpOyB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkRXZhbHVhdG9yOiBmdW5jdGlvbihzZXR0aW5ncykge1xuICAgICAgICAgICAgICByZXR1cm4gYWRkRXZhbHVhdG9yKHNldHRpbmdzLCB0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVFdmFsdWF0b3I6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICAgICAgICBia0V2YWx1YXRvck1hbmFnZXIucmVtb3ZlRXZhbHVhdG9yKHBsdWdpbik7XG4gICAgICAgICAgICAgIGV2YWx1YXRvck1lbnVJdGVtcyA9IF8ucmVqZWN0KGV2YWx1YXRvck1lbnVJdGVtcywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUgPT0gcGx1Z2luO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRFdmFsdWF0b3JNZW51SXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdG9yTWVudUl0ZW1zO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEJrTm90ZWJvb2tXaWRnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtOb3RlYm9va1dpZGdldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVOb3RlYm9va0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLnRvZ2dsZU5vdGVib29rTG9ja2VkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNOb3RlYm9va0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIG5hbWVzIG9mIGFsbCBlbmFibGVkIGV2YWx1YXRvcnNcbiAgICAgICAgICAgIGdldEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgZXZhbHMgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBldmFscykge1xuICAgICAgICAgICAgICAgIGlmIChldmFscy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGdldCAoYSBzdWJzZXQgb2YpIGNvZGUgY2VsbHNcbiAgICAgICAgICAgIGdldENvZGVDZWxsczogZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIC8vIGZpbHRlciBjYW4gYmUgYSB0YWdOYW1lIChzdHJpbmcpLCBlaXRoZXIgXCJpbml0aWFsaXphdGlvblwiLCBuYW1lIG9mIGFuIGV2YWx1YXRvciBvciB1c2VyIGRlZmluZWQgdGFnXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbElEIChzdHJpbmcpXG4gICAgICAgICAgICAgIGlmICghZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCBjb2RlIGNlbGxzXG4gICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldEFsbENvZGVDZWxscygpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaWx0ZXIgIT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICBlbHNlIGlmIChjZWxsT3AuaGFzQ2VsbChmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNlbGxJRFxuICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHNlY3Rpb24gY2VsbCBvciByb290IGNlbGxcbiAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldEFsbENvZGVDZWxscyhmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2VsbCwganVzdCBnZXQgdGhlIGNlbGwgbW9kZWwgZnJvbSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNlbGxPcC5nZXRDZWxsKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vdCBhIGNlbGxJRFxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IFwiaW5pdGlhbGl6YXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBia1Nlc3Npb25NYW5hZ2VyLm5vdGVib29rTW9kZWxHZXRJbml0aWFsaXphdGlvbkNlbGxzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNlbGxPcC5oYXNVc2VyVGFnKGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSB1c2VyIHRhZyBmb3IgYSBjZWxsXG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNlbGxPcC5nZXRDZWxsc1dpdGhVc2VyVGFnKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBpdCBpcyBhIGV2YWx1YXRvciBuYW1lLFxuICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoRXZhbHVhdG9yKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCAoIV8uaXNBcnJheShmaWx0ZXIpICYmIGZpbHRlci5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICAgICAgICBpZiAoXy5pc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMCA7IGkgPCBmaWx0ZXIubGVuZ3RoIDsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBmaWx0ZXJbaV07XG4gICAgICAgICAgICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICAgICAgICAgICAgby5jZWxsSWQgPSBjZWxsLmlkO1xuICAgICAgICAgICAgICAgICAgby5ldmFsdWF0b3JJZCA9IGNlbGwuZXZhbHVhdG9yO1xuICAgICAgICAgICAgICAgICAgby5jb2RlID0gY2VsbC5pbnB1dC5ib2R5O1xuICAgICAgICAgICAgICAgICAgby50YWdzID0gY2VsbC50YWdzO1xuICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuZGF0YXJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gY2VsbC5kYXRhcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsLm91dHB1dCAhPT0gdW5kZWZpbmVkICYmIGNlbGwub3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLm91dHB1dC5yZXN1bHQudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwub3V0cHV0LnJlc3VsdC50eXBlID09PSAnQmVha2VyRGlzcGxheScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gY2VsbC5vdXRwdXQucmVzdWx0Lm9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXR0eXBlID0gY2VsbC5vdXRwdXQucmVzdWx0LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGNlbGwub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG8udHlwZSA9IFwiQmVha2VyQ29kZUNlbGxcIjtcbiAgICAgICAgICAgICAgICAgIHJldC5wdXNoKG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICAgICAgICAgIG8uY2VsbElkID0gZmlsdGVyLmlkO1xuICAgICAgICAgICAgICAgIG8uZXZhbHVhdG9ySWQgPSBmaWx0ZXIuZXZhbHVhdG9yO1xuICAgICAgICAgICAgICAgIG8uY29kZSA9IGZpbHRlci5pbnB1dC5ib2R5O1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZGF0YXJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGZpbHRlci5kYXRhcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLm91dHB1dCAhPT0gdW5kZWZpbmVkICYmIGZpbHRlci5vdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIub3V0cHV0LnJlc3VsdC50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5vdXRwdXQucmVzdWx0LnR5cGUgPT09ICdCZWFrZXJEaXNwbGF5Jykge1xuICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gZmlsdGVyLm91dHB1dC5yZXN1bHQub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0dHlwZSA9IGZpbHRlci5vdXRwdXQucmVzdWx0LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBmaWx0ZXIub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBmaWx0ZXIub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgby50YWdzID0gZmlsdGVyLnRhZ3M7XG4gICAgICAgICAgICAgICAgby50eXBlID0gXCJCZWFrZXJDb2RlQ2VsbFwiO1xuICAgICAgICAgICAgICAgIHJldC5wdXNoKG8pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0IGEgY29kZSBjZWxsIGJvZHlcbiAgICAgICAgICAgIHNldENvZGVDZWxsQm9keTogZnVuY3Rpb24obmFtZSwgY29kZSkge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICBpZiAoIWNlbGxPcC5oYXNDZWxsKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgZG9lcyBub3QgZXhpc3RcIjtcbiAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcihuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGlzIG5vdCBjb2RlIGNlbGxcIjtcbiAgICAgICAgICAgICAgdmFyIGNlbGwgID0gY2VsbE9wLmdldENlbGwobmFtZSk7XG4gICAgICAgICAgICAgIGlmICggY2VsbC5pbnB1dCA9PT0gdW5kZWZpbmVkIHx8IGNlbGwuaW5wdXQuYm9keSA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGlzIG5vdCBjb2RlIGNlbGxcIjtcbiAgICAgICAgICAgICAgY2VsbC5pbnB1dC5ib2R5ID0gY29kZTtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0IGEgY29kZSBjZWxsIGV2YWx1YXRvclxuICAgICAgICAgICAgc2V0Q29kZUNlbGxFdmFsdWF0b3I6IGZ1bmN0aW9uKG5hbWUsIGV2YWx1YXRvcikge1xuICAgICAgICAgICAgICB2YXIgZXZhbHMgPSB0aGlzLmdldEV2YWx1YXRvcnMoKTtcbiAgICAgICAgICAgICAgaWYgKCBldmFscy5pbmRleE9mKGV2YWx1YXRvcik9PS0xIClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogZXZhbHVhdG9yIFwiK2V2YWx1YXRvcitcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICBpZiAoIWNlbGxPcC5oYXNDZWxsKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgZG9lcyBub3QgZXhpc3RcIjtcbiAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcihuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGlzIG5vdCBjb2RlIGNlbGxcIjtcbiAgICAgICAgICAgICAgdmFyIGNlbGwgID0gY2VsbE9wLmdldENlbGwobmFtZSk7XG4gICAgICAgICAgICAgIGlmICggY2VsbC5pbnB1dCA9PT0gdW5kZWZpbmVkIHx8IGNlbGwuaW5wdXQuYm9keSA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGlzIG5vdCBjb2RlIGNlbGxcIjtcbiAgICAgICAgICAgICAgY2VsbC5ldmFsdWF0b3IgPSBldmFsdWF0b3I7XG4gICAgICAgICAgICAgIGNlbGxPcC5yZWJ1aWxkTWFwcygpO1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXQgYSBjb2RlIGNlbGwgdGFnc1xuICAgICAgICAgICAgc2V0Q29kZUNlbGxUYWdzOiBmdW5jdGlvbihuYW1lLCB0YWdzKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIGlmICghY2VsbE9wLmhhc0NlbGwobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbCAgPSBjZWxsT3AuZ2V0Q2VsbChuYW1lKTtcbiAgICAgICAgICAgICAgY2VsbC50YWdzID0gdGFncztcbiAgICAgICAgICAgICAgY2VsbE9wLnJlYnVpbGRNYXBzKCk7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGJrQ29yZU1hbmFnZXIuc2V0QmtBcHBJbXBsKF9pbXBsKTtcblxuICAgICAgICB2YXIgZG9jdW1lbnRUaXRsZUJhc2UgPSBkb2N1bWVudC50aXRsZSA/IGRvY3VtZW50LnRpdGxlICsgJyAtICcgOiAnJztcbiAgICAgICAgdmFyIGJlYWtlckRvY3VtZW50VGl0bGUgPSAnJztcblxuICAgICAgICB2YXIgc2V0RG9jdW1lbnRUaXRsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBlZGl0ZWQgPSAkc2NvcGUuaXNFZGl0ZWQoKTtcbiAgICAgICAgICB2YXIgZmlsZW5hbWUgPSAkc2NvcGUuZmlsZW5hbWUoKTtcblxuICAgICAgICAgIGJlYWtlckRvY3VtZW50VGl0bGUgPSBmaWxlbmFtZTtcbiAgICAgICAgICBpZiAoZWRpdGVkKSBiZWFrZXJEb2N1bWVudFRpdGxlID0gJyonICsgYmVha2VyRG9jdW1lbnRUaXRsZTtcblxuICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gZG9jdW1lbnRUaXRsZUJhc2UgKyBiZWFrZXJEb2N1bWVudFRpdGxlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0VkaXRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdpc0VkaXRlZCgpJywgZnVuY3Rpb24oZWRpdGVkLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChlZGl0ZWQgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICAgICAgc2V0RG9jdW1lbnRUaXRsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZmlsZW5hbWUoKScsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCA9PT0gb2xkVmFsKSByZXR1cm47XG4gICAgICAgICAgc2V0RG9jdW1lbnRUaXRsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgaW50ZXJ2YWxJRCA9IG51bGw7XG4gICAgICAgIHZhciBzdG9wQXV0b0JhY2t1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpbnRlcnZhbElEKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnRlcnZhbElEID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHN0YXJ0QXV0b0JhY2t1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0b3BBdXRvQmFja3VwKCk7XG4gICAgICAgICAgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwLCA2MCAqIDEwMDApO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0TWVudXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51cygpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIga2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgKGUud2hpY2ggPT09IDgzKSkgeyAvLyBDdHJsICsgc1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgX2ltcGwuc2F2ZU5vdGVib29rKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgKGUud2hpY2ggPT09IDgzKSkgeyAvLyBDbWQgKyBzXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBfaW1wbC5zYXZlTm90ZWJvb2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lm5vZGVOYW1lICE9PSBcIlRFWFRBUkVBXCIpIHtcbiAgICAgICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS53aGljaCA9PT0gOTApIHsgLy8gQ3RybCArIHpcbiAgICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnVuZG8oKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmIChlLndoaWNoID09PSA5MCkpIHsgLy8gQ21kICsgelxuICAgICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIudW5kbygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmN0cmxLZXkgJiYgZS53aGljaCA9PT0gODkpIHsgLy8gQ3RybCArIHpcbiAgICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnJlZG8oKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmIChlLndoaWNoID09PSA4OSkpIHsgLy8gQ21kICsgelxuICAgICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIucmVkbygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVE9ETyBpbXBsZW1lbnQgZ2xvYmFsIHJlZG9cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQoZG9jdW1lbnQpLmJpbmQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG4gICAgICAgIHZhciBvbkRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCgpO1xuICAgICAgICAgIHN0b3BBdXRvQmFja3VwKCk7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5zZXRCa0FwcEltcGwobnVsbCk7XG4gICAgICAgICAgJChkb2N1bWVudCkudW5iaW5kKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuICAgICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IG51bGw7XG4gICAgICAgICAgYmtVdGlscy5yZW1vdmVDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBvbkRlc3Ryb3kpO1xuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAoKTtcbiAgICAgICAgICBpZiAoYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTW9kZWxFZGl0ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiWW91ciBub3RlYm9vayBoYXMgYmVlbiBlZGl0ZWQgYnV0IG5vdCBzYXZlZCwgaWYgeW91IGNsb3NlIHRoZSBwYWdlIHlvdXIgY2hhbmdlcyBtYXkgYmUgbG9zdFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYmtFdmFsdWF0ZUpvYk1hbmFnZXIuaXNBbnlJblByb2dyZXNzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlNvbWUgY2VsbHMgYXJlIHN0aWxsIHJ1bm5pbmcuIExlYXZpbmcgdGhlIHBhZ2Ugbm93IHdpbGwgY2F1c2UgY2FuY2VsbGluZyBhbmQgcmVzdWx0IGJlIGxvc3RcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgb25EZXN0cm95KCk7XG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5vbnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmNhbmNlbCgpO1xuICAgICAgICB9O1xuICAgICAgICBzdGFydEF1dG9CYWNrdXAoKTtcbiAgICAgICAgJHNjb3BlLmdvdG9Db250cm9sUGFuZWwgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChia1V0aWxzLmlzTWlkZGxlQ2xpY2soZXZlbnQpKSB7XG4gICAgICAgICAgICB3aW5kb3cub3BlbihcIi4vXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdvdG9Db250cm9sUGFuZWwoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmZpbGVuYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tUaXRsZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS4kb24oXCIkbG9jYXRpb25DaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCkge1xuICAgICAgICAgIGlmIChia0V2YWx1YXRlSm9iTWFuYWdlci5pc0FueUluUHJvZ3Jlc3MoKSAmJiBuZXh0LmluZGV4T2YoXCJmb3JjZT15ZXNcIikgPT09IC0xKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiQWxsIHJ1bm5pbmcgYW5kIHBlbmRpbmcgY2VsbHMgd2lsbCBiZSBjYW5jZWxsZWQuXCIsXG4gICAgICAgICAgICAgICAgXCJXYXJuaW5nIVwiLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuY2FuY2VsQWxsKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcm91dGVQYXJhbXMgPSB7Zm9yY2U6IFwieWVzXCJ9O1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBzcGxpdHMgPSBkZWNvZGVVUklDb21wb25lbnQobmV4dC5zcGxpdChcIiNcIilbMV0pLnNwbGl0KFwiP1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IHNwbGl0c1swXTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoID0gc3BsaXRzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YXJzID0gc2VhcmNoLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWlyID0gdi5zcGxpdCgnPScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZVBhcmFtc1twYWlyWzBdXSA9IHBhaXJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgocGF0aCkuc2VhcmNoKHJvdXRlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLnByb21wdFRvU2F2ZSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcHJvbXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocHJvbXB0ZWQpIHsgLy8gcHJldmVudCBwcm9tcHRpbmcgbXVsdGlwbGUgYXQgdGhlIHNhbWUgdGltZVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9tcHRlZCA9IHRydWU7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cyQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgXCJCZWFrZXIgc2VydmVyIGRpc2Nvbm5lY3RlZC4gRnVydGhlciBlZGl0cyB3aWxsIG5vdCBiZSBzYXZlZC48YnI+XCIgK1xuICAgICAgICAgICAgICAgIFwiU2F2ZSBjdXJyZW50IG5vdGVib29rIGFzIGEgZmlsZT9cIixcbiAgICAgICAgICAgICAgICBcIkRpc2Nvbm5lY3RlZFwiLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgLy8gXCJTYXZlXCIsIHNhdmUgdGhlIG5vdGVib29rIGFzIGEgZmlsZSBvbiB0aGUgY2xpZW50IHNpZGVcbiAgICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZHVtcERpc3BsYXlTdGF0dXMoKTtcbiAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBia1V0aWxzLnNhdmVBc0NsaWVudEZpbGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCkubm90ZWJvb2tNb2RlbEFzU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBcIm5vdGVib29rLmJrclwiKTtcbiAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAvLyBcIk5vdCBub3dcIiwgaGlqYWNrIGFsbCBrZXlwcmVzcyBldmVudHMgdG8gcHJvbXB0IGFnYWluXG4gICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAkc2NvcGUucHJvbXB0VG9TYXZlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiU2F2ZVwiLCBcIk5vdCBub3dcIiwgXCJidG4tcHJpbWFyeVwiLCBcIlwiXG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHByb21wdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHZhciBjb25uZWN0aW9uTWFuYWdlciA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgUkVDT05ORUNUX1RJTUVPVVQgPSA1MDAwOyAvLyA1IHNlY29uZHNcbiAgICAgICAgICB2YXIgT0ZGTElORV9NRVNTQUdFID0gXCJvZmZsaW5lXCI7XG4gICAgICAgICAgdmFyIENPTk5FQ1RJTkdfTUVTU0FHRSA9IFwicmVjb25uZWN0aW5nXCI7XG4gICAgICAgICAgdmFyIHJlY29ubmVjdFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIHN0YXR1c01lc3NhZ2UgPSBPRkZMSU5FX01FU1NBR0U7XG4gICAgICAgICAgdmFyIGRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAgIHZhciBpbmRpY2F0ZVJlY29ubmVjdEZhaWxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcFdhaXRpbmdSZWNvbm5lY3QoKTtcbiAgICAgICAgICAgIHN0YXR1c01lc3NhZ2UgPSBPRkZMSU5FX01FU1NBR0U7XG4gICAgICAgICAgICBia1V0aWxzLmRpc2Nvbm5lY3QoKTsgLy8gcHJldmVudCBmdXJ0aGVyIGF0dGVtcHRpbmcgdG8gcmVjb25uZWN0XG4gICAgICAgICAgICAkc2NvcGUucHJvbXB0VG9TYXZlKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgd2FpdFJlY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RhdHVzTWVzc2FnZSA9IENPTk5FQ1RJTkdfTUVTU0FHRTtcblxuICAgICAgICAgICAgLy8gd2FpdCBmb3IgNSBzY2VvbmRzLCBpZiByZWNvbm5lY3QgZGlkbid0IGhhcHBlbiwgcHJvbXB0IHRvIHNhdmVcbiAgICAgICAgICAgIGlmICghcmVjb25uZWN0VGltZW91dCkge1xuICAgICAgICAgICAgICByZWNvbm5lY3RUaW1lb3V0ID0gJHRpbWVvdXQoaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQsIFJFQ09OTkVDVF9USU1FT1VUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHVzZXIgYXR0ZW1wdHMgdG8gaW50ZXJhY3Qgd2l0aGluIDUgc2Vjb25kLCBhbHNvIHByb21wdCB0byBzYXZlXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBpbmRpY2F0ZVJlY29ubmVjdEZhaWxlZCwgdHJ1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgc3RvcFdhaXRpbmdSZWNvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZWNvbm5lY3RUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbChyZWNvbm5lY3RUaW1lb3V0KTtcbiAgICAgICAgICAgICAgcmVjb25uZWN0VGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGluZGljYXRlUmVjb25uZWN0RmFpbGVkLCB0cnVlKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uRGlzY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgd2FpdFJlY29ubmVjdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uUmVjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmlzU2Vzc2lvblZhbGlkKCkudGhlbihmdW5jdGlvbihpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIHN0b3BXYWl0aW5nUmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICBkaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIucmVjb25uZWN0RXZhbHVhdG9ycygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpbmRpY2F0ZVJlY29ubmVjdEZhaWxlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U3RhdHVzTWVzc2FnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzdGF0dXNNZXNzYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRGlzY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRpc2Nvbm5lY3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgICRzY29wZS5nZXRPZmZpbmVNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb25NYW5hZ2VyLmdldFN0YXR1c01lc3NhZ2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzRGlzY29ubmVjdGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb25NYW5hZ2VyLmlzRGlzY29ubmVjdGVkKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgYmtVdGlscy5hZGRDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcihmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgICBpZiAobXNnLnN1Y2Nlc3NmdWwgIT09ICEkc2NvcGUuaXNEaXNjb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdmFyIGRpc2Nvbm5lY3RlZCA9ICFtc2cuc3VjY2Vzc2Z1bDtcbiAgICAgICAgICAgIGlmIChkaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgY29ubmVjdGlvbk1hbmFnZXIub25EaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbm5lY3Rpb25NYW5hZ2VyLm9uUmVjb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNEaXNjb25uZWN0ZWQoKScsIGZ1bmN0aW9uKGRpc2Nvbm5lY3RlZCkge1xuICAgICAgICAgIGlmIChkaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHN0b3BBdXRvQmFja3VwKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0QXV0b0JhY2t1cCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0RG9jdW1lbnRUaXRsZSgpO1xuXG4gICAgICAgIC8vIGVuc3VyZSBhbiBleGlzdGluZyBzZXNzaW9uIGlzIGNsZWFyZWQgc28gdGhhdCB0aGUgZW1wdHkgbm90ZWJvb2sgbW9kZWxcbiAgICAgICAgLy8gbWFrZXMgdGhlIFVJIGlzIGJsYW5rIGltbWVkaWF0ZWx5IChpbnN0ZWFkIG9mIHNob3dpbmcgbGVmdG92ZXIgZnJvbSBhIHByZXZpb3VzIHNlc3Npb24pXG4gICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xlYXIoKTtcblxuICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoJy4uL2JlYWtlci9yZXN0L3V0aWwvZ2V0TWVudVBsdWdpbnMnKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1lbnVVcmxzKSB7XG4gICAgICAgICAgICBtZW51VXJscy5mb3JFYWNoKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmxvYWRNZW51UGx1Z2luKHVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbWVudWVzID0gd2luZG93LmJlYWtlci5nZXRNZW51SXRlbXMoKTtcbiAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmF0dGFjaE1lbnVzKG1lbnVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIucmVzZXQoKTtcbiAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIucmVzZXQoKTtcblxuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHNlc3Npb25JZCA9ICRyb3V0ZVBhcmFtcy5zZXNzaW9uSWQ7XG4gICAgICAgICAgdmFyIHNlc3Npb25Sb3V0ZVJlc29sdmUgPSAkcm91dGUuY3VycmVudC4kJHJvdXRlLnJlc29sdmU7XG4gICAgICAgICAgdmFyIG5ld1Nlc3Npb24gPSAkcm91dGUuY3VycmVudC5sb2NhbHMuaXNOZXdTZXNzaW9uO1xuICAgICAgICAgIGlmIChuZXdTZXNzaW9uKSB7XG4gICAgICAgICAgICBkZWxldGUgc2Vzc2lvblJvdXRlUmVzb2x2ZS5pc05ld1Nlc3Npb247XG4gICAgICAgICAgICBpZiAobmV3U2Vzc2lvbiA9PT0gXCJuZXdcIikge1xuICAgICAgICAgICAgICBsb2FkTm90ZWJvb2suZGVmYXVsdE5vdGVib29rKHNlc3Npb25JZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2FkTm90ZWJvb2suZW1wdHlOb3RlYm9vayhzZXNzaW9uSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoJHJvdXRlLmN1cnJlbnQubG9jYWxzLmlzSW1wb3J0KSB7XG4gICAgICAgICAgICBkZWxldGUgc2Vzc2lvblJvdXRlUmVzb2x2ZS5pc0ltcG9ydDtcbiAgICAgICAgICAgIGxvYWROb3RlYm9vay5mcm9tSW1wb3J0KHNlc3Npb25JZCk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkcm91dGUuY3VycmVudC5sb2NhbHMuaXNPcGVuKSB7XG4gICAgICAgICAgICBkZWxldGUgc2Vzc2lvblJvdXRlUmVzb2x2ZS5pc09wZW47XG4gICAgICAgICAgICBkZWxldGUgc2Vzc2lvblJvdXRlUmVzb2x2ZS50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJHJvdXRlLmN1cnJlbnQubG9jYWxzLnRhcmdldDtcbiAgICAgICAgICAgIHZhciByZXRyeSA9IHRydWU7XG4gICAgICAgICAgICBsb2FkTm90ZWJvb2sub3BlblVyaSh0YXJnZXQsIHNlc3Npb25JZCwgcmV0cnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2FkTm90ZWJvb2suZnJvbVNlc3Npb24oc2Vzc2lvbklkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmV2YWx1YXRlSm9iTWFuYWdlcicsIFsnYmsudXRpbHMnLCAnYmsuZXZhbHVhdG9yTWFuYWdlciddKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2JrRXZhbHVhdGVKb2JNYW5hZ2VyJywgZnVuY3Rpb24oYmtVdGlscywgYmtFdmFsdWF0b3JNYW5hZ2VyLCAkdGltZW91dCkge1xuXG4gICAgdmFyIG91dHB1dE1hcCA9IHsgfTtcblxuICAgIHZhciBlcnJvck1lc3NhZ2UgPSBmdW5jdGlvbihtc2cpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiQmVha2VyRGlzcGxheVwiLFxuICAgICAgICBpbm5lcnR5cGU6IFwiRXJyb3JcIixcbiAgICAgICAgb2JqZWN0OiBtc2dcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgdGV4dE1lc3NhZ2UgPSBmdW5jdGlvbihtc2cpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiQmVha2VyRGlzcGxheVwiLFxuICAgICAgICBpbm5lcnR5cGU6IFwiVGV4dFwiLFxuICAgICAgICBvYmplY3Q6IG1zZ1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBFUlJPUl9NRVNTQUdFX09OX0VBUkxJRVJfRkFJTFVSRSA9XG4gICAgICBlcnJvck1lc3NhZ2UoXCJFdmFsdWF0aW9uIGNhbmNlbGxlZCBkdWUgdG8gYSBmYWlsdXJlIG9mIGFuIGVhcmxpZXIgY2VsbCBldmFsdWF0aW9uXCIpO1xuICAgIHZhciBFUlJPUl9NRVNTQUdFX09OX0NBTkNFTCA9XG4gICAgICBlcnJvck1lc3NhZ2UoXCIuLi4gY2FuY2VsbGVkIVwiKTtcbiAgICB2YXIgTUVTU0FHRV9QRU5ESU5HID1cbiAgICAgIHRleHRNZXNzYWdlKFwicGVuZGluZ1wiKTtcbiAgICB2YXIgTUVTU0FHRV9XQUlUSU5HX0ZPUl9FVkFMVVRPUl9JTklUID1cbiAgICAgIHRleHRNZXNzYWdlKFwid2FpdGluZyBmb3IgZXZhbHVhdG9yIGluaXRpYWxpemF0aW9uIC4uLlwiKTtcblxuICAgIHZhciBqb2JRdWV1ZSA9IChmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIF9xdWV1ZSA9IFtdO1xuICAgICAgdmFyIF9qb2JJblByb2dyZXNzID0gW107XG4gICAgICB2YXIgcnVubmluZyA9IHt9O1xuXG4gICAgICB2YXIgZXZhbHVhdGVKb2IgPSBmdW5jdGlvbihqb2IpIHtcbiAgICAgICAgam9iLmV2YWx1YXRvciA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3Ioam9iLmV2YWx1YXRvcklkKTtcbiAgICAgICAgaWYgKGpvYi5ldmFsdWF0b3IpIHtcbiAgICAgICAgICBia1V0aWxzLmxvZyhcImV2YWx1YXRlXCIsIHtcbiAgICAgICAgICAgIHBsdWdpbjogam9iLmV2YWx1YXRvci5wbHVnaW5OYW1lLFxuICAgICAgICAgICAgbGVuZ3RoOiBqb2IuY29kZS5sZW5ndGggfSk7XG4gICAgICAgICAgcmV0dXJuIGpvYi5ldmFsdWF0b3IuZXZhbHVhdGUoam9iLmNvZGUsIGpvYi5vdXRwdXQsIG91dHB1dE1hcFtqb2IuY2VsbElkXSk7XG4gICAgICAgIH1cbiAgICAgICAgam9iLm91dHB1dC5yZXN1bHQgPSBNRVNTQUdFX1dBSVRJTkdfRk9SX0VWQUxVVE9SX0lOSVQ7XG4gICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIud2FpdEV2YWx1YXRvcihqb2IuZXZhbHVhdG9ySWQpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgIGpvYi5ldmFsdWF0b3IgPSBldjtcbiAgICAgICAgICAgIGlmIChldiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICByZXR1cm4gam9iLmV2YWx1YXRvci5ldmFsdWF0ZShqb2IuY29kZSwgam9iLm91dHB1dCwgb3V0cHV0TWFwW2pvYi5jZWxsSWRdKTtcbiAgICAgICAgICAgIHJldHVybiBcImNhbm5vdCBmaW5kIGV2YWx1YXRvciBmb3IgXCIram9iLmV2YWx1YXRvcklkO1xuICAgICAgICAgIH0gKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBkb05leHQgPSBmdW5jdGlvbihpbm5leHQpIHtcbiAgICAgICAgdmFyIGpvYjtcblxuICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAvLyBzdGFydCBhIG5ldyByb290IGpvYlxuICAgICAgICAgIGpvYiA9IF9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIGhhdmUgc29tZXRoaW5nIGV4ZWN1dGluZy4uLlxuICAgICAgICAgIHZhciBsYXN0ID0gX2pvYkluUHJvZ3Jlc3NbX2pvYkluUHJvZ3Jlc3MubGVuZ3RoLTFdO1xuICAgICAgICAgIGlmIChsYXN0LnJ1bmNoaWxkICE9PSB1bmRlZmluZWQgJiYgbGFzdC5ydW5jaGlsZC5maW5pc2hlZCkge1xuICAgICAgICAgICAgbGFzdC5ydW5jaGlsZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxhc3QuZmluaXNoZWQgJiYgbGFzdC5jYW5jZWxfZGVmZXJyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHBhcmVudCwgaWR4O1xuICAgICAgICAgICAgLy8gdGhpcyBqb2IgaGFzIGZpbmlzaGVkIGJ1dCBkdWUgdG8gY2FuY2VsbGF0aW9uXG4gICAgICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAvLyB3ZSBoYXZlIGEgcGFyZW50IGpvYiB0byBjYW5jZWxcbiAgICAgICAgICAgICAgcGFyZW50ID0gX2pvYkluUHJvZ3Jlc3NbX2pvYkluUHJvZ3Jlc3MubGVuZ3RoLTJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcGFyZW50LmNhbmNlbF9kZWZlcnJlZCA9IGxhc3QuY2FuY2VsX2RlZmVycmVkO1xuICAgICAgICAgICAgICBpZiAocGFyZW50LmV2YWx1YXRvciAmJiBwYXJlbnQuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbikge1xuICAgICAgICAgICAgICAgIHBhcmVudC5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yKGlkeCA9IDA7IGlkeDxwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpZHhdLm91dHB1dC5yZXN1bHQ9RVJST1JfTUVTU0FHRV9PTl9DQU5DRUw7XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2lkeF0ud2hlbmRvbmUucmVqZWN0KCcuLi4gY2FuY2VsbGVkIScpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW3BhcmVudC5jaGlsZHJlbltpZHhdLmNlbGxJZF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3IoaWR4ID0gMDsgaWR4PF9xdWV1ZS5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgX3F1ZXVlW2lkeF0ub3V0cHV0LnJlc3VsdD1FUlJPUl9NRVNTQUdFX09OX0NBTkNFTDtcbiAgICAgICAgICAgICAgICBfcXVldWVbaWR4XS53aGVuZG9uZS5yZWplY3QoJy4uLiBjYW5jZWxsZWQhJyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbX3F1ZXVlW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBfcXVldWUgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3Qud2hlbmRvbmUucmVqZWN0KCcuLi4gY2FuY2VsbGVkIScpO1xuICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbbGFzdC5jZWxsSWRdO1xuICAgICAgICAgICAgX2pvYkluUHJvZ3Jlc3MucG9wKCk7XG4gICAgICAgICAgICBia0hlbHBlci5jbGVhclN0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBsYXN0LmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIGxhc3QuY2VsbElkLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBia0hlbHBlci5zaG93U3RhdHVzKFwiRXZhbHVhdGluZyBcIiArIHBhcmVudC5ldmFsdWF0b3JJZCArIFwiIGNlbGwgXCIgKyBwYXJlbnQuY2VsbElkLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxhc3QuY2FuY2VsX2RlZmVycmVkLnJlc29sdmUoJ2RvbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvTmV4dCh0cnVlKTtcbiAgICAgICAgICAgIGlmIChpbm5leHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgYmtIZWxwZXIudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGxhc3QucnVuY2hpbGQgPT09IHVuZGVmaW5lZCAmJiBsYXN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGNhbiBzdGFydCBhIGNoaWxkcmVuXG4gICAgICAgICAgICBqb2IgPSBsYXN0LmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgbGFzdC5jaGlsZHJlbi5zaGlmdCgpO1xuICAgICAgICAgICAgbGFzdC5ydW5jaGlsZCA9IGpvYjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QuZmluaXNoZWQgJiYgbGFzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaGFzIGZpbmlzaGVkXG4gICAgICAgICAgICBpZiAobGFzdC5lcnJvcikge1xuICAgICAgICAgICAgICBsYXN0LndoZW5kb25lLnJlamVjdChsYXN0LmVycm9yKTtcbiAgICAgICAgICAgICAgaWYgKF9qb2JJblByb2dyZXNzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIGEgcGFyZW50IGpvYiB0byBjYW5jZWxcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gX2pvYkluUHJvZ3Jlc3NbX2pvYkluUHJvZ3Jlc3MubGVuZ3RoLTJdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgICAgICAgICBmb3IoaWR4ID0gMDsgaWR4PHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW5baWR4XS5vdXRwdXQucmVzdWx0PUVSUk9SX01FU1NBR0VfT05fRUFSTElFUl9GQUlMVVJFO1xuICAgICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2lkeF0ud2hlbmRvbmUucmVqZWN0KFwiRXZhbHVhdGlvbiBjYW5jZWxsZWQgZHVlIHRvIGEgZmFpbHVyZSBvZiBhbiBlYXJsaWVyIGNlbGwgZXZhbHVhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW3BhcmVudC5jaGlsZHJlbltpZHhdLmNlbGxJZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpZHg7XG4gICAgICAgICAgICAgICAgZm9yKGlkeCA9IDA7IGlkeDxfcXVldWUubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgX3F1ZXVlW2lkeF0ub3V0cHV0LnJlc3VsdD1FUlJPUl9NRVNTQUdFX09OX0VBUkxJRVJfRkFJTFVSRTtcbiAgICAgICAgICAgICAgICAgIF9xdWV1ZVtpZHhdLndoZW5kb25lLnJlamVjdChcIkV2YWx1YXRpb24gY2FuY2VsbGVkIGR1ZSB0byBhIGZhaWx1cmUgb2YgYW4gZWFybGllciBjZWxsIGV2YWx1YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgcnVubmluZ1tfcXVldWVbaWR4XS5jZWxsSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfcXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgIGxhc3Qud2hlbmRvbmUucmVzb2x2ZShsYXN0Lm91dHB1dCk7XG4gICAgICAgICAgICBia0hlbHBlci5jbGVhclN0YXR1cyhcIkV2YWx1YXRpbmcgXCIgKyBsYXN0LmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIGxhc3QuY2VsbElkLCB0cnVlKTtcbiAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW2xhc3QuY2VsbElkXTtcbiAgICAgICAgICAgIF9qb2JJblByb2dyZXNzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKF9qb2JJblByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgam9iID0gX2pvYkluUHJvZ3Jlc3NbX2pvYkluUHJvZ3Jlc3MubGVuZ3RoLTFdO1xuICAgICAgICAgICAgICBia0hlbHBlci5zaG93U3RhdHVzKFwiRXZhbHVhdGluZyBcIiArIGpvYi5ldmFsdWF0b3JJZCArIFwiIGNlbGwgXCIgKyBqb2IuY2VsbElkLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvTmV4dCh0cnVlKTtcbiAgICAgICAgICAgIGlmIChpbm5leHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgYmtIZWxwZXIudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGpvYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7IGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTsgfSwgMCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX2pvYkluUHJvZ3Jlc3MucHVzaChqb2IpO1xuICAgICAgICBia0hlbHBlci5zaG93U3RhdHVzKFwiRXZhbHVhdGluZyBcIiArIGpvYi5ldmFsdWF0b3JJZCArIFwiIGNlbGwgXCIgKyBqb2IuY2VsbElkLCB0cnVlKTtcblxuICAgICAgICBldmFsdWF0ZUpvYihqb2IpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBqb2IuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIGpvYi5vdXRwdXQgPSBkYXRhO1xuICAgICAgICAgIGRvTmV4dCgpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBqb2IuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIGpvYi5lcnJvciA9IGVycjtcbiAgICAgICAgICBkb05leHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbm5leHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBia0hlbHBlci51cGRhdGVTdGF0dXMoKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24oam9iKSB7XG4gICAgICAgICAgcnVubmluZ1tqb2IuY2VsbElkXSA9IHRydWU7XG4gICAgICAgICAgX3F1ZXVlLnB1c2goam9iKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkQ2hpbGRyZW46IGZ1bmN0aW9uKGpvYiwgY2hpbGQpIHtcbiAgICAgICAgICBydW5uaW5nW2NoaWxkLmNlbGxJZF0gPSB0cnVlO1xuICAgICAgICAgIGpvYi5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q3VycmVudEpvYjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF9qb2JJblByb2dyZXNzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZXR1cm4gX2pvYkluUHJvZ3Jlc3NbX2pvYkluUHJvZ3Jlc3MubGVuZ3RoLTFdO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbEFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgICBmb3IgKCBpZHg9MDsgaWR4PF9xdWV1ZS5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBfcXVldWVbaWR4XS5vdXRwdXQub3V0cHV0LnJlc3VsdCA9IEVSUk9SX01FU1NBR0VfT05fQ0FOQ0VMO1xuICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbX3F1ZXVlW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgX3F1ZXVlID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIGlzUnVubmluZzogZnVuY3Rpb24obikge1xuICAgICAgICAgIHJldHVybiBydW5uaW5nW25dID09PSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICB0aWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia1V0aWxzLmZjYWxsKGRvTmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBldmFsdWF0ZSBhIGNlbGwgKGFzIGEgc3ViY2VsbCBvZiBjdXJyZW50bHkgcnVubmluZyBjZWxsKVxuICAgICAgZXZhbHVhdGU6IGZ1bmN0aW9uKGNlbGwsIG5vdGljaykge1xuICAgICAgICB2YXIgcGFyZW50ID0gam9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgICBpZiAocGFyZW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVSb290KGNlbGwpO1xuXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgaWYgKGpvYlF1ZXVlLmlzUnVubmluZyhjZWxsLmlkKSkge1xuICAgICAgICAgIGJrSGVscGVyLnNob3dUcmFuc2llbnRTdGF0dXMoXCJFUlJPUjogcmVzdGFydCBibG9ja2VkIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVEFSVCBQUk9ISUJJVEVEIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIC8vIHByZXZlbnQgc2VsZiByZXN0YXJ0XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiUkVTVEFSVCBQUk9ISUJJVEVEIGZvciBjZWxsIFwiK2NlbGwuaWQpO1xuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGNlbGwub3V0cHV0LnJlc3VsdCA9IE1FU1NBR0VfUEVORElORztcbiAgICAgICAgaWYgKCFjZWxsLm91dHB1dCkge1xuICAgICAgICAgIGNlbGwub3V0cHV0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2YWxKb2IgPSB7XG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgY2VsbElkOiBjZWxsLmlkLFxuICAgICAgICAgIGV2YWx1YXRvcklkOiBjZWxsLmV2YWx1YXRvcixcbiAgICAgICAgICBjb2RlOiBjZWxsLmlucHV0LmJvZHksXG4gICAgICAgICAgb3V0cHV0OiBjZWxsLm91dHB1dCxcbiAgICAgICAgICByZXRyeTogMCxcbiAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgICAgcnVuY2hpbGQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgd2hlbmRvbmUgOiBkZWZlcnJlZFxuICAgICAgICB9O1xuICAgICAgICBqb2JRdWV1ZS5hZGRDaGlsZHJlbihwYXJlbnQsZXZhbEpvYik7XG4gICAgICAgIGlmIChub3RpY2sgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBqb2JRdWV1ZS50aWNrKCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIC8vIGV2YWx1YXRlIGEgY2VsbCBpbiB0b3AgbGV2ZWwgY29udGV4dFxuICAgICAgZXZhbHVhdGVSb290OiBmdW5jdGlvbihjZWxsLCBub3RpY2spIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBpZiAoam9iUXVldWUuaXNSdW5uaW5nKGNlbGwuaWQpKSB7XG4gICAgICAgICAgYmtIZWxwZXIuc2hvd1RyYW5zaWVudFN0YXR1cyhcIkVSUk9SOiByZXN0YXJ0IGJsb2NrZWQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSRVNUQVJUIFBST0hJQklURUQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgLy8gcHJldmVudCBzZWxmIHJlc3RhcnRcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJSRVNUQVJUIFBST0hJQklURUQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbC5vdXRwdXQucmVzdWx0ID0gTUVTU0FHRV9QRU5ESU5HO1xuICAgICAgICBpZiAoIWNlbGwub3V0cHV0KSB7XG4gICAgICAgICAgY2VsbC5vdXRwdXQgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZhbEpvYiA9IHtcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBjZWxsSWQ6IGNlbGwuaWQsXG4gICAgICAgICAgZXZhbHVhdG9ySWQ6IGNlbGwuZXZhbHVhdG9yLFxuICAgICAgICAgIGNvZGU6IGNlbGwuaW5wdXQuYm9keSxcbiAgICAgICAgICBvdXRwdXQ6IGNlbGwub3V0cHV0LFxuICAgICAgICAgIHJldHJ5OiAwLFxuICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICBydW5jaGlsZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICB3aGVuZG9uZSA6IGRlZmVycmVkXG4gICAgICAgIH07XG4gICAgICAgIGpvYlF1ZXVlLmFkZChldmFsSm9iKTtcbiAgICAgICAgaWYgKG5vdGljayA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGpvYlF1ZXVlLnRpY2soKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgLy8gZXZhbHVhdGUgYSBjZWxsIChhcyBhIHN1YmNlbGwgb2YgY3VycmVudGx5IHJ1bm5pbmcgY2VsbClcbiAgICAgIGV2YWx1YXRlQWxsOiBmdW5jdGlvbihjZWxscykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBwcm9taXNlcyA9IF8oY2VsbHMpLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuZXZhbHVhdGUoY2VsbCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBqb2JRdWV1ZS50aWNrKCk7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmFsbChwcm9taXNlcyk7XG4gICAgICB9LFxuICAgICAgLy8gZXZhbHVhdGUgYWxsIGNlbGxzIGluIHRvcCBsZXZlbCBjb250ZXh0XG4gICAgICBldmFsdWF0ZVJvb3RBbGw6IGZ1bmN0aW9uKGNlbGxzLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvbWlzZXMgPSBfKGNlbGxzKS5tYXAoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmV2YWx1YXRlUm9vdChjZWxsLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpvYlF1ZXVlLnRpY2soKTtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuYWxsKHByb21pc2VzKTtcbiAgICAgIH0sXG4gICAgICBpc0NhbmNlbGxhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRKb2IgPSBqb2JRdWV1ZS5nZXRDdXJyZW50Sm9iKCk7XG4gICAgICAgIHJldHVybiAhIShjdXJyZW50Sm9iICYmIGN1cnJlbnRKb2IuZXZhbHVhdG9yICYmIGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbik7XG4gICAgICB9LFxuICAgICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRKb2IgPSBqb2JRdWV1ZS5nZXRDdXJyZW50Sm9iKCk7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcblxuICAgICAgICBpZiAoY3VycmVudEpvYiAmJiBjdXJyZW50Sm9iLmV2YWx1YXRvcikge1xuICAgICAgICAgIGlmIChjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRKb2IuY2FuY2VsX2RlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgICAgICBjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbEFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyZW50Sm9iID0gam9iUXVldWUuZ2V0Q3VycmVudEpvYigpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG5cbiAgICAgICAgam9iUXVldWUuY2FuY2VsQWxsKCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRKb2IgJiYgY3VycmVudEpvYi5ldmFsdWF0b3IpIHtcbiAgICAgICAgICBpZiAoY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50Sm9iLmNhbmNlbF9kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgICAgICAgICAgY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBpc0FueUluUHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISFqb2JRdWV1ZS5nZXRDdXJyZW50Sm9iKCk7XG4gICAgICB9LFxuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNhbmNlbEFsbCgpO1xuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyT3V0cHV0Q2VsbDogZnVuY3Rpb24oaWQsIG91dCkge1xuICAgICAgICBvdXRwdXRNYXBbaWRdID0gb3V0O1xuICAgICAgfSxcbiAgICAgIGRlUmVnaXN0ZXJPdXRwdXRDZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBkZWxldGUgb3V0cHV0TWFwW2lkXTtcbiAgICAgIH0sXG4gICAgICBnZXRPdXRwdXRDZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gb3V0cHV0TWFwW2lkXTtcbiAgICAgIH0sXG5cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmV2YWx1YXRvclBsdWdpbk1hbmFnZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuZXZhbHVhdG9yTWFuYWdlcicsIFsnYmsudXRpbHMnLCAnYmsuZXZhbHVhdGVQbHVnaW5NYW5hZ2VyJ10pO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia0V2YWx1YXRvck1hbmFnZXInLCBmdW5jdGlvbiAoYmtVdGlscywgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIpIHtcblxuICAgIHZhciBldmFsdWF0b3JzID0ge307XG4gICAgdmFyIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycyA9IFtdO1xuICAgIHJldHVybiB7XG4gICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGV2YWx1YXRvcnMgPSB7fTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVFdmFsdWF0b3I6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXZhbHVhdG9ycykge1xuICAgICAgICAgIHZhciBlID0gZXZhbHVhdG9yc1trZXldO1xuICAgICAgICAgIGlmIChlLnBsdWdpbk5hbWUgPT09IHBsdWdpbikge1xuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihlLmV4aXQpKSB7XG4gICAgICAgICAgICAgIGUuZXhpdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIGV2YWx1YXRvcnNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBuZXdFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvclNldHRpbmdzKSB7XG4gICAgICAgIGlmIChsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMuaW5kZXhPZihldmFsdWF0b3JTZXR0aW5ncykgPT09IC0xKVxuXHQgICAgICBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMucHVzaChldmFsdWF0b3JTZXR0aW5ncyk7XG5cdCAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG5cdCAgICBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5nZXRFdmFsdWF0b3JGYWN0b3J5QW5kU2hlbGwoZXZhbHVhdG9yU2V0dGluZ3MpXG5cdCAgICAudGhlbihmdW5jdGlvbihldmFsdWF0b3IpIHtcblx0ICAgICAgaWYoZXZhbHVhdG9yID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJjYW5ub3QgY3JlYXRlIGV2YWx1YXRvciBmYWN0b3J5XCIpO1xuXHQgICAgICAgIHJldHVybjtcblx0ICAgICAgfVxuXHQgICAgICBpZiAoXy5pc0VtcHR5KGV2YWx1YXRvclNldHRpbmdzLm5hbWUpKSB7XG5cdCAgICAgICAgaWYgKCFldmFsdWF0b3JzW2V2YWx1YXRvci5wbHVnaW5OYW1lXSkge1xuXHQgICAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3MubmFtZSA9IGV2YWx1YXRvci5wbHVnaW5OYW1lO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICBldmFsdWF0b3JTZXR0aW5ncy5uYW1lID0gZXZhbHVhdG9yLnBsdWdpbk5hbWUgKyBcIl9cIiArIGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblxuXHQgICAgICBpZiAoIWV2YWx1YXRvclNldHRpbmdzLnZpZXcpIHtcblx0ICAgICAgICBldmFsdWF0b3JTZXR0aW5ncy52aWV3ID0ge307XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKCFldmFsdWF0b3JTZXR0aW5ncy52aWV3LmNtKSB7XG5cdCAgICAgICAgZXZhbHVhdG9yU2V0dGluZ3Mudmlldy5jbSA9IHt9O1xuXHQgICAgICB9XG5cdCAgICAgIGV2YWx1YXRvclNldHRpbmdzLnZpZXcuY20ubW9kZSA9IGV2YWx1YXRvci5jbU1vZGU7XG5cdCAgICAgIGV2YWx1YXRvcnNbZXZhbHVhdG9yU2V0dGluZ3MubmFtZV0gPSBldmFsdWF0b3I7XG5cdCAgICAgIGlmICggZXZhbHVhdG9yU2V0dGluZ3MuZGVmZXJyZWQgIT09IHVuZGVmaW5lZCApIHtcblx0ICAgICAgICBldmFsdWF0b3JTZXR0aW5ncy5kZWZlcnJlZC5yZXNvbHZlKGV2YWx1YXRvcik7XG5cdCAgICAgICAgZGVsZXRlIGV2YWx1YXRvclNldHRpbmdzLmRlZmVycmVkO1xuXHQgICAgICB9XG5cdCAgICAgIGRlZmVycmVkLnJlc29sdmUoZXZhbHVhdG9yKTtcblx0ICAgIH0pXG5cdCAgICAuZmluYWxseShmdW5jdGlvbigpIHtcblx0ICAgICAgdmFyIGluZGV4ID0gbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzLmluZGV4T2YoZXZhbHVhdG9yU2V0dGluZ3MpO1xuXHQgICAgICBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcblx0ICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvcklkKSB7XG4gICAgICAgIHJldHVybiBldmFsdWF0b3JzW2V2YWx1YXRvcklkXTtcbiAgICAgIH0sXG4gICAgICB3YWl0RXZhbHVhdG9yOiBmdW5jdGlvbihldmFsdWF0b3JJZCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGlmIChldmFsdWF0b3JzW2V2YWx1YXRvcklkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShldmFsdWF0b3JzW2V2YWx1YXRvcklkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMubGVuZ3RoOyBpICsrICkge1xuICAgICAgICAgICAgaWYgKGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9yc1tpXS5uYW1lID09PSBldmFsdWF0b3JJZCkge1xuICAgICAgICAgICAgICBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnNbaV0uZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpID09PSBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcblxuICAgICAgZ2V0VmlzdWFsUGFyYW1zOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGlmIChldmFsdWF0b3JzW25hbWVdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmdldFZpc3VhbFBhcmFtcyhuYW1lKTtcbiAgICAgICAgdmFyIHYgPSB7IH07XG4gICAgICAgIHZhciBlID0gZXZhbHVhdG9yc1tuYW1lXTtcbiAgICAgICAgdmFyIGYgPSBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5nZXRWaXN1YWxQYXJhbXMobmFtZSk7XG4gICAgICAgIGlmIChlLmJnQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmJnQ29sb3IgPSBlLmJnQ29sb3I7XG4gICAgICAgIGVsc2UgaWYgKGYgIT09IHVuZGVmaW5lZCAmJiBmLmJnQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmJnQ29sb3IgPSBmLmJnQ29sb3I7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB2LmJnQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgIGlmIChlLmZnQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmZnQ29sb3IgPSBlLmZnQ29sb3I7XG4gICAgICAgIGVsc2UgaWYgKGYgIT09IHVuZGVmaW5lZCAmJiBmLmZnQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmZnQ29sb3IgPSBmLmZnQ29sb3I7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB2LmZnQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgIGlmIChlLmJvcmRlckNvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5ib3JkZXJDb2xvciA9IGUuYm9yZGVyQ29sb3I7XG4gICAgICAgIGVsc2UgaWYgKGYgIT09IHVuZGVmaW5lZCAmJiBmLmJvcmRlckNvbG9yICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdi5ib3JkZXJDb2xvciA9IGYuYm9yZGVyQ29sb3I7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB2LmJvcmRlckNvbG9yID0gXCJcIjtcblxuICAgICAgICBpZiAoZS5zaG9ydE5hbWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LnNob3J0TmFtZSA9IGUuc2hvcnROYW1lO1xuICAgICAgICBlbHNlIGlmIChmICE9PSB1bmRlZmluZWQgJiYgZi5zaG9ydE5hbWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LnNob3J0TmFtZSA9IGYuc2hvcnROYW1lO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdi5zaG9ydE5hbWUgPSBcIlwiO1xuXG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfSxcbiAgICAgIGdldEFsbEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZXZhbHVhdG9ycztcbiAgICAgIH0sXG4gICAgICBnZXRMb2FkaW5nRXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnM7XG4gICAgICB9LFxuICAgICAgcmVjb25uZWN0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZWFjaChldmFsdWF0b3JzLCBmdW5jdGlvbihldikge1xuICAgICAgICAgIGlmIChldiAmJiBfLmlzRnVuY3Rpb24oZXYucmVjb25uZWN0KSkge1xuICAgICAgICAgICAgZXYucmVjb25uZWN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBleGl0QW5kUmVtb3ZlQWxsRXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZWFjaChldmFsdWF0b3JzLCBmdW5jdGlvbihldikge1xuICAgICAgICAgIGlmIChldiAmJiBfLmlzRnVuY3Rpb24oZXYuZXhpdCkpIHtcbiAgICAgICAgICAgIGV2LmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBldmFsdWF0b3JzID0ge307XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyXG4gKiBOb3RlYm9vayBDZWxsIE1vZGVsIGRvZXNuJ3Qgb3duIHRoZSBub3RlYm9vayBtb2RlbC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyJywgW10pO1xuXG4gIC8vIHV0aWxpdGllc1xuICB2YXIgZ2VuZXJhdGVDZWxsTWFwID0gZnVuY3Rpb24oY2VsbHMpIHtcbiAgICB2YXIgZGVjb3JhdGVkQ2VsbHMgPSB7XG4gICAgICAncm9vdCc6IHtcbiAgICAgICAgaWQ6ICdyb290JyxcbiAgICAgICAgcmF3OiBudWxsLFxuICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIGFsbERlc2NlbmRhbnRzOiBbXVxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFjZWxscyB8fCBjZWxscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBkZWNvcmF0ZWRDZWxscztcbiAgICB9XG5cbiAgICBjZWxscy5mb3JFYWNoKGZ1bmN0aW9uKGNlbGwsIGluZGV4KSB7XG4gICAgICBkZWNvcmF0ZWRDZWxsc1tjZWxsLmlkXSA9IHtcbiAgICAgICAgaWQ6IGNlbGwuaWQsXG4gICAgICAgIHJhdzogY2VsbCxcbiAgICAgICAgcmF3SW5kZXg6IGluZGV4LFxuICAgICAgICBsZXZlbDogY2VsbC5sZXZlbCA+IDAgPyBjZWxsLmxldmVsIDogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxuICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgYWxsRGVzY2VuZGFudHM6IFtdXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdmFyIHN0YWNrID0gW2RlY29yYXRlZENlbGxzLnJvb3RdO1xuICAgIHN0YWNrLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgfTtcbiAgICBfKGRlY29yYXRlZENlbGxzKS5lYWNoKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIGlmIChjZWxsLmlkID09PSAncm9vdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHN0YWNrLnBlZWsoKS5sZXZlbCA+PSBjZWxsLmxldmVsKSB7XG4gICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgfVxuICAgICAgZGVjb3JhdGVkQ2VsbHNbc3RhY2sucGVlaygpLmlkXS5jaGlsZHJlbi5wdXNoKGNlbGwuaWQpO1xuICAgICAgZGVjb3JhdGVkQ2VsbHNbY2VsbC5pZF0ucGFyZW50ID0gc3RhY2sucGVlaygpLmlkO1xuICAgICAgc3RhY2suZm9yRWFjaChmdW5jdGlvbihjKSB7XG4gICAgICAgIGRlY29yYXRlZENlbGxzW2MuaWRdLmFsbERlc2NlbmRhbnRzLnB1c2goY2VsbC5pZCk7XG4gICAgICB9KTtcbiAgICAgIHN0YWNrLnB1c2goY2VsbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlY29yYXRlZENlbGxzO1xuICB9O1xuXG4gIHZhciBnZW5lcmF0ZVRhZ01hcCA9IGZ1bmN0aW9uKGNlbGxNYXApIHtcbiAgICAvLyBpbml0aWFsaXphdGlvbiBjZWxsc1xuICAgIHZhciBpbml0aWFsaXphdGlvbkNlbGxzID0gXyhjZWxsTWFwKS5jaGFpbigpXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnJhdyAmJiBjZWxsLnJhdy5pbml0aWFsaXphdGlvbjtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgaWYgKGNlbGwucmF3LnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfKGNlbGwuYWxsRGVzY2VuZGFudHMpLmNoYWluKClcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKGNoaWxkSWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjZWxsTWFwW2NoaWxkSWRdO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYy5yYXcudHlwZSA9PT0gJ2NvZGUnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnZhbHVlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmxhdHRlbigpXG4gICAgICAgIC51bmlxKClcbiAgICAgICAgLnNvcnRCeShmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucmF3SW5kZXg7XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnJhdztcbiAgICAgICAgfSlcbiAgICAgICAgLnZhbHVlKCk7XG5cbiAgICAvLyBldmFsdWF0b3JzXG4gICAgdmFyIGV2YWx1YXRvck1hcCA9IHt9O1xuICAgIGV2YWx1YXRvck1hcC5hZGQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXNba2V5XSkge1xuICAgICAgICB0aGlzW2tleV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXNba2V5XS5wdXNoKHZhbHVlKTtcbiAgICB9O1xuICAgIF8oY2VsbE1hcCkuY2hhaW4oKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yYXcgJiYgY2VsbC5yYXcudHlwZSA9PT0gJ2NvZGUnO1xuICAgICAgICB9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbihjb2RlQ2VsbCkge1xuICAgICAgICAgIGV2YWx1YXRvck1hcC5hZGQoY29kZUNlbGwucmF3LmV2YWx1YXRvciwgY29kZUNlbGwucmF3KTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyB1c2VyIHRhZ3NcbiAgICB2YXIgdXNlclRhZ3NNYXAgPSB7fTtcbiAgICB1c2VyVGFnc01hcC5hZGQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXNba2V5XSkge1xuICAgICAgICB0aGlzW2tleV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXNba2V5XS5wdXNoKHZhbHVlKTtcbiAgICB9O1xuICAgIF8oY2VsbE1hcCkuY2hhaW4oKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgcmV0dXJuIGNlbGwucmF3ICYmIGNlbGwucmF3LnR5cGUgPT09ICdjb2RlJyAmJiBjZWxsLnJhdy50YWdzICE9PSB1bmRlZmluZWQgJiYgY2VsbC5yYXcudGFncyAhPT0gJyc7XG4gICAgfSlcbiAgICAuZWFjaChmdW5jdGlvbihjb2RlQ2VsbCkge1xuICAgICAgdmFyIHJlID0gL1xccysvO1xuICAgICAgdmFyIHRhZ3MgPSBjb2RlQ2VsbC5yYXcudGFncy5zcGxpdChyZSk7XG4gICAgICB2YXIgaTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVzZXJUYWdzTWFwLmFkZCh0YWdzW2ldLCBjb2RlQ2VsbC5yYXcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXRpYWxpemF0aW9uOiBpbml0aWFsaXphdGlvbkNlbGxzLFxuICAgICAgZXZhbHVhdG9yOiBldmFsdWF0b3JNYXAsXG4gICAgICB1c2VydGFnczogdXNlclRhZ3NNYXBcbiAgICB9O1xuICB9O1xuXG4gIHZhciByZXBsYWNlV2hvbGVBcnJheSA9IGZ1bmN0aW9uKG9sZEFycmF5LCBuZXdBcnJheSkge1xuICAgIHZhciBhcmdzID0gXy5mbGF0dGVuKFswLCBvbGRBcnJheS5sZW5ndGgsIG5ld0FycmF5XSk7XG4gICAgb2xkQXJyYXkuc3BsaWNlLmFwcGx5KG9sZEFycmF5LCBhcmdzKTtcbiAgfTtcblxuICBtb2R1bGUuZmFjdG9yeSgnYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXInLCBmdW5jdGlvbigkdGltZW91dCwgJHJvb3RTY29wZSkge1xuICAgIHZhciBjZWxscyA9IFtdO1xuICAgIHZhciBjZWxsTWFwID0ge307XG4gICAgdmFyIHRhZ01hcCA9IHt9O1xuICAgIHZhciB1bmRvQWN0aW9uID0ge307XG4gICAgdmFyIHVuZG9BY3Rpb24yID0ge307XG4gICAgdmFyIHJlZG9BY3Rpb24gPSB7fTtcbiAgICB2YXIgcmVkb0FjdGlvbjIgPSB7fTtcbiAgICB2YXIgcmVjcmVhdGVDZWxsTWFwID0gZnVuY3Rpb24oZG9Ob3RDbGVhclVuZG9BY3Rpb24pIHtcbiAgICAgIGNlbGxNYXAgPSBnZW5lcmF0ZUNlbGxNYXAoY2VsbHMpO1xuICAgICAgdGFnTWFwID0gZ2VuZXJhdGVUYWdNYXAoY2VsbE1hcCk7XG4gICAgICBpZiAoIWRvTm90Q2xlYXJVbmRvQWN0aW9uKSB7XG4gICAgICAgIHVuZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHVuZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICByZWRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICByZWRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IE9wdGltaXplIHRoaXMgZnVuY3Rpb24gc28gaXQgZG9lc24ndCBkZXN0cm95IHRoZSBwYWdlIHNjcm9sbCBhbmQgcmVxdWlyZVxuICAgICAgLy8gdGhpcyBoYWNrIGJlbG93LlxuICAgICAgLy9cbiAgICAgIC8vIE1vc3QgbGlrZWx5IGJlY2F1c2Ugb2YgdGhlIG5lc3RlZCBuYXR1cmUgb2YgdGhlIGNlbGwgbWFwIGFuZCB0aGUgY2VsbHMgaW4gdGhlXG4gICAgICAvLyBET00gdGhhdCByZWZsZWN0IHRoYXQgY2VsbCBtYXAsIHdoZW4gb25lIGNoYW5nZXMgc29tZXRoaW5nIGF0IHRoZSBiYXNlIG9mIHRoZVxuICAgICAgLy8gdHJlZSAobGlrZSBhZGRpbmcgYSBuZXcgc2VjdGlvbiBjZWxsXG4gICAgICAvLyBbaHR0cHM6Ly9naXRodWIuY29tL3R3b3NpZ21hL2JlYWtlci1ub3RlYm9vay9pc3N1ZXMvNjcyXSksIGl0IG5vdCBvbmx5IHRha2VzIGFuXG4gICAgICAvLyBldGVybml0eSwgYnV0IHJhbmRvbWx5IHNjcm9sbHMgdG8gfjY1JSBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5zY3JvbGxUb3AoY3VycmVudFBvc2l0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjZWxsTWFwUmVjcmVhdGVkJyk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgX2dldENlbGxNYXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2VsbE1hcDtcbiAgICAgIH0sXG4gICAgICBfZ2V0VGFnTWFwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcDtcbiAgICAgIH0sXG4gICAgICByZXNldDogZnVuY3Rpb24oX2NlbGxzXykge1xuICAgICAgICBpZiAoX2NlbGxzXykge1xuICAgICAgICAgIGNlbGxzID0gX2NlbGxzXztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaXBib2FyZCA9IG51bGw7XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgICAgfSxcbiAgICAgIGdldEluZGV4OiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gY2VsbE1hcFtpZF0gPyBjZWxsTWFwW2lkXS5yYXdJbmRleCA6IC0xO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxBdEluZGV4OiBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICByZXR1cm4gY2VsbHNbaW5kZXhdO1xuICAgICAgfSxcbiAgICAgIGhhc0NlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAhIWNlbGxNYXBbaWRdO1xuICAgICAgfSxcbiAgICAgIF9nZXREZWNvcmF0ZWRDZWxsOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBpZiAodGhpcy5oYXNDZWxsKGlkKSkge1xuICAgICAgICAgIHJldHVybiBjZWxsTWFwW2lkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldENlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5yYXc7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbFR5cGU6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoaWQpLnR5cGU7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbExldmVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChpZCkubGV2ZWw7XG4gICAgICB9LFxuICAgICAgZ2V0UGFyZW50OiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgcGFyZW50SWQgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5wYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnRJZCA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldENlbGwocGFyZW50SWQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Q2hpbGRyZW46IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLmNoaWxkcmVuLm1hcChmdW5jdGlvbihjaGlsZElkKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0Q2VsbChjaGlsZElkKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0QWxsRGVzY2VuZGFudHM6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLmFsbERlc2NlbmRhbnRzLm1hcChmdW5jdGlvbihjaGlsZElkKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0Q2VsbChjaGlsZElkKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0QWxsQ29kZUNlbGxzOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgaWQgPSAncm9vdCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsRGVzY2VuZGFudHMoaWQpLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwudHlwZSA9PT0gJ2NvZGUnO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvLyBmaW5kIHRoZSBmaXJzdCBjb2RlIGNlbGwgc3RhcnRpbmcgd2l0aCB0aGUgc3RhcnRDZWxsIGFuZCBzY2FuXG4gICAgICAvLyB1c2luZyB0aGUgZGlyZWN0aW9uLCBpZiB0aGUgc3RhcnRDZWxsIGlzIGEgY29kZSBjZWxsLCBpdCB3aWxsIGJlIHJldHVybmVkLlxuICAgICAgZmluZENvZGVDZWxsOiBmdW5jdGlvbihzdGFydENlbGxJZCwgZm9yd2FyZCkge1xuICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbChzdGFydENlbGxJZCk7XG4gICAgICAgIHdoaWxlIChjZWxsKSB7XG4gICAgICAgICAgaWYgKGNlbGwudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2VsbCA9IGZvcndhcmQgPyB0aGlzLmdldE5leHQoY2VsbC5pZCkgOiB0aGlzLmdldFByZXYoY2VsbC5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihpZCwgY2VsbCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCwgMCwgY2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYmVha2VyLmNlbGwuYWRkZWQnLCBjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0Rmlyc3Q6IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KGNlbGwpKSB7XG4gICAgICAgICAgdGhyb3cgJ3VuYWNjZXB0YWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICBjZWxscy5zcGxpY2UoMCwgMCwgY2VsbCk7XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5jZWxsLmFkZGVkJywgY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGluc2VydEFmdGVyOiBmdW5jdGlvbihpZCwgY2VsbCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QoY2VsbCkpIHtcbiAgICAgICAgICB0aHJvdyAndW5hY2NlcHRhYmxlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4ICsgMSwgMCwgY2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYmVha2VyLmNlbGwuYWRkZWQnLCBjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0QXQ6IGZ1bmN0aW9uKGluZGV4LCBjZWxsLCBkb05vdENsZWFyVW5kb0FjdGlvbikge1xuICAgICAgICBpZiAoXy5pc0FycmF5KGNlbGwpKSB7XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShjZWxscywgW2luZGV4LCAwXS5jb25jYXQoY2VsbCkpO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QoY2VsbCkpIHtcbiAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXgsIDAsIGNlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd1bmFjY2VwdGFibGUnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcChkb05vdENsZWFyVW5kb0FjdGlvbik7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYmVha2VyLmNlbGwuYWRkZWQnLCBjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaXNQb3NzaWJsZVRvTW92ZVVwOiBmdW5jdGlvbihpZCkge1xuICAgICAgICAvLyBJZiB0aGUgY2VsbCBpc24ndCBmaXJzdCAob3Igbm9uZXhpc3RlbnQ/KVxuICAgICAgICByZXR1cm4gWy0xLCAwXS5pbmRleE9mKHRoaXMuZ2V0SW5kZXgoaWQpKSA9PT0gLTE7XG4gICAgICB9LFxuICAgICAgbW92ZVVwOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbChpZCk7XG4gICAgICAgICAgICBjZWxsc1tpbmRleF0gPSB0aGlzLmdldENlbGxBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgICAgICBjZWxsc1tpbmRleCAtIDFdID0gY2VsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICB9LFxuICAgICAgaXNQb3NzaWJsZVRvTW92ZURvd246IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIC8vIElmIHRoZSBjZWxsIGlzbid0IGxhc3QgKG9yIG5vbmV4aXN0ZW50PylcbiAgICAgICAgcmV0dXJuIFstMSwgKGNlbGxzLmxlbmd0aCAtIDEpXS5pbmRleE9mKHRoaXMuZ2V0SW5kZXgoaWQpKSA9PT0gLTE7XG4gICAgICB9LFxuICAgICAgbW92ZURvd246IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBjZWxscy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKGlkKTtcbiAgICAgICAgICAgIGNlbGxzW2luZGV4XSA9IHRoaXMuZ2V0Q2VsbEF0SW5kZXgoaW5kZXggKyAxKTtcbiAgICAgICAgICAgIGNlbGxzW2luZGV4ICsgMV0gPSBjZWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgIH0sXG4gICAgICB1bmRvYWJsZURlbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlVW5kbyA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdzaW5nbGUnLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuZ2V0SW5kZXgoaWQpLFxuICAgICAgICAgICAgY2VsbDogdGhpcy5nZXRDZWxsKGlkKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlbGV0ZShpZCk7XG4gICAgICB9LFxuICAgICAgZGVsZXRlOiBmdW5jdGlvbihpZCwgdW5kb2FibGUpIHtcbiAgICAgICAgLy8gZGVsZXRlIHRoZSBjZWxsLFxuICAgICAgICAvLyBub3RlIHRoYXQgaWYgdGhpcyBpcyBhIHNlY3Rpb24sIGl0cyBkZXNjZW5kYW50cyBhcmUgbm90IGRlbGV0ZWQuXG4gICAgICAgIC8vIHRvIGRlbGV0ZSBhIHNlY2l0b24gd2l0aCBhbGwgaXRzIGRlc2NlbmRhbnRzIHVzZSBkZWxldGVTZWN0aW9uIGluc3RlYWQuXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdmFyIGRlbGV0ZWQgPSBjZWxscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIGlmICh1bmRvYWJsZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdW5kb0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZWxmLmluc2VydEF0KGluZGV4LCBkZWxldGVkLCB0cnVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJlZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZWRvQWN0aW9uMiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxldGVTZWN0aW9uOiBmdW5jdGlvbihpZCwgdW5kb2FibGUpIHtcbiAgICAgICAgLy8gZGVsZXRlIHRoZSBzZWN0aW9uIGNlbGwgYXMgd2VsbCBhcyBhbGwgaXRzIGRlc2NlbmRhbnRzXG4gICAgICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKGlkKTtcbiAgICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgd2FzIG5vdCBmb3VuZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNlbGwudHlwZSAhPT0gJ3NlY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgJ3RhcmdldCBjZWxsICcgKyBpZCArICcgaXMgbm90IGEgc2VjdGlvbiBjZWxsJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgdmFyIGRlc2NlbmRhbnRzID0gdGhpcy5nZXRBbGxEZXNjZW5kYW50cyhpZCk7XG4gICAgICAgIHZhciBkZWxldGVkID0gY2VsbHMuc3BsaWNlKGluZGV4LCBkZXNjZW5kYW50cy5sZW5ndGggKyAxKTtcbiAgICAgICAgaWYgKHVuZG9hYmxlKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHVuZG9BY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuaW5zZXJ0QXQoaW5kZXgsIGRlbGV0ZWQsIHRydWUpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVkb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZWRvQWN0aW9uMiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4LCBkZXNjZW5kYW50cy5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCh0cnVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVsZXRlZDtcbiAgICAgIH0sXG4gICAgICB1bmRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHVuZG9BY3Rpb24pIHtcbiAgICAgICAgICB1bmRvQWN0aW9uLmFwcGx5KCk7XG4gICAgICAgICAgcmVkb0FjdGlvbiA9IHJlZG9BY3Rpb24yO1xuICAgICAgICAgIHJlZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHVuZG9BY3Rpb24yID0gdW5kb0FjdGlvbjtcbiAgICAgICAgICB1bmRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyB1bmRvJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZWRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlZG9BY3Rpb24pIHtcbiAgICAgICAgICByZWRvQWN0aW9uLmFwcGx5KCk7XG4gICAgICAgICAgcmVkb0FjdGlvbjIgPSByZWRvQWN0aW9uO1xuICAgICAgICAgIHVuZG9BY3Rpb24gPSB1bmRvQWN0aW9uMjtcbiAgICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZWRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyByZWRvJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxldGVBbGxPdXRwdXRDZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjZWxscykge1xuICAgICAgICAgIF8uZWFjaChjZWxscywgZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgaWYgKGNlbGwub3V0cHV0KSB7XG4gICAgICAgICAgICAgIGNlbGwub3V0cHV0LnJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGR1bXBEaXNwbGF5U3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgXy5lYWNoKGNlbGxzLCBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXQpIHtcbiAgICAgICAgICAgICAgY2VsbC5vdXRwdXQuc3RhdGUgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNoaWZ0U2VnbWVudDogZnVuY3Rpb24oc2VnQmVnaW4sIHNlZ0xlbmd0aCwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiBzaGlmdHMgYSBjb250aW51b3VzIHNlcXVlbmNlIG9mIGNlbGxzXG4gICAgICAgIGlmIChzZWdCZWdpbiArIG9mZnNldCA8IDAgfHwgc2VnQmVnaW4gKyBzZWdMZW5ndGggLSAxICsgb2Zmc2V0ID49IGNlbGxzLmxlbmd0aCkge1xuICAgICAgICAgIHRocm93ICdJbGxlZ2FsIHNoaWZ0aW5nLCByZXN1bHQgd291bGQgYmUgb3V0IG9mIGJvdW5kJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2xpY2UxID0gY2VsbHMuc2xpY2UoMCwgc2VnQmVnaW4pO1xuICAgICAgICB2YXIgc2xpY2UyID0gY2VsbHMuc2xpY2Uoc2VnQmVnaW4sIHNlZ0JlZ2luICsgc2VnTGVuZ3RoKTtcbiAgICAgICAgdmFyIHNsaWNlMyA9IGNlbGxzLnNsaWNlKHNlZ0JlZ2luICsgc2VnTGVuZ3RoKTtcbiAgICAgICAgdmFyIHRvQmVNb3ZlZDtcbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAvLyBtb3ZpbmcgZnJvbSBzbGljZSAzIHRvIHNsaWNlIDFcbiAgICAgICAgICB0b0JlTW92ZWQgPSBzbGljZTMuc3BsaWNlKDAsIG9mZnNldCk7XG4gICAgICAgICAgc2xpY2UxID0gc2xpY2UxLmNvbmNhdCh0b0JlTW92ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1vdmluZyBmcm9tIHNsaWNlIDEgdG8gc2xpY2UgM1xuICAgICAgICAgIHRvQmVNb3ZlZCA9IHNsaWNlMS5zcGxpY2Uoc2xpY2UxLmxlbmd0aCArIG9mZnNldCwgLW9mZnNldCk7XG4gICAgICAgICAgc2xpY2UzID0gdG9CZU1vdmVkLmNvbmNhdChzbGljZTMpO1xuICAgICAgICB9XG4gICAgICAgIHJlcGxhY2VXaG9sZUFycmF5KGNlbGxzLCBfLmZsYXR0ZW4oW3NsaWNlMSwgc2xpY2UyLCBzbGljZTNdKSk7XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgfSxcbiAgICAgIGdldFByZXZTaWJsaW5nOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgcGFyZW50SWQgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5wYXJlbnQ7XG4gICAgICAgIGlmICghcGFyZW50SWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2libGluZ0lkcyA9IHRoaXMuX2dldERlY29yYXRlZENlbGwocGFyZW50SWQpLmNoaWxkcmVuO1xuICAgICAgICB2YXIgbXlJbmRleEFtb25nU2libGluZ3MgPSBzaWJsaW5nSWRzLmluZGV4T2YoaWQpO1xuICAgICAgICBpZiAobXlJbmRleEFtb25nU2libGluZ3MgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKHNpYmxpbmdJZHNbbXlJbmRleEFtb25nU2libGluZ3MgLSAxXSk7XG4gICAgICB9LFxuICAgICAgZ2V0TmV4dFNpYmxpbmc6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBwYXJlbnRJZCA9IHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLnBhcmVudDtcbiAgICAgICAgaWYgKCFwYXJlbnRJZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaWJsaW5nSWRzID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChwYXJlbnRJZCkuY2hpbGRyZW47XG4gICAgICAgIHZhciBteUluZGV4QW1vbmdTaWJsaW5ncyA9IHNpYmxpbmdJZHMuaW5kZXhPZihpZCk7XG4gICAgICAgIGlmIChteUluZGV4QW1vbmdTaWJsaW5ncyA9PT0gc2libGluZ0lkcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChzaWJsaW5nSWRzW215SW5kZXhBbW9uZ1NpYmxpbmdzICsgMV0pO1xuICAgICAgfSxcbiAgICAgIGlzUG9zc2libGVUb01vdmVTZWN0aW9uVXA6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZ2V0UHJldlNpYmxpbmcoaWQpO1xuICAgICAgfSxcbiAgICAgIG1vdmVTZWN0aW9uVXA6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5nZXRTZWN0aW9uTGVuZ3RoKGlkKTtcbiAgICAgICAgdmFyIHByZXZTaWIgPSB0aGlzLmdldFByZXZTaWJsaW5nKGlkKTtcbiAgICAgICAgaWYgKCFwcmV2U2liKSB7XG4gICAgICAgICAgdGhyb3cgJ0Nhbm5vdCBtb3ZlIHNlY3Rpb24gdXAnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2U2liSWQgPSBwcmV2U2liLmlkO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gLTEgKiB0aGlzLmdldFNlY3Rpb25MZW5ndGgocHJldlNpYklkKTtcbiAgICAgICAgdGhpcy5zaGlmdFNlZ21lbnQoaW5kZXgsIGxlbmd0aCwgb2Zmc2V0KTtcbiAgICAgIH0sXG4gICAgICBpc1Bvc3NpYmxlVG9Nb3ZlU2VjdGlvbkRvd246IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZ2V0TmV4dFNpYmxpbmcoaWQpO1xuICAgICAgfSxcbiAgICAgIG1vdmVTZWN0aW9uRG93bjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIG5leHRTaWIgPSB0aGlzLmdldE5leHRTaWJsaW5nKGlkKTtcbiAgICAgICAgaWYgKCFuZXh0U2liKSB7XG4gICAgICAgICAgdGhyb3cgJ0Nhbm5vdCBtb3ZlIHNlY3Rpb24gZG93bic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3ZlU2VjdGlvblVwKG5leHRTaWIuaWQpO1xuICAgICAgfSxcbiAgICAgIGdldFNlY3Rpb25MZW5ndGg6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIC8vIHRoZSBjZWxsIGl0c2VsZiBwbHVzIGFsbCBkZXNjZW5kYW50c1xuICAgICAgICByZXR1cm4gMSArIHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLmFsbERlc2NlbmRhbnRzLmxlbmd0aDtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgaGFzIG5vdCBiZWVuIHVuaXQgdGVzdGVkXG4gICAgICBnZXROZXh0OiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSBjZWxscy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbEF0SW5kZXgoaW5kZXggKyAxKTtcbiAgICAgIH0sXG4gICAgICBnZXRQcmV2OiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbEF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgIH0sXG4gICAgICBpc0NvbnRhaW5lcjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIGlkID09PSAncm9vdCcgfHwgISF0aGlzLmdldENlbGwoaWQpLmxldmVsO1xuICAgICAgfSxcbiAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKGlkKS5hbGxEZXNjZW5kYW50cy5sZW5ndGggPT09IDA7XG4gICAgICB9LFxuICAgICAgaXNMYXN0OiBmdW5jdGlvbihpZCkge1xuICAgICAgICBpZiAoXy5pc0VtcHR5KGNlbGxzKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5sYXN0KGNlbGxzKS5pZCA9PT0gaWQ7XG4gICAgICB9LFxuICAgICAgYXBwZW5kQWZ0ZXI6IGZ1bmN0aW9uKGlkLCBjZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29udGFpbmVyKGlkKSAmJiAhdGhpcy5pc0VtcHR5KGlkKSkge1xuICAgICAgICAgIC8vIGFkZCB0byB0YWlsXG4gICAgICAgICAgdmFyIGRlc2NlbmRhbnRzID0gdGhpcy5nZXRBbGxEZXNjZW5kYW50cyhpZCk7XG4gICAgICAgICAgdGhpcy5pbnNlcnRBZnRlcihkZXNjZW5kYW50c1tkZXNjZW5kYW50cy5sZW5ndGggLSAxXS5pZCwgdGhpcy5jbGlwYm9hcmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFwcGVuZCBhZnRlclxuICAgICAgICAgIHRoaXMuaW5zZXJ0QWZ0ZXIoaWQsIGNlbGwpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0SW5pdGlhbGl6YXRpb25DZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0YWdNYXAuaW5pdGlhbGl6YXRpb247XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbHNXaXRoRXZhbHVhdG9yOiBmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcC5ldmFsdWF0b3JbZXZhbHVhdG9yXTtcbiAgICAgIH0sXG4gICAgICBoYXNVc2VyVGFnOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0YWdNYXAudXNlcnRhZ3NbdF0gIT09IHVuZGVmaW5lZDtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsc1dpdGhVc2VyVGFnOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0YWdNYXAudXNlcnRhZ3NbdF07XG4gICAgICB9LFxuICAgICAgY2xpcGJvYXJkOiBudWxsLFxuICAgICAgY3V0OiBmdW5jdGlvbihpZCkge1xuICAgICAgICBpZiAodGhpcy5jbGlwYm9hcmQpIHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZSh0aGlzLmNsaXBib2FyZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGlwYm9hcmQgPSB0aGlzLmdldENlbGwoaWQpO1xuICAgICAgICB0aGlzLmRlbGV0ZShpZCk7XG4gICAgICB9LFxuICAgICAgcGFzdGU6IGZ1bmN0aW9uKGRlc3RpbmF0aW9uSWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xpcGJvYXJkKSB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRBZnRlcihkZXN0aW5hdGlvbklkLCB0aGlzLmNsaXBib2FyZCk7XG4gICAgICAgICAgdGhpcy5jbGlwYm9hcmQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FuU2V0VXNlclRhZ3M6IGZ1bmN0aW9uKHRhZ3MpIHtcbiAgICAgICAgdmFyIHJlID0gL1xccysvO1xuICAgICAgICBpZiAodGFncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHRncyA9IHRhZ3Muc3BsaXQocmUpO1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0Z3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjZWxsTWFwW3Rnc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0VSUk9SOiBUaGUgbmFtZSBcIicgKyB0Z3NbaV0gKyAnXCIgaXMgYWxyZWFkeSB1c2VkIGFzIGEgY2VsbCBuYW1lLic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0sXG4gICAgICBjYW5SZW5hbWVDZWxsOiBmdW5jdGlvbihuZXdpZCkge1xuICAgICAgICBpZiAoY2VsbE1hcFtuZXdpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiAnRVJST1I6IENlbGwgXCInICsgbmV3aWQgKyAnXCIgYWxyZWFkeSBleGlzdHMuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFnTWFwLnVzZXJ0YWdzW25ld2lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuICdFUlJPUjogVGhlIG5hbWUgXCInICsgbmV3aWQgKyAnXCIgaXMgYWxyZWFkeSB1c2VkIGFzIGEgdGFnLic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSxcbiAgICAgIHJlbmFtZUNlbGw6IGZ1bmN0aW9uKG9sZGlkLCBuZXdpZCkge1xuICAgICAgICBpZiAodGhpcy5jYW5SZW5hbWVDZWxsKG5ld2lkKSAhPT0gJycpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlkeCA9IHRoaXMuZ2V0SW5kZXgob2xkaWQpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICBjZWxsc1tpZHhdLmlkID0gbmV3aWQ7XG4gICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZWJ1aWxkTWFwczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCh0cnVlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ub3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlclxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiYmsubm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXJcIiwgW10pO1xuXG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtOb3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlclwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3N1YnNjcmlwdGlvbnMgPSB7fTtcbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogZnVuY3Rpb24oc2Vzc2lvbklkLCBub3RlYm9va01vZGVsKSB7XG4gICAgICAgIF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF0gPVxuICAgICAgICAgICQuY29tZXRkLnN1YnNjcmliZShcIi9uYW1lc3BhY2UvXCIgKyBzZXNzaW9uSWQsIGZ1bmN0aW9uKHJlcGx5KSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IHJlcGx5LmRhdGEubmFtZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlcGx5LmRhdGEudmFsdWU7XG4gICAgICAgICAgICB2YXIgc3luYyA9IHJlcGx5LmRhdGEuc3luYztcbiAgICAgICAgICAgIHZhciBuYW1lc3BhY2UgPSBub3RlYm9va01vZGVsLm5hbWVzcGFjZTtcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IHN5bmMpIHtcbiAgICAgICAgICAgICAgdmFyIHJlcGx5MiA9IHtuYW1lOiBuYW1lLCBkZWZpbmVkOiBmYWxzZSwgc2Vzc2lvbjogc2Vzc2lvbklkfTtcbiAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gbmFtZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWRWYWx1ZSA9IG5hbWVzcGFjZVtuYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSByZWFkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZSA9IHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgIHJlcGx5Mi5kZWZpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25hbWVzcGFjZS9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KHJlcGx5MikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gbmFtZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5uYW1lc3BhY2UgPSB7fTtcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2UgPSBub3RlYm9va01vZGVsLm5hbWVzcGFjZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBuYW1lc3BhY2VbbmFtZV07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHN5bmMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVwbHkyID0ge25hbWU6IG5hbWUsIHNlc3Npb246IHNlc3Npb25JZH07XG4gICAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25hbWVzcGFjZS9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KHJlcGx5MikpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICBpZiAoc2Vzc2lvbklkKSB7XG4gICAgICAgICAgJC5jb21ldGQudW5zdWJzY3JpYmUoX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXSk7XG4gICAgICAgICAgZGVsZXRlIF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5zZXNzaW9uTWFuYWdlclxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5zZXNzaW9uTWFuYWdlcicsW1xuICAgICdiay51dGlscycsXG4gICAgJ2JrLnNlc3Npb24nLFxuICAgICdiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXInLFxuICAgICdiay5ub3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlcicsXG4gICAgJ2JrLnJlY2VudE1lbnUnLFxuICAgICdiay5ldmFsdWF0b3JNYW5hZ2VyJ1xuICBdKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnYmtTZXNzaW9uTWFuYWdlcicsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrU2Vzc2lvbixcbiAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLFxuICAgICAgYmtOb3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrUmVjZW50TWVudSkge1xuXG4gICAgdmFyIEltYWdlSWNvbiA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YS50eXBlICE9PSBcIkltYWdlSWNvblwiKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhID0gW107XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmltYWdlRGF0YSA9IGRhdGEuaW1hZ2VEYXRhO1xuICAgICAgICB0aGlzLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIERhdGFGcmFtZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YS50eXBlICE9PSBcIlRhYmxlRGlzcGxheVwiIHx8IGRhdGEuc3VidHlwZSAhPT0gXCJUYWJsZURpc3BsYXlcIikge1xuICAgICAgICB0aGlzLmNvbHVtbk5hbWVzID0gW107XG4gICAgICAgIHRoaXMudHlwZXMgPSBbXTtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1uTmFtZXMgPSBkYXRhLmNvbHVtbk5hbWVzLnNsaWNlKDApO1xuICAgICAgICB0aGlzLnR5cGVzID0gZGF0YS50eXBlcy5zbGljZSgwKTtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaiBpbiBkYXRhLnZhbHVlcykge1xuICAgICAgICAgIHZhciB2YWxzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhLnZhbHVlc1tqXSkge1xuICAgICAgICAgICAgdmFscy5wdXNoKCB0cmFuc2Zvcm1CYWNrKGRhdGEudmFsdWVzW2pdW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFsdWVzLnB1c2godmFscyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHMgPSAnJztcbiAgICAgIHMgPSAnRGF0YUZyYW1lOicrXG4gICAgICAgICcgIFJvd3M6ICcrdGhpcy52YWx1ZXMubGVuZ3RoKydcXG4nICtcbiAgICAgICAgJyAgRGF0YSBjb2x1bW5zICh0b3RhbCAnK3RoaXMuY29sdW1uTmFtZXMubGVuZ3RoKycgY29sdW1ucyk6XFxuJztcbiAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5jb2x1bW5OYW1lcykge1xuICAgICAgICBzID0gcyArICcgICAgJyt0aGlzLmNvbHVtbk5hbWVzW2ldKycgICAnK3RoaXMudHlwZXNbaV0rJ1xcbic7XG4gICAgICB9XG4gICAgICA7XG4gICAgICByZXR1cm4gcztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5jb2x1bW5zID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2x1bW5OYW1lcztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5kdHlwZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnR5cGVzO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmdldENvbHVtbiA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBpID0gdGhpcy5jb2x1bW5OYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGkgPCAwKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgdmFyIG8gPSBbXTtcbiAgICAgIGZvciAodmFyIGogaW4gdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgby5wdXNoKHRoaXMudmFsdWVzW2pdW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmdldFJvdyA9IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGlmIChpIDwgMCB8fCBpID4gdGhpcy52YWx1ZXMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIHZhciBvID0ge307XG4gICAgICBmb3IgKHZhciBqIGluIHRoaXMuY29sdW1uTmFtZXMpIHtcbiAgICAgICAgb1t0aGlzLmNvbHVtbk5hbWVzW2pdXSA9IHRoaXMudmFsdWVzW2ldW2pdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXMubGVuZ3RoO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLnJlbW92ZUNvbHVtbiA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBpID0gdGhpcy5jb2x1bW5OYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGkgPCAwKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAodmFyIGogaW4gdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgdGhpcy52YWx1ZXNbal0uc3BsaWNlKGksMSk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbHVtbk5hbWVzLnNwbGljZShpLDEpO1xuICAgICAgdGhpcy50eXBlcy5zcGxpY2UoaSwxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmFkZENvbHVtbiA9IGZ1bmN0aW9uKG5hbWUsIGRhdGEsIHR5cGUpIHtcbiAgICAgIHZhciBpID0gdGhpcy5jb2x1bW5OYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGkgPj0gMCB8fCBkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YS5sZW5ndGggPT09IDApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB0aGlzLmNvbHVtbk5hbWVzLnB1c2gobmFtZSk7XG4gICAgICB0aGlzLnR5cGVzLnB1c2goKHR5cGUgPT09IHVuZGVmaW5lZCkgPyBnZXREYXRhVHlwZShkYXRhWzBdKSA6IHR5cGUpO1xuICAgICAgdmFyIG1pbiA9IChkYXRhLmxlbmd0aCA+IHRoaXMudmFsdWVzLmxlbmd0aCkgPyB0aGlzLnZhbHVlcy5sZW5ndGggOiBkYXRhLmxlbmd0aDtcbiAgICAgIHZhciBqO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG1pbjsgaisrKSB7XG4gICAgICAgIHRoaXMudmFsdWVzW2pdLnB1c2goZGF0YVtqXSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID4gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgZm9yICg7IGogPCB0aGlzLnZhbHVlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHRoaXMudmFsdWVzW2pdLnB1c2gobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHRoaXMudmFsdWVzLnB1c2goW10pO1xuICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb2x1bW5OYW1lcy5sZW5ndGggLSAxOyBrKyspIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2pdLnB1c2gobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFsdWVzW2pdLnB1c2goZGF0YVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmFkZFJvdyA9IGZ1bmN0aW9uKHJvdykge1xuICAgICAgdmFyIHIgPSBbXTtcbiAgICAgIGZvcih2YXIgYyBpbiB0aGlzLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgIGlmIChyb3dbdGhpcy5jb2x1bW5OYW1lc1tjXV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICByLnB1c2gocm93W3RoaXMuY29sdW1uTmFtZXNbY11dKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHIucHVzaChudWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWVzLnB1c2gocik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzUHJpbWl0aXZlVHlwZSh2KSB7XG4gICAgICBpZiAoXy5pc0RhdGUodikgfHwgXy5pc1N0cmluZyh2KSB8fCBfLmlzTnVtYmVyKHYpIHx8IF8uaXNCb29sZWFuKHYpIHx8IF8uaXNOYU4odikgfHwgXy5pc051bGwodikgfHwgXy5pc1VuZGVmaW5lZCh2KSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldERhdGFUeXBlKHYpIHtcbiAgICAgIGlmIChfLmlzRGF0ZSh2KSlcbiAgICAgICAgcmV0dXJuIFwidGltZVwiO1xuICAgICAgaWYoXy5pc051bWJlcih2KSkgLy8gY2FuIHdlIGRvIGEgYmV0dGVyIGpvYiBoZXJlP1xuICAgICAgICByZXR1cm4gXCJkb3VibGVcIjtcbiAgICAgIGlmKF8uaXNCb29sZWFuKHYpKVxuICAgICAgICByZXR1cm4gXCJib29sZWFuXCI7XG4gICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNEaWN0aW9uYXJ5KHYpIHtcbiAgICAgIGlmICghXy5pc09iamVjdCh2KSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yKHZhciBpIGluIHYpIHtcbiAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZVR5cGUodltpXSkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybSh2LCBub3JlY3Vyc2UpIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24odikgfHwgXy5pc1VuZGVmaW5lZCh2KSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmIChfLmlzRGF0ZSh2KSkge1xuICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgIG8udHlwZSA9IFwiRGF0ZVwiO1xuICAgICAgICBvLnRpbWVzdGFtcCA9IHYudmFsdWVPZigpO1xuICAgICAgICByZXR1cm4gb1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNQcmltaXRpdmVUeXBlKHYpKVxuICAgICAgICByZXR1cm4gdjtcblxuICAgICAgaWYgKHYgaW5zdGFuY2VvZiBJbWFnZUljb24gJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICBvLnR5cGUgPSBcIkltYWdlSWNvblwiO1xuICAgICAgICBvLmltYWdlRGF0YSA9IHYuaW1hZ2VEYXRhO1xuICAgICAgICBvLndpZHRoID0gdi53aWR0aDtcbiAgICAgICAgby5oZWlnaHQgPSB2LmhlaWdodDtcbiAgICAgICAgcmV0dXJuIG9cbiAgICAgIH1cblxuICAgICAgaWYgKHYgaW5zdGFuY2VvZiBEYXRhRnJhbWUgJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICBvLnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICBvLnN1YnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICBvLnZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpIGluIHYudmFsdWVzKSB7XG4gICAgICAgICAgdmFyIHJvdyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGogaW4gdi52YWx1ZXNbaV0pIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKHRyYW5zZm9ybSh2LnZhbHVlc1tpXVtqXSwgdHJ1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvLnZhbHVlcy5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgby50eXBlcyA9IF8uaXNBcnJheSh2LnR5cGVzKSA/IHYudHlwZXMuc2xpY2UoMCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIG8uY29sdW1uTmFtZXMgPSBfLmlzQXJyYXkodi5jb2x1bW5OYW1lcykgPyB2LmNvbHVtbk5hbWVzLnNsaWNlKDApIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gb1xuICAgICAgfVxuXG4gICAgICBpZiAoXy5pc0FycmF5KHYpICYmIHYubGVuZ3RoPjApIHtcbiAgICAgICAgdmFyIGRvaXQgPSB0cnVlO1xuICAgICAgICBmb3IodmFyIHIgaW4gdikge1xuICAgICAgICAgIGlmICghXy5pc0FycmF5KHZbcl0pKSB7XG4gICAgICAgICAgICBkb2l0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgYyBpbiAodltyXSkpIHtcbiAgICAgICAgICAgIGlmICghaXNQcmltaXRpdmVUeXBlKHZbcl1bY10pKSB7XG4gICAgICAgICAgICAgIGRvaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkb2l0ICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIG8gPSB7fVxuICAgICAgICAgIG8udHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgICAgby52YWx1ZXMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gaW4gdltpXSlcbiAgICAgICAgICAgICAgcm93LnB1c2godHJhbnNmb3JtKHZbaV1baXRlbV0sIHRydWUpKTtcbiAgICAgICAgICAgIG8udmFsdWVzLnB1c2gocm93KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgby5zdWJ0eXBlID0gXCJNYXRyaXhcIjtcbiAgICAgICAgICBvLmNvbHVtbk5hbWVzID0gW107XG4gICAgICAgICAgby50eXBlcyA9IFtdO1xuICAgICAgICAgIGZvcih2YXIgaSBpbiB2WzBdKSB7XG4gICAgICAgICAgICBvLmNvbHVtbk5hbWVzLnB1c2goJ2MnK2kpO1xuICAgICAgICAgICAgby50eXBlcy5wdXNoKGdldERhdGFUeXBlKHZbMF1baV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9pdCA9IHRydWU7XG4gICAgICAgICAgZm9yKHZhciByIGluIHYpIHtcbiAgICAgICAgICAgIGlmICghaXNEaWN0aW9uYXJ5KHZbcl0pKSB7XG4gICAgICAgICAgICAgIGRvaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkb2l0ICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICAgICAgby50eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgICAgIG8uc3VidHlwZSA9IFwiTGlzdE9mTWFwc1wiO1xuICAgICAgICAgICAgby5jb2x1bW5OYW1lcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGogaW4gdltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChvLmNvbHVtbk5hbWVzLmluZGV4T2Yoaik8MClcbiAgICAgICAgICAgICAgICAgIG8uY29sdW1uTmFtZXMucHVzaChqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgby52YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdikge1xuICAgICAgICAgICAgICB2YXIgbzIgPSBbXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBvLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBvLmNvbHVtbk5hbWVzW2pdO1xuICAgICAgICAgICAgICAgIGlmICh2W2ldW25dICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICBvMi5wdXNoKHRyYW5zZm9ybSh2W2ldW25dLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgbzIucHVzaChudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvLnZhbHVlcy5wdXNoKG8yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8udHlwZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogaW4gby5jb2x1bW5OYW1lcykge1xuICAgICAgICAgICAgICB2YXIgbiA9IG8uY29sdW1uTmFtZXNbal07XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdikge1xuICAgICAgICAgICAgICAgIGlmICh2W2ldW25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIG8udHlwZXMucHVzaChnZXREYXRhVHlwZSh2W2ldW25dKSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXy5pc0FycmF5KHYpKSB7XG4gICAgICAgIHZhciBvID0gW107XG4gICAgICAgIGZvcih2YXIgcCBpbiB2KSB7XG4gICAgICAgICAgby5wdXNoKHRyYW5zZm9ybSh2W3BdLCB0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG87XG4gICAgICB9XG5cbiAgICAgIGlmIChfLmlzT2JqZWN0KHYpICYmIGlzRGljdGlvbmFyeSh2KSAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgIG8udHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgIG8udmFsdWVzID0gW107XG4gICAgICAgIG8uc3VidHlwZSA9IFwiRGljdGlvbmFyeVwiO1xuICAgICAgICBvLmNvbHVtbk5hbWVzPSBbJ0tleScsJ1ZhbHVlJ107XG4gICAgICAgIGZvciAodmFyIGkgaW4gdikge1xuICAgICAgICAgIHZhciByID0gW107XG4gICAgICAgICAgci5wdXNoKGkpO1xuICAgICAgICAgIHIucHVzaCh0cmFuc2Zvcm0odltpXSx0cnVlKSk7XG4gICAgICAgICAgby52YWx1ZXMucHVzaChyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICAgIH1cbiAgICAgIHZhciBvID0ge307XG4gICAgICBmb3IodmFyIHAgaW4gdikge1xuICAgICAgICBvW3BdID0gdHJhbnNmb3JtKHZbcF0sIHRydWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybUJhY2sodikge1xuICAgICAgaWYodiA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc09iamVjdCh2KSAmJiAhXy5pc0FycmF5KHYpKSlcbiAgICAgICAgcmV0dXJuIHY7XG5cbiAgICAgIGlmICh2LnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodi50eXBlID09PSBcIkRhdGVcIikge1xuICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2LnRpbWVzdGFtcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHYudHlwZSA9PT0gXCJUYWJsZURpc3BsYXlcIikge1xuICAgICAgICAgIGlmICh2LnN1YnR5cGUgPT09IFwiRGljdGlvbmFyeVwiKSB7XG4gICAgICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgICAgICBmb3IgKHZhciByIGluIHYudmFsdWVzKSB7XG4gICAgICAgICAgICAgIG9bdi52YWx1ZXNbcl1bMF1dID0gdHJhbnNmb3JtQmFjayh2LnZhbHVlc1tyXVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHYuc3VidHlwZSA9PT0gXCJNYXRyaXhcIikge1xuICAgICAgICAgICAgdmFyIG8gPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdi52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgby5wdXNoKHYudmFsdWVzW2ldLnNsaWNlKDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodi5zdWJ0eXBlID09PSBcIkxpc3RPZk1hcHNcIikge1xuICAgICAgICAgICAgdmFyIG91dDIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHIgaW4gdi52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgdmFyIG91dDMgPSB7IH07XG4gICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTx2LnZhbHVlc1tyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh2LnZhbHVlc1tyXVtpXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgIG91dDNbIHYuY29sdW1uTmFtZXNbaV0gXSA9IHRyYW5zZm9ybUJhY2sodi52YWx1ZXNbcl1baV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG91dDIucHVzaChvdXQzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXQyO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgb3V0ID0gbmV3IERhdGFGcmFtZSh2KTtcbiAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh2LnR5cGUgPT09IFwiSW1hZ2VJY29uXCIpXG4gICAgICAgICAgcmV0dXJuIG5ldyBJbWFnZUljb24odik7XG4gICAgICB9XG4gICAgICBpZiAoIV8uaXNBcnJheSh2KSkge1xuICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICBmb3IodmFyIHAgaW4gdikge1xuICAgICAgICAgIG9bcF0gPSB0cmFuc2Zvcm1CYWNrKHZbcF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfVxuICAgICAgdmFyIG8gPSBbXTtcbiAgICAgIGZvcih2YXIgcCBpbiB2KSB7XG4gICAgICAgIG8ucHVzaCh0cmFuc2Zvcm1CYWNrKHZbcF0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvO1xuICAgIH07XG5cblxuICAgIHZhciBfbm90ZWJvb2tVcmkgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgREVGQVVMVF9WQUxVRSA9IG51bGw7XG4gICAgICB2YXIgX3YgPSBERUZBVUxUX1ZBTFVFO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuc2V0KERFRkFVTFRfVkFMVUUpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgX3YgPSB2O1xuICAgICAgICAgIGlmICghXy5pc0VtcHR5KF92KSkge1xuICAgICAgICAgICAgYmtSZWNlbnRNZW51LnJlY29yZFJlY2VudERvY3VtZW50KGdlbmVyYXRlUmVjZW50RG9jdW1lbnRJdGVtKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgdmFyIF91cmlUeXBlID0gbnVsbDtcbiAgICB2YXIgX3JlYWRPbmx5ID0gbnVsbDtcbiAgICB2YXIgX2Zvcm1hdCA9IG51bGw7XG4gICAgdmFyIF9zZXNzaW9uSWQgPSBudWxsO1xuICAgIHZhciBfZWRpdGVkID0gZmFsc2U7XG5cbiAgICB2YXIgQmVha2VyT2JqZWN0ID0gZnVuY3Rpb24obmJtb2RlbCkge1xuICAgICAgdGhpcy5rbm93bkJlYWtlclZhcnMgPSB7IH07XG4gICAgICB0aGlzLmdldENhY2hlID0geyB9O1xuICAgICAgdGhpcy5zZXRDYWNoZSA9IHsgfTtcbiAgICAgIHRoaXMuYmVha2VyT2JqID0geyB9XG4gICAgICB0aGlzLm5ibW9kZWwgPSBuYm1vZGVsO1xuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLnNldHVwQmVha2VyT2JqZWN0ID0gZnVuY3Rpb24obW9kZWxPdXRwdXQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuYmVha2VyT2JqLnNob3dQcm9ncmVzc1VwZGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3Nob3dQcm9ncmVzc1VwZGF0ZScsIHsgdmFsdWU6IGZ1bmN0aW9uIChhLGIsYykge1xuICAgICAgICAgIGlmICggYSA9PT0gdW5kZWZpbmVkIHx8IHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgaWYgKCB0eXBlb2YgYSA9PT0gJ3N0cmluZycgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgPSBhO1xuICAgICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgYSA9PT0gJ251bWJlcicgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnByb2dyZXNzQmFyID0gYTtcbiAgICAgICAgICBlbHNlIGlmICggYSAhPT0gbnVsbCApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucGF5bG9hZCA9IGE7XG5cbiAgICAgICAgICBpZiAoIHR5cGVvZiBiID09PSAnc3RyaW5nJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QubWVzc2FnZSA9IGI7XG4gICAgICAgICAgZWxzZSBpZiAoIHR5cGVvZiBiID09PSAnbnVtYmVyJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgPSBiO1xuICAgICAgICAgIGVsc2UgaWYgKCBiICE9PSBudWxsIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wYXlsb2FkID0gYjtcblxuICAgICAgICAgIGlmICggdHlwZW9mIGMgPT09ICdzdHJpbmcnIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gYztcbiAgICAgICAgICBlbHNlIGlmICggdHlwZW9mIGMgPT09ICdudW1iZXInIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wcm9ncmVzc0JhciA9IGM7XG4gICAgICAgICAgZWxzZSBpZiAoIGMgIT09IG51bGwgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnBheWxvYWQgPSBjO1xuICAgICAgICB9LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3Nob3dTdGF0dXMnLCB7IHZhbHVlOiBia0hlbHBlci5zaG93U3RhdHVzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdjbGVhclN0YXR1cycsIHsgdmFsdWU6IGJrSGVscGVyLmNsZWFyU3RhdHVzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzaG93VHJhbnNpZW50U3RhdHVzJywgeyB2YWx1ZTogYmtIZWxwZXIuc2hvd1RyYW5zaWVudFN0YXR1cywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZ2V0RXZhbHVhdG9ycycsIHsgdmFsdWU6IGJrSGVscGVyLmdldEV2YWx1YXRvcnMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2dldENvZGVDZWxscycsIHsgdmFsdWU6IGJrSGVscGVyLmdldENvZGVDZWxscywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2V0Q29kZUNlbGxCb2R5JywgeyB2YWx1ZTogYmtIZWxwZXIuc2V0Q29kZUNlbGxCb2R5LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzZXRDb2RlQ2VsbEV2YWx1YXRvcicsIHsgdmFsdWU6IGJrSGVscGVyLnNldENvZGVDZWxsRXZhbHVhdG9yLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzZXRDb2RlQ2VsbFRhZ3MnLCB7IHZhbHVlOiBia0hlbHBlci5zZXRDb2RlQ2VsbFRhZ3MsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2V2YWx1YXRlJywgeyB2YWx1ZTogZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgdmFyIGQgPSBia0hlbHBlci5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgc2VsZi5iZWFrZXJPYmplY3RUb05vdGVib29rKCk7XG4gICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZShhKS50aGVuKGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlc29sdmUodHJhbnNmb3JtQmFjayhyKSk7IH0sIGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlamVjdChyKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gZC5wcm9taXNlO1xuICAgICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2V2YWx1YXRlQ29kZScsIHsgdmFsdWU6IGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgIHZhciBkID0gYmtIZWxwZXIubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHNlbGYuYmVha2VyT2JqZWN0VG9Ob3RlYm9vaygpO1xuICAgICAgICAgICAgYmtIZWxwZXIuZXZhbHVhdGVDb2RlKGEsYikudGhlbihmdW5jdGlvbiAocikgeyBzZWxmLm5vdGVib29rVG9CZWFrZXJPYmplY3QoKTsgZC5yZXNvbHZlKHRyYW5zZm9ybUJhY2socikpOyB9LCBmdW5jdGlvbiAocikgeyBzZWxmLm5vdGVib29rVG9CZWFrZXJPYmplY3QoKTsgZC5yZWplY3Qocik7IH0pO1xuICAgICAgICAgICAgcmV0dXJuIGQucHJvbWlzZTtcbiAgICAgICAgICB9LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdwcmludCcsIHt2YWx1ZTogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICBia0hlbHBlci5yZWNlaXZlRXZhbHVhdGlvblVwZGF0ZShzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvdXRwdXRkYXRhOlt7dHlwZTonb3V0JywgdmFsdWU6IGlucHV0K1wiXFxuXCJ9XX0sIFwiSmF2YVNjcmlwdFwiKTtcbiAgICAgICAgICAvLyBYWFggc2hvdWxkIG5vdCBiZSBuZWVkZWQgYnV0IHdoZW4gcHJvZ3Jlc3MgbWV0ZXIgaXMgc2hvd24gYXQgc2FtZSB0aW1lXG4gICAgICAgICAgLy8gZGlzcGxheSBpcyBicm9rZW4gd2l0aG91dCB0aGlzLCB5b3UgZ2V0IFwiT1VUUFVUXCIgaW5zdGVhZCBvZiBhbnkgbGluZXMgb2YgdGV4dC5cbiAgICAgICAgICBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3ByaW50RXJyb3InLCB7dmFsdWU6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgYmtIZWxwZXIucmVjZWl2ZUV2YWx1YXRpb25VcGRhdGUoc2VsZi5fYmVha2VyX21vZGVsX291dHB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3V0cHV0ZGF0YTpbe3R5cGU6J2VycicsIHZhbHVlOiBpbnB1dCtcIlxcblwifV19LCBcIkphdmFTY3JpcHRcIik7XG4gICAgICAgICAgLy8gWFhYIHNob3VsZCBub3QgYmUgbmVlZGVkIGJ1dCB3aGVuIHByb2dyZXNzIG1ldGVyIGlzIHNob3duIGF0IHNhbWUgdGltZVxuICAgICAgICAgIC8vIGRpc3BsYXkgaXMgYnJva2VuIHdpdGhvdXQgdGhpcywgeW91IGdldCBcIk9VVFBVVFwiIGluc3RlYWQgb2YgYW55IGxpbmVzIG9mIHRleHQuXG4gICAgICAgICAgYmtIZWxwZXIucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdsb2FkSlMnLCB7IHZhbHVlOiBia0hlbHBlci5sb2FkSlMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2xvYWRDU1MnLCB7IHZhbHVlOiBia0hlbHBlci5sb2FkQ1NTLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdsb2FkTGlzdCcsIHsgdmFsdWU6IGJrSGVscGVyLmxvYWRMaXN0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdodHRwR2V0JywgeyB2YWx1ZTogYmtIZWxwZXIuaHR0cEdldCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnaHR0cFBvc3QnLCB7IHZhbHVlOiBia0hlbHBlci5odHRwUG9zdCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnbmV3RGVmZXJyZWQnLCB7IHZhbHVlOiBia0hlbHBlci5uZXdEZWZlcnJlZCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnbmV3UHJvbWlzZScsIHsgdmFsdWU6IGJrSGVscGVyLm5ld1Byb21pc2UsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2FsbCcsIHsgdmFsdWU6IGJrSGVscGVyLmFsbCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAndGltZW91dCcsIHsgdmFsdWU6IGJrSGVscGVyLnRpbWVvdXQsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ0RhdGFGcmFtZScsIHsgdmFsdWU6IERhdGFGcmFtZSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnSW1hZ2VJY29uJywgeyB2YWx1ZTogSW1hZ2VJY29uLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLnByZWRlZmluZWQgPSBPYmplY3Qua2V5cyh0aGlzLmJlYWtlck9iaik7XG4gICAgICB9XG4gICAgICB0aGlzLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdCA9IG1vZGVsT3V0cHV0LnJlc3VsdDsgLy8gWFhYIG9idmlhdGVkIGJ5IG5leHQgbGluZVxuICAgICAgdGhpcy5fYmVha2VyX21vZGVsX291dHB1dCA9IG1vZGVsT3V0cHV0O1xuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLmNsZWFyT3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QgPSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuYmVha2VyR2V0dGVyID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKHRoaXMuc2V0Q2FjaGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRDYWNoZVtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdldENhY2hlW25hbWVdID09PSB1bmRlZmluZWQgJiYgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLmdldENhY2hlW25hbWVdID0gdHJhbnNmb3JtQmFjayh0aGlzLm5ibW9kZWwubmFtZXNwYWNlW25hbWVdKTtcbiAgICAgIC8vIHRoaXMgaXMgcmVxdWlyZWQgdG8gc3VwcG9ydCBzdWJvYmplY3QgbW9kaWZpY2F0aW9uXG4gICAgICB0aGlzLnNldENhY2hlW25hbWVdID0gdGhpcy5nZXRDYWNoZVtuYW1lXTtcbiAgICAgIHJldHVybiB0aGlzLmdldENhY2hlW25hbWVdO1xuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLmJlYWtlclNldHRlciA9IGZ1bmN0aW9uKG5hbWUsIHYpIHtcbiAgICAgIHRoaXMuc2V0Q2FjaGVbbmFtZV0gPSB2O1xuICAgICAgaWYgKHRoaXMuYmVha2VyU2V0dGVyVGltZW91dCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBia0hlbHBlci5jYW5jZWxUaW1lb3V0KHRoaXMuYmVha2VyU2V0dGVyVGltZW91dCk7XG4gICAgICB2YXIgbWFrZVRpbWVvdXQgPSBmdW5jdGlvbihzZWxmKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLmJlYWtlclNldHRlclRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgc2VsZi5iZWFrZXJPYmplY3RUb05vdGVib29rKCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdGhpcy5iZWFrZXJTZXR0ZXJUaW1lb3V0ID0gYmtIZWxwZXIudGltZW91dChtYWtlVGltZW91dCh0aGlzKSw1MDApO1xuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLm5vdGVib29rVG9CZWFrZXJPYmplY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNsZWFyIGdldGNhY2hlXG4gICAgICB0aGlzLmdldENhY2hlID0geyB9O1xuXG4gICAgICAvLyBjaGVjayBpZiBzb21lIG90aGVyIGxhbmd1YWdlIHJlbW92ZWQgYSBiaW5kaW5nXG4gICAgICBmb3IgKHZhciBwIGluIHRoaXMua25vd25CZWFrZXJWYXJzKSB7XG4gICAgICAgIGlmICh0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMua25vd25CZWFrZXJWYXJzW3BdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmJlYWtlck9ialtwXTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5zZXRDYWNoZVtwXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiBzb21lIG90aGVyIGxhbmd1YWdlIGFkZGVkIGEgYmluZGluZ1xuICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBwIGluIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UpIHtcbiAgICAgICAgICB2YXIgdCA9IHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF07XG4gICAgICAgICAgaWYgKHRoaXMucHJlZGVmaW5lZC5pbmRleE9mKHApPj0wKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMua25vd25CZWFrZXJWYXJzW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmJlYWtlck9ialtwXTtcbiAgICAgICAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzW3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBzZWxmLmJlYWtlckdldHRlcihuYW1lKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ha2VTZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHNlbGYuYmVha2VyU2V0dGVyKG5hbWUsdik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgcCxcbiAgICAgICAgICAgICAgICB7IHdyaXRlYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGdldDogbWFrZUdldHRlcih0aGlzLCBwKSxcbiAgICAgICAgICAgICAgICAgIHNldDogbWFrZVNldHRlcih0aGlzLCBwKSxcbiAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5iZWFrZXJPYmplY3RUb05vdGVib29rID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuYmVha2VyT2JqKTtcbiAgICAgIHZhciBzdHVmZiA9IE9iamVjdC5rZXlzKHRoaXMua25vd25CZWFrZXJWYXJzKTtcbiAgICAgIHZhciBkaWZmID0gJChrZXlzKS5ub3Qoc3R1ZmYpLmdldCgpO1xuICAgICAgZGlmZiA9ICQoZGlmZikubm90KHRoaXMucHJlZGVmaW5lZCkuZ2V0KCk7XG5cbiAgICAgIC8vIGNoZWNrIGlmIGphdmFzY3JpcHQgcmVtb3ZlZCBhIGJpbmRpbmdcbiAgICAgIGlmICggdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICBmb3IgKHZhciBwIGluIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UpIHtcbiAgICAgICAgICBpZiAodGhpcy5rbm93bkJlYWtlclZhcnNbcF0gIT09IHVuZGVmaW5lZCAmJiBrZXlzLmluZGV4T2YocCkgPDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMua25vd25CZWFrZXJWYXJzW3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiBqYXZhc2NyaXB0IHNldCBhbnkgTkVXIHZhcmlhYmxlXG4gICAgICBmb3IgKHZhciBpIGluIGRpZmYpIHtcbiAgICAgICAgdmFyIHAgPSBkaWZmW2ldO1xuICAgICAgICBpZiAodGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh0aGlzLm5ibW9kZWwubmFtZXNwYWNlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLm5ibW9kZWwubmFtZXNwYWNlID0geyB9O1xuICAgICAgICAgIHZhciB0ID0gdGhpcy5iZWFrZXJPYmpbcF07XG4gICAgICAgICAgaWYgKCh0aGlzLnByZWRlZmluZWQuaW5kZXhPZihwKT49MCB8fCBfLmlzRnVuY3Rpb24odCkpKSB7XG4gICAgICAgICAgICAvLyB3ZSBkbyBOT1QgcHV0IGZ1bmN0aW9ucyBpbiB0aGUgbmFtZXNwYWNlXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtub3duQmVha2VyVmFyc1twXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRDYWNoZVtwXSA9IHQ7XG4gICAgICAgICAgICB0aGlzLmtub3duQmVha2VyVmFyc1twXSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbWFrZUdldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2VsZi5iZWFrZXJHZXR0ZXIobmFtZSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYWtlU2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odikgeyBzZWxmLmJlYWtlclNldHRlcihuYW1lLHYpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosIHAsXG4gICAgICAgICAgICAgICAgeyB3cml0ZWFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBnZXQ6IG1ha2VHZXR0ZXIodGhpcyxwKSxcbiAgICAgICAgICAgICAgICAgIHNldDogbWFrZVNldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiBqYXZhc2NyaXB0IHNldCBhbnkgbmV3IHZhcmlhYmxlXG4gICAgICBmb3IgKHZhciBwIGluIHRoaXMuc2V0Q2FjaGUpIHtcbiAgICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLm5ibW9kZWwubmFtZXNwYWNlID0geyB9O1xuICAgICAgICBpZiAodGhpcy5pc0NpcmN1bGFyT2JqZWN0KHRoaXMuc2V0Q2FjaGVbcF0pKVxuICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF0gPSBcIkVSUk9SOiBjaXJjdWxhciBvYmplY3RzIGFyZSBub3Qgc3VwcG9ydGVkXCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdID0gdHJhbnNmb3JtKHRoaXMuc2V0Q2FjaGVbcF0pO1xuICAgICAgICBpZiAodGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPT09IHVuZGVmaW5lZCAmJiB0aGlzLmJlYWtlck9ialtwXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmtub3duQmVha2VyVmFyc1twXSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbWFrZUdldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2VsZi5iZWFrZXJHZXR0ZXIobmFtZSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYWtlU2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odikgeyBzZWxmLmJlYWtlclNldHRlcihuYW1lLHYpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosIHAsXG4gICAgICAgICAgICAgICAgeyB3cml0ZWFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBnZXQ6IG1ha2VHZXR0ZXIodGhpcyxwKSxcbiAgICAgICAgICAgICAgICAgIHNldDogbWFrZVNldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBjbGVhciBzZXRjYWNoZSBhbmQgZ2V0Y2FjaGVcbiAgICAgIHRoaXMuc2V0Q2FjaGUgPSB7IH07XG4gICAgICB0aGlzLmdldENhY2hlID0geyB9O1xuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuaXNDaXJjdWxhck9iamVjdCA9IGZ1bmN0aW9uKG5vZGUsIHBhcmVudHMpIHtcbiAgICAgIHBhcmVudHMgPSBwYXJlbnRzIHx8IFtdO1xuICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlICE9IFwib2JqZWN0XCIpe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG5vZGUpLCBpLCB2YWx1ZTtcbiAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIGZvciAoaSA9IGtleXMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICB2YWx1ZSA9IG5vZGVba2V5c1tpXV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGlmIChwYXJlbnRzLmluZGV4T2YodmFsdWUpPj0wKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuaXNDaXJjdWxhck9iamVjdCh2YWx1ZSwgcGFyZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGFyZW50cy5wb3Aobm9kZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAgIHZhciBfYm8gPSB7fTtcblxuICAgIHZhciBfbm90ZWJvb2tNb2RlbCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfdiA9IHt9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuc2V0KHt9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3Y7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF9ibztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgX3YgPSB2O1xuICAgICAgICAgIC8vIHRoaXMgcmVtb3ZlcyBsZWdhY3kgZGF0YSBwcmV2aW91c2x5IHNhdmVkXG4gICAgICAgICAgaWYgKF92Ll9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWxldGUgX3YuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL2lmIChfdi5uYW1lc3BhY2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAvLyAgX3YubmFtZXNwYWNlID0geyB9O1xuICAgICAgICAgIF9ibyA9IG5ldyBCZWFrZXJPYmplY3QoX3YpO1xuICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIucmVzZXQoW10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlci5yZXNldChfdi5jZWxscyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VtcHR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gXy5pc0VtcHR5KF92KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhdGhpcy5pc0VtcHR5KCkgJiYgISFfdi5sb2NrZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHRvSnNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGFuZ3VsYXIudG9Kc29uKF92KTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9DbGVhblByZXR0eUpzb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vc3RyaXAgb3V0IHRoZSBzaGVsbCBJRHNcbiAgICAgICAgICB2YXIgc2hlbGxJZHMgPSBfKF92LmV2YWx1YXRvcnMpLm1hcChmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICAgIHZhciBzaGVsbElkID0gZXZhbHVhdG9yLnNoZWxsSUQ7XG4gICAgICAgICAgICBkZWxldGUgZXZhbHVhdG9yLnNoZWxsSUQ7XG4gICAgICAgICAgICByZXR1cm4gc2hlbGxJZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBnZW5lcmF0ZSBwcmV0dHkgSlNPTlxuICAgICAgICAgIHZhciBwcmV0dHlKc29uID0gYmtVdGlscy50b1ByZXR0eUpzb24oX3YpO1xuICAgICAgICAgIC8vIHB1dCB0aGUgc2hlbGwgSURzIGJhY2tcbiAgICAgICAgICBfKF92LmV2YWx1YXRvcnMpLmVhY2goZnVuY3Rpb24oZXZhbHVhdG9yLCBpbmRleCkge1xuICAgICAgICAgICAgZXZhbHVhdG9yLnNoZWxsSUQgPSBzaGVsbElkc1tpbmRleF07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHByZXR0eUpzb247XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHZhciBnZW5lcmF0ZUJhY2t1cERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5vdGVib29rVXJpOiBfbm90ZWJvb2tVcmkuZ2V0KCksXG4gICAgICAgIHVyaVR5cGU6IF91cmlUeXBlLFxuICAgICAgICByZWFkT25seTogX3JlYWRPbmx5LFxuICAgICAgICBmb3JtYXQ6IF9mb3JtYXQsXG4gICAgICAgIG5vdGVib29rTW9kZWxKc29uOiBfbm90ZWJvb2tNb2RlbC50b0pzb24oKSxcbiAgICAgICAgZWRpdGVkOiBfZWRpdGVkXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlUmVjZW50RG9jdW1lbnRJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHVyaTogX25vdGVib29rVXJpLmdldCgpLFxuICAgICAgICB0eXBlOiBfLmlzRW1wdHkoX3VyaVR5cGUpID8gXCJcIiA6IF91cmlUeXBlLFxuICAgICAgICByZWFkT25seTogISFfcmVhZE9ubHkgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGZvcm1hdDogXy5pc0VtcHR5KF9mb3JtYXQpID8gXCJcIiA6IF9mb3JtYXRcbiAgICAgIH07XG4gICAgICByZXR1cm4gYW5ndWxhci50b0pzb24oZGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBnZW5lcmF0ZVNhdmVEYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmlUeXBlOiBfdXJpVHlwZSxcbiAgICAgICAgbm90ZWJvb2tVcmk6IF9ub3RlYm9va1VyaS5nZXQoKSxcbiAgICAgICAgbm90ZWJvb2tNb2RlbEFzU3RyaW5nOiBfbm90ZWJvb2tNb2RlbC50b0NsZWFuUHJldHR5SnNvbigpXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgX3N1YnNjcmlwdGlvbnMgPSB7fTtcbiAgICB2YXIgY29ubmVjdGNvbnRyb2wgPSBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgIF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF0gPVxuICAgICAgICAgICQuY29tZXRkLnN1YnNjcmliZShcIi9ub3RlYm9va2N0cmwvXCIgKyBzZXNzaW9uSWQsIGZ1bmN0aW9uKHJlcSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmFyIG5hbWUgPSBcImJrSGVscGVyLlwiK3JlcS5kYXRhLm1ldGhvZDtcbiAgICAgICAgICAgICAgdmFyIG51bWFyZ3MgPSByZXEuZGF0YS5udW1hcmdzO1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBudW1hcmdzOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKCByZXEuZGF0YVtcImFyZ1wiK2ldICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHB1Ymxpc2ggPSB0cnVlO1xuICAgICAgICAgICAgICB2YXIgcmVwbHkyID0geyBzZXNzaW9uOiBzZXNzaW9uSWQgfTtcbiAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlID0gZXZhbChuYW1lKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgaWYodHlwZW9mIHJlcGx5Mi52YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcmVwbHkyLnZhbHVlLnByb21pc2UgPT09ICdvYmplY3QnICYmIHR5cGVvZiByZXBseTIudmFsdWUucHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSByZXBseTIudmFsdWUucHJvbWlzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHJlcGx5Mi52YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAvLyBtdXN0IHdhaXQgZm9yIHJlc3VsdCB0byBiZSByZWFkeVxuICAgICAgICAgICAgICAgICAgcHVibGlzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZT1yZXM7XG4gICAgICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXBseTIudmFsdWU9ZXJyO1xuICAgICAgICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2Uvbm90ZWJvb2tjdHJsL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkocmVwbHkyKSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAocmVwbHkyLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHB1Ymxpc2gpIHtcbiAgICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2Uvbm90ZWJvb2tjdHJsL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkocmVwbHkyKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNBVENIIFwiK2Vycik7XG4gICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeSggeyBzZXNzaW9uOiBzZXNzaW9uSWQsIHZhbHVlOiBmYWxzZSB9ICkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdmFyIGRpc2Nvbm5lY3Rjb250cm9sID0gZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgIGlmIChzZXNzaW9uSWQpIHtcbiAgICAgICAgICAkLmNvbWV0ZC51bnN1YnNjcmliZShfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdKTtcbiAgICAgICAgICBkZWxldGUgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICByZXNldDogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkKSB7XG5cbiAgICAgICAgLy8gYmFja3VwIGV4aXN0aW5nIHNlc3Npb24gaWYgaXQncyBub3QgZW1wdHkuXG4gICAgICAgIGlmIChfc2Vzc2lvbklkICYmICFfbm90ZWJvb2tNb2RlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICBia1Nlc3Npb24uYmFja3VwKF9zZXNzaW9uSWQsIGdlbmVyYXRlQmFja3VwRGF0YSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfc2Vzc2lvbklkKVxuICAgICAgICAgIGRpc2Nvbm5lY3Rjb250cm9sKF9zZXNzaW9uSWQpO1xuXG4gICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlci5yZXNldCgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlucHV0c1xuICAgICAgICBpZiAoIXNlc3Npb25JZCkge1xuICAgICAgICAgIHNlc3Npb25JZCA9IGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIF91cmlUeXBlID0gdXJpVHlwZTtcbiAgICAgICAgX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgICAgIF9mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIF9ub3RlYm9va1VyaS5zZXQobm90ZWJvb2tVcmkpO1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5zZXQobm90ZWJvb2tNb2RlbCk7XG4gICAgICAgIF9lZGl0ZWQgPSAhIWVkaXRlZDtcbiAgICAgICAgX3Nlc3Npb25JZCA9IHNlc3Npb25JZDtcblxuICAgICAgICBia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyLmluaXQoc2Vzc2lvbklkLCBub3RlYm9va01vZGVsKTtcbiAgICAgICAgY29ubmVjdGNvbnRyb2woc2Vzc2lvbklkKTtcbiAgICAgICAgYmtTZXNzaW9uLmJhY2t1cChfc2Vzc2lvbklkLCBnZW5lcmF0ZUJhY2t1cERhdGEoKSk7XG4gICAgICB9LFxuICAgICAgc2V0U2Vzc2lvbklkOiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgICBzZXNzaW9uSWQgPSBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgIH1cbiAgICAgICAgX3Nlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICAgICAgcmV0dXJuIF9zZXNzaW9uSWQ7XG4gICAgICB9LFxuICAgICAgc2V0dXA6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCkge1xuXG4gICAgICAgIC8vIGNoZWNrIGlucHV0c1xuICAgICAgICBpZiAoIXNlc3Npb25JZCkge1xuICAgICAgICAgIHNlc3Npb25JZCA9IGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIF91cmlUeXBlID0gdXJpVHlwZTtcbiAgICAgICAgX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgICAgIF9mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIF9ub3RlYm9va1VyaS5zZXQobm90ZWJvb2tVcmkpO1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5zZXQobm90ZWJvb2tNb2RlbCk7XG4gICAgICAgIF9lZGl0ZWQgPSAhIWVkaXRlZDtcbiAgICAgICAgX3Nlc3Npb25JZCA9IHNlc3Npb25JZDtcblxuICAgICAgICBia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyLmluaXQoc2Vzc2lvbklkLCBub3RlYm9va01vZGVsKTtcbiAgICAgICAgY29ubmVjdGNvbnRyb2woc2Vzc2lvbklkKTtcbiAgICAgICAgYmtTZXNzaW9uLmJhY2t1cChfc2Vzc2lvbklkLCBnZW5lcmF0ZUJhY2t1cERhdGEoKSk7XG4gICAgICB9LFxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBkaXNjb25uZWN0Y29udHJvbChfc2Vzc2lvbklkKTtcbiAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLnJlc2V0KCk7XG4gICAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIuY2xlYXIoX3Nlc3Npb25JZCk7XG4gICAgICAgIF9ub3RlYm9va1VyaS5yZXNldCgpO1xuICAgICAgICBfdXJpVHlwZSA9IG51bGw7XG4gICAgICAgIF9yZWFkT25seSA9IG51bGw7XG4gICAgICAgIF9mb3JtYXQgPSBudWxsO1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5yZXNldCgpO1xuICAgICAgICBfc2Vzc2lvbklkID0gbnVsbDtcbiAgICAgICAgX2VkaXRlZCA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0V2YWx1YXRvck1hbmFnZXIuZXhpdEFuZFJlbW92ZUFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgICBzZWxmLmNsZWFyKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChfc2Vzc2lvbklkKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbi5jbG9zZShfc2Vzc2lvbklkKS50aGVuKGNsb3NlKTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMubmV3UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYmFja3VwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9zZXNzaW9uSWQgJiYgIV9ub3RlYm9va01vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb24uYmFja3VwKF9zZXNzaW9uSWQsIGdlbmVyYXRlQmFja3VwRGF0YSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGVOb3RlYm9va1VyaTogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpIHtcbiAgICAgICAgLy8gdG8gYmUgdXNlZCBieSBzYXZlLWFzXG4gICAgICAgIF91cmlUeXBlID0gdXJpVHlwZTtcbiAgICAgICAgX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgICAgIF9mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIF9ub3RlYm9va1VyaS5zZXQobm90ZWJvb2tVcmkpO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rVGl0bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX25vdGVib29rVXJpLmdldCgpKSB7XG4gICAgICAgICAgcmV0dXJuIF9ub3RlYm9va1VyaS5nZXQoKS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFwiTmV3IE5vdGVib29rXCI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc1NhdmFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rVXJpICYmICFfcmVhZE9ubHk7XG4gICAgICB9LFxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gdHJpZ2dlcnMgYWxsIGRpc3BsYXkgaW1wbGVtZW50YXRpb25zIHRvIHNhdmUgdGhlIGN1cnJlbnQgb3V0cHV0IHN0YXR1cy5cbiAgICAgICAqIFRoaXMgc2F2ZSBpcyBhc3luY2hyb25vdXMgYW5kIGhhcHBlbnMgaW4gdGhlIGN1cnJlbnQgZGlnZXN0IGxvb3AuXG4gICAgICAgKiBVc2VycyBtdXN0IHNjaGVkdWxlIGEgdGltZW91dCB0byBleGVjdXRlIGNvZGUgdGhhdCByZXF1aXJlcyB0aGUgZHVtcGVkIHN0YXRlLlxuICAgICAgICovXG4gICAgICBkdW1wRGlzcGxheVN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBnZXRTYXZlRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZVNhdmVEYXRhKCk7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tNb2RlbEFzU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLnRvSnNvbigpO1xuICAgICAgfSxcbiAgICAgIGdldFJhd05vdGVib29rTW9kZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwuZ2V0KCk7XG4gICAgICB9LFxuICAgICAgZ2V0QmVha2VyT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmdldEJlYWtlck9iamVjdCgpO1xuICAgICAgfSxcbiAgICAgIGdldFNlc3Npb25JZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfc2Vzc2lvbklkO1xuICAgICAgfSxcbiAgICAgIGlzU2Vzc2lvblZhbGlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfc2Vzc2lvbklkKSB7XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMubmV3UHJvbWlzZShcImZhbHNlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb24uZ2V0U2Vzc2lvbnMoKS50aGVuKGZ1bmN0aW9uKHNlc3Npb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gXyhzZXNzaW9ucykuY2hhaW4oKS5rZXlzKCkuY29udGFpbnMoX3Nlc3Npb25JZCkudmFsdWUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIFRPRE8sIG1vdmUgdGhlIGZvbGxvd2luZyBpbXBsIHRvIGEgZGVkaWNhdGVkIG5vdGVib29rIG1vZGVsIG1hbmFnZXJcbiAgICAgIC8vIGJ1dCBzdGlsbCBleHBvc2UgaXQgaGVyZVxuICAgICAgc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZDogZnVuY3Rpb24oZWRpdGVkKSB7XG4gICAgICAgIF9lZGl0ZWQgPSBlZGl0ZWQ7XG4gICAgICB9LFxuICAgICAgaXNOb3RlYm9va01vZGVsRWRpdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9lZGl0ZWQ7XG4gICAgICB9LFxuICAgICAgaXNOb3RlYm9va0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tNb2RlbC5pc0xvY2tlZCgpO1xuICAgICAgfSxcbiAgICAgIHRvZ2dsZU5vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfbm90ZWJvb2tNb2RlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICBpZiAoIV9ub3RlYm9va01vZGVsLmlzTG9ja2VkKCkpIHtcbiAgICAgICAgICAgIF9ub3RlYm9va01vZGVsLmdldCgpLmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9ub3RlYm9va01vZGVsLmdldCgpLmxvY2tlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgX2VkaXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmFsdWF0b3JVbnVzZWQ6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICB2YXIgbiA9IF8uZmluZChfbm90ZWJvb2tNb2RlbC5nZXQoKS5jZWxscywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYy50eXBlID09IFwiY29kZVwiICYmIGMuZXZhbHVhdG9yID09IHBsdWdpbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAhbjtcbiAgICAgIH0sXG4gICAgICBhZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzLnB1c2goZXZhbHVhdG9yKTtcbiAgICAgICAgX2VkaXRlZCA9IHRydWU7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRXZhbHVhdG9yOiBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgdmFyIG1vZGVsID0gX25vdGVib29rTW9kZWwuZ2V0KCk7XG4gICAgICAgIG1vZGVsLmV2YWx1YXRvcnMgPSBfLnJlamVjdChtb2RlbC5ldmFsdWF0b3JzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIGUucGx1Z2luID09IHBsdWdpbjtcbiAgICAgICAgfSk7XG4gICAgICAgIF9lZGl0ZWQgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIHJlY29ubmVjdEV2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLnJlY29ubmVjdEV2YWx1YXRvcnMoKTtcbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va0NlbGxPcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcjtcbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va05ld0NlbGxGYWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuZXdDb2RlQ2VsbDogZnVuY3Rpb24oZXZhbHVhdG9yLCBpZCkge1xuICAgICAgICAgICAgaWYgKCFldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgZXZhbHVhdG9yID0gX25vdGVib29rTW9kZWwuZ2V0KCkuZXZhbHVhdG9yc1swXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICBpZCA9IFwiY29kZVwiICsgYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgXCJpZFwiOiBpZCxcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY29kZVwiLFxuICAgICAgICAgICAgICBcImV2YWx1YXRvclwiOiBldmFsdWF0b3IsXG4gICAgICAgICAgICAgIFwiaW5wdXRcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9keVwiOiBcIlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwib3V0cHV0XCI6IHt9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbmV3U2VjdGlvbkNlbGw6IGZ1bmN0aW9uKGxldmVsLCB0aXRsZSwgaWQpIHtcbiAgICAgICAgICAgIGlmICghbGV2ZWwgJiYgbGV2ZWwgIT09IDApIHtcbiAgICAgICAgICAgICAgbGV2ZWwgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxldmVsIDw9IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgXCJjcmVhdGluZyBzZWN0aW9uIGNlbGwgd2l0aCBsZXZlbCBcIiArIGxldmVsICsgXCIgaXMgbm90IGFsbG93ZWRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGl0bGUpIHtcbiAgICAgICAgICAgICAgdGl0bGUgPSBcIk5ldyBTZWN0aW9uIEhcIiArIGxldmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgIGlkID0gXCJzZWN0aW9uXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBcImlkXCI6IGlkLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWN0aW9uXCIsXG4gICAgICAgICAgICAgIFwidGl0bGVcIjogdGl0bGUsXG4gICAgICAgICAgICAgIFwibGV2ZWxcIjogbGV2ZWxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXdNYXJrZG93bkNlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICB2YXIgdGFpbCA9IF9ub3RlYm9va01vZGVsLmdldCgpLmNlbGxzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgIGlkID0gXCJtYXJrZG93blwiICsgYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgXCJpZFwiOiBpZCxcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibWFya2Rvd25cIixcbiAgICAgICAgICAgICAgXCJib2R5XCI6IFwiXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGlzUm9vdENlbGxJbml0aWFsaXphdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tNb2RlbC5nZXQoKS5pbml0aWFsaXplQWxsO1xuICAgICAgfSxcbiAgICAgIHNldFJvb3RDZWxsSW5pdGlhbGl6YXRpb246IGZ1bmN0aW9uKGluaXRpYWxpemF0aW9uKSB7XG4gICAgICAgIGlmIChpbml0aWFsaXphdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIF9ub3RlYm9va01vZGVsLmdldCgpLmluaXRpYWxpemVBbGwgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9ub3RlYm9va01vZGVsLmdldCgpLmluaXRpYWxpemVBbGwgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub3RlYm9va01vZGVsQWRkRXZhbHVhdG9yOiBmdW5jdGlvbihuZXdFdmFsdWF0b3IpIHtcbiAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuZXZhbHVhdG9ycy5wdXNoKG5ld0V2YWx1YXRvcik7XG4gICAgICB9LFxuICAgICAgbm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldE5vdGVib29rQ2VsbE9wKCkuZ2V0QWxsQ29kZUNlbGxzKFwicm9vdFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXROb3RlYm9va0NlbGxPcCgpLmdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVuZG86IGZ1bmN0aW9uKCkge1xuICAgICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlci51bmRvKCk7XG4gICAgICB9LFxuICAgICAgcmVkbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnJlZG8oKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ub3RlYm9va1xuICogVGhpcyBpcyB0aGUgJ25vdGVib29rIHZpZXcnIHBhcnQgb2Yge0BsaW5rIGJrQXBwfS4gV2hhdCBpcyB0aGUgcm9vdCBjZWxsIGhvbGRpbmcgdGhlIG5lc3RlZFxuICoge0BsaW5rIGJrQ2VsbH1zLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJywgW1xuICAgICdiay5jb21tb25VaScsXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsub3V0cHV0TG9nJyxcbiAgICAnYmsuY29yZScsXG4gICAgJ2JrLnNlc3Npb25NYW5hZ2VyJyxcbiAgICAnYmsuZXZhbHVhdG9yTWFuYWdlcicsXG4gICAgJ2JrLmNlbGxNZW51UGx1Z2luTWFuYWdlcicsXG4gICAgJ2JrLm91dHB1dERpc3BsYXknXG4gIF0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogYmtDZWxsXG4gKiAtIHRoZSBjb250cm9sbGVyIHRoYXQgcmVzcG9uc2libGUgZm9yIGRpcmVjdGx5IGNoYW5naW5nIHRoZSB2aWV3XG4gKiAtIHRoZSBjb250YWluZXIgZm9yIHNwZWNpZmljIHR5cGVkIGNlbGxcbiAqIC0gdGhlIGRpcmVjdGl2ZSBpcyBkZXNpZ25lZCB0byBiZSBjYXBhYmxlIG9mIHVzZWQgaW4gYSBuZXN0ZWQgd2F5XG4gKiAtIGNvbmNlcHR1YWxseSwgYSBjZWxsIGlzICdjZWxsIG1vZGVsJyArICd2aWV3IG1vZGVsJyhhbiBleGFtcGxlIG9mIHdoYXQgZ29lcyBpbiB0byB0aGUgdmlld1xuICogbW9kZWwgaXMgY29kZSBjZWxsIGJnIGNvbG9yKVxuICogLSBBIGJrQ2VsbCBpcyBnZW5lcmljYWxseSBjb3JyZXNwb25kcyB0byBhIHBvcnRpb24gb2YgdGhlIG5vdGVib29rIG1vZGVsIChjdXJyZW50bHksIGl0IGlzXG4gKiBhbHdheXMgYSBicmFuY2ggaW4gdGhlIGhpZXJhcmNoeSlcbiAqIC0gV2hlbiBleHBvcnRpbmcgKGEuay5hLiBzaGFyaW5nKSwgd2Ugd2lsbCBuZWVkIGJvdGggdGhlIGNlbGwgbW9kZWwgYW5kIHRoZSB2aWV3IG1vZGVsXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NlbGwnLCBmdW5jdGlvbihia1V0aWxzLCBia1Nlc3Npb25NYW5hZ2VyLCBia0NvcmVNYW5hZ2VyLCBia0V2YWx1YXRvck1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jZWxsJ10oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNlbGxtb2RlbDogJz0nLFxuICAgICAgICBpbmRleDogJz0nXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvclJlYWRlciA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBnZXRCa0Jhc2VWaWV3TW9kZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKS5nZXRWaWV3TW9kZWwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuXG4gICAgICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIG5vdGVib29rQ2VsbE9wLmlzTGFzdCgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfSwgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICAkc2NvcGUuaXNMYXJnZSA9IG5ld1ZhbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3ID0ge1xuICAgICAgICAgIHNob3dEZWJ1Z0luZm86IGZhbHNlLFxuICAgICAgICAgIG1lbnU6IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIHJlbmFtZUl0ZW06IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgICAgICAgXy5maW5kV2hlcmUodGhpcy5pdGVtcyxcbiAgICAgICAgICAgICAgICB7bmFtZTogb3B0cy5uYW1lfVxuICAgICAgICAgICAgICApLm5hbWUgPSBvcHRzLm5ld05hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkSXRlbTogZnVuY3Rpb24obWVudUl0ZW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG1lbnVJdGVtKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRJdGVtVG9IZWFkOiBmdW5jdGlvbihtZW51SXRlbSkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZSgwLCAwLCBtZW51SXRlbSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24oaXRlbU5hbWUpIHtcbiAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKF8uZmluZCh0aGlzLml0ZW1zLCBmdW5jdGlvbihpdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdC5uYW1lID09PSBpdGVtTmFtZTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0xvY2tlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubmV3Q2VsbE1lbnVDb25maWcgPSB7XG4gICAgICAgICAgaXNTaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTG9ja2VkKCkgJiYgIW5vdGVib29rQ2VsbE9wLmlzQ29udGFpbmVyKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYXR0YWNoQ2VsbDogZnVuY3Rpb24obmV3Q2VsbCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AuaW5zZXJ0QWZ0ZXIoJHNjb3BlLmNlbGxtb2RlbC5pZCwgbmV3Q2VsbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2Q2VsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEZ1bGxJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudC5nZXROZXN0ZWRMZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LmdldEZ1bGxJbmRleCgpICsgJy4nICsgKCRzY29wZS5pbmRleCArIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAkc2NvcGUuaW5kZXggKyAkc2NvcGUuZ2V0TmVzdGVkTGV2ZWwoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlU2hvd0RlYnVnSW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzY29wZS5jZWxsdmlldy5zaG93RGVidWdJbmZvID0gISRzY29wZS5jZWxsdmlldy5zaG93RGVidWdJbmZvO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaXNTaG93RGVidWdJbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsdmlldy5zaG93RGVidWdJbmZvO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaXNEZWJ1Z2dpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0QmtCYXNlVmlld01vZGVsKCkuaXNEZWJ1Z2dpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldE5lc3RlZExldmVsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gYmtDZWxsIGlzIHVzaW5nIGlzb2xhdGVkIHNjb3BlLCAkc2NvcGUgaXMgdGhlIGlzb2xhdGVkIHNjb3BlXG4gICAgICAgICAgLy8gJHNjb3BlLiRwYXJlbnQgaXMgdGhlIHNjb3BlIHJlc3VsdGVkIGZyb20gbmctcmVwZWF0IChuZy1yZXBlYXQgY3JlYXRlcyBhIHByb3RvdHlwYWxcbiAgICAgICAgICAvLyBzY29wZSBmb3IgZWFjaCBuZy1yZXBlYXRlZCBpdGVtKVxuICAgICAgICAgIC8vICRTY29wZS4kcGFyZW50LiRwYXJlbnQgaXMgdGhlIGNvbnRhaW5lciBjZWxsKHdoaWNoIGluaXRpYXRlcyBuZy1yZXBlYXQpIHNjb3BlXG4gICAgICAgICAgdmFyIHBhcmVudCA9ICRzY29wZS4kcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXROZXN0ZWRMZXZlbCA/IHBhcmVudC5nZXROZXN0ZWRMZXZlbCgpICsgMSA6IDE7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRQYXJlbnRJZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuJHBhcmVudC4kcGFyZW50LmNlbGxtb2RlbCA/ICRzY29wZS4kcGFyZW50LiRwYXJlbnQuY2VsbG1vZGVsLmlkIDogJ3Jvb3QnO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVDZWxsSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgIGRlbGV0ZSAkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZXZhbHVhdGUgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBpZiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuc3RhdGUgPSB7fTtcblxuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKVxuICAgICAgICAgICAgLmV2YWx1YXRlUm9vdCgkc2NvcGUuY2VsbG1vZGVsKVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kZWxldGVDZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3AuZGVsZXRlKCRzY29wZS5jZWxsbW9kZWwuaWQsIHRydWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRFdmFsdWF0b3JzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0RXZhbHVhdG9yKCRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbW92ZU1ldGhvZCA9ICdtb3ZlJztcbiAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwudHlwZSA9PSAnc2VjdGlvbicpIHtcbiAgICAgICAgICBtb3ZlTWV0aG9kID0gJ21vdmVTZWN0aW9uJztcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbFVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3BbbW92ZU1ldGhvZCArICdVcCddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbERvd24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcFttb3ZlTWV0aG9kICsgJ0Rvd24nXSgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubW92ZUNlbGxVcERpc2FibGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICFub3RlYm9va0NlbGxPcFsnaXNQb3NzaWJsZVRvJyArIF8uc3RyaW5nLmNhcGl0YWxpemUobW92ZU1ldGhvZCkgKyAnVXAnXSgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubW92ZUNlbGxEb3duRGlzYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIW5vdGVib29rQ2VsbE9wWydpc1Bvc3NpYmxlVG8nICsgXy5zdHJpbmcuY2FwaXRhbGl6ZShtb3ZlTWV0aG9kKSArICdEb3duJ10oJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ0RlbGV0ZSBjZWxsJyxcbiAgICAgICAgICBhY3Rpb246ICRzY29wZS5kZWxldGVDZWxsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdNb3ZlIHVwJyxcbiAgICAgICAgICBhY3Rpb246ICRzY29wZS5tb3ZlQ2VsbFVwLFxuICAgICAgICAgIGRpc2FibGVkOiAkc2NvcGUubW92ZUNlbGxVcERpc2FibGVkXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdNb3ZlIGRvd24nLFxuICAgICAgICAgIGFjdGlvbjogJHNjb3BlLm1vdmVDZWxsRG93bixcbiAgICAgICAgICBkaXNhYmxlZDogJHNjb3BlLm1vdmVDZWxsRG93bkRpc2FibGVkXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdDdXQnLFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5jdXQoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnUGFzdGUgKGFwcGVuZCBhZnRlciknLFxuICAgICAgICAgIGRpc2FibGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhbm90ZWJvb2tDZWxsT3AuY2xpcGJvYXJkO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnBhc3RlKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmdldFR5cGVDZWxsVXJsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHR5cGUgPSAkc2NvcGUuY2VsbG1vZGVsLnR5cGU7XG4gICAgICAgICAgcmV0dXJuIHR5cGUgKyAnLWNlbGwuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzQ29kZUNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC50eXBlID09ICdjb2RlJztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvZGVDZWxsJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgICR0aW1lb3V0KSB7XG5cbiAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgIH07XG4gICAgdmFyIENFTExfVFlQRSA9ICdjb2RlJztcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbCddKCksXG4gICAgICBzY29wZToge2NlbGxtb2RlbDogJz0nLCBjZWxsbWVudTogJz0nfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuY2VsbHZpZXcgPSB7XG4gICAgICAgICAgaW5wdXRNZW51OiBbXSxcbiAgICAgICAgICBkaXNwbGF5czogW11cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC5nZXRGdWxsSW5kZXgoKSArICcuJyArICgkc2NvcGUuJHBhcmVudC5pbmRleCArIDEpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0xvY2tlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhKCRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvL2pzY3M6ZGlzYWJsZVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsID09PSB1bmRlZmluZWQgfHwgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQgPT09IHVuZGVmaW5lZCB8fCAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9qc2NzOmVuYWJsZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB0eXBlID0gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0LmlubmVydHlwZTtcblxuICAgICAgICAgIGlmICghdHlwZSAmJiAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQucGF5bG9hZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0eXBlID0gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0LnBheWxvYWQuaW5uZXJ0eXBlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0eXBlID09ICdFcnJvcic7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd0lucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5pc0xvY2tlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgLy8gZW5zdXJlIGNtIHJlZnJlc2hlcyB3aGVuICd1bmhpZGUnXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzU2hvd0lucHV0KCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNtICYmIG5ld1ZhbHVlID09PSB0cnVlICYmIG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNtLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmlzSGlkZGVuT3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnNlbGVjdGVkVHlwZSA9PSAnSGlkZGVuJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaGFzT3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5iYWNrZ3JvdW5kQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLmlzU2hvd0lucHV0KCkgfHwgJChldmVudC50b0VsZW1lbnQpLnBhcmVudHMoKS5oYXNDbGFzcygnY29kZS1jZWxsLW91dHB1dCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB0b3AgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgdmFyIG91dHB1dEVsZW1lbnQgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5jaGlsZHJlbignLmNvZGUtY2VsbC1vdXRwdXQ6Zmlyc3QnKTtcbiAgICAgICAgICB2YXIgYm90dG9tO1xuICAgICAgICAgIGlmIChvdXRwdXRFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IG91dHB1dEVsZW1lbnQub2Zmc2V0KCkudG9wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib3R0b20gPSB0b3AgKyAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5oZWlnaHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRXZlbiBiZXR0ZXIgd291bGQgYmUgdG8gZGV0ZWN0IGxlZnQvcmlnaHQgYW5kIG1vdmUgdG9cbiAgICAgICAgICAvLyBiZWdpbm5pbmcgb3IgZW5kIG9mIGxpbmUsIGJ1dCB3ZSBjYW4gbGl2ZSB3aXRoIHRoaXMgZm9yIG5vdy5cbiAgICAgICAgICB2YXIgY20gPSAkc2NvcGUuY207XG4gICAgICAgICAgaWYgKGV2ZW50LnBhZ2VZIDwgKHRvcCArIGJvdHRvbSkgLyAyKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoMCwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihjbS5saW5lQ291bnQoKSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgY20uZ2V0TGluZShjbS5sYXN0TGluZSgpKS5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc1Nob3dPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQ7XG4gICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAhKHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IHJlc3VsdCA9PT0gbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm91dHB1dFRpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5pc0Vycm9yKCkgPyAnRXJyb3InIDogbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZXZhbHVhdGUgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBpZiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuc3RhdGUgPSB7fTtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwpLlxuICAgICAgICAgICAgICBjYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2YWx1YXRpb24gZmFpbGVkJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZWRpdGVkTGlzdGVuZXIgPSBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaWQnLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5ldmFsdWF0b3InLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pbml0aWFsaXphdGlvbicsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmlucHV0LmJvZHknLCBlZGl0ZWRMaXN0ZW5lcik7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5vdXRwdXQucmVzdWx0JywgZWRpdGVkTGlzdGVuZXIpO1xuXG4gICAgICAgICRzY29wZS5hdXRvY29tcGxldGUgPSBmdW5jdGlvbihjcG9zLCBvblJlc3VsdHMpIHtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9yID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcigkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcik7XG4gICAgICAgICAgaWYgKCFldmFsdWF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV2YWx1YXRvci5hdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIGV2YWx1YXRvci5hdXRvY29tcGxldGUoJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5ib2R5LCBjcG9zLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdG9yLmF1dG9jb21wbGV0ZTIpIHtcbiAgICAgICAgICAgIC8vIHVzZWQgYnkgSmF2YVNjcmlwdCBldmFsdWF0b3JcbiAgICAgICAgICAgIGV2YWx1YXRvci5hdXRvY29tcGxldGUyKCRzY29wZS5jbSwgbnVsbCwgb25SZXN1bHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3IoJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUudXBkYXRlVUkgPSBmdW5jdGlvbihldmFsdWF0b3IpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNtICYmIGV2YWx1YXRvcikge1xuICAgICAgICAgICAgJHNjb3BlLmNtLnNldE9wdGlvbignbW9kZScsIGV2YWx1YXRvci5jbU1vZGUpO1xuICAgICAgICAgICAgaWYgKGV2YWx1YXRvci5pbmRlbnRTcGFjZXMpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNtLnNldE9wdGlvbignaW5kZW50VW5pdCcsIGV2YWx1YXRvci5pbmRlbnRTcGFjZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZ2V0RXZhbHVhdG9yKCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAkc2NvcGUudXBkYXRlVUkobmV3VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmFwcGVuZENvZGVDZWxsID0gZnVuY3Rpb24oZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgIHZhciB0aGlzQ2VsbElkID0gJHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICBpZiAoIWV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIGV2YWx1YXRvciBzcGVjaWZpZWQsIHVzZSB0aGUgY3VycmVudCBldmFsdWF0b3JcbiAgICAgICAgICAgIGV2YWx1YXRvck5hbWUgPSAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5ld0NlbGwgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rTmV3Q2VsbEZhY3RvcnkoKS5uZXdDb2RlQ2VsbChldmFsdWF0b3JOYW1lKTtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5hcHBlbmRBZnRlcih0aGlzQ2VsbElkLCBuZXdDZWxsKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oQ0VMTF9UWVBFKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNoYXJlTWVudSA9IHtcbiAgICAgICAgICBuYW1lOiAnU2hhcmUnLFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbShzaGFyZU1lbnUpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRTaGFyZU1lbnVQbHVnaW4oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnU2hvdyBpbnB1dCBjZWxsJyxcbiAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnU2hvdyBvdXRwdXQgY2VsbCAoaWYgYXZhaWxhYmxlKScsXG4gICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbjtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ0luaXRpYWxpemF0aW9uIENlbGwnLFxuICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ09wdGlvbnMnLFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3dGdWxsTW9kYWxEaWFsb2coZnVuY3Rpb24gY2IocikgeyB9ICxcbiAgICAgICAgICAgICAgICAnYXBwL21haW5hcHAvZGlhbG9ncy9jb2RlY2VsbG9wdGlvbnMuanN0Lmh0bWwnLCAnQ29kZUNlbGxPcHRpb25zQ29udHJvbGxlcicsICRzY29wZS5jZWxsbW9kZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuc2hvd0RlYnVnID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gaXNGdWxsU2NyZWVuKGNtKSB7XG4gICAgICAgICAgcmV0dXJuIC9cXGJDb2RlTWlycm9yLWZ1bGxzY3JlZW5cXGIvLnRlc3QoY20uZ2V0V3JhcHBlckVsZW1lbnQoKS5jbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2luSGVpZ2h0KCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRGdWxsU2NyZWVuKGNtLCBmdWxsKSB7XG4gICAgICAgICAgdmFyIHdyYXAgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpO1xuICAgICAgICAgIGlmIChmdWxsKSB7XG4gICAgICAgICAgICB3cmFwLmNsYXNzTmFtZSArPSAnIENvZGVNaXJyb3ItZnVsbHNjcmVlbic7XG4gICAgICAgICAgICB3cmFwLnN0eWxlLmhlaWdodCA9IHdpbkhlaWdodCgpICsgJ3B4JztcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3cmFwLmNsYXNzTmFtZSA9IHdyYXAuY2xhc3NOYW1lLnJlcGxhY2UoJyBDb2RlTWlycm9yLWZ1bGxzY3JlZW4nLCAnJyk7XG4gICAgICAgICAgICB3cmFwLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzaG93aW5nID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdDb2RlTWlycm9yLWZ1bGxzY3JlZW4nKVswXTtcbiAgICAgICAgICBpZiAoIXNob3dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hvd2luZy5Db2RlTWlycm9yLmdldFdyYXBwZXJFbGVtZW50KCkuc3R5bGUuaGVpZ2h0ID0gd2luSGVpZ2h0KCkgKyAncHgnO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS5mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgICAgIENvZGVNaXJyb3Iub24od2luZG93LCAncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG5cbiAgICAgICAgdmFyIGNvZGVNaXJyb3JPcHRpb25zID0gYmtDb3JlTWFuYWdlci5jb2RlTWlycm9yT3B0aW9ucyhzY29wZSwgbm90ZWJvb2tDZWxsT3ApO1xuICAgICAgICBfLmV4dGVuZChjb2RlTWlycm9yT3B0aW9ucy5leHRyYUtleXMsIHtcbiAgICAgICAgICAnRXNjJyA6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZCgnc2luZ2xlU2VsZWN0aW9uJyk7XG4gICAgICAgICAgICBpZiAoY20uc3RhdGUudmltICYmIGNtLnN0YXRlLnZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChpc0Z1bGxTY3JlZW4oY20pKSB7XG4gICAgICAgICAgICAgICAgc2V0RnVsbFNjcmVlbihjbSwgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQWx0LUYxMSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzZXRGdWxsU2NyZWVuKGNtLCAhaXNGdWxsU2NyZWVuKGNtKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnU2hpZnQtQ3RybC1BJzogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIHNjb3BlLmFwcGVuZENvZGVDZWxsKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnU2hpZnQtQ21kLUEnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUuYXBwZW5kQ29kZUNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DdHJsLUUnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUucG9wdXBNZW51KCk7XG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5pbnB1dGNlbGxtZW51JykuZmluZCgnbGknKS5maW5kKCdhJylbMF0uZm9jdXMoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DbWQtRSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzY29wZS5wb3B1cE1lbnUoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLmlucHV0Y2VsbG1lbnUnKS5maW5kKCdsaScpLmZpbmQoJ2EnKVswXS5mb2N1cygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ0N0cmwtQWx0LUgnOiBmdW5jdGlvbihjbSkgeyAvLyBjZWxsIGhpZGVcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQ21kLUFsdC1IJzogZnVuY3Rpb24oY20pIHsgLy8gY2VsbCBoaWRlXG4gICAgICAgICAgICBzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgU2Nyb2xsaW4udHJhY2soZWxlbWVudFswXSwge2hhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNtID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZWxlbWVudC5maW5kKCd0ZXh0YXJlYScpWzBdLCBjb2RlTWlycm9yT3B0aW9ucyk7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckNNKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUuY20pO1xuICAgICAgICAgIHNjb3BlLmNtLm9uKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICBzY29wZS51cGRhdGVVSShzY29wZS5nZXRFdmFsdWF0b3IoKSk7XG4gICAgICAgIH19KTtcblxuICAgICAgICBzY29wZS5ia05vdGVib29rLnJlZ2lzdGVyRm9jdXNhYmxlKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUpO1xuXG4gICAgICAgIC8vIGNlbGxtb2RlbC5ib2R5IC0tPiBDb2RlTWlycm9yXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmlucHV0LmJvZHknLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChzY29wZS5jbSAmJiBuZXdWYWwgIT09IHNjb3BlLmNtLmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgbmV3VmFsID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5jbS5zZXRWYWx1ZShuZXdWYWwpO1xuICAgICAgICAgICAgc2NvcGUuY20uY2xlYXJIaXN0b3J5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2VsbG1vZGVsLmJvZHkgPC0tIENvZGVNaXJyb3JcbiAgICAgICAgdmFyIGNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbihjbSwgZSkge1xuICAgICAgICAgIGlmIChzY29wZS5jZWxsbW9kZWwuaW5wdXQuYm9keSAhPT0gY20uZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmxpbmVDb3VudCA9IGNtLmxpbmVDb3VudCgpO1xuICAgICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmlucHV0LmJvZHkgPSBjbS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKCFia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpbnB1dE1lbnVEaXYgPSBlbGVtZW50LmZpbmQoJy5ia2NlbGwnKS5maXJzdCgpO1xuICAgICAgICBzY29wZS5wb3B1cE1lbnUgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHZhciBtZW51ID0gaW5wdXRNZW51RGl2LmZpbmQoJy5kcm9wZG93bicpLmZpcnN0KCk7XG4gICAgICAgICAgbWVudS5maW5kKCcuZHJvcGRvd24tdG9nZ2xlJykuZmlyc3QoKS5kcm9wZG93bigndG9nZ2xlJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5ia2NlbGwnKS5hZGRDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5ia2NlbGwnKS5yZW1vdmVDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS4kd2F0Y2goJ2lzSW5pdGlhbGl6YXRpb25DZWxsKCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuYmtjZWxsJykuYWRkQ2xhc3MoJ2luaXRjZWxsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5ia2NlbGwnKS5yZW1vdmVDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLmdldFNoYXJlRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBldmFsdWF0b3IgPSBfKGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpLmV2YWx1YXRvcnMpXG4gICAgICAgICAgICAgIC5maW5kKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3IubmFtZSA9PT0gc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgdmFyIGNlbGxzID0gW3Njb3BlLmNlbGxtb2RlbF07XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2VuZXJhdGVOb3RlYm9vayhbZXZhbHVhdG9yXSwgY2VsbHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLiRvbignYmVha2VyLmNlbGwuYWRkZWQnLCBmdW5jdGlvbihlLCBjZWxsbW9kZWwpIHtcbiAgICAgICAgICBpZiAoY2VsbG1vZGVsID09PSBzY29wZS5jZWxsbW9kZWwpIHtcbiAgICAgICAgICAgIHNjb3BlLmNtICYmIHNjb3BlLmNtLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kb24oJ2JlYWtlci5zZWN0aW9uLnRvZ2dsZWQnLCBmdW5jdGlvbihlLCBpc0NvbGxhcHNlZCkge1xuICAgICAgICAgIGlmICghaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzY29wZS5jbS5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBTY3JvbGxpbi51bnRyYWNrKGVsZW1lbnRbMF0pO1xuICAgICAgICAgIENvZGVNaXJyb3Iub2ZmKHdpbmRvdywgJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICAgIENvZGVNaXJyb3Iub2ZmKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rLnVucmVnaXN0ZXJGb2N1c2FibGUoc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rLnVucmVnaXN0ZXJDTShzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIHNjb3BlLmJrTm90ZWJvb2sgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBob2xkcyB0aGUgbG9naWMgZm9yIGNvZGUgY2VsbCwgd2hpY2ggaXMgYSB0eXBlZCB7QGxpbmsgYmtDZWxsfS5cbiAqIFRoZSBjb2RlIGNlbGwgY29udGFpbnMgYW4gaW5wdXQgY2VsbCBhbiBvdXRwdXQgY2VsbCAoe0BsaW5rIGJrQ29kZUNlbGxPdXRwdXR9KSBhbmQgY2VsbCBtZW51cy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvZGVDZWxsSW5wdXRNZW51JywgZnVuY3Rpb24oYmtDb3JlTWFuYWdlcikge1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICB9IDtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbGlucHV0bWVudSddKCksXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmdldEl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkcm9wZG93bi1zdWJtZW51Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U3VibWVudUl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U2hvd0V2YWxJY29uID0gZnVuY3Rpb24oZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvciA9PT0gZXZhbHVhdG9yTmFtZTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnNldEV2YWx1YXRvciA9IGZ1bmN0aW9uKGV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICB2YXIgY2VsbElkID0gJHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvciA9IGV2YWx1YXRvck5hbWU7XG4gICAgICAgICAgZ2V0QmtOb3RlYm9va1dpZGdldCgpLmdldEZvY3VzYWJsZShjZWxsSWQpLmZvY3VzKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBhYnN0cmFjdCBjb250YWluZXIgZm9yIHR5cGVzIG9mIG91dHB1dCBkaXNwbGF5cy4gV2hpbGUgd2UgcGxhbiB0byBtYWtlIHRoZSBvdXRwdXQgZGlzcGxheSBsb2FkaW5nXG4gKiBtZWNoYW5pc20gbW9yZSBwbHVnZ2FibGUsIHJpZ2h0IG5vdywgdGhpcyBtb2R1bGUgc2VydmVzIGFzIHRoZSByZWdpc3RyYXRpb24gb3V0cHV0IGRpc3BsYXkgdHlwZXMgYW5kIGhvbGRzIHRoZSBsb2dpY1xuICogZm9yIHN3aXRjaCBiZXR3ZWVuIGFwcGxpY2FibGUgb3V0cHV0IGRpc3BsYXkgdGhyb3VnaCBVSS5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvZGVDZWxsT3V0cHV0JywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLCBia091dHB1dERpc3BsYXlGYWN0b3J5LCBia0V2YWx1YXRvck1hbmFnZXIsIGJrRXZhbHVhdGVKb2JNYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxvdXRwdXRcIl0oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIG1vZGVsOiBcIj1cIixcbiAgICAgICAgZXZhbHVhdG9ySWQ6IFwiQFwiLFxuICAgICAgICBjZWxsSWQ6IFwiQFwiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBfc2hhcmVNZW51SXRlbXMgPSBbXTtcblxuICAgICAgICAkc2NvcGUuZ2V0T3V0cHV0UmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbC5yZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuc3Vic2NyaWJlZFRvKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWUgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXSkge1xuICAgICAgICAgICAgICB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXS51bnN1YnNjcmliZSgkc2NvcGUuc3Vic2NyaWJlZFRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5jZWxsSWQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmRlUmVnaXN0ZXJPdXRwdXRDZWxsKCRzY29wZS5jZWxsSWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmFwcGxpY2FibGVEaXNwbGF5cyA9IFtdO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRPdXRwdXRSZXN1bHQoKScsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuc3Vic2NyaWJlZFRvICYmICRzY29wZS5zdWJzY3JpYmVkVG8gIT09IHJlc3VsdC51cGRhdGVfaWQpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUubW9kZWwucGx1Z2luTmFtZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdLnVuc3Vic2NyaWJlKCRzY29wZS5zdWJzY3JpYmVkVG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLnN1YnNjcmliZWRUbyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghJHNjb3BlLnN1YnNjcmliZWRUbyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQudXBkYXRlX2lkKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWUgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXSkge1xuICAgICAgICAgICAgICB2YXIgb25VcGRhdGFibGVSZXN1bHRVcGRhdGUgPSBmdW5jdGlvbih1cGRhdGUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwucmVzdWx0ID0gdXBkYXRlO1xuICAgICAgICAgICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0uc3Vic2NyaWJlKHJlc3VsdC51cGRhdGVfaWQsIG9uVXBkYXRhYmxlUmVzdWx0VXBkYXRlKTtcbiAgICAgICAgICAgICAgJHNjb3BlLnN1YnNjcmliZWRUbyA9IHJlc3VsdC51cGRhdGVfaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdC50eXBlID09PSBcIlVwZGF0YWJsZUV2YWx1YXRpb25SZXN1bHRcIilcbiAgICAgICAgICAgICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXMgPSBia091dHB1dERpc3BsYXlGYWN0b3J5LmdldEFwcGxpY2FibGVEaXNwbGF5cyhyZXN1bHQucGF5bG9hZCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgJHNjb3BlLmFwcGxpY2FibGVEaXNwbGF5cyA9IGJrT3V0cHV0RGlzcGxheUZhY3RvcnkuZ2V0QXBwbGljYWJsZURpc3BsYXlzKHJlc3VsdCk7XG4gICAgICAgICAgJHNjb3BlLm1vZGVsLnNlbGVjdGVkVHlwZSA9ICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXNbMF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRvIGJlIHVzZWQgaW4gYmtPdXRwdXREaXNwbGF5XG4gICAgICAgICRzY29wZS5vdXRwdXREaXNwbGF5TW9kZWwgPSB7XG4gICAgICAgICAgZ2V0Q2VsbE1vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkc2NvcGUuZ2V0T3V0cHV0UmVzdWx0KCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC50eXBlID09PSBcIkJlYWtlckRpc3BsYXlcIikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm9iamVjdDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICYmIHJlc3VsdC50eXBlID09PSBcIlVwZGF0YWJsZUV2YWx1YXRpb25SZXN1bHRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQucGF5bG9hZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXREdW1wU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRzY29wZS5tb2RlbC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXREdW1wU3RhdGU6IGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbC5zdGF0ZSA9IHM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNldFNoYXJlTWVudUl0ZW1zOiBmdW5jdGlvbihuZXdJdGVtcykge1xuICAgICAgICAgICAgX3NoYXJlTWVudUl0ZW1zID0gbmV3SXRlbXM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRDb21ldGRVdGlsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICRzY29wZS5nZXRFdmFsdWF0b3JJZCgpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgIHZhciBldmFsdWF0b3IgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0RXZhbHVhdG9yKGlkKTtcbiAgICAgICAgICAgICAgaWYgKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3IuY29tZXRkVXRpbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0RXZhbHVhdG9ySWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlkID0gJHNjb3BlO1xuICAgICAgICAgICAgd2hpbGUgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGlkLmV2YWx1YXRvcklkICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkLmV2YWx1YXRvcklkO1xuICAgICAgICAgICAgICBpZCA9IGlkLiRwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0T3V0cHV0RGlzcGxheVR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIHJldHVybiBcIlRleHRcIjtcbiAgICAgICAgICB2YXIgdHlwZSA9ICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGU7XG4gICAgICAgICAgLy8gaWYgQmVha2VyRGlzcGxheSBvciBVcGRhdGFibGVFdmFsdWF0aW9uUmVzdWx0LCB1c2UgdGhlIGlubmVyIHR5cGUgaW5zdGVhZFxuICAgICAgICAgIGlmICh0eXBlID09PSBcIkJlYWtlckRpc3BsYXlcIikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRzY29wZS5nZXRPdXRwdXRSZXN1bHQoKTtcbiAgICAgICAgICAgIHR5cGUgPSByZXN1bHQgPyByZXN1bHQuaW5uZXJ0eXBlIDogXCJIaWRkZW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdldEVsYXBzZWRUaW1lU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5tb2RlbC5lbGFwc2VkVGltZSB8fCAkc2NvcGUubW9kZWwuZWxhcHNlZFRpbWUgPT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbGFwc2VkVGltZSA9ICRzY29wZS5tb2RlbC5lbGFwc2VkVGltZTtcbiAgICAgICAgICAgIHJldHVybiBcIkVsYXBzZWQgdGltZTogXCIgKyBia1V0aWxzLmZvcm1hdFRpbWVTdHJpbmcoZWxhcHNlZFRpbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNTaG93T3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50ICE9PSB1bmRlZmluZWQgJiYgJHNjb3BlLiRwYXJlbnQuaXNTaG93T3V0cHV0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuaXNTaG93T3V0cHV0KCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd01lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiAkc2NvcGUuJHBhcmVudC5pc1Nob3dNZW51ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuaXNTaG93TWVudSgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVFeHBhbnNpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsICE9PSB1bmRlZmluZWQgJiYgJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdCgnZXhwYW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0V4cGFuZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmNlbGxtb2RlbCAhPT0gdW5kZWZpbmVkICYmICRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiAhJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW47XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdG8gYmUgdXNlZCBpbiBvdXRwdXQgY2VsbCBtZW51XG4gICAgICAgICRzY29wZS5vdXRwdXRDZWxsTWVudU1vZGVsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBfYWRkaXRpb25hbE1lbnVJdGVtcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJTaGFyZVwiLFxuICAgICAgICAgICAgICBpdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zaGFyZU1lbnVJdGVtcztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJUb2dnbGUgQ2VsbCBPdXRwdXRcIixcbiAgICAgICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNFeHBhbmRlZCgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS50b2dnbGVFeHBhbnNpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJEZWxldGVcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubW9kZWwucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBnZXRFbGFwc2VkVGltZVN0cmluZyxcbiAgICAgICAgICAgICAgYWN0aW9uOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0QXBwbGljYWJsZURpc3BsYXlzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5hcHBsaWNhYmxlRGlzcGxheXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2VsZWN0ZWREaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2VsZWN0ZWREaXNwbGF5OiBmdW5jdGlvbihkaXNwbGF5KSB7XG4gICAgICAgICAgICAgICRzY29wZS5tb2RlbC5zZWxlY3RlZFR5cGUgPSBkaXNwbGF5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFkZGl0aW9uYWxNZW51SXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gX2FkZGl0aW9uYWxNZW51SXRlbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5vdXRwdXRSZWZyZXNoZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICggJHNjb3BlLmNlbGxJZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5yZWdpc3Rlck91dHB1dENlbGwoJHNjb3BlLmNlbGxJZCwgJHNjb3BlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0NvZGVDZWxsT3V0cHV0TWVudScsIGZ1bmN0aW9uKGJrVXRpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxvdXRwdXRtZW51XCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBtb2RlbDogJz0nXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5nZXRJdGVtTmFtZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRJdGVtQ2xhc3MgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICB2YXIgc3ViSXRlbXMgPSAkc2NvcGUuZ2V0U3ViSXRlbXMoaXRlbSk7XG4gICAgICAgICAgICBpZiAoc3ViSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChcImRyb3Bkb3duLXN1Ym1lbnVcIik7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZHJvcC1sZWZ0XCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJkaXNwbGF5LW5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuZ2V0SXRlbU5hbWUoaXRlbSkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U3VibWVudUl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZGlzYWJsZWQtbGlua1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKFwiIFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFN1Ykl0ZW1zID0gZnVuY3Rpb24ocGFyZW50SXRlbSkge1xuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24ocGFyZW50SXRlbS5pdGVtcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRJdGVtLml0ZW1zKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwYXJlbnRJdGVtLml0ZW1zO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTUgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gT3ZlcnJpZGUgbWFya2Rvd24gbGluayByZW5kZXJlciB0byBhbHdheXMgaGF2ZSBgdGFyZ2V0PVwiX2JsYW5rXCJgXG4gIC8vIE1vc3RseSBmcm9tIFJlbmRlcmVyLnByb3RvdHlwZS5saW5rXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZC9ibG9iL21hc3Rlci9saWIvbWFya2VkLmpzI0w4NjItTDg4MVxuICB2YXIgYmtSZW5kZXJlciA9IG5ldyBtYXJrZWQuUmVuZGVyZXIoKTtcbiAgYmtSZW5kZXJlci5saW5rID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgICB2YXIgcHJvdDtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgICB0cnkge1xuICAgICAgICBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKVxuICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIC8vanNoaW50IGlnbm9yZTpzdGFydFxuICAgICAgaWYgKHByb3QuaW5kZXhPZignamF2YXNjcmlwdDonKSA9PT0gMCB8fCBwcm90LmluZGV4T2YoJ3Zic2NyaXB0OicpID09PSAwKSB7XG4gICAgICAgIC8vanNoaW50IGlnbm9yZTplbmRcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICAgIH1cbiAgICBvdXQgKz0gJyB0YXJnZXQ9XCJfYmxhbmtcIic7IC8vIDwgQURERUQgVEhJUyBMSU5FIE9OTFlcbiAgICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgYmtSZW5kZXJlci5wYXJhZ3JhcGggPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgLy8gQWxsb3cgdXNlcnMgdG8gd3JpdGUgXFwkIHRvIGVzY2FwZSAkXG4gICAgcmV0dXJuIG1hcmtlZC5SZW5kZXJlci5wcm90b3R5cGUucGFyYWdyYXBoLmNhbGwodGhpcywgdGV4dC5yZXBsYWNlKC9cXFxcXFwkL2csICckJykpO1xuICB9O1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtNYXJrZG93bkVkaXRhYmxlJywgWydia1Nlc3Npb25NYW5hZ2VyJywgJ2JrSGVscGVyJywgJ2JrQ29yZU1hbmFnZXInLCAnJHRpbWVvdXQnLCBmdW5jdGlvbihia1Nlc3Npb25NYW5hZ2VyLCBia0hlbHBlciwgYmtDb3JlTWFuYWdlciwgJHRpbWVvdXQpIHtcbiAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL21hcmtkb3duLWVkaXRhYmxlXCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBjZWxsbW9kZWw6ICc9J1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgY29udGVudEF0dHJpYnV0ZSA9IHNjb3BlLmNlbGxtb2RlbC50eXBlID09PSBcInNlY3Rpb25cIiA/ICd0aXRsZScgOiAnYm9keSc7XG5cbiAgICAgICAgdmFyIHByZXZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbWFya2Rvd25GcmFnbWVudCA9ICQoJzxkaXY+JyArIHNjb3BlLmNlbGxtb2RlbFtjb250ZW50QXR0cmlidXRlXSArICc8L2Rpdj4nKTtcbiAgICAgICAgICByZW5kZXJNYXRoSW5FbGVtZW50KG1hcmtkb3duRnJhZ21lbnRbMF0sIHtcbiAgICAgICAgICAgIGRlbGltaXRlcnM6IFtcbiAgICAgICAgICAgICAge2xlZnQ6IFwiJCRcIiwgcmlnaHQ6IFwiJCRcIiwgZGlzcGxheTogdHJ1ZX0sXG4gICAgICAgICAgICAgIHtsZWZ0OiBcIiRcIiwgcmlnaHQ6ICBcIiRcIiwgZGlzcGxheTogZmFsc2V9LFxuICAgICAgICAgICAgICB7bGVmdDogXCJcXFxcW1wiLCByaWdodDogXCJcXFxcXVwiLCBkaXNwbGF5OiB0cnVlfSxcbiAgICAgICAgICAgICAge2xlZnQ6IFwiXFxcXChcIiwgcmlnaHQ6IFwiXFxcXClcIiwgZGlzcGxheTogZmFsc2V9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxlbWVudC5maW5kKCcubWFya3VwJykuaHRtbChtYXJrZWQobWFya2Rvd25GcmFnbWVudC5odG1sKCksIHtnZm06IHRydWUsIHJlbmRlcmVyOiBia1JlbmRlcmVyfSkpO1xuICAgICAgICAgIG1hcmtkb3duRnJhZ21lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgc2NvcGUubW9kZSA9ICdwcmV2aWV3JztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3luY0NvbnRlbnRBbmRQcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY2VsbG1vZGVsW2NvbnRlbnRBdHRyaWJ1dGVdID0gc2NvcGUuY20uZ2V0VmFsdWUoKTtcbiAgICAgICAgICBwcmV2aWV3KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmV2YWx1YXRlID0gc3luY0NvbnRlbnRBbmRQcmV2aWV3O1xuXG4gICAgICAgIHNjb3BlLmJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG5cbiAgICAgICAgc2NvcGUuZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5lZGl0KCk7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuZWRpdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKSB8fCB7fTtcbiAgICAgICAgICAvLyBJZiB0aGUgdXNlciBpcyBzZWxlY3Rpbmcgc29tZSB0ZXh0LCBkbyBub3QgZW50ZXIgdGhlIGVkaXQgbWFya2Rvd24gbW9kZVxuICAgICAgICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PSBcIlJhbmdlXCIgJiYgJC5jb250YWlucyhlbGVtZW50WzBdLCBzZWxlY3Rpb24uZm9jdXNOb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYmtIZWxwZXIuaXNOb3RlYm9va0xvY2tlZCgpKSByZXR1cm47XG4gICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIkFcIikgcmV0dXJuOyAvLyBEb24ndCBlZGl0IGlmIGNsaWNraW5nIGEgbGlua1xuXG4gICAgICAgICAgc2NvcGUubW9kZSA9ICdlZGl0JztcblxuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGNvbnRlbnQgb2YgbWFya3VwIHdoZW4gdG9nZ2xpbmcgdG8gZWRpdCBtb2RlIHRvIHByZXZlbnRcbiAgICAgICAgICAgIC8vIGZsYXNoIHdoZW4gdG9nZ2xpbmcgYmFjayB0byBwcmV2aWV3IG1vZGUuXG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5tYXJrdXAnKS5odG1sKCcnKTtcblxuICAgICAgICAgICAgdmFyIGNtID0gc2NvcGUuY207XG4gICAgICAgICAgICBjbS5zZXRWYWx1ZShzY29wZS5jZWxsbW9kZWxbY29udGVudEF0dHJpYnV0ZV0pO1xuICAgICAgICAgICAgY20uY2xlYXJIaXN0b3J5KCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICB2YXIgY2xpY2tMb2NhdGlvbjtcbiAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KTtcbiAgICAgICAgICAgICAgdmFyIHRvcCA9IHdyYXBwZXIub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICB2YXIgYm90dG9tID0gdG9wICsgd3JhcHBlci5vdXRlckhlaWdodCgpO1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5wYWdlWSA8ICh0b3AgKyBib3R0b20pIC8gMikge1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcigwLCAwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbS5zZXRDdXJzb3IoY20ubGluZUNvdW50KCkgLSAxLCBjbS5nZXRMaW5lKGNtLmxhc3RMaW5lKCkpLmxlbmd0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY29kZU1pcnJvck9wdGlvbnMgPSBfLmV4dGVuZChia0NvcmVNYW5hZ2VyLmNvZGVNaXJyb3JPcHRpb25zKHNjb3BlLCBub3RlYm9va0NlbGxPcCksIHtcbiAgICAgICAgICBsaW5lTnVtYmVyczogZmFsc2UsXG4gICAgICAgICAgbW9kZTogXCJtYXJrZG93blwiLFxuICAgICAgICAgIHNtYXJ0SW5kZW50OiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS5jbSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGVsZW1lbnQuZmluZChcInRleHRhcmVhXCIpWzBdLCBjb2RlTWlycm9yT3B0aW9ucyk7XG5cbiAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckZvY3VzYWJsZShzY29wZS5jZWxsbW9kZWwuaWQsIHNjb3BlKTtcbiAgICAgICAgc2NvcGUuYmtOb3RlYm9vay5yZWdpc3RlckNNKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUuY20pO1xuXG4gICAgICAgIHNjb3BlLmNtLnNldFZhbHVlKHNjb3BlLmNlbGxtb2RlbFtjb250ZW50QXR0cmlidXRlXSk7XG4gICAgICAgIHByZXZpZXcoKTtcblxuICAgICAgICBzY29wZS5jbS5vbihcImJsdXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzeW5jQ29udGVudEFuZFByZXZpZXcoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCdiZWFrZXIuY2VsbC5hZGRlZCcsIGZ1bmN0aW9uKGUsIGNlbGxtb2RlbCkge1xuICAgICAgICAgIGlmIChjZWxsbW9kZWwgPT09IHNjb3BlLmNlbGxtb2RlbCkgc2NvcGUuZWRpdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5ib2R5JywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTWFya2Rvd25DZWxsJywgW1xuICAgICAgJ2JrU2Vzc2lvbk1hbmFnZXInLFxuICAgICAgJ2JrSGVscGVyJyxcbiAgICAgICdia0NvcmVNYW5hZ2VyJyxcbiAgICAgICckdGltZW91dCcsIGZ1bmN0aW9uKFxuICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgICBia0hlbHBlcixcbiAgICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgICAgJHRpbWVvdXQpIHtcblxuICAgICAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9tYXJrZG93bmNlbGwnXSgpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmdldEZ1bGxJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LmdldEZ1bGxJbmRleCgpICsgJy4nICsgKCRzY29wZS4kcGFyZW50LmluZGV4ICsgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1dKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtOZXdDZWxsTWVudScsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtTZXNzaW9uTWFuYWdlciwgYmtFdmFsdWF0b3JNYW5hZ2VyKSB7XG4gICAgdmFyIGNlbGxPcHMgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25ld2NlbGxtZW51XCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBjb25maWc6ICc9JyxcbiAgICAgICAgaXNMYXJnZTogJz0nLFxuICAgICAgICBwb3NpdGlvbjogJ0AnXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBuZXdDZWxsRmFjdG9yeSA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tOZXdDZWxsRmFjdG9yeSgpO1xuICAgICAgICB2YXIgcmVjZW50bHlBZGRlZExhbmd1YWdlO1xuXG4gICAgICAgICRzY29wZS5nZXRFdmFsdWF0b3JzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMSwgMiwgMywgNF07XG4gICAgICAgICRzY29wZS5nZXRMZXZlbHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gbGV2ZWxzO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5uZXdDb2RlQ2VsbCA9IGZ1bmN0aW9uKGV2YWx1YXRvck5hbWUpIHtcbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IG5ld0NlbGxGYWN0b3J5Lm5ld0NvZGVDZWxsKGV2YWx1YXRvck5hbWUpO1xuICAgICAgICAgIGF0dGFjaENlbGwobmV3Q2VsbCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5zaG93UGx1Z2luTWFuYWdlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrSGVscGVyLnNob3dMYW5ndWFnZU1hbmFnZXIoJHNjb3BlKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm5ld01hcmtkb3duQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBuZXdDZWxsID0gbmV3Q2VsbEZhY3RvcnkubmV3TWFya2Rvd25DZWxsKCk7XG4gICAgICAgICAgYXR0YWNoQ2VsbChuZXdDZWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubmV3U2VjdGlvbkNlbGwgPSBmdW5jdGlvbihsZXZlbCkge1xuICAgICAgICAgIHZhciBuZXdDZWxsID0gbmV3Q2VsbEZhY3RvcnkubmV3U2VjdGlvbkNlbGwobGV2ZWwpO1xuICAgICAgICAgIGF0dGFjaENlbGwobmV3Q2VsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlZmF1bHRFdmFsdWF0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBieSBkZWZhdWx0LCBpbnNlcnQgYSBjb2RlIGNlbGwgKGFuZCB1c2UgdGhlIGJlc3QgZXZhbHVhdG9yIHdpdGggYmVzdCBndWVzcylcbiAgICAgICAgICAvLyBJZiBhIHByZXYgY2VsbCBpcyBnaXZlbiwgZmlyc3Qgc2NhbiB0b3dhcmQgdG9wIG9mIHRoZSBub3RlYm9vaywgYW5kIHVzZSB0aGUgZXZhbHVhdG9yXG4gICAgICAgICAgLy8gb2YgdGhlIGZpcnN0IGNvZGUgY2VsbCBmb3VuZC4gSWYgbm90IGZvdW5kLCBzY2FuIHRvd2FyZCBib3R0b20sIGFuZCB1c2UgdGhlIGV2YWx1YXRvclxuICAgICAgICAgIC8vIG9mIHRoZSBmaXJzdCBjb2RlIGNlbGwgZm91bmQuXG4gICAgICAgICAgLy8gSWYgYSBwcmV2IGNlbGwgaXMgbm90IGdpdmVuLCB1c2UgdGhlIHZlcnkgbGFzdCBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rLlxuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGNvZGUgY2VsbCBpbiB0aGUgbm90ZWJvb2ssIHVzZSB0aGUgZmlyc3QgZXZhbHVhdG9yIGluIHRoZSBsaXN0XG4gICAgICAgICAgdmFyIHByZXZDZWxsID0gJHNjb3BlLmNvbmZpZyAmJiAkc2NvcGUuY29uZmlnLnByZXZDZWxsICYmICRzY29wZS5jb25maWcucHJldkNlbGwoKTtcbiAgICAgICAgICB2YXIgY29kZUNlbGwgPSByZWNlbnRseUFkZGVkTGFuZ3VhZ2VcbiAgICAgICAgICAgICAgfHwgKHByZXZDZWxsICYmIGNlbGxPcHMuZmluZENvZGVDZWxsKHByZXZDZWxsLmlkKSlcbiAgICAgICAgICAgICAgfHwgKHByZXZDZWxsICYmIGNlbGxPcHMuZmluZENvZGVDZWxsKHByZXZDZWxsLmlkLCB0cnVlKSlcbiAgICAgICAgICAgICAgfHwgZ2V0TGFzdENvZGVDZWxsKCk7XG4gICAgICAgICAgdmFyIGV2YWx1YXRvck5hbWUgPSBjb2RlQ2VsbCA/XG4gICAgICAgICAgICAgIGNvZGVDZWxsLmV2YWx1YXRvciA6IF8ua2V5cyhia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpKVswXTtcblxuICAgICAgICAgIHJldHVybiBldmFsdWF0b3JOYW1lO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaENlbGwoY2VsbCkge1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICBpZiAoJHNjb3BlLmNvbmZpZyAmJiAkc2NvcGUuY29uZmlnLmF0dGFjaENlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY29uZmlnLmF0dGFjaENlbGwoY2VsbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlbGxPcHMuaW5zZXJ0Rmlyc3QoY2VsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBsYXN0IGNvZGUgY2VsbCBpbiB0aGUgbm90ZWJvb2tcbiAgICAgICAgdmFyIGdldExhc3RDb2RlQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLmxhc3QoY2VsbE9wcy5nZXRBbGxDb2RlQ2VsbHMoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbignbGFuZ3VhZ2VBZGRlZCcsIGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgcmVjZW50bHlBZGRlZExhbmd1YWdlID0gZGF0YTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLiRvbignY2VsbE1hcFJlY3JlYXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlY2VudGx5QWRkZWRMYW5ndWFnZSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia05vdGVib29rXG4gKiAtIHRoZSBjb250cm9sbGVyIHRoYXQgcmVzcG9uc2libGUgZm9yIGRpcmVjdGx5IGNoYW5naW5nIHRoZSB2aWV3XG4gKiAtIHJvb3QgY2VsbCArIGV2YWx1YXRvcnMgKyBvdGhlciBzdHVmZnMgc3BlY2lmaWMgdG8gb25lICh0aGUgbG9hZGVkKSBub3RlYm9va1xuICogLSByb290IGNlbGwgaXMganVzdCBhIHNwZWNpYWwgY2FzZSBvZiBhIHNlY3Rpb24gY2VsbFxuICogLSBUT0RPLCB3ZSBhcmUgbWl4aW5nIHRoZSBjb25jZXB0IG9mIGEgbm90ZWJvb2sgYW5kIGEgcm9vdCBzZWN0aW9uIGhlcmVcbiAqIHdlIHdhbnQgdG8gc2VwYXJhdGUgb3V0IHRoZSBsYXlvdXQgc3BlY2lmaWMgc3R1ZmZzKGlkZWEgb2YgYSBzZWN0aW9uKSBmcm9tIG90aGVyXG4gKiBzdHVmZnMgbGlrZSBldmFsdWF0b3IgcGFuZWxcbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia05vdGVib29rJywgZnVuY3Rpb24gKFxuICAgICAgYmtVdGlscyxcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICBia091dHB1dExvZykge1xuICAgIHZhciBDRUxMX1RZUEUgPSBcIm5vdGVib29rXCI7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25vdGVib29rXCJdKCksXG4gICAgICBzY29wZToge1xuICAgICAgICBzZXRCa05vdGVib29rOiBcIiZcIixcbiAgICAgICAgaXNMb2FkaW5nOiBcIj1cIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICB2YXIgX2ltcGwgPSB7XG4gICAgICAgICAgX3ZpZXdNb2RlbDoge1xuICAgICAgICAgICAgX2RlYnVnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICBfc2hvd091dHB1dDogZmFsc2UsXG4gICAgICAgICAgICB0b2dnbGVTaG93T3V0cHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dPdXRwdXQgPSAhdGhpcy5fc2hvd091dHB1dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlT3V0cHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dPdXRwdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1Nob3dpbmdPdXRwdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dPdXRwdXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc05vdGVib29rTG9ja2VkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlQWR2YW5jZWRNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdGhpcy5fYWR2YW5jZWRNb2RlID0gIXRoaXMuX2FkdmFuY2VkTW9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FkdmFuY2VkTW9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAhISh0aGlzLl9hZHZhbmNlZE1vZGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSGllcmFyY2h5RW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAhISh0aGlzLl9oaWVyYXJjaHlFbmFibGVkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVIaWVyYXJjaHlFbmFibGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdGhpcy5faGllcmFyY2h5RW5hYmxlZCA9ICF0aGlzLl9oaWVyYXJjaHlFbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZURlYnVnZ2luZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGlzLl9kZWJ1Z2dpbmcgPSAhdGhpcy5fZGVidWdnaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRGVidWdnaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWJ1Z2dpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRWaWV3TW9kZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92aWV3TW9kZWw7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaGFyZUFuZE9wZW5QdWJsaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFRPRE8sIHRoaXMgaXMgYW4gdWdseSBoYWNrLiBOZWVkIHJlZmFjdG9yaW5nLlxuICAgICAgICAgICAgc2hhcmVNZW51Lml0ZW1zWzBdLmFjdGlvbigpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVsZXRlQWxsT3V0cHV0Q2VsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5kZWxldGVBbGxPdXRwdXRDZWxscygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX2ZvY3VzYWJsZXM6IHt9LCAvLyBtYXAgb2YgZm9jdXNhYmxlKGUuZy4gY29kZSBtaXJyb3IgaW5zdGFuY2VzKSB3aXRoIGNlbGwgaWQgYmVpbmcga2V5c1xuICAgICAgICAgIHJlZ2lzdGVyRm9jdXNhYmxlOiBmdW5jdGlvbiAoY2VsbElkLCBmb2N1c2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzYWJsZXNbY2VsbElkXSA9IGZvY3VzYWJsZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVucmVnaXN0ZXJGb2N1c2FibGU6IGZ1bmN0aW9uIChjZWxsSWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9mb2N1c2FibGVzW2NlbGxJZF07XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2FibGVzW2NlbGxJZF0gPSBudWxsO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Rm9jdXNhYmxlOiBmdW5jdGlvbiAoY2VsbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNhYmxlc1tjZWxsSWRdO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX2NvZGVNaXJyb3JzOiB7fSxcbiAgICAgICAgICByZWdpc3RlckNNOiBmdW5jdGlvbiAoY2VsbElkLCBjbSkge1xuICAgICAgICAgICAgdGhpcy5fY29kZU1pcnJvcnNbY2VsbElkXSA9IGNtO1xuICAgICAgICAgICAgY20uc2V0T3B0aW9uKFwia2V5TWFwXCIsIHRoaXMuX2NtS2V5TWFwTW9kZSk7XG4gICAgICAgICAgICBjbS5zZXRPcHRpb24oXCJ2aW1Nb2RlXCIsIHRoaXMuX2NtS2V5TWFwTW9kZSA9PSBcInZpbVwiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVucmVnaXN0ZXJDTTogZnVuY3Rpb24gKGNlbGxJZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NvZGVNaXJyb3JzW2NlbGxJZF07XG4gICAgICAgICAgICB0aGlzLl9jb2RlTWlycm9yc1tjZWxsSWRdID0gbnVsbDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9jbUtleU1hcE1vZGU6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgIHNldENNS2V5TWFwTW9kZTogZnVuY3Rpb24gKGtleU1hcE1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NtS2V5TWFwTW9kZSA9IGtleU1hcE1vZGU7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5fY29kZU1pcnJvcnMsIGZ1bmN0aW9uIChjbSkge1xuICAgICAgICAgICAgICBjbS5zZXRPcHRpb24oXCJrZXlNYXBcIiwga2V5TWFwTW9kZSk7XG4gICAgICAgICAgICAgIGNtLnNldE9wdGlvbihcInZpbU1vZGVcIiwga2V5TWFwTW9kZSA9PSBcInZpbVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Q01LZXlNYXBNb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY21LZXlNYXBNb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnNldEJrTm90ZWJvb2soe2JrTm90ZWJvb2s6IF9pbXBsfSk7XG5cbiAgICAgICAgJHNjb3BlLmdldEZ1bGxJbmRleCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCIxXCIgfVxuXG4gICAgICAgICRzY29wZS5pc0xvY2tlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzTG9ja2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuaXNEZWJ1Z2dpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9pbXBsLl92aWV3TW9kZWwuaXNEZWJ1Z2dpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzU2hvd2luZ091dHB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc1Nob3dpbmdPdXRwdXQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2hvd0RlYnVnVHJlZSA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUuZ2V0Tm90ZWJvb2tNb2RlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRSYXdOb3RlYm9va01vZGVsKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jbGVhck91dHB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGF0eXBlOiBcImpzb25cIixcbiAgICAgICAgICAgIHVybDogYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9vdXRwdXRsb2cvY2xlYXJcIiksXG4gICAgICAgICAgICBkYXRhOiB7fX0pO1xuICAgICAgICAgICRzY29wZS5vdXRwdXRMb2cgPSBbXTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmhpZGVPdXRwdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX2ltcGwuX3ZpZXdNb2RlbC5oaWRlT3V0cHV0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzQWR2YW5jZWRNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzQWR2YW5jZWRNb2RlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzSGllcmFyY2h5RW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc0hpZXJhcmNoeUVuYWJsZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2hvd1N0ZE91dCA9IHRydWU7XG4gICAgICAgICRzY29wZS5zaG93U3RkRXJyID0gdHJ1ZTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlU3RkT3V0ID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICRzY29wZS5zaG93U3RkT3V0ID0gISRzY29wZS5zaG93U3RkT3V0O1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTdGRFcnIgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCRldmVudCkgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgJHNjb3BlLnNob3dTdGRFcnIgPSAhJHNjb3BlLnNob3dTdGRFcnI7XG4gICAgICAgIH07XG5cbiAgICAgICAgYmtPdXRwdXRMb2cuZ2V0TG9nKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAkc2NvcGUub3V0cHV0TG9nID0gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICBia091dHB1dExvZy5zdWJzY3JpYmUoZnVuY3Rpb24gKHJlcGx5KSB7XG4gICAgICAgICAgaWYgKCFfaW1wbC5fdmlld01vZGVsLmlzU2hvd2luZ091dHB1dCgpKSB7XG4gICAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLnRvZ2dsZVNob3dPdXRwdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJHNjb3BlLm91dHB1dExvZy5wdXNoKHJlcGx5LmRhdGEpO1xuICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAvLyBTY3JvbGwgdG8gYm90dG9tIHNvIHRoaXMgb3V0cHV0IGlzIHZpc2libGUuXG4gICAgICAgICAgJC5lYWNoKCQoJy5vdXRwdXRsb2dib3gnKSxcbiAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGksIHYpIHtcbiAgICAgICAgICAgICAgICAgICAkKHYpLnNjcm9sbFRvcCh2LnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG1hcmdpbiA9ICQoXCIub3V0cHV0bG9nc3Rkb3V0XCIpLnBvc2l0aW9uKCkudG9wO1xuICAgICAgICB2YXIgb3V0cHV0TG9nSGVpZ2h0ID0gMzAwO1xuICAgICAgICB2YXIgZHJhZ0hlaWdodDtcbiAgICAgICAgdmFyIGZpeE91dHB1dExvZ1Bvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQoXCIub3V0cHV0bG9nY29udGFpbmVyXCIpLmNzcyhcInRvcFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSBvdXRwdXRMb2dIZWlnaHQpO1xuICAgICAgICAgICQoXCIub3V0cHV0bG9nY29udGFpbmVyXCIpLmNzcyhcImhlaWdodFwiLCBvdXRwdXRMb2dIZWlnaHQpO1xuICAgICAgICAgICQoXCIub3V0cHV0bG9nYm94XCIpLmNzcyhcImhlaWdodFwiLCBvdXRwdXRMb2dIZWlnaHQgLSBtYXJnaW4gLSA1KTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzID0gW107XG4gICAgICAgICQod2luZG93KS5yZXNpemUoZml4T3V0cHV0TG9nUG9zaXRpb24pO1xuICAgICAgICAkc2NvcGUudW5yZWdpc3RlcnMucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHdpbmRvdykub2ZmKFwicmVzaXplXCIsIGZpeE91dHB1dExvZ1Bvc2l0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBkcmFnU3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRyYWdIZWlnaHQgPSBvdXRwdXRMb2dIZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvdXRwdXRsb2doYW5kbGUgPSAkKFwiLm91dHB1dGxvZ2hhbmRsZVwiKTtcbiAgICAgICAgb3V0cHV0bG9naGFuZGxlLmRyYWcoXCJzdGFydFwiLCBkcmFnU3RhcnRIYW5kbGVyKTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb3V0cHV0bG9naGFuZGxlLm9mZihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnRIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBkcmFnSGFuZGxlciA9IGZ1bmN0aW9uIChldiwgZGQpIHtcbiAgICAgICAgICBvdXRwdXRMb2dIZWlnaHQgPSBkcmFnSGVpZ2h0IC0gZGQuZGVsdGFZO1xuICAgICAgICAgIGlmIChvdXRwdXRMb2dIZWlnaHQgPCAyMCkge1xuICAgICAgICAgICAgb3V0cHV0TG9nSGVpZ2h0ID0gMjA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvdXRwdXRMb2dIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA4MCkge1xuICAgICAgICAgICAgb3V0cHV0TG9nSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gODA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpeE91dHB1dExvZ1Bvc2l0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgIG91dHB1dGxvZ2hhbmRsZS5kcmFnKGRyYWdIYW5kbGVyKTtcbiAgICAgICAgJHNjb3BlLnVucmVnaXN0ZXJzLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb3V0cHV0bG9naGFuZGxlLm9mZihcImRyYWdcIiwgZHJhZ0hhbmRsZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyB0aGUgcm9vdFxuICAgICAgICAgIHJldHVybiBub3RlYm9va0NlbGxPcC5nZXRDaGlsZHJlbihcInJvb3RcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmdldENoaWxkcmVuKCkubGVuZ3RoID09IDA7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKENFTExfVFlQRSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRTaGFyZURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hhcmVNZW51ID0ge1xuICAgICAgICAgIG5hbWU6IFwiU2hhcmVcIixcbiAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldFNoYXJlTWVudVBsdWdpbigpXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNSb290Q2VsbEluaXRpYWxpemF0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5tZW51SXRlbXMgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJSdW4gYWxsXCIsXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmV2YWx1YXRlUm9vdChcInJvb3RcIikuXG4gICAgICAgICAgICAgICAgICBjYXRjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIkluaXRpYWxpemF0aW9uIENlbGxcIixcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Um9vdENlbGxJbml0aWFsaXphdGlvbighJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpO1xuICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2hhcmVNZW51XG4gICAgICAgIF07XG5cbiAgICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvdXRpbC9pc1VzZUFkdmFuY2VkTW9kZVwiKSkuc3VjY2VzcyhmdW5jdGlvbihpc0FkdmFuY2VkKSB7XG4gICAgICAgICAgaWYgKF9pbXBsLl92aWV3TW9kZWwuaXNBZHZhbmNlZE1vZGUoKSAhPSAoaXNBZHZhbmNlZCA9PT0gXCJ0cnVlXCIpKSB7XG4gICAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLnRvZ2dsZUFkdmFuY2VkTW9kZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgZGl2ID0gZWxlbWVudC5maW5kKFwiLmJrY2VsbFwiKS5maXJzdCgpO1xuICAgICAgICBkaXYuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgLy9jbGljayBpbiB0aGUgYm9yZGVyIG9yIHBhZGRpbmcgc2hvdWxkIHRyaWdnZXIgbWVudVxuICAgICAgICAgIGlmIChia1V0aWxzLmdldEV2ZW50T2Zmc2V0WChkaXYsIGV2ZW50KSA+PSBkaXYud2lkdGgoKSkge1xuICAgICAgICAgICAgdmFyIG1lbnUgPSBkaXYuZmluZCgnLmJrY2VsbG1lbnUnKS5sYXN0KCk7XG4gICAgICAgICAgICBtZW51LmNzcyhcInRvcFwiLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIG1lbnUuY3NzKFwibGVmdFwiLCBldmVudC5jbGllbnRYIC0gMTUwKTtcbiAgICAgICAgICAgIG1lbnUuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpLmZpcnN0KCkuZHJvcGRvd24oJ3RvZ2dsZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICBkaXYuYWRkQ2xhc3MoXCJpbml0Y2VsbFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXYucmVtb3ZlQ2xhc3MoXCJpbml0Y2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5nZXROb3RlYm9va0VsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdpc0luaXRpYWxpemF0aW9uQ2VsbCgpJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICBkaXYuYWRkQ2xhc3MoXCJpbml0Y2VsbFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpdi5yZW1vdmVDbGFzcyhcImluaXRjZWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLnNldEJrTm90ZWJvb2soe2JrTm90ZWJvb2s6IHVuZGVmaW5lZH0pO1xuICAgICAgICAgIGJrT3V0cHV0TG9nLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgXyhzY29wZS51bnJlZ2lzdGVycykuZWFjaChmdW5jdGlvbih1bnJlZ2lzdGVyKSB7XG4gICAgICAgICAgICB1bnJlZ2lzdGVyKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia1NlY3Rpb25DZWxsJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgICR0aW1lb3V0KSB7XG4gICAgdmFyIENFTExfVFlQRSA9IFwic2VjdGlvblwiO1xuICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svc2VjdGlvbmNlbGxcIl0oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQgPSAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCB8fCBmYWxzZTtcblxuICAgICAgICAkc2NvcGUudG9nZ2xlU2hvd0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQgPSAhJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQ7XG4gICAgICAgICAgJHNjb3BlLiRicm9hZGNhc3QoJ2JlYWtlci5zZWN0aW9uLnRvZ2dsZWQnLCAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc1Nob3dDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhJHNjb3BlLmNlbGxtb2RlbC5jb2xsYXBzZWQ7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBub3RlYm9va0NlbGxPcC5nZXRDaGlsZHJlbigkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnJlc2V0VGl0bGUgPSBmdW5jdGlvbihuZXdUaXRsZSkge1xuICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwudGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLnRpdGxlJywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24nLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgIT09IG9sZFZhbCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUucmVuYW1lSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJEZWxldGUgY2VsbFwiLFxuICAgICAgICAgIG5ld05hbWU6IFwiRGVsZXRlIGhlYWRpbmcgYW5kIGtlZXAgY29udGVudHNcIlxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtVG9IZWFkKHtcbiAgICAgICAgICBuYW1lOiBcIkRlbGV0ZSBzZWN0aW9uIGFuZCBhbGwgc3ViLXNlY3Rpb25zXCIsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmRlbGV0ZVNlY3Rpb24oJHNjb3BlLmNlbGxtb2RlbC5pZCwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJDaGFuZ2UgSGVhZGVyIExldmVsXCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJIMVwiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwubGV2ZWwgPSAxO1xuICAgICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiSDJcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmxldmVsID0gMjtcbiAgICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkgzXCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5sZXZlbCA9IDM7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJINFwiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwubGV2ZWwgPSA0O1xuICAgICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVEYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNlbGxzID0gWyRzY29wZS5jZWxsbW9kZWxdXG4gICAgICAgICAgICAgIC5jb25jYXQobm90ZWJvb2tDZWxsT3AuZ2V0QWxsRGVzY2VuZGFudHMoJHNjb3BlLmNlbGxtb2RlbC5pZCkpO1xuICAgICAgICAgIHZhciB1c2VkRXZhbHVhdG9yc05hbWVzID0gXyhjZWxscykuY2hhaW4oKVxuICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC50eXBlID09PSBcImNvZGVcIjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjZWxsLmV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnVuaXF1ZSgpLnZhbHVlKCk7XG4gICAgICAgICAgdmFyIGV2YWx1YXRvcnMgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKS5ldmFsdWF0b3JzXG4gICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmFueSh1c2VkRXZhbHVhdG9yc05hbWVzLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3IubmFtZSA9PT0gZXY7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLmdlbmVyYXRlTm90ZWJvb2soZXZhbHVhdG9ycywgY2VsbHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRTaGFyZU1lbnVQbHVnaW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKENFTExfVFlQRSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6IFwiUnVuIGFsbFwiLFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwuaWQpLlxuICAgICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNoYXJlTWVudSA9IHtcbiAgICAgICAgICBuYW1lOiBcIlNoYXJlXCIsXG4gICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oc2hhcmVNZW51KTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldFNoYXJlTWVudVBsdWdpbigpXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXJlTWVudS5pdGVtcyA9IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVJdGVtcyhDRUxMX1RZUEUsICRzY29wZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbjtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJJbml0aWFsaXphdGlvbiBDZWxsXCIsXG4gICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUubmV3Q2VsbE1lbnVDb25maWcgPSB7XG4gICAgICAgICAgaXNTaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gISRzY29wZS5jZWxsbW9kZWwuaGlkZVRpdGxlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYXR0YWNoQ2VsbDogZnVuY3Rpb24obmV3Q2VsbCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AuaW5zZXJ0QWZ0ZXIoJHNjb3BlLmNlbGxtb2RlbC5pZCwgbmV3Q2VsbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2Q2VsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm5vdGVib29rJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtUZXh0Q2VsbCcsIGZ1bmN0aW9uKGJrU2Vzc2lvbk1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svdGV4dGNlbGxcIl0oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC5nZXRGdWxsSW5kZXgoKSArIFwiLlwiICsgKCRzY29wZS4kcGFyZW50LmluZGV4ICsgMSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRWRpdGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIWJrSGVscGVyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHRleHRib3ggPSAkKGVsZW1lbnQuZmluZChcIi5lZGl0YWJsZS10ZXh0XCIpLmZpcnN0KCkpO1xuICAgICAgICBlbGVtZW50LmZpbmQoJy5lZGl0YWJsZS10ZXh0JykuaHRtbChzY29wZS5jZWxsbW9kZWwuYm9keSk7XG4gICAgICAgIHRleHRib3guYmluZCgnYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5ib2R5ID0gdGV4dGJveC5odG1sKCkudHJpbSgpO1xuICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuZWRpdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRleHRib3guZm9jdXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuYm9keScsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJG9uKCdiZWFrZXIuY2VsbC5hZGRlZCcsIGZ1bmN0aW9uKGUsIGNlbGxtb2RlbCkge1xuICAgICAgICAgIGlmIChjZWxsbW9kZWwgPT09IHNjb3BlLmNlbGxtb2RlbCkgc2NvcGUuZWRpdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgdGhlIGNlbnRyYWwgY29udHJvbCBvZiBhbGwgb3V0cHV0IGRpc3BsYXlzLiBJdCBmdWxmaWxscyBhY3R1YWwgYW5ndWxhciBkaXJlY3RpdmVzXG4gKiBsYXppbHkgd2hlbiB1c2VyIGxvYWQgb3V0cHV0IGRpc3BsYXkgcGx1Z2lucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5JywgWydiay51dGlscycsICAnbmdBbmltYXRlJywgJ25nVG91Y2gnXSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5Jyk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrT3V0cHV0RGlzcGxheScsIGZ1bmN0aW9uKFxuICAgICAgJGNvbXBpbGUsIGJrT3V0cHV0RGlzcGxheUZhY3RvcnksIGJrVXRpbHMpIHtcbiAgICB2YXIgZ2V0UmVzdWx0VHlwZSA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZ2V0Q2VsbE1vZGVsKCkpIHtcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcobW9kZWwuZ2V0Q2VsbE1vZGVsKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIFwiU3RyaW5nXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1vZGVsLmdldENlbGxNb2RlbCgpLnR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogXCI8ZGl2Pk9VVFBVVDwvZGl2PlwiLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgdHlwZTogXCJAXCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIiAvLyBhc3N1bWUgcmVmIHRvIG1vZGVsIGRvZXNuJ3QgY2hhbmdlIGFmdGVyIGRpcmVjdGl2ZSBpcyBjcmVhdGVkXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBjaGlsZFNjb3BlID0gbnVsbDtcbiAgICAgICAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgaWYgKGNoaWxkU2NvcGUpIHtcbiAgICAgICAgICAgIGNoaWxkU2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hpbGRTY29wZSA9IHNjb3BlLiRuZXcoKTtcbiAgICAgICAgICBjaGlsZFNjb3BlLm1vZGVsID0gc2NvcGUubW9kZWw7XG4gICAgICAgICAgdmFyIHJlc3VsdFR5cGUgPSBnZXRSZXN1bHRUeXBlKHNjb3BlLm1vZGVsKTtcbiAgICAgICAgICBpZiAocmVzdWx0VHlwZSkge1xuICAgICAgICAgICAgYmtVdGlscy5sb2coXCJvdXRwdXREaXNwbGF5XCIsIHtcbiAgICAgICAgICAgICAgcmVzdWx0VHlwZTogcmVzdWx0VHlwZSxcbiAgICAgICAgICAgICAgZGlzcGxheVR5cGU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZGlyZWN0aXZlTmFtZSA9IGJrT3V0cHV0RGlzcGxheUZhY3RvcnkuZ2V0RGlyZWN0aXZlTmFtZSh0eXBlKTtcbiAgICAgICAgICBlbGVtZW50Lmh0bWwoXCI8ZGl2IFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIG1vZGVsPSdtb2RlbCc+PC9kaXY+XCIpO1xuICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoY2hpbGRTY29wZSk7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaChcInR5cGVcIiwgZnVuY3Rpb24obmV3VHlwZSwgb2xkVHlwZSkge1xuICAgICAgICAgIHJlZnJlc2gobmV3VHlwZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oXCJvdXRwdXREaXNwbGF5RmFjdG9yeVVwZGF0ZWRcIiwgZnVuY3Rpb24oZXZlbnQsIHdoYXQpIHtcbiAgICAgICAgICBpZiAod2hhdCA9PT0gXCJhbGxcIiB8fCB3aGF0ID09PSBzY29wZS50eXBlKSB7XG4gICAgICAgICAgICByZWZyZXNoKHNjb3BlLnR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoY2hpbGRTY29wZSkge1xuICAgICAgICAgICAgY2hpbGRTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgY2VudHJhbCBjb250cm9sIG9mIGFsbCBvdXRwdXQgZGlzcGxheXMuIEl0IGZ1bGZpbGxzIGFjdHVhbCBhbmd1bGFyIGRpcmVjdGl2ZXNcbiAqIGxhemlseSB3aGVuIHVzZXIgbG9hZCBvdXRwdXQgZGlzcGxheSBwbHVnaW5zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgTUFYX0NBUEFDSVRZID0gMTAwO1xuXG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsub3V0cHV0RGlzcGxheScpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtPdXRwdXREaXNwbGF5RmFjdG9yeVwiLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NlKSB7XG5cbiAgICB2YXIgaW1wbHMgPSB7XG4gICAgICAgIFwiVGV4dFwiOiB7XG4gICAgICAgICAgdGVtcGxhdGU6IFwiPHByZT57e2dldFRleHQoKX19PC9wcmU+XCIsXG4gICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgbW9kZWwgPSAkc2NvcGUubW9kZWwuZ2V0Q2VsbE1vZGVsKCk7XG4gICAgICAgICAgICAgIHJldHVybiAobW9kZWwgJiYgbW9kZWwudGV4dCkgPyBtb2RlbC50ZXh0IDogbW9kZWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJEYXRlXCI6IHtcbiAgICAgICAgICB0ZW1wbGF0ZTogXCI8cHJlPnt7Z2V0RGF0ZSgpfX08L3ByZT5cIixcbiAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZS5nZXREYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBtb2RlbCA9ICRzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKTtcbiAgICAgICAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLnRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIHZhciBtID0gbW9tZW50KG1vZGVsLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG0uZm9ybWF0KFwiWVlZWU1NREQgSEg6bW06c3MuU1NTIFpaXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBtb2RlbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgXCJXYXJuaW5nXCI6IHtcbiAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nb3V0bGluZSB3YXJuaW5nJz48L2Rpdj4gPHByZSBjbGFzcz0nb3V0X3dhcm5pbmcnPnt7bW9kZWwuZ2V0Q2VsbE1vZGVsKCkubWVzc2FnZX19PC9wcmU+XCJcbiAgICAgIH0sXG4gICAgICBcIkVycm9yXCI6IHtcbiAgICAgICAgdGVtcGxhdGU6IFwiPHByZSBjbGFzcz0nb3V0X2Vycm9yJz5cIiArXG4gICAgICAgICAgICBcIjxzcGFuIG5nLXNob3c9J2NhbkV4cGFuZCcgY2xhc3M9J3RvZ2dsZS1lcnJvcicgbmctY2xpY2s9J2V4cGFuZGVkID0gIWV4cGFuZGVkJz57e2V4cGFuZGVkID8gJy0nIDogJysnfX08L3NwYW4+XCIgK1xuICAgICAgICAgICAgXCI8c3BhbiBuZy1iaW5kLWh0bWw9J3Nob3J0RXJyb3InPjwvc3Bhbj48L3ByZT5cIiArXG4gICAgICAgICAgICBcIjxwcmUgbmctc2hvdz0nZXhwYW5kZWQnPjxzcGFuIG5nLWJpbmQtaHRtbD0nbG9uZ0Vycm9yJz48L3NwYW4+XCIgK1xuICAgICAgICAgICAgXCI8L3ByZT5cIixcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICAgICRzY29wZS5leHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgJHNjb3BlLiR3YXRjaCgnbW9kZWwuZ2V0Q2VsbE1vZGVsKCknLCBmdW5jdGlvbihjZWxsTW9kZWwpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXRzID0gJGVsZW1lbnQuZmluZCgnc3BhbicpO1xuICAgICAgICAgICAgdmFyIGVycm9ycyAgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0KGNlbGxNb2RlbCk7XG5cbiAgICAgICAgICAgICRzY29wZS5zaG9ydEVycm9yICAgPSAkc2NlLnRydXN0QXNIdG1sKGVycm9yc1swXSk7XG4gICAgICAgICAgICAkc2NvcGUuY2FuRXhwYW5kICAgID0gZXJyb3JzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICAkc2NvcGUubG9uZ0Vycm9yICAgID0gJHNjZS50cnVzdEFzSHRtbChlcnJvcnMuc2xpY2UoMSkuam9pbihcIlxcblwiKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIkh0bWxcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2PjwvZGl2PlwiLFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyKSB7XG4gICAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihcImJrby1odG1sXCIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldFNoYXJlTWVudVBsdWdpbigpXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5ld0l0ZW1zID0gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudUl0ZW1zKFwiYmtvLWh0bWxcIiwgJHNjb3BlKTtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbC5yZXNldFNoYXJlTWVudUl0ZW1zKG5ld0l0ZW1zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgdmFyIGRpdiA9IGVsZW1lbnQuZmluZChcImRpdlwiKS5maXJzdCgpO1xuICAgICAgICAgIHZhciBjZWxsTW9kZWwgPSBzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKTtcbiAgICAgICAgICBkaXYuaHRtbChjZWxsTW9kZWwpO1xuICAgICAgICAgIHNjb3BlLiR3YXRjaCgnbW9kZWwuZ2V0Q2VsbE1vZGVsKCknLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgZGl2Lmh0bWwobmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJPdXRwdXRDb250YWluZXJcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogJzxiay1jb2RlLWNlbGwtb3V0cHV0IG5nLXJlcGVhdD1cImkgaW4gaXRlbXNcIiBtb2RlbD1cImlcIiA+JyArXG4gICAgICAgICAgICAnPC8gYmstY29kZS1jZWxsLW91dHB1dD4nLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgIG1vZGVsOiBcIj1cIlxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAkc2NvcGUuaXRlbXMgPSBfKCRzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKS5pdGVtcykubWFwKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByZXN1bHQ6IGl0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICRzY29wZS5pc1Nob3dNZW51ID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgdHlwZXMgPSBbXCJUZXh0XCIsIFwiRGF0ZVwiLCBcIkJlYWtlclN0YW5kYXJkT3V0cHV0XCIsIFwiQmVha2VyU3RhbmRhcmRFcnJvclwiLCBcIldhcm5pbmdcIiwgXCJFcnJvclwiLCBcIkh0bWxcIiwgXCJPdXRwdXRDb250YWluZXJcIl07XG4gICAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbih3aGF0LCBzY29wZSkge1xuICAgICAgaWYgKCF3aGF0KSB7XG4gICAgICAgIHdoYXQgPSBcImFsbFwiO1xuICAgICAgfVxuICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICBzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICB9XG4gICAgICBzY29wZS4kYnJvYWRjYXN0KFwiYmtPdXRwdXREaXNwbGF5RmFjdG9yeVwiLCB3aGF0KTtcbiAgICAgIHNjb3BlLiQkcGhhc2UgfHwgc2NvcGUuJGFwcGx5KCk7XG4gICAgfTtcbiAgICB2YXIgc2V0SW1wbCA9IGZ1bmN0aW9uKGluZGV4LCB0eXBlLCBpbXBsKSB7XG4gICAgICB0eXBlc1tpbmRleF0gPSB0eXBlO1xuICAgICAgaW1wbHNbdHlwZV0gPSBpbXBsO1xuICAgICAgcmVmcmVzaCh0eXBlKTtcbiAgICB9O1xuICAgIHZhciByZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcCA9IHtcbiAgICAgIC8vIFRoZSBmaXJzdCBpbiB0aGUgYXJyYXkgd2lsbCBiZSB1c2VkIGFzIGRlZmF1bHRcbiAgICAgIFwidGV4dFwiOiBbXCJUZXh0XCIsIFwiSHRtbFwiLCBcIkxhdGV4XCJdLFxuICAgICAgXCJEYXRlXCI6IFtcIkRhdGVcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJUYWJsZURpc3BsYXlcIjogW1wiVGFibGVcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJodG1sXCI6IFtcIkh0bWxcIl0sXG4gICAgICBcIkltYWdlSWNvblwiOiBbXCJJbWFnZVwiLCBcIlRleHRcIl0sXG4gICAgICBcIkJlYWtlckRpc3BsYXlcIjogW1wiQmVha2VyRGlzcGxheVwiLCBcIlRleHRcIl0sXG4gICAgICBcIlBsb3RcIjogW1wiUGxvdFwiLCBcIkNoYXJ0XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiVGltZVBsb3RcIjogW1wiUGxvdFwiLCBcIkNoYXJ0XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiTmFub1Bsb3RcIjogW1wiUGxvdFwiLCBcIlRleHRcIl0sXG4gICAgICBcIkNvbWJpbmVkUGxvdFwiOiBbXCJDb21iaW5lZFBsb3RcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJIaWRkZW5PdXRwdXRDZWxsXCI6IFtcIkhpZGRlblwiXSxcbiAgICAgIFwiV2FybmluZ1wiOiBbXCJXYXJuaW5nXCJdLFxuICAgICAgXCJCZWFrZXJPdXRwdXRDb250YWluZXJEaXNwbGF5XCI6IFtcIk91dHB1dENvbnRhaW5lclwiLCBcIlRleHRcIl0sXG4gICAgICBcIk91dHB1dENvbnRhaW5lckNlbGxcIjogW1wiT3V0cHV0Q29udGFpbmVyXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiT3V0cHV0Q29udGFpbmVyXCI6IFtcIk91dHB1dENvbnRhaW5lclwiLCBcIlRleHRcIl1cbiAgICB9O1xuICAgIHZhciBmYWN0b3J5ID0ge1xuICAgICAgYWRkOiBmdW5jdGlvbih0eXBlLCBpbXBsKSB7XG4gICAgICAgIGlmICh0eXBlcy5sZW5ndGggPiBNQVhfQ0FQQUNJVFkpIHtcbiAgICAgICAgICB0aHJvdyBcIkNhbm5vdCBhZGQgb3V0cHV0OiBcIiArIHR5cGUgK1xuICAgICAgICAgICAgICBcIiwgbWF4IG91dHB1dCBkaXNwbGF5IGNhcGFjaXR5KFwiICsgTUFYX0NBUEFDSVRZICtcbiAgICAgICAgICAgICAgXCIpIHJlYWNoZWRcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGQgdG8gdGhlIGVuZFxuICAgICAgICBzZXRJbXBsKHR5cGVzLmxlbmd0aCwgdHlwZSwgaW1wbCk7XG4gICAgICB9LFxuICAgICAgZ2V0OiBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVzW2luZGV4XTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW1wbCh0eXBlKTtcbiAgICAgIH0sXG4gICAgICBnZXRJbXBsOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlICYmIGltcGxzW3R5cGVdKSB7XG4gICAgICAgICAgcmV0dXJuIGltcGxzW3R5cGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpbXBsc1tcInRleHRcIl07XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXREaXJlY3RpdmVOYW1lOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHR5cGVzLmluZGV4T2YodHlwZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBpbmRleCA9IHR5cGVzLmluZGV4T2YoXCJUZXh0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcImJrb1wiICsgaW5kZXg7XG4gICAgICB9LFxuICAgICAgYWRkT3V0cHV0RGlzcGxheVR5cGU6IGZ1bmN0aW9uKHR5cGUsIGRpc3BsYXlzLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwW3R5cGVdKSB7XG4gICAgICAgICAgcmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXBbdHlwZV0gPSBkaXNwbGF5cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwW3R5cGVdLCBbaW5kZXgsIDBdLmNvbmNhdChkaXNwbGF5cykpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0QXBwbGljYWJsZURpc3BsYXlzOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpc0pTT04gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHZhciByZXQgPSB0cnVlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpc0hUTUwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiAvXjxbYS16XVtcXHNcXFNdKj4vaS50ZXN0KHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiSGlkZGVuXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJlc3VsdC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gW1wiVGV4dFwiLCBcIkh0bWxcIiwgXCJMYXRleFwiXTtcbiAgICAgICAgICAgIGlmIChpc0pTT04ocmVzdWx0KSkge1xuICAgICAgICAgICAgICByZXQucHVzaChcIkpzb25cIiwgXCJWZWdhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzSFRNTChyZXN1bHQpKSB7XG4gICAgICAgICAgICAgIHJldCA9IFtcIkh0bWxcIiwgXCJUZXh0XCIsIFwiTGF0ZXhcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXy5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNPYmplY3QocmVzdWx0WzBdKSkge1xuICAgICAgICAgICAgICAgIHJldC5wdXNoKFwiVGFibGVcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcC5oYXNPd25Qcm9wZXJ0eShyZXN1bHQudHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcFtyZXN1bHQudHlwZV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJUZXh0XCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKClcbiAgICB9O1xuICAgIGJlYWtlci5vdXRwdXREaXNwbGF5RmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgZm9yICh2YXIga2V5IGluIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlGYWN0b3J5KSB7XG4gICAgICBiZWFrZXIub3V0cHV0RGlzcGxheUZhY3RvcnkuYWRkKGtleSwgYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheUZhY3Rvcnlba2V5XSk7XG4gICAgfVxuICAgIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlGYWN0b3J5ID0gbnVsbDtcblxuICAgIGZvciAodmFyIGtleSBpbiBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5VHlwZSkge1xuICAgICAgdmFyIGRpc3BsYXlzID0gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVR5cGVba2V5XTtcbiAgICAgIGZhY3RvcnkuYWRkT3V0cHV0RGlzcGxheVR5cGUoa2V5LCBkaXNwbGF5cyk7XG4gICAgfVxuICAgIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlUeXBlID0gbnVsbDtcblxuICAgIHJldHVybiBmYWN0b3J5O1xuICB9KTtcblxuICBfKF8ucmFuZ2UoTUFYX0NBUEFDSVRZKSkuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgbW9kdWxlLmRpcmVjdGl2ZShcImJrb1wiICsgaSxcbiAgICAgICAgZnVuY3Rpb24oYmtPdXRwdXREaXNwbGF5RmFjdG9yeSwgYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXIsICRpbmplY3Rvcikge1xuICAgICAgdmFyIGltcGwgPSBia091dHB1dERpc3BsYXlGYWN0b3J5LmdldChpKTtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW1wbCkpIHtcbiAgICAgICAgcmV0dXJuIGltcGwoYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXIsICRpbmplY3Rvcik7XG4gICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShpbXBsKSkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW1wbC5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGl0ID0gaW1wbFtqXTtcbiAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGl0KSkge1xuICAgICAgICAgICAgICBpZiAoYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXIuaGFzKGl0KSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlci5nZXQoaXQpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgkaW5qZWN0b3IuaGFzKGl0KSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCgkaW5qZWN0b3IuZ2V0KGl0KSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJiZWFrZXIgY291bGQgbm90IGZpbmQgcHJvdmlkZXIgZm9yIGJrb0ZhY3RvcnkgXCIgKyBpdDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24oaXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW1wbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBjZW50cmFsIGNvbnRyb2wgb2YgYWxsIG91dHB1dCBkaXNwbGF5cy4gSXQgZnVsZmlsbHMgYWN0dWFsIGFuZ3VsYXIgZGlyZWN0aXZlc1xuICogbGF6aWx5IHdoZW4gdXNlciBsb2FkIG91dHB1dCBkaXNwbGF5IHBsdWdpbnMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5Jyk7XG4gIG1vZHVsZS5mYWN0b3J5KFwiYmtPdXRwdXREaXNwbGF5U2VydmljZU1hbmFnZXJcIiwgZnVuY3Rpb24oJGluamVjdG9yKSB7XG4gICAgdmFyIHNlcnZpY2VzID0ge307XG4gICAgdmFyIGZhY3RvcnkgPSB7XG4gICAgICBnZXRTZXJ2aWNlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcbiAgICAgIH0sXG4gICAgICBhZGRTZXJ2aWNlOiBmdW5jdGlvbihrZXksIGltcGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbXBsID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBzZXJ2aWNlc1trZXldID0gaW1wbCgkaW5qZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbXBsKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbXBsLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaXQgPSBpbXBsW2pdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICBpZiAoc2VydmljZXMuaGFzT3duUHJvcGVydHkoaXQpKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKHNlcnZpY2VzW2l0XSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoJGluamVjdG9yLmhhcyhpdCkpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goJGluamVjdG9yLmdldChpdCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIHNlcnZpY2VzW2tleV0gPSBpdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXJ2aWNlc1trZXldID0gaW1wbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgICAgfSxcbiAgICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlc1trZXldO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVNlcnZpY2UpIHtcbiAgICAgIHZhciBpbXBsID0gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVNlcnZpY2Vba2V5XTtcbiAgICAgIGZhY3RvcnkuYWRkU2VydmljZShrZXksIGltcGwpO1xuICAgIH1cbiAgICBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5U2VydmljZSA9IG51bGw7XG4gICAgYmVha2VyLm91dHB1dERpc3BsYXlTZXJ2aWNlID0gZmFjdG9yeTtcbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgVUkgdGhhdCBzaG93cyB0aGUgbGlzdCBvZiBldmFsdWF0b3JzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiBzZXR0aW5ncyBwYW5lbC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb3JlJyk7XG5cbiAgbW9kdWxlLmNvbnRyb2xsZXIoJ3BsdWdpbk1hbmFnZXJDdHJsJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckbW9kYWxJbnN0YW5jZScsICdia0NvcmVNYW5hZ2VyJywgJ2JrU2Vzc2lvbk1hbmFnZXInLCAnYmtNZW51UGx1Z2luTWFuYWdlcicsICdia0V2YWx1YXRlUGx1Z2luTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmtFdmFsdWF0b3JNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgYmtDb3JlTWFuYWdlcixia1Nlc3Npb25NYW5hZ2VyLCBia01lbnVQbHVnaW5NYW5hZ2VyLCBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBia0V2YWx1YXRvck1hbmFnZXIpIHtcblxuXG4gICAgJHNjb3BlLmRvQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5ldmFsVGFiT3Auc2hvd1VSTCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5zaG93V2FybmluZyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLmZvcmNlTG9hZCA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5uZXdQbHVnaW5OYW1lT3JVcmwgPSBcIlwiO1xuICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoXCJva1wiKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmdldEV2YWx1YXRvckRldGFpbHMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldFZpc3VhbFBhcmFtcyhuYW1lKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmV2YWxUYWJPcCA9IHtcbiAgICAgIG5ld1BsdWdpbk5hbWVPclVybDogXCJcIixcbiAgICAgIHNob3dVUkw6IGZhbHNlLFxuICAgICAgc2hvd1dhcm5pbmc6IGZhbHNlLFxuICAgICAgc2hvd1NlY3VyaXR5V2FybmluZzogZmFsc2UsXG4gICAgICBmb3JjZUxvYWQ6IGZhbHNlLFxuICAgICAgZ2V0QWxsRXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvcnNXaXRoU3BlYzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3RpdmVQbHVnaW5zID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBwIGluIGFjdGl2ZVBsdWdpbnMpIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoYWN0aXZlUGx1Z2luc1twXS5zcGVjKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHRbcF0gPSBhY3RpdmVQbHVnaW5zW3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSxcbiAgICAgIGdldExvYWRpbmdFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRMb2FkaW5nRXZhbHVhdG9ycygpO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvclN0YXR1c2VzOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciBrbm93blBsdWdpbnMgPSBia0V2YWx1YXRlUGx1Z2luTWFuYWdlci5nZXRLbm93bkV2YWx1YXRvclBsdWdpbnMoKTtcbiAgICAgICAgdmFyIGFjdGl2ZVBsdWdpbnMgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB2YXIgbG9hZGluZ1BsdWdpbnMgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0TG9hZGluZ0V2YWx1YXRvcnMoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBwIGluIGtub3duUGx1Z2lucykge1xuICAgICAgICAgIHZhciBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoYWN0aXZlUGx1Z2luc1twXSlcbiAgICAgICAgICAgIHN0YXR1cyA9IFwiYWN0aXZlXCI7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsIGluIGxvYWRpbmdQbHVnaW5zKSB7XG4gICAgICAgICAgICAgIGlmIChsb2FkaW5nUGx1Z2luc1tsXS5wbHVnaW4gPT0gcCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9IFwibG9hZGluZ1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0YXR1cykge1xuICAgICAgICAgICAgICBzdGF0dXMgPSBcImtub3duXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdFtwXSA9IHN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSxcbiAgICAgIHNldE5ld1BsdWdpbk5hbWVPclVybDogZnVuY3Rpb24ocGx1Z2luTmFtZU9yVXJsKSB7XG4gICAgICAgIHRoaXMubmV3UGx1Z2luTmFtZU9yVXJsID0gcGx1Z2luTmFtZU9yVXJsO1xuICAgICAgfSxcbiAgICAgIHRvZ2dsZVBsdWdpbjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB2YXIgcGx1Z2luID0gbmFtZSB8fCB0aGlzLm5ld1BsdWdpbk5hbWVPclVybDtcbiAgICAgICAgdmFyIGZyb21VcmwgPSBuYW1lID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5nZXRFdmFsdWF0b3JTdGF0dXNlcygpW3BsdWdpbl07XG5cbiAgICAgICAgaWYgKCFmcm9tVXJsICYmICFfLmNvbnRhaW5zKFsnYWN0aXZlJywgJ2tub3duJ10sIHN0YXR1cykpIHJldHVybjtcbiAgICAgICAgLy8gZm9yIG5vdywgaWYgdGhlIHBsdWdpbiBpc24ndCBmcm9tIGEgVVJMIG9yIGFjdGl2ZSBvciBrbm93blxuICAgICAgICAvLyAobmFtZWx5IGxvYWRpbmcpIHJldHVybi5cbiAgICAgICAgLy8gVE9ETzogb3RoZXIgc3RhdGVzIHdlIHNob3VsZCBzdXBwb3J0OiBmYWlsZWQgYW5kIGV4aXRpbmcuXG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAvLyB0dXJuIG9mZiBldmFsdWF0b3IgaWYgb25cbiAgICAgICAgICBpZiAoIWJrU2Vzc2lvbk1hbmFnZXIuZXZhbHVhdG9yVW51c2VkKHBsdWdpbikpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbFRhYk9wLnNob3dXYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnJlbW92ZUV2YWx1YXRvcihwbHVnaW4pO1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5yZW1vdmVFdmFsdWF0b3IocGx1Z2luKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvdGhlcndpc2UsIHR1cm4gb24gZXZhbHVhdG9yXG4gICAgICAgICAgaWYgKGZyb21VcmwpIHtcbiAgICAgICAgICAgIHZhciByID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgICAgIGlmIChyLnRlc3QocGx1Z2luKSAmJiAhJHNjb3BlLmV2YWxUYWJPcC5mb3JjZUxvYWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsVGFiT3Auc2hvd1NlY3VyaXR5V2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5ldmFsVGFiT3AuZm9yY2VMb2FkID0gZmFsc2U7XG4gICAgICAgICAgICAkc2NvcGUuZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybCA9IFwiXCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5ld0V2YWwgPSB7IG5hbWU6ICcnLCBwbHVnaW46IHBsdWdpbiB9O1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYWRkRXZhbHVhdG9yKG5ld0V2YWwpO1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5hZGRFdmFsdWF0b3IobmV3RXZhbCk7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdsYW5ndWFnZUFkZGVkJywgeyBldmFsdWF0b3I6IHBsdWdpbiB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUubWVudVRhYk9wID0ge1xuICAgICAgbmV3TWVudVBsdWdpblVybDogXCIuL3BsdWdpbi9tZW51L2RlYnVnLmpzXCIsXG4gICAgICBhZGRNZW51UGx1Z2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIubG9hZE1lbnVQbHVnaW4odGhpcy5uZXdNZW51UGx1Z2luVXJsKTtcbiAgICAgIH0sXG4gICAgICBnZXRNZW51UGx1Z2luczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYmtNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51UGx1Z2lucygpO1xuICAgICAgfSxcbiAgICAgIGdldExvYWRpbmdQbHVnaW5zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrTWVudVBsdWdpbk1hbmFnZXIuZ2V0TG9hZGluZ1BsdWdpbnMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIH1dKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1vZHVsZSBmb3IgdGhlIFVJIHRoYXQgc2hvd3MgdGhlIGxpc3Qgb2YgZXZhbHVhdG9ycyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZ1xuICogc2V0dGluZ3MgcGFuZWwuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb3JlJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtQbHVnaW5NYW5hZ2VyRXZhbHVhdG9yU2V0dGluZ3MnLCBmdW5jdGlvbihcbiAgICAgICRjb21waWxlLCBia1Nlc3Npb25NYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1wibWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlcl9ldmFsdWF0b3Jfc2V0dGluZ3NcIl0oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuc2V0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgJHNjb3BlLmV2YWx1YXRvci5wZXJmb3JtKHZhbCk7XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgc3BlYyA9IF8ubWFwKHNjb3BlLmV2YWx1YXRvci5zcGVjLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKHsgbmFtZToga2V5LCBrZXk6IGtleSB9LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLnByb3BlcnRpZXMgPSBfLmZpbHRlcihzcGVjLCBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uLnR5cGUgPT09IFwic2V0dGFibGVTdHJpbmdcIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuYWN0aW9ucyA9IF8uZmlsdGVyKHNwZWMsIGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICAgIHJldHVybiBvcHRpb24udHlwZSA9PT0gXCJhY3Rpb25cIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrQ2VsbFxuICogLSB0aGUgY29udHJvbGxlciB0aGF0IHJlc3BvbnNpYmxlIGZvciBkaXJlY3RseSBjaGFuZ2luZyB0aGUgdmlld1xuICogLSB0aGUgY29udGFpbmVyIGZvciBzcGVjaWZpYyB0eXBlZCBjZWxsXG4gKiAtIHRoZSBkaXJlY3RpdmUgaXMgZGVzaWduZWQgdG8gYmUgY2FwYWJsZSBvZiB1c2VkIGluIGEgbmVzdGVkIHdheVxuICogLSBjb25jZXB0dWFsbHksIGEgY2VsbCBpcyAnY2VsbCBtb2RlbCcgKyAndmlldyBtb2RlbCcoYW4gZXhhbXBsZSBvZiB3aGF0IGdvZXMgaW4gdG8gdGhlIHZpZXdcbiAqIG1vZGVsIGlzIGNvZGUgY2VsbCBiZyBjb2xvcilcbiAqIC0gQSBia0NlbGwgaXMgZ2VuZXJpY2FsbHkgY29ycmVzcG9uZHMgdG8gYSBwb3J0aW9uIG9mIHRoZSBub3RlYm9vayBtb2RlbCAoY3VycmVudGx5LCBpdCBpc1xuICogYWx3YXlzIGEgYnJhbmNoIGluIHRoZSBoaWVyYXJjaHkpXG4gKiAtIFdoZW4gZXhwb3J0aW5nIChhLmsuYS4gc2hhcmluZyksIHdlIHdpbGwgbmVlZCBib3RoIHRoZSBjZWxsIG1vZGVsIGFuZCB0aGUgdmlldyBtb2RlbFxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnKTtcblxuICBtb2R1bGUuY29udHJvbGxlcignQ29kZUNlbGxPcHRpb25zQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRtb2RhbEluc3RhbmNlJywgJ2RzY29wZScsICdia0NvcmVNYW5hZ2VyJywgZnVuY3Rpb24oJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgZHNjb3BlLCBia0NvcmVNYW5hZ2VyKSB7XG4gICAgJHNjb3BlLmRzY29wZSA9IGRzY29wZTtcbiAgICAkc2NvcGUuaW5pdGlhbGl6YXRpb25DZWxsID0gZHNjb3BlLmluaXRpYWxpemF0aW9uO1xuICAgICRzY29wZS5jZWxsTmFtZSA9IGRzY29wZS5pZDtcbiAgICAkc2NvcGUuY2VsbFRhZ3MgPSBkc2NvcGUudGFncztcbiAgICAkc2NvcGUuaXNJbml0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6YXRpb25DZWxsO1xuICAgIH07XG4gICAgJHNjb3BlLnRvZ2dsZUluaXRDZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemF0aW9uQ2VsbCA9ICF0aGlzLmluaXRpYWxpemF0aW9uQ2VsbDtcbiAgICB9O1xuICAgICRzY29wZS5zYXZlRGlzYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhKCggdGhpcy5nZXROYW1lRXJyb3IoKSA9PT0gJycgKSAmJiAoIHRoaXMuZ2V0VGFnRXJyb3IoKSA9PT0gJycgKSk7XG4gICAgfTtcbiAgICAkc2NvcGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEhJHNjb3BlLmdldE5hbWVFcnJvcigpIHx8ICEhJHNjb3BlLmdldFRhZ0Vycm9yKCk7XG4gICAgfTtcbiAgICAkc2NvcGUuZ2V0TmFtZUVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZih0aGlzLmRzY29wZS5pZCA9PT0gdGhpcy5jZWxsTmFtZSlcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLmNhblJlbmFtZUNlbGwodGhpcy5jZWxsTmFtZSk7XG4gICAgfTtcbiAgICAkc2NvcGUuZ2V0VGFnRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5jYW5TZXRVc2VyVGFncyh0aGlzLmNlbGxUYWdzKTtcbiAgICB9O1xuICAgICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoJ2Nsb3NlJyk7XG4gICAgfTtcbiAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc2F2ZURpc2FibGVkKCkpXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhciByZWIgPSBmYWxzZTtcbiAgICAgIHRoaXMuZHNjb3BlLmluaXRpYWxpemF0aW9uID0gdGhpcy5pbml0aWFsaXphdGlvbkNlbGw7XG4gICAgICBpZiAodGhpcy5kc2NvcGUudGFncyAhPT0gdGhpcy5jZWxsVGFncykge1xuICAgICAgICB0aGlzLmRzY29wZS50YWdzID0gdGhpcy5jZWxsVGFncztcbiAgICAgICAgcmViID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRzY29wZS5pZCAhPT0gdGhpcy5jZWxsTmFtZSlcbiAgICAgICAgYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0NlbGxNYW5hZ2VyKCkucmVuYW1lQ2VsbCh0aGlzLmRzY29wZS5pZCx0aGlzLmNlbGxOYW1lKTtcbiAgICAgIGVsc2UgaWYocmViKVxuICAgICAgICBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5yZWJ1aWxkTWFwcygpXG4gICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgnc2F2ZScpO1xuICAgIH07XG59XSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5jb21tb25VdGlsc1xuICogLSB0aGlzIHNob3VsZCBiZSB0aGUgbW9zdCBnZW5lcmFsIHV0aWxpdGllcywgdGhlIHV0aWxpdGllcyB0aGF0IGNvdWxkIGhhdmUgYmVlbiBmb3VuZCBpbiBhXG4gKiAzcmQtcGFydHkgbGlicmFyeVxuICogYW5kIHdlIGp1c3QgaGFwcGVuIHRvIHdyaXRlIG91ciBvd24uXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbW1vblV0aWxzJywgW10pO1xuICBtb2R1bGUuZmFjdG9yeSgnY29tbW9uVXRpbHMnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2VuZXJhdGVJZDogZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gXCJcIjtcbiAgICAgICAgdmFyIHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKGxlbmd0aCkpIHtcbiAgICAgICAgICBsZW5ndGggPSA2O1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH0sXG4gICAgICBsb2FkSlM6IGZ1bmN0aW9uKHVybCwgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBlLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgICAvLyBBZGQgdGhlIHRpbWUgdG8gdGhlIFVSTCB0byBhdm9pZCBjYWNoaW5nLlxuICAgICAgICB2YXIgbWlsbGlzID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGUuc3JjID0gdXJsICsgXCI/Xz1cIiArIG1pbGxpcztcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBlLm9ubG9hZCA9IHN1Y2Nlc3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZhaWx1cmUpIHtcbiAgICAgICAgICBlLm9uZXJyb3IgPSBmYWlsdXJlO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZSk7XG4gICAgICB9LFxuICAgICAgbG9hZENTUzogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICAgIGxpbmsudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgICAgICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZlbnRPZmZzZXRYOiBmdW5jdGlvbihlbGVtLCBldmVudCkgeyAvLyBvZmZzZXRYIGlzIG5vdCBkZWZpbmVkIGluIGZpcmVmb3hcbiAgICAgICAgdmFyIHggPSBldmVudC5vZmZzZXRYO1xuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZCh4KSAmJiAhXy5pc1VuZGVmaW5lZChlbGVtLm9mZnNldCkpIHtcbiAgICAgICAgICB4ID0gZXZlbnQucGFnZVggLSBlbGVtLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9LFxuICAgICAgbG9hZExpc3Q6IGZ1bmN0aW9uKHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgaWYgKHVybHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsID0gdXJscy5zaGlmdCgpO1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvYWRKUyh1cmwsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG1lLmxvYWRMaXN0KHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpO1xuICAgICAgICB9LCBmYWlsdXJlKTtcbiAgICAgIH0sXG4gICAgICBmaW5kVGFibGU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgZnVuY3Rpb24gZmluZENvbHVtbk5hbWVzKGVsZW0pIHtcbiAgICAgICAgICB2YXIgcm93ID0gZWxlbS5jaGlsZHJlblswXTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3cuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChyb3cuY2hpbGRyZW5baV0uaW5uZXJIVE1MKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZEVudHJpZXMoZWxlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChlbGVtLmNoaWxkcmVuW2ldLmlubmVySFRNTCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRWYWx1ZXMoZWxlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChmaW5kRW50cmllcyhlbGVtLmNoaWxkcmVuW2ldKSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YWcgPSBlbGVtLnRhZ05hbWU7XG4gICAgICAgIGlmICh0YWcgPT09ICdESVYnKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gdGhpcy5maW5kVGFibGUoZWxlbS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICBpZiAoc3ViKSByZXR1cm4gc3ViO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFnID09PSAnVEFCTEUnKSB7XG4gICAgICAgICAgaWYgKGVsZW0uY2hpbGRyZW4ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVG8gcHJldmVudCBmcm9tIG1hbmdsaW5nIHVzZXIgY3JlYXRlZCBodG1sIHRhYmxlLFxuICAgICAgICAgIC8vIG9ubHkgdXNlIHRhYmxlIGRpc3BsYXkgZm9yIGRhdGFmcmFtZSB0YWJsZXMgKEJFQUtFUi00NTYpXG4gICAgICAgICAgaWYgKCFfLmNvbnRhaW5zKGVsZW0uY2xhc3NMaXN0LCAnZGF0YWZyYW1lJykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgdGFibGUgY29udGFpbnMgZWxlbWVudHMgd2l0aCBjb2xzcGFuIGFuZC9vciByb3dzcGFuXG4gICAgICAgICAgLy8gdGhlIHNsb2NrZ3JpZCB0ZW1wbGF0ZSBkb2VzIG5vdCBzdXBwb3J0IHRoZW0gIChCRUFLRVItNjk0KVxuICAgICAgICAgIHZhciBoZWFkZXJSb3dzID0gJChlbGVtKS5maW5kKCd0aGVhZCcpLmZpbmQoJ3RyJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWFkZXJSb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2ggPSBoZWFkZXJSb3dzW2ldLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaj0wOyBqPGNoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmIChjaFtqXS5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKT4xIHx8IGNoW2pdLmdldEF0dHJpYnV0ZSgncm93c3BhbicpPjEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdmFsdWVSb3dzID0gJChlbGVtKS5maW5kKCd0Ym9keScpLmZpbmQoJ3RyJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZVJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZhbHVlUm93c1tpXS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAodmFyIGo9MDsgajxjaC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICBpZiAoY2hbal0uZ2V0QXR0cmlidXRlKCdjb2xzcGFuJyk+MSB8fCBjaFtqXS5nZXRBdHRyaWJ1dGUoJ3Jvd3NwYW4nKT4xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIGEgdGFibGUgd2l0aCBtdWx0aXBsZSByb3dzXG4gICAgICAgICAgLy8gY3VycmVudGx5IHRoZSB0YWJsZSBkaXNwbGF5cyBjYW4ndCBoYW5kbGUgbXVsdGlwbGUgcm93cyBvZiBoZWFkZXIgKEJFQUtFUi00MTYpXG4gICAgICAgICAgLy8gYWRkZWQgbG9naWMgdG8gY29sbGFwc2UgdGhlIHR3byBoZWFkZXIgcm93cyAgKEJFQUtFUi02OTQpXG4gICAgICAgICAgdmFyIGNvbHMgPSBbXTtcbiAgICAgICAgICBpZiAoaGVhZGVyUm93cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vaWYgdGhlcmUgYXJlIHR3byByb3dzLCBhbGxvdyB0YWJsZWRpc3BsYXkgYXMgbG9uZyBhcyBubyBjb2x1bW4gaGFzIHZhbHVlcyBpbiBib3RoIHJvd3NcbiAgICAgICAgICAgIC8vdGhpcyBpcyBiZWNhdXNlIHBhbmRhcyByZW5kZXJzIGRhdGFmcmFtZXMgd2l0aCB0aGUgaW5kZXggY29sIGhlYWRlciBvbiBhIHNlY29uZCByb3dcbiAgICAgICAgICAgIHZhciByb3cwID0gaGVhZGVyUm93cy5lcSgwKS5maW5kKCd0aCcpO1xuICAgICAgICAgICAgdmFyIHJvdzEgPSBoZWFkZXJSb3dzLmVxKDEpLmZpbmQoJ3RoJyk7XG5cdCAgICB2YXIgbWluID0gcm93MC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobWluPnJvdzEubGVuZ3RoKSB7XG5cdFx0bWluID0gcm93MS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1pbjsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciByMCA9IHJvdzAuZXEoaSk7XG4gICAgICAgICAgICAgIHZhciByMSA9IHJvdzEuZXEoaSk7XG5cbiAgICAgICAgICAgICAgLy9pZiBhbnkgY29sdW1uIGhhcyBodG1sIGluIGJvdGggcm93cywgZG9uJ3QgdXNlIHRhYmxlZGlzcGxheVxuICAgICAgICAgICAgICBpZiAocjAgIT09IHVuZGVmaW5lZCAmJiByMSAhPSB1bmRlZmluZWQgJiYgcjAuaHRtbCgpICYmIHIxLmh0bWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIwICE9PSB1bmRlZmluZWQgJiYgcjAuaHRtbCgpKSB7XG5cdCAgICAgICAgY29scy5wdXNoKHIwLmh0bWwoKSk7XG5cdCAgICAgIH0gZWxzZSBpZiAocjEgIT09IHVuZGVmaW5lZCAmJiByMS5odG1sKCkpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2gocjEuaHRtbCgpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcblx0XHRjb2xzLnB1c2goXCJcIik7XG5cdCAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhlYWRlclJvd3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy9pZiB0aGVyZSBhcmUgdHdvIG9yIG1vcmUgaGVhZGVyLCBmb3JnZXQgYWJvdXQgaXRcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xzID0gZmluZENvbHVtbk5hbWVzKCQoZWxlbSkuZmluZCgndGhlYWQnKVswXSk7XG5cdCAgfVxuXG4gICAgICAgICAgdmFyIHZhbHMgPSBmaW5kVmFsdWVzKCQoZWxlbSkuZmluZCgndGJvZHknKVswXSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiVGFibGVEaXNwbGF5XCIsXG4gICAgICAgICAgICB0YWJsZURpc3BsYXlNb2RlbDoge1xuICAgICAgICAgICAgICBjb2x1bW5OYW1lczogY29scyxcbiAgICAgICAgICAgICAgdmFsdWVzOiB2YWxzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sdW1uTmFtZXM6IGNvbHMsXG4gICAgICAgICAgICB2YWx1ZXM6IHZhbHNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGZvcm1hdFRpbWVTdHJpbmc6IGZ1bmN0aW9uKG1pbGxpcykge1xuICAgICAgICBpZiAobWlsbGlzIDwgNjAgKiAxMDAwKSB7XG4gICAgICAgICAgcmV0dXJuIChtaWxsaXMgLyAxMDAwKS50b0ZpeGVkKDEpICsgXCJzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShtaWxsaXMpO1xuICAgICAgICAgIHZhciBkID0gTWF0aC5mbG9vcihtaWxsaXMgLyAoMjQgKiA2MCAqIDYwICogMTAwMCkpO1xuICAgICAgICAgIHZhciBoID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgICAgICAgdmFyIHMgPSBkYXRlLmdldFVUQ1NlY29uZHMoKTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICBpZiAoZCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAoZCArIFwiZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gKGggKyBcImhcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IChtICsgXCJtXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocyA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAocyArIFwic1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTWlkZGxlQ2xpY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5idXR0b24gPT09IDEgLy8gbWlkZGxlIGNsaWNrXG4gICAgICAgICAgICB8fCAoZXZlbnQuYnV0dG9uID09PSAwIC8vIGxlZnQgY2xpY2tcbiAgICAgICAgICAgICYmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTWFjXCIpICE9PSAtMSA/IGV2ZW50Lm1ldGFLZXkgOiBldmVudC5jdHJsS2V5KSk7XG4gICAgICB9LFxuICAgICAgc2F2ZUFzQ2xpZW50RmlsZTogZnVuY3Rpb24gKGRhdGEsIGZpbGVuYW1lKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbW1vblV0aWxzLnNhdmVBc0NsaWVudEZpbGU6IE5vIGRhdGEnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICAgICAgZmlsZW5hbWUgPSAnY29uc29sZS5qc29uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhLCB1bmRlZmluZWQsIDQpXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwge3R5cGU6ICd0ZXh0L2pzb24nfSksXG4gICAgICAgICAgICBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyksXG4gICAgICAgICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cbiAgICAgICAgYS5kb3dubG9hZCA9IGZpbGVuYW1lXG4gICAgICAgIGEuaHJlZiA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgICAgIGEuZGF0YXNldC5kb3dubG9hZHVybCA9IFsndGV4dC9qc29uJywgYS5kb3dubG9hZCwgYS5ocmVmXS5qb2luKCc6JylcbiAgICAgICAgZS5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlLCBmYWxzZSwgd2luZG93LCAwLCAwLCAwLCAwLCAwLFxuICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpXG4gICAgICAgIGEuZGlzcGF0Y2hFdmVudChlKVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvbW1vblVpXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgZ2VuZXJhbCBzdG9yZSBvZiBsb3cgbGV2ZWwgVUkgZGlyZWN0aXZlcywgd2hpY2ggc2hvdWxkIGJlIHNlcGFyYXRlZCBvdXQgb3JcbiAqIHBvdGVudGlhbGx5IGZvdW5kIGVxdWl2YWxlbnQgaW4gM3JkIHBhcnR5IGxpYnJhcmllcy5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb21tb25VaScsIFtdKTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnb25DdHJsRW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuYmluZCgna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7IC8vIGN0cmwgKyBlbnRlclxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGF0dHJzLm9uQ3RybEVudGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdlYXRDbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIGVsZW1lbnQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdmb2N1c1N0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBRLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrY2VsbCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0MnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQubW91c2VvdmVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnY2VsbC1icmFja2V0LXNlbGVjdGVkJyk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50Lm1vdXNlb3V0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnY2VsbC1icmFja2V0LXNlbGVjdGVkJyk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZmlsdGVyKCdpc0hpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgcmV0dXJuIF8oaW5wdXQpLmZpbHRlcihmdW5jdGlvbihpdCkge1xuICAgICAgICByZXR1cm4gIWl0LmhpZGRlbjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdkcm9wZG93blByb21vdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gSXMgeW91ciBkcm9wZG93biBiZWluZyBjb3ZlcmVkIGJ5IGl0cyBhbmNlc3RvcnMgc2libGluZ3M/XG4gICAgLy8gUHJvbW90ZSB0aGF0IHNoaXosIGFuZCBwcmVwZW5kIGl0IHRvIHRoZSBub3RlYm9vayBzbyBpdCBkb2Vzbid0XG4gICAgLy8gZXZlciBnZXQgYnVsbGllZCBhZ2Fpbi5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdDJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAkKHdpbmRvdykub24oJ2NsaWNrLicgKyBzY29wZS4kaWQsIGhpZGVEcm9wZG93bik7XG5cbiAgICAgICAgdmFyIGRyb3Bkb3duID0gZWxlbWVudC5maW5kKCcuZHJvcGRvd24tbWVudScpLmZpcnN0KCk7XG4gICAgICAgIHZhciB0b2dnbGUgPSBlbGVtZW50LmZpbmQoJy5kcm9wZG93bi10b2dnbGUnKS5maXJzdCgpO1xuXG4gICAgICAgIGVsZW1lbnQub24oJ2NsaWNrJywgJy5kcm9wZG93bi10b2dnbGUnLCB0b2dnbGVEcm9wZG93bik7XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgICAgICAgaWYgKCQoZHJvcGRvd24pLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gaGlkZURyb3Bkb3duKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2hvd0Ryb3Bkb3duKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2hvd0Ryb3Bkb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBub3RlYm9vayA9IGJrSGVscGVyLmdldE5vdGVib29rRWxlbWVudChzY29wZSk7XG4gICAgICAgICAgICB2YXIgdG9nZ2xlUG9zaXRpb24gPSB0b2dnbGUub2Zmc2V0KCk7XG4gICAgICAgICAgICB2YXIgbm90ZWJvb2tQb3NpdGlvbiA9IG5vdGVib29rLm9mZnNldCgpO1xuXG4gICAgICAgICAgICBkcm9wZG93bi5wcmVwZW5kVG8obm90ZWJvb2spO1xuXG4gICAgICAgICAgICBkcm9wZG93bi5zaG93KCkuY3NzKHtcbiAgICAgICAgICAgICAgdG9wOiB0b2dnbGVQb3NpdGlvbi50b3AgLSBub3RlYm9va1Bvc2l0aW9uLnRvcCArICdweCcsXG4gICAgICAgICAgICAgIGxlZnQ6IHRvZ2dsZVBvc2l0aW9uLmxlZnQgLSBub3RlYm9va1Bvc2l0aW9uLmxlZnQgLSBkcm9wZG93bi5vdXRlcldpZHRoKCkgKyAncHgnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gaGlkZURyb3Bkb3duKCkgeyBkcm9wZG93bi5oaWRlKCk7fVxuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHdpbmRvdykub2ZmKCcuJyArIHNjb3BlLiRpZCk7XG4gICAgICAgICAgLy8gU2luY2UgdGhlIGRyb3Bkb3duIGlzIGV4dGVybmFsIHRvIHRoZSBkaXJlY3RpdmUgd2UgbmVlZCB0byBtYWtlIHN1cmUgdG8gY2xlYW4gaXQgdXAgd2hlbiB0aGUgZGlyZWN0aXZlIGdvZXMgYXdheVxuICAgICAgICAgIGRyb3Bkb3duLnJlbW92ZSgpO1xuICAgICAgICAgIGVsZW1lbnQub2ZmKCdjbGljaycpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtEcm9wZG93bk1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ3RlbXBsYXRlL2Ryb3Bkb3duJ10oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgICdtZW51SXRlbXMnOiAnPScsXG5cbiAgICAgICAgLy8gQ2xhc3NlcyB0byBiZSBhZGRlZCB0byBhbnkgc3VibWVudSBpdGVtLiBVc2VkIGZvciBhZGRpbmdcbiAgICAgICAgLy8gcHVsbC1sZWZ0IHRvIG1lbnVzIHRoYXQgYXJlIG9uIHRoZSBmYXIgcmlnaHQgKGUuZy4gYmtjZWxsbWVudSkuXG4gICAgICAgIHN1Ym1lbnVDbGFzc2VzOiAnQCdcbiAgICAgIH0sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5nZXRNZW51SXRlbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gXy5yZXN1bHQoJHNjb3BlLCAnbWVudUl0ZW1zJyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrRHJvcGRvd25NZW51SXRlbScsIGZ1bmN0aW9uKCRjb21waWxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWyd0ZW1wbGF0ZS9kcm9wZG93bl9pdGVtJ10oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgICdpdGVtJzogJz0nXG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB2YXIgaXNJdGVtRGlzYWJsZWQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGlzYWJsZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZW0uZGlzYWJsZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEFDbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGlzSXRlbURpc2FibGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZGlzYWJsZWQtbGluaycpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA8PSAxICYmIGl0ZW0uYXV0b1JlZHVjZSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgIGlmIChpc0l0ZW1EaXNhYmxlZChpdGVtLml0ZW1zWzBdKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2RpdmlkZXInKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnZGl2aWRlcicpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnc3VibWVudScgfHwgaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaXRlbXMgJiYgaXRlbS5pdGVtcy5sZW5ndGggPD0gMSAmJiBpdGVtLmF1dG9SZWR1Y2UpIHtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Ryb3Bkb3duLXN1Ym1lbnUnKTtcbiAgICAgICAgICAgICAgLy8gQWRkIGFueSBleHRyYSBzdWJtZW51IGNsYXNzZXMuIChlLmcuIHRvIHNwZWNpZnkgaWYgaXQgc2hvdWxkIGJlIGxlZnQgb3IgcmlnaHQpLlxuICAgICAgICAgICAgICBpZiAoJHNjb3BlLnN1Ym1lbnVDbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3VibWVudUNsYXNzZXMuc3BsaXQoJyAnKSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnJ1bkFjdGlvbiA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiBpdGVtLmF1dG9SZWR1Y2UpIHtcbiAgICAgICAgICAgIGl0ZW0uaXRlbXNbMF0uYWN0aW9uKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5hY3Rpb24pKSB7XG4gICAgICAgICAgICAgIGl0ZW0uYWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXROYW1lID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciBuYW1lID0gJyc7XG4gICAgICAgICAgaWYgKGl0ZW0uaXRlbXMgJiYgaXRlbS5pdGVtcy5sZW5ndGggPT09IDEgJiYgaXRlbS5hdXRvUmVkdWNlKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pdGVtc1swXS5yZWR1Y2VkTmFtZSkge1xuICAgICAgICAgICAgICBuYW1lID0gaXRlbS5pdGVtc1swXS5yZWR1Y2VkTmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5hbWUgPSBpdGVtLml0ZW1zWzBdLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWUgPSBpdGVtLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24obmFtZSkpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc01lbnVJdGVtQ2hlY2tlZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS5pc0NoZWNrZWQpIHtcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5pc0NoZWNrZWQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmlzQ2hlY2tlZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXNDaGVja2VkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgc2NvcGUuZ2V0U3ViSXRlbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHNjb3BlLml0ZW0uaXRlbXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuaXRlbS5pdGVtcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc2NvcGUuaXRlbS5pdGVtcztcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKCdnZXRTdWJJdGVtcygpJywgZnVuY3Rpb24oaXRlbXMsIG9sZEl0ZW1zKSB7XG4gICAgICAgICAgaWYgKCFfLmlzRW1wdHkoaXRlbXMpKSB7XG4gICAgICAgICAgICAvL2pzY3M6ZGlzYWJsZVxuICAgICAgICAgICAgJGNvbXBpbGUoJzxiay1kcm9wZG93bi1tZW51IG1lbnUtaXRlbXM9XCJnZXRTdWJJdGVtcygpXCI+PC9iay1kcm9wZG93bi1tZW51PicpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWQsIHNjb3BlKSB7XG4gICAgICAgICAgICAvL2pzY3M6ZW5hYmxlXG4gICAgICAgICAgICAgIGVsZW1lbnQuZmluZCgndWwuZHJvcGRvd24tbWVudScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia0VudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgZWxlbWVudC5iaW5kKCdrZXlkb3duIGtleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLmJrRW50ZXIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTGFuZ3VhZ2VMb2dvJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogJzxzcGFuIG5nLXN0eWxlPVwic3R5bGVcIj57e25hbWV9fTwvc3Bhbj4nLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgbmFtZTogJ0AnLFxuICAgICAgICBiZ0NvbG9yOiAnQCcsXG4gICAgICAgIGZnQ29sb3I6ICdAJyxcbiAgICAgICAgYm9yZGVyQ29sb3I6ICdAJ1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBzY29wZS5zdHlsZSA9IHtcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHNjb3BlLmJnQ29sb3IsXG4gICAgICAgICAgJ2NvbG9yJzogc2NvcGUuZmdDb2xvclxuICAgICAgICB9O1xuICAgICAgICB2YXIgdXBkYXRlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5zdHlsZSA9IHtcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogc2NvcGUuYmdDb2xvcixcbiAgICAgICAgICAgICdjb2xvcic6IHNjb3BlLmZnQ29sb3JcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChzY29wZS5ib3JkZXJDb2xvcikge1xuICAgICAgICAgICAgc2NvcGUuc3R5bGVbJ2JvcmRlci13aWR0aCddID0gJzFweCc7XG4gICAgICAgICAgICBzY29wZS5zdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSBzY29wZS5ib3JkZXJDb2xvcjtcbiAgICAgICAgICAgIHNjb3BlLnN0eWxlWydib3JkZXItc3R5bGUnXSA9ICdzb2xpZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5zdHlsZVsnYm9yZGVyLXdpZHRoJ107XG4gICAgICAgICAgICBkZWxldGUgc2NvcGUuc3R5bGVbJ2JvcmRlci1jb2xvciddO1xuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLnN0eWxlWydib3JkZXItc3R5bGUnXTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnYmdDb2xvcicsIHVwZGF0ZVN0eWxlKTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdmZ0NvbG9yJywgdXBkYXRlU3R5bGUpO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2JvcmRlckNvbG9yJywgdXBkYXRlU3R5bGUpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmFuZ3VsYXJVdGlsc1xuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgQW5ndWxhckpTIHNwZWNpZmljIHV0aWxpdGllcyB0aGF0IGFyZSBzaGFyZWQgYWNyb3NzIHRoZSB3aG9sZSBhcHBsaWNhdGlvbi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuYW5ndWxhclV0aWxzJywgW10pO1xuICBtb2R1bGUuZmFjdG9yeSgnYW5ndWxhclV0aWxzJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkaHR0cCwgJHEsICR0aW1lb3V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldExvY2F0aW9uOiBmdW5jdGlvbihuZXdMb2NhdGlvbikge1xuICAgICAgICAkbG9jYXRpb24ucGF0aChuZXdMb2NhdGlvbik7XG4gICAgICB9LFxuICAgICAgcmVmcmVzaFJvb3RTY29wZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICRyb290U2NvcGUuJCRwaGFzZSB8fCAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIHRvUHJldHR5SnNvbjogZnVuY3Rpb24oYW5ndWxhckJvdW5kSnNPYmopIHtcbiAgICAgICAgaWYoYW5ndWxhckJvdW5kSnNPYmouY2VsbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaSA8IGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uYm9keSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5ib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmJvZHkgPSBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5ib2R5LnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQuYm9keSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dC5ib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgPSBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dC5ib2R5LnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSAnJCRoYXNoS2V5JykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXQgPSBKU09OLnN0cmluZ2lmeShhbmd1bGFyQm91bmRKc09iaiwgY2xlYW51cCwgNCkgKyBcIlxcblwiO1xuICAgICAgICB0aGlzLnJlbW92ZVN0cmluZ0FycmF5cyhhbmd1bGFyQm91bmRKc09iaik7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlU3RyaW5nQXJyYXlzOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgaWYob2JqLmNlbGxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBvYmouY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChvYmouY2VsbHNbaV0uYm9keSAhPT0gdW5kZWZpbmVkICYmICQuaXNBcnJheShvYmouY2VsbHNbaV0uYm9keSkpIHtcbiAgICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9ICdcXG4nO1xuICAgICAgICAgICAgICBvYmouY2VsbHNbaV0uYm9keSA9IG9iai5jZWxsc1tpXS5ib2R5LmpvaW4oW3NlcGFyYXRvcl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iai5jZWxsc1tpXS5pbnB1dCAhPT0gdW5kZWZpbmVkICYmIG9iai5jZWxsc1tpXS5pbnB1dC5ib2R5ICE9PSB1bmRlZmluZWQgJiYgJC5pc0FycmF5KG9iai5jZWxsc1tpXS5pbnB1dC5ib2R5KSkge1xuICAgICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gJ1xcbic7XG4gICAgICAgICAgICAgIG9iai5jZWxsc1tpXS5pbnB1dC5ib2R5ID0gb2JqLmNlbGxzW2ldLmlucHV0LmJvZHkuam9pbihbc2VwYXJhdG9yXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZnJvbVByZXR0eUpzb246IGZ1bmN0aW9uKGpzb25TdHJpbmcpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gYW5ndWxhci5mcm9tSnNvbihqc29uU3RyaW5nKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZVN0cmluZ0FycmF5cyhyZXQpO1xuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuICAgICAgaHR0cEdldDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IHVybCwgcGFyYW1zOiBkYXRhfSk7XG4gICAgICB9LFxuICAgICAgaHR0cFBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgZGF0YTogJC5wYXJhbShkYXRhKSxcbiAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBodHRwUHV0SnNvbjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbmV3RGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJHEuZGVmZXIoKTtcbiAgICAgIH0sXG4gICAgICBuZXdQcm9taXNlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRxLmFsbC5hcHBseSgkcSwgYXJndW1lbnRzKTtcbiAgICAgIH0sXG4gICAgICBmY2FsbDogZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZ1bmMoKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBmdW5jdGlvbiAoZnVuYywgbXMpIHtcbiAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZ1bmMsIG1zKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxUaW1lb3V0OiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgICR0aW1lb3V0LmNhbmNlbChwcm9taXNlKTtcbiAgICAgIH0sXG4gICAgICBkZWxheTogZnVuY3Rpb24obXMpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICB9LCBtcyk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBpcyBhIHJldXNhYmxlIFVJIGNvbXBvbmVudCBmb3IgdHJlZSB2aWV3cy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciB0cmVlVmlldyA9IGFuZ3VsYXIubW9kdWxlKCdiay50cmVlVmlldycsIFsnbmdBbmltYXRlJ10pO1xuXG4gIHRyZWVWaWV3LmZhY3RvcnkoJ2ZpbGVTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9wcm92aWRlciA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBzZXRQcm92aWRlcjogZnVuY3Rpb24ocHJvdmlkZXJzKSB7XG4gICAgICAgIF9wcm92aWRlciA9IHByb3ZpZGVycztcbiAgICAgIH0sXG4gICAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24odXJpLCBjYWxsYmFjaykge1xuICAgICAgICBfcHJvdmlkZXIuZ2V0Q2hpbGRyZW4odXJpLCBjYWxsYmFjayk7XG4gICAgICB9LFxuICAgICAgZmlsbElucHV0OiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgX3Byb3ZpZGVyLmZpbGxJbnB1dCh1cmkpO1xuICAgICAgfSxcbiAgICAgIG9wZW46IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICBfcHJvdmlkZXIub3Blbih1cmkpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIHRyZWVWaWV3LmRpcmVjdGl2ZShcInRyZWVWaWV3XCIsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlLCAkcm9vdFNjb3BlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogXCI8dHJlZS1ub2RlIGRhdGE9J3Jvb3QnIGZzPSdmcycgZGlzcGxheW5hbWU9J3t7IHJvb3R1cmkgfX0nPjwvdHJlZS1ub2RlPlwiLFxuICAgICAgc2NvcGU6IHtyb290dXJpOiBcIkBcIiwgZnM6IFwiPVwifSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICBpZiAoISR0ZW1wbGF0ZUNhY2hlLmdldCgndHJlZU5vZGVDaGlsZHJlbi5odG1sJykpIHtcbiAgICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RyZWVOb2RlQ2hpbGRyZW4uaHRtbCcsIFwiPHRyZWUtbm9kZSBjbGFzcz0nYmstdHJlZXZpZXcnIG5nLXJlcGVhdD0nZCBpbiBkYXRhLmNoaWxkcmVuIHwgZmlsZUZpbHRlcjpmcy5maWx0ZXIgfCBvcmRlckJ5OmZzLmdldE9yZGVyQnkoKTpmcy5nZXRPcmRlclJldmVyc2UoKScgZGF0YT0nZCcgZnM9J2ZzJz48L3RyZWUtbm9kZT5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV8uc3RyaW5nLmVuZHNXaXRoKCRzY29wZS5yb290dXJpLCAnLycpKSB7XG4gICAgICAgICAgJHNjb3BlLnJvb3R1cmkgPSAkc2NvcGUucm9vdHVyaSArICcvJztcbiAgICAgICAgfVxuXG4gICAgICAgICRyb290U2NvcGUuZnNQcmVmcyA9ICRyb290U2NvcGUuZnNQcmVmcyB8fCB7XG4gICAgICAgICAgb3BlbkZvbGRlcnM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnJvb3QgPSB7XG4gICAgICAgICAgdHlwZTogXCJkaXJlY3RvcnlcIixcbiAgICAgICAgICB1cmk6ICRzY29wZS5yb290dXJpLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uY29udGFpbnMoJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzLCAkc2NvcGUucm9vdHVyaSkpIHtcbiAgICAgICAgICAkc2NvcGUuZnMuZ2V0Q2hpbGRyZW4oJHNjb3BlLnJvb3R1cmksICRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRzY29wZS5yb290LmNoaWxkcmVuID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgdHJlZVZpZXcuZmlsdGVyKFwiZmlsZUZpbHRlclwiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY2hpbGRyZW4sIGZpbHRlcikge1xuICAgICAgcmV0dXJuIF8uaXNGdW5jdGlvbihmaWx0ZXIpID8gXyhjaGlsZHJlbikuZmlsdGVyKGZpbHRlcikgOiBjaGlsZHJlbjtcbiAgICB9O1xuICB9KVxuXG4gIHRyZWVWaWV3LmRpcmVjdGl2ZShcInRyZWVOb2RlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IFwiPHNwYW4gbmctZGJsY2xpY2s9J2RibENsaWNrKCknIG5nLWNsaWNrPSdjbGljaygpJz48aSBjbGFzcz0ne3sgZ2V0SWNvbigpIH19Jz48L2k+IDxzcGFuPnt7IGdldERpc3BsYXlOYW1lKCkgfX08L3NwYW4+PC9zcGFuPlwiICtcbiAgICAgICAgICBcIjxkaXYgY2xhc3M9J3B1c2hyaWdodCc+XCIgK1xuICAgICAgICAgIFwiPGRpdiBuZy1pbmNsdWRlPSdcXFwidHJlZU5vZGVDaGlsZHJlbi5odG1sXFxcIic+PC9kaXY+XCIgK1xuICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICBzY29wZToge2RhdGE6IFwiPVwiLCBmczogXCI9XCIsIGRpc3BsYXluYW1lOiBcIkBcIn0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUpIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogYy50eXBlLFxuICAgICAgICAgICAgdXJpOiBjLnVyaSxcbiAgICAgICAgICAgIG1vZGlmaWVkOiBjLm1vZGlmaWVkLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IGMuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICBjaGlsZHJlbjogXy5tYXAoYy5jaGlsZHJlbiwgdHJhbnNmb3JtKVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICB2YXIgdXJpID0gJHNjb3BlLmRhdGEudXJpO1xuICAgICAgICAgICAgaWYgKCFfLnN0cmluZy5lbmRzV2l0aCh1cmksICcvJykpIHtcbiAgICAgICAgICAgICAgdXJpID0gdXJpICsgJy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmZzLmZpbGxJbnB1dCh1cmkpO1xuICAgICAgICAgICAgLy8gdG9nZ2xlXG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eSgkc2NvcGUuZGF0YS5jaGlsZHJlbikpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuY2hpbGRyZW4uc3BsaWNlKDAsICRzY29wZS5kYXRhLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycyA9IF8ucmVqZWN0KCRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycywgZnVuY3Rpb24oZm9sZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uc3RyaW5nLnN0YXJ0c1dpdGgoZm9sZGVyLCB1cmkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRyb290U2NvcGUuZnNQcmVmcy5vcGVuRm9sZGVycy5wdXNoKHVyaSk7XG4gICAgICAgICAgICAgICRzY29wZS5mcy5nZXRDaGlsZHJlbigkc2NvcGUuZGF0YS51cmkpLnN1Y2Nlc3MoZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IF8uc29ydEJ5KGNoaWxkcmVuLCBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoYy50eXBlID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiEhISEhXCIgKyBjLnVyaS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGMudXJpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuY2hpbGRyZW4gPSBfLm1hcChjaGlsZHJlbiwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5mcy5maWxsSW5wdXQoJHNjb3BlLmRhdGEudXJpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5kYmxDbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS50eXBlID09PSAnZGlyZWN0b3J5JykgcmV0dXJuO1xuXG4gICAgICAgICAgJHNjb3BlLmZzLm9wZW4oJHNjb3BlLmRhdGEudXJpKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldEljb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEudHlwZSA9PT0gXCJkaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgcmV0dXJuICdmb2xkZXItaWNvbic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS50eXBlID09PSBcImFwcGxpY2F0aW9uL3Bycy50d29zaWdtYS5iZWFrZXIubm90ZWJvb2sranNvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2dseXBoaWNvbiBnbHlwaGljb24tYm9vayc7XG4gICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuZnMuZ2V0SWNvbiAmJiAkc2NvcGUuZnMuZ2V0SWNvbigkc2NvcGUuZGF0YS50eXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5mcy5nZXRJY29uKCRzY29wZS5kYXRhLnR5cGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2dseXBoaWNvbiBnbHlwaGljb24tdGgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RGlzcGxheU5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmRpc3BsYXluYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmRpc3BsYXluYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZGF0YS5kaXNwbGF5TmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5hbWUgPSAkc2NvcGUuZGF0YS51cmk7XG4gICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4gMCAmJiBuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcvJykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIG5hbWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5jb21ldGRVdGlsc1xuICogVGhpcyBtb2R1bGUgb2ZmZXJzIHRoZSBjb21ldGQgc2VydmljZSB0aGF0IGlzIHVzZWQgdG8gcmVjZWl2ZSAncHVzaGVzJyBmcm9tIHRoZSBzZXJ2ZXIuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbWV0ZFV0aWxzJywgW10pO1xuICBtb2R1bGUuZmFjdG9yeSgnY29tZXRkVXRpbHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9zdGF0dXNMaXN0ZW5lcjtcbiAgICB2YXIgX291dHB1dExpc3RlbmVyO1xuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXplQ29tZXRkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgJC5jb21ldGQuaW5pdCh7XG4gICAgICAgICAgdXJsOiB1cmlcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICAgIF9zdGF0dXNMaXN0ZW5lciA9ICQuY29tZXRkLmFkZExpc3RlbmVyKFwiL21ldGEvY29ubmVjdFwiLCBjYik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF9zdGF0dXNMaXN0ZW5lcikge1xuICAgICAgICAgICQuY29tZXRkLnJlbW92ZUxpc3RlbmVyKF9zdGF0dXNMaXN0ZW5lcik7XG4gICAgICAgICAgX3N0YXR1c0xpc3RlbmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXI6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICB0aGlzLnJlbW92ZU91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyKCk7XG4gICAgICAgIF9vdXRwdXRMaXN0ZW5lciA9ICQuY29tZXRkLnN1YnNjcmliZShcIi9vdXRwdXRsb2dcIiwgY2IpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZU91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfb3V0cHV0TGlzdGVuZXIpIHtcbiAgICAgICAgICAkLmNvbWV0ZC5yZW1vdmVMaXN0ZW5lcihfb3V0cHV0TGlzdGVuZXIpO1xuICAgICAgICAgIF9vdXRwdXRMaXN0ZW5lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgcmV0dXJuICQuY29tZXRkLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ub3RlYm9va1ZlcnNpb25NYW5hZ2VyXG4gKiBPZmZlcnMgdXRpbGl0aWVzIHRvIGNvbnZlcnQgYmVha2VyIG5vdGVib29rIG9mIG9sZCB2ZXJzaW9ucyB0byB0aGUgbGF0ZXN0IHZlcnNpb25cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2tWZXJzaW9uTWFuYWdlcicsIFtdKTtcblxuICB2YXIgYmtOYlYxQ29udmVydGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIC8vIGluIHYxLCBjZWxsIGxldmVsIGJ5IGRlZmluaXRpb24gaXMgdGhlIGNvdW50IG9mIHN0ZXBzIGF3YXkgZnJvbSBcInJvb3RcIiBpbiB0aGUgdHJlZVxuICAgIHZhciBnZXRTZWN0aW9uQ2VsbExldmVsID0gZnVuY3Rpb24oY2VsbCwgdGFnTWFwKSB7XG4gICAgICB2YXIgZ2V0UGFyZW50SWQgPSBmdW5jdGlvbihjSWQpIHtcbiAgICAgICAgdmFyIHBJZCA9IG51bGw7XG4gICAgICAgIF8odGFnTWFwKS5maW5kKGZ1bmN0aW9uKHYsIGspIHtcbiAgICAgICAgICBpZiAoXyh2KS5jb250YWlucyhjSWQpKSB7XG4gICAgICAgICAgICBwSWQgPSBrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBJZDtcbiAgICAgIH07XG4gICAgICB2YXIgbGV2ZWwgPSAwO1xuICAgICAgdmFyIHBhcmVudElkID0gZ2V0UGFyZW50SWQoY2VsbC5pZCk7XG4gICAgICB3aGlsZSAocGFyZW50SWQpIHtcbiAgICAgICAgKytsZXZlbDtcbiAgICAgICAgcGFyZW50SWQgPSBnZXRQYXJlbnRJZChwYXJlbnRJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGV2ZWw7XG4gICAgfTtcbiAgICB2YXIgY29udmVydENvZGVDZWxsID0gZnVuY3Rpb24oY2VsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJpZFwiOiBjZWxsLmlkLFxuICAgICAgICBcInR5cGVcIjogXCJjb2RlXCIsXG4gICAgICAgIFwiZXZhbHVhdG9yXCI6IGNlbGwuZXZhbHVhdG9yLFxuICAgICAgICBcImlucHV0XCI6IGNlbGwuaW5wdXQsXG4gICAgICAgIFwib3V0cHV0XCI6IGNlbGwub3V0cHV0XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRTZWN0aW9uQ2VsbCA9IGZ1bmN0aW9uKGNlbGwsIHRhZ01hcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJpZFwiOiBjZWxsLmlkLFxuICAgICAgICBcInR5cGVcIjogXCJzZWN0aW9uXCIsXG4gICAgICAgIFwibGV2ZWxcIjogZ2V0U2VjdGlvbkNlbGxMZXZlbChjZWxsLCB0YWdNYXApLFxuICAgICAgICBcInRpdGxlXCI6IGNlbGwudGl0bGUsXG4gICAgICAgIFwiY29sbGFwc2VkXCI6IGNlbGwuY29sbGFwc2VkXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRUZXh0Q2VsbCA9IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiaWRcIjogY2VsbC5pZCxcbiAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICBcImJvZHlcIjogY2VsbC5ib2R5XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRNYXJrZG93bkNlbGwgPSBmdW5jdGlvbihjZWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBcImlkXCI6IGNlbGwuaWQsXG4gICAgICAgIFwidHlwZVwiOiBcIm1hcmtkb3duXCIsXG4gICAgICAgIFwiYm9keVwiOiBjZWxsLmJvZHksXG4gICAgICAgIFwibW9kZVwiOiBjZWxsLm1vZGVcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydENlbGwgPSBmdW5jdGlvbihjZWxsLCB0YWdNYXAsIHRhZ01hcDIpIHtcbiAgICAgIHZhciByZXRDZWxsO1xuICAgICAgc3dpdGNoIChjZWxsLmNsYXNzWzBdKSB7XG4gICAgICAgIGNhc2UgXCJjb2RlXCI6XG4gICAgICAgICAgcmV0Q2VsbCA9IGNvbnZlcnRDb2RlQ2VsbChjZWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlY3Rpb25cIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydFNlY3Rpb25DZWxsKGNlbGwsIHRhZ01hcCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgcmV0Q2VsbCA9IGNvbnZlcnRUZXh0Q2VsbChjZWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1hcmtkb3duXCI6XG4gICAgICAgICAgcmV0Q2VsbCA9IGNvbnZlcnRNYXJrZG93bkNlbGwoY2VsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodGFnTWFwMiAmJiBfKHRhZ01hcDIuaW5pdGlhbGl6YXRpb24pLmNvbnRhaW5zKGNlbGwuaWQpKSB7XG4gICAgICAgIHJldENlbGwuaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldENlbGw7XG4gICAgfTtcbiAgICB2YXIgZ2V0Q2VsbElkcyA9IGZ1bmN0aW9uKGNlbGxzLCB0YWdNYXApIHtcbiAgICAgIHZhciBjZWxsSWRzID0gW107XG4gICAgICB2YXIgY0lkLCBjaGlsZHJlbjtcbiAgICAgIHZhciBzdGFjayA9IFtcInJvb3RcIl07XG4gICAgICB3aGlsZSAoIV8uaXNFbXB0eShzdGFjaykpIHtcbiAgICAgICAgY0lkID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGNlbGxJZHMucHVzaChjSWQpO1xuICAgICAgICBpZiAodGFnTWFwLmhhc093blByb3BlcnR5KGNJZCkpIHtcbiAgICAgICAgICBjaGlsZHJlbiA9IF8odGFnTWFwW2NJZF0pLmNsb25lKCk7XG4gICAgICAgICAgaWYgKCFfKGNoaWxkcmVuKS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHN0YWNrID0gc3RhY2suY29uY2F0KGNoaWxkcmVuLnJldmVyc2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2VsbElkcztcbiAgICB9O1xuICAgIHZhciBnZW5lcmF0ZUNlbGxNYXAgPSBmdW5jdGlvbihjZWxscykge1xuICAgICAgdmFyIGNlbGxNYXAgPSB7fTtcbiAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICBjZWxsTWFwW2NlbGwuaWRdID0gY2VsbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNlbGxNYXA7XG4gICAgfTtcbiAgICB2YXIgY29udmVydENlbGxzID0gZnVuY3Rpb24oY2VsbHMsIHRhZ01hcCwgdGFnTWFwMikge1xuICAgICAgdmFyIGNlbGxJZHMgPSBnZXRDZWxsSWRzKGNlbGxzLCB0YWdNYXApO1xuICAgICAgdmFyIGNlbGxNYXAgPSBnZW5lcmF0ZUNlbGxNYXAoY2VsbHMpO1xuICAgICAgdmFyIHYyQ2VsbHMgPSBfKGNlbGxJZHMpLmNoYWluKClcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQgIT09IFwicm9vdFwiO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGxNYXBbaWRdO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gIWNlbGwuaGlkZVRpdGxlO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udmVydENlbGwoY2VsbCwgdGFnTWFwLCB0YWdNYXAyKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC52YWx1ZSgpO1xuICAgICAgcmV0dXJuIHYyQ2VsbHM7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb252ZXJ0OiBmdW5jdGlvbihub3RlYm9va1YxKSB7XG4gICAgICAgIHZhciBub3RlYm9va1YyID0ge1xuICAgICAgICAgIGJlYWtlcjogXCIyXCIsXG4gICAgICAgICAgZXZhbHVhdG9yczogbm90ZWJvb2tWMS5ldmFsdWF0b3JzLFxuICAgICAgICAgIGNlbGxzOiBjb252ZXJ0Q2VsbHMobm90ZWJvb2tWMS5jZWxscywgbm90ZWJvb2tWMS50YWdNYXAsIG5vdGVib29rVjEudGFnTWFwMiksXG4gICAgICAgICAgbG9ja2VkOiBub3RlYm9va1YxLmxvY2tlZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm90ZWJvb2tWMjtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia05vdGVib29rVmVyc2lvbk1hbmFnZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3BlbjogZnVuY3Rpb24obm90ZWJvb2spIHtcbiAgICAgICAgaWYgKF8uaXNFbXB0eShub3RlYm9vaykpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJiZWFrZXJcIjogXCIyXCIsXG4gICAgICAgICAgICBcImV2YWx1YXRvcnNcIjogW10sXG4gICAgICAgICAgICBcImNlbGxzXCI6IFtdXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBub3RlYm9vayBpcyBhIHN0cmluZywgcGFyc2UgaXQgdG8ganMgb2JqZWN0XG4gICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG5vdGVib29rKSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub3RlYm9vayA9IGFuZ3VsYXIuZnJvbUpzb24obm90ZWJvb2spO1xuICAgICAgICAgICAgLy8gVE9ETywgdG8gYmUgcmVtb3ZlZC4gTG9hZCBhIGNvcnJ1cHRlZCBub3RlYm9vay5cbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG5vdGVib29rKSkge1xuICAgICAgICAgICAgICBub3RlYm9vayA9IGFuZ3VsYXIuZnJvbUpzb24obm90ZWJvb2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhpcyBpcyBub3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2sgSlNPTlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Iobm90ZWJvb2spO1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiTm90IGEgdmFsaWQgQmVha2VyIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGJlYWtlciB2ZXJzaW9uIGlzIHVuZGVmaW5lZFxuICAgICAgICAvLyB0cmVhdCBpdCBhcyBiZWFrZXIgbm90ZWJvb2sgdjFcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQobm90ZWJvb2suYmVha2VyKSkge1xuICAgICAgICAgIG5vdGVib29rLmJlYWtlciA9IFwiMVwiO1xuICAgICAgICB9XG4gICAgICAgIC8vY2hlY2sgdmVyc2lvbiBhbmQgc2VlIGlmIG5lZWQgY29udmVyc2lvblxuICAgICAgICBpZiAobm90ZWJvb2suYmVha2VyID09PSBcIjFcIikge1xuICAgICAgICAgIG5vdGVib29rID0gYmtOYlYxQ29udmVydGVyLmNvbnZlcnQobm90ZWJvb2spO1xuICAgICAgICB9IGVsc2UgaWYgKG5vdGVib29rLmJlYWtlciA9PT0gXCIyXCIpIHtcbiAgICAgICAgICAvLyBnb29kLCBcIjJcIiBpcyB0aGUgY3VycmVudCB2ZXJzaW9uXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgXCJVbmtub3duIEJlYWtlciBub3RlYm9vayB2ZXJzaW9uXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm90ZWJvb2s7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsub3V0cHV0TG9nXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlIG9mIGdldCBvdXRwdXQgbG9nIGZyb20gdGhlIHNlcnZlci5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsub3V0cHV0TG9nJywgWydiay51dGlscycsICdiay5jb21ldGRVdGlscyddKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2JrT3V0cHV0TG9nJywgZnVuY3Rpb24gKGJrVXRpbHMsIGNvbWV0ZFV0aWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldExvZzogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L291dHB1dGxvZy9nZXRcIiksIHt9KVxuICAgICAgICAgICAgLnN1Y2Nlc3MoY2IpXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBnZXQgb3V0cHV0IGxvZ1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5hZGRPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcihjYik7XG4gICAgICB9LFxuICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21ldGRVdGlscy5yZW1vdmVPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcigpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogIE1vZHVsZSBiay5yZWNlbnRNZW51XG4gKiAgVGhpcyBtb2R1bGUgb3ducyB0aGUgc2VydmljZSBvZiByZXRyaWV2aW5nIHJlY2VudCBtZW51IGl0ZW1zIGFuZCB1cGRhdGluZyB0aGUgcmVjZW50IG1lbnUuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnJlY2VudE1lbnUnLCBbJ2JrLmFuZ3VsYXJVdGlscyddKTtcblxuICBtb2R1bGUucHJvdmlkZXIoXCJia1JlY2VudE1lbnVcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zZXJ2ZXIgPSBudWxsO1xuICAgIHRoaXMuY29uZmlnU2VydmVyID0gZnVuY3Rpb24oc2VydmVyKSB7XG4gICAgICBfc2VydmVyID0gc2VydmVyO1xuICAgIH07XG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oYW5ndWxhclV0aWxzKSB7XG4gICAgICB2YXIgb3BJdGVtcyA9IHtcbiAgICAgICAgRU1QVFk6IHtuYW1lOiBcIihFbXB0eSlcIiwgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAgICBESVZJREVSOiB7dHlwZTogXCJkaXZpZGVyXCJ9LFxuICAgICAgICBDTEVBUklORzoge25hbWU6IFwiKENsZWFyaW5nLi4uKVwiLCBkaXNhYmxlZDogdHJ1ZX0sXG4gICAgICAgIFVQREFUSU5HOiB7bmFtZTogXCIoVXBkYXRpbmcuLi4pXCIsIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgICAgQ0xFQVI6IHtuYW1lOiBcIkNsZWFyXCIsIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJNZW51KCk7XG4gICAgICAgIH0gfSxcbiAgICAgICAgUkVGUkVTSDoge25hbWU6IFwiUmVmcmVzaFwiLCBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlZnJlc2hNZW51KCk7XG4gICAgICAgIH0gfVxuICAgICAgfTtcbiAgICAgIHZhciBfcmVjZW50TWVudSA9IFtvcEl0ZW1zLkVNUFRZXTtcbiAgICAgIHZhciByZWZyZXNoTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV9zZXJ2ZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCwgb3BJdGVtcy5VUERBVElORyk7XG4gICAgICAgIF9zZXJ2ZXIuZ2V0SXRlbXMoZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICB2YXIgaSwgSElTVE9SWV9MRU5HVEggPSAxMDtcbiAgICAgICAgICB2YXIgZ2V0U2hvcnROYW1lID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgICBpZiAodXJsICYmIHVybFt1cmwubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoXy5pc0VtcHR5KGl0ZW1zKSkge1xuICAgICAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCwgb3BJdGVtcy5FTVBUWSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZWNlbnRNZW51LnNwbGljZSgwLCBfcmVjZW50TWVudS5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aCAmJiBpIDwgSElTVE9SWV9MRU5HVEg7ICsraSkge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gYW5ndWxhci5mcm9tSnNvbihpdGVtc1tpXSk7XG4gICAgICAgICAgICAgICAgICBfcmVjZW50TWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2V0U2hvcnROYW1lKGl0ZW0udXJpKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfcGF0aE9wZW5lci5vcGVuKGl0ZW0udXJpLCBpdGVtLnR5cGUsIGl0ZW0ucmVhZE9ubHksIGl0ZW0uZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogaXRlbS51cmlcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBleGlzdHMgb25seSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgIF9yZWNlbnRNZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnZXRTaG9ydE5hbWUoaXRlbSksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3BhdGhPcGVuZXIub3BlbihpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogaXRlbVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgY2xlYXJNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIF9yZWNlbnRNZW51LnNwbGljZSgwLCBfcmVjZW50TWVudS5sZW5ndGgsIG9wSXRlbXMuQ0xFQVJJTkcpO1xuICAgICAgICBfc2VydmVyLmNsZWFyKHJlZnJlc2hNZW51KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBfcGF0aE9wZW5lcjtcbiAgICAgIHJlZnJlc2hNZW51KCk7IC8vIGluaXRpYWxpemVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHBhdGhPcGVuZXIpIHtcbiAgICAgICAgICBfcGF0aE9wZW5lciA9IHBhdGhPcGVuZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWNlbnRNZW51O1xuICAgICAgICB9LFxuICAgICAgICByZWNvcmRSZWNlbnREb2N1bWVudDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChfc2VydmVyKSB7XG4gICAgICAgICAgICBfc2VydmVyLmFkZEl0ZW0oaXRlbSwgcmVmcmVzaE1lbnUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5zZXNzaW9uXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlcyBvZiBjb21tdW5pY2F0aW5nIHRvIHRoZSBzZXNzaW9uIGJhY2t1cCBlbmQgcG9pbnQgdG8gbG9hZCBhbmRcbiAqIHVwbG9hZChiYWNrdXApIGEgc2Vzc2lvbi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuc2Vzc2lvbicsIFsnYmsudXRpbHMnXSk7XG4gIC8qKlxuICAgKiBia1Nlc3Npb25cbiAgICogLSB0YWxrcyB0byBiZWFrZXIgc2VydmVyICgvYmVha2VyL3Jlc3Qvc2Vzc2lvbilcbiAgICogLSBia1Nlc3Npb25NYW5hZ2VyIHNob3VsZCBkZXBlbmQgb24gaXQgdG8gdXBkYXRlL2JhY2t1cCB0aGUgc2Vzc2lvbiBtb2RlbFxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrU2Vzc2lvbicsIGZ1bmN0aW9uKGJrVXRpbHMpIHtcbiAgICB2YXIgYmFja3VwU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb25JZCwgc2Vzc2lvbkRhdGEpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIGJrVXRpbHMuaHR0cFBvc3QoYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9iYWNrdXAvXCIgKyBzZXNzaW9uSWQpLCBzZXNzaW9uRGF0YSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGJhY2t1cCBzZXNzaW9uOiBcIiArIHNlc3Npb25JZCArIFwiLCBcIiArIHN0YXR1cyk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJGYWlsZWQgdG8gYmFja3VwIHNlc3Npb246IFwiICsgc2Vzc2lvbklkICsgXCIsIFwiICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgdmFyIGdldFNlc3Npb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9nZXRFeGlzdGluZ1Nlc3Npb25zXCIpKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNlc3Npb25zKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNlc3Npb25zKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiRmFpbGVkIHRvIGdldCBleGlzdGluZyBzZXNzaW9ucyBcIiArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xuICAgIHZhciBsb2FkU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvbG9hZFwiKSwge3Nlc3Npb25pZDogc2Vzc2lvbklkfSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihzZXNzaW9uLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc2Vzc2lvbik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIkZhaWxlZCB0byBsb2FkIHNlc3Npb246IFwiICsgc2Vzc2lvbklkICsgXCIsIFwiICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgdmFyIGNsb3NlU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwUG9zdChia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2Nsb3NlXCIpLCB7c2Vzc2lvbmlkOiBzZXNzaW9uSWR9KVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzZXNzaW9uSWQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJGYWlsZWQgdG8gY2xvc2Ugc2Vzc2lvbjogXCIgKyBzZXNzaW9uSWQgKyBcIiwgXCIgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICB2YXIgcmVjb3JkTG9hZGVkUGx1Z2luID0gZnVuY3Rpb24ocGx1Z2luTmFtZSwgcGx1Z2luVXJsKSB7XG4gICAgICBia1V0aWxzLmh0dHBQb3N0KFxuICAgICAgICAgIGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvYWRkUGx1Z2luXCIpLFxuICAgICAgICAgIHtwbHVnaW5uYW1lOiBwbHVnaW5OYW1lLCBwbHVnaW51cmw6IHBsdWdpblVybH0pXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmVjb3JkTG9hZGVkUGx1Z2luXCIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGFkZCBwbHVnaW4sIFwiICsgcGx1Z2luTmFtZSArIFwiLCBcIiArIHBsdWdpblVybCArIFwiLCBcIiArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UGx1Z2lucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvZ2V0RXhpc3RpbmdQbHVnaW5zXCIpLCB7fSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihwbHVnaW5zKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHBsdWdpbnMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJGYWlsZWQgdG8gZ2V0IGV4aXN0aW5nIHBsdWdpbnMsIFwiICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldFNlc3Npb25zOiBnZXRTZXNzaW9ucyxcbiAgICAgIGxvYWQ6IGxvYWRTZXNzaW9uLFxuICAgICAgYmFja3VwOiBiYWNrdXBTZXNzaW9uLFxuICAgICAgY2xvc2U6IGNsb3NlU2Vzc2lvbixcbiAgICAgIHJlY29yZExvYWRlZFBsdWdpbjogcmVjb3JkTG9hZGVkUGx1Z2luLFxuICAgICAgZ2V0UGx1Z2luczogZ2V0UGx1Z2luc1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnNoYXJlXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBia1NoYXJlIHNlcnZpY2Ugd2hpY2ggY29tbXVuaWNhdGUgd2l0aCB0aGUgYmFja2VuZCB0byBjcmVhdGUgc2hhcmFibGVcbiAqIGNvbnRlbnQgYXMgd2VsbCBhcyB0byByZXR1cm4gVVJMIG9mIHRoZSBzaGFyZCBjb250ZW50LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5zaGFyZScsIFtdKTtcblxuICBtb2R1bGUucHJvdmlkZXIoXCJia1NoYXJlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfc2hhcmluZ1NlcnZpY2UgPSBudWxsO1xuICAgIHRoaXMuY29uZmlnID0gZnVuY3Rpb24oc2hhcmluZ1NlcnZpY2UpIHtcbiAgICAgIF9zaGFyaW5nU2VydmljZSA9IHNoYXJpbmdTZXJ2aWNlO1xuICAgIH07XG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIV9zaGFyaW5nU2VydmljZSkge1xuICAgICAgICB2YXIgbm9PcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmcgZm9yIG5vd1xuICAgICAgICAgIC8vIHdlIG1pZ2h0IGNvbnNpZGVyIGxvZ2dpbmcgZXJyb3Igb3Igd2FybmluZzpcbiAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJubyBzaGFyaW5nIHNlcnZpY2UgYXZhaWxhYmxlXCIpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHB1Ymxpc2g6IG5vT3AsXG4gICAgICAgICAgZ2V0U2hhcmFibGVVcmw6IG5vT3BcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZSByZWFzb24gb2Ygd3JhcHBpbmcgdGhlIHN0cmF0ZWd5IGluc3RlYWQgb2YganVzdCByZXR1cm5cbiAgICAgIC8vIGl0IChfc2hhcmluZ1NlcnZpY2UpIGlzIHRvIG1ha2UgdGhlIEFQSSBleHBsaWNpdC5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHVyaSwgY29udGVudCwgY2IpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLnB1Ymxpc2godXJpLCBjb250ZW50LCBjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGdlbmVyYXRlRXhjZWw6IGZ1bmN0aW9uKHBhdGgsIHRhYmxlLCBjYikge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UuZ2VuZXJhdGVFeGNlbChwYXRoLCB0YWJsZSwgY2IpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybCh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9TZWN0aW9uQ2VsbDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9TZWN0aW9uQ2VsbCh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9Db2RlQ2VsbDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9Db2RlQ2VsbCh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9UYWJsZTogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9UYWJsZSh1cmkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTaGFyYWJsZVVybF9Ob3RlYm9vazogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZXRTaGFyYWJsZVVybF9Ob3RlYm9vayh1cmkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnRyYWNrXG4gKiBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgdG8gM3JkIHBhcnR5IHByb3ZpZGVkIHVzYWdlIG1ldHJpY1xuICogbG9nZ2luZyBzZXJ2aWNlcy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsudHJhY2snLCBbXSk7XG5cbiAgbW9kdWxlLnByb3ZpZGVyKCdia1RyYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90cmFja2luZ1NlcnZpY2UgPSBudWxsO1xuICAgIHRoaXMuY29uZmlnID0gZnVuY3Rpb24odHJhY2tpbmdTZXJ2aWNlKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRyYWNraW5nU2VydmljZSkpIHtcbiAgICAgICAgX3RyYWNraW5nU2VydmljZSA9IHRyYWNraW5nU2VydmljZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RyYWNraW5nU2VydmljZSA9IHRyYWNraW5nU2VydmljZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFfdHJhY2tpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbG9nOiBmdW5jdGlvbihldmVudCwgb2JqKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc05lZWRQZXJtaXNzaW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2c6IGZ1bmN0aW9uKGV2ZW50LCBvYmplY3QpIHtcbiAgICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlLmxvZyhldmVudCwgb2JqZWN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBzb21lIHRyYWNraW5nIHNlcnZpY2Ugd2lsbCBuZWVkIHRvIGJlIGVuYWJsZWQgYmVmb3JlIGJlaW5nIHVzZWRcbiAgICAgICAgICBpZiAoX3RyYWNraW5nU2VydmljZS5lbmFibGUgJiYgXy5pc0Z1bmN0aW9uKF90cmFja2luZ1NlcnZpY2UuZW5hYmxlKSkge1xuICAgICAgICAgICAgX3RyYWNraW5nU2VydmljZS5lbmFibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHNvbWUgdHJhY2tpbmcgc2VydmljZSB3aWxsIG5lZWQgdG8gYmUgZW5hYmxlZCBiZWZvcmUgYmVpbmcgdXNlZFxuICAgICAgICAgIGlmIChfdHJhY2tpbmdTZXJ2aWNlLmRpc2FibGUgJiYgXy5pc0Z1bmN0aW9uKF90cmFja2luZ1NlcnZpY2UuZGlzYWJsZSkpIHtcbiAgICAgICAgICAgIF90cmFja2luZ1NlcnZpY2UuZGlzYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNOZWVkUGVybWlzc2lvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90cmFja2luZ1NlcnZpY2UuaXNOZWVkUGVybWlzc2lvblxuICAgICAgICAgICAgICAmJiBfLmlzRnVuY3Rpb24oX3RyYWNraW5nU2VydmljZS5pc05lZWRQZXJtaXNzaW9uKVxuICAgICAgICAgICAgICAmJiBfdHJhY2tpbmdTZXJ2aWNlLmlzTmVlZFBlcm1pc3Npb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay51dGlsc1xuICogVGhpcyBtb2R1bGUgY29udGFpbnMgdGhlIGxvdyBsZXZlbCB1dGlsaXRpZXMgdXNlZCBieSBCZWFrZXJcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsudXRpbHMnLCBbXG4gICAgJ2JrLmNvbW1vblV0aWxzJyxcbiAgICAnYmsuYW5ndWxhclV0aWxzJyxcbiAgICAnYmsuY29tZXRkVXRpbHMnLFxuICAgICdiay50cmFjaydcbiAgXSk7XG4gIC8qKlxuICAgKiBia1V0aWxzXG4gICAqIC0gaG9sZHMgZ2VuZXJhbC9sb3cwbGV2ZWwgdXRpbGl0aWVzIHRoYXQgYXJlIGJlYWtlciBzcGVjaWZpYyB0aGF0IGhhcyBubyBlZmZlY3QgdG8gRE9NIGRpcmVjdGx5XG4gICAqIC0gaXQgYWxzbyBzZXJ2ZXMgdGhlIHB1cnBvc2Ugb2YgaGlkaW5nIHVuZGVybmVhdGggdXRpbHM6IGNvbW1vblV0aWxzL2FuZ3VsYXJVdGlscy8uLi5cbiAgICogICAgZnJvbSBvdGhlciBwYXJ0cyBvZiBiZWFrZXJcbiAgICovXG4gIG1vZHVsZS5mYWN0b3J5KCdia1V0aWxzJywgZnVuY3Rpb24oY29tbW9uVXRpbHMsIGFuZ3VsYXJVdGlscywgYmtUcmFjaywgY29tZXRkVXRpbHMpIHtcblxuICAgIGZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc3VmZml4KSB7XG4gICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3VmZml4LCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xO1xuICAgIH1cbiAgICBcbiAgICB2YXIgc2VydmVyUm9vdCA9IGVuZHNXaXRoKGRvY3VtZW50LmJhc2VVUkksICdiZWFrZXIvJykgPyBkb2N1bWVudC5iYXNlVVJJLnN1YnN0cmluZygwLGRvY3VtZW50LmJhc2VVUkkubGVuZ3RoLTcpOiBkb2N1bWVudC5iYXNlVVJJO1xuICAgIFxuICAgIGZ1bmN0aW9uIHNlcnZlclVybChwYXRoKSB7XG4gICAgICByZXR1cm4gc2VydmVyUm9vdCArIHBhdGg7XG4gICAgfVxuXG4gICAgdmFyIGZpbGVSb290ID0gZG9jdW1lbnQuYmFzZVVSSTtcbiAgICBcbiAgICBmdW5jdGlvbiBmaWxlVXJsKHBhdGgpIHtcbiAgICAgIHJldHVybiBmaWxlUm9vdCArIHBhdGg7XG4gICAgfVxuXG4gICAgLy8gYWpheCBub3RlYm9vayBsb2NhdGlvbiB0eXBlcyBzaG91bGQgYmUgb2YgdGhlIGZvcm1cbiAgICAvLyBhamF4Oi9sb2FkaW5nL3BhdGg6L3NhdmluZy9wYXRoXG4gICAgZnVuY3Rpb24gcGFyc2VBamF4TG9jYXRvcihsb2NhdG9yKSB7XG4gICAgICB2YXIgcGllY2VzID0gbG9jYXRvci5zcGxpdChcIjpcIik7XG4gICAgICByZXR1cm4geyBzb3VyY2U6IHBpZWNlc1sxXSwgZGVzdGluYXRpb246IHBpZWNlc1syXSB9XG4gICAgfVxuXG4gICAgdmFyIGJrVXRpbHMgPSB7XG4gICAgICAgIHNlcnZlclVybDogc2VydmVyVXJsLFxuICAgICAgICBmaWxlVXJsOiBmaWxlVXJsLFxuXG4gICAgICAvLyB3cmFwIHRyYWNraW5nU2VydmljZVxuICAgICAgbG9nOiBmdW5jdGlvbihldmVudCwgb2JqKSB7XG4gICAgICAgIGJrVHJhY2subG9nKGV2ZW50LCBvYmopO1xuICAgICAgfSxcblxuICAgICAgLy8gd3JhcCBjb21tb25VdGlsc1xuICAgICAgZ2VuZXJhdGVJZDogZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5nZW5lcmF0ZUlkKGxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgbG9hZEpTOiBmdW5jdGlvbih1cmwsIHN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmxvYWRKUyh1cmwsIHN1Y2Nlc3MpO1xuICAgICAgfSxcbiAgICAgIGxvYWRDU1M6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMubG9hZENTUyh1cmwpO1xuICAgICAgfSxcbiAgICAgIGxvYWRMaXN0OiBmdW5jdGlvbih1cmxzLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5sb2FkTGlzdCh1cmxzLCBzdWNjZXNzLCBmYWlsdXJlKTtcbiAgICAgIH0sXG4gICAgICBmb3JtYXRUaW1lU3RyaW5nOiBmdW5jdGlvbihtaWxsaXMpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmZvcm1hdFRpbWVTdHJpbmcobWlsbGlzKTtcbiAgICAgIH0sXG4gICAgICBpc01pZGRsZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuaXNNaWRkbGVDbGljayhldmVudCk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZlbnRPZmZzZXRYOiBmdW5jdGlvbihlbGVtLCBldmVudCkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuZ2V0RXZlbnRPZmZzZXRYKGVsZW0sIGV2ZW50KTtcbiAgICAgIH0sXG4gICAgICBmaW5kVGFibGU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmZpbmRUYWJsZShlbGVtKTtcbiAgICAgIH0sXG4gICAgICBzYXZlQXNDbGllbnRGaWxlOiBmdW5jdGlvbihkYXRhLCBmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuc2F2ZUFzQ2xpZW50RmlsZShkYXRhLCBmaWxlbmFtZSk7XG4gICAgICB9LFxuXG4gICAgICAvLyB3cmFwIGFuZ3VsYXJVdGlsc1xuICAgICAgcmVmcmVzaFJvb3RTY29wZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICB9LFxuICAgICAgdG9QcmV0dHlKc29uOiBmdW5jdGlvbihqc09iaikge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLnRvUHJldHR5SnNvbihqc09iaik7XG4gICAgICB9LFxuICAgICAgZnJvbVByZXR0eUpzb246IGZ1bmN0aW9uKGpTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5mcm9tUHJldHR5SnNvbihqU3RyaW5nKTtcbiAgICAgIH0sXG4gICAgICBodHRwR2V0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5odHRwR2V0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgaHR0cFBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmh0dHBQb3N0KHVybCwgZGF0YSk7XG4gICAgICB9LFxuICAgICAgbmV3RGVmZXJyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICB9LFxuICAgICAgbmV3UHJvbWlzZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5uZXdQcm9taXNlKHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmFsbC5hcHBseShhbmd1bGFyVXRpbHMsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgICAgZmNhbGw6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5mY2FsbChmdW5jKTtcbiAgICAgIH0sXG4gICAgICBkZWxheTogZnVuY3Rpb24obXMpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXJVdGlscy5kZWxheShtcyk7XG4gICAgICB9LFxuICAgICAgdGltZW91dDogZnVuY3Rpb24oZnVuYyxtcykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLnRpbWVvdXQoZnVuYyxtcyk7XG4gICAgICB9LFxuICAgICAgY2FuY2VsVGltZW91dDogZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmNhbmNlbFRpbWVvdXQocHJvbWlzZSk7ICBcbiAgICAgIH0sXG4gICAgICBzZXRTZXJ2ZXJSb290OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgc2VydmVyUm9vdCA9IHVybDtcbiAgICAgIH0sXG4gICAgICBzZXRGaWxlUm9vdDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIGZpbGVSb290ID0gdXJsO1xuICAgICAgfSxcblxuICAgICAgLy8gYmVha2VyIHNlcnZlciBpbnZvbHZlZCB1dGlsc1xuICAgICAgZ2V0SG9tZURpcmVjdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9nZXRIb21lRGlyZWN0b3J5XCIpKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZXRWZXJzaW9uSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvdXRpbC9nZXRWZXJzaW9uSW5mb1wiKSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2V0U3RhcnRVcERpcmVjdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9nZXRTdGFydFVwRGlyZWN0b3J5XCIpKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZXREZWZhdWx0Tm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvdXRpbC9nZXREZWZhdWx0Tm90ZWJvb2tcIikpLlxuICAgICAgICAgICAgc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoYW5ndWxhci5mcm9tSnNvbihkYXRhKSk7XG4gICAgICAgICAgICB9KS5cbiAgICAgICAgICAgIGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVyLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGRhdGEsIHN0YXR1cywgaGVhZGVyLCBjb25maWcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdlbmVyYXRlTm90ZWJvb2s6IGZ1bmN0aW9uKGV2YWx1YXRvcnMsIGNlbGxzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYmVha2VyOiBcIjJcIixcbiAgICAgICAgICBldmFsdWF0b3JzOiBldmFsdWF0b3JzLFxuICAgICAgICAgIGNlbGxzOiBjZWxsc1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGxvYWRGaWxlOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL2xvYWRcIiksIHtwYXRoOiBwYXRofSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFfLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5ndWxhciAkaHR0cCBhdXRvLWRldGVjdHMgSlNPTiByZXNwb25zZSBhbmQgZGVzZXJpYWxpemUgaXQgdXNpbmcgYSBKU09OIHBhcnNlclxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhpcyBiZWhhdmlvciwgdGhpcyBpcyBhIGhhY2sgdG8gcmV2ZXJzZSBpdFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG5cbiAgICAgIGxvYWRIdHRwOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2h0dHAtcHJveHkvbG9hZFwiKSwge3VybDogdXJsfSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFfLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5ndWxhciAkaHR0cCBhdXRvLWRldGVjdHMgSlNPTiByZXNwb25zZSBhbmQgZGVzZXJpYWxpemUgaXQgdXNpbmcgYSBKU09OIHBhcnNlclxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhpcyBiZWhhdmlvciwgdGhpcyBpcyBhIGhhY2sgdG8gcmV2ZXJzZSBpdFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBsb2FkQWpheDogZnVuY3Rpb24oYWpheExvY2F0b3IpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwR2V0KHBhcnNlQWpheExvY2F0b3IoYWpheExvY2F0b3IpLnNvdXJjZSlcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFfLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5ndWxhciAkaHR0cCBhdXRvLWRldGVjdHMgSlNPTiByZXNwb25zZSBhbmQgZGVzZXJpYWxpemUgaXQgdXNpbmcgYSBKU09OIHBhcnNlclxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdGhpcyBiZWhhdmlvciwgdGhpcyBpcyBhIGhhY2sgdG8gcmV2ZXJzZSBpdFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBzYXZlRmlsZTogZnVuY3Rpb24ocGF0aCwgY29udGVudEFzSnNvbiwgb3ZlcndyaXRlKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBQb3N0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2ZpbGUtaW8vc2F2ZVwiKSwge3BhdGg6IHBhdGgsIGNvbnRlbnQ6IGNvbnRlbnRBc0pzb259KVxuICAgICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cFBvc3Qoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9zYXZlSWZOb3RFeGlzdHNcIiksIHtwYXRoOiBwYXRoLCBjb250ZW50OiBjb250ZW50QXNKc29ufSlcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVyLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSA0MDkpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImV4aXN0c1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IFwiaXNEaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHNhdmVBamF4OiBmdW5jdGlvbihhamF4TG9jYXRvciwgY29udGVudEFzSnNvbikge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gcGFyc2VBamF4TG9jYXRvcihhamF4TG9jYXRvcikuZGVzdGluYXRpb247XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwUHV0SnNvbihkZXN0aW5hdGlvbiwge2RhdGE6IGNvbnRlbnRBc0pzb259KVxuICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGluaXRpYWxpemVDb21ldGQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMuaW5pdGlhbGl6ZUNvbWV0ZCh1cmkpO1xuICAgICAgfSxcbiAgICAgIGFkZENvbm5lY3RlZFN0YXR1c0xpc3RlbmVyOiBmdW5jdGlvbihjYikge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMuYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoY2IpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICB9LFxuICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5kaXNjb25uZWN0KCk7XG4gICAgICB9LFxuXG4gICAgICBiZWdpbnNXaXRoOiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiAoaGF5c3RhY2suc3Vic3RyKDAsIG5lZWRsZS5sZW5ndGgpID09PSBuZWVkbGUpO1xuICAgICAgfSxcblxuICAgICAgLy8gd3JhcHBlciBhcm91bmQgcmVxdWlyZUpTXG4gICAgICBtb2R1bGVNYXA6IHt9LFxuICAgICAgbG9hZE1vZHVsZTogZnVuY3Rpb24odXJsLCBuYW1lKSB7XG4gICAgICAgIC8vIG5hbWUgaXMgb3B0aW9uYWwsIGlmIHByb3ZpZGVkLCBpdCBjYW4gYmUgdXNlZCB0byByZXRyaWV2ZSB0aGUgbG9hZGVkIG1vZHVsZSBsYXRlci5cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICBpZiAoXy5pc1N0cmluZyh1cmwpKSB7XG4gICAgICAgICAgdmFyIGRlZmVycmVkID0gdGhpcy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgIHdpbmRvdy5yZXF1aXJlKFt1cmxdLCBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShuYW1lKSkge1xuICAgICAgICAgICAgICB0aGF0Lm1vZHVsZU1hcFtuYW1lXSA9IHVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmV0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwibW9kdWxlIGZhaWxlZCB0byBsb2FkXCIsXG4gICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgXCJpbGxlZ2FsIGFyZ1wiICsgdXJsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZTogZnVuY3Rpb24obmFtZU9yVXJsKSB7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLm1vZHVsZU1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lT3JVcmwpID8gdGhpcy5tb2R1bGVNYXBbbmFtZU9yVXJsXSA6IG5hbWVPclVybDtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1aXJlKHVybCk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYmtVdGlscztcbiAgfSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9