import React, { Component, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Task from "./Task";
import AddTask from "./AddTaskModal";

const Tasks = () => {
    let [tasks, handleChange] = useState([]);
    let currId = 0;

    useEffect(() => {
        console.log("useeffect");
    }, [tasks]);

    handleChange = (typeOfChange, taskId, taskName, taskContent) => {
        if (typeOfChange === 0) {
            handleDelete(taskId);
        } else if (typeOfChange === 1) {
            handleAdd(taskName, taskContent);
        }
    };

    const handleDelete = (taskId) => {
        console.log("Delete handler", taskId);

        const tasks = tasks.filter((t) => t.id !== taskId);
    };

    const handleAdd = (taskName, taskContent) => {
        const newTask = {
            id: currId,
            name: taskName,
            content: taskContent,
        };

        tasks.push(newTask);
        currId = currId + 1;
    };

    return (
        <Paper elevation={3}>
            <Box padding={5}>
                <Box component="span" paddingRight={2}>
                    Active tasks: {tasks.length}
                </Box>
                <AddTask
                    onAdd={() =>
                        handleChange(1, 1, "Task Name", "Task Content")
                    }
                ></AddTask>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onDelete={() => this.handleChange(0, task.id)}
                    />
                ))}
            </Box>
        </Paper>
    );
};

export default Tasks;
