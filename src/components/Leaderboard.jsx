import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";

export default function Leaderboard() {
  const { id } = useParams();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function load() {
      const q = query(
        collection(db, "leaderboard", id, "scores"),
        orderBy("wpm", "desc"),
        limit(20)
      );

      const snap = await getDocs(q);
      setScores(snap.docs.map(doc => doc.data()));
    }

    load();
  }, [id]);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard — {id}</h2>
      <Link to="/problems" className="back-btn">← Back</Link>

      {scores.map((u, i) => (
        <div key={i} className="leaderboard-entry">
          <span className="leaderboard-rank">#{i + 1}</span>
          {u.email} — {u.wpm} WPM — {u.accuracy}%
        </div>
      ))}
    </div>
  );
}
