(function() {(window["JST"] = window["JST"] || {})["controlpanel/controlpanel"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="navbar navbar-fixed-top bkr">\n  <div class="navbar-inner bkr">\n    <div class="container pull-left bkr" style="margin-left: 10px; padding-left: 0px">\n      <ul class="sub-nav bkr">\n        <li class="dropdown bkr" ng-repeat="m in getMenus()">\n          <a href="#" id="drop2" role="button" class="dropdown-toggle bkr" data-toggle="dropdown">{{m.name}}</a>\n          <bk-dropdown-menu menu-items="m.items" class="bkr"></bk-dropdown-menu>\n        </li>\n        <li class="pull-right bkr" style="padding: 10px 54px 10px; cursor: default">\n          <span ng-show="disconnected" class="bkr"><font color="red" class="bkr">offline</font></span>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n<div class="dashboard container bkr">\n  <div class="row bkr">\n    <div class="span12 bkr">\n\n      <h1 class="bkr">Beaker <small class="bkr">The data scientist\'s laboratory</small></h1>\n\n      <div ng-if="isSessionsListEmpty()" class="empty-session-prompt bkr">\n          <p class="bkr">Click below to get started coding in Python, R, Julia, Groovy, JavaScript, and Ruby. <br class="bkr">\n            Beginners should check out <strong class="bkr">Help → Tutorial</strong>.</p>\n      </div>\n\n      <div ng-hide="isSessionsListEmpty()" class="bkr">\n        <h4 class="open-notebook-headline bkr">Open Notebooks</h4>\n        <bk-control-panel-session-item class="open-notebooks bkr"></bk-control-panel-session-item>\n      </div>\n\n      <a class="beaker-btn new-notebook bkr" ng-click="newNotebook()">New Default Notebook</a>\n      <a class="beaker-btn new-notebook right bkr" ng-click="newEmptyNotebook()">New Empty Notebook</a>\n\n    </div>\n  </div>\n  <div class="row bkr" ng-show="isAllowAnonymousTracking == null">\n    <div class="span6 well bkr">\n      <p class="bkr">\n        <b class="bkr">Track anonymous usage info?</b>\n      </p>\n\n      <p class="bkr">\n        We would like to collect anonymous usage info to help improve our product. We may share this information\n        with other parties, including, in the spirit of open software, by making it publicly accessible.<br class="bkr">\n      </p>\n\n      <p class="bkr">\n        <a target="_blank" href="http://beakernotebook.com/privacy" class="bkr">Privacy policy</a> - <a class="cursor_hand bkr" ng-click="showWhatWeLog()">What will we log?</a>\n      </p>\n      <div class="btn-group bkr">\n        <button class="beaker-btn bkr" ng-click="isAllowAnonymousTracking = false">No, don\'t track</button>\n        <button class="beaker-btn active bkr" ng-click="isAllowAnonymousTracking = true">Yes, track my info</button>\n      </div>\n    </div>\n\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["controlpanel/table"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<ul class="notebook-dashboard-list bkr">\n  <li class="session bkr" ng-repeat="session in sessions | orderBy:&quot;openedDate&quot;:true">\n    <div class="left bkr">\n      <div class="caption bkr" ng-click="open(session)">{{getCaption(session)}}</div>\n      <div class="light path bkr" ng-if="getDescription(session)">\n        {{getDescription(session)}}\n      </div>\n    </div>\n    <div class="btn-group right bkr">\n      <a class="mid beaker-btn close-session bkr" ng-click="close(session)">Close</a>\n    </div>\n    <div class="open-date light right bkr">\n      <span class="bkr">Opened on</span>\n      {{session.openedDate | date:\'medium\'}}\n    </div>\n    <div class="cl bkr"></div>\n  </li>\n</ul>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["controlpanel/what_we_log"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<div class="modal-header bkr">\n  <h3 class="bkr">What will we log</h3>\n</div>\n\n<div class="modal-body bkr">\n  <p class="bkr">\n    <b class="bkr">What we log:</b>\n  </p>\n  <p class="bkr">We use Google Analytics to collect usage info. Google Analytics collects data such as how long you spend in Beaker, what browser you\'re using, and your geographic region.</p>\n  <p class="bkr">In addition to the standard Google Analytics collection, we\'re logging how many times you run cells in each language and what types of notebooks you open (local .bkr file, remote .ipynb, et cetera).</p>\n  <p class="bkr">\n    <b class="bkr">What we <i class="bkr">don\'t</i> log:</b>\n  </p>\n  <p class="bkr">We will never log any of the code you run or the names of your notebooks.</p>\n  <p class="bkr">Please see our <a target="_blank" href="http://beakernotebook.com/privacy" class="bkr">privacy policy</a> for more information.</p>\n</div>\n\n<div class="modal-footer bkr">\n   <button class="btn bkr" ng-click="close()">Got it</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/fileactiondialog"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header bkr">\n  <h1 class="bkr">{{actionName}}</h1>\n</div>\n<div class="modal-body bkr">\n  <p class="bkr">Path: <input id="{{inputId}}" name="{{inputId}}" ng-model="result" class="bkr"></p>\n</div>\n<div class="modal-footer bkr">\n  <button ng-click="close()" class="btn bkr" id="{{inputId}}-cancel">Cancel</button>\n  <button ng-click="close(result)" class="btn btn-primary bkr">{{actionName}}</button>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/openmenumodal"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<span file-action-dialog="" action-name="Open" input-id="openFileInput" close="close" class="bkr"></span>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["template/opennotebook"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="modal-header fixed bkr">\n   <h1 class="bkr">Open <span ng-show="getStrategy().treeViewfs.showSpinner" class="bkr"><i class="fa fa-refresh fa-spin bkr"></i></span></h1>\n</div>\n<div class="modal-body fixed bkr">\n   <tree-view rooturi="/" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n   <tree-view rooturi="' +
__e( homedir ) +
'" fs="getStrategy().treeViewfs" class="bkr"></tree-view>\n</div>\n<div class="modal-footer fixed bkr">\n   <div class="text-left bkr">Enter a file path (e.g. /Users/...) or URL (e.g. http://...):</div>\n   <p class="bkr"><input id="openFileInput" class="input-xxlarge bkr" ng-model="getStrategy().input" ng-keypress="getStrategy().close($event, close)" focus-start=""></p>\n   <span style="float:left" class="bkr">\n     <input type="checkbox" style="vertical-align:top" ng-model="getStrategy().treeViewfs.applyExtFilter" class="bkr">\n     <span ng-click="getStrategy().treeViewfs.applyExtFilter = !getStrategy().treeViewfs.applyExtFilter" class="bkr">show .bkr files only</span>\n   </span>\n   <button ng-click="close()" class="btn bkr">Cancel</button>\n   <button ng-click="close(getStrategy().getResult())" class="btn btn-primary bkr">Open</button>\n</div>';

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
__p += '\n<div class="navbar navbar-fixed-top bkr">\n  <div class="navbar-inner bkr">\n\n    \n    <div class="container pull-left bkr" style="margin-left: 10px; padding-left: 0px">\n      <span class="brand bkr" ng-if="loading"><i class="fa fa-refresh fa-spin text-white bkr"></i></span>\n      <ul class="sub-nav bkr">\n        <li class="dropdown bkr" ng-repeat="m in getMenus()">\n          <a href="#" id="drop2" role="button" class="dropdown-toggle bkr" data-toggle="dropdown">{{m.name}}</a>\n          <bk-dropdown-menu menu-items="m.items" class="bkr"></bk-dropdown-menu>\n        </li>\n        <li class="pull-right bkr" style="padding: 0 47px; cursor: default">\n          <span class="bkr"><font color="#009AA6" class="bkr">{{message}}{{(message !== "" &amp;&amp; isEdited()) ? "|" : "" }}{{isEdited() ? "edited" :\n            ""}}</font></span>\n        </li>\n        <li class="pull-right bkr" style="padding: 0 47px; cursor: default">\n          <span ng-show="isDisconnected()" class="offline-label bkr" ng-click="promptToSave()" eat-click="">{{getOffineMessage()}}</span>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<div class="container notebook-container bkr" style="width: 100%">\n  <div class="row-fluid bkr">\n    <div class="span12 bkr">\n      <bk-notebook set-bk-notebook="setBkNotebook(bkNotebook)" is-loading="loading" class="bkr"></bk-notebook>\n    </div>\n  </div>\n\n  \n  <div style="height: 300px" class="bkr"></div>\n\n</div>\n\n\n<script type="text/ng-template" id="section-cell.html" class="bkr">\n  <bk-section-cell></bk-section-cell>\n</script>\n<script type="text/ng-template" id="text-cell.html" class="bkr">\n  <div class="text-cell">\n    <bk-text-cell></bk-text-cell>\n  </div>\n</script>\n<script type="text/ng-template" id="markdown-cell.html" class="bkr">\n  <bk-markdown-cell></bk-markdown-cell>\n</script>\n<script type="text/ng-template" id="code-cell.html" class="bkr">\n  <bk-code-cell cellmodel="cellmodel" cellmenu="cellview.menu" index="$index"></bk-code-cell>\n</script>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/pluginmanager/pluginmanager"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div modal="!isHideEvaluators()" close="hideEvaluators()" class="bkr">\n  <div class="modal-header bkr">\n    <h3 class="bkr">Plugin Manager</h3>\n  </div>\n  <div class="modal-body modal-large bkr">\n    <button class="beaker-btn bkr" ng-click="evalTabOp.togglePlugin(pluginName)" ng-repeat="(pluginName, pluginStatus) in evalTabOp.getKnownEvaluatePlugins()">\n      <span ng-show="pluginStatus==\'active\'" class="plugin-active plugin-status bkr">●</span>\n      <span ng-show="pluginStatus==\'loading\'" class="plugin-loading plugin-status bkr">●</span>\n      <span ng-show="pluginStatus==\'known\'" class="plugin-known plugin-status bkr">●</span>\n          {{pluginName}}\n    </button><button ng-click="evalTabOp.showURL = !evalTabOp.showURL" class="beaker-btn bkr">\n      <span class="plugin-invisible plugin-url bkr">●</span> From URL...\n    </button>\n    <p class="bkr"><br class="bkr"></p>\n    <div ng-show="evalTabOp.showURL" class="input-append addeval bkr">\n      <input type="text" bk-enter="evalTabOp.togglePlugin()" ng-model="evalTabOp.newPluginNameOrUrl" class="bkr">\n      <button class="btn bkr" ng-click="evalTabOp.togglePlugin()">Add Plugin from URL</button>\n    </div>\n    <div ng-show="evalTabOp.showWarning" class="bkr">\n      <div class="modal-body error-title body-box bkr">\n\t<p class="bkr">Cannot remove plugin currently used by a code cell in the notebook.<br class="bkr">\n\t  Delete those cells and try again.</p>\n\t<button class="btn right bkr" ng-click="evalTabOp.showWarning = false">OK</button>\n      </div>\n      <p class="bkr"><br class="bkr"></p>\n    </div>\n    <tabs class="bkr">\n      <pane ng-repeat="(evaluatorName, evaluator) in evalTabOp.getEvaluatorsWithSpec()" heading="{{evaluatorName}}" class="bkr">\n        <bk-plugin-manager-evaluator-settings class="bkr">\n        </bk-plugin-manager-evaluator-settings>\n      </pane>\n    </tabs>\n  </div>\n  <div class="modal-footer bkr">\n    <button class="beaker-btn active bkr" ng-click="hideEvaluators()">Close</button>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/pluginmanager/pluginmanager_evaluator_settings"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n\n<div class="bbody bkr"></div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/cell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-class="isLocked() &amp;&amp; \'locked\'" class="bkcell {{cellmodel.type}} bkr">\n  <div ng-if="cellmodel.input.hidden &amp;&amp; cellmodel.type==\'code\' &amp;&amp; !isLocked()" class="mini-cell-stats advanced-hide bkr">\n    {{cellmodel.evaluator}} &nbsp;\n    ({{cellmodel.lineCount}} lines)\n  </div>\n  <div class="toggle-menu bkr">\n    <bk-language-logo ng-if="!cellmodel.input.hidden" bg-color="{{getEvaluator().bgColor}}" fg-color="{{getEvaluator().fgColor}}" border-color="{{getEvaluator().borderColor}}" class="bkr">{{getEvaluator().shortName}}</bk-language-logo>\n    <div class="cell-menu-item cell-dropdown bkr" ng-click="toggleCellMenu($event)" title="cell menu"></div>\n    <div class="cell-menu-item move-cell-down advanced-hide bkr" ng-click="moveCellDown()" ng-class="moveCellDownDisabled() &amp;&amp; \'disabled\'" title="move cell down"></div>\n    <div class="cell-menu-item move-cell-up advanced-hide bkr" ng-click="moveCellUp()" ng-class="moveCellUpDisabled() &amp;&amp; \'disabled\'" title="move cell up"></div>\n    <div class="cell-menu-item delete-cell advanced-hide bkr" ng-click="deleteCell()" title="delete cell"></div>\n    <div class="cell-menu-item expand-contract advanced-hide bkr" ng-if="cellmodel.type==\'code\'" ng-click="toggleCellInput()" ng-class="cellmodel.input.hidden &amp;&amp; \'collapsed\'" title="hide/show cell input"></div>\n    <div class="cell-status-item loading-state advanced-hide bkr" ng-if="cellmodel.type==\'code\' &amp;&amp; !cellmodel.evaluatorReader">Initializing {{cellmodel.evaluator}}\n      <div class="loading-spinner rotating bkr"></div>\n    </div>\n  </div>\n  <div ng-if="isDebugging()" class="bkr">\n  [Debug]: cell Id = {{cellmodel.id}}, parent = {{getParentId()}}, level = {{cellmodel.level}}\n  <a ng-click="toggleShowDebugInfo()" ng-hide="isShowDebugInfo()" class="bkr">show more</a>\n  <a ng-click="toggleShowDebugInfo()" ng-show="isShowDebugInfo()" class="bkr">show less</a>\n  <div collapse="!isShowDebugInfo()" class="bkr">\n    <pre class="bkr">{{cellmodel | json}}</pre>\n  </div>\n  </div>\n  <div ng-include="getTypeCellUrl()" class="bkr"></div>\n  <bk-cell-menu items="cellview.menu.items" class="bkr"></bk-cell-menu>\n  <bk-new-cell-menu config="newCellMenuConfig" ng-if="newCellMenuConfig.isShow()" class="bkr"></bk-new-cell-menu>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/cellmenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="dropdown bkcellmenu bkr" style="position: fixed; z-index: 99">\n  <a class="dropdown-toggle bkr" data-toggle="dropdown"></a>\n  <bk-dropdown-menu menu-items="items" submenu-classes="pull-left" class="bkr"></bk-dropdown-menu>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<div class="evaluator bkr" evaluator-type="{{ cellmodel.evaluator }}" ng-class="{\n  \'evaluator-ready\': cellmodel.evaluatorReader,\n  \'locked\': isLocked(),\n  \'empty\': isEmpty()\n  }">\n\n  <p class="depth-indicator bkr">{{getFullIndex()}}</p>\n  <div class="bkcell code-cell-area bkr" ng-click="backgroundClick($event)">\n    <div class="code-cell-input bkr" ng-show="isShowInput()">\n        <bk-code-cell-input-menu class="bkr"></bk-code-cell-input-menu>\n        <div ng-click="$event.stopPropagation()" class="bkr">\n\t  <textarea class="bkcelltextarea bkr" ng-model="cellmodel.input.body"></textarea>\n\t</div>\n        <a href="#" class="evaluate-script advanced-hide bkr" ng-click="evaluate(); $event.stopPropagation();" eat-click="">Run</a>\n    </div>\n    <div ng-if="hasOutput()" class="code-cell-output bkr" ng-class="{\n      \'no-output\': isHiddenOutput(),\n      \'input-hidden\': cellmodel.input.hidden,\n      \'output-hidden\': cellmodel.output.hidden\n    }">\n        <ul class="cell-output-labels advanced-hide bkr">\n          <li ng-if="!isShowOutput()" class="bkr"><b class="bkr"> Output Hidden</b></li>\n          <li ng-if="cellmodel.output.result.innertype != &quot;Error&quot; &amp;&amp; isShowOutput()" class="bkr">\n            <b class="bkr">Cell Output</b>\n            <small class="cell-run-time bkr">{{getElapsedTimeString()}}</small>\n          </li>\n          <li class="error-title bkr" ng-if="cellmodel.output.result.innertype == &quot;Error&quot; &amp;&amp; isShowOutput()"><b class="bkr">Error</b></li>\n        </ul>\n        <bk-code-cell-output model="cellmodel.output" evaluator-id="{{ cellmodel.evaluator }}" class="bkr">\n        </bk-code-cell-output>\n    </div>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecellinputmenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="dropdown bkr">\n  <a class="dropdown-toggle cell-evaluator-menu bkr" data-toggle="dropdown">\n    <bk-language-logo bg-color="{{getEvaluator().bgColor}}" fg-color="{{getEvaluator().fgColor}}" border-color="{{getEvaluator().borderColor}}" class="bkr">{{getEvaluator().shortName}}</bk-language-logo>\n    <b class="advanced-hide bkr">{{cellmodel.evaluator}}</b>\n  </a>\n  <ul class="dropdown-menu inputcellmenu bkr" role="menu" aria-labelledby="dLabel">\n    <li ng-repeat="(evaluatorName, evaluator) in getEvaluators()" class="bkr">\n      <a tabindex="-1" href="#" ng-click="setEvaluator(evaluatorName)" eat-click="" class="bkr">\n        {{evaluatorName}}\n        <i class="fa fa-check bkr" ng-show="getShowEvalIcon(evaluatorName)"></i>\n      </a>\n    </li>\n  </ul>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecelloutput"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="toggle-menu bkr">\n  <div class="cell-menu-item cell-dropdown bkr" title="cell output menu"></div>\n  <div class="cell-menu-item expand-contract advanced-hide bkr" ng-click="toggleExpansion()" ng-class="!isExpanded() &amp;&amp; \'collapsed\'" title="hide/show cell output"></div>\n</div>\n<div class="bkcell bkr">\n  <bk-output-display ng-show="isShowOutput()" model="outputDisplayModel" type="{{ getOutputDisplayType() }}" class="bkr">\n  </bk-output-display>\n  <bk-code-cell-output-menu model="outputCellMenuModel" class="bkr">\n  </bk-code-cell-output-menu>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/codecelloutputmenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="dropdown bkr" style="position: fixed; z-index: 99">\n  <a class="dropdown-toggle bkr" data-toggle="dropdown"></a>\n  <ul class="dropdown-menu dropdown-menu-form hack-for-pull-left-submenu bkr" role="menu" aria-labelledby="dLabel">\n    <li class="dropdown-submenu pull-left bkr">\n      <a tabindex="-1" class="bkr">Displays({{model.getSelectedDisplay()}})</a>\n      <ul class="dropdown-menu bkr">\n        <li ng-repeat="d in model.getApplicableDisplays()" class="bkr">\n          <a tabindex="-1" href="#" ng-click="model.setSelectedDisplay(d)" eat-click="" class="bkr">\n            <i class="icon-ok bkr" ng-show="d === model.getSelectedDisplay()"></i>{{ d }}\n          </a>\n        </li>\n      </ul>\n    </li>\n    <li ng-repeat="item in model.getAdditionalMenuItems()" class="{{getItemClass(item)}} bkr">\n      <a tabindex="-1" ng-click="item.action()" class="bkr">{{getItemName(item)}}</a>\n      <ul class="dropdown-menu bkr">\n        <li ng-repeat="subitem in getSubItems(item)" class="bkr">\n          <a ng-click="subitem.action()" class="{{getSubmenuItemClass(subitem)}} bkr" title="{{subitem.tooltip}}">{{subitem.name}}</a>\n        </li>\n      </ul>\n    </li>\n  </ul>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/markdowncell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<p class="depth-indicator bkr">{{getFullIndex()}}</p>\n<div ng-click="edit()" ng-class="focused &amp;&amp; &quot;focused&quot;" class="bkr"></div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/newcellmenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="dropdown new-cell-menu bkr" ng-mouseover="mouseOver=true" ng-mouseleave="mouseOver=false">\n  <a class="dropdown-toggle bkr">\n    <div ng-click="insertDefaultCodeCell($event)" class="insert-cell-indicator bkr" ng-class="mouseOver &amp;&amp; \'expanded\'">Insert Cell\n    </div><div ng-click="moveMenu($event)" class="insert-cell-indicator shift-right bkr" ng-class="mouseOver &amp;&amp; \'expanded\'">\n      <i class="fa fa-sort-down bkr"></i>\n    </div>\n  </a>\n  <ul class="dropdown-menu bkr" role="menu">\n    <li class="dropdown-submenu bkr">\n      <a tabindex="-1" class="bkr">Code cell</a>\n      <ul class="dropdown-menu bkr">\n        <li ng-repeat="(key, value) in getEvaluators()" class="bkr">\n          <a ng-click="newCodeCell(key)" class="bkr">{{key}}</a>\n        </li>\n        <li class="bkr">\n           <a ng-click="showPluginManager()" class="bkr">Other languages...</a>\n        </li>\n      </ul>\n    </li>\n    <li class="dropdown-submenu bkr">\n      <a tabindex="-1" class="bkr">Section cell</a>\n      <ul class="dropdown-menu bkr">\n        <li ng-repeat="level in getLevels()" class="bkr">\n          <a ng-click="newSectionCell(level)" class="bkr">H{{level}}</a>\n        </li>\n      </ul>\n    </li>\n    <li class="bkr">\n      <a tabindex="-1" ng-click="newTextCell()" class="bkr">Text cell</a>\n    </li>\n    <li class="bkr">\n      <a tabindex="-1" ng-click="newMarkdownCell()" class="bkr">Markdown cell</a>\n    </li>\n  </ul>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/notebook"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-class="{\'advanced-mode\': isAdvancedMode(), \'hierarchy-mode\': isHierarchyEnabled()}" class="bkr">\n  <div class="bkcell bkr">\n    <bk-plugin-manager class="bkr"></bk-plugin-manager>\n    <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell" index="$index" class="bkr">\n    </bk-cell>\n    <div class="dropdown bkcellmenu bkr" style="position: fixed; z-index: 99">\n      <a class="dropdown-toggle bkr" data-toggle="dropdown"></a>\n      <bk-dropdown-menu menu-items="menuItems" submenu-classes="pull-left" class="bkr"></bk-dropdown-menu>\n    </div>\n  </div>\n  <bk-new-cell-menu ng-show="!isLocked() &amp;&amp; !isLoading" class="base-menu-add bkr" config="newCellMenuConfig"></bk-new-cell-menu>\n  <div ng-show="isShowingOutput()" class="outputlogbox bkr"></div>\n  <div ng-show="isShowingOutput()" class="outputlogcontainer bkr">\n    <div class="outputloghandle bkr"></div>\n    <div class="btn-toolbar bkr">\n      <div class="btn-group alt-controls bkr">\n        <a class="beaker-btn small bkr" ng-click="clearOutput()">Clear</a>\n        <a class="beaker-btn small hide-output bkr" ng-click="hideOutput()">Hide</a>\n      </div>\n      <div class="btn-group bkr" data-toggle="buttons-checkbox">\n        <a class="beaker-btn bkr" ng-class="{active: showStdOut}" ng-click="toggleStdOut()">stdout</a>\n        <a class="beaker-btn bkr" ng-class="{active: showStdErr}" ng-click="toggleStdErr()">stderr</a>\n      </div>\n    </div>\n    <div class="outputlogout bkr" ng-show="showStdOut">\n      <label class="output-label bkr">stdout:</label>\n      <div class="outputlogbox outputlogstdout bkr">\n        <div ng-repeat="line in outputLog track by $index" class="bkr">\n          <div ng-show="line.type == \'text\' || line.type == \'stdout\'" class="bkr">\n            <pre class="prelog bkr">{{line.line}}</pre>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="outputlogerr bkr" ng-show="showStdErr">\n      <label class="output-label bkr">stderr:</label>\n      <div class="outputlogbox bkr">\n        <div ng-repeat="line in outputLog track by $index" class="bkr">\n          <div ng-show="line.type == \'stderr\'" class="bkr">\n            <pre class="prelog bkr">{{line.line}}</pre>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-if="isDebugging()" class="bkr">\n    <button ng-click="showDebugTree = !showDebugTree" class="bkr">Toggle debug Tree</button>\n    <div collapse="!showDebugTree" class="bkr">\n      <pre class="bkr">{{getNotebookModel() | json}}</pre>\n    </div>\n  </div>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/sectioncell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div ng-hide="cellmodel.hideTitle" class="bkr">\n  <span class="bksectiontoggleplus section-toggle bkr" ng-click="toggleShowChildren()" ng-hide="isShowChildren()">\n    <i class="fa fa-plus bkr"></i>\n  </span>\n  <span class="bksectiontoggleminus section-toggle bkr" ng-click="toggleShowChildren()" ng-show="isShowChildren()">\n    <i class="fa fa-minus bkr"></i>\n  </span>\n  <p class="depth-indicator bkr">{{getFullIndex()}}</p>\n  <span class="section{{cellmodel.level}} bk-section-title bkr" contenteditable="true">{{cellmodel.title}}</span>\n</div>\n<bk-new-cell-menu config="newCellMenuConfig" ng-if="newCellMenuConfig.isShow()" class="bkr"></bk-new-cell-menu>\n<div bk-show="isShowChildren()" class="section-children bkr">\n  <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell" index="$index" class="bkr"></bk-cell>\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["mainapp/components/notebook/textcell"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n\n<p class="depth-indicator bkr">{{getFullIndex()}}</p>\n<div contenteditable="true" class="bkr"></div>';

}
return __p
}})();