package com.youandwe.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.youandwe.appsecurity.config.service.JWTService;
import com.youandwe.entity.AppUsers;
import com.youandwe.entity.HelpRequest;
import com.youandwe.repository.AppUsersRepository;
import com.youandwe.repository.HelpRequestaRepository;

import youandme.exceptions.RequestNotFound;

@Service
public class HelpRequestService {
@Autowired
AppUsersRepository appUsersRepository;

	@Autowired
	private HelpRequestaRepository helpRequestaRepository;
	
	@Autowired
	private AuthenticationService authenticationService;

	
	public HelpRequest saveRequest(HelpRequest request) {
	    String username = authenticationService.getCurrentUsername();
	    
	    AppUsers appUser = appUsersRepository.findByUsernameOrEmail(username, username)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	    request.setRequestPostedOn(LocalDateTime.now());
	    request.setAppUsers(appUser);

	    return helpRequestaRepository.save(request);
	}

	
	public Iterable<HelpRequest> getAllRequest() {
		System.out.println("getAll Request");
		return helpRequestaRepository.findAll();
	}
	
	

	public String deleteById(Integer id) {

		helpRequestaRepository.deleteById(id);
		if (!helpRequestaRepository.existsById(id)) {
			return "Request Deleted Succssefully";
		} else
			throw new RequestNotFound("Mentiond Id not exists");

	}

}
