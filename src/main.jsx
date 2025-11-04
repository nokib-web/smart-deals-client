import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Layouts/Root.jsx';
import Home from './component/Home/Home.jsx';
import AllProducts from './component/AllProducts/AllProducts.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import Register from './Pages/Register.jsx';
import MyProducts from './Pages/MyProducts/MyProducts.jsx';
import MyBids from './Pages/MyBids/MyBids.jsx';
import CreateProducts from './Pages/CreateProducts/CreateProducts.jsx';
import PrivateRoutes from './Context/PrivateRoutes.jsx';
import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx';
import Login from './Pages/Login/Login.jsx';
import LoadingSpinner from './component/LoadingSpinner/LoadingSpinner.jsx';
import Profile from './Pages/Profile/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/all-products',
        loader: ()=> fetch('https://smart-deals-server.onrender.com/products'),
        Component: AllProducts
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/my-products',
        element: <PrivateRoutes>
          <MyProducts></MyProducts>
        </PrivateRoutes>
      },
      {
        path: '/my-bids',
        element: <PrivateRoutes>
          <MyBids></MyBids>
        </PrivateRoutes>
      },
      {
        path: '/create-products',
        Component: CreateProducts
      },
      {
        path: '/productDetails/:id',
        loader: ({params})=>fetch(`https://smart-deals-server.onrender.com/products/${params.id}`),
        Component: ProductDetails
      },
      {
        path:'/profile',
        Component: Profile
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} >
        
      </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
