package com.youandwe.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youandwe.entity.LoginAndLogutDetails;
import com.youandwe.repository.AppUsersRepository;
import com.youandwe.repository.LoAndOutDetailRepository;
import com.youandwe.service.LoginLogoutDetailService;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginLogoutDetailController {

	@Autowired
	private LoginLogoutDetailService detailService;

	@Autowired
	private LoAndOutDetailRepository andOutDetailRepository;

	

	// User login
	@PostMapping("/login")
	public ResponseEntity<Boolean> login(@RequestBody Map<String, Object> requestBody) {
		String usernameOrEmail = (String) requestBody.get("usernameOrEmail");
		String password = (String) requestBody.get("password");

		Boolean isAuthenticated = detailService.login(usernameOrEmail, password);

		if (isAuthenticated) {
			System.out.println("Login Successful");

			Optional<LoginAndLogutDetails> emailAuth = andOutDetailRepository.findByEmail(usernameOrEmail);
			Optional<LoginAndLogutDetails> usernameAuth = andOutDetailRepository.findByUsername(usernameOrEmail);

			LoginAndLogutDetails details;

			if (emailAuth.isPresent() || usernameAuth.isPresent()) {
				details = emailAuth.get();
				details = usernameAuth.get();
				if (emailAuth.isPresent()) {
					details.setEmail(usernameOrEmail);
				} else {
					details.setUsername(usernameOrEmail);
				}

				// User exists, update login time

				System.out.println("Existing user login time: " + details.getLoginTime());
			} else {
				// New login entry
				details = new LoginAndLogutDetails();
				if (usernameOrEmail.contains("@")) {
					details.setEmail(usernameOrEmail);
				} else {
					details.setUsername(usernameOrEmail);
				}

				details.setPassword(password);
				System.out.println("New user login");
			}

			// Update login time
			details.setLoginTime(LocalDateTime.now());
			andOutDetailRepository.save(details);

			return ResponseEntity.ok(isAuthenticated);
		}
		System.out.println("failed ");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(isAuthenticated);
	}

}
