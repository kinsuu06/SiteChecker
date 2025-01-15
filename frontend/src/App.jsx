import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import PricingPlans from "./pages/PricingPlans";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AnalysisForm from "./components/AnalysisForm";
import ReportDisplay from "./components/ReportDisplay";
import MyAccount from "./pages/MyAccount";
import FeaturePage from "./pages/feature";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // Username will be dynamically fetched
  const [reportData, setReportData] = useState(null); // Report data will be fetched dynamically

  // Initialize app authentication state
  const init = async () => {
    const rawToken = localStorage.getItem("tokens");
    if (rawToken) {
      try {
        // Fetch user data from backend
        const res = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${JSON.parse(rawToken).accessToken}`,
          },
        });
        if (res.ok) {
          const userData = await res.json();
          setIsAuthenticated(true);
          setUsername(userData.username); // Set the username from backend
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setIsAuthenticated(false);
      }
    }
  };

  const onLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("tokens"); // Clear tokens on logout
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar isLoggedIn={isAuthenticated} username={username} onLogout={onLogout} />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPlans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Signup onSignup={onLogin} />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route
              path="/my-account"
              element={
                isAuthenticated ? (
                  <MyAccount username={username} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/analysis" element={<AnalysisForm setReportData={setReportData} />} />
            <Route path="/report" element={<ReportDisplay reportData={reportData} />} />
            <Route path="/feature" element={<FeaturePage />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
