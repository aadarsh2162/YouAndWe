package com.youandwe.exceptions;

public class InvalidCredentials  extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2085217572089789315L;

	public InvalidCredentials() {
		super();

	}

	public InvalidCredentials(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public InvalidCredentials(String message, Throwable cause) {
		super(message, cause);
	
	}

	public InvalidCredentials(String message) {
		super(message);
	
	}

	public InvalidCredentials(Throwable cause) {
		super(cause);
	
	}
	
	

}
