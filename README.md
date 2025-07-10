# Quizly

## 프로젝트 소개
Quizly는 CS지식의 기초 문제를 풀면서 기본적인 CS지식에 대량 영량을 키우기 위해 만들었으며  
랭킹 시스템을 이용하여 사용자의 경쟁심리를 유도하였습니다.

## 주요 기능
- 퀴즈 문제 랜덤 제공
- 실시간 정답 확인 및 다음 문제 자동 로딩
- 틀렸을 때 랭킹 등록 페이지로 이동
- 랭킹 조회 페이지 제공
- 카카오 로그인 연동
- AI 기반 질문 답변 기능 (Groq LLM API 사용)

## 기술 스택
- Frontend: React, React Router DOM, Axios
- Backend: Spring Boot
- 데이터베이스: MySQL
- Server: Docker (local)

## 외부 API 및 서비스
- 카카오 로그인 API
    - 공식 문서: https://developers.kakao.com
- Groq LLM API (LLaMA 3 70B 모델 사용)
    - API URL: https://api.groq.com

## 시연 동영상
- https://youtu.be/Dn3gUAXUq-8?si=V2wkvtw_9eeSu6Dk
