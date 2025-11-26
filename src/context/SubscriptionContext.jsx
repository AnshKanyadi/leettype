import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const SubscriptionContext = createContext();

const PLAN_FEATURES = {
  free: {
    name: "Free",
    leaderboardAccess: false,
    analyticsAccess: false,
    unlimitedHistory: false,
    customUsername: false,
    achievements: false,
    streakTracking: false,
    shareCards: false,
    noAds: false,
    historyLimit: 10,
  },
  pro: {
    name: "Pro",
    leaderboardAccess: true,
    analyticsAccess: true,
    unlimitedHistory: true,
    customUsername: true,
    achievements: true,
    streakTracking: true,
    shareCards: true,
    noAds: true,
    historyLimit: Infinity,
  },
};

export function SubscriptionProvider({ children }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState(PLAN_FEATURES.free);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setFeatures(PLAN_FEATURES.free);
      setIsPro(false);
      setLoading(false);
      return;
    }

    let foundPro = false;
    const unsubscribers = [];

    // Check for active subscriptions (monthly/annual)
    const subscriptionsRef = collection(db, "customers", user.uid, "subscriptions");
    const unsubSubs = onSnapshot(
      subscriptionsRef,
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const status = data.status;
          
          if (status === "active" || status === "trialing") {
            foundPro = true;
            setSubscription({ id: doc.id, ...data, isActive: true, type: "subscription" });
            setFeatures(PLAN_FEATURES.pro);
            setIsPro(true);
          } else if (status === "canceled" && data.current_period_end) {
            const endDate = data.current_period_end.toDate ? 
              data.current_period_end.toDate() : 
              new Date(data.current_period_end.seconds * 1000);
            if (endDate > new Date()) {
              foundPro = true;
              setSubscription({ id: doc.id, ...data, isActive: true, type: "subscription" });
              setFeatures(PLAN_FEATURES.pro);
              setIsPro(true);
            }
          }
        });
        setLoading(false);
      },
      (error) => {
        console.error("Subscription listener error:", error);
        setLoading(false);
      }
    );
    unsubscribers.push(unsubSubs);

    // Check for lifetime purchases via checkout_sessions
    const checkoutRef = collection(db, "customers", user.uid, "checkout_sessions");
    const unsubCheckout = onSnapshot(
      checkoutRef,
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          
          // Check for lifetime purchase (mode: "payment" means one-time)
          // If sessionId exists and mode is "payment", it's likely a completed lifetime purchase
          if (data.mode === "payment" && data.sessionId) {
            // Additional check: if metadata.plan is "lifetime" or price matches lifetime price
            const isLifetime = 
              data.metadata?.plan === "lifetime" ||
              data.price === "price_1SXpUEBY1OHZEBZjd8RVHcKm";
            
            if (isLifetime) {
              foundPro = true;
              setSubscription({ id: doc.id, ...data, isActive: true, type: "lifetime" });
              setFeatures(PLAN_FEATURES.pro);
              setIsPro(true);
            }
          }
          
          // Also check if payment_status is "paid" or status is "complete"
          if (data.payment_status === "paid" || data.status === "complete") {
            if (data.mode === "payment") {
              foundPro = true;
              setSubscription({ id: doc.id, ...data, isActive: true, type: "lifetime" });
              setFeatures(PLAN_FEATURES.pro);
              setIsPro(true);
            }
          }
        });
        
        if (!foundPro) {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Checkout sessions listener error:", error);
      }
    );
    unsubscribers.push(unsubCheckout);

    // Check for payments collection (some setups store here)
    const paymentsRef = collection(db, "customers", user.uid, "payments");
    const unsubPayments = onSnapshot(
      paymentsRef,
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.status === "succeeded") {
            foundPro = true;
            setSubscription({ id: doc.id, ...data, isActive: true, type: "lifetime" });
            setFeatures(PLAN_FEATURES.pro);
            setIsPro(true);
          }
        });
      },
      (error) => {
        // payments collection might not exist, that's ok
      }
    );
    unsubscribers.push(unsubPayments);

    // Timeout to stop loading if nothing found
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      unsubscribers.forEach(unsub => unsub());
      clearTimeout(timeout);
    };
  }, [user]);

  const checkFeature = useCallback((feature) => {
    return features[feature] || false;
  }, [features]);

  const value = {
    subscription,
    isPro,
    features,
    checkFeature,
    loading,
    planName: isPro ? "Pro" : "Free",
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
}
