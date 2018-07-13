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
package com.twosigma.beakerx.scala.kernel;

import com.twosigma.beakerx.BaseBeakerXJsonSerializer;
import com.twosigma.beakerx.jvm.serialization.BasicObjectSerializer;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.scala.serializers.ScalaCollectionDeserializer;
import com.twosigma.beakerx.scala.serializers.ScalaCollectionSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaListOfPrimitiveTypeMapsSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaMapDeserializer;
import com.twosigma.beakerx.scala.serializers.ScalaMapSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaPrimitiveTypeListOfListSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaPrimitiveTypeMapSerializer;
import com.twosigma.beakerx.scala.serializers.ScalaTableDeSerializer;

public class ScalaBeakerXJsonSerializer extends BaseBeakerXJsonSerializer {

  @Override
  protected BeakerObjectConverter createSerializer() {
    BasicObjectSerializer serializer = new BasicObjectSerializer();
    serializer.addfTypeSerializer(new ScalaCollectionSerializer(serializer));
    serializer.addfTypeSerializer(new ScalaMapSerializer(serializer));
    serializer.addfTypeSerializer(new ScalaPrimitiveTypeListOfListSerializer(serializer));
    serializer.addfTypeSerializer(new ScalaListOfPrimitiveTypeMapsSerializer(serializer));
    serializer.addfTypeSerializer(new ScalaPrimitiveTypeMapSerializer(serializer));
    serializer.addfTypeDeserializer(new ScalaCollectionDeserializer(serializer));
    serializer.addfTypeDeserializer(new ScalaMapDeserializer(serializer));
    serializer.addfTypeDeserializer(new ScalaTableDeSerializer(serializer));
    return serializer;
  }
}
