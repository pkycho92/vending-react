import React from 'react';

import classes from './Screen.css'

const screen = (props) => {
    return <input className={classes.Screen} value={props.display} readOnly/>
}

export default screen;