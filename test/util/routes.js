var Path = require("path");
var root = process.env["BASE_PATH"] || "http://127.0.0.1:8801";

module.exports = function() {
  this.Routes = {
    "Dashboard": Path.join(root, "beaker/#/control")
  }
}
