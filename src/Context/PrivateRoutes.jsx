import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../component/LoadingSpinner/LoadingSpinner';

const PrivateRoutes = ({children}) => {

    const {user, loading}=use(AuthContext)
     const location = useLocation();
    // console.log(location);

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && user?.email) {
        return children;

    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoutes;