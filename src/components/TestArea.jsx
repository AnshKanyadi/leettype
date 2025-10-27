import { useState, useEffect, useRef } from "react";

function TestArea() {
  const [text] = useState("the quick brown fox jumps over the lazy dog");
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(60);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [started]);

  const handleChange = (e) => {
    if (!started) setStarted(true);
    setInput(e.target.value);
  };

  return (
    <>
      <p>{text}</p>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Start typing..."
        autoFocus
      />
      <p>Time left: {time}s</p>
    </>
  );
}

export default TestArea;
