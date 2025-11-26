import { useState, useEffect, useRef, useCallback } from "react";
import "./TestArea.css";
import { problems, LANGUAGES, getSolution, getAvailableLanguages } from "./problemsData";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";

function TestArea() {
  const { user } = useAuth();
  const { id } = useParams(); // /app/:id

  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("leettype-language") || "javascript";
  });
  const [availableLanguages, setAvailableLanguages] = useState(LANGUAGES);
  const [text, setText] = useState("");

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

  // ---------- load problem from URL and reset ----------
  useEffect(() => {
    const p = problems.find((x) => x.id === id);
    setSelectedProblem(p || null);
    if (p) {
      setAvailableLanguages(getAvailableLanguages(p));
      setText(getSolution(p, selectedLanguage));
    } else {
      setText("");
    }
    // full reset
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
    charRefs.current = [];
    // focus after a tick
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [id, selectedLanguage]);

  // ---------- save result ----------
  async function saveResult() {
    if (!user || !id) return;
  
    const wpmValue = Number(wpm);
    const accValue = Number(accuracy);
    console.log("Saving result for:", id, selectedLanguage, wpmValue, accValue);
  
    try {
      // Save attempt history (includes language)
      await addDoc(collection(db, "userScores"), {
        uid: user.uid,
        email: user.email,
        problemId: id,
        language: selectedLanguage,
        wpm: wpmValue,
        accuracy: accValue,
        timestamp: Date.now(),
      });
  
      // Per-problem + language leaderboard (best only per language)
      const leaderboardId = `leaderboard_${id}_${selectedLanguage}`;
      const userRef = doc(db, leaderboardId, user.uid);
      const prev = await getDoc(userRef);
  
      if (!prev.exists() || wpmValue > prev.data().wpm) {
        await setDoc(userRef, {
          email: user.email,
          language: selectedLanguage,
          wpm: wpmValue,
          accuracy: accValue,
          updatedAt: Date.now(),
        });
        console.log("Leaderboard updated for:", id, selectedLanguage);
      } else {
        console.log("Did not beat previous WPM, skipping update.");
      }

      // Also update the "all languages" leaderboard for backwards compatibility
      const allLangRef = doc(db, `leaderboard_${id}`, user.uid);
      const prevAll = await getDoc(allLangRef);
      if (!prevAll.exists() || wpmValue > prevAll.data().wpm) {
        await setDoc(allLangRef, {
          email: user.email,
          language: selectedLanguage,
          wpm: wpmValue,
          accuracy: accValue,
          updatedAt: Date.now(),
        });
      }
    } catch (err) {
      console.error("❌ Error saving result:", err);
    }
  }

  // ---------- language change handler ----------
  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId);
    localStorage.setItem("leettype-language", langId);
    // Reset the test when language changes
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
    charRefs.current = [];
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  
  // ---------- timer ----------
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

  // ---------- stats ----------
  useEffect(() => {
    const now = finished && finishTimeRef.current ? finishTimeRef.current : Date.now();
    const elapsedSec = startTimeRef.current
      ? Math.max(0.001, (now - startTimeRef.current) / 1000)
      : 0;

    const typedUser = Math.max(0, input.length - autoInsertedRef.current);
    const correct = input.split("").filter((ch, i) => ch === text[i]).length;
    const correctUser = Math.max(0, correct - autoInsertedRef.current);

    const acc = typedUser > 0 ? (100 * correctUser) / typedUser : 100;
    const wpmCalc = elapsedSec > 0 ? (correctUser / 5) / (elapsedSec / 60) : 0;

    setAccuracy(acc.toFixed(1));
    setWpm(wpmCalc.toFixed(1));
  }, [input, text, finished]);

  // ---------- finish when end reached ----------
  useEffect(() => {
    if (!finished && text && input.length >= text.length) {
      clearInterval(timerRef.current);
      setFinished(true);
      if (!finishTimeRef.current) finishTimeRef.current = Date.now();
    }
  }, [input.length, text, finished]);

  // ---------- save once finished ----------
  useEffect(() => {
    if (finished) saveResult();
  }, [finished]);

  // ---------- caret ----------
  const moveVisualCaret = useCallback((index) => {
    if (!caretRef.current) return;
    const container = charRefs.current[0]?.parentNode;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const target = charRefs.current[index];
    if (target) {
      const rect = target.getBoundingClientRect();
      caretRef.current.style.left = `${rect.left - containerRect.left}px`;
      caretRef.current.style.top = `${rect.top - containerRect.top}px`;
    }
  }, []);

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
    charRefs.current = [];
    inputRef.current?.focus();
  };

  // ---------- UI ----------
  if (selectedProblem === null) {
    return (
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-logo">{user ? `⚙️ ${user.email}` : "⚙️ Loading..."}</div>
          <div className="nav-links">
            <a href="/problems">Problems</a>
            <a href="/account">Account</a>
            <a href="/leaderboards">Leaderboards</a>
            {user && <button className="logout-btn" onClick={() => signOut(auth)}>Logout</button>}
          </div>
        </nav>
        <div className="test-wrapper">
          <div className="results fade-in">
            <h2>Problem not found</h2>
            <p>That problem id doesn’t exist. Go back to <a href="/problems">Problems</a>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo">{user ? `⚙️ ${user.email}` : "⚙️ Loading..."}</div>
        <div className="nav-links">
          <a href="/problems">Problems</a>
          <a href="/account">Account</a>
          <a href="/leaderboards">Leaderboards</a>

          {user && <button className="logout-btn" onClick={() => signOut(auth)}>Logout</button>}
        </div>
      </nav>

      <div className="test-wrapper">
        {!finished ? (
          <>
            <div className="problem-title-header">{selectedProblem?.title}</div>

            {/* Language Selector */}
            <div className="language-selector">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.id}
                  className={`lang-btn ${selectedLanguage === lang.id ? "active" : ""}`}
                  onClick={() => handleLanguageChange(lang.id)}
                  disabled={started && !finished}
                  title={started && !finished ? "Finish or restart to switch language" : lang.name}
                >
                  {lang.icon}
                </button>
              ))}
            </div>

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
              onChange={(e) => {
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
              }}
              onKeyDownCapture={(e) => {
                const el = e.target;
                const pos = el.selectionStart;

                // TAB skip whitespace
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
                    requestAnimationFrame(() =>
                      el.setSelectionRange(newPos, newPos)
                    );
                  }
                  return;
                }

                // ENTER keep indent
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = el.value;
                  const lineStart = value.lastIndexOf("\n", pos - 1) + 1;
                  const line = value.slice(lineStart, pos);
                  const indentMatch = line.match(/^(\s+)/);
                  const indent = indentMatch ? indentMatch[1] : "";
                  const newVal = value.slice(0, pos) + "\n" + indent + value.slice(pos);
                  const newPos = pos + 1 + indent.length;

                  setInput(newVal);
                  setCursor(newPos);
                  autoInsertedRef.current += indent.length;
                  requestAnimationFrame(() => el.setSelectionRange(newPos, newPos));
                  return;
                }
              }}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
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
