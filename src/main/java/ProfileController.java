package com.shopsphere.controller;

import com.shopsphere.entity.User;
import com.shopsphere.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final UserRepository repository;

    public ProfileController(UserRepository repository) {
        this.repository = repository;
    }

    // Display profile
    @GetMapping("/{id}")
    public User getProfile(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("User not found"));
    }

    // Update account settings
    @PutMapping("/{id}")
    public User updateProfile(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user = repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        user.setAddress(updatedUser.getAddress());

        return repository.save(user);
    }
}