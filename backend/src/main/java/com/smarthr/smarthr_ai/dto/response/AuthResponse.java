package com.smarthr.smarthr_ai.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private Long userId;
    private String fullName;
    private String email;
    private String role;
    private String token;
}
