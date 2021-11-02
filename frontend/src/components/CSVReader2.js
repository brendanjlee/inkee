import { CSVReader } from "react-papaparse"
import React, { Component } from "react"
import { useState } from "react"

class CSVReader2 extends Component {
  constructor(props) {
    super(props);
    this.state = {wordList: []};
  }

  updateWordlist = (words) => {
    if (words) {
      this.setState({wordList: words});
      console.log('wordList state updated');
    }
    else {
      this.setState({wordList: null});
    }
    console.log(`wordList: ${this.state.wordList}`)
  }

  deleteWordList = () => {
    this.setState({wordList: []});
    console.log('wordList state updated');
  }

  handleOnDrop = (data) => {
    console.log('---------------------------');
    console.log(`handleOnDrop`);
    
    // parse data
    let words = [];  // holder for words
    for (let i = 0; i < data.length; i++) {
      let word = data[i].data;  // array object ['word']
      if (!words.includes(word[0])) words.push(word[0]);
    }

    // Update state 
    this.updateWordlist(words);
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log('handleOnRemoveFile');
    this.updateWordlist();
  };

  render() {
    return (
      <>
        <h5>Or Upload a CSV File</h5>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </>
    );
  }
}

export default CSVReader2;