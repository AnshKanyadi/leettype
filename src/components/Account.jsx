import { useAuth } from "../context/AuthContext";
import { useSubscription } from "../context/SubscriptionContext";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Link, useSearchParams } from "react-router-dom";
import { LANGUAGES } from "./problemsData";
import { AdBanner, SidebarAd } from "./AdBanner";
import "./Account.css";

export default function Account() {
  const { user } = useAuth();
  const { isPro, subscription, loading: subLoading, planName } = useSubscription();
  const [searchParams] = useSearchParams();
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("javascript");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({ totalTests: 0, avgWpm: 0, avgAccuracy: 0, bestWpm: 0 });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

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
          limit(isPro ? 50 : 10)
        );
        const snap = await getDocs(q);
        const scores = snap.docs.map(d => d.data());
        setHistory(scores);

        if (scores.length > 0) {
          const totalWpm = scores.reduce((sum, s) => sum + s.wpm, 0);
          const totalAcc = scores.reduce((sum, s) => sum + s.accuracy, 0);
          const bestWpm = Math.max(...scores.map(s => s.wpm));
          setStats({
            totalTests: scores.length,
            avgWpm: (totalWpm / scores.length).toFixed(1),
            avgAccuracy: (totalAcc / scores.length).toFixed(1),
            bestWpm: bestWpm.toFixed(1)
          });
        }
      } catch (err) {
        console.error("Error loading account data:", err);
      } finally {
        setLoading(false);
      }
    }
    if (!subLoading) {
      loadData();
    }
  }, [user.uid, isPro, subLoading]);

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

  if (loading || subLoading) {
    return (
      <div className="account-page">
        <div className="account-container">
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <nav className="account-nav">
        <Link to="/" className="nav-brand">
          <span>⌨️</span>
          <span className="brand-text">LeetType</span>
        </Link>
        <div className="nav-links">
          <Link to="/problems">Problems</Link>
          {isPro && <Link to="/analytics">Analytics</Link>}
          {isPro && <Link to="/achievements">Achievements</Link>}
          <Link to="/leaderboards">Leaderboards</Link>
          <button className="logout-btn" onClick={() => signOut(auth)}>Logout</button>
        </div>
      </nav>

      {showSuccess && (
        <div className="success-banner">
          <span>🎉</span>
          <span>Welcome to LeetType Pro! Your subscription is now active.</span>
        </div>
      )}

      <div className={`account-layout ${isPro ? "pro-layout" : ""}`}>
        <div className="account-main">
          <div className="account-container">
            <div className="account-header">
              <h2>👤 Account Settings</h2>
              <span className={`plan-badge ${isPro ? "pro" : "free"}`}>
                {planName}
              </span>
            </div>

            <div className="profile-section">
              <div className="avatar">
                {(username || user.email)[0].toUpperCase()}
              </div>
              <div className="profile-info">
                <p className="email">{user.email}</p>
                {username && <p className="username-display">@{username}</p>}
              </div>
            </div>

            <div className="subscription-card">
              <div className="sub-header">
                <h3>Subscription</h3>
                {isPro && <span className="active-badge">Active</span>}
              </div>
              
              {isPro ? (
                <div className="sub-details">
                  <div className="sub-plan">
                    <span className="plan-icon">⚡</span>
                    <div>
                      <span className="plan-name">LeetType Pro</span>
                      <span className="plan-status">
                        {subscription?.status === "trialing" ? "Trial Period" : "Active Subscription"}
                      </span>
                    </div>
                  </div>
                  <div className="sub-features">
                    <span>✓ Full Leaderboards</span>
                    <span>✓ Analytics Dashboard</span>
                    <span>✓ Achievements</span>
                    <span>✓ No Ads</span>
                  </div>
                  <p className="sub-manage">
                    To manage your subscription, contact support or visit your payment portal.
                  </p>
                </div>
              ) : (
                <div className="upgrade-prompt">
                  <p>Unlock premium features to track your progress and compete globally!</p>
                  <Link to="/pricing" className="upgrade-btn">
                    Upgrade to Pro — $7/mo
                  </Link>
                  <ul className="upgrade-features">
                    <li>📊 Detailed Analytics</li>
                    <li>🏆 Full Leaderboard Access</li>
                    <li>🎖️ Achievements & XP</li>
                    <li>🚫 Ad-Free Experience</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="stats-grid">
              <div className="stat-card highlight">
                <span className="stat-value">{stats.bestWpm}</span>
                <span className="stat-label">Best WPM</span>
              </div>
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
                <label>Username {!isPro && <span className="pro-only">(Pro Feature)</span>}</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a display name"
                  maxLength={20}
                  disabled={!isPro}
                />
                <span className="hint">
                  {isPro 
                    ? "Shown on leaderboards instead of email" 
                    : "Upgrade to Pro to set a custom username"}
                </span>
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
              <div className="history-header">
                <h3>Recent Activity</h3>
                {!isPro && <span className="limited-badge">Last 10</span>}
              </div>
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
              {!isPro && history.length >= 10 && (
                <div className="history-paywall">
                  <Link to="/pricing">Upgrade for unlimited history →</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {!isPro && (
          <div className="account-sidebar">
            <SidebarAd />
          </div>
        )}
      </div>

      {!isPro && <AdBanner position="bottom" size="leaderboard" />}
    </div>
  );
}
