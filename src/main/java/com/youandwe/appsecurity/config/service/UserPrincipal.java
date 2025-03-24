package com.youandwe.appsecurity.config.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.youandwe.entity.AppUsers;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Custom implementation of {@link UserDetails} to represent an authenticated user.
 * This class wraps an {@link AppUsers} entity and provides Spring Security with user authentication details.
 */
public class UserPrincipal implements UserDetails, Serializable {

    private static final long serialVersionUID = 1L;
    private final AppUsers user;

    
    public UserPrincipal(AppUsers user) {
        this.user = user;
    }

  
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	System.out.println("Roles assigned to user: " + user.getRoles()); // Debug
        return user.getRoles() != null ? 
            user.getRoles().stream()
                .map(role -> {
                    System.out.println("Granted Authority: " + role.getName()); // Debug
                    return new SimpleGrantedAuthority(role.getName());
                })
                .collect(Collectors.toList()) 
            : Collections.emptyList();
    }

    /**
     * Retrieves the user's password.
     *
     * @return the hashed password.
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    
    @Override
    public String getUsername() {
        return user.getUsername();
    }

  
    public String getEmail() {
        return user.getEmail();
    }
    
   public String getMobileNo() {
	   return user.getMobileNo();
   }

   
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

   
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

   
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

   
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        UserPrincipal that = (UserPrincipal) obj;
        return Objects.equals(user.getUserId(), that.user.getUserId());
    }

   
    @Override
    public int hashCode() {
        return Objects.hash(user.getUserId());
    }
}
