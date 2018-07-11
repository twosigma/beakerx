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
package com.twosigma.beakerx.clojure.kernel;

import com.twosigma.beakerx.BaseBeakerXJsonSerializer;
import com.twosigma.beakerx.clojure.serializers.ClojureCollectionDeserializer;
import com.twosigma.beakerx.clojure.serializers.ClojureMapDeserializer;
import com.twosigma.beakerx.clojure.serializers.ClojureTableDeserializer;
import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;

public class ClojureBeakerXJsonSerializer extends BaseBeakerXJsonSerializer {

  @Override
  protected BeakerObjectConverter createSerializer() {
    BasicObjectSerializer serializer = new BasicObjectSerializer();
    serializer.addfTypeDeserializer(new ClojureCollectionDeserializer(serializer));
    serializer.addfTypeDeserializer(new ClojureMapDeserializer(serializer));
    serializer.addfTypeDeserializer(new ClojureTableDeserializer(serializer));
    return serializer;
  }
}
