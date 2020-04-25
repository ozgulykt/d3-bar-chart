import React, { Component } from 'react';
import './App.css';
import RD3Component, { node } from './component/RD3Component';
import * as d3 from 'd3';

class App extends Component {
  
  render() {
    return (
      <div>
        <RD3Component />
      </div>
    );
  }
}

export default App;
