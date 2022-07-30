import React, { Component, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Task(props) {
    // const id = useState(props.task.id);
    const id = props.task.id;
    let [name, setName] = useState(props.task.name);
    let [content, setContent] = useState(props.task.content);

    const handleEdit = () => {
        setName("New Name");
        setContent("New Content");
    };

    return (
        <Box>
            <Grid container spacing={2} paddingTop={2}>
                <Grid item xs={3}>
                    <Typography variant="h5" component="h2">
                        {name} (Id: {id})
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        onClick={() => props.onDelete(id)}
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
