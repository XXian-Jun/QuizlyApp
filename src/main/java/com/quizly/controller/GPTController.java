package com.quizly.controller;

import com.quizly.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/gpt")
public class GPTController {

    @Autowired
    private final OpenAIService openAIService;

    public GPTController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    @PostMapping("/ask")
    public Mono<String> ask(@RequestBody Map<String, String> body) {
        String question = body.get("question");
        return openAIService.askGPT(question);
    }
}