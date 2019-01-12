import React, { Component } from "react";

import CloseButton from './CloseButton/CloseButton';
import classes from "./VendingItem.css";

const vendingItem = (props) => {
    return (

        <div className={classes.VendingItem}>
            <div className={classes.VendingItemName} >{props.name}</div>
            <CloseButton deleteItem={props.deleteItem}/>
            <div className={classes.VendingItemPosition}>{props.position}</div>
            <div className={classes.VendingItemPrice} >{props.price}</div>
            <img className={classes.VendingItemImage} src={props.image} alt="" draggable="false" />
        </div>
    )
};

export default vendingItem;