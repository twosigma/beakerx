var $ = require('jquery');
var jQuery = require('jquery');

module.exports = {
  setJqExtentions: setJqExtentions,
  findFilterInput: findFilterInput,
  findDTColumnIndex: findDTColumnIndex
};

function setJqExtentions() {
  $.fn.dataTable.moment = function(format, locale) {
    var types = $.fn.dataTable.ext.type;
    // Add type detection
    types.detect.unshift(function(d) {
      // Null and empty values are acceptable
      if (d === '' || d === null) {
        return 'moment-' + format;
      }
      return (d.timestamp !== undefined && moment(d.timestamp).isValid()) ?
        'moment-' + format :
        null;
    });
    // Add sorting method - use an integer for the sorting
    types.order['moment-' + format + '-pre'] = function(d) {
      return d === '' || d === null ?
        -Infinity :
        parseInt(d.timestamp, 10);
    };
  };

  $.fn.dataTable.moment('YYYYMMDD HH:mm:ss');
  $.fn.dataTable.moment('YYYYMMDD');
  $.fn.dataTable.moment('DD/MM/YYYY');

  $.fn.dataTable.Api.register( 'column().data().max()', function () {
    return this.length ? this.reduce( function (a, b) {
      var x = parseFloat( a ) || 0;
      var y = parseFloat( b ) || 0;
      return Math.max(x, y);
    } ) : 0;
  } );

  $.fn.dataTable.Api.register( 'column().data().min()', function () {
    return this.length ? this.reduce( function (a, b) {
      var x = parseFloat( a ) || 0;
      var y = parseFloat( b ) || 0;
      return Math.min(x, y);
    } ) : 0;
  } );

  // detect and sort by file size
  jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    'file-size-pre': function(a) {
      var x = a.substring(0, a.length - 2);
      var xUnit = (a.substring(a.length - 2, a.length).toLowerCase() == 'mb' ?
        1000 : (a.substring(a.length - 2, a.length).toLowerCase() == 'gb' ? 1000000 : 1));
      return parseInt(x * xUnit, 10);
    },
    'file-size-asc': function(a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    'file-size-desc': function(a, b) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  });

  $.fn.dataTable.ext.search.push(
    function (settings, formattedRow, rowIndex, row) {

      if (!$(settings.nTHead).find('.filterRow').is(':visible')
          || $(settings.nTHead).find('.filter-input').hasClass('search-active')) {
        return true; // no filtering
      }

      var isValidJSIdentifier = function (columnTitle) {
        try {
          eval('var ' + columnTitle);
        } catch (e) { return false; }
        return true;
      };
      var formatValue = function (value) {
        if (typeof value === 'string') { return "'" + value + "'"; }
        if (value && value.type === 'Date') { return value.timestamp; }
        return value;
      };
      var evalExpression = function (expression, vars) {
        var result = true;
        if (!_.isEmpty(expression)) {
          try {
            result = eval(vars + expression);
          } catch (e) {
            if (!(e instanceof SyntaxError && e.message === 'Unexpected end of input')) {
              result = false;
              console.log(e.message);
            }
          }
        }
        return result;
      };

      var $$ = {};
      var variables = "var $ = undefined;";
      _.forEach(settings.aoColumns, function (column, index) {
        var title = $(column.sTitle).text();
        $$[title] = row[index];
        if (isValidJSIdentifier(title)) {
          variables += ('var ' + title + '=' + formatValue(row[index]) + ';');
        }
      });

      var tableFilterValue = findFilterInput(settings, 0).val();
      if (!evalExpression(tableFilterValue, variables)) {
        return false;
      }

      for (var colInd = 1; colInd < row.length; colInd++) {
        var columnFilter = findFilterInput(settings, colInd);
        if (columnFilter.hasClass('search-active')) {
          return true; //use expression parsing only for filtering
        }

        var columnFilterValue = columnFilter.val();

        if (_.isEmpty(columnFilterValue)) { continue; }

        variables += '$=' + formatValue(row[colInd]) + ';';
        if (!evalExpression(columnFilterValue, variables)) {
          return false;
        }
      }
      return true;
    }
  );

  jQuery.fn.dataTableExt.aTypes.unshift(function(sData) {
    if (typeof sData !== 'string') {
      return;
    }

    var sValidChars = '123456789';
    var Char;

    /* Check the numeric part */
    for (var i = 0; i < (sData.length - 3); i++) {
      Char = sData.charAt(i);
      if (sValidChars.indexOf(Char) == -1) {
        return null;
      }
    }
    /* Check for size unit KB, MB or GB */
    if (sData.substring(sData.length - 2, sData.length).toLowerCase() == 'kb' ||
        sData.substring(sData.length - 2, sData.length).toLowerCase() == 'mb' ||
        sData.substring(sData.length - 2, sData.length).toLowerCase() == 'gb') {
      return 'file-size';
    }
    return null;
  });

  // detect and sort by IP addresses
  jQuery.fn.dataTableExt.aTypes.unshift(function(sData) {
    if (/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(sData)) {
      return 'ip-address';
    }
    return null;
  });

  jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    'ip-address-pre': function(a) {
      var m = a.split('.');
      var x = '';
      for (var i = 0; i < m.length; i++) {
        var item = m[i];
        if (item.length === 1) {
          x += '00' + item;
        } else if (item.length === 2) {
          x += '0' + item;
        } else {
          x += item;
        }
      }
      return x;
    },
    'ip-address-asc': function(a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    'ip-address-desc': function(a, b) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
  });
}

