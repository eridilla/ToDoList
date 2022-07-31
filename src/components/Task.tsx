import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditTask from "./EditTaskModal"

type TaskProps = {
    task: {
        id: number,
        title: string,
        content: string
    },
    onDelete: () => void
}

function Task(props: TaskProps) {
    // const id = useState(props.task.id);
    const id = props.task.id;
    const [title, setTitle] = useState(props.task.title);
    const [content, setContent] = useState(props.task.content);

    const handleEdit = (newTitle: string, newContent: string) => {
        setTitle(newTitle);
        setContent(newContent);
    };

    return (
        <Box>
            <Grid container spacing={2} paddingTop={2}>
                <Grid item xs={4}>
                    <Typography variant="h5" component="h2">
                        {title} (Id: {id})
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        onClick={() => props.onDelete()}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                    <EditTask formerTitle={title} formerContent={content} onEdit={handleEdit}></EditTask>
                </Grid>
            </Grid>

            <p>{content}</p>
        </Box>
    );
}

export default Task;
