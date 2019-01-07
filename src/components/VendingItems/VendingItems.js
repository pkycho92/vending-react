import React from 'react';

import VendingItem from './VendingItem/VendingItem';
import classes from './VendingItems.css';

const vendingItems = (props) => {

    const items = props.items.map((item => {
        return <VendingItem name={item.name} price={item.price} image={item.image} />
    }));

    return (
        <div className={classes.VendingItemsWrapper}>
            <div className={classes.VendingItems}>{items}</div>
        </div>
    )
}

export default vendingItems;