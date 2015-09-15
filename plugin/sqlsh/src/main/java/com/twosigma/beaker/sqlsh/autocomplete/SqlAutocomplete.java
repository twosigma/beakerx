package com.twosigma.beaker.sqlsh.autocomplete;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.twosigma.beaker.autocomplete.ClasspathScanner;

public class SqlAutocomplete {

	private static final String[] SQL_KEYS = { "abort", "action", "add", "after", "all", "alter", "analyze", "and",
			"as", "asc", "attach", "autoincrement", "before", "begin", "between", "by", "cascade", "case", "cast",
			"check", "collate", "column", "commit", "conflict", "constraint", "create", "cross", "current_date",
			"current_time", "current_timestamp", "database", "default", "deferrable", "deferred", "delete", "desc",
			"detach", "distinct", "drop", "each", "else", "end", "escape", "except", "exclusive", "exists", "explain",
			"fail", "for", "foreign", "from", "full", "glob", "group", "having", "if", "ignore", "immediate", "in",
			"index", "indexed", "initially", "inner", "insert", "instead", "intersect", "into", "is", "isnull", "join",
			"key", "left", "like", "limit", "match", "natural", "no", "not", "notnull", "null", "of", "offset", "on",
			"or", "order", "outer", "plan", "pragma", "primary", "query", "raise", "recursive", "references", "regexp",
			"reindex", "release", "rename", "replace", "restrict", "right", "rollback", "row", "savepoint", "select",
			"set", "table", "temp", "temporary", "then", "to", "transaction", "trigger", "union", "unique", "update",
			"using", "vacuum", "values", "view", "virtual", "when", "where", "with", "without" };

	public SqlAutocomplete(ClasspathScanner _cps) {
		
	}

	private List<String> findKeys(final String key){
		final List<String> ret = new ArrayList<String>();

		if (key == null || key.trim().length() == 0) {
			ret.addAll(Arrays.asList(SQL_KEYS));
		} else {
			final String lowerTxt = key.toLowerCase();

			for (String str : Arrays.asList(SQL_KEYS)) {
				if (str.startsWith(lowerTxt)) {
					ret.add(str);
				}
			}
		}
		
		return ret;
	}
	
	private String findKey(final String txt, final int cur){
		if (cur <= 0 || Character.isWhitespace(txt.charAt(cur - 1))) {
			return "";
		} else {
			String res = "";
			
			int eos = cur - 1;

			for (int i = eos; i >= 0; i--) {
				
				final boolean isIdentifier = Character.isUnicodeIdentifierPart(txt.charAt(i));
				
				if (isIdentifier) {
					eos = i;
				}
					
				
				if (!isIdentifier || i == 0) {
					
					res = new String(txt.substring(eos, cur));
					break;
				}
			}
			
			return res;
		}
	}
	

	public List<String> doAutocomplete(final String txt, final int cur) {
		List<String> ret;
		
		final String key = findKey(txt, cur);
		
		ret = findKeys(key);

		return ret;
	}

}
