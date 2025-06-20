package com.quizly.service.impl;

import com.quizly.domain.QuizlyVo;
import com.quizly.mapper.QuizlyMapper;
import com.quizly.service.QuizlyService;
import org.springframework.beans.factory.annotation.Autowired;

public class QuizlyServiceImpl implements QuizlyService {

    @Autowired
    private QuizlyMapper quizlyMapper;

    @Override
    public QuizlyVo findRandomOne() {
        return this.quizlyMapper.findRandomOne();
    }

    @Override
    public int insertUserInfo(QuizlyVo quizlyVo) {
        return this.quizlyMapper.insertUserInfo(quizlyVo);
    }
}
