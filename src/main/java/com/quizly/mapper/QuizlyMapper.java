package com.quizly.mapper;

import com.quizly.domain.QuizlyVo;

public interface QuizlyMapper {

    QuizlyVo findRandomOne();

    int insertUserInfo(QuizlyVo quizlyVo);
}