function findFilterInput(dtSettings, colInd) {
  var colsLength = 0;
  _.forEach(dtSettings.aoColumns, function(value, key){
    if(dtSettings.aoColumns.hasOwnProperty(key) && value.bVisible){
      colsLength++;
    }
  });
  var fixedCols = dtSettings._oFixedColumns;
  var leftFixedHeader = fixedCols ? fixedCols.dom.clone.left.header : null;
  var rightFixedHeader = fixedCols ? fixedCols.dom.clone.right.header : null;
  var isFixedLeft = function (colInd) {
    return leftFixedHeader && fixedCols.s.leftColumns > colInd;
  };
  var isFixedRight = function (colInd) {
    return rightFixedHeader && fixedCols.s.rightColumns >= colsLength - colInd;
  };
  var jqInput;
  if (isFixedLeft(colInd)) {
    jqInput = $(leftFixedHeader).find('.filterRow th:eq(' + colInd + ') .filter-input');
  } else if (isFixedRight(colInd)) {
    var idxInRightClone = colInd - (colsLength - fixedCols.s.rightColumns);
    jqInput = $(rightFixedHeader).find('.filterRow th:eq(' + idxInRightClone + ') .filter-input');
  } else {
    var header = dtSettings.aoHeader[1][colInd];
    if (header) {
      jqInput = $(header.cell).find('.filter-input');
    }
  }
  return jqInput;
};

function findDTColumnIndex(dtSettings, dtElement){
  var colInd;
  var dtCellNode = $(dtElement).closest('td').length ? $(dtElement).closest('td') : $(dtElement).closest('th');
  var fixedCols = dtSettings._oFixedColumns;
  if (dtCellNode.is('td')) {
    colInd = fixedCols.fnGetPosition(dtCellNode[0])[2];
  } else if (dtCellNode.is('th')) {
    var thInd = dtCellNode.index();
    var rightHeader = fixedCols ? fixedCols.dom.clone.right.header : null;
    if (rightHeader && $(rightHeader).has(dtCellNode).length) {
      var colsLength = 0;
      _.forEach(dtSettings.aoColumns, function(value, key){
        if(dtSettings.aoColumns.hasOwnProperty(key) && value.bVisible){
          colsLength++;
        }
      });
      colInd = colsLength - fixedCols.s.rightColumns + thInd;
    } else {
      colInd = thInd;
    }
  }
  return colInd;
};