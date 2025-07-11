package com.youandwe.config;

import com.youandwe.entity.Role;
import com.youandwe.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {
    private final RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        roleRepository.findByName("ROLE_USER").orElseGet(() -> {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");
            return roleRepository.save(userRole);
        });
    }
} 