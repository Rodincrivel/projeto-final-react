// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const admin = localStorage.getItem('admin');
  return admin ? children : <Navigate to="/" />;
}

export default PrivateRoute;
