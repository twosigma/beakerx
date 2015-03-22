/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
(function() {
  "use strict";
  window.bkInit.getEvaluatorUrlMap = function() {
    return {
      "IPython": { url : "./plugins/eval/ipythonPlugins/ipython/ipython.js", bgColor: "#EEBD48", fgColor: "#FFFFFF", borderColor: "", shortName: "Py" },
      "Python3": { url : "./plugins/eval/ipythonPlugins/python3/python3.js", bgColor: "#EEBD48", fgColor: "#FFFFFF", borderColor: "", shortName: "Py" },
      // "IRuby": { url : "./plugins/eval/ipythonPlugins/iruby/iruby.js", bgColor: "#AF1712", fgColor: "#FFFFFF", borderColor: "", shortName: "Rb" },
      "Julia": { url : "./plugins/eval/ipythonPlugins/julia/julia.js", bgColor: "#6EAC5E", fgColor: "#FFFFFF", borderColor: "", shortName: "Jl" },
      "Groovy": { url : "./plugins/eval/groovy/groovy.js", bgColor: "#6497A9", fgColor: "#FFFFFF", borderColor: "", shortName: "Gv" },
      "Java": { url : "./plugins/eval/javash/javash.js", bgColor: "#EB0000", fgColor: "#FFFFFF", borderColor: "", shortName: "Jv" },
      "R": { url : "./plugins/eval/r/r.js", bgColor: "#8495BB", fgColor: "#FFFFFF", borderColor: "", shortName: "R" },
      "Scala": { url : "./plugins/eval/scala/scala.js", bgColor: "#B41703", fgColor: "#FFFFFF", borderColor: "", shortName: "Sc" },
      "Clojure": { url : "./plugins/eval/clojure/clojure.js", bgColor: "#5881d8", fgColor: "#FFFFFF", borderColor: "", shortName: "Cj" },
      "Node": { url : "./plugins/eval/node/node.js", bgColor: "#8EC453", fgColor: "#FFFFFF", borderColor: "", shortName: "N" },
      "kdb": { url : "./plugins/eval/kdb/kdb.js", bgColor: "#353C41", fgColor: "#FFFFFF", borderColor: "", shortName: "K" }
    };
  };
})();
