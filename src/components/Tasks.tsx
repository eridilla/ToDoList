import React, { Component, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Task from "./Task";
import AddTask from "./AddTaskModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Typography } from "@mui/material";

type Task = {
    id: number;
    title: string;
    content: string;
    deadline: Date | null;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currId, setCurrId] = useState(0);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

    const handleDelete = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
        setOpenDeleteSnackbar(true);
    };

    const handleAdd = (
        taskTitle: string,
        taskContent: string,
        taskDeadline: Date | null
    ) => {
        const newTask: Task = {
            id: currId,
            title: taskTitle,
            content: taskContent,
            deadline: taskDeadline,
        };

        tasks.push(newTask);
        setTasks(tasks);
        setCurrId(currId + 1);
    };

    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenDeleteSnackbar(false);
    };

    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ backgroundColor: "#FFF6BA" }}>
                <Box padding={5}>
                    <Typography component="h2" variant="h4">
                        Task list name
                    </Typography>
                    <Box component="span" paddingRight={2}>
                        Active tasks: {tasks.length}
                    </Box>
                    <AddTask onAdd={handleAdd}></AddTask>
                    {tasks.map((task) => (
                        <Box key={task.id}>
                            <Task
                                key={task.id}
                                task={task}
                                onDelete={() => handleDelete(task.id)}
                            />
                            <hr></hr>
                        </Box>
                    ))}
                </Box>
            </Paper>
            <Snackbar
                open={openDeleteSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="info"
                    sx={{ width: "100%" }}
                >
                    Task deleted!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default Tasks;
