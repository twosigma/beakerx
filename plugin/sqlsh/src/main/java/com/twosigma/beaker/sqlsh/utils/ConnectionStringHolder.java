package com.twosigma.beaker.sqlsh.utils;

import java.util.StringTokenizer;

public class ConnectionStringHolder {

  public static final String USER_CONNECTION_KEY = "user";
  public static final String PASSWORD_CONNECTION_KEY = "password";
  public static final String KEY_FOR_DISPLAY_INPUT_DIALOG = "<prompt>";
  public static final String EQUAL_SIGN = "=";
  public static final String QUESTION_SIGN = "?";
  public static final String AND_SIGN = "&";
	
  private String connectionString;
  private String user;
  private String password;
  private boolean showDialog;
  
  public ConnectionStringHolder(String connectionString){
  	setConnectionString(connectionString);
  }
	
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isShowDialog() {
		return showDialog;
	}
	public void setShowDialog(boolean showDialog) {
		this.showDialog = showDialog;
	}
	public String getConnectionString() {
		return connectionString;
	}
	
	public void setConnectionString(String connectionString) {
		int beginIndex = connectionString.indexOf(QUESTION_SIGN);
		if(beginIndex > -1){
			this.connectionString = connectionString.substring(0,beginIndex);
		}else{
			this.connectionString = connectionString;
		}

		String user = getProperty(USER_CONNECTION_KEY, connectionString);
		if(user != null){
			if(KEY_FOR_DISPLAY_INPUT_DIALOG.equals(user)){
				showDialog = true;
			}else{
				this.user = user;
			}
			
			String password = getProperty(PASSWORD_CONNECTION_KEY, connectionString);
			if(password != null){
				if(KEY_FOR_DISPLAY_INPUT_DIALOG.equals(password)){
					showDialog = true;
				}else{
					this.password = password;
				}
			}else{
				showDialog = true;
			}
		}

	}
	
	
	protected static String getProperty(String property, String connectionString){
		String ret = null;
		if(property != null && !property.isEmpty() && connectionString != null && !connectionString.isEmpty()){
			int beginIndex = connectionString.indexOf(QUESTION_SIGN);
			
			if(beginIndex > -1){
				
				beginIndex += QUESTION_SIGN.length();
				String temp = connectionString.substring(beginIndex).trim();
				
				StringTokenizer tokens = new StringTokenizer(temp, QUESTION_SIGN + AND_SIGN);
				
				while(tokens.hasMoreTokens()){
					String parameter = tokens.nextToken().trim();
					beginIndex = parameter.indexOf(property);
					if(beginIndex == 0){
						int equalIndex = parameter.indexOf(EQUAL_SIGN);
						if(equalIndex > -1){
							ret = parameter.substring(equalIndex + 1, parameter.length());
						}
					}
				}
			}
		}
		return ret;
	}
	
  protected String getConnectionStringWithUserPassword(){
  	String ret = connectionString;
	  boolean firstOption = true;
	  if(this.user != null && !this.user.isEmpty()){
		  ret += firstOption ? QUESTION_SIGN : AND_SIGN;
		  firstOption = false;
		  ret += USER_CONNECTION_KEY + EQUAL_SIGN + this.user;
	  }
	  if(this.password != null && !this.password.isEmpty()){
		  ret += firstOption ? QUESTION_SIGN : AND_SIGN;
		  firstOption = false;
		  ret += PASSWORD_CONNECTION_KEY + EQUAL_SIGN + this.password;
	  }
	  return ret;
  }
	
}