package com.youandwe.controller;

import com.youandwe.dto.SupportOfferRequest;
import com.youandwe.dto.SupportOfferResponse;
import com.youandwe.service.SupportOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/support-offers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SupportOfferController {

    private final SupportOfferService supportOfferService;

    @PostMapping
    public ResponseEntity<SupportOfferResponse> createSupportOffer(@RequestBody SupportOfferRequest request) {
        try {
        	System.out.println("debug " + request);
            SupportOfferResponse response = supportOfferService.createSupportOffer(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                SupportOfferResponse.builder()
                    .success(false)
                    .message("Failed to create support offer: " + e.getMessage())
                    .build()
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportOfferResponse> getSupportOffer(@PathVariable Long id) {
        try {
            SupportOfferResponse response = supportOfferService.getSupportOffer(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                SupportOfferResponse.builder()
                    .success(false)
                    .message("Failed to get support offer: " + e.getMessage())
                    .build()
            );
        }
    }

    @GetMapping("/request/{requestId}")
    public ResponseEntity<SupportOfferResponse> getSupportOffersByRequest(@PathVariable Long requestId) {
        try {
            SupportOfferResponse response = supportOfferService.getSupportOffersByRequest(requestId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                SupportOfferResponse.builder()
                    .success(false)
                    .message("Failed to get support offers: " + e.getMessage())
                    .build()
            );
        }
    }
} 