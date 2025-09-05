import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireNoAuth = ({ children }) => {
  const isAuthenticated = useSelector(state => state.session?.isAuthenticated || false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireNoAuth;