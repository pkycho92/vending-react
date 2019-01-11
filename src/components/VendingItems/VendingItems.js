import React from 'react';

import Spinner from './../UI/Spinner/Spinner';
import VendingItem from './VendingItem/VendingItem';
import classes from './VendingItems.css';

const vendingItems = (props) => {
    let items = <Spinner />

    if (props.items.length) {
        items = props.items.map((item) => {
            return <VendingItem key={item.position} name={item.name} position={item.position} price={item.price} image={item.image}
                deleteItem={() => { props.deleteItem(item.position) }} />
        });
    }



    return (
        <div className={classes.VendingItemsWrapper}>
            <div className={classes.VendingItems}>{items}</div>
        </div>
    )
}

export default vendingItems;