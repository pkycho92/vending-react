import React, { Component } from 'react';
import VendingMachine from './containers/VendingMachine/VendingMachine'
import classes from './App.css'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <VendingMachine/>
      </div>
    );
  }
}

export default App;
