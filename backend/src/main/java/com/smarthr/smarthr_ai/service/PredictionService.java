package com.smarthr.smarthr_ai.service;

import com.smarthr.smarthr_ai.dto.request.PredictionRequest;
import com.smarthr.smarthr_ai.dto.response.PredictionResponse;
import com.smarthr.smarthr_ai.entity.PredictionHistory;
import com.smarthr.smarthr_ai.entity.User;
import com.smarthr.smarthr_ai.exception.ResourceNotFoundException;
import com.smarthr.smarthr_ai.repository.PredictionHistoryRepository;
import com.smarthr.smarthr_ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final PredictionHistoryRepository predictionRepository;
    private final UserRepository userRepository;

    public PredictionResponse predict(PredictionRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String prediction = simulatePrediction(request);
        double confidence = 0.6 + Math.random() * 0.35;

        PredictionHistory history = PredictionHistory.builder()
                .user(user)
                .age(request.getAge())
                .department(request.getDepartment())
                .jobRole(request.getJobRole())
                .monthlyIncome(request.getMonthlyIncome())
                .overtime(request.getOvertime())
                .totalWorkingYears(request.getTotalWorkingYears())
                .attritionPrediction(prediction)
                .confidenceScore(Math.round(confidence * 100.0) / 100.0)
                .build();

        predictionRepository.save(history);

        return PredictionResponse.builder()
                .id(history.getId())
                .attritionPrediction(prediction)
                .confidenceScore(history.getConfidenceScore())
                .predictedAt(history.getPredictedAt())
                .build();
    }

    public List<PredictionResponse> getHistory(Long userId) {
        return predictionRepository.findByUserIdOrderByPredictedAtDesc(userId)
                .stream()
                .map(p -> PredictionResponse.builder()
                        .id(p.getId())
                        .attritionPrediction(p.getAttritionPrediction())
                        .confidenceScore(p.getConfidenceScore())
                        .predictedAt(p.getPredictedAt())
                        .build())
                .collect(Collectors.toList());
    }

    private String simulatePrediction(PredictionRequest request) {
        int riskScore = 0;

        if ("Yes".equals(request.getOvertime())) riskScore += 3;
        if (request.getAge() != null && request.getAge() < 30) riskScore += 2;
        if (request.getMonthlyIncome() != null && request.getMonthlyIncome() < 5000) riskScore += 2;
        if (request.getTotalWorkingYears() != null && request.getTotalWorkingYears() < 3) riskScore += 1;
        if (request.getDistanceFromHome() != null && request.getDistanceFromHome() > 15) riskScore += 2;
        if (request.getYearsAtCompany() != null && request.getYearsAtCompany() < 2) riskScore += 1;

        if ("Low".equals(request.getJobSatisfaction())) riskScore += 2;
        else if ("Very High".equals(request.getJobSatisfaction())) riskScore -= 1;

        if ("Low".equals(request.getEnvironmentSatisfaction())) riskScore += 2;
        else if ("Very High".equals(request.getEnvironmentSatisfaction())) riskScore -= 1;

        if ("Bad".equals(request.getWorkLifeBalance())) riskScore += 2;
        else if ("Better".equals(request.getWorkLifeBalance()) || "Best".equals(request.getWorkLifeBalance())) riskScore -= 1;

        if ("Single".equals(request.getMaritalStatus())) riskScore += 1;

        if ("Male".equals(request.getGender())) riskScore += 0;

        riskScore = Math.max(0, riskScore);

        return riskScore >= 5 ? "Yes" : "No";
    }
}
