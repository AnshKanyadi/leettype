import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Leaderboard.css";

export default function LeaderboardProblem() {
  const { id } = useParams();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScores() {
      try {
        const colRef = collection(db, `leaderboard_${id}`);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => doc.data());
        data.sort((a, b) => b.wpm - a.wpm); // sort by best WPM
        setScores(data);
      } catch (err) {
        console.error("Error loading leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadScores();
  }, [id]);

  if (loading) return <div className="leaderboard-container">Loading...</div>;

  return (
    <div className="leaderboard-container">
      <Link to="/problems" className="back-btn">← Back to Problems</Link>
      <h2>🏆 Leaderboard — {id}</h2>
      {scores.length === 0 ? (
        <p>No scores yet for this problem.</p>
      ) : (
        <div>
          {scores.map((s, i) => (
            <div key={i} className="leaderboard-entry">
              <span className="leaderboard-rank">#{i + 1}</span>
              <span>{s.email}</span>
              <span> — {s.wpm} WPM ({s.accuracy}%)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
