package com.smarthr.smarthr_ai.repository;

import com.smarthr.smarthr_ai.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.attrition = 'Yes'")
    long countByAttritionYes();

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.attrition = 'No'")
    long countByAttritionNo();
}
