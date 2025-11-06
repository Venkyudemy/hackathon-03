package com.smartcity.usermanagement.controller;

import com.smartcity.usermanagement.dto.LoginRequest;
import com.smartcity.usermanagement.dto.LoginResponse;
import com.smartcity.usermanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        // Token validation is handled by JwtAuthenticationFilter
        // If we reach here, the token is valid (filter would have rejected invalid tokens)
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }
}

