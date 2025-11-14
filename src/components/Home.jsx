import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <div className="animated-bg" />

      <nav className="home-nav">
        <h1 className="logo fade-in">LeetType</h1>
        <div>
          <Link className="home-btn fade-in" to="/login">Login</Link>
          <Link className="home-btn fade-in" to="/signup">Sign Up</Link>
        </div>
      </nav>

      <div className="home-content">
        <h2 className="home-title slide-up">Level Up Your Coding Speed.</h2>
        <p className="home-sub float-text">
          Train like you interview — code fast, code smart.
        </p>

        <div className="home-buttons fade-in-delayed">
          <Link className="primary-btn" to="/signup">Start Typing</Link>
          <Link className="secondary-btn" to="/leaderboards">Leaderboard</Link>
        </div>

        <p className="credit fade-in-delayed">
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/ansh-kanyadi-994838284/"
            target="_blank"
            rel="noreferrer"
          >
            Ansh Kanyadi
          </a>
        </p>
      </div>
    </div>
  );
}
