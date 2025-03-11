package com.youandwe.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 * Service class for retrieving details of the currently authenticated user.
 */
@Service
public class AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    /**
     * Retrieves the username of the currently authenticated user.
     *
     * @return The username if authenticated, otherwise "Anonymous".
     */
    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal() == null) {
            logger.warn("No authenticated user found.");
            return "Anonymous";
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails) {
            logger.info("Authenticated user: {}", ((UserDetails) principal).getUsername());
            return ((UserDetails) principal).getUsername();
        } else {
            logger.info("Principal is not an instance of UserDetails. Returning string representation.");
            return principal.toString();
        }
    }
}
