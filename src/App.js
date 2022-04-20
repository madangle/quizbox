import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [question, setQuestion] = useState(false);
  const [isAnswerShown, setShowAnswer] = useState(false);
  const [isNextButtonShown, setShowNextButton] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      withCredentials: false,
      url: 'https://coddets.com/api/quizbox/index.php'
    })
    .then(res => {
      const question = res.data;
      // console.log(question, question.question_text);
      setQuestion(question);
    });
  }, [])  

  const showAnswer = () => {
    setShowAnswer(true);
    setShowNextButton(true);
    console.log(isAnswerShown);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p className='Question-Text'>{question.question_text}</p>
        <button 
          className='Answer-Button'
          onClick={showAnswer}
        >Answer</button>

        { isAnswerShown ? <p className='Answer-Text'>{question.answer_text}</p> : null}
        
        <button 
          className='Next-Button'
          onClick={setQuestion}
        >Next</button>

      </header>
    </div>
  );
}

export default App;
