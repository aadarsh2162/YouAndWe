package com.youandwe.controller;

import com.youandwe.service.HelpRequestService;
import com.youandwe.dto.HelpRequestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final HelpRequestService helpRequestService;

    @GetMapping("/{identifier}")
    public Map<String, Object> getDashboardData(@PathVariable String identifier) {
        System.out.println("Dashboard request for identifier: " + identifier);
        
        long myRequestCount = helpRequestService.countHelpRequestsByUser(identifier);
        List<HelpRequestResponse> myRequests = helpRequestService.getHelpRequestsByUser(identifier);
        
        System.out.println("Count returned: " + myRequestCount);
        System.out.println("Requests returned: " + myRequests.size());

        Map<String, Object> response = new HashMap<>();
        response.put("myRequestCount", myRequestCount);
        response.put("myRequests", myRequests);
        return response;
    }
} 