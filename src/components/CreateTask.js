import React, {useState} from 'react';
import {TASK_CREATE_URL} from '../constants'
import axios from 'axios'

const CreateTask = (props) => {
    const [state, setState] = useState({
        priorityLevel : 0,
        task : '',
        solidifier : ''
    })

    const handleInput = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const validateInput = () => {
        console.log(state);
        if (state.priorityLevel === '' || state.solidifier === '' || state.task === ''){
            return false
        }else{
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validateInput());

        setTimeout(() => {
            if (validateInput() && props.taskType === "D2D") {
                axios.post(TASK_CREATE_URL, {
                    task: state.task,
                    solidifier: state.solidifier,
                    priorityLevel: state.priorityLevel,
                    global: false,
                })
                .then((res) => {
                    props.onCreate(res.data);
                    console.log("POST DATA: ", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
            }else if(validateInput() && props.taskType === "SUBLIST"){
                    axios.post(TASK_CREATE_URL, {
                        task: state.task,
                        solidifier: state.solidifier,
                        priorityLevel: state.priorityLevel,
                        subListId : props.listId,
                        global: false,
                    })
                    .then((res) => {
                        props.onCreate(res.data);
                        console.log("POST DATA: ", res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }else if(validateInput() && props.taskType === "FLOATER"){
                    axios.post(TASK_CREATE_URL, {
                    task: state.task,
                    solidifier: state.solidifier,
                    priorityLevel: state.priorityLevel,
                    global: true,
                    })
                    .then((res) => {
                    props.onCreate(res.data);
                    console.log("POST DATA: ", res.data);
                    })
                    .catch((err) => {
                    console.log(err);
                    });
            }
        }, 500);
    }

    return (
      <React.Fragment>
        <form className="taskForm" onSubmit={handleSubmit}>
          <input type="checkbox" readOnly />
          <input name="task" placeholder="Your task. Get it done" type="text" onChange={handleInput} />
          <input name="solidifier" placeholder="The solidifier. eg Get fit" type="text" onChange={handleInput} />
          <input
            type="text"
            name="priorityLevel"
            placeholder="Your priority level"
            onChange={handleInput}
          />
          <button hidden type="submit"></button>
        </form>
      </React.Fragment>
    );
}

export default CreateTask;
