import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import MyTrips from "./pages/MyTrips";
import Budget from "./pages/Budget";
import Packing from "./pages/Packing";
import Notes from "./pages/Notes";
import Layout from "./layouts/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("traveloop_auth") === "true"
  );
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("traveloop_user") || "null")
  );

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("traveloop_auth", "true");
    localStorage.setItem("traveloop_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("traveloop_auth");
    localStorage.removeItem("traveloop_user");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/create" element={<CreateTrip />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/packing" element={<Packing />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
