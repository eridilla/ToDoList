import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditTask from "./EditTaskModal";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

type TaskProps = {
    task: {
        id: number;
        title: string;
        content: string;
        deadline: Date | null;
    };
    onDelete: () => void;
};

function Task(props: TaskProps) {
    // const id = useState(props.task.id);
    const id = props.task.id;
    const [title, setTitle] = useState(props.task.title);
    const [content, setContent] = useState(props.task.content);
    const [deadline, setDeadline] = useState(props.task.deadline);

    const handleEdit = (
        newTitle: string,
        newContent: string,
        newDeadline: Date | null
    ) => {
        setTitle(newTitle);
        setContent(newContent);
        setDeadline(newDeadline);
    };

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="h6"
                        marginLeft="10px"
                    >
                        Id: {id}
                    </Typography>
                </Stack>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{ backgroundColor: "white" }}
                >
                    <EditTask
                        formerTitle={title}
                        formerContent={content}
                        formerDeadline={deadline}
                        onEdit={handleEdit}
                    ></EditTask>
                    <IconButton color="error" onClick={() => props.onDelete()}>
                        <DeleteIcon />
                    </IconButton>
                </ButtonGroup>
            </Stack>
            <Typography component="p" variant="body1">
                {content}
            </Typography>
            <Typography sx={deadline === null ? { display: "none" } : {}}>
                Deadline: {deadline?.toDateString()}
            </Typography>
        </Box>
    );
}

export default Task;
