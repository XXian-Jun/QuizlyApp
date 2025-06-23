package com.quizly.service.impl;

import com.quizly.domain.QuizlyResultVo;
import com.quizly.domain.QuizlyVo;
import com.quizly.mapper.QuizlyMapper;
import com.quizly.service.QuizlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
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

    @Override
    public ArrayList<QuizlyResultVo> findUserRankTop10() {
        return this.quizlyMapper.findUserRankTop10();
    }
}
