package com.smarthr.smarthr_ai.service;

import com.smarthr.smarthr_ai.dto.request.LoginRequest;
import com.smarthr.smarthr_ai.dto.request.RegisterRequest;
import com.smarthr.smarthr_ai.dto.response.AuthResponse;
import com.smarthr.smarthr_ai.entity.User;
import com.smarthr.smarthr_ai.exception.BadRequestException;
import com.smarthr.smarthr_ai.exception.ResourceNotFoundException;
import com.smarthr.smarthr_ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(request.getPhone())
                .role("USER")
                .active(true)
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .token("simple-token-" + user.getId())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new BadRequestException("Invalid password");
        }

        return AuthResponse.builder()
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .token("simple-token-" + user.getId())
                .build();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
