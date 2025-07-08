import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  const handleKakaoLogin = () => {
    localStorage.setItem("triedLogin", "true");
    window.location.href = "http://localhost:9090/api/kakao/login";
  };

  const handleLogout = async (accessToken) => {
    axios.get("http://localhost:9090/api/kakao/logout", {
      withCredentials: true // 세션 쿠키 전송 필요 시
    })
      .then(res => {
        localStorage.removeItem("accessToken"); // 클라이언트 토큰 제거
        window.location.href = "/";
        localStorage.removeItem("triedLogin");
      })
      .catch(err => {
        console.error("로그아웃 실패", err);
      });
  };


  // 처음 로딩 시 로그인 상태 확인
  useEffect(() => {
    const triedLogin = localStorage.getItem("triedLogin");
    if (!triedLogin) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:9090/api/kakao/user/me', {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

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
        <button className="main-button" onClick={() => navigate('/quiz', { state: { nickname: user?.nickname ?? null }})}>
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
