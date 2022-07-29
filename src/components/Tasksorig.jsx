import React, { Component } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Task from "./Task";
import AddTask from "./AddTaskModal";

class Tasks extends Component {
    state = {
        tasks: [],
        currId: 0,
    };

    handleDelete = (taskId) => {
        console.log("Delete handler", taskId);

        const tasks = this.state.tasks.filter((t) => t.id !== taskId);
        this.setState({ tasks });
    };

    handleAdd = (taskName, taskContent) => {
        let tasks = this.state.tasks;
        const newTask = {
            id: this.state.currId,
            name: taskName,
            content: taskContent,
        };

        tasks.push(newTask);
        this.setState({ tasks });
        this.setState({ currId: this.state.currId + 1 });
    };

    render() {
        return (
            <Paper elevation={3}>
                <Box padding={5}>
                    <Box component="span" paddingRight={2}>
                        Active tasks: {this.state.tasks.length}
                    </Box>
                    <AddTask onAdd={this.handleAdd}></AddTask>
                    {/* <Button variant="contained" color="success" onClick={this.handleAdd}>Add Task</Button> */}
                    {this.state.tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onDelete={this.handleDelete}
                        />
                    ))}
                </Box>
            </Paper>
        );
    }
}

export default Tasks;
