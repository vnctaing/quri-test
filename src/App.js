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
      stagingUpca: [],
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
    this.refs.codes.value = "";
    this.refs.codes.value = this.state.wrongUpca.map((upca) => upca.code).join('\n');
    this.setState({
      // new Set (es6 feature), let you unify and de-duplicate items
      stagingUpca: [ ...new Set( [].concat( ...this.state.stagingUpca, ...this.state.correctUpca) ) ],
      correctUpca: [],
    });
  }

  onRemove(item) {
    const itemIndex = this.state.stagingUpca.indexOf(item);
    this.setState({
      stagingUpca: [
        ...this.state.stagingUpca.slice(0, itemIndex), 
        ...this.state.stagingUpca.slice(itemIndex + 1, this.state.stagingUpca.length)
      ]
    });
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
            <textarea ref="codes" onChange={this.handleChange.bind(this)} id="textarea"></textarea>
          </form>
          <button onClick={this.handleClick.bind(this)}>Add valid UPCA-A to poll({this.state.correctUpca.length})</button>
        </div>
        <div className="inlineBlock">
          <h4>Submitting following UPC-A codes :</h4>
          <Poll items={this.state.stagingUpca} onRemove={this.onRemove.bind(this)}>
            <button>Submit</button>
          </Poll>
        </div>
      </div>
    );
  }
}

export default App;
