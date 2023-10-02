import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './component/Home';
import Quizinstructions from './component/Quicz/Quizinstructions';
import SignIn from './component/SignIn';
import Signup from './component/Signup';
import Profile from './mainComponent/Profile';
import Play from './component/Quicz/Play';
import './styles/Styles.scss';
import Quiz from './component/Quicz/Quiz';
import Api from './component/Quicz/Api';
import Israel from './component/Quicz/Israel'; 

function App() {
    return (
   <BrowserRouter>
   <main>
  <Routes>
  <Route path="/" exact element={<Home />} />
  <Route path="/play/instructions" exact element={<Quizinstructions />} />
  <Route path="/play"  element={<Play/>} />
  <Route path="/SignIn"  element={<SignIn />} />
  <Route path="/Quiz"  element={<Quiz />} />
  <Route path="/Signup"  element={<Signup />} />
  <Route path="/Profile"  element={<Profile />} />
  <Route path="/Api"  element={<Api />} />
  <Route path="/Israel"  element={<Israel />} />
  </Routes>
    </main>
    </BrowserRouter>
 );
}
export default App;