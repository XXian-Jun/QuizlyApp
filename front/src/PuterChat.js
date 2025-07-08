import React, { useState } from "react";

const GptChat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      alert("질문을 입력하세요!");
      return;
    }

    setLoading(true);
    setAnswer("답변을 기다리는 중...");

    try {
      const res = await fetch("http://localhost:9090/api/gpt/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.text(); // 서버에서 String 반환 시
      setAnswer(result);
    } catch (err) {
      setAnswer("에러 발생: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>GPT에게 물어보기</h1>
      <textarea
        rows={4}
        style={{ width: "100%" }}
        placeholder="질문을 입력하세요"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "질문 중..." : "질문하기"}
      </button>
      <h2>답변:</h2>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#f4f4f4",
          padding: 10,
          minHeight: 100,
        }}
      >
        {answer}
      </pre>
    </div>
  );
};

export default GptChat;
