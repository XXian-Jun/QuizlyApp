package com.quizly.controller;

import com.quizly.domain.QuizlyVo;
import com.quizly.service.QuizlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
public class QuizlyController {

    @Autowired
    private QuizlyService QuizlyService;

    @GetMapping
    @RequestMapping("/random-one")
    public QuizlyVo getRandomOne (){
        return this.QuizlyService.findRandomOne();
    }

    @PostMapping
    @RequestMapping("/insert-info")
    public int insertUserInfo(@RequestBody QuizlyVo quizlyVo){
        return this.QuizlyService.insertUserInfo(quizlyVo);
    }



}
