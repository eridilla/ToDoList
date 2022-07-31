import React, { Component, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Task from "./Task";
import AddTask from "./AddTaskModal";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [currId, setCurrId] = useState(0);

    const handleDelete = (taskId) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    };

    const handleAdd = (taskTitle, taskContent) => {
        const newTask = {
            id: currId,
            title: taskTitle,
            content: taskContent,
        };

        tasks.push(newTask);
        setTasks(tasks);
        setCurrId(currId + 1);
    };

    return (
        <Paper elevation={3}>
            <Box padding={5}>
                <Box component="span" paddingRight={2}>
                    Active tasks: {tasks.length}
                </Box>
                <AddTask onAdd={handleAdd}></AddTask>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onDelete={() => handleDelete(task.id)}
                    />
                ))}
            </Box>
        </Paper>
    );
};

export default Tasks;
