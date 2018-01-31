/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

var PlotHelperObject = function () {

  this.getPlotTitle = function(dtContainer){
    return dtContainer.$('#plotTitle');
  };

  this.checkPlotTitle = function(dtContainer, textValue){
    expect(this.getPlotTitle(dtContainer).getText()).toEqual(textValue);
  };

  this.getPlotXLabel = function(dtContainer){
    return dtContainer.$('#xlabel');
  };

  this.checkPlotXLabel = function(dtContainer, textValue){
    expect(this.getPlotXLabel(dtContainer).getText()).toEqual(textValue);
  };

  this.getPlotYLabel = function(dtContainer){
    return dtContainer.$('#ylabel');
  };

  this.checkPlotYLabel = function(dtContainer, textValue){
    expect(this.getPlotYLabel(dtContainer).getText()).toEqual(textValue);
  };

};
module.exports = PlotHelperObject;