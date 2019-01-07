import React, { Component } from 'react';
import axios from '../../axios';
import classes from './NewItem.css';
import { read } from 'fs';

class NewItem extends Component {

    state = { newItem: {} };

    addItemHandler = () => {
        const newItem = {
            name: this.state.newItem.name,
            price: this.state.newItem.price,
            iamge: this.state.newItem.image
        }
        axios.post('/items.json', newItem)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    changeNameHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    changePriceHandler = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    changeImageHandler = (e) => {
        let itemImage = e.target;
        const reader = new FileReader();
        reader.onload = function (e) {
            this.setState({
                image: e.target.result
            })
        }
        reader.readAsDataURL(itemImage.files[0]);
    }

    render() {
        return (
            <div className={classes.NewItem}>
                <label className={classes.NewItem}>Name</label>
                <input onChange={this.changeNameHandler} type="text" value={this.state.newItem.name} />
                <label className={classes.NewItem}>Price</label>
                <input onChange={this.changePriceHandler} type="text" value={this.state.newItem.value} />
                <label className={classes.NewItem}>Image</label>
                <input onChange={this.changeImageHandler} type="file" value={this.state.newItem.image} />
            </div>
        )
    }
}

export default NewItem