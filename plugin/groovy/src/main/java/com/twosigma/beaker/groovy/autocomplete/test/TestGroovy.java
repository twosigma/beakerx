package com.twosigma.beaker.groovy.autocomplete.test;

import com.twosigma.beaker.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beaker.groovy.autocomplete.GroovyClasspathScanner;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


class TestGroovy {

	private static final Logger logger = Logger.getLogger(TestGroovy.class.getName());

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
		GroovyClasspathScanner cps = new GroovyClasspathScanner();
		
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
				logger.log(Level.WARNING, "Usage: java Main <directory or file name>");
			}
		}
		catch(Exception e) {
			logger.log(Level.WARNING, "exception: "+e);
			e.printStackTrace(System.err);   // so we can get stack trace
		}
	}

	public static void doFiles(List<String> files, GroovyClasspathScanner cps) throws Exception {
		long parserStart = System.currentTimeMillis();
		for (String f : files) {
			File ff = new File(f);
			FileInputStream fis = new FileInputStream(ff);
			 
			BufferedReader br = new BufferedReader(new InputStreamReader(fis));
		 
			String source=null, expect=null;
			int cursor = 0;
			boolean isfile = false;
			
			String line = null;
			while ((line = br.readLine()) != null) {
				if(line.startsWith("#"))
				  continue;
				else if(line.startsWith("SOURCE: ")) {
				  source = line.substring(8);
				  isfile = false;
				} else if(line.startsWith("SRCFIL: ")) {
				  source = readFile(line.substring(8));
				  isfile = true;
				} else if(line.startsWith("CURSOR: ")) {
				  String l = line.substring(8);
				  if(l.contains("@") && isfile) {
				    String [] vl = l.split("@");
				    int lin = Integer.parseInt(vl[0].trim());
				    int cha = Integer.parseInt(vl[1].trim());
				    int pos = 0;
				    if(lin>0) {
    				    pos = source.indexOf('\n', 0);
    				    while (--lin > 0 && pos != -1)
    				        pos = source.indexOf('\n', pos+1);
				    }
				    if(pos != -1) {
				      cursor = cha+pos;
				      if(cursor>source.length()) cursor=source.length();
                      source = source.substring(0, cursor);
                      //System.out.println("--> '"+source+"' "+cursor);
				    } else {
				      logger.log(Level.WARNING, "ERROR computing cursor");
				      cursor = 0;
				    }
				  } else {
    				  cursor = Integer.parseInt(line.substring(8));
    				  if(isfile)
    				    source = source.substring(0, cursor);
    				  //System.out.println("--> '"+source+"' "+cursor);
				  }
				} else if(line.startsWith("EXPECT: ")) {
					expect = line.substring(8);
					String result = parseFile(source,cursor,cps);
					if(!expect.equals(result))
						logger.log(Level.WARNING, "ERROR: expecting \""+expect+"\" but got \""+result+"\"");
					else
						logger.info("PASS");
				}
			}
		 
			br.close();
		}
		long parserStop = System.currentTimeMillis();
		logger.info("Total lexer+parser time " + (parserStop - parserStart) + "ms.");
	}

	public static String parseFile(String f, int cursor, GroovyClasspathScanner cps) {
		String res = "";
			
		GroovyAutocomplete jac = new GroovyAutocomplete(cps);
				
		List<String> ret = jac.doAutocomplete(f, cursor, null);
		for(String s : ret ) {
			res += s + " ";
		}
		
		return res.trim();
	}
	
	static String readFile(String path) 
	  {
	    byte[] encoded;
        try {
          encoded = Files.readAllBytes(Paths.get(path));
          return new String(encoded, Charset.defaultCharset());
        } catch (IOException e) {
          e.printStackTrace();
        }
        return null;
	  }
}
