import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getProfile } from '../api';

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center text-white">Checking authentication…</div>;
  }

  if (!authorized) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
