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
            "Ctrl-Space": showAutoComplete,
            "Cmd-Space": showAutoComplete,
            "Ctrl-Alt-Up": moveCellUp,
            "Cmd-Alt-Up": moveCellUp,
            "Ctrl-Alt-Down": moveCellDown,
            "Cmd-Alt-Down": moveCellDown,
            "Ctrl-Alt-D": deleteCell,
            "Cmd-Alt-D": deleteCell
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImNvbnRyb2xwYW5lbC5qcyIsImNvbnRyb2xwYW5lbC1kaXJlY3RpdmUuanMiLCJjb250cm9scGFuZWxzZXNzaW9uaXRlbS1kaXJlY3RpdmUuanMiLCJjZWxsbWVudXBsdWdpbm1hbmFnZXIuanMiLCJjb3JlLmpzIiwiZGVidWcuanMiLCJldmFsdWF0ZXBsdWdpbm1hbmFnZXIuanMiLCJoZWxwZXIuanMiLCJtZW51cGx1Z2lubWFuYWdlci5qcyIsIm1haW5hcHAuanMiLCJldmFsdWF0ZWpvYm1hbmFnZXIuanMiLCJldmFsdWF0b3JtYW5hZ2VyLmpzIiwibm90ZWJvb2tjZWxsbW9kZWxtYW5hZ2VyLmpzIiwibm90ZWJvb2tuYW1lc3BhY2Vtb2RlbG1hbmFnZXIuanMiLCJzZXNzaW9ubWFuYWdlci5qcyIsIm5vdGVib29rLmpzIiwiY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbGlucHV0bWVudS1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dC1kaXJlY3RpdmUuanMiLCJjb2RlY2VsbG91dHB1dG1lbnUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd24tZWRpdGFibGUtZGlyZWN0aXZlLmpzIiwibWFya2Rvd25jZWxsLWRpcmVjdGl2ZS5qcyIsIm5ld2NlbGxtZW51LWRpcmVjdGl2ZS5qcyIsIm5vdGVib29rLWRpcmVjdGl2ZS5qcyIsInNlY3Rpb25jZWxsLWRpcmVjdGl2ZS5qcyIsInRleHRjZWxsLWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXkuanMiLCJvdXRwdXRkaXNwbGF5LWRpcmVjdGl2ZS5qcyIsIm91dHB1dGRpc3BsYXlmYWN0b3J5LXNlcnZpY2UuanMiLCJvdXRwdXRkaXNwbGF5c2VydmljZW1hbmFnZXItc2VydmljZS5qcyIsInBsdWdpbm1hbmFnZXItZGlyZWN0aXZlLmpzIiwicGx1Z2lubWFuYWdlcmV2YWx1YXRvcnNldHRpbmdzLWRpcmVjdGl2ZS5qcyIsImNvZGVjZWxsb3B0aW9ucy1kaXJlY3RpdmUuanMiLCJjb21tb251dGlscy5qcyIsImNvbW1vbnVpLmpzIiwiYW5ndWxhcnV0aWxzLmpzIiwidHJlZXZpZXcuanMiLCJjb21ldGR1dGlscy5qcyIsIm5vdGVib29rdmVyc2lvbm1hbmFnZXIuanMiLCJvdXRwdXRsb2cuanMiLCJyZWNlbnRtZW51LmpzIiwic2Vzc2lvbi5qcyIsInNoYXJlLmpzIiwidHJhY2suanMiLCJ1dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5ckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyc0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJlYWtlckFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImNvbnRyb2xwYW5lbC9jb250cm9scGFuZWxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxoZWFkZXIgY2xhc3M9XCJuYXZiYXItZml4ZWQtdG9wIGJrclwiPlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItaW52ZXJzZSBia3JcIj5cXG4gICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmQgYmtyXCIgaHJlZj1cIi9iZWFrZXIvIy9jb250cm9sXCIgbmctY2xpY2s9XCJnb3RvQ29udHJvbFBhbmVsKCRldmVudClcIiBlYXQtY2xpY2s9XCJcIj5cXG4gICAgICA8aW1nIHNyYz1cImFwcC9pbWFnZXMvYmVha2VyX2ljb25AMngucG5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICBCZWFrZXJcXG4gICAgPC9hPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0IGJrclwiPlxcbiAgICA8dWwgY2xhc3M9XCJuYXYgbmF2YmFyLW5hdiBia3JcIj5cXG4gICAgICA8bGkgY2xhc3M9XCJkcm9wZG93biBia3JcIiBuZy1yZXBlYXQ9XCJtIGluIGdldE1lbnVzKClcIj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgcm9sZT1cImJ1dHRvblwiIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIHt7bS5pZH19IGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj57e20ubmFtZX19PC9hPlxcbiAgICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cIm0uaXRlbXNcIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudT5cXG4gICAgICA8L2xpPlxcbiAgICAgIDxwIG5nLWlmPVwiZGlzY29ubmVjdGVkXCIgY2xhc3M9XCJuYXZiYXItdGV4dCB0ZXh0LWRhbmdlciByaWdodCBia3JcIj5cXG4gICAgICAgIG9mZmxpbmVcXG4gICAgICA8L3A+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG48L2hlYWRlcj5cXG5cXG48ZGl2IGNsYXNzPVwiZGFzaGJvYXJkIGNvbnRhaW5lci1mbHVpZCBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgYmtyXCI+XFxuXFxuICAgICAgPGgxIGNsYXNzPVwiYmtyXCI+QmVha2VyIDxzbWFsbCBjbGFzcz1cImJrclwiPlRoZSBkYXRhIHNjaWVudGlzdFxcJ3MgbGFib3JhdG9yeTwvc21hbGw+PC9oMT5cXG5cXG4gICAgICA8ZGl2IG5nLWlmPVwiaXNTZXNzaW9uc0xpc3RFbXB0eSgpXCIgY2xhc3M9XCJlbXB0eS1zZXNzaW9uLXByb21wdCBia3JcIj5cXG4gICAgICAgICAgPHAgY2xhc3M9XCJia3JcIj5DbGljayBiZWxvdyB0byBnZXQgc3RhcnRlZCBjb2RpbmcgaW4gUHl0aG9uLCBSLCBKYXZhU2NyaXB0LCBKdWxpYSwgU2NhbGEsIEphdmEsIEdyb292eSwgYW5kIFJ1YnkuIDxiciBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICAgIEJlZ2lubmVycyBzaG91bGQgY2hlY2sgb3V0IHRoZSA8c3Ryb25nIGNsYXNzPVwiYmtyXCI+SGVscCDihpIgVHV0b3JpYWw8L3N0cm9uZz4uPC9wPlxcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgbmctaGlkZT1cImlzU2Vzc2lvbnNMaXN0RW1wdHkoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8aDQgY2xhc3M9XCJvcGVuLW5vdGVib29rLWhlYWRsaW5lIGJrclwiPk9wZW4gTm90ZWJvb2tzPC9oND5cXG4gICAgICAgIDxiay1jb250cm9sLXBhbmVsLXNlc3Npb24taXRlbSBjbGFzcz1cIm9wZW4tbm90ZWJvb2tzIGJrclwiPjwvYmstY29udHJvbC1wYW5lbC1zZXNzaW9uLWl0ZW0+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBuZXctbm90ZWJvb2sgYmtyXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHRleHQtY2VudGVyIGJ0bi1ibG9jayBia3JcIiBuZy1jbGljaz1cIm5ld05vdGVib29rKClcIj5OZXcgRGVmYXVsdCBOb3RlYm9vazwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB0ZXh0LWNlbnRlciBidG4tYmxvY2sgbmV3LWVtcHR5LW5vdGVib29rIGJrclwiIG5nLWNsaWNrPVwibmV3RW1wdHlOb3RlYm9vaygpXCI+TmV3IEVtcHR5IE5vdGVib29rPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTYgYmtyXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmYXV4LWRyb3Atem9uZSBia3JcIj5cXG4gICAgICAgICAgICBPciBkcmFnIGEgLmJrciBmaWxlIGFueXdoZXJlIG9uIHRoaXMgcGFnZSB0byBpbXBvcnRcXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCIgbmctc2hvdz1cImlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9PSBudWxsXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNiB3ZWxsIGJrclwiPlxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YiBjbGFzcz1cImJrclwiPlRyYWNrIGFub255bW91cyB1c2FnZSBpbmZvPzwvYj5cXG4gICAgICA8L3A+XFxuXFxuICAgICAgPHAgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIFdlIHdvdWxkIGxpa2UgdG8gY29sbGVjdCBhbm9ueW1vdXMgdXNhZ2UgaW5mbyB0byBoZWxwIGltcHJvdmUgb3VyIHByb2R1Y3QuIFdlIG1heSBzaGFyZSB0aGlzIGluZm9ybWF0aW9uXFxuICAgICAgICB3aXRoIG90aGVyIHBhcnRpZXMsIGluY2x1ZGluZywgaW4gdGhlIHNwaXJpdCBvZiBvcGVuIHNvZnR3YXJlLCBieSBtYWtpbmcgaXQgcHVibGljbHkgYWNjZXNzaWJsZS48YnIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8L3A+XFxuXFxuICAgICAgPHAgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwOi8vYmVha2Vybm90ZWJvb2suY29tL3ByaXZhY3lcIiBjbGFzcz1cImJrclwiPlByaXZhY3kgcG9saWN5PC9hPiAtIDxhIGNsYXNzPVwiY3Vyc29yX2hhbmQgYmtyXCIgbmctY2xpY2s9XCJzaG93V2hhdFdlTG9nKClcIj5XaGF0IHdpbGwgd2UgbG9nPzwvYT5cXG4gICAgICA8L3A+XFxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBia3JcIj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYmtyXCIgbmctY2xpY2s9XCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBmYWxzZVwiPk5vLCBkb25cXCd0IHRyYWNrPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1hY3RpdmUgYmtyXCIgbmctY2xpY2s9XCJpc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSB0cnVlXCI+WWVzLCB0cmFjayBteSBpbmZvPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgPC9kaXY+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJjb250cm9scGFuZWwvdGFibGVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjx1bCBjbGFzcz1cIm5vdGVib29rLWRhc2hib2FyZC1saXN0IGJrclwiPlxcbiAgPGxpIGNsYXNzPVwic2Vzc2lvbiBjbGVhcmZpeCBia3JcIiBuZy1yZXBlYXQ9XCJzZXNzaW9uIGluIHNlc3Npb25zIHwgb3JkZXJCeTomcXVvdDtvcGVuZWREYXRlJnF1b3Q7OnRydWVcIj5cXG4gICAgPGRpdiBjbGFzcz1cInB1bGwtbGVmdCBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FwdGlvbiBia3JcIiBuZy1jbGljaz1cIm9wZW4oc2Vzc2lvbilcIj57e2dldENhcHRpb24oc2Vzc2lvbil9fTwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJsaWdodCBwYXRoIGJrclwiIG5nLWlmPVwiZ2V0RGVzY3JpcHRpb24oc2Vzc2lvbilcIj5cXG4gICAgICAgIHt7Z2V0RGVzY3JpcHRpb24oc2Vzc2lvbil9fVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtIHB1bGwtcmlnaHQgY2xvc2Utc2Vzc2lvbiBia3JcIiBuZy1jbGljaz1cImNsb3NlKHNlc3Npb24pXCI+Q2xvc2U8L2E+XFxuICAgIDxkaXYgY2xhc3M9XCJvcGVuLWRhdGUgbGlnaHQgcHVsbC1yaWdodCBia3JcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImJrclwiPk9wZW5lZCBvbjwvc3Bhbj5cXG4gICAgICB7e3Nlc3Npb24ub3BlbmVkRGF0ZSB8IGRhdGU6XFwnbWVkaXVtXFwnfX1cXG4gICAgPC9kaXY+XFxuICA8L2xpPlxcbjwvdWw+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJjb250cm9scGFuZWwvd2hhdF93ZV9sb2dcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDMgY2xhc3M9XCJia3JcIj5XaGF0IHdpbGwgd2UgbG9nPC9oMz5cXG48L2Rpdj5cXG5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBia3JcIj5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxiIGNsYXNzPVwiYmtyXCI+V2hhdCB3ZSBsb2c6PC9iPlxcbiAgPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5XZSB1c2UgR29vZ2xlIEFuYWx5dGljcyB0byBjb2xsZWN0IHVzYWdlIGluZm8uIEdvb2dsZSBBbmFseXRpY3MgY29sbGVjdHMgZGF0YSBzdWNoIGFzIGhvdyBsb25nIHlvdSBzcGVuZCBpbiBCZWFrZXIsIHdoYXQgYnJvd3NlciB5b3VcXCdyZSB1c2luZywgYW5kIHlvdXIgZ2VvZ3JhcGhpYyByZWdpb24uPC9wPlxcbiAgPHAgY2xhc3M9XCJia3JcIj5JbiBhZGRpdGlvbiB0byB0aGUgc3RhbmRhcmQgR29vZ2xlIEFuYWx5dGljcyBjb2xsZWN0aW9uLCB3ZVxcJ3JlIGxvZ2dpbmcgaG93IG1hbnkgdGltZXMgeW91IHJ1biBjZWxscyBpbiBlYWNoIGxhbmd1YWdlIGFuZCB3aGF0IHR5cGVzIG9mIG5vdGVib29rcyB5b3Ugb3BlbiAobG9jYWwgLmJrciBmaWxlLCByZW1vdGUgLmlweW5iLCBldCBjZXRlcmEpLjwvcD5cXG4gIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxiIGNsYXNzPVwiYmtyXCI+V2hhdCB3ZSA8aSBjbGFzcz1cImJrclwiPmRvblxcJ3Q8L2k+IGxvZzo8L2I+XFxuICA8L3A+XFxuICA8cCBjbGFzcz1cImJrclwiPldlIHdpbGwgbmV2ZXIgbG9nIGFueSBvZiB0aGUgY29kZSB5b3UgcnVuIG9yIHRoZSBuYW1lcyBvZiB5b3VyIG5vdGVib29rcy48L3A+XFxuICA8cCBjbGFzcz1cImJrclwiPlBsZWFzZSBzZWUgb3VyIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwOi8vYmVha2Vybm90ZWJvb2suY29tL3ByaXZhY3lcIiBjbGFzcz1cImJrclwiPnByaXZhY3kgcG9saWN5PC9hPiBmb3IgbW9yZSBpbmZvcm1hdGlvbi48L3A+XFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBia3JcIj5cXG4gICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiIG5nLWNsaWNrPVwiY2xvc2UoKVwiPkdvdCBpdDwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiaGVscGVycy9wbHVnaW4tbG9hZC1lcnJvclwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBia3JcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPkxhbmd1YWdlIEVycm9yPC9oMT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBia3JcIj5cXG5cXG48cCBjbGFzcz1cImJrclwiPkZhaWxlZCB0byBzdGFydCAnICtcbigoX190ID0gKHBsdWdpbklkKSkgPT0gbnVsbCA/ICcnIDogX190KSArXG4nLjwvcD5cXG5cXG48cCBjbGFzcz1cImJrclwiPkRpZCB5b3UgaW5zdGFsbCBpdCBhY2NvcmRpbmcgdG8gdGhlIGluc3RydWN0aW9uc1xcbm9uIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwOi8vYmVha2Vybm90ZWJvb2suY29tL2dldHRpbmctc3RhcnRlZCMnICtcbigoX190ID0gKHBsdWdpbklkKSkgPT0gbnVsbCA/ICcnIDogX190KSArXG4nXCIgY2xhc3M9XCJia3JcIj5CZWFrZXJOb3RlYm9vay5jb208L2E+P1xcbjwvcD5cXG5cXG48cCBjbGFzcz1cImJrclwiPklmIHlvdSBhbHJlYWR5IGhhdmUgaXQsIHRoZW4gPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS90d29zaWdtYS9iZWFrZXItbm90ZWJvb2svd2lraS9MYW5ndWFnZS1QcmVmZXJlbmNlc1wiIGNsYXNzPVwiYmtyXCI+ZWRpdFxcbnlvdXIgcHJlZmVyZW5jZXMgZmlsZTwvYT4gdG8gaGVscCBCZWFrZXIgZmluZCBpdCBvbiB5b3VyIHN5c3RlbSwgYW5kXFxudGhlbiByZXN0YXJ0IEJlYWtlciBhbmQgdHJ5IGFnYWluLlxcbjwvcD5cXG5cXG48cCBjbGFzcz1cImJrclwiPkFueSBvdGhlciBsYW5ndWFnZXMgaW4geW91ciBub3RlYm9vayBzaG91bGQgc3RpbGwgd29yay48L3A+XFxuXFxuPC9kaXY+XFxuXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBia3IgYmtyXCI+XFxuICA8YnV0dG9uIGNsYXNzPVwiYmVha2VyLWJ0biBhY3RpdmUgYmtyXCIgbmctY2xpY2s9XCIkY2xvc2UoKVwiPk9LPC9idXR0b24+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9kcm9wZG93blwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRyb3Bkb3duTWVudVwiPlxcbiAgPGJrLWRyb3Bkb3duLW1lbnUtaXRlbSBuZy1yZXBlYXQ9XCJpdGVtIGluIGdldE1lbnVJdGVtcygpIHwgaXNIaWRkZW5cIiBpdGVtPVwiaXRlbVwiIGNsYXNzPVwiYmtyXCI+PC9iay1kcm9wZG93bi1tZW51LWl0ZW0+XFxuPC91bD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL2Ryb3Bkb3duX2l0ZW1cIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxsaSBuZy1jbGFzcz1cImdldEl0ZW1DbGFzcyhpdGVtKVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YSBocmVmPVwiI1wiIHRhYmluZGV4PVwiLTFcIiBuZy1jbGljaz1cInJ1bkFjdGlvbihpdGVtKVwiIG5nLWNsYXNzPVwiZ2V0QUNsYXNzKGl0ZW0pXCIgaWQ9XCJ7e2l0ZW0uaWR9fVwiIHRpdGxlPVwie3tpdGVtLnRvb2x0aXB9fVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1vayBia3JcIiBuZy1zaG93PVwiaXNNZW51SXRlbUNoZWNrZWQoaXRlbSlcIj48L2k+XFxuICAgIHt7Z2V0TmFtZShpdGVtKX19XFxuICA8L2E+XFxuPC9saT4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL2ZpbGVhY3Rpb25kaWFsb2dcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgYmtyXCI+XFxuICA8aDEgY2xhc3M9XCJia3JcIj57e2FjdGlvbk5hbWV9fTwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgYmtyXCI+XFxuICA8cCBjbGFzcz1cImJrclwiPlBhdGg6IDxpbnB1dCBuYW1lPVwie3tpbnB1dElkfX1cIiBuZy1tb2RlbD1cInJlc3VsdFwiIGNsYXNzPVwiYmtyXCI+PC9wPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyXCI+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKHJlc3VsdClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBia3JcIj57e2FjdGlvbk5hbWV9fTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvb3Blbm5vdGVib29rXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiPlxcbiAgIDxoMSBjbGFzcz1cImJrclwiPnt7IGdldFN0cmF0ZWd5KCkudGl0bGUgfHwgXFwnT3BlblxcJ319PHNwYW4gbmctc2hvdz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5zaG93U3Bpbm5lclwiIGNsYXNzPVwiYmtyXCI+PGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoIGZhLXNwaW4gYmtyXCI+PC9pPjwvc3Bhbj48L2gxPlxcbiAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJzLWFuZC1zb3J0cyBia3JcIj5cXG4gICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia3JcIj5cXG4gICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4teHMgZHJvcGRvd24tdG9nZ2xlIGJrclwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgICAgICAgU29ydCBieToge3tnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuZ2V0UHJldHR5T3JkZXJCeSgpfX1cXG4gICAgICAgPC9idXR0b24+XFxuICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCIgcm9sZT1cIm1lbnVcIj5cXG4gICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ3VyaVxcJywgcmV2ZXJzZTogZmFsc2UgfSlcIiBjbGFzcz1cImJrclwiPk5hbWU8L2E+PC9saT5cXG4gICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ21vZGlmaWVkXFwnLCByZXZlcnNlOiB0cnVlIH0pXCIgY2xhc3M9XCJia3JcIj5EYXRlIE1vZGlmaWVkPC9hPjwvbGk+XFxuICAgICAgIDwvdWw+XFxuICAgICA8L2Rpdj5cXG4gICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBia3JcIj5cXG4gICA8dHJlZS12aWV3IHJvb3R1cmk9XCIvXCIgZnM9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnNcIiBjbGFzcz1cImJrclwiPjwvdHJlZS12aWV3PlxcbiAgIDx0cmVlLXZpZXcgcm9vdHVyaT1cIicgK1xuX19lKCBob21lZGlyICkgK1xuJ1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrclwiPlxcbiAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxlZnQgYmtyXCI+RW50ZXIgYSBmaWxlIHBhdGggKGUuZy4gL1VzZXJzLy4uLikgb3IgVVJMIChlLmcuIGh0dHA6Ly8uLi4pOjwvZGl2PlxcbiAgIDxwIGNsYXNzPVwiYmtyXCI+PGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGJrclwiIG5nLW1vZGVsPVwiZ2V0U3RyYXRlZ3koKS5pbnB1dFwiIG5nLWtleXByZXNzPVwiZ2V0U3RyYXRlZ3koKS5jbG9zZSgkZXZlbnQsIGNsb3NlKVwiIGZvY3VzLXN0YXJ0PVwiXCI+PC9wPlxcbiAgIDxzcGFuIHN0eWxlPVwiZmxvYXQ6bGVmdFwiIG5nLWlmPVwiZ2V0U3RyYXRlZ3koKS5leHQgPT09IHVuZGVmaW5lZFwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjp0b3BcIiBuZy1tb2RlbD1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5hcHBseUV4dEZpbHRlclwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICA8c3BhbiBuZy1jbGljaz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5hcHBseUV4dEZpbHRlciA9ICFnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuYXBwbHlFeHRGaWx0ZXJcIiBjbGFzcz1cImJrclwiPnNob3cgJyArXG4oKF9fdCA9ICggZXh0ZW5zaW9uICkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJyBmaWxlcyBvbmx5PC9zcGFuPlxcbiAgIDwvc3Bhbj5cXG4gICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgIDxidXR0b24gbmctY2xpY2s9XCJjbG9zZShnZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IG1vZGFsLXN1Ym1pdCBia3JcIj57eyBnZXRTdHJhdGVneSgpLmNsb3NlYnRuIHx8IFxcJ09wZW5cXCd9fTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvc2F2ZW5vdGVib29rXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiPlxcbiAgPGgxIGNsYXNzPVwiYmtyXCI+U2F2ZSA8c3BhbiBuZy1zaG93PVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzLnNob3dTcGlubmVyXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxpIGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGJrclwiPjwvaT48L3NwYW4+PC9oMT5cXG4gIDxkaXYgY2xhc3M9XCJmaWx0ZXJzLWFuZC1zb3J0cyBia3JcIj5cXG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGJrclwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxcbiAgICAgICAgU29ydCBieToge3tnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuZ2V0T3JkZXJCeSgpfX1cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiIHJvbGU9XCJtZW51XCI+XFxuICAgICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLnRyZWVWaWV3ZnMuc2V0T3JkZXJCeSh7IG9yZGVyQnk6IFxcJ3VyaVxcJywgcmV2ZXJzZTogZmFsc2UgfSlcIiBjbGFzcz1cImJrclwiPk5hbWU8L2E+PC9saT5cXG4gICAgICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBuZy1jbGljaz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmcy5zZXRPcmRlckJ5KHsgb3JkZXJCeTogXFwnbW9kaWZpZWRcXCcsIHJldmVyc2U6IHRydWUgfSlcIiBjbGFzcz1cImJrclwiPkRhdGUgTW9kaWZpZWQ8L2E+PC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGZpeGVkIGJrclwiIHN0eWxlPVwicGFkZGluZy1ib3R0b206IDEwNnB4XCI+IFxcbiAgPHRyZWUtdmlldyByb290dXJpPVwiL1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG4gIDx0cmVlLXZpZXcgcm9vdHVyaT1cIicgK1xuX19lKCBob21lZGlyICkgK1xuJ1wiIGZzPVwiZ2V0U3RyYXRlZ3koKS50cmVlVmlld2ZzXCIgY2xhc3M9XCJia3JcIj48L3RyZWUtdmlldz5cXG4gIDx0cmVlLXZpZXcgbmctaWY9XCJcXCcnICtcbl9fZSggaG9tZWRpciApICtcbidcXCcgIT0gXFwnJyArXG5fX2UoIHB3ZCApICtcbidcXCdcIiByb290dXJpPVwiJyArXG5fX2UoIHB3ZCApICtcbidcIiBmcz1cImdldFN0cmF0ZWd5KCkudHJlZVZpZXdmc1wiIGNsYXNzPVwiYmtyXCI+PC90cmVlLXZpZXc+XFxuICBcXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiAxMDZweFwiPiBcXG4gIDxwIGNsYXNzPVwiYmtyXCI+XFxuICAgIDxpbnB1dCBpZD1cInNhdmVBc0ZpbGVJbnB1dFwiIGNsYXNzPVwibGVmdCBia3JcIiBuZy1tb2RlbD1cImdldFN0cmF0ZWd5KCkuaW5wdXRcIiBuZy1rZXlwcmVzcz1cImdldFN0cmF0ZWd5KCkuY2xvc2UoJGV2ZW50LCBjbG9zZSlcIiBmb2N1cy1zdGFydD1cIlwiPlxcbiAgICA8aSBjbGFzcz1cIm5ldy1mb2xkZXIgYmstaWNvbiBia3JcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIk1ha2UgbmV3IGRpcmVjdG9yeSAoe3tnZXRTdHJhdGVneSgpLmlucHV0fX0pXCIgbmctY2xpY2s9XCJnZXRTdHJhdGVneSgpLm5ld0ZvbGRlcihnZXRTdHJhdGVneSgpLmlucHV0KVwiPjwvaT5cXG4gIDwvcD5cXG4gIDxzcGFuIHN0eWxlPVwiZmxvYXQ6bGVmdFwiIGNsYXNzPVwiYmtyXCI+e3tnZXRTdHJhdGVneSgpLmdldFJlc3VsdCgpfX08L3NwYW4+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cImNsb3NlKGdldFN0cmF0ZWd5KCkuZ2V0UmVzdWx0KCkpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYmtyXCIgbmctZGlzYWJsZWQ9XCJnZXRTdHJhdGVneSgpLmdldFNhdmVCdG5EaXNhYmxlZCgpXCI+U2F2ZTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9kaWFsb2dzL2NvZGVjZWxsb3B0aW9uc1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBia3JcIj5cXG4gIDxoMSBjbGFzcz1cImJrclwiPkNvZGUgQ2VsbCBPcHRpb25zPC9oMT5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJmb3JtLWhvcml6b250YWwgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJrclwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XCJjZWxsLWlkXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsIGNvbC1zbS0yIGJrclwiPklkPC9sYWJlbD5cXG4gICAgICA8ZGl2IG5nLWNsYXNzPVwiaXNFcnJvcigpID8gXFwnY29sLXNtLTdcXCcgOiBcXCdjb2wtc20tMTBcXCdcIiBjbGFzcz1cImJrclwiPjxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImNlbGxOYW1lXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGJrclwiIG5nLWlmPVwiaXNFcnJvcigpXCI+PHNwYW4gY2xhc3M9XCJoZWxwLWlubGluZSBia3JcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnt7Z2V0TmFtZUVycm9yKCl9fTwvc3Bhbj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJrclwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XCJjZWxsLXRhZ3NcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWwgY29sLXNtLTIgYmtyXCI+VGFnczwvbGFiZWw+XFxuICAgICAgPGRpdiBuZy1jbGFzcz1cImlzRXJyb3IoKSA/IFxcJ2NvbC1zbS03XFwnIDogXFwnY29sLXNtLTEwXFwnXCIgY2xhc3M9XCJia3JcIj48aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJjZWxsVGFnc1wiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBia3JcIiBuZy1pZj1cImlzRXJyb3IoKVwiPjxzcGFuIGNsYXNzPVwiaGVscC1pbmxpbmUgYmtyXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj57e2dldFRhZ0Vycm9yKCl9fTwvc3Bhbj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJrclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwIGJrclwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94IGJrclwiPlxcbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmctbW9kZWw9XCJpbml0aWFsaXphdGlvbkNlbGxcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICAgIEluaXRpYWxpemF0aW9uIENlbGxcXG4gICAgICAgICAgPC9sYWJlbD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgYmtyXCI+XFxuICA8YnV0dG9uIG5nLWNsaWNrPVwiY2xvc2UoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cInNhdmUoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJrclwiIG5nLWNsYXNzPVwic2F2ZURpc2FibGVkKCkgJmFtcDsmYW1wOyBcXCdkaXNhYmxlZFxcJ1wiPlNhdmU8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcInRlbXBsYXRlL2Rhc2hib2FyZC9hcHBcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxiay1jb250cm9sLXBhbmVsIGNsYXNzPVwiYmtyXCI+PC9iay1jb250cm9sLXBhbmVsPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1widGVtcGxhdGUvbWFpbmFwcC9hcHBcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxiay1tYWluLWFwcCBjbGFzcz1cImJrclwiPjwvYmstbWFpbi1hcHA+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJ0ZW1wbGF0ZS9tYWluYXBwL21haW5hcHBcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxoZWFkZXIgY2xhc3M9XCJuYXZiYXItZml4ZWQtdG9wIGJrclwiPlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItaW52ZXJzZSBia3JcIj5cXG4gICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmQgYmtyXCIgaHJlZj1cIi9iZWFrZXIvIy9jb250cm9sXCIgbmctY2xpY2s9XCJnb3RvQ29udHJvbFBhbmVsKCRldmVudClcIiBlYXQtY2xpY2s9XCJcIj5cXG4gICAgICA8aW1nIHNyYz1cImFwcC9pbWFnZXMvYmVha2VyX2ljb25AMngucG5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICBCZWFrZXJcXG4gICAgPC9hPlxcbiAgICA8cCBjbGFzcz1cIm5hdmJhci10ZXh0IGJrclwiPnt7ZmlsZW5hbWUoKX19PC9wPlxcbiAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10ZXh0IGJrclwiIG5nLWlmPVwibG9hZGluZyB8fCAhIWxvYWRpbmdtc2dcIj5cXG4gICAgICA8aSBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiB0ZXh0LXdoaXRlIGJrclwiPjwvaT5cXG4gICAgPC9zcGFuPlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLXRleHQgdGV4dC13aGl0ZSBsb2FkaW5nbXNnIGJrclwiIG5nLWlmPVwibG9hZGluZyB8fCAhIWxvYWRpbmdtc2dcIj5cXG4gICAgICB7e2xvYWRpbmdtc2d9fVxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBia3JcIj5cXG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgYmtyXCI+XFxuICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd24gYmtyXCIgbmctcmVwZWF0PVwibSBpbiBnZXRNZW51cygpXCI+XFxuICAgICAgICA8YSBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBia3JcIiBuZy1jbGFzcz1cIm0uY2xhc3NOYW1lc1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj57e20ubmFtZX19PC9hPlxcbiAgICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cIm0uaXRlbXNcIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudT5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgICA8cCBuZy1pZj1cImlzRWRpdGVkKClcIiBjbGFzcz1cIm5hdmJhci10ZXh0IHRleHQtc3VjY2VzcyBwdWxsLXJpZ2h0IGJrclwiPmVkaXRlZDwvcD5cXG4gICAgPHAgbmctaWY9XCJpc0Rpc2Nvbm5lY3RlZCgpXCIgY2xhc3M9XCJuYXZiYXItdGV4dCBwdWxsLXJpZ2h0IGJrclwiPlxcbiAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBjbGFzcz1cIm5hdmJhci1saW5rIHRleHQtZGFuZ2VyIGJrclwiIG5nLWNsaWNrPVwicHJvbXB0VG9TYXZlKClcIiBlYXQtY2xpY2s9XCJcIj57e2dldE9mZmluZU1lc3NhZ2UoKX19PC9hPlxcbiAgICA8L3A+XFxuICA8L2Rpdj5cXG48L2hlYWRlcj5cXG5cXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkIG5vdGVib29rLWNvbnRhaW5lciBia3JcIj5cXG4gIDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgYmtyXCI+XFxuICAgICAgPGJrLW5vdGVib29rIHNldC1iay1ub3RlYm9vaz1cInNldEJrTm90ZWJvb2soYmtOb3RlYm9vaylcIiBpcy1sb2FkaW5nPVwibG9hZGluZ1wiIGNsYXNzPVwiYmtyXCI+PC9iay1ub3RlYm9vaz5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIFxcbiAgPGRpdiBzdHlsZT1cImhlaWdodDogMzAwcHhcIiBjbGFzcz1cImJrclwiPjwvZGl2PlxcblxcbjwvZGl2PlxcblxcblxcbjxzY3JpcHQgdHlwZT1cInRleHQvbmctdGVtcGxhdGVcIiBpZD1cInNlY3Rpb24tY2VsbC5odG1sXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxiay1zZWN0aW9uLWNlbGw+PC9iay1zZWN0aW9uLWNlbGw+XFxuPC9zY3JpcHQ+XFxuPHNjcmlwdCB0eXBlPVwidGV4dC9uZy10ZW1wbGF0ZVwiIGlkPVwidGV4dC1jZWxsLmh0bWxcIiBjbGFzcz1cImJrclwiPlxcbiAgPGRpdiBjbGFzcz1cInRleHQtY2VsbFwiPlxcbiAgICA8YmstdGV4dC1jZWxsPjwvYmstdGV4dC1jZWxsPlxcbiAgPC9kaXY+XFxuPC9zY3JpcHQ+XFxuPHNjcmlwdCB0eXBlPVwidGV4dC9uZy10ZW1wbGF0ZVwiIGlkPVwibWFya2Rvd24tY2VsbC5odG1sXCIgY2xhc3M9XCJia3JcIj5cXG4gIDxiay1tYXJrZG93bi1jZWxsPjwvYmstbWFya2Rvd24tY2VsbD5cXG48L3NjcmlwdD5cXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L25nLXRlbXBsYXRlXCIgaWQ9XCJjb2RlLWNlbGwuaHRtbFwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstY29kZS1jZWxsIGNlbGxtb2RlbD1cImNlbGxtb2RlbFwiIGNlbGxtZW51PVwiY2VsbHZpZXcubWVudVwiIGluZGV4PVwiJGluZGV4XCI+PC9iay1jb2RlLWNlbGw+XFxuPC9zY3JpcHQ+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvcGx1Z2lubWFuYWdlci9wbHVnaW5tYW5hZ2VyXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiA2OXB4XCI+XFxuICAgIDxoMSBjbGFzcz1cImJrclwiPkxhbmd1YWdlIE1hbmFnZXI8L2gxPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBmaXhlZCBtb2RhbC1sYXJnZSBwbHVnaW4tbWFuYWdlciBia3JcIiBzdHlsZT1cInBhZGRpbmctdG9wOiA2OXB4OyBwYWRkaW5nLWJvdHRvbTogNjhweFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwibGFuZ3VhZ2VzIGNsZWFyZml4IGJrclwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgbGFuZ3VhZ2UtaWNvbi1idXR0b24gYmtyXCIgbmctY2xpY2s9XCJldmFsVGFiT3AudG9nZ2xlUGx1Z2luKHBsdWdpbk5hbWUpXCIgbmctcmVwZWF0PVwiKHBsdWdpbk5hbWUsIHBsdWdpblN0YXR1cykgaW4gZXZhbFRhYk9wLmdldEV2YWx1YXRvclN0YXR1c2VzKClcIiBuZy1jbGFzcz1cInBsdWdpbk5hbWVcIj5cXG4gICAgICAgIDxzcGFuIG5nLWNsYXNzPVwiXFwncGx1Z2luLVxcJyArIHBsdWdpblN0YXR1c1wiIGNsYXNzPVwicGx1Z2luLXN0YXR1cyBia3JcIj7il488L3NwYW4+XFxuICAgICAgICA8YmstbGFuZ3VhZ2UtbG9nbyBiZy1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yRGV0YWlscyhwbHVnaW5OYW1lKS5iZ0NvbG9yfX1cIiBuYW1lPVwie3tnZXRFdmFsdWF0b3JEZXRhaWxzKHBsdWdpbk5hbWUpLnNob3J0TmFtZX19XCIgZmctY29sb3I9XCJ7e2dldEV2YWx1YXRvckRldGFpbHMocGx1Z2luTmFtZSkuZmdDb2xvcn19XCIgYm9yZGVyLWNvbG9yPVwie3tnZXRFdmFsdWF0b3JEZXRhaWxzKHBsdWdpbk5hbWUpLmJvcmRlckNvbG9yfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPC9iay1sYW5ndWFnZS1sb2dvPlxcblxcbiAgICAgICAge3twbHVnaW5OYW1lfX1cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uIG5nLWNsaWNrPVwiZXZhbFRhYk9wLnNob3dVUkwgPSAhZXZhbFRhYk9wLnNob3dVUkxcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIj5cXG4gICAgICAgIEZyb20gVVJMLi4uXFxuICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLXNob3c9XCJldmFsVGFiT3Auc2hvd1VSTFwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAgYWRkZXZhbCBia3JcIj5cXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBiay1lbnRlcj1cImV2YWxUYWJPcC50b2dnbGVQbHVnaW4oKVwiIG5nLW1vZGVsPVwiZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybFwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC50b2dnbGVQbHVnaW4oKVwiPkFkZCBQbHVnaW4gZnJvbSBVUkw8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctc2hvdz1cImV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBlcnJvci10aXRsZSBib2R5LWJveCBia3JcIj5cXG4gICAgICAgIDxwIGNsYXNzPVwiYmtyXCI+QXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvYWQgdGhpcyBwbHVnaW4gZnJvbSBhbiBleHRlcm5hbCBVUkw/PC9wPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCByaWdodCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gZmFsc2U7IGV2YWxUYWJPcC5zaG93VVJMPWZhbHNlOyBldmFsVGFiT3AubmV3UGx1Z2luTmFtZU9yVXJsPSZxdW90OyZxdW90O1wiPkNhbmNlbDwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCByaWdodCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gZmFsc2U7IGV2YWxUYWJPcC5mb3JjZUxvYWQgPSB0cnVlOyBldmFsVGFiT3AudG9nZ2xlUGx1Z2luKClcIj5PSzwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxwIGNsYXNzPVwiYmtyXCI+PGJyIGNsYXNzPVwiYmtyXCI+PC9wPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBuZy1zaG93PVwiZXZhbFRhYk9wLnNob3dXYXJuaW5nXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBlcnJvci10aXRsZSBib2R5LWJveCBia3JcIj5cXG4gICAgICAgIDxwIGNsYXNzPVwiYmtyXCI+Q2Fubm90IHJlbW92ZSBwbHVnaW4gY3VycmVudGx5IHVzZWQgYnkgYSBjb2RlIGNlbGwgaW4gdGhlIG5vdGVib29rLjxiciBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgRGVsZXRlIHRob3NlIGNlbGxzIGFuZCB0cnkgYWdhaW4uPC9wPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCByaWdodCBia3JcIiBuZy1jbGljaz1cImV2YWxUYWJPcC5zaG93V2FybmluZyA9IGZhbHNlXCI+T0s8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8cCBjbGFzcz1cImJrclwiPjxiciBjbGFzcz1cImJrclwiPjwvcD5cXG4gICAgPC9kaXY+XFxuICAgIDx0YWJzZXQgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8dGFiIG5nLXJlcGVhdD1cIihldmFsdWF0b3JOYW1lLCBldmFsdWF0b3IpIGluIGV2YWxUYWJPcC5nZXRFdmFsdWF0b3JzV2l0aFNwZWMoKVwiIGhlYWRpbmc9XCJ7e2V2YWx1YXRvck5hbWV9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YmstcGx1Z2luLW1hbmFnZXItZXZhbHVhdG9yLXNldHRpbmdzIGNsYXNzPVwiYmtyXCI+PC9iay1wbHVnaW4tbWFuYWdlci1ldmFsdWF0b3Itc2V0dGluZ3M+XFxuICAgICAgPC90YWI+XFxuICAgIDwvdGFic2V0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZpeGVkIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiA2OHB4XCI+IFxcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGxhbmd1YWdlLW1hbmFnZXItY2xvc2UtYnV0dG9uIGJrclwiIG5nLWNsaWNrPVwiZG9DbG9zZSgpXCI+Q2xvc2U8L2J1dHRvbj5cXG4gIDwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL3BsdWdpbm1hbmFnZXIvcGx1Z2lubWFuYWdlcl9ldmFsdWF0b3Jfc2V0dGluZ3NcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxkaXYgbmctcmVwZWF0PVwicHJvcGVydHkgaW4gcHJvcGVydGllc1wiIGNsYXNzPVwiZm9ybS1ncm91cCBsYW5ndWFnZS1vcHRpb24gcHJvcGVydHkgY2xlYXJmaXggYmtyXCI+XFxuICA8bGFiZWwgY2xhc3M9XCJia3JcIj57eyBwcm9wZXJ0eS5uYW1lIH19PC9sYWJlbD5cXG4gIDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbCBia3JcIiBuZy1tb2RlbD1cImV2YWx1YXRvci5zZXR0aW5nc1twcm9wZXJ0eS5rZXldXCI+PC90ZXh0YXJlYT5cXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBzZXQgYmtyXCIgbmctY2xpY2s9XCJzZXQocHJvcGVydHkua2V5KVwiPlNldDwvYnV0dG9uPlxcbjwvZGl2PlxcbjxkaXYgbmctcmVwZWF0PVwiYWN0aW9uIGluIGFjdGlvbnNcIiBjbGFzcz1cImFjdGlvbiBsYW5ndWFnZS1vcHRpb24gY2xlYXJmaXggYmtyXCI+XFxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJrclwiIG5nLWNsaWNrPVwiZXZhbHVhdG9yLnBlcmZvcm0oYWN0aW9uLmtleSlcIj57eyBhY3Rpb24ubmFtZSB9fTwvYnV0dG9uPlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctY2xhc3M9XCJpc0xvY2tlZCgpICZhbXA7JmFtcDsgXFwnbG9ja2VkXFwnXCIgY2xhc3M9XCJia2NlbGwge3tjZWxsbW9kZWwudHlwZX19IGJrclwiPlxcbiAgPGRpdiBuZy1pZj1cImNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gJmFtcDsmYW1wOyBjZWxsbW9kZWwudHlwZT09XFwnY29kZVxcJyAmYW1wOyZhbXA7ICFpc0xvY2tlZCgpXCIgY2xhc3M9XCJtaW5pLWNlbGwtc3RhdHMgYWR2YW5jZWQtaGlkZSBia3JcIj5cXG4gICAge3tjZWxsbW9kZWwuZXZhbHVhdG9yfX0gJm5ic3A7XFxuICAgICh7e2NlbGxtb2RlbC5saW5lQ291bnR9fSBsaW5lcylcXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cInRvZ2dsZS1tZW51IGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gZHJvcGRvd24tcHJvbW90ZWQgYmtyXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNlbGwtbWVudS1pdGVtIGNlbGwtZHJvcGRvd24gZHJvcGRvd24tdG9nZ2xlIGJrclwiIHRpdGxlPVwiY2VsbCBtZW51XCI+PC9kaXY+XFxuICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cImNlbGx2aWV3Lm1lbnUuaXRlbXNcIiBzdWJtZW51LWNsYXNzZXM9XCJkcm9wLWxlZnRcIiBjbGFzcz1cImJrclwiPjwvYmstZHJvcGRvd24tbWVudT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBtb3ZlLWNlbGwtZG93biBia3JcIiBuZy1jbGljaz1cIm1vdmVDZWxsRG93bigpXCIgbmctY2xhc3M9XCJtb3ZlQ2VsbERvd25EaXNhYmxlZCgpICZhbXA7JmFtcDsgXFwnZGlzYWJsZWRcXCdcIiB0aXRsZT1cIm1vdmUgY2VsbCBkb3duXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBtb3ZlLWNlbGwtdXAgYmtyXCIgbmctY2xpY2s9XCJtb3ZlQ2VsbFVwKClcIiBuZy1jbGFzcz1cIm1vdmVDZWxsVXBEaXNhYmxlZCgpICZhbXA7JmFtcDsgXFwnZGlzYWJsZWRcXCdcIiB0aXRsZT1cIm1vdmUgY2VsbCB1cFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1tZW51LWl0ZW0gZGVsZXRlLWNlbGwgYmtyXCIgbmctY2xpY2s9XCJkZWxldGVDZWxsKClcIiB0aXRsZT1cImRlbGV0ZSBjZWxsXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBleHBhbmQtY29udHJhY3QgYmtyXCIgbmctaWY9XCJjZWxsbW9kZWwudHlwZT09XFwnY29kZVxcJ1wiIG5nLWNsaWNrPVwidG9nZ2xlQ2VsbElucHV0KClcIiBuZy1jbGFzcz1cImNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gJmFtcDsmYW1wOyBcXCdjb2xsYXBzZWRcXCdcIiB0aXRsZT1cImhpZGUvc2hvdyBjZWxsIGlucHV0XCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi1wcm9tb3RlZCBhZHZhbmNlZC1vbmx5IGJrclwiIG5nLWlmPVwiaXNDb2RlQ2VsbCgpXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cXG4gICAgICA8YmstY29kZS1jZWxsLWlucHV0LW1lbnUgY2xhc3M9XCJia3JcIj48L2JrLWNvZGUtY2VsbC1pbnB1dC1tZW51PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNlbGwtbWVudS1pdGVtIGV2YWx1YXRlIGJrclwiIG5nLWNsaWNrPVwiZXZhbHVhdGUoJGV2ZW50KVwiIG5nLWlmPVwiaXNDb2RlQ2VsbCgpXCIgdGl0bGU9XCJydW4gY2VsbFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1zdGF0dXMtaXRlbSBsb2FkaW5nLXN0YXRlIGFkdmFuY2VkLWhpZGUgYmtyXCIgbmctaWY9XCJjZWxsbW9kZWwudHlwZT09XFwnY29kZVxcJyAmYW1wOyZhbXA7ICFjZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyXCI+SW5pdGlhbGl6aW5nIHt7Y2VsbG1vZGVsLmV2YWx1YXRvcn19XFxuICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctc3Bpbm5lciByb3RhdGluZyBia3JcIj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJpc0RlYnVnZ2luZygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgW0RlYnVnXTogY2VsbCBJZCA9IHt7Y2VsbG1vZGVsLmlkfX0sIHBhcmVudCA9IHt7Z2V0UGFyZW50SWQoKX19LCBsZXZlbCA9IHt7Y2VsbG1vZGVsLmxldmVsfX1cXG4gICAgPGEgbmctY2xpY2s9XCJ0b2dnbGVTaG93RGVidWdJbmZvKClcIiBuZy1oaWRlPVwiaXNTaG93RGVidWdJbmZvKClcIiBjbGFzcz1cImJrclwiPnNob3cgbW9yZTwvYT5cXG4gICAgPGEgbmctY2xpY2s9XCJ0b2dnbGVTaG93RGVidWdJbmZvKClcIiBuZy1zaG93PVwiaXNTaG93RGVidWdJbmZvKClcIiBjbGFzcz1cImJrclwiPnNob3cgbGVzczwvYT5cXG4gICAgPGRpdiBjb2xsYXBzZT1cIiFpc1Nob3dEZWJ1Z0luZm8oKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgPHByZSBjbGFzcz1cImJrclwiPnt7Y2VsbG1vZGVsIHwganNvbn19PC9wcmU+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLWluY2x1ZGU9XCJnZXRUeXBlQ2VsbFVybCgpXCIgY2xhc3M9XCJia3JcIj48L2Rpdj5cXG4gIDxiay1uZXctY2VsbC1tZW51IGNvbmZpZz1cIm5ld0NlbGxNZW51Q29uZmlnXCIgbmctY2xhc3M9XCJpc0xhcmdlICZhbXA7JmFtcDsgXFwnbGFyZ2VcXCdcIiBpcy1sYXJnZT1cImlzTGFyZ2VcIiBuZy1pZj1cIm5ld0NlbGxNZW51Q29uZmlnLmlzU2hvdygpXCIgY2xhc3M9XCJia3JcIj48L2JrLW5ldy1jZWxsLW1lbnU+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxkaXYgY2xhc3M9XCJldmFsdWF0b3IgYmtyXCIgZXZhbHVhdG9yLXR5cGU9XCJ7eyBjZWxsbW9kZWwuZXZhbHVhdG9yIH19XCIgbmctY2xhc3M9XCJ7XFxuICBcXCdldmFsdWF0b3ItcmVhZHlcXCc6IGNlbGxtb2RlbC5ldmFsdWF0b3JSZWFkZXIsXFxuICBcXCdsb2NrZWRcXCc6IGlzTG9ja2VkKCksXFxuICBcXCdlbXB0eVxcJzogaXNFbXB0eSgpXFxuICB9XCI+XFxuXFxuICA8cCBjbGFzcz1cImRlcHRoLWluZGljYXRvciBia3JcIj57e2dldEZ1bGxJbmRleCgpfX08L3A+XFxuICA8ZGl2IGNsYXNzPVwiYmtjZWxsIGNvZGUtY2VsbC1hcmVhIGJrclwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29kZS1jZWxsLWlucHV0IGJrclwiIG5nLWNsaWNrPVwiYmFja2dyb3VuZENsaWNrKCRldmVudClcIiBuZy1oaWRlPVwiaXNMb2NrZWQoKVwiIG5nLWNsYXNzPVwie1xcJ2lucHV0LWhpZGRlblxcJzogY2VsbG1vZGVsLmlucHV0LmhpZGRlbn1cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29kZS1jZWxsLWlucHV0LWNvbnRlbnQgYmtyXCI+XFxuICAgICAgICA8YmstY29kZS1jZWxsLWlucHV0LW1lbnUgY2xhc3M9XCJhZHZhbmNlZC1oaWRlIGJrclwiPjwvYmstY29kZS1jZWxsLWlucHV0LW1lbnU+XFxuICAgICAgICA8ZGl2IG5nLWNsaWNrPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiYmtjZWxsdGV4dGFyZWEgYmtyXCIgbmctbW9kZWw9XCJjZWxsbW9kZWwuaW5wdXQuYm9keVwiPjwvdGV4dGFyZWE+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZXZhbHVhdGUtc2NyaXB0IGFkdmFuY2VkLWhpZGUgYmtyXCIgbmctY2xpY2s9XCJldmFsdWF0ZSgkZXZlbnQpXCIgZWF0LWNsaWNrPVwiXCI+XFxuICAgICAgICAgIHt7IGlzSm9iQ2FuY2VsbGFibGUoKSA/IFxcJ1N0b3BcXCcgOiBcXCdSdW5cXCcgfX1cXG4gICAgICAgIDwvYT5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctaWY9XCJoYXNPdXRwdXQoKVwiIGNsYXNzPVwiY29kZS1jZWxsLW91dHB1dCBia3JcIiBuZy1jbGFzcz1cIntcXG4gICAgICBcXCduby1vdXRwdXRcXCc6IGlzSGlkZGVuT3V0cHV0KCksXFxuICAgICAgXFwnaW5wdXQtaGlkZGVuXFwnOiBjZWxsbW9kZWwuaW5wdXQuaGlkZGVuLFxcbiAgICAgIFxcJ291dHB1dC1oaWRkZW5cXCc6IGNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuLFxcbiAgICAgIFxcJ2Vycm9yXFwnOiBpc0Vycm9yKClcXG4gICAgICB9XCI+XFxuICAgICAgPGg2IG5nLWlmPVwib3V0cHV0VGl0bGUoKVwiIGNsYXNzPVwiYmtyXCI+e3tvdXRwdXRUaXRsZSgpfX08L2g2PlxcbiAgICAgIDxiay1jb2RlLWNlbGwtb3V0cHV0IG1vZGVsPVwiY2VsbG1vZGVsLm91dHB1dFwiIGV2YWx1YXRvci1pZD1cInt7IGNlbGxtb2RlbC5ldmFsdWF0b3IgfX1cIiBjZWxsLWlkPVwie3sgY2VsbG1vZGVsLmlkIH19XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8L2JrLWNvZGUtY2VsbC1vdXRwdXQ+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svY29kZWNlbGxpbnB1dG1lbnVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgY2xhc3M9XCJkcm9wZG93biBiay1jb2RlLWNlbGwtaW5wdXQgYmtyXCI+XFxuICA8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBjZWxsLWV2YWx1YXRvci1tZW51IGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj5cXG4gICAgPGJrLWxhbmd1YWdlLWxvZ28gbmFtZT1cInt7Z2V0RXZhbHVhdG9yKCkuc2hvcnROYW1lfX1cIiBiZy1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yKCkuYmdDb2xvcn19XCIgZmctY29sb3I9XCJ7e2dldEV2YWx1YXRvcigpLmZnQ29sb3J9fVwiIGJvcmRlci1jb2xvcj1cInt7Z2V0RXZhbHVhdG9yKCkuYm9yZGVyQ29sb3J9fVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgIDwvYmstbGFuZ3VhZ2UtbG9nbz5cXG4gICAgPGIgY2xhc3M9XCJhZHZhbmNlZC1oaWRlIGJrclwiPnt7Y2VsbG1vZGVsLmV2YWx1YXRvcn19PC9iPlxcbiAgPC9hPlxcbiAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBpbnB1dGNlbGxtZW51IGJrclwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICAgIDxsaSBuZy1yZXBlYXQ9XCIoZXZhbHVhdG9yTmFtZSwgZXZhbHVhdG9yKSBpbiBnZXRFdmFsdWF0b3JzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgIDxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwic2V0RXZhbHVhdG9yKGV2YWx1YXRvck5hbWUpXCIgY2xhc3M9XCJ7e2V2YWx1YXRvck5hbWV9fS1tZW51aXRlbSBia3JcIiBlYXQtY2xpY2s9XCJcIj5cXG4gICAgICAgIHt7ZXZhbHVhdG9yTmFtZX19XFxuICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrIGJrclwiIG5nLXNob3c9XCJnZXRTaG93RXZhbEljb24oZXZhbHVhdG9yTmFtZSlcIj48L2k+XFxuICAgICAgPC9hPlxcbiAgICA8L2xpPlxcbiAgPC91bD5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbG91dHB1dFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cInRvZ2dsZS1tZW51IGJrclwiPlxcbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXByb21vdGVkIGJrclwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBjZWxsLWRyb3Bkb3duIGRyb3Bkb3duLXRvZ2dsZSBia3JcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgdGl0bGU9XCJjZWxsIG91dHB1dCBtZW51XCIgbmctc2hvdz1cImlzU2hvd01lbnUoKVwiPjwvZGl2PlxcbiAgICA8YmstY29kZS1jZWxsLW91dHB1dC1tZW51IG1vZGVsPVwib3V0cHV0Q2VsbE1lbnVNb2RlbFwiIGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtb3V0cHV0LW1lbnU+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjZWxsLW1lbnUtaXRlbSBleHBhbmQtY29udHJhY3QgYmtyXCIgbmctY2xpY2s9XCJ0b2dnbGVFeHBhbnNpb24oKVwiIG5nLWNsYXNzPVwiIWlzRXhwYW5kZWQoKSAmYW1wOyZhbXA7IFxcJ2NvbGxhcHNlZFxcJ1wiIHRpdGxlPVwiaGlkZS9zaG93IGNlbGwgb3V0cHV0XCIgbmctc2hvdz1cImlzU2hvd01lbnUoKVwiPjwvZGl2PlxcbjwvZGl2Plxcbjxiay1vdXRwdXQtZGlzcGxheSBuZy1zaG93PVwiaXNTaG93T3V0cHV0KClcIiBtb2RlbD1cIm91dHB1dERpc3BsYXlNb2RlbFwiIHR5cGU9XCJ7eyBnZXRPdXRwdXREaXNwbGF5VHlwZSgpIH19XCIgY2xhc3M9XCJia3JcIj5cXG48L2JrLW91dHB1dC1kaXNwbGF5Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsb3V0cHV0bWVudVwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LWZvcm0gYmtyXCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj5cXG4gIDxsaSBjbGFzcz1cImRyb3Bkb3duLXN1Ym1lbnUgZHJvcC1sZWZ0IGJrclwiPlxcbiAgICA8YSB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJia3JcIj5EaXNwbGF5cyAoe3ttb2RlbC5nZXRTZWxlY3RlZERpc3BsYXkoKX19KTwvYT5cXG4gICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIj5cXG4gICAgICA8bGkgbmctcmVwZWF0PVwiZCBpbiBtb2RlbC5nZXRBcHBsaWNhYmxlRGlzcGxheXMoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICA8YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cIm1vZGVsLnNldFNlbGVjdGVkRGlzcGxheShkKVwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1vayBia3JcIiBuZy1zaG93PVwiZCA9PT0gbW9kZWwuZ2V0U2VsZWN0ZWREaXNwbGF5KClcIj48L2k+e3sgZCB9fVxcbiAgICAgICAgPC9hPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2xpPlxcbiAgPGxpIG5nLXJlcGVhdD1cIml0ZW0gaW4gbW9kZWwuZ2V0QWRkaXRpb25hbE1lbnVJdGVtcygpXCIgY2xhc3M9XCJ7e2dldEl0ZW1DbGFzcyhpdGVtKX19IGJrclwiPlxcbiAgICA8YSB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJpdGVtLmFjdGlvbigpXCIgY2xhc3M9XCJia3JcIj57e2dldEl0ZW1OYW1lKGl0ZW0pfX08L2E+XFxuICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgYmtyXCI+XFxuICAgICAgPGxpIG5nLXJlcGVhdD1cInN1Yml0ZW0gaW4gZ2V0U3ViSXRlbXMoaXRlbSlcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgPGEgbmctY2xpY2s9XCJzdWJpdGVtLmFjdGlvbigpXCIgY2xhc3M9XCJ7e2dldFN1Ym1lbnVJdGVtQ2xhc3Moc3ViaXRlbSl9fSBia3JcIiB0aXRsZT1cInt7c3ViaXRlbS50b29sdGlwfX1cIj57e3N1Yml0ZW0ubmFtZX19PC9hPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2xpPlxcbjwvdWw+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbWFya2Rvd24tZWRpdGFibGVcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctc2hvdz1cIm1vZGU9PVxcJ2VkaXRcXCdcIiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGNsYXNzPVwiY29kZW1pcnJvci13cmFwcGVyIGJrclwiPlxcbiAgPHRleHRhcmVhIGNsYXNzPVwiYmtyXCI+PC90ZXh0YXJlYT5cXG48L2Rpdj5cXG48ZGl2IG5nLWNsaWNrPVwiZWRpdCgkZXZlbnQpXCIgY2xhc3M9XCJtYXJrdXAgYmtyXCIgbmctc2hvdz1cIm1vZGU9PVxcJ3ByZXZpZXdcXCdcIj48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9tYXJrZG93bmNlbGxcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcblxcbjxwIGNsYXNzPVwiZGVwdGgtaW5kaWNhdG9yIGJrclwiPnt7Z2V0RnVsbEluZGV4KCl9fTwvcD5cXG48YmstbWFya2Rvd24tZWRpdGFibGUgY2VsbG1vZGVsPVwiY2VsbG1vZGVsXCIgY2xhc3M9XCJia3JcIj48L2JrLW1hcmtkb3duLWVkaXRhYmxlPic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL25ld2NlbGxtZW51XCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG5ldy1jZWxsIGJrclwiPlxcbiAgPGJ1dHRvbiBuZy1jbGljaz1cIm5ld0NvZGVDZWxsKGRlZmF1bHRFdmFsdWF0b3IoKSlcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBpbnNlcnQtY2VsbCBia3JcIiBuZy1jbGFzcz1cIiFpc0xhcmdlICZhbXA7JmFtcDsgXFwnYnRuLXhzXFwnXCI+XFxuICAgIDxzcGFuIG5nLWNsYXNzPVwiIWlzTGFyZ2UgJmFtcDsmYW1wOyBcXCdhZHZhbmNlZC1oaWRlXFwnXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICBJbnNlcnQge3tkZWZhdWx0RXZhbHVhdG9yKCl9fSBDZWxsXFxuICAgIDwvc3Bhbj5cXG4gICAgPHNwYW4gbmctaWY9XCIhaXNMYXJnZVwiIGNsYXNzPVwicGx1cyBhZHZhbmNlZC1vbmx5IGJrclwiPis8L3NwYW4+XFxuICA8L2J1dHRvbj5cXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgZHJvcGRvd24tdG9nZ2xlIGJrclwiIG5nLWNsYXNzPVwiIWlzTGFyZ2UgJmFtcDsmYW1wOyBcXCdidG4teHNcXCdcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtc29ydC1kb3duIGJrclwiPjwvaT5cXG4gIDwvYnV0dG9uPlxcbiAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiPlxcbiAgICA8bGkgY2xhc3M9XCJkcm9wZG93bi1zdWJtZW51IGJrclwiPlxcbiAgICAgIDxhIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImJrclwiPkNvZGUgY2VsbDwvYT5cXG4gICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGJrclwiPlxcbiAgICAgICAgPGxpIG5nLXJlcGVhdD1cIihrZXksIHZhbHVlKSBpbiBnZXRFdmFsdWF0b3JzKClcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8YSBuZy1jbGljaz1cIm5ld0NvZGVDZWxsKGtleSlcIiBjbGFzcz1cImJrclwiPnt7a2V5fX08L2E+XFxuICAgICAgICA8L2xpPlxcbiAgICAgICAgPGxpIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICA8YSBuZy1jbGljaz1cInNob3dQbHVnaW5NYW5hZ2VyKClcIiBjbGFzcz1cImJrclwiPk90aGVyIGxhbmd1YWdlcy4uLjwvYT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9saT5cXG4gICAgPGxpIGNsYXNzPVwiZHJvcGRvd24tc3VibWVudSBia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJia3JcIj5TZWN0aW9uIGNlbGw8L2E+XFxuICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIj5cXG4gICAgICAgIDxsaSBuZy1yZXBlYXQ9XCJsZXZlbCBpbiBnZXRMZXZlbHMoKVwiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgIDxhIG5nLWNsaWNrPVwibmV3U2VjdGlvbkNlbGwobGV2ZWwpXCIgY2xhc3M9XCJia3JcIj5Ie3tsZXZlbH19PC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2xpPlxcbiAgICA8bGkgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8YSB0YWJpbmRleD1cIi0xXCIgbmctY2xpY2s9XCJuZXdNYXJrZG93bkNlbGwoKVwiIGNsYXNzPVwiYmtyXCI+TWFya2Rvd24gY2VsbDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuPC9kaXY+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7XG4oZnVuY3Rpb24oKSB7KHdpbmRvd1tcIkpTVFwiXSA9IHdpbmRvd1tcIkpTVFwiXSB8fCB7fSlbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbm90ZWJvb2tcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctY2xhc3M9XCJ7XFwnYWR2YW5jZWQtbW9kZVxcJzogaXNBZHZhbmNlZE1vZGUoKSwgXFwnaGllcmFyY2h5LW1vZGVcXCc6IGlzSGllcmFyY2h5RW5hYmxlZCgpfVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstbmV3LWNlbGwtbWVudSBuZy1zaG93PVwiIWlzTG9ja2VkKCkgJmFtcDsmYW1wOyAhaXNMb2FkaW5nXCIgbmctY2xhc3M9XCJpc0VtcHR5KCkgJmFtcDsmYW1wOyBcXCdvbmx5LWNoaWxkIGxhcmdlXFwnXCIgaXMtbGFyZ2U9XCJpc0VtcHR5KClcIiBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIGNsYXNzPVwiYmtyXCI+PC9iay1uZXctY2VsbC1tZW51PlxcbiAgPGRpdiBjbGFzcz1cImJrY2VsbCBia3JcIj5cXG4gICAgPGJrLWNlbGwgbmctcmVwZWF0PVwiY2VsbCBpbiBnZXRDaGlsZHJlbigpXCIgY2VsbG1vZGVsPVwiY2VsbFwiIGluZGV4PVwiJGluZGV4XCIgY2VsbGlkPVwie3tjZWxsLmlkfX1cIiBjbGFzcz1cImJrclwiPlxcbiAgICA8L2JrLWNlbGw+XFxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93biBia2NlbGxtZW51IGJrclwiIHN0eWxlPVwicG9zaXRpb246IGZpeGVkOyB6LWluZGV4OiA5OVwiPlxcbiAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlIGJrclwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj48L2E+XFxuICAgICAgPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cIm1lbnVJdGVtc1wiIHN1Ym1lbnUtY2xhc3Nlcz1cInB1bGwtbGVmdFwiIGNsYXNzPVwiYmtyXCI+PC9iay1kcm9wZG93bi1tZW51PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1zaG93PVwiaXNTaG93aW5nT3V0cHV0KClcIiBjbGFzcz1cIm91dHB1dGxvZ2JveCBia3JcIj48L2Rpdj5cXG4gIDxkaXYgbmctc2hvdz1cImlzU2hvd2luZ091dHB1dCgpXCIgY2xhc3M9XCJvdXRwdXRsb2djb250YWluZXIgYmtyXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJvdXRwdXRsb2doYW5kbGUgYmtyXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJidG4tdG9vbGJhciBia3JcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIGFsdC1jb250cm9scyBia3JcIj5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBia3JcIiBuZy1jbGljaz1cImNsZWFyT3V0cHV0KClcIj5DbGVhcjwvYT5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBoaWRlLW91dHB1dCBia3JcIiBuZy1jbGljaz1cImhpZGVPdXRwdXQoKVwiPkhpZGU8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBia3JcIiBkYXRhLXRvZ2dsZT1cImJ1dHRvbnMtY2hlY2tib3hcIj5cXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJrclwiIG5nLWNsYXNzPVwic2hvd1N0ZE91dCA/IFxcJ2J0bi1wcmltYXJ5XFwnIDogXFwnYnRuLWRlZmF1bHRcXCdcIiBuZy1jbGljaz1cInRvZ2dsZVN0ZE91dCgkZXZlbnQpXCI+c3Rkb3V0PC9hPlxcbiAgICAgICAgPGEgY2xhc3M9XCJidG4gYmtyXCIgbmctY2xhc3M9XCJzaG93U3RkRXJyID8gXFwnYnRuLXByaW1hcnlcXCcgOiBcXCdidG4tZGVmYXVsdFxcJ1wiIG5nLWNsaWNrPVwidG9nZ2xlU3RkRXJyKCRldmVudClcIj5zdGRlcnI8L2E+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nb3V0IGJrclwiIG5nLXNob3c9XCJzaG93U3RkT3V0XCIgbmctY2xhc3M9XCIhc2hvd1N0ZEVyciAmYW1wOyZhbXA7IFxcJ3NpbmdsZVxcJ1wiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cIm91dHB1dC1sYWJlbCBia3JcIj5zdGRvdXQ6PC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nYm94IG91dHB1dGxvZ3N0ZG91dCBia3JcIj5cXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVwibGluZSBpbiBvdXRwdXRMb2cgdHJhY2sgYnkgJGluZGV4XCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgPGRpdiBuZy1zaG93PVwibGluZS50eXBlID09IFxcJ3RleHRcXCcgfHwgbGluZS50eXBlID09IFxcJ3N0ZG91dFxcJ1wiIGNsYXNzPVwiYmtyXCI+XFxuICAgICAgICAgICAgPHByZSBjbGFzcz1cInByZWxvZyBia3JcIj57e2xpbmUubGluZX19PC9wcmU+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nZXJyIGJrclwiIG5nLXNob3c9XCJzaG93U3RkRXJyXCIgbmctY2xhc3M9XCIhc2hvd1N0ZE91dCAmYW1wOyZhbXA7IFxcJ3NpbmdsZVxcJ1wiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cIm91dHB1dC1sYWJlbCBia3JcIj5zdGRlcnI6PC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVwib3V0cHV0bG9nYm94IGJrclwiPlxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XCJsaW5lIGluIG91dHB1dExvZyB0cmFjayBieSAkaW5kZXhcIiBjbGFzcz1cImJrclwiPlxcbiAgICAgICAgICA8ZGl2IG5nLXNob3c9XCJsaW5lLnR5cGUgPT0gXFwnc3RkZXJyXFwnXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICAgICAgICA8cHJlIGNsYXNzPVwicHJlbG9nIGJrclwiPnt7bGluZS5saW5lfX08L3ByZT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJpc0RlYnVnZ2luZygpXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgPGJ1dHRvbiBuZy1jbGljaz1cInNob3dEZWJ1Z1RyZWUgPSAhc2hvd0RlYnVnVHJlZVwiIGNsYXNzPVwiYmtyXCI+VG9nZ2xlIGRlYnVnIFRyZWU8L2J1dHRvbj5cXG4gICAgPGRpdiBjb2xsYXBzZT1cIiFzaG93RGVidWdUcmVlXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgICA8cHJlIGNsYXNzPVwiYmtyXCI+e3tnZXROb3RlYm9va01vZGVsKCkgfCBqc29ufX08L3ByZT5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9vdXRwdXQtcHJvZ3Jlc3NcIl0gPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJ1xcbjxkaXYgbmctaWY9XCJlbGFwc2VkID4gMjAwXCIgY2xhc3M9XCJyb3cgYmtyXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTIgYmtyXCI+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jb2cgZmEtc3BpbiBmYS1sZyBia3JcIj48L2k+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJia3JcIj4gJm5ic3A7IEVsYXBzZWQ6IHt7Z2V0RWxhcHNlZFRpbWUoKX19ICZuYnNwOyA8L3NwYW4+XFxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lcy1jaXJjbGUgZmEtbGcgdGV4dC1kYW5nZXIgY3Vyc29yX2hhbmQgYmtyXCIgbmctY2xpY2s9XCJjYW5jZWwoKVwiIG5nLWlmPVwiaXNDYW5jZWxsYWJsZSgpXCIgdGl0bGU9XCJjYW5jZWxcIj48L2k+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tMiBia3JcIiBuZy1pZj1cImhhc1Byb2dyZXNzQmFyKClcIj5cXG5cXHQgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBia3JcIj5cXG5cXHRcXHQgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgYmtyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cInt7Z2V0UHJvZ3Jlc3NCYXIoKX19XCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDoge3tnZXRQcm9ncmVzc0JhcigpfX0lXCI+XFxuXFx0XFx0ICAgIHt7Z2V0UHJvZ3Jlc3NCYXIoKX19ICVcXG5cXHRcXHQgIDwvZGl2PlxcblxcdCAgPC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCJoYXNNZXNzYWdlKClcIiBjbGFzcz1cImNvbC1zbS04IGJrclwiPiB7e2dldE1lc3NhZ2UoKX19PC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBuZy1pZj1cImhhc1BheWxvYWQoKSB8fCBoYXNPdXRwdXREYXRhKClcIiBjbGFzcz1cImJrclwiPlxcbiAgPGhyIGNsYXNzPVwiYmtyXCI+XFxuICA8YmstY29kZS1jZWxsLW91dHB1dCBtb2RlbD1cIm91dHB1dERpc3BsYXlNb2RlbFwiIGNsYXNzPVwiYmtyXCI+PC9iay1jb2RlLWNlbGwtb3V0cHV0PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wibWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL291dHB1dC1yZXN1bHRzXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48dWwgbmctaWY9XCJoYXNPdXRwdXREYXRhKClcIiBjbGFzcz1cImxpc3QtdW5zdHlsZWQgYmtyXCI+XFxuICA8bGkgbmctcmVwZWF0PVwiaSBpbiBvdXRwdXRkYXRhXCIgY2xhc3M9XCJia3JcIj5cXG4gICAgPHByZSBuZy1jbGFzcz1cImkudHlwZSA9PT0gJnF1b3Q7b3V0JnF1b3Q7ID8gJnF1b3Q7dGV4dC1pbmZvJnF1b3Q7IDogJnF1b3Q7dGV4dC13YXJuaW5nJnF1b3Q7XCIgY2xhc3M9XCJia3JcIj57eyBpLnZhbHVlIH19PC9wcmU+XFxuICA8L2xpPlxcbjwvdWw+XFxuPGJrLWNvZGUtY2VsbC1vdXRwdXQgbmctaWY9XCJoYXNQYXlsb2FkKClcIiBtb2RlbD1cInBheWxvYWRcIiBjbGFzcz1cImJrclwiPjwvYmstY29kZS1jZWxsLW91dHB1dD4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9zZWN0aW9uY2VsbFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBuZy1oaWRlPVwiY2VsbG1vZGVsLmhpZGVUaXRsZVwiIGNsYXNzPVwiYmtyXCI+XFxuICA8c3BhbiBjbGFzcz1cImJrc2VjdGlvbnRvZ2dsZXBsdXMgc2VjdGlvbi10b2dnbGUgYmtyXCIgbmctY2xpY2s9XCJ0b2dnbGVTaG93Q2hpbGRyZW4oKVwiIG5nLWhpZGU9XCJpc1Nob3dDaGlsZHJlbigpXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtcGx1cyBia3JcIj48L2k+XFxuICA8L3NwYW4+XFxuICA8c3BhbiBjbGFzcz1cImJrc2VjdGlvbnRvZ2dsZW1pbnVzIHNlY3Rpb24tdG9nZ2xlIGJrclwiIG5nLWNsaWNrPVwidG9nZ2xlU2hvd0NoaWxkcmVuKClcIiBuZy1zaG93PVwiaXNTaG93Q2hpbGRyZW4oKVwiPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLW1pbnVzIGJrclwiPjwvaT5cXG4gIDwvc3Bhbj5cXG4gIDxwIGNsYXNzPVwiZGVwdGgtaW5kaWNhdG9yIGJrclwiPnt7Z2V0RnVsbEluZGV4KCl9fTwvcD5cXG4gIDxiay1tYXJrZG93bi1lZGl0YWJsZSBjbGFzcz1cInNlY3Rpb257e2NlbGxtb2RlbC5sZXZlbH19IGJrLXNlY3Rpb24tdGl0bGUgYmtyXCIgY2VsbG1vZGVsPVwiY2VsbG1vZGVsXCI+PC9iay1tYXJrZG93bi1lZGl0YWJsZT5cXG48L2Rpdj5cXG48YmstbmV3LWNlbGwtbWVudSBzaXplPVwieHNcIiBjb25maWc9XCJuZXdDZWxsTWVudUNvbmZpZ1wiIG5nLWlmPVwibmV3Q2VsbE1lbnVDb25maWcuaXNTaG93KClcIiBjbGFzcz1cImJrclwiPjwvYmstbmV3LWNlbGwtbWVudT5cXG48ZGl2IG5nLXNob3c9XCJpc1Nob3dDaGlsZHJlbigpXCIgY2xhc3M9XCJzZWN0aW9uLWNoaWxkcmVuIGJrclwiPlxcbiAgPGJrLWNlbGwgbmctcmVwZWF0PVwiY2VsbCBpbiBnZXRDaGlsZHJlbigpXCIgY2VsbG1vZGVsPVwiY2VsbFwiIGluZGV4PVwiJGluZGV4XCIgY2VsbGlkPVwie3tjZWxsLmlkfX1cIiBjbGFzcz1cImJrclwiPjwvYmstY2VsbD5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay90ZXh0Y2VsbFwiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuXFxuPHAgY2xhc3M9XCJkZXB0aC1pbmRpY2F0b3IgYmtyXCI+e3tnZXRGdWxsSW5kZXgoKX19PC9wPlxcbjxkaXYgY2xhc3M9XCJ0ZXh0Y2VsbC13cmFwcGVyIGJrclwiIG5nLWNsaWNrPVwiZWRpdCgpXCI+XFxuICA8ZGl2IGNsYXNzPVwiZWRpdGFibGUtdGV4dCBia3JcIiBjb250ZW50ZWRpdGFibGU9XCJ7eyBpc0VkaXRhYmxlKCkgPyB0cnVlIDogZmFsc2UgfX1cIiBzdHlsZT1cIm1pbi1oZWlnaHQ6IDE0cHg7IG1pbi13aWR0aDogMTRweFwiPjwvZGl2PlxcbjwvZGl2Pic7XG5cbn1cbnJldHVybiBfX3Bcbn19KSgpO1xuKGZ1bmN0aW9uKCkgeyh3aW5kb3dbXCJKU1RcIl0gPSB3aW5kb3dbXCJKU1RcIl0gfHwge30pW1wiYmtvLXRhYmxlZGlzcGxheS9vdXRwdXQtdGFibGUtb3B0aW9uc1wiXSA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG53aXRoIChvYmopIHtcbl9fcCArPSAnXFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBmaXhlZCBia3JcIiBzdHlsZT1cImhlaWdodDogNjlweFwiPlxcbiAgPGgxIGNsYXNzPVwiYmtyXCI+VGFibGUgT3B0aW9uczwvaDE+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgZml4ZWQgbW9kYWwtbGFyZ2UgYmtyXCIgc3R5bGU9XCJwYWRkaW5nLXRvcDogNjlweDsgcGFkZGluZy1ib3R0b206IDY4cHhcIj5cXG5cXG4gPHRhYnNldCBjbGFzcz1cImJrclwiPlxcblxcdDx0YWIgaGVhZGluZz1cIlRhYmxlIEZvcm1hdHRpbmdcIiBjbGFzcz1cImJrclwiPlxcblxcblxcdFxcdDxkaXYgY2xhc3M9XCJyb3cgYmtyXCI+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNCBia3JcIj5cXG5cXHRcXHQgICAgXFx0VXNlIHBhZ2luYXRpb246XFxuXFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0ICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNCBia3JcIj5cXG5cXHRcXHQgICAgXFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwicGFnaW5hdGlvbi51c2VcIiBjbGFzcz1cImJrclwiPlxcblxcdFxcdCAgICA8L2Rpdj5cXG4gICAgXFx0PC9kaXY+XFxuXFx0XFx0PGRpdiBjbGFzcz1cInJvdyBia3JcIj5cXG5cXHRcXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy00IGJrclwiPlxcblxcdFxcdCAgICBcXHRNYXggcm93cyB0byBkaXNwbGF5OlxcblxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTQgYmtyXCI+XFxuXFx0XFx0ICAgIFxcdDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbmctbW9kZWw9XCJwYWdpbmF0aW9uLnJvd3NUb0Rpc3BsYXlcIiBuZy1kaXNhYmxlZD1cInBhZ2luYXRpb24udXNlXCIgY2xhc3M9XCJia3JcIj5cXG5cXHRcXHQgICAgPC9kaXY+XFxuICAgIFxcdDwvZGl2PlxcblxcdDwvdGFiPlxcblxcdDx0YWIgaGVhZGluZz1cIkNlbGwgRm9ybWF0dGluZ1wiIGNsYXNzPVwiYmtyXCI+XFxuXFx0ICA8ZGl2IGNsYXNzPVwicm93IGJrclwiPlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPGgyIGNsYXNzPVwiYmtyXCI+PHN0cm9uZyBjbGFzcz1cImJrclwiPkNvbHVtbjwvc3Ryb25nPjwvaDI+XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPGgyIGNsYXNzPVwiYmtyXCI+PHN0cm9uZyBjbGFzcz1cImJrclwiPkRpc3BsYXkgVHlwZTwvc3Ryb25nPjwvaDI+XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPGgyIGNsYXNzPVwiYmtyXCI+PHN0cm9uZyBjbGFzcz1cImJrclwiPlNob3cgKDxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZGlzcGxheUFsbCgpXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5BbGw8L2E+KTwvc3Ryb25nPjwvaDI+XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAgPGgyIGNsYXNzPVwiYmtyXCI+PHN0cm9uZyBjbGFzcz1cImJrclwiPkFsaWdubWVudDwvc3Ryb25nPjwvaDI+XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgPC9kaXY+XFxuXFxuXFx0ICA8ZGl2IGNsYXNzPVwicm93IGJrclwiIG5nLXJlcGVhdD1cIm1lbnVpZHggaW4gZ2V0Q2VsbElkeFwiPlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTMgYmtyXCI+XFxuXFx0ICAgICAge3sgZ2V0Q2VsbE5hbVttZW51aWR4XSB9fVxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYmtyXCIgbmctbW9kZWw9XCJnZXRDZWxsRGlzcFttZW51aWR4XVwiIG5nLW9wdGlvbnM9XCJpdGVtLnR5cGUgYXMgaXRlbS5uYW1lIGZvciBpdGVtIGluIGdldENlbGxEaXNwT3B0c0YobWVudWlkeClcIj48L3NlbGVjdD5cXG5cXHRcXHQ8L2Rpdj4gICBcXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdCAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1tb2RlbD1cImdldENlbGxTaG9bbWVudWlkeF1cIiBjbGFzcz1cImJrclwiPlxcblxcdCAgICA8L2Rpdj5cXG5cXHQgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zIGJrclwiPlxcblxcdFxcdFxcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuZy1tb2RlbD1cImdldENlbGxBbGlnblttZW51aWR4XVwiIHZhbHVlPVwiTFwiIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWFsaWduLWxlZnQgYmtyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiZuYnNwO1xcbiAgXFx0XFx0XFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIG5nLW1vZGVsPVwiZ2V0Q2VsbEFsaWduW21lbnVpZHhdXCIgdmFsdWU9XCJDXCIgY2xhc3M9XCJia3JcIj4mbmJzcDs8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tYWxpZ24tY2VudGVyIGJrclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4mbmJzcDtcXG5cXHRcXHRcXHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmctbW9kZWw9XCJnZXRDZWxsQWxpZ25bbWVudWlkeF1cIiB2YWx1ZT1cIlJcIiBjbGFzcz1cImJrclwiPiZuYnNwOzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1hbGlnbi1yaWdodCBia3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+Jm5ic3A7XFxuXFx0ICAgIDwvZGl2PlxcblxcdCAgPC9kaXY+XFxuICAgPC90YWI+XFxuIDwvdGFic2V0PlxcblxcblxcblxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgZml4ZWQgYmtyIGJrclwiIHN0eWxlPVwiaGVpZ2h0OiA2OHB4XCI+IFxcbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBia3IgYmtyXCIgbmctY2xpY2s9XCJjYW5jZWxPcHRpb25zRGlhbG9nKClcIj5DYW5jZWw8L2J1dHRvbj5cXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgbW9kYWwtc3VibWl0IGJrciBia3JcIiBuZy1jbGljaz1cImNsb3NlT3B0aW9uc0RpYWxvZygpXCI+T0s8L2J1dHRvbj5cXG48L2Rpdj4nO1xuXG59XG5yZXR1cm4gX19wXG59fSkoKTtcbihmdW5jdGlvbigpIHsod2luZG93W1wiSlNUXCJdID0gd2luZG93W1wiSlNUXCJdIHx8IHt9KVtcImJrby10YWJsZWRpc3BsYXkvb3V0cHV0LXRhYmxlXCJdID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbndpdGggKG9iaikge1xuX19wICs9ICdcXG48ZGl2IGNsYXNzPVwiZHJvcGRvd24gZHRtZW51IGNsZWFyZml4IGJrclwiIHN0eWxlPVwiZmxvYXQ6IGxlZnRcIiBuZy1pZj1cInJlbmRlck1lbnVcIj5cXG4gICA8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZSBkdG1lbnUgYmtyXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIG5nLWNsaWNrPVwibWVudVRvZ2dsZSgpXCI+XFxuICAgRWRpdCBUYWJsZSBcXG4gICA8L2E+XFxuICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBia3JcIiByb2xlPVwibWVudVwiIHN1Ym1lbnUtY2xhc3Nlcz1cImRyb3AtcmlnaHRcIiBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9SZXNldFNvcnQoKVwiIGlkPVwiZHQtcmVzZXQtc29ydFwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+UmVzZXQgU29ydDwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+Jm5ic3A7PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9TZWxlY3RBbGwoKVwiIGlkPVwiZHQtc2VsZWN0LWFsbFwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+U2VsZWN0IEFsbDwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb0Rlc2VsZWN0QWxsKClcIiBpZD1cImR0LWRlc2VsZWN0LWFsbFwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+RGVzZWxlY3QgQWxsPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvUmV2ZXJzZVNlbGVjdGlvbigpXCIgaWQ9XCJkdC1yZXZlcnNlLXNlbGVjdGlvblwiIGVhdC1jbGljaz1cIlwiIGNsYXNzPVwiYmtyXCI+UmV2ZXJzZSBTZWxlY3Rpb248L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPiZuYnNwOzwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj48YSB0YWJpbmRleD1cIi0xXCIgaHJlZj1cIiNcIiBuZy1jbGljaz1cImRvQ29weVRvQ2xpcGJvYXJkKClcIiBpZD1cInt7aWR9fV9kdF9jb3B5XCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5Db3B5IHRvIENsaXBib2FyZDwvYT48L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJkb0NTVkV4cG9ydChmYWxzZSlcIiBpZD1cImR0LXNhdmUtYWxsXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5TYXZlIEFsbCBhcyBDU1Y8L2E+PC9saT5cXG4gICAgIDxsaSBjbGFzcz1cImJrclwiPjxhIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiIG5nLWNsaWNrPVwiZG9DU1ZFeHBvcnQodHJ1ZSlcIiBpZD1cImR0LXNhdmUtc2VsZWN0ZWRcIiBlYXQtY2xpY2s9XCJcIiBjbGFzcz1cImJrclwiPlNhdmUgU2VsZWN0ZWQgYXMgQ1NWPC9hPjwvbGk+XFxuICAgICA8bGkgY2xhc3M9XCJia3JcIj4mbmJzcDs8L2xpPlxcbiAgICAgPGxpIGNsYXNzPVwiYmtyXCI+PGEgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJvcGVuT3B0aW9uc0RpYWxvZygpXCIgaWQ9XCJkdC1vcHRpb25zXCIgZWF0LWNsaWNrPVwiXCIgY2xhc3M9XCJia3JcIj5PcHRpb25zLi4uPC9hPjwvbGk+XFxuICAgPC91bD5cXG4gPC9kaXY+XFxuXFxuPHRhYmxlIGNlbGxwYWRkaW5nPVwiMFwiIGNsYXNzPVwiZGlzcGxheSBia3JcIiBib3JkZXI9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgd2lkdGg9XCIxMCVcIiBpZD1cInt7aWR9fVwiPjwvdGFibGU+JztcblxufVxucmV0dXJuIF9fcFxufX0pKCk7IiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIGJrLkNvbnRyb2xQYW5lbFxuICogLSBUaGlzIGlzIHRoZSBtb2R1bGUgZm9yIHRoZSAnY29udHJvbCBwYW5lbCcgc2VjdGlvbiBvZiBiZWFrZXJcbiAqIC0gSW4gdGhlIGNvbnRyb2wgcGFuZWwsIHVzZXJzIGdldCBhIGxpc3Qgb2Ygb3BlbmVkIHNlc3Npb25zIGFuZCBpcyBhYmxlIHRvXG4gKiAocmUpb3BlbiBvbmUgaW4gYmtBcHAuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbnRyb2xQYW5lbCcsIFtcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5jb3JlJyxcbiAgICAnYmsuc2Vzc2lvbicsXG4gICAgJ2JrLm1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICAnYmsucmVjZW50TWVudScsXG4gICAgJ2JrLmV2YWx1YXRlUGx1Z2luTWFuYWdlciddKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbnRyb2xQYW5lbCcpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29udHJvbFBhbmVsJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLCBia0NvcmVNYW5hZ2VyLCBia1Nlc3Npb24sIGJrTWVudVBsdWdpbk1hbmFnZXIsIGJrVHJhY2spIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJjb250cm9scGFuZWwvY29udHJvbHBhbmVsXCJdKCksXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIkJlYWtlclwiO1xuICAgICAgICB2YXIgX2ltcGwgPSB7XG4gICAgICAgICAgbmFtZTogXCJia0NvbnRyb2xBcHBcIixcbiAgICAgICAgICBzaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGJrQ29yZU1hbmFnZXIuc2V0QmtBcHBJbXBsKF9pbXBsKTtcblxuICAgICAgICAkc2NvcGUuZ290b0NvbnRyb2xQYW5lbCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGJrVXRpbHMuaXNNaWRkbGVDbGljayhldmVudCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFwiLi9cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBzZXR1cCBtZW51c1xuICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoJy4uL2JlYWtlci9yZXN0L3V0aWwvZ2V0Q29udHJvbFBhbmVsTWVudVBsdWdpbnMnKVxuICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtZW51VXJscykge1xuICAgICAgICAgICAgICAgIG1lbnVVcmxzLmZvckVhY2goZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmxvYWRNZW51UGx1Z2luKHVybCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51ZXMgPSB3aW5kb3cuYmVha2VyLmdldENvbnRyb2xNZW51SXRlbXMoKTtcbiAgICAgICAgICBia01lbnVQbHVnaW5NYW5hZ2VyLmF0dGFjaE1lbnVzKG1lbnVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICRzY29wZS5nZXRNZW51cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia01lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYWN0aW9ucyBmb3IgVUlcbiAgICAgICAgJHNjb3BlLm5ld05vdGVib29rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5uZXdTZXNzaW9uKGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm5ld0VtcHR5Tm90ZWJvb2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLm5ld1Nlc3Npb24odHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5vcGVuVHV0b3JpYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLm9wZW5Ob3RlYm9vayhcImNvbmZpZy90dXRvcmlhbC5ia3JcIiwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBhc2sgZm9yIHRyYWNraW5nIHBlcm1pc3Npb25cbiAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAoKHdpbmRvdy5iZWFrZXIgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuYmVha2VyLmlzRW1iZWRkZWQgPT09IHVuZGVmaW5lZCkgJiYgYmtUcmFjay5pc05lZWRQZXJtaXNzaW9uKCkpIHtcbiAgICAgICAgICBia1V0aWxzLmh0dHBHZXQoXCIuLi9iZWFrZXIvcmVzdC91dGlsL2lzQWxsb3dBbm9ueW1vdXNUcmFja2luZ1wiKS50aGVuKGZ1bmN0aW9uKGFsbG93KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFsbG93LmRhdGEpIHtcbiAgICAgICAgICAgICAgY2FzZSBcInRydWVcIjpcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNBbGxvd0Fub255bW91c1RyYWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcImZhbHNlXCI6XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzQWxsb3dBbm9ueW1vdXNUcmFja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzY29wZS5pc0FsbG93QW5vbnltb3VzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuYmVha2VyID09PSB1bmRlZmluZWQgfHwgd2luZG93LmJlYWtlci5pc0VtYmVkZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKFwiaXNBbGxvd0Fub255bW91c1RyYWNraW5nXCIsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgYWxsb3cgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhbGxvdyA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgICAgIGJrVHJhY2suZW5hYmxlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYWxsb3cgPSBcImZhbHNlXCI7XG4gICAgICAgICAgICAgICAgYmtUcmFjay5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYmtVdGlscy5odHRwUG9zdChcIi4uL2JlYWtlci9yZXN0L3V0aWwvc2V0QWxsb3dBbm9ueW1vdXNUcmFja2luZ1wiLCB7IGFsbG93OiBhbGxvdyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuc2hvd1doYXRXZUxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dNb2RhbERpYWxvZyhcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBKU1RbJ2NvbnRyb2xwYW5lbC93aGF0X3dlX2xvZyddKClcbiAgICAgICAgICApO1xuICAgICAgICB9O1xuXG5cdHZhciBrZXlkb3duSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUuc2hpZnRLZXkgJiYgKGUud2hpY2ggPT09IDc4KSkgeyAvLyBDdHJsICsgU2hpZnQgKyBuXG5cdCAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdOb3RlYm9vaygpO1xuICAgICAgICAgICAgfSk7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfSBlbHNlIGlmIChlLmN0cmxLZXkgJiYgKGUud2hpY2ggPT09IDc4KSkgeyAvLyBDdHJsICsgblxuXHQgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3RW1wdHlOb3RlYm9vaygpO1xuICAgICAgICAgICAgIH0pO1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH0gZWxzZSBpZiAoZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkgJiYgZS5zaGlmdEtleSAmJiAoZS53aGljaCA9PT0gNzgpKSB7IC8vIENtZCArIFNoaWZ0ICsgblxuXHQgICAgYmtVdGlscy5mY2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3Tm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH0gZWxzZSBpZiAoZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkgJiYgKGUud2hpY2ggPT09IDc4KSkgeyAvLyBDbWQgKyBuXG4gICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdFbXB0eU5vdGVib29rKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdH1cblx0Y29uc29sZS5sb2coJ2luc3RhbGxpbmcga2V5ZG93bkhhbmRsZXInKTtcblx0JChkb2N1bWVudCkuYmluZCgna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcblxuXHR2YXIgb25EZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAkKGRvY3VtZW50KS51bmJpbmQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG5cdH1cblx0JHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIG9uRGVzdHJveSk7XG5cbiAgICAgICAgLy8gc2Vzc2lvbnMgbGlzdCBVSVxuICAgICAgICAkc2NvcGUuc2Vzc2lvbnMgPSBudWxsO1xuICAgICAgICAvLyBnZXQgbGlzdCBvZiBvcGVuZWQgc2Vzc2lvbnNcbiAgICAgICAgJHNjb3BlLnJlbG9hZFNlc3Npb25zTGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrU2Vzc2lvbi5nZXRTZXNzaW9ucygpLnRoZW4oZnVuY3Rpb24oc2Vzc2lvbnMpIHtcbiAgICAgICAgICAgICRzY29wZS5zZXNzaW9ucyA9IF8oc2Vzc2lvbnMpLm1hcChmdW5jdGlvbihzZXNzaW9uLCBzZXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgc2Vzc2lvbi5pZCA9IHNlc3Npb25JZDtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnJlbG9hZFNlc3Npb25zTGlzdCgpO1xuICAgICAgICAkc2NvcGUuaXNTZXNzaW9uc0xpc3RFbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLmlzRW1wdHkoJHNjb3BlLnNlc3Npb25zKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogYmsuQ29udHJvbFBhbmVsXG4gKiAtIFRoaXMgaXMgdGhlIG1vZHVsZSBmb3IgdGhlICdjb250cm9sIHBhbmVsJyBzZWN0aW9uIG9mIGJlYWtlclxuICogLSBJbiB0aGUgY29udHJvbCBwYW5lbCwgdXNlcnMgZ2V0IGEgbGlzdCBvZiBvcGVuZWQgc2Vzc2lvbnMgYW5kIGlzIGFibGUgdG9cbiAqIChyZSlvcGVuIG9uZSBpbiBia0FwcC5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29udHJvbFBhbmVsJyk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtDb250cm9sUGFuZWxTZXNzaW9uSXRlbScsIGZ1bmN0aW9uKFxuICAgICAgYmtVdGlscywgYmtTZXNzaW9uLCBia0NvcmVNYW5hZ2VyLCBia1JlY2VudE1lbnUsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUWydjb250cm9scGFuZWwvdGFibGUnXSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLm9wZW5TZXNzaW9uKHNlc3Npb24uaWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2xvc2UgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgdmFyIGZvcm1hdCA9IHNlc3Npb24uZm9ybWF0O1xuICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gYW5ndWxhci5mcm9tSnNvbihzZXNzaW9uLm5vdGVib29rTW9kZWxKc29uKTtcbiAgICAgICAgICB2YXIgZWRpdGVkID0gc2Vzc2lvbi5lZGl0ZWQ7XG4gICAgICAgICAgdmFyIGNsb3NlU2Vzc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKG5vdGVib29rTW9kZWwgJiYgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuY3JlYXRlRXZhbHVhdG9yVGhlbkV4aXQobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbi5jbG9zZShzZXNzaW9uLmlkKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkc2NvcGUucmVsb2FkU2Vzc2lvbnNMaXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICghZWRpdGVkKSB7XG4gICAgICAgICAgICAvLyBjbG9zZSBzZXNzaW9uXG4gICAgICAgICAgICBjbG9zZVNlc3Npb24oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gYXNrIGlmIHVzZXIgd2FudCB0byBzYXZlIGZpcnN0XG4gICAgICAgICAgICBia0hlbHBlci5zaG93M0J1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBbXCIgKyAkc2NvcGUuZ2V0Q2FwdGlvbihzZXNzaW9uKSArIFwiXT9cIixcbiAgICAgICAgICAgICAgICBcIkNvbmZpcm0gY2xvc2VcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgLy8geWVzXG4gICAgICAgICAgICAgICAgICAvLyBzYXZlIHNlc3Npb25cbiAgICAgICAgICAgICAgICAgIHZhciBzYXZlU2Vzc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbEFzU3RyaW5nID0gYmtVdGlscy50b1ByZXR0eUpzb24obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHNlc3Npb24ubm90ZWJvb2tVcmkpICYmICFzZXNzaW9uLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKHNlc3Npb24udXJpVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVTYXZlci5zYXZlKHNlc3Npb24ubm90ZWJvb2tVcmksIG5vdGVib29rTW9kZWxBc1N0cmluZywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvd0RlZmF1bHRTYXZpbmdGaWxlQ2hvb3NlcigpLnRoZW4oZnVuY3Rpb24ocGF0aEluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGF0aEluZm8udXJpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1c2U6IFwiU2F2ZSBjYW5jZWxsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcihwYXRoSW5mby51cmlUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVNhdmVyLnNhdmUocGF0aEluZm8udXJpLCBub3RlYm9va01vZGVsQXNTdHJpbmcpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJrUmVjZW50TWVudS5yZWNvcmRSZWNlbnREb2N1bWVudChhbmd1bGFyLnRvSnNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmk6IHBhdGhJbmZvLnVyaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBhdGhJbmZvLnVyaVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IF8uaXNFbXB0eShmb3JtYXQpID8gXCJcIiA6IGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXVzZTogXCJlcnJvciBzYXZpbmcgdG8gZmlsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgdmFyIHNhdmluZ0ZhaWxlZEhhbmRsZXIgPSBmdW5jdGlvbihpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNhdXNlID09PSBcIlNhdmUgY2FuY2VsbGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgc2F2aW5nIGNhbmNlbGxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBia0hlbHBlci5zaG93MUJ1dHRvbk1vZGFsKGluZm8uZXJyb3IsIGluZm8uY2F1c2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgc2F2ZVNlc3Npb24oKS50aGVuKGNsb3NlU2Vzc2lvbiwgc2F2aW5nRmFpbGVkSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgLy8gbm9cbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2Ugd2l0aG91dCBzYXZpbmdcIik7XG4gICAgICAgICAgICAgICAgICBjbG9zZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyAvLyBjYW5jZWxcbiAgICAgICAgICAgICAgICAgIC8vIG5vLW9wXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIlNhdmVcIixcbiAgICAgICAgICAgICAgICBcIkRvbid0IFNhdmVcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldENhcHRpb24gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgdmFyIHVybCA9IHNlc3Npb24ubm90ZWJvb2tVcmk7XG4gICAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIk5ldyBOb3RlYm9va1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodXJsW3VybC5sZW5ndGggLSAxXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICAgIHJldHVybiBzZXNzaW9uLm5vdGVib29rVXJpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogYmtDZWxsTWVudVBsdWdpbk1hbmFnZXJcbiAqIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyIGxvYWQgYW5kIG1hbmFnZXMgbG9hZGVkIGNlbGwgbWVudSBwbHVnaW5zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jZWxsTWVudVBsdWdpbk1hbmFnZXInLCBbXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsuaGVscGVyJyAgLy8gVGhpcyBpcyBvbmx5IGZvciBlbnN1cmluZyB0aGF0IHdpbmRvdy5ia0hlbHBlciBpcyBzZXQsIGRvbid0IHVzZSBia0hlbHBlciBkaXJlY3RseVxuICBdKTtcbiAgbW9kdWxlLmZhY3RvcnkoJ2JrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyJywgZnVuY3Rpb24oYmtVdGlscykge1xuICAgIC8vIGxvYWRlZCBwbHVnaW5zXG4gICAgdmFyIF9jZWxsTWVudVBsdWdpbnMgPSB7fTtcblxuICAgIHZhciBhZGRQbHVnaW4gPSBmdW5jdGlvbihjZWxsVHlwZSwgaXRlbUdldHRlcikge1xuICAgICAgaWYgKCFfY2VsbE1lbnVQbHVnaW5zW2NlbGxUeXBlXSkge1xuICAgICAgICBfY2VsbE1lbnVQbHVnaW5zW2NlbGxUeXBlXSA9IFtdO1xuICAgICAgfVxuICAgICAgX2NlbGxNZW51UGx1Z2luc1tjZWxsVHlwZV0ucHVzaChpdGVtR2V0dGVyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IgKHZhciBtZW1iZXIgaW4gX2NlbGxNZW51UGx1Z2lucykge1xuICAgICAgICAgIGRlbGV0ZSBfY2VsbE1lbnVQbHVnaW5zW21lbWJlcl07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5iZWFrZXIgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuYmVha2VyLmlzRW1iZWRkZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJrVXRpbHMuaHR0cEdldCgnLi4vYmVha2VyL3Jlc3QvdXRpbC9nZXRDZWxsTWVudVBsdWdpbnMnKVxuICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtZW51VXJscykge1xuICAgICAgICAgICAgICAgIG1lbnVVcmxzLmZvckVhY2goc2VsZi5sb2FkUGx1Z2luKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG1sID0gd2luZG93LmJlYWtlci5nZXRDZWxsTWVudUxpc3QoKTtcbiAgICAgICAgICBpZiAoXy5pc0FycmF5KG1sKSkge1xuICAgICAgICAgICAgdmFyIGk7ICAgICAgXG4gICAgICAgICAgICBmb3IoaT0wOyBpPG1sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkobWxbaV0uY2VsbFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgXyhtbFtpXS5jZWxsVHlwZSkuZWFjaChmdW5jdGlvbihjVHlwZSkge1xuICAgICAgICAgICAgICAgICAgYWRkUGx1Z2luKGNUeXBlLCBtbFtpXS5wbHVnaW4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZFBsdWdpbihtbFtpXS5jZWxsVHlwZSwgbWxbaV0ucGx1Z2luKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkTW9kdWxlKHVybCkudGhlbihmdW5jdGlvbihleCkge1xuICAgICAgICAgIGlmIChfLmlzQXJyYXkoZXguY2VsbFR5cGUpKSB7XG4gICAgICAgICAgICBfKGV4LmNlbGxUeXBlKS5lYWNoKGZ1bmN0aW9uKGNUeXBlKSB7XG4gICAgICAgICAgICAgIGFkZFBsdWdpbihjVHlwZSwgZXgucGx1Z2luKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRQbHVnaW4oZXguY2VsbFR5cGUsIGV4LnBsdWdpbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBleC5wbHVnaW47XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldFBsdWdpbjogZnVuY3Rpb24oY2VsbFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9jZWxsTWVudVBsdWdpbnNbY2VsbFR5cGVdO1xuICAgICAgfSxcbiAgICAgIGdldE1lbnVJdGVtczogZnVuY3Rpb24oY2VsbFR5cGUsIHNjb3BlKSB7XG4gICAgICAgIHZhciBtZW51SXRlbUdldHRlcnMgPSBfY2VsbE1lbnVQbHVnaW5zW2NlbGxUeXBlXTtcbiAgICAgICAgdmFyIG5ld0l0ZW1zID0gW107XG4gICAgICAgIF8obWVudUl0ZW1HZXR0ZXJzKS5lYWNoKGZ1bmN0aW9uKGdldHRlcikge1xuICAgICAgICAgIHZhciBpdGVtcyA9IGdldHRlcihzY29wZSk7XG4gICAgICAgICAgXyhpdGVtcykuZWFjaChmdW5jdGlvbihpdCkge1xuICAgICAgICAgICAgbmV3SXRlbXMucHVzaChpdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3SXRlbXM7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuY29yZVxuICogSG9sZHMgdGhlIGNvcmUgb2YgYmVha2VyIHV0aWxpdGllcy4gSXQgd3JhcHMgb2YgbG93ZXIgbGV2ZWwgdXRpbGl0aWVzIHRoYXQgY29tZSBmcm9tIG90aGVyXG4gKiBtb2R1bGVzLlxuICogVGhlIHVzZXIgZmFjaW5nIGRpcmVjdGl2ZXMgYWxzbyB1c2UgdGhlIGNvcmUgYXMgYSBjb21tdW5pY2F0aW9uL2V4Y2hhbmdlIGxheWVyLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5jb3JlJywgW1xuICAgICd1aS5ib290c3RyYXAnLFxuICAgICd1aS5rZXlwcmVzcycsXG4gICAgJ2JrLmNvbW1vblVpJyxcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5yZWNlbnRNZW51JyxcbiAgICAnYmsubm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyJyxcbiAgICAnYmsudHJlZVZpZXcnXG4gIF0pO1xuXG4gIC8qKlxuICAgKiBia0NvcmVNYW5hZ2VyXG4gICAqIC0gdGhpcyBhY3RzIGFzIHRoZSBnbG9iYWwgc3BhY2UgZm9yIGFsbCB2aWV3IG1hbmFnZXJzIHRvIHVzZSBpdCBhcyB0aGUgY29tbXVuaWNhdGlvbiBjaGFubmVsXG4gICAqIC0gYmtVdGlscyBzaG91bGQgYmUgY29uc2lkZXIgJ3ByaXZhdGUnIHRvIGJlYWtlciwgZXh0ZXJuYWwgY29kZSBzaG91bGQgZGVwZW5kIG9uIGJrSGVscGVyXG4gICAqICAgICBpbnN0ZWFkXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnYmtDb3JlTWFuYWdlcicsIGZ1bmN0aW9uKFxuICAgICAgJG1vZGFsLFxuICAgICAgJHJvb3RTY29wZSxcbiAgICAgICRkb2N1bWVudCxcbiAgICAgICRsb2NhdGlvbixcbiAgICAgICRzZXNzaW9uU3RvcmFnZSxcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia1JlY2VudE1lbnUsXG4gICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcixcbiAgICAgIG1vZGFsRGlhbG9nT3ApIHtcblxuICAgIHZhciBGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneSA9IGZ1bmN0aW9uICgpe1xuICAgICAgdmFyIG5ld1N0cmF0ZWd5ID0gdGhpcztcbiAgICAgIG5ld1N0cmF0ZWd5LmlucHV0ID0gXCJcIjtcbiAgICAgIG5ld1N0cmF0ZWd5LmdldFJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3U3RyYXRlZ3kuaW5wdXQ7XG4gICAgICB9O1xuICAgICAgbmV3U3RyYXRlZ3kuY2xvc2UgPSBmdW5jdGlvbihldiwgY2xvc2VGdW5jKSB7XG4gICAgICAgIGlmIChldi53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICBjbG9zZUZ1bmModGhpcy5nZXRSZXN1bHQoKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBuZXdTdHJhdGVneS50cmVlVmlld2ZzID0geyAvLyBmaWxlIHNlcnZpY2VcbiAgICAgICAgZ2V0Q2hpbGRyZW46IGZ1bmN0aW9uKGJhc2VQYXRoLCBvcGVuRm9sZGVycykge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICBwYXRocyA9IFtiYXNlUGF0aF07XG5cbiAgICAgICAgICB0aGlzLnNob3dTcGlubmVyID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChvcGVuRm9sZGVycykge1xuICAgICAgICAgICAgdmFyIHBhdGhzID0gW3BhdGhzXS5jb25jYXQob3BlbkZvbGRlcnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBQb3N0KFwiLi4vYmVha2VyL3Jlc3QvZmlsZS1pby9nZXREZWNvcmF0ZWRDaGlsZHJlblwiLCB7XG4gICAgICAgICAgICBvcGVuRm9sZGVyczogcGF0aHMuam9pbignLCcpXG4gICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICAgICAgc2VsZi5zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbG9hZGluZyBjaGlsZHJlblwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbElucHV0OiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgICAgbmV3U3RyYXRlZ3kuaW5wdXQgPSBwYXRoO1xuICAgICAgICB9LFxuICAgICAgICBvcGVuOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgICAgdGhpcy5maWxsSW5wdXQocGF0aCk7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdtb2RhbC5zdWJtaXQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0T3JkZXJCeTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICRyb290U2NvcGUuZnNQcmVmcy5vcmRlckJ5ID0gb3B0aW9ucy5vcmRlckJ5O1xuICAgICAgICAgICRyb290U2NvcGUuZnNQcmVmcy5vcmRlclJldmVyc2UgPSBvcHRpb25zLnJldmVyc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yZGVyQnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJCeSB8fCAndXJpJztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JkZXJSZXZlcnNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gISEkcm9vdFNjb3BlLmZzUHJlZnMub3JkZXJSZXZlcnNlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmV0dHlPcmRlckJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcHJldHR5TmFtZXMgPSB7XG4gICAgICAgICAgICB1cmk6ICdOYW1lJyxcbiAgICAgICAgICAgIG1vZGlmaWVkOiAnRGF0ZSBNb2RpZmllZCdcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcHJldHR5TmFtZXNbJHJvb3RTY29wZS5mc1ByZWZzLm9yZGVyQnkgfHwgJ3VyaSddO1xuICAgICAgICB9LFxuICAgICAgICBzaG93U3Bpbm5lcjogZmFsc2UsXG4gICAgICAgIGFwcGx5RXh0RmlsdGVyOiB0cnVlLFxuICAgICAgICBleHRGaWx0ZXI6IFsnYmtyJ10sXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICB2YXIgZnMgPSBuZXdTdHJhdGVneS50cmVlVmlld2ZzO1xuICAgICAgICAgIGlmICghZnMuYXBwbHlFeHRGaWx0ZXIgfHwgXy5pc0VtcHR5KGZzLmV4dEZpbHRlcikgfHwgY2hpbGQudHlwZSA9PT0gXCJkaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfKGZzLmV4dEZpbHRlcikuYW55KGZ1bmN0aW9uKGV4dCkge1xuICAgICAgICAgICAgICByZXR1cm4gXy5zdHJpbmcuZW5kc1dpdGgoY2hpbGQudXJpLCBleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICAvLyBpbXBvcnRlcnMgYXJlIHJlc3BvbnNpYmxlIGZvciBpbXBvcnRpbmcgdmFyaW91cyBmb3JtYXRzIGludG8gYmtyXG4gICAgLy8gaW1wb3J0ZXIgaW1wbCBtdXN0IGRlZmluZSBhbiAnaW1wb3J0JyBtZXRob2RcbiAgICB2YXIgX2ltcG9ydGVycyA9IHt9O1xuICAgIHZhciBGT1JNQVRfQktSID0gXCJia3JcIjtcbiAgICBfaW1wb3J0ZXJzW0ZPUk1BVF9CS1JdID0ge1xuICAgICAgaW1wb3J0OiBmdW5jdGlvbihub3RlYm9va0pzb24pIHtcbiAgICAgICAgdmFyIG5vdGVib29rTW9kZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrVXRpbHMuZnJvbVByZXR0eUpzb24obm90ZWJvb2tKc29uKTtcbiAgICAgICAgICAvLyBUT0RPLCB0byBiZSByZW1vdmVkLiBBZGRyZXNzaW5nIGxvYWRpbmcgYSBjb3JydXB0ZWQgbm90ZWJvb2suXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobm90ZWJvb2tNb2RlbCkpIHtcbiAgICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia1V0aWxzLmZyb21QcmV0dHlKc29uKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgYmtVdGlscy5sb2coXCJjb3JydXB0ZWQtbm90ZWJvb2tcIiwgeyBub3RlYm9va1VyaTogZW5oYW5jZWROb3RlYm9va1VyaSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGlzIGlzIG5vdCBhIHZhbGlkIEJlYWtlciBub3RlYm9vayBKU09OXCIpO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3Iobm90ZWJvb2tKc29uKTtcbiAgICAgICAgICB0aHJvdyBcIk5vdCBhIHZhbGlkIEJlYWtlciBub3RlYm9va1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub3RlYm9va01vZGVsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgTE9DQVRJT05fRklMRVNZUyA9IFwiZmlsZVwiO1xuICAgIHZhciBMT0NBVElPTl9IVFRQID0gXCJodHRwXCI7XG4gICAgdmFyIExPQ0FUSU9OX0FKQVggPSBcImFqYXhcIjtcblxuICAgIC8vIGZpbGVMb2FkZXJzIGFyZSByZXNwb25zaWJsZSBmb3IgbG9hZGluZyBmaWxlcyBhbmQgb3V0cHV0IHRoZSBmaWxlIGNvbnRlbnQgYXMgc3RyaW5nXG4gICAgLy8gZmlsZUxvYWRlciBpbXBsIG11c3QgZGVmaW5lIGFuICdsb2FkJyBtZXRob2Qgd2hpY2ggcmV0dXJucyBhIHRoZW4tYWJsZVxuICAgIHZhciBfZmlsZUxvYWRlcnMgPSB7fTtcbiAgICBfZmlsZUxvYWRlcnNbTE9DQVRJT05fRklMRVNZU10gPSB7XG4gICAgICBsb2FkOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubG9hZEZpbGUodXJpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIF9maWxlTG9hZGVyc1tMT0NBVElPTl9IVFRQXSA9IHtcbiAgICAgIGxvYWQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkSHR0cCh1cmkpO1xuICAgICAgfVxuICAgIH07XG4gICAgX2ZpbGVMb2FkZXJzW0xPQ0FUSU9OX0FKQVhdID0ge1xuICAgICAgbG9hZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRBamF4KHVyaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGZpbGVTYXZlcnMgYXJlIHJlc3BvbnNpYmxlIGZvciBzYXZpbmcgdmFyaW91cyBmb3JtYXRzIGludG8gYmtyXG4gICAgLy8gZmlsZUxvYWRlciBpbXBsIG11c3QgZGVmaW5lIGFuICdsb2FkJyBtZXRob2Qgd2hpY2ggcmV0dXJucyBhIHRoZW4tYWJsZVxuICAgIHZhciBfZmlsZVNhdmVycyA9IHt9O1xuXG4gICAgX2ZpbGVTYXZlcnNbTE9DQVRJT05fRklMRVNZU10gPSB7XG4gICAgICBzYXZlOiBmdW5jdGlvbih1cmksIGNvbnRlbnRBc1N0cmluZywgb3ZlcndyaXRlKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnNhdmVGaWxlKHVyaSwgY29udGVudEFzU3RyaW5nLCBvdmVyd3JpdGUpO1xuICAgICAgfSxcbiAgICAgIHNob3dGaWxlQ2hvb3NlcjogZnVuY3Rpb24oaW5pdFVyaSkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93RGVmYXVsdFNhdmluZ0ZpbGVDaG9vc2VyKGluaXRVcmkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfZmlsZVNhdmVyc1tMT0NBVElPTl9BSkFYXSA9IHtcbiAgICAgIHNhdmU6IGZ1bmN0aW9uKHVyaSwgY29udGVudEFzU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnNhdmVBamF4KHVyaSwgY29udGVudEFzU3RyaW5nKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGltcG9ydElucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJGlucHV0LFxuICAgICAgICAgIGVuZHBvaW50ID0gJy4uL2JlYWtlci9maWxldXBsb2FkJztcblxuICAgICAgaWYgKCgkaW5wdXQgPSAkKCdpbnB1dCNpbXBvcnQtbm90ZWJvb2snKSkubGVuZ3RoKSByZXR1cm4gJGlucHV0O1xuXG4gICAgICAkaW5wdXQgPSAkKCc8aW5wdXQgdHlwZT1cImZpbGVcIiBuYW1lPVwiZmlsZVwiIGlkPVwiaW1wb3J0LW5vdGVib29rXCIgJyArXG4gICAgICAgICAgICAgICAgICdkYXRhLXVybD1cIicgKyBlbmRwb2ludCArICdcIiAnICtcbiAgICAgICAgICAgICAgICAgJ3N0eWxlPVwiZGlzcGxheTogbm9uZVwiLz4nKVxuICAgICAgICAgICAgICAgIC5wcmVwZW5kVG8oJ2JvZHknKTtcblxuICAgICAgJGlucHV0LmZpbGV1cGxvYWQoe1xuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkb25lOiBmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5pbXBvcnROb3RlYm9vayhkYXRhLnJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gJGlucHV0O1xuICAgIH07XG5cbiAgICB2YXIgYmtDb3JlTWFuYWdlciA9IHtcblxuICAgICAgc2V0Tm90ZWJvb2tJbXBvcnRlcjogZnVuY3Rpb24oZm9ybWF0LCBpbXBvcnRlcikge1xuICAgICAgICBfaW1wb3J0ZXJzW2Zvcm1hdF0gPSBpbXBvcnRlcjtcbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va0ltcG9ydGVyOiBmdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIF9pbXBvcnRlcnNbZm9ybWF0XTtcbiAgICAgIH0sXG4gICAgICBzZXRGaWxlTG9hZGVyOiBmdW5jdGlvbih1cmlUeXBlLCBmaWxlTG9hZGVyKSB7XG4gICAgICAgIF9maWxlTG9hZGVyc1t1cmlUeXBlXSA9IGZpbGVMb2FkZXI7XG4gICAgICB9LFxuICAgICAgZ2V0RmlsZUxvYWRlcjogZnVuY3Rpb24odXJpVHlwZSkge1xuICAgICAgICByZXR1cm4gX2ZpbGVMb2FkZXJzW3VyaVR5cGVdO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVTYXZlcjogZnVuY3Rpb24odXJpVHlwZSwgZmlsZVNhdmVyKSB7XG4gICAgICAgIF9maWxlU2F2ZXJzW3VyaVR5cGVdID0gZmlsZVNhdmVyO1xuICAgICAgfSxcbiAgICAgIGdldEZpbGVTYXZlcjogZnVuY3Rpb24odXJpVHlwZSkge1xuICAgICAgICByZXR1cm4gX2ZpbGVTYXZlcnNbdXJpVHlwZV07XG4gICAgICB9LFxuICAgICAgZ3Vlc3NVcmlUeXBlOiBmdW5jdGlvbihub3RlYm9va1VyaSkge1xuICAgICAgICAvLyBUT0RPLCBtYWtlIHNtYXJ0ZXIgZ3Vlc3NcbiAgICAgICAgaWYgKC9eaHR0cHM/OlxcL1xcLy8uZXhlYyhub3RlYm9va1VyaSkpIHtcbiAgICAgICAgICByZXR1cm4gTE9DQVRJT05fSFRUUDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgvXmFqYXg6XFwvXFwvLy5leGVjKG5vdGVib29rVXJpKSkge1xuICAgICAgICAgIHJldHVybiBMT0NBVElPTl9BSkFYO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiBMT0NBVElPTl9GSUxFU1lTO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ3Vlc3NGb3JtYXQ6IGZ1bmN0aW9uKG5vdGVib29rVXJpKSB7XG4gICAgICAgIC8vIFRPRE8sIG1ha2Ugc21hcnRlciBndWVzc1xuICAgICAgICByZXR1cm4gRk9STUFUX0JLUjtcbiAgICAgIH0sXG5cbiAgICAgIF9iZWFrZXJSb290T3A6IG51bGwsXG4gICAgICBpbml0OiBmdW5jdGlvbihiZWFrZXJSb290T3ApIHtcbiAgICAgICAgdGhpcy5fYmVha2VyUm9vdE9wID0gYmVha2VyUm9vdE9wO1xuICAgICAgICBia1JlY2VudE1lbnUuaW5pdCh7XG4gICAgICAgICAgb3BlbjogYmVha2VyUm9vdE9wLm9wZW5Ob3RlYm9va1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnb3RvQ29udHJvbFBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JlYWtlclJvb3RPcC5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICB9LFxuICAgICAgbmV3U2Vzc2lvbjogZnVuY3Rpb24oZW1wdHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JlYWtlclJvb3RPcC5uZXdTZXNzaW9uKGVtcHR5KTtcbiAgICAgIH0sXG4gICAgICBvcGVuU2Vzc2lvbjogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWFrZXJSb290T3Aub3BlblNlc3Npb24oc2Vzc2lvbklkKTtcbiAgICAgIH0sXG4gICAgICBvcGVuTm90ZWJvb2s6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0KSB7XG4gICAgICAgIHRoaXMuX2JlYWtlclJvb3RPcC5vcGVuTm90ZWJvb2sobm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQpO1xuICAgICAgfSxcbiAgICAgIGFkZEltcG9ydElucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaW1wb3J0SW5wdXQoKTtcbiAgICAgIH0sXG4gICAgICBpbXBvcnROb3RlYm9va0RpYWxvZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGltcG9ydElucHV0KCkuY2xpY2soKTtcbiAgICAgIH0sXG4gICAgICBpbXBvcnROb3RlYm9vazogZnVuY3Rpb24obm90ZWJvb2spIHtcbiAgICAgICAgJHNlc3Npb25TdG9yYWdlLmltcG9ydGVkTm90ZWJvb2sgPSBub3RlYm9vaztcblxuICAgICAgICByZXR1cm4gJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvc2Vzc2lvbi9pbXBvcnRcIikuc2VhcmNoKHt9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2hvd0RlZmF1bHRTYXZpbmdGaWxlQ2hvb3NlcjogZnVuY3Rpb24oaW5pdFBhdGgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGJrVXRpbHMuYWxsKFtia1V0aWxzLmdldEhvbWVEaXJlY3RvcnkoKSwgYmtVdGlscy5nZXRTdGFydFVwRGlyZWN0b3J5KCldKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgICAgdmFyIGhvbWVEaXIgPSB2YWx1ZXNbMF07XG4gICAgICAgICAgdmFyIHB3ZCA9IHZhbHVlc1sxXTtcbiAgICAgICAgICB2YXIgZmlsZUNob29zZXJTdHJhdGVneSA9IHNlbGYuZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3koKTtcbiAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5LmlucHV0ID0gaW5pdFBhdGg7XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoXy5pc0VtcHR5KHRoaXMuaW5wdXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSAnficpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gaG9tZURpciArIFwiL1wiXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uc3RyaW5nLnN0YXJ0c1dpdGgocmVzdWx0LCAnfi8nKSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgnficsIGhvbWVEaXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghXy5zdHJpbmcuc3RhcnRzV2l0aChyZXN1bHQsICcvJykgJiYgIXJlc3VsdC5tYXRjaCgvXlxcdys6XFxcXC8pKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHB3ZCArIFwiL1wiICsgcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfLnN0cmluZy5lbmRzV2l0aChyZXN1bHQsICcuYmtyJylcbiAgICAgICAgICAgICAgICAmJiAhXy5zdHJpbmcuZW5kc1dpdGgocmVzdWx0LCAnLycpKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIFwiLmJrclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kubmV3Rm9sZGVyID0gZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgICAgICAgICBia1V0aWxzLmh0dHBQb3N0KFwiLi4vYmVha2VyL3Jlc3QvZmlsZS1pby9jcmVhdGVEaXJlY3RvcnlcIiwge3BhdGg6IHBhdGh9KVxuICAgICAgICAgICAgICAgIC5jb21wbGV0ZShmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgc2VsZi5zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZmlsZUNob29zZXJTdHJhdGVneS5nZXRTYXZlQnRuRGlzYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmlzRW1wdHkodGhpcy5pbnB1dCkgfHwgXy5zdHJpbmcuZW5kc1dpdGgodGhpcy5pbnB1dCwgJy8nKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZpbGVDaG9vc2VyU3RyYXRlZ3kudHJlZVZpZXdmcy5hcHBseUV4dEZpbHRlciA9IGZhbHNlO1xuICAgICAgICAgIHZhciBmaWxlQ2hvb3NlclRlbXBsYXRlID0gSlNUWyd0ZW1wbGF0ZS9zYXZlbm90ZWJvb2snXSh7aG9tZWRpcjogaG9tZURpciwgcHdkOiBwd2QgfSk7XG4gICAgICAgICAgdmFyIGZpbGVDaG9vc2VyUmVzdWx0SGFuZGxlciA9IGZ1bmN0aW9uIChjaG9zZW5GaWxlUGF0aCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgICAgICAgIHVyaTogY2hvc2VuRmlsZVBhdGgsXG4gICAgICAgICAgICAgIHVyaVR5cGU6IExPQ0FUSU9OX0ZJTEVTWVNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBzZWxmLnNob3dNb2RhbERpYWxvZyhcbiAgICAgICAgICAgICAgZmlsZUNob29zZXJSZXN1bHRIYW5kbGVyLFxuICAgICAgICAgICAgICBmaWxlQ2hvb3NlclRlbXBsYXRlLFxuICAgICAgICAgICAgICBmaWxlQ2hvb3NlclN0cmF0ZWd5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcblxuICAgICAgY29kZU1pcnJvck9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBub3RlYm9va0NlbGxPcCkge1xuICAgICAgICB2YXIgZ29VcE9yTW92ZUZvY3VzVXAgPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIGlmICgkKCcuQ29kZU1pcnJvci1oaW50JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy9jb2RlY29tcGxldGUgaXMgdXAsIHNraXBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNtLmdldEN1cnNvcigpLmxpbmUgPT09IDApIHtcbiAgICAgICAgICAgIG1vdmVGb2N1c1VwKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiZ29MaW5lVXBcIik7XG4gICAgICAgICAgICB2YXIgdG9wID0gY20uY3Vyc29yQ29vcmRzKHRydWUsJ3dpbmRvdycpLnRvcDtcbiAgICAgICAgICAgIGlmICggdG9wIDwgMTUwKVxuICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgdG9wLTE1MCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBnb0Rvd25Pck1vdmVGb2N1c0Rvd24gPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIGlmICgkKCcuQ29kZU1pcnJvci1oaW50JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy9jb2RlY29tcGxldGUgaXMgdXAsIHNraXBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNtLmdldEN1cnNvcigpLmxpbmUgPT09IGNtLmRvYy5zaXplIC0gMSkge1xuICAgICAgICAgICAgbW92ZUZvY3VzRG93bigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZChcImdvTGluZURvd25cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlRm9jdXNEb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gbW92ZSBmb2N1cyB0byBuZXh0IGNvZGUgY2VsbFxuICAgICAgICAgIHZhciB0aGlzQ2VsbElkID0gc2NvcGUuY2VsbG1vZGVsLmlkO1xuICAgICAgICAgIHZhciBuZXh0Q2VsbCA9IG5vdGVib29rQ2VsbE9wLmdldE5leHQodGhpc0NlbGxJZCk7XG4gICAgICAgICAgd2hpbGUgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuYmtOb3RlYm9vay5nZXRGb2N1c2FibGUobmV4dENlbGwuaWQpKSB7XG4gICAgICAgICAgICAgIHNjb3BlLmJrTm90ZWJvb2suZ2V0Rm9jdXNhYmxlKG5leHRDZWxsLmlkKS5mb2N1cygpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5leHRDZWxsID0gbm90ZWJvb2tDZWxsT3AuZ2V0TmV4dChuZXh0Q2VsbC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlRm9jdXNVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIG1vdmUgZm9jdXMgdG8gcHJldiBjb2RlIGNlbGxcbiAgICAgICAgICB2YXIgdGhpc0NlbGxJRCA9IHNjb3BlLmNlbGxtb2RlbC5pZDtcbiAgICAgICAgICB2YXIgcHJldkNlbGwgPSBub3RlYm9va0NlbGxPcC5nZXRQcmV2KHRoaXNDZWxsSUQpO1xuICAgICAgICAgIHdoaWxlIChwcmV2Q2VsbCkge1xuICAgICAgICAgICAgdmFyIHQgPSBzY29wZS5ia05vdGVib29rLmdldEZvY3VzYWJsZShwcmV2Q2VsbC5pZCk7XG4gICAgICAgICAgICBpZiAodCkge1xuICAgICAgICAgICAgICB0LmZvY3VzKCk7XG4gICAgICAgICAgICAgIHZhciB0b3AgPSB0LmNtLmN1cnNvckNvb3Jkcyh0cnVlLCd3aW5kb3cnKS50b3A7XG4gICAgICAgICAgICAgIGlmICggdG9wIDwgMTUwKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCB0b3AtMTUwKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwcmV2Q2VsbCA9IG5vdGVib29rQ2VsbE9wLmdldFByZXYocHJldkNlbGwuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXZhbHVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5ldmFsdWF0ZSgpO1xuICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBldmFsdWF0ZUFuZEdvRG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmV2YWx1YXRlKCk7XG4gICAgICAgICAgbW92ZUZvY3VzRG93bigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzaG93QXV0b0NvbXBsZXRlID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICB2YXIgZ2V0VG9rZW4gPSBmdW5jdGlvbihlZGl0b3IsIGN1cikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvci5nZXRUb2tlbkF0KGN1cik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgZ2V0SGludHMgPSBmdW5jdGlvbihlZGl0b3IsIHNob3dIaW50Q0IsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBjdXIgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBnZXRUb2tlbihlZGl0b3IsIGN1cik7XG4gICAgICAgICAgICB2YXIgY3Vyc29yUG9zID0gZWRpdG9yLmluZGV4RnJvbVBvcyhjdXIpO1xuICAgICAgICAgICAgLy8gV2UgbWlnaHQgd2FudCB0aGlzIGRlZmluZWQgYnkgdGhlIHBsdWdpbi5cbiAgICAgICAgICAgIHZhciBvblJlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHRzLCBtYXRjaGVkX3RleHQsIGRvdEZpeCkge1xuICAgICAgICAgICAgICB2YXIgc3RhcnQgPSB0b2tlbi5zdGFydDtcbiAgICAgICAgICAgICAgdmFyIGVuZCA9IHRva2VuLmVuZDtcbiAgICAgICAgICAgICAgaWYgKGRvdEZpeCAmJiB0b2tlbi5zdHJpbmcgPT09IFwiLlwiKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobWF0Y2hlZF90ZXh0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgKz0gKGN1ci5jaCAtIHRva2VuLnN0YXJ0IC0gbWF0Y2hlZF90ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBtYXRjaGVkX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNob3dIaW50Q0Ioe1xuICAgICAgICAgICAgICAgIGxpc3Q6IF8udW5pcShyZXN1bHRzKSxcbiAgICAgICAgICAgICAgICBmcm9tOiBDb2RlTWlycm9yLlBvcyhjdXIubGluZSwgc3RhcnQpLFxuICAgICAgICAgICAgICAgIHRvOiBDb2RlTWlycm9yLlBvcyhjdXIubGluZSwgZW5kKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY29wZS5hdXRvY29tcGxldGUoY3Vyc29yUG9zLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoY20uZ2V0T3B0aW9uKCdtb2RlJykgPT09ICdodG1sbWl4ZWQnIHx8IGNtLmdldE9wdGlvbignbW9kZScpID09PSAnamF2YXNjcmlwdCcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNpbmcgY29kZSBtaXJyb3JcIik7XG4gICAgICAgICAgICBjbS5leGVjQ29tbWFuZChcImF1dG9jb21wbGV0ZVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICBjbG9zZU9uVW5mb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgYWxpZ25XaXRoV29yZDogdHJ1ZSxcbiAgICAgICAgICAgICAgY29tcGxldGVTaW5nbGU6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBDb2RlTWlycm9yLnNob3dIaW50KGNtLCBnZXRIaW50cywgb3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlQ2VsbFVwID0gZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5tb3ZlVXAoc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlQ2VsbERvd24gPSBmdW5jdGlvbihjbSkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLm1vdmVEb3duKHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZGVsZXRlQ2VsbCA9IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgbm90ZWJvb2tDZWxsT3AuZGVsZXRlKHNjb3BlLmNlbGxtb2RlbC5pZCwgdHJ1ZSk7XG4gICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsaW5lTnVtYmVyczogdHJ1ZSxcbiAgICAgICAgICBtYXRjaEJyYWNrZXRzOiB0cnVlLFxuICAgICAgICAgIGVsZWN0cmljQ2hhcnM6IGZhbHNlLFxuICAgICAgICAgIGV4dHJhS2V5czoge1xuICAgICAgICAgICAgXCJVcFwiIDogZ29VcE9yTW92ZUZvY3VzVXAsXG4gICAgICAgICAgICBcIkRvd25cIiA6IGdvRG93bk9yTW92ZUZvY3VzRG93bixcbiAgICAgICAgICAgIFwiQ3RybC1TXCI6IFwic2F2ZVwiLFxuICAgICAgICAgICAgXCJDbWQtU1wiOiBcInNhdmVcIixcbiAgICAgICAgICAgIFwiQWx0LURvd25cIjogbW92ZUZvY3VzRG93bixcbiAgICAgICAgICAgIFwiQWx0LUpcIjogbW92ZUZvY3VzRG93bixcbiAgICAgICAgICAgIFwiQWx0LVVwXCI6IG1vdmVGb2N1c1VwLFxuICAgICAgICAgICAgXCJBbHQtS1wiOiBtb3ZlRm9jdXNVcCxcbiAgICAgICAgICAgIFwiQ3RybC1FbnRlclwiOiBldmFsdWF0ZSxcbiAgICAgICAgICAgIFwiQ21kLUVudGVyXCI6IGV2YWx1YXRlLFxuICAgICAgICAgICAgXCJTaGlmdC1FbnRlclwiOiBldmFsdWF0ZUFuZEdvRG93bixcbiAgICAgICAgICAgIFwiQ3RybC1TcGFjZVwiOiBzaG93QXV0b0NvbXBsZXRlLFxuICAgICAgICAgICAgXCJDbWQtU3BhY2VcIjogc2hvd0F1dG9Db21wbGV0ZSxcbiAgICAgICAgICAgIFwiQ3RybC1BbHQtVXBcIjogbW92ZUNlbGxVcCxcbiAgICAgICAgICAgIFwiQ21kLUFsdC1VcFwiOiBtb3ZlQ2VsbFVwLFxuICAgICAgICAgICAgXCJDdHJsLUFsdC1Eb3duXCI6IG1vdmVDZWxsRG93bixcbiAgICAgICAgICAgIFwiQ21kLUFsdC1Eb3duXCI6IG1vdmVDZWxsRG93bixcbiAgICAgICAgICAgIFwiQ3RybC1BbHQtRFwiOiBkZWxldGVDZWxsLFxuICAgICAgICAgICAgXCJDbWQtQWx0LURcIjogZGVsZXRlQ2VsbFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIF9ia0FwcEltcGw6IG51bGwsXG4gICAgICBzZXRCa0FwcEltcGw6IGZ1bmN0aW9uKGJrQXBwT3ApIHtcbiAgICAgICAgdGhpcy5fYmtBcHBJbXBsID0gYmtBcHBPcDtcbiAgICAgIH0sXG4gICAgICBnZXRCa0FwcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ia0FwcEltcGw7XG4gICAgICB9LFxuXG4gICAgICBnZXRSZWNlbnRNZW51SXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtSZWNlbnRNZW51LmdldE1lbnVJdGVtcygpO1xuICAgICAgfSxcblxuICAgICAgZ2V0Tm90ZWJvb2tFbGVtZW50OiBmdW5jdGlvbihjdXJyZW50U2NvcGUpIHtcbiAgICAgICAgLy8gV2FsayB1cCB0aGUgc2NvcGUgdHJlZSBhbmQgZmluZCB0aGUgb25lIHRoYXQgaGFzIGFjY2VzcyB0byB0aGVcbiAgICAgICAgLy8gbm90ZWJvb2sgZWxlbWVudCAobm90ZWJvb2sgZGlyZWN0aXZlIHNjb3BlLCBzcGVjaWZpY2FsbHkpXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKGN1cnJlbnRTY29wZS5nZXROb3RlYm9va0VsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tFbGVtZW50KGN1cnJlbnRTY29wZS4kcGFyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudFNjb3BlLmdldE5vdGVib29rRWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcjtcbiAgICAgIH0sXG4gICAgICAvLyBnZW5lcmFsXG4gICAgICBzaG93TW9kYWxEaWFsb2c6IGZ1bmN0aW9uKGNhbGxiYWNrLCB0ZW1wbGF0ZSwgc3RyYXRlZ3kpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgd2luZG93Q2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICBiYWNrZHJvcENsaWNrOiB0cnVlLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdtb2RhbERpYWxvZ0N0cmwnXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGF0dGFjaFN1Ym1pdExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGRvY3VtZW50Lm9uKCdrZXlkb3duLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKGUud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICQoJy5tb2RhbCAubW9kYWwtc3VibWl0JykuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcmVtb3ZlU3VibWl0TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkZG9jdW1lbnQub2ZmKCdrZXlkb3duLm1vZGFsJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gWFhYIC0gdGVtcGxhdGUgaXMgc29tZXRpbWVzIGEgdXJsIG5vdy5cbiAgICAgICAgaWYgKHRlbXBsYXRlLmluZGV4T2YoJ2FwcC90ZW1wbGF0ZS8nKSA9PT0gMCkge1xuICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBtb2RhbERpYWxvZ09wLnNldFN0cmF0ZWd5KHN0cmF0ZWd5KTtcbiAgICAgICAgdmFyIGRkID0gJG1vZGFsLm9wZW4ob3B0aW9ucyk7XG5cbiAgICAgICAgYXR0YWNoU3VibWl0TGlzdGVuZXIoKTtcblxuICAgICAgICBkZC5yZXN1bHQudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZW1vdmVTdWJtaXRMaXN0ZW5lcigpO1xuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVtb3ZlU3VibWl0TGlzdGVuZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRkO1xuICAgICAgfSxcbiAgICAgIHNob3cwQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKG1zZ0JvZHksIG1zZ0hlYWRlcikge1xuICAgICAgICBpZiAoIW1zZ0hlYWRlcikge1xuICAgICAgICAgIG1zZ0hlYWRlciA9IFwiT29wcy4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IFwiPGRpdiBjbGFzcz0nbW9kYWwtaGVhZGVyJz5cIiArXG4gICAgICAgICAgICBcIjxoMT5cIiArIG1zZ0hlYWRlciArIFwiPC9oMT5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiICtcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbW9kYWwtYm9keSc+PHA+XCIgKyBtc2dCb2R5ICsgXCI8L3A+PC9kaXY+XCIgO1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93TW9kYWxEaWFsb2cobnVsbCwgdGVtcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIHNob3cxQnV0dG9uTW9kYWw6IGZ1bmN0aW9uKG1zZ0JvZHksIG1zZ0hlYWRlciwgY2FsbGJhY2ssIGJ0blRleHQsIGJ0bkNsYXNzKSB7XG4gICAgICAgIGlmICghbXNnSGVhZGVyKSB7XG4gICAgICAgICAgbXNnSGVhZGVyID0gXCJPb3BzLi4uXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnRuVGV4dCA9IGJ0blRleHQgPyBidG5UZXh0IDogXCJDbG9zZVwiO1xuICAgICAgICBidG5DbGFzcyA9IGJ0bkNsYXNzID8gXy5pc0FycmF5KGJ0bkNsYXNzKSA/IGJ0bkNsYXNzLmpvaW4oJyAnKSA6IGJ0bkNsYXNzIDogJ2J0bi1wcmltYXJ5JztcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdtb2RhbC1oZWFkZXInPlwiICtcbiAgICAgICAgICAgIFwiPGgxPlwiICsgbXNnSGVhZGVyICsgXCI8L2gxPlwiICtcbiAgICAgICAgICAgIFwiPC9kaXY+XCIgK1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtb2RhbC1ib2R5Jz48cD5cIiArIG1zZ0JvZHkgKyBcIjwvcD48L2Rpdj5cIiArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicgK1xuICAgICAgICAgICAgXCIgICA8YnV0dG9uIGNsYXNzPSdidG4gXCIgKyBidG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZShcXFwiT0tcXFwiKSc+XCIgKyBidG5UZXh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiO1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93TW9kYWxEaWFsb2coY2FsbGJhY2ssIHRlbXBsYXRlKTtcbiAgICAgIH0sXG4gICAgICBzaG93MkJ1dHRvbk1vZGFsOiBmdW5jdGlvbihcbiAgICAgICAgICBtc2dCb2R5LFxuICAgICAgICAgIG1zZ0hlYWRlcixcbiAgICAgICAgICBva0NCLCBjYW5jZWxDQixcbiAgICAgICAgICBva0J0blR4dCwgY2FuY2VsQnRuVHh0LFxuICAgICAgICAgIG9rQnRuQ2xhc3MsIGNhbmNlbEJ0bkNsYXNzKSB7XG4gICAgICAgIGlmICghbXNnSGVhZGVyKSB7XG4gICAgICAgICAgbXNnSGVhZGVyID0gXCJRdWVzdGlvbi4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbG9zZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgb2tDQiA/IG9rQ0IoKSA6IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gY2FuY2VsXG4gICAgICAgICAgICBjYW5jZWxDQiA/IGNhbmNlbENCKCkgOiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgb2tCdG5UeHQgPSBva0J0blR4dCA/IG9rQnRuVHh0IDogXCJPS1wiO1xuICAgICAgICBjYW5jZWxCdG5UeHQgPSBjYW5jZWxCdG5UeHQgPyBjYW5jZWxCdG5UeHQgOiBcIkNhbmNlbFwiO1xuICAgICAgICBva0J0bkNsYXNzID0gb2tCdG5DbGFzcyA/IF8uaXNBcnJheShva0J0bkNsYXNzKSA/IG9rQnRuQ2xhc3Muam9pbignICcpIDogb2tCdG5DbGFzcyA6ICdidG4tZGVmYXVsdCc7XG4gICAgICAgIGNhbmNlbEJ0bkNsYXNzID0gY2FuY2VsQnRuQ2xhc3MgPyBfLmlzQXJyYXkoY2FuY2VsQnRuQ2xhc3MpID8gY2FuY2VsQnRuQ2xhc3Muam9pbignICcpIDogY2FuY2VsQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9J21vZGFsLWhlYWRlcic+XCIgK1xuICAgICAgICAgICAgXCI8aDE+XCIgKyBtc2dIZWFkZXIgKyBcIjwvaDE+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J21vZGFsLWJvZHknPjxwPlwiICsgbXNnQm9keSArIFwiPC9wPjwvZGl2PlwiICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JyArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J1llcyBidG4gXCIgKyBva0J0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKFxcXCJPS1xcXCIpJz5cIiArIG9rQnRuVHh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J0NhbmNlbCBidG4gXCIgKyBjYW5jZWxCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZSgpJz5cIiArIGNhbmNlbEJ0blR4dCArIFwiPC9idXR0b24+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsRGlhbG9nKGNsb3NlLCB0ZW1wbGF0ZSk7XG4gICAgICB9LFxuICAgICAgc2hvdzNCdXR0b25Nb2RhbDogZnVuY3Rpb24oXG4gICAgICAgICAgbXNnQm9keSwgbXNnSGVhZGVyLFxuICAgICAgICAgIHllc0NCLCBub0NCLCBjYW5jZWxDQixcbiAgICAgICAgICB5ZXNCdG5UeHQsIG5vQnRuVHh0LCBjYW5jZWxCdG5UeHQsXG4gICAgICAgICAgeWVzQnRuQ2xhc3MsIG5vQnRuQ2xhc3MsIGNhbmNlbEJ0bkNsYXNzKSB7XG4gICAgICAgIGlmICghbXNnSGVhZGVyKSB7XG4gICAgICAgICAgbXNnSGVhZGVyID0gXCJRdWVzdGlvbi4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbG9zZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwiWWVzXCIpIHtcbiAgICAgICAgICAgIHllc0NCID8geWVzQ0IoKSA6IG51bGw7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiTm9cIikge1xuICAgICAgICAgICAgbm9DQiA/IG5vQ0IoKSA6IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gY2FuY2VsXG4gICAgICAgICAgICBjYW5jZWxDQiA/IGNhbmNlbENCKCkgOiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeWVzQnRuVHh0ID0geWVzQnRuVHh0ID8geWVzQnRuVHh0IDogXCJZZXNcIjtcbiAgICAgICAgbm9CdG5UeHQgPSBub0J0blR4dCA/IG5vQnRuVHh0IDogXCJOb1wiO1xuICAgICAgICBjYW5jZWxCdG5UeHQgPSBjYW5jZWxCdG5UeHQgPyBjYW5jZWxCdG5UeHQgOiBcIkNhbmNlbFwiO1xuICAgICAgICB5ZXNCdG5DbGFzcyA9IHllc0J0bkNsYXNzID8gXy5pc0FycmF5KHllc0J0bkNsYXNzKSA/IG9rQnRuQ2xhc3Muam9pbignICcpIDogeWVzQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICBub0J0bkNsYXNzID0gbm9CdG5DbGFzcyA/IF8uaXNBcnJheShub0J0bkNsYXNzKSA/IG5vQnRuQ2xhc3Muam9pbignICcpIDogbm9CdG5DbGFzcyA6ICdidG4tZGVmYXVsdCc7XG4gICAgICAgIGNhbmNlbEJ0bkNsYXNzID0gY2FuY2VsQnRuQ2xhc3MgPyBfLmlzQXJyYXkoY2FuY2VsQnRuQ2xhc3MpID8gY2FuY2VsQnRuQ2xhc3Muam9pbignICcpIDogY2FuY2VsQnRuQ2xhc3MgOiAnYnRuLWRlZmF1bHQnO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIjxkaXYgY2xhc3M9J21vZGFsLWhlYWRlcic+XCIgK1xuICAgICAgICAgICAgXCI8aDE+XCIgKyBtc2dIZWFkZXIgKyBcIjwvaDE+XCIgK1xuICAgICAgICAgICAgXCI8L2Rpdj5cIiArXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J21vZGFsLWJvZHknPjxwPlwiICsgbXNnQm9keSArIFwiPC9wPjwvZGl2PlwiICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JyArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J3llcyBidG4gXCIgKyB5ZXNCdG5DbGFzcyArXCInIG5nLWNsaWNrPSdjbG9zZShcXFwiWWVzXFxcIiknPlwiICsgeWVzQnRuVHh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIiAgIDxidXR0b24gY2xhc3M9J25vIGJ0biBcIiArIG5vQnRuQ2xhc3MgK1wiJyBuZy1jbGljaz0nY2xvc2UoXFxcIk5vXFxcIiknPlwiICsgbm9CdG5UeHQgKyBcIjwvYnV0dG9uPlwiICtcbiAgICAgICAgICAgIFwiICAgPGJ1dHRvbiBjbGFzcz0nY2FuY2VsIGJ0biBcIiArIGNhbmNlbEJ0bkNsYXNzICtcIicgbmctY2xpY2s9J2Nsb3NlKCknPlwiICsgY2FuY2VsQnRuVHh0ICsgXCI8L2J1dHRvbj5cIiArXG4gICAgICAgICAgICBcIjwvZGl2PlwiO1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93TW9kYWxEaWFsb2coY2xvc2UsIHRlbXBsYXRlKTtcbiAgICAgIH0sXG4gICAgICBnZXRGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3koKTtcbiAgICAgIH0sXG4gICAgICBzaG93RnVsbE1vZGFsRGlhbG9nOiBmdW5jdGlvbihjYWxsYmFjaywgdGVtcGxhdGUsIGNvbnRyb2xsZXIsIGRzY29wZSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB3aW5kb3dDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgICAgIGJhY2tkcm9wQ2xpY2s6IHRydWUsXG4gICAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlcixcbiAgICAgICAgICByZXNvbHZlOiB7IGRzY29wZTogZnVuY3Rpb24oKXsgcmV0dXJuIGRzY29wZTsgfSB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRlbXBsYXRlLmluZGV4T2YoJ2h0dHA6JykgIT09IDApIHtcbiAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlVXJsID0gdGVtcGxhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZCA9ICRtb2RhbC5vcGVuKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gZGQucmVzdWx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2hvd0xhbmd1YWdlTWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHdpbmRvd0NsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdiZWFrZXItc2FuZGJveCcsXG4gICAgICAgICAgYmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICAgICAgYmFja2Ryb3BDbGljazogdHJ1ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiAncGx1Z2luTWFuYWdlckN0cmwnLFxuICAgICAgICAgIHRlbXBsYXRlOiBKU1RbJ21haW5hcHAvY29tcG9uZW50cy9wbHVnaW5tYW5hZ2VyL3BsdWdpbm1hbmFnZXInXSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGRkID0gJG1vZGFsLm9wZW4ob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBkZC5yZXN1bHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYmtDb3JlTWFuYWdlcjtcbiAgfSk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ21vZGFsRGlhbG9nT3AnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3N0cmF0ZWd5ID0ge307XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldFN0cmF0ZWd5OiBmdW5jdGlvbihzdHJhdGVneSkge1xuICAgICAgICBfc3RyYXRlZ3kgPSBzdHJhdGVneTtcbiAgICAgIH0sXG4gICAgICBnZXRTdHJhdGVneTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfc3RyYXRlZ3k7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmNvbnRyb2xsZXIoJ21vZGFsRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJG1vZGFsSW5zdGFuY2UsIG1vZGFsRGlhbG9nT3ApIHtcbiAgICAkc2NvcGUuZ2V0U3RyYXRlZ3kgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtb2RhbERpYWxvZ09wLmdldFN0cmF0ZWd5KCk7XG4gICAgfTtcbiAgICAkcm9vdFNjb3BlLiRvbignbW9kYWwuc3VibWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuY2xvc2UoJHNjb3BlLmdldFN0cmF0ZWd5KCkuZ2V0UmVzdWx0KCkpO1xuICAgIH0pO1xuICAgICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UocmVzdWx0KTtcbiAgICB9O1xuICB9KTtcblxuICAvKipcbiAgICogRGlyZWN0aXZlIHRvIHNob3cgYSBtb2RhbCBkaWFsb2cgdGhhdCBkb2VzIGZpbGVuYW1lIGlucHV0LlxuICAgKi9cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnZmlsZUFjdGlvbkRpYWxvZycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzY29wZTogeyBhY3Rpb25OYW1lOiAnQCcsIGlucHV0SWQ6ICdAJywgY2xvc2U6ICc9JyB9LFxuICAgICAgdGVtcGxhdGU6IEpTVFsndGVtcGxhdGUvZmlsZWFjdGlvbmRpYWxvZyddKCksXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5maW5kKCdpbnB1dCcpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5kZWJ1Z1xuICogVGhpcyBtb2R1bGUgaXMgZm9yIGRlYnVnIG9ubHkgYW5kIHNob3VsZCBuZXZlciBiZSB1c2VkIGluIGNvZGVcbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcImJrLmRlYnVnXCIsIFtcbiAgICBcImJrLmFuZ3VsYXJVdGlsc1wiLFxuICAgIFwiYmsubWFpbkFwcFwiLFxuICAgICdiay5jZWxsTWVudVBsdWdpbk1hbmFnZXInLFxuICAgIFwiYmsuY29yZVwiLFxuICAgICdiay5zZXNzaW9uTWFuYWdlcicsXG4gICAgXCJiay5vdXRwdXRMb2dcIixcbiAgICBcImJrLnJlY2VudE1lbnVcIixcbiAgICBcImJrLnNlc3Npb25cIixcbiAgICBcImJrLnNoYXJlXCIsXG4gICAgXCJiay50cmFja1wiLFxuICAgIFwiYmsudXRpbHNcIixcbiAgICBcImJrLmNvbWV0ZFV0aWxzXCIsXG4gICAgXCJiay5jb21tb25VdGlsc1wiLFxuICAgIFwiYmsubWVudVBsdWdpbk1hbmFnZXJcIixcbiAgICBcImJrLmV2YWx1YXRlUGx1Z2luTWFuYWdlclwiLFxuICAgIFwiYmsuZXZhbHVhdG9yTWFuYWdlclwiLFxuICAgIFwiYmsuZXZhbHVhdGVKb2JNYW5hZ2VyXCIsXG4gICAgXCJiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXJcIlxuICBdKTtcbiAgbW9kdWxlLmZhY3RvcnkoXCJia0RlYnVnXCIsIGZ1bmN0aW9uKFxuICAgICAgJGluamVjdG9yLCBhbmd1bGFyVXRpbHMsIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLCBia0NlbGxNZW51UGx1Z2luTWFuYWdlciwgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXIsIGJrT3V0cHV0TG9nLCBia1JlY2VudE1lbnUsIGJrU2Vzc2lvbiwgYmtTaGFyZSxcbiAgICAgIGJrVHJhY2ssIGJrVXRpbHMsIGNvbWV0ZFV0aWxzLCBjb21tb25VdGlscywgYmtNZW51UGx1Z2luTWFuYWdlciwgYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIsXG4gICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICAkaW5qZWN0b3I6ICRpbmplY3RvcixcbiAgICAgIGFuZ3VsYXJVdGlsczogYW5ndWxhclV0aWxzLFxuICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXI6IGJrRXZhbHVhdGVKb2JNYW5hZ2VyLFxuICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXI6IGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcjogYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrQ29yZU1hbmFnZXI6IGJrQ29yZU1hbmFnZXIsXG4gICAgICBia091dHB1dExvZzogYmtPdXRwdXRMb2csXG4gICAgICBia1JlY2VudE1lbnU6IGJrUmVjZW50TWVudSxcbiAgICAgIGJrU2Vzc2lvbjogYmtTZXNzaW9uLFxuICAgICAgYmtTaGFyZTogYmtTaGFyZSxcbiAgICAgIGJrVHJhY2s6IGJrVHJhY2ssXG4gICAgICBia1V0aWxzOiBia1V0aWxzLFxuICAgICAgY29tZXRkVXRpbHM6IGNvbWV0ZFV0aWxzLFxuICAgICAgY29tbW9uVXRpbHM6IGNvbW1vblV0aWxzLFxuICAgICAgYmtNZW51UGx1Z2luTWFuYWdlcjogYmtNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyOiBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcjogYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXI6IGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLFxuICAgICAgZGVidWdVSTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGJrSGVscGVyLmdldEJrTm90ZWJvb2tWaWV3TW9kZWwoKS50b2dnbGVEZWJ1Z2dpbmcoKTtcbiAgICAgICAgYmtIZWxwZXIucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmV2YWx1YXRlUGx1Z2luTWFuYWdlclxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXInLCBbJ2JrLnV0aWxzJ10pO1xuICBtb2R1bGUuZmFjdG9yeSgnYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzLCAkbW9kYWwpIHtcbiAgICB2YXIgbmFtZVRvVXJsTWFwID0ge307XG4gICAgdmFyIG5hbWVUb1Zpc3VhbFBhcmFtcyA9IHt9O1xuICAgIHZhciBwbHVnaW5zID0ge307XG4gICAgdmFyIGxvYWRpbmdJblByb2dyZXNzUGx1Z2lucyA9IFtdO1xuXG4gICAgdmFyIGV2YWx1YXRvckxvYWRRdWV1ZSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfcXVldWUgPSBbXTtcbiAgICAgIHZhciBfbG9hZEluUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHZhciBsb2FkRXZhbHVhdG9yID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgYmtIZWxwZXIuc2hvd1N0YXR1cyhcIkxvYWRpbmcgcGx1Z2luIFwiK2V2Lm5hbWUpO1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkTW9kdWxlKGV2LnVybCwgZXYubmFtZSk7XG4gICAgICB9O1xuICAgICAgdmFyIGRvTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX2xvYWRJblByb2dyZXNzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIF9sb2FkSW5Qcm9ncmVzcyA9IF9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoX2xvYWRJblByb2dyZXNzKSB7XG4gICAgICAgICAgaWYgKHBsdWdpbnNbX2xvYWRJblByb2dyZXNzLm5hbWVdIHx8IHBsdWdpbnNbX2xvYWRJblByb2dyZXNzLnVybF0pIHsgLy8gcGx1Z2luIGNvZGUgYWxyZWFkeSBsb2FkZWRcbiAgICAgICAgICAgIGlmIChwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy5uYW1lXSkge1xuICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MucmVzb2x2ZShwbHVnaW5zW19sb2FkSW5Qcm9ncmVzcy5uYW1lXSlcbiAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9sb2FkSW5Qcm9ncmVzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnRoZW4oZG9OZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9sb2FkSW5Qcm9ncmVzcy5yZXNvbHZlKHBsdWdpbnNbX2xvYWRJblByb2dyZXNzLnVybF0pXG4gICAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfbG9hZEluUHJvZ3Jlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKGRvTmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBsb2FkRXZhbHVhdG9yKF9sb2FkSW5Qcm9ncmVzcylcbiAgICAgICAgICAudGhlbihfbG9hZEluUHJvZ3Jlc3MucmVzb2x2ZSwgIF9sb2FkSW5Qcm9ncmVzcy5yZWplY3QpXG4gICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYmtIZWxwZXIuY2xlYXJTdGF0dXMoXCJMb2FkaW5nIHBsdWdpbiBcIiArIF9sb2FkSW5Qcm9ncmVzcy5uYW1lKVxuICAgICAgICAgICAgX2xvYWRJblByb2dyZXNzID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oZG9OZXh0KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkOiBmdW5jdGlvbihldmwpIHtcbiAgICAgICAgICBfcXVldWUucHVzaChldmwpO1xuICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZG9OZXh0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEtub3duRXZhbHVhdG9yUGx1Z2luczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuYW1lVG9VcmxNYXA7XG4gICAgICB9LFxuICAgICAgYWRkTmFtZVRvVXJsRW50cnk6IGZ1bmN0aW9uKG5hbWUsIHVybCkge1xuICAgICAgICBpZiAoIHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnICkge1xuICAgICAgICAgIG5hbWVUb1VybE1hcFtuYW1lXSA9IHVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuYW1lVG9VcmxNYXBbbmFtZV0gPSB1cmwudXJsO1xuICAgICAgICAgIGRlbGV0ZSB1cmwudXJsO1xuICAgICAgICAgIG5hbWVUb1Zpc3VhbFBhcmFtc1tuYW1lXSA9IHVybDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldFZpc3VhbFBhcmFtczogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICByZXR1cm4gbmFtZVRvVmlzdWFsUGFyYW1zW25hbWVdO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvckZhY3RvcnlBbmRTaGVsbDogZnVuY3Rpb24oZXZhbHVhdG9yU2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIG5hbWVPclVybCA9IGV2YWx1YXRvclNldHRpbmdzLnBsdWdpbjtcbiAgICAgICAgaWYgKHBsdWdpbnNbbmFtZU9yVXJsXSkgeyAvLyBwbHVnaW4gY29kZSBhbHJlYWR5IGxvYWRlZFxuICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICBwbHVnaW5zW25hbWVPclVybF0uZ2V0RXZhbHVhdG9yRmFjdG9yeSgpLnRoZW4oZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICAgICAgICAgaWYgKGZhY3RvcnkgIT09IHVuZGVmaW5lZCAmJiBmYWN0b3J5LmNyZWF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZShldmFsdWF0b3JTZXR0aW5ncykudGhlbihmdW5jdGlvbihldikgeyBkZWZlcnJlZC5yZXNvbHZlKGV2KTsgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJubyBmYWN0b3J5IGZvciBldmFsdWF0b3IgcGx1Z2luXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICB2YXIgbmFtZSwgdXJsO1xuICAgICAgICAgIGlmIChuYW1lVG9VcmxNYXBbbmFtZU9yVXJsXSkge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWVPclVybDtcbiAgICAgICAgICAgIHVybCA9IG5hbWVUb1VybE1hcFtuYW1lT3JVcmxdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lID0gXCJcIjtcbiAgICAgICAgICAgIHVybCA9IG5hbWVPclVybDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbG9hZEpvYiA9IHtcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgIHJlc29sdmU6IGZ1bmN0aW9uKGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoZXgubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbnNbZXgubmFtZV0gPSBleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkobmFtZSkgJiYgbmFtZSAhPT0gZXgubmFtZSkge1xuICAgICAgICAgICAgICAgICAgcGx1Z2luc1tuYW1lXSA9IGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZXguZ2V0RXZhbHVhdG9yRmFjdG9yeSgpXG4gICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWN0b3J5ICE9PSB1bmRlZmluZWQgJiYgZmFjdG9yeS5jcmVhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZShldmFsdWF0b3JTZXR0aW5ncykudGhlbihmdW5jdGlvbihldikgeyBkZWZlcnJlZC5yZXNvbHZlKGV2KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgJG1vZGFsLm9wZW4oe2JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3BDbGljazogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NsYXNzOiAnYmVha2VyLXNhbmRib3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2JlYWtlci1zYW5kYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBKU1RbJ2hlbHBlcnMvcGx1Z2luLWxvYWQtZXJyb3InXSh7cGx1Z2luSWQ6IG5hbWV9KX0pO1xuICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIm5vIGZhY3RvcnkgZm9yIGV2YWx1YXRvciBwbHVnaW5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIG5ldmVyIGNhbGxlZC4gIEluc3RlYWQgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIFwidGhlblwiIGNsYXVzZSBhYm92ZSBpcyBjYWxsZWQgYnV0IGZhY3RvcnkgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZWZpbmVkLiAgVW5rbm93biB3aHkgWFhYLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShleC5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwbHVnaW5zW2V4Lm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KG5hbWUpICYmIG5hbWUgIT09IGV4Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGx1Z2luc1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzRW1wdHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJmYWlsZWQgdG8gbG9hZCBwbHVnaW46IFwiICsgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJmYWlsZWQgdG8gbG9hZCBwbHVnaW46IFwiICsgbmFtZSArIFwiIGF0IFwiICsgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJlamVjdDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBjYWxsZWQgaWYgdGhlIFVSTCBpcyBiYWQgb3IgdGhlcmUgaXMgYSBzeW50YXggZXJyb3IgaW4gdGhlIEpTLlxuICAgICAgICAgICAgICAgIGJrSGVscGVyLnNob3dUcmFuc2llbnRTdGF0dXMoXCJGYWlsZWQgdG8gZmluZCBwbHVnaW4gXCIrbmFtZStcIjogXCIrZXJyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZmFpbGVkIHRvIGZpbmQgcGx1Z2luOiBcIiArIHVybCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImZhaWxlZCB0byBmaW5kIHBsdWdpbjogXCIgKyBuYW1lICsgXCIgYXQgXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgZXZhbHVhdG9yTG9hZFF1ZXVlLmFkZChsb2FkSm9iKTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNyZWF0ZUV2YWx1YXRvclRoZW5FeGl0OiBmdW5jdGlvbihzZXR0aW5ncykge1xuICAgICAgICB2YXIgdGhlU2hlbGw7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV2YWx1YXRvckZhY3RvcnlBbmRTaGVsbChzZXR0aW5ncylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgICAgaWYgKGV2YWx1YXRvci5leGl0KSB7XG4gICAgICAgICAgICBldmFsdWF0b3IuZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgXyhwbHVnaW5zKS5maWx0ZXIoZnVuY3Rpb24oYVNoZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYVNoZWxsICE9PSB0aGVTaGVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuaGVscGVyXG4gKiBUaGUgYmtIZWxwZXIgc2hvdWxkIGJlIGEgc3Vic2V0IG9mIGJrQ29yZSB1dGlsaXRpZXMgdGhhdCBhcmUgZXhwb3NlZCBmb3JcbiAqIHVzYWdlcyBleHRlcm5hbCB0byBCZWFrZXIuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmhlbHBlcicsIFsnYmsudXRpbHMnLCAnYmsuY29yZScsICdiay5zaGFyZScsICdiay5kZWJ1ZyddKTtcbiAgLyoqXG4gICAqIGJrSGVscGVyXG4gICAqIC0gc2hvdWxkIGJlIHRoZSBvbmx5IHRoaW5nIHBsdWdpbnMgZGVwZW5kIG9uIHRvIGludGVyYWN0IHdpdGggZ2VuZXJhbCBiZWFrZXIgc3R1ZmZzIChvdGhlciB0aGFuXG4gICAqIGNvbmZvcm1pbmcgdG8gdGhlIEFQSSBzcGVjKVxuICAgKiAtIGV4Y2VwdCBwbHVnaW5zLCBub3RoaW5nIHNob3VsZCBkZXBlbmRzIG9uIGJrSGVscGVyXG4gICAqIC0gd2UndmUgbWFkZSB0aGlzIGdsb2JhbC4gV2Ugc2hvdWxkIHJldmlzaXQgdGhpcyBkZWNpc2lvbiBhbmQgZmlndXJlIG91dCB0aGUgYmVzdCB3YXkgdG8gbG9hZFxuICAgKiAgIHBsdWdpbnMgZHluYW1pY2FsbHlcbiAgICogLSBpdCBtb3N0bHkgc2hvdWxkIGp1c3QgYmUgYSBzdWJzZXQgb2YgYmtVdGlsXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnYmtIZWxwZXInLCBmdW5jdGlvbihia1V0aWxzLCBia0NvcmVNYW5hZ2VyLCBia1NoYXJlLCBia0RlYnVnKSB7XG4gICAgdmFyIGdldEN1cnJlbnRBcHAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRCa05vdGVib29rV2lkZ2V0XCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYmtIZWxwZXIgPSB7XG4gICAgICAvLyBlbmFibGUgZGVidWdcbiAgICAgIGRlYnVnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmJrRGVidWcgPSBia0RlYnVnO1xuICAgICAgfSxcblxuICAgICAgLy8gYmVha2VyIChyb290KVxuICAgICAgZ290b0NvbnRyb2xQYW5lbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdvdG9Db250cm9sUGFuZWwoKTtcbiAgICAgIH0sXG4gICAgICBvcGVuTm90ZWJvb2s6IGZ1bmN0aW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLm9wZW5Ob3RlYm9vayhub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCk7XG4gICAgICB9LFxuICAgICAgaW1wb3J0Tm90ZWJvb2tEaWFsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5pbXBvcnROb3RlYm9va0RpYWxvZygpO1xuICAgICAgfSxcbiAgICAgIC8vIEVtcHR5IHRydWUgbWVhbnMgdHJ1bHkgZW1wdHkgbmV3IHNlc3Npb24uXG4gICAgICAvLyBvdGhlcndpc2UgdXNlIHRoZSBkZWZhdWx0IG5vdGVib29rLlxuICAgICAgbmV3U2Vzc2lvbjogZnVuY3Rpb24oZW1wdHkpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIubmV3U2Vzc2lvbihlbXB0eSk7XG4gICAgICB9LFxuXG4gICAgICAvLyBjdXJyZW50IGFwcFxuICAgICAgZ2V0Q3VycmVudEFwcE5hbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV8uaXNFbXB0eShnZXRDdXJyZW50QXBwKCkubmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiVW5rbm93biBBcHBcIjtcbiAgICAgIH0sXG4gICAgICBoYXNTZXNzaW9uSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldFNlc3Npb25JZCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBnZXRTZXNzaW9uSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldFNlc3Npb25JZCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0U2Vzc2lvbklkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRTZXNzaW9uSWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXROb3RlYm9va01vZGVsKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXROb3RlYm9va01vZGVsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXROb3RlYm9va01vZGVsXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0QmVha2VyT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5nZXRCZWFrZXJPYmplY3QpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmdldEJlYWtlck9iamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0QmVha2VyT2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tFbGVtZW50OiBmdW5jdGlvbihjdXJyZW50U2NvcGUpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tFbGVtZW50KGN1cnJlbnRTY29wZSk7XG4gICAgICB9LFxuICAgICAgY29sbGFwc2VBbGxTZWN0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuY29sbGFwc2VBbGxTZWN0aW9ucykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuY29sbGFwc2VBbGxTZWN0aW9ucygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgY29sbGFwc2VBbGxTZWN0aW9uc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsb3NlTm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmNsb3NlTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmNsb3NlTm90ZWJvb2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGNsb3NlTm90ZWJvb2tcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzYXZlTm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNhdmVOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2F2ZU5vdGVib29rKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzYXZlTm90ZWJvb2tcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzYXZlTm90ZWJvb2tBczogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUpIHtcbiAgICAgICAgaWYgKGdldEN1cnJlbnRBcHAoKS5zYXZlTm90ZWJvb2tBcykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2F2ZU5vdGVib29rQXMobm90ZWJvb2tVcmksIHVyaVR5cGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2F2ZU5vdGVib29rQXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYXNDb2RlQ2VsbDogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGUpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmhhc0NvZGVDZWxsKHRvRXZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbHVhdGU6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5ldmFsdWF0ZSh0b0V2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZXZhbHVhdGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmFsdWF0ZVJvb3Q6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlUm9vdCkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGVSb290KHRvRXZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBldmFsdWF0ZVJvb3RcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmFsdWF0ZUNvZGU6IGZ1bmN0aW9uKGV2YWx1YXRvciwgY29kZSkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmV2YWx1YXRlQ29kZSkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZXZhbHVhdGVDb2RlKGV2YWx1YXRvciwgY29kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBldmFsdWF0ZUNvZGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRFdmFsdWF0b3JNZW51SXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmdldEV2YWx1YXRvck1lbnVJdGVtcykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0RXZhbHVhdG9yTWVudUl0ZW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBnZXRFdmFsdWF0b3JNZW51SXRlbXNcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2dnbGVOb3RlYm9va0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkudG9nZ2xlTm90ZWJvb2tMb2NrZWQpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnRvZ2dsZU5vdGVib29rTG9ja2VkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCB0b2dnbGVOb3RlYm9va0xvY2tlZFwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmlzTm90ZWJvb2tMb2NrZWQpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGlzTm90ZWJvb2tMb2NrZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNob3dBbm9ueW1vdXNUcmFja2luZ0RpYWxvZykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2hvd0Fub255bW91c1RyYWNraW5nRGlhbG9nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzaG93QW5vbnltb3VzVHJhY2tpbmdEaWFsb2dcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaG93U3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNob3dTdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNob3dTdGF0dXMobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2hvd1N0YXR1c1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZVN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkudXBkYXRlU3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IHVwZGF0ZVN0YXR1c1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldFN0YXR1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0U3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRTdGF0dXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldFN0YXR1c1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsZWFyU3RhdHVzOiBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLmNsZWFyU3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5jbGVhclN0YXR1cyhtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBjbGVhclN0YXR1c1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNob3dUcmFuc2llbnRTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2hvd1RyYW5zaWVudFN0YXR1cykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2hvd1RyYW5zaWVudFN0YXR1cyhtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzaG93VHJhbnNpZW50U3RhdHVzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0RXZhbHVhdG9ycykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuZ2V0RXZhbHVhdG9ycygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgZ2V0RXZhbHVhdG9yc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldENvZGVDZWxsczogZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuZ2V0Q29kZUNlbGxzKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRBcHAoKS5nZXRDb2RlQ2VsbHMoZmlsdGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VycmVudCBhcHAgZG9lc24ndCBzdXBwb3J0IGdldENvZGVDZWxsc1wiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldENvZGVDZWxsQm9keTogZnVuY3Rpb24obmFtZSwgY29kZSkge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsQm9keSkge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2V0Q29kZUNlbGxCb2R5KG5hbWUsY29kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzZXRDb2RlQ2VsbEJvZHlcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRDb2RlQ2VsbEV2YWx1YXRvcjogZnVuY3Rpb24obmFtZSwgZXZhbHVhdG9yKSB7XG4gICAgICAgIGlmIChnZXRDdXJyZW50QXBwKCkuc2V0Q29kZUNlbGxFdmFsdWF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsRXZhbHVhdG9yKG5hbWUsIGV2YWx1YXRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkN1cnJlbnQgYXBwIGRvZXNuJ3Qgc3VwcG9ydCBzZXRDb2RlQ2VsbEV2YWx1YXRvclwiKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldENvZGVDZWxsVGFnczogZnVuY3Rpb24obmFtZSwgdGFncykge1xuICAgICAgICBpZiAoZ2V0Q3VycmVudEFwcCgpLnNldENvZGVDZWxsVGFncykge1xuICAgICAgICAgIHJldHVybiBnZXRDdXJyZW50QXBwKCkuc2V0Q29kZUNlbGxUYWdzKG5hbWUsIHRhZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDdXJyZW50IGFwcCBkb2Vzbid0IHN1cHBvcnQgc2V0Q29kZUNlbGxUYWdzXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gYmstbm90ZWJvb2tcbiAgICAgIHNoYXJlTm90ZWJvb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgaWYgKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gYmtOb3RlYm9vay5zaGFyZUFuZE9wZW5QdWJsaXNoZWQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUFsbE91dHB1dENlbGxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suZGVsZXRlQWxsT3V0cHV0Q2VsbHMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldEJrTm90ZWJvb2tWaWV3TW9kZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgaWYgKGJrTm90ZWJvb2spIHtcbiAgICAgICAgICByZXR1cm4gYmtOb3RlYm9vay5nZXRWaWV3TW9kZWwoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldElucHV0Q2VsbEtleU1hcE1vZGU6IGZ1bmN0aW9uKGtleU1hcE1vZGUpIHtcbiAgICAgICAgdmFyIGJrTm90ZWJvb2sgPSBnZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgICAgIGlmIChia05vdGVib29rKSB7XG4gICAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2suc2V0Q01LZXlNYXBNb2RlKGtleU1hcE1vZGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0SW5wdXRDZWxsS2V5TWFwTW9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICBpZiAoYmtOb3RlYm9vaykge1xuICAgICAgICAgIHJldHVybiBia05vdGVib29rLmdldENNS2V5TWFwTW9kZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBsb3cgbGV2ZWwgdXRpbHMgKGJrVXRpbHMpXG4gICAgICByZWZyZXNoUm9vdFNjb3BlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgfSxcbiAgICAgIGxvYWRKUzogZnVuY3Rpb24odXJsLCBzdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRKUyh1cmwsIHN1Y2Nlc3MpO1xuICAgICAgfSxcbiAgICAgIGxvYWRDU1M6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkQ1NTKHVybCk7XG4gICAgICB9LFxuICAgICAgbG9hZExpc3Q6IGZ1bmN0aW9uKHVybCwgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5sb2FkTGlzdCh1cmwsIHN1Y2Nlc3MsIGZhaWx1cmUpO1xuICAgICAgfSxcbiAgICAgIGZpbmRUYWJsZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5maW5kVGFibGUoZWxlbSk7XG4gICAgICB9LFxuICAgICAgZ2VuZXJhdGVJZDogZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmdlbmVyYXRlSWQobGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICBzZXJ2ZXJVcmw6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuc2VydmVyVXJsKHBhdGgpO1xuICAgICAgfSxcbiAgICAgIGZpbGVVcmw6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuZmlsZVVybChwYXRoKTtcbiAgICAgIH0sXG4gICAgICBodHRwR2V0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuaHR0cEdldCh1cmwsIGRhdGEpO1xuICAgICAgfSxcbiAgICAgIGh0dHBQb3N0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuaHR0cFBvc3QodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBuZXdEZWZlcnJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICB9LFxuICAgICAgbmV3UHJvbWlzZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMubmV3UHJvbWlzZSh2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgYWxsOiBmdW5jdGlvbihwcm9taXNlcykge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5hbGwocHJvbWlzZXMpO1xuICAgICAgfSxcbiAgICAgIGZjYWxsOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmZjYWxsKGZ1bmMpO1xuICAgICAgfSxcbiAgICAgIHRpbWVvdXQ6IGZ1bmN0aW9uKGZ1bmMsIG1zKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLnRpbWVvdXQoZnVuYyxtcyk7XG4gICAgICB9LFxuICAgICAgY2FuY2VsVGltZW91dDogZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5jYW5jZWxUaW1lb3V0KHByb21pc2UpO1xuICAgICAgfSxcbiAgICAgIGdldEhvbWVEaXJlY3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5nZXRIb21lRGlyZWN0b3J5KCk7XG4gICAgICB9LFxuICAgICAgc2F2ZUZpbGU6IGZ1bmN0aW9uKHBhdGgsIGNvbnRlbnRBc0pzb24sIG92ZXJ3cml0ZSkge1xuICAgICAgICByZXR1cm4gYmtVdGlscy5zYXZlRmlsZShwYXRoLCBjb250ZW50QXNKc29uLCBvdmVyd3JpdGUpO1xuICAgICAgfSxcbiAgICAgIGxvYWRGaWxlOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmxvYWRGaWxlKHBhdGgpO1xuICAgICAgfSxcblxuICAgICAgLy8gdXRpbHMgKGJrQ29yZSlcbiAgICAgIHNldE5vdGVib29rSW1wb3J0ZXI6IGZ1bmN0aW9uKGZvcm1hdCwgaW1wb3J0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2V0Tm90ZWJvb2tJbXBvcnRlcihmb3JtYXQsIGltcG9ydGVyKTtcbiAgICAgIH0sXG4gICAgICBzZXRGaWxlTG9hZGVyOiBmdW5jdGlvbih1cmlUeXBlLCBmaWxlTG9hZGVyKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNldEZpbGVMb2FkZXIodXJpVHlwZSwgZmlsZUxvYWRlcik7XG4gICAgICB9LFxuICAgICAgc2V0RmlsZVNhdmVyOiBmdW5jdGlvbih1cmlUeXBlLCBmaWxlU2F2ZXIpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2V0RmlsZVNhdmVyKHVyaVR5cGUsIGZpbGVTYXZlcik7XG4gICAgICB9LFxuICAgICAgc2hvd0RlZmF1bHRTYXZpbmdGaWxlQ2hvb3NlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3dEZWZhdWx0U2F2aW5nRmlsZUNob29zZXIoKTtcbiAgICAgIH0sXG4gICAgICBnZXRSZWNlbnRNZW51SXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRSZWNlbnRNZW51SXRlbXMoKTtcbiAgICAgIH0sXG4gICAgICBzaG93TW9kYWxEaWFsb2c6IGZ1bmN0aW9uKGNhbGxiYWNrLCB0ZW1wbGF0ZSwgc3RyYXRlZ3kpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd01vZGFsRGlhbG9nKGNhbGxiYWNrLCB0ZW1wbGF0ZSwgc3RyYXRlZ3kpLnJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBzaG93MUJ1dHRvbk1vZGFsOiBmdW5jdGlvbihtc2dCb2R5LCBtc2dIZWFkZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwobXNnQm9keSwgbXNnSGVhZGVyLCBjYWxsYmFjayk7XG4gICAgICB9LFxuICAgICAgc2hvdzJCdXR0b25Nb2RhbDogZnVuY3Rpb24obXNnQm9keSwgbXNnSGVhZGVyLCBva0NCLCBjYW5jZWxDQiwgb2tCdG5UeHQsIGNhbmNlbEJ0blR4dCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgbXNnQm9keSwgbXNnSGVhZGVyLCBva0NCLCBjYW5jZWxDQiwgb2tCdG5UeHQsIGNhbmNlbEJ0blR4dCk7XG4gICAgICB9LFxuICAgICAgc2hvdzNCdXR0b25Nb2RhbDogZnVuY3Rpb24oXG4gICAgICAgICAgbXNnQm9keSwgbXNnSGVhZGVyLCB5ZXNDQiwgbm9DQiwgY2FuY2VsQ0IsIHllc0J0blR4dCwgbm9CdG5UeHQsIGNhbmNlbEJ0blR4dCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93M0J1dHRvbk1vZGFsKFxuICAgICAgICAgICAgbXNnQm9keSwgbXNnSGVhZGVyLCB5ZXNDQiwgbm9DQiwgY2FuY2VsQ0IsIHllc0J0blR4dCwgbm9CdG5UeHQsIGNhbmNlbEJ0blR4dCk7XG4gICAgICB9LFxuICAgICAgZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRGaWxlU3lzdGVtRmlsZUNob29zZXJTdHJhdGVneSgpO1xuICAgICAgfSxcbiAgICAgIHNlbGVjdEZpbGU6IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aXRsZSwgZXh0ZW5zaW9uLCBjbG9zZWJ0bikge1xuICAgICAgICAgIHZhciBzdHJhdGVneSA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVN5c3RlbUZpbGVDaG9vc2VyU3RyYXRlZ3koKTtcbiAgICAgICAgICBzdHJhdGVneS50cmVlVmlld2ZzLmV4dEZpbHRlciA9IFsgZXh0ZW5zaW9uIF07XG4gICAgICAgICAgc3RyYXRlZ3kuZXh0ID0gZXh0ZW5zaW9uO1xuICAgICAgICAgIHN0cmF0ZWd5LnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgc3RyYXRlZ3kuY2xvc2VidG4gPSBjbG9zZWJ0bjtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5nZXRIb21lRGlyZWN0b3J5KCkudGhlbihcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGhvbWVEaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5zaG93TW9kYWxEaWFsb2coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTVFsndGVtcGxhdGUvb3Blbm5vdGVib29rJ10oe2hvbWVkaXI6IGhvbWVEaXIsIGV4dGVuc2lvbjogZXh0ZW5zaW9ufSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJhdGVneSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIGV2YWwgdXRpbHNcbiAgICAgIGxvY2F0ZVBsdWdpblNlcnZpY2U6IGZ1bmN0aW9uKGlkLCBsb2NhdG9yKSB7XG4gICAgICAgIHJldHVybiBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9wbHVnaW4tc2VydmljZXMvXCIgKyBpZCksIGxvY2F0b3IpO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvckZhY3Rvcnk6IGZ1bmN0aW9uKHNoZWxsQ29uc3RydWN0b3JQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBzaGVsbENvbnN0cnVjdG9yUHJvbWlzZS50aGVuKGZ1bmN0aW9uKFNoZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrVXRpbHMubmV3UHJvbWlzZShuZXcgU2hlbGwoc2V0dGluZ3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzaG93TGFuZ3VhZ2VNYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuc2hvd0xhbmd1YWdlTWFuYWdlcigpO1xuICAgICAgfSxcblxuICAgICAgLy8gb3RoZXIgSlMgdXRpbHNcbiAgICAgIHVwZGF0ZURvY3VtZW50TW9kZWxGcm9tRE9NOiBmdW5jdGlvbihpZCkge1xuXHQgIGZ1bmN0aW9uIGNvbnZlcnRDYW52YXNUb0ltYWdlKGVsZW0pIHtcblx0ICAgICAgaWYgKGVsZW0ubm9kZU5hbWUgPT0gXCJDQU5WQVNcIikge1xuXHRcdCAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cdFx0ICBpbWcuc3JjID0gZWxlbS50b0RhdGFVUkwoKTtcblx0XHQgIHJldHVybiBpbWc7XG5cdCAgICAgIH1cblx0ICAgICAgdmFyIGNoaWxkTm9kZXMgPSBlbGVtLmNoaWxkTm9kZXM7XG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdCAgdmFyIHJlc3VsdCA9IGNvbnZlcnRDYW52YXNUb0ltYWdlKGNoaWxkTm9kZXNbaV0pO1xuXHRcdCAgaWYgKHJlc3VsdCAhPSBjaGlsZE5vZGVzW2ldKSB7XG5cdFx0ICAgICAgZWxlbS5yZXBsYWNlQ2hpbGQocmVzdWx0LCBjaGlsZE5vZGVzW2ldKTtcblx0XHQgIH1cblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gZWxlbTtcblx0ICB9XG4gICAgICAgICAgLy8gMSkgZmluZCB0aGUgY2VsbCB0aGF0IGNvbnRhaW5zIGVsZW1cbiAgICAgICAgICB2YXIgZWxlbSA9ICQoXCIjXCIgKyBpZCkuY2xvc2VzdChcImJrLWNlbGxcIik7XG4gICAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFuIEh0bWwgY2VsbCBjb250YWluaW5nIHRoZSBlbGVtZW50ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGNlbGxpZCA9IGVsZW1bMF0uZ2V0QXR0cmlidXRlKFwiY2VsbGlkXCIpO1xuICAgICAgICAgIGlmIChjZWxsaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogY2Fubm90IGZpbmQgYW4gSHRtbCBjZWxsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgJ1wiICsgaWQgKyBcIicuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgYm9keSA9IGVsZW0uZmluZCggXCJiay1vdXRwdXQtZGlzcGxheVt0eXBlPSdIdG1sJ10gZGl2IGRpdlwiICk7XG4gICAgICAgICAgaWYgKGJvZHkgPT09IHVuZGVmaW5lZCB8fCBib2R5WzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFuIEh0bWwgY2VsbCBjb250YWluaW5nIHRoZSBlbGVtZW50ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cdCAgLy8gMi41KSBzZWFyY2ggZm9yIGFueSBjYW52YXMgZWxlbWVudHMgaW4gYm9keSBhbmQgcmVwbGFjZSBlYWNoIHdpdGggYW4gaW1hZ2UuXG5cdCAgYm9keSA9IGNvbnZlcnRDYW52YXNUb0ltYWdlKGJvZHlbMF0pO1xuXG4gICAgICAgICAgLy8gMikgY29udmVydCB0aGF0IHBhcnQgb2YgdGhlIERPTSB0byBhIHN0cmluZ1xuICAgICAgICAgIHZhciBuZXdPdXRwdXQgPSBib2R5LmlubmVySFRNTDtcblxuICAgICAgICAgIC8vIDMpIHNldCB0aGUgcmVzdWx0Lm9iamVjdCB0byB0aGF0IHN0cmluZy5cbiAgICAgICAgICB2YXIgY2VsbCA9IGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLmdldENlbGwoY2VsbGlkKTtcbiAgICAgICAgICBpZiAoY2VsbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBjYW5ub3QgZmluZCBhbiBIdG1sIGNlbGwgY29udGFpbmluZyB0aGUgZWxlbWVudCAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlcyA9IGNlbGwub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICBpZiAocmVzLmlubmVydHlwZSA9PT0gXCJIdG1sXCIpIHtcbiAgICAgICAgICAgIHJlcy5vYmplY3QgPSBuZXdPdXRwdXQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IGNhbm5vdCBmaW5kIGFuIEh0bWwgY2VsbCBjb250YWluaW5nIHRoZSBlbGVtZW50ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBia1NoYXJlXG4gICAgICBzaGFyZTogYmtTaGFyZSxcblxuICAgICAgLy8gbGFuZ3VhZ2UgcGx1Z2luIHV0aWxpdGllc1xuXG4gICAgICBzZXR1cFByb2dyZXNzT3V0cHV0OiBmdW5jdGlvbihtb2RlbE91dHB1dCkge1xuICAgICAgICB2YXIgcHJvZ3Jlc3NPYmogPSB7XG4gICAgICAgICAgICB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIixcbiAgICAgICAgICAgIGlubmVydHlwZTogXCJQcm9ncmVzc1wiLFxuICAgICAgICAgICAgb2JqZWN0OiB7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwic3VibWl0dGluZyAuLi5cIixcbiAgICAgICAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgb3V0cHV0ZGF0YTogW10sXG4gICAgICAgICAgICAgIHBheWxvYWQ6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0ID0gcHJvZ3Jlc3NPYmo7XG4gICAgICB9LFxuXG4gICAgICBzZXR1cENhbmNlbGxpbmdPdXRwdXQ6IGZ1bmN0aW9uKG1vZGVsT3V0cHV0KSB7XG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQudHlwZSAhPT0gXCJCZWFrZXJEaXNwbGF5XCIgfHwgbW9kZWxPdXRwdXQucmVzdWx0LmlubmVydHlwZSAhPT0gXCJQcm9ncmVzc1wiKVxuICAgICAgICAgIHNldHVwUHJvZ3Jlc3NPdXRwdXQobW9kZWxPdXRwdXQpO1xuICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgPSBcImNhbmNlbGxpbmcgLi4uXCI7XG4gICAgICB9LFxuXG4gICAgICByZWNlaXZlRXZhbHVhdGlvblVwZGF0ZTogZnVuY3Rpb24obW9kZWxPdXRwdXQsIGV2YWx1YXRpb24sIHBsdWdpbk5hbWUsIHNoZWxsSWQpIHtcbiAgICAgICAgdmFyIG1heE51bU9mTGluZXMgPSAyMDA7XG5cbiAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5zdGF0dXMgPSBldmFsdWF0aW9uLnN0YXR1cztcblxuICAgICAgICAvLyBzYXZlIGluZm9ybWF0aW9uIHRvIGhhbmRsZSB1cGRhdGFibGUgcmVzdWx0cyBpbiBkaXNwbGF5c1xuICAgICAgICBtb2RlbE91dHB1dC5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZTtcbiAgICAgICAgbW9kZWxPdXRwdXQuc2hlbGxJZCA9IHNoZWxsSWQ7XG5cbiAgICAgICAgLy8gYXBwZW5kIHRleHQgb3V0cHV0IChpZiBhbnkpXG4gICAgICAgIGlmIChldmFsdWF0aW9uLm91dHB1dGRhdGEgIT09IHVuZGVmaW5lZCAmJiBldmFsdWF0aW9uLm91dHB1dGRhdGEubGVuZ3RoPjApIHtcbiAgICAgICAgICB2YXIgaWR4O1xuICAgICAgICAgIGZvciAoaWR4PTA7IGlkeDxldmFsdWF0aW9uLm91dHB1dGRhdGEubGVuZ3RoPjA7IGlkeCsrKSB7XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEucHVzaChldmFsdWF0aW9uLm91dHB1dGRhdGFbaWR4XSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjbnQgPSAwO1xuICAgICAgICAgIGZvciAoaWR4PTA7IGlkeDxtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgY250ICs9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YVtpZHhdLnZhbHVlLnNwbGl0KC9cXG4vKS5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjbnQgPiBtYXhOdW1PZkxpbmVzKSB7XG4gICAgICAgICAgICBjbnQgLT0gbWF4TnVtT2ZMaW5lcztcbiAgICAgICAgICAgIHdoaWxlKGNudCA+IDApIHtcbiAgICAgICAgICAgICAgdmFyIGwgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGFbMF0udmFsdWUuc3BsaXQoL1xcbi8pLmxlbmd0aDtcbiAgICAgICAgICAgICAgaWYgKGw8PWNudCkge1xuICAgICAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5zcGxpY2UoMCwxKTtcbiAgICAgICAgICAgICAgICBjbnQgLT0gbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYSA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YVswXS52YWx1ZS5zcGxpdCgvXFxuLyk7XG4gICAgICAgICAgICAgICAgYS5zcGxpY2UoMCxjbnQpO1xuICAgICAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YVswXS52YWx1ZSA9IGEuam9pbignXFxuJyk7XG4gICAgICAgICAgICAgICAgY250ID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogdGhpcyBzaG91bGQgbm90IGhhcHBlbiAtIHlvdXIgcGx1Z2luIGphdmFzY3JpcHQgaXMgYnJva2VuIVwiKTtcbiAgICAgICAgICBzZXR1cFByb2dyZXNzT3V0cHV0KG1vZGVsT3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB1cGRhdGUgcGF5bG9hZCAoaWYgbmVlZGVkKVxuICAgICAgICBpZiAoZXZhbHVhdGlvbi5wYXlsb2FkICE9PSB1bmRlZmluZWQgJiYgbW9kZWxPdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkID0gZXZhbHVhdGlvbi5wYXlsb2FkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3Qub3V0cHV0ZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCA9IHsgdHlwZSA6IFwiUmVzdWx0c1wiLCBvdXRwdXRkYXRhIDogbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLCBwYXlsb2FkIDogdW5kZWZpbmVkIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQudHlwZSA9PT0gXCJSZXN1bHRzXCIpIHtcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC5vdXRwdXRkYXRhID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhO1xuICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZCA9IHsgdHlwZSA6IFwiUmVzdWx0c1wiLCBvdXRwdXRkYXRhIDogbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLCBwYXlsb2FkIDogbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2YWx1YXRpb24uc3RhdHVzID09PSBcIkZJTklTSEVEXCIpIHtcbiAgICAgICAgICBpZiAoZXZhbHVhdGlvbi5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQgIT09IHVuZGVmaW5lZCAmJiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQudHlwZSA9PT0gXCJSZXN1bHRzXCIpXG4gICAgICAgICAgICAgIGV2YWx1YXRpb24ucGF5bG9hZCA9IG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QucGF5bG9hZC5wYXlsb2FkO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBldmFsdWF0aW9uLnBheWxvYWQgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vZGVsT3V0cHV0LmVsYXBzZWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnN0YXJ0VGltZTtcblxuICAgICAgICAgIGlmIChtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBzaW5nbGUgb3V0cHV0IGRpc3BsYXlcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IGV2YWx1YXRpb24ucGF5bG9hZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd3JhcHBlciBkaXNwbGF5IHdpdGggc3RhbmRhcmQgb3V0cHV0IGFuZCBlcnJvclxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0ID0geyB0eXBlIDogXCJSZXN1bHRzXCIsIG91dHB1dGRhdGEgOiBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0Lm91dHB1dGRhdGEsIHBheWxvYWQgOiBldmFsdWF0aW9uLnBheWxvYWQgfTtcbiAgICAgICAgICAgIC8vIGJ1aWxkIG91dHB1dCBjb250YWluZXJcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24uanNvbnJlcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbW9kZWxPdXRwdXQuZGF0YXJlc3VsdCA9IGV2YWx1YXRpb24uanNvbnJlcztcbiAgICAgICAgfSBlbHNlIGlmIChldmFsdWF0aW9uLnN0YXR1cyA9PT0gXCJFUlJPUlwiKSB7XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkICE9PSB1bmRlZmluZWQgJiYgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkLnR5cGUgPT09IFwiUmVzdWx0c1wiKVxuICAgICAgICAgICAgICBldmFsdWF0aW9uLnBheWxvYWQgPSBtb2RlbE91dHB1dC5yZXN1bHQub2JqZWN0LnBheWxvYWQucGF5bG9hZDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgZXZhbHVhdGlvbi5wYXlsb2FkID0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wYXlsb2FkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXZhbHVhdGlvbi5wYXlsb2FkICE9PSB1bmRlZmluZWQgJiYgJC50eXBlKGV2YWx1YXRpb24ucGF5bG9hZCk9PSdzdHJpbmcnKSB7XG4gICAgICAgICAgICBldmFsdWF0aW9uLnBheWxvYWQgPSBldmFsdWF0aW9uLnBheWxvYWQuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb2RlbE91dHB1dC5lbGFwc2VkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5zdGFydFRpbWU7XG5cbiAgICAgICAgICBpZiAobW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc2luZ2xlIG91dHB1dCBkaXNwbGF5XG4gICAgICAgICAgICBtb2RlbE91dHB1dC5yZXN1bHQgPSB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiQmVha2VyRGlzcGxheVwiLFxuICAgICAgICAgICAgICBpbm5lcnR5cGU6IFwiRXJyb3JcIixcbiAgICAgICAgICAgICAgb2JqZWN0OiBldmFsdWF0aW9uLnBheWxvYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdyYXBwZXIgZGlzcGxheSB3aXRoIHN0YW5kYXJkIG91dHB1dCBhbmQgZXJyb3JcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdCA9IHsgdHlwZSA6IFwiUmVzdWx0c1wiLCBvdXRwdXRkYXRhIDogbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5vdXRwdXRkYXRhLCBwYXlsb2FkIDogeyB0eXBlOiBcIkJlYWtlckRpc3BsYXlcIiwgaW5uZXJ0eXBlOiBcIkVycm9yXCIsIG9iamVjdDogZXZhbHVhdGlvbi5wYXlsb2FkIH0gfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiUlVOTklOR1wiKSB7XG4gICAgICAgICAgaWYgKGV2YWx1YXRpb24ubWVzc2FnZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5tZXNzYWdlICAgICA9IFwicnVubmluZy4uLlwiO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIG1vZGVsT3V0cHV0LnJlc3VsdC5vYmplY3QubWVzc2FnZSAgICAgPSBldmFsdWF0aW9uLm1lc3NhZ2U7XG4gICAgICAgICAgbW9kZWxPdXRwdXQucmVzdWx0Lm9iamVjdC5wcm9ncmVzc0JhciAgID0gZXZhbHVhdGlvbi5wcm9ncmVzc0JhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoZXZhbHVhdGlvbi5zdGF0dXMgPT09IFwiRklOSVNIRURcIiB8fCBldmFsdWF0aW9uLnN0YXR1cyA9PT0gXCJFUlJPUlwiKTtcbiAgICAgIH0sXG4gICAgICBnZXRVcGRhdGVTZXJ2aWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbWV0ZFV0aWwgPSB7XG4gICAgICAgICAgICBpbml0aWFsaXplZDogZmFsc2UsXG4gICAgICAgICAgICBzdWJzY3JpcHRpb25zOiB7IH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbihwbHVnaW5OYW1lLCBzZXJ2aWNlQmFzZSkge1xuICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZCA9IG5ldyAkLkNvbWV0ZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLmluaXQoYmtVdGlscy5zZXJ2ZXJVcmwoc2VydmljZUJhc2UgKyBcIi9jb21ldGQvXCIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhsaXN0ZW5lciA9IHRoaXMuY29tZXRkLmFkZExpc3RlbmVyKCcvbWV0YS9oYW5kc2hha2UnLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAod2luZG93LmJrRGVidWcpIGNvbnNvbGUubG9nKHBsdWdpbk5hbWUrJy9tZXRhL2hhbmRzaGFrZScpO1xuICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc3VjY2Vzc2Z1bCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC5iYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgaztcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGsgaW4gT2JqZWN0LmtleXModGhpcy5zdWJzY3JpcHRpb25zKSlcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNba10gPSB0aGlzLmNvbWV0ZC5yZXN1YnNjcmliZSh0aGlzLnN1YnNjcmlwdGlvbnNba10pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC5yZW1vdmVMaXN0ZW5lcih0aGlzLmhsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdmFyIGs7XG4gICAgICAgICAgICAgICAgZm9yIChrIGluIE9iamVjdC5rZXlzKHRoaXMuc3Vic2NyaXB0aW9ucykpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb21ldGQudW5zdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zW2tdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuY29tZXRkID0gbnVsbDtcbiAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0geyB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24odXBkYXRlX2lkLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICBpZiAoIXVwZGF0ZV9pZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuYmtEZWJ1ZykgY29uc29sZS5sb2coJ3N1YnNjcmliZSB0byAnK3VwZGF0ZV9pZCk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tZXRkLnVuc3Vic2NyaWJlKHRoaXMuc3Vic2NyaXB0aW9uc1t1cGRhdGVfaWRdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIGNiID0gZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0LmRhdGEpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB2YXIgcyA9IHRoaXMuY29tZXRkLnN1YnNjcmliZSgnL29iamVjdF91cGRhdGUvJyArIHVwZGF0ZV9pZCwgY2IpO1xuICAgICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSA9IHM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKHVwZGF0ZV9pZCkge1xuICAgICAgICAgICAgICBpZiAoIXVwZGF0ZV9pZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuYmtEZWJ1ZykgY29uc29sZS5sb2coJ3Vuc3Vic2NyaWJlIGZyb20gJyt1cGRhdGVfaWQpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWV0ZC51bnN1YnNjcmliZSh0aGlzLnN1YnNjcmlwdGlvbnNbdXBkYXRlX2lkXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNzdWJzY3JpYmVkOiBmdW5jdGlvbih1cGRhdGVfaWQpIHtcbiAgICAgICAgICAgICAgaWYgKCF1cGRhdGVfaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zW3VwZGF0ZV9pZF0gIT09IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gYmtIZWxwZXI7XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubWVudVBsdWdpbk1hbmFnZXInLCBbJ2JrLnV0aWxzJ10pO1xuXG4gIHZhciB1dGlscyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgREVGQVVMVF9QUklPUklUWSA9IDA7XG4gICAgLy8gYWRkIG5ld0l0ZW0gdG8gaXRlbXNMaXN0LCBpZiBhbiBpdGVtIHdpdGggc2FtZSBuYW1lIGFscmVhZHkgZXhpc3RzIGluIGl0ZW1zTGlzdCxcbiAgICAvLyBjb21wYXJlIHByaW9yaXRpZXMsIGlmIG5ld0l0ZW0ucHJpb3JpdHkgPiBleGlzdGluZ0l0ZW0ucHJpb3JpdHksIG5ld0l0ZW0gd2lsbFxuICAgIC8vIHJlcGxhY2UgdGhlIGV4aXN0aW5nSXRlbSBpbiBwbGFjZS5cbiAgICB2YXIgYWRkTWVudUl0ZW0gPSBmdW5jdGlvbihpdGVtc0xpc3QsIG5ld0l0ZW0pIHtcbiAgICAgIC8vIGNoZWNrIGlmIGFuIGVudHJ5IHdpdGggc2FtZSBuYW1lIGFscmVhZHkgZXhpc3RcbiAgICAgIHZhciBleGlzdGluZ0l0ZW0gPSBfKGl0ZW1zTGlzdCkuZmluZChmdW5jdGlvbihpdCkge1xuICAgICAgICByZXR1cm4gaXQubmFtZSA9PT0gbmV3SXRlbS5uYW1lO1xuICAgICAgfSk7XG4gICAgICBpZiAoZXhpc3RpbmdJdGVtKSB7XG4gICAgICAgIGV4aXN0aW5nSXRlbS5wcmlvcml0eSA9IGV4aXN0aW5nSXRlbS5wcmlvcml0eSA/IGV4aXN0aW5nSXRlbS5wcmlvcml0eSA6IERFRkFVTFRfUFJJT1JJVFk7XG4gICAgICAgIG5ld0l0ZW0ucHJpb3JpdHkgPSBuZXdJdGVtLnByaW9yaXR5ID8gbmV3SXRlbS5wcmlvcml0eSA6IERFRkFVTFRfUFJJT1JJVFk7XG4gICAgICAgIGlmIChuZXdJdGVtLnByaW9yaXR5ID49IGV4aXN0aW5nSXRlbS5wcmlvcml0eSkge1xuICAgICAgICAgIC8vIHJlcGxhY2UgaW4gcGxhY2VcbiAgICAgICAgICBpdGVtc0xpc3Quc3BsaWNlKGl0ZW1zTGlzdC5pbmRleE9mKGV4aXN0aW5nSXRlbSksIDEsIG5ld0l0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlnbm9yZSBhbmQgd2FyblxuICAgICAgICAgIGNvbnNvbGUud2FybihcImlnbm9yaW5nIG1lbnUgaXRlbSBcIiArIG5ld0l0ZW0ubmFtZSArIFwiYmVjYXVzZSBwcmlvcml0eT1cIlxuICAgICAgICAgICAgICArIG5ld0l0ZW0ucHJpb3JpdHkgKyBcImlzIHNtYWxsZXIgdGhhbiBleGlzdGluZyAoXCIgKyBleGlzdGluZ0l0ZW0ucHJpb3JpdHkgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1zTGlzdCA9IGl0ZW1zTGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZE1lbnVJdGVtczogZnVuY3Rpb24gKHBhcmVudE1lbnUsIGl0ZW1zKSB7XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbXMpKSB7XG4gICAgICAgICAgcGFyZW50TWVudS5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGFkZE1lbnVJdGVtKHBhcmVudE1lbnUuaXRlbXMsIGl0ZW0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcblxuICBtb2R1bGUuZmFjdG9yeSgnYmtNZW51UGx1Z2luTWFuYWdlcicsIGZ1bmN0aW9uKGJrVXRpbHMpIHtcblxuICAgIHZhciBtZW51cyA9IHt9O1xuICAgIHZhciBsb2FkZWRQbHVnaW5zID0gW107XG4gICAgdmFyIGxvYWRpbmdJblByb2dyZXNzUGx1Z2luSm9icyA9IFtdO1xuICAgIHZhciBwbHVnaW5JbmRleCA9IDA7XG5cbiAgICB2YXIgYWRkUGx1Z2luID0gZnVuY3Rpb24ocGx1Z2luLCBwbHVnaW5JbmRleCwgc2Vjb25kYXJ5SW5kZXgpIHtcbiAgICAgIGlmICghcGx1Z2luKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmVudE1lbnUgPSBfLmZpbmQoXy52YWx1ZXMobWVudXMpLCBmdW5jdGlvbihpdCkge1xuICAgICAgICByZXR1cm4gaXQubmFtZSA9PT0gcGx1Z2luLnBhcmVudDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXBhcmVudE1lbnUpIHtcbiAgICAgICAgcGFyZW50TWVudSA9IHtcbiAgICAgICAgICBuYW1lOiBwbHVnaW4ucGFyZW50LFxuICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICBpbmRleDogcGx1Z2luSW5kZXgsXG4gICAgICAgICAgc2Vjb25kYXJ5SW5kZXg6IHNlY29uZGFyeUluZGV4LFxuICAgICAgICAgIHNvcnRvcmRlcjogcGx1Z2luLnNvcnRvcmRlcixcbiAgICAgICAgICBjbGFzc05hbWVzOiBwbHVnaW4uaWRcbiAgICAgICAgfTtcbiAgICAgICAgbWVudXNbcGx1Z2luSW5kZXggKyAnXycgKyBzZWNvbmRhcnlJbmRleCArICdfJyArIHBhcmVudE1lbnUubmFtZV0gPSBwYXJlbnRNZW51O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBsdWdpbkluZGV4IDwgcGFyZW50TWVudS5pbmRleFxuICAgICAgICAgICAgfHwgKHBsdWdpbkluZGV4ID09PSBwYXJlbnRNZW51LmluZGV4ICYmIHNlY29uZGFyeUluZGV4IDwgcGFyZW50TWVudS5zZWNvbmRhcnlJbmRleCkpIHtcbiAgICAgICAgICBkZWxldGUgbWVudXNbcGFyZW50TWVudS5pbmRleCArICdfJyArIHBhcmVudE1lbnUuc2Vjb25kYXJ5SW5kZXggKyAnXycgKyBwYXJlbnRNZW51Lm5hbWVdO1xuICAgICAgICAgIG1lbnVzW3BsdWdpbkluZGV4ICsgJ18nICsgc2Vjb25kYXJ5SW5kZXggKyAnXycgKyBwYXJlbnRNZW51Lm5hbWVdID0gcGFyZW50TWVudTtcbiAgICAgICAgICBwYXJlbnRNZW51LmluZGV4ID0gcGx1Z2luSW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFwbHVnaW4uc3VibWVudSkge1xuICAgICAgICB1dGlscy5hZGRNZW51SXRlbXMocGFyZW50TWVudSwgcGx1Z2luLml0ZW1zKTtcbiAgICAgICAgaWYgKCEgXy5pc0Z1bmN0aW9uKHBhcmVudE1lbnUuaXRlbXMpKSB7XG4gICAgICAgICAgcGFyZW50TWVudS5pdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgICAgaWYgKGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQgJiYgYi5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXI+Yi5zb3J0b3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHN1Yk1lbnUgPSBfLmZpbmQocGFyZW50TWVudS5pdGVtcywgZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICByZXR1cm4gaXQubmFtZSA9PT0gcGx1Z2luLnN1Ym1lbnU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXN1Yk1lbnUpIHtcbiAgICAgICAgICBzdWJNZW51ID0ge1xuICAgICAgICAgICAgbmFtZTogcGx1Z2luLnN1Ym1lbnUsXG4gICAgICAgICAgICB0eXBlOiBcInN1Ym1lbnVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIHNvcnRvcmRlcjogcGx1Z2luLnN1Ym1lbnVzb3J0b3JkZXJcbiAgICAgICAgICB9O1xuICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMucHVzaChzdWJNZW51KTtcbiAgICAgICAgICBpZiAoISBfLmlzRnVuY3Rpb24ocGFyZW50TWVudS5pdGVtcykpIHtcbiAgICAgICAgICAgIHBhcmVudE1lbnUuaXRlbXMuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICAgICAgICAgICAgaWYgKGEuc29ydG9yZGVyICE9PSB1bmRlZmluZWQgJiYgYi5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnNvcnRvcmRlcj5iLnNvcnRvcmRlcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJNZW51LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgc3ViTWVudS50eXBlID0gXCJzdWJtZW51XCI7XG4gICAgICAgICAgaWYgKCFzdWJNZW51Lml0ZW1zKSB7XG4gICAgICAgICAgICBzdWJNZW51Lml0ZW1zID0gW107XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHV0aWxzLmFkZE1lbnVJdGVtcyhzdWJNZW51LCBwbHVnaW4uaXRlbXMpO1xuICAgICAgICBpZiAoISBfLmlzRnVuY3Rpb24oc3ViTWVudS5pdGVtcykpIHtcbiAgICAgICAgICBzdWJNZW51Lml0ZW1zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgICBpZiAoYS5zb3J0b3JkZXIgIT09IHVuZGVmaW5lZCAmJiBiLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhLnNvcnRvcmRlcj5iLnNvcnRvcmRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhLnNvcnRvcmRlciAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXRMb2FkTWVudVBsdWdpbkpvYiA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgdmFyIGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VXJsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBpc0NhbmNlbGxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbmNlbGxlZDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBsb2FkUGx1Z2luID0gZnVuY3Rpb24oam9iKSB7XG4gICAgICByZXR1cm4gYmtVdGlscy5sb2FkTW9kdWxlKGpvYi5nZXRVcmwoKSkudGhlbihmdW5jdGlvbihtZW51UGx1Z2luKSB7XG4gICAgICAgIGlmIChqb2IuaXNDYW5jZWxsZWQoKSkge1xuICAgICAgICAgIHRocm93IFwiY2FuY2VsbGVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lbnVQbHVnaW4uZ2V0TWVudUl0ZW1zKCkudGhlbihmdW5jdGlvbihtZW51SXRlbXMpIHtcbiAgICAgICAgICBpZiAoam9iLmlzQ2FuY2VsbGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IFwiY2FuY2VsbGVkXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtZW51SXRlbXM7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBsb2FkTWVudVBsdWdpbjogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBqb2IgPSBnZXRMb2FkTWVudVBsdWdpbkpvYih1cmwpO1xuICAgICAgICB2YXIgaW5kZXggPSBwbHVnaW5JbmRleCsrO1xuICAgICAgICBsb2FkUGx1Z2luKGpvYikudGhlbihmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgICBsb2FkZWRQbHVnaW5zLnB1c2goe3VybDogam9iLmdldFVybCgpfSk7XG4gICAgICAgICAgaWYgKF8uaXNBcnJheShwbHVnaW4pKSB7XG4gICAgICAgICAgICBfKHBsdWdpbikuZWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgICBhZGRQbHVnaW4oaXRlbSwgaW5kZXgsIGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZFBsdWdpbihwbHVnaW4sIGluZGV4LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlamVjdGlvbikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVqZWN0aW9uKTtcbiAgICAgICAgfSkuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMuc3BsaWNlKGxvYWRpbmdJblByb2dyZXNzUGx1Z2luSm9icy5pbmRleE9mKGpvYiksIDEpO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9hZGluZ0luUHJvZ3Jlc3NQbHVnaW5Kb2JzLnB1c2goam9iKTtcbiAgICAgIH0sXG4gICAgICBhdHRhY2hNZW51czogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHBsdWdpbkluZGV4Kys7XG4gICAgICAgIGlmIChfLmlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgIF8ocGx1Z2luKS5lYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBhZGRQbHVnaW4oaXRlbSwgaW5kZXgsIGkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZFBsdWdpbihwbHVnaW4sIGluZGV4LCAwKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldE1lbnVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1lbnVzO1xuICAgICAgfSxcbiAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbWVudXMgPSB7fTtcbiAgICAgICAgXyhsb2FkaW5nSW5Qcm9ncmVzc1BsdWdpbkpvYnMpLmVhY2goZnVuY3Rpb24oam9iKSB7XG4gICAgICAgICAgam9iLmNhbmNlbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcGx1Z2luSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsubWFpbkFwcFxuICogVGhpcyBpcyB0aGUgbWFpbiBtb2R1bGUgZm9yIHRoZSBiZWFrZXIgbm90ZWJvb2sgYXBwbGljYXRpb24uIFRoZSBtb2R1bGUgaGFzIGEgZGlyZWN0aXZlIHRoYXRcbiAqIGhvbGRzIHRoZSBtZW51IGJhciBhcyB3ZWxsIGFzIHRoZSBub3RlYm9vayB2aWV3LlxuICogVGhlIG1vZHVsZSBhbHNvIG93bnMgdGhlIGNlbnRyYWxpemVkIGNlbGwgZXZhbHVhdGlvbiBsb2dpYy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubWFpbkFwcCcsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICduZ1JvdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay51dGlscycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuY29tbW9uVWknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLmNvcmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLnNlc3Npb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLnNlc3Npb25NYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5tZW51UGx1Z2luTWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5ub3RlYm9va1ZlcnNpb25NYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5ldmFsdWF0b3JNYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiay5ldmFsdWF0ZUpvYk1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JrLm5vdGVib29rJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG5cbiAgLyoqXG4gICAqIGJrQXBwXG4gICAqIC0gVGhpcyBpcyB0aGUgYmVha2VyIEFwcFxuICAgKiAtIG1lbnVzICsgcGx1Z2lucyArIG5vdGVib29rKG5vdGVib29rIG1vZGVsICsgZXZhbHVhdG9yKVxuICAgKi9cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtNYWluQXBwJywgZnVuY3Rpb24oXG4gICAgICAkcm91dGUsXG4gICAgICAkcm91dGVQYXJhbXMsXG4gICAgICAkdGltZW91dCxcbiAgICAgICRzZXNzaW9uU3RvcmFnZSxcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgYmtTZXNzaW9uLFxuICAgICAgYmtTZXNzaW9uTWFuYWdlcixcbiAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcixcbiAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLFxuICAgICAgJGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogSlNUW1widGVtcGxhdGUvbWFpbmFwcC9tYWluYXBwXCJdKCksXG4gICAgICBzY29wZToge30sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XG4gICAgICAgIHZhciBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gbWVzc2FnZTtcbiAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdXBkYXRlTG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0TG9hZGluZ1N0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmxvYWRpbmdtc2c7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5sb2FkaW5nbXNnID09PSBtZXNzYWdlKSB7XG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZ21zZyA9IFwiXCI7XG4gICAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCBub2RpZ2VzdCkge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nbXNnID0gbWVzc2FnZTtcbiAgICAgICAgICBpZiAobm9kaWdlc3QgIT09IHRydWUgJiYgISgkc2NvcGUuJCRwaGFzZSB8fCAkc2NvcGUuJHJvb3QuJCRwaGFzZSkpXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgIGlmIChtZXNzYWdlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCRzY29wZS5sb2FkaW5nbXNnID09PSBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmdtc2cgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChub2RpZ2VzdCAhPT0gdHJ1ZSAmJiAhKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCwgMCwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGV2YWx1YXRvck1lbnVJdGVtcyA9IFtdO1xuXG4gICAgICAgIHZhciBhZGRFdmFsdWF0b3IgPSBmdW5jdGlvbihzZXR0aW5ncywgYWx3YXlzQ3JlYXRlTmV3RXZhbHVhdG9yKSB7XG4gICAgICAgICAgLy8gc2V0IHNoZWxsIGlkIHRvIG51bGwsIHNvIGl0IHdvbid0IHRyeSB0byBmaW5kIGFuIGV4aXN0aW5nIHNoZWxsIHdpdGggdGhlIGlkXG4gICAgICAgICAgaWYgKGFsd2F5c0NyZWF0ZU5ld0V2YWx1YXRvcikge1xuICAgICAgICAgICAgc2V0dGluZ3Muc2hlbGxJRCA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5uZXdFdmFsdWF0b3Ioc2V0dGluZ3MpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShldmFsdWF0b3Iuc3BlYykpIHtcbiAgICAgICAgICAgICAgdmFyIGFjdGlvbkl0ZW1zID0gW107XG4gICAgICAgICAgICAgIF8oZXZhbHVhdG9yLnNwZWMpLmVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlID09PSBcImFjdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25JdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdmFsdWUubmFtZSA/IHZhbHVlLm5hbWUgOiB2YWx1ZS5hY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsdWF0b3IucGVyZm9ybShrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGFjdGlvbkl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBldmFsdWF0b3JNZW51SXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBldmFsdWF0b3IucGx1Z2luTmFtZSwgLy8gVE9ETywgdGhpcyBzaG91bGQgYmUgZXZhbHVhdG9yLnNldHRpbmdzLm5hbWVcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBhY3Rpb25JdGVtc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGxvYWROb3RlYm9vayA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYWRkU2Nyb2xsaW5nSGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVE9ETywgdGhlIGZvbGxvd2luZyBpcyBhIGhhY2sgdG8gYWRkcmVzcyB0aGUgaXNzdWUgdGhhdFxuICAgICAgICAgICAgLy8gc29tZWhvdyB0aGUgbm90ZWJvb2sgaXMgc2Nyb2xsZWQgdG8gdGhlIG1pZGRsZVxuICAgICAgICAgICAgLy8gdGhpcyBoYWNrIGxpc3RlbnMgdG8gdGhlICdzY3JvbGwnIGV2ZW50IGFuZCBzY3JvbGxzIGl0IHRvIHRoZSB0b3BcbiAgICAgICAgICAgIC8vIEEgYmV0dGVyIHNvbHV0aW9uIGlzIHRvIGRvIHRoaXMgd2hlbiBBbmd1bGFyIHN0b3BzIGZpcmluZyBhbmQgRE9NIHVwZGF0ZXMgZmluaXNoLlxuICAgICAgICAgICAgLy8gQSBldmVuIGV2ZW4gYmV0dGVyIHNvbHV0aW9uIGlzIHRoZSBzZXNzaW9uIGFjdHVhbGx5IHJlbWVtYmVycyB3aGVyZSB0aGUgc2Nyb2xsaW5nIHdhc1xuICAgICAgICAgICAgLy8gYW5kIHNjcm9sbCB0byB0aGVyZSBhbmQgaW4gdGhlIGNhc2Ugb2Ygc3RhcnRpbmcgYSBuZXcgc2Vzc2lvbiAoaS5lLiBsb2FkaW5nIGEgbm90ZWJvb2sgZnJvbSBmaWxlKVxuICAgICAgICAgICAgLy8gc2Nyb2xsIHRvIHRvcC5cbiAgICAgICAgICAgIC8vIEEgZXZlbiBiZXR0ZXIgc29sdXRpb24gd291bGQgYmUgdG8gZ2V0IHJpZCBvZiB0aGUgdW53YW50ZWQgc2Nyb2xsaW5nIGluIHRoZSBmaXJzdCBwbGFjZS5cbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uID0gZnVuY3Rpb24oXG4gICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCxcbiAgICAgICAgICAgICAgaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBub3RlYm9vayBoYXMgdG8gbG9hZCBwbHVnaW5zIGZyb20gYW4gZXh0ZXJuYWwgc291cmNlXG4gICAgICAgICAgICB2YXIgciA9IG5ldyBSZWdFeHAoJ14oPzpbYS16XSs6KT8vLycsICdpJyk7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoci50ZXN0KG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcGx1Z0xpc3QgPSBcIjx1bD5cIjtcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLnRlc3Qobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldLnBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICBwbHVnTGlzdCArPSBcIjxsaT5cIitub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbaV0ucGx1Z2luO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBwbHVnTGlzdCArPSBcIjwvdWw+XCI7XG4gICAgICAgICAgICAgICAgICBwcm9tcHRJZkluc2VjdXJlKHBsdWdMaXN0KS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyIGFjY2VwdGVkIHJpc2suLi4gZG8gdGhlIGxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIgZGVuaWVkIHJpc2suLi4gY2xlYXIgcGx1Z2lucyB3aXRoIGV4dGVybmFsIFVSTCBhbmQgZG8gdGhlIGxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyLnRlc3Qobm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2ldLnBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tpXS5wbHVnaW49XCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBlZGl0ZWQsIHNlc3Npb25JZCwgaXNFeGlzdGluZ1Nlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBubyB1bnNhZmUgb3BlcmF0aW9uIGRldGVjdGVkLi4uIGRvIHRoZSBsb2FkaW5nXG4gICAgICAgICAgICBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLCBpc0V4aXN0aW5nU2Vzc2lvbik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgcHJvbXB0SWZJbnNlY3VyZSA9IGZ1bmN0aW9uKHVybExpc3QpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIlRoaXMgbm90ZWJvb2sgaXMgYXNraW5nIHRvIGxvYWQgdGhlIGZvbGxvd2luZyBwbHVnaW5zIGZyb20gZXh0ZXJuYWwgc2VydmVyczo8YnIvPlwiICsgdXJsTGlzdCtcbiAgICAgICAgICAgICAgICBcIiA8YnIvPkhvdyBkbyB5b3Ugd2FudCB0byBoYW5kbGUgdGhlc2UgZXh0ZXJuYWwgcGx1Z2lucz9cIixcbiAgICAgICAgICAgICAgICBcIldhcm5pbmc6IGV4dGVybmFsIHBsdWdpbnMgZGV0ZWN0ZWRcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgXCJEaXNhYmxlXCIsIFwiTG9hZFwiLCBcIlwiLCBcImJ0bi1kYW5nZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBfbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24gPSBmdW5jdGlvbihcbiAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkLFxuICAgICAgICAgICAgICBpc0V4aXN0aW5nU2Vzc2lvbikge1xuXG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJMb2FkaW5nIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBhZGRTY3JvbGxpbmdIYWNrKCk7XG4gICAgICAgICAgICBpc0V4aXN0aW5nU2Vzc2lvbiA9ICEhaXNFeGlzdGluZ1Nlc3Npb247XG4gICAgICAgICAgICBldmFsdWF0b3JNZW51SXRlbXMuc3BsaWNlKDAsIGV2YWx1YXRvck1lbnVJdGVtcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBIQUNLIHRvIGZpeCBvbGRlciB2ZXJzaW9uIG9mIGV2YWx1YXRvciBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbCAmJiBub3RlYm9va01vZGVsLmNlbGxzICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdGVib29rTW9kZWwuY2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGx1Z2luID0gbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJIdG1sXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IFwiSHRtbFwiO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgobmFtZSxcIkxhdGV4XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IFwiTGF0ZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJKYXZhU2NyaXB0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IFwiSmF2YVNjcmlwdFwiO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgobmFtZSxcIkdyb292eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5jZWxsc1tpXS5ldmFsdWF0b3IgPSBcIkdyb292eVwiO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihuYW1lID09PSBcIlB5dGhvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmNlbGxzW2ldLmV2YWx1YXRvciA9IHBsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBub3RlYm9va01vZGVsLmV2YWx1YXRvcnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBwbHVnaW4gPSBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ucGx1Z2luO1xuICAgICAgICAgICAgICAgIGlmIChia1V0aWxzLmJlZ2luc1dpdGgobmFtZSxcIkh0bWxcIikpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5uYW1lID0gXCJIdG1sXCI7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ucGx1Z2luID0gXCJIdG1sXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJrVXRpbHMuYmVnaW5zV2l0aChuYW1lLFwiTGF0ZXhcIikpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5uYW1lID0gXCJMYXRleFwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbiA9IFwiTGF0ZXhcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYmtVdGlscy5iZWdpbnNXaXRoKG5hbWUsXCJKYXZhU2NyaXB0XCIpKSB7XG4gICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLmV2YWx1YXRvcnNbal0ubmFtZSA9IFwiSmF2YVNjcmlwdFwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbiA9IFwiSmF2YVNjcmlwdFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihia1V0aWxzLmJlZ2luc1dpdGgobmFtZSxcIkdyb292eVwiKSkge1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLm5hbWUgPSBcIkdyb292eVwiO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbC5ldmFsdWF0b3JzW2pdLnBsdWdpbiA9IFwiR3Jvb3Z5XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5hbWUgPT09IFwiUHl0aG9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIG5vdGVib29rTW9kZWwuZXZhbHVhdG9yc1tqXS5uYW1lID0gcGx1Z2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSEFDSyBFTkRcblxuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAoKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHNlc3Npb25JZCA9IGJrU2Vzc2lvbk1hbmFnZXIuc2V0U2Vzc2lvbklkKHNlc3Npb25JZCk7XG5cbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0dXAoXG4gICAgICAgICAgICAgICAgbm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsXG4gICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQpO1xuXG4gICAgICAgICAgICB2YXIgbXVzdHdhaXQ7XG4gICAgICAgICAgICBpZiAoIWlzRXhpc3RpbmdTZXNzaW9uICYmIGJrSGVscGVyLmhhc0NvZGVDZWxsKFwiaW5pdGlhbGl6YXRpb25cIikpIHtcbiAgICAgICAgICAgICAgbXVzdHdhaXQgPSBia0NvcmVNYW5hZ2VyLnNob3cwQnV0dG9uTW9kYWwoXCJUaGlzIG5vdGVib29rIGhhcyBpbml0aWFsaXphdGlvbiBjZWxscy4uLiB3YWl0aW5nIGZvciB0aGVpciBjb21wbGV0aW9uLlwiLCBcIlBsZWFzZSBXYWl0XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHVzZWQgdG8gbG9hZCBldmFsdWF0b3JzIGJlZm9yZSByZW5kZXJpbmcgdGhlIHBhZ2VcbiAgICAgICAgICAgIGlmIChub3RlYm9va01vZGVsICYmIG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykge1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZXMgPSBfKG5vdGVib29rTW9kZWwuZXZhbHVhdG9ycykubWFwKGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZEV2YWx1YXRvcihldiwgIWlzRXhpc3RpbmdTZXNzaW9uKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJrVXRpbHMuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgIGJrVXRpbHMubG9nKFwib3BlblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHVyaTogbm90ZWJvb2tVcmksXG4gICAgICAgICAgICAgICAgICAgIHVyaVR5cGU6IHVyaVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICBtYXhDZWxsTGV2ZWw6IF8obm90ZWJvb2tNb2RlbC5jZWxscykubWF4KGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC5sZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgfSkubGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb3VudDogbm90ZWJvb2tNb2RlbC5jZWxscy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZVJvb3QoXCJpbml0aWFsaXphdGlvblwiKS50aGVuKGZ1bmN0aW9uICgpIHsgaWYobXVzdHdhaXQgIT09IHVuZGVmaW5lZCkgbXVzdHdhaXQuY2xvc2UoKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJMb2FkaW5nIG5vdGVib29rXCIpO1xuICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNFeGlzdGluZ1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgYmtVdGlscy5sb2coXCJvcGVuXCIsIHtcbiAgICAgICAgICAgICAgICB1cmk6IG5vdGVib29rVXJpLFxuICAgICAgICAgICAgICAgIHVyaVR5cGU6IHVyaVR5cGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgICAgICAgICAgbWF4Q2VsbExldmVsOiBfKG5vdGVib29rTW9kZWwuY2VsbHMpLm1heChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbC5sZXZlbDtcbiAgICAgICAgICAgICAgICB9KS5sZXZlbCxcbiAgICAgICAgICAgICAgICBjZWxsQ291bnQ6IG5vdGVib29rTW9kZWwuY2VsbHMubGVuZ3RoXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZVJvb3QoXCJpbml0aWFsaXphdGlvblwiKS50aGVuKGZ1bmN0aW9uICgpIHsgaWYobXVzdHdhaXQgIT09IHVuZGVmaW5lZCkgbXVzdHdhaXQuY2xvc2UoKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbHJMb2FkaW5nU3RhdHVzTWVzc2FnZShcIkxvYWRpbmcgbm90ZWJvb2tcIik7XG4gICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wZW5Vcmk6IGZ1bmN0aW9uKHRhcmdldCwgc2Vzc2lvbklkLCByZXRyeSwgcmV0cnlDb3VudE1heCkge1xuICAgICAgICAgICAgICBpZiAoIXRhcmdldC51cmkpIHtcbiAgICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwoXCJGYWlsZWQgdG8gb3BlbiBub3RlYm9vaywgbm90ZWJvb2tVcmkgaXMgZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0dXNNZXNzYWdlKFwiT3BlbmluZyBVUklcIik7XG4gICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50TWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50TWF4ID0gMTAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSA9IGJrQ29yZU1hbmFnZXIuZ3Vlc3NVcmlUeXBlKHRhcmdldC51cmkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhcmdldC5yZWFkT25seSA9ICEhdGFyZ2V0LnJlYWRPbmx5O1xuICAgICAgICAgICAgICBpZiAoIXRhcmdldC5mb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZm9ybWF0ID0gYmtDb3JlTWFuYWdlci5ndWVzc0Zvcm1hdCh0YXJnZXQudXJpKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBpbXBvcnRlciA9IGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tJbXBvcnRlcih0YXJnZXQuZm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKCFpbXBvcnRlcikge1xuICAgICAgICAgICAgICAgIGlmIChyZXRyeSkge1xuICAgICAgICAgICAgICAgICAgLy8gcmV0cnksIHNvbWV0aW1lcyB0aGUgaW1wb3J0ZXIgY2FtZSBmcm9tIGEgcGx1Z2luIHRoYXQgaXMgYmVpbmcgbG9hZGVkXG4gICAgICAgICAgICAgICAgICByZXRyeUNvdW50TWF4IC09IDE7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsb2FkTm90ZWJvb2sub3BlblVyaSh0YXJnZXQsIHJldHJ5LCByZXRyeUNvdW50TWF4KTtcbiAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNsckxvYWRpbmdTdGF0dXNNZXNzYWdlKFwiT3BlbmluZyBVUklcIik7XG4gICAgICAgICAgICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MUJ1dHRvbk1vZGFsKFwiRmFpbGVkIHRvIG9wZW4gXCIgKyB0YXJnZXQudXJpXG4gICAgICAgICAgICAgICAgICAgICAgKyBcIiBiZWNhdXNlIGZvcm1hdCBcIiArIHRhcmdldC5mb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICArIFwiIHdhcyBub3QgcmVjb2duaXplZC5cIiwgXCJPcGVuIEZhaWxlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVMb2FkZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVMb2FkZXIodGFyZ2V0LnR5cGUpO1xuICAgICAgICAgICAgICAgIGZpbGVMb2FkZXIubG9hZCh0YXJnZXQudXJpKS50aGVuKGZ1bmN0aW9uKGZpbGVDb250ZW50QXNTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gaW1wb3J0ZXIuaW1wb3J0KGZpbGVDb250ZW50QXNTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rTW9kZWwpO1xuICAgICAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnVyaSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgIGJrSGVscGVyLnNob3cxQnV0dG9uTW9kYWwoZGF0YSwgXCJPcGVuIEZhaWxlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJPcGVuaW5nIFVSSVwiKTtcbiAgICAgICAgICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tU2Vzc2lvbjogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbi5sb2FkKHNlc3Npb25JZCkudGhlbihmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gc2Vzc2lvbi5ub3RlYm9va1VyaTtcbiAgICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IHNlc3Npb24udXJpVHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSBzZXNzaW9uLnJlYWRPbmx5O1xuICAgICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBzZXNzaW9uLmZvcm1hdDtcbiAgICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9IGFuZ3VsYXIuZnJvbUpzb24oc2Vzc2lvbi5ub3RlYm9va01vZGVsSnNvbik7XG4gICAgICAgICAgICAgICAgdmFyIGVkaXRlZCA9IHNlc3Npb24uZWRpdGVkO1xuICAgICAgICAgICAgICAgIGxvYWROb3RlYm9va01vZGVsQW5kUmVzZXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQsIHRydWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tSW1wb3J0OiBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgdmFyIG5vdGVib29rID0gJHNlc3Npb25TdG9yYWdlLmltcG9ydGVkTm90ZWJvb2s7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciBpbXBvcnRlciA9IGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tJbXBvcnRlcignYmtyJyk7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va01vZGVsID0gaW1wb3J0ZXIuaW1wb3J0KG5vdGVib29rKTtcbiAgICAgICAgICAgICAgbm90ZWJvb2tNb2RlbCA9IGJrTm90ZWJvb2tWZXJzaW9uTWFuYWdlci5vcGVuKG5vdGVib29rKTtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtcHR5Tm90ZWJvb2s6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICAgICAgICB2YXIgbm90ZWJvb2tNb2RlbCA9XG4gICAgICAgICAgICAgICAgJ3tcImJlYWtlclwiOiBcIjJcIiwgXCJldmFsdWF0b3JzXCI6IFt7XCJuYW1lXCI6IFwiSHRtbFwiLCBcInBsdWdpblwiOiBcIkh0bWxcIn0sJyArXG4gICAgICAgICAgICAgICAgJ3tcIm5hbWVcIjogXCJMYXRleFwiLCBcInBsdWdpblwiOiBcIkxhdGV4XCJ9LCcgK1xuICAgICAgICAgICAgICAgICd7XCJuYW1lXCI6IFwiSmF2YVNjcmlwdFwiLCBcInBsdWdpblwiOiBcIkphdmFTY3JpcHRcIn1dLCBcImNlbGxzXCI6IFtdfSc7XG4gICAgICAgICAgICAgIHZhciBub3RlYm9va1VyaSA9IG51bGw7XG4gICAgICAgICAgICAgIHZhciB1cmlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICAgIG5vdGVib29rTW9kZWwgPSBia05vdGVib29rVmVyc2lvbk1hbmFnZXIub3Blbihub3RlYm9va01vZGVsKTtcbiAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICBub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZmFsc2UsIHNlc3Npb25JZCwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHROb3RlYm9vazogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgICAgICAgIGJrVXRpbHMuZ2V0RGVmYXVsdE5vdGVib29rKCkudGhlbihmdW5jdGlvbihub3RlYm9va01vZGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGVib29rVXJpID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgdXJpVHlwZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsID0gYmtOb3RlYm9va1ZlcnNpb25NYW5hZ2VyLm9wZW4obm90ZWJvb2tNb2RlbCk7XG4gICAgICAgICAgICAgICAgbG9hZE5vdGVib29rTW9kZWxBbmRSZXNldFNlc3Npb24oXG4gICAgICAgICAgICAgICAgICAgIG5vdGVib29rVXJpLCB1cmlUeXBlLCByZWFkT25seSwgZm9ybWF0LCBub3RlYm9va01vZGVsLCBmYWxzZSwgc2Vzc2lvbklkLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgdmFyIGJrTm90ZWJvb2tXaWRnZXQ7XG4gICAgICAgICRzY29wZS5zZXRCa05vdGVib29rID0gZnVuY3Rpb24oYmtOb3RlYm9vaykge1xuICAgICAgICAgIGJrTm90ZWJvb2tXaWRnZXQgPSBia05vdGVib29rO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBfaW1wbCA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciBwcm9tcHRVcmlDaG9vc2VyID0gZnVuY3Rpb24odXJpVHlwZSwgaW5pdFVyaSkge1xuICAgICAgICAgICAgaWYgKCF1cmlUeXBlKSB7XG4gICAgICAgICAgICAgIHVyaVR5cGUgPSBcImZpbGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcih1cmlUeXBlKTtcbiAgICAgICAgICAgIGlmICghZmlsZVNhdmVyIHx8ICFmaWxlU2F2ZXIuc2hvd0ZpbGVDaG9vc2VyKSB7XG4gICAgICAgICAgICAgIGZpbGVTYXZlciA9IGJrQ29yZU1hbmFnZXIuZ2V0RmlsZVNhdmVyKFwiZmlsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbGVTYXZlci5zaG93RmlsZUNob29zZXIoaW5pdFVyaSkudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShyZXQudXJpKSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcImNhbmNlbGxlZFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBwcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5zaG93MkJ1dHRvbk1vZGFsKFxuICAgICAgICAgICAgICAgIFwiRmlsZSBcIiArIHVyaSArIFwiIGV4aXN0cy4gT3ZlcndyaXRlP1wiLFxuICAgICAgICAgICAgICAgIFwiRmlsZSBleGlzdHNcIixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgXCJDYW5jZWxcIiwgXCJPdmVyd3JpdGVcIiwgXCJcIiwgXCJidG4tZGFuZ2VyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzYXZlQWx3YXlzT3ZlcndyaXRlID0gZnVuY3Rpb24odXJpLCB1cmlUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIodXJpVHlwZSk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCkubm90ZWJvb2tNb2RlbEFzU3RyaW5nO1xuICAgICAgICAgICAgICByZXR1cm4gZmlsZVNhdmVyLnNhdmUodXJpLCBjb250ZW50LCB0cnVlKTt9LCAxKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe3VyaTogdXJpLCB1cmlUeXBlOiB1cmlUeXBlfSk7XG4gICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgX3NhdmVQcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKGRlZmVycmVkLCB1cmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgIHZhciBmaWxlU2F2ZXIgPSBia0NvcmVNYW5hZ2VyLmdldEZpbGVTYXZlcih1cmlUeXBlKTtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZHVtcERpc3BsYXlTdGF0dXMoKTtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2F2ZURhdGEoKS5ub3RlYm9va01vZGVsQXNTdHJpbmc7XG4gICAgICAgICAgICAgIHJldHVybiBmaWxlU2F2ZXIuc2F2ZSh1cmksIGNvbnRlbnQpO1xuICAgICAgICAgICAgfSwgMSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7dXJpOiB1cmksIHVyaVR5cGU6IHVyaVR5cGV9KTsgLy8gZmlsZSBzYXZlIHN1Y2NlZWRcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJleGlzdHNcIikge1xuICAgICAgICAgICAgICAgIHByb21wdElmT3ZlcndyaXRlKHVyaSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzYXZlQWx3YXlzT3ZlcndyaXRlKHVyaSwgdXJpVHlwZSkudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXQpOyAvLyBmaWxlIHNhdmUgc3VjY2VlZFxuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pOyAvLyBmaWxlIHNhdmUgZmFpbGVkXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIF9zYXZlUHJvbXB0VXJpQ2hvb3NlcihkZWZlcnJlZCwgdXJpVHlwZSwgdXJpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZWFzb24gPT09IFwiaXNEaXJlY3RvcnlcIikge1xuICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzFCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgdXJpICsgXCIgaXMgYSBkaXJlY3RvcnkuIFBsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgbG9jYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJTYXZlIEZhaWxlZFwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3NhdmVQcm9tcHRVcmlDaG9vc2VyKGRlZmVycmVkLCB1cmlUeXBlLCB1cmkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVhc29uKTsgLy8gZmlsZSBzYXZlIGZhaWxlZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBfc2F2ZVByb21wdFVyaUNob29zZXIgPSBmdW5jdGlvbihkZWZlcnJlZCwgdXJpVHlwZSwgaW5pdFVyaSkge1xuICAgICAgICAgICAgcHJvbXB0VXJpQ2hvb3Nlcih1cmlUeXBlLCBpbml0VXJpKS50aGVuKGZ1bmN0aW9uKHJldCkge1xuICAgICAgICAgICAgICBfc2F2ZVByb21wdElmT3ZlcndyaXRlKGRlZmVycmVkLCByZXQudXJpLCByZXQudXJpVHlwZSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiY2FuY2VsbGVkXCIpOyAvLyBmaWxlIHNhdmUgY2FuY2VsbGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVQcm9tcHRDaG9vc2VVcmkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgICAgIF9zYXZlUHJvbXB0VXJpQ2hvb3NlcihkZWZlcnJlZCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNhdmVQcm9tcHRJZk92ZXJ3cml0ZSA9IGZ1bmN0aW9uKHVyaSwgdXJpVHlwZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgX3NhdmVQcm9tcHRJZk92ZXJ3cml0ZShkZWZlcnJlZCwgdXJpLCB1cmlUeXBlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZVN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXR1c01lc3NhZ2UoXCJTYXZpbmdcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgc2F2ZURvbmUgPSBmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZChmYWxzZSk7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnVwZGF0ZU5vdGVib29rVXJpKHJldC51cmksIHJldC51cmlUeXBlLCBmYWxzZSwgXCJia3JcIik7XG4gICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIlNhdmVkXCIpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc2F2ZUZhaWxlZCA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGlmIChtc2cgPT09IFwiY2FuY2VsbGVkXCIpIHtcbiAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJDYW5jZWxsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cxQnV0dG9uTW9kYWwobXNnLCBcIlNhdmUgRmFpbGVkXCIpO1xuICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIlNhdmUgRmFpbGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgZXZhbENvZGVJZCA9IDA7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogXCJia05vdGVib29rQXBwXCIsXG4gICAgICAgICAgICBnZXRTZXNzaW9uSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRTZXNzaW9uSWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXROb3RlYm9va01vZGVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEJlYWtlck9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldEJlYWtlck9iamVjdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdHVzTWVzc2FnZShtZXNzYWdlLCBub2RpZ2VzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdXBkYXRlTG9hZGluZ1N0YXR1c01lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZ2V0TG9hZGluZ1N0YXR1c01lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclN0YXR1czogZnVuY3Rpb24obWVzc2FnZSwgbm9kaWdlc3QpIHtcbiAgICAgICAgICAgICAgY2xyTG9hZGluZ1N0YXR1c01lc3NhZ2UobWVzc2FnZSwgbm9kaWdlc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXM6IGZ1bmN0aW9uKG1lc3NhZ2UsIG5vZGlnZXN0KSB7XG4gICAgICAgICAgICAgIHNob3dUcmFuc2llbnRTdGF0dXNNZXNzYWdlKG1lc3NhZ2UsIG5vZGlnZXN0KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNhdmVOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNhdmVTdGFydCgpO1xuICAgICAgICAgICAgICB2YXIgdGhlbmFibGU7XG4gICAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzU2F2YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICAgICAgICAgIHRoZW5hYmxlID0gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgc2F2ZURhdGEgPSBia1Nlc3Npb25NYW5hZ2VyLmdldFNhdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgZmlsZVNhdmVyID0gYmtDb3JlTWFuYWdlci5nZXRGaWxlU2F2ZXIoc2F2ZURhdGEudXJpVHlwZSk7XG4gICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IHNhdmVEYXRhLm5vdGVib29rTW9kZWxBc1N0cmluZztcbiAgICAgICAgICAgICAgICAgIGZpbGVTYXZlci5zYXZlKHNhdmVEYXRhLm5vdGVib29rVXJpLCBjb250ZW50LCB0cnVlKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHt1cmk6IHNhdmVEYXRhLm5vdGVib29rVXJpLCB1cmlUeXBlOiBzYXZlRGF0YS51cmlUeXBlfSk7XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoZW5hYmxlID0gc2F2ZVByb21wdENob29zZVVyaSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0aGVuYWJsZS50aGVuKHNhdmVEb25lLCBzYXZlRmFpbGVkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYXZlTm90ZWJvb2tBczogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUpIHtcbiAgICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShub3RlYm9va1VyaSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2Fubm90IHNhdmUgbm90ZWJvb2ssIG5vdGVib29rVXJpIGlzIGVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlU3RhcnQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNhdmVQcm9tcHRJZk92ZXJ3cml0ZShub3RlYm9va1VyaSwgdXJpVHlwZSkudGhlbihzYXZlRG9uZSwgc2F2ZUZhaWxlZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2VOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgaWYgKGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmlzQW55SW5Qcm9ncmVzcygpICkge1xuICAgICAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgXCJBbGwgcnVubmluZyBhbmQgcGVuZGluZyBjZWxscyB3aWxsIGJlIGNhbmNlbGxlZC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJXYXJuaW5nIVwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5jYW5jZWxBbGwoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2xvc2VOb3RlYm9vaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTsgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHNlbGYuX2Nsb3NlTm90ZWJvb2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfY2xvc2VOb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgdmFyIGNsb3NlU2Vzc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuY2xvc2UoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYmtDb3JlTWFuYWdlci5nb3RvQ29udHJvbFBhbmVsKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBub3RlYm9va1RpdGxlID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va1RpdGxlKCk7XG4gICAgICAgICAgICAgICAgYmtIZWxwZXIuc2hvdzNCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICAgICAgXCJEbyB5b3Ugd2FudCB0byBzYXZlIFwiICsgbm90ZWJvb2tUaXRsZSArIFwiP1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbmZpcm0gY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5zYXZlTm90ZWJvb2soKS50aGVuKGNsb3NlU2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2Ugd2l0aG91dCBzYXZpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgY2xvc2VTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG51bGwsIFwiU2F2ZVwiLCBcIkRvbid0IHNhdmVcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xsYXBzZUFsbFNlY3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZ2V0Tm90ZWJvb2tNb2RlbCgpLmNlbGxzLCBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwudHlwZSA9PSBcInNlY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgY2VsbC5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzQ29kZUNlbGw6IGZ1bmN0aW9uKHRvRXZhbCkge1xuICAgICAgICAgICAgICB2YXIgY2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgICAgICAgICAgICAvLyB0b0V2YWwgY2FuIGJlIGEgdGFnTmFtZSAoc3RyaW5nKSwgZWl0aGVyIFwiaW5pdGlhbGl6YXRpb25cIiwgbmFtZSBvZiBhbiBldmFsdWF0b3Igb3IgdXNlciBkZWZpbmVkIHRhZ1xuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxJRCAoc3RyaW5nKVxuICAgICAgICAgICAgICAvLyBvciBhIGNlbGxNb2RlbFxuICAgICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9FdmFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5oYXNDZWxsKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldEFsbENvZGVDZWxscyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIGNlbGwsIGp1c3QgZ2V0IHRoZSBjZWxsIG1vZGVsIGZyb20gY2VsbElEXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIG5vdCBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBia1Nlc3Npb25NYW5hZ2VyLm5vdGVib29rTW9kZWxHZXRJbml0aWFsaXphdGlvbkNlbGxzKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgdXNlciB0YWcgZm9yIGEgY2VsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBpdCBpcyBhIGV2YWx1YXRvciBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGxzV2l0aEV2YWx1YXRvcih0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSB1bmRlZmluZWQgfHwgKF8uaXNBcnJheSh0b0V2YWwpICYmIHRvRXZhbC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlOiBmdW5jdGlvbih0b0V2YWwpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gdG9FdmFsIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsTW9kZWxcbiAgICAgICAgICAgICAgLy8gb3IgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvRXZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsT3AuaGFzQ2VsbCh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHNlY3Rpb24gY2VsbCBvciByb290IGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRBbGxDb2RlQ2VsbHModG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbCh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBub3QgYSBjZWxsSURcbiAgICAgICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IFwiaW5pdGlhbGl6YXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gYmtTZXNzaW9uTWFuYWdlci5ub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNlbGxPcC5oYXNVc2VyVGFnKHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhVc2VyVGFnKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgaXQgaXMgYSBldmFsdWF0b3IgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRvRXZhbCA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc0FycmF5KHRvRXZhbCkgJiYgdG9FdmFsLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBzaG93VHJhbnNpZW50U3RhdHVzTWVzc2FnZShcIkVSUk9SOiBjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjYW5ub3QgZmluZCBhbnl0aGluZyB0byBldmFsdWF0ZVwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHRvRXZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGUodG9FdmFsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGVBbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlUm9vdDogZnVuY3Rpb24odG9FdmFsKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIC8vIHRvRXZhbCBjYW4gYmUgYSB0YWdOYW1lIChzdHJpbmcpLCBlaXRoZXIgXCJpbml0aWFsaXphdGlvblwiLCBuYW1lIG9mIGFuIGV2YWx1YXRvciBvciB1c2VyIGRlZmluZWQgdGFnXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbElEIChzdHJpbmcpXG4gICAgICAgICAgICAgIC8vIG9yIGEgY2VsbE1vZGVsXG4gICAgICAgICAgICAgIC8vIG9yIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b0V2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbE9wLmhhc0NlbGwodG9FdmFsKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcih0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBzZWN0aW9uIGNlbGwgb3Igcm9vdCBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2VsbCwganVzdCBnZXQgdGhlIGNlbGwgbW9kZWwgZnJvbSBjZWxsSURcbiAgICAgICAgICAgICAgICAgICAgdG9FdmFsID0gY2VsbE9wLmdldENlbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgICBpZiAodG9FdmFsID09PSBcImluaXRpYWxpemF0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICAgIHRvRXZhbCA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjZWxsT3AuaGFzVXNlclRhZyh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSB1c2VyIHRhZyBmb3IgYSBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoVXNlclRhZyh0b0V2YWwpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgICB0b0V2YWwgPSBjZWxsT3AuZ2V0Q2VsbHNXaXRoRXZhbHVhdG9yKHRvRXZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0b0V2YWwgPT09IHVuZGVmaW5lZCB8fCAoIV8uaXNBcnJheSh0b0V2YWwpICYmIHRvRXZhbC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RyYW5zaWVudFN0YXR1c01lc3NhZ2UoXCJFUlJPUjogY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY2Fubm90IGZpbmQgYW55dGhpbmcgdG8gZXZhbHVhdGVcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIV8uaXNBcnJheSh0b0V2YWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmV2YWx1YXRlUm9vdCh0b0V2YWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBia0V2YWx1YXRlSm9iTWFuYWdlci5ldmFsdWF0ZVJvb3RBbGwodG9FdmFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2YWx1YXRlQ29kZTogZnVuY3Rpb24oZXZhbHVhdG9yLCBjb2RlKSB7XG4gICAgICAgICAgICAgIHZhciBvdXRjb250YWluZXIgPSB7IH07XG4gICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGJrSGVscGVyLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICAgIGV2YWxDb2RlSWQrKztcbiAgICAgICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZXZhbHVhdGUoe1xuICAgICAgICAgICAgICAgIGlkOiBcIm9uVGhlRmx5Q2VsbF9cIitldmFsQ29kZUlkLFxuICAgICAgICAgICAgICAgIGV2YWx1YXRvcjogZXZhbHVhdG9yLFxuICAgICAgICAgICAgICAgIGlucHV0OiB7IGJvZHk6IGNvZGUgfSxcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IG91dGNvbnRhaW5lclxuICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5yZXNvbHZlKG91dGNvbnRhaW5lci5yZXN1bHQpOyB9LCBmdW5jdGlvbihlcnIpIHsgZGVmZXJyZWQucmVqZWN0KGVycik7IH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhZGRFdmFsdWF0b3Ioc2V0dGluZ3MsIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUV2YWx1YXRvcjogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlci5yZW1vdmVFdmFsdWF0b3IocGx1Z2luKTtcbiAgICAgICAgICAgICAgZXZhbHVhdG9yTWVudUl0ZW1zID0gXy5yZWplY3QoZXZhbHVhdG9yTWVudUl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PSBwbHVnaW47XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEV2YWx1YXRvck1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBldmFsdWF0b3JNZW51SXRlbXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QmtOb3RlYm9va1dpZGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia05vdGVib29rV2lkZ2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZU5vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIudG9nZ2xlTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgbmFtZXMgb2YgYWxsIGVuYWJsZWQgZXZhbHVhdG9yc1xuICAgICAgICAgICAgZ2V0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBldmFscyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGV2YWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2YWxzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0IChhIHN1YnNldCBvZikgY29kZSBjZWxsc1xuICAgICAgICAgICAgZ2V0Q29kZUNlbGxzOiBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgLy8gZmlsdGVyIGNhbiBiZSBhIHRhZ05hbWUgKHN0cmluZyksIGVpdGhlciBcImluaXRpYWxpemF0aW9uXCIsIG5hbWUgb2YgYW4gZXZhbHVhdG9yIG9yIHVzZXIgZGVmaW5lZCB0YWdcbiAgICAgICAgICAgICAgLy8gb3IgYSBjZWxsSUQgKHN0cmluZylcbiAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGNvZGUgY2VsbHNcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGNlbGxPcC5oYXNDZWxsKGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY2VsbElEXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxPcC5pc0NvbnRhaW5lcihmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgc2VjdGlvbiBjZWxsIG9yIHJvb3QgY2VsbFxuICAgICAgICAgICAgICAgICAgLy8gaW4gdGhpcyBjYXNlIHRvRXZhbCBpcyBnb2luZyB0byBiZSBhbiBhcnJheSBvZiBjZWxsTW9kZWxzXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjZWxsT3AuZ2V0QWxsQ29kZUNlbGxzKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjZWxsLCBqdXN0IGdldCB0aGUgY2VsbCBtb2RlbCBmcm9tIGNlbGxJRFxuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldENlbGwoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IGEgY2VsbElEXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gXCJpbml0aWFsaXphdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGJrU2Vzc2lvbk1hbmFnZXIubm90ZWJvb2tNb2RlbEdldEluaXRpYWxpemF0aW9uQ2VsbHMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2VsbE9wLmhhc1VzZXJUYWcoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHVzZXIgdGFnIGZvciBhIGNlbGxcbiAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FzZSB0b0V2YWwgaXMgZ29pbmcgdG8gYmUgYW4gYXJyYXkgb2YgY2VsbE1vZGVsc1xuICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2VsbE9wLmdldENlbGxzV2l0aFVzZXJUYWcoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGl0IGlzIGEgZXZhbHVhdG9yIG5hbWUsXG4gICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2UgdG9FdmFsIGlzIGdvaW5nIHRvIGJlIGFuIGFycmF5IG9mIGNlbGxNb2RlbHNcbiAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNlbGxPcC5nZXRDZWxsc1dpdGhFdmFsdWF0b3IoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8ICghXy5pc0FycmF5KGZpbHRlcikgJiYgZmlsdGVyLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwIDsgaSA8IGZpbHRlci5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IGZpbHRlcltpXTtcbiAgICAgICAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICAgICAgICBvLmNlbGxJZCA9IGNlbGwuaWQ7XG4gICAgICAgICAgICAgICAgICBvLmV2YWx1YXRvcklkID0gY2VsbC5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgICAgICBvLmNvZGUgPSBjZWxsLmlucHV0LmJvZHk7XG4gICAgICAgICAgICAgICAgICBvLnRhZ3MgPSBjZWxsLnRhZ3M7XG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbC5kYXRhcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLmRhdGFyZXN1bHQ7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwub3V0cHV0ICE9PSB1bmRlZmluZWQgJiYgY2VsbC5vdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwub3V0cHV0LnJlc3VsdC50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXQucmVzdWx0LnR5cGUgPT09ICdCZWFrZXJEaXNwbGF5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBjZWxsLm91dHB1dC5yZXN1bHQub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dHR5cGUgPSBjZWxsLm91dHB1dC5yZXN1bHQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gY2VsbC5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGNlbGwub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgby50eXBlID0gXCJCZWFrZXJDb2RlQ2VsbFwiO1xuICAgICAgICAgICAgICAgICAgcmV0LnB1c2gobyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICAgICAgby5jZWxsSWQgPSBmaWx0ZXIuaWQ7XG4gICAgICAgICAgICAgICAgby5ldmFsdWF0b3JJZCA9IGZpbHRlci5ldmFsdWF0b3I7XG4gICAgICAgICAgICAgICAgby5jb2RlID0gZmlsdGVyLmlucHV0LmJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5kYXRhcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIG8ub3V0cHV0ID0gZmlsdGVyLmRhdGFyZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3V0cHV0ICE9PSB1bmRlZmluZWQgJiYgZmlsdGVyLm91dHB1dC5yZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5vdXRwdXQucmVzdWx0LnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm91dHB1dC5yZXN1bHQudHlwZSA9PT0gJ0JlYWtlckRpc3BsYXknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXQgPSBmaWx0ZXIub3V0cHV0LnJlc3VsdC5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgby5vdXRwdXR0eXBlID0gZmlsdGVyLm91dHB1dC5yZXN1bHQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGZpbHRlci5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvLm91dHB1dCA9IGZpbHRlci5vdXRwdXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvLnRhZ3MgPSBmaWx0ZXIudGFncztcbiAgICAgICAgICAgICAgICBvLnR5cGUgPSBcIkJlYWtlckNvZGVDZWxsXCI7XG4gICAgICAgICAgICAgICAgcmV0LnB1c2gobyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXQgYSBjb2RlIGNlbGwgYm9keVxuICAgICAgICAgICAgc2V0Q29kZUNlbGxCb2R5OiBmdW5jdGlvbihuYW1lLCBjb2RlKSB7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIGlmICghY2VsbE9wLmhhc0NlbGwobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbCAgPSBjZWxsT3AuZ2V0Q2VsbChuYW1lKTtcbiAgICAgICAgICAgICAgaWYgKCBjZWxsLmlucHV0ID09PSB1bmRlZmluZWQgfHwgY2VsbC5pbnB1dC5ib2R5ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICBjZWxsLmlucHV0LmJvZHkgPSBjb2RlO1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXQgYSBjb2RlIGNlbGwgZXZhbHVhdG9yXG4gICAgICAgICAgICBzZXRDb2RlQ2VsbEV2YWx1YXRvcjogZnVuY3Rpb24obmFtZSwgZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgIHZhciBldmFscyA9IHRoaXMuZ2V0RXZhbHVhdG9ycygpO1xuICAgICAgICAgICAgICBpZiAoIGV2YWxzLmluZGV4T2YoZXZhbHVhdG9yKT09LTEgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBldmFsdWF0b3IgXCIrZXZhbHVhdG9yK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgICAgICAgIGlmICghY2VsbE9wLmhhc0NlbGwobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgICAgICAgICBpZiAoY2VsbE9wLmlzQ29udGFpbmVyKG5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICB2YXIgY2VsbCAgPSBjZWxsT3AuZ2V0Q2VsbChuYW1lKTtcbiAgICAgICAgICAgICAgaWYgKCBjZWxsLmlucHV0ID09PSB1bmRlZmluZWQgfHwgY2VsbC5pbnB1dC5ib2R5ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkVycm9yOiBjZWxsIFwiK25hbWUrXCIgaXMgbm90IGNvZGUgY2VsbFwiO1xuICAgICAgICAgICAgICBjZWxsLmV2YWx1YXRvciA9IGV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgY2VsbE9wLnJlYnVpbGRNYXBzKCk7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldCBhIGNvZGUgY2VsbCB0YWdzXG4gICAgICAgICAgICBzZXRDb2RlQ2VsbFRhZ3M6IGZ1bmN0aW9uKG5hbWUsIHRhZ3MpIHtcbiAgICAgICAgICAgICAgdmFyIGNlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgICAgICAgaWYgKCFjZWxsT3AuaGFzQ2VsbChuYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJFcnJvcjogY2VsbCBcIituYW1lK1wiIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICAgICAgICAgIGlmIChjZWxsT3AuaXNDb250YWluZXIobmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRXJyb3I6IGNlbGwgXCIrbmFtZStcIiBpcyBub3QgY29kZSBjZWxsXCI7XG4gICAgICAgICAgICAgIHZhciBjZWxsICA9IGNlbGxPcC5nZXRDZWxsKG5hbWUpO1xuICAgICAgICAgICAgICBjZWxsLnRhZ3MgPSB0YWdzO1xuICAgICAgICAgICAgICBjZWxsT3AucmVidWlsZE1hcHMoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgYmtDb3JlTWFuYWdlci5zZXRCa0FwcEltcGwoX2ltcGwpO1xuXG4gICAgICAgIHZhciBzZXREb2N1bWVudFRpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGVkaXRlZCA9ICRzY29wZS5pc0VkaXRlZCgpLFxuICAgICAgICAgICAgICBmaWxlbmFtZSA9ICRzY29wZS5maWxlbmFtZSgpLFxuICAgICAgICAgICAgICB0aXRsZTtcblxuICAgICAgICAgIHRpdGxlID0gZmlsZW5hbWU7XG4gICAgICAgICAgaWYgKGVkaXRlZCkgdGl0bGUgPSAnKicgKyB0aXRsZTtcblxuICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRWRpdGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va01vZGVsRWRpdGVkKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2lzRWRpdGVkKCknLCBmdW5jdGlvbihlZGl0ZWQsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKGVkaXRlZCA9PT0gb2xkVmFsdWUpIHJldHVybjtcbiAgICAgICAgICBzZXREb2N1bWVudFRpdGxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdmaWxlbmFtZSgpJywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsID09PSBvbGRWYWwpIHJldHVybjtcbiAgICAgICAgICBzZXREb2N1bWVudFRpdGxlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBpbnRlcnZhbElEID0gbnVsbDtcbiAgICAgICAgdmFyIHN0b3BBdXRvQmFja3VwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKGludGVydmFsSUQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGludGVydmFsSUQgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc3RhcnRBdXRvQmFja3VwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RvcEF1dG9CYWNrdXAoKTtcbiAgICAgICAgICBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoYmtTZXNzaW9uTWFuYWdlci5iYWNrdXAsIDYwICogMTAwMCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRNZW51cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia01lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVzKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBrZXlkb3duSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gODMpKSB7IC8vIEN0cmwgKyBzXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBfaW1wbC5zYXZlTm90ZWJvb2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLmFsdEtleSAmJiAoZS53aGljaCA9PT0gODMpKSB7IC8vIENtZCArIHNcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIF9pbXBsLnNhdmVOb3RlYm9vaygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQubm9kZU5hbWUgIT09IFwiVEVYVEFSRUFcIikge1xuICAgICAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLndoaWNoID09PSA5MCkgeyAvLyBDdHJsICsgelxuICAgICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIudW5kbygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgKGUud2hpY2ggPT09IDkwKSkgeyAvLyBDbWQgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci51bmRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY3RybEtleSAmJiBlLndoaWNoID09PSA4OSkgeyAvLyBDdHJsICsgelxuICAgICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIucmVkbygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgKGUud2hpY2ggPT09IDg5KSkgeyAvLyBDbWQgKyB6XG4gICAgICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5yZWRvKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUT0RPIGltcGxlbWVudCBnbG9iYWwgcmVkb1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJChkb2N1bWVudCkuYmluZCgna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcbiAgICAgICAgdmFyIG9uRGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuYmFja3VwKCk7XG4gICAgICAgICAgc3RvcEF1dG9CYWNrdXAoKTtcbiAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNldEJrQXBwSW1wbChudWxsKTtcbiAgICAgICAgICAkKGRvY3VtZW50KS51bmJpbmQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG4gICAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gbnVsbDtcbiAgICAgICAgICBia1V0aWxzLnJlbW92ZUNvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIG9uRGVzdHJveSk7XG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCgpO1xuICAgICAgICAgIGlmIChia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tNb2RlbEVkaXRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIG5vdGVib29rIGhhcyBiZWVuIGVkaXRlZCBidXQgbm90IHNhdmVkLCBpZiB5b3UgY2xvc2UgdGhlIHBhZ2UgeW91ciBjaGFuZ2VzIG1heSBiZSBsb3N0XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChia0V2YWx1YXRlSm9iTWFuYWdlci5pc0FueUluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiU29tZSBjZWxscyBhcmUgc3RpbGwgcnVubmluZy4gTGVhdmluZyB0aGUgcGFnZSBub3cgd2lsbCBjYXVzZSBjYW5jZWxsaW5nIGFuZCByZXN1bHQgYmUgbG9zdFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkRlc3Ryb3koKTtcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93Lm9udW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuY2FuY2VsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHN0YXJ0QXV0b0JhY2t1cCgpO1xuICAgICAgICAkc2NvcGUuZ290b0NvbnRyb2xQYW5lbCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGJrVXRpbHMuaXNNaWRkbGVDbGljayhldmVudCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFwiLi9cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ290b0NvbnRyb2xQYW5lbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZmlsZW5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va1RpdGxlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiRvbihcIiRsb2NhdGlvbkNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGJrRXZhbHVhdGVKb2JNYW5hZ2VyLmlzQW55SW5Qcm9ncmVzcygpICYmIG5leHQuaW5kZXhPZihcImZvcmNlPXllc1wiKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBia0NvcmVNYW5hZ2VyLnNob3cyQnV0dG9uTW9kYWwoXG4gICAgICAgICAgICAgICAgXCJBbGwgcnVubmluZyBhbmQgcGVuZGluZyBjZWxscyB3aWxsIGJlIGNhbmNlbGxlZC5cIixcbiAgICAgICAgICAgICAgICBcIldhcm5pbmchXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5jYW5jZWxBbGwoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLmJhY2t1cCgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciByb3V0ZVBhcmFtcyA9IHtmb3JjZTogXCJ5ZXNcIn07XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHNwbGl0cyA9IGRlY29kZVVSSUNvbXBvbmVudChuZXh0LnNwbGl0KFwiI1wiKVsxXSkuc3BsaXQoXCI/XCIpO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gc3BsaXRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2ggPSBzcGxpdHNbMV07XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhcnMgPSBzZWFyY2guc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhaXIgPSB2LnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlUGFyYW1zW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChwYXRoKS5zZWFyY2gocm91dGVQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUucHJvbXB0VG9TYXZlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcm9tcHRlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChwcm9tcHRlZCkgeyAvLyBwcmV2ZW50IHByb21wdGluZyBtdWx0aXBsZSBhdCB0aGUgc2FtZSB0aW1lXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb21wdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvdzJCdXR0b25Nb2RhbChcbiAgICAgICAgICAgICAgICBcIkJlYWtlciBzZXJ2ZXIgZGlzY29ubmVjdGVkLiBGdXJ0aGVyIGVkaXRzIHdpbGwgbm90IGJlIHNhdmVkLjxicj5cIiArXG4gICAgICAgICAgICAgICAgXCJTYXZlIGN1cnJlbnQgbm90ZWJvb2sgYXMgYSBmaWxlP1wiLFxuICAgICAgICAgICAgICAgIFwiRGlzY29ubmVjdGVkXCIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAvLyBcIlNhdmVcIiwgc2F2ZSB0aGUgbm90ZWJvb2sgYXMgYSBmaWxlIG9uIHRoZSBjbGllbnQgc2lkZVxuICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5kdW1wRGlzcGxheVN0YXR1cygpO1xuICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGJrVXRpbHMuc2F2ZUFzQ2xpZW50RmlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuZ2V0U2F2ZURhdGEoKS5ub3RlYm9va01vZGVsQXNTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIFwibm90ZWJvb2suYmtyXCIpO1xuICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFwiTm90IG5vd1wiLCBoaWphY2sgYWxsIGtleXByZXNzIGV2ZW50cyB0byBwcm9tcHQgYWdhaW5cbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsICRzY29wZS5wcm9tcHRUb1NhdmUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJTYXZlXCIsIFwiTm90IG5vd1wiLCBcImJ0bi1wcmltYXJ5XCIsIFwiXCJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHJvbXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3Rpb25NYW5hZ2VyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBSRUNPTk5FQ1RfVElNRU9VVCA9IDUwMDA7IC8vIDUgc2Vjb25kc1xuICAgICAgICAgIHZhciBPRkZMSU5FX01FU1NBR0UgPSBcIm9mZmxpbmVcIjtcbiAgICAgICAgICB2YXIgQ09OTkVDVElOR19NRVNTQUdFID0gXCJyZWNvbm5lY3RpbmdcIjtcbiAgICAgICAgICB2YXIgcmVjb25uZWN0VGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB2YXIgc3RhdHVzTWVzc2FnZSA9IE9GRkxJTkVfTUVTU0FHRTtcbiAgICAgICAgICB2YXIgZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgdmFyIGluZGljYXRlUmVjb25uZWN0RmFpbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9wV2FpdGluZ1JlY29ubmVjdCgpO1xuICAgICAgICAgICAgc3RhdHVzTWVzc2FnZSA9IE9GRkxJTkVfTUVTU0FHRTtcbiAgICAgICAgICAgIGJrVXRpbHMuZGlzY29ubmVjdCgpOyAvLyBwcmV2ZW50IGZ1cnRoZXIgYXR0ZW1wdGluZyB0byByZWNvbm5lY3RcbiAgICAgICAgICAgICRzY29wZS5wcm9tcHRUb1NhdmUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciB3YWl0UmVjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdGF0dXNNZXNzYWdlID0gQ09OTkVDVElOR19NRVNTQUdFO1xuXG4gICAgICAgICAgICAvLyB3YWl0IGZvciA1IHNjZW9uZHMsIGlmIHJlY29ubmVjdCBkaWRuJ3QgaGFwcGVuLCBwcm9tcHQgdG8gc2F2ZVxuICAgICAgICAgICAgaWYgKCFyZWNvbm5lY3RUaW1lb3V0KSB7XG4gICAgICAgICAgICAgIHJlY29ubmVjdFRpbWVvdXQgPSAkdGltZW91dChpbmRpY2F0ZVJlY29ubmVjdEZhaWxlZCwgUkVDT05ORUNUX1RJTUVPVVQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgdXNlciBhdHRlbXB0cyB0byBpbnRlcmFjdCB3aXRoaW4gNSBzZWNvbmQsIGFsc28gcHJvbXB0IHRvIHNhdmVcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGluZGljYXRlUmVjb25uZWN0RmFpbGVkLCB0cnVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBzdG9wV2FpdGluZ1JlY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHJlY29ubmVjdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHJlY29ubmVjdFRpbWVvdXQpO1xuICAgICAgICAgICAgICByZWNvbm5lY3RUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgaW5kaWNhdGVSZWNvbm5lY3RGYWlsZWQsIHRydWUpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBkaXNjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB3YWl0UmVjb25uZWN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25SZWNvbm5lY3RlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuaXNTZXNzaW9uVmFsaWQoKS50aGVuKGZ1bmN0aW9uKGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgc3RvcFdhaXRpbmdSZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgIGRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5yZWNvbm5lY3RFdmFsdWF0b3JzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGluZGljYXRlUmVjb25uZWN0RmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTdGF0dXNNZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1c01lc3NhZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNEaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZGlzY29ubmVjdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgJHNjb3BlLmdldE9mZmluZU1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbk1hbmFnZXIuZ2V0U3RhdHVzTWVzc2FnZSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaXNEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbk1hbmFnZXIuaXNEaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBia1V0aWxzLmFkZENvbm5lY3RlZFN0YXR1c0xpc3RlbmVyKGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgIGlmIChtc2cuc3VjY2Vzc2Z1bCAhPT0gISRzY29wZS5pc0Rpc2Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICB2YXIgZGlzY29ubmVjdGVkID0gIW1zZy5zdWNjZXNzZnVsO1xuICAgICAgICAgICAgaWYgKGRpc2Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgICBjb25uZWN0aW9uTWFuYWdlci5vbkRpc2Nvbm5lY3RlZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29ubmVjdGlvbk1hbmFnZXIub25SZWNvbm5lY3RlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdpc0Rpc2Nvbm5lY3RlZCgpJywgZnVuY3Rpb24oZGlzY29ubmVjdGVkKSB7XG4gICAgICAgICAgaWYgKGRpc2Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgc3RvcEF1dG9CYWNrdXAoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhcnRBdXRvQmFja3VwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZXREb2N1bWVudFRpdGxlKCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIGFuIGV4aXN0aW5nIHNlc3Npb24gaXMgY2xlYXJlZCBzbyB0aGF0IHRoZSBlbXB0eSBub3RlYm9vayBtb2RlbFxuICAgICAgICAvLyBtYWtlcyB0aGUgVUkgaXMgYmxhbmsgaW1tZWRpYXRlbHkgKGluc3RlYWQgb2Ygc2hvd2luZyBsZWZ0b3ZlciBmcm9tIGEgcHJldmlvdXMgc2Vzc2lvbilcbiAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5jbGVhcigpO1xuXG4gICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgaWYgKHdpbmRvdy5iZWFrZXIgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuYmVha2VyLmlzRW1iZWRkZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJrVXRpbHMuaHR0cEdldCgnLi4vYmVha2VyL3Jlc3QvdXRpbC9nZXRNZW51UGx1Z2lucycpXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWVudVVybHMpIHtcbiAgICAgICAgICAgIG1lbnVVcmxzLmZvckVhY2goZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIubG9hZE1lbnVQbHVnaW4odXJsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51ZXMgPSB3aW5kb3cuYmVha2VyLmdldE1lbnVJdGVtcygpO1xuICAgICAgICAgIGJrTWVudVBsdWdpbk1hbmFnZXIuYXR0YWNoTWVudXMobWVudWVzKTtcbiAgICAgICAgfVxuICAgICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5yZXNldCgpO1xuICAgICAgICBia0V2YWx1YXRlSm9iTWFuYWdlci5yZXNldCgpO1xuXG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgc2Vzc2lvbklkID0gJHJvdXRlUGFyYW1zLnNlc3Npb25JZDtcbiAgICAgICAgICB2YXIgc2Vzc2lvblJvdXRlUmVzb2x2ZSA9ICRyb3V0ZS5jdXJyZW50LiQkcm91dGUucmVzb2x2ZTtcbiAgICAgICAgICB2YXIgbmV3U2Vzc2lvbiA9ICRyb3V0ZS5jdXJyZW50LmxvY2Fscy5pc05ld1Nlc3Npb247XG4gICAgICAgICAgaWYgKG5ld1Nlc3Npb24pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzZXNzaW9uUm91dGVSZXNvbHZlLmlzTmV3U2Vzc2lvbjtcbiAgICAgICAgICAgIGlmIChuZXdTZXNzaW9uID09PSBcIm5ld1wiKSB7XG4gICAgICAgICAgICAgIGxvYWROb3RlYm9vay5kZWZhdWx0Tm90ZWJvb2soc2Vzc2lvbklkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvYWROb3RlYm9vay5lbXB0eU5vdGVib29rKHNlc3Npb25JZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICgkcm91dGUuY3VycmVudC5sb2NhbHMuaXNJbXBvcnQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzZXNzaW9uUm91dGVSZXNvbHZlLmlzSW1wb3J0O1xuICAgICAgICAgICAgbG9hZE5vdGVib29rLmZyb21JbXBvcnQoc2Vzc2lvbklkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCRyb3V0ZS5jdXJyZW50LmxvY2Fscy5pc09wZW4pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzZXNzaW9uUm91dGVSZXNvbHZlLmlzT3BlbjtcbiAgICAgICAgICAgIGRlbGV0ZSBzZXNzaW9uUm91dGVSZXNvbHZlLnRhcmdldDtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkcm91dGUuY3VycmVudC5sb2NhbHMudGFyZ2V0O1xuICAgICAgICAgICAgdmFyIHJldHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxvYWROb3RlYm9vay5vcGVuVXJpKHRhcmdldCwgc2Vzc2lvbklkLCByZXRyeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWROb3RlYm9vay5mcm9tU2Vzc2lvbihzZXNzaW9uSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuZXZhbHVhdGVKb2JNYW5hZ2VyJywgWydiay51dGlscycsICdiay5ldmFsdWF0b3JNYW5hZ2VyJ10pO1xuICBtb2R1bGUuZmFjdG9yeSgnYmtFdmFsdWF0ZUpvYk1hbmFnZXInLCBmdW5jdGlvbihia1V0aWxzLCBia0V2YWx1YXRvck1hbmFnZXIsICR0aW1lb3V0KSB7XG5cbiAgICB2YXIgb3V0cHV0TWFwID0geyB9O1xuXG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uKG1zZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgIGlubmVydHlwZTogXCJFcnJvclwiLFxuICAgICAgICBvYmplY3Q6IG1zZ1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciB0ZXh0TWVzc2FnZSA9IGZ1bmN0aW9uKG1zZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJCZWFrZXJEaXNwbGF5XCIsXG4gICAgICAgIGlubmVydHlwZTogXCJUZXh0XCIsXG4gICAgICAgIG9iamVjdDogbXNnXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIEVSUk9SX01FU1NBR0VfT05fRUFSTElFUl9GQUlMVVJFID1cbiAgICAgIGVycm9yTWVzc2FnZShcIkV2YWx1YXRpb24gY2FuY2VsbGVkIGR1ZSB0byBhIGZhaWx1cmUgb2YgYW4gZWFybGllciBjZWxsIGV2YWx1YXRpb25cIik7XG4gICAgdmFyIEVSUk9SX01FU1NBR0VfT05fQ0FOQ0VMID1cbiAgICAgIGVycm9yTWVzc2FnZShcIi4uLiBjYW5jZWxsZWQhXCIpO1xuICAgIHZhciBNRVNTQUdFX1BFTkRJTkcgPVxuICAgICAgdGV4dE1lc3NhZ2UoXCJwZW5kaW5nXCIpO1xuICAgIHZhciBNRVNTQUdFX1dBSVRJTkdfRk9SX0VWQUxVVE9SX0lOSVQgPVxuICAgICAgdGV4dE1lc3NhZ2UoXCJ3YWl0aW5nIGZvciBldmFsdWF0b3IgaW5pdGlhbGl6YXRpb24gLi4uXCIpO1xuXG4gICAgdmFyIGpvYlF1ZXVlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgX3F1ZXVlID0gW107XG4gICAgICB2YXIgX2pvYkluUHJvZ3Jlc3MgPSBbXTtcbiAgICAgIHZhciBydW5uaW5nID0ge307XG5cbiAgICAgIHZhciBldmFsdWF0ZUpvYiA9IGZ1bmN0aW9uKGpvYikge1xuICAgICAgICBqb2IuZXZhbHVhdG9yID0gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcihqb2IuZXZhbHVhdG9ySWQpO1xuICAgICAgICBpZiAoam9iLmV2YWx1YXRvcikge1xuICAgICAgICAgIGJrVXRpbHMubG9nKFwiZXZhbHVhdGVcIiwge1xuICAgICAgICAgICAgcGx1Z2luOiBqb2IuZXZhbHVhdG9yLnBsdWdpbk5hbWUsXG4gICAgICAgICAgICBsZW5ndGg6IGpvYi5jb2RlLmxlbmd0aCB9KTtcbiAgICAgICAgICByZXR1cm4gam9iLmV2YWx1YXRvci5ldmFsdWF0ZShqb2IuY29kZSwgam9iLm91dHB1dCwgb3V0cHV0TWFwW2pvYi5jZWxsSWRdKTtcbiAgICAgICAgfVxuICAgICAgICBqb2Iub3V0cHV0LnJlc3VsdCA9IE1FU1NBR0VfV0FJVElOR19GT1JfRVZBTFVUT1JfSU5JVDtcbiAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci53YWl0RXZhbHVhdG9yKGpvYi5ldmFsdWF0b3JJZClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihldikge1xuICAgICAgICAgICAgam9iLmV2YWx1YXRvciA9IGV2O1xuICAgICAgICAgICAgaWYgKGV2ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIHJldHVybiBqb2IuZXZhbHVhdG9yLmV2YWx1YXRlKGpvYi5jb2RlLCBqb2Iub3V0cHV0LCBvdXRwdXRNYXBbam9iLmNlbGxJZF0pO1xuICAgICAgICAgICAgcmV0dXJuIFwiY2Fubm90IGZpbmQgZXZhbHVhdG9yIGZvciBcIitqb2IuZXZhbHVhdG9ySWQ7XG4gICAgICAgICAgfSApO1xuICAgICAgfTtcblxuICAgICAgdmFyIGRvTmV4dCA9IGZ1bmN0aW9uKGlubmV4dCkge1xuICAgICAgICB2YXIgam9iO1xuXG4gICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIC8vIHN0YXJ0IGEgbmV3IHJvb3Qgam9iXG4gICAgICAgICAgam9iID0gX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBzb21ldGhpbmcgZXhlY3V0aW5nLi4uXG4gICAgICAgICAgdmFyIGxhc3QgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMV07XG4gICAgICAgICAgaWYgKGxhc3QucnVuY2hpbGQgIT09IHVuZGVmaW5lZCAmJiBsYXN0LnJ1bmNoaWxkLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICBsYXN0LnJ1bmNoaWxkID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobGFzdC5maW5pc2hlZCAmJiBsYXN0LmNhbmNlbF9kZWZlcnJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50LCBpZHg7XG4gICAgICAgICAgICAvLyB0aGlzIGpvYiBoYXMgZmluaXNoZWQgYnV0IGR1ZSB0byBjYW5jZWxsYXRpb25cbiAgICAgICAgICAgIGlmIChfam9iSW5Qcm9ncmVzcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBwYXJlbnQgam9iIHRvIGNhbmNlbFxuICAgICAgICAgICAgICBwYXJlbnQgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBwYXJlbnQuY2FuY2VsX2RlZmVycmVkID0gbGFzdC5jYW5jZWxfZGVmZXJyZWQ7XG4gICAgICAgICAgICAgIGlmIChwYXJlbnQuZXZhbHVhdG9yICYmIHBhcmVudC5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IoaWR4ID0gMDsgaWR4PHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2lkeF0ub3V0cHV0LnJlc3VsdD1FUlJPUl9NRVNTQUdFX09OX0NBTkNFTDtcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW5baWR4XS53aGVuZG9uZS5yZWplY3QoJy4uLiBjYW5jZWxsZWQhJyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbcGFyZW50LmNoaWxkcmVuW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8X3F1ZXVlLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICBfcXVldWVbaWR4XS5vdXRwdXQucmVzdWx0PUVSUk9SX01FU1NBR0VfT05fQ0FOQ0VMO1xuICAgICAgICAgICAgICAgIF9xdWV1ZVtpZHhdLndoZW5kb25lLnJlamVjdCgnLi4uIGNhbmNlbGxlZCEnKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcnVubmluZ1tfcXVldWVbaWR4XS5jZWxsSWRdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF9xdWV1ZSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdC53aGVuZG9uZS5yZWplY3QoJy4uLiBjYW5jZWxsZWQhJyk7XG4gICAgICAgICAgICBkZWxldGUgcnVubmluZ1tsYXN0LmNlbGxJZF07XG4gICAgICAgICAgICBfam9iSW5Qcm9ncmVzcy5wb3AoKTtcbiAgICAgICAgICAgIGJrSGVscGVyLmNsZWFyU3RhdHVzKFwiRXZhbHVhdGluZyBcIiArIGxhc3QuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgbGFzdC5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgcGFyZW50LmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIHBhcmVudC5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGFzdC5jYW5jZWxfZGVmZXJyZWQucmVzb2x2ZSgnZG9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9OZXh0KHRydWUpO1xuICAgICAgICAgICAgaWYgKGlubmV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICBia0hlbHBlci51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAobGFzdC5ydW5jaGlsZCA9PT0gdW5kZWZpbmVkICYmIGxhc3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgY2FuIHN0YXJ0IGEgY2hpbGRyZW5cbiAgICAgICAgICAgIGpvYiA9IGxhc3QuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBsYXN0LmNoaWxkcmVuLnNoaWZ0KCk7XG4gICAgICAgICAgICBsYXN0LnJ1bmNoaWxkID0gam9iO1xuICAgICAgICAgIH0gZWxzZSBpZiAobGFzdC5maW5pc2hlZCAmJiBsYXN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBoYXMgZmluaXNoZWRcbiAgICAgICAgICAgIGlmIChsYXN0LmVycm9yKSB7XG4gICAgICAgICAgICAgIGxhc3Qud2hlbmRvbmUucmVqZWN0KGxhc3QuZXJyb3IpO1xuICAgICAgICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBwYXJlbnQgam9iIHRvIGNhbmNlbFxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMl07XG5cbiAgICAgICAgICAgICAgICB2YXIgaWR4O1xuICAgICAgICAgICAgICAgIGZvcihpZHggPSAwOyBpZHg8cGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbltpZHhdLm91dHB1dC5yZXN1bHQ9RVJST1JfTUVTU0FHRV9PTl9FQVJMSUVSX0ZBSUxVUkU7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW5baWR4XS53aGVuZG9uZS5yZWplY3QoXCJFdmFsdWF0aW9uIGNhbmNlbGxlZCBkdWUgdG8gYSBmYWlsdXJlIG9mIGFuIGVhcmxpZXIgY2VsbCBldmFsdWF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbcGFyZW50LmNoaWxkcmVuW2lkeF0uY2VsbElkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgICAgICAgICBmb3IoaWR4ID0gMDsgaWR4PF9xdWV1ZS5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICBfcXVldWVbaWR4XS5vdXRwdXQucmVzdWx0PUVSUk9SX01FU1NBR0VfT05fRUFSTElFUl9GQUlMVVJFO1xuICAgICAgICAgICAgICAgICAgX3F1ZXVlW2lkeF0ud2hlbmRvbmUucmVqZWN0KFwiRXZhbHVhdGlvbiBjYW5jZWxsZWQgZHVlIHRvIGEgZmFpbHVyZSBvZiBhbiBlYXJsaWVyIGNlbGwgZXZhbHVhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBydW5uaW5nW19xdWV1ZVtpZHhdLmNlbGxJZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9xdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgbGFzdC53aGVuZG9uZS5yZXNvbHZlKGxhc3Qub3V0cHV0KTtcbiAgICAgICAgICAgIGJrSGVscGVyLmNsZWFyU3RhdHVzKFwiRXZhbHVhdGluZyBcIiArIGxhc3QuZXZhbHVhdG9ySWQgKyBcIiBjZWxsIFwiICsgbGFzdC5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdbbGFzdC5jZWxsSWRdO1xuICAgICAgICAgICAgX2pvYkluUHJvZ3Jlc3MucG9wKCk7XG4gICAgICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBqb2IgPSBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMV07XG4gICAgICAgICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgam9iLmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIGpvYi5jZWxsSWQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9OZXh0KHRydWUpO1xuICAgICAgICAgICAgaWYgKGlubmV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICBia0hlbHBlci51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoam9iID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgYmtIZWxwZXIucmVmcmVzaFJvb3RTY29wZSgpOyB9LCAwKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfam9iSW5Qcm9ncmVzcy5wdXNoKGpvYik7XG4gICAgICAgIGJrSGVscGVyLnNob3dTdGF0dXMoXCJFdmFsdWF0aW5nIFwiICsgam9iLmV2YWx1YXRvcklkICsgXCIgY2VsbCBcIiArIGpvYi5jZWxsSWQsIHRydWUpO1xuXG4gICAgICAgIGV2YWx1YXRlSm9iKGpvYilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGpvYi5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgam9iLm91dHB1dCA9IGRhdGE7XG4gICAgICAgICAgZG9OZXh0KCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGpvYi5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgam9iLmVycm9yID0gZXJyO1xuICAgICAgICAgIGRvTmV4dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlubmV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGJrSGVscGVyLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkOiBmdW5jdGlvbihqb2IpIHtcbiAgICAgICAgICBydW5uaW5nW2pvYi5jZWxsSWRdID0gdHJ1ZTtcbiAgICAgICAgICBfcXVldWUucHVzaChqb2IpO1xuICAgICAgICB9LFxuICAgICAgICBhZGRDaGlsZHJlbjogZnVuY3Rpb24oam9iLCBjaGlsZCkge1xuICAgICAgICAgIHJ1bm5pbmdbY2hpbGQuY2VsbElkXSA9IHRydWU7XG4gICAgICAgICAgam9iLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDdXJyZW50Sm9iOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoX2pvYkluUHJvZ3Jlc3MubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJldHVybiBfam9iSW5Qcm9ncmVzc1tfam9iSW5Qcm9ncmVzcy5sZW5ndGgtMV07XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsQWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgaWR4O1xuICAgICAgICAgIGZvciAoIGlkeD0wOyBpZHg8X3F1ZXVlLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIF9xdWV1ZVtpZHhdLm91dHB1dC5vdXRwdXQucmVzdWx0ID0gRVJST1JfTUVTU0FHRV9PTl9DQU5DRUw7XG4gICAgICAgICAgICBkZWxldGUgcnVubmluZ1tfcXVldWVbaWR4XS5jZWxsSWRdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfcXVldWUgPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNSdW5uaW5nOiBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgcmV0dXJuIHJ1bm5pbmdbbl0gPT09IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHRpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrVXRpbHMuZmNhbGwoZG9OZXh0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGV2YWx1YXRlIGEgY2VsbCAoYXMgYSBzdWJjZWxsIG9mIGN1cnJlbnRseSBydW5uaW5nIGNlbGwpXG4gICAgICBldmFsdWF0ZTogZnVuY3Rpb24oY2VsbCwgbm90aWNrKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBqb2JRdWV1ZS5nZXRDdXJyZW50Sm9iKCk7XG4gICAgICAgIGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZVJvb3QoY2VsbCk7XG5cbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBpZiAoam9iUXVldWUuaXNSdW5uaW5nKGNlbGwuaWQpKSB7XG4gICAgICAgICAgYmtIZWxwZXIuc2hvd1RyYW5zaWVudFN0YXR1cyhcIkVSUk9SOiByZXN0YXJ0IGJsb2NrZWQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSRVNUQVJUIFBST0hJQklURUQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgLy8gcHJldmVudCBzZWxmIHJlc3RhcnRcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJSRVNUQVJUIFBST0hJQklURUQgZm9yIGNlbGwgXCIrY2VsbC5pZCk7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbC5vdXRwdXQucmVzdWx0ID0gTUVTU0FHRV9QRU5ESU5HO1xuICAgICAgICBpZiAoIWNlbGwub3V0cHV0KSB7XG4gICAgICAgICAgY2VsbC5vdXRwdXQgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZhbEpvYiA9IHtcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBjZWxsSWQ6IGNlbGwuaWQsXG4gICAgICAgICAgZXZhbHVhdG9ySWQ6IGNlbGwuZXZhbHVhdG9yLFxuICAgICAgICAgIGNvZGU6IGNlbGwuaW5wdXQuYm9keSxcbiAgICAgICAgICBvdXRwdXQ6IGNlbGwub3V0cHV0LFxuICAgICAgICAgIHJldHJ5OiAwLFxuICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICBydW5jaGlsZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICB3aGVuZG9uZSA6IGRlZmVycmVkXG4gICAgICAgIH07XG4gICAgICAgIGpvYlF1ZXVlLmFkZENoaWxkcmVuKHBhcmVudCxldmFsSm9iKTtcbiAgICAgICAgaWYgKG5vdGljayA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGpvYlF1ZXVlLnRpY2soKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgLy8gZXZhbHVhdGUgYSBjZWxsIGluIHRvcCBsZXZlbCBjb250ZXh0XG4gICAgICBldmFsdWF0ZVJvb3Q6IGZ1bmN0aW9uKGNlbGwsIG5vdGljaykge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGlmIChqb2JRdWV1ZS5pc1J1bm5pbmcoY2VsbC5pZCkpIHtcbiAgICAgICAgICBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzKFwiRVJST1I6IHJlc3RhcnQgYmxvY2tlZCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICAvLyBwcmV2ZW50IHNlbGYgcmVzdGFydFxuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIlJFU1RBUlQgUFJPSElCSVRFRCBmb3IgY2VsbCBcIitjZWxsLmlkKTtcbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLm91dHB1dC5yZXN1bHQgPSBNRVNTQUdFX1BFTkRJTkc7XG4gICAgICAgIGlmICghY2VsbC5vdXRwdXQpIHtcbiAgICAgICAgICBjZWxsLm91dHB1dCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmFsSm9iID0ge1xuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIGNlbGxJZDogY2VsbC5pZCxcbiAgICAgICAgICBldmFsdWF0b3JJZDogY2VsbC5ldmFsdWF0b3IsXG4gICAgICAgICAgY29kZTogY2VsbC5pbnB1dC5ib2R5LFxuICAgICAgICAgIG91dHB1dDogY2VsbC5vdXRwdXQsXG4gICAgICAgICAgcmV0cnk6IDAsXG4gICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgIHJ1bmNoaWxkOiB1bmRlZmluZWQsXG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgIHdoZW5kb25lIDogZGVmZXJyZWRcbiAgICAgICAgfTtcbiAgICAgICAgam9iUXVldWUuYWRkKGV2YWxKb2IpO1xuICAgICAgICBpZiAobm90aWNrID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICAvLyBldmFsdWF0ZSBhIGNlbGwgKGFzIGEgc3ViY2VsbCBvZiBjdXJyZW50bHkgcnVubmluZyBjZWxsKVxuICAgICAgZXZhbHVhdGVBbGw6IGZ1bmN0aW9uKGNlbGxzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHByb21pc2VzID0gXyhjZWxscykubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5ldmFsdWF0ZShjZWxsLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpvYlF1ZXVlLnRpY2soKTtcbiAgICAgICAgcmV0dXJuIGJrVXRpbHMuYWxsKHByb21pc2VzKTtcbiAgICAgIH0sXG4gICAgICAvLyBldmFsdWF0ZSBhbGwgY2VsbHMgaW4gdG9wIGxldmVsIGNvbnRleHRcbiAgICAgIGV2YWx1YXRlUm9vdEFsbDogZnVuY3Rpb24oY2VsbHMsIHBhcmVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBwcm9taXNlcyA9IF8oY2VsbHMpLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuZXZhbHVhdGVSb290KGNlbGwsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgam9iUXVldWUudGljaygpO1xuICAgICAgICByZXR1cm4gYmtVdGlscy5hbGwocHJvbWlzZXMpO1xuICAgICAgfSxcbiAgICAgIGlzQ2FuY2VsbGFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VycmVudEpvYiA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgcmV0dXJuICEhKGN1cnJlbnRKb2IgJiYgY3VycmVudEpvYi5ldmFsdWF0b3IgJiYgY3VycmVudEpvYi5ldmFsdWF0b3IuY2FuY2VsRXhlY3V0aW9uKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VycmVudEpvYiA9IGpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuXG4gICAgICAgIGlmIChjdXJyZW50Sm9iICYmIGN1cnJlbnRKb2IuZXZhbHVhdG9yKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbikge1xuICAgICAgICAgICAgY3VycmVudEpvYi5jYW5jZWxfZGVmZXJyZWQgPSBkZWZlcnJlZDtcbiAgICAgICAgICAgIGN1cnJlbnRKb2IuZXZhbHVhdG9yLmNhbmNlbEV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgY2FuY2VsQWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRKb2IgPSBqb2JRdWV1ZS5nZXRDdXJyZW50Sm9iKCk7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcblxuICAgICAgICBqb2JRdWV1ZS5jYW5jZWxBbGwoKTtcblxuICAgICAgICBpZiAoY3VycmVudEpvYiAmJiBjdXJyZW50Sm9iLmV2YWx1YXRvcikge1xuICAgICAgICAgIGlmIChjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRKb2IuY2FuY2VsX2RlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgICAgICBjdXJyZW50Sm9iLmV2YWx1YXRvci5jYW5jZWxFeGVjdXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGlzQW55SW5Qcm9ncmVzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIWpvYlF1ZXVlLmdldEN1cnJlbnRKb2IoKTtcbiAgICAgIH0sXG4gICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsQWxsKCk7XG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJPdXRwdXRDZWxsOiBmdW5jdGlvbihpZCwgb3V0KSB7XG4gICAgICAgIG91dHB1dE1hcFtpZF0gPSBvdXQ7XG4gICAgICB9LFxuICAgICAgZGVSZWdpc3Rlck91dHB1dENlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGRlbGV0ZSBvdXRwdXRNYXBbaWRdO1xuICAgICAgfSxcbiAgICAgIGdldE91dHB1dENlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRNYXBbaWRdO1xuICAgICAgfSxcblxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuZXZhbHVhdG9yUGx1Z2luTWFuYWdlclxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ldmFsdWF0b3JNYW5hZ2VyJywgWydiay51dGlscycsICdiay5ldmFsdWF0ZVBsdWdpbk1hbmFnZXInXSk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrRXZhbHVhdG9yTWFuYWdlcicsIGZ1bmN0aW9uIChia1V0aWxzLCBia0V2YWx1YXRlUGx1Z2luTWFuYWdlcikge1xuXG4gICAgdmFyIGV2YWx1YXRvcnMgPSB7fTtcbiAgICB2YXIgbG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzID0gW107XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZXZhbHVhdG9ycyA9IHt9O1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUV2YWx1YXRvcjogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBldmFsdWF0b3JzKSB7XG4gICAgICAgICAgdmFyIGUgPSBldmFsdWF0b3JzW2tleV07XG4gICAgICAgICAgaWYgKGUucGx1Z2luTmFtZSA9PT0gcGx1Z2luKSB7XG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGUuZXhpdCkpIHtcbiAgICAgICAgICAgICAgZS5leGl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgZXZhbHVhdG9yc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5ld0V2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9yU2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5pbmRleE9mKGV2YWx1YXRvclNldHRpbmdzKSA9PT0gLTEpXG5cdCAgICAgIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5wdXNoKGV2YWx1YXRvclNldHRpbmdzKTtcblx0ICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcblx0ICAgIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmdldEV2YWx1YXRvckZhY3RvcnlBbmRTaGVsbChldmFsdWF0b3JTZXR0aW5ncylcblx0ICAgIC50aGVuKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuXHQgICAgICBpZihldmFsdWF0b3IgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIGRlZmVycmVkLnJlamVjdChcImNhbm5vdCBjcmVhdGUgZXZhbHVhdG9yIGZhY3RvcnlcIik7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgICB9XG5cdCAgICAgIGlmIChfLmlzRW1wdHkoZXZhbHVhdG9yU2V0dGluZ3MubmFtZSkpIHtcblx0ICAgICAgICBpZiAoIWV2YWx1YXRvcnNbZXZhbHVhdG9yLnBsdWdpbk5hbWVdKSB7XG5cdCAgICAgICAgICBldmFsdWF0b3JTZXR0aW5ncy5uYW1lID0gZXZhbHVhdG9yLnBsdWdpbk5hbWU7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLm5hbWUgPSBldmFsdWF0b3IucGx1Z2luTmFtZSArIFwiX1wiICsgYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXG5cdCAgICAgIGlmICghZXZhbHVhdG9yU2V0dGluZ3Mudmlldykge1xuXHQgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLnZpZXcgPSB7fTtcblx0ICAgICAgfVxuXHQgICAgICBpZiAoIWV2YWx1YXRvclNldHRpbmdzLnZpZXcuY20pIHtcblx0ICAgICAgICBldmFsdWF0b3JTZXR0aW5ncy52aWV3LmNtID0ge307XG5cdCAgICAgIH1cblx0ICAgICAgZXZhbHVhdG9yU2V0dGluZ3Mudmlldy5jbS5tb2RlID0gZXZhbHVhdG9yLmNtTW9kZTtcblx0ICAgICAgZXZhbHVhdG9yc1tldmFsdWF0b3JTZXR0aW5ncy5uYW1lXSA9IGV2YWx1YXRvcjtcblx0ICAgICAgaWYgKCBldmFsdWF0b3JTZXR0aW5ncy5kZWZlcnJlZCAhPT0gdW5kZWZpbmVkICkge1xuXHQgICAgICAgIGV2YWx1YXRvclNldHRpbmdzLmRlZmVycmVkLnJlc29sdmUoZXZhbHVhdG9yKTtcblx0ICAgICAgICBkZWxldGUgZXZhbHVhdG9yU2V0dGluZ3MuZGVmZXJyZWQ7XG5cdCAgICAgIH1cblx0ICAgICAgZGVmZXJyZWQucmVzb2x2ZShldmFsdWF0b3IpO1xuXHQgICAgfSlcblx0ICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuXHQgICAgICB2YXIgaW5kZXggPSBsb2FkaW5nSW5Qcm9ncmVzc0V2YWx1YXRvcnMuaW5kZXhPZihldmFsdWF0b3JTZXR0aW5ncyk7XG5cdCAgICAgIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuXHQgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdldEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9ySWQpIHtcbiAgICAgICAgcmV0dXJuIGV2YWx1YXRvcnNbZXZhbHVhdG9ySWRdO1xuICAgICAgfSxcbiAgICAgIHdhaXRFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvcklkKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgaWYgKGV2YWx1YXRvcnNbZXZhbHVhdG9ySWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGV2YWx1YXRvcnNbZXZhbHVhdG9ySWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5sZW5ndGg7IGkgKysgKSB7XG4gICAgICAgICAgICBpZiAobG9hZGluZ0luUHJvZ3Jlc3NFdmFsdWF0b3JzW2ldLm5hbWUgPT09IGV2YWx1YXRvcklkKSB7XG4gICAgICAgICAgICAgIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9yc1tpXS5kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuXG4gICAgICBnZXRWaXN1YWxQYXJhbXM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKGV2YWx1YXRvcnNbbmFtZV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0ZVBsdWdpbk1hbmFnZXIuZ2V0VmlzdWFsUGFyYW1zKG5hbWUpO1xuICAgICAgICB2YXIgdiA9IHsgfTtcbiAgICAgICAgdmFyIGUgPSBldmFsdWF0b3JzW25hbWVdO1xuICAgICAgICB2YXIgZiA9IGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmdldFZpc3VhbFBhcmFtcyhuYW1lKTtcbiAgICAgICAgaWYgKGUuYmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYmdDb2xvciA9IGUuYmdDb2xvcjtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuYmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuYmdDb2xvciA9IGYuYmdDb2xvcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuYmdDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGUuZmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuZmdDb2xvciA9IGUuZmdDb2xvcjtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuZmdDb2xvciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuZmdDb2xvciA9IGYuZmdDb2xvcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuZmdDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGUuYm9yZGVyQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmJvcmRlckNvbG9yID0gZS5ib3JkZXJDb2xvcjtcbiAgICAgICAgZWxzZSBpZiAoZiAhPT0gdW5kZWZpbmVkICYmIGYuYm9yZGVyQ29sb3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB2LmJvcmRlckNvbG9yID0gZi5ib3JkZXJDb2xvcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHYuYm9yZGVyQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgIGlmIChlLnNob3J0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuc2hvcnROYW1lID0gZS5zaG9ydE5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGYgIT09IHVuZGVmaW5lZCAmJiBmLnNob3J0TmFtZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHYuc2hvcnROYW1lID0gZi5zaG9ydE5hbWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB2LnNob3J0TmFtZSA9IFwiXCI7XG5cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9LFxuICAgICAgZ2V0QWxsRXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBldmFsdWF0b3JzO1xuICAgICAgfSxcbiAgICAgIGdldExvYWRpbmdFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGxvYWRpbmdJblByb2dyZXNzRXZhbHVhdG9ycztcbiAgICAgIH0sXG4gICAgICByZWNvbm5lY3RFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5lYWNoKGV2YWx1YXRvcnMsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgaWYgKGV2ICYmIF8uaXNGdW5jdGlvbihldi5yZWNvbm5lY3QpKSB7XG4gICAgICAgICAgICBldi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGV4aXRBbmRSZW1vdmVBbGxFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5lYWNoKGV2YWx1YXRvcnMsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgaWYgKGV2ICYmIF8uaXNGdW5jdGlvbihldi5leGl0KSkge1xuICAgICAgICAgICAgZXYuZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGV2YWx1YXRvcnMgPSB7fTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXJcbiAqIE5vdGVib29rIENlbGwgTW9kZWwgZG9lc24ndCBvd24gdGhlIG5vdGVib29rIG1vZGVsLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9va0NlbGxNb2RlbE1hbmFnZXInLCBbXSk7XG5cbiAgLy8gdXRpbGl0aWVzXG4gIHZhciBnZW5lcmF0ZUNlbGxNYXAgPSBmdW5jdGlvbihjZWxscykge1xuICAgIHZhciBkZWNvcmF0ZWRDZWxscyA9IHtcbiAgICAgICdyb290Jzoge1xuICAgICAgICBpZDogJ3Jvb3QnLFxuICAgICAgICByYXc6IG51bGwsXG4gICAgICAgIGxldmVsOiAwLFxuICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgYWxsRGVzY2VuZGFudHM6IFtdXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWNlbGxzIHx8IGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGRlY29yYXRlZENlbGxzO1xuICAgIH1cblxuICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oY2VsbCwgaW5kZXgpIHtcbiAgICAgIGRlY29yYXRlZENlbGxzW2NlbGwuaWRdID0ge1xuICAgICAgICBpZDogY2VsbC5pZCxcbiAgICAgICAgcmF3OiBjZWxsLFxuICAgICAgICByYXdJbmRleDogaW5kZXgsXG4gICAgICAgIGxldmVsOiBjZWxsLmxldmVsID4gMCA/IGNlbGwubGV2ZWwgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBhbGxEZXNjZW5kYW50czogW11cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB2YXIgc3RhY2sgPSBbZGVjb3JhdGVkQ2VsbHMucm9vdF07XG4gICAgc3RhY2sucGVlayA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXNbdGhpcy5sZW5ndGggLSAxXTtcbiAgICB9O1xuICAgIF8oZGVjb3JhdGVkQ2VsbHMpLmVhY2goZnVuY3Rpb24oY2VsbCkge1xuICAgICAgaWYgKGNlbGwuaWQgPT09ICdyb290Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB3aGlsZSAoc3RhY2sucGVlaygpLmxldmVsID49IGNlbGwubGV2ZWwpIHtcbiAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICB9XG4gICAgICBkZWNvcmF0ZWRDZWxsc1tzdGFjay5wZWVrKCkuaWRdLmNoaWxkcmVuLnB1c2goY2VsbC5pZCk7XG4gICAgICBkZWNvcmF0ZWRDZWxsc1tjZWxsLmlkXS5wYXJlbnQgPSBzdGFjay5wZWVrKCkuaWQ7XG4gICAgICBzdGFjay5mb3JFYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgZGVjb3JhdGVkQ2VsbHNbYy5pZF0uYWxsRGVzY2VuZGFudHMucHVzaChjZWxsLmlkKTtcbiAgICAgIH0pO1xuICAgICAgc3RhY2sucHVzaChjZWxsKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVjb3JhdGVkQ2VsbHM7XG4gIH07XG5cbiAgdmFyIGdlbmVyYXRlVGFnTWFwID0gZnVuY3Rpb24oY2VsbE1hcCkge1xuICAgIC8vIGluaXRpYWxpemF0aW9uIGNlbGxzXG4gICAgdmFyIGluaXRpYWxpemF0aW9uQ2VsbHMgPSBfKGNlbGxNYXApLmNoYWluKClcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucmF3ICYmIGNlbGwucmF3LmluaXRpYWxpemF0aW9uO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICBpZiAoY2VsbC5yYXcudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF8oY2VsbC5hbGxEZXNjZW5kYW50cykuY2hhaW4oKVxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2hpbGRJZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNlbGxNYXBbY2hpbGRJZF07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjLnJhdy50eXBlID09PSAnY29kZSc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudmFsdWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5mbGF0dGVuKClcbiAgICAgICAgLnVuaXEoKVxuICAgICAgICAuc29ydEJ5KGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yYXdJbmRleDtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucmF3O1xuICAgICAgICB9KVxuICAgICAgICAudmFsdWUoKTtcblxuICAgIC8vIGV2YWx1YXRvcnNcbiAgICB2YXIgZXZhbHVhdG9yTWFwID0ge307XG4gICAgZXZhbHVhdG9yTWFwLmFkZCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICghdGhpc1trZXldKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpc1trZXldLnB1c2godmFsdWUpO1xuICAgIH07XG4gICAgXyhjZWxsTWFwKS5jaGFpbigpXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLnJhdyAmJiBjZWxsLnJhdy50eXBlID09PSAnY29kZSc7XG4gICAgICAgIH0pXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGNvZGVDZWxsKSB7XG4gICAgICAgICAgZXZhbHVhdG9yTWFwLmFkZChjb2RlQ2VsbC5yYXcuZXZhbHVhdG9yLCBjb2RlQ2VsbC5yYXcpO1xuICAgICAgICB9KTtcblxuICAgIC8vIHVzZXIgdGFnc1xuICAgIHZhciB1c2VyVGFnc01hcCA9IHt9O1xuICAgIHVzZXJUYWdzTWFwLmFkZCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICghdGhpc1trZXldKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpc1trZXldLnB1c2godmFsdWUpO1xuICAgIH07XG4gICAgXyhjZWxsTWFwKS5jaGFpbigpXG4gICAgLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICByZXR1cm4gY2VsbC5yYXcgJiYgY2VsbC5yYXcudHlwZSA9PT0gJ2NvZGUnICYmIGNlbGwucmF3LnRhZ3MgIT09IHVuZGVmaW5lZCAmJiBjZWxsLnJhdy50YWdzICE9PSAnJztcbiAgICB9KVxuICAgIC5lYWNoKGZ1bmN0aW9uKGNvZGVDZWxsKSB7XG4gICAgICB2YXIgcmUgPSAvXFxzKy87XG4gICAgICB2YXIgdGFncyA9IGNvZGVDZWxsLnJhdy50YWdzLnNwbGl0KHJlKTtcbiAgICAgIHZhciBpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdXNlclRhZ3NNYXAuYWRkKHRhZ3NbaV0sIGNvZGVDZWxsLnJhdyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdGlhbGl6YXRpb246IGluaXRpYWxpemF0aW9uQ2VsbHMsXG4gICAgICBldmFsdWF0b3I6IGV2YWx1YXRvck1hcCxcbiAgICAgIHVzZXJ0YWdzOiB1c2VyVGFnc01hcFxuICAgIH07XG4gIH07XG5cbiAgdmFyIHJlcGxhY2VXaG9sZUFycmF5ID0gZnVuY3Rpb24ob2xkQXJyYXksIG5ld0FycmF5KSB7XG4gICAgdmFyIGFyZ3MgPSBfLmZsYXR0ZW4oWzAsIG9sZEFycmF5Lmxlbmd0aCwgbmV3QXJyYXldKTtcbiAgICBvbGRBcnJheS5zcGxpY2UuYXBwbHkob2xkQXJyYXksIGFyZ3MpO1xuICB9O1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsIGZ1bmN0aW9uKCR0aW1lb3V0LCAkcm9vdFNjb3BlKSB7XG4gICAgdmFyIGNlbGxzID0gW107XG4gICAgdmFyIGNlbGxNYXAgPSB7fTtcbiAgICB2YXIgdGFnTWFwID0ge307XG4gICAgdmFyIHVuZG9BY3Rpb24gPSB7fTtcbiAgICB2YXIgdW5kb0FjdGlvbjIgPSB7fTtcbiAgICB2YXIgcmVkb0FjdGlvbiA9IHt9O1xuICAgIHZhciByZWRvQWN0aW9uMiA9IHt9O1xuICAgIHZhciByZWNyZWF0ZUNlbGxNYXAgPSBmdW5jdGlvbihkb05vdENsZWFyVW5kb0FjdGlvbikge1xuICAgICAgY2VsbE1hcCA9IGdlbmVyYXRlQ2VsbE1hcChjZWxscyk7XG4gICAgICB0YWdNYXAgPSBnZW5lcmF0ZVRhZ01hcChjZWxsTWFwKTtcbiAgICAgIGlmICghZG9Ob3RDbGVhclVuZG9BY3Rpb24pIHtcbiAgICAgICAgdW5kb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJlZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJlZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogT3B0aW1pemUgdGhpcyBmdW5jdGlvbiBzbyBpdCBkb2Vzbid0IGRlc3Ryb3kgdGhlIHBhZ2Ugc2Nyb2xsIGFuZCByZXF1aXJlXG4gICAgICAvLyB0aGlzIGhhY2sgYmVsb3cuXG4gICAgICAvL1xuICAgICAgLy8gTW9zdCBsaWtlbHkgYmVjYXVzZSBvZiB0aGUgbmVzdGVkIG5hdHVyZSBvZiB0aGUgY2VsbCBtYXAgYW5kIHRoZSBjZWxscyBpbiB0aGVcbiAgICAgIC8vIERPTSB0aGF0IHJlZmxlY3QgdGhhdCBjZWxsIG1hcCwgd2hlbiBvbmUgY2hhbmdlcyBzb21ldGhpbmcgYXQgdGhlIGJhc2Ugb2YgdGhlXG4gICAgICAvLyB0cmVlIChsaWtlIGFkZGluZyBhIG5ldyBzZWN0aW9uIGNlbGxcbiAgICAgIC8vIFtodHRwczovL2dpdGh1Yi5jb20vdHdvc2lnbWEvYmVha2VyLW5vdGVib29rL2lzc3Vlcy82NzJdKSwgaXQgbm90IG9ubHkgdGFrZXMgYW5cbiAgICAgIC8vIGV0ZXJuaXR5LCBidXQgcmFuZG9tbHkgc2Nyb2xscyB0byB+NjUlIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnNjcm9sbFRvcChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgfSk7XG4gICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NlbGxNYXBSZWNyZWF0ZWQnKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBfZ2V0Q2VsbE1hcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjZWxsTWFwO1xuICAgICAgfSxcbiAgICAgIF9nZXRUYWdNYXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGFnTWFwO1xuICAgICAgfSxcbiAgICAgIHJlc2V0OiBmdW5jdGlvbihfY2VsbHNfKSB7XG4gICAgICAgIGlmIChfY2VsbHNfKSB7XG4gICAgICAgICAgY2VsbHMgPSBfY2VsbHNfO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpcGJvYXJkID0gbnVsbDtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgICB9LFxuICAgICAgZ2V0SW5kZXg6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBjZWxsTWFwW2lkXSA/IGNlbGxNYXBbaWRdLnJhd0luZGV4IDogLTE7XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbEF0SW5kZXg6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBjZWxsc1tpbmRleF07XG4gICAgICB9LFxuICAgICAgaGFzQ2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICEhY2VsbE1hcFtpZF07XG4gICAgICB9LFxuICAgICAgX2dldERlY29yYXRlZENlbGw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0NlbGwoaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGxNYXBbaWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0Q2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLnJhdztcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsVHlwZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChpZCkudHlwZTtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsTGV2ZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKGlkKS5sZXZlbDtcbiAgICAgIH0sXG4gICAgICBnZXRQYXJlbnQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBwYXJlbnRJZCA9IHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLnBhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudElkID09PSAncm9vdCcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChwYXJlbnRJZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNoaWxkSWQpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5nZXRDZWxsKGNoaWxkSWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxEZXNjZW5kYW50czogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuYWxsRGVzY2VuZGFudHMubWFwKGZ1bmN0aW9uKGNoaWxkSWQpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5nZXRDZWxsKGNoaWxkSWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxDb2RlQ2VsbHM6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICBpZCA9ICdyb290JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxEZXNjZW5kYW50cyhpZCkuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC50eXBlID09PSAnY29kZSc7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGNvZGUgY2VsbCBzdGFydGluZyB3aXRoIHRoZSBzdGFydENlbGwgYW5kIHNjYW5cbiAgICAgIC8vIHVzaW5nIHRoZSBkaXJlY3Rpb24sIGlmIHRoZSBzdGFydENlbGwgaXMgYSBjb2RlIGNlbGwsIGl0IHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgICBmaW5kQ29kZUNlbGw6IGZ1bmN0aW9uKHN0YXJ0Q2VsbElkLCBmb3J3YXJkKSB7XG4gICAgICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKHN0YXJ0Q2VsbElkKTtcbiAgICAgICAgd2hpbGUgKGNlbGwpIHtcbiAgICAgICAgICBpZiAoY2VsbC50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjZWxsID0gZm9yd2FyZCA/IHRoaXMuZ2V0TmV4dChjZWxsLmlkKSA6IHRoaXMuZ2V0UHJldihjZWxsLmlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uKGlkLCBjZWxsKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY2VsbHMuc3BsaWNlKGluZGV4LCAwLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRGaXJzdDogZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QoY2VsbCkpIHtcbiAgICAgICAgICB0aHJvdyAndW5hY2NlcHRhYmxlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNlbGxzLnNwbGljZSgwLCAwLCBjZWxsKTtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYmVha2VyLmNlbGwuYWRkZWQnLCBjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uKGlkLCBjZWxsKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdChjZWxsKSkge1xuICAgICAgICAgIHRocm93ICd1bmFjY2VwdGFibGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXggKyAxLCAwLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRBdDogZnVuY3Rpb24oaW5kZXgsIGNlbGwsIGRvTm90Q2xlYXJVbmRvQWN0aW9uKSB7XG4gICAgICAgIGlmIChfLmlzQXJyYXkoY2VsbCkpIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KGNlbGxzLCBbaW5kZXgsIDBdLmNvbmNhdChjZWxsKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdChjZWxsKSkge1xuICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCwgMCwgY2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ3VuYWNjZXB0YWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKGRvTm90Q2xlYXJVbmRvQWN0aW9uKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdiZWFrZXIuY2VsbC5hZGRlZCcsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBpc1Bvc3NpYmxlVG9Nb3ZlVXA6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIC8vIElmIHRoZSBjZWxsIGlzbid0IGZpcnN0IChvciBub25leGlzdGVudD8pXG4gICAgICAgIHJldHVybiBbLTEsIDBdLmluZGV4T2YodGhpcy5nZXRJbmRleChpZCkpID09PSAtMTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVXA6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKGlkKTtcbiAgICAgICAgICAgIGNlbGxzW2luZGV4XSA9IHRoaXMuZ2V0Q2VsbEF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGNlbGxzW2luZGV4IC0gMV0gPSBjZWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgIH0sXG4gICAgICBpc1Bvc3NpYmxlVG9Nb3ZlRG93bjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGNlbGwgaXNuJ3QgbGFzdCAob3Igbm9uZXhpc3RlbnQ/KVxuICAgICAgICByZXR1cm4gWy0xLCAoY2VsbHMubGVuZ3RoIC0gMSldLmluZGV4T2YodGhpcy5nZXRJbmRleChpZCkpID09PSAtMTtcbiAgICAgIH0sXG4gICAgICBtb3ZlRG93bjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IGNlbGxzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoaWQpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXhdID0gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCArIDEpO1xuICAgICAgICAgICAgY2VsbHNbaW5kZXggKyAxXSA9IGNlbGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICd0YXJnZXQgY2VsbCAnICsgaWQgKyAnIHdhcyBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgfSxcbiAgICAgIHVuZG9hYmxlRGVsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kZWxldGVVbmRvID0ge1xuICAgICAgICAgICAgdHlwZTogJ3NpbmdsZScsXG4gICAgICAgICAgICBpbmRleDogdGhpcy5nZXRJbmRleChpZCksXG4gICAgICAgICAgICBjZWxsOiB0aGlzLmdldENlbGwoaWQpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlKGlkKTtcbiAgICAgIH0sXG4gICAgICBkZWxldGU6IGZ1bmN0aW9uKGlkLCB1bmRvYWJsZSkge1xuICAgICAgICAvLyBkZWxldGUgdGhlIGNlbGwsXG4gICAgICAgIC8vIG5vdGUgdGhhdCBpZiB0aGlzIGlzIGEgc2VjdGlvbiwgaXRzIGRlc2NlbmRhbnRzIGFyZSBub3QgZGVsZXRlZC5cbiAgICAgICAgLy8gdG8gZGVsZXRlIGEgc2VjaXRvbiB3aXRoIGFsbCBpdHMgZGVzY2VuZGFudHMgdXNlIGRlbGV0ZVNlY3Rpb24gaW5zdGVhZC5cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB2YXIgZGVsZXRlZCA9IGNlbGxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgaWYgKHVuZG9hYmxlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB1bmRvQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNlbGYuaW5zZXJ0QXQoaW5kZXgsIGRlbGV0ZWQsIHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHVuZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmVkb0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJlZG9BY3Rpb24yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNlbGxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCh0cnVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVNlY3Rpb246IGZ1bmN0aW9uKGlkLCB1bmRvYWJsZSkge1xuICAgICAgICAvLyBkZWxldGUgdGhlIHNlY3Rpb24gY2VsbCBhcyB3ZWxsIGFzIGFsbCBpdHMgZGVzY2VuZGFudHNcbiAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoaWQpO1xuICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyB3YXMgbm90IGZvdW5kJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2VsbC50eXBlICE9PSAnc2VjdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyAndGFyZ2V0IGNlbGwgJyArIGlkICsgJyBpcyBub3QgYSBzZWN0aW9uIGNlbGwnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICB2YXIgZGVzY2VuZGFudHMgPSB0aGlzLmdldEFsbERlc2NlbmRhbnRzKGlkKTtcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBjZWxscy5zcGxpY2UoaW5kZXgsIGRlc2NlbmRhbnRzLmxlbmd0aCArIDEpO1xuICAgICAgICBpZiAodW5kb2FibGUpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgdW5kb0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5pbnNlcnRBdChpbmRleCwgZGVsZXRlZCwgdHJ1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB1bmRvQWN0aW9uMiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZWRvQWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlZG9BY3Rpb24yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjZWxscy5zcGxpY2UoaW5kZXgsIGRlc2NlbmRhbnRzLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlY3JlYXRlQ2VsbE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWxldGVkO1xuICAgICAgfSxcbiAgICAgIHVuZG86IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodW5kb0FjdGlvbikge1xuICAgICAgICAgIHVuZG9BY3Rpb24uYXBwbHkoKTtcbiAgICAgICAgICByZWRvQWN0aW9uID0gcmVkb0FjdGlvbjI7XG4gICAgICAgICAgcmVkb0FjdGlvbjIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdW5kb0FjdGlvbjIgPSB1bmRvQWN0aW9uO1xuICAgICAgICAgIHVuZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIHVuZG8nKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlZG86IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVkb0FjdGlvbikge1xuICAgICAgICAgIHJlZG9BY3Rpb24uYXBwbHkoKTtcbiAgICAgICAgICByZWRvQWN0aW9uMiA9IHJlZG9BY3Rpb247XG4gICAgICAgICAgdW5kb0FjdGlvbiA9IHVuZG9BY3Rpb24yO1xuICAgICAgICAgIHVuZG9BY3Rpb24yID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlZG9BY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIHJlZG8nKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUFsbE91dHB1dENlbGxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgXy5lYWNoKGNlbGxzLCBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXQpIHtcbiAgICAgICAgICAgICAgY2VsbC5vdXRwdXQucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZHVtcERpc3BsYXlTdGF0dXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY2VsbHMpIHtcbiAgICAgICAgICBfLmVhY2goY2VsbHMsIGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIGlmIChjZWxsLm91dHB1dCkge1xuICAgICAgICAgICAgICBjZWxsLm91dHB1dC5zdGF0ZSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hpZnRTZWdtZW50OiBmdW5jdGlvbihzZWdCZWdpbiwgc2VnTGVuZ3RoLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIHNoaWZ0cyBhIGNvbnRpbnVvdXMgc2VxdWVuY2Ugb2YgY2VsbHNcbiAgICAgICAgaWYgKHNlZ0JlZ2luICsgb2Zmc2V0IDwgMCB8fCBzZWdCZWdpbiArIHNlZ0xlbmd0aCAtIDEgKyBvZmZzZXQgPj0gY2VsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgJ0lsbGVnYWwgc2hpZnRpbmcsIHJlc3VsdCB3b3VsZCBiZSBvdXQgb2YgYm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzbGljZTEgPSBjZWxscy5zbGljZSgwLCBzZWdCZWdpbik7XG4gICAgICAgIHZhciBzbGljZTIgPSBjZWxscy5zbGljZShzZWdCZWdpbiwgc2VnQmVnaW4gKyBzZWdMZW5ndGgpO1xuICAgICAgICB2YXIgc2xpY2UzID0gY2VsbHMuc2xpY2Uoc2VnQmVnaW4gKyBzZWdMZW5ndGgpO1xuICAgICAgICB2YXIgdG9CZU1vdmVkO1xuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgIC8vIG1vdmluZyBmcm9tIHNsaWNlIDMgdG8gc2xpY2UgMVxuICAgICAgICAgIHRvQmVNb3ZlZCA9IHNsaWNlMy5zcGxpY2UoMCwgb2Zmc2V0KTtcbiAgICAgICAgICBzbGljZTEgPSBzbGljZTEuY29uY2F0KHRvQmVNb3ZlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW92aW5nIGZyb20gc2xpY2UgMSB0byBzbGljZSAzXG4gICAgICAgICAgdG9CZU1vdmVkID0gc2xpY2UxLnNwbGljZShzbGljZTEubGVuZ3RoICsgb2Zmc2V0LCAtb2Zmc2V0KTtcbiAgICAgICAgICBzbGljZTMgPSB0b0JlTW92ZWQuY29uY2F0KHNsaWNlMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVwbGFjZVdob2xlQXJyYXkoY2VsbHMsIF8uZmxhdHRlbihbc2xpY2UxLCBzbGljZTIsIHNsaWNlM10pKTtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKCk7XG4gICAgICB9LFxuICAgICAgZ2V0UHJldlNpYmxpbmc6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBwYXJlbnRJZCA9IHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLnBhcmVudDtcbiAgICAgICAgaWYgKCFwYXJlbnRJZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaWJsaW5nSWRzID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChwYXJlbnRJZCkuY2hpbGRyZW47XG4gICAgICAgIHZhciBteUluZGV4QW1vbmdTaWJsaW5ncyA9IHNpYmxpbmdJZHMuaW5kZXhPZihpZCk7XG4gICAgICAgIGlmIChteUluZGV4QW1vbmdTaWJsaW5ncyA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoc2libGluZ0lkc1tteUluZGV4QW1vbmdTaWJsaW5ncyAtIDFdKTtcbiAgICAgIH0sXG4gICAgICBnZXROZXh0U2libGluZzogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHBhcmVudElkID0gdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkucGFyZW50O1xuICAgICAgICBpZiAoIXBhcmVudElkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpYmxpbmdJZHMgPSB0aGlzLl9nZXREZWNvcmF0ZWRDZWxsKHBhcmVudElkKS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIG15SW5kZXhBbW9uZ1NpYmxpbmdzID0gc2libGluZ0lkcy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKG15SW5kZXhBbW9uZ1NpYmxpbmdzID09PSBzaWJsaW5nSWRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsKHNpYmxpbmdJZHNbbXlJbmRleEFtb25nU2libGluZ3MgKyAxXSk7XG4gICAgICB9LFxuICAgICAgaXNQb3NzaWJsZVRvTW92ZVNlY3Rpb25VcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5nZXRQcmV2U2libGluZyhpZCk7XG4gICAgICB9LFxuICAgICAgbW92ZVNlY3Rpb25VcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmdldFNlY3Rpb25MZW5ndGgoaWQpO1xuICAgICAgICB2YXIgcHJldlNpYiA9IHRoaXMuZ2V0UHJldlNpYmxpbmcoaWQpO1xuICAgICAgICBpZiAoIXByZXZTaWIpIHtcbiAgICAgICAgICB0aHJvdyAnQ2Fubm90IG1vdmUgc2VjdGlvbiB1cCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZTaWJJZCA9IHByZXZTaWIuaWQ7XG4gICAgICAgIHZhciBvZmZzZXQgPSAtMSAqIHRoaXMuZ2V0U2VjdGlvbkxlbmd0aChwcmV2U2liSWQpO1xuICAgICAgICB0aGlzLnNoaWZ0U2VnbWVudChpbmRleCwgbGVuZ3RoLCBvZmZzZXQpO1xuICAgICAgfSxcbiAgICAgIGlzUG9zc2libGVUb01vdmVTZWN0aW9uRG93bjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5nZXROZXh0U2libGluZyhpZCk7XG4gICAgICB9LFxuICAgICAgbW92ZVNlY3Rpb25Eb3duOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgbmV4dFNpYiA9IHRoaXMuZ2V0TmV4dFNpYmxpbmcoaWQpO1xuICAgICAgICBpZiAoIW5leHRTaWIpIHtcbiAgICAgICAgICB0aHJvdyAnQ2Fubm90IG1vdmUgc2VjdGlvbiBkb3duJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdmVTZWN0aW9uVXAobmV4dFNpYi5pZCk7XG4gICAgICB9LFxuICAgICAgZ2V0U2VjdGlvbkxlbmd0aDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgLy8gdGhlIGNlbGwgaXRzZWxmIHBsdXMgYWxsIGRlc2NlbmRhbnRzXG4gICAgICAgIHJldHVybiAxICsgdGhpcy5fZ2V0RGVjb3JhdGVkQ2VsbChpZCkuYWxsRGVzY2VuZGFudHMubGVuZ3RoO1xuICAgICAgfSxcblxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBoYXMgbm90IGJlZW4gdW5pdCB0ZXN0ZWRcbiAgICAgIGdldE5leHQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggPT09IGNlbGxzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCArIDEpO1xuICAgICAgfSxcbiAgICAgIGdldFByZXY6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgfSxcbiAgICAgIGlzQ29udGFpbmVyOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gaWQgPT09ICdyb290JyB8fCAhIXRoaXMuZ2V0Q2VsbChpZCkubGV2ZWw7XG4gICAgICB9LFxuICAgICAgaXNFbXB0eTogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERlY29yYXRlZENlbGwoaWQpLmFsbERlc2NlbmRhbnRzLmxlbmd0aCA9PT0gMDtcbiAgICAgIH0sXG4gICAgICBpc0xhc3Q6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmIChfLmlzRW1wdHkoY2VsbHMpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLmxhc3QoY2VsbHMpLmlkID09PSBpZDtcbiAgICAgIH0sXG4gICAgICBhcHBlbmRBZnRlcjogZnVuY3Rpb24oaWQsIGNlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDb250YWluZXIoaWQpICYmICF0aGlzLmlzRW1wdHkoaWQpKSB7XG4gICAgICAgICAgLy8gYWRkIHRvIHRhaWxcbiAgICAgICAgICB2YXIgZGVzY2VuZGFudHMgPSB0aGlzLmdldEFsbERlc2NlbmRhbnRzKGlkKTtcbiAgICAgICAgICB0aGlzLmluc2VydEFmdGVyKGRlc2NlbmRhbnRzW2Rlc2NlbmRhbnRzLmxlbmd0aCAtIDFdLmlkLCB0aGlzLmNsaXBib2FyZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYXBwZW5kIGFmdGVyXG4gICAgICAgICAgdGhpcy5pbnNlcnRBZnRlcihpZCwgY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRJbml0aWFsaXphdGlvbkNlbGxzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcC5pbml0aWFsaXphdGlvbjtcbiAgICAgIH0sXG4gICAgICBnZXRDZWxsc1dpdGhFdmFsdWF0b3I6IGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICByZXR1cm4gdGFnTWFwLmV2YWx1YXRvcltldmFsdWF0b3JdO1xuICAgICAgfSxcbiAgICAgIGhhc1VzZXJUYWc6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcC51c2VydGFnc1t0XSAhPT0gdW5kZWZpbmVkO1xuICAgICAgfSxcbiAgICAgIGdldENlbGxzV2l0aFVzZXJUYWc6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHRhZ01hcC51c2VydGFnc1t0XTtcbiAgICAgIH0sXG4gICAgICBjbGlwYm9hcmQ6IG51bGwsXG4gICAgICBjdXQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmNsaXBib2FyZCkge1xuICAgICAgICAgIHRoaXMuZGVsZXRlKHRoaXMuY2xpcGJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaXBib2FyZCA9IHRoaXMuZ2V0Q2VsbChpZCk7XG4gICAgICAgIHRoaXMuZGVsZXRlKGlkKTtcbiAgICAgIH0sXG4gICAgICBwYXN0ZTogZnVuY3Rpb24oZGVzdGluYXRpb25JZCkge1xuICAgICAgICBpZiAodGhpcy5jbGlwYm9hcmQpIHtcbiAgICAgICAgICB0aGlzLmFwcGVuZEFmdGVyKGRlc3RpbmF0aW9uSWQsIHRoaXMuY2xpcGJvYXJkKTtcbiAgICAgICAgICB0aGlzLmNsaXBib2FyZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYW5TZXRVc2VyVGFnczogZnVuY3Rpb24odGFncykge1xuICAgICAgICB2YXIgcmUgPSAvXFxzKy87XG4gICAgICAgIGlmICh0YWdzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgdGdzID0gdGFncy5zcGxpdChyZSk7XG4gICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNlbGxNYXBbdGdzW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRVJST1I6IFRoZSBuYW1lIFwiJyArIHRnc1tpXSArICdcIiBpcyBhbHJlYWR5IHVzZWQgYXMgYSBjZWxsIG5hbWUuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSxcbiAgICAgIGNhblJlbmFtZUNlbGw6IGZ1bmN0aW9uKG5ld2lkKSB7XG4gICAgICAgIGlmIChjZWxsTWFwW25ld2lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuICdFUlJPUjogQ2VsbCBcIicgKyBuZXdpZCArICdcIiBhbHJlYWR5IGV4aXN0cy4nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWdNYXAudXNlcnRhZ3NbbmV3aWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gJ0VSUk9SOiBUaGUgbmFtZSBcIicgKyBuZXdpZCArICdcIiBpcyBhbHJlYWR5IHVzZWQgYXMgYSB0YWcuJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LFxuICAgICAgcmVuYW1lQ2VsbDogZnVuY3Rpb24ob2xkaWQsIG5ld2lkKSB7XG4gICAgICAgIGlmICh0aGlzLmNhblJlbmFtZUNlbGwobmV3aWQpICE9PSAnJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWR4ID0gdGhpcy5nZXRJbmRleChvbGRpZCk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgIGNlbGxzW2lkeF0uaWQgPSBuZXdpZDtcbiAgICAgICAgICByZWNyZWF0ZUNlbGxNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlYnVpbGRNYXBzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVjcmVhdGVDZWxsTWFwKHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJiay5ub3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlclwiLCBbXSk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoXCJia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfc3Vic2NyaXB0aW9ucyA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBmdW5jdGlvbihzZXNzaW9uSWQsIG5vdGVib29rTW9kZWwpIHtcbiAgICAgICAgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXSA9XG4gICAgICAgICAgJC5jb21ldGQuc3Vic2NyaWJlKFwiL25hbWVzcGFjZS9cIiArIHNlc3Npb25JZCwgZnVuY3Rpb24ocmVwbHkpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gcmVwbHkuZGF0YS5uYW1lO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcmVwbHkuZGF0YS52YWx1ZTtcbiAgICAgICAgICAgIHZhciBzeW5jID0gcmVwbHkuZGF0YS5zeW5jO1xuICAgICAgICAgICAgdmFyIG5hbWVzcGFjZSA9IG5vdGVib29rTW9kZWwubmFtZXNwYWNlO1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gc3luYykge1xuICAgICAgICAgICAgICB2YXIgcmVwbHkyID0ge25hbWU6IG5hbWUsIGRlZmluZWQ6IGZhbHNlLCBzZXNzaW9uOiBzZXNzaW9uSWR9O1xuICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZFZhbHVlID0gbmFtZXNwYWNlW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IHJlYWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlID0gcmVhZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgcmVwbHkyLmRlZmluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2UvbmFtZXNwYWNlL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkocmVwbHkyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICBub3RlYm9va01vZGVsLm5hbWVzcGFjZSA9IHt9O1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IG5vdGVib29rTW9kZWwubmFtZXNwYWNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5hbWVzcGFjZVtuYW1lXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoc3luYykge1xuICAgICAgICAgICAgICAgIHZhciByZXBseTIgPSB7bmFtZTogbmFtZSwgc2Vzc2lvbjogc2Vzc2lvbklkfTtcbiAgICAgICAgICAgICAgICAkLmNvbWV0ZC5wdWJsaXNoKFwiL3NlcnZpY2UvbmFtZXNwYWNlL3JlY2VpdmVcIiwgSlNPTi5zdHJpbmdpZnkocmVwbHkyKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBjbGVhcjogZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICAgIGlmIChzZXNzaW9uSWQpIHtcbiAgICAgICAgICAkLmNvbWV0ZC51bnN1YnNjcmliZShfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdKTtcbiAgICAgICAgICBkZWxldGUgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnNlc3Npb25NYW5hZ2VyXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnNlc3Npb25NYW5hZ2VyJyxbXG4gICAgJ2JrLnV0aWxzJyxcbiAgICAnYmsuc2Vzc2lvbicsXG4gICAgJ2JrLm5vdGVib29rQ2VsbE1vZGVsTWFuYWdlcicsXG4gICAgJ2JrLm5vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyJyxcbiAgICAnYmsucmVjZW50TWVudScsXG4gICAgJ2JrLmV2YWx1YXRvck1hbmFnZXInXG4gIF0pO1xuXG4gIG1vZHVsZS5mYWN0b3J5KCdia1Nlc3Npb25NYW5hZ2VyJywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtTZXNzaW9uLFxuICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIsXG4gICAgICBia05vdGVib29rTmFtZXNwYWNlTW9kZWxNYW5hZ2VyLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtSZWNlbnRNZW51KSB7XG5cbiAgICB2YXIgSW1hZ2VJY29uID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLnR5cGUgIT09IFwiSW1hZ2VJY29uXCIpIHtcbiAgICAgICAgdGhpcy5pbWFnZURhdGEgPSBbXTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhID0gZGF0YS5pbWFnZURhdGE7XG4gICAgICAgIHRoaXMud2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgRGF0YUZyYW1lID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLnR5cGUgIT09IFwiVGFibGVEaXNwbGF5XCIgfHwgZGF0YS5zdWJ0eXBlICE9PSBcIlRhYmxlRGlzcGxheVwiKSB7XG4gICAgICAgIHRoaXMuY29sdW1uTmFtZXMgPSBbXTtcbiAgICAgICAgdGhpcy50eXBlcyA9IFtdO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW5OYW1lcyA9IGRhdGEuY29sdW1uTmFtZXMuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMudHlwZXMgPSBkYXRhLnR5cGVzLnNsaWNlKDApO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqIGluIGRhdGEudmFsdWVzKSB7XG4gICAgICAgICAgdmFyIHZhbHMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEudmFsdWVzW2pdKSB7XG4gICAgICAgICAgICB2YWxzLnB1c2goIHRyYW5zZm9ybUJhY2soZGF0YS52YWx1ZXNbal1baV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWx1ZXMucHVzaCh2YWxzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcyA9ICcnO1xuICAgICAgcyA9ICdEYXRhRnJhbWU6JytcbiAgICAgICAgJyAgUm93czogJyt0aGlzLnZhbHVlcy5sZW5ndGgrJ1xcbicgK1xuICAgICAgICAnICBEYXRhIGNvbHVtbnMgKHRvdGFsICcrdGhpcy5jb2x1bW5OYW1lcy5sZW5ndGgrJyBjb2x1bW5zKTpcXG4nO1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgIHMgPSBzICsgJyAgICAnK3RoaXMuY29sdW1uTmFtZXNbaV0rJyAgICcrdGhpcy50eXBlc1tpXSsnXFxuJztcbiAgICAgIH1cbiAgICAgIDtcbiAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmNvbHVtbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtbk5hbWVzO1xuICAgIH07XG5cbiAgICBEYXRhRnJhbWUucHJvdG90eXBlLmR0eXBlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudHlwZXM7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuZ2V0Q29sdW1uID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGkgPSB0aGlzLmNvbHVtbk5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSA8IDApXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgbyA9IFtdO1xuICAgICAgZm9yICh2YXIgaiBpbiB0aGlzLnZhbHVlcykge1xuICAgICAgICBvLnB1c2godGhpcy52YWx1ZXNbal1baV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuZ2V0Um93ID0gZnVuY3Rpb24oaSkge1xuICAgICAgaWYgKGkgPCAwIHx8IGkgPiB0aGlzLnZhbHVlcy5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgdmFyIG8gPSB7fTtcbiAgICAgIGZvciAodmFyIGogaW4gdGhpcy5jb2x1bW5OYW1lcykge1xuICAgICAgICBvW3RoaXMuY29sdW1uTmFtZXNbal1dID0gdGhpcy52YWx1ZXNbaV1bal07XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgRGF0YUZyYW1lLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5sZW5ndGg7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUucmVtb3ZlQ29sdW1uID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGkgPSB0aGlzLmNvbHVtbk5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSA8IDApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yICh2YXIgaiBpbiB0aGlzLnZhbHVlcykge1xuICAgICAgICB0aGlzLnZhbHVlc1tqXS5zcGxpY2UoaSwxKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29sdW1uTmFtZXMuc3BsaWNlKGksMSk7XG4gICAgICB0aGlzLnR5cGVzLnNwbGljZShpLDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuYWRkQ29sdW1uID0gZnVuY3Rpb24obmFtZSwgZGF0YSwgdHlwZSkge1xuICAgICAgdmFyIGkgPSB0aGlzLmNvbHVtbk5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSA+PSAwIHx8IGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHRoaXMuY29sdW1uTmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMudHlwZXMucHVzaCgodHlwZSA9PT0gdW5kZWZpbmVkKSA/IGdldERhdGFUeXBlKGRhdGFbMF0pIDogdHlwZSk7XG4gICAgICB2YXIgbWluID0gKGRhdGEubGVuZ3RoID4gdGhpcy52YWx1ZXMubGVuZ3RoKSA/IHRoaXMudmFsdWVzLmxlbmd0aCA6IGRhdGEubGVuZ3RoO1xuICAgICAgdmFyIGo7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbWluOyBqKyspIHtcbiAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChkYXRhW2pdKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPiBkYXRhLmxlbmd0aCkge1xuICAgICAgICBmb3IgKDsgaiA8IHRoaXMudmFsdWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZXMucHVzaChbXSk7XG4gICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbHVtbk5hbWVzLmxlbmd0aCAtIDE7IGsrKykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWx1ZXNbal0ucHVzaChkYXRhW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIERhdGFGcmFtZS5wcm90b3R5cGUuYWRkUm93ID0gZnVuY3Rpb24ocm93KSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yKHZhciBjIGluIHRoaXMuY29sdW1uTmFtZXMpIHtcbiAgICAgICAgaWYgKHJvd1t0aGlzLmNvbHVtbk5hbWVzW2NdXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHIucHVzaChyb3dbdGhpcy5jb2x1bW5OYW1lc1tjXV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgci5wdXNoKG51bGwpO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZXMucHVzaChyKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNQcmltaXRpdmVUeXBlKHYpIHtcbiAgICAgIGlmIChfLmlzRGF0ZSh2KSB8fCBfLmlzU3RyaW5nKHYpIHx8IF8uaXNOdW1iZXIodikgfHwgXy5pc0Jvb2xlYW4odikgfHwgXy5pc05hTih2KSB8fCBfLmlzTnVsbCh2KSB8fCBfLmlzVW5kZWZpbmVkKHYpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YVR5cGUodikge1xuICAgICAgaWYgKF8uaXNEYXRlKHYpKVxuICAgICAgICByZXR1cm4gXCJ0aW1lXCI7XG4gICAgICBpZihfLmlzTnVtYmVyKHYpKSAvLyBjYW4gd2UgZG8gYSBiZXR0ZXIgam9iIGhlcmU/XG4gICAgICAgIHJldHVybiBcImRvdWJsZVwiO1xuICAgICAgaWYoXy5pc0Jvb2xlYW4odikpXG4gICAgICAgIHJldHVybiBcImJvb2xlYW5cIjtcbiAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc0RpY3Rpb25hcnkodikge1xuICAgICAgaWYgKCFfLmlzT2JqZWN0KHYpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IodmFyIGkgaW4gdikge1xuICAgICAgICBpZiAoIWlzUHJpbWl0aXZlVHlwZSh2W2ldKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtKHYsIG5vcmVjdXJzZSkge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbih2KSB8fCBfLmlzVW5kZWZpbmVkKHYpKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYgKF8uaXNEYXRlKHYpKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJEYXRlXCI7XG4gICAgICAgIG8udGltZXN0YW1wID0gdi52YWx1ZU9mKCk7XG4gICAgICAgIHJldHVybiBvXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1ByaW1pdGl2ZVR5cGUodikpXG4gICAgICAgIHJldHVybiB2O1xuXG4gICAgICBpZiAodiBpbnN0YW5jZW9mIEltYWdlSWNvbiAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgIG8udHlwZSA9IFwiSW1hZ2VJY29uXCI7XG4gICAgICAgIG8uaW1hZ2VEYXRhID0gdi5pbWFnZURhdGE7XG4gICAgICAgIG8ud2lkdGggPSB2LndpZHRoO1xuICAgICAgICBvLmhlaWdodCA9IHYuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gb1xuICAgICAgfVxuXG4gICAgICBpZiAodiBpbnN0YW5jZW9mIERhdGFGcmFtZSAmJiBub3JlY3Vyc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgIG8udHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgIG8uc3VidHlwZSA9IFwiVGFibGVEaXNwbGF5XCI7XG4gICAgICAgIG8udmFsdWVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgaW4gdi52YWx1ZXMpIHtcbiAgICAgICAgICB2YXIgcm93ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaiBpbiB2LnZhbHVlc1tpXSkge1xuICAgICAgICAgICAgcm93LnB1c2godHJhbnNmb3JtKHYudmFsdWVzW2ldW2pdLCB0cnVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG8udmFsdWVzLnB1c2gocm93KTtcbiAgICAgICAgfVxuICAgICAgICBvLnR5cGVzID0gXy5pc0FycmF5KHYudHlwZXMpID8gdi50eXBlcy5zbGljZSgwKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgby5jb2x1bW5OYW1lcyA9IF8uaXNBcnJheSh2LmNvbHVtbk5hbWVzKSA/IHYuY29sdW1uTmFtZXMuc2xpY2UoMCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBvXG4gICAgICB9XG5cbiAgICAgIGlmIChfLmlzQXJyYXkodikgJiYgdi5sZW5ndGg+MCkge1xuICAgICAgICB2YXIgZG9pdCA9IHRydWU7XG4gICAgICAgIGZvcih2YXIgciBpbiB2KSB7XG4gICAgICAgICAgaWYgKCFfLmlzQXJyYXkodltyXSkpIHtcbiAgICAgICAgICAgIGRvaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciBjIGluICh2W3JdKSkge1xuICAgICAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZVR5cGUodltyXVtjXSkpIHtcbiAgICAgICAgICAgICAgZG9pdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvaXQgJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgbyA9IHt9XG4gICAgICAgICAgby50eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgICBvLnZhbHVlcyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gdikge1xuICAgICAgICAgICAgdmFyIHJvdyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiB2W2ldKVxuICAgICAgICAgICAgICByb3cucHVzaCh0cmFuc2Zvcm0odltpXVtpdGVtXSwgdHJ1ZSkpO1xuICAgICAgICAgICAgby52YWx1ZXMucHVzaChyb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvLnN1YnR5cGUgPSBcIk1hdHJpeFwiO1xuICAgICAgICAgIG8uY29sdW1uTmFtZXMgPSBbXTtcbiAgICAgICAgICBvLnR5cGVzID0gW107XG4gICAgICAgICAgZm9yKHZhciBpIGluIHZbMF0pIHtcbiAgICAgICAgICAgIG8uY29sdW1uTmFtZXMucHVzaCgnYycraSk7XG4gICAgICAgICAgICBvLnR5cGVzLnB1c2goZ2V0RGF0YVR5cGUodlswXVtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2l0ID0gdHJ1ZTtcbiAgICAgICAgICBmb3IodmFyIHIgaW4gdikge1xuICAgICAgICAgICAgaWYgKCFpc0RpY3Rpb25hcnkodltyXSkpIHtcbiAgICAgICAgICAgICAgZG9pdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRvaXQgJiYgbm9yZWN1cnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICBvLnR5cGUgPSBcIlRhYmxlRGlzcGxheVwiO1xuICAgICAgICAgICAgby5zdWJ0eXBlID0gXCJMaXN0T2ZNYXBzXCI7XG4gICAgICAgICAgICBvLmNvbHVtbk5hbWVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHYpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiB2W2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKG8uY29sdW1uTmFtZXMuaW5kZXhPZihqKTwwKVxuICAgICAgICAgICAgICAgICAgby5jb2x1bW5OYW1lcy5wdXNoKGopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgICAgIHZhciBvMiA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIG8uY29sdW1uTmFtZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IG8uY29sdW1uTmFtZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKHZbaV1bbl0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgIG8yLnB1c2godHJhbnNmb3JtKHZbaV1bbl0sIHRydWUpKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICBvMi5wdXNoKG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG8udmFsdWVzLnB1c2gobzIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgby50eXBlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBvLmNvbHVtbk5hbWVzKSB7XG4gICAgICAgICAgICAgIHZhciBuID0gby5jb2x1bW5OYW1lc1tqXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZbaV1bbl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgby50eXBlcy5wdXNoKGdldERhdGFUeXBlKHZbaV1bbl0pKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChfLmlzQXJyYXkodikpIHtcbiAgICAgICAgdmFyIG8gPSBbXTtcbiAgICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgICBvLnB1c2godHJhbnNmb3JtKHZbcF0sIHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICAgIH1cblxuICAgICAgaWYgKF8uaXNPYmplY3QodikgJiYgaXNEaWN0aW9uYXJ5KHYpICYmIG5vcmVjdXJzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBvID0ge31cbiAgICAgICAgby50eXBlID0gXCJUYWJsZURpc3BsYXlcIjtcbiAgICAgICAgby52YWx1ZXMgPSBbXTtcbiAgICAgICAgby5zdWJ0eXBlID0gXCJEaWN0aW9uYXJ5XCI7XG4gICAgICAgIG8uY29sdW1uTmFtZXM9IFsnS2V5JywnVmFsdWUnXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2KSB7XG4gICAgICAgICAgdmFyIHIgPSBbXTtcbiAgICAgICAgICByLnB1c2goaSk7XG4gICAgICAgICAgci5wdXNoKHRyYW5zZm9ybSh2W2ldLHRydWUpKTtcbiAgICAgICAgICBvLnZhbHVlcy5wdXNoKHIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfVxuICAgICAgdmFyIG8gPSB7fTtcbiAgICAgIGZvcih2YXIgcCBpbiB2KSB7XG4gICAgICAgIG9bcF0gPSB0cmFuc2Zvcm0odltwXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtQmFjayh2KSB7XG4gICAgICBpZih2ID09PSB1bmRlZmluZWQgfHwgKCFfLmlzT2JqZWN0KHYpICYmICFfLmlzQXJyYXkodikpKVxuICAgICAgICByZXR1cm4gdjtcblxuICAgICAgaWYgKHYudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh2LnR5cGUgPT09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHYudGltZXN0YW1wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodi50eXBlID09PSBcIlRhYmxlRGlzcGxheVwiKSB7XG4gICAgICAgICAgaWYgKHYuc3VidHlwZSA9PT0gXCJEaWN0aW9uYXJ5XCIpIHtcbiAgICAgICAgICAgIHZhciBvID0ge31cbiAgICAgICAgICAgIGZvciAodmFyIHIgaW4gdi52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgb1t2LnZhbHVlc1tyXVswXV0gPSB0cmFuc2Zvcm1CYWNrKHYudmFsdWVzW3JdWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodi5zdWJ0eXBlID09PSBcIk1hdHJpeFwiKSB7XG4gICAgICAgICAgICB2YXIgbyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2LnZhbHVlcykge1xuICAgICAgICAgICAgICBvLnB1c2godi52YWx1ZXNbaV0uc2xpY2UoMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2LnN1YnR5cGUgPT09IFwiTGlzdE9mTWFwc1wiKSB7XG4gICAgICAgICAgICB2YXIgb3V0MiA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgciBpbiB2LnZhbHVlcykge1xuICAgICAgICAgICAgICB2YXIgb3V0MyA9IHsgfTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHYudmFsdWVzW3JdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHYudmFsdWVzW3JdW2ldICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgb3V0M1sgdi5jb2x1bW5OYW1lc1tpXSBdID0gdHJhbnNmb3JtQmFjayh2LnZhbHVlc1tyXVtpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb3V0Mi5wdXNoKG91dDMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dDI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBvdXQgPSBuZXcgRGF0YUZyYW1lKHYpO1xuICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHYudHlwZSA9PT0gXCJJbWFnZUljb25cIilcbiAgICAgICAgICByZXR1cm4gbmV3IEltYWdlSWNvbih2KTtcbiAgICAgIH1cbiAgICAgIGlmICghXy5pc0FycmF5KHYpKSB7XG4gICAgICAgIHZhciBvID0ge307XG4gICAgICAgIGZvcih2YXIgcCBpbiB2KSB7XG4gICAgICAgICAgb1twXSA9IHRyYW5zZm9ybUJhY2sodltwXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG87XG4gICAgICB9XG4gICAgICB2YXIgbyA9IFtdO1xuICAgICAgZm9yKHZhciBwIGluIHYpIHtcbiAgICAgICAgby5wdXNoKHRyYW5zZm9ybUJhY2sodltwXSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuXG4gICAgdmFyIF9ub3RlYm9va1VyaSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBERUZBVUxUX1ZBTFVFID0gbnVsbDtcbiAgICAgIHZhciBfdiA9IERFRkFVTFRfVkFMVUU7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5zZXQoREVGQVVMVF9WQUxVRSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF92O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBfdiA9IHY7XG4gICAgICAgICAgaWYgKCFfLmlzRW1wdHkoX3YpKSB7XG4gICAgICAgICAgICBia1JlY2VudE1lbnUucmVjb3JkUmVjZW50RG9jdW1lbnQoZ2VuZXJhdGVSZWNlbnREb2N1bWVudEl0ZW0oKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICB2YXIgX3VyaVR5cGUgPSBudWxsO1xuICAgIHZhciBfcmVhZE9ubHkgPSBudWxsO1xuICAgIHZhciBfZm9ybWF0ID0gbnVsbDtcbiAgICB2YXIgX3Nlc3Npb25JZCA9IG51bGw7XG4gICAgdmFyIF9lZGl0ZWQgPSBmYWxzZTtcblxuICAgIHZhciBCZWFrZXJPYmplY3QgPSBmdW5jdGlvbihuYm1vZGVsKSB7XG4gICAgICB0aGlzLmtub3duQmVha2VyVmFycyA9IHsgfTtcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG4gICAgICB0aGlzLnNldENhY2hlID0geyB9O1xuICAgICAgdGhpcy5iZWFrZXJPYmogPSB7IH1cbiAgICAgIHRoaXMubmJtb2RlbCA9IG5ibW9kZWw7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuc2V0dXBCZWFrZXJPYmplY3QgPSBmdW5jdGlvbihtb2RlbE91dHB1dCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5iZWFrZXJPYmouc2hvd1Byb2dyZXNzVXBkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2hvd1Byb2dyZXNzVXBkYXRlJywgeyB2YWx1ZTogZnVuY3Rpb24gKGEsYixjKSB7XG4gICAgICAgICAgaWYgKCBhID09PSB1bmRlZmluZWQgfHwgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBpZiAoIHR5cGVvZiBhID09PSAnc3RyaW5nJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QubWVzc2FnZSA9IGE7XG4gICAgICAgICAgZWxzZSBpZiAoIHR5cGVvZiBhID09PSAnbnVtYmVyJyApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucHJvZ3Jlc3NCYXIgPSBhO1xuICAgICAgICAgIGVsc2UgaWYgKCBhICE9PSBudWxsIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wYXlsb2FkID0gYTtcblxuICAgICAgICAgIGlmICggdHlwZW9mIGIgPT09ICdzdHJpbmcnIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5tZXNzYWdlID0gYjtcbiAgICAgICAgICBlbHNlIGlmICggdHlwZW9mIGIgPT09ICdudW1iZXInIClcbiAgICAgICAgICAgIHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdC5wcm9ncmVzc0JhciA9IGI7XG4gICAgICAgICAgZWxzZSBpZiAoIGIgIT09IG51bGwgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnBheWxvYWQgPSBiO1xuXG4gICAgICAgICAgaWYgKCB0eXBlb2YgYyA9PT0gJ3N0cmluZycgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0Lm1lc3NhZ2UgPSBjO1xuICAgICAgICAgIGVsc2UgaWYgKCB0eXBlb2YgYyA9PT0gJ251bWJlcicgKVxuICAgICAgICAgICAgc2VsZi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQub2JqZWN0LnByb2dyZXNzQmFyID0gYztcbiAgICAgICAgICBlbHNlIGlmICggYyAhPT0gbnVsbCApXG4gICAgICAgICAgICBzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0X3Jlc3VsdC5vYmplY3QucGF5bG9hZCA9IGM7XG4gICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnc2hvd1N0YXR1cycsIHsgdmFsdWU6IGJrSGVscGVyLnNob3dTdGF0dXMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2NsZWFyU3RhdHVzJywgeyB2YWx1ZTogYmtIZWxwZXIuY2xlYXJTdGF0dXMsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3Nob3dUcmFuc2llbnRTdGF0dXMnLCB7IHZhbHVlOiBia0hlbHBlci5zaG93VHJhbnNpZW50U3RhdHVzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdnZXRFdmFsdWF0b3JzJywgeyB2YWx1ZTogYmtIZWxwZXIuZ2V0RXZhbHVhdG9ycywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZ2V0Q29kZUNlbGxzJywgeyB2YWx1ZTogYmtIZWxwZXIuZ2V0Q29kZUNlbGxzLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdzZXRDb2RlQ2VsbEJvZHknLCB7IHZhbHVlOiBia0hlbHBlci5zZXRDb2RlQ2VsbEJvZHksIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3NldENvZGVDZWxsRXZhbHVhdG9yJywgeyB2YWx1ZTogYmtIZWxwZXIuc2V0Q29kZUNlbGxFdmFsdWF0b3IsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3NldENvZGVDZWxsVGFncycsIHsgdmFsdWU6IGJrSGVscGVyLnNldENvZGVDZWxsVGFncywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZXZhbHVhdGUnLCB7IHZhbHVlOiBmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGJrSGVscGVyLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgICBzZWxmLmJlYWtlck9iamVjdFRvTm90ZWJvb2soKTtcbiAgICAgICAgICAgIGJrSGVscGVyLmV2YWx1YXRlKGEpLnRoZW4oZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVzb2x2ZSh0cmFuc2Zvcm1CYWNrKHIpKTsgfSwgZnVuY3Rpb24gKHIpIHsgc2VsZi5ub3RlYm9va1RvQmVha2VyT2JqZWN0KCk7IGQucmVqZWN0KHIpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBkLnByb21pc2U7XG4gICAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnZXZhbHVhdGVDb2RlJywgeyB2YWx1ZTogZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgdmFyIGQgPSBia0hlbHBlci5uZXdEZWZlcnJlZCgpO1xuICAgICAgICAgICAgc2VsZi5iZWFrZXJPYmplY3RUb05vdGVib29rKCk7XG4gICAgICAgICAgICBia0hlbHBlci5ldmFsdWF0ZUNvZGUoYSxiKS50aGVuKGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlc29sdmUodHJhbnNmb3JtQmFjayhyKSk7IH0sIGZ1bmN0aW9uIChyKSB7IHNlbGYubm90ZWJvb2tUb0JlYWtlck9iamVjdCgpOyBkLnJlamVjdChyKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gZC5wcm9taXNlO1xuICAgICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ3ByaW50Jywge3ZhbHVlOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICAgIGJrSGVscGVyLnJlY2VpdmVFdmFsdWF0aW9uVXBkYXRlKHNlbGYuX2JlYWtlcl9tb2RlbF9vdXRwdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge291dHB1dGRhdGE6W3t0eXBlOidvdXQnLCB2YWx1ZTogaW5wdXQrXCJcXG5cIn1dfSwgXCJKYXZhU2NyaXB0XCIpO1xuICAgICAgICAgIC8vIFhYWCBzaG91bGQgbm90IGJlIG5lZWRlZCBidXQgd2hlbiBwcm9ncmVzcyBtZXRlciBpcyBzaG93biBhdCBzYW1lIHRpbWVcbiAgICAgICAgICAvLyBkaXNwbGF5IGlzIGJyb2tlbiB3aXRob3V0IHRoaXMsIHlvdSBnZXQgXCJPVVRQVVRcIiBpbnN0ZWFkIG9mIGFueSBsaW5lcyBvZiB0ZXh0LlxuICAgICAgICAgIGJrSGVscGVyLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgfSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAncHJpbnRFcnJvcicsIHt2YWx1ZTogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICBia0hlbHBlci5yZWNlaXZlRXZhbHVhdGlvblVwZGF0ZShzZWxmLl9iZWFrZXJfbW9kZWxfb3V0cHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvdXRwdXRkYXRhOlt7dHlwZTonZXJyJywgdmFsdWU6IGlucHV0K1wiXFxuXCJ9XX0sIFwiSmF2YVNjcmlwdFwiKTtcbiAgICAgICAgICAvLyBYWFggc2hvdWxkIG5vdCBiZSBuZWVkZWQgYnV0IHdoZW4gcHJvZ3Jlc3MgbWV0ZXIgaXMgc2hvd24gYXQgc2FtZSB0aW1lXG4gICAgICAgICAgLy8gZGlzcGxheSBpcyBicm9rZW4gd2l0aG91dCB0aGlzLCB5b3UgZ2V0IFwiT1VUUFVUXCIgaW5zdGVhZCBvZiBhbnkgbGluZXMgb2YgdGV4dC5cbiAgICAgICAgICBia0hlbHBlci5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH0sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2xvYWRKUycsIHsgdmFsdWU6IGJrSGVscGVyLmxvYWRKUywgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnbG9hZENTUycsIHsgdmFsdWU6IGJrSGVscGVyLmxvYWRDU1MsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2xvYWRMaXN0JywgeyB2YWx1ZTogYmtIZWxwZXIubG9hZExpc3QsIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgJ2h0dHBHZXQnLCB7IHZhbHVlOiBia0hlbHBlci5odHRwR2V0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdodHRwUG9zdCcsIHsgdmFsdWU6IGJrSGVscGVyLmh0dHBQb3N0LCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICduZXdEZWZlcnJlZCcsIHsgdmFsdWU6IGJrSGVscGVyLm5ld0RlZmVycmVkLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICduZXdQcm9taXNlJywgeyB2YWx1ZTogYmtIZWxwZXIubmV3UHJvbWlzZSwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnYWxsJywgeyB2YWx1ZTogYmtIZWxwZXIuYWxsLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICd0aW1lb3V0JywgeyB2YWx1ZTogYmtIZWxwZXIudGltZW91dCwgd3JpdGVhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCAnRGF0YUZyYW1lJywgeyB2YWx1ZTogRGF0YUZyYW1lLCB3cml0ZWFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5iZWFrZXJPYmosICdJbWFnZUljb24nLCB7IHZhbHVlOiBJbWFnZUljb24sIHdyaXRlYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgIHRoaXMucHJlZGVmaW5lZCA9IE9iamVjdC5rZXlzKHRoaXMuYmVha2VyT2JqKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0ID0gbW9kZWxPdXRwdXQucmVzdWx0OyAvLyBYWFggb2J2aWF0ZWQgYnkgbmV4dCBsaW5lXG4gICAgICB0aGlzLl9iZWFrZXJfbW9kZWxfb3V0cHV0ID0gbW9kZWxPdXRwdXQ7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuY2xlYXJPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0Lm9iamVjdCA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5iZWFrZXJHZXR0ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAodGhpcy5zZXRDYWNoZVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldENhY2hlW25hbWVdO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0Q2FjaGVbbmFtZV0gPT09IHVuZGVmaW5lZCAmJiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZ2V0Q2FjaGVbbmFtZV0gPSB0cmFuc2Zvcm1CYWNrKHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbbmFtZV0pO1xuICAgICAgLy8gdGhpcyBpcyByZXF1aXJlZCB0byBzdXBwb3J0IHN1Ym9iamVjdCBtb2RpZmljYXRpb25cbiAgICAgIHRoaXMuc2V0Q2FjaGVbbmFtZV0gPSB0aGlzLmdldENhY2hlW25hbWVdO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVbbmFtZV07XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUuYmVha2VyU2V0dGVyID0gZnVuY3Rpb24obmFtZSwgdikge1xuICAgICAgdGhpcy5zZXRDYWNoZVtuYW1lXSA9IHY7XG4gICAgICBpZiAodGhpcy5iZWFrZXJTZXR0ZXJUaW1lb3V0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJrSGVscGVyLmNhbmNlbFRpbWVvdXQodGhpcy5iZWFrZXJTZXR0ZXJUaW1lb3V0KTtcbiAgICAgIHZhciBtYWtlVGltZW91dCA9IGZ1bmN0aW9uKHNlbGYpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuYmVha2VyU2V0dGVyVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBzZWxmLmJlYWtlck9iamVjdFRvTm90ZWJvb2soKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB0aGlzLmJlYWtlclNldHRlclRpbWVvdXQgPSBia0hlbHBlci50aW1lb3V0KG1ha2VUaW1lb3V0KHRoaXMpLDUwMCk7XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUubm90ZWJvb2tUb0JlYWtlck9iamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2xlYXIgZ2V0Y2FjaGVcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG5cbiAgICAgIC8vIGNoZWNrIGlmIHNvbWUgb3RoZXIgbGFuZ3VhZ2UgcmVtb3ZlZCBhIGJpbmRpbmdcbiAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5rbm93bkJlYWtlclZhcnMpIHtcbiAgICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5rbm93bkJlYWtlclZhcnNbcF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuYmVha2VyT2JqW3BdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLnNldENhY2hlW3BdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHNvbWUgb3RoZXIgbGFuZ3VhZ2UgYWRkZWQgYSBiaW5kaW5nXG4gICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSkge1xuICAgICAgICAgIHZhciB0ID0gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXTtcbiAgICAgICAgICBpZiAodGhpcy5wcmVkZWZpbmVkLmluZGV4T2YocCk+PTApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYmVha2VyT2JqW3BdO1xuICAgICAgICAgICAgdGhpcy5rbm93bkJlYWtlclZhcnNbcF0gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG1ha2VHZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHNlbGYuYmVha2VyR2V0dGVyKG5hbWUpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWFrZVNldHRlciA9IGZ1bmN0aW9uKHNlbGYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHsgc2VsZi5iZWFrZXJTZXR0ZXIobmFtZSx2KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYmVha2VyT2JqLCBwLFxuICAgICAgICAgICAgICAgIHsgd3JpdGVhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZ2V0OiBtYWtlR2V0dGVyKHRoaXMsIHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMsIHApLFxuICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBCZWFrZXJPYmplY3QucHJvdG90eXBlLmJlYWtlck9iamVjdFRvTm90ZWJvb2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5iZWFrZXJPYmopO1xuICAgICAgdmFyIHN0dWZmID0gT2JqZWN0LmtleXModGhpcy5rbm93bkJlYWtlclZhcnMpO1xuICAgICAgdmFyIGRpZmYgPSAkKGtleXMpLm5vdChzdHVmZikuZ2V0KCk7XG4gICAgICBkaWZmID0gJChkaWZmKS5ub3QodGhpcy5wcmVkZWZpbmVkKS5nZXQoKTtcblxuICAgICAgLy8gY2hlY2sgaWYgamF2YXNjcmlwdCByZW1vdmVkIGEgYmluZGluZ1xuICAgICAgaWYgKCB0aGlzLm5ibW9kZWwubmFtZXNwYWNlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5uYm1vZGVsLm5hbWVzcGFjZSkge1xuICAgICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSAhPT0gdW5kZWZpbmVkICYmIGtleXMuaW5kZXhPZihwKSA8MCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5rbm93bkJlYWtlclZhcnNbcF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGphdmFzY3JpcHQgc2V0IGFueSBORVcgdmFyaWFibGVcbiAgICAgIGZvciAodmFyIGkgaW4gZGlmZikge1xuICAgICAgICB2YXIgcCA9IGRpZmZbaV07XG4gICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgICAgdmFyIHQgPSB0aGlzLmJlYWtlck9ialtwXTtcbiAgICAgICAgICBpZiAoKHRoaXMucHJlZGVmaW5lZC5pbmRleE9mKHApPj0wIHx8IF8uaXNGdW5jdGlvbih0KSkpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvIE5PVCBwdXQgZnVuY3Rpb25zIGluIHRoZSBuYW1lc3BhY2VcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm5ibW9kZWwubmFtZXNwYWNlW3BdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMua25vd25CZWFrZXJWYXJzW3BdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldENhY2hlW3BdID0gdDtcbiAgICAgICAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzW3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBzZWxmLmJlYWtlckdldHRlcihuYW1lKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ha2VTZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHNlbGYuYmVha2VyU2V0dGVyKG5hbWUsdik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgcCxcbiAgICAgICAgICAgICAgICB7IHdyaXRlYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGdldDogbWFrZUdldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGphdmFzY3JpcHQgc2V0IGFueSBuZXcgdmFyaWFibGVcbiAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5zZXRDYWNoZSkge1xuICAgICAgICBpZiAodGhpcy5uYm1vZGVsLm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgIGlmICh0aGlzLmlzQ2lyY3VsYXJPYmplY3QodGhpcy5zZXRDYWNoZVtwXSkpXG4gICAgICAgICAgdGhpcy5uYm1vZGVsLm5hbWVzcGFjZVtwXSA9IFwiRVJST1I6IGNpcmN1bGFyIG9iamVjdHMgYXJlIG5vdCBzdXBwb3J0ZWRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMubmJtb2RlbC5uYW1lc3BhY2VbcF0gPSB0cmFuc2Zvcm0odGhpcy5zZXRDYWNoZVtwXSk7XG4gICAgICAgIGlmICh0aGlzLmtub3duQmVha2VyVmFyc1twXSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuYmVha2VyT2JqW3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMua25vd25CZWFrZXJWYXJzW3BdID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYWtlR2V0dGVyID0gZnVuY3Rpb24oc2VsZiwgbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBzZWxmLmJlYWtlckdldHRlcihuYW1lKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ha2VTZXR0ZXIgPSBmdW5jdGlvbihzZWxmLCBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2KSB7IHNlbGYuYmVha2VyU2V0dGVyKG5hbWUsdik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmJlYWtlck9iaiwgcCxcbiAgICAgICAgICAgICAgICB7IHdyaXRlYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGdldDogbWFrZUdldHRlcih0aGlzLHApLFxuICAgICAgICAgICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHRoaXMscCksXG4gICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNsZWFyIHNldGNhY2hlIGFuZCBnZXRjYWNoZVxuICAgICAgdGhpcy5zZXRDYWNoZSA9IHsgfTtcbiAgICAgIHRoaXMuZ2V0Q2FjaGUgPSB7IH07XG4gICAgfTtcblxuICAgIEJlYWtlck9iamVjdC5wcm90b3R5cGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG4gICAgQmVha2VyT2JqZWN0LnByb3RvdHlwZS5pc0NpcmN1bGFyT2JqZWN0ID0gZnVuY3Rpb24obm9kZSwgcGFyZW50cykge1xuICAgICAgcGFyZW50cyA9IHBhcmVudHMgfHwgW107XG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUgIT0gXCJvYmplY3RcIil7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMobm9kZSksIGksIHZhbHVlO1xuICAgICAgcGFyZW50cy5wdXNoKG5vZGUpO1xuICAgICAgZm9yIChpID0ga2V5cy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgIHZhbHVlID0gbm9kZVtrZXlzW2ldXTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgaWYgKHBhcmVudHMuaW5kZXhPZih2YWx1ZSk+PTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5pc0NpcmN1bGFyT2JqZWN0KHZhbHVlLCBwYXJlbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwYXJlbnRzLnBvcChub2RlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gICAgdmFyIF9ibyA9IHt9O1xuXG4gICAgdmFyIF9ub3RlYm9va01vZGVsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF92ID0ge307XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5zZXQoe30pO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0QmVha2VyT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX2JvO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBfdiA9IHY7XG4gICAgICAgICAgLy8gdGhpcyByZW1vdmVzIGxlZ2FjeSBkYXRhIHByZXZpb3VzbHkgc2F2ZWRcbiAgICAgICAgICBpZiAoX3YuX2JlYWtlcl9tb2RlbF9vdXRwdXRfcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfdi5fYmVha2VyX21vZGVsX291dHB1dF9yZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaWYgKF92Lm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIC8vICBfdi5uYW1lc3BhY2UgPSB7IH07XG4gICAgICAgICAgX2JvID0gbmV3IEJlYWtlck9iamVjdChfdik7XG4gICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICBia05vdGVib29rQ2VsbE1vZGVsTWFuYWdlci5yZXNldChbXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnJlc2V0KF92LmNlbGxzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLmlzRW1wdHkoX3YpO1xuICAgICAgICB9LFxuICAgICAgICBpc0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICF0aGlzLmlzRW1wdHkoKSAmJiAhIV92LmxvY2tlZDtcbiAgICAgICAgfSxcbiAgICAgICAgdG9Kc29uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYW5ndWxhci50b0pzb24oX3YpO1xuICAgICAgICB9LFxuICAgICAgICB0b0NsZWFuUHJldHR5SnNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy9zdHJpcCBvdXQgdGhlIHNoZWxsIElEc1xuICAgICAgICAgIHZhciBzaGVsbElkcyA9IF8oX3YuZXZhbHVhdG9ycykubWFwKGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgICAgdmFyIHNoZWxsSWQgPSBldmFsdWF0b3Iuc2hlbGxJRDtcbiAgICAgICAgICAgIGRlbGV0ZSBldmFsdWF0b3Iuc2hlbGxJRDtcbiAgICAgICAgICAgIHJldHVybiBzaGVsbElkO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGdlbmVyYXRlIHByZXR0eSBKU09OXG4gICAgICAgICAgdmFyIHByZXR0eUpzb24gPSBia1V0aWxzLnRvUHJldHR5SnNvbihfdik7XG4gICAgICAgICAgLy8gcHV0IHRoZSBzaGVsbCBJRHMgYmFja1xuICAgICAgICAgIF8oX3YuZXZhbHVhdG9ycykuZWFjaChmdW5jdGlvbihldmFsdWF0b3IsIGluZGV4KSB7XG4gICAgICAgICAgICBldmFsdWF0b3Iuc2hlbGxJRCA9IHNoZWxsSWRzW2luZGV4XTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gcHJldHR5SnNvbjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgdmFyIGdlbmVyYXRlQmFja3VwRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm90ZWJvb2tVcmk6IF9ub3RlYm9va1VyaS5nZXQoKSxcbiAgICAgICAgdXJpVHlwZTogX3VyaVR5cGUsXG4gICAgICAgIHJlYWRPbmx5OiBfcmVhZE9ubHksXG4gICAgICAgIGZvcm1hdDogX2Zvcm1hdCxcbiAgICAgICAgbm90ZWJvb2tNb2RlbEpzb246IF9ub3RlYm9va01vZGVsLnRvSnNvbigpLFxuICAgICAgICBlZGl0ZWQ6IF9lZGl0ZWRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVSZWNlbnREb2N1bWVudEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdXJpOiBfbm90ZWJvb2tVcmkuZ2V0KCksXG4gICAgICAgIHR5cGU6IF8uaXNFbXB0eShfdXJpVHlwZSkgPyBcIlwiIDogX3VyaVR5cGUsXG4gICAgICAgIHJlYWRPbmx5OiAhIV9yZWFkT25seSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgZm9ybWF0OiBfLmlzRW1wdHkoX2Zvcm1hdCkgPyBcIlwiIDogX2Zvcm1hdFxuICAgICAgfTtcbiAgICAgIHJldHVybiBhbmd1bGFyLnRvSnNvbihkYXRhKTtcbiAgICB9O1xuXG4gICAgdmFyIGdlbmVyYXRlU2F2ZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVyaVR5cGU6IF91cmlUeXBlLFxuICAgICAgICBub3RlYm9va1VyaTogX25vdGVib29rVXJpLmdldCgpLFxuICAgICAgICBub3RlYm9va01vZGVsQXNTdHJpbmc6IF9ub3RlYm9va01vZGVsLnRvQ2xlYW5QcmV0dHlKc29uKClcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBfc3Vic2NyaXB0aW9ucyA9IHt9O1xuICAgIHZhciBjb25uZWN0Y29udHJvbCA9IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgX3N1YnNjcmlwdGlvbnNbc2Vzc2lvbklkXSA9XG4gICAgICAgICAgJC5jb21ldGQuc3Vic2NyaWJlKFwiL25vdGVib29rY3RybC9cIiArIHNlc3Npb25JZCwgZnVuY3Rpb24ocmVxKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwiYmtIZWxwZXIuXCIrcmVxLmRhdGEubWV0aG9kO1xuICAgICAgICAgICAgICB2YXIgbnVtYXJncyA9IHJlcS5kYXRhLm51bWFyZ3M7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IG51bWFyZ3M7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goIHJlcS5kYXRhW1wiYXJnXCIraV0gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgcHVibGlzaCA9IHRydWU7XG4gICAgICAgICAgICAgIHZhciByZXBseTIgPSB7IHNlc3Npb246IHNlc3Npb25JZCB9O1xuICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSBldmFsKG5hbWUpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICBpZih0eXBlb2YgcmVwbHkyLnZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiByZXBseTIudmFsdWUucHJvbWlzZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHJlcGx5Mi52YWx1ZS5wcm9taXNlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZSA9IHJlcGx5Mi52YWx1ZS5wcm9taXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcmVwbHkyLnZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIC8vIG11c3Qgd2FpdCBmb3IgcmVzdWx0IHRvIGJlIHJlYWR5XG4gICAgICAgICAgICAgICAgICBwdWJsaXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICByZXBseTIudmFsdWUudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkyLnZhbHVlPXJlcztcbiAgICAgICAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KHJlcGx5MikpO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5Mi52YWx1ZT1lcnI7XG4gICAgICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChyZXBseTIudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXBseTIudmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAocHVibGlzaCkge1xuICAgICAgICAgICAgICAgICQuY29tZXRkLnB1Ymxpc2goXCIvc2VydmljZS9ub3RlYm9va2N0cmwvcmVjZWl2ZVwiLCBKU09OLnN0cmluZ2lmeShyZXBseTIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0FUQ0ggXCIrZXJyKTtcbiAgICAgICAgICAgICAgJC5jb21ldGQucHVibGlzaChcIi9zZXJ2aWNlL25vdGVib29rY3RybC9yZWNlaXZlXCIsIEpTT04uc3RyaW5naWZ5KCB7IHNlc3Npb246IHNlc3Npb25JZCwgdmFsdWU6IGZhbHNlIH0gKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZGlzY29ubmVjdGNvbnRyb2wgPSBmdW5jdGlvbihzZXNzaW9uSWQpIHtcbiAgICAgICAgaWYgKHNlc3Npb25JZCkge1xuICAgICAgICAgICQuY29tZXRkLnVuc3Vic2NyaWJlKF9zdWJzY3JpcHRpb25zW3Nlc3Npb25JZF0pO1xuICAgICAgICAgIGRlbGV0ZSBfc3Vic2NyaXB0aW9uc1tzZXNzaW9uSWRdO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc2V0OiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCwgbm90ZWJvb2tNb2RlbCwgZWRpdGVkLCBzZXNzaW9uSWQpIHtcblxuICAgICAgICAvLyBiYWNrdXAgZXhpc3Rpbmcgc2Vzc2lvbiBpZiBpdCdzIG5vdCBlbXB0eS5cbiAgICAgICAgaWYgKF9zZXNzaW9uSWQgJiYgIV9ub3RlYm9va01vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICAgIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9zZXNzaW9uSWQpXG4gICAgICAgICAgZGlzY29ubmVjdGNvbnRyb2woX3Nlc3Npb25JZCk7XG5cbiAgICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLnJlc2V0KCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgICAgc2Vzc2lvbklkID0gYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgX3VyaVR5cGUgPSB1cmlUeXBlO1xuICAgICAgICBfcmVhZE9ubHkgPSByZWFkT25seTtcbiAgICAgICAgX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgX25vdGVib29rVXJpLnNldChub3RlYm9va1VyaSk7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLnNldChub3RlYm9va01vZGVsKTtcbiAgICAgICAgX2VkaXRlZCA9ICEhZWRpdGVkO1xuICAgICAgICBfc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuXG4gICAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIuaW5pdChzZXNzaW9uSWQsIG5vdGVib29rTW9kZWwpO1xuICAgICAgICBjb25uZWN0Y29udHJvbChzZXNzaW9uSWQpO1xuICAgICAgICBia1Nlc3Npb24uYmFja3VwKF9zZXNzaW9uSWQsIGdlbmVyYXRlQmFja3VwRGF0YSgpKTtcbiAgICAgIH0sXG4gICAgICBzZXRTZXNzaW9uSWQ6IGZ1bmN0aW9uKHNlc3Npb25JZCkge1xuICAgICAgICBpZiAoIXNlc3Npb25JZCkge1xuICAgICAgICAgIHNlc3Npb25JZCA9IGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgfVxuICAgICAgICBfc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgICAgICByZXR1cm4gX3Nlc3Npb25JZDtcbiAgICAgIH0sXG4gICAgICBzZXR1cDogZnVuY3Rpb24obm90ZWJvb2tVcmksIHVyaVR5cGUsIHJlYWRPbmx5LCBmb3JtYXQsIG5vdGVib29rTW9kZWwsIGVkaXRlZCwgc2Vzc2lvbklkKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgICAgc2Vzc2lvbklkID0gYmtVdGlscy5nZW5lcmF0ZUlkKDYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgX3VyaVR5cGUgPSB1cmlUeXBlO1xuICAgICAgICBfcmVhZE9ubHkgPSByZWFkT25seTtcbiAgICAgICAgX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgX25vdGVib29rVXJpLnNldChub3RlYm9va1VyaSk7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLnNldChub3RlYm9va01vZGVsKTtcbiAgICAgICAgX2VkaXRlZCA9ICEhZWRpdGVkO1xuICAgICAgICBfc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuXG4gICAgICAgIGJrTm90ZWJvb2tOYW1lc3BhY2VNb2RlbE1hbmFnZXIuaW5pdChzZXNzaW9uSWQsIG5vdGVib29rTW9kZWwpO1xuICAgICAgICBjb25uZWN0Y29udHJvbChzZXNzaW9uSWQpO1xuICAgICAgICBia1Nlc3Npb24uYmFja3VwKF9zZXNzaW9uSWQsIGdlbmVyYXRlQmFja3VwRGF0YSgpKTtcbiAgICAgIH0sXG4gICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGRpc2Nvbm5lY3Rjb250cm9sKF9zZXNzaW9uSWQpO1xuICAgICAgICBia0V2YWx1YXRvck1hbmFnZXIucmVzZXQoKTtcbiAgICAgICAgYmtOb3RlYm9va05hbWVzcGFjZU1vZGVsTWFuYWdlci5jbGVhcihfc2Vzc2lvbklkKTtcbiAgICAgICAgX25vdGVib29rVXJpLnJlc2V0KCk7XG4gICAgICAgIF91cmlUeXBlID0gbnVsbDtcbiAgICAgICAgX3JlYWRPbmx5ID0gbnVsbDtcbiAgICAgICAgX2Zvcm1hdCA9IG51bGw7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLnJlc2V0KCk7XG4gICAgICAgIF9zZXNzaW9uSWQgPSBudWxsO1xuICAgICAgICBfZWRpdGVkID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlci5leGl0QW5kUmVtb3ZlQWxsRXZhbHVhdG9ycygpO1xuICAgICAgICAgIHNlbGYuY2xlYXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKF9zZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uLmNsb3NlKF9zZXNzaW9uSWQpLnRoZW4oY2xvc2UpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBiYWNrdXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX3Nlc3Npb25JZCAmJiAhX25vdGVib29rTW9kZWwuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbi5iYWNrdXAoX3Nlc3Npb25JZCwgZ2VuZXJhdGVCYWNrdXBEYXRhKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBia1V0aWxzLm5ld1Byb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZU5vdGVib29rVXJpOiBmdW5jdGlvbihub3RlYm9va1VyaSwgdXJpVHlwZSwgcmVhZE9ubHksIGZvcm1hdCkge1xuICAgICAgICAvLyB0byBiZSB1c2VkIGJ5IHNhdmUtYXNcbiAgICAgICAgX3VyaVR5cGUgPSB1cmlUeXBlO1xuICAgICAgICBfcmVhZE9ubHkgPSByZWFkT25seTtcbiAgICAgICAgX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgX25vdGVib29rVXJpLnNldChub3RlYm9va1VyaSk7XG4gICAgICB9LFxuICAgICAgZ2V0Tm90ZWJvb2tUaXRsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfbm90ZWJvb2tVcmkuZ2V0KCkpIHtcbiAgICAgICAgICByZXR1cm4gX25vdGVib29rVXJpLmdldCgpLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCJOZXcgTm90ZWJvb2tcIjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzU2F2YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tVcmkgJiYgIV9yZWFkT25seTtcbiAgICAgIH0sXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiB0cmlnZ2VycyBhbGwgZGlzcGxheSBpbXBsZW1lbnRhdGlvbnMgdG8gc2F2ZSB0aGUgY3VycmVudCBvdXRwdXQgc3RhdHVzLlxuICAgICAgICogVGhpcyBzYXZlIGlzIGFzeW5jaHJvbm91cyBhbmQgaGFwcGVucyBpbiB0aGUgY3VycmVudCBkaWdlc3QgbG9vcC5cbiAgICAgICAqIFVzZXJzIG11c3Qgc2NoZWR1bGUgYSB0aW1lb3V0IHRvIGV4ZWN1dGUgY29kZSB0aGF0IHJlcXVpcmVzIHRoZSBkdW1wZWQgc3RhdGUuXG4gICAgICAgKi9cbiAgICAgIGR1bXBEaXNwbGF5U3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nZXROb3RlYm9va0NlbGxPcCgpLmR1bXBEaXNwbGF5U3RhdHVzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIGdldFNhdmVEYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlU2F2ZURhdGEoKTtcbiAgICAgIH0sXG4gICAgICBnZXROb3RlYm9va01vZGVsQXNTdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwudG9Kc29uKCk7XG4gICAgICB9LFxuICAgICAgZ2V0UmF3Tm90ZWJvb2tNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfbm90ZWJvb2tNb2RlbC5nZXQoKTtcbiAgICAgIH0sXG4gICAgICBnZXRCZWFrZXJPYmplY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX25vdGVib29rTW9kZWwuZ2V0QmVha2VyT2JqZWN0KCk7XG4gICAgICB9LFxuICAgICAgZ2V0U2Vzc2lvbklkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9zZXNzaW9uSWQ7XG4gICAgICB9LFxuICAgICAgaXNTZXNzaW9uVmFsaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV9zZXNzaW9uSWQpIHtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5uZXdQcm9taXNlKFwiZmFsc2VcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbi5nZXRTZXNzaW9ucygpLnRoZW4oZnVuY3Rpb24oc2Vzc2lvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBfKHNlc3Npb25zKS5jaGFpbigpLmtleXMoKS5jb250YWlucyhfc2Vzc2lvbklkKS52YWx1ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gVE9ETywgbW92ZSB0aGUgZm9sbG93aW5nIGltcGwgdG8gYSBkZWRpY2F0ZWQgbm90ZWJvb2sgbW9kZWwgbWFuYWdlclxuICAgICAgLy8gYnV0IHN0aWxsIGV4cG9zZSBpdCBoZXJlXG4gICAgICBzZXROb3RlYm9va01vZGVsRWRpdGVkOiBmdW5jdGlvbihlZGl0ZWQpIHtcbiAgICAgICAgX2VkaXRlZCA9IGVkaXRlZDtcbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTW9kZWxFZGl0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2VkaXRlZDtcbiAgICAgIH0sXG4gICAgICBpc05vdGVib29rTG9ja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmlzTG9ja2VkKCk7XG4gICAgICB9LFxuICAgICAgdG9nZ2xlTm90ZWJvb2tMb2NrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV9ub3RlYm9va01vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICAgIGlmICghX25vdGVib29rTW9kZWwuaXNMb2NrZWQoKSkge1xuICAgICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkubG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkubG9ja2VkID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfZWRpdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWx1YXRvclVudXNlZDogZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIHZhciBuID0gXy5maW5kKF9ub3RlYm9va01vZGVsLmdldCgpLmNlbGxzLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjLnR5cGUgPT0gXCJjb2RlXCIgJiYgYy5ldmFsdWF0b3IgPT0gcGx1Z2luO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICFuO1xuICAgICAgfSxcbiAgICAgIGFkZEV2YWx1YXRvcjogZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgIF9ub3RlYm9va01vZGVsLmdldCgpLmV2YWx1YXRvcnMucHVzaChldmFsdWF0b3IpO1xuICAgICAgICBfZWRpdGVkID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVFdmFsdWF0b3I6IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICB2YXIgbW9kZWwgPSBfbm90ZWJvb2tNb2RlbC5nZXQoKTtcbiAgICAgICAgbW9kZWwuZXZhbHVhdG9ycyA9IF8ucmVqZWN0KG1vZGVsLmV2YWx1YXRvcnMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gZS5wbHVnaW4gPT0gcGx1Z2luO1xuICAgICAgICB9KTtcbiAgICAgICAgX2VkaXRlZCA9IHRydWU7XG4gICAgICB9LFxuICAgICAgcmVjb25uZWN0RXZhbHVhdG9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIucmVjb25uZWN0RXZhbHVhdG9ycygpO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rQ2VsbE9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyO1xuICAgICAgfSxcbiAgICAgIGdldE5vdGVib29rTmV3Q2VsbEZhY3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5ld0NvZGVDZWxsOiBmdW5jdGlvbihldmFsdWF0b3IsIGlkKSB7XG4gICAgICAgICAgICBpZiAoIWV2YWx1YXRvcikge1xuICAgICAgICAgICAgICBldmFsdWF0b3IgPSBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzWzBdLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgIGlkID0gXCJjb2RlXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBcImlkXCI6IGlkLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJjb2RlXCIsXG4gICAgICAgICAgICAgIFwiZXZhbHVhdG9yXCI6IGV2YWx1YXRvcixcbiAgICAgICAgICAgICAgXCJpbnB1dFwiOiB7XG4gICAgICAgICAgICAgICAgXCJib2R5XCI6IFwiXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJvdXRwdXRcIjoge31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXdTZWN0aW9uQ2VsbDogZnVuY3Rpb24obGV2ZWwsIHRpdGxlLCBpZCkge1xuICAgICAgICAgICAgaWYgKCFsZXZlbCAmJiBsZXZlbCAhPT0gMCkge1xuICAgICAgICAgICAgICBsZXZlbCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGV2ZWwgPD0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBcImNyZWF0aW5nIHNlY3Rpb24gY2VsbCB3aXRoIGxldmVsIFwiICsgbGV2ZWwgKyBcIiBpcyBub3QgYWxsb3dlZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICAgICAgICB0aXRsZSA9IFwiTmV3IFNlY3Rpb24gSFwiICsgbGV2ZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgaWQgPSBcInNlY3Rpb25cIiArIGJrVXRpbHMuZ2VuZXJhdGVJZCg2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIFwiaWRcIjogaWQsXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlY3Rpb25cIixcbiAgICAgICAgICAgICAgXCJ0aXRsZVwiOiB0aXRsZSxcbiAgICAgICAgICAgICAgXCJsZXZlbFwiOiBsZXZlbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5ld01hcmtkb3duQ2VsbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHZhciB0YWlsID0gX25vdGVib29rTW9kZWwuZ2V0KCkuY2VsbHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgaWQgPSBcIm1hcmtkb3duXCIgKyBia1V0aWxzLmdlbmVyYXRlSWQoNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBcImlkXCI6IGlkLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJtYXJrZG93blwiLFxuICAgICAgICAgICAgICBcImJvZHlcIjogXCJcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaXNSb290Q2VsbEluaXRpYWxpemF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9ub3RlYm9va01vZGVsLmdldCgpLmluaXRpYWxpemVBbGw7XG4gICAgICB9LFxuICAgICAgc2V0Um9vdENlbGxJbml0aWFsaXphdGlvbjogZnVuY3Rpb24oaW5pdGlhbGl6YXRpb24pIHtcbiAgICAgICAgaWYgKGluaXRpYWxpemF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX25vdGVib29rTW9kZWwuZ2V0KCkuaW5pdGlhbGl6ZUFsbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vdGVib29rTW9kZWxBZGRFdmFsdWF0b3I6IGZ1bmN0aW9uKG5ld0V2YWx1YXRvcikge1xuICAgICAgICBfbm90ZWJvb2tNb2RlbC5nZXQoKS5ldmFsdWF0b3JzLnB1c2gobmV3RXZhbHVhdG9yKTtcbiAgICAgIH0sXG4gICAgICBub3RlYm9va01vZGVsR2V0SW5pdGlhbGl6YXRpb25DZWxsczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfbm90ZWJvb2tNb2RlbC5nZXQoKS5pbml0aWFsaXplQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm90ZWJvb2tDZWxsT3AoKS5nZXRBbGxDb2RlQ2VsbHMoXCJyb290XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldE5vdGVib29rQ2VsbE9wKCkuZ2V0SW5pdGlhbGl6YXRpb25DZWxscygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGJrTm90ZWJvb2tDZWxsTW9kZWxNYW5hZ2VyLnVuZG8oKTtcbiAgICAgIH0sXG4gICAgICByZWRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYmtOb3RlYm9va0NlbGxNb2RlbE1hbmFnZXIucmVkbygpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rXG4gKiBUaGlzIGlzIHRoZSAnbm90ZWJvb2sgdmlldycgcGFydCBvZiB7QGxpbmsgYmtBcHB9LiBXaGF0IGlzIHRoZSByb290IGNlbGwgaG9sZGluZyB0aGUgbmVzdGVkXG4gKiB7QGxpbmsgYmtDZWxsfXMuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snLCBbXG4gICAgJ2JrLmNvbW1vblVpJyxcbiAgICAnYmsudXRpbHMnLFxuICAgICdiay5vdXRwdXRMb2cnLFxuICAgICdiay5jb3JlJyxcbiAgICAnYmsuc2Vzc2lvbk1hbmFnZXInLFxuICAgICdiay5ldmFsdWF0b3JNYW5hZ2VyJyxcbiAgICAnYmsuY2VsbE1lbnVQbHVnaW5NYW5hZ2VyJyxcbiAgICAnYmsub3V0cHV0RGlzcGxheSdcbiAgXSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBia0NlbGxcbiAqIC0gdGhlIGNvbnRyb2xsZXIgdGhhdCByZXNwb25zaWJsZSBmb3IgZGlyZWN0bHkgY2hhbmdpbmcgdGhlIHZpZXdcbiAqIC0gdGhlIGNvbnRhaW5lciBmb3Igc3BlY2lmaWMgdHlwZWQgY2VsbFxuICogLSB0aGUgZGlyZWN0aXZlIGlzIGRlc2lnbmVkIHRvIGJlIGNhcGFibGUgb2YgdXNlZCBpbiBhIG5lc3RlZCB3YXlcbiAqIC0gY29uY2VwdHVhbGx5LCBhIGNlbGwgaXMgJ2NlbGwgbW9kZWwnICsgJ3ZpZXcgbW9kZWwnKGFuIGV4YW1wbGUgb2Ygd2hhdCBnb2VzIGluIHRvIHRoZSB2aWV3XG4gKiBtb2RlbCBpcyBjb2RlIGNlbGwgYmcgY29sb3IpXG4gKiAtIEEgYmtDZWxsIGlzIGdlbmVyaWNhbGx5IGNvcnJlc3BvbmRzIHRvIGEgcG9ydGlvbiBvZiB0aGUgbm90ZWJvb2sgbW9kZWwgKGN1cnJlbnRseSwgaXQgaXNcbiAqIGFsd2F5cyBhIGJyYW5jaCBpbiB0aGUgaGllcmFyY2h5KVxuICogLSBXaGVuIGV4cG9ydGluZyAoYS5rLmEuIHNoYXJpbmcpLCB3ZSB3aWxsIG5lZWQgYm90aCB0aGUgY2VsbCBtb2RlbCBhbmQgdGhlIHZpZXcgbW9kZWxcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ2VsbCcsIGZ1bmN0aW9uKGJrVXRpbHMsIGJrU2Vzc2lvbk1hbmFnZXIsIGJrQ29yZU1hbmFnZXIsIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NlbGwnXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY2VsbG1vZGVsOiAnPScsXG4gICAgICAgIGluZGV4OiAnPSdcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yUmVhZGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGdldEJrQmFzZVZpZXdNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpLmdldFZpZXdNb2RlbCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gbm90ZWJvb2tDZWxsT3AuaXNMYXN0KCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9LCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgICRzY29wZS5pc0xhcmdlID0gbmV3VmFsO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcgPSB7XG4gICAgICAgICAgc2hvd0RlYnVnSW5mbzogZmFsc2UsXG4gICAgICAgICAgbWVudToge1xuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgcmVuYW1lSXRlbTogZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgICBfLmZpbmRXaGVyZSh0aGlzLml0ZW1zLFxuICAgICAgICAgICAgICAgIHtuYW1lOiBvcHRzLm5hbWV9XG4gICAgICAgICAgICAgICkubmFtZSA9IG9wdHMubmV3TmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRJdGVtOiBmdW5jdGlvbihtZW51SXRlbSkge1xuICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobWVudUl0ZW0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0hlYWQ6IGZ1bmN0aW9uKG1lbnVJdGVtKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKDAsIDAsIG1lbnVJdGVtKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtOiBmdW5jdGlvbihpdGVtTmFtZSkge1xuICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YoXy5maW5kKHRoaXMuaXRlbXMsIGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0Lm5hbWUgPT09IGl0ZW1OYW1lO1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTG9ja2VkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5uZXdDZWxsTWVudUNvbmZpZyA9IHtcbiAgICAgICAgICBpc1Nob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICFia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKSAmJiAhbm90ZWJvb2tDZWxsT3AuaXNDb250YWluZXIoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRhY2hDZWxsOiBmdW5jdGlvbihuZXdDZWxsKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5pbnNlcnRBZnRlcigkc2NvcGUuY2VsbG1vZGVsLmlkLCBuZXdDZWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZDZWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS4kcGFyZW50LmdldE5lc3RlZExldmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuZ2V0RnVsbEluZGV4KCkgKyAnLicgKyAoJHNjb3BlLmluZGV4ICsgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICRzY29wZS5pbmRleCArICRzY29wZS5nZXROZXN0ZWRMZXZlbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTaG93RGVidWdJbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm8gPSAhJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm87XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc1Nob3dEZWJ1Z0luZm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGx2aWV3LnNob3dEZWJ1Z0luZm87XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5pc0RlYnVnZ2luZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBnZXRCa0Jhc2VWaWV3TW9kZWwoKS5pc0RlYnVnZ2luZygpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0TmVzdGVkTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBia0NlbGwgaXMgdXNpbmcgaXNvbGF0ZWQgc2NvcGUsICRzY29wZSBpcyB0aGUgaXNvbGF0ZWQgc2NvcGVcbiAgICAgICAgICAvLyAkc2NvcGUuJHBhcmVudCBpcyB0aGUgc2NvcGUgcmVzdWx0ZWQgZnJvbSBuZy1yZXBlYXQgKG5nLXJlcGVhdCBjcmVhdGVzIGEgcHJvdG90eXBhbFxuICAgICAgICAgIC8vIHNjb3BlIGZvciBlYWNoIG5nLXJlcGVhdGVkIGl0ZW0pXG4gICAgICAgICAgLy8gJFNjb3BlLiRwYXJlbnQuJHBhcmVudCBpcyB0aGUgY29udGFpbmVyIGNlbGwod2hpY2ggaW5pdGlhdGVzIG5nLXJlcGVhdCkgc2NvcGVcbiAgICAgICAgICB2YXIgcGFyZW50ID0gJHNjb3BlLiRwYXJlbnQuJHBhcmVudDtcbiAgICAgICAgICByZXR1cm4gcGFyZW50LmdldE5lc3RlZExldmVsID8gcGFyZW50LmdldE5lc3RlZExldmVsKCkgKyAxIDogMTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFBhcmVudElkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LiRwYXJlbnQuY2VsbG1vZGVsID8gJHNjb3BlLiRwYXJlbnQuJHBhcmVudC5jZWxsbW9kZWwuaWQgOiAncm9vdCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZUNlbGxJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbikge1xuICAgICAgICAgICAgZGVsZXRlICRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5zdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpXG4gICAgICAgICAgICAuZXZhbHVhdGVSb290KCRzY29wZS5jZWxsbW9kZWwpXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlbGV0ZUNlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcC5kZWxldGUoJHNjb3BlLmNlbGxtb2RlbC5pZCwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3IoJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtb3ZlTWV0aG9kID0gJ21vdmUnO1xuICAgICAgICBpZiAoJHNjb3BlLmNlbGxtb2RlbC50eXBlID09ICdzZWN0aW9uJykge1xuICAgICAgICAgIG1vdmVNZXRob2QgPSAnbW92ZVNlY3Rpb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsVXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlYm9va0NlbGxPcFttb3ZlTWV0aG9kICsgJ1VwJ10oJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm1vdmVDZWxsRG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wW21vdmVNZXRob2QgKyAnRG93biddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbFVwRGlzYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gIW5vdGVib29rQ2VsbE9wWydpc1Bvc3NpYmxlVG8nICsgXy5zdHJpbmcuY2FwaXRhbGl6ZShtb3ZlTWV0aG9kKSArICdVcCddKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5tb3ZlQ2VsbERvd25EaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhbm90ZWJvb2tDZWxsT3BbJ2lzUG9zc2libGVUbycgKyBfLnN0cmluZy5jYXBpdGFsaXplKG1vdmVNZXRob2QpICsgJ0Rvd24nXSgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnRGVsZXRlIGNlbGwnLFxuICAgICAgICAgIGFjdGlvbjogJHNjb3BlLmRlbGV0ZUNlbGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ01vdmUgdXAnLFxuICAgICAgICAgIGFjdGlvbjogJHNjb3BlLm1vdmVDZWxsVXAsXG4gICAgICAgICAgZGlzYWJsZWQ6ICRzY29wZS5tb3ZlQ2VsbFVwRGlzYWJsZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ01vdmUgZG93bicsXG4gICAgICAgICAgYWN0aW9uOiAkc2NvcGUubW92ZUNlbGxEb3duLFxuICAgICAgICAgIGRpc2FibGVkOiAkc2NvcGUubW92ZUNlbGxEb3duRGlzYWJsZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogJ0N1dCcsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmN1dCgkc2NvcGUuY2VsbG1vZGVsLmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdQYXN0ZSAoYXBwZW5kIGFmdGVyKScsXG4gICAgICAgICAgZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICFub3RlYm9va0NlbGxPcC5jbGlwYm9hcmQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucGFzdGUoJHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0VHlwZUNlbGxVcmwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdHlwZSA9ICRzY29wZS5jZWxsbW9kZWwudHlwZTtcbiAgICAgICAgICByZXR1cm4gdHlwZSArICctY2VsbC5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNDb2RlQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLnR5cGUgPT0gJ2NvZGUnO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29kZUNlbGwnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia0NlbGxNZW51UGx1Z2luTWFuYWdlcixcbiAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgJHRpbWVvdXQpIHtcblxuICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfTtcbiAgICB2YXIgQ0VMTF9UWVBFID0gJ2NvZGUnO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsJ10oKSxcbiAgICAgIHNjb3BlOiB7Y2VsbG1vZGVsOiAnPScsIGNlbGxtZW51OiAnPSd9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5jZWxsdmlldyA9IHtcbiAgICAgICAgICBpbnB1dE1lbnU6IFtdLFxuICAgICAgICAgIGRpc3BsYXlzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRGdWxsSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LmdldEZ1bGxJbmRleCgpICsgJy4nICsgKCRzY29wZS4kcGFyZW50LmluZGV4ICsgMSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTG9ja2VkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc0VtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEoJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vanNjczpkaXNhYmxlXG4gICAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwgPT09IHVuZGVmaW5lZCB8fCAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dCA9PT0gdW5kZWZpbmVkIHx8ICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL2pzY3M6ZW5hYmxlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHR5cGUgPSAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQuaW5uZXJ0eXBlO1xuXG4gICAgICAgICAgaWYgKCF0eXBlICYmICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdC5wYXlsb2FkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHR5cGUgPSAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQucGF5bG9hZC5pbm5lcnR5cGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHR5cGUgPT0gJ0Vycm9yJztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNTaG93SW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmlzTG9ja2VkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ia05vdGVib29rID0gZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgICAgICAvLyBlbnN1cmUgY20gcmVmcmVzaGVzIHdoZW4gJ3VuaGlkZSdcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnaXNTaG93SW5wdXQoKScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmICgkc2NvcGUuY20gJiYgbmV3VmFsdWUgPT09IHRydWUgJiYgbmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBia1V0aWxzLmZjYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkc2NvcGUuY20ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuaXNIaWRkZW5PdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuc2VsZWN0ZWRUeXBlID09ICdIaWRkZW4nO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5oYXNPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQucmVzdWx0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmJhY2tncm91bmRDbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCEkc2NvcGUuaXNTaG93SW5wdXQoKSB8fCAkKGV2ZW50LnRvRWxlbWVudCkucGFyZW50cygpLmhhc0NsYXNzKCdjb2RlLWNlbGwtb3V0cHV0JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHRvcCA9ICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICB2YXIgb3V0cHV0RWxlbWVudCA9ICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpLmNoaWxkcmVuKCcuY29kZS1jZWxsLW91dHB1dDpmaXJzdCcpO1xuICAgICAgICAgIHZhciBib3R0b207XG4gICAgICAgICAgaWYgKG91dHB1dEVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYm90dG9tID0gb3V0cHV0RWxlbWVudC5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IHRvcCArICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpLmhlaWdodCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBFdmVuIGJldHRlciB3b3VsZCBiZSB0byBkZXRlY3QgbGVmdC9yaWdodCBhbmQgbW92ZSB0b1xuICAgICAgICAgIC8vIGJlZ2lubmluZyBvciBlbmQgb2YgbGluZSwgYnV0IHdlIGNhbiBsaXZlIHdpdGggdGhpcyBmb3Igbm93LlxuICAgICAgICAgIHZhciBjbSA9ICRzY29wZS5jbTtcbiAgICAgICAgICBpZiAoZXZlbnQucGFnZVkgPCAodG9wICsgYm90dG9tKSAvIDIpIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcigwLCAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmxpbmVDb3VudCgpIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbS5nZXRMaW5lKGNtLmxhc3RMaW5lKCkpLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzU2hvd091dHB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHJlc3VsdCA9ICRzY29wZS5jZWxsbW9kZWwub3V0cHV0LnJlc3VsdDtcbiAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5oaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICEocmVzdWx0ID09PSB1bmRlZmluZWQgfHwgcmVzdWx0ID09PSBudWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUub3V0cHV0VGl0bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLmlzRXJyb3IoKSA/ICdFcnJvcicgOiBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIGlmICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5zdGF0ZSA9IHt9O1xuICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5ldmFsdWF0ZVJvb3QoJHNjb3BlLmNlbGxtb2RlbCkuXG4gICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXZhbHVhdGlvbiBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBlZGl0ZWRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pZCcsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmV2YWx1YXRvcicsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uJywgZWRpdGVkTGlzdGVuZXIpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaW5wdXQuYm9keScsIGVkaXRlZExpc3RlbmVyKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLm91dHB1dC5yZXN1bHQnLCBlZGl0ZWRMaXN0ZW5lcik7XG5cbiAgICAgICAgJHNjb3BlLmF1dG9jb21wbGV0ZSA9IGZ1bmN0aW9uKGNwb3MsIG9uUmVzdWx0cykge1xuICAgICAgICAgIHZhciBldmFsdWF0b3IgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0RXZhbHVhdG9yKCRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yKTtcbiAgICAgICAgICBpZiAoIWV2YWx1YXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXZhbHVhdG9yLmF1dG9jb21wbGV0ZSkge1xuICAgICAgICAgICAgZXZhbHVhdG9yLmF1dG9jb21wbGV0ZSgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmJvZHksIGNwb3MsIG9uUmVzdWx0cyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmFsdWF0b3IuYXV0b2NvbXBsZXRlMikge1xuICAgICAgICAgICAgLy8gdXNlZCBieSBKYXZhU2NyaXB0IGV2YWx1YXRvclxuICAgICAgICAgICAgZXZhbHVhdG9yLmF1dG9jb21wbGV0ZTIoJHNjb3BlLmNtLCBudWxsLCBvblJlc3VsdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0RXZhbHVhdG9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRFdmFsdWF0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEV2YWx1YXRvcigkc2NvcGUuY2VsbG1vZGVsLmV2YWx1YXRvcik7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS51cGRhdGVVSSA9IGZ1bmN0aW9uKGV2YWx1YXRvcikge1xuICAgICAgICAgIGlmICgkc2NvcGUuY20gJiYgZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAkc2NvcGUuY20uc2V0T3B0aW9uKCdtb2RlJywgZXZhbHVhdG9yLmNtTW9kZSk7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5ldmFsdWF0b3JSZWFkZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdnZXRFdmFsdWF0b3IoKScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICRzY29wZS51cGRhdGVVSShuZXdWYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuYXBwZW5kQ29kZUNlbGwgPSBmdW5jdGlvbihldmFsdWF0b3JOYW1lKSB7XG4gICAgICAgICAgdmFyIHRoaXNDZWxsSWQgPSAkc2NvcGUuY2VsbG1vZGVsLmlkO1xuICAgICAgICAgIGlmICghZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgICAgLy8gaWYgbm8gZXZhbHVhdG9yIHNwZWNpZmllZCwgdXNlIHRoZSBjdXJyZW50IGV2YWx1YXRvclxuICAgICAgICAgICAgZXZhbHVhdG9yTmFtZSA9ICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tOZXdDZWxsRmFjdG9yeSgpLm5ld0NvZGVDZWxsKGV2YWx1YXRvck5hbWUpO1xuICAgICAgICAgIG5vdGVib29rQ2VsbE9wLmFwcGVuZEFmdGVyKHRoaXNDZWxsSWQsIG5ld0NlbGwpO1xuICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVNZW51UGx1Z2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihDRUxMX1RZUEUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hhcmVNZW51ID0ge1xuICAgICAgICAgIG5hbWU6ICdTaGFyZScsXG4gICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHNoYXJlTWVudSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2dldFNoYXJlTWVudVBsdWdpbigpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcmVNZW51Lml0ZW1zID0gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudUl0ZW1zKENFTExfVFlQRSwgJHNjb3BlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmNlbGxtZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdTaG93IGlucHV0IGNlbGwnLFxuICAgICAgICAgIGlzQ2hlY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gISRzY29wZS5jZWxsbW9kZWwuaW5wdXQuaGlkZGVuO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbikge1xuICAgICAgICAgICAgICBkZWxldGUgJHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmNlbGxtZW51LmFkZEl0ZW0oe1xuICAgICAgICAgIG5hbWU6ICdTaG93IG91dHB1dCBjZWxsIChpZiBhdmFpbGFibGUpJyxcbiAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW47XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbikge1xuICAgICAgICAgICAgICBkZWxldGUgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnSW5pdGlhbGl6YXRpb24gQ2VsbCcsXG4gICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmlzSW5pdGlhbGl6YXRpb25DZWxsKCkpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsbWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiAnT3B0aW9ucycsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuc2hvd0Z1bGxNb2RhbERpYWxvZyhmdW5jdGlvbiBjYihyKSB7IH0gLFxuICAgICAgICAgICAgICAgICdhcHAvbWFpbmFwcC9kaWFsb2dzL2NvZGVjZWxsb3B0aW9ucy5qc3QuaHRtbCcsICdDb2RlQ2VsbE9wdGlvbnNDb250cm9sbGVyJywgJHNjb3BlLmNlbGxtb2RlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBzY29wZS5zaG93RGVidWcgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBpc0Z1bGxTY3JlZW4oY20pIHtcbiAgICAgICAgICByZXR1cm4gL1xcYkNvZGVNaXJyb3ItZnVsbHNjcmVlblxcYi8udGVzdChjbS5nZXRXcmFwcGVyRWxlbWVudCgpLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3aW5IZWlnaHQoKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkpLmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldEZ1bGxTY3JlZW4oY20sIGZ1bGwpIHtcbiAgICAgICAgICB2YXIgd3JhcCA9IGNtLmdldFdyYXBwZXJFbGVtZW50KCk7XG4gICAgICAgICAgaWYgKGZ1bGwpIHtcbiAgICAgICAgICAgIHdyYXAuY2xhc3NOYW1lICs9ICcgQ29kZU1pcnJvci1mdWxsc2NyZWVuJztcbiAgICAgICAgICAgIHdyYXAuc3R5bGUuaGVpZ2h0ID0gd2luSGVpZ2h0KCkgKyAncHgnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdyYXAuY2xhc3NOYW1lID0gd3JhcC5jbGFzc05hbWUucmVwbGFjZSgnIENvZGVNaXJyb3ItZnVsbHNjcmVlbicsICcnKTtcbiAgICAgICAgICAgIHdyYXAuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgICAgY20ucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXNpemVIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHNob3dpbmcgPSBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0NvZGVNaXJyb3ItZnVsbHNjcmVlbicpWzBdO1xuICAgICAgICAgIGlmICghc2hvd2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93aW5nLkNvZGVNaXJyb3IuZ2V0V3JhcHBlckVsZW1lbnQoKS5zdHlsZS5oZWlnaHQgPSB3aW5IZWlnaHQoKSArICdweCc7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY20uZm9jdXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29kZU1pcnJvci5vbih3aW5kb3csICdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcblxuICAgICAgICB2YXIgY29kZU1pcnJvck9wdGlvbnMgPSBia0NvcmVNYW5hZ2VyLmNvZGVNaXJyb3JPcHRpb25zKHNjb3BlLCBub3RlYm9va0NlbGxPcCk7XG4gICAgICAgIF8uZXh0ZW5kKGNvZGVNaXJyb3JPcHRpb25zLmV4dHJhS2V5cywge1xuICAgICAgICAgICdFc2MnIDogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIGNtLmV4ZWNDb21tYW5kKCdzaW5nbGVTZWxlY3Rpb24nKTtcbiAgICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0gJiYgY20uc3RhdGUudmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGlzRnVsbFNjcmVlbihjbSkpIHtcbiAgICAgICAgICAgICAgICBzZXRGdWxsU2NyZWVuKGNtLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdBbHQtRjExJzogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIHNldEZ1bGxTY3JlZW4oY20sICFpc0Z1bGxTY3JlZW4oY20pKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DdHJsLUEnOiBmdW5jdGlvbihjbSkge1xuICAgICAgICAgICAgc2NvcGUuYXBwZW5kQ29kZUNlbGwoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdTaGlmdC1DbWQtQSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzY29wZS5hcHBlbmRDb2RlQ2VsbCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1NoaWZ0LUN0cmwtRSc6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgICAgICBzY29wZS5wb3B1cE1lbnUoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLmlucHV0Y2VsbG1lbnUnKS5maW5kKCdsaScpLmZpbmQoJ2EnKVswXS5mb2N1cygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1NoaWZ0LUNtZC1FJzogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgICAgIHNjb3BlLnBvcHVwTWVudSgpO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcuaW5wdXRjZWxsbWVudScpLmZpbmQoJ2xpJykuZmluZCgnYScpWzBdLmZvY3VzKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQ3RybC1BbHQtSCc6IGZ1bmN0aW9uKGNtKSB7IC8vIGNlbGwgaGlkZVxuICAgICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmlucHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdDbWQtQWx0LUgnOiBmdW5jdGlvbihjbSkgeyAvLyBjZWxsIGhpZGVcbiAgICAgICAgICAgIHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgYmtVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBTY3JvbGxpbi50cmFjayhlbGVtZW50WzBdLCB7aGFuZGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY20gPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShlbGVtZW50LmZpbmQoJ3RleHRhcmVhJylbMF0sIGNvZGVNaXJyb3JPcHRpb25zKTtcbiAgICAgICAgICBzY29wZS5ia05vdGVib29rLnJlZ2lzdGVyQ00oc2NvcGUuY2VsbG1vZGVsLmlkLCBzY29wZS5jbSk7XG4gICAgICAgICAgc2NvcGUuY20ub24oJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgIHNjb3BlLnVwZGF0ZVVJKHNjb3BlLmdldEV2YWx1YXRvcigpKTtcbiAgICAgICAgfX0pO1xuXG4gICAgICAgIHNjb3BlLmJrTm90ZWJvb2sucmVnaXN0ZXJGb2N1c2FibGUoc2NvcGUuY2VsbG1vZGVsLmlkLCBzY29wZSk7XG5cbiAgICAgICAgLy8gY2VsbG1vZGVsLmJvZHkgLS0+IENvZGVNaXJyb3JcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwuaW5wdXQuYm9keScsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLmNtICYmIG5ld1ZhbCAhPT0gc2NvcGUuY20uZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBuZXdWYWwgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjb3BlLmNtLnNldFZhbHVlKG5ld1ZhbCk7XG4gICAgICAgICAgICBzY29wZS5jbS5jbGVhckhpc3RvcnkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBjZWxsbW9kZWwuYm9keSA8LS0gQ29kZU1pcnJvclxuICAgICAgICB2YXIgY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKGNtLCBlKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLmNlbGxtb2RlbC5pbnB1dC5ib2R5ICE9PSBjbS5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICBzY29wZS5jZWxsbW9kZWwubGluZUNvdW50ID0gY20ubGluZUNvdW50KCk7XG4gICAgICAgICAgICBzY29wZS5jZWxsbW9kZWwuaW5wdXQuYm9keSA9IGNtLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAoIWJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va01vZGVsRWRpdGVkKCkpIHtcbiAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgICAgICBia1V0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGlucHV0TWVudURpdiA9IGVsZW1lbnQuZmluZCgnLmJrY2VsbCcpLmZpcnN0KCk7XG4gICAgICAgIHNjb3BlLnBvcHVwTWVudSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIG1lbnUgPSBpbnB1dE1lbnVEaXYuZmluZCgnLmRyb3Bkb3duJykuZmlyc3QoKTtcbiAgICAgICAgICBtZW51LmZpbmQoJy5kcm9wZG93bi10b2dnbGUnKS5maXJzdCgpLmRyb3Bkb3duKCd0b2dnbGUnKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKSkge1xuICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmJrY2VsbCcpLmFkZENsYXNzKCdpbml0Y2VsbCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmJrY2VsbCcpLnJlbW92ZUNsYXNzKCdpbml0Y2VsbCcpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnaXNJbml0aWFsaXphdGlvbkNlbGwoKScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5ia2NlbGwnKS5hZGRDbGFzcygnaW5pdGNlbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmJrY2VsbCcpLnJlbW92ZUNsYXNzKCdpbml0Y2VsbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuZ2V0U2hhcmVEYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGV2YWx1YXRvciA9IF8oYmtTZXNzaW9uTWFuYWdlci5nZXRSYXdOb3RlYm9va01vZGVsKCkuZXZhbHVhdG9ycylcbiAgICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24oZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRvci5uYW1lID09PSBzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgY2VsbHMgPSBbc2NvcGUuY2VsbG1vZGVsXTtcbiAgICAgICAgICByZXR1cm4gYmtVdGlscy5nZW5lcmF0ZU5vdGVib29rKFtldmFsdWF0b3JdLCBjZWxscyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuJG9uKCdiZWFrZXIuY2VsbC5hZGRlZCcsIGZ1bmN0aW9uKGUsIGNlbGxtb2RlbCkge1xuICAgICAgICAgIGlmIChjZWxsbW9kZWwgPT09IHNjb3BlLmNlbGxtb2RlbCkge1xuICAgICAgICAgICAgc2NvcGUuY20gJiYgc2NvcGUuY20uZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLiRvbignYmVha2VyLnNlY3Rpb24udG9nZ2xlZCcsIGZ1bmN0aW9uKGUsIGlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgaWYgKCFpc0NvbGxhcHNlZCkge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNjb3BlLmNtLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIFNjcm9sbGluLnVudHJhY2soZWxlbWVudFswXSk7XG4gICAgICAgICAgQ29kZU1pcnJvci5vZmYod2luZG93LCAncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG4gICAgICAgICAgQ29kZU1pcnJvci5vZmYoJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgIHNjb3BlLmJrTm90ZWJvb2sudW5yZWdpc3RlckZvY3VzYWJsZShzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICAgIHNjb3BlLmJrTm90ZWJvb2sudW5yZWdpc3RlckNNKHNjb3BlLmNlbGxtb2RlbC5pZCk7XG4gICAgICAgICAgc2NvcGUuYmtOb3RlYm9vayA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGhvbGRzIHRoZSBsb2dpYyBmb3IgY29kZSBjZWxsLCB3aGljaCBpcyBhIHR5cGVkIHtAbGluayBia0NlbGx9LlxuICogVGhlIGNvZGUgY2VsbCBjb250YWlucyBhbiBpbnB1dCBjZWxsIGFuIG91dHB1dCBjZWxsICh7QGxpbmsgYmtDb2RlQ2VsbE91dHB1dH0pIGFuZCBjZWxsIG1lbnVzLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29kZUNlbGxJbnB1dE1lbnUnLCBmdW5jdGlvbihia0NvcmVNYW5hZ2VyKSB7XG4gICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZ2V0QmtOb3RlYm9va1dpZGdldCgpO1xuICAgIH0gO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL2NvZGVjZWxsaW5wdXRtZW51J10oKSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZ2V0SXRlbUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Ryb3Bkb3duLXN1Ym1lbnUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRTdWJtZW51SXRlbUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Rpc2FibGVkLWxpbmsnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRTaG93RXZhbEljb24gPSBmdW5jdGlvbihldmFsdWF0b3JOYW1lKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yID09PSBldmFsdWF0b3JOYW1lO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc2V0RXZhbHVhdG9yID0gZnVuY3Rpb24oZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgIHZhciBjZWxsSWQgPSAkc2NvcGUuY2VsbG1vZGVsLmlkO1xuICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwuZXZhbHVhdG9yID0gZXZhbHVhdG9yTmFtZTtcbiAgICAgICAgICBnZXRCa05vdGVib29rV2lkZ2V0KCkuZ2V0Rm9jdXNhYmxlKGNlbGxJZCkuZm9jdXMoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgdGhlIGFic3RyYWN0IGNvbnRhaW5lciBmb3IgdHlwZXMgb2Ygb3V0cHV0IGRpc3BsYXlzLiBXaGlsZSB3ZSBwbGFuIHRvIG1ha2UgdGhlIG91dHB1dCBkaXNwbGF5IGxvYWRpbmdcbiAqIG1lY2hhbmlzbSBtb3JlIHBsdWdnYWJsZSwgcmlnaHQgbm93LCB0aGlzIG1vZHVsZSBzZXJ2ZXMgYXMgdGhlIHJlZ2lzdHJhdGlvbiBvdXRwdXQgZGlzcGxheSB0eXBlcyBhbmQgaG9sZHMgdGhlIGxvZ2ljXG4gKiBmb3Igc3dpdGNoIGJldHdlZW4gYXBwbGljYWJsZSBvdXRwdXQgZGlzcGxheSB0aHJvdWdoIFVJLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29kZUNlbGxPdXRwdXQnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsIGJrT3V0cHV0RGlzcGxheUZhY3RvcnksIGJrRXZhbHVhdG9yTWFuYWdlciwgYmtFdmFsdWF0ZUpvYk1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbG91dHB1dFwiXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgbW9kZWw6IFwiPVwiLFxuICAgICAgICBldmFsdWF0b3JJZDogXCJAXCIsXG4gICAgICAgIGNlbGxJZDogXCJAXCJcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgdmFyIF9zaGFyZU1lbnVJdGVtcyA9IFtdO1xuXG4gICAgICAgICRzY29wZS5nZXRPdXRwdXRSZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsLnJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5zdWJzY3JpYmVkVG8pIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUubW9kZWwucGx1Z2luTmFtZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdLnVuc3Vic2NyaWJlKCRzY29wZS5zdWJzY3JpYmVkVG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxJZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYmtFdmFsdWF0ZUpvYk1hbmFnZXIuZGVSZWdpc3Rlck91dHB1dENlbGwoJHNjb3BlLmNlbGxJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzID0gW107XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2dldE91dHB1dFJlc3VsdCgpJywgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5zdWJzY3JpYmVkVG8gJiYgJHNjb3BlLnN1YnNjcmliZWRUbyAhPT0gcmVzdWx0LnVwZGF0ZV9pZCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5tb2RlbC5wbHVnaW5OYW1lICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2UgJiYgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0pIHtcbiAgICAgICAgICAgICAgd2luZG93Lmxhbmd1YWdlVXBkYXRlU2VydmljZVskc2NvcGUubW9kZWwucGx1Z2luTmFtZV0udW5zdWJzY3JpYmUoJHNjb3BlLnN1YnNjcmliZWRUbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuc3Vic2NyaWJlZFRvID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEkc2NvcGUuc3Vic2NyaWJlZFRvICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdC51cGRhdGVfaWQpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUubW9kZWwucGx1Z2luTmFtZSAmJiB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlICYmIHdpbmRvdy5sYW5ndWFnZVVwZGF0ZVNlcnZpY2VbJHNjb3BlLm1vZGVsLnBsdWdpbk5hbWVdKSB7XG4gICAgICAgICAgICAgIHZhciBvblVwZGF0YWJsZVJlc3VsdFVwZGF0ZSA9IGZ1bmN0aW9uKHVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbC5yZXN1bHQgPSB1cGRhdGU7XG4gICAgICAgICAgICAgICAgYmtIZWxwZXIucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB3aW5kb3cubGFuZ3VhZ2VVcGRhdGVTZXJ2aWNlWyRzY29wZS5tb2RlbC5wbHVnaW5OYW1lXS5zdWJzY3JpYmUocmVzdWx0LnVwZGF0ZV9pZCwgb25VcGRhdGFibGVSZXN1bHRVcGRhdGUpO1xuICAgICAgICAgICAgICAkc2NvcGUuc3Vic2NyaWJlZFRvID0gcmVzdWx0LnVwZGF0ZV9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0LnR5cGUgPT09IFwiVXBkYXRhYmxlRXZhbHVhdGlvblJlc3VsdFwiKVxuICAgICAgICAgICAgJHNjb3BlLmFwcGxpY2FibGVEaXNwbGF5cyA9IGJrT3V0cHV0RGlzcGxheUZhY3RvcnkuZ2V0QXBwbGljYWJsZURpc3BsYXlzKHJlc3VsdC5wYXlsb2FkKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAkc2NvcGUuYXBwbGljYWJsZURpc3BsYXlzID0gYmtPdXRwdXREaXNwbGF5RmFjdG9yeS5nZXRBcHBsaWNhYmxlRGlzcGxheXMocmVzdWx0KTtcbiAgICAgICAgICAkc2NvcGUubW9kZWwuc2VsZWN0ZWRUeXBlID0gJHNjb3BlLmFwcGxpY2FibGVEaXNwbGF5c1swXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdG8gYmUgdXNlZCBpbiBia091dHB1dERpc3BsYXlcbiAgICAgICAgJHNjb3BlLm91dHB1dERpc3BsYXlNb2RlbCA9IHtcbiAgICAgICAgICBnZXRDZWxsTW9kZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRzY29wZS5nZXRPdXRwdXRSZXN1bHQoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgPT09IFwiQmVha2VyRGlzcGxheVwiKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQub2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgPT09IFwiVXBkYXRhYmxlRXZhbHVhdGlvblJlc3VsdFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5wYXlsb2FkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldER1bXBTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJHNjb3BlLm1vZGVsLnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldER1bXBTdGF0ZTogZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnN0YXRlID0gcztcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc2V0U2hhcmVNZW51SXRlbXM6IGZ1bmN0aW9uKG5ld0l0ZW1zKSB7XG4gICAgICAgICAgICBfc2hhcmVNZW51SXRlbXMgPSBuZXdJdGVtcztcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldENvbWV0ZFV0aWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlkID0gJHNjb3BlLmdldEV2YWx1YXRvcklkKCk7ICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgdmFyIGV2YWx1YXRvciA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRFdmFsdWF0b3IoaWQpO1xuICAgICAgICAgICAgICBpZiAoZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRvci5jb21ldGRVdGlsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRFdmFsdWF0b3JJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAkc2NvcGU7XG4gICAgICAgICAgICB3aGlsZSAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAoaWQuZXZhbHVhdG9ySWQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQuZXZhbHVhdG9ySWQ7XG4gICAgICAgICAgICAgIGlkID0gaWQuJHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXRPdXRwdXREaXNwbGF5VHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUubW9kZWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgcmV0dXJuIFwiVGV4dFwiO1xuICAgICAgICAgIHZhciB0eXBlID0gJHNjb3BlLm1vZGVsLnNlbGVjdGVkVHlwZTtcbiAgICAgICAgICAvLyBpZiBCZWFrZXJEaXNwbGF5IG9yIFVwZGF0YWJsZUV2YWx1YXRpb25SZXN1bHQsIHVzZSB0aGUgaW5uZXIgdHlwZSBpbnN0ZWFkXG4gICAgICAgICAgaWYgKHR5cGUgPT09IFwiQmVha2VyRGlzcGxheVwiKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJHNjb3BlLmdldE91dHB1dFJlc3VsdCgpO1xuICAgICAgICAgICAgdHlwZSA9IHJlc3VsdCA/IHJlc3VsdC5pbm5lcnR5cGUgOiBcIkhpZGRlblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ2V0RWxhcHNlZFRpbWVTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLm1vZGVsLmVsYXBzZWRUaW1lIHx8ICRzY29wZS5tb2RlbC5lbGFwc2VkVGltZSA9PT0gMCkge1xuICAgICAgICAgICAgdmFyIGVsYXBzZWRUaW1lID0gJHNjb3BlLm1vZGVsLmVsYXBzZWRUaW1lO1xuICAgICAgICAgICAgcmV0dXJuIFwiRWxhcHNlZCB0aW1lOiBcIiArIGJrVXRpbHMuZm9ybWF0VGltZVN0cmluZyhlbGFwc2VkVGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5pc1Nob3dPdXRwdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiAkc2NvcGUuJHBhcmVudC5pc1Nob3dPdXRwdXQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuJHBhcmVudC5pc1Nob3dPdXRwdXQoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNTaG93TWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudCAhPT0gdW5kZWZpbmVkICYmICRzY29wZS4kcGFyZW50LmlzU2hvd01lbnUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuJHBhcmVudC5pc1Nob3dNZW51KCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZUV4cGFuc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwgIT09IHVuZGVmaW5lZCAmJiAkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbikge1xuICAgICAgICAgICAgICBkZWxldGUgJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dC5oaWRkZW47XG4gICAgICAgICAgICAgICRzY29wZS4kYnJvYWRjYXN0KCdleHBhbmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzY29wZS4kcGFyZW50LmNlbGxtb2RlbC5vdXRwdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzRXhwYW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsICE9PSB1bmRlZmluZWQgJiYgJHNjb3BlLiRwYXJlbnQuY2VsbG1vZGVsLm91dHB1dCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuICEkc2NvcGUuJHBhcmVudC5jZWxsbW9kZWwub3V0cHV0LmhpZGRlbjtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0byBiZSB1c2VkIGluIG91dHB1dCBjZWxsIG1lbnVcbiAgICAgICAgJHNjb3BlLm91dHB1dENlbGxNZW51TW9kZWwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIF9hZGRpdGlvbmFsTWVudUl0ZW1zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIlNoYXJlXCIsXG4gICAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3NoYXJlTWVudUl0ZW1zO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIlRvZ2dsZSBDZWxsIE91dHB1dFwiLFxuICAgICAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc0V4cGFuZGVkKCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRvZ2dsZUV4cGFuc2lvbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5tb2RlbC5yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGdldEVsYXBzZWRUaW1lU3RyaW5nLFxuICAgICAgICAgICAgICBhY3Rpb246IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRBcHBsaWNhYmxlRGlzcGxheXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmFwcGxpY2FibGVEaXNwbGF5cztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWxlY3RlZERpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsLnNlbGVjdGVkVHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRTZWxlY3RlZERpc3BsYXk6IGZ1bmN0aW9uKGRpc3BsYXkpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnNlbGVjdGVkVHlwZSA9IGRpc3BsYXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QWRkaXRpb25hbE1lbnVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYWRkaXRpb25hbE1lbnVJdGVtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLm91dHB1dFJlZnJlc2hlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghKCRzY29wZS4kJHBoYXNlIHx8ICRzY29wZS4kcm9vdC4kJHBoYXNlKSlcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAkc2NvcGUuY2VsbElkICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgIGJrRXZhbHVhdGVKb2JNYW5hZ2VyLnJlZ2lzdGVyT3V0cHV0Q2VsbCgkc2NvcGUuY2VsbElkLCAkc2NvcGUpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrQ29kZUNlbGxPdXRwdXRNZW51JywgZnVuY3Rpb24oYmtVdGlscykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9jb2RlY2VsbG91dHB1dG1lbnVcIl0oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIG1vZGVsOiAnPSdcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmdldEl0ZW1OYW1lID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlbS5uYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldEl0ZW1DbGFzcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgaWYgKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBzdWJJdGVtcyA9ICRzY29wZS5nZXRTdWJJdGVtcyhpdGVtKTtcbiAgICAgICAgICAgIGlmIChzdWJJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwiZHJvcGRvd24tc3VibWVudVwiKTtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJkcm9wLWxlZnRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChcImRpc3BsYXktbm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5nZXRJdGVtTmFtZShpdGVtKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJkaXNwbGF5LW5vbmVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbihcIiBcIik7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRTdWJtZW51SXRlbUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJkaXNhYmxlZC1saW5rXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0U3ViSXRlbXMgPSBmdW5jdGlvbihwYXJlbnRJdGVtKSB7XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihwYXJlbnRJdGVtLml0ZW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudEl0ZW0uaXRlbXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHBhcmVudEl0ZW0uaXRlbXM7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNSBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBPdmVycmlkZSBtYXJrZG93biBsaW5rIHJlbmRlcmVyIHRvIGFsd2F5cyBoYXZlIGB0YXJnZXQ9XCJfYmxhbmtcImBcbiAgLy8gTW9zdGx5IGZyb20gUmVuZGVyZXIucHJvdG90eXBlLmxpbmtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkL2Jsb2IvbWFzdGVyL2xpYi9tYXJrZWQuanMjTDg2Mi1MODgxXG4gIHZhciBia1JlbmRlcmVyID0gbmV3IG1hcmtlZC5SZW5kZXJlcigpO1xuICBia1JlbmRlcmVyLmxpbmsgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICAgIHZhciBwcm90O1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb3QgPSBkZWNvZGVVUklDb21wb25lbnQodW5lc2NhcGUoaHJlZikpXG4gICAgICAgIC5yZXBsYWNlKC9bXlxcdzpdL2csICcnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgLy9qc2hpbnQgaWdub3JlOnN0YXJ0XG4gICAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDApIHtcbiAgICAgICAgLy9qc2hpbnQgaWdub3JlOmVuZFxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgb3V0ID0gJzxhIGhyZWY9XCInICsgaHJlZiArICdcIic7XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gICAgfVxuICAgIG91dCArPSAnIHRhcmdldD1cIl9ibGFua1wiJzsgLy8gPCBBRERFRCBUSElTIExJTkUgT05MWVxuICAgIG91dCArPSAnPicgKyB0ZXh0ICsgJzwvYT4nO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBia1JlbmRlcmVyLnBhcmFncmFwaCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAvLyBBbGxvdyB1c2VycyB0byB3cml0ZSBcXCQgdG8gZXNjYXBlICRcbiAgICByZXR1cm4gbWFya2VkLlJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGguY2FsbCh0aGlzLCB0ZXh0LnJlcGxhY2UoL1xcXFxcXCQvZywgJyQnKSk7XG4gIH07XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia01hcmtkb3duRWRpdGFibGUnLCBbJ2JrU2Vzc2lvbk1hbmFnZXInLCAnYmtIZWxwZXInLCAnYmtDb3JlTWFuYWdlcicsICckdGltZW91dCcsIGZ1bmN0aW9uKGJrU2Vzc2lvbk1hbmFnZXIsIGJrSGVscGVyLCBia0NvcmVNYW5hZ2VyLCAkdGltZW91dCkge1xuICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICB2YXIgZ2V0QmtOb3RlYm9va1dpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5nZXRCa05vdGVib29rV2lkZ2V0KCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbWFya2Rvd24tZWRpdGFibGVcIl0oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNlbGxtb2RlbDogJz0nXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBjb250ZW50QXR0cmlidXRlID0gc2NvcGUuY2VsbG1vZGVsLnR5cGUgPT09IFwic2VjdGlvblwiID8gJ3RpdGxlJyA6ICdib2R5JztcblxuICAgICAgICB2YXIgcHJldmlldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBtYXJrZG93bkZyYWdtZW50ID0gJCgnPGRpdj4nICsgc2NvcGUuY2VsbG1vZGVsW2NvbnRlbnRBdHRyaWJ1dGVdICsgJzwvZGl2PicpO1xuICAgICAgICAgIHJlbmRlck1hdGhJbkVsZW1lbnQobWFya2Rvd25GcmFnbWVudFswXSwge1xuICAgICAgICAgICAgZGVsaW1pdGVyczogW1xuICAgICAgICAgICAgICB7bGVmdDogXCIkJFwiLCByaWdodDogXCIkJFwiLCBkaXNwbGF5OiB0cnVlfSxcbiAgICAgICAgICAgICAge2xlZnQ6IFwiJFwiLCByaWdodDogIFwiJFwiLCBkaXNwbGF5OiBmYWxzZX0sXG4gICAgICAgICAgICAgIHtsZWZ0OiBcIlxcXFxbXCIsIHJpZ2h0OiBcIlxcXFxdXCIsIGRpc3BsYXk6IHRydWV9LFxuICAgICAgICAgICAgICB7bGVmdDogXCJcXFxcKFwiLCByaWdodDogXCJcXFxcKVwiLCBkaXNwbGF5OiBmYWxzZX1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbGVtZW50LmZpbmQoJy5tYXJrdXAnKS5odG1sKG1hcmtlZChtYXJrZG93bkZyYWdtZW50Lmh0bWwoKSwge2dmbTogdHJ1ZSwgcmVuZGVyZXI6IGJrUmVuZGVyZXJ9KSk7XG4gICAgICAgICAgbWFya2Rvd25GcmFnbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICBzY29wZS5tb2RlID0gJ3ByZXZpZXcnO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzeW5jQ29udGVudEFuZFByZXZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5jZWxsbW9kZWxbY29udGVudEF0dHJpYnV0ZV0gPSBzY29wZS5jbS5nZXRWYWx1ZSgpO1xuICAgICAgICAgIHByZXZpZXcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuZXZhbHVhdGUgPSBzeW5jQ29udGVudEFuZFByZXZpZXc7XG5cbiAgICAgICAgc2NvcGUuYmtOb3RlYm9vayA9IGdldEJrTm90ZWJvb2tXaWRnZXQoKTtcblxuICAgICAgICBzY29wZS5mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLmVkaXQoKTtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS5lZGl0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpIHx8IHt9O1xuICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGlzIHNlbGVjdGluZyBzb21lIHRleHQsIGRvIG5vdCBlbnRlciB0aGUgZWRpdCBtYXJrZG93biBtb2RlXG4gICAgICAgICAgaWYgKHNlbGVjdGlvbi50eXBlID09IFwiUmFuZ2VcIiAmJiAkLmNvbnRhaW5zKGVsZW1lbnRbMF0sIHNlbGVjdGlvbi5mb2N1c05vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChia0hlbHBlci5pc05vdGVib29rTG9ja2VkKCkpIHJldHVybjtcbiAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiQVwiKSByZXR1cm47IC8vIERvbid0IGVkaXQgaWYgY2xpY2tpbmcgYSBsaW5rXG5cbiAgICAgICAgICBzY29wZS5tb2RlID0gJ2VkaXQnO1xuXG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgY29udGVudCBvZiBtYXJrdXAgd2hlbiB0b2dnbGluZyB0byBlZGl0IG1vZGUgdG8gcHJldmVudFxuICAgICAgICAgICAgLy8gZmxhc2ggd2hlbiB0b2dnbGluZyBiYWNrIHRvIHByZXZpZXcgbW9kZS5cbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLm1hcmt1cCcpLmh0bWwoJycpO1xuXG4gICAgICAgICAgICB2YXIgY20gPSBzY29wZS5jbTtcbiAgICAgICAgICAgIGNtLnNldFZhbHVlKHNjb3BlLmNlbGxtb2RlbFtjb250ZW50QXR0cmlidXRlXSk7XG4gICAgICAgICAgICBjbS5jbGVhckhpc3RvcnkoKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHZhciBjbGlja0xvY2F0aW9uO1xuICAgICAgICAgICAgICB2YXIgd3JhcHBlciA9ICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpO1xuICAgICAgICAgICAgICB2YXIgdG9wID0gd3JhcHBlci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgIHZhciBib3R0b20gPSB0b3AgKyB3cmFwcGVyLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgIGlmIChldmVudCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50LnBhZ2VZIDwgKHRvcCArIGJvdHRvbSkgLyAyKSB7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKDAsIDApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjbS5saW5lQ291bnQoKSAtIDEsIGNtLmdldExpbmUoY20ubGFzdExpbmUoKSkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjb2RlTWlycm9yT3B0aW9ucyA9IF8uZXh0ZW5kKGJrQ29yZU1hbmFnZXIuY29kZU1pcnJvck9wdGlvbnMoc2NvcGUsIG5vdGVib29rQ2VsbE9wKSwge1xuICAgICAgICAgIGxpbmVOdW1iZXJzOiBmYWxzZSxcbiAgICAgICAgICBtb2RlOiBcIm1hcmtkb3duXCIsXG4gICAgICAgICAgc21hcnRJbmRlbnQ6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLmNtID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZWxlbWVudC5maW5kKFwidGV4dGFyZWFcIilbMF0sIGNvZGVNaXJyb3JPcHRpb25zKTtcblxuICAgICAgICBzY29wZS5ia05vdGVib29rLnJlZ2lzdGVyRm9jdXNhYmxlKHNjb3BlLmNlbGxtb2RlbC5pZCwgc2NvcGUpO1xuICAgICAgICBzY29wZS5ia05vdGVib29rLnJlZ2lzdGVyQ00oc2NvcGUuY2VsbG1vZGVsLmlkLCBzY29wZS5jbSk7XG5cbiAgICAgICAgc2NvcGUuY20uc2V0VmFsdWUoc2NvcGUuY2VsbG1vZGVsW2NvbnRlbnRBdHRyaWJ1dGVdKTtcbiAgICAgICAgcHJldmlldygpO1xuXG4gICAgICAgIHNjb3BlLmNtLm9uKFwiYmx1clwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN5bmNDb250ZW50QW5kUHJldmlldygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS4kb24oJ2JlYWtlci5jZWxsLmFkZGVkJywgZnVuY3Rpb24oZSwgY2VsbG1vZGVsKSB7XG4gICAgICAgICAgaWYgKGNlbGxtb2RlbCA9PT0gc2NvcGUuY2VsbG1vZGVsKSBzY29wZS5lZGl0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2VsbG1vZGVsLmJvZHknLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgIT09IG9sZFZhbCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtNYXJrZG93bkNlbGwnLCBbXG4gICAgICAnYmtTZXNzaW9uTWFuYWdlcicsXG4gICAgICAnYmtIZWxwZXInLFxuICAgICAgJ2JrQ29yZU1hbmFnZXInLFxuICAgICAgJyR0aW1lb3V0JywgZnVuY3Rpb24oXG4gICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIsXG4gICAgICAgIGJrSGVscGVyLFxuICAgICAgICBia0NvcmVNYW5hZ2VyLFxuICAgICAgICAkdGltZW91dCkge1xuXG4gICAgICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICAgICAgdmFyIGdldEJrTm90ZWJvb2tXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgdGVtcGxhdGU6IEpTVFsnbWFpbmFwcC9jb21wb25lbnRzL25vdGVib29rL21hcmtkb3duY2VsbCddKCksXG4gICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuJHBhcmVudC4kcGFyZW50LiRwYXJlbnQuZ2V0RnVsbEluZGV4KCkgKyAnLicgKyAoJHNjb3BlLiRwYXJlbnQuaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfV0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia05ld0NlbGxNZW51JywgZnVuY3Rpb24oXG4gICAgICBia1V0aWxzLCBia1Nlc3Npb25NYW5hZ2VyLCBia0V2YWx1YXRvck1hbmFnZXIpIHtcbiAgICB2YXIgY2VsbE9wcyA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbmV3Y2VsbG1lbnVcIl0oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNvbmZpZzogJz0nLFxuICAgICAgICBpc0xhcmdlOiAnPScsXG4gICAgICAgIHBvc2l0aW9uOiAnQCdcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgdmFyIG5ld0NlbGxGYWN0b3J5ID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va05ld0NlbGxGYWN0b3J5KCk7XG4gICAgICAgIHZhciByZWNlbnRseUFkZGVkTGFuZ3VhZ2U7XG5cbiAgICAgICAgJHNjb3BlLmdldEV2YWx1YXRvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldEFsbEV2YWx1YXRvcnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxldmVscyA9IFsxLCAyLCAzLCA0XTtcbiAgICAgICAgJHNjb3BlLmdldExldmVscyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBsZXZlbHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLm5ld0NvZGVDZWxsID0gZnVuY3Rpb24oZXZhbHVhdG9yTmFtZSkge1xuICAgICAgICAgIHZhciBuZXdDZWxsID0gbmV3Q2VsbEZhY3RvcnkubmV3Q29kZUNlbGwoZXZhbHVhdG9yTmFtZSk7XG4gICAgICAgICAgYXR0YWNoQ2VsbChuZXdDZWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLnNob3dQbHVnaW5NYW5hZ2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmtIZWxwZXIuc2hvd0xhbmd1YWdlTWFuYWdlcigkc2NvcGUpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUubmV3TWFya2Rvd25DZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG5ld0NlbGwgPSBuZXdDZWxsRmFjdG9yeS5uZXdNYXJrZG93bkNlbGwoKTtcbiAgICAgICAgICBhdHRhY2hDZWxsKG5ld0NlbGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5uZXdTZWN0aW9uQ2VsbCA9IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgICAgICAgdmFyIG5ld0NlbGwgPSBuZXdDZWxsRmFjdG9yeS5uZXdTZWN0aW9uQ2VsbChsZXZlbCk7XG4gICAgICAgICAgYXR0YWNoQ2VsbChuZXdDZWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZGVmYXVsdEV2YWx1YXRvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGJ5IGRlZmF1bHQsIGluc2VydCBhIGNvZGUgY2VsbCAoYW5kIHVzZSB0aGUgYmVzdCBldmFsdWF0b3Igd2l0aCBiZXN0IGd1ZXNzKVxuICAgICAgICAgIC8vIElmIGEgcHJldiBjZWxsIGlzIGdpdmVuLCBmaXJzdCBzY2FuIHRvd2FyZCB0b3Agb2YgdGhlIG5vdGVib29rLCBhbmQgdXNlIHRoZSBldmFsdWF0b3JcbiAgICAgICAgICAvLyBvZiB0aGUgZmlyc3QgY29kZSBjZWxsIGZvdW5kLiBJZiBub3QgZm91bmQsIHNjYW4gdG93YXJkIGJvdHRvbSwgYW5kIHVzZSB0aGUgZXZhbHVhdG9yXG4gICAgICAgICAgLy8gb2YgdGhlIGZpcnN0IGNvZGUgY2VsbCBmb3VuZC5cbiAgICAgICAgICAvLyBJZiBhIHByZXYgY2VsbCBpcyBub3QgZ2l2ZW4sIHVzZSB0aGUgdmVyeSBsYXN0IGNvZGUgY2VsbCBpbiB0aGUgbm90ZWJvb2suXG4gICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gY29kZSBjZWxsIGluIHRoZSBub3RlYm9vaywgdXNlIHRoZSBmaXJzdCBldmFsdWF0b3IgaW4gdGhlIGxpc3RcbiAgICAgICAgICB2YXIgcHJldkNlbGwgPSAkc2NvcGUuY29uZmlnICYmICRzY29wZS5jb25maWcucHJldkNlbGwgJiYgJHNjb3BlLmNvbmZpZy5wcmV2Q2VsbCgpO1xuICAgICAgICAgIHZhciBjb2RlQ2VsbCA9IHJlY2VudGx5QWRkZWRMYW5ndWFnZVxuICAgICAgICAgICAgICB8fCAocHJldkNlbGwgJiYgY2VsbE9wcy5maW5kQ29kZUNlbGwocHJldkNlbGwuaWQpKVxuICAgICAgICAgICAgICB8fCAocHJldkNlbGwgJiYgY2VsbE9wcy5maW5kQ29kZUNlbGwocHJldkNlbGwuaWQsIHRydWUpKVxuICAgICAgICAgICAgICB8fCBnZXRMYXN0Q29kZUNlbGwoKTtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9yTmFtZSA9IGNvZGVDZWxsID9cbiAgICAgICAgICAgICAgY29kZUNlbGwuZXZhbHVhdG9yIDogXy5rZXlzKGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCkpWzBdO1xuXG4gICAgICAgICAgcmV0dXJuIGV2YWx1YXRvck5hbWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gYXR0YWNoQ2VsbChjZWxsKSB7XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgIGlmICgkc2NvcGUuY29uZmlnICYmICRzY29wZS5jb25maWcuYXR0YWNoQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5jb25maWcuYXR0YWNoQ2VsbChjZWxsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2VsbE9wcy5pbnNlcnRGaXJzdChjZWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGxhc3QgY29kZSBjZWxsIGluIHRoZSBub3RlYm9va1xuICAgICAgICB2YXIgZ2V0TGFzdENvZGVDZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF8ubGFzdChjZWxsT3BzLmdldEFsbENvZGVDZWxscygpKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJG9uKCdsYW5ndWFnZUFkZGVkJywgZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICByZWNlbnRseUFkZGVkTGFuZ3VhZ2UgPSBkYXRhO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuJG9uKCdjZWxsTWFwUmVjcmVhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVjZW50bHlBZGRlZExhbmd1YWdlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIGJrTm90ZWJvb2tcbiAqIC0gdGhlIGNvbnRyb2xsZXIgdGhhdCByZXNwb25zaWJsZSBmb3IgZGlyZWN0bHkgY2hhbmdpbmcgdGhlIHZpZXdcbiAqIC0gcm9vdCBjZWxsICsgZXZhbHVhdG9ycyArIG90aGVyIHN0dWZmcyBzcGVjaWZpYyB0byBvbmUgKHRoZSBsb2FkZWQpIG5vdGVib29rXG4gKiAtIHJvb3QgY2VsbCBpcyBqdXN0IGEgc3BlY2lhbCBjYXNlIG9mIGEgc2VjdGlvbiBjZWxsXG4gKiAtIFRPRE8sIHdlIGFyZSBtaXhpbmcgdGhlIGNvbmNlcHQgb2YgYSBub3RlYm9vayBhbmQgYSByb290IHNlY3Rpb24gaGVyZVxuICogd2Ugd2FudCB0byBzZXBhcmF0ZSBvdXQgdGhlIGxheW91dCBzcGVjaWZpYyBzdHVmZnMoaWRlYSBvZiBhIHNlY3Rpb24pIGZyb20gb3RoZXJcbiAqIHN0dWZmcyBsaWtlIGV2YWx1YXRvciBwYW5lbFxuICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrTm90ZWJvb2snLCBmdW5jdGlvbiAoXG4gICAgICBia1V0aWxzLFxuICAgICAgYmtFdmFsdWF0b3JNYW5hZ2VyLFxuICAgICAgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIsXG4gICAgICBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgIGJrT3V0cHV0TG9nKSB7XG4gICAgdmFyIENFTExfVFlQRSA9IFwibm90ZWJvb2tcIjtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvbm90ZWJvb2svbm90ZWJvb2tcIl0oKSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHNldEJrTm90ZWJvb2s6IFwiJlwiLFxuICAgICAgICBpc0xvYWRpbmc6IFwiPVwiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSkge1xuICAgICAgICB2YXIgbm90ZWJvb2tDZWxsT3AgPSBia1Nlc3Npb25NYW5hZ2VyLmdldE5vdGVib29rQ2VsbE9wKCk7XG4gICAgICAgIHZhciBfaW1wbCA9IHtcbiAgICAgICAgICBfdmlld01vZGVsOiB7XG4gICAgICAgICAgICBfZGVidWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIF9zaG93T3V0cHV0OiBmYWxzZSxcbiAgICAgICAgICAgIHRvZ2dsZVNob3dPdXRwdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGhpcy5fc2hvd091dHB1dCA9ICF0aGlzLl9zaG93T3V0cHV0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhpZGVPdXRwdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGhpcy5fc2hvd091dHB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2hvd2luZ091dHB1dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hvd091dHB1dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0xvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmlzTm90ZWJvb2tMb2NrZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVBZHZhbmNlZE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB0aGlzLl9hZHZhbmNlZE1vZGUgPSAhdGhpcy5fYWR2YW5jZWRNb2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQWR2YW5jZWRNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICEhKHRoaXMuX2FkdmFuY2VkTW9kZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNIaWVyYXJjaHlFbmFibGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICEhKHRoaXMuX2hpZXJhcmNoeUVuYWJsZWQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZUhpZXJhcmNoeUVuYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB0aGlzLl9oaWVyYXJjaHlFbmFibGVkID0gIXRoaXMuX2hpZXJhcmNoeUVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlRGVidWdnaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2RlYnVnZ2luZyA9ICF0aGlzLl9kZWJ1Z2dpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNEZWJ1Z2dpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlYnVnZ2luZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFZpZXdNb2RlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlbDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNoYXJlQW5kT3BlblB1Ymxpc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gVE9ETywgdGhpcyBpcyBhbiB1Z2x5IGhhY2suIE5lZWQgcmVmYWN0b3JpbmcuXG4gICAgICAgICAgICBzaGFyZU1lbnUuaXRlbXNbMF0uYWN0aW9uKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZWxldGVBbGxPdXRwdXRDZWxsczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpLmRlbGV0ZUFsbE91dHB1dENlbGxzKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfZm9jdXNhYmxlczoge30sIC8vIG1hcCBvZiBmb2N1c2FibGUoZS5nLiBjb2RlIG1pcnJvciBpbnN0YW5jZXMpIHdpdGggY2VsbCBpZCBiZWluZyBrZXlzXG4gICAgICAgICAgcmVnaXN0ZXJGb2N1c2FibGU6IGZ1bmN0aW9uIChjZWxsSWQsIGZvY3VzYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNhYmxlc1tjZWxsSWRdID0gZm9jdXNhYmxlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdW5yZWdpc3RlckZvY3VzYWJsZTogZnVuY3Rpb24gKGNlbGxJZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2ZvY3VzYWJsZXNbY2VsbElkXTtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzYWJsZXNbY2VsbElkXSA9IG51bGw7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRGb2N1c2FibGU6IGZ1bmN0aW9uIChjZWxsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb2N1c2FibGVzW2NlbGxJZF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfY29kZU1pcnJvcnM6IHt9LFxuICAgICAgICAgIHJlZ2lzdGVyQ006IGZ1bmN0aW9uIChjZWxsSWQsIGNtKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2RlTWlycm9yc1tjZWxsSWRdID0gY207XG4gICAgICAgICAgICBjbS5zZXRPcHRpb24oXCJrZXlNYXBcIiwgdGhpcy5fY21LZXlNYXBNb2RlKTtcbiAgICAgICAgICAgIGNtLnNldE9wdGlvbihcInZpbU1vZGVcIiwgdGhpcy5fY21LZXlNYXBNb2RlID09IFwidmltXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdW5yZWdpc3RlckNNOiBmdW5jdGlvbiAoY2VsbElkKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY29kZU1pcnJvcnNbY2VsbElkXTtcbiAgICAgICAgICAgIHRoaXMuX2NvZGVNaXJyb3JzW2NlbGxJZF0gPSBudWxsO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX2NtS2V5TWFwTW9kZTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgc2V0Q01LZXlNYXBNb2RlOiBmdW5jdGlvbiAoa2V5TWFwTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5fY21LZXlNYXBNb2RlID0ga2V5TWFwTW9kZTtcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLl9jb2RlTWlycm9ycywgZnVuY3Rpb24gKGNtKSB7XG4gICAgICAgICAgICAgIGNtLnNldE9wdGlvbihcImtleU1hcFwiLCBrZXlNYXBNb2RlKTtcbiAgICAgICAgICAgICAgY20uc2V0T3B0aW9uKFwidmltTW9kZVwiLCBrZXlNYXBNb2RlID09IFwidmltXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRDTUtleU1hcE1vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbUtleU1hcE1vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuc2V0QmtOb3RlYm9vayh7YmtOb3RlYm9vazogX2ltcGx9KTtcblxuICAgICAgICAkc2NvcGUuZ2V0RnVsbEluZGV4ID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjFcIiB9XG5cbiAgICAgICAgJHNjb3BlLmlzTG9ja2VkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF9pbXBsLl92aWV3TW9kZWwuaXNMb2NrZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5pc0RlYnVnZ2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX2ltcGwuX3ZpZXdNb2RlbC5pc0RlYnVnZ2luZygpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaXNTaG93aW5nT3V0cHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzU2hvd2luZ091dHB1dCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5zaG93RGVidWdUcmVlID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5nZXROb3RlYm9va01vZGVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBia1Nlc3Npb25NYW5hZ2VyLmdldFJhd05vdGVib29rTW9kZWwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNsZWFyT3V0cHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YXR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgdXJsOiBia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L291dHB1dGxvZy9jbGVhclwiKSxcbiAgICAgICAgICAgIGRhdGE6IHt9fSk7XG4gICAgICAgICAgJHNjb3BlLm91dHB1dExvZyA9IFtdO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuaGlkZU91dHB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfaW1wbC5fdmlld01vZGVsLmhpZGVPdXRwdXQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNBZHZhbmNlZE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9pbXBsLl92aWV3TW9kZWwuaXNBZHZhbmNlZE1vZGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNIaWVyYXJjaHlFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfaW1wbC5fdmlld01vZGVsLmlzSGllcmFyY2h5RW5hYmxlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5zaG93U3RkT3V0ID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLnNob3dTdGRFcnIgPSB0cnVlO1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTdGRPdXQgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCRldmVudCkgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgJHNjb3BlLnNob3dTdGRPdXQgPSAhJHNjb3BlLnNob3dTdGRPdXQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLnRvZ2dsZVN0ZEVyciA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICBpZiAoJGV2ZW50KSAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAkc2NvcGUuc2hvd1N0ZEVyciA9ICEkc2NvcGUuc2hvd1N0ZEVycjtcbiAgICAgICAgfTtcblxuICAgICAgICBia091dHB1dExvZy5nZXRMb2coZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICRzY29wZS5vdXRwdXRMb2cgPSByZXM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJrT3V0cHV0TG9nLnN1YnNjcmliZShmdW5jdGlvbiAocmVwbHkpIHtcbiAgICAgICAgICBpZiAoIV9pbXBsLl92aWV3TW9kZWwuaXNTaG93aW5nT3V0cHV0KCkpIHtcbiAgICAgICAgICAgIF9pbXBsLl92aWV3TW9kZWwudG9nZ2xlU2hvd091dHB1dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkc2NvcGUub3V0cHV0TG9nLnB1c2gocmVwbHkuZGF0YSk7XG4gICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgIC8vIFNjcm9sbCB0byBib3R0b20gc28gdGhpcyBvdXRwdXQgaXMgdmlzaWJsZS5cbiAgICAgICAgICAkLmVhY2goJCgnLm91dHB1dGxvZ2JveCcpLFxuICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoaSwgdikge1xuICAgICAgICAgICAgICAgICAgICQodikuc2Nyb2xsVG9wKHYuc2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbWFyZ2luID0gJChcIi5vdXRwdXRsb2dzdGRvdXRcIikucG9zaXRpb24oKS50b3A7XG4gICAgICAgIHZhciBvdXRwdXRMb2dIZWlnaHQgPSAzMDA7XG4gICAgICAgIHZhciBkcmFnSGVpZ2h0O1xuICAgICAgICB2YXIgZml4T3V0cHV0TG9nUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJChcIi5vdXRwdXRsb2djb250YWluZXJcIikuY3NzKFwidG9wXCIsIHdpbmRvdy5pbm5lckhlaWdodCAtIG91dHB1dExvZ0hlaWdodCk7XG4gICAgICAgICAgJChcIi5vdXRwdXRsb2djb250YWluZXJcIikuY3NzKFwiaGVpZ2h0XCIsIG91dHB1dExvZ0hlaWdodCk7XG4gICAgICAgICAgJChcIi5vdXRwdXRsb2dib3hcIikuY3NzKFwiaGVpZ2h0XCIsIG91dHB1dExvZ0hlaWdodCAtIG1hcmdpbiAtIDUpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUudW5yZWdpc3RlcnMgPSBbXTtcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmaXhPdXRwdXRMb2dQb3NpdGlvbik7XG4gICAgICAgICRzY29wZS51bnJlZ2lzdGVycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQod2luZG93KS5vZmYoXCJyZXNpemVcIiwgZml4T3V0cHV0TG9nUG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRyYWdTdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZHJhZ0hlaWdodCA9IG91dHB1dExvZ0hlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG91dHB1dGxvZ2hhbmRsZSA9ICQoXCIub3V0cHV0bG9naGFuZGxlXCIpO1xuICAgICAgICBvdXRwdXRsb2doYW5kbGUuZHJhZyhcInN0YXJ0XCIsIGRyYWdTdGFydEhhbmRsZXIpO1xuICAgICAgICAkc2NvcGUudW5yZWdpc3RlcnMucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBvdXRwdXRsb2doYW5kbGUub2ZmKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydEhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRyYWdIYW5kbGVyID0gZnVuY3Rpb24gKGV2LCBkZCkge1xuICAgICAgICAgIG91dHB1dExvZ0hlaWdodCA9IGRyYWdIZWlnaHQgLSBkZC5kZWx0YVk7XG4gICAgICAgICAgaWYgKG91dHB1dExvZ0hlaWdodCA8IDIwKSB7XG4gICAgICAgICAgICBvdXRwdXRMb2dIZWlnaHQgPSAyMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG91dHB1dExvZ0hlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCAtIDgwKSB7XG4gICAgICAgICAgICBvdXRwdXRMb2dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA4MDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZml4T3V0cHV0TG9nUG9zaXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgb3V0cHV0bG9naGFuZGxlLmRyYWcoZHJhZ0hhbmRsZXIpO1xuICAgICAgICAkc2NvcGUudW5yZWdpc3RlcnMucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBvdXRwdXRsb2doYW5kbGUub2ZmKFwiZHJhZ1wiLCBkcmFnSGFuZGxlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyB0aGlzIGlzIHRoZSByb290XG4gICAgICAgICAgcmV0dXJuIG5vdGVib29rQ2VsbE9wLmdldENoaWxkcmVuKFwicm9vdFwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggPT0gMDtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0U2hhcmVNZW51UGx1Z2luID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oQ0VMTF9UWVBFKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldFNoYXJlRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5nZXRSYXdOb3RlYm9va01vZGVsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzaGFyZU1lbnUgPSB7XG4gICAgICAgICAgbmFtZTogXCJTaGFyZVwiLFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0U2hhcmVNZW51UGx1Z2luKClcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcmVNZW51Lml0ZW1zID0gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudUl0ZW1zKENFTExfVFlQRSwgJHNjb3BlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmtTZXNzaW9uTWFuYWdlci5pc1Jvb3RDZWxsSW5pdGlhbGl6YXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm1lbnVJdGVtcyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIlJ1biBhbGxcIixcbiAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBia0NvcmVNYW5hZ2VyLmdldEJrQXBwKCkuZXZhbHVhdGVSb290KFwicm9vdFwiKS5cbiAgICAgICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiSW5pdGlhbGl6YXRpb24gQ2VsbFwiLFxuICAgICAgICAgICAgaXNDaGVja2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXRSb290Q2VsbEluaXRpYWxpemF0aW9uKCEkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKSk7XG4gICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaGFyZU1lbnVcbiAgICAgICAgXTtcblxuICAgICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC91dGlsL2lzVXNlQWR2YW5jZWRNb2RlXCIpKS5zdWNjZXNzKGZ1bmN0aW9uKGlzQWR2YW5jZWQpIHtcbiAgICAgICAgICBpZiAoX2ltcGwuX3ZpZXdNb2RlbC5pc0FkdmFuY2VkTW9kZSgpICE9IChpc0FkdmFuY2VkID09PSBcInRydWVcIikpIHtcbiAgICAgICAgICAgIF9pbXBsLl92aWV3TW9kZWwudG9nZ2xlQWR2YW5jZWRNb2RlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBkaXYgPSBlbGVtZW50LmZpbmQoXCIuYmtjZWxsXCIpLmZpcnN0KCk7XG4gICAgICAgIGRpdi5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAvL2NsaWNrIGluIHRoZSBib3JkZXIgb3IgcGFkZGluZyBzaG91bGQgdHJpZ2dlciBtZW51XG4gICAgICAgICAgaWYgKGJrVXRpbHMuZ2V0RXZlbnRPZmZzZXRYKGRpdiwgZXZlbnQpID49IGRpdi53aWR0aCgpKSB7XG4gICAgICAgICAgICB2YXIgbWVudSA9IGRpdi5maW5kKCcuYmtjZWxsbWVudScpLmxhc3QoKTtcbiAgICAgICAgICAgIG1lbnUuY3NzKFwidG9wXCIsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgbWVudS5jc3MoXCJsZWZ0XCIsIGV2ZW50LmNsaWVudFggLSAxNTApO1xuICAgICAgICAgICAgbWVudS5maW5kKCcuZHJvcGRvd24tdG9nZ2xlJykuZmlyc3QoKS5kcm9wZG93bigndG9nZ2xlJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKSkge1xuICAgICAgICAgIGRpdi5hZGRDbGFzcyhcImluaXRjZWxsXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpdi5yZW1vdmVDbGFzcyhcImluaXRjZWxsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLmdldE5vdGVib29rRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2lzSW5pdGlhbGl6YXRpb25DZWxsKCknLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIGRpdi5hZGRDbGFzcyhcImluaXRjZWxsXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGl2LnJlbW92ZUNsYXNzKFwiaW5pdGNlbGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuc2V0QmtOb3RlYm9vayh7YmtOb3RlYm9vazogdW5kZWZpbmVkfSk7XG4gICAgICAgICAgYmtPdXRwdXRMb2cudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBfKHNjb3BlLnVucmVnaXN0ZXJzKS5lYWNoKGZ1bmN0aW9uKHVucmVnaXN0ZXIpIHtcbiAgICAgICAgICAgIHVucmVnaXN0ZXIoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9vaycpO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrU2VjdGlvbkNlbGwnLCBmdW5jdGlvbihcbiAgICAgIGJrVXRpbHMsXG4gICAgICBia0V2YWx1YXRvck1hbmFnZXIsXG4gICAgICBia1Nlc3Npb25NYW5hZ2VyLFxuICAgICAgYmtDb3JlTWFuYWdlcixcbiAgICAgIGJrQ2VsbE1lbnVQbHVnaW5NYW5hZ2VyLFxuICAgICAgJHRpbWVvdXQpIHtcbiAgICB2YXIgQ0VMTF9UWVBFID0gXCJzZWN0aW9uXCI7XG4gICAgdmFyIG5vdGVib29rQ2VsbE9wID0gYmtTZXNzaW9uTWFuYWdlci5nZXROb3RlYm9va0NlbGxPcCgpO1xuICAgIHZhciBnZXRCa05vdGVib29rV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmdldEJrTm90ZWJvb2tXaWRnZXQoKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay9zZWN0aW9uY2VsbFwiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBub3RlYm9va0NlbGxPcCA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsT3AoKTtcblxuICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCA9ICRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkIHx8IGZhbHNlO1xuXG4gICAgICAgICRzY29wZS50b2dnbGVTaG93Q2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZCA9ICEkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZDtcbiAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdCgnYmVha2VyLnNlY3Rpb24udG9nZ2xlZCcsICRzY29wZS5jZWxsbW9kZWwuY29sbGFwc2VkKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmlzU2hvd0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICEkc2NvcGUuY2VsbG1vZGVsLmNvbGxhcHNlZDtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldENoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIG5vdGVib29rQ2VsbE9wLmdldENoaWxkcmVuKCRzY29wZS5jZWxsbW9kZWwuaWQpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUucmVzZXRUaXRsZSA9IGZ1bmN0aW9uKG5ld1RpdGxlKSB7XG4gICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC50aXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICAgIGJrVXRpbHMucmVmcmVzaFJvb3RTY29wZSgpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjZWxsbW9kZWwudGl0bGUnLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAgIGlmIChuZXdWYWwgIT09IG9sZFZhbCkge1xuICAgICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5zZXROb3RlYm9va01vZGVsRWRpdGVkKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5pbml0aWFsaXphdGlvbicsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XG4gICAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5yZW5hbWVJdGVtKHtcbiAgICAgICAgICBuYW1lOiBcIkRlbGV0ZSBjZWxsXCIsXG4gICAgICAgICAgbmV3TmFtZTogXCJEZWxldGUgaGVhZGluZyBhbmQga2VlcCBjb250ZW50c1wiXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5jZWxsdmlldy5tZW51LmFkZEl0ZW1Ub0hlYWQoe1xuICAgICAgICAgIG5hbWU6IFwiRGVsZXRlIHNlY3Rpb24gYW5kIGFsbCBzdWItc2VjdGlvbnNcIixcbiAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AuZGVsZXRlU2VjdGlvbigkc2NvcGUuY2VsbG1vZGVsLmlkLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiBcIkNoYW5nZSBIZWFkZXIgTGV2ZWxcIixcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkgxXCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5sZXZlbCA9IDE7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJIMlwiLFxuICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jZWxsbW9kZWwubGV2ZWwgPSAyO1xuICAgICAgICAgICAgICAgIG5vdGVib29rQ2VsbE9wLnJlc2V0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiSDNcIixcbiAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmxldmVsID0gMztcbiAgICAgICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkg0XCIsXG4gICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5sZXZlbCA9IDQ7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2tDZWxsT3AucmVzZXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5nZXRTaGFyZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2VsbHMgPSBbJHNjb3BlLmNlbGxtb2RlbF1cbiAgICAgICAgICAgICAgLmNvbmNhdChub3RlYm9va0NlbGxPcC5nZXRBbGxEZXNjZW5kYW50cygkc2NvcGUuY2VsbG1vZGVsLmlkKSk7XG4gICAgICAgICAgdmFyIHVzZWRFdmFsdWF0b3JzTmFtZXMgPSBfKGNlbGxzKS5jaGFpbigpXG4gICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjZWxsLnR5cGUgPT09IFwiY29kZVwiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNlbGwuZXZhbHVhdG9yO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudW5pcXVlKCkudmFsdWUoKTtcbiAgICAgICAgICB2YXIgZXZhbHVhdG9ycyA9IGJrU2Vzc2lvbk1hbmFnZXIuZ2V0UmF3Tm90ZWJvb2tNb2RlbCgpLmV2YWx1YXRvcnNcbiAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uYW55KHVzZWRFdmFsdWF0b3JzTmFtZXMsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRvci5uYW1lID09PSBldjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGJrVXRpbHMuZ2VuZXJhdGVOb3RlYm9vayhldmFsdWF0b3JzLCBjZWxscyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldFNoYXJlTWVudVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oQ0VMTF9UWVBFKTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgbmFtZTogXCJSdW4gYWxsXCIsXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0QmtBcHAoKS5ldmFsdWF0ZVJvb3QoJHNjb3BlLmNlbGxtb2RlbC5pZCkuXG4gICAgICAgICAgICAgICAgY2F0Y2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2hhcmVNZW51ID0ge1xuICAgICAgICAgIG5hbWU6IFwiU2hhcmVcIixcbiAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmNlbGx2aWV3Lm1lbnUuYWRkSXRlbShzaGFyZU1lbnUpO1xuICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0U2hhcmVNZW51UGx1Z2luKClcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcmVNZW51Lml0ZW1zID0gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0TWVudUl0ZW1zKENFTExfVFlQRSwgJHNjb3BlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2VsbHZpZXcubWVudS5hZGRJdGVtKHtcbiAgICAgICAgICBuYW1lOiBcIkluaXRpYWxpemF0aW9uIENlbGxcIixcbiAgICAgICAgICBpc0NoZWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5pc0luaXRpYWxpemF0aW9uQ2VsbCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNJbml0aWFsaXphdGlvbkNlbGwoKSkge1xuICAgICAgICAgICAgICAkc2NvcGUuY2VsbG1vZGVsLmluaXRpYWxpemF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNlbGxtb2RlbC5pbml0aWFsaXphdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5yZXNldCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5uZXdDZWxsTWVudUNvbmZpZyA9IHtcbiAgICAgICAgICBpc1Nob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGJrU2Vzc2lvbk1hbmFnZXIuaXNOb3RlYm9va0xvY2tlZCgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhJHNjb3BlLmNlbGxtb2RlbC5oaWRlVGl0bGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRhY2hDZWxsOiBmdW5jdGlvbihuZXdDZWxsKSB7XG4gICAgICAgICAgICBub3RlYm9va0NlbGxPcC5pbnNlcnRBZnRlcigkc2NvcGUuY2VsbG1vZGVsLmlkLCBuZXdDZWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZDZWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY2VsbG1vZGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsubm90ZWJvb2snKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia1RleHRDZWxsJywgZnVuY3Rpb24oYmtTZXNzaW9uTWFuYWdlcikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFtcIm1haW5hcHAvY29tcG9uZW50cy9ub3RlYm9vay90ZXh0Y2VsbFwiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5nZXRGdWxsSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJHNjb3BlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LmdldEZ1bGxJbmRleCgpICsgXCIuXCIgKyAoJHNjb3BlLiRwYXJlbnQuaW5kZXggKyAxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaXNFZGl0YWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiAhYmtIZWxwZXIuaXNOb3RlYm9va0xvY2tlZCgpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgdGV4dGJveCA9ICQoZWxlbWVudC5maW5kKFwiLmVkaXRhYmxlLXRleHRcIikuZmlyc3QoKSk7XG4gICAgICAgIGVsZW1lbnQuZmluZCgnLmVkaXRhYmxlLXRleHQnKS5odG1sKHNjb3BlLmNlbGxtb2RlbC5ib2R5KTtcbiAgICAgICAgdGV4dGJveC5iaW5kKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUuY2VsbG1vZGVsLmJvZHkgPSB0ZXh0Ym94Lmh0bWwoKS50cmltKCk7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS5lZGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGV4dGJveC5mb2N1cygpO1xuICAgICAgICB9O1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2NlbGxtb2RlbC5ib2R5JywgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIuc2V0Tm90ZWJvb2tNb2RlbEVkaXRlZCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oJ2JlYWtlci5jZWxsLmFkZGVkJywgZnVuY3Rpb24oZSwgY2VsbG1vZGVsKSB7XG4gICAgICAgICAgaWYgKGNlbGxtb2RlbCA9PT0gc2NvcGUuY2VsbG1vZGVsKSBzY29wZS5lZGl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyB0aGUgY2VudHJhbCBjb250cm9sIG9mIGFsbCBvdXRwdXQgZGlzcGxheXMuIEl0IGZ1bGZpbGxzIGFjdHVhbCBhbmd1bGFyIGRpcmVjdGl2ZXNcbiAqIGxhemlseSB3aGVuIHVzZXIgbG9hZCBvdXRwdXQgZGlzcGxheSBwbHVnaW5zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dERpc3BsYXknLCBbJ2JrLnV0aWxzJywgICduZ0FuaW1hdGUnLCAnbmdUb3VjaCddKTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dERpc3BsYXknKTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtPdXRwdXREaXNwbGF5JywgZnVuY3Rpb24oXG4gICAgICAkY29tcGlsZSwgYmtPdXRwdXREaXNwbGF5RmFjdG9yeSwgYmtVdGlscykge1xuICAgIHZhciBnZXRSZXN1bHRUeXBlID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5nZXRDZWxsTW9kZWwoKSkge1xuICAgICAgICBpZiAoXy5pc1N0cmluZyhtb2RlbC5nZXRDZWxsTW9kZWwoKSkpIHtcbiAgICAgICAgICByZXR1cm4gXCJTdHJpbmdcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbW9kZWwuZ2V0Q2VsbE1vZGVsKCkudHlwZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgIHRlbXBsYXRlOiBcIjxkaXY+T1VUUFVUPC9kaXY+XCIsXG4gICAgICBzY29wZToge1xuICAgICAgICB0eXBlOiBcIkBcIixcbiAgICAgICAgbW9kZWw6IFwiPVwiIC8vIGFzc3VtZSByZWYgdG8gbW9kZWwgZG9lc24ndCBjaGFuZ2UgYWZ0ZXIgZGlyZWN0aXZlIGlzIGNyZWF0ZWRcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGNoaWxkU2NvcGUgPSBudWxsO1xuICAgICAgICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICBpZiAoY2hpbGRTY29wZSkge1xuICAgICAgICAgICAgY2hpbGRTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZFNjb3BlID0gc2NvcGUuJG5ldygpO1xuICAgICAgICAgIGNoaWxkU2NvcGUubW9kZWwgPSBzY29wZS5tb2RlbDtcbiAgICAgICAgICB2YXIgcmVzdWx0VHlwZSA9IGdldFJlc3VsdFR5cGUoc2NvcGUubW9kZWwpO1xuICAgICAgICAgIGlmIChyZXN1bHRUeXBlKSB7XG4gICAgICAgICAgICBia1V0aWxzLmxvZyhcIm91dHB1dERpc3BsYXlcIiwge1xuICAgICAgICAgICAgICByZXN1bHRUeXBlOiByZXN1bHRUeXBlLFxuICAgICAgICAgICAgICBkaXNwbGF5VHlwZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkaXJlY3RpdmVOYW1lID0gYmtPdXRwdXREaXNwbGF5RmFjdG9yeS5nZXREaXJlY3RpdmVOYW1lKHR5cGUpO1xuICAgICAgICAgIGVsZW1lbnQuaHRtbChcIjxkaXYgXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgbW9kZWw9J21vZGVsJz48L2Rpdj5cIik7XG4gICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShjaGlsZFNjb3BlKTtcbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKFwidHlwZVwiLCBmdW5jdGlvbihuZXdUeXBlLCBvbGRUeXBlKSB7XG4gICAgICAgICAgcmVmcmVzaChuZXdUeXBlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLiRvbihcIm91dHB1dERpc3BsYXlGYWN0b3J5VXBkYXRlZFwiLCBmdW5jdGlvbihldmVudCwgd2hhdCkge1xuICAgICAgICAgIGlmICh3aGF0ID09PSBcImFsbFwiIHx8IHdoYXQgPT09IHNjb3BlLnR5cGUpIHtcbiAgICAgICAgICAgIHJlZnJlc2goc2NvcGUudHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChjaGlsZFNjb3BlKSB7XG4gICAgICAgICAgICBjaGlsZFNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBjZW50cmFsIGNvbnRyb2wgb2YgYWxsIG91dHB1dCBkaXNwbGF5cy4gSXQgZnVsZmlsbHMgYWN0dWFsIGFuZ3VsYXIgZGlyZWN0aXZlc1xuICogbGF6aWx5IHdoZW4gdXNlciBsb2FkIG91dHB1dCBkaXNwbGF5IHBsdWdpbnMuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBNQVhfQ0FQQUNJVFkgPSAxMDA7XG5cbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXREaXNwbGF5Jyk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoXCJia091dHB1dERpc3BsYXlGYWN0b3J5XCIsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY2UpIHtcblxuICAgIHZhciBpbXBscyA9IHtcbiAgICAgICAgXCJUZXh0XCI6IHtcbiAgICAgICAgICB0ZW1wbGF0ZTogXCI8cHJlPnt7Z2V0VGV4dCgpfX08L3ByZT5cIixcbiAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBtb2RlbCA9ICRzY29wZS5tb2RlbC5nZXRDZWxsTW9kZWwoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChtb2RlbCAmJiBtb2RlbC50ZXh0KSA/IG1vZGVsLnRleHQgOiBtb2RlbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIkRhdGVcIjoge1xuICAgICAgICAgIHRlbXBsYXRlOiBcIjxwcmU+e3tnZXREYXRlKCl9fTwvcHJlPlwiLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLmdldERhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIG1vZGVsID0gJHNjb3BlLm1vZGVsLmdldENlbGxNb2RlbCgpO1xuICAgICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwudGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBtb21lbnQobW9kZWwudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbS5mb3JtYXQoXCJZWVlZTU1ERCBISDptbTpzcy5TU1MgWlpcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBcIldhcm5pbmdcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdvdXRsaW5lIHdhcm5pbmcnPjwvZGl2PiA8cHJlIGNsYXNzPSdvdXRfd2FybmluZyc+e3ttb2RlbC5nZXRDZWxsTW9kZWwoKS5tZXNzYWdlfX08L3ByZT5cIlxuICAgICAgfSxcbiAgICAgIFwiRXJyb3JcIjoge1xuICAgICAgICB0ZW1wbGF0ZTogXCI8cHJlIGNsYXNzPSdvdXRfZXJyb3InPlwiICtcbiAgICAgICAgICAgIFwiPHNwYW4gbmctc2hvdz0nY2FuRXhwYW5kJyBjbGFzcz0ndG9nZ2xlLWVycm9yJyBuZy1jbGljaz0nZXhwYW5kZWQgPSAhZXhwYW5kZWQnPnt7ZXhwYW5kZWQgPyAnLScgOiAnKyd9fTwvc3Bhbj5cIiArXG4gICAgICAgICAgICBcIjxzcGFuIG5nLWJpbmQtaHRtbD0nc2hvcnRFcnJvcic+PC9zcGFuPjwvcHJlPlwiICtcbiAgICAgICAgICAgIFwiPHByZSBuZy1zaG93PSdleHBhbmRlZCc+PHNwYW4gbmctYmluZC1odG1sPSdsb25nRXJyb3InPjwvc3Bhbj5cIiArXG4gICAgICAgICAgICBcIjwvcHJlPlwiLFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgICAgJHNjb3BlLmV4cGFuZGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdtb2RlbC5nZXRDZWxsTW9kZWwoKScsIGZ1bmN0aW9uKGNlbGxNb2RlbCkge1xuICAgICAgICAgICAgdmFyIG91dHB1dHMgPSAkZWxlbWVudC5maW5kKCdzcGFuJyk7XG4gICAgICAgICAgICB2YXIgZXJyb3JzICA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQoY2VsbE1vZGVsKTtcblxuICAgICAgICAgICAgJHNjb3BlLnNob3J0RXJyb3IgICA9ICRzY2UudHJ1c3RBc0h0bWwoZXJyb3JzWzBdKTtcbiAgICAgICAgICAgICRzY29wZS5jYW5FeHBhbmQgICAgPSBlcnJvcnMubGVuZ3RoID4gMTtcbiAgICAgICAgICAgICRzY29wZS5sb25nRXJyb3IgICAgPSAkc2NlLnRydXN0QXNIdG1sKGVycm9ycy5zbGljZSgxKS5qb2luKFwiXFxuXCIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiSHRtbFwiOiB7XG4gICAgICAgIHRlbXBsYXRlOiBcIjxkaXY+PC9kaXY+XCIsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIpIHtcbiAgICAgICAgICAkc2NvcGUuZ2V0U2hhcmVNZW51UGx1Z2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gYmtDZWxsTWVudVBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKFwiYmtvLWh0bWxcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0U2hhcmVNZW51UGx1Z2luKClcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbmV3SXRlbXMgPSBia0NlbGxNZW51UGx1Z2luTWFuYWdlci5nZXRNZW51SXRlbXMoXCJia28taHRtbFwiLCAkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsLnJlc2V0U2hhcmVNZW51SXRlbXMobmV3SXRlbXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgZGl2ID0gZWxlbWVudC5maW5kKFwiZGl2XCIpLmZpcnN0KCk7XG4gICAgICAgICAgdmFyIGNlbGxNb2RlbCA9IHNjb3BlLm1vZGVsLmdldENlbGxNb2RlbCgpO1xuICAgICAgICAgIGRpdi5odG1sKGNlbGxNb2RlbCk7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKCdtb2RlbC5nZXRDZWxsTW9kZWwoKScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICBkaXYuaHRtbChuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIk91dHB1dENvbnRhaW5lclwiOiB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGJrLWNvZGUtY2VsbC1vdXRwdXQgbmctcmVwZWF0PVwiaSBpbiBpdGVtc1wiIG1vZGVsPVwiaVwiID4nICtcbiAgICAgICAgICAgICc8LyBiay1jb2RlLWNlbGwtb3V0cHV0PicsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgbW9kZWw6IFwiPVwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICRzY29wZS5pdGVtcyA9IF8oJHNjb3BlLm1vZGVsLmdldENlbGxNb2RlbCgpLml0ZW1zKS5tYXAoZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHJlc3VsdDogaXRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHNjb3BlLmlzU2hvd01lbnUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciB0eXBlcyA9IFtcIlRleHRcIiwgXCJEYXRlXCIsIFwiQmVha2VyU3RhbmRhcmRPdXRwdXRcIiwgXCJCZWFrZXJTdGFuZGFyZEVycm9yXCIsIFwiV2FybmluZ1wiLCBcIkVycm9yXCIsIFwiSHRtbFwiLCBcIk91dHB1dENvbnRhaW5lclwiXTtcbiAgICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKHdoYXQsIHNjb3BlKSB7XG4gICAgICBpZiAoIXdoYXQpIHtcbiAgICAgICAgd2hhdCA9IFwiYWxsXCI7XG4gICAgICB9XG4gICAgICBpZiAoIXNjb3BlKSB7XG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgIH1cbiAgICAgIHNjb3BlLiRicm9hZGNhc3QoXCJia091dHB1dERpc3BsYXlGYWN0b3J5XCIsIHdoYXQpO1xuICAgICAgc2NvcGUuJCRwaGFzZSB8fCBzY29wZS4kYXBwbHkoKTtcbiAgICB9O1xuICAgIHZhciBzZXRJbXBsID0gZnVuY3Rpb24oaW5kZXgsIHR5cGUsIGltcGwpIHtcbiAgICAgIHR5cGVzW2luZGV4XSA9IHR5cGU7XG4gICAgICBpbXBsc1t0eXBlXSA9IGltcGw7XG4gICAgICByZWZyZXNoKHR5cGUpO1xuICAgIH07XG4gICAgdmFyIHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwID0ge1xuICAgICAgLy8gVGhlIGZpcnN0IGluIHRoZSBhcnJheSB3aWxsIGJlIHVzZWQgYXMgZGVmYXVsdFxuICAgICAgXCJ0ZXh0XCI6IFtcIlRleHRcIiwgXCJIdG1sXCIsIFwiTGF0ZXhcIl0sXG4gICAgICBcIkRhdGVcIjogW1wiRGF0ZVwiLCBcIlRleHRcIl0sXG4gICAgICBcIlRhYmxlRGlzcGxheVwiOiBbXCJUYWJsZVwiLCBcIlRleHRcIl0sXG4gICAgICBcImh0bWxcIjogW1wiSHRtbFwiXSxcbiAgICAgIFwiSW1hZ2VJY29uXCI6IFtcIkltYWdlXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiQmVha2VyRGlzcGxheVwiOiBbXCJCZWFrZXJEaXNwbGF5XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiUGxvdFwiOiBbXCJQbG90XCIsIFwiQ2hhcnRcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJUaW1lUGxvdFwiOiBbXCJQbG90XCIsIFwiQ2hhcnRcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJOYW5vUGxvdFwiOiBbXCJQbG90XCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiQ29tYmluZWRQbG90XCI6IFtcIkNvbWJpbmVkUGxvdFwiLCBcIlRleHRcIl0sXG4gICAgICBcIkhpZGRlbk91dHB1dENlbGxcIjogW1wiSGlkZGVuXCJdLFxuICAgICAgXCJXYXJuaW5nXCI6IFtcIldhcm5pbmdcIl0sXG4gICAgICBcIkJlYWtlck91dHB1dENvbnRhaW5lckRpc3BsYXlcIjogW1wiT3V0cHV0Q29udGFpbmVyXCIsIFwiVGV4dFwiXSxcbiAgICAgIFwiT3V0cHV0Q29udGFpbmVyQ2VsbFwiOiBbXCJPdXRwdXRDb250YWluZXJcIiwgXCJUZXh0XCJdLFxuICAgICAgXCJPdXRwdXRDb250YWluZXJcIjogW1wiT3V0cHV0Q29udGFpbmVyXCIsIFwiVGV4dFwiXVxuICAgIH07XG4gICAgdmFyIGZhY3RvcnkgPSB7XG4gICAgICBhZGQ6IGZ1bmN0aW9uKHR5cGUsIGltcGwpIHtcbiAgICAgICAgaWYgKHR5cGVzLmxlbmd0aCA+IE1BWF9DQVBBQ0lUWSkge1xuICAgICAgICAgIHRocm93IFwiQ2Fubm90IGFkZCBvdXRwdXQ6IFwiICsgdHlwZSArXG4gICAgICAgICAgICAgIFwiLCBtYXggb3V0cHV0IGRpc3BsYXkgY2FwYWNpdHkoXCIgKyBNQVhfQ0FQQUNJVFkgK1xuICAgICAgICAgICAgICBcIikgcmVhY2hlZFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCB0byB0aGUgZW5kXG4gICAgICAgIHNldEltcGwodHlwZXMubGVuZ3RoLCB0eXBlLCBpbXBsKTtcbiAgICAgIH0sXG4gICAgICBnZXQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZXNbaW5kZXhdO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJbXBsKHR5cGUpO1xuICAgICAgfSxcbiAgICAgIGdldEltcGw6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgJiYgaW1wbHNbdHlwZV0pIHtcbiAgICAgICAgICByZXR1cm4gaW1wbHNbdHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGltcGxzW1widGV4dFwiXTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldERpcmVjdGl2ZU5hbWU6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdHlwZXMuaW5kZXhPZih0eXBlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGluZGV4ID0gdHlwZXMuaW5kZXhPZihcIlRleHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiYmtvXCIgKyBpbmRleDtcbiAgICAgIH0sXG4gICAgICBhZGRPdXRwdXREaXNwbGF5VHlwZTogZnVuY3Rpb24odHlwZSwgZGlzcGxheXMsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXBbdHlwZV0pIHtcbiAgICAgICAgICByZXN1bHRUeXBlMkRpc3BsYXlUeXBlc01hcFt0eXBlXSA9IGRpc3BsYXlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkocmVzdWx0VHlwZTJEaXNwbGF5VHlwZXNNYXBbdHlwZV0sIFtpbmRleCwgMF0uY29uY2F0KGRpc3BsYXlzKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRBcHBsaWNhYmxlRGlzcGxheXM6IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlzSlNPTiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgdmFyIHJldCA9IHRydWU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGlzSFRNTCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIC9ePFthLXpdW1xcc1xcU10qPi9pLnRlc3QodmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJIaWRkZW5cIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmVzdWx0LnR5cGUpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSBbXCJUZXh0XCIsIFwiSHRtbFwiLCBcIkxhdGV4XCJdO1xuICAgICAgICAgICAgaWYgKGlzSlNPTihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgIHJldC5wdXNoKFwiSnNvblwiLCBcIlZlZ2FcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNIVE1MKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgcmV0ID0gW1wiSHRtbFwiLCBcIlRleHRcIiwgXCJMYXRleFwiXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfLmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICAgICAgICBpZiAoXy5pc09iamVjdChyZXN1bHRbMF0pKSB7XG4gICAgICAgICAgICAgICAgcmV0LnB1c2goXCJUYWJsZVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwLmhhc093blByb3BlcnR5KHJlc3VsdC50eXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFR5cGUyRGlzcGxheVR5cGVzTWFwW3Jlc3VsdC50eXBlXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtcIlRleHRcIl07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkoKVxuICAgIH07XG4gICAgYmVha2VyLm91dHB1dERpc3BsYXlGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICBmb3IgKHZhciBrZXkgaW4gYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheUZhY3RvcnkpIHtcbiAgICAgIGJlYWtlci5vdXRwdXREaXNwbGF5RmFjdG9yeS5hZGQoa2V5LCBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5RmFjdG9yeVtrZXldKTtcbiAgICB9XG4gICAgYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheUZhY3RvcnkgPSBudWxsO1xuXG4gICAgZm9yICh2YXIga2V5IGluIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlUeXBlKSB7XG4gICAgICB2YXIgZGlzcGxheXMgPSBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5VHlwZVtrZXldO1xuICAgICAgZmFjdG9yeS5hZGRPdXRwdXREaXNwbGF5VHlwZShrZXksIGRpc3BsYXlzKTtcbiAgICB9XG4gICAgYmVha2VyLnRvQmVBZGRlZFRvT3V0cHV0RGlzcGxheVR5cGUgPSBudWxsO1xuXG4gICAgcmV0dXJuIGZhY3Rvcnk7XG4gIH0pO1xuXG4gIF8oXy5yYW5nZShNQVhfQ0FQQUNJVFkpKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICBtb2R1bGUuZGlyZWN0aXZlKFwiYmtvXCIgKyBpLFxuICAgICAgICBmdW5jdGlvbihia091dHB1dERpc3BsYXlGYWN0b3J5LCBia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlciwgJGluamVjdG9yKSB7XG4gICAgICB2YXIgaW1wbCA9IGJrT3V0cHV0RGlzcGxheUZhY3RvcnkuZ2V0KGkpO1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihpbXBsKSkge1xuICAgICAgICByZXR1cm4gaW1wbChia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlciwgJGluamVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGltcGwpKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbXBsLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaXQgPSBpbXBsW2pdO1xuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoaXQpKSB7XG4gICAgICAgICAgICAgIGlmIChia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlci5oYXMoaXQpKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGJrT3V0cHV0RGlzcGxheVNlcnZpY2VNYW5hZ2VyLmdldChpdCkpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRpbmplY3Rvci5oYXMoaXQpKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKCRpbmplY3Rvci5nZXQoaXQpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcImJlYWtlciBjb3VsZCBub3QgZmluZCBwcm92aWRlciBmb3IgYmtvRmFjdG9yeSBcIiArIGl0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNGdW5jdGlvbihpdCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbXBsO1xuICAgICAgfVxuICAgIH0pO1xuICB9KVxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgdGhlIGNlbnRyYWwgY29udHJvbCBvZiBhbGwgb3V0cHV0IGRpc3BsYXlzLiBJdCBmdWxmaWxscyBhY3R1YWwgYW5ndWxhciBkaXJlY3RpdmVzXG4gKiBsYXppbHkgd2hlbiB1c2VyIGxvYWQgb3V0cHV0IGRpc3BsYXkgcGx1Z2lucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLm91dHB1dERpc3BsYXknKTtcbiAgbW9kdWxlLmZhY3RvcnkoXCJia091dHB1dERpc3BsYXlTZXJ2aWNlTWFuYWdlclwiLCBmdW5jdGlvbigkaW5qZWN0b3IpIHtcbiAgICB2YXIgc2VydmljZXMgPSB7fTtcbiAgICB2YXIgZmFjdG9yeSA9IHtcbiAgICAgIGdldFNlcnZpY2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzO1xuICAgICAgfSxcbiAgICAgIGFkZFNlcnZpY2U6IGZ1bmN0aW9uKGtleSwgaW1wbCkge1xuICAgICAgICBpZiAodHlwZW9mIGltcGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHNlcnZpY2VzW2tleV0gPSBpbXBsKCRpbmplY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGltcGwpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGltcGwubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBpdCA9IGltcGxbal07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIGlmIChzZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShpdCkpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goc2VydmljZXNbaXRdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgkaW5qZWN0b3IuaGFzKGl0KSkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCgkaW5qZWN0b3IuZ2V0KGl0KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgc2VydmljZXNba2V5XSA9IGl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlcnZpY2VzW2tleV0gPSBpbXBsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgICB9LFxuICAgICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzW2tleV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5U2VydmljZSkge1xuICAgICAgdmFyIGltcGwgPSBiZWFrZXIudG9CZUFkZGVkVG9PdXRwdXREaXNwbGF5U2VydmljZVtrZXldO1xuICAgICAgZmFjdG9yeS5hZGRTZXJ2aWNlKGtleSwgaW1wbCk7XG4gICAgfVxuICAgIGJlYWtlci50b0JlQWRkZWRUb091dHB1dERpc3BsYXlTZXJ2aWNlID0gbnVsbDtcbiAgICBiZWFrZXIub3V0cHV0RGlzcGxheVNlcnZpY2UgPSBmYWN0b3J5O1xuICAgIHJldHVybiBmYWN0b3J5O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBtb2R1bGUgZm9yIHRoZSBVSSB0aGF0IHNob3dzIHRoZSBsaXN0IG9mIGV2YWx1YXRvcnMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmdcbiAqIHNldHRpbmdzIHBhbmVsLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnKTtcblxuICBtb2R1bGUuY29udHJvbGxlcigncGx1Z2luTWFuYWdlckN0cmwnLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRtb2RhbEluc3RhbmNlJywgJ2JrQ29yZU1hbmFnZXInLCAnYmtTZXNzaW9uTWFuYWdlcicsICdia01lbnVQbHVnaW5NYW5hZ2VyJywgJ2JrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdia0V2YWx1YXRvck1hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRtb2RhbEluc3RhbmNlLCBia0NvcmVNYW5hZ2VyLGJrU2Vzc2lvbk1hbmFnZXIsIGJrTWVudVBsdWdpbk1hbmFnZXIsIGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJrRXZhbHVhdG9yTWFuYWdlcikge1xuXG5cbiAgICAkc2NvcGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLmV2YWxUYWJPcC5zaG93VVJMID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLnNob3dXYXJuaW5nID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLnNob3dTZWN1cml0eVdhcm5pbmcgPSBmYWxzZTtcbiAgICAgICRzY29wZS5ldmFsVGFiT3AuZm9yY2VMb2FkID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZXZhbFRhYk9wLm5ld1BsdWdpbk5hbWVPclVybCA9IFwiXCI7XG4gICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZShcIm9rXCIpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0RXZhbHVhdG9yRGV0YWlscyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBia0V2YWx1YXRvck1hbmFnZXIuZ2V0VmlzdWFsUGFyYW1zKG5hbWUpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZXZhbFRhYk9wID0ge1xuICAgICAgbmV3UGx1Z2luTmFtZU9yVXJsOiBcIlwiLFxuICAgICAgc2hvd1VSTDogZmFsc2UsXG4gICAgICBzaG93V2FybmluZzogZmFsc2UsXG4gICAgICBzaG93U2VjdXJpdHlXYXJuaW5nOiBmYWxzZSxcbiAgICAgIGZvcmNlTG9hZDogZmFsc2UsXG4gICAgICBnZXRBbGxFdmFsdWF0b3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yc1dpdGhTcGVjOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjdGl2ZVBsdWdpbnMgPSBia0V2YWx1YXRvck1hbmFnZXIuZ2V0QWxsRXZhbHVhdG9ycygpO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAodmFyIHAgaW4gYWN0aXZlUGx1Z2lucykge1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhhY3RpdmVQbHVnaW5zW3BdLnNwZWMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdFtwXSA9IGFjdGl2ZVBsdWdpbnNbcF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgZ2V0TG9hZGluZ0V2YWx1YXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtFdmFsdWF0b3JNYW5hZ2VyLmdldExvYWRpbmdFdmFsdWF0b3JzKCk7XG4gICAgICB9LFxuICAgICAgZ2V0RXZhbHVhdG9yU3RhdHVzZXM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdmFyIGtub3duUGx1Z2lucyA9IGJrRXZhbHVhdGVQbHVnaW5NYW5hZ2VyLmdldEtub3duRXZhbHVhdG9yUGx1Z2lucygpO1xuICAgICAgICB2YXIgYWN0aXZlUGx1Z2lucyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRBbGxFdmFsdWF0b3JzKCk7XG4gICAgICAgIHZhciBsb2FkaW5nUGx1Z2lucyA9IGJrRXZhbHVhdG9yTWFuYWdlci5nZXRMb2FkaW5nRXZhbHVhdG9ycygpO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAodmFyIHAgaW4ga25vd25QbHVnaW5zKSB7XG4gICAgICAgICAgdmFyIHN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhY3RpdmVQbHVnaW5zW3BdKVxuICAgICAgICAgICAgc3RhdHVzID0gXCJhY3RpdmVcIjtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGwgaW4gbG9hZGluZ1BsdWdpbnMpIHtcbiAgICAgICAgICAgICAgaWYgKGxvYWRpbmdQbHVnaW5zW2xdLnBsdWdpbiA9PSBwKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gXCJsb2FkaW5nXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RhdHVzKSB7XG4gICAgICAgICAgICAgIHN0YXR1cyA9IFwia25vd25cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0W3BdID0gc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgc2V0TmV3UGx1Z2luTmFtZU9yVXJsOiBmdW5jdGlvbihwbHVnaW5OYW1lT3JVcmwpIHtcbiAgICAgICAgdGhpcy5uZXdQbHVnaW5OYW1lT3JVcmwgPSBwbHVnaW5OYW1lT3JVcmw7XG4gICAgICB9LFxuICAgICAgdG9nZ2xlUGx1Z2luOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHZhciBwbHVnaW4gPSBuYW1lIHx8IHRoaXMubmV3UGx1Z2luTmFtZU9yVXJsO1xuICAgICAgICB2YXIgZnJvbVVybCA9IG5hbWUgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHZhciBzdGF0dXMgPSB0aGlzLmdldEV2YWx1YXRvclN0YXR1c2VzKClbcGx1Z2luXTtcblxuICAgICAgICBpZiAoIWZyb21VcmwgJiYgIV8uY29udGFpbnMoWydhY3RpdmUnLCAna25vd24nXSwgc3RhdHVzKSkgcmV0dXJuO1xuICAgICAgICAvLyBmb3Igbm93LCBpZiB0aGUgcGx1Z2luIGlzbid0IGZyb20gYSBVUkwgb3IgYWN0aXZlIG9yIGtub3duXG4gICAgICAgIC8vIChuYW1lbHkgbG9hZGluZykgcmV0dXJuLlxuICAgICAgICAvLyBUT0RPOiBvdGhlciBzdGF0ZXMgd2Ugc2hvdWxkIHN1cHBvcnQ6IGZhaWxlZCBhbmQgZXhpdGluZy5cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYWN0aXZlJykge1xuICAgICAgICAgIC8vIHR1cm4gb2ZmIGV2YWx1YXRvciBpZiBvblxuICAgICAgICAgIGlmICghYmtTZXNzaW9uTWFuYWdlci5ldmFsdWF0b3JVbnVzZWQocGx1Z2luKSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsVGFiT3Auc2hvd1dhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJrU2Vzc2lvbk1hbmFnZXIucmVtb3ZlRXZhbHVhdG9yKHBsdWdpbik7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLnJlbW92ZUV2YWx1YXRvcihwbHVnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG90aGVyd2lzZSwgdHVybiBvbiBldmFsdWF0b3JcbiAgICAgICAgICBpZiAoZnJvbVVybCkge1xuICAgICAgICAgICAgdmFyIHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICAgICAgaWYgKHIudGVzdChwbHVnaW4pICYmICEkc2NvcGUuZXZhbFRhYk9wLmZvcmNlTG9hZCkge1xuICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWxUYWJPcC5zaG93U2VjdXJpdHlXYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNjb3BlLmV2YWxUYWJPcC5mb3JjZUxvYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICRzY29wZS5ldmFsVGFiT3AubmV3UGx1Z2luTmFtZU9yVXJsID0gXCJcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV3RXZhbCA9IHsgbmFtZTogJycsIHBsdWdpbjogcGx1Z2luIH07XG4gICAgICAgICAgYmtTZXNzaW9uTWFuYWdlci5hZGRFdmFsdWF0b3IobmV3RXZhbCk7XG4gICAgICAgICAgYmtDb3JlTWFuYWdlci5nZXRCa0FwcCgpLmFkZEV2YWx1YXRvcihuZXdFdmFsKTtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2xhbmd1YWdlQWRkZWQnLCB7IGV2YWx1YXRvcjogcGx1Z2luIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5tZW51VGFiT3AgPSB7XG4gICAgICBuZXdNZW51UGx1Z2luVXJsOiBcIi4vcGx1Z2luL21lbnUvZGVidWcuanNcIixcbiAgICAgIGFkZE1lbnVQbHVnaW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmtNZW51UGx1Z2luTWFuYWdlci5sb2FkTWVudVBsdWdpbih0aGlzLm5ld01lbnVQbHVnaW5VcmwpO1xuICAgICAgfSxcbiAgICAgIGdldE1lbnVQbHVnaW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBia01lbnVQbHVnaW5NYW5hZ2VyLmdldE1lbnVQbHVnaW5zKCk7XG4gICAgICB9LFxuICAgICAgZ2V0TG9hZGluZ1BsdWdpbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYmtNZW51UGx1Z2luTWFuYWdlci5nZXRMb2FkaW5nUGx1Z2lucygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgfV0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogVGhpcyBpcyB0aGUgbW9kdWxlIGZvciB0aGUgVUkgdGhhdCBzaG93cyB0aGUgbGlzdCBvZiBldmFsdWF0b3JzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiBzZXR0aW5ncyBwYW5lbC5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvcmUnKTtcblxuICBtb2R1bGUuZGlyZWN0aXZlKCdia1BsdWdpbk1hbmFnZXJFdmFsdWF0b3JTZXR0aW5ncycsIGZ1bmN0aW9uKFxuICAgICAgJGNvbXBpbGUsIGJrU2Vzc2lvbk1hbmFnZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbXCJtYWluYXBwL2NvbXBvbmVudHMvcGx1Z2lubWFuYWdlci9wbHVnaW5tYW5hZ2VyX2V2YWx1YXRvcl9zZXR0aW5nc1wiXSgpLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5zZXQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAkc2NvcGUuZXZhbHVhdG9yLnBlcmZvcm0odmFsKTtcbiAgICAgICAgICBia1Nlc3Npb25NYW5hZ2VyLnNldE5vdGVib29rTW9kZWxFZGl0ZWQodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBzcGVjID0gXy5tYXAoc2NvcGUuZXZhbHVhdG9yLnNwZWMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICByZXR1cm4gXy5leHRlbmQoeyBuYW1lOiBrZXksIGtleToga2V5IH0sIHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUucHJvcGVydGllcyA9IF8uZmlsdGVyKHNwZWMsIGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICAgIHJldHVybiBvcHRpb24udHlwZSA9PT0gXCJzZXR0YWJsZVN0cmluZ1wiO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS5hY3Rpb25zID0gXy5maWx0ZXIoc3BlYywgZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi50eXBlID09PSBcImFjdGlvblwiO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogYmtDZWxsXG4gKiAtIHRoZSBjb250cm9sbGVyIHRoYXQgcmVzcG9uc2libGUgZm9yIGRpcmVjdGx5IGNoYW5naW5nIHRoZSB2aWV3XG4gKiAtIHRoZSBjb250YWluZXIgZm9yIHNwZWNpZmljIHR5cGVkIGNlbGxcbiAqIC0gdGhlIGRpcmVjdGl2ZSBpcyBkZXNpZ25lZCB0byBiZSBjYXBhYmxlIG9mIHVzZWQgaW4gYSBuZXN0ZWQgd2F5XG4gKiAtIGNvbmNlcHR1YWxseSwgYSBjZWxsIGlzICdjZWxsIG1vZGVsJyArICd2aWV3IG1vZGVsJyhhbiBleGFtcGxlIG9mIHdoYXQgZ29lcyBpbiB0byB0aGUgdmlld1xuICogbW9kZWwgaXMgY29kZSBjZWxsIGJnIGNvbG9yKVxuICogLSBBIGJrQ2VsbCBpcyBnZW5lcmljYWxseSBjb3JyZXNwb25kcyB0byBhIHBvcnRpb24gb2YgdGhlIG5vdGVib29rIG1vZGVsIChjdXJyZW50bHksIGl0IGlzXG4gKiBhbHdheXMgYSBicmFuY2ggaW4gdGhlIGhpZXJhcmNoeSlcbiAqIC0gV2hlbiBleHBvcnRpbmcgKGEuay5hLiBzaGFyaW5nKSwgd2Ugd2lsbCBuZWVkIGJvdGggdGhlIGNlbGwgbW9kZWwgYW5kIHRoZSB2aWV3IG1vZGVsXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29yZScpO1xuXG4gIG1vZHVsZS5jb250cm9sbGVyKCdDb2RlQ2VsbE9wdGlvbnNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAnZHNjb3BlJywgJ2JrQ29yZU1hbmFnZXInLCBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBkc2NvcGUsIGJrQ29yZU1hbmFnZXIpIHtcbiAgICAkc2NvcGUuZHNjb3BlID0gZHNjb3BlO1xuICAgICRzY29wZS5pbml0aWFsaXphdGlvbkNlbGwgPSBkc2NvcGUuaW5pdGlhbGl6YXRpb247XG4gICAgJHNjb3BlLmNlbGxOYW1lID0gZHNjb3BlLmlkO1xuICAgICRzY29wZS5jZWxsVGFncyA9IGRzY29wZS50YWdzO1xuICAgICRzY29wZS5pc0luaXRDZWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXphdGlvbkNlbGw7XG4gICAgfTtcbiAgICAkc2NvcGUudG9nZ2xlSW5pdENlbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6YXRpb25DZWxsID0gIXRoaXMuaW5pdGlhbGl6YXRpb25DZWxsO1xuICAgIH07XG4gICAgJHNjb3BlLnNhdmVEaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEoKCB0aGlzLmdldE5hbWVFcnJvcigpID09PSAnJyApICYmICggdGhpcy5nZXRUYWdFcnJvcigpID09PSAnJyApKTtcbiAgICB9O1xuICAgICRzY29wZS5pc0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gISEkc2NvcGUuZ2V0TmFtZUVycm9yKCkgfHwgISEkc2NvcGUuZ2V0VGFnRXJyb3IoKTtcbiAgICB9O1xuICAgICRzY29wZS5nZXROYW1lRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKHRoaXMuZHNjb3BlLmlkID09PSB0aGlzLmNlbGxOYW1lKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICByZXR1cm4gYmtDb3JlTWFuYWdlci5nZXROb3RlYm9va0NlbGxNYW5hZ2VyKCkuY2FuUmVuYW1lQ2VsbCh0aGlzLmNlbGxOYW1lKTtcbiAgICB9O1xuICAgICRzY29wZS5nZXRUYWdFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLmNhblNldFVzZXJUYWdzKHRoaXMuY2VsbFRhZ3MpO1xuICAgIH07XG4gICAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgnY2xvc2UnKTtcbiAgICB9O1xuICAgICRzY29wZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zYXZlRGlzYWJsZWQoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyIHJlYiA9IGZhbHNlO1xuICAgICAgdGhpcy5kc2NvcGUuaW5pdGlhbGl6YXRpb24gPSB0aGlzLmluaXRpYWxpemF0aW9uQ2VsbDtcbiAgICAgIGlmICh0aGlzLmRzY29wZS50YWdzICE9PSB0aGlzLmNlbGxUYWdzKSB7XG4gICAgICAgIHRoaXMuZHNjb3BlLnRhZ3MgPSB0aGlzLmNlbGxUYWdzO1xuICAgICAgICByZWIgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHNjb3BlLmlkICE9PSB0aGlzLmNlbGxOYW1lKVxuICAgICAgICBia0NvcmVNYW5hZ2VyLmdldE5vdGVib29rQ2VsbE1hbmFnZXIoKS5yZW5hbWVDZWxsKHRoaXMuZHNjb3BlLmlkLHRoaXMuY2VsbE5hbWUpO1xuICAgICAgZWxzZSBpZihyZWIpXG4gICAgICAgIGJrQ29yZU1hbmFnZXIuZ2V0Tm90ZWJvb2tDZWxsTWFuYWdlcigpLnJlYnVpbGRNYXBzKClcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCdzYXZlJyk7XG4gICAgfTtcbn1dKTtcblxufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvbW1vblV0aWxzXG4gKiAtIHRoaXMgc2hvdWxkIGJlIHRoZSBtb3N0IGdlbmVyYWwgdXRpbGl0aWVzLCB0aGUgdXRpbGl0aWVzIHRoYXQgY291bGQgaGF2ZSBiZWVuIGZvdW5kIGluIGFcbiAqIDNyZC1wYXJ0eSBsaWJyYXJ5XG4gKiBhbmQgd2UganVzdCBoYXBwZW4gdG8gd3JpdGUgb3VyIG93bi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29tbW9uVXRpbHMnLCBbXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdjb21tb25VdGlscycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xuICAgICAgICB2YXIgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG5cbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQobGVuZ3RoKSkge1xuICAgICAgICAgIGxlbmd0aCA9IDY7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgfSxcbiAgICAgIGxvYWRKUzogZnVuY3Rpb24odXJsLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIGUudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgICAgIC8vIEFkZCB0aGUgdGltZSB0byB0aGUgVVJMIHRvIGF2b2lkIGNhY2hpbmcuXG4gICAgICAgIHZhciBtaWxsaXMgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgZS5zcmMgPSB1cmwgKyBcIj9fPVwiICsgbWlsbGlzO1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIGUub25sb2FkID0gc3VjY2VzcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmFpbHVyZSkge1xuICAgICAgICAgIGUub25lcnJvciA9IGZhaWx1cmU7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlKTtcbiAgICAgIH0sXG4gICAgICBsb2FkQ1NTOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgICAgbGluay50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICAgICAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmVudE9mZnNldFg6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50KSB7IC8vIG9mZnNldFggaXMgbm90IGRlZmluZWQgaW4gZmlyZWZveFxuICAgICAgICB2YXIgeCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHgpICYmICFfLmlzVW5kZWZpbmVkKGVsZW0ub2Zmc2V0KSkge1xuICAgICAgICAgIHggPSBldmVudC5wYWdlWCAtIGVsZW0ub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geDtcbiAgICAgIH0sXG4gICAgICBsb2FkTGlzdDogZnVuY3Rpb24odXJscywgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICBpZiAodXJscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAoc3VjY2VzcylcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmwgPSB1cmxzLnNoaWZ0KCk7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9hZEpTKHVybCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbWUubG9hZExpc3QodXJscywgc3VjY2VzcywgZmFpbHVyZSk7XG4gICAgICAgIH0sIGZhaWx1cmUpO1xuICAgICAgfSxcbiAgICAgIGZpbmRUYWJsZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICBmdW5jdGlvbiBmaW5kQ29sdW1uTmFtZXMoZWxlbSkge1xuICAgICAgICAgIHZhciByb3cgPSBlbGVtLmNoaWxkcmVuWzBdO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJvdy5jaGlsZHJlbltpXS5pbm5lckhUTUwpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kRW50cmllcyhlbGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW0uY2hpbGRyZW5baV0uaW5uZXJIVE1MKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZmluZFZhbHVlcyhlbGVtKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZpbmRFbnRyaWVzKGVsZW0uY2hpbGRyZW5baV0pKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhZyA9IGVsZW0udGFnTmFtZTtcbiAgICAgICAgaWYgKHRhZyA9PT0gJ0RJVicpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW0uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzdWIgPSB0aGlzLmZpbmRUYWJsZShlbGVtLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIGlmIChzdWIpIHJldHVybiBzdWI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWcgPT09ICdUQUJMRScpIHtcbiAgICAgICAgICBpZiAoZWxlbS5jaGlsZHJlbi5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUbyBwcmV2ZW50IGZyb20gbWFuZ2xpbmcgdXNlciBjcmVhdGVkIGh0bWwgdGFibGUsXG4gICAgICAgICAgLy8gb25seSB1c2UgdGFibGUgZGlzcGxheSBmb3IgZGF0YWZyYW1lIHRhYmxlcyAoQkVBS0VSLTQ1NilcbiAgICAgICAgICBpZiAoIV8uY29udGFpbnMoZWxlbS5jbGFzc0xpc3QsICdkYXRhZnJhbWUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyB0YWJsZSBjb250YWlucyBlbGVtZW50cyB3aXRoIGNvbHNwYW4gYW5kL29yIHJvd3NwYW5cbiAgICAgICAgICAvLyB0aGUgc2xvY2tncmlkIHRlbXBsYXRlIGRvZXMgbm90IHN1cHBvcnQgdGhlbSAgKEJFQUtFUi02OTQpXG4gICAgICAgICAgdmFyIGhlYWRlclJvd3MgPSAkKGVsZW0pLmZpbmQoJ3RoZWFkJykuZmluZCgndHInKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhlYWRlclJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaCA9IGhlYWRlclJvd3NbaV0uY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKHZhciBqPTA7IGo8Y2gubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNoW2pdLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpPjEgfHwgY2hbal0uZ2V0QXR0cmlidXRlKCdyb3dzcGFuJyk+MSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB2YWx1ZVJvd3MgPSAkKGVsZW0pLmZpbmQoJ3Rib2R5JykuZmluZCgndHInKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlUm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoID0gdmFsdWVSb3dzW2ldLmNoaWxkcmVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaj0wOyBqPGNoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmIChjaFtqXS5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKT4xIHx8IGNoW2pdLmdldEF0dHJpYnV0ZSgncm93c3BhbicpPjEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgYSB0YWJsZSB3aXRoIG11bHRpcGxlIHJvd3NcbiAgICAgICAgICAvLyBjdXJyZW50bHkgdGhlIHRhYmxlIGRpc3BsYXlzIGNhbid0IGhhbmRsZSBtdWx0aXBsZSByb3dzIG9mIGhlYWRlciAoQkVBS0VSLTQxNilcbiAgICAgICAgICAvLyBhZGRlZCBsb2dpYyB0byBjb2xsYXBzZSB0aGUgdHdvIGhlYWRlciByb3dzICAoQkVBS0VSLTY5NClcbiAgICAgICAgICB2YXIgY29scyA9IFtdO1xuICAgICAgICAgIGlmIChoZWFkZXJSb3dzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgLy9pZiB0aGVyZSBhcmUgdHdvIHJvd3MsIGFsbG93IHRhYmxlZGlzcGxheSBhcyBsb25nIGFzIG5vIGNvbHVtbiBoYXMgdmFsdWVzIGluIGJvdGggcm93c1xuICAgICAgICAgICAgLy90aGlzIGlzIGJlY2F1c2UgcGFuZGFzIHJlbmRlcnMgZGF0YWZyYW1lcyB3aXRoIHRoZSBpbmRleCBjb2wgaGVhZGVyIG9uIGEgc2Vjb25kIHJvd1xuICAgICAgICAgICAgdmFyIHJvdzAgPSBoZWFkZXJSb3dzLmVxKDApLmZpbmQoJ3RoJyk7XG4gICAgICAgICAgICB2YXIgcm93MSA9IGhlYWRlclJvd3MuZXEoMSkuZmluZCgndGgnKTtcblx0ICAgIHZhciBtaW4gPSByb3cwLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChtaW4+cm93MS5sZW5ndGgpIHtcblx0XHRtaW4gPSByb3cxLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWluOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIHIwID0gcm93MC5lcShpKTtcbiAgICAgICAgICAgICAgdmFyIHIxID0gcm93MS5lcShpKTtcblxuICAgICAgICAgICAgICAvL2lmIGFueSBjb2x1bW4gaGFzIGh0bWwgaW4gYm90aCByb3dzLCBkb24ndCB1c2UgdGFibGVkaXNwbGF5XG4gICAgICAgICAgICAgIGlmIChyMCAhPT0gdW5kZWZpbmVkICYmIHIxICE9IHVuZGVmaW5lZCAmJiByMC5odG1sKCkgJiYgcjEuaHRtbCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocjAgIT09IHVuZGVmaW5lZCAmJiByMC5odG1sKCkpIHtcblx0ICAgICAgICBjb2xzLnB1c2gocjAuaHRtbCgpKTtcblx0ICAgICAgfSBlbHNlIGlmIChyMSAhPT0gdW5kZWZpbmVkICYmIHIxLmh0bWwoKSkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaChyMS5odG1sKCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuXHRcdGNvbHMucHVzaChcIlwiKTtcblx0ICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGVhZGVyUm93cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvL2lmIHRoZXJlIGFyZSB0d28gb3IgbW9yZSBoZWFkZXIsIGZvcmdldCBhYm91dCBpdFxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHMgPSBmaW5kQ29sdW1uTmFtZXMoJChlbGVtKS5maW5kKCd0aGVhZCcpWzBdKTtcblx0ICB9XG5cbiAgICAgICAgICB2YXIgdmFscyA9IGZpbmRWYWx1ZXMoJChlbGVtKS5maW5kKCd0Ym9keScpWzBdKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJUYWJsZURpc3BsYXlcIixcbiAgICAgICAgICAgIHRhYmxlRGlzcGxheU1vZGVsOiB7XG4gICAgICAgICAgICAgIGNvbHVtbk5hbWVzOiBjb2xzLFxuICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2x1bW5OYW1lczogY29scyxcbiAgICAgICAgICAgIHZhbHVlczogdmFsc1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgZm9ybWF0VGltZVN0cmluZzogZnVuY3Rpb24obWlsbGlzKSB7XG4gICAgICAgIGlmIChtaWxsaXMgPCA2MCAqIDEwMDApIHtcbiAgICAgICAgICByZXR1cm4gKG1pbGxpcyAvIDEwMDApLnRvRml4ZWQoMSkgKyBcInNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKG1pbGxpcyk7XG4gICAgICAgICAgdmFyIGQgPSBNYXRoLmZsb29yKG1pbGxpcyAvICgyNCAqIDYwICogNjAgKiAxMDAwKSk7XG4gICAgICAgICAgdmFyIGggPSBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gICAgICAgICAgdmFyIG0gPSBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICAgICAgICB2YXIgcyA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgIGlmIChkID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IChkICsgXCJkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAoaCArIFwiaFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG0gPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gKG0gKyBcIm1cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IChzICsgXCJzXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNNaWRkbGVDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LmJ1dHRvbiA9PT0gMSAvLyBtaWRkbGUgY2xpY2tcbiAgICAgICAgICAgIHx8IChldmVudC5idXR0b24gPT09IDAgLy8gbGVmdCBjbGlja1xuICAgICAgICAgICAgJiYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNYWNcIikgIT09IC0xID8gZXZlbnQubWV0YUtleSA6IGV2ZW50LmN0cmxLZXkpKTtcbiAgICAgIH0sXG4gICAgICBzYXZlQXNDbGllbnRGaWxlOiBmdW5jdGlvbiAoZGF0YSwgZmlsZW5hbWUpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignY29tbW9uVXRpbHMuc2F2ZUFzQ2xpZW50RmlsZTogTm8gZGF0YScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZmlsZW5hbWUpIHtcbiAgICAgICAgICBmaWxlbmFtZSA9ICdjb25zb2xlLmpzb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIHVuZGVmaW5lZCwgNClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogJ3RleHQvanNvbid9KSxcbiAgICAgICAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKSxcbiAgICAgICAgICAgIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICAgICAgICBhLmRvd25sb2FkID0gZmlsZW5hbWVcbiAgICAgICAgYS5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICAgICAgYS5kYXRhc2V0LmRvd25sb2FkdXJsID0gWyd0ZXh0L2pzb24nLCBhLmRvd25sb2FkLCBhLmhyZWZdLmpvaW4oJzonKVxuICAgICAgICBlLmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUsIGZhbHNlLCB3aW5kb3csIDAsIDAsIDAsIDAsIDAsXG4gICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbClcbiAgICAgICAgYS5kaXNwYXRjaEV2ZW50KGUpXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuY29tbW9uVWlcbiAqIFRoaXMgbW9kdWxlIGlzIHRoZSBnZW5lcmFsIHN0b3JlIG9mIGxvdyBsZXZlbCBVSSBkaXJlY3RpdmVzLCB3aGljaCBzaG91bGQgYmUgc2VwYXJhdGVkIG91dCBvclxuICogcG90ZW50aWFsbHkgZm91bmQgZXF1aXZhbGVudCBpbiAzcmQgcGFydHkgbGlicmFyaWVzLlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLmNvbW1vblVpJywgW10pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdvbkN0cmxFbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5iaW5kKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHsgLy8gY3RybCArIGVudGVyXG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoYXR0cnMub25DdHJsRW50ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2VhdENsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgZWxlbWVudC5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2ZvY3VzU3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIFEuZmNhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtjZWxsJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQycsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5tb3VzZW92ZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdjZWxsLWJyYWNrZXQtc2VsZWN0ZWQnKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnQubW91c2VvdXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdjZWxsLWJyYWNrZXQtc2VsZWN0ZWQnKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5maWx0ZXIoJ2lzSGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICByZXR1cm4gXyhpbnB1dCkuZmlsdGVyKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgIHJldHVybiAhaXQuaGlkZGVuO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2Ryb3Bkb3duUHJvbW90ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBJcyB5b3VyIGRyb3Bkb3duIGJlaW5nIGNvdmVyZWQgYnkgaXRzIGFuY2VzdG9ycyBzaWJsaW5ncz9cbiAgICAvLyBQcm9tb3RlIHRoYXQgc2hpeiwgYW5kIHByZXBlbmQgaXQgdG8gdGhlIG5vdGVib29rIHNvIGl0IGRvZXNuJ3RcbiAgICAvLyBldmVyIGdldCBidWxsaWVkIGFnYWluLlxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0MnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICQod2luZG93KS5vbignY2xpY2suJyArIHNjb3BlLiRpZCwgaGlkZURyb3Bkb3duKTtcblxuICAgICAgICB2YXIgZHJvcGRvd24gPSBlbGVtZW50LmZpbmQoJy5kcm9wZG93bi1tZW51JykuZmlyc3QoKTtcbiAgICAgICAgdmFyIHRvZ2dsZSA9IGVsZW1lbnQuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpLmZpcnN0KCk7XG5cbiAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCAnLmRyb3Bkb3duLXRvZ2dsZScsIHRvZ2dsZURyb3Bkb3duKTtcblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bigpIHtcbiAgICAgICAgICBpZiAoJChkcm9wZG93bikuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHJldHVybiBoaWRlRHJvcGRvd24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93RHJvcGRvd24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaG93RHJvcGRvd24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5vdGVib29rID0gYmtIZWxwZXIuZ2V0Tm90ZWJvb2tFbGVtZW50KHNjb3BlKTtcbiAgICAgICAgICAgIHZhciB0b2dnbGVQb3NpdGlvbiA9IHRvZ2dsZS5vZmZzZXQoKTtcbiAgICAgICAgICAgIHZhciBub3RlYm9va1Bvc2l0aW9uID0gbm90ZWJvb2sub2Zmc2V0KCk7XG5cbiAgICAgICAgICAgIGRyb3Bkb3duLnByZXBlbmRUbyhub3RlYm9vayk7XG5cbiAgICAgICAgICAgIGRyb3Bkb3duLnNob3coKS5jc3Moe1xuICAgICAgICAgICAgICB0b3A6IHRvZ2dsZVBvc2l0aW9uLnRvcCAtIG5vdGVib29rUG9zaXRpb24udG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgbGVmdDogdG9nZ2xlUG9zaXRpb24ubGVmdCAtIG5vdGVib29rUG9zaXRpb24ubGVmdCAtIGRyb3Bkb3duLm91dGVyV2lkdGgoKSArICdweCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBoaWRlRHJvcGRvd24oKSB7IGRyb3Bkb3duLmhpZGUoKTt9XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQod2luZG93KS5vZmYoJy4nICsgc2NvcGUuJGlkKTtcbiAgICAgICAgICAvLyBTaW5jZSB0aGUgZHJvcGRvd24gaXMgZXh0ZXJuYWwgdG8gdGhlIGRpcmVjdGl2ZSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0byBjbGVhbiBpdCB1cCB3aGVuIHRoZSBkaXJlY3RpdmUgZ29lcyBhd2F5XG4gICAgICAgICAgZHJvcGRvd24ucmVtb3ZlKCk7XG4gICAgICAgICAgZWxlbWVudC5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuICBtb2R1bGUuZGlyZWN0aXZlKCdia0Ryb3Bkb3duTWVudScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IEpTVFsndGVtcGxhdGUvZHJvcGRvd24nXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgJ21lbnVJdGVtcyc6ICc9JyxcblxuICAgICAgICAvLyBDbGFzc2VzIHRvIGJlIGFkZGVkIHRvIGFueSBzdWJtZW51IGl0ZW0uIFVzZWQgZm9yIGFkZGluZ1xuICAgICAgICAvLyBwdWxsLWxlZnQgdG8gbWVudXMgdGhhdCBhcmUgb24gdGhlIGZhciByaWdodCAoZS5nLiBia2NlbGxtZW51KS5cbiAgICAgICAgc3VibWVudUNsYXNzZXM6ICdAJ1xuICAgICAgfSxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmdldE1lbnVJdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfLnJlc3VsdCgkc2NvcGUsICdtZW51SXRlbXMnKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtEcm9wZG93bk1lbnVJdGVtJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBKU1RbJ3RlbXBsYXRlL2Ryb3Bkb3duX2l0ZW0nXSgpLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgJ2l0ZW0nOiAnPSdcbiAgICAgIH0sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIHZhciBpc0l0ZW1EaXNhYmxlZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZW0uZGlzYWJsZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5kaXNhYmxlZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbS5kaXNhYmxlZDtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0QUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXNJdGVtRGlzYWJsZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXNhYmxlZC1saW5rJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW1zICYmIGl0ZW0uaXRlbXMubGVuZ3RoIDw9IDEgJiYgaXRlbS5hdXRvUmVkdWNlKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Rpc2FibGVkLWxpbmsnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgaWYgKGlzSXRlbURpc2FibGVkKGl0ZW0uaXRlbXNbMF0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goJ2Rpc2FibGVkLWxpbmsnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQucHVzaChpdGVtLmlkKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZ2V0SXRlbUNsYXNzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZGl2aWRlcicpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCdkaXZpZGVyJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdzdWJtZW51JyB8fCBpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA8PSAxICYmIGl0ZW0uYXV0b1JlZHVjZSkge1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaCgnZHJvcGRvd24tc3VibWVudScpO1xuICAgICAgICAgICAgICAvLyBBZGQgYW55IGV4dHJhIHN1Ym1lbnUgY2xhc3Nlcy4gKGUuZy4gdG8gc3BlY2lmeSBpZiBpdCBzaG91bGQgYmUgbGVmdCBvciByaWdodCkuXG4gICAgICAgICAgICAgIGlmICgkc2NvcGUuc3VibWVudUNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2goXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdWJtZW51Q2xhc3Nlcy5zcGxpdCgnICcpLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUucnVuQWN0aW9uID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLml0ZW1zICYmIGl0ZW0uaXRlbXMubGVuZ3RoID09PSAxICYmIGl0ZW0uYXV0b1JlZHVjZSkge1xuICAgICAgICAgICAgaXRlbS5pdGVtc1swXS5hY3Rpb24oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmFjdGlvbikpIHtcbiAgICAgICAgICAgICAgaXRlbS5hY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmdldE5hbWUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSAnJztcbiAgICAgICAgICBpZiAoaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiBpdGVtLmF1dG9SZWR1Y2UpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zWzBdLnJlZHVjZWROYW1lKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSBpdGVtLml0ZW1zWzBdLnJlZHVjZWROYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmFtZSA9IGl0ZW0uaXRlbXNbMF0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTWVudUl0ZW1DaGVja2VkID0gZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpdGVtLmlzQ2hlY2tlZCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXNDaGVja2VkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pc0NoZWNrZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICBzY29wZS5nZXRTdWJJdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oc2NvcGUuaXRlbS5pdGVtcykpIHtcbiAgICAgICAgICAgIHJldHVybiBzY29wZS5pdGVtLml0ZW1zKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzY29wZS5pdGVtLml0ZW1zO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oJ2dldFN1Ykl0ZW1zKCknLCBmdW5jdGlvbihpdGVtcywgb2xkSXRlbXMpIHtcbiAgICAgICAgICBpZiAoIV8uaXNFbXB0eShpdGVtcykpIHtcbiAgICAgICAgICAgIC8vanNjczpkaXNhYmxlXG4gICAgICAgICAgICAkY29tcGlsZSgnPGJrLWRyb3Bkb3duLW1lbnUgbWVudS1pdGVtcz1cImdldFN1Ykl0ZW1zKClcIj48L2JrLWRyb3Bkb3duLW1lbnU+Jykoc2NvcGUsIGZ1bmN0aW9uKGNsb25lZCwgc2NvcGUpIHtcbiAgICAgICAgICAgIC8vanNjczplbmFibGVcbiAgICAgICAgICAgICAgZWxlbWVudC5maW5kKCd1bC5kcm9wZG93bi1tZW51JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIG1vZHVsZS5kaXJlY3RpdmUoJ2JrRW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICBlbGVtZW50LmJpbmQoJ2tleWRvd24ga2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMuYmtFbnRlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgbW9kdWxlLmRpcmVjdGl2ZSgnYmtMYW5ndWFnZUxvZ28nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiAnPHNwYW4gbmctc3R5bGU9XCJzdHlsZVwiPnt7bmFtZX19PC9zcGFuPicsXG4gICAgICBzY29wZToge1xuICAgICAgICBuYW1lOiAnQCcsXG4gICAgICAgIGJnQ29sb3I6ICdAJyxcbiAgICAgICAgZmdDb2xvcjogJ0AnLFxuICAgICAgICBib3JkZXJDb2xvcjogJ0AnXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLnN0eWxlID0ge1xuICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogc2NvcGUuYmdDb2xvcixcbiAgICAgICAgICAnY29sb3InOiBzY29wZS5mZ0NvbG9yXG4gICAgICAgIH07XG4gICAgICAgIHZhciB1cGRhdGVTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLnN0eWxlID0ge1xuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBzY29wZS5iZ0NvbG9yLFxuICAgICAgICAgICAgJ2NvbG9yJzogc2NvcGUuZmdDb2xvclxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHNjb3BlLmJvcmRlckNvbG9yKSB7XG4gICAgICAgICAgICBzY29wZS5zdHlsZVsnYm9yZGVyLXdpZHRoJ10gPSAnMXB4JztcbiAgICAgICAgICAgIHNjb3BlLnN0eWxlWydib3JkZXItY29sb3InXSA9IHNjb3BlLmJvcmRlckNvbG9yO1xuICAgICAgICAgICAgc2NvcGUuc3R5bGVbJ2JvcmRlci1zdHlsZSddID0gJ3NvbGlkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLnN0eWxlWydib3JkZXItd2lkdGgnXTtcbiAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5zdHlsZVsnYm9yZGVyLWNvbG9yJ107XG4gICAgICAgICAgICBkZWxldGUgc2NvcGUuc3R5bGVbJ2JvcmRlci1zdHlsZSddO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdiZ0NvbG9yJywgdXBkYXRlU3R5bGUpO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2ZnQ29sb3InLCB1cGRhdGVTdHlsZSk7XG4gICAgICAgIHNjb3BlLiR3YXRjaCgnYm9yZGVyQ29sb3InLCB1cGRhdGVTdHlsZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuYW5ndWxhclV0aWxzXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBBbmd1bGFySlMgc3BlY2lmaWMgdXRpbGl0aWVzIHRoYXQgYXJlIHNoYXJlZCBhY3Jvc3MgdGhlIHdob2xlIGFwcGxpY2F0aW9uLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5hbmd1bGFyVXRpbHMnLCBbXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdhbmd1bGFyVXRpbHMnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRodHRwLCAkcSwgJHRpbWVvdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0TG9jYXRpb246IGZ1bmN0aW9uKG5ld0xvY2F0aW9uKSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKG5ld0xvY2F0aW9uKTtcbiAgICAgIH0sXG4gICAgICByZWZyZXNoUm9vdFNjb3BlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kJHBoYXNlIHx8ICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgdG9QcmV0dHlKc29uOiBmdW5jdGlvbihhbmd1bGFyQm91bmRKc09iaikge1xuICAgICAgICBpZihhbmd1bGFyQm91bmRKc09iai5jZWxscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgYW5ndWxhckJvdW5kSnNPYmouY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5ib2R5ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmJvZHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uYm9keSA9IGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmJvZHkuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQgIT09IHVuZGVmaW5lZCAmJiBhbmd1bGFyQm91bmRKc09iai5jZWxsc1tpXS5pbnB1dC5ib2R5ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgYW5ndWxhckJvdW5kSnNPYmouY2VsbHNbaV0uaW5wdXQuYm9keSA9IGFuZ3VsYXJCb3VuZEpzT2JqLmNlbGxzW2ldLmlucHV0LmJvZHkuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNsZWFudXAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgIGlmIChrZXkgPT09ICckJGhhc2hLZXknKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJldCA9IEpTT04uc3RyaW5naWZ5KGFuZ3VsYXJCb3VuZEpzT2JqLCBjbGVhbnVwLCA0KSArIFwiXFxuXCI7XG4gICAgICAgIHRoaXMucmVtb3ZlU3RyaW5nQXJyYXlzKGFuZ3VsYXJCb3VuZEpzT2JqKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG4gICAgICByZW1vdmVTdHJpbmdBcnJheXM6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBpZihvYmouY2VsbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaSA8IG9iai5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9iai5jZWxsc1tpXS5ib2R5ICE9PSB1bmRlZmluZWQgJiYgJC5pc0FycmF5KG9iai5jZWxsc1tpXS5ib2R5KSkge1xuICAgICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gJ1xcbic7XG4gICAgICAgICAgICAgIG9iai5jZWxsc1tpXS5ib2R5ID0gb2JqLmNlbGxzW2ldLmJvZHkuam9pbihbc2VwYXJhdG9yXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqLmNlbGxzW2ldLmlucHV0ICE9PSB1bmRlZmluZWQgJiYgb2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgIT09IHVuZGVmaW5lZCAmJiAkLmlzQXJyYXkob2JqLmNlbGxzW2ldLmlucHV0LmJvZHkpKSB7XG4gICAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSAnXFxuJztcbiAgICAgICAgICAgICAgb2JqLmNlbGxzW2ldLmlucHV0LmJvZHkgPSBvYmouY2VsbHNbaV0uaW5wdXQuYm9keS5qb2luKFtzZXBhcmF0b3JdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmcm9tUHJldHR5SnNvbjogZnVuY3Rpb24oanNvblN0cmluZykge1xuICAgICAgICAgIHZhciByZXQgPSBhbmd1bGFyLmZyb21Kc29uKGpzb25TdHJpbmcpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlU3RyaW5nQXJyYXlzKHJldCk7XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG4gICAgICBodHRwR2V0OiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHttZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsLCBwYXJhbXM6IGRhdGF9KTtcbiAgICAgIH0sXG4gICAgICBodHRwUG9zdDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICBkYXRhOiAkLnBhcmFtKGRhdGEpLFxuICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGh0dHBQdXRKc29uOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBuZXdEZWZlcnJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkcS5kZWZlcigpO1xuICAgICAgfSxcbiAgICAgIG5ld1Byb21pc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJHEuYWxsLmFwcGx5KCRxLCBhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICAgIGZjYWxsOiBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZnVuYygpKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHRpbWVvdXQ6IGZ1bmN0aW9uIChmdW5jLCBtcykge1xuICAgICAgICByZXR1cm4gJHRpbWVvdXQoZnVuYywgbXMpO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbFRpbWVvdXQ6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHByb21pc2UpO1xuICAgICAgfSxcbiAgICAgIGRlbGF5OiBmdW5jdGlvbihtcykge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIH0sIG1zKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBUaGlzIGlzIGEgcmV1c2FibGUgVUkgY29tcG9uZW50IGZvciB0cmVlIHZpZXdzLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHRyZWVWaWV3ID0gYW5ndWxhci5tb2R1bGUoJ2JrLnRyZWVWaWV3JywgWyduZ0FuaW1hdGUnXSk7XG5cbiAgdHJlZVZpZXcuZmFjdG9yeSgnZmlsZVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3Byb3ZpZGVyID0ge307XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldFByb3ZpZGVyOiBmdW5jdGlvbihwcm92aWRlcnMpIHtcbiAgICAgICAgX3Byb3ZpZGVyID0gcHJvdmlkZXJzO1xuICAgICAgfSxcbiAgICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbih1cmksIGNhbGxiYWNrKSB7XG4gICAgICAgIF9wcm92aWRlci5nZXRDaGlsZHJlbih1cmksIGNhbGxiYWNrKTtcbiAgICAgIH0sXG4gICAgICBmaWxsSW5wdXQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICBfcHJvdmlkZXIuZmlsbElucHV0KHVyaSk7XG4gICAgICB9LFxuICAgICAgb3BlbjogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIF9wcm92aWRlci5vcGVuKHVyaSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgdHJlZVZpZXcuZGlyZWN0aXZlKFwidHJlZVZpZXdcIiwgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUsICRyb290U2NvcGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBcIjx0cmVlLW5vZGUgZGF0YT0ncm9vdCcgZnM9J2ZzJyBkaXNwbGF5bmFtZT0ne3sgcm9vdHVyaSB9fSc+PC90cmVlLW5vZGU+XCIsXG4gICAgICBzY29wZToge3Jvb3R1cmk6IFwiQFwiLCBmczogXCI9XCJ9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgIGlmICghJHRlbXBsYXRlQ2FjaGUuZ2V0KCd0cmVlTm9kZUNoaWxkcmVuLmh0bWwnKSkge1xuICAgICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgndHJlZU5vZGVDaGlsZHJlbi5odG1sJywgXCI8dHJlZS1ub2RlIGNsYXNzPSdiay10cmVldmlldycgbmctcmVwZWF0PSdkIGluIGRhdGEuY2hpbGRyZW4gfCBmaWxlRmlsdGVyOmZzLmZpbHRlciB8IG9yZGVyQnk6ZnMuZ2V0T3JkZXJCeSgpOmZzLmdldE9yZGVyUmV2ZXJzZSgpJyBkYXRhPSdkJyBmcz0nZnMnPjwvdHJlZS1ub2RlPlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghXy5zdHJpbmcuZW5kc1dpdGgoJHNjb3BlLnJvb3R1cmksICcvJykpIHtcbiAgICAgICAgICAkc2NvcGUucm9vdHVyaSA9ICRzY29wZS5yb290dXJpICsgJy8nO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzID0gJHJvb3RTY29wZS5mc1ByZWZzIHx8IHtcbiAgICAgICAgICBvcGVuRm9sZGVyczogW11cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUucm9vdCA9IHtcbiAgICAgICAgICB0eXBlOiBcImRpcmVjdG9yeVwiLFxuICAgICAgICAgIHVyaTogJHNjb3BlLnJvb3R1cmksXG4gICAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5jb250YWlucygkcm9vdFNjb3BlLmZzUHJlZnMub3BlbkZvbGRlcnMsICRzY29wZS5yb290dXJpKSkge1xuICAgICAgICAgICRzY29wZS5mcy5nZXRDaGlsZHJlbigkc2NvcGUucm9vdHVyaSwgJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLnJvb3QuY2hpbGRyZW4gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICB0cmVlVmlldy5maWx0ZXIoXCJmaWxlRmlsdGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihjaGlsZHJlbiwgZmlsdGVyKSB7XG4gICAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGZpbHRlcikgPyBfKGNoaWxkcmVuKS5maWx0ZXIoZmlsdGVyKSA6IGNoaWxkcmVuO1xuICAgIH07XG4gIH0pXG5cbiAgdHJlZVZpZXcuZGlyZWN0aXZlKFwidHJlZU5vZGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogXCI8c3BhbiBuZy1kYmxjbGljaz0nZGJsQ2xpY2soKScgbmctY2xpY2s9J2NsaWNrKCknPjxpIGNsYXNzPSd7eyBnZXRJY29uKCkgfX0nPjwvaT4gPHNwYW4+e3sgZ2V0RGlzcGxheU5hbWUoKSB9fTwvc3Bhbj48L3NwYW4+XCIgK1xuICAgICAgICAgIFwiPGRpdiBjbGFzcz0ncHVzaHJpZ2h0Jz5cIiArXG4gICAgICAgICAgXCI8ZGl2IG5nLWluY2x1ZGU9J1xcXCJ0cmVlTm9kZUNoaWxkcmVuLmh0bWxcXFwiJz48L2Rpdj5cIiArXG4gICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgIHNjb3BlOiB7ZGF0YTogXCI9XCIsIGZzOiBcIj1cIiwgZGlzcGxheW5hbWU6IFwiQFwifSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSkge1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gZnVuY3Rpb24oYykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBjLnR5cGUsXG4gICAgICAgICAgICB1cmk6IGMudXJpLFxuICAgICAgICAgICAgbW9kaWZpZWQ6IGMubW9kaWZpZWQsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogYy5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBfLm1hcChjLmNoaWxkcmVuLCB0cmFuc2Zvcm0pXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgICAgICAgIHZhciB1cmkgPSAkc2NvcGUuZGF0YS51cmk7XG4gICAgICAgICAgICBpZiAoIV8uc3RyaW5nLmVuZHNXaXRoKHVyaSwgJy8nKSkge1xuICAgICAgICAgICAgICB1cmkgPSB1cmkgKyAnLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuZnMuZmlsbElucHV0KHVyaSk7XG4gICAgICAgICAgICAvLyB0b2dnbGVcbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KCRzY29wZS5kYXRhLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5jaGlsZHJlbi5zcGxpY2UoMCwgJHNjb3BlLmRhdGEuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzID0gXy5yZWplY3QoJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzLCBmdW5jdGlvbihmb2xkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5zdHJpbmcuc3RhcnRzV2l0aChmb2xkZXIsIHVyaSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJHJvb3RTY29wZS5mc1ByZWZzLm9wZW5Gb2xkZXJzLnB1c2godXJpKTtcbiAgICAgICAgICAgICAgJHNjb3BlLmZzLmdldENoaWxkcmVuKCRzY29wZS5kYXRhLnVyaSkuc3VjY2VzcyhmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gXy5zb3J0QnkoY2hpbGRyZW4sIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjLnR5cGUgPT09IFwiZGlyZWN0b3J5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiISEhISFcIiArIGMudXJpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYy51cmkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5jaGlsZHJlbiA9IF8ubWFwKGNoaWxkcmVuLCB0cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLmZzLmZpbGxJbnB1dCgkc2NvcGUuZGF0YS51cmkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmRibENsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnR5cGUgPT09ICdkaXJlY3RvcnknKSByZXR1cm47XG5cbiAgICAgICAgICAkc2NvcGUuZnMub3Blbigkc2NvcGUuZGF0YS51cmkpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0SWNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS50eXBlID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2ZvbGRlci1pY29uJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5kYXRhLnR5cGUgPT09IFwiYXBwbGljYXRpb24vcHJzLnR3b3NpZ21hLmJlYWtlci5ub3RlYm9vaytqc29uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi1ib29rJztcbiAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5mcy5nZXRJY29uICYmICRzY29wZS5mcy5nZXRJY29uKCRzY29wZS5kYXRhLnR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmZzLmdldEljb24oJHNjb3BlLmRhdGEudHlwZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnZ2x5cGhpY29uIGdseXBoaWNvbi10aCc7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5nZXREaXNwbGF5TmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkc2NvcGUuZGlzcGxheW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZGlzcGxheW5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2NvcGUuZGF0YS5kaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5kYXRhLmRpc3BsYXlOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbmFtZSA9ICRzY29wZS5kYXRhLnVyaTtcbiAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPiAwICYmIG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJy8nKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMCwgbmFtZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLmNvbWV0ZFV0aWxzXG4gKiBUaGlzIG1vZHVsZSBvZmZlcnMgdGhlIGNvbWV0ZCBzZXJ2aWNlIHRoYXQgaXMgdXNlZCB0byByZWNlaXZlICdwdXNoZXMnIGZyb20gdGhlIHNlcnZlci5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsuY29tZXRkVXRpbHMnLCBbXSk7XG4gIG1vZHVsZS5mYWN0b3J5KCdjb21ldGRVdGlscycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3N0YXR1c0xpc3RlbmVyO1xuICAgIHZhciBfb3V0cHV0TGlzdGVuZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXRpYWxpemVDb21ldGQ6IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICAkLmNvbWV0ZC5pbml0KHtcbiAgICAgICAgICB1cmw6IHVyaVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhZGRDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcjogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgICAgX3N0YXR1c0xpc3RlbmVyID0gJC5jb21ldGQuYWRkTGlzdGVuZXIoXCIvbWV0YS9jb25uZWN0XCIsIGNiKTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3N0YXR1c0xpc3RlbmVyKSB7XG4gICAgICAgICAgJC5jb21ldGQucmVtb3ZlTGlzdGVuZXIoX3N0YXR1c0xpc3RlbmVyKTtcbiAgICAgICAgICBfc3RhdHVzTGlzdGVuZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhZGRPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcjogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgX291dHB1dExpc3RlbmVyID0gJC5jb21ldGQuc3Vic2NyaWJlKFwiL291dHB1dGxvZ1wiLCBjYik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlT3V0cHV0bG9nVXBkYXRlTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF9vdXRwdXRMaXN0ZW5lcikge1xuICAgICAgICAgICQuY29tZXRkLnJlbW92ZUxpc3RlbmVyKF9vdXRwdXRMaXN0ZW5lcik7XG4gICAgICAgICAgX291dHB1dExpc3RlbmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVPdXRwdXRsb2dVcGRhdGVMaXN0ZW5lcigpO1xuICAgICAgICByZXR1cm4gJC5jb21ldGQuZGlzY29ubmVjdCgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLm5vdGVib29rVmVyc2lvbk1hbmFnZXJcbiAqIE9mZmVycyB1dGlsaXRpZXMgdG8gY29udmVydCBiZWFrZXIgbm90ZWJvb2sgb2Ygb2xkIHZlcnNpb25zIHRvIHRoZSBsYXRlc3QgdmVyc2lvblxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5ub3RlYm9va1ZlcnNpb25NYW5hZ2VyJywgW10pO1xuXG4gIHZhciBia05iVjFDb252ZXJ0ZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgLy8gaW4gdjEsIGNlbGwgbGV2ZWwgYnkgZGVmaW5pdGlvbiBpcyB0aGUgY291bnQgb2Ygc3RlcHMgYXdheSBmcm9tIFwicm9vdFwiIGluIHRoZSB0cmVlXG4gICAgdmFyIGdldFNlY3Rpb25DZWxsTGV2ZWwgPSBmdW5jdGlvbihjZWxsLCB0YWdNYXApIHtcbiAgICAgIHZhciBnZXRQYXJlbnRJZCA9IGZ1bmN0aW9uKGNJZCkge1xuICAgICAgICB2YXIgcElkID0gbnVsbDtcbiAgICAgICAgXyh0YWdNYXApLmZpbmQoZnVuY3Rpb24odiwgaykge1xuICAgICAgICAgIGlmIChfKHYpLmNvbnRhaW5zKGNJZCkpIHtcbiAgICAgICAgICAgIHBJZCA9IGs7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcElkO1xuICAgICAgfTtcbiAgICAgIHZhciBsZXZlbCA9IDA7XG4gICAgICB2YXIgcGFyZW50SWQgPSBnZXRQYXJlbnRJZChjZWxsLmlkKTtcbiAgICAgIHdoaWxlIChwYXJlbnRJZCkge1xuICAgICAgICArK2xldmVsO1xuICAgICAgICBwYXJlbnRJZCA9IGdldFBhcmVudElkKHBhcmVudElkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZXZlbDtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0Q29kZUNlbGwgPSBmdW5jdGlvbihjZWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBcImlkXCI6IGNlbGwuaWQsXG4gICAgICAgIFwidHlwZVwiOiBcImNvZGVcIixcbiAgICAgICAgXCJldmFsdWF0b3JcIjogY2VsbC5ldmFsdWF0b3IsXG4gICAgICAgIFwiaW5wdXRcIjogY2VsbC5pbnB1dCxcbiAgICAgICAgXCJvdXRwdXRcIjogY2VsbC5vdXRwdXRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydFNlY3Rpb25DZWxsID0gZnVuY3Rpb24oY2VsbCwgdGFnTWFwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBcImlkXCI6IGNlbGwuaWQsXG4gICAgICAgIFwidHlwZVwiOiBcInNlY3Rpb25cIixcbiAgICAgICAgXCJsZXZlbFwiOiBnZXRTZWN0aW9uQ2VsbExldmVsKGNlbGwsIHRhZ01hcCksXG4gICAgICAgIFwidGl0bGVcIjogY2VsbC50aXRsZSxcbiAgICAgICAgXCJjb2xsYXBzZWRcIjogY2VsbC5jb2xsYXBzZWRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydFRleHRDZWxsID0gZnVuY3Rpb24oY2VsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJpZFwiOiBjZWxsLmlkLFxuICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgIFwiYm9keVwiOiBjZWxsLmJvZHlcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydE1hcmtkb3duQ2VsbCA9IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiaWRcIjogY2VsbC5pZCxcbiAgICAgICAgXCJ0eXBlXCI6IFwibWFya2Rvd25cIixcbiAgICAgICAgXCJib2R5XCI6IGNlbGwuYm9keSxcbiAgICAgICAgXCJtb2RlXCI6IGNlbGwubW9kZVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0Q2VsbCA9IGZ1bmN0aW9uKGNlbGwsIHRhZ01hcCwgdGFnTWFwMikge1xuICAgICAgdmFyIHJldENlbGw7XG4gICAgICBzd2l0Y2ggKGNlbGwuY2xhc3NbMF0pIHtcbiAgICAgICAgY2FzZSBcImNvZGVcIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydENvZGVDZWxsKGNlbGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2VjdGlvblwiOlxuICAgICAgICAgIHJldENlbGwgPSBjb252ZXJ0U2VjdGlvbkNlbGwoY2VsbCwgdGFnTWFwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydFRleHRDZWxsKGNlbGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWFya2Rvd25cIjpcbiAgICAgICAgICByZXRDZWxsID0gY29udmVydE1hcmtkb3duQ2VsbChjZWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0YWdNYXAyICYmIF8odGFnTWFwMi5pbml0aWFsaXphdGlvbikuY29udGFpbnMoY2VsbC5pZCkpIHtcbiAgICAgICAgcmV0Q2VsbC5pbml0aWFsaXphdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0Q2VsbDtcbiAgICB9O1xuICAgIHZhciBnZXRDZWxsSWRzID0gZnVuY3Rpb24oY2VsbHMsIHRhZ01hcCkge1xuICAgICAgdmFyIGNlbGxJZHMgPSBbXTtcbiAgICAgIHZhciBjSWQsIGNoaWxkcmVuO1xuICAgICAgdmFyIHN0YWNrID0gW1wicm9vdFwiXTtcbiAgICAgIHdoaWxlICghXy5pc0VtcHR5KHN0YWNrKSkge1xuICAgICAgICBjSWQgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgY2VsbElkcy5wdXNoKGNJZCk7XG4gICAgICAgIGlmICh0YWdNYXAuaGFzT3duUHJvcGVydHkoY0lkKSkge1xuICAgICAgICAgIGNoaWxkcmVuID0gXyh0YWdNYXBbY0lkXSkuY2xvbmUoKTtcbiAgICAgICAgICBpZiAoIV8oY2hpbGRyZW4pLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgc3RhY2sgPSBzdGFjay5jb25jYXQoY2hpbGRyZW4ucmV2ZXJzZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjZWxsSWRzO1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlQ2VsbE1hcCA9IGZ1bmN0aW9uKGNlbGxzKSB7XG4gICAgICB2YXIgY2VsbE1hcCA9IHt9O1xuICAgICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgIGNlbGxNYXBbY2VsbC5pZF0gPSBjZWxsO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY2VsbE1hcDtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0Q2VsbHMgPSBmdW5jdGlvbihjZWxscywgdGFnTWFwLCB0YWdNYXAyKSB7XG4gICAgICB2YXIgY2VsbElkcyA9IGdldENlbGxJZHMoY2VsbHMsIHRhZ01hcCk7XG4gICAgICB2YXIgY2VsbE1hcCA9IGdlbmVyYXRlQ2VsbE1hcChjZWxscyk7XG4gICAgICB2YXIgdjJDZWxscyA9IF8oY2VsbElkcykuY2hhaW4oKVxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZCAhPT0gXCJyb290XCI7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbE1hcFtpZF07XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiAhY2VsbC5oaWRlVGl0bGU7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0Q2VsbChjZWxsLCB0YWdNYXAsIHRhZ01hcDIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnZhbHVlKCk7XG4gICAgICByZXR1cm4gdjJDZWxscztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnZlcnQ6IGZ1bmN0aW9uKG5vdGVib29rVjEpIHtcbiAgICAgICAgdmFyIG5vdGVib29rVjIgPSB7XG4gICAgICAgICAgYmVha2VyOiBcIjJcIixcbiAgICAgICAgICBldmFsdWF0b3JzOiBub3RlYm9va1YxLmV2YWx1YXRvcnMsXG4gICAgICAgICAgY2VsbHM6IGNvbnZlcnRDZWxscyhub3RlYm9va1YxLmNlbGxzLCBub3RlYm9va1YxLnRhZ01hcCwgbm90ZWJvb2tWMS50YWdNYXAyKSxcbiAgICAgICAgICBsb2NrZWQ6IG5vdGVib29rVjEubG9ja2VkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub3RlYm9va1YyO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG5cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrTm90ZWJvb2tWZXJzaW9uTWFuYWdlcicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiBmdW5jdGlvbihub3RlYm9vaykge1xuICAgICAgICBpZiAoXy5pc0VtcHR5KG5vdGVib29rKSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImJlYWtlclwiOiBcIjJcIixcbiAgICAgICAgICAgIFwiZXZhbHVhdG9yc1wiOiBbXSxcbiAgICAgICAgICAgIFwiY2VsbHNcIjogW11cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIG5vdGVib29rIGlzIGEgc3RyaW5nLCBwYXJzZSBpdCB0byBqcyBvYmplY3RcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobm90ZWJvb2spKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vdGVib29rID0gYW5ndWxhci5mcm9tSnNvbihub3RlYm9vayk7XG4gICAgICAgICAgICAvLyBUT0RPLCB0byBiZSByZW1vdmVkLiBMb2FkIGEgY29ycnVwdGVkIG5vdGVib29rLlxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcobm90ZWJvb2spKSB7XG4gICAgICAgICAgICAgIG5vdGVib29rID0gYW5ndWxhci5mcm9tSnNvbihub3RlYm9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGlzIGlzIG5vdCBhIHZhbGlkIEJlYWtlciBub3RlYm9vayBKU09OXCIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihub3RlYm9vayk7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJOb3QgYSB2YWxpZCBCZWFrZXIgbm90ZWJvb2tcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYmVha2VyIHZlcnNpb24gaXMgdW5kZWZpbmVkXG4gICAgICAgIC8vIHRyZWF0IGl0IGFzIGJlYWtlciBub3RlYm9vayB2MVxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChub3RlYm9vay5iZWFrZXIpKSB7XG4gICAgICAgICAgbm90ZWJvb2suYmVha2VyID0gXCIxXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9jaGVjayB2ZXJzaW9uIGFuZCBzZWUgaWYgbmVlZCBjb252ZXJzaW9uXG4gICAgICAgIGlmIChub3RlYm9vay5iZWFrZXIgPT09IFwiMVwiKSB7XG4gICAgICAgICAgbm90ZWJvb2sgPSBia05iVjFDb252ZXJ0ZXIuY29udmVydChub3RlYm9vayk7XG4gICAgICAgIH0gZWxzZSBpZiAobm90ZWJvb2suYmVha2VyID09PSBcIjJcIikge1xuICAgICAgICAgIC8vIGdvb2QsIFwiMlwiIGlzIHRoZSBjdXJyZW50IHZlcnNpb25cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBcIlVua25vd24gQmVha2VyIG5vdGVib29rIHZlcnNpb25cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3RlYm9vaztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDE0IFRXTyBTSUdNQSBPUEVOIFNPVVJDRSwgTExDXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vKipcbiAqIE1vZHVsZSBiay5vdXRwdXRMb2dcbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIHNlcnZpY2Ugb2YgZ2V0IG91dHB1dCBsb2cgZnJvbSB0aGUgc2VydmVyLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5vdXRwdXRMb2cnLCBbJ2JrLnV0aWxzJywgJ2JrLmNvbWV0ZFV0aWxzJ10pO1xuICBtb2R1bGUuZmFjdG9yeSgnYmtPdXRwdXRMb2cnLCBmdW5jdGlvbiAoYmtVdGlscywgY29tZXRkVXRpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0TG9nOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgYmtVdGlscy5odHRwR2V0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3Qvb3V0cHV0bG9nL2dldFwiKSwge30pXG4gICAgICAgICAgICAuc3VjY2VzcyhjYilcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbGVkIHRvIGdldCBvdXRwdXQgbG9nXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLmFkZE91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyKGNiKTtcbiAgICAgIH0sXG4gICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbWV0ZFV0aWxzLnJlbW92ZU91dHB1dGxvZ1VwZGF0ZUxpc3RlbmVyKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiAgTW9kdWxlIGJrLnJlY2VudE1lbnVcbiAqICBUaGlzIG1vZHVsZSBvd25zIHRoZSBzZXJ2aWNlIG9mIHJldHJpZXZpbmcgcmVjZW50IG1lbnUgaXRlbXMgYW5kIHVwZGF0aW5nIHRoZSByZWNlbnQgbWVudS5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYmsucmVjZW50TWVudScsIFsnYmsuYW5ndWxhclV0aWxzJ10pO1xuXG4gIG1vZHVsZS5wcm92aWRlcihcImJrUmVjZW50TWVudVwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3NlcnZlciA9IG51bGw7XG4gICAgdGhpcy5jb25maWdTZXJ2ZXIgPSBmdW5jdGlvbihzZXJ2ZXIpIHtcbiAgICAgIF9zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgfTtcbiAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbihhbmd1bGFyVXRpbHMpIHtcbiAgICAgIHZhciBvcEl0ZW1zID0ge1xuICAgICAgICBFTVBUWToge25hbWU6IFwiKEVtcHR5KVwiLCBkaXNhYmxlZDogdHJ1ZX0sXG4gICAgICAgIERJVklERVI6IHt0eXBlOiBcImRpdmlkZXJcIn0sXG4gICAgICAgIENMRUFSSU5HOiB7bmFtZTogXCIoQ2xlYXJpbmcuLi4pXCIsIGRpc2FibGVkOiB0cnVlfSxcbiAgICAgICAgVVBEQVRJTkc6IHtuYW1lOiBcIihVcGRhdGluZy4uLilcIiwgZGlzYWJsZWQ6IHRydWV9LFxuICAgICAgICBDTEVBUjoge25hbWU6IFwiQ2xlYXJcIiwgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhck1lbnUoKTtcbiAgICAgICAgfSB9LFxuICAgICAgICBSRUZSRVNIOiB7bmFtZTogXCJSZWZyZXNoXCIsIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVmcmVzaE1lbnUoKTtcbiAgICAgICAgfSB9XG4gICAgICB9O1xuICAgICAgdmFyIF9yZWNlbnRNZW51ID0gW29wSXRlbXMuRU1QVFldO1xuICAgICAgdmFyIHJlZnJlc2hNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3NlcnZlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfcmVjZW50TWVudS5zcGxpY2UoMCwgX3JlY2VudE1lbnUubGVuZ3RoLCBvcEl0ZW1zLlVQREFUSU5HKTtcbiAgICAgICAgX3NlcnZlci5nZXRJdGVtcyhmdW5jdGlvbihpdGVtcykge1xuICAgICAgICAgIHZhciBpLCBISVNUT1JZX0xFTkdUSCA9IDEwO1xuICAgICAgICAgIHZhciBnZXRTaG9ydE5hbWUgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgIGlmICh1cmwgJiYgdXJsW3VybC5sZW5ndGggLSAxXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChfLmlzRW1wdHkoaXRlbXMpKSB7XG4gICAgICAgICAgICBfcmVjZW50TWVudS5zcGxpY2UoMCwgX3JlY2VudE1lbnUubGVuZ3RoLCBvcEl0ZW1zLkVNUFRZKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoICYmIGkgPCBISVNUT1JZX0xFTkdUSDsgKytpKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBhbmd1bGFyLmZyb21Kc29uKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgICAgICAgIF9yZWNlbnRNZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnZXRTaG9ydE5hbWUoaXRlbS51cmkpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIF9wYXRoT3BlbmVyLm9wZW4oaXRlbS51cmksIGl0ZW0udHlwZSwgaXRlbS5yZWFkT25seSwgaXRlbS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBpdGVtLnVyaVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGV4aXN0cyBvbmx5IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgX3JlY2VudE1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdldFNob3J0TmFtZShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfcGF0aE9wZW5lci5vcGVuKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBpdGVtXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGFuZ3VsYXJVdGlscy5yZWZyZXNoUm9vdFNjb3BlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBjbGVhck1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgX3JlY2VudE1lbnUuc3BsaWNlKDAsIF9yZWNlbnRNZW51Lmxlbmd0aCwgb3BJdGVtcy5DTEVBUklORyk7XG4gICAgICAgIF9zZXJ2ZXIuY2xlYXIocmVmcmVzaE1lbnUpO1xuICAgICAgfTtcblxuICAgICAgdmFyIF9wYXRoT3BlbmVyO1xuICAgICAgcmVmcmVzaE1lbnUoKTsgLy8gaW5pdGlhbGl6ZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24ocGF0aE9wZW5lcikge1xuICAgICAgICAgIF9wYXRoT3BlbmVyID0gcGF0aE9wZW5lcjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TWVudUl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3JlY2VudE1lbnU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlY29yZFJlY2VudERvY3VtZW50OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaWYgKF9zZXJ2ZXIpIHtcbiAgICAgICAgICAgIF9zZXJ2ZXIuYWRkSXRlbShpdGVtLCByZWZyZXNoTWVudSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnNlc3Npb25cbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIHNlcnZpY2VzIG9mIGNvbW11bmljYXRpbmcgdG8gdGhlIHNlc3Npb24gYmFja3VwIGVuZCBwb2ludCB0byBsb2FkIGFuZFxuICogdXBsb2FkKGJhY2t1cCkgYSBzZXNzaW9uLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay5zZXNzaW9uJywgWydiay51dGlscyddKTtcbiAgLyoqXG4gICAqIGJrU2Vzc2lvblxuICAgKiAtIHRhbGtzIHRvIGJlYWtlciBzZXJ2ZXIgKC9iZWFrZXIvcmVzdC9zZXNzaW9uKVxuICAgKiAtIGJrU2Vzc2lvbk1hbmFnZXIgc2hvdWxkIGRlcGVuZCBvbiBpdCB0byB1cGRhdGUvYmFja3VwIHRoZSBzZXNzaW9uIG1vZGVsXG4gICAqL1xuICBtb2R1bGUuZmFjdG9yeSgnYmtTZXNzaW9uJywgZnVuY3Rpb24oYmtVdGlscykge1xuICAgIHZhciBiYWNrdXBTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbklkLCBzZXNzaW9uRGF0YSkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmtVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgYmtVdGlscy5odHRwUG9zdChia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2JhY2t1cC9cIiArIHNlc3Npb25JZCksIHNlc3Npb25EYXRhKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gYmFja3VwIHNlc3Npb246IFwiICsgc2Vzc2lvbklkICsgXCIsIFwiICsgc3RhdHVzKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIkZhaWxlZCB0byBiYWNrdXAgc2Vzc2lvbjogXCIgKyBzZXNzaW9uSWQgKyBcIiwgXCIgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2Vzc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGJrVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIGJrVXRpbHMuaHR0cEdldChia1V0aWxzLnNlcnZlclVybChcImJlYWtlci9yZXN0L3Nlc3Npb24tYmFja3VwL2dldEV4aXN0aW5nU2Vzc2lvbnNcIikpXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2Vzc2lvbnMpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc2Vzc2lvbnMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoXCJGYWlsZWQgdG8gZ2V0IGV4aXN0aW5nIHNlc3Npb25zIFwiICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gICAgdmFyIGxvYWRTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9sb2FkXCIpLCB7c2Vzc2lvbmlkOiBzZXNzaW9uSWR9KVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNlc3Npb24sIHN0YXR1cykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzZXNzaW9uKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiRmFpbGVkIHRvIGxvYWQgc2Vzc2lvbjogXCIgKyBzZXNzaW9uSWQgKyBcIiwgXCIgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICB2YXIgY2xvc2VTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbklkKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBQb3N0KGJrVXRpbHMuc2VydmVyVXJsKFwiYmVha2VyL3Jlc3Qvc2Vzc2lvbi1iYWNrdXAvY2xvc2VcIiksIHtzZXNzaW9uaWQ6IHNlc3Npb25JZH0pXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNlc3Npb25JZCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIkZhaWxlZCB0byBjbG9zZSBzZXNzaW9uOiBcIiArIHNlc3Npb25JZCArIFwiLCBcIiArIHN0YXR1cyk7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xuICAgIHZhciByZWNvcmRMb2FkZWRQbHVnaW4gPSBmdW5jdGlvbihwbHVnaW5OYW1lLCBwbHVnaW5VcmwpIHtcbiAgICAgIGJrVXRpbHMuaHR0cFBvc3QoXG4gICAgICAgICAgYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9hZGRQbHVnaW5cIiksXG4gICAgICAgICAge3BsdWdpbm5hbWU6IHBsdWdpbk5hbWUsIHBsdWdpbnVybDogcGx1Z2luVXJsfSlcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZWNvcmRMb2FkZWRQbHVnaW5cIik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gYWRkIHBsdWdpbiwgXCIgKyBwbHVnaW5OYW1lICsgXCIsIFwiICsgcGx1Z2luVXJsICsgXCIsIFwiICsgc3RhdHVzKTtcbiAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRQbHVnaW5zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBia1V0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICBia1V0aWxzLmh0dHBHZXQoYmtVdGlscy5zZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9zZXNzaW9uLWJhY2t1cC9nZXRFeGlzdGluZ1BsdWdpbnNcIiksIHt9KVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHBsdWdpbnMpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocGx1Z2lucyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIkZhaWxlZCB0byBnZXQgZXhpc3RpbmcgcGx1Z2lucywgXCIgKyBzdGF0dXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0U2Vzc2lvbnM6IGdldFNlc3Npb25zLFxuICAgICAgbG9hZDogbG9hZFNlc3Npb24sXG4gICAgICBiYWNrdXA6IGJhY2t1cFNlc3Npb24sXG4gICAgICBjbG9zZTogY2xvc2VTZXNzaW9uLFxuICAgICAgcmVjb3JkTG9hZGVkUGx1Z2luOiByZWNvcmRMb2FkZWRQbHVnaW4sXG4gICAgICBnZXRQbHVnaW5zOiBnZXRQbHVnaW5zXG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsuc2hhcmVcbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIGJrU2hhcmUgc2VydmljZSB3aGljaCBjb21tdW5pY2F0ZSB3aXRoIHRoZSBiYWNrZW5kIHRvIGNyZWF0ZSBzaGFyYWJsZVxuICogY29udGVudCBhcyB3ZWxsIGFzIHRvIHJldHVybiBVUkwgb2YgdGhlIHNoYXJkIGNvbnRlbnQuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2JrLnNoYXJlJywgW10pO1xuXG4gIG1vZHVsZS5wcm92aWRlcihcImJrU2hhcmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9zaGFyaW5nU2VydmljZSA9IG51bGw7XG4gICAgdGhpcy5jb25maWcgPSBmdW5jdGlvbihzaGFyaW5nU2VydmljZSkge1xuICAgICAgX3NoYXJpbmdTZXJ2aWNlID0gc2hhcmluZ1NlcnZpY2U7XG4gICAgfTtcbiAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghX3NoYXJpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHZhciBub09wID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gZG8gbm90aGluZyBmb3Igbm93XG4gICAgICAgICAgLy8gd2UgbWlnaHQgY29uc2lkZXIgbG9nZ2luZyBlcnJvciBvciB3YXJuaW5nOlxuICAgICAgICAgIC8vY29uc29sZS5lcnJvcihcIm5vIHNoYXJpbmcgc2VydmljZSBhdmFpbGFibGVcIik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHVibGlzaDogbm9PcCxcbiAgICAgICAgICBnZXRTaGFyYWJsZVVybDogbm9PcFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gdGhlIHJlYXNvbiBvZiB3cmFwcGluZyB0aGUgc3RyYXRlZ3kgaW5zdGVhZCBvZiBqdXN0IHJldHVyblxuICAgICAgLy8gaXQgKF9zaGFyaW5nU2VydmljZSkgaXMgdG8gbWFrZSB0aGUgQVBJIGV4cGxpY2l0LlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHVibGlzaDogZnVuY3Rpb24odXJpLCBjb250ZW50LCBjYikge1xuICAgICAgICAgIHJldHVybiBfc2hhcmluZ1NlcnZpY2UucHVibGlzaCh1cmksIGNvbnRlbnQsIGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2VuZXJhdGVFeGNlbDogZnVuY3Rpb24ocGF0aCwgdGFibGUsIGNiKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaGFyaW5nU2VydmljZS5nZW5lcmF0ZUV4Y2VsKHBhdGgsIHRhYmxlLCBjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX1NlY3Rpb25DZWxsOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX1NlY3Rpb25DZWxsKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX0NvZGVDZWxsOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX0NvZGVDZWxsKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX1RhYmxlOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX1RhYmxlKHVyaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNoYXJhYmxlVXJsX05vdGVib29rOiBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgICByZXR1cm4gX3NoYXJpbmdTZXJ2aWNlLmdldFNoYXJhYmxlVXJsX05vdGVib29rKHVyaSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxNCBUV08gU0lHTUEgT1BFTiBTT1VSQ0UsIExMQ1xuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4gKiBNb2R1bGUgYmsudHJhY2tcbiAqIFRoaXMgbW9kdWxlIG93bnMgdGhlIHNlcnZpY2UgdGhhdCBjYW4gYmUgY29uZmlndXJlZCB0byAzcmQgcGFydHkgcHJvdmlkZWQgdXNhZ2UgbWV0cmljXG4gKiBsb2dnaW5nIHNlcnZpY2VzLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay50cmFjaycsIFtdKTtcblxuICBtb2R1bGUucHJvdmlkZXIoJ2JrVHJhY2snLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RyYWNraW5nU2VydmljZSA9IG51bGw7XG4gICAgdGhpcy5jb25maWcgPSBmdW5jdGlvbih0cmFja2luZ1NlcnZpY2UpIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24odHJhY2tpbmdTZXJ2aWNlKSkge1xuICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlID0gdHJhY2tpbmdTZXJ2aWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlID0gdHJhY2tpbmdTZXJ2aWNlO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIV90cmFja2luZ1NlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsb2c6IGZ1bmN0aW9uKGV2ZW50LCBvYmopIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzTmVlZFBlcm1pc3Npb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxvZzogZnVuY3Rpb24oZXZlbnQsIG9iamVjdCkge1xuICAgICAgICAgIF90cmFja2luZ1NlcnZpY2UubG9nKGV2ZW50LCBvYmplY3QpO1xuICAgICAgICB9LFxuICAgICAgICBlbmFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHNvbWUgdHJhY2tpbmcgc2VydmljZSB3aWxsIG5lZWQgdG8gYmUgZW5hYmxlZCBiZWZvcmUgYmVpbmcgdXNlZFxuICAgICAgICAgIGlmIChfdHJhY2tpbmdTZXJ2aWNlLmVuYWJsZSAmJiBfLmlzRnVuY3Rpb24oX3RyYWNraW5nU2VydmljZS5lbmFibGUpKSB7XG4gICAgICAgICAgICBfdHJhY2tpbmdTZXJ2aWNlLmVuYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gc29tZSB0cmFja2luZyBzZXJ2aWNlIHdpbGwgbmVlZCB0byBiZSBlbmFibGVkIGJlZm9yZSBiZWluZyB1c2VkXG4gICAgICAgICAgaWYgKF90cmFja2luZ1NlcnZpY2UuZGlzYWJsZSAmJiBfLmlzRnVuY3Rpb24oX3RyYWNraW5nU2VydmljZS5kaXNhYmxlKSkge1xuICAgICAgICAgICAgX3RyYWNraW5nU2VydmljZS5kaXNhYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc05lZWRQZXJtaXNzaW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RyYWNraW5nU2VydmljZS5pc05lZWRQZXJtaXNzaW9uXG4gICAgICAgICAgICAgICYmIF8uaXNGdW5jdGlvbihfdHJhY2tpbmdTZXJ2aWNlLmlzTmVlZFBlcm1pc3Npb24pXG4gICAgICAgICAgICAgICYmIF90cmFja2luZ1NlcnZpY2UuaXNOZWVkUGVybWlzc2lvbigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTQgVFdPIFNJR01BIE9QRU4gU09VUkNFLCBMTENcbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qKlxuICogTW9kdWxlIGJrLnV0aWxzXG4gKiBUaGlzIG1vZHVsZSBjb250YWlucyB0aGUgbG93IGxldmVsIHV0aWxpdGllcyB1c2VkIGJ5IEJlYWtlclxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdiay51dGlscycsIFtcbiAgICAnYmsuY29tbW9uVXRpbHMnLFxuICAgICdiay5hbmd1bGFyVXRpbHMnLFxuICAgICdiay5jb21ldGRVdGlscycsXG4gICAgJ2JrLnRyYWNrJ1xuICBdKTtcbiAgLyoqXG4gICAqIGJrVXRpbHNcbiAgICogLSBob2xkcyBnZW5lcmFsL2xvdzBsZXZlbCB1dGlsaXRpZXMgdGhhdCBhcmUgYmVha2VyIHNwZWNpZmljIHRoYXQgaGFzIG5vIGVmZmVjdCB0byBET00gZGlyZWN0bHlcbiAgICogLSBpdCBhbHNvIHNlcnZlcyB0aGUgcHVycG9zZSBvZiBoaWRpbmcgdW5kZXJuZWF0aCB1dGlsczogY29tbW9uVXRpbHMvYW5ndWxhclV0aWxzLy4uLlxuICAgKiAgICBmcm9tIG90aGVyIHBhcnRzIG9mIGJlYWtlclxuICAgKi9cbiAgbW9kdWxlLmZhY3RvcnkoJ2JrVXRpbHMnLCBmdW5jdGlvbihjb21tb25VdGlscywgYW5ndWxhclV0aWxzLCBia1RyYWNrLCBjb21ldGRVdGlscykge1xuXG4gICAgZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWZmaXgpIHtcbiAgICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWZmaXgsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTE7XG4gICAgfVxuICAgIFxuICAgIHZhciBzZXJ2ZXJSb290ID0gZW5kc1dpdGgoZG9jdW1lbnQuYmFzZVVSSSwgJ2JlYWtlci8nKSA/IGRvY3VtZW50LmJhc2VVUkkuc3Vic3RyaW5nKDAsZG9jdW1lbnQuYmFzZVVSSS5sZW5ndGgtNyk6IGRvY3VtZW50LmJhc2VVUkk7XG4gICAgXG4gICAgZnVuY3Rpb24gc2VydmVyVXJsKHBhdGgpIHtcbiAgICAgIHJldHVybiBzZXJ2ZXJSb290ICsgcGF0aDtcbiAgICB9XG5cbiAgICB2YXIgZmlsZVJvb3QgPSBkb2N1bWVudC5iYXNlVVJJO1xuICAgIFxuICAgIGZ1bmN0aW9uIGZpbGVVcmwocGF0aCkge1xuICAgICAgcmV0dXJuIGZpbGVSb290ICsgcGF0aDtcbiAgICB9XG5cbiAgICAvLyBhamF4IG5vdGVib29rIGxvY2F0aW9uIHR5cGVzIHNob3VsZCBiZSBvZiB0aGUgZm9ybVxuICAgIC8vIGFqYXg6L2xvYWRpbmcvcGF0aDovc2F2aW5nL3BhdGhcbiAgICBmdW5jdGlvbiBwYXJzZUFqYXhMb2NhdG9yKGxvY2F0b3IpIHtcbiAgICAgIHZhciBwaWVjZXMgPSBsb2NhdG9yLnNwbGl0KFwiOlwiKTtcbiAgICAgIHJldHVybiB7IHNvdXJjZTogcGllY2VzWzFdLCBkZXN0aW5hdGlvbjogcGllY2VzWzJdIH1cbiAgICB9XG5cbiAgICB2YXIgYmtVdGlscyA9IHtcbiAgICAgICAgc2VydmVyVXJsOiBzZXJ2ZXJVcmwsXG4gICAgICAgIGZpbGVVcmw6IGZpbGVVcmwsXG5cbiAgICAgIC8vIHdyYXAgdHJhY2tpbmdTZXJ2aWNlXG4gICAgICBsb2c6IGZ1bmN0aW9uKGV2ZW50LCBvYmopIHtcbiAgICAgICAgYmtUcmFjay5sb2coZXZlbnQsIG9iaik7XG4gICAgICB9LFxuXG4gICAgICAvLyB3cmFwIGNvbW1vblV0aWxzXG4gICAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmdlbmVyYXRlSWQobGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICBsb2FkSlM6IGZ1bmN0aW9uKHVybCwgc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMubG9hZEpTKHVybCwgc3VjY2Vzcyk7XG4gICAgICB9LFxuICAgICAgbG9hZENTUzogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5sb2FkQ1NTKHVybCk7XG4gICAgICB9LFxuICAgICAgbG9hZExpc3Q6IGZ1bmN0aW9uKHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vblV0aWxzLmxvYWRMaXN0KHVybHMsIHN1Y2Nlc3MsIGZhaWx1cmUpO1xuICAgICAgfSxcbiAgICAgIGZvcm1hdFRpbWVTdHJpbmc6IGZ1bmN0aW9uKG1pbGxpcykge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuZm9ybWF0VGltZVN0cmluZyhtaWxsaXMpO1xuICAgICAgfSxcbiAgICAgIGlzTWlkZGxlQ2xpY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5pc01pZGRsZUNsaWNrKGV2ZW50KTtcbiAgICAgIH0sXG4gICAgICBnZXRFdmVudE9mZnNldFg6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5nZXRFdmVudE9mZnNldFgoZWxlbSwgZXZlbnQpO1xuICAgICAgfSxcbiAgICAgIGZpbmRUYWJsZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICByZXR1cm4gY29tbW9uVXRpbHMuZmluZFRhYmxlKGVsZW0pO1xuICAgICAgfSxcbiAgICAgIHNhdmVBc0NsaWVudEZpbGU6IGZ1bmN0aW9uKGRhdGEsIGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBjb21tb25VdGlscy5zYXZlQXNDbGllbnRGaWxlKGRhdGEsIGZpbGVuYW1lKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIHdyYXAgYW5ndWxhclV0aWxzXG4gICAgICByZWZyZXNoUm9vdFNjb3BlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgYW5ndWxhclV0aWxzLnJlZnJlc2hSb290U2NvcGUoKTtcbiAgICAgIH0sXG4gICAgICB0b1ByZXR0eUpzb246IGZ1bmN0aW9uKGpzT2JqKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMudG9QcmV0dHlKc29uKGpzT2JqKTtcbiAgICAgIH0sXG4gICAgICBmcm9tUHJldHR5SnNvbjogZnVuY3Rpb24oalN0cmluZykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmZyb21QcmV0dHlKc29uKGpTdHJpbmcpO1xuICAgICAgfSxcbiAgICAgIGh0dHBHZXQ6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmh0dHBHZXQodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBodHRwUG9zdDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuaHR0cFBvc3QodXJsLCBkYXRhKTtcbiAgICAgIH0sXG4gICAgICBuZXdEZWZlcnJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgIH0sXG4gICAgICBuZXdQcm9taXNlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLm5ld1Byb21pc2UodmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuYWxsLmFwcGx5KGFuZ3VsYXJVdGlscywgYXJndW1lbnRzKTtcbiAgICAgIH0sXG4gICAgICBmY2FsbDogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmZjYWxsKGZ1bmMpO1xuICAgICAgfSxcbiAgICAgIGRlbGF5OiBmdW5jdGlvbihtcykge1xuICAgICAgICByZXR1cm4gYW5ndWxhclV0aWxzLmRlbGF5KG1zKTtcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBmdW5jdGlvbihmdW5jLG1zKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMudGltZW91dChmdW5jLG1zKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxUaW1lb3V0OiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVXRpbHMuY2FuY2VsVGltZW91dChwcm9taXNlKTsgIFxuICAgICAgfSxcbiAgICAgIHNldFNlcnZlclJvb3Q6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICBzZXJ2ZXJSb290ID0gdXJsO1xuICAgICAgfSxcbiAgICAgIHNldEZpbGVSb290OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgZmlsZVJvb3QgPSB1cmw7XG4gICAgICB9LFxuXG4gICAgICAvLyBiZWFrZXIgc2VydmVyIGludm9sdmVkIHV0aWxzXG4gICAgICBnZXRIb21lRGlyZWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIHRoaXMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL2dldEhvbWVEaXJlY3RvcnlcIikpXG4gICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdldFZlcnNpb25JbmZvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIHRoaXMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC91dGlsL2dldFZlcnNpb25JbmZvXCIpKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICBnZXRTdGFydFVwRGlyZWN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIHRoaXMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL2dldFN0YXJ0VXBEaXJlY3RvcnlcIikpXG4gICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGdldERlZmF1bHROb3RlYm9vazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cEdldChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC91dGlsL2dldERlZmF1bHROb3RlYm9va1wiKSkuXG4gICAgICAgICAgICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShhbmd1bGFyLmZyb21Kc29uKGRhdGEpKTtcbiAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZykge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgZ2VuZXJhdGVOb3RlYm9vazogZnVuY3Rpb24oZXZhbHVhdG9ycywgY2VsbHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBiZWFrZXI6IFwiMlwiLFxuICAgICAgICAgIGV2YWx1YXRvcnM6IGV2YWx1YXRvcnMsXG4gICAgICAgICAgY2VsbHM6IGNlbGxzXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgbG9hZEZpbGU6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGFuZ3VsYXJVdGlscy5odHRwR2V0KHNlcnZlclVybChcImJlYWtlci9yZXN0L2ZpbGUtaW8vbG9hZFwiKSwge3BhdGg6IHBhdGh9KVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICBpZiAoIV8uaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmd1bGFyICRodHRwIGF1dG8tZGV0ZWN0cyBKU09OIHJlc3BvbnNlIGFuZCBkZXNlcmlhbGl6ZSBpdCB1c2luZyBhIEpTT04gcGFyc2VyXG4gICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGlzIGJlaGF2aW9yLCB0aGlzIGlzIGEgaGFjayB0byByZXZlcnNlIGl0XG4gICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29udGVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcblxuICAgICAgbG9hZEh0dHA6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBHZXQoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvaHR0cC1wcm94eS9sb2FkXCIpLCB7dXJsOiB1cmx9KVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICBpZiAoIV8uaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmd1bGFyICRodHRwIGF1dG8tZGV0ZWN0cyBKU09OIHJlc3BvbnNlIGFuZCBkZXNlcmlhbGl6ZSBpdCB1c2luZyBhIEpTT04gcGFyc2VyXG4gICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGlzIGJlaGF2aW9yLCB0aGlzIGlzIGEgaGFjayB0byByZXZlcnNlIGl0XG4gICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29udGVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIGxvYWRBamF4OiBmdW5jdGlvbihhamF4TG9jYXRvcikge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBhbmd1bGFyVXRpbHMubmV3RGVmZXJyZWQoKTtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBHZXQocGFyc2VBamF4TG9jYXRvcihhamF4TG9jYXRvcikuc291cmNlKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICBpZiAoIV8uaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmd1bGFyICRodHRwIGF1dG8tZGV0ZWN0cyBKU09OIHJlc3BvbnNlIGFuZCBkZXNlcmlhbGl6ZSBpdCB1c2luZyBhIEpTT04gcGFyc2VyXG4gICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGlzIGJlaGF2aW9yLCB0aGlzIGlzIGEgaGFjayB0byByZXZlcnNlIGl0XG4gICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29udGVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHNhdmVGaWxlOiBmdW5jdGlvbihwYXRoLCBjb250ZW50QXNKc29uLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gYW5ndWxhclV0aWxzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICBhbmd1bGFyVXRpbHMuaHR0cFBvc3Qoc2VydmVyVXJsKFwiYmVha2VyL3Jlc3QvZmlsZS1pby9zYXZlXCIpLCB7cGF0aDogcGF0aCwgY29udGVudDogY29udGVudEFzSnNvbn0pXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGRlZmVycmVkLnJlc29sdmUpXG4gICAgICAgICAgICAgIC5lcnJvcihkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuZ3VsYXJVdGlscy5odHRwUG9zdChzZXJ2ZXJVcmwoXCJiZWFrZXIvcmVzdC9maWxlLWlvL3NhdmVJZk5vdEV4aXN0c1wiKSwge3BhdGg6IHBhdGgsIGNvbnRlbnQ6IGNvbnRlbnRBc0pzb259KVxuICAgICAgICAgICAgICAuc3VjY2VzcyhkZWZlcnJlZC5yZXNvbHZlKVxuICAgICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXIsIGNvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDQwOSkge1xuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KFwiZXhpc3RzXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gXCJpc0RpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChkYXRhLCBzdGF0dXMsIGhlYWRlciwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgc2F2ZUFqYXg6IGZ1bmN0aW9uKGFqYXhMb2NhdG9yLCBjb250ZW50QXNKc29uKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGFuZ3VsYXJVdGlscy5uZXdEZWZlcnJlZCgpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBwYXJzZUFqYXhMb2NhdG9yKGFqYXhMb2NhdG9yKS5kZXN0aW5hdGlvbjtcbiAgICAgICAgYW5ndWxhclV0aWxzLmh0dHBQdXRKc29uKGRlc3RpbmF0aW9uLCB7ZGF0YTogY29udGVudEFzSnNvbn0pXG4gICAgICAgICAgLnN1Y2Nlc3MoZGVmZXJyZWQucmVzb2x2ZSlcbiAgICAgICAgICAuZXJyb3IoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgaW5pdGlhbGl6ZUNvbWV0ZDogZnVuY3Rpb24odXJpKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5pbml0aWFsaXplQ29tZXRkKHVyaSk7XG4gICAgICB9LFxuICAgICAgYWRkQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIHJldHVybiBjb21ldGRVdGlscy5hZGRDb25uZWN0ZWRTdGF0dXNMaXN0ZW5lcihjYik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29tZXRkVXRpbHMucmVtb3ZlQ29ubmVjdGVkU3RhdHVzTGlzdGVuZXIoKTtcbiAgICAgIH0sXG4gICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbWV0ZFV0aWxzLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0sXG5cbiAgICAgIGJlZ2luc1dpdGg6IGZ1bmN0aW9uKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgICAgICAgcmV0dXJuIChoYXlzdGFjay5zdWJzdHIoMCwgbmVlZGxlLmxlbmd0aCkgPT09IG5lZWRsZSk7XG4gICAgICB9LFxuXG4gICAgICAvLyB3cmFwcGVyIGFyb3VuZCByZXF1aXJlSlNcbiAgICAgIG1vZHVsZU1hcDoge30sXG4gICAgICBsb2FkTW9kdWxlOiBmdW5jdGlvbih1cmwsIG5hbWUpIHtcbiAgICAgICAgLy8gbmFtZSBpcyBvcHRpb25hbCwgaWYgcHJvdmlkZWQsIGl0IGNhbiBiZSB1c2VkIHRvIHJldHJpZXZlIHRoZSBsb2FkZWQgbW9kdWxlIGxhdGVyLlxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmIChfLmlzU3RyaW5nKHVybCkpIHtcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLm5ld0RlZmVycmVkKCk7XG4gICAgICAgICAgd2luZG93LnJlcXVpcmUoW3VybF0sIGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgIHRoYXQubW9kdWxlTWFwW25hbWVdID0gdXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXQpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJtb2R1bGUgZmFpbGVkIHRvIGxvYWRcIixcbiAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBcImlsbGVnYWwgYXJnXCIgKyB1cmw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlOiBmdW5jdGlvbihuYW1lT3JVcmwpIHtcbiAgICAgICAgdmFyIHVybCA9IHRoaXMubW9kdWxlTWFwLmhhc093blByb3BlcnR5KG5hbWVPclVybCkgPyB0aGlzLm1vZHVsZU1hcFtuYW1lT3JVcmxdIDogbmFtZU9yVXJsO1xuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVpcmUodXJsKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBia1V0aWxzO1xuICB9KTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=