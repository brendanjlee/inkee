import { React } from 'react';

export function WordSelector() {
  const listWords = (
    <div>
      <button className="wordButton">Word1</button>
      <button className="wordButton">Word2</button>
      <button className="wordButton">Word1</button>
    </div>);

  return (
    <div className="wordSelector">
      {listWords}
    </div>
  );
}

export default WordSelector;