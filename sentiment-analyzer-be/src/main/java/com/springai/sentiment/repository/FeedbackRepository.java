package com.springai.sentiment.repository;

import com.springai.sentiment.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository  extends JpaRepository<Feedback, Long> {
}
