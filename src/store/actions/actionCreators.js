import * as actionTypes from './actionTypes';
import axios from '../../axios-vending';


const getItemsSync = (items) => {
    return {
        type: actionTypes.GET_ITEMS,
        items: items
    }
}

const updateItemsSync = (items) => {
    return {
        type: actionTypes.UPDATE_ITEMS,
        items: items
    }
}

const getBalanceSync = (balance) => {
    return {
        type: actionTypes.GET_BALANCE,
        balance: balance
    }
}

const addBalanceSync = (balance) => {
    return {
        type: actionTypes.ADD_BALANCE,
        balance: balance
    }
}

const withdrawBalanceSync = (balance) => {
    return {
        type: actionTypes.WITHDRAW_BALANCE,
        balance: balance
    }
}

export const getItems = () => {
    return dispatch => {
        axios.get('items.json')
            .then(response => {
                if (response.data) {
                    dispatch(getItemsSync(Object.values(response.data.items)));
                }
            });
    };
}

export const updateItems = (items) => {
    return dispatch => {
        axios.put('items.json', { items: items })
            .then(response => {
                if (response.data) {
                    dispatch(updateItemsSync(response.data.items));
                } else {
                    dispatch(updateItemsSync([]));
                }
            });
    };
}

export const getBalance = () => {
    return dispatch => {
        axios.get('balance.json')
            .then(response => {
                if (response.data) {
                    dispatch(getBalanceSync(response.data.balance));
                } else {
                    dispatch(getBalanceSync(0));
                }
            });
    };
}

export const addBalance = (balance, amount) => {
    return dispatch => {
        axios.put('balance.json', { balance: +balance + amount })
            .then(response => {
                dispatch(addBalanceSync(response.data.balance));
            });
    };
}

export const withdrawBalance = () => {
    return dispatch => {
        axios.put('balance.json', { balance: 0 })
            .then(response => {
                dispatch(withdrawBalanceSync(response.data.balance));
            })
    };
}