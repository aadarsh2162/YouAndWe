package com.youandwe.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.youandwe.appsecurity.config.service.JWTService;
import com.youandwe.appsecurity.config.service.MyUserDetailsService;
import com.youandwe.daos.LoginRequestDAO;
import com.youandwe.entity.AppUsers;
import com.youandwe.repository.AppUsersRepository;

import youandme.exceptions.InvalidCredentials;

import org.springframework.security.core.Authentication;

@Service
public class AppUsersService {
	@Autowired
	private JWTService jwtService;

	@Autowired
	AuthenticationManager authManager;

	@Autowired
	private AppUsersRepository repo;

	@Autowired
	MyUserDetailsService detailsService;

	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	public AppUsers register(AppUsers user) {
		user.setPassword(encoder.encode(user.getPassword()));
		user.setSignupTime(LocalDateTime.now());
		return repo.save(user);

	}

	
	public String verify(LoginRequestDAO loginRequestDAO) {
		String identifier = loginRequestDAO.getUsernameOrEmail(); // Extract username/email
		String password = loginRequestDAO.getPassword(); // Extract password

		// Authenticate user
		Authentication authentication = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(identifier, password));

		if (!authentication.isAuthenticated()) {
			throw new InvalidCredentials("Invalid Username or Password");
		}

	
		// Generate JWT token
		 return jwtService.generateToken(loginRequestDAO.getUsernameOrEmail());
	}
	
	public Long getUser(){
		return repo.count();
	}

}
