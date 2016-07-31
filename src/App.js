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
      isFetching: false,
    };
  }

  onRemove(item) {
    const itemIndex = this.state.stagingUpca.indexOf(item);
    this.setState({
      stagingUpca: [
        ...this.state.stagingUpca.slice(0, itemIndex),
        ...this.state.stagingUpca.slice(itemIndex + 1, this.state.stagingUpca.length),
      ],
    });
  }

  handleClick() {
    this.refs.codes.value = '';
    this.refs.codes.value = this.state.wrongUpca.map((upca) => upca.code).join('\n');
    this.setState({
      // new Set (es6 feature), let you unify and de-duplicate items
      stagingUpca: [...new Set(
      [].concat(
        ...this.state.stagingUpca,
        ...this.state.correctUpca)
      )],
      correctUpca: [],
    });
  }

  handleChange(e) {
    const inputUpcaCodes = e.target.value.split('\n');
    const filteredUcpa = inputUpcaCodes.reduce((acc, code) => {
      if (code === '') return acc;

      /*
        isValidUpca returns a boolean if it's valid otherwise
        it returns an object with the `reasons` property
       */

      if (typeof isValidUpca(code) !== 'object') {
        acc.correctUpca.push(code);
      } else {
        acc.wrongUpca.push({ code, reasons: isValidUpca(code) });
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


  handleSubmitStaginUpca() {
    this.setState({ isFetching: true });
    const stagingUpcaAreValid = this.state.stagingUpca.map((code) => isValidUpca(code)) === this.state.stagingUpca;

    if (stagingUpcaAreValid) {
      fetch('https://iwo3uesa6c.execute-api.us-east-1.amazonaws.com/prod/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list: this.state.stagingUpca }),
      })
        .then((r) => r.json())
        .then((json) => {
          if (json === 'success') this.setState({ stagingUpca: [] });
          this.setState({ isFetching: false });
        })
        .catch((error)=> { console.log(error); });
    } else {
      return 'Wrong UPC-A';
    }
  }

  render() {
    return (
      <div className="App">
        <div className="inlineBlock">
          {this.state.wrongUpca.length ? <p>Please check the following :</p> : ''}
          <ul className="wrongUpca">
            {this.state.wrongUpca.map((upca, index) => {
              return (
                <li key={index}>
                      {upca.code} {upca.reasons.map(r => <span>{r} </span>)}
                </li>);
            })}
          </ul>
        </div>
        <div className="inlineBlock">
          <p>Check UPC-A codes separated by a return</p>
          <form>
            <textarea ref="codes" onChange={this.handleChange.bind(this)} id="textarea"></textarea>
          </form>
          <button className="addToPollCta" onClick={this.handleClick.bind(this)} disabled={this.state.correctUpca.length ? false : true}>
            Add valid UPCA-A to poll({this.state.correctUpca.length})
          </button>
        </div>
        <div className="inlineBlock">
          <h4>Submitting following UPC-A codes :</h4>
          <p>{this.state.isFetching ? 'Submiting...' : ''}</p>
          <Poll items={this.state.stagingUpca} onRemove={this.onRemove.bind(this)}>
            <button type="button"
                    className="submitCta"
                    onClick={this.handleSubmitStaginUpca.bind(this)}
                    disabled={this.state.stagingUpca.length ? false : true}>
              Submit {this.state.stagingUpca.length} upc-a code{this.state.stagingUpca.length > 1 ? 's' : ''}
            </button>
          </Poll>
        </div>
      </div>
    );
  }
}

export default App;
