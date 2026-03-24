package com.GangaprasadAdike.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.GangaprasadAdike.ecommerce.ExceptionHandler.ResponseStructure;
import com.GangaprasadAdike.ecommerce.model.User;
import com.GangaprasadAdike.ecommerce.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET PROFILE
    @GetMapping("/profile/{id}")
    public ResponseEntity<ResponseStructure<?>> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getProfile(id));
    }

    // UPDATE PROFILE
    @PutMapping("/profile/{id}")
    public ResponseEntity<ResponseStructure<?>> updateProfile(
            @PathVariable Long id,
            @RequestBody User user) {

        return ResponseEntity.ok(userService.updateProfile(id, user));
    }

    // CHANGE PASSWORD
    @PutMapping("/change-password/{id}")
    public ResponseEntity<ResponseStructure<?>> changePassword(
            @PathVariable Long id,
            @RequestParam String password) {

        return ResponseEntity.ok(userService.changePassword(id, password));
    }
}
