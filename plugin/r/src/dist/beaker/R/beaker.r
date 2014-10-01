# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

library(RCurl, quietly=TRUE)
library(RJSONIO, quietly=TRUE)

pwarg = paste('beaker:', Sys.getenv("beaker_core_password"), sep='')

session_id = ''

set_session <- function(id) {
  session_id <<- id
}

set4 <- function(var, val, unset, sync) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
           '/rest/namespace/set', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  if (unset) {
    reply = postForm(req, style='POST', name=var, session=session_id, sync=sync, .opts=opts)
  } else {
    reply = postForm(req, style='POST', name=var, value=toJSON(val), session=session_id, sync=sync, .opts=opts)
  }
  if (reply != 'ok') {
    stop(paste(reply))
  }
  return (val)
}

set <- function(var, val) {
  return (set4(var, val, FALSE, TRUE))
}

unset <- function(var) {
  return (set4(var, NULL, TRUE, TRUE))
}

# returns before it completes
set_fast <- function(var, val) {
  return (set4(var, val, FALSE, FALSE))
}

get <- function(var) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/namespace/get?name=', var, '&session=', session_id, sep='')
  res = fromJSON(getURL(req, userpwd=pwarg, httpauth = AUTH_BASIC))
  if (!res$defined) {
    stop(paste("object '", var, "' not found in notebook namespace.", sep=''))
  }
  return (res$value)
}
