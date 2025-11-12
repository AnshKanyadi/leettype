import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1 className="logo">LeetType</h1>
        <div>
          <Link className="home-btn" to="/login">Login</Link>
          <Link className="home-btn" to="/signup">Sign Up</Link>
        </div>
      </nav>

      <div className="home-content">
        <h2 className="home-title">Level Up Your Coding Speed.</h2>
        <p className="home-sub">Train like you interview — code fast, code smart.</p>

        <div className="home-buttons">
          <Link className="primary-btn" to="/signup">Start Typing</Link>
          <Link className="secondary-btn" to="/leaderboards">Leaderboard</Link>
        </div>

        <p className="credit">
          Built by <a href="https://www.linkedin.com/in/ansh-kanyadi-994838284/"  target="_blank" rel="noreferrer">Ansh Kanyadi</a>
        </p>
      </div>
    </div>
  );
}
