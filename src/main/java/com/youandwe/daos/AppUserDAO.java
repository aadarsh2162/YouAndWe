package com.youandwe.daos;

public class AppUserDAO {
   private Integer id;
   private String name;
   private String username;
   private String email;
   
   
public AppUserDAO() {
	super();
	
}
public AppUserDAO(Integer id, String name, String username, String email) {
	super();
	this.id = id;
	this.name = name;
	this.username = username;
	this.email = email;
}
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
   
   
}
