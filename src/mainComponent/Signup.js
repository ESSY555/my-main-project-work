
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from 'react';
import { Link } from "react-router-dom";
import app from "../Firebase";
export default  function Signup() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const signUp=() =>{                        

   
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("successefully created an account. you can now log in")
      
        // Redirect to the login page using window.location
        window.location.href = "/SignIn";
      // ...  
    })
    .catch((error) => {
      const errorCode = error.code;
      //const errorMessage = error.message;
      // ..
      alert(errorCode)
    });
}


  return (
     
    <div className="App">
      
    <div class="sign-in">
    <div>
    <label>
    Your Email
    </label>
        <input type={"email"} placeholder='please enter your email' 
        onChange={(e) => setEmail(e.target.value)}/>
    </div>
   
    <div>
    <label>
    Your password
    </label>
    <input type={"password"} placeholder='please enter your password'
    onChange={(e) => setPassword(e.target.value)}/>
    </div>
   <button onClick={signUp}>Create Account</button>
     
<div>
<p className="already-have-acc">
Already have an account?<Link to="/SignIn">Login</Link>
</p>
</div>
    </div> 
 

      </div>
  )
}


