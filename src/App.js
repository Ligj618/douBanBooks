import React, { Component } from 'react';
import './App.css';
import './css/fontawesome-all.min.css';
import Header from './components/header';
import MyRouter from './components/router'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <MyRouter/>
        
      </div>
    );
  }
}

export default App;
