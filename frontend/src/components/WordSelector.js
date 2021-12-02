import { React } from 'react';

export function WordSelector({words = null, socket = null}) {
  const listWords = words.map((word) =>
    <button className="wordButton" key={word + '-selector'} onClick={() => {
      socket.emit('chooseWord', word);
    }}>
      {word}
    </button>
  );

  return (
    <div className="wordSelector">
      <div>
        {listWords}
      </div>
    </div>
  );
}

export default WordSelector;