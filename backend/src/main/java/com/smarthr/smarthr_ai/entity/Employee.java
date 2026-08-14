package com.smarthr.smarthr_ai.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer age;

    private String attrition;

    private String businessTravel;

    private Double dailyRate;

    private String department;

    private Integer distanceFromHome;

    private Integer education;

    private String educationField;

    private String environmentSatisfaction;

    private String gender;

    private Integer hourlyRate;

    private String jobInvolvement;

    private String jobLevel;

    private String jobRole;

    private String jobSatisfaction;

    private String maritalStatus;

    private Double monthlyIncome;

    private Double monthlyRate;

    private Integer numCompaniesWorked;

    private String overtime;

    private Integer percentSalaryHike;

    private String performanceRating;

    private String relationshipSatisfaction;

    private Integer stockOptionLevel;

    private Integer totalWorkingYears;

    private Integer trainingTimesLastYear;

    private String workLifeBalance;

    private Integer yearsAtCompany;

    private Integer yearsInCurrentRole;

    private Integer yearsSinceLastPromotion;

    private Integer yearsWithCurrManager;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
