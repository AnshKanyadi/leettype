import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const google = new GoogleAuthProvider();

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/problems");
    } catch (err) {
      alert(err.message);
    }
  };

  const loginGoogle = async () => {
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

      <h2>Login</h2>

      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={loginEmail}>Login</button>
      <button onClick={loginGoogle}>Sign in with Google</button>

      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}
