import React from 'react'
import Form from 'react-bootstrap/Form'

class BootstrapTextarea extends React.Component{

    constructor(){
        super();
        this.state = {
            address:null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            address: event.target.value
        });

        var textInput = document.getElementById('')
        //console.warn(this.state)
    }

    render(){
        return(
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows="3" name="address" onChange={this.handleInputChange} />
                    </Form.Group>
                </Form>
            </div>
        )  
    }
}

export default BootstrapTextarea;