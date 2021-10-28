import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';

export default class CSVReader2old extends Component {
  handleOnDrop = (data) => {
    console.log('---------------------------');
    console.log(`Data Len: ${data.length}`)
    let words = [];
    for (let i = 0; i < data.length; i++) {
      let word = data[i].data;  // array object ['word']
      if (!words.includes(word[0])) words.push(word[0]);
    }
    console.log(`Words from CSV: ${words}`);
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
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