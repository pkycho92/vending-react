import React, { Component } from 'react';

import VendingItems from '../VendingItems/VendingItems';
import NumberPad from '../../components/NumberPad/NumberPad'
import classes from './VendingMachine.css';

class VendingMachine extends Component {
    render() {
        return (
            <>
                <VendingItems/>
                <div>Number Pad</div>
                <div>Money Slot</div>
            </>
                    )
                }
            }
            
export default VendingMachine;