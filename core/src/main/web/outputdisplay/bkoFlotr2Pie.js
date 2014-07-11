//Priyanka Inani & Di Wu
//Limit 23 records
(function () {
    'use strict';
    beaker.bkoDirective("flotr2Pie", ["generalUtils", function (generalUtils) {
      return {
            template: 
              '<div class="MyPieClass">'
            +   '<div class="row-fluid">'
            +     '<div class="span8"></div>'
            +     '<div class="span4">'
            +       '<button class="btn btn-primary" ng-click="toggleConf()"><i class="icon-cog"></i>&nbsp; {{hideOrShowConf}} Configuration&nbsp;</button>'
            +       '<div id="{{randID}}initError" class="label label-important">{{initReadyToGraph()}}</div>'
            +     '</div>'
            +   '</div>'
            +   '<ul class="unstyled">'
            +     '<li ng-repeat="pie in pieGroup track by $index">'
            +       '<div class="row-fluid">'
            +         '<div class="span8 {{randID}}graph">'
            +           '<div class="btn-group">'
            +             '<button type="button" class="btn btn-mini" ng-click="downloadPic(\'jpeg\', pie.id)">JPEG</button>'
            +             '<button type="button" class="btn btn-mini" ng-click="downloadPic(\'png\', pie.id)">PNG</button>'
            +           '</div>'
            +           '<div id="{{randID}}{{pie.id}}" style="height:384px;margin:8px auto">{{showGraph(pie)}}</div>'
            +         '</div>'
            +         '<div class="span4 {{randID}}configuration" style="{{displayConf}}">'
            +           '<button class="btn btn-mini btn-danger" ng-click="removePie(pie.id)"><i class="icon-minus"></i>Remove Pie</button>'
            +           '<button class="btn btn-mini btn-success" ng-click="addPie(pie.id)"><i class="icon-plus"></i>Add Pie Above</button>'
            +           '<table>'
            +             '<tr><td><b>Category&nbsp;</b></td> <td><select ng-model="pie.category" ng-options="categoryOption.colName for categoryOption in categoryOptions"></select></td></tr>'
            +             '<tr><td><b>Size&nbsp;</b></td>     <td><select ng-model="pie.size" ng-options="sizeOption.colName for sizeOption in sizeOptions"></select></td></tr>'  
            +             '<tr><td><b>Title&nbsp;</b></td>    <td><input ng-model="pie.title" type="text" class="input-medium" placeholder="Enter pie title"></td></tr>'     
            +           '</table>'
            +         '</div>'
            +       '</div>'
            +     '</li>'
            +   '</ul>'
            + '</div>'
            ,
link: function(scope, element, attrs) {
/*Variable Declaration*/
var
    jsObj = scope.model.getCellModel(),
    colNames = jsObj.columnNames,
    numCol = colNames.length,
    records = jsObj.values,
    numRecords = records.length,
    errors = ["Please have at least two columns.", "At least one column should be numeric."],
    graphs = [];
scope.pieGroup = [];
scope.output = [];
scope.categoryOptions = [];
scope.sizeOptions = [];
scope.defaultPie;
scope.randID = generalUtils.generateID(10);
/*Variable declaration end*/
console.log("Pie");
console.log(jsObj);

scope.downloadPic = function(format, id) {
  if (Flotr.isIE && Flotr.isIE < 9) {
      alert(
        "Your browser doesn't allow you to get a bitmap image from the plot, " +
        "you can only get a VML image that you can use in Microsoft Office.<br />"
      );
  }
  var graph = graphs[id];
  graph.download.saveImage(format);
}

/*Get/Organize User Input*/
checkCol();
function checkCol() {
  var col, row;
  for(col = 0; col < numCol; col++) {
    scope.categoryOptions.push({colIndex:col, colName:colNames[col]});
    for(row = 0; row < numRecords; row++) {
      if(!isNumber(records[row][col])) {
        break;
      }
    }
    if(row===numRecords)
      scope.sizeOptions.push({colIndex:col, colName:colNames[col]});
  }
}
/*Get/Organize User Input end*/

/*Error Checking*/
scope.initReadyToGraph = function(){
  var opt;
  if(numCol<2) {
    scope.hideOrShowConf = " Hide ";
    scope.displayConf = "display:none;";
    scope.readyToGraph = false;
    return errors[0];
  }
  else if(scope.sizeOptions.length<1) {
    scope.hideOrShowConf = " Hide ";
    scope.displayConf = "display:none;";
    scope.readyToGraph = false;
    return errors[1];
  }
  else
    scope.readyToGraph = true;
}

/*Error Checking end*/

/*Default Graph*/
defaultGraph();
function defaultGraph() {
  if(numCol>=2 && scope.sizeOptions.length>=1) {
    var size = scope.sizeOptions[0];
    var category;
    for(var i = 0; i < scope.categoryOptions.length; i++){
      var cat = scope.categoryOptions[i];
      if(cat.colIndex != size.colIndex) {
        category = cat;
        break;
      }
    }
    var title = "[Category: " + category.colName + "]\t[Size: " + size.colName + "]";
    scope.defaultPie = {id: 0, title: title, size: size, category: category};
    scope.pieGroup = [clone(scope.defaultPie)];
  }
}
/*Default Graph end*/

/*Add/Remove Pie*/
scope.addPie = function(currPieID) {
  scope.pieGroup.splice(currPieID, 0, clone(scope.defaultPie) );
  for(var i = 0; i < scope.pieGroup.length; i++) {
    scope.pieGroup[i].id = i;
  }
}

scope.removePie = function(pieID) {
  scope.pieGroup.splice(pieID, 1);
  for(var i = 0; i < scope.pieGroup.length; i++) {
    scope.pieGroup[i].id = i;
  }
}
/**/

/*Pie Graph Functions*/
scope.showGraph=function(pie) {
  if(scope.readyToGraph) {
    getOutputDisplay(pie);
  }
}

function getOutputDisplay(pie){
  var data, finalTitle, container, graph;
   data = getOnePieData(pie.size.colIndex, pie.category.colIndex);
   var id = pie.id;
   scope.output[id] = {};
  scope.output[id].inObj = jsObj;
  scope.output[id].processedData = data;

  if(needReset(pie.title)) 
    finalTitle = "[Category: " + pie.category.colName + "]\t[Size: " + pie.size.colName + "]";
  else finalTitle=pie.title;

  container = document.getElementById(scope.randID+pie.id);

  scope.output[id].graphSetting = {
    title: finalTitle,
    HtmlText: false,
    pie:{
      show: true,
      explode: 6
    },
    xaxis: {
      showLabels: false
    }, 
    yaxis: {
      showLabels: false
    },
    grid: {
      verticalLines: false,
      horizontalLines : false
    },
    mouse: {
      track: true
    },
    legend: {
      position: 'se',
      backgroundColor: '#D2E8FF'
    }
  };


  graph = Flotr.draw(container, data, scope.output[id].graphSetting);

  if(pie.id >= graphs.length) {
    graphs.splice(pie.id, 0, graph);
  }
  else {
    graphs[pie.id] = graph;
  }

}

function getOnePieData(size, category) {

  var
    finalData = [], row, lb;

  for(row = 0; row < numRecords; row++) {
    if(isNumber(records[row][category]))
      lb = records[row][category];
    else
      lb = records[row][category].trim()
    
    finalData.push( { data: [[ 0, parseFloat(records[row][size]) ]], label: lb } );
  }
  return finalData;
  
}

/*Pie Graph Functions End*/

/*Show hide configuration*/
scope.hideOrShowConf = " Hide ";
scope.displayConf = "display:block;";
scope.toggleConf = function() {
  if(scope.displayConf==="display:block;") {
    scope.displayConf = "display:none;";
    scope.hideOrShowConf = "Show";
  }
  else {
    scope.displayConf = "display:block;";
    scope.hideOrShowConf = " Hide ";
  }
}
/*End of show hide configuration*/

/*helper functions*/
function isNumber(n) {
  return n!=undefined && !isNaN(parseFloat(n)) && isFinite(n);
}

function needReset(varStr) {
  return (varStr===undefined||varStr===null||varStr==="");
}

function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n > 0;
}

function clone(obj) {
    if (null === obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

$(window).resize(function() {
  var pie;
  for(var i = 0; i < scope.pieGroup.length; i++) {
    pie = scope.pieGroup[i];
    scope.showGraph(pie);
  }
});
/*end of helper functions*/

        }
      };
    }]);
})(); 
