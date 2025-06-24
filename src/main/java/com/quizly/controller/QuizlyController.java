package com.quizly.controller;

import com.quizly.dto.QuizlyResponseDto;
import com.quizly.dto.QuizlyResultResponseDto;
import com.quizly.domain.QuizlyVo;
import com.quizly.service.QuizlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/api/quiz")
public class QuizlyController {

    @Autowired
    private QuizlyService QuizlyService;

    @GetMapping("/random")
    public QuizlyResponseDto getRandomOne (){
        return this.QuizlyService.findRandomOne();
    }

    @GetMapping("/rank")
    public ArrayList<QuizlyResultResponseDto> getUserRank (){
        return this.QuizlyService.findUserRankTop10();
    }

    @PostMapping("/compareAnswer")
    public int getAnswerCompare(@RequestBody QuizlyVo entity){
        return this.QuizlyService.findCompareAnswer(entity);
    }


    @PostMapping("/insert-info")
    public int insertUserInfo(@RequestBody ArrayList<QuizlyVo> list){
        int result = 0;
        for (QuizlyVo entity: list) {
            result += this.QuizlyService.insertUserInfo(entity);
        }
        return result;
    }
}
