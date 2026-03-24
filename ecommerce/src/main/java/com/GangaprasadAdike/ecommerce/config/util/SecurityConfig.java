package com.GangaprasadAdike.ecommerce.config.util;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.GangaprasadAdike.ecommerce.security.JwtFilter;
import com.GangaprasadAdike.ecommerce.security.OAuth2SuccessHandler;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults()) // ✅ Enable CORS
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/products/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/products/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/products/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/products/**").hasRole("ADMIN")
                .requestMatchers("/users/**").authenticated() // Profile endpoints
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)) // Need session for OAuth2 flow
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .httpBasic(Customizer.withDefaults())
            .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler)
                .authorizationEndpoint(authorization -> authorization
                    .authorizationRequestResolver(new CustomAuthorizationRequestResolver(
                        this.clientRegistrationRepository()
                    ))
                )
            );

        return http.build();
    }

    @Autowired
    private org.springframework.security.oauth2.client.registration.ClientRegistrationRepository clientRegistrationRepository;

    private org.springframework.security.oauth2.client.registration.ClientRegistrationRepository clientRegistrationRepository() {
        return clientRegistrationRepository;
    }

    // Inner class to resolve and store role in session
    private class CustomAuthorizationRequestResolver implements org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver {
        private final org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver defaultResolver;

        public CustomAuthorizationRequestResolver(org.springframework.security.oauth2.client.registration.ClientRegistrationRepository repo) {
            this.defaultResolver = new org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver(repo, "/oauth2/authorization");
        }

        @Override
        public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
            OAuth2AuthorizationRequest authRequest = defaultResolver.resolve(request);
            if (authRequest != null) {
                String role = request.getParameter("role");
                if (role != null) {
                    request.getSession().setAttribute("requested_role", role);
                }
            }
            return authRequest;
        }

        @Override
        public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
            OAuth2AuthorizationRequest authRequest = defaultResolver.resolve(request, clientRegistrationId);
            if (authRequest != null) {
                String role = request.getParameter("role");
                if (role != null) {
                    request.getSession().setAttribute("requested_role", role);
                }
            }
            return authRequest;
        }
    }


    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Vite default
        configuration.addAllowedOrigin("http://localhost:3000"); // Standard React
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}