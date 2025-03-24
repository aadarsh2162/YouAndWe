package com.youandwe.daos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginRequestDAO {
	
	 private String usernameOrEmailorMobileNo; // Can be username or email
	    private String password;
		
	    
	    
}
