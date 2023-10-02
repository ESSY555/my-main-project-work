import React, { useEffect, useState } from 'react';

function Quiz() {
  const [questionNum, setQuestionNum] = useState(0);
  const [questions, setQuestions] = useState('');
  const [subjects, setSubjects] = useState('');
  const [activeSub, setActiveSub] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [timer, setTimer] = useState(720); // Set the initial timer value in seconds
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({}); // Store answers in state
  const [canMoveNext, setCanMoveNext] = useState(false);
  const [showResult, setShowResult] = useState(false); // State to control result display
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Track whether the quiz has been submitted

  useEffect(() => {
    function getSubjects() {
      var myHeaders = new Headers();
      myHeaders.append('AccessToken', 'ALOC-0673c063480fd1c99847');

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch('https://questions.aloc.com.ng/api/metrics/list-subjects', requestOptions)
        .then(response => response.json())
        .then(result => {
          setSubjects(result.data);
        })
        .catch(error => console.log('error', error));
    }

    getSubjects();
  }, []);

  useEffect(() => {
    // Timer logic
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        clearInterval(interval);
        submitAnswers(); // Automatically submit answers when the timer reaches zero
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer <= 0) {
      submitAnswers();
    }
  }, [timer]);

  function previous() {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
      setCanMoveNext(true); // Allow moving to the next question after going back
    }
  }

  function next() {
    if (questionNum < questions.length - 1) {
      setQuestionNum(questionNum + 1);
      setCanMoveNext(false); // Disable moving to the next question until an option is selected
    }
  }

  function moveQuestion(key) {
    setQuestionNum(key);
    setCanMoveNext(false); // Disable moving to the next question until an option is selected
  }

  function objectToArray(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return [];
    }

    const keys = Object.keys(obj);
    const result = keys.map(key => [key, obj[key]]);

    return result;
  }

  const subjectArray = objectToArray(subjects);

  // Function to handle subject selection
  function makeActiveSub(sub) {
    setSpinner(true);
    setSelectedSubject(sub);

    // Reset the timer to its initial value (720 seconds) when a new subject is selected
    setTimer(720);

    var myHeaders = new Headers();
    myHeaders.append('AccessToken', 'ALOC-0673c063480fd1c99847');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`https://questions.aloc.com.ng/api/v2/q/25?subject=${sub}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setActiveSub(result.subject);
        setQuestions(result.data);
        setSpinner(false);
      })
      .catch(error => console.log('error', error));
  }

  function checkAnswer(key, selectedOption) {
    const currentQuestion = questions[key];
    if (currentQuestion.answer === selectedOption) {
      setScore(prevScore => prevScore + 1);
    }

    // Update answers in state
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [key]: selectedOption,
    }));

    setCanMoveNext(true); // Allow moving to the next question after an option is selected
  }

  function submitAnswers() {
    // Calculate the final score
    const finalScore = Object.values(answers).reduce((acc, cur) => {
      const currentQuestion = questions[acc];
      if (currentQuestion.answer === cur) {
        return acc + 1;
      }
      return acc;
    }, 0);

    // Store answers in local storage
    localStorage.setItem('quizAnswers', JSON.stringify(answers));

    setShowResult(true); // Display the result

    console.log('Answers submitted');
    console.log('Final Score:', finalScore);
    setQuizSubmitted(true); // Set quizSubmitted to true when submitting
  }

  // Calculate minutes and seconds from the timer value
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <>
      <div className="row container-fluid justify-content-center justify-content-around">
        <div className="col-md-4 p-3">
          <h2>Subjects offered</h2>
          <ul>
            {Array.isArray(subjectArray) &&
              subjectArray.map((data, key) => {
                return (
                  <li
                    onClick={() => makeActiveSub(data[1])}
                    key={key}
                    className={
                      activeSub === data[1]
                        ? 'mb-2 p-2 shadow-lg bg-primary text-white'
                        : 'mb-2 p-2 shadow-lg'
                    }
                  >
                    {data[1]}
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="col-md-8">
          <div className="display-6">{selectedSubject}</div>
          <div className="row pt-2 text-center m-auto justify-content-between">
            {Array.isArray(questions) &&
              questions.map((data, key) => {
                return (
                  <div className="shadow-sm g-3 col-2">
                    <div className="text-dark" key={key}>
                      <button
                        onClick={() => {
                          moveQuestion(key);
                        }}
                        className={
                          key !== questionNum
                            ? 'btn btn-outline-danger btn-sm'
                            : 'btn btn-sm btn-success'
                        }
                      >
                        {key + 1}
                      </button>
                    </div>
                  </div>
                );
              })}

            {Array.isArray(questions) &&
              questions.map((data, key) => {
                return (
                  <div key={key} className={key !== questionNum && 'd-none'}>
                    <div className="d-flex justify-content-center text-center">
                      <div className="timer shadow-lg w-25 bg-black text-light rounded-4 px-3 py-3 mt-4 text-center">
                        {/* Display the timer */}
                        {timer > 0 ? (
                          <>
                            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes
                          </>
                        ) : (
                          'Time Up!'
                        )}
                      </div>
                    </div>
                    <div className="shadow-lg p-5 my-5 m-auto rounded-3">
                      <div className="mb-5">Question : {data.question}</div>
                      <ul className="row g-3 justify-content-around">
                        <li
                          onClick={() => {
                            checkAnswer(key, data.option.a);
                          }}
                          className="btn btn-outline-primary p-2"
                        >
                          A: {data.option.a}
                        </li>
                        <li
                          onClick={() => {
                            checkAnswer(key, data.option.b);
                          }}
                          className="btn btn-outline-primary p-2"
                        >
                          B: {data.option.b}
                        </li>
                        <li
                          onClick={() => {
                            checkAnswer(key, data.option.c);
                          }}
                          className="btn btn-outline-primary p-2"
                        >
                          C: {data.option.c}
                        </li>
                        <li
                          onClick={() => {
                            checkAnswer(key, data.option.d);
                          }}
                          className="btn btn-outline-primary p-2"
                        >
                          D: {data.option.d}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            <div className="text-center col-5 m-auto d-flex justify-content-around">
              <button className="btn bg-primary " onClick={previous} disabled={questionNum === 0}>
                Prev
              </button>
              <button className="btn btn-danger" onClick={next} disabled={questionNum === questions.length - 1 || !canMoveNext}>
                Next
              </button>
              {/* Conditionally render the Submit button */}
              {!quizSubmitted ? (
                <button className="btn btn-primary" onClick={submitAnswers}>
                  Submit
                </button>
              ) : (
                <button className="btn btn-primary" disabled>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showResult && (
        <div className="text-center mt-4">
          <h3>Final Score: {score}</h3>
        </div>
      )}
    </>
  );
}

export default Quiz;
