import { useAuth } from "../context/AuthContext";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { LANGUAGES } from "./problemsData";
import "./Account.css";

export default function Account() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("javascript");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({ totalTests: 0, avgWpm: 0, avgAccuracy: 0 });

  useEffect(() => {
    async function loadData() {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username || "");
          setPreferredLanguage(data.preferredLanguage || "javascript");
        }

        const q = query(
          collection(db, "userScores"),
          where("uid", "==", user.uid),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const snap = await getDocs(q);
        const scores = snap.docs.map(d => d.data());
        setHistory(scores);

        if (scores.length > 0) {
          const totalWpm = scores.reduce((sum, s) => sum + s.wpm, 0);
          const totalAcc = scores.reduce((sum, s) => sum + s.accuracy, 0);
          setStats({
            totalTests: scores.length,
            avgWpm: (totalWpm / scores.length).toFixed(1),
            avgAccuracy: (totalAcc / scores.length).toFixed(1)
          });
        }
      } catch (err) {
        console.error("Error loading account data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user.uid]);

  async function savePreferences() {
    setSaving(true);
    setMessage("");
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username.trim(),
        preferredLanguage,
        updatedAt: Date.now()
      }, { merge: true });

      localStorage.setItem("leettype-language", preferredLanguage);
      setMessage("Preferences saved!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error saving preferences:", err);
      setMessage("Error saving preferences");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <nav className="navbar">
        <div className="nav-logo">⚙️ LeetType</div>
        <div className="nav-links">
          <a href="/problems">Problems</a>
          <a href="/account">Account</a>
          <a href="/leaderboards">Leaderboards</a>
          <button className="logout-btn" onClick={() => signOut(auth)}>Logout</button>
        </div>
      </nav>

      <div className="account-container">
        <h2>👤 Account Settings</h2>

        <div className="profile-section">
          <div className="avatar">
            {(username || user.email)[0].toUpperCase()}
          </div>
          <div className="profile-info">
            <p className="email">{user.email}</p>
            {username && <p className="username-display">@{username}</p>}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.totalTests}</span>
            <span className="stat-label">Tests Taken</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.avgWpm}</span>
            <span className="stat-label">Avg WPM</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.avgAccuracy}%</span>
            <span className="stat-label">Avg Accuracy</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>

          <div className="form-group">
            <label>Username (optional)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a display name"
              maxLength={20}
            />
            <span className="hint">Shown on leaderboards instead of email</span>
          </div>

          <div className="form-group">
            <label>Preferred Language</label>
            <div className="language-options">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  className={`lang-option ${preferredLanguage === lang.id ? "active" : ""}`}
                  onClick={() => setPreferredLanguage(lang.id)}
                >
                  <span className="lang-icon">{lang.icon}</span>
                  <span className="lang-name">{lang.name}</span>
                </button>
              ))}
            </div>
            <span className="hint">Auto-selected when starting a problem</span>
          </div>

          <button className="save-btn" onClick={savePreferences} disabled={saving}>
            {saving ? "Saving..." : "Save Preferences"}
          </button>

          {message && <p className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</p>}
        </div>

        <div className="history-section">
          <h3>Recent Activity</h3>
          {history.length === 0 ? (
            <p className="no-history">No tests completed yet. Start practicing!</p>
          ) : (
            <div className="history-list">
              {history.map((r, i) => (
                <div key={i} className="history-item">
                  <div className="history-problem">
                    <span className="problem-name">{r.problemId}</span>
                    {r.language && <span className="history-lang">{r.language.toUpperCase()}</span>}
                  </div>
                  <div className="history-stats">
                    <span className="wpm">{r.wpm} WPM</span>
                    <span className="accuracy">{r.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
