import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:9090/api/kakao/login";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:9090/api/kakao/login";
  };


  // 백엔드에 로그인된 사용자 정보 요청
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:9090/api/kakao/user/me', {
        withCredentials: true, // 세션 쿠키 포함
      });
      setUser(res.data); // 사용자 정보 저장
      console.log(res.data);
    } catch (err) {
      console.log("로그인 상태 아님");
      setUser(null);
    }
  };

  // 처음 로딩 시 로그인 상태 확인
  useEffect(() => {
    fetchUserInfo();
  }, []);



  return (
    <div>
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>Quizly</div>
        <nav className="nav-buttons">
          <button className="nav-button notice" onClick={() => navigate('/notice')}>공지사항</button>
          {user ? (
            <div className="user-info">
              <span className="nickname">{user.nickname} 님</span>
              <button className="nav-button logout" onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <button className="nav-button login" onClick={handleKakaoLogin}>로그인</button>
          )}
        </nav>
      </header>

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
