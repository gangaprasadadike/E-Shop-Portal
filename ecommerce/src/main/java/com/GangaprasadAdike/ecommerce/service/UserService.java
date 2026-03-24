package com.GangaprasadAdike.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.GangaprasadAdike.ecommerce.ExceptionHandler.ResponseStructure;
import com.GangaprasadAdike.ecommerce.dto.UserResponseDTO;
import com.GangaprasadAdike.ecommerce.model.Role;
import com.GangaprasadAdike.ecommerce.model.User;
import com.GangaprasadAdike.ecommerce.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private com.GangaprasadAdike.ecommerce.security.JwtUtil jwtUtil;

    public ResponseStructure<UserResponseDTO> registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        
        if (user.getRole() == null) {
            user.setRole(Role.USER); // default
        }
        

        User savedUser = userRepository.save(user);

        // Convert to DTO
        UserResponseDTO dto = new UserResponseDTO(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole()
        );

        // Wrap response
        ResponseStructure<UserResponseDTO> response = new ResponseStructure<>();
        response.setStatuscode(201);
        response.setMessage("User Registered Successfully");
        response.setData(dto);

        return response;
    }
    
    
    public ResponseStructure<UserResponseDTO> getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserResponseDTO dto = new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );

        ResponseStructure<UserResponseDTO> response = new ResponseStructure<>();
        response.setStatuscode(200);
        response.setMessage("Profile Fetched Successfully");
        response.setData(dto);

        return response;
    }
    
    
    
    public ResponseStructure<UserResponseDTO> updateProfile(Long userId, User updatedUser) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());

        User savedUser = userRepository.save(user);

        UserResponseDTO dto = new UserResponseDTO(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole()
        );

        ResponseStructure<UserResponseDTO> response = new ResponseStructure<>();
        response.setStatuscode(200);
        response.setMessage("Profile Updated Successfully");
        response.setData(dto);

        return response;
    }
    
    
    public ResponseStructure<String> changePassword(Long userId, String newPassword) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatuscode(200);
        response.setMessage("Password Updated Successfully");
        response.setData("Password Changed");

        return response;
    }
    
    
    
    public ResponseStructure<String> loginUser(String username, String password) {

        // Authenticate user
        authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        username, password
                )
        );

        // Generate JWT token
        String token = jwtUtil.generateToken(username);

        // Response
        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatuscode(200);
        response.setMessage("Login Successful");
        response.setData(token);

        return response;
    }
}