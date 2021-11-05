import React from 'react';

function CompoList(props) {
  console.log(props.stuff);

  // You need to map() eveyr prop into something that jsx can redner 
  return (
    <ul className='goal-list'> {
      props.stuff.map((single_item) => {
        return <li key={single_item.id}>{single_item.text}</li>;
      })
    }
    </ul>
  );
}

export default CompoList;