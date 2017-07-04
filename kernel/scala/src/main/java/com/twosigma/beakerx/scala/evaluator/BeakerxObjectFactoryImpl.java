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
package com.twosigma.beakerx.scala.evaluator;

public class BeakerxObjectFactoryImpl implements BeakerxObjectFactory {

  @Override
  public String create(String sessionId) {
    return "import com.twosigma.beakerx.NamespaceClient\n" +
            "import language.dynamics\n" +
            "var _beaker = NamespaceClient.getBeaker(\"" + sessionId + "\")\n" +
            "object beaker extends Dynamic {\n" +
            "  def selectDynamic( field : String ) = _beaker.get(field)\n" +
            "  def updateDynamic (field : String)(value : Any) : Any = {\n" +
            "    _beaker.set(field,value)\n" +
            "    return value\n" +
            "  }\n" +
            "  def applyDynamic(methodName: String)(args: AnyRef*) = {\n" +
            "    def argtypes = args.map(_.getClass)\n" +
            "    def method = _beaker.getClass.getMethod(methodName, argtypes: _*)\n" +
            "    method.invoke(_beaker,args: _*)\n" +
            "  }\n" +
            "}\n";
  }
}
