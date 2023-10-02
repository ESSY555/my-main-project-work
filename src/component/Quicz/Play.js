import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFire, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import questions from '../../questions.json';
import isEmpty from "../../utils/is-empty";
import m from 'materialize-css';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      time: {}
    };
    this.interval = null;
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    this.startTimer();
  }

  displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        numberOfQuestions: questions.length,
        answer
      });
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  }

  handleNextButtonClick = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }), () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
      });
    }
  };

  handlePreviousButtonClick = () => {
    if (this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
      });
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case 'next-button':
        this.handleNextButtonClick();
        break;
      case 'previous-button':
        this.handlePreviousButtonClick();
        break;
      case 'quit-button':
        this.handleQuitButtonClick();
        break;
      default:
        break;
    }
  }

  correctAnswer = () => {
    m.toast({
      html: 'Correct Answer!',
      classes: 'toast valid',
      displayLength: 1500
    });
    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
    }), () => {
      this.displayQuestions(
        this.state.questions,
        this.state.currentQuestion,
        this.state.nextQuestion,
        this.state.previousQuestion
      );
    });
  }

  wrongAnswer = () => {
    navigator.vibrate(1000);
    m.toast({
      html: 'Wrong Answer!',
      classes: 'toast invalid',
      displayLength: 1500
    });
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
    }), () => {
      this.displayQuestions(
        this.state.questions,
        this.state.currentQuestion,
        this.state.nextQuestion,
        this.state.previousQuestion
      );
    });
  }

  startTimer = () => {
    const countDownTime = Date.now() + 30000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
    }, 1000);
  }

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestions,
      time
    } = this.state;

    return (
      <Fragment>
        <Helmet><title>Quiz page</title></Helmet>

        <div className="questions container-fluid">
          <h2>QUIZ MODE</h2>
          <div className="lifeline-container">
            <p>
              <FontAwesomeIcon className="lifeline-icon" icon={faLightbulb} /><span className="lifeline">2</span>
            </p>
            <p>
              <FontAwesomeIcon className="lifeline-icon" icon={faFire} /><span className="lifeline">5</span>
            </p>
          </div>
          <div>
            <p>
              <span className="left" style={{ float: 'left' }}>{currentQuestionIndex + 0} of {numberOfQuestions}</span>
              <span className="right" style={{ float: 'right' }}>{time.minutes}:{time.seconds}</span>
              <FontAwesomeIcon className="lifeline-icon" icon={faClock} />
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option"><span style={{ marginRight: '20px' }}>A</span>{currentQuestion.optionA}</p>
            <p onClick={this.handleOptionClick} className="option"><span style={{ marginRight: '20px' }}>B</span>{currentQuestion.optionB}</p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option"><span style={{ marginRight: '20px' }}>C</span>{currentQuestion.optionC} </p>
            <p onClick={this.handleOptionClick} className="option"><span style={{ marginRight: '20px' }}>D</span>{currentQuestion.optionD}</p>
          </div>
          <div className="button-container">
            <button id="previous-button" onClick={this.handleButtonClick}>Previous</button>
            <button id="next-button" onClick={this.handleButtonClick}>Next</button>
            <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Play;
