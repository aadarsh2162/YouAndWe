package com.youandwe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youandwe.entity.AppUsers;
import com.youandwe.repository.AppUsersRepository;


@Service
public class LoginLogoutDetailService {

	
	@Autowired
 private AppUsersRepository appUsersRepository ;
	
	
	// for login purpose
    public Boolean login(String usernameOrEmail, String password) {
        AppUsers loginData = appUsersRepository.findByEmail(usernameOrEmail);

        if (loginData == null) {
            loginData = appUsersRepository.findByUsername(usernameOrEmail);
        }

        if (loginData == null || !loginData.getPassword().equals(password)) {
            return false;
        }
         
        
        return true;
    }
	
	
}
