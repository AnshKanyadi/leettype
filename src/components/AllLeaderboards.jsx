import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { problems } from "./problemsData";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./AllLeaderboards.css";

export default function AllLeaderboards() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const categories = useMemo(() => {
    const cats = [...new Set(problems.map((p) => p.category))];
    return cats.sort();
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || p.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficultyFilter]);

  return (
    <div className="all-leaderboards-page">
      <nav className="navbar">
        <div className="nav-logo">⚙️ {user?.email || "LeetType"}</div>
        <div className="nav-links">
          <a href="/problems">Problems</a>
          <a href="/account">Account</a>
          <a href="/leaderboards">Leaderboards</a>
          {user && (
            <button className="logout-btn" onClick={() => signOut(auth)}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <div className="leaderboards-wrapper">
        <h2>🏆 Problem Leaderboards</h2>
        <p className="subtitle">
          Check who's topping the charts for each challenge.
        </p>

        <div className="search-filters">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search leaderboards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-row">
            <select
              className="filter-select"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <p className="results-count">
            Showing {filteredProblems.length} leaderboards
          </p>
        </div>

        <div className="leaderboard-grid">
          {filteredProblems.map((p) => (
            <Link
              key={p.id}
              to={`/leaderboard/${p.id}`}
              className="leaderboard-card"
            >
              <div className="card-content">
                <h3>{p.title}</h3>
                <span
                  className={`difficulty-tag ${p.difficulty?.toLowerCase() || "medium"}`}
                >
                  {p.difficulty || "Medium"}
                </span>
                <span className="category-text">{p.category}</span>
              </div>
            </Link>
          ))}

          {filteredProblems.length === 0 && (
            <div className="no-results">
              <p>No leaderboards found.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setDifficultyFilter("all");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
