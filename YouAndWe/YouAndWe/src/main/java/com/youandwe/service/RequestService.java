package com.youandwe.service;

import com.youandwe.dto.ContactResponse;
import com.youandwe.entity.HelpRequest;
import com.youandwe.entity.User;
import com.youandwe.repository.HelpRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestService {
    @Autowired
    private HelpRequestRepository helpRequestRepository;

    public ContactResponse getContactInfo(Long requestId) {
        HelpRequest req = helpRequestRepository.findById(requestId).orElseThrow();
        User user = req.getUser();
        ContactResponse contact = new ContactResponse();
        contact.setMobileNo(user.getMobileNo());
        contact.setEmail(user.getEmail());
        contact.setWhatsapp(user.getMobileNo());
        contact.setLocation("Not provided");
        contact.setPreferredTime("Contact for availability");
        contact.setAddress("Not provided");
        return contact;
    }
} 