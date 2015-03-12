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

collapse_unit_vectors <- FALSE

convertToJSON <- function(val) {
  if (class(val) == "data.frame") {
    p = "{ \"type\":\"TableDisplay\",\"columnNames\":"
    colNames = names(val)
    types = lapply(val,class)
    p = paste(p, toJSON(colNames))
    p = paste(p, ", \"values\":")
    p = paste(p,toJSON(val, byrow = TRUE))
    p = paste(p, ", \"types\": [")
    comma = FALSE
    for(i in 1:length(types)) {
      c = types[i]
      if (comma)
        p = paste(p, ",")
      comma = TRUE
      if (c == "numeric")
        p = paste(p, "\"double\"")
      else if (c == "logical")
        p = paste(p, "\"boolean\"")
      else if (c == "factor")
        p = paste(p, "\"select\"")
      else
        p = paste(p, "\"string\"")
    }
    p = paste(p, "] }")
    o = p
  }
  else if (class(val) == "numeric" || class(val) == "character" || class(val) == "logical" || class(val) == "factor") {
  	if (collapse_unit_vectors && length(val) == 1) {
  	  o = toJSON(val, .level=0L);
  	} else {
   	  o = toJSON(val)
    }
  } else if (class(val) == "matrix") {
    o = toJSON(val)
  } else if (class(val) == "table") {
    o = toJSON(val)
  } else if (class(val) == "list") {
    o = toJSON(val)
  } else if (class(val) == "complex") {
    if (collapse_unit_vectors && length(val) == 1) {
      o = toJSON(as.character(val), .level=0L)
    } else {
      o = toJSON(as.character(val))
    }
  } else {
    o = toJSON(val)
  }
  return (o)
}

set4 <- function(var, val, unset, sync) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
           '/rest/namespace/set', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  if (unset) {
    reply = postForm(req, style='POST', name=var, session=session_id, sync=sync, .opts=opts)
  } else {
    reply = postForm(req, style='POST', name=var, value=convertToJSON(val), session=session_id, sync=sync, .opts=opts)
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

convertVarFromJSON <- function(res, var) {
  tres = fromJSON(res)
  if (!tres$defined) {
    stop(paste("object '", var, "' not found in notebook namespace.", sep=''))
  }
  tres = transformJSON(tres$value)
  return (tres)
}

transformJSON <- function(tres) {
  if (is.list(tres) && exists("type", where=tres) && tres[["type"]] == "TableDisplay") {
    cols <- length(tres$columnNames)
    rows <- length(tres$values)
    if (cols == 2 && tres$columnNames[1] == "Key" && tres$columnNames[2] == "Value") {
      o = list()
      for (i in 1:rows) {
        o[[ tres$values[[i]][[1]] ]] = tres$values[[i]][[2]]
      }
      tres = o
    } else {
	  dummy_nv = logical(rows)
	  df <- data.frame(dummy_nv);
	  for (i in 1:cols) {
	    if (exists("types", where=tres) && (tres$types[i] == "double" || tres$types[i] == "integer")) {
		  nv <- numeric(rows);
		  for( j in 1:rows) {
		    if ( is.null( tres$values[[j]][[i]] ) )
		      nv [j] <- NaN
		    else
		      nv [j] <- as.numeric( tres$values[[j]][[i]] )
		  }
	  	  df[ tres$columnNames[[i]] ] = nv
		} else {
		  nv <- character( rows );
          for( j in 1:rows) {
            if ( is.null( tres$values[[j]][[i]] ) )
              nv [j] <- ""
            else
		      nv [j] <- as.character( tres$values[[j]][[i]] )
          }
		  if(exists("types", where=tres) && tres$types[[i]] == "select") 
		    df[ tres$columnNames[[i]] ] = factor(nv)		  
		  else
		    df[ tres$columnNames[[i]] ] = nv		 
        }
	  }
      tres <- df[ tres$columnNames ]
      ismatrix <- TRUE
      for (i in 1:cols) {
        pp = paste("c",i-1, sep="")
        if ( names(tres)[[i]] != pp )
          ismatrix <- FALSE
      }
      if (ismatrix) {
       tres = data.matrix(tres)
      }
    }
  }
  return (tres)
}


get <- function(var) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/namespace/get?name=', var, '&session=', session_id, sep='')
  res = convertVarFromJSON(getURL(req, userpwd=pwarg, httpauth = AUTH_BASIC), var)
  return (res)
}

saved_svg_options = c()

svg_options <- function(...) {
  saved_svg_options <<- list(...)
}

showProgressUpdate <- function(...) {
  write("WARNING: R language plugin does not support progress updates", stderr())
}

evaluate <- function(filter) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/evaluate', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', filter=filter, session=session_id, .opts=opts)
  if (isValidJSON(reply,TRUE))
	res = transformJSON(fromJSON(reply))
  else
    res = reply
  return (res)
}

evaluateCode <- function(evaluator,code) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/evaluateCode', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', evaluator=evaluator, code=code, session=session_id, .opts=opts)
  if (isValidJSON(reply,TRUE))
	res = transformJSON(fromJSON(reply))
  else
    res = reply
  return (res)
}

showStatus <- function(msg) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/showStatus', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', msg=msg, session=session_id, .opts=opts)
  return (reply == "true")
}

clearStatus <- function(msg) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/clearStatus', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', msg=msg, session=session_id, .opts=opts)
  return (reply == "true")
}

showTransientStatus <- function(msg) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/showTransientStatus', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', msg=msg, session=session_id, .opts=opts)
  return (reply == "true")
}

getEvaluators <- function() {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/getEvaluators?session=', session_id, sep='')
  reply = getURL(req, userpwd=pwarg, httpauth = AUTH_BASIC)
  if (!isValidJSON(reply,TRUE))
    stop('the server returned an invalid response')
  return (transformJSON(fromJSON(reply)))
}

getCodeCells <- function(filter) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/getCodeCells?session=', session_id, '&filter=',filter, sep='')
  reply = getURL(req, userpwd=pwarg, httpauth = AUTH_BASIC)
  if (!isValidJSON(reply,TRUE))
    stop('the server returned an invalid response')
  return (transformJSON(fromJSON(reply)))
}

setCodeCellBody <- function(name,body) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/setCodeCellBody', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', name=name, body=body, session=session_id, .opts=opts)
  return (as.character(reply))
}

setCodeCellEvaluator <- function(name,evaluator) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/setCodeCellEvaluator', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', name=name, evaluator=evaluator, session=session_id, .opts=opts)
  return (as.character(reply))
}

setCodeCellTags <- function(name,tags) {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/notebookctrl/setCodeCellTags', sep='')
  opts = list(userpwd=pwarg, httpauth = AUTH_BASIC)
  reply = postForm(req, style='POST', name=name, tags=tags, session=session_id, .opts=opts)
  return (as.character(reply))
}

