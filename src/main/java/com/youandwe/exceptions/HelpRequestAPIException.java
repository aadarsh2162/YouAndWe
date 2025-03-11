package com.youandwe.exceptions;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HelpRequestAPIException extends RuntimeException {
	
	private static final long serialVersionUID = -7701764416348885270L;
	private HttpStatus status;
	    private String message;
}
