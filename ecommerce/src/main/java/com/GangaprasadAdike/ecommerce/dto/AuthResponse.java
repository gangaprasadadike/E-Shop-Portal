package com.GangaprasadAdike.ecommerce.dto;

import com.GangaprasadAdike.ecommerce.model.Role;

public class AuthResponse {
    private String token;
    private String username;
    private Role role;
    private Long userId;

    public AuthResponse(String token, String username, Role role, Long userId) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.userId = userId;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
