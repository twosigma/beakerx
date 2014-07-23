library(RCurl, quietly=TRUE)
library(RJSONIO, quietly=TRUE)

pwarg = paste('beaker:',Sys.getenv("beaker_core_password"),sep='')

bset4 <- function(var, val, unset, sync) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
           '/rest/namespace/set', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  if (unset) {
    postForm(req, style='POST', name=var, session=beaker_session_id_, sync=sync, .opts=opts)
  } else {
    postForm(req, style='POST', name=var, value=toJSON(val), session=beaker_session_id_, sync=sync, .opts=opts)
  }
  return (val)
}

bset <- function(var, val) {
  return (bset4(var, val, FALSE, TRUE))
}

bunset <- function(var) {
  return (bset4(var, NULL, TRUE, TRUE))
}

# returns before it completes
bset_fast <- function(var, val) {
  return (bset4(var, val, FALSE, FALSE))
}

bget <- function(var) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/namespace/get?name=', var, '&session=', beaker_session_id_, sep='')
  res = getURL(req, userpwd=pwarg, httpauth = AUTH_BASIC)
  return (fromJSON(res)$value)
}
