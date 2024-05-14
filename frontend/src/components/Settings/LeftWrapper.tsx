import React from 'react';
import { useState } from "react";
import { createUseStyles } from "react-jss";
import ChangePasswdForm from "./ChangePasswdForm";

const useStyle = createUseStyles({
    
});


const LeftWrapper = () => {
  const classes = useStyle();
  return (
    <div>
        <ChangePasswdForm/>
    </div>
  );
};

export default LeftWrapper;