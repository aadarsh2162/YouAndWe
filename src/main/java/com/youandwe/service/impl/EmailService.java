package com.youandwe.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.youandwe.service.interfaces.EmailServiceInterface;

@Service
public class EmailService  implements EmailServiceInterface{

	
	@Autowired
	private JavaMailSender javaMailSender;
	@Override
	public void sendEmail(String toEmail, String subject, String body) {
		 SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(toEmail);
	        message.setSubject(subject);
	        message.setText(body);
	        javaMailSender.send(message);
	    }
		
	}
	


