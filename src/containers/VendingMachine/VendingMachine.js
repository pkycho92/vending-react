import React, { Component } from 'react';

import VendingItems from '../../components/VendingItems/VendingItems';
import Controls from '../../components/Controls/Controls';
import classes from './VendingMachine.css';
import NewItem from '../NewItem/NewItem';
import BalanceCounter from '../../components/BalanceCounter/BalanceCounter';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-vending'

class VendingMachine extends Component {
    state = {
        balance: "",
        items: [],
    }

    getItems = () => {
        axios.get('items.json')
            .then(response => {
                if (response.data) {
                    console.log(response.data);
                    this.setState({ items: Object.values(response.data.items) });
                }
            })

    }

    getBalance = () => {
        axios.get('balance.json')
            .then(response => {
                if (response.data) {
                    this.setState({ balance: response.data.balance });
                }
            })
    }

    componentDidMount() {
        this.getItems();
        this.getBalance();
    }

    addToBalanceHandler = (amount) => {
        axios.put('balance.json', { balance: Number(this.state.balance) + amount })
            .then(response => {
                this.setState({ balance: response.data.balance });
            })
    }

    withdrawBalanceHandler = () => {
        axios.put('balance.json', { balance: 0 })
            .then(response => {
                this.setState({ balance: response.data.balance });
            })
    }

    updateItemsHandler = (items) => {
        axios.put('items.json', { items: items })
            .then(response => {
                if (response.data) {
                    this.setState({ items: response.data.items });
                } else {
                    this.setState({ items: [] })
                }
            })
    }

    addItemHandler = (newItem) => {
        let newItems = [...this.state.items];
        newItems.push(newItem);
        this.updateItemsHandler(newItems);
    }

    deleteItemHandler = (pos) => {

        let newItems = [...this.state.items];
        newItems.splice(pos, 1);
        for (let i = pos; i < newItems.length; i++) {
            newItems[i].position = i;
        }
        this.updateItemsHandler(newItems);
    }

    setSelectionHandler = (code) => {
        this.addToBalanceHandler(this.state.items[code].price)
    }


    render() {

        return (
            <div className={classes.VendingMachine}>
                <VendingItems deleteItem={this.deleteItemHandler} items={this.state.items} />
                <div>
                    <BalanceCounter balance={this.state.balance} withdrawBalance={this.withdrawBalanceHandler} />
                    <Controls
                        items={this.state.items}
                        addToBalance={this.addToBalanceHandler} />
                </div>

                <NewItem items={this.state.items} updateItems={this.getItems} addItem={this.addItemHandler} />
            </div>
        )
    }
}

export default VendingMachine;