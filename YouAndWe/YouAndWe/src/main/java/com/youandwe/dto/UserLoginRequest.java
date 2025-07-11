package com.youandwe.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequest {
    @NotBlank(message = "Username, email, or mobile number is required")
    private String usernameOrEmailOrMobileNo;

    @NotBlank(message = "Password is required")
    private String password;
} 