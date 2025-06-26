import React, { axios, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // CSS 파일 import


function Home() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
   window.location.href = "http://localhost:9090/api/kakao/login";
  };

  return (
    <div>
      {/* 상단 바 */}
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>
          Quizly
        </div>
        <nav>
          <button className="nav-button notice" onClick={() => navigate('/notice')}>
            공지사항
          </button>
          <button className="nav-button login" onClick={handleKakaoLogin} >
            로그인
          </button>
        </nav>
      </header>

      {/* 본문 */}
      <main className="main-content">
        <h1>Quizly</h1>
        <h5>Quizly는 컴퓨터 관련 CS지식에 대한 퀴즈로 이루어져 있습니다.</h5>
        <button className="main-button" onClick={() => navigate('/quiz')}>
          퀴즈 풀기
        </button>
        <button className="main-button" onClick={() => navigate('/QuizRank')}>
          랭킹 보기
        </button>
      </main>
    </div>
  );
}

export default Home;
