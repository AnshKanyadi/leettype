import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TestArea from "./components/TestArea";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";
import Leaderboard from "./components/Leaderboard";
import { useAuth } from "./context/AuthContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import Home from "./components/Home";
import Problems from "./components/Problems";
import LeaderboardProblem from "./components/LeaderboardProblem";
import AllLeaderboards from "./components/AllLeaderboards";
import Pricing from "./components/Pricing";
import Analytics from "./components/Analytics";
import Achievements from "./components/Achievements";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<PrivateRoute><TestArea /></PrivateRoute>} />
      <Route path="/app/:id" element={<PrivateRoute><TestArea /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
      <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
      <Route path="/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
      <Route path="/leaderboard/:id" element={<LeaderboardProblem />} />
      <Route path="/problems" element={<PrivateRoute><Problems /></PrivateRoute>} />
      <Route path="/leaderboards" element={<PrivateRoute><AllLeaderboards /></PrivateRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SubscriptionProvider>
        <AppRoutes />
      </SubscriptionProvider>
    </BrowserRouter>
  );
}
