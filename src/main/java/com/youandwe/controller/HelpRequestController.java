package com.youandwe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youandwe.entity.HelpRequest;
import com.youandwe.service.HelpRequestService;

@RestController
@RequestMapping("/user-request")
public class HelpRequestController {

	
	@Autowired
	private HelpRequestService helpRequestService;
	
	
	
	@PostMapping("/help-requests")
	public ResponseEntity<HelpRequest> saveRequest( @RequestBody HelpRequest request ){
		return ResponseEntity.ok().body(helpRequestService.saveRequest(request));
	}
	
	@GetMapping("/getall-request")
	public ResponseEntity<Iterable<HelpRequest>> getAllRequest(){
		return ResponseEntity.ok(helpRequestService.getAllRequest());
	}
	
	@DeleteMapping("/delete-request/{id}")
	public ResponseEntity<String> deleteRequestById(@PathVariable Integer id){
		return ResponseEntity.accepted().body(helpRequestService.deleteById(id));
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
