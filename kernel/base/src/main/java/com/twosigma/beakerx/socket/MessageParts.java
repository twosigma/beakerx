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
package com.twosigma.beakerx.socket;

/**
 * http://jupyter-client.readthedocs.org/en/latest/messaging.html#the-wire-protocol
 * <p>
 * b'u-u-i-d',         # zmq identity(ies)
 * b'<IDS|MSG>',       # delimiter
 * b'baddad42',        # HMAC signature
 * b'{header}',        # serialized header dict
 * b'{parent_header}', # serialized parent header dict
 * b'{metadata}',      # serialized metadata dict
 * b'{content}',       # serialized content dict
 * b'\xf0\x9f\x90\xb1' # extra raw data buffer(s)
 */
public class MessageParts {

  public static final int UUID = 0;
  public static final int DELIM = 1;
  public static final int HMAC = 2;
  public static final int HEADER = 3;
  public static final int PARENT = 4;
  public static final int METADATA = 5;
  public static final int CONTENT = 6;

}
