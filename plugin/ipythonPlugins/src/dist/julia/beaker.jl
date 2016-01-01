# Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

module Beaker

using JSON
using Requests

core_url = string("http://beaker:", ENV["beaker_core_password"], "@127.0.0.1:", ENV["beaker_core_port"])

function setsession(id)
  global sessionid = id
end

function get(var)
  reply = Requests.json(Requests.get(string(core_url, "/rest/namespace/get"); query = Dict("name" => var, "session" => sessionid)))
  if !reply["defined"]
    error(string("name '", var, "' is not defined in notebook namespace"))
  end
  return reply["value"]
end

function set4(var, val, unset, sync)
  args = Dict("name" => var, "session" => sessionid, "sync" => sync)
  if !unset
    args["value"] = JSON.json(val)
  end
  reply = readall(Requests.post(string(core_url, "/rest/namespace/set"); data = args))
  if reply != "ok"
    error(reply)
  end
end

function set(var, val)
  return set4(var, val, false, true)
end

end
