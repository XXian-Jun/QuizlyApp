package com.quizly.mapper;

import com.quizly.dto.QuizlyResponseDto;
import com.quizly.dto.QuizlyResultResponseDto;
import com.quizly.domain.QuizlyVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface QuizlyMapper {

    QuizlyResponseDto findRandomOne();
    ArrayList<QuizlyResultResponseDto> findUserRankTop10();
    int insertUserInfo(QuizlyVo quizlyVo);

    int findCompareAnswer(QuizlyVo entity);
}
