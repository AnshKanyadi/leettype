import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSubscription } from "../context/SubscriptionContext";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./Achievements.css";

const ACHIEVEMENTS = [
  {
    id: "first-blood",
    name: "First Blood",
    description: "Complete your first typing test",
    icon: "🩸",
    requirement: { type: "totalTests", value: 1 },
    xp: 10,
  },
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Complete 10 typing tests",
    icon: "🌱",
    requirement: { type: "totalTests", value: 10 },
    xp: 25,
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Complete 50 typing tests",
    icon: "💪",
    requirement: { type: "totalTests", value: 50 },
    xp: 100,
  },
  {
    id: "centurion",
    name: "Centurion",
    description: "Complete 100 typing tests",
    icon: "🎖️",
    requirement: { type: "totalTests", value: 100 },
    xp: 250,
  },
  {
    id: "speed-demon-40",
    name: "Speed Demon",
    description: "Reach 40 WPM on any problem",
    icon: "⚡",
    requirement: { type: "wpm", value: 40 },
    xp: 20,
  },
  {
    id: "fast-fingers",
    name: "Fast Fingers",
    description: "Reach 60 WPM on any problem",
    icon: "🏃",
    requirement: { type: "wpm", value: 60 },
    xp: 50,
  },
  {
    id: "velocity",
    name: "Velocity",
    description: "Reach 80 WPM on any problem",
    icon: "🚀",
    requirement: { type: "wpm", value: 80 },
    xp: 100,
  },
  {
    id: "lightning",
    name: "Lightning",
    description: "Reach 100 WPM on any problem",
    icon: "⚡",
    requirement: { type: "wpm", value: 100 },
    xp: 200,
  },
  {
    id: "superhuman",
    name: "Superhuman",
    description: "Reach 150 WPM on any problem",
    icon: "🦸",
    requirement: { type: "wpm", value: 150 },
    xp: 500,
  },
  {
    id: "perfect-run",
    name: "Perfect Run",
    description: "Complete a test with 100% accuracy",
    icon: "🎯",
    requirement: { type: "accuracy", value: 100 },
    xp: 50,
  },
  {
    id: "sharpshooter",
    name: "Sharpshooter",
    description: "Complete 10 tests with 95%+ accuracy",
    icon: "🎪",
    requirement: { type: "highAccuracyCount", value: 10 },
    xp: 75,
  },
  {
    id: "problem-solver",
    name: "Problem Solver",
    description: "Complete 25 unique problems",
    icon: "🧩",
    requirement: { type: "uniqueProblems", value: 25 },
    xp: 100,
  },
  {
    id: "neetcode-master",
    name: "NeetCode Master",
    description: "Complete all 150 problems",
    icon: "👑",
    requirement: { type: "uniqueProblems", value: 150 },
    xp: 1000,
  },
  {
    id: "polyglot-2",
    name: "Bilingual",
    description: "Use 2 different languages",
    icon: "🌐",
    requirement: { type: "languages", value: 2 },
    xp: 30,
  },
  {
    id: "polyglot-4",
    name: "Polyglot",
    description: "Use all 4 languages",
    icon: "🗣️",
    requirement: { type: "languages", value: 4 },
    xp: 100,
  },
  {
    id: "streak-3",
    name: "On a Roll",
    description: "3 day practice streak",
    icon: "🔥",
    requirement: { type: "streak", value: 3 },
    xp: 30,
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "7 day practice streak",
    icon: "📅",
    requirement: { type: "streak", value: 7 },
    xp: 75,
  },
  {
    id: "streak-30",
    name: "Monthly Master",
    description: "30 day practice streak",
    icon: "🏆",
    requirement: { type: "streak", value: 30 },
    xp: 300,
  },
  {
    id: "easy-complete",
    name: "Easy Mode",
    description: "Complete all Easy problems",
    icon: "💚",
    requirement: { type: "easyProblems", value: 100 },
    xp: 150,
  },
  {
    id: "medium-complete",
    name: "Medium Rare",
    description: "Complete 30 Medium problems",
    icon: "🧡",
    requirement: { type: "mediumProblems", value: 30 },
    xp: 200,
  },
  {
    id: "hard-complete",
    name: "Hard Boiled",
    description: "Complete 10 Hard problems",
    icon: "❤️",
    requirement: { type: "hardProblems", value: 10 },
    xp: 250,
  },
];

