import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctUcpa: [],
      wrongUcpa: [],
    };
  }

  handleChange(e) {
    function _isValidUcpa(code) {
      return Math.random() > 0.5;
    }

    const inputUcpaCodes = e.target.value.split('\n');
    const filteredUcpa = inputUcpaCodes.reduce((acc, code) => {
      _isValidUcpa(code) 
        ? acc.correctUcpa.push(code) 
        : acc.wrongUcpa.push({code, motif: _isValidUcpa(code)});
      return acc;
    }, this.state);
    
    this.setState(filteredUcpa);
  }

  render() {
    return (
      <div className="App">
        <form>
          <textarea name="" onChange={this.handleChange.bind(this)}></textarea>
          <p>Please check the following</p>
        </form>
        <ul>
          {this.state.wrongUcpa.map((ucpa) => {
            <li>{ucpa.code}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
