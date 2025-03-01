package com.youandwe.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.youandwe.daos.AppUsersDAO;
import com.youandwe.entity.AppUsers;
import com.youandwe.service.AppUsersService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class AppUsersController {

    @Autowired
    private AppUsersService appUsersService;

    // Save a new user
    @PostMapping("/save")
    public ResponseEntity<AppUsersDAO> saveNewUser(@RequestBody AppUsers user) {
        return ResponseEntity.ok(appUsersService.saveNewUser(user));
    }

    // Find user by ID
    @GetMapping("/find/{id}")
    public ResponseEntity<AppUsersDAO> findByID(@PathVariable Integer id) {
        return ResponseEntity.ok(appUsersService.findById(id));
    }

    // Delete user by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteByID(@PathVariable Integer id) {
        return ResponseEntity.ok(appUsersService.delete(id));
    }

   

    
}
