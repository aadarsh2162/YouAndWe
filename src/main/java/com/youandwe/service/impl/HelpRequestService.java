package com.youandwe.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.youandwe.entity.AppUsers;
import com.youandwe.entity.HelpRequest;
import com.youandwe.exceptions.HelpRequestAPIException;
import com.youandwe.exceptions.RequestNotFound;
import com.youandwe.repository.AppUsersRepository;
import com.youandwe.repository.HelpRequestaRepository;
import com.youandwe.service.interfaces.HelpRequestInter;

/**
 * Service class for handling Help Requests.
 * Implements {@link HelpRequestInter} to provide CRUD operations on HelpRequest entities.
 */
@Service
public class HelpRequestService implements HelpRequestInter {

    @Autowired
    private AppUsersRepository appUsersRepository;

    @Autowired
    private HelpRequestaRepository helpRequestaRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    public HelpRequest saveRequest(HelpRequest request) {
        String username = authenticationService.getCurrentUsername();

        AppUsers appUser = appUsersRepository.findByUsernameOrEmailOrMobileNo(username, username , username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        request.setRequestPostedOn(LocalDateTime.now());
        request.setAppUsers(appUser);

        return helpRequestaRepository.save(request);
    }

   
    @Override
    public Iterable<HelpRequest> getAllRequest() {
        System.out.println("getAll Request");
        return helpRequestaRepository.findAll();
    }

  
    @Override
    public String deleteById(Integer id) {
        helpRequestaRepository.deleteById(id);
        if (!helpRequestaRepository.existsById(id)) {
            return "Request Deleted Successfully";
        } else {
            throw new RequestNotFound("Mentioned ID does not exist");
        }
    }

  
    @Override
    public HelpRequest updateHelpRequest(HelpRequest helpRequestDto, Long helpRequestId) {
        Optional<HelpRequest> helpRequest = helpRequestaRepository.findById(helpRequestId);

        if (helpRequest.isPresent()) {
            HelpRequest request = helpRequest.get();

//            request.setEmail(helpRequestDto.getEmail());
            request.setUsername(helpRequestDto.getUsername());
            request.setHelp(helpRequestDto.getHelp());
            request.setDetails(helpRequestDto.getDetails());
            request.setRequestPostedOn(LocalDateTime.now());

            return helpRequestaRepository.save(request);
        } else {
            throw new HelpRequestAPIException(HttpStatus.NOT_FOUND, "User does not exist with this ID: " + helpRequestId);
        }
    }
}
