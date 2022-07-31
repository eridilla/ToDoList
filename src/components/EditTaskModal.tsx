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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddTask = (props: EditTaskProps) => {
    const [open, setOpen] = useState(false);
    const [isRequiredEmpty, setIsRequiredEmpty] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: props.formerTitle,
            content: props.formerContent,
        },
        onSubmit: (values) => {
            if (values.title.length === 0) {
                setIsRequiredEmpty(true);
            } else {
                setIsRequiredEmpty(false);
                props.onEdit(values.title, values.content);
                handleClose(true, values.title, values.content);
            }
        },
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (
        isEdited: boolean,
        newTitle: string,
        newContent: string
    ) => {
        setIsRequiredEmpty(false);
        setOpen(false);

        if (isEdited) {
            formik.values.title = newTitle;
            formik.values.content = newContent;
        } else {
            formik.values.title = props.formerTitle;
            formik.values.content = props.formerContent;
        }
    };

    const handleClick = () => {
        if (formik.values.title) {
            setOpenErrorSnackbar(false);
            setOpenSuccessSnackbar(true);
        } else {
            setOpenSuccessSnackbar(false);
            setOpenErrorSnackbar(true);
        }
    };

    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    };

    return (
        <div>
            <Button variant="contained" color="warning" onClick={handleOpen}>
                Edit task
            </Button>
            <Modal
                open={open}
                onClose={() => handleClose(false, "", "")}
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
                            <InputLabel
                                error={isRequiredEmpty}
                                htmlFor="component-simple"
                            >
                                Title
                            </InputLabel>
                            <Input
                                error={isRequiredEmpty}
                                id="title"
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            <FormHelperText
                                error
                                sx={isRequiredEmpty ? {} : { display: "none" }}
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
                            onClick={handleClick}
                            type="submit"
                            color="success"
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </form>
                </Paper>
            </Modal>
            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Task edited successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Title cannot be empty!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddTask;
