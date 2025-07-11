package com.youandwe.controller;

import com.youandwe.dto.HelpRequestCreateRequest;
import com.youandwe.dto.HelpRequestResponse;
import com.youandwe.service.HelpRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class HelpRequestController {

    private final HelpRequestService helpRequestService;

    @PostMapping("/post-request")
    public ResponseEntity<HelpRequestResponse> createHelpRequest(
            @Valid @RequestBody HelpRequestCreateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        HelpRequestResponse response = helpRequestService.createHelpRequest(request, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<HelpRequestResponse>> getAllHelpRequests() {
        return ResponseEntity.ok(helpRequestService.getAllHelpRequests());
    }

    @GetMapping("/my")
    public ResponseEntity<List<HelpRequestResponse>> getMyHelpRequests(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("getMyHelpRequests called with username: " + userDetails.getUsername());
        List<HelpRequestResponse> requests = helpRequestService.getHelpRequestsByUser(userDetails.getUsername());
        System.out.println("Returning " + requests.size() + " requests for user: " + userDetails.getUsername());
        requests.forEach(req -> System.out.println("Request ID: " + req.getId() + ", User ID: " + req.getUserId() + ", Username: " + req.getUsername()));
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HelpRequestResponse> getHelpRequestById(@PathVariable Long id) {
        HelpRequestResponse response = helpRequestService.getHelpRequestById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HelpRequestResponse> updateHelpRequest(
            @PathVariable Long id,
            @Valid @RequestBody HelpRequestCreateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("PUT /api/requests/" + id + " called");
        System.out.println("UserDetails: " + userDetails.getUsername());
        System.out.println("Request body: " + request);
        
        HelpRequestResponse response = helpRequestService.updateHelpRequest(id, request, userDetails.getUsername());
        System.out.println("Controller returning response: " + response);
        return ResponseEntity.ok(response);
    }
} 