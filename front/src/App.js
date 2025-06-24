// App.js (혹은 main.jsx 등)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './Quiz';
import RegisterPage from './Quizregister';
import Home from './Home';
import QuizRank from './QuizRank';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/Quizregister" element={<RegisterPage />} />
        <Route path="/QuizRank" element={<QuizRank />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
