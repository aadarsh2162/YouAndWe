package com.youandwe.service.impl;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.youandwe.appsecurity.config.EmailValidator;
import com.youandwe.appsecurity.config.service.JWTService;
import com.youandwe.appsecurity.config.service.UserPrincipal;
import com.youandwe.daos.JwtAuthResponse;
import com.youandwe.daos.LoginRequestDAO;
import com.youandwe.entity.AppUsers;
import com.youandwe.entity.Role;
import com.youandwe.exceptions.HelpRequestAPIException;
import com.youandwe.repository.AppUsersRepository;
import com.youandwe.repository.RoleRepository;
import com.youandwe.service.interfaces.UserAuth;

/**
 * Service class for managing user authentication and registration.
 * Provides methods for user sign-up, login, and token-based authentication.
 */
@Service
public class AppUsersService implements UserAuth {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private AppUsersRepository repo;

  @Autowired
  private EmailValidator emailValidator;

    @Autowired
    private RoleRepository roleRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

  
    @Override
    public AppUsers register(AppUsers user) {
    	
    	
    	
        if (repo.existsByUsername(user.getUsername())) {
            throw new HelpRequestAPIException(HttpStatus.BAD_REQUEST, "Username is already taken!");
        }

        // Check if email already exists
        if (repo.existsByEmail(user.getEmail())) {
            throw new HelpRequestAPIException(HttpStatus.BAD_REQUEST, "Email is already registered!");
        }
        // validate mail
        emailValidator.sendVerificationEmail(user.getEmail());

        // Create a new user instance
        AppUsers newUser = new AppUsers();
        newUser.setName(user.getName());
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(encoder.encode(user.getPassword()));// Encrypt password
        newUser.setMobileNo(user.getMobileNo());
        newUser.setSignupTime(LocalDateTime.now());
        
        // Assign the default "USER" role
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");

        if (userRole == null) {
            throw new HelpRequestAPIException(HttpStatus.INTERNAL_SERVER_ERROR, "Default role 'ROLE_USER' not found!");
        }

        roles.add(userRole);
        newUser.setRoles(roles);
        
      

        return repo.save(newUser);
    }

   
    @Override
    public JwtAuthResponse verify(LoginRequestDAO loginRequestDAO) {
        // Authenticate user with username/email and password
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequestDAO.getUsernameOrEmailorMobileNo(),
                loginRequestDAO.getPassword()
            )
        );

        // Set authentication context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get authenticated user details
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
       

        // Generate JWT token
        String token = jwtService.generateToken(userPrincipal);

        // Collect user roles
        Set<String> roles = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        
      
        return new JwtAuthResponse(token, "Bearer", roles);
    }

    
    @Override
    public Long countUser() {
        return repo.count();
    }
}
