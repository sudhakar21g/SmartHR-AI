package com.smarthr.smarthr_ai.repository;

import com.smarthr.smarthr_ai.entity.PredictionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PredictionHistoryRepository extends JpaRepository<PredictionHistory, Long> {
    List<PredictionHistory> findByUserIdOrderByPredictedAtDesc(Long userId);
}
