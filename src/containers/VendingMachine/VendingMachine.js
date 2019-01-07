import React, { Component } from 'react';

import VendingItems from '../../components/VendingItems/VendingItems';
import Controls from '../../components/Controls/Controls';
import classes from './VendingMachine.css';
import NewItem from '../NewItem/NewItem';
import axios from '../../axios'

class VendingMachine extends Component {
    state = {
        balance: 0,
        credit: 0,
        items: [{ name: 'pepsi', price: '1', image: '1' }, { name: 'pepsi', price: '1', image: '1' }, { name: 'pepsi', price: '1', image: '1' },
        { name: 'pepsi', price: '1', image: '1' }, { name: 'pepsi', price: '1', image: '1' }, { name: 'pepsi', price: '1', image: '1' },
        { name: 'pepsi', price: '1', image: '1' }, { name: 'pepsi', price: '1', image: '1' }, { name: 'pepsi', price: '1', image: '1' }],
        selection: ""
    }

    addToBalanceHandler = (amount) => {
        this.setState((prevState, props) => {
            return {
                balance: prevState.balance + amount
            }
        })
    }

    withdrawBalanceHandler = () => {
        this.setState({
            balance: 0
        })
    }

    setSelectionHandler = (code) => {
        this.setState({
            selection: code
        })
    }



    render() {
        return (
            <div className={classes.VendingMachine}>
                <VendingItems
                    items={this.state.items} />
                <Controls
                    credit={this.state.credit}
                    setSelection={this.setSelectionHandler}
                    addToBalance={this.addToBalanceHandler}
                    refundBalance={this.refundBalanceHandler} />
                <NewItem />
            </div>
        )
    }
}

export default VendingMachine;