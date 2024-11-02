import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import { Navigate } from 'react-router';

const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default/index')));
const ProductsManagement = Loadable(lazy(() => import('views/ProductsManagement/productmanagement')));
const Addproduct = Loadable(lazy(() => import('views/ProductsManagement/addproduct')));
const Editproduct = Loadable(lazy(() => import('views/ProductsManagement/editproduct')));





// ==============================|| MAIN ROUTES ||============================== //

const PrivateRoute = ({ component: Component, ...rest }) => {
  const AuthToken = localStorage.getItem("authToken");
  
  return AuthToken ? <Component {...rest} /> : <Navigate to="/" />;
};
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <PrivateRoute component={DashboardDefault} />
    },
    {
      path: '/productmanagement',
      element: <PrivateRoute component={ProductsManagement} />
    },
    {
      path: '/addproduct',
      element: <PrivateRoute component={Addproduct} />
    }, 
    {
      path: '/editproduct/:id',
      element: <PrivateRoute component={Editproduct} />
    }, 
  ]
};

export default MainRoutes;
