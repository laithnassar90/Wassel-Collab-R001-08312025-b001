import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector(state => state.session?.isAuthenticated || false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?next=${redirect}`);
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? children : null;
};

export default RequireAuth;
