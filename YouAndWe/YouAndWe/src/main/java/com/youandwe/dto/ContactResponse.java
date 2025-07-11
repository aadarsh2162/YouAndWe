package com.youandwe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ContactResponse {
    private String mobileNo;
    private String email;
    private String whatsapp;
    private String location;
    private String preferredTime;
    private String address;

   
} 