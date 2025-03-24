package com.youandwe.appsecurity.config;

import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Security configuration class that defines authentication and authorization settings
 * using Spring Security.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private UserDetailsService userDetailsService;

   
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("SecurityConfig: Configuring security filter chain...");

        return http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for stateless authentication
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/signup", "/api/auth/login" , "/api/auth/email-verify/**" ).permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> exception
                    .accessDeniedHandler(customAccessDeniedHandler())
             )
            .httpBasic(httpBasic -> httpBasic.disable())  // Disable basic authentication
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless authentication
            .authenticationProvider(authenticationProvider()) 
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // Add JWT filter
       
            .build();
    }
    
    
    
    
    @Bean
    public AccessDeniedHandler customAccessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
               
            PrintWriter writer = response.getWriter();
            writer.write("{\"error\": \"Access Denied\", \"User\": \"You do not have permission to access this resource.\"}");
            writer.flush();
        };
    }
    
    
    
    
    

   
    @Bean
    public AuthenticationProvider authenticationProvider() {
        System.out.println("SecurityConfig: Initializing authentication provider...");

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        provider.setUserDetailsService(userDetailsService);

        return provider;
    }
    
    
    
    
    
    
    
    
    

 
    @Bean
    public AuthenticationManager authenticationManager() {
        System.out.println("SecurityConfig: Creating authentication manager...");
        return new ProviderManager(authenticationProvider());
    }
    
    
    
    
    
    
    
    

  
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        System.out.println("SecurityConfig: Configuring CORS settings...");
        
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedHeaders("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
                
                System.out.println("SecurityConfig: CORS mappings added.");
            }
        };
    }
}
