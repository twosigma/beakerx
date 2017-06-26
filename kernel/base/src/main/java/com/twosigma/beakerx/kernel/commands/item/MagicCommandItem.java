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
package com.twosigma.beakerx.kernel.commands.item;

import com.twosigma.beakerx.kernel.CodeWithoutCommand;
import com.twosigma.beakerx.message.Message;

import java.util.Optional;

public interface MagicCommandItem {

  boolean hasCodeToExecute();

  boolean hasResult();

  Optional<Message> getResult();

  Optional<Message> getReply();

  Optional<CodeWithoutCommand> getCode();
}
