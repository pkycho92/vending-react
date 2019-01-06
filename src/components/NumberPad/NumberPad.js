import React from 'react'

import classes from './NumberPad.css'

const numberPad = (props) => {

    const numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(<span onClick="">{i}</span>)
    }

    return (
        <div>
            <input type="text" readonly />
            <div className={classes.Numbers}>
                {numbers}
            </div>
        </div>
    )
}