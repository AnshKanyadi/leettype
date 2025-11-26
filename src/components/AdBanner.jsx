import { useSubscription } from "../context/SubscriptionContext";
import { Link } from "react-router-dom";
import "./AdBanner.css";

export function AdBanner({ position = "bottom", size = "leaderboard" }) {
  const { isPro, loading } = useSubscription();

  if (loading || isPro) return null;

  const sizeClasses = {
    leaderboard: "ad-leaderboard",
    rectangle: "ad-rectangle",
    banner: "ad-banner",
    skyscraper: "ad-skyscraper",
  };

  return (
    <div className={`ad-container ${sizeClasses[size]} ${position}`}>
      <div className="ad-placeholder">
        <div className="ad-content">
          <span className="ad-label">Advertisement</span>
          <div className="ad-promo">
            <span className="promo-icon">⚡</span>
            <span className="promo-text">
              Remove ads with <strong>LeetType Pro</strong>
            </span>
            <Link to="/pricing" className="promo-btn">
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarAd() {
  const { isPro, loading } = useSubscription();

  if (loading || isPro) return null;

  return (
    <div className="sidebar-ad">
      <div className="sidebar-ad-inner">
        <span className="ad-label">Sponsored</span>
        <div className="sidebar-ad-content">
          <div className="sidebar-promo">
            <span className="promo-emoji">🚀</span>
            <h4>Go Pro</h4>
            <p>Get analytics, leaderboards, and more!</p>
            <Link to="/pricing" className="sidebar-promo-btn">
              $7/month →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InlineAd() {
  const { isPro, loading } = useSubscription();

  if (loading || isPro) return null;

  return (
    <div className="inline-ad">
      <div className="inline-ad-content">
        <span className="ad-label">Ad</span>
        <p>
          <strong>Tired of ads?</strong> Upgrade to Pro for an ad-free experience
          and unlock premium features.{" "}
          <Link to="/pricing">Learn more →</Link>
        </p>
      </div>
    </div>
  );
}

export function InterstitialAd({ onClose }) {
  const { isPro, loading } = useSubscription();

  if (loading || isPro) {
    onClose?.();
    return null;
  }

  return (
    <div className="interstitial-overlay" onClick={onClose}>
      <div className="interstitial-content" onClick={(e) => e.stopPropagation()}>
        <button className="interstitial-close" onClick={onClose}>
          ×
        </button>
        <div className="interstitial-inner">
          <span className="ad-label">Advertisement</span>
          <div className="interstitial-promo">
            <div className="promo-header">
              <span className="promo-icon-large">⌨️✨</span>
              <h3>Upgrade to LeetType Pro</h3>
            </div>
            <ul className="promo-list">
              <li>📊 Detailed Analytics</li>
              <li>🏆 Full Leaderboard Access</li>
              <li>🎖️ Achievements & Badges</li>
              <li>🚫 No Advertisements</li>
            </ul>
            <Link to="/pricing" className="interstitial-cta">
              Get Pro — $7/month
            </Link>
            <button className="skip-btn" onClick={onClose}>
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

