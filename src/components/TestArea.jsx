import { useState, useEffect, useRef, useCallback } from "react";
import "./TestArea.css";
import { problems } from "./problems";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";

function TestArea() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [text, setText] = useState(selectedProblem.solution);

  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(120);
  const [wpm, setWpm] = useState("0.0");
  const [accuracy, setAccuracy] = useState("100.0");
  const [isIdle, setIsIdle] = useState(true);

  const totalTime = 120;
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const charRefs = useRef([]);
  const timerRef = useRef(null);
  const idleTimer = useRef(null);
  const startTimeRef = useRef(null);
  const finishTimeRef = useRef(null);
  const autoInsertedRef = useRef(0);

  const { user } = useAuth();
  
  async function saveResult() {
    if (!user) return;
  
    const wpmValue = Number(wpm);
    const accValue = Number(accuracy);
  
    // ✅ Save every score for account history
    await addDoc(collection(db, "userScores"), {
      uid: user.uid,
      email: user.email,
      wpm: wpmValue,
      accuracy: accValue,
      timestamp: Date.now()
    });
  
    // ✅ Update leaderboard only if this score is higher
    const userRef = doc(db, "leaderboard", user.uid);
    const prev = await getDoc(userRef);
  
    if (!prev.exists() || wpmValue > prev.data().wpm) {
      await setDoc(userRef, {
        email: user.email,
        wpm: wpmValue,
        accuracy: accValue,
        updatedAt: Date.now()
      });
    }
  }

  const changeProblem = (e) => {
    const chosen = problems.find(p => p.id === e.target.value);
    setSelectedProblem(chosen);
    setText(chosen.solution);
    restartTest();
  };

  const moveVisualCaret = useCallback((index) => {
    if (!caretRef.current) return;
    const container = charRefs.current[0]?.parentNode;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const i = Math.max(0, Math.min(index, charRefs.current.length));
    const target = charRefs.current[i];

    if (target) {
      const rect = target.getBoundingClientRect();
      caretRef.current.style.left = `${rect.left - containerRect.left}px`;
      caretRef.current.style.top = `${rect.top - containerRect.top}px`;
    }
  }, []);

  // ⏲ Timer
  useEffect(() => {
    if (!started || finished) return;

    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          if (!finishTimeRef.current) finishTimeRef.current = Date.now();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, finished]);

  // 📊 Update WPM & Accuracy
  useEffect(() => {
    const now = finished && finishTimeRef.current ? finishTimeRef.current : Date.now();
    const elapsedSec = startTimeRef.current
      ? Math.max(0.001, (now - startTimeRef.current) / 1000)
      : 0;

    const typedUser = Math.max(0, input.length - autoInsertedRef.current);
    const correct = input.split("").filter((ch, i) => ch === text[i]).length;
    const correctUser = Math.max(0, correct - autoInsertedRef.current);

    const acc = typedUser > 0 ? (100 * correctUser / typedUser) : 100;
    const wpmCalc = elapsedSec > 0 ? (correctUser / 5) / (elapsedSec / 60) : 0;

    setAccuracy(acc.toFixed(1));
    setWpm(wpmCalc.toFixed(1));
  }, [input, text, finished]);

  // ✅ Finish when typed to end
  useEffect(() => {
    if (!finished && cursor >= text.length) {
      clearInterval(timerRef.current);
      setFinished(true);
      if (!finishTimeRef.current) finishTimeRef.current = Date.now();
    }
  }, [cursor, finished, text.length]);

  // ✅ Save AFTER stats ready
  useEffect(() => {
    if (finished) {
      saveResult();
    }
  }, [finished, wpm, accuracy]);

  const handleChange = (e) => {
    if (!started) {
      setStarted(true);
      if (!startTimeRef.current) startTimeRef.current = Date.now();
    }

    const newVal = e.target.value;
    const newPos = e.target.selectionStart;

    setInput(newVal);
    setCursor(newPos);

    setIsIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsIdle(true), 1500);
  };

  useEffect(() => {
    moveVisualCaret(cursor);
  }, [cursor, moveVisualCaret]);

  const getCharClass = (char, index) => {
    if (index < input.length) return input[index] === char ? "correct" : "incorrect";
    return "neutral";
  };

  const restartTest = () => {
    setInput("");
    setCursor(0);
    setStarted(false);
    setFinished(false);
    setTime(totalTime);
    setWpm("0.0");
    setAccuracy("100.0");
    autoInsertedRef.current = 0;
    startTimeRef.current = null;
    finishTimeRef.current = null;
    setIsIdle(true);
    inputRef.current?.focus();
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo">{user ? `⚙️ ${user.email}` : "⚙️ Loading..."}</div>

        <div className="nav-links">
          <a href="https://www.linkedin.com/in/herbert-seto-0b199a376/?lipi=urn%3Ali%3Apage%3Ad_flagship3_people%3B56n7T9sXRO%2B99ukj%2BNW%2ByA%3D%3D">Problems</a>
          <a href="/account">Account</a>
          <a href="/leaderboard">Leaderboard</a>

          {user && (
            <button className="logout-btn" onClick={() => signOut(auth)}>Logout</button>
          )}
        </div>
      </nav>

      <div className="test-wrapper">

        <select className="problem-select" onChange={changeProblem} value={selectedProblem.id}>
          {problems.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>

        {!finished ? (
          <>
            <div className="text-display">
              {text.split("").map((char, i) => (
                <span
                  key={i}
                  className={getCharClass(char, i)}
                  ref={(el) => (charRefs.current[i] = el)}
                >
                  {char}
                </span>
              ))}
              <div ref={caretRef} className={`caret ${isIdle ? "blink" : "solid"}`} />
            </div>

            <textarea
              ref={inputRef}
              value={input}
              onChange={handleChange}
              onKeyDownCapture={(e) => {
                const el = e.target;
                const pos = el.selectionStart;

                if (e.key === "Tab" && pos === input.length) {
                  e.preventDefault();
                  const rest = text.slice(pos);
                  const next = rest.search(/[^\s]/);
                  if (next > 0) {
                    const newPos = pos + next;
                    const insert = text.slice(pos, newPos);
                    setInput(input + insert);
                    setCursor(newPos);
                    autoInsertedRef.current += insert.length;
                    requestAnimationFrame(() => el.setSelectionRange(newPos, newPos));
                  }
                  return;
                }

                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = el.value;
                  const lineStart = value.lastIndexOf("\n", pos - 1) + 1;
                  const line = value.slice(lineStart, pos);
                  const indent = (line.match(/^(\s+)/) || ["", ""])[1];
                  const newVal = value.slice(0, pos) + "\n" + indent + value.slice(pos);
                  const newPos = pos + 1 + indent.length;

                  setInput(newVal);
                  setCursor(newPos);
                  autoInsertedRef.current += indent.length;
                  requestAnimationFrame(() => el.setSelectionRange(newPos, newPos));
                  return;
                }
              }}
              className="code-input"
              spellCheck={false}
              autoFocus
            />

            <div className="stats">
              <p>⏱ {time}s</p>
              <p>⚡ {wpm} wpm</p>
              <p>🎯 {accuracy}%</p>
            </div>

            <button className="restart-btn" onClick={restartTest}>Restart</button>
          </>
        ) : (
          <div className="results fade-in">
            <h2>✅ Finished!</h2>
            <p>⚡ {wpm} WPM</p>
            <p>🎯 {accuracy}% Accuracy</p>
            <button onClick={restartTest}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestArea;
