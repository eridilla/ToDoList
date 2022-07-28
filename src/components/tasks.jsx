import React, { Component } from 'react';
import { Button } from '@mui/material';
import Task from "./task"

class Tasks extends Component {
    state = { 
        tasks: [],
        currId: 0
    } 

    handleDelete = taskId => {
        const tasks = this.state.tasks.filter(t => t.id !== taskId);
        this.setState({ tasks });
    }

    handleAdd = () => {
        let tasks = this.state.tasks;
        const newTask = {
            id: this.state.currId
        }

        tasks.push(newTask);
        this.setState({tasks});
        this.setState({currId: this.state.currId + 1});
    }

    render() { 
        return (
            <div>
                <Button variant="contained" color="success" onClick={this.handleAdd}>Add Task</Button>
                {this.state.tasks.map(task => <Task key={task.id} id={task.id} onDelete={this.handleDelete}/>)}
            </div>
        );
    }
}
 
export default Tasks;