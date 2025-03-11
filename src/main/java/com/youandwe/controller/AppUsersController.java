package com.youandwe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.youandwe.daos.AppUserDAO;
import com.youandwe.daos.JwtAuthResponse;
import com.youandwe.daos.LoginRequestDAO;
import com.youandwe.entity.AppUsers;
import com.youandwe.service.interfaces.UserAuth;

/**
 * Controller class for handling user authentication-related operations.
 */
@RestController
@RequestMapping("/api/auth")
public class AppUsersController {

    @Autowired
    private UserAuth userAuth;
    
    /**
     * Handles user registration.
     * 
     * @param user The user details provided in the request body.
     * @return ResponseEntity containing the registered user details.
     */
    @PostMapping("/signup")
    public ResponseEntity<AppUserDAO> register(@RequestBody AppUsers user) {
        AppUsers newUser = userAuth.register(user);
        return ResponseEntity
                .ok(new AppUserDAO(user.getUserId(), newUser.getName(), newUser.getUsername(), newUser.getEmail()));
    }

    /**
     * Handles user login and returns a JWT token if authentication is successful.
     * 
     * @param loginRequest The login credentials provided in the request body.
     * @return ResponseEntity containing the authentication token.
     */
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequestDAO loginRequest) {
        JwtAuthResponse token = userAuth.verify(loginRequest);
        return ResponseEntity.ok().body(token);
    }
    
    /**
     * Endpoint for testing purposes to count the total number of users.
     * 
     * @return ResponseEntity containing the count of users.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getUser() {
        ResponseEntity<Long> entity = ResponseEntity.ok().body(userAuth.countUser());
        System.out.println(entity + " count value"); // Debugging statement
        return entity;
    }
}
