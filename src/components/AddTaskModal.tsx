import * as React from "react";
import { useState } from "react";
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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
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

type AddTaskProps = {
    onAdd: (title: string, content: string, deadline: Date | null) => void;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddTask = (props: AddTaskProps) => {
    const [open, setOpen] = useState(false);
    const [isRequiredEmpty, setIsRequiredEmpty] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [deadline, setDeadline] = useState<Date | null>(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            deadline: null,
        },
        onSubmit: (values) => {
            if (values.title.length === 0) {
                setIsRequiredEmpty(true);
            } else {
                setIsRequiredEmpty(false);
                props.onAdd(values.title, values.content, deadline);
                handleClose();
            }
        },
    });

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setIsRequiredEmpty(false);
        setOpen(false);
        formik.values.title = "";
        formik.values.content = "";
        formik.values.deadline = null;
        setDeadline(null);
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
            <IconButton color="success" onClick={handleOpen}>
                <AddBoxIcon fontSize="large" />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
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
                            Add a new task
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
                                >
                                    <DateTimePicker
                                        // openTo="day"
                                        // views={["year", "day"]}
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
                                    sx={{ width: "100%" }}
                                >
                                    Add
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
                    Task added successfully!
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
