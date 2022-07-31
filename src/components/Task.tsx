import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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

    const handleEdit = () => {
        setTitle("New Title");
        setContent("New Content");
    };

    return (
        <Box>
            <Grid container spacing={2} paddingTop={2}>
                <Grid item xs={3}>
                    <Typography variant="h5" component="h2">
                        {title} (Id: {id})
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        onClick={() => props.onDelete()}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={handleEdit}
                        variant="contained"
                        color="warning"
                    >
                        Edit
                    </Button>
                </Grid>
            </Grid>

            <p>{content}</p>
        </Box>
    );
}

export default Task;
