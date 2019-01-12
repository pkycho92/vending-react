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

    componentDidMount() {
        this.getItems();
        this.getBalance();
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

    switchItemsHandler = (first, second) => {
        if (first >= this.state.items.length || second >= this.state.items.length) {
            return;
        }
        let newItems = [...this.state.items];
        let temp = newItems[first];
        newItems[first] = newItems[second];
        newItems[second] = temp;
        this.updateItemsHandler(newItems);
    }

    changePositionHandler = (function (t) {
        let exp = {};

        let firstTop = 15;
        let firstLeft = 15;
        let itemHeight = 150;
        let itemWidth = 125;
        let xPos;
        let yPos;
        let xItem;
        let yItem;
        let xItemDrop;
        let yItemDrop;
        let firstPos;
        let lastPos;

        let moved = (e) => {
            if (e.buttons === 0) {
                e.target.parentNode.parentNode.removeEventListener('mousemove', moved);
                let xDrop = e.clientX;
                let yDrop = e.clientY;
                yItemDrop = Math.floor((yDrop - firstTop) / (itemHeight + 30));
                xItemDrop = Math.floor((xDrop - firstLeft) / (itemWidth + 30));
                lastPos = (xItemDrop + yItemDrop * 3);
                if (lastPos >= t.state.items.length) {
                    return false;
                }
                t.switchItemsHandler(firstPos, lastPos);

            }
        }

        let click = (e) => {
            if (e.button === 0) {
                e.target.parentNode.parentNode.addEventListener('mousemove', moved);
                xPos = e.clientX;
                yPos = e.clientY;
                xItem = Math.floor((xPos - firstTop) / (itemWidth + 30));
                yItem = Math.floor((yPos - firstLeft) / (itemHeight + 30));
                firstPos = xItem + (yItem * 3);
            }
        }

        exp.click = click;
        return exp;
    }(this));

    render() {

        return (
            <div className={classes.VendingMachine}>
                <VendingItems changePos={this.changePositionHandler} deleteItem={this.deleteItemHandler} items={this.state.items} />
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