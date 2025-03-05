package com.youandwe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.youandwe.daos.AppUserDAO;
import com.youandwe.daos.LoginRequestDAO;
import com.youandwe.entity.AppUsers;
import com.youandwe.service.AppUsersService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3001")
public class AppUsersController {

	@Autowired
	private AppUsersService appUsersService;

	@PostMapping("/register")
	public ResponseEntity<AppUserDAO> register(@RequestBody AppUsers user) {
		AppUsers newUser = appUsersService.register(user);
		return ResponseEntity
				.ok(new AppUserDAO(user.getUserId(), newUser.getName(), newUser.getUsername(), newUser.getEmail()));

	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequestDAO loginRequest) {
//System.out.println(user);
//   return ResponseEntity.accepted().body(appUsersService.verify(user));
		System.out.println(loginRequest.getUsernameOrEmail() + "username or email");
		System.out.println(loginRequest.getPassword() + "password");
		try {
			String token = appUsersService.verify(loginRequest);
			System.out.println(token);
			return ResponseEntity.ok().body(token);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Invalid credentials");
		}
	}
	
	
	// for testing purpose only
	@GetMapping("/count")
	public ResponseEntity<Long> getUser(){
		ResponseEntity<Long> entity = ResponseEntity.ok( ).body(appUsersService.getUser());
		System.out.println(entity + "count value");
		return entity;
	}
	
	
	

}
