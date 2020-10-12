import React, {useEffect, useState} from 'react';
import CreateTask from "./CreateTask";
import {renderTasks, loadRequestedTasks} from '../utils'

const FloatingTasks = () => {
    const [floaters, setFloaters] = useState([]);

    useEffect(() => {
        loadRequestedTasks({
            task_type : "FLOATERS"
        }, setFloaters);
    }, []);

    const passCreatedTask = (newTask) => {
        if (newTask !== undefined) {
            setFloaters([...floaters, newTask]);
        }
    };

    return (
        <React.Fragment>
            <CreateTask taskType="FLOATER" onCreate={passCreatedTask}/>
            {renderTasks(floaters)}
        </React.Fragment>
    );
}

export default FloatingTasks;
