package com.youandwe.service;

import com.youandwe.dto.*;
import com.youandwe.dto.OtpVerificationRequest;
import com.youandwe.entity.Role;
import com.youandwe.entity.User;
import com.youandwe.exception.CustomException;
import com.youandwe.repository.RoleRepository;
import com.youandwe.repository.UserRepository;
import com.youandwe.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    @Override
    public UserResponse registerUser(UserRegistrationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new CustomException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomException("Email is already registered");
        }
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new CustomException("Default role not found"));

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime otpExpiry = LocalDateTime.now().plusMinutes(10);

        User user = User.builder()
                .name(request.getName())
                .username(request.getUsername())
                .email(request.getEmail())
                .mobileNo(request.getMobileNo())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singleton(userRole))
                .status("UNVERIFIED")
                .otp(otp)
                .otpExpiry(otpExpiry)
                .build();

        User saved = userRepository.save(user);
        // Send OTP email
        emailService.sendOtpEmail(saved.getEmail(), otp);
        return new UserResponse(saved.getId(), saved.getName(), saved.getUsername(), saved.getEmail());
    }

    @Override
    public JwtAuthResponse login(UserLoginRequest request) {
        User user = userRepository.findByUsername(request.getUsernameOrEmailOrMobileNo())
                .or(() -> userRepository.findByEmail(request.getUsernameOrEmailOrMobileNo()))
                .or(() -> userRepository.findByMobileNo(request.getUsernameOrEmailOrMobileNo()))
                .orElseThrow(() -> new CustomException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomException("Invalid credentials");
        }
        if (!"VERIFIED".equals(user.getStatus())) {
            throw new CustomException("Your email is not verified. Please verify your email, or sign up again after 5 minutes if you did not receive the OTP.");
        }

        Set<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        String token = jwtUtil.generateToken(user.getUsername(), roles);

        return new JwtAuthResponse(token, "Bearer", roles);
    }

    @Override
    public void verifyOtp(OtpVerificationRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException("User not found with this email"));
        if (user.getOtp() == null || user.getOtpExpiry() == null) {
            throw new CustomException("No OTP found for this user. Please register again.");
        }
        if (!user.getOtp().equals(request.getOtp())) {
            throw new CustomException("Invalid OTP.");
        }
        if (user.getOtpExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new CustomException("OTP has expired. Please register again.");
        }
        user.setStatus("VERIFIED");
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
    }
} 