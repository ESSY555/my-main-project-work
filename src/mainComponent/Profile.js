import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function Profile() {
  const location = useLocation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    setUserName( localStorage.getItem('userName'));
  }, [location.search]);

  return (
    <div className="profile">
    <nav id="nnav-b" class="navbar navbar-expand-lg bg-body-tertiary text-center px-5">
            <div class="nav-con container-fluid text-md-center">
                <div class="odrap-log text-center"><img class="nav-imag" src="images/Odraphiii.png" alt=""/>
                    <h1 id="Odraph" class="footer_hover">Welcome, {userName}!</h1>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        
                    </ul>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><span
                                    class=" nav-home nav-demo">Home</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><span class="nav-demo">About
                                    Us</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><span
                                    class="nav-contact">Help</span></a>
                        </li>

                    </ul>
                    <ul class="navbar-nav me-1 mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><button class="btn btn-dark">Contact
                                    us</button></a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav> 
      


      <div className=' d-flex justify-content-center conter-fluid mt-5 mb-5 fs-5'>
      
   <div className='shadow-lg bg-light text dark px-5 py-5 rounded-5'>
   <h1>How to play the Game</h1>
   <p className=''>Ensure you read this guid from start to finish </p>
   <ul className='browser-defaullt' id="">
   <li>The quiz has a duration of 12 minutes and ends as soon as your time elapses.</li>
   <li>Each Quiz consists of 4 options.</li>
   <li>Each question is worth 5 marks, and the total score achievable is 100 marks.</li>
   <li>Select the options which best answers the questions by clicking(or selecting) it.</li>
   <li>Ensure you submit your work once you are done/through.</li>
   <li className='long-p'>If you are unable to submit before the time runs out, your work will be 
   submitted automatically and your score will be displayed instantly.</li>
   </ul>
   <div className='text-center'>
   <Link to="/Quiz">
   <button className='btn btn-dark text-light mt-5'>Okay, let's do this Quiz</button></Link>
   </div>
   </div>
   </div>
    </div>
  );
}
