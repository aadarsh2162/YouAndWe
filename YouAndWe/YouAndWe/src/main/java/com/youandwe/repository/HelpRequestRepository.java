package com.youandwe.repository;

import com.youandwe.entity.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {
    List<HelpRequest> findByUserId(Long userId);
    long countByUserId(Long userId);
} 