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

    /**
     * Constructs a {@code UserPrincipal} with an {@code AppUsers} entity.
     *
     * @param user the user entity containing authentication details.
     */
    public UserPrincipal(AppUsers user) {
        this.user = user;
    }

    /**
     * Retrieves the roles assigned to the user as granted authorities.
     *
     * @return a collection of {@link GrantedAuthority} representing user roles.
     */
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

    /**
     * Retrieves the username (or identifier) of the user.
     *
     * @return the username.
     */
    @Override
    public String getUsername() {
        return user.getUsername();
    }

    /**
     * Retrieves the user's email.
     *
     * @return the email address.
     */
    public String getEmail() {
        return user.getEmail();
    }

    /**
     * Indicates whether the user's account is expired.
     * 
     * @return {@code true} if the account is not expired, {@code false} otherwise.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is locked.
     * 
     * @return {@code true} if the account is not locked, {@code false} otherwise.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) are expired.
     * 
     * @return {@code true} if the credentials are valid, {@code false} otherwise.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled.
     * 
     * @return {@code true} if the user is enabled, {@code false} otherwise.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * Checks if two {@code UserPrincipal} objects are equal based on their user ID.
     *
     * @param obj the object to compare.
     * @return {@code true} if both objects represent the same user, {@code false} otherwise.
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        UserPrincipal that = (UserPrincipal) obj;
        return Objects.equals(user.getUserId(), that.user.getUserId());
    }

    /**
     * Generates a hash code based on the user's ID.
     *
     * @return the hash code.
     */
    @Override
    public int hashCode() {
        return Objects.hash(user.getUserId());
    }
}
