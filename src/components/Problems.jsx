import { Link } from "react-router-dom";
import { problems } from "./problemsData";
import "./Problems.css";

export default function Problems() {
  return (
    <div className="problems-container">
      <h2>📚 All Problems</h2>

      <div className="problems-list">
        {problems.map((p) => (
          <div key={p.id} className="problem-card">
            
            {/* ✅ Clicking this opens the typing test */}
            <Link to={`/app/${p.id}`} className="problem-left">
              <span className="problem-title">{p.title}</span>
              <span className="problem-difficulty">
                {p.difficulty || "Medium"}
              </span>
            </Link>

            {/* ✅ Clicking this opens per-problem leaderboard */}
            <Link to={`/leaderboard/${p.id}`} className="leaderboard-btn">
              🏆
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
