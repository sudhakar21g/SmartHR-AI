package com.smarthr.smarthr_ai.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionResponse {
    private Long id;
    private String attritionPrediction;
    private Double confidenceScore;
    private LocalDateTime predictedAt;
}
