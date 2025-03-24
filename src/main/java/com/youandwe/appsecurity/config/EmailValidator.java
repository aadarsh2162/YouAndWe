package com.youandwe.appsecurity.config;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class EmailValidator {
	private final JavaMailSender mailSender;

	// Constructor Injection
	public EmailValidator(JavaMailSender javaMailSender) {
		this.mailSender = javaMailSender;
	}

	public void sendVerificationEmail(String email) {
        String verificationLink = "http://localhost:8080/api/auth/email-verify/" + email;

        
        	// Read the email.html file from resources/templates
          //  String emailContent = new String(Files.readAllBytes(Paths.get("src/main/resources/templates/email.html")));
        	String emailContent  = "<!DOCTYPE html>"
        	        + "<html lang='en'>"
        	        + "<head>"
        	        + "  <meta charset='UTF-8'>"
        	        + "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>"
        	        + "  <title>Email Verification</title>"
        	        + "  <style>"
        	        + "    body { margin: 0; padding: 0; background: #F7F8F9; font-family: Arial, sans-serif; }"
        	        + "    .container { max-width: 500px; margin: auto; background: #474242; text-align: center; padding: 20px; border-radius: 10px; }"
        	        + "    img { width: 100%; max-width: 498px; border-radius: 10px; }"
        	        + "    h1, h3 { color: #2adf6a; margin: 10px 0; }"
        	        + "    p { color: #2adf6a; font-size: 14px; }"
        	        + "    .btn { display: inline-block; margin-top: 15px; padding: 10px 20px; background: #2adf6a; color: #FFFFFF; text-decoration: none; font-size: 16px; border-radius: 5px; }"
        	        + "  </style>"
        	        + "</head>"
        	        + "<body>"
        	        + "  <div class='container'>"
        	        + "    <img src='https://i.imgur.com/zAesuqW.jpeg' alt='Banner'>"
        	        + "    <h1>Welcome To YouAndWe!</h1>"
        	        + "    <h3>Verify Your Email</h3>"
        	        + "    <p>Thank you for joining <strong>YouAndWE</strong>! To complete your registration, please verify your email address.</p>"
        	        + "    <a href='"+ verificationLink +"'  class='btn'>Verify Email</a>"
        	        + "  </div>"
        	        + "</body>"
        	        + "</html>";


            sendEmail(email, "Verify Your Email", emailContent);
       
       
    }

    private void sendEmail(String to, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
