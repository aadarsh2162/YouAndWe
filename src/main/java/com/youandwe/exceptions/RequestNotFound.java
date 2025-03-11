package com.youandwe.exceptions;

public class RequestNotFound  extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4115142097189900789L;

	public RequestNotFound() {
		super();
	}

	public RequestNotFound(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public RequestNotFound(String message, Throwable cause) {
		super(message, cause);
	}

	public RequestNotFound(String message) {
		super(message);
	}

	public RequestNotFound(Throwable cause) {
		super(cause);
	}
	

}
