import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Quizinstructions = () => {
  
const initialCount=0
const [count, setCount] =useState(initialCount)
  return (
   <frameElement>
   <Helmet><title>Quiz Instrations -Quiz App</title></Helmet>
   <div className='main px-5 py-5 d-flex justify-content-center'>
   <div className='sub'>
   <h1>How to play the Game</h1>
   <p className=''>Ensure you read this guid from start to finish </p>
   <ul className='browser-defaullt' id="main-list">
   <li>The quiz has a duration of 15 minutes and ends as soon as your time elapses.</li>
   <li>Each Quiz consists of 4 options.</li>
   <li>Select the options which best answers the questions by clicking(or selecting) it.</li>
   <li>Ensure you submit your work once you are done/through.</li>
   <li className='long-p'>If you are unable to submit before the time runs out, your work will be 
   submitted automatically and your score will be displayed instantly.</li>
   <li className='long-p'>Note: this section contain only English and has 7 questions only.
   Before you can gain access to different subjects with 40 questions, you will have to register</li>
   <div >
   <div className='my-fle d-flex gap-3 justify-content-between mt-5'>
   <Link to="/"><button className='btn btn-light'>No take me back</button></Link>
   <Link to="/Play"><button className='btn btn-light'>Okay, let's do this</button></Link>
   <Link to="/api"><button className='btn btn-light'>my api</button></Link>
   </div>
   </div>
   </ul>
   <div>
        count: {count}
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>increament</button>
        <button onClick={() => setCount(count + -1)}>decreament</button>

      </div>
   </div>
   
   </div>
  
   </frameElement>
  )
}
//https://questions.aloc.ng/api/v2/q?subject=chemistry&year=2010&type=utme
export default Quizinstructions;
