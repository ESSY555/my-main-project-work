import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Link } from "react-router-dom";
import appp from "../Firebase";


export default function Signup() {

  const auth = getAuth(appp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password, userName)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Successfully created an account");
        localStorage.setItem('userName', userName); // Save user name in local storage
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  }

  return (
    <div className="main-signup d-flex justify-content-center">
      <div className="sign-up p-5 pb-3">
      <h1 className="text-center">SIGN UP</h1>
        <div className="pb-3">
          <input type="email" className="form-control" placeholder='Please enter your email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="pb-3">
          <input type="password" className="form-control" placeholder='Please enter your password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="pb-3">
          <input type="text" className="form-control" placeholder='Please enter username' required onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="text-center">
        <button className=" btn btn-light mb-3" onClick={signUp}>Create Account</button>
        </div>
        <div>
          <p className="already-have-acc">
            Already have an account? <Link to="/Signin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
