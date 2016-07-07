package com.twosigma.beaker.sqlsh.utils;

import org.codehaus.jackson.annotate.JsonProperty;

public class ConnectionStringBean {

	private String connectionName;
  private String connectionString;
  private String user;
	
  public ConnectionStringBean(String connectionName, String connectionString, String user) {
		super();
		this.connectionName = connectionName;
		this.connectionString = connectionString;
		this.user = user;
	}
  
  @JsonProperty("connectionName")
	public String getConnectionName() {
		return connectionName;
	}
	public void setConnectionName(String connectionName) {
		this.connectionName = connectionName;
	}
	@JsonProperty("connectionString")
	public String getConnectionString() {
		return connectionString;
	}
	public void setConnectionString(String connectionString) {
		this.connectionString = connectionString;
	}
	@JsonProperty("user")
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
		return "connectionName = " + connectionName + "; connectionString = " + connectionString + "; user = " + user;
	}
	
}