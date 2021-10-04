import { useHistory } from 'react-router-dom';
import { Component, React } from 'react';

const MyButton = () => {
  const history = useHistory();
  const handleClick = () => history.push('/Shop');

  return (
    <button type="button" onClick={handleClick}>
      Shop
    </button>
  );
}

export default MyButton