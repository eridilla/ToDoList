import React, { Component } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

class Counter extends Component {
    state = {
        id: this.props.task.id,
        name: this.props.task.name,
        content: this.props.task.content,
    };

    render() {
        return (
            <Box>
                <Grid container spacing={2} paddingTop={2}>
                    <Grid item xs={3}>
                        <Typography variant="h5" component="h2">
                            {this.state.name} (Id: {this.state.id})
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            onClick={() => this.props.onDelete(this.state.id)}
                            variant="contained"
                            color="error"
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>

                <p>{this.state.content}</p>
            </Box>
        );
    }
}

export default Counter;
