import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import { QuestionState, fetchQuizQuestions } from "./API";
// components
import QuestionCard from "./components/QuestionCard";
// types
import { Difficulty } from "./API";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setloading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [number, setnumber] = useState(0);
  const [userAnswers, setuserAnswers] = useState<AnswerObject[]>([]);
  const [score, setscore] = useState(0);
  const [gameOver, setgameOver] = useState(true);
  const [difficulty, setdifficulty] = useState("medium");

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM));

  const startTrivia = async () => {
    setloading(true);
    setgameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty);

    setquestions(newQuestions);
    setscore(0);
    setuserAnswers([]);
    setnumber(0);
    setloading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setscore(prev => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setuserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setgameOver(true);
    } else {
      setnumber(nextQuestion);
    }
  };

  const handleDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    setdifficulty((e.target as HTMLButtonElement).innerText.toLowerCase());
  };

  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-2xl px-6 py-8 ring-1 ring-slate-900/5 shadow-xl min-h-screen text-lg text-slate-800 dark:text-slate-100 text-center font-poppins">
      <div className="max-w-3xl mx-auto">
        <h1 className="my-5 text-4xl font-bold font-dancingScript hover:italic focus:italic focus-visible:italic">
          QUIZ APP
        </h1>

        {gameOver ? (
          <span className="my-5 text-4xl hover:italic focus:italic focus-visible:italic font-bold font-dancingScript">
            Soner Güçlü
          </span>
        ) : null}

        {gameOver ? (
          <p className="hover:italic focus:italic focus-visible:italic my-10">
            Don't pat the question to cheat!
          </p>
        ) : null}

        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
            gameOver={gameOver}
            score={score}
            correctAnswer={questions[number].correct_answer}
            category={questions[number].category}
            difficulty={questions[number].difficulty}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button
            className="bg-rose-700 p-2 px-5 hover:bg-rose-900 focus:bg-rose-900 focus-visible:bg-rose-900 rounded-2xl my-5"
            onClick={nextQuestion}
          >
            Next Question
          </button>
        ) : null}

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <div className="my-5">
            <button
              className="bg-rose-500 p-3 px-5 rounded-l-2xl hover:bg-rose-400 focus:bg-rose-400 focus-visible:bg-rose-400"
              onClick={handleDifficulty}
            >
              Easy
            </button>
            <button
              className="bg-rose-500 p-3 px-5 hover:bg-rose-400 focus:bg-rose-400 focus-visible:bg-rose-400"
              onClick={handleDifficulty}
            >
              Medium
            </button>
            <button
              className="bg-rose-500 p-3 px-5 rounded-r-2xl hover:bg-rose-400 focus:bg-rose-400 focus-visible:bg-rose-400"
              onClick={handleDifficulty}
            >
              Hard
            </button>
          </div>
        ) : null}

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button
            className="bg-rose-500 p-3 px-5 hover:bg-rose-400 focus:bg-rose-400 focus-visible:bg-rose-400 rounded-2xl"
            onClick={startTrivia}
          >
            Start
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
