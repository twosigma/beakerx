package com.twosigma.beaker.javash.autocomplete.test;

import com.twosigma.beaker.autocomplete.ClasspathScanner;
import com.twosigma.beaker.javash.autocomplete.JavaAutocomplete;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


class TestJava {

	public static boolean profile = false;
	public static boolean notree = false;
	public static boolean gui = false;
	public static boolean printTree = false;
	public static boolean SLL = false;
	public static boolean diag = false;
	public static boolean bail = false;
	public static boolean x2 = false;
	public static boolean quiet = false;

	public static void main(String[] args) {
		ClasspathScanner cps = new ClasspathScanner();
		
		List<String> inputFiles = new ArrayList<String>();
		try {
			if (args.length > 0 ) {
				// for each directory/file specified on the command line
				for(int i=0; i< args.length;i++) {
					if ( args[i].equals("-notree") ) notree = true;
					else if ( args[i].equals("-gui") ) gui = true;
					else if ( args[i].equals("-ptree") ) printTree = true;
					else if ( args[i].equals("-SLL") ) SLL = true;
					else if ( args[i].equals("-bail") ) bail = true;
					else if ( args[i].equals("-diag") ) diag = true;
					else if ( args[i].equals("-2x") ) x2 = true;
					else if ( args[i].equals("-quiet") ) quiet = true;
					if ( args[i].charAt(0)!='-' ) { // input file name
						inputFiles.add(args[i]);
					}
				}
				doFiles(inputFiles, cps);
			}
			else {
				System.err.println("Usage: java Main <directory or file name>");
			}
		}
		catch(Exception e) {
			System.err.println("exception: "+e);
			e.printStackTrace(System.err);   // so we can get stack trace
		}
	}

	public static void doFiles(List<String> files, ClasspathScanner cps) throws Exception {
		long parserStart = System.currentTimeMillis();
		for (String f : files) {
			File ff = new File(f);
			FileInputStream fis = new FileInputStream(ff);
			 
			BufferedReader br = new BufferedReader(new InputStreamReader(fis));
		 
			String source=null, expect=null;
			int cursor = 0;
			
			String line = null;
			while ((line = br.readLine()) != null) {
				if(line.startsWith("#"))
					continue;
				else if(line.startsWith("SOURCE: "))
					source = line.substring(8);
				else if(line.startsWith("CURSOR: "))
					cursor = Integer.parseInt(line.substring(8));
				else if(line.startsWith("EXPECT: ")) {
					expect = line.substring(8);
					String result = parseFile(source,cursor,cps);
					if(!expect.equals(result))
						System.out.println("ERROR: expecting \""+expect+"\" but got \""+result+"\"");
					else
						System.out.println("PASS");
				}
			}
		 
			br.close();
		}
		long parserStop = System.currentTimeMillis();
		System.out.println("Total lexer+parser time " + (parserStop - parserStart) + "ms.");
	}

	public static String parseFile(String f, int cursor, ClasspathScanner cps) {
		String res = "";
			
		JavaAutocomplete jac = new JavaAutocomplete(cps);
				
		List<String> ret = jac.doAutocomplete(f, cursor);
		for(String s : ret ) {
			res += s + " ";
		}
		
		return res.trim();
	}
}
