import { createUseStyles } from "react-jss";
import React from 'react';
import Navbar from "../components/DefaultPageTemplate/Navbar";
import MainWrapper from "../components/Settings/MainWrapper";

const useStyle = createUseStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        height: '100vh',
        backgroundColor: '#F0ECE5',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5rem',
        height: '100%',
        width: '100%', 
    },
});

const Settings = () => {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Navbar/>
                <MainWrapper/>
            </div>
        </div>
        
      );
};

export default Settings;