import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Home from "./container/Home";
import LandingPage  from "./container/LandingPage";
import Login from "./container/Login";
import Register from "./container/Register";
import Children from './container/Children';
import { useEffect, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { useGoogleLogin,UseGoogleLoginResponse } from 'react-google-login';
import { Provider } from "react-redux";




const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    useEffect(() => {
        const checkAuth = () => {
            if (localStorage.getItem('access_token') !== null) {
                setIsAuth(true);
            }
        };

        checkAuth();

        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);
    
    
    return (
        
            <Router>
                <Routes>
                    <Route path="/" element={isAuth ? <Home /> : <LandingPage />} />
                    <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
                    <Route path="/register" element={!isAuth ? <Register /> : <Home />} />
                   
                    <Route path="/home" element={isAuth ? <Home /> : <LandingPage />} />
                    <Route path="/children" element={isAuth ? <Children /> : <LandingPage />} />
                </Routes>
            </Router>
           
    );
}

export default App;