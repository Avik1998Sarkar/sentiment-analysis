package com.springai.sentiment.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private Double sentimentScore;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private SentimentType sentiment;

    public enum SentimentType {
        POSITIVE, NEGATIVE, NEUTRAL
    }
}
