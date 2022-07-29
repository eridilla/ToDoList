import React, { Component } from "react";
import Tasks from "./components/Tasks";
import { Container, Typography } from "@mui/material";

function App() {
    return (
        <Container>
            <Typography component="h1" variant="h2">
                To-Do List
            </Typography>
            <Tasks />
        </Container>
    );
}

export default App;
