package com.quizly.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizlyResponseDto {

    int id;
    String question;
    String hint;
}
