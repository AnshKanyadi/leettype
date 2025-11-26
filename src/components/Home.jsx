import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const codeSnippets = [
  { lang: "Python", code: "def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target-n], i]\n        seen[n] = i" },
  { lang: "JavaScript", code: "function maxProfit(prices) {\n  let min = prices[0], max = 0;\n  for (let p of prices) {\n    min = Math.min(min, p);\n    max = Math.max(max, p - min);\n  }\n  return max;\n}" },
  { lang: "Java", code: "public boolean isValid(String s) {\n    Stack<Character> st = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(') st.push(')');\n        else if (st.isEmpty()) return false;\n        else st.pop();\n    }\n    return st.isEmpty();\n}" },
];

const features = [
  { icon: "⚡", title: "Real-time WPM", desc: "Track your typing speed as you code with live WPM and accuracy metrics" },
  { icon: "🎯", title: "150 LeetCode Problems", desc: "Practice with the complete NeetCode 150 blind list of interview questions" },
  { icon: "🌐", title: "4 Languages", desc: "Type solutions in JavaScript, Python, Java, or C++ — your choice" },
  { icon: "🏆", title: "Global Leaderboards", desc: "Compete with developers worldwide and climb the rankings" },
  { icon: "👤", title: "Personal Stats", desc: "Track your progress, history, and improvement over time" },
  { icon: "🎨", title: "Modern UI", desc: "Beautiful, distraction-free interface designed for focus" },
];

const stats = [
  { value: "150+", label: "Problems" },
  { value: "4", label: "Languages" },
  { value: "∞", label: "Practice" },
  { value: "0", label: "Excuses" },
];

export default function Home() {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    if (isTyping && charIndex < snippet.code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(snippet.code.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 25 + Math.random() * 35);
      return () => clearTimeout(timer);
    } else if (charIndex >= snippet.code.length) {
      const pauseTimer = setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
          setCharIndex(0);
          setDisplayedCode("");
          setIsTyping(true);
        }, 500);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }
  }, [charIndex, currentSnippet, isTyping]);

  return (
    <div className="landing-page">
      <div className="gradient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <nav className="landing-nav">
        <div className="nav-brand">
          <span className="brand-icon">⌨️</span>
          <span className="brand-text">LeetType</span>
        </div>
        <div className="nav-actions">
          <Link to="/leaderboards" className="nav-link">Leaderboards</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-cta">Get Started</Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse" />
            <span>Now with 150 NeetCode Problems</span>
          </div>
          
          <h1 className="hero-title">
            Type Code.<br />
            <span className="gradient-text">Think Faster.</span>
          </h1>
          
          <p className="hero-subtitle">
            Master coding interviews by training your muscle memory. 
            Type real LeetCode solutions at lightning speed while competing globally.
          </p>

          <div className="hero-ctas">
            <Link to="/signup" className="cta-primary">
              <span>Start Typing Free</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/leaderboards" className="cta-secondary">
              <span>View Leaderboards</span>
            </Link>
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="window-title">{codeSnippets[currentSnippet].lang}</div>
              <div className="window-wpm">
                <span className="wpm-value">127</span>
                <span className="wpm-label">WPM</span>
              </div>
            </div>
            <div className="code-content">
              <pre>
                <code>{displayedCode}</code>
                <span className="cursor-blink">|</span>
              </pre>
            </div>
            <div className="code-footer">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(charIndex / codeSnippets[currentSnippet].code.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="languages-section">
        <div className="languages-track">
          <div className="languages-scroll">
            {["JavaScript", "Python", "Java", "C++", "JavaScript", "Python", "Java", "C++"].map((lang, i) => (
              <div key={i} className="lang-chip">
                <span className="lang-icon">{lang === "JavaScript" ? "JS" : lang === "Python" ? "PY" : lang === "Java" ? "JV" : "C++"}</span>
                <span className="lang-name">{lang}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Everything you need to<br /><span className="gradient-text">code faster</span></h2>
          <p>Built for developers who want to ace their next technical interview</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div className="section-header">
          <h2>How it <span className="gradient-text">works</span></h2>
          <p>Get started in seconds, improve in minutes</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Pick a Problem</h3>
            <p>Choose from 150 curated LeetCode problems organized by category and difficulty</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">02</div>
            <h3>Select Your Language</h3>
            <p>Type solutions in JavaScript, Python, Java, or C++ — switch anytime</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">03</div>
            <h3>Type & Compete</h3>
            <p>Race against the clock, track your WPM, and climb the global leaderboard</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to type<br /><span className="gradient-text">like a pro?</span></h2>
          <p>Join developers worldwide who are leveling up their coding speed</p>
          <Link to="/signup" className="cta-primary large">
            <span>Start Free — No Credit Card</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
        <div className="cta-glow" />
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-icon">⌨️</span>
            <span>LeetType</span>
          </div>
          <p className="footer-credit">
            Built with ☕ by{" "}
            <a href="https://www.linkedin.com/in/ansh-kanyadi-994838284/" target="_blank" rel="noreferrer">
              Ansh Kanyadi
            </a>
          </p>
          <div className="footer-links">
            <a href="https://github.com/AnshKanyadi/leettype" target="_blank" rel="noreferrer">GitHub</a>
            <Link to="/problems">Problems</Link>
            <Link to="/leaderboards">Leaderboards</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
