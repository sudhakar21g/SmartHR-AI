package com.smarthr.smarthr_ai.controller;

import com.smarthr.smarthr_ai.dto.request.PredictionRequest;
import com.smarthr.smarthr_ai.dto.response.ApiResponse;
import com.smarthr.smarthr_ai.dto.response.PredictionResponse;
import com.smarthr.smarthr_ai.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping("/predict")
    public ResponseEntity<ApiResponse<PredictionResponse>> predict(
            @RequestBody PredictionRequest request,
            @RequestParam(defaultValue = "1") Long userId) {
        PredictionResponse response = predictionService.predict(request, userId);
        return ResponseEntity.ok(ApiResponse.success("Prediction completed", response));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<ApiResponse<List<PredictionResponse>>> getHistory(@PathVariable Long userId) {
        List<PredictionResponse> history = predictionService.getHistory(userId);
        return ResponseEntity.ok(ApiResponse.success(history));
    }
}
