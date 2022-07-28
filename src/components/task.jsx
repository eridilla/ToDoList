import React, { Component } from 'react';
import Button from '@mui/material/Button';

class Counter extends Component {
    state = { 
        id: this.props.id,
        name: 'Name',
        content: 'Content'
    }
    
    render() { 
        return (
            <div>
                <h4>{this.state.name} (Id: {this.props.id})</h4>
                <p>{this.state.content}</p>
                <Button onClick={() => this.props.onDelete(this.props.id)} variant="contained" color="error">Delete</Button>
            </div>
        );
    }
}
 
export default Counter;