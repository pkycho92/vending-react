import React from 'react';

import Spinner from './../UI/Spinner/Spinner';
import VendingItem from './VendingItem/VendingItem';
import classes from './VendingItems.css';

const vendingItems = (props) => {
    let items = <Spinner />

    if (props.items.length) {
        items = props.items.map((item) => {
            return <VendingItem key={item.position} name={item.name} position={item.position} price={item.price} image={item.image} auth={props.isAuth}
                deleteItem={(e) => { props.deleteItem(e, item.position) }} />
        });
    }



    return (
        <div onMouseDown={props.isAuth ? props.changePos.click : null} className={classes.VendingItemsWrapper}>
            <div className={classes.VendingItems}>{items}</div>
        </div>
    )
}

export default vendingItems;