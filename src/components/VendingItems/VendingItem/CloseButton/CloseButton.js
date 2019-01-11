import React from 'react';

import classes from './CloseButton.css';

const closeButton = (props) => {
    return (
        <div className={classes.CloseButton} onClick={props.deleteItem}>x</div>
    )
}

export default closeButton;