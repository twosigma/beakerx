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

require('png', quietly=TRUE)
require('base64enc', quietly=TRUE)

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

convertToJSONArray <- function(val) {
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
	return (p)
}

convertToJSONObjectNoRecurse <- function(val) {
  p = "{ "
  first <- TRUE
  n <- names(val)
  for (i in 1:length(n)) {
    if (first) {
  	  first <- FALSE
    } else {
  	  p = paste(p, ", ", sep='')
    }
    p = paste(p, '"', sep='')
    p = paste(p, n[i], sep='')
    p = paste(p, '": ', sep='')
    p = paste(p, convertToJSONNoRecurse(val[[i]]), sep='')
  }
  p = paste(p, " }", sep='')
  return (p)
}

convertToJSONArrayNoRecurse <- function(val) {
	p = "[ "
	first <- TRUE
	for (obj in val) {
	  if (first) {
	    first <- FALSE
	  } else {
	    p = paste(p, ", ", sep='')
	  }
	  p = paste(p, convertToJSONNoRecurse(obj), sep='')
	}
	p = paste(p, " ]", sep='')
	return (p)
}

getTypeName <- function(c) {
  if (c[[1]] == "numeric")
    p = "\"double\""
  else if (c[[1]] == "integer")
    p = "\"integer\""
  else if (c[[1]] == "logical")
    p = "\"boolean\""
  else if (c[[1]] == "factor")
    p = "\"select\""
  else if (c[[1]] == "POSIXct")
    p = "\"datetime\""
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

notContainKnownType  <- function(l) {
  ret <- tryCatch({
	  if (exists("type", where=l)) {
	    if(l$type == "ImageIcon") {
	      return(FALSE)
	    }
	  }
	  return(TRUE)
	}, error = function(err) {
	  return (FALSE)
    })
  return(ret)
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
  comma = FALSE
  n = names(l)
  for (i in 1:length(n)) {
    if (comma)
      p = paste(p, ",", sep='')
	comma = TRUE
    p = paste(p, "[\"", sep='')
    p = paste(p, gsub("\"","\\\"",as.character(n[i])), sep='')
    p = paste(p, "\",\"", sep='')
    p = paste(p, gsub("\"","\\\"",as.character(l[i])), sep='')
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
        conv = convertToJSONNoRecurse(l[[cn]])
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

convertToJSONNoRecurse <- function(val) {
  if (class(val) == "numeric" || class(val) == "integer" || class(val) == "character" || class(val) == "logical" || class(val) == "factor") {
    if (is.null(names(val))) {
  	  if (length(val) == 1) {
  	    o = toJSON(val, .level=0L);
  	  } else {
   	    o = toJSON(val)
      }
    } else {
      # convert to dictionary     
	  o = convertToJSONObjectNoRecurse(val)
    }
  } else if (class(val) == "table") {
    o = toJSON(val)
  } else if (class(val) == "list") {
    if (is.null(names(val))) {
      # this is a basic list
      o = convertToJSONArrayNoRecurse(val) 
    } else {
      # convert to dictionary
	  o = convertToJSONObjectNoRecurse(val) 
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
  } else {
    o = paste("\"ERROR: invalid object type ", gsub("\"","\\\"",class(val)), sep='')
    o = paste(o, "\"", sep='')
  }
  return (o)
}
 
guessTypeName <- function(txt) {
  return(tryCatch({
	  if (grepl(paste0("^[0-9]*-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$"),txt))
	    return ("POSIXct")
	  if (as.integer(txt) == txt)
	    return ("integer")
	  if (as.double(txt) == txt)
	    return ("numeric")
	  return ("character")
	}, error = function(err) {
	  return ("character")
    }))
} 

guessType <- function(txt) {
  return(tryCatch({
	  if (grepl(paste0("^[0-9]*-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$"),txt))
	    return (as.POSIXct(txt))
	  if (as.integer(txt) == txt)
	    return (as.integer(txt))
	  if (as.double(txt) == txt)
	    return (as.double(txt))
	  return (txt)
	}, error = function(err) {
	  return (txt)
    }))
} 
  
convertToJSON <- function(val, collapse) {
  if (class(val) == "numeric" || class(val) == "integer" || class(val) == "character" || class(val) == "logical" || class(val) == "factor") {
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
	  o = convertToJSONObjectNoRecurse(val)
    }
    
  } else if (class(val) == "list") {
    if (is.null(names(val))) {
      if (isListOfDictionaries(val)) {
        # convert to datatable list of maps
        o = convertToDataTableLoM(val)
      } else {
	    # this is a basic list
		o = convertToJSONArrayNoRecurse(val)
      }
    } else if(exists("type", val) && exists("items", val) && val$type == "OutputContainer") {
   	  p = "{ \"type\":\"OutputContainer\",\"items\":"
      p = paste(p, convertToJSONArray(val$items), sep='')
      p = paste(p, " }", sep='')
      o = p
	} else if (notContainKnownType(val) && containsOnlyBasicTypes(val)) {
      # convert to datatable dictionary
      o = convertToDataTableDictionary(val)
    } else {
      # convert to dictionary     
	  o = convertToJSONObjectNoRecurse(val) 
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
  }
  
  else if (class(val) == "data.table") {
    o = convertToJSON(as.data.frame(val))
  }
  else if (class(val) == "data.frame") {
    p = "{ \"type\":\"TableDisplay\",\"subtype\":\"TableDisplay\",\"hasIndex\":\"true\",\"columnNames\":"
    colNames = c('Index')
    colNames = c(colNames,names(val))
    rnames = rownames(val)
    itype = guessTypeName(rnames[1])
    types = lapply(val,class)
    types = c(itype,types)
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
	  p = paste(p, convertToJSONNoRecurse(guessType(rnames[r])), sep='')
	  for( c in 1:ncol(val)) {
	    p = paste(p, ", ", sep='')
		theval = val[r,c]
		p = paste(p, convertToJSONNoRecurse(theval), sep='')
	  }
      p = paste(p, "]", sep='')
    }    
    p = paste(p, "], \"types\": [", sep='')
    firstr <- TRUE
    for(i in 1:length(types)) {
      if (firstr) {
	    firstr <- FALSE
	  } else {
	    p = paste(p, ",", sep='')
	  }
      p = paste(p, getTypeName(types[i]), sep='')
    }
    p = paste(p, "] }", sep='')
    o = p
  }
  else if (class(val) == "matrix") {
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

  } else if (class(val) == "ggvis") {
    temp <- print(val)
    p = "{ \"type\":\"GGVis\", \"first\":"
    p = paste(p, toJSON(as.character(temp[[1]])), sep='')
	p = paste(p, ", \"second\":", sep='')
    p = paste(p, toJSON(as.character(temp[[2]])), sep='')
	p = paste(p, "}", sep='')
	o = p
  } else if (class(val) == "grViz" || class(val) == "DiagrammeR" || class(val) == "visNetwork") {
    temp <- print(val)
    p = "{ \"type\": \"DiagrammeR\", \"concreteType\":\"";
    p = paste(p, class(val), sep='')
    p = paste(p, "\", \"data\":", sep='')
    p = paste(p, toJSON(val), sep='')
    p = paste(p, "}", sep='')
    o = p
  } else if(class(val) == "plotly") {
    temp <- print(val)
    p = "{ \"type\":\"Plotly\", \"data\":"
    p = paste(p, plotly:::to_JSON(temp), sep='')
    p = paste(p, "}", sep='')
    o = p
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
            theval = tres$values[[i]][[1]]
            if (is.list(theval) && !is.null(names(theval)) && exists("type", where=theval) && exists("timestamp", where=theval) && theval$type == "Date") {
              o[[ transformJSON(theval) ]] = transformJSON(tres$values[[i]][[2]])
            } else {
		          o[[ tres$values[[i]][[1]] ]] = transformJSON(tres$values[[i]][[2]])
            }
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
			  	} else if (exists("types", where=tres) && !is.na(tres$types[i]) && (tres$types[i] == "datetime")) {
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
              } else if (exists("hasIndex", where=tres) && tres$hasIndex == "true") {
                # we do transform an index into rownames
                iname = tres$columnNames[1]
                keeps = tres$columnNames[2:length(tres$columnNames)]
                rnam = df [[iname]]
              	tres <- df[ keeps ]
              	rownames(tres) <- rnam            	
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

displayImage <- function(img) {
  if (! exists("writePNG") || !exists("base64encode")) {
    return ("ERROR: you should install the 'png' and 'base64enc' R packages.")
  }
  return (list(type='ImageIcon', width=dim(img)[1], height=dim(img)[2], imageData=base64encode(writePNG(img, target = raw()))))
}

getVersion <- function() {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/util/version?session=', session_id, sep='')
  reply = getURL(req, userpwd=pwarg, httpauth = AUTH_BASIC)
  return (reply)
}

getVersionNumber <- function() {
  req = paste('http://127.0.0.1:',Sys.getenv("beaker_core_port"),
              '/rest/util/getVersionInfo?session=', session_id, sep='')
  reply = getURL(req, userpwd=pwarg, httpauth = AUTH_BASIC)
  if (!isValidJSON(reply,TRUE))
    stop('the server returned an invalid response')
  info = fromJSON(reply)
  return (info[['version']])
}
