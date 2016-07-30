import React, { Component } from 'react';
import './App.css';
import isValidUpca from './utils/isValidUpca';
import removeEveryWhiteSpace from './utils/removeEveryWhiteSpace';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctUpca: [],
      wrongUpca: [],
      textAreaValue: ''
    };
  }

  /*
    isValidUpca returns a boolean if it's valid otherwise 
    it returns an object with the `reasons` property
   */
  handleChange(e) {
    const inputUpcaCodes = e.target.value.split('\n');
    const filteredUcpa = inputUpcaCodes.reduce((acc, code) => {
      if (code === '') return acc;
      if (typeof isValidUpca(code) !== 'object') {
        acc.correctUpca.push(code) 
      } else {
        acc.wrongUpca.push({code, reasons: isValidUpca(code)});
      }
      return acc;
    }, {
      correctUpca: [],
      wrongUpca: [],
    });
    this.setState({
      correctUpca: filteredUcpa.correctUpca,
      wrongUpca: filteredUcpa.wrongUpca,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <p>Enter UPC-A codes separated by a return</p>
        <form>
          <textarea name="" onChange={this.handleChange.bind(this)} id="textarea"></textarea>
        </form>
        <p>Please check the following :</p>
        <ul>
          {this.state.wrongUpca.map((upca, index) => {
            return <li key={index}>{upca.code} {upca.reasons.map(r => <span>{r} </span>)}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
