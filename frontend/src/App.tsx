import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Home from "./container/Home";
import LandingPage  from "./container/LandingPage";
import Login from "./container/Login";
import Register from "./container/Register";
import Children from './container/Children';
import Settings from './container/Settings';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
    const [isAuth, setIsAuth] = useState(false);

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
        <GoogleOAuthProvider clientId='886096327470-35ou6vst901nf69hut690tj8inrjpe6v.apps.googleusercontent.com'>
            <Router>
                <Routes>
                    <Route path="/" element={isAuth ? <Home /> : <LandingPage />} />
                    <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth}/> : <Home />} />
                    <Route path="/register" element={!isAuth ? <Register /> : <Home />} />
                    <Route path="/home" element={isAuth ? <Home /> : <LandingPage />} />
                    <Route path="/children" element={isAuth ? <Children /> : <LandingPage />} />
                    <Route path="/settings" element={isAuth ? <Settings /> : <LandingPage />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;