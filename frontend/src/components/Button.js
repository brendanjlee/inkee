import { useHistory } from 'react-router-dom';
import { React } from 'react';

function MyButton() {
  const history = useHistory();

  return (
    <button type="button">
      Shop
    </button>
  );
}

export default MyButton