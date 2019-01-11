import React, { Component } from 'react';
import axios from '../../axios-vending';
import classes from './NewItem.css';

class NewItem extends Component {

    nameElement = React.createRef();
    priceElement = React.createRef();
    imageElement = React.createRef();

    state = {
        newItem: {
            name: "",
            position: null,
            price: "",
            image: ""
        },
        error: false,
        errorMessage: ""
    };

    addItemHandler = () => {
        if (this.props.items.length === 9) {
            this.setState({
                error: true,
                errorMessage: "Items at limit"
            });
            return;
        }

        if (this.nameElement.current.value.trim() === "" || this.priceElement.current.value.trim() === "" || this.imageElement.current.files.length === 0) {
            this.setState({
                error: true,
                errorMessage: "Must fill out all inputs"
            });
            return;

        }
        const newItem = {
            name: this.state.newItem.name,
            price: this.state.newItem.price,
            image: this.state.newItem.image,
            position: this.props.items.length
        }

        this.props.addItem(newItem);
    }


    changeNameHandler = (e) => {
        this.setState({
            error: false,
        });
        this.setState({
            newItem: {
                ...this.state.newItem,
                name: e.target.value
            }
        })
    }

    changePriceHandler = (e) => {
        this.setState({
            error: false,
        });
        this.setState({
            newItem: {
                ...this.state.newItem,
                price: e.target.value
            }
        })
    }

    changeImageHandler = (e) => {
        this.setState({
            error: false,
        });
        let itemImage = e.target;
        const reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    image: e.target.result
                }
            })
        }
        reader.readAsDataURL(itemImage.files[0]);
    }


    render() {
        let error = null;

        if (this.state.error) {
            error = <span className={classes.Error} ref={this.errorElement}> {this.state.errorMessage} </span>
        }

        return (
            <div className={classes.NewItem}>
                <label className={classes.NewItem}>Name</label>
                <input onChange={this.changeNameHandler} ref={this.nameElement} type="text" value={this.state.newItem.name} />
                <label className={classes.NewItem}>Price</label>
                <input onChange={this.changePriceHandler} ref={this.priceElement} type="text" value={this.state.newItem.value} />
                <label className={classes.NewItem}>Image</label>
                <input onChange={this.changeImageHandler} ref={this.imageElement} type="file" />
                <input onClick={this.addItemHandler} type="button" value="submit" />
                {error}
            </div>
        )
    }

}
export default NewItem