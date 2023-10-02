import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QuestionsDownloaded } from '../questionSent';

function Quiz() {
  const [questionNum, setQuestionNum] = useState(0);
  const [questions, setQuestions] = useState('');
  const [local, setLocalQuestion] = useState(QuestionsDownloaded);


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
    setQuestions('');
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
        // setLocalQuestion(JSON.stringify(result.data));

        setSpinner(false);
      })
      .catch(error => console.log('error', error));
  }
  const [Answers, SetAnswers] = useState([])
  const [reupdate, setReupdate] = useState(0)

  const [Ans_score, SetTotalScore] = useState(0)

  function checkAnswer(key, selectedOption, option_alpha) {
    // console.log(key, option_alpha, selectedOption)
    const currentQuestion = local[key];
    const existingAnswer = Answers.find(answer => answer.key === key);

    if (existingAnswer) {
      // Answer has been previously selected
      if (currentQuestion.answer === option_alpha) {
        // If the new selection is correct, update the answer and increase the score
        existingAnswer.selectedOption = selectedOption;
        existingAnswer.option_alpha = option_alpha;
        existingAnswer.score = 5;
      } else {
        // If the new selection is incorrect, update the answer and set the score to 0
        existingAnswer.selectedOption = selectedOption;
        existingAnswer.option_alpha = option_alpha;
        existingAnswer.score = 0;
      }
    } else {
      // Answer has not been previously selected
      let newAnswer = {
        key: key,
        selectedOption: selectedOption,
        option_alpha: option_alpha,
        score: currentQuestion.answer === option_alpha ? 5 : 0,
      };
      Answers.push(newAnswer);
    }

    setReupdate(Math.random());
  }

  function submitAnswers() {

    function cummulativeScore() {
      let score = 0
      Answers.forEach(item => {
        score += item.score;
      });

      SetTotalScore(score);
    }
    cummulativeScore();
    setShowResult(true); // Display the result
  }
  useEffect(() => {
    console.log(Answers);


  }, [reupdate]);
  // Calculate minutes and seconds from the timer value
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <>
      <div className="row container-fluid justify-content-center justify-content-around">
        <div className="col-md-4 p-3">
          <h2>Subjects offered</h2>
          <div>
            {Array.isArray(subjectArray) &&
              subjectArray.map((data, key) => {
                return (
                  <p
                    onClick={() => makeActiveSub(data[1])}
                    key={key}
                    style={{
                      textTransform: 'capitalize',
                    }}
                    className={
                      selectedSubject === data[1]
                        ? 'mb-2 p-2 shadow-sm bg-primary text-white'
                        : 'mb-2 p-2 shadow-sm'
                    }
                  >
                    {data[1]}
                  </p>
                );
              })}
          </div>
        </div>

        {/* {local} */}
        <div className="col-md-8">
          {/* {JSON.stringify(Answers)} */}
          <div className="d-flex justify-content-between align-items-center text-center">
            <div className="display-6" style={{ textTransform: 'capitalize' }}>{selectedSubject}</div>
            {
              Array.isArray(questions) &&
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
            }

          </div>

          {spinner ? <div className='text-center'>
            <CircularProgress />
          </div> : <>
            <div className="row pt-2 text-center m-auto justify-content-between">
              {Array.isArray(questions) &&
                questions.map((data, key) => {
                  let found = Answers.find(answer => answer.key === key) || false;
                  return (
                    <div className="g-3 col-1 p-1">
                      <div className="text-dark  " key={key}>
                        <button
                          onClick={() => {
                            moveQuestion(key);
                          }}
                          className={
                            found ? 'shadow btn btn-primary text-white' :

                              key !== questionNum
                                ? 'btn shadow btn-outline-danger btn-sm'
                                : 'btn shadow btn-sm btn-success'
                          }
                        >
                          {key + 1}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              {Array.isArray(questions) &&
                questions.map((data, key) => {
                  let exi = Answers.find(answer => answer.key === key) || false;
                  return (
                    <div key={key} className={key !== questionNum && 'd-none'}>
                      <div className="shadow-lg p-5 my-5 m-auto rounded-3">
                        <div className="mb-5">Question {key + 1} : {data.question}</div>
                        <div style={{ textAlign: 'left' }} className="row g-3 w-100 justify-content-around">
                          <div
                            onClick={() => {
                              checkAnswer(key, data.option.a, 'a');
                            }}
                            className=
                            {
                              exi && exi.option_alpha == 'a' ? "btn text-start btn-secondary p-2" : "btn text-start btn-outline-primary p-2"
                            }
                          >
                            <label >  A: {data.option.a}</label>
                          </div>
                          <div
                            onClick={() => {
                              checkAnswer(key, data.option.b, 'b');
                            }}
                            className=
                            {
                              exi && exi.option_alpha == 'b' ? "btn text-start btn-secondary p-2" : "btn text-start btn-outline-primary p-2"
                            }

                          >
                            <label >  B: {data.option.b}</label>
                          </div>

                          <div
                            onClick={() => {
                              checkAnswer(key, data.option.c, 'c');
                            }}
                            className=
                            {
                              exi && exi.option_alpha == 'c' ? "btn text-start btn-secondary p-2" : "btn text-start btn-outline-primary p-2"
                            }

                          >
                            <label >  C: {data.option.c}</label>
                          </div>

                          <div
                            onClick={() => {
                              checkAnswer(key, data.option.d, 'd');
                            }}
                            className=
                            {
                              exi && exi.option_alpha == 'd' ? "btn text-start btn-secondary p-2" : "btn text-start btn-outline-primary p-2"
                            }

                          >
                            <label>  D: {data.option.d}</label>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>}

          {Array.isArray(questions) ?

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
            : !spinner &&
            <div className=' display-4 text-center'>

              Kindly Select A Subject
            </div>

          }
        </div>
      </div>

      {showResult &&
        <div style={{ position: 'fixed', height: '100vh', top: -24, backgroundColor: '#00000090' }} className=" w-100 text-center mt-4">
          <div style={{
            backgroundColor: 'white',
            top: '25%',
            position: 'relative',
          }} className='py-5 w-50 m-auto rounded-5'>
            <p className='display-6'>Congrats for finishing the Quiz</p>
            <p className='display-6'>Here is your Final Score</p>
            <h3 className='display-3' >{Ans_score}</h3>


            <div>
              <button onClick={() => {
                window.location.reload();
                setShowResult(false)
              }} className="btn btn-success">Try Again ?</button>
            </div>
          </div>



        </div>

      }

    </>
  );
}

export default Quiz;
