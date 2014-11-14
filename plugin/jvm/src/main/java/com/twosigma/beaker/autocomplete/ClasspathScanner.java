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

import java.io.File;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class ClasspathScanner {
	private Map<String,List<String>> packages;

	public ClasspathScanner() {
		packages = new HashMap<String,List<String>>();
		String classpath = System.getProperty("java.class.path");
		scanClasses(classpath);
	}

	public ClasspathScanner(String classpath) {
		packages = new HashMap<String,List<String>>();
		scanClasses(classpath);
	}

	public Set<String> getPackages() { return packages.keySet(); }
	public List<String> getClasses(String p) { if(packages.containsKey(p)) return packages.get(p); return null; }
	
	private void scanClasses(String classpath) {
		String[] paths = classpath.split(System.getProperty("path.separator"));
		
		String javaHome = System.getProperty("java.home");
		File file = new File(javaHome + File.separator + "lib");
		if (file.exists()) {
			findClasses(file, file, true);
		}

		for (String path : paths) {
			file = new File(path);
			if (file.exists()) {
				findClasses(file, file, false);
			}
		}
	}

	private boolean findClasses(File root, File file, boolean includeJars) {
		if (file.isDirectory()) {
			for (File child : file.listFiles()) {
				if (!findClasses(root, child, includeJars)) {
					return false;
				}
			}
		} else {
			if (file.getName().toLowerCase().endsWith(".jar") && includeJars) {
				JarFile jar = null;
				try {
					jar = new JarFile(file);
				} catch (Exception ex) {	
				}
				if (jar != null) {
					Enumeration<JarEntry> entries = jar.entries();
					while (entries.hasMoreElements()) {
						JarEntry entry = entries.nextElement();
						String name = entry.getName();						
						int extIndex = name.lastIndexOf(".class");
						if (extIndex > 0 && !name.contains("$")) {
							String cname = name.substring(0, extIndex).replace("/", ".");
							int pIndex = cname.lastIndexOf('.');
							if(pIndex > 0) {
								String pname = cname.substring(0, pIndex);
								cname = cname.substring(pIndex+1);
								if(!packages.containsKey(pname))
									packages.put(pname, new ArrayList<String>());
								packages.get(pname).add(cname);
							}
						}
					}
				}
			}
			else if (file.getName().toLowerCase().endsWith(".class")) {
				String cname = createClassName(root, file);
				if(!cname.contains("$")) {
					int pIndex = cname.lastIndexOf('.');
					if(pIndex > 0) {
						String pname = cname.substring(0, pIndex+1);
						cname = cname.substring(pIndex);
						if(!packages.containsKey(pname))
							packages.put(pname, new ArrayList<String>());
						packages.get(pname).add(cname);
					}
				}
			}
		}

		return true;
	}

	private String createClassName(File root, File file) {
		StringBuffer sb = new StringBuffer();
		String fileName = file.getName();
		sb.append(fileName.substring(0, fileName.lastIndexOf(".class")));
		file = file.getParentFile();
		while (file != null && !file.equals(root)) {
			sb.insert(0, '.').insert(0, file.getName());
			file = file.getParentFile();
		}
		return sb.toString();
	}
	
}
