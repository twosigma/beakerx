define(function() {
  
  return function(scopeId) {
    var tmpl = '<div class="dtcontainer">'+
               '    <div class="dropdown dtmenu clearfix" style="float: left; z-index: 10" id="' + scopeId + '_tabel_menu">'+
               '        <a class="dropdown-toggle" data-toggle="dropdown" id="' + scopeId + '_dropdown_menu">'+
               '            <span class="bko-menu" aria-hidden="true"></span>'+
               '        </a>'+
               '        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">'+
               '            <li><a tabindex="-1" href="#" class="dt-show-all">Show All Columns</a></li>'+
               '            <li class="dropdown-submenu" id="' + scopeId + '_show_column">'+
               '                <a tabindex="-1" href="" class="dt-show-columns" data-toggle="dropdown">Show Column</a>'+
               '                <div class="dropdown-menu dropdown-menu-search">'+
               '                    <i class="fa fa-search"></i>'+
               '                    <input placeholder="search...">'+
               '                </div>'+
               '                <ul class="dropdown-menu dropdown-submenu-scrollable" role="menu" aria-labelledby="dLabel">'+
               '                </ul>'+
               '            </li>'+
               '            <li><a tabindex="-1" href="#" class="dt-hide-all">Hide All Columns</a></li>'+
               '            <li>'+
               '                <a tabindex="-1" href="#" class="dt-use-pagination menu-separator">Use pagination</a>'+
               '                <i class="glyphicon glyphicon-ok"></i>'+
               '            </li>'+
               '            <li class="dropdown-submenu">'+
               '                <a tabindex="-1" href="" class="dt-rows-to-show" data-toggle="dropdown">Rows to Show</a>'+
               '                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"></ul>'+
               '            </li>'+
               '            <li><a tabindex="-1" href="#" class="dt-select-all">Select All Rows</a></li>'+
               '            <li><a tabindex="-1" href="#" class="dt-deselect-all">Deselect All Rows</a></li>'+
               '            <li><a tabindex="-1" href="#" class="dt-reverse-selection">Reverse Selection</a></li>'+
               '            <li><a tabindex="-1" href="#" class="menu-separator" id="' + scopeId + '_dt_copy">Copy to Clipboard</a></li>'+
               '            <li><a tabindex="-1" href="#" class="dt-save-all">Save All as CSV</a></li>'+
               '            <li><a tabindex="-1" href="#" class="dt-save-selected">Save Selected as CSV</a></li>'+
               '            <li><a tabindex="-1" href="#" class="dt-download-all">Download All as CSV</a></li>'+
               '            <li><a tabindex="-1" href="#" class="dt-download-selected">Download Selected as CSV</a></li>'+
               '            <li>'+
               '                <a tabindex="-1" href="#" class="dt-search menu-separator" title="search the whole table for a substring">Search...</a>'+
               '                <i class="fa fa-search"></i>'+
               '            </li>'+
               '            <li>'+
               '                <a tabindex="-1" href="#" class="dt-filter"'+
               '                   title="filter with an expression with a variable defined for each column">Filter...</a>'+
               '                <i class="fa fa-filter"></i>'+
               '            </li>'+
               '            <li><a tabindex="-1" href="#" class="dt-hide-filter" >Hide Filter</a></li>'+
               '            <li><a tabindex="-1" href="#" class="dt-reset-all menu-separator" >Reset All Interactions</a></li>'+
               '        </ul>'+
               '    </div>'+
               ''+
               '    <table cellpadding="0" class="display" border="0" cellspacing="0" width="10%" id="' + scopeId + '">'+
               '        <thead>'+
               '            <tr></tr>'+
               '            <tr class="filterRow"></tr>'+
               '        </thead>'+
               '    </table>'+
               '</div>';

    return tmpl;

  }
  
});