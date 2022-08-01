import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Task from "./Task";
import AddTask from "./AddTaskModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type Task = {
    id: number;
    title: string;
    content: string;
    deadline: Date | null;
    isCompleted: boolean;
};

enum Filter {
    Completed,
    NotCompleted,
}

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
    const [shownTasks, setShownTasks] = useState<Task[]>([]);
    const [currId, setCurrId] = useState(0);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
    const [completedTasks, setCompletedTasks] = useState(0);

    const handleDelete = (taskId: number) => {
        // console.log(tasks.filter((t) => t.id === taskId)[0].isCompleted);

        if (tasks.filter((t) => t.id === taskId)[0].isCompleted)
            handleCompletion(
                tasks.filter((t) => t.id === taskId)[0].isCompleted,
                taskId
            );

        setTasks(tasks.filter((t) => t.id !== taskId));
        setShownTasks(shownTasks.filter((t) => t.id !== taskId));
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
        shownTasks.push(newTask);
        // setTasks(tasks);
        // setShownTasks(tasks);
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

    const handleCompletion = (taskStatus: boolean, id: number) => {
        if (!taskStatus) {
            tasks.filter((t) => t.id === id)[0].isCompleted = true;
            setCompletedTasks(completedTasks + 1);
        } else {
            tasks.filter((t) => t.id === id)[0].isCompleted = false;
            setCompletedTasks(completedTasks - 1);
        }
    };

    const handleFilter = (filter: Filter) => {
        switch (filter) {
            case Filter.Completed:
                if (
                    shownTasks.filter((t) => t.isCompleted === true).length > 0
                ) {
                    setShownTasks(
                        shownTasks.filter((t) => t.isCompleted !== true)
                    );
                } else {
                    setShownTasks(
                        shownTasks
                            .concat(tasks.filter((t) => t.isCompleted === true))
                            .sort((a, b) => a.id - b.id)
                    );
                }
                break;
            case Filter.NotCompleted:
                if (
                    shownTasks.filter((t) => t.isCompleted !== true).length > 0
                ) {
                    setShownTasks(
                        shownTasks.filter((t) => t.isCompleted === true)
                    );
                } else {
                    setShownTasks(
                        shownTasks
                            .concat(tasks.filter((t) => t.isCompleted !== true))
                            .sort((a, b) => a.id - b.id)
                    );
                }
                break;
            default:
                setShownTasks(tasks);
        }
    };

    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ backgroundColor: "#FFF6BA" }}>
                <Box padding={5}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography component="h2" variant="h4">
                            {/* {tasklistName} */}
                            Task list
                        </Typography>
                        <FormGroup>
                            <Stack
                                direction="row"
                                justifyContent="start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Box component="span" paddingRight={2}>
                                    Filters:
                                </Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={() =>
                                                handleFilter(Filter.Completed)
                                            }
                                            color="success"
                                            defaultChecked
                                        />
                                    }
                                    label="Completed"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={() =>
                                                handleFilter(
                                                    Filter.NotCompleted
                                                )
                                            }
                                            color="success"
                                            defaultChecked
                                        />
                                    }
                                    label="Not Completed"
                                />
                            </Stack>
                        </FormGroup>
                    </Stack>
                    <Box component="span" paddingRight={2}>
                        Active tasks: {tasks.length}
                    </Box>
                    <Box component="span" paddingRight={2}>
                        |
                    </Box>
                    <Box component="span" paddingRight={2}>
                        Completed tasks: {completedTasks}
                    </Box>
                    <AddTask onAdd={handleAdd}></AddTask>
                    {shownTasks.map((task) => (
                        <Box key={task.id}>
                            <Task
                                key={task.id}
                                task={task}
                                onDelete={() => handleDelete(task.id)}
                                onComplete={() =>
                                    handleCompletion(task.isCompleted, task.id)
                                }
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
