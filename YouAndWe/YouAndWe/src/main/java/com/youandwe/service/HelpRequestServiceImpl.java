package com.youandwe.service;

import com.youandwe.dto.HelpRequestCreateRequest;
import com.youandwe.dto.HelpRequestResponse;
import com.youandwe.entity.HelpRequest;
import com.youandwe.entity.User;
import com.youandwe.exception.CustomException;
import com.youandwe.repository.HelpRequestRepository;
import com.youandwe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HelpRequestServiceImpl implements HelpRequestService {

    private final HelpRequestRepository helpRequestRepository;
    private final UserRepository userRepository;

    @Override
    public HelpRequestResponse createHelpRequest(HelpRequestCreateRequest request, String username) {
    	System.out.println(request);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("User not found"));

        HelpRequest helpRequest = HelpRequest.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .status("OPEN")
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        HelpRequest saved = helpRequestRepository.save(helpRequest);
        return mapToResponse(saved);
    }

    @Override
    public List<HelpRequestResponse> getAllHelpRequests() {
        return helpRequestRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<HelpRequestResponse> getHelpRequestsByUser(String identifier) {
        System.out.println("getHelpRequestsByUser called with identifier: " + identifier);
        User user = userRepository.findByUsername(identifier)
                .orElseGet(() -> userRepository.findByEmail(identifier)
                        .orElseThrow(() -> new CustomException("User not found")));
        System.out.println("Found user: ID=" + user.getId() + ", Username=" + user.getUsername() + ", Email=" + user.getEmail());
        
        List<HelpRequest> requests = helpRequestRepository.findByUserId(user.getId());
        System.out.println("Found " + requests.size() + " requests for user ID: " + user.getId());
        
        List<HelpRequestResponse> responses = requests.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        
        responses.forEach(req -> System.out.println("Response - ID: " + req.getId() + ", User ID: " + req.getUserId() + ", Username: " + req.getUsername()));
        
        return responses;
    }

    @Override
    public HelpRequestResponse getHelpRequestById(Long id) {
        HelpRequest helpRequest = helpRequestRepository.findById(id)
            .orElseThrow(() -> new CustomException("Help request not found"));
        return mapToResponse(helpRequest);
    }

    @Override
    public long countHelpRequestsByUser(String identifier) {
        User user = userRepository.findByUsername(identifier)
                .orElseGet(() -> userRepository.findByEmail(identifier)
                        .orElseThrow(() -> new CustomException("User not found")));
        return helpRequestRepository.countByUserId(user.getId());
    }

    @Override
    public HelpRequestResponse updateHelpRequest(Long id, HelpRequestCreateRequest request, String username) {
     
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("User not found"));
        
        HelpRequest helpRequest = helpRequestRepository.findById(id)
                .orElseThrow(() -> new CustomException("Help request not found"));
        
        // Check if the user owns this request
        if (!helpRequest.getUser().getId().equals(user.getId())) {
            System.out.println("User ownership check failed: " + helpRequest.getUser().getId() + " != " + user.getId());
            throw new CustomException("You can only update your own requests");
        }
        System.out.println("User ownership check passed");
        
        // Update the request
        helpRequest.setTitle(request.getTitle());
        helpRequest.setDescription(request.getDescription());
        helpRequest.setCategory(request.getCategory());
        helpRequest.setStatus(request.getStatus()); 
        helpRequest.setUpdatedAt(LocalDateTime.now());
        
        HelpRequest saved = helpRequestRepository.save(helpRequest);
        System.out.println("Request saved successfully: ID=" + saved.getId() + ", Title=" + saved.getTitle());
        
        HelpRequestResponse response = mapToResponse(saved);
        System.out.println("Returning response: " + response);
        return response;
    }

    private HelpRequestResponse mapToResponse(HelpRequest helpRequest) {
        return HelpRequestResponse.builder()
                .id(helpRequest.getId())
                .title(helpRequest.getTitle())
                .description(helpRequest.getDescription())
                .category(helpRequest.getCategory())
                .status(helpRequest.getStatus())
                .userId(helpRequest.getUser().getId())
                .username(helpRequest.getUser().getUsername())
                .createdAt(helpRequest.getCreatedAt())
                .updatedAt(helpRequest.getUpdatedAt())
                .build();
    }
} 