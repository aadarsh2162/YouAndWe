package com.youandwe.service;

import com.youandwe.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class UnverifiedUserCleanupTask {
    private final UserRepository userRepository;

    public UnverifiedUserCleanupTask(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Runs every 5 minutes
    @Scheduled(cron = "0 0/5 * * * ?")
    public void deleteUnverifiedUsers() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(5);
        userRepository.deleteByStatusAndOtpExpiryBefore("UNVERIFIED", cutoff);
    }
} 