import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isUserLoggedIn = localStorage.getItem("userInfo");

    if (!isUserLoggedIn) {
        // Redirect to the home page if the user is not logged in
        return <Navigate to="/" />;
    }

    return children;
};
