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
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.beanutils.BeanUtilsBean2;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;

import com.twosigma.beakerx.kernel.Imports;

import groovy.lang.Binding;

public class GroovyReflectionCompletion {
	
	Binding binding;
	
	ClassLoader gcl;
	
	Imports imports;

	private BeanUtilsBean2 beanUtils = new BeanUtilsBean2();
	
	private Pattern indexedAccessPattern = Pattern.compile("(.*)\\[([0-9]{1,})\\]");
	
	public GroovyReflectionCompletion(Binding binding, ClassLoader classLoader, Imports imports) {
		this.binding = binding;
		this.gcl = classLoader;
		this.imports = imports;
	}

	public List<String> autocomplete(String text, int pos) {
		
		List<String> constructorResults = null;
		try {
			constructorResults = tryResolveConstructor(text, pos);
		} catch (ClassNotFoundException e) {
			// Ignore: try to complete based on standard expression
			e.printStackTrace();
		}

		List<String> expressionResults = null;
		try {
			expressionResults = this.autocompleteExpression(text, pos);
		} catch (Exception e) {
			// Ignore: use other results instead
			e.printStackTrace();
		}
		
		List<String> allResults = new ArrayList<String>();
		if(constructorResults != null)
			allResults.addAll(constructorResults);
		if(expressionResults != null)
			allResults.addAll(expressionResults);
		return allResults;
	}
		
	public List<String> autocompleteExpression(String text, int pos) {
		String expr = resolveExpression(text,pos-1);
		
		ArrayList<String> parts = new ArrayList<String>();
		StringTokenizer tokenizer = new StringTokenizer(expr, ".");
		while(tokenizer.hasMoreTokens()) {
			parts.add(tokenizer.nextToken());
		}
		
		if(text.endsWith("."))
			parts.add("");
		
		String bindingReference = parts.get(0);
		Matcher m = indexedAccessPattern.matcher(bindingReference);
		if(m.matches()) {
			bindingReference = m.group(1);
		}
	
		if(binding.hasVariable(bindingReference) && ((parts.size() > 1) || text.endsWith("."))) {
			return autocompleteFromObject(parts);
		}
		else  {
			List<String> result = 
				((Map<String,Object>)binding.getVariables())
											.keySet()
											.stream()
											.filter(x -> x.startsWith(expr))
											.collect(Collectors.toList());
			return result;
		}
	}
	
	final static Pattern CONSTRUCTOR_PATTERN = Pattern.compile("new ([A-Za-z0-9_]{1,})\\((\\s*[a-z0-9_A-Z]*:.*,\\s*){0,}\\s*([a-z0-9_A-Z]*)@@@\\s*\\)");
	
	public class ConstructorMatch {
		String text;
		int pos;
		public String className;
		public String propName;
		public ConstructorMatch(String text, int pos, String className, String propName) {
			this.text = text;
			this.pos = pos;
			this.className = className;
			this.propName = propName;
		}

		public List<String> computeConstructorCompletions() throws ClassNotFoundException {

			Class clazz = findClassMatch();
			
			System.out.println("Loaded class " + clazz);
		
			ArrayList<String> result = new ArrayList<String>();
			getClassMutablePropertyNames(clazz).forEach(prop -> {
				String completion = null;
				if(this.propName != null && !this.propName.isEmpty()) {
					if(!prop.startsWith(this.propName))
						return;
					completion = text.substring(0,pos-propName.length()) + prop + ": ";
				} 				
				else {
					completion = text.substring(0,pos) + prop + ": ";
				}
				
				result.add(completion);
			});
			
			return result;
		}

		private Class findClassMatch() throws ClassNotFoundException {
			
			final String dotClassName = "." + className;
			
			List<String> classesToTry = new ArrayList<String>();
			classesToTry.add(className);
			
			imports.getImportPaths()
				.stream()
				.filter(p -> !p.isStatic())
				.map(p -> p.path())
				.filter(path -> {
					return path.endsWith(".*") || path.endsWith(dotClassName);
				})
				.map(path -> {
					if(path.endsWith(".*")) {
						return path.substring(0,path.length()-2) + dotClassName;
					}
					else {
						return path;
					}
				})
				.forEach(classesToTry::add);

			Iterator<String> i = classesToTry.iterator();
			for(String classToTry = i.next(); i.hasNext(); classToTry = i.next()) {
				Class clazz = tryLoadClass(classToTry);
				if(clazz != null)
					return clazz;
			}
			return null;
		}
	}
	
