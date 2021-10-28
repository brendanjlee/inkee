import { CSVReader } from "react-papaparse"
import React from "react"
import { useState } from "react"

function CSVReader2() {
  const handleOnDrop = (data) => {
    console.log('---------------------------');
    console.log(`Data Len: ${data.length}`)
    let words = [];
    for (let i = 0; i < data.length; i++) {
      let word = data[i].data;  // array object ['word']
      if (!words.includes(word[0])) words.push(word[0]);
    }
    console.log(`Words from CSV: ${words}`);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  return (
    <>
      <h5>Or Upload a CSV File</h5>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
    </>
  );
}

export default CSVReader2