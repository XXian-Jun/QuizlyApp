package com.quizly.mapper;

import com.quizly.domain.QuizlyResultVo;
import com.quizly.domain.QuizlyVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface QuizlyMapper {

    QuizlyVo findRandomOne();
    ArrayList<QuizlyResultVo> findUserRankTop10();
    int insertUserInfo(QuizlyVo quizlyVo);
}
