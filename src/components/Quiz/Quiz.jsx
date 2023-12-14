import { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (el, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        el.target.classList.add("correct");
        setLock(!lock);
        setScore((score) => score + 1);
      } else {
        el.target.classList.add("wrong");
        setLock(!lock);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <div className="result">
            Вы ответили верно на {score} из {data.length} вопросов
          </div>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(el) => {
                checkAns(el, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(el) => {
                checkAns(el, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(el) => {
                checkAns(el, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(el) => {
                checkAns(el, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
