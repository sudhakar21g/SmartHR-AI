package com.smarthr.smarthr_ai.dto.request;

import lombok.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionRequest {

    private Integer age;

    @NotBlank(message = "Department is required")
    private String department;

    private String jobRole;

    private Double monthlyIncome;

    private String overtime;

    private Integer totalWorkingYears;

    private String businessTravel;

    private Integer distanceFromHome;

    private Integer education;

    private String educationField;

    private String gender;

    private String jobLevel;

    private String jobSatisfaction;

    private String maritalStatus;

    private Integer numCompaniesWorked;

    private Integer stockOptionLevel;

    private Integer yearsAtCompany;

    private Integer yearsInCurrentRole;

    private Integer yearsSinceLastPromotion;

    private Integer yearsWithCurrManager;

    private String performanceRating;

    private String environmentSatisfaction;

    private String workLifeBalance;

    private String jobInvolvement;
}
