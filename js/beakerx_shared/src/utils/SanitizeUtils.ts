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

declare global {
  interface Window {
    cssSchemaFixed: boolean;
    cssSchema: any;
    require: any;
  }
  var Jupyter: any;
}

export default class SanitizeUtils {

  private static fixCaja(): void {
    const deepcopy = (original: any) => JSON.parse(JSON.stringify(original));

    if (!window.cssSchemaFixed) {
      // fix caja to support svg color/painting attributes before using it.
      // some of the attributes can be directly copied. some of them needs modification
      // for details, see https://github.com/google/caja/blob/1056be89dad487f9178d89f462fe5cb207c7e604/src/com/google/caja/lang/css/css3-defs.json
      const ATTRIBS = window.cssSchema;

      ATTRIBS['color-rendering'] = deepcopy(ATTRIBS['speak']);
      ATTRIBS['color-rendering'].cssLitGroup[0][0] = "auto";
      ATTRIBS['color-rendering'].cssLitGroup[1][0] = "optimizeSpeed";
      ATTRIBS['color-rendering'].cssLitGroup[2][0] = "optimizeQuality";
      ATTRIBS['fill'] = ATTRIBS['color'];
      ATTRIBS['fill-opacity'] = ATTRIBS['opacity'];
      ATTRIBS['fill-rule'] = deepcopy(ATTRIBS['speak-header']);
      ATTRIBS['fill-rule'].cssLitGroup[0][0] = "nonzero";
      ATTRIBS['fill-rule'].cssLitGroup[1][0] = "evenodd";
      ATTRIBS['image-rendering'] = ATTRIBS['color-rendering'];
      ATTRIBS['marker-start'] = ATTRIBS['cue-before'];
      ATTRIBS['marker-mid'] = ATTRIBS['cue-before'];
      ATTRIBS['marker-end'] = ATTRIBS['cue-before'];
      ATTRIBS['shape-rendering'] = deepcopy(ATTRIBS['text-transform']);
      ATTRIBS['shape-rendering'].cssLitGroup[0][0] = "optimizeSpeed";
      ATTRIBS['shape-rendering'].cssLitGroup[0][1] = "crispEdges";
      ATTRIBS['shape-rendering'].cssLitGroup[0][2] = "geometricPrecision";
      ATTRIBS['shape-rendering'].cssLitGroup[1][0] = "auto";
      ATTRIBS['stroke'] = ATTRIBS['color'];
      ATTRIBS['stroke-linecap'] = deepcopy(ATTRIBS['speak']);
      ATTRIBS['stroke-linecap'].cssLitGroup[0][0] = "butt";
      ATTRIBS['stroke-linecap'].cssLitGroup[1][0] = "round";
      ATTRIBS['stroke-linecap'].cssLitGroup[2][0] = "square";
      ATTRIBS['stroke-linejoin'] = deepcopy(ATTRIBS['speak']);
      ATTRIBS['stroke-linejoin'].cssLitGroup[0][0] = "miter";
      ATTRIBS['stroke-linejoin'].cssLitGroup[1][0] = "round";
      ATTRIBS['stroke-linejoin'].cssLitGroup[2][0] = "bevel";
      ATTRIBS['stroke-miterlimit'] = ATTRIBS['stress'];
      ATTRIBS['stroke-opacity'] = ATTRIBS['opacity'];
      ATTRIBS['stroke-width'] = ATTRIBS['max-width'];
      ATTRIBS['text-rendering'] = deepcopy(ATTRIBS['shape-rendering']);
      ATTRIBS['text-rendering'].cssLitGroup[0][1] = "optimizeLegibility";

      window.cssSchemaFixed = true;
    }
  }

  public static sanitizeStyle(): (style: string) => string {
    try {
      const caja = Jupyter && window.require('base/js/security').caja;
      window.cssSchemaFixed = false;
      window.cssSchema = window.cssSchema || {};

      this.fixCaja();

      return styleString => caja.sanitizeStylesheet(
        window.location.pathname,
        styleString,
        {
          containerClass: null,
          idSuffox: '',
          virtualizeAttrName: (x: any) => x
        }
      );
    } catch(e) {
      return original => original
    }
  }

  public static sanitizeHTML(html: string, allowCss: boolean = false) {
    try {
      const sanitize_html = Jupyter && window.require('base/js/security').sanitize_html;

      return sanitize_html(html, allowCss);
    } catch(error) {
      return html;
    }
  };
}