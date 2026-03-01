import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Initialize token from localStorage to persist session
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // When the app loads, if there's a token, try to load the user data
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const login = (authData) => {
    // Store token and user data in both state and localStorage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  };

  const logout = () => {
    // Clear everything on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // The value provided to consuming components
  const authValue = { user, token, isAuthenticated: !!token, login, logout };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

// Custom hook to easily access the context
export const useAuth = () => {
  return useContext(AuthContext);
};