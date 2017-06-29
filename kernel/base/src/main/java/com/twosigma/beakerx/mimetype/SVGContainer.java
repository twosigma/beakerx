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
package com.twosigma.beakerx.mimetype;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URL;


public class SVGContainer extends MIMEContainer {

  public SVGContainer(String mime, String code) {
    super(mime, code);
  }

  public static MIMEContainer SVG(Object data) throws Exception {
    String code = "";
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = factory.newDocumentBuilder();
    Document doc = validateData(data, builder);
    TransformerFactory tf = TransformerFactory.newInstance();
    Transformer transformer = tf.newTransformer();
    transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
    StringWriter writer = new StringWriter();
    transformer.transform(new DOMSource(doc), new StreamResult(writer));
    code = writer.getBuffer().toString().replaceAll("\n|\r", "");
    return addMimeType(MIME.IMAGE_SVG, code);
  }

  private static Document validateData(Object data, DocumentBuilder builder) throws SAXException, IOException {
    Document doc;
    if (data instanceof String) {
      String path = data.toString();
      if (isValidURL(path)) {
        doc = builder.parse(new URL(path).openStream());
      } else if (exists(path)) {
        doc = builder.parse(path);
      } else {
        throw new FileNotFoundException(path + " doesn't exist. ");
      }
    } else {
      doc = builder.parse(new ByteArrayInputStream((byte[]) data));
    }
    return doc;
  }

}