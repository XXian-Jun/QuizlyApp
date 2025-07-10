// PuterChat.js
import React, { useState } from "react";
import CopyableAnswer from './CopyableAnswer'; 

const GptChat = ({ onClose = () => {} }) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.text();
      setAnswer(result);
    } catch (err) {
      setAnswer("에러 발생: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, position: "relative" }}>
      {/* 우측 상단 닫기 버튼 */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
          color: "#999",
          lineHeight: 1,
        }}
        aria-label="닫기"
        title="닫기"
      >
        ×
      </button>

      <h2>💬 GPT에게 물어보기</h2>
      <textarea
        rows={4}
        style={{ width: "100%", padding: 10, fontSize: 16 }}
        placeholder="질문을 입력하세요"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            display: "inline-block",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "질문 중..." : "질문하기"}
        </button>
      </div>
      <CopyableAnswer text={answer} />
    </div>
  );
};

export default GptChat;
