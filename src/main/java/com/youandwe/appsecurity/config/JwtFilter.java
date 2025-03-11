package com.youandwe.appsecurity.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.youandwe.appsecurity.config.service.JWTService;
import com.youandwe.appsecurity.config.service.MyUserDetailsService;

import java.io.IOException;

/**
 * JWT Filter to handle authentication for each request.
 * Extends {@link OncePerRequestFilter} to ensure a single execution per request.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailsService detailsService;

    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("JwtFilter: Processing request for " + request.getRequestURI());

        // Allow authentication routes to pass through without filtering
        String path = request.getRequestURI();
        if (path.startsWith("/api/auth/login") || path.startsWith("/api/auth/signup")) {
            System.out.println("JwtFilter: Skipping authentication check for " + path);
            filterChain.doFilter(request, response);
            return;
        }

        // Retrieve the Authorization header
        String authHeader = request.getHeader("Authorization");
        System.out.println("JwtFilter: Authorization Header: " + authHeader);

        String token = null;
        String username = null;

        // Extract token and username if Authorization header is present and valid
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtService.extractUserName(token);
            System.out.println("JwtFilter: Extracted Token: " + token);
            System.out.println("JwtFilter: Extracted Username: " + username);
        }

        // Validate token and set authentication details
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            System.out.println("JwtFilter: Username is valid and no authentication exists. Validating token...");

            UserDetails userDetails = detailsService.loadUserByUsername(username);
            if (jwtService.validateToken(token, userDetails)) {
                System.out.println("JwtFilter: Token is valid. Setting authentication context.");

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
             // Log assigned authorities
                System.out.println("JwtFilter: Assigned Authorities - " + userDetails.getAuthorities());
            } else {
                System.out.println("JwtFilter: Token validation failed.");
            }
        } else {
            System.out.println("JwtFilter: No username found or authentication already set.");
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
}
