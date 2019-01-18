import * as actionTypes from './actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
    balance: "",
    items: [],
    isAuth: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ITEMS:
            return updateObject(state, {
                items: action.items
            });
        case actionTypes.UPDATE_ITEMS:
            return updateObject(state, {
                items: action.items
            });
        case actionTypes.GET_BALANCE:
            return updateObject(state, {
                balance: action.balance
            });
        case actionTypes.ADD_BALANCE:
            return updateObject(state, {
                balance: action.balance
            });
        case actionTypes.WITHDRAW_BALANCE:
            return updateObject(state, {
                balance: action.balance
            });
        case actionTypes.AUTH_ON:
            console.log('hg');
            return updateObject(state, {
                isAuth: true
            });
        case actionTypes.AUTH_OFF:
            return updateObject(state, {
                isAuth: false
            });
        default:
            return state;
    }
};

export default reducer;