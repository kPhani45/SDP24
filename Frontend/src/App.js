import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import PageWrapper from "./components/PageWrapper";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'; 

const Navbar = lazy(() => import('./nav/NavBar'));
const Home = lazy(() => import('./nav/pages/Home'));
const About = lazy(() => import('./nav/pages/About'));
const Service = lazy(() => import('./nav/pages/Service'));
const Onlinevoting = lazy(() => import('./nav/pages/Onlinevoting'));
const Contact = lazy(() => import('./nav/pages/Contact'));
const LogIn = lazy(() => import("./nav/pages/LogIn"));
const Voting = lazy(() => import("./nav/pages/Voting"));
const Signup = lazy(() => import("./nav/pages/signup"));
const Result = lazy(() => import("./nav/pages/result"));
const Createdpoll = lazy(() => import("./nav/pages/createdpoll"));
const Footer = lazy(() => import('./nav/fotter'));

const Profile = lazy(() => import('./nav/pages/Profile'));


const App = () => {
  
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/poll');
        setPollData(res.data);
      } catch (err) {
        console.error("Failed to fetch poll data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, []);
  const refreshPollData = async () => {
     try {
        const res = await axios.get('http://localhost:5000/api/poll');
        setPollData(res.data);
      } catch (err) {
        console.error("Failed to refresh poll data:", err);
      }
  }

 
  if (loading) {
    return <div className="page-loader">Loading Poll Data...</div>;
  }

  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
         
          <div className="app-container">
            <ScrollToTop />
            <Suspense fallback={<div className="page-loader">Loading Page...</div>}>
              <Navbar />
              <main className="content-wrap">
                <Routes>
                 
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/service" element={<PageWrapper><Service /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
                  <Route path="/voting" element={
                    <ProtectedRoute>
                      <PageWrapper><Voting pollData={pollData} onVoteSuccess={refreshPollData} /></PageWrapper>
                    </ProtectedRoute>
                  } />
                  <Route path="/result" element={
                    <ProtectedRoute>
                      <PageWrapper><Result pollData={pollData} /></PageWrapper>
                    </ProtectedRoute>
                  } />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <PageWrapper><Profile /></PageWrapper>
                    </ProtectedRoute>
                  } />

                  <Route path="/onlinevoting" element={
                    <ProtectedRoute role="admin">
                      <PageWrapper><Onlinevoting /></PageWrapper>
                    </ProtectedRoute>
                  } />
                  <Route path="/createdpoll" element={
                    <ProtectedRoute role="admin">
                      <PageWrapper><Createdpoll /></PageWrapper>
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </Suspense>
          </div>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default App;