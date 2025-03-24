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
    
  
    @PostMapping("/signup")
    public ResponseEntity<AppUserDAO> register(@RequestBody AppUsers user) {
        AppUsers newUser = userAuth.register(user);
        return ResponseEntity.ok(new AppUserDAO(newUser.getUserId(), newUser.getName()
        		,newUser.getUsername() ,newUser.getEmail(),newUser.getMobileNo() ));
    }

   
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequestDAO loginRequest) {
        JwtAuthResponse token = userAuth.verify(loginRequest);
        
        return ResponseEntity.ok().body(token);
    }
    
   
    @GetMapping("/count")
    public ResponseEntity<Long> getUser() {
        ResponseEntity<Long> entity = ResponseEntity.ok().body(userAuth.countUser());
        System.out.println(entity + " count value"); // Debugging statement
        return entity;
    }
    
    @GetMapping("/email-verify/{email}")
    public ResponseEntity<String> verifyMail(@PathVariable String email){
    	return ResponseEntity.ok("thank you  for verification now you can login" + email);
    }
}