	private Class tryLoadClass(String className) {
		try {
			return gcl.loadClass(className);
		} catch (ClassNotFoundException e) {
			return null;
		}
	}

	public List<String> tryResolveConstructor(String text, int pos) throws ClassNotFoundException {
		
		ConstructorMatch match = tryMatchConstructor(text, pos);
		if(match == null) {
			return null;
		}
		else {
			return match.computeConstructorCompletions();
		}
	}

	public ConstructorMatch tryMatchConstructor(String text, int pos) throws ClassNotFoundException {

		// Insert a cursor symbol at the position of the cursor to allow
		// for regex matching to it
		String matchText = text.substring(0, pos) + "@@@" + text.substring(pos);
		
		Matcher m = CONSTRUCTOR_PATTERN.matcher(matchText);
		if(m.find()) {
			String className = m.group(1);
			String propName = m.groupCount() > 1 ? m.group(m.groupCount()) : null;

			return new ConstructorMatch(text, pos, className, propName);
		}
		return null;
	}

	/**
	 * Extracts the expression to be autocompleted.
	 * 
	 * The expression is an executable statement that would (if executed) return the
	 * value that should be autocompleted.
	 * 
	 * @param text	the text at the cursor
	 * @param pos	the position of the cursor within the text
	 * @return
	 */
	public String resolveExpression(String text, int pos) {
		
		int expressionEnd = findExpressionEnd(text, pos);
		
		int expressionStart = findExpressionStart(text, pos);
		
		if(expressionStart == expressionEnd) {
			return null;
		}
		
		expressionStart = Math.max(0,expressionStart);
		expressionEnd = Math.min(text.length(),expressionEnd);
		
		String result = text.substring(expressionStart, expressionEnd).trim();
		
		if(!Character.isJavaIdentifierPart(result.charAt(result.length()-1))) {
			result = result.substring(0, result.length()-1);
		}
		
		if(!Character.isJavaIdentifierPart(result.charAt(0))) {
			result = result.substring(1);
		}
		
//		System.out.println("Expression is " + result);
		return result;
	}

	private int findExpressionStart(String text, int startPos) {
		List<Character> bracketStack = new ArrayList<Character>();

		int pos = startPos;
		while(pos >= 0) {
			char c  = text.charAt(pos);
			
			if(c == '.') {
				// allow
			}
			else
			if(Character.isJavaIdentifierPart(c)) {
				// allow
			}
			else
			if(c == ']') {
				bracketStack.add(c);
			}
			else
			if(c == '[') {
				if(!bracketStack.isEmpty() && bracketStack.get(bracketStack.size()-1) == ']') {
					bracketStack.remove(bracketStack.size()-1);
				}
				else
					break;
			}
			else
				break;

			--pos;
		}
		return pos;
	}

	private int findExpressionEnd(String text, int startPos) {
		
		List<Character> bracketStack = new ArrayList<Character>();

		int pos = startPos;
		while(pos < text.length()) {
			final char c  = text.charAt(pos);
			
			if(c == '\n') {
				break;
			}
			if(c == '.') {
				// allow
			}
			else
			if(Character.isJavaIdentifierPart(c)) {
				// allow
			}
			else
			if(c == ']') {
				bracketStack.add(c);
			}
			else
			if(c == '[') {
				if(!bracketStack.isEmpty() && bracketStack.get(bracketStack.size()-1) == ']') {
					bracketStack.remove(bracketStack.size()-1);
				}
				else
					break;
			}
			else
				break;
			++pos;
		}
		return pos;
		
	}
	
	/**
	 * These are groovy-fied methods that do not show up in a nice groovy way by reflection
	 */
	public static final List<String> SUPPLEMENTARY_COLLECTION_COMPLETIONS = Arrays.asList(
				"isEmpty()", 
				"size()", 
				"collectEntries { ", 
				"collect { ", 
				"find { ", 
				"grep { ",
				"groupBy { ",
				"countBy { "
		);
	
	public final static List<String> STRING_COMPLETIONS = Arrays.asList(
			"size()",
			"split(",
			"tokenize(",
			"matches(",
			"contains("
	);
	
