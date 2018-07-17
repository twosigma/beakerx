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

import static com.twosigma.beakerx.BeakerXClientManager.BEAKER_X_CLIENT_MANAGER_GET;
import static com.twosigma.beakerx.BeakerXClientManager.BEAKER_X_CLIENT_MANAGER_PATH;

public class BeakerxObjectFactoryImpl implements BeakerxObjectFactory {

  @Override
  public String create() {
    return "import " + BEAKER_X_CLIENT_MANAGER_PATH + "\n" +
            "import language.dynamics\n" +
            "implicit class ObjectEnhancement(obj: Any) { def as[T] = obj.asInstanceOf[T]}\n" +
            "var _beakerx = " + BEAKER_X_CLIENT_MANAGER_GET + "\n" +
            "object beakerx extends Dynamic {\n" +
            "  def selectDynamic( field : String ) = _beakerx.get(field)\n" +
            "  def updateDynamic (field : String)(value : Any) : Any = {\n" +
            "    _beakerx.set(field,value)\n" +
            "    return value\n" +
            "  }\n" +
            "  def applyDynamic(methodName: String)(args: AnyRef*) = {\n" +
            "    def argtypes = args.map(_.getClass)\n" +
            "    def method = _beakerx.getClass.getMethod(methodName, argtypes: _*)\n" +
            "    method.invoke(_beakerx,args: _*)\n" +
            "  }\n" +
            "}\n";
  }
}
