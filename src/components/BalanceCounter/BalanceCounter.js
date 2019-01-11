import React from 'react';

import classes from './BalanceCounter.css';

const balanceCounter = (props) => {
    let balance = <span className={classes.BalanceCounterTitle}>Loading...</span>

    if (props.balance !== "") {
        balance = <span className={classes.BalanceCounterTitle}>Current Balance: {props.balance}</span>
    }
    return (
        <div className={classes.BalanceCounter}>
            {balance}
            <input className={classes.BalanceCounterInput} type="button" value="Withdraw Balance" onClick={props.withdrawBalance} />
        </div>
    )
}

export default balanceCounter;