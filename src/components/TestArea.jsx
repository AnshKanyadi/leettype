import { useState, useEffect, useRef, useCallback } from "react";
import "./TestArea.css";
import { problems } from "./problems";

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

  // ---- PROBLEM CHANGE ----
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

  // ---- TIMER ----
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

  // ---- UPDATE STATS ----
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

  // ---- FINISH WHEN REACH END ----
  useEffect(() => {
    if (!finished && cursor >= text.length) {
      clearInterval(timerRef.current);
      setFinished(true);
      if (!finishTimeRef.current) finishTimeRef.current = Date.now();
    }
  }, [cursor, finished, text.length]);

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
        <div className="nav-logo">⚙️ Ansh Kanyadi</div>
        <div className="nav-links">
          <a>Problems</a>
          <a>Account</a>
          <a>Leaderboard</a>
        </div>
      </nav>

      <div className="test-wrapper">
        {/* ✅ PROBLEM DROPDOWN */}
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

            {/* ✅ TYPING FIELD */}
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleChange}
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
