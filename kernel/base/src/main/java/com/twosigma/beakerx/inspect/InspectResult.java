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
package com.twosigma.beakerx.inspect;

public class InspectResult {
    private InspectData data;
    private int startIndex;
    private Boolean found;

    public InspectResult(){
        this("", 0);
        this.setFound(false);
    }
    public InspectResult(String data, int startIndex) {
        this.data = new InspectData(data);
        this.startIndex = startIndex;
        this.found = true;

    }

    public int getStartIndex() {
        return startIndex;
    }

    public InspectData getData() {
        return data;
    }

    public Boolean getFound() {
        return found;
    }

    public void setFound(Boolean found) {
        this.found = found;
    }
}
