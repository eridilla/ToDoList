import React from "react";
import Tasklist from "./components/Tasklist";
import { Container, Typography } from "@mui/material";

// type Task = {
//     id: number;
//     title: string;
//     content: string;
//     deadline: Date | null;
//     isCompleted: boolean;
// };

// type Tasklist = {
//     id: number;
//     currId: number;
//     tasks: Task[];
// };

function App() {
    // const [taskLists, setTasklists] = useState<Tasklist[]>([
    //     { id: 0, currId: 0, tasks: [] },
    //     { id: 1, currId: 0, tasks: [] },
    // ]);
    // const [shownTasklist, setShownTasklist] = useState(0);

    // // console.log(taskLists);

    // const handleAdd = (
    //     taskTitle: string,
    //     taskContent: string,
    //     taskDeadline: Date | null
    // ) => {
    //     const newTask: Task = {
    //         id: taskLists[shownTasklist].currId,
    //         title: taskTitle,
    //         content: taskContent,
    //         deadline: taskDeadline,
    //         isCompleted: false,
    //     };

    //     taskLists[shownTasklist].tasks.push(newTask);
    //     taskLists[shownTasklist].currId = taskLists[shownTasklist].currId + 1;
    //     setTasklists(taskLists);
    //     setShownTasklist(shownTasklist);
    // };

    // const swap = () => {
    //     if (shownTasklist === 0) {
    //         setShownTasklist(1);
    //     } else {
    //         setShownTasklist(0);
    //     }
    // };

    return (
        // <React.Fragment>
        //     <Button onClick={swap}>Change</Button>
        <Container>
            <Typography component="h1" variant="h2">
                To-Do List
            </Typography>
            <Tasklist
            // onAdd={handleAdd}
            // id={shownTasklist}
            // tasks={taskLists[shownTasklist].tasks}
            />
        </Container>
        // </React.Fragment>
    );
}

export default App;
