package com.youandwe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportOfferResponse {
    private boolean success;
    private String message;
    private Object data;
    private Long supportOfferId;
} 