import React from "react";
import { Button } from "react-bootstrap";

const LobbyForm = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : ''
        }
          
        this.updateInput = this.updateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    updateInput(event){
        this.setState({username : event.target.value})
    }
        
        
    handleSubmit(){
        if (this.state.username.length == 0) {
            alert('Invalid Game ID');
        } else {
            alert('Valid Game ID');
        }
    }
  
    render() {
      return (
        <form className='form-group'>
            <input onChange={this.updateInput} className='username' type="text" placeholder="enter game ID..."/><br />
            <Button onClick={this.handleSubmit} >join with ID</Button>
        </form>
      );
    }
  };
  
  export default LobbyForm;