package com.youandwe.service;

import com.youandwe.dto.UserRegistrationRequest;
import com.youandwe.dto.UserLoginRequest;
import com.youandwe.dto.UserResponse;
import com.youandwe.dto.JwtAuthResponse;
import com.youandwe.dto.OtpVerificationRequest;

public interface UserService {
    UserResponse registerUser(UserRegistrationRequest request);
    JwtAuthResponse login(UserLoginRequest request);
    void verifyOtp(OtpVerificationRequest request);
} 