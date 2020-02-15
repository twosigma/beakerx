/*
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
package com.twosigma.beakerx.groovy.autocomplete;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.beanutils.BeanUtilsBean2;

import groovy.lang.Binding;

public class GroovyReflectionCompletion {
	
	Binding binding;

	private BeanUtilsBean2 beanUtils = new BeanUtilsBean2();

	public GroovyReflectionCompletion(Binding binding) {
		this.binding = binding;
	}

	public List<String> autocomplete(String text, int pos) {
		
		String expr = resolveExpression(text,pos-1);
		
		ArrayList<String> parts = new ArrayList<String>();
		StringTokenizer tokenizer = new StringTokenizer(expr, ".");
		while(tokenizer.hasMoreTokens()) {
			parts.add(tokenizer.nextToken());
		}
	
		if(binding.hasVariable(parts.get(0)) && ((parts.size() > 1) || text.endsWith("."))) {
			return autocompleteFromObject(parts);
		}
		else  {
			List<String> result = 
				((Map<String,Object>)binding.getVariables())
											.keySet()
											.stream()
											.filter(x -> x.startsWith(text))
											.collect(Collectors.toList());
			return result;
		}
	}

	
	public String resolveExpression(String text, int pos) {
		
		int nextLine = pos;
		while(nextLine<text.length() && !Character.isWhitespace(text.charAt(nextLine))) {
			++nextLine;
		}
		
		int prevLine = pos;
		while(prevLine>=0 && !Character.isWhitespace(text.charAt(prevLine))) {
			--prevLine;
		}
		
		prevLine = Math.max(0,prevLine);
		nextLine = Math.min(text.length(),nextLine);

		return text.substring(prevLine, nextLine).trim();
	}

	List<String> autocompleteFromObject(List<String> parts) {
		
		List<String> lowPriorityCompletions = Arrays.asList("class","metaClass");

		List<String> filteredCompletions = Arrays.asList("empty");
		
		List<String> iterableOnlyCompletions = Arrays.asList("join(");

		List<String> stringCompletions = Arrays.asList(
				"size()",
				"split(",
				"tokenize(",
				"matches(",
				"contains("
	    );
		
		List<String> supplementaryCollectionCompletions = Arrays.asList(
				"isEmpty()", 
				"size()", 
				"collectEntries { ", 
				"collect { ", 
				"find { ", 
				"grep { ",
				"groupBy { ",
				"countBy { "
		);

		ArrayList<String> result = new ArrayList<String>();
		
		try {

			Object value = binding.getVariable(parts.get(0));
			int i = 1;
			for(; i<parts.size()-1; ++i) {
				value = beanUtils.getProperty(value, parts.get(i));
			}
			
			String completionToken = parts.size() > 1 ? parts.get(parts.size()-1) : "";
			
			Map<String,String> desc = beanUtils.describe(value);
			
			List<String> lowPri = new ArrayList<String>();
		
			desc.forEach((String key, String val) -> {
				if(key.startsWith(completionToken)) {
					if(lowPriorityCompletions.contains(key)) {
						lowPri.add(key);
					}
					else {
						result.add(key);
					}
				}
			});
			
			if(value instanceof Map) {
				Map<String,?> mapValue = (Map<String,?>)value;
				mapValue.keySet().stream()
								 .filter(k -> k.startsWith(completionToken))
								 .forEach(k -> result.add(k));
			}
			
			if(value instanceof Iterable || value instanceof Map) {
				result.addAll(supplementaryCollectionCompletions);
				result.addAll(iterableOnlyCompletions);
			}
			
			if(value instanceof String) {
				result.addAll(stringCompletions);
			}
			
			result.addAll(lowPri);
			
			result.removeIf(v -> !v.startsWith(completionToken));
				
			result.removeAll(filteredCompletions);
			
			// Finally, add method names
			result.addAll(getObjectMethodCompletions(value, completionToken));
	
		} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	String formatMethod(Method m) {
		return m.getName() + "("  
				+ Stream.of(m.getParameters())
					    .map(x -> x.getType()
								   .getName()
					    		       .replaceAll("java.lang.","")
					    		       .replaceAll("java.util.","")
					    		       .replaceAll("groovy.lang.",""))
					    .collect(Collectors.joining(",")) 
		+ ")";
	}
	
	public static final List<String> IGNORE_METHODS = 
			Arrays.asList("invokeMethod",
					"getMetaClass",
					"setMetaClass",
					"setProperty",
					"getProperty",
					"equals",
					"toString",
					"hashCode",
					"wait",
					"getClass",
					"notify",
					"notifyAll");
	
	
	List<String> getObjectMethodCompletions(Object obj, String completionToken) {
		
		
		Class c = obj.getClass();

		List<String> methodNames = 
			Stream.of(c.getMethods())
				  .filter(m -> 
				  	!m.getName().startsWith("get") &&
				  	!m.getName().startsWith("set") &&
				  	!IGNORE_METHODS.contains(m.getName()))
				  .filter(m -> m.getName().startsWith(completionToken))
				  .map(m -> {
						return formatMethod(m);
				  })
				  .collect(Collectors.toList());
		return methodNames;
	}
}
