import { useState, useEffect, useRef, useCallback } from "react";
import "./TestArea.css";

const solution = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num = defaultdict(int)
        
        for i in range(len(nums)):
            if (target - nums[i]) in num:
                return [i, num[target - nums[i]]]
            else:
                num[nums[i]] = i`;

function TestArea() {
  const [text] = useState(solution);
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

  const moveVisualCaret = useCallback((index) => {
    if (!caretRef.current) return;
    const container = charRefs.current[0]?.parentNode;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const i = Math.max(0, Math.min(index, charRefs.current.length));
    const targetChar = charRefs.current[i];

    if (targetChar) {
      const rect = targetChar.getBoundingClientRect();
      caretRef.current.style.left = `${rect.left - containerRect.left}px`;
      caretRef.current.style.top = `${rect.top - containerRect.top}px`;
    } else if (charRefs.current.length > 0) {
      const lastChar = charRefs.current[charRefs.current.length - 1];
      const rect = lastChar.getBoundingClientRect();
      caretRef.current.style.left = `${rect.right - containerRect.left}px`;
      caretRef.current.style.top = `${rect.top - containerRect.top}px`;
    }
  }, []);

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

  useEffect(() => {
    const now = finished && finishTimeRef.current ? finishTimeRef.current : Date.now();
    const elapsedSec =
      startTimeRef.current ? Math.max(0.001, (now - startTimeRef.current) / 1000) : 0;

    const userTypedCount = Math.max(0, input.length - autoInsertedRef.current);
    const correctChars = input.split("").filter((ch, i) => ch === text[i]).length;
    const correctUserChars = Math.max(0, correctChars - autoInsertedRef.current);

    const acc =
      userTypedCount > 0 ? (100 * (correctUserChars / userTypedCount)) : 100;
    const wpmVal =
      elapsedSec > 0 ? (correctUserChars / 5) / (elapsedSec / 60) : 0;

    setAccuracy(acc.toFixed(1));
    setWpm(wpmVal.toFixed(1));
  }, [input, text, finished]);

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
    const el = e.target;
    const newVal = el.value;
    const newPos = el.selectionStart;

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
    if (index < input.length)
      return input[index] === char ? "correct" : "incorrect";
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
    setIsIdle(true);
    autoInsertedRef.current = 0;
    startTimeRef.current = null;
    finishTimeRef.current = null;
    inputRef.current?.focus();
  };

  return (
    <div className="app-container">
      {/* 🔝 NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">⚙️ Ansh Kanyadi</div>
        <div className="nav-links">
          <a href="https://hackertyper.com/" target="_blank" rel="noreferrer">Problems</a>
          <a href="https://en.wikipedia.org/wiki/Cat" target="_blank" rel="noreferrer">Account</a>
          <a href="https://pointerpointer.com/" target="_blank" rel="noreferrer">Leaderboard</a>
        </div>
      </nav>

      <div className="test-wrapper">
        {!finished ? (
          <>
            <div className="text-display">
              {text.split("").map((char, index) => (
                <span
                  key={index}
                  className={getCharClass(char, index)}
                  ref={(el) => (charRefs.current[index] = el)}
                >
                  {char}
                </span>
              ))}
              <div
                ref={caretRef}
                className={`caret ${isIdle ? "blink" : "solid"}`}
              />
            </div>

            <textarea
              ref={inputRef}
              value={input}
              onChange={handleChange}
              onKeyDownCapture={(e) => {
                const el = e.target;
                const pos = el.selectionStart;

                // TAB
                if (e.key === "Tab" && !e.shiftKey && pos === input.length) {
                  e.preventDefault();
                  const restOfSolution = text.slice(pos);
                  const nextCharMatch = restOfSolution.search(/[^\s]/);
                  if (nextCharMatch === -1) return;
                  if (nextCharMatch > 0) {
                    const newPos = pos + nextCharMatch;
                    const textToFill = text.slice(pos, newPos);
                    const newVal = input + textToFill;
                    setInput(newVal);
                    setCursor(newPos);
                    autoInsertedRef.current += textToFill.length;
                    requestAnimationFrame(() =>
                      el.setSelectionRange(newPos, newPos)
                    );
                  }
                  return;
                }

                // ENTER
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = el.value;
                  const lineStart = value.lastIndexOf("\n", pos - 1) + 1;
                  const line = value.slice(lineStart, pos);
                  const indentMatch = line.match(/^(\s+)/);
                  const indent = indentMatch ? indentMatch[1] : "";
                  const newVal =
                    value.slice(0, pos) + "\n" + indent + value.slice(pos);
                  const newPos = pos + 1 + indent.length;
                  setInput(newVal);
                  setCursor(newPos);
                  autoInsertedRef.current += indent.length;
                  requestAnimationFrame(() =>
                    el.setSelectionRange(newPos, newPos)
                  );
                  return;
                }
              }}
              spellCheck={false}
              autoFocus
              className="code-input"
              placeholder="Start typing..."
            />

            <div className="stats">
              <p>⏱️ Time left: {time}s</p>
              <p>⚡ WPM: {wpm}</p>
              <p>🎯 Accuracy: {accuracy}%</p>
            </div>
          </>
        ) : (
          <div className="results fade-in">
            <h2>🏁 Results</h2>
            <p>⚡ WPM: {wpm}</p>
            <p>🎯 Accuracy: {accuracy}%</p>
            <button onClick={restartTest}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestArea;
