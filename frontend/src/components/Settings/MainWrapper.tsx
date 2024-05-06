import { useState } from "react";
import { createUseStyles } from "react-jss";
import LeftWrapper from "./LeftWrapper";
import RightWrapper from "./RightWrapper";

const useStyle = createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#F0ECE5',
    paddingTop: '100px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '60%', 
    backgroundColor: '#B6BBC4',
    borderRadius: '20px', 
    border: '1px solid #ccc', 
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', 
  },
  passwordText: { 
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#F0ECE5',
    marginTop: '1rem',
    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3rem',
    width: '100%',
    padding: '1rem',
  },
  halfWidth: { 
    width: '50%',
  },
});


const MainWrapper = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <p className={classes.passwordText}>Zmień hasło</p>
        <div className={classes.section}>
            <div className={classes.halfWidth}><LeftWrapper/></div> 
            <div className={classes.halfWidth}><RightWrapper/></div> 
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;