import { Link } from "react-router-dom";
import { problems } from "./problemsData";
import "./AllLeaderboards.css";

export default function AllLeaderboards() {
  return (
    <div className="all-leaderboards-page">
      <nav className="navbar">
        <div className="nav-logo">⚙️ LeetType</div>
        <div className="nav-links">
          <a href="/app">Problems</a>
          <a href="/account">Account</a>
          <a href="/leaderboards">Leaderboards</a>
        </div>
      </nav>

      <div className="leaderboards-wrapper">
        <h2>🏆 Problem Leaderboards</h2>
        <p className="subtitle">
          Check who’s topping the charts for each challenge.
        </p>

        <div className="leaderboard-grid">
          {problems.map((p) => (
            <Link key={p.id} to={`/leaderboard/${p.id}`} className="leaderboard-card">
              <div className="card-content">
                <h3>{p.title}</h3>
                <span className={`difficulty-tag ${p.difficulty?.toLowerCase() || "medium"}`}>
                  {p.difficulty || "Medium"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
