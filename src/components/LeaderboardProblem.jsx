import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { LANGUAGES } from "./problemsData";
import { useSubscription } from "../context/SubscriptionContext";
import "./Leaderboard.css";

export default function LeaderboardProblem() {
  const { id } = useParams();
  const { isPro, loading: subLoading } = useSubscription();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  useEffect(() => {
    async function loadScores() {
      setLoading(true);
      try {
        let colRef;
        if (selectedLanguage === "all") {
          colRef = collection(db, `leaderboard_${id}`);
        } else {
          colRef = collection(db, `leaderboard_${id}_${selectedLanguage}`);
        }

        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((d) => d.data());
        data.sort((a, b) => b.wpm - a.wpm);

        const scoresWithUsernames = await Promise.all(
          data.map(async (s) => {
            if (s.uid) {
              try {
                const userDoc = await getDoc(doc(db, "users", s.uid));
                if (userDoc.exists()) {
                  const userData = userDoc.data();
                  return { ...s, displayName: userData.username || null };
                }
              } catch (e) {
                console.error("Error fetching user:", e);
              }
            }
            return s;
          })
        );

        setScores(scoresWithUsernames);
      } catch (err) {
        console.error("Error loading leaderboard:", err);
        setScores([]);
      } finally {
        setLoading(false);
      }
    }
    loadScores();
  }, [id, selectedLanguage]);

  const getLangName = (langId) => {
    const lang = LANGUAGES.find((l) => l.id === langId);
    return lang ? lang.icon : langId?.toUpperCase() || "?";
  };

  const getDisplayName = (s) => {
    if (s.displayName) return `@${s.displayName}`;
    if (s.email) return s.email.split("@")[0];
    return "Anonymous";
  };

  if (loading || subLoading) {
    return (
      <div className="leaderboard-page">
        <div className="leaderboard-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  const visibleScores = isPro ? scores : scores.slice(0, 3);
  const hiddenCount = scores.length - 3;

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <Link to="/leaderboards" className="back-btn">
          ← Back to Leaderboards
        </Link>
        <div className="leaderboard-title-row">
          <h2>🏆 Leaderboard — {id}</h2>
          {isPro && <span className="pro-badge-small">Pro</span>}
        </div>

        <div className="language-filter">
          <button
            className={`filter-btn ${selectedLanguage === "all" ? "active" : ""}`}
            onClick={() => setSelectedLanguage("all")}
          >
            All
          </button>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              className={`filter-btn ${selectedLanguage === lang.id ? "active" : ""}`}
              onClick={() => setSelectedLanguage(lang.id)}
            >
              {lang.icon}
            </button>
          ))}
        </div>

        {scores.length === 0 ? (
          <div className="no-scores">
            <p>No scores yet for this problem{selectedLanguage !== "all" ? ` in ${getLangName(selectedLanguage)}` : ""}.</p>
            <Link to={`/app/${id}`} className="try-btn">
              Be the first! →
            </Link>
          </div>
        ) : (
          <>
            <div className="leaderboard-list">
              {visibleScores.map((s, i) => (
                <div
                  key={i}
                  className={`leaderboard-entry ${i < 3 ? `rank-${i + 1}` : ""}`}
                >
                  <div className="entry-left">
                    <span className="leaderboard-rank">
                      {i === 0 && "🥇"}
                      {i === 1 && "🥈"}
                      {i === 2 && "🥉"}
                      {i > 2 && `#${i + 1}`}
                    </span>
                    <span className={`entry-name ${s.displayName ? "has-username" : ""}`}>
                      {getDisplayName(s)}
                    </span>
                  </div>
                  <div className="entry-right">
                    {s.language && (
                      <span className="entry-lang">{getLangName(s.language)}</span>
                    )}
                    <span className="entry-wpm">{s.wpm} WPM</span>
                    <span className="entry-acc">{s.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>

            {!isPro && hiddenCount > 0 && (
              <div className="leaderboard-paywall">
                <div className="paywall-blur">
                  {[...Array(Math.min(5, hiddenCount))].map((_, i) => (
                    <div key={i} className="blurred-entry">
                      <span className="blur-rank">#{4 + i}</span>
                      <span className="blur-name">████████</span>
                      <span className="blur-wpm">██ WPM</span>
                    </div>
                  ))}
                </div>
                <div className="paywall-overlay">
                  <div className="paywall-content">
                    <span className="lock-icon">🔒</span>
                    <h3>+{hiddenCount} more scores</h3>
                    <p>Upgrade to Pro to see full rankings and your position</p>
                    <Link to="/pricing" className="unlock-btn">
                      Unlock Full Leaderboard — $7/mo
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {!isPro && (
              <div className="your-rank-teaser">
                <span className="teaser-icon">📊</span>
                <span className="teaser-text">Your rank: <span className="blurred-text">???</span></span>
                <Link to="/pricing" className="teaser-link">See where you stand →</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