	List<String> autocompleteFromObject(List<String> parts) {
		
		List<String> lowPriorityCompletions = Arrays.asList("class","metaClass");

		List<String> filteredCompletions = Arrays.asList("empty");
		
		List<String> iterableOnlyCompletions = Arrays.asList("join(");

	
	
		ArrayList<String> result = new ArrayList<String>();
		
		try {

			String bindingReference = parts.get(0);
			Matcher m = indexedAccessPattern.matcher(bindingReference);
			
			Object value;
			if(m.matches()) {
				List collValue = (List)binding.getVariable(m.group(1));
				value = collValue.get(Integer.parseInt(m.group(2)));
			}
			else
				value = binding.getVariable(bindingReference);

			int i = 1;
			for(; i<parts.size()-1; ++i) {
				String partExpr = parts.get(i);
				
				
				Matcher m2 = indexedAccessPattern.matcher(partExpr);
				if(m2.matches()) {
					value = PropertyUtils.getIndexedProperty(value, partExpr);
				}
				else {
					value = PropertyUtils.getSimpleProperty(value, partExpr);
				}
			
				if(value == null) {
					// We can't complete anything on it
					// TODO: we could complete on the static type one day
					return result;
				}
			}
			
			String completionToken = parts.size() > 1 ? parts.get(parts.size()-1) : "";
			
			List<String> properties = getObjectPropertyNames(value); 
			
			List<String> lowPri = new ArrayList<String>();
		
			properties.forEach((String key) -> {
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
				result.addAll(SUPPLEMENTARY_COLLECTION_COMPLETIONS);
				result.addAll(iterableOnlyCompletions);
			}
			
			if(value instanceof String) {
				result.addAll(STRING_COMPLETIONS);
			}
			
//			result.addAll(lowPri);
			
			result.removeIf(v -> !v.startsWith(completionToken));
				
			result.removeAll(filteredCompletions);
			
			// Finally, add method names
			result.addAll(getObjectMethodCompletions(value, completionToken));
	
		} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
			e.printStackTrace();
		}
		return result;
	}

	private List<String> getObjectPropertyNames(Object value) {
		return getClassPropertyNames(value.getClass());
	}
	
	private List<String> getClassMutablePropertyNames(final Class clazz) {
		Stream<Method> methods = Stream.of(clazz.getMethods());

		List<String> properties = 
				  methods.filter(m -> 
					m.getName().startsWith("set") && 
					m.getName().length() > 3 && 
					Character.isUpperCase(m.getName().charAt(3)) 
					&& java.lang.reflect.Modifier.isPublic(m.getModifiers()) &&
					m.getParameters().length == 1
				  )
				  .map((Method m) -> 
					 StringUtils.uncapitalize(m.getName().substring(3))
				  )
				  .collect(Collectors.toList());
		return properties;
	}
	

	private List<String> getClassPropertyNames(final Class clazz) {
		Stream<Method> methods = Stream.of(clazz.getMethods());

		List<String> properties = 
				  methods.filter(m -> 
					m.getName().startsWith("get") && 
					m.getName().length() > 3 && 
					Character.isUpperCase(m.getName().charAt(3)) 
					&& java.lang.reflect.Modifier.isPublic(m.getModifiers()) &&
					m.getParameters().length == 0
				  )
				  .map((Method m) -> 
					 StringUtils.uncapitalize(m.getName().substring(3))
				  )
				  .collect(Collectors.toList());
		return properties;
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
	
	boolean isNonPropertyMethod(final Method m) {
		
	  if(m.getName().startsWith("get") && m.getParameterCount()==0)
		  return false;
	  
	  if(m.getName().startsWith("set") && m.getParameterCount()==1)
		  return false;
	  
	  return true;
	}
	
	List<String> getObjectMethodCompletions(Object obj, String completionToken) {
		
		@SuppressWarnings("rawtypes")
		Class c = obj.getClass();

		List<String> methodNames = 
			Stream.of(c.getMethods())
				  .filter(m -> 
				    isNonPropertyMethod(m) &&
				  	!IGNORE_METHODS.contains(m.getName()))
				  .filter(m -> m.getName().startsWith(completionToken))
				  .map(m -> {
						return formatMethod(m);
				  })
				  .collect(Collectors.toList());
		return methodNames;
	}
}
