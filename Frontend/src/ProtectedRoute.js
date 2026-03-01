import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    const defaultPath = user?.role === 'admin' ? '/onlinevoting' : '/voting';
    return <Navigate to={defaultPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
