package com.youandwe.repository;

import com.youandwe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.time.LocalDateTime;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByMobileNo(String mobileNo);
    void deleteByStatusAndOtpExpiryBefore(String status, LocalDateTime expiry);
} 