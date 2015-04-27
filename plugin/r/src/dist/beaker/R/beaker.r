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

options(RCurlOptions = list(httpheader = c(Expect=''), noproxy = '127.0.0.1'))

pwarg = paste('beaker:', Sys.getenv("beaker_core_password"), sep='')

session_id = ''

set_session <- function(id) {
  session_id <<- id
}

collapse_unit_vectors = FALSE

set_collapse_unit_vectors <- function(val) {
  collapse_unit_vectors <- val
}

convertToJSONObject <- function(val) {
  p = "{ "
  first <- TRUE
  for (obj in names(val)) {
    if (first) {
  	  first <- FALSE
    } else {
  	  p = paste(p, ", ", sep='')
    }
    p = paste(p, '"', sep='')
    p = paste(p, obj, sep='')
    p = paste(p, '": ', sep='')
    p = paste(p, convertToJSON(val[[obj]], TRUE), sep='')
  }
  p = paste(p, " }", sep='')
  return (p)
}

getTypeName <- function(c) {
  if (c == "numeric")
    p = "\"double\""
  else if (c == "integer")
    p = "\"integer\""
  else if (c == "logical")
    p = "\"boolean\""
  else if (c == "factor")
    p = "\"select\""
  else
    p = "\"string\""
  return(p)
}

containsOnlyBasicTypes <- function(l) {
  len <- length(l)
  for (i in 1:len) {
    t = l[[i]]
    c = class(t)
    if ((c != "numeric" && c != "integer" && c != "logical" && c != "factor" && c!="character" && c!="Date" && c!="POSIXct" && c!="POSIXlt") || length(t)>1)
      return (FALSE)
  }
  return (TRUE)
}

isListOfDictionaries <- function(l) {
  len <- length(l)
  for (i in 1:len) {
    t = l[[i]]
    if ((class(t) != "list") || (is.null(names(t))) || !containsOnlyBasicTypes(t))
      return (FALSE)
  }
  return(TRUE)
}

convertToDataTableDictionary <- function(l) {
  p = "{ \"type\":\"TableDisplay\",\"subtype\":\"Dictionary\",\"columnNames\": [\"Key\",\"Value\"], \"values\": ["
  n = names(l)
  comma = FALSE
  for (i in 1:length(n)) {
    if (comma)
      p = paste(p, ",", sep='')
	comma = TRUE
    p = paste(p, "[\"", sep='')
    p = paste(p, gsub("\"","\\\"",as.character(n[[i]])), sep='')
    p = paste(p, "\",\"", sep='')
    p = paste(p, gsub("\"","\\\"",as.character(l[[n[[i]]]])), sep='')
    p = paste(p, "\"]", sep='')
  }
  
  p = paste(p, "] }", sep='')
  return (p)
}

convertToDataTableLoM <- function(val) {
  p = "{ \"type\":\"TableDisplay\",\"subtype\":\"ListOfMaps\",\"columnNames\": ["
  cols = unique(unlist(lapply(val, names)))
  comma = FALSE
  for (i in 1:length(cols)) {
    if (comma) {
      p = paste(p, ",", sep='')
    }
    comma = TRUE
    p = paste(p, "\"", sep='')
    p = paste(p, gsub("\"","\\\"",cols[[i]]), sep='')
    p = paste(p, "\"", sep='')
  }  
  p = paste(p, "], \"values\": [", sep='')

  comma = FALSE
  for (l in val) {
    if (comma) {
      p = paste(p, ", [", sep='')
    } else {
      p = paste(p, "[", sep='')
      comma = TRUE
    }
    comma2 = FALSE
  	for (ci in 1:length(cols)) {
      cn = cols[[ci]]
      if (comma2) {
        p = paste(p, ", ", sep='')
  	  } else {
        comma2 = TRUE
      }
      if (exists(cn, where=l)) {
        conv = convertToJSON(l[[cn]],TRUE)
        p = paste(p, conv, sep='')
      } else {
        p = paste(p, "\"\"", sep='')
      }
    }
    p = paste(p, "]", sep='')
  }

  p = paste(p, "] }", sep='')
  return (p)
}
  
convertToJSON <- function(val, collapse) {
  if (class(val) == "data.frame") {
    p = "{ \"type\":\"TableDisplay\",\"subtype\":\"TableDisplay\",\"columnNames\":"
    colNames = names(val)
    types = lapply(val,class)
    p = paste(p, toJSON(colNames), sep='')
    p = paste(p, ", \"values\": [", sep='')
	firstr <- TRUE
    for( r in 1:nrow(val)) {
	  if (firstr) {
	    firstr <- FALSE
	  } else {
	    p = paste(p, ", ", sep='')
	  }
      p = paste(p, "[", sep='')
	  firstc <- TRUE
	  for( c in 1:ncol(val)) {
		if (firstc) {
		  firstc <- FALSE
		} else {
		  p = paste(p, ", ", sep='')
		}
		theval = val[r,c]
		p = paste(p, convertToJSON(theval, TRUE), sep='')
	  }
      p = paste(p, "]", sep='')
    }    
    p = paste(p, "], \"types\": [", sep='')
    comma = FALSE
    for(i in 1:length(types)) {
      c = types[i]
      if (comma)
        p = paste(p, ",", sep='')
      comma = TRUE
      p = paste(p, getTypeName(c), sep='')
    }
    p = paste(p, "] }", sep='')
    o = p
  }
  else if (class(val) == "numeric" || class(val) == "integer" || class(val) == "character" || class(val) == "logical" || class(val) == "factor") {
    if (is.null(names(val))) {
  	  if (collapse && length(val) == 1) {
  	    o = toJSON(val, .level=0L);
  	  } else {
   	    o = toJSON(val)
      }
    } else if (containsOnlyBasicTypes(val)) {
      # convert to datatable dictionary
      o = convertToDataTableDictionary(val)
    } else {
      # convert to dictionary     
	  o = convertToJSONObject(val)
    }
  } else if (class(val) == "matrix") {
    p = "{ \"type\":\"TableDisplay\",\"subtype\":\"Matrix\",\"columnNames\":"
    ta = rownames(val)
	rownames(val) <- NULL
    tb = colnames(val)
	colnames(val) <- NULL
	if (is.null(tb)) {
    	colNames <- character(ncol(val));
		for( j in 1:ncol(val)) {
			colNames[j] <- paste('c',j, sep='')
    	}
    	p = paste(p, toJSON(colNames), sep='')
    } else {
    	p = paste(p, toJSON(tb), sep='')
    }
    p = paste(p, ", \"values\":", sep='')
    p = paste(p,toJSON(val), sep='')
    rownames(val) <- ta
    colnames(val) <- tb
    p = paste(p, ", \"types\": [", sep='')
    comma = FALSE
    for(i in 1:ncol(val)) {
      c = class(val[1][i])
      if (comma)
        p = paste(p, ",", sep='')
      comma = TRUE
      p = paste(p, getTypeName(c), sep='')
    }
    p = paste(p, "] }", sep='')
    o = p
  } else if (class(val) == "table") {
    o = toJSON(val)
  } else if (class(val) == "list" && length(val)>0) {
    if (is.null(names(val))) {
      if (isListOfDictionaries(val)) {
        # convert to datatable list of maps
        o = convertToDataTableLoM(val)
      } else {
	    # this is a basic list
		p = "[ "
	  	first <- TRUE
	  	for (obj in val) {
	  	  if (first) {
	  	    first <- FALSE
	  	  } else {
	  	    p = paste(p, ", ", sep='')
	  	  }
	      p = paste(p, convertToJSON(obj, TRUE), sep='')
		}
		p = paste(p, " ]", sep='')
		o = p
      }
	} else if (containsOnlyBasicTypes(val)) {
      # convert to datatable dictionary
      o = convertToDataTableDictionary(val)
    } else {
      # convert to dictionary     
	  o = convertToJSONObject(val) 
	}
  } else if (class(val) == "complex") {
    if (collapse && length(val) == 1) {
      o = toJSON(as.character(val), .level=0L)
    } else {
      o = toJSON(as.character(val))
    }
  } else if(class(val) == "POSIXct" || class(val) == "POSIXlt" || class(val) == "Date") {
  	p = "{ \"type\": \"Date\", \"timestamp\": "
  	p = paste(p, as.numeric(as.POSIXct(val, tz = "UTC"))*1000, sep='')
  	p = paste(p, " }", sep='')
  	o = p
  } else if (class(val) == "list") {
    o = toJSON(val)
  } else {
    o = paste("\"ERROR: invalid object type ", gsub("\"","\\\"",class(val)), sep='')
    o = paste(o, "\"", sep='')
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
    reply = postForm(req, style='POST', name=var, value=convertToJSON(val, collapse_unit_vectors), session=session_id, sync=sync, .opts=opts)
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
  if (!is.list(tres) && !is.null(names(tres))) {
    tres = as.list(tres)
  }

  if (is.list(tres) && length(tres)>0) {
    if (!is.null(names(tres)) && exists("type", where=tres)) {
	    if (tres[["type"]] == "TableDisplay") {
		    cols <- length(tres$columnNames)
		    rows <- length(tres$values)
		    if (exists("subtype", where=tres) && tres$subtype == "Dictionary") {
		      o = list()
		      for (i in 1:rows) {
		        o[[ tres$values[[i]][[1]] ]] = transformJSON(tres$values[[i]][[2]])
		      }
		      tres = o
		    } else if (exists("subtype", where=tres) && tres$subtype == "ListOfMaps") {
		      o = list()
		      for (i in 1:rows) {
                oo = list()
				for (j in 1:cols) {
                  oo[[ tres$columnNames[[j]] ]] = transformJSON(tres$values[[i]][[j]])
                }
                o[[ length(o) +1 ]] = oo
			  } 
              tres = o
		    } else {
			  dummy_nv = logical(rows)
			  df <- data.frame(dummy_nv);
			  for (i in 1:cols) {
			    if (exists("types", where=tres) && !is.na(tres$types[i]) && (tres$types[i] == "double")) {
				  nv <- numeric(rows);
				  for( j in 1:rows) {
				    if ( is.null( tres$values[[j]][[i]] ) )
				      nv [j] <- NaN
				    else
				      nv [j] <- as.numeric( tres$values[[j]][[i]] )
				  }
			  	  df[ tres$columnNames[[i]] ] = nv
			    } else if (exists("types", where=tres) && !is.na(tres$types[i]) && (tres$types[i] == "integer")) {
				  nv <- integer(rows);
				  for( j in 1:rows) {
				    if ( is.null( tres$values[[j]][[i]] ) )
				      nv [j] <- NaN
				    else
				      nv [j] <- as.integer( tres$values[[j]][[i]] )
				  }
			  	  df[ tres$columnNames[[i]] ] = nv
			  	} else if (exists("types", where=tres) && !is.na(tres$types[i]) && (tres$types[i] == "time")) {
				  nv <- .POSIXct( character(rows) );
		          for( j in 1:rows) {
		            if ( !is.null( tres$values[[j]][[i]] ) ) {
		              theval = tres$values[[j]][[i]]
		              if (is.list(theval) && !is.null(names(theval)) && exists("type", where=theval) && exists("timestamp", where=theval) && theval$type == "Date")
				        nv [j] <- as.POSIXct(theval[["timestamp"]]/1000, origin="1970-01-01")
				    }
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
				  if(exists("types", where=tres) && !is.na(tres$types[i]) && (tres$types[i] == "select"))
				    df[ tres$columnNames[[i]] ] = factor(nv)		  
				  else
				    df[ tres$columnNames[[i]] ] = nv		 
		        }
			  }
		      if (exists("subtype", where=tres) && tres$subtype == "Matrix") {
                tres <- df[ tres$columnNames ]
                tres = matrix(as.numeric(unlist(tres)),nrow=nrow(tres))
		      } else {
                tres <- df[ tres$columnNames ]
              }
		    }
		  }
		  else if (tres[["type"]] == "OutputContainer") {
		    # nothing to do here
		  }
		  else if (tres[["type"]] == "Date" && exists("timestamp", where=tres)) {
		  	tres = as.POSIXct(tres[["timestamp"]]/1000, origin="1970-01-01", tz = "UTC")
		  }
	  } else {
	    iteml <- length(tres)
	    for (i in 1:iteml) {
	      tres[[i]] = transformJSON(tres[[i]])
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
  rr = fromJSON(reply)
  iteml = length(rr)
  for (i in 1:iteml) {
    if (!is.list(rr[[i]]))
      rr[[i]] = as.list(rr[[i]])
    rr[[i]]$output = transformJSON(rr[[i]]$output)
  }
  return (rr)
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

createOutputContainer <- function(items) {
	return (list(type='OutputContainer', items=items))
}

