package com.youandwe.controller;

import com.youandwe.dto.UserRegistrationRequest;
import com.youandwe.dto.UserLoginRequest;
import com.youandwe.dto.UserResponse;
import com.youandwe.dto.JwtAuthResponse;
import com.youandwe.dto.OtpVerificationRequest;
import com.youandwe.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRegistrationRequest request) {
        UserResponse response = userService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody UserRegistrationRequest request) {
        UserResponse response = userService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody UserLoginRequest request) {
        JwtAuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationRequest request) {
        userService.verifyOtp(request);
        return ResponseEntity.ok("OTP verified successfully. You can now log in.");
    }
} 