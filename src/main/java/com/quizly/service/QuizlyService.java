package com.quizly.service;

import com.quizly.domain.QuizlyResultVo;
import com.quizly.domain.QuizlyVo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

public interface QuizlyService {

    /* 랜덤으로 퀴즈 목록에서 가져옵니다. 중복 제외 */
    QuizlyVo findRandomOne();

    /* 퀴즈 종료후 회원 랭킹을 위한 정보 등록*/
    int insertUserInfo(QuizlyVo quizlyVo);

    /* 퀴즈 종료후 랭킹 리스트 10개 반환*/
    ArrayList<QuizlyResultVo> findUserRankTop10();
}
