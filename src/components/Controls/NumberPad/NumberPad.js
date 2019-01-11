import React from 'react'

import classes from './NumberPad.css'

const numberPad = (props) => {

    const numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(<span key={i} className={classes.Number} onClick={() => props.setSelection(i.toString())}>{i}</span>)
        if (i % 3 === 0) {
            numbers.push(<br key={'br'+i}/>)
        }
    }

    return (
        <div className={classes.NumberWrapper}>
            <div className={classes.Numbers}>
                {numbers}
            </div>
        </div>
    )
}

export default numberPad