package com.GangaprasadAdike.ecommerce.security;

import com.GangaprasadAdike.ecommerce.model.Role;
import com.GangaprasadAdike.ecommerce.model.User;
import com.GangaprasadAdike.ecommerce.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Get role from session (we'll store it there during initiation)
        String roleStr = (String) request.getSession().getAttribute("requested_role");
        Role role = (roleStr != null && roleStr.equalsIgnoreCase("ADMIN")) ? Role.ADMIN : Role.USER;

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(email); // Use email as username for social login
            newUser.setRole(role);
            newUser.setPassword(""); // No password for social login users
            return userRepository.save(newUser);
        });

        String token = jwtUtil.generateToken(user.getUsername());

        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/oauth2-redirect")
                .queryParam("token", token)
                .queryParam("role", user.getRole().name())
                .queryParam("username", user.getUsername())
                .queryParam("userId", user.getId())
                .build().toUriString();

        response.sendRedirect(targetUrl);
    }
}
