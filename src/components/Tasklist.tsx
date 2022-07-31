import React, { useState } from "react";
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
    isCompleted: boolean;
};

// type TasklistProps = {
//     id: number;
//     tasks: Task[];
//     onAdd: (title: string, content: string, deadline: Date | null) => void;
// };

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const Tasklist = (props: TasklistProps) => {
const Tasklist = () => {
    // const [tasklistName, setTasklistName] = useState("Task list " + props.id);
    // const [tasks, setTasks] = useState<Task[]>(props.tasks);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currId, setCurrId] = useState(0);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
    const [completedTasks, setCompletedTasks] = useState(0);

    const handleDelete = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
        setOpenDeleteSnackbar(true);
    };

    const handleAdd = (
        taskTitle: string,
        taskContent: string,
        taskDeadline: Date | null
    ) => {
        // props.onAdd(taskTitle, taskContent, taskDeadline);

        const newTask: Task = {
            id: currId,
            title: taskTitle,
            content: taskContent,
            deadline: taskDeadline,
            isCompleted: false,
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

    const handleCompletion = (taskStatus: boolean) => {
        if (taskStatus) {
            setCompletedTasks(completedTasks + 1);
        } else {
            setCompletedTasks(completedTasks - 1);
        }
    };

    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ backgroundColor: "#FFF6BA" }}>
                <Box padding={5}>
                    <Typography component="h2" variant="h4">
                        {/* {tasklistName} */}
                        Task list
                    </Typography>
                    <Box component="span" paddingRight={2}>
                        Active tasks: {tasks.length}
                    </Box>
                    <Box component="span" paddingRight={2}>
                        Completed tasks: {completedTasks}
                    </Box>
                    <AddTask onAdd={handleAdd}></AddTask>
                    {tasks.map((task) => (
                        <Box key={task.id}>
                            <Task
                                key={task.id}
                                task={task}
                                onDelete={() => handleDelete(task.id)}
                                onComplete={handleCompletion}
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

export default Tasklist;
