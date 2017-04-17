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
package com.twosigma.jupyter.security;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

public class HashedMessageAuthenticationCode {

  private static final String TYPE = "HmacSHA256";
  private static final String INVALID_HMAC_EXCEPTION = "Invalid key exception while converting to " + TYPE;
  private static Logger logger = LoggerFactory.getLogger(HashedMessageAuthenticationCode.class);

  private SecretKeySpec spec;

  public HashedMessageAuthenticationCode(String key) {
    checkNotNull(key, "No key specified");
    logger.debug("Using signing hmac: {}", key);
    spec = new SecretKeySpec(key.getBytes(), TYPE);
  }

  public String sign(List<String> msg) {
    List<byte[]> collect = msg.stream().map(String::getBytes).collect(Collectors.toList());
    return signBytes(collect);
  }

  public String signBytes(List<byte[]> msg) {
    try {
      final Mac mac = Mac.getInstance(TYPE);
      mac.init(spec);
      msg.forEach(it -> mac.update(it));
      byte[] digest = mac.doFinal();
      return toHex(digest);
    } catch (InvalidKeyException e) {
      throw new RuntimeException(INVALID_HMAC_EXCEPTION, e);
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

  public String toHex(byte[] buffer) {
    return Hex.encodeHexString(buffer);
  }

}
