import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Quizly</h1>
      <h5>Quizly는 컴퓨터 관련 CS지식에 대한 퀴즈로 이루어져 있습니다.</h5>
      <button onClick={() => navigate('/quiz')} style={{ margin: '10px', padding: '10px 20px' }}>
        퀴즈 풀기
      </button>
      <button onClick={() => navigate('/QuizRank')} style={{ margin: '10px', padding: '10px 20px' }}>
        랭킹 보기
      </button>
    </div>
  );
}

export default Home;
