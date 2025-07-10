// Quiz.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';
import GptChat from './PuterChat';  // GptChat 컴포넌트 import
import './Quiz.css';

ReactModal.setAppElement('#root');

function Quiz() {
  const location = useLocation();
  const nickname = location.state?.nickname ?? '';

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState('');
  const [pass, setPass] = useState(null);
  const [count, setCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchQuiz = async () => {
    setPass(null);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:9090/api/quiz/random');
      setQuiz(response.data);
    } catch (err) {
      setError('퀴즈를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const postAnswer = async (id, answer) => {
    try {
      const response = await axios.post('http://localhost:9090/api/quiz/compareAnswer', {
        id,
        answer,
      });

      const result = response.data;
      setPass(result);

      if (result > 0) {
        setCorrectAnswers(prev => [...prev, { id: quiz.id }]);
        setCount(count + 1);
        setTimeout(() => {
          fetchQuiz();
          setAnswer('');
        }, 500);
      } else {
        if (count === 0) {
          alert("조금더 공부를 한후 도전해주세요");
          navigate('/');
        } else {
          navigate('/Quizregister', {
            state: {
              quizId: id,
              userAnswer: answer,
              userName: nickname,
              score: count,
              correct: correctAnswers,
            },
          });
        }
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleAnswer = () => {
    if (quiz) {
      postAnswer(quiz.id, answer);
    }
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>퀴즈가 없습니다.</p>;

  return (
    <div className="quiz-container">
      <h3 className="quiz-question">{quiz.question}</h3>
      <h5 className="quiz-hint">{quiz.hint}</h5>
      <input
        className="quiz-input"
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAnswer();
        }}
      />
      <br />
      <button className="quiz-button" onClick={handleAnswer}>제출</button> &nbsp;
      <button className="quiz-button" onClick={() => setShowModal(true)}>
        ai-질문
      </button>

      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          content: {
            width: '90%',
            maxWidth: '720px',
            height: '80%',
            margin: 'auto',
            borderRadius: '16px',
            padding: '0',
            border: 'none',
            overflow: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
      >
        <GptChat onClose={() => setShowModal(false)} />
      </ReactModal>
    </div>
  );
}

export default Quiz;
