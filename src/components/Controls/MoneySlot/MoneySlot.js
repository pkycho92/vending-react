import React from 'react'

import dollar from '../../../assets/images/dollar.jpeg'
import quarter from '../../../assets/images/quarter.png'
import refund from '../../../assets/images/refund.png'
import classes from './MoneySlot.css';

const moneySlot = (props) => {
    return (
        <div>
            <img className={classes.MoneySlot} alt="" src={dollar}
                onClick={props.addDollar} />
            <img className={classes.MoneySlot} alt="" src={quarter}
                onClick={props.addQuarter} />
            <img className={classes.MoneySlot} alt="" src={refund}
                onClick={props.refundBalance} />
        </div>
    )
}

export default moneySlot;