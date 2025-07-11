package com.youandwe.controller;

import com.youandwe.dto.ContactResponse;
import com.youandwe.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @GetMapping("/{id}/contact")
    public ResponseEntity<ContactResponse> getContact(@PathVariable Long id) {
        ContactResponse contact = requestService.getContactInfo(id);
        return ResponseEntity.ok(contact);
    }
} 