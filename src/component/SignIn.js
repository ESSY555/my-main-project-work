import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import app from "../Firebase";

export default function SignIn() {
  const auth = getAuth(app);
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; // Get the currently signed-in user
      const userName = user.displayName; // Retrieve the user's display name

      // Redirect to the profile page and pass the user's name as a query parameter
      navigate(`/profile?name=${userName}`);
    } catch (error) {
      console.log('Login error: ', error);
      setErrorMessage("User not found."); // Set the error message
    }
  };

  return (

    <div className="main-div d-flex container-flex justify-content-center pt-5 pb-5 ">
      <div className="sign-in p-5 text-light">
        <h1 className="text-center">SIGN IN</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <div>
          <input type="email" className="form-control" placeholder='Please enter your email' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input pt-3">
          <input type="password" className="form-control" placeholder='Please enter your password' onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-check pt-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
        </div>

        <div className="p-3 text-center">
          <button className="btn btn-light" onClick={handleLogin}>Sign in</button>
        </div>

        <div>
          Don't have an account yet? <Link className="text-suc" to="/Signup">Signup</Link>
        </div>
      </div>

    </div>
  );
}
