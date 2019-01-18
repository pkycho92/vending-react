import React, { Component } from 'react';

import MoneySlot from './MoneySlot/MoneySlot';
import NumberPad from './NumberPad/NumberPad';
import Screen from './Screen/Screen';

import classes from './Controls.css';

class Controls extends Component {

    state = {
        display: "$0",
        inputValue: "",
        balanceValue: 0,
    }

    checkInput = () => {
        const input = Number(this.state.inputValue);
        let price;
        if (input >= 0 && input < this.props.items.length) {
            price = this.props.items[input].price;
        }
        setTimeout(() => {
            if (input === 999) {
                if (this.props.isAuth) {
                    this.props.authOffControl()
                } else {
                    this.props.authOnControl();
                }
            }
            else if (input < 0 || input >= this.props.items.length) {
                this.setState({
                    display: "invalid input"
                })
            } else if (this.state.balanceValue < price) {
                this.setState({
                    display: price
                })
            } else {
                this.setState((prevState, props) => {
                    return {
                        display: "vending",
                        balanceValue: prevState.balanceValue - price
                    }
                });
                this.props.addToBalance(Number(price));

            }
            setTimeout(() => {
                this.setState({
                    display: '$' + this.state.balanceValue,
                    inputValue: ""
                })
            }, 2000);
        }, 1000);


    }


    numberClickedHandler = (char) => {

        if (this.state.inputValue.length > 2) {
            return;
        }

        if (this.state.inputValue.length === 2) {
            this.setState((prevState, props) => {
                return {
                    display: prevState.inputValue + char,
                    inputValue: prevState.inputValue + char
                }
            }, this.checkInput);

        } else {
            this.setState((prevState, props) => {
                return {
                    display: prevState.inputValue + char,
                    inputValue: prevState.inputValue + char
                }
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