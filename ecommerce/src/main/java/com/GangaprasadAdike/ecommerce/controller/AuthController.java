package com.GangaprasadAdike.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.GangaprasadAdike.ecommerce.ExceptionHandler.ResponseStructure;
import com.GangaprasadAdike.ecommerce.dto.LoginRequest;
import com.GangaprasadAdike.ecommerce.model.User;
import com.GangaprasadAdike.ecommerce.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/auth")
public class AuthController {
	

    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private com.GangaprasadAdike.ecommerce.security.JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<ResponseStructure<?>> registerUser(@RequestBody User user) {

        return ResponseEntity.status(201).body(userService.registerUser(user));
    }
    @Autowired
    private com.GangaprasadAdike.ecommerce.repository.UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        System.out.println("Login attempt for user: " + request.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            com.GangaprasadAdike.ecommerce.model.User user =
                    userRepository.findByUsername(request.getUsername())
                            .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(request.getUsername());

            System.out.println("Authentication successful for: " 
                    + request.getUsername() + " with role: " + user.getRole());

            return ResponseEntity.ok(
                    new com.GangaprasadAdike.ecommerce.dto.AuthResponse(
                            token,
                            user.getUsername(),
                            user.getRole(),
                            user.getId()
                    )
            );

        } catch (Exception e) {
            System.out.println("Authentication failed for: " 
                    + request.getUsername() + " - Error: " + e.getMessage());

            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}