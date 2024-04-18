import React from 'react';
import { Navigate ,useLocation} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useUser } from '../context/UserContext';
const ProtectedRoute = ({children}) => {
  const { authenticated } = useUser();
    let location = useLocation();

    if(!authenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;