import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizRank.css';
import { useNavigate } from 'react-router-dom'; // 상단에 추가


function QuizRank() {
    const [rankList, setRankList] = useState([]);
    const navigate = useNavigate();

    const getQuizRankList = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/quiz/rank');
            setRankList(response.data);
        } catch (err) {
        }
    };

    useEffect(() => {
        getQuizRankList();
    }, []);

    return (
        <div className="rank-container">
            <h2 className="rank-title">퀴즈 랭킹</h2>
            <ul className="rank-list">
                {rankList.map((element, index) => (
                    <li key={index}>
                        <span>{index + 1}위 - {element.userNm}</span>
                        <span>{element.count}개</span>
                    </li>
                ))}
            </ul>
            <button className="home-button" onClick={() => navigate('/')}>메인으로</button>
        </div>

    );
}

export default QuizRank;
