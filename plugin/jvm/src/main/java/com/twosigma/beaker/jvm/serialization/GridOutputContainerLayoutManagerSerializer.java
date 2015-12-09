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
package com.twosigma.beaker.jvm.serialization;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.jvm.object.GridOutputContainerLayoutManager;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class GridOutputContainerLayoutManagerSerializer extends OutputContainerLayoutManagerSerializer<GridOutputContainerLayoutManager>  {

  @Inject
  public GridOutputContainerLayoutManagerSerializer(Provider<BeakerObjectConverter> osp) {
    super(osp);
  }

  @Override
  protected void serialize(GridOutputContainerLayoutManager value, JsonGenerator jgen) throws
                                                                                         IOException {
    jgen.writeObjectField("columns", value.getColumns());
    jgen.writeObjectField("dividerWidth", value.getDividerWidth());
  }
}
