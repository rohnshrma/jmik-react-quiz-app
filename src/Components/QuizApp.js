import React, { useReducer } from "react";
import { questions } from "../data/questions";

const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  showResults: false,
};

const quizReducer = (ps, action) => {
  if (action.type === "SUBMIT_ANSWER") {
    const isCorrect =
      action.payload === questions[ps.currentQuestionIndex].correctAnswer;

    return {
      ...ps,
      score: isCorrect ? ps.score + 1 : ps.score,
      currentQuestionIndex: ps.currentQuestionIndex + 1,
      showResults: ps.currentQuestionIndex + 1 >= questions.length,
    };
  }

  if (action.type === "RESTART") {
    return initialState;
  }

  return initialState;
};

const QuizApp = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  if (state.showResults) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <p>
          Your Score : {state.score} / {questions.length}
        </p>
        <button
          onClick={() => {
            dispatch({ type: "RESTART" });
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[state.currentQuestionIndex];

  const handleAnswerClick = (selectedOption) => {
    dispatch({ type: "SUBMIT_ANSWER", payload: selectedOption });
  };

  return (
    <div className="quiz-container">
      <h2>
        Question {state.currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p>{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option) => {
          return (
            <button
              key={option}
              onClick={() => {
                handleAnswerClick(option);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizApp;