export default function Achievements() {
  const { user } = useAuth();
  const { isPro, loading: subLoading } = useSubscription();
  const [userStats, setUserStats] = useState(null);
  const [earnedAchievements, setEarnedAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalXp, setTotalXp] = useState(0);

  useEffect(() => {
    if (!user || subLoading) return;

    async function loadData() {
      try {
        const q = query(
          collection(db, "userScores"),
          where("uid", "==", user.uid)
        );
        const snap = await getDocs(q);
        const scores = snap.docs.map((d) => d.data());

        const stats = calculateStats(scores);
        setUserStats(stats);

        const earned = checkAchievements(stats);
        setEarnedAchievements(earned);

        const xp = earned.reduce((sum, a) => sum + a.xp, 0);
        setTotalXp(xp);

        await setDoc(
          doc(db, "userAchievements", user.uid),
          {
            achievements: earned.map((a) => a.id),
            totalXp: xp,
            updatedAt: Date.now(),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Error loading achievements:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, subLoading]);

  function calculateStats(scores) {
    if (scores.length === 0) {
      return {
        totalTests: 0,
        maxWpm: 0,
        maxAccuracy: 0,
        highAccuracyCount: 0,
        uniqueProblems: 0,
        languages: 0,
        streak: 0,
        easyProblems: 0,
        mediumProblems: 0,
        hardProblems: 0,
      };
    }

    const uniqueProblems = new Set(scores.map((s) => s.problemId));
    const uniqueLanguages = new Set(scores.map((s) => s.language));
    const highAccuracyCount = scores.filter((s) => s.accuracy >= 95).length;

    const days = new Set();
    scores.forEach((s) => {
      days.add(new Date(s.timestamp).toDateString());
    });
    const sortedDays = Array.from(days)
      .map((d) => new Date(d))
      .sort((a, b) => b - a);

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
        const diff = (sortedDays[i - 1] - sortedDays[i]) / (1000 * 60 * 60 * 24);
        if (diff <= 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    return {
      totalTests: scores.length,
      maxWpm: Math.max(...scores.map((s) => s.wpm)),
      maxAccuracy: Math.max(...scores.map((s) => s.accuracy)),
      highAccuracyCount,
      uniqueProblems: uniqueProblems.size,
      languages: uniqueLanguages.size,
      streak,
      easyProblems: uniqueProblems.size,
      mediumProblems: Math.min(30, uniqueProblems.size),
      hardProblems: Math.min(10, uniqueProblems.size),
    };
  }

  function checkAchievements(stats) {
    const earned = [];

    ACHIEVEMENTS.forEach((achievement) => {
      const { type, value } = achievement.requirement;
      let unlocked = false;

      switch (type) {
        case "totalTests":
          unlocked = stats.totalTests >= value;
          break;
        case "wpm":
          unlocked = stats.maxWpm >= value;
          break;
        case "accuracy":
          unlocked = stats.maxAccuracy >= value;
          break;
        case "highAccuracyCount":
          unlocked = stats.highAccuracyCount >= value;
          break;
        case "uniqueProblems":
          unlocked = stats.uniqueProblems >= value;
          break;
        case "languages":
          unlocked = stats.languages >= value;
          break;
        case "streak":
          unlocked = stats.streak >= value;
          break;
        case "easyProblems":
          unlocked = stats.easyProblems >= value;
          break;
        case "mediumProblems":
          unlocked = stats.mediumProblems >= value;
          break;
        case "hardProblems":
          unlocked = stats.hardProblems >= value;
          break;
        default:
          break;
      }

      if (unlocked) {
        earned.push(achievement);
      }
    });

    return earned;
  }

  function getLevel(xp) {
    if (xp < 100) return { level: 1, title: "Novice", nextXp: 100 };
    if (xp < 300) return { level: 2, title: "Beginner", nextXp: 300 };
    if (xp < 600) return { level: 3, title: "Intermediate", nextXp: 600 };
    if (xp < 1000) return { level: 4, title: "Advanced", nextXp: 1000 };
    if (xp < 1500) return { level: 5, title: "Expert", nextXp: 1500 };
    if (xp < 2500) return { level: 6, title: "Master", nextXp: 2500 };
    return { level: 7, title: "Legend", nextXp: Infinity };
  }

  if (subLoading || loading) {
    return (
      <div className="achievements-page">
        <div className="achievements-container">
          <p className="loading">Loading achievements...</p>
        </div>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="achievements-page">
        <nav className="achievements-nav">
          <Link to="/" className="nav-brand">
            <span>⌨️</span>
            <span className="brand-text">LeetType</span>
          </Link>
        </nav>
        <div className="paywall-container">
          <div className="paywall-content">
            <div className="paywall-icon">🎖️</div>
            <h2>Achievements</h2>
            <p>Unlock achievements and track your progress</p>
            <ul className="paywall-features">
              <li>🏆 20+ unique achievements</li>
              <li>⚡ XP and leveling system</li>
              <li>🔥 Streak rewards</li>
              <li>🎯 Skill-based badges</li>
            </ul>
            <Link to="/pricing" className="upgrade-btn">
              Upgrade to Pro — $7/mo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const levelInfo = getLevel(totalXp);
  const progress = ((totalXp / levelInfo.nextXp) * 100).toFixed(0);

  return (
    <div className="achievements-page">
      <nav className="achievements-nav">
        <Link to="/" className="nav-brand">
          <span>⌨️</span>
          <span className="brand-text">LeetType</span>
        </Link>
        <div className="nav-links">
          <Link to="/problems">Problems</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/account">Account</Link>
          <button className="logout-btn" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      </nav>

      <div className="achievements-container">
        <div className="achievements-header">
          <h1>🎖️ Achievements</h1>
          <span className="pro-badge">Pro</span>
        </div>

        <div className="level-card">
          <div className="level-info">
            <span className="level-number">Level {levelInfo.level}</span>
            <span className="level-title">{levelInfo.title}</span>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${Math.min(100, progress)}%` }} />
          </div>
          <div className="xp-text">
            <span>{totalXp} XP</span>
            {levelInfo.nextXp !== Infinity && (
              <span>{levelInfo.nextXp} XP</span>
            )}
          </div>
        </div>

        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-val">{earnedAchievements.length}</span>
            <span className="stat-lbl">Unlocked</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">{ACHIEVEMENTS.length - earnedAchievements.length}</span>
            <span className="stat-lbl">Remaining</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">{userStats?.streak || 0} 🔥</span>
            <span className="stat-lbl">Streak</span>
          </div>
        </div>

        <div className="achievements-grid">
          {ACHIEVEMENTS.map((achievement) => {
            const isEarned = earnedAchievements.some((a) => a.id === achievement.id);
            return (
              <div
                key={achievement.id}
                className={`achievement-card ${isEarned ? "earned" : "locked"}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <h3>{achievement.name}</h3>
                  <p>{achievement.description}</p>
                  <span className="achievement-xp">+{achievement.xp} XP</span>
                </div>
                {isEarned ? (
                  <div className="earned-badge">✓</div>
                ) : (
                  <div className="locked-icon">🔒</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

