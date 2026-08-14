package com.smarthr.smarthr_ai.service;

import com.smarthr.smarthr_ai.dto.response.DashboardStats;
import com.smarthr.smarthr_ai.repository.EmployeeRepository;
import com.smarthr.smarthr_ai.repository.PredictionHistoryRepository;
import com.smarthr.smarthr_ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final PredictionHistoryRepository predictionRepository;

    public DashboardStats getStats() {
        long totalEmployees = employeeRepository.count();
        long totalUsers = userRepository.count();
        long totalPredictions = predictionRepository.count();
        long attritionCount = employeeRepository.countByAttritionYes();
        double attritionRate = totalEmployees > 0
                ? Math.round((double) attritionCount / totalEmployees * 1000.0) / 10.0
                : 0.0;

        return DashboardStats.builder()
                .totalEmployees(totalEmployees)
                .activeEmployees(totalUsers)
                .attritionCount(attritionCount)
                .totalPredictions(totalPredictions)
                .attritionRate(attritionRate)
                .lastUpdated(LocalDateTime.now())
                .build();
    }
}
