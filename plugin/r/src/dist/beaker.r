library(RCurl, quietly=TRUE)
library(RJSONIO, quietly=TRUE)

beaker_pwarg = paste('beaker:',Sys.getenv("beaker_core_password"),sep='')

beaker_set4 <- function(var, val, unset, sync) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
           '/rest/namespace/set', sep='')
  opts = list(userpwd=beaker_pwarg, httpauth = AUTH_BASIC)
  if (unset) {
    postForm(req, style='POST', name=var, session=beaker_session_id_, sync=sync, .opts=opts)
  } else {
    postForm(req, style='POST', name=var, value=toJSON(val), session=beaker_session_id_, sync=sync, .opts=opts)
  }
  return (val)
}

beaker_set <- function(var, val) {
  return (beaker_set4(var, val, FALSE, TRUE))
}

beaker_unset <- function(var) {
  return (beaker_set4(var, NULL, TRUE, TRUE))
}

# returns before it completes
beaker_set_fast <- function(var, val) {
  return (beaker_set4(var, val, FALSE, FALSE))
}

beaker_get <- function(var) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/namespace/get?name=', var, '&session=', beaker_session_id_, sep='')
  res = getURL(req, userpwd=beaker_pwarg, httpauth = AUTH_BASIC)
  return (fromJSON(res)$value)
}
