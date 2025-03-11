package com.youandwe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.youandwe.entity.HelpRequest;
import com.youandwe.service.interfaces.HelpRequestInter;

/**
 * Controller class for managing help requests. Provides endpoints for users and
 * admins to create, retrieve, update, and delete help requests.
 */
@RestController
@RequestMapping("/api/helpRequests")
public class HelpRequestController {

	@Autowired
	private HelpRequestInter helpRequestService;

	/**
	 * Saves a new help request. Accessible by users and admins.
	 *
	 * @param request The help request details provided in the request body.
	 * @return ResponseEntity containing the saved help request.
	 */
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@PostMapping
	public ResponseEntity<HelpRequest> saveRequest(@RequestBody HelpRequest request) {
		return ResponseEntity.ok().body(helpRequestService.saveRequest(request));
	}

	/**
	 * Retrieves all help requests. Accessible by users and admins.
	 *
	 * @return ResponseEntity containing a list of all help requests.
	 */
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@GetMapping
	public ResponseEntity<Iterable<HelpRequest>> getAllRequest() {
		return ResponseEntity.ok(helpRequestService.getAllRequest());
	}

	/**
	 * Deletes a help request by ID. Accessible only by admins.
	 *
	 * @param id The ID of the help request to be deleted.
	 * @return ResponseEntity containing a success message.
	 */
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteRequestById(@PathVariable Integer id) {
		return ResponseEntity.accepted().body(helpRequestService.deleteById(id));
	}

	/**
	 * Admin-specific endpoint for testing access control.
	 *
	 * @return A welcome message for admins.
	 */
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("admin")
	public String admin() {
		return "Welcome Admin";
	}

	/**
	 * User-specific endpoint for testing access control.
	 *
	 * @return A welcome message for users.
	 */
	@PreAuthorize("hasRole('USER')")
	@GetMapping("user")
	public String user() {
		return "Welcome User";
	}

	/**
	 * Updates an existing help request by ID. Accessible only by admins.
	 *
	 * @param helpRequestDto The updated help request details.
	 * @param helpRequestId  The ID of the help request to be updated.
	 * @return ResponseEntity containing the updated help request.
	 */
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<HelpRequest> updateTodo(@RequestBody HelpRequest helpRequestDto,
			@PathVariable("id") Long helpRequestId) {
		HelpRequest updatedHelpRequest = helpRequestService.updateHelpRequest(helpRequestDto, helpRequestId);
		return ResponseEntity.ok(updatedHelpRequest);
	}
}