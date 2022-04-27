import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const API_URL = 'https://coddets.com/api/quizbox/index.php';
  const [question, setQuestion] = useState(false);
  const [isAnswerShown, setShowAnswer] = useState(false);

  useEffect(() => {
    bringQuestion();
  }, [])  

  const showAnswer = () => {
    setShowAnswer(true);
  }
  
  const bringQuestion = () => {
    axios({
      method: 'get',
      withCredentials: false,
      url: API_URL
    })
    .then(res => {
      const question = res.data;
      setShowAnswer(false);
      setQuestion(question);
    });
  }

  return (
    <div className="App">
      <div className="App-header">
        {  !question  ? 
        
          <div className='Loading-Block'>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>

        :

          <div className='Quiz-Block'>
            <h1 className='Question-Text'>{question.question_text}</h1>        
            { !isAnswerShown ? 
              <button 
                className='Answer-Button Primary-Button'
                onClick={showAnswer}
              >Answer</button> 
              : null
            }
            { isAnswerShown ? 
              <>
                <h2 className='Answer-Text'>{question.answer_text}</h2> 
                <button 
                  className='Next-Button Primary-Button'
                  onClick={bringQuestion}
                >Next</button>
              </>
              : null
            }
          </div>

        }
      </div>
    </div>
  );
}

export default App;
