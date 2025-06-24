package com.quizly.domain;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizlyVo {

    int id;
    String question;
    String hint;
    String userNm;
    String answer;


}
