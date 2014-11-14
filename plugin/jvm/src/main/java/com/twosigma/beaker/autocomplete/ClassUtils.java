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

package com.twosigma.beaker.autocomplete;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.twosigma.beaker.autocomplete.java.JavaCompletionTypes;

public class ClassUtils {

	private ClassLoader loader;
	private Map<String, String> typeMap;
	private Map<String, String> classToTypeMap;
	
	public ClassUtils(ClassLoader l) {
		loader = l;
		typeMap = new HashMap<String, String>();
		classToTypeMap = new HashMap<String, String>();
	}

	public ClassUtils() {
		loader = null;
		typeMap = new HashMap<String, String>();
		classToTypeMap = new HashMap<String, String>();
	}

	public void clear() { 
		typeMap.clear();
		classToTypeMap.clear();
	}
	
	public void defineVariable(String name, String type) {
		typeMap.put(name, type);
	}
	
	public String getVariableType(String name) {
	  return typeMap.get(name);
	}
	
	public void defineClassShortName(String name, String fqname) {
		classToTypeMap.put(name, fqname);
	}
	
	private Class<?> getClass(String name) throws ClassNotFoundException {
		try {
			if(loader!=null) return loader.loadClass(name);
			return Class.forName(name);
		} catch(Exception e) { return null; }
	}
	
	public AutocompleteCandidate expandExpression(String txt, AutocompleteRegistry registry) {
		if(!txt.contains("."))
			return null;
		
		boolean endsWithDot = txt.endsWith(".");

		Pattern p = Pattern.compile("((?:[a-zA-Z$_][a-zA-Z0-9$_]*(?:\\(.*\\))?\\.\\s*)+)$");
		Matcher m;
		if(!endsWithDot)
			m = p.matcher(txt.substring(0,txt.lastIndexOf('.')+1));
		else
			m = p.matcher(txt);
		
		if(m.find()) { 
			try {

				//System.out.println("using "+m.group(0));
				String [] v = m.group(0).split("\\.");
				String curtype;
				String n = v[0].trim();
				// find starting type
				if(typeMap.containsKey(n))
					curtype = typeMap.get(n);
				else
					curtype = n;
				// decode starting type
				if (classToTypeMap.containsKey(curtype))
					curtype = classToTypeMap.get(curtype);
					
				for(int i=1; i<v.length; i++) {
					// get next field type
					String field = v[i];
					//System.out.println("looking up "+field);
					String ntype = null;
					Class<?> cl = getClass(curtype);
					if(cl==null) {
						//System.out.println("not found "+curtype);
						return null;
					}
					if(field.contains("(")) {
						field = field.substring(0, field.indexOf('('));
						Method[] mtn = cl.getMethods();
						for(int j=0; j<mtn.length; j++) {
							if(mtn[j].getName().equals(field)) {
								ntype = mtn[j].getReturnType().getCanonicalName();
								break;
							}
						}
					} else {
						Field[] flds = cl.getFields();
						for ( Field f : flds) {
							if(f.getName().equals(field)) {
								ntype = f.getType().getCanonicalName();
								break;
							}
						}
					}
					if(ntype==null) {
						//System.out.println("cannot find type for "+field);
						return null;
					}
					curtype = ntype;
				}
				// now get last field options
				AutocompleteCandidate c = new AutocompleteCandidate(JavaCompletionTypes.FIELD, v, v.length);
				AutocompleteCandidate l = c;
				while(l.hasChildren()) l = l.getChildrens().get(0);

				Class<?> cl = getClass(curtype);
				if(cl==null) {
					//System.out.println("not found "+curtype);
					return null;
				}
				Field[] fl = cl.getFields();
				Method[] mt = cl.getMethods();
				
				if(fl!=null) {
					for (Field f : fl) {
						AutocompleteCandidate c2 = new AutocompleteCandidate(JavaCompletionTypes.FIELD, f.getName());
						l.addChildren(c2);
					}
				}
				if(mt != null) {
					for (Method mm : mt) {
						String mtn = mm.getName();
						Class<?>[] pt = mm.getParameterTypes();
						if(pt!=null) {
							mtn += "(";
							for(int id=0; id<pt.length; id++) {
								if(id>0) mtn += ",";
								int idx = pt[id].getName().lastIndexOf('.');
								if(idx<0) idx=0; else idx++;
								mtn += "a"+pt[id].getName().substring(idx);
							}
							mtn += ")";
						} else
							mtn += "()";
						AutocompleteCandidate c2 = new AutocompleteCandidate(JavaCompletionTypes.FIELD, mtn);
						l.addChildren(c2);
					}
				}
				
				registry.addCandidate(c);
				
				
				// output our query
				c = new AutocompleteCandidate(JavaCompletionTypes.FIELD, v);
				l = c;
				while(l.hasChildren()) l = l.getChildrens().get(0);
				if(endsWithDot)
					l.addChildren(new AutocompleteCandidate(JavaCompletionTypes.FIELD, ""));
				else
					l.addChildren(new AutocompleteCandidate(JavaCompletionTypes.FIELD, txt.substring(txt.lastIndexOf('.')+1)));
				return c;
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
