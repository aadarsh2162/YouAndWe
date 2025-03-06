package com.youandwe.appsecurity.config.service;

import com.youandwe.entity.AppUsers;
import com.youandwe.repository.AppUsersRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private AppUsersRepository userRepository;


	
    
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        AppUsers user = userRepository.findByUsernameOrEmail(usernameOrEmail , usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail));
        System.out.println(usernameOrEmail + "in user details service debug");

        return new UserPrincipal(user); 
    }

}
