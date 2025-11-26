import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { problems, LANGUAGES, getAvailableLanguages } from "./problemsData";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Problems.css";

export default function Problems() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(problems.map((p) => p.category))];
    return cats.sort();
  }, []);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || p.difficulty === difficultyFilter;
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [search, difficultyFilter, categoryFilter]);

  return (
    <div className="problems-page">
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

      <div className="problems-container">
        <h2>📚 All Problems</h2>

        {/* Search and Filters */}
        <div className="search-filters">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search problems..."
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

            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <p className="results-count">
            Showing {filteredProblems.length} of {problems.length} problems
          </p>
        </div>

        <div className="problems-list">
          {filteredProblems.map((p) => {
            const langs = getAvailableLanguages(p);
            return (
              <div key={p.id} className="problem-card">
                <Link to={`/app/${p.id}`} className="problem-left">
                  <span className="problem-title">{p.title}</span>
                  <div className="problem-meta">
                    <span
                      className={`difficulty-badge ${p.difficulty?.toLowerCase()}`}
                    >
                      {p.difficulty || "Medium"}
                    </span>
                    <span className="category-badge">{p.category}</span>
                  </div>
                  <div className="lang-badges">
                    {langs.map((lang) => (
                      <span key={lang.id} className="lang-badge">
                        {lang.icon}
                      </span>
                    ))}
                  </div>
                </Link>

                <Link to={`/leaderboard/${p.id}`} className="leaderboard-btn">
                  🏆
                </Link>
              </div>
            );
          })}

          {filteredProblems.length === 0 && (
            <div className="no-results">
              <p>No problems found matching your filters.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setDifficultyFilter("all");
                  setCategoryFilter("all");
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
