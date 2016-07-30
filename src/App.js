import React, { Component } from 'react';
import './App.css';
import isValidUpca from './utils/isValidUpca';
import Poll from './Poll.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctUpca: [],
      wrongUpca: [],
      textAreaValue: '',
      stagingUpca: [],
      textAreaValue: '',
      html: "<b>Hello <i>World</i></b>"
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

  handleClick() {
    console.log('hey');
  }

  render() {
    return (
      <div className="App">
        <div className="inlineBlock">
          { this.state.wrongUpca.length ? <p>Please check the following :</p> : ''}
          <ul>
            {this.state.wrongUpca.map((upca, index) => {
              return <li key={index}>{upca.code} {upca.reasons.map(r => <span>{r} </span>)}</li>
            })}
          </ul>
        </div>
        <div className="inlineBlock">
          <p>Check UPC-A codes separated by a return</p>
          <div>
            <div></div>
          </div>
          <form>
            <textarea name="" onChange={this.handleChange.bind(this)} id="textarea"></textarea>
          </form>
          <button onClick={this.handleClick}>Add to poll valid UPCA-A</button>
        </div>
        <div className="inlineBlock">
          <h4>Submitting following UPC-A codes :</h4>
          <Poll items={this.state.stagingUpca}>
            <button>Submit</button>
          </Poll>
        </div>
      </div>
    );
  }
}

export default App;
