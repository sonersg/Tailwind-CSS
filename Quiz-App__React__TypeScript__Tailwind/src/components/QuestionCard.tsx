import React, { useState } from "react";
// types
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
  gameOver: boolean;
  score: number;
  correctAnswer: string;
  category: string;
  difficulty: string;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
  gameOver,
  score,
  correctAnswer,
  category,
  difficulty,
}: Props) => {
  const [doubleClick, setdoubleClick] = useState(false);
  // double click to cheat
  const handleDoubleClick = () => {
    setdoubleClick(true);
    setTimeout(() => {
      setdoubleClick(false);
    }, 3000);
  };

  const correctChoice = {
    borderColor: "lightgreen",
    color: "lightgreen",
  };
  const wrongChoice = {
    borderColor: "hotpink",
    color: "hotpink",
  };

  // console.log(correctAnswer);
  // console.log(userAnswer?.answer);

  return (
    <div>
      <div className="bg-rose-200 dark:bg-rose-900 flex p-2 justify-between rounded-xl">
        {!gameOver && <p className="score">Score: {score}</p>}
        <p className="number">
          Question: {questionNumber} / {totalQuestions}
        </p>
      </div>

      <p
        dangerouslySetInnerHTML={{ __html: question }}
        className="bg-slate-300 bg- dark:bg-slate-700 flex p-2 justify-between rounded-xl my-5"
        onDoubleClick={handleDoubleClick}
        onTouchMoveCapture={handleDoubleClick}
        // onTouchEnd={handleDoubleClick}
      />

      <div className="mb-3">
        {answers.map(answer => (
          <div key={answer}>
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
              style={
                userAnswer?.answer === answer
                  ? userAnswer?.answer === correctAnswer
                    ? correctChoice
                    : wrongChoice
                  : undefined
              }
              className="dark:bg-slate-600 bg-slate-400 w-full py-1 rounded-xl hover:bg-slate-700 focus:bg-slate-700 focus-visible:bg-slate-700 border-2 border-slate-400 dark:border-slate-600"
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>

      {doubleClick && (
        <div className="d-flex">
          <p className="d-flex__word-wrap">{difficulty}</p>
          <p className="d-flex__margin">{correctAnswer}</p>
          <p className="d-flex__word-wrap">{category}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
