/*
 *  Graxxia - Groovy Maths Utililities
 *
 *  Copyright (C) 2014 Simon Sadedin, ssadedin<at>gmail.com and contributors.
 *
 *  This file is licensed under the Apache Software License Version 2.0.
 *  For the avoidance of doubt, it may be alternatively licensed under GPLv2.0
 *  and GPLv3.0. Please see LICENSE.txt in your distribution directory for
 *  further details.
 */
package graxxia
class IterationDelegate {
    
    Integer row = 0
    
	Matrix host
    
    IterationDelegate(Matrix host) {
        this.host = host
    }
    
	def propertyMissing(String name) {
		def column = host.getProperty(name)
		if(column == null) {
			if(name in host.@names) {
				host.setProperty(name, host.col(host.@names.indexOf(name)))
				column = host[name]
			}
		}
		return column[row]
	}
}
