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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

type EditTaskProps = {
    formerTitle: string;
    formerContent: string;
    formerDeadline: Date | null;
    onEdit: (title: string, content: string, deadline: Date | null) => void;
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
    const [deadline, setDeadline] = useState<Date | null>(null);

    const formik = useFormik({
        initialValues: {
            title: props.formerTitle,
            content: props.formerContent,
            deadline: props.formerDeadline,
        },
        onSubmit: (values) => {
            if (values.title.length === 0) {
                setIsRequiredEmpty(true);
            } else {
                setIsRequiredEmpty(false);
                props.onEdit(values.title, values.content, deadline);
                handleClose(true, values.title, values.content, deadline);
            }
        },
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (
        isEdited: boolean,
        newTitle: string,
        newContent: string,
        newDeadline: Date | null
    ) => {
        setIsRequiredEmpty(false);
        setOpen(false);

        if (isEdited) {
            formik.values.title = newTitle;
            formik.values.content = newContent;
            formik.values.deadline = newDeadline;
        } else {
            formik.values.title = props.formerTitle;
            formik.values.content = props.formerContent;
            formik.values.deadline = props.formerDeadline;
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
            <IconButton color="warning" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={() => handleClose(false, "", "", null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper elevation={5} sx={style}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit task
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{ width: "400px" }}
                            >
                                <FormControl
                                    variant="standard"
                                    sx={{ width: "100%" }}
                                >
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
                                        sx={
                                            isRequiredEmpty
                                                ? {}
                                                : { display: "none" }
                                        }
                                    >
                                        Required
                                    </FormHelperText>
                                </FormControl>
                                <FormControl sx={{ width: "100%" }}>
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
                                        multiline
                                        rows={5}
                                    />
                                </FormControl>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    sx={{ width: "100%" }}
                                >
                                    <DatePicker
                                        openTo="month"
                                        views={["year", "month", "day"]}
                                        label="Deadline"
                                        value={formik.values.deadline}
                                        onChange={(newValue) => {
                                            formik.values.deadline = newValue;
                                            setDeadline(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                helperText={null}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Button
                                    onClick={handleClick}
                                    type="submit"
                                    color="success"
                                    variant="contained"
                                >
                                    Edit
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
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
