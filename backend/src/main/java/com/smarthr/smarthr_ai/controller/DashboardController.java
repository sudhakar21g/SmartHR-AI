package com.smarthr.smarthr_ai.controller;

import com.smarthr.smarthr_ai.dto.response.ApiResponse;
import com.smarthr.smarthr_ai.dto.response.DashboardStats;
import com.smarthr.smarthr_ai.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStats>> getStats() {
        DashboardStats stats = dashboardService.getStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
