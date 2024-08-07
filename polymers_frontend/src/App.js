import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Footer from './Components/Footer'; // Import the Footer component
import axios from 'axios'; // Assuming you have an axios instance set up in api.js

const App = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/search/history/all");
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory(); // Initial fetch
  }, []);

  return (
    <div className="container">
      <Router>
        <Main fetchHistory={fetchHistory} history={history} />
      </Router>
    </div>
  );
}

const Main = ({ fetchHistory, history }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated
  const hideNavbarPaths = ['/login', '/signup'];
  const hideFooterPaths = ['/login', '/signup']; // Paths to hide the footer

  return (
    <div className="content">
      {!hideNavbarPaths.includes(location.pathname) && isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<LoginPage />} /> {/* Show login page if not authenticated */}
            <Route path="/signup" element={<SignupPage />} /> {/* Show signup page if not authenticated */}
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} /> {/* Show homepage if authenticated */}
            <Route path="/search" element={<SearchPage fetchHistory={fetchHistory} searchHistory={history} />} />
            <Route path="/about" element={<AboutPage />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to homepage if route not found */}
      </Routes>
      {/* !hideFooterPaths.includes(location.pathname) && <Footer />} Conditionally render Footer */}
    </div>
  );
}

export default App;
