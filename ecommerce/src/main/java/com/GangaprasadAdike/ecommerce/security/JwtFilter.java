package com.GangaprasadAdike.ecommerce.security;


import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        System.out.println("Processing request: " + request.getMethod() + " " + request.getRequestURI());
        System.out.println("Auth Header: " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                System.out.println("Token is valid");

                String username = jwtUtil.extractUsername(token);
                System.out.println("Extracted username: " + username);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    try {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                        System.out.println("Loaded UserDetails for: " + username + " with roles: " + userDetails.getAuthorities());

                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        System.out.println("Authentication set in SecurityContext");
                    } catch (org.springframework.security.core.userdetails.UsernameNotFoundException e) {
                        System.out.println("User from token no longer exists: " + username);
                        // Let the filter chain continue without authentication
                    }
                }
            } else {
                System.out.println("Token validation failed");
            }
        } else {
            System.out.println("No Bearer token found in header");
        }

        filterChain.doFilter(request, response);
    }
}
