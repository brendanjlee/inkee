import React, { useState } from "react";
import { Button } from "react-bootstrap";

function LobbyForm(props) {
  const [state, setState] = useState({username : ''});

  const updateInput = (event) => {
    setState({username : event.target.value})
  };

  const handleSubmit = () => {
    if (this.state.username.length === 0) {
      alert('Invalid Game ID');
    } else {
      alert('Valid Game ID');
    }
  };

  return (
    <form className='form-group'>
      <input onChange={updateInput} className='username' type="text" placeholder="enter game ID..."/><br />
      <Button onClick={handleSubmit} >join with ID</Button>
    </form>
  );
}
  
export default LobbyForm;
