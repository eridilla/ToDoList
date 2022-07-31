import React, { Component, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Task from "./Task";
import AddTask from "./AddTaskModal";

type Task = {
    id: number,
    title: string,
    content: string
}

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currId, setCurrId] = useState(0);

    const handleDelete = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    };

    const handleAdd = (taskTitle: string, taskContent: string) => {
        const newTask: Task = {
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
