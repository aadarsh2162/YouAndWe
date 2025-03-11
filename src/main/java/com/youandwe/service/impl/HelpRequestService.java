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

    /**
     * Saves a new HelpRequest associated with the currently authenticated user.
     *
     * @param request The HelpRequest object containing request details.
     * @return The saved HelpRequest object.
     * @throws RuntimeException if the authenticated user is not found.
     */
    @Override
    public HelpRequest saveRequest(HelpRequest request) {
        String username = authenticationService.getCurrentUsername();

        AppUsers appUser = appUsersRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        request.setRequestPostedOn(LocalDateTime.now());
        request.setAppUsers(appUser);

        return helpRequestaRepository.save(request);
    }

    /**
     * Retrieves all HelpRequest records from the database.
     *
     * @return An iterable list of all HelpRequest objects.
     */
    @Override
    public Iterable<HelpRequest> getAllRequest() {
        System.out.println("getAll Request");
        return helpRequestaRepository.findAll();
    }

    /**
     * Deletes a HelpRequest by its ID.
     *
     * @param id The ID of the HelpRequest to delete.
     * @return A success message if the request is deleted.
     * @throws RequestNotFound if the request with the given ID does not exist.
     */
    @Override
    public String deleteById(Integer id) {
        helpRequestaRepository.deleteById(id);
        if (!helpRequestaRepository.existsById(id)) {
            return "Request Deleted Successfully";
        } else {
            throw new RequestNotFound("Mentioned ID does not exist");
        }
    }

    /**
     * Updates an existing HelpRequest identified by its ID.
     *
     * @param helpRequestDto The HelpRequest object containing updated details.
     * @param helpRequestId  The ID of the HelpRequest to update.
     * @return The updated HelpRequest object.
     * @throws HelpRequestAPIException if the request with the given ID does not exist.
     */
    @Override
    public HelpRequest updateHelpRequest(HelpRequest helpRequestDto, Long helpRequestId) {
        Optional<HelpRequest> helpRequest = helpRequestaRepository.findById(helpRequestId);

        if (helpRequest.isPresent()) {
            HelpRequest request = helpRequest.get();

            request.setEmail(helpRequestDto.getEmail());
            request.setName(helpRequestDto.getName());
            request.setHelp(helpRequestDto.getHelp());
            request.setDetails(helpRequestDto.getDetails());
            request.setRequestPostedOn(LocalDateTime.now());

            return helpRequestaRepository.save(request);
        } else {
            throw new HelpRequestAPIException(HttpStatus.NOT_FOUND, "User does not exist with this ID: " + helpRequestId);
        }
    }
}
