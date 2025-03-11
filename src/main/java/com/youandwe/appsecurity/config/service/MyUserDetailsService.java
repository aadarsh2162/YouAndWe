package com.youandwe.appsecurity.config.service;

import com.youandwe.entity.AppUsers;
import com.youandwe.repository.AppUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service class for loading user details during authentication.
 * Implements {@link UserDetailsService} to fetch user details from the database.
 */
@Service
public class MyUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class);
    private final AppUsersRepository userRepository;

    
    @Autowired
    public MyUserDetailsService(AppUsersRepository userRepository) {
        this.userRepository = userRepository;
    }

   
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        logger.debug("User authentication request for: {}", usernameOrEmail);

        AppUsers user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
            .orElseThrow(() -> {
                logger.error("User not found with username or email: {}", usernameOrEmail);
                return new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail);
            });
        
      

        return new UserPrincipal(user);
    }
}
