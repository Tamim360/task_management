import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from "react-hot-toast";


const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    console.log(loading);
    if (loading) {
        console.log('loading');
        return <p>Loading...</p>
    }
    if(user && user?.uid) return children
    return <>
        {toast.error('Login first')}
        <Navigate to="/login" state={{from: location}} />
    </>
};

export default PrivateRoute;