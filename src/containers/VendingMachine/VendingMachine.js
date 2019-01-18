import React, { Component } from 'react';
import { connect } from 'react-redux';

import VendingItems from '../../components/VendingItems/VendingItems';
import Controls from '../../components/Controls/Controls';
import classes from './VendingMachine.css';
import NewItem from '../NewItem/NewItem';
import BalanceCounter from '../../components/BalanceCounter/BalanceCounter';

import * as actionCreators from '../../store/actions/actionCreators';

class VendingMachine extends Component {

    componentDidMount() {
        this.props.getItems();
        this.props.getBalance();
    }

    addItemHandler = (newItem) => {
        let newItems = [...this.props.items];
        newItems.push(newItem);
        this.props.updateItems(newItems);
    }

    deleteItemHandler = (e, pos) => {
        let newItems = [...this.props.items];
        newItems.splice(pos, 1);
        for (let i = pos; i < newItems.length; i++) {
            newItems[i].position = i;
        }
        this.props.updateItems(newItems);
    }

    setSelectionHandler = (code) => {
        this.props.addBalance(this.props.items[code].price);
    }

    switchItemsHandler = (first, second) => {
        if (first >= this.props.items.length || second >= this.props.items.length) {
            return;
        }
        console.log("shold be differ", first, second);
        let newItems = [...this.props.items];
        let temp = newItems[first];
        newItems[first] = newItems[second];
        newItems[first].position = first;
        newItems[second] = temp;
        newItems[second].position = second;
        this.props.updateItems(newItems);
        console.log(newItems[first].position, newItems[second].position);
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
                if (lastPos >= t.props.items.length) {
                    return false;
                }
                t.switchItemsHandler(firstPos, lastPos);

            }
        }

        let click = (e) => {
            if (e.button === 0) {
                if (e.target.classList.contains("close")) {
                    return false;
                }
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
                <VendingItems changePos={this.changePositionHandler} deleteItem={this.deleteItemHandler} items={this.props.items} />
                <div>
                    {this.props.isAuth ? <BalanceCounter balance={this.props.balance} withdrawBalance={this.props.withdrawBalance} /> : null}
                    <Controls
                        items={this.props.items}
                        addToBalance={(amount) => this.props.addBalance(this.props.balance, amount)}
                        isAuth={this.props.isAuth}
                        authOnControl={this.props.authOn}
                        authOffControl={this.props.authOff} />
                </div>
                {this.props.isAuth ? <NewItem items={this.props.items} addItem={this.addItemHandler} /> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        balance: state.balance,
        items: state.items,
        isAuth: state.isAuth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getItems: () => dispatch(actionCreators.getItems()),
        updateItems: (items) => dispatch(actionCreators.updateItems(items)),
        getBalance: () => dispatch(actionCreators.getBalance()),
        addBalance: (balance, amount) => dispatch(actionCreators.addBalance(balance, amount)),
        withdrawBalance: () => dispatch(actionCreators.withdrawBalance()),
        authOn: () => dispatch(actionCreators.authOn()),
        authOff: () => dispatch(actionCreators.authOff())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);