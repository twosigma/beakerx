/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

define([
  './enigmaData.json',
],function(
  engimaData
){
  function enigmaImpl() {
    this.providerName = "Engima";
    this.icon = "https://assets.enigma.com/blocks/Meet-the-new-Public-3.svg?mtime=20170620130459";
    this.color = "#000000";
    
    this.getDataSet = function () {
      if (engimaData != null) {
        return engimaData.datasets;
      }
    };

    this.getCodeSample = function(entry, language) {
      if (language == "python") {
        code = "import requests \n\
url = 'https://public.enigma.com/api/snapshots/" + entry.dataid + "?&row_limit=100'\n\
response = requests.get(url)\n\
data = response.json()\n\
df = pd.DataFrame(data=data['table_rows']['rows'],columns=data['table_rows']['fields']) \n\
df\n ";
        return code;
    }
  }
 };
  module.exports = {
    enigmaImpl: enigmaImpl
  };
});

