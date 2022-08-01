import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditTask from "./EditTaskModal";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

type TaskProps = {
    task: {
        id: number;
        title: string;
        content: string;
        deadline: Date | null;
        isCompleted: boolean;
    };
    onDelete: () => void;
    onComplete: (taskStatus: boolean) => void;
};

function Task(props: TaskProps) {
    // const id = useState(props.task.id);
    const id = props.task.id;
    const [title, setTitle] = useState(props.task.title);
    const [content, setContent] = useState(props.task.content);
    const [deadline, setDeadline] = useState(props.task.deadline);
    const [isCompleted, setIsCompleted] = useState(props.task.isCompleted);

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
                justifyContent="start"
                alignItems="center"
                spacing={0}
            >
                <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    color="success"
                    onChange={() => {
                        // setIsCompleted(!isCompleted);
                        // props.onComplete(isCompleted);
                        if (isCompleted === false) {
                            props.onComplete(true);
                            setIsCompleted(true);
                        } else {
                            props.onComplete(false);
                            setIsCompleted(false);
                        }

                        // console.log(!isCompleted);
                    }}
                    checked={isCompleted}
                />

                <Box sx={{ width: "100%" }}>
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
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={
                                    isCompleted
                                        ? {
                                              textDecoration: "line-through",
                                              opacity: "50%",
                                          }
                                        : {}
                                }
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                component="h6"
                                marginLeft="10px"
                                sx={{ opacity: "50%" }}
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
                            <IconButton
                                color="error"
                                onClick={() => props.onDelete()}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Stack>
                    <Typography
                        component="p"
                        variant="body1"
                        sx={
                            isCompleted
                                ? {
                                      textDecoration: "line-through",
                                      opacity: "50%",
                                  }
                                : {}
                        }
                    >
                        {content}
                    </Typography>
                    <Box sx={deadline === null ? { display: "none" } : {}}>
                        <Typography
                            sx={
                                isCompleted
                                    ? {
                                          textDecoration: "line-through",
                                          opacity: "50%",
                                      }
                                    : {}
                            }
                        >
                            Deadline: {deadline?.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}

export default Task;
