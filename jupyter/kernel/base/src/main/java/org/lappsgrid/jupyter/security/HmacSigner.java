package org.lappsgrid.jupyter.security;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Generates HMACs (Hashed Message Authentication Codes) for messages exchanged
 * with Jupyter. Jupyter supplies us with the signing key in the connection
 * information file that is passed in as a parameter when a kernel is started.
 *
 * @author Keith Suderman
 */
public class HmacSigner {

  private static Logger logger = LoggerFactory.getLogger(HmacSigner.class);
  private static final String TYPE = "HmacSHA256";
  private SecretKeySpec spec;

  public HmacSigner(String key) {
    if (key == null) {
      throw new NullPointerException("No hmac specified.");
    }
    logger.info("Using signing hmac: {}", key);
    spec = new SecretKeySpec(key.getBytes(), TYPE);
  }

  public String sign(List<String> msg) throws NoSuchAlgorithmException {
    try {
      final Mac mac = Mac.getInstance(TYPE);
      mac.init(spec);
      msg.forEach(it -> mac.update(it.getBytes()));
      byte[] digest = mac.doFinal();
      return asHex(digest);
    } catch (InvalidKeyException e) {
      logger.error("Unable to sign message", e);
      throw new RuntimeException("Invalid hmac exception while converting to HmacSHA256");
    }

  }

  public String signBytes(List<byte[]> msg) throws NoSuchAlgorithmException {
    try {
      final Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(spec);
      msg.forEach(it -> mac.update(it));
      byte[] digest = mac.doFinal();
      return asHex(digest);
    } catch (InvalidKeyException e) {
      logger.error("Unable to sign message", e);
      throw new RuntimeException("Invalid hmac exception while converting to HmacSHA256");
    }

  }

  public String asHex(byte[] buffer) {
    return Hex.encodeHexString(buffer);
  }

}