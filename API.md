# Quizly - API

## 1. 랜덤 퀴즈 조회
- URL: `/api/quiz/random`
- Method: GET
- 설명: 랜덤 퀴즈 하나를 반환합니다.
- 응답 예시:
```json
{
    "id": 11,
    "question": "컴퓨터 과학에서 알고리즘의 시간 복잡도를 나타내는 표기법은?",
    "hint": "Big O Notation이라고 부른다."
}
```

## 2. 퀴즈 랭킹 반환
- URL: `/api/quiz/rank`
- Method: GET
- 설명: 상위 10명으 랭킹을 반환합니다.
- 응답 예시:
```json
[
    {
        "userNm": "xion",
        "count": 1
    },
    {
        "userNm": "via",
        "count": 1
    }
]
```

## 3. 퀴즈 정답 여부 확인
- URL: `/api/quiz/compareAnswer`
- Method: POST
- 설명: 답변과 문제 아이디를 보내어 비교합니다.
- 요청 바디 예시:
```json
{
    "id": 24,
    "answer": "포인터"
}
```

## 4. 퀴즈 정답 후 랭킹 등록
- URL: `/api/quiz/insert-info`
- Method: POST
- 설명: 풀었던 문제의 키, 닉네임을 저장합니다.
- 요청 바디 예시:
```json
[
  {
    "id": 24,
    "userNm": "xions"
  },
  {
    "id": 6,
    "userNm": "xions"
  },
  {
    "id": 48,
    "userNm": "xions"
}
]
```



