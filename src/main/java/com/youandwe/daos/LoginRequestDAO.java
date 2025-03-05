package com.youandwe.daos;

public class LoginRequestDAO {
	 private String usernameOrEmail; // Can be username or email
	    private String password;
		public String getUsernameOrEmail() {
			return usernameOrEmail;
		}
		public void setUsernameOrEmail(String usernameOrEmail) {
			this.usernameOrEmail = usernameOrEmail;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
	    
	    
}
