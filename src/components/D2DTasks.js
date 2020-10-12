import React, {useState, useEffect} from 'react';

import {renderTasks, loadRequestedTasks, isSunday} from "../utils"

import CreateTask from './CreateTask'

const D2DTasks = (props) => {
    const [allD2Dtasks, setAllD2DTasks] = useState([]);
    const [isSundayState, setIsSundayState] = useState(false);

    const passCreatedTask = (newTask) => {
        if (newTask !== undefined){
            setAllD2DTasks([...allD2Dtasks, newTask]);
        }
    }

    const ifSundayRedirectForReview = () => {
        if(!isSundayState){
            setIsSundayState(isSunday());
        }
        if (isSundayState){
            props.history.push("/review");
            setIsSundayState(false)
        }
    }

    useEffect(() => {
        loadRequestedTasks({ task_type: "D2D" }, setAllD2DTasks);
        ifSundayRedirectForReview();  
    }, []);


    return (
      <React.Fragment>
        <CreateTask onCreate={passCreatedTask} taskType="D2D" />
        {renderTasks(allD2Dtasks)}
      </React.Fragment>
    );
}

export default D2DTasks;
