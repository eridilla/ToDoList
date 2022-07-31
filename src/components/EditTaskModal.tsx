import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

type EditTaskProps = {
    formerTitle: string;
    formerContent: string;
    onEdit: (title: string, content: string) => void;
};

const AddTask = (props: EditTaskProps) => {
    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: {
            title: props.formerTitle,
            content: props.formerContent,
        },
        onSubmit: (values) => {
            props.onEdit(values.title, values.content);
            handleClose();
        },
    });

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        formik.values.title = "";
        formik.values.content = "";
    };

    // console.log(props);

    return (
        <div>
            <Button variant="contained" color="warning" onClick={handleOpen}>
                Edit task
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper elevation={5} sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit task
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">
                                Title
                            </InputLabel>
                            <Input
                                required
                                error={formik.values.title === ""}
                                id="title"
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            <FormHelperText
                                error
                                sx={
                                    formik.values.title === ""
                                        ? {}
                                        : { display: "none" }
                                }
                            >
                                Required
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined">
                                Content
                            </InputLabel>
                            <OutlinedInput
                                id="content"
                                name="content"
                                type="text"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                label="Content"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </form>
                </Paper>
            </Modal>
        </div>
    );
};

export default AddTask;
