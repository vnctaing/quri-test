import React, { Component } from 'react';
import './App.css';
import isValidUpca from './utils/isValidUpca'
import removeEveryWhiteSpace from './utils/removeEveryWhiteSpace'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctUpca: [],
      wrongUpca: [],
    };
  }


  /*
    isValidUpca returns a boolean if it's valid otherwise 
    it returns an object with the `reasons` property
   */
  handleChange(e) {
    const inputUpcaCodes = e.target.value.split('\n');
    const filteredUcpa = inputUpcaCodes.reduce((acc, code) => {
      code = removeEveryWhiteSpace(code);
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
    this.setState(filteredUcpa);
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <form>
          <textarea name="" onChange={this.handleChange.bind(this)}></textarea>
          <p>Please check the following</p>
        </form>
        <ul>
          {
            this.state.wrongUpca.map((upca, index) => <li key={index}>{upca.code}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
