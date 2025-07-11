package com.youandwe.service;

import com.youandwe.dto.HelpRequestCreateRequest;
import com.youandwe.dto.HelpRequestResponse;
import java.util.List;

public interface HelpRequestService {
    HelpRequestResponse createHelpRequest(HelpRequestCreateRequest request, String username);
    List<HelpRequestResponse> getAllHelpRequests();
    List<HelpRequestResponse> getHelpRequestsByUser(String identifier);
    HelpRequestResponse getHelpRequestById(Long id);
    long countHelpRequestsByUser(String identifier);
    HelpRequestResponse updateHelpRequest(Long id, HelpRequestCreateRequest request, String username);
} 