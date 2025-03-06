package com.youandwe.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

	// this service class is mainly for getting the current user detail
	
	  public String getCurrentUsername() {
	        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

	        if (principal instanceof UserDetails) {
	        	System.out.println("if part");
	            return ((UserDetails) principal).getUsername(); 
	        } else {
	        	System.out.println("else part");
	            return principal.toString();
	        }
	    }
	
}
