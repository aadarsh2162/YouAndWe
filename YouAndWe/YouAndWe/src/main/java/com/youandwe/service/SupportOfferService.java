package com.youandwe.service;

import com.youandwe.dto.SupportOfferRequest;
import com.youandwe.dto.SupportOfferResponse;
import com.youandwe.entity.HelpRequest;
import com.youandwe.repository.HelpRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service for handling support offers and email notifications.
 * 
 * Workflow:
 * 1. Supporter clicks "Offer Support" button in frontend
 * 2. Frontend sends POST request to /api/support-offers with SupportOfferRequest
 * 3. Service fetches the help request details from database using requestId
 * 4. Service sends email notification to the needy request creator
 * 5. Email contains supporter's contact details and message
 * 6. Request creator can contact supporter directly
 * 
 * Email Configuration:
 * - Uses configured email from application.properties (spring.mail.username)
 * - Recipient: Request creator's email (fetched from database)
 * - Subject: "New Support Offer for Your Request: [Request Title]"
 * - Content: Supporter details, contact info, and message
 */
@Service
public class SupportOfferService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private HelpRequestRepository helpRequestRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public SupportOfferResponse createSupportOffer(SupportOfferRequest request) {
        try {
            // Log the support offer
            System.out.println("Support offer received for request ID: " + request.getRequestId());
            System.out.println("Supporter: " + request.getSupporterName() + " (" + request.getSupporterEmail() + ")");
            System.out.println("Message: " + request.getMessage());
            
            // Fetch the help request to get the creator's email
            Optional<HelpRequest> helpRequestOpt = helpRequestRepository.findById(request.getRequestId());
            if (helpRequestOpt.isEmpty()) {
                return SupportOfferResponse.builder()
                    .success(false)
                    .message("Help request not found with ID: " + request.getRequestId())
                    .build();
            }
            
            HelpRequest helpRequest = helpRequestOpt.get();
            String requestCreatorEmail = helpRequest.getUser().getEmail();
            String requestCreatorName = helpRequest.getUser().getName();
            String requestTitle = helpRequest.getTitle();
            
            // Send email notification to request creator
            boolean emailSent = sendSupportOfferEmail(request, requestCreatorEmail, requestCreatorName, requestTitle);
            
            return SupportOfferResponse.builder()
                .success(true)
                .message(emailSent ? 
                    "Support offer created successfully! Email notification sent to request creator." :
                    "Support offer created successfully! Email notification could not be sent.")
                .supportOfferId(1L) // Mock ID
                .data(request)
                .build();
        } catch (Exception e) {
            System.err.println("Error creating support offer: " + e.getMessage());
            e.printStackTrace();
            return SupportOfferResponse.builder()
                .success(false)
                .message("Failed to create support offer: " + e.getMessage())
                .build();
        }
    }

    private boolean sendSupportOfferEmail(SupportOfferRequest request, String requestCreatorEmail, 
                                        String requestCreatorName, String requestTitle) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            
            // Set recipient (request creator's email)
            message.setTo(requestCreatorEmail);
            
            // Set sender (from application email)
            message.setFrom(fromEmail);
            
            // Set subject
            message.setSubject("New Support Offer for Your Request: " + requestTitle);
            
            // Set email content
            String emailContent = String.format(
                "Hello %s!\n\n" +
                "Great news! You have received a new support offer for your request: \"%s\"\n\n" +
                "Supporter Details:\n" +
                "- Name: %s\n" +
                "- Email: %s\n" +
                "- Phone: %s\n\n" +
                "Support Type: %s\n" +
                "Availability: %s\n" +
                "Preferred Contact Method: %s\n\n" +
                "Message from Supporter:\n\"%s\"\n\n" +
                "Please contact the supporter using their provided contact information to coordinate your help.\n\n" +
                "Thank you for using YouAndWe!\n\n" +
                "Best regards,\nYouAndWe Team",
                requestCreatorName,
                requestTitle,
                request.getSupporterName(),
                request.getSupporterEmail(),
                request.getSupporterPhone(),
                request.getSupportType(),
                request.getAvailability(),
                request.getContactMethod(),
                request.getMessage()
            );
            
            message.setText(emailContent);
            
            // Send the email
            mailSender.send(message);
            System.out.println("Support offer email sent successfully to: " + requestCreatorEmail);
            return true;
            
        } catch (Exception e) {
            System.err.println("Failed to send support offer email: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public SupportOfferResponse getSupportOffer(Long id) {
        try {
            // Mock implementation
            return SupportOfferResponse.builder()
                .success(true)
                .message("Support offer retrieved successfully")
                .supportOfferId(id)
                .build();
        } catch (Exception e) {
            return SupportOfferResponse.builder()
                .success(false)
                .message("Failed to get support offer: " + e.getMessage())
                .build();
        }
    }

    public SupportOfferResponse getSupportOffersByRequest(Long requestId) {
        try {
            // Mock implementation
            return SupportOfferResponse.builder()
                .success(true)
                .message("Support offers retrieved successfully")
                .data(new Object[]{"mock support offer 1", "mock support offer 2"})
                .build();
        } catch (Exception e) {
            return SupportOfferResponse.builder()
                .success(false)
                .message("Failed to get support offers: " + e.getMessage())
                .build();
        }
    }
} 