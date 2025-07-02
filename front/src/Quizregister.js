import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Quizregister.css';
import { useLocation, useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [userInforArray, setUserInforArray] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { quizId, userAnswer, score, correct, userName } = location.state || {};
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        if (userName) {
            setNickname(userName);
        }
    }, [userName]);


    const handleSubmit = async () => {
        if (nickname === "") {
            alert("닉네임을 입력해주세요");
            return false;
        }
        const newArray = correct.map((item) => ({
            id: item.id,
            userNm: nickname,
        }));

        const enrichedArray = newArray.map(userInfo => {
            return {
                id: userInfo.id,
                userNm: userInfo.userNm
            };
        });

        const response = await axios.post('http://localhost:9090/api/quiz/insert-info', enrichedArray);

        // 등록 후 결과 페이지나 홈으로 이동
        navigate('/', {});
    };

    return (
        <div className="register-container">
            <h2 className="register-title">닉네임을 입력하고 랭킹에 등록하세요</h2>
            <h3 className="register-score">총 맞춘 개수: {score}개</h3>
            {userName === "" && (
                <><input
                    className="register-input"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임 입력" /><br />
                </>
            )}
            <button className="register-button" onClick={handleSubmit}>
                등록
            </button>
        </div>
    );
}

export default RegisterPage;
