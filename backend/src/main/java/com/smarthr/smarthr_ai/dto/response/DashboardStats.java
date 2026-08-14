package com.smarthr.smarthr_ai.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStats {
    private long totalEmployees;
    private long activeEmployees;
    private long attritionCount;
    private long totalPredictions;
    private double attritionRate;
    private LocalDateTime lastUpdated;
}
