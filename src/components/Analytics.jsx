import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSubscription } from "../context/SubscriptionContext";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./Analytics.css";

export default function Analytics() {
  const { user } = useAuth();
  const { isPro, loading: subLoading } = useSubscription();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    avgWpm: 0,
    avgAccuracy: 0,
    bestWpm: 0,
    totalProblems: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [wpmByDay, setWpmByDay] = useState([]);
  const [problemStats, setProblemStats] = useState([]);

  useEffect(() => {
    if (!user || subLoading) return;

    async function loadAnalytics() {
      try {
        const q = query(
          collection(db, "userScores"),
          where("uid", "==", user.uid),
          orderBy("timestamp", "desc"),
          limit(100)
        );
        const snap = await getDocs(q);
        const scores = snap.docs.map((d) => d.data());
        setHistory(scores);

        if (scores.length > 0) {
          const totalWpm = scores.reduce((sum, s) => sum + s.wpm, 0);
          const totalAcc = scores.reduce((sum, s) => sum + s.accuracy, 0);
          const bestWpm = Math.max(...scores.map((s) => s.wpm));
          const uniqueProblems = new Set(scores.map((s) => s.problemId)).size;

          const streakData = calculateStreak(scores);

          setStats({
            totalTests: scores.length,
            avgWpm: (totalWpm / scores.length).toFixed(1),
            avgAccuracy: (totalAcc / scores.length).toFixed(1),
            bestWpm: bestWpm.toFixed(1),
            totalProblems: uniqueProblems,
            currentStreak: streakData.current,
            longestStreak: streakData.longest,
          });

          const dailyWpm = calculateDailyWpm(scores);
          setWpmByDay(dailyWpm);

          const problemBreakdown = calculateProblemStats(scores);
          setProblemStats(problemBreakdown.slice(0, 10));
        }
      } catch (err) {
        console.error("Error loading analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, [user, subLoading]);

  function calculateStreak(scores) {
    const days = new Set();
    scores.forEach((s) => {
      const date = new Date(s.timestamp).toDateString();
      days.add(date);
    });

    const sortedDays = Array.from(days)
      .map((d) => new Date(d))
      .sort((a, b) => b - a);

    let current = 0;
    let longest = 0;
    let streak = 0;
    const today = new Date().toDateString();

    for (let i = 0; i < sortedDays.length; i++) {
      if (i === 0) {
        const isToday = sortedDays[i].toDateString() === today;
        const isYesterday =
          new Date(Date.now() - 86400000).toDateString() ===
          sortedDays[i].toDateString();
        if (isToday || isYesterday) {
          streak = 1;
        } else {
          break;
        }
      } else {
        const diff =
          (sortedDays[i - 1] - sortedDays[i]) / (1000 * 60 * 60 * 24);
        if (diff <= 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    current = streak;
    longest = Math.max(current, streak);

    return { current, longest };
  }

  function calculateDailyWpm(scores) {
    const dailyMap = {};
    scores.forEach((s) => {
      const date = new Date(s.timestamp).toLocaleDateString();
      if (!dailyMap[date]) {
        dailyMap[date] = { total: 0, count: 0 };
      }
      dailyMap[date].total += s.wpm;
      dailyMap[date].count++;
    });

    return Object.entries(dailyMap)
      .map(([date, data]) => ({
        date,
        avgWpm: (data.total / data.count).toFixed(1),
      }))
      .slice(0, 14)
      .reverse();
  }

  function calculateProblemStats(scores) {
    const problemMap = {};
    scores.forEach((s) => {
      if (!problemMap[s.problemId]) {
        problemMap[s.problemId] = {
          id: s.problemId,
          attempts: 0,
          bestWpm: 0,
          avgWpm: 0,
          totalWpm: 0,
        };
      }
      problemMap[s.problemId].attempts++;
      problemMap[s.problemId].totalWpm += s.wpm;
      problemMap[s.problemId].bestWpm = Math.max(
        problemMap[s.problemId].bestWpm,
        s.wpm
      );
    });

    return Object.values(problemMap)
      .map((p) => ({
        ...p,
        avgWpm: (p.totalWpm / p.attempts).toFixed(1),
      }))
      .sort((a, b) => b.attempts - a.attempts);
  }

  if (subLoading || loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-container">
          <p className="loading">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="analytics-page">
        <nav className="analytics-nav">
          <Link to="/" className="nav-brand">
            <span>⌨️</span>
            <span className="brand-text">LeetType</span>
          </Link>
        </nav>
        <div className="paywall-container">
          <div className="paywall-content">
            <div className="paywall-icon">📊</div>
            <h2>Analytics Dashboard</h2>
            <p>Track your improvement over time with detailed analytics</p>
            <ul className="paywall-features">
              <li>📈 WPM trends over time</li>
              <li>🎯 Accuracy improvements</li>
              <li>🔥 Streak tracking</li>
              <li>📋 Problem-by-problem breakdown</li>
              <li>🏆 Personal records</li>
            </ul>
            <Link to="/pricing" className="upgrade-btn">
              Upgrade to Pro — $7/mo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <nav className="analytics-nav">
        <Link to="/" className="nav-brand">
          <span>⌨️</span>
          <span className="brand-text">LeetType</span>
        </Link>
        <div className="nav-links">
          <Link to="/problems">Problems</Link>
          <Link to="/account">Account</Link>
          <Link to="/leaderboards">Leaderboards</Link>
          <button className="logout-btn" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      </nav>

      <div className="analytics-container">
        <div className="analytics-header">
          <h1>📊 Your Analytics</h1>
          <span className="pro-badge">Pro</span>
        </div>

        <div className="stats-grid">
          <div className="stat-card highlight">
            <span className="stat-value">{stats.bestWpm}</span>
            <span className="stat-label">Best WPM</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.avgWpm}</span>
            <span className="stat-label">Avg WPM</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.avgAccuracy}%</span>
            <span className="stat-label">Avg Accuracy</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.totalTests}</span>
            <span className="stat-label">Total Tests</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.totalProblems}</span>
            <span className="stat-label">Problems Done</span>
          </div>
          <div className="stat-card streak">
            <span className="stat-value">🔥 {stats.currentStreak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>

        <div className="chart-section">
          <h2>WPM Over Time</h2>
          <div className="wpm-chart">
            {wpmByDay.length > 0 ? (
              <div className="chart-bars">
                {wpmByDay.map((day, i) => (
                  <div key={i} className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${(day.avgWpm / 200) * 100}%`,
                      }}
                    >
                      <span className="bar-value">{day.avgWpm}</span>
                    </div>
                    <span className="bar-label">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">Complete more tests to see trends</p>
            )}
          </div>
        </div>

        <div className="problems-section">
          <h2>Top Problems</h2>
          <div className="problems-table">
            {problemStats.length > 0 ? (
              problemStats.map((p, i) => (
                <div key={i} className="problem-row">
                  <span className="problem-name">{p.id}</span>
                  <span className="problem-stat">
                    {p.attempts} attempts
                  </span>
                  <span className="problem-stat best">
                    Best: {p.bestWpm} WPM
                  </span>
                  <span className="problem-stat">
                    Avg: {p.avgWpm} WPM
                  </span>
                </div>
              ))
            ) : (
              <p className="no-data">No problem data yet</p>
            )}
          </div>
        </div>

        <div className="recent-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {history.slice(0, 10).map((h, i) => (
              <div key={i} className="activity-item">
                <div className="activity-left">
                  <span className="activity-problem">{h.problemId}</span>
                  <span className="activity-lang">{h.language?.toUpperCase()}</span>
                </div>
                <div className="activity-right">
                  <span className="activity-wpm">{h.wpm} WPM</span>
                  <span className="activity-acc">{h.accuracy}%</span>
                  <span className="activity-time">
                    {new Date(h.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

