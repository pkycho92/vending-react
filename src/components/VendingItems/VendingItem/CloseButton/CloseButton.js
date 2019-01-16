import React from 'react';

import classes from './CloseButton.css';

const closeButton = (props) => {
    let classList = classes.CloseButton + " close"; 
    return (
        <div className={classList} onClick={props.deleteItem}>x</div>
    )
}

export default closeButton;