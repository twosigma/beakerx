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
package com.twosigma.beakerx.kernel.commands.type;

import com.google.common.collect.Sets;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import java.util.Set;

public class CellTimeMagicCommand extends AbstractTimeMagicCommand {

  public CellTimeMagicCommand(KernelFunctionality kernel, MessageCreator messageCreator) {
    super(TIME_CELL, "", Sets.newHashSet(MagicCommandType.CELL), messageCreator, kernel);
  }

  @Override
  public MagicCommandFunctionality build() {
    return this::time;
  }
}
