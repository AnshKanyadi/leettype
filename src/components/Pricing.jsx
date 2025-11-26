import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSubscription } from "../context/SubscriptionContext";
import { db } from "../firebase";
import { doc, setDoc, addDoc, collection, onSnapshot } from "firebase/firestore";
import "./Pricing.css";

const STRIPE_PRICES = {
  monthly: "price_1SXpRzBY10HZEBZjLwUflFgc",
  annual: "price_1SXpSwBY10HZEBZjfmtTakFo",
  lifetime: "price_1SXpUEBY10HZEBZjd8RVHcKm",
};

export default function Pricing() {
  const { user } = useAuth();
  const { isPro } = useSubscription();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("annual");

  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: "$7",
      period: "/month",
      description: "Perfect for trying out Pro",
      savings: null,
    },
    {
      id: "annual",
      name: "Annual",
      price: "$49",
      period: "/year",
      description: "Best value — save 42%",
      savings: "Save $35",
      popular: true,
    },
    {
      id: "lifetime",
      name: "Lifetime",
      price: "$149",
      period: "one-time",
      description: "Pay once, Pro forever",
      savings: "Best Deal",
    },
  ];

  const features = [
    { name: "All 150 NeetCode Problems", free: true, pro: true },
    { name: "All 4 Languages", free: true, pro: true },
    { name: "Unlimited Practice", free: true, pro: true },
    { name: "Personal WPM Tracking", free: true, pro: true },
    { name: "Anti-Cheat Protection", free: true, pro: true },
    { name: "Full Leaderboard Access", free: false, pro: true },
    { name: "Analytics Dashboard", free: false, pro: true },
    { name: "Custom Username Display", free: false, pro: true },
    { name: "Unlimited History", free: false, pro: true },
    { name: "Achievements & Badges", free: false, pro: true },
    { name: "Streak Tracking", free: false, pro: true },
    { name: "Shareable Score Cards", free: false, pro: true },
    { name: "No Advertisements", free: false, pro: true },
    { name: "Priority Support", free: false, pro: true },
  ];

  async function handleCheckout() {
    if (!user) {
      navigate("/signup");
      return;
    }

    if (isPro) {
      navigate("/account");
      return;
    }

    setLoading(true);

    try {
      const checkoutRef = await addDoc(
        collection(db, "customers", user.uid, "checkout_sessions"),
        {
          price: STRIPE_PRICES[selectedPlan],
          success_url: window.location.origin + "/account?success=true",
          cancel_url: window.location.origin + "/pricing?canceled=true",
          mode: selectedPlan === "lifetime" ? "payment" : "subscription",
          metadata: {
            userId: user.uid,
            plan: selectedPlan,
          },
        }
      );

      onSnapshot(checkoutRef, (snap) => {
        const { error, url } = snap.data() || {};
        if (error) {
          console.error("Checkout error:", error.message);
          alert("Payment error: " + error.message);
          setLoading(false);
        }
        if (url) {
          window.location.assign(url);
        }
      });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="pricing-page">
      <nav className="pricing-nav">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">⌨️</span>
          <span className="brand-text">LeetType</span>
        </Link>
        <div className="nav-actions">
          {user ? (
            <Link to="/problems" className="nav-link">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-cta">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Upgrade to <span className="gradient-text">Pro</span></h1>
          <p>Unlock the full LeetType experience</p>
        </div>

        {isPro && (
          <div className="already-pro-banner">
            <span>✨</span>
            <span>You're already a Pro member!</span>
            <Link to="/account">Manage Subscription →</Link>
          </div>
        )}

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlan === plan.id ? "selected" : ""} ${plan.popular ? "popular" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              {plan.savings && <div className="savings-badge">{plan.savings}</div>}
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-radio">
                <div className={`radio-dot ${selectedPlan === plan.id ? "active" : ""}`} />
              </div>
            </div>
          ))}
        </div>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading || isPro}
        >
          {loading ? (
            <span className="loading-spinner">Processing...</span>
          ) : isPro ? (
            "Already Pro ✨"
          ) : (
            <>
              <span>Get Pro — {plans.find(p => p.id === selectedPlan)?.price}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>

        <p className="checkout-info">
          Secure payment powered by Stripe. Cancel anytime.
        </p>

        <div className="features-comparison">
          <h2>Compare Plans</h2>
          <div className="comparison-table">
            <div className="table-header">
              <div className="feature-name">Feature</div>
              <div className="plan-col free">Free</div>
              <div className="plan-col pro">Pro</div>
            </div>
            {features.map((feature, i) => (
              <div key={i} className="table-row">
                <div className="feature-name">{feature.name}</div>
                <div className="plan-col free">
                  {feature.free ? (
                    <span className="check">✓</span>
                  ) : (
                    <span className="cross">—</span>
                  )}
                </div>
                <div className="plan-col pro">
                  {feature.pro ? (
                    <span className="check">✓</span>
                  ) : (
                    <span className="cross">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>Yes! You can cancel your subscription at any time from your account settings. You'll keep Pro access until the end of your billing period.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, debit cards, and Apple Pay through our secure Stripe payment system.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a refund policy?</h4>
              <p>Yes, we offer a 7-day money-back guarantee. If you're not satisfied, contact us for a full refund.</p>
            </div>
            <div className="faq-item">
              <h4>What happens to my data if I downgrade?</h4>
              <p>Your data is always safe. If you downgrade, you'll keep your history but lose access to Pro features like analytics and full leaderboards.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="pricing-footer">
        <p>© 2024 LeetType. Made by Ansh Kanyadi</p>
      </footer>
    </div>
  );
}

