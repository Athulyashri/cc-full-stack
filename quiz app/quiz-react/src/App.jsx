import { useState } from 'react';
import './App.css';

function App() {
  // Array of 5 multiple-choice questions
  const questions = [
    {
      questionText: 'What does HTML stand for?',
      options: [
        'Hyper Text Preprocessor',
        'Hyper Text Markup Language',
        'Hyper Text Multiple Language',
        'Hyper Tool Multi Language',
      ],
      answer: 'Hyper Text Markup Language',
    },
    {
      questionText: 'What does CSS stand for?',
      options: [
        'Common Style Sheet',
        'Colorful Style Sheet',
        'Computer Style Sheet',
        'Cascading Style Sheets',
      ],
      answer: 'Cascading Style Sheets',
    },
    {
      questionText: 'Which of the following is a JavaScript framework?',
      options: ['React', 'Laravel', 'Django', 'Flask'],
      answer: 'React',
    },
    {
      questionText: 'How do you create a function in JavaScript?',
      options: [
        'function = myFunction()',
        'function myFunction()',
        'function:myFunction()',
        'create myFunction()',
      ],
      answer: 'function myFunction()',
    },
    {
      questionText: 'Which hook is used to manage state in a React functional component?',
      options: ['useEffect', 'useContext', 'useReducer', 'useState'],
      answer: 'useState',
    },
  ];

  // State to track the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // State to track if the quiz is finished
  const [showScore, setShowScore] = useState(false);
  
  // State to track the user's score
  const [score, setScore] = useState(0);

  // Function to handle when an answer option is clicked
  const handleAnswerOptionClick = (selectedOption) => {
    // Check if the selected option is the correct answer
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Move to the next question or show the score screen if it's the last question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
  };

  return (
    <div className="app-container">
      <div className="quiz-card">
        {/* Conditional rendering based on whether the quiz is finished */}
        {showScore ? (
          <div className="score-section">
            <h2>Quiz Completed!</h2>
            <p className="final-score">
              Your Score: {score} / {questions.length}
            </p>
            <button className="restart-button" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <h1 className="title">Quiz App</h1>
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span> of {questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            
            <div className="answer-section">
              {/* Map through the options array to create a button for each option */}
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswerOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <div className="current-score">
              Current Score: {score}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
