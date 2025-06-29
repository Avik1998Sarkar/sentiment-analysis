package com.springai.sentiment.service;

import com.springai.sentiment.entity.Feedback;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class SentimentAnalysisService {

    private final ChatClient chatClient;

    public SentimentAnalysisService(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    public Feedback analyseFeedback(String content) {
        String prompt = String.format("""
            Analyze the sentiment of the following text and respond with only one word: POSITIVE, NEUTRAL, or NEGATIVE.
            Also provide a sentiment score between -1 and 1 where:
            -1 is most negative
            0 is neutral
            1 is most positive
            
            Format the response as: SENTIMENT_TYPE|SCORE
            
            Text to analyze: %s
            """, content);
        String response = chatClient
                .prompt(prompt)
                .call()
                .content();
        System.out.println("Chat response: " + response);
        String[] parts = response.split("\\|");
        Feedback feedback = new Feedback();
        feedback.setContent(content);
        feedback.setSentiment(Feedback.SentimentType.valueOf(parts[0].trim().toUpperCase()));
        feedback.setSentimentScore(Double.parseDouble(parts[1].trim()));
        return feedback;
    }
}
