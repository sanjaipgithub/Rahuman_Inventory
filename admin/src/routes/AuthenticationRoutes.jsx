import React from 'react';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom'; // Ensure correct import path for Navigate

// project imports
import Loadable from 'component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('../views/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/Register')));

// ==============================|| AUTHENTICATION ROUTES ||============================== //

const AuthToken = localStorage.getItem('authToken');

const PrivateRoute = ({ component: Component }) => {
  return AuthToken ? <Navigate to="/dashboard/default" /> : <Component />;
};

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <PrivateRoute component={AuthLogin} />
    },
    {
      path: '/register',
      element: <PrivateRoute component={AuthRegister} />
    }
  ]
};

export default AuthenticationRoutes;
