import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Account() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      const q = query(
        collection(db, "userScores"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const snap = await getDocs(q);
      setHistory(snap.docs.map(doc => doc.data()));
    }
    load();
  }, []);

  return (
    <div className="auth-container">
      <h2>👤 Account</h2>
      <p>Email: {user.email}</p>

      <h3>Recent Scores:</h3>
      {history.map((r, i) => (
        <p key={i}>
          {r.wpm} WPM — {r.accuracy}% 
        </p>
      ))}
    </div>
  );
}
