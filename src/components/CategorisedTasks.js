import React, {useState, useEffect} from 'react';
import {renderTasks, loadRequestedTasks} from '../utils'
import {CATEGORY_INDEX_URL} from '../constants'
import CreateTask from "./CreateTask";

const CategorisedTasks = (props) => {
    const [associatedTasks, setAssociatedTasks] = useState([]);
    let isMounted = false;

    const fetchAssociatedTasks = () => {
        if (isMounted) {
            loadRequestedTasks(
            {
                task_type: "CATEGORISED",
                list_id: props.match.params.listId,
            },
            setAssociatedTasks
            );
        }
    }

    const passCreatedTask = (newTask) => {
        if (newTask !== undefined) {
            setAssociatedTasks([...associatedTasks, newTask]);
        }
    };

    useEffect(() => {
        isMounted = true   
        fetchAssociatedTasks();

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        isMounted = true;
        fetchAssociatedTasks();

        return () => {
          isMounted = false;
        };
    }, [props.match.params.listId])

    return (
        <div className="taskContainer">
            <CreateTask taskType="SUBLIST" listId={props.match.params.listId} onCreate={passCreatedTask}/>
            {renderTasks(associatedTasks)}
        </div>
    );
}

export default CategorisedTasks;
