import React, { Component } from 'react';
import './App.css';
import Posts from './components/posts';

class App extends Component {

  render () {
    return (
      <div className="App">
          <Posts></Posts>
      </div>
    );
  }

}

export default App;
