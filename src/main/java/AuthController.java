package com.shopsphere.controller;

import com.shopsphere.entity.User;
import com.shopsphere.repository.UserRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {
	
	private final UserRepository repository;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public AuthController(UserRepository repository) {
        this.repository = repository;
    }

    // Registration
    @PostMapping("/register")
    public Map<String, Object> register(
            @RequestBody User user) {

        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(
                encoder.encode(user.getPassword()));

        User saved = repository.save(user);

        return userResponse(saved);
    }

    // Login
    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, String> data) {

        User user = repository.findByEmail(data.get("email"))
                .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

        if (!encoder.matches(
                data.get("password"), user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        return userResponse(user);
    }

    private Map<String, Object> userResponse(User user) {
        Map<String, Object> response = new HashMap<>();

        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        response.put("address", user.getAddress());

        return response;
    }
	

}
