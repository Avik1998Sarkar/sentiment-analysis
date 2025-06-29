package com.springai.sentiment.controller;

import com.springai.sentiment.entity.Feedback;
import com.springai.sentiment.repository.FeedbackRepository;
import com.springai.sentiment.service.SentimentAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173/")
public class FeedbackController {
    private final FeedbackRepository feedbackRepository;
    private final SentimentAnalysisService sentimentAnalysisService;

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public Feedback saveFeedback(@RequestBody String content) {
        Feedback feedback = sentimentAnalysisService.analyseFeedback(content);
        return feedbackRepository.save(feedback);
    }
}
