import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const google = new GoogleAuthProvider();

  const signupEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/problems");
    } catch (err) {
      alert(err.message);
    }
  };

  const signupGoogle = async () => {
    try {
      await signInWithPopup(auth, google);
      navigate("/problems");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-btn">← Back</Link>

      <h2>Sign Up</h2>

      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={signupEmail}>Create Account</button>
      <button onClick={signupGoogle}>Continue with Google</button>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
