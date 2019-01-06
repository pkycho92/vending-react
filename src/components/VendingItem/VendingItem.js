import React, { Component } from "react";

import classes from "./VendingItem.css";

const vendingItem = (props) => {
    return (
        <div>
            <div>{props.name}</div>
            <div>{props.price}</div>
            <img src={props.image} alt=""/>
        </div>
    )
};

export default vendingItem;