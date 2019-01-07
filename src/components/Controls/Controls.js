import React, { Component } from 'react';

import MoneySlot from './MoneySlot/MoneySlot';
import NumberPad from './NumberPad/NumberPad';
import Screen from './Screen/Screen';

import classes from './Controls.css';

class Controls extends Component {

    state = {
        display: "",
        inputValue: "",
        balanceValue: 0,
    }

    numberClickedHandler = (char) => {
        this.setState((prevState, props) => {
            return {
                display: prevState.inputValue + char,
                inputValue: prevState.inputValue + char
            }
        })
        if (this.state.inputValue.length === 3) {
            this.setState({
                display: char,
                inputValue: char
            })
        }
    }

    dollarAddedHandler = () => {
        this.setState((prevState, props) => {
            return {
                display: "$" + (prevState.balanceValue + 1),
                balanceValue: prevState.balanceValue + 1,
                inputValue: ""
            }
        })
    }

    quarterAddedHandler = () => {
        this.setState((prevState, props) => {
            return {
                display: "$" + (prevState.balanceValue + .25),
                balanceValue: prevState.balanceValue + .25,
                inputValue: ""
            }
        })
    }

    refundBalanceHandler = () => {
        this.setState({
            display: 0,
            balanceValue: 0
        })
    }

    render() {
        return (
            <div className={classes.ControlsWrapper}>
                <div className={classes.Controls}>
                    <Screen display={this.state.display} />
                    <NumberPad setSelection={this.numberClickedHandler} />
                    <MoneySlot
                        addDollar={this.dollarAddedHandler}
                        addQuarter={this.quarterAddedHandler}
                        refundBalance={this.refundBalanceHandler} />
                </div>
            </div>
        )
    }
}

export default Controls;